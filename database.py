"""
CubeWorld Database — dual-mode: PostgreSQL (Render) or SQLite (local)
  - DATABASE_URL env var  → psycopg2 / PostgreSQL
  - Otherwise             → sqlite3 (local dev)
"""
import os
import hashlib
import hmac
from datetime import datetime, timedelta

DATABASE_URL = os.getenv("DATABASE_URL")  # set automatically by Render

# ─────────────────────────────── connection ───────────────────────────────────

if DATABASE_URL:
    import psycopg2
    import psycopg2.extras

    def get_db():
        conn = psycopg2.connect(DATABASE_URL, cursor_factory=psycopg2.extras.RealDictCursor)
        conn.autocommit = False
        return conn

    # PostgreSQL: placeholder is %s, no row_factory needed
    _PH = "%s"
    _PG = True
else:
    import sqlite3
    DB_PATH = os.getenv("DB_PATH", "cubeworld.db")

    def get_db():
        conn = sqlite3.connect(DB_PATH, timeout=30, check_same_thread=False)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA journal_mode=WAL")
        conn.execute("PRAGMA foreign_keys=ON")
        # Встроенные LOWER и LIKE в SQLite понижают регистр только у латиницы,
        # поэтому поиск «аня» не находил «Аня». Отдаём это Python, который
        # умеет кириллицу. На PostgreSQL для того же служит ILIKE.
        conn.create_function(
            "CWLOWER", 1,
            lambda s: s.lower() if isinstance(s, str) else s)
        return conn

    _PH = "?"
    _PG = False


def _добавить_колонку(c, таблица: str, столбец: str, тип: str) -> bool:
    """Дописать колонку, если её ещё нет, и не испортить при этом сделку.

    ── Зачем отдельная сила ────────────────────────────────────────────
    На PostgreSQL неудачный «ALTER TABLE … ADD COLUMN» (а он неудачен
    всегда, начиная со второго запуска: колонка уже есть) обрывает ВСЮ
    открытую сделку. Любой следующий запрос по той же связи падает с
    «current transaction is aborted», и тот, кто нас позвал, получает
    пустой ответ на ровном месте — хотя данные целы и запрос правильный.
    На SQLite этого не видно вовсе: там неудачный ALTER ничего не рушит.

    Ловушка в этом файле уже описана — у posts, в _ensure_post_columns:
    «первый же откат отменяет все удачные до него». Там лекарство нашли,
    но каждая новая колонка заводилась заново и мимо него. Теперь оно
    одно на всех: удачный столбец закрепляем сразу, неудачный откатываем,
    и сделка остаётся живой в обоих случаях.

    Возвращает True, если колонку только что добавили.
    """
    try:
        c.execute("ALTER TABLE %s ADD COLUMN %s %s" % (таблица, столбец, тип))
        try:
            c.connection.commit()
        except Exception:
            pass
        return True
    except Exception:
        try:
            c.connection.rollback()
        except Exception:
            pass
        return False


def _q(sql: str) -> str:
    """Перевести запрос под PostgreSQL: ? → %s.

    И обязательно удвоить литеральный процент. psycopg2 сам разбирает
    строку запроса как шаблон форматирования, поэтому одиночный % внутри
    текста — например в LIKE 'Репост от %' — он принимает за начало
    подстановки и падает с «tuple index out of range». На SQLite того же
    запроса это не касается вовсе, так что ошибка вылезала бы только на
    сервере и только в одном месте — в ленте.

    Порядок важен: сначала удваиваем проценты, которые уже есть в тексте,
    и только потом подставляем свои %s.
    """
    if not _PG:
        return sql
    return sql.replace("%", "%%").replace("?", "%s")


def _row(r):
    return dict(r) if r else None


def _scalar(r, default=0):
    """First column of a fetchone() result.

    PostgreSQL uses RealDictCursor, so rows are dicts and r[0] raises
    KeyError: 0. SQLite gives sqlite3.Row, where r[0] works. This handles
    both — always use it instead of indexing a row by position.
    """
    if r is None:
        return default
    if hasattr(r, "keys"):
        keys = list(r.keys())
        return r[keys[0]] if keys else default
    return r[0]


def _fetchall(rows):
    return [dict(r) for r in rows]


def _fetchone(row):
    """Одна строка словарём. Отдельной такой мелочи в файле не было, а
       новым разделам она нужна ровно так же, как _fetchall."""
    return dict(row) if row is not None else None


def _now_expr():
    return "NOW()" if _PG else "datetime('now')"


def _now_plus_hours(h_param):
    """SQL expression for NOW + h hours (h_param is SQL parameter %s / ?)."""
    if _PG:
        return f"NOW() + ({h_param} || ' hours')::INTERVAL"
    return f"datetime('now','+'||{h_param}||' hours')"


def _ts(dt):
    """A datetime as the driver wants it.

    PostgreSQL takes the object. SQLite's implicit datetime adapter is
    deprecated in 3.12+ and writes microseconds, so write the same
    'YYYY-MM-DD HH:MM:SS' text that datetime('now') produces — otherwise
    expire_at comparisons are string compares against a different shape.
    """
    if dt is None or _PG:
        return dt
    if isinstance(dt, str):
        return dt
    return dt.strftime("%Y-%m-%d %H:%M:%S")


def _execute_returning(conn, sql, params=()):
    """INSERT ... RETURNING id  (PG) or lastrowid (SQLite)."""
    if _PG:
        c = conn.cursor()
        c.execute(sql + " RETURNING id", params)
        rid = c.fetchone()["id"]
        return rid
    else:
        c = conn.cursor()
        c.execute(sql, params)
        return c.lastrowid


# ──────────────────────────────── schema ──────────────────────────────────────

def init_db():
    conn = get_db()
    c = conn.cursor()

    if _PG:
        # PostgreSQL schema
        c.execute("""CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            key_hash TEXT NOT NULL UNIQUE,
            key_prefix TEXT NOT NULL,
            key_type TEXT NOT NULL DEFAULT 'free',
            display_name TEXT,
            avatar_url TEXT,
            cube_balance REAL NOT NULL DEFAULT 0.0,
            premium_expires_at TEXT,
            referrer_id INTEGER,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            last_seen TIMESTAMP NOT NULL DEFAULT NOW(),
            is_active INTEGER NOT NULL DEFAULT 1,
            account_type TEXT NOT NULL DEFAULT 'public'
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS sessions (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            token_hash TEXT NOT NULL UNIQUE,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            expires_at TIMESTAMP NOT NULL,
            last_used TIMESTAMP NOT NULL DEFAULT NOW(),
            user_agent TEXT,
            ip_hash TEXT
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS cube_transactions (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            amount REAL NOT NULL,
            tx_type TEXT NOT NULL,
            description TEXT,
            tx_hash TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS wallets (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            address TEXT NOT NULL UNIQUE,
            chain_id INTEGER NOT NULL DEFAULT 137,
            linked_at TIMESTAMP NOT NULL DEFAULT NOW()
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS key_upgrades (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            from_type TEXT NOT NULL,
            to_type TEXT NOT NULL,
            cube_spent REAL NOT NULL DEFAULT 0.0,
            tx_hash TEXT,
            upgraded_at TIMESTAMP NOT NULL DEFAULT NOW()
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS cubes (
            id SERIAL PRIMARY KEY,
            owner_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            name TEXT NOT NULL,
            description TEXT DEFAULT '',
            icon TEXT DEFAULT '📦',
            color TEXT DEFAULT '#0095F6',
            type TEXT NOT NULL DEFAULT 'public',
            life_hours INTEGER NOT NULL DEFAULT 24,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            expires_at TIMESTAMP NOT NULL,
            is_active INTEGER NOT NULL DEFAULT 1,
            cube_key TEXT UNIQUE
        )""")
        # Migrations: add columns if missing (PG-safe)
        for tbl, col, defn in [
            ('cubes', 'cube_key', 'TEXT'),
            ('users', 'username', 'TEXT UNIQUE'),
            ('cubes', 'handle', 'TEXT UNIQUE'),
            ('users', 'account_type', "TEXT NOT NULL DEFAULT 'public'"),
            ('users', 'my_universe', "TEXT NOT NULL DEFAULT '[]'"),
            # Форма объекта на карте: куб, кристалл, шар и так далее.
            ('cubes', 'shape', "TEXT NOT NULL DEFAULT 'cube'"),
            ('cubes', 'shape_img', 'TEXT'),
        ]:
            c.execute("""SELECT column_name FROM information_schema.columns
                         WHERE table_name=%s AND column_name=%s""", (tbl, col))
            if not c.fetchone():
                c.execute(f"ALTER TABLE {tbl} ADD COLUMN {col} {defn}")
        conn.commit()
        c.execute("""CREATE TABLE IF NOT EXISTS groups (
            id SERIAL PRIMARY KEY,
            owner_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            name TEXT NOT NULL,
            description TEXT DEFAULT '',
            icon TEXT DEFAULT '👥',
            type TEXT NOT NULL DEFAULT 'public',
            handle TEXT UNIQUE,
            group_key TEXT UNIQUE,
            member_count INTEGER NOT NULL DEFAULT 1,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS group_messages (
            id SERIAL PRIMARY KEY,
            group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            display_name TEXT,
            content TEXT NOT NULL,
            msg_type TEXT NOT NULL DEFAULT 'text',
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS group_members (
            group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            joined_at TIMESTAMP NOT NULL DEFAULT NOW(),
            PRIMARY KEY (group_id, user_id)
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS cube_bans (
            cube_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            banned_at TIMESTAMP NOT NULL DEFAULT NOW(),
            ip_hash TEXT DEFAULT NULL,
            device_id TEXT DEFAULT NULL,
            PRIMARY KEY (cube_id, user_id)
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS cube_visitors (
            cube_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            display_name TEXT,
            last_visit TIMESTAMP NOT NULL DEFAULT NOW(),
            PRIMARY KEY (cube_id, user_id)
        )""")
        # PG migration: add ip_hash + device_id to cube_bans if missing
        for _col, _def in [('ip_hash', 'TEXT DEFAULT NULL'), ('device_id', 'TEXT DEFAULT NULL')]:
            c.execute("SELECT column_name FROM information_schema.columns WHERE table_name='cube_bans' AND column_name=%s", (_col,))
            if not c.fetchone():
                try: c.execute(f"ALTER TABLE cube_bans ADD COLUMN IF NOT EXISTS {_col} {_def}")
                except Exception: pass
        conn.commit()
        c.execute("""CREATE TABLE IF NOT EXISTS messages (
            id SERIAL PRIMARY KEY,
            cube_id INTEGER NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            display_name TEXT,
            content TEXT NOT NULL,
            msg_type TEXT NOT NULL DEFAULT 'text',
            reply_to_id INTEGER,
            expires_at TIMESTAMP,
            file_name TEXT,
            file_size TEXT,
            file_data TEXT,
            duration INTEGER,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS message_reactions (
            id SERIAL PRIMARY KEY,
            message_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            display_name TEXT,
            emoji TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            UNIQUE(message_id, user_id, emoji)
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS direct_messages (
            id SERIAL PRIMARY KEY,
            from_user_id INTEGER NOT NULL,
            to_user_id INTEGER NOT NULL,
            content TEXT NOT NULL,
            msg_type TEXT NOT NULL DEFAULT 'text',
            file_name TEXT,
            file_size TEXT,
            file_data TEXT,
            duration INTEGER,
            reply_to_id INTEGER,
            expires_at TIMESTAMP,
            read_at TIMESTAMP,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            cube_id INTEGER NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            display_name TEXT,
            content TEXT NOT NULL,
            likes INTEGER NOT NULL DEFAULT 0,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS post_likes (
            post_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            PRIMARY KEY (post_id, user_id)
        )""")
        # Video feed columns (PG safe ADD IF NOT EXISTS)
        for _col, _def in [('video_url','TEXT'), ('description','TEXT'), ('music','TEXT'),
                            ('views','INTEGER NOT NULL DEFAULT 0'), ('comment_count','INTEGER NOT NULL DEFAULT 0'), ('title',"TEXT DEFAULT ''"), ('tags',"TEXT DEFAULT '[]'"),
                            ('stream_id',"TEXT DEFAULT ''"), ('hls_url',"TEXT DEFAULT ''"), ('poster_url',"TEXT DEFAULT ''")]:
            try: c.execute(f"ALTER TABLE posts ADD COLUMN IF NOT EXISTS {_col} {_def}")
            except: pass
        c.execute("""CREATE TABLE IF NOT EXISTS follows (
            follower_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            following_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            PRIMARY KEY (follower_id, following_id)
        )""")
        # Счётчики на сутки — сюда упираются лимиты против накруток.
        c.execute("""CREATE TABLE IF NOT EXISTS rate_counters (
            user_id INTEGER NOT NULL,
            action TEXT NOT NULL,
            day TEXT NOT NULL,
            n INTEGER NOT NULL DEFAULT 0,
            PRIMARY KEY (user_id, action, day)
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS post_comments (
            id SERIAL PRIMARY KEY,
            post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            display_name TEXT,
            content TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS signals (
            id SERIAL PRIMARY KEY,
            cube_id INTEGER NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            display_name TEXT,
            ticker TEXT NOT NULL,
            direction TEXT NOT NULL DEFAULT 'LONG',
            entry_price REAL,
            tp_price REAL,
            sl_price REAL,
            content TEXT DEFAULT '',
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS user_activity (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            date TEXT NOT NULL,
            online_minutes INTEGER NOT NULL DEFAULT 0,
            messages_sent INTEGER NOT NULL DEFAULT 0,
            posts_created INTEGER NOT NULL DEFAULT 0,
            reactions_received INTEGER NOT NULL DEFAULT 0,
            voice_messages INTEGER NOT NULL DEFAULT 0,
            invites_converted INTEGER NOT NULL DEFAULT 0,
            score REAL NOT NULL DEFAULT 0,
            UNIQUE(user_id, date)
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS premium_subscriptions (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            started_at TIMESTAMP NOT NULL DEFAULT NOW(),
            expires_at TIMESTAMP NOT NULL,
            price_usd REAL NOT NULL DEFAULT 6.99,
            payment_method TEXT,
            tx_hash TEXT,
            status TEXT NOT NULL DEFAULT 'active'
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS reward_pool (
            id INTEGER PRIMARY KEY,
            total_usd REAL NOT NULL DEFAULT 0,
            used_usd REAL NOT NULL DEFAULT 0,
            monthly_usd REAL NOT NULL DEFAULT 0
        )""")
        c.execute("""INSERT INTO reward_pool (id,total_usd,used_usd,monthly_usd)
                     VALUES (1,0,0,0)
                     ON CONFLICT (id) DO NOTHING""")
        c.execute("""CREATE TABLE IF NOT EXISTS reward_claims (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            month TEXT NOT NULL,
            score REAL NOT NULL DEFAULT 0,
            usd_amount REAL NOT NULL DEFAULT 0,
            wallet_address TEXT,
            status TEXT NOT NULL DEFAULT 'pending',
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            paid_at TIMESTAMP,
            UNIQUE(user_id, month)
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS pending_keys (
            id SERIAL PRIMARY KEY,
            key_hash TEXT NOT NULL UNIQUE,
            key_prefix TEXT NOT NULL,
            key_type TEXT NOT NULL DEFAULT 'free',
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            expires_at TIMESTAMP NOT NULL
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS comment_likes (
            id SERIAL PRIMARY KEY,
            comment_id INTEGER NOT NULL REFERENCES post_comments(id) ON DELETE CASCADE,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            type TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            UNIQUE(comment_id, user_id)
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS comment_replies (
            id SERIAL PRIMARY KEY,
            comment_id INTEGER NOT NULL REFERENCES post_comments(id) ON DELETE CASCADE,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            display_name TEXT,
            content TEXT NOT NULL,
            expire_at TIMESTAMP,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS reply_likes (
            id SERIAL PRIMARY KEY,
            reply_id INTEGER NOT NULL REFERENCES comment_replies(id) ON DELETE CASCADE,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            type TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            UNIQUE(reply_id, user_id)
        )""")
        conn.commit()

        # Late migrations. These run AFTER every CREATE TABLE above, because on
        # PostgreSQL a single failed statement aborts the whole transaction and
        # every following statement dies with InFailedSqlTransaction. Each one
        # gets its own SAVEPOINT so a failure stays contained.
        def _pg_add_col(tbl, col, defn):
            c.execute("""SELECT column_name FROM information_schema.columns
                         WHERE table_name=%s AND column_name=%s""", (tbl, col))
            if c.fetchone():
                return
            try:
                c.execute("SAVEPOINT _addcol")
                c.execute(f"ALTER TABLE {tbl} ADD COLUMN {col} {defn}")
                c.execute("RELEASE SAVEPOINT _addcol")
            except Exception:
                c.execute("ROLLBACK TO SAVEPOINT _addcol")

        for _tbl, _col, _defn in [
            ('groups', 'group_key', 'TEXT UNIQUE'),
            ('posts', 'post_type', "TEXT NOT NULL DEFAULT 'short'"),
            ('posts', 'image_url', 'TEXT'),
            ('posts', 'view_count', 'INTEGER NOT NULL DEFAULT 0'),
            ('post_comments', 'expire_at', 'TIMESTAMP'),
            ('group_messages', 'expires_at', 'TIMESTAMP'),
            # v=550 · Метка «изменено» жила только в телефоне: страница
            # перечитывала переписку с сервера и метка исчезала. Теперь
            # правка помнится в базе и видна с любого устройства.
            ('direct_messages', 'edited', 'INTEGER NOT NULL DEFAULT 0'),
            ('group_messages', 'edited', 'INTEGER NOT NULL DEFAULT 0'),
            # v=610 · Подпись под фотографией, роликом и файлом. В
            # «content» у них лежит АДРЕС файла, туда текст не положить —
            # картинка перестала бы открываться. Поэтому отдельный столбец.
            ('direct_messages', 'caption', "TEXT NOT NULL DEFAULT ''"),
        ]:
            _pg_add_col(_tbl, _col, _defn)
        conn.commit()
    else:
        # SQLite schema (original)
        c.execute("""CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key_hash TEXT NOT NULL UNIQUE,
            key_prefix TEXT NOT NULL,
            key_type TEXT NOT NULL DEFAULT 'free',
            display_name TEXT,
            avatar_url TEXT,
            cube_balance REAL NOT NULL DEFAULT 0.0,
            premium_expires_at TEXT,
            referrer_id INTEGER,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            last_seen TEXT NOT NULL DEFAULT (datetime('now')),
            is_active INTEGER NOT NULL DEFAULT 1,
            account_type TEXT NOT NULL DEFAULT 'public',
            my_universe TEXT NOT NULL DEFAULT '[]'
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            token_hash TEXT NOT NULL UNIQUE,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            expires_at TEXT NOT NULL,
            last_used TEXT NOT NULL DEFAULT (datetime('now')),
            user_agent TEXT,
            ip_hash TEXT
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS cube_transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            amount REAL NOT NULL,
            tx_type TEXT NOT NULL,
            description TEXT,
            tx_hash TEXT,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS wallets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            address TEXT NOT NULL UNIQUE,
            chain_id INTEGER NOT NULL DEFAULT 137,
            linked_at TEXT NOT NULL DEFAULT (datetime('now'))
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS key_upgrades (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            from_type TEXT NOT NULL,
            to_type TEXT NOT NULL,
            cube_spent REAL NOT NULL DEFAULT 0.0,
            tx_hash TEXT,
            upgraded_at TEXT NOT NULL DEFAULT (datetime('now'))
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS cubes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            owner_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            name TEXT NOT NULL,
            description TEXT DEFAULT '',
            icon TEXT DEFAULT '📦',
            color TEXT DEFAULT '#0095F6',
            type TEXT NOT NULL DEFAULT 'public',
            life_hours INTEGER NOT NULL DEFAULT 24,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            expires_at TEXT NOT NULL,
            is_active INTEGER NOT NULL DEFAULT 1,
            cube_key TEXT UNIQUE
        )""")
        # Migrations: add missing columns (SQLite)
        def _sqlite_add_col(table, col, defn):
            cols = [row[1] for row in c.execute(f"PRAGMA table_info({table})").fetchall()]
            if col not in cols:
                # SQLite refuses ALTER TABLE ... ADD COLUMN ... UNIQUE.
                # Add the column plain, then enforce uniqueness with an index.
                plain = defn.replace("UNIQUE", "").strip()
                c.execute(f"ALTER TABLE {table} ADD COLUMN {col} {plain}")
                if "UNIQUE" in defn.upper():
                    c.execute(
                        f"CREATE UNIQUE INDEX IF NOT EXISTS "
                        f"ux_{table}_{col} ON {table}({col})"
                    )
        _sqlite_add_col('cubes', 'cube_key', 'TEXT UNIQUE')
        _sqlite_add_col('users', 'username', 'TEXT UNIQUE')
        _sqlite_add_col('cubes', 'handle', 'TEXT UNIQUE')
        _sqlite_add_col('cubes', 'shape', "TEXT NOT NULL DEFAULT 'cube'")
        _sqlite_add_col('cubes', 'shape_img', 'TEXT')
        _sqlite_add_col('users', 'account_type', "TEXT NOT NULL DEFAULT 'public'")
        _sqlite_add_col('users', 'my_universe', "TEXT NOT NULL DEFAULT '[]'")
        # groups/posts may not exist yet on a fresh DB — safe to ignore, re-run after table creation
        try: _sqlite_add_col('groups', 'group_key', 'TEXT UNIQUE')
        except Exception: pass
        try: _sqlite_add_col('posts', 'post_type', "TEXT NOT NULL DEFAULT 'short'")
        except Exception: pass
        try: _sqlite_add_col('posts', 'image_url', 'TEXT')
        except Exception: pass
        try: _sqlite_add_col('posts', 'view_count', 'INTEGER NOT NULL DEFAULT 0')
        except Exception: pass
        conn.commit()
        c.execute("""CREATE TABLE IF NOT EXISTS groups (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            owner_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            name TEXT NOT NULL,
            description TEXT DEFAULT '',
            icon TEXT DEFAULT '👥',
            type TEXT NOT NULL DEFAULT 'public',
            handle TEXT UNIQUE,
            group_key TEXT UNIQUE,
            member_count INTEGER NOT NULL DEFAULT 1,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS group_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            display_name TEXT,
            content TEXT NOT NULL,
            msg_type TEXT NOT NULL DEFAULT 'text',
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS group_members (
            group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            joined_at TEXT NOT NULL DEFAULT (datetime('now')),
            PRIMARY KEY (group_id, user_id)
        )""")
        # Таймер исчезновения у сообщений в группе. Колонки не было вовсе,
        # поэтому выбранный срок было некуда записать и сообщения оставались
        # навсегда. Добавляем здесь: выше по коду таблицы ещё не существует.
        try: _sqlite_add_col('group_messages', 'expires_at', 'TEXT')
        except Exception: pass
        c.execute("""CREATE TABLE IF NOT EXISTS cube_bans (
            cube_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            banned_at TEXT NOT NULL DEFAULT (datetime('now')),
            PRIMARY KEY (cube_id, user_id)
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS cube_visitors (
            cube_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            display_name TEXT,
            last_visit TEXT NOT NULL DEFAULT (datetime('now')),
            PRIMARY KEY (cube_id, user_id)
        )""")
        conn.commit()
        c.execute("""CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cube_id INTEGER NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            display_name TEXT,
            content TEXT NOT NULL,
            msg_type TEXT NOT NULL DEFAULT 'text',
            reply_to_id INTEGER,
            expires_at TEXT,
            file_name TEXT,
            file_size TEXT,
            file_data TEXT,
            duration INTEGER,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS message_reactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            message_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            display_name TEXT,
            emoji TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            UNIQUE(message_id, user_id, emoji)
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS direct_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            from_user_id INTEGER NOT NULL,
            to_user_id INTEGER NOT NULL,
            content TEXT NOT NULL,
            msg_type TEXT NOT NULL DEFAULT 'text',
            file_name TEXT,
            file_size TEXT,
            file_data TEXT,
            duration INTEGER,
            reply_to_id INTEGER,
            expires_at TEXT,
            read_at TEXT,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cube_id INTEGER NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            display_name TEXT,
            content TEXT NOT NULL,
            likes INTEGER NOT NULL DEFAULT 0,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS post_likes (
            post_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            PRIMARY KEY (post_id, user_id)
        )""")
        # cube_bans: add ip_hash + device_id for cross-account blocking
        try: _sqlite_add_col('cube_bans', 'ip_hash', 'TEXT DEFAULT NULL')
        except Exception: pass
        try: _sqlite_add_col('cube_bans', 'device_id', 'TEXT DEFAULT NULL')
        except Exception: pass
        # Video feed extras (migrations so existing DBs get new columns)
        _sqlite_add_col('posts', 'video_url', 'TEXT DEFAULT NULL')
        _sqlite_add_col('posts', 'description', 'TEXT DEFAULT NULL')
        _sqlite_add_col('posts', 'music', 'TEXT DEFAULT NULL')
        _sqlite_add_col('posts', 'views', 'INTEGER NOT NULL DEFAULT 0')
        _sqlite_add_col('posts', 'comment_count', 'INTEGER NOT NULL DEFAULT 0')
        # create_video_post writes these on the very first post, and unlike the
        # read paths it never called _ensure_post_columns — so without them here
        # a fresh local DB failed the first publish with
        # "table posts has no column named title".
        _sqlite_add_col('posts', 'post_type', "TEXT NOT NULL DEFAULT 'short'")
        _sqlite_add_col('posts', 'image_url', "TEXT DEFAULT ''")
        _sqlite_add_col('posts', 'title', "TEXT DEFAULT ''")
        _sqlite_add_col('posts', 'tags', "TEXT DEFAULT '[]'")
        _sqlite_add_col('posts', 'view_count', 'INTEGER NOT NULL DEFAULT 0')
        c.execute("""CREATE TABLE IF NOT EXISTS follows (
            follower_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            following_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            PRIMARY KEY (follower_id, following_id)
        )""")
        # Счётчики на сутки — сюда упираются лимиты против накруток.
        c.execute("""CREATE TABLE IF NOT EXISTS rate_counters (
            user_id INTEGER NOT NULL,
            action TEXT NOT NULL,
            day TEXT NOT NULL,
            n INTEGER NOT NULL DEFAULT 0,
            PRIMARY KEY (user_id, action, day)
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS post_comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            display_name TEXT,
            content TEXT NOT NULL,
            expire_at TEXT,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )""")
        # Comment threads + reactions (mirror of the PostgreSQL schema above).
        c.execute("""CREATE TABLE IF NOT EXISTS comment_likes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            comment_id INTEGER NOT NULL REFERENCES post_comments(id) ON DELETE CASCADE,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            type TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            UNIQUE(comment_id, user_id)
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS comment_replies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            comment_id INTEGER NOT NULL REFERENCES post_comments(id) ON DELETE CASCADE,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            display_name TEXT,
            content TEXT NOT NULL,
            expire_at TEXT,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS reply_likes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            reply_id INTEGER NOT NULL REFERENCES comment_replies(id) ON DELETE CASCADE,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            type TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            UNIQUE(reply_id, user_id)
        )""")
        # Older local DBs predate the comment timer.
        _sqlite_add_col('post_comments', 'expire_at', 'TEXT')
        _sqlite_add_col('comment_replies', 'expire_at', 'TEXT')
        conn.commit()
        c.execute("""CREATE TABLE IF NOT EXISTS signals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cube_id INTEGER NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            display_name TEXT,
            ticker TEXT NOT NULL,
            direction TEXT NOT NULL DEFAULT 'LONG',
            entry_price REAL,
            tp_price REAL,
            sl_price REAL,
            content TEXT DEFAULT '',
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS user_activity (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            date TEXT NOT NULL,
            online_minutes INTEGER NOT NULL DEFAULT 0,
            messages_sent INTEGER NOT NULL DEFAULT 0,
            posts_created INTEGER NOT NULL DEFAULT 0,
            reactions_received INTEGER NOT NULL DEFAULT 0,
            voice_messages INTEGER NOT NULL DEFAULT 0,
            invites_converted INTEGER NOT NULL DEFAULT 0,
            score REAL NOT NULL DEFAULT 0,
            UNIQUE(user_id, date)
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS premium_subscriptions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            started_at TEXT NOT NULL DEFAULT (datetime('now')),
            expires_at TEXT NOT NULL,
            price_usd REAL NOT NULL DEFAULT 6.99,
            payment_method TEXT,
            tx_hash TEXT,
            status TEXT NOT NULL DEFAULT 'active'
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS reward_pool (
            id INTEGER PRIMARY KEY,
            total_usd REAL NOT NULL DEFAULT 0,
            used_usd REAL NOT NULL DEFAULT 0,
            monthly_usd REAL NOT NULL DEFAULT 0
        )""")
        c.execute("INSERT OR IGNORE INTO reward_pool (id,total_usd,used_usd,monthly_usd) VALUES (1,0,0,0)")
        c.execute("""CREATE TABLE IF NOT EXISTS reward_claims (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            month TEXT NOT NULL,
            score REAL NOT NULL DEFAULT 0,
            usd_amount REAL NOT NULL DEFAULT 0,
            wallet_address TEXT,
            status TEXT NOT NULL DEFAULT 'pending',
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            paid_at TEXT,
            UNIQUE(user_id, month)
        )""")
        # Safe migrations for existing SQLite DBs
        for col_sql in [
            "ALTER TABLE users ADD COLUMN premium_expires_at TEXT",
            "ALTER TABLE users ADD COLUMN referrer_id INTEGER",
            # v=584 · Цвет значка на аватаре. Значок на аватаре — смайл, и
            # цветной шрифт рисует его своими красками; наш цвет живёт
            # рядом, отдельной строкой вида «#2f80ed». Пусто — как раньше.
            "ALTER TABLE users ADD COLUMN avatar_color TEXT DEFAULT ''",
            "ALTER TABLE messages ADD COLUMN msg_type TEXT NOT NULL DEFAULT 'text'",
            "ALTER TABLE messages ADD COLUMN reply_to_id INTEGER",
            "ALTER TABLE messages ADD COLUMN expires_at TEXT",
            "ALTER TABLE messages ADD COLUMN file_name TEXT",
            "ALTER TABLE messages ADD COLUMN file_size TEXT",
            "ALTER TABLE messages ADD COLUMN file_data TEXT",
            "ALTER TABLE messages ADD COLUMN duration INTEGER",
        ]:
            try: c.execute(col_sql)
            except Exception: pass
        # Re-run migrations for groups/posts now that tables exist
        try: _sqlite_add_col('groups', 'group_key', 'TEXT UNIQUE')
        except Exception: pass
        try: _sqlite_add_col('posts', 'post_type', "TEXT NOT NULL DEFAULT 'short'")
        except Exception: pass
        try: _sqlite_add_col('posts', 'image_url', 'TEXT')
        except Exception: pass
        try: _sqlite_add_col('posts', 'view_count', 'INTEGER NOT NULL DEFAULT 0')
        except Exception: pass
        # cube_bans: ip_hash + device_id (cross-account block)
        try: _sqlite_add_col('cube_bans', 'ip_hash', 'TEXT DEFAULT NULL')
        except Exception: pass
        try: _sqlite_add_col('cube_bans', 'device_id', 'TEXT DEFAULT NULL')
        except Exception: pass
        # v=550 · Правка сообщения помнится в базе (тот же список есть для PG).
        try: _sqlite_add_col('direct_messages', 'edited', 'INTEGER NOT NULL DEFAULT 0')
        except Exception: pass
        # v=610 · Подпись под медиа — см. пояснение у постгресовой ветки.
        try: _sqlite_add_col('direct_messages', 'caption', "TEXT NOT NULL DEFAULT ''")
        except Exception: pass
        try: _sqlite_add_col('group_messages', 'edited', 'INTEGER NOT NULL DEFAULT 0')
        except Exception: pass
        c.execute("""CREATE TABLE IF NOT EXISTS pending_keys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key_hash TEXT NOT NULL UNIQUE,
            key_prefix TEXT NOT NULL,
            key_type TEXT NOT NULL DEFAULT 'free',
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            expires_at TEXT NOT NULL
        )""")

    # Performance indexes (both PG and SQLite)
    index_ddl = [
        "CREATE INDEX IF NOT EXISTS idx_messages_cube_id ON messages(cube_id)",
        "CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(cube_id, created_at DESC)",
        "CREATE INDEX IF NOT EXISTS idx_cubes_owner ON cubes(owner_id)",
        "CREATE INDEX IF NOT EXISTS idx_cubes_active_expires ON cubes(is_active, expires_at)",
        "CREATE INDEX IF NOT EXISTS idx_dm_from_to ON direct_messages(from_user_id, to_user_id)",
        "CREATE INDEX IF NOT EXISTS idx_dm_to ON direct_messages(to_user_id)",
        "CREATE INDEX IF NOT EXISTS idx_dm_created ON direct_messages(created_at DESC)",
        "CREATE INDEX IF NOT EXISTS idx_posts_cube ON posts(cube_id)",
        "CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at DESC)",
        "CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id)",
        "CREATE INDEX IF NOT EXISTS idx_users_last_seen ON users(last_seen DESC)",
        "CREATE INDEX IF NOT EXISTS idx_group_members_user ON group_members(user_id)",
        "CREATE INDEX IF NOT EXISTS idx_signals_cube ON signals(cube_id)",
    ]
    for ddl in index_ddl:
        try: c.execute(ddl)
        except Exception: pass

    # Backfill cube_visitors from messages table so kick-search works immediately
    # (cube_visitors was added later; this runs on every startup but is idempotent)
    try:
        if _PG:
            c.execute("""
                INSERT INTO cube_visitors (cube_id, user_id, display_name, last_visit)
                SELECT DISTINCT ON (m.cube_id, m.user_id)
                       m.cube_id, m.user_id, u.display_name, m.created_at
                FROM messages m
                JOIN users u ON u.id = m.user_id
                WHERE m.user_id IS NOT NULL AND u.is_active = 1
                ORDER BY m.cube_id, m.user_id, m.created_at DESC
                ON CONFLICT (cube_id, user_id) DO NOTHING
            """)
        else:
            c.execute("""
                INSERT OR IGNORE INTO cube_visitors (cube_id, user_id, display_name, last_visit)
                SELECT m.cube_id, m.user_id, u.display_name, MAX(m.created_at)
                FROM messages m
                JOIN users u ON u.id = m.user_id
                WHERE m.user_id IS NOT NULL AND u.is_active = 1
                GROUP BY m.cube_id, m.user_id
            """)
    except Exception:
        pass  # Non-fatal: messages table may not exist yet on fresh DB

    conn.commit()
    conn.close()
    _переметить_старые_метки()


# ── Auth ──────────────────────────────────────────────────────────────────────

def _мета(c, имя, значение=None):
    """Крошечная табличка «сделано/не сделано» для одноразовых переделок."""
    c.execute("""CREATE TABLE IF NOT EXISTS cw_мета (
                     имя TEXT PRIMARY KEY, значение TEXT)""")
    if значение is None:
        c.execute(_q("SELECT значение FROM cw_мета WHERE имя=?"), (имя,))
        р = c.fetchone()
        if not р:
            return None
        return (dict(р)["значение"] if hasattr(р, "keys") else р[0])
    if _PG:
        c.execute("INSERT INTO cw_мета (имя,значение) VALUES (%s,%s) "
                  "ON CONFLICT (имя) DO UPDATE SET значение=EXCLUDED.значение",
                  (имя, str(значение)))
    else:
        c.execute("INSERT OR REPLACE INTO cw_мета (имя,значение) VALUES (?,?)",
                  (имя, str(значение)))
    return значение


def _переметить_старые_метки():
    """Один раз: заменить открытые метки, взятые из начала ключа.

    У всех, кто завёлся до этой правки, key_prefix — это буквально первые
    девять знаков их ключа. Отпечаток ключа теперь дорогой (scrypt), но
    четыре открытых знака рядом с ним сокращали перебор в два миллиона
    раз, и вся работа пошла бы прахом. Метки заменяются на случайные:
    они ни на что не влияют, кроме надписи в профиле и поиске.

    Делается ровно один раз, отметка в cw_мета. Повторные запуски сервера
    метки больше не трогают — иначе люди меняли бы имя при каждом пуске.
    """
    import secrets as _sec
    АЛФ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    try:
        conn = get_db(); c = conn.cursor()
        if _мета(c, "метки_отвязаны"):
            conn.commit(); conn.close(); return 0
        c.execute("SELECT id FROM users")
        люди = [(dict(r)["id"] if hasattr(r, "keys") else r[0]) for r in c.fetchall()]
        for uid in люди:
            метка = "CUBE-" + "".join(_sec.choice(АЛФ) for _ in range(4))
            c.execute(_q("UPDATE users SET key_prefix=? WHERE id=?"), (метка, uid))
        c.execute("SELECT key_hash FROM pending_keys")
        ждут = [(dict(r)["key_hash"] if hasattr(r, "keys") else r[0]) for r in c.fetchall()]
        for h in ждут:
            метка = "CUBE-" + "".join(_sec.choice(АЛФ) for _ in range(4))
            c.execute(_q("UPDATE pending_keys SET key_prefix=? WHERE key_hash=?"), (метка, h))
        _мета(c, "метки_отвязаны", "1")
        conn.commit(); conn.close()
        print("[метки] отвязаны от ключей: людей %d, ожидающих ключей %d"
              % (len(люди), len(ждут)))
        return len(люди)
    except Exception as e:
        try:
            if _PG: conn.rollback()
            conn.close()
        except Exception:
            pass
        print("[метки] не вышло отвязать:", e)
        return -1

def hash_key_legacy(raw_key):
    """Как считалось раньше: один чистый sha256."""
    return hashlib.sha256(raw_key.encode()).hexdigest()


# Насколько дорого считать хеш ключа. 2**14 — это примерно 16 МБ памяти и
# 50–80 мс на один счёт. Для входа это незаметно (вход бывает редко, и его
# всё равно держит ограничитель попыток), а для перебора — разница в жизнь.
_SCRYPT_N = int(os.environ.get("KEY_SCRYPT_N", 1 << 14))
_СОЛЬ_БАЗА = b"cubeworld-key-v1"
# Необязательный «перец». Если он задан, украденной базы мало даже
# теоретически: без перца хеши не пересчитать. Если не задан — защита всё
# равно работает, просто без этого запаса. Терять перец нельзя: ключи,
# посчитанные с ним, другим перцем не найдутся.
_ПЕРЕЦ = (os.environ.get("KEY_PEPPER") or "").encode()


def hash_key(raw_key):
    """Отпечаток ключа для хранения в базе.

    Раньше здесь стоял чистый sha256. Чистый sha256 от короткого ключа —
    это не защита, а отсрочка: ключ состоит из 12 знаков алфавита A–Z0–9,
    то есть всего 36**12 ≈ 4.7·10**18 вариантов. Одна современная карта
    считает порядка 5·10**10 таких хешей в секунду — три года на один
    ключ. Но если утечёт ВСЯ таблица, перебор идёт сразу против всех
    хешей: каждый посчитанный вариант проверяется по множеству. Со сотней
    тысяч людей «какой-нибудь» ключ находится уже за минуты.

    scrypt разворачивает это обратно: он намеренно медленный и требует
    памяти, перебор падает с 5·10**10 до примерно 10**4 в секунду. Даже
    против всей таблицы разом это десятки лет.

    Соль постоянная, а не своя у каждого: иначе по хешу нельзя было бы
    искать, и вход превратился бы в перебор всей таблицы. Для короткого
    случайного ключа это не беда — одинаковых ключей не бывает, а радужная
    таблица под такой алфавит всё равно не строится.
    """
    try:
        соль = _СОЛЬ_БАЗА + _ПЕРЕЦ
        return hashlib.scrypt(str(raw_key).encode(), salt=соль,
                              n=_SCRYPT_N, r=8, p=1, dklen=32).hex()
    except Exception:
        # Если в сборке почему-то нет scrypt — не падаем и не запираем вход.
        return hash_key_legacy(raw_key)


def _переложить_ключ(user_id, новый_хеш, префикс):
    """Тихо переписать старый отпечаток на новый при первом входе."""
    try:
        conn = get_db(); c = conn.cursor()
        c.execute(_q("UPDATE users SET key_hash=? WHERE id=?"),
                  (новый_хеш, int(user_id)))
        conn.commit(); conn.close()
        return True
    except Exception:
        try: conn.close()
        except Exception: pass
        return False


def найти_по_ключу(raw_key):
    """Человек по ключу. Возвращает (человек или None, новый отпечаток).

    Пока в базе есть записи со старым чистым sha256, вход проверяет и его.
    Нашли по старому — сразу переписываем на новый, и со второго входа
    старого отпечатка у этого человека уже нет. Через месяц работы
    площадки проверку по старому можно будет убрать совсем.
    """
    новый = hash_key(raw_key)
    ч = get_user_by_key_hash(новый)
    if ч:
        return ч, новый
    стар = hash_key_legacy(raw_key)
    if стар != новый:
        ч = get_user_by_key_hash(стар)
        if ч:
            _переложить_ключ(ч["id"], новый, ч.get("key_prefix") or "")
            return get_user_by_id(ч["id"]) or ч, новый
    return None, новый


def ключ_подходит(человек, raw_key) -> bool:
    """Тот ли это ключ. Сравнение идёт без утечки по времени."""
    было = str((человек or {}).get("key_hash") or "")
    if not было:
        return False
    for считать in (hash_key, hash_key_legacy):
        try:
            if hmac.compare_digest(было, считать(raw_key)):
                return True
        except Exception:
            pass
    return False


def найти_ожидающий_ключ(raw_key):
    """То же самое для ключа, по которому ещё не входили."""
    новый = hash_key(raw_key)
    п = get_pending_key_by_hash(новый)
    if п:
        return п, новый
    стар = hash_key_legacy(raw_key)
    if стар != новый:
        п = get_pending_key_by_hash(стар)
        if п:
            # Переписываем сразу, чтобы дальше работал только новый отпечаток.
            try:
                conn = get_db(); c = conn.cursor()
                c.execute(_q("UPDATE pending_keys SET key_hash=? WHERE key_hash=?"),
                          (новый, стар))
                conn.commit(); conn.close()
            except Exception:
                try: conn.close()
                except Exception: pass
            return п, новый
    return None, новый

# ── Pending keys (not-yet-activated keys) ─────────────────────────────────────

def create_pending_key(key_hash, key_prefix, key_type="free", hours=24):
    """Ключ, по которому ещё не входили. Обычный живёт сутки, подарочный —
    дольше: ключ на 24 часа в подарок не годится."""
    hours = max(1, min(int(hours or 24), 24 * 365))
    conn = get_db(); c = conn.cursor()
    if _PG:
        c.execute("INSERT INTO pending_keys (key_hash,key_prefix,key_type,expires_at) "
                  "VALUES (%s,%s,%s,NOW() + (%s || ' hours')::interval)",
                  (key_hash, key_prefix, key_type, str(hours)))
    else:
        c.execute("INSERT INTO pending_keys (key_hash,key_prefix,key_type,expires_at) "
                  "VALUES (?,?,?,datetime('now','+' || ? || ' hours'))",
                  (key_hash, key_prefix, key_type, str(hours)))
    conn.commit(); conn.close()

def get_pending_key_by_hash(key_hash):
    conn = get_db(); c = conn.cursor()
    if _PG:
        c.execute(_q("SELECT * FROM pending_keys WHERE key_hash=? AND expires_at>NOW()"), (key_hash,))
    else:
        c.execute("SELECT * FROM pending_keys WHERE key_hash=? AND expires_at>datetime('now')", (key_hash,))
    row = _row(c.fetchone()); conn.close(); return row

def consume_pending_key(key_hash):
    conn = get_db(); c = conn.cursor()
    c.execute(_q("DELETE FROM pending_keys WHERE key_hash=?"), (key_hash,))
    conn.commit(); conn.close()

def cleanup_expired_pending_keys():
    conn = get_db(); c = conn.cursor()
    if _PG:
        c.execute("DELETE FROM pending_keys WHERE expires_at<=NOW()")
    else:
        c.execute("DELETE FROM pending_keys WHERE expires_at<=datetime('now')")
    conn.commit(); conn.close()

def hash_token(token):
    """Отпечаток refresh-токена. Токен — 64 случайных знака hex (256 бит),
    перебрать его нельзя никаким временем, поэтому чистого sha256 здесь
    достаточно: солить нечего."""
    return hashlib.sha256(token.encode()).hexdigest()


# Перец для отпечатков адресов. Берём KEY_PEPPER, а если его нет — JWT_SECRET:
# что-то секретное на сервере есть всегда, и защита работает сразу.
_ПЕРЕЦ_АДР = (_ПЕРЕЦ or (os.environ.get("JWT_SECRET") or "cubeworld").encode())


def hash_ip(ip, длина: int = 0) -> str:
    """Отпечаток адреса посетителя.

    Раньше адреса писались как чистый sha256. Это не обезличивание: всех
    адресов IPv4 ровно 4 294 967 296, и полная таблица «адрес → sha256»
    считается на одной карте за минуты. То есть при утечке базы адреса
    посетителей читались как открытый текст.

    Теперь это HMAC с серверным секретом: без него таблицу не построить.
    Сравнивать отпечатки между собой по-прежнему можно — секрет один.
    """
    if not ip:
        return ""
    try:
        о = hmac.new(_ПЕРЕЦ_АДР, str(ip).encode(), hashlib.sha256).hexdigest()
    except Exception:
        о = hashlib.sha256(str(ip).encode()).hexdigest()
    return о[:длина] if длина else о

def get_user_by_key_hash(key_hash):
    conn = get_db()
    c = conn.cursor()
    c.execute(_q("SELECT * FROM users WHERE key_hash=? AND is_active=1"), (key_hash,))
    user = _row(c.fetchone())
    conn.close(); return user

def get_user_by_id(user_id):
    conn = get_db()
    c = conn.cursor()
    c.execute(_q("SELECT * FROM users WHERE id=? AND is_active=1"), (user_id,))
    user = _row(c.fetchone())
    conn.close(); return user

def create_user(key_hash, key_prefix, key_type="free"):
    conn = get_db()
    uid = _execute_returning(
        conn,
        _q("INSERT INTO users (key_hash,key_prefix,key_type) VALUES (?,?,?)"),
        (key_hash, key_prefix, key_type))
    conn.commit(); conn.close(); return uid

def update_last_seen(user_id):
    conn = get_db(); c = conn.cursor()
    c.execute(_q(f"UPDATE users SET last_seen={_now_expr()} WHERE id=?"), (user_id,))
    conn.commit(); conn.close()

def update_profile(user_id, display_name=None, avatar_url=None, avatar_color=None):
    conn = get_db(); c = conn.cursor()
    if display_name is not None:
        c.execute(_q("UPDATE users SET display_name=? WHERE id=?"), (display_name, user_id))
    if avatar_url is not None:
        c.execute(_q("UPDATE users SET avatar_url=? WHERE id=?"), (avatar_url, user_id))
    # v=584 · Цвет значка на аватаре едет вместе с самим значком: иначе
    # его видел бы только тот, кто выбирал, а у остальных смайл оставался
    # бы своего цвета.
    if avatar_color is not None:
        try:
            c.execute(_q("UPDATE users SET avatar_color=? WHERE id=?"),
                      (str(avatar_color)[:16], user_id))
        except Exception:
            pass
    conn.commit(); conn.close()

def uid_имя(user_id):
    """v=561 · Имя человека, который ничего о себе не заполнил.

    Это его UID — тот самый одиннадцатизначный номер, который он видит
    у себя в профиле («UID · 00001212331»). Считается он из внутреннего
    номера по той же формуле, что и на странице (_genDisplayUid), иначе
    в профиле был бы один номер, а в постах и чатах другой.

    Раньше одного и того же безымянного человека площадка называла
    четырьмя именами: в постах префиксом ключа («CUBE-X7MK»), в списке
    чатов «User#10», в сообщении «Аноним», в строке списка
    «Пользователь». Префикс ключа вдобавок часть входного ключа —
    показывать его рядом с чужими публикациями незачем.
    """
    try:
        н = int(user_id)
    except Exception:
        return "00000000000"
    МИН, МАКС = 115000, 30000000000
    ч = (н * 97331 + 1000000) % (МАКС - МИН) + МИН
    с = str(ч).zfill(11)
    # Те же две подпорки, что на странице: номер не должен выглядеть как
    # «00000000001» — из одной-двух цифр.
    if len(set(с)) < 3:
        м = list(с)
        м[2] = str((int(м[0]) + 3) % 10)
        м[5] = str((int(м[1]) + 7) % 10)
        м[8] = str((int(м[2]) + 5) % 10)
        с = "".join(м)
    if len(set(с)) < 2:
        с = с[:8] + "123"
    return с


def get_display_name(user_id):
    conn = get_db(); c = conn.cursor()
    c.execute(_q("SELECT display_name,key_prefix FROM users WHERE id=?"), (user_id,))
    row = c.fetchone()
    conn.close()
    # v=563 · Строки «Unknown» в программе быть не должно: человека без
    # заполненного имени всюду зовут по UID. Раньше отсюда уходило слово
    # «Unknown», и оно всплывало в шапке переписки и в списке участников.
    if not row: return uid_имя(user_id)
    row = dict(row)
    if row["display_name"]:
        return row["display_name"]
    return uid_имя(user_id)

def search_users(query: str, limit: int = 20, exclude_id: int = None):
    """
    Поиск людей по @нику, имени или #номеру.
    #42  → прямо по номеру
    @ann → по нику
    ann  → по имени

    По метке CUBE-… больше не ищем и её не показываем: искать по ней
    было незачем, а посторонним она видеть не должна.
    """
    conn = get_db(); c = conn.cursor()

    excl = f"AND id != {int(exclude_id)}" if exclude_id else ""

    # #42 or plain digits — direct UID lookup
    q = query.strip()
    raw_id = None
    if q.startswith('#') and q[1:].isdigit():
        raw_id = int(q[1:])
    elif q.isdigit():
        raw_id = int(q)
    if raw_id is not None:
        c.execute(_q(f"SELECT id,display_name,username,key_prefix,avatar_url,key_type,last_seen FROM users WHERE id=? AND is_active=1 {excl}"), (raw_id,))
        row = c.fetchone()
        conn.close()
        return [dict(row)] if row else []

    # Remove @ prefix for username search
    if q.startswith('@'):
        q = q[1:]

    if not q:
        conn.close()
        return []

    # Раньше здесь стояло `display_name IS NOT NULL AND display_name != ''`.
    # Из-за этого человек, который завёл @ник, но не заполнил имя, не находился
    # ВООБЩЕ — даже по своему же нику: условие отсекало его до того, как дело
    # доходило до сравнения. Теперь достаточно, чтобы у человека было хоть
    # что-то, по чему его можно опознать.
    if _PG:
        pattern = f"%{q}%"
        c.execute(f"""SELECT id,display_name,username,key_prefix,avatar_url,key_type,last_seen
                      FROM users
                      WHERE is_active=1
                        AND COALESCE(NULLIF(display_name,''), NULLIF(username,''), key_prefix) IS NOT NULL
                        AND last_seen >= NOW() - INTERVAL '30 days'
                        AND (username ILIKE %s OR display_name ILIKE %s)
                        {excl}
                      ORDER BY last_seen DESC LIMIT %s""",
                  (pattern, pattern, limit))
    else:
        # SQLite сравнивает LIKE без учёта регистра только для латиницы, поэтому
        # «аня» не находило «Аня». CWLOWER — наша функция, она умеет кириллицу.
        pattern = f"%{q.lower()}%"
        c.execute(f"""SELECT id,display_name,username,key_prefix,avatar_url,key_type,last_seen
                      FROM users
                      WHERE is_active=1
                        AND COALESCE(NULLIF(display_name,''), NULLIF(username,''), key_prefix) IS NOT NULL
                        AND last_seen >= datetime('now', '-30 days')
                        AND (CWLOWER(username) LIKE ?
                             OR CWLOWER(display_name) LIKE ?)
                        {excl}
                      ORDER BY last_seen DESC LIMIT ?""",
                  (pattern, pattern, limit))

    rows = c.fetchall()
    conn.close()
    return _fetchall(rows)

def search_cubes(query: str, limit: int = 20):
    """Search cubes by @handle, name. #G42 = cube id lookup."""
    conn = get_db(); c = conn.cursor()
    q = query.strip()

    # #G42 or #42 — direct ID lookup
    if q.startswith('#'):
        uid_str = q.lstrip('#Gg')
        if uid_str.isdigit():
            # Только открытый: по номеру закрытого куба раньше отдавались
            # его название, описание и ключ приглашения — то есть вход.
            c.execute(_q("""SELECT id,name,description,icon,color,type,handle,cube_key,
                                   life_hours,expires_at FROM cubes
                            WHERE id=? AND is_active=1 AND type='public'"""), (int(uid_str),))
            row = c.fetchone()
            conn.close()
            return [dict(row)] if row else []

    if q.startswith('@'):
        q = q[1:]
    if not q:
        conn.close()
        return []

    if _PG:
        pattern = f"%{q}%"
        c.execute("""SELECT id,name,description,icon,color,type,handle,cube_key,life_hours,
                            CAST(EXTRACT(EPOCH FROM (expires_at - NOW())) AS BIGINT) as life_left_seconds
                     FROM cubes WHERE is_active=1 AND expires_at>NOW()
                       AND type='public'
                       AND (handle ILIKE %s OR name ILIKE %s)
                     ORDER BY created_at DESC, id DESC LIMIT %s""", (pattern, pattern, limit))
    else:
        pattern = f"%{q}%"
        c.execute("""SELECT id,name,description,icon,color,type,handle,cube_key,life_hours,
                            CAST((julianday(expires_at)-julianday('now'))*86400 AS INTEGER) as life_left_seconds
                     FROM cubes WHERE is_active=1 AND expires_at>datetime('now')
                       AND type='public'
                       AND (handle LIKE ? OR name LIKE ?)
                     ORDER BY created_at DESC, id DESC LIMIT ?""", (pattern, pattern, limit))

    rows = c.fetchall()
    conn.close()
    return _fetchall(rows)

# ── Groups ───────────────────────────────────────────────────────────────────

def create_group(owner_id: int, name: str, description: str, icon: str, gtype: str):
    """Create a group and auto-add owner as member. Returns group_id."""
    conn = get_db(); c = conn.cursor()
    try:
        gid = _execute_returning(
            conn,
            _q("INSERT INTO groups (owner_id,name,description,icon,type) VALUES (?,?,?,?,?)"),
            (owner_id, name, description, icon, gtype)
        )
        c.execute(_q("INSERT INTO group_members (group_id,user_id) VALUES (?,?)"), (gid, owner_id))
        conn.commit(); conn.close()
        return gid
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return None

# Время последнего сообщения в группе — по нему список и выстраивается,
# как в любом мессенджере: где только что написали, то и наверху.
_ПОСЛ = "(SELECT MAX(created_at) FROM group_messages gm2 WHERE gm2.group_id=g.id)"


def _группы_по_свежести(c, user_id, limit, только_свои):
    """Один запрос на оба списка. Возвращает None, если не прошёл —
    тогда зовущий откатывается на старый порядок."""
    поля = ("g.id,g.owner_id,g.name,g.description,g.icon,g.type,g.handle,"
            "g.member_count,g.created_at, " + _ПОСЛ + " AS last_msg_at")
    порядок = " ORDER BY COALESCE(" + _ПОСЛ + ", g.created_at) DESC "
    try:
        if только_свои:
            c.execute(_q("SELECT " + поля + ", 1 as is_member "
                         "FROM groups g JOIN group_members gm ON gm.group_id=g.id "
                         "WHERE gm.user_id=?" + порядок), (user_id,))
        elif user_id:
            c.execute(_q("SELECT " + поля + ", "
                         "CASE WHEN gm.user_id IS NOT NULL THEN 1 ELSE 0 END as is_member "
                         "FROM groups g LEFT JOIN group_members gm "
                         "ON gm.group_id=g.id AND gm.user_id=? "
                         "WHERE g.type='public'" + порядок + "LIMIT ?"), (user_id, limit))
        else:
            c.execute(_q("SELECT " + поля + ", 0 as is_member "
                         "FROM groups g WHERE g.type='public'" + порядок + "LIMIT ?"), (limit,))
        return _fetchall(c.fetchall())
    except Exception:
        return None


def get_groups(limit: int = 50, user_id: int = None):
    """List public groups, with is_member flag if user_id given."""
    conn = get_db(); c = conn.cursor()
    свежие = _группы_по_свежести(c, user_id, limit, False)
    if свежие is not None:
        conn.close(); return свежие
    if _PG: conn.rollback()
    c = conn.cursor()
    if _PG:
        if user_id:
            c.execute("""SELECT g.id,g.owner_id,g.name,g.description,g.icon,g.type,g.handle,g.member_count,g.created_at,
                                EXISTS(SELECT 1 FROM group_members gm WHERE gm.group_id=g.id AND gm.user_id=%s) as is_member
                         FROM groups g WHERE g.type='public' ORDER BY g.member_count DESC LIMIT %s""", (user_id, limit))
        else:
            c.execute("""SELECT id,owner_id,name,description,icon,type,handle,member_count,created_at,false as is_member
                         FROM groups WHERE type='public' ORDER BY member_count DESC LIMIT %s""", (limit,))
    else:
        if user_id:
            c.execute("""SELECT g.id,g.owner_id,g.name,g.description,g.icon,g.type,g.handle,g.member_count,g.created_at,
                                CASE WHEN gm.user_id IS NOT NULL THEN 1 ELSE 0 END as is_member
                         FROM groups g LEFT JOIN group_members gm ON gm.group_id=g.id AND gm.user_id=?
                         WHERE g.type='public' ORDER BY g.member_count DESC LIMIT ?""", (user_id, limit))
        else:
            c.execute("""SELECT id,owner_id,name,description,icon,type,handle,member_count,created_at,0 as is_member
                         FROM groups WHERE type='public' ORDER BY member_count DESC LIMIT ?""", (limit,))
    rows = _fetchall(c.fetchall()); conn.close()
    return rows

def get_my_groups(user_id: int):
    """Groups where user is a member (including private ones)."""
    conn = get_db(); c = conn.cursor()
    свежие = _группы_по_свежести(c, user_id, 200, True)
    if свежие is not None:
        conn.close(); return свежие
    if _PG: conn.rollback()
    c = conn.cursor()
    if _PG:
        c.execute("""SELECT g.id,g.owner_id,g.name,g.description,g.icon,g.type,g.handle,g.member_count,g.created_at,
                            true as is_member
                     FROM groups g JOIN group_members gm ON gm.group_id=g.id
                     WHERE gm.user_id=%s ORDER BY gm.joined_at DESC""", (user_id,))
    else:
        c.execute("""SELECT g.id,g.owner_id,g.name,g.description,g.icon,g.type,g.handle,g.member_count,g.created_at,
                            1 as is_member
                     FROM groups g JOIN group_members gm ON gm.group_id=g.id
                     WHERE gm.user_id=? ORDER BY gm.joined_at DESC""", (user_id,))
    rows = _fetchall(c.fetchall()); conn.close()
    return rows

def join_group(group_id: int, user_id: int):
    """Join a public group. Returns True/False."""
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("SELECT id,type FROM groups WHERE id=?"), (group_id,))
        g = c.fetchone()
        if not g: conn.close(); return False
        if _PG:
            c.execute("INSERT INTO group_members (group_id,user_id) VALUES (%s,%s) ON CONFLICT DO NOTHING",
                      (group_id, user_id))
            c.execute("UPDATE groups SET member_count = (SELECT COUNT(*) FROM group_members WHERE group_id=%s) WHERE id=%s",
                      (group_id, group_id))
        else:
            c.execute("INSERT OR IGNORE INTO group_members (group_id,user_id) VALUES (?,?)", (group_id, user_id))
            c.execute("UPDATE groups SET member_count = (SELECT COUNT(*) FROM group_members WHERE group_id=?) WHERE id=?",
                      (group_id, group_id))
        conn.commit(); conn.close(); return True
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return False

def leave_group(group_id: int, user_id: int):
    """Leave a group (owner cannot leave)."""
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("SELECT owner_id FROM groups WHERE id=?"), (group_id,))
        g = c.fetchone()
        if not g: conn.close(); return False
        if dict(g).get('owner_id') == user_id: conn.close(); return False  # owner can't leave
        c.execute(_q("DELETE FROM group_members WHERE group_id=? AND user_id=?"), (group_id, user_id))
        if _PG:
            c.execute("UPDATE groups SET member_count = (SELECT COUNT(*) FROM group_members WHERE group_id=%s) WHERE id=%s",
                      (group_id, group_id))
        else:
            c.execute("UPDATE groups SET member_count = (SELECT COUNT(*) FROM group_members WHERE group_id=?) WHERE id=?",
                      (group_id, group_id))
        conn.commit(); conn.close(); return True
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return False

def search_groups(query: str, limit: int = 20, user_id: int = None):
    """Search groups by name, description, or #G42 / @handle."""
    conn = get_db(); c = conn.cursor()
    q = query.strip()
    uid_col = "EXISTS(SELECT 1 FROM group_members gm WHERE gm.group_id=g.id AND gm.user_id=%s) as is_member" if _PG else \
              "CASE WHEN gm2.user_id IS NOT NULL THEN 1 ELSE 0 END as is_member"

    if q.startswith('#'):
        raw = q.lstrip('#Gg')
        if raw.isdigit():
            gid = int(raw)
            if _PG:
                c.execute(f"""SELECT g.id,g.owner_id,g.name,g.description,g.icon,g.type,g.handle,g.member_count,g.created_at,
                                     {uid_col}
                              FROM groups g WHERE g.id=%s""",
                           (user_id, gid) if user_id else (gid,))
            else:
                c.execute("""SELECT g.id,g.owner_id,g.name,g.description,g.icon,g.type,g.handle,g.member_count,g.created_at,
                                    CASE WHEN gm2.user_id IS NOT NULL THEN 1 ELSE 0 END as is_member
                             FROM groups g LEFT JOIN group_members gm2 ON gm2.group_id=g.id AND gm2.user_id=?
                             WHERE g.id=?""", (user_id or 0, gid))
            row = c.fetchone(); conn.close()
            return [dict(row)] if row else []

    if q.startswith('@'):
        q = q[1:]
    if not q:
        conn.close(); return []

    pattern = f"%{q}%"
    if _PG:
        c.execute(f"""SELECT g.id,g.owner_id,g.name,g.description,g.icon,g.type,g.handle,g.member_count,g.created_at,
                             {uid_col}
                      FROM groups g WHERE g.type='public'
                        AND (g.name ILIKE %s OR g.description ILIKE %s OR g.handle ILIKE %s)
                      ORDER BY g.member_count DESC LIMIT %s""",
                  (user_id, pattern, pattern, pattern, limit) if user_id else (pattern, pattern, pattern, limit))
    else:
        c.execute("""SELECT g.id,g.owner_id,g.name,g.description,g.icon,g.type,g.handle,g.member_count,g.created_at,
                            CASE WHEN gm2.user_id IS NOT NULL THEN 1 ELSE 0 END as is_member
                     FROM groups g LEFT JOIN group_members gm2 ON gm2.group_id=g.id AND gm2.user_id=?
                     WHERE g.type='public'
                       AND (g.name LIKE ? OR g.description LIKE ? OR g.handle LIKE ?)
                     ORDER BY g.member_count DESC LIMIT ?""",
                  (user_id or 0, pattern, pattern, pattern, limit))
    rows = _fetchall(c.fetchall()); conn.close()
    return rows

def set_group_handle(group_id: int, owner_id: int, handle: str):
    """Set @handle for a group. Only owner."""
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("UPDATE groups SET handle=? WHERE id=? AND owner_id=?"),
                  (handle.lower(), group_id, owner_id))
        conn.commit(); conn.close(); return True
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return False

def get_universe(user_id: int) -> list:
    """Get user's saved universe (list of cube IDs)."""
    import json
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("SELECT my_universe FROM users WHERE id=?"), (user_id,))
        row = c.fetchone(); conn.close()
        if row:
            val = dict(row).get('my_universe') or '[]'
            try: return json.loads(val)
            except: return []
        return []
    except Exception:
        conn.close(); return []

def save_universe(user_id: int, universe: list):
    """Save user's universe (list of cube ID strings)."""
    import json
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("UPDATE users SET my_universe=? WHERE id=?"), (json.dumps(universe), user_id))
        conn.commit(); conn.close(); return True
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return False

def set_account_type(user_id: int, account_type: str):
    """Set account_type: 'public' or 'hidden'."""
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("UPDATE users SET account_type=? WHERE id=?"), (account_type, user_id))
        conn.commit(); conn.close(); return True
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return False

def set_username(user_id: int, username: str):
    """Set or update @username. Returns True on success, False if taken."""
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("UPDATE users SET username=? WHERE id=?"), (username.lower(), user_id))
        conn.commit()
        conn.close()
        return True
    except Exception:
        conn.rollback(); conn.close()
        return False

def set_cube_handle(cube_id: int, owner_id: int, handle: str):
    """Set @handle for a cube. Only owner can set it."""
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("UPDATE cubes SET handle=? WHERE id=? AND owner_id=?"),
                  (handle.lower(), cube_id, owner_id))
        conn.commit(); conn.close()
        return True
    except Exception:
        conn.rollback(); conn.close()
        return False

def create_session(user_id, token_hash, expires_at, user_agent=None, ip_hash=None):
    conn = get_db(); c = conn.cursor()
    c.execute(_q("INSERT INTO sessions (user_id,token_hash,expires_at,user_agent,ip_hash) VALUES (?,?,?,?,?)"),
              (user_id, token_hash, expires_at, user_agent, ip_hash))
    conn.commit(); conn.close()

def get_session_by_token_hash(token_hash):
    conn = get_db(); c = conn.cursor()
    if _PG:
        c.execute("""SELECT s.*,u.key_type,u.key_prefix,u.cube_balance,u.display_name,u.id as user_id
                     FROM sessions s JOIN users u ON u.id=s.user_id
                     WHERE s.token_hash=%s AND s.expires_at>NOW()""", (token_hash,))
    else:
        c.execute("""SELECT s.*,u.key_type,u.key_prefix,u.cube_balance,u.display_name,u.id as user_id
                     FROM sessions s JOIN users u ON u.id=s.user_id
                     WHERE s.token_hash=? AND s.expires_at>datetime('now')""", (token_hash,))
    row = _row(c.fetchone())
    conn.close(); return row

def забыть_все_сессии(user_id) -> int:
    """Погасить все входы человека: ни один refresh больше не работает."""
    try:
        conn = get_db(); c = conn.cursor()
        c.execute(_q("DELETE FROM sessions WHERE user_id=?"), (int(user_id),))
        сколько = c.rowcount if c.rowcount is not None else 0
        conn.commit(); conn.close()
        return int(сколько)
    except Exception:
        try:
            if _PG: conn.rollback()
            conn.close()
        except Exception:
            pass
        return 0


def сменить_ключ(user_id, новый_хеш, новый_префикс) -> bool:
    """Поменять ключ у живой учётной записи.

    Нужно, когда ключ утёк: завести новый аккаунт — значит потерять кубы,
    переписки и счёт. Старый ключ после этого не работает: вход ищет
    человека по хешу (get_user_by_key_hash), а хеш стал другим.
    """
    try:
        conn = get_db(); c = conn.cursor()
        c.execute(_q("UPDATE users SET key_hash=?, key_prefix=? WHERE id=?"),
                  (новый_хеш, новый_префикс, int(user_id)))
        conn.commit(); conn.close()
        return True
    except Exception:
        try:
            if _PG: conn.rollback()
            conn.close()
        except Exception:
            pass
        return False


def погасить_учётку(user_id) -> bool:
    """Выключить учётную запись целиком.

    get_user_by_id ищет с условием is_active=1, поэтому после этого
    перестают работать и ключ, и все выданные токены — сразу, не дожидаясь
    их срока. Это единственный быстрый рубильник, если ключ украли.
    """
    try:
        conn = get_db(); c = conn.cursor()
        c.execute(_q("UPDATE users SET is_active=0 WHERE id=?"), (int(user_id),))
        conn.commit(); conn.close()
        забыть_все_сессии(user_id)
        return True
    except Exception:
        try:
            if _PG: conn.rollback()
            conn.close()
        except Exception:
            pass
        return False


def delete_session(token_hash):
    conn = get_db(); c = conn.cursor()
    c.execute(_q("DELETE FROM sessions WHERE token_hash=?"), (token_hash,))
    conn.commit(); conn.close()

def add_cube_balance(user_id, amount, tx_type, description=None, tx_hash=None,
                     reward_part=None):
    """Начислить CUBE. Заодно запоминаем, наградные это или выручка.

    `reward_part` можно задать явно (так делает перевод, который везёт с собой
    смесь отправителя). Если не задано — решаем по виду операции."""
    conn = get_db(); c = conn.cursor()
    _ensure_split(c)
    amount = float(amount)
    if reward_part is None:
        reward_part = amount if (str(tx_type) in _REWARD_TYPES and amount > 0) else 0.0
    reward_part = float(reward_part)
    c.execute(_q("UPDATE users SET cube_balance=cube_balance+? WHERE id=?"), (amount, user_id))
    if reward_part:
        c.execute(_q("UPDATE users SET reward_balance=COALESCE(reward_balance,0)+? WHERE id=?"),
                  (reward_part, user_id))
    c.execute(_q("INSERT INTO cube_transactions (user_id,amount,tx_type,description,tx_hash) VALUES (?,?,?,?,?)"),
              (user_id, amount, tx_type, description, tx_hash))
    conn.commit(); conn.close()

# ══════════════════════════════════════════════════════════════════════════
#  ДВА БАЛАНСА
#  ---------------------------------------------------------------------
#  CUBE бывает двух видов, и это не одно и то же:
#
#  • НАГРАДНЫЕ — которые мы сами начислили за активность. Они из фонда, то
#    есть из нашей выручки. Ими можно платить внутри площадки, но считать их
#    «заработком, который человек принёс» нельзя.
#  • ВЫРУЧКА — которые человеку заплатили другие люди: продажа на
#    маркетплейсе, платный сигнал, чаевые, перевод. За ними стоят настоящие
#    деньги, которые кто-то внёс.
#
#  Правило простое: сначала тратятся наградные. Признак едет с каждым
#  переводом — если человек переводит другому, тот получает ровно такую же
#  смесь, какая ушла. Иначе наградные можно было бы «отмыть» в выручку,
#  прогнав через вторую свою учётку.
#
#  Зачем нужно: продавец платит подпиской со своей выручки, а не из наших
#  наград. Это же основа, если когда-нибудь появится выплата продавцам.
# ══════════════════════════════════════════════════════════════════════════

# Что считается наградой из фонда, а не деньгами других людей
_REWARD_TYPES = ('reward', 'reward_day', 'daily', 'post_views', 'comment_views',
                 'referral', 'referral_welcome', 'mint', 'test', 'bonus')

_SPLIT_READY = False


def _ensure_split(c):
    """Колонка для наградной части баланса. Общий баланс остаётся на месте —
    это сумма обеих частей, и весь старый код продолжает работать."""
    global _SPLIT_READY
    if _SPLIT_READY:
        return
    _SPLIT_READY = True
    try:
        c.execute("ALTER TABLE users ADD COLUMN reward_balance REAL NOT NULL DEFAULT 0")
        c.connection.commit()
    except Exception:
        try: c.connection.rollback()
        except Exception: pass


def cube_split(user_id):
    """Сколько у человека наградных CUBE и сколько заработанных у людей."""
    conn = get_db(); c = conn.cursor()
    _ensure_split(c)
    всего, награды = 0.0, 0.0
    try:
        c.execute(_q("SELECT cube_balance, reward_balance FROM users WHERE id=?"),
                  (int(user_id),))
        row = _row(c.fetchone()) or {}
        всего = float(row.get('cube_balance') or 0)
        награды = float(row.get('reward_balance') or 0)
    except Exception:
        pass
    conn.close()
    награды = max(0.0, min(награды, всего))
    return {'balance': round(всего, 4),
            'reward_cube': round(награды, 4),
            'revenue_cube': round(максимум_нуля(всего - награды), 4)}


def максимум_нуля(x):
    return x if x > 0 else 0.0


def _reward_part(c, user_id):
    c.execute(_q("SELECT reward_balance FROM users WHERE id=?"), (int(user_id),))
    return float(_scalar(c.fetchone(), 0) or 0)


def spend_cube(user_id, amount, tx_type, description=None):
    """Списать CUBE на сервере, одной операцией и с проверкой баланса.

    До этого списания жили в браузере: spendCube уменьшала число на экране и
    дописывала строку в историю, а в базе ничего не менялось. Хватало
    обновления страницы, чтобы «потраченные» кубы вернулись — и наоборот,
    купленное оставалось купленным бесплатно.
    """
    amount = round(float(amount or 0), 4)
    if amount <= 0:
        return {"error": "bad amount"}
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("SELECT cube_balance FROM users WHERE id=?"), (int(user_id),))
        row = c.fetchone()
        if row is None:
            conn.close(); return {"error": "no user"}
        bal = float(_scalar(row, 0) or 0)
        if bal < amount:
            conn.close(); return {"error": "not enough", "balance": round(bal, 4)}
        # Сначала тратятся наградные, потом выручка.
        _ensure_split(c)
        награды = _reward_part(c, user_id)
        из_наград = min(награды, amount)
        c.execute(_q("UPDATE users SET cube_balance=cube_balance-? WHERE id=?"),
                  (amount, int(user_id)))
        if из_наград:
            c.execute(_q("UPDATE users SET reward_balance=COALESCE(reward_balance,0)-? WHERE id=?"),
                      (из_наград, int(user_id)))
        c.execute(_q("INSERT INTO cube_transactions (user_id,amount,tx_type,description) "
                     "VALUES (?,?,?,?)"),
                  (int(user_id), -amount, str(tx_type), description))
        conn.commit()
        c.execute(_q("SELECT cube_balance FROM users WHERE id=?"), (int(user_id),))
        итог = float(_scalar(c.fetchone(), 0) or 0)
        conn.close()
        return {"ok": True, "balance": round(итог, 4), "spent": amount}
    except Exception:
        try: conn.rollback()
        except Exception: pass
        conn.close()
        return {"error": "failed"}


def get_cube_balance(user_id):
    conn = get_db(); c = conn.cursor()
    c.execute(_q("SELECT cube_balance FROM users WHERE id=?"), (user_id,))
    row = c.fetchone()
    conn.close(); return (dict(row)["cube_balance"] if row else 0.0)

def upgrade_key(user_id, to_type, cube_spent=0.0, tx_hash=None):
    conn = get_db(); c = conn.cursor()
    c.execute(_q("SELECT key_type FROM users WHERE id=?"), (user_id,))
    cur = c.fetchone()
    from_type = dict(cur)["key_type"] if cur else "free"
    c.execute(_q("UPDATE users SET key_type=?,cube_balance=cube_balance-? WHERE id=?"), (to_type, cube_spent, user_id))
    c.execute(_q("INSERT INTO key_upgrades (user_id,from_type,to_type,cube_spent,tx_hash) VALUES (?,?,?,?,?)"),
              (user_id, from_type, to_type, cube_spent, tx_hash))
    conn.commit(); conn.close()

def wallet_owner(address):
    """Кто уже привязал этот адрес. None — никто.

    Нужна, чтобы привязка не отбирала адрес у другого человека: в
    link_wallet стоит ON CONFLICT ... DO UPDATE SET user_id, и без этой
    проверки любой желающий мог приписать себе чужой кошелёк одним
    запросом. Деньги это не трогает — выплата идёт на адрес из самой
    заявки, — но в чужом профиле показывался бы не его кошелёк."""
    if not address:
        return None
    conn = get_db(); c = conn.cursor()
    c.execute(_q("SELECT user_id FROM wallets WHERE address=?"), (str(address).lower(),))
    р = c.fetchone()
    conn.close()
    return (dict(р).get("user_id") if р else None)


def wallet_count(user_id):
    """Сколько адресов уже привязал этот человек."""
    conn = get_db(); c = conn.cursor()
    c.execute(_q("SELECT COUNT(*) AS n FROM wallets WHERE user_id=?"), (int(user_id),))
    р = c.fetchone()
    conn.close()
    return int((dict(р) or {}).get("n") or 0) if р else 0


def unlink_wallet(user_id, address):
    """Отвязать адрес от профиля.

    v=477. Привязать кошелёк было можно, отвязать — нечем: ни кнопки, ни
    запроса. Человек, вписавший адрес с опечаткой, оставался с ним
    навсегда, а десятое место из десяти занимал мусор. Удаляем ТОЛЬКО
    свою запись: без user_id в условии чужой адрес отвязывал бы кто
    угодно, знающий его.
    """
    conn = get_db(); c = conn.cursor()
    тронуто = 0
    try:
        c.execute(_q("DELETE FROM wallets WHERE user_id=? AND address=?"),
                  (int(user_id), str(address).lower()))
        тронуто = c.rowcount
        conn.commit()
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return bool(тронуто)


def _кошельки_готовы(c):
    """Колонка verified появилась позже таблицы — дописываем, если её нет.

    v=635 · Через _добавить_колонку: голый неудачный ALTER на PostgreSQL
    обрывал всю сделку, и привязка кошелька после перезапуска падала."""
    _добавить_колонку(c, "wallets", "verified", "INTEGER NOT NULL DEFAULT 0")


def link_wallet(user_id, address, chain_id=137, verified=False):
    """Привязать адрес. verified=True ставится ТОЛЬКО когда сервер сам
    проверил подпись: это значит «человек доказал, что кошелёк его»."""
    conn = get_db(); c = conn.cursor()
    _кошельки_готовы(c)
    пров = 1 if verified else 0
    if _PG:
        c.execute("""INSERT INTO wallets (user_id,address,chain_id,verified) VALUES (%s,%s,%s,%s)
                     ON CONFLICT (address) DO UPDATE SET user_id=EXCLUDED.user_id,
                         chain_id=EXCLUDED.chain_id, verified=EXCLUDED.verified""",
                  (user_id, address.lower(), chain_id, пров))
    else:
        c.execute("INSERT OR REPLACE INTO wallets (user_id,address,chain_id,verified) VALUES (?,?,?,?)",
                  (user_id, address.lower(), chain_id, пров))
    conn.commit(); conn.close()

def get_stats():
    conn = get_db(); c = conn.cursor()
    now_expr = _now_expr()
    c.execute("SELECT COUNT(*) as n FROM users WHERE is_active=1"); total_users = c.fetchone()["n"]
    c.execute("SELECT COUNT(*) as n FROM users WHERE key_type='premium' AND is_active=1"); premium = c.fetchone()["n"]
    if _PG:
        c.execute("SELECT COUNT(*) as n FROM users WHERE last_seen>NOW()-INTERVAL '5 minutes'")
    else:
        c.execute("SELECT COUNT(*) as n FROM users WHERE last_seen>datetime('now','-5 minutes')")
    online = c.fetchone()["n"]
    c.execute("SELECT COUNT(*) as n FROM cubes WHERE is_active=1"); total_cubes = c.fetchone()["n"]
    conn.close()
    return {"total_users": total_users, "premium_users": premium,
            "online_users": online, "total_cubes": total_cubes}


# ── Cubes ─────────────────────────────────────────────────────────────────────

def _gen_cube_key():
    """Generate a unique cube invite key: CK-XXXX-XXXX-XXXX"""
    import secrets, string
    chars = string.ascii_uppercase + string.digits
    seg = lambda: ''.join(secrets.choice(chars) for _ in range(4))
    return f"CK-{seg()}-{seg()}-{seg()}"

def create_cube(owner_id, name, description, icon, color, cube_type, life_hours):
    conn = get_db()
    # Generate unique cube key
    cube_key = _gen_cube_key()
    if _PG:
        sql = """INSERT INTO cubes (owner_id,name,description,icon,color,type,life_hours,expires_at,cube_key)
                 VALUES (%s,%s,%s,%s,%s,%s,%s, NOW() + (%s || ' hours')::INTERVAL, %s)"""
    else:
        sql = """INSERT INTO cubes (owner_id,name,description,icon,color,type,life_hours,expires_at,cube_key)
                 VALUES (?,?,?,?,?,?,?,datetime('now','+'||?||' hours'),?)"""
    cid = _execute_returning(conn, sql,
          (owner_id, name, description, icon, color, cube_type, life_hours, str(life_hours), cube_key))
    conn.commit(); conn.close()
    return cid, cube_key

def delete_cube(cube_id: int, owner_id: int) -> bool:
    """Delete a cube. Only the owner can delete it. Returns True if deleted."""
    conn = get_db(); c = conn.cursor()
    if _PG:
        c.execute("DELETE FROM cubes WHERE id=%s AND owner_id=%s", (cube_id, owner_id))
    else:
        c.execute("DELETE FROM cubes WHERE id=? AND owner_id=?", (cube_id, owner_id))
    deleted = c.rowcount > 0
    conn.commit(); conn.close()
    return deleted

def delete_all_user_cubes() -> int:
    """Admin: delete ALL cubes with owner_id IS NOT NULL. Returns count deleted."""
    conn = get_db(); c = conn.cursor()
    if _PG:
        c.execute("DELETE FROM cubes WHERE owner_id IS NOT NULL")
    else:
        c.execute("DELETE FROM cubes WHERE owner_id IS NOT NULL")
    count = c.rowcount
    conn.commit(); conn.close()
    return count

def get_cube_by_key(cube_key: str):
    """Resolve a cube invite key → cube info (if still active/not expired)."""
    conn = get_db(); c = conn.cursor()
    if _PG:
        c.execute("""SELECT id,owner_id,name,description,icon,color,type,life_hours,expires_at,cube_key,
                            CAST(EXTRACT(EPOCH FROM (expires_at - NOW())) AS BIGINT) as life_left_seconds
                     FROM cubes WHERE cube_key=%s AND is_active=1 AND expires_at>NOW()""", (cube_key,))
    else:
        c.execute("""SELECT id,owner_id,name,description,icon,color,type,life_hours,expires_at,cube_key,
                            CAST((julianday(expires_at)-julianday('now'))*86400 AS INTEGER) as life_left_seconds
                     FROM cubes WHERE cube_key=? AND is_active=1 AND expires_at>datetime('now')""", (cube_key,))
    row = c.fetchone(); conn.close()
    return dict(row) if row else None

def get_cube_key(cube_id: int, owner_id: int):
    """Return cube_key only to the cube owner."""
    conn = get_db(); c = conn.cursor()
    ph = '%s' if _PG else '?'
    c.execute(f"SELECT cube_key FROM cubes WHERE id={ph} AND owner_id={ph}", (cube_id, owner_id))
    row = c.fetchone(); conn.close()
    if not row: return None
    return row[0] if not _PG else row['cube_key']

def deactivate_expired_cubes():
    conn = get_db(); c = conn.cursor()
    if _PG:
        c.execute("UPDATE cubes SET is_active=0 WHERE is_active=1 AND expires_at<=NOW()")
    else:
        c.execute("UPDATE cubes SET is_active=0 WHERE is_active=1 AND expires_at<=datetime('now')")
    conn.commit(); conn.close()

def get_my_cubes(owner_id: int):
    """Return ALL cubes owned by this user, including expired ones."""
    conn = get_db(); c = conn.cursor()
    if _PG:
        c.execute("""SELECT id,owner_id,name,description,icon,color,type,life_hours,is_active,expires_at,cube_key,
                            GREATEST(0, CAST(EXTRACT(EPOCH FROM (expires_at - NOW())) AS BIGINT)) as life_left_seconds
                     FROM cubes WHERE owner_id=%s ORDER BY created_at DESC LIMIT 50""", (owner_id,))
    else:
        c.execute("""SELECT id,owner_id,name,description,icon,color,type,life_hours,is_active,expires_at,cube_key,
                            MAX(0, CAST((julianday(expires_at)-julianday('now'))*86400 AS INTEGER)) as life_left_seconds
                     FROM cubes WHERE owner_id=? ORDER BY created_at DESC LIMIT 50""", (owner_id,))
    rows = c.fetchall()
    conn.close(); return _fetchall(rows)

# ── Настройки и личные списки пользователя ───────────────────────────────────
# Избранное, скрытые у себя сообщения, архив и прочее раньше жили только в
# браузере: смена устройства — и всё потеряно. Это общий ящик «ключ → значение»
# на каждого человека: значение хранится строкой (обычно JSON), рядом метка
# времени, по ней решаем, чья запись свежее.

_PREFS_READY = False

def _ensure_prefs(c):
    global _PREFS_READY
    if _PREFS_READY:
        return
    if _PG:
        c.execute("""CREATE TABLE IF NOT EXISTS user_prefs (
                       user_id INTEGER NOT NULL,
                       k TEXT NOT NULL,
                       v TEXT,
                       t BIGINT DEFAULT 0,
                       PRIMARY KEY (user_id, k))""")
    else:
        c.execute("""CREATE TABLE IF NOT EXISTS user_prefs (
                       user_id INTEGER NOT NULL,
                       k TEXT NOT NULL,
                       v TEXT,
                       t INTEGER DEFAULT 0,
                       PRIMARY KEY (user_id, k))""")
    _PREFS_READY = True


def get_prefs(user_id: int, keys=None) -> dict:
    """Вернуть {ключ: {"v": строка, "t": метка}} для пользователя."""
    conn = get_db(); c = conn.cursor()
    out = {}
    try:
        _ensure_prefs(c)
        if keys:
            keys = [str(k)[:120] for k in keys][:60]
            marks = ",".join(["?"] * len(keys))
            c.execute(_q("SELECT k,v,t FROM user_prefs WHERE user_id=? AND k IN (" + marks + ")"),
                      tuple([user_id] + keys))
        else:
            c.execute(_q("SELECT k,v,t FROM user_prefs WHERE user_id=?"), (user_id,))
        for r in c.fetchall():
            d = dict(r) if hasattr(r, "keys") else {"k": r[0], "v": r[1], "t": r[2]}
            out[d["k"]] = {"v": d["v"], "t": int(d["t"] or 0)}
        conn.commit()
    except Exception:
        if _PG:
            conn.rollback()
    conn.close()
    return out


def set_prefs(user_id: int, prefs: dict) -> int:
    """Записать {ключ: {"v": строка, "t": метка}}. Старое по метке не затирает."""
    if not isinstance(prefs, dict) or not prefs:
        return 0
    conn = get_db(); c = conn.cursor()
    saved = 0
    try:
        _ensure_prefs(c)
        for k, item in list(prefs.items())[:60]:
            k = str(k)[:120]
            if isinstance(item, dict):
                v = item.get("v")
                t = int(item.get("t") or 0)
            else:
                v, t = item, 0
            if v is None:
                c.execute(_q("DELETE FROM user_prefs WHERE user_id=? AND k=?"), (user_id, k))
                saved += 1
                continue
            v = str(v)
            if len(v) > 2_000_000:      # два мегабайта на ключ — потолок
                continue
            c.execute(_q("SELECT t FROM user_prefs WHERE user_id=? AND k=?"), (user_id, k))
            row = c.fetchone()
            if row is not None and int(_scalar(row, 0) or 0) > t:
                continue                 # на сервере запись свежее
            if _PG:
                c.execute("""INSERT INTO user_prefs (user_id,k,v,t) VALUES (%s,%s,%s,%s)
                             ON CONFLICT (user_id,k) DO UPDATE SET v=EXCLUDED.v, t=EXCLUDED.t""",
                          (user_id, k, v, t))
            else:
                c.execute("""INSERT INTO user_prefs (user_id,k,v,t) VALUES (?,?,?,?)
                             ON CONFLICT (user_id,k) DO UPDATE SET v=excluded.v, t=excluded.t""",
                          (user_id, k, v, t))
            saved += 1
        conn.commit()
    except Exception:
        if _PG:
            conn.rollback()
    conn.close()
    return saved


# ── Аналитика куба ───────────────────────────────────────────────────────────
# Раньше раздел «Аналитика» рисовал случайные числа. Здесь считаем настоящие:
# участники, посты, сообщения, активность по дням и самые деятельные люди.

_VISIT_FIRST_READY = False

def _ensure_first_visit(c):
    """Колонка first_visit нужна, чтобы считать новых участников за неделю."""
    global _VISIT_FIRST_READY
    if _VISIT_FIRST_READY:
        return
    try:
        if _PG:
            c.execute("SELECT column_name FROM information_schema.columns "
                      "WHERE table_name='cube_visitors' AND column_name='first_visit'")
            if not c.fetchone():
                c.execute("ALTER TABLE cube_visitors ADD COLUMN first_visit TIMESTAMP")
                c.execute("UPDATE cube_visitors SET first_visit=last_visit WHERE first_visit IS NULL")
        else:
            c.execute("PRAGMA table_info(cube_visitors)")
            cols = [r[1] if not hasattr(r, "keys") else r["name"] for r in c.fetchall()]
            if "first_visit" not in cols:
                c.execute("ALTER TABLE cube_visitors ADD COLUMN first_visit TEXT")
                c.execute("UPDATE cube_visitors SET first_visit=last_visit WHERE first_visit IS NULL")
    except Exception:
        pass
    _VISIT_FIRST_READY = True


def _cnt(c, sql, args):
    try:
        c.execute(_q(sql), args)
        return int(_scalar(c.fetchone(), 0) or 0)
    except Exception:
        return 0


def cube_analytics(cube_id: int, me_id: int = 0) -> dict:
    """Живые числа по кубу: без выдумок, всё из базы."""
    conn = get_db(); c = conn.cursor()
    out = {"members_total": 0, "new_week": 0, "new_hour": 0, "active_5m": 0,
           "posts": 0, "posts_today": 0, "messages": 0, "messages_hour": 0,
           "days": [], "top": [], "me": {"posts": 0, "messages": 0, "rank": 0}}
    try:
        _ensure_first_visit(c)
        if _PG:
            week  = "NOW() - INTERVAL '7 days'"
            hour  = "NOW() - INTERVAL '1 hour'"
            today = "date_trunc('day', NOW())"
            day_expr = "to_char(created_at,'YYYY-MM-DD')"
            since7 = "NOW() - INTERVAL '6 days'"
        else:
            week  = "datetime('now','-7 days')"
            hour  = "datetime('now','-1 hour')"
            today = "date('now')"
            day_expr = "substr(created_at,1,10)"
            since7 = "datetime('now','-6 days')"

        out["members_total"] = _cnt(c, "SELECT COUNT(*) FROM cube_visitors WHERE cube_id=?", (cube_id,))
        # «сейчас в кубе» — те, кто отмечался последние пять минут
        recent = "NOW() - INTERVAL '5 minutes'" if _PG else "datetime('now','-5 minutes')"
        out["active_5m"] = _cnt(c, "SELECT COUNT(*) FROM cube_visitors WHERE cube_id=? AND last_visit>=" + recent, (cube_id,))
        out["new_week"] = _cnt(c, "SELECT COUNT(*) FROM cube_visitors WHERE cube_id=? "
                                  "AND COALESCE(first_visit,last_visit)>=" + week, (cube_id,))
        out["new_hour"] = _cnt(c, "SELECT COUNT(*) FROM cube_visitors WHERE cube_id=? "
                                  "AND COALESCE(first_visit,last_visit)>=" + hour, (cube_id,))
        out["posts"] = _cnt(c, "SELECT COUNT(*) FROM posts WHERE cube_id=?", (cube_id,))
        out["posts_today"] = _cnt(c, "SELECT COUNT(*) FROM posts WHERE cube_id=? AND created_at>=" + today, (cube_id,))
        out["messages"] = _cnt(c, "SELECT COUNT(*) FROM messages WHERE cube_id=?", (cube_id,))
        out["messages_hour"] = _cnt(c, "SELECT COUNT(*) FROM messages WHERE cube_id=? AND created_at>=" + hour, (cube_id,))

        # активность по дням: сообщения и посты вместе
        days = {}
        for table in ("messages", "posts"):
            try:
                c.execute(_q("SELECT " + day_expr + " AS d, COUNT(*) AS n FROM " + table +
                             " WHERE cube_id=? AND created_at>=" + since7 + " GROUP BY d"), (cube_id,))
                for r in c.fetchall():
                    d = dict(r) if hasattr(r, "keys") else {"d": r[0], "n": r[1]}
                    key = str(d["d"])[:10]
                    days[key] = days.get(key, 0) + int(d["n"] or 0)
            except Exception:
                pass
        out["days"] = [{"d": k, "n": v} for k, v in sorted(days.items())]

        # самые деятельные участники
        people = {}
        for table, field in (("messages", "messages"), ("posts", "posts")):
            try:
                c.execute(_q("SELECT user_id, MAX(display_name) AS nm, COUNT(*) AS n FROM " + table +
                             " WHERE cube_id=? AND user_id IS NOT NULL GROUP BY user_id"), (cube_id,))
                for r in c.fetchall():
                    d = dict(r) if hasattr(r, "keys") else {"user_id": r[0], "nm": r[1], "n": r[2]}
                    uid = int(d["user_id"] or 0)
                    if not uid:
                        continue
                    # v=563 · Здесь стояло слово «Аноним». Имени нет — зовём по UID.
                    p = people.setdefault(uid, {"user_id": uid, "name": d.get("nm") or uid_имя(uid),
                                                "posts": 0, "messages": 0})
                    if d.get("nm"):
                        p["name"] = d["nm"]
                    p[field] = int(d["n"] or 0)
            except Exception:
                pass
        ranked = sorted(people.values(), key=lambda p: (p["posts"] * 3 + p["messages"]), reverse=True)
        out["top"] = ranked[:5]
        if me_id:
            for i, p in enumerate(ranked):
                if p["user_id"] == int(me_id):
                    out["me"] = {"posts": p["posts"], "messages": p["messages"], "rank": i + 1}
                    break
        conn.commit()
    except Exception:
        if _PG:
            conn.rollback()
    conn.close()
    return out


def record_cube_visit(cube_id: int, user_id: int, display_name: str):
    """Record that a user visited a cube (called on WS connect). Upserts last_visit."""
    try:
        conn = get_db(); c = conn.cursor()
        if _PG:
            _ensure_first_visit(c)
            c.execute("""INSERT INTO cube_visitors (cube_id, user_id, display_name, last_visit, first_visit)
                         VALUES (%s, %s, %s, NOW(), NOW())
                         ON CONFLICT (cube_id, user_id) DO UPDATE
                           SET display_name=EXCLUDED.display_name, last_visit=NOW()""",
                      (cube_id, user_id, display_name))
        else:
            _ensure_first_visit(c)
            c.execute("""INSERT INTO cube_visitors (cube_id, user_id, display_name, last_visit, first_visit)
                         VALUES (?, ?, ?, datetime('now'), datetime('now'))
                         ON CONFLICT (cube_id, user_id) DO UPDATE
                           SET display_name=excluded.display_name, last_visit=datetime('now')""",
                      (cube_id, user_id, display_name))
        conn.commit(); conn.close()
    except Exception:
        pass  # Non-critical — never crash a WS connection

def get_cube_visitors(cube_id: int, limit: int = 100):
    """Return all users who ever visited this cube (persistent across server restarts)."""
    try:
        conn = get_db(); c = conn.cursor()
        if _PG:
            c.execute("""SELECT u.id, u.display_name, u.avatar_url, cv.last_visit
                         FROM cube_visitors cv JOIN users u ON u.id = cv.user_id
                         WHERE cv.cube_id = %s AND u.is_active = 1
                         ORDER BY cv.last_visit DESC LIMIT %s""", (cube_id, limit))
        else:
            c.execute("""SELECT u.id, u.display_name, u.avatar_url, cv.last_visit
                         FROM cube_visitors cv JOIN users u ON u.id = cv.user_id
                         WHERE cv.cube_id = ? AND u.is_active = 1
                         ORDER BY cv.last_visit DESC LIMIT ?""", (cube_id, limit))
        rows = c.fetchall(); conn.close()
        return _fetchall(rows)
    except Exception:
        return []

def get_user_joined_cubes(user_id: int):
    """Return cubes the user joined via key (not owned, not banned, not expired)."""
    try:
        conn = get_db(); c = conn.cursor()
        if _PG:
            c.execute("""
                SELECT cb.id, cb.name, cb.icon, cb.color, cb.type,
                       CAST(EXTRACT(EPOCH FROM (cb.expires_at - NOW())) AS BIGINT) as life_left_seconds
                FROM cube_visitors cv
                JOIN cubes cb ON cb.id = cv.cube_id
                WHERE cv.user_id = %s
                  AND cb.owner_id != %s
                  AND cb.is_active = 1
                  AND (cb.expires_at IS NULL OR cb.expires_at > NOW())
                  AND NOT EXISTS (SELECT 1 FROM cube_bans b WHERE b.cube_id=cb.id AND b.user_id=%s)
                ORDER BY cv.last_visit DESC
                LIMIT 100
            """, (user_id, user_id, user_id))
        else:
            c.execute("""
                SELECT cb.id, cb.name, cb.icon, cb.color, cb.type,
                       CAST((julianday(cb.expires_at) - julianday('now')) * 86400 AS INTEGER) as life_left_seconds
                FROM cube_visitors cv
                JOIN cubes cb ON cb.id = cv.cube_id
                WHERE cv.user_id = ?
                  AND cb.owner_id != ?
                  AND cb.is_active = 1
                  AND (cb.expires_at IS NULL OR cb.expires_at > datetime('now'))
                  AND NOT EXISTS (SELECT 1 FROM cube_bans b WHERE b.cube_id=cb.id AND b.user_id=?)
                ORDER BY cv.last_visit DESC
                LIMIT 100
            """, (user_id, user_id, user_id))
        rows = c.fetchall(); conn.close()
        return _fetchall(rows)
    except Exception:
        return []

def get_cube_message_senders(cube_id: int, limit: int = 50):
    """Return distinct users who sent messages in this cube (recent participants for kick search)."""
    conn = get_db(); c = conn.cursor()
    if _PG:
        c.execute("""
            SELECT DISTINCT ON (u.id) u.id, u.display_name, u.avatar_url
            FROM messages m JOIN users u ON u.id = m.user_id
            WHERE m.cube_id = %s AND m.user_id IS NOT NULL
              AND m.created_at >= NOW() - INTERVAL '90 days'
            ORDER BY u.id, m.created_at DESC
            LIMIT %s
        """, (cube_id, limit))
    else:
        c.execute("""
            SELECT u.id, u.display_name, u.avatar_url
            FROM (
                SELECT user_id, MAX(created_at) as last_msg
                FROM messages WHERE cube_id=? AND user_id IS NOT NULL
                  AND created_at >= datetime('now', '-90 days')
                GROUP BY user_id ORDER BY last_msg DESC LIMIT ?
            ) m JOIN users u ON u.id = m.user_id
        """, (cube_id, limit))
    rows = c.fetchall(); conn.close()
    return _fetchall(rows)

def можно_в_куб(cube_id, user_id) -> bool:
    """Пускать ли этого человека в этот куб.

    Открытый куб — всем, кто вошёл. Закрытый — только хозяину и тем, кто
    уже заходил по ключу (запись в cube_visitors ставит /cubes/join).

    До этого проверки не было вовсе: переписку закрытого куба отдавали по
    одному номеру кому угодно, а в WebSocket пускали и читать, и писать.
    Номера при этом лежали в открытом списке кубов — то есть подбирать
    их даже не требовалось.
    """
    try:
        if not user_id:
            return False
        conn = get_db(); c = conn.cursor()
        c.execute(_q("SELECT owner_id, type FROM cubes WHERE id=?"), (int(cube_id),))
        р = _fetchone(c.fetchone())
        if not р:
            conn.close(); return False
        if str(р.get("owner_id")) == str(int(user_id)):
            conn.close(); return True
        if str(р.get("type") or "public") == "public":
            conn.close(); return True
        c.execute(_q("SELECT 1 FROM cube_visitors WHERE cube_id=? AND user_id=?"),
                  (int(cube_id), int(user_id)))
        свой = c.fetchone() is not None
        conn.close()
        return свой
    except Exception:
        try: conn.close()
        except Exception: pass
        # Сомневаешься — не пускай. Лучше лишний отказ, чем чужая переписка.
        return False


def list_cubes(viewer_id=None):
    """Кубы для мира.

    Закрытые кубы в общий список не кладём: раньше они перечислялись всем
    подряд вместе с номерами, и этот список работал как оглавление к чужим
    перепискам. Свои закрытые и те, куда человек уже заходил по ключу,
    по-прежнему видны — иначе он потерял бы их из виду.
    """
    кто = int(viewer_id) if viewer_id else 0
    conn = get_db(); c = conn.cursor()
    if _PG:
        c.execute("""SELECT id,owner_id,name,description,icon,color,type,life_hours,created_at,expires_at,
                            COALESCE(shape,'cube') as shape, shape_img,
                            CAST(EXTRACT(EPOCH FROM (expires_at - NOW())) AS BIGINT) as life_left_seconds
                     FROM cubes
                     WHERE is_active=1 AND expires_at>NOW()
                       AND (type='public' OR owner_id=%s
                            OR EXISTS(SELECT 1 FROM cube_visitors v
                                      WHERE v.cube_id=cubes.id AND v.user_id=%s))
                     ORDER BY created_at DESC LIMIT 100""",
                  (кто, кто))
    else:
        c.execute("""SELECT id,owner_id,name,description,icon,color,type,life_hours,created_at,expires_at,
                            COALESCE(shape,'cube') as shape, shape_img,
                            CAST((julianday(expires_at)-julianday('now'))*86400 AS INTEGER) as life_left_seconds
                     FROM cubes
                     WHERE is_active=1 AND expires_at>datetime('now')
                       AND (type='public' OR owner_id=?
                            OR EXISTS(SELECT 1 FROM cube_visitors v
                                      WHERE v.cube_id=cubes.id AND v.user_id=?))
                     ORDER BY created_at DESC LIMIT 100""",
                  (кто, кто))
    rows = c.fetchall()
    conn.close(); return _fetchall(rows)


# ── Messages ──────────────────────────────────────────────────────────────────

def save_message(cube_id, user_id, display_name, content,
                 msg_type='text', reply_to_id=None, expires_at=None,
                 file_name=None, file_size=None, file_data=None, duration=None):
    conn = get_db()
    sql = _q("""INSERT INTO messages
       (cube_id,user_id,display_name,content,msg_type,reply_to_id,expires_at,file_name,file_size,file_data,duration)
       VALUES (?,?,?,?,?,?,?,?,?,?,?)""")
    mid = _execute_returning(conn, sql,
          (cube_id, user_id, display_name, content, msg_type,
           reply_to_id, expires_at, file_name, file_size, file_data, duration))
    conn.commit(); conn.close(); return mid

def get_messages(cube_id, limit=50):
    conn = get_db(); c = conn.cursor()
    if _PG:
        c.execute("""SELECT id,cube_id,user_id,display_name,content,msg_type,reply_to_id,
                            file_name,file_size,duration,created_at
                     FROM messages
                     WHERE cube_id=%s AND (expires_at IS NULL OR expires_at>NOW())
                     ORDER BY created_at DESC LIMIT %s""", (cube_id, limit))
    else:
        c.execute("""SELECT id,cube_id,user_id,display_name,content,msg_type,reply_to_id,
                            file_name,file_size,duration,created_at
                     FROM messages
                     WHERE cube_id=? AND (expires_at IS NULL OR expires_at>datetime('now'))
                     ORDER BY created_at DESC LIMIT ?""", (cube_id, limit))
    rows = c.fetchall()
    conn.close(); return list(reversed(_fetchall(rows)))

def get_message_by_id(msg_id):
    conn = get_db(); c = conn.cursor()
    c.execute(_q("SELECT id,display_name,content,msg_type FROM messages WHERE id=?"), (msg_id,))
    row = c.fetchone()
    conn.close(); return _row(row)

def delete_expired_messages():
    conn = get_db(); c = conn.cursor()
    if _PG:
        c.execute("DELETE FROM messages WHERE expires_at IS NOT NULL AND expires_at<=NOW()")
        c.execute("DELETE FROM direct_messages WHERE expires_at IS NOT NULL AND expires_at<=NOW()")
    else:
        c.execute("DELETE FROM messages WHERE expires_at IS NOT NULL AND expires_at<=datetime('now')")
        c.execute("DELETE FROM direct_messages WHERE expires_at IS NOT NULL AND expires_at<=datetime('now')")
    conn.commit(); conn.close()


# ── Reactions ─────────────────────────────────────────────────────────────────

def toggle_reaction(message_id, user_id, display_name, emoji):
    conn = get_db(); c = conn.cursor()
    c.execute(_q("SELECT id FROM message_reactions WHERE message_id=? AND user_id=? AND emoji=?"),
              (message_id, user_id, emoji))
    existing = c.fetchone()
    if existing:
        c.execute(_q("DELETE FROM message_reactions WHERE id=?"), (dict(existing)["id"],))
        added = False
    else:
        c.execute(_q("INSERT INTO message_reactions (message_id,user_id,display_name,emoji) VALUES (?,?,?,?)"),
                  (message_id, user_id, display_name, emoji))
        added = True
    conn.commit()
    c.execute(_q("SELECT emoji, COUNT(*) as cnt FROM message_reactions WHERE message_id=? GROUP BY emoji"),
              (message_id,))
    rows = c.fetchall()
    conn.close()
    return {"added": added, "counts": {r["emoji"]: r["cnt"] for r in _fetchall(rows)}}

def get_reactions(message_id):
    conn = get_db(); c = conn.cursor()
    c.execute(_q("SELECT emoji, COUNT(*) as cnt FROM message_reactions WHERE message_id=? GROUP BY emoji"),
              (message_id,))
    rows = c.fetchall()
    conn.close(); return {r["emoji"]: r["cnt"] for r in _fetchall(rows)}


# ── Direct Messages ───────────────────────────────────────────────────────────

def dm_is_new_peer(from_user_id, to_user_id) -> bool:
    """Переписки с этим человеком ещё не было ни в одну сторону.

    По этому и считается лимит «новых чатов»: писать знакомым можно
    сколько угодно, а вот рассылать первое сообщение незнакомым — нет."""
    conn = get_db(); c = conn.cursor()
    было = 0
    try:
        c.execute(_q("SELECT 1 FROM direct_messages WHERE "
                     "(from_user_id=? AND to_user_id=?) OR (from_user_id=? AND to_user_id=?) "
                     "LIMIT 1"),
                  (int(from_user_id), int(to_user_id), int(to_user_id), int(from_user_id)))
        было = 1 if c.fetchone() else 0
    except Exception:
        if _PG: conn.rollback()
        было = 1                      # сомневаемся — пропускаем
    conn.close()
    return not было


def save_dm(from_user_id, to_user_id, content, msg_type='text',
            file_name=None, file_size=None, file_data=None, duration=None,
            reply_to_id=None, expires_at=None):
    conn = get_db()
    sql = _q("""INSERT INTO direct_messages
       (from_user_id,to_user_id,content,msg_type,file_name,file_size,file_data,duration,reply_to_id,expires_at)
       VALUES (?,?,?,?,?,?,?,?,?,?)""")
    mid = _execute_returning(conn, sql,
          (from_user_id, to_user_id, content, msg_type,
           file_name, file_size, file_data, duration, reply_to_id, expires_at))
    conn.commit(); conn.close(); return mid

def _ensure_dm_hidden(conn):
    """Сообщения, убранные «только у себя».

    Раньше выбранные сообщения просто пропадали с экрана и возвращались
    после перезагрузки: ни на сервере, ни где-то ещё о них не помнили.
    """
    c = conn.cursor()
    if _PG:
        sql = """CREATE TABLE IF NOT EXISTS dm_hidden(
                     id SERIAL PRIMARY KEY, user_id INTEGER NOT NULL,
                     message_id INTEGER NOT NULL,
                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                     UNIQUE(user_id, message_id))"""
    else:
        sql = """CREATE TABLE IF NOT EXISTS dm_hidden(
                     id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL,
                     message_id INTEGER NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                     UNIQUE(user_id, message_id))"""
    try: c.execute(sql); conn.commit()
    except Exception:
        if _PG: conn.rollback()


def delete_dm_message(msg_id, user_id, for_both=False):
    """Убрать сообщение: у себя — прячем, у обоих — удаляем совсем.

    «У обоих» доступно только отправителю: чужое сообщение можно убрать
    лишь у себя.
    """
    conn = get_db(); _ensure_dm_hidden(conn); c = conn.cursor()
    try:
        c.execute(_q("SELECT from_user_id, to_user_id FROM direct_messages WHERE id=?"), (msg_id,))
        row = c.fetchone()
        if not row:
            conn.close(); return {"ok": True, "already": True}
        r = dict(row) if not isinstance(row, (list, tuple)) else {"from_user_id": row[0], "to_user_id": row[1]}
        if str(r.get("from_user_id")) != str(user_id) and str(r.get("to_user_id")) != str(user_id):
            conn.close(); return {"ok": False, "error": "forbidden"}
        mine = str(r.get("from_user_id")) == str(user_id)
        if for_both and mine:
            c.execute(_q("DELETE FROM direct_messages WHERE id=?"), (msg_id,))
            conn.commit(); conn.close()
            return {"ok": True, "scope": "both"}
        c.execute(_q("INSERT INTO dm_hidden (user_id,message_id) VALUES (?,?)"), (user_id, msg_id))
        conn.commit(); conn.close()
        return {"ok": True, "scope": "me"}
    except Exception:
        if _PG: conn.rollback()
        conn.close()
        return {"ok": True, "scope": "me"}


def clear_dm_conversation(user_id, peer_id, for_both=False):
    """Очистить переписку: у себя — прячем всё, у обоих — удаляем совсем.

    Раньше приложение стучалось по адресу, которого на сервере не было:
    переписка пропадала только с экрана и возвращалась после перезагрузки.
    """
    conn = get_db(); _ensure_dm_hidden(conn); c = conn.cursor()
    n = 0
    try:
        c.execute(_q("""SELECT id FROM direct_messages
                        WHERE (from_user_id=? AND to_user_id=?)
                           OR (from_user_id=? AND to_user_id=?)"""),
                  (user_id, peer_id, peer_id, user_id))
        ids = [r['id'] for r in _fetchall(c.fetchall())]
        n = len(ids)
        if for_both:
            c.execute(_q("""DELETE FROM direct_messages
                            WHERE (from_user_id=? AND to_user_id=?)
                               OR (from_user_id=? AND to_user_id=?)"""),
                      (user_id, peer_id, peer_id, user_id))
        else:
            for i in ids:
                try: c.execute(_q("INSERT INTO dm_hidden (user_id,message_id) VALUES (?,?)"), (user_id, i))
                except Exception:
                    if _PG: conn.rollback()
        conn.commit()
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return {"ok": True, "scope": "both" if for_both else "me", "count": n}


def edit_dm_message(msg_id, user_id, content, caption=None):
    """Поменять своё сообщение.

    v=610 · У письма правится текст. У фотографии, ролика и файла в
    «content» лежит АДРЕС файла: впиши туда подпись — и вложение
    перестанет открываться. Поэтому подпись идёт в свой столбец, а
    content меняется только если прислали новый адрес (замена файла).
    """
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("SELECT from_user_id FROM direct_messages WHERE id=?"), (msg_id,))
        row = c.fetchone()
        if not row:
            conn.close(); return {"error": "not_found"}
        owner = dict(row)["from_user_id"] if not isinstance(row, (list, tuple)) else row[0]
        if str(owner) != str(user_id):
            conn.close(); return {"error": "forbidden"}
        if caption is not None:
            try:
                if content:
                    c.execute(_q("UPDATE direct_messages SET content=?, caption=?, edited=1 WHERE id=?"),
                              (content, caption, msg_id))
                else:
                    c.execute(_q("UPDATE direct_messages SET caption=?, edited=1 WHERE id=?"),
                              (caption, msg_id))
                conn.commit(); conn.close()
                return {"ok": True, "content": content, "caption": caption, "edited": 1}
            except Exception:
                # Старая база без столбца «caption» — честно говорим «нет».
                if _PG: conn.rollback()
                conn.close(); return {"error": "no_caption"}
        try:
            c.execute(_q("UPDATE direct_messages SET content=?, edited=1 WHERE id=?"),
                      (content, msg_id))
        except Exception:
            # Старая база без колонки «edited» — текст важнее метки.
            if _PG: conn.rollback()
            c = conn.cursor()
            c.execute(_q("UPDATE direct_messages SET content=? WHERE id=?"), (content, msg_id))
        conn.commit(); conn.close()
        return {"ok": True, "content": content, "edited": 1}
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return {"ok": False}


def _hidden_ids(conn, user_id):
    if not user_id: return set()
    try:
        c = conn.cursor()
        c.execute(_q("SELECT message_id FROM dm_hidden WHERE user_id=?"), (user_id,))
        return set(r["message_id"] for r in _fetchall(c.fetchall()))
    except Exception:
        if _PG: conn.rollback()
        return set()


def get_dm_history(user1_id, user2_id, limit=50):
    conn = get_db(); c = conn.cursor()
    # v=550 · «edited» отдаём вместе с сообщением: без него метка «изменено»
    # исчезала при каждом перечитывании переписки. Старая база колонки не
    # знает — тогда читаем как раньше.
    поля = "id,from_user_id,to_user_id,content,msg_type,file_name,file_size,duration,reply_to_id,created_at,expires_at"
    # v=610 · Подпись под медиа. Старая база столбца не знает — тогда
    # читаем как раньше, без неё.
    поля_с_подписью = поля + ",caption"
    срок = "expires_at>NOW()" if _PG else "expires_at>datetime('now')"
    запрос = ("SELECT {поля} FROM direct_messages "
              "WHERE ((from_user_id=? AND to_user_id=?) OR (from_user_id=? AND to_user_id=?)) "
              "AND (expires_at IS NULL OR " + срок + ") "
              "ORDER BY created_at DESC, id DESC LIMIT ?")
    значения = (user1_id, user2_id, user2_id, user1_id, limit)
    try:
        c.execute(_q(запрос.replace("{поля}", поля_с_подписью + ",edited")), значения)
        rows = _fetchall(c.fetchall())
    except Exception:
        if _PG: conn.rollback()
        c = conn.cursor()
        try:
            c.execute(_q(запрос.replace("{поля}", поля + ",edited")), значения)
            rows = _fetchall(c.fetchall())
        except Exception:
            if _PG: conn.rollback()
            c = conn.cursor()
            c.execute(_q(запрос.replace("{поля}", поля)), значения)
            rows = _fetchall(c.fetchall())
    _ensure_dm_hidden(conn)
    hide = _hidden_ids(conn, user1_id)
    conn.close()
    if hide:
        rows = [r for r in rows if r.get('id') not in hide]
    return list(reversed(rows))

def get_dm_inbox(user_id):
    """Return list of DM conversations: {peer_id, display_name, last_content, last_time, unread}"""
    conn = get_db(); c = conn.cursor()
    if _PG:
        c.execute("""
            SELECT peer_id, display_name, last_content, last_time, last_type, last_file,
                   (SELECT COUNT(*) FROM direct_messages
                    WHERE from_user_id=peer_id AND to_user_id=%s AND read_at IS NULL) AS unread
            FROM (
                SELECT CASE WHEN from_user_id=%s THEN to_user_id ELSE from_user_id END AS peer_id,
                       CASE WHEN from_user_id=%s THEN (SELECT display_name FROM users WHERE id=to_user_id)
                            ELSE (SELECT display_name FROM users WHERE id=from_user_id) END AS display_name,
                       content AS last_content, created_at AS last_time,
                       msg_type AS last_type, file_name AS last_file, id,
                       ROW_NUMBER() OVER (PARTITION BY
                           CASE WHEN from_user_id=%s THEN to_user_id ELSE from_user_id END
                           ORDER BY created_at DESC, id DESC) AS rn
                FROM direct_messages
                WHERE (from_user_id=%s OR to_user_id=%s)
                  AND (expires_at IS NULL OR expires_at>NOW())
            ) sub WHERE rn=1
            ORDER BY last_time DESC, id DESC LIMIT 50
        """, (user_id, user_id, user_id, user_id, user_id, user_id))
    else:
        c.execute("""
            SELECT peer_id, display_name, last_content, last_time, last_type, last_file,
                   (SELECT COUNT(*) FROM direct_messages
                    WHERE from_user_id=peer_id AND to_user_id=? AND read_at IS NULL) AS unread
            FROM (
                SELECT CASE WHEN from_user_id=? THEN to_user_id ELSE from_user_id END AS peer_id,
                       CASE WHEN from_user_id=? THEN (SELECT display_name FROM users WHERE id=to_user_id)
                            ELSE (SELECT display_name FROM users WHERE id=from_user_id) END AS display_name,
                       content AS last_content, created_at AS last_time,
                       msg_type AS last_type, file_name AS last_file, id,
                       ROW_NUMBER() OVER (PARTITION BY
                           CASE WHEN from_user_id=? THEN to_user_id ELSE from_user_id END
                           ORDER BY created_at DESC, id DESC) AS rn
                FROM direct_messages
                WHERE (from_user_id=? OR to_user_id=?)
                  AND (expires_at IS NULL OR expires_at>datetime('now'))
            ) sub WHERE rn=1
            ORDER BY last_time DESC, id DESC LIMIT 50
        """, (user_id, user_id, user_id, user_id, user_id, user_id))
    rows = _fetchall(c.fetchall())
    _ensure_dm_hidden(conn)
    hide = _hidden_ids(conn, user_id)
    # v=553 · Фото собеседника отдаём вместе со списком. Раньше его тут не
    # было, и список чатов рисовал букву, а картинку доставал отдельным
    # запросом на каждого — она появлялась через секунду-другую или не
    # появлялась вовсе. Один запрос на всех, одним заходом.
    лица = {}
    try:
        люди = [r.get('peer_id') for r in rows if r.get('peer_id') is not None]
        люди = list({str(x): x for x in люди}.values())
        if люди:
            места = ','.join(['%s' if _PG else '?'] * len(люди))
            c2 = conn.cursor()
            c2.execute("SELECT id, avatar_url FROM users WHERE id IN (" + места + ")", tuple(люди))
            for u in _fetchall(c2.fetchall()):
                лица[str(u.get('id'))] = u.get('avatar_url') or ''
    except Exception:
        if _PG:
            conn.rollback()
        лица = {}
    conn.close()
    result = []
    for r in rows:
        if r.get('id') in hide:
            continue
        t = r.get('last_time','')
        try:
            from datetime import datetime, timezone
            dt = datetime.fromisoformat(str(t).replace('Z','+00:00')) if t else None
            time_str = dt.strftime('%H:%M') if dt else ''
        except Exception:
            time_str = str(t)[:5] if t else ''
        result.append({
            'peer_id': r['peer_id'],
            'display_name': r.get('display_name') or uid_имя(r['peer_id']),
            'last_msg': _dm_preview(r),
            'last_type': r.get('last_type') or 'text',
            'time': time_str,
            # v=560 · Полное время последнего сообщения. По нему страница
            # понимает, что собеседник написал ПОСЛЕ того, как переписку
            # удалили у себя, и возвращает её в список как новую. Короткое
            # «ЧЧ:ММ» для этого не годится — в нём нет даты.
            'last_time_iso': str(r.get('last_time') or ''),
            'unread': r.get('unread') or 0,
            'avatar_url': лица.get(str(r.get('peer_id')), '')
        })
    return result


def _dm_preview(r):
    """Подпись последнего сообщения в списке переписок.

    Раньше в список уходило только содержимое: у фотографии, файла и
    геометки там лежит ссылка, поэтому последней строкой оставался
    прошлый текст или мелькал адрес. Теперь вид сообщения виден сразу.
    """
    body = (r.get('last_content') or '').strip()
    kind = (r.get('last_type') or 'text').lower()
    name = (r.get('last_file') or '').strip()
    if kind == 'image':   return '🖼 Фото'
    if kind == 'video':   return '🎬 Видео'
    if kind == 'voice':   return '🎙 Голосовое'
    if kind == 'sticker': return '🎭 Стикер'
    if kind == 'file':    return '📎 ' + (name or 'Файл')[:28]
    if kind == 'location' or body.startswith('geo:'): return '📍 Геолокация'
    if body.startswith('http') and len(body) > 40:
        low = body.lower()
        if any(low.split('?')[0].endswith(e) for e in ('.jpg','.jpeg','.png','.gif','.webp')): return '🖼 Фото'
        if any(low.split('?')[0].endswith(e) for e in ('.mp4','.mov','.webm')): return '🎬 Видео'
        return '📎 Файл'
    return body[:40]

def mark_dm_read(from_user_id, to_user_id):
    conn = get_db(); c = conn.cursor()
    if _PG:
        c.execute("""UPDATE direct_messages SET read_at=NOW()
                     WHERE from_user_id=%s AND to_user_id=%s AND read_at IS NULL""",
                  (from_user_id, to_user_id))
    else:
        c.execute("""UPDATE direct_messages SET read_at=datetime('now')
                     WHERE from_user_id=? AND to_user_id=? AND read_at IS NULL""",
                  (from_user_id, to_user_id))
    conn.commit(); conn.close()


# ── Posts ─────────────────────────────────────────────────────────────────────

def create_post(cube_id, user_id, display_name, content):
    conn = get_db()
    sql = _q("INSERT INTO posts (cube_id,user_id,display_name,content) VALUES (?,?,?,?)")
    pid = _execute_returning(conn, sql, (cube_id, user_id, display_name, content))
    conn.commit(); conn.close(); return pid

def get_posts(cube_id, limit=50):
    conn = get_db(); c = conn.cursor()
    c.execute(_q("SELECT id,cube_id,user_id,display_name,content,likes,created_at FROM posts WHERE cube_id=? ORDER BY created_at DESC LIMIT ?"),
              (cube_id, limit))
    rows = c.fetchall()
    conn.close(); return _fetchall(rows)

def like_post(post_id, user_id):
    conn = get_db(); c = conn.cursor()
    c.execute(_q("SELECT 1 FROM post_likes WHERE post_id=? AND user_id=?"), (post_id, user_id))
    exists = c.fetchone()
    if exists:
        c.execute(_q("DELETE FROM post_likes WHERE post_id=? AND user_id=?"), (post_id, user_id))
        if _PG:
            c.execute("UPDATE posts SET likes=GREATEST(0,likes-1) WHERE id=%s", (post_id,))
        else:
            c.execute("UPDATE posts SET likes=MAX(0,likes-1) WHERE id=?", (post_id,))
        liked = False
    else:
        try:
            c.execute(_q("INSERT INTO post_likes (post_id,user_id) VALUES (?,?)"), (post_id, user_id))
            c.execute(_q("UPDATE posts SET likes=likes+1 WHERE id=?"), (post_id,))
            liked = True
        except Exception:
            if _PG: conn.rollback()
            liked = False
    conn.commit()
    c.execute(_q("SELECT likes FROM posts WHERE id=?"), (post_id,))
    row = c.fetchone()
    conn.close(); return (dict(row)["likes"] if row else 0, liked)


# ── Video Feed ────────────────────────────────────────────────────────────────

def create_video_post(cube_id, user_id, display_name, video_url, description, music, title="", tags=""):
    conn = get_db()
    sql = _q("INSERT INTO posts (cube_id,user_id,display_name,content,video_url,description,music,title,tags) VALUES (?,?,?,?,?,?,?,?,?)")
    pid = _execute_returning(conn, sql, (cube_id, user_id, display_name, description or '', video_url or '', description or '', music or '', title or '', tags or ''))
    conn.commit(); conn.close(); return pid

def _ensure_post_columns(conn):
    """Add new columns to posts table if missing (safe to call multiple times)."""
    c = conn.cursor()
    for col_sql in [
        "ALTER TABLE posts ADD COLUMN post_type TEXT DEFAULT 'short'",
        "ALTER TABLE posts ADD COLUMN image_url TEXT DEFAULT ''",
        "ALTER TABLE posts ADD COLUMN title TEXT DEFAULT ''",
        "ALTER TABLE posts ADD COLUMN tags TEXT DEFAULT '[]'",
        # Номер исходной публикации у репоста. Нужен, чтобы репост не попадал
        # в общую ленту: он для своих подписчиков и для своего профиля.
        "ALTER TABLE posts ADD COLUMN repost_of INTEGER",
        # Ролик в ленте хранится не файлом, а записью в Bunny Stream: там
        # лежат сразу несколько качеств и кадр-заставка. Здесь — её номер,
        # адрес плейлиста и адрес заставки.
        "ALTER TABLE posts ADD COLUMN stream_id TEXT DEFAULT ''",
        "ALTER TABLE posts ADD COLUMN hls_url TEXT DEFAULT ''",
        "ALTER TABLE posts ADD COLUMN poster_url TEXT DEFAULT ''",
    ]:
        # Закрепляем КАЖДЫЙ удавшийся столбец сразу.
        #
        # Иначе на PostgreSQL выходит ловушка: все ALTER идут в одной
        # незакрытой сделке, и первый же откат (а он случается на каждом
        # столбце, который уже есть) отменяет все удачные до него. На
        # свежей базе posts заводится сразу с частью столбцов, поэтому
        # порядок был такой: repost_of добавился, следующий за ним упал
        # как существующий, откат стёр repost_of — и лента падала с
        # «column repost_of does not exist». На SQLite этого не видно.
        try:
            c.execute(col_sql)
            conn.commit()
        except Exception:
            if _PG: conn.rollback()
    conn.commit()

def get_user_profile(uid):
    conn = get_db(); c = conn.cursor()
    # last_seen нужен для подписи «в сети / недавно / давно» в шапке переписки.
    sql = _q("SELECT id, display_name, avatar_url, username, account_type, "
             "last_seen, avatar_color FROM users WHERE id = ?")
    c.execute(sql, (str(uid),))
    rows = _fetchall(c.fetchall()); conn.close()
    return rows[0] if rows else None


def feed_comment_exists(comment_id) -> bool:
    """Same guard as feed_post_exists, for comments.

    Liking or replying to a comment that is gone (deleted, or expired by its
    timer) hit the foreign key and surfaced as a 500 instead of a 404.
    """
    conn = get_db()
    try:
        c = conn.cursor()
        c.execute(_q("SELECT 1 FROM post_comments WHERE id=?"), (comment_id,))
        return c.fetchone() is not None
    except Exception:
        return False
    finally:
        conn.close()


def feed_post_author(post_id):
    """Чей это пост. Нужно, чтобы засчитывать лайк и комментарий автору, а не
    тому, кто их поставил."""
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("SELECT user_id FROM posts WHERE id=?"), (int(post_id),))
        uid = _scalar(c.fetchone(), 0)
    except Exception:
        uid = None
    conn.close()
    return int(uid) if uid else None


def feed_post_exists(post_id) -> bool:
    """Guard for endpoints that touch a post by id.

    Without it, commenting on a missing post surfaced the foreign-key
    violation as a 500, and liking one returned a cheerful 200.
    """
    conn = get_db()
    try:
        c = conn.cursor()
        c.execute(_q("SELECT 1 FROM posts WHERE id=?"), (post_id,))
        return c.fetchone() is not None
    except Exception:
        return False
    finally:
        conn.close()


def get_feed_post(post_id):
    """Одна публикация по номеру — для репоста и для открытия по ссылке."""
    conn = get_db(); _ensure_post_columns(conn); c = conn.cursor()
    try:
        c.execute(_q("SELECT * FROM posts WHERE id = ?"), (post_id,))
        rows = _fetchall(c.fetchall())
        if not rows:
            return None
        row = rows[0]
        avatars = _author_avatars(conn, [row.get('user_id')])
        _поставить_имя(row, _имена_авторов(conn, [row.get('user_id')]))
        _apply_avatar(row, avatars)
        return row
    except Exception:
        return None
    finally:
        conn.close()


def repost_feed_post(post_id, user_id, display_name):
    """Репост: копия публикации от своего имени со ссылкой на автора.

    Отдельной таблицы не завели намеренно — репост это обычная публикация,
    поэтому он сразу попадает и в ленту, и в портфолио, и считается в лайках.
    """
    src = get_feed_post(post_id)
    if not src:
        return None
    conn = get_db(); _ensure_post_columns(conn); c = conn.cursor()
    try:
        orig_name = src.get('display_name') or ''
        desc = (src.get('description') or src.get('content') or '')
        note = 'Репост от ' + orig_name if orig_name else 'Репост'
        body = (note + ('\n' + desc if desc else ''))[:2000]
        sql = _q("INSERT INTO posts (cube_id,user_id,display_name,content,video_url,"
                 "description,music,title,tags,post_type,image_url,repost_of) "
                 "VALUES (?,?,?,?,?,?,?,?,?,?,?,?)")
        pid = _execute_returning(conn, sql, (
            src.get('cube_id') or 1, user_id, display_name, body,
            src.get('video_url') or '', body, src.get('music') or '',
            src.get('title') or '', src.get('tags') or '[]',
            src.get('post_type') or 'short', src.get('image_url') or '',
            post_id))
        conn.commit()
        return pid
    except Exception:
        return None
    finally:
        conn.close()


def get_user_feed(uid, limit=30):
    conn = get_db(); _ensure_post_columns(conn); c = conn.cursor()
    sql = _q("SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC, id DESC LIMIT ?")
    c.execute(sql, (str(uid), limit))
    rows = _fetchall(c.fetchall())
    avatars = _author_avatars(conn, [r.get('user_id') for r in rows])
    имена = _имена_авторов(conn, [r.get('user_id') for r in rows])
    conn.close()
    for r in rows:
        _поставить_имя(r, имена)
        _apply_avatar(r, avatars)
    return rows


def _имена_авторов(conn, user_ids):
    """v=562 · Свежие имена авторов — одним запросом на весь список.

    Имя автора записывается ВНУТРЬ публикации в момент публикации
    (`posts.display_name`). Поэтому всё, что опубликовано раньше, навсегда
    осталось с прежним именем: человек сменил имя — а в ленте старое;
    человек ничего не заполнял — и в ленте до сих пор префикс его ключа
    «CUBE-X7MK», хотя зовут его теперь по UID.

    Берём имя из таблицы людей, а не из строки публикации. Нет своего
    имени — отдаём UID (`uid_имя`).
    """
    ids = [u for u in {str(x) for x in user_ids if x is not None}]
    if not ids:
        return {}
    c = conn.cursor()
    try:
        c.execute("SELECT id, display_name FROM users WHERE id IN (" +
                  ",".join([_PH] * len(ids)) + ")", tuple(ids))
        из = {}
        for r in _fetchall(c.fetchall()):
            ид = str(r.get("id"))
            из[ид] = (r.get("display_name") or "").strip() or uid_имя(ид)
        return из
    except Exception:
        if _PG:
            conn.rollback()
        return {}


def _поставить_имя(row, имена):
    try:
        ид = str(row.get("user_id") or "")
        if ид and имена.get(ид):
            row["display_name"] = имена[ид]
        elif ид:
            имя = (row.get("display_name") or "").strip()
            # Префикс ключа в ленте не показываем ни при каких условиях.
            if not имя or имя.upper().startswith("CUBE-"):
                row["display_name"] = uid_имя(ид)
    except Exception:
        pass


def _author_avatars(conn, user_ids):
    """Avatar reference for a set of authors — never the raw image.

    Avatars live in the users table as data: URLs. Inlining one into every
    post and every comment made list responses ~94% base64 and repeated the
    same photo once per row, which is what made the feed crawl. A list now
    carries either a short http URL (if that is what the user has) or an
    avatar_ver hash; the client turns the hash into /users/{id}/avatar,
    which the browser fetches once and caches.

    Returns {user_id: (avatar_url_or_empty, avatar_ver_or_empty)}.
    """
    ids = [u for u in {str(x) for x in user_ids if x is not None}]
    if not ids:
        return {}
    import hashlib as _h
    c = conn.cursor()
    try:
        c.execute("SELECT id, avatar_url FROM users WHERE id IN (" +
                  ",".join([_PH] * len(ids)) + ")", tuple(ids))
        out = {}
        for r in c.fetchall():
            d = dict(r)
            raw = d.get('avatar_url') or ''
            if raw.startswith('http'):
                out[str(d['id'])] = (raw, '')            # уже нормальная ссылка
            elif raw.startswith('data:'):
                # Фото: отдаём короткий хэш, картинку браузер заберёт отдельно.
                out[str(d['id'])] = ('', _h.md5(raw.encode('utf-8')).hexdigest()[:10])
            elif raw and len(raw) <= 16:
                # Эмодзи вместо фото — это пара байт, отдаём как есть.
                # Раньше эмодзи тоже превращался в хэш, клиент просил по нему
                # картинку, а сервер отдавал прозрачный пиксель: у всех, кто
                # выбрал эмодзи, кружок на экране оставался пустым.
                out[str(d['id'])] = (raw, '')
            elif raw:
                out[str(d['id'])] = ('', _h.md5(raw.encode('utf-8')).hexdigest()[:10])
            else:
                out[str(d['id'])] = ('', '')
        return out
    except Exception:
        if _PG:
            conn.rollback()
        return {}


def _apply_avatar(row, avatars):
    ref = avatars.get(str(row.get('user_id')), ('', ''))
    row['avatar_url'] = ref[0]
    row['avatar_ver'] = ref[1]
    return row


def _применить_лица(conn, строки):
    """Проставить avatar_url и avatar_ver целому списку строк.

    v=599 · Сторис, «кто смотрел» и комментарии под записью брали
    users.avatar_url как есть. У кого фото — в ответ уезжала вся картинка
    строкой data:, у кого эмодзи — клиент делал из эмодзи <img src="🥼">
    и показывал значок битой картинки. Теперь и там, и там работает то же
    правило, что в ленте.
    """
    try:
        if not строки:
            return строки
        ав = _author_avatars(conn, [р.get("user_id") for р in строки])
        for р in строки:
            _apply_avatar(р, ав)
    except Exception:
        pass
    return строки


def _live_comment_counts(conn, post_ids):
    """Real number of visible comments per post.

    posts.comment_count is only ever incremented, so it drifts as soon as a
    comment is deleted or expires. Counting the rows keeps the badge honest.
    """
    if not post_ids:
        return {}
    c = conn.cursor()
    try:
        c.execute("SELECT post_id, COUNT(*) AS n FROM post_comments WHERE post_id IN (" +
                  ",".join([_PH] * len(post_ids)) + ") "
                  "AND (expire_at IS NULL OR expire_at > " + _now_expr() + ") "
                  "GROUP BY post_id", tuple(post_ids))
        return {dict(r)['post_id']: dict(r)['n'] for r in c.fetchall()}
    except Exception:
        if _PG:
            conn.rollback()
        return {}


def _ensure_feed_extra(conn):
    """Таблицы для реакций, сохранённого и жалоб.

    Раньше «не нравится» и «огонь» никуда не писались (адреса возвращали ok
    и забывали), «Сохранить» лежало только в браузере, а жалобы не доходили
    вовсе. Создаём один раз, вызов безопасно повторять.
    """
    c = conn.cursor()
    if _PG:
        stmts = [
            """CREATE TABLE IF NOT EXISTS post_reactions(
                   id SERIAL PRIMARY KEY, post_id INTEGER NOT NULL,
                   user_id INTEGER NOT NULL, kind TEXT NOT NULL,
                   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                   UNIQUE(post_id,user_id,kind))""",
            """CREATE TABLE IF NOT EXISTS post_saves(
                   id SERIAL PRIMARY KEY, post_id INTEGER NOT NULL,
                   user_id INTEGER NOT NULL,
                   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                   UNIQUE(post_id,user_id))""",
            """CREATE TABLE IF NOT EXISTS post_reports(
                   id SERIAL PRIMARY KEY, post_id INTEGER NOT NULL,
                   user_id INTEGER NOT NULL, reason TEXT DEFAULT '',
                   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)""",
        ]
    else:
        stmts = [
            """CREATE TABLE IF NOT EXISTS post_reactions(
                   id INTEGER PRIMARY KEY AUTOINCREMENT, post_id INTEGER NOT NULL,
                   user_id INTEGER NOT NULL, kind TEXT NOT NULL,
                   created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                   UNIQUE(post_id,user_id,kind))""",
            """CREATE TABLE IF NOT EXISTS post_saves(
                   id INTEGER PRIMARY KEY AUTOINCREMENT, post_id INTEGER NOT NULL,
                   user_id INTEGER NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                   UNIQUE(post_id,user_id))""",
            """CREATE TABLE IF NOT EXISTS post_reports(
                   id INTEGER PRIMARY KEY AUTOINCREMENT, post_id INTEGER NOT NULL,
                   user_id INTEGER NOT NULL, reason TEXT DEFAULT '',
                   created_at TEXT DEFAULT CURRENT_TIMESTAMP)""",
        ]
    for s in stmts:
        try: c.execute(s)
        except Exception:
            if _PG: conn.rollback()
    conn.commit()


def _feed_extras(conn, ids, viewer_id):
    """Счётчики реакций и состояние зрителя — двумя запросами на всю страницу."""
    out = {}
    if not ids:
        return out
    for i in ids:
        out[i] = {'dislikes': 0, 'fires': 0, 'liked': False,
                  'disliked': False, 'fired': False, 'saved': False}
    marks = ",".join([_PH] * len(ids))
    c = conn.cursor()
    try:
        c.execute("SELECT post_id, kind, COUNT(*) AS n FROM post_reactions "
                  "WHERE post_id IN (" + marks + ") GROUP BY post_id, kind", tuple(ids))
        for r in _fetchall(c.fetchall()):
            box = out.get(r['post_id'])
            if not box: continue
            if r['kind'] == 'dislike': box['dislikes'] = r['n']
            elif r['kind'] == 'fire': box['fires'] = r['n']
    except Exception:
        if _PG: conn.rollback()
    if not viewer_id:
        return out
    try:
        c.execute("SELECT post_id, kind FROM post_reactions WHERE user_id=" + _PH +
                  " AND post_id IN (" + marks + ")", tuple([viewer_id] + list(ids)))
        for r in _fetchall(c.fetchall()):
            box = out.get(r['post_id'])
            if not box: continue
            if r['kind'] == 'dislike': box['disliked'] = True
            elif r['kind'] == 'fire': box['fired'] = True
    except Exception:
        if _PG: conn.rollback()
    try:
        c.execute("SELECT post_id FROM post_likes WHERE user_id=" + _PH +
                  " AND post_id IN (" + marks + ")", tuple([viewer_id] + list(ids)))
        for r in _fetchall(c.fetchall()):
            if r['post_id'] in out: out[r['post_id']]['liked'] = True
    except Exception:
        if _PG: conn.rollback()
    try:
        c.execute("SELECT post_id FROM post_saves WHERE user_id=" + _PH +
                  " AND post_id IN (" + marks + ")", tuple([viewer_id] + list(ids)))
        for r in _fetchall(c.fetchall()):
            if r['post_id'] in out: out[r['post_id']]['saved'] = True
    except Exception:
        if _PG: conn.rollback()
    return out


def _dress_feed_rows(conn, rows, viewer_id):
    import json as _json
    counts = _live_comment_counts(conn, [r['id'] for r in rows])
    avatars = _author_avatars(conn, [r.get('user_id') for r in rows])
    имена = _имена_авторов(conn, [r.get('user_id') for r in rows])
    extras = _feed_extras(conn, [r['id'] for r in rows], viewer_id)
    for r in rows:
        try: r['tags'] = _json.loads(r.get('tags') or '[]')
        except Exception: r['tags'] = []
        r.setdefault('image_url', ''); r.setdefault('post_type', 'short')
        r.setdefault('title', '')
        # Просмотры лежат в столбце views; view_count — имя для приложения.
        r['view_count'] = r.get('views') or 0
        r['comment_count'] = counts.get(r['id'], 0)
        e = extras.get(r['id']) or {}
        r['liked'] = bool(e.get('liked')); r['saved'] = bool(e.get('saved'))
        r['disliked'] = bool(e.get('disliked')); r['fired'] = bool(e.get('fired'))
        r['dislikes'] = e.get('dislikes', 0); r['fires'] = e.get('fires', 0)
        _поставить_имя(r, имена)
        _apply_avatar(r, avatars)
    return rows


def get_global_feed(limit=30, offset=0, viewer_id=None):
    conn = get_db(); _ensure_post_columns(conn); _ensure_feed_extra(conn); c = conn.cursor()
    purge_expired_comments(conn)
    # Без второго ключа публикации, созданные в одну секунду, выстраивались
    # как придётся: только что опубликованная могла оказаться не первой.
    # Репосты в общую ленту не идут: они для своих подписчиков и для своего
    # профиля, иначе одна и та же публикация шла бы в ленте дважды.
    # Старые репосты номера исходной публикации не хранят — узнаём их по
    # первой строке текста.
    sql = _q("SELECT * FROM posts WHERE repost_of IS NULL "
             "AND COALESCE(description,'') NOT LIKE 'Репост от %' "
             "ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?")
    c.execute(sql, (limit, offset))
    rows = _fetchall(c.fetchall())
    rows = _dress_feed_rows(conn, rows, viewer_id)
    conn.close()
    return rows

def get_following_feed(user_id, limit=30, viewer_id=None):
    conn = get_db(); _ensure_post_columns(conn); _ensure_feed_extra(conn); c = conn.cursor()
    sql = _q("""SELECT p.* FROM posts p
                JOIN follows f ON f.following_id=p.user_id
                WHERE f.follower_id=?
                ORDER BY p.created_at DESC, p.id DESC LIMIT ?""")
    c.execute(sql, (user_id, limit))
    rows = _fetchall(c.fetchall())
    rows = _dress_feed_rows(conn, rows, viewer_id if viewer_id is not None else user_id)
    conn.close()
    return rows


def toggle_post_reaction(post_id, user_id, kind):
    """«Не нравится» и «огонь»: повторное нажатие снимает оценку."""
    conn = get_db(); _ensure_feed_extra(conn); c = conn.cursor()
    active = False
    try:
        c.execute(_q("SELECT 1 FROM post_reactions WHERE post_id=? AND user_id=? AND kind=?"),
                  (post_id, user_id, kind))
        if c.fetchone():
            c.execute(_q("DELETE FROM post_reactions WHERE post_id=? AND user_id=? AND kind=?"),
                      (post_id, user_id, kind))
        else:
            # Одна оценка на публикацию: огонь снимает «не нравится» и наоборот.
            other = 'fire' if kind == 'dislike' else 'dislike'
            c.execute(_q("DELETE FROM post_reactions WHERE post_id=? AND user_id=? AND kind=?"),
                      (post_id, user_id, other))
            c.execute(_q("INSERT INTO post_reactions (post_id,user_id,kind) VALUES (?,?,?)"),
                      (post_id, user_id, kind))
            active = True
        conn.commit()
    except Exception:
        if _PG: conn.rollback()
    counts = {}
    try:
        c.execute(_q("SELECT kind, COUNT(*) AS n FROM post_reactions WHERE post_id=? GROUP BY kind"),
                  (post_id,))
        for r in _fetchall(c.fetchall()):
            counts[r['kind']] = r['n']
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return {'ok': True, 'kind': kind, 'active': active,
            'dislikes': counts.get('dislike', 0), 'fires': counts.get('fire', 0)}


def toggle_post_save(post_id, user_id):
    conn = get_db(); _ensure_feed_extra(conn); c = conn.cursor()
    saved = False
    try:
        c.execute(_q("SELECT 1 FROM post_saves WHERE post_id=? AND user_id=?"), (post_id, user_id))
        if c.fetchone():
            c.execute(_q("DELETE FROM post_saves WHERE post_id=? AND user_id=?"), (post_id, user_id))
        else:
            c.execute(_q("INSERT INTO post_saves (post_id,user_id) VALUES (?,?)"), (post_id, user_id))
            saved = True
        conn.commit()
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return {'ok': True, 'saved': saved}


def get_saved_posts(user_id, limit=100):
    conn = get_db(); _ensure_post_columns(conn); _ensure_feed_extra(conn); c = conn.cursor()
    rows = []
    try:
        c.execute(_q("""SELECT p.* FROM posts p JOIN post_saves s ON s.post_id=p.id
                        WHERE s.user_id=? ORDER BY s.created_at DESC, s.id DESC LIMIT ?"""), (user_id, limit))
        rows = _fetchall(c.fetchall())
        rows = _dress_feed_rows(conn, rows, user_id)
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return rows


def report_post(post_id, user_id, reason=''):
    conn = get_db(); _ensure_feed_extra(conn); c = conn.cursor()
    try:
        c.execute(_q("INSERT INTO post_reports (post_id,user_id,reason) VALUES (?,?,?)"),
                  (post_id, user_id, (reason or '')[:300]))
        conn.commit()
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return {'ok': True}


def update_feed_post(post_id, user_id, fields):
    """Правка своей публикации: заголовок, текст, музыка, теги, ссылка на файл."""
    import json as _json
    allowed = ('title', 'description', 'music', 'image_url', 'video_url', 'tags')
    sets, vals = [], []
    for k in allowed:
        if k in fields and fields[k] is not None:
            v = fields[k]
            if k == 'tags':
                v = _json.dumps(v if isinstance(v, list) else [], ensure_ascii=False)
            sets.append(k + "=" + _PH); vals.append(v)
    if 'description' in fields and fields['description'] is not None:
        sets.append("content=" + _PH); vals.append(fields['description'])
    if not sets:
        return None
    conn = get_db(); _ensure_post_columns(conn); c = conn.cursor()
    try:
        c.execute("SELECT user_id FROM posts WHERE id=" + _PH, (post_id,))
        row = c.fetchone()
        if not row:
            conn.close(); return {'error': 'not_found'}
        owner = dict(row).get('user_id') if not isinstance(row, (list, tuple)) else row[0]
        if str(owner) != str(user_id):
            conn.close(); return {'error': 'forbidden'}
        c.execute("UPDATE posts SET " + ", ".join(sets) + " WHERE id=" + _PH, tuple(vals + [post_id]))
        conn.commit()
        c.execute("SELECT * FROM posts WHERE id=" + _PH, (post_id,))
        out = _fetchall([c.fetchone()])
        out = _dress_feed_rows(conn, out, user_id)
        conn.close()
        return out[0] if out else None
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return None

def like_feed_post(post_id, user_id):
    return like_post(post_id, user_id)  # reuse existing

def _like_maps(c, table, id_col, ids, uid):
    """Aggregate like counts for a set of ids in 2 queries instead of 3 per row.

    Returns (counts, mine) where counts[id] = {'likes': n, 'dislikes': n}
    and mine[id] = 'like' | 'dislike'.
    """
    counts, mine = {}, {}
    if not ids:
        return counts, mine
    marks = ",".join([_PH] * len(ids))
    c.execute("SELECT %s AS oid, type, COUNT(*) AS n FROM %s WHERE %s IN (%s) "
              "GROUP BY %s, type" % (id_col, table, id_col, marks, id_col), tuple(ids))
    for r in c.fetchall():
        d = dict(r)
        slot = counts.setdefault(d['oid'], {'likes': 0, 'dislikes': 0})
        slot['likes' if d['type'] == 'like' else 'dislikes'] = d['n']
    if uid:
        c.execute("SELECT %s AS oid, type FROM %s WHERE %s IN (%s) AND user_id=%s"
                  % (id_col, table, id_col, marks, _PH), tuple(ids) + (uid,))
        for r in c.fetchall():
            d = dict(r)
            mine[d['oid']] = d['type']
    return counts, mine


_LAST_COMMENT_PURGE = [0.0]


def purge_expired_comments(conn=None, force=False):
    """Delete comments and replies whose expire_at has passed.

    The comment timer used to be decorative: expire_at was written on insert
    and never read again, so a "hide after 1 hour" comment stayed forever.
    This runs at most once a minute, piggybacking on comment reads, so there
    is no extra write on a busy panel.
    """
    import time as _time
    now = _time.time()
    if not force and now - _LAST_COMMENT_PURGE[0] < 60:
        return 0
    _LAST_COMMENT_PURGE[0] = now
    own = conn is None
    if own:
        conn = get_db()
    try:
        c = conn.cursor()
        n = 0
        for table in ('comment_replies', 'post_comments'):
            try:
                c.execute("DELETE FROM %s WHERE expire_at IS NOT NULL AND expire_at <= %s"
                          % (table, _now_expr()))
                n += c.rowcount if c.rowcount and c.rowcount > 0 else 0
            except Exception:
                if _PG:
                    conn.rollback()
        conn.commit()
        return n
    except Exception:
        try:
            conn.rollback()
        except Exception:
            pass
        return 0
    finally:
        if own:
            conn.close()


def get_post_comments(post_id, limit=100, user_id=None):
    """Comments for a post, each with its replies and like counts.

    Counts are aggregated in bulk. The old version ran 3 queries per comment
    and 3 per reply (300+ round trips for a busy post) and wrapped them in a
    bare `except` that reset every count to 0 — which is why like counts
    always showed zero on PostgreSQL: rows come back as dicts there, so the
    positional row[0] access raised KeyError and got swallowed.
    """
    conn = get_db(); c = conn.cursor()
    try:
        uid = int(user_id) if user_id else None
        limit = max(1, min(int(limit), 500))
        purge_expired_comments(conn)
        # expire_at отдаём клиенту: без него страница не знает, когда убрать
        # комментарий с экрана, и он висел до перезагрузки.
        c.execute(_q("SELECT id,post_id,user_id,display_name,content,created_at,expire_at "
                     "FROM post_comments WHERE post_id=? "
                     "AND (expire_at IS NULL OR expire_at > " + _now_expr() + ") "
                     "ORDER BY created_at ASC LIMIT ?"), (post_id, limit))
        comments = _fetchall(c.fetchall())
        if not comments:
            return []
        cids = [cm['id'] for cm in comments]

        _sql_rep = ("SELECT id,comment_id,user_id,display_name,content,created_at,expire_at "
                    "FROM comment_replies WHERE comment_id IN (" +
                    ",".join([_PH] * len(cids)) + ") "
                    "AND (expire_at IS NULL OR expire_at > " + _now_expr() + ") "
                    "ORDER BY created_at ASC")
        c.execute(_sql_rep, tuple(cids))
        replies = _fetchall(c.fetchall())
        rids = [rm['id'] for rm in replies]

        c_counts, c_mine = _like_maps(c, 'comment_likes', 'comment_id', cids, uid)
        r_counts, r_mine = _like_maps(c, 'reply_likes', 'reply_id', rids, uid)
        avatars = _author_avatars(conn, [x.get('user_id') for x in comments] +
                                        [x.get('user_id') for x in replies])
        имена = _имена_авторов(conn, [x.get('user_id') for x in comments] +
                                     [x.get('user_id') for x in replies])

        by_comment = {}
        for rm in replies:
            cnt = r_counts.get(rm['id'], {})
            rm['likes'] = cnt.get('likes', 0)
            rm['dislikes'] = cnt.get('dislikes', 0)
            rm['user_like'] = r_mine.get(rm['id'])
            _поставить_имя(rm, имена)
            _apply_avatar(rm, avatars)
            by_comment.setdefault(rm['comment_id'], []).append(rm)

        for cm in comments:
            cnt = c_counts.get(cm['id'], {})
            cm['likes'] = cnt.get('likes', 0)
            cm['dislikes'] = cnt.get('dislikes', 0)
            cm['user_like'] = c_mine.get(cm['id'])
            _поставить_имя(cm, имена)
            _apply_avatar(cm, avatars)
            cm['replies'] = by_comment.get(cm['id'], [])
        return comments
    finally:
        conn.close()
def add_post_comment(post_id, user_id, display_name, content, expire_seconds=None):
    conn = get_db()
    try:
        if expire_seconds:
            expire_at = _ts(datetime.utcnow() + timedelta(seconds=int(expire_seconds)))
            sql = _q("INSERT INTO post_comments (post_id,user_id,display_name,content,expire_at) VALUES (?,?,?,?,?)")
            cid = _execute_returning(conn, sql, (post_id, user_id, display_name, content, expire_at))
        else:
            sql = _q("INSERT INTO post_comments (post_id,user_id,display_name,content) VALUES (?,?,?,?)")
            cid = _execute_returning(conn, sql, (post_id, user_id, display_name, content))
        # Same connection: a second one would deadlock against this open
        # write transaction on SQLite ("database is locked").
        conn.cursor().execute(
            _q("UPDATE posts SET comment_count=comment_count+1 WHERE id=?"), (post_id,))
        conn.commit()
        return cid
    finally:
        conn.close()

def follow_user(follower_id, following_id):
    if follower_id == following_id: return False
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("INSERT INTO follows (follower_id,following_id) VALUES (?,?)"), (follower_id, following_id))
        conn.commit(); conn.close(); return True
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return False

def unfollow_user(follower_id, following_id):
    conn = get_db(); c = conn.cursor()
    c.execute(_q("DELETE FROM follows WHERE follower_id=? AND following_id=?"), (follower_id, following_id))
    conn.commit(); conn.close(); return True

def is_following(follower_id, following_id):
    conn = get_db(); c = conn.cursor()
    c.execute(_q("SELECT 1 FROM follows WHERE follower_id=? AND following_id=?"), (follower_id, following_id))
    row = c.fetchone(); conn.close(); return row is not None

def get_follow_list(user_id, вид, viewer_id=None, limit=200):
    """v=557 · Кто подписан на человека и на кого подписан он сам.

    `вид`: "followers" — подписчики (кто идёт на user_id),
           "following" — подписки (на кого идёт сам user_id).

    В каждой строке сразу всё, что нужно списку: имя, фото, метка
    «я на него подписан» и «он подписан на меня» — иначе страница
    спрашивала бы это по одному человеку, и список из полусотни стоил
    бы полсотни запросов.
    """
    conn = get_db(); c = conn.cursor()
    try:
        if вид == "followers":
            чей, другой = "following_id", "follower_id"
        else:
            чей, другой = "follower_id", "following_id"
        c.execute(_q(
            "SELECT u.id, u.display_name, u.avatar_url, u.username, f.created_at "
            "FROM follows f JOIN users u ON u.id = f." + другой + " "
            "WHERE f." + чей + "=? ORDER BY f.created_at DESC LIMIT ?"),
            (user_id, limit))
        люди = _fetchall(c.fetchall())
        if not люди:
            conn.close(); return []
        номера = [str(ч.get("id")) for ч in люди]
        мои, на_меня = set(), set()
        if viewer_id is not None and номера:
            места = ",".join(["%s" if _PG else "?"] * len(номера))
            c.execute("SELECT following_id FROM follows WHERE follower_id="
                      + ("%s" if _PG else "?") + " AND following_id IN (" + места + ")",
                      tuple([viewer_id] + номера))
            мои = set(str(r.get("following_id")) for r in _fetchall(c.fetchall()))
            c.execute("SELECT follower_id FROM follows WHERE following_id="
                      + ("%s" if _PG else "?") + " AND follower_id IN (" + места + ")",
                      tuple([viewer_id] + номера))
            на_меня = set(str(r.get("follower_id")) for r in _fetchall(c.fetchall()))
        conn.close()
        из = []
        for ч in люди:
            ид = str(ч.get("id"))
            из.append({
                "id": ид,
                "display_name": ч.get("display_name") or uid_имя(ид),
                "avatar_url": ч.get("avatar_url") or "",
                "username": ч.get("username") or "",
                "i_follow": ид in мои,
                "follows_me": ид in на_меня,
                "is_me": viewer_id is not None and str(viewer_id) == ид,
            })
        return из
    except Exception:
        if _PG:
            conn.rollback()
        conn.close()
        return []


def кто_лайкнул(вид, номер, viewer_id=None, limit=200):
    """v=585 · Кто поставил лайк. Один ответ на три вопроса:

      вид="человек" — кто лайкал ЕГО публикации (весь счёт «Лайки»);
      вид="пост"    — кто лайкнул одну публикацию;
      вид="история" — кто лайкнул историю.

    Строка та же, что у подписок (get_follow_list): имя, фото, ник и
    метки «я на него подписан» / «он на меня». Так список лайков рисуется
    тем же кодом, что подписчики, и человек видит знакомое окно.

    У post_likes времени нет вовсе (ключ — пост и человек), поэтому
    «сначала свежие» для публикаций значит «начиная с последней
    публикации». У историй время есть, там по нему и сортируем.
    """
    conn = get_db(); c = conn.cursor()
    try:
        if вид == "история":
            _сторис_готов(c)
            c.execute(_q(
                "SELECT u.id, u.display_name, u.avatar_url, u.username "
                "FROM story_likes l JOIN users u ON u.id = l.user_id "
                "WHERE l.story_id=? ORDER BY l.at DESC LIMIT ?"),
                (int(номер), limit))
        elif вид == "пост":
            c.execute(_q(
                "SELECT u.id, u.display_name, u.avatar_url, u.username "
                "FROM post_likes l JOIN users u ON u.id = l.user_id "
                "WHERE l.post_id=? LIMIT ?"),
                (int(номер), limit))
        else:
            c.execute(_q(
                "SELECT u.id, MAX(l.post_id) AS последний, u.display_name, "
                "       u.avatar_url, u.username "
                "FROM post_likes l "
                "JOIN posts p ON p.id = l.post_id "
                "JOIN users u ON u.id = l.user_id "
                "WHERE p.user_id=? AND l.user_id <> ? "
                "GROUP BY u.id, u.display_name, u.avatar_url, u.username "
                "ORDER BY последний DESC LIMIT ?"),
                (int(номер), int(номер), limit))
        люди = _fetchall(c.fetchall())
        if not люди:
            conn.close(); return []
        номера = [str(ч.get("id")) for ч in люди]
        мои, на_меня = set(), set()
        if viewer_id is not None and номера:
            места = ",".join(["%s" if _PG else "?"] * len(номера))
            c.execute("SELECT following_id FROM follows WHERE follower_id="
                      + ("%s" if _PG else "?") + " AND following_id IN (" + места + ")",
                      tuple([viewer_id] + номера))
            мои = set(str(r.get("following_id")) for r in _fetchall(c.fetchall()))
            c.execute("SELECT follower_id FROM follows WHERE following_id="
                      + ("%s" if _PG else "?") + " AND follower_id IN (" + места + ")",
                      tuple([viewer_id] + номера))
            на_меня = set(str(r.get("follower_id")) for r in _fetchall(c.fetchall()))
        conn.close()
        из = []
        for ч in люди:
            ид = str(ч.get("id"))
            из.append({
                "id": ид,
                "display_name": ч.get("display_name") or uid_имя(ид),
                "avatar_url": ч.get("avatar_url") or "",
                "username": ч.get("username") or "",
                "i_follow": ид in мои,
                "follows_me": ид in на_меня,
                "is_me": viewer_id is not None and str(viewer_id) == ид,
            })
        return из
    except Exception:
        if _PG:
            conn.rollback()
        conn.close()
        return []


def remove_follower(user_id, follower_id):
    """Убрать своего подписчика: как «удалить подписчика» в Instagram.

    Это НЕ отписка: рвётся связь «он → я», а не «я → он».
    """
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("DELETE FROM follows WHERE follower_id=? AND following_id=?"),
                  (follower_id, user_id))
        conn.commit(); conn.close(); return True
    except Exception:
        if _PG:
            conn.rollback()
        conn.close(); return False


def get_follow_counts(user_id):
    conn = get_db(); c = conn.cursor()
    c.execute(_q("SELECT COUNT(*) as cnt FROM follows WHERE following_id=?"), (user_id,))
    followers = dict(c.fetchone())["cnt"]
    c.execute(_q("SELECT COUNT(*) as cnt FROM follows WHERE follower_id=?"), (user_id,))
    following = dict(c.fetchone())["cnt"]
    conn.close()
    return {"followers_count": followers, "following_count": following}

# ── Полное обнуление площадки ────────────────────────────────────────────────
#
# Список таблиц раньше был короткий — двадцать имён из двадцати. За год их
# стало шестьдесят две, и «обнуление» чистило треть: люди исчезали, а их
# папки и файлы архива, снимки групп, истории, товары маркета и магазина,
# сохранённые посты, настройки оформления и отложенные ключи оставались
# лежать сиротами. Часть из них потом всплывала в ленте и в маркете у новых
# людей.
#
# Теперь список полный и собран от детей к родителям — это важно для SQLite,
# где нет CASCADE и строка с ссылкой на удалённого родителя не даёт очистить
# таблицу. В PostgreSQL один TRUNCATE ... CASCADE снимает этот вопрос сам,
# но порядок не мешает и там.
#
# Две таблицы НЕ чистятся намеренно:
#   cw_мета    — пометки «такая-то разовая переделка уже сделана». Сотри их —
#                и переделки пойдут заново поверх чистой базы;
#   reward_pool — это не данные людей, а одна строка настройки копилки. Её
#                не стираем, а возвращаем к нулям ниже.

ТАБЛИЦЫ_ОБНУЛЕНИЯ = [
    # истории
    'story_comment_likes', 'story_comments', 'story_likes', 'story_gifts',
    'story_seen', 'stories',
    # лента
    'comment_likes', 'reply_likes', 'comment_replies', 'post_comments',
    'post_likes', 'post_reactions', 'post_saves', 'post_views',
    'post_reports', 'posts',
    # переписки
    'message_reactions', 'dm_hidden', 'direct_messages', 'messages',
    # группы
    'group_media', 'group_messages', 'group_members', 'groups',
    # эфиры
    'stream_comments', 'stream_gifts', 'stream_watchers', 'streams',
    # маркет и магазин
    'market_files', 'market_orders', 'market_items',
    'shop_media', 'shop_orders', 'shop_items',
    # архив
    'user_files', 'user_folders',
    # кубы
    'cube_bans', 'cube_visitors', 'cube_transactions', 'cubes',
    # деньги и награды
    'swaps', 'view_payouts', 'reward_claims', 'reward_days', 'wallets',
    # ключи, планы, подписки
    'premium_subscriptions', 'user_plans', 'key_upgrades', 'pending_keys',
    'signal_subs',
    # сигналы
    'signals',
    # модерация
    'mod_recent', 'moderation_queue',
    # прочее людское
    'map_marks', 'user_prefs', 'user_activity', 'rate_counters',
    'follows', 'sessions', 'users',
]
ТАБЛИЦЫ_БЕРЕЖЁМ = ('cw_мета', 'reward_pool')


def _таблицы_в_базе(c):
    """Какие таблицы правда есть. База может быть старше списка."""
    try:
        if _PG:
            c.execute("SELECT table_name FROM information_schema.tables "
                      "WHERE table_schema='public'")
        else:
            c.execute("SELECT name FROM sqlite_master WHERE type='table'")
        ряды = c.fetchall()
    except Exception:
        return None
    имена = set()
    for р in ряды:
        if hasattr(р, "keys"):
            d = dict(р)
            имена.add(d.get("table_name") or d.get("name"))
        else:
            имена.add(р[0])
    return {и for и in имена if и}


def reset_all_data():
    """Стереть все данные людей, сохранив схему. Потом засеять восемь кубов.

    Возвращает сводку: что вычищено, что не нашлось, что не поддалось.
    """
    conn = get_db(); c = conn.cursor()
    есть = _таблицы_в_базе(c)
    список = [т for т in ТАБЛИЦЫ_ОБНУЛЕНИЯ if (есть is None or т in есть)]
    нет_в_базе = [т for т in ТАБЛИЦЫ_ОБНУЛЕНИЯ if есть is not None and т not in есть]
    не_вышло = []

    if _PG and список:
        # Одним разом: так PostgreSQL сам разбирается со связями.
        #
        # Порядок слов обязателен: RESTART IDENTITY идёт ПЕРЕД CASCADE.
        # В прежнем коде было наоборот — «CASCADE RESTART IDENTITY», и
        # PostgreSQL отвечал синтаксической ошибкой на каждую таблицу. Ошибку
        # глушил except, наружу шло бодрое «All data cleared», а в базе не
        # менялось ничего. На SQLite тот же вызов работал (там своя ветка с
        # DELETE), поэтому дома всё выглядело правильно.
        имена = ', '.join('"%s"' % т for т in список)
        try:
            c.execute("TRUNCATE TABLE %s RESTART IDENTITY CASCADE" % имена)
        except Exception:
            conn.rollback()
            # Не вышло разом — идём по одной, чтобы вычистить хотя бы то, что можно.
            for т in список:
                try:
                    c.execute('TRUNCATE TABLE "%s" RESTART IDENTITY CASCADE' % т)
                    conn.commit()
                except Exception:
                    conn.rollback(); не_вышло.append(т)
    else:
        for т in список:
            try:
                c.execute('DELETE FROM "%s"' % т)
            except Exception:
                не_вышло.append(т)
        try:
            c.execute("DELETE FROM sqlite_sequence")
        except Exception:
            pass

    # Копилка наград — не данные людей, а настройка: возвращаем к нулям.
    try:
        c.execute("DELETE FROM reward_pool")
        if _PG:
            c.execute("INSERT INTO reward_pool (id,total_usd,used_usd,monthly_usd) "
                      "VALUES (1,0,0,0)")
        else:
            c.execute("INSERT OR IGNORE INTO reward_pool (id,total_usd,used_usd,monthly_usd) "
                      "VALUES (1,0,0,0)")
    except Exception:
        if _PG: conn.rollback()

    conn.commit(); conn.close()
    seed_default_cubes()
    return {
        "вычищено": len(список) - len(не_вышло),
        "таблиц_в_списке": len(ТАБЛИЦЫ_ОБНУЛЕНИЯ),
        "не_нашлось": нет_в_базе,
        "не_поддалось": не_вышло,
        "сохранены": list(ТАБЛИЦЫ_БЕРЕЖЁМ),
    }


def seed_default_cubes():
    """Insert 8 permanent system cubes (owner_id=NULL). Safe to call multiple times."""
    default_cubes = [
        ("CUBE·GLOBAL",   "🌐", "#0095F6", "Главный куб CubeWorld"),
        ("CUBE·CRYPTO",   "₿",  "#F7931A", "Крипто-сигналы и аналитика"),
        ("CUBE·TECH",     "🖥",  "#4CC9F0", "Технологии и AI"),
        ("CUBE·ART",      "🎨", "#D65DB1", "Искусство и дизайн"),
        ("CUBE·MUSIC",    "🎵", "#845EC2", "Музыка и культура"),
        ("CUBE·SPORTS",   "⚽", "#4ade80", "Спорт и здоровье"),
        ("CUBE·BUSINESS", "💼", "#F9C74F", "Бизнес и стартапы"),
        ("CUBE·GAMING",   "🎮", "#FF6B6B", "Игры и e-sports"),
    ]
    conn = get_db(); c = conn.cursor()
    for (name, icon, color, description) in default_cubes:
        key = "SYS-" + name.replace("·", "-")
        if _PG:
            c.execute("DELETE FROM cubes WHERE cube_key=%s", (key,))
            c.execute("""INSERT INTO cubes
                         (owner_id,name,description,icon,color,type,life_hours,expires_at,cube_key,is_active)
                         VALUES (NULL,%s,%s,%s,%s,'public',876000,NOW()+INTERVAL '876000 hours',%s,1)""",
                      (name, description, icon, color, key))
        else:
            c.execute("""INSERT OR IGNORE INTO cubes
                         (owner_id,name,description,icon,color,type,life_hours,expires_at,cube_key,is_active)
                         VALUES (NULL,?,?,?,?,'public',876000,datetime('now','+876000 hours'),?,1)""",
                      (name, description, icon, color, key))
    conn.commit(); conn.close()

# ── Signals ───────────────────────────────────────────────────────────────────

def create_signal(cube_id, user_id, display_name, ticker, direction, entry_price, tp_price, sl_price, content):
    conn = get_db()
    sql = _q("""INSERT INTO signals (cube_id,user_id,display_name,ticker,direction,entry_price,tp_price,sl_price,content)
                VALUES (?,?,?,?,?,?,?,?,?)""")
    sid = _execute_returning(conn, sql,
          (cube_id, user_id, display_name, ticker, direction, entry_price, tp_price, sl_price, content))
    conn.commit(); conn.close(); return sid

def get_signals(cube_id, limit=30):
    conn = get_db(); c = conn.cursor()
    c.execute(_q("""SELECT id,cube_id,user_id,display_name,ticker,direction,entry_price,tp_price,sl_price,content,created_at
                    FROM signals WHERE cube_id=? ORDER BY created_at DESC LIMIT ?"""),
              (cube_id, limit))
    rows = c.fetchall()
    conn.close(); return _fetchall(rows)


# ── Premium ───────────────────────────────────────────────────────────────────

def is_premium(user_id):
    conn = get_db(); c = conn.cursor()
    if _PG:
        c.execute("""SELECT id FROM premium_subscriptions
                     WHERE user_id=%s AND status='active' AND expires_at>NOW()""", (user_id,))
    else:
        c.execute("""SELECT id FROM premium_subscriptions
                     WHERE user_id=? AND status='active' AND expires_at>datetime('now')""", (user_id,))
    row = c.fetchone()
    conn.close(); return row is not None

def activate_premium(user_id, months=1, payment_method=None, tx_hash=None,
                     price_usd=None):
    """v=636 · Цена в записи о подписке.

    Здесь стояло «6.99 * months» — в трёх местах подряд. Это была правда,
    пока тариф был один. С v=627 их четыре: Силвер 6.99 и 59.99, Голд
    14.99 и 129.99. Взяв Голд на год за 260 CUBE, человек получал в своей
    записи 83.88 — это 6.99 умножить на двенадцать, то есть цена чужого
    тарифа. На списание это не влияло (списывается CUBE, и списывалось
    верно), но в истории оплат стояла неправда.

    Кто зовёт без цены — получает прежний счёт, чтобы ничего не менять
    там, где тариф и правда один.
    """
    if price_usd is None:
        price_usd = 6.99 * months
    conn = get_db(); c = conn.cursor()
    if _PG:
        c.execute("""SELECT NOW() + (%s || ' months')::INTERVAL AS exp""", (str(months),))
        expires = dict(c.fetchone())["exp"]
        # No UNIQUE(user_id) on premium_subscriptions — use SELECT then INSERT/UPDATE
        c.execute("SELECT id FROM premium_subscriptions WHERE user_id=%s ORDER BY id DESC LIMIT 1", (user_id,))
        existing = c.fetchone()
        if existing:
            c.execute("""UPDATE premium_subscriptions SET expires_at=%s, price_usd=%s,
                             payment_method=%s, tx_hash=%s, status='active' WHERE id=%s""",
                      (expires, price_usd, payment_method, tx_hash, dict(existing)["id"]))
        else:
            c.execute("""INSERT INTO premium_subscriptions (user_id,expires_at,price_usd,payment_method,tx_hash,status)
                         VALUES (%s,%s,%s,%s,%s,'active')""",
                      (user_id, expires, price_usd, payment_method, tx_hash))
        c.execute("UPDATE users SET key_type='premium', premium_expires_at=%s WHERE id=%s",
                  (str(expires), user_id))
    else:
        expires = conn.execute("SELECT datetime('now','+'||?||' months')", (months,)).fetchone()[0]
        conn.execute("""INSERT OR REPLACE INTO premium_subscriptions
                        (user_id,expires_at,price_usd,payment_method,tx_hash,status)
                        VALUES (?,?,?,?,?,'active')""",
                     (user_id, expires, price_usd, payment_method, tx_hash))
        conn.execute("UPDATE users SET key_type='premium', premium_expires_at=? WHERE id=?", (expires, user_id))
    conn.commit(); conn.close()

def get_premium_info(user_id):
    conn = get_db(); c = conn.cursor()
    c.execute(_q("SELECT * FROM premium_subscriptions WHERE user_id=? ORDER BY id DESC LIMIT 1"), (user_id,))
    row = c.fetchone()
    conn.close(); return _row(row)


# ══════════════════════════════════════════════════════════════════════════════
#  ТАРИФЫ: БЕСПЛАТНЫЙ · СИЛВЕР · ГОЛД
#
#  Разбивка «мягко»: платное — это заработок и инструменты вокруг него, а не
#  сама площадка. Крутить кубы, играть, ходить по карте, вести ленту, чаты,
#  группы и истории, торговать на маркетплейсе, получать чаевые и подарки —
#  всё это на бесплатном. Деньги берём за то, что приносит деньги: эфиры,
#  сигналы, аналитика, доля в фонде наград.
#
#  Кубы — тоже по тарифу: три своих, десять, тридцать три. Не запрет, а
#  размер: на бесплатном куб заводится и работает полностью.
#
#  Цены. Силвер — те же 6.99 и 59.99, что были у прежней подписки Premium,
#  чтобы никому не поднять цену задним числом. Голд назначен вдвое дороже
#  помесячно и с той же скидкой за год. Если цифры надо другие — они лежат
#  в одном месте, здесь.
# ══════════════════════════════════════════════════════════════════════════════

ТАРИФЫ = {
    "free": {
        "имя": "Бесплатный",
        "кубов": 3,
        "эфиры": False, "сигналы": False, "аналитика": False,
        "фонд": False, "закрытые": False, "api": False, "значок": False,
        "приоритет": False,
        "мес": 0.0, "год": 0.0,
    },
    "silver": {
        "имя": "Силвер",
        "кубов": 10,
        "эфиры": True, "сигналы": True, "аналитика": True,
        "фонд": False, "закрытые": False, "api": False, "значок": True,
        "приоритет": False,
        "мес": 6.99, "год": 59.99,
    },
    "gold": {
        "имя": "Голд",
        "кубов": 33,
        "эфиры": True, "сигналы": True, "аналитика": True,
        "фонд": True, "закрытые": True, "api": True, "значок": True,
        "приоритет": True,
        "мес": 14.99, "год": 129.99,
    },
}
ПОРЯДОК_ТАРИФОВ = ["free", "silver", "gold"]
_ТАРИФЫ_ГОТОВ = False


def _тарифы_готов(c):
    """Одна таблица на человека: какой тариф, на какой срок, до когда."""
    global _ТАРИФЫ_ГОТОВ
    if _ТАРИФЫ_ГОТОВ:
        return
    ts = "TIMESTAMP" if _PG else "TEXT"
    now = "NOW()" if _PG else "CURRENT_TIMESTAMP"
    c.execute(f"""CREATE TABLE IF NOT EXISTS user_plans (
        user_id INTEGER PRIMARY KEY,
        plan TEXT NOT NULL DEFAULT 'free',
        period TEXT NOT NULL DEFAULT 'month',
        started_at {ts} NOT NULL DEFAULT {now},
        expires_at {ts},
        price_usd REAL NOT NULL DEFAULT 0,
        status TEXT NOT NULL DEFAULT 'active'
    )""")
    _ТАРИФЫ_ГОТОВ = True


def тариф_цена(plan, period="month"):
    т = ТАРИФЫ.get(str(plan or "").lower())
    if not т:
        return 0.0
    return float(т["год"] if str(period) == "year" else т["мес"])


def get_plan(user_id):
    """Какой тариф действует прямо сейчас. Срок вышел — снова бесплатный.

    Старая подписка Premium учитывается как Силвер: она была одна и давала
    ровно то, что теперь даёт Силвер. Поднимать людям цену задним числом или
    отнимать оплаченное мы не будем."""
    try:
        conn = get_db(); c = conn.cursor()
        _тарифы_готов(c)
        if _PG:
            c.execute("""SELECT plan FROM user_plans
                         WHERE user_id=%s AND status='active'
                           AND (expires_at IS NULL OR expires_at > NOW())""", (int(user_id),))
        else:
            c.execute("""SELECT plan FROM user_plans
                         WHERE user_id=? AND status='active'
                           AND (expires_at IS NULL OR expires_at > datetime('now'))""",
                      (int(user_id),))
        р = _fetchone(c.fetchone()) or {}
        conn.commit(); conn.close()
        п = str(р.get("plan") or "").lower()
        if п in ТАРИФЫ and п != "free":
            return п
    except Exception:
        try: conn.close()
        except Exception: pass
    # Прежняя подписка — как Силвер.
    try:
        if is_premium(user_id):
            return "silver"
    except Exception:
        pass
    return "free"


def plan_limits(plan):
    return dict(ТАРИФЫ.get(str(plan or "free").lower(), ТАРИФЫ["free"]))


def count_own_cubes(user_id):
    """Сколько живых кубов у человека сейчас. Погасшие не в счёт: тариф
    ограничивает одновременные кубы, а не заведённые когда-либо."""
    try:
        conn = get_db(); c = conn.cursor()
        if _PG:
            c.execute("""SELECT COUNT(*) AS n FROM cubes
                         WHERE owner_id=%s AND (expires_at IS NULL OR expires_at > NOW())""",
                      (int(user_id),))
        else:
            c.execute("""SELECT COUNT(*) AS n FROM cubes
                         WHERE owner_id=? AND (expires_at IS NULL OR expires_at > datetime('now'))""",
                      (int(user_id),))
        р = _fetchone(c.fetchone()) or {}
        conn.close()
        return int(р.get("n") or 0)
    except Exception:
        try: conn.close()
        except Exception: pass
        return 0


def plan_info(user_id):
    """Всё, что нужно показать человеку про его тариф, одним ответом."""
    п = get_plan(user_id)
    пределы = plan_limits(п)
    срок, период = None, "month"
    try:
        conn = get_db(); c = conn.cursor()
        _тарифы_готов(c)
        c.execute(_q("SELECT plan,period,expires_at,status FROM user_plans WHERE user_id=?"),
                  (int(user_id),))
        р = _fetchone(c.fetchone()) or {}
        conn.commit(); conn.close()
        if str(р.get("plan") or "").lower() == п:
            срок = р.get("expires_at")
            период = str(р.get("period") or "month")
    except Exception:
        try: conn.close()
        except Exception: pass
    занято = count_own_cubes(user_id)
    return {
        "plan": п,
        "name": пределы["имя"],
        "period": период,
        "expires_at": str(срок) if срок else None,
        "limits": пределы,
        "cubes_used": занято,
        "cubes_left": max(0, int(пределы["кубов"]) - занято),
        "prices": {к: {"month": ТАРИФЫ[к]["мес"], "year": ТАРИФЫ[к]["год"]}
                   for к in ПОРЯДОК_ТАРИФОВ},
    }


def set_plan(user_id, plan, period="month", payment_method=None, tx_hash=None):
    """Включить тариф на месяц или на год. Срок считает сервер."""
    plan = str(plan or "").lower()
    if plan not in ТАРИФЫ:
        return {"error": "нет такого тарифа"}
    period = "year" if str(period) == "year" else "month"
    месяцев = 12 if period == "year" else 1
    цена = тариф_цена(plan, period)
    conn = get_db(); c = conn.cursor()
    try:
        _тарифы_готов(c)
        if plan == "free":
            # Отказ от платного: срок не продлеваем, возвращаем на бесплатный.
            c.execute(_q("DELETE FROM user_plans WHERE user_id=?"), (int(user_id),))
            conn.commit(); conn.close()
            return {"ok": True, "plan": "free", "expires_at": None}
        if _PG:
            c.execute("SELECT NOW() + (%s || ' months')::INTERVAL AS exp", (str(месяцев),))
            срок = dict(c.fetchone())["exp"]
            c.execute("SELECT user_id FROM user_plans WHERE user_id=%s", (int(user_id),))
            if c.fetchone():
                c.execute("""UPDATE user_plans SET plan=%s, period=%s, expires_at=%s,
                                 price_usd=%s, status='active', started_at=NOW()
                             WHERE user_id=%s""",
                          (plan, period, срок, цена, int(user_id)))
            else:
                c.execute("""INSERT INTO user_plans
                             (user_id,plan,period,expires_at,price_usd,status)
                             VALUES (%s,%s,%s,%s,%s,'active')""",
                          (int(user_id), plan, period, срок, цена))
        else:
            срок = conn.execute("SELECT datetime('now','+'||?||' months')",
                                (месяцев,)).fetchone()[0]
            conn.execute("""INSERT OR REPLACE INTO user_plans
                            (user_id,plan,period,expires_at,price_usd,status)
                            VALUES (?,?,?,?,?,'active')""",
                         (int(user_id), plan, period, срок, цена))
        conn.commit(); conn.close()
        return {"ok": True, "plan": plan, "period": period,
                "expires_at": str(срок), "price_usd": цена}
    except Exception as e:
        try:
            if _PG: conn.rollback()
            conn.close()
        except Exception:
            pass
        return {"error": str(e)[:120]}


# ── Activity tracking ─────────────────────────────────────────────────────────

# Очки — это ВКЛАД, а не деньги. Фонд месяца делится между подписчиками
# пропорционально очкам. Поэтому важны не сами числа, а их соотношение.
#
# Перевес сдвинут в сторону дела: раньше календарь давал почти пятую часть
# очков активного человека, теперь — около шести процентов. Пост стоит как
# двенадцать активных дней, полученная реакция — как три четверти дня.
#
# За минуты онлайн очков больше не даём. Присутствие — самое дешёвое, что
# подделывает скрипт, и самое бесполезное для площадки. Вместо этого есть
# «активный день»: день, в котором человек хоть что-то сделал и провёл в
# приложении хотя бы несколько минут. Сутки с открытой вкладкой и сутки
# живого общения теперь дают за присутствие одинаково — двадцать очков.
# ══════════════════════════════════════════════════════════════════════════════
#  СТАВКИ НАГРАД
#
#  Платим сразу в CUBE по понятным ставкам, а не долями от чего-то. Курс
#  площадки: 1 CUBE = $0.50.
#
#  Главное правило: за дела платим заметно больше, чем за заходы. Раньше было
#  наоборот — сутки с открытой вкладкой стоили втрое дороже двадцати постов.
#
#  Активный день растёт со временем в приложении: от 0.03 CUBE за короткий
#  заход до 0.10 за четыре часа и больше. Потолок тут важнее щедрости: даже
#  круглосуточный скрипт получит 0.10 в день, то есть $1.50 в месяц — дешевле
#  подписки в $6.99, за которую его пришлось бы завести.
# ══════════════════════════════════════════════════════════════════════════════

CUBE_USD = 0.50                 # сколько стоит один CUBE

#  Ежедневных ставок за действия больше нет: по таблице Ани за пост и за
#  комментарий платят не сразу, а когда набраны просмотры (см. ниже).
REWARD_RATES = {}
POSTS_PER_DAY = 5               # осталось как предохранитель, пока не нужен

VIEWS_FOR_REWARD = 10000        # столько просмотров — и пост оплачивается
POST_VIEW_CUBE   = 0.03         # автору поста, один раз
COMMENT_VIEW_CUBE = 0.02        # автору комментария под таким постом, один раз

ACTIVE_DAY_MIN   = 0.01         # короткий заход с делом
ACTIVE_DAY_MAX   = 0.05         # четыре часа и больше
ACTIVE_DAY_FULL  = 240          # минут до полной ставки
ACTIVE_DAY_MIN_MINUTES = 5      # меньше — день вообще не считается

BONUS_WEEK  = 0.05              # семь активных дней подряд
BONUS_MONTH = 1.00              # 25 активных дней в календарном месяце
BONUS_YEAR  = 5.00              # 300 активных дней за год
MONTH_DAYS_FOR_BONUS = 25
YEAR_DAYS_FOR_BONUS  = 300

REF_PAID_CUBE = 0.10            # приглашённый оплатил подписку

# Колонки, которые считаются «настоящим делом»
_REAL_COLS = ('messages_sent', 'voice_messages', 'posts_created',
              'reactions_received', 'invites_converted')


def _is_real_day(row):
    """День засчитан, если было хоть одно дело и человек тут хоть сколько был."""
    дела = sum(float(row.get(k, 0) or 0) for k in _REAL_COLS)
    return дела > 0 and float(row.get('online_minutes', 0) or 0) >= ACTIVE_DAY_MIN_MINUTES


def active_day_cube(minutes):
    """Награда за присутствие: растёт со временем, но упирается в потолок."""
    m = max(0.0, min(float(minutes or 0), float(ACTIVE_DAY_FULL)))
    return round(ACTIVE_DAY_MIN + (ACTIVE_DAY_MAX - ACTIVE_DAY_MIN) * (m / ACTIVE_DAY_FULL), 4)


def day_cube(row):
    """Сколько CUBE человек заработал за один день — по ставкам, до урезания."""
    if not row or not _is_real_day(row):
        return 0.0
    сумма = active_day_cube(row.get('online_minutes'))
    for k, rate in REWARD_RATES.items():
        n = float(row.get(k, 0) or 0)
        if k == 'posts_created':
            n = min(n, POSTS_PER_DAY)
        сумма += n * rate
    return round(сумма, 4)


def day_breakdown(row):
    """То же самое, но построчно — чтобы показать человеку, за что."""
    out = []
    if not row or not _is_real_day(row):
        return out
    out.append({'key': 'active_day', 'n': 1,
                'cube': active_day_cube(row.get('online_minutes')),
                'minutes': int(float(row.get('online_minutes', 0) or 0))})
    for k, rate in REWARD_RATES.items():
        n = float(row.get(k, 0) or 0)
        if not n:
            continue
        if k == 'posts_created':
            n = min(n, POSTS_PER_DAY)
        out.append({'key': k, 'n': int(n), 'cube': round(n * rate, 4)})
    return out


def ping_activity(user_id):
    today = datetime.utcnow().strftime('%Y-%m-%d')
    conn = get_db(); c = conn.cursor()
    if _PG:
        c.execute("""INSERT INTO user_activity (user_id,date,online_minutes) VALUES (%s,%s,1)
                     ON CONFLICT (user_id,date) DO UPDATE SET online_minutes=user_activity.online_minutes+1""",
                  (user_id, today))
        c.execute("SELECT * FROM user_activity WHERE user_id=%s AND date=%s", (user_id, today))
    else:
        c.execute("""INSERT INTO user_activity (user_id,date,online_minutes) VALUES (?,?,1)
                     ON CONFLICT(user_id,date) DO UPDATE SET online_minutes=online_minutes+1""",
                  (user_id, today))
        c.execute("SELECT * FROM user_activity WHERE user_id=? AND date=?", (user_id, today))
    row = c.fetchone()
    if row:
        # В колонке score теперь лежат заработанные за день CUBE, а не очки.
        c.execute(_q("UPDATE user_activity SET score=? WHERE user_id=? AND date=?"),
                  (day_cube(dict(row)), user_id, today))
    conn.commit(); conn.close()

_ACT_COLS_READY = False


def _ensure_activity_cols(c):
    """Полученные комментарии считаем отдельно — за них платим больше, чем за
    реакцию. Колонки в старых базах нет, добавляем на лету."""
    global _ACT_COLS_READY
    if _ACT_COLS_READY:
        return
    _ACT_COLS_READY = True
    try:
        c.execute("ALTER TABLE user_activity ADD COLUMN comments_received INTEGER NOT NULL DEFAULT 0")
        c.connection.commit()
    except Exception:
        try: c.connection.rollback()
        except Exception: pass


def record_activity(user_id, event):
    col_map = {
        'message': 'messages_sent', 'post': 'posts_created',
        'reaction_received': 'reactions_received', 'voice': 'voice_messages',
        'invite': 'invites_converted', 'comment_received': 'comments_received',
    }
    col = col_map.get(event)
    if not col: return
    today = datetime.utcnow().strftime('%Y-%m-%d')
    conn = get_db(); c = conn.cursor()
    _ensure_activity_cols(c)
    if _PG:
        c.execute(f"""INSERT INTO user_activity (user_id,date,{col}) VALUES (%s,%s,1)
                      ON CONFLICT (user_id,date) DO UPDATE SET {col}=user_activity.{col}+1""",
                  (user_id, today))
        c.execute("SELECT * FROM user_activity WHERE user_id=%s AND date=%s", (user_id, today))
    else:
        c.execute(f"""INSERT INTO user_activity (user_id,date,{col}) VALUES (?,?,1)
                      ON CONFLICT(user_id,date) DO UPDATE SET {col}={col}+1""",
                  (user_id, today))
        c.execute("SELECT * FROM user_activity WHERE user_id=? AND date=?", (user_id, today))
    row = c.fetchone()
    if row:
        # В колонке score теперь лежат заработанные за день CUBE, а не очки.
        c.execute(_q("UPDATE user_activity SET score=? WHERE user_id=? AND date=?"),
                  (day_cube(dict(row)), user_id, today))
    conn.commit(); conn.close()

def get_my_activity_stats(user_id, month=None):
    if not month:
        month = datetime.utcnow().strftime('%Y-%m')
    conn = get_db(); c = conn.cursor()
    c.execute(_q("SELECT * FROM user_activity WHERE user_id=? AND date LIKE ?"),
              (user_id, month+'%'))
    rows = _fetchall(c.fetchall())
    conn.close()
    if not rows:
        пусто = {'month': month, 'days_active': 0, 'days_seen': 0, 'earned_cube': 0,
                 'online_hours': 0, 'messages': 0, 'posts': 0,
                 'reactions_received': 0, 'comments_received': 0,
                 'voice': 0, 'invites': 0, 'streak': 0, 'rates': reward_rates()}
        пусто.update(user_level(user_id))
        return пусто
    totals = {k: sum(r.get(k, 0) or 0 for r in rows) for k in
              ['online_minutes','messages_sent','posts_created',
               'reactions_received','comments_received','voice_messages',
               'invites_converted']}
    # «Активный день» — день, в котором было дело, а не просто открытая вкладка.
    real_days = [r for r in rows if _is_real_day(r)]
    итог = {
        'month': month,
        'days_active': len(real_days),
        'days_seen': len(rows),
        'earned_cube': round(sum(day_cube(r) for r in rows), 4),
        'online_hours': round(totals['online_minutes'] / 60, 1),
        'messages': totals['messages_sent'], 'posts': totals['posts_created'],
        'reactions_received': totals['reactions_received'],
        'comments_received': totals.get('comments_received', 0),
        'voice': totals['voice_messages'], 'invites': totals['invites_converted'],
        'streak': activity_streak(user_id),
        'rates': reward_rates(),
    }
    # Уровень считается за всё время, а не за выбранный месяц.
    итог.update(user_level(user_id))
    return итог


def reward_rates():
    """Ставки одним куском — их показываем человеку на экране."""
    out = dict(REWARD_RATES)
    out['active_day_min'] = ACTIVE_DAY_MIN
    out['active_day_max'] = ACTIVE_DAY_MAX
    out['active_day_full_minutes'] = ACTIVE_DAY_FULL
    out['posts_per_day'] = POSTS_PER_DAY
    out['bonus_week'] = BONUS_WEEK
    out['bonus_month'] = BONUS_MONTH
    out['bonus_year'] = BONUS_YEAR
    out['referral_paid'] = REF_PAID_CUBE
    out['views_for_reward'] = VIEWS_FOR_REWARD
    out['post_view_cube'] = POST_VIEW_CUBE
    out['comment_view_cube'] = COMMENT_VIEW_CUBE
    out['cube_usd'] = CUBE_USD
    return out


def activity_streak(user_id, limit_days=400):
    """Сколько активных дней подряд, считая от сегодня или вчера.

    Серия настоящая: она рвётся, если день пропущен. Раньше на экране стояло
    твёрдое «7 дней» у всех и в первый же день.
    """
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("SELECT * FROM user_activity WHERE user_id=? ORDER BY date DESC LIMIT ?"),
                  (int(user_id), int(limit_days)))
        rows = _fetchall(c.fetchall())
    except Exception:
        rows = []
    conn.close()
    дни = {str(r.get('date'))[:10] for r in rows if _is_real_day(r)}
    if not дни:
        return 0
    сегодня = datetime.utcnow().date()
    старт = сегодня if сегодня.strftime('%Y-%m-%d') in дни else сегодня - timedelta(days=1)
    n = 0
    д = старт
    while д.strftime('%Y-%m-%d') in дни:
        n += 1
        д = д - timedelta(days=1)
    return n


# ══════════════════════════════════════════════════════════════════════════
#  УРОВЕНЬ И XP
#  ---------------------------------------------------------------------
#  Раньше уровень был вшит в разметку: у всех стояло «Уровень 5 · 3 420 XP».
#  Теперь он считается из настоящей активности за всё время и растёт медленно,
#  как в доте: кривая XP(L) = 50 · L^2.2, то есть каждый следующий уровень
#  дороже предыдущего. Все начинают с первого.
#
#  Проверка кривой: ур.2 — 230 XP, ур.5 — 1 785, ур.10 — 7 924,
#  ур.25 — 59 460, ур.50 — 273 500, ур.100 — 1 256 000.
#  При очень активном дне (5 постов, 20 сообщений, 30 реакций, день в сети)
#  это ~240 XP в сутки: месяц плотного пользования — 9-й уровень,
#  год — 29-й. Сотый уровень недостижим за год ни при каком раскладе.
# ══════════════════════════════════════════════════════════════════════════

XP_WEIGHTS = {
    'posts_created':      30,   # свой пост
    'comments_received':  10,   # получил комментарий
    'reactions_received':  1,   # получил лайк
    'voice_messages':      5,   # голосовое
    'messages_sent':       2,   # сообщение в чате
    'invites_converted': 500,   # приглашённый оплатил подписку
}
XP_PER_ACTIVE_DAY = 20          # за каждый активный день (дело + время в сети)
XP_LEVEL_BASE = 50.0            # коэффициент кривой
XP_LEVEL_POW = 2.2              # показатель кривой
XP_LEVEL_CAP = 100              # выше не поднимаемся


def xp_for_level(level):
    """Сколько XP всего нужно, чтобы уровень стал равен level."""
    L = max(1, int(level))
    if L <= 1:
        return 0
    return int(round(XP_LEVEL_BASE * (L ** XP_LEVEL_POW)))


def level_from_xp(xp):
    """Обратная функция: какой уровень при таком количестве XP."""
    x = max(0.0, float(xp or 0))
    if x < xp_for_level(2):
        return 1
    L = int((x / XP_LEVEL_BASE) ** (1.0 / XP_LEVEL_POW))
    # Кривую считаем с округлением, поэтому край подправляем шагом.
    while L < XP_LEVEL_CAP and xp_for_level(L + 1) <= x:
        L += 1
    while L > 1 and xp_for_level(L) > x:
        L -= 1
    return max(1, min(XP_LEVEL_CAP, L))


def xp_rows_total(rows):
    """XP по списку дней активности."""
    total = 0.0
    for r in rows or []:
        for k, w in XP_WEIGHTS.items():
            total += float(r.get(k, 0) or 0) * w
        if _is_real_day(r):
            total += XP_PER_ACTIVE_DAY
    return int(round(total))


def user_level(user_id):
    """Уровень, XP и границы текущего уровня — одним куском для экрана."""
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("SELECT * FROM user_activity WHERE user_id=?"), (int(user_id),))
        rows = _fetchall(c.fetchall())
    except Exception:
        rows = []
    conn.close()
    xp = xp_rows_total(rows)
    lvl = level_from_xp(xp)
    начало = xp_for_level(lvl)
    конец = xp_for_level(lvl + 1) if lvl < XP_LEVEL_CAP else начало
    шаг = max(1, конец - начало)
    pct = 100.0 if lvl >= XP_LEVEL_CAP else round(min(100.0, max(0.0, (xp - начало) * 100.0 / шаг)), 1)
    return {
        'xp': xp,
        'level': lvl,
        'xp_level_start': начало,
        'xp_next_level': конец,
        'xp_in_level': max(0, xp - начало),
        'xp_to_next': max(0, конец - xp) if lvl < XP_LEVEL_CAP else 0,
        'level_pct': pct,
        'level_cap': XP_LEVEL_CAP,
    }


def rename_last_tx(user_id, description):
    """Переписать повод у последней записи человека.

    `transfer_cube` кладёт обеим сторонам один и тот же текст. Отправителю
    подходит «Перевод → Аня», а получателю в истории должно стоять
    «Перевод от Бориса», иначе он читает про самого себя."""
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("SELECT id FROM cube_transactions WHERE user_id=? "
                     "ORDER BY id DESC LIMIT 1"), (int(user_id),))
        tid = _scalar(c.fetchone(), 0)
        if tid:
            c.execute(_q("UPDATE cube_transactions SET description=? WHERE id=?"),
                      (str(description)[:200], tid))
            conn.commit()
    except Exception:
        try: conn.rollback()
        except Exception: pass
    conn.close()


def cube_balance_history(user_id, days=30):
    """Баланс по дням за последние `days` суток — для графика в кошельке.

    Считается назад от нынешнего баланса по записям в cube_transactions:
    известен сегодняшний баланс и все движения, значит известен и вчерашний.
    Это настоящая кривая. Раньше на экране был график «+72%», в котором семь
    точек брались как 58%, 65%, 70%… от текущего баланса — он показывал рост
    при любой истории, даже когда человек только тратил."""
    days = max(2, min(int(days or 30), 180))
    сегодня = datetime.utcnow().date()
    начало = сегодня - timedelta(days=days - 1)

    conn = get_db(); c = conn.cursor()
    тек = 0.0
    движения = {}
    try:
        c.execute(_q("SELECT cube_balance FROM users WHERE id=?"), (int(user_id),))
        тек = float(_scalar(c.fetchone(), 0) or 0)
        c.execute(_q("SELECT amount, created_at FROM cube_transactions "
                     "WHERE user_id=? AND created_at>=?"),
                  (int(user_id), начало.strftime('%Y-%m-%d') + ' 00:00:00'))
        for r in _fetchall(c.fetchall()):
            д = str(r.get('created_at') or '')[:10]
            if д:
                движения[д] = движения.get(д, 0.0) + float(r.get('amount') or 0)
    except Exception:
        pass
    conn.close()

    # Идём от сегодняшнего дня назад: баланс на конец вчера = сегодня минус
    # всё, что сегодня пришло и ушло.
    точки = []
    баланс = тек
    д = сегодня
    while д >= начало:
        точки.append({'day': д.strftime('%Y-%m-%d'), 'balance': round(max(0.0, баланс), 4)})
        баланс -= движения.get(д.strftime('%Y-%m-%d'), 0.0)
        д -= timedelta(days=1)
    точки.reverse()

    первый = точки[0]['balance'] if точки else 0.0
    последний = точки[-1]['balance'] if точки else 0.0
    if первый > 0:
        изм = round((последний - первый) / первый * 100, 1)
    else:
        изм = None          # с нуля процент не считается — так и скажем
    return {
        'days': days,
        'points': точки,
        'first': первый,
        'last': последний,
        'change_pct': изм,
        'moved': bool(движения),
    }


def cube_sent_today(user_id):
    """Сколько человек уже перевёл другим за сегодня.

    Ключи выдаются анонимно, значит ничто не мешает завести десяток учёток и
    гонять CUBE между ними. Пока кубы ничего не стоят, это неважно, но перед
    живыми деньгами предел нужен."""
    today = datetime.utcnow().strftime('%Y-%m-%d')
    conn = get_db(); c = conn.cursor()
    сумма = 0.0
    try:
        c.execute(_q("SELECT COALESCE(SUM(-amount),0) FROM cube_transactions "
                     "WHERE user_id=? AND tx_type='tip_out' AND amount<0 "
                     "AND created_at>=?"),
                  (int(user_id), today + ' 00:00:00'))
        сумма = float(_scalar(c.fetchone(), 0) or 0)
    except Exception:
        pass
    conn.close()
    return round(максимум_нуля(сумма), 4)


def cube_totals(user_id):
    """Сколько всего начислено и сколько пришло за сегодня — по базе.

    В модальном окне кошелька стояло «+12.4 сегодня» и «1 847 всего
    заработано» у каждого, кто его открывал."""
    today = datetime.utcnow().strftime('%Y-%m-%d')
    conn = get_db(); c = conn.cursor()
    всего = 0.0
    сегодня = 0.0
    try:
        c.execute(_q("SELECT COALESCE(SUM(amount),0) FROM cube_transactions "
                     "WHERE user_id=? AND amount>0"), (int(user_id),))
        всего = float(_scalar(c.fetchone(), 0) or 0)
        c.execute(_q("SELECT COALESCE(SUM(amount),0) FROM cube_transactions "
                     "WHERE user_id=? AND amount>0 AND created_at>=?"),
                  (int(user_id), today + ' 00:00:00'))
        сегодня = float(_scalar(c.fetchone(), 0) or 0)
    except Exception:
        pass
    conn.close()
    return {'earned_total': round(всего, 4), 'earned_today': round(сегодня, 4)}


def cube_transactions(user_id, limit=40):
    """Настоящая история начислений и списаний CUBE из базы.

    На экране кошелька раньше лежал жёстко вписанный список («Майнинг награда
    +3», «Выиграл в CryptoTetris +22») — он был одинаков у всех и ни к чему не
    относился. Здесь то, что действительно происходило со счётом."""
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("SELECT id, amount, tx_type, description, created_at "
                     "FROM cube_transactions WHERE user_id=? "
                     "ORDER BY id DESC LIMIT ?"), (int(user_id), int(limit)))
        rows = _fetchall(c.fetchall())
    except Exception:
        rows = []
    conn.close()
    out = []
    for r in rows:
        amt = float(r.get('amount') or 0)
        out.append({
            'id': r.get('id'),
            'amount': round(amt, 4),
            'dir': 'in' if amt >= 0 else 'out',
            'type': r.get('tx_type') or '',
            'description': r.get('description') or '',
            'created_at': str(r.get('created_at') or ''),
        })
    return out


REWARD_MIN_SCORE = 500.0     # ниже этого доля не выплачивается
REWARD_MAX_USD   = 5000.0    # потолок на человека в месяц


_BLOBS_CLEARED = False


def clear_message_blobs():
    """Выбросить содержимое файлов, лежащее прямо в базе.

    Колонка `file_data` хранила файл строкой base64: вложение на 25 МБ
    занимало там около 33 МБ. Гигабайтный диск Render забивался тремя
    десятками таких файлов, а когда он кончается, перестают сохраняться и
    сообщения, и посты — молча, потому что ошибка глохнет в except.

    Сами сообщения остаются на месте: имя файла, размер и ссылка в тексте
    никуда не деваются. Уходит только тело, которому в базе не место.
    """
    global _BLOBS_CLEARED
    if _BLOBS_CLEARED:
        return {'skipped': True}
    _BLOBS_CLEARED = True
    conn = get_db(); c = conn.cursor()
    освобождено, строк = 0, 0
    for таблица in ('messages', 'direct_messages'):
        try:
            c.execute("SELECT COALESCE(SUM(LENGTH(file_data)),0), COUNT(*) "
                      "FROM %s WHERE file_data IS NOT NULL AND file_data<>''" % таблица)
            row = c.fetchone()
            байт = int(_scalar(row, 0) or 0)
            n = int((list(dict(row).values())[1] if _PG else row[1]) or 0) if row else 0
            if n:
                c.execute("UPDATE %s SET file_data=NULL "
                          "WHERE file_data IS NOT NULL AND file_data<>''" % таблица)
                освобождено += байт
                строк += n
        except Exception:
            try: conn.rollback()
            except Exception: pass
    try:
        conn.commit()
    except Exception:
        pass
    conn.close()
    if строк and not _PG:
        # SQLite не отдаёт место сам: без VACUUM файл базы не уменьшится.
        try:
            cx = get_db()
            cx.isolation_level = None
            cx.execute("VACUUM")
            cx.close()
        except Exception:
            pass
    return {'rows': строк, 'freed_bytes': освобождено}


_WELCOME_FIXED = False


def welcome_bonus_migrate():
    """Приветственные 100 CUBE были убраны из кода, но у всех, кто завёл ключ
    раньше, они так и лежат на счету: на экране стоит 100, хотя человек ничего
    не делал. Любой мог печатать их себе бесконечно — ключи выдаются анонимно.

    Снимаем их один раз: на каждую запись «Welcome bonus» уменьшаем баланс на
    её сумму (не ниже нуля) и убираем саму запись из истории. Всё, что человек
    заработал после, остаётся на месте."""
    global _WELCOME_FIXED
    if _WELCOME_FIXED:
        return 0
    _WELCOME_FIXED = True
    conn = get_db(); c = conn.cursor()
    снято = 0
    try:
        c.execute(_q("SELECT id, user_id, amount FROM cube_transactions "
                     "WHERE tx_type=? AND description=?"), ('mint', 'Welcome bonus'))
        строки = _fetchall(c.fetchall())
        for r in строки:
            uid = int(r.get('user_id'))
            сумма = float(r.get('amount') or 0)
            if сумма <= 0:
                continue
            c.execute(_q("UPDATE users SET cube_balance = "
                         "CASE WHEN cube_balance - ? < 0 THEN 0 ELSE cube_balance - ? END "
                         "WHERE id=?"), (сумма, сумма, uid))
            c.execute(_q("DELETE FROM cube_transactions WHERE id=?"), (r.get('id'),))
            снято += 1
        if снято:
            conn.commit()
    except Exception:
        try: conn.rollback()
        except Exception: pass
    conn.close()
    return снято


_RPOOL_FIXED = False


def _reward_pool_migrate():
    """Старое значение фонда было вшито в схему: 83 333 в месяц и миллион
    всего. Эти числа ниоткуда не брались, но сервер уже считал по ним доли.
    Если в базе стоит ровно они — обнуляем: фонд ставится руками, когда
    появится выручка."""
    global _RPOOL_FIXED
    if _RPOOL_FIXED:
        return
    _RPOOL_FIXED = True
    conn = get_db(); c = conn.cursor()
    try:
        c.execute("SELECT monthly_usd,total_usd,used_usd FROM reward_pool WHERE id=1")
        row = _row(c.fetchone())
        if row and float(row.get('monthly_usd') or 0) == 83333.0 \
                and float(row.get('total_usd') or 0) == 1000000.0 \
                and float(row.get('used_usd') or 0) == 0.0:
            c.execute("UPDATE reward_pool SET monthly_usd=0, total_usd=0 WHERE id=1")
            conn.commit()
    except Exception:
        try: conn.rollback()
        except Exception: pass
    conn.close()


def reward_pool_get():
    _reward_pool_migrate()
    """Фонд месяца. Это НЕ инвестиция — это доля фактической выручки.

    Пока выручки нет, фонд равен нулю, и так честно и написано на экране.
    Значение ставится отдельно, когда появятся подписки.
    """
    conn = get_db(); c = conn.cursor()
    try:
        c.execute("SELECT * FROM reward_pool WHERE id=1")
        row = _row(c.fetchone()) or {}
    except Exception:
        row = {}
    conn.close()
    return {
        'monthly_usd': float(row.get('monthly_usd') or 0),
        'total_usd':   float(row.get('total_usd') or 0),
        'used_usd':    float(row.get('used_usd') or 0),
    }


def reward_pool_set(monthly_usd=None, total_usd=None):
    conn = get_db(); c = conn.cursor()
    try:
        c.execute("SELECT id FROM reward_pool WHERE id=1")
        if not c.fetchone():
            c.execute(_q("INSERT INTO reward_pool (id,total_usd,used_usd,monthly_usd) "
                         "VALUES (1,0,0,0)"))
        if monthly_usd is not None:
            c.execute(_q("UPDATE reward_pool SET monthly_usd=? WHERE id=1"), (float(monthly_usd),))
        if total_usd is not None:
            c.execute(_q("UPDATE reward_pool SET total_usd=? WHERE id=1"), (float(total_usd),))
        conn.commit()
    except Exception:
        try: conn.rollback()
        except Exception: pass
    conn.close()
    return reward_pool_get()


def _premium_active_sql(alias="a"):
    now = "NOW()" if _PG else "datetime('now')"
    return (f"EXISTS (SELECT 1 FROM premium_subscriptions p WHERE p.user_id={alias}.user_id "
            f"AND p.status='active' AND p.expires_at>{now})")


def month_total_cube(month):
    """Сколько CUBE по ставкам набрали за месяц все подписчики вместе."""
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("SELECT a.* FROM user_activity a WHERE a.date LIKE ? AND "
                     + _premium_active_sql("a")), (month + "%",))
        rows = _fetchall(c.fetchall())
    except Exception:
        rows = []
    conn.close()
    return round(sum(day_cube(r) for r in rows), 4)


def estimate_reward(user_id, month=None):
    """Сколько человек заработал за месяц по ставкам.

    Это не обещание: если за месяц все вместе наработают больше, чем есть в
    фонде, выплаты за день урезаются пропорционально — и мы это показываем.
    """
    if not month:
        month = datetime.utcnow().strftime('%Y-%m')
    прем = is_premium(user_id)
    пул = reward_pool_get()
    monthly = пул['monthly_usd']

    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("SELECT * FROM user_activity WHERE user_id=? AND date LIKE ?"),
                  (int(user_id), month + "%"))
        rows = _fetchall(c.fetchall())
    except Exception:
        rows = []
    conn.close()
    моё = round(sum(day_cube(r) for r in rows), 4)
    всё = month_total_cube(month)
    нужно_usd = всё * CUBE_USD

    out = {
        'month': month,
        'eligible': bool(прем),
        'is_premium': bool(прем),
        'cube': моё,
        'usd': round(моё * CUBE_USD, 2),
        'total_cube': всё,
        'pool_month': round(monthly, 2),
        'pool_needed': round(нужно_usd, 2),
        'cut_pct': 0.0,
        'rates': reward_rates(),
    }
    if not прем:
        out['cube'] = 0.0
        out['usd'] = 0.0
        out['reason'] = 'Награды открываются подпиской'
        return out
    if monthly <= 0:
        out['reason'] = 'Фонд этого месяца ещё не сформирован'
        return out
    if нужно_usd > monthly > 0:
        доля = monthly / нужно_usd
        out['cut_pct'] = round((1 - доля) * 100, 1)
        out['cube'] = round(моё * доля, 4)
        out['usd'] = round(out['cube'] * CUBE_USD, 2)
        out['reason'] = 'Фонд меньше, чем набрали все вместе — выплаты урезаны'
    return out


def claim_reward(user_id, month, wallet_address):
    if not is_premium(user_id):
        return None, "Требуется Premium"
    est = estimate_reward(user_id, month)
    if not est.get('eligible') or est.get('usd', 0) < 1:
        return None, "Минимальная выплата $1"
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("""INSERT INTO reward_claims (user_id,month,score,usd_amount,wallet_address,status)
                        VALUES (?,?,?,?,?,'pending')"""),
                  (user_id, month, est['score'], est['usd'], wallet_address))
        c.execute(_q("UPDATE reward_pool SET used_usd=used_usd+? WHERE id=1"), (est['usd'],))
        conn.commit(); conn.close()
        return est['usd'], None
    except Exception:
        if _PG: conn.rollback()
        conn.close()
        return None, "Награда уже запрошена за этот месяц"

# ══════════════════════════════════════════
# GROUP MESSAGES
# ══════════════════════════════════════════

def get_group_messages(group_id: int, limit: int = 80):
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("SELECT id,group_id,user_id,display_name,content,msg_type,created_at,expires_at,edited "
                     "FROM group_messages WHERE group_id=? "
                     "AND (expires_at IS NULL OR expires_at > " + _now_expr() + ") "
                     "ORDER BY id DESC LIMIT ?"), (group_id, limit))
        rows = list(reversed(_fetchall(c.fetchall())))
    except Exception:
        # v=550 · Раньше запасной путь был один и ронял сразу и срок, и метку
        # правки. Теперь отступаем по одному шагу: сначала без «edited»
        # (база старее правки), и только потом без срока.
        if _PG:
            conn.rollback()
        c = conn.cursor()
        try:
            c.execute(_q("SELECT id,group_id,user_id,display_name,content,msg_type,created_at,expires_at "
                         "FROM group_messages WHERE group_id=? "
                         "AND (expires_at IS NULL OR expires_at > " + _now_expr() + ") "
                         "ORDER BY id DESC LIMIT ?"), (group_id, limit))
            rows = list(reversed(_fetchall(c.fetchall())))
        except Exception:
            if _PG:
                conn.rollback()
            c = conn.cursor()
            c.execute(_q("SELECT id,group_id,user_id,display_name,content,msg_type,created_at "
                         "FROM group_messages WHERE group_id=? ORDER BY id DESC LIMIT ?"), (group_id, limit))
            rows = list(reversed(_fetchall(c.fetchall())))
    conn.close()
    return rows

def add_group_message(group_id: int, user_id: int, display_name: str, content: str,
                      msg_type: str = 'text', expires_at=None):
    conn = get_db(); c = conn.cursor()
    try:
        mid = _execute_returning(
            conn,
            _q("INSERT INTO group_messages (group_id,user_id,display_name,content,msg_type,expires_at) "
               "VALUES (?,?,?,?,?,?)"),
            (group_id, user_id, display_name, content, msg_type, expires_at)
        )
        conn.commit(); conn.close(); return mid
    except Exception:
        # Старая база без колонки срока — сохраняем без него, лишь бы не потерять.
        if _PG: conn.rollback()
        try:
            mid = _execute_returning(
                conn,
                _q("INSERT INTO group_messages (group_id,user_id,display_name,content,msg_type) "
                   "VALUES (?,?,?,?,?)"),
                (group_id, user_id, display_name, content, msg_type)
            )
            conn.commit(); conn.close(); return mid
        except Exception:
            if _PG: conn.rollback()
            conn.close(); return None

def join_group_by_key(group_key: str, user_id: int):
    """Join a private group by its key. Returns group dict or None."""
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("SELECT id,name,icon,type FROM groups WHERE group_key=?"), (group_key,))
        g = c.fetchone()
        if not g: conn.close(); return None
        gd = dict(g)
        gid = gd['id']
        if _PG:
            c.execute("INSERT INTO group_members (group_id,user_id) VALUES (%s,%s) ON CONFLICT DO NOTHING", (gid, user_id))
            c.execute("UPDATE groups SET member_count=(SELECT COUNT(*) FROM group_members WHERE group_id=%s) WHERE id=%s", (gid, gid))
        else:
            c.execute("INSERT OR IGNORE INTO group_members (group_id,user_id) VALUES (?,?)", (gid, user_id))
            c.execute("UPDATE groups SET member_count=(SELECT COUNT(*) FROM group_members WHERE group_id=?) WHERE id=?", (gid, gid))
        conn.commit(); conn.close(); return gd
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return None

def set_group_key(group_id: int, owner_id: int, key: str):
    """Owner sets a key for private group access."""
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("UPDATE groups SET group_key=? WHERE id=? AND owner_id=?"), (key, group_id, owner_id))
        conn.commit(); conn.close(); return True
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return False

_VIEWS_READY = False


def _ensure_views_table(c):
    """Кто какой пост уже посмотрел. Без этой таблицы просмотр можно было
    накрутить в цикле: обработчик не просил токен и не помнил, кто заходил."""
    global _VIEWS_READY
    if _VIEWS_READY:
        return
    _VIEWS_READY = True
    try:
        c.execute("""CREATE TABLE IF NOT EXISTS post_views (
            post_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (post_id, user_id)
        )""")
        c.connection.commit()
    except Exception:
        try: c.connection.rollback()
        except Exception: pass


def increment_post_views(post_id: int, user_id=None):
    """Просмотр считается один раз на человека.

    Правила: смотреть должен вошедший в систему, свой пост себе не
    засчитывается, повторные открытия того же поста не считаются. До этого
    обработчик не спрашивал токен и просто прибавлял единицу, поэтому десять
    тысяч просмотров набирались циклом за минуту, а по таблице ставок это
    настоящие деньги.
    """
    if not user_id:
        return False
    conn = get_db(); c = conn.cursor()
    try:
        _ensure_views_table(c)
        c.execute(_q("SELECT user_id FROM posts WHERE id=?"), (int(post_id),))
        row = c.fetchone()
        if row is None:
            conn.close(); return False
        автор = _scalar(row, 0)
        if автор is not None and int(автор) == int(user_id):
            conn.close(); return False          # свой пост себе не считаем
        try:
            c.execute(_q("INSERT INTO post_views (post_id,user_id) VALUES (?,?)"),
                      (int(post_id), int(user_id)))
        except Exception:
            # уже смотрел — это не ошибка, просто второй раз не считаем
            try: conn.rollback()
            except Exception: pass
            conn.close(); return False
        c.execute(_q("UPDATE posts SET views=COALESCE(views,0)+1 WHERE id=?"), (int(post_id),))
        conn.commit(); conn.close()
        return True
    except Exception:
        try: conn.rollback()
        except Exception: pass
        conn.close()
        return False


def post_view_count(post_id: int):
    """Сколько разных людей посмотрели пост."""
    conn = get_db(); c = conn.cursor()
    try:
        _ensure_views_table(c)
        c.execute(_q("SELECT COUNT(*) FROM post_views WHERE post_id=?"), (int(post_id),))
        n = int(_scalar(c.fetchone(), 0) or 0)
    except Exception:
        n = 0
    conn.close()
    return n

def get_group_info(group_id: int, user_id: int = None):
    conn = get_db(); c = conn.cursor()
    if _PG:
        c.execute("""SELECT g.id,g.owner_id,g.name,g.description,g.icon,g.type,g.handle,g.member_count,g.created_at,
                            COALESCE(gm.user_id IS NOT NULL, false) as is_member
                     FROM groups g LEFT JOIN group_members gm ON gm.group_id=g.id AND gm.user_id=%s
                     WHERE g.id=%s""", (user_id, group_id))
    else:
        c.execute("""SELECT g.id,g.owner_id,g.name,g.description,g.icon,g.type,g.handle,g.member_count,g.created_at,
                            CASE WHEN gm.user_id IS NOT NULL THEN 1 ELSE 0 END as is_member
                     FROM groups g LEFT JOIN group_members gm ON gm.group_id=g.id AND gm.user_id=?
                     WHERE g.id=?""", (user_id or 0, group_id))
    row = c.fetchone(); conn.close()
    return dict(row) if row else None

def get_group_members(group_id: int, limit: int = 50):
    conn = get_db(); c = conn.cursor()
    if _PG:
        c.execute("""SELECT u.id,u.display_name,gm.joined_at
                     FROM group_members gm JOIN users u ON u.id=gm.user_id
                     WHERE gm.group_id=%s ORDER BY gm.joined_at DESC LIMIT %s""", (group_id, limit))
    else:
        c.execute("""SELECT u.id,u.display_name,gm.joined_at
                     FROM group_members gm JOIN users u ON u.id=gm.user_id
                     WHERE gm.group_id=? ORDER BY gm.joined_at DESC LIMIT ?""", (group_id, limit))
    rows = _fetchall(c.fetchall()); conn.close()
    return rows

def get_cube_banned_ids(cube_id: int) -> set:
    """Return set of user_ids banned from this cube."""
    try:
        conn = get_db(); c = conn.cursor()
        c.execute(_q("SELECT user_id FROM cube_bans WHERE cube_id=?"), (cube_id,))
        rows = c.fetchall(); conn.close()
        return {(r["user_id"] if _PG else r[0]) for r in rows}
    except Exception:
        return set()

def ban_user_from_cube(cube_id: int, user_id: int, owner_id: int,
                       ip_hash: str = None, device_id: str = None) -> bool:
    """Ban user from cube. Also stores ip_hash+device_id for cross-account block."""
    conn = get_db(); c = conn.cursor()
    c.execute(_q("SELECT owner_id FROM cubes WHERE id=?"), (cube_id,))
    row = c.fetchone()
    if not row:
        conn.close(); return False
    row_owner = row['owner_id'] if _PG else row[0]
    if row_owner != owner_id:
        conn.close(); return False
    if _PG:
        c.execute("""INSERT INTO cube_bans(cube_id,user_id,ip_hash,device_id)
                     VALUES(%s,%s,%s,%s) ON CONFLICT(cube_id,user_id)
                     DO UPDATE SET ip_hash=EXCLUDED.ip_hash, device_id=EXCLUDED.device_id""",
                  (cube_id, user_id, ip_hash, device_id))
    else:
        c.execute("""INSERT OR REPLACE INTO cube_bans(cube_id,user_id,ip_hash,device_id)
                     VALUES(?,?,?,?)""", (cube_id, user_id, ip_hash, device_id))
    conn.commit(); conn.close()
    return True

def is_user_banned_from_cube(cube_id: int, user_id: int) -> bool:
    conn = get_db(); c = conn.cursor()
    c.execute(_q("SELECT 1 FROM cube_bans WHERE cube_id=? AND user_id=?"), (cube_id, user_id))
    row = c.fetchone(); conn.close()
    return row is not None

def is_device_banned_from_cube(cube_id: int, ip_hash: str = None, device_id: str = None) -> bool:
    """Check if an IP or device fingerprint is banned from this cube (cross-account block)."""
    if not ip_hash and not device_id:
        return False
    try:
        conn = get_db(); c = conn.cursor()
        if ip_hash and device_id:
            c.execute(_q("SELECT 1 FROM cube_bans WHERE cube_id=? AND (ip_hash=? OR device_id=?)"),
                      (cube_id, ip_hash, device_id))
        elif ip_hash:
            c.execute(_q("SELECT 1 FROM cube_bans WHERE cube_id=? AND ip_hash=?"), (cube_id, ip_hash))
        else:
            c.execute(_q("SELECT 1 FROM cube_bans WHERE cube_id=? AND device_id=?"), (cube_id, device_id))
        row = c.fetchone(); conn.close()
        return row is not None
    except Exception:
        return False


def delete_feed_post(post_id: int, user_id: int) -> bool:
    conn = get_db()
    try:
        c = conn.cursor()
        if _PG:
            c.execute("SELECT id FROM posts WHERE id=%s AND user_id=%s", (post_id, user_id))
        else:
            c.execute("SELECT id FROM posts WHERE id=? AND user_id=?", (post_id, user_id))
        if not c.fetchone():
            return False
        if _PG:
            c.execute("DELETE FROM posts WHERE id=%s", (post_id,))
        else:
            c.execute("DELETE FROM posts WHERE id=?", (post_id,))
        conn.commit()
        return True
    finally:
        conn.close()

def admin_delete_video_posts() -> int:
    conn = get_db()
    try:
        c = conn.cursor()
        if _PG:
            c.execute("DELETE FROM posts WHERE (video_url IS NOT NULL AND video_url <> '') OR post_type='short'")
        else:
            c.execute("DELETE FROM posts WHERE (video_url IS NOT NULL AND video_url != '') OR post_type='short'")
        deleted = c.rowcount
        conn.commit()
        return deleted
    finally:
        conn.close()


def toggle_comment_like(comment_id, user_id, like_type):
    conn = get_db()
    try:
        c = conn.cursor()
        c.execute(_q("SELECT type FROM comment_likes WHERE comment_id=? AND user_id=?"), (comment_id, user_id))
        existing = c.fetchone()
        if existing:
            curr = existing[0] if not hasattr(existing, "keys") else existing["type"]
            if curr == like_type:
                c.execute(_q("DELETE FROM comment_likes WHERE comment_id=? AND user_id=?"), (comment_id, user_id))
            else:
                c.execute(_q("UPDATE comment_likes SET type=? WHERE comment_id=? AND user_id=?"), (like_type, comment_id, user_id))
        else:
            c.execute(_q("INSERT INTO comment_likes (comment_id,user_id,type) VALUES (?,?,?)"), (comment_id, user_id, like_type))
        conn.commit()
        c.execute(_q("SELECT COUNT(*) FROM comment_likes WHERE comment_id=? AND type='like'"), (comment_id,))
        lrow = c.fetchone(); likes = _scalar(lrow)
        c.execute(_q("SELECT COUNT(*) FROM comment_likes WHERE comment_id=? AND type='dislike'"), (comment_id,))
        drow = c.fetchone(); dislikes = _scalar(drow)
        c.execute(_q("SELECT type FROM comment_likes WHERE comment_id=? AND user_id=?"), (comment_id, user_id))
        urow = c.fetchone()
        user_like = (urow[0] if not hasattr(urow, "keys") else urow["type"]) if urow else None
        return {"likes": likes, "dislikes": dislikes, "user_like": user_like}
    finally:
        conn.close()


def add_comment_reply(comment_id, user_id, display_name, content, expire_seconds=None):
    conn = get_db()
    try:
        c = conn.cursor()
        expire_at = None
        if expire_seconds:
            expire_at = _ts(datetime.utcnow() + timedelta(seconds=int(expire_seconds)))
        else:
            c.execute(_q("SELECT expire_at FROM post_comments WHERE id=?"), (comment_id,))
            prow = c.fetchone()
            if prow:
                # sqlite3.Row has .keys() but no .get(), so neither branch of
                # the old expression worked there. _scalar handles both drivers.
                parent_exp = _scalar(prow, None)
                if parent_exp:
                    expire_at = parent_exp
        if expire_at:
            sql = _q("INSERT INTO comment_replies (comment_id,user_id,display_name,content,expire_at) VALUES (?,?,?,?,?)")
            rid = _execute_returning(conn, sql, (comment_id, user_id, display_name, content, expire_at))
        else:
            sql = _q("INSERT INTO comment_replies (comment_id,user_id,display_name,content) VALUES (?,?,?,?)")
            rid = _execute_returning(conn, sql, (comment_id, user_id, display_name, content))
        conn.commit()
        c.execute(_q("SELECT id,comment_id,user_id,display_name,content,created_at FROM comment_replies WHERE id=?"), (rid,))
        return _row(c.fetchone())
    finally:
        conn.close()


def toggle_reply_like(reply_id, user_id, like_type):
    conn = get_db()
    try:
        c = conn.cursor()
        c.execute(_q("SELECT type FROM reply_likes WHERE reply_id=? AND user_id=?"), (reply_id, user_id))
        existing = c.fetchone()
        if existing:
            curr = existing[0] if not hasattr(existing, "keys") else existing["type"]
            if curr == like_type:
                c.execute(_q("DELETE FROM reply_likes WHERE reply_id=? AND user_id=?"), (reply_id, user_id))
            else:
                c.execute(_q("UPDATE reply_likes SET type=? WHERE reply_id=? AND user_id=?"), (like_type, reply_id, user_id))
        else:
            c.execute(_q("INSERT INTO reply_likes (reply_id,user_id,type) VALUES (?,?,?)"), (reply_id, user_id, like_type))
        conn.commit()
        c.execute(_q("SELECT COUNT(*) FROM reply_likes WHERE reply_id=? AND type='like'"), (reply_id,))
        lr = c.fetchone(); likes = _scalar(lr)
        c.execute(_q("SELECT COUNT(*) FROM reply_likes WHERE reply_id=? AND type='dislike'"), (reply_id,))
        dr = c.fetchone(); dislikes = _scalar(dr)
        c.execute(_q("SELECT type FROM reply_likes WHERE reply_id=? AND user_id=?"), (reply_id, user_id))
        ur = c.fetchone()
        user_like = (ur[0] if not hasattr(ur, "keys") else ur["type"]) if ur else None
        return {"likes": likes, "dislikes": dislikes, "user_like": user_like}
    finally:
        conn.close()

def delete_comment_reply(reply_id, user_id):
    conn = get_db()
    try:
        c = conn.cursor()
        c.execute(_q("SELECT user_id FROM comment_replies WHERE id=?"), (reply_id,))
        row = c.fetchone()
        if not row:
            return {"error": "not found"}
        owner = row[0] if not hasattr(row, "keys") else row["user_id"]
        if owner != user_id:
            return {"error": "forbidden"}
        c.execute(_q("DELETE FROM comment_replies WHERE id=?"), (reply_id,))
        conn.commit()
        return {"ok": True}
    finally:
        conn.close()

def edit_comment_reply(reply_id, user_id, content):
    conn = get_db()
    try:
        c = conn.cursor()
        c.execute(_q("SELECT user_id FROM comment_replies WHERE id=?"), (reply_id,))
        row = c.fetchone()
        if not row:
            return {"error": "not found"}
        owner = row[0] if not hasattr(row, "keys") else row["user_id"]
        if owner != user_id:
            return {"error": "forbidden"}
        c.execute(_q("UPDATE comment_replies SET content=? WHERE id=?"), (content, reply_id))
        conn.commit()
        return {"ok": True, "content": content}
    finally:
        conn.close()


def like_comment(comment_id, user_id, like_type):
    """Alias kept for the /feed/comment/{cid}/like route.

    Used to be a second, weaker implementation that swallowed errors and
    returned only {"ok": True}, so the two routes for the same action
    behaved differently. Now both go through toggle_comment_like and
    return {likes, dislikes, user_like}.
    """
    return toggle_comment_like(comment_id, int(user_id), like_type)


def like_reply(reply_id, user_id, like_type):
    """Alias kept for the /feed/reply/{rid}/like route. See like_comment."""
    return toggle_reply_like(reply_id, int(user_id), like_type)


def delete_post_comment(comment_id, user_id):
    """Delete own comment. Returns 'ok', 'not found' or 'forbidden'."""
    conn = get_db()
    try:
        c = conn.cursor()
        c.execute(_q("SELECT user_id FROM post_comments WHERE id=?"), (comment_id,))
        row = c.fetchone()
        if not row:
            return {"error": "not found"}
        if int(_scalar(row, -1)) != int(user_id):
            return {"error": "forbidden"}
        c.execute(_q("DELETE FROM post_comments WHERE id=? AND user_id=?"),
                  (comment_id, int(user_id)))
        conn.commit()
        return {"ok": True}
    finally:
        conn.close()


def edit_post_comment(comment_id, user_id, content):
    """Edit own comment. Returns 'ok', 'not found' or 'forbidden'."""
    conn = get_db()
    try:
        c = conn.cursor()
        c.execute(_q("SELECT user_id FROM post_comments WHERE id=?"), (comment_id,))
        row = c.fetchone()
        if not row:
            return {"error": "not found"}
        if int(_scalar(row, -1)) != int(user_id):
            return {"error": "forbidden"}
        c.execute(_q("UPDATE post_comments SET content=? WHERE id=? AND user_id=?"),
                  (content, comment_id, int(user_id)))
        conn.commit()
        return {"ok": True, "content": content}
    finally:
        conn.close()


# ══════════════════════════════════════════════════════════════════════════════
#  СИГНАЛЫ — настоящие записи вместо картинок
#
#  Сигнал нельзя отредактировать после публикации. Цену входа ставит сервер
#  по рынку, исход тоже считает сервер по котировкам. Поэтому любая цифра,
#  по которой человек решает, доверять автору или нет, — это факт из базы,
#  а не слова автора.
#
#  Состояния: open → tp | sl | expired | closed
#    tp      — цена дошла до take profit
#    sl      — цена дошла до stop loss
#    expired — срок вышел, закрыли по рынку
#    closed  — автор закрыл досрочно, по рынку
#  Во всех закрытых состояниях записан result_pct — результат при равной
#  ставке, без плеча. Он и идёт в статистику.
# ══════════════════════════════════════════════════════════════════════════════

MIN_CLOSED_FOR_RATE = 20   # до 20 закрытых сигналов процент не показываем
_SIG_READY = False
_TS = "TIMESTAMP" if _PG else "TEXT"


def _ensure_signals(c):
    """Доращиваем старую таблицу signals до нужных полей. Безопасно повторять."""
    global _SIG_READY
    if _SIG_READY:
        return
    cols = [
        ("base",        "TEXT"),
        ("quote",       "TEXT"),
        ("status",      "TEXT DEFAULT 'open'"),
        ("horizon_h",   "INTEGER DEFAULT 24"),
        ("expires_at",  _TS),
        ("closed_at",   _TS),
        ("close_price", "REAL"),
        ("result_pct",  "REAL"),
        ("access",      "TEXT DEFAULT 'free'"),
        ("reveal_at",   _TS),
        ("price_src",   "TEXT"),
        ("last_check",  _TS),
        ("tips_cube",   "REAL DEFAULT 0"),
    ]
    try:
        if _PG:
            c.execute("""SELECT column_name FROM information_schema.columns
                         WHERE table_name='signals'""")
            have = set()
            for r in c.fetchall():
                d = dict(r) if hasattr(r, "keys") else {"column_name": r[0]}
                have.add(d["column_name"])
            for name, defn in cols:
                if name in have:
                    continue
                try:
                    c.execute("SAVEPOINT _sigcol")
                    c.execute(f"ALTER TABLE signals ADD COLUMN {name} {defn}")
                    c.execute("RELEASE SAVEPOINT _sigcol")
                except Exception:
                    c.execute("ROLLBACK TO SAVEPOINT _sigcol")
        else:
            c.execute("PRAGMA table_info(signals)")
            have = set()
            for r in c.fetchall():
                have.add(r["name"] if hasattr(r, "keys") else r[1])
            for name, defn in cols:
                if name not in have:
                    try:
                        c.execute(f"ALTER TABLE signals ADD COLUMN {name} {defn}")
                    except Exception:
                        pass
        # Старые записи без разбора пары и без состояния: закрываем их как
        # неизвестные, чтобы они не попали ни в проверку цен, ни в статистику.
        c.execute("UPDATE signals SET status='void' WHERE status IS NULL OR status=''")
        # Записи старого формата: пары нет, закрыть по котировкам нечем.
        c.execute("UPDATE signals SET status='void' WHERE base IS NULL AND status='open'")
        try:
            c.execute("CREATE INDEX IF NOT EXISTS idx_signals_status ON signals(status)")
            c.execute("CREATE INDEX IF NOT EXISTS idx_signals_user ON signals(user_id)")
        except Exception:
            pass
        if _PG:
            c.execute("""CREATE TABLE IF NOT EXISTS signal_subs (
                           author_id INTEGER NOT NULL,
                           user_id   INTEGER NOT NULL,
                           expires_at TIMESTAMP,
                           created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                           PRIMARY KEY (author_id, user_id))""")
        else:
            c.execute("""CREATE TABLE IF NOT EXISTS signal_subs (
                           author_id INTEGER NOT NULL,
                           user_id   INTEGER NOT NULL,
                           expires_at TEXT,
                           created_at TEXT NOT NULL DEFAULT (datetime('now')),
                           PRIMARY KEY (author_id, user_id))""")
    except Exception:
        pass
    # Создание таблицы и индексов попадает в ту же транзакцию, что и UPDATE
    # выше. Без этого commit SQLite откатывает их при закрытии соединения.
    try:
        c.connection.commit()
    except Exception:
        pass
    _SIG_READY = True


def _sig_conn():
    conn = get_db(); c = conn.cursor()
    _ensure_signals(c)
    return conn, c


def _utc_str(dt=None):
    return (dt or datetime.utcnow()).strftime("%Y-%m-%d %H:%M:%S")


def _as_dt(v):
    """Разбор времени из базы: PostgreSQL отдаёт datetime, SQLite — строку."""
    if v is None:
        return None
    if isinstance(v, datetime):
        return v.replace(tzinfo=None)
    s = str(v).strip().replace("T", " ")
    if s.endswith("Z"):
        s = s[:-1]
    s = s.split("+")[0].strip()
    for fmt in ("%Y-%m-%d %H:%M:%S.%f", "%Y-%m-%d %H:%M:%S", "%Y-%m-%d %H:%M", "%Y-%m-%d"):
        try:
            return datetime.strptime(s, fmt)
        except Exception:
            pass
    return None


# ── Публикация ────────────────────────────────────────────────────────────────

def sig_create(cube_id, user_id, display_name, base, quote, direction,
               entry, tp, sl, horizon_h, access, reveal_min, note, price_src):
    conn, c = _sig_conn()
    now = datetime.utcnow()
    exp = now + timedelta(hours=int(horizon_h or 24))
    rev = now + timedelta(minutes=int(reveal_min or 0)) if access == "paid" else now
    ticker = f"{base}/{quote}"
    sql = _q("""INSERT INTO signals
                (cube_id,user_id,display_name,ticker,direction,entry_price,tp_price,sl_price,
                 content,base,quote,status,horizon_h,expires_at,access,reveal_at,price_src,last_check)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,'open',?,?,?,?,?,?)""")
    sid = _execute_returning(conn, sql, (
        int(cube_id), int(user_id), display_name, ticker, direction,
        float(entry), float(tp), float(sl), (note or "")[:500],
        base, quote, int(horizon_h or 24), _utc_str(exp), access,
        _utc_str(rev), price_src, _utc_str(now)))
    conn.commit(); conn.close()
    return sid


def sig_get(sid):
    conn, c = _sig_conn()
    c.execute(_q("SELECT * FROM signals WHERE id=?"), (int(sid),))
    row = c.fetchone()
    conn.close()
    return _row(row)


def sig_open_count(user_id):
    conn, c = _sig_conn()
    c.execute(_q("SELECT COUNT(*) FROM signals WHERE user_id=? AND status='open'"), (int(user_id),))
    n = int(_scalar(c.fetchone(), 0))
    conn.close()
    return n


def sig_has_open_pair(user_id, base, quote):
    conn, c = _sig_conn()
    c.execute(_q("""SELECT COUNT(*) FROM signals
                    WHERE user_id=? AND status='open' AND base=? AND quote=?"""),
              (int(user_id), base, quote))
    n = int(_scalar(c.fetchone(), 0))
    conn.close()
    return n > 0


# ── Проверка цен и закрытие ───────────────────────────────────────────────────

def sig_open_batch(limit=300):
    """Открытые сигналы, которым нужна сверка с котировками."""
    conn, c = _sig_conn()
    c.execute(_q("""SELECT id,user_id,base,quote,direction,entry_price,tp_price,sl_price,
                           created_at,expires_at,last_check,price_src
                    FROM signals
                    WHERE status='open' AND base IS NOT NULL AND quote IS NOT NULL
                    ORDER BY last_check ASC LIMIT ?"""), (int(limit),))
    rows = _fetchall(c.fetchall())
    conn.close()
    return rows


def sig_touch(sid, when=None):
    conn, c = _sig_conn()
    c.execute(_q("UPDATE signals SET last_check=? WHERE id=?"), (_utc_str(when), int(sid)))
    conn.commit(); conn.close()


def sig_settle(sid, status, close_price, result_pct, when=None):
    """Закрыть сигнал. Повторно закрыть нельзя — условие status='open'."""
    conn, c = _sig_conn()
    ts = _utc_str(when)
    c.execute(_q("""UPDATE signals SET status=?, close_price=?, result_pct=?,
                           closed_at=?, last_check=?
                    WHERE id=? AND status='open'"""),
              (status, float(close_price), float(result_pct), ts, ts, int(sid)))
    changed = c.rowcount
    conn.commit(); conn.close()
    return changed > 0


# ── Чтение ────────────────────────────────────────────────────────────────────

def sig_list(cube_id=None, limit=60, author_id=None, only_open=False):
    conn, c = _sig_conn()
    where = ["status<>'void'"]
    args = []
    if cube_id is not None:
        where.append("cube_id=?"); args.append(int(cube_id))
    if author_id is not None:
        where.append("user_id=?"); args.append(int(author_id))
    if only_open:
        where.append("status='open'")
    sql = ("""SELECT id,cube_id,user_id,display_name,ticker,base,quote,direction,
                     entry_price,tp_price,sl_price,content,created_at,status,
                     horizon_h,expires_at,closed_at,close_price,result_pct,
                     access,reveal_at,price_src,tips_cube
              FROM signals WHERE """ + " AND ".join(where) +
           " ORDER BY (CASE WHEN status='open' THEN 0 ELSE 1 END), created_at DESC LIMIT ?")
    args.append(int(limit))
    c.execute(_q(sql), tuple(args))
    rows = _fetchall(c.fetchall())
    conn.close()
    return rows


def sig_author_stats(user_id):
    """Статистика автора. Считается по закрытым сигналам, ничего не выдумывает."""
    conn, c = _sig_conn()
    c.execute(_q("""SELECT status,result_pct,created_at,closed_at
                    FROM signals WHERE user_id=? AND status<>'void'
                    ORDER BY created_at ASC"""), (int(user_id),))
    rows = _fetchall(c.fetchall())
    conn.close()

    total = len(rows)
    closed = [r for r in rows if r.get("status") in ("tp", "sl", "expired", "closed")
              and r.get("result_pct") is not None]
    closed.sort(key=lambda r: (_as_dt(r.get("closed_at")) or datetime.min))
    res = [float(r["result_pct"]) for r in closed]
    n = len(res)
    wins = [x for x in res if x > 0]
    losses = [x for x in res if x <= 0]

    streak, worst_streak = 0, 0
    eq, peak, dd = 0.0, 0.0, 0.0
    for x in res:
        if x <= 0:
            streak += 1
            worst_streak = max(worst_streak, streak)
        else:
            streak = 0
        eq += x
        peak = max(peak, eq)
        dd = max(dd, peak - eq)

    first = None
    for r in rows:
        d = _as_dt(r.get("created_at"))
        if d and (first is None or d < first):
            first = d
    days = int((datetime.utcnow() - first).total_seconds() // 86400) if first else 0

    if n >= 50 and days >= 90:
        level = "global"
    elif n >= 20:
        level = "author"
    else:
        level = "novice"

    return {
        "total": total,
        "open": len([r for r in rows if r.get("status") == "open"]),
        "closed": n,
        "wins": len(wins),
        # Процент выигрышей показываем только когда он уже о чём-то говорит.
        "win_rate": (round(len(wins) * 100.0 / n) if n >= MIN_CLOSED_FOR_RATE else None),
        "sum_pct": round(sum(res), 2) if n else 0.0,
        "avg_win": round(sum(wins) / len(wins), 2) if wins else 0.0,
        "avg_loss": round(sum(losses) / len(losses), 2) if losses else 0.0,
        "worst_streak": worst_streak,
        "max_dd": round(dd, 2),
        "days": days,
        "level": level,
        "need_closed": max(0, MIN_CLOSED_FOR_RATE - n),
    }


def sig_top_authors(limit=10, min_closed=20, min_days=0):
    """Общая витрина: авторы из всех кубов, отобранные по фактам, а не вручную."""
    conn, c = _sig_conn()
    c.execute("""SELECT DISTINCT user_id FROM signals
                 WHERE status<>'void' AND user_id IS NOT NULL""")
    ids = []
    for r in c.fetchall():
        d = dict(r) if hasattr(r, "keys") else {"user_id": r[0]}
        if d.get("user_id") is not None:
            ids.append(int(d["user_id"]))
    conn.close()

    out = []
    for uid in ids:
        st = sig_author_stats(uid)
        if st["closed"] < min_closed or st["days"] < min_days:
            continue
        name = get_display_name(uid)
        out.append({"user_id": uid, "name": name, "stats": st})
    out.sort(key=lambda x: x["stats"]["sum_pct"], reverse=True)
    return out[:limit]


# ── Чаевые и подписка ─────────────────────────────────────────────────────────

def transfer_cube(from_id, to_id, amount, desc=""):
    """Перевод CUBE между людьми одной операцией. Без баланса перевода нет."""
    amount = round(float(amount), 2)
    if amount <= 0 or int(from_id) == int(to_id):
        return {"error": "bad amount"}
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("SELECT cube_balance FROM users WHERE id=?"), (int(from_id),))
        row = c.fetchone()
        if row is None:
            return {"error": "no sender"}
        bal = float(_scalar(row, 0) or 0)
        if bal < amount:
            return {"error": "not enough", "balance": bal}
        # Смесь едет вместе с переводом: сначала уходят наградные, и ровно
        # столько же наградных приходит получателю. Иначе наградные можно было
        # бы превратить в выручку, прогнав через вторую свою учётку.
        _ensure_split(c)
        награды = _reward_part(c, from_id)
        из_наград = min(награды, amount)
        c.execute(_q("UPDATE users SET cube_balance=cube_balance-? WHERE id=?"), (amount, int(from_id)))
        c.execute(_q("UPDATE users SET cube_balance=cube_balance+? WHERE id=?"), (amount, int(to_id)))
        if из_наград:
            c.execute(_q("UPDATE users SET reward_balance=COALESCE(reward_balance,0)-? WHERE id=?"),
                      (из_наград, int(from_id)))
            c.execute(_q("UPDATE users SET reward_balance=COALESCE(reward_balance,0)+? WHERE id=?"),
                      (из_наград, int(to_id)))
        c.execute(_q("""INSERT INTO cube_transactions (user_id,amount,tx_type,description)
                        VALUES (?,?,?,?)"""), (int(from_id), -amount, "tip_out", desc))
        c.execute(_q("""INSERT INTO cube_transactions (user_id,amount,tx_type,description)
                        VALUES (?,?,?,?)"""), (int(to_id), amount, "tip_in", desc))
        conn.commit()
        c.execute(_q("SELECT cube_balance FROM users WHERE id=?"), (int(from_id),))
        return {"ok": True, "balance": float(_scalar(c.fetchone(), 0) or 0)}
    except Exception as e:
        try:
            conn.rollback()
        except Exception:
            pass
        return {"error": "failed"}
    finally:
        conn.close()


def sig_add_tip(sid, amount):
    conn, c = _sig_conn()
    c.execute(_q("UPDATE signals SET tips_cube=COALESCE(tips_cube,0)+? WHERE id=?"),
              (round(float(amount), 2), int(sid)))
    conn.commit(); conn.close()


def sig_sub_active(author_id, user_id):
    if int(author_id) == int(user_id):
        return True
    conn, c = _sig_conn()
    c.execute(_q("SELECT expires_at FROM signal_subs WHERE author_id=? AND user_id=?"),
              (int(author_id), int(user_id)))
    row = c.fetchone()
    conn.close()
    if not row:
        return False
    exp = _as_dt(_scalar(row, None))
    return bool(exp and exp > datetime.utcnow())


def sig_sub_grant(author_id, user_id, days=30):
    conn, c = _sig_conn()
    cur = None
    c.execute(_q("SELECT expires_at FROM signal_subs WHERE author_id=? AND user_id=?"),
              (int(author_id), int(user_id)))
    row = c.fetchone()
    if row:
        cur = _as_dt(_scalar(row, None))
    start = cur if (cur and cur > datetime.utcnow()) else datetime.utcnow()
    new_exp = _utc_str(start + timedelta(days=int(days)))
    if row:
        c.execute(_q("UPDATE signal_subs SET expires_at=? WHERE author_id=? AND user_id=?"),
                  (new_exp, int(author_id), int(user_id)))
    else:
        c.execute(_q("""INSERT INTO signal_subs (author_id,user_id,expires_at)
                        VALUES (?,?,?)"""), (int(author_id), int(user_id), new_exp))
    conn.commit(); conn.close()
    return new_exp


def sig_subs_count(author_id):
    conn, c = _sig_conn()
    c.execute(_q("SELECT COUNT(*) FROM signal_subs WHERE author_id=? AND expires_at>?"),
              (int(author_id), _utc_str()))
    n = int(_scalar(c.fetchone(), 0))
    conn.close()
    return n


# ══════════════════════════════════════════════════════════════════════════════
#  РЕФЕРАЛЫ — настоящие приглашения
#
#  Было: ссылка собиралась случайными буквами прямо в браузере и менялась при
#  каждой перезагрузке, вела на чужой домен cubewrld.io, а список приглашённых
#  состоял из трёх выдуманных строк.
#
#  Стало: у каждого человека один постоянный код, записанный на сервере.
#  Пришедший по ссылке привязывается к пригласившему один раз и навсегда.
#  Награда начисляется, когда новичок сделал первое настоящее действие —
#  написал пост, сообщение или опубликовал сигнал, — и ровно один раз.
#  Всё это настоящие записи в истории CUBE, а не прибавка к числу на экране.
# ══════════════════════════════════════════════════════════════════════════════

_REF_READY = False
_REF_ABC = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"   # без похожих друг на друга 0/O/1/I


def _ensure_ref(c):
    global _REF_READY
    if _REF_READY:
        return
    cols = [
        ("ref_code",    "TEXT"),
        ("referred_at", "TIMESTAMP" if _PG else "TEXT"),
        ("ref_paid",    "INTEGER DEFAULT 0"),
        ("ref_bonus_paid", "INTEGER DEFAULT 0"),
        ("device_id",   "TEXT"),
    ]
    try:
        if _PG:
            c.execute("""SELECT column_name FROM information_schema.columns
                         WHERE table_name='users'""")
            have = set()
            for r in c.fetchall():
                d = dict(r) if hasattr(r, "keys") else {"column_name": r[0]}
                have.add(d["column_name"])
            for name, defn in cols:
                if name in have:
                    continue
                try:
                    c.execute("SAVEPOINT _refcol")
                    c.execute(f"ALTER TABLE users ADD COLUMN {name} {defn}")
                    c.execute("RELEASE SAVEPOINT _refcol")
                except Exception:
                    c.execute("ROLLBACK TO SAVEPOINT _refcol")
        else:
            c.execute("PRAGMA table_info(users)")
            have = set()
            for r in c.fetchall():
                have.add(r["name"] if hasattr(r, "keys") else r[1])
            for name, defn in cols:
                if name not in have:
                    try:
                        c.execute(f"ALTER TABLE users ADD COLUMN {name} {defn}")
                    except Exception:
                        pass
        try:
            c.execute("CREATE UNIQUE INDEX IF NOT EXISTS ux_users_ref_code ON users(ref_code)")
            c.execute("CREATE INDEX IF NOT EXISTS idx_users_referrer ON users(referrer_id)")
        except Exception:
            pass
    except Exception:
        pass
    try:
        c.connection.commit()
    except Exception:
        pass
    _REF_READY = True


def _ref_norm(code):
    """«59gx-pfwv», « 59GX PFWV » → «59GXPFWV»."""
    s = "".join(ch for ch in str(code or "").upper() if ch.isalnum())
    return s[:16]


def ref_code_for(user_id):
    """Постоянный код приглашения. Один раз придумали — больше не меняется."""
    import secrets
    conn = get_db(); c = conn.cursor()
    _ensure_ref(c)
    c.execute(_q("SELECT ref_code FROM users WHERE id=?"), (int(user_id),))
    row = c.fetchone()
    cur = _scalar(row, None) if row else None
    if cur:
        conn.close()
        return str(cur)
    code = None
    for _ in range(12):
        cand = "".join(secrets.choice(_REF_ABC) for _ in range(8))
        c.execute(_q("SELECT id FROM users WHERE ref_code=?"), (cand,))
        if not c.fetchone():
            code = cand
            break
    if not code:
        conn.close()
        return None
    try:
        c.execute(_q("UPDATE users SET ref_code=? WHERE id=? AND (ref_code IS NULL OR ref_code='')"),
                  (code, int(user_id)))
        conn.commit()
        c.execute(_q("SELECT ref_code FROM users WHERE id=?"), (int(user_id),))
        code = str(_scalar(c.fetchone(), code) or code)
    except Exception:
        pass
    conn.close()
    return code


def ref_owner(code):
    code = _ref_norm(code)
    if len(code) < 6:
        return None
    conn = get_db(); c = conn.cursor()
    _ensure_ref(c)
    c.execute(_q("SELECT id FROM users WHERE ref_code=?"), (code,))
    row = c.fetchone()
    conn.close()
    return int(_scalar(row, 0)) if row else None


def ref_set_device(user_id, device_id):
    if not device_id:
        return
    conn = get_db(); c = conn.cursor()
    _ensure_ref(c)
    try:
        c.execute(_q("UPDATE users SET device_id=? WHERE id=? AND (device_id IS NULL OR device_id='')"),
                  (str(device_id)[:64], int(user_id)))
        conn.commit()
    except Exception:
        pass
    conn.close()


def ref_attach(user_id, code, max_age_hours=48):
    """Привязать новичка к пригласившему. Только один раз и только в первые
    двое суток жизни учётной записи — иначе задним числом можно было бы
    приписать себе кого угодно."""
    owner = ref_owner(code)
    if not owner:
        return {"error": "нет такого кода"}
    if int(owner) == int(user_id):
        return {"error": "своей же ссылкой пользоваться нельзя"}
    conn = get_db(); c = conn.cursor()
    _ensure_ref(c)
    c.execute(_q("SELECT referrer_id,created_at FROM users WHERE id=?"), (int(user_id),))
    row = c.fetchone()
    if not row:
        conn.close()
        return {"error": "нет такого человека"}
    row = dict(row)
    if row.get("referrer_id"):
        conn.close()
        return {"error": "приглашение уже засчитано"}
    born = _as_dt(row.get("created_at"))
    if born and (datetime.utcnow() - born) > timedelta(hours=max_age_hours):
        conn.close()
        return {"error": "ссылка засчитывается только новым участникам"}
    try:
        c.execute(_q("""UPDATE users SET referrer_id=?, referred_at=?
                        WHERE id=? AND referrer_id IS NULL"""),
                  (int(owner), _utc_str(), int(user_id)))
        ok = c.rowcount
        conn.commit()
    except Exception:
        ok = 0
    conn.close()
    return {"ok": True, "referrer_id": int(owner)} if ok else {"error": "приглашение уже засчитано"}


def ref_pay(user_id, bonus_inviter, bonus_friend):
    """Новичок сделал первое настоящее действие — платим обоим. Ровно раз."""
    conn = get_db(); c = conn.cursor()
    _ensure_ref(c)
    c.execute(_q("SELECT referrer_id,ref_paid,device_id,display_name,key_prefix FROM users WHERE id=?"),
              (int(user_id),))
    row = c.fetchone()
    if not row:
        conn.close()
        return None
    row = dict(row)
    inviter = row.get("referrer_id")
    if not inviter or int(row.get("ref_paid") or 0) or int(inviter) == int(user_id):
        conn.close()
        return None

    # Одно и то же устройство у обоих — приглашение самого себя.
    # Полностью закрыть накрутку в анонимной системе нельзя, но самый
    # дешёвый способ закрываем.
    c.execute(_q("SELECT device_id FROM users WHERE id=?"), (int(inviter),))
    inv = c.fetchone()
    same = bool(row.get("device_id") and inv and
                str(_scalar(inv, "") or "") == str(row.get("device_id")))
    # Отмечаем разобранным в любом случае, чтобы не пересчитывать каждый раз.
    #   1 — награда выплачена;
    #   2 — приглашение не засчитано (то же устройство).
    # Разные пометки нужны, чтобы в списке не висело «активен» там, где
    # на самом деле никто ничего не получил.
    mark = 2 if same else 1
    try:
        c.execute(_q("UPDATE users SET ref_paid=? WHERE id=? AND ref_paid=0"),
                  (mark, int(user_id)))
        claimed = c.rowcount
        conn.commit()
    except Exception:
        claimed = 0
    conn.close()
    if not claimed or same:
        return None

    who = row.get("display_name") or row.get("key_prefix") or "друг"
    # Нулевую сумму в историю не пишем: пустая строка «+0 CUBE» выглядит как
    # сбой. Приглашение теперь засчитывается вкладом, а не деньгами.
    if bonus_inviter:
        add_cube_balance(int(inviter), float(bonus_inviter), "referral",
                         description=f"Приглашённый {who} сделал первый шаг")
    if bonus_friend:
        # Отдельный повод: в окне приглашений «CUBE получено» должно считать
        # только то, что человек заработал, приводя других, а не свой же
        # приветственный бонус.
        add_cube_balance(int(user_id), float(bonus_friend), "referral_welcome",
                         description="Приветственный бонус за приглашение")
    return {"inviter_id": int(inviter), "friend_id": int(user_id),
            "inviter_bonus": float(bonus_inviter), "friend_bonus": float(bonus_friend),
            "friend_name": who}


def ref_list(user_id, limit=50):
    conn = get_db(); c = conn.cursor()
    _ensure_ref(c)
    c.execute(_q("""SELECT id,display_name,key_prefix,referred_at,ref_paid,created_at
                    FROM users WHERE referrer_id=?
                    ORDER BY referred_at DESC, id DESC LIMIT ?"""),
              (int(user_id), int(limit)))
    rows = _fetchall(c.fetchall())
    conn.close()
    return rows


def ref_earned(user_id):
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("""SELECT COALESCE(SUM(amount),0) FROM cube_transactions
                        WHERE user_id=? AND tx_type='referral' AND amount>0"""),
                  (int(user_id),))
        v = float(_scalar(c.fetchone(), 0) or 0)
    except Exception:
        v = 0.0
    conn.close()
    return round(v, 2)


# ══════════════════════════════════════════════════════════════════════════════
#  МАРКЕТПЛЕЙС — настоящие цифровые товары
#
#  Было: десять товаров, зашитых в код, с продавцами вида 7A2F•••CUBE.
#  «Купить» списывал CUBE у самого себя и ничего не выдавал, «Ставка» тоже
#  списывала и уходила в никуда, «+ Продать» показывал надпись и всё.
#
#  Стало: товар создаёт человек. У него название, описание, теги, категория,
#  цена (ноль — бесплатно), текст, который получает покупатель, и файлы —
#  включая zip. Файлы лежат в базе, а не в /tmp, который на Render чистится
#  при каждом перезапуске, и отдаются только тому, кто купил.
#
#  Покупка — настоящий перевод CUBE продавцу, с записями в истории у обоих.
# ══════════════════════════════════════════════════════════════════════════════

_MKT_READY = False

MARKET_CATS = ["keys", "nft", "tools", "ai", "content", "pass", "domains", "service"]
MARKET_MAX_FILES    = 5
MARKET_MAX_FILE     = 15 * 1024 * 1024     # один файл
MARKET_MAX_TOTAL    = 25 * 1024 * 1024     # все файлы товара
MARKET_MAX_ACTIVE   = 20                   # сколько товаров можно держать в продаже


def _ensure_market(c):
    global _MKT_READY
    if _MKT_READY:
        return
    blob = "BYTEA" if _PG else "BLOB"
    ts   = "TIMESTAMP" if _PG else "TEXT"
    now  = "NOW()" if _PG else "(datetime('now'))"
    pk   = "SERIAL PRIMARY KEY" if _PG else "INTEGER PRIMARY KEY AUTOINCREMENT"
    try:
        c.execute(f"""CREATE TABLE IF NOT EXISTS market_items (
            id {pk},
            seller_id INTEGER NOT NULL,
            cube_id INTEGER,
            title TEXT NOT NULL,
            description TEXT DEFAULT '',
            tags TEXT DEFAULT '',
            category TEXT NOT NULL DEFAULT 'content',
            price REAL NOT NULL DEFAULT 0,
            cover TEXT,
            delivery TEXT DEFAULT '',
            status TEXT NOT NULL DEFAULT 'active',
            sales INTEGER NOT NULL DEFAULT 0,
            created_at {ts} NOT NULL DEFAULT {now},
            updated_at {ts} NOT NULL DEFAULT {now}
        )""")
        c.execute(f"""CREATE TABLE IF NOT EXISTS market_files (
            id {pk},
            item_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            mime TEXT DEFAULT 'application/octet-stream',
            size INTEGER NOT NULL DEFAULT 0,
            data {blob},
            created_at {ts} NOT NULL DEFAULT {now}
        )""")
        c.execute(f"""CREATE TABLE IF NOT EXISTS market_orders (
            id {pk},
            item_id INTEGER NOT NULL,
            buyer_id INTEGER NOT NULL,
            seller_id INTEGER NOT NULL,
            price REAL NOT NULL DEFAULT 0,
            created_at {ts} NOT NULL DEFAULT {now}
        )""")
        c.execute("CREATE INDEX IF NOT EXISTS idx_mkt_status ON market_items(status)")
        c.execute("CREATE INDEX IF NOT EXISTS idx_mkt_seller ON market_items(seller_id)")
        c.execute("CREATE INDEX IF NOT EXISTS idx_mkt_files ON market_files(item_id)")
        c.execute("CREATE UNIQUE INDEX IF NOT EXISTS ux_mkt_order ON market_orders(item_id,buyer_id)")
    except Exception:
        pass
    try:
        c.connection.commit()
    except Exception:
        pass
    _MKT_READY = True


def _mkt_conn():
    conn = get_db(); c = conn.cursor()
    _ensure_market(c)
    return conn, c


def _bin(data: bytes):
    """Двоичные данные для текущей базы."""
    if _PG:
        import psycopg2
        return psycopg2.Binary(data)
    return sqlite3.Binary(data)


def _unbin(v):
    if v is None:
        return b""
    if isinstance(v, (bytes, bytearray)):
        return bytes(v)
    if isinstance(v, memoryview):
        return v.tobytes()
    return bytes(str(v), "utf-8")


# ── Товары ────────────────────────────────────────────────────────────────────

def mkt_create(seller_id, cube_id, title, description, tags, category, price,
               cover, delivery):
    conn, c = _mkt_conn()
    sql = _q("""INSERT INTO market_items
                (seller_id,cube_id,title,description,tags,category,price,cover,delivery,
                 created_at,updated_at)
                VALUES (?,?,?,?,?,?,?,?,?,?,?)""")
    now = _utc_str()
    iid = _execute_returning(conn, sql, (
        int(seller_id), (int(cube_id) if cube_id else None), title, description,
        tags, category, float(price), cover, delivery, now, now))
    conn.commit(); conn.close()
    return iid


def mkt_update(item_id, seller_id, fields):
    allowed = ("title", "description", "tags", "category", "price", "cover",
               "delivery", "status")
    sets, args = [], []
    for k in allowed:
        if k in fields:
            sets.append(k + "=?")
            args.append(fields[k])
    if not sets:
        return False
    sets.append("updated_at=?"); args.append(_utc_str())
    args += [int(item_id), int(seller_id)]
    conn, c = _mkt_conn()
    c.execute(_q("UPDATE market_items SET " + ",".join(sets) +
                 " WHERE id=? AND seller_id=?"), tuple(args))
    ok = c.rowcount
    conn.commit(); conn.close()
    return ok > 0


def mkt_get(item_id):
    conn, c = _mkt_conn()
    c.execute(_q("SELECT * FROM market_items WHERE id=?"), (int(item_id),))
    row = c.fetchone()
    conn.close()
    return _row(row)


def mkt_active_count(seller_id):
    conn, c = _mkt_conn()
    c.execute(_q("SELECT COUNT(*) FROM market_items WHERE seller_id=? AND status='active'"),
              (int(seller_id),))
    n = int(_scalar(c.fetchone(), 0))
    conn.close()
    return n


def mkt_list(category=None, query=None, seller_id=None, buyer_id=None,
             limit=60, offset=0, include_hidden=False):
    """Витрина общая: товары видны из любого куба."""
    conn, c = _mkt_conn()
    where, args = [], []
    if buyer_id is not None:
        # «Мои покупки»: даже снятые с продажи остаются доступными тому, кто купил.
        where.append("i.id IN (SELECT item_id FROM market_orders WHERE buyer_id=?)")
        args.append(int(buyer_id))
    elif seller_id is not None:
        where.append("i.seller_id=?"); args.append(int(seller_id))
        if not include_hidden:
            where.append("i.status<>'removed'")
    else:
        where.append("i.status='active'")
    if category:
        where.append("i.category=?"); args.append(category)
    sql = ("SELECT i.* FROM market_items i WHERE " + " AND ".join(where) +
           " ORDER BY i.created_at DESC LIMIT ? OFFSET ?")
    args += [int(limit), int(offset)]
    c.execute(_q(sql), tuple(args))
    rows = _fetchall(c.fetchall())
    conn.close()

    if query:
        q = str(query).strip().lower()
        if q:
            rows = [r for r in rows if q in " ".join([
                str(r.get("title") or ""), str(r.get("description") or ""),
                str(r.get("tags") or "")]).lower()]
    return rows


def mkt_orders_count(item_id):
    conn, c = _mkt_conn()
    c.execute(_q("SELECT COUNT(*) FROM market_orders WHERE item_id=?"), (int(item_id),))
    n = int(_scalar(c.fetchone(), 0))
    conn.close()
    return n


def mkt_delete(item_id, seller_id):
    """Удалить совсем — вместе с файлами. Зовётся только когда товар ещё
    никому не достался: у купившего отнимать купленное нельзя."""
    conn, c = _mkt_conn()
    c.execute(_q("SELECT seller_id FROM market_items WHERE id=?"), (int(item_id),))
    row = c.fetchone()
    if not row or int(_scalar(row, 0)) != int(seller_id):
        conn.close()
        return False
    c.execute(_q("DELETE FROM market_files WHERE item_id=?"), (int(item_id),))
    c.execute(_q("DELETE FROM market_orders WHERE item_id=?"), (int(item_id),))
    c.execute(_q("DELETE FROM market_items WHERE id=? AND seller_id=?"),
              (int(item_id), int(seller_id)))
    ok = c.rowcount
    conn.commit(); conn.close()
    return ok > 0


def mkt_remove(item_id, seller_id):
    """Снять с витрины. Файлы остаются: те, кто купил, не должны их потерять."""
    return mkt_update(item_id, seller_id, {"status": "removed"})


# ── Файлы ─────────────────────────────────────────────────────────────────────

def mkt_files(item_id, with_data=False):
    conn, c = _mkt_conn()
    cols = "id,item_id,name,mime,size,created_at" + (",data" if with_data else "")
    c.execute(_q("SELECT " + cols + " FROM market_files WHERE item_id=? ORDER BY id"),
              (int(item_id),))
    rows = _fetchall(c.fetchall())
    conn.close()
    if with_data:
        for r in rows:
            r["data"] = _unbin(r.get("data"))
    return rows


def mkt_file(item_id, file_id):
    conn, c = _mkt_conn()
    c.execute(_q("SELECT id,item_id,name,mime,size,data FROM market_files WHERE id=? AND item_id=?"),
              (int(file_id), int(item_id)))
    row = c.fetchone()
    conn.close()
    if not row:
        return None
    d = dict(row)
    d["data"] = _unbin(d.get("data"))
    return d


def mkt_files_size(item_id):
    conn, c = _mkt_conn()
    c.execute(_q("SELECT COALESCE(SUM(size),0),COUNT(*) FROM market_files WHERE item_id=?"),
              (int(item_id),))
    row = c.fetchone()
    conn.close()
    if row is None:
        return 0, 0
    if hasattr(row, "keys"):
        vals = list(dict(row).values())
    else:
        vals = list(row)
    return int(vals[0] or 0), int(vals[1] or 0)


def mkt_add_file(item_id, name, mime, data: bytes):
    conn, c = _mkt_conn()
    c.execute(_q("""INSERT INTO market_files (item_id,name,mime,size,data,created_at)
                    VALUES (?,?,?,?,?,?)"""),
              (int(item_id), name[:200], mime[:120], len(data), _bin(data), _utc_str()))
    conn.commit(); conn.close()
    return True


def mkt_del_file(item_id, file_id, seller_id):
    conn, c = _mkt_conn()
    c.execute(_q("SELECT seller_id FROM market_items WHERE id=?"), (int(item_id),))
    row = c.fetchone()
    if not row or int(_scalar(row, 0)) != int(seller_id):
        conn.close()
        return False
    c.execute(_q("DELETE FROM market_files WHERE id=? AND item_id=?"),
              (int(file_id), int(item_id)))
    ok = c.rowcount
    conn.commit(); conn.close()
    return ok > 0


# ── Покупки ───────────────────────────────────────────────────────────────────

def mkt_bought(item_id, user_id):
    conn, c = _mkt_conn()
    c.execute(_q("SELECT id FROM market_orders WHERE item_id=? AND buyer_id=?"),
              (int(item_id), int(user_id)))
    row = c.fetchone()
    conn.close()
    return row is not None


def mkt_bought_ids(user_id, ids):
    if not ids:
        return set()
    conn, c = _mkt_conn()
    marks = ",".join(["?"] * len(ids))
    c.execute(_q("SELECT item_id FROM market_orders WHERE buyer_id=? AND item_id IN (" + marks + ")"),
              tuple([int(user_id)] + [int(i) for i in ids]))
    out = set()
    for r in c.fetchall():
        d = dict(r) if hasattr(r, "keys") else {"item_id": r[0]}
        out.add(int(d["item_id"]))
    conn.close()
    return out


def mkt_buy(item_id, buyer_id):
    """Покупка. Деньги переводим только после того, как запись о заказе легла:
    иначе при двойном нажатии можно было бы заплатить дважды."""
    item = mkt_get(item_id)
    if not item:
        return {"error": "нет такого товара"}
    if item.get("status") != "active":
        return {"error": "товар снят с витрины"}
    seller = int(item.get("seller_id") or 0)
    if seller == int(buyer_id):
        return {"error": "это твой собственный товар"}
    if mkt_bought(item_id, buyer_id):
        return {"ok": True, "already": True}

    price = round(float(item.get("price") or 0), 2)
    if price > 0:
        bal = get_cube_balance(buyer_id)
        if bal < price:
            return {"error": "not enough", "balance": bal, "price": price}

    conn, c = _mkt_conn()
    try:
        c.execute(_q("""INSERT INTO market_orders (item_id,buyer_id,seller_id,price,created_at)
                        VALUES (?,?,?,?,?)"""),
                  (int(item_id), int(buyer_id), seller, price, _utc_str()))
        c.execute(_q("UPDATE market_items SET sales=sales+1 WHERE id=?"), (int(item_id),))
        conn.commit()
    except Exception:
        # Уникальный ключ не дал записать заказ дважды — значит уже куплено.
        try: conn.rollback()
        except Exception: pass
        conn.close()
        return {"ok": True, "already": True}
    conn.close()

    if price > 0:
        res = transfer_cube(buyer_id, seller, price,
                            "Маркетплейс: " + str(item.get("title") or "")[:80])
        if not res.get("ok"):
            # Денег не хватило в самый последний момент — откатываем заказ,
            # чтобы человек не получил товар бесплатно.
            conn, c = _mkt_conn()
            c.execute(_q("DELETE FROM market_orders WHERE item_id=? AND buyer_id=?"),
                      (int(item_id), int(buyer_id)))
            c.execute(_q("UPDATE market_items SET sales=sales-1 WHERE id=? AND sales>0"),
                      (int(item_id),))
            conn.commit(); conn.close()
            return {"error": "not enough", "balance": res.get("balance", 0), "price": price}
        return {"ok": True, "paid": price, "balance": res.get("balance")}
    return {"ok": True, "paid": 0, "balance": get_cube_balance(buyer_id)}


def mkt_sales_sum(seller_id):
    conn, c = _mkt_conn()
    c.execute(_q("SELECT COALESCE(SUM(price),0),COUNT(*) FROM market_orders WHERE seller_id=?"),
              (int(seller_id),))
    row = c.fetchone()
    conn.close()
    if row is None:
        return 0.0, 0
    vals = list(dict(row).values()) if hasattr(row, "keys") else list(row)
    return round(float(vals[0] or 0), 2), int(vals[1] or 0)


# ══════════════════════════════════════════════════════════════════════════════
#  НАЧИСЛЕНИЕ РАЗ В СУТКИ
#
#  Фонд месяца делится на дни. Каждую ночь сервер берёт прошедший день,
#  складывает очки всех подписчиков за этот день и раздаёт каждому его долю.
#
#  Начисление за день случается ровно один раз: день, который уже закрыт,
#  записан в reward_days, и повторно его не посчитать.
# ══════════════════════════════════════════════════════════════════════════════

_RDAY_READY = False


def _ensure_reward_days(c):
    global _RDAY_READY
    if _RDAY_READY:
        return
    ts = "TIMESTAMP" if _PG else "TEXT"
    now = "NOW()" if _PG else "(datetime('now'))"
    try:
        c.execute(f"""CREATE TABLE IF NOT EXISTS reward_days (
            day TEXT PRIMARY KEY,
            pool_usd REAL NOT NULL DEFAULT 0,
            total_score REAL NOT NULL DEFAULT 0,
            paid_usd REAL NOT NULL DEFAULT 0,
            users INTEGER NOT NULL DEFAULT 0,
            settled_at {ts} NOT NULL DEFAULT {now}
        )""")
    except Exception:
        pass
    try:
        c.connection.commit()
    except Exception:
        pass
    _RDAY_READY = True


def _days_in_month(day_str):
    y, m = int(day_str[:4]), int(day_str[5:7])
    if m == 12:
        nxt = datetime(y + 1, 1, 1)
    else:
        nxt = datetime(y, m + 1, 1)
    return (nxt - datetime(y, m, 1)).days


def reward_day_pool(day_str):
    """Сколько денег приходится на один день месяца."""
    monthly = reward_pool_get()['monthly_usd']
    if monthly <= 0:
        return 0.0
    return monthly / _days_in_month(day_str)


def reward_day_rows(day_str):
    """Что подписчики заработали за день по ставкам: [(user_id, cube), …]"""
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("SELECT a.* FROM user_activity a WHERE a.date=? AND "
                     + _premium_active_sql("a")), (day_str,))
        rows = _fetchall(c.fetchall())
    except Exception:
        rows = []
    conn.close()
    out = []
    for r in rows:
        v = day_cube(r)
        if v > 0:
            out.append((int(r['user_id']), v))
    return out


def reward_day_get(day_str):
    conn = get_db(); c = conn.cursor()
    _ensure_reward_days(c)
    c.execute(_q("SELECT * FROM reward_days WHERE day=?"), (str(day_str),))
    row = _row(c.fetchone())
    conn.close()
    return row


def _streak_until(user_id, day_str):
    """Сколько активных дней подряд, считая day_str последним."""
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("SELECT * FROM user_activity WHERE user_id=? AND date<=? "
                     "ORDER BY date DESC LIMIT 400"), (int(user_id), day_str))
        rows = _fetchall(c.fetchall())
    except Exception:
        rows = []
    conn.close()
    дни = {str(r.get('date'))[:10] for r in rows if _is_real_day(r)}
    d = datetime.strptime(day_str, '%Y-%m-%d').date()
    n = 0
    while d.strftime('%Y-%m-%d') in дни:
        n += 1
        d = d - timedelta(days=1)
    return n


def _active_days_between(user_id, с, по):
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("SELECT * FROM user_activity WHERE user_id=? AND date>=? AND date<=?"),
                  (int(user_id), с, по))
        rows = _fetchall(c.fetchall())
    except Exception:
        rows = []
    conn.close()
    return sum(1 for r in rows if _is_real_day(r))


def day_bonuses(user_id, day_str):
    """Надбавки за постоянство. Начисляются в тот день, когда «набежали»."""
    out = []
    серия = _streak_until(user_id, day_str)
    if серия and серия % 7 == 0:
        out.append({'key': 'week', 'cube': BONUS_WEEK, 'text': 'семь дней подряд'})
    d = datetime.strptime(day_str, '%Y-%m-%d').date()
    # Месяц: ровно в тот день, когда активных дней в месяце стало 25
    нач_мес = d.replace(day=1).strftime('%Y-%m-%d')
    было = _active_days_between(user_id, нач_мес, day_str)
    if было == MONTH_DAYS_FOR_BONUS:
        out.append({'key': 'month', 'cube': BONUS_MONTH,
                    'text': str(MONTH_DAYS_FOR_BONUS) + ' активных дней за месяц'})
    # Год: когда активных дней за последние 365 стало 300
    год_назад = (d - timedelta(days=364)).strftime('%Y-%m-%d')
    за_год = _active_days_between(user_id, год_назад, day_str)
    if за_год == YEAR_DAYS_FOR_BONUS:
        out.append({'key': 'year', 'cube': BONUS_YEAR,
                    'text': str(YEAR_DAYS_FOR_BONUS) + ' активных дней за год'})
    return out


def reward_settle_day(day_str):
    """Закрыть день: заплатить по ставкам. Повторно — не считает.

    Если все вместе набрали больше, чем есть в дневном фонде, выплаты режутся
    пропорционально. Так ставки остаются твёрдыми в обычный день, а касса не
    рвётся в необычный.
    """
    day_str = str(day_str)[:10]
    if reward_day_get(day_str):
        return {'day': day_str, 'already': True}

    pool = reward_day_pool(day_str)
    rows = reward_day_rows(day_str)

    # Надбавки считаем сразу: они тоже тратят фонд
    начислить = []
    for uid, базовое in rows:
        бонусы = day_bonuses(uid, day_str)
        начислить.append((uid, базовое, бонусы,
                          round(базовое + sum(b['cube'] for b in бонусы), 4)))
    итого = round(sum(x[3] for x in начислить), 4)
    нужно_usd = итого * CUBE_USD
    доля = 1.0
    if pool > 0 and нужно_usd > pool:
        доля = pool / нужно_usd

    conn = get_db(); c = conn.cursor()
    _ensure_reward_days(c)
    try:
        c.execute(_q("INSERT INTO reward_days (day,pool_usd,total_score,paid_usd,users,settled_at) "
                     "VALUES (?,?,?,?,?,?)"),
                  (day_str, float(pool), float(итого), 0.0, 0, _utc_str()))
        conn.commit()
    except Exception:
        try: conn.rollback()
        except Exception: pass
        conn.close()
        return {'day': day_str, 'already': True}
    conn.close()

    if pool <= 0 or not начислить:
        return {'day': day_str, 'pool': round(pool, 4), 'total_cube': итого,
                'paid_cube': 0.0, 'users': 0, 'cut_pct': 0.0}

    выдано, людей = 0.0, 0
    for uid, базовое, бонусы, всего in начислить:
        сумма = round(всего * доля, 4)
        if сумма <= 0:
            continue
        текст = 'Награда за ' + day_str
        if бонусы:
            текст += ' + ' + ', '.join(b['text'] for b in бонусы)
        if доля < 1:
            текст += ' (фонд урезал на ' + str(round((1 - доля) * 100)) + '%)'
        try:
            add_cube_balance(uid, сумма, "reward", description=текст)
            выдано += сумма
            людей += 1
        except Exception:
            pass

    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("UPDATE reward_days SET paid_usd=?, users=? WHERE day=?"),
                  (round(выдано * CUBE_USD, 4), людей, day_str))
        c.execute(_q("UPDATE reward_pool SET used_usd=used_usd+? WHERE id=1"),
                  (round(выдано * CUBE_USD, 4),))
        conn.commit()
    except Exception:
        try: conn.rollback()
        except Exception: pass
    conn.close()
    return {'day': day_str, 'pool': round(pool, 4), 'total_cube': итого,
            'paid_cube': round(выдано, 4), 'users': людей,
            'cut_pct': round((1 - доля) * 100, 1)}


_VPAY_READY = False


def _ensure_view_payouts(c):
    """Что уже оплачено за просмотры. Ключ — вид и номер, поэтому дважды за
    один пост или за один комментарий заплатить нельзя."""
    global _VPAY_READY
    if _VPAY_READY:
        return
    _VPAY_READY = True
    try:
        c.execute("""CREATE TABLE IF NOT EXISTS view_payouts (
            kind TEXT NOT NULL,
            item_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            cube REAL NOT NULL,
            views INTEGER NOT NULL DEFAULT 0,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (kind, item_id)
        )""")
        c.connection.commit()
    except Exception:
        try: c.connection.rollback()
        except Exception: pass


def reward_views_settle():
    """Заплатить за посты и комментарии, перешагнувшие порог просмотров.

    По таблице ставок пост даёт POST_VIEW_CUBE, а комментарий
    COMMENT_VIEW_CUBE — но только от VIEWS_FOR_REWARD просмотров. До сих пор
    эти две строки висели на экране и не платили ничего: просмотры никто не
    считал как следует, а выплаты по ним не было вовсе.

    Платим один раз за пост и один раз за комментарий. Чтобы на популярном
    посте нельзя было набить денег сотней своих комментариев, у каждого
    человека оплачивается только его первый комментарий под этим постом,
    и автору поста за комментарии под собственным постом не платят.
    """
    conn = get_db(); c = conn.cursor()
    _ensure_views_table(c)
    _ensure_view_payouts(c)
    выдано, строк = 0.0, 0
    try:
        # ── посты, перешагнувшие порог и ещё не оплаченные ──
        c.execute(_q("""SELECT p.id, p.user_id, COUNT(v.user_id) AS n
                        FROM posts p JOIN post_views v ON v.post_id = p.id
                        WHERE p.user_id IS NOT NULL
                        GROUP BY p.id, p.user_id
                        HAVING COUNT(v.user_id) >= ?"""), (int(VIEWS_FOR_REWARD),))
        посты = _fetchall(c.fetchall())
    except Exception:
        посты = []
    conn.close()

    for r in посты:
        pid = int(r.get('id')); автор = int(r.get('user_id')); n = int(r.get('n') or 0)
        # Пост оплачивается один раз. Но комментарии под ним разбираем всегда:
        # их пишут и после того, как пост уже перешагнул порог, и они тоже
        # должны получить своё. Раньше здесь стоял continue, и такой
        # комментарий не получал ничего и никогда.
        if _view_payout_claim('post', pid, автор, POST_VIEW_CUBE, n):
            try:
                add_cube_balance(автор, POST_VIEW_CUBE, 'post_views',
                                 description='Пост набрал %s просмотров' % n)
                выдано += POST_VIEW_CUBE; строк += 1
            except Exception:
                pass

        # ── комментарии под этим постом ──
        conn = get_db(); c = conn.cursor()
        try:
            c.execute(_q("""SELECT MIN(id) AS id, user_id FROM post_comments
                            WHERE post_id=? AND user_id IS NOT NULL AND user_id<>?
                            GROUP BY user_id"""), (pid, автор))
            комм = _fetchall(c.fetchall())
        except Exception:
            комм = []
        conn.close()
        for k in комм:
            cid = int(k.get('id')); кто = int(k.get('user_id'))
            if not _view_payout_claim('comment', cid, кто, COMMENT_VIEW_CUBE, n):
                continue
            try:
                add_cube_balance(кто, COMMENT_VIEW_CUBE, 'comment_views',
                                 description='Комментарий под постом с %s просмотрами' % n)
                выдано += COMMENT_VIEW_CUBE; строк += 1
            except Exception:
                pass

    return {'paid_cube': round(выдано, 4), 'rows': строк}


def _view_payout_claim(kind, item_id, user_id, cube, views):
    """Занять место в таблице оплат. Вернёт False, если уже платили."""
    conn = get_db(); c = conn.cursor()
    _ensure_view_payouts(c)
    try:
        c.execute(_q("INSERT INTO view_payouts (kind,item_id,user_id,cube,views) "
                     "VALUES (?,?,?,?,?)"),
                  (str(kind), int(item_id), int(user_id), float(cube), int(views)))
        conn.commit(); conn.close()
        return True
    except Exception:
        try: conn.rollback()
        except Exception: pass
        conn.close()
        return False


def view_payouts_mine(user_id, limit=50):
    """Что человеку заплатили за просмотры — для экрана «Заработать»."""
    conn = get_db(); c = conn.cursor()
    _ensure_view_payouts(c)
    try:
        c.execute(_q("SELECT kind,item_id,cube,views,created_at FROM view_payouts "
                     "WHERE user_id=? ORDER BY created_at DESC LIMIT ?"),
                  (int(user_id), int(limit)))
        rows = _fetchall(c.fetchall())
    except Exception:
        rows = []
    conn.close()
    return rows


def reward_days_due(back=14):
    """Дни, которые уже закончились, но ещё не закрыты."""
    сегодня = datetime.utcnow().date()
    out = []
    for i in range(1, int(back) + 1):
        d = (сегодня - timedelta(days=i)).strftime('%Y-%m-%d')
        if not reward_day_get(d):
            out.append(d)
    return sorted(out)


def reward_day_mine(user_id, day_str=None):
    """Что человек набрал сегодня и сколько это в CUBE — построчно."""
    if not day_str:
        day_str = datetime.utcnow().strftime('%Y-%m-%d')
    conn = get_db(); c = conn.cursor()
    c.execute(_q("SELECT * FROM user_activity WHERE user_id=? AND date=?"),
              (int(user_id), day_str))
    row = _row(c.fetchone()) or {}
    conn.close()

    моё = day_cube(row) if row else 0.0
    строки = day_breakdown(row) if row else []
    бонусы = day_bonuses(user_id, day_str) if row and _is_real_day(row) else []
    всего = round(моё + sum(b['cube'] for b in бонусы), 4)

    pool = reward_day_pool(day_str)
    все = sum(v for _, v in reward_day_rows(day_str))
    нужно = все * CUBE_USD
    доля = 1.0
    if pool > 0 and нужно > pool:
        доля = pool / нужно

    колонки = ('online_minutes',) + _REAL_COLS + ('comments_received',)
    return {
        'day': day_str,
        'cube': всего,
        'cube_after_cut': round(всего * доля, 4),
        'cut_pct': round((1 - доля) * 100, 1),
        'lines': строки,
        'bonuses': бонусы,
        'pool_day': round(pool, 4),
        'all_cube': round(все, 4),
        'active': _is_real_day(row) if row else False,
        'streak': _streak_until(user_id, day_str) if row else 0,
        'counters': {k: int(row.get(k, 0) or 0) for k in колонки} if row
                    else {k: 0 for k in колонки},
    }


def reward_days_history(user_id, limit=14):
    """Что реально начислено человеку по дням."""
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("SELECT amount, description, created_at FROM cube_transactions "
                     "WHERE user_id=? AND tx_type='reward' ORDER BY id DESC LIMIT ?"),
                  (int(user_id), int(limit)))
        rows = _fetchall(c.fetchall())
    except Exception:
        rows = []
    conn.close()
    return rows


def ref_pay_on_subscription(user_id, cube):
    """Друг оплатил подписку — платим пригласившему. Ровно один раз.

    Раньше платили за первое любое действие новичка. При анонимных бесплатных
    ключах это означало платить тому, кто заводит ключи пачками. Теперь повод —
    настоящие деньги: награда берётся из подписки, которую друг купил.
    """
    conn = get_db(); c = conn.cursor()
    _ensure_ref(c)
    c.execute(_q("SELECT referrer_id, ref_bonus_paid, display_name, key_prefix "
                 "FROM users WHERE id=?"), (int(user_id),))
    row = c.fetchone()
    if not row:
        conn.close()
        return None
    row = dict(row)
    inviter = row.get("referrer_id")
    if not inviter or int(row.get("ref_bonus_paid") or 0) or int(inviter) == int(user_id):
        conn.close()
        return None
    c.execute(_q("UPDATE users SET ref_bonus_paid=1 WHERE id=? "
                 "AND COALESCE(ref_bonus_paid,0)=0"), (int(user_id),))
    взяли = c.rowcount
    conn.commit(); conn.close()
    if not взяли:
        return None

    who = row.get("display_name") or row.get("key_prefix") or "друг"
    if cube:
        add_cube_balance(int(inviter), float(cube), "referral",
                         description=f"{who} оплатил подписку по твоей ссылке")
    try:
        record_activity(int(inviter), "invite")
    except Exception:
        pass
    return {"inviter_id": int(inviter), "friend_id": int(user_id),
            "cube": float(cube), "friend_name": who}


def update_group(group_id: int, owner_id: int, name=None, description=None, icon=None):
    """Переименовать группу, сменить описание и значок.

    Раньше окно «Настройки группы» показывало «✅ Настройки сохранены» и
    меняло две надписи на экране — после обновления страницы всё
    возвращалось. Теперь меняет сервер, и только владелец.

    Возвращает None, если группы нет или правит не владелец: наверху это
    превращается в честный отказ, а не в молчаливый успех.
    """
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("SELECT owner_id FROM groups WHERE id=?"), (group_id,))
        row = c.fetchone()
        if not row:
            conn.close(); return None
        if int(dict(row)["owner_id"]) != int(owner_id):
            conn.close(); return None

        поля, значения = [], []
        if name is not None:
            n = str(name).strip()[:80]
            if n:
                поля.append("name=?"); значения.append(n)
        if description is not None:
            поля.append("description=?"); значения.append(str(description).strip()[:500])
        if icon is not None:
            i = str(icon).strip()[:8]
            if i:
                поля.append("icon=?"); значения.append(i)
        if поля:
            значения.append(group_id)
            c.execute(_q("UPDATE groups SET " + ",".join(поля) + " WHERE id=?"), значения)
            conn.commit()
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return None
    conn.close()
    return get_group_info(group_id, owner_id)


# ══════════════════════════════════════════════════════════════════════════
#  ЛИМИТЫ ПРОТИВ НАКРУТОК
#  ---------------------------------------------------------------------
#  Считает СЕРВЕР, а не страница. Любой обход через свои запросы упирается
#  в ту же таблицу: цифру в браузере подменить можно, счётчик в базе — нет.
#  Окно — календарные сутки по UTC. В полночь счётчик обнуляется сам: новый
#  день — новый ключ, старые строки просто перестают читаться.
# ══════════════════════════════════════════════════════════════════════════

ЛИМИТЫ_В_СУТКИ = {
    'dm_new':  20,     # с кем ещё не переписывался — новых собеседников в день
    'like':    500,    # лайки, дизлайки, огоньки, лайки комментариев
    'comment': 50,     # комментарии и ответы на них
    'follow':  500,    # подписки и отписки
    'post':    50,     # публикации в ленте
    'repost':  100,    # репосты
    'react':   500,    # реакции на сообщения в переписке и группах
    'grp_msg': 1000,   # сообщений в группы
    'grp_new': 10,     # созданных групп
    'signal':  30,     # сигналов
    'market':  20,     # товаров на маркетплейсе
    'report':  30,     # жалоб
    'swap_in':  10,    # заявок на обмен крипты в CUBE
    'swap_out': 5,     # заявок на вывод
    'file':    200,     # созданных файлов в папках
}

# Человеку это надо объяснить словами, а не кодом ошибки.
НАЗВАНИЯ_ЛИМИТОВ = {
    'dm_new':  'новых переписок',
    'like':    'лайков',
    'comment': 'комментариев',
    'follow':  'подписок',
    'post':    'публикаций',
    'repost':  'репостов',
    'react':   'реакций',
    'grp_msg': 'сообщений в группы',
    'grp_new': 'созданных групп',
    'signal':  'сигналов',
    'market':  'товаров',
    'report':  'жалоб',
    'swap_in':  'заявок на свайп',
    'swap_out': 'заявок на вывод',
}


def _сутки():
    return datetime.utcnow().strftime('%Y-%m-%d')


def quota_state(user_id: int, action: str):
    """Сколько уже потрачено за сегодня. Ничего не меняет."""
    предел = ЛИМИТЫ_В_СУТКИ.get(action)
    if not user_id or предел is None:
        return {'ok': True, 'used': 0, 'left': None, 'limit': None}
    conn = get_db(); c = conn.cursor()
    было = 0
    try:
        c.execute(_q("SELECT n FROM rate_counters WHERE user_id=? AND action=? AND day=?"),
                  (int(user_id), action, _сутки()))
        r = c.fetchone()
        if r: было = int(r[0] if not isinstance(r, dict) else r.get('n', 0))
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return {'ok': было < предел, 'used': было,
            'left': max(0, предел - было), 'limit': предел}


def take_quota(user_id: int, action: str, n: int = 1):
    """Пробует списать n шагов. Вернёт ok=False, если на сегодня всё.

    Сначала прибавляем, потом смотрим: так два одновременных запроса не
    проскочат оба мимо предела. Если перебор — тут же возвращаем обратно."""
    предел = ЛИМИТЫ_В_СУТКИ.get(action)
    if not user_id or предел is None:
        return {'ok': True, 'used': 0, 'left': None, 'limit': None}
    день = _сутки()
    conn = get_db(); c = conn.cursor()
    стало = None
    try:
        if _PG:
            c.execute("""INSERT INTO rate_counters (user_id,action,day,n) VALUES (%s,%s,%s,%s)
                         ON CONFLICT (user_id,action,day)
                         DO UPDATE SET n = rate_counters.n + EXCLUDED.n
                         RETURNING n""", (int(user_id), action, день, int(n)))
            стало = int(c.fetchone()[0])
        else:
            c.execute("""INSERT INTO rate_counters (user_id,action,day,n) VALUES (?,?,?,?)
                         ON CONFLICT(user_id,action,day)
                         DO UPDATE SET n = n + excluded.n""",
                      (int(user_id), action, день, int(n)))
            c.execute("SELECT n FROM rate_counters WHERE user_id=? AND action=? AND day=?",
                      (int(user_id), action, день))
            стало = int(c.fetchone()[0])
        if стало > предел:
            # Перебор — откатываем ровно то, что сейчас прибавили.
            c.execute(_q("UPDATE rate_counters SET n = n - ? WHERE user_id=? AND action=? AND day=?"),
                      (int(n), int(user_id), action, день))
            conn.commit(); conn.close()
            return {'ok': False, 'used': предел, 'left': 0, 'limit': предел}
        conn.commit()
    except Exception:
        # Если таблицы почему-то нет — не ломаем работу площадки.
        if _PG: conn.rollback()
        conn.close()
        return {'ok': True, 'used': 0, 'left': None, 'limit': предел}
    conn.close()
    return {'ok': True, 'used': стало, 'left': max(0, предел - стало), 'limit': предел}


def quota_all(user_id: int):
    """Все счётчики человека за сегодня — для окна «Лимиты»."""
    день = _сутки()
    использовано = {}
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("SELECT action,n FROM rate_counters WHERE user_id=? AND day=?"),
                  (int(user_id), день))
        for r in _fetchall(c.fetchall()):
            использовано[r['action'] if isinstance(r, dict) else r[0]] = \
                int(r['n'] if isinstance(r, dict) else r[1])
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    out = {}
    for действие, предел in ЛИМИТЫ_В_СУТКИ.items():
        было = использовано.get(действие, 0)
        out[действие] = {'название': НАЗВАНИЯ_ЛИМИТОВ.get(действие, действие),
                         'использовано': было, 'предел': предел,
                         'осталось': max(0, предел - было)}
    return out


# ══════════════════════════════════════════════════════════════════════════
#  СВАЙП: ОБМЕН КРИПТЫ НА CUBE И ОБРАТНО
#  ---------------------------------------------------------------------
#  Здесь только УЧЁТ: кто, сколько, по какому курсу и в каком состоянии
#  заявка. Самих денег этот файл не касается — их держит платёжный
#  провайдер, и он же говорит, когда перевод дошёл.
#
#  Курс CUBE задан числом и не плавает: 1 CUBE = 0,50 доллара. Цену монеты
#  берём живую, но ЗАПОМИНАЕМ в заявке — иначе между «посмотрел» и
#  «отправил» курс уедет, и человек получит не то, что видел.
# ══════════════════════════════════════════════════════════════════════════

CUBE_USD = 0.50            # сколько стоит один CUBE
SWAP_FEE_IN = 0.00         # комиссия при вводе, доля
SWAP_FEE_OUT = 0.02        # комиссия при выводе, доля
SWAP_QUOTE_TTL = 15 * 60   # сколько секунд живёт посчитанный курс
SWAP_MIN_USD = 5.0         # меньше этого заявку не принимаем
SWAP_MAX_USD_DAY = 2000.0  # потолок на человека в сутки, по каждой стороне

# Монета → как её зовёт справочник цен, и в каких сетях ходит.
# Сеть важна не меньше монеты: USDT в сети Tron и USDT в сети Ethereum —
# разные адреса, и перевод не в ту сеть теряется безвозвратно.
SWAP_COINS = [
    {"sym": "BTC",  "name": "Bitcoin",   "price_id": "bitcoin",
     "nets": [("BTC", "Bitcoin")]},
    {"sym": "ETH",  "name": "Ethereum",  "price_id": "ethereum",
     "nets": [("ETH", "Ethereum"), ("ARBITRUM", "Arbitrum One"),
              ("OPTIMISM", "Optimism"), ("BASE", "Base")]},
    {"sym": "USDT", "name": "Tether",    "price_id": "tether",
     "nets": [("TRON", "Tron · TRC-20"), ("ETH", "Ethereum · ERC-20"),
              ("BSC", "BNB Chain · BEP-20"), ("SOL", "Solana"),
              ("POLYGON", "Polygon"), ("ARBITRUM", "Arbitrum One")]},
    {"sym": "USDC", "name": "USD Coin",  "price_id": "usd-coin",
     "nets": [("ETH", "Ethereum · ERC-20"), ("SOL", "Solana"),
              ("POLYGON", "Polygon"), ("ARBITRUM", "Arbitrum One"),
              ("BASE", "Base")]},
    {"sym": "BNB",  "name": "BNB",       "price_id": "binancecoin",
     "nets": [("BSC", "BNB Chain")]},
    {"sym": "SOL",  "name": "Solana",    "price_id": "solana",
     "nets": [("SOL", "Solana")]},
    {"sym": "XRP",  "name": "XRP",       "price_id": "ripple",
     "nets": [("XRP", "XRP Ledger")]},
    {"sym": "TRX",  "name": "Tron",      "price_id": "tron",
     "nets": [("TRON", "Tron")]},
    {"sym": "TON",  "name": "Toncoin",   "price_id": "toncoin",
     "nets": [("TON", "TON")]},
    {"sym": "DOGE", "name": "Dogecoin",  "price_id": "dogecoin",
     "nets": [("DOGE", "Dogecoin")]},
    {"sym": "ADA",  "name": "Cardano",   "price_id": "cardano",
     "nets": [("ADA", "Cardano")]},
    {"sym": "AVAX", "name": "Avalanche", "price_id": "avalanche-2",
     "nets": [("AVAXC", "Avalanche C-Chain")]},
    {"sym": "POL",  "name": "Polygon",   "price_id": "matic-network",
     "nets": [("POLYGON", "Polygon")]},
    {"sym": "LTC",  "name": "Litecoin",  "price_id": "litecoin",
     "nets": [("LTC", "Litecoin")]},
    {"sym": "DOT",  "name": "Polkadot",  "price_id": "polkadot",
     "nets": [("DOT", "Polkadot")]},
    {"sym": "LINK", "name": "Chainlink", "price_id": "chainlink",
     "nets": [("ETH", "Ethereum · ERC-20")]},
]

SWAP_BY_SYM = {c["sym"]: c for c in SWAP_COINS}


def swap_coin(sym):
    return SWAP_BY_SYM.get(str(sym or "").upper())


def swap_net_ok(sym, net):
    c = swap_coin(sym)
    if not c: return False
    return str(net or "").upper() in [n[0] for n in c["nets"]]


def swap_catalogue():
    """Справочник для экрана: монеты, сети, пределы, комиссии."""
    return {
        "cube_usd": CUBE_USD,
        "fee_in": SWAP_FEE_IN,
        "fee_out": SWAP_FEE_OUT,
        "min_usd": SWAP_MIN_USD,
        "max_usd_day": SWAP_MAX_USD_DAY,
        "quote_ttl": SWAP_QUOTE_TTL,
        "coins": [{"sym": c["sym"], "name": c["name"], "price_id": c["price_id"],
                   "nets": [{"code": n[0], "name": n[1]} for n in c["nets"]]}
                  for c in SWAP_COINS],
    }


def _ensure_swaps(conn):
    c = conn.cursor()
    if _PG:
        sql = """CREATE TABLE IF NOT EXISTS swaps(
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            direction TEXT NOT NULL,
            coin TEXT NOT NULL,
            net TEXT NOT NULL,
            amount_crypto DOUBLE PRECISION NOT NULL,
            coin_usd DOUBLE PRECISION NOT NULL,
            usd_value DOUBLE PRECISION NOT NULL,
            fee_usd DOUBLE PRECISION NOT NULL DEFAULT 0,
            cube_amount DOUBLE PRECISION NOT NULL,
            status TEXT NOT NULL DEFAULT 'new',
            provider TEXT,
            provider_id TEXT,
            pay_address TEXT,
            pay_memo TEXT,
            payout_address TEXT,
            tx_hash TEXT,
            note TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            settled_at TIMESTAMP)"""
    else:
        sql = """CREATE TABLE IF NOT EXISTS swaps(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            direction TEXT NOT NULL,
            coin TEXT NOT NULL,
            net TEXT NOT NULL,
            amount_crypto REAL NOT NULL,
            coin_usd REAL NOT NULL,
            usd_value REAL NOT NULL,
            fee_usd REAL NOT NULL DEFAULT 0,
            cube_amount REAL NOT NULL,
            status TEXT NOT NULL DEFAULT 'new',
            provider TEXT, provider_id TEXT,
            pay_address TEXT, pay_memo TEXT, payout_address TEXT,
            tx_hash TEXT, note TEXT,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            settled_at TEXT)"""
    try:
        c.execute(sql); conn.commit()
    except Exception:
        if _PG: conn.rollback()


def swap_quote(direction, coin_usd, amount_crypto=None, cube_amount=None):
    """Посчитать вторую сторону обмена. Деньги не трогает.

    ВВОД  (in):  даёт крипту — получает CUBE.
    ВЫВОД (out): отдаёт CUBE — получает крипту.
    Комиссия снимается в долларах, с той стороны, которую человек получает.
    """
    coin_usd = float(coin_usd or 0)
    if coin_usd <= 0:
        return None
    fee = SWAP_FEE_IN if direction == "in" else SWAP_FEE_OUT
    крипта = float(amount_crypto or 0)
    кубы = float(cube_amount or 0)
    if крипта <= 0 and кубы <= 0:
        return None
    # Считать можно от любой стороны: человек вправе набрать и «отдаю
    # столько-то», и «хочу получить столько-то». Комиссия всегда снимается
    # с долларовой суммы до перевода во вторую сторону — поэтому обратный
    # ход делится на (1 − комиссия), а не умножается.
    if direction == "in":
        if крипта > 0:
            usd = крипта * coin_usd
            fee_usd = usd * fee
            кубы = (usd - fee_usd) / CUBE_USD
        else:
            usd = кубы * CUBE_USD / (1.0 - fee)
            fee_usd = usd * fee
            крипта = usd / coin_usd
    else:
        if кубы > 0:
            usd = кубы * CUBE_USD
            fee_usd = usd * fee
            крипта = (usd - fee_usd) / coin_usd
        else:
            usd = крипта * coin_usd / (1.0 - fee)
            fee_usd = usd * fee
            кубы = usd / CUBE_USD
    amount_crypto, cube = крипта, кубы
    return {
        "direction": direction,
        "coin_usd": round(coin_usd, 8),
        "amount_crypto": round(amount_crypto, 10),
        "usd_value": round(usd, 4),
        "fee_usd": round(fee_usd, 4),
        "fee_part": fee,
        "cube_amount": round(cube, 4),
        "cube_usd": CUBE_USD,
    }


def swap_day_usd(user_id, direction):
    """Сколько долларов человек уже прогнал сегодня в эту сторону."""
    conn = get_db(); _ensure_swaps(conn); c = conn.cursor()
    сумма = 0.0
    try:
        c.execute(_q("SELECT COALESCE(SUM(usd_value),0) FROM swaps WHERE user_id=? "
                     "AND direction=? AND status IN ('new','awaiting_payment','paid','done','queued') "
                     "AND created_at >= ?"),
                  (int(user_id), direction, datetime.utcnow().strftime('%Y-%m-%d')))
        r = c.fetchone()
        if r: сумма = float(r[0] if not isinstance(r, dict) else list(r.values())[0] or 0)
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return сумма


def swap_create(user_id, direction, coin, net, q, provider=None,
                payout_address=None, status="new"):
    conn = get_db(); _ensure_swaps(conn)
    sql = _q("""INSERT INTO swaps
        (user_id,direction,coin,net,amount_crypto,coin_usd,usd_value,fee_usd,
         cube_amount,status,provider,payout_address)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)""")
    sid = _execute_returning(conn, sql, (
        int(user_id), direction, str(coin).upper(), str(net).upper(),
        q["amount_crypto"], q["coin_usd"], q["usd_value"], q["fee_usd"],
        q["cube_amount"], status, provider, payout_address))
    conn.commit(); conn.close()
    return sid


def swap_set(sid, **поля):
    if not поля: return
    conn = get_db(); _ensure_swaps(conn); c = conn.cursor()
    разрешено = {"status", "provider", "provider_id", "pay_address", "pay_memo",
                 "payout_address", "tx_hash", "note", "settled_at", "amount_crypto"}
    части, значения = [], []
    for к, v in поля.items():
        if к in разрешено:
            части.append(к + "=?"); значения.append(v)
    if not части:
        conn.close(); return
    значения.append(int(sid))
    try:
        c.execute(_q("UPDATE swaps SET " + ",".join(части) + " WHERE id=?"), значения)
        conn.commit()
    except Exception:
        if _PG: conn.rollback()
    conn.close()


def swap_get(sid):
    conn = get_db(); _ensure_swaps(conn); c = conn.cursor()
    try:
        c.execute(_q("SELECT * FROM swaps WHERE id=?"), (int(sid),))
        r = _fetchall(c.fetchall())
    except Exception:
        if _PG: conn.rollback()
        r = []
    conn.close()
    return r[0] if r else None


def swap_by_provider(provider, provider_id):
    conn = get_db(); _ensure_swaps(conn); c = conn.cursor()
    try:
        c.execute(_q("SELECT * FROM swaps WHERE provider=? AND provider_id=?"),
                  (str(provider), str(provider_id)))
        r = _fetchall(c.fetchall())
    except Exception:
        if _PG: conn.rollback()
        r = []
    conn.close()
    return r[0] if r else None


def swap_list(user_id, limit=40):
    conn = get_db(); _ensure_swaps(conn); c = conn.cursor()
    try:
        c.execute(_q("SELECT * FROM swaps WHERE user_id=? ORDER BY id DESC LIMIT ?"),
                  (int(user_id), int(limit)))
        r = _fetchall(c.fetchall())
    except Exception:
        if _PG: conn.rollback()
        r = []
    conn.close()
    return r


def swap_credit(sid, tx_hash=None):
    """Зачислить CUBE по оплаченной заявке. Повторно — не зачислит.

    Единственное место, где свайп прибавляет баланс. Защита от двойного
    зачисления в самой записи: статус переходит в done один раз."""
    з = swap_get(sid)
    if not з: return {"ok": False, "error": "заявка не найдена"}
    if str(з.get("status")) == "done":
        return {"ok": True, "already": True, "cube": float(з.get("cube_amount") or 0)}
    if str(з.get("direction")) != "in":
        return {"ok": False, "error": "это заявка на вывод"}
    cube = float(з.get("cube_amount") or 0)
    if cube <= 0: return {"ok": False, "error": "нечего зачислять"}
    swap_set(sid, status="done", tx_hash=tx_hash,
             settled_at=datetime.utcnow().isoformat(sep=' ', timespec='seconds'))
    # Это выручка, а не наградные: за ней стоят настоящие деньги.
    add_cube_balance(з["user_id"], cube, "swap_in",
                     f"Свайп {з['coin']} → CUBE", tx_hash, reward_part=0.0)
    return {"ok": True, "cube": cube}


def swap_hold(user_id, cube):
    """Списать CUBE под заявку на вывод. Денег у человека сразу нет —
    иначе он потратит их, пока заявка в очереди."""
    cube = float(cube)
    if cube <= 0: return False
    if float(get_cube_balance(user_id) or 0) < cube: return False
    add_cube_balance(user_id, -cube, "swap_out_hold", "Свайп CUBE → крипта, заявка")
    return True


def swap_release(sid, причина="заявка отменена"):
    """Вернуть удержанные CUBE, если вывод не состоялся."""
    з = swap_get(sid)
    if not з or str(з.get("direction")) != "out": return False
    if str(з.get("status")) in ("done", "refunded"): return False
    add_cube_balance(з["user_id"], float(з.get("cube_amount") or 0),
                     "swap_out_refund", причина)
    swap_set(sid, status="refunded", note=причина,
             settled_at=datetime.utcnow().isoformat(sep=' ', timespec='seconds'))
    return True


def treasury_state():
    """Касса: сколько CUBE у людей на руках и чем это обеспечено.

    CUBE на счетах — это ОБЯЗАТЕЛЬСТВО площадки, а не её деньги. Отдельно
    считаем наградные (их площадка начислила сама) и выручку (за ней стоят
    настоящие внесённые деньги). Свою прибыль можно забирать только из
    того, что осталось сверх обязательств."""
    conn = get_db(); _ensure_swaps(conn); c = conn.cursor()
    out = {"cube_usd": CUBE_USD, "users_cube": 0.0, "users_reward": 0.0,
           "users_revenue": 0.0, "swapped_in_usd": 0.0, "paid_out_usd": 0.0,
           "queued_out_cube": 0.0}
    try:
        c.execute("SELECT COALESCE(SUM(cube_balance),0), COALESCE(SUM(reward_balance),0) FROM users")
        r = c.fetchone()
        if r:
            out["users_cube"] = float(r[0] or 0)
            out["users_reward"] = float(r[1] or 0)
        out["users_revenue"] = max(0.0, out["users_cube"] - out["users_reward"])
    except Exception:
        if _PG: conn.rollback()
    try:
        c.execute(_q("SELECT COALESCE(SUM(usd_value),0) FROM swaps WHERE direction='in' AND status='done'"))
        out["swapped_in_usd"] = float(c.fetchone()[0] or 0)
        c.execute(_q("SELECT COALESCE(SUM(usd_value),0) FROM swaps WHERE direction='out' AND status='done'"))
        out["paid_out_usd"] = float(c.fetchone()[0] or 0)
        c.execute(_q("SELECT COALESCE(SUM(cube_amount),0) FROM swaps WHERE direction='out' AND status IN ('queued','paid')"))
        out["queued_out_cube"] = float(c.fetchone()[0] or 0)
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    # Чем обеспечены обязательства: внесено минус выплачено.
    out["in_box_usd"] = round(out["swapped_in_usd"] - out["paid_out_usd"], 2)
    out["owed_usd"] = round(out["users_cube"] * CUBE_USD, 2)
    out["owed_revenue_usd"] = round(out["users_revenue"] * CUBE_USD, 2)
    out["queued_out_usd"] = round(out["queued_out_cube"] * CUBE_USD, 2)
    # Забрать без риска можно только то, что сверх выручки людей и очереди.
    out["free_usd"] = round(out["in_box_usd"] - out["owed_revenue_usd"]
                            - out["queued_out_usd"], 2)
    out["covered"] = out["free_usd"] >= 0
    return out


def revenue_balance(user_id):
    """Сколько у человека НАСТОЯЩИХ денег, а не наградных.

    Наградные CUBE площадка начислила сама, из своего фонда. Если позволить
    выводить их в крипту, каждая выданная за активность единица превращается
    в настоящий долг в долларах — а это прямой путь к тому, что однажды
    кому-то будет нечем заплатить. Поэтому наружу уходит только выручка."""
    conn = get_db(); c = conn.cursor()
    всего = награда = 0.0
    try:
        c.execute(_q("SELECT cube_balance, COALESCE(reward_balance,0) FROM users WHERE id=?"),
                  (int(user_id),))
        r = c.fetchone()
        if r:
            всего = float((r[0] if not isinstance(r, dict) else r.get('cube_balance')) or 0)
            награда = float((r[1] if not isinstance(r, dict) else r.get('reward_balance')) or 0)
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return max(0.0, всего - награда)


def swap_payout_queue(status="queued", limit=100):
    """Заявки на вывод, которые ждут отправки денег."""
    conn = get_db(); _ensure_swaps(conn); c = conn.cursor()
    try:
        if status == "all":
            c.execute(_q("SELECT * FROM swaps WHERE direction='out' ORDER BY id DESC LIMIT ?"),
                      (int(limit),))
        else:
            c.execute(_q("SELECT * FROM swaps WHERE direction='out' AND status=? "
                         "ORDER BY id ASC LIMIT ?"), (str(status), int(limit)))
        r = _fetchall(c.fetchall())
    except Exception:
        if _PG: conn.rollback()
        r = []
    conn.close()
    return r


# ══════════════════════════════════════════════════════════════════════════
#  ФОРМА ОБЪЕКТА НА КАРТЕ
#  ---------------------------------------------------------------------
#  Куб остаётся основой, но объект может выглядеть и иначе: кристалл, шар,
#  пирамида. Форма едет вместе с кубом, чтобы её видели все, а не только
#  тот, кто её выбрал.
# ══════════════════════════════════════════════════════════════════════════

ФОРМЫ = ['cube', 'crystal', 'pyramid', 'sphere', 'diamond', 'd20',
         'prism', 'star', 'ring', 'dodeca', 'dollar', 'pic']


def shape_ok(ф):
    return str(ф or '').strip().lower() in ФОРМЫ


def set_cube_shape(cube_id, owner_id, shape, image_url=None):
    """Сменить форму своего куба. Чужой не тронуть: владелец в условии."""
    ф = str(shape or 'cube').strip().lower()
    if not shape_ok(ф):
        return None
    conn = get_db(); c = conn.cursor()
    try:
        if ф == 'pic':
            # Для картинки ссылка обязательна, иначе рисовать будет нечего.
            if not image_url:
                conn.close(); return None
            c.execute(_q("UPDATE cubes SET shape=?, shape_img=? WHERE id=? AND owner_id=?"),
                      (ф, str(image_url)[:600], int(cube_id), int(owner_id)))
        else:
            c.execute(_q("UPDATE cubes SET shape=? WHERE id=? AND owner_id=?"),
                      (ф, int(cube_id), int(owner_id)))
        conn.commit()
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return None
    conn.close()
    return get_cube_shape(cube_id)


def get_cube_shape(cube_id):
    conn = get_db(); c = conn.cursor()
    out = None
    try:
        c.execute(_q("SELECT id, COALESCE(shape,'cube') as shape, shape_img FROM cubes WHERE id=?"),
                  (int(cube_id),))
        r = _fetchall(c.fetchall())
        out = r[0] if r else None
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return out


# ══════════════════════════════════════════════════════════════════════════
#  ОЧЕРЕДЬ МОДЕРАЦИИ
#  ---------------------------------------------------------------------
#  Сюда попадает то, что проверка не пропустила молча: отказы (для учёта и
#  разбора жалоб) и спорное, оставленное на глаз человека. Таблица создаётся
#  сама при первом обращении — отдельной миграции не нужно.
# ══════════════════════════════════════════════════════════════════════════

def _очередь_готова(c):
    if _PG:
        c.execute("""CREATE TABLE IF NOT EXISTS moderation_queue (
            id SERIAL PRIMARY KEY,
            user_id INTEGER,
            kind TEXT NOT NULL,
            verdict TEXT NOT NULL,
            reason TEXT DEFAULT '',
            labels TEXT DEFAULT '',
            weight INTEGER DEFAULT 0,
            body TEXT DEFAULT '',
            ref TEXT DEFAULT '',
            status TEXT NOT NULL DEFAULT 'новый',
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            decided_at TIMESTAMP
        )""")
    else:
        c.execute("""CREATE TABLE IF NOT EXISTS moderation_queue (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            kind TEXT NOT NULL,
            verdict TEXT NOT NULL,
            reason TEXT DEFAULT '',
            labels TEXT DEFAULT '',
            weight INTEGER DEFAULT 0,
            body TEXT DEFAULT '',
            ref TEXT DEFAULT '',
            status TEXT NOT NULL DEFAULT 'новый',
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            decided_at TEXT
        )""")


def mod_add(user_id, kind, verdict, reason, labels, weight, body, ref=''):
    """Положить случай в очередь. Текст режем: он нужен для разбора, а не
       для хранения вечно."""
    conn = get_db(); c = conn.cursor()
    out = None
    try:
        _очередь_готова(c)
        c.execute(_q("INSERT INTO moderation_queue (user_id,kind,verdict,reason,labels,weight,body,ref) "
                     "VALUES (?,?,?,?,?,?,?,?)"),
                  (int(user_id or 0), str(kind)[:32], str(verdict)[:16], str(reason)[:200],
                   ','.join(labels or [])[:200], int(weight or 0), str(body or '')[:1500], str(ref or '')[:64]))
        conn.commit()
        try:
            c.execute("SELECT MAX(id) FROM moderation_queue")
            out = _fetchall(c.fetchall())[0]
            out = out.get('max') if isinstance(out, dict) else out[0]
        except Exception:
            pass
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return out


def mod_list(status=None, limit=100):
    conn = get_db(); c = conn.cursor()
    строки = []
    try:
        _очередь_готова(c)
        if status:
            c.execute(_q("SELECT * FROM moderation_queue WHERE status=? ORDER BY id DESC LIMIT ?"),
                      (str(status), int(limit)))
        else:
            c.execute(_q("SELECT * FROM moderation_queue ORDER BY id DESC LIMIT ?"), (int(limit),))
        строки = _fetchall(c.fetchall())
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return строки


def mod_decide(case_id, status):
    """status: 'оставлено' (ложная тревога) или 'удалено' (подтвердили)."""
    if status not in ('оставлено', 'удалено', 'новый'):
        return False
    conn = get_db(); c = conn.cursor()
    ок = False
    try:
        _очередь_готова(c)
        if _PG:
            c.execute("UPDATE moderation_queue SET status=%s, decided_at=NOW() WHERE id=%s",
                      (status, int(case_id)))
        else:
            c.execute("UPDATE moderation_queue SET status=?, decided_at=datetime('now') WHERE id=?",
                      (status, int(case_id)))
        conn.commit(); ок = True
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return ок


def mod_stats():
    conn = get_db(); c = conn.cursor()
    из = {}
    try:
        _очередь_готова(c)
        c.execute("SELECT verdict, status, COUNT(*) AS n FROM moderation_queue GROUP BY verdict, status")
        for р in _fetchall(c.fetchall()):
            ключ = str(р['verdict']) + '/' + str(р['status'])
            из[ключ] = int(р['n'])
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return из


def mod_last_texts(user_id, kind, limit=5):
    """Последние тексты того же человека того же вида — чтобы поймать,
       когда одно и то же шлют по кругу."""
    conn = get_db(); c = conn.cursor()
    out = []
    try:
        _очередь_готова(c)
        c.execute(_q("SELECT body FROM moderation_queue WHERE user_id=? AND kind=? "
                     "ORDER BY id DESC LIMIT ?"), (int(user_id or 0), str(kind), int(limit)))
        out = [str(р['body'] or '') for р in _fetchall(c.fetchall())]
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return out


def _недавние_готовы(c):
    if _PG:
        c.execute("""CREATE TABLE IF NOT EXISTS mod_recent (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            kind TEXT NOT NULL,
            h TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )""")
    else:
        c.execute("""CREATE TABLE IF NOT EXISTS mod_recent (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            kind TEXT NOT NULL,
            h TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )""")


def mod_repeats(user_id, kind, h):
    """Сколько раз этот же человек уже присылал ровно такой текст.
       Храним не текст, а его отпечаток: для счёта повторов этого хватает,
       а лишних копий чужих слов в базе не заводим."""
    conn = get_db(); c = conn.cursor()
    сколько = 0
    try:
        _недавние_готовы(c)
        c.execute(_q("SELECT COUNT(*) AS n FROM mod_recent WHERE user_id=? AND kind=? AND h=?"),
                  (int(user_id or 0), str(kind), str(h)))
        р = _fetchall(c.fetchall())
        сколько = int(р[0]['n']) if р else 0
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return сколько


def mod_touch(user_id, kind, h):
    """Запомнить отпечаток и подчистить хвост: двадцати последних хватает."""
    conn = get_db(); c = conn.cursor()
    try:
        _недавние_готовы(c)
        c.execute(_q("INSERT INTO mod_recent (user_id,kind,h) VALUES (?,?,?)"),
                  (int(user_id or 0), str(kind), str(h)))
        c.execute(_q("DELETE FROM mod_recent WHERE user_id=? AND kind=? AND id NOT IN "
                     "(SELECT id FROM (SELECT id FROM mod_recent WHERE user_id=? AND kind=? "
                     "ORDER BY id DESC LIMIT 20) t)"),
                  (int(user_id or 0), str(kind), int(user_id or 0), str(kind)))
        conn.commit()
    except Exception:
        if _PG: conn.rollback()
    conn.close()


# ══════════════════════════════════════════════════════════════════════════
#  СТРИМЫ
#  ---------------------------------------------------------------------
#  Эфир живёт здесь: кто ведёт, сколько смотрят, что пишут в комментариях,
#  какие подарки прислали. Само видео через базу не ходит — оно идёт между
#  браузерами напрямую, а сервер только сводит их друг с другом.
#
#  Зритель считается живым, пока отмечается раз в несколько секунд. Так
#  счётчик не врёт, когда кто-то просто закрыл вкладку.
# ══════════════════════════════════════════════════════════════════════════

СТРИМ_ЖИВ_СЕК = 25          # без отметки столько секунд — зритель ушёл
СТРИМ_ТИШИНА_СЕК = 90       # ведущий молчит столько — эфир закрываем сами


def _стримы_готовы(c):
    if _PG:
        c.execute("""CREATE TABLE IF NOT EXISTS streams (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            display_name TEXT,
            title TEXT DEFAULT '',
            mode TEXT DEFAULT 'куб',
            cube_id INTEGER,
            status TEXT NOT NULL DEFAULT 'идёт',
            viewers INTEGER DEFAULT 0,
            peak INTEGER DEFAULT 0,
            likes INTEGER DEFAULT 0,
            gifts_cube REAL DEFAULT 0,
            poster TEXT DEFAULT '',
            beat_at TIMESTAMP DEFAULT NOW(),
            started_at TIMESTAMP NOT NULL DEFAULT NOW(),
            ended_at TIMESTAMP
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS stream_watchers (
            stream_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            display_name TEXT,
            beat_at TIMESTAMP NOT NULL DEFAULT NOW(),
            PRIMARY KEY (stream_id, user_id)
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS stream_comments (
            id SERIAL PRIMARY KEY,
            stream_id INTEGER NOT NULL,
            user_id INTEGER,
            display_name TEXT,
            content TEXT NOT NULL,
            kind TEXT DEFAULT 'текст',
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS stream_gifts (
            id SERIAL PRIMARY KEY,
            stream_id INTEGER NOT NULL,
            from_id INTEGER, from_name TEXT,
            to_id INTEGER,
            gift TEXT NOT NULL, price REAL NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )""")
    else:
        c.execute("""CREATE TABLE IF NOT EXISTS streams (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            display_name TEXT,
            title TEXT DEFAULT '',
            mode TEXT DEFAULT 'куб',
            cube_id INTEGER,
            status TEXT NOT NULL DEFAULT 'идёт',
            viewers INTEGER DEFAULT 0,
            peak INTEGER DEFAULT 0,
            likes INTEGER DEFAULT 0,
            gifts_cube REAL DEFAULT 0,
            poster TEXT DEFAULT '',
            beat_at TEXT DEFAULT (datetime('now')),
            started_at TEXT NOT NULL DEFAULT (datetime('now')),
            ended_at TEXT
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS stream_watchers (
            stream_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            display_name TEXT,
            beat_at TEXT NOT NULL DEFAULT (datetime('now')),
            PRIMARY KEY (stream_id, user_id)
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS stream_comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            stream_id INTEGER NOT NULL,
            user_id INTEGER,
            display_name TEXT,
            content TEXT NOT NULL,
            kind TEXT DEFAULT 'текст',
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )""")
        c.execute("""CREATE TABLE IF NOT EXISTS stream_gifts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            stream_id INTEGER NOT NULL,
            from_id INTEGER, from_name TEXT,
            to_id INTEGER,
            gift TEXT NOT NULL, price REAL NOT NULL,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )""")


def _сейчас_sql():
    return "NOW()" if _PG else "datetime('now')"


def stream_start(user_id, display_name, title, mode='куб', cube_id=None):
    """Начать эфир. Если у человека уже идёт — возвращаем тот же, а не
       плодим пустые: вторая вкладка не должна создавать второй эфир."""
    conn = get_db(); c = conn.cursor()
    из = None
    try:
        _стримы_готовы(c)
        c.execute(_q("SELECT id FROM streams WHERE user_id=? AND status='идёт' ORDER BY id DESC LIMIT 1"),
                  (int(user_id),))
        р = _fetchall(c.fetchall())
        if р:
            из = int(р[0]['id'])
            c.execute(_q("UPDATE streams SET title=?, mode=?, beat_at=" + _сейчас_sql() + " WHERE id=?"),
                      (str(title or '')[:120], str(mode)[:16], из))
            conn.commit()
        else:
            c.execute(_q("INSERT INTO streams (user_id,display_name,title,mode,cube_id) VALUES (?,?,?,?,?)"),
                      (int(user_id), str(display_name or '')[:64], str(title or '')[:120],
                       str(mode)[:16], int(cube_id) if cube_id else None))
            conn.commit()
            c.execute("SELECT MAX(id) AS m FROM streams")
            из = int(_fetchall(c.fetchall())[0]['m'])
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return из


def stream_stop(stream_id, user_id=None):
    conn = get_db(); c = conn.cursor()
    ок = False
    try:
        _стримы_готовы(c)
        if user_id is None:
            c.execute(_q("UPDATE streams SET status='кончился', ended_at=" + _сейчас_sql() +
                         " WHERE id=? AND status='идёт'"), (int(stream_id),))
        else:
            c.execute(_q("UPDATE streams SET status='кончился', ended_at=" + _сейчас_sql() +
                         " WHERE id=? AND user_id=? AND status='идёт'"),
                      (int(stream_id), int(user_id)))
        conn.commit(); ок = True
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return ок


def stream_beat(stream_id, user_id=None):
    """Отметка «я ещё здесь». От ведущего — по эфиру, от зрителя — по себе."""
    conn = get_db(); c = conn.cursor()
    try:
        _стримы_готовы(c)
        c.execute(_q("UPDATE streams SET beat_at=" + _сейчас_sql() + " WHERE id=?"), (int(stream_id),))
        conn.commit()
    except Exception:
        if _PG: conn.rollback()
    conn.close()


def stream_watch(stream_id, user_id, display_name):
    """Зритель отметился. Обновляем его время и пересчитываем счётчик."""
    conn = get_db(); c = conn.cursor()
    сколько = 0
    try:
        _стримы_готовы(c)
        if _PG:
            c.execute("""INSERT INTO stream_watchers (stream_id,user_id,display_name,beat_at)
                         VALUES (%s,%s,%s,NOW())
                         ON CONFLICT (stream_id,user_id)
                         DO UPDATE SET beat_at=NOW(), display_name=EXCLUDED.display_name""",
                      (int(stream_id), int(user_id), str(display_name or '')[:64]))
            c.execute("""DELETE FROM stream_watchers
                         WHERE beat_at < NOW() - INTERVAL '%s seconds'""" % int(СТРИМ_ЖИВ_СЕК))
            c.execute("SELECT COUNT(*) AS n FROM stream_watchers WHERE stream_id=%s", (int(stream_id),))
        else:
            c.execute("""INSERT INTO stream_watchers (stream_id,user_id,display_name,beat_at)
                         VALUES (?,?,?,datetime('now'))
                         ON CONFLICT (stream_id,user_id)
                         DO UPDATE SET beat_at=datetime('now'), display_name=excluded.display_name""",
                      (int(stream_id), int(user_id), str(display_name or '')[:64]))
            c.execute("DELETE FROM stream_watchers WHERE beat_at < datetime('now','-%d seconds')"
                      % int(СТРИМ_ЖИВ_СЕК))
            c.execute("SELECT COUNT(*) AS n FROM stream_watchers WHERE stream_id=?", (int(stream_id),))
        сколько = int(_fetchall(c.fetchall())[0]['n'])
        c.execute(_q("UPDATE streams SET viewers=?, peak=CASE WHEN peak<? THEN ? ELSE peak END WHERE id=?"),
                  (сколько, сколько, сколько, int(stream_id)))
        conn.commit()
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return сколько


def stream_unwatch(stream_id, user_id):
    conn = get_db(); c = conn.cursor()
    try:
        _стримы_готовы(c)
        c.execute(_q("DELETE FROM stream_watchers WHERE stream_id=? AND user_id=?"),
                  (int(stream_id), int(user_id)))
        c.execute(_q("UPDATE streams SET viewers=(SELECT COUNT(*) FROM stream_watchers WHERE stream_id=?) "
                     "WHERE id=?"), (int(stream_id), int(stream_id)))
        conn.commit()
    except Exception:
        if _PG: conn.rollback()
    conn.close()


def stream_sweep():
    """Закрыть эфиры, от которых давно нет вестей. Вызывается на чтении
       списка — отдельного будильника для этого заводить незачем."""
    conn = get_db(); c = conn.cursor()
    try:
        _стримы_готовы(c)
        if _PG:
            c.execute("UPDATE streams SET status='кончился', ended_at=NOW() "
                      "WHERE status='идёт' AND beat_at < NOW() - INTERVAL '%s seconds'"
                      % int(СТРИМ_ТИШИНА_СЕК))
            c.execute("DELETE FROM stream_watchers WHERE beat_at < NOW() - INTERVAL '%s seconds'"
                      % int(СТРИМ_ЖИВ_СЕК))
        else:
            c.execute("UPDATE streams SET status='кончился', ended_at=datetime('now') "
                      "WHERE status='идёт' AND beat_at < datetime('now','-%d seconds')"
                      % int(СТРИМ_ТИШИНА_СЕК))
            c.execute("DELETE FROM stream_watchers WHERE beat_at < datetime('now','-%d seconds')"
                      % int(СТРИМ_ЖИВ_СЕК))
        conn.commit()
    except Exception:
        if _PG: conn.rollback()
    conn.close()


def stream_live(limit=40, q=None):
    """Идущие эфиры. Поиск отбираем на стороне Python нарочно: LOWER() и
       LIKE в SQLite умеют приводить к нижнему регистру только латиницу, и
       запрос «РИСУЮ» не находил эфир «Рисую закат» — буква Р оставалась
       заглавной с обеих сторон. Живых эфиров всегда немного, так что
       отобрать их здесь дешевле, чем городить сравнение в запросе."""
    stream_sweep()
    conn = get_db(); c = conn.cursor()
    строки = []
    try:
        _стримы_готовы(c)
        c.execute(_q("SELECT * FROM streams WHERE status='идёт' ORDER BY viewers DESC, id DESC LIMIT ?"),
                  (int(limit) * 4 if q else int(limit),))
        строки = _fetchall(c.fetchall())
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    if q:
        игла = str(q).casefold()
        строки = [с for с in строки
                  if игла in str(с.get('title') or '').casefold()
                  or игла in str(с.get('display_name') or '').casefold()][:int(limit)]
    return строки


def stream_get(stream_id):
    conn = get_db(); c = conn.cursor()
    из = None
    try:
        _стримы_готовы(c)
        c.execute(_q("SELECT * FROM streams WHERE id=?"), (int(stream_id),))
        р = _fetchall(c.fetchall())
        из = р[0] if р else None
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return из


def stream_like(stream_id, n=1):
    conn = get_db(); c = conn.cursor()
    всего = 0
    try:
        _стримы_готовы(c)
        c.execute(_q("UPDATE streams SET likes=likes+? WHERE id=? AND status='идёт'"),
                  (int(n), int(stream_id)))
        conn.commit()
        c.execute(_q("SELECT likes FROM streams WHERE id=?"), (int(stream_id),))
        р = _fetchall(c.fetchall())
        всего = int(р[0]['likes']) if р else 0
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return всего


def stream_say(stream_id, user_id, display_name, content, kind='текст'):
    conn = get_db(); c = conn.cursor()
    из = None
    try:
        _стримы_готовы(c)
        c.execute(_q("INSERT INTO stream_comments (stream_id,user_id,display_name,content,kind) "
                     "VALUES (?,?,?,?,?)"),
                  (int(stream_id), int(user_id or 0), str(display_name or '')[:64],
                   str(content or '')[:400], str(kind)[:16]))
        conn.commit()
        c.execute("SELECT MAX(id) AS m FROM stream_comments")
        из = int(_fetchall(c.fetchall())[0]['m'])
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return из


def stream_chat(stream_id, after=0, limit=60):
    conn = get_db(); c = conn.cursor()
    строки = []
    try:
        _стримы_готовы(c)
        c.execute(_q("SELECT * FROM stream_comments WHERE stream_id=? AND id>? "
                     "ORDER BY id ASC LIMIT ?"), (int(stream_id), int(after or 0), int(limit)))
        строки = _fetchall(c.fetchall())
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return строки


def stream_gift_write(stream_id, from_id, from_name, to_id, gift, price):
    conn = get_db(); c = conn.cursor()
    try:
        _стримы_готовы(c)
        c.execute(_q("INSERT INTO stream_gifts (stream_id,from_id,from_name,to_id,gift,price) "
                     "VALUES (?,?,?,?,?,?)"),
                  (int(stream_id), int(from_id), str(from_name or '')[:64], int(to_id),
                   str(gift)[:32], float(price)))
        c.execute(_q("UPDATE streams SET gifts_cube=COALESCE(gifts_cube,0)+? WHERE id=?"),
                  (float(price), int(stream_id)))
        conn.commit()
    except Exception:
        if _PG: conn.rollback()
    conn.close()


def stream_gifts_of(stream_id, limit=50):
    conn = get_db(); c = conn.cursor()
    строки = []
    try:
        _стримы_готовы(c)
        c.execute(_q("SELECT * FROM stream_gifts WHERE stream_id=? ORDER BY id DESC LIMIT ?"),
                  (int(stream_id), int(limit)))
        строки = _fetchall(c.fetchall())
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return строки


# ══════════════════════════════════════════════════════════════════════════
#  ЖИВАЯ КАРТА
#  ---------------------------------------------------------------------
#  Одна таблица на все метки: куб на своём месте, идущий эфир, пост с
#  привязкой к месту и сам человек. Разделены они видом (kind), а не
#  отдельными таблицами — иначе карта собиралась бы четырьмя запросами и
#  рассыпалась бы на каждом новом виде меток.
#
#  ПРО ЧЕЛОВЕКА НА КАРТЕ. Метка «я» живёт полчаса и стирается сама. Точные
#  координаты не хранятся вовсе: широта и долгота округляются до сотой
#  доли градуса (это примерно километр) ещё до записи. Сервер физически не
#  знает, в каком ты доме — только в каком километре, и только пока ты сам
#  этого хочешь. Выключил показ — строка удаляется, а не прячется.
# ══════════════════════════════════════════════════════════════════════════

КАРТА_ВИДЫ = ('cube', 'stream', 'post', 'me', 'place')
КАРТА_Я_МИНУТ = 30          # метка человека живёт столько и стирается сама
КАРТА_ТОЧНОСТЬ = 2          # знаков после запятой у метки человека (~1 км)


def _карта_готова(c):
    if _PG:
        c.execute("""CREATE TABLE IF NOT EXISTS map_marks (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            kind TEXT NOT NULL,
            ref_id INTEGER,
            lat REAL NOT NULL,
            lon REAL NOT NULL,
            title TEXT DEFAULT '',
            icon TEXT DEFAULT '',
            display_name TEXT DEFAULT '',
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            expires_at TIMESTAMP
        )""")
    else:
        c.execute("""CREATE TABLE IF NOT EXISTS map_marks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            kind TEXT NOT NULL,
            ref_id INTEGER,
            lat REAL NOT NULL,
            lon REAL NOT NULL,
            title TEXT DEFAULT '',
            icon TEXT DEFAULT '',
            display_name TEXT DEFAULT '',
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            expires_at TIMESTAMP
        )""")
    try:
        c.execute("CREATE INDEX IF NOT EXISTS ix_map_kind ON map_marks (kind)")
        c.execute("CREATE INDEX IF NOT EXISTS ix_map_user ON map_marks (user_id, kind)")
    except Exception:
        pass


def _карта_чистка(c):
    """Протухшие метки удаляем, а не прячем: 'я' должно исчезать насовсем."""
    try:
        if _PG:
            c.execute("DELETE FROM map_marks WHERE expires_at IS NOT NULL AND expires_at < NOW()")
        else:
            c.execute("DELETE FROM map_marks WHERE expires_at IS NOT NULL "
                      "AND expires_at < CURRENT_TIMESTAMP")
    except Exception:
        pass


def _в_градусы(x, точность=None):
    try:
        з = float(x)
    except Exception:
        return None
    if з != з or з in (float('inf'), float('-inf')):
        return None
    if точность is not None:
        з = round(з, точность)
    return з


def map_mark_set(user_id, kind, lat, lon, ref_id=None, title='', icon='',
                 display_name='', minutes=None):
    """Поставить метку. На каждый вид и ref_id у человека она одна: вторая
       не плодится, а заменяет первую — иначе карта зарастала бы следами."""
    kind = str(kind or '').strip()
    if kind not in КАРТА_ВИДЫ:
        return None
    ш = _в_градусы(lat, КАРТА_ТОЧНОСТЬ if kind == 'me' else None)
    д = _в_градусы(lon, КАРТА_ТОЧНОСТЬ if kind == 'me' else None)
    if ш is None or д is None or not (-90 <= ш <= 90) or not (-180 <= д <= 180):
        return None
    срок = minutes if minutes is not None else (КАРТА_Я_МИНУТ if kind == 'me' else None)

    conn = get_db(); c = conn.cursor()
    номер = None
    try:
        _карта_готова(c); _карта_чистка(c)
        if ref_id is None:
            c.execute(_q("DELETE FROM map_marks WHERE user_id=? AND kind=? AND ref_id IS NULL"),
                      (int(user_id), kind))
        else:
            c.execute(_q("DELETE FROM map_marks WHERE user_id=? AND kind=? AND ref_id=?"),
                      (int(user_id), kind, int(ref_id)))
        if срок:
            до = ("NOW() + INTERVAL '%d minutes'" % int(срок)) if _PG \
                 else ("datetime('now','+%d minutes')" % int(срок))
            c.execute(_q("INSERT INTO map_marks (user_id,kind,ref_id,lat,lon,title,icon,"
                         "display_name,expires_at) VALUES (?,?,?,?,?,?,?,?," + до + ")"),
                      (int(user_id), kind, int(ref_id) if ref_id is not None else None,
                       ш, д, str(title or '')[:120], str(icon or '')[:8],
                       str(display_name or '')[:64]))
        else:
            c.execute(_q("INSERT INTO map_marks (user_id,kind,ref_id,lat,lon,title,icon,"
                         "display_name) VALUES (?,?,?,?,?,?,?,?)"),
                      (int(user_id), kind, int(ref_id) if ref_id is not None else None,
                       ш, д, str(title or '')[:120], str(icon or '')[:8],
                       str(display_name or '')[:64]))
        conn.commit()
        c.execute("SELECT MAX(id) AS m FROM map_marks")
        номер = int(_fetchall(c.fetchall())[0]['m'])
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return номер


def map_mark_drop(user_id, kind=None, ref_id=None, mark_id=None):
    """Снять метку. Чужую снять нельзя: условие по user_id не убирается."""
    conn = get_db(); c = conn.cursor()
    ок = False
    try:
        _карта_готова(c)
        if mark_id is not None:
            c.execute(_q("DELETE FROM map_marks WHERE id=? AND user_id=?"),
                      (int(mark_id), int(user_id)))
        elif kind is not None and ref_id is not None:
            c.execute(_q("DELETE FROM map_marks WHERE user_id=? AND kind=? AND ref_id=?"),
                      (int(user_id), str(kind), int(ref_id)))
        elif kind is not None:
            c.execute(_q("DELETE FROM map_marks WHERE user_id=? AND kind=?"),
                      (int(user_id), str(kind)))
        else:
            c.execute(_q("DELETE FROM map_marks WHERE user_id=?"), (int(user_id),))
        conn.commit(); ок = True
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return ок


def map_live(kinds=None, limit=600):
    """Всё живое на карте. Эфиры берём не из меток, а из самих эфиров —
       иначе метка пережила бы конец эфира и карта показывала бы призраков."""
    conn = get_db(); c = conn.cursor()
    строки = []
    try:
        _карта_готова(c); _карта_чистка(c)
        виды = [к for к in (kinds or КАРТА_ВИДЫ) if к in КАРТА_ВИДЫ]
        if not виды:
            виды = list(КАРТА_ВИДЫ)
        места = ','.join(['?'] * len(виды))
        c.execute(_q("SELECT * FROM map_marks WHERE kind IN (" + места + ") "
                     "ORDER BY id DESC LIMIT ?"), tuple(виды) + (int(limit),))
        строки = _fetchall(c.fetchall())
        if 'stream' in виды:
            try:
                _стримы_готовы(c)
                живые = set()
                c.execute("SELECT id FROM streams WHERE status='идёт'")
                for р in _fetchall(c.fetchall()):
                    живые.add(int(р['id']))
                строки = [с for с in строки
                          if с.get('kind') != 'stream'
                          or (с.get('ref_id') is not None and int(с['ref_id']) in живые)]
            except Exception:
                pass
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return строки


def map_marks_of(user_id, limit=200):
    conn = get_db(); c = conn.cursor()
    строки = []
    try:
        _карта_готова(c); _карта_чистка(c)
        c.execute(_q("SELECT * FROM map_marks WHERE user_id=? ORDER BY id DESC LIMIT ?"),
                  (int(user_id), int(limit)))
        строки = _fetchall(c.fetchall())
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return строки


# ══════════════════════════════════════════════════════════════════════════
#  ШОПИНГ — ВТОРОЙ РАЗДЕЛ МАРКЕТПЛЕЙСА
#  ---------------------------------------------------------------------
#  Цифровой маркетплейс продаёт файлы: купил — скачал. Вещь так не продашь,
#  у неё другая карточка: бренд, размеры, цвета, состояние, двадцать
#  снимков и описание по пунктам. Поэтому отдельные таблицы, а не ещё одна
#  колонка к цифровым товарам: там содержимое прячется до покупки, а здесь
#  снимки — это и есть витрина, их видно всем.
#
#  Снимки лежат в базе, как и файлы цифровых товаров. Браузер ужимает их
#  перед отправкой, поэтому карточка из двадцати фотографий весит мегабайты,
#  а не сотни мегабайт.
# ══════════════════════════════════════════════════════════════════════════

ШОП_МАКС_МЕДИА   = 20                      # снимков и роликов на товар
ШОП_МАКС_ФАЙЛ    = 12 * 1024 * 1024        # один файл
ШОП_МАКС_ВСЕГО   = 60 * 1024 * 1024        # все файлы одного товара
ШОП_МАКС_АКТИВНЫХ = 40                     # товаров в продаже у одного человека

ШОП_РАЗДЕЛЫ = ["clothes", "shoes", "bags", "watch", "jewel", "beauty",
               "home", "tech", "sport", "kids", "hobby", "books",
               "auto", "food", "art", "other"]
ШОП_СОСТОЯНИЕ = ["new", "like-new", "used", "vintage"]


def _шоп_готов(c):
    pk = "SERIAL PRIMARY KEY" if _PG else "INTEGER PRIMARY KEY AUTOINCREMENT"
    ts = "TIMESTAMP" if _PG else "TIMESTAMP"
    now = "NOW()" if _PG else "CURRENT_TIMESTAMP"
    blob = "BYTEA" if _PG else "BLOB"
    c.execute(f"""CREATE TABLE IF NOT EXISTS shop_items (
        id {pk},
        seller_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        brand TEXT DEFAULT '',
        category TEXT NOT NULL DEFAULT 'other',
        subcategory TEXT DEFAULT '',
        price REAL NOT NULL DEFAULT 0,
        currency TEXT NOT NULL DEFAULT 'CUBE',
        condition TEXT DEFAULT 'new',
        qty INTEGER NOT NULL DEFAULT 1,
        description TEXT DEFAULT '',
        specs TEXT DEFAULT '',
        variants TEXT DEFAULT '',
        shipping TEXT DEFAULT '',
        shape TEXT DEFAULT 'куб',
        shape_text TEXT DEFAULT '',
        shape_color TEXT DEFAULT '#f1c40f',
        status TEXT NOT NULL DEFAULT 'active',
        views INTEGER NOT NULL DEFAULT 0,
        created_at {ts} NOT NULL DEFAULT {now},
        updated_at {ts} NOT NULL DEFAULT {now}
    )""")
    c.execute(f"""CREATE TABLE IF NOT EXISTS shop_media (
        id {pk},
        item_id INTEGER NOT NULL,
        kind TEXT NOT NULL DEFAULT 'photo',
        name TEXT DEFAULT '',
        mime TEXT DEFAULT 'image/jpeg',
        size INTEGER NOT NULL DEFAULT 0,
        ord INTEGER NOT NULL DEFAULT 0,
        data {blob}
    )""")
    c.execute(f"""CREATE TABLE IF NOT EXISTS shop_orders (
        id {pk},
        item_id INTEGER NOT NULL,
        buyer_id INTEGER NOT NULL,
        seller_id INTEGER NOT NULL,
        title TEXT DEFAULT '',
        price REAL NOT NULL DEFAULT 0,
        currency TEXT NOT NULL DEFAULT 'CUBE',
        qty INTEGER NOT NULL DEFAULT 1,
        total REAL NOT NULL DEFAULT 0,
        status TEXT NOT NULL DEFAULT 'paid',
        address TEXT DEFAULT '',
        note TEXT DEFAULT '',
        created_at {ts} NOT NULL DEFAULT {now},
        sent_at {ts},
        done_at {ts}
    )""")
    try:
        c.execute("CREATE INDEX IF NOT EXISTS ix_shop_seller ON shop_items (seller_id)")
        c.execute("CREATE INDEX IF NOT EXISTS ix_shop_cat ON shop_items (category)")
        c.execute("CREATE INDEX IF NOT EXISTS ix_shop_media ON shop_media (item_id)")
        c.execute("CREATE INDEX IF NOT EXISTS ix_shop_ord_buy ON shop_orders (buyer_id)")
        c.execute("CREATE INDEX IF NOT EXISTS ix_shop_ord_sell ON shop_orders (seller_id)")
    except Exception:
        pass


def shop_create(seller_id, поля):
    conn = get_db(); c = conn.cursor()
    номер = None
    try:
        _шоп_готов(c)
        c.execute(_q("INSERT INTO shop_items (seller_id,title,brand,category,subcategory,"
                     "price,currency,condition,qty,description,specs,variants,shipping,"
                     "shape,shape_text,shape_color) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"),
                  (int(seller_id), поля["title"], поля["brand"], поля["category"],
                   поля["subcategory"], float(поля["price"]), поля["currency"],
                   поля["condition"], int(поля["qty"]), поля["description"],
                   поля["specs"], поля["variants"], поля["shipping"],
                   поля["shape"], поля["shape_text"], поля["shape_color"]))
        conn.commit()
        c.execute("SELECT MAX(id) AS m FROM shop_items")
        номер = int(_fetchall(c.fetchall())[0]["m"])
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return номер


def shop_update(item_id, seller_id, поля):
    conn = get_db(); c = conn.cursor()
    ок = False
    try:
        _шоп_готов(c)
        куски, значения = [], []
        for к in ("title", "brand", "category", "subcategory", "price", "currency",
                  "condition", "qty", "description", "specs", "variants", "shipping",
                  "shape", "shape_text", "shape_color", "status"):
            if к in поля:
                куски.append(к + "=?"); значения.append(поля[к])
        if not куски:
            conn.close(); return False
        значения += [int(item_id), int(seller_id)]
        c.execute(_q("UPDATE shop_items SET " + ",".join(куски) +
                     ", updated_at=" + _сейчас_sql() + " WHERE id=? AND seller_id=?"),
                  tuple(значения))
        # v=545 · Раньше здесь стояло ок = True: правка «удалась» всегда,
        # даже когда WHERE не нашёл ни одной строки. Сам товар при этом не
        # менялся — его защищал seller_id в условии, — но наружу уходило
        # «готово». Из-за этого POST /shop/{id}/status отвечал 200 на чужой
        # товар вместо 403. Считаем тронутые строки: не тронули — не удалось.
        тронуто = c.rowcount
        conn.commit(); ок = (тронуто is None) or (тронуто > 0)
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return ок


def shop_get(item_id):
    conn = get_db(); c = conn.cursor()
    строка = None
    try:
        _шоп_готов(c)
        c.execute(_q("SELECT * FROM shop_items WHERE id=?"), (int(item_id),))
        р = _fetchall(c.fetchall())
        строка = р[0] if р else None
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return строка


def shop_list(category=None, query=None, seller_id=None, limit=60, offset=0,
              include_hidden=False):
    conn = get_db(); c = conn.cursor()
    строки = []
    try:
        _шоп_готов(c)
        где, значения = [], []
        if not include_hidden:
            где.append("status='active'")
        if category:
            где.append("category=?"); значения.append(str(category))
        if seller_id:
            где.append("seller_id=?"); значения.append(int(seller_id))
        sql = "SELECT * FROM shop_items"
        if где:
            sql += " WHERE " + " AND ".join(где)
        sql += " ORDER BY id DESC LIMIT ? OFFSET ?"
        значения += [int(limit) * (4 if query else 1), int(offset)]
        c.execute(_q(sql), tuple(значения))
        строки = _fetchall(c.fetchall())
        if query:
            # LOWER и LIKE в SQLite не знают кириллицы — отбираем в Python.
            н = str(query).lower().strip()
            строки = [с for с in строки
                      if н in str(с.get("title") or "").lower()
                      or н in str(с.get("brand") or "").lower()
                      or н in str(с.get("description") or "").lower()][:int(limit)]
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return строки


def shop_delete(item_id, seller_id):
    conn = get_db(); c = conn.cursor()
    ок = False
    try:
        _шоп_готов(c)
        c.execute(_q("DELETE FROM shop_items WHERE id=? AND seller_id=?"),
                  (int(item_id), int(seller_id)))
        тронуто = c.rowcount
        if тронуто:
            c.execute(_q("DELETE FROM shop_media WHERE item_id=?"), (int(item_id),))
        conn.commit(); ок = bool(тронуто)
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return ок


def shop_active_count(seller_id):
    conn = get_db(); c = conn.cursor()
    сколько = 0
    try:
        _шоп_готов(c)
        c.execute(_q("SELECT COUNT(*) AS n FROM shop_items "
                     "WHERE seller_id=? AND status='active'"), (int(seller_id),))
        сколько = int(_fetchall(c.fetchall())[0]["n"])
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return сколько


def shop_media_add(item_id, kind, name, mime, data, ord_=0):
    conn = get_db(); c = conn.cursor()
    номер = None
    try:
        _шоп_готов(c)
        c.execute(_q("INSERT INTO shop_media (item_id,kind,name,mime,size,ord,data) "
                     "VALUES (?,?,?,?,?,?,?)"),
                  (int(item_id), str(kind)[:12], str(name or "")[:200],
                   str(mime or "")[:120], len(data), int(ord_), _bin(data)))
        conn.commit()
        c.execute("SELECT MAX(id) AS m FROM shop_media")
        номер = int(_fetchall(c.fetchall())[0]["m"])
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return номер


def shop_shape_media(item_id):
    """Снимок или ролик, натянутый на фигуру товара. Он лежит в той же
       таблице, но помечен отдельным видом и в витрину не попадает."""
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("SELECT id,kind,mime FROM shop_media WHERE item_id=? AND kind='shape' "
                     "ORDER BY id DESC"), (int(item_id),))
        р = c.fetchone(); conn.close()
        return _fetchone(р) if р else None
    except Exception:
        conn.close(); return None


def shop_shape_media_del(item_id):
    conn = get_db(); c = conn.cursor()
    try:
        c.execute(_q("DELETE FROM shop_media WHERE item_id=? AND kind='shape'"), (int(item_id),))
        conn.commit(); conn.close(); return True
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return False


def shop_media_list(item_id, with_data=False):
    conn = get_db(); c = conn.cursor()
    строки = []
    try:
        _шоп_готов(c)
        поля = "*" if with_data else "id,item_id,kind,name,mime,size,ord"
        # Картинка фигуры лежит здесь же, но витрина её не показывает:
        # она натянута на крутящийся значок, а не на карточку.
        c.execute(_q("SELECT " + поля + " FROM shop_media WHERE item_id=? "
                     "AND kind<>'shape' ORDER BY ord, id"), (int(item_id),))
        строки = _fetchall(c.fetchall())
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return строки


def shop_media_one(item_id, media_id):
    conn = get_db(); c = conn.cursor()
    строка = None
    try:
        _шоп_готов(c)
        c.execute(_q("SELECT * FROM shop_media WHERE id=? AND item_id=?"),
                  (int(media_id), int(item_id)))
        р = _fetchall(c.fetchall())
        строка = р[0] if р else None
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return строка


def shop_media_size(item_id):
    conn = get_db(); c = conn.cursor()
    всего, сколько = 0, 0
    try:
        _шоп_готов(c)
        c.execute(_q("SELECT COUNT(*) AS n, COALESCE(SUM(size),0) AS s "
                     "FROM shop_media WHERE item_id=?"), (int(item_id),))
        р = _fetchall(c.fetchall())[0]
        сколько = int(р["n"]); всего = int(р["s"] or 0)
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return всего, сколько


def shop_media_del(item_id, media_id, seller_id):
    conn = get_db(); c = conn.cursor()
    ок = False
    try:
        _шоп_готов(c)
        c.execute(_q("SELECT seller_id FROM shop_items WHERE id=?"), (int(item_id),))
        р = _fetchall(c.fetchall())
        if р and int(р[0]["seller_id"]) == int(seller_id):
            c.execute(_q("DELETE FROM shop_media WHERE id=? AND item_id=?"),
                      (int(media_id), int(item_id)))
            conn.commit(); ок = True
    except Exception:
        if _PG: conn.rollback()
    conn.close()
    return ок


def shop_view(item_id):
    conn = get_db(); c = conn.cursor()
    try:
        _шоп_готов(c)
        c.execute(_q("UPDATE shop_items SET views=COALESCE(views,0)+1 WHERE id=?"),
                  (int(item_id),))
        conn.commit()
    except Exception:
        if _PG: conn.rollback()
    conn.close()


# ══ ПОКУПКА ВЕЩЕЙ ══════════════════════════════════════════════════════════
#
#  Вещь — не файл: её ещё надо довезти. Поэтому деньги не уходят продавцу в
#  тот же миг, а лежат у площадки, пока покупатель не скажет «получил».
#  Три состояния и два поворота:
#
#      paid ──(продавец: отправил)──→ sent ──(покупатель: получил)──→ done
#       │                              │
#       └──────(любой: отменил)────────┴──→ cancelled   деньги назад
#
#  До «sent» отменить может и покупатель, и продавец. После «sent» отменяет
#  только продавец: если он признал, что вещь не дошла, спорить не о чем.
#  Деньги в «done» уходят продавцу, в «cancelled» возвращаются покупателю —
#  и то и другое одной записью в истории кошелька, чтобы в выписке было
#  видно, за что.
#
#  Количество списываем при покупке, а при отмене возвращаем: иначе отменённый
#  заказ навсегда съедал бы штуку с витрины.

ШОП_СОСТОЯНИЯ_ЗАКАЗА = ("paid", "sent", "done", "cancelled")


def _шоп_заказ_строка(row):
    д = dict(row) if hasattr(row, "keys") else dict(row or {})
    return {
        "id": int(д.get("id") or 0),
        "item_id": int(д.get("item_id") or 0),
        "buyer_id": int(д.get("buyer_id") or 0),
        "seller_id": int(д.get("seller_id") or 0),
        "title": д.get("title") or "",
        "price": round(float(д.get("price") or 0), 2),
        "currency": д.get("currency") or "CUBE",
        "qty": int(д.get("qty") or 1),
        "total": round(float(д.get("total") or 0), 2),
        "status": д.get("status") or "paid",
        "address": д.get("address") or "",
        "note": д.get("note") or "",
        "created_at": str(д.get("created_at") or ""),
        "sent_at": str(д.get("sent_at") or ""),
        "done_at": str(д.get("done_at") or ""),
    }


def shop_order_get(order_id):
    conn = get_db(); c = conn.cursor()
    try:
        _шоп_готов(c)
        c.execute(_q("SELECT * FROM shop_orders WHERE id=?"), (int(order_id),))
        строки = _fetchall(c.fetchall())
    except Exception:
        строки = []
    conn.close()
    return _шоп_заказ_строка(строки[0]) if строки else None


def shop_buy(item_id, buyer_id, qty=1, address="", note=""):
    """Купить вещь. Деньги списываем ТОЛЬКО после того, как заказ лёг в базу:
       иначе двойное нажатие списало бы дважды. Если списание не прошло —
       заказ убираем и количество возвращаем, чтобы вещь не ушла даром."""
    товар = shop_get(item_id)
    if not товар:
        return {"error": "нет такого товара"}
    if (товар.get("status") or "") != "active":
        return {"error": "товар снят с витрины"}
    продавец = int(товар.get("seller_id") or 0)
    if продавец == int(buyer_id):
        return {"error": "это твой собственный товар"}

    штук = max(1, int(qty or 1))
    есть = int(товар.get("qty") or 0)
    if есть < штук:
        return {"error": "осталось меньше", "qty": есть}

    цена = round(float(товар.get("price") or 0), 2)
    if цена <= 0:
        return {"error": "у товара нет цены — договаривайтесь в переписке"}
    всего = round(цена * штук, 2)

    баланс = get_cube_balance(buyer_id)
    if баланс < всего:
        return {"error": "not enough", "balance": баланс, "price": всего}

    conn = get_db(); c = conn.cursor()
    номер = None
    try:
        _шоп_готов(c)
        # Количество уменьшаем тем же запросом, которым проверяем: между
        # проверкой и записью чужая покупка могла забрать последнюю штуку.
        c.execute(_q("UPDATE shop_items SET qty=qty-?, "
                     "status=CASE WHEN qty-?<=0 THEN 'sold' ELSE status END "
                     "WHERE id=? AND qty>=? AND status='active'"),
                  (штук, штук, int(item_id), штук))
        тронуто = c.rowcount
        if not тронуто:
            conn.rollback() if _PG else None
            conn.close()
            return {"error": "товар разобрали"}
        c.execute(_q("INSERT INTO shop_orders (item_id,buyer_id,seller_id,title,price,"
                     "currency,qty,total,status,address,note) "
                     "VALUES (?,?,?,?,?,?,?,?,?,?,?)"),
                  (int(item_id), int(buyer_id), продавец,
                   str(товар.get("title") or "")[:200], цена,
                   товар.get("currency") or "CUBE", штук, всего, "paid",
                   str(address or "")[:400], str(note or "")[:400]))
        conn.commit()
        c.execute("SELECT MAX(id) AS m FROM shop_orders")
        номер = int(_fetchall(c.fetchall())[0]["m"])
    except Exception as e:
        try:
            if _PG: conn.rollback()
        except Exception:
            pass
        conn.close()
        return {"error": str(e)[:160]}
    conn.close()

    ушло = spend_cube(buyer_id, всего, "shop_buy",
                      "Шопинг: " + str(товар.get("title") or "")[:80])
    if not ушло.get("ok"):
        # Денег не хватило в самый последний миг — откатываем заказ и
        # возвращаем штуку на витрину.
        _шоп_заказ_снять(номер, item_id, штук)
        return {"error": "not enough", "balance": ушло.get("balance", 0), "price": всего}

    return {"ok": True, "order_id": номер, "paid": всего,
            "balance": ушло.get("balance", get_cube_balance(buyer_id)),
            "order": shop_order_get(номер)}


def _шоп_заказ_снять(order_id, item_id, штук):
    conn = get_db(); c = conn.cursor()
    try:
        _шоп_готов(c)
        c.execute(_q("DELETE FROM shop_orders WHERE id=?"), (int(order_id),))
        c.execute(_q("UPDATE shop_items SET qty=qty+?, "
                     "status=CASE WHEN status='sold' THEN 'active' ELSE status END "
                     "WHERE id=?"), (int(штук), int(item_id)))
        conn.commit()
    except Exception:
        if _PG: conn.rollback()
    conn.close()


def shop_has_order(item_id, user_id):
    """Покупал ли этот человек эту вещь. Нужно витрине: распроданный товар
       скрыт от всех, но тому, кто его купил, карточку показать надо —
       иначе из «Моих покупок» некуда вернуться."""
    conn = get_db(); c = conn.cursor()
    есть = False
    try:
        _шоп_готов(c)
        c.execute(_q("SELECT id FROM shop_orders WHERE item_id=? AND buyer_id=? LIMIT 1"),
                  (int(item_id), int(user_id)))
        есть = bool(_fetchall(c.fetchall()))
    except Exception:
        есть = False
    conn.close()
    return есть


def shop_orders_my(buyer_id, limit=60):
    return _шоп_заказы("buyer_id", buyer_id, limit)


def shop_sales_my(seller_id, limit=60):
    return _шоп_заказы("seller_id", seller_id, limit)


def _шоп_заказы(поле, кто, limit):
    conn = get_db(); c = conn.cursor()
    try:
        _шоп_готов(c)
        c.execute(_q("SELECT * FROM shop_orders WHERE " + поле + "=? "
                     "ORDER BY id DESC LIMIT ?"), (int(кто), int(limit)))
        строки = _fetchall(c.fetchall())
    except Exception:
        строки = []
    conn.close()
    return [_шоп_заказ_строка(р) for р in строки]


def shop_order_move(order_id, user_id, куда):
    """Перевести заказ в новое состояние. Кто что может — здесь, а не в
       браузере: кнопку нарисовать легко, а решает сервер."""
    з = shop_order_get(order_id)
    if not з:
        return {"error": "нет такого заказа"}
    я = int(user_id)
    покупатель = (я == з["buyer_id"])
    продавец = (я == з["seller_id"])
    if not (покупатель or продавец):
        return {"error": "это не твой заказ"}
    было = з["status"]
    куда = str(куда or "")

    можно = (
        (было == "paid" and куда == "sent" and продавец) or
        (было == "sent" and куда == "done" and покупатель) or
        (было == "paid" and куда == "cancelled") or
        (было == "sent" and куда == "cancelled" and продавец)
    )
    if not можно:
        return {"error": "так заказ не переводится"}

    now = "NOW()" if _PG else "CURRENT_TIMESTAMP"
    conn = get_db(); c = conn.cursor()
    try:
        _шоп_готов(c)
        поле = {"sent": "sent_at", "done": "done_at"}.get(куда)
        набор = "status=?" + (", " + поле + "=" + now if поле else "")
        # Условие по старому состоянию — защита от двойного нажатия:
        # второй запрос просто ничего не тронет.
        c.execute(_q("UPDATE shop_orders SET " + набор + " WHERE id=? AND status=?"),
                  (куда, int(order_id), было))
        тронуто = c.rowcount
        conn.commit()
    except Exception as e:
        try:
            if _PG: conn.rollback()
        except Exception:
            pass
        conn.close()
        return {"error": str(e)[:160]}
    conn.close()
    if not тронуто:
        return {"error": "заказ уже перевели"}

    подпись = str(з["title"])[:80]
    if куда == "done":
        add_cube_balance(з["seller_id"], з["total"], "shop_sale",
                         "Шопинг, продажа: " + подпись)
    elif куда == "cancelled":
        add_cube_balance(з["buyer_id"], з["total"], "shop_refund",
                         "Шопинг, возврат: " + подпись)
        # Вещь возвращается на витрину — отменённый заказ не должен её съедать.
        conn = get_db(); c = conn.cursor()
        try:
            c.execute(_q("UPDATE shop_items SET qty=qty+?, "
                         "status=CASE WHEN status='sold' THEN 'active' ELSE status END "
                         "WHERE id=?"), (int(з["qty"]), int(з["item_id"])))
            conn.commit()
        except Exception:
            if _PG: conn.rollback()
        conn.close()

    return {"ok": True, "order": shop_order_get(order_id)}


# ══ СТОРИС И ДОПОЛНЕНИЯ ГРУПП ═══════════════════════════════════════════════
# Сторис живут сутки и пропадают сами — как в привычных мессенджерах.
# Файл лежит в базе, как снимки витрины: отдельного хранилища у нас нет, а
# ссылка на чужой сервис ломается в тот день, когда её там удалят.

СТОРИС_ЖИЗНЬ_Ч   = 24                       # сколько живёт запись
СТОРИС_МАКС_ФАЙЛ = 15 * 1024 * 1024         # один файл
СТОРИС_МАКС_СВОИХ = 10                      # сколько держим на человека
СТОРИС_ВИДЕО_СЕК = 60                       # потолок длины ролика

ГРУППА_МАКС_ФОТО = 7
ГРУППА_МАКС_ФАЙЛ = 12 * 1024 * 1024

_СТОРИС_ГОТОВО = False


def _сторис_готов(c):
    global _СТОРИС_ГОТОВО
    if _СТОРИС_ГОТОВО:
        return
    pk   = "SERIAL PRIMARY KEY" if _PG else "INTEGER PRIMARY KEY AUTOINCREMENT"
    ts   = "TIMESTAMP" if _PG else "TEXT"
    now  = "NOW()" if _PG else "CURRENT_TIMESTAMP"
    blob = "BYTEA" if _PG else "BLOB"
    c.execute(f"""CREATE TABLE IF NOT EXISTS stories (
        id {pk},
        user_id INTEGER NOT NULL,
        kind TEXT NOT NULL DEFAULT 'photo',
        mime TEXT DEFAULT 'image/jpeg',
        size INTEGER NOT NULL DEFAULT 0,
        caption TEXT DEFAULT '',
        secs INTEGER NOT NULL DEFAULT 5,
        created_at {ts} NOT NULL DEFAULT {now},
        expires_at {ts},
        data {blob}
    )""")
    c.execute(f"""CREATE TABLE IF NOT EXISTS story_seen (
        story_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        at {ts} NOT NULL DEFAULT {now}
    )""")
    try:
        c.execute("CREATE INDEX IF NOT EXISTS ix_stories_user ON stories (user_id)")
        c.execute("CREATE INDEX IF NOT EXISTS ix_stories_exp ON stories (expires_at)")
        c.execute("CREATE INDEX IF NOT EXISTS ix_story_seen ON story_seen (story_id,user_id)")
    except Exception:
        pass
    _СТОРИС_ГОТОВО = True


def _сторис_прибрать(c):
    """Протухшее убираем при каждом обращении: отдельного дворника нет."""
    try:
        if _PG:
            c.execute("DELETE FROM stories WHERE expires_at IS NOT NULL AND expires_at <= NOW()")
        else:
            c.execute("DELETE FROM stories WHERE expires_at IS NOT NULL "
                      "AND expires_at <= datetime('now')")
    except Exception:
        pass


def story_add(user_id: int, kind: str, mime: str, data: bytes,
              caption: str = "", secs: int = 5):
    conn = get_db(); c = conn.cursor()
    try:
        _сторис_готов(c); _сторис_прибрать(c)
        # Держим не больше десяти на человека: самое старое уходит.
        c.execute(_q("SELECT id FROM stories WHERE user_id=? ORDER BY id DESC"), (int(user_id),))
        свои = [r[0] if not isinstance(r, dict) else r["id"] for r in c.fetchall()]
        for лишний in свои[СТОРИС_МАКС_СВОИХ - 1:]:
            c.execute(_q("DELETE FROM stories WHERE id=?"), (лишний,))
        срок = ("NOW() + INTERVAL '%d hours'" % СТОРИС_ЖИЗНЬ_Ч) if _PG \
               else ("datetime('now','+%d hours')" % СТОРИС_ЖИЗНЬ_Ч)
        нов = _execute_returning(
            conn,
            _q("INSERT INTO stories (user_id,kind,mime,size,caption,secs,expires_at,data) "
               "VALUES (?,?,?,?,?,?," + срок + ",?)"),
            (int(user_id), kind, mime, len(data or b""), caption[:300],
             max(2, min(60, int(secs or 5))), _bin(data or b"")))
        conn.commit(); conn.close()
        return нов
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return None


def story_feed(viewer_id: int, limit: int = 120):
    """Живые записи всех, кто не скрыт, вместе с именем и отметкой «смотрел»."""
    conn = get_db(); c = conn.cursor()
    try:
        _сторис_готов(c); _сторис_прибрать(c)
        c.execute(_q(
            "SELECT s.id, s.user_id, s.kind, s.mime, s.caption, s.secs, s.created_at, "
            "       u.display_name AS display_name, u.avatar_url AS avatar_url, "
            "       (SELECT COUNT(*) FROM story_seen v WHERE v.story_id=s.id AND v.user_id=?) AS seen "
            "FROM stories s LEFT JOIN users u ON u.id=s.user_id "
            "ORDER BY s.user_id, s.id LIMIT ?"), (int(viewer_id), int(limit)))
        строки = _fetchall(c.fetchall())
        # v=599 · Кружок человека собираем тем же правилом, что и в ленте:
        # фото уезжает коротким хэшем, эмодзи остаётся эмодзи. Раньше сюда
        # падала сырая строка, и эмодзи на экране превращался в значок
        # битой картинки.
        _применить_лица(conn, строки)
        conn.close(); return строки
    except Exception:
        conn.close(); return []


def story_one(story_id: int):
    conn = get_db(); c = conn.cursor()
    try:
        _сторис_готов(c)
        c.execute(_q("SELECT * FROM stories WHERE id=?"), (int(story_id),))
        р = c.fetchone(); conn.close()
        return _fetchone(р) if р else None
    except Exception:
        conn.close(); return None


def story_seen(story_id: int, user_id: int):
    conn = get_db(); c = conn.cursor()
    try:
        _сторис_готов(c)
        c.execute(_q("SELECT 1 FROM story_seen WHERE story_id=? AND user_id=?"),
                  (int(story_id), int(user_id)))
        if not c.fetchone():
            c.execute(_q("INSERT INTO story_seen (story_id,user_id) VALUES (?,?)"),
                      (int(story_id), int(user_id)))
            conn.commit()
        conn.close(); return True
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return False


def story_del(story_id: int, user_id: int):
    conn = get_db(); c = conn.cursor()
    try:
        _сторис_готов(c)
        c.execute(_q("DELETE FROM stories WHERE id=? AND user_id=?"),
                  (int(story_id), int(user_id)))
        ушло = c.rowcount
        conn.commit(); conn.close()
        return ушло > 0
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return False


# ── Истории: лайки, комментарии, подарки и монеты ───────────────────────────
#  Сторис жили сутки и умели ровно одно — показаться. Теперь у записи та же
#  жизнь, что у публикации в ленте: её смотрят, ей ставят сердце, под ней
#  пишут, и автору за неё шлют подарки и монеты. Всё живёт столько же,
#  сколько сама запись: истекла — сервер убирает вместе со следами.
_СТОРИС_НАГРАДЫ = False


def _сторис_награды(c):
    global _СТОРИС_НАГРАДЫ
    if _СТОРИС_НАГРАДЫ:
        return
    pk  = "SERIAL PRIMARY KEY" if _PG else "INTEGER PRIMARY KEY AUTOINCREMENT"
    ts  = "TIMESTAMP" if _PG else "TEXT"
    now = "NOW()" if _PG else "CURRENT_TIMESTAMP"
    c.execute(f"""CREATE TABLE IF NOT EXISTS story_likes (
        story_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        at {ts} NOT NULL DEFAULT {now}
    )""")
    c.execute(f"""CREATE TABLE IF NOT EXISTS story_comments (
        id {pk},
        story_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        display_name TEXT DEFAULT '',
        text TEXT NOT NULL DEFAULT '',
        created_at {ts} NOT NULL DEFAULT {now}
    )""")
    c.execute(f"""CREATE TABLE IF NOT EXISTS story_gifts (
        id {pk},
        story_id INTEGER NOT NULL,
        from_id INTEGER NOT NULL,
        from_name TEXT DEFAULT '',
        to_id INTEGER NOT NULL,
        gift TEXT DEFAULT '',
        cube REAL NOT NULL DEFAULT 0,
        at {ts} NOT NULL DEFAULT {now}
    )""")
    try:
        c.execute("CREATE INDEX IF NOT EXISTS ix_story_likes ON story_likes (story_id,user_id)")
        c.execute("CREATE INDEX IF NOT EXISTS ix_story_comments ON story_comments (story_id)")
        c.execute("CREATE INDEX IF NOT EXISTS ix_story_gifts ON story_gifts (story_id)")
    except Exception:
        pass
    _СТОРИС_НАГРАДЫ = True


def _сторис_следы_прибрать(c):
    """Запись истекла — её следы больше никому не нужны."""
    try:
        # v=629 · Голоса под комментарием истории уходят вместе с историей.
        # Таблица новая, поэтому её может ещё не быть — отсюда отдельный try.
        c.execute("DELETE FROM story_comment_likes WHERE comment_id NOT IN "
                  "(SELECT id FROM story_comments)")
    except Exception:
        pass
    for таблица in ("story_likes", "story_comments", "story_gifts", "story_seen"):
        try:
            c.execute("DELETE FROM %s WHERE story_id NOT IN (SELECT id FROM stories)" % таблица)
        except Exception:
            pass


def story_like(story_id: int, user_id: int):
    """Сердце ставится и снимается одним и тем же нажатием."""
    conn = get_db(); c = conn.cursor()
    try:
        _сторис_готов(c); _сторис_награды(c)
        c.execute(_q("SELECT 1 FROM story_likes WHERE story_id=? AND user_id=?"),
                  (int(story_id), int(user_id)))
        было = bool(c.fetchone())
        if было:
            c.execute(_q("DELETE FROM story_likes WHERE story_id=? AND user_id=?"),
                      (int(story_id), int(user_id)))
        else:
            c.execute(_q("INSERT INTO story_likes (story_id,user_id) VALUES (?,?)"),
                      (int(story_id), int(user_id)))
        conn.commit()
        c.execute(_q("SELECT COUNT(*) AS n FROM story_likes WHERE story_id=?"), (int(story_id),))
        р = _fetchone(c.fetchone()) or {}
        conn.close()
        return {"liked": not было, "likes": int(р.get("n") or 0)}
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return {"liked": False, "likes": 0}


def _счёт1(c, запрос, парам):
    try:
        c.execute(_q(запрос), парам)
        р = _fetchone(c.fetchone()) or {}
        return int(р.get("n") or 0)
    except Exception:
        return 0


def story_stats(story_id: int, viewer_id: int):
    """Всё, что показывает полоса под историей, одним запросом к базе."""
    conn = get_db(); c = conn.cursor()
    try:
        _сторис_готов(c); _сторис_награды(c)
        итог = {
            "views":    _счёт1(c, "SELECT COUNT(*) AS n FROM story_seen WHERE story_id=?", (int(story_id),)),
            "likes":    _счёт1(c, "SELECT COUNT(*) AS n FROM story_likes WHERE story_id=?", (int(story_id),)),
            "comments": _счёт1(c, "SELECT COUNT(*) AS n FROM story_comments WHERE story_id=?", (int(story_id),)),
            "gifts":    _счёт1(c, "SELECT COUNT(*) AS n FROM story_gifts WHERE story_id=?", (int(story_id),)),
        }
        итог["liked"] = _счёт1(c, "SELECT COUNT(*) AS n FROM story_likes "
                                  "WHERE story_id=? AND user_id=?",
                               (int(story_id), int(viewer_id))) > 0
        try:
            c.execute(_q("SELECT COALESCE(SUM(cube),0) AS n FROM story_gifts WHERE story_id=?"),
                      (int(story_id),))
            р = _fetchone(c.fetchone()) or {}
            итог["cube"] = round(float(р.get("n") or 0), 2)
        except Exception:
            итог["cube"] = 0.0
        conn.close(); return итог
    except Exception:
        conn.close()
        return {"views": 0, "likes": 0, "comments": 0, "gifts": 0, "cube": 0.0, "liked": False}


def story_viewers(story_id: int, limit: int = 60):
    """Кто смотрел — показываем только автору записи."""
    conn = get_db(); c = conn.cursor()
    try:
        _сторис_готов(c); _сторис_награды(c)
        c.execute(_q(
            "SELECT v.user_id, v.at, u.display_name AS display_name, u.avatar_url AS avatar_url, "
            "       (SELECT COUNT(*) FROM story_likes l "
            "        WHERE l.story_id=v.story_id AND l.user_id=v.user_id) AS liked "
            "FROM story_seen v LEFT JOIN users u ON u.id=v.user_id "
            "WHERE v.story_id=? ORDER BY v.at DESC LIMIT ?"), (int(story_id), int(limit)))
        строки = _fetchall(c.fetchall())
        _применить_лица(conn, строки)
        conn.close(); return строки
    except Exception:
        conn.close(); return []


# ── v=629 · Разговор под историей живёт так же, как разговор под лентой ─────
#  Анна: «меню комментариев история = меню комментариев лента, точно такое
#  же». Под лентой у комментария есть ответы, палец вверх, палец вниз и
#  правка. Под историей не было ничего из этого — ни в окне, ни на сервере.
#  Окно без сервера было бы картинкой: кнопки нажимались бы вхолостую.
#  Поэтому ветка и голоса появляются здесь, у записи, а не только на экране.
#
#  Сторис живёт сутки, поэтому новых забот по уборке нет: следы разговора
#  убираются вместе с записью тем же дворником (_сторис_следы_прибрать),
#  куда дописана и новая таблица голосов.
_СТОРИС_РАЗГОВОР = False


def _сторис_разговор(c):
    """Ветка ответов и голоса под комментарием истории.

    Таблица story_comments уже стоит у людей с данными, поэтому колонку
    добавляем, а не пересоздаём: ALTER TABLE на существующей базе, и
    молча мимо, если колонка уже есть (второй запуск, другая версия).
    """
    global _СТОРИС_РАЗГОВОР
    if _СТОРИС_РАЗГОВОР:
        return
    pk  = "SERIAL PRIMARY KEY" if _PG else "INTEGER PRIMARY KEY AUTOINCREMENT"
    ts  = "TIMESTAMP" if _PG else "TEXT"
    now = "NOW()" if _PG else "CURRENT_TIMESTAMP"
    # Колонка уже на месте со второго запуска — это норма, не беда.
    # Через _добавить_колонку, а не голым ALTER: на PostgreSQL голый
    # неудачный ALTER обрывал бы всю сделку, и первый же разговор под
    # историей после перезапуска вернулся бы пустым.
    _добавить_колонку(c, "story_comments", "parent_id", "INTEGER NOT NULL DEFAULT 0")
    _добавить_колонку(c, "story_comments", "edited", "INTEGER NOT NULL DEFAULT 0")
    # v=630 · Срок жизни комментария («∞» в строке ответа, как под лентой).
    _добавить_колонку(c, "story_comments", "expire_at", ts)
    try:
        c.execute(f"""CREATE TABLE IF NOT EXISTS story_comment_likes (
            id {pk},
            story_id INTEGER NOT NULL DEFAULT 0,
            comment_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            kind TEXT NOT NULL DEFAULT 'like',
            at {ts} NOT NULL DEFAULT {now}
        )""")
        c.execute("CREATE INDEX IF NOT EXISTS ix_story_cmt_likes "
                  "ON story_comment_likes (comment_id,user_id)")
    except Exception:
        pass
    _СТОРИС_РАЗГОВОР = True


def story_comment_add(story_id: int, user_id: int, name: str, text: str,
                      parent_id: int = 0, expire_seconds: int = 0):
    conn = get_db(); c = conn.cursor()
    try:
        _сторис_готов(c); _сторис_награды(c); _сторис_разговор(c)
        # v=630 · «∞» в строке ответа: комментарий сам исчезает в срок.
        срок = None
        if expire_seconds:
            срок = _ts(datetime.utcnow() + timedelta(seconds=int(expire_seconds)))
        нов = _execute_returning(
            conn,
            _q("INSERT INTO story_comments "
               "(story_id,user_id,display_name,text,parent_id,expire_at) "
               "VALUES (?,?,?,?,?,?)"),
            (int(story_id), int(user_id), (name or "")[:80], (text or "")[:600],
             int(parent_id or 0), срок))
        conn.commit(); conn.close()
        return нов
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return None


def story_comments(story_id: int, limit: int = 100, me: int = 0):
    """Плоский список: и корни, и ответы. Ветку складывает тот, кто отдаёт.

    Голоса считаем одним запросом на всю историю, а не по комментарию:
    под записью их бывает сотня, и сотня запросов — это заметная задержка
    на телефоне.
    """
    conn = get_db(); c = conn.cursor()
    try:
        _сторис_готов(c); _сторис_награды(c); _сторис_разговор(c)
        # v=630 · Истёкшие по «∞» сначала убираем, потом читаем: иначе они
        # попали бы в список и в счёт, хотя их уже нет.
        try:
            c.execute(_q("DELETE FROM story_comments "
                         "WHERE story_id=? AND expire_at IS NOT NULL AND expire_at<=?"),
                      (int(story_id), _ts(datetime.utcnow())))
            # v=642 · Закрепляем сразу. Без этого истёкшие строки пропадали
            # только из ответа: чтение сделку не закрывает, и на закрытии
            # связи удаление откатывалось обратно. Список выходил верный, а
            # мусор копился в базе навсегда.
            conn.commit()
        except Exception:
            pass
        # v=642 · expire_at отдаём наверх: окно само снимет комментарий,
        # когда его срок выйдет, не дожидаясь следующего чтения.
        c.execute(_q(
            "SELECT k.id, k.user_id, k.display_name, k.text, k.created_at, "
            "       k.parent_id, k.edited, k.expire_at, u.avatar_url AS avatar_url "
            "FROM story_comments k LEFT JOIN users u ON u.id=k.user_id "
            "WHERE k.story_id=? ORDER BY k.id DESC LIMIT ?"), (int(story_id), int(limit)))
        строки = _fetchall(c.fetchall())
        _применить_лица(conn, строки)
        голоса = {}
        try:
            c.execute(_q(
                "SELECT g.comment_id AS cid, g.kind AS kind, g.user_id AS uid "
                "FROM story_comment_likes g "
                "WHERE g.comment_id IN (SELECT id FROM story_comments WHERE story_id=?)"),
                (int(story_id),))
            for г in _fetchall(c.fetchall()):
                я = голоса.setdefault(int(г.get("cid") or 0),
                                      {"likes": 0, "dislikes": 0, "user_like": ""})
                вид = str(г.get("kind") or "like")
                я["dislikes" if вид == "dislike" else "likes"] += 1
                if me and int(г.get("uid") or 0) == int(me):
                    я["user_like"] = вид
        except Exception:
            pass
        conn.close()
        for с in строки:
            г = голоса.get(int(с.get("id") or 0)) or {}
            с["likes"] = int(г.get("likes") or 0)
            с["dislikes"] = int(г.get("dislikes") or 0)
            с["user_like"] = г.get("user_like") or ""
            с["parent_id"] = int(с.get("parent_id") or 0)
        строки.reverse()
        return строки
    except Exception:
        conn.close(); return []


def story_comment_edit(comment_id: int, user_id: int, text: str):
    """Правит только свой комментарий — как под лентой."""
    conn = get_db(); c = conn.cursor()
    try:
        _сторис_готов(c); _сторис_награды(c); _сторис_разговор(c)
        c.execute(_q("UPDATE story_comments SET text=?, edited=1 WHERE id=? AND user_id=?"),
                  ((text or "")[:600], int(comment_id), int(user_id)))
        ушло = c.rowcount
        conn.commit(); conn.close()
        return ушло > 0
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return False


def story_comment_like(comment_id: int, user_id: int, kind: str = "like"):
    """Палец вверх и палец вниз: один голос на человека.

    Тот же палец второй раз — голос снят. Другой палец — голос сменился.
    Так же, как у комментария в ленте: человек не может стоять за и
    против одновременно.
    """
    вид = "dislike" if str(kind) == "dislike" else "like"
    conn = get_db(); c = conn.cursor()
    try:
        _сторис_готов(c); _сторис_награды(c); _сторис_разговор(c)
        c.execute(_q("SELECT id, kind FROM story_comment_likes "
                     "WHERE comment_id=? AND user_id=?"),
                  (int(comment_id), int(user_id)))
        было = _fetchone(c.fetchone()) or {}
        мой = ""
        if было:
            if str(было.get("kind") or "like") == вид:
                c.execute(_q("DELETE FROM story_comment_likes WHERE comment_id=? AND user_id=?"),
                          (int(comment_id), int(user_id)))
            else:
                c.execute(_q("UPDATE story_comment_likes SET kind=? "
                             "WHERE comment_id=? AND user_id=?"),
                          (вид, int(comment_id), int(user_id)))
                мой = вид
        else:
            c.execute(_q("INSERT INTO story_comment_likes (comment_id,user_id,kind) "
                         "VALUES (?,?,?)"), (int(comment_id), int(user_id), вид))
            мой = вид
        за = _счёт1(c, "SELECT COUNT(*) AS n FROM story_comment_likes "
                       "WHERE comment_id=? AND kind='like'", (int(comment_id),))
        против = _счёт1(c, "SELECT COUNT(*) AS n FROM story_comment_likes "
                           "WHERE comment_id=? AND kind='dislike'", (int(comment_id),))
        conn.commit(); conn.close()
        return {"likes": за, "dislikes": против, "user_like": мой}
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return {"likes": 0, "dislikes": 0, "user_like": ""}


def story_comment_del(comment_id: int, user_id: int, author_id: int = 0):
    """Своё убирает автор комментария, чужое — хозяин истории."""
    conn = get_db(); c = conn.cursor()
    try:
        _сторис_готов(c); _сторис_награды(c)
        if int(author_id):
            c.execute(_q("DELETE FROM story_comments WHERE id=? AND (user_id=? OR story_id IN "
                         "(SELECT id FROM stories WHERE user_id=?))"),
                      (int(comment_id), int(user_id), int(author_id)))
        else:
            c.execute(_q("DELETE FROM story_comments WHERE id=? AND user_id=?"),
                      (int(comment_id), int(user_id)))
        ушло = c.rowcount
        conn.commit(); conn.close()
        return ушло > 0
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return False


def story_gift_write(story_id: int, from_id: int, from_name: str,
                     to_id: int, gift: str, cube: float):
    conn = get_db(); c = conn.cursor()
    try:
        _сторис_готов(c); _сторис_награды(c)
        c.execute(_q("INSERT INTO story_gifts (story_id,from_id,from_name,to_id,gift,cube) "
                     "VALUES (?,?,?,?,?,?)"),
                  (int(story_id), int(from_id), (from_name or "")[:80],
                   int(to_id), (gift or "")[:40], float(cube or 0)))
        conn.commit(); conn.close(); return True
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return False


def story_gifts_of(story_id: int, limit: int = 50):
    conn = get_db(); c = conn.cursor()
    try:
        _сторис_готов(c); _сторис_награды(c)
        c.execute(_q("SELECT id, from_id, from_name, gift, cube, at FROM story_gifts "
                     "WHERE story_id=? ORDER BY id DESC LIMIT ?"), (int(story_id), int(limit)))
        строки = _fetchall(c.fetchall())
        conn.close(); return строки
    except Exception:
        conn.close(); return []


def story_cleanup_traces():
    """Зовётся вместе с уборкой протухших историй."""
    conn = get_db(); c = conn.cursor()
    try:
        _сторис_готов(c); _сторис_награды(c); _сторис_прибрать(c)
        _сторис_следы_прибрать(c)
        conn.commit(); conn.close(); return True
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return False


# ── Группы: снимки, теги и видимость участников ─────────────────────────────
_ГРУППЫ_ДОП = False


def _группы_доп(c):
    global _ГРУППЫ_ДОП
    if _ГРУППЫ_ДОП:
        return
    pk   = "SERIAL PRIMARY KEY" if _PG else "INTEGER PRIMARY KEY AUTOINCREMENT"
    blob = "BYTEA" if _PG else "BLOB"
    c.execute(f"""CREATE TABLE IF NOT EXISTS group_media (
        id {pk},
        group_id INTEGER NOT NULL,
        kind TEXT NOT NULL DEFAULT 'photo',
        mime TEXT DEFAULT 'image/jpeg',
        size INTEGER NOT NULL DEFAULT 0,
        ord INTEGER NOT NULL DEFAULT 0,
        data {blob}
    )""")
    # v=584 · Чем группа показывается: своим снимком или значком. Анна:
    # «либо фото, либо смайл — один тип на аву». Пустая строка значит
    # «как раньше»: есть снимок — он и лицо, нет — значок.
    # v=635 · Через _добавить_колонку: голый неудачный ALTER на PostgreSQL
    # обрывал всю сделку, и первое же обращение к настройкам группы после
    # перезапуска возвращалось пустым.
    for столбец, тип in (("tags", "TEXT DEFAULT ''"),
                         ("members_visible", "INTEGER NOT NULL DEFAULT 1"),
                         ("avatar_mode", "TEXT DEFAULT ''")):
        _добавить_колонку(c, "groups", столбец, тип)
    try:
        c.execute("CREATE INDEX IF NOT EXISTS ix_group_media ON group_media (group_id)")
    except Exception:
        pass
    _ГРУППЫ_ДОП = True


def group_extra_set(group_id: int, owner_id: int, tags=None, members_visible=None):
    conn = get_db(); c = conn.cursor()
    try:
        _группы_доп(c)
        c.execute(_q("SELECT owner_id FROM groups WHERE id=?"), (int(group_id),))
        р = c.fetchone()
        свой = (_fetchone(р) or {}).get("owner_id") if р else None
        if свой is None or int(свой) != int(owner_id):
            conn.close(); return False
        if tags is not None:
            c.execute(_q("UPDATE groups SET tags=? WHERE id=?"),
                      (str(tags)[:300], int(group_id)))
        if members_visible is not None:
            c.execute(_q("UPDATE groups SET members_visible=? WHERE id=?"),
                      (1 if members_visible else 0, int(group_id)))
        conn.commit(); conn.close(); return True
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return False


def group_extra_get(group_id: int):
    conn = get_db(); c = conn.cursor()
    try:
        _группы_доп(c)
        c.execute(_q("SELECT tags, members_visible, owner_id, avatar_mode "
                     "FROM groups WHERE id=?"),
                  (int(group_id),))
        р = c.fetchone()
        о = _fetchone(р) if р else None
        conn.close()
        if not о:
            return {"tags": "", "members_visible": 1, "owner_id": None, "avatar_mode": ""}
        return {"tags": о.get("tags") or "",
                "members_visible": 1 if (о.get("members_visible") in (1, True, "1")) else 0,
                "owner_id": о.get("owner_id"),
                "avatar_mode": о.get("avatar_mode") or ""}
    except Exception:
        conn.close(); return {"tags": "", "members_visible": 1, "owner_id": None, "avatar_mode": ""}


def group_avatar_mode(group_id: int, mode: str, owner_id: int = None):
    """v=584 · Чем показывается группа: 'icon' — значком, 'photo' — снимком.

    Хозяин выбрал значок — снимки остаются на месте, но лицом группы
    становится значок; добавил или назначил снимок — лицом снова снимок.
    Ничего не удаляем: человек передумает, и возвращать будет нечего.
    """
    if mode not in ("icon", "photo", ""):
        return False
    conn = get_db(); c = conn.cursor()
    try:
        _группы_доп(c)
        if owner_id is not None:
            c.execute(_q("SELECT owner_id FROM groups WHERE id=?"), (int(group_id),))
            р = c.fetchone()
            свой = (_fetchone(р) or {}).get("owner_id") if р else None
            if свой is None or int(свой) != int(owner_id):
                conn.close(); return False
        c.execute(_q("UPDATE groups SET avatar_mode=? WHERE id=?"), (mode, int(group_id)))
        conn.commit(); conn.close(); return True
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return False


def group_media_add(group_id: int, kind: str, mime: str, data: bytes):
    conn = get_db(); c = conn.cursor()
    try:
        _группы_доп(c)
        c.execute(_q("SELECT COUNT(*) AS n FROM group_media WHERE group_id=?"), (int(group_id),))
        n = (_fetchone(c.fetchone()) or {}).get("n") or 0
        if kind == "photo" and int(n) >= ГРУППА_МАКС_ФОТО:
            conn.close(); return None
        нов = _execute_returning(
            conn,
            _q("INSERT INTO group_media (group_id,kind,mime,size,ord,data) VALUES (?,?,?,?,?,?)"),
            (int(group_id), kind, mime, len(data or b""), int(n), _bin(data or b"")))
        conn.commit(); conn.close(); return нов
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return None


def group_media_list(group_id: int):
    conn = get_db(); c = conn.cursor()
    try:
        _группы_доп(c)
        c.execute(_q("SELECT id,kind,mime,size,ord FROM group_media "
                     "WHERE group_id=? ORDER BY ord, id"), (int(group_id),))
        строки = _fetchall(c.fetchall()); conn.close(); return строки
    except Exception:
        conn.close(); return []


def group_media_one(group_id: int, media_id: int):
    conn = get_db(); c = conn.cursor()
    try:
        _группы_доп(c)
        c.execute(_q("SELECT * FROM group_media WHERE id=? AND group_id=?"),
                  (int(media_id), int(group_id)))
        р = c.fetchone(); conn.close()
        return _fetchone(р) if р else None
    except Exception:
        conn.close(); return None


def group_media_first(group_id: int, media_id: int, owner_id: int):
    """v=583 · Сделать выбранный снимок первым — он и есть картинка группы.

    Картинку группы отдаёт /groups/{id}/avatar, а берёт её как первый
    снимок по порядку. Значит «сменить картинку» — это переставить
    порядок, а не заводить отдельное поле: снимки уже лежат на месте.
    """
    conn = get_db(); c = conn.cursor()
    try:
        _группы_доп(c)
        c.execute(_q("SELECT owner_id FROM groups WHERE id=?"), (int(group_id),))
        р = c.fetchone()
        свой = (_fetchone(р) or {}).get("owner_id") if р else None
        if свой is None or int(свой) != int(owner_id):
            conn.close(); return False
        c.execute(_q("SELECT id FROM group_media WHERE id=? AND group_id=?"),
                  (int(media_id), int(group_id)))
        if not c.fetchone():
            conn.close(); return False
        c.execute(_q("SELECT id FROM group_media WHERE group_id=? ORDER BY ord, id"),
                  (int(group_id),))
        порядок = [int(r["id"]) for r in _fetchall(c.fetchall())]
        порядок = [x for x in порядок if x != int(media_id)]
        порядок.insert(0, int(media_id))
        for место, номер in enumerate(порядок):
            c.execute(_q("UPDATE group_media SET ord=? WHERE id=? AND group_id=?"),
                      (место, int(номер), int(group_id)))
        conn.commit(); conn.close(); return True
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return False


def group_media_del(group_id: int, media_id: int, owner_id: int):
    conn = get_db(); c = conn.cursor()
    try:
        _группы_доп(c)
        c.execute(_q("SELECT owner_id FROM groups WHERE id=?"), (int(group_id),))
        р = c.fetchone()
        свой = (_fetchone(р) or {}).get("owner_id") if р else None
        if свой is None or int(свой) != int(owner_id):
            conn.close(); return False
        c.execute(_q("DELETE FROM group_media WHERE id=? AND group_id=?"),
                  (int(media_id), int(group_id)))
        conn.commit(); conn.close(); return True
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return False


# ══════════════════════════════════════════════════════════════════════════════
#  АДМИН-ПАНЕЛЬ: СВОДКА ПО ВСЕЙ ПЛОЩАДКЕ
#  Каждый счёт берётся отдельно и в своей попытке: таблицы появлялись в
#  разное время, и на старой базе часть из них может отсутствовать. Один
#  недостающий счёт не должен обнулять всю сводку.
# ══════════════════════════════════════════════════════════════════════════════

def _счёт(c, sql, пар=()):
    try:
        c.execute(_q(sql), пар)
        р = _fetchone(c.fetchone()) or {}
        for k in ("n", "N", "count", "COUNT(*)"):
            if k in р and р[k] is not None:
                return int(р[k])
        for v in р.values():
            if v is not None:
                try:
                    return int(v)
                except Exception:
                    return 0
        return 0
    except Exception:
        return 0


def _сумма(c, sql, пар=()):
    try:
        c.execute(_q(sql), пар)
        р = _fetchone(c.fetchone()) or {}
        for v in р.values():
            if v is not None:
                try:
                    return round(float(v), 2)
                except Exception:
                    return 0.0
        return 0.0
    except Exception:
        return 0.0


def admin_overview():
    """Всё, что площадка знает о себе: люди, кубы, записи, переписка, деньги."""
    conn = get_db(); c = conn.cursor()
    сутки = "NOW()-INTERVAL '24 hours'" if _PG else "datetime('now','-1 day')"
    неделя = "NOW()-INTERVAL '7 days'" if _PG else "datetime('now','-7 days')"
    пять = "NOW()-INTERVAL '5 minutes'" if _PG else "datetime('now','-5 minutes')"
    try:
        люди = {
            "всего": _счёт(c, "SELECT COUNT(*) AS n FROM users"),
            "живых": _счёт(c, "SELECT COUNT(*) AS n FROM users WHERE is_active=1"),
            "премиум": _счёт(c, "SELECT COUNT(*) AS n FROM users WHERE key_type='premium' AND is_active=1"),
            "онлайн": _счёт(c, "SELECT COUNT(*) AS n FROM users WHERE last_seen>" + пять),
            "за_сутки": _счёт(c, "SELECT COUNT(*) AS n FROM users WHERE created_at>" + сутки),
            "за_неделю": _счёт(c, "SELECT COUNT(*) AS n FROM users WHERE created_at>" + неделя),
        }
        кубы = {
            "всего": _счёт(c, "SELECT COUNT(*) AS n FROM cubes"),
            "живых": _счёт(c, "SELECT COUNT(*) AS n FROM cubes WHERE is_active=1"),
            "за_сутки": _счёт(c, "SELECT COUNT(*) AS n FROM cubes WHERE created_at>" + сутки),
        }
        записи = {
            "всего": _счёт(c, "SELECT COUNT(*) AS n FROM posts"),
            "коротких": _счёт(c, "SELECT COUNT(*) AS n FROM posts WHERE post_type='short'"),
            "постов": _счёт(c, "SELECT COUNT(*) AS n FROM posts WHERE post_type<>'short'"),
            "за_сутки": _счёт(c, "SELECT COUNT(*) AS n FROM posts WHERE created_at>" + сутки),
            "комментариев": _счёт(c, "SELECT COUNT(*) AS n FROM post_comments"),
            "сторис": _счёт(c, "SELECT COUNT(*) AS n FROM stories"),
        }
        переписка = {
            "личных": _счёт(c, "SELECT COUNT(*) AS n FROM direct_messages"),
            "личных_за_сутки": _счёт(c, "SELECT COUNT(*) AS n FROM direct_messages WHERE created_at>" + сутки),
            "групп": _счёт(c, "SELECT COUNT(*) AS n FROM groups"),
            "в_группах": _счёт(c, "SELECT COUNT(*) AS n FROM group_messages"),
            "участий": _счёт(c, "SELECT COUNT(*) AS n FROM group_members"),
        }
        рынок = {
            "товаров_шопинг": _счёт(c, "SELECT COUNT(*) AS n FROM shop_items"),
            "товаров_цифра": _счёт(c, "SELECT COUNT(*) AS n FROM market_items"),
            "продаж": _счёт(c, "SELECT COUNT(*) AS n FROM market_orders"),
            "продаж_за_сутки": _счёт(c, "SELECT COUNT(*) AS n FROM market_orders WHERE created_at>" + сутки),
            "сигналов": _счёт(c, "SELECT COUNT(*) AS n FROM signals"),
            "открытых_сигналов": _счёт(c, "SELECT COUNT(*) AS n FROM signals WHERE status='open'"),
            "эфиров": _счёт(c, "SELECT COUNT(*) AS n FROM streams"),
        }
        деньги = {
            "в_обороте": _сумма(c, "SELECT SUM(cube_balance) AS s FROM users"),
            "переводов": _счёт(c, "SELECT COUNT(*) AS n FROM cube_transactions"),
            "переводов_за_сутки": _счёт(c, "SELECT COUNT(*) AS n FROM cube_transactions WHERE created_at>" + сутки),
            "начислено_за_сутки": _сумма(c, "SELECT SUM(amount) AS s FROM cube_transactions WHERE amount>0 AND created_at>" + сутки),
        }
        надзор = {
            "дел": _счёт(c, "SELECT COUNT(*) AS n FROM moderation_queue"),
            "ждут": _счёт(c, "SELECT COUNT(*) AS n FROM moderation_queue WHERE status='pending'"),
            "жалоб": _счёт(c, "SELECT COUNT(*) AS n FROM post_reports"),
        }
        свежие = []
        try:
            c.execute(_q("SELECT id, display_name, key_type, created_at, last_seen, cube_balance "
                         "FROM users ORDER BY id DESC LIMIT 12"))
            свежие = _fetchall(c.fetchall())
        except Exception:
            свежие = []
        conn.close()
        return {"люди": люди, "кубы": кубы, "записи": записи, "переписка": переписка,
                "рынок": рынок, "деньги": деньги, "надзор": надзор,
                "новые_люди": [{"id": ч.get("id"),
                                "имя": ч.get("display_name") or "",
                                "ключ": ч.get("key_type") or "",
                                "создан": str(ч.get("created_at") or ""),
                                "виден": str(ч.get("last_seen") or ""),
                                "cube": ч.get("cube_balance")} for ч in свежие],
                "база": "postgres" if _PG else "sqlite"}
    except Exception as e:
        try:
            conn.close()
        except Exception:
            pass
        return {"ошибка": str(e)[:200]}


# ══ ПАПКИ И ФАЙЛЫ ЧЕЛОВЕКА ══════════════════════════════════════════════════
# v=592 · Папки раньше жили только в браузере: почистил данные сайта — и нет
# их. Теперь папка и всё, что в ней лежит, хранится на сервере, значит видно
# и с телефона, и после переустановки браузера.
#
# Текст файла держим прямо в базе: он маленький, а своего хранилища у нас
# нет. Чужой загруженный файл (снимок, PDF, Word) в базу не кладём — он уже
# лежит в хранилище, и мы запоминаем только ссылку на него.

ФАЙЛ_МАКС_ТЕКСТ  = 256 * 1024     # один текстовый файл
ФАЙЛОВ_НА_ЧЕЛОВЕКА = 300
ПАПОК_НА_ЧЕЛОВЕКА  = 50
ФАЙЛ_ВИДЫ = ("txt", "csv", "py", "md", "json", "html", "pdf",
             "doc", "docx", "xls", "xlsx", "svg", "slides",
             # v=598 · Подпись и печать: хранятся разборно, наружу уходят
             # снимком с прозрачным фоном.
             "sign", "stamp", "file")

_ПАПКИ_ГОТОВО = False


def _папки_готов(c):
    global _ПАПКИ_ГОТОВО
    if _ПАПКИ_ГОТОВО:
        return
    pk  = "SERIAL PRIMARY KEY" if _PG else "INTEGER PRIMARY KEY AUTOINCREMENT"
    ts  = "TIMESTAMP" if _PG else "TEXT"
    now = "NOW()" if _PG else "CURRENT_TIMESTAMP"
    c.execute(f"""CREATE TABLE IF NOT EXISTS user_folders (
        id {pk},
        user_id INTEGER NOT NULL,
        name TEXT NOT NULL DEFAULT '',
        chats TEXT NOT NULL DEFAULT '[]',
        created_at {ts} NOT NULL DEFAULT {now}
    )""")
    c.execute(f"""CREATE TABLE IF NOT EXISTS user_files (
        id {pk},
        user_id INTEGER NOT NULL,
        folder_id INTEGER NOT NULL DEFAULT 0,
        name TEXT NOT NULL DEFAULT '',
        kind TEXT NOT NULL DEFAULT 'txt',
        body TEXT NOT NULL DEFAULT '',
        url TEXT NOT NULL DEFAULT '',
        mime TEXT NOT NULL DEFAULT '',
        size INTEGER NOT NULL DEFAULT 0,
        created_at {ts} NOT NULL DEFAULT {now},
        updated_at {ts} NOT NULL DEFAULT {now}
    )""")
    try:
        c.execute("CREATE INDEX IF NOT EXISTS idx_uf_user ON user_files(user_id, folder_id)")
        c.execute("CREATE INDEX IF NOT EXISTS idx_ufold_user ON user_folders(user_id)")
    except Exception:
        pass
    _ПАПКИ_ГОТОВО = True


def _вид_файла(вид, имя=""):
    в = str(вид or "").lower().strip().lstrip(".")
    if в in ФАЙЛ_ВИДЫ:
        return в
    точка = str(имя or "").lower().rsplit(".", 1)
    if len(точка) == 2 and точка[1] in ФАЙЛ_ВИДЫ:
        return точка[1]
    return "file"


def _имя_файла(имя, вид):
    """Имя без косых и точек в начале: оно потом едет в заголовок и в чат."""
    и = str(имя or "").strip().replace("/", "-").replace("\\", "-")
    и = и.lstrip(".")[:80]
    if not и:
        и = "без имени"
    if вид and вид != "file" and not и.lower().endswith("." + вид):
        и = и + "." + вид
    return и[:90]


def папки_список(user_id):
    import json as _json
    conn = get_db(); c = conn.cursor()
    try:
        _папки_готов(c)
        c.execute(_q("SELECT id, name, chats, created_at FROM user_folders "
                     "WHERE user_id=? ORDER BY id"), (int(user_id),))
        папки = _fetchall(c.fetchall())
        c.execute(_q("SELECT folder_id, COUNT(*) AS n FROM user_files "
                     "WHERE user_id=? GROUP BY folder_id"), (int(user_id),))
        счёт = {}
        for р in _fetchall(c.fetchall()):
            счёт[int(р.get("folder_id") or 0)] = int(р.get("n") or 0)
        conn.close()
        out = []
        for п in папки:
            try:
                чаты = _json.loads(п.get("chats") or "[]")
                if not isinstance(чаты, list):
                    чаты = []
            except Exception:
                чаты = []
            out.append({"id": п.get("id"), "name": п.get("name") or "",
                        "chats": [str(x) for x in чаты][:500],
                        "files": счёт.get(int(п.get("id") or 0), 0),
                        "created_at": str(п.get("created_at") or "")})
        return out
    except Exception as сбой:
        # v=723 · Раньше здесь было «return []»: поломка выглядела как
        # «папок нет». Человек видел пустое окно и не мог понять, почему
        # новая папка не создаётся («уже 50»), когда список пуст.
        # Теперь поломка доходит наверх и называет себя.
        try:
            conn.close()
        except Exception:
            pass
        raise RuntimeError("список папок не прочитался: %s" % (сбой,))


def папка_создать(user_id, name):
    """Вернуть (номер, беда).

    беда = None             — папка создана;
           ('предел', N)    — у человека уже N папок, больше не держим;
           ('сбой', текст)  — не сработала работа с базой.

    v=723 · Прежде на ЛЮБОЙ сбой возвращалось пустое None, а main.py
    переводил его в «Больше 50 папок не держим». Текст врал: список папок
    у Анны был пуст, а отказ говорил про предел. Разделяем эти два случая
    и настоящую ошибку называем вслух."""
    conn = get_db(); c = conn.cursor()
    try:
        _папки_готов(c)
        c.execute(_q("SELECT COUNT(*) AS n FROM user_folders WHERE user_id=?"), (int(user_id),))
        сколько = int(_scalar(c.fetchone(), 0) or 0)
        if сколько >= ПАПОК_НА_ЧЕЛОВЕКА:
            conn.close(); return None, ('предел', сколько)
        имя = str(name or "").strip()[:60] or "Папка"
        нов = _execute_returning(
            conn, _q("INSERT INTO user_folders (user_id,name,chats) VALUES (?,?,'[]')"),
            (int(user_id), имя))
        conn.commit(); conn.close()
        if not нов:
            return None, ('сбой', 'база не вернула номер новой папки')
        return нов, None
    except Exception as сбой:
        try:
            if _PG: conn.rollback()
        except Exception:
            pass
        try:
            conn.close()
        except Exception:
            pass
        try:
            print("[папки] папка_создать упала:", repr(сбой), flush=True)
        except Exception:
            pass
        return None, ('сбой', str(сбой)[:200])


def папка_поправить(user_id, folder_id, name=None, chats=None):
    import json as _json
    conn = get_db(); c = conn.cursor()
    try:
        _папки_готов(c)
        c.execute(_q("SELECT id FROM user_folders WHERE id=? AND user_id=?"),
                  (int(folder_id), int(user_id)))
        if not c.fetchone():
            conn.close(); return False
        if name is not None:
            c.execute(_q("UPDATE user_folders SET name=? WHERE id=? AND user_id=?"),
                      (str(name).strip()[:60] or "Папка", int(folder_id), int(user_id)))
        if chats is not None:
            список = [str(x)[:40] for x in (chats or [])][:500]
            c.execute(_q("UPDATE user_folders SET chats=? WHERE id=? AND user_id=?"),
                      (_json.dumps(список, ensure_ascii=False), int(folder_id), int(user_id)))
        conn.commit(); conn.close()
        return True
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return False


def папка_удалить(user_id, folder_id):
    """Папку убираем вместе с тем, что в ней лежало."""
    conn = get_db(); c = conn.cursor()
    try:
        _папки_готов(c)
        c.execute(_q("DELETE FROM user_files WHERE user_id=? AND folder_id=?"),
                  (int(user_id), int(folder_id)))
        c.execute(_q("DELETE FROM user_folders WHERE id=? AND user_id=?"),
                  (int(folder_id), int(user_id)))
        тронуто = c.rowcount
        conn.commit(); conn.close()
        return bool(тронуто)
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return False


def файлы_списком(user_id, folder_id):
    """Перечень без тела: тело тянем только когда файл открывают."""
    conn = get_db(); c = conn.cursor()
    try:
        _папки_готов(c)
        c.execute(_q("SELECT id, folder_id, name, kind, url, mime, size, "
                     "created_at, updated_at FROM user_files "
                     "WHERE user_id=? AND folder_id=? ORDER BY id DESC"),
                  (int(user_id), int(folder_id)))
        из = _fetchall(c.fetchall()); conn.close()
        return [{"id": ф.get("id"), "folder_id": ф.get("folder_id"),
                 "name": ф.get("name") or "", "kind": ф.get("kind") or "txt",
                 "url": ф.get("url") or "", "mime": ф.get("mime") or "",
                 "size": int(ф.get("size") or 0),
                 "created_at": str(ф.get("created_at") or ""),
                 "updated_at": str(ф.get("updated_at") or "")} for ф in из]
    except Exception:
        try:
            conn.close()
        except Exception:
            pass
        return []


def файл_один(user_id, file_id):
    conn = get_db(); c = conn.cursor()
    try:
        _папки_готов(c)
        c.execute(_q("SELECT id, folder_id, name, kind, body, url, mime, size, "
                     "created_at, updated_at FROM user_files WHERE id=? AND user_id=?"),
                  (int(file_id), int(user_id)))
        строки = _fetchall(c.fetchall()); conn.close()
        if not строки:
            return None
        ф = строки[0]
        return {"id": ф.get("id"), "folder_id": ф.get("folder_id"),
                "name": ф.get("name") or "", "kind": ф.get("kind") or "txt",
                "body": ф.get("body") or "", "url": ф.get("url") or "",
                "mime": ф.get("mime") or "", "size": int(ф.get("size") or 0),
                "created_at": str(ф.get("created_at") or ""),
                "updated_at": str(ф.get("updated_at") or "")}
    except Exception:
        try:
            conn.close()
        except Exception:
            pass
        return None


def файл_создать(user_id, folder_id, name, kind, body="", url="", mime="", size=0):
    conn = get_db(); c = conn.cursor()
    try:
        _папки_готов(c)
        c.execute(_q("SELECT id FROM user_folders WHERE id=? AND user_id=?"),
                  (int(folder_id), int(user_id)))
        if not c.fetchone():
            conn.close(); return None
        c.execute(_q("SELECT COUNT(*) AS n FROM user_files WHERE user_id=?"), (int(user_id),))
        if int(_scalar(c.fetchone(), 0) or 0) >= ФАЙЛОВ_НА_ЧЕЛОВЕКА:
            conn.close(); return None
        вид = _вид_файла(kind, name)
        текст = str(body or "")[:ФАЙЛ_МАКС_ТЕКСТ]
        нов = _execute_returning(
            conn,
            _q("INSERT INTO user_files (user_id,folder_id,name,kind,body,url,mime,size) "
               "VALUES (?,?,?,?,?,?,?,?)"),
            (int(user_id), int(folder_id), _имя_файла(name, вид), вид, текст,
             str(url or "")[:500], str(mime or "")[:120],
             int(size or len(текст.encode("utf-8")))))
        conn.commit(); conn.close()
        return нов
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return None


def файл_сохранить(user_id, file_id, name=None, body=None, folder_id=None):
    conn = get_db(); c = conn.cursor()
    try:
        _папки_готов(c)
        c.execute(_q("SELECT kind FROM user_files WHERE id=? AND user_id=?"),
                  (int(file_id), int(user_id)))
        строка = c.fetchone()
        if not строка:
            conn.close(); return False
        вид = _scalar(строка, 0) or "txt"
        сейчас = "NOW()" if _PG else "CURRENT_TIMESTAMP"
        if name is not None:
            c.execute(_q(f"UPDATE user_files SET name=?, updated_at={сейчас} "
                         "WHERE id=? AND user_id=?"),
                      (_имя_файла(name, вид), int(file_id), int(user_id)))
        if body is not None:
            текст = str(body)[:ФАЙЛ_МАКС_ТЕКСТ]
            c.execute(_q(f"UPDATE user_files SET body=?, size=?, updated_at={сейчас} "
                         "WHERE id=? AND user_id=?"),
                      (текст, len(текст.encode("utf-8")), int(file_id), int(user_id)))
        if folder_id is not None:
            c.execute(_q("SELECT id FROM user_folders WHERE id=? AND user_id=?"),
                      (int(folder_id), int(user_id)))
            if c.fetchone():
                c.execute(_q(f"UPDATE user_files SET folder_id=?, updated_at={сейчас} "
                             "WHERE id=? AND user_id=?"),
                          (int(folder_id), int(file_id), int(user_id)))
        conn.commit(); conn.close()
        return True
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return False


def файл_удалить(user_id, file_id):
    conn = get_db(); c = conn.cursor()
    try:
        _папки_готов(c)
        c.execute(_q("DELETE FROM user_files WHERE id=? AND user_id=?"),
                  (int(file_id), int(user_id)))
        тронуто = c.rowcount
        conn.commit(); conn.close()
        return bool(тронуто)
    except Exception:
        if _PG: conn.rollback()
        conn.close(); return False
