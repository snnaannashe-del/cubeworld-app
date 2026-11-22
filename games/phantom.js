/* ═══════════════════════════════════════════════════════════════════════
   PHANTOM ESCAPE — ПОБЕГ ИЗ ЛАБИРИНТА.

   Собери пять ключей и уйди в дверь, пока призраки не догнали.
   Лабиринт прокладывается в глубину — значит, всегда проходим.
   Призраки идут кратчайшим путём: расстояния считаются разливом в
   ширину от того места, где ты стоишь.

       cubeworld-app/games/phantom.js

   Игра не рисует себе окна и не знает, где она идёт: окно, счёт,
   рекорд, кнопки и конец партии — всё это даёт общая оболочка
   shared/игры.js и передаёт сюда одним свёртком «И».
   ═══════════════════════════════════════════════════════════════════════ */
CW.игра_('phantom', function (И) {
  'use strict';

  var ИГРА = {
    к:'phantom', имя:'Phantom Escape', знак:'👻', сторона:1,
    кнопки:[{крест:true}],
    начать:function(){
      this.N = 15; this.уровень = 1; this.собрать();
    },
    собрать:function(){
      var N = this.N;
      /* Лабиринт прокладываем в глубину — так он всегда проходим. */
      var ст = new Uint8Array(N * N); ст.fill(1);
      var стек = [[1, 1]]; ст[1 * N + 1] = 0;
      while(стек.length){
        var т = стек[стек.length - 1], x = т[0], y = т[1];
        var ходы = [];
        [[2,0],[-2,0],[0,2],[0,-2]].forEach(function(д){
          var nx = x + д[0], ny = y + д[1];
          if(nx > 0 && ny > 0 && nx < N - 1 && ny < N - 1 && ст[ny * N + nx]) ходы.push([nx, ny, д]);
        });
        if(!ходы.length){ стек.pop(); continue; }
        var в = ходы[Math.floor(Math.random() * ходы.length)];
        ст[(y + в[2][1] / 2) * N + (x + в[2][0] / 2)] = 0;
        ст[в[1] * N + в[0]] = 0;
        стек.push([в[0], в[1]]);
      }
      this.ст = ст;
      this.я = {x:1, y:1};
      this.дверь = {x:N - 2, y:N - 2}; ст[(N - 2) * N + (N - 2)] = 0;
      this.ключи = [];
      while(this.ключи.length < 5){
        var kx = 1 + Math.floor(Math.random() * (N - 2)), ky = 1 + Math.floor(Math.random() * (N - 2));
        if(ст[ky * N + kx]) continue;
        if(kx < 3 && ky < 3) continue;
        this.ключи.push({x:kx, y:ky});
      }
      this.взято = 0;
      this.духи = [];
      var сколько = Math.min(4, 1 + this.уровень);
      for(var i = 0; i < сколько; i++){
        var dx = N - 2 - (i % 2) * 2, dy = 1 + ((i / 2) | 0) * 2;
        if(ст[dy * N + dx]) { dx = N - 2; dy = 1; ст[dy * N + dx] = 0; }
        this.духи.push({x:dx, y:dy, т:0});
      }
      this.часы = 0;
    },
    свободно:function(x, y){
      return x >= 0 && y >= 0 && x < this.N && y < this.N && !this.ст[y * this.N + x];
    },
    жать:function(к){
      if(!И.жива()) return;
      var д = {лево:[-1,0], право:[1,0], вверх:[0,-1], вниз:[0,1]}[к];
      if(!д) return;
      var nx = this.я.x + д[0], ny = this.я.y + д[1];
      if(!this.свободно(nx, ny)) return;
      this.я.x = nx; this.я.y = ny;
      for(var i = this.ключи.length - 1; i >= 0; i--){
        if(this.ключи[i].x === nx && this.ключи[i].y === ny){
          this.ключи.splice(i, 1); this.взято++; И.прибавить(50);
        }
      }
      if(!this.ключи.length && nx === this.дверь.x && ny === this.дверь.y){
        И.прибавить(200); this.уровень++; this.собрать();
      }
    },
    волна:function(цx, цy){
      /* Расстояния от цели по всему лабиринту — обычный разлив в ширину. */
      var N = this.N, д = new Int16Array(N * N); д.fill(-1);
      var оч = [цy * N + цx]; д[цy * N + цx] = 0;
      for(var г = 0; г < оч.length; г++){
        var i = оч[г], x = i % N, y = (i / N) | 0;
        var с = [[1,0],[-1,0],[0,1],[0,-1]];
        for(var k = 0; k < 4; k++){
          var nx = x + с[k][0], ny = y + с[k][1];
          if(!this.свободно(nx, ny)) continue;
          var j = ny * N + nx;
          if(д[j] >= 0) continue;
          д[j] = д[i] + 1; оч.push(j);
        }
      }
      return д;
    },
    шаг:function(дт){
      this.часы += дт;
      var срок = Math.max(0.22, 0.46 - this.уровень * 0.04);
      var д = null;
      for(var i = 0; i < this.духи.length; i++){
        var п = this.духи[i];
        п.т += дт;
        if(п.т < срок) continue;
        п.т = 0;
        if(!д) д = this.волна(this.я.x, this.я.y);
        var лучше = null, мин = 1e9;
        var с = [[1,0],[-1,0],[0,1],[0,-1]];
        for(var k = 0; k < 4; k++){
          var nx = п.x + с[k][0], ny = п.y + с[k][1];
          if(!this.свободно(nx, ny)) continue;
          var р = д[ny * this.N + nx];
          if(р >= 0 && р < мин){ мин = р; лучше = [nx, ny]; }
        }
        if(лучше){ п.x = лучше[0]; п.y = лучше[1]; }
        if(п.x === this.я.x && п.y === this.я.y)
          И.конец('Призрак догнал', И.шаб('Пройдено этажей: {1}.', this.уровень - 1));
      }
    },
    рисовать:function(к, Ш, В){
      к.clearRect(0, 0, Ш, В);
      var N = this.N, ш = Ш / N;
      for(var y = 0; y < N; y++) for(var x = 0; x < N; x++){
        if(this.ст[y * N + x]) И.прям(к, x * ш, y * ш, ш, ш, 'rgba(99,102,241,.22)', 3);
      }
      var д = this.дверь;
      И.прям(к, д.x * ш + ш * .15, д.y * ш + ш * .15, ш * .7, ш * .7,
           this.ключи.length ? 'rgba(255,255,255,.14)' : 'rgba(74,222,128,.75)', 4);
      this.ключи.forEach(function(п){
        И.текст(к, '🔑', п.x * ш + ш / 2, п.y * ш + ш / 2, ш * 0.72, '#fff');
      });
      this.духи.forEach(function(п){
        И.текст(к, '👻', п.x * ш + ш / 2, п.y * ш + ш / 2, ш * 0.8, '#fff');
      });
      И.прям(к, this.я.x * ш + ш * .18, this.я.y * ш + ш * .18, ш * .64, ш * .64, '#22d3ee', 4);
      И.состояние('🔑 ' + this.взято + '/' + (this.взято + this.ключи.length)
                + ' · ' + И.шаб('этаж {1}', this.уровень));
    }
  };

  return ИГРА;
});
