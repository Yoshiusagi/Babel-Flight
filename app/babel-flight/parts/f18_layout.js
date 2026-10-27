/* ================= 窓側の席・スイート: their own home and question screens (standalone site; test account only) =================
   窓側の席 (プレミアムエコノミー): the lessons are round plane windows in a row you swipe sideways, and the question sits in a window.
   スイート (ファースト): one big thing per screen, swiped upward; the question is set in large serif type.
   Only the test account can pick these designs, so nobody else sees any of this. */
function cabinLayout(){var d=cabinDesign();return d>0?CAB_DESIGN[d][0]:'';}
var SUITE_FONT=false;
function suiteFonts(){
  if(SUITE_FONT)return;SUITE_FONT=true;
  var l=document.createElement('link');l.rel='stylesheet';
  l.href='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Shippori+Mincho:wght@500;700&display=swap';
  document.head.appendChild(l);
}
function helloWord(){var h=new Date().getHours();return h<4||h>=18?'こんばんは':h<11?'おはよう':'こんにちは';}
function modeName(L){
  if(save.mode==='exam'){var t=typeof examTarget==='function'?examTarget(L):null;return t?t.name+'をめざす':'検定モード';}
  if(save.mode==='job'){var p=profById(save.prof);return p?p.jp+'の会話':'職業モード';}
  if(save.mode==='study')return '留学モード';
  return '日常会話モード';
}
function jobButtonsHTML(){
  if(save.mode!=='job')return '';
  var p=profById(save.prof);if(!p)return '';
  return '<button class="course" type="button" data-picker><span class="ccode">'+p.code+'</span><span class="ctext"><span class="lbl">職業コース</span><b>'+esc(p.jp)+'</b><small>タップして変更 ・ 13職業から選べます</small></span><span class="chev" aria-hidden="true">›</span></button>'+
    (p.id==='pilot'?'<button class="course atcbtn" type="button" data-atc><span class="ccode">ATC</span><span class="ctext"><span class="lbl">AIロールプレイ ・ 英語</span><b>AI管制官と交信練習</b><small>羽田空港で、管制官役のAIと無線交信</small></span><span class="chev" aria-hidden="true">›</span></button>':'');
}
function kindSize(L,uid){var k=unitKind(L,uid),z=unitSize(L,uid);return (k==='フレーズ'?'':k+(z.n?' ・ ':''))+z.n;}
function unitSize(L,uid){
  var u=UNITS[L][uid];if(!u)return {n:'',min:''};
  if(u.kind==='scene')return {n:(u.turns?u.turns.length:0)+'往復',min:'約3分'};
  return {n:u.items.length+'フレーズ',min:'約'+Math.max(2,Math.round(u.items.length*0.5))+'分'};
}

/* ---- 窓側の席: home ---- */
function winHomeHTML(){
  var L=save.lang,LG=LANGS[L],ids=pathIds(L),h=topBar('','progress');
  h+='<section class="win-hello"><h1 class="jh">'+helloWord()+(save.name?'、'+esc(save.name):'')+'</h1><p>'+esc(LG.name)+' ・ '+esc(modeName(L))+' ・ 窓側の席</p></section>';
  h+=destChips()+modeSwitch()+jobButtonsHTML();
  var nextId=nextPathUnit(L);
  pathSections(L).forEach(function(sec){
    var sd=unitsDone(L,sec.ids);
    h+='<section class="win-leg"><div class="win-leg-h"><h2 class="jh">'+esc(sec.title)+'</h2><span class="mono">'+sd+'/'+sec.ids.length+'</span></div>'+
       '<div class="win-rail" data-rail role="group" aria-label="'+esc(sec.title)+'">';
    sec.ids.forEach(function(uid,i){
      var st=stopStatus(L,uid,nextId);
      h+='<button class="win '+st.c+'" type="button" data-node="'+esc(uid)+'" style="--wi:'+(i%6)+'">'+
         '<span class="win-pane" aria-hidden="true"><span class="win-k">'+(isScene(L,uid)?'TALK':'STEP')+'</span><b class="win-n">'+(i+1)+'</b></span>'+
         '<span class="win-t">'+esc(unitTitle(uid))+'</span><small>'+kindSize(L,uid)+'</small>'+
         '<span class="win-st">'+(uid===nextId&&st.c!=='locked'?'<span class="win-go">出発する</span>':st.t)+'</span></button>';
    });
    h+='</div></section>';
  });
  if(typeof examHomeHTML==='function')h+=examHomeHTML(L);
  var due=dueList(L).length;
  if(due)h+='<button class="card win-due" type="button" data-tab="review"><span><span class="lbl">復習の時期</span><b>'+due+'フレーズ</b></span><span class="chev" aria-hidden="true">›</span></button>';
  return h;
}
function centerRails(){
  document.querySelectorAll('#main [data-rail]').forEach(function(r){
    var n=r.querySelector('.win.next')||r.querySelector('.win.todo');
    if(n)r.scrollLeft=Math.max(0,n.offsetLeft-(r.clientWidth-n.offsetWidth)/2);
  });
}

/* ---- スイート: home, one screen at a time ---- */
function suiteHomeHTML(){
  var L=save.lang,LG=LANGS[L],ids=pathIds(L),h=topBar('','progress');
  var nextId=nextPathUnit(L),title=unitTitle(nextId),sp=title.indexOf(' '),t1=sp>0?title.slice(0,sp):title,t2=sp>0?title.slice(sp+1):'';
  var sz=unitSize(L,nextId),due=dueList(L).length,weak=weakList(L).length,done=unitsDone(L,ids);
  h+='<div class="suite-wrap"><div class="suite-pages" id="suitePages">';
  h+='<section class="suite-pg sp-next" aria-label="次のフライト"><button class="sp-ctx" type="button" data-suite-go="3">'+esc(LG.name)+' ・ '+esc(modeName(L))+'</button>'+
     '<span class="sp-it">Next flight</span><h1 class="sp-big">'+esc(t1)+'</h1>'+(t2?'<div class="sp-big2">'+esc(t2)+'</div>':'')+
     '<svg class="sp-line" viewBox="0 0 322 60" aria-hidden="true" fill="none"><path d="M2 52C90 52 140 12 250 12" stroke="currentColor" stroke-width="1" stroke-dasharray="2 5" opacity=".5"/><path d="M252 12l26-3 4 2-24 6z M262 10l-6-9h4l10 8z M262 13l-6 9h4l10-8z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>'+
     '<div class="sp-meta"><span>'+kindSize(L,nextId)+'</span><span>'+sz.min+'</span></div>'+
     '<button class="sp-board" type="button" data-node="'+esc(nextId)+'">搭乗</button>'+
     '<div class="sp-hint" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg>上にスワイプ</div></section>';
  var card=typeof examHomeHTML==='function'?examHomeHTML(L):'';
  h+='<section class="suite-pg sp-prog" aria-label="進み具合">'+(card||
     '<span class="sp-it">Progress</span><div class="sp-num">'+done+'<small>/'+ids.length+'</small></div><p class="sp-p">到着したレッスン ・ '+esc(modeName(L))+'</p>'+
     '<div class="sp-thin" role="img" aria-label="'+done+' / '+ids.length+'"><i style="width:'+Math.round(done/Math.max(1,ids.length)*100)+'%"></i></div>')+'</section>';
  h+='<section class="suite-pg sp-rev" aria-label="復習"><span class="sp-it">Review</span><div class="sp-num">'+due+'</div><p class="sp-p">復習の時期のフレーズ'+(weak?' ・ 苦手 '+weak:'')+'</p>'+
     '<button class="go" type="button" data-tab="review">復習へ</button></section>';
  h+='<section class="suite-pg sp-all" aria-label="すべてのレッスン"><span class="sp-it">All flights</span>'+destChips()+modeSwitch().replace('modesw float','modesw')+jobButtonsHTML();
  pathSections(L).forEach(function(sec){
    h+='<div class="sp-sec"><h2>'+esc(sec.title)+'<small>'+unitsDone(L,sec.ids)+'/'+sec.ids.length+'</small></h2>';
    sec.ids.forEach(function(uid){var st=stopStatus(L,uid,nextId);h+='<button class="sp-row '+st.c+'" type="button" data-node="'+esc(uid)+'"><span>'+esc(unitTitle(uid))+'</span><small>'+(st.t||unitKind(L,uid))+'</small></button>';});
    h+='</div>';
  });
  h+='</section></div><div class="sp-dots" aria-hidden="true"><i class="on"></i><i></i><i></i><i></i></div></div>';
  return h;
}
function suiteMount(){
  var p=$('suitePages');if(!p)return;
  var dots=document.querySelectorAll('#main .sp-dots i');
  function upd(){var i=Math.round(p.scrollTop/Math.max(1,p.clientHeight));for(var k=0;k<dots.length;k++)dots[k].classList.toggle('on',k===Math.min(i,dots.length-1));}
  p.addEventListener('scroll',upd,{passive:true});upd();
}

/* ---- the question: the board and the LED become one prompt (a window, or large serif type) ---- */
var PROMPT={board:''};
function promptSync(){
  var lay=cabinLayout();
  if((lay!=='window'&&lay!=='suite')||view!=='flight'||!F)return;
  var bd=$('bd');if(!bd)return;
  var p=$('cabP');
  if(!p){bd.insertAdjacentHTML('beforebegin','<div class="cab-p" id="cabP" aria-live="polite"></div>');p=$('cabP');}
  var mEl=document.querySelector('#led .m'),sEl=document.querySelector('#led .s'),m=mEl?mEl.textContent:'',s=sEl?sEl.textContent:'',b=PROMPT.board,big=b||m,small=[];
  if(b&&m&&!/^[?♪\s]+$/.test(m))small.push(m);
  if(s)small.push(s);
  p.innerHTML='<span class="cp-m'+(b&&F.lang==='ko'?' ko':'')+'"'+(b?' lang="'+LANGS[F.lang].tts.slice(0,2)+'"':'')+'>'+esc(big)+'</span>'+small.map(function(x){return '<span class="cp-x">'+esc(x)+'</span>';}).join('');
  var bar=$('cabBar');
  if(!bar){$('main').insertAdjacentHTML('afterbegin','<div class="cab-bar" id="cabBar" aria-hidden="true"></div>');bar=$('cabBar');}
  bar.style.width=Math.round(F.idx/Math.max(1,F.queue.length)*100)+'%';
}

(function(){
  var hh0=homeHTML;
  homeHTML=function(){
    var lay=cabinLayout();
    if(lay&&pathIds(save.lang).length){if(lay==='window')return winHomeHTML();if(lay==='suite')return suiteHomeHTML();}
    return hh0.apply(this,arguments);
  };
  var mm0=mapMount;
  mapMount=function(){
    var r=mm0.apply(this,arguments),lay=cabinLayout();
    if(view==='home'&&lay==='window')centerRails();
    if(view==='home'&&lay==='suite')suiteMount();
    return r;
  };
  var ls0=ledSet;
  ledSet=function(){var r=ls0.apply(this,arguments);promptSync();return r;};
  var bs0=Board.prototype.set;
  Board.prototype.set=function(t){var r=bs0.apply(this,arguments);if(this.host&&this.host.id==='bd'){PROMPT.board=t||'';promptSync();}return r;};
  var a0=applyCabin;
  applyCabin=function(){var r=a0.apply(this,arguments);if(cabinLayout()==='suite')suiteFonts();return r;};
})();
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('[data-suite-go]');if(!t)return;
  var p=$('suitePages'),i=parseInt(t.getAttribute('data-suite-go'),10)||0;
  if(p)p.scrollTo({top:i*p.clientHeight,behavior:reduceMotion?'auto':'smooth'});
});
if(cabinLayout()==='suite')suiteFonts();
