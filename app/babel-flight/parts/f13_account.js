/* ================= ACCOUNTS (standalone site only) =================
   Optional sign-in with Google or email + password (Firebase Authentication) so progress syncs
   between devices. Firebase loads only when the sign-in sheet opens and keeps nothing itself
   (in-memory persistence); after sign-in the server keeps its own HttpOnly session.
   Sync: the whole save is one document with a revision number. Conflicts are merged so that
   progress from either device is never lost (see unionSave). */
var FB_VER='12.4.0';
var ACCT={on:false,cfg:null,me:null,rev:0,state:'',last:0,fbp:null,fb:null,dirty:false,force:false,pend:null,pulling:false,busy:false,sheet:'',msg:'',tries:0};
try{ACCT.on=location.protocol==='https:'&&/(^|\.)higgsfield\.(app|ai)$/.test(location.hostname)&&!window.claude&&typeof fetch==='function';}catch(e){}
var AKEY='babelflight.acct';
var G_LOGO='<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';
var FB_ERR={
  'auth/invalid-email':'メールアドレスの形が正しくないみたい。',
  'auth/missing-email':'メールアドレスを入れてね。',
  'auth/invalid-credential':'メールアドレスかパスワードが違います。',
  'auth/invalid-login-credentials':'メールアドレスかパスワードが違います。',
  'auth/wrong-password':'メールアドレスかパスワードが違います。',
  'auth/user-not-found':'メールアドレスかパスワードが違います。',
  'auth/email-already-in-use':'このメールアドレスはもう登録されています。「ログイン」から入ってね。',
  'auth/weak-password':'パスワードは8文字以上にしてね。',
  'auth/missing-password':'パスワードを入れてね。',
  'auth/too-many-requests':'試した回数が多すぎます。少し時間をあけてね。',
  'auth/popup-blocked':'ポップアップがブロックされました。もう一度ボタンを押してね。',
  'auth/network-request-failed':'通信できませんでした。電波を確認してね。',
  'auth/account-exists-with-different-credential':'このメールアドレスは別の方法で登録されています。',
  'auth/user-disabled':'このアカウントは使えなくなっています。',
  'auth/operation-not-allowed':'このログイン方法は今は使えません。',
  'auth/unauthorized-domain':'このアドレスはまだログインの許可が出ていません。',
  'auth/user-mismatch':'ログイン中のアカウントと違うアカウントです。'
};
function fbMsg(e){
  var c=(e&&e.code)||'';
  if(c==='auth/popup-closed-by-user'||c==='auth/cancelled-popup-request'||c==='auth/user-cancelled')return '';
  return FB_ERR[c]||('うまくいきませんでした。もう一度試してね。'+(c?'('+String(c).replace('auth/','')+')':''));
}
function acctServerMsg(err){
  if(err.e==='other_account')return 'ログイン中のアカウントと違うアカウントです。';
  if(err.e==='stale_sign_in'||err.e==='reauth')return 'もう一度ログインしてね。';
  if(err.s===502)return 'ログインの確認ができませんでした。少し待ってからもう一度試してね。';
  return 'うまくいきませんでした。もう一度試してね。';
}
function acctHint(){try{var v=JSON.parse(localStorage.getItem(AKEY)||'null');return v&&typeof v==='object'?v:{};}catch(e){return {};}}
function acctSetHint(v){try{localStorage.setItem(AKEY,JSON.stringify(v||{}));}catch(e){}}
function acctApi(method,path,body){
  var o={method:method,credentials:'same-origin',cache:'no-store'};
  if(body!==undefined){o.headers={'content-type':'application/json'};o.body=JSON.stringify(body);}
  return fetch(path,o).then(function(r){
    return r.json().catch(function(){return {};}).then(function(j){if(!j||typeof j!=='object')j={};j._s=r.status;return j;});
  });
}
function fbLoad(){
  if(ACCT.fbp)return ACCT.fbp;
  var base='https://www.gstatic.com/firebasejs/'+FB_VER+'/';
  ACCT.fbp=Promise.all([import(base+'firebase-app.js'),import(base+'firebase-auth.js')]).then(function(m){
    var A=m[0],F=m[1],c=ACCT.cfg;
    var app=A.initializeApp({apiKey:c.apiKey,authDomain:c.authDomain,projectId:c.projectId,appId:c.appId},'babel-flight');
    var auth=F.initializeAuth(app,{persistence:F.inMemoryPersistence,popupRedirectResolver:F.browserPopupRedirectResolver});
    auth.languageCode='ja';
    ACCT.fb={F:F,auth:auth};
    return ACCT.fb;
  });
  ACCT.fbp.catch(function(){ACCT.fbp=null;});
  return ACCT.fbp;
}

/* ---- merging two saves without losing progress from either side ---- */
function stableStr(v){
  if(v&&typeof v==='object'){
    if(Array.isArray(v))return '['+v.map(stableStr).join(',')+']';
    return '{'+Object.keys(v).sort().map(function(k){return JSON.stringify(k)+':'+stableStr(v[k]);}).join(',')+'}';
  }
  return JSON.stringify(v);
}
function sameSave(a,b){return stableStr(a)===stableStr(b);}
function unionSave(a,b){
  /* a reset (rz) on any device wins over everything recorded before it */
  if((a.rz||0)!==(b.rz||0))return (a.rz||0)>(b.rz||0)?a:b;
  var newer=(b.t||0)>(a.t||0)?b:a,older=newer===a?b:a;
  var out=mergeSave(JSON.parse(JSON.stringify(newer)));   /* settings, name, icon: from the newer copy */
  out.t=Math.max(a.t||0,b.t||0);
  out.onboarded=!!(a.onboarded||b.onboarded);
  out.miles=Math.max(a.miles||0,b.miles||0);
  out.flights=Math.max(a.flights||0,b.flights||0);
  out.bestStreak=Math.max(a.bestStreak||0,b.bestStreak||0);
  if((older.lastDay||'')>(out.lastDay||'')){out.lastDay=older.lastDay;out.streak=older.streak;}
  else if(older.lastDay===out.lastDay)out.streak=Math.max(a.streak||0,b.streak||0);
  var od=older.daily||{d:'',n:0};
  if((od.d||'')>(out.daily.d||''))out.daily={d:od.d,n:od.n||0};
  else if(od.d===out.daily.d)out.daily.n=Math.max(out.daily.n||0,od.n||0);
  var op=older.pos||{};if(!out.pos)out.pos={};
  Object.keys(op).forEach(function(k){if(typeof op[k]==='number'&&!(out.pos[k]>=op[k]))out.pos[k]=op[k];});
  ORDER.forEach(function(L){
    var src=older.prog[L],dst=out.prog[L];
    Object.keys(src.items).forEach(function(k){
      var x=src.items[k],y=dst.items[k];
      if(!y||(x.b||0)>(y.b||0)||((x.b||0)===(y.b||0)&&(x.d||0)>(y.d||0)))dst.items[k]=x;
    });
    Object.keys(src.units).forEach(function(k){
      var x=src.units[k],y=dst.units[k];
      if(!y){dst.units[k]=x;return;}
      dst.units[k]={n:Math.max(x.n||0,y.n||0),stars:Math.max(x.stars||0,y.stars||0),last:(x.last||'')>(y.last||'')?x.last:y.last};
    });
  });
  return out;
}
function acctParse(data,t){
  if(typeof data!=='string')return null;
  try{var r=mergeSave(JSON.parse(data));if(!r.t)r.t=+t||0;return r;}catch(e){return null;}
}
function acctUnsafe(){return view==='flight'||view==='atc'||view==='scene';}
/* adopt a remote copy now, or after the current lesson/call ends */
function acctMerge(remote,replace){
  if(acctUnsafe()){ACCT.pend={r:remote,replace:!!replace};return false;}
  var theme=save.theme;
  save=replace?remote:unionSave(save,remote);
  persistLocal();
  if(save.theme!==theme)applyTheme();
  acctFixView();
  render();
  return true;
}
/* after adopting another copy, make sure the screen matches it (e.g. a reset on another device) */
function acctFixView(){
  if(save.onboarded&&view==='onboard')view='home';
  else if(!save.onboarded&&view!=='onboard'){view='onboard';obStep=0;obDraft={lang:save.lang,prof:save.prof,level:save.level,goal:save.goal};}
}
(function(){
  var r0=render;
  render=function(){
    if(ACCT.pend&&!acctUnsafe()){
      var p=ACCT.pend;ACCT.pend=null;
      save=p.replace?p.r:unionSave(save,p.r);persistLocal();
      acctFixView();
      setTimeout(acctPushNow,0);
    }
    return r0.apply(this,arguments);
  };
})();

/* ---- sync ---- */
var ACCT_DOC={set:function(doc){return acctPush(doc.s,doc.t);}};
function acctOk(){ACCT.state='ok';ACCT.last=Date.now();acctRefresh();}
function acctPushNow(){if(cloud.doc!==ACCT_DOC||ACCT.pend)return;acctPush(JSON.stringify(save),save.t);}
function acctPush(data,t){
  if(!ACCT.me||ACCT.pend)return Promise.resolve();
  ACCT.dirty=true;ACCT.state='sync';acctRefresh();
  var force=ACCT.force;ACCT.force=false;
  return acctApi('PUT','/api/account/save',{data:data,t:t||0,baseRev:ACCT.rev,force:force}).then(function(j){
    if(j.ok){ACCT.rev=j.rev;ACCT.dirty=false;ACCT.tries=0;acctOk();return;}
    if(j._s===401){acctSignedOut();return;}
    if(j._s===409&&ACCT.tries<3){
      ACCT.tries++;
      ACCT.rev=j.rev||ACCT.rev;
      var remote=acctParse(j.data,j.t);
      if(remote&&acctMerge(remote,false))return acctPush(JSON.stringify(save),save.t);
      return;
    }
    ACCT.tries=0;ACCT.state='err';acctRefresh();
  },function(){ACCT.state='off';acctRefresh();});
}
function acctStartSync(otherAccount){
  ACCT.state='sync';acctRefresh();
  return acctApi('GET','/api/account/save').then(function(j){
    if(j._s===401){acctSignedOut();return;}
    if(!j.ok)throw {code:'server',s:j._s,e:j.error};
    ACCT.rev=j.rev||0;
    cloud.doc=ACCT_DOC;
    var remote=acctParse(j.data,j.t);
    if(remote){
      var fresh=!save.onboarded&&!save.t;
      acctMerge(remote,fresh||otherAccount);
      if(sameSave(save,remote))acctOk();else acctPushNow();
    }else if(save.onboarded||save.t>0)acctPushNow();
    else acctOk();
  },function(){ACCT.state='off';acctRefresh();});
}
function acctPull(){
  if(!ACCT.me||ACCT.pulling)return;
  ACCT.pulling=true;ACCT.state='sync';acctRefresh();
  acctApi('GET','/api/account/save').then(function(j){
    if(j._s===401){acctSignedOut();return;}
    if(!j.ok)throw 0;
    if((j.rev||0)>ACCT.rev){
      ACCT.rev=j.rev;
      var remote=acctParse(j.data,j.t);
      if(remote)acctMerge(remote,false);
      if(remote&&sameSave(save,remote)&&!ACCT.dirty)acctOk();else acctPushNow();
    }else if(ACCT.dirty)acctPushNow();
    else acctOk();
  }).catch(function(){ACCT.state='off';acctRefresh();}).then(function(){ACCT.pulling=false;});
}
document.addEventListener('visibilitychange',function(){if(!document.hidden)acctPull();});
window.addEventListener('online',acctPull);
/* a progress reset while signed in replaces the account copy too */
document.addEventListener('click',function(e){
  var b=e.target&&e.target.closest&&e.target.closest('[data-reset-yes]');
  if(b&&ACCT.me)setTimeout(function(){save.rz=Date.now();ACCT.force=true;persistLocal();acctPushNow();},0);
},true);

/* ---- sign in / out ---- */
function acctAfterFirebase(user){
  return user.getIdToken().then(function(tok){return acctApi('POST','/api/account/session',{idToken:tok});}).then(function(j){
    if(!j.ok)throw {code:'server',s:j._s,e:j.error};
    var prevUid=acctHint().uid||'';
    ACCT.me={uid:j.uid,provider:j.provider};ACCT.msg='';
    acctSetHint({uid:j.uid,email:user.email||'',provider:j.provider});
    return acctStartSync(!!prevUid&&prevUid!==j.uid);
  });
}
function acctDone(){closeSheet();if(view==='record'||view==='onboard')render();}
function acctSignedOut(msg){
  ACCT.me=null;ACCT.rev=0;ACCT.state='';ACCT.dirty=false;ACCT.pend=null;
  if(cloud.doc===ACCT_DOC)cloud.doc=null;
  ACCT.msg=msg||'';
  if(view==='record')render();
}
function acctLogout(){
  if(ACCT.busy)return;
  acctBusy(true);
  (ACCT.dirty?acctPush(JSON.stringify(save),save.t):Promise.resolve()).catch(function(){})
    .then(function(){return acctApi('POST','/api/account/logout',{});}).catch(function(){})
    .then(function(){
      try{if(ACCT.fb)ACCT.fb.F.signOut(ACCT.fb.auth);}catch(e){}
      acctBusy(false);acctSignedOut('ログアウトしました。この端末の記録はそのまま使えます。');
    });
}
function acctDeleteWith(user){
  return user.getIdToken(true).then(function(tok){return acctApi('POST','/api/account/delete',{idToken:tok});}).then(function(j){
    if(!j.ok)throw {code:'server',s:j._s,e:j.error};
    return ACCT.fb.F.deleteUser(user).catch(function(){});
  }).then(function(){
    acctSetHint({});closeSheet();
    acctSignedOut('アカウントを削除しました。この端末の記録はそのまま残っています。');
  });
}
function acctErr(msg){var e=$('acErr')||$('acNote');if(e)e.textContent=msg||'';}
function acctBusy(on){
  ACCT.busy=on;
  var s=document.querySelector('.acct-sheet');if(!s)return;
  s.classList.toggle('busy',on);
  Array.prototype.forEach.call(s.querySelectorAll('button,input'),function(b){if(!b.hasAttribute('data-close-sheet'))b.disabled=on||(!ACCT.fb&&b.hasAttribute('data-needs-fb'));});
}
function acctGoogle(del){
  var fb=ACCT.fb;if(!fb||ACCT.busy)return;
  var prov=new fb.F.GoogleAuthProvider();prov.setCustomParameters({prompt:'select_account'});
  acctErr('');
  var p=fb.F.signInWithPopup(fb.auth,prov);   /* must start inside the tap, before any await */
  acctBusy(true);
  p.then(function(c){return del?acctDeleteWith(c.user):acctAfterFirebase(c.user).then(acctDone);})
    .catch(function(err){acctErr(err&&err.code==='server'?acctServerMsg(err):fbMsg(err));})
    .then(function(){acctBusy(false);});
}
document.addEventListener('submit',function(e){
  var f=e.target;if(!f||f.id!=='acctForm')return;
  e.preventDefault();
  if(f.getAttribute('data-mode')==='name'){
    var nm=(($('acName')||{}).value||'').replace(/[\u0000-\u001f\u007f]/g,'').trim();
    if(Array.from(nm).length>14){acctErr('14文字までにしてね。');return;}
    save.name=nm||'PASSENGER';store();closeSheet();render();return;
  }
  var fb=ACCT.fb;if(!fb||ACCT.busy)return;
  var mode=f.getAttribute('data-mode'),F=fb.F;
  var em=(($('acEmail')||{}).value||'').trim(),pw=($('acPass')||{}).value||'',pw2=($('acPass2')||{}).value||'';
  if(!em){acctErr('メールアドレスを入れてね。');return;}
  if(mode==='signup'){
    if(pw.length<8){acctErr('パスワードは8文字以上にしてね。');return;}
    if(pw!==pw2){acctErr('確認用のパスワードが1回目と違います。');return;}
  }
  if((mode==='login'||mode==='delete')&&!pw){acctErr('パスワードを入れてね。');return;}
  acctErr('');acctBusy(true);
  var p;
  if(mode==='reset')p=F.sendPasswordResetEmail(fb.auth,em).then(function(){acctBusy(false);acctSheet('login','再設定のメールを送ったよ。届かないときは迷惑メールフォルダも見てね。');});
  else if(mode==='signup')p=F.createUserWithEmailAndPassword(fb.auth,em,pw).then(function(c){F.sendEmailVerification(c.user).catch(function(){});return acctAfterFirebase(c.user);}).then(acctDone);
  else if(mode==='login')p=F.signInWithEmailAndPassword(fb.auth,em,pw).then(function(c){return acctAfterFirebase(c.user);}).then(acctDone);
  else p=F.signInWithEmailAndPassword(fb.auth,em,pw).then(function(c){return acctDeleteWith(c.user);});
  p.catch(function(err){acctErr(err&&err.code==='server'?acctServerMsg(err):fbMsg(err));}).then(function(){acctBusy(false);});
});

/* ---- UI ---- */
function acctStatusText(){
  var s=ACCT.state;
  if(s==='sync')return '<i class="dot sync"></i>同期中…';
  if(s==='ok'){var d=new Date(ACCT.last);return '<i class="dot ok"></i>同期済み ・ '+d.getHours()+':'+pad2(d.getMinutes());}
  if(s==='off')return '<i class="dot off"></i>オフライン ・ つながったら同期します';
  if(s==='err')return '<i class="dot err"></i>同期できませんでした。「今すぐ同期」を押してね';
  return '<i class="dot"></i>準備中…';
}
function acctRefresh(){var el=$('acctStat');if(el)el.innerHTML=acctStatusText();}
function acctCardHTML(){
  if(!ACCT.on||!ACCT.cfg)return '';
  var h='<section class="card acct" id="acctCard"><div class="card-h"><h2>Account</h2><span class="lbl">';
  if(!ACCT.me){
    h+='任意</span></div><p class="dim acct-lead">ログインすると、スマホとパソコンで進み具合を同期できるよ。ログインしなくても今まで通り使えます。</p>'+
       (ACCT.msg?'<p class="acct-msg" role="status">'+esc(ACCT.msg)+'</p>':'')+
       '<button class="go acct-go" type="button" data-acct-open>ログイン / 新規登録</button>';
  }else{
    var hint=acctHint();
    h+=(ACCT.me.provider==='google.com'?'Google':'メール')+'でログイン中</span></div>'+
       '<div class="acct-me"><button class="acct-av" type="button" data-icon-open aria-label="アイコンを変える">'+avatarHTML()+'</button><div class="acct-id"><b>'+esc(save.name)+'</b><small>'+esc(hint.email||'')+'</small></div>'+
       '<button class="ghost acct-edit" type="button" data-acct-name>名前を変える</button></div>'+
       '<p class="acct-sync" id="acctStat" role="status">'+acctStatusText()+'</p>'+
       '<div class="row2"><button class="ghost" type="button" data-acct-sync>今すぐ同期</button><button class="ghost" type="button" data-acct-logout>ログアウト</button></div>'+
       '<button class="acct-del" type="button" data-acct-delete>アカウントを削除</button>';
  }
  return h+'<a class="acct-pp" href="/privacy" target="_blank" rel="noopener">プライバシーポリシー</a></section>';
}
function acctObHTML(){
  if(!ACCT.on||!ACCT.cfg||ACCT.me)return '';
  return '<button class="acct-ob" type="button" data-acct-open>アカウントを持っている？ <b>ログインして続きから →</b></button>';
}
function acctSheet(mode,note){
  ACCT.sheet=mode;ACCT.msg='';
  var nf=ACCT.fb?'':' disabled',hint=acctHint(),h;
  h='<div class="sheet acct-sheet'+(mode==='delete'?' bad':'')+'" role="dialog" aria-label="アカウント"><div class="sheet-in">';
  if(mode==='start'){
    h+='<h3>ログイン / 新規登録</h3><p class="dim acct-lead">スマホとパソコンで進み具合を同期できます。この端末の記録は、アカウントの記録と合わせて引き継がれます。</p>'+
       '<button class="acct-g" type="button" data-acct-google data-needs-fb'+nf+'>'+G_LOGO+'<span>Googleで続ける</span></button>'+
       '<button class="ghost" type="button" data-acct-email="login">メールアドレスで続ける</button>'+
       '<p class="acct-fine">続けると<a href="/privacy" target="_blank" rel="noopener">プライバシーポリシー</a>に同意したことになります。</p>';
  }else if(mode==='login'||mode==='signup'){
    var su=mode==='signup';
    h+='<h3>メールアドレスで'+(su?'新規登録':'ログイン')+'</h3>'+
       '<div class="seg two" role="group" aria-label="ログインか新規登録か"><button type="button" data-acct-email="login" aria-pressed="'+!su+'">ログイン</button><button type="button" data-acct-email="signup" aria-pressed="'+su+'">新規登録</button></div>'+
       '<form id="acctForm" class="acct-form" data-mode="'+mode+'" novalidate>'+
       '<label class="fld"><span>メールアドレス</span><input id="acEmail" type="email" autocomplete="email" inputmode="email" autocapitalize="off" spellcheck="false" value="'+esc(hint.email||'')+'"></label>'+
       '<label class="fld"><span>パスワード'+(su?'(8文字以上)':'')+'</span><input id="acPass" type="password" autocomplete="'+(su?'new-password':'current-password')+'"></label>'+
       (su?'<label class="fld"><span>パスワード(確認)</span><input id="acPass2" type="password" autocomplete="new-password"></label>':'')+
       '<p class="acct-err" id="acErr" role="alert"></p>'+
       '<button class="go" type="submit" data-needs-fb'+nf+'>'+(su?'登録する':'ログイン')+'</button></form>'+
       (su?'':'<button class="acct-link" type="button" data-acct-email="reset">パスワードを忘れた？</button>');
  }else if(mode==='reset'){
    h+='<h3>パスワードの再設定</h3><p class="dim acct-lead">登録したメールアドレスに、再設定のリンクを送ります。</p>'+
       '<form id="acctForm" class="acct-form" data-mode="reset" novalidate>'+
       '<label class="fld"><span>メールアドレス</span><input id="acEmail" type="email" autocomplete="email" inputmode="email" autocapitalize="off" spellcheck="false" value="'+esc(hint.email||'')+'"></label>'+
       '<p class="acct-err" id="acErr" role="alert"></p><button class="go" type="submit" data-needs-fb'+nf+'>リンクを送る</button></form>'+
       '<button class="acct-link" type="button" data-acct-email="login">ログインに戻る</button>';
  }else if(mode==='name'){
    var cur=save.name==='PASSENGER'?'':save.name;
    h+='<h3>名前を変える</h3><p class="dim acct-lead">記録画面のIDカードに出る名前です。ログインしているほかの端末にも同期されます。</p>'+
       '<form id="acctForm" class="acct-form" data-mode="name" novalidate>'+
       '<label class="fld"><span>名前(14文字まで)</span><input id="acName" maxlength="14" autocomplete="nickname" spellcheck="false" placeholder="PASSENGER" value="'+esc(cur)+'"></label>'+
       '<p class="acct-err" id="acErr" role="alert"></p><button class="go" type="submit">保存する</button></form>';
  }else{
    var g=ACCT.me&&ACCT.me.provider==='google.com';
    h+='<h3>アカウントを削除</h3><p class="dim acct-lead">サーバーにある学習記録とアカウントが消えて、元に戻せません。この端末に残っている記録はそのままです。確認のため、もう一度ログインしてね。</p>';
    if(g)h+='<button class="acct-g" type="button" data-acct-del-google data-needs-fb'+nf+'>'+G_LOGO+'<span>Googleで確認して削除</span></button><p class="acct-err" id="acErr" role="alert"></p>';
    else h+='<form id="acctForm" class="acct-form" data-mode="delete" novalidate>'+
       '<label class="fld"><span>メールアドレス</span><input id="acEmail" type="email" autocomplete="email" inputmode="email" autocapitalize="off" spellcheck="false" value="'+esc(hint.email||'')+'"></label>'+
       '<label class="fld"><span>パスワード</span><input id="acPass" type="password" autocomplete="current-password"></label>'+
       '<p class="acct-err" id="acErr" role="alert"></p><button class="go danger-go" type="submit" data-needs-fb'+nf+'>削除する</button></form>';
  }
  h+='<p class="acct-note" id="acNote" role="status">'+esc(note||(ACCT.fb||mode==='name'?'':'ログインの準備中…'))+'</p>'+
     '<button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';
  $('sheetHost').innerHTML=h;
  if(!ACCT.fb&&mode!=='name'){
    fbLoad().then(function(){
      var s=document.querySelector('.acct-sheet');if(!s||ACCT.busy)return;
      Array.prototype.forEach.call(s.querySelectorAll('[data-needs-fb]'),function(b){b.disabled=false;});
      var n=$('acNote');if(n&&n.textContent==='ログインの準備中…')n.textContent='';
    },function(){var n=$('acNote');if(n)n.textContent='ログインの準備ができませんでした。電波を確認して、開き直してね。';});
  }
  var first=document.querySelector('.acct-sheet input:not([value]),.acct-sheet input[value=""]')||document.querySelector('.acct-sheet input');
  if(first&&mode!=='start')setTimeout(function(){try{first.focus();}catch(x){}},80);
}
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  if(t.hasAttribute('data-acct-open')){acctSheet('start');return;}
  if(t.hasAttribute('data-acct-google')){acctGoogle(false);return;}
  if(t.hasAttribute('data-acct-del-google')){acctGoogle(true);return;}
  if(t.hasAttribute('data-acct-email')){if(!ACCT.busy)acctSheet(t.getAttribute('data-acct-email'));return;}
  if(t.hasAttribute('data-acct-logout')){acctLogout();return;}
  if(t.hasAttribute('data-acct-sync')){acctPull();return;}
  if(t.hasAttribute('data-acct-delete')){acctSheet('delete');return;}
  if(t.hasAttribute('data-acct-name')){acctSheet('name');return;}
});
document.addEventListener('input',function(e){
  if(e.target&&e.target.id==='pname'){var b=document.querySelector('.acct-id b');if(b)b.textContent=(e.target.value||'').slice(0,14)||'PASSENGER';}
});
function acctBoot(){
  if(!ACCT.on)return;
  acctApi('GET','/api/account/config').then(function(c){
    if(!c.enabled||!c.firebase)return;
    ACCT.cfg=c.firebase;
    return acctApi('GET','/api/account/me').then(function(m){
      if(m.ok){
        ACCT.me={uid:m.uid,provider:m.provider};
        var prev=acctHint().uid||'';
        if(prev!==m.uid){var hh=acctHint();hh.uid=m.uid;acctSetHint(hh);}
        acctStartSync(!!prev&&prev!==m.uid);
      }
      if(view==='record'||view==='onboard')render();
    });
  }).catch(function(){});
}
setTimeout(acctBoot,0);
