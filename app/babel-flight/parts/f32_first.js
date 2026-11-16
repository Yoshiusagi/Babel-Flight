/* ================= ファーストクラス (standalone site): FIRST CLASS LOUNGE =================
   Only for the class ファースト (cabinLv() 3: the test account's switcher, the family account, the hidden reward and,
   once billing opens, the paid plan). Nothing here shows in the iPhone app (cabinLv() is -1 there).
   - FIRST CLASS LOUNGE: a card on the home screen (its own page in the スイート design) with the day's task of the
     coach's plan, the AI diary and the title.
   - 専属AIコーチ: a plan for the week (Monday to Sunday) made by the AI from the learner's own data, made by itself the
     first time the app is opened in a new week (so it is there on Monday), and made again any time with 立て直す.
     POST /api/ai/coach (src/lib/ai.server.ts), 3 a day. Kept on this device per language (babelflight.coach).
   - AI添削つき日記: write today's diary in the learning language; the AI corrects it and says why.
     POST /api/ai/diary, 2 a day (the entry + one rewrite). Kept on this device (babelflight.diary).
     The reminder time is the learner's choice (babelflight.diarySet): after that time the lounge asks for today's
     entry, and while the page is open (or installed as an app) a notification is shown at that time.
   - 称号 (titles) and first-class icons (ICONS with 'F' in e4_core.js): only while flying ファースト.
   - 先行公開: FIRST_EARLY lists features that ファースト gets before everyone else (earlyOpen(id)). */

function fcOn(){return typeof cabinLv==='function'&&cabinLv()>=3;}
function fcAi(){return typeof roleAiOn==='function'&&roleAiOn();}
function fcAiMsg(){return typeof SAI==='object'&&!SAI.enabled?'AIは準備中です(サイトのAIキーの設定待ち)。':'ログインすると使えます。';}
function fcJson(k){try{var o=JSON.parse(lsGet(k)||'null');return o&&typeof o==='object'?o:null;}catch(e){return null;}}
function fcPut(k,o){lsSet(k,JSON.stringify(o));}
var FC_DAYS=['月','火','水','木','金','土','日'];

/* ---- 先行公開 ---- */
/* [id, name, the day it opens to every class (YYYY-MM-DD)]; ファースト has it from the day it ships */
var FIRST_EARLY=[];
function earlyOpen(id){
  for(var i=0;i<FIRST_EARLY.length;i++){var e=FIRST_EARLY[i];if(e[0]===id)return fcOn()||dayStr()>=e[2];}
  return true;
}
function earlyList(){var d=dayStr();return FIRST_EARLY.filter(function(e){return d<e[2];});}

/* ---- the week (Monday first, this device's time) ---- */
function fcMonday(d){d=d?new Date(d):new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-((d.getDay()+6)%7));return dayStr(d);}
function fcToday(){return (new Date().getDay()+6)%7;}

/* ================= 専属AIコーチ ================= */
var COACH_KEY='babelflight.coach';
var COACH={busy:false,tried:{},err:'',left:null};
var COACH_KIND={lesson:['📍','次のレッスン'],review:['🔁','復習'],weak:['🎯','弱点コース'],exam:['🏅','検定'],role:['💬','AIロールプレイ'],
  free:['🎲','自由練習'],diary:['📓','AI日記'],route:['🛫','路線シミュレーション'],rest:['☕','おやすみ']};
function coachAll(){return fcJson(COACH_KEY)||{};}
/* this week's plan for language L, or null */
function coachPlan(L){var c=coachAll()[L];return c&&c.wk===fcMonday()&&c.plan&&Array.isArray(c.plan.days)&&c.plan.days.length===7?c:null;}
/* the most days of a week's plan ever done (for the title) */
function coachBest(){var o=coachAll(),b=+o._best||0;Object.keys(o).forEach(function(k){var c=o[k];if(c&&Array.isArray(c.done))b=Math.max(b,c.done.filter(Boolean).length);});return b;}
function coachDoneN(c){return c&&Array.isArray(c.done)?c.done.filter(Boolean).length:0;}
function coachStats(L){
  var LG=LANGS[L],lines=[],r=repLoad()[L]||{d:{},k:{}},now=Date.now(),wk=[0,0],pw=[0,0];
  for(var i=0;i<14;i++){var v=r.d[dayStr(new Date(now-i*864e5))];if(v){var t=i<7?wk:pw;t[0]+=v[0];t[1]+=v[1];}}
  var lvJ={beg:'はじめて',mid:'少しわかる',adv:'日常会話OK'}[(save.lv&&save.lv[L])||save.level]||'少しわかる';
  var why=(typeof WHY!=='undefined'?WHY:[]).filter(function(w){return w[0]===save.why;})[0];
  var weakJ=(typeof WEAK!=='undefined'?WEAK:[]).filter(function(w){return (save.weak||[]).indexOf(w[0])>=0;}).map(function(w){return w[2];});
  lines.push('学ぶ言語: '+LG.name+(L==='en'?'('+(save.enVar==='uk'?'イギリス英語':'アメリカ英語')+')':'')+' ・ レベル: '+lvJ);
  if(why)lines.push('学ぶ理由: '+why[2]);
  if(weakJ.length)lines.push('本人が苦手だと言っていること: '+weakJ.join('、'));
  var p=typeof profById==='function'?profById(save.prof):null;if(p)lines.push('めざす職業: '+p.jp);
  var tg=typeof examTarget==='function'?examTarget(L):null;if(tg)lines.push('検定の目標: '+tg.name);
  lines.push('1日の目標: '+save.goal+'レッスン ・ 連続 '+streakNow()+'日(最高 '+(save.bestStreak||0)+'日)');
  lines.push('この7日の解答: '+wk[0]+'問'+(wk[0]?'(正答率 '+Math.round(wk[1]/wk[0]*100)+'%)':'')+' ・ その前の7日: '+pw[0]+'問'+(pw[0]?'(正答率 '+Math.round(pw[1]/pw[0]*100)+'%)':''));
  var kinds=Object.keys(r.k).filter(function(k){return KIND_JP[k]&&r.k[k][0]>=3;}).map(function(k){return KIND_JP[k]+' '+Math.round(r.k[k][1]/r.k[k][0]*100)+'%';});
  if(kinds.length)lines.push('問題の形式ごとの正答率: '+kinds.join('、'));
  var weak=weakList(L).slice(0,5).map(function(x){var d=UNITS[L][x.uid]&&UNITS[L][x.uid].items[x.i];return d?d.t+'(= '+d.jp+'、ミス'+x.m+'回)':'';}).filter(Boolean);
  lines.push('いま復習の時期のフレーズ: '+dueList(L).length+' ・ 苦手なフレーズ: '+weakList(L).length+(weak.length?'(多い順: '+weak.join(' / ')+')':''));
  var ids=pathIds(L),nx=nextPathUnit(L);
  if(ids.length)lines.push('ルートマップ('+(typeof modeName==='function'?modeName(L):save.mode)+'): '+unitsDone(L,ids)+'/'+ids.length+'レッスン到着 ・ 次は「'+unitTitle(nx)+'」');
  var prev=coachAll()[L];if(prev&&prev.plan&&prev.wk!==fcMonday())lines.push('先週のプランは7日中'+coachDoneN(prev)+'日できた(テーマ: '+prev.plan.focus+')');
  var dl=diaryList().filter(function(e){return e.L===L;}).length;if(dl)lines.push('この言語のAI日記: これまで'+dl+'日');
  lines.push('AI会話ロールプレイ: '+(fcAi()?'使える':'使えない')+' ・ 路線シミュレーション: '+(typeof rtOn==='function'&&rtOn(L)?'使える(これまで'+((rtRec()[L]||{}).n||0)+'回)':'この言語では使えない'));
  return lines.join('\n').slice(0,2400);
}
function coachMake(L,auto){
  if(COACH.busy||!fcOn())return;
  if(!fcAi()){COACH.err=fcAiMsg();coachRefresh();return;}
  var wk=fcMonday();
  if(auto){if(COACH.tried[L+wk])return;COACH.tried[L+wk]=1;}
  COACH.busy=true;COACH.err='';coachRefresh();
  saiPost('/api/ai/coach',{lang:L,week:wk,stats:coachStats(L),ui:UI}).then(function(res){
    return res.json().catch(function(){return {};}).then(function(j){if(!res.ok||!j.ok)throw j;return j;});
  }).then(function(j){
    var o=coachAll(),old=o[L],keep=old&&old.wk===wk?old.done:null;
    o._best=coachBest();
    o[L]={wk:wk,plan:j.plan,done:Array.isArray(keep)&&keep.length===7?keep:[false,false,false,false,false,false,false],at:Date.now(),auto:!!auto};
    fcPut(COACH_KEY,o);COACH.left=typeof j.left==='number'?j.left:COACH.left;
  },function(j){
    COACH.err=j&&j.error==='class'?'AIコーチはファーストクラスの機能です。':j&&j.error==='quota'?'今日のプラン作りはここまで(1日3回)。また明日ね！':saiErr(j,'ask');
  }).then(function(){COACH.busy=false;coachRefresh();});
}
/* made by itself the first time the lounge (or 復習) is shown in a new week */
function coachAuto(){
  var L=save.lang;
  if(!fcOn()||!fcAi()||coachPlan(L)||COACH.busy)return;
  if(!pathIds(L).length&&!learnedList(L).length)return;
  coachMake(L,true);
}
function coachRefresh(){
  var s=document.querySelector('#sheetHost .coach-sheet');if(s)coachSheet();
  if(view==='home'||view==='review'){var y=window.scrollY;render();window.scrollTo(0,y);}
}
function coachTaskBtn(d,L){
  var k=d.kind;
  if(k==='rest')return '';
  if(k==='role')return typeof roleLeft==='function'&&roleLeft()>0?'<button class="go sm" type="button" data-role>はじめる</button>':'';
  return '<button class="go sm" type="button" data-fc-do="'+k+'">はじめる</button>';
}
function coachDayHTML(c,i,L){
  var d=c.plan.days[i],kd=COACH_KIND[d.kind]||COACH_KIND.free,today=i===fcToday(),done=!!c.done[i];
  return '<li class="cw-day'+(today?' today':'')+(done?' done':'')+'"><span class="cw-d">'+FC_DAYS[i]+'</span>'+
    '<span class="cw-t"><b>'+esc(d.task)+'</b><small><span>'+kd[0]+' '+kd[1]+'</span>'+(d.min?' ・ <span>'+d.min+'分</span>':'')+'</small></span>'+
    '<button class="cw-ck" type="button" data-coach-done="'+i+'" aria-pressed="'+done+'" aria-label="'+FC_DAYS[i]+'曜日 '+(done?'できた':'まだ')+'">'+(done?'✓':'')+'</button></li>';
}
function coachSheet(){
  var L=save.lang,c=coachPlan(L),h='<div class="sheet plain coach-sheet" role="dialog" aria-label="専属AIコーチ"><div class="sheet-in">'+
    '<span class="lbl">YOUR FLIGHT PLAN ・ '+esc(LANGS[L].name)+'</span><h3>専属AIコーチ ・ 今週のプラン</h3>';
  if(c){
    var p=c.plan;
    h+='<div class="cw-focus"><span class="lbl">今週のテーマ</span><b>'+esc(p.focus)+'</b>'+(p.why?'<p>'+esc(p.why)+'</p>':'')+'</div>'+
      '<ol class="cw-list">'+p.days.map(function(d,i){return coachDayHTML(c,i,L);}).join('')+'</ol>'+
      (function(){var i=fcToday(),d=p.days[i],b=c.done[i]?'':coachTaskBtn(d,L);return b?'<div class="cw-go"><span class="lbl">今日('+FC_DAYS[i]+')のぶん</span>'+b.replace('>はじめる<','>'+uiF('{0}をはじめる',[esc(d.task)])+'<')+'</div>':'';})()+
      '<div class="cw-sum"><span>'+coachDoneN(c)+' / 7日 できた</span><i style="width:'+Math.round(coachDoneN(c)/7*100)+'%"></i></div>'+
      (p.tip?'<p class="cw-tip"><b>コーチから</b><span>'+esc(p.tip)+'</span></p>':'')+
      '<p class="dim hint">'+(c.auto?'週のはじめに自動で作りました':'作り直したプランです')+' ・ '+fmtStamp(c.at)+'</p>';
  }else if(!COACH.busy){
    h+='<p class="dim">あなたの学習データ(正答率・苦手なフレーズ・目標)から、AIが月曜〜日曜の1週間のプランを作ります。毎週はじめて開いた時に自動で作り、いつでも立て直せます。</p>';
  }
  if(COACH.busy)h+='<p class="aiout wait" aria-live="polite">AIコーチがプランを考え中…</p>';
  if(COACH.err)h+='<p class="warn">'+esc(COACH.err)+'</p>';
  h+='<button class="'+(c?'ghost':'go')+'" type="button" data-coach-make'+(COACH.busy?' disabled':'')+'>'+(c?'プランを立て直す':'今週のプランを作る')+
    (COACH.left!==null&&COACH.left<99?'<small>今日はあと'+COACH.left+'回</small>':'')+'</button>'+
    '<p class="dim hint">プランとチェックはこの端末に保存されます。AIが作るので、合わないと思ったら立て直してね。</p>'+
    '<button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';
  $('sheetHost').innerHTML=h;
}
function fmtStamp(ms){var d=new Date(ms);return (d.getMonth()+1)+'月'+d.getDate()+'日 '+pad2(d.getHours())+':'+pad2(d.getMinutes());}
function coachDo(kind){
  var L=save.lang;closeSheet();
  if(kind==='lesson'){var nx=nextPathUnit(L);if(view!=='home')go('home');setTimeout(function(){openNodeSheet(nx);},view==='home'?60:300);return;}
  if(kind==='review'){startMode(dueList(L).length?'review':'free');return;}
  if(kind==='weak'){startMode(weakList(L).length?'weak':dueList(L).length?'review':'free');return;}
  if(kind==='free'){startMode('free');return;}
  if(kind==='exam'){if(typeof examModeOn==='function'&&examModeOn()){save.mode='exam';HOME_ANIM='mode';store();}go('home');return;}
  if(kind==='diary'){diarySheet();return;}
  if(kind==='route'){if(typeof rtOn==='function'&&rtOn(L))rtStart();else startMode('free');return;}
}

/* ================= AI添削つき日記 ================= */
var DIARY_KEY='babelflight.diary',DIARY_SET='babelflight.diarySet',DIARY_MAX=600;
var DIARY={busy:false,err:'',res:null,left:null,draft:'',tab:'write',edit:false,text:''};
var DIARY_IDEAS=['今日いちばん楽しかったこと','今日食べたもの','学校や部活であったこと','明日やりたいこと','最近ハマっていること','今日がんばったこと','今日の天気と気分','友達や家族と話したこと','行ってみたい国や場所','最近見た動画や音楽'];
function diaryList(){var o=fcJson(DIARY_KEY);return o&&Array.isArray(o.list)?o.list:[];}
function diaryToday(){var d=dayStr();return diaryList().filter(function(e){return e.d===d;})[0]||null;}
function diaryDays(){var s={};diaryList().forEach(function(e){s[e.d]=1;});return Object.keys(s).length;}
function diarySet(){var o=fcJson(DIARY_SET)||{};return {on:o.on!==false,time:/^\d\d:\d\d$/.test(o.time||'')?o.time:'21:00'};}
function diaryDue(){
  if(!fcOn())return false;var s=diarySet();if(!s.on||diaryToday())return false;
  var n=new Date();return pad2(n.getHours())+':'+pad2(n.getMinutes())>=s.time;
}
function diaryIdea(){return DIARY_IDEAS[hash(dayStr())%DIARY_IDEAS.length];}
function diarySheet(){
  var L=save.lang,LG=LANGS[L],td=diaryToday(),h='<div class="sheet plain diary-sheet" role="dialog" aria-label="AI日記"><div class="sheet-in">'+
    '<span class="lbl">FLIGHT LOG ・ '+esc(LG.name)+'</span><h3>今日は何があった？</h3>'+
    '<div class="seg dy-tabs" role="group"><button type="button" data-diary-tab="write" aria-pressed="'+(DIARY.tab==='write')+'">今日の日記</button>'+
    '<button type="button" data-diary-tab="log" aria-pressed="'+(DIARY.tab==='log')+'">これまで</button>'+
    '<button type="button" data-diary-tab="set" aria-pressed="'+(DIARY.tab==='set')+'">お知らせ</button></div>';
  if(DIARY.tab==='log')h+=diaryLogHTML();
  else if(DIARY.tab==='set')h+=diarySetHTML();
  else{
    var res=DIARY.edit?null:DIARY.res||(td&&td.L===L?td.res:null),txt=DIARY.draft||(DIARY.edit&&td&&td.L===L?td.text:'');
    if(res){
      var mine=DIARY.res?DIARY.text:td.text;
      h+='<div class="dy-block dy-mine"><span class="lbl">あなたが書いた日記</span><p class="dy-txt'+(lfc(L)?' '+lfc(L):'')+'" translate="no">'+esc(mine||'')+'</p></div>';
      if(DIARY.err)h+='<p class="warn">'+esc(DIARY.err)+'</p>';
      h+=diaryResHTML(res,L)+(fcAi()&&DIARY.left!==0?'<button class="ghost" type="button" data-diary-edit>書き直して、もう一度見てもらう</button>':'');
      $('sheetHost').innerHTML=h+'<button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';
      return;
    }
    h+='<p class="dim">'+uiF('{0}で、今日のことを短く書いてみよう。わからない単語は日本語のままでOK。AIが自然な言い方に直して、{1}も教えてくれます。',[esc(T(LG.name)),'<b>'+esc(T('なぜそう直すのか'))+'</b>'])+'</p>'+
      '<p class="dy-idea"><span class="lbl">迷ったら</span><span>'+esc(diaryIdea())+'</span></p>'+
      '<textarea id="dyText" class="dy-text '+lfc(L)+'" lang="'+LG.tts.slice(0,2)+'" maxlength="'+DIARY_MAX+'" rows="5" spellcheck="false" autocapitalize="sentences" aria-label="日記">'+esc(txt)+'</textarea>'+
      '<div class="dy-row"><small class="dy-n" id="dyN">'+txt.length+' / '+DIARY_MAX+'</small>'+
      (DIARY.left!==null&&DIARY.left<99?'<small>今日はあと'+DIARY.left+'回</small>':'<small>1日2回まで(書いて直す1回 ＋ 書き直し1回)</small>')+'</div>';
    if(!fcAi())h+='<p class="warn">'+fcAiMsg()+'</p>';
    else h+='<button class="go" type="button" data-diary-send'+(DIARY.busy?' disabled':'')+'>'+(DIARY.busy?'AIが読んでいます…':'AIに添削してもらう')+'</button>';
    if(DIARY.err)h+='<p class="warn">'+esc(DIARY.err)+'</p>';
  }
  h+='<button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';
  $('sheetHost').innerHTML=h;
  var ta=$('dyText');
  if(ta)ta.addEventListener('input',function(){DIARY.draft=ta.value;var n=$('dyN');if(n)n.textContent=ta.value.length+' / '+DIARY_MAX;});
}
function diaryResHTML(r,L){
  var cls=lfc(L)?' '+lfc(L):'',lg=' lang="'+LANGS[L].tts.slice(0,2)+'"',sp=ttsAvail(LANGS[L].tts);
  var h='<div class="dy-res" translate="no">';
  if(r.good)h+='<p class="dy-good"><b>👏 よかったところ</b><span>'+esc(r.good)+'</span></p>';
  h+='<div class="dy-block"><div class="card-h"><span class="lbl">添削したあと</span>'+(sp?'<button class="mini" type="button" data-diary-say="corrected" aria-label="読み上げ">'+speakerIcon()+'</button>':'')+'</div><p class="dy-txt'+cls+'"'+lg+'>'+esc(r.corrected)+'</p></div>';
  if(r.fixes&&r.fixes.length){
    h+='<h4 class="dy-h">直したところと、その理由</h4><ol class="dy-fixes">'+r.fixes.map(function(f){
      return '<li><div class="dy-ft'+cls+'"'+lg+'><s>'+esc(f.from)+'</s><span aria-hidden="true">→</span><b>'+esc(f.to)+'</b></div><p>'+esc(f.why)+'</p></li>';}).join('')+'</ol>';
  }else h+='<p class="dy-good"><b>✨ 直すところはありませんでした</b></p>';
  if(r.natural&&r.natural!==r.corrected)h+='<div class="dy-block"><div class="card-h"><span class="lbl">ネイティブならこう書く</span>'+(sp?'<button class="mini" type="button" data-diary-say="natural" aria-label="読み上げ">'+speakerIcon()+'</button>':'')+'</div><p class="dy-txt'+cls+'"'+lg+'>'+esc(r.natural)+'</p></div>';
  if(r.meaning)h+='<details class="dy-mean"><summary>日本語の意味</summary><p>'+esc(r.meaning)+'</p></details>';
  if(r.next)h+='<p class="dy-next"><b>明日の日記で使ってみよう</b><span>'+esc(r.next)+'</span></p>';
  return h+'<p class="dim hint">AIの添削です。正しくないこともあるので、気になったら「AIに質問」でも確かめてね。</p></div>';
}
function diaryLogHTML(){
  var list=diaryList().slice().reverse();
  if(!list.length)return '<p class="dim">まだ日記はありません。今日の1ページ目を書いてみよう。</p>';
  return '<p class="dim hint">'+diaryDays()+'日分 ・ この端末に保存されています</p><ul class="dy-log">'+list.slice(0,30).map(function(e){
    var LG=LANGS[e.L],c=lfc(e.L)?' '+lfc(e.L):'';
    return '<li><details><summary><span class="mono">'+esc(e.d.slice(5).replace('-','/'))+'</span><b>'+esc(LG?LG.name:e.L)+'</b><small>'+(e.res&&e.res.fixes?e.res.fixes.length+'か所 直した':'')+'</small></summary>'+
      '<p class="dy-txt'+c+'" translate="no">'+esc(e.res?e.res.corrected:e.text)+'</p>'+(e.res&&e.res.meaning?'<p class="dim" translate="no">'+esc(e.res.meaning)+'</p>':'')+'</details></li>';
  }).join('')+'</ul>';
}
function diarySetHTML(){
  var s=diarySet(),np=typeof Notification!=='undefined'?Notification.permission:'unsupported';
  return '<p class="dim">毎日この時間を過ぎると、ラウンジで「今日は何があった？」と聞きます。</p>'+
    '<div class="set-block"><span class="lbl">お知らせ</span>'+seg('data-diary-on',s.on?'1':'0',[['1','オン'],['0','オフ']])+'</div>'+
    '<div class="set-block"><span class="lbl">時間</span><input id="dyTime" class="dy-time" type="time" value="'+s.time+'" aria-label="お知らせの時間"'+(s.on?'':' disabled')+'></div>'+
    (np==='default'&&s.on?'<button class="ghost" type="button" data-diary-perm>この端末の通知もオンにする</button>':'')+
    (np==='granted'?'<p class="dim hint">✓ この端末の通知がオンです。アプリを開いている間(ホーム画面に追加したアプリを含む)は、その時間に通知が出ます。</p>':
     np==='denied'?'<p class="dim hint">この端末の通知はオフになっています。ブラウザの設定から変えられます。</p>':'')+
    '<p class="dim hint">サイトを完全に閉じている時の通知は、まだ届きません(準備中です)。</p>';
}
function diarySend(){
  var L=save.lang,ta=$('dyText'),t=(ta?ta.value:DIARY.draft).trim();
  if(DIARY.busy)return;
  if(t.length<3){DIARY.err='もう少し書いてみよう(1文でもOK)。';diarySheet();return;}
  DIARY.busy=true;DIARY.err='';DIARY.draft=t;diarySheet();
  saiPost('/api/ai/diary',{lang:L,text:t,ui:UI,variant:save.enVar}).then(function(res){
    return res.json().catch(function(){return {};}).then(function(j){if(!res.ok||!j.ok)throw j;return j;});
  }).then(function(j){
    var r={corrected:j.corrected,natural:j.natural||'',fixes:Array.isArray(j.fixes)?j.fixes:[],good:j.good||'',next:j.next||'',meaning:j.meaning||''};
    DIARY.res=r;DIARY.left=typeof j.left==='number'?j.left:null;DIARY.draft='';DIARY.text=t;DIARY.edit=false;
    var o=fcJson(DIARY_KEY)||{list:[]},d=dayStr();if(!Array.isArray(o.list))o.list=[];
    o.list=o.list.filter(function(e){return !(e.d===d&&e.L===L);});
    o.list.push({d:d,L:L,text:t,res:r,t:Date.now()});
    while(o.list.length>90)o.list.shift();
    fcPut(DIARY_KEY,o);
    var c=coachPlan(L),i=fcToday();if(c&&c.plan.days[i].kind==='diary'&&!c.done[i])coachCheck(L,i,true);
  },function(j){
    DIARY.err=j&&j.error==='class'?'AI日記はファーストクラスの機能です。':j&&j.error==='quota'?'今日の日記の添削はここまで(1日2回)。また明日書こう！':saiErr(j,'ask');
  }).then(function(){DIARY.busy=false;if(document.querySelector('#sheetHost .diary-sheet'))diarySheet();if(view==='home'&&!document.querySelector('#sheetHost .diary-sheet'))render();});
}
/* the reminder while the page is open (also as an installed app) */
var DIARY_TIMER=0;
function diaryArm(){
  clearTimeout(DIARY_TIMER);
  if(!fcOn()||typeof Notification==='undefined'||Notification.permission!=='granted')return;
  var s=diarySet();if(!s.on||diaryToday())return;
  var p=s.time.split(':'),at=new Date();at.setHours(+p[0],+p[1],0,0);
  var ms=at.getTime()-Date.now();if(ms<=0||ms>864e5)return;
  DIARY_TIMER=setTimeout(function(){
    if(diaryToday()||!fcOn())return;
    var key='babelflight.diaryPing',d=dayStr();if(lsGet(key)===d)return;lsSet(key,d);
    var title=T('今日は何があった？'),opt={body:uiF('{0}で日記を書いてみよう ・ Babel Flight',[T(LANGS[save.lang].name)]),tag:'bf-diary',icon:'/icons/app-192.png'};
    try{
      if(navigator.serviceWorker&&navigator.serviceWorker.controller)navigator.serviceWorker.ready.then(function(r){r.showNotification(title,opt);});
      else new Notification(title,opt);
    }catch(e){}
    if(view==='home')render();
  },ms);
}

/* ================= 称号 ================= */
var FT_KEY='babelflight.ftitle';
var FT_TITLES=[
 ['seat1a','1A シートホルダー','SEAT 1A','ファーストクラスに搭乗する',function(){return true;}],
 ['longhaul','ロングホール・フライヤー','LONG HAUL','7日連続で学習する',function(){return Math.max(save.bestStreak||0,streakNow())>=7;}],
 ['logkeeper','フライトログ・キーパー','FLIGHT LOG','AI日記を7日分書く',function(){return diaryDays()>=7;}],
 ['planner','フライトプラン・マスター','FLIGHT PLAN','AIコーチのプランを1週間で5日できた',function(){return coachBest()>=5;}],
 ['navigator','グローバル・ナビゲーター','NAVIGATOR','3つの言語でレッスンを受ける',function(){return typeof langStarted==='function'&&learnOrder().filter(langStarted).length>=3;}],
 ['highmiler','ハイマイラー','HIGH MILER','マイルを合計25,000ためる',function(){return (save.miles||0)>=25000;}]
];
function ftGot(t){try{return !!t[4]();}catch(e){return false;}}
function ftCur(){var id=lsGet(FT_KEY)||'seat1a',t=FT_TITLES.filter(function(x){return x[0]===id;})[0];return t&&ftGot(t)?t:FT_TITLES[0];}
function ftSheet(){
  var cur=ftCur()[0],n=FT_TITLES.filter(ftGot).length;
  $('sheetHost').innerHTML='<div class="sheet plain ft-sheet" role="dialog" aria-label="称号"><div class="sheet-in"><span class="lbl">FIRST CLASS TITLES ・ '+n+' / '+FT_TITLES.length+'</span><h3>称号を選ぶ</h3>'+
    '<p class="dim">IDカードに金色で表示されます。ファーストクラスの間だけ使えます。</p><div class="ft-list">'+FT_TITLES.map(function(t){
      var got=ftGot(t);
      return '<button type="button" class="ft-row'+(got?'':' locked')+'" data-ft="'+t[0]+'" aria-pressed="'+(t[0]===cur)+'"'+(got?'':' disabled')+'><span class="ft-en mono">'+t[2]+'</span><b>'+(got?'':'🔒 ')+esc(t[1])+'</b><small>'+esc(t[3])+'</small></button>';
    }).join('')+'</div><button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';
}

/* ================= FIRST CLASS LOUNGE ================= */
function fcHello(){var h=new Date().getHours();return h<4||h>=18?'こんばんは':h<11?'おはようございます':'こんにちは';}
function loungeTodayHTML(L){
  var c=coachPlan(L);
  if(COACH.busy&&!c)return '<div class="fcl-plan wait"><span class="lbl">TODAY ・ AIコーチ</span><p>今週のプランを作っています…</p></div>';
  if(!c)return '<button class="fcl-plan empty" type="button" data-coach-open><span class="lbl">TODAY ・ AIコーチ</span><b>今週のプランを作る</b><small>'+(fcAi()?'あなたのデータから、月〜日の7日分':esc(fcAiMsg()))+'</small></button>';
  var i=fcToday(),d=c.plan.days[i],kd=COACH_KIND[d.kind]||COACH_KIND.free,done=!!c.done[i];
  return '<div class="fcl-plan'+(done?' done':'')+'"><div class="card-h"><span class="lbl">TODAY ・ '+FC_DAYS[i]+'曜日</span><span class="fcl-wk mono" aria-label="今週 '+coachDoneN(c)+'日できた">'+
    c.done.map(function(x,j){return '<i class="'+(x?'on':'')+(j===i?' now':'')+'"></i>';}).join('')+'</span></div>'+
    '<b class="fcl-task">'+kd[0]+' '+esc(d.task)+'</b><small><span>'+esc(kd[1])+'</span>'+(d.min?' ・ <span>'+d.min+'分</span>':'')+' ・ <span>今週のテーマ: </span><span>'+esc(c.plan.focus)+'</span></small>'+
    '<div class="fcl-row">'+(done?'<span class="fcl-ok">✓ 今日のぶんはできた</span>':coachTaskBtn(d,L))+
    '<button class="ghost sm" type="button" data-coach-open>今週のプラン</button></div></div>';
}
function loungeHTML(){
  if(!fcOn())return '';
  var L=save.lang,t=ftCur(),due=diaryDue(),td=diaryToday(),early=earlyList();
  setTimeout(coachAuto,0);
  return '<section class="card fcl" aria-label="ファーストクラス ラウンジ"><div class="fcl-top"><span class="lbl">FIRST CLASS LOUNGE</span><span class="fcl-seat mono">1A</span></div>'+
    '<h2 class="fcl-hello">'+uiF('{0}、{1} 様',[esc(T(fcHello())),'<span translate="no">'+esc(save.name||'PASSENGER')+'</span>'])+'</h2>'+
    '<button class="fcl-title" type="button" data-ft-open><span aria-hidden="true">◆</span> '+esc(t[1])+'</button>'+
    loungeTodayHTML(L)+
    '<div class="fcl-grid">'+
    '<button class="fcl-tile'+(due?' due':'')+'" type="button" data-diary-open><span class="fcl-ic" aria-hidden="true">📓</span><b>AI日記</b><small>'+(td?'✓ 今日は書いた':due?'今日は何があった？':'今日のことを'+esc(LANGS[L].name)+'で')+'</small></button>'+
    '<button class="fcl-tile" type="button" data-coach-open><span class="fcl-ic" aria-hidden="true">🧭</span><b>AIコーチ</b><small>今週のプラン</small></button>'+
    (typeof rtOn==='function'&&RT_ROUTES[L]&&UI==='ja'?'<button class="fcl-tile" type="button" data-rt-open><span class="fcl-ic" aria-hidden="true">🛫</span><b>路線シミュレーション</b><small>HND → '+RT_ROUTES[L].code+' ・ 旅をまるごと</small></button>':'')+
    '<button class="fcl-tile" type="button" data-ft-open><span class="fcl-ic" aria-hidden="true">🎖</span><b>称号</b><small>'+FT_TITLES.filter(ftGot).length+' / '+FT_TITLES.length+'</small></button>'+
    '</div>'+
    (early.length?'<p class="fcl-early"><span class="lbl">先行公開</span>'+early.map(function(e){return '<span>'+esc(e[1])+'</span>';}).join(' ・ ')+'</p>':'')+
    '</section>';
}
/* the lounge on the home screen: under the mode switch, or its own page in the スイート design */
(function(){
  var hh=homeHTML;
  homeHTML=function(){
    var h=hh.apply(this,arguments);
    if(!fcOn()||!pathIds(save.lang).length)return h;
    var lg=loungeHTML();
    if(typeof cabinLayout==='function'&&cabinLayout()==='suite'&&h.indexOf('id="suitePages"')>=0){
      var at=h.indexOf('<section class="suite-pg sp-prog"');
      if(at<0)return h;
      h=h.slice(0,at)+'<section class="suite-pg sp-lounge" aria-label="ラウンジ"><span class="sp-it">Your lounge</span>'+lg+'</section>'+h.slice(at);
      return h.replace('data-suite-go="3"','data-suite-go="4"').replace('<div class="sp-dots" aria-hidden="true"><i class="on"></i>','<div class="sp-dots" aria-hidden="true"><i class="on"></i><i></i>');
    }
    var ms=modeSwitch(),i=h.indexOf(ms);
    if(i>=0)return h.slice(0,i+ms.length)+lg+h.slice(i+ms.length);
    i=h.indexOf('</header>');
    return i>=0?h.slice(0,i+9)+lg+h.slice(i+9):lg+h;
  };
  /* 復習: the coach's card next to the 弱点レポート */
  var rv=reviewHTML;
  reviewHTML=function(){
    var h=rv.apply(this,arguments);if(!fcOn())return h;
    var L=save.lang,c=coachPlan(L);setTimeout(coachAuto,0);
    var card='<section class="card fcl-coach"><div class="card-h"><h2 class="jh">専属AIコーチ</h2><span class="lbl">FIRST</span></div>'+loungeTodayHTML(L)+'</section>';
    var at=h.indexOf('<section class="card report"');
    return at>=0?h.slice(0,at)+card+h.slice(at):h;
  };
  /* the title on the ID card */
  var rc=recordHTML;
  recordHTML=function(){
    var h=rc.apply(this,arguments);if(!fcOn())return h;
    return h.replace('<div class="cls">','<button class="ft-id" type="button" data-ft-open><span aria-hidden="true">◆</span> '+esc(ftCur()[1])+'</button><div class="cls">');
  };
})();
function coachCheck(L,i,on){
  var o=coachAll(),c=o[L];if(!c||c.wk!==fcMonday()||!Array.isArray(c.done))return;
  c.done[i]=on===undefined?!c.done[i]:!!on;o._best=Math.max(+o._best||0,coachDoneN(c));fcPut(COACH_KEY,o);
}
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  var a=function(n){return t.hasAttribute(n);},g=function(n){return t.getAttribute(n);};
  if(a('data-coach-open')){if(!fcOn())return;COACH.err='';coachSheet();return;}
  if(a('data-coach-make')){coachMake(save.lang,false);return;}
  if(a('data-coach-done')){coachCheck(save.lang,parseInt(g('data-coach-done'),10)||0);coachSheet();if(view==='home'||view==='review'){var y=window.scrollY;render();window.scrollTo(0,y);}return;}
  if(a('data-fc-do')){coachDo(g('data-fc-do'));return;}
  if(a('data-diary-open')){if(!fcOn())return;DIARY.tab='write';DIARY.err='';DIARY.res=null;DIARY.edit=false;diarySheet();return;}
  if(a('data-diary-edit')){var td=diaryToday();DIARY.edit=true;DIARY.draft=DIARY.res?DIARY.text:(td?td.text:'');DIARY.res=null;diarySheet();var ta=$('dyText');if(ta)ta.focus();return;}
  if(a('data-diary-tab')){DIARY.tab=g('data-diary-tab');diarySheet();return;}
  if(a('data-diary-send')){diarySend();return;}
  if(a('data-diary-say')){var r=DIARY.res||(diaryToday()&&diaryToday().res);if(r)speak(r[g('data-diary-say')]||'',LANGS[save.lang].tts);return;}
  if(a('data-diary-on')){var s=diarySet();s.on=g('data-diary-on')==='1';fcPut(DIARY_SET,s);diaryArm();diarySheet();return;}
  if(a('data-diary-perm')){try{Notification.requestPermission().then(function(){diaryArm();diarySheet();});}catch(err){}return;}
  if(a('data-ft-open')){if(!fcOn())return;ftSheet();return;}
  if(a('data-ft')){lsSet(FT_KEY,g('data-ft'));ftSheet();render();return;}
});
document.addEventListener('change',function(e){
  var t=e.target;if(!t||t.id!=='dyTime')return;
  if(!/^\d\d:\d\d$/.test(t.value))return;
  var s=diarySet();s.time=t.value;fcPut(DIARY_SET,s);diaryArm();
});
document.addEventListener('visibilitychange',function(){if(!document.hidden)diaryArm();});
setTimeout(diaryArm,1500);
