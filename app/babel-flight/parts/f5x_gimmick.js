/* 試作ギミック（テスト用）: 客室マップに足す演出を、試作ルームでオン・オフしながら見比べるためのもの。
   BF_SIM が false（本番 babelflight.com）のときは何も出ず、地図の動きも変わらない。 */
var BF_SIM=(typeof BF_SIM_FORCE!=='undefined'&&!!BF_SIM_FORCE)||/^babel-flight-sim/.test(location.hostname);
var GIMMICK_DEF=[
  {k:'cloud',c:'window',t:'雲が地図の後ろをゆっくり流れる（夕方の空の感じ）'},
  {k:'instr',c:'window',t:'窓の下に高度・速度の表示（飾り）'},
  {k:'flip',c:'lounge',t:'次の都市名がパタパタ切り替わる'},
  {k:'ticket',c:'lounge',t:'地図の下に搭乗券のちぎり線'},
  {k:'compass',c:'suite',t:'方位磁石（コンパスローズ）'},
  {k:'dist',c:'suite',t:'次の都市までの残り距離'},
  {k:'night',c:'suite',t:'昼と夜の境目（ゆっくり動く飾り）'},
  {k:'intro',c:'all',t:'地図が開くとき、飛行機が下から上がってくる'},
  {k:'nightwin',c:'window',t:'夜の窓（夜空に星がまたたく）'},
  {k:'boarding',c:'lounge',t:'搭乗の進み具合（今日の目標まで）のバー'},
  {k:'ticketfx',c:'lounge',t:'レッスンを始めると、搭乗券が出てくる'},
  {k:'lounge_in',c:'suite',t:'スイートを開くと、金の光が広がる'},
  {k:'champagne',c:'suite',t:'レッスンを終えると、金の泡（シャンパン）が上がる'},
  {k:'arrive',c:'all',t:'レッスンを終えると、着陸の揺れ'},
  {k:'bigmap',c:'all',t:'【大胆】地図を大きくする（画面の約6割）'},
  {k:'pagemap',c:'all',t:'【大胆】地図を画面いっぱいに広げ、スクロールすると薄くなる'},
  {k:'trail',c:'all',t:'飛んだ軌跡が金色に光る'},
  {k:'daytime',c:'all',t:'地図の色が、いまの時間（朝・昼・夕・夜）で変わる'},
  {k:'citytap',c:'all',t:'都市をタップすると、時差と今の時間を先に出す'},
  {k:'pan',c:'all',t:'地図を左右になぞって動かせる（指を離すと戻る）'},
  {k:'bigdot',c:'all',t:'空港の点を大きくして、押しやすくする'},
  {k:'hoverpv',c:'all',t:'PCでは、空港にマウスを乗せるとレッスンの内容をプレビュー'}
];
var GIMMICK=(function(){try{var raw=localStorage.getItem('bf.gimmick');if(raw===null){var all={};GIMMICK_DEF.forEach(function(d){all[d.k]=true;});return all;}return JSON.parse(raw)||{};}catch(e){return {};}})();
var GMK={flip:'',flipT:0};
/* 保存されていない項目は「オン」（チェックを外したものだけ false になる） */
function gimmickOn(k){return !!(BF_SIM&&GIMMICK[k]!==false);}
function gimmickSave(){try{localStorage.setItem('bf.gimmick',JSON.stringify(GIMMICK));}catch(e){}}
function gimmickCab(){return rootEl.getAttribute('data-cabin')||'';}
function gimmickApplyRoot(){if(rootEl)rootEl.classList.toggle('gm-night',!!(BF_SIM&&GIMMICK.nightwin));document.body.classList.toggle('gm-pagemap',!!(BF_SIM&&GIMMICK.pagemap));document.body.classList.toggle('gm-maptouch',!!(gimmickOn('pan')||gimmickOn('citytap')));gimmickFade();}
/* 試作「ページ全体の地図」: スクロールするほど地図が薄くなる */
function gimmickFade(){var h=document.querySelector('.hero');if(!h)return;if(!gimmickOn('pagemap')){h.style.opacity='';return;}/* 地図はしばらく最後まで見えたまま。画面の4分の3ほどスクロールしてから、だんだん薄くなる（左右になぞるときの邪魔を減らす） */
var t=clamp((window.scrollY-innerHeight*0.75)/(innerHeight*0.8),0,1);h.style.opacity=(1-t*0.8).toFixed(3);}
window.addEventListener('scroll',function(){if(BF_SIM)gimmickFade();},{passive:true});
/* 地図の一番下（描画の土台）: 雲・夜の陰 */
function gimmickSky(g,cw,ch,now){
  var cab=gimmickCab();
  if(gimmickOn('cloud')&&cab==='window'){
    g.save();g.fillStyle='rgba(255,255,255,.14)';
    for(var i=0;i<4;i++){
      var sp=7+i*3,x=((now/1000*sp+i*cw*0.37)%(cw+160))-80,y=ch*(0.22+0.17*((i*37)%5)/4),r=18+i*5;
      g.beginPath();g.ellipse(x,y,r*1.9,r*0.55,0,0,6.283);g.fill();
    }
    g.restore();
  }
  if(gimmickOn('nightwin')&&cab==='window'){
    g.save();
    for(var j=0;j<28;j++){var sx=((j*97)%101)/101*cw,sy=((j*53)%89)/89*ch*0.72,tw=0.3+0.4*Math.abs(Math.sin(now/600+j));g.fillStyle='rgba(255,255,255,'+tw.toFixed(2)+')';g.fillRect(sx,sy,1.6,1.6);}
    g.restore();
  }
  if(gimmickOn('night')&&cab==='suite'){
    var px=((now/60000)%1)*cw*1.6-cw*0.3;
    var gr=g.createLinearGradient(px-cw*0.5,0,px+cw*0.5,0);
    gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(0,0,0,.5)');
    g.fillStyle=gr;g.fillRect(0,0,cw,ch);
  }
}
/* 飛行機の上・地図の前面: 表示・ちぎり線・方位磁石・残り距離・パタパタ */
function gimmickFront(g,cw,ch,now,M){
  var cab=gimmickCab();
  if(gimmickOn('instr')&&cab==='window'){
    var alt=35000+Math.round(Math.sin(now/4000)*120),spd=478+Math.round(Math.sin(now/3100)*4);
    g.save();g.font='700 10px "B612 Mono",monospace';g.textAlign='right';g.fillStyle='rgba(255,255,255,.8)';
    g.fillText('ALT '+alt.toLocaleString('en-US')+' ft',cw-12,ch*0.5);
    g.fillText('GS  '+spd+' kt',cw-12,ch*0.5+14);
    g.restore();
  }
  if(gimmickOn('flip')&&cab==='lounge'&&M.next>=0){
    var nm=cityFor(M.L,M.next)[0];
    if(nm!==GMK.flip){GMK.flip=nm;GMK.flipT=now;}
    var ft=clamp((now-GMK.flipT)/420,0,1),sy=Math.sin(ft*Math.PI/2),bw=Math.min(cw-24,170),bh=30,bx=cw-12-bw,by=ch-62;
    g.save();g.fillStyle='rgba(6,10,20,.85)';g.fillRect(bx,by,bw,bh);
    g.strokeStyle='rgba(212,175,55,.6)';g.lineWidth=1;g.strokeRect(bx+.5,by+.5,bw-1,bh-1);
    g.translate(bx+bw/2,by+bh/2);g.scale(1,Math.max(.06,sy));
    g.fillStyle='#e7c35a';g.font='700 13px "B612 Mono",monospace';g.textAlign='center';g.textBaseline='middle';
    g.fillText(nm,0,0);g.restore();
  }
  if(gimmickOn('boarding')&&cab==='lounge'){
    var bp=Math.min(1,todayCount()/Math.max(1,save.goal||1)),bwid=cw*0.45;
    g.save();g.font='700 9px "B612 Mono",monospace';g.textAlign='left';g.fillStyle='rgba(212,175,55,.9)';
    g.fillText('BOARDING '+Math.round(bp*100)+'%',14,ch-40);
    g.fillStyle='rgba(255,255,255,.15)';g.fillRect(14,ch-34,bwid,5);
    g.fillStyle='#e7c35a';g.fillRect(14,ch-34,bwid*bp,5);g.restore();
  }
  if(gimmickOn('lounge_in')&&cab==='suite'&&M.t0){
    var lt=clamp((now-M.t0)/1300,0,1);
    if(lt<1){g.save();var lg=g.createRadialGradient(cw/2,ch*0.45,0,cw/2,ch*0.45,ch*(0.2+0.9*lt));
      lg.addColorStop(0,'rgba(255,207,38,'+(0.5*(1-lt)).toFixed(3)+')');lg.addColorStop(1,'rgba(255,207,38,0)');
      g.fillStyle=lg;g.fillRect(0,0,cw,ch);g.restore();}
  }
  if(gimmickOn('ticket')&&cab==='lounge'){
    var ty=ch-12;
    g.save();g.setLineDash([4,4]);g.strokeStyle='rgba(212,175,55,.5)';g.lineWidth=1;
    g.beginPath();g.moveTo(16,ty);g.lineTo(cw-16,ty);g.stroke();
    g.setLineDash([]);g.globalCompositeOperation='destination-out';
    g.beginPath();g.arc(0,ty,9,0,6.283);g.arc(cw,ty,9,0,6.283);g.fill();
    g.restore();
  }
  if(gimmickOn('compass')&&cab==='suite'){
    var cx=cw-34,cy=44,r=22,a=Math.sin(now/2600)*0.12;
    g.save();g.translate(cx,cy);g.rotate(a);g.strokeStyle='rgba(255,255,255,.4)';g.lineWidth=1;
    g.beginPath();g.arc(0,0,r,0,6.283);g.stroke();
    for(var t=0;t<12;t++){var an=t*Math.PI/6,l=t%3===0?7:3.5;
      g.beginPath();g.moveTo(Math.cos(an)*(r-l),Math.sin(an)*(r-l));g.lineTo(Math.cos(an)*r,Math.sin(an)*r);g.stroke();}
    g.fillStyle='#ffcf26';g.font='700 9px "B612 Mono",monospace';g.textAlign='center';g.textBaseline='middle';
    g.fillText('N',0,-r-8);g.restore();
  }
  if(gimmickOn('dist')&&cab==='suite'&&M.next>=0){
    var cp=curPos(M.L),from=cp>=0?cityFor(M.L,cp):TOKYO,km=Math.round(haversine(from,cityFor(M.L,M.next)));
    g.save();g.font='700 11px "B612 Mono",monospace';g.textAlign='right';g.fillStyle='rgba(255,207,38,.9)';
    g.fillText('NEXT '+km.toLocaleString('en-US')+' km',cw-14,92);g.restore();
  }
}
/* 地図が開くとき、飛行機が下から上がってくる（1.4秒） */
function gimmickIntro(now,M,ch){
  if(!gimmickOn('intro')||!M.t0)return 0;
  var t=clamp((now-M.t0)/1400,0,1),e=1-Math.pow(1-t,3);
  return (1-e)*ch*0.45;
}
/* 試作ボタンと一覧（試作ルームだけ） */
function gimmickPanel(){
  if(!BF_SIM||document.getElementById('gmBtn'))return;
  var b=document.createElement('button');b.id='gmBtn';b.type='button';b.textContent='🧪 試作';
  b.style.cssText='position:fixed;bottom:calc(env(safe-area-inset-bottom,0px) + 104px);right:8px;z-index:2147483600;font:700 11px system-ui,sans-serif;padding:5px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.3);background:rgba(10,14,26,.88);color:#fff;cursor:pointer';
  var p=document.createElement('div');p.id='gmPanel';
  p.style.cssText='display:none;position:fixed;bottom:calc(env(safe-area-inset-bottom,0px) + 144px);right:8px;left:8px;max-width:360px;margin-left:auto;z-index:2147483600;padding:12px 14px;border-radius:14px;background:rgba(10,14,26,.96);color:#eef0f6;font:12px/1.5 system-ui,sans-serif;max-height:70vh;overflow:auto;border:1px solid rgba(255,255,255,.15)';
  var groups={window:'プレエコ（窓）',lounge:'ビジネス（ラウンジ）',suite:'ファースト（スイート）',all:'全クラス共通'};
  var h='<b style="font-size:13px">試作ギミック</b><div style="color:#9aa0b4;margin:2px 0 6px">オン・オフで見比べられます（この端末だけに保存）</div>';
  ['window','lounge','suite','all'].forEach(function(c){
    h+='<div style="margin-top:8px;color:#ffcf26;font-weight:700">'+groups[c]+'</div>';
    GIMMICK_DEF.filter(function(d){return d.c===c;}).forEach(function(d){
      h+='<label style="display:flex;gap:8px;align-items:flex-start;padding:4px 0;cursor:pointer"><input type="checkbox" data-gm="'+d.k+'"'+(GIMMICK[d.k]!==false?' checked':'')+' style="margin-top:3px"><span>'+d.t+'</span></label>';});
  });
  p.innerHTML=h;
  p.addEventListener('change',function(e){var k=e.target&&e.target.getAttribute&&e.target.getAttribute('data-gm');if(!k)return;GIMMICK[k]=e.target.checked;gimmickSave();gimmickApplyRoot();});
  b.addEventListener('click',function(){p.style.display=p.style.display==='none'?'block':'none';});
  document.body.appendChild(b);document.body.appendChild(p);gimmickApplyRoot();
}
if(BF_SIM){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',gimmickPanel);else gimmickPanel();}

/* ---- レッスンの前後の演出（flight開始・レッスン完了から呼ばれる） ---- */
function gimmickOverlay(){var o=document.createElement('div');o.setAttribute('aria-hidden','true');o.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:2147483500;overflow:hidden';document.body.appendChild(o);return o;}
/* 搭乗券: レッスンを始めたとき、下から出てきて少し傾く */
function gimmickTicketFx(){
  if(reduceMotion||!document.body.animate)return;
  var o=gimmickOverlay(),t=document.createElement('div');
  var w=Math.min(300,innerWidth-40);
  t.style.cssText='position:absolute;left:50%;bottom:18%;width:'+w+'px;margin-left:-'+(w/2)+'px;padding:14px 16px;border-radius:14px;background:linear-gradient(135deg,#f6e7b4,#d4af37);color:#1a1400;font:700 12px/1.5 "B612 Mono",monospace;box-shadow:0 12px 30px rgba(0,0,0,.45)';
  t.innerHTML='<div style="font-size:10px;letter-spacing:.2em">BOARDING PASS</div><div style="font-size:18px;font-family:system-ui,sans-serif;font-weight:800">'+(LANGS[save.lang]?LANGS[save.lang].name:'')+'</div><div>GATE A1 ・ SEAT 1A</div>';
  o.appendChild(t);
  var a=t.animate([{transform:'translateY(60px) rotate(-8deg)',opacity:0},{transform:'translateY(0) rotate(-2deg)',opacity:1,offset:.45},{transform:'translateY(-10px) rotate(0deg)',opacity:1,offset:.7},{transform:'translateY(-40px)',opacity:0}],{duration:1500,easing:'cubic-bezier(.2,.8,.2,1)'});
  a.onfinish=function(){o.remove();};
}
/* シャンパン: 金の泡が下から上がる */
function gimmickChampagne(){
  if(reduceMotion||!document.body.animate)return;
  var o=gimmickOverlay();
  for(var i=0;i<26;i++){
    var b=document.createElement('span'),x=8+Math.random()*84,sz=4+Math.random()*7,d=900+Math.random()*900,dl=Math.random()*500;
    b.style.cssText='position:absolute;bottom:-12px;left:'+x+'%;width:'+sz+'px;height:'+sz+'px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff7cc,#e7c35a 60%,#b8891f);opacity:0';
    o.appendChild(b);
    b.animate([{transform:'translate(0,0)',opacity:0},{opacity:.95,offset:.2},{transform:'translate('+((Math.random()-.5)*60)+'px,-'+(innerHeight*(0.5+Math.random()*0.4))+'px)',opacity:0}],{duration:d,delay:dl,easing:'ease-out',fill:'forwards'});
  }
  setTimeout(function(){o.remove();},2600);
}
/* 着陸の揺れ: 地図が一度ゆれる */
function gimmickShake(){
  var h=document.querySelector('.hero');
  if(!h||reduceMotion||!h.animate)return;
  h.animate([{transform:'translate(0,0)'},{transform:'translate(-3px,2px)'},{transform:'translate(4px,-2px)'},{transform:'translate(-2px,1px)'},{transform:'translate(0,0)'}],{duration:480,easing:'ease-out'});
}
/* レッスン開始（startFlight の最初に呼ぶ） */
function gimmickOnStart(){
  if(gimmickOn('ticketfx')&&gimmickCab()==='lounge')gimmickTicketFx();
}
/* レッスン完了（completeLesson の最初に呼ぶ） */
function gimmickOnDone(){
  if(gimmickOn('champagne')&&gimmickCab()==='suite')gimmickChampagne();
  if(gimmickOn('arrive'))gimmickShake();
}

/* ---- 地図をメインにする試作 ---- */
/* 軌跡: 飛んだ航路を金色に光らせる */
function gimmickTrail(g,acc){
  if(gimmickOn('trail')){g.strokeStyle='#ffcf26';g.lineWidth=2.4;g.globalAlpha=.95;g.shadowColor='rgba(255,207,38,.7)';g.shadowBlur=7;}
  else{g.strokeStyle=acc;g.lineWidth=2.2;g.globalAlpha=.9;}
}
/* 時間帯の空（日本時間）: 朝・昼・夕・夜 */
function gimmickDay(){
  if(!gimmickOn('daytime'))return ['#071022','#0f2244'];
  var h=(new Date().getUTCHours()+9)%24;
  if(h>=5&&h<9)return ['#1b2a4e','#5a3f72'];
  if(h>=9&&h<16)return ['#0c2a4f','#1f6291'];
  if(h>=16&&h<19)return ['#1a1433','#7a3f5e'];
  return ['#050914','#0b1a33'];
}
/* 都市の時差（経度から出す目安。日本との差） */
/* 時差: 言語の国がひとつなら、その国の時間帯（夏時間も込み）。それ以外は経度から目安 */
var GM_ZONE={ko:'Asia/Seoul',zh:'Asia/Shanghai',de:'Europe/Berlin',fr:'Europe/Paris',es:'Europe/Madrid'};
function gimmickOffMin(z){try{var d=new Date(),o={},f=new Intl.DateTimeFormat('en-US',{timeZone:z,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric',second:'numeric'}).formatToParts(d);f.forEach(function(p){o[p.type]=+p.value;});return Math.round((Date.UTC(o.year,o.month-1,o.day,o.hour,o.minute,o.second)-(d.getTime()-d.getMilliseconds()))/60000);}catch(e){return null;}}
function gimmickCityOff(c,L){var z=GM_ZONE[L],m=z?gimmickOffMin(z):null;return m!==null?m:Math.round(c[3]/15)*60;}
function gimmickDiff(c,L){var tk=gimmickOffMin('Asia/Tokyo');if(tk===null)tk=540;return Math.round((gimmickCityOff(c,L)-tk)/60);}
function gimmickLocalTime(c,L){var t=new Date(Date.now()+gimmickCityOff(c,L)*60000);return (t.getUTCHours()<10?'0':'')+t.getUTCHours()+':'+(t.getUTCMinutes()<10?'0':'')+t.getUTCMinutes();}
/* 都市をタップ: 先に小さなカードを出す（レッスンへは「見る」） */
function gimmickCityCard(c,L,open){
  var old=document.getElementById('gmCity');if(old)old.remove();
  var d=gimmickDiff(c,L),el=document.createElement('div');el.id='gmCity';
  el.style.cssText='position:fixed;left:12px;right:12px;bottom:calc(env(safe-area-inset-bottom,0px) + 112px);max-width:340px;margin:0 auto;z-index:2147483550;padding:14px 16px;border-radius:16px;background:rgba(10,14,26,.96);color:#eef0f6;font:13px/1.6 system-ui,sans-serif;border:1px solid rgba(255,207,38,.45);box-shadow:0 10px 30px rgba(0,0,0,.5)';
  el.innerHTML='<div style="font:700 16px system-ui">'+esc(c[0])+' <span style="color:#9aa0b4;font-weight:400">'+esc(c[1])+'</span></div>'
    +'<div style="color:#ffcf26;font:700 12px \'B612 Mono\',monospace">今 '+gimmickLocalTime(c,L)+' ・ '+(d===0?'日本と同じ時間':'日本と '+(d>0?'+':'')+d+'時間')+'（目安）</div>'
    +'<div style="color:#9aa0b4;font-size:12px">ここで学ぶ言葉：'+esc(LANGS[L]?LANGS[L].name:'')+'</div>'
    +'<div style="display:flex;gap:8px;margin-top:10px"><button type="button" id="gmCityGo" style="flex:1;padding:9px;border-radius:999px;border:0;background:#ffcf26;color:#1a1400;font:700 13px system-ui;cursor:pointer">レッスンを見る</button><button type="button" id="gmCityX" style="padding:9px 14px;border-radius:999px;border:1px solid rgba(255,255,255,.25);background:transparent;color:#eef0f6;font:13px system-ui;cursor:pointer">とじる</button></div>';
  document.body.appendChild(el);
  document.getElementById('gmCityGo').onclick=function(){el.remove();open();};
  document.getElementById('gmCityX').onclick=function(){el.remove();};
}
/* 左右になぞって地図を動かす（指を離すと、もとの位置へ戻る）。上下は今までどおりページのスクロール */
/* 世界中の国で公用語になっている言語だけ、地図を世界一周できる（韓国語のように1国だけの言語は動かさない） */
var WORLD_LANG={en:1,es:1,fr:1,ar:1,pt:1};
function worldLang(L){return !!WORLD_LANG[L];}
/* 試作「PCのホバープレビュー」: マウスを空港に乗せると、そのレッスンの内容を小さく出す（指の端末では出ない。指はタップの都市カード） */
function gimmickHoverAt(M,clientX,clientY){
  var r=M.cv.getBoundingClientRect(),cx=M.cam.x-(M.panX||0)/M.s,cy=M.cam.y+mapCY(M);
  var x=(clientX-r.left-M.cw/2)/M.s+cx,y=(clientY-r.top-M.ch/2)/M.s+cy,best=-1,bd=22/M.s;
  M.pts.forEach(function(p,i){var dd=Math.hypot(p.x-x,p.y-y);if(dd<bd){bd=dd;best=i;}});
  return best;
}
function gimmickHoverHide(){var el=document.getElementById('gmHover');if(el)el.style.display='none';}
function gimmickHoverShow(M,i,clientX,clientY){
  var el=document.getElementById('gmHover');
  if(!el){el=document.createElement('div');el.id='gmHover';el.setAttribute('aria-hidden','true');
    el.style.cssText='position:fixed;pointer-events:none;z-index:2147483560;max-width:240px;padding:10px 12px;border-radius:12px;background:rgba(10,14,26,.94);color:#eef0f6;font:12px/1.5 system-ui,sans-serif;border:1px solid rgba(255,207,38,.4);box-shadow:0 8px 24px rgba(0,0,0,.45)';
    document.body.appendChild(el);}
  var uid=M.ids[i],rec=unitRec(M.L,uid),done=rec&&rec.n>0;
  el.innerHTML='<div style="font:700 13px system-ui">'+esc(unitTitle(uid))+'</div>'
    +'<div style="color:#ffcf26;font:700 11px \'B612 Mono\',monospace">'+esc(unitLat(uid))+(done?' ・ クリア済み':'')+'</div>'
    +'<div style="color:#9aa0b4;font-size:11px">'+esc(LANGS[M.L]?LANGS[M.L].city:'')+'行き ・ クリックで開く</div>';
  el.style.display='block';
  var w=el.offsetWidth,h=el.offsetHeight,x=clientX+16,y=clientY+16;
  if(x+w>innerWidth-8)x=clientX-w-16;if(y+h>innerHeight-8)y=clientY-h-16;
  el.style.left=Math.max(8,x)+'px';el.style.top=Math.max(8,y)+'px';
}
function gimmickHoverSetup(M){
  if(!M||!M.cv)return;
  if(!gimmickOn('hoverpv')){gimmickHoverHide();return;}
  if(M.cv.getAttribute('data-gm-hover'))return;
  M.cv.setAttribute('data-gm-hover','1');
  M.cv.addEventListener('pointermove',function(e){
    var X=MAP;if(!X||e.pointerType!=='mouse'||!gimmickOn('hoverpv'))return gimmickHoverHide();
    if((X.panX||0)!==0&&X.dragT&&performance.now()-X.dragT<200)return gimmickHoverHide();
    var i=gimmickHoverAt(X,e.clientX,e.clientY);
    if(i<0)return gimmickHoverHide();
    gimmickHoverShow(X,i,e.clientX,e.clientY);
  });
  M.cv.addEventListener('pointerleave',gimmickHoverHide);
}
function gimmickPanSetup(M){
  if(!M||!M.cv)return;
  if(!gimmickOn('pan')){M.cv.style.touchAction='';return;}
  M.cv.style.touchAction='pan-y';
  if(M.cv.getAttribute('data-gm-pan'))return;
  M.cv.setAttribute('data-gm-pan','1');
  /* the handlers use the current MAP: a mode or language change makes a new MAP on the same canvas.
     Sideways finger moves pan the map and stop the page from scrolling sideways; up/down still scroll the page. */
  var st=null;
  function startAt(x,y){var X=MAP;if(X&&worldLang(X.L))st={x:x,y:y,p:X.panX||0,lock:0};}
  function moveTo(x,y){
    var X=MAP;if(!st||!X)return false;var dx=x-st.x,dy=y-st.y;
    if(!st.lock){if(Math.abs(dx)<8&&Math.abs(dy)<8)return false;st.lock=Math.abs(dx)>Math.abs(dy)?'x':'y';}
    if(st.lock!=='x')return false;
    X.panX=st.p+dx;X.dragT=performance.now();return true;
  }
  M.cv.addEventListener('touchstart',function(e){if(e.touches.length===1)startAt(e.touches[0].clientX,e.touches[0].clientY);else st=null;},{passive:true});
  M.cv.addEventListener('touchmove',function(e){if(!st||e.touches.length!==1)return;if(moveTo(e.touches[0].clientX,e.touches[0].clientY)&&e.cancelable)e.preventDefault();},{passive:false});
  var endT=function(){st=null;};
  M.cv.addEventListener('touchend',endT,{passive:true});M.cv.addEventListener('touchcancel',endT,{passive:true});
  M.cv.addEventListener('pointerdown',function(e){if(e.pointerType==='mouse')startAt(e.clientX,e.clientY);});
  M.cv.addEventListener('pointermove',function(e){if(e.pointerType==='mouse')moveTo(e.clientX,e.clientY);});
  M.cv.addEventListener('pointerup',function(){st=null;});
}
