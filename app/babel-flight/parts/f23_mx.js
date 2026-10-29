/* ================= 本番形式の模試 (英検 5級〜1級, test account only for now) =================
   The real exam's order, question counts and timing: 筆記 (リーディング → ライティング, one timer
   for both) and then リスニング (read aloud by the browser, once or twice like the real test, with
   the real answer time). Each test is an original one built from babel-flight/mock/*.py into
   public/mx/<key>.json and loaded only when opened. Writing is self-checked against a model answer
   for now (AI marking comes with the interview practice). Progress survives a reload. */
var MX_GRADES=[['ek5','5級'],['ek4','4級'],['ek3','3級'],['ekp2','準2級'],['ekp2p','準2級プラス'],['ek2','2級'],['ekp1','準1級'],['ek1','1級']];
var MX_RUNKEY='babelflight.mxrun',MX_HISTKEY='babelflight.mxhist';
var MX={key:'',data:null,loading:false,err:'',stage:'',mode:'full',sec:'R',page:0,ans:{},wr:{},self:{},left:0,tm:0,lp:0,lq:null,tok:0,paused:false,phase:'',cd:0,done:{}};
var MX_DIR={
  gap:'(　)に入れるのに最も適切なものを1, 2, 3, 4の中から一つ選びなさい。',
  dgap:'会話について、(　)に入れるのに最も適切なものを1, 2, 3, 4の中から一つ選びなさい。',
  order:'日本文の意味を表すように①から順に並べかえて(　)の中に入れなさい。そして、2番目と4番目にくるものの最も適切な組合せを1, 2, 3, 4の中から一つ選びなさい。',
  pgap:'次の英文を読み、その文意にそって( )に入れるのに最も適切なものを1, 2, 3, 4の中から一つ選びなさい。',
  passage:'次の英文の内容に関して、質問に対する答えとして最も適切なもの、または文を完成させるのに最も適切なものを1, 2, 3, 4の中から一つ選びなさい。',
  resp:'イラストを参考にしながら英文を聞き、その応答として最も適切なものを1, 2, 3の中から一つ選びなさい。',
  resp0:'会話を聞き、最後の発話に対する応答として最も適切なものを1, 2, 3の中から一つ選びなさい。',
  dlg:'会話とその内容に関する質問を聞き、その答えとして最も適切なものを一つ選びなさい。',
  picsent:'3つの英文を聞き、イラストの動作や状況を正しく表しているものを一つ選びなさい。',
  mono:'英文とその内容に関する質問を聞き、その答えとして最も適切なものを一つ選びなさい。',
  real:'SituationとQuestionを読む時間が10秒あります。そのあと英文が流れます。答えとして最も適切なものを一つ選びなさい。',
  interview:'インタビューを聞き、質問に対する答えとして最も適切なものを一つ選びなさい。'
};
var MX_WRITE={email:1,opinion:1,summary:1};
var MX_NUM=['One','Two','Three','Four'];
var MX_AXES=['内容','構成','語彙','文法'];
function mxOn(){return save.lang==='en'&&cabinLv()>=3;}
function mxGradeName(k){var g=MX_GRADES.filter(function(x){return x[0]===k;})[0];return g?'英検'+g[1]:'';}
function mxPass(k){return (k==='ekp1'||k==='ek1')?70:60;}
function mxWords(s){var m=String(s||'').match(/[A-Za-z0-9]+(?:['’\-][A-Za-z0-9]+)*/g);return m?m.length:0;}
function mxLoadJSON(k,d){try{var v=JSON.parse(localStorage.getItem(k)||'null');return v&&typeof v==='object'?v:d;}catch(e){return d;}}
function mxSaveJSON(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}

/* ---- the questions of a test, flattened: ids, numbers, pages ---- */
function mxIndex(d){
  var R=d.sections[0],L=d.sections[1],rq=[],pages=[],lq=[],n=0;
  R.parts.forEach(function(p,pi){
    if(MX_WRITE[p.type]){pages.push({pi:pi,w:true});return;}
    if(p.items)p.items.forEach(function(it,ii){var id='R'+pi+'.'+ii;rq.push({id:id,no:++n,pi:pi,q:it});pages.push({pi:pi,ii:ii,ids:[id]});});
    if(p.blocks)p.blocks.forEach(function(b,bi){var ids=[];b.qs.forEach(function(q,qi){var id='R'+pi+'.'+bi+'.'+qi;ids.push(id);rq.push({id:id,no:++n,pi:pi,q:q,b:b});});pages.push({pi:pi,bi:bi,ids:ids});});
  });
  n=0;
  L.parts.forEach(function(p,pi){
    p.items.forEach(function(it,ii){
      var qs=it.qs||[it];
      qs.forEach(function(q,qi){lq.push({id:'L'+pi+'.'+ii+'.'+qi,no:++n,pi:pi,ii:ii,qi:qi,q:q,it:it,p:p,first:ii===0&&qi===0,lastQ:qi===qs.length-1});});
    });
  });
  return {rq:rq,pages:pages,lq:lq};
}

/* ---- loading and the run kept in this browser ---- */
function mxOpen(k){
  if(!mxOn())return;
  closeSheet();mxStop();
  MX.key=k;MX.data=null;MX.err='';MX.stage='intro';MX.loading=true;
  go('mx');
  fetch(bfSiteUrl('/mx/'+k+'.json'),{cache:'no-cache'}).then(function(r){if(!r.ok)throw new Error('http');return r.json();}).then(function(d){
    if(MX.key!==k)return;
    MX.data=d;MX.ix=mxIndex(d);MX.loading=false;if(view==='mx')render();
  }).catch(function(){if(MX.key!==k)return;MX.loading=false;MX.err='問題を読み込めませんでした。電波を確認して、もう一度開いてね。';if(view==='mx')render();});
}
function mxRun(){var r=mxLoadJSON(MX_RUNKEY,null);return r&&r.key?r:null;}
function mxKeep(){
  if(!MX.data||MX.stage==='intro'||MX.stage==='result')return;
  mxSaveJSON(MX_RUNKEY,{key:MX.key,mode:MX.mode,stage:MX.stage==='listen'?'lintro':MX.stage,sec:MX.sec,page:MX.page,ans:MX.ans,wr:MX.wr,left:Math.max(0,Math.round(MX.left)),lp:MX.lp,t:Date.now()});
}
function mxForget(){try{localStorage.removeItem(MX_RUNKEY);}catch(e){}}
function mxStart(mode,resume){
  if(!MX.data)return;
  mxStop();
  var R=MX.data.sections[0];
  MX.mode=mode;MX.ans={};MX.wr={};MX.self={};MX.page=0;MX.lp=0;MX.done={};MX.paused=false;
  if(resume){MX.mode=resume.mode;MX.ans=resume.ans||{};MX.wr=resume.wr||{};MX.page=resume.page||0;MX.lp=resume.lp||0;MX.left=resume.left||R.time;MX.sec=resume.sec||'R';MX.stage=resume.stage==='test'?'test':'lintro';}
  else if(mode==='L'){MX.sec='L';MX.stage='lintro';}
  else{MX.sec='R';MX.stage='test';MX.left=R.time;}
  if(MX.stage==='test')mxClock();
  render();window.scrollTo(0,0);mxKeep();
}
function mxStop(){clearInterval(MX.tm);MX.tm=0;mxHush();}
function mxClock(){
  clearInterval(MX.tm);
  var last=Date.now();
  MX.tm=setInterval(function(){
    if(view!=='mx'||MX.stage!=='test'){clearInterval(MX.tm);MX.tm=0;return;}
    var now=Date.now();MX.left-=(now-last)/1000;last=now;
    var el=$('mxClock');if(el){el.textContent=fmtSec(Math.max(0,MX.left));el.classList.toggle('low',MX.left<300);}
    if(Math.round(MX.left)%5===0)mxKeep();
    if(MX.left<=0){MX.timeUp=true;mxEndR();}
  },500);
}
function mxEndR(){
  clearInterval(MX.tm);MX.tm=0;MX.done.R=true;
  if(MX.mode==='full'){MX.sec='L';MX.stage='lintro';MX.lp=0;}
  else MX.stage='result';
  if(MX.stage==='result')mxFinish();else mxKeep();
  closeSheet();render();window.scrollTo(0,0);
}

/* ---- 筆記 ---- */
function mxPart(pi){return MX.data.sections[0].parts[pi];}
function mxOptsHTML(id,q,marks){
  var cur=MX.ans[id];
  return '<div class="mx-opts">'+q.o.map(function(o,i){
    return '<button type="button" class="mx-opt" data-mx-a="'+esc(id)+'" data-mx-i="'+i+'" aria-pressed="'+(cur===i)+'"><span class="mx-n">'+(marks?marks[i]:(i+1))+'</span><span>'+esc(o)+'</span></button>';}).join('')+'</div>';
}
function mxText(s){return esc(s).replace(/\n/g,'<br>').replace(/\(　\)/g,'<span class="mx-blank">(　　)</span>');}
function mxPageHTML(){
  var pg=MX.ix.pages[MX.page],p=mxPart(pg.pi),h='',first=MX.ix.pages.findIndex(function(x){return x.pi===pg.pi;})===MX.page;
  h+='<div class="mx-ph"><span class="lbl">'+(pg.w?'ライティング':'リーディング')+'</span><b>'+esc(p.title)+'</b></div>';
  if(first&&!pg.w)h+='<p class="mx-dir">'+esc(p.dir||MX_DIR[p.type]||'')+'</p>';
  if(pg.w)return h+mxWriteHTML(pg.pi,p);
  if(pg.ids.length===1&&p.items){
    var x=MX.ix.rq.filter(function(r){return r.id===pg.ids[0];})[0],it=x.q;
    if(p.type==='order'){
      var marks='①②③④⑤';
      h+='<div class="mx-q"><span class="mx-no">('+x.no+')</span><div><p class="mx-jp">'+esc(it.jp)+'</p>'+
         '<p class="mx-words">'+it.w.map(function(w,i){return '<span><i>'+marks[i]+'</i>'+esc(w)+'</span>';}).join('')+'</p>'+
         '<p class="mx-en">'+esc(it.pre||'')+' <span class="mx-slots">'+it.w.map(function(w,i){return '<span>'+(i===1?'2番目':i===3?'4番目':'')+'</span>';}).join('')+'</span> '+esc(it.post||'')+'</p></div></div>'+mxOptsHTML(x.id,it);
    }else h+='<div class="mx-q"><span class="mx-no">('+x.no+')</span><p>'+mxText(it.q)+'</p></div>'+mxOptsHTML(x.id,it);
    return h;
  }
  var b=p.blocks[pg.bi],gapNo=function(t){return t.replace(/\(\s*(\d+)\s*\)/g,'<span class="mx-blank">( $1 )</span>');};
  var body=(b.kind==='text'?b.body.split(/\n+/).map(function(t){return '<p>'+gapNo(esc(t))+'</p>';}).join(''):gapNo(esc(b.body)).replace(/\n/g,'<br>'));
  h+='<article class="mx-text mx-'+esc(b.kind||'text')+'">'+(b.label?'<span class="mx-lab">'+esc(b.label)+'</span>':'')+(b.title?'<h3>'+esc(b.title)+'</h3>':'')+'<div>'+body+'</div></article>';
  pg.ids.forEach(function(id){
    var x=MX.ix.rq.filter(function(r){return r.id===id;})[0];
    h+='<div class="mx-q"><span class="mx-no">('+x.no+')</span><p>'+(p.type==='pgap'?'( '+x.no+' ) に入るもの':mxText(x.q.q))+'</p></div>'+mxOptsHTML(id,x.q);
  });
  return h;
}
function mxWriteHTML(pi,p){
  var v=MX.wr[pi]||'',n=mxWords(v),lo=p.words[0],hi=p.words[1];
  return '<div class="mx-prompt">'+esc(p.prompt).replace(/\n/g,'<br>')+'</div>'+
    (p.body?'<article class="mx-text mx-'+(p.type==='email'?'email':'text')+'"><div>'+mxBody(p.body,p.type==='summary')+'</div></article>':'')+
    (p.rules?'<ul class="mx-rules">'+p.rules.map(function(r){return '<li>'+esc(r)+'</li>';}).join('')+'</ul>':'')+
    '<textarea class="mx-ta" id="mxTa" data-mx-w="'+pi+'" rows="'+(hi>100?14:hi>50?9:6)+'" spellcheck="false" autocapitalize="sentences" placeholder="ここに英語で書いてね">'+esc(v)+'</textarea>'+
    '<p class="mx-wc" id="mxWc">'+mxWcText(n,lo,hi)+'</p>';
}
/* a passage: paragraphs for essays, line breaks for emails; [words] are the underlined part */
function mxBody(t,paras){
  var u=function(x){return x.replace(/\[([^\]]+)\]/g,'<u>$1</u>');};
  return paras?t.split(/\n+/).map(function(x){return '<p>'+u(esc(x))+'</p>';}).join(''):u(esc(t)).replace(/\n/g,'<br>');
}
function mxWcText(n,lo,hi){return '<b class="'+(n<lo?'under':n>hi?'over':'ok')+'">'+n+'語</b> / 目安 '+lo+'〜'+hi+'語';}
function mxGridHTML(){
  var h='<div class="mx-grid">';
  MX.ix.pages.forEach(function(pg,i){
    if(pg.w){var p=mxPart(pg.pi);h+='<button type="button" class="mx-g w'+((MX.wr[pg.pi]||'').trim()?' on':'')+(i===MX.page?' cur':'')+'" data-mx-page="'+i+'">'+(p.type==='summary'?'要約':p.type==='email'?'Eメール':'英作文')+'</button>';return;}
    pg.ids.forEach(function(id){var x=MX.ix.rq.filter(function(r){return r.id===id;})[0];
      h+='<button type="button" class="mx-g'+(MX.ans[id]!==undefined?' on':'')+(i===MX.page?' cur':'')+'" data-mx-page="'+i+'">'+x.no+'</button>';});
  });
  return h+'</div>';
}
function mxTestHTML(){
  var P=MX.ix.pages,last=MX.page>=P.length-1,answered=Object.keys(MX.ans).filter(function(k){return k.charAt(0)==='R';}).length;
  return '<div class="mx-bar"><button type="button" class="mx-x" data-mx-quit aria-label="中断">✕</button><div class="mx-bt"><b>'+esc(MX.data.name)+'</b><span>'+esc(MX.data.sections[0].title)+'</span></div>'+
    '<div class="mx-clock" id="mxClock" role="timer" aria-label="残り時間">'+fmtSec(Math.max(0,MX.left))+'</div></div>'+
    '<div class="mx-prog"><button type="button" class="ghost sm" data-mx-grid>解答状況 '+answered+'/'+MX.ix.rq.length+'</button><span class="dim">'+(MX.page+1)+' / '+P.length+'ページ</span></div>'+
    '<section class="mx-page">'+mxPageHTML()+'</section>'+
    '<div class="mx-nav"><button type="button" class="ghost" data-mx-prev'+(MX.page===0?' disabled':'')+'>前へ</button>'+
    (last?'<button type="button" class="go" data-mx-endr>'+(MX.mode==='full'?'筆記を終えてリスニングへ':'筆記を終える')+'</button>':'<button type="button" class="go" data-mx-next>次へ</button>')+'</div>';
}

/* ---- リスニング: the browser reads it, once or twice like the real test ---- */
var MXV={m:null,w:null};
function mxVoices(){
  var vs=(tts.voices||[]).filter(function(v){return /^en[-_](US|GB|AU|CA)/i.test(v.lang||'');});
  var male=/male|daniel|alex|fred|tom|aaron|arthur|gordon|rishi|ralph|eddy|reed|guy|david|mark|james|oliver/i,
      female=/female|samantha|karen|moira|tessa|victoria|susan|zira|kate|serena|martha|catherine|nicky|flo|sandy|shelley|allison|ava|jenny|aria|libby|sonia|emma/i;
  MXV.m=vs.filter(function(v){return male.test(v.name)&&!/female/i.test(v.name);})[0]||null;
  MXV.w=vs.filter(function(v){return female.test(v.name);})[0]||null;
  if(!MXV.w)MXV.w=vs.filter(function(v){return v!==MXV.m;})[0]||null;
  if(!MXV.m)MXV.m=vs.filter(function(v){return v!==MXV.w;})[0]||MXV.w;
}
function mxRate(){var k=MX.key;return k==='ek5'||k==='ek4'?0.82:k==='ek3'?0.86:k==='ekp2'||k==='ekp2p'?0.9:0.95;}
function mxHush(){MX.tok++;clearInterval(MX.cd);MX.cd=0;try{speechSynthesis.cancel();}catch(e){}}
function mxSay(text,who,tok,done){
  if(tok!==MX.tok)return;
  if(!tts.ok){setTimeout(function(){if(tok===MX.tok)done();},Math.min(9000,600+mxWords(text)*380));return;}
  var u=new SpeechSynthesisUtterance(text),v=(who==='M'||who==='B')?MXV.m:MXV.w,fired=false;
  u.lang='en-US';if(v)u.voice=v;
  u.rate=mxRate();u.pitch=who==='B'||who==='G'?1.3:who==='M'?(MXV.m&&MXV.m!==MXV.w?1:0.8):who==='N'?1:1.1;
  var fin=function(){if(fired)return;fired=true;clearTimeout(guard);if(tok===MX.tok)setTimeout(function(){if(tok===MX.tok)done();},350);};
  var guard=setTimeout(fin,2500+mxWords(text)*650/mxRate());
  u.onend=fin;u.onerror=fin;
  try{speechSynthesis.speak(u);}catch(e){fin();}
}
function mxSeq(steps,tok,done){
  var i=0;
  (function next(){
    if(tok!==MX.tok)return;
    if(i>=steps.length){done();return;}
    var s=steps[i++];
    if(s.wait){setTimeout(function(){if(tok===MX.tok)next();},s.wait);return;}
    if(s.phase){MX.phase=s.phase;mxLRefresh();next();return;}
    mxSay(s.say,s.who,tok,next);
  })();
}
function mxLItem(){return MX.ix.lq[MX.lp];}
function mxLSteps(x){
  var it=x.it,p=x.p,st=[],reps=p.play||1,i,r;
  var talk=function(){it.lines.forEach(function(l){st.push({say:l[1],who:l[0]});});};
  for(r=0;r<reps;r++){
    st.push({phase:reps>1?(r===0?'1回目':'2回目'):'放送中'});
    if(p.type==='picsent'){x.q.o.forEach(function(o,j){st.push({say:MX_NUM[j]+'. '+o,who:'N'});st.push({wait:500});});}
    else{
      talk();
      if(p.read){x.q.o.forEach(function(o,j){st.push({wait:400});st.push({say:MX_NUM[j]+'. '+o,who:'N'});});}
      else if(x.q.q&&p.type!=='real'&&p.type!=='interview')st.push({wait:500},{say:'Question. '+x.q.q,who:'N'});
    }
    if(r<reps-1)st.push({wait:1800});
  }
  return st;
}
function mxListen(){
  var x=mxLItem();if(!x){mxEndL();return;}
  mxHush();var tok=MX.tok;MX.paused=false;MX.answerLeft=0;
  if(!MXV.m&&!MXV.w)mxVoices();
  MX.phase=x.p.type==='real'?'読む時間':'';
  render();
  var pre=x.p.type==='real'&&x.qi===0?10000:x.first?2500:900;
  var multi=(x.it.qs||[]).length>1;
  setTimeout(function(){
    if(tok!==MX.tok)return;
    var steps=(multi&&x.qi>0)?[]:mxLSteps(multi?{it:x.it,p:x.p,qi:0,q:{o:[],q:''}}:x);
    var after=function(){
      if(tok!==MX.tok)return;
      /* several questions on one passage: the questions come after the passage */
      var qsteps=[];
      if(multi){qsteps.push({phase:'質問'});if(x.q.q&&x.p.type!=='interview'&&x.p.type!=='real')qsteps.push({wait:500},{say:'Question number '+(x.qi+1)+'. '+x.q.q,who:'N'});}
      mxSeq(qsteps,tok,function(){mxAnswerWindow(tok);});
    };
    mxSeq(steps,tok,after);
  },pre);
  if(x.p.type==='real'&&x.qi===0)mxCountdown(10,tok,'読む時間');
}
function mxCountdown(sec,tok,label){
  clearInterval(MX.cd);MX.answerLeft=sec;MX.phase=label;mxLRefresh();
  MX.cd=setInterval(function(){
    if(tok!==MX.tok){clearInterval(MX.cd);return;}
    MX.answerLeft--;mxLRefresh();
    if(MX.answerLeft<=0)clearInterval(MX.cd);
  },1000);
}
function mxAnswerWindow(tok){
  MX.phase='解答時間';
  var sec=10;
  mxCountdown(sec,tok,'解答時間');
  setTimeout(function(){if(tok===MX.tok)mxNextL();},sec*1000+300);
}
function mxNextL(){mxHush();MX.lp++;mxKeep();if(MX.lp>=MX.ix.lq.length)mxEndL();else mxListen();}
function mxEndL(){mxHush();MX.done.L=true;MX.stage='result';mxFinish();render();window.scrollTo(0,0);}
function mxLRefresh(){
  var el=$('mxPhase');if(el)el.innerHTML=mxPhaseHTML();
}
function mxPhaseHTML(){
  if(MX.paused)return '<b>一時停止中</b>';
  var t=MX.phase||'まもなく放送';
  return '<b>'+esc(t)+'</b>'+(MX.answerLeft>0&&(t==='解答時間'||t==='読む時間')?'<span class="mono"> 残り'+MX.answerLeft+'秒</span>':'');
}
function mxListenHTML(){
  var x=mxLItem();if(!x)return '';
  var p=x.p,it=x.it,h='';
  h+='<div class="mx-bar"><button type="button" class="mx-x" data-mx-quit aria-label="中断">✕</button><div class="mx-bt"><b>'+esc(MX.data.name)+'</b><span>リスニング</span></div><div class="mx-clock">No.'+x.no+'</div></div>';
  h+='<div class="mx-ph"><span class="lbl">第'+(p.no||(x.pi+1))+'部</span><b>'+esc(p.title)+'</b></div>';
  if(x.first)h+='<p class="mx-dir">'+esc(p.dir||(p.type==='resp'&&!it.pic?MX_DIR.resp0:MX_DIR[p.type])||'')+'</p>';
  h+='<div class="mx-live" aria-live="polite"><span class="mx-wave" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span id="mxPhase">'+mxPhaseHTML()+'</span><span class="dim">放送'+(p.play>1?'2回':'1回')+'</span></div>';
  if(it.pic)h+='<div class="mx-pic" role="img" aria-label="イラスト">'+esc(it.pic)+'</div>';
  if(it.situ)h+='<div class="mx-situ"><p><b>Situation:</b> '+esc(it.situ)+'</p><p><b>Question:</b> '+esc(x.q.q)+'</p></div>';
  else if(p.type==='interview')h+='<div class="mx-situ"><p><b>No.'+x.no+'</b> '+esc(x.q.q)+'</p></div>';
  if(!tts.ok)h+='<div class="mx-script"><p class="dim">この端末は読み上げに対応していないので、文字で表示しています。</p>'+it.lines.map(function(l){return '<p>'+esc(l[1])+'</p>';}).join('')+(x.q.q?'<p>Question: '+esc(x.q.q)+'</p>':'')+'</div>';
  var cur=MX.ans[x.id];
  if(p.read)h+='<div class="mx-opts read">'+[0,1,2].map(function(i){return '<button type="button" class="mx-opt" data-mx-a="'+x.id+'" data-mx-i="'+i+'" aria-pressed="'+(cur===i)+'"><span class="mx-n">'+(i+1)+'</span></button>';}).join('')+'</div>';
  else h+=mxOptsHTML(x.id,x.q);
  h+='<div class="mx-nav"><button type="button" class="ghost" data-mx-pause>'+(MX.paused?'再開':'一時停止')+'</button><button type="button" class="ghost" data-mx-skip>次の問題へ</button></div>'+
     '<p class="dim hint">本番と同じく、解答時間がすぎると自動で次の問題へ進みます。</p>';
  return h;
}
function mxLIntroHTML(){
  var L=MX.data.sections[1],resume=MX.lp>0;
  return '<div class="mx-bar"><button type="button" class="mx-x" data-mx-quit aria-label="中断">✕</button><div class="mx-bt"><b>'+esc(MX.data.name)+'</b><span>リスニング</span></div><div class="mx-clock">'+MX.ix.lq.length+'問</div></div>'+
    '<section class="card mx-intro"><h2 class="jh">リスニング</h2>'+(MX.timeUp?'<p class="mx-note">筆記は時間切れで終わりました。</p>':'')+
    '<ul class="mx-list">'+L.parts.map(function(p,i){var n=p.items.reduce(function(s,it){return s+(it.qs?it.qs.length:1);},0);return '<li><b>第'+(i+1)+'部</b> '+esc(p.title)+' <span class="dim">'+n+'問 ・ 放送'+(p.play>1?'2回':'1回')+'</span></li>';}).join('')+'</ul>'+
    '<p class="dim hint">音声はこの端末の読み上げ機能で流れます。音量を確認して、静かな場所でどうぞ。イヤホンがおすすめです。</p>'+
    '<button type="button" class="go" data-mx-lstart>'+(resume?'No.'+(MX.lp+1)+'から再開する':'リスニングを始める')+'</button></section>';
}

/* ---- results ---- */
function mxScore(){
  var r={R:[0,0],L:[0,0],parts:[]};
  MX.data.sections.forEach(function(sec,si){
    sec.parts.forEach(function(p,pi){
      if(MX_WRITE[p.type])return;
      var c=0,n=0,list=si===0?MX.ix.rq:MX.ix.lq;
      list.forEach(function(x){if(x.pi===pi){n++;if(MX.ans[x.id]===x.q.a)c++;}});
      r.parts.push({sec:sec.id,title:p.title,c:c,n:n});
      r[sec.id][0]+=c;r[sec.id][1]+=n;
    });
  });
  return r;
}
function mxFinish(){
  mxForget();
  var s=mxScore(),h=mxLoadJSON(MX_HISTKEY,{}),list=Array.isArray(h[MX.key])?h[MX.key]:[];
  var rec={d:Date.now(),m:MX.mode};
  if(MX.mode!=='L')rec.R=s.R;if(MX.mode!=='R')rec.L=s.L;
  list.unshift(rec);h[MX.key]=list.slice(0,5);mxSaveJSON(MX_HISTKEY,h);
  MX.result=s;
}
function mxPct(a){return a[1]?Math.round(a[0]/a[1]*100):0;}
function mxResultHTML(){
  var s=MX.result||mxScore(),pass=mxPass(MX.key),h='';
  h+='<div class="mx-bar"><button type="button" class="mx-x" data-mx-close aria-label="閉じる">✕</button><div class="mx-bt"><b>'+esc(MX.data.name)+'</b><span>結果</span></div><div class="mx-clock"></div></div>';
  h+='<section class="card mx-res"><h2 class="jh">模試の結果</h2><div class="mx-kpis">';
  [['R','リーディング'],['L','リスニング']].forEach(function(k){
    if(!s[k[0]][1]||(MX.mode==='R'&&k[0]==='L')||(MX.mode==='L'&&k[0]==='R'))return;
    var p=mxPct(s[k[0]]);
    h+='<div class="mx-kpi'+(p>=pass?' ok':'')+'"><span class="lbl">'+k[1]+'</span><b>'+s[k[0]][0]+'<small>/'+s[k[0]][1]+'</small></b><span class="mono">'+p+'%</span></div>';
  });
  h+='</div><p class="dim hint">合格の目安:各技能でおよそ'+pass+'%以上(目安です。本番は英検CSEスコアで判定されます)</p>';
  h+='<ul class="mx-parts">'+s.parts.filter(function(p){return !(MX.mode==='R'&&p.sec==='L')&&!(MX.mode==='L'&&p.sec==='R');}).map(function(p){var v=p.n?Math.round(p.c/p.n*100):0;
    return '<li><span>'+esc(p.title)+'</span><span class="mx-pb"><i style="width:'+v+'%"></i></span><b class="mono">'+p.c+'/'+p.n+'</b></li>';}).join('')+'</ul></section>';
  var W=MX.data.sections[0].parts.map(function(p,pi){return {p:p,pi:pi};}).filter(function(x){return MX_WRITE[x.p.type];});
  if(W.length&&MX.mode!=='L'){
    h+='<section class="card"><h2 class="jh">ライティング(自己採点)</h2><p class="dim hint">模範解答とチェックポイントを見て、観点ごとに0〜4点で採点してみよう。AIの採点は面接練習と一緒に追加予定です。</p>';
    W.forEach(function(x){
      var v=MX.wr[x.pi]||'',n=mxWords(v);
      h+='<div class="mx-wres"><h3>'+esc(x.p.title)+'</h3>'+
        '<p class="lbl">あなたの解答('+n+'語 ・ 目安 '+x.p.words[0]+'〜'+x.p.words[1]+'語)</p><div class="mx-yours">'+(v.trim()?esc(v).replace(/\n/g,'<br>'):'<span class="dim">(未記入)</span>')+'</div>'+
        '<p class="lbl">模範解答</p><div class="mx-model">'+esc(x.p.model).replace(/\n/g,'<br>')+'</div>'+
        '<ul class="mx-checks">'+x.p.checks.map(function(c){return '<li>'+esc(c)+'</li>';}).join('')+'</ul>'+
        '<div class="mx-self">'+MX_AXES.map(function(a,ai){var cur=(MX.self[x.pi]||{})[ai];return '<div><span>'+a+'</span><div class="seg">'+[0,1,2,3,4].map(function(sc){return '<button type="button" data-mx-self="'+x.pi+'.'+ai+'.'+sc+'" aria-pressed="'+(cur===sc)+'">'+sc+'</button>';}).join('')+'</div></div>';}).join('')+
        '<p class="mono" id="mxSelf'+x.pi+'">'+mxSelfText(x.pi)+'</p></div></div>';
    });
    h+='</section>';
  }
  h+='<section class="card"><h2 class="jh">見直し</h2><p class="dim hint">まちがえた問題から見直そう。解説とスクリプトつき。</p><div class="seg mx-rf">'+
    [['wrong','まちがい'],['all','すべて']].map(function(t){return '<button type="button" data-mx-rf="'+t[0]+'" aria-pressed="'+((MX.rf||'wrong')===t[0])+'">'+t[1]+'</button>';}).join('')+'</div><div id="mxReview">'+mxReviewHTML()+'</div></section>';
  h+='<div class="mx-nav"><button type="button" class="ghost" data-mx-again>もう一度</button><button type="button" class="go" data-mx-close>閉じる</button></div>';
  return h;
}
function mxSelfText(pi){var s=MX.self[pi]||{},t=0,n=0;MX_AXES.forEach(function(a,i){if(typeof s[i]==='number'){t+=s[i];n++;}});return n?('合計 '+t+' / 16'+(n<4?'(採点中)':'')):'';}
function mxReviewHTML(){
  var only=(MX.rf||'wrong')==='wrong',h='',any=false;
  var row=function(x,sec){
    var mine=MX.ans[x.id],ok=mine===x.q.a;
    if(only&&ok)return;any=true;
    var o=x.q.o,read=sec==='L'&&x.p.read,pic=sec==='L'&&x.it.pic;
    h+='<div class="mx-rv'+(ok?' ok':' ng')+'"><div class="mx-rvh"><b>'+(sec==='R'?'('+x.no+')':'No.'+x.no)+'</b><span>'+(ok?'正解':mine===undefined?'未解答':'不正解')+'</span></div>';
    if(sec==='R'){
      if(x.q.jp)h+='<p class="mx-jp">'+esc(x.q.jp)+'</p><p>'+esc(x.q.full)+'</p>';
      else if(x.q.q)h+='<p>'+mxText(x.q.q)+'</p>';
      else if(mxPart(x.pi).type==='pgap')h+='<p>( '+x.no+' ) に入るもの</p>';
    }else{
      if(pic)h+='<div class="mx-pic sm">'+esc(x.it.pic)+'</div>';
      h+='<div class="mx-script">'+(x.it.situ?'<p><b>Situation:</b> '+esc(x.it.situ)+'</p>':'')+x.it.lines.map(function(l){return '<p><b>'+esc(l[0]==='N'?'':l[0]+':')+'</b> '+esc(l[1])+'</p>';}).join('')+(x.q.q?'<p><b>Question:</b> '+esc(x.q.q)+'</p>':'')+
        '<button type="button" class="ghost sm" data-mx-replay="'+x.id+'">▶ 聞き直す</button></div>';
    }
    h+='<ol class="mx-ro">'+o.map(function(t,i){return '<li class="'+(i===x.q.a?'a':'')+(i===mine&&!ok?' me':'')+'">'+esc(t)+'</li>';}).join('')+'</ol>';
    h+='<p class="mx-ex">'+esc(x.q.ex||'')+'</p></div>';
  };
  if(MX.mode!=='L')MX.ix.rq.forEach(function(x){row(x,'R');});
  if(MX.mode!=='R')MX.ix.lq.forEach(function(x){row(x,'L');});
  return any?h:'<p class="dim">まちがえた問題はありません。すごい!</p>';
}

/* ---- the grade page ---- */
function mxIntroHTML(){
  var h='<div class="mx-bar"><button type="button" class="mx-x" data-mx-close aria-label="閉じる">✕</button><div class="mx-bt"><b>'+esc(mxGradeName(MX.key))+'</b><span>本番形式の模試</span></div><div class="mx-clock"></div></div>';
  if(MX.loading)return h+'<p class="dim" style="margin-top:20px">問題を読み込み中…</p>';
  if(MX.err)return h+'<p class="mx-note">'+esc(MX.err)+'</p><button type="button" class="ghost" data-mx-open="'+esc(MX.key)+'">もう一度読み込む</button>';
  var d=MX.data,R=d.sections[0],L=d.sections[1],run=mxRun(),hist=(mxLoadJSON(MX_HISTKEY,{})[MX.key]||[]);
  var nR=d.nq.R,nW=d.nq.W,nL=d.nq.L,lmin=MX.key==='ek5'?20:MX.key==='ek4'?30:MX.key==='ekp1'?30:MX.key==='ek1'?35:25;
  h+='<section class="card mx-intro"><h2 class="jh">本番と同じ順番・問題数</h2><ol class="mx-flow">'+
    '<li><b>'+esc(R.title)+'</b><span>'+nR+'問'+(nW?' + 英作文'+nW+'問':'')+' ・ '+(R.time/60)+'分</span></li>'+
    '<li><b>リスニング</b><span>'+nL+'問 ・ 約'+lmin+'分</span></li>'+
    (['ek5','ek4'].indexOf(MX.key)<0?'<li class="soon"><b>二次試験(面接)</b><span>面接練習ができたらここにつながります</span></li>':'')+'</ol>'+
    '<p class="dim hint">問題はすべてBabel Flightのオリジナルです(本番の形式・難しさをまねています)。</p>';
  if(run&&run.key===MX.key)h+='<button type="button" class="go" data-mx-resume>続きから('+(run.stage==='test'?'筆記 残り'+fmtSec(run.left):'リスニング No.'+((run.lp||0)+1))+')</button>';
  h+='<button type="button" class="'+(run&&run.key===MX.key?'ghost':'go')+'" data-mx-start="full">フル模試を始める<small>筆記 → リスニング</small></button>'+
    '<div class="mx-two"><button type="button" class="ghost" data-mx-start="R">'+esc(R.title)+'だけ</button><button type="button" class="ghost" data-mx-start="L">リスニングだけ</button></div></section>';
  if(hist.length)h+='<section class="card"><h2 class="jh">これまでの結果</h2><ul class="mx-hist">'+hist.map(function(r){
    return '<li><span>'+fmtDate(r.d)+'</span>'+(r.R?'<span>筆記 '+r.R[0]+'/'+r.R[1]+'</span>':'')+(r.L?'<span>リスニング '+r.L[0]+'/'+r.L[1]+'</span>':'')+'</li>';}).join('')+'</ul></section>';
  return h;
}
function mxHTML(){
  if(!MX.data||MX.stage==='intro')return mxIntroHTML();
  if(MX.stage==='test')return mxTestHTML();
  if(MX.stage==='lintro')return mxLIntroHTML();
  if(MX.stage==='listen')return mxListenHTML();
  if(MX.stage==='result')return mxResultHTML();
  return '';
}
(function(){
  var r0=render;
  render=function(){
    if(view!=='mx')return r0.apply(this,arguments);
    if(!MX.key){view='home';return r0.apply(this,arguments);}
    $('tabs').hidden=true;
    var main=$('main');main.innerHTML='<div class="mx">'+mxHTML()+'</div>';
    main.classList.remove('enter','enter-l','enter-r');PREVVIEW=view;
  };
})();

/* ---- the entry: 模試 sheet ---- */
(function(){
  var m0=mockSheet;
  mockSheet=function(){
    m0.apply(this,arguments);
    if(!mxOn())return;
    var host=document.querySelector('#sheetHost .sheet-in h3');if(!host)return;
    var hist=mxLoadJSON(MX_HISTKEY,{}),run=mxRun();
    host.insertAdjacentHTML('afterend','<div class="mx-entry"><span class="lbl">本番形式(英検)</span><div class="mx-gs">'+MX_GRADES.map(function(g){
      var last=(hist[g[0]]||[])[0],sub=run&&run.key===g[0]?'続きあり':last&&last.R?'筆記 '+mxPct(last.R)+'%':last&&last.L?'リスニング '+mxPct(last.L)+'%':'';
      return '<button type="button" class="mx-gb" data-mx-open="'+g[0]+'"><b>'+g[1]+'</b>'+(sub?'<small>'+sub+'</small>':'')+'</button>';}).join('')+'</div>'+
      '<p class="dim hint">本番と同じ順番・問題数・時間で解く模試。下はフレーズの問題集から出るミニ模試です。</p></div>');
  };
})();

/* ---- clicks and typing ---- */
function mxConfirm(title,body,yes,no){
  $('sheetHost').innerHTML='<div class="sheet plain" role="alertdialog" aria-label="'+esc(title)+'"><div class="sheet-in"><h3>'+esc(title)+'</h3><p class="dim" style="font-size:14px">'+body+'</p>'+
    '<div class="row2"><button class="ghost" type="button" data-close-sheet style="flex:1">'+esc(no)+'</button><button class="go" type="button" '+yes[0]+' style="flex:1;margin-top:0">'+esc(yes[1])+'</button></div></div></div>';
}
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  var a=function(n){return t.hasAttribute(n);},g=function(n){return t.getAttribute(n);};
  if(a('data-mx-open')){mxOpen(g('data-mx-open'));return;}
  if(view!=='mx'||!MX.data&&!a('data-mx-close'))return;
  if(a('data-mx-close')){mxStop();MX.stage='';MX.key='';go('home');return;}
  if(a('data-mx-start')){mxStart(g('data-mx-start'));return;}
  if(a('data-mx-resume')){var run=mxRun();if(run&&run.key===MX.key)mxStart(run.mode,run);return;}
  if(a('data-mx-a')){
    var id=g('data-mx-a'),i=parseInt(g('data-mx-i'),10);MX.ans[id]=i;
    var box=t.parentNode;Array.prototype.forEach.call(box.querySelectorAll('[data-mx-a]'),function(b){b.setAttribute('aria-pressed',String(b===t));});
    mxKeep();
    var pg=document.querySelector('.mx-prog .ghost');if(pg)pg.textContent='解答状況 '+Object.keys(MX.ans).filter(function(k){return k.charAt(0)==='R';}).length+'/'+MX.ix.rq.length;
    return;
  }
  if(a('data-mx-next')){MX.page=Math.min(MX.ix.pages.length-1,MX.page+1);mxKeep();render();window.scrollTo(0,0);return;}
  if(a('data-mx-prev')){MX.page=Math.max(0,MX.page-1);mxKeep();render();window.scrollTo(0,0);return;}
  if(a('data-mx-grid')){$('sheetHost').innerHTML='<div class="sheet plain" role="dialog" aria-label="解答状況"><div class="sheet-in"><h3>解答状況</h3>'+mxGridHTML()+'<button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';return;}
  if(a('data-mx-page')){MX.page=parseInt(g('data-mx-page'),10)||0;closeSheet();mxKeep();render();window.scrollTo(0,0);return;}
  if(a('data-mx-endr')){
    var left=MX.ix.rq.length-Object.keys(MX.ans).filter(function(k){return k.charAt(0)==='R';}).length;
    mxConfirm('筆記を終えますか?',(left?'まだ<b>'+left+'問</b>答えていません。':'すべて答えました。')+(MX.mode==='full'?'終えるとリスニングに進み、筆記には戻れません。':''),['data-mx-endr-yes','終える'],'見直す');return;
  }
  if(a('data-mx-endr-yes')){MX.timeUp=false;mxEndR();return;}
  if(a('data-mx-lstart')){mxVoices();MX.stage='listen';try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(' ');u.volume=0;speechSynthesis.speak(u);}catch(x){}mxListen();return;}
  if(a('data-mx-pause')){
    if(MX.paused){MX.paused=false;mxListen();}
    else{mxHush();MX.paused=true;render();}
    return;
  }
  if(a('data-mx-skip')){mxNextL();return;}
  if(a('data-mx-quit')){
    mxConfirm('中断しますか?','ここまでの解答はこの端末に保存されます。あとで「続きから」で再開できます。',['data-mx-quit-yes','中断する'],'続ける');
    if(MX.stage==='listen'){mxHush();MX.paused=true;}
    return;
  }
  if(a('data-mx-quit-yes')){mxKeep();mxStop();closeSheet();MX.stage='intro';render();window.scrollTo(0,0);return;}
  if(a('data-mx-self')){var sp=g('data-mx-self').split('.');var pi=+sp[0];MX.self[pi]=MX.self[pi]||{};MX.self[pi][+sp[1]]=+sp[2];
    Array.prototype.forEach.call(t.parentNode.querySelectorAll('button'),function(b){b.setAttribute('aria-pressed',String(b===t));});var st=$('mxSelf'+pi);if(st)st.textContent=mxSelfText(pi);return;}
  if(a('data-mx-rf')){MX.rf=g('data-mx-rf');Array.prototype.forEach.call(t.parentNode.querySelectorAll('button'),function(b){b.setAttribute('aria-pressed',String(b===t));});var rv=$('mxReview');if(rv)rv.innerHTML=mxReviewHTML();return;}
  if(a('data-mx-replay')){
    var x=MX.ix.lq.filter(function(q){return q.id===g('data-mx-replay');})[0];if(!x)return;
    mxHush();if(!MXV.m&&!MXV.w)mxVoices();var tok=MX.tok;
    mxSeq(mxLSteps({it:x.it,p:{type:x.p.type,play:1,read:x.p.read},qi:0,q:x.q}).filter(function(s){return !s.phase;}),tok,function(){});
    return;
  }
  if(a('data-mx-again')){MX.stage='intro';MX.result=null;render();window.scrollTo(0,0);return;}
});
document.addEventListener('input',function(e){
  var el=e.target;if(!el||!el.hasAttribute||!el.hasAttribute('data-mx-w'))return;
  var pi=+el.getAttribute('data-mx-w'),p=mxPart(pi);MX.wr[pi]=el.value;
  var wc=$('mxWc');if(wc)wc.innerHTML=mxWcText(mxWords(el.value),p.words[0],p.words[1]);
  clearTimeout(MX.wt);MX.wt=setTimeout(mxKeep,600);
});
document.addEventListener('visibilitychange',function(){if(document.hidden&&view==='mx'&&MX.stage==='listen'&&!MX.paused){mxHush();MX.paused=true;render();}});
