# deploy-trigger: reply-system v2
import os
import re
import time
import secrets
import string
import base64
import hashlib
import hmac
import jwt
from datetime import datetime, timedelta
from typing import Optional, Dict, Any, List

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, Depends, Request, BackgroundTasks, UploadFile, File, Form, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import shutil
import uuid
import httpx

import database as db

SECRET_KEY   = os.getenv("JWT_SECRET", "")
if not SECRET_KEY or SECRET_KEY == "changeme-very-secret-key-cubeworld":
    raise RuntimeError(
        "JWT_SECRET is not set (or still the old public default). "
        "Set it in Render -> cubeworld-backend-1 -> Environment before deploying."
    )
JWT_ALG      = "HS256"
ACCESS_TTL   = int(os.getenv("ACCESS_TTL_MINUTES", "60"))
REFRESH_TTL  = int(os.getenv("REFRESH_TTL_DAYS", "30"))
ADMIN_SECRET = os.getenv("ADMIN_SECRET", "")


def _check_admin(secret: str) -> None:
    """Одна дверь для всех служебных адресов. Запасных ключей в коде нет.

    Сравниваем в байтах, а не в строках: hmac.compare_digest на строке с
    любой не-латиницей бросает TypeError, и вместо честного «нельзя» запрос
    падал с «внутренней ошибкой». Снаружи это выглядит так, будто пароль
    чем-то особенный, — а он просто неверный.
    """
    if not ADMIN_SECRET or not secret:
        raise HTTPException(status_code=403, detail="Forbidden")
    try:
        дано = secret.encode("utf-8")
        надо = ADMIN_SECRET.encode("utf-8")
    except Exception:
        raise HTTPException(status_code=403, detail="Forbidden")
    if not hmac.compare_digest(дано, надо):
        raise HTTPException(status_code=403, detail="Forbidden")

#  Проверка самого ADMIN_SECRET при запуске.
#
#  Заголовки HTTP ходят только латиницей (latin-1). Секрет с русскими
#  буквами в заголовок просто не влезет: браузер и любая библиотека
#  откажутся его слать, и панель станет недоступна — а выглядеть это
#  будет как «ничего не работает, хотя пароль правильный». Один раз я на
#  это и напоролся в своей же проверке. Поэтому говорим сразу и внятно.
if ADMIN_SECRET:
    try:
        ADMIN_SECRET.encode("latin-1")
    except Exception:
        print("[админ] ВНИМАНИЕ: в ADMIN_SECRET есть буквы не из латиницы. "
              "Такой секрет нельзя передать заголовком X-Admin-Secret — "
              "служебные адреса будут недоступны. Возьмите латиницу и цифры.")
    if len(ADMIN_SECRET) < 16:
        print("[админ] ВНИМАНИЕ: ADMIN_SECRET короче 16 знаков. "
              "Служебные адреса открывают всё; возьмите длинную случайную строку.")

app = FastAPI(title="CubeWorld API", version="4.0.0")
# Content-Disposition нужен браузеру, чтобы сохранить файл под его настоящим
# именем: без expose_headers скрипт страницы этот заголовок не видит, и
# «скрипты.zip» превращался в «file».
# ── Кто может обращаться к этому серверу из браузера ────────────────────
#
# Было allow_origins=["*"] вместе с allow_credentials=True. Starlette в
# такой паре отражает любой присланный Origin, то есть к серверу ходит
# любая страница в интернете руками зашедшего на неё человека.
#
# Свои адреса перечислены ниже. Добавить ещё — переменная ALLOWED_ORIGINS
# в окружении, через запятую; домашние адреса (localhost и 192.168.*)
# разрешены отдельным правилом, чтобы проверка на своей машине работала.
_СВОИ = [
    "https://snnaannashe-del.github.io",
    "https://cube-world.space",
    "https://www.cube-world.space",
    "https://cubeworld-backend.onrender.com",
    # Настоящее имя сервиса на Render — с единицей: имя без неё было занято.
    "https://cubeworld-backend-1.onrender.com",
]
_ещё = [a.strip() for a in os.getenv("ALLOWED_ORIGINS", "").split(",") if a.strip()]
_ДОМА = r"^https?://(localhost|127\.0\.0\.1|\[::1\]|192\.168\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?$"

app.add_middleware(CORSMiddleware,
                   allow_origins=_СВОИ + _ещё,
                   allow_origin_regex=_ДОМА,
                   allow_credentials=True,
                   allow_methods=["*"], allow_headers=["*"],
                   expose_headers=["Content-Disposition"])

# ══════════════════════════════════════════════════════════════════════════
#  СТОРОЖ
#  ---------------------------------------------------------------------
#  Смотрит на каждый запрос и сам закрывается от того, кто ищет дырки.
#  Разбор — в сторож.py, здесь только подключение.
#
#  Порядок в прослойке важен:
#    1. сперва спрашиваем, не закрыт ли адрес — и если закрыт, отвечаем
#       сразу, не трогая ни базу, ни разбор тела: иначе защита сама
#       становится нагрузкой;
#    2. пропускаем запрос дальше;
#    3. по коду ответа решаем, добавить ли очков.
#
#  Запрос с правильным ADMIN_SECRET не блокируется никогда — чтобы
#  однажды не остаться снаружи собственной панели.
try:
    from сторож import сторож as _сторож
except Exception:
    _сторож = None


def _свой_ли(request) -> bool:
    """У человека на руках рабочий ключ входа? Тогда порог ему выше."""
    try:
        з = request.headers.get("authorization", "") or ""
        if not з.lower().startswith("bearer "):
            return False
        decode_access_token(з.split(" ", 1)[1].strip())
        return True
    except Exception:
        return False


def _админ_ли(request) -> bool:
    try:
        тайна = os.environ.get("ADMIN_SECRET", "")
        если = request.headers.get("X-Admin-Secret", "") or ""
        return bool(тайна) and hmac.compare_digest(тайна, если)
    except Exception:
        return False


#  Рассказываем сторожу, какие адреса у нас вообще есть: 404 по нашим —
#  обычная жизнь, 404 по /wp-login.php — разведка. Список берём из самой
#  таблицы адресов, чтобы он не разъехался с кодом.
@app.on_event("startup")
async def _сторожу_наши_пути():
    try:
        if _сторож is not None:
            from сторож import запомнить_свои_пути
            запомнить_свои_пути([getattr(р, "path", "") for р in app.routes])
    except Exception:
        pass


# ══════════════════════════════════════════════════════════════════════════
#  ЗАГОЛОВКИ ЗАЩИТЫ
#  ---------------------------------------------------------------------
#  Их не было вовсе. Каждый закрывает свой способ навредить человеку,
#  который уже открыл нашу страницу:
#
#  · HSTS — браузер больше не пойдёт по http, даже если ссылку подменят
#    в дороге. Ставим ТОЛЬКО когда запрос пришёл по https: на http этот
#    заголовок браузер игнорирует, а на своей машине он мешал бы.
#  · X-Content-Type-Options — браузер не будет «угадывать» тип файла.
#    Без него загруженная картинка с кодом внутри может быть исполнена
#    как скрипт.
#  · X-Frame-Options и frame-ancestors — нашу страницу нельзя вставить в
#    чужую рамку. Иначе поверх неё рисуют своё, и человек нажимает не то,
#    что видит.
#  · Referrer-Policy — чужой сайт не узнает, с какой именно страницы к
#    нему пришли. В адресах бывают номера кубов и групп.
#  · Permissions-Policy — камера, микрофон и геопозиция недоступны чужим
#    рамкам внутри нашей страницы.
#  · Cross-Origin-Resource-Policy — наши файлы не подтянет чужой сайт.
#
#  CSP здесь НЕ ставим на HTML — страница одна большая, со встроенными
#  стилями и кодом, и строгий CSP её сломает. Для ответов API он тоже
#  бессмыслен: это JSON, в нём нечему исполняться. Поэтому ставим CSP
#  только там, где он правда защищает: на отдаваемых ФАЙЛАХ, чтобы
#  загруженный кем-то «рисунок» не смог ничего выполнить.
_ЗАГОЛОВКИ = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(self), microphone=(self), geolocation=(self), "
                          "payment=(), usb=(), serial=()",
    "Cross-Origin-Resource-Policy": "cross-origin",
}

# Что отдаём вместе с загруженными файлами: там CSP уместен и важен.
_ЗАГОЛОВКИ_ФАЙЛОВ = {
    "Content-Security-Policy": "default-src 'none'; img-src 'self' data: blob:; "
                               "media-src 'self' blob:; style-src 'unsafe-inline'; "
                               "sandbox; frame-ancestors 'none'",
    "X-Content-Type-Options": "nosniff",
}


@app.middleware("http")
async def _заголовки_защиты(request: Request, call_next):
    ответ = await call_next(request)
    try:
        for имя, значение in _ЗАГОЛОВКИ.items():
            ответ.headers.setdefault(имя, значение)
        # HSTS только на https: иначе браузер его просто не читает, а на
        # своей машине по http он мешал бы работать.
        if request.url.scheme == "https" or \
           request.headers.get("x-forwarded-proto", "") == "https":
            ответ.headers.setdefault(
                "Strict-Transport-Security",
                "max-age=63072000; includeSubDomains; preload")
        # Файлы, загруженные людьми, отдаём в песочнице.
        if request.url.path.startswith("/uploads") or \
           request.url.path.startswith("/files"):
            for имя, значение in _ЗАГОЛОВКИ_ФАЙЛОВ.items():
                ответ.headers[имя] = значение
    except Exception:
        pass
    return ответ


# ══════════════════════════════════════════════════════════════════════════
#  ПРЕДЕЛ РАЗМЕРА ЗАПРОСА
#  ---------------------------------------------------------------------
#  Загрузки файлов читаются кусками и свой предел имеют. А вот обычное
#  тело запроса (JSON) FastAPI читает целиком в память — и ничем не
#  ограничено. Один запрос на двести мегабайт JSON кладёт сервис без
#  всякого взлома.
#
#  Смотрим на Content-Length и отказываем ДО чтения тела. Заголовок
#  можно не прислать, но тогда не сработает и сама отправка больших
#  тел обычными средствами, а загрузки идут своим путём с его пределами.
_ПРЕДЕЛ_ТЕЛА = int(os.environ.get("CW_MAX_BODY", str(2 * 1024 * 1024)))
_БЕЗ_ПРЕДЕЛА = ("/upload/", "/stories", "/groups", "/market", "/shop", "/me/prefs")


@app.middleware("http")
async def _предел_тела(request: Request, call_next):
    try:
        длина = request.headers.get("content-length", "")
        if длина.isdigit() and int(длина) > _ПРЕДЕЛ_ТЕЛА:
            путь = request.url.path
            # Ручки с файлами считают размер сами, кусками, и им можно
            # больше. Остальным двух мегабайт хватает с запасом: самое
            # крупное обычное тело — фотография профиля строкой, а у неё
            # свой предел в 512 КБ.
            if not any(путь.startswith(п) for п in _БЕЗ_ПРЕДЕЛА):
                return Response(
                    content='{"detail":"Тело запроса слишком большое"}',
                    status_code=413, media_type="application/json")
    except Exception:
        pass
    return await call_next(request)


@app.middleware("http")
async def _сторожить(request: Request, call_next):
    if _сторож is None:
        return await call_next(request)
    try:
        адрес = _откуда(request)
        админ = _админ_ли(request)
        if not админ:
            закрыт = _сторож.закрыт_ли(адрес)
            if закрыт:
                # Отвечаем коротко и дёшево. Про причину не рассказываем:
                # подробности помогают обойти, а не исправиться.
                return Response(
                    content='{"detail":"Доступ временно закрыт"}',
                    status_code=403, media_type="application/json",
                    headers={"Retry-After": str(закрыт["осталось"])})
    except Exception:
        адрес, админ = "?", False

    ответ = await call_next(request)

    try:
        if not админ:
            _сторож.посмотреть(
                адрес,
                request.url.path,
                request.method,
                getattr(ответ, "status_code", 0),
                request.headers.get("user-agent", ""),
                свой=_свой_ли(request),
                запрос=str(request.url.query or ""))
    except Exception:
        pass
    return ответ


db.init_db()
bearer_scheme = HTTPBearer(auto_error=False)

# Файлы. Папка берётся из storage: раньше здесь было жёсткое /tmp/cw_uploads,
# а на Render подключённый диск смонтирован в /data — то есть загруженные
# фотографии, видео и документы стирались при каждой выкладке и перезапуске.
import storage as st

UPLOAD_DIR = st.LOCAL_DIR
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(st.CHUNK_DIR, exist_ok=True)



@app.get("/uploads/{path:path}")
async def serve_upload(path: str):
    """Отдать загруженный файл.

    Раньше здесь стояло монтирование StaticFiles на одну папку. Когда папку
    перенесли с /tmp внутрь диска, ссылки вида /uploads/abc.mp4, оставшиеся
    в базе, перестали находиться — старые видео показывали чёрный экран,
    хотя файлы были целы и лежали в прежнем месте. Монтирование перехватывало
    запрос и само отвечало «не найдено», поэтому заглянуть в старую папку
    было нельзя.

    Теперь смотрим сначала в новую папку, потом в прежние. FileResponse
    поддерживает Range, то есть перемотка в большом видео работает.
    """
    файл = st.find_upload(path)
    if not файл:
        raise HTTPException(404, "Файл не найден")
    from fastapi.responses import FileResponse
    return FileResponse(файл, media_type=st.content_type(файл))

_CHARS = string.ascii_uppercase + string.digits

def _random_segment(n=4):
    return "".join(secrets.choice(_CHARS) for _ in range(n))

def generate_cube_key():
    return f"CUBE-{_random_segment()}-{_random_segment()}-{_random_segment()}"


def public_tag():
    """Открытая метка учётки: то, что видно в профиле и в поиске людей.

    Раньше меткой служили первые девять знаков самого ключа — «CUBE-ZMYM».
    Это значит, что четыре случайных знака ключа из двенадцати лежали в
    базе ОТКРЫТО, рядом с отпечатком. При утечке базы перебор сокращался
    с 36**12 до 36**8 — в два миллиона раз, и никакой scrypt этого уже не
    отыграл бы. Метка теперь своя: к ключу она не относится, и по ней о
    ключе не узнать ничего.
    """
    return "CUBE-" + _random_segment(4)

def create_access_token(user_id, key_type):
    payload = {"sub": str(user_id), "key_type": key_type,
                "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TTL),
                "iat": datetime.utcnow(), "type": "access"}
    return jwt.encode(payload, SECRET_KEY, algorithm=JWT_ALG)

def create_refresh_token():
    return secrets.token_hex(32)

def decode_access_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[JWT_ALG])
        if payload.get("type") != "access":
            raise ValueError("not access token")
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(401, "Token expired")
    except Exception:
        raise HTTPException(401, "Invalid token")

async def get_user_optional(creds: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme)):
    """Кто пришёл, если пришёл. Нужен там, где адрес открыт для всех, но
    вошедшему надо показать больше — например свои закрытые кубы в общем
    списке. Без токена и с плохим токеном одинаково отдаёт None и ничего
    не ломает."""
    if not creds:
        return None
    try:
        payload = decode_access_token(creds.credentials)
        return db.get_user_by_id(int(payload["sub"]))
    except Exception:
        return None


async def get_current_user(creds: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme)):
    if not creds:
        raise HTTPException(401, "No token")
    payload = decode_access_token(creds.credentials)
    user = db.get_user_by_id(int(payload["sub"]))
    if not user:
        raise HTTPException(401, "User not found")
    db.update_last_seen(user["id"])
    return user

# ── Pydantic models ───────────────────────────────────────────────────────────

class LoginRequest(BaseModel):
    key: str

class RefreshRequest(BaseModel):
    refresh_token: str

class UpdateProfileRequest(BaseModel):
    display_name: Optional[str] = None
    avatar_url: Optional[str] = None
    account_type: Optional[str] = None  # 'public' | 'hidden'
    bio: Optional[str] = None
    # v=584 · Цвет значка на аватаре: «#2f80ed». Едет вместе со значком,
    # иначе его видел бы только тот, кто выбирал.
    avatar_color: Optional[str] = None

class WalletLinkRequest(BaseModel):
    address: str
    chain_id: int = 137
    signature: Optional[str] = None   # доказательство владения
    expires_at: Optional[int] = None  # срок из строки, которую подписали

class RewardClaimRequest(BaseModel):
    month: Optional[str] = None   # YYYY-MM, defaults to current
    wallet_address: str

class PremiumActivateRequest(BaseModel):
    months: int = 1
    payment_method: Optional[str] = None
    tx_hash: Optional[str] = None

class CreateCubeRequest(BaseModel):
    name: str
    description: str = ""
    icon: str = "📦"
    color: str = "#0095F6"
    type: str = "public"
    life_hours: int = 24

class JoinCubeRequest(BaseModel):
    cube_key: str

class SetUsernameRequest(BaseModel):
    username: str

class SetCubeHandleRequest(BaseModel):
    handle: str

class CreateGroupRequest(BaseModel):
    name: str
    description: Optional[str] = ''
    icon: Optional[str] = '👥'
    type: Optional[str] = 'public'  # public | private

class SetGroupHandleRequest(BaseModel):
    handle: str

class CreatePostRequest(BaseModel):
    content: str

class CreateVideoPostRequest(BaseModel):
    cube_id: Optional[int] = 1
    video_url: Optional[str] = ""
    description: Optional[str] = ""
    music: Optional[str] = ""
    post_type: Optional[str] = "short"   # "short" | "ball"
    image_url: Optional[str] = ""
    file_url: Optional[str] = ""
    title: Optional[str] = ""
    tags: Optional[Any] = None  # list or comma-string
    # Ролик, загруженный в Bunny Stream: номер записи, плейлист и заставка.
    stream_id: Optional[str] = ""

class GroupMessageRequest(BaseModel):
    content: str
    msg_type: Optional[str] = "text"
    expire_seconds: Optional[int] = None

class JoinGroupByKeyRequest(BaseModel):
    key: str

class SetGroupKeyRequest(BaseModel):
    key: str

class AddCommentRequest(BaseModel):
    content: str
    expire_seconds: int = None


class EditPostRequest(BaseModel):
    """Правка своей публикации. Передаём только то, что меняем."""
    title: Optional[str] = None
    description: Optional[str] = None
    music: Optional[str] = None
    image_url: Optional[str] = None
    video_url: Optional[str] = None
    tags: Optional[list] = None


class ReportPostRequest(BaseModel):
    reason: Optional[str] = ""


class AddReplyRequest(BaseModel):
    content: str

class LikeCommentRequest(BaseModel):
    type: str = 'like'

class EditContentRequest(BaseModel):
    content: str


class CreateSignalRequest(BaseModel):
    ticker: str
    direction: str = "LONG"
    entry_price: float = 0.0
    tp_price: float = 0.0
    sl_price: float = 0.0
    content: str = ""

class ReactRequest(BaseModel):
    emoji: str

class SendDmRequest(BaseModel):
    content: str = ""
    msg_type: str = "text"
    file_name: Optional[str] = None
    file_size: Optional[str] = None
    file_url: Optional[str] = None
    expires_secs: Optional[int] = None
    duration: Optional[int] = None

class UniverseRequest(BaseModel):
    universe: list = []

# ── Auth ──────────────────────────────────────────────────────────────────────

# ── Ограничитель попыток ─────────────────────────────────────────────────
#
# На входе не было ничего: ключ можно было подбирать и аккаунты заводить
# без предела. Перебрать ключ из 12 знаков по сети всё равно нереально, но
# без ограничителя любой желающий забивает базу пустыми учётками и кладёт
# сервер одним циклом.
#
# Счётчик в памяти процесса: перезапуск его обнуляет, и на нескольких
# машинах он у каждой свой. Для одной машины на Render этого хватает, а
# настоящая защита от потока — Cloudflare перед доменом.
_стуки: Dict[str, Dict[str, list]] = {}
def _предел(имя: str, сколько: int, окно: float):
    """Предел, который можно переставить переменной окружения.
    Например CW_LIMIT_LOGIN=40/300 — сорок попыток за пять минут."""
    try:
        з = os.environ.get("CW_LIMIT_" + имя.upper(), "")
        if з and "/" in з:
            а, б = з.split("/", 1)
            return (max(1, int(а)), max(5.0, float(б)))
    except Exception:
        pass
    return (сколько, окно)


# Числа выбраны не «чем меньше, тем лучше». За одним адресом в интернете
# стоит не один человек: у мобильных операторов и в офисах тысячи людей
# выходят через общий адрес. Слишком узкий предел на заводе ключей закроет
# вход целому оператору, а подбор ключа он всё равно не остановит — его
# останавливает длина ключа (36**12 вариантов) и дорогой scrypt.
# Ограничитель здесь против шума и забивания базы пустыми учётками.
_ПРЕДЕЛЫ = {
    # ведро: (сколько попыток, за сколько секунд)
    "login":    _предел("login",    40, 300.0),    # подбор ключа
    "generate": _предел("generate", 60, 3600.0),   # завод новых ключей
    "redeem":   _предел("redeem",   20, 600.0),    # подбор подарочных ключей
    # Покупка тратит собственные деньги покупателя, так что наживы от
    # частых попыток нет — ведро здесь против долбёжки по базе, и потому
    # широкое: живой человек покупает раз в день, а не шестьдесят.
    "shop_buy": _предел("shop_buy", 60, 600.0),
}


#  КТО ПРИШЁЛ
#  ---------------------------------------------------------------------
#  Здесь была настоящая дыра, и она сводила на нет весь ограничитель.
#
#  Было: «берём ПЕРВЫЙ адрес из X-Forwarded-For — его ставит прокси».
#  Нет: первый адрес в этой цепочке ставит КЛИЕНТ. Прокси свой адрес
#  ДОПИСЫВАЕТ в конец. То есть любой желающий слал
#
#      X-Forwarded-For: 203.0.113.7
#
#  и получал свежее пустое ведро на каждый запрос. Проверено на живом
#  сервере: двенадцать запросов с одного адреса упирались в 429, а восемь
#  с поддельным заголовком проходили все восемь. Подбор ключа, завод
#  учёток, подбор подарочных кодов — ничем не ограничены.
#
#  КАК ПРАВИЛЬНО. В цепочке столько доверенных записей с конца, сколько
#  перед нами стоит своих прокси. Каждый прокси дописывает адрес того, от
#  кого получил. Значит при N своих прокси настоящий посетитель — это
#  запись под номером -N, а всё левее неё прислал он сам, и верить туда
#  нельзя.
#
#    CW_PROXY=render     (по умолчанию) — один свой прокси, балансировщик
#                        Render. Настоящий адрес — последняя запись.
#    CW_PROXY=cloudflare — два: Cloudflare и Render. Берём CF-Connecting-IP
#                        (Cloudflare ставит его сам и затирает присланный),
#                        а без него — предпоследнюю запись.
#    CW_PROXY=none       — своих прокси нет, заголовкам не верим вовсе,
#                        только сокет. Так ставим на своей машине и так
#                        надо, если сервер смотрит в интернет напрямую.
#    CW_PROXY_HOPS=N     — если прокси другое число, задать прямо.
#
#  И что бы ни вышло — проверяем, что это похоже на адрес: иначе ключом
#  ведра становится присланная строка, и ведро снова своё у каждого.
_ПРОКСИ = str(os.environ.get("CW_PROXY", "render")).strip().lower()
_ПРЫЖКИ = {"none": 0, "render": 1, "cloudflare": 2}.get(_ПРОКСИ, 1)
try:
    _явно = os.environ.get("CW_PROXY_HOPS", "")
    if _явно.strip():
        _ПРЫЖКИ = max(0, min(8, int(_явно)))
except Exception:
    pass

_АДРЕС_ВИД = re.compile(r"^[0-9a-fA-F:.]{3,45}$")


def _адрес_ли(з: str) -> bool:
    з = (з or "").strip()
    if not з or not _АДРЕС_ВИД.match(з):
        return False
    return ("." in з) or (":" in з)


def _откуда(request: Request) -> str:
    """Адрес посетителя — тот, которому можно верить."""
    try:
        сокет = (request.client.host if request.client else "") or ""
        if _ПРЫЖКИ <= 0:
            return сокет[:64] if _адрес_ли(сокет) else "?"

        if _ПРОКСИ == "cloudflare":
            cf = (request.headers.get("CF-Connecting-IP", "") or "").strip()
            if _адрес_ли(cf):
                return cf[:64]

        цепочка = [ч.strip() for ч in
                   (request.headers.get("X-Forwarded-For", "") or "").split(",")
                   if ч.strip()]
        # Запись под номером -N — её дописал наш самый дальний прокси.
        if len(цепочка) >= _ПРЫЖКИ:
            кто = цепочка[-_ПРЫЖКИ]
            if _адрес_ли(кто):
                return кто[:64]
        # Цепочка короче, чем мы ждали: прокси не тот, о котором думали.
        # Берём сокет — он не врёт никогда.
        return сокет[:64] if _адрес_ли(сокет) else "?"
    except Exception:
        return "?"


print("[адрес] доверяем %d прокси (CW_PROXY=%s)" % (_ПРЫЖКИ, _ПРОКСИ))

def _свой_origin(websocket) -> bool:
    """Откуда открыли сокет. Браузер честно шлёт Origin, и подделать его
    со страницы нельзя — это и делает проверку осмысленной.

    Зачем она. У обычных ручек есть CORS: браузер сам не даст чужой
    странице прочитать наш ответ. На веб-сокеты CORS НЕ
    распространяется — туда чужая страница стучится беспрепятственно.
    Токен ей всё равно нужен, так что это не дыра, а лишняя запертая
    дверь.

    Не-браузеры (свои проверки, мобильное приложение) Origin не шлют
    вовсе — им не отказываем, иначе сломаем то, что работает."""
    try:
        о = (websocket.headers.get("origin", "") or "").strip()
        if not о:
            return True                 # не браузер — пусть идёт
        if о in _СВОИ or о in _ещё:
            return True
        return bool(re.match(_ДОМА, о))
    except Exception:
        return True                     # сомневаешься — не ломай


def _откуда_сокета(websocket) -> str:
    """То же самое для веб-сокета: у него свой объект, а правило одно."""
    try:
        сокет = (websocket.client.host if websocket.client else "") or ""
        if _ПРЫЖКИ <= 0:
            return сокет[:64] if _адрес_ли(сокет) else "?"
        if _ПРОКСИ == "cloudflare":
            cf = (websocket.headers.get("cf-connecting-ip", "") or "").strip()
            if _адрес_ли(cf):
                return cf[:64]
        цепочка = [ч.strip() for ч in
                   (websocket.headers.get("x-forwarded-for", "") or "").split(",")
                   if ч.strip()]
        if len(цепочка) >= _ПРЫЖКИ:
            кто = цепочка[-_ПРЫЖКИ]
            if _адрес_ли(кто):
                return кто[:64]
        return сокет[:64] if _адрес_ли(сокет) else "?"
    except Exception:
        return "?"


#  Сторожевая запись в журнал: если uvicorn запущен с --proxy-headers, он
#  САМ перепишет request.client.host из X-Forwarded-For, причём возьмёт
#  ПЕРВУЮ запись — ту, которую ставит клиент. Тогда наш сокет уже не сокет,
#  и всё рассуждение выше рушится. Заметить это можно только на живом
#  запросе, поэтому проверяем один раз и громко пишем в журнал.
_предупредили = {"было": False}


def _проверить_прокси(request) -> None:
    if _предупредили["было"]:
        return
    try:
        цепочка = [ч.strip() for ч in
                   (request.headers.get("X-Forwarded-For", "") or "").split(",")
                   if ч.strip()]
        сокет = (request.client.host if request.client else "") or ""
        if цепочка and сокет and сокет == цепочка[0] and len(цепочка) > 0:
            _предупредили["было"] = True
            print("[адрес] ВНИМАНИЕ: uvicorn подменяет адрес клиента из "
                  "X-Forwarded-For (запущен с --proxy-headers). Тогда адрес "
                  "подделывается заголовком, и ограничитель с банами не "
                  "работают. Уберите --proxy-headers и --forwarded-allow-ips "
                  "из команды запуска: разбор цепочки делает сам сервер.")
    except Exception:
        pass



# Выключатель для своих проверок. Наборы тестов заводят по двадцать-тридцать
# учёток с одного адреса и упираются в ограничитель. Это переменная окружения
# СЕРВЕРА, а не заголовок запроса: снаружи её не подделать. На Render её быть
# не должно — пусто значит «ограничитель работает».
_ПРЕДЕЛЫ_ВЫКЛ = str(os.environ.get("CW_LIMITS", "")).lower() in ("off", "0", "no")


def _стучать(ведро: str, request: Request) -> None:
    """Посчитать попытку и отказать, если их слишком много."""
    _проверить_прокси(request)
    if _ПРЕДЕЛЫ_ВЫКЛ:
        return
    сколько, окно = _ПРЕДЕЛЫ.get(ведро, (30, 300.0))
    ключ = _откуда(request)
    сейчас = time.time()
    где = _стуки.setdefault(ведро, {})
    было = [t for t in где.get(ключ, []) if сейчас - t < окно]
    # Прибираем чужие записи, чтобы словарь не рос без конца.
    if len(где) > 5000:
        for к in list(где.keys())[:2500]:
            где.pop(к, None)
    if len(было) >= сколько:
        raise HTTPException(429, "Слишком много попыток — подожди немного")
    было.append(сейчас)
    где[ключ] = было


@app.post("/auth/generate")
async def generate_key(request: Request):
    _стучать("generate", request)
    # Lazily clean up expired pending keys on each generate call
    try: db.cleanup_expired_pending_keys()
    except Exception: pass

    for _ in range(10):
        raw_key = generate_cube_key()
        key_hash = db.hash_key(raw_key)
        if not db.get_user_by_key_hash(key_hash) and not db.get_pending_key_by_hash(key_hash):
            break
    else:
        raise HTTPException(500, "Key generation failed")

    key_prefix = public_tag()
    # Store as pending — user is NOT created until first entry into CubeWorld
    db.create_pending_key(key_hash, key_prefix, key_type="free")

    return {"key": raw_key, "key_prefix": key_prefix, "key_type": "free",
            "message": "Save your key - it cannot be recovered!"}

@app.post("/auth/login")
async def login_with_key(body: LoginRequest, request: Request):
    _стучать("login", request)
    raw_key  = body.key.strip().upper()
    # найти_по_ключу само считает новый (дорогой) отпечаток и, если человек
    # нашёлся по прежнему чистому sha256, тихо переписывает его на новый.
    user, key_hash = db.найти_по_ключу(raw_key)

    # First entry: key was pending (never entered CubeWorld before)
    if not user:
        pending, key_hash = db.найти_ожидающий_ключ(raw_key)
        if not pending:
            raise HTTPException(401, "Key not found, invalid, or expired")
        # Activate: create real user, give welcome bonus, remove from pending
        key_prefix = pending["key_prefix"]
        key_type_p = pending["key_type"]
        user_id_new = db.create_user(key_hash, key_prefix, key_type=key_type_p)
        # Подарка за регистрацию больше нет. Ключи выдаются анонимно и бесплатно,
        # а сто CUBE на нового — это печатный станок: заводи ключи и получай.
        db.consume_pending_key(key_hash)
        user = db.get_user_by_id(user_id_new)

    user_id   = user["id"]
    key_type  = user["key_type"]
    access_token = create_access_token(user_id, key_type)
    refresh_raw  = create_refresh_token()
    refresh_hash = db.hash_token(refresh_raw)
    expires_at   = (datetime.utcnow() + timedelta(days=REFRESH_TTL)).strftime("%Y-%m-%d %H:%M:%S")

    ua      = request.headers.get("user-agent", "")
    ip_raw  = _откуда(request)      # не сокет: за прокси он чужой
    ip_hash = db.hash_ip(ip_raw) or None
    db.create_session(user_id, refresh_hash, expires_at, user_agent=ua, ip_hash=ip_hash)
    db.update_last_seen(user_id)

    return {"key_prefix": user["key_prefix"], "key_type": key_type,
            "access_token": access_token, "refresh_token": refresh_raw,
            "cube_balance": user["cube_balance"], "display_name": user["display_name"],
            "user_id": user_id}

@app.post("/auth/refresh")
async def refresh_tokens(body: RefreshRequest):
    session = db.get_session_by_token_hash(db.hash_token(body.refresh_token))
    if not session:
        raise HTTPException(401, "Invalid or expired refresh token")
    access_token = create_access_token(session["user_id"], session["key_type"])
    return {"access_token": access_token, "key_type": session["key_type"]}

class RotateKeyRequest(BaseModel):
    # Нынешний ключ просим ещё раз: токен мог быть украден, а ключ — нет.
    # Без этого укравший токен сам сменил бы ключ и запер хозяина снаружи.
    current_key: str


@app.post("/auth/rotate-key")
async def rotate_key(body: RotateKeyRequest, request: Request,
                     user=Depends(get_current_user)):
    """Сменить свой ключ, сохранив всё: кубы, переписки, счёт.

    Нужно, когда ключ утёк. Раньше сменить его было нельзя вовсе: ключ —
    единственный вход, механизма замены не существовало, и утёкший ключ
    оставался чужим навсегда.

    Старый ключ перестаёт работать сразу, все прежние входы гасятся:
    кто сидел по украденному токену, вылетает. Новый ключ показывается
    один раз — как и при заводе.
    """
    _стучать("login", request)
    старый = (body.current_key or "").strip().upper()
    if not db.ключ_подходит(user, старый):
        raise HTTPException(403, "Нынешний ключ введён неверно")

    for _ in range(10):
        новый = generate_cube_key()
        н_хеш = db.hash_key(новый)
        if not db.get_user_by_key_hash(н_хеш) and not db.get_pending_key_by_hash(н_хеш):
            break
    else:
        raise HTTPException(500, "Не удалось завести новый ключ")

    # Метку оставляем прежнюю: это открытое имя учётки, по нему человека
    # знают другие. Менять её при смене ключа ни к чему.
    метка = user.get("key_prefix") or public_tag()
    if not db.сменить_ключ(user["id"], н_хеш, метка):
        raise HTTPException(500, "Не удалось сменить ключ")
    db.забыть_все_сессии(user["id"])
    return {"key": новый, "key_prefix": метка, "ok": True,
            "message": "Старый ключ больше не работает. Сохрани новый — его не восстановить."}


@app.post("/auth/logout-all")
async def logout_all(user=Depends(get_current_user)):
    """Выйти на всех устройствах: гасим все refresh этого человека."""
    сколько = db.забыть_все_сессии(user["id"])
    return {"ok": True, "closed": сколько}


class DisableAccountRequest(BaseModel):
    current_key: str


@app.post("/auth/disable")
async def disable_account(body: DisableAccountRequest, request: Request,
                          user=Depends(get_current_user)):
    """Погасить свою учётную запись целиком — рубильник на крайний случай.

    После этого не работают ни ключ, ни уже выданные токены: вход ищет
    человека с is_active=1. Обратно включает только владелец площадки
    руками в базе.
    """
    _стучать("login", request)
    старый = (body.current_key or "").strip().upper()
    if not db.ключ_подходит(user, старый):
        raise HTTPException(403, "Нынешний ключ введён неверно")
    db.погасить_учётку(user["id"])
    return {"ok": True}


@app.post("/auth/logout")
async def logout(body: RefreshRequest):
    db.delete_session(db.hash_token(body.refresh_token))
    return {"ok": True}

# ── User ──────────────────────────────────────────────────────────────────────

@app.get("/me")
async def get_me(user=Depends(get_current_user)):
    return {"id": user["id"], "key_prefix": user["key_prefix"], "key_type": user["key_type"],
            "display_name": user["display_name"], "avatar_url": user["avatar_url"],
            "username": user.get("username"), "uid": f"#{user['id']}",
            "cube_balance": user["cube_balance"], "created_at": user["created_at"],
            "last_seen": user["last_seen"]}

@app.get("/me/cubes")
async def get_my_cubes(user=Depends(get_current_user)):
    """Return all cubes owned by the current user (including expired/inactive)."""
    return db.get_my_cubes(int(user["id"]))

# A profile photo is stored inline as a data: URL, so its size is the size of
# every response that carries this user: /me, /users/{id}, and any list they
# appear in. Unlimited, it made the whole app crawl. 512 KB of base64 is a
# generous 640x640 JPEG.
MAX_AVATAR_CHARS = 512 * 1024
MAX_DISPLAY_NAME = 64


@app.patch("/me")
async def update_me(body: UpdateProfileRequest, user=Depends(get_current_user)):
    name = body.display_name
    if name is not None:
        name = name.strip()[:MAX_DISPLAY_NAME]

    avatar = body.avatar_url
    if avatar is not None:
        avatar = avatar.strip()
        if len(avatar) > MAX_AVATAR_CHARS:
            raise HTTPException(
                413, f"Фото слишком большое: {len(avatar)//1024} КБ, "
                     f"максимум {MAX_AVATAR_CHARS//1024} КБ. Уменьши картинку.")

    if name:
        _модерация(user, name, "имя")
    if body.bio:
        _модерация(user, body.bio, "имя")
    цвет = body.avatar_color
    if цвет is not None:
        цвет = str(цвет).strip()[:16]
        if цвет and not re.match(r'^#[0-9a-fA-F]{3,8}$', цвет):
            цвет = ''
    db.update_profile(user["id"], name, avatar, цвет)
    if body.account_type in ('public', 'hidden'):
        db.set_account_type(user["id"], body.account_type)
    # bio stored via avatar_url prefix or ignored if DB doesn't support it yet
    # v=583 · Имя и снимок сменились — говорим об этом всем, кто в сети,
    # включая самого человека: у него может быть открыто второе окно.
    try:
        п = db.get_user_profile(user["id"]) or {}
        await _всем_в_сети({
            "type": "profile_changed",
            "user_id": int(user["id"]),
            "display_name": п.get("display_name") or "",
            "avatar_url": п.get("avatar_url") or "",
            "avatar_color": п.get("avatar_color") or "",
            "username": п.get("username") or "",
        })
    except Exception:
        pass
    return {"ok": True}

# Сигналы живут в отдельном разделе в конце файла (котировки и автозакрытие).

@app.get("/me/universe")
async def get_universe(user=Depends(get_current_user)):
    """Return the user's saved universe (list of cube IDs)."""
    uni = db.get_universe(int(user["id"]))
    return {"universe": uni}

@app.post("/me/universe")
async def save_universe(body: UniverseRequest, user=Depends(get_current_user)):
    """Save the user's universe selection."""
    db.save_universe(int(user["id"]), [str(x) for x in body.universe])
    return {"ok": True}

class PrefsRequest(BaseModel):
    prefs: dict = {}


@app.get("/me/prefs")
async def get_prefs(keys: str = "", user=Depends(get_current_user)):
    """Личные списки: избранное, скрытые сообщения, архив и прочее.

    Раньше всё это жило только в браузере и не переезжало на другое
    устройство. Возвращаем {ключ: {"v": строка, "t": метка времени}}.
    """
    wanted = [k for k in (keys or "").split(",") if k][:60]
    return {"prefs": db.get_prefs(int(user["id"]), wanted or None)}


@app.post("/me/prefs")
async def save_prefs(body: PrefsRequest, user=Depends(get_current_user)):
    saved = db.set_prefs(int(user["id"]), body.prefs or {})
    return {"ok": True, "saved": saved}


@app.post("/me/username")
async def set_username(body: SetUsernameRequest, user=Depends(get_current_user)):
    """Set @username. 4-24 chars, a-z 0-9 underscore only."""
    import re
    uname = body.username.strip().lower().lstrip('@')
    if not re.match(r'^[a-z0-9_]{4,24}$', uname):
        raise HTTPException(400, "Юзернейм: 4-24 символа, только a-z 0-9 _")
    ok = db.set_username(user["id"], uname)
    if not ok:
        raise HTTPException(409, "Этот @username уже занят")
    try:
        п = db.get_user_profile(user["id"]) or {}
        await _всем_в_сети({
            "type": "profile_changed",
            "user_id": int(user["id"]),
            "display_name": п.get("display_name") or "",
            "avatar_url": п.get("avatar_url") or "",
            "username": uname,
        })
    except Exception:
        pass
    return {"ok": True, "username": uname}

# ── User Search ────────────────────────────────────────────────────────────────

@app.get("/users/search")
async def search_users(q: str = "", limit: int = 20, user=Depends(get_current_user)):
    """Поиск людей по @нику, имени или #номеру.

    Метка вида CUBE-45I5 отсюда убрана совсем: раньше она подставлялась
    вместо имени тому, кто имя не завёл, и так показывалась посторонним.
    К ключу она больше не относится, но и видеть её никому не нужно —
    без имени человек теперь обозначается своим #номером."""
    if not q.strip():
        raise HTTPException(400, "Пустой запрос")
    results = db.search_users(q.strip(), min(limit, 50), exclude_id=user["id"])
    return [
        {
            "id":           r["id"],
            "uid":          f"#{r['id']}",
            "username":     r.get("username"),
            "display_name": r.get("display_name") or f"#{r['id']}",
            "avatar_url":   r.get("avatar_url"),
            "key_type":     r.get("key_type","free"),
            "handle":       f"@{r['username']}" if r.get("username") else f"#{r['id']}",
        }
        for r in results
    ]

@app.get("/cubes/search")
async def search_cubes_endpoint(q: str = "", limit: int = 20):
    """Search cubes by @handle or name."""
    if not q.strip():
        raise HTTPException(400, "Пустой запрос")
    results = db.search_cubes(q.strip(), min(limit, 50))
    return [
        {
            "id":     r["id"],
            "uid":    f"#G{r['id']}",
            "name":   r["name"],
            "handle": f"@{r['handle']}" if r.get("handle") else f"#G{r['id']}",
            "icon":   r.get("icon","🧊"),
            "color":  r.get("color","#0095F6"),
            "type":   r.get("type","public"),
            "life_left": r.get("life_left_seconds",0),
        }
        for r in results
    ]

@app.post("/cubes/{cube_id}/handle")
async def set_cube_handle(cube_id: int, body: SetCubeHandleRequest, user=Depends(get_current_user)):
    """Set @handle for a cube (owner only). 3-24 chars a-z 0-9 _"""
    import re
    handle = body.handle.strip().lower().lstrip('@')
    if not re.match(r'^[a-z0-9_]{3,24}$', handle):
        raise HTTPException(400, "Handle: 3-24 символа, только a-z 0-9 _")
    ok = db.set_cube_handle(cube_id, user["id"], handle)
    if not ok:
        raise HTTPException(409, "Этот @handle уже занят или ты не владелец")
    return {"ok": True, "handle": handle}

_АДРЕС = re.compile(r"^0x[0-9a-fA-F]{40}$")
_КОШЕЛЬКОВ_НА_ЧЕЛОВЕКА = 10


#  ДОКАЗАТЕЛЬСТВО ВЛАДЕНИЯ КОШЕЛЬКОМ
#  ---------------------------------------------------------------------
#  Раньше поле signature приходило и НИЧЕГО не значило — сервер его не
#  смотрел. То есть «привязан кошелёк» означало только «кто-то вписал
#  сюда строку». Теперь значит ровно то, что написано: человек подписал
#  наше сообщение закрытым ключом от этого адреса.
#
#  КАК ЭТО РАБОТАЕТ. Сервер даёт строку для подписи (/wallet/challenge),
#  кошелёк подписывает её (personal_sign), сервер по подписи ВОССТАНАВЛИВАЕТ
#  адрес и сверяет с заявленным. Закрытый ключ при этом никуда не уходит и
#  серверу не известен — в этом весь смысл.
#
#  ПОЧЕМУ СТРОКУ ВЫДАЁМ МЫ, А НЕ БЕРЁМ ЛЮБУЮ. Иначе подпись, добытую в
#  другом месте, можно принести сюда и выдать за свою. Поэтому в строке:
#
#    · наш домен — чтобы подпись с чужого сайта не подошла;
#    · номер человека — чтобы чужую подпись не присвоил другой;
#    · сам адрес — чтобы подпись к одному адресу не подошла к другому;
#    · срок — чтобы старая подпись однажды перестала работать;
#    · отпечаток HMAC на JWT_SECRET — чтобы строку нельзя было придумать
#      самому, не спрашивая сервер.
#
#  Отпечаток избавляет от хранения: проверять нечего, всё в самой строке.
#  Это важно, когда машин больше одной — хранимый одноразовый код на
#  соседней машине не нашёлся бы.
#
#  БЕЗ ПОДПИСИ ПРИВЯЗАТЬ ПО-ПРЕЖНЕМУ МОЖНО: адрес тогда честно помечен
#  непроверенным. Отнимать у людей уже привязанное мы не будем.
_ПОДПИСЬ_ЖИВЁТ = 10 * 60          # сколько секунд годна выданная строка
_ДОМЕН_ПОДПИСИ = os.environ.get("CW_SIGN_DOMAIN", "cube-world.space")


def _отпечаток_вызова(uid: int, адрес: str, до: int) -> str:
    тайна = (os.environ.get("JWT_SECRET", "") or "").encode("utf-8")
    тело = ("%s|%d|%s|%d" % (_ДОМЕН_ПОДПИСИ, uid, адрес.lower(), до)).encode("utf-8")
    return hmac.new(тайна, тело, hashlib.sha256).hexdigest()[:32]


def _строка_для_подписи(uid: int, адрес: str, до: int, отп: str) -> str:
    """Что именно человек увидит в кошельке. Пишем по-человечески: он
    должен понимать, что подписывает, а не видеть набор букв."""
    return (
        "CubeWorld: подтверждение кошелька\n"
        "\n"
        "Домен: %s\n"
        "Аккаунт: #%d\n"
        "Кошелёк: %s\n"
        "Годно до: %s UTC\n"
        "Код: %s\n"
        "\n"
        "Подпись ничего не переводит и не тратит. Она только доказывает, "
        "что кошелёк ваш."
    ) % (_ДОМЕН_ПОДПИСИ, uid, адрес.lower(),
         datetime.utcfromtimestamp(до).strftime("%Y-%m-%d %H:%M:%S"), отп)


@app.get("/wallet/challenge")
async def wallet_challenge(address: str = "", user=Depends(get_current_user)):
    """Выдать строку, которую нужно подписать кошельком."""
    адрес = (address or "").strip()
    if not _АДРЕС.match(адрес):
        raise HTTPException(422, "Адрес кошелька должен быть видa 0x и 40 знаков")
    адрес = адрес.lower()
    до = int(time.time()) + _ПОДПИСЬ_ЖИВЁТ
    отп = _отпечаток_вызова(int(user["id"]), адрес, до)
    return {"ok": True, "message": _строка_для_подписи(int(user["id"]), адрес, до, отп),
            "expires_at": до, "address": адрес}


def _проверить_подпись(uid: int, адрес: str, подпись: str, до):
    """Правда ли подпись сделана закрытым ключом этого адреса.

    Возвращает (да/нет, что сказать человеку).

    Срок (до) приходит вместе с подписью — иначе мы не знали бы, какую
    именно строку человек подписывал, а хранить выданные строки не хочется
    (на второй машине их бы не нашлось). Подделать срок нельзя: внутри
    строки лежит отпечаток HMAC на JWT_SECRET, и со сдвинутым сроком он не
    сойдётся."""
    подпись = (подпись or "").strip()
    if not подпись:
        return False, "Нет подписи"
    try:
        до = int(до or 0)
    except Exception:
        до = 0
    if до <= 0:
        return False, "Не сказано, до какого времени годна подпись"
    сейчас = int(time.time())
    if до < сейчас:
        return False, "Подпись просрочена — запроси новую строку"
    if до > сейчас + _ПОДПИСЬ_ЖИВЁТ + 60:
        return False, "Срок подписи больше разрешённого"

    отп = _отпечаток_вызова(uid, адрес, до)
    сообщение = _строка_для_подписи(uid, адрес, до, отп)

    try:
        from eth_account import Account
        from eth_account.messages import encode_defunct
    except Exception:
        # Библиотеки нет — честно говорим, что проверить нечем, и НЕ
        # помечаем кошелёк проверенным. Молча поставить verified=True было
        # бы обманом: мы утверждали бы то, чего не знаем.
        return False, "Проверка подписи на сервере пока недоступна"

    try:
        кто = Account.recover_message(encode_defunct(text=сообщение),
                                      signature=подпись)
    except Exception:
        return False, "Подпись не разобрать"

    if str(кто or "").lower() != адрес.lower():
        return False, "Подпись сделана другим кошельком"
    return True, ""


@app.post("/wallet/link")
async def link_wallet(body: WalletLinkRequest, user=Depends(get_current_user)):
    """Привязать кошелёк к профилю.

    Деньги это не трогает: выплата уходит на адрес, который человек
    пишет прямо в заявке (payout_address), а не на привязанный. Но
    показывается привязанный адрес другим людям, и до правок с ним
    можно было сделать три неприятные вещи:

      * вписать вместо адреса что угодно — хоть ссылку, хоть разметку;
      * привязать чужой адрес и тем самым ОТОБРАТЬ его: в link_wallet
        стоит ON CONFLICT ... DO UPDATE SET user_id, и адрес молча
        переезжал к тому, кто попросил последним;
      * привязать их сколько угодно и раздуть чужую страницу.

    Теперь закрыто и четвёртое: «привязан» без доказательства больше не
    выдаётся за проверенное. С подписью — verified, без неё — честное
    «непроверено»."""
    адрес = (body.address or "").strip()
    if not _АДРЕС.match(адрес):
        raise HTTPException(422, "Адрес кошелька должен быть видa 0x и 40 знаков")
    адрес = адрес.lower()

    хозяин = db.wallet_owner(адрес)
    if хозяин and int(хозяин) != int(user["id"]):
        raise HTTPException(409, "Этот адрес уже привязан к другому аккаунту")

    if not хозяин and db.wallet_count(user["id"]) >= _КОШЕЛЬКОВ_НА_ЧЕЛОВЕКА:
        raise HTTPException(429, "Больше %d кошельков привязать нельзя"
                                 % _КОШЕЛЬКОВ_НА_ЧЕЛОВЕКА)

    проверен = False
    если_нет = ""
    if body.signature:
        проверен, если_нет = _проверить_подпись(
            int(user["id"]), адрес, body.signature, body.expires_at)
        if not проверен:
            raise HTTPException(422, если_нет or "Подпись не сошлась")

    db.link_wallet(user["id"], адрес, body.chain_id, verified=проверен)
    return {"ok": True, "address": адрес, "verified": проверен}


@app.get("/wallet/my")
async def my_wallets(user=Depends(get_current_user)):
    conn = db.get_db(); c = conn.cursor()
    db._кошельки_готовы(c)
    c.execute(db._q("SELECT address,chain_id,linked_at,verified FROM wallets WHERE user_id=? ORDER BY id DESC"),
              (user["id"],))
    rows = c.fetchall()
    conn.close()
    return [dict(r) for r in rows]

class WalletUnlinkRequest(BaseModel):
    address: str = ""


@app.post("/wallet/unlink")
async def unlink_wallet_ep(body: WalletUnlinkRequest, user=Depends(get_current_user)):
    """Отвязать свой кошелёк.

    v=477. Этого запроса не было вовсе: привязать адрес можно, убрать —
    нельзя. Вписал с опечаткой — он остаётся на странице навсегда, и
    заодно занимает одно из десяти мест. Удаляется только свой адрес:
    user_id в условии, а не один лишь адрес, иначе чужой кошелёк
    отвязал бы любой, кто его знает.
    """
    адрес = (body.address or "").strip().lower()
    if not адрес:
        raise HTTPException(400, "Нужен адрес")
    ушло = db.unlink_wallet(user["id"], адрес)
    if not ушло:
        raise HTTPException(404, "Такой адрес у тебя не привязан")
    return {"ok": True, "address": адрес}


# ── Premium ───────────────────────────────────────────────────────────────────

@app.get("/premium/status")
async def premium_status(user=Depends(get_current_user)):
    info = db.get_premium_info(user["id"])
    is_active = db.is_premium(user["id"])
    return {"is_premium": is_active, "info": info}

@app.post("/premium/activate")
async def activate_premium(request: Request, body: PremiumActivateRequest,
                           user=Depends(get_current_user)):
    """Включить подписку после оплаты.

    Раньше этот адрес включал премиум по просьбе: без оплаты, без пароля и
    без предела на число месяцев. А подписка — пропуск к фонду наград и к
    заявке на выплату в живых долларах (database.claim_reward). То есть
    цепочка «завёл ключ → попросил премиум → подал заявку на деньги»
    работала у любого, кто разглядел адрес.

    Теперь так же, как у тарифов: включает только тот, кто знает
    ADMIN_SECRET — сейчас это рука человека после оплаты, дальше ответ
    платёжного провайдера. Человеку для покупки за CUBE есть /premium/buy,
    он списывает со счёта."""
    секрет = request.headers.get("X-Admin-Secret", "")
    if not секрет:
        raise HTTPException(402, "Подписка включается после оплаты, а не отсюда")
    _check_admin(секрет)
    месяцев = max(1, min(int(body.months or 1), 24))
    db.activate_premium(user["id"], месяцев, body.payment_method, body.tx_hash)
    # Пригласившему платим здесь и только здесь: друг оплатил подписку, значит
    # пришли настоящие деньги, и награда берётся из них.
    try:
        paid = db.ref_pay_on_subscription(user["id"], db.REF_PAID_CUBE)
    except Exception:
        paid = None
    if paid:
        try:
            await _notify_user(paid["inviter_id"], {
                "type": "referral_reward",
                "amount": paid["cube"],
                "friend": paid["friend_name"],
                "balance": db.get_cube_balance(paid["inviter_id"]),
            })
        except Exception:
            pass
    return {"ok": True, "message": f"Premium активирован на {body.months} мес."}

# ── Activity tracking ─────────────────────────────────────────────────────────

@app.post("/activity/ping")
async def activity_ping(user=Depends(get_current_user)):
    """Frontend calls this every 60s while tab is active."""
    db.ping_activity(user["id"])
    return {"ok": True}

@app.get("/activity/stats")
async def activity_stats(user=Depends(get_current_user)):
    stats = db.get_my_activity_stats(user["id"])
    is_prem = db.is_premium(user["id"])
    return {**stats, "is_premium": is_prem}

def _лимит(user, действие, n: int = 1):
    """Списать шаг суточного лимита. Не хватило — честно говорим и не делаем.

    Считает сервер. Накрутить ничего нельзя: страница может слать сколько
    угодно запросов, но каждый упирается в один и тот же счётчик в базе."""
    try:
        uid = user["id"] if isinstance(user, dict) else int(user)
    except Exception:
        return
    try:
        с = db.take_quota(uid, действие, n)
    except Exception:
        return                      # база не ответила — работу не ломаем
    if not с.get('ok'):
        имя = db.НАЗВАНИЯ_ЛИМИТОВ.get(действие, действие)
        raise HTTPException(429, f"На сегодня хватит: {имя} — {с.get('limit')} в сутки. "
                                 f"Счётчик обнулится в полночь по UTC.")


# ══════════════════════════════════════════════════════════════════════════
#  МОДЕРАЦИЯ
#  ---------------------------------------------------------------------
#  Один вызов перед публикацией. Проверка живёт в moderation.py; здесь —
#  только решение, что с ответом делать: пропустить, пропустить и положить
#  в очередь на разбор или отказать.
#
#  Маркетплейс сюда намеренно не заведён.
# ══════════════════════════════════════════════════════════════════════════
try:
    import moderation as mod
except Exception:
    mod = None


def _отпечаток(текст: str) -> str:
    return hashlib.sha1((текст or '').strip().lower().encode('utf-8')).hexdigest()[:20]


def _модерация(user, текст, вид='пост', ref=''):
    """Проверить текст перед публикацией.

    Возвращает вердикт строкой. На 'отказ' бросает 422 с понятным текстом:
    422 выбран нарочно — это «текст не подошёл», а не «что-то сломалось»,
    и страница может показать причину как есть."""
    if not mod or not str(текст or '').strip():
        return 'ok'
    try:
        uid = user["id"] if isinstance(user, dict) else int(user)
    except Exception:
        uid = 0

    отп = _отпечаток(текст)
    прошлых = 0
    try:
        прошлых = db.mod_repeats(uid, вид, отп)
    except Exception:
        pass

    try:
        r = mod.проверить(текст, вид=вид, прошлые=([текст] * (прошлых + 1)) if прошлых >= 2 else None)
    except Exception:
        return 'ok'                 # проверка сломалась — публикацию не рушим

    try:
        db.mod_touch(uid, вид, отп)
    except Exception:
        pass

    if r['вердикт'] != 'ok':
        try:
            db.mod_add(uid, вид, r['вердикт'], r['причина'], r['метки'], r['вес'], текст, ref)
        except Exception:
            pass

    if r['вердикт'] == 'отказ':
        raise HTTPException(422, mod.сообщение_отказа(r['причина'], вид))
    return r['вердикт']


# Подбор пароля к панели: считаем неудачные попытки по адресу и закрываемся
# на четверть часа после десятой. Память, а не база: перезапуск сервиса
# счётчики обнуляет — для подбора это всё равно слишком медленно.
_адм_попытки: Dict[str, list] = {}
_АДМ_ПРЕДЕЛ = 10
_АДМ_ОКНО = 900.0


def _адм_можно(откуда: str) -> bool:
    сейчас = datetime.utcnow().timestamp()
    было = [т for т in _адм_попытки.get(откуда, []) if сейчас - т < _АДМ_ОКНО]
    _адм_попытки[откуда] = было
    return len(было) < _АДМ_ПРЕДЕЛ


def _адм_мимо(откуда: str) -> None:
    _адм_попытки.setdefault(откуда, []).append(datetime.utcnow().timestamp())


#  Сторож: что он видит и как его поправить.
#
#  Это нужно не для красоты. Защита, которая решает сама и не отчитывается,
#  однажды закроет дверь перед своим — и будет непонятно, почему «сайт не
#  работает». Поэтому: список закрытых, журнал с поводами и кнопка
#  «отпустить».
@app.get("/admin/guard")
async def admin_guard(request: Request, log: int = 60):
    _check_admin(request.headers.get("X-Admin-Secret", ""))
    if _сторож is None:
        return {"ok": False, "detail": "Сторож не подключён"}
    return {"ok": True, "свод": _сторож.свод(),
            "закрытые": _сторож.закрытые(),
            "журнал": _сторож.журнал(max(1, min(400, int(log))))}


class ОтпуститьЗапрос(BaseModel):
    address: str = ""


@app.post("/admin/guard/release")
async def admin_guard_release(body: ОтпуститьЗапрос, request: Request):
    _check_admin(request.headers.get("X-Admin-Secret", ""))
    if _сторож is None:
        raise HTTPException(503, "Сторож не подключён")
    адрес = (body.address or "").strip()
    if not адрес:
        raise HTTPException(400, "Нужен адрес")
    return {"ok": True, "был_закрыт": _сторож.отпустить(адрес)}


@app.get("/admin/overview")
async def admin_overview(request: Request,
                         x_admin_secret: str = Header(default="")):
    """Сводка по всей площадке для админ-панели.

    Дверь та же, что у остальных служебных адресов: пароль из ADMIN_SECRET.
    Если он на сервере не задан, вход закрыт для всех — запасных ключей в
    коде нет. Отдельно говорим об этом, иначе непонятно, почему не пускает.

    Пароль ждём в заголовке X-Admin-Secret, а не в адресе: то, что стоит в
    строке запроса, оседает в журналах сервера и посредников и остаётся в
    истории браузера. Приём пароля через ?secret= убран совсем: строка
    запроса оседает в журналах сервера и посредников, и этого хватает,
    чтобы пароль утёк, ни разу не будучи подобранным.
    """
    if not ADMIN_SECRET:
        raise HTTPException(503, "На сервере не задан ADMIN_SECRET — панель закрыта")
    откуда = _откуда(request)
    if not _адм_можно(откуда):
        raise HTTPException(429, "Слишком много попыток — подожди четверть часа")
    пароль = (x_admin_secret or "").strip()
    try:
        _check_admin(пароль)
    except HTTPException:
        _адм_мимо(откуда)
        raise
    _адм_попытки.pop(откуда, None)
    сводка = db.admin_overview()
    сводка["сервер"] = {
        "версия": app.version,
        "время": datetime.utcnow().isoformat(timespec="seconds") + "Z",
        "кубов_в_эфире": len(cube_rooms),
        "соединений": sum(len(v) for v in cube_rooms.values()),
        "хранилище": os.getenv("STORAGE", "local"),
    }
    return сводка


@app.get("/admin/moderation")
async def admin_moderation(request: Request, status: str = "", limit: int = 100):
    _check_admin(request.headers.get("X-Admin-Secret", ""))
    return {"ok": True, "stats": db.mod_stats(), "items": db.mod_list(status or None, limit)}


@app.post("/admin/moderation/{case_id}/{decision}")
async def admin_moderation_decide(case_id: int, decision: str, request: Request = None):
    _check_admin(request.headers.get("X-Admin-Secret", "") if request else "")
    if decision not in ("оставлено", "удалено"):
        raise HTTPException(400, "decision: оставлено | удалено")
    if not db.mod_decide(case_id, decision):
        raise HTTPException(404, "Случай не найден")
    return {"ok": True, "id": case_id, "status": decision}


@app.get("/me/limits")
async def my_limits(user=Depends(get_current_user)):
    """Сколько осталось на сегодня — чтобы окно «Лимиты» не гадало."""
    return {"ok": True, "limits": db.quota_all(user["id"])}


def _act(user_id, event):
    """Записать активность человека. Зовётся сервером в тех местах, где
    действие действительно произошло, а не со слов браузера."""
    try:
        if user_id:
            db.record_activity(int(user_id), event)
    except Exception:
        pass


def _act_other(owner_id, actor_id, event):
    """Записать активность ПОЛУЧАТЕЛЮ действия — автору поста.

    Себе не засчитываем: иначе лайк и комментарий под собственным постом
    превращались бы в бесплатные очки, XP и деньги."""
    try:
        if owner_id and actor_id and int(owner_id) != int(actor_id):
            db.record_activity(int(owner_id), event)
    except Exception:
        pass


class ActivityEventRequest(BaseModel):
    event: str


@app.post("/activity/event")
async def activity_event(body: ActivityEventRequest, user=Depends(get_current_user)):
    """Оставлен ради старых страниц, но больше ничего не записывает.

    Раньше активность приходила СО СЛОВ БРАУЗЕРА: кто угодно мог в цикле
    отправить «мне поставили лайк» и набить и очки, и XP, и деньги — всё это
    считается по тем же колонкам. Теперь сервер записывает только то, что
    сам и сделал: пост, комментарий, лайк, сообщение, голосовое, приглашение.
    """
    return {"ok": True, "ignored": True,
            "note": "активность считает сервер по настоящим действиям"}


# ── Rewards ───────────────────────────────────────────────────────────────────

@app.get("/rewards/estimate")
async def reward_estimate(user=Depends(get_current_user)):
    return db.estimate_reward(user["id"])

@app.post("/rewards/claim")
async def reward_claim(body: RewardClaimRequest, user=Depends(get_current_user)):
    from datetime import datetime as _dt
    month = body.month or _dt.utcnow().strftime('%Y-%m')
    amount, err = db.claim_reward(user["id"], month, body.wallet_address)
    if err:
        raise HTTPException(400, err)
    return {"ok": True, "usd": amount, "wallet": body.wallet_address,
            "message": f"Заявка на ${amount:.2f} создана. Выплата в течение 24ч."}

@app.get("/rewards/history")
async def reward_history(user=Depends(get_current_user)):
    conn = db.get_db(); c = conn.cursor()
    c.execute(db._q("SELECT month,score,usd_amount,wallet_address,status,created_at FROM reward_claims WHERE user_id=? ORDER BY id DESC"),
              (user["id"],))
    rows = c.fetchall()
    conn.close()
    return [dict(r) for r in rows]

@app.get("/rewards/pool")
async def reward_pool_info():
    p = db.reward_pool_get()
    p["remaining_usd"] = round(p["total_usd"] - p["used_usd"], 2)
    p["rates"] = db.reward_rates()
    p["cube_usd"] = db.CUBE_USD
    return p


class RewardPoolSetRequest(BaseModel):
    secret: str = ""
    monthly_usd: Optional[float] = None
    total_usd: Optional[float] = None


@app.post("/admin/reward-pool")
async def reward_pool_set(body: RewardPoolSetRequest):
    """Фонд ставится руками: он равен доле фактической выручки за прошлый месяц.
    Автоматом его считать нечем, пока нет приёма платежей."""
    _check_admin(body.secret)
    return db.reward_pool_set(body.monthly_usd, body.total_usd)

@app.get("/cube/balance")
async def cube_balance(user=Depends(get_current_user)):
    """Баланс, уровень и XP — всё, что показывает шапка кошелька."""
    out = {"balance": db.get_cube_balance(user["id"]), "key_type": user["key_type"]}
    out.update(db.user_level(user["id"]))
    out.update(db.cube_totals(user["id"]))
    out.update(db.cube_split(user["id"]))          # наградные и выручка отдельно
    out["sent_today"] = db.cube_sent_today(user["id"])
    out["transfer_day_limit"] = CUBE_TRANSFER_DAY
    return out

@app.get("/cube/history")
async def cube_history(days: int = 30, user=Depends(get_current_user)):
    """Баланс по дням — для графика в кошельке. Считается по записям в базе."""
    return db.cube_balance_history(user["id"], days)


@app.get("/cube/find")
async def cube_find(q: str, user=Depends(get_current_user)):
    """Кому переводим. Ищем по @нику, имени или #номеру.

    Метки CUBE-… здесь больше нет ни в поиске, ни в ответе."""
    q = (q or "").strip()
    if len(q) < 2:
        return {"users": []}
    try:
        found = db.search_users(q, limit=8, exclude_id=int(user["id"]))
    except Exception:
        found = []
    return {"users": [{"id": u["id"],
                       "name": (u.get("display_name") or u.get("username")
                                or ("#" + str(u["id"]))),
                       "avatar_url": u.get("avatar_url")} for u in found]}


class CubeTransferRequest(BaseModel):
    to_user_id: int
    amount: float
    note: Optional[str] = None


CUBE_TRANSFER_MIN = 0.01
CUBE_TRANSFER_MAX = 10000.0
# Сколько можно перевести другим за сутки. Ключи анонимны, поэтому без
# предела ничто не мешает гонять CUBE между своими же учётками.
CUBE_TRANSFER_DAY = float(os.getenv("CUBE_TRANSFER_DAY", "500"))


@app.post("/cube/transfer")
async def cube_transfer(body: CubeTransferRequest, user=Depends(get_current_user)):
    """Перевод CUBE другому человеку. Списание и зачисление — одной операцией
    на сервере; в браузере ничего не меняется «на веру»."""
    amount = round(float(body.amount or 0), 2)
    if amount < CUBE_TRANSFER_MIN or amount > CUBE_TRANSFER_MAX:
        raise HTTPException(400, f"Сумма от {CUBE_TRANSFER_MIN} до "
                                 f"{int(CUBE_TRANSFER_MAX)} CUBE")
    to_id = int(body.to_user_id or 0)
    if to_id == int(user["id"]):
        raise HTTPException(400, "Себе переводить незачем")
    получатель = db.get_user_by_id(to_id)
    if not получатель:
        raise HTTPException(404, "Получатель не найден")
    # Сначала смотрим, хватает ли вообще денег: это и есть самая частая
    # причина отказа, и человеку надо сказать именно её, а не про предел.
    есть = db.get_cube_balance(user["id"])
    if есть < amount:
        raise HTTPException(400, f"На счету только {round(есть, 2):g} CUBE")
    уже = db.cube_sent_today(user["id"])
    if уже + amount > CUBE_TRANSFER_DAY:
        осталось = max(0.0, round(CUBE_TRANSFER_DAY - уже, 2))
        raise HTTPException(400, f"За сутки можно перевести {CUBE_TRANSFER_DAY:g} CUBE. "
                                 f"Сегодня осталось {осталось:g}")

    кому = (получатель.get("display_name") or получатель.get("username")
            or получатель.get("key_prefix") or "участник")
    от_кого = (user.get("display_name") or user.get("username")
               or user.get("key_prefix") or "участник")
    note = (body.note or "").strip()[:60]
    хвост = f" · {note}" if note else ""

    res = db.transfer_cube(user["id"], to_id, amount, f"Перевод → {кому}{хвост}")
    if res.get("error") == "not enough":
        raise HTTPException(400, f"На счету только {round(res.get('balance', 0), 2)} CUBE")
    if not res.get("ok"):
        raise HTTPException(400, "Перевод не прошёл")

    # У получателя в истории должно стоять, от кого пришло, а не «Перевод → он сам».
    try:
        db.rename_last_tx(to_id, f"Перевод от {от_кого}{хвост}")
    except Exception:
        pass
    try:
        await _notify_user(to_id, {"type": "cube_transfer_in", "amount": amount,
                                   "from": от_кого})
    except Exception:
        pass
    return {"ok": True, "balance": res.get("balance"), "to": кому, "amount": amount}


# ── Ключи: покупка и подарок ────────────────────────────────────────────────
# Цены знает сервер. Раньше их называл браузер, то есть любой мог купить
# что угодно за ноль, а списание всё равно происходило только на экране.
KEY_TIER_PRICE = {"ghost": 0.0, "shadow": 50.0, "phantom": 200.0,
                  "elite": 500.0, "black": 1000.0}
KEY_TIER_ORDER = ["ghost", "shadow", "phantom", "elite", "black"]
KEY_GIFT_MARKUP = 0.8          # подарочный ключ дешевле своего уровня


class KeyUpgradeRequest(BaseModel):
    to_type: str


@app.post("/keys/upgrade")
async def keys_upgrade(body: KeyUpgradeRequest, user=Depends(get_current_user)):
    """Поднять свой уровень ключа за CUBE. Списывает сервер."""
    to_type = str(body.to_type or "").lower()
    if to_type not in KEY_TIER_PRICE:
        raise HTTPException(400, "Нет такого ключа")
    сейчас = str(user.get("key_type") or "ghost").lower()
    if сейчас not in KEY_TIER_ORDER:
        сейчас = "ghost"
    if KEY_TIER_ORDER.index(to_type) <= KEY_TIER_ORDER.index(сейчас):
        raise HTTPException(400, "У тебя уже есть ключ этого или более высокого уровня")
    цена = KEY_TIER_PRICE[to_type]
    if цена > 0:
        res = db.spend_cube(user["id"], цена, "key_upgrade", f"Ключ {to_type}")
        if res.get("error") == "not enough":
            raise HTTPException(400, f"Нужно {цена:g} CUBE, на счету "
                                     f"{res.get('balance', 0):g}")
        if not res.get("ok"):
            raise HTTPException(400, "Покупка не прошла")
    try:
        db.upgrade_key(user["id"], to_type, 0.0)
    except Exception:
        raise HTTPException(500, "Ключ не обновился")
    return {"ok": True, "key_type": to_type,
            "balance": db.get_cube_balance(user["id"])}


class KeyGiftRequest(BaseModel):
    tier: str


@app.post("/keys/gift")
async def keys_gift(body: KeyGiftRequest, user=Depends(get_current_user)):
    """Купить ключ в подарок. Теперь это настоящий ключ: сервер заводит его
    как ожидающий, и получатель действительно сможет по нему войти.

    Раньше код подарочного ключа придумывал браузер и клал себе в память —
    получателю он не подходил ни при каких условиях."""
    tier = str(body.tier or "").lower()
    if tier not in KEY_TIER_PRICE or tier == "ghost":
        raise HTTPException(400, "Такой ключ подарить нельзя")
    цена = round(KEY_TIER_PRICE[tier] * KEY_GIFT_MARKUP, 2)
    res = db.spend_cube(user["id"], цена, "key_gift", f"Подарочный ключ {tier}")
    if res.get("error") == "not enough":
        raise HTTPException(400, f"Нужно {цена:g} CUBE, на счету "
                                 f"{res.get('balance', 0):g}")
    if not res.get("ok"):
        raise HTTPException(400, "Покупка не прошла")

    for _ in range(10):
        raw_key = generate_cube_key()
        key_hash = db.hash_key(raw_key)
        if not db.get_user_by_key_hash(key_hash) and not db.get_pending_key_by_hash(key_hash):
            break
    else:
        # Деньги списаны, а ключ не вышел — возвращаем.
        db.add_cube_balance(user["id"], цена, "refund", "Возврат: ключ не создался")
        raise HTTPException(500, "Ключ не создался, CUBE возвращены")
    db.create_pending_key(key_hash, public_tag(), key_type=tier, hours=24 * 30)
    return {"ok": True, "key": raw_key, "tier": tier, "price": цена,
            "valid_days": 30, "balance": db.get_cube_balance(user["id"])}


class KeyRedeemRequest(BaseModel):
    key: str


@app.post("/keys/redeem")
async def keys_redeem(body: KeyRedeemRequest, user=Depends(get_current_user)):
    """Активировать подарочный ключ на СВОЙ аккаунт.

    Раньше это делал браузер: он вытаскивал уровень из трёх букв в коде и
    записывал его себе в память. Любой выдуманный код «активировал» Black
    Key бесплатно, а настоящий подарок при этом оставался неиспользованным.

    Теперь ключ гасится по-настоящему: он исчезает из ожидающих, второй раз
    им уже не воспользоваться, и уровень поднимается в базе.
    """
    raw = str(body.key or "").strip().upper()
    if not raw:
        raise HTTPException(400, "Введите ключ")

    # Ответ один на все случаи. Раньше их было два: «это ключ входа в чужой
    # аккаунт» и «ключ не найден». Разница в словах — это подсказка: подбирая
    # коды, по ней видно, какой из них настоящий чужой вход, а какой пустышка.
    ОТКАЗ = "Ключ не найден или у него вышел срок"
    чужой, _ = db.найти_по_ключу(raw)
    if чужой:
        raise HTTPException(400, ОТКАЗ)

    pending, key_hash = db.найти_ожидающий_ключ(raw)
    if not pending:
        raise HTTPException(400, ОТКАЗ)

    новый = str(pending.get("key_type") or "").lower()
    if новый not in KEY_TIER_ORDER or новый == "ghost":
        raise HTTPException(400, "По этому ключу поднимать нечего")

    сейчас = str(user.get("key_type") or "ghost").lower()
    if сейчас not in KEY_TIER_ORDER:
        сейчас = "ghost"
    if KEY_TIER_ORDER.index(новый) <= KEY_TIER_ORDER.index(сейчас):
        raise HTTPException(400, "У тебя уже есть ключ этого или более высокого уровня")

    db.consume_pending_key(key_hash)
    try:
        db.upgrade_key(user["id"], новый, 0.0)
    except Exception:
        raise HTTPException(500, "Ключ не обновился")
    return {"ok": True, "key_type": новый}


@app.get("/cube/transactions")
async def cube_transactions(limit: int = 40, user=Depends(get_current_user)):
    """Настоящая история движений по счёту. На экране раньше лежал
    одинаковый у всех вписанный список — его больше нет."""
    limit = max(1, min(int(limit or 40), 200))
    return {"transactions": db.cube_transactions(user["id"], limit)}

# ── Groups ────────────────────────────────────────────────────────────────────

import re as _re
_HANDLE_RE = _re.compile(r'^[a-z0-9_]{3,24}$')

@app.get("/groups")
async def list_groups(creds: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme)):
    """List public groups. Optional auth to get is_member flag."""
    uid = None
    if creds:
        try:
            payload = decode_access_token(creds.credentials)
            user = db.get_user_by_id(int(payload["sub"]))
            if user: uid = user["id"]
        except Exception:
            pass
    return db.get_groups(limit=50, user_id=uid)

@app.get("/groups/my")
async def my_groups(user=Depends(get_current_user)):
    return db.get_my_groups(user["id"])

@app.get("/groups/search")
async def search_groups(q: str = "", creds: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme)):
    uid = None
    if creds:
        try:
            payload = decode_access_token(creds.credentials)
            u = db.get_user_by_id(int(payload["sub"]))
            if u: uid = u["id"]
        except Exception:
            pass
    return db.search_groups(q, limit=20, user_id=uid)

@app.post("/groups")
async def create_group(body: CreateGroupRequest, user=Depends(get_current_user)):
    _лимит(user, "grp_new")
    if not body.name.strip():
        raise HTTPException(400, "Name required")
    gtype = body.type if body.type in ('public', 'private') else 'public'
    # Название и описание группы стоят на виду у всех — проверяем строже.
    _модерация(user, (body.name.strip() + "\n" + (body.description or '')).strip(), "имя")
    gid = db.create_group(user["id"], body.name.strip(), body.description or '', body.icon or '👥', gtype)
    if not gid:
        raise HTTPException(500, "Could not create group")
    groups = db.get_my_groups(user["id"])
    created = next((g for g in groups if g["id"] == gid), None)
    return created or {"id": gid}

@app.post("/groups/{group_id}/join")
async def join_group(group_id: int, user=Depends(get_current_user)):
    ok = db.join_group(group_id, user["id"])
    if not ok:
        raise HTTPException(404, "Group not found")
    return {"joined": True, "group_id": group_id}

@app.post("/groups/{group_id}/leave")
async def leave_group(group_id: int, user=Depends(get_current_user)):
    ok = db.leave_group(group_id, user["id"])
    if not ok:
        raise HTTPException(400, "Cannot leave (not a member or you are the owner)")
    return {"left": True, "group_id": group_id}

@app.post("/groups/{group_id}/handle")
async def set_group_handle(group_id: int, body: SetGroupHandleRequest, user=Depends(get_current_user)):
    handle = body.handle.lower().strip()
    if not _HANDLE_RE.match(handle):
        raise HTTPException(400, "Handle must be 3-24 chars: a-z 0-9 _")
    ok = db.set_group_handle(group_id, user["id"], handle)
    if not ok:
        raise HTTPException(400, "Handle taken or not your group")
    return {"handle": handle}

class UpdateGroupRequest(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None


@app.patch("/groups/{group_id}")
async def update_group(group_id: int, body: UpdateGroupRequest,
                       user=Depends(get_current_user)):
    """Переименовать группу, сменить описание и значок. Только владелец.

    До этого окно «Настройки группы» ничего не сохраняло: оно меняло две
    надписи на экране и говорило «Настройки сохранены». После обновления
    страницы всё возвращалось назад.
    """
    if body.name is not None and not str(body.name).strip():
        raise HTTPException(400, "Название не может быть пустым")
    info = db.update_group(group_id, user["id"],
                           name=body.name, description=body.description,
                           icon=body.icon)
    if not info:
        raise HTTPException(403, "Это не твоя группа или её нет")
    # v=584 · Выбрали значок — он и становится лицом группы. Снимки
    # остаются в сведениях, но поверх значка их больше не кладут:
    # «либо фото, либо смайл — один тип на аву».
    if body.icon:
        try:
            db.group_avatar_mode(group_id, "icon", int(user["id"]))
        except Exception:
            pass
    # v=583 · Название и значок группы меняются у всех её участников сразу.
    try:
        await _участникам(group_id, {
            "type": "group_changed",
            "group_id": int(group_id),
            "name": info.get("name") or "",
            "icon": info.get("icon") or "",
            "description": info.get("description") or "",
        })
    except Exception:
        pass
    return {"ok": True, "group": info}


@app.get("/groups/{group_id}/messages")
async def get_group_messages(group_id: int, user=Depends(get_current_user)):
    info = db.get_group_info(group_id, user["id"])
    if not info:
        raise HTTPException(404, "Group not found")
    if not info.get("is_member"):
        raise HTTPException(403, "Not a member")
    msgs = db.get_group_messages(group_id, limit=80)
    return msgs

@app.post("/groups/{group_id}/messages")
async def send_group_message(group_id: int, body: GroupMessageRequest, user=Depends(get_current_user)):
    _лимит(user, "grp_msg")
    info = db.get_group_info(group_id, user["id"])
    if not info:
        raise HTTPException(404, "Group not found")
    if not info.get("is_member"):
        raise HTTPException(403, "Not a member")
    content = body.content.strip()[:2000]
    if not content:
        raise HTTPException(400, "Empty message")
    # В группе сообщение видят все участники — значит, это публичное слово.
    if (body.msg_type or "text") == "text":
        _модерация(user, content, "сообщение", ref="group:%s" % group_id)
    display_name = db.get_display_name(user["id"])
    expires_at = _expiry_at(body.expire_seconds)
    mid = db.add_group_message(group_id, user["id"], display_name, content,
                               body.msg_type or "text", expires_at=expires_at)
    _act(user["id"], "voice" if (body.msg_type or "") == "voice" else "message")
    msg = {"id": mid, "group_id": group_id, "user_id": user["id"],
           "display_name": display_name, "content": content,
           "msg_type": body.msg_type or "text",
           "expire_at": expires_at,
           "created_at": datetime.utcnow().isoformat()}
    # Broadcast to group members in group_ws rooms
    for ws in list(_group_ws.get(str(group_id), {}).values()):
        try:
            await ws.send_json({"type": "group_msg", "group_id": group_id, **msg})
        except Exception:
            pass
    await _ref_touch(user["id"])
    return msg

def _row_val(row, key, idx=0):
    """Достаёт поле строки одинаково для sqlite3.Row, dict и кортежа.

    На SQLite курсор отдаёт sqlite3.Row — у него нет .get(), и правка с
    удалением сообщения в группе падали с ошибкой 500.
    """
    if row is None:
        return None
    try:
        return row[key]
    except Exception:
        pass
    try:
        return row.get(key)
    except Exception:
        pass
    try:
        return row[idx]
    except Exception:
        return None

@app.put("/groups/{group_id}/messages/{msg_id}")
async def edit_group_message(group_id: int, msg_id: int, body: dict, user=Depends(get_current_user)):
    """Edit own group message."""
    info = db.get_group_info(group_id, user["id"])
    if not info or not info.get("is_member"):
        raise HTTPException(403, "Not a member")
    new_content = (body.get("content") or "").strip()
    if not new_content:
        raise HTTPException(400, "Content required")
    conn = db.get_db(); c = conn.cursor()
    if db._PG:
        c.execute("SELECT user_id FROM group_messages WHERE id=%s AND group_id=%s", (msg_id, group_id))
    else:
        c.execute("SELECT user_id FROM group_messages WHERE id=? AND group_id=?", (msg_id, group_id))
    row = c.fetchone()
    if not row:
        conn.close(); raise HTTPException(404, "Message not found")
    msg_owner = _row_val(row, "user_id")
    if str(msg_owner) != str(user["id"]):
        conn.close(); raise HTTPException(403, "Cannot edit other's message")
    # v=550 · Правку помечаем в базе: без этого метка «изменено» пропадала
    # при следующем чтении группы. Старая база колонки не знает — тогда
    # сохраняем хотя бы текст.
    try:
        if db._PG:
            c.execute("UPDATE group_messages SET content=%s, edited=1 WHERE id=%s", (new_content, msg_id))
        else:
            c.execute("UPDATE group_messages SET content=?, edited=1 WHERE id=?", (new_content, msg_id))
    except Exception:
        if db._PG:
            conn.rollback()
        c = conn.cursor()
        if db._PG:
            c.execute("UPDATE group_messages SET content=%s WHERE id=%s", (new_content, msg_id))
        else:
            c.execute("UPDATE group_messages SET content=? WHERE id=?", (new_content, msg_id))
    conn.commit(); conn.close()
    return {"ok": True, "id": msg_id, "content": new_content, "edited": 1}

@app.delete("/groups/{group_id}/messages/{msg_id}")
async def delete_group_message(group_id: int, msg_id: int, user=Depends(get_current_user)):
    """Delete a group message (own message, or admin)."""
    info = db.get_group_info(group_id, user["id"])
    if not info or not info.get("is_member"):
        raise HTTPException(403, "Not a member")
    conn = db.get_db(); c = conn.cursor()
    # Check ownership
    if db._PG:
        c.execute("SELECT user_id FROM group_messages WHERE id=%s AND group_id=%s", (msg_id, group_id))
    else:
        c.execute("SELECT user_id FROM group_messages WHERE id=? AND group_id=?", (msg_id, group_id))
    row = c.fetchone()
    if not row:
        conn.close(); raise HTTPException(404, "Message not found")
    msg_owner = _row_val(row, "user_id")
    is_admin = (str(info.get("owner_id", "")) == str(user["id"]))
    if str(msg_owner) != str(user["id"]) and not is_admin:
        conn.close(); raise HTTPException(403, "Cannot delete other's message")
    if db._PG:
        c.execute("DELETE FROM group_messages WHERE id=%s", (msg_id,))
    else:
        c.execute("DELETE FROM group_messages WHERE id=?", (msg_id,))
    conn.commit(); conn.close()
    return {"deleted": True}

@app.delete("/groups/{group_id}/messages")
async def clear_group_messages(group_id: int, both: int = 0, user=Depends(get_current_user)):
    """Очистить переписку группы.

    v=563 · Раньше такого адреса не было вовсе: в группе можно было
    «очистить» переписку только у себя на экране, и после перезагрузки
    всё возвращалось. Теперь:
      both=0 — ничего не трогаем на сервере, прячет у себя сам клиент;
      both=1 — стираем сообщения насовсем, и это может только владелец
               группы. Остальным сервер отвечает отказом, а не делает
               вид, что сработало.
    """
    info = db.get_group_info(group_id, user["id"])
    if not info or not info.get("is_member"):
        raise HTTPException(403, "Not a member")
    if not both:
        return {"ok": True, "scope": "me", "count": 0}
    if str(info.get("owner_id", "")) != str(user["id"]):
        raise HTTPException(403, "Only the owner can clear for everyone")
    conn = db.get_db(); c = conn.cursor()
    n = 0
    try:
        c.execute(db._q("SELECT COUNT(*) AS n FROM group_messages WHERE group_id=?"), (group_id,))
        row = c.fetchone()
        n = int(_row_val(row, "n") or 0) if row else 0
        c.execute(db._q("DELETE FROM group_messages WHERE group_id=?"), (group_id,))
        conn.commit()
    except Exception:
        try: conn.rollback()
        except Exception: pass
    conn.close()
    return {"ok": True, "scope": "both", "count": n}

@app.get("/groups/{group_id}/info")
async def get_group_info(group_id: int, creds: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme)):
    uid = None
    if creds:
        try:
            payload = decode_access_token(creds.credentials)
            uid = int(payload["sub"])
        except Exception:
            pass
    info = db.get_group_info(group_id, uid)
    if not info:
        raise HTTPException(404, "Group not found")
    return info

@app.get("/groups/{group_id}/members")
async def get_group_members(group_id: int, user=Depends(get_current_user)):
    info = db.get_group_info(group_id, user["id"])
    if not info:
        raise HTTPException(404, "Group not found")
    if not info.get("is_member"):
        raise HTTPException(403, "Not a member")
    return db.get_group_members(group_id)

@app.post("/groups/join-key")
async def join_group_by_key(body: JoinGroupByKeyRequest, user=Depends(get_current_user)):
    g = db.join_group_by_key(body.key.strip(), user["id"])
    if not g:
        raise HTTPException(404, "Ключ не найден или группа недоступна")
    return {"joined": True, "group": g}

@app.post("/groups/{group_id}/set-key")
async def set_group_key(group_id: int, body: SetGroupKeyRequest, user=Depends(get_current_user)):
    ok = db.set_group_key(group_id, user["id"], body.key.strip())
    if not ok:
        raise HTTPException(403, "Только владелец может установить ключ")
    return {"ok": True}

@app.post("/feed/{post_id}/view")
async def record_post_view(post_id: int, user=Depends(get_current_user)):
    """Просмотр засчитывается один раз на человека, и только вошедшему.

    Раньше обработчик не просил токен и прибавлял единицу на каждый вызов —
    десять тысяч просмотров набирались циклом за минуту. По таблице ставок
    это настоящие деньги, поэтому накрутка закрыта."""
    ok = db.increment_post_views(post_id, user["id"])
    return {"ok": bool(ok), "views": db.post_view_count(post_id)}

# ══════════════════════════════════════════════════════════════════════════
#  ЗАГРУЗКА ФАЙЛОВ
#  ---------------------------------------------------------------------
#  Байты больше не идут через сервер, если хранилище настроено. Сервер
#  проверяет человека, выдаёт подписанный билет с путём — и браузер грузит
#  напрямую. Раньше всё шло насквозь: для картинки терпимо, для видео на
#  два гигабайта это гарантированная смерть маленького сервиса.
# ══════════════════════════════════════════════════════════════════════════

class UploadTicketRequest(BaseModel):
    filename: str = ""
    kind: str = "doc"          # image | audio | doc | clip | movie
    size: int = 0


@app.get("/upload/status")
async def upload_status():
    """Что настроено в хранилище. Нужно, чтобы не гадать, почему видео не
    играет: сразу видно, подключён Stream или нет."""
    return st.status()


@app.post("/upload/ticket")
async def upload_ticket(body: UploadTicketRequest, user=Depends(get_current_user)):
    """Разрешение на загрузку: куда класть и чем подписано."""
    prem = False
    try:
        prem = bool(db.is_premium(user["id"]))
    except Exception:
        pass
    билет = st.upload_ticket(user["id"], body.filename, body.kind,
                             size=body.size, is_premium=prem)
    if билет.get("error"):
        raise HTTPException(413 if билет["error"] == "too_big" else 400,
                            билет.get("message") or "Загрузка отклонена")
    return билет


@app.post("/upload/direct")
async def upload_direct(file: UploadFile = File(...), path: str = "",
                        exp: int = 0, sig: str = "", kind: str = "doc",
                        user=Depends(get_current_user)):
    """Загрузка через сервер. Работает, пока внешнее хранилище не подключено,
    и для мелких файлов. Путь обязан быть тем, который сервер сам и выдал."""
    if not st.check_ticket(path, user["id"], kind, exp, sig):
        raise HTTPException(403, "Разрешение на загрузку недействительно")
    предел = (st.movie_limit(bool(db.is_premium(user["id"])))
              if kind == "movie" else st.MAX_BYTES.get(kind, st.MAX_BYTES["doc"]))
    куски, всего = [], 0
    while True:
        кусок = await file.read(1024 * 1024)
        if not кусок:
            break
        всего += len(кусок)
        if всего > предел:
            raise HTTPException(413, "Файл больше %s МБ" % (предел // 1024 // 1024))
        куски.append(кусок)
    url = st.save_local(path, b"".join(куски))
    if not url:
        raise HTTPException(400, "Не удалось сохранить")
    return {"ok": True, "url": url, "size": всего, "storage": st.provider()}


@app.get("/upload/chunk")
async def upload_chunk_state(path: str = "", exp: int = 0, sig: str = "",
                             kind: str = "doc", user=Depends(get_current_user)):
    """Какие куски уже дошли. По этому списку браузер продолжает с места
    обрыва, а не начинает двухгигабайтный файл заново."""
    if not st.check_ticket(path, user["id"], kind, exp, sig):
        raise HTTPException(403, "Разрешение на загрузку недействительно")
    return {"ok": True, "have": st.chunk_have(path), "chunk_size": st.CHUNK_SIZE}


@app.post("/upload/chunk")
async def upload_chunk(file: UploadFile = File(...), path: str = "",
                       exp: int = 0, sig: str = "", kind: str = "movie",
                       index: int = 0, total: int = 0,
                       user=Depends(get_current_user)):
    """Принять один кусок. Последний кусок склеивает файл и кладёт в хранилище."""
    if not st.check_ticket(path, user["id"], kind, exp, sig):
        raise HTTPException(403, "Разрешение на загрузку недействительно")
    if index < 0 or total <= 0 or index >= total:
        raise HTTPException(400, "Неверный номер куска")
    данные = await file.read()
    if len(данные) > st.CHUNK_SIZE * 2:
        raise HTTPException(413, "Кусок слишком большой")
    предел = (st.movie_limit(bool(db.is_premium(user["id"])))
              if kind == "movie" else st.MAX_BYTES.get(kind, st.MAX_BYTES["doc"]))
    if total * st.CHUNK_SIZE > предел + st.CHUNK_SIZE:
        raise HTTPException(413, "Файл больше разрешённого")
    st.chunk_save(path, index, данные)
    есть = st.chunk_have(path)
    if len(есть) < total:
        return {"ok": True, "done": False, "have": len(есть), "total": total}
    итог = st.chunk_finish(path, total)
    if итог.get("error"):
        return {"ok": False, "done": False, "error": итог["error"],
                "missing": итог.get("missing")}
    return {"ok": True, "done": True, "url": итог["url"], "storage": st.provider()}


@app.delete("/upload/chunk")
async def upload_chunk_drop(path: str = "", exp: int = 0, sig: str = "",
                            kind: str = "movie", user=Depends(get_current_user)):
    """Передумал — выбрасываем недособранное."""
    if not st.check_ticket(path, user["id"], kind, exp, sig):
        raise HTTPException(403, "Разрешение на загрузку недействительно")
    st.chunk_drop(path)
    return {"ok": True}


# ── Видео для ленты ─────────────────────────────────────────────────────────

class ClipCreateRequest(BaseModel):
    title: str = ""
    seconds: int = 0


@app.post("/video/clip")
async def video_clip_create(body: ClipCreateRequest, user=Depends(get_current_user)):
    """Завести ролик в Bunny Stream и получить место для загрузки.

    Stream сам перекодирует в 360p / 720p / 1080p и снимет кадр-заставку.
    Плеер потом берёт качество по скорости связи — именно это и даёт
    мгновенный старт на слабом интернете.
    """
    сек = int(body.seconds or 0)
    if сек and сек > st.CLIP_MAX_SECONDS:
        raise HTTPException(400, "Ролик в ленту не длиннее %s секунд"
                                 % st.CLIP_MAX_SECONDS)
    итог = st.stream_create(body.title or "clip", user["id"])
    if итог.get("error"):
        raise HTTPException(503, итог.get("message") or "Видео пока недоступно")
    return итог


@app.get("/video/clip/{video_id}")
async def video_clip_info(video_id: str, user=Depends(get_current_user)):
    """Готов ли ролик. Пока идёт перекодировка, играть его нельзя."""
    return st.stream_info(video_id)


# ── Cubes CRUD ────────────────────────────────────────────────────────────────

@app.get("/cubes")
async def list_cubes(viewer=Depends(get_user_optional)):
    """Кубы для мира. Закрытые видит только хозяин и тот, кто уже заходил
    по ключу: раньше список отдавал их всем подряд вместе с номерами и
    работал оглавлением к чужим перепискам."""
    db.deactivate_expired_cubes()
    return db.list_cubes(viewer["id"] if viewer else None)

@app.post("/cubes")
async def create_cube(body: CreateCubeRequest, user=Depends(get_current_user)):
    name      = body.name.strip()[:50] or "My Cube"
    desc      = body.description[:200]
    icon      = body.icon[:65536]  # allow full base64 photo (64×64 JPEG ≈ 4KB)
    color     = body.color[:20]
    ctype     = "public" if body.type == "public" else "private"
    life_h    = max(1, min(body.life_hours, 8760))
    # Кубов по тарифу: три, десять, тридцать три. Считаем живые — погасший
    # куб места не занимает, иначе предел упирался бы в прошлое.
    план = db.get_plan(user["id"])
    предел = int(db.plan_limits(план)["кубов"])
    занято = db.count_own_cubes(user["id"])
    if _тарифы_строго() and занято >= предел:
        raise HTTPException(402, f"На тарифе {db.plan_limits(план)['имя']} "
                                 f"одновременно {предел} своих кубов, и они заняты. "
                                 f"Силвер — 10, Голд — 33.")
    _модерация(user, (name + "\n" + desc).strip(), "имя")
    cube_id, cube_key = db.create_cube(user["id"], name, desc, icon, color, ctype, life_h)
    return {"id": cube_id, "name": name, "type": ctype, "life_hours": life_h,
            "cube_key": cube_key, "ok": True}

@app.delete("/admin/cubes/all")
async def delete_all_user_cubes(request: Request):
    """Удалить все кубы людей. Пароль только заголовком: в строке запроса
    он осел бы в журналах, а это адрес, который стирает чужое."""
    _check_admin(request.headers.get("X-Admin-Secret", ""))
    deleted = db.delete_all_user_cubes()
    return {"ok": True, "deleted": deleted}

class UpdateCubeIconRequest(BaseModel):
    icon: str = ""

@app.patch("/cubes/{cube_id}/icon")
async def update_cube_icon(cube_id: int, body: UpdateCubeIconRequest, user=Depends(get_current_user)):
    """Owner: update cube icon (e.g. fix truncated base64 from old bug)."""
    icon = body.icon[:65536]
    conn = db.get_db(); c = conn.cursor()
    try:
        c.execute(db._q("UPDATE cubes SET icon=? WHERE id=? AND owner_id=?"), (icon, cube_id, user["id"]))
        if c.rowcount == 0:
            conn.close(); raise HTTPException(status_code=403, detail="Только создатель может обновить иконку")
        conn.commit(); conn.close()
        return {"ok": True}
    except HTTPException:
        raise
    except Exception as e:
        if db._PG: conn.rollback()
        conn.close()
        # Наружу — без подробностей: текст ошибки базы выдаёт имена таблиц
        # и колонок. В журнал пишем целиком, отвечаем коротко.
        print("[ошибка базы]", repr(e))
        raise HTTPException(status_code=500, detail="Внутренняя ошибка")

@app.delete("/cubes/{cube_id}")
async def delete_cube(cube_id: int, user=Depends(get_current_user)):
    # Get cube name and all visitors BEFORE deleting (so we can notify them)
    cube_name = ""
    visitor_uids = []
    try:
        conn2 = db.get_db(); c2 = conn2.cursor()
        c2.execute(db._q("SELECT name FROM cubes WHERE id=? AND owner_id=?"), (cube_id, user["id"]))
        row2 = c2.fetchone()
        if row2:
            cube_name = row2["name"] if db._PG else row2[0]
        c2.execute(db._q("SELECT user_id FROM cube_visitors WHERE cube_id=?"), (cube_id,))
        visitor_uids = [r["user_id"] if db._PG else r[0] for r in c2.fetchall()]
        conn2.close()
    except Exception:
        pass
    deleted = db.delete_cube(cube_id, user["id"])
    if not deleted:
        raise HTTPException(status_code=404, detail="Куб не найден или вы не владелец")
    # Notify all members (visitors) that cube was deleted — they'll remove it from their world
    notify_msg = {"type": "cube_deleted", "cube_id": cube_id, "cube_name": cube_name}
    for uid in visitor_uids:
        try:
            await _notify_user(int(uid), notify_msg)
        except Exception:
            pass
    # Also broadcast to anyone currently in the cube room WS
    cube_id_str = str(cube_id)
    if cube_id_str in cube_rooms:
        for uid_str, info in list(cube_rooms[cube_id_str].items()):
            try:
                await info["ws"].send_json(notify_msg)
                await info["ws"].close(code=1001)
            except Exception:
                pass
    return {"ok": True, "deleted_id": cube_id}

@app.post("/cubes/{cube_id}/kick")
async def kick_user_from_cube(cube_id: int, request: Request, user=Depends(get_current_user)):
    try:
        body = await request.json()
    except Exception:
        raise HTTPException(400, "invalid json body")
    uid_str = str(body.get("uid","")).strip().lstrip("#")
    if not uid_str:
        raise HTTPException(400, "uid required")
    try:
        target_uid = int(uid_str)
    except ValueError:
        raise HTTPException(400, "invalid uid")
    # Check ownership directly — works even on expired/inactive cubes
    conn = db.get_db()
    cur = conn.cursor()
    cur.execute(db._q("SELECT owner_id FROM cubes WHERE id=?"), (cube_id,))
    row = cur.fetchone()
    conn.close()
    if not row:
        raise HTTPException(404, "Куб не найден")
    row_owner = row["owner_id"] if db._PG else row[0]
    if int(row_owner) != int(user["id"]):
        raise HTTPException(403, "Вы не владелец куба")
    # Gather kicked user's IP hash and device_id for cross-account block
    kicked_ip_hash = None
    kicked_device_id = None
    try:
        # If kicked user is in the cube room, grab their IP from sessions
        import hashlib
        kicked_ip = None
        if str(cube_id) in cube_rooms and str(target_uid) in cube_rooms[str(cube_id)]:
            room_info = cube_rooms[str(cube_id)][str(target_uid)]
            kicked_ip = room_info.get("ip")
            kicked_device_id = room_info.get("device_id")
        if kicked_ip:
            kicked_ip_hash = db.hash_ip(kicked_ip, 16)
    except Exception:
        pass
    # Record ban with IP hash + device_id for cross-account blocking
    try:
        db.ban_user_from_cube(cube_id, target_uid, int(user["id"]),
                              ip_hash=kicked_ip_hash, device_id=kicked_device_id)
    except Exception:
        pass
    # Get cube name for notification
    cube_name = ""
    try:
        conn3 = db.get_db(); c3 = conn3.cursor()
        c3.execute(db._q("SELECT name FROM cubes WHERE id=?"), (cube_id,))
        r3 = c3.fetchone()
        if r3: cube_name = r3["name"] if db._PG else r3[0]
        conn3.close()
    except Exception:
        pass
    # Kick via WebSocket if user is currently inside the cube room
    cube_id_str = str(cube_id)
    if cube_id_str in cube_rooms and str(target_uid) in cube_rooms[cube_id_str]:
        try:
            await cube_rooms[cube_id_str][str(target_uid)]["ws"].send_json({"type":"kicked","cube_name":cube_name})
            await cube_rooms[cube_id_str][str(target_uid)]["ws"].close(code=4003)
        except Exception:
            pass
    # Also notify via global WS (_globalWs) so world.html removes the cube even if not inside
    try:
        await _notify_user(target_uid, {"type": "cube_removed", "cube_id": cube_id, "cube_name": cube_name})
    except Exception:
        pass
    return {"ok": True}

@app.post("/cubes/{cube_id}/visit")
async def mark_cube_visit(cube_id: int, user=Depends(get_current_user)):
    """Отметить, что человек сейчас в кубе.

    Раньше посещение записывалось только при открытии переписки внутри куба,
    поэтому «участников» в аналитике не было вовсе, даже когда люди сидели
    в ленте куба.
    """
    try:
        name = db.get_display_name(user["id"])
        db.record_cube_visit(int(cube_id), int(user["id"]), name)
    except Exception:
        return {"ok": False}
    return {"ok": True}


@app.get("/cubes/{cube_id}/analytics")
async def cube_analytics(cube_id: int, user=Depends(get_current_user)):
    """Настоящие числа для раздела «Аналитика куба».

    Участники, посты, сообщения, активность по дням за неделю и самые
    деятельные люди — всё из базы, без выдуманных значений.
    """
    _нужен_платный(user, "аналитика", "Аналитика куба")
    # Тариф — это ещё не право смотреть чужой куб. Раньше проверялся только
    # он, и любой подписчик читал по номеру участников и активность чужого
    # закрытого куба.
    if not db.можно_в_куб(cube_id, user["id"]):
        raise HTTPException(403, "Это не твой куб")
    data = db.cube_analytics(cube_id, int(user["id"]))
    # сколько человек в кубе прямо сейчас — из живых подключений
    online = 0
    try:
        online = len(cube_rooms.get(str(cube_id), {}) or {})
    except Exception:
        online = 0
    # «сейчас в кубе»: живые подключения или те, кто отмечался за последние
    # пять минут — человек может сидеть в ленте куба и не держать переписку.
    data["online_now"] = max(online, int(data.pop("active_5m", 0) or 0))
    return data


@app.get("/cubes/{cube_id}/online")
async def get_cube_online_members(cube_id: int, user=Depends(get_current_user)):
    """Return cube members for kick search: live WS + historical visitors, minus banned."""
    seen = {}
    # Banned users for this cube — exclude from results
    banned = db.get_cube_banned_ids(cube_id)
    owner_uid = int(user["id"])
    # Список тех, кто бывал в кубе, задуман для хозяина — а проверки на это
    # не было: его отдавали по номеру любого куба.
    if not db.можно_в_куб(cube_id, owner_uid):
        raise HTTPException(403, "Это не твой куб")
    # 1. Live WebSocket connections
    room = cube_rooms.get(str(cube_id), {})
    for uid_str, info in room.items():
        try:
            uid = int(uid_str)
            if uid in banned or uid == owner_uid: continue
            u = db.get_user_by_id(uid)
            if u:
                seen[uid] = {"id": u["id"], "display_name": u["display_name"] or info.get("display_name") or "User",
                             "avatar_url": u.get("avatar_url"), "is_online": True}
        except Exception:
            continue
    # 2. Persistent visitors (cube_visitors, backfilled from messages on startup)
    try:
        for v in db.get_cube_visitors(cube_id, limit=100):
            uid = v["id"]
            if uid in banned or uid == owner_uid: continue
            if uid not in seen:
                seen[uid] = {"id": uid, "display_name": v["display_name"] or "User",
                             "avatar_url": v.get("avatar_url"), "is_online": False}
    except Exception:
        pass
    return list(seen.values())

@app.get("/me/cube-memberships")
async def get_cube_memberships(user=Depends(get_current_user)):
    """Return cubes the user joined via key — used to restore world after logout/login."""
    return db.get_user_joined_cubes(int(user["id"]))

@app.post("/cubes/join")
async def join_cube_by_key(body: JoinCubeRequest, request: Request):
    """Resolve a cube invite key — returns cube info if valid. Records membership if authenticated."""
    import hashlib
    key = body.cube_key.strip().upper()
    cube = db.get_cube_by_key(key)
    if not cube:
        raise HTTPException(status_code=404, detail="Ключ не найден или куб истёк")

    # Get IP hash and device_id for cross-account ban check
    # Было: первая запись X-Forwarded-For, то есть то, что прислал сам
    # посетитель. Забаненному достаточно было дописать себе любой адрес —
    # и бан по адресу переставал существовать. Берём адрес, которому
    # можно верить.
    client_ip = _откуда(request)
    ip_hash = db.hash_ip(client_ip, 16) or None
    device_id = request.headers.get("X-Device-Id", "")[:64] or None

    # Check if this IP or device is banned from this cube (cross-account ban)
    if db.is_device_banned_from_cube(cube["id"], ip_hash=ip_hash, device_id=device_id):
        raise HTTPException(status_code=403, detail="Ключ недействителен для вашего устройства")

    # Record membership in cube_visitors immediately (so it survives logout/login)
    try:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            payload = jwt.decode(auth_header[7:], SECRET_KEY, algorithms=[JWT_ALG])
            user_id = int(payload["sub"])
            # Also check user-level ban
            if db.is_user_banned_from_cube(cube["id"], user_id):
                raise HTTPException(status_code=403, detail="Ключ недействителен для вашего устройства")
            display_name = db.get_display_name(user_id) or "User"
            db.record_cube_visit(cube["id"], user_id, display_name)
    except HTTPException:
        raise
    except Exception:
        pass
    return {
        "id":         cube["id"],
        "name":       cube["name"],
        "icon":       cube["icon"],
        "color":      cube["color"],
        "type":       cube["type"],
        "life_left":  cube["life_left_seconds"],
        "cube_key":   cube["cube_key"],
        "ok": True
    }

@app.get("/cubes/{cube_id}/key")
async def get_cube_key(cube_id: int, user=Depends(get_current_user)):
    """Owner-only: retrieve the cube's invite key."""
    key = db.get_cube_key(cube_id, user["id"])
    if key is None:
        raise HTTPException(status_code=403, detail="Только создатель может видеть ключ")
    return {"cube_key": key, "ok": True}

@app.get("/cubes/{cube_id}/messages")
async def get_messages(cube_id: int, limit: int = 50, user=Depends(get_current_user)):
    """Переписка куба. Раньше этот адрес не спрашивал ни токена, ни права
    войти: по одному номеру кто угодно из интернета читал переписку
    закрытого куба, а номера лежали в открытом списке. Теперь — только
    хозяину и тем, кто вошёл по ключу."""
    if not db.можно_в_куб(cube_id, user["id"]):
        raise HTTPException(403, "В этот куб нужен ключ")
    return db.get_messages(cube_id, min(limit, 100))

@app.post("/messages/{msg_id}/react")
async def react_to_message(msg_id: int, body: ReactRequest, user=Depends(get_current_user)):
    _лимит(user, "react")
    emoji = body.emoji[:8]
    display_name = db.get_display_name(user["id"])
    result = db.toggle_reaction(msg_id, user["id"], display_name, emoji)
    return {**result, "message_id": msg_id, "ok": True}

class EditDmRequest(BaseModel):
    content: str = ""
    # v=610 · Подпись под фотографией, роликом или файлом. Пусто не то же
    # самое, что «не прислали»: пустой строкой подпись снимают.
    caption: str | None = None


@app.delete("/dm/conversation/{peer_id}")
async def clear_dm_conversation(peer_id: int, both: int = 0, user=Depends(get_current_user)):
    """Очистить переписку: both=1 — у обоих, иначе только у себя."""
    return db.clear_dm_conversation(user["id"], peer_id, bool(both))


@app.put("/dm/message/{msg_id}")
async def edit_dm_message(msg_id: int, body: EditDmRequest, user=Depends(get_current_user)):
    """Правка своего сообщения в переписке. Чужое править нельзя."""
    подпись = None if body.caption is None else body.caption[:2000]
    r = db.edit_dm_message(msg_id, user["id"], (body.content or "")[:4000], подпись)
    if isinstance(r, dict) and r.get("error") == "forbidden":
        raise HTTPException(403, "Not your message")
    if isinstance(r, dict) and r.get("error") == "no_caption":
        raise HTTPException(409, "Нужен перезапуск сервера: столбца подписи ещё нет")
    if isinstance(r, dict) and r.get("error") == "not_found":
        raise HTTPException(404, "Message not found")
    return r


@app.delete("/dm/message/{msg_id}")
async def delete_dm_message(msg_id: int, both: int = 0, user=Depends(get_current_user)):
    """Убрать сообщение: both=1 — у обоих (только своё), иначе только у себя."""
    r = db.delete_dm_message(msg_id, user["id"], bool(both))
    if isinstance(r, dict) and r.get("error") == "forbidden":
        raise HTTPException(403, "Not your conversation")
    return r


@app.get("/dm/inbox")
async def get_dm_inbox(user=Depends(get_current_user)):
    """Return all DM conversations for the current user (inbox)."""
    return db.get_dm_inbox(user["id"])

def _expiry_at(expires_secs):
    """Когда сообщение должно исчезнуть. Пусто — значит навсегда."""
    if not expires_secs:
        return None
    try:
        secs = max(1, min(int(expires_secs), 60 * 60 * 24 * 30))
    except Exception:
        return None
    return (datetime.utcnow() + timedelta(seconds=secs)).strftime("%Y-%m-%d %H:%M:%S")


@app.post("/dm/{other_user_id}")
async def send_dm_http(other_user_id: int, body: SendDmRequest, user=Depends(get_current_user)):
    """HTTP fallback for sending DMs (WS is preferred, this ensures delivery even if WS fails)."""
    content = (body.content or "").strip()[:4000]
    if not content:
        raise HTTPException(400, "content required")
    # Первое сообщение незнакомому человеку — это новая переписка, и их
    # в сутки ограниченное число. Знакомым пишем сколько угодно.
    try:
        if db.dm_is_new_peer(user["id"], other_user_id):
            _лимит(user, "dm_new")
    except HTTPException:
        raise
    except Exception:
        pass
    display_name = db.get_display_name(user["id"])
    expires_at = _expiry_at(body.expires_secs)
    dm_id = db.save_dm(user["id"], other_user_id, content, msg_type=body.msg_type,
                        file_name=body.file_name, file_size=body.file_size,
                        duration=body.duration, expires_at=expires_at)
    dm_out = {
        "type": "dm", "id": dm_id,
        "from_user_id": user["id"], "to_user_id": other_user_id,
        "display_name": display_name, "content": content,
        "msg_type": body.msg_type, "file_name": body.file_name, "file_size": body.file_size,
        "file_url": body.file_url or (content if body.msg_type in ("image","video","file") else None),
        "duration": body.duration,
        "expire_at": expires_at,
        "created_at": datetime.utcnow().isoformat(), "ok": True
    }
    # Real-time delivery to recipient via WS if connected
    await _notify_user(other_user_id, dm_out)
    await _ref_touch(user["id"])
    return dm_out

@app.get("/dm/{other_user_id}")
async def get_dm_history(other_user_id: int, user=Depends(get_current_user)):
    history = db.get_dm_history(user["id"], other_user_id)
    return history

# ── Global Video Feed ────────────────────────────────────────────────────────

@app.get("/users/{uid}")
async def get_user_profile_ep(uid: str):
    p = db.get_user_profile(uid)
    if not p: return {}
    return p


_PIXEL = base64.b64decode("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7")


@app.get("/users/{uid}/avatar")
async def get_user_avatar(uid: str):
    """Serve an avatar as a real image the browser can cache.

    Avatars are stored as data: URLs. Inlining one in every feed post and
    every comment made the payload ~94% base64 and repeated the same photo
    dozens of times per response. Lists now carry a short avatar_ver and
    point here, so each photo travels once and is cached for a day.
    """
    p = db.get_user_profile(uid) or {}
    raw = p.get("avatar_url") or ""
    headers = {"Cache-Control": "public, max-age=86400", "Access-Control-Allow-Origin": "*"}
    if raw.startswith("data:"):
        try:
            head, b64 = raw.split(",", 1)
            mime = head[5:].split(";")[0] or "image/jpeg"
            return Response(content=base64.b64decode(b64), media_type=mime, headers=headers)
        except Exception:
            pass
    return Response(content=_PIXEL, media_type="image/gif", headers=headers)

@app.get("/feed/user/{uid}")
async def get_user_feed_ep(uid: str):
    return db.get_user_feed(uid)


@app.delete("/feed/{post_id}")
async def delete_feed_post(post_id: int, user=Depends(get_current_user)):
    deleted = db.delete_feed_post(post_id, user["id"])
    if not deleted:
        raise HTTPException(status_code=404, detail="Post not found or not yours")
    return {"ok": True, "deleted_id": post_id}

@app.get("/admin/feed/videos/purge")
async def admin_delete_video_posts(request: Request):
    _check_admin(request.headers.get("X-Admin-Secret", ""))
    deleted = db.admin_delete_video_posts()
    return {"ok": True, "deleted": deleted}

def _viewer_id(request: Request):
    """Кто смотрит, если представился. Лента открыта и без входа."""
    auth = request.headers.get("Authorization", "")
    if auth.startswith("Bearer "):
        try:
            payload = jwt.decode(auth[7:], SECRET_KEY, algorithms=[JWT_ALG])
            return int(payload.get("sub"))
        except Exception:
            return None
    return None


@app.get("/feed")
async def get_global_feed(request: Request, limit: int = 30, offset: int = 0):
    # min() alone left the lower bound open: ?limit=-5 reached PostgreSQL as a
    # negative LIMIT and returned 500.
    # Зрителя узнаём по токену, если он есть: иначе собственные лайки,
    # оценки и сохранённое после перезагрузки терялись.
    return db.get_global_feed(limit=max(1, min(limit, 100)), offset=max(0, offset),
                              viewer_id=_viewer_id(request))

@app.get("/feed/following")
async def get_following_feed(user=Depends(get_current_user)):
    return db.get_following_feed(user["id"])

@app.get("/feed/saved")
async def get_saved_feed(user=Depends(get_current_user)):
    return db.get_saved_posts(user["id"])

@app.put("/feed/{post_id}")
async def edit_feed_post(post_id: int, body: EditPostRequest, user=Depends(get_current_user)):
    r = db.update_feed_post(post_id, user["id"], body.dict(exclude_unset=True))
    if r is None:
        raise HTTPException(400, "Nothing to change")
    if isinstance(r, dict) and r.get("error") == "not_found":
        raise HTTPException(404, "Post not found")
    if isinstance(r, dict) and r.get("error") == "forbidden":
        raise HTTPException(403, "Not your post")
    return r

@app.post("/feed/{post_id}/save")
async def save_feed_post(post_id: int, user=Depends(get_current_user)):
    if not db.feed_post_exists(post_id):
        raise HTTPException(404, "Post not found")
    return db.toggle_post_save(post_id, user["id"])

@app.post("/feed/{post_id}/report")
async def report_feed_post(post_id: int, body: ReportPostRequest = None,
                           user=Depends(get_current_user)):
    _лимит(user, "report")
    if not db.feed_post_exists(post_id):
        raise HTTPException(404, "Post not found")
    return db.report_post(post_id, user["id"], (body.reason if body else "") or "")

@app.post("/feed/post")
async def create_feed_post(body: CreateVideoPostRequest, user=Depends(get_current_user)):
    _лимит(user, "post")
    import json as _json
    desc = (body.description or '').strip()[:2000]
    video_url = (body.video_url or '').strip()[:500]
    music = (body.music or '').strip()[:200]
    title = (body.title or '').strip()[:300]
    image_url = (body.image_url or body.file_url or '').strip()[:500]
    post_type = (body.post_type or 'short').lower()
    display_name = db.get_display_name(user["id"])
    # Normalize tags to JSON string
    raw_tags = body.tags
    if isinstance(raw_tags, list):
        tags_str = _json.dumps(raw_tags, ensure_ascii=False)
    elif isinstance(raw_tags, str) and raw_tags.strip():
        tags_str = _json.dumps([t.strip() for t in raw_tags.split(',') if t.strip()], ensure_ascii=False)
    else:
        tags_str = '[]'
    # Require at least something
    if not desc and not title and not video_url and not image_url:
        raise HTTPException(400, "Add title, description, or media")
    # Проверка перед публикацией: заголовок и описание вместе, одним куском.
    _модерация(user, (title + "\n" + desc).strip(), "пост")
    # Ролик из Stream: плейлист и заставку собираем из номера записи, чтобы
    # браузер не мог подсунуть чужие адреса.
    stream_id = (body.stream_id or "").strip()[:64]
    hls_url = st.stream_hls(stream_id) or "" if stream_id else ""
    poster_url = st.stream_poster(stream_id) or "" if stream_id else ""

    pid = db.create_video_post(body.cube_id or 1, user["id"], display_name, video_url, desc, music, title, tags_str)
    _act(user["id"], "post")
    await _ref_touch(user["id"])
    # Store extra fields if columns exist
    try:
        import database as _db2
        conn = _db2.get_db(); cc = conn.cursor()
        # Add missing columns gracefully
        for col_sql in [
            "ALTER TABLE posts ADD COLUMN post_type TEXT DEFAULT 'short'",
            "ALTER TABLE posts ADD COLUMN image_url TEXT DEFAULT ''",
            "ALTER TABLE posts ADD COLUMN title TEXT DEFAULT ''",
            "ALTER TABLE posts ADD COLUMN tags TEXT DEFAULT '[]'",
        ]:
            try: cc.execute(col_sql)
            except Exception: pass
        # Знаки вопроса понимает только SQLite. На PostgreSQL этот запрос
        # падал, ошибку глотал except ниже — и у всех публикаций, созданных
        # на сервере, тип, обложка, заголовок и теги оставались пустыми.
        cc.execute(_db2._q("UPDATE posts SET post_type=?,image_url=?,title=?,tags=?,"
                           "stream_id=?,hls_url=?,poster_url=? WHERE id=?"),
                   (post_type, image_url, title, tags_str,
                    stream_id, hls_url, poster_url, pid))
        conn.commit(); conn.close()
    except Exception:
        pass
    tags_out = []
    try: tags_out = _json.loads(tags_str)
    except Exception: pass
    return {"id": pid, "user_id": user["id"], "display_name": display_name,
            "stream_id": stream_id, "hls_url": hls_url, "poster_url": poster_url,
            "video_url": video_url, "image_url": image_url, "title": title,
            "description": desc, "music": music, "post_type": post_type,
            "tags": tags_out, "likes": 0, "comment_count": 0, "view_count": 0,
            "created_at": datetime.utcnow().isoformat(), "ok": True}

@app.post("/feed/{post_id}/repost")
async def repost_feed_post_ep(post_id: int, user=Depends(get_current_user)):
    _лимит(user, "repost")
    if not db.feed_post_exists(post_id):
        raise HTTPException(404, "Post not found")
    display_name = db.get_display_name(user["id"])
    pid = db.repost_feed_post(post_id, user["id"], display_name)
    if not pid:
        raise HTTPException(400, "Repost failed")
    return {"ok": True, "id": pid, "repost_of": post_id}


@app.post("/feed/{post_id}/like")
async def like_feed_post(post_id: int, user=Depends(get_current_user)):
    _лимит(user, "like")
    if not db.feed_post_exists(post_id):
        raise HTTPException(404, "Post not found")
    likes, liked = db.like_post(post_id, user["id"])
    if liked:
        _act_other(db.feed_post_author(post_id), user["id"], "reaction_received")
    return {"likes": likes, "liked": liked, "ok": True}

@app.post("/feed/{post_id}/dislike")
async def dislike_feed_post(post_id: int, user=Depends(get_current_user)):
    _лимит(user, "like")
    if not db.feed_post_exists(post_id):
        raise HTTPException(404, "Post not found")
    return db.toggle_post_reaction(post_id, user["id"], "dislike")

@app.post("/feed/{post_id}/fire")
async def fire_feed_post(post_id: int, user=Depends(get_current_user)):
    _лимит(user, "like")
    if not db.feed_post_exists(post_id):
        raise HTTPException(404, "Post not found")
    return db.toggle_post_reaction(post_id, user["id"], "fire")

@app.get("/feed/{post_id}/comments")
async def get_feed_comments(post_id: int, request: Request):
    # Optional auth: anonymous readers get counts, logged-in readers also get
    # their own like state. Used to `import jose.jwt`, but python-jose is not
    # in requirements.txt, so this always raised ImportError and every request
    # was treated as anonymous — user_like came back null even when signed in.
    user_id = None
    auth = request.headers.get("Authorization", "")
    if auth.startswith("Bearer "):
        try:
            payload = jwt.decode(auth[7:], SECRET_KEY, algorithms=[JWT_ALG])
            user_id = payload.get("sub")
        except Exception:
            pass
    return db.get_post_comments(post_id, user_id=user_id)

@app.post("/feed/{post_id}/comment")
async def add_feed_comment(post_id: int, body: AddCommentRequest, user=Depends(get_current_user)):
    _лимит(user, "comment")
    content = (body.content or '').strip()[:500]
    if not content:
        raise HTTPException(400, "Content required")
    if not db.feed_post_exists(post_id):
        raise HTTPException(404, "Post not found")
    _модерация(user, content, "комментарий", ref="post:%s" % post_id)
    display_name = db.get_display_name(user["id"])
    expire_seconds = body.expire_seconds if body.expire_seconds else None
    cid = db.add_post_comment(post_id, user["id"], display_name, content, expire_seconds)
    # Засчитываем АВТОРУ ПОСТА, и только если это не он сам: иначе человек
    # нафармил бы себе комментариями под своим же постом.
    _act_other(db.feed_post_author(post_id), user["id"], "comment_received")
    return {"id": cid, "display_name": display_name, "content": content,
            "created_at": datetime.utcnow().isoformat(), "ok": True}

class CommentLikeRequest(BaseModel):
    type: str = "like"

@app.post("/feed/{post_id}/comment/{cid}/like")
async def like_comment(post_id: int, cid: int, body: CommentLikeRequest, user=Depends(get_current_user)):
    _лимит(user, "like")
    if body.type not in ("like", "dislike"):
        raise HTTPException(400, "Invalid type")
    if not db.feed_comment_exists(cid):
        raise HTTPException(404, "Комментарий не найден")
    return db.toggle_comment_like(cid, user["id"], body.type)

@app.post("/feed/{post_id}/comment/{cid}/reply")
async def reply_to_comment(post_id: int, cid: int, body: AddCommentRequest, user=Depends(get_current_user)):
    _лимит(user, "comment")
    content = (body.content or "").strip()[:500]
    if not content:
        raise HTTPException(400, "Content required")
    if not db.feed_comment_exists(cid):
        raise HTTPException(404, "Комментарий не найден")
    _модерация(user, content, "комментарий", ref="comment:%s" % cid)
    display_name = db.get_display_name(user["id"])
    expire_seconds = body.expire_seconds if body.expire_seconds else None
    return db.add_comment_reply(cid, user["id"], display_name, content, expire_seconds)


@app.post("/feed/comment/{cid}/reply")
async def add_comment_reply_ep(cid: int, body: AddReplyRequest, user=Depends(get_current_user)):
    _лимит(user, "comment")
    content = (body.content or '').strip()[:500]
    if not content:
        raise HTTPException(400, "Content required")
    if not db.feed_comment_exists(cid):
        raise HTTPException(404, "Комментарий не найден")
    _модерация(user, content, "комментарий", ref="comment:%s" % cid)
    display_name = db.get_display_name(user["id"])
    # add_comment_reply returns the whole row. This used to assign it to "id",
    # so the response was {"id": {"id": 2, ...}} and the client could not use
    # the reply id for anything afterwards.
    return db.add_comment_reply(cid, user["id"], display_name, content)


def _unwrap(result):
    """Turn a {'error': ...} result from the db layer into an HTTP error."""
    if isinstance(result, dict) and result.get("error"):
        err = result["error"]
        raise HTTPException(404 if err == "not found" else 403, err)
    return result


@app.post("/feed/comment/{cid}/like")
async def like_feed_comment_ep(cid: int, body: LikeCommentRequest, user=Depends(get_current_user)):
    _лимит(user, "like")
    if body.type not in ("like", "dislike"):
        raise HTTPException(400, "Invalid type")
    if not db.feed_comment_exists(cid):
        raise HTTPException(404, "Комментарий не найден")
    return db.like_comment(cid, user["id"], body.type)

@app.post("/feed/reply/{rid}/like")
async def like_feed_reply_ep(rid: int, body: LikeCommentRequest, user=Depends(get_current_user)):
    _лимит(user, "like")
    if body.type not in ("like", "dislike"):
        raise HTTPException(400, "Invalid type")
    return db.like_reply(rid, user["id"], body.type)

# The client calls these with the post id in the path (vfcpDelete / vfcpEdit in
# world.html), so both shapes are registered. Previously only the short form
# existed and every delete/edit of a comment from the UI returned 404.
@app.delete("/feed/comment/{cid}")
@app.delete("/feed/{post_id}/comment/{cid}")
async def delete_feed_comment_ep(cid: int, post_id: int = 0, user=Depends(get_current_user)):
    return _unwrap(db.delete_post_comment(cid, user["id"]))

@app.delete("/feed/reply/{rid}")
async def delete_feed_reply_ep(rid: int, user=Depends(get_current_user)):
    return _unwrap(db.delete_comment_reply(rid, user["id"]))

@app.put("/feed/comment/{cid}")
@app.put("/feed/{post_id}/comment/{cid}")
async def edit_feed_comment_ep(cid: int, body: EditContentRequest, post_id: int = 0,
                               user=Depends(get_current_user)):
    content = (body.content or '').strip()[:500]
    if not content:
        raise HTTPException(400, "Content required")
    return _unwrap(db.edit_post_comment(cid, user["id"], content))

@app.put("/feed/reply/{rid}")
async def edit_feed_reply_ep(rid: int, body: EditContentRequest, user=Depends(get_current_user)):
    content = (body.content or '').strip()[:500]
    if not content:
        raise HTTPException(400, "Content required")
    return _unwrap(db.edit_comment_reply(rid, user["id"], content))


@app.get("/follow/{target_id}/followers")
async def get_followers_ep(target_id: int, request: Request, limit: int = 200):
    """v=557 · Кто подписан на этого человека. Открыто для чтения, как и
    сам профиль: список видно и без ключа, но тогда без меток «я подписан»."""
    return db.get_follow_list(target_id, "followers",
                              viewer_id=_viewer_id(request),
                              limit=max(1, min(limit, 500)))


@app.get("/follow/{target_id}/following")
async def get_following_ep(target_id: int, request: Request, limit: int = 200):
    """На кого подписан этот человек."""
    return db.get_follow_list(target_id, "following",
                              viewer_id=_viewer_id(request),
                              limit=max(1, min(limit, 500)))


@app.get("/likes/{kind}/{ident}")
async def кто_лайкнул_ep(kind: str, ident: int, request: Request, limit: int = 200):
    """v=585 · Кто поставил лайк — человеку, публикации или истории.

    Список той же формы, что подписчики: браузер рисует его тем же окном.
    Открыт на чтение, как и сам профиль; метки «я подписан» появляются,
    только когда запрос пришёл с ключом.
    """
    # Имена кусков адреса держим латиницей: на кириллических именах
    # Starlette собирает правило, которое потом не срабатывает — адрес
    # есть в описании, а запрос получает 404. Значения остаются нашими.
    if kind not in ("человек", "пост", "история"):
        raise HTTPException(400, "Неизвестный вид")
    return db.кто_лайкнул(kind, ident,
                          viewer_id=_viewer_id(request),
                          limit=max(1, min(limit, 500)))


@app.delete("/follow/{follower_id}/remove")
async def remove_follower_ep(follower_id: int, user=Depends(get_current_user)):
    """Убрать своего подписчика — рвём связь «он → я». Своё и только своё:
    чужие подписки трогать нельзя, поэтому хозяин берётся из ключа."""
    db.remove_follower(user["id"], follower_id)
    counts = db.get_follow_counts(user["id"])
    return {"ok": True, **counts}


@app.get("/follow/{target_id}")
async def get_follow_status(target_id: int, user=Depends(get_current_user)):
    following = db.is_following(user["id"], target_id)
    counts = db.get_follow_counts(target_id)
    return {"following": following, **counts}

@app.post("/follow/{target_id}")
async def follow(target_id: int, user=Depends(get_current_user)):
    _лимит(user, "follow")
    ok = db.follow_user(user["id"], target_id)
    counts = db.get_follow_counts(target_id)
    return {"ok": ok, "following": True, **counts}

@app.delete("/follow/{target_id}")
async def unfollow(target_id: int, user=Depends(get_current_user)):
    _лимит(user, "follow")
    db.unfollow_user(user["id"], target_id)
    counts = db.get_follow_counts(target_id)
    return {"ok": True, "following": False, **counts}

class EditReplyRequest(BaseModel):
    content: str

@app.post("/feed/{post_id}/comment/{cid}/reply/{rid}/like")
async def like_reply(post_id: int, cid: int, rid: int, body: CommentLikeRequest, user=Depends(get_current_user)):
    _лимит(user, "like")
    if body.type not in ("like", "dislike"):
        raise HTTPException(400, "Invalid type")
    return db.toggle_reply_like(rid, user["id"], body.type)

@app.delete("/feed/{post_id}/comment/{cid}/reply/{rid}")
async def delete_reply(post_id: int, cid: int, rid: int, user=Depends(get_current_user)):
    result = db.delete_comment_reply(rid, user["id"])
    if isinstance(result, dict) and result.get("error") == "forbidden":
        raise HTTPException(403, "Not your reply")
    if isinstance(result, dict) and result.get("error") == "not found":
        raise HTTPException(404, "Reply not found")
    return result

@app.put("/feed/{post_id}/comment/{cid}/reply/{rid}")
async def edit_reply(post_id: int, cid: int, rid: int, body: EditReplyRequest, user=Depends(get_current_user)):
    content = (body.content or "").strip()[:500]
    if not content:
        raise HTTPException(400, "Content required")
    result = db.edit_comment_reply(rid, user["id"], content)
    if isinstance(result, dict) and result.get("error") == "forbidden":
        raise HTTPException(403, "Not your reply")
    if isinstance(result, dict) and result.get("error") == "not found":
        raise HTTPException(404, "Reply not found")
    return result

# ── Cube Posts (legacy) ───────────────────────────────────────────────────────

@app.get("/cubes/{cube_id}/posts")
async def get_posts(cube_id: int):
    return db.get_posts(cube_id)

@app.post("/cubes/{cube_id}/posts")
async def create_post(cube_id: int, body: CreatePostRequest, user=Depends(get_current_user)):
    _лимит(user, "post")
    content = body.content.strip()[:1000]
    if not content:
        raise HTTPException(400, "Content required")
    display_name = db.get_display_name(user["id"])
    post_id = db.create_post(cube_id, user["id"], display_name, content)
    _act(user["id"], "post")
    await _ref_touch(user["id"])
    return {"id": post_id, "display_name": display_name, "content": content,
            "likes": 0, "created_at": datetime.utcnow().isoformat(), "ok": True}

@app.post("/cubes/{cube_id}/posts/{post_id}/like")
async def like_post(cube_id: int, post_id: int, user=Depends(get_current_user)):
    _лимит(user, "like")
    likes, liked = db.like_post(post_id, user["id"])
    if liked:
        _act_other(db.feed_post_author(post_id), user["id"], "reaction_received")
    return {"likes": likes, "liked": liked, "ok": True}

# Сигналы: см. раздел «СИГНАЛЫ: КОТИРОВКИ И АВТОЗАКРЫТИЕ» в конце файла.

# ── Admin / Stats ─────────────────────────────────────────────────────────────

@app.post("/admin/reset")
async def admin_reset(request: Request):
    _check_admin(request.headers.get("X-Admin-Secret", ""))
    # Сводку отдаём наружу: видно, сколько таблиц вычищено и не осталось ли
    # чего-то, что не поддалось. Раньше ответ был один и тот же при любом
    # исходе, и «обнулил» означало только «вызвал».
    свод = db.reset_all_data()
    return {"ok": True, "message": "All data cleared. 8 default cubes seeded.",
            "сводка": свод}

@app.post("/admin/seed-cubes")
async def admin_seed_cubes(request: Request):
    _check_admin(request.headers.get("X-Admin-Secret", ""))
    db.seed_default_cubes()
    return {"ok": True, "message": "8 default cubes seeded."}

@app.post("/admin/upgrade")
async def admin_upgrade(request: Request):
    _check_admin(request.headers.get("X-Admin-Secret", ""))
    body = await request.json()
    user_id = body.get("user_id")
    to_type = body.get("to_type", "premium")
    if not user_id:
        raise HTTPException(400, "user_id required")
    db.upgrade_key(int(user_id), to_type, cube_spent=0.0)
    return {"ok": True, "user_id": user_id, "key_type": to_type}


# ── Prices proxy (server-side CoinGecko cache — prevents per-user rate limits) ─
_prices_cache: dict = {}
_prices_ts: float = 0.0
_PRICES_TTL = 30  # seconds
_CC_MAP = {"bitcoin":"bitcoin","ethereum":"ethereum","tether":"tether","binance-coin":"binancecoin","solana":"solana","xrp":"ripple","dogecoin":"dogecoin","cardano":"cardano","tron":"tron","avalanche":"avalanche-2","shiba-inu":"shiba-inu","polkadot":"polkadot","chainlink":"chainlink","toncoin":"toncoin","bitcoin-cash":"bitcoin-cash","litecoin":"litecoin","near-protocol":"near","uniswap":"uniswap","polygon":"matic-network","stellar":"stellar","arbitrum":"arbitrum","aptos":"aptos","sui":"sui","optimism":"optimism","cosmos":"cosmos","filecoin":"filecoin","vechain":"vechain"}
_CC_IDS = ",".join(_CC_MAP.keys())

# Лента курсов: как монета зовётся на экране, у CoinGecko и на Binance.
# Один список на всех — браузер больше никуда сам не ходит.
_МОНЕТЫ = [
    ("BTC", "bitcoin", "BTCUSDT"), ("ETH", "ethereum", "ETHUSDT"),
    ("USDT", "tether", ""), ("BNB", "binancecoin", "BNBUSDT"),
    ("SOL", "solana", "SOLUSDT"), ("XRP", "ripple", "XRPUSDT"),
    ("DOGE", "dogecoin", "DOGEUSDT"), ("ADA", "cardano", "ADAUSDT"),
    ("TRX", "tron", "TRXUSDT"), ("AVAX", "avalanche-2", "AVAXUSDT"),
    ("SHIB", "shiba-inu", "SHIBUSDT"), ("DOT", "polkadot", "DOTUSDT"),
    ("LINK", "chainlink", "LINKUSDT"), ("TON", "toncoin", "TONUSDT"),
    ("BCH", "bitcoin-cash", "BCHUSDT"), ("LTC", "litecoin", "LTCUSDT"),
    ("NEAR", "near", "NEARUSDT"), ("UNI", "uniswap", "UNIUSDT"),
    ("POL", "matic-network", "POLUSDT"), ("XLM", "stellar", "XLMUSDT"),
    ("PEPE", "pepe", "PEPEUSDT"), ("ARB", "arbitrum", "ARBUSDT"),
    ("APT", "aptos", "APTUSDT"), ("SUI", "sui", "SUIUSDT"),
    ("OP", "optimism", "OPUSDT"), ("INJ", "injective-protocol", "INJUSDT"),
    ("ATOM", "cosmos", "ATOMUSDT"), ("FIL", "filecoin", "FILUSDT"),
    ("VET", "vechain", "VETUSDT"), ("NOT", "notcoin", "NOTUSDT"),
]
_ЦЕНЫ_ИСТОЧНИК = ""          # кто ответил последним — видно в ответе


async def _цены_coingecko(client):
    ids = ",".join(м[1] for м in _МОНЕТЫ)
    r = await client.get("https://api.coingecko.com/api/v3/simple/price",
                         params={"ids": ids, "vs_currencies": "usd",
                                 "include_24hr_change": "true"})
    r.raise_for_status()
    д = r.json()
    итог = {}
    for _, cg, _b in _МОНЕТЫ:
        з = д.get(cg)
        if not з or з.get("usd") is None:
            continue
        итог[cg] = {"usd": float(з["usd"]),
                    "usd_24h_change": float(з.get("usd_24h_change") or 0)}
    return итог


async def _цены_binance(client):
    пары = [м[2] for м in _МОНЕТЫ if м[2]]
    r = await client.get("https://api.binance.com/api/v3/ticker/24hr",
                         params={"symbols": _json.dumps(пары, separators=(",", ":"))})
    r.raise_for_status()
    по_паре = {с.get("symbol"): с for с in (r.json() or [])}
    итог = {}
    for _, cg, пара in _МОНЕТЫ:
        с = по_паре.get(пара)
        if not с:
            continue
        try:
            итог[cg] = {"usd": float(с["lastPrice"]),
                        "usd_24h_change": float(с.get("priceChangePercent") or 0)}
        except Exception:
            pass
    if "tether" not in итог and итог:
        итог["tether"] = {"usd": 1.0, "usd_24h_change": 0.0}
    return итог


async def _цены_coincap(client):
    r = await client.get("https://api.coincap.io/v2/assets",
                         params={"ids": _CC_IDS, "limit": 50})
    r.raise_for_status()
    итог = {}
    for a in r.json().get("data", []):
        cg = _CC_MAP.get(a.get("id"))
        if not cg:
            continue
        try:
            итог[cg] = {"usd": float(a["priceUsd"]),
                        "usd_24h_change": float(a.get("changePercent24Hr") or 0)}
        except Exception:
            pass
    return итог


@app.get("/prices")
async def get_prices():
    """Курсы для ленты. Браузер спрашивает только нас: прямой запрос к бирже
    из каждой вкладки упирался в ограничение частоты, и половина значений
    приходила пустой. Источников три — берём первый, который ответил; если
    молчат все, отдаём последние удачные цены и помечаем их несвежими."""
    global _prices_cache, _prices_ts, _ЦЕНЫ_ИСТОЧНИК
    now = datetime.utcnow().timestamp()
    if _prices_cache and (now - _prices_ts) < _PRICES_TTL:
        ответ = dict(_prices_cache)
        ответ["_meta"] = {"source": _ЦЕНЫ_ИСТОЧНИК, "age": int(now - _prices_ts),
                          "stale": False}
        return ответ

    источники = (("coingecko", _цены_coingecko), ("binance", _цены_binance),
                 ("coincap", _цены_coincap))
    свежие, кто = None, ""
    async with httpx.AsyncClient(timeout=9,
                                 headers={"accept": "application/json",
                                          "user-agent": "CubeWorld/1.0"}) as client:
        for имя, добыть in источники:
            try:
                д = await добыть(client)
            except Exception:
                continue
            if д and len(д) > 5:
                свежие, кто = д, имя
                break

    if свежие:
        _prices_cache = свежие
        _prices_ts = now
        _ЦЕНЫ_ИСТОЧНИК = кто
        ответ = dict(свежие)
        ответ["_meta"] = {"source": кто, "age": 0, "stale": False}
        return ответ

    if _prices_cache:
        ответ = dict(_prices_cache)
        ответ["_meta"] = {"source": _ЦЕНЫ_ИСТОЧНИК or "кэш",
                          "age": int(now - _prices_ts), "stale": True}
        return ответ
    raise HTTPException(503, "Курсы недоступны")

# ─────────────────────────────────────────────────────────────────────────
# ЛЕНТА КУРСА · ВТОРОЙ ВИД: АКЦИИ, ЗОЛОТО, НЕФТЬ, ДОЛЛАР
#
# Крипта идёт выше, через /prices. Здесь всё остальное: металлы, нефть,
# газ, доллар, индексы и крупные компании. Браузер и сюда ходит только к
# нам — ключей у бесплатных источников нет, зато есть ограничение частоты,
# и спрашивать с каждой вкладки нельзя.
#
# Честно про задержку. Бесплатные источники биржевых цен отдают их с
# опозданием — обычно 15–20 минут, у разных бумаг по-разному. Это не наша
# задержка и убрать её нельзя: живые котировки стоят денег и требуют
# договора с биржей. Поэтому в ответе всегда едет "delayed": true, а лента
# это подписывает. Выдумывать цифры ради красоты мы не будем.
#
# Ночью и в выходные биржа закрыта — тогда это цена последнего закрытия.
# ─────────────────────────────────────────────────────────────────────────

# Что показываем: ключ · имя на экране · символ у Yahoo · символ у Stooq.
# Пустой символ значит «у этого источника такого нет» — он пропускается.
# Имена на экране — короткие и английские, как у крипты рядом: BTC, ETH.
# По-русски они выходили втрое длиннее («Microsoft» против «Майкрософт» ещё
# ладно, а «Золото» против GOLD уже теснило соседей), лента распухала и
# налезала на кнопки в той же полосе.
_РЫНКИ = [
    ("GOLD",   "GOLD",      "GC=F",      "gc.f"),
    ("SILVER", "SILVER",    "SI=F",      "si.f"),
    ("OIL",    "BRENT",     "BZ=F",      "cb.f"),
    ("GAS",    "GAS",       "NG=F",      "ng.f"),
    ("DXY",    "DXY",       "DX-Y.NYB",  ""),
    ("EURUSD", "EUR",       "EURUSD=X",  "eurusd"),
    ("SP500",  "S&P 500",   "^GSPC",     "^spx"),
    ("NDX",    "NASDAQ",    "^IXIC",     "^ndq"),
    ("AAPL",   "AAPL",      "AAPL",      "aapl.us"),
    ("MSFT",   "MSFT",      "MSFT",      "msft.us"),
    ("NVDA",   "NVDA",      "NVDA",      "nvda.us"),
    ("TSLA",   "TSLA",      "TSLA",      "tsla.us"),
    ("AMZN",   "AMZN",      "AMZN",      "amzn.us"),
    ("GOOGL",  "GOOGL",     "GOOGL",     "googl.us"),
    ("META",   "META",      "META",      "meta.us"),
    ("COIN",   "COIN",      "COIN",      "coin.us"),
]

_markets_cache: dict = {}
_markets_ts: float = 0.0
_РЫНКИ_ИСТОЧНИК = ""
# Десять минут. Цены и так с опозданием, чаще спрашивать нечего, а
# бесплатные источники за частоту банят.
_MARKETS_TTL = 600


def _рынки_процент(цена, прежняя):
    """Процент за день. Нет прежней цены — честный ноль, а не выдумка."""
    try:
        цена = float(цена)
        прежняя = float(прежняя)
        if прежняя > 0:
            return round((цена - прежняя) / прежняя * 100, 2)
    except Exception:
        pass
    return 0.0


async def _рынки_yahoo(client):
    """Основной источник. По запросу на бумагу, зато есть ряд дневных
    закрытий, и процент можно посчитать за день, а не за неделю.

    Почему не meta.chartPreviousClose, как было сначала: это закрытие перед
    ПЕРВОЙ свечой запрошенного отрезка. При range=5d оно оказывалось
    недельной давности, и нефть показывала −19% за «день». Берём два
    последних дневных закрытия из самого ряда — это и есть «вчера»."""
    import asyncio

    async def одну(ключ, имя, символ):
        if not символ:
            return None
        r = await client.get(
            "https://query1.finance.yahoo.com/v8/finance/chart/" + символ,
            params={"interval": "1d", "range": "5d"})
        r.raise_for_status()
        м = (((r.json() or {}).get("chart") or {}).get("result") or [{}])[0]
        meta = м.get("meta") or {}
        котировки = ((м.get("indicators") or {}).get("quote") or [{}])[0]
        закрытия = [з for з in (котировки.get("close") or []) if з is not None]

        цена = meta.get("regularMarketPrice")
        if цена is None:
            цена = закрытия[-1] if закрытия else None
        if цена is None:
            return None

        # Последняя свеча — сегодняшняя (биржа открыта) или вчерашняя
        # (закрыта). В обоих случаях «вчера» это предпоследнее закрытие.
        # Если ряда нет — берём настоящее «закрытие вчера» из meta.
        # chartPreviousClose не берём никогда: он привязан к началу
        # запрошенного отрезка, а не ко вчерашнему дню, и именно он давал
        # нефти −19% за «день». Не нашли ничего — честный ноль.
        if len(закрытия) >= 2:
            прежняя = закрытия[-2]
        else:
            прежняя = (meta.get("regularMarketPreviousClose")
                       or meta.get("previousClose"))

        return ключ, {"usd": float(цена),
                      "usd_24h_change": _рынки_процент(цена, прежняя),
                      "name": имя}

    задачи = [одну(к, и, с) for к, и, с, _ in _РЫНКИ]
    итог = {}
    for о in await asyncio.gather(*задачи, return_exceptions=True):
        if isinstance(о, tuple):
            итог[о[0]] = о[1]
    return итог


def _разобрать_stooq(текст):
    """CSV Stooq: шапка, затем по строке на бумагу.
    Symbol,Date,Time,Open,High,Low,Close,Volume
    Процент считаем от открытия: своего «вчера» этот ответ не даёт."""
    строки = [с for с in (текст or "").replace("\r", "").split("\n") if с.strip()]
    if len(строки) < 2:
        return {}
    шапка = [к.strip().lower() for к in строки[0].split(",")]
    try:
        и_сим = шапка.index("symbol")
        и_отк = шапка.index("open")
        и_закр = шапка.index("close")
    except ValueError:
        return {}
    по_символу = {}
    for с in строки[1:]:
        к = с.split(",")
        if len(к) <= max(и_сим, и_отк, и_закр):
            continue
        сим = к[и_сим].strip().lower()
        try:
            закр = float(к[и_закр])
        except Exception:
            continue
        try:
            откр = float(к[и_отк])
        except Exception:
            откр = 0.0
        по_символу[сим] = (закр, откр)
    итог = {}
    for ключ, имя, _, st in _РЫНКИ:
        if not st:
            continue
        пара = по_символу.get(st.lower())
        if not пара:
            continue
        закр, откр = пара
        итог[ключ] = {"usd": закр,
                      "usd_24h_change": _рынки_процент(закр, откр),
                      "name": имя}
    return итог


async def _рынки_stooq(client):
    """Запасной источник. Один запрос на всё, без ключа."""
    символы = ",".join(st for _, _, _, st in _РЫНКИ if st)
    r = await client.get("https://stooq.com/q/l/",
                         params={"s": символы, "f": "sd2t2ohlcv",
                                 "h": "", "e": "csv"})
    r.raise_for_status()
    return _разобрать_stooq(r.text)


@app.get("/markets")
async def get_markets():
    """Второй вид ленты: акции, золото, нефть, доллар.

    Устроено как /prices: источники по очереди, первый ответивший —
    в дело; молчат все — отдаём последнее удачное и помечаем несвежим.
    Отличие одно: цены здесь всегда с опозданием, и мы об этом говорим
    прямо, полем delayed."""
    global _markets_cache, _markets_ts, _РЫНКИ_ИСТОЧНИК
    now = datetime.utcnow().timestamp()
    if _markets_cache and (now - _markets_ts) < _MARKETS_TTL:
        ответ = dict(_markets_cache)
        ответ["_meta"] = {"source": _РЫНКИ_ИСТОЧНИК, "age": int(now - _markets_ts),
                          "stale": False, "delayed": True}
        return ответ

    источники = (("yahoo", _рынки_yahoo), ("stooq", _рынки_stooq))
    свежие, кто = None, ""
    async with httpx.AsyncClient(timeout=12,
                                 headers={"accept": "*/*",
                                          "user-agent": "CubeWorld/1.0"}) as client:
        for имя, добыть in источники:
            try:
                д = await добыть(client)
            except Exception:
                continue
            if д and len(д) >= 4:
                свежие, кто = д, имя
                break

    if свежие:
        _markets_cache = свежие
        _markets_ts = now
        _РЫНКИ_ИСТОЧНИК = кто
        ответ = dict(свежие)
        ответ["_meta"] = {"source": кто, "age": 0, "stale": False, "delayed": True}
        return ответ

    if _markets_cache:
        ответ = dict(_markets_cache)
        ответ["_meta"] = {"source": _РЫНКИ_ИСТОЧНИК or "кэш",
                          "age": int(now - _markets_ts), "stale": True,
                          "delayed": True}
        return ответ
    raise HTTPException(503, "Биржевые курсы недоступны")


# ─────────────────────────────────────────────────────────────────────────
#  ТАРИФЫ: БЕСПЛАТНЫЙ · СИЛВЕР · ГОЛД
#
#  Разбивка «мягко»: площадка бесплатна, платное — заработок. Кубы, игры,
#  карта, забег, лента, чаты, группы, истории, маркетплейс, кошелёк,
#  чаевые и подарки работают на бесплатном. Деньги берём за то, что
#  приносит деньги: эфиры, сигналы, аналитика, доля в фонде наград.
#
#  Пределы и цены лежат в одном месте — database.ТАРИФЫ. Здесь только
#  узлы и проверки, чтобы цифры не разошлись по файлу.
# ─────────────────────────────────────────────────────────────────────────

class PlanActivateRequest(BaseModel):
    plan: str
    period: str = "month"


def _тариф(user):
    return db.get_plan(user["id"])


# ── Выключатель тарифов ──────────────────────────────────────────────────
#
# Пока площадка в проверке, запреты по тарифу мешают: свои же страницы не
# открыть, эфир не запустить, аналитику не посмотреть. Поэтому по умолчанию
# пределы выключены — работает всё и у всех.
#
# На запуске включается одной строкой в окружении: PLAN_ENFORCE=on.
# Строка в коде нарочно одна: убирать и возвращать проверки руками — это
# каждый раз шанс забыть одну из них.
#
# Что выключатель НЕ трогает: платный тариф себе всё равно не включить без
# ADMIN_SECRET. Это не предел возможностей, а замок от чужих рук, и держать
# его открытым «пока тестируем» незачем.
def _тарифы_строго() -> bool:
    return str(os.getenv("PLAN_ENFORCE", "off")).strip().lower() in (
        "1", "on", "true", "yes", "да")


def _нужен_платный(user, что: str, имя: str):
    """Закрыто на бесплатном — говорим чем именно и что с этим делать.
    Код 402 (нужна оплата) выбран нарочно: по нему браузер отличает
    «не хватает тарифа» от «ошиблись» и открывает выбор тарифа, а не
    ругается красным."""
    if not _тарифы_строго():
        return db.get_plan(user["id"])
    п = db.get_plan(user["id"])
    если_можно = db.plan_limits(п).get(что)
    if если_можно:
        return п
    raise HTTPException(402, f"{имя} — в Силвер и Голд. Сейчас у тебя "
                             f"{db.plan_limits(п)['имя']}.")


@app.get("/plans")
async def plans_public():
    """Таблица тарифов для титульной и страниц. Открыта без входа: её
    показывают людям, которые ещё не завели ключ."""
    return {
        "order": db.ПОРЯДОК_ТАРИФОВ,
        # Включены ли пределы прямо сейчас. Приложению это нужно, чтобы не
        # обещать запреты, которых нет: пока идёт проверка, работает всё.
        "enforce": _тарифы_строго(),
        "plans": {к: {
            "name": db.ТАРИФЫ[к]["имя"],
            "cubes": db.ТАРИФЫ[к]["кубов"],
            "month": db.ТАРИФЫ[к]["мес"],
            "year": db.ТАРИФЫ[к]["год"],
            "streams": db.ТАРИФЫ[к]["эфиры"],
            "signals": db.ТАРИФЫ[к]["сигналы"],
            "analytics": db.ТАРИФЫ[к]["аналитика"],
            "fund": db.ТАРИФЫ[к]["фонд"],
            "closed_cubes": db.ТАРИФЫ[к]["закрытые"],
            "api": db.ТАРИФЫ[к]["api"],
            "badge": db.ТАРИФЫ[к]["значок"],
            "priority": db.ТАРИФЫ[к]["приоритет"],
        } for к in db.ПОРЯДОК_ТАРИФОВ},
    }


@app.get("/plan")
async def plan_mine(user=Depends(get_current_user)):
    """Свой тариф: что действует, до когда, сколько кубов осталось."""
    return db.plan_info(user["id"])


@app.post("/plan/activate")
async def plan_activate(request: Request, body: PlanActivateRequest,
                        user=Depends(get_current_user)):
    """Включить тариф на месяц или на год.

    Денег этот узел не берёт и не делает вид, что взял: оплата идёт через
    платёжного провайдера отдельно, как и у свайпа. Здесь — включение
    после оплаты и отказ обратно на бесплатный.

    Платный тариф себе самому включить нельзя. Иначе любой, кто разглядел
    этот адрес, забирает Голд бесплатно — и платить становится незачем.
    Поэтому платное включает только тот, кто знает ADMIN_SECRET: сейчас это
    рука человека после оплаты, дальше — ответ платёжного провайдера. А вот
    отказаться обратно на бесплатный человек вправе сам и без разрешения."""
    plan = str(body.plan or "").lower()
    if plan not in db.ТАРИФЫ:
        raise HTTPException(400, "Нет такого тарифа")
    if plan != "free" and db.тариф_цена(plan, "month") > 0:
        секрет = request.headers.get("X-Admin-Secret", "")
        if not секрет:
            raise HTTPException(402, f"{db.ТАРИФЫ[plan]['имя']} включается после "
                                     f"оплаты у платёжного провайдера.")
        _check_admin(секрет)
    период = "year" if str(body.period) == "year" else "month"
    р = db.set_plan(user["id"], plan, период)
    if р.get("error"):
        raise HTTPException(400, р["error"])
    return {**р, **db.plan_info(user["id"])}


@app.get("/stats")
async def stats():
    s = db.get_stats()
    s["connected_ws"] = sum(len(v) for v in cube_rooms.values())
    return s

@app.get("/health")
async def health():
    return {"status": "ok", "version": "5.2.0", "kick_route": "active", "cube_visitors": "active"}

# ── WebSocket: per-cube rooms ─────────────────────────────────────────────────
# cube_rooms: { cube_id_str: { user_id_str: {"ws": websocket, "display_name": str} } }
# global_user_ws: { user_id_str: websocket }  — ALWAYS-ON global /ws/{token} connection
# user_ws: { user_id_str: websocket }  — most recent WS (cube / group / global)
# _notify_user uses global_user_ws so cube-room disconnects never lose the channel.

cube_rooms: Dict[str, Dict[str, dict]] = {}
global_user_ws: Dict[str, object] = {}   # ← persistent across cube join/leave
user_ws: Dict[str, object] = {}
_group_ws: Dict[str, Dict[str, object]] = {}  # group_id_str -> {user_id_str: websocket}

async def _notify_user(user_id: int, msg: dict):
    """Send a direct message to a user via their always-on global WebSocket.
    Falls back to any active WS (cube/group) if global is not connected."""
    ws = global_user_ws.get(str(user_id)) or user_ws.get(str(user_id))
    if ws:
        try:
            await ws.send_json(msg)
        except Exception:
            pass

async def _всем_в_сети(msg: dict, кроме: int = None):
    """v=583 · Сказать всем, кто сейчас на связи.

    Так расходятся перемены, которые видно у ВСЕХ: человек сменил имя или
    снимок, и его кружок должен смениться у собеседника, в списке чатов, в
    группе и в ленте — сразу, без перезагрузки страницы. Раньше такого
    известия не было вовсе: имя и снимок брались один раз и ложились в
    склад браузера навсегда.

    Шлём всем, кто в сети: площадка небольшая, а весточка короткая —
    номер, имя и ссылка на снимок. Решать на сервере, кто с кем знаком,
    дороже самой рассылки.
    """
    кроме = str(кроме) if кроме is not None else None
    for uid, ws in list(global_user_ws.items()):
        if кроме is not None and uid == кроме:
            continue
        try:
            await ws.send_json(msg)
        except Exception:
            pass


async def _участникам(group_id: int, msg: dict):
    """Сказать участникам одной группы — и тем, кто сейчас в её переписке."""
    отправлено = set()
    for uid, ws in list(_group_ws.get(str(group_id), {}).items()):
        try:
            await ws.send_json(msg)
            отправлено.add(str(uid))
        except Exception:
            pass
    try:
        участники = db.get_group_members(int(group_id), limit=500) or []
    except Exception:
        участники = []
    for у in участники:
        uid = str(у.get("id") if isinstance(у, dict) else у[0])
        if uid in отправлено:
            continue
        await _notify_user(int(uid), msg)


async def _broadcast(cube_id: str, msg: dict, exclude: str = None):
    for uid, info in list(cube_rooms.get(cube_id, {}).items()):
        if uid == exclude:
            continue
        try:
            await info["ws"].send_json(msg)
        except Exception:
            pass

async def _send_to_user(cube_id: str, user_id: str, msg: dict):
    info = cube_rooms.get(cube_id, {}).get(user_id)
    if info:
        try:
            await info["ws"].send_json(msg)
        except Exception:
            pass

def _online_list(cube_id: str):
    return [{"user_id": uid, "display_name": info["display_name"]}
            for uid, info in cube_rooms.get(cube_id, {}).items()]

@app.websocket("/ws/{token}/{cube_id}")
async def ws_cube(websocket: WebSocket, token: str, cube_id: str):
    await websocket.accept()
    if not _свой_origin(websocket):
        # Чужая страница. Закрываем молча: объяснять, почему не пустили,
        # значит подсказывать, как пройти.
        await websocket.close(code=4003)
        return
    user_id = None
    display_name = "Unknown"
    try:
        payload      = decode_access_token(token)
        user_id      = payload["sub"]
        display_name = db.get_display_name(int(user_id))
        db.update_last_seen(int(user_id))

        # Право войти в этот куб. Проверялся только бан — то есть в чужой
        # закрытый куб можно было и читать, и писать, зная один номер.
        if cube_id.isdigit() and not db.можно_в_куб(int(cube_id), int(user_id)):
            await websocket.send_json({"type": "denied", "reason": "need_key"})
            await websocket.close(code=4003)
            return

        # Check if user is banned from this cube
        if cube_id.isdigit() and db.is_user_banned_from_cube(int(cube_id), int(user_id)):
            await websocket.send_json({"type":"kicked","reason":"banned"})
            await websocket.close(code=4003)
            return

        # Also check IP/device ban (cross-account block)
        import hashlib
        # То же, что и у обычной ручки: первой записи в цепочке верить
        # нельзя, её ставит сам посетитель.
        ws_client_ip = _откуда_сокета(websocket)
        ws_ip_hash = db.hash_ip(ws_client_ip, 16) or None
        ws_device_id = (websocket.headers.get("x-device-id", "") or "")[:64] or None
        if cube_id.isdigit() and db.is_device_banned_from_cube(int(cube_id), ip_hash=ws_ip_hash, device_id=ws_device_id):
            await websocket.send_json({"type":"kicked","reason":"banned"})
            await websocket.close(code=4003)
            return

        if cube_id not in cube_rooms:
            cube_rooms[cube_id] = {}
        cube_rooms[cube_id][user_id] = {
            "ws": websocket, "display_name": display_name,
            "ip": ws_client_ip, "device_id": ws_device_id  # stored for kick → ban
        }
        user_ws[user_id] = websocket  # track cube WS (for cube-specific sends)
        # NOTE: global_user_ws is NOT updated here — it's managed only by /ws/{token}
        # Persist visit so kick-search works even after server restart
        if cube_id.isdigit():
            db.record_cube_visit(int(cube_id), int(user_id), display_name)

        online = len(cube_rooms[cube_id])

        await websocket.send_json({
            "type": "joined", "user_id": user_id,
            "display_name": display_name, "online": online,
            "online_users": _online_list(cube_id)
        })
        await _broadcast(cube_id, {
            "type": "user_joined", "user_id": user_id,
            "display_name": display_name, "online": online,
            "online_users": _online_list(cube_id)
        }, exclude=user_id)

        while True:
            data     = await websocket.receive_json()
            msg_type = data.get("type", "")

            if msg_type == "ping":
                await websocket.send_json({"type": "pong"})

            elif msg_type == "stream_sig":
                # Сведение для эфира: предложения, ответы и сетевые адреса
                # между ведущим и зрителем. Сервер только передаёт конверт
                # и подписывает отправителя — заглядывать внутрь ему незачем,
                # видео через него всё равно не идёт.
                кому = str(data.get("to", ""))
                if кому:
                    await _notify_user(int(кому), {
                        "type": "stream_sig",
                        "from": user_id,
                        "from_name": display_name,
                        "sid": data.get("sid"),
                        "kind": str(data.get("kind", ""))[:16],
                        "data": data.get("data"),
                    })

            elif msg_type == "typing":
                # Broadcast typing event to others
                await _broadcast(cube_id, {
                    "type": "typing",
                    "user_id": user_id,
                    "display_name": display_name
                }, exclude=user_id)

            elif msg_type == "message":
                content      = str(data.get("content", "")).strip()[:2000]
                chat_type    = data.get("msg_type", "text")
                reply_to_id  = data.get("reply_to_id")
                expires_secs = data.get("expires_secs")
                file_name    = data.get("file_name")
                file_size    = data.get("file_size")
                file_data    = data.get("file_data")   # base64, stored only for files/voice
                duration     = data.get("duration")

                if not content:
                    continue

                expires_at = None
                if expires_secs:
                    try:
                        expires_at = (datetime.utcnow() + timedelta(seconds=int(expires_secs))).strftime("%Y-%m-%d %H:%M:%S")
                    except Exception:
                        pass

                # Save to DB if numeric cube_id (not seed cube)
                msg_id = None
                if cube_id.isdigit():
                    # Содержимое файла в базу больше не кладём ни при каких
                    # условиях. Оно хранилось строкой base64: файл на 25 МБ
                    # занимал там ~33 МБ, и тремя десятками вложений
                    # забивался весь гигабайтный диск. А когда диск кончается,
                    # перестают сохраняться и сообщения, и посты.
                    # Файлы теперь лежат в хранилище, в сообщении — только
                    # ссылка на них.
                    store_data = None
                    msg_id = db.save_message(
                        int(cube_id), int(user_id), display_name, content,
                        msg_type=chat_type, reply_to_id=reply_to_id,
                        expires_at=expires_at, file_name=file_name,
                        file_size=file_size, file_data=store_data, duration=duration)
                    # Активность пишет сервер, когда сообщение действительно
                    # сохранилось, а не браузер по своему желанию.
                    _act(int(user_id), "voice" if chat_type == "voice" else "message")

                # Get reply preview if replying
                reply_preview = None
                if reply_to_id:
                    orig = db.get_message_by_id(reply_to_id)
                    if orig:
                        reply_preview = {"id": orig["id"], "author": orig["display_name"],
                                         "text": (orig["content"] or "")[:80]}

                out = {
                    "type": "message",
                    "id": msg_id,
                    "user_id": user_id,
                    "display_name": display_name,
                    "content": content,
                    "msg_type": chat_type,
                    "reply_to_id": reply_to_id,
                    "reply_preview": reply_preview,
                    "file_name": file_name,
                    "file_size": file_size,
                    "file_data": file_data,   # pass through for voice/image
                    "duration": duration,
                    "expires_secs": expires_secs,
                    "created_at": datetime.utcnow().isoformat()
                }
                # Broadcast to others; send ack (with server ID) only to sender
                await _broadcast(cube_id, out, exclude=user_id)
                await _send_to_user(cube_id, user_id, {**out, "type": "message_ack"})

            elif msg_type == "react":
                # {type:"react", msg_id:X, emoji:"👍"}
                react_msg_id = data.get("msg_id")
                emoji = str(data.get("emoji", ""))[:8]
                if react_msg_id and emoji:
                    result = db.toggle_reaction(int(react_msg_id), int(user_id), display_name, emoji)
                    await _broadcast(cube_id, {
                        "type": "react",
                        "msg_id": react_msg_id,
                        "emoji": emoji,
                        "user_id": user_id,
                        "counts": result["counts"]
                    })

            elif msg_type == "dm":
                # {type:"dm", to_user_id:"X", content:"...", msg_type:"text", ...}
                to_uid = str(data.get("to_user_id", ""))
                dm_content = str(data.get("content", "")).strip()[:2000]
                dm_type    = data.get("msg_type", "text")
                file_name  = data.get("file_name")
                file_size  = data.get("file_size")
                file_data  = data.get("file_data")
                duration   = data.get("duration")
                # Таймер исчезновения читался только у сообщений в группе, а у
                # личных терялся: клиент его слал, сервер выбрасывал, и запись
                # оставалась в переписке навсегда.
                dm_expires = _expiry_at(data.get("expires_secs"))
                if not dm_content or not to_uid:
                    continue
                # Лимит на новые переписки — и в основном канале тоже.
                try:
                    if db.dm_is_new_peer(int(user_id), int(to_uid)):
                        с = db.take_quota(int(user_id), "dm_new")
                        if not с.get('ok'):
                            await websocket.send_json({"type": "error", "code": "limit",
                                "message": "На сегодня хватит: новых переписок — "
                                           f"{с.get('limit')} в сутки."})
                            continue
                except Exception:
                    pass

                dm_id = None
                try:
                    dm_id = db.save_dm(int(user_id), int(to_uid), dm_content, msg_type=dm_type,
                                       file_name=file_name, file_size=file_size,
                                       file_data=None, duration=duration,
                                       expires_at=dm_expires)
                except Exception:
                    pass

                dm_out = {
                    "type": "dm",
                    "id": dm_id,
                    "from_user_id": user_id,
                    "to_user_id": to_uid,
                    "display_name": display_name,
                    "content": dm_content,
                    "msg_type": dm_type,
                    "file_name": file_name,
                    "file_size": file_size,
                    "file_data": file_data,
                    "duration": duration,
                    "expire_at": dm_expires,
                    "created_at": datetime.utcnow().isoformat()
                }
                # Send to recipient via global user_ws (works across all cubes)
                await _notify_user(int(to_uid), dm_out)
                # Echo to sender
                await websocket.send_json(dm_out)

            elif msg_type == "system":
                pass  # ignore client-side system messages

    except WebSocketDisconnect:
        pass
    except HTTPException:
        try:
            await websocket.close(code=4001)
        except Exception:
            pass
    finally:
        if user_id and cube_id in cube_rooms:
            cube_rooms[cube_id].pop(user_id, None)
            # Only clear user_ws if THIS websocket is still the registered one
            # (don't clear if global_user_ws has already re-registered a newer connection)
            if user_ws.get(user_id) is websocket:
                user_ws.pop(user_id, None)
            if not cube_rooms[cube_id]:
                del cube_rooms[cube_id]
            else:
                await _broadcast(cube_id, {
                    "type": "user_left",
                    "user_id": user_id,
                    "display_name": display_name,
                    "online": len(cube_rooms.get(cube_id, {})),
                    "online_users": _online_list(cube_id)
                })

# ── WebSocket: group chat room ───────────────────────────────────────────────
@app.websocket("/ws/group/{token}/{group_id}")
async def ws_group(websocket: WebSocket, token: str, group_id: str):
    """Real-time WebSocket for group chat — receives group_msg broadcasts."""
    await websocket.accept()
    if not _свой_origin(websocket):
        # Чужая страница. Закрываем молча: объяснять, почему не пустили,
        # значит подсказывать, как пройти.
        await websocket.close(code=4003)
        return
    user_id = None
    try:
        payload      = decode_access_token(token)
        user_id      = payload["sub"]
        display_name = db.get_display_name(int(user_id))
        db.update_last_seen(int(user_id))

        # Право слушать эту группу. Проверки здесь не было совсем: войти в
        # сокет мог любой, у кого есть свой рабочий токен и номер группы, —
        # и дальше ему шли все живые сообщения закрытой группы, хотя
        # /groups/{id}/messages ему бы отказал. Писать он не мог, но читал
        # всё. Спрашиваем то же, что и обычная ручка: участник или нет.
        можно = False
        try:
            if str(group_id).isdigit():
                сведения = db.get_group_info(int(group_id), int(user_id))
                можно = bool(сведения and сведения.get("is_member"))
        except Exception:
            можно = False
        if not можно:
            await websocket.send_json({"type": "denied", "reason": "not_member"})
            await websocket.close(code=4003)
            return

        gid = str(group_id)
        if gid not in _group_ws:
            _group_ws[gid] = {}
        _group_ws[gid][user_id] = websocket
        user_ws[user_id] = websocket

        await websocket.send_json({
            "type": "group_joined",
            "group_id": group_id,
            "user_id": user_id,
            "display_name": display_name,
            "online": len(_group_ws[gid])
        })

        while True:
            data = await websocket.receive_json()
            t = data.get("type", "")
            if t == "ping":
                await websocket.send_json({"type": "pong"})
            elif t == "typing":
                # Broadcast typing indicator to other members
                for uid, ws in list(_group_ws.get(gid, {}).items()):
                    if uid != user_id:
                        try:
                            await ws.send_json({
                                "type": "typing",
                                "user_id": user_id,
                                "display_name": display_name,
                                "group_id": group_id
                            })
                        except Exception:
                            pass

    except WebSocketDisconnect:
        pass
    except HTTPException:
        await websocket.close(code=4001)
    finally:
        _group_ws.get(str(group_id), {}).pop(user_id, None)
        if user_id and user_ws.get(user_id) is websocket:
            user_ws.pop(user_id, None)

# Keep old /ws/{token} for backward-compat (global room)
connected_users: dict = {}

@app.websocket("/ws/{token}")
async def websocket_legacy(websocket: WebSocket, token: str):
    """Global user WebSocket — for DM delivery when user is not in any cube."""
    await websocket.accept()
    if not _свой_origin(websocket):
        # Чужая страница. Закрываем молча: объяснять, почему не пустили,
        # значит подсказывать, как пройти.
        await websocket.close(code=4003)
        return
    user_id = None
    try:
        payload = decode_access_token(token)
        user_id = payload["sub"]
        connected_users[user_id] = websocket
        user_ws[user_id] = websocket
        global_user_ws[user_id] = websocket  # always-on channel for kick/delete notifications
        await websocket.send_json({"type": "connected", "user_id": user_id})
        while True:
            data = await websocket.receive_json()
            if data.get("type") == "ping":
                await websocket.send_json({"type": "pong"})
            elif data.get("type") == "stream_sig":
                # То же сведение для эфира, но по общему сокету: зритель
                # может смотреть из ленты, не заходя ни в какой куб.
                кому = str(data.get("to", ""))
                if кому:
                    await _notify_user(int(кому), {
                        "type": "stream_sig",
                        "from": user_id,
                        "from_name": db.get_display_name(int(user_id)),
                        "sid": data.get("sid"),
                        "kind": str(data.get("kind", ""))[:16],
                        "data": data.get("data"),
                    })
            elif data.get("type") == "dm":
                # Личные сообщения ходят и по этому, запасному каналу — он
                # работает, когда человек не внутри куба. Здесь из письма
                # брали только текст: срок исчезновения, имя файла, ссылка,
                # длительность и ответ терялись по дороге. Поэтому таймер,
                # выставленный в переписке, на сервер не доезжал, и сообщение
                # оставалось навсегда. Теперь поля те же, что в основном канале.
                to_uid = str(data.get("to_user_id", ""))
                dm_content = (data.get("content") or "").strip()[:4000]
                dm_type = data.get("msg_type", "text")
                dm_file_name = data.get("file_name")
                dm_file_size = data.get("file_size")
                dm_duration  = data.get("duration")
                dm_reply_to  = data.get("reply_to_id")
                dm_expires   = _expiry_at(data.get("expires_secs"))
                if dm_content and to_uid:
                    # Лимит на новые переписки действует и здесь: запасной
                    # канал не должен быть дыркой в счётчике.
                    try:
                        if db.dm_is_new_peer(int(user_id), int(to_uid)):
                            с = db.take_quota(int(user_id), "dm_new")
                            if not с.get('ok'):
                                await websocket.send_json({"type": "error", "code": "limit",
                                    "message": "На сегодня хватит: новых переписок — "
                                               f"{с.get('limit')} в сутки."})
                                continue
                    except Exception:
                        pass
                    display_name = db.get_display_name(int(user_id))
                    dm_id = db.save_dm(int(user_id), int(to_uid), dm_content, msg_type=dm_type,
                                       file_name=dm_file_name, file_size=dm_file_size,
                                       duration=dm_duration, reply_to_id=dm_reply_to,
                                       expires_at=dm_expires)
                    dm_out = {
                        "type": "dm", "id": dm_id,
                        "from_user_id": user_id, "to_user_id": to_uid,
                        "display_name": display_name, "content": dm_content,
                        "msg_type": dm_type,
                        "file_name": dm_file_name, "file_size": dm_file_size,
                        "file_url": data.get("file_url") or (dm_content if dm_type in ("image","video","file","voice") else None),
                        "duration": dm_duration,
                        "reply_to_id": dm_reply_to,
                        "expire_at": dm_expires,
                        "created_at": datetime.utcnow().isoformat()
                    }
                    await _notify_user(int(to_uid), dm_out)
                    await websocket.send_json(dm_out)
    except WebSocketDisconnect:
        pass
    except HTTPException:
        await websocket.close(code=4001)
    finally:
        connected_users.pop(user_id, None)
        global_user_ws.pop(user_id, None)  # unregister always-on channel
        if user_ws.get(user_id) is websocket:
            user_ws.pop(user_id, None)


# ══════════════════════════════════════════════════════════════════════════════
#  СИГНАЛЫ: КОТИРОВКИ И АВТОЗАКРЫТИЕ
#
#  Цену входа ставит сервер по рынку в момент публикации — автор не может
#  приписать себе удобный вход. Исход тоже определяет сервер: раз в минуту
#  он берёт минутные свечи по паре и смотрит, задела ли цена take profit или
#  stop loss. Если в одной свече задеты оба, считаем убыток — так статистика
#  не получается красивее, чем было на самом деле.
#
#  Котировки берём из открытых источников по очереди: если первый недоступен
#  (а Binance закрыт для части стран), работает следующий.
# ══════════════════════════════════════════════════════════════════════════════

import asyncio
import json as _json
import math
import time as _time

SIG_TICK       = int(os.getenv("SIG_TICK_SEC", "60"))     # как часто сверять цены
SIG_PRICE_MOCK = os.getenv("CW_PRICE_MOCK", "")           # подменённые цены — только для проверки
SIG_MAX_OPEN   = int(os.getenv("SIG_MAX_OPEN", "3"))      # сколько сигналов можно держать открытыми
SIG_HORIZONS   = (1, 4, 24, 72, 168)                      # допустимые сроки, часы
SIG_REVEALS    = (60, 240, 1440)                          # когда платный сигнал раскрывается
SIG_MAX_DIST   = 0.5                                      # TP/SL не дальше 50% от входа
SIG_MIN_DIST   = 0.001                                    # и не ближе 0.1%

_QUOTES = ("USDT", "USDC", "USD", "BTC", "ETH", "EUR", "TRY")

SIG_PAIRS = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "XRP/USDT", "BNB/USDT",
             "DOGE/USDT", "ADA/USDT", "TON/USDT", "AVAX/USDT", "LINK/USDT",
             "TRX/USDT", "DOT/USDT", "MATIC/USDT", "LTC/USDT", "NEAR/USDT"]


def _sig_norm_pair(raw):
    """«btc/usdt», «BTC-USDT», «btcusdt» → ('BTC','USDT'). Иначе (None, None)."""
    s = str(raw or "").strip().upper().replace(" ", "")
    s = s.replace("\\", "/").replace("-", "/").replace("_", "/").replace(":", "/")
    if "/" in s:
        parts = [p for p in s.split("/") if p]
        if len(parts) != 2:
            return None, None
        base, quote = parts[0], parts[1]
    else:
        base, quote = None, None
        for q in _QUOTES:
            if s.endswith(q) and len(s) > len(q):
                base, quote = s[:-len(q)], q
                break
        if not base:
            return None, None
    if not (1 <= len(base) <= 12) or not base.isalnum():
        return None, None
    if quote not in _QUOTES:
        return None, None
    return base, quote


# ── Источники котировок ───────────────────────────────────────────────────────

def _usdt(q):
    return "USDT" if q == "USD" else q


def _usd(q):
    return "USD" if q in ("USDT", "USDC") else q


_PRICE_SRC = [
    {
        "name": "binance",
        "sym":  lambda b, q: b + _usdt(q),
        "last": lambda s: ("https://api.binance.com/api/v3/ticker/price", {"symbol": s}),
        "last_pick": lambda j: float(j["price"]),
        "bars": {60: "1m", 300: "5m", 900: "15m", 3600: "1h", 14400: "4h"},
        "max":  1000,
        "kl":   lambda s, bar, start, lim: ("https://api.binance.com/api/v3/klines",
                {"symbol": s, "interval": bar, "startTime": start, "limit": lim}),
        "kl_pick": lambda j: [(int(r[0]), float(r[2]), float(r[3]), float(r[4])) for r in j],
    },
    {
        "name": "bybit",
        "sym":  lambda b, q: b + _usdt(q),
        "last": lambda s: ("https://api.bybit.com/v5/market/tickers",
                {"category": "spot", "symbol": s}),
        "last_pick": lambda j: float(j["result"]["list"][0]["lastPrice"]),
        "bars": {60: "1", 300: "5", 900: "15", 3600: "60", 14400: "240"},
        "max":  1000,
        "kl":   lambda s, bar, start, lim: ("https://api.bybit.com/v5/market/kline",
                {"category": "spot", "symbol": s, "interval": bar, "start": start, "limit": min(lim, 1000)}),
        "kl_pick": lambda j: [(int(r[0]), float(r[2]), float(r[3]), float(r[4]))
                              for r in j["result"]["list"]],
    },
    {
        "name": "okx",
        "sym":  lambda b, q: b + "-" + _usdt(q),
        "last": lambda s: ("https://www.okx.com/api/v5/market/ticker", {"instId": s}),
        "last_pick": lambda j: float(j["data"][0]["last"]),
        "bars": {60: "1m", 300: "5m", 900: "15m", 3600: "1H", 14400: "4H"},
        "max":  300,
        "kl":   lambda s, bar, start, lim: ("https://www.okx.com/api/v5/market/candles",
                {"instId": s, "bar": bar, "limit": min(lim, 300)}),
        "kl_pick": lambda j: [(int(r[0]), float(r[2]), float(r[3]), float(r[4])) for r in j["data"]],
    },
    {
        "name": "coinbase",
        "sym":  lambda b, q: b + "-" + _usd(q),
        "last": lambda s: ("https://api.exchange.coinbase.com/products/%s/ticker" % s, {}),
        "last_pick": lambda j: float(j["price"]),
        "bars": {60: 60, 300: 300, 900: 900, 3600: 3600, 21600: 21600},
        "max":  300,
        "kl":   lambda s, bar, start, lim: ("https://api.exchange.coinbase.com/products/%s/candles" % s,
                {"granularity": bar}),
        # [time_s, low, high, open, close, volume]
        "kl_pick": lambda j: [(int(r[0]) * 1000, float(r[2]), float(r[1]), float(r[4])) for r in j],
    },
]

_SRC_BY_NAME = {s["name"]: s for s in _PRICE_SRC}
_PRICE_CACHE = {}          # (base,quote) -> (метка времени, цена, источник)
_SRC_GOOD    = {"name": None, "at": 0}


def _mock():
    """Подменённые цены для проверки логики без выхода в сеть."""
    if not SIG_PRICE_MOCK:
        return None
    try:
        with open(SIG_PRICE_MOCK, "r") as f:
            return _json.load(f)
    except Exception:
        return None


async def _sig_http(url, params):
    async with httpx.AsyncClient(timeout=8.0,
                                 headers={"User-Agent": "CubeWorld/1.0"}) as cl:
        r = await cl.get(url, params=params or None)
        if r.status_code != 200:
            raise RuntimeError("http %s" % r.status_code)
        return r.json()


def _src_order():
    """Источник, который только что сработал, пробуем первым."""
    name = _SRC_GOOD["name"]
    if name and (_time.time() - _SRC_GOOD["at"]) < 900 and name in _SRC_BY_NAME:
        rest = [s for s in _PRICE_SRC if s["name"] != name]
        return [_SRC_BY_NAME[name]] + rest
    return list(_PRICE_SRC)


async def sig_price_now(base, quote, prefer=None):
    """Цена по рынку сейчас. Возвращает (цена, источник) или (None, None)."""
    m = _mock()
    if m is not None:
        rec = m.get(base + quote) or m.get(base + "/" + quote) or {}
        p = rec.get("last")
        return (float(p), "mock") if p is not None else (None, None)

    order = _src_order()
    if prefer and prefer in _SRC_BY_NAME:
        order = [_SRC_BY_NAME[prefer]] + [s for s in order if s["name"] != prefer]
    for src in order:
        try:
            sym = src["sym"](base, quote)
            url, params = src["last"](sym)
            j = await _sig_http(url, params)
            price = src["last_pick"](j)
            if price and price > 0:
                _SRC_GOOD["name"] = src["name"]; _SRC_GOOD["at"] = _time.time()
                _PRICE_CACHE[(base, quote)] = (_time.time(), price, src["name"])
                return price, src["name"]
        except Exception:
            continue
    return None, None


async def sig_price_bars(base, quote, since_ms, prefer=None):
    """Свечи с момента since_ms: [(метка, максимум, минимум, закрытие)] по возрастанию."""
    m = _mock()
    if m is not None:
        rec = m.get(base + quote) or m.get(base + "/" + quote) or {}
        bars = [(int(x[0]), float(x[1]), float(x[2]), float(x[3]))
                for x in (rec.get("candles") or [])]
        bars = [b for b in bars if b[0] >= since_ms - 60000]
        bars.sort(key=lambda b: b[0])
        return bars, "mock"

    gap = max(60000, int(_time.time() * 1000) - int(since_ms))
    order = _src_order()
    if prefer and prefer in _SRC_BY_NAME:
        order = [_SRC_BY_NAME[prefer]] + [s for s in order if s["name"] != prefer]

    for src in order:
        try:
            # Берём самую мелкую свечу, которой хватает, чтобы закрыть разрыв
            # одним запросом. При долгом простое сервера точность падает до
            # 5–15 минут — это честнее, чем пропустить касание вовсе.
            steps = sorted(src["bars"].keys())
            cap = int(src.get("max", 300)) - 20     # OKX и Coinbase отдают не больше 300
            pick = steps[-1]
            for sec in steps:
                if gap / 1000.0 / sec <= cap:
                    pick = sec
                    break
            lim = int(min(cap, max(2, math.ceil(gap / 1000.0 / pick) + 2)))
            sym = src["sym"](base, quote)
            url, params = src["kl"](sym, src["bars"][pick], int(since_ms), lim)
            j = await _sig_http(url, params)
            bars = src["kl_pick"](j)
            bars = [b for b in bars if b[0] >= int(since_ms) - pick * 1000]
            bars.sort(key=lambda b: b[0])
            if bars:
                _SRC_GOOD["name"] = src["name"]; _SRC_GOOD["at"] = _time.time()
                _PRICE_CACHE[(base, quote)] = (_time.time(), bars[-1][3], src["name"])
                return bars, src["name"]
        except Exception:
            continue
    return [], None


def sig_cached_price(base, quote, max_age=180):
    rec = _PRICE_CACHE.get((base, quote))
    if not rec:
        return None
    if _time.time() - rec[0] > max_age:
        return None
    return rec[1]


# ── Закрытие сигналов ─────────────────────────────────────────────────────────

def _sig_result_pct(direction, entry, close):
    entry = float(entry or 0)
    if entry <= 0:
        return 0.0
    # Равная ставка, без плеча. Шорт — зеркало лонга: заработал столько,
    # на сколько цена ушла вниз от входа.
    move = (float(close) / entry - 1.0) * 100.0
    return round(-move if str(direction).upper() == "SHORT" else move, 4)


def _sig_scan(direction, tp, sl, bars):
    """Первое касание. Если в одной свече задеты и TP, и SL — считаем SL."""
    long_ = str(direction).upper() != "SHORT"
    for ts, hi, lo, cl in bars:
        if long_:
            tp_hit, sl_hit = hi >= tp, lo <= sl
        else:
            tp_hit, sl_hit = lo <= tp, hi >= sl
        if sl_hit:
            return "sl", sl, ts
        if tp_hit:
            return "tp", tp, ts
    return None, None, None


async def _sig_settle_one(row, memo=None):
    sid   = int(row["id"])
    base  = row.get("base"); quote = row.get("quote")
    if not base or not quote:
        return
    entry = float(row.get("entry_price") or 0)
    tp    = float(row.get("tp_price") or 0)
    sl    = float(row.get("sl_price") or 0)
    if entry <= 0 or tp <= 0 or sl <= 0:
        return

    started = db._as_dt(row.get("created_at")) or datetime.utcnow()
    lastchk = db._as_dt(row.get("last_check")) or started
    since   = max(started, lastchk) - timedelta(seconds=90)
    since_ms = int(since.replace(microsecond=0).timestamp() * 1000)

    # Несколько сигналов по одной паре за один проход обслуживаем одним запросом.
    key = (base, quote, since_ms // 60000)
    if memo is not None and key in memo:
        bars, src = memo[key]
    else:
        bars, src = await sig_price_bars(base, quote, since_ms, row.get("price_src"))
        if memo is not None:
            memo[key] = (bars, src)
    status, price, _ts = _sig_scan(row.get("direction"), tp, sl, bars)

    if status:
        db.sig_settle(sid, status, price, _sig_result_pct(row.get("direction"), entry, price))
        _sig_stats_drop(row.get("user_id"))
        return

    exp = db._as_dt(row.get("expires_at"))
    if exp and datetime.utcnow() >= exp:
        close = bars[-1][3] if bars else sig_cached_price(base, quote, 3600)
        if close is None:
            close, _ = await sig_price_now(base, quote, row.get("price_src"))
        if close is None:
            # Неделю нет котировок — пару, скорее всего, перестали торговать.
            # Исход выдумывать не будем: сигнал выходит из статистики совсем.
            if datetime.utcnow() - exp > timedelta(days=7):
                db.sig_settle(sid, "void", 0, 0)
                _sig_stats_drop(row.get("user_id"))
            return                     # нет цены — не придумываем исход, ждём
        db.sig_settle(sid, "expired", close,
                      _sig_result_pct(row.get("direction"), entry, close))
        _sig_stats_drop(row.get("user_id"))
        return

    db.sig_touch(sid)


async def _sig_worker():
    """Раз в минуту сверяем открытые сигналы с котировками."""
    await asyncio.sleep(3)
    while True:
        try:
            rows = db.sig_open_batch(200)
            memo = {}
            for row in rows:
                try:
                    await _sig_settle_one(row, memo)
                except Exception:
                    pass
                # Между запросами делаем паузу: биржи считают обращения в минуту,
                # а очередь может быть длинной.
                await asyncio.sleep(0.2)
        except Exception:
            pass
        await asyncio.sleep(SIG_TICK)


@app.on_event("startup")
async def _sig_startup():
    try:
        asyncio.create_task(_sig_worker())
    except Exception:
        pass


# ── Кто смотрит ───────────────────────────────────────────────────────────────

def _sig_viewer(request: Request):
    """Пользователь, если он вошёл. Без токена — None, страница всё равно работает."""
    try:
        auth = request.headers.get("Authorization") or ""
        if not auth.lower().startswith("bearer "):
            return None
        payload = decode_access_token(auth.split(" ", 1)[1].strip())
        return db.get_user_by_id(int(payload["sub"]))
    except Exception:
        return None


_SIG_STAT_CACHE = {}
_SIG_TOP_CACHE = {}


def _sig_stats_drop(uid):
    _SIG_STAT_CACHE.pop(int(uid or 0), None)
    # Витрина построена на той же статистике — её тоже пересчитаем заново.
    try:
        _SIG_TOP_CACHE.clear()
    except Exception:
        pass


def _sig_stats_cached(uid, ttl=10):
    rec = _SIG_STAT_CACHE.get(int(uid))
    if rec and _time.time() - rec[0] < ttl:
        return rec[1]
    st = db.sig_author_stats(int(uid))
    _SIG_STAT_CACHE[int(uid)] = (_time.time(), st)
    return st


def _sig_price_pref(uid):
    try:
        p = db.get_prefs(int(uid), ["sig_sub_price"]) or {}
        v = (p.get("sig_sub_price") or {}).get("v")
        return max(0.0, round(float(v), 2)) if v else 0.0
    except Exception:
        return 0.0


def _sig_public(row, viewer_id=None):
    """Карточка сигнала для интерфейса. Платный до раскрытия отдаём без условий."""
    uid    = row.get("user_id")
    status = row.get("status") or "open"
    access = row.get("access") or "free"
    reveal = db._as_dt(row.get("reveal_at"))
    revealed = (not reveal) or datetime.utcnow() >= reveal
    mine   = viewer_id is not None and uid is not None and int(viewer_id) == int(uid)
    subbed = bool(uid is not None and viewer_id is not None and
                  db.sig_sub_active(int(uid), int(viewer_id)))
    locked = (access == "paid" and not revealed and not mine and not subbed)

    base  = row.get("base"); quote = row.get("quote")
    out = {
        "id": row.get("id"),
        "cube_id": row.get("cube_id"),
        "author_id": uid,
        "author": row.get("display_name") or "—",
        "dir": (row.get("direction") or "LONG").upper(),
        "status": status,
        "access": access,
        "locked": locked,
        "mine": mine,
        "subscribed": subbed,
        "created_at": db._utc_str(db._as_dt(row.get("created_at"))) if row.get("created_at") else None,
        "expires_at": db._utc_str(db._as_dt(row.get("expires_at"))) if row.get("expires_at") else None,
        "reveal_at": db._utc_str(reveal) if reveal else None,
        "closed_at": db._utc_str(db._as_dt(row.get("closed_at"))) if row.get("closed_at") else None,
        "horizon_h": row.get("horizon_h"),
        "tips": round(float(row.get("tips_cube") or 0), 2),
    }
    if locked:
        out.update({"pair": None, "dir": None, "entry": None, "tp": None, "sl": None,
                    "note": None, "live": None, "pnl": None})
    else:
        out.update({
            "pair": row.get("ticker") or (f"{base}/{quote}" if base else None),
            "base": base, "quote": quote,
            "entry": row.get("entry_price"),
            "tp": row.get("tp_price"),
            "sl": row.get("sl_price"),
            "note": row.get("content") or "",
            "close_price": row.get("close_price"),
            "result_pct": row.get("result_pct"),
        })
        if status == "open" and base and quote:
            live = sig_cached_price(base, quote)
            out["live"] = live
            out["pnl"] = (_sig_result_pct(row.get("direction"), row.get("entry_price"), live)
                          if live else None)
        else:
            out["live"] = None
            out["pnl"] = row.get("result_pct")
    if uid is not None:
        out["stats"] = _sig_stats_cached(uid)
        out["sub_price"] = _sig_price_pref(uid)
    return out


# ── Публикация и чтение ───────────────────────────────────────────────────────

class SignalNewRequest(BaseModel):
    pair: str = ""
    ticker: str = ""                 # старое имя поля — поддерживаем
    direction: str = "LONG"
    tp_price: float = 0.0
    sl_price: float = 0.0
    tp_pct: Optional[float] = None   # можно задать в процентах от входа
    sl_pct: Optional[float] = None
    horizon_h: int = 24
    access: str = "free"
    reveal_min: int = 1440
    content: str = ""
    entry_price: float = 0.0         # присылают, но сервер ставит свою цену


@app.get("/signals/pairs")
async def sig_pairs():
    return {"pairs": SIG_PAIRS}


@app.get("/signals/price")
async def sig_price(pair: str):
    base, quote = _sig_norm_pair(pair)
    if not base:
        raise HTTPException(400, "Не разобрал пару. Пример: BTC/USDT")
    price, src = await sig_price_now(base, quote)
    if price is None:
        raise HTTPException(503, f"Нет котировок по паре {base}/{quote}")
    return {"pair": f"{base}/{quote}", "price": price, "source": src}


async def _sig_publish(cube_id: int, body: SignalNewRequest, user):
    base, quote = _sig_norm_pair(body.pair or body.ticker)
    if not base:
        raise HTTPException(400, "Не разобрал пару. Пример: BTC/USDT")

    direction = "SHORT" if str(body.direction).upper() == "SHORT" else "LONG"
    horizon = int(body.horizon_h or 24)
    if horizon not in SIG_HORIZONS:
        raise HTTPException(400, "Срок может быть 1, 4, 24, 72 или 168 часов")
    access = "paid" if str(body.access).lower() == "paid" else "free"
    reveal = int(body.reveal_min or 1440)
    if access == "paid" and reveal not in SIG_REVEALS:
        reveal = 1440

    if db.sig_open_count(user["id"]) >= SIG_MAX_OPEN:
        raise HTTPException(409, f"У тебя уже {SIG_MAX_OPEN} открытых сигнала. "
                                 f"Дождись их закрытия.")
    if db.sig_has_open_pair(user["id"], base, quote):
        raise HTTPException(409, f"По {base}/{quote} у тебя уже есть открытый сигнал")

    entry, src = await sig_price_now(base, quote)
    if entry is None:
        raise HTTPException(503, f"Нет котировок по паре {base}/{quote}. "
                                 f"Сигнал без котировок закрыть нечем.")

    tp = float(body.tp_price or 0)
    sl = float(body.sl_price or 0)
    if body.tp_pct:
        d = abs(float(body.tp_pct)) / 100.0
        tp = entry * (1 + d) if direction == "LONG" else entry * (1 - d)
    if body.sl_pct:
        d = abs(float(body.sl_pct)) / 100.0
        sl = entry * (1 - d) if direction == "LONG" else entry * (1 + d)
    if tp <= 0 or sl <= 0:
        raise HTTPException(400, "Нужны take profit и stop loss")

    if direction == "LONG" and not (sl < entry < tp):
        raise HTTPException(400, "Для LONG: take profit выше входа, stop loss ниже")
    if direction == "SHORT" and not (tp < entry < sl):
        raise HTTPException(400, "Для SHORT: take profit ниже входа, stop loss выше")
    for name, v in (("take profit", tp), ("stop loss", sl)):
        d = abs(v / entry - 1.0)
        if d < SIG_MIN_DIST:
            raise HTTPException(400, f"{name} слишком близко к входу — минимум 0.1%")
        if d > SIG_MAX_DIST:
            raise HTTPException(400, f"{name} дальше 50% от входа — так не бывает")

    name = db.get_display_name(user["id"])
    sid = db.sig_create(cube_id, user["id"], name, base, quote, direction,
                        entry, tp, sl, horizon, access, reveal,
                        (body.content or "")[:500], src)
    _sig_stats_drop(user["id"])
    await _ref_touch(user["id"])
    row = db.sig_get(sid)
    return {"ok": True, "id": sid, "entry": entry, "source": src,
            "signal": _sig_public(row, user["id"])}


@app.get("/cubes/{cube_id}/signals")
async def sig_list_cube(cube_id: int, request: Request, limit: int = 60):
    viewer = _sig_viewer(request)
    vid = int(viewer["id"]) if viewer else None
    rows = db.sig_list(cube_id=cube_id, limit=min(200, max(1, limit)))
    return {"signals": [_sig_public(r, vid) for r in rows]}


@app.post("/cubes/{cube_id}/signals")
async def sig_new_cube(cube_id: int, body: SignalNewRequest, user=Depends(get_current_user)):
    _лимит(user, "signal")
    return await _sig_publish(cube_id, body, user)


@app.post("/signals")
async def sig_new_standalone(body: SignalNewRequest, user=Depends(get_current_user)):
    _нужен_платный(user, "сигналы", "Свои сигналы")
    _лимит(user, "signal")
    return await _sig_publish(1, body, user)


@app.post("/signals/{sid}/close")
async def sig_close(sid: int, user=Depends(get_current_user)):
    row = db.sig_get(sid)
    if not row:
        raise HTTPException(404, "Сигнал не найден")
    if int(row.get("user_id") or 0) != int(user["id"]):
        raise HTTPException(403, "Закрыть сигнал может только автор")
    if row.get("status") != "open":
        raise HTTPException(409, "Сигнал уже закрыт")
    base, quote = row.get("base"), row.get("quote")
    price, _ = await sig_price_now(base, quote, row.get("price_src"))
    if price is None:
        raise HTTPException(503, "Нет котировок — закрыть пока нечем")
    pct = _sig_result_pct(row.get("direction"), row.get("entry_price"), price)
    db.sig_settle(sid, "closed", price, pct)
    _sig_stats_drop(user["id"])
    return {"ok": True, "close_price": price, "result_pct": pct}


@app.get("/signals/authors/{uid}/signals")
async def sig_author_signals(uid: int, request: Request, limit: int = 30):
    """История автора: все его сигналы, включая закрытые."""
    viewer = _sig_viewer(request)
    vid = int(viewer["id"]) if viewer else None
    rows = db.sig_list(author_id=uid, limit=min(100, max(1, limit)))
    return {"signals": [_sig_public(r, vid) for r in rows]}


@app.get("/signals/authors/{uid}")
async def sig_author(uid: int):
    return {"user_id": uid, "name": db.get_display_name(uid),
            "stats": db.sig_author_stats(uid),
            "sub_price": _sig_price_pref(uid),
            "subs": db.sig_subs_count(uid)}


@app.get("/signals/top")
async def sig_top(limit: int = 10, min_closed: int = 20, min_days: int = 0):
    # Витрина перебирает всех авторов разом. На каждый заход страницы это
    # лишняя работа, поэтому держим ответ полминуты.
    key = (min(50, max(1, limit)), int(min_closed), int(min_days))
    rec = _SIG_TOP_CACHE.get(key)
    if rec and _time.time() - rec[0] < 30:
        return {"authors": rec[1]}
    authors = db.sig_top_authors(*key)
    _SIG_TOP_CACHE[key] = (_time.time(), authors)
    return {"authors": authors}


class SigTipRequest(BaseModel):
    amount: float = 5.0


@app.post("/signals/{sid}/tip")
async def sig_tip(sid: int, body: SigTipRequest, user=Depends(get_current_user)):
    row = db.sig_get(sid)
    if not row:
        raise HTTPException(404, "Сигнал не найден")
    author = int(row.get("user_id") or 0)
    if author == int(user["id"]):
        raise HTTPException(400, "Себе чаевые не отправишь")
    amount = round(float(body.amount or 0), 2)
    if amount < 1 or amount > 10000:
        raise HTTPException(400, "Сумма от 1 до 10000 CUBE")
    res = db.transfer_cube(user["id"], author, amount, f"Чаевые за сигнал #{sid}")
    if res.get("error") == "not enough":
        raise HTTPException(402, f"Не хватает CUBE: на балансе {res.get('balance', 0):.0f}")
    if not res.get("ok"):
        raise HTTPException(400, "Перевод не прошёл")
    db.sig_add_tip(sid, amount)
    return {"ok": True, "balance": res.get("balance"), "amount": amount}


class SigPriceRequest(BaseModel):
    cube_per_month: float = 0.0


@app.post("/signals/me/price")
async def sig_set_price(body: SigPriceRequest, user=Depends(get_current_user)):
    """Цена подписки на свои платные сигналы, в CUBE за месяц. 0 — подписки нет."""
    v = max(0.0, min(100000.0, round(float(body.cube_per_month or 0), 2)))
    st = db.sig_author_stats(user["id"])
    if v > 0 and st["closed"] < db.MIN_CLOSED_FOR_RATE:
        raise HTTPException(409, f"Платная подписка открывается после "
                                 f"{db.MIN_CLOSED_FOR_RATE} закрытых сигналов. "
                                 f"Осталось {st['need_closed']}.")
    db.set_prefs(int(user["id"]), {"sig_sub_price": {"v": str(v), "t": int(_time.time() * 1000)}})
    return {"ok": True, "cube_per_month": v}


@app.post("/signals/authors/{uid}/subscribe")
async def sig_subscribe(uid: int, user=Depends(get_current_user)):
    if int(uid) == int(user["id"]):
        raise HTTPException(400, "Это твои собственные сигналы")
    price = _sig_price_pref(uid)
    if price <= 0:
        raise HTTPException(409, "У автора нет платной подписки")
    res = db.transfer_cube(user["id"], uid, price, "Подписка на сигналы")
    if res.get("error") == "not enough":
        raise HTTPException(402, f"Не хватает CUBE: на балансе {res.get('balance', 0):.0f}, "
                                 f"нужно {price:.0f}")
    if not res.get("ok"):
        raise HTTPException(400, "Оплата не прошла")
    exp = db.sig_sub_grant(uid, user["id"], 30)
    return {"ok": True, "expires_at": exp, "balance": res.get("balance"), "paid": price}


@app.get("/signals/me/subs")
async def sig_my_subs(user=Depends(get_current_user)):
    return {"subs": db.sig_subs_count(user["id"]),
            "price": _sig_price_pref(user["id"]),
            "stats": db.sig_author_stats(user["id"])}


# ══════════════════════════════════════════════════════════════════════════════
#  РЕФЕРАЛЫ
#
#  Ссылка раньше собиралась случайными буквами в браузере, менялась при каждой
#  перезагрузке и вела на cubewrld.io — домен, которого у нас нет. Список
#  приглашённых состоял из трёх выдуманных строк, а награда нигде не
#  начислялась: функция claimReferralReward не была ни к чему подключена.
#
#  Теперь у человека один постоянный код. Пришедший по ссылке привязывается
#  один раз и только в первые двое суток своей жизни. Награда приходит обоим,
#  когда новичок сделал первое настоящее действие — написал пост, сообщение в
#  группе или в личной переписке, либо опубликовал сигнал.
# ══════════════════════════════════════════════════════════════════════════════

# Мгновенных начислений за приглашение больше нет: 75 CUBE при курсе 1 к 1 —
# это 75 долларов за приведённого человека, и ферма ключей окупалась бы мигом.
# Приглашение оплачивается, только когда друг купил подписку: платить за
# просто пришедшего при анонимных бесплатных ключах — значит платить ферме.
REF_BONUS_INVITER = float(os.getenv("REF_BONUS_INVITER", "0"))
REF_BONUS_FRIEND  = float(os.getenv("REF_BONUS_FRIEND", "0"))


def _ref_device(request: Request) -> str:
    try:
        return (request.headers.get("X-Device-Id", "") or "")[:64]
    except Exception:
        return ""


async def _ref_touch(user_id):
    """Первое настоящее действие новичка. Зовётся отовсюду, где оно случается."""
    try:
        paid = db.ref_pay(int(user_id), REF_BONUS_INVITER, REF_BONUS_FRIEND)
    except Exception:
        return
    if not paid:
        return
    # Приглашение засчитывается как вклад пригласившего: оно влияет на его долю
    # в фонде месяца. Мгновенных CUBE за него больше не платим.
    try:
        db.record_activity(paid["inviter_id"], "invite")
    except Exception:
        pass
    try:
        await _notify_user(paid["inviter_id"], {
            "type": "referral_reward",
            "amount": paid["inviter_bonus"],
            "friend": paid["friend_name"],
            "balance": db.get_cube_balance(paid["inviter_id"]),
        })
    except Exception:
        pass


class RefAttachRequest(BaseModel):
    code: str = ""


@app.get("/me/referral")
async def my_referral(request: Request, user=Depends(get_current_user)):
    uid = int(user["id"])
    dev = _ref_device(request)
    if dev:
        try: db.ref_set_device(uid, dev)
        except Exception: pass

    code = db.ref_code_for(uid) or ""
    rows = db.ref_list(uid, 50)
    friends = []
    for r in rows:
        friends.append({
            "id": r.get("id"),
            # v=563 · Приглашённый друг без имени назывался меткой ключа
            # («CUBE-X7MK») или словом «Аноним». Теперь — по UID, как везде.
            "name": r.get("display_name") or db.uid_имя(r.get("id")),
            "joined_at": db._utc_str(db._as_dt(r.get("referred_at") or r.get("created_at")))
                         if (r.get("referred_at") or r.get("created_at")) else None,
            # 1 — награда выплачена, 2 — приглашение не засчитано.
            "active": int(r.get("ref_paid") or 0) == 1,
            "blocked": int(r.get("ref_paid") or 0) == 2,
        })
    return {
        "code": code,
        "invited": len(friends),
        "active": len([f for f in friends if f["active"]]),
        "earned": db.ref_earned(uid),
        "bonus_inviter": REF_BONUS_INVITER,
        "bonus_friend": REF_BONUS_FRIEND,
        "friends": friends,
    }


@app.post("/me/referral/attach")
async def attach_referral(body: RefAttachRequest, request: Request,
                          user=Depends(get_current_user)):
    uid = int(user["id"])
    dev = _ref_device(request)
    if dev:
        try: db.ref_set_device(uid, dev)
        except Exception: pass
    res = db.ref_attach(uid, body.code)
    if res.get("error"):
        return {"ok": False, "reason": res["error"]}
    return {"ok": True}


# ══════════════════════════════════════════════════════════════════════════════
#  МАРКЕТПЛЕЙС
#
#  Витрина общая: товар, выложенный из любого куба, виден всем. Семь
#  категорий. Цена в CUBE, ноль — бесплатно. Покупателю достаётся текст
#  (ключ, промокод, ссылка, инструкция) и файлы, включая zip.
#
#  Файлы лежат в базе и отдаются только тому, кто купил, — по ручке с
#  проверкой токена, а не по публичной ссылке. Папка /tmp для этого не
#  годится: на Render она очищается при каждом перезапуске, и купленный
#  товар пропал бы вместе с ней.
# ══════════════════════════════════════════════════════════════════════════════

MARKET_CATS = [
    {"id": "keys",    "icon": "🔑", "name": "Ключи и коды"},
    {"id": "nft",     "icon": "🖼️", "name": "NFT и коллекции"},
    {"id": "tools",   "icon": "🛠️", "name": "IT-продукты"},
    {"id": "ai",      "icon": "🤖", "name": "AI-системы"},
    {"id": "content", "icon": "🎬", "name": "Цифровой контент"},
    {"id": "pass",    "icon": "🎟️", "name": "Пропуска и членство"},
    {"id": "domains", "icon": "🌐", "name": "Домены и имена"},
    {"id": "service", "icon": "🤝", "name": "Цифровые услуги"},
]
MARKET_CAT_IDS = [c["id"] for c in MARKET_CATS]
MARKET_MAX_COVER = 300_000          # обложка, символов base64 ≈ 220 КБ
MARKET_MAX_PRICE = 1_000_000


class MarketItemRequest(BaseModel):
    title: str = ""
    description: str = ""
    tags: Any = ""
    category: str = "content"
    price: float = 0.0
    cover: Optional[str] = None
    delivery: str = ""
    cube_id: Optional[int] = None


def _mkt_tags(raw):
    if isinstance(raw, list):
        parts = [str(x) for x in raw]
    else:
        parts = str(raw or "").replace("#", " ").replace(",", " ").split()
    out = []
    for p in parts:
        p = p.strip()[:24]
        if p and p.lower() not in [x.lower() for x in out]:
            out.append(p)
        if len(out) >= 10:
            break
    return out


def _mkt_check(body: MarketItemRequest):
    title = (body.title or "").strip()[:80]
    if len(title) < 3:
        raise HTTPException(400, "Название — хотя бы 3 знака")
    desc = (body.description or "").strip()[:2000]
    cat = body.category if body.category in MARKET_CAT_IDS else "content"
    price = round(float(body.price or 0), 2)
    if price < 0 or price > MARKET_MAX_PRICE:
        raise HTTPException(400, f"Цена от 0 до {MARKET_MAX_PRICE:,} CUBE".replace(",", " "))
    cover = (body.cover or "").strip()
    if cover and len(cover) > MARKET_MAX_COVER:
        raise HTTPException(413, "Обложка слишком большая — уменьши картинку")
    delivery = (body.delivery or "").strip()[:4000]
    return {"title": title, "description": desc, "tags": " ".join(_mkt_tags(body.tags)),
            "category": cat, "price": price, "cover": cover or None, "delivery": delivery}


def _mkt_public(row, viewer_id=None, bought=False):
    mine = viewer_id is not None and int(row.get("seller_id") or 0) == int(viewer_id)
    open_ = bool(mine or bought)
    size, count = db.mkt_files_size(row["id"])
    out = {
        "id": row.get("id"),
        "title": row.get("title"),
        "description": row.get("description") or "",
        "tags": [t for t in str(row.get("tags") or "").split(" ") if t],
        "category": row.get("category"),
        "price": round(float(row.get("price") or 0), 2),
        "cover": row.get("cover"),
        "status": row.get("status"),
        "sales": int(row.get("sales") or 0),
        "seller_id": row.get("seller_id"),
        "seller": db.get_display_name(row.get("seller_id")),
        "created_at": db._utc_str(db._as_dt(row.get("created_at"))) if row.get("created_at") else None,
        "files_count": count,
        "files_size": size,
        "mine": mine,
        "bought": bool(bought),
    }
    if open_:
        # Содержимое — только продавцу и тому, кто купил.
        out["delivery"] = row.get("delivery") or ""
        out["files"] = [{"id": f["id"], "name": f["name"], "size": f["size"],
                         "mime": f["mime"]} for f in db.mkt_files(row["id"])]
    return out


@app.get("/market")
async def market_list(request: Request, cat: str = "", q: str = "",
                      mine: int = 0, bought: int = 0, limit: int = 60, offset: int = 0):
    viewer = _sig_viewer(request)
    vid = int(viewer["id"]) if viewer else None
    limit = min(100, max(1, limit))
    if mine and vid:
        # Свои товары продавец видит все, включая снятые с витрины: их можно
        # вернуть в продажу.
        rows = db.mkt_list(category=cat or None, query=q or None, seller_id=vid,
                           limit=limit, offset=offset, include_hidden=True)
    elif bought and vid:
        rows = db.mkt_list(category=cat or None, query=q or None, buyer_id=vid,
                           limit=limit, offset=offset)
    else:
        rows = db.mkt_list(category=cat or None, query=q or None,
                           limit=limit, offset=offset)
    ids = [r["id"] for r in rows]
    owned = db.mkt_bought_ids(vid, ids) if vid else set()
    return {"cats": MARKET_CATS,
            "items": [_mkt_public(r, vid, r["id"] in owned) for r in rows]}


@app.get("/market/{item_id}")
async def market_one(item_id: int, request: Request):
    row = db.mkt_get(item_id)
    if not row:
        raise HTTPException(404, "Товар не найден")
    viewer = _sig_viewer(request)
    vid = int(viewer["id"]) if viewer else None
    bought = bool(vid and db.mkt_bought(item_id, vid))
    if row.get("status") == "removed" and not bought and \
       not (vid and int(row.get("seller_id") or 0) == vid):
        raise HTTPException(404, "Товар снят с витрины")
    return _mkt_public(row, vid, bought)


@app.post("/market")
async def market_create(body: MarketItemRequest, user=Depends(get_current_user)):
    _лимит(user, "market")
    if db.mkt_active_count(user["id"]) >= db.MARKET_MAX_ACTIVE:
        raise HTTPException(409, f"Больше {db.MARKET_MAX_ACTIVE} товаров в продаже "
                                 f"одновременно держать нельзя")
    f = _mkt_check(body)
    iid = db.mkt_create(user["id"], body.cube_id, f["title"], f["description"],
                        f["tags"], f["category"], f["price"], f["cover"], f["delivery"])
    await _ref_touch(user["id"])
    return {"ok": True, "id": iid, "item": _mkt_public(db.mkt_get(iid), user["id"], False)}


@app.patch("/market/{item_id}")
async def market_edit(item_id: int, body: MarketItemRequest, user=Depends(get_current_user)):
    row = db.mkt_get(item_id)
    if not row:
        raise HTTPException(404, "Товар не найден")
    if int(row.get("seller_id") or 0) != int(user["id"]):
        raise HTTPException(403, "Это не твой товар")
    f = _mkt_check(body)
    if not f["cover"]:
        f.pop("cover")                      # пустую обложку не затираем
    db.mkt_update(item_id, user["id"], f)
    return {"ok": True, "item": _mkt_public(db.mkt_get(item_id), user["id"], False)}


class MarketStatusRequest(BaseModel):
    status: str = "active"


@app.post("/market/{item_id}/status")
async def market_status(item_id: int, body: MarketStatusRequest,
                        user=Depends(get_current_user)):
    st = body.status if body.status in ("active", "hidden", "removed") else "hidden"
    if st == "active" and db.mkt_active_count(user["id"]) >= db.MARKET_MAX_ACTIVE:
        raise HTTPException(409, "Слишком много товаров в продаже")
    if not db.mkt_update(item_id, user["id"], {"status": st}):
        raise HTTPException(403, "Это не твой товар")
    return {"ok": True, "status": st}


@app.delete("/market/{item_id}")
async def market_delete(item_id: int, user=Depends(get_current_user)):
    """Удаляем совсем, если товар ещё никому не достался. Если достался —
    только снимаем с витрины: отнимать у купившего то, что он уже получил,
    нельзя, и файлы для него должны остаться на месте."""
    row = db.mkt_get(item_id)
    if not row or int(row.get("seller_id") or 0) != int(user["id"]):
        raise HTTPException(403, "Это не твой товар")
    if db.mkt_orders_count(item_id) == 0:
        if not db.mkt_delete(item_id, user["id"]):
            raise HTTPException(400, "Не получилось удалить")
        return {"ok": True, "deleted": True}
    db.mkt_remove(item_id, user["id"])
    return {"ok": True, "deleted": False,
            "reason": "Товар уже кому-то достался — насовсем удалить нельзя. "
                      "Снял с витрины: новых покупок не будет, а у получивших "
                      "он останется."}


# ── Файлы товара ──────────────────────────────────────────────────────────────

@app.post("/market/{item_id}/files")
async def market_add_file(item_id: int, file: UploadFile = File(...),
                          user=Depends(get_current_user)):
    row = db.mkt_get(item_id)
    if not row:
        raise HTTPException(404, "Товар не найден")
    if int(row.get("seller_id") or 0) != int(user["id"]):
        raise HTTPException(403, "Это не твой товар")

    size, count = db.mkt_files_size(item_id)
    if count >= db.MARKET_MAX_FILES:
        raise HTTPException(409, f"Больше {db.MARKET_MAX_FILES} файлов к одному "
                                 f"товару приложить нельзя")

    chunks, total = [], 0
    limit = min(db.MARKET_MAX_FILE, db.MARKET_MAX_TOTAL - size)
    while True:
        chunk = await file.read(1024 * 1024)
        if not chunk:
            break
        total += len(chunk)
        if total > limit:
            raise HTTPException(413, f"Не влезает: на товар всего "
                                     f"{db.MARKET_MAX_TOTAL // 1024 // 1024} МБ, "
                                     f"занято {size // 1024 // 1024} МБ")
        chunks.append(chunk)
    data = b"".join(chunks)
    if not data:
        raise HTTPException(400, "Пустой файл")

    name = (file.filename or "file")[:200]
    mime = (file.content_type or "application/octet-stream")[:120]
    db.mkt_add_file(item_id, name, mime, data)
    return {"ok": True, "files": [{"id": f["id"], "name": f["name"], "size": f["size"],
                                   "mime": f["mime"]} for f in db.mkt_files(item_id)]}


@app.delete("/market/{item_id}/files/{file_id}")
async def market_del_file(item_id: int, file_id: int, user=Depends(get_current_user)):
    if not db.mkt_del_file(item_id, file_id, user["id"]):
        raise HTTPException(403, "Это не твой товар")
    return {"ok": True}


@app.get("/market/{item_id}/files/{file_id}")
async def market_download(item_id: int, file_id: int, user=Depends(get_current_user)):
    row = db.mkt_get(item_id)
    if not row:
        raise HTTPException(404, "Товар не найден")
    mine = int(row.get("seller_id") or 0) == int(user["id"])
    if not mine and not db.mkt_bought(item_id, user["id"]):
        raise HTTPException(403, "Сначала нужно получить товар")
    f = db.mkt_file(item_id, file_id)
    if not f:
        raise HTTPException(404, "Файл не найден")
    # Заголовки ходят в latin-1, а имя файла бывает русским. Отдаём два имени:
    # простое для старых клиентов и полное по RFC 5987.
    from urllib.parse import quote
    name = str(f["name"] or "file")
    plain = "".join(ch for ch in name if 32 <= ord(ch) < 127 and ch not in '"\\')[:120]
    if not plain:
        ext = ("." + name.rsplit(".", 1)[-1]) if "." in name else ""
        plain = "file" + "".join(ch for ch in ext if ch.isascii() and ch.isalnum() or ch == ".")
    disp = 'attachment; filename="%s"; filename*=UTF-8\'\'%s' % (plain, quote(name))
    return Response(content=f["data"], media_type=f.get("mime") or "application/octet-stream",
                    headers={"Content-Disposition": disp})


# ── Покупка ───────────────────────────────────────────────────────────────────

@app.post("/market/{item_id}/buy")
async def market_buy(item_id: int, user=Depends(get_current_user)):
    res = db.mkt_buy(item_id, user["id"])
    if res.get("error") == "not enough":
        raise HTTPException(402, f"Не хватает CUBE: нужно {res.get('price', 0):.0f}, "
                                 f"на балансе {res.get('balance', 0):.0f}")
    if res.get("error"):
        raise HTTPException(400, res["error"])
    row = db.mkt_get(item_id)
    if res.get("paid"):
        try:
            await _notify_user(int(row.get("seller_id") or 0), {
                "type": "market_sale",
                "title": row.get("title"),
                "amount": res.get("paid"),
                "balance": db.get_cube_balance(int(row.get("seller_id") or 0)),
            })
        except Exception:
            pass
    return {"ok": True, "already": bool(res.get("already")),
            "paid": res.get("paid", 0), "balance": res.get("balance"),
            "item": _mkt_public(row, user["id"], True)}


@app.get("/market/me/stats")
async def market_my_stats(user=Depends(get_current_user)):
    total, count = db.mkt_sales_sum(user["id"])
    return {"sold_count": count, "sold_sum": total,
            "items": db.mkt_active_count(user["id"]),
            "max_items": db.MARKET_MAX_ACTIVE,
            "max_files": db.MARKET_MAX_FILES,
            "max_file_mb": db.MARKET_MAX_FILE // 1024 // 1024,
            "max_total_mb": db.MARKET_MAX_TOTAL // 1024 // 1024}


# ══════════════════════════════════════════════════════════════════════════════
#  НАЧИСЛЕНИЕ НАГРАД: РАЗ В СУТКИ
#
#  Фонд месяца делится на дни. Раз в час сервер смотрит, не остался ли
#  незакрытый прошедший день, и закрывает его: складывает очки всех
#  подписчиков за этот день и раздаёт каждому его долю.
#
#  Никаких мгновенных начислений за действия больше нет — только это.
# ══════════════════════════════════════════════════════════════════════════════

RWD_TICK = int(os.getenv("RWD_TICK_SEC", "3600"))


async def _rwd_worker():
    await asyncio.sleep(20)
    while True:
        try:
            for day in db.reward_days_due(14):
                try:
                    db.reward_settle_day(day)
                except Exception:
                    pass
                await asyncio.sleep(0.2)
        except Exception:
            pass
        try:
            # Посты и комментарии, перешагнувшие порог просмотров.
            # Считается отдельно от дня: просмотры копятся неделями.
            итог = db.reward_views_settle()
            if итог.get("rows"):
                print(f"[rewards] за просмотры выдано {итог['paid_cube']} CUBE "
                      f"({итог['rows']} шт.)")
        except Exception:
            pass
        await asyncio.sleep(RWD_TICK)


async def _backup_worker():
    """Копии базы по расписанию.

    Раньше копий не было вовсе: база — один файл на диске, и диск это не
    копия. Потеря диска, удаление сервиса или случайный /admin/reset означали
    потерю всего без возможности вернуть."""
    import backup as bk
    if not bk.enabled():
        return
    await asyncio.sleep(60)          # дать серверу подняться
    while True:
        try:
            итог = bk.run_once()
            if итог.get("ok"):
                print(f"[backup] копия {итог['file']} "
                      f"({итог['bytes']//1024} КБ, людей {итог['check']['users']})"
                      + (", отправлена в хранилище" if итог.get("uploaded") else ""))
            elif итог.get("error"):
                print(f"[backup] ОШИБКА: {итог['error']}")
        except Exception as e:
            print(f"[backup] сорвалось: {str(e)[:200]}")
        await asyncio.sleep(bk.BACKUP_EVERY)


async def _chunk_cleanup_worker():
    """Подчищать брошенные куски загрузок, чтобы они не копили диск."""
    await asyncio.sleep(300)
    while True:
        try:
            n = st.chunk_cleanup(24)
            if n:
                print(f"[uploads] убрано брошенных загрузок: {n}")
        except Exception:
            pass
        await asyncio.sleep(6 * 3600)


@app.on_event("startup")
async def _storage_startup():
    try:
        # Забираем файлы из прежней папки загрузок, если они там остались.
        спас = st.rescue_legacy_uploads()
        if спас.get("files"):
            print(f"[storage] перенесено из старой папки: {спас['files']} файлов, "
                  f"{спас['bytes']//1024//1024} МБ")
    except Exception:
        pass
    try:
        asyncio.create_task(_backup_worker())
        asyncio.create_task(_chunk_cleanup_worker())
    except Exception:
        pass
    try:
        с = st.status()
        print(f"[storage] хранилище: {с['provider']}"
              + ("" if с['bunny_stream'] else ", видео ленты НЕ настроено"))
    except Exception:
        pass
    try:
        # Разово выбрасываем тела файлов, лежащие прямо в базе.
        итог = db.clear_message_blobs()
        if итог.get("rows"):
            print(f"[storage] из базы убраны вложения: {итог['rows']} шт., "
                  f"{итог['freed_bytes']//1024//1024} МБ")
    except Exception:
        pass


class BackupRequest(BaseModel):
    secret: str = ""


@app.post("/admin/backup")
async def admin_backup(body: BackupRequest):
    """Снять копию прямо сейчас."""
    _check_admin(body.secret)
    import backup as bk
    return bk.run_once()


@app.post("/admin/backups")
async def admin_backups(body: BackupRequest):
    """Что лежит в копиях."""
    _check_admin(body.secret)
    import backup as bk
    return {"dir": bk.BACKUP_DIR, "keep": bk.KEEP,
            "every_hours": bk.BACKUP_EVERY // 3600,
            "backups": bk.list_backups()}


@app.on_event("startup")
async def _rwd_startup():
    try:
        # Снимаем приветственные 100 CUBE у тех, кто завёл ключ до их отмены.
        снято = db.welcome_bonus_migrate()
        if снято:
            print(f"[rewards] убран приветственный бонус у {снято} уч.")
    except Exception:
        pass
    try:
        asyncio.create_task(_rwd_worker())
    except Exception:
        pass


@app.get("/rewards/today")
async def rewards_today(user=Depends(get_current_user)):
    """Что набрано за сегодня и на что это пока тянет.

    Это прикидка, а не обещание: доля меняется, пока день не закончился,
    потому что зависит от того, сколько наработают остальные.
    """
    день = db.reward_day_mine(user["id"])
    день["is_premium"] = db.is_premium(user["id"])
    день["min_minutes"] = db.ACTIVE_DAY_MIN_MINUTES
    день["rates"] = db.reward_rates()
    день["cube_usd"] = db.CUBE_USD
    if not день["is_premium"]:
        день["reason"] = "Доля в фонде открывается подпиской"
    elif день["pool_day"] <= 0:
        день["reason"] = "Фонд этого месяца ещё не сформирован"
    return день


@app.get("/rewards/days")
async def rewards_days(user=Depends(get_current_user), limit: int = 14):
    """Что уже начислено по дням — настоящие записи из истории баланса."""
    rows = db.reward_days_history(user["id"], min(60, max(1, limit)))
    return {"days": [{
        "amount": round(float(r.get("amount") or 0), 4),
        "text": r.get("description") or "",
        "at": db._utc_str(db._as_dt(r.get("created_at"))) if r.get("created_at") else None,
    } for r in rows]}


class RewardSettleRequest(BaseModel):
    secret: str = ""
    day: str = ""


@app.post("/admin/rewards/settle")
async def rewards_settle(body: RewardSettleRequest):
    """Закрыть день руками. Нужно для проверок и на случай простоя сервера."""
    _check_admin(body.secret)
    if body.day:
        return db.reward_settle_day(body.day)
    out = [db.reward_settle_day(d) for d in db.reward_days_due(14)]
    return {"settled": out, "views": db.reward_views_settle()}


@app.post("/admin/rewards/views")
async def rewards_views_settle(body: RewardSettleRequest):
    """Выплата за просмотры отдельно — для проверок."""
    _check_admin(body.secret)
    return db.reward_views_settle()


# ══════════════════════════════════════════════════════════════════════════
#  СВАЙП: КРИПТА ↔ CUBE
#  ---------------------------------------------------------------------
#  Площадка сама денег не держит и адресов не выдаёт. Адрес на каждую
#  заявку даёт платёжный провайдер, он же сообщает вебхуком, что перевод
#  дошёл — только после этого CUBE попадает на счёт.
#
#  Ключи провайдера живут в переменных окружения и в коде их нет:
#     SWAP_PROVIDER        — пока понимает "nowpayments"
#     NOWPAYMENTS_API_KEY  — ключ
#     NOWPAYMENTS_IPN_KEY  — отдельный ключ для подписи вебхука
#  Пока ключей нет, заявка создаётся и честно говорит: приём не подключён.
#  Ничего не «как будто зачислено» — иначе человек решит, что заплатил.
# ══════════════════════════════════════════════════════════════════════════

SWAP_PROVIDER = os.getenv("SWAP_PROVIDER", "nowpayments").strip().lower()
_NP_KEY = os.getenv("NOWPAYMENTS_API_KEY", "").strip()
_NP_IPN = os.getenv("NOWPAYMENTS_IPN_KEY", "").strip()
_NP_URL = "https://api.nowpayments.io/v1"
_NP_SANDBOX = os.getenv("NOWPAYMENTS_SANDBOX", "").strip() == "1"
if _NP_SANDBOX:
    _NP_URL = "https://api-sandbox.nowpayments.io/v1"


def swap_provider_ready() -> bool:
    return bool(_NP_KEY) and SWAP_PROVIDER == "nowpayments"


def _np_currency(coin: str, net: str) -> str:
    """Провайдер зовёт монету вместе с сетью: usdttrc20, usdcsol и так далее."""
    coin = str(coin).lower(); net = str(net).upper()
    карта = {
        ("usdt", "TRON"): "usdttrc20", ("usdt", "ETH"): "usdterc20",
        ("usdt", "BSC"): "usdtbsc",    ("usdt", "SOL"): "usdtsol",
        ("usdt", "POLYGON"): "usdtmatic", ("usdt", "ARBITRUM"): "usdtarb",
        ("usdc", "ETH"): "usdc",       ("usdc", "SOL"): "usdcsol",
        ("usdc", "POLYGON"): "usdcmatic", ("usdc", "ARBITRUM"): "usdcarb",
        ("usdc", "BASE"): "usdcbase",
        ("eth", "ARBITRUM"): "etharb", ("eth", "OPTIMISM"): "ethop",
        ("eth", "BASE"): "ethbase",    ("eth", "ETH"): "eth",
        ("pol", "POLYGON"): "matic",   ("bnb", "BSC"): "bnbbsc",
        ("avax", "AVAXC"): "avaxc",
    }
    return карта.get((coin, net), coin)


async def _np_invoice(swap_id: int, coin: str, net: str, amount: float):
    """Попросить у провайдера адрес под эту заявку."""
    if not swap_provider_ready():
        return None
    тело = {
        "price_amount": round(float(amount), 8),
        "price_currency": _np_currency(coin, net),
        "pay_currency": _np_currency(coin, net),
        "order_id": f"cw-swap-{swap_id}",
        "order_description": f"CubeWorld свайп #{swap_id}",
    }
    url = os.getenv("PUBLIC_BASE_URL", "").strip()
    if url:
        тело["ipn_callback_url"] = url.rstrip("/") + "/swap/webhook/nowpayments"
    try:
        async with httpx.AsyncClient(timeout=20) as client:
            r = await client.post(_NP_URL + "/payment", json=тело,
                                  headers={"x-api-key": _NP_KEY,
                                           "Content-Type": "application/json"})
            if r.status_code >= 400:
                return {"error": f"провайдер ответил {r.status_code}"}
            j = r.json()
        return {"provider_id": str(j.get("payment_id") or ""),
                "address": j.get("pay_address"),
                "memo": j.get("payin_extra_id"),
                "amount": float(j.get("pay_amount") or amount)}
    except Exception as e:
        return {"error": "провайдер недоступен"}


def _np_signature_ok(raw: bytes, подпись: str) -> bool:
    """Вебхук без проверки подписи — это открытая касса: любой желающий
    прислал бы «оплачено» и получил CUBE бесплатно."""
    if not _NP_IPN or not подпись:
        return False
    try:
        данные = _json.loads(raw.decode("utf-8"))
        ровно = _json.dumps(данные, separators=(",", ":"), sort_keys=True)
        свой = hmac.new(_NP_IPN.encode(), ровно.encode(), hashlib.sha512).hexdigest()
        return hmac.compare_digest(свой, подпись.strip())
    except Exception:
        return False


def _swap_price(sym: str):
    """Цена монеты в долларах из того же справочника, что и бегущая строка."""
    инфо = db.swap_coin(sym)
    if not инфо: return None
    цена = (_prices_cache or {}).get(инфо["price_id"], {}).get("usd")
    try:
        return float(цена) if цена else None
    except Exception:
        return None


class SwapQuoteRequest(BaseModel):
    direction: str = "in"
    coin: str = "USDT"
    net: str = "TRON"
    amount_crypto: Optional[float] = None
    cube_amount: Optional[float] = None


class SwapStartRequest(SwapQuoteRequest):
    payout_address: Optional[str] = None


@app.get("/swap/catalogue")
async def swap_catalogue():
    к = db.swap_catalogue()
    к["provider_ready"] = swap_provider_ready()
    к["provider"] = SWAP_PROVIDER if swap_provider_ready() else None
    return к


@app.post("/swap/quote")
async def swap_quote(body: SwapQuoteRequest, user=Depends(get_current_user)):
    направление = "out" if str(body.direction) == "out" else "in"
    if not db.swap_net_ok(body.coin, body.net):
        raise HTTPException(400, "Эта монета в такой сети не ходит")
    if not _prices_cache:
        await get_prices()
    цена = _swap_price(body.coin)
    if not цена:
        raise HTTPException(503, "Курс сейчас недоступен — попробуй через минуту")
    q = db.swap_quote(направление, цена,
                      amount_crypto=body.amount_crypto, cube_amount=body.cube_amount)
    if not q:
        raise HTTPException(400, "Не разобрал сумму")
    q["coin"] = str(body.coin).upper(); q["net"] = str(body.net).upper()
    q["min_usd"] = db.SWAP_MIN_USD
    q["day_used_usd"] = db.swap_day_usd(user["id"], направление)
    q["day_left_usd"] = max(0.0, db.SWAP_MAX_USD_DAY - q["day_used_usd"])
    q["provider_ready"] = swap_provider_ready()
    return q


@app.post("/swap/start")
async def swap_start(body: SwapStartRequest, user=Depends(get_current_user)):
    направление = "out" if str(body.direction) == "out" else "in"
    if not db.swap_net_ok(body.coin, body.net):
        raise HTTPException(400, "Эта монета в такой сети не ходит")
    if not _prices_cache:
        await get_prices()
    цена = _swap_price(body.coin)
    if not цена:
        raise HTTPException(503, "Курс сейчас недоступен — попробуй через минуту")
    q = db.swap_quote(направление, цена,
                      amount_crypto=body.amount_crypto, cube_amount=body.cube_amount)
    if not q:
        raise HTTPException(400, "Не разобрал сумму")
    if q["usd_value"] < db.SWAP_MIN_USD:
        raise HTTPException(400, f"Меньше ${db.SWAP_MIN_USD:.0f} не меняем")
    уже = db.swap_day_usd(user["id"], направление)
    if уже + q["usd_value"] > db.SWAP_MAX_USD_DAY:
        raise HTTPException(429, f"На сегодня по этой стороне осталось "
                                 f"${max(0.0, db.SWAP_MAX_USD_DAY - уже):.2f}")

    if направление == "out":
        адрес = (body.payout_address or "").strip()
        if len(адрес) < 12:
            raise HTTPException(400, "Нужен адрес кошелька, куда отправить")
        if float(db.get_cube_balance(user["id"]) or 0) < q["cube_amount"]:
            raise HTTPException(400, "На счету меньше, чем в заявке")
        # Наружу уходит только выручка. Наградные CUBE площадка начислила
        # сама — обменивать их на настоящие деньги значит печатать себе долг.
        своё = db.revenue_balance(user["id"])
        if своё < q["cube_amount"]:
            raise HTTPException(400,
                f"Вывести можно только заработанное: доступно {своё:.2f} CUBE. "
                f"Наградные CUBE тратятся внутри площадки.")
        _лимит(user, "swap_out")
        sid = db.swap_create(user["id"], "out", body.coin, body.net, q,
                             provider=SWAP_PROVIDER, payout_address=адрес,
                             status="queued")
        if not db.swap_hold(user["id"], q["cube_amount"]):
            db.swap_set(sid, status="failed", note="не удалось удержать CUBE")
            raise HTTPException(400, "Не удалось удержать CUBE")
        з = db.swap_get(sid)
        з["message"] = ("Заявка принята. CUBE удержаны. Выплата уходит после "
                        "проверки — следи за состоянием заявки.")
        return {"ok": True, "swap": з}

    # ── ввод ──
    _лимит(user, "swap_in")
    sid = db.swap_create(user["id"], "in", body.coin, body.net, q,
                         provider=SWAP_PROVIDER if swap_provider_ready() else None,
                         status="new")
    if not swap_provider_ready():
        db.swap_set(sid, status="awaiting_setup",
                    note="приём платежей ещё не подключён")
        з = db.swap_get(sid)
        з["message"] = ("Приём платежей ещё не подключён, поэтому адреса для "
                        "перевода нет. Заявка сохранена — ничего не отправляй.")
        return {"ok": False, "reason": "provider_not_ready", "swap": з}

    счёт = await _np_invoice(sid, body.coin, body.net, q["amount_crypto"])
    if not счёт or счёт.get("error"):
        db.swap_set(sid, status="failed", note=(счёт or {}).get("error", "нет ответа"))
        raise HTTPException(503, "Провайдер не выдал адрес. Попробуй позже.")
    db.swap_set(sid, status="awaiting_payment", provider_id=счёт["provider_id"],
                pay_address=счёт["address"], pay_memo=счёт.get("memo"),
                amount_crypto=счёт.get("amount") or q["amount_crypto"])
    з = db.swap_get(sid)
    з["message"] = "Переведи ровно указанную сумму на этот адрес и в этой сети."
    return {"ok": True, "swap": з}


@app.get("/swap/my")
async def swap_my(user=Depends(get_current_user), limit: int = 40):
    return {"ok": True, "swaps": db.swap_list(user["id"], min(100, max(1, limit)))}


@app.post("/swap/{sid}/cancel")
async def swap_cancel(sid: int, user=Depends(get_current_user)):
    з = db.swap_get(sid)
    if not з or int(з["user_id"]) != int(user["id"]):
        raise HTTPException(404, "Заявка не найдена")
    if str(з["status"]) in ("done", "refunded", "cancelled"):
        raise HTTPException(400, "Эту заявку уже не отменить")
    if str(з["direction"]) == "out":
        db.swap_release(sid, "отменена самим человеком")
    else:
        db.swap_set(sid, status="cancelled")
    return {"ok": True, "swap": db.swap_get(sid)}


@app.post("/swap/webhook/{provider}")
async def swap_webhook(provider: str, request: Request):
    """Провайдер говорит, что перевод дошёл. Здесь и только здесь
    зачисляется CUBE — и только если подпись сошлась."""
    raw = await request.body()
    if provider != "nowpayments":
        raise HTTPException(404, "Неизвестный провайдер")
    подпись = request.headers.get("x-nowpayments-sig", "")
    if not _np_signature_ok(raw, подпись):
        raise HTTPException(401, "Подпись не сошлась")
    try:
        данные = _json.loads(raw.decode("utf-8"))
    except Exception:
        raise HTTPException(400, "Не разобрал тело")
    состояние = str(данные.get("payment_status") or "").lower()
    pid = str(данные.get("payment_id") or "")
    з = db.swap_by_provider("nowpayments", pid)
    if not з:
        заказ = str(данные.get("order_id") or "")
        if заказ.startswith("cw-swap-"):
            з = db.swap_get(заказ.replace("cw-swap-", "") or 0)
    if not з:
        return {"ok": True, "skipped": "заявка не найдена"}
    if состояние in ("finished", "confirmed"):
        r = db.swap_credit(з["id"], tx_hash=str(данные.get("outcome_hash") or "") or None)
        return {"ok": bool(r.get("ok")), "credited": r.get("cube", 0)}
    if состояние in ("failed", "expired", "refunded"):
        db.swap_set(з["id"], status="failed", note="провайдер: " + состояние)
    elif состояние in ("confirming", "sending", "partially_paid"):
        db.swap_set(з["id"], status="paid", note="провайдер: " + состояние)
    return {"ok": True, "status": состояние}


@app.get("/admin/treasury")
async def admin_treasury(request: Request):
    """Касса — только по админскому паролю. Сколько должны людям и сколько
    свободно. Пароль живёт в ADMIN_SECRET и в коде его нет."""
    _check_admin(request.headers.get("X-Admin-Secret", ""))
    к = db.treasury_state()
    к["provider_ready"] = swap_provider_ready()
    return {"ok": True, "treasury": к}


# ── Очередь выплат: смотреть и закрывать ──────────────────────────────────
#  Заявка на вывод сама себя не закроет: деньги отправляет человек через
#  кабинет провайдера, а площадка должна об этом узнать. Без этих двух
#  ручек очередь копилась бы, а CUBE висели удержанными навсегда.

@app.get("/admin/payouts")
async def admin_payouts(request: Request, status: str = "queued", limit: int = 100):
    _check_admin(request.headers.get("X-Admin-Secret", ""))
    return {"ok": True, "payouts": db.swap_payout_queue(status, min(300, max(1, limit))),
            "treasury": db.treasury_state()}


class PayoutDoneRequest(BaseModel):
    secret: str = ""
    tx_hash: str = ""


@app.post("/admin/payouts/{sid}/sent")
async def admin_payout_sent(sid: int, body: PayoutDoneRequest):
    """Деньги ушли. CUBE уже удержаны при создании заявки, так что здесь
    только закрываем её и запоминаем номер перевода."""
    _check_admin(body.secret)
    з = db.swap_get(sid)
    if not з or str(з.get("direction")) != "out":
        raise HTTPException(404, "Заявка на вывод не найдена")
    if str(з.get("status")) in ("done", "refunded"):
        raise HTTPException(400, "Эта заявка уже закрыта")
    db.swap_set(sid, status="done", tx_hash=(body.tx_hash or "").strip() or None,
                settled_at=datetime.utcnow().isoformat(sep=' ', timespec='seconds'))
    return {"ok": True, "swap": db.swap_get(sid)}


@app.post("/admin/payouts/{sid}/refund")
async def admin_payout_refund(sid: int, body: PayoutDoneRequest):
    """Выплата не состоялась — вернуть CUBE человеку."""
    _check_admin(body.secret)
    з = db.swap_get(sid)
    if not з or str(з.get("direction")) != "out":
        raise HTTPException(404, "Заявка на вывод не найдена")
    if not db.swap_release(sid, (body.tx_hash or "").strip() or "выплата не состоялась"):
        raise HTTPException(400, "Эту заявку уже не вернуть")
    return {"ok": True, "swap": db.swap_get(sid)}


# ── Форма объекта на карте ────────────────────────────────────────────────
class CubeShapeRequest(BaseModel):
    shape: str = "cube"
    image_url: Optional[str] = None


@app.get("/shapes")
async def list_shapes():
    """Что вообще можно выбрать. Список один на всех, чтобы страница не
    выдумывала свои формы, которых сервер не знает."""
    return {"ok": True, "shapes": db.ФОРМЫ}


@app.post("/cubes/{cube_id}/shape")
async def set_cube_shape(cube_id: int, body: CubeShapeRequest,
                         user=Depends(get_current_user)):
    r = db.set_cube_shape(cube_id, user["id"], body.shape, body.image_url)
    if not r:
        raise HTTPException(400, "Не получилось сменить форму. "
                                 "Либо куб не твой, либо форма неизвестна, "
                                 "либо для картинки не пришла ссылка.")
    return {"ok": True, "shape": r}


# ══════════════════════════════════════════════════════════════════════════
#  СТРИМЫ
#  ---------------------------------------------------------------------
#  Сервер ведёт учёт: кто в эфире, сколько смотрят, что пишут, какие
#  подарки прислали. Само видео идёт между браузерами напрямую (WebRTC), а
#  сервер только сводит их: переписываться предложениями и адресами они
#  могут по тому же сокету, который уже есть.
#
#  Подарок — это перевод CUBE от зрителя ведущему. Переводом занимается
#  та же функция, что и чаевыми: она везёт с собой смесь наградных и
#  выручки, иначе наградные можно было бы превратить в выручку, прогнав
#  через подарок самому себе со второй учётки.
# ══════════════════════════════════════════════════════════════════════════

# Тридцать ячеек, от розы до легенды. Цена — в CUBE.
ПОДАРКИ = [
    {"key": "rose",     "знак": "🌹", "имя": "Роза",          "цена": 1},
    {"key": "heart",    "знак": "❤️", "имя": "Сердце",         "цена": 1},
    {"key": "thumb",    "знак": "👍", "имя": "Палец вверх",    "цена": 1},
    {"key": "star",     "знак": "⭐", "имя": "Звезда",         "цена": 2},
    {"key": "cupcake",  "знак": "🧁", "имя": "Кекс",           "цена": 3},
    {"key": "coffee",   "знак": "☕", "имя": "Кофе",           "цена": 3},
    {"key": "icecream", "знак": "🍦", "имя": "Мороженое",      "цена": 4},
    {"key": "pizza",    "знак": "🍕", "имя": "Пицца",          "цена": 5},
    {"key": "balloon",  "знак": "🎈", "имя": "Шарик",          "цена": 5},
    {"key": "butterfly","знак": "🦋", "имя": "Бабочка",        "цена": 6},
    {"key": "rainbow",  "знак": "🌈", "имя": "Радуга",         "цена": 8},
    {"key": "firework", "знак": "🎆", "имя": "Фейерверк",      "цена": 10},
    {"key": "guitar",   "знак": "🎸", "имя": "Гитара",         "цена": 10},
    {"key": "mic",      "знак": "🎤", "имя": "Микрофон",       "цена": 12},
    {"key": "crown",    "знак": "👑", "имя": "Корона",         "цена": 15},
    {"key": "diamond",  "знак": "💎", "имя": "Бриллиант",      "цена": 20},
    {"key": "rocket",   "знак": "🚀", "имя": "Ракета",         "цена": 25},
    {"key": "bolt",     "знак": "⚡", "имя": "Молния",         "цена": 25},
    {"key": "fire",     "знак": "🔥", "имя": "Огонь",          "цена": 30},
    {"key": "trophy",   "знак": "🏆", "имя": "Трофей",         "цена": 40},
    {"key": "cake",     "знак": "🎂", "имя": "Торт",           "цена": 50},
    {"key": "champ",    "знак": "🍾", "имя": "Шампанское",     "цена": 60},
    {"key": "car",      "знак": "🏎", "имя": "Спорткар",       "цена": 80},
    {"key": "yacht",    "знак": "🛥", "имя": "Яхта",           "цена": 100},
    {"key": "heli",     "знак": "🚁", "имя": "Вертолёт",       "цена": 150},
    {"key": "plane",    "знак": "✈️", "имя": "Самолёт",        "цена": 200},
    {"key": "castle",   "знак": "🏰", "имя": "Замок",          "цена": 300},
    {"key": "island",   "знак": "🏝", "имя": "Остров",         "цена": 500},
    {"key": "space",    "знак": "🌌", "имя": "Космос",         "цена": 750},
    {"key": "legend",   "знак": "🧊", "имя": "Куб-легенда",    "цена": 1000},
]
ПОДАРКИ_ПО_КЛЮЧУ = {п["key"]: п for п in ПОДАРКИ}


class StreamStartRequest(BaseModel):
    title: Optional[str] = ""
    mode: Optional[str] = "куб"          # куб | камера | чистый
    cube_id: Optional[int] = None

class StreamSayRequest(BaseModel):
    content: str = ""

class StreamGiftRequest(BaseModel):
    gift: str = ""


@app.get("/gifts")
async def gifts_catalogue():
    """Каталог подарков. Один на всех: цены назначает сервер, а не окно."""
    return {"ok": True, "gifts": ПОДАРКИ}


@app.post("/streams")
async def stream_start_ep(body: StreamStartRequest, user=Depends(get_current_user)):
    _нужен_платный(user, "эфиры", "Эфиры")
    _лимит(user, "post")
    название = (body.title or "").strip()[:120]
    if название:
        _модерация(user, название, "имя")
    режим = body.mode if body.mode in ("куб", "камера", "чистый") else "куб"
    имя = db.get_display_name(user["id"])
    sid = db.stream_start(user["id"], имя, название, режим, body.cube_id)
    if not sid:
        raise HTTPException(500, "Не получилось начать эфир")
    return {"ok": True, "id": sid, "mode": режим, "title": название, "display_name": имя}


@app.post("/streams/{sid}/stop")
async def stream_stop_ep(sid: int, user=Depends(get_current_user)):
    db.stream_stop(sid, user["id"])
    с = db.stream_get(sid)
    return {"ok": True, "stream": с}


@app.post("/streams/{sid}/beat")
async def stream_beat_ep(sid: int, user=Depends(get_current_user)):
    """Ведущий говорит «я здесь». Молчит полторы минуты — эфир закрываем:
       иначе список живых эфиров зарастёт теми, у кого просто упал браузер."""
    с = db.stream_get(sid)
    if not с or int(с["user_id"]) != int(user["id"]):
        raise HTTPException(403, "Это не твой эфир")
    db.stream_beat(sid)
    return {"ok": True, "viewers": с.get("viewers", 0), "likes": с.get("likes", 0)}


@app.post("/streams/{sid}/watch")
async def stream_watch_ep(sid: int, user=Depends(get_current_user)):
    с = db.stream_get(sid)
    if not с:
        raise HTTPException(404, "Эфир не найден")
    if с["status"] != "идёт":
        return {"ok": True, "status": с["status"], "viewers": 0}
    сколько = db.stream_watch(sid, user["id"], db.get_display_name(user["id"]))
    return {"ok": True, "status": "идёт", "viewers": сколько,
            "likes": с.get("likes", 0), "host_id": с["user_id"]}


@app.post("/streams/{sid}/leave")
async def stream_leave_ep(sid: int, user=Depends(get_current_user)):
    db.stream_unwatch(sid, user["id"])
    return {"ok": True}


@app.get("/streams")
async def streams_live(limit: int = 40, q: str = ""):
    """Идущие сейчас эфиры — для ленты и для поиска."""
    return {"ok": True, "streams": db.stream_live(limit, (q or "").strip() or None)}


@app.get("/streams/{sid}")
async def stream_one(sid: int):
    с = db.stream_get(sid)
    if not с:
        raise HTTPException(404, "Эфир не найден")
    return {"ok": True, "stream": с}


@app.post("/streams/{sid}/like")
async def stream_like_ep(sid: int, user=Depends(get_current_user)):
    _лимит(user, "like")
    return {"ok": True, "likes": db.stream_like(sid, 1)}


@app.post("/streams/{sid}/say")
async def stream_say_ep(sid: int, body: StreamSayRequest, user=Depends(get_current_user)):
    _лимит(user, "comment")
    текст = (body.content or "").strip()[:400]
    if not текст:
        raise HTTPException(400, "Пустой комментарий")
    с = db.stream_get(sid)
    if not с or с["status"] != "идёт":
        raise HTTPException(404, "Эфир уже не идёт")
    _модерация(user, текст, "комментарий", ref="stream:%s" % sid)
    cid = db.stream_say(sid, user["id"], db.get_display_name(user["id"]), текст)
    return {"ok": True, "id": cid}


class StreamReactRequest(BaseModel):
    emoji: str = ""


# Набор реакций один на всех: страница не должна придумывать свои.
РЕАКЦИИ = ["❤️", "🔥", "👏", "😂", "😮", "🎉", "💯", "🙌"]


@app.get("/reactions")
async def reactions_list():
    return {"ok": True, "reactions": РЕАКЦИИ}


@app.post("/streams/{sid}/react")
async def stream_react_ep(sid: int, body: StreamReactRequest, user=Depends(get_current_user)):
    """Реакция в эфире — та же мелочь, что лайк, и считается по лайковому
    пределу: комментарии она не съедает, но и сыпать ими без края нельзя."""
    з = (body.emoji or "").strip()[:8]
    if з not in РЕАКЦИИ:
        raise HTTPException(400, "Неизвестная реакция")
    с = db.stream_get(sid)
    if not с or с["status"] != "идёт":
        raise HTTPException(404, "Эфир уже не идёт")
    _лимит(user, "like")
    cid = db.stream_say(sid, user["id"], db.get_display_name(user["id"]), з, kind="реакция")
    return {"ok": True, "id": cid, "emoji": з}


@app.get("/streams/{sid}/chat")
async def stream_chat_ep(sid: int, after: int = 0, limit: int = 60):
    return {"ok": True, "items": db.stream_chat(sid, after, limit)}


@app.post("/streams/{sid}/gift")
async def stream_gift_ep(sid: int, body: StreamGiftRequest, user=Depends(get_current_user)):
    """Подарок: CUBE уходят от зрителя ведущему, целиком.

    Доли площадки здесь нет нарочно — если она понадобится, это одна
    строка, но пока лучше, чтобы автор получал ровно то, что видит
    зритель на ценнике."""
    п = ПОДАРКИ_ПО_КЛЮЧУ.get((body.gift or "").strip())
    if not п:
        raise HTTPException(400, "Неизвестный подарок")
    с = db.stream_get(sid)
    if not с or с["status"] != "идёт":
        raise HTTPException(404, "Эфир уже не идёт")
    if int(с["user_id"]) == int(user["id"]):
        raise HTTPException(400, "Себе подарки дарить незачем")

    r = db.transfer_cube(user["id"], int(с["user_id"]), п["цена"],
                         "Подарок «%s» в эфире #%s" % (п["имя"], sid))
    if not r.get("ok"):
        if r.get("error") == "not enough":
            raise HTTPException(402, "Не хватает CUBE: нужно %s, есть %s. "
                                     "Пополнить можно в кошельке." % (п["цена"], round(r.get("balance", 0), 2)))
        raise HTTPException(400, "Подарок не прошёл")

    имя = db.get_display_name(user["id"])
    db.stream_gift_write(sid, user["id"], имя, int(с["user_id"]), п["key"], п["цена"])
    db.stream_say(sid, user["id"], имя, "%s %s" % (п["знак"], п["имя"]), kind="подарок")
    return {"ok": True, "gift": п, "balance": r.get("balance")}


@app.get("/streams/{sid}/gifts")
async def stream_gifts_ep(sid: int, limit: int = 50):
    return {"ok": True, "items": db.stream_gifts_of(sid, limit)}


# ══════════════════════════════════════════════════════════════════════════
#  ЖИВАЯ КАРТА
#  ---------------------------------------------------------------------
#  Карта показывает не «где что находится», а «что сейчас происходит».
#  Данные для неё — наши собственные: кубы, идущие эфиры, посты с привязкой
#  к месту и сами люди. Чужих карт и чужих ключей здесь нет.
#
#  ЧЕЛОВЕК НА КАРТЕ — ТОЛЬКО ПО СВОЕМУ ЖЕЛАНИЮ. Метка «я» живёт полчаса и
#  стирается сама, координаты округляются до километра ещё до записи, а
#  «убрать себя с карты» именно удаляет строку.
# ══════════════════════════════════════════════════════════════════════════

class MapMarkRequest(BaseModel):
    kind: str = "place"                  # cube | stream | post | me | place
    lat: float = 0.0
    lon: float = 0.0
    ref_id: Optional[int] = None
    title: Optional[str] = ""
    icon: Optional[str] = ""
    minutes: Optional[int] = None


@app.post("/map/mark")
async def map_mark_ep(body: MapMarkRequest, user=Depends(get_current_user)):
    вид = (body.kind or "place").strip()
    if вид not in db.КАРТА_ВИДЫ:
        raise HTTPException(400, "Неизвестный вид метки")
    название = (body.title or "").strip()[:120]
    if название and вид != "me":
        _модерация(user, название, "имя")
    if вид != "me":
        _лимит(user, "post")
    имя = db.get_display_name(user["id"])
    номер = db.map_mark_set(user["id"], вид, body.lat, body.lon,
                            ref_id=body.ref_id, title=название,
                            icon=(body.icon or "")[:8], display_name=имя,
                            minutes=body.minutes)
    if not номер:
        raise HTTPException(400, "Не получилось поставить метку — проверь координаты")
    return {"ok": True, "id": номер, "kind": вид,
            "точность_км": 1 if вид == "me" else 0,
            "живёт_минут": db.КАРТА_Я_МИНУТ if вид == "me" else None}


@app.delete("/map/mark")
async def map_mark_drop_ep(kind: Optional[str] = None, ref_id: Optional[int] = None,
                           mark_id: Optional[int] = None, user=Depends(get_current_user)):
    db.map_mark_drop(user["id"], kind=kind, ref_id=ref_id, mark_id=mark_id)
    return {"ok": True}


@app.get("/map/live")
async def map_live_ep(kinds: Optional[str] = None, limit: int = 600):
    """Всё, что сейчас живо на карте. Отдаётся всем — метка на карте и
       значит «покажите меня», — но личного в ней нет ничего, кроме имени,
       которое человек и так показывает везде."""
    виды = [к.strip() for к in (kinds or "").split(",") if к.strip()] or None
    строки = db.map_live(виды, min(int(limit or 600), 1000))
    вышло = []
    for с in строки:
        вышло.append({
            "id": с.get("id"), "kind": с.get("kind"), "ref_id": с.get("ref_id"),
            "lat": с.get("lat"), "lon": с.get("lon"),
            "title": с.get("title") or "", "icon": с.get("icon") or "",
            "display_name": с.get("display_name") or "",
            "created_at": str(с.get("created_at") or ""),
        })
    return {"ok": True, "items": вышло, "count": len(вышло)}


@app.get("/map/mine")
async def map_mine_ep(user=Depends(get_current_user)):
    return {"ok": True, "items": db.map_marks_of(user["id"])}


# ══════════════════════════════════════════════════════════════════════════
#  ШОПИНГ — ВТОРОЙ РАЗДЕЛ МАРКЕТПЛЕЙСА
#  ---------------------------------------------------------------------
#  Цифровой раздел продаёт файлы, этот — вещи. У вещи другая карточка:
#  бренд, размеры, цвета, состояние, двадцать снимков и описание по
#  пунктам. Снимки здесь — витрина, поэтому они открыты всем; в цифровом
#  разделе файлы, наоборот, закрыты до покупки.
#
#  Денег этот раздел не трогает: покупка вещи — это договор между людьми,
#  доставка и возврат. Поэтому здесь карточка и кнопка «написать продавцу»,
#  а не «купить за CUBE». Обещать то, чего нет, мы не будем.
# ══════════════════════════════════════════════════════════════════════════

SHOP_CATS = [
    {"id": "clothes", "icon": "👕", "name": "Одежда",
     "subs": ["Верхняя одежда", "Платья", "Футболки и поло", "Рубашки",
              "Брюки и джинсы", "Юбки", "Костюмы", "Свитеры и худи", "Бельё"]},
    {"id": "shoes",   "icon": "👟", "name": "Обувь",
     "subs": ["Кроссовки", "Ботинки", "Туфли", "Сапоги", "Сандалии", "Домашняя"]},
    {"id": "bags",    "icon": "👜", "name": "Сумки",
     "subs": ["Сумки", "Рюкзаки", "Кошельки", "Чемоданы", "Клатчи"]},
    {"id": "watch",   "icon": "⌚", "name": "Часы",
     "subs": ["Механические", "Кварцевые", "Умные", "Ремешки"]},
    {"id": "jewel",   "icon": "💍", "name": "Украшения",
     "subs": ["Кольца", "Серьги", "Цепи и подвески", "Браслеты", "Камни"]},
    {"id": "beauty",  "icon": "💄", "name": "Красота",
     "subs": ["Уход за лицом", "Уход за телом", "Макияж", "Парфюм", "Волосы"]},
    {"id": "home",    "icon": "🛋", "name": "Дом",
     "subs": ["Мебель", "Посуда", "Текстиль", "Свет", "Декор", "Сад"]},
    {"id": "tech",    "icon": "📱", "name": "Техника",
     "subs": ["Телефоны", "Компьютеры", "Аудио", "Фото и видео", "Игровое", "Аксессуары"]},
    {"id": "sport",   "icon": "🏀", "name": "Спорт",
     "subs": ["Тренировки", "Велосипеды", "Туризм", "Зимнее", "Вода"]},
    {"id": "kids",    "icon": "🧸", "name": "Детям",
     "subs": ["Игрушки", "Одежда", "Коляски", "Школа"]},
    {"id": "hobby",   "icon": "🎸", "name": "Хобби",
     "subs": ["Музыка", "Рукоделие", "Коллекции", "Настольные игры"]},
    {"id": "books",   "icon": "📚", "name": "Книги",
     "subs": ["Художественные", "Нон-фикшн", "Детские", "Комиксы", "Редкие"]},
    {"id": "auto",    "icon": "🚗", "name": "Авто",
     "subs": ["Запчасти", "Шины и диски", "Аксессуары", "Инструмент"]},
    {"id": "food",    "icon": "🍫", "name": "Еда",
     "subs": ["Сладости", "Чай и кофе", "Фермерское", "Напитки"]},
    {"id": "art",     "icon": "🎨", "name": "Искусство",
     "subs": ["Картины", "Графика", "Скульптура", "Фотография", "Ручная работа"]},
    {"id": "other",   "icon": "📦", "name": "Разное", "subs": []},
]
SHOP_CAT_IDS = [c["id"] for c in SHOP_CATS]
SHOP_CONDS = [
    {"id": "new",      "name": "Новое"},
    {"id": "like-new", "name": "Как новое"},
    {"id": "used",     "name": "Б/у"},
    {"id": "vintage",  "name": "Винтаж"},
]


class ShopItemRequest(BaseModel):
    title: str = ""
    brand: str = ""
    category: str = "other"
    subcategory: str = ""
    price: float = 0.0
    currency: str = "CUBE"
    condition: str = "new"
    qty: int = 1
    description: str = ""
    specs: Any = None          # [{"k": "Материал", "v": "Кожа"}]
    variants: Any = None       # {"Размер": ["S","M"], "Цвет": ["Чёрный"]}
    shipping: str = ""
    shape: str = "куб"
    shape_text: str = ""
    shape_color: str = "#f1c40f"


def _шоп_проверить(body: "ShopItemRequest", user):
    название = (body.title or "").strip()[:140]
    if len(название) < 2:
        raise HTTPException(400, "Название товара обязательно")
    бренд = (body.brand or "").strip()[:60]
    описание = (body.description or "").strip()[:6000]
    _модерация(user, название, "имя")
    if описание:
        _модерация(user, описание, "пост")
    if бренд:
        _модерация(user, бренд, "имя")

    раздел = body.category if body.category in SHOP_CAT_IDS else "other"
    подраздел = (body.subcategory or "").strip()[:60]
    состояние = body.condition if body.condition in db.ШОП_СОСТОЯНИЕ else "new"
    валюта = "CUBE" if (body.currency or "CUBE").upper() == "CUBE" else \
             (body.currency or "USD").upper()[:4]
    цена = max(0.0, min(float(body.price or 0), 10_000_000.0))
    сколько = max(1, min(int(body.qty or 1), 100000))

    def всвёрнутое(x, предел=4000):
        if x is None:
            return ""
        try:
            s = x if isinstance(x, str) else _json.dumps(x, ensure_ascii=False)
        except Exception:
            return ""
        return s[:предел]

    форма = (body.shape or "куб").strip()[:24]
    надпись = (body.shape_text or бренд or название)[:24]
    if надпись:
        _модерация(user, надпись, "имя")
    цвет = (body.shape_color or "#f1c40f").strip()[:16]
    if not _re.match(r"^#[0-9a-fA-F]{3,8}$", цвет):
        цвет = "#f1c40f"

    return {"title": название, "brand": бренд, "category": раздел,
            "subcategory": подраздел, "price": цена, "currency": валюта,
            "condition": состояние, "qty": сколько, "description": описание,
            "specs": всвёрнутое(body.specs), "variants": всвёрнутое(body.variants),
            "shipping": (body.shipping or "").strip()[:600],
            "shape": форма, "shape_text": надпись, "shape_color": цвет}


def _шоп_наружу(row, viewer_id=None, с_медиа=False):
    своё = viewer_id is not None and int(row.get("seller_id") or 0) == int(viewer_id)

    def развернуть(с):
        if not с:
            return None
        try:
            return _json.loads(с)
        except Exception:
            return None

    медиа = db.shop_media_list(row["id"])
    из = {
        "id": row.get("id"),
        "title": row.get("title"),
        "brand": row.get("brand") or "",
        "category": row.get("category"),
        "subcategory": row.get("subcategory") or "",
        "price": round(float(row.get("price") or 0), 2),
        "currency": row.get("currency") or "CUBE",
        "condition": row.get("condition") or "new",
        "qty": max(0, int(row.get("qty") if row.get("qty") is not None else 0)),
        "description": row.get("description") or "",
        "specs": развернуть(row.get("specs")) or [],
        "variants": развернуть(row.get("variants")) or {},
        "shipping": row.get("shipping") or "",
        "shape": row.get("shape") or "куб",
        "shape_text": row.get("shape_text") or "",
        "shape_color": row.get("shape_color") or "#f1c40f",
        "status": row.get("status"),
        "views": int(row.get("views") or 0),
        "seller_id": row.get("seller_id"),
        "seller": db.get_display_name(row.get("seller_id")),
        "created_at": db._utc_str(db._as_dt(row.get("created_at"))) if row.get("created_at") else None,
        "mine": своё,
        "media": [{"id": м["id"], "kind": м["kind"], "mime": м["mime"],
                   "size": м["size"],
                   "url": f"/shop/{row['id']}/media/{м['id']}"} for м in медиа],
    }
    return из


@app.get("/shop")
async def shop_list_ep(request: Request, cat: str = "", q: str = "",
                       mine: int = 0, limit: int = 60, offset: int = 0):
    зритель = _sig_viewer(request)
    ид = int(зритель["id"]) if зритель else None
    limit = min(100, max(1, limit))
    if mine and ид:
        строки = db.shop_list(category=cat or None, query=q or None, seller_id=ид,
                              limit=limit, offset=offset, include_hidden=True)
    else:
        строки = db.shop_list(category=cat or None, query=q or None,
                              limit=limit, offset=offset)
    return {"cats": SHOP_CATS, "conds": SHOP_CONDS,
            "items": [_шоп_наружу(с, ид) for с in строки]}


@app.get("/shop/{item_id}")
async def shop_one_ep(item_id: int, request: Request):
    строка = db.shop_get(item_id)
    if not строка:
        raise HTTPException(404, "Товар не найден")
    зритель = _sig_viewer(request)
    ид = int(зритель["id"]) if зритель else None
    своё = ид is not None and int(строка.get("seller_id") or 0) == ид
    # Распроданное и снятое скрыто от витрины — но не от того, кто это
    # купил: иначе из «Моих покупок» некуда вернуться, и человек видит
    # «товар не найден» на вещь, за которую заплатил.
    купил = (not своё) and ид is not None and db.shop_has_order(item_id, ид)
    if строка.get("status") != "active" and not (своё or купил):
        raise HTTPException(404, "Товар снят с витрины")
    if not своё:
        db.shop_view(item_id)
    return _шоп_наружу(строка, ид, True)


@app.post("/shop")
async def shop_create_ep(body: ShopItemRequest, user=Depends(get_current_user)):
    _лимит(user, "market")
    if db.shop_active_count(user["id"]) >= db.ШОП_МАКС_АКТИВНЫХ:
        raise HTTPException(409, f"Больше {db.ШОП_МАКС_АКТИВНЫХ} товаров "
                                 f"одновременно в продаже держать нельзя")
    поля = _шоп_проверить(body, user)
    номер = db.shop_create(user["id"], поля)
    if not номер:
        raise HTTPException(500, "Не получилось создать карточку")
    return {"ok": True, "id": номер, "item": _шоп_наружу(db.shop_get(номер), user["id"])}


@app.patch("/shop/{item_id}")
async def shop_edit_ep(item_id: int, body: ShopItemRequest, user=Depends(get_current_user)):
    строка = db.shop_get(item_id)
    if not строка:
        raise HTTPException(404, "Товар не найден")
    if int(строка.get("seller_id") or 0) != int(user["id"]):
        raise HTTPException(403, "Это не твой товар")
    поля = _шоп_проверить(body, user)
    db.shop_update(item_id, user["id"], поля)
    return {"ok": True, "item": _шоп_наружу(db.shop_get(item_id), user["id"])}


class ShopStatusRequest(BaseModel):
    status: str = "active"


# ══ ПОКУПКА ВЕЩЕЙ ══════════════════════════════════════════════════════════
#
#  Раньше у шопинга была витрина и переписка, а покупки не было вовсе: ни
#  заказов в базе, ни денег. Вкладка «Мои покупки» честно об этом говорила.
#  Теперь покупка есть, и устроена она так, как и положено с вещами:
#  деньги лежат у площадки, пока покупатель не скажет «получил».
#
#      paid ──(продавец: отправил)──→ sent ──(покупатель: получил)──→ done
#
#  Отмена возможна до отправки — кем угодно из двоих; после отправки её
#  делает только продавец. Деньги при отмене возвращаются целиком.
#
#  Адрес доставки покупатель пишет сам и видят его только двое: покупатель
#  и продавец. Ни в поиск, ни в витрину он не попадает.

class ShopBuyRequest(BaseModel):
    qty: int = 1
    address: str = ""
    note: str = ""


class ShopOrderStatusRequest(BaseModel):
    status: str = ""


def _шоп_заказ_наружу(з, я):
    """Заказ глазами одного человека. Чужое имя показываем, чужой адрес —
       только если ты продавец: везти-то тебе."""
    покупатель = (int(з.get("buyer_id") or 0) == int(я))
    из = dict(з)
    из["mine"] = покупатель
    из["role"] = "buyer" if покупатель else "seller"
    из["buyer"] = db.get_display_name(з.get("buyer_id"))
    из["seller"] = db.get_display_name(з.get("seller_id"))
    return из


@app.post("/shop/{item_id}/buy")
async def shop_buy_ep(item_id: int, body: ShopBuyRequest, request: Request,
                      user=Depends(get_current_user)):
    _стучать("shop_buy", request)
    штук = max(1, min(99, int(body.qty or 1)))
    итог = db.shop_buy(item_id, user["id"], штук,
                       (body.address or "").strip()[:400],
                       (body.note or "").strip()[:400])
    if итог.get("error") == "not enough":
        raise HTTPException(402, f"Не хватает CUBE: нужно {итог.get('price', 0):.0f}, "
                                 f"на балансе {итог.get('balance', 0):.0f}")
    if итог.get("error") == "осталось меньше":
        raise HTTPException(409, f"Столько нет: осталось {итог.get('qty', 0)} шт")
    if итог.get("error"):
        raise HTTPException(400, итог["error"])

    заказ = итог.get("order") or {}
    try:
        await _notify_user(int(заказ.get("seller_id") or 0), {
            "type": "shop_order",
            "title": заказ.get("title"),
            "amount": заказ.get("total"),
            "order_id": заказ.get("id"),
        })
    except Exception:
        pass
    return {"ok": True, "paid": итог.get("paid", 0), "balance": итог.get("balance"),
            "order": _шоп_заказ_наружу(заказ, user["id"]),
            "item": _шоп_наружу(db.shop_get(item_id), user["id"])}


@app.get("/shop/me/orders")
async def shop_my_orders_ep(user=Depends(get_current_user)):
    заказы = db.shop_orders_my(user["id"])
    return {"orders": [_шоп_заказ_наружу(з, user["id"]) for з in заказы]}


@app.get("/shop/me/sales")
async def shop_my_sales_ep(user=Depends(get_current_user)):
    заказы = db.shop_sales_my(user["id"])
    return {"orders": [_шоп_заказ_наружу(з, user["id"]) for з in заказы]}


@app.post("/shop/orders/{order_id}/status")
async def shop_order_status_ep(order_id: int, body: ShopOrderStatusRequest,
                               user=Depends(get_current_user)):
    куда = (body.status or "").strip()
    if куда not in ("sent", "done", "cancelled"):
        raise HTTPException(400, "Так заказ не переводится")
    итог = db.shop_order_move(order_id, user["id"], куда)
    if итог.get("error"):
        код = 403 if итог["error"] == "это не твой заказ" else 409
        raise HTTPException(код, итог["error"])
    заказ = итог.get("order") or {}
    кому = заказ.get("buyer_id") if куда == "sent" else заказ.get("seller_id")
    try:
        await _notify_user(int(кому or 0), {
            "type": "shop_order_" + куда,
            "title": заказ.get("title"),
            "amount": заказ.get("total"),
            "order_id": заказ.get("id"),
        })
    except Exception:
        pass
    return {"ok": True, "order": _шоп_заказ_наружу(заказ, user["id"])}


@app.post("/shop/{item_id}/status")
async def shop_status_ep(item_id: int, body: ShopStatusRequest,
                         user=Depends(get_current_user)):
    статус = body.status if body.status in ("active", "hidden") else "hidden"
    if not db.shop_update(item_id, user["id"], {"status": статус}):
        raise HTTPException(403, "Это не твой товар")
    return {"ok": True, "status": статус}


@app.delete("/shop/{item_id}")
async def shop_delete_ep(item_id: int, user=Depends(get_current_user)):
    if not db.shop_delete(item_id, user["id"]):
        raise HTTPException(403, "Это не твой товар")
    return {"ok": True}


@app.post("/shop/{item_id}/media")
async def shop_media_add_ep(item_id: int, file: UploadFile = File(...),
                            user=Depends(get_current_user)):
    строка = db.shop_get(item_id)
    if not строка:
        raise HTTPException(404, "Товар не найден")
    if int(строка.get("seller_id") or 0) != int(user["id"]):
        raise HTTPException(403, "Это не твой товар")

    всего, сколько = db.shop_media_size(item_id)
    if сколько >= db.ШОП_МАКС_МЕДИА:
        raise HTTPException(409, f"К одному товару можно приложить "
                                 f"{db.ШОП_МАКС_МЕДИА} снимков и роликов")

    куски, набрано = [], 0
    предел = min(db.ШОП_МАКС_ФАЙЛ, db.ШОП_МАКС_ВСЕГО - всего)
    while True:
        кусок = await file.read(1024 * 1024)
        if not кусок:
            break
        набрано += len(кусок)
        if набрано > предел:
            raise HTTPException(413, f"Не влезает: на товар всего "
                                     f"{db.ШОП_МАКС_ВСЕГО // 1024 // 1024} МБ, "
                                     f"занято {всего // 1024 // 1024} МБ")
        куски.append(кусок)
    данные = b"".join(куски)
    if not данные:
        raise HTTPException(400, "Пустой файл")

    тип = (file.content_type or "application/octet-stream")[:120]
    если_видео = тип.startswith("video/")
    if not (тип.startswith("image/") or если_видео):
        raise HTTPException(400, "Сюда идут только снимки и ролики")
    db.shop_media_add(item_id, "video" if если_видео else "photo",
                      (file.filename or "")[:200], тип, данные, сколько)
    return {"ok": True, "media": [{"id": м["id"], "kind": м["kind"], "mime": м["mime"],
                                   "size": м["size"],
                                   "url": f"/shop/{item_id}/media/{м['id']}"}
                                  for м in db.shop_media_list(item_id)]}


@app.delete("/shop/{item_id}/media/{media_id}")
async def shop_media_del_ep(item_id: int, media_id: int, user=Depends(get_current_user)):
    if not db.shop_media_del(item_id, media_id, user["id"]):
        raise HTTPException(403, "Это не твой товар")
    return {"ok": True}


@app.get("/shop/{item_id}/media/{media_id}")
async def shop_media_get_ep(item_id: int, media_id: int):
    """Снимки витрины открыты всем: это и есть витрина. Закрывать их —
       значит прятать товар от покупателя."""
    м = db.shop_media_one(item_id, media_id)
    if not м:
        raise HTTPException(404, "Нет такого снимка")
    данные = м.get("data")
    if isinstance(данные, memoryview):
        данные = данные.tobytes()
    return Response(content=bytes(данные or b""),
                    media_type=м.get("mime") or "application/octet-stream",
                    headers={"Cache-Control": "public, max-age=86400"})


# ══ СТОРИС ══════════════════════════════════════════════════════════════════
# Короткая запись живёт сутки и пропадает сама. Файл лежит у нас, а не по
# чужой ссылке: ссылка ломается в тот день, когда её удалят на той стороне.

@app.get("/stories")
async def stories_feed(user=Depends(get_current_user)):
    строки = db.story_feed(int(user["id"]))
    люди = {}
    for с in строки:
        uid = str(с.get("user_id"))
        если = люди.setdefault(uid, {
            "user_id": с.get("user_id"),
            "display_name": с.get("display_name") or ("#" + uid),
            "avatar_url": с.get("avatar_url") or "",
            "avatar_ver": с.get("avatar_ver") or "",
            "mine": int(с.get("user_id") or 0) == int(user["id"]),
            "items": [], "unseen": 0})
        если["items"].append({
            "id": с.get("id"), "kind": с.get("kind"), "mime": с.get("mime"),
            "caption": с.get("caption") or "", "secs": с.get("secs") or 5,
            "created_at": str(с.get("created_at") or ""),
            "seen": bool(с.get("seen")),
            "url": f"/stories/{с.get('id')}/media"})
        if not с.get("seen"):
            если["unseen"] += 1
    список = list(люди.values())
    # Свои первыми, дальше непросмотренные, дальше остальные.
    список.sort(key=lambda к: (not к["mine"], к["unseen"] == 0, к["display_name"]))
    return {"people": список, "limits": {
        "hours": db.СТОРИС_ЖИЗНЬ_Ч, "max_file": db.СТОРИС_МАКС_ФАЙЛ,
        "max_own": db.СТОРИС_МАКС_СВОИХ, "video_secs": db.СТОРИС_ВИДЕО_СЕК}}


@app.post("/stories")
async def stories_add(file: UploadFile = File(...),
                      caption: str = Form(""),
                      secs: int = Form(5),
                      user=Depends(get_current_user)):
    # v=591 · Подпись и длительность приходят полями той же формы, что и
    # файл. Без Form(...) FastAPI ищет их в строке запроса, а браузер их
    # туда не кладёт: secs всегда оставался пятёркой, и длинный ролик
    # проверку на сервере проходил, хотя не должен.
    куски, набрано = [], 0
    while True:
        кусок = await file.read(1024 * 1024)
        if not кусок:
            break
        набрано += len(кусок)
        if набрано > db.СТОРИС_МАКС_ФАЙЛ:
            raise HTTPException(413, f"Файл больше {db.СТОРИС_МАКС_ФАЙЛ // 1024 // 1024} МБ")
        куски.append(кусок)
    данные = b"".join(куски)
    if not данные:
        raise HTTPException(400, "Пустой файл")
    тип = (file.content_type or "application/octet-stream")[:120]
    видео = тип.startswith("video/")
    if not (тип.startswith("image/") or видео):
        raise HTTPException(400, "Сюда идут только снимки и ролики")
    if видео and int(secs or 0) > db.СТОРИС_ВИДЕО_СЕК:
        raise HTTPException(413, f"Ролик длиннее {db.СТОРИС_ВИДЕО_СЕК} секунд")
    if caption:
        _модерация(user, caption, "имя")
    номер = db.story_add(int(user["id"]), "video" if видео else "photo",
                         тип, данные, caption or "", int(secs or 5))
    if not номер:
        raise HTTPException(500, "Не удалось сохранить")
    return {"ok": True, "id": номер, "url": f"/stories/{номер}/media"}


@app.get("/stories/{story_id}/media")
async def stories_media(story_id: int):
    с = db.story_one(story_id)
    if not с:
        raise HTTPException(404, "Записи нет — возможно, сутки вышли")
    данные = с.get("data")
    if isinstance(данные, memoryview):
        данные = данные.tobytes()
    return Response(content=bytes(данные or b""),
                    media_type=с.get("mime") or "application/octet-stream",
                    headers={"Cache-Control": "private, max-age=3600"})


@app.post("/stories/{story_id}/seen")
async def stories_seen(story_id: int, user=Depends(get_current_user)):
    db.story_seen(story_id, int(user["id"]))
    return {"ok": True}


@app.delete("/stories/{story_id}")
async def stories_del(story_id: int, user=Depends(get_current_user)):
    if not db.story_del(story_id, int(user["id"])):
        raise HTTPException(403, "Это не твоя запись")
    return {"ok": True}


# ── Истории: просмотры, сердца, разговор, подарки и монеты ──────────────────
#  У записи та же жизнь, что у публикации в ленте, только короче на сутки.
#  Автор видит, кто смотрел; зритель может поставить сердце, написать,
#  прислать подарок из общего каталога или просто монеты — любой суммой.

class StoryCommentRequest(BaseModel):
    text: str = ""
    parent_id: int = 0      # v=629 · ответ в ветке, как под лентой
    expire_seconds: int = 0  # v=630 · «∞»: комментарий исчезает сам


class StoryCommentLikeRequest(BaseModel):
    type: str = "like"      # v=629 · «like» или «dislike»


class StoryGiftRequest(BaseModel):
    gift: str = ""


class StoryTipRequest(BaseModel):
    amount: float = 0


def _история_или_404(story_id: int):
    с = db.story_one(story_id)
    if not с:
        raise HTTPException(404, "Записи нет — возможно, сутки вышли")
    return с


@app.get("/stories/{story_id}/stats")
async def stories_stats(story_id: int, user=Depends(get_current_user)):
    с = _история_или_404(story_id)
    итог = db.story_stats(story_id, int(user["id"]))
    итог["ok"] = True
    итог["mine"] = int(с.get("user_id") or 0) == int(user["id"])
    if итог["mine"]:
        итог["viewers"] = [{
            "user_id": в.get("user_id"),
            "display_name": в.get("display_name") or ("#" + str(в.get("user_id"))),
            "avatar_url": в.get("avatar_url") or "",
            "avatar_ver": в.get("avatar_ver") or "",
            "liked": bool(в.get("liked")),
            "at": str(в.get("at") or "")} for в in db.story_viewers(story_id)]
    return итог


@app.post("/stories/{story_id}/like")
async def stories_like(story_id: int, user=Depends(get_current_user)):
    _история_или_404(story_id)
    _лимит(user, "like")
    r = db.story_like(story_id, int(user["id"]))
    r["ok"] = True
    return r


def _остаток(когда):
    """Сколько секунд осталось до срока. Нет срока — None."""
    if not когда:
        return None
    try:
        if isinstance(когда, str):
            т = datetime.strptime(когда[:19], "%Y-%m-%d %H:%M:%S")
        else:
            т = когда.replace(tzinfo=None)
        о = int((т - datetime.utcnow()).total_seconds())
        return о if о > 0 else 0
    except Exception:
        return None


@app.get("/stories/{story_id}/comments")
async def stories_comments_get(story_id: int, user=Depends(get_current_user)):
    с = _история_или_404(story_id)
    свои = int(с.get("user_id") or 0) == int(user["id"])
    мой = int(user["id"])

    def одеть(к):
        автор = int(к.get("user_id") or 0) == мой
        return {
            "id": к.get("id"), "user_id": к.get("user_id"),
            "display_name": к.get("display_name") or ("#" + str(к.get("user_id"))),
            "avatar_url": к.get("avatar_url") or "",
            "avatar_ver": к.get("avatar_ver") or "",
            "text": к.get("text") or "",
            "created_at": str(к.get("created_at") or ""),
            "edited": bool(к.get("edited")),
            # v=642 · Сколько секунд комментарию осталось жить. Отдаём
            # ОСТАТОК, а не время: окну тогда не надо разбирать чужую
            # запись времени и гадать о поясе — оно просто ждёт столько
            # секунд и снимает строку с экрана само.
            "expire_in": _остаток(к.get("expire_at")),
            # v=629 · голоса и ветка: те же поля, что у комментария ленты
            "likes": int(к.get("likes") or 0),
            "dislikes": int(к.get("dislikes") or 0),
            "user_like": к.get("user_like") or "",
            "parent_id": int(к.get("parent_id") or 0),
            "replies": [],
            "can_edit": автор,
            "can_del": свои or автор}

    # v=629 · Ветку складываем здесь: окну остаётся нарисовать, а не считать.
    # Ответ, чей корень уже убрали, становится корнем сам — иначе он пропал
    # бы с экрана, хотя в базе есть.
    плоско = [одеть(к) for к in db.story_comments(story_id, me=мой)]
    поИд = {int(к["id"]): к for к in плоско}
    корни = []
    for к in плоско:
        родитель = поИд.get(к["parent_id"]) if к["parent_id"] else None
        if родитель is not None and родитель is not к:
            родитель["replies"].append(к)
        else:
            корни.append(к)
    return {"ok": True, "mine": свои, "items": корни, "count": len(плоско)}


@app.post("/stories/{story_id}/comments")
async def stories_comments_add(story_id: int, body: StoryCommentRequest,
                               user=Depends(get_current_user)):
    _история_или_404(story_id)
    текст = (body.text or "").strip()[:600]
    if not текст:
        raise HTTPException(400, "Пустой комментарий")
    _лимит(user, "comment")
    _модерация(user, текст, "комментарий")
    имя = db.get_display_name(user["id"])
    номер = db.story_comment_add(story_id, int(user["id"]), имя, текст,
                                 int(body.parent_id or 0),
                                 int(body.expire_seconds or 0))
    if not номер:
        raise HTTPException(500, "Не удалось записать")
    return {"ok": True, "id": номер, "display_name": имя, "text": текст,
            "parent_id": int(body.parent_id or 0)}


@app.put("/stories/{story_id}/comments/{comment_id}")
async def stories_comment_edit(story_id: int, comment_id: int,
                               body: StoryCommentRequest,
                               user=Depends(get_current_user)):
    """v=629 · Правка своего комментариев под историей — как под лентой."""
    _история_или_404(story_id)
    текст = (body.text or "").strip()[:600]
    if not текст:
        raise HTTPException(400, "Пустой комментарий")
    _модерация(user, текст, "комментарий")
    if not db.story_comment_edit(comment_id, int(user["id"]), текст):
        raise HTTPException(403, "Это не твой комментарий")
    return {"ok": True, "id": comment_id, "text": текст}


@app.post("/stories/{story_id}/comments/{comment_id}/like")
async def stories_comment_like(story_id: int, comment_id: int,
                               body: StoryCommentLikeRequest,
                               user=Depends(get_current_user)):
    """v=629 · Палец вверх и палец вниз под комментарием истории."""
    _история_или_404(story_id)
    _лимит(user, "like")
    р = db.story_comment_like(comment_id, int(user["id"]), body.type)
    р["ok"] = True
    return р


@app.delete("/stories/{story_id}/comments/{comment_id}")
async def stories_comment_del(story_id: int, comment_id: int,
                              user=Depends(get_current_user)):
    с = _история_или_404(story_id)
    хозяин = int(с.get("user_id") or 0)
    ушло = db.story_comment_del(comment_id, int(user["id"]),
                                хозяин if хозяин == int(user["id"]) else 0)
    if not ушло:
        raise HTTPException(403, "Это не твой комментарий")
    return {"ok": True}


@app.post("/stories/{story_id}/gift")
async def stories_gift(story_id: int, body: StoryGiftRequest,
                       user=Depends(get_current_user)):
    """Подарок за историю. Каталог и цены — те же, что в эфире."""
    п = ПОДАРКИ_ПО_КЛЮЧУ.get((body.gift or "").strip())
    if not п:
        raise HTTPException(400, "Неизвестный подарок")
    с = _история_или_404(story_id)
    автор = int(с.get("user_id") or 0)
    if автор == int(user["id"]):
        raise HTTPException(400, "Себе подарки дарить незачем")
    r = db.transfer_cube(user["id"], автор, п["цена"],
                         "Подарок «%s» за историю #%s" % (п["имя"], story_id))
    if not r.get("ok"):
        if r.get("error") == "not enough":
            raise HTTPException(402, "Не хватает CUBE: нужно %s, есть %s. "
                                     "Пополнить можно в кошельке."
                                % (п["цена"], round(r.get("balance", 0), 2)))
        raise HTTPException(400, "Подарок не прошёл")
    db.story_gift_write(story_id, int(user["id"]), db.get_display_name(user["id"]),
                        автор, п["key"], п["цена"])
    return {"ok": True, "gift": п, "balance": r.get("balance")}


@app.post("/stories/{story_id}/tip")
async def stories_tip(story_id: int, body: StoryTipRequest,
                      user=Depends(get_current_user)):
    """Монеты за историю: сколько человек сам написал, без каталога."""
    try:
        сумма = round(float(body.amount or 0), 2)
    except Exception:
        сумма = 0
    if сумма <= 0:
        raise HTTPException(400, "Сумма должна быть больше нуля")
    if сумма > 100000:
        raise HTTPException(400, "Слишком много за раз")
    с = _история_или_404(story_id)
    автор = int(с.get("user_id") or 0)
    if автор == int(user["id"]):
        raise HTTPException(400, "Себе монеты слать незачем")
    r = db.transfer_cube(user["id"], автор, сумма, "Монеты за историю #%s" % story_id)
    if not r.get("ok"):
        if r.get("error") == "not enough":
            raise HTTPException(402, "Не хватает CUBE: нужно %s, есть %s. "
                                     "Пополнить можно в кошельке."
                                % (сумма, round(r.get("balance", 0), 2)))
        raise HTTPException(400, "Перевод не прошёл")
    db.story_gift_write(story_id, int(user["id"]), db.get_display_name(user["id"]),
                        автор, "монеты", сумма)
    return {"ok": True, "amount": сумма, "balance": r.get("balance")}


@app.get("/stories/{story_id}/gifts")
async def stories_gifts_list(story_id: int, user=Depends(get_current_user)):
    _история_или_404(story_id)
    return {"ok": True, "items": db.story_gifts_of(story_id)}


# ══ ГРУППЫ: СНИМКИ, ТЕГИ, ВИДИМОСТЬ УЧАСТНИКОВ ══════════════════════════════

class GroupExtraRequest(BaseModel):
    tags: Optional[str] = None
    members_visible: Optional[bool] = None


@app.get("/groups/{group_id}/extra")
async def group_extra_get_ep(group_id: int, user=Depends(get_current_user)):
    доп = db.group_extra_get(group_id)
    медиа = db.group_media_list(group_id)
    свой = доп.get("owner_id") is not None and int(доп["owner_id"]) == int(user["id"])
    return {"tags": доп["tags"], "members_visible": bool(доп["members_visible"]),
            "owner": свой,
            # v=584 · Чем показывается группа: 'icon' — значком, иначе снимком.
            "avatar_mode": доп.get("avatar_mode") or "",
            "media": [{"id": м["id"], "kind": м["kind"], "mime": м["mime"],
                       "url": f"/groups/{group_id}/media/{м['id']}"} for м in медиа],
            "limits": {"max_photos": db.ГРУППА_МАКС_ФОТО,
                       "max_file": db.ГРУППА_МАКС_ФАЙЛ}}


@app.patch("/groups/{group_id}/extra")
async def group_extra_set_ep(group_id: int, body: GroupExtraRequest,
                             user=Depends(get_current_user)):
    if body.tags:
        _модерация(user, body.tags, "имя")
    if not db.group_extra_set(group_id, int(user["id"]),
                              tags=body.tags, members_visible=body.members_visible):
        raise HTTPException(403, "Это не твоя группа")
    return {"ok": True}


@app.post("/groups/{group_id}/media")
async def group_media_add_ep(group_id: int, file: UploadFile = File(...),
                             user=Depends(get_current_user)):
    доп = db.group_extra_get(group_id)
    if доп.get("owner_id") is None or int(доп["owner_id"]) != int(user["id"]):
        raise HTTPException(403, "Это не твоя группа")
    куски, набрано = [], 0
    while True:
        кусок = await file.read(1024 * 1024)
        if not кусок:
            break
        набрано += len(кусок)
        if набрано > db.ГРУППА_МАКС_ФАЙЛ:
            raise HTTPException(413, f"Файл больше {db.ГРУППА_МАКС_ФАЙЛ // 1024 // 1024} МБ")
        куски.append(кусок)
    данные = b"".join(куски)
    if not данные:
        raise HTTPException(400, "Пустой файл")
    тип = (file.content_type or "application/octet-stream")[:120]
    видео = тип.startswith("video/")
    if not (тип.startswith("image/") or видео):
        raise HTTPException(400, "Сюда идут только снимки и ролики")
    номер = db.group_media_add(group_id, "video" if видео else "photo", тип, данные)
    if not номер:
        raise HTTPException(409, f"Снимков можно не больше {db.ГРУППА_МАКС_ФОТО}")
    try:
        db.group_avatar_mode(group_id, "photo", int(user["id"]))
    except Exception:
        pass
    try:
        await _участникам(group_id, {"type": "group_media", "group_id": int(group_id)})
    except Exception:
        pass
    return {"ok": True, "id": номер, "url": f"/groups/{group_id}/media/{номер}"}


@app.get("/groups/{group_id}/media/{media_id}")
async def group_media_get_ep(group_id: int, media_id: int):
    м = db.group_media_one(group_id, media_id)
    if not м:
        raise HTTPException(404, "Нет такого снимка")
    данные = м.get("data")
    if isinstance(данные, memoryview):
        данные = данные.tobytes()
    return Response(content=bytes(данные or b""),
                    media_type=м.get("mime") or "application/octet-stream",
                    headers={"Cache-Control": "public, max-age=86400"})


@app.get("/groups/{group_id}/avatar")
async def group_avatar_ep(group_id: int):
    """Картинка группы — первый снимок, который хозяин приложил при создании.
    Нужна без ключа: на неё смотрит обычный <img> в списке групп."""
    # Нет картинки — отвечаем «пусто», а не ошибкой с текстом.
    #
    # Раньше здесь был 404 с телом {"detail": "У группы нет картинки"}.
    # Для <img> это всё равно неудача, но браузер видит ответ с чужим
    # типом (JSON вместо картинки) и ругается: ERR_BLOCKED_BY_ORB. На
    # списке из полусотни групп консоль забивалась под завязку, а на
    # сервере, где картинки лежат на другом домене, это ещё и полсотни
    # заблокированных запросов на каждое открытие списка.
    #
    # 204 — ответ без тела. Блокировать нечего, в консоли чисто, а
    # запасной значок у группы появляется так же, как раньше: <img>
    # честно не загрузился.
    пусто = Response(status_code=204,
                     headers={"Cache-Control": "public, max-age=600"})
    # v=584 · Хозяин выбрал значок — картинки у группы нет, даже если
    # снимки лежат в сведениях. Один тип на аву.
    try:
        if (db.group_extra_get(group_id) or {}).get("avatar_mode") == "icon":
            return пусто
    except Exception:
        pass
    медиа = db.group_media_list(group_id) or []
    снимок = None
    for м in медиа:
        if (м.get("kind") or "") == "photo":
            снимок = м
            break
    if not снимок:
        return пусто
    полный = db.group_media_one(group_id, int(снимок["id"]))
    if not полный:
        return пусто
    данные = полный.get("data")
    if isinstance(данные, memoryview):
        данные = данные.tobytes()
    return Response(content=bytes(данные or b""),
                    media_type=полный.get("mime") or "image/jpeg",
                    headers={"Cache-Control": "public, max-age=3600"})


@app.delete("/groups/{group_id}/media/{media_id}")
async def group_media_del_ep(group_id: int, media_id: int,
                             user=Depends(get_current_user)):
    if not db.group_media_del(group_id, media_id, int(user["id"])):
        raise HTTPException(403, "Это не твоя группа")
    try:
        await _участникам(group_id, {"type": "group_media", "group_id": int(group_id)})
    except Exception:
        pass
    return {"ok": True}


@app.post("/groups/{group_id}/media/{media_id}/first")
async def group_media_first_ep(group_id: int, media_id: int,
                               user=Depends(get_current_user)):
    """Сделать этот снимок картинкой группы.

    Картинку отдаёт /groups/{group_id}/avatar — она же первый снимок по
    порядку. Поэтому «сменить картинку» значит переставить порядок.
    """
    if not db.group_media_first(group_id, media_id, int(user["id"])):
        raise HTTPException(403, "Это не твоя группа или снимка нет")
    try:
        db.group_avatar_mode(group_id, "photo", int(user["id"]))
    except Exception:
        pass
    try:
        await _участникам(group_id, {"type": "group_media", "group_id": int(group_id)})
    except Exception:
        pass
    return {"ok": True}


# ══ ПОДПИСКА ЗА CUBE ════════════════════════════════════════════════════════
# Приём карт и крипты не подключён, и обещать его нельзя. Но внутри площадки
# есть свои баллы, и подписку можно оплатить ими — это настоящее списание с
# баланса, а не нарисованная кнопка. Цена считается по той же ставке, что и в
# свайпе: 1 CUBE = $0.50.

ПОДПИСКА_USD_МЕС = 6.99
CUBE_USD = 0.50


def _цена_подписки(месяцев: int) -> int:
    месяцев = max(1, min(12, int(месяцев or 1)))
    цена = ПОДПИСКА_USD_МЕС * месяцев / CUBE_USD
    if месяцев >= 12:
        цена *= 0.715          # год дешевле, как и написано на карточке
    return int(round(цена))


class PremiumBuyRequest(BaseModel):
    months: int = 1
    plan: str = "silver"
    period: str = ""


def _цена_тарифа_в_cube(plan: str, period: str) -> int:
    """Сколько CUBE стоит тариф. Цену берём из таблицы тарифов, а не из
    отдельной формулы подписки: иначе у Силвера и Голда были бы два
    разных источника правды, и однажды они разошлись бы."""
    usd = db.тариф_цена(plan, period)
    if not usd:
        return 0
    return int(round(float(usd) / CUBE_USD))


@app.get("/premium/price")
async def premium_price():
    """v=627 · Отдаём цены ВСЕХ платных тарифов, а не одного.

    Прежде здесь были только «месяц» и «год» Силвера — приложение и
    показывало один тариф. Старые ключи «month» и «year» оставлены на
    месте: их читает приложение, которое ещё не обновилось."""
    планы = {}
    for к in db.ПОРЯДОК_ТАРИФОВ:
        if к == "free":
            continue
        планы[к] = {
            "name": db.ТАРИФЫ[к]["имя"],
            "month": _цена_тарифа_в_cube(к, "month"),
            "year": _цена_тарифа_в_cube(к, "year"),
            "usd_month": db.ТАРИФЫ[к]["мес"],
            "usd_year": db.ТАРИФЫ[к]["год"],
        }
    return {"currency": "CUBE", "cube_usd": CUBE_USD,
            "month": _цена_подписки(1), "year": _цена_подписки(12),
            "usd_month": ПОДПИСКА_USD_МЕС,
            "plans": планы}


@app.post("/premium/buy")
async def premium_buy(body: PremiumBuyRequest, user=Depends(get_current_user)):
    """v=627 · Можно купить не только Силвер.

    Тариф и срок приходят отдельными полями. Старое приложение шлёт одно
    «months» — для него это Силвер, как и было, и цена считается прежней
    формулой. Новое шлёт plan и period, и тогда цена берётся из таблицы
    тарифов. Включаем ровно то, что оплачено: db.set_plan пишет тариф и
    срок, а не «просто премиум»."""
    тариф = str(body.plan or "silver").lower()
    if тариф not in db.ТАРИФЫ or тариф == "free":
        тариф = "silver"
    месяцев = max(1, min(12, int(body.months or 1)))
    период = str(body.period or "").lower()
    if период not in ("month", "year"):
        период = "year" if месяцев >= 12 else "month"
    месяцев = 12 if период == "year" else 1
    # Силвер без явного тарифа — прежняя формула, чтобы цена у не
    # обновлённого приложения не поехала.
    цена = (_цена_подписки(месяцев) if (тариф == "silver" and not body.plan)
            else _цена_тарифа_в_cube(тариф, период))
    if not цена:
        raise HTTPException(400, "Нет цены у этого тарифа")
    баланс = db.get_cube_balance(user["id"])
    if баланс < цена:
        raise HTTPException(402, f"Нужно {цена} CUBE, на балансе {int(баланс)}. "
                                 f"Пополнить можно в кошельке.")
    ушло = db.spend_cube(user["id"], цена, "premium",
                         f"{db.ТАРИФЫ[тариф]['имя']} на {месяцев} мес.")
    if not ушло or not ушло.get("ok"):
        if ушло and ушло.get("error") == "not enough":
            raise HTTPException(402, f"Нужно {цена} CUBE, на балансе "
                                     f"{int(ушло.get('balance') or 0)}")
        raise HTTPException(400, "Списание не прошло")
    # v=636 · Цену в запись об оплате кладём настоящую, по выбранному
    # тарифу и сроку. Прежде там всегда стояло 6.99 за месяц: взяв Голд на
    # год за 260 CUBE, человек видел в истории 83.88 — цену чужого тарифа.
    цена_usd = None
    try:
        цена_usd = float(db.тариф_цена(тариф, период))
    except Exception:
        цена_usd = None
    db.activate_premium(user["id"], месяцев, "cube", None, цена_usd)
    # v=627 · И сам тариф: без этой строчки за Голд списали бы, а дали
    # Силвер — старая подписка засчитывается именно как Силвер.
    try:
        db.set_plan(user["id"], тариф, период, "cube", None)
    except Exception:
        pass
    try:
        оплатил = db.ref_pay_on_subscription(user["id"], db.REF_PAID_CUBE)
    except Exception:
        оплатил = None
    if оплатил:
        try:
            await _notify_user(оплатил["inviter_id"], {
                "type": "referral_reward",
                "amount": оплатил["cube"],
                "friend": оплатил["friend_name"],
                "balance": db.get_cube_balance(оплатил["inviter_id"]),
            })
        except Exception:
            pass
    return {"ok": True, "months": месяцев, "spent": цена,
            "balance": db.get_cube_balance(user["id"])}


# ── Фигура товара: своё фото или ролик ──────────────────────────────────────

@app.post("/shop/{item_id}/shape-media")
async def shop_shape_media_add(item_id: int, file: UploadFile = File(...),
                               user=Depends(get_current_user)):
    строка = db.shop_get(item_id)
    if not строка:
        raise HTTPException(404, "Товар не найден")
    if int(строка.get("seller_id") or 0) != int(user["id"]):
        raise HTTPException(403, "Это не твой товар")
    куски, набрано = [], 0
    while True:
        кусок = await file.read(1024 * 1024)
        if not кусок:
            break
        набрано += len(кусок)
        if набрано > db.ШОП_МАКС_ФАЙЛ:
            raise HTTPException(413, f"Файл больше {db.ШОП_МАКС_ФАЙЛ // 1024 // 1024} МБ")
        куски.append(кусок)
    данные = b"".join(куски)
    if not данные:
        raise HTTPException(400, "Пустой файл")
    тип = (file.content_type or "application/octet-stream")[:120]
    if not (тип.startswith("image/") or тип.startswith("video/")):
        raise HTTPException(400, "Сюда идут только снимки и ролики")
    db.shop_shape_media_del(item_id)              # одна картинка на фигуру
    db.shop_media_add(item_id, "shape", (file.filename or "")[:200], тип, данные, 0)
    м = db.shop_shape_media(item_id)
    return {"ok": True, "url": f"/shop/{item_id}/media/{м['id']}" if м else ""}


@app.delete("/shop/{item_id}/shape-media")
async def shop_shape_media_drop(item_id: int, user=Depends(get_current_user)):
    строка = db.shop_get(item_id)
    if not строка or int(строка.get("seller_id") or 0) != int(user["id"]):
        raise HTTPException(403, "Это не твой товар")
    db.shop_shape_media_del(item_id)
    return {"ok": True}


@app.get("/shop/{item_id}/shape-media")
async def shop_shape_media_get(item_id: int):
    м = db.shop_shape_media(item_id)
    if not м:
        return {"url": "", "kind": ""}
    return {"url": f"/shop/{item_id}/media/{м['id']}", "kind": м.get("kind"),
            "mime": м.get("mime")}


# ══════════════════════════════════════════════════════════════════════════
#  ПАПКИ И ФАЙЛЫ ЧЕЛОВЕКА
#  ---------------------------------------------------------------------
#  v=592 · Папки в «Чатах» раньше жили только в браузере. Теперь папка,
#  список чатов в ней и файлы внутри лежат на сервере: видно с телефона и
#  не пропадает, если почистить данные сайта.
#
#  Текст файла (txt, csv, py, md, json, html) храним прямо в базе — он
#  маленький. Чужой файл (PDF, Word, Excel, снимок) идёт обычной загрузкой
#  в хранилище, а здесь остаётся только ссылка на него.
# ══════════════════════════════════════════════════════════════════════════

class FolderNewRequest(BaseModel):
    name: str = ""


class FolderEditRequest(BaseModel):
    name: Optional[str] = None
    chats: Optional[List[str]] = None


class FileNewRequest(BaseModel):
    name: str = ""
    kind: str = "txt"
    body: str = ""
    url: str = ""
    mime: str = ""
    size: int = 0


class FileSaveRequest(BaseModel):
    name: Optional[str] = None
    body: Optional[str] = None
    folder_id: Optional[int] = None


@app.get("/folders")
async def folders_list(user=Depends(get_current_user)):
    # v=723 · Если список не прочитался, отвечаем честной ошибкой, а не
    # пустым списком: пустой список страница показывает как «папок пока
    # нет», и поломка выглядит как обычная пустота.
    try:
        папки = db.папки_список(int(user["id"]))
    except Exception as сбой:
        raise HTTPException(500, f"Список папок не прочитался: {str(сбой)[:200]}")
    return {"folders": папки,
            "limits": {"folders": db.ПАПОК_НА_ЧЕЛОВЕКА,
                       "files": db.ФАЙЛОВ_НА_ЧЕЛОВЕКА,
                       "text": db.ФАЙЛ_МАКС_ТЕКСТ,
                       "kinds": list(db.ФАЙЛ_ВИДЫ)}}


@app.post("/folders")
async def folders_add(body: FolderNewRequest, user=Depends(get_current_user)):
    имя = (body.name or "").strip()
    if not имя:
        raise HTTPException(400, "Нужно название папки")
    _модерация(user, имя, "имя")
    # v=723 · Раньше любая внутренняя поломка превращалась здесь в
    # «Больше 50 папок не держим» — текст врал, и чинить было нечего.
    номер, беда = db.папка_создать(int(user["id"]), имя)
    if беда:
        вид, что = беда
        if вид == "предел":
            raise HTTPException(
                400,
                f"Папок уже {что}, больше {db.ПАПОК_НА_ЧЕЛОВЕКА} не держим — удали ненужные")
        raise HTTPException(500, f"Папка не создалась: {что}")
    return {"ok": True, "id": номер}


@app.patch("/folders/{folder_id}")
async def folders_edit(folder_id: int, body: FolderEditRequest,
                       user=Depends(get_current_user)):
    if body.name is not None:
        имя = (body.name or "").strip()
        if not имя:
            raise HTTPException(400, "Название пустое")
        _модерация(user, имя, "имя")
    ok = db.папка_поправить(int(user["id"]), folder_id,
                            name=body.name, chats=body.chats)
    if not ok:
        raise HTTPException(404, "Папка не найдена")
    return {"ok": True}


@app.delete("/folders/{folder_id}")
async def folders_drop(folder_id: int, user=Depends(get_current_user)):
    if not db.папка_удалить(int(user["id"]), folder_id):
        raise HTTPException(404, "Папка не найдена")
    return {"ok": True}


@app.get("/folders/{folder_id}/files")
async def folder_files(folder_id: int, user=Depends(get_current_user)):
    return {"files": db.файлы_списком(int(user["id"]), folder_id)}


@app.post("/folders/{folder_id}/files")
async def folder_file_add(folder_id: int, body: FileNewRequest,
                          user=Depends(get_current_user)):
    _лимит(user, "file")
    имя = (body.name or "").strip()
    if not имя:
        raise HTTPException(400, "Нужно имя файла")
    if len(body.body or "") > db.ФАЙЛ_МАКС_ТЕКСТ:
        raise HTTPException(413, f"Файл больше {db.ФАЙЛ_МАКС_ТЕКСТ // 1024} КБ")
    _модерация(user, имя, "имя")
    номер = db.файл_создать(int(user["id"]), folder_id, имя, body.kind,
                            body=body.body or "", url=body.url or "",
                            mime=body.mime or "", size=body.size or 0)
    if not номер:
        raise HTTPException(400, "Папка не найдена или файлов уже слишком много")
    return {"ok": True, "file": db.файл_один(int(user["id"]), номер)}


@app.get("/files/{file_id}")
async def file_one(file_id: int, user=Depends(get_current_user)):
    ф = db.файл_один(int(user["id"]), file_id)
    if not ф:
        raise HTTPException(404, "Файла нет")
    return ф


@app.patch("/files/{file_id}")
async def file_save(file_id: int, body: FileSaveRequest,
                    user=Depends(get_current_user)):
    if body.body is not None and len(body.body) > db.ФАЙЛ_МАКС_ТЕКСТ:
        raise HTTPException(413, f"Файл больше {db.ФАЙЛ_МАКС_ТЕКСТ // 1024} КБ")
    if body.name is not None:
        имя = (body.name or "").strip()
        if not имя:
            raise HTTPException(400, "Имя пустое")
        _модерация(user, имя, "имя")
    ok = db.файл_сохранить(int(user["id"]), file_id, name=body.name,
                           body=body.body, folder_id=body.folder_id)
    if not ok:
        raise HTTPException(404, "Файла нет")
    return {"ok": True, "file": db.файл_один(int(user["id"]), file_id)}


@app.delete("/files/{file_id}")
async def file_drop(file_id: int, user=Depends(get_current_user)):
    if not db.файл_удалить(int(user["id"]), file_id):
        raise HTTPException(404, "Файла нет")
    return {"ok": True}
