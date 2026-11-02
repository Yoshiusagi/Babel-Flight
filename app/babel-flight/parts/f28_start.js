/* ================= あなたに合わせる: 言語ごとのレベル・新しいフレーズの出し方・学ぶ理由・苦手なこと =================
   - レベル is kept per language (save.lv). A language opened for the first time asks for its own level.
   - レベル「はじめて」: はじめの一歩 comes first, new phrases are shown on a card before the first question,
     choices are 3 (not 4) and a lesson starts with its shortest phrases. 「少しわかる」 and up get the
     hint question instead (NEW + a hint that is not a mistake). Either can be picked in 記録 → 学習の設定.
   - 学ぶ理由 (one) picks the starting mode and the order of the 日常会話 path; 苦手なこと (any) shifts the
     question types (and the review spacing for 単語). Asked in the first questions, or once from a home card. */
function lvOf(L){return (save.lv&&save.lv[L])||save.level||'mid';}
function lvNeed(L){return !!save.onboarded&&!(save.lv&&save.lv[L]);}
/* はじめの一歩: for はじめて until あいさつ is flown (and kept on the path once it has been flown itself) */
function firstOn(L){return !!(UNITS[L]&&UNITS[L].first)&&(unitRec(L,'first').n>0||(lvOf(L)==='beg'&&unitRec(L,'greet').n===0));}
function dailyIds(L){return save.why==='friends'?['greet','intro','chat','feel','num','time']:DAILY_IDS.slice();}
/* the map remembers the last stop as a position on the 日常会話 path: keep it on the same lesson when the path changes */
function dailyPath(L){var m=save.mode;save.mode='daily';var ids=pathIds(L);save.mode=m;return ids;}
function keepPos(fn){
  var was={};if(!save.pos)save.pos={};
  ORDER.forEach(function(L){var p=save.pos[L+'-daily'];if(typeof p==='number'&&p>=0)was[L]=dailyPath(L)[p];});
  fn();
  Object.keys(was).forEach(function(L){var i=dailyPath(L).indexOf(was[L]);if(i>=0)save.pos[L+'-daily']=i;});
}
function setLv(L,v){
  if(['beg','mid','adv'].indexOf(v)<0)return;
  keepPos(function(){if(!save.lv)save.lv={};save.lv[L]=v;if(L===save.lang)save.level=v;});
  store();
}
function lvSheet(L){
  var LG=LANGS[L];if(!LG)return;
  $('sheetHost').innerHTML='<div class="sheet plain lv-sheet" role="dialog" aria-label="レベルを選ぶ"><div class="sheet-in"><h3>はじめての'+esc(LG.name)+'</h3>'+
    '<p class="dim" style="font-size:14px">'+esc(LG.name)+'のレベルを選んでね。あとから設定で変えられます。</p><div class="opt-list">'+
    LEVELS.map(function(t){return '<button class="choice" type="button" data-lv-pick="'+t[0]+'" data-lv-lang="'+L+'"><b>'+t[1]+'</b><small>'+LEVEL_HINT[t[0]]+'</small></button>';}).join('')+'</div>'+
    '<p class="dim hint">「少しわかる」以上なら、知っているレッスンは「飛び級テスト」で飛ばせるよ。</p>'+
    '<button class="ghost" type="button" data-lv-pick="beg" data-lv-lang="'+L+'">あとで決める(「はじめて」で始める)</button></div></div>';
}
/* ---- new phrases: a card first, or a question with a hint ---- */
var NW_OPTS=[['','おまかせ'],['card','カードで見てから'],['hint','ヒントつき問題']];
function nwStyle(L){return save.nw||(lvOf(L)==='beg'?'card':'hint');}
function optN(L){return lvOf(L)==='beg'?2:3;}            /* wrong choices: 3 choices in all at はじめて, 4 otherwise */
function showYomi(L){return lvOf(L)==='beg'||hasWeak('letters');}
function lvBlockHTML(){
  var L=save.lang,v=lvOf(L);
  return '<div class="set-block"><span class="lbl">今のレベル ・ '+esc(LANGS[L].name)+'</span>'+seg('data-level',v,LEVELS)+'<p class="dim hint">'+LEVEL_HINT[v]+'</p></div>'+
    '<div class="set-block"><span class="lbl">新しいフレーズの出し方</span>'+seg('data-nw-set',save.nw,NW_OPTS)+
    '<p class="dim hint">'+(save.nw==='card'?'はじめて出るフレーズは、カードで意味と読み方を見てから問題に進みます。':save.nw==='hint'?'はじめて出るフレーズの問題に「ヒント」ボタンがつきます。見てもミスになりません。':'「はじめて」はカードで見てから、「少しわかる」以上はヒントつき問題になります。')+'</p></div>';
}
/* ---- 学ぶ理由 and 苦手なこと ---- */
var WHY=[['travel','✈️','旅行で使いたい','空港・ホテル・レストランの場面から'],
  ['school','📚','学校の成績を上げたい','つづり・文の組み立ての問題を多めに'],
  ['exam','🏅','資格・検定に合格したい','検定モードで、目標の級・スコアをめざす'],
  ['work','💼','仕事で使いたい','職業を選んで、仕事の会話を学ぶ'],
  ['study','🎓','留学したい','学校生活と授業で使う言葉を学ぶ'],
  ['friends','💬','友達・推しと話したい','あいさつ・雑談・気持ちの表現から'],
  ['hobby','🎧','趣味・なんとなく','基本の日常会話から、気軽に']];
var WEAK=[['pron','🗣','発音','音声の問題が多めになり、答えたあとゆっくり読み上げます'],
  ['listen','👂','聞き取り','リスニングの問題が多めになります'],
  ['speak','💬','とっさに言えない','意味から言い方を選ぶ問題と並べ替えが多めになります'],
  ['vocab','🧠','単語が覚えられない','復習の間隔が短くなります'],
  ['grammar','🧩','文法・語順','並べ替えと穴うめが多めになります'],
  ['letters','🔤','文字が読めない','読み方のヒントがいつも出ます']];
var WEAK_KINDS={pron:['listen','listenjp'],listen:['listenjp','listen'],speak:['j2t','build'],vocab:['j2t','listenjp'],grammar:['build','cloze']};
function examOK(){return typeof examModeOn==='function'&&examModeOn();}
/* 検定モード with lessons open (the exam lessons start at プレミアムエコノミー): only then a reason starts there */
function examUsable(){return examOK()&&typeof cabinLv==='function'&&cabinLv()>=1;}
function whyList(){
  return WHY.filter(function(w){
    return w[0]!=='exam'||examOK();
  });
}
function whyName(id){for(var i=0;i<WHY.length;i++)if(WHY[i][0]===id)return WHY[i][2];return '';}
function weakName(id){for(var i=0;i<WEAK.length;i++)if(WEAK[i][0]===id)return WEAK[i][2];return id==='none'?'特にない':'';}
function hasWeak(w){return (save.weak||[]).indexOf(w)>=0;}
function kindPrefs(){
  var a=[];(save.weak||[]).forEach(function(w){(WEAK_KINDS[w]||[]).forEach(function(k){if(a.indexOf(k)<0)a.push(k);});});
  if(save.why==='school'||save.why==='exam')a.push('type');
  return a;
}
/* review spacing (days) for a phrase at box b: 単語が苦手 → twice as often */
function ivlDays(b){var d=INTERVALS[b]||1;return hasWeak('vocab')?Math.max(1,Math.round(d/2)):d;}
/* the mode a reason starts in (when the language has it) */
function whyMode(w,L,prof){
  if(w==='work'){var p=profById(prof);if(p&&jobOpen(p.id)&&(p.units[L]||[]).some(function(u){return !!UNITS[L][u];}))return 'job';}
  if(w==='study'&&STUDY_ALL.some(function(u){return !!UNITS[L][u];}))return 'study';
  if((w==='exam'||(w==='school'&&L==='en'&&UI==='ja'))&&examUsable()&&typeof EXAMS==='object'&&(EXAMS[L]||[]).length)return 'exam';
  return 'daily';
}
function whyChoicesHTML(cur,attr,L){
  return '<div class="opt-list why-list">'+whyList().map(function(w){
    var sub=w[3];
    if(w[0]==='school'&&L==='en'&&UI==='ja'&&examUsable())sub='英検コースで、つづり・文の組み立てを多めに';
    if(w[0]==='exam'&&!examUsable())sub='つづり・文の組み立ての問題を多めに';
    return '<button class="choice wchoice" type="button" '+attr+'="'+w[0]+'" aria-pressed="'+(cur===w[0])+'"><span class="wi" aria-hidden="true">'+w[1]+'</span><span class="wt"><b>'+w[2]+'</b><small>'+sub+'</small></span></button>';
  }).join('')+'</div>';
}
function weakChoicesHTML(cur,attr){
  cur=cur||[];
  return '<div class="opt-list weak-list">'+WEAK.map(function(w){
    return '<button class="choice wchoice" type="button" '+attr+'="'+w[0]+'" aria-pressed="'+(cur.indexOf(w[0])>=0)+'"><span class="wi" aria-hidden="true">'+w[1]+'</span><span class="wt"><b>'+w[2]+'</b><small>'+w[3]+'</small></span></button>';
  }).join('')+'<button class="choice wchoice none" type="button" '+attr+'="none" aria-pressed="'+(cur.indexOf('none')>=0)+'"><span class="wi" aria-hidden="true">👍</span><span class="wt"><b>特にない</b><small>バランスよく出します</small></span></button></div>';
}
function weakToggle(list,id){
  list=(list||[]).slice();
  if(id==='none')return list.indexOf('none')>=0?[]:['none'];
  list=list.filter(function(x){return x!=='none';});
  var i=list.indexOf(id);if(i>=0)list.splice(i,1);else list.push(id);
  return list;
}
/* apply a reason + weak points (from the first questions or the home card): the path order follows at once */
function applyWhy(w,weak,L,prof){
  var mode=whyMode(w,L,prof);
  keepPos(function(){save.why=w;save.weak=(weak||[]).slice(0,8);});
  if(mode!==save.mode){MODEPREV=save.mode;save.mode=mode;HOME_ANIM='mode';}
  save.why0=Date.now();
}
/* ---- for someone who started before these questions: a home card, then 2 short steps ---- */
var TUNE={step:0,why:'',weak:[]};
function tuneCardHTML(){
  if(!save.onboarded||save.why||save.why0)return '';
  return '<section class="card tune-card"><span class="lbl">あなたに合わせる</span><h2 class="jh">2つの質問で、あなた向けのレッスンに</h2>'+
    '<p class="dim" style="font-size:13.5px;margin-top:4px">学ぶ理由と苦手なことを教えてね。始める場所と問題の出し方を合わせます(30秒)。</p>'+
    '<div class="row2"><button class="go" type="button" data-tune style="flex:1;width:auto;margin:0">はじめる</button><button class="ghost" type="button" data-tune-no>あとで</button></div></section>';
}
function tuneHTML(){
  var L=save.lang,h='<div class="ob tune"><div class="ob-dots" aria-label="ステップ '+(TUNE.step+1)+' / 2"><i class="on"></i><i class="'+(TUNE.step>0?'on':'')+'"></i></div>';
  if(TUNE.step===0)h+='<h2 class="ob-q">なぜ'+esc(LANGS[L].name)+'を学ぶ？</h2><p class="dim lead">いちばんの理由を1つ選んでね。</p>'+whyChoicesHTML(TUNE.why,'data-tune-why',L);
  else h+='<h2 class="ob-q">苦手なことは？</h2><p class="dim lead">いくつでも選べます。問題の出し方を合わせます。</p>'+weakChoicesHTML(TUNE.weak,'data-tune-weak');
  h+='<div class="ob-acts"><button class="ghost" type="button" data-tune-back>'+(TUNE.step>0?'戻る':'やめる')+'</button>'+
     '<button class="go" type="button" data-tune-next'+(TUNE.step===0&&!TUNE.why?' disabled':'')+'>'+(TUNE.step>0?'完了':'次へ')+'</button></div></div>';
  return h;
}
function whyRowHTML(){
  /* each name in its own span, so a display language translates them one by one */
  var w=save.why?whyName(save.why):'未設定',k=(save.weak||[]).map(weakName).filter(Boolean).map(function(x){return '<span>'+esc(x)+'</span>';}).join('・')||'<span>未設定</span>';
  return '<div class="set-row"><span>学ぶ理由 ・ 苦手なこと<br><b>'+esc(w)+'</b><small class="dim" style="display:block;font-size:12.5px">'+k+'</small></span><button class="ghost" type="button" data-tune>変更</button></div>';
}
document.addEventListener('click',function(e){
  var t=e.target.closest&&e.target.closest('button');if(!t)return;
  var a=function(n){return t.hasAttribute(n);},g=function(n){return t.getAttribute(n);};
  if(a('data-lv-pick')){var L=g('data-lv-lang')||save.lang;setLv(L,g('data-lv-pick'));closeSheet();HOME_ANIM='lang';render();return;}
  if(a('data-nw-set')){save.nw=g('data-nw-set');store();render();return;}
  if(a('data-tune')){closeSheet();TUNE={step:0,why:save.why,weak:(save.weak||[]).slice()};view='tune';render();window.scrollTo(0,0);return;}
  if(a('data-tune-no')){save.why0=Date.now();store();render();return;}
  if(view==='tune'){
    if(a('data-tune-why')){TUNE.why=g('data-tune-why');render();return;}
    if(a('data-tune-weak')){TUNE.weak=weakToggle(TUNE.weak,g('data-tune-weak'));render();return;}
    if(a('data-tune-back')){if(TUNE.step>0){TUNE.step=0;render();}else go('home');return;}
    if(a('data-tune-next')){
      if(TUNE.step===0){if(!TUNE.why)return;TUNE.step=1;render();window.scrollTo(0,0);return;}
      applyWhy(TUNE.why,TUNE.weak,save.lang,save.prof);store();
      /* 仕事 without a job yet: choose it now (picking one from here also switches to 職業モード) */
      if(save.why==='work'&&!(profById(save.prof)&&jobOpen(save.prof))){pickerBack='home';go('picker');return;}
      go('home');if(typeof bootFx==='function')bootFx({kind:'bank',text:'あなた向けに設定しました'});return;
    }
  }
});
