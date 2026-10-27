/* ================= AI ON THE STANDALONE SITE =================
   Outside Claude there is no window.claude, so 「AIに質問」 and the AI管制官 go through this
   site's own server (/api/ai/*), which asks Claude with the site's API key.
   Signed-in accounts only, with a daily limit per account (the server counts and enforces it). */
var SAI={on:false,enabled:false,left:null,seen:'',lastView:''};
try{SAI.on=!!ACCT.on;}catch(e){}
var aiAtcEntryHTML=null,atcNoteText=null;
function saiPost(path,body,signal){
  if(BF_APP&&!aiConsented())return aiConsentAsk().then(function(ok){
    if(!ok)return new Response(JSON.stringify({ok:false,error:'consent'}),{status:403,headers:{'content-type':'application/json'}});
    return bfFetch(path,{method:'POST',cache:'no-store',headers:{'content-type':'application/json'},body:JSON.stringify(body),signal:signal});
  });
  return bfFetch(path,{method:'POST',cache:'no-store',headers:{'content-type':'application/json'},body:JSON.stringify(body),signal:signal});
}
function saiErr(j,kind){
  var c=(j&&j.error)||'';
  if(c==='consent')return 'AI機能を使うには、AIに送る内容の確認で「同意して使う」を選んでね。';
  if(c==='signin')return 'ログインが切れたみたい。「記録」画面からもう一度ログインしてね。';
  if(c==='quota'){
    if(kind==='ask')return '今日の質問はここまで(1日20回)。また明日ね！';
    return j.left&&j.left.atc===0?'今日のAI管制官はここまで(1日5回)。また明日ね！':'今日はたくさん交信したので、ここまで。また明日ね！';
  }
  if(c==='busy')return '今日はAIがとても混んでいるので、ここまでにしています。また明日試してね。';
  if(c==='disabled')return 'AI機能は今お休み中です。';
  if(c==='too_long')return 'この交信は長くなったので、ここで終わりにしよう。';
  if(c==='upstream')return 'AIが答えられませんでした。少し待ってからもう一度試してね。(回数は減っていないよ)';
  if(c==='invalid_json')return '返答をうまく読み取れませんでした。もう一度送ってみてね。';
  return 'うまくいきませんでした。もう一度試してね。';
}
function saiLeftText(kind){
  var n=SAI.left?SAI.left[kind]:null;
  if(typeof n==='number'&&n>=999)return 'テスト用アカウント ・ 回数制限なし';
  return typeof n==='number'?'今日はあと'+n+'回':'';
}
/* re-draw the screens that show AI status, only when something actually changed */
function saiRefreshView(){
  var key=JSON.stringify([SAI.enabled,!!ACCT.me,SAI.left]);
  if(key===SAI.seen)return;
  SAI.seen=key;
  if(view==='review'||(view==='atc'&&!ATC.sc))render();
}
function saiStatus(){
  if(!SAI.on)return;
  bfFetch('/api/ai/status',{cache:'no-store'}).then(function(r){return r.json();}).then(function(j){
    SAI.enabled=!!(j&&j.enabled);SAI.left=j&&j.signedIn&&j.left?j.left:null;
  },function(){}).then(function(){AI.checked=true;saiRefreshView();});
}
if(SAI.on){
  Object.defineProperty(AI,'ok',{configurable:true,get:function(){return SAI.enabled&&!!ACCT.me;},set:function(){}});
  initAI=function(){AI.checked=false;saiStatus();};
  /* sign-in, sign-out and account changes */
  (function(){
    var s0=acctStartSync;acctStartSync=function(){var r=s0.apply(this,arguments);saiStatus();return r;};
    var o0=acctSignedOut;acctSignedOut=function(){var r=o0.apply(this,arguments);SAI.left=null;saiRefreshView();return r;};
    var r0=render;render=function(){
      var v=view,was=SAI.lastView;SAI.lastView=v;
      var out=r0.apply(this,arguments);
      if(v==='review'&&was!=='review'&&AI.checked)saiStatus(); // fresh counts each time the practice list opens
      return out;
    };
  })();
  aiAtcEntryHTML=function(){
    if(!AI.checked)return '<p class="warn">AI機能を確認中…</p>';
    if(!SAI.enabled)return '<p class="warn">AI管制官は準備中です。もうすぐ使えるようになるよ。</p>';
    if(!ACCT.me)return '<p class="dim sai-note">ログインすると使えます(無料・1日5回まで)。</p><button class="go sm" type="button" data-acct-open>ログイン / 新規登録</button>';
    if(SAI.left&&SAI.left.atc<=0)return '<p class="warn">今日のAI管制官はここまで。また明日ね！</p>';
    return '<button class="go sm" type="button" data-atc>交信をはじめる</button>'+(SAI.left?'<p class="sai-left">'+saiLeftText('atc')+'</p>':'');
  };
  atcNoteText=function(){
    return 'AI管制官は1日5回まで('+(saiLeftText('atc')||'ログインが必要')+')。AIの答えはまちがうこともあるので、本物の交信方法は教材でも確かめてね。';
  };
  aiBtnHTML=function(){
    return SAI.enabled?'<div id="aiBox" class="aibox"><button class="sq ai" type="button" data-ai-open>AIに「なぜ？」を質問する</button></div>':'';
  };
  var saiOpen0=aiOpen;
  aiOpen=function(){
    var box=$('aiBox');if(!box)return;
    if(!ACCT.me){box.innerHTML='<p class="sai-note">AIへの質問は、ログインすると使えるよ(無料・1日20回まで)。ログインはレッスンのあと「記録」画面からできます。</p>';return;}
    saiOpen0();
    box.insertAdjacentHTML('beforeend','<p id="aiLeft" class="sai-left">'+(saiLeftText('ask')?saiLeftText('ask')+' ・ ':'')+'AIの答えはまちがうこともあるよ</p>');
  };
  aiAsk=function(q){
    if(!F||!F.cur||!q)return;
    var out=$('aiOut');if(!out)return;
    if(!ACCT.me){out.textContent='ログインすると使えるよ。';return;}
    var d=dat(F.cur.it);
    aiStop();
    out.textContent='考え中…';out.classList.add('wait');
    var ctl=new AbortController();AI.ctl=ctl;
    var acc='';
    var setLeft=function(){var el=$('aiLeft');if(el)el.textContent=(saiLeftText('ask')?saiLeftText('ask')+' ・ ':'')+'AIの答えはまちがうこともあるよ';};
    saiPost('/api/ai/ask',{lang:F.lang,phrase:String(d.t||'').slice(0,300),jp:String(d.jp||'').slice(0,300),reading:String(d.r||'').slice(0,300),note:String(d.n||'').slice(0,600),question:String(q).slice(0,200)},ctl.signal)
    .then(function(r){
      if(!r.ok)return r.json().catch(function(){return {};}).then(function(j){
        if(j&&j.left)SAI.left=j.left;
        out.classList.remove('wait');out.textContent=saiErr(j,'ask');setLeft();
        if(j&&(j.error==='signin'||j.error==='disabled'))saiStatus();
      });
      var n=parseInt(r.headers.get('x-ai-left'),10);
      if(!isNaN(n)){SAI.left=SAI.left||{ask:0,atc:0};SAI.left.ask=n;setLeft();}
      var show=function(){out.classList.remove('wait');out.textContent=acc;};
      if(!r.body||!r.body.getReader)return r.text().then(function(t){acc=t;show();});
      var rd=r.body.getReader(),dec=new TextDecoder();
      var pump=function(){return rd.read().then(function(x){
        if(x.done){acc+=dec.decode();show();return;}
        acc+=dec.decode(x.value,{stream:true});if(acc)show();return pump();
      });};
      return pump().then(function(){if(!acc.trim()){out.textContent=saiErr({error:'upstream'},'ask');}});
    })
    .catch(function(e){
      if(e&&e.name==='AbortError')return;
      out.classList.remove('wait');
      out.textContent=(acc?acc+'\n\n(途中で通信が切れました)':'通信できませんでした。電波を確認して、もう一度試してね。');
    })
    .then(function(){if(AI.ctl===ctl)AI.ctl=null;});
  };
  /* AIの例文練習 through the site's server */
  aiDrillAvail=function(){return SAI.enabled&&!!ACCT.me;};
  aiDrillMake=function(L,items,signal){
    var body={lang:L,variant:L==='en'&&save.enVar==='uk'?'uk':'us',items:items.map(function(d){return {t:String(d.t||'').slice(0,200),jp:String(d.jp||'').slice(0,200)};})};
    return saiPost('/api/ai/drill',body,signal).then(function(r){return r.json().catch(function(){return {};});}).then(function(j){
      if(j&&j.left)SAI.left=j.left;
      if(!j||!j.ok)throw {code:(j&&j.error)||'server'};
      var qs=aiDrillClean(j);if(!qs.length)throw {code:'invalid_json'};
      return {qs:qs};
    });
  };
  aiDrillErr=function(e){
    var c=e&&e.code;
    if(c==='quota')return '今日のAI例文練習はここまで(1日10回)。また明日ね！';
    if(c==='signin'||c==='disabled')saiStatus();
    return e&&e.name==='TypeError'?'通信できませんでした。電波を確認して、もう一度試してね。':saiErr({error:c},'drill');
  };
  atcSend=function(){
    var inp=$('atcIn');if(!inp||ATC.busy||ATC.done||!ATC.sc)return;
    var text=inp.value.trim().slice(0,300);if(!text)return;
    if(!ATC.ex)ATC.ex=[];
    inp.value='';ATC.busy=true;
    var me={who:'me',text:text,wait:true};ATC.log.push(me);atcRefresh();
    var ctl=new AbortController();ATC.ctl=ctl;
    var at=ATC,sc=ATC.sc;
    saiPost('/api/ai/atc',{scenario:sc.id,history:ATC.ex.slice(),pilot:text},ctl.signal)
    .then(function(r){return r.json().catch(function(){return {};});})
    .then(function(j){
      if(ATC!==at||ATC.sc!==sc)return; // left this call meanwhile
      ATC.busy=false;me.wait=false;
      if(j&&j.left)SAI.left=j.left;
      if(!j||!j.ok){
        me.err=saiErr(j,'atc');
        if(j&&j.error==='too_long'){ATC.done=true;render();window.scrollTo(0,document.body.scrollHeight);}
        else atcRefresh();
        if(j&&(j.error==='signin'||j.error==='disabled'))saiStatus();
        return;
      }
      var s=parseInt(j.score,10);me.score=isNaN(s)?0:clamp(s,0,3);me.fb=String(j.feedback_ja||'');me.better=String(j.better||'');
      var atc=String(j.atc||'').trim();
      ATC.ex.push({pilot:text,atc:atc,score:me.score,feedback:me.fb,better:me.better});
      if(atc){ATC.log.push({who:'atc',text:atc});speak(atc,'en-US',false,true);}
      if(j.done===true||ATC.ex.length>=8){ATC.done=true;render();window.scrollTo(0,document.body.scrollHeight);}
      else atcRefresh();
      if(me.score>=3)chimeOK();
    },function(e){
      if(ATC!==at||ATC.sc!==sc)return;
      ATC.busy=false;me.wait=false;
      if(e&&e.name==='AbortError')return;
      me.err='通信できませんでした。電波を確認して、もう一度送ってね。';atcRefresh();
    });
  };
}
