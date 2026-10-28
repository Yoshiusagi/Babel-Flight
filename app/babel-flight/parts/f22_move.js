/* ================= MOVING TO A NEW ADDRESS =================
   At the move, BF_MOVED_TO (a0_env.js) is set to the new address. The old Higgsfield address then
   shows only a note with a button to the new one. The button carries this browser's progress in the
   link's #fragment (the part after # is never sent to any server), and the new address offers to add
   it to the progress there with unionSave, so nothing from either side is lost. Accounts' progress
   is copied server to server (lib/move.server.ts): signing in again on the new address brings it back. */
var MOVE_TAG='#bfmove=',MOVE_INC=null;
function moveB64(bytes){var s='';for(var i=0;i<bytes.length;i+=8192)s+=String.fromCharCode.apply(null,bytes.subarray(i,i+8192));return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
function moveUnB64(t){t=t.replace(/-/g,'+').replace(/_/g,'/');while(t.length%4)t+='=';var s=atob(t),b=new Uint8Array(s.length);for(var i=0;i<s.length;i++)b[i]=s.charCodeAt(i);return b;}
function movePack(obj){
  var raw=new TextEncoder().encode(JSON.stringify(obj));
  if(typeof CompressionStream!=='function')return Promise.resolve('p'+moveB64(raw));
  return new Response(new Blob([raw]).stream().pipeThrough(new CompressionStream('deflate-raw'))).arrayBuffer().then(function(b){return 'z'+moveB64(new Uint8Array(b));});
}
function moveUnpack(t){
  return Promise.resolve().then(function(){
    var bytes=moveUnB64(t.slice(1));
    return t.charAt(0)==='z'?new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer().then(function(b){return new Uint8Array(b);}):bytes;
  }).then(function(b){return JSON.parse(new TextDecoder().decode(b));});
}
function moveHasProgress(s){return !!(s&&(s.flights>0||s.miles>0));}
function moveOldSite(){try{return !!BF_MOVED_TO&&!BF_APP&&/(^|\.)higgsfield\.app$/.test(location.hostname)&&location.origin!==BF_MOVED_TO.replace(/\/+$/,'');}catch(e){return false;}}

/* ---- the old address: a note instead of the app ---- */
function moveNoteShow(){
  var to=BF_MOVED_TO.replace(/\/+$/,''),host='';
  try{host=new URL(to).host;}catch(e){return;}
  var carry=moveHasProgress(save);
  var el=document.createElement('div');
  el.className='move-note';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-labelledby','moveH');
  el.innerHTML='<div class="move-in"><span class="lbl">NEW ADDRESS</span><h2 id="moveH">Babel Flight は引っ越しました</h2>'+
    '<p class="move-host"><span class="dim">新しいアドレス</span><b>'+esc(host)+'</b></p>'+
    '<a class="go" id="moveGo" href="'+esc(to)+'/">新しいサイトへ</a>'+
    '<ul class="move-list">'+
      (carry?'<li>この端末の記録(マイル・レッスン)も、ボタンから一緒に持っていけます。</li>':'')+
      '<li>ログインしていた人は、新しいサイトでもう一度ログインすると記録が戻ります。</li>'+
      '<li>ホーム画面に追加していた人は、新しいサイトを追加し直してね。</li>'+
    '</ul></div>';
  document.body.appendChild(el);
  if(carry)movePack(save).then(function(t){if(t.length<150000){var a=$('moveGo');if(a)a.href=to+'/'+MOVE_TAG+t;}}).catch(function(){});
}

/* ---- the new address: offer to add the progress carried in the link ---- */
function moveIncoming(){
  var h='';try{h=location.hash||'';}catch(e){}
  if(h.indexOf(MOVE_TAG)!==0)return;
  var t=h.slice(MOVE_TAG.length);
  try{history.replaceState(history.state,'',location.pathname+location.search);}catch(e){}
  if(!/^[pz][A-Za-z0-9_-]+$/.test(t)||t.length>200000||moveOldSite())return;
  moveUnpack(t).then(function(raw){
    if(!raw||typeof raw!=='object'||Array.isArray(raw))return;
    var inc=mergeSave(raw);inc.t=+raw.t||0;
    if(!moveHasProgress(inc))return;
    MOVE_INC=inc;
    $('sheetHost').innerHTML='<div class="sheet plain move-sheet" role="dialog" aria-label="前のサイトの記録"><div class="sheet-in">'+
      '<span class="lbl">MOVED</span><h3>前のサイトの記録を引き継ぐ?</h3>'+
      '<p class="move-sum">マイル <b>'+fmt(inc.miles||0)+'</b> ・ レッスン <b>'+fmt(inc.flights||0)+'</b>回</p>'+
      '<p class="dim hint">この端末の記録と合わせます。どちらの記録も消えません。</p>'+
      '<button class="go" type="button" data-move-take>引き継ぐ</button>'+
      '<button class="ghost" type="button" data-close-sheet>引き継がない</button></div></div>';
  }).catch(function(){});
}
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('[data-move-take]');if(!t||!MOVE_INC)return;
  save=unionSave(save,MOVE_INC);MOVE_INC=null;
  store();applyTheme();if(typeof applyAccent==='function')applyAccent();
  closeSheet();
  if(save.onboarded&&view==='onboard')view='home';
  render();
});
setTimeout(function(){if(moveOldSite())moveNoteShow();else moveIncoming();},0);
