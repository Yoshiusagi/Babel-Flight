/* ================= 面接練習 (英検 二次試験, 3級〜1級) =================
   The real interview flow for each grade: greeting, the card, 20 seconds of silent reading, reading aloud,
   No.1〜 (pictures, 3-panel / 4-panel narration, opinions with Why? / Why not?), the card turned over at
   the same point as in the real test, speech + Q&A for 1級. The examiner speaks through the browser's
   voice; answers are written down by the browser's speech recognition where it can (nothing is sent to
   this site) and checked by the learner against model answers. Cards: babel-flight/iv/cards.py →
   public/iv/<key>.json, loaded when opened. Classes: like 検定コース (3級・準2級 プレエコ, the rest ビジネス). */
var IV_GRADES=[['ek3','3級',1,5],['ekp2','準2級',1,6],['ekp2p','準2級プラス',2,7],['ek2','2級',2,7],['ekp1','準1級',2,8],['ek1','1級',2,10]];
if(typeof CAB_FEAT==='object'){var ivAt=0;CAB_FEAT.forEach(function(f,i){if(f[0]==='検定コース')ivAt=i+1;});CAB_FEAT.splice(ivAt,0,['面接練習(英検)',['—','3級・準2級','すべての級','すべての級']]);}
var IV_HIST='babelflight.ivhist',IV_SUBKEY='babelflight.ivsub';
var IV={key:'',data:null,stage:'',err:'',i:0,tok:0,line:'',card:false,ans:{},yn:{},self:{},att:{},topic:-1,win:null,tm:0,sr:null,noMic:false,ask:false};
function ivGrade(k){return IV_GRADES.filter(function(g){return g[0]===k;})[0]||null;}
function ivOn(){return save.lang==='en'&&typeof cabinLv==='function'&&cabinLv()>=0;}
function ivLocked(g){return cabinLv()<g[2];}
function ivSub(){try{return localStorage.getItem(IV_SUBKEY)!=='0';}catch(e){return true;}}
function ivHist(){try{var o=JSON.parse(localStorage.getItem(IV_HIST)||'{}');return o&&typeof o==='object'?o:{};}catch(e){return {};}}

/* ---- entry: the 検定 card and the 模試 result ---- */
function ivEntryHTML(){
  if(!ivOn())return '';
  var lv=cabinLv(),hist=ivHist();
  if(lv<1)return '<p class="dim hint">🔒 面接(二次試験)の練習は「'+CABINS[1][1]+'」から</p>';
  return '<div class="iv-entry"><span class="lbl">二次試験(面接)の練習</span><div class="iv-gs">'+IV_GRADES.map(function(g){
    var last=(hist[g[0]]||[])[0],lk=ivLocked(g);
    return '<button type="button" class="iv-gb'+(lk?' locked':'')+'" data-iv-open="'+g[0]+'"><b>'+g[1]+'</b><small>'+(lk?'🔒 '+CABINS[g[2]][4]:last?'前回 '+last.pct+'%':'約'+g[3]+'分')+'</small></button>';}).join('')+
    '</div></div>';
}
(function(){
  if(typeof examHomeHTML!=='function')return;
  var e0=examHomeHTML;
  examHomeHTML=function(L){
    var h=e0.apply(this,arguments);
    if(!h||save.mode!=='exam'||L!=='en')return h;
    var i=h.lastIndexOf('<p class="exam-tm">');
    return i<0?h:h.slice(0,i)+ivEntryHTML()+h.slice(i);
  };
})();

/* ---- loading ---- */
function ivOpen(k){
  var g=ivGrade(k);if(!g||!ivOn())return;
  if(ivLocked(g)){$('sheetHost').innerHTML=lockSheetHTML('面接練習 英検'+g[1],g[2]);return;}
  closeSheet();ivStop();
  IV.key=k;IV.data=null;IV.err='';IV.stage='intro';
  go('iv');
  fetch(bfSiteUrl('/iv/'+k+'.json'),{cache:'no-cache'}).then(function(r){if(!r.ok)throw new Error('http');return r.json();}).then(function(d){
    if(IV.key!==k)return;IV.data=d;if(view==='iv')render();
  }).catch(function(){if(IV.key!==k)return;IV.err='カードを読み込めませんでした。電波を確認して、もう一度開いてね。';if(view==='iv')render();});
}

/* ---- the examiner's voice ---- */
function ivVoice(){
  var vs=(tts.voices||[]).filter(function(v){return /^en[-_](US|GB|AU|CA)/i.test(v.lang||'');});
  return vs.filter(function(v){return /female|samantha|karen|moira|tessa|victoria|susan|zira|kate|serena|allison|ava|jenny|aria|libby|sonia|emma/i.test(v.name);})[0]||vs[0]||null;
}
function ivSay(text,tok,done){
  if(tok!==IV.tok)return;
  var fin=function(){if(tok===IV.tok)setTimeout(function(){if(tok===IV.tok)done();},450);};
  if(!tts.ok){setTimeout(fin,Math.min(9000,700+text.split(' ').length*380));return;}
  try{speechSynthesis.cancel();}catch(e){}
  var u=new SpeechSynthesisUtterance(text),v=ivVoice(),fired=false,guard;
  u.lang='en-US';if(v)u.voice=v;u.rate=0.92;
  var once=function(){if(fired)return;fired=true;clearTimeout(guard);fin();};
  u.onend=once;u.onerror=once;
  guard=setTimeout(once,2500+text.split(' ').length*600);
  try{speechSynthesis.speak(u);}catch(e){once();}
}
function ivHush(){IV.tok++;clearInterval(IV.tm);IV.tm=0;ivSrStop();try{speechSynthesis.cancel();}catch(e){}}
function ivStop(){ivHush();IV.win=null;IV.ask=false;}

/* ---- listening to the learner (browser speech recognition, en-US) ---- */
function ivSrStart(){
  var C=typeof srCtor==='function'?srCtor():null;IV.win.fin='';IV.win.tmp='';
  if(!C||IV.noMic){IV.win.nosr=true;return;}
  var w=IV.win,r;
  function start(){
    if(IV.win!==w||w.closed)return;
    try{r=new C();}catch(e){w.nosr=true;ivWinPaint();return;}
    IV.sr=r;r.lang='en-US';r.continuous=true;r.interimResults=true;
    r.onresult=function(ev){
      var tmp='';for(var i=ev.resultIndex;i<ev.results.length;i++){var x=ev.results[i];if(x.isFinal)w.fin+=(w.fin?' ':'')+x[0].transcript.trim();else tmp+=x[0].transcript;}
      w.tmp=tmp;ivWinPaint();
    };
    r.onerror=function(ev){var c=ev&&ev.error;if(c==='not-allowed'||c==='service-not-allowed'){IV.noMic=true;w.nosr=true;ivWinPaint();}};
    r.onend=function(){if(w.tmp){w.fin+=(w.fin?' ':'')+w.tmp.trim();w.tmp='';}if(IV.win===w&&!w.closed&&!IV.noMic)setTimeout(start,250);};
    try{r.start();}catch(e){}
  }
  start();
}
function ivSrStop(){var r=IV.sr;IV.sr=null;if(r){r.onend=null;try{r.stop();}catch(e){}}}

/* ---- running the steps ---- */
function ivStart(){
  ivStop();IV.i=0;IV.ans={};IV.yn={};IV.self={};IV.att={};IV.topic=-1;IV.card=false;IV.turned=false;IV.line='';IV.pardon=0;IV.stage='run';
  try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(' ');u.volume=0;speechSynthesis.speak(u);}catch(e){}
  render();window.scrollTo(0,0);ivNext(IV.tok);
}
function ivNext(tok){
  if(tok!==IV.tok||IV.stage!=='run')return;
  var s=IV.data.steps[IV.i++];if(!s){ivEnd();return;}
  if(s.k==='say'){IV.line=s.t;IV.win=null;ivPaint();ivSay(s.t,tok,function(){ivNext(tok);});return;}
  if(s.k==='card'){IV.card=true;ivPaint();ivNext(tok);return;}
  if(s.k==='hide'){IV.card=false;IV.turned=true;ivPaint();ivNext(tok);return;}
  if(s.k==='prep'){ivWindow({kind:'prep',sec:s.sec,label:s.label},tok);return;}
  if(s.k==='topics'){ivWindow({kind:'topics',sec:s.sec,label:'トピックを選んで準備'},tok);return;}
  if(s.k==='read'){ivWindow({kind:'read',id:'read',sec:s.sec,label:'音読'},tok);return;}
  if(s.k==='ans'){ivWindow({kind:'ans',id:s.id,sec:s.sec,label:ivItem(s.id).no||'答え'},tok);return;}
  if(s.k==='yn'){ivWindow({kind:'yn',id:s.id,sec:s.sec,label:ivItem(s.id).no,step:s},tok);return;}
  if(s.k==='tq'){
    var tp=IV.data.card.topics[Math.max(0,IV.topic)],q=tp.qs[s.n];IV.line=q;IV.win=null;ivPaint();
    ivSay(q,tok,function(){ivWindow({kind:'ans',id:'tq'+s.n,sec:s.sec,label:'質疑応答'+(s.n+1)},tok);});return;
  }
  if(s.k==='end'){ivEnd();return;}
  ivNext(tok);
}
function ivItem(id){return (IV.data.items||{})[id]||{no:id==='name'?'名前':id==='how'?'あいさつ':''};}
function ivWindow(w,tok){
  w.t0=Date.now();w.left=w.sec;w.closed=false;IV.win=w;
  if(w.kind!=='prep'&&w.kind!=='topics')ivSrStart();
  ivPaint();
  clearInterval(IV.tm);
  IV.tm=setInterval(function(){
    if(tok!==IV.tok||IV.win!==w){clearInterval(IV.tm);return;}
    w.left=Math.max(0,w.sec-(Date.now()-w.t0)/1000);ivWinPaint();
    if(w.left<=0)ivWinDone(tok);
  },200);
}
function ivWinDone(tok){
  var w=IV.win;if(!w||w.closed||tok!==IV.tok)return;
  w.closed=true;clearInterval(IV.tm);ivSrStop();
  var said=((w.fin||'')+' '+(w.tmp||'')).replace(/\s+/g,' ').trim();
  if(w.kind==='topics'){if(IV.topic<0)IV.topic=0;ivNext(tok);return;}
  if(w.kind==='prep'){ivNext(tok);return;}
  if(w.kind==='yn'&&!w.follow){
    var yn=/^(yes|yeah|yep|sure|of course|i think so|i do|i agree)\b/i.test(said)?'yes':/^(no|nope|not really|i don'?t|i disagree)\b/i.test(said)?'no':'';
    IV.ans[w.id]=said;
    if(!yn){IV.ask=true;w.need=true;ivPaint();return;}
    ivFollow(w,yn,tok);return;
  }
  if(w.kind==='yn'&&w.follow){IV.ans[w.id]=((IV.ans[w.id]||'')+' → '+said).trim();ivNext(tok);return;}
  IV.ans[w.id]=said;
  ivNext(tok);
}
function ivFollow(w,yn,tok){
  IV.yn[w.id]=yn;IV.ask=false;
  var q=w.step.follow[yn];IV.line=q;IV.win=null;ivPaint();
  ivSay(q,tok,function(){ivWindow({kind:'yn',id:w.id,sec:w.step.fsec,label:w.label,step:w.step,follow:true},tok);});
}
function ivEnd(){
  ivStop();IV.stage='result';IV.card=false;
  render();window.scrollTo(0,0);
}

/* ---- screens ---- */
function ivBarHTML(sub){
  return '<div class="fl-top"><button class="x" type="button" data-iv-close aria-label="閉じる">'+closeIcon()+'</button><div class="fl-id"><span class="lbl">二次試験(面接) ・ 練習</span><b>英検'+esc((ivGrade(IV.key)||[])[1]||'')+(sub?' <small class="dim">'+sub+'</small>':'')+'</b></div></div>';
}
function ivEmoji(e,x,y,s){return '<text x="'+x+'" y="'+y+'" font-size="'+s+'" text-anchor="middle" dominant-baseline="central">'+e+'</text>';}
function ivSceneSVG(sc,label){
  var BG={airport:['#dff0ff','#c9d4e2'],park:['#dff6ff','#bfe5a6'],outdoor:['#e3f1ff','#c8e6b4'],room:['#fff6e8','#e7d2b8'],shop:['#fffbe6','#e5e1d3'],kitchen:['#f5f8ff','#d9dde6'],office:['#eef3f8','#cfd8e3']}[sc.bg]||['#f2f5f9','#d7dde5'];
  var h='<svg class="iv-pic" viewBox="0 0 300 180" role="img" aria-label="'+esc(label||'イラスト')+'"><rect width="300" height="180" fill="'+BG[0]+'"/><rect y="120" width="300" height="60" fill="'+BG[1]+'"/>';
  (sc.items||[]).forEach(function(it){h+=ivEmoji(it[0],it[1],it[2],it[3]);});
  (sc.signs||[]).forEach(function(s){var w=s.t.length*7+16;h+='<rect x="'+(s.x-w/2)+'" y="'+(s.y-10)+'" width="'+w+'" height="20" rx="3" fill="#cf3342"/><text x="'+s.x+'" y="'+(s.y+1)+'" font-size="11" font-weight="700" fill="#fff" text-anchor="middle" dominant-baseline="central" font-family="system-ui,sans-serif">'+esc(s.t)+'</text>';});
  (sc.bubbles||[]).forEach(function(b){
    if(b.kind==='say'){
      var lines=ivWrap(b.t,Math.max(10,Math.floor(b.w/6.2))),bh=lines.length*13+12,x=b.x-b.w/2,y=b.y-bh/2;
      h+='<rect x="'+x+'" y="'+y+'" width="'+b.w+'" height="'+bh+'" rx="9" fill="#fff" stroke="#46586d" stroke-width="1.2"/><path d="M'+(b.x-6)+' '+(y+bh)+' l6 9 l4 -9z" fill="#fff" stroke="#46586d" stroke-width="1.2"/>';
      lines.forEach(function(l,i){h+='<text x="'+b.x+'" y="'+(y+12+i*13)+'" font-size="11" fill="#0b1626" text-anchor="middle" font-family="system-ui,sans-serif">'+esc(l)+'</text>';});
    }else{
      h+='<ellipse cx="'+b.x+'" cy="'+b.y+'" rx="'+(b.w/2)+'" ry="20" fill="#fff" stroke="#46586d" stroke-width="1.2"/><circle cx="'+(b.x+b.w/2-8)+'" cy="'+(b.y+26)+'" r="5" fill="#fff" stroke="#46586d" stroke-width="1.2"/><circle cx="'+(b.x+b.w/2-2)+'" cy="'+(b.y+36)+'" r="3" fill="#fff" stroke="#46586d" stroke-width="1.2"/>'+ivEmoji(b.e,b.x,b.y+1,20);
    }
  });
  return h+'</svg>';
}
function ivWrap(t,n){var out=[],cur='';t.split(' ').forEach(function(w){if((cur+' '+w).trim().length>n&&cur){out.push(cur);cur=w;}else cur=(cur+' '+w).trim();});if(cur)out.push(cur);return out;}
function ivCardHTML(){
  var c=IV.data.card,h='<section class="card iv-card" aria-label="問題カード">';
  if(c.passage)h+='<h3 class="iv-pt">'+esc(c.title)+'</h3><p class="iv-pass" lang="en">'+esc(c.passage)+'</p>';
  if(c.pic)h+=ivSceneSVG(c.pic,'イラスト');
  if(c.picA)h+='<div class="iv-ab"><div><span class="lbl">Picture A</span>'+ivSceneSVG(c.picA,'Picture A')+'</div><div><span class="lbl">Picture B</span>'+ivSceneSVG(c.picB,'Picture B')+'</div></div>';
  if(c.panels){
    if(!c.passage)h+='<h3 class="iv-pt">'+esc(c.title)+'</h3>';
    h+='<p class="iv-start" lang="en">Your story should begin with the following sentence: <b>'+esc(c.start)+'</b></p><div class="iv-panels n'+c.panels.length+'">'+c.panels.map(function(p,i){
      return '<div class="iv-panel"><span class="iv-cap">'+(i+1)+'. '+esc(p.cap||'')+'</span>'+ivSceneSVG(p,'コマ'+(i+1))+'</div>';}).join('')+'</div>';
  }
  if(c.topics){
    h+='<h3 class="iv-pt">'+esc(c.title)+'</h3><ol class="iv-topics">'+c.topics.map(function(t,i){
      return '<li><button type="button" data-iv-topic="'+i+'" aria-pressed="'+(IV.topic===i)+'" lang="en">'+esc(t.t)+'</button></li>';}).join('')+'</ol>';
  }
  return h+'</section>';
}
function ivIntroHTML(){
  var g=ivGrade(IV.key),h=ivBarHTML();
  if(IV.err)return h+'<p class="mx-note">'+esc(IV.err)+'</p><button type="button" class="ghost" data-iv-open="'+esc(IV.key)+'">もう一度読み込む</button>';
  if(!IV.data)return h+'<p class="dim" style="margin-top:20px">カードを読み込み中…</p>';
  var d=IV.data,flow=[],has=function(k){return d.steps.some(function(s){return s.k===k;});};
  flow.push('あいさつ・名前');
  if(d.card.passage)flow.push('黙読 20秒 → 音読');
  d.steps.forEach(function(s){if((s.k==='ans'||s.k==='yn')&&/^(q\d|narr|speech)$/.test(s.id)){var it=ivItem(s.id);flow.push(it.no+(s.id==='narr'||s.id==='q2'&&d.card.panels?'(準備のあと)':''));}});
  if(has('topics'))flow.push('トピックを選んで1分準備');
  if(has('tq'))flow.push('質疑応答');
  var sr=typeof srCtor==='function'&&srCtor();
  h+='<section class="card iv-intro"><h2 class="jh">本番と同じ流れで練習</h2><ol class="iv-flow">'+flow.map(function(f){return '<li>'+esc(f)+'</li>';}).join('')+'</ol>'+
    '<p class="dim hint">面接官の英語はこの端末の音声で読み上げます。音を出せる場所で、声に出して答えよう。約'+g[3]+'分。</p>'+
    (sr?'<p class="dim hint">🎙 答えはブラウザの音声認識で文字にして、あとでお手本と見比べられます(このサイトには送られません)。はじめにマイクの許可を求められます。</p>'
       :'<p class="dim hint">この端末では文字起こしができません。声に出して答えて、終わったら「答え終わった」を押してね。</p>')+
    '<label class="set-row iv-subt"><span>英文を表示する(本番は表示されません)</span><input type="checkbox" data-iv-sub'+(ivSub()?' checked':'')+'></label>'+
    '<button type="button" class="go" data-iv-start>面接を始める<small>入室から退室まで</small></button></section>'+
    '<p class="dim hint">カードの英文・イラストはBabel Flightのオリジナルです。採点は本番(英検CSEスコア)とは違う、自分でつける目安です。</p>';
  var hist=ivHist()[IV.key]||[];
  if(hist.length)h+='<section class="card"><h2 class="jh">これまでの練習</h2><ul class="mx-hist">'+hist.slice(0,5).map(function(r){return '<li><span>'+esc(fmtDate(r.t))+'</span><b class="mono">'+r.pct+'%</b></li>';}).join('')+'</ul></section>';
  return h+'<div class="pad-b"></div>';
}
function ivRunHTML(){
  var h=ivBarHTML(IV.card?'カードあり':'')+'<div class="iv-ex"><span class="iv-av" aria-hidden="true">🧑‍🏫</span><div class="iv-line" aria-live="polite">'+
    (ivSub()?'<span lang="en">'+esc(IV.line||'…')+'</span>':'<span class="dim">(面接官が話しています。英文は非表示)</span>')+'</div></div>';
  h+='<div id="ivWin">'+ivWinHTML()+'</div>';
  if(IV.card)h+=ivCardHTML();
  else if(IV.turned)h+='<p class="dim hint iv-down">カードは裏返して置いてあります。</p>';
  return h+'<button type="button" class="ghost iv-quit" data-iv-quit>中断する</button><div class="pad-b"></div>';
}
function ivWinHTML(){
  var w=IV.win;
  if(IV.ask)return '<div class="iv-win ask"><p>Yes と No、どちらで答えた?</p><div class="row2"><button class="go" type="button" data-iv-yn="yes" style="flex:1;margin-top:0">Yes</button><button class="go" type="button" data-iv-yn="no" style="flex:1;margin-top:0">No</button></div></div>';
  if(!w)return '';
  var pct=Math.max(0,Math.min(100,w.left/w.sec*100)),sec=Math.ceil(w.left);
  if(w.kind==='prep'||w.kind==='topics')return '<div class="iv-win prep"><span class="lbl">'+esc(w.label)+'</span><b class="mono iv-cd">'+sec+'</b><div class="iv-bar"><i style="width:'+pct+'%"></i></div>'+
    (w.kind==='topics'&&IV.topic<0?'<p class="dim hint">下のカードからトピックを1つ選ぼう</p>':'')+'<button type="button" class="ghost sm" data-iv-done>準備できた</button></div>';
  var tr=(w.fin||'')+(w.tmp?' <i>'+esc(w.tmp)+'</i>':'');
  return '<div class="iv-win ans'+(w.kind==='read'?' read':'')+'"><div class="iv-mic"><span class="iv-dot" aria-hidden="true"></span><b>'+esc(w.label)+(w.follow?' (2つ目の質問)':'')+'</b><span class="mono">あと'+sec+'秒</span></div>'+
    '<div class="iv-bar"><i style="width:'+pct+'%"></i></div>'+
    (w.nosr?'<p class="dim hint">声に出して答えよう(文字起こしなし)</p>':'<p class="iv-tr" lang="en">'+(tr?esc(w.fin||'')+(w.tmp?' <i>'+esc(w.tmp)+'</i>':''):'<span class="dim">'+(w.kind==='read'?'カードの英文を声に出して読もう':'英語で答えよう')+'</span>')+'</p>')+
    '<button type="button" class="go" data-iv-done>'+(w.kind==='read'?'読み終わった':'答え終わった')+'</button>'+
    (w.kind!=='read'&&IV.line?'<button type="button" class="ghost sm iv-pardon" data-iv-pardon>Pardon?<small>もう一度言ってもらう</small></button>':'')+'</div>';
}
function ivWinPaint(){var b=$('ivWin');if(b)b.innerHTML=ivWinHTML();}
function ivPaint(){if(view==='iv'&&IV.stage==='run'){var main=$('main');if(main)main.innerHTML='<div class="iv">'+ivRunHTML()+'</div>';}}

/* reading aloud: which words of the passage were heard, in order */
function ivReadMarks(passage,heard){
  var P=passage.split(/\s+/),norm=function(w){return w.toLowerCase().replace(/[^a-z0-9']/g,'');},a=P.map(norm),b=String(heard||'').split(/\s+/).map(norm).filter(Boolean);
  var n=a.length,m=b.length,L=[],i,j;
  for(i=0;i<=n;i++){L.push(new Array(m+1).fill(0));}
  for(i=n-1;i>=0;i--)for(j=m-1;j>=0;j--)L[i][j]=a[i]&&a[i]===b[j]?L[i+1][j+1]+1:Math.max(L[i+1][j],L[i][j+1]);
  var hit=new Array(n).fill(false);i=0;j=0;
  while(i<n&&j<m){if(a[i]&&a[i]===b[j]){hit[i]=true;i++;j++;}else if(L[i+1][j]>=L[i][j+1])i++;else j++;}
  return {words:P,hit:hit,pct:Math.round(hit.filter(Boolean).length/Math.max(1,n)*100)};
}
var IV_RATE=[['3','◎ できた',1],['2','◯ まあまあ',0.6],['1','△ もう少し',0.2]];
function ivRateHTML(id){
  return '<div class="iv-rate" role="group" aria-label="自己採点">'+IV_RATE.map(function(r){return '<button type="button" data-iv-rate="'+id+':'+r[0]+'" aria-pressed="'+(IV.self[id]===r[0])+'">'+r[1]+'</button>';}).join('')+'</div>';
}
function ivModelHTML(m){
  if(!m)return '';
  var list=Array.isArray(m)?m:Object.keys(m).map(function(k){return m[k];});
  return list.map(function(t,i){return '<div class="iv-model"><span class="lbl">お手本'+(list.length>1?' '+(i+1):'')+'</span><p lang="en">'+esc(t)+'</p><button type="button" class="mini" data-iv-say="'+esc(t.replace(/^(Yes|No)\. → /,'$1. '))+'" aria-label="お手本を聞く">'+speakerIcon()+'</button></div>';}).join('');
}
function ivScore(){
  var d=IV.data,tot=0,got=0;
  Object.keys(d.items).forEach(function(id){var it=d.items[id];if(!it.pts)return;if(id==='tq1')return;tot+=it.pts;var r=IV_RATE.filter(function(x){return x[0]===IV.self[id];})[0];got+=it.pts*(r?r[2]:0);});
  tot+=3;got+=['a','b','c'].filter(function(k){return IV.att[k];}).length;
  return Math.round(got/Math.max(1,tot)*100);
}
function ivResultHTML(){
  var d=IV.data,h=ivBarHTML('結果');
  h+='<section class="card iv-res"><h2 class="jh">おつかれさま!</h2><p class="dim" style="font-size:13.5px">自分の答え(文字起こし)とお手本を見比べて、1問ずつ採点しよう。採点すると下に目安が出ます。</p></section>';
  if(d.card.passage){
    var rm=ivReadMarks(d.card.passage,IV.ans.read);
    h+='<section class="card iv-q"><div class="card-h"><h2 class="jh">音読</h2>'+(IV.ans.read?'<span class="lbl">聞き取れた語 '+rm.pct+'%</span>':'')+'</div>'+
      '<p class="iv-pass marks" lang="en">'+rm.words.map(function(w,i){return '<span class="'+(IV.ans.read?(rm.hit[i]?'hit':'miss'):'')+'">'+esc(w)+'</span>';}).join(' ')+'</p>'+
      (IV.ans.read?'<p class="dim hint">緑=聞き取れた語、赤=聞き取れなかった語(発音や読み飛ばしのチェックに)</p>':'<p class="dim hint">文字起こしはありません。</p>')+
      '<ul class="iv-pts">'+d.items.read.points.map(function(p){return '<li>'+esc(p)+'</li>';}).join('')+'</ul>'+ivRateHTML('read')+'</section>';
  }
  var order=[];d.steps.forEach(function(s){if((s.k==='ans'||s.k==='yn')&&d.items[s.id]&&order.indexOf(s.id)<0)order.push(s.id);if(s.k==='tq')order.push('tq'+s.n);});
  if(d.items.gv)order.push('gv','pf');
  order.forEach(function(id){
    var it=d.items[id];if(!it)return;
    var q=it.q;if(/^tq/.test(id)&&d.card.topics){var tp=d.card.topics[Math.max(0,IV.topic)];q=tp.qs[+id.slice(2)];}
    var said=IV.ans[id];
    h+='<section class="card iv-q"><div class="card-h"><h2 class="jh">'+esc(it.no)+'</h2>'+(IV.yn[id]?'<span class="lbl">'+IV.yn[id].toUpperCase()+'</span>':'')+'</div>'+
      (q&&!/^\(/.test(q)?'<p class="iv-qq" lang="en">'+esc(q)+'</p>':'')+(it.ja?'<p class="dim hint">'+esc(it.ja)+'</p>':'')+
      (id==='gv'||id==='pf'?'':'<div class="iv-said"><span class="lbl">あなたの答え</span><p lang="en">'+(said?esc(said):'<span class="dim">(文字起こしなし)</span>')+'</p></div>');
    if(id==='speech'&&d.card.topics){var tp2=d.card.topics[Math.max(0,IV.topic)];h+='<div class="iv-model"><span class="lbl">選んだトピック</span><p lang="en">'+esc(tp2.t)+'</p></div><ul class="iv-pts">'+tp2.outline.map(function(p){return '<li>'+esc(p)+'</li>';}).join('')+'</ul>';}
    var m=it.model;if(m&&!Array.isArray(m)&&IV.yn[id])m=[m[IV.yn[id]]].concat(Object.keys(m).filter(function(k){return k!==IV.yn[id];}).map(function(k){return m[k];}));
    h+=ivModelHTML(m)+(it.points&&it.points.length?'<ul class="iv-pts">'+it.points.map(function(p){return '<li>'+esc(p)+'</li>';}).join('')+'</ul>':'')+(it.pts?ivRateHTML(id):'')+'</section>';
  });
  h+='<section class="card iv-q"><h2 class="jh">アティチュード(態度)</h2><p class="dim hint">本番では、入室から退室までの話し方も見られています。'+(IV.pardon?' 今回は Pardon? を'+IV.pardon+'回使いました(自然な聞き返しは減点されません)。':'')+'</p>'+
    [['a','聞こえる大きさの声で、はっきり話せた'],['b','長い沈黙を作らず、何か答えようとした'],['c','分からないときは聞き返せた(Pardon? / Could you say that again?)']].map(function(x){
      return '<label class="iv-att"><input type="checkbox" data-iv-att="'+x[0]+'"'+(IV.att[x[0]]?' checked':'')+'><span>'+x[1]+'</span></label>';}).join('')+'</section>';
  h+='<section class="card iv-sum" id="ivSum">'+ivSumHTML()+'</section>'+
    '<div class="row2" style="margin-top:12px"><button type="button" class="ghost" data-iv-again style="flex:1">もう一度</button><button type="button" class="go" data-iv-close style="flex:1;margin-top:0">終わる</button></div><div class="pad-b"></div>';
  return h;
}
function ivSumHTML(){
  var rated=Object.keys(IV.self).length,p=ivScore();
  return '<span class="lbl">自己採点の目安</span><b class="mono iv-pct">'+(rated?p+'%':'—')+'</b><p class="dim hint">'+(rated?'本番の合否は英検CSEスコアで決まります。60〜70%をこえたら、本番でも手ごたえがありそう。':'1問ずつ採点すると、ここに目安が出ます。')+'</p>';
}
function ivKeepHist(){
  var o=ivHist(),l=o[IV.key]||[],p=ivScore();
  if(l[0]&&l[0].run===IV.run){l[0].pct=p;}else l.unshift({t:Date.now(),pct:p,run:IV.run});
  o[IV.key]=l.slice(0,10);try{localStorage.setItem(IV_HIST,JSON.stringify(o));}catch(e){}
}
function ivHTML(){
  if(IV.stage==='run'&&IV.data)return ivRunHTML();
  if(IV.stage==='result'&&IV.data)return ivResultHTML();
  return ivIntroHTML();
}
(function(){
  var r0=render;
  render=function(){
    if(view!=='iv'){if(IV.stage==='run'){ivStop();IV.stage='intro';}return r0.apply(this,arguments);}
    if(!IV.key){view='review';return r0.apply(this,arguments);}
    $('tabs').hidden=true;
    var main=$('main');main.innerHTML='<div class="iv">'+ivHTML()+'</div>';
    main.classList.remove('enter','enter-l','enter-r');void main.offsetWidth;main.classList.add('enter');PREVVIEW=view;
  };
})();
/* the 模試: 二次試験 after 筆記・リスニング */
(function(){
  if(typeof mxResultHTML!=='function')return;
  var m0=mxResultHTML;
  mxResultHTML=function(){
    var h=m0.apply(this,arguments),g=ivGrade(MX.key);
    if(!g||!ivOn())return h;
    var i=h.indexOf('</section>');
    return i<0?h:h.slice(0,i+10)+'<button type="button" class="go" data-iv-open="'+g[0]+'">続けて二次試験(面接)へ<small>本番と同じ流れ ・ 約'+g[3]+'分</small></button>'+h.slice(i+10);
  };
})();
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  var a=function(n){return t.hasAttribute(n);},g=function(n){return t.getAttribute(n);};
  if(a('data-iv-open')){if(view==='mx'&&typeof mxStop==='function'){mxStop();MX.stage='';MX.key='';}ivOpen(g('data-iv-open'));return;}
  if(view!=='iv')return;
  if(a('data-iv-close')){if(IV.stage==='result')ivKeepHist();ivStop();IV.stage='';IV.key='';go('home');return;}
  if(a('data-iv-start')){if(!IV.data)return;IV.run=Date.now();ivStart();return;}
  if(a('data-iv-done')){ivWinDone(IV.tok);return;}
  if(a('data-iv-pardon')){
    var pw=IV.win;if(!pw||pw.closed||pw.kind==='read')return;
    pw.closed=true;clearInterval(IV.tm);ivSrStop();IV.pardon=(IV.pardon||0)+1;
    var ptok=++IV.tok,again={kind:pw.kind,id:pw.id,sec:pw.sec,label:pw.label,step:pw.step,follow:pw.follow};
    IV.win=null;ivPaint();
    ivSay(IV.line,ptok,function(){ivWindow(again,ptok);});
    return;
  }
  if(a('data-iv-yn')){var w=IV.win;if(w&&w.need){ivFollow(w,g('data-iv-yn'),IV.tok);}return;}
  if(a('data-iv-topic')){IV.topic=parseInt(g('data-iv-topic'),10)||0;Array.prototype.forEach.call(document.querySelectorAll('[data-iv-topic]'),function(b){b.setAttribute('aria-pressed',String(b===t));});ivWinPaint();return;}
  if(a('data-iv-quit')){
    $('sheetHost').innerHTML='<div class="sheet plain" role="alertdialog" aria-label="中断"><div class="sheet-in"><h3>面接を中断しますか?</h3><p class="dim" style="font-size:14px">ここまでの答えは消えます。</p><div class="row2"><button class="ghost" type="button" data-close-sheet style="flex:1">続ける</button><button class="go" type="button" data-iv-quit-yes style="flex:1;margin-top:0">中断する</button></div></div></div>';
    return;
  }
  if(a('data-iv-quit-yes')){closeSheet();ivStop();IV.stage='intro';render();window.scrollTo(0,0);return;}
  if(a('data-iv-rate')){var p=g('data-iv-rate').split(':');IV.self[p[0]]=p[1];Array.prototype.forEach.call(t.parentNode.querySelectorAll('button'),function(b){b.setAttribute('aria-pressed',String(b===t));});var s=$('ivSum');if(s)s.innerHTML=ivSumHTML();ivKeepHist();return;}
  if(a('data-iv-say')){try{speechSynthesis.cancel();}catch(x){}var tok=++IV.tok;ivSay(g('data-iv-say'),tok,function(){});return;}
  if(a('data-iv-again')){ivKeepHist();IV.run=Date.now();ivStart();return;}
});
document.addEventListener('change',function(e){
  var el=e.target;if(!el||!el.hasAttribute)return;
  if(el.hasAttribute('data-iv-sub')){try{localStorage.setItem(IV_SUBKEY,el.checked?'1':'0');}catch(x){}return;}
  if(el.hasAttribute('data-iv-att')){IV.att[el.getAttribute('data-iv-att')]=el.checked;var s=$('ivSum');if(s)s.innerHTML=ivSumHTML();if(Object.keys(IV.self).length)ivKeepHist();}
});
document.addEventListener('visibilitychange',function(){if(document.hidden&&view==='iv'&&IV.stage==='run'){ivStop();IV.stage='intro';render();}});
