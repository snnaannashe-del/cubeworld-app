/* ═══════════════════════════════════════════════════════════════════════
   CIPHERBREAK — ВЗЛОМ ШИФРА.

   Четыре знака из шести. После каждой попытки видно, сколько знаков на
   своём месте (полный кружок) и сколько просто есть в коде (пустой).
   Восемь попыток.

       cubeworld-app/games/cipher.js

   Игра не рисует себе окна и не знает, где она идёт: окно, счёт,
   рекорд, кнопки и конец партии — всё это даёт общая оболочка
   shared/игры.js и передаёт сюда одним свёртком «И».
   ═══════════════════════════════════════════════════════════════════════ */
CW.игра_('cipher', function (И) {
  'use strict';

  var ЗНАКИ = ['▲', '●', '■', '◆', '★', '✚'];
  var ЦВЕТА = ['#60a5fa', '#4ade80', '#fbbf24', '#fb7185', '#a78bfa', '#22d3ee'];
  var ИГРА = {
    к:'cipher', имя:'CipherBreak', знак:'🔓', тянется:true,
    начать:function(){
      this.код = []; for(var i = 0; i < 4; i++) this.код.push(Math.floor(Math.random() * 6));
      this.набор = []; this.ходы = []; this.взломан = false;
      И.кнопки(ЗНАКИ.map(function(з, i){
        return {имя:з, мал:true, как:function(){ ИГРА.добавить(i); }};
      }).concat([
        {имя:'⌫', мал:true, как:function(){ ИГРА.набор.pop(); }},
        {имя:'Проверить', гл:true, как:function(){ ИГРА.проверить(); }}
      ]));
    },
    добавить:function(i){ if(this.набор.length < 4) this.набор.push(i); },
    проверить:function(){
      if(!И.жива() || this.набор.length < 4) return;
      var точно = 0, почти = 0;
      var к = this.код.slice(), н = this.набор.slice();
      for(var i = 3; i >= 0; i--) if(н[i] === к[i]){ точно++; к.splice(i, 1); н.splice(i, 1); }
      н.forEach(function(з){
        var j = к.indexOf(з);
        if(j >= 0){ почти++; к.splice(j, 1); }
      });
      this.ходы.push({н:this.набор.slice(), т:точно, п:почти});
      this.набор = [];
      if(точно === 4){
        И.прибавить(Math.max(100, 900 - this.ходы.length * 100));
        this.взломан = true;
        И.конец('Шифр взломан', И.шаб('Хватило {1} попыток.', this.ходы.length));
      }else if(this.ходы.length >= 8){
        И.конец('Код устоял', И.шаб('Было: {1}', this.код.map(function(i){ return ЗНАКИ[i]; }).join(' ')));
      }else И.прибавить(10);
    },
    рисовать:function(к, Ш, В){
      к.clearRect(0, 0, Ш, В);
      /* На широком экране раскладку держим колонкой посередине, иначе
         кружки разъезжаются по краям и читать попытки неудобно. */
      var КШ = Math.min(Ш, В * 0.78);
      var К0 = (Ш - КШ) / 2;
      var стр = В / 10, р = Math.min(стр * 0.34, КШ * 0.07);
      for(var i = 0; i < 8; i++){
        var y = strY(i);
        var х = this.ходы[i];
        for(var j = 0; j < 4; j++){
          var x = К0 + КШ * (0.16 + j * 0.16);
          if(х){
            к.beginPath(); к.arc(x, y, р, 0, 6.3);
            к.fillStyle = ЦВЕТА[х.н[j]]; к.fill();
            И.текст(к, ЗНАКИ[х.н[j]], x, y, р * 1.15, '#0a0a14', true);
          }else{
            к.beginPath(); к.arc(x, y, р, 0, 6.3);
            к.strokeStyle = 'rgba(255,255,255,.1)'; к.lineWidth = 1.5; к.stroke();
          }
        }
        if(х){
          for(var m = 0; m < 4; m++){
            var mx = К0 + КШ * 0.78 + (m % 2) * р * 0.95,
                my = y - р * 0.5 + ((m / 2) | 0) * р * 0.95;
            к.beginPath(); к.arc(mx, my, р * 0.33, 0, 6.3);
            if(m < х.т){ к.fillStyle = '#4ade80'; к.fill(); }
            else if(m < х.т + х.п){ к.strokeStyle = '#fbbf24'; к.lineWidth = 2; к.stroke(); }
            else { к.strokeStyle = 'rgba(255,255,255,.12)'; к.lineWidth = 1; к.stroke(); }
          }
        }
      }
      function strY(i){ return стр * (1.1 + i); }
      /* Набор, который сейчас собирают. */
      var y0 = стр * 9.5;
      for(var n = 0; n < 4; n++){
        var x = К0 + КШ * (0.16 + n * 0.16);
        к.beginPath(); к.arc(x, y0, р, 0, 6.3);
        if(this.набор[n] != null){
          к.fillStyle = ЦВЕТА[this.набор[n]]; к.fill();
          И.текст(к, ЗНАКИ[this.набор[n]], x, y0, р * 1.15, '#0a0a14', true);
        }else{
          к.strokeStyle = 'rgba(255,255,255,.35)'; к.lineWidth = 2;
          к.setLineDash([4, 4]); к.stroke(); к.setLineDash([]);
        }
      }
    }
  };

  return ИГРА;
});
