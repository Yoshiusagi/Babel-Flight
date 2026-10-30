/* ================= FLIGHT ENGINE ================= */
var PRAISE=['正解！','ナイス！','その調子！','いい感じ！','完璧！'];
function dat(it){return UNITS[F.lang][it.uid].items[it.i];}
function isLong(d){return d.t.length>40;}
function tokensOf(t){return t.split(' ');}
function bTok(d){return tokensOf(d.s||d.t);}
function canDo(kind,it){
  var d=dat(it),LG=LANGS[F.lang];
  if(kind==='listen')return ttsAvail(LG.tts)&&!isLong(d);
  if(kind==='listenjp')return ttsAvail(LG.tts);
  if(kind==='build'){var n=bTok(d).length;return n>=3&&n<=8;}
  if(kind==='type')return F.lang!=='ko'&&!LANGS[F.lang].noType&&d.t.length<=34&&save.level!=='beg';
  if(kind==='cloze')return !!clozeKey(d);
  return true;
}
function firstOK(list,it,avoid){
  for(var i=0;i<list.length;i++){if(list[i]!==avoid&&canDo(list[i],it))return list[i];}
  return avoid==='j2t'?'t2j':'j2t';
}
var ROUND2={beg:['listenjp','build','j2t','listen'],mid:['listen','build','type','j2t'],adv:['type','build','listen','j2t']};
function round2Kind(it,n){
  var d=dat(it);
  if(isLong(d))return firstOK(n%2?['j2t','listenjp']:['listenjp','j2t'],it);
  var order=ROUND2[save.level]||ROUND2.mid,k=order[n%4];
  return canDo(k,it)?k:firstOK(['j2t','build','listen'],it);
}
var MODE_TITLE={review:'復習',free:'自由練習',weak:'弱点コース',ann:'リスニング特訓',skip:'飛び級テスト',rem:'補習フライト',ai:'AIの例文練習',lounge:'プラチナラウンジ'};
function startFlight(opts){
  var items=opts.items,q=[];
  F={mode:opts.mode,lang:opts.lang,uid:opts.uid,items:items,queue:q,idx:0,mist:0,corr:0,wrong:{},retry:{},cur:null,answered:false,
     wDone:0,wTotal:0,prog:0,back:(view==='review'?'review':'home'),opts:[],optR:[],ci:-1,build:null,peeked:false};
  if(opts.mode==='unit'){
    shuffle(items).forEach(function(it){q.push({k:'t2j',it:it,w:1});});
    shuffle(items).forEach(function(it,n){q.push({k:round2Kind(it,n),it:it,w:1});});
  }else if(opts.mode==='skip'||opts.mode==='lounge'){
    /* harder forms only: no "choose the meaning" warm-up */
    var sk=['cloze','j2t','build','type','listen','j2t'];
    items.forEach(function(it,n){var k=sk[n%sk.length];q.push({k:canDo(k,it)?k:firstOK(['j2t','build','listen'],it),it:it,w:1});});
  }else if(opts.mode==='rem'){
    /* each weak phrase three times, in three different forms */
    [['cloze','j2t'],['build','listen','listenjp'],['type','listen','j2t']].forEach(function(round){
      shuffle(items).forEach(function(it){q.push({k:firstOK(round,it),it:it,w:1});});
    });
  }else if(opts.mode==='ai'){
    items.forEach(function(it,n){var x=opts.qs[n],all=shuffle([x.jp].concat(x.wrong));q.push({k:'aiq',it:it,w:1,opts:all,ci:all.indexOf(x.jp)});});
  }else if(opts.mode==='ann'){
    shuffle(items).forEach(function(it){q.push({k:canDo('listenjp',it)?'listenjp':'t2j',it:it,w:1});});
  }else{
    var kinds=['t2j','listen','j2t','build','type'];
    shuffle(items).forEach(function(it,n){var k=kinds[n%5];q.push({k:canDo(k,it)?k:'j2t',it:it,w:1});});
  }
  q.forEach(function(x){F.wTotal+=x.w;});
  view='flight';
  var LG=LANGS[F.lang],title=opts.mode==='unit'?unitTitle(opts.uid):(opts.mode==='skip'||opts.mode==='rem')?MODE_TITLE[opts.mode]+': '+unitTitle(opts.uid):MODE_TITLE[opts.mode];
  var id=(opts.mode==='unit'||opts.mode==='skip'||opts.mode==='rem')?flightNo(F.lang,opts.uid):'BF'+(ORDER.indexOf(F.lang)+1)+'XX';
  rootEl.style.setProperty('--lc','var(--c-'+F.lang+')');
  $('tabs').hidden=true;
  $('main').innerHTML=
    '<div class="fl-top"><button class="x" type="button" data-abort aria-label="やめる">'+closeIcon()+'</button>'+
    '<div class="fl-id"><span class="lbl">'+id+' → '+LG.code+' ・ '+esc(LG.name)+'</span><b>'+esc(title)+'</b></div><div class="turb" id="turb">ミス 0</div></div>'+
    '<div class="profile"><svg viewBox="0 0 320 62" aria-hidden="true"><g stroke="var(--line)" stroke-width="1"><line x1="8" y1="52" x2="312" y2="52"/><line x1="8" y1="10" x2="312" y2="10" stroke-dasharray="2 4"/></g>'+
    '<path id="ppath" d="M8 52L40 52C70 52 78 14 110 14L210 14C242 14 250 52 280 52L312 52" fill="none" stroke="var(--ink2)" stroke-width="2" stroke-dasharray="2 5" stroke-linecap="round" opacity=".6"/>'+
    '<path id="pdone" d="M8 52L40 52C70 52 78 14 110 14L210 14C242 14 250 52 280 52L312 52" pathLength="1" fill="none" stroke="var(--lc)" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="0 2" style="transition:stroke-dasharray .6s ease"/>'+
    '<g id="pp" style="transition:transform .6s ease"><path d="'+PLANE_D+'" fill="var(--ink)" stroke="var(--bg)" stroke-width="1.8" paint-order="stroke"/></g></svg></div>'+
    '<div class="phase"><span id="phl">地上走行</span><span id="phr">FL000 ・ 1/'+q.length+'問</span></div>'+
    '<div id="bd" class="board"></div><div id="led" class="led"></div><div id="q" class="q"></div><div class="pad-b"></div>';
  board=new Board($('bd'));board.minCols=lfc(F.lang)?9:13;board.set('');
  window.scrollTo(0,0);
  var cc=opts.mode==='unit'?cityFor(F.lang,Math.max(0,pathIds(F.lang).indexOf(opts.uid))):null;
  cineTakeoff({no:id,code:LG.code,city:cc?cc[0]:LG.cityEn,cityJp:cc?cc[1]:LG.city,title:title},function(){if(F&&view==='flight')showStep();});
}
function updateProfile(){
  var p=$('ppath'),pd=$('pdone'),pp=$('pp');if(!p||!F)return;
  F.prog=Math.max(F.prog,clamp(F.wDone/F.wTotal,0,1));
  var t=F.prog,len=p.getTotalLength(),s=t*len,a=p.getPointAtLength(s),b=p.getPointAtLength(Math.min(len,s+1)),ang=Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI;
  if(t>=0.999)ang=0;
  pp.style.transform='translate('+a.x.toFixed(1)+'px,'+a.y.toFixed(1)+'px) rotate('+ang.toFixed(1)+'deg) scale(.9)';
  pd.setAttribute('stroke-dasharray',t.toFixed(4)+' 2');
  var ph=t<0.1?'地上走行':t<0.35?'上昇中':t<0.66?'巡航中':t<0.9?'降下中':'着陸';
  var fl=Math.round(clamp((52-a.y)/38,0,1)*39)*10;
  $('phl').textContent=ph;
  $('phr').textContent='FL'+('00'+fl).slice(-3)+' ・ '+Math.min(F.idx+1,F.queue.length)+'/'+F.queue.length+'問';
  var tb=$('turb');tb.textContent='ミス '+F.mist;tb.className='turb'+(F.mist>0?' hot':'');
}
function ledSet(main,sub){$('led').innerHTML='<div class="m">'+esc(main)+'</div>'+(sub?'<div class="s">'+esc(sub)+'</div>':'');}
function koCls(){return lfc(F.lang)?' '+lfc(F.lang):'';}
function hearBtns(){return '<div class="row2"><button class="sq" type="button" data-hear>'+speakerIcon()+'聞く</button><button class="sq" type="button" data-slow>'+speakerIcon()+'ゆっくり</button></div>';}
var POOL={};
function langPool(L){
  if(POOL[L])return POOL[L];
  var a=[];ALL_IDS[L].forEach(function(uid){var u=UNITS[L][uid];if(u.kind!=='scene'){var g=u.track;u.items.forEach(function(x){x._g=g;a.push(x);});}});
  return (POOL[L]=a);
}
function tooClose(a,b){var na=normLoose(a),nb=normLoose(b);if(!na||!nb)return true;if(na.indexOf(nb)>=0||nb.indexOf(na)>=0)return true;return simScore(a,b)>0.8;}
var GPOOL={};
function grpPool(L,g){var k=L+':'+g;if(GPOOL[k])return GPOOL[k];return (GPOOL[k]=langPool(L).filter(function(x){return x._g===g;}));}
function optsFor(it,field){
  var d=dat(it),key=field==='jp'?'jp':'t',right=d[key],len=Math.max(1,right.length),seen={},picks=[];
  seen[right]=1;
  function take(src,max,strict){
    shuffle(src).some(function(x){
      if(picks.length>=max)return true;
      var v=x[key];if(seen[v]||tooClose(v,right))return false;
      var r=v.length/len;if(strict&&(r<0.6||r>1.65))return false;
      seen[v]=1;picks.push(x);return false;
    });
  }
  /* 1-2 look-alikes from the same course keep the level; the rest come from anywhere in the language */
  take(grpPool(F.lang,UNITS[F.lang][it.uid].track),lookAlikes(F.lang),true);
  take(langPool(F.lang),3,true);
  take(langPool(F.lang),3,false);
  var all=shuffle(picks.concat([d]));
  F.opts=all.map(function(x){return x[key];});
  F.optR=all.map(function(x){return field==='t'?x.r:'';});
  F.ci=all.indexOf(d);
}
function optsHTML(cls){
  var showR=save.level==='beg'&&LANGS[F.lang].hasYomi;
  return '<div class="opts">'+F.opts.map(function(o,i){
    return '<button class="opt'+cls+'" type="button" data-opt="'+i+'"><span class="on">'+(i+1)+'</span>'+esc(o)+(showR&&F.optR[i]?'<small class="oy">'+esc(F.optR[i])+'</small>':'')+'</button>';
  }).join('')+'</div>';
}
function newTag(it){return itemRec(F.lang,it.uid,it.i).b===0?'<span class="newtag">NEW</span>':'';}
function showStep(){
  var q=F.queue[F.idx];
  if(!q){land();return;}
  F.cur=q;F.answered=false;F.build=null;F.peeked=false;F.shownAt=performance.now();closeSheet();
  var d=dat(q.it),LG=LANGS[F.lang],box=$('q'),beg=save.level==='beg';
  updateProfile();
  var tag=newTag(q.it);
  if(q.k==='t2j'){
    board.set(d.t);ledSet('? ? ?',beg&&d.r?'読み: '+d.r:'意味を選ぼう');optsFor(q.it,'jp');
    box.innerHTML='<span class="qh">意味はどれ？'+tag+'</span>'+hearBtns()+optsHTML('');
    if(beg)speak(d.t,LG.tts,false);
  }else if(q.k==='cloze'){
    q.ck=q.ck||clozeKey(d);var co=clozeOpts(F.lang,q.ck);F.opts=co.opts;F.optR=[];F.ci=co.ci;
    board.set('');ledSet(d.jp,'空らんに入る語はどれ？');
    box.innerHTML='<span class="qh">穴埋め'+tag+'</span><div class="cloze'+koCls()+'">'+clozeHTML(q.ck)+'</div>'+optsHTML(koCls());
  }else if(q.k==='aiq'){
    F.opts=q.opts;F.optR=[];F.ci=q.ci;
    board.set(d.t);ledSet('? ? ?','AIが作った例文。意味はどれ？');
    box.innerHTML='<span class="qh">AIの例文<span class="newtag">AI</span></span>'+hearBtns()+optsHTML('');
    if(beg)speak(d.t,LG.tts,false);
  }else if(q.k==='j2t'){
    board.set('');ledSet(d.jp,'これを'+LG.name+'で言うと？');optsFor(q.it,'t');
    box.innerHTML='<span class="qh">言い方を選ぼう'+tag+'</span>'+optsHTML(koCls());
  }else if(q.k==='listen'||q.k==='listenjp'){
    var jp=q.k==='listenjp';
    board.set('');ledSet('♪ ♪ ♪',jp?'聞こえた内容に合うものは？':'聞こえた文を選ぼう');optsFor(q.it,jp?'jp':'t');
    box.innerHTML='<span class="qh">リスニング'+tag+'</span><div class="row2"><button class="sq big" type="button" data-hear>'+speakerIcon()+'もう一度聞く</button><button class="sq" type="button" data-slow>ゆっくり</button></div>'+
      optsHTML(jp?'':koCls())+'<button class="sq" type="button" data-peek>音が聞こえない？ 文字を見る</button>';
    speak(d.t,LG.tts,false);
  }else if(q.k==='build'){
    var tk=bTok(d),sh=shuffle(tk),tries=0;
    while(sh.join(' ')===tk.join(' ')&&tries++<8)sh=shuffle(tk);
    F.build={tokens:sh,placed:[]};
    board.set('');ledSet(d.jp,'単語を正しい順に並べよう');
    box.innerHTML='<span class="qh">並べ替え'+tag+'</span><div id="tray" class="tray"></div><div id="bank" class="bank"></div>'+
      '<div class="row2"><button class="sq" type="button" data-clear>やり直し</button><button class="go" id="chk" type="button" data-check style="flex:1;width:auto;margin:0">答え合わせ</button></div>';
    drawBuild();
  }else if(q.k==='type'){
    board.set('');ledSet(d.jp,'つづりを入力しよう');
    var skel=d.t.split(' ').map(function(w){return w.split('').map(function(ch){return /[A-Za-zÀ-ÿ0-9]/.test(ch)?'_':ch;}).join(' ');}).join('    ');
    box.innerHTML='<span class="qh">入力'+tag+'</span><div class="skel" aria-hidden="true">'+esc(skel)+'</div>'+
      '<input id="ans" class="typebox" type="text" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" lang="'+LG.tts.slice(0,2)+'" aria-label="答えを入力">'+
      '<div class="row2"><button class="sq" type="button" data-hear>'+speakerIcon()+'聞く</button><button class="go" type="button" data-check style="flex:1;width:auto;margin:0">答え合わせ</button></div>';
    var inp=$('ans');setTimeout(function(){try{inp.focus({preventScroll:true});}catch(e){}},60);
  }
}
function drawBuild(){
  var b=F.build,ko=koCls();
  $('tray').innerHTML=b.placed.map(function(ti,pos){return '<button class="tile'+ko+'" type="button" data-untile="'+pos+'">'+esc(b.tokens[ti])+'</button>';}).join('');
  $('bank').innerHTML=b.tokens.map(function(t,ti){var used=b.placed.indexOf(ti)>=0;return '<button class="tile'+ko+(used?' used':'')+'" type="button" data-tile="'+ti+'"'+(used?' tabindex="-1" aria-hidden="true"':'')+'>'+esc(t)+'</button>';}).join('');
  $('chk').disabled=b.placed.length===0;
}
function normAns(s){return s.toLowerCase().replace(/ı/g,'i').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9\s]/g,'').replace(/\s+/g,' ').trim();}
function pushRetry(q){
  if(F.mode==='skip'||F.mode==='ai')return;
  var key=ik(q.it.uid,q.it.i);
  if((F.retry[key]||0)>=2)return;
  F.retry[key]=(F.retry[key]||0)+1;
  var d=dat(q.it),list=isLong(d)?['listenjp','t2j','j2t']:['j2t','t2j','build','listen'];
  F.queue.push({k:firstOK(list,q.it,q.k),it:q.it,w:1,retry:true});F.wTotal+=1;
}
function judge(ok){
  if(F.answered)return;F.answered=true;
  var q=F.cur,d=dat(q.it),key=ik(q.it.uid,q.it.i);
  if(ok){F.corr++;chimeOK();fxGood();}
  else{F.mist++;fxBad();F.wrong[key]=(F.wrong[key]||0)+1;chimeBad();buzz(40);pushRetry(q);}
  if(typeof repNote==='function')repNote(F.lang,q.k,ok);
  board.set(d.t);ledSet(d.jp,d.r);
  updateProfile();
  var h='<div class="sheet'+(ok?'':' bad')+'" role="status"><div class="sheet-in"><h3>'+(ok?PRAISE[Math.floor(Math.random()*PRAISE.length)]:'おしい！ 正解はこちら')+'</h3>'+
    '<div class="ans'+koCls()+'"><b>'+esc(d.t)+'</b><br><span class="dim" style="font-size:13px">'+(d.r?esc(d.r)+' ・ ':'')+esc(d.jp)+'</span></div>'+
    (d.n?'<div class="note"><b>ワンポイント</b>'+esc(d.n)+'</div>':'')+
    aiBtnHTML()+(typeof pronBoxHTML==='function'?pronBoxHTML():'')+
    '<div class="row2"><button class="sq" type="button" data-hear aria-label="発音を聞く">'+speakerIcon()+'</button>'+
    '<button class="go" type="button" data-next style="flex:1;width:auto;margin:0">次へ</button></div></div></div>';
  $('sheetHost').innerHTML=h;
}
function closeSheet(){aiStop();var s=$('sheetHost');if(s)s.innerHTML='';}
/* ---- tap guard ---- */
var TAP_GUARD_MS=500,PRESS={el:null,t:0};
function answerEl(t){return t&&t.closest?t.closest('.opt,[data-tile],[data-untile],[data-check],[data-clear]'):null;}
function answerReady(at){return !!F&&(at||performance.now())-(F.shownAt||0)>=TAP_GUARD_MS;}
document.addEventListener('pointerdown',function(e){PRESS={el:answerEl(e.target),t:performance.now()};},true);
document.addEventListener('click',function(e){
  if(view!=='flight'||!F)return;
  var el=answerEl(e.target);if(!el)return;
  /* a mouse/finger press must begin on this same answer, after the question has been up for 0.5 s; keyboard presses (detail 0) only need the 0.5 s */
  var ok=e.detail===0?answerReady():(PRESS.el===el&&answerReady(PRESS.t));
  if(!ok){e.preventDefault();e.stopImmediatePropagation();}
},true);
function onOption(i){
  if(F.answered||!F.cur)return;
  var btns=document.querySelectorAll('.opt'),ok=(i===F.ci);
  for(var k=0;k<btns.length;k++){btns[k].disabled=true;if(k===F.ci)btns[k].classList.add('ok');else if(k===i)btns[k].classList.add('no');else btns[k].classList.add('off');}
  judge(ok);
}
function onCheck(){
  if(F.answered||!F.cur)return;
  var d=dat(F.cur.it),k=F.cur.k,ok=false;
  if(k==='build'){
    if(!F.build.placed.length)return;
    ok=F.build.placed.map(function(ti){return F.build.tokens[ti];}).join(' ')===bTok(d).join(' ');
  }else if(k==='type'){
    var v=$('ans').value;if(!v.trim())return;
    ok=normAns(v)===normAns(d.t);$('ans').disabled=true;
  }
  judge(ok);
}
function nextStep(){
  if(!F||!F.cur||!F.answered)return;
  F.wDone+=F.cur.w;F.idx++;closeSheet();
  if(F.idx>=F.queue.length){land();return;}
  window.scrollTo(0,0);showStep();cloudPass();
}
/* between questions: clouds sweep past and the next question fades in (skipped with reduced motion) */
function cloudPass(){
  if(reduceMotion)return;
  var old=document.querySelector('.qcloud');if(old&&old.parentNode)old.parentNode.removeChild(old);
  var c=document.createElement('div');c.className='qcloud';c.setAttribute('aria-hidden','true');
  c.innerHTML='<span></span><span></span><span></span><span></span><span></span>';
  document.body.appendChild(c);
  var q=$('q');if(q){q.classList.remove('qin');void q.offsetWidth;q.classList.add('qin');}
  setTimeout(function(){if(c.parentNode)c.parentNode.removeChild(c);},650);
}
function abortAsk(){
  $('sheetHost').innerHTML='<div class="sheet bad" role="alertdialog" aria-label="終了の確認"><div class="sheet-in"><h3>このレッスンをやめますか？</h3><p class="dim" style="font-size:14px">ここまでの記録は保存されません。</p>'+
    '<div class="row2"><button class="ghost" type="button" data-abort-no style="flex:1">続ける</button><button class="ghost danger" type="button" data-abort-yes style="flex:1">やめる</button></div></div></div>';
}
function leaveFlight(){
  try{speechSynthesis.cancel();}catch(e){}
  var back=F&&F.back==='review'?'review':'home';
  F=null;board=null;closeSheet();view=back;render();window.scrollTo(0,0);
}

function startUnitFlight(uid){
  var L=save.lang,u=UNITS[L][uid];if(!u)return;
  startFlight({mode:'unit',lang:L,uid:uid,items:u.items.map(function(x,i){return {uid:uid,i:i};})});
}
function startMode(kind){
  var L=save.lang,items=[];
  if(kind==='review')items=dueList(L).slice(0,10).map(function(x){return {uid:x.uid,i:x.i};});
  else if(kind==='weak')items=weakList(L).slice(0,10).map(function(x){return {uid:x.uid,i:x.i};});
  else if(kind==='ann'){var u=UNITS[L]['pilot-ann'];items=u?u.items.map(function(x,i){return {uid:'pilot-ann',i:i};}):[];}
  else items=shuffle(learnedList(L)).slice(0,10);
  if(!items.length)return;
  startFlight({mode:kind,lang:L,items:items});
}
