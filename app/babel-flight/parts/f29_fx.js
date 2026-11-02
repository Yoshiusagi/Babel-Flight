/* ================= 起動アニメ・ところどころのアニメ・アップデートのお知らせ (NOTAM) =================
   - Opening the app: a plane climbs out of the bottom of the screen (under 1 s, tap to skip, none with
     reduced motion). The sky follows the time of day; the flight path changes every time (7 kinds).
   - Short ones elsewhere: right answers in a row (a plane flies past with the count), leaving the first
     questions (takeoff), the daily goal and the streak on the landing screen.
   - NOTAM: after an update, a notice of what is new, once (never for someone who just started). */
var FXP={on:false,last:''};
function fxReduced(){return reduceMotion;}
/* a flight path for the viewport: [d, how planes are placed] */
function fxPath(kind,W,H){
  var cx=W/2;
  if(kind==='bank')return 'M -70 '+(H*0.88)+' C '+(W*0.35)+' '+(H*0.8)+' '+(W*0.6)+' '+(H*0.42)+' '+(W+90)+' -60';
  if(kind==='swoop')return 'M '+(W+70)+' '+(H*0.92)+' C '+(W*0.25)+' '+(H*1.02)+' '+(W*0.1)+' '+(H*0.42)+' '+(W*0.62)+' -90';
  if(kind==='loop')return 'M '+(W*0.22)+' '+(H+60)+' C '+(W*0.22)+' '+(H*0.42)+' '+(W*0.84)+' '+(H*0.3)+' '+(W*0.74)+' '+(H*0.56)+' S '+(W*0.3)+' '+(H*0.44)+' '+(W*0.58)+' -90';
  if(kind==='zig')return 'M '+(cx-30)+' '+(H+60)+' C '+(cx+W*0.32)+' '+(H*0.7)+' '+(cx-W*0.32)+' '+(H*0.35)+' '+(cx+20)+' -90';
  return 'M '+cx+' '+(H+60)+' C '+(cx-18)+' '+(H*0.62)+' '+(cx+18)+' '+(H*0.3)+' '+cx+' -90';   /* climb, clouds, formation, runway */
}
var FX_KINDS=['climb','bank','swoop','clouds','formation','loop','zig','runway'];
function fxPick(){
  var last='';try{last=localStorage.getItem('babelflight.fxLast')||'';}catch(e){}
  var list=FX_KINDS.filter(function(k){return k!==last;}),k=list[Math.floor(Math.random()*list.length)];
  try{localStorage.setItem('babelflight.fxLast',k);}catch(e){}
  return k;
}
/* fly planes along a path inside an svg; returns a stop function */
function fxFly(svg,d,o){
  var NS='http://www.w3.org/2000/svg',n=o.n||1,dur=o.dur||780,trails=[],planes=[],guide=document.createElementNS(NS,'path');
  guide.setAttribute('d',d);guide.setAttribute('fill','none');svg.appendChild(guide);
  var len=guide.getTotalLength(),offs=n===3?[-46,0,46]:[0];
  offs.forEach(function(dx,i){
    var tr=document.createElementNS(NS,'path');tr.setAttribute('d',d);tr.setAttribute('class','fx-trail'+(n===3&&i===1?' c':''));
    tr.setAttribute('transform','translate('+dx+' '+(n===3?Math.abs(dx)*0.9:0)+')');
    tr.style.strokeDasharray=len+' '+len;tr.style.strokeDashoffset=len;svg.appendChild(tr);trails.push(tr);
    var g=document.createElementNS(NS,'g');g.setAttribute('class','fx-plane');
    g.innerHTML='<path d="'+PLANE_D+'" transform="scale('+(o.scale||2.1)+')"/>';svg.appendChild(g);planes.push([g,dx,n===3?Math.abs(dx)*0.9:0]);
  });
  var t0=performance.now(),stop=false;
  function ease(t){return t<0.5?2*t*t:1-Math.pow(-2*t+2,2)/2;}
  (function step(now){
    if(stop)return;
    var t=Math.min(1,(now-t0)/dur),e=o.linear?t:ease(t),s=e*len,p=guide.getPointAtLength(s),q=guide.getPointAtLength(Math.min(len,s+1)),pb=guide.getPointAtLength(Math.max(0,s-1));
    var ang=Math.atan2(q.y-pb.y,q.x-pb.x)*180/Math.PI;
    planes.forEach(function(x){x[0].setAttribute('transform','translate('+(p.x+x[1]).toFixed(1)+' '+(p.y+x[2]).toFixed(1)+') rotate('+ang.toFixed(1)+')');});
    trails.forEach(function(tr){tr.style.strokeDashoffset=(len-s).toFixed(1);});
    if(t<1)requestAnimationFrame(step);
  })(t0);
  return function(){stop=true;};
}
/* ---- opening the app ---- */
var BOOT_SUBS=['日本から世界へ','今日のフライトへ','離陸します','よいフライトを','Cleared for takeoff'];
function bootFx(opt){
  opt=opt||{};
  if(fxReduced()||FXP.on)return;
  var kind=opt.kind||fxPick(),ph=skyPhase(),W=window.innerWidth,H=window.innerHeight,o=document.createElement('div');
  FXP.on=true;
  o.id='bootfx';o.className='bootfx '+ph+' k-'+kind;o.setAttribute('aria-hidden','true');
  var deco='';
  if(ph==='night')deco+='<i class="bf-stars"></i><i class="bf-moon"></i>';
  else if(ph==='dawn'||ph==='dusk')deco+='<i class="bf-sun"></i>';
  if(kind==='clouds')deco+='<i class="bf-cl l1"></i><i class="bf-cl r1"></i><i class="bf-cl l2"></i><i class="bf-cl r2"></i>';
  else deco+='<i class="bf-cl f1"></i><i class="bf-cl f2"></i>';
  if(kind==='runway')deco+='<div class="bf-runway"><i></i><i></i><i></i><i></i><i></i></div>';
  o.innerHTML=deco+'<svg class="bf-svg" viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none"></svg>'+
    '<div class="bf-brand"><b>Babel<span>Flight</span></b><small>'+esc(opt.text||BOOT_SUBS[Math.floor(Math.random()*BOOT_SUBS.length)])+'</small></div>';
  document.body.appendChild(o);
  var stop=fxFly(o.querySelector('svg'),fxPath(kind,W,H),{n:kind==='formation'?3:1,dur:kind==='loop'?900:780});
  var gone=false;
  function end(){if(gone)return;gone=true;stop();if(o.parentNode)o.parentNode.removeChild(o);FXP.on=false;if(opt.done)opt.done();}
  o.addEventListener('click',function(){o.classList.add('out');setTimeout(end,160);});
  requestAnimationFrame(function(){o.classList.add('play');});
  setTimeout(function(){o.classList.add('out');},kind==='loop'?760:660);
  setTimeout(end,kind==='loop'?1080:980);
}
/* coming back to the app after a while (the app was not reloaded) also takes off */
var FX_HID=0;
document.addEventListener('visibilitychange',function(){
  if(document.hidden){FX_HID=Date.now();return;}
  if(FX_HID&&Date.now()-FX_HID>=15*60*1000&&(view==='home'||view==='review'||view==='record')&&!F)bootFx({done:notamMaybe});
  FX_HID=0;
});
/* ---- right answers in a row: a plane flies past with the count ---- */
var COMBO_AT=[3,5,8,12,16,20],COMBO_TXT=['連続正解！','いい流れ！','止まらない！','絶好調！','パーフェクト・フライト！'];
function fxCombo(n){
  if(fxReduced())return;
  var old=document.querySelector('.fx-combo');if(old&&old.parentNode)old.parentNode.removeChild(old);
  var W=window.innerWidth,H=Math.round(Math.min(220,window.innerHeight*0.3)),o=document.createElement('div'),dir=Math.random()<0.5;
  o.className='fx-combo';o.setAttribute('aria-hidden','true');
  o.innerHTML='<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none"></svg><div class="fc-badge"><b class="mono">'+n+'</b><span>'+COMBO_TXT[Math.min(COMBO_TXT.length-1,COMBO_AT.indexOf(n))]+'</span></div>';
  document.body.appendChild(o);
  var y0=H*(0.35+Math.random()*0.3),arc=(Math.random()-0.5)*H*0.6;
  var d=dir?'M -60 '+y0+' Q '+(W/2)+' '+(y0+arc)+' '+(W+60)+' '+(y0-20):'M '+(W+60)+' '+y0+' Q '+(W/2)+' '+(y0+arc)+' -60 '+(y0-20);
  fxFly(o.querySelector('svg'),d,{dur:820,scale:1.3,linear:true});
  setTimeout(function(){if(o.parentNode)o.parentNode.removeChild(o);},1250);
}
/* ---- small things on the landing screen: the goal bar fills, the streak ticks over ---- */
function fxLand(goalJust,streakUp){
  var m=$('main');if(!m)return;
  var gb=m.querySelector('.gbar i');
  if(gb&&!fxReduced()){var w=gb.style.width;gb.style.transition='none';gb.style.width=Math.max(0,parseFloat(w)-100/Math.max(1,save.goal))+'%';void gb.offsetWidth;gb.style.transition='width .7s cubic-bezier(.2,.8,.2,1) .35s';gb.style.width=w;}
  if(goalJust){var gd=m.querySelector('.goalbox');if(gd)gd.classList.add('goal-burst');}
  if(streakUp){var sp=m.querySelector('.streak-up');if(sp)sp.classList.add('go');}
}
/* ---- NOTAM: what is new (newest first). Item: [icon, title, text, go (tune|first|exam|''), paid plans (never in the
   iPhone app), display languages it is for (all when left out)]. A notice with nothing for this person is marked seen. ---- */
var NOTAM=[
 {v:'2026.11.06',items:[
  ['💼','職業モード','パイロット・医療・IT・ビジネス・ホテル観光など13職業の、仕事で使う会話を学べるようになりました。','job',0,['en','ko','zh']]
 ]},
 {v:'2026.11.05',items:[
  ['🎓','留学モード','留学先の学校での会話(自己紹介・先生への質問・ホームステイ)と、授業で使う用語(数学・理科・社会など)を学べるようになりました。','study',0,['en','ko','zh']]
 ]},
 {v:'2026.11.04',items:[
  ['🗾','日本語コース','日本語も学べるようになりました。行き先は東京です。','ja',0,['en','ko','zh']],
  ['✨','なめらかな動き','画面の切り替えやボタンの動きが、なめらかになりました。','',0],
  ['🏅','検定モードが使えるように','TOEIC・IELTS・TOEFL・TOPIK・DELE・CILSなどの検定コースが、この表示言語でも使えるようになりました。','exam',1,['en','ko','zh']],
  ['🎤','TOEIC Speaking・OPIc','韓国でよく使われる英語スピーキング試験のコースが加わりました。','',1,['ko']],
  ['📝','CET-4・CET-6','中国の大学英語試験(四級・六級)のコースが加わりました。','',1,['zh']]
 ]},
 {v:'2026.11.03',items:[
  ['🌱','はじめてでも、やさしく','「はじめの一歩」レッスンと、新しいフレーズを先に見られるカードが加わりました。「はじめて」レベルは選択肢が3つになります。','first'],
  ['🎯','あなたに合わせたレッスン','学ぶ理由と苦手なことに合わせて、始める場所と問題の出し方が変わります。レベルも言語ごとに選べます。','tune'],
  ['✈️','離陸アニメーション','アプリを開いたときや、正解が続いたときなどに短いアニメが加わりました。','']
 ]}
];
/* 留学モード: the language to try it in (this one if it has the course, otherwise the first that does) */
function studyLangFor(){
  var has=function(L){return !!(UNITS[L]&&STUDY_ALL.some(function(u){return !!UNITS[L][u];}));};
  if(has(save.lang))return save.lang;
  var o=learnOrder();for(var i=0;i<o.length;i++)if(has(o[i]))return o[i];
  return '';
}
function notamLatest(){return NOTAM[0].v;}
function notamSeenAll(){save.seen=notamLatest();}
function notamItems(n){return n.items.filter(function(x){return !(x[4]&&typeof BF_APP!=='undefined'&&BF_APP)&&!(x[5]&&x[5].indexOf(UI)<0);});}
function notamHTML(n,first){
  return '<div class="nt-items">'+notamItems(n).map(function(x){
    var btn='';
    if(first&&x[3]==='tune')btn='<button class="ghost nt-go" type="button" data-notam-go="tune">試してみる</button>';
    else if(first&&x[3]==='exam'&&typeof examModeOn==='function'&&examModeOn())btn='<button class="ghost nt-go" type="button" data-notam-go="exam">試してみる</button>';
    else if(first&&x[3]==='ja'&&LANGS.ja&&learnOrder().indexOf('ja')>=0&&save.lang!=='ja')btn='<button class="ghost nt-go" type="button" data-notam-go="ja">試してみる</button>';
    else if(first&&x[3]==='job')btn='<button class="ghost nt-go" type="button" data-notam-go="job">試してみる</button>';
    else if(first&&x[3]==='study'&&studyLangFor())btn='<button class="ghost nt-go" type="button" data-notam-go="study">試してみる</button>';
    else if(first&&x[3]==='first')btn='<button class="ghost nt-go" type="button" data-notam-go="'+(firstOn(save.lang)?'first':'settings')+'">'+(firstOn(save.lang)?'試してみる':'レベルを見る')+'</button>';
    return '<div class="nt-item"><span class="nt-ic" aria-hidden="true">'+x[0]+'</span><div class="nt-tx"><b>'+x[1]+'</b><p>'+x[2]+'</p>'+btn+'</div></div>';
  }).join('')+'</div>';
}
/* the notices not seen yet (newest first) that have something for this person */
function notamUnseen(){var s=save.seen||'';return NOTAM.filter(function(n){return n.v>s&&notamItems(n).length;});}
function notamSheet(all){
  var list=(all?NOTAM:notamUnseen()).filter(function(n){return notamItems(n).length;});
  $('sheetHost').innerHTML='<div class="sheet plain notam-sheet" role="dialog" aria-label="アップデートのお知らせ"><div class="sheet-in">'+
    '<div class="nt-head"><span class="nt-tag mono">NOTAM</span><span class="lbl">'+(all?'これまでのお知らせ':'新しいお知らせ')+'</span></div><h3>アップデートのお知らせ</h3>'+
    list.map(function(n){return (all||list.length>1?'<span class="lbl nt-date mono">'+n.v+'</span>':'')+notamHTML(n,!all);}).join('')+
    '<button class="go" type="button" data-notam-ok>OK</button></div></div>';
}
function notamMaybe(){
  if(!save.onboarded||(save.seen||'')>=notamLatest()||view!=='home'||F)return;
  var sh=$('sheetHost');if(sh&&sh.innerHTML)return;
  if(!notamUnseen().length){notamSeenAll();store();return;}   /* nothing new for this display language */
  notamSheet(false);
}
function notamBtnHTML(){return '<button class="ghost nt-all" type="button" data-notam-all>アップデートのお知らせ<small>新しくなったところ</small></button>';}
document.addEventListener('click',function(e){
  var t=e.target.closest&&e.target.closest('button');if(!t)return;
  var a=function(n){return t.hasAttribute(n);};
  if(a('data-notam-all')){notamSheet(true);return;}
  if(a('data-notam-ok')||a('data-notam-go')){
    var g=t.getAttribute('data-notam-go')||'';
    if((save.seen||'')<notamLatest()){notamSeenAll();store();}
    closeSheet();
    if(g==='tune'){TUNE={step:0,why:save.why,weak:(save.weak||[]).slice()};view='tune';render();window.scrollTo(0,0);}
    else if(g==='settings')go('record');
    else if(g==='ja'){save.lang='ja';HOME_ANIM='lang';store();go('home');if(typeof lvNeed==='function'&&lvNeed('ja'))lvSheet('ja');}
    else if(g==='exam'){if(save.mode!=='exam'){save.mode='exam';HOME_ANIM='mode';store();}go('home');}
    else if(g==='job'){if(profById(save.prof)&&jobOpen(save.prof)){save.mode='job';HOME_ANIM='mode';store();go('home');}else{pickerBack='home';go('picker');}}
    else if(g==='study'){var L=studyLangFor();if(L){var sw=save.lang!==L;save.lang=L;save.mode='study';HOME_ANIM=sw?'lang':'mode';store();go('home');if(sw&&typeof lvNeed==='function'&&lvNeed(L))lvSheet(L);}}
    else if(g==='first'&&typeof openNodeSheet==='function')openNodeSheet('first');
    return;
  }
});
/* the overlay goes up before the first screen is drawn, so the home screen never flashes first */
if(!fxReduced())bootFx({done:function(){setTimeout(notamMaybe,150);}});
else setTimeout(notamMaybe,600);
