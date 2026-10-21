/* ================= LEVEL ADJUSTMENT =================
   Follows each learner's accuracy per language:
   - 飛び級テスト: learners who keep getting things right can skip a unit with a short, harder test.
   - 補習フライト: a lesson with many mistakes adds an extra flight built from those phrases,
     asked in different forms (穴埋め・並べ替え・聞き取り・入力).
   - Answer choices get closer to the right answer for strong learners, and further for those who struggle.
   - AIの例文練習: AI writes new example sentences around the phrases that were missed (when AI is available). */
var SKIP_N=6,SKIP_MAX_MISS=1,REM_MAX=6;
function accOf(L){var a=save.acc&&save.acc[L];return a&&a.n>0?a:{a:0.75,n:0};}
function accNote(L,corr,answered){
  if(!(answered>0))return;
  if(!save.acc)save.acc={};
  var r=clamp(corr/answered,0,1),a=save.acc[L];
  save.acc[L]=a&&a.n>0?{a:Math.round((a.a*0.7+r*0.3)*1000)/1000,n:Math.min(a.n+1,999)}:{a:Math.round(r*1000)/1000,n:1};
}
/* how many look-alike choices to mix in: more for strong learners, none for those who struggle */
function lookAlikes(L){var a=accOf(L);if(a.n<2)return Math.random()<0.5?1:2;return a.a>=0.88?3:a.a>=0.7?(Math.random()<0.5?1:2):0;}
function skipEligible(L,uid){
  var u=UNITS[L][uid],a=accOf(L);
  if(!(u&&u.kind!=='scene'&&u.items.length>=SKIP_N))return false;
  if(typeof entitled==='function'&&entitled())return true; /* test account: always offered */
  return unitRec(L,uid).n===0&&a.n>=3&&a.a>=0.85;
}
function skipBtnHTML(L,uid){
  if(!skipEligible(L,uid))return '';
  return '<button class="ghost skip-go" type="button" data-skip-test="'+esc(uid)+'">飛び級テストに挑戦<small>'+SKIP_N+'問 ・ ミス'+SKIP_MAX_MISS+'つまでなら合格して、このレッスンを飛ばせる</small></button>';
}
function startSkipTest(uid){
  var L=save.lang,u=UNITS[L][uid];if(!u)return;
  var items=shuffle(u.items.map(function(x,i){return {uid:uid,i:i};})).slice(0,SKIP_N);
  startFlight({mode:'skip',lang:L,uid:uid,items:items});
}
/* ---- remedial flights ---- */
function remList(L){return (save.rem&&save.rem[L])||[];}
function remAdd(L,uid,keys){
  if(!save.rem)save.rem={};
  var list=remList(L).filter(function(r){return r.u!==uid;});
  list.unshift({u:uid,k:keys.slice(0,8),t:Date.now()});
  save.rem[L]=list.slice(0,REM_MAX);
}
function remDone(L,uid,stillWrong){
  if(!save.rem)return;
  var list=remList(L).map(function(r){return r.u===uid?(stillWrong.length?{u:uid,k:stillWrong.slice(0,8),t:Date.now()}:null):r;}).filter(Boolean);
  save.rem[L]=list;
}
function startRem(L,uid){
  var r=null;remList(L).forEach(function(x){if(x.u===uid)r=x;});if(!r)return;
  var items=r.k.map(function(k){var m=/^(.+)\.(\d+)$/.exec(k);return m&&UNITS[L][m[1]]&&UNITS[L][m[1]].items[+m[2]]?{uid:m[1],i:+m[2]}:null;}).filter(Boolean);
  if(!items.length){remDone(L,uid,[]);store();render();return;}
  startFlight({mode:'rem',lang:L,uid:uid,items:items});
}
function remCardHTML(L){
  var list=remList(L).filter(function(r){return UNITS[L][r.u];});
  if(!list.length)return '';
  return '<section class="card rem-card"><div class="card-h"><h2 class="jh">補習フライト</h2><span class="lbl">苦手を別の形で練習</span></div>'+
    '<p class="dim" style="font-size:13px;margin-top:4px">間違いが多かったレッスンの苦手フレーズを、穴埋め・並べ替え・聞き取りなど別の形で出します。ミス1つまでで卒業。</p>'+
    list.map(function(r){return '<button class="choice rem-go" type="button" data-rem="'+esc(r.u)+'"><b>'+esc(unitTitle(r.u))+'</b><small>苦手 '+r.k.length+'フレーズ ・ 約'+Math.max(1,Math.round(r.k.length*3*0.2))+'分</small></button>';}).join('')+'</section>';
}
/* ---- 穴埋め (cloze): blank out the most telling word ---- */
function clozeWord(w){return w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu,'');}
function clozeKey(d){
  var tk=tokensOf(d.t);if(tk.length<3)return null;
  var best=-1,len=0;
  tk.forEach(function(w,i){var c=clozeWord(w);if(c.length>len&&!/^\d+$/.test(c)){len=c.length;best=i;}});
  if(best<0||len<3)return null;
  return {i:best,w:clozeWord(tk[best]),tk:tk};
}
function clozeOpts(L,ck){
  var right=ck.w,seen={},picks=[];seen[right.toLowerCase()]=1;
  shuffle(langPool(L)).some(function(x){
    if(picks.length>=3)return true;
    tokensOf(x.t).some(function(w){
      var c=clozeWord(w);if(c.length<3||/^\d+$/.test(c)||seen[c.toLowerCase()])return false;
      if(Math.abs(c.length-right.length)>4)return false;
      seen[c.toLowerCase()]=1;picks.push(c);return true;
    });
    return false;
  });
  var all=shuffle(picks.concat([right]));
  return {opts:all,ci:all.indexOf(right)};
}
function clozeHTML(ck){
  return ck.tk.map(function(w,i){
    if(i!==ck.i)return esc(w);
    var c=clozeWord(w),k=w.indexOf(c);
    return esc(w.slice(0,k))+'<span class="blank" aria-label="空らん">　　　</span>'+esc(w.slice(k+c.length));
  }).join(' ');
}
/* ---- AI example drill ---- */
var AID={busy:false,ctl:null,wrong:null,L:''};
var aiDrillErr=null; /* the standalone site sets its own error messages */
function aiDrillAvail(){return !!(AI.ok&&AI.sample);}
function aiDrillPrompt(L,items){
  return 'You write practice questions for a Babel Flight learner: a Japanese junior high school student (13-15) learning '+LANGS[L].native+'. '+
    'Everything must be age-appropriate, everyday and friendly.\n'+
    'The learner just got these phrases wrong:\n'+items.map(function(d,i){return (i+1)+'. '+d.t+' (= '+d.jp+')';}).join('\n')+'\n'+
    'For EACH phrase, write 2 NEW short example sentences (at most 12 words) in '+LANGS[L].native+' that reuse the same key word or pattern in a different everyday situation. '+
    'Give a natural Japanese translation of each, and 3 wrong Japanese translations that look plausible but clearly mean something else. '+
    'Use only correct, natural, standard language; when unsure, choose a simpler sentence.\n'+
    'Reply with ONLY this JSON: {"qs":[{"t":"sentence","jp":"correct Japanese","wrong":["wrong 1","wrong 2","wrong 3"]}]}';
}
function aiDrillClean(raw){
  var qs=raw&&Array.isArray(raw.qs)?raw.qs:[],out=[];
  qs.forEach(function(q){
    if(out.length>=6||!q||typeof q.t!=='string'||typeof q.jp!=='string'||!Array.isArray(q.wrong))return;
    var t=q.t.trim().slice(0,160),jp=q.jp.trim().slice(0,120),seen={},w=[];seen[jp]=1;
    q.wrong.forEach(function(x){if(typeof x==='string'){x=x.trim().slice(0,120);if(x&&!seen[x]&&w.length<3){seen[x]=1;w.push(x);}}});
    if(t&&jp&&w.length===3)out.push({t:t,jp:jp,wrong:w});
  });
  return out;
}
/* Claude (artifact) version; the standalone site replaces this with its own server */
function aiDrillMake(L,items,signal){
  return AI.sample.json([{role:'user',content:aiDrillPrompt(L,items)}],{cache:false,modelTier:'quick',signal:signal}).then(function(r){
    var qs=aiDrillClean(r);if(!qs.length)throw {code:'invalid_json'};return {qs:qs};
  });
}
function aiDrillBtnHTML(){
  if(!AID.wrong||!AID.wrong.length||!aiDrillAvail())return '';
  return '<button class="ghost ai-drill" type="button" data-ai-drill>AIが作る新しい例文で練習<small>間違えたフレーズを使った例文をAIが作ります(まちがいがあるかも)</small></button>';
}
function aiDrillSheet(msg,busy){
  $('sheetHost').innerHTML='<div class="sheet plain" role="dialog" aria-label="AIの練習問題"><div class="sheet-in"><h3>AIの練習問題</h3><p class="dim" style="font-size:14px;margin-top:6px'+(busy?'':';color:var(--ink)')+'">'+esc(msg)+'</p>'+
    '<button class="ghost" type="button" data-ai-drill-close>'+(busy?'やめる':'閉じる')+'</button></div></div>';
}
function aiDrillStart(){
  if(AID.busy||!AID.wrong||!AID.wrong.length)return;
  var L=AID.L,ctl=typeof AbortController==='function'?new AbortController():null;
  AID.busy=true;AID.ctl=ctl;
  aiDrillSheet('AIが問題を作っています…(10秒くらい)',true);
  aiDrillMake(L,AID.wrong.slice(0,3),ctl&&ctl.signal).then(function(r){
    if(AID.ctl!==ctl)return;
    AID.busy=false;AID.ctl=null;closeSheet();
    UNITS[L]['ai-drill']={id:'ai-drill',items:r.qs.map(function(q){return {jp:q.jp,t:q.t,r:'',n:'AIが作った例文です。まちがいがあるかもしれません。'};}),track:'ai'};
    startFlight({mode:'ai',lang:L,items:r.qs.map(function(q,i){return {uid:'ai-drill',i:i};}),qs:r.qs});
  },function(e){
    if(AID.ctl!==ctl)return;
    AID.busy=false;AID.ctl=null;
    if(e&&(e.code==='cancelled'||e.name==='AbortError'))return;
    aiDrillSheet(typeof aiDrillErr==='function'?aiDrillErr(e):'うまく問題を作れませんでした。少し待ってから、もう一度試してね。',false);
  });
}
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  if(t.hasAttribute('data-skip-test')){closeSheet();startSkipTest(t.getAttribute('data-skip-test'));return;}
  if(t.hasAttribute('data-rem')){startRem(save.lang,t.getAttribute('data-rem'));return;}
  if(t.hasAttribute('data-ai-drill')){aiDrillStart();return;}
  if(t.hasAttribute('data-ai-drill-close')){if(AID.ctl){try{AID.ctl.abort();}catch(x){}}AID.busy=false;AID.ctl=null;closeSheet();return;}
});
