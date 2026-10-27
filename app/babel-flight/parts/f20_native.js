/* ================= THE IPHONE APP (Capacitor) =================
   Everything here only does something inside the app (BF_APP), except vibration, which also works
   in Android browsers. Native features go through Capacitor's plugins (window.Capacitor.Plugins):
   - daily reminder (local notification at a time the user picks; at most 1 a day, none once the
     day's goal is done) - vibration on right / wrong / taps - swipe from the left edge to go back
   - links open in an in-app browser - share images with the system share sheet
   - "airplane mode" note when offline - the save is mirrored to native storage
   - asks before anything is first sent to the AI (App Store rule 5.1.2(i))
   - the class / paid-plan test screens are off (the App Store version is free for now) */
function nat(name){try{var p=window.Capacitor&&window.Capacitor.Plugins;return (p&&p[name])||null;}catch(e){return null;}}
function natCall(name,method,arg){
  var p=nat(name);if(!p||typeof p[method]!=='function')return Promise.reject(new Error('unavailable'));
  try{return Promise.resolve(p[method](arg));}catch(e){return Promise.reject(e);}
}

/* ---- settings that belong to this device (not synced) ---- */
var DEV_KEY='babelflight.device';
function devSet(){
  var d={vib:true,rem:false,remT:'19:00'};
  try{var v=JSON.parse(localStorage.getItem(DEV_KEY)||'null');if(v&&typeof v==='object'){
    if(typeof v.vib==='boolean')d.vib=v.vib;if(typeof v.rem==='boolean')d.rem=v.rem;
    if(typeof v.remT==='string'&&/^([01]\d|2[0-3]):[0-5]\d$/.test(v.remT))d.remT=v.remT;}}catch(e){}
  return d;
}
function devPut(d){try{localStorage.setItem(DEV_KEY,JSON.stringify(d));}catch(e){}natMirrorSoon();}

/* ---- vibration ---- */
var VIB_WEB=false;
try{VIB_WEB=!BF_APP&&typeof navigator.vibrate==='function'&&/Android/i.test(navigator.userAgent||'');}catch(e){}
function vibOK(){return BF_APP?!!nat('Haptics'):VIB_WEB;}
function hapt(kind){
  if(!vibOK()||!devSet().vib)return;
  if(BF_APP){
    var p;
    if(kind==='ok')p=natCall('Haptics','notification',{type:'SUCCESS'});
    else if(kind==='ng')p=natCall('Haptics','notification',{type:'ERROR'});
    else if(kind==='big')p=natCall('Haptics','impact',{style:'HEAVY'});
    else p=natCall('Haptics','impact',{style:'LIGHT'});
    p.catch(function(){});
    return;
  }
  try{navigator.vibrate(kind==='ok'?18:kind==='ng'?[30,40,30]:kind==='big'?[20,40,70]:8);}catch(e){}
}
(function(){
  var g=fxGood,b=fxBad,c=confetti,t=tapTick;
  fxGood=function(){hapt('ok');return g.apply(this,arguments);};
  fxBad=function(){hapt('ng');return b.apply(this,arguments);};
  confetti=function(){hapt('big');return c.apply(this,arguments);};
  tapTick=function(){if(save.tap)hapt('tap');return t.apply(this,arguments);};
})();
/* the 振動 row in 学習の設定 (only where the device can vibrate) */
function vibRowHTML(){
  if(!vibOK())return '';
  var on=devSet().vib;
  return '<div class="set-row"><span>振動</span><button class="ghost" type="button" data-toggle-vib aria-pressed="'+on+'">'+(on?'ON':'OFF')+'</button></div>';
}

/* ---- AI: ask once before anything is sent (shown on the first AI use in the app) ---- */
var AI_OK_KEY='babelflight.aiok';
function aiConsented(){try{return localStorage.getItem(AI_OK_KEY)==='1';}catch(e){return false;}}
var AIC={wait:null};
function aiConsentAsk(){
  if(AIC.wait){if(document.querySelector('.aic-sheet'))return AIC.wait.p;aiConsentDone(false);}
  var w={};w.p=new Promise(function(res){w.res=res;});AIC.wait=w;
  $('sheetHost').innerHTML='<div class="sheet aic-sheet" role="alertdialog" aria-label="AIに送る内容"><div class="sheet-in">'+
    '<h3>AIに送る内容の確認</h3>'+
    '<p class="dim acct-lead">「AIに質問」「AI管制官」「AIの例文練習」では、答えを作るために次の内容を <b>Anthropic社のAI「Claude」</b> に送ります。</p>'+
    '<ul class="aic-list"><li>あなたが書いた質問・返事の文章</li><li>学習中のフレーズとその意味</li></ul>'+
    '<p class="dim acct-lead">名前・メールアドレス・ユーザーIDは送りません。送った文章はこのアプリのサーバーには保存しません。文章に住所や学校名などの個人情報は書かないでね。</p>'+
    '<a class="acct-pp" href="'+bfSiteUrl('/privacy')+'" target="_blank" rel="noopener">プライバシーポリシーを見る</a>'+
    '<button class="go" type="button" data-aic="yes">同意して使う</button>'+
    '<button class="ghost" type="button" data-aic="no">やめる</button></div></div>';
  return w.p;
}
function aiConsentDone(ok){
  var w=AIC.wait;AIC.wait=null;
  if(ok){try{localStorage.setItem(AI_OK_KEY,'1');}catch(e){}natMirrorSoon();}
  var s=document.querySelector('.aic-sheet');if(s)$('sheetHost').innerHTML='';
  if(w)w.res(!!ok);
}

/* ---- daily reminder (local notification; nothing goes through a server) ---- */
var REM_BASE=4100,REM_DAYS=14;
var REM_LINES=[
  function(){return 'Babel Flight便、まもなく搭乗開始です。今日のレッスンで'+LANGS[save.lang].name+'を一歩すすめよう。';},
  function(i){var s=streakNow();return i===0&&s>0&&save.lastDay!==dayStr()?'機長よりお知らせします。連続'+(s+1)+'日目のフライトの準備が整いました。':'機長よりお知らせします。本日のフライトの準備が整いました。';},
  function(){return '搭乗手続きのお時間です。3分のレッスンからどうぞ。';},
  function(i){var r=i===0?Math.max(1,save.goal-todayCount()):save.goal;return '本日の目標まで、あと'+r+'レッスン。ゲートでお待ちしています。';}
];
var REM={busy:false,again:false,timer:0,denied:false};
function remIds(){var a=[];for(var i=0;i<REM_DAYS;i++)a.push({id:REM_BASE+i});return a;}
function remSchedule(){
  if(!BF_APP||!nat('LocalNotifications'))return Promise.resolve();
  if(REM.busy){REM.again=true;return Promise.resolve();}
  REM.busy=true;
  var d=devSet();
  return natCall('LocalNotifications','cancel',{notifications:remIds()}).catch(function(){}).then(function(){
    if(!d.rem||!save.onboarded)return;
    var hm=d.remT.split(':'),now=new Date(),list=[];
    for(var i=0;i<REM_DAYS;i++){
      var at=new Date(now.getFullYear(),now.getMonth(),now.getDate()+i,+hm[0],+hm[1],0,0);
      if(at.getTime()<=now.getTime()+60000)continue;
      if(i===0&&todayCount()>=save.goal)continue;   /* today's goal is done: no reminder today */
      list.push({id:REM_BASE+i,title:'✈️ 搭乗のご案内',body:REM_LINES[(at.getDate()+i)%REM_LINES.length](i),
        schedule:{at:at,allowWhileIdle:true},extra:{kind:'daily'}});
    }
    if(list.length)return natCall('LocalNotifications','schedule',{notifications:list});
  }).catch(function(){}).then(function(){REM.busy=false;if(REM.again){REM.again=false;remSchedule();}});
}
function remSoon(){clearTimeout(REM.timer);REM.timer=setTimeout(remSchedule,1500);}
function remTurnOn(){
  natCall('LocalNotifications','requestPermissions').then(function(r){
    var ok=r&&r.display==='granted';REM.denied=!ok;
    var d=devSet();d.rem=ok;devPut(d);
    if(ok)remSchedule();
    if(view==='record')render();
  },function(){REM.denied=true;if(view==='record')render();});
}
function remCheckPermission(){
  natCall('LocalNotifications','checkPermissions').then(function(r){
    var ok=r&&r.display==='granted';
    if(!ok&&devSet().rem){var d=devSet();d.rem=false;devPut(d);REM.denied=r&&r.display==='denied';if(view==='record')render();}
  },function(){});
}

/* ---- the App card on 記録 (takes the place of the website's "add to home screen" card) ---- */
function appCardHTML(){
  var d=devSet(),canRem=!!nat('LocalNotifications');
  var h='<section class="card app-card"><div class="card-h"><h2>App</h2><span class="lbl">この端末の設定</span></div>';
  if(canRem){
    h+='<div class="set-row"><span>毎日のリマインド<br><small class="dim">1日1回まで。その日の目標を達成した日は届きません</small></span>'+
       '<button class="ghost" type="button" data-rem-toggle aria-pressed="'+d.rem+'">'+(d.rem?'ON':'OFF')+'</button></div>';
    if(d.rem)h+='<label class="set-row app-time"><span>届く時間</span><input id="remTime" type="time" step="300" value="'+d.remT+'"></label>';
    if(REM.denied)h+='<p class="acct-msg" role="status">通知がオフになっています。iPhoneの「設定」→「Babel Flight」→「通知」から許可してね。</p>';
  }
  return h+'</section>';
}

/* ---- swipe from the left edge = back (like other iPhone apps) ---- */
var SWB={x:0,y:0,on:false,el:null};
function swbTarget(){
  var sh=document.querySelector('#sheetHost .sheet');
  if(sh)return sh.querySelector('[data-close-sheet],[data-abort-no],[data-aic="no"]');
  var sel=['[data-abort]','[data-sc-end]','[data-atc-back]','[data-role-back]','[data-ai-drill-close]','[data-picker-close]','[data-ob-back]'];
  for(var i=0;i<sel.length;i++){
    var b=document.querySelector('#main '+sel[i]);
    if(b&&!b.disabled&&b.offsetParent!==null)return b;
  }
  return null;
}
function swbArrow(){
  if(SWB.el)return SWB.el;
  var e=document.createElement('div');e.className='swb';e.setAttribute('aria-hidden','true');
  e.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
  document.body.appendChild(e);SWB.el=e;return e;
}
function swbEnd(){SWB.on=false;if(SWB.el){SWB.el.classList.remove('show','go');SWB.el.style.transform='';}}

/* ---- keep a copy of the save in native storage (iOS may clear web storage when space runs low) ---- */
var NAT_KEYS=[KEY,BF_TOK_KEY,'babelflight.acct','babelflight.vid',DEV_KEY,'babelflight.aiok','babelflight.shareName'];
var natMirrorT=0;
function natMirror(){
  if(!BF_APP||!nat('Preferences'))return;
  NAT_KEYS.forEach(function(k){
    var v=null;try{v=localStorage.getItem(k);}catch(e){}
    (v===null?natCall('Preferences','remove',{key:k}):natCall('Preferences','set',{key:k,value:v})).catch(function(){});
  });
}
function natMirrorSoon(){if(!BF_APP)return;clearTimeout(natMirrorT);natMirrorT=setTimeout(natMirror,800);}
function natRestore(){
  /* web storage came back empty but the native copy has progress: put it back and reload once */
  var has=false;try{has=!!localStorage.getItem(KEY);}catch(e){}
  if(has||!nat('Preferences'))return Promise.resolve(false);
  return natCall('Preferences','get',{key:KEY}).then(function(r){
    if(!r||!r.value)return false;
    return Promise.all(NAT_KEYS.map(function(k){return natCall('Preferences','get',{key:k}).then(function(x){
      if(x&&typeof x.value==='string'){try{localStorage.setItem(k,x.value);}catch(e){}}},function(){});})).then(function(){
      try{if(sessionStorage.getItem('bf.restored'))return false;sessionStorage.setItem('bf.restored','1');}catch(e){}
      location.reload();return true;
    });
  },function(){return false;});
}

/* ---- offline note ---- */
function offlineSync(){
  var off=false;try{off=navigator.onLine===false;}catch(e){}
  var el=$('offNote');
  if(off&&!el){
    el=document.createElement('div');el.id='offNote';el.className='off-note';el.setAttribute('role','status');
    el.innerHTML='<b>✈ 機内モードで飛行中</b><span>レッスンと復習はこのまま続けられます。AIと記録の同期は、電波が戻ったら動きます。</span>';
    document.body.appendChild(el);
  }else if(!off&&el)el.remove();
}

/* ---- status bar text colour follows the app's light / dark theme ---- */
function natStatusBar(){
  if(!nat('StatusBar'))return;
  var t=rootEl.getAttribute('data-theme'),dark=t?t==='dark':!!(window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches);
  natCall('StatusBar','setStyle',{style:dark?'DARK':'LIGHT'}).catch(function(){});
}

/* ---- share images through the system share sheet ---- */
function natShareImage(){
  var f=SHR&&SHR.file;if(!f)return;
  var rd=new FileReader();
  rd.onload=function(){
    var b64=String(rd.result||'').split(',')[1]||'';
    natCall('Filesystem','writeFile',{path:'babel-flight-share.png',data:b64,directory:'CACHE'}).then(function(w){
      return natCall('Share','share',{title:'Babel Flight',files:[w.uri]});
    }).catch(function(){});
  };
  rd.readAsDataURL(f);
}

if(BF_APP){
  /* paid-plan previews stay on the website's test account; the App Store version is the free app */
  cabinTester=function(){return false;};
  try{applyCabin();}catch(e){}
  pwaCardHTML=appCardHTML;
  if(nat('Share')&&nat('Filesystem'))shrCanFiles=function(){return true;};

  (function(){
    var a0=applyTheme;applyTheme=function(){var r=a0.apply(this,arguments);natStatusBar();return r;};
    var remKey='';
    var p0=persistLocal;persistLocal=function(){
      var r=p0.apply(this,arguments);natMirrorSoon();
      var k=[todayCount()>=save.goal,save.onboarded,save.lang,dayStr()].join('|');if(k!==remKey){remKey=k;remSoon();}
      return r;
    };
    var c0=closeSheet;closeSheet=function(){var r=c0.apply(this,arguments);if(AIC.wait)aiConsentDone(false);return r;};
    var t0=bfSetToken;bfSetToken=function(){var r=t0.apply(this,arguments);natMirrorSoon();return r;};
  })();
  try{matchMedia('(prefers-color-scheme: dark)').addEventListener('change',natStatusBar);}catch(e){}

  document.addEventListener('click',function(e){
    var t=e.target&&e.target.closest&&e.target.closest('a[href],[data-shr="img"]');if(!t)return;
    if(t.hasAttribute('data-shr')){e.preventDefault();e.stopPropagation();natShareImage();return;}
    var href=t.getAttribute('href')||'';
    if(/^https?:\/\//i.test(href)){
      e.preventDefault();
      natCall('Browser','open',{url:href,presentationStyle:'popover'}).catch(function(){try{window.open(href,'_blank');}catch(x){}});
    }
  },true);

  document.addEventListener('touchstart',function(e){
    var p=e.touches&&e.touches[0];if(!p||e.touches.length>1){SWB.on=false;return;}
    SWB.on=p.clientX<24;SWB.x=p.clientX;SWB.y=p.clientY;
  },{passive:true});
  document.addEventListener('touchmove',function(e){
    if(!SWB.on)return;var p=e.touches[0],dx=p.clientX-SWB.x,dy=Math.abs(p.clientY-SWB.y);
    if(dy>60&&dy>dx){swbEnd();return;}
    if(dx>12&&swbTarget()){var a=swbArrow();a.classList.add('show');a.classList.toggle('go',dx>90);a.style.transform='translate('+Math.min(dx,120)*0.5+'px,'+p.clientY+'px)';}
  },{passive:true});
  document.addEventListener('touchend',function(e){
    if(!SWB.on)return;var p=e.changedTouches&&e.changedTouches[0],dx=p?p.clientX-SWB.x:0,dy=p?Math.abs(p.clientY-SWB.y):0;
    swbEnd();
    if(dx>90&&dy<70){var b=swbTarget();if(b)b.click();}
  },{passive:true});
  document.addEventListener('touchcancel',swbEnd,{passive:true});

  window.addEventListener('online',offlineSync);window.addEventListener('offline',offlineSync);
  document.addEventListener('visibilitychange',function(){
    if(document.hidden){natMirror();return;}
    offlineSync();remCheckPermission();remSchedule();
  });
  var bootNat=function(){
    natRestore().then(function(reloading){
      if(reloading)return;
      offlineSync();natStatusBar();remCheckPermission();remSchedule();natMirrorSoon();
      natCall('SplashScreen','hide',{fadeOutDuration:250}).catch(function(){});
    });
  };
  setTimeout(bootNat,0);
}

document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  if(t.hasAttribute('data-aic')){aiConsentDone(t.getAttribute('data-aic')==='yes');return;}
  if(t.hasAttribute('data-toggle-vib')){var d=devSet();d.vib=!d.vib;devPut(d);if(d.vib)hapt('tap');render();return;}
  if(t.hasAttribute('data-rem-toggle')){
    var r=devSet();
    if(r.rem){r.rem=false;devPut(r);remSchedule();render();}
    else remTurnOn();
    return;
  }
});
document.addEventListener('change',function(e){
  if(e.target&&e.target.id==='remTime'){
    var v=e.target.value||'';if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(v))return;
    var d=devSet();d.remT=v;devPut(d);remSchedule();
  }
});
