/* ================= CLASSES (standalone site) =================
   Everyone on the website flies エコノミー (free, signed in or not): 発音チェック and the 検定 tab, with the
   paid classes' features shown locked (🔒 プレエコ〜) until billing goes live. cabinPlanLv() is where a
   paid account's class will come from; for now it is always エコノミー.
   The test account (full access) can switch between エコノミー / プレミアムエコノミー / ビジネス / ファースト
   in 記録 to try what each class gets: 検定コース, 模試 (ファースト), AI会話ロールプレイ, 弱点レポート and
   the class designs. The iPhone app (BF_APP) has no classes at all (cabinLv() is -1 there). */
var CABINS=[['economy','エコノミー','ECONOMY','無料','エコノミー'],['premium','プレミアムエコノミー','PREMIUM ECONOMY','月500円(予定)','プレエコ'],
            ['business','ビジネス','BUSINESS','月800円(予定)','ビジネス'],['first','ファースト','FIRST','月1,280円(予定)','ファースト']];
var CAB_DESIGN=[['','いつもの','今のデザイン'],['window','窓側の席','丸い窓を横にスワイプ'],['lounge','ラウンジ','紺と金・スワイプ操作'],['suite','スイート','黒と金・縦に1画面ずつ']];
var CAB_FEAT=[
 ['発音チェック',['◯','◯','◯','◯']],
 ['検定コース',['—','英検5級〜準2級など','すべての検定','すべて+模試']],
 ['授業の用語(くわしく)',['—','数学・理科(英語)','数学・理科(英語)','数学・理科(英語)']],
 ['AI会話ロールプレイ',['—','1日5回','1日15回','1日30回']],
 ['弱点レポート',['—','かんたん版','詳しい版','詳しい版+AIコーチ']],
 ['専用デザイン',['—','窓側の席','+ラウンジ','+スイート']]
];
var CAB_KEY='babelflight.cabin',CAB_DKEY='babelflight.cabinDesign';
function lsGet(k){try{return localStorage.getItem(k);}catch(e){return null;}}
function lsSet(k,v){try{localStorage.setItem(k,v);}catch(e){}}
function cabinTester(){try{return typeof entitled==='function'&&entitled();}catch(e){return false;}}
function cabinOn(){return !(typeof BF_APP!=='undefined'&&BF_APP);}
/* the class an ordinary account flies: エコノミー until paid plans open */
function cabinPlanLv(){return 0;}
function cabinLv(){
  if(!cabinOn())return -1;
  if(!cabinTester())return cabinPlanLv();
  var v=parseInt(lsGet(CAB_KEY),10);return v>=0&&v<=3?v:3;
}
var CAB_SOON='プレミアムエコノミー以上は準備中です。もうすぐ申し込めるようになります。';
/* what each paid class adds, for the エコノミー card */
var CAB_PITCH=['',
  '検定コース(英検5級〜準2級など) ・ 面接練習(3級・準2級) ・ AI会話ロールプレイ 1日5回 ・ 弱点レポート ・ 授業の用語(くわしく) ・ 筆記体のつなげ書き・名前 ・ 窓側の席デザイン',
  'プレエコの全部 ＋ すべての検定と面接練習 ・ ロールプレイ 1日15回 ・ 詳しい弱点レポート ・ ラウンジデザイン',
  'ビジネスの全部 ＋ 本番形式の模試 ・ ロールプレイ 1日30回 ・ AIコーチ ・ スイートデザイン'];
function cabinName(lv){return CABINS[lv]?CABINS[lv][1]:'';}
function cabinDesign(){var lv=cabinLv();if(lv<0)return -1;var d=parseInt(lsGet(CAB_DKEY),10);if(!(d>=0&&d<=lv))d=lv;return d;}
function applyCabin(){
  var d=cabinDesign(),name=d>0?CAB_DESIGN[d][0]:'';
  if(name)rootEl.setAttribute('data-cabin',name);else rootEl.removeAttribute('data-cabin');
  if(name==='window'){var h=new Date().getHours();rootEl.setAttribute('data-sky',h<5||h>=19?'night':h<9?'morning':h<16?'day':'evening');}
  else rootEl.removeAttribute('data-sky');
}
(function(){var e0=entSet;entSet=function(){var r=e0.apply(this,arguments);applyCabin();return r;};})();
function cabinFeatHTML(lv){
  return '<ul class="cabin-feat">'+CAB_FEAT.map(function(f){var v=f[1][lv];return '<li class="'+(v==='—'?'off':'on')+'"><span>'+f[0]+'</span><b>'+(v==='—'?'🔒':esc(v))+'</b></li>';}).join('')+'</ul>';
}
function cabinCardHTML(){
  var lv=cabinLv();if(lv<0)return '';
  if(!cabinTester()){
    return '<section class="card cabin-card eco"><div class="card-h"><h2 class="jh">搭乗クラス</h2><span class="lbl">'+CABINS[lv][2]+'</span></div>'+
      '<div class="cab-now"><b>'+CABINS[lv][1]+'</b><small>'+(lv?'':'無料 ・ ')+'いまのクラス</small></div>'+cabinFeatHTML(lv)+
      '<div class="cabin-up"><span class="lbl">もうすぐ ・ 上のクラス</span>'+CABINS.slice(lv+1).map(function(c,j){
        return '<div class="cu-row"><div class="cu-h"><b>'+c[1]+'</b><span class="cu-soon">準備中</span></div><small>'+esc(CAB_PITCH[lv+1+j])+'</small></div>';}).join('')+'</div>'+
      '<p class="dim hint">'+CAB_SOON+'</p></section>';
  }
  var d=cabinDesign();
  return '<section class="card cabin-card"><div class="card-h"><h2 class="jh">搭乗クラス</h2><span class="lbl">テスト用アカウントだけ</span></div>'+
    '<p class="dim hint">切り替えると、そのクラスで使える機能だけになります。ほかのアカウントは、切り替えなしのエコノミーです。</p>'+
    '<div class="cabin-seg" role="group" aria-label="搭乗クラス">'+CABINS.map(function(c,i){
      return '<button type="button" data-cabin-set="'+i+'" aria-pressed="'+(i===lv)+'"><b>'+c[1]+'</b><small>'+c[3]+'</small></button>';}).join('')+'</div>'+
    cabinFeatHTML(lv)+
    (lv>0?'<div class="set-block"><span class="lbl">デザイン</span><div class="cabin-design" role="group" aria-label="デザイン">'+CAB_DESIGN.slice(0,lv+1).map(function(x,i){
      return '<button type="button" data-cabin-design="'+i+'" aria-pressed="'+(i===d)+'"><i class="cd-sw cd-'+(x[0]||'base')+'" aria-hidden="true"></i><b>'+x[1]+'</b><small>'+x[2]+'</small></button>';}).join('')+'</div></div>':'')+
    '<p class="dim hint">ステータス特典とAIの回数制限は、テスト用アカウントなのでどのクラスでも解放されたままです。</p></section>';
}

/* ---- 検定モード ---- */
function examModeOn(){return cabinLv()>=0;}
/* 目標 (one per language), kept on this device in the test version */
var XG_KEY='babelflight.examTarget';
function xgLoad(){try{var o=JSON.parse(lsGet(XG_KEY)||'{}');return o&&typeof o==='object'?o:{};}catch(e){return {};}}
function xgFind(L,v){
  var p=typeof v==='string'?v.split('|'):[],out=null;
  (XGOALS[L]||[]).forEach(function(k){if(k.key!==p[0])return;k.goals.forEach(function(g){if(g[0]===p[1]&&g[1]&&XBANK[g[1]])out={kind:k,label:g[0],bank:XBANK[g[1]],name:k.pre+g[0],val:v};});});
  return out;
}
function examTarget(L){return xgFind(L,xgLoad()[L]);}
function bankUnits(b){return b.ids.filter(function(u){return !!UNITS[b.L][u];});}
function bankItems(b){var out=[];bankUnits(b).forEach(function(u){UNITS[b.L][u].items.forEach(function(x,i){out.push({uid:u,i:i});});});return out;}
function bankFull(b){return bankItems(b).length>=XBANK_FULL;}
function bankLocked(b){var lv=cabinLv();return lv>=0&&b.tier>lv;}
/* 合格圏メーター: an estimate from how firmly each phrase of the bank is remembered.
   A phrase counts 1/3 once learned, 2/3 after one more right answer on a later day, and fully after a third. */
function bankMeter(b){
  var it=bankItems(b),s=0,seen=0,firm=0;
  it.forEach(function(o){var v=Math.min(itemRec(b.L,o.uid,o.i).b||0,3);s+=v/3;if(v>=1)seen++;if(v>=3)firm++;});
  return {n:it.length,pct:it.length?Math.floor(s/it.length*100):0,seen:seen,firm:firm};
}
var XPASS=80,XW_EXAM={meter:'合格圏メーター',line:'合格圏'},XW_STUDY={meter:'理解度メーター',line:'しっかり理解'};
function bankWords(b){return b.study?XW_STUDY:XW_EXAM;}
function meterHTML(b,m,diff){
  var p=m.pct,left=Math.max(0,XPASS-p),w=bankWords(b);
  return '<div class="xmeter"><div class="xm-top"><span class="lbl">'+w.meter+'(目安)</span><b class="mono">'+p+'%'+(diff?'<small class="rep-diff up"> +'+diff+'</small>':'')+'</b></div>'+
    '<div class="xm-bar" role="img" aria-label="'+w.meter+' '+p+'%。'+XPASS+'%で'+w.line+'"><i style="width:'+p+'%"></i><span class="xm-pass" style="left:'+XPASS+'%"></span></div>'+
    '<div class="xm-row"><span>覚えた '+m.seen+'/'+m.n+' ・ 定着 '+m.firm+'/'+m.n+'</span><span class="xm-pl">'+(p>=XPASS?w.line+'に到達！':w.line+'まであと'+left+'%')+'</span></div></div>';
}
function examSections(L){
  if(!examModeOn())return null;
  var t=examTarget(L);
  if(t){var ids=bankUnits(t.bank);return [{key:'x-goal',title:t.name+'をめざす',sub:ids.length>1?'ステップ1〜'+ids.length+'のあとは、合格圏まで終わらないトレーニング':'問題集を準備中(今は1レッスン)',ids:ids}];}
  return (EXAMS[L]||[]).map(function(g){return {key:'x-'+g.key,title:g.title,sub:g.sub,ids:g.ids.filter(function(u){return !!UNITS[L][u];})};});
}
function examIsUnit(uid){return /^x-/.test(uid)&&!!UM[uid];}
function examLocked(uid){var lv=cabinLv();return lv>=0&&examIsUnit(uid)&&examTier(uid)>lv;}
function examLockText(L,uid){
  if(save.mode!=='exam'||!examModeOn()||!examLocked(uid))return '';
  return '🔒 '+CABINS[examTier(uid)][4];
}
function lockSheetHTML(title,t){
  return '<div class="sheet plain" role="dialog" aria-label="ロック中"><div class="sheet-in"><h3>🔒 '+esc(title)+'</h3>'+
    '<p style="font-size:14.5px">「'+CABINS[t][1]+'」から使えます。</p>'+
    '<p class="dim hint">'+(cabinTester()?'テスト用: 「記録」の「搭乗クラス」で切り替えられます。':'いまはエコノミー(無料)で搭乗中。'+CAB_SOON)+'</p>'+
    '<button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';
}
function examLockSheet(L,uid){
  if(!examModeOn()||!examLocked(uid))return false;
  $('sheetHost').innerHTML=lockSheetHTML(unitTitle(uid),examTier(uid));
  return true;
}
function examNext(L,cur){
  if(save.mode!=='exam'||!examModeOn())return undefined;
  var ids=pathIds(L).filter(function(u){return !examLocked(u);}),i,best=null,bd=0;
  if(!ids.length)return null;
  var k=cur?ids.indexOf(cur):-1;
  for(i=1;i<=ids.length;i++){var u=ids[(Math.max(k,-1)+i+ids.length)%ids.length];if(unitRec(L,u).n===0)return u;}
  for(i=0;i<ids.length;i++){var d=unitDue(L,ids[i]);if(d>bd){bd=d;best=ids[i];}}
  return best||ids[0];
}
/* the training card for a bank: meter, then 終わらないトレーニング (and AI examples once 合格圏 is reached) */
function trainBlockHTML(b){
  var full=bankFull(b),m=bankMeter(b),w=bankWords(b),h='';
  if(full)h+=meterHTML(b,m,0)+'<p class="xm-note">'+(b.study?'用語':'フレーズ')+'の覚え具合から出した目安です。日にちをあけて正解すると上がります。'+(b.study?'':'本番の合否を約束するものではありません。長文・リスニング・作文の練習も続けよう。')+'</p>';
  else h+='<p class="xm-prep"><b>問題集を準備中</b>今はこの目標のフレーズが'+m.n+'個だけなので、'+w.meter+'はまだ出ません。'+XBANK_FULL+'フレーズそろったら表示します。</p>';
  if(bankLocked(b))return h+'<p class="dim hint">🔒 この目標のレッスンは「'+CABINS[b.tier][1]+'」から</p>';
  var next=null;bankUnits(b).some(function(u){if(unitRec(b.L,u).n===0){next=u;return true;}return false;});
  if(m.seen>=4)h+='<button class="go sm" type="button" data-xtrain="'+esc(b.key)+'">トレーニング(10問)<small>'+(next?'覚えたフレーズを復習 ・ 新しいフレーズは地図のステップで':'復習の時期・苦手・まだ弱いフレーズから出題。何回でも')+'</small></button>';
  else if(next)h+='<button class="go sm" type="button" data-go="'+esc(next)+'">'+esc(unitTitle(next))+'からはじめる<small>レッスンで覚えたフレーズが、トレーニングに出てきます</small></button>';
  if(full&&m.pct>=XPASS&&typeof aiDrillAvail==='function'&&aiDrillAvail())
    h+='<button class="ghost ai-drill" type="button" data-xai="'+esc(b.key)+'">AIが作る新しい例文で練習<small>'+w.line+'に到達したので、同じ表現を別の文で(まちがいがあるかも)</small></button>';
  return h;
}
function xgoalSheet(){
  var L=save.lang,cur=xgLoad()[L],kinds=XGOALS[L]||[];
  $('sheetHost').innerHTML='<div class="sheet plain" role="dialog" aria-label="目標を選ぶ"><div class="sheet-in"><h3>目標を選ぼう</h3>'+
    '<p class="dim" style="font-size:13.5px">選んだ目標の問題集が地図に並びます。全部終わっても、合格圏に届くまでトレーニングが続きます。</p>'+
    kinds.map(function(k){
      return '<div class="xg-kind"><div class="xg-kh"><b>'+esc(k.title)+'</b><small>'+esc(k.sub)+'</small></div><div class="xg-chips">'+k.goals.map(function(g){
        var b=g[1]&&XBANK[g[1]],v=k.key+'|'+g[0],on=cur===v,sub='',cls='xg-chip';
        if(!b){sub='準備中';cls+=' none';}
        else if(bankLocked(b)){sub='🔒 '+CABINS[b.tier][4];cls+=' locked';}
        else if(!bankFull(b))sub='準備中';
        return '<button class="'+cls+'" type="button" '+(b?'data-xgoal-set="'+esc(v)+'"':'disabled')+' aria-pressed="'+on+'"><b>'+esc(g[0])+'</b>'+(sub?'<small>'+sub+'</small>':'')+'</button>';
      }).join('')+'</div></div>';
    }).join('')+
    (kinds.length?'':'<p class="dim">この言語の検定は準備中です。</p>')+
    (cur?'<button class="ghost" type="button" data-xgoal-set="">目標をはずす(検定を一覧で見る)</button>':'')+
    '<button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';
}
function xgoalSet(v){
  var L=save.lang,o=xgLoad();
  if(v){var t=xgFind(L,v);if(!t)return;if(bankLocked(t.bank)){$('sheetHost').innerHTML=lockSheetHTML(t.name,t.bank.tier);return;}o[L]=v;}
  else delete o[L];
  lsSet(XG_KEY,JSON.stringify(o));
  if(save.pos)delete save.pos[posKey(L)];
  closeSheet();render();window.scrollTo(0,0);
}
function examHomeHTML(L){
  if(!examModeOn())return '';
  if(save.mode==='study')return studyMoreHTML(L);
  if(save.mode!=='exam')return '';
  var lv=cabinLv(),t=examTarget(L),h='<section class="card exam-card"><span class="lbl">EXAM COURSE ・ '+CABINS[lv][2]+'</span>';
  if(t){
    h+='<div class="xg-head"><h2 class="jh">'+esc(t.name)+'</h2><button class="xg-chg" type="button" data-xgoal>目標を変える</button></div>'+trainBlockHTML(t.bank);
  }else{
    h+='<h2 class="jh">検定コース</h2><p class="dim" style="font-size:13.5px;margin-top:4px">目標の級やスコアを選ぶと、その問題集が地図に並びます。'+(lv<1?'':'今は検定ごとの最初のレッスンを一覧で表示中。')+'</p>'+
       (lv<1?'<button class="ghost" type="button" data-xgoal>どんな目標があるか見る<small>英検の級・TOEICのスコアなど</small></button>'
            :'<button class="go sm" type="button" data-xgoal>目標を選ぶ<small>英検の級・TOEICのスコアなど</small></button>');
    if(lv<1)h+='<p class="dim hint">🔒 検定コースは「プレミアムエコノミー」から</p>';
  }
  h+=(lv>=3?'<button class="ghost" type="button" data-mock-open>本番形式の模試に挑戦<small>時間制限つき ・ 合格ラインの目安つき</small></button>'
          :'<p class="dim hint">🔒 本番形式の模試(時間制限つき)はファーストから</p>')+
    '<p class="exam-tm">英検®・TOEIC®・IELTS・TOEFL®・TOPIK・DELE・CILSは、それぞれの団体の商標です。このコースは公式のものではなく、問題はすべてBabel Flightのオリジナルです。</p></section>';
  return h;
}

/* ---- 授業の用語(くわしく): 留学モード, 英語, プレミアムエコノミーから ---- */
var STUDY_MORE=[{bank:'sd-math',title:'数学の用語(くわしく)',sub:'数と式・図形・関数・確率とデータ ・ 英語'},{bank:'sd-sci',title:'理科の用語(くわしく)',sub:'物理・化学・生物・地学 ・ 英語'}];
(function(){
  var ps0=pathSections;
  pathSections=function(lang){
    var s=ps0.apply(this,arguments);
    if(save.mode==='study'&&lang==='en'&&cabinLv()>=1)
      s=s.concat(STUDY_MORE.map(function(x){return {key:'study-'+x.bank,title:x.title,sub:x.sub,ids:bankUnits(XBANK[x.bank])};}));
    return s;
  };
  var uk0=unitKind;
  unitKind=function(L,uid){if(/^sd-/.test(uid))return '用語';if(/^x-/.test(uid))return '検定';return uk0.apply(this,arguments);};
  /* 検定 with every lesson locked (エコノミー): the map's NEXT STOP has no lesson to name */
  var ut0=unitTitle;
  unitTitle=function(uid){if(uid==null&&save.mode==='exam'&&examModeOn())return '🔒 検定コースは'+CABINS[1][4]+'から';return ut0.apply(this,arguments);};
})();
function studyMoreHTML(L){
  var lv=cabinLv();
  if(lv<0||L!=='en')return '';
  var h='<section class="card exam-card study-more"><span class="lbl">STUDY ・ '+CABINS[lv][2]+'</span><h2 class="jh">授業の用語(くわしく)</h2>';
  if(lv<1)return h+'<p class="dim" style="font-size:13.5px;margin-top:4px">数学と理科の用語128語を、意味と授業での使われ方つきで。</p><p class="dim hint">🔒 「プレミアムエコノミー」から</p></section>';
  h+='<p class="dim" style="font-size:13.5px;margin-top:4px">数学と理科の用語を、意味と授業での使われ方つきで。答えたあとの説明に、先生が授業で言いそうな英文がのっています。</p>';
  STUDY_MORE.forEach(function(x){h+='<div class="sm-sub"><b>'+esc(x.title.replace('(くわしく)',''))+'</b>'+trainBlockHTML(XBANK[x.bank])+'</div>';});
  return h+'</section>';
}

/* ---- 終わらないトレーニング: due → weak → least firm, 10 at a time ---- */
var XT=null,XT_LAND=null;
MODE_TITLE.xtrain='トレーニング';
if(typeof SHR_MODE==='object')SHR_MODE.xtrain='トレーニング';
function xtrainPick(b,n){
  var now=Date.now(),due=[],weak=[],rest=[];
  bankItems(b).forEach(function(o){
    var r=itemRec(b.L,o.uid,o.i);
    if(!r.b)return;
    if(r.d<=now)due.push(o);else if((r.m||0)>0&&(r.k||0)<2)weak.push(o);else rest.push(o);
  });
  due.sort(function(a,c){return itemRec(b.L,a.uid,a.i).d-itemRec(b.L,c.uid,c.i).d;});
  rest=shuffle(rest).sort(function(a,c){return itemRec(b.L,a.uid,a.i).b-itemRec(b.L,c.uid,c.i).b;});
  return due.concat(shuffle(weak),rest).slice(0,n);
}
function startXtrain(key){
  var b=XBANK[key];if(!b||b.L!==save.lang||bankLocked(b))return;
  var items=xtrainPick(b,10);if(items.length<4)return;
  closeSheet();
  XT={bank:key,before:bankMeter(b).pct};
  startFlight({mode:'xtrain',lang:b.L,uid:null,items:shuffle(items)});
  var title=document.querySelector('#main .fl-id b');if(title)title.textContent='トレーニング: '+b.name;
}
function xaiStart(key){
  var b=XBANK[key];if(!b||b.L!==save.lang||bankLocked(b))return;
  AID.wrong=shuffle(bankItems(b)).slice(0,3).map(function(o){return UNITS[b.L][o.uid].items[o.i];});AID.L=b.L;
  aiDrillStart();
}
(function(){
  var c0=completeLesson;
  completeLesson=function(o){XT_LAND=o&&o.mode==='xtrain'&&XT?XT:null;if(!o||o.mode!=='xtrain')XT=null;return c0.apply(this,arguments);};
  var a0=aiDrillBtnHTML;
  aiDrillBtnHTML=function(){
    var h=a0.apply(this,arguments),x=XT_LAND;XT_LAND=null;
    if(!x||!XBANK[x.bank])return h;
    var b=XBANK[x.bank],m=bankMeter(b);
    return (bankFull(b)?'<div class="card xm-land">'+meterHTML(b,m,Math.max(0,m.pct-x.before))+'</div>':'')+
      (xtrainPick(b,10).length>=4?'<button class="go" type="button" data-xtrain="'+esc(b.key)+'">続けてトレーニング<small>'+esc(b.name)+' ・ 10問</small></button>':'')+h;
  };
})();

/* ---- 模試 (ファースト): one level's bank plus a few phrases from the levels next to it ---- */
var MOCK=null;
MODE_TITLE.mock='模試';
if(typeof SHR_MODE==='object')SHR_MODE.mock='模試';
function mockBanks(L){
  var out=[];(XGOALS[L]||[]).forEach(function(k){k.goals.forEach(function(g){if(g[1]&&XBANK[g[1]]&&out.indexOf(g[1])<0)out.push(g[1]);});});
  return out;
}
function mockSheet(){
  var L=save.lang,ks=mockBanks(L),t=examTarget(L);
  if(t){var i=ks.indexOf(t.bank.key);if(i>0){ks.splice(i,1);ks.unshift(t.bank.key);}}
  $('sheetHost').innerHTML='<div class="sheet plain" role="dialog" aria-label="模試"><div class="sheet-in"><h3>模試を選ぼう</h3>'+
    '<p class="dim" style="font-size:13.5px">選んだレベルの問題集と、前後のレベルから出題。1問20秒の時間制限つきです。復習の記録には入りません。</p><div class="opt-list">'+
    ks.map(function(k){var n=mockItems(L,k).length;return '<button class="choice" type="button" data-mock="'+esc(k)+'"><b>'+esc(XBANK[k].name)+'</b><small>'+n+'問 ・ 制限時間 '+fmtSec(n*20)+'</small></button>';}).join('')+
    '</div><button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';
}
function mockItems(L,key){
  var ks=mockBanks(L),k=ks.indexOf(key),b=XBANK[key];if(!b)return [];
  var own=shuffle(bankItems(b)).slice(0,16),extra=own.length>=16?2:4,out=own;
  [ks[k-1],ks[k+1]].forEach(function(n){if(n&&XBANK[n])out=out.concat(shuffle(bankItems(XBANK[n])).slice(0,extra));});
  return out;
}
function fmtSec(s){s=Math.max(0,Math.round(s));return Math.floor(s/60)+':'+pad2(s%60);}
function startMock(key){
  var L=save.lang;if(cabinLv()<3||!XBANK[key]||XBANK[key].L!==L)return;
  closeSheet();
  var items=shuffle(mockItems(L,key));
  startFlight({mode:'mock',lang:L,uid:null,items:items});
  var limit=items.length*20;
  MOCK={uid:key,t0:Date.now(),limit:limit,timeout:false,iv:0};
  var top=document.querySelector('#main .fl-top'),title=document.querySelector('#main .fl-id b');
  if(title)title.textContent='模試: '+XBANK[key].name;
  if(top)top.insertAdjacentHTML('beforeend','<div class="mock-tm" id="mockTm" role="timer" aria-label="残り時間">'+fmtSec(limit)+'</div>');
  var m=MOCK;
  m.iv=setInterval(function(){
    if(MOCK!==m||!F||F.mode!=='mock'||view!=='flight'){clearInterval(m.iv);if(MOCK===m&&(!F||F.mode!=='mock'))MOCK=null;return;}
    var left=m.limit-(Date.now()-m.t0)/1000,el=$('mockTm');
    if(el){el.textContent=fmtSec(left);el.classList.toggle('low',left<=30);}
    if(left<=0){m.timeout=true;clearInterval(m.iv);closeSheet();land();}
  },250);
}
function landMock(){
  var m=MOCK||{t0:Date.now()},total=F.queue.length,corr=F.corr,pct=Math.round(corr/Math.max(1,total)*100),pass=pct>=70;
  var used=(Date.now()-m.t0)/1000;
  if(m.iv)clearInterval(m.iv);MOCK=null;
  completeLesson({L:F.lang,uid:null,mode:'mock',stars:pct>=90?3:pct>=70?2:1,corr:corr,answered:F.corr+F.mist,
    grade:[pass?'合格ライン突破！':'あと少し！',(m.timeout?'TIME UP ・ ':'')+'SCORE '+pct+'%',
           '正解 '+corr+' / '+total+'問 ・ かかった時間 '+fmtSec(used)+' ・ 合格ラインの目安は70%'],
    wrong:[],wrongTitle:'',wrongNote:''});
}

/* ---- 発音チェック (speech recognition built into the browser; nothing is sent to this site) ---- */
var SRX={rec:null};
function srCtor(){return window.SpeechRecognition||window.webkitSpeechRecognition||null;}
function srStop(){if(SRX.rec){try{SRX.rec.abort();}catch(e){}SRX.rec=null;}}
function srListen(lang,done,state){
  var C=srCtor();if(!C){done(null,'unsupported');return;}
  srStop();
  var r=new C(),fin=false;SRX.rec=r;
  r.lang=lang;r.interimResults=false;r.maxAlternatives=3;r.continuous=false;
  function end(alts,err){if(fin)return;fin=true;if(SRX.rec===r)SRX.rec=null;if(state)state(false);done(alts,err);}
  r.onresult=function(ev){var res=ev.results&&ev.results[0],alts=[];if(res)for(var i=0;i<res.length;i++)alts.push(res[i].transcript);end(alts.length?alts:null,alts.length?null:'no-speech');};
  r.onerror=function(ev){end(null,(ev&&ev.error)||'error');};
  r.onend=function(){end(null,'no-speech');};
  try{r.start();if(state)state(true);}catch(e){end(null,'error');}
}
function srErrText(c){
  if(c==='not-allowed'||c==='service-not-allowed')return 'マイクが許可されていません。ブラウザの設定でマイクを許可してね。';
  if(c==='no-speech'||c==='aborted')return '声が聞き取れませんでした。もう一度、はっきり言ってみてね。';
  if(c==='unsupported')return 'このブラウザは音声認識に対応していません(ChromeやSafariで使えます)。';
  if(c==='network')return '音声認識には通信が必要です。電波を確認してね。';
  if(c==='language-not-supported')return 'この端末では、この言語の音声認識が使えません。';
  return 'うまく聞き取れませんでした。もう一度試してね。';
}
var NUMW=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
function normSay(s,L){
  s=String(s||'').toLowerCase();
  if(L!=='ko')s=s.normalize('NFD').replace(/[̀-ͯ]/g,'');
  s=s.replace(/[’‘`]/g,"'").replace(/[^\p{L}\p{N}' ]+/gu,' ').replace(/\s+/g,' ').trim();
  if(L==='en')s=s.split(' ').map(function(w){return /^\d+$/.test(w)&&+w<=20?NUMW[+w]:w;}).join(' ');
  return s;
}
function lcsLen(a,b){
  var prev=new Array(b.length+1).fill(0);
  for(var i=1;i<=a.length;i++){var cur=new Array(b.length+1).fill(0);for(var j=1;j<=b.length;j++)cur[j]=a[i-1]===b[j-1]?prev[j-1]+1:Math.max(prev[j],cur[j-1]);prev=cur;}
  return prev[b.length];
}
function sayScore(target,heard,L){
  var a=normSay(target,L),b=normSay(heard,L);
  if(!a||!b)return 0;
  if(L==='ko'){a=Array.from(a.replace(/ /g,'').normalize('NFD'));b=Array.from(b.replace(/ /g,'').normalize('NFD'));}
  else{a=a.split(' ');b=b.split(' ');}
  return 2*lcsLen(a,b)/(a.length+b.length);
}
function micIcon(){return '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></svg>';}
function pronBoxHTML(){
  if(cabinLv()<0||!srCtor()||!F||!F.cur)return '';
  return '<div class="pron"><button class="ghost pron-go" type="button" data-pron>'+micIcon()+'<span>発音チェック<small>ボタンを押して、言ってみよう</small></span></button><div id="pronOut" class="pron-out" aria-live="polite"></div></div>';
}
function pronRun(btn){
  if(!F||!F.cur)return;
  if(SRX.rec){srStop();return;}
  var d=dat(F.cur.it),L=F.lang,out=$('pronOut'),label=btn.querySelector('span');
  srListen(LANGS[L].tts,function(alts,err){
    var o=$('pronOut');if(!o)return;
    if(!alts){o.className='pron-out bad';o.textContent=srErrText(err);return;}
    var best=0,heard=alts[0];
    alts.forEach(function(a){var s=sayScore(d.t,a,L);if(s>best){best=s;heard=a;}});
    var lv=best>=0.9?['good','◎ ばっちり！ ちゃんと伝わる発音です']:best>=0.6?['ok','◯ おしい！ 聞こえた言葉と見比べてみよう']:['bad','△ もう一度！ ゆっくり、はっきり言ってみよう'];
    o.className='pron-out '+lv[0];
    o.innerHTML='<b>'+lv[1]+'</b><span>聞こえた言葉: <q class="'+(L==='ko'?'ko':'')+'">'+esc(heard)+'</q></span>';
    if(lv[0]==='good'&&typeof chimeOK==='function')chimeOK();
  },function(on){
    btn.classList.toggle('rec',on);
    if(label)label.innerHTML=on?'聞いています…<small>言い終わったら少し待ってね(もう一度押すと止まる)</small>':'発音チェック<small>ボタンを押して、言ってみよう</small>';
    if(on&&out){out.className='pron-out';out.textContent='';}
  });
}
document.addEventListener('click',function(e){var t=e.target&&e.target.closest&&e.target.closest('[data-next],[data-abort],[data-close-sheet],[data-role-back]');if(t)srStop();},true);

/* ---- 弱点レポート (kept on this device in the test version) ---- */
var REP_KEY='babelflight.report.v1';
var KIND_JP={t2j:'意味を選ぶ',j2t:'言い方を選ぶ',listen:'聞き取り',listenjp:'聞いて意味を選ぶ',build:'並べ替え',type:'入力',cloze:'穴埋め',aiq:'AIの例文'};
function repLoad(){try{var o=JSON.parse(lsGet(REP_KEY)||'{}');return o&&typeof o==='object'?o:{};}catch(e){return {};}}
function repNote(L,k,ok){
  if(cabinLv()<0||!LANGS[L])return;
  var o=repLoad(),r=o[L]||(o[L]={d:{},k:{}}),day=dayStr();
  var d=r.d[day]||(r.d[day]=[0,0]);d[0]++;if(ok)d[1]++;
  var kk=r.k[k]||(r.k[k]=[0,0]);kk[0]++;if(ok)kk[1]++;
  var days=Object.keys(r.d).sort();while(days.length>60)delete r.d[days.shift()];
  lsSet(REP_KEY,JSON.stringify(o));
}
function repTrendSVG(r){
  var W=300,H=96,n=14,bw=14,gap=(W-n*bw)/(n-1),now=Date.now(),cells=[];
  for(var i=n-1;i>=0;i--){var day=dayStr(new Date(now-i*864e5)),v=r.d[day];cells.push({day:day,n:v?v[0]:0,p:v&&v[0]?Math.round(v[1]/v[0]*100):null});}
  var s='<svg class="rep-trend" viewBox="0 0 '+W+' '+(H+18)+'" role="img" aria-label="この14日の正答率。'+cells.filter(function(c){return c.p!==null;}).map(function(c){return c.day.slice(5).replace('-','/')+' '+c.p+'%';}).join('、')+'">';
  s+='<line x1="0" x2="'+W+'" y1="'+(H-0.7*H)+'" y2="'+(H-0.7*H)+'" class="rep-ref"/><text x="'+W+'" y="'+(H-0.7*H-4)+'" text-anchor="end" class="rep-ax">70%</text>';
  cells.forEach(function(c,i){
    var x=i*(bw+gap);
    if(c.p===null){s+='<rect x="'+x+'" y="'+(H-2)+'" width="'+bw+'" height="2" rx="1" class="rep-none"><title>'+c.day+' 解答なし</title></rect>';return;}
    var h=Math.max(3,c.p/100*H);
    s+='<rect x="'+x+'" y="'+(H-h)+'" width="'+bw+'" height="'+h+'" rx="4" class="rep-bar"><title>'+c.day+' 正答率'+c.p+'%('+c.n+'問)</title></rect>';
  });
  s+='<text x="0" y="'+(H+15)+'" class="rep-ax">'+cells[0].day.slice(5).replace('-','/')+'</text><text x="'+W+'" y="'+(H+15)+'" text-anchor="end" class="rep-ax">今日</text></svg>';
  return s;
}
function repKindsHTML(r){
  var rows=Object.keys(r.k).filter(function(k){return KIND_JP[k]&&r.k[k][0]>=3;}).map(function(k){var v=r.k[k];return {k:k,n:v[0],p:Math.round(v[1]/v[0]*100)};})
    .sort(function(a,b){return a.p-b.p;});
  if(!rows.length)return '<p class="dim" style="font-size:13px">それぞれの形式を3問以上解くと、ここに出てきます。</p>';
  return '<ul class="rep-kinds">'+rows.map(function(x,i){
    return '<li><span class="rk-n">'+KIND_JP[x.k]+(i===0&&rows.length>1&&x.p<rows[rows.length-1].p?'<em>いちばん苦手</em>':'')+'</span>'+
      '<span class="rk-bar"><i style="width:'+Math.max(2,x.p)+'%"></i></span><b>'+x.p+'%</b><small>'+x.n+'問</small></li>';}).join('')+'</ul>';
}
function reportCardHTML(L){
  var lv=cabinLv();if(lv<1)return ''; /* エコノミー: the locked card sits lower, next to ロールプレイ (roleCardHTML) */
  var r=repLoad()[L]||{d:{},k:{}},weak=weakList(L).slice(0,5),now=Date.now(),wk=[0,0],pw=[0,0];
  for(var i=0;i<14;i++){var v=r.d[dayStr(new Date(now-i*864e5))];if(v){var t=i<7?wk:pw;t[0]+=v[0];t[1]+=v[1];}}
  var acc=wk[0]?Math.round(wk[1]/wk[0]*100):null,pacc=pw[0]?Math.round(pw[1]/pw[0]*100):null,diff=acc!==null&&pacc!==null?acc-pacc:null;
  var h='<section class="card report"><div class="card-h"><h2 class="jh">弱点レポート</h2><span class="lbl">'+esc(LANGS[L].name)+' ・ '+(lv>=2?'詳しい版':'かんたん版')+'</span></div>'+
    '<div class="rep-kpis"><div><span class="lbl">この7日の解答</span><b>'+wk[0]+'<small>問</small></b></div>'+
    '<div><span class="lbl">この7日の正答率</span><b>'+(acc===null?'—':acc+'<small>%</small>')+'</b>'+(diff!==null?'<span class="rep-diff '+(diff>=0?'up':'down')+'">先週より '+(diff>=0?'+':'')+diff+'pt</span>':'')+'</div></div>'+
    '<h3 class="rep-h">苦手なフレーズ TOP5</h3>'+
    (weak.length?'<ol class="rep-weak">'+weak.map(function(x){var d=UNITS[L][x.uid]&&UNITS[L][x.uid].items[x.i];if(!d)return '';
        return '<li><b class="'+(L==='ko'?'ko':'')+'">'+esc(d.t)+'</b><small>'+esc(d.jp)+' ・ ミス'+x.m+'回</small></li>';}).join('')+'</ol>'+
        '<button class="go sm" type="button" data-mode="weak">弱点コースで練習する</button>'
      :'<p class="dim" style="font-size:13px">まだ苦手なフレーズはありません。間違えたフレーズがここに出てきます。</p>');
  if(lv>=2){
    h+='<h3 class="rep-h">この14日の正答率</h3>'+repTrendSVG(r)+'<h3 class="rep-h">問題の形式ごとの正答率</h3>'+repKindsHTML(r);
  }else h+='<p class="dim hint">🔒 正答率の推移と、問題の形式ごとの得意・苦手はビジネスから</p>';
  if(lv>=3)h+='<div class="coach"><button class="ghost" type="button" data-coach>AIコーチにアドバイスをもらう</button><div id="coachOut" class="aiout" aria-live="polite"></div></div>';
  else if(lv===2)h+='<p class="dim hint">🔒 AIコーチのアドバイスはファーストから</p>';
  return h+'<p class="dim hint">テスト版のため、レポートの記録はこの端末だけに保存されます。</p></section>';
}
function coachRun(){
  var L=save.lang,out=$('coachOut');if(!out)return;
  if(!(typeof SAI==='object'&&SAI.enabled)){out.textContent='AIは準備中です(サイトのAIキーの設定待ち)。';return;}
  if(!(typeof ACCT==='object'&&ACCT.me)){out.textContent='ログインすると使えます。';return;}
  var r=repLoad()[L]||{d:{},k:{}},weak=weakList(L).slice(0,5).map(function(x){return UNITS[L][x.uid].items[x.i];}).filter(Boolean);
  var kinds=Object.keys(r.k).filter(function(k){return KIND_JP[k]&&r.k[k][0]>=3;}).map(function(k){return KIND_JP[k]+' '+Math.round(r.k[k][1]/r.k[k][0]*100)+'%('+r.k[k][0]+'問)';});
  var tot=[0,0];Object.keys(r.d).forEach(function(k){tot[0]+=r.d[k][0];tot[1]+=r.d[k][1];});
  var body={lang:L,
    phrase:(weak.map(function(d){return d.t;}).join(' / ')||'(苦手なフレーズはまだありません)').slice(0,300),
    jp:(weak.map(function(d){return d.jp;}).join(' / ')||'(なし)').slice(0,300),reading:'',
    note:('弱点レポートのデータ: これまでの解答 '+tot[0]+'問、正答率 '+(tot[0]?Math.round(tot[1]/tot[0]*100):0)+'%。問題の形式ごとの正答率: '+(kinds.join('、')||'まだデータが少ない')+'。上のフレーズは間違えた回数が多いものです。').slice(0,600),
    question:'この弱点データを見て、これからの勉強のしかたを3つ、具体的にアドバイスしてください。'};
  out.textContent='AIコーチが考え中…';out.classList.add('wait');
  saiPost('/api/ai/ask',body).then(function(res){
    var left=res.headers.get('x-ai-left');if(left!==null&&SAI.left){SAI.left.ask=parseInt(left,10);}
    if(!res.ok)return res.json().catch(function(){return {};}).then(function(j){throw j;});
    return res.text();
  }).then(function(t){out.classList.remove('wait');out.textContent=t;},function(j){out.classList.remove('wait');out.textContent=saiErr(j,'ask');});
}

/* ---- AI会話ロールプレイ (on top of the AI管制官 engine) ---- */
var ROLE_SC=[
 {id:'cabin',jp:'機内でCAと話す',sub:'飲み物や毛布をお願いする',who:'CABIN CREW',sit:'国際線の機内。食事の時間です。客室乗務員に話しかけて、飲み物を頼んだり、困っていることを伝えよう。',
  hint:{en:'Excuse me, could I have some water, please?',ko:'저기요, 물 좀 주시겠어요?',es:'Perdone, ¿me puede traer un poco de agua, por favor?',it:"Scusi, potrei avere un po' d'acqua, per favore?"}},
 {id:'immigration',jp:'入国審査',sub:'目的・日数・泊まる場所を答える',who:'IMMIGRATION',sit:'空港の入国審査。係官にあいさつしてパスポートを渡し、質問に答えて入国しよう。',
  hint:{en:'Hello. Here is my passport.',ko:'안녕하세요. 여기 여권이요.',es:'Hola. Aquí tiene mi pasaporte.',it:'Buongiorno. Ecco il mio passaporto.'}},
 {id:'hotel',jp:'ホテルのチェックイン',sub:'予約を伝えて、朝食やWi-Fiを聞く',who:'FRONT DESK',sit:'ホテルのフロント。予約していることを伝えて、チェックインしよう。',
  hint:{en:'Hi, I have a reservation under the name Sato.',ko:'안녕하세요. 사토 이름으로 예약했어요.',es:'Hola, tengo una reserva a nombre de Sato.',it:'Buonasera, ho una prenotazione a nome Sato.'}},
 {id:'restaurant',jp:'レストランで注文',sub:'席・注文・アレルギー・お会計',who:'SERVER',sit:'レストランに入りました。席をお願いして、料理と飲み物を注文しよう。',
  hint:{en:'Hi, a table for one, please.',ko:'안녕하세요. 한 명이에요.',es:'Hola, una mesa para uno, por favor.',it:'Buonasera, un tavolo per uno, per favore.'}},
 {id:'directions',jp:'道をたずねる',sub:'駅への行き方を聞く',who:'LOCAL',sit:'街で道に迷いました。近くの人に、駅への行き方をたずねよう。',
  hint:{en:'Excuse me, how can I get to the station?',ko:'실례합니다. 역에 어떻게 가요?',es:'Perdone, ¿cómo puedo llegar a la estación?',it:'Scusi, come arrivo alla stazione?'}},
 {id:'homestay',jp:'ホームステイ初日',sub:'あいさつ・家のルール・好きな食べ物',who:'HOST',sit:'ホームステイ先に着きました。ホストファミリーにあいさつして、自己紹介しよう。',
  hint:{en:"Hi, nice to meet you! I'm Ken from Japan.",ko:'안녕하세요! 일본에서 온 켄이에요.',es:'¡Hola, mucho gusto! Soy Ken, de Japón.',it:'Ciao, piacere! Sono Ken, vengo dal Giappone.'}},
 {id:'class',jp:'授業で先生に質問',sub:'宿題や授業の内容を聞く',who:'TEACHER',sit:'留学先の授業のあと。先生に話しかけて、宿題について質問しよう。',
  hint:{en:'Excuse me, I have a question about the homework.',ko:'선생님, 숙제에 대해 질문이 있어요.',es:'Perdone, profesor, tengo una pregunta sobre los deberes.',it:'Scusi, professore, ho una domanda sui compiti.'}},
 {id:'interview',jp:'スピーキング試験・面接',sub:'自分のことを話す',who:'EXAMINER',sit:'スピーキング試験の部屋に入りました。試験官にあいさつして、質問に答えよう。',
  hint:{en:'Good morning. Nice to meet you.',ko:'안녕하세요. 만나서 반갑습니다.',es:'Buenos días. Encantado de conocerle.',it:'Buongiorno. Piacere di conoscerla.'}}
];
var ROLE_LIM=[0,5,15,30],ROLE_KEY='babelflight.roleDay';
var ROLE={sc:null,L:'en',log:[],ex:[],busy:false,done:false,ctl:null,counted:false,hint:false};
function roleUsed(){try{var o=JSON.parse(lsGet(ROLE_KEY)||'{}');return o&&o.d===dayStr()?(o.n|0):0;}catch(e){return 0;}}
function roleLeft(){var lv=cabinLv();return lv<0?0:Math.max(0,ROLE_LIM[lv]-roleUsed());}
function roleAiOn(){return typeof SAI==='object'&&SAI.enabled&&typeof ACCT==='object'&&!!ACCT.me;}
function roleCardHTML(L){
  var lv=cabinLv();if(lv<0)return '';
  var h='<section class="card mode role-card"><span class="lbl">AI ROLEPLAY ・ '+esc(LANGS[L].name)+'</span><h2 class="jh">AI会話ロールプレイ</h2>'+
    '<p class="dim">機内のCA、入国審査官、ホテルの人などの役をAIが演じます。'+esc(LANGS[L].name)+'で返事をすると、採点とお手本が出ます。</p>';
  if(lv<1)return h+'<p class="dim hint">🔒 プレミアムエコノミーから使えます</p></section>'+
    '<section class="card mode report off"><span class="lbl">WEAKNESS REPORT</span><h2 class="jh">弱点レポート</h2>'+
    '<p class="dim">苦手なフレーズや、問題の形式ごとの正答率の変化をまとめて見られます。</p><p class="dim hint">🔒 プレミアムエコノミーから使えます</p></section>';
  if(!roleAiOn())return h+'<p class="warn">'+(typeof SAI==='object'&&!SAI.enabled?'AIは準備中です(サイトのAIキーの設定待ち)。':'ログインすると使えます。')+'</p></section>';
  var left=roleLeft();
  return h+(left>0?'<button class="go sm" type="button" data-role>はじめる</button>':'<p class="warn">今日のロールプレイはここまで。また明日ね！</p>')+
    '<p class="sai-left">'+cabinName(lv)+': 1日'+ROLE_LIM[lv]+'回 ・ 今日はあと'+left+'回</p></section>';
}
function roleLogHTML(){
  var sc=ROLE.sc,ko=ROLE.L==='ko'?' ko':'';
  return ROLE.log.map(function(m,i){
    if(m.who==='ai')return '<div class="radio"><span class="lbl">'+esc(sc.who)+'</span><p class="'+ko+'" lang="'+ROLE.L+'">'+esc(m.text)+'</p><button class="mini" type="button" data-role-say="'+i+'" aria-label="もう一度聞く">'+speakerIcon()+'</button></div>';
    var fb='';
    if(m.err)fb='<div class="fb warn">'+esc(m.err)+'</div>';
    else if(m.score!==undefined)fb='<div class="fb"><span class="fstars" aria-label="評価 '+m.score+' / 3">'+'★★★'.slice(0,m.score)+'<em>'+'★★★'.slice(m.score)+'</em></span>'+esc(m.fb||'')+(m.better?'<div class="better"><span class="lbl">お手本</span><span class="'+ko+'" lang="'+ROLE.L+'">'+esc(m.better)+'</span></div>':'')+'</div>';
    else if(m.wait)fb='<div class="fb dim">相手が考え中…</div>';
    return '<div class="me"><span class="lbl">あなた</span><p class="'+ko+'" lang="'+ROLE.L+'">'+esc(m.text)+'</p></div>'+fb;
  }).join('');
}
function roleHTML(){
  var L=ROLE.L,LG=LANGS[L],sc=ROLE.sc;
  var h='<div class="fl-top"><button class="x" type="button" data-role-back aria-label="戻る">'+closeIcon()+'</button><div class="fl-id"><span class="lbl">AI会話ロールプレイ ・ '+esc(LG.name)+'</span><b>'+(sc?esc(sc.jp):'場面を選ぼう')+'</b></div></div>';
  if(!sc){
    return h+'<p class="dim lead">AIが相手の役を演じます。'+esc(LG.name)+'で返事をしよう。返事ごとに採点とお手本が出ます。</p><div class="opt-list">'+
      ROLE_SC.map(function(s,i){return '<button class="choice" type="button" data-role-sc="'+i+'"><b>'+esc(s.jp)+'</b><small>'+esc(s.sub)+'</small></button>';}).join('')+'</div>'+
      '<p class="dim hint">'+cabinName(cabinLv())+': 1日'+ROLE_LIM[cabinLv()]+'回まで(今日はあと'+roleLeft()+'回)。AIの答えはまちがうこともあります。</p><div class="pad-b"></div>';
  }
  h+='<div class="card sit"><span class="lbl">場面</span><p>'+esc(sc.sit)+'</p></div><div id="roleLog" class="atclog role-log">'+roleLogHTML()+'</div>';
  if(ROLE.done){
    h+='<div class="card" style="text-align:center"><b>会話終了。おつかれさま！</b><div class="row2" style="margin-top:10px"><button class="ghost" type="button" data-role-sc="'+ROLE_SC.indexOf(sc)+'" style="flex:1">もう一度</button><button class="ghost" type="button" data-role-list style="flex:1">別の場面</button></div></div>';
  }else{
    h+='<div class="atc-in"><div id="roleHint" class="hintline'+(ROLE.hint?'':' hidden-hint')+'">'+(ROLE.hint?'例: '+esc(sc.hint[L]):'')+'</div>'+
      '<div class="row2"><input id="roleIn" class="typebox'+(L==='ko'?' ko':'')+'" type="text" lang="'+L+'" placeholder="'+esc(LG.name)+'で返事を書こう" aria-label="返事" autocomplete="off" autocapitalize="none" spellcheck="false">'+
      (srCtor()?'<button class="sq role-mic" type="button" data-role-mic aria-label="声で入力">'+micIcon()+'</button>':'')+
      '<button class="go" type="button" data-role-send style="width:auto;margin:0;padding:12px 16px">送信</button></div>'+
      (ROLE.log.length?'':'<button class="sq" type="button" data-role-hint>最初の言い方のヒント</button>')+'</div>';
  }
  return h+'<div class="pad-b"></div>';
}
function roleRefresh(){var l=$('roleLog');if(l)l.innerHTML=roleLogHTML();window.scrollTo(0,document.body.scrollHeight);}
function roleStart(i){
  if(ROLE.ctl){try{ROLE.ctl.abort();}catch(e){}}
  ROLE={sc:ROLE_SC[i],L:ROLE.L,log:[],ex:[],busy:false,done:false,ctl:null,counted:false,hint:false};
  render();window.scrollTo(0,0);
}
function roleSend(){
  var inp=$('roleIn');if(!inp||ROLE.busy||ROLE.done||!ROLE.sc)return;
  var text=inp.value.trim().slice(0,300);if(!text)return;
  if(!ROLE.counted){
    if(roleLeft()<=0){ROLE.log.push({who:'me',text:text,err:'今日のロールプレイはここまで。また明日ね！'});roleRefresh();return;}
    lsSet(ROLE_KEY,JSON.stringify({d:dayStr(),n:roleUsed()+1}));ROLE.counted=true;
  }
  inp.value='';ROLE.busy=true;
  var me={who:'me',text:text,wait:true};ROLE.log.push(me);roleRefresh();
  var ctl=typeof AbortController==='function'?new AbortController():null;ROLE.ctl=ctl;
  var at=ROLE,sc=ROLE.sc,L=ROLE.L;
  saiPost('/api/ai/atc',{scenario:'role:'+sc.id+':'+L,history:ROLE.ex.slice(),pilot:text},ctl&&ctl.signal)
  .then(function(r){return r.json().catch(function(){return {};});})
  .then(function(j){
    if(ROLE!==at)return;
    ROLE.busy=false;me.wait=false;
    if(!j||!j.ok){
      me.err=j&&j.error==='plan'?'このアカウントでは使えません。':saiErr(j,'atc');
      if(j&&j.error==='too_long'){ROLE.done=true;render();window.scrollTo(0,document.body.scrollHeight);}else roleRefresh();
      return;
    }
    var s=parseInt(j.score,10);me.score=isNaN(s)?0:clamp(s,0,3);me.fb=String(j.feedback_ja||'');me.better=String(j.better||'');
    var ai=String(j.atc||'').trim();
    ROLE.ex.push({pilot:text,atc:ai,score:me.score,feedback:me.fb,better:me.better});
    if(ai){ROLE.log.push({who:'ai',text:ai});speak(ai,LANGS[L].tts,false,true);}
    if(j.done===true||ROLE.ex.length>=8){ROLE.done=true;render();window.scrollTo(0,document.body.scrollHeight);}
    else roleRefresh();
    if(me.score>=3)chimeOK();
  },function(e){
    if(ROLE!==at)return;
    ROLE.busy=false;me.wait=false;
    if(e&&e.name==='AbortError')return;
    me.err='通信できませんでした。電波を確認して、もう一度送ってね。';roleRefresh();
  });
}

/* ---- clicks ---- */
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  var a=function(n){return t.hasAttribute(n);},g=function(n){return t.getAttribute(n);};
  if(a('data-cabin-set')){var v=parseInt(g('data-cabin-set'),10);if(!(v>=0&&v<=3)||!cabinTester())return;lsSet(CAB_KEY,String(v));lsSet(CAB_DKEY,String(v));applyCabin();render();return;}
  if(a('data-cabin-design')){var dv=parseInt(g('data-cabin-design'),10);if(!(dv>=0&&dv<=cabinLv()))return;lsSet(CAB_DKEY,String(dv));applyCabin();render();return;}
  if(a('data-mock-open')){if(cabinLv()>=3)mockSheet();return;}
  if(a('data-xgoal')){xgoalSheet();return;}
  if(a('data-xgoal-set')){xgoalSet(g('data-xgoal-set'));return;}
  if(a('data-xtrain')){startXtrain(g('data-xtrain'));return;}
  if(a('data-xai')){xaiStart(g('data-xai'));return;}
  if(a('data-mock')){startMock(g('data-mock'));return;}
  if(a('data-pron')){pronRun(t);return;}
  if(a('data-coach')){coachRun();return;}
  if(a('data-role')){if(cabinLv()<1)return;ROLE={sc:null,L:save.lang,log:[],ex:[],busy:false,done:false,ctl:null,counted:false,hint:false};view='role';render();window.scrollTo(0,0);return;}
  if(a('data-role-sc')){roleStart(parseInt(g('data-role-sc'),10));return;}
  if(a('data-role-list')){ROLE.sc=null;render();window.scrollTo(0,0);return;}
  if(a('data-role-back')){if(ROLE.ctl){try{ROLE.ctl.abort();}catch(x){}}ROLE.busy=false;if(ROLE.sc){ROLE.sc=null;render();window.scrollTo(0,0);}else go('review');return;}
  if(a('data-role-send')){roleSend();return;}
  if(a('data-role-hint')){ROLE.hint=true;var hl=$('roleHint');if(hl&&ROLE.sc){hl.textContent='例: '+ROLE.sc.hint[ROLE.L];hl.classList.remove('hidden-hint');}t.hidden=true;return;}
  if(a('data-role-say')){var m=ROLE.log[parseInt(g('data-role-say'),10)];if(m)speak(m.text,LANGS[ROLE.L].tts,false,true);return;}
  if(a('data-role-mic')){
    if(SRX.rec){srStop();return;}
    srListen(LANGS[ROLE.L].tts,function(alts,err){var inp=$('roleIn');if(!inp)return;if(alts){inp.value=alts[0];inp.focus();}else{var hl=$('roleHint');if(hl){hl.textContent=srErrText(err);hl.classList.remove('hidden-hint');}}},
      function(on){t.classList.toggle('rec',on);});
    return;
  }
});
document.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target&&e.target.id==='roleIn'&&!e.isComposing){e.preventDefault();roleSend();}});

/* ---- ラウンジ・スイート: swipe left on the answer card for 次へ, a small tap of vibration when right ---- */
(function(){
  var sx=0,sy=0,st=0,on=false;
  function swipeOK(){var d=rootEl.getAttribute('data-cabin');return d==='lounge'||d==='suite';}
  document.addEventListener('touchstart',function(e){
    var s=e.target&&e.target.closest&&e.target.closest('#sheetHost .sheet');if(!s||!swipeOK()||!e.touches||!e.touches[0])return;
    on=true;sx=e.touches[0].clientX;sy=e.touches[0].clientY;st=Date.now();
  },{passive:true});
  document.addEventListener('touchend',function(e){
    if(!on)return;on=false;
    var p=e.changedTouches&&e.changedTouches[0];if(!p)return;
    var dx=p.clientX-sx,dy=p.clientY-sy;
    var up=rootEl.getAttribute('data-cabin')==='suite';
    if(((dx<-70&&Math.abs(dy)<60)||(up&&dy<-60&&Math.abs(dx)<70))&&Date.now()-st<800){var b=document.querySelector('#sheetHost [data-next]');if(b){buzz(8);b.click();}}
  },{passive:true});
  var c0=chimeOK;chimeOK=function(){if(swipeOK())buzz(12);return c0.apply(this,arguments);};
})();
applyCabin();
