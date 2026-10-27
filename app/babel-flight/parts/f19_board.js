/* ================= 出発案内板 (ビジネス): its own home and question screens (standalone site; test account only) =================
   Home: an airport departure board. Every lesson is a flight (便名・行き先・状況) on split-flap tiles, with a big
   boarding button for the next one. The question is a boarding pass; after answering, swipe left like tearing off the stub.
   It replaces the ラウンジ look of ビジネス (same internal name 'lounge'), and only the test account can pick it. */
CAB_DESIGN[2]=['lounge','出発案内板','パタパタ表示と搭乗券'];
CAB_FEAT.forEach(function(f){if(f[0]==='専用デザイン')f[1][2]='+出発案内板';});
function flapT(t,anim){return '<span class="flapw'+(anim?' flip':'')+'">'+Array.from(String(t)).map(function(ch,i){return '<span style="--d:'+i+'">'+(ch===' '?'&nbsp;':esc(ch))+'</span>';}).join('')+'</span>';}
function boardStatus(L,uid,nextId){
  var st=stopStatus(L,uid,nextId),r=unitRec(L,uid);
  if(st.c==='locked')return {c:'lk',t:st.t};
  if(r.n>0&&unitDue(L,uid)>0)return {c:'due',t:'要搭乗'};
  if(r.n>0)return {c:'arr',t:'到着 '+'★★★'.slice(0,Math.max(1,r.stars||1))};
  if(uid===nextId)return {c:'',t:'搭乗中'};
  return {c:'',t:'定刻'};
}
function digitsHTML(s){return Array.from(String(s)).map(function(ch){return '<span class="xb-d">'+esc(ch)+'</span>';}).join('');}
function boardHomeHTML(){
  var L=save.lang,LG=LANGS[L],ids=pathIds(L),anim=!!HOME_ANIM&&!reduceMotion,h=topBar('','progress');
  var nextId=nextPathUnit(L),sz=unitSize(L,nextId),due=dueList(L).length,done=unitsDone(L,ids);
  h+='<section class="xb-head"><span class="lbl">BUSINESS ・ DEPARTURES</span><h1 class="jh">出発案内'+(save.name?' ・ '+esc(save.name):'')+'</h1><p>'+esc(LG.name)+' ・ '+esc(modeName(L))+'</p></section>';
  h+=destChips()+modeSwitch()+jobButtonsHTML();
  h+='<button class="xb-go" type="button" data-node="'+esc(nextId)+'"><span><b>'+flightNo(L,nextId)+'に搭乗する</b><small>GATE '+esc(gateNo(L,nextId))+' ・ '+esc(unitTitle(nextId))+' ・ '+sz.min+'</small></span>'+
     '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button>';
  var t=save.mode==='exam'&&typeof examTarget==='function'?examTarget(L):null,tile;
  if(t&&bankFull(t.bank)){
    var m=bankMeter(t.bank),left=Math.max(0,XPASS-m.pct);
    tile='<div class="xb-tile"><span class="xb-l">合格圏メーター(目安)</span><span class="xb-digits" role="img" aria-label="'+m.pct+'%">'+digitsHTML(('00'+m.pct).slice(-3))+'<span class="xb-u">%</span></span>'+
         '<span class="xb-foot">'+(left?'合格圏(80%)まであと'+left+'%':'合格圏に到達！')+'</span></div>';
  }else{
    tile='<div class="xb-tile"><span class="xb-l">到着したレッスン</span><span class="xb-digits" role="img" aria-label="'+done+' / '+ids.length+'">'+digitsHTML(('0'+done).slice(-2))+'<span class="xb-u">/'+ids.length+'</span></span>'+
         '<span class="xb-foot">'+esc(modeName(L))+'</span></div>';
  }
  h+='<div class="xb-tiles">'+tile+'<button class="xb-tile" type="button" data-tab="review"><span class="xb-l">復習の時期</span><span class="xb-digits" role="img" aria-label="'+due+'フレーズ">'+digitsHTML(('0'+Math.min(99,due)).slice(-2))+'<span class="xb-u">フレーズ</span></span>'+
     '<span class="xb-foot">'+(due?'タップして復習へ':'今はありません')+'</span></button></div>';
  if(typeof examHomeHTML==='function')h+=examHomeHTML(L);
  pathSections(L).forEach(function(sec){
    h+='<section class="xb-board" aria-label="'+esc(sec.title)+'"><div class="xb-h"><span>'+esc(sec.title)+'</span><span class="mono">'+unitsDone(L,sec.ids)+'/'+sec.ids.length+'</span></div>'+
       '<div class="xb-cols" aria-hidden="true"><span>便名</span><span>行き先(レッスン)</span><span>状況</span></div><div class="xb-rows">';
    sec.ids.forEach(function(uid){
      var s=boardStatus(L,uid,nextId),lk=s.c==='lk';
      h+='<button class="xb-row'+(uid===nextId&&!lk?' now':'')+(s.c?' '+s.c:'')+'" type="button" data-node="'+esc(uid)+'" aria-label="'+esc(flightNo(L,uid)+' '+unitTitle(uid)+' '+s.t)+'">'+
         '<span class="fl no" aria-hidden="true">'+flapT(flightNo(L,uid),anim)+'</span><span class="fl to" aria-hidden="true">'+flapT(unitTitle(uid),anim)+'</span>'+
         '<span class="fl st" aria-hidden="true">'+(lk?esc(s.t):flapT(s.t,anim))+'</span></button>';
    });
    h+='</div></section>';
  });
  return h;
}

/* ---- the question: a boarding pass ---- */
function passSync(){
  if(view!=='flight'||!F)return;
  var bd=$('bd');if(!bd)return;
  var p=$('cabP');
  if(!p){bd.insertAdjacentHTML('beforebegin','<div class="cab-p xb-pass" id="cabP" aria-live="polite"></div>');p=$('cabP');}
  var mEl=document.querySelector('#led .m'),sEl=document.querySelector('#led .s'),m=mEl?mEl.textContent:'',s=sEl?sEl.textContent:'',b=PROMPT.board,big=b||m,small=[];
  if(b&&m&&!/^[?♪\s]+$/.test(m))small.push(m);
  if(s)small.push(s);
  var k=F.cur?F.cur.k:'t2j',toJp=(k==='t2j'||k==='aiq'||k==='listenjp'),code=F.lang.toUpperCase();
  var no=F.uid&&UNITS[F.lang][F.uid]?flightNo(F.lang,F.uid):'BF'+(ORDER.indexOf(F.lang)+1)+'XX';
  var title=F.uid&&UNITS[F.lang][F.uid]?unitTitle(F.uid):(MODE_TITLE[F.mode]||'');
  p.innerHTML='<div class="xp-band"><span>BABEL FLIGHT ・ BUSINESS</span><span>'+no+' ・ '+Math.min(F.idx+1,F.queue.length)+'/'+F.queue.length+'</span></div>'+
    '<div class="xp-route"><div><small>FROM</small><b>'+(toJp?code:'JP')+'</b></div>'+
    '<svg viewBox="0 0 34 20" width="34" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M2 10h28M24 4l6 6-6 6"/></svg>'+
    '<div><small>TO</small><b>'+(toJp?'JP':code)+'</b></div></div>'+
    '<div class="xp-info"><div><small>PASSENGER</small>'+esc(save.name||'GUEST')+'</div><div><small>SEAT</small>'+(F.idx+1)+'A</div><div><small>LESSON</small>'+esc(title)+'</div></div>'+
    '<div class="xp-cut" aria-hidden="true"></div>'+
    '<div class="xp-q">'+small.map(function(x){return '<span class="cp-x">'+esc(x)+'</span>';}).join('')+
    '<span class="cp-m'+(b&&F.lang==='ko'?' ko':'')+'"'+(b?' lang="'+LANGS[F.lang].tts.slice(0,2)+'"':'')+'>'+esc(big)+'</span></div>';
}
(function(){
  var hh1=homeHTML;
  homeHTML=function(){
    if(cabinLayout()==='lounge'&&pathIds(save.lang).length)return boardHomeHTML();
    return hh1.apply(this,arguments);
  };
  var ps0=promptSync;
  promptSync=function(){if(cabinLayout()==='lounge')return passSync();return ps0.apply(this,arguments);};
})();
