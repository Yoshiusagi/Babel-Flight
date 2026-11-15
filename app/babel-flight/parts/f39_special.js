/* ================= Babel Flight にしかないもの (every class, no AI) =================
   - 日本人のための特別コース: one more section of 日常会話モード (units in e3g_special.js), 日本語 display only.
   - できることリスト (Can-Do): what the learner can DO, not points: each line is a real situation, made of lessons.
     ◐ 練習した = flown once; ✓ できる = the phrases have come back right on later days (mastery ≥ 50%) or
     the conversation got ★★ or more. 記録 → できることリスト; the next flight's plan uses it too.
   - 次のフライト: a real trip (date, language, city, purpose). Home counts down, plans what is left to learn by the
     day, opens 出発前ブリーフィング the day before and on the day, and shows 現地モード (phrases to tap and play)
     while away. save.trip, synced.
   - 出発前ブリーフィング: ten minutes, only what tomorrow needs (mode 'brief'). */

/* ---------- 日本人のための特別コース ---------- */
function spIds(L){
  if(typeof UI!=='undefined'&&UI!=='ja')return [];
  return ['wasei1','wasei2','polite','japan1','japan2'].filter(function(id){var u=UNITS[L]&&UNITS[L][id];return !!(u&&u.special);});
}

/* ---------- できることリスト ---------- */
var CANDO=[
 ['travel','旅行',[
  ['空港でチェックインして、荷物を預けられる',['checkin']],
  ['機内で飲み物や食事を頼める',['inflight']],
  ['入国審査の質問に答えられる',['immigration','sc-imm']],
  ['ホテルでチェックインして、頼みごとができる',['hotel','sc-hotel']],
  ['レストランで注文して、会計できる',['restaurant','sc-rest']],
  ['カフェでランチを買える',['sc-cafe']],
  ['道をたずねて、困ったときに助けを呼べる',['city','sc-wc']],
  ['カード・財布・予約のトラブルに対応できる',['sc-card','sc-wallet','sc-booking']]
 ]],
 ['daily','日常',[
  ['あいさつと自己紹介ができる',['greet','intro']],
  ['数字・時刻・値段を言える・聞き取れる',['num','time']],
  ['気持ちを伝えて、雑談できる',['feel','chat']]
 ]],
 ['study','留学',[
  ['クラスで自己紹介できる',['sc-class']],
  ['先生に質問できる',['sc-teacher']],
  ['ホームステイ先の家族と話せる',['sc-home']],
  ['数学・理科・社会の授業の言葉がわかる',['math','sci','soc']]
 ]],
 ['japan','日本人だからこそ',[
  ['和製英語を、通じる言葉に言いかえられる',['wasei1','wasei2']],
  ['相手に合わせて、ていねいに頼める・断れる',['polite']],
  ['日本のことを説明できる',['japan1','japan2']]
 ]]
];
function cdUnitLv(L,uid){
  var u=UNITS[L]&&UNITS[L][uid];if(!u)return -1;
  var r=unitRec(L,uid);if(!r.n)return 0;
  if(u.kind==='scene')return (r.stars||0)>=2?2:1;
  return unitMastery(L,uid)>=0.5?2:1;
}
/* [title, uids that exist, level 0 まだ / 1 練習した / 2 できる] */
function cdLine(L,x){
  var ids=x[1].filter(function(id){return cdUnitLv(L,id)>=0;});
  if(!ids.length)return null;
  var lv=Math.min.apply(null,ids.map(function(id){return cdUnitLv(L,id);}));
  var any=ids.some(function(id){return cdUnitLv(L,id)>0;});
  return {t:x[0],ids:ids,lv:lv===0&&any?1:lv,next:ids.filter(function(id){return cdUnitLv(L,id)<2;})[0]||''};
}
function cdGroups(L){
  var out=[];
  CANDO.forEach(function(g){
    if(g[0]==='japan'&&!spIds(L).length)return;
    var lines=g[2].map(function(x){return cdLine(L,x);}).filter(Boolean);
    if(lines.length)out.push({k:g[0],t:g[1],lines:lines});
  });
  var p=typeof profById==='function'?profById(save.prof):null;
  if(p&&p.units&&p.units[L]&&typeof jobOpen==='function'&&jobOpen(p.id)){
    var ids=p.units[L].filter(function(id){return !!UNITS[L][id];});
    if(ids.length)out.push({k:'job',t:p.jp+'の仕事',lines:ids.map(function(id){return cdLine(L,[unitTitle(id)+'の会話ができる',[id]]);}).filter(Boolean)});
  }
  return out;
}
var CD={open:{travel:1}};
function cdCardHTML(){
  if(typeof UI!=='undefined'&&UI!=='ja')return '';
  var L=save.lang,gs=cdGroups(L);if(!gs.length)return '';
  var all=0,done=0;gs.forEach(function(g){g.lines.forEach(function(x){all++;if(x.lv===2)done++;});});
  var h='<section class="card cd-card"><div class="card-h"><h2 class="jh">できることリスト</h2><span class="lbl">CAN-DO ・ '+esc(LANGS[L].name)+'</span></div>'+
    '<div class="cd-top"><b class="mono">'+done+'<small> / '+all+'</small></b><span>'+esc(LANGS[L].name)+'でできるようになったこと</span></div>'+
    '<div class="cd-bar" aria-hidden="true"><i style="width:'+(all?Math.round(done/all*100):0)+'%"></i></div>';
  gs.forEach(function(g){
    var n=g.lines.filter(function(x){return x.lv===2;}).length,op=!!CD.open[g.k];
    h+='<div class="cd-g"><button class="cd-gh" type="button" data-cd-g="'+g.k+'" aria-expanded="'+op+'"><b>'+esc(g.t)+'</b><span class="mono">'+n+' / '+g.lines.length+'</span><i aria-hidden="true">'+(op?'−':'＋')+'</i></button>';
    if(op)h+='<ul class="cd-list">'+g.lines.map(function(x){
      var mk=x.lv===2?'✓':x.lv===1?'◐':'',lab=x.lv===2?'できる':x.lv===1?'練習した':'まだ';
      return '<li class="lv'+x.lv+'"><span class="cd-mk" aria-label="'+lab+'">'+mk+'</span><span class="cd-t">'+esc(x.t)+
        (x.lv<2&&x.next?'<small>'+(x.lv===1?'あと少し: 日をあけて復習すると ✓ に':'まずはレッスン')+' ・ '+esc(unitTitle(x.next))+'</small>':'')+'</span>'+
        (x.lv<2&&x.next?'<button class="ghost sm" type="button" data-cd-go="'+esc(x.next)+'">練習</button>':'')+'</li>';
    }).join('')+'</ul>';
    h+='</div>';
  });
  return h+'<p class="dim hint">◐ は1回レッスンした、✓ は日をあけても思い出せた(会話は★★以上)という印です。</p></section>';
}
function cdGo(uid){
  var L=save.lang,u=UNITS[L][uid];if(!u)return;
  closeSheet();
  if(u.kind==='scene'){go('home');setTimeout(function(){openNodeSheet(uid);},300);return;}
  if(unitRec(L,uid).n>0&&unitDue(L,uid)>0){startFlight({mode:'free',lang:L,items:u.items.map(function(x,i){return {uid:uid,i:i};}).filter(function(it){var r=itemRec(L,it.uid,it.i);return r.b>=1;}).slice(0,10)});return;}
  startUnitFlight(uid);
}

/* ---------- 次のフライト ---------- */
var TRIP_WHY=[['travel','旅行','✈️'],['study','留学','🎓'],['work','仕事','💼']];
function tripGet(){var t=save.trip;return t&&typeof t==='object'&&/^\d{4}-\d\d-\d\d$/.test(t.date||'')&&LANGS[t.L]?t:null;}
function tripDays(t){var p=t.date.split('-'),d=new Date(+p[0],+p[1]-1,+p[2],12),n=new Date();n.setHours(12,0,0,0);return Math.round((d-n)/DAY);}
function tripBackDays(t){if(!t.back)return tripDays(t)+14;var p=t.back.split('-'),d=new Date(+p[0],+p[1]-1,+p[2],12),n=new Date();n.setHours(12,0,0,0);return Math.round((d-n)/DAY);}
function tripPhase(t){var d=tripDays(t);if(d>1)return 'before';if(d>=0)return 'brief';return tripBackDays(t)>=0?'away':'home';}
function tripCity(t){return t.city||LANGS[t.L].city;}
/* what is left to learn for the trip: the can-do lines of its purpose */
function tripPlan(t){
  var want=t.why==='study'?['travel','study']:t.why==='work'?['travel','job']:['travel'];
  var lines=[];cdGroups(t.L).forEach(function(g){if(want.indexOf(g.k)>=0)g.lines.forEach(function(x){lines.push(x);});});
  var left=lines.filter(function(x){return x.lv<2;});
  return {all:lines.length,left:left,done:lines.length-left.length};
}
function tripHomeHTML(){
  var t=tripGet();if(!t)return '';
  var ph=tripPhase(t),LG=LANGS[t.L],city=tripCity(t),d=tripDays(t),w=TRIP_WHY.filter(function(x){return x[0]===t.why;})[0]||TRIP_WHY[0];
  var other=t.L!==save.lang?'<button class="ghost sm" type="button" data-trip-lang>'+esc(LG.name)+'に切りかえる</button>':'';
  var h='<section class="trip-card ph-'+ph+'" aria-label="次のフライト"><div class="tp-h"><span class="lbl">NEXT FLIGHT ・ '+w[2]+' '+w[1]+'</span><button class="tp-edit" type="button" data-trip-edit aria-label="フライトを編集">編集</button></div>';
  if(ph==='before'){
    var pl=tripPlan(t),per=pl.left.length?Math.max(1,Math.ceil(pl.left.length/Math.max(1,d-1))):0;
    h+='<div class="tp-main"><b class="tp-city">'+esc(city)+'</b><span class="tp-d"><b class="mono">'+d+'</b>日後</span></div>'+
      '<div class="tp-bar" aria-hidden="true"><i style="width:'+(pl.all?Math.round(pl.done/pl.all*100):0)+'%"></i></div>'+
      '<p class="tp-sub">出発までに「できる」にしたいこと: <b>'+pl.done+' / '+pl.all+'</b>'+(per?' ・ 1日 '+per+'つずつで間に合います':' ・ 準備ばっちり！')+'</p>';
    if(pl.left[0])h+='<button class="tp-next" type="button" data-cd-go="'+esc(pl.left[0].next)+'"'+(t.L!==save.lang?' disabled':'')+'><span>今日のおすすめ</span><b>'+esc(pl.left[0].t)+'</b></button>';
  }else if(ph==='brief'){
    h+='<div class="tp-main"><b class="tp-city">'+esc(city)+'</b><span class="tp-d"><b>'+(d===0?'今日':'明日')+'</b>出発</span></div>'+
      '<button class="go" type="button" data-brief="'+esc(t.why)+'"'+(t.L!==save.lang?' disabled':'')+'>🧳 出発前ブリーフィング<small>明日使う言葉だけを10分で確認</small></button>';
  }else if(ph==='away'){
    h+='<div class="tp-main"><b class="tp-city">'+esc(city)+'</b><span class="tp-d">滞在中</span></div><p class="tp-sub">現地モード: タップすると読み上げます(電波がなくても使えます)</p>'+tripLocalHTML(t.L);
  }else{
    h+='<div class="tp-main"><b class="tp-city">おかえりなさい！</b></div><p class="tp-sub">'+esc(city)+'への旅はどうだった？ 次のフライトも登録しておこう。</p>'+
      '<div class="tp-row"><button class="go sm" type="button" data-trip-edit>次のフライトを登録</button><button class="ghost sm" type="button" data-trip-clear>閉じる</button></div>';
  }
  return h+(other&&ph!=='home'?'<div class="tp-row">'+other+'</div>':'')+'</section>';
}
/* 現地モード: the phrases most needed while away */
var LOCAL_PICK=[['city',[0,1,2,3]],['restaurant',[0,1,2]],['hotel',[0,1]],['immigration',[0]]];
function tripLocalHTML(L){
  var out=[];
  LOCAL_PICK.forEach(function(x){var u=UNITS[L][x[0]];if(!u)return;x[1].forEach(function(i){if(u.items[i])out.push({k:ik(x[0],i),d:u.items[i]});});});
  return '<ul class="tp-local">'+out.slice(0,10).map(function(x){return '<li><button type="button" data-local-say="'+esc(x.k)+'"><b class="'+lfc(L)+'" translate="no">'+esc(x.d.t)+'</b><small>'+esc(x.d.jp)+'</small></button></li>';}).join('')+'</ul>';
}
function tripSheet(){
  var t=tripGet()||{L:save.lang,date:'',city:'',why:'travel',back:''};
  var langs=typeof learnOrder==='function'?learnOrder().filter(function(k){return LANGS[k];}):ORDER;
  var min=dayStr();
  $('sheetHost').innerHTML='<div class="sheet plain trip-sheet" role="dialog" aria-label="次のフライト"><div class="sheet-in"><span class="lbl">NEXT FLIGHT</span><h3>次のフライトを登録</h3>'+
    '<p class="dim">実際の旅行・留学・出張の予定を入れると、出発日に向けて準備プランを作ります。</p>'+
    '<div class="set-block"><span class="lbl">目的</span>'+seg('data-trip-why',t.why,TRIP_WHY.map(function(x){return [x[0],x[2]+' '+x[1]];}))+'</div>'+
    '<label class="tp-f"><span class="lbl">行き先の言語</span><select id="tpL">'+langs.map(function(k){return '<option value="'+k+'"'+(k===t.L?' selected':'')+'>'+esc(LANGS[k].name)+'</option>';}).join('')+'</select></label>'+
    '<label class="tp-f"><span class="lbl">行き先の都市(なくてもOK)</span><input id="tpCity" maxlength="20" autocomplete="off" placeholder="例: ソウル" value="'+esc(t.city||'')+'"></label>'+
    '<div class="tp-2"><label class="tp-f"><span class="lbl">出発日</span><input id="tpDate" type="date" min="'+min+'" value="'+esc(t.date||'')+'"></label>'+
    '<label class="tp-f"><span class="lbl">帰る日(なくてもOK)</span><input id="tpBack" type="date" min="'+min+'" value="'+esc(t.back||'')+'"></label></div>'+
    '<p class="warn" id="tpErr" hidden></p>'+
    '<button class="go" type="button" data-trip-save>登録する</button>'+(tripGet()?'<button class="ghost" type="button" data-trip-clear>このフライトを消す</button>':'')+
    '<button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';
  TRIP_EDIT={why:t.why};
}
var TRIP_EDIT={why:'travel'};
function tripSave(){
  var L=$('tpL').value,date=$('tpDate').value,back=$('tpBack').value,city=($('tpCity').value||'').trim().slice(0,20),err=$('tpErr');
  function bad(m){err.textContent=m;err.hidden=false;}
  if(!LANGS[L])return bad('行き先の言語を選んでね。');
  if(!/^\d{4}-\d\d-\d\d$/.test(date))return bad('出発日を入れてね。');
  if(date<dayStr())return bad('出発日が過ぎています。');
  if(back&&back<date)return bad('帰る日が出発日より前になっています。');
  save.trip={L:L,date:date,back:/^\d{4}-\d\d-\d\d$/.test(back)?back:'',city:city,why:TRIP_EDIT.why,t:Date.now()};
  store();closeSheet();go('home');
}

/* ---------- 出発前ブリーフィング ---------- */
var BRIEF_UNITS={travel:['immigration','hotel','city','restaurant','inflight'],study:['immigration','sc-class','sc-teacher','sc-home','city'],work:['immigration','hotel','city']};
function briefItems(L,why){
  var uids=(BRIEF_UNITS[why]||BRIEF_UNITS.travel).slice();
  if(why==='work'){var p=profById(save.prof);if(p&&p.units&&p.units[L])uids=p.units[L].concat(uids);}
  var known=[],fresh=[];
  uids.forEach(function(uid){var u=UNITS[L][uid];if(!u||u.kind==='scene'||!u.items.length)return;
    u.items.forEach(function(d,i){if(d.t.length>60)return;(itemRec(L,uid,i).b>0?known:fresh).push({uid:uid,i:i});});});
  return shuffle(known).slice(0,9).concat(shuffle(fresh).slice(0,Math.max(3,12-Math.min(9,known.length)))).slice(0,12);
}
function briefStart(why){
  var L=save.lang,items=briefItems(L,why);
  if(items.length<3)return;
  BRIEF.items=items;
  startFlight({mode:'brief',lang:L,items:items});
}
var BRIEF={items:null};

(function(){
  MODE_TITLE.brief='出発前ブリーフィング';
  var ps=pathSections;
  pathSections=function(lang){
    var s=ps.apply(this,arguments);
    if(save.mode!=='daily'&&save.mode)return s;
    var ids=spIds(lang);
    return ids.length?s.concat([{key:'special',title:'日本人のための特別コース',sub:lang==='en'?'和製英語のワナ・相手で変わる言い方・日本を説明する':'相手で変わる言い方',ids:ids}]):s;
  };
  if(typeof pathIdsFor==='function'){
    var pf=pathIdsFor;
    pathIdsFor=function(l){var a=pf.apply(this,arguments);spIds(l).forEach(function(id){if(a.indexOf(id)<0)a.push(id);});return a;};
  }
  var sf=startFlight;
  startFlight=function(opts){
    var r=sf.apply(this,arguments);
    if(F&&opts.mode==='brief'&&BRIEF.items){
      var q=[];
      BRIEF.items.forEach(function(it,n){
        if(itemRec(F.lang,it.uid,it.i).b===0)q.push({k:'learn',it:it,w:0});
        q.push({k:firstOK(n%2?['j2t','listen']:['listen','j2t'],it),it:it,w:1});
      });
      F.queue=q;F.wTotal=0;q.forEach(function(x){F.wTotal+=x.w;});
      var ph=$('phr');if(ph)ph.textContent='FL000 ・ 1/'+q.length+'問';
      BRIEF.items=null;
    }
    return r;
  };
  var hh=homeHTML;
  homeHTML=function(){
    var h=hh.apply(this,arguments),add=tripHomeHTML();
    if(!add&&UI==='ja')add='<button class="trip-add" type="button" data-trip-edit><span aria-hidden="true">🗓️</span><span><b>次のフライトを登録</b><small>旅行・留学・出張の日を入れると、出発日に向けて準備プランを作ります</small></span></button>';
    if(!add)return h;
    var i=h.indexOf('</header>');return i>=0?h.slice(0,i+9)+add+h.slice(i+9):add+h;
  };
  var rc=recordHTML;
  recordHTML=function(){
    var h=rc.apply(this,arguments),card=cdCardHTML();if(!card)return h;
    var at=h.indexOf('<section class="card" style="--lc');
    return at>=0?h.slice(0,at)+card+h.slice(at):h+card;
  };
  var rv=reviewHTML;
  reviewHTML=function(){
    var h=rv.apply(this,arguments);if(UI!=='ja')return h;
    var card='<section class="card mode brief-card"><span class="lbl">BRIEFING</span><h2 class="jh">出発前ブリーフィング</h2><p class="dim">旅行・留学・面接の前に、明日使う言葉だけを10分で確認。</p>'+
      '<div class="brief-b">'+TRIP_WHY.map(function(x){return '<button class="ghost sm" type="button" data-brief="'+x[0]+'">'+x[2]+' '+x[1]+'</button>';}).join('')+'</div></section>';
    var at=h.indexOf('<div class="mode-grid">');
    return at>=0?h.slice(0,at)+card+h.slice(at):h+card;
  };
})();
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  var a=function(n){return t.hasAttribute(n);},g=function(n){return t.getAttribute(n);};
  if(a('data-cd-g')){var k=g('data-cd-g');CD.open[k]=!CD.open[k];var y=window.scrollY;render();window.scrollTo(0,y);return;}
  if(a('data-cd-go')){cdGo(g('data-cd-go'));return;}
  if(a('data-trip-edit')){tripSheet();return;}
  if(a('data-trip-why')){TRIP_EDIT.why=g('data-trip-why');document.querySelectorAll('[data-trip-why]').forEach(function(b){b.setAttribute('aria-pressed',String(b===t));});return;}
  if(a('data-trip-save')){tripSave();return;}
  if(a('data-trip-clear')){save.trip=null;store();closeSheet();go('home');return;}
  if(a('data-trip-lang')){var tp=tripGet();if(tp){save.lang=tp.L;store();if(typeof HOME_ANIM!=='undefined')HOME_ANIM='lang';go('home');}return;}
  if(a('data-brief')){briefStart(g('data-brief'));return;}
  if(a('data-local-say')){var tp2=tripGet(),L=tp2?tp2.L:save.lang,m=/^(.+)\.(\d+)$/.exec(g('data-local-say')),u=m&&UNITS[L][m[1]];if(u&&u.items[+m[2]])speak(u.items[+m[2]].t,LANGS[L].tts,false,true);return;}
});
