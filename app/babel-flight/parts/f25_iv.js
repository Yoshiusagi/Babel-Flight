/* ================= 面接練習 (英検 二次試験 3級〜1級, IELTS・TOEFL のスピーキング, 航空英語能力証明) =================
   The real interview flow for each grade: entering the room and handing over the 面接カード, greeting, the card,
   20 seconds of silent reading, reading aloud, No.1〜 (pictures, 3-panel / 4-panel narration, opinions with
   Why? / Why not?), the card turned over at the same point as in the real test, speech + Q&A for 1級, leaving.
   Each grade has several cards (one is picked like in the real test: the least recently used, or the one you
   choose), and the later questions (the ones after the card is turned over) come from a pool, so the same card
   asks different things. The examiner (name and voice) changes each time.
   The examiner speaks through the browser's voice; answers are written down by the browser's speech recognition
   where it can (nothing is sent to this site) and checked by the learner against model answers.
   Data: babel-flight/iv/cards.py → public/iv/<key>.json, loaded when opened:
     {name, lang, tier, minutes, entry, open, exit, close, cards:[{card, steps, items}], pools, items}
   the steps of one run = entry (if practised) + open + the card's steps + exit / close; {ex} is the examiner's
   name, {hello} is "Hello. " when the entry was skipped. Classes: like 検定コース (3級・準2級 プレエコ, the rest ビジネス).
   Other tests use the same steps plus: card faces shown one at a time (card {show}), a cue card (IELTS Part 2), an info
   card (flight data), notes while preparing (prep {notes}), listen-and-repeat (rep), a situation cue under the answer
   window (ans {cue}), the controller's voice (say {r:'atc'}), pool entries that are whole groups of questions
   ({steps, items}), overall marks at the end (items {overall}), and their own texts (flow, unit, notes, att). */
/* the interviews: key, name, button label, class, minutes, course language, group */
var IV_TESTS=[
  {k:'ek3',name:'英検3級',b:'3級',tier:1,min:5,L:'en',g:'eiken'},{k:'ekp2',name:'英検準2級',b:'準2級',tier:1,min:6,L:'en',g:'eiken'},
  {k:'ekp2p',name:'英検準2級プラス',b:'準2級プラス',tier:2,min:7,L:'en',g:'eiken'},{k:'ek2',name:'英検2級',b:'2級',tier:2,min:7,L:'en',g:'eiken'},
  {k:'ekp1',name:'英検準1級',b:'準1級',tier:2,min:8,L:'en',g:'eiken'},{k:'ek1',name:'英検1級',b:'1級',tier:2,min:10,L:'en',g:'eiken'},
  {k:'ielts',name:'IELTS Speaking',b:'IELTS',tier:2,min:14,L:'en',g:'intl'},{k:'toefl',name:'TOEFL iBT Speaking',b:'TOEFL iBT',tier:2,min:8,L:'en',g:'intl'},
  {k:'icao',name:'航空英語能力証明',b:'航空英語(ICAO)',tier:2,min:20,L:'en',g:'intl',job:'icao'},
  {k:'delea2',name:'DELE A2 会話テスト',b:'DELE A2',tier:1,min:24,L:'es',g:'dele'},{k:'deleb1',name:'DELE B1 会話テスト',b:'DELE B1',tier:2,min:30,L:'es',g:'dele'},
  {k:'cilsa2',name:'CILS A2 会話テスト',b:'CILS A2',tier:1,min:10,L:'it',g:'cils'},{k:'cilsb1',name:'CILS B1 会話テスト',b:'CILS B1',tier:2,min:12,L:'it',g:'cils'},
  {k:'oet',name:'OET Speaking',b:'OET',tier:2,min:20,L:'en',g:'job',job:'oet'},{k:'crew',name:'客室乗務員の英語面接',b:'客室乗務員',tier:2,min:12,L:'en',g:'job',job:'crew'},
  {k:'guideen',name:'全国通訳案内士 口述(英語)',b:'通訳案内士',tier:2,min:10,L:'en',g:'job',job:'guide-en'},{k:'guideko',name:'全国通訳案内士 口述(韓国語)',b:'通訳案内士',tier:2,min:10,L:'ko',g:'job',job:'guide-ko'},
  {k:'guidees',name:'全国通訳案内士 口述(スペイン語)',b:'通訳案内士',tier:2,min:10,L:'es',g:'job',job:'guide-es'},{k:'guideit',name:'全国通訳案内士 口述(イタリア語)',b:'通訳案内士',tier:2,min:10,L:'it',g:'job',job:'guide-it'}];
var IV_GROUPS={eiken:['二次試験(面接)の練習','二次試験(面接) ・ 練習'],intl:['スピーキングテストの練習','スピーキング ・ 練習'],
  dele:['会話テスト(Expresión oral)の練習','会話テスト ・ 練習'],cils:['会話テスト(Produzione orale)の練習','会話テスト ・ 練習'],job:['仕事の面接の練習','仕事の面接 ・ 練習']};
if(typeof CAB_FEAT==='object'){var ivAt=0;CAB_FEAT.forEach(function(f,i){if(f[0]==='検定コース')ivAt=i+1;});CAB_FEAT.splice(ivAt,0,['面接練習',['—','英検3級・準2級・DELE A2など','すべて','すべて']]);}
var IV_HIST='babelflight.ivhist',IV_SUBKEY='babelflight.ivsub',IV_ENTKEY='babelflight.iventry',IV_POOLKEY='babelflight.ivpool';
var IV_EX=[['Ms. Brown','f'],['Mr. Taylor','m'],['Ms. Clark','f'],['Mr. Wilson','m'],['Ms. Hill','f'],['Mr. Evans','m']];
var IV={key:'',data:null,stage:'',err:'',i:0,tok:0,line:'',up:false,ans:{},yn:{},self:{},att:{},topic:-1,win:null,tm:0,sr:null,noMic:false,ask:false,
  pick:-1,ci:0,c:null,steps:[],items:{},ex:IV_EX[0],turned:false,pardon:0,run:0,face:'',role:'',hideLine:false,notes:'',notesOn:false,tsel:{}};
/* choices on the card (1級 topics, DELE themes and photos …): a set name → the chosen index */
function ivSel(set){var v=IV.tsel[set||'topics'];return v==null?-1:v;}
function ivChosen(set){var l=(IV.c&&IV.c.card[set||'topics'])||[];return l[Math.max(0,ivSel(set))]||{};}
function ivSets(c){return c.sets||(c.topics?['topics']:[]);}
function ivGrade(k){return IV_TESTS.filter(function(g){return g.k===k;})[0]||null;}
/* job interviews (航空英語 …) only for the profession that has that certificate, like the 検定 list */
function ivTests(L){return IV_TESTS.filter(function(g){return g.L===L&&(!g.job||typeof jobxList!=='function'||jobxList(L).indexOf(g.job)>=0);});}
function ivOn(L){L=L||save.lang;return L===save.lang&&UI==='ja'&&typeof cabinLv==='function'&&cabinLv()>=0&&ivTests(L).length>0;}  /* 日本語 only */
function ivLocked(g){return cabinLv()<g.tier;}
function ivUnit(){return (IV.data&&IV.data.unit)||'カード';}
function ivFlag(k,dflt){try{var v=localStorage.getItem(k);return v===null?dflt:v!=='0';}catch(e){return dflt;}}
function ivSub(){return ivFlag(IV_SUBKEY,true);}
function ivEntryOn(){return ivFlag(IV_ENTKEY,true);}
function ivHist(){try{var o=JSON.parse(localStorage.getItem(IV_HIST)||'{}');return o&&typeof o==='object'?o:{};}catch(e){return {};}}
function ivCards(){return (IV.data&&IV.data.cards)||[];}

/* ---- entry: the 検定 card and the 模試 result ---- */
function ivEntryHTML(L){
  if(!ivOn(L))return '';
  var lv=cabinLv(),hist=ivHist(),ts=ivTests(L),low=Math.min.apply(null,ts.map(function(g){return g.tier;})),gs=[];
  if(lv<low)return '<p class="dim hint">🔒 '+(L==='en'?'面接(二次試験)の練習':'会話テスト(面接)の練習')+'は「'+CABINS[low][1]+'」から</p>';
  ts.forEach(function(g){if(gs.indexOf(g.g)<0)gs.push(g.g);});
  return '<div class="iv-entry">'+gs.map(function(gr){
    return '<span class="lbl">'+IV_GROUPS[gr][0]+'</span><div class="iv-gs">'+ts.filter(function(g){return g.g===gr;}).map(function(g){
      var last=(hist[g.k]||[])[0],lk=ivLocked(g);
      return '<button type="button" class="iv-gb'+(lk?' locked':'')+'" data-iv-open="'+g.k+'"><b>'+g.b+'</b><small>'+(lk?'🔒 '+CABINS[g.tier][4]:last?'前回 '+last.pct+'%':'約'+g.min+'分')+'</small></button>';}).join('')+'</div>';
  }).join('')+'</div>';
}
(function(){
  if(typeof examHomeHTML!=='function')return;
  var e0=examHomeHTML;
  examHomeHTML=function(L){
    var h=e0.apply(this,arguments);
    if(!h||save.mode!=='exam'||!ivOn(L))return h;
    var i=h.lastIndexOf('<p class="exam-tm">');
    return i<0?h:h.slice(0,i)+ivEntryHTML(L)+h.slice(i);
  };
})();

/* ---- loading ---- */
function ivOpen(k){
  var g=ivGrade(k);if(!g||!ivOn(g.L))return;
  if(ivLocked(g)){$('sheetHost').innerHTML=lockSheetHTML('面接練習 '+g.name,g.tier);return;}
  closeSheet();ivStop();
  IV.key=k;IV.data=null;IV.err='';IV.stage='intro';IV.pick=-1;
  go('iv');
  fetch(bfSiteUrl('/iv/'+k+'.json'),{cache:'no-cache'}).then(function(r){if(!r.ok)throw new Error('http');return r.json();}).then(function(d){
    if(IV.key!==k)return;IV.data=d;if(view==='iv')render();
  }).catch(function(){if(IV.key!==k)return;IV.err='カードを読み込めませんでした。電波を確認して、もう一度開いてね。';if(view==='iv')render();});
}

/* ---- which card, which questions ---- */
/* like the real test you don't choose: the card you haven't done for the longest time (new ones first) */
function ivPickCard(){
  var cs=ivCards(),h=ivHist()[IV.key]||[];
  if(IV.pick>=0&&IV.pick<cs.length)return IV.pick;
  var ago={};h.forEach(function(r,i){var c=r.c||0;if(!(c in ago))ago[c]=i;});
  var best=[],bv=-1;cs.forEach(function(c,i){var v=i in ago?ago[i]:1e6;if(v>bv){bv=v;best=[i];}else if(v===bv)best.push(i);});
  return best[Math.floor(Math.random()*best.length)]||0;
}
/* a question from a pool, not one of the last few asked */
function ivPoolPick(name,n){
  var rec={};try{rec=JSON.parse(localStorage.getItem(IV_POOLKEY)||'{}')||{};}catch(e){}
  var used=rec[name]||[],ok=[];for(var i=0;i<n;i++)if(used.indexOf(i)<0)ok.push(i);
  if(!ok.length)for(i=0;i<n;i++)ok.push(i);
  var p=ok[Math.floor(Math.random()*ok.length)];
  rec[name]=[p].concat(used.filter(function(x){return x!==p;})).slice(0,Math.max(1,Math.min(3,n-2)));
  try{localStorage.setItem(IV_POOLKEY,JSON.stringify(rec));}catch(e){}
  return p;
}
function ivPickEx(){
  var l=(IV.data&&IV.data.exs)||IV_EX,prev=IV.ex&&IV.ex[0],o=l.filter(function(x){return x[0]!==prev;});
  return (o.length?o:l)[Math.floor(Math.random()*(o.length||l.length))];
}
/* the steps of this run: entry + open + the card + exit, with the pool questions drawn */
function ivBuild(){
  var d=IV.data,c=IV.c,ent=ivEntryOn()&&!!d.entry,items={},steps=[],k;
  var fill=function(t){return String(t).replace(/\{ex\}/g,IV.ex[0]).replace(/\{hello\}/g,ent?'':'Hello. ');};
  [d.items||{},c.items||{}].forEach(function(o){for(k in o)items[k]=o[k];});
  (ent?d.entry:[]).concat(d.open||[],c.steps,ent&&d.exit?d.exit:(d.close||[])).forEach(function(s){
    if(s.k==='say'){steps.push({k:'say',t:fill(s.t),v:s.v,r:s.r});return;}
    if(s.k==='pool'){
      var pl=(d.pools||{})[s.pool]||[];if(!pl.length)return;
      var e=pl[ivPoolPick(s.pool,pl.length)];
      if(e.steps){   /* a group of questions: ids get the pool step's id in front */
        var pre=function(x){return s.id+'_'+x;};
        for(k in (e.items||{})){var it={};for(var f in e.items[k])it[f]=e.items[k][f];if(s.no&&it.no)it.no=s.no+' ・ '+it.no;items[pre(k)]=it;}
        e.steps.forEach(function(x){var y={};for(var f in x)y[f]=x[f];if(y.id)y.id=pre(y.id);if(y.k==='say')y.t=fill(y.t);steps.push(y);});
        return;
      }
      items[s.id]={no:s.no,pts:s.pts==null?5:s.pts,q:e.q,ja:e.ja,model:e.model,points:e.points};
      steps.push({k:'say',t:(s.pre||'')+e.q});
      if(e.yn)steps.push({k:'yn',id:s.id,sec:e.yn.sec||8,follow:{yes:e.yn.yes,no:e.yn.no},fsec:e.yn.fsec||s.sec});
      else steps.push({k:'ans',id:s.id,sec:s.sec});
      return;
    }
    steps.push(s);
  });
  IV.steps=steps;IV.items=items;
}

/* ---- the examiner's voice ---- */
function ivLang(v){return v||(IV.data&&IV.data.lang)||'en-US';}
function ivLA(){return ivLang().slice(0,2);}   /* lang attribute of the test language */
function ivVoice(lang){
  lang=ivLang(lang);var pre=lang.slice(0,2),male=IV.ex&&IV.ex[1]==='m',nl=function(v){return String(v.lang||'').replace('_','-').toLowerCase();};
  var vs=(tts.voices||[]).filter(function(v){return nl(v).indexOf(pre)===0;});
  if(pre==='en')vs=vs.filter(function(v){return /^en[-_](US|GB|AU|CA|IE|NZ)/i.test(v.lang||'');}).concat(vs.filter(function(v){return !/^en[-_](US|GB|AU|CA|IE|NZ)/i.test(v.lang||'');}));
  vs=vs.filter(function(v){return nl(v)===lang.toLowerCase();}).concat(vs.filter(function(v){return nl(v)!==lang.toLowerCase();}));   /* en-GB for IELTS first */
  var M=/\bmale\b|daniel|alex\b|fred|david|mark|guy|ryan|thomas|george|arthur|aaron|oliver|james|gordon|reed|eddy|rocko|lee\b/i,
      F=/female|samantha|karen|moira|tessa|victoria|susan|zira|kate|serena|allison|ava|jenny|aria|libby|sonia|emma|martha|nicky/i;
  return vs.filter(function(v){return male?M.test(v.name)&&!F.test(v.name):F.test(v.name);})[0]||vs[0]||null;
}
function ivSay(text,tok,done,lang){
  if(tok!==IV.tok)return;
  var fin=function(){if(tok===IV.tok)setTimeout(function(){if(tok===IV.tok)done();},450);};
  var nw=/^(ja|zh|ko)/.test(ivLang(lang))?Math.ceil(text.length/3):text.split(' ').length;   /* about how many words */
  if(!tts.ok){setTimeout(fin,Math.min(9000,700+nw*380));return;}
  try{speechSynthesis.cancel();}catch(e){}
  var u=new SpeechSynthesisUtterance(text),v=ivVoice(lang),fired=false,guard;
  u.lang=ivLang(lang);if(v)u.voice=v;u.rate=0.92;
  var once=function(){if(fired)return;fired=true;clearTimeout(guard);fin();};
  u.onend=once;u.onerror=once;
  guard=setTimeout(once,2500+nw*600);
  try{speechSynthesis.speak(u);}catch(e){once();}
}
function ivHush(){IV.tok++;clearInterval(IV.tm);IV.tm=0;ivSrStop();try{speechSynthesis.cancel();}catch(e){}}
function ivStop(){ivHush();IV.win=null;IV.ask=false;}

/* ---- listening to the learner (browser speech recognition) ---- */
function ivSrStart(){
  var C=typeof srCtor==='function'?srCtor():null;IV.win.fin='';IV.win.tmp='';
  if(!C||IV.noMic){IV.win.nosr=true;return;}
  var w=IV.win,r;
  function start(){
    if(IV.win!==w||w.closed)return;
    try{r=new C();}catch(e){w.nosr=true;ivWinPaint();return;}
    IV.sr=r;r.lang=(IV.data&&IV.data.lang)||'en-US';r.continuous=true;r.interimResults=true;
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
  ivStop();
  IV.ci=ivPickCard();IV.c=ivCards()[IV.ci];IV.ex=ivPickEx();ivBuild();
  IV.i=0;IV.ans={};IV.yn={};IV.self={};IV.att={};IV.tsel={};IV.up=false;IV.turned=false;IV.line='';IV.pardon=0;IV.stage='run';
  IV.face='';IV.role='';IV.hideLine=false;IV.notes='';IV.notesOn=false;
  try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(' ');u.volume=0;speechSynthesis.speak(u);}catch(e){}
  render();window.scrollTo(0,0);ivNext(IV.tok);
}
function ivNext(tok){
  if(tok!==IV.tok||IV.stage!=='run')return;
  var s=IV.steps[IV.i++];if(!s){ivEnd();return;}
  if(s.k==='say'){IV.line=s.t;IV.lineV=s.v;IV.role=s.r||'';IV.hideLine=false;IV.win=null;ivPaint();ivSay(s.t,tok,function(){ivNext(tok);},s.v);return;}
  if(s.k==='card'){IV.up=true;IV.face=s.show||'';ivPaint();ivNext(tok);return;}
  if(s.k==='hide'){IV.up=false;IV.turned=true;if(!s.keep)IV.notesOn=false;ivPaint();ivNext(tok);return;}
  if(s.k==='prep'){if(s.notes)IV.notesOn=true;ivWindow({kind:'prep',sec:s.sec,label:s.label,notes:!!s.notes},tok);return;}
  if(s.k==='rep'){   /* listen and repeat: the sentence is not shown */
    IV.line=s.t;IV.lineV=s.v;IV.role=s.r||'';IV.hideLine=true;IV.win=null;ivPaint();
    ivSay(s.t,tok,function(){ivWindow({kind:'read',rep:true,id:s.id,sec:s.sec,label:ivItem(s.id).no||'リピート'},tok);},s.v);return;
  }
  if(s.k==='topics'){ivWindow({kind:'topics',set:s.set||'topics',sec:s.sec,label:s.label||'トピックを選んで準備',notes:!!s.notes},tok);if(s.notes)IV.notesOn=true;return;}
  if(s.k==='read'){ivWindow({kind:'read',id:'read',sec:s.sec,label:'音読'},tok);return;}
  if(s.k==='ans'){ivWindow({kind:'ans',id:s.id,sec:s.sec,label:s.no||ivItem(s.id).no||'答え',hint:s.hint,cue:s.cue,tip:s.tip},tok);return;}
  if(s.k==='yn'){ivWindow({kind:'yn',id:s.id,sec:s.sec,label:ivItem(s.id).no,step:s},tok);return;}
  if(s.k==='tq'){   /* a question (or a role-play line) that depends on what was chosen on the card */
    var tp=ivChosen(s.set),f=s.f||'qs',q=(tp[f]||[])[s.n]||'',tid=s.id||'tq'+s.n,cue=(tp[f+'c']||[])[s.n];
    IV.line=q;IV.lineV='';IV.role=s.r||'';IV.hideLine=false;IV.win=null;ivPaint();
    ivSay(q,tok,function(){ivWindow({kind:'ans',id:tid,sec:s.sec,label:s.no||ivItem(tid).no||'質疑応答'+(s.n+1),cue:cue},tok);});return;
  }
  if(s.k==='end'){ivEnd();return;}
  ivNext(tok);
}
function ivItem(id){return IV.items[id]||{no:id==='name'?'名前':id==='how'?'あいさつ':''};}
function ivPardonOK(w){return !(IV.data&&IV.data.noPardon)&&w.kind!=='read'&&!!IV.line&&!w.hint;}
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
  if(w.kind==='topics'){if(ivSel(w.set)<0)IV.tsel[w.set]=0;ivNext(tok);return;}
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
  var q=w.step.follow[yn];IV.line=q;IV.lineV='';IV.win=null;ivPaint();
  ivSay(q,tok,function(){ivWindow({kind:'yn',id:w.id,sec:w.step.fsec,label:w.label,step:w.step,follow:true},tok);});
}
function ivEnd(){
  ivStop();IV.stage='result';IV.up=false;
  render();window.scrollTo(0,0);
}

/* ---- screens ---- */
function ivBarHTML(sub){
  var g=ivGrade(IV.key)||{name:'',g:'eiken'};
  return '<div class="fl-top"><button class="x" type="button" data-iv-close aria-label="閉じる">'+closeIcon()+'</button><div class="fl-id"><span class="lbl">'+IV_GROUPS[g.g][1]+'</span><b>'+esc(g.name)+(sub?' <small class="dim">'+sub+'</small>':'')+'</b></div></div>';
}
function ivEmoji(e,x,y,s){return '<text x="'+x+'" y="'+y+'" font-size="'+s+'" text-anchor="middle" dominant-baseline="central">'+e+'</text>';}
var IV_BG={airport:['#dff0ff','#c9d4e2'],park:['#dff6ff','#bfe5a6'],outdoor:['#e3f1ff','#c8e6b4'],room:['#fff6e8','#e7d2b8'],shop:['#fffbe6','#e5e1d3'],
  kitchen:['#f5f8ff','#d9dde6'],office:['#eef3f8','#cfd8e3'],classroom:['#f4f7ff','#d9cbb2'],station:['#eef1f6','#c6cad2'],beach:['#dcf1ff','#f1e0ae'],
  street:['#e7f0fa','#c9cdd3'],library:['#fbf5ea','#dcc9ad'],restaurant:['#fff2e8','#e2cbb5'],hospital:['#f2f8fb','#d5e1e6'],gym:['#f6f3ee','#d9c7a6'],
  snow:['#e9f2fb','#f7fbff'],night:['#2c3a57','#3d4a5f'],cockpit:['#dbe9f8','#59636f'],sky:['#cfe6fb','#e6f2fd']};
function ivSceneSVG(sc,label){
  var BG=IV_BG[sc.bg]||['#f2f5f9','#d7dde5'];
  var h='<svg class="iv-pic" viewBox="0 0 300 180" role="img" aria-label="'+esc(label||'イラスト')+'"><rect width="300" height="180" fill="'+BG[0]+'"/><rect y="120" width="300" height="60" fill="'+BG[1]+'"/>';
  (sc.items||[]).forEach(function(it){h+=ivEmoji(it[0],it[1],it[2],it[3]);});
  (sc.signs||[]).forEach(function(s){var w=s.t.length*7+16;h+='<rect x="'+(s.x-w/2)+'" y="'+(s.y-10)+'" width="'+w+'" height="20" rx="3" fill="'+(s.c||'#cf3342')+'"/><text x="'+s.x+'" y="'+(s.y+1)+'" font-size="11" font-weight="700" fill="#fff" text-anchor="middle" dominant-baseline="central" font-family="system-ui,sans-serif">'+esc(s.t)+'</text>';});
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
  var c=IV.c.card,f=IV.face,on=function(x){return !f||f===x;},h='<section class="card iv-card" aria-label="問題カード">';
  if(c.passage&&on('passage'))h+='<h3 class="iv-pt">'+esc(c.title)+'</h3><p class="iv-pass" lang="'+ivLA()+'">'+esc(c.passage)+'</p>';
  if(c.pic&&on('pic'))h+=(c.picTitle?'<h3 class="iv-pt" lang="'+ivLA()+'">'+esc(c.picTitle)+'</h3>':'')+ivSceneSVG(c.pic,'イラスト');
  if(c.picA&&on('pic'))h+='<div class="iv-ab"><div><span class="lbl">Picture A</span>'+ivSceneSVG(c.picA,'Picture A')+'</div><div><span class="lbl">Picture B</span>'+ivSceneSVG(c.picB,'Picture B')+'</div></div>';
  if(c.panels&&on('panels')){
    if(!c.passage||f)h+='<h3 class="iv-pt" lang="'+ivLA()+'">'+esc(c.seqTitle||c.title)+'</h3>';
    if(c.start)h+='<p class="iv-start" lang="'+ivLA()+'">Your story should begin with the following sentence: <b>'+esc(c.start)+'</b></p>';
    h+='<div class="iv-panels n'+c.panels.length+'">'+c.panels.map(function(p,i){
      return '<div class="iv-panel"><span class="iv-cap">'+(i+1)+'. '+esc(p.cap||'')+'</span>'+ivSceneSVG(p,'コマ'+(i+1))+'</div>';}).join('')+'</div>';
  }
  ivSets(c).forEach(function(set){
    if(!on(set))return;
    h+='<h3 class="iv-pt">'+esc(c[set+'Title']||c.title)+'</h3><ol class="iv-topics'+(c[set][0]&&c[set][0].pic?' pics':'')+'">'+c[set].map(function(t,i){
      return '<li><button type="button" data-iv-topic="'+(set==='topics'?'':set+':')+i+'" aria-pressed="'+(ivSel(set)===i)+'" lang="'+ivLA()+'">'+(t.pic?ivSceneSVG(t.pic,t.t):'')+'<span>'+esc(t.t)+'</span>'+
        (t.pts&&t.pts.length?'<ul>'+t.pts.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul>':'')+'</button></li>';}).join('')+'</ol>';
  });
  if(c.rolSet&&f==='rol'){var rl=ivChosen(c.rolSet).rol||{};h+='<h3 class="iv-pt" lang="'+ivLA()+'">'+esc(c.rolTitle||'')+'</h3><div class="iv-cue" lang="'+ivLA()+'"><p class="iv-cue-t">'+esc(rl.t||'')+'</p><ul>'+(rl.pts||[]).map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul></div>';}
  (c.roles||[]).forEach(function(r,i){if(!on('role'+i))return;h+='<h3 class="iv-pt" lang="'+ivLA()+'">'+esc(r.title)+'</h3><div class="iv-cue" lang="'+ivLA()+'">'+(r.setting?'<p class="iv-cue-t">'+esc(r.setting)+'</p>':'')+(r.lines||[]).map(function(x){return '<p>'+esc(x)+'</p>';}).join('')+(r.task&&r.task.length?'<ul>'+r.task.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul>':'')+'</div>';});
  if(c.cue&&on('cue'))h+='<div class="iv-cue" lang="'+ivLA()+'"><p class="iv-cue-t">'+esc(c.cue.t)+'</p><p>You should say:</p><ul>'+c.cue.b.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul><p>'+esc(c.cue.e)+'</p></div>';
  if(c.info&&on('info'))h+='<h3 class="iv-pt">'+esc(c.info.title)+'</h3><dl class="iv-info">'+c.info.rows.map(function(r){return '<dt>'+esc(r[0])+'</dt><dd lang="'+ivLA()+'">'+esc(r[1])+'</dd>';}).join('')+'</dl>';
  if(IV.notesOn&&IV.notes&&!(IV.win&&IV.win.notes))h+='<div class="iv-notes-show"><span class="lbl">メモ</span><p>'+esc(IV.notes)+'</p></div>';
  return h+'</section>';
}
function ivFlowList(){
  var d=IV.data,c=d.cards[0],flow=[];
  if(d.flow)return d.flow;
  if(ivEntryOn()&&d.entry)flow.push('入室 → 面接カードを渡す → 着席');
  flow.push('あいさつ・名前');
  if(c.card.passage)flow.push('黙読 20秒 → 音読');
  c.steps.forEach(function(s){
    var id=s.id;if(!id||!/^(q\d|narr|speech)$/.test(id))return;
    var it=(c.items||{})[id]||{no:s.no||id};
    flow.push((s.no||it.no)+(id==='narr'||id==='q2'&&c.card.panels?'(準備のあと)':''));
  });
  if(c.steps.some(function(s){return s.k==='topics';}))flow.push('トピックを選んで1分準備');
  if(c.steps.some(function(s){return s.k==='tq';}))flow.push('質疑応答');
  if(ivEntryOn()&&d.exit)flow.push('カードを返して退室');
  return flow;
}
function ivPickHTML(){
  var cs=ivCards(),hist=ivHist()[IV.key]||[];if(cs.length<2)return '';
  var last={};hist.forEach(function(r){var c=r.c||0;if(!(c in last))last[c]=r.pct;});
  return '<div class="iv-pick" role="group" aria-label="'+ivUnit()+'"><span class="lbl">'+ivUnit()+'('+cs.length+(ivUnit()==='カード'?'枚':'つ')+')</span><div class="iv-cs">'+
    '<button type="button" data-iv-pick="-1" aria-pressed="'+(IV.pick<0)+'"><b>おまかせ</b><small>本番みたいに</small></button>'+
    cs.map(function(c,i){return '<button type="button" data-iv-pick="'+i+'" aria-pressed="'+(IV.pick===i)+'"><b>'+ivUnit()+(i+1)+'</b><small>'+(i in last?'前回 '+last[i]+'%':'まだ')+'</small></button>';}).join('')+
    '</div></div>';
}
function ivIntroHTML(){
  var g=ivGrade(IV.key),h=ivBarHTML();
  if(IV.err)return h+'<p class="mx-note">'+esc(IV.err)+'</p><button type="button" class="ghost" data-iv-open="'+esc(IV.key)+'">もう一度読み込む</button>';
  if(!IV.data)return h+'<p class="dim" style="margin-top:20px">カードを読み込み中…</p>';
  var sr=typeof srCtor==='function'&&srCtor();
  h+='<section class="card iv-intro"><h2 class="jh">本番と同じ流れで練習</h2><ol class="iv-flow">'+ivFlowList().map(function(f){return '<li>'+esc(f)+'</li>';}).join('')+'</ol>'+
    '<p class="dim hint">'+esc(IV.data.voiceNote||'面接官の英語はこの端末の音声で読み上げます。面接官は毎回変わります。')+'音を出せる場所で、声に出して答えよう。約'+g.min+'分。</p>'+
    (sr?'<p class="dim hint">🎙 答えはブラウザの音声認識で文字にして、あとでお手本と見比べられます(このサイトには送られません)。はじめにマイクの許可を求められます。</p>'
       :'<p class="dim hint">この端末では文字起こしができません。声に出して答えて、終わったら「答え終わった」を押してね。</p>')+
    ivPickHTML()+
    '<label class="set-row iv-subt"><span>'+esc(IV.data.subNote||'英文を表示する(本番は表示されません)')+'</span><input type="checkbox" data-iv-sub'+(ivSub()?' checked':'')+'></label>'+
    (IV.data.entry?'<label class="set-row iv-subt"><span>入室・退室から練習する</span><input type="checkbox" data-iv-entry'+(ivEntryOn()?' checked':'')+'></label>':'')+
    '<button type="button" class="go" data-iv-start>面接を始める<small>'+(ivEntryOn()&&IV.data.entry?'入室から退室まで':'あいさつから')+'</small></button></section>'+
    '<p class="dim hint">'+esc(IV.data.origNote||'カードの英文・イラストはBabel Flightのオリジナルです。')+esc(IV.data.varies||'')+esc(IV.data.markNote||'採点は本番(英検CSEスコア)とは違う、自分でつける目安です。')+'</p>';
  var hist=ivHist()[IV.key]||[];
  if(hist.length)h+='<section class="card"><h2 class="jh">これまでの練習</h2><ul class="mx-hist">'+hist.slice(0,5).map(function(r){return '<li><span>'+esc(fmtDate(r.t))+(ivCards().length>1?' ・ '+ivUnit()+((r.c||0)+1):'')+'</span><b class="mono">'+r.pct+'%</b></li>';}).join('')+'</ul></section>';
  return h+'<div class="pad-b"></div>';
}
function ivRunHTML(){
  var rl=(IV.data.roles||{})[IV.role]||(IV.role==='atc'?{av:'🎧',name:IV.data.atcName}:null),atc=!!rl,who=rl?rl.av:IV.ex[1]==='m'?'👨‍🏫':'👩‍🏫';
  var h=ivBarHTML(IV.up?'カードあり':'')+'<div class="iv-ex'+(atc?' atc':'')+'"><span class="iv-av" aria-hidden="true">'+who+'</span><div class="iv-line" aria-live="polite">'+
    (rl&&rl.name?'<span class="lbl">'+esc(rl.name)+'</span>':'')+
    (IV.hideLine?'<span class="dim">(よく聞いて、聞こえたとおりにくり返そう。英文は表示されません)</span>'
      :ivSub()?'<span lang="'+esc(ivLang(IV.lineV).slice(0,2))+'">'+esc(IV.line||'…')+'</span>':'<span class="dim">'+esc(IV.data.hideNote||'(面接官が話しています。英文は非表示)')+'</span>')+'</div></div>';
  h+='<div id="ivWin">'+ivWinHTML()+'</div>';
  if(IV.up)h+=ivCardHTML();
  else if(IV.turned)h+='<p class="dim hint iv-down">カードは裏返して置いてあります。</p>';
  return h+'<button type="button" class="ghost iv-quit" data-iv-quit>中断する</button><div class="pad-b"></div>';
}
function ivWinHTML(){
  var w=IV.win;
  if(IV.ask)return '<div class="iv-win ask"><p>Yes と No、どちらで答えた?</p><div class="row2"><button class="go" type="button" data-iv-yn="yes" style="flex:1;margin-top:0">Yes</button><button class="go" type="button" data-iv-yn="no" style="flex:1;margin-top:0">No</button></div></div>';
  if(!w)return '';
  var pct=Math.max(0,Math.min(100,w.left/w.sec*100)),sec=Math.ceil(w.left);
  if(w.kind==='prep'||w.kind==='topics')return '<div class="iv-win prep"><span class="lbl">'+esc(w.label)+'</span><b class="mono iv-cd">'+sec+'</b><div class="iv-bar"><i style="width:'+pct+'%"></i></div>'+
    (w.kind==='topics'&&ivSel(w.set)<0?'<p class="dim hint iv-choose">'+esc(IV.data.chooseNote||'下のカードからトピックを1つ選ぼう')+'</p>':'')+
    (w.notes?'<textarea class="iv-notes" data-iv-notes rows="4" lang="'+ivLA()+'" placeholder="メモ(キーワードだけでOK)" aria-label="メモ">'+esc(IV.notes)+'</textarea>':'')+
    '<button type="button" class="ghost sm" data-iv-done>準備できた</button></div>';
  var tr=(w.fin||'')+(w.tmp?' <i>'+esc(w.tmp)+'</i>':'');
  return '<div class="iv-win ans'+(w.kind==='read'?' read':'')+'"><div class="iv-mic"><span class="iv-dot" aria-hidden="true"></span><b>'+esc(w.label)+(w.follow?' (2つ目の質問)':'')+'</b><span class="mono">あと'+sec+'秒</span></div>'+
    '<div class="iv-bar"><i style="width:'+pct+'%"></i></div>'+
    (w.hint?'<p class="iv-hint">'+esc(w.hint)+'</p>':'')+(w.cue?'<p class="iv-cue-s">'+esc(w.cue)+'</p>':'')+(w.tip?'<p class="dim hint">'+esc(w.tip)+'</p>':'')+
    (w.nosr?'<p class="dim hint">声に出して答えよう(文字起こしなし)</p>':'<p class="iv-tr" lang="'+ivLA()+'">'+(tr?esc(w.fin||'')+(w.tmp?' <i>'+esc(w.tmp)+'</i>':''):'<span class="dim">'+(w.rep?'聞こえた英文を、そのままくり返そう':w.kind==='read'?'カードの英文を声に出して読もう':(IV.data.ansNote||'英語で答えよう'))+'</span>')+'</p>')+
    '<button type="button" class="go" data-iv-done>'+(w.rep?'くり返した':w.kind==='read'?'読み終わった':w.hint?'言えた':'答え終わった')+'</button>'+
    (ivPardonOK(w)?'<button type="button" class="ghost sm iv-pardon" data-iv-pardon>'+esc(IV.data.pardon||'Pardon?')+'<small>もう一度言ってもらう</small></button>':'')+'</div>';
}
function ivWinPaint(){
  var b=$('ivWin');if(!b)return;
  var w=IV.win,ta=b.querySelector('[data-iv-notes]');
  if(w&&w.notes&&ta){   /* keep the notes box while the countdown runs */
    var cd=b.querySelector('.iv-cd'),bar=b.querySelector('.iv-bar i');
    if(cd)cd.textContent=Math.ceil(w.left);if(bar)bar.style.width=Math.max(0,Math.min(100,w.left/w.sec*100))+'%';return;
  }
  b.innerHTML=ivWinHTML();
}
function ivPaint(){if(view==='iv'&&IV.stage==='run'){var main=$('main');if(main)main.innerHTML='<div class="iv">'+ivRunHTML()+'</div>';}}

/* reading aloud: which words of the passage were heard, in order */
function ivReadMarks(passage,heard){
  var P=passage.split(/\s+/),norm=function(w){return w.toLowerCase().replace(/[^\p{L}\p{N}']/gu,'');},a=P.map(norm),b=String(heard||'').split(/\s+/).map(norm).filter(Boolean);
  var n=a.length,m=b.length,L=[],i,j;
  for(i=0;i<=n;i++){L.push(new Array(m+1).fill(0));}
  for(i=n-1;i>=0;i--)for(j=m-1;j>=0;j--)L[i][j]=a[i]&&a[i]===b[j]?L[i+1][j+1]+1:Math.max(L[i+1][j],L[i][j+1]);
  var hit=new Array(n).fill(false);i=0;j=0;
  while(i<n&&j<m){if(a[i]&&a[i]===b[j]){hit[i]=true;i++;j++;}else if(L[i+1][j]>=L[i][j+1])i++;else j++;}
  return {words:P,hit:hit,pct:Math.round(hit.filter(Boolean).length/Math.max(1,n)*100)};
}
var IV_RATE=[['3','◎ できた',1],['2','◯ まあまあ',0.6],['1','△ もう少し',0.2]];
var IV_DOOR=['enter','cardin','sit','cardback','bye'];   /* entering and leaving: not marked, part of the attitude */
function ivRateHTML(id){
  return '<div class="iv-rate" role="group" aria-label="自己採点">'+IV_RATE.map(function(r){return '<button type="button" data-iv-rate="'+id+':'+r[0]+'" aria-pressed="'+(IV.self[id]===r[0])+'">'+r[1]+'</button>';}).join('')+'</div>';
}
function ivModelHTML(m){
  if(!m)return '';
  var list=Array.isArray(m)?m:Object.keys(m).map(function(k){return m[k];});
  return list.map(function(t,i){return '<div class="iv-model"><span class="lbl">お手本'+(list.length>1?' '+(i+1):'')+'</span><p lang="'+ivLA()+'">'+esc(t)+'</p><button type="button" class="mini" data-iv-say="'+esc(t.replace(/^(Yes|No)\. → /,'$1. '))+'" aria-label="お手本を聞く">'+speakerIcon()+'</button></div>';}).join('');
}
function ivScore(){
  var tot=0,got=0;
  Object.keys(IV.items).forEach(function(id){var it=IV.items[id];if(!it.pts)return;if(id==='tq1')return;tot+=it.pts;var r=IV_RATE.filter(function(x){return x[0]===IV.self[id];})[0];got+=it.pts*(r?r[2]:0);});
  if(IV.data.att!==false){tot+=3;got+=['a','b','c'].filter(function(k){return IV.att[k];}).length;}
  return Math.round(got/Math.max(1,tot)*100);
}
function ivResultHTML(){
  var d=IV.data,c=IV.c,h=ivBarHTML('結果'+(ivCards().length>1?' ・ '+ivUnit()+(IV.ci+1):''));
  h+='<section class="card iv-res"><h2 class="jh">おつかれさま!</h2><p class="dim" style="font-size:13.5px">自分の答え(文字起こし)とお手本を見比べて、1問ずつ採点しよう。採点すると下に目安が出ます。</p></section>';
  if(c.card.passage){
    var rm=ivReadMarks(c.card.passage,IV.ans.read);
    h+='<section class="card iv-q"><div class="card-h"><h2 class="jh">音読</h2>'+(IV.ans.read?'<span class="lbl">聞き取れた語 '+rm.pct+'%</span>':'')+'</div>'+
      '<p class="iv-pass marks" lang="'+ivLA()+'">'+rm.words.map(function(w,i){return '<span class="'+(IV.ans.read?(rm.hit[i]?'hit':'miss'):'')+'">'+esc(w)+'</span>';}).join(' ')+'</p>'+
      (IV.ans.read?'<p class="dim hint">緑=聞き取れた語、赤=聞き取れなかった語(発音や読み飛ばしのチェックに)</p>':'<p class="dim hint">文字起こしはありません。</p>')+
      '<ul class="iv-pts">'+IV.items.read.points.map(function(p){return '<li>'+esc(p)+'</li>';}).join('')+'</ul>'+ivRateHTML('read')+'</section>';
  }
  var order=[],tqs={};IV.steps.forEach(function(s){if((s.k==='ans'||s.k==='yn'||s.k==='rep')&&IV.items[s.id]&&order.indexOf(s.id)<0&&IV_DOOR.indexOf(s.id)<0)order.push(s.id);if(s.k==='tq'){var tid=s.id||'tq'+s.n;tqs[tid]=s;order.push(tid);}});
  Object.keys(IV.items).forEach(function(id){if((IV.items[id].overall||id==='gv'||id==='pf')&&order.indexOf(id)<0)order.push(id);});
  if(IV.notes)h+='<section class="card iv-q"><h2 class="jh">準備のメモ</h2><p class="iv-notes-show" lang="'+ivLA()+'">'+esc(IV.notes)+'</p></section>';
  order.forEach(function(id){
    var it=IV.items[id];if(!it)return;
    var q=it.q,tqm=null;if(tqs[id]){var ts=tqs[id],tp=ivChosen(ts.set),tf=ts.f||'qs';q=(tp[tf]||[])[ts.n];if(tp[tf+'m'])tqm=[tp[tf+'m'][ts.n]];}
    var said=IV.ans[id],ov=it.overall||id==='gv'||id==='pf';
    if(it.rep){   /* listen and repeat: the sentence with the words heard */
      var rr=ivReadMarks(it.rep,said);
      h+='<section class="card iv-q"><div class="card-h"><h2 class="jh">'+esc(it.no)+'</h2>'+(said?'<span class="lbl">聞き取れた語 '+rr.pct+'%</span>':'')+'</div>'+
        '<p class="iv-pass marks" lang="'+ivLA()+'">'+rr.words.map(function(w,i){return '<span class="'+(said?(rr.hit[i]?'hit':'miss'):'')+'">'+esc(w)+'</span>';}).join(' ')+'</p>'+
        '<div class="iv-said"><span class="lbl">あなたの答え</span><p lang="'+ivLA()+'">'+(said?esc(said):'<span class="dim">(文字起こしなし)</span>')+'</p></div>'+
        ivModelHTML([it.rep])+(it.points&&it.points.length?'<ul class="iv-pts">'+it.points.map(function(p){return '<li>'+esc(p)+'</li>';}).join('')+'</ul>':'')+(it.pts?ivRateHTML(id):'')+'</section>';
      return;
    }
    h+='<section class="card iv-q"><div class="card-h"><h2 class="jh">'+esc(it.no)+'</h2>'+(IV.yn[id]?'<span class="lbl">'+IV.yn[id].toUpperCase()+'</span>':'')+'</div>'+
      (q&&!/^\(/.test(q)?'<p class="iv-qq" lang="'+ivLA()+'">'+esc(q)+'</p>':'')+(it.ja?'<p class="dim hint">'+esc(it.ja)+'</p>':'')+
      (ov?'':'<div class="iv-said"><span class="lbl">あなたの答え</span><p lang="'+ivLA()+'">'+(said?esc(said):'<span class="dim">(文字起こしなし)</span>')+'</p></div>');
    var cs=it.set||(id==='speech'&&c.card.topics?'topics':'');
    if(cs){var tp2=ivChosen(cs);h+='<div class="iv-model"><span class="lbl">'+esc(it.setLabel||'選んだトピック')+'</span><p lang="'+ivLA()+'">'+esc(tp2.t||'')+'</p></div>'+((tp2.outline||[]).length?'<ul class="iv-pts">'+tp2.outline.map(function(p){return '<li>'+esc(p)+'</li>';}).join('')+'</ul>':'');if(tp2.model)tqm=[tp2.model];}
    var m=tqm||it.model;if(m&&!Array.isArray(m)&&IV.yn[id])m=[m[IV.yn[id]]].concat(Object.keys(m).filter(function(k){return k!==IV.yn[id];}).map(function(k){return m[k];}));
    h+=ivModelHTML(m)+(it.points&&it.points.length?'<ul class="iv-pts">'+it.points.map(function(p){return '<li>'+esc(p)+'</li>';}).join('')+'</ul>':'')+(it.pts?ivRateHTML(id):'')+'</section>';
  });
  var door=IV_DOOR.filter(function(id){return IV.steps.some(function(s){return s.id===id;});});
  if(d.att!==false)h+='<section class="card iv-q"><h2 class="jh">アティチュード(態度)</h2><p class="dim hint">本番では、入室から退室までの話し方も見られています。'+(IV.pardon?' 今回は Pardon? を'+IV.pardon+'回使いました(自然な聞き返しは減点されません)。':'')+'</p>'+
    (door.length?'<ul class="iv-door">'+door.map(function(id){var it=IV.items[id]||{};return '<li><span class="lbl">'+esc(it.no||id)+'</span><span lang="'+ivLA()+'">'+(IV.ans[id]?esc(IV.ans[id]):'<span class="dim">—</span>')+'</span><small>お手本: <span lang="'+ivLA()+'">'+esc((it.model||[])[0]||'')+'</span></small></li>';}).join('')+'</ul>':'')+
    [['a','聞こえる大きさの声で、はっきり話せた'],['b','長い沈黙を作らず、何か答えようとした'],['c','分からないときは聞き返せた(Pardon? / Could you say that again?)']].map(function(x){
      return '<label class="iv-att"><input type="checkbox" data-iv-att="'+x[0]+'"'+(IV.att[x[0]]?' checked':'')+'><span>'+x[1]+'</span></label>';}).join('')+'</section>';
  h+='<section class="card iv-sum" id="ivSum">'+ivSumHTML()+'</section>'+
    '<div class="row2" style="margin-top:12px"><button type="button" class="ghost" data-iv-again style="flex:1">同じ'+ivUnit()+'で<small>'+esc(d.againNote||'質問は変わります')+'</small></button><button type="button" class="ghost" data-iv-next style="flex:1;margin-top:0">別の'+ivUnit()+'で</button></div>'+
    '<button type="button" class="go" data-iv-close>終わる</button><div class="pad-b"></div>';
  return h;
}
function ivSumHTML(){
  var rated=Object.keys(IV.self).length,p=ivScore();
  return '<span class="lbl">自己採点の目安</span><b class="mono iv-pct">'+(rated?p+'%':'—')+'</b><p class="dim hint">'+(rated?esc(IV.data.sumNote||'本番の合否は英検CSEスコアで決まります。60〜70%をこえたら、本番でも手ごたえがありそう。'):'1問ずつ採点すると、ここに目安が出ます。')+'</p>';
}
function ivKeepHist(){
  var o=ivHist(),l=o[IV.key]||[],p=ivScore();
  if(l[0]&&l[0].run===IV.run){l[0].pct=p;}else l.unshift({t:Date.now(),pct:p,run:IV.run,c:IV.ci});
  o[IV.key]=l.slice(0,12);try{localStorage.setItem(IV_HIST,JSON.stringify(o));}catch(e){}
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
    if(!g||g.g!=='eiken'||!ivOn(g.L))return h;
    var i=h.indexOf('</section>');
    return i<0?h:h.slice(0,i+10)+'<button type="button" class="go" data-iv-open="'+g.k+'">続けて二次試験(面接)へ<small>本番と同じ流れ ・ 約'+g.min+'分</small></button>'+h.slice(i+10);
  };
})();
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  var a=function(n){return t.hasAttribute(n);},g=function(n){return t.getAttribute(n);};
  if(a('data-iv-open')){if(view==='mx'&&typeof mxStop==='function'){mxStop();MX.stage='';MX.key='';}ivOpen(g('data-iv-open'));return;}
  if(view!=='iv')return;
  if(a('data-iv-close')){if(IV.stage==='result')ivKeepHist();ivStop();IV.stage='';IV.key='';go('home');return;}
  if(a('data-iv-start')){if(!IV.data)return;IV.run=Date.now();ivStart();return;}
  if(a('data-iv-pick')){IV.pick=parseInt(g('data-iv-pick'),10);if(!(IV.pick>=0))IV.pick=-1;Array.prototype.forEach.call(document.querySelectorAll('[data-iv-pick]'),function(b){b.setAttribute('aria-pressed',String(b===t));});return;}
  if(a('data-iv-done')){ivWinDone(IV.tok);return;}
  if(a('data-iv-pardon')){
    var pw=IV.win;if(!pw||pw.closed||pw.kind==='read')return;
    pw.closed=true;clearInterval(IV.tm);ivSrStop();IV.pardon=(IV.pardon||0)+1;
    var ptok=++IV.tok,again={kind:pw.kind,id:pw.id,sec:pw.sec,label:pw.label,step:pw.step,follow:pw.follow,cue:pw.cue,tip:pw.tip};
    IV.win=null;ivPaint();
    ivSay(IV.line,ptok,function(){ivWindow(again,ptok);},IV.lineV);
    return;
  }
  if(a('data-iv-yn')){var w=IV.win;if(w&&w.need){ivFollow(w,g('data-iv-yn'),IV.tok);}return;}
  if(a('data-iv-topic')){var tv=g('data-iv-topic').split(':'),tset=tv.length>1?tv[0]:'topics';IV.tsel[tset]=parseInt(tv[tv.length-1],10)||0;
    Array.prototype.forEach.call(document.querySelectorAll('[data-iv-topic]'),function(b){var bv=b.getAttribute('data-iv-topic');if((bv.indexOf(':')>0?bv.split(':')[0]:'topics')===tset)b.setAttribute('aria-pressed',String(b===t));});
    var hn=document.querySelector('.iv-win .iv-choose');if(hn&&IV.win&&IV.win.set===tset)hn.parentNode.removeChild(hn);ivWinPaint();return;}
  if(a('data-iv-quit')){
    $('sheetHost').innerHTML='<div class="sheet plain" role="alertdialog" aria-label="中断"><div class="sheet-in"><h3>面接を中断しますか?</h3><p class="dim" style="font-size:14px">ここまでの答えは消えます。</p><div class="row2"><button class="ghost" type="button" data-close-sheet style="flex:1">続ける</button><button class="go" type="button" data-iv-quit-yes style="flex:1;margin-top:0">中断する</button></div></div></div>';
    return;
  }
  if(a('data-iv-quit-yes')){closeSheet();ivStop();IV.stage='intro';render();window.scrollTo(0,0);return;}
  if(a('data-iv-rate')){var p=g('data-iv-rate').split(':');IV.self[p[0]]=p[1];Array.prototype.forEach.call(t.parentNode.querySelectorAll('button'),function(b){b.setAttribute('aria-pressed',String(b===t));});var s=$('ivSum');if(s)s.innerHTML=ivSumHTML();ivKeepHist();return;}
  if(a('data-iv-say')){try{speechSynthesis.cancel();}catch(x){}var tok=++IV.tok;ivSay(g('data-iv-say'),tok,function(){});return;}
  if(a('data-iv-again')){ivKeepHist();IV.pick=IV.ci;IV.run=Date.now();ivStart();return;}
  if(a('data-iv-next')){ivKeepHist();IV.pick=-1;IV.run=Date.now();ivStart();return;}
});
document.addEventListener('input',function(e){var el=e.target;if(el&&el.hasAttribute&&el.hasAttribute('data-iv-notes'))IV.notes=String(el.value||'').slice(0,600);});
document.addEventListener('change',function(e){
  var el=e.target;if(!el||!el.hasAttribute)return;
  if(el.hasAttribute('data-iv-sub')){try{localStorage.setItem(IV_SUBKEY,el.checked?'1':'0');}catch(x){}return;}
  if(el.hasAttribute('data-iv-entry')){try{localStorage.setItem(IV_ENTKEY,el.checked?'1':'0');}catch(x){}if(view==='iv'&&IV.stage==='intro')render();return;}
  if(el.hasAttribute('data-iv-att')){IV.att[el.getAttribute('data-iv-att')]=el.checked;var s=$('ivSum');if(s)s.innerHTML=ivSumHTML();if(Object.keys(IV.self).length)ivKeepHist();}
});
document.addEventListener('visibilitychange',function(){if(document.hidden&&view==='iv'&&IV.stage==='run'){ivStop();IV.stage='intro';render();}});
