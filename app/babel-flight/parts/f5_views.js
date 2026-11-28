/* ================= VIEWS ================= */
var view='home',F=null,board=null,confirmReset=false,obStep=0,obDraft=null,pickerBack='home';
function fmtIn(ms){
  var d=ms-Date.now();if(d<=0)return 'いま';
  var h=Math.ceil(d/3600000);if(h<24)return h+'時間後';
  return Math.ceil(h/24)+'日後';
}
function bez(t,a,c,b){var u=1-t;return {x:u*u*a.x+2*u*t*c.x+t*t*b.x,y:u*u*a.y+2*u*t*c.y+t*t*b.y,
  dx:2*u*(c.x-a.x)+2*t*(b.x-c.x),dy:2*u*(c.y-a.y)+2*t*(b.y-c.y)};}
function ringSVG(n,goal){
  var p=clamp(n/goal,0,1);
  /* 計器の目盛り: リングの内側に12本(3本ごとに長い目盛り) */
  var tk='';
  for(var i=0;i<12;i++){var a=i*Math.PI/6,c=Math.cos(a),s=Math.sin(a),long=i%3===0,r0=long?9.2:10,r1=11;
    tk+='<line x1="'+(18+r0*c).toFixed(2)+'" y1="'+(18+r0*s).toFixed(2)+'" x2="'+(18+r1*c).toFixed(2)+'" y2="'+(18+r1*s).toFixed(2)+'" stroke="currentColor" stroke-width="'+(long?.7:.45)+'" opacity="'+(long?.7:.4)+'"/>';}
  return '<svg class="ring" viewBox="0 0 36 36" aria-hidden="true"><g class="ring-ticks" style="color:var(--ink2)">'+tk+'</g><circle cx="18" cy="18" r="15" fill="none" stroke="var(--line)" stroke-width="4"/>'+
    '<circle cx="18" cy="18" r="15" fill="none" stroke="'+(p>=1?'var(--good)':'var(--signal)')+'" stroke-width="4" stroke-linecap="round" pathLength="100" stroke-dasharray="'+(p*100).toFixed(1)+' 100" transform="rotate(-90 18 18)"/></svg>';
}
function topBar(title,share){
  var n=todayCount();
  return '<header class="top"><div class="brand">'+planeIcon()+(title?esc(title):'Babel<b>Flight</b>')+'</div>'+
    (share&&typeof shareIconHTML==='function'?shareIconHTML(share):'')+
    '<div class="stats-top"><div class="goal-pill" title="今日の目標">'+ringSVG(n,save.goal)+'<span><span class="lbl">今日</span><span class="v">'+n+'/'+save.goal+'</span></span></div>'+
    '<div class="pill"><span class="lbl">連続</span><span class="v">'+streakNow()+'日</span></div>'+
    '<div class="pill"><span class="lbl">マイル</span><span class="v">'+fmt(save.miles)+'</span></div></div></header>';
}
function destChips(){
  var h='<div class="dests" role="group" aria-label="学ぶ言語">';
  (typeof myLangs==='function'?myLangs():ORDER).forEach(function(k){
    h+='<button class="dest" type="button" data-lang="'+k+'" style="--dc:var(--c-'+k+')" aria-pressed="'+(k===save.lang)+'"><span class="code">'+LANGS[k].code+'</span><span class="nm">'+esc(LANGS[k].name)+'</span></button>';
  });
  if(typeof myLangs==='function')h+='<button class="dest dest-more" type="button" data-lang-pick aria-label="言語を選ぶ"><span class="code">＋</span><span class="nm">ほかの言語</span></button>';
  return h+'</div>';
}
function passHTML(L,uid){
  var LG=LANGS[L],u=UNITS[L][uid],rec=unitRec(L,uid),rk=statusIdx(),m=Math.round(unitMastery(L,uid)*100);
  var tp=profById(u.track),track=tp?tp.jp+'コース':({travel:'旅行フレーズ',daily:'日常会話',study:'留学'}[u.track]||'基本の会話');
  return '<section class="pass'+((typeof perkHas==='function'?perkHas(4):rk>=4)?' diamond':'')+'" aria-label="搭乗券"><div class="pass-main"><div class="card-h" style="margin:4px 0 0"><span class="lbl">搭乗券 ・ '+esc(track)+'</span><span class="lbl">'+RANKS[rk][1]+'</span></div>'+
    '<div class="pass-route"><div class="ap">HND<small>東京 羽田</small></div>'+planeIcon()+'<div class="ap">'+LG.code+'<small>'+esc(LG.city)+'</small></div></div>'+
    '<div class="pass-title">'+esc(unitTitle(uid))+'</div><div class="lbl" style="margin-top:4px">'+'<span>'+esc(unitLat(uid))+'</span>'+(rec.n>0?'  ・  <span>'+rec.n+'回クリア</span>':'')+'</div>'+
    '<div class="pass-grid"><div><span class="lbl">便名</span><div class="v">'+flightNo(L,uid)+'</div></div>'+
    '<div><span class="lbl">ゲート</span><div class="v">'+gateNo(L,uid)+'</div></div>'+
    '<div><span class="lbl">問題数</span><div class="v">'+(u.items.length*2)+'問</div></div>'+
    '<div><span class="lbl">定着度</span><div class="v">'+m+'%</div></div></div></div>'+
    '<div class="pass-stub"><div class="tear-line tear-h" role="button" tabindex="0" data-tear="'+esc(uid)+'" aria-label="ミシン目を右へスライドして、このレッスンを始める"><span class="tear-cue">ミシン目を右へ引っ張る ▶</span></div><div class="stub-row"><div class="barcode">'+barcodeSVG(flightNo(L,uid)+L)+'</div></div>'+
    tearHTML(uid)+'</div></section>';
}
function reviewHTML(){
  var L=save.lang,LG=LANGS[L],due=dueList(L),weak=weakList(L),learned=learnedList(L),nd=nextDueIn(L),h=topBar('復習');
  h+=destChips();
  if(typeof reportCardHTML==='function')h+=reportCardHTML(L);
  h+='<section class="card mode"><div class="big-count"><div class="due-board" aria-label="復習 '+due.length+'フレーズ">'+pad2(Math.min(due.length,99))+'</div><div><h2 class="jh">忘れかけた頃の復習</h2><p class="dim" style="font-size:13.5px;margin-top:4px">';
  if(due.length)h+='今がちょうど復習のタイミング。思い出すほど記憶が長持ちします。';
  else if(learned.length)h+='今は復習するものがありません。次は'+fmtIn(nd)+'です。';
  else h+='まだ学習したフレーズがありません。ホームから1レッスンやってみよう。';
  h+='</p></div></div><button class="go" type="button" data-mode="review"'+(due.length?'':' disabled')+'>復習をはじめる<small>'+(due.length?Math.min(10,due.length)+'問':'復習するものはありません')+'</small></button></section>';
  h+=remCardHTML(L);
  if(typeof loungeCardHTML==='function')h+=loungeCardHTML(L);
  h+='<div class="mode-grid">';
  h+='<section class="card mode"><span class="lbl">WEAK POINTS</span><h2 class="jh">弱点コース</h2><p class="dim">間違えたことのあるフレーズを、間違えた回数が多い順に出します。2回続けて正解すると卒業。</p><div class="mcount mono">'+weak.length+'<small> フレーズ</small></div><button class="go sm" type="button" data-mode="weak"'+(weak.length?'':' disabled')+'>はじめる</button></section>';
  var annOK=!!UNITS[L]['pilot-ann']&&ttsAvail(LG.tts);
  /* 機長アナウンス (every display language): only for the courses that have the announcements */
  if(UNITS[L]['pilot-ann'])h+='<section class="card mode"><span class="lbl">LISTENING</span><h2 class="jh">リスニング特訓</h2><p class="dim">機長アナウンスを'+esc(LG.name)+'で聞いて、内容を当てよう。長い文の聞き取り練習です。</p><div class="mcount mono">'+UNITS[L]['pilot-ann'].items.length+'<small data-tk="問(問題数)"> 問</small></div>'+
     (annOK?'<button class="go sm" type="button" data-mode="ann">はじめる</button>':'<p class="warn">この端末では'+esc(LG.name)+'の音声が使えません</p>')+'</section>';
  if(typeof cursiveCardHTML==='function')h+=cursiveCardHTML(L);
  if(!BF_APP)h+='<section class="card mode atc-card"><span class="lbl">AI ROLEPLAY ・ 英語</span><h2 class="jh">AI管制官と交信練習</h2><p class="dim">管制官役のAIと英語で無線交信。あなたの返答を採点して、お手本も教えてくれます。</p>'+
     (typeof aiAtcEntryHTML==='function'?aiAtcEntryHTML():AI.ok?'<button class="go sm" type="button" data-atc>交信をはじめる</button>':'<p class="warn">'+(AI.checked?'この環境ではAI機能が使えません(Claudeで開くと使えます)':'AI機能を確認中…')+'</p>')+'</section>';
  if(typeof roleCardHTML==='function')h+=roleCardHTML(L);
  h+='<section class="card mode"><span class="lbl">FREE</span><h2 class="jh">自由練習</h2><p class="dim">学習ずみのフレーズからランダムに10問。復習のタイミングに関係なく練習できます。</p><div class="mcount mono">'+learned.length+'<small> フレーズ</small></div><button class="go sm" type="button" data-mode="free"'+(learned.length?'':' disabled')+'>はじめる</button></section>';
  h+='</div>';
  var counts=[0,0,0,0,0,0,0];
  learned.forEach(function(x){counts[Math.min(6,itemRec(L,x.uid,x.i).b)]++;});
  h+='<section class="card explain"><div class="card-h"><h2 class="jh">なぜ間隔をあけて復習するの？</h2></div>'+
     '<div class="ladder">'+[1,2,4,8,16,32].map(function(d,i){return '<div class="'+(counts[i+1]?'on':'')+'">'+d+'日<small>'+counts[i+1]+'</small></div>';}).join('')+'</div>'+
     '<p><b>忘れかけた頃に思い出す</b>と、記憶は前より長持ちします。正解が続くと復習までの間隔が1→2→4→8→16→32日と伸び、間違えると短くなります。</p>'+
     '<p>同じ日に何度解いても間隔は伸びません。<b>次の日に思い出せるか</b>が本当のチェックです。</p></section>';
  return h;
}
/* permanent stamp for having reached Captain (the status itself lasts 6 months) */
function capStampHTML(){
  var d=fmtDate(save.cap);
  return '<div class="cap-stamp" role="img" aria-label="キャプテン到達スタンプ '+d+'"><svg viewBox="0 0 120 120" aria-hidden="true">'+
    '<defs><path id="capT" d="M22 60A38 38 0 0 1 98 60"/><path id="capB" d="M14 60A46 46 0 0 0 106 60"/></defs>'+
    '<g fill="none" stroke="currentColor"><circle cx="60" cy="60" r="56" stroke-width="3.2"/><circle cx="60" cy="60" r="33" stroke-width="1.4"/></g>'+
    '<g fill="currentColor" font-family="B612 Mono,monospace" font-weight="700" text-anchor="middle">'+
    '<text font-size="11" letter-spacing="2.6"><textPath href="#capT" startOffset="50%">CAPTAIN</textPath></text>'+
    '<text font-size="7.5" letter-spacing="1.6"><textPath href="#capB" startOffset="50%">BABEL FLIGHT</textPath></text>'+
    '<g transform="translate(60 54) scale(.95)"><path d="'+PLANE_D+'"/></g>'+
    '<text x="60" y="80" font-size="7" letter-spacing=".5">'+d+'</text></g></svg></div>';
}
function stampSVG(L,uid,rec,uidSuffix){
  var LG=LANGS[L],lat=unitLat(uid),r=seeded(hash(L+uid))(),rot=Math.round(r*24-12),id='sp'+uidSuffix.replace(/[^a-zA-Z0-9-]/g,''),col='var(--c-'+L+')';
  var dt=stampDate(rec.last).split(' '),round=hash(uid)%2===0;
  var h='<svg viewBox="0 0 120 120" style="color:'+col+';--rot:'+rot+'deg;transform:rotate('+rot+'deg)" role="img" aria-label="'+esc(unitTitle(uid))+'のスタンプ">';
  if(round){
    h+='<defs><path id="'+id+'t" d="M20 60A40 40 0 0 1 100 60"/><path id="'+id+'b" d="M12 60A48 48 0 0 0 108 60"/></defs>'+
       '<g fill="none" stroke="currentColor"><circle cx="60" cy="60" r="56" stroke-width="3"/><circle cx="60" cy="60" r="34" stroke-width="1.4"/></g>'+
       '<g fill="currentColor" font-family="B612 Mono,monospace" font-weight="700" text-anchor="middle">'+
       '<text font-size="9.5" letter-spacing="2.4"><textPath href="#'+id+'t" startOffset="50%">'+LG.cityEn+'</textPath></text>'+
       '<text font-size="'+(lat.length>11?6.5:8)+'" letter-spacing="1.6"><textPath href="#'+id+'b" startOffset="50%">'+esc(lat)+'</textPath></text>'+
       '<text x="60" y="58" font-size="19">'+LG.code+'</text>'+
       '<text x="60" y="71" font-size="6.5" letter-spacing=".6">'+dt[0]+' '+dt[1]+'</text><text x="60" y="79" font-size="6.5" letter-spacing=".6">'+dt[2]+'</text></g>';
  }else{
    h+='<g fill="none" stroke="currentColor"><rect x="6" y="24" width="108" height="72" rx="6" stroke-width="3"/><rect x="11.5" y="29.5" width="97" height="61" rx="3" stroke-width="1.2"/></g>'+
       '<g fill="currentColor" font-family="B612 Mono,monospace" font-weight="700" text-anchor="middle">'+
       '<text x="60" y="44" font-size="8.5" letter-spacing="3">ARRIVED</text>'+
       '<text x="60" y="68" font-size="24">'+LG.code+'</text>'+
       '<text x="60" y="79" font-size="'+(lat.length>11?6:7.5)+'" letter-spacing="1.2">'+esc(lat)+'</text>'+
       '<text x="60" y="88" font-size="6.5" letter-spacing=".6">'+dt.join(' ')+'</text></g>';
  }
  return h+'</svg>';
}
function seg(attr,cur,list){return '<div class="seg" role="group">'+list.map(function(t){return '<button type="button" '+attr+'="'+t[0]+'" aria-pressed="'+(String(cur)===String(t[0]))+'">'+t[1]+'</button>';}).join('')+'</div>';}
var LEVELS=[['beg','はじめて'],['mid','少しわかる'],['adv','日常会話OK']];
var GOALS=[[1,'1回'],[2,'2回'],[3,'3回'],[5,'5回']];
function recordHTML(){
  var now=Date.now(),win=milesWindow(now),rk=statusIdx(now),nx=RANKS[rk+1],cur=RANKS[rk],p=profById(save.prof);
  var kept=!!(save.st&&save.st.until>now&&save.st.lv===rk&&rk>0);
  var pct=nx?clamp((win-cur[2])/(nx[2]-cur[2]),0,1)*100:100,h=topBar('記録','status'),stamps=0;
  ORDER.forEach(function(l){ALL_IDS[l].forEach(function(uid){if(unitRec(l,uid).n>0)stamps++;});});
  h+='<section class="id-card'+((typeof perkHas==='function'?perkHas(5):rk>=RANKS.length-1)?' gold':'')+'"><button class="photo" type="button" data-icon-open aria-label="アイコンを変える">'+avatarHTML()+'<i class="photo-ed" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg></i></button><div style="min-width:0"><span class="lbl">名前</span>'+
     '<input id="pname" maxlength="14" value="'+esc(save.name)+'" aria-label="名前" autocomplete="off" spellcheck="false">'+
     '<div class="cls">'+cur[0]+' ステータス'+(p?' ・ '+esc(p.jp)+'志望':'')+'</div><div class="cls-bar"><i style="width:'+pct+'%"></i></div>'+
     '<div class="lbl" style="margin-top:6px">'+(nx?'次の「'+nx[0]+'」まで '+fmt(Math.max(0,nx[2]-win))+' マイル':'最高ステータスに到達')+'</div>'+
     '<div class="lbl st-sub">直近6ヶ月 '+fmt(win)+' マイル'+(kept?' ・ '+fmtDate(save.st.until)+' まで有効':'')+'</div></div>'+
     (save.cap?capStampHTML():'')+'</section>';
  if(typeof perksCardHTML==='function')h+=perksCardHTML();
  if(typeof cabinCardHTML==='function')h+=cabinCardHTML();
  if(typeof acctCardHTML==='function')h+=acctCardHTML();
  if(typeof pwaCardHTML==='function')h+=pwaCardHTML();
  h+='<div class="kpis">'+
     [['マイル',fmt(save.miles)],['レッスン',fmt(save.flights)],['連続日数',streakNow()+'日'],['学習したフレーズ',fmt(totalLearned())],['定着したフレーズ',fmt(totalMastered())],['スタンプ',stamps]].map(function(k){
       return '<div class="kpi"><span class="lbl">'+k[0]+'</span><div class="v">'+k[1]+'</div></div>';}).join('')+'</div>';
  (typeof myLangs==='function'?myLangs():ORDER).forEach(function(l){
    var LG=LANGS[l],ids=pathIdsFor(l);
    h+='<section class="card" style="--lc:var(--c-'+l+')"><div class="card-h"><h2>'+LG.cityEn+' '+LG.code+'</h2><span class="lbl">'+esc(LG.name)+' ・ '+unitsDone(l,ids)+' / '+ids.length+'</span></div><div class="stamps">';
    ids.forEach(function(uid){
      var rec=unitRec(l,uid);
      if(rec.n>0)h+='<div class="slot got">'+stampSVG(l,uid,rec,'-'+l+uid)+'</div>';
      else h+='<div class="slot empty">'+esc(unitTitle(uid))+'</div>';
    });
    h+='</div></section>';
  });
  h+='<section class="card"><div class="card-h"><h2 class="jh">学習の設定</h2></div>'+
     '<div class="set-block"><span class="lbl">表示言語 ・ Language</span>'+uiPickHTML()+'</div>'+
     '<div class="set-row"><span>職業コース<br><b>'+(p?esc(p.jp):'未設定')+'</b></span><button class="ghost" type="button" data-picker>変更</button></div>'+
     lvBlockHTML()+whyRowHTML()+
     (typeof enVarHTML==='function'?enVarHTML():'')+
     '<div class="set-block"><span class="lbl">1日の目標(レッスン数)</span>'+seg('data-goal',save.goal,GOALS)+'</div>'+
     '<div class="set-block"><span class="lbl">表示</span>'+seg('data-theme-set',save.theme,[['auto','自動'],['light','ライト'],['dark','ダーク']])+'</div>'+
     (typeof accentHTML==='function'?accentHTML():'')+
     '<div class="set-row"><span>効果音</span><button class="ghost" type="button" data-toggle-sound aria-pressed="'+save.sound+'">'+(save.sound?'ON':'OFF')+'</button></div>'+
     '<div class="set-row"><span>タップ音</span><button class="ghost" type="button" data-toggle-tap aria-pressed="'+save.tap+'">'+(save.tap?'ON':'OFF')+'</button></div>'+
     (typeof vibRowHTML==='function'?vibRowHTML():'')+
     '<div class="set-row"><span class="dim" style="font-size:13px">進捗は'+(cloud.doc?'アカウントに保存されています':'この端末のブラウザに保存されます')+'</span>'+
     (confirmReset?'<span class="row2"><button class="ghost danger" type="button" data-reset-yes>消去する</button><button class="ghost" type="button" data-reset-no data-tk="やめる(取り消し)">やめる</button></span>':'<button class="ghost danger" type="button" data-reset>リセット</button>')+'</div></section>';
  h+=creditsHTML();
  h+=skipListHTML();
  return h;
}
/* credits: who made the app and the services it was built with (bottom of 記録) */
var CREDITS={by:'戸井慶成',byEn:'Yoshinari Toi',year:2026,links:[
 ['Claude','https://claude.ai','設計・プログラミング・AI'],
 ['Higgsfield','https://higgsfield.ai','公開・サーバー'],
 ['GitHub','https://github.com/Yoshiusagi/babel-flight','コードの保存場所']
]};
function creditsHTML(){
  return '<section class="card credits"><div class="card-h"><h2 class="jh">このアプリについて</h2></div>'+
    '<div class="cr-app" lang="en">Babel Flight</div>'+
    '<div class="cr-by"><span class="lbl">制作</span><b>'+esc(CREDITS.by)+'</b><span lang="en">('+esc(CREDITS.byEn)+')</span></div>'+
    '<span class="lbl cr-h">使ったサービス</span><ul class="cr-links">'+
    CREDITS.links.map(function(l){return '<li><a href="'+l[1]+'" target="_blank" rel="noopener noreferrer" aria-label="'+esc(l[0]+': '+l[2]+'(新しいタブで開きます)')+'"><b lang="en">'+esc(l[0])+'<i aria-hidden="true">↗</i></b><small>'+esc(l[2])+'</small></a></li>';}).join('')+
    '</ul>'+(typeof notamBtnHTML==='function'?notamBtnHTML():'')+'<p class="cr-copy" lang="en">© '+CREDITS.year+' '+esc(CREDITS.byEn)+'</p></section>';
}
var LEVEL_HINT={beg:'はじめの一歩から。新しいフレーズはカードで見てから解きます。読み方のヒントつき、選択肢は3つ。',mid:'標準。並べ替えや入力問題も出ます。',adv:'入力問題が多め。職業コースが先に表示されます。'};
function pathIdsFor(l){
  var ids=(firstOn(l)?['first']:[]).concat(dailyIds(l),LANGS[l].units.map(function(u){return u.id;}),TRAVEL_SC,localOn(l)?['sc-local']:[],STUDY_ALL,UNITS[l].usuk&&UI==='ja'?['usuk']:[]),p=profById(save.prof);
  if(p&&jobOpen(p.id))ids=ids.concat(p.units[l]);
  ALL_IDS[l].forEach(function(uid){if(ids.indexOf(uid)<0&&unitRec(l,uid).n>0)ids.push(uid);});
  return ids.filter(function(uid){return !!UNITS[l][uid];}); /* a スターター language has no 職業・留学 units yet */
}
function profGrid(sel,attr){
  return '<div class="prof-grid">'+PROF.map(function(p){
    if(!jobOpen(p.id))return '<button class="prof soon" type="button" disabled aria-disabled="true"><span class="pcode">'+p.code+'</span><b>'+esc(p.jp)+'</b><small>準備中</small></button>';
    return '<button class="prof" type="button" '+attr+'="'+p.id+'" aria-pressed="'+(sel===p.id)+'"><span class="pcode">'+p.code+'</span><b>'+esc(p.jp)+'</b><small>'+p.en+'</small></button>';
  }).join('')+'<button class="prof none" type="button" '+attr+'="" aria-pressed="'+(!sel)+'"><span class="pcode">—</span><b>まだ決めていない</b><small>あとで選べます</small></button></div>';
}
function pickerHTML(){
  return '<div class="fl-top"><button class="x" type="button" data-picker-close aria-label="戻る">'+closeIcon()+'</button><div class="fl-id"><span class="lbl">職業コース</span><b>どんな仕事で活躍したい？</b></div></div>'+
    '<p class="dim lead">選んだ職業の専門会話が、ホームのロードマップに追加されます。4言語すべてに対応しています。</p>'+profGrid(save.prof,'data-pick');
}
function openIconSheet(){
  var cur=save.icon||'',anyLk=false;
  $('sheetHost').innerHTML='<div class="sheet" role="dialog" aria-label="アイコンを選ぶ"><div class="sheet-in"><h3>アイコンを選ぶ</h3><div class="icon-grid">'+
    [['','','標準(飛行機)']].concat(ICONS).map(function(x){
      var fc=x[3]==='F';if(fc&&!(typeof fcOn==='function'&&fcOn()))return '';
      var lk=!!x[3]&&!fc&&!(typeof perkHas==='function'&&perkHas(x[3]));if(lk)anyLk=true;
      return '<button type="button" data-icon-set="'+x[0]+'" aria-pressed="'+(cur===x[0])+'" aria-label="'+x[2]+(lk?'(シルバーで解放)':fc?'(ファースト)':'')+'"'+(lk?' class="locked" disabled':fc?' class="fc-ic"':'')+'>'+avatarHTML(x[0])+(lk?'<i class="lock" aria-hidden="true">🔒</i>':'')+'</button>';}).join('')+
    '</div>'+(anyLk?'<p class="dim hint">🔒のアイコンは、シルバーになると使えます(一度なればずっと使えます)。</p>':'')+
    (typeof fcOn==='function'&&fcOn()?'<p class="dim hint">金色のふちのアイコンは、ファーストクラスの間だけ使えます。</p>':'')+'<button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';
}
/* the first questions: 言語 → 学ぶ理由 → (仕事なら)職業 → レベル → 苦手なこと → 1日の目標 */
function obSteps(){var s=['lang','why'];if(obDraft&&obDraft.why==='work')s.push('job');return s.concat(['level','weak','goal']);}
function onboardHTML(){
  var D=obDraft,steps=obSteps(),at=clamp(obStep,0,steps.length-1),st=steps[at],LG=LANGS[D.lang],h='<div class="ob"><div class="ob-dots" aria-label="ステップ '+(at+1)+' / '+steps.length+'">'+steps.map(function(i,j){return '<i class="'+(j<=at?'on':'')+'"></i>';}).join('')+'</div>';
  if(st==='lang'){
    h+=uiPickHTML()+'<div class="brand ob-brand">'+planeIcon()+'Babel<b>Flight</b></div><h1 class="ob-h">日本から世界へ。<br>仕事で使う言葉を、フライト形式で。</h1>'+
       '<p class="dim lead">はじめに少しだけ質問させてね。あなたに合わせて学ぶ内容を組み立てます。</p>'+(typeof acctObHTML==='function'?acctObHTML():'')+'<h2 class="ob-q">どの言語を学ぶ？</h2><div class="lang-grid">'+
       learnOrder().map(function(k){var LG=LANGS[k];return '<button class="langc" type="button" data-ob-lang="'+k+'" style="--dc:var(--c-'+k+')" aria-pressed="'+(D.lang===k)+'"><span class="code">'+LG.code+'</span><b>'+esc(LG.name)+(LG.starter?'<em class="lp-tag">スターター</em>':'')+'</b><small><span class="'+lfc(k)+'">'+esc(LG.native)+'</span> ・ '+esc(LG.city)+'行き</small></button>';}).join('')+'</div>';
  }else if(st==='why'){
    h+='<h2 class="ob-q">なぜ'+esc(LG.name)+'を学ぶ？</h2><p class="dim lead">いちばんの理由を1つ選んでね。始める場所が変わります。</p>'+whyChoicesHTML(D.why,'data-ob-why',D.lang);
  }else if(st==='job'){
    h+='<h2 class="ob-q">どんな仕事で活躍したい？</h2><p class="dim lead">選んだ職業の専門会話を、基本の会話にプラスして学べます。</p>'+profGrid(D.prof,'data-ob-prof');
  }else if(st==='level'){
    h+='<h2 class="ob-q">'+esc(LG.name)+'のレベルは？</h2><div class="opt-list">'+
       LEVELS.map(function(t){return '<button class="choice" type="button" data-ob-level="'+t[0]+'" aria-pressed="'+(D.level===t[0])+'"><b>'+t[1]+'</b><small>'+LEVEL_HINT[t[0]]+'</small></button>';}).join('')+'</div>';
  }else if(st==='weak'){
    h+='<h2 class="ob-q">苦手なことは？</h2><p class="dim lead">いくつでも選べます。問題の出し方を合わせます。</p>'+weakChoicesHTML(D.weak,'data-ob-weak');
  }else{
    h+='<h2 class="ob-q">1日の目標は？</h2><div class="opt-list">'+
       [[1,'気軽に','1日1レッスン ・ 約3分'],[2,'ふつう','1日2レッスン ・ 約6分'],[3,'しっかり','1日3レッスン ・ 約10分'],[5,'本気','1日5レッスン ・ 約15分']].map(function(t){return '<button class="choice" type="button" data-ob-goal="'+t[0]+'" aria-pressed="'+(D.goal===t[0])+'"><b>'+t[1]+'</b><small>'+t[2]+'</small></button>';}).join('')+'</div>';
  }
  var last=at===steps.length-1;
  h+='<div class="ob-acts">'+(at>0?'<button class="ghost" type="button" data-ob-back>戻る</button>':'<span></span>')+
     '<button class="go" type="button" data-ob-next'+(st==='why'&&!D.why?' disabled':'')+'>'+(last?'はじめる':'次へ')+'</button></div></div>';
  return h;
}
function obDraftNew(){var d={lang:save.lang,prof:save.prof,level:'beg',goal:save.goal,why:save.why,weak:(save.weak||[]).slice()};if(d.lang===UI)d.lang=learnOrder()[0];return d;}
/* finishing the first questions */
function obFinish(){
  var D=obDraft;
  save.lang=D.lang;save.prof=D.prof;save.level=D.level;save.goal=D.goal;
  if(!save.lv)save.lv={};save.lv[D.lang]=D.level;
  save.onboarded=true;save.mode='daily';
  applyWhy(D.why||'hobby',D.weak,D.lang,D.prof);
  if(typeof notamSeenAll==='function')notamSeenAll();   /* everything is new to a new user: no update notice */
  store();go('home');
  if(typeof bootFx==='function')bootFx({kind:'climb',text:'いってらっしゃい！'});
}
function render(){
  if(typeof applyEnVar==='function')applyEnVar();
  var main=$('main'),L=save.lang;
  rootEl.style.setProperty('--lc','var(--c-'+(view==='onboard'&&obDraft?obDraft.lang:L)+')');
  var showTabs=(view==='home'||view==='review'||view==='record');
  $('tabs').hidden=!showTabs;
  if(view==='home')main.innerHTML=homeHTML();
  else if(view==='review')main.innerHTML=reviewHTML();
  else if(view==='record')main.innerHTML=recordHTML();
  else if(view==='picker')main.innerHTML=pickerHTML();
  else if(view==='onboard')main.innerHTML=onboardHTML();
  else if(view==='tune')main.innerHTML=tuneHTML();
  else if(view==='atc')main.innerHTML=atcHTML();
  else if(view==='scene')main.innerHTML=sceneHTML();
  else if(view==='role'&&typeof roleHTML==='function')main.innerHTML=roleHTML();
  var TABS=['home','review','record'],pi=TABS.indexOf(PREVVIEW),nx=TABS.indexOf(view),cls='enter';
  if(pi>=0&&nx>=0&&pi!==nx)cls=nx>pi?'enter-r':'enter-l';
  /* a mode change on home: the screen itself does not slide or fade (that was the stutter); the mode bar and the map carry the motion */
  else if(HOME_ANIM==='mode')cls='';
  main.classList.remove('enter','enter-l','enter-r');void main.offsetWidth;if(cls)main.classList.add(cls);
  PREVVIEW=view;
  if(view==='home'){mapMount();revealRows();}
  if(view==='review'||view==='record'||view==='picker')animateView();
  document.body.classList.toggle('dark-ui',view==='scene');
  /* on the home screen (dark theme) the sky's lower part takes the map's navy, so the map seems to carry on down */
  document.body.classList.toggle('home-map',view==='home');
  var tabs=document.querySelectorAll('.tab');
  for(var i=0;i<tabs.length;i++){if(tabs[i].getAttribute('data-tab')===view)tabs[i].setAttribute('aria-current','page');else tabs[i].removeAttribute('aria-current');}
  tabIndMove();
  var n=dueList(L).length,b=$('dueBadge');b.textContent=n>99?'99+':n;b.hidden=n===0;
  if(typeof natTabsSync==='function')natTabsSync(showTabs,view);
}

/* ---- 搭乗券を破って出発（ミシン目を右へ引っ張る）---- */
function tearHTML(uid){
  return '<p class="dim hint tear-hint">ミシン目を右へ引っ張ると、半券が破れて出発</p>';
}
(function(){
  var st=document.createElement('style');
  st.textContent='.tear-line{position:relative;height:60px;margin:-6px -20px 0;display:flex;align-items:center;justify-content:center;touch-action:none;user-select:none;-webkit-user-select:none;cursor:grab}'+
    '.tear-line::before{content:"";position:absolute;left:20px;right:20px;top:50%;border-top:2px dashed currentColor;opacity:.6}'+
    '.tear-cue{position:relative;padding:4px 12px;border-radius:999px;background:var(--surface);font-size:12px;font-weight:800;letter-spacing:.06em;color:var(--sc,var(--good))}'+
    '.tear-line:focus-visible{outline:3px solid currentColor;outline-offset:2px}'+
    '.pass-stub{transition:transform .3s ease,opacity .3s ease}'+
    '.pass-stub.tearing{transition:none}'+
    '.pass-stub.torn{transform:translateX(140%) rotate(16deg)!important;opacity:0;transition:transform .42s cubic-bezier(.3,.7,.3,1),opacity .42s ease!important}'+
    '.tear-hint{text-align:center;margin:6px 4px 0}'+
    '.lesson-scrim{position:fixed;inset:0;z-index:29;touch-action:none;background:transparent}'+
    '.lesson-sheet{touch-action:none;overscroll-behavior:none}';
  document.head.appendChild(st);
})();
var TEAR={el:null,x0:0,dx:0};
function tearOff(band){
  var stub=band&&band.parentNode;
  if(!stub||stub.classList.contains('torn'))return;
  var uid=band.getAttribute('data-tear');
  stub.classList.remove('tearing');
  stub.style.transform='';
  stub.classList.add('torn');
  if(typeof hapt==='function')hapt();
  setTimeout(function(){closeSheet();startUnitFlight(uid);},460);
}
document.addEventListener('touchstart',function(e){
  var band=e.target&&e.target.closest&&e.target.closest('.tear-line');
  if(!band||!e.touches||e.touches.length!==1)return;
  TEAR.el=band;TEAR.x0=e.touches[0].clientX;TEAR.dx=0;
  band.parentNode.classList.add('tearing');
},{passive:true});
document.addEventListener('touchmove',function(e){
  if(TEAR.el&&e.touches&&e.touches[0]){
    if(e.cancelable)e.preventDefault();
    TEAR.dx=Math.max(0,e.touches[0].clientX-TEAR.x0);
    TEAR.el.parentNode.style.transform='translateX('+TEAR.dx+'px) rotate('+(TEAR.dx*0.03).toFixed(2)+'deg)';
    return;
  }
  /* 後ろの画面を触らせない（レッスン表示中の透明な部分） */
  if(e.cancelable&&e.target&&e.target.closest&&e.target.closest('[data-lesson-scrim]'))e.preventDefault();
},{passive:false});
function tearRelease(){
  var band=TEAR.el;if(!band)return;
  TEAR.el=null;
  var stub=band.parentNode;stub.classList.remove('tearing');
  if(TEAR.dx>=110)tearOff(band);
  else stub.style.transform='';
}
document.addEventListener('touchend',function(){tearRelease();},{passive:true});
document.addEventListener('touchcancel',function(){
  if(TEAR.el){var stub=TEAR.el.parentNode;stub.classList.remove('tearing');stub.style.transform='';TEAR.el=null;}
},{passive:true});
document.addEventListener('keydown',function(e){
  var band=e.target&&e.target.closest&&e.target.closest('.tear-line');
  if(band&&(e.key==='Enter'||e.key===' ')){e.preventDefault();tearOff(band);}
});
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest?e.target:null;if(!t)return;
  /* 支援技術のダブルタップなど（detail=0）だけ、クリックで破る */
  var band=t.closest('.tear-line');
  if(band&&e.detail===0){tearOff(band);return;}
  /* 上の、重なっていない部分を押すと、前の画面に戻る */
  if(t.closest('[data-lesson-scrim]'))closeSheet();
});
/* ---- 記録タブ：飛び級できるレッスン ---- */
function skipListHTML(){
  var L=save.lang,ids=Object.keys(UNITS[L]||{}).filter(function(uid){return skipEligible(L,uid);}).slice(0,8);
  if(!ids.length)return '';
  return '<section class="card mode skip-list" aria-label="飛び級"><span class="lbl">SKIP ・ 飛び級</span><h2 class="jh">飛び級できるレッスン</h2>'+
    '<p class="dim">知っているレッスンは、飛び級テストに挑戦して飛ばせます。</p>'+
    ids.map(function(uid){return '<div class="skip-row" style="margin-top:8px"><span style="display:block;font-weight:700;margin-bottom:4px">'+esc(unitTitle(uid))+'</span>'+skipBtnHTML(L,uid)+'</div>';}).join('')+
    '</section>';
}
