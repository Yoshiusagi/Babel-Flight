/* ================= INSTALLABLE APP (PWA, standalone site only) =================
   Registers the service worker (so the app opens offline) and offers "add to home screen":
   Chrome/Edge/Android get the install prompt, iPhone/iPad get step-by-step instructions. */
var PWA={on:false,prompt:null};
try{PWA.on=bfOnSite()&&('serviceWorker' in navigator);}catch(e){}
function pwaStandalone(){try{return window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;}catch(e){return false;}}
function pwaIOS(){var ua=navigator.userAgent||'';return /iPhone|iPad|iPod/.test(ua)||(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1);}
if(PWA.on){
  var pwaReg=function(){try{navigator.serviceWorker.register('/sw.js').catch(function(){});}catch(e){}};
  if(document.readyState==='complete')pwaReg();else window.addEventListener('load',pwaReg);
  window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();PWA.prompt=e;if(view==='record')render();});
  window.addEventListener('appinstalled',function(){PWA.prompt=null;if(view==='record')render();});
}
function pwaCardHTML(){
  if(!PWA.on||pwaStandalone())return '';
  return '<section class="card pwa"><div class="card-h"><h2>App</h2><span class="lbl">無料</span></div>'+
    '<p class="dim acct-lead">ホーム画面に追加すると、アプリみたいに全画面で開けて、電波がないところでも練習できるよ。</p>'+
    (PWA.prompt?'<button class="go acct-go" type="button" data-pwa-install>ホーム画面に追加</button>'
               :'<button class="ghost pwa-how" type="button" data-pwa-how>追加のしかたを見る</button>')+'</section>';
}
function pwaHowSheet(){
  var ios=pwaIOS();
  $('sheetHost').innerHTML='<div class="sheet" role="dialog" aria-label="ホーム画面に追加"><div class="sheet-in"><h3>ホーム画面に追加</h3><ol class="pwa-steps">'+
    (ios?'<li><b>Safari</b>でこのページを開く(ほかのアプリの中で開いているときは「Safariで開く」)</li>'+
         '<li><b>共有ボタン</b>(□に↑のマーク)を押す。見つからないときは「…」メニューの中にあるよ</li>'+
         '<li><b>「ホーム画面に追加」</b>→<b>「追加」</b></li>'
        :'<li><b>Chrome</b>か<b>Edge</b>でこのページを開く</li>'+
         '<li>右上のメニュー(⋮)を開く</li>'+
         '<li><b>「ホーム画面に追加」</b>か<b>「アプリをインストール」</b>を選ぶ</li>')+
    '</ol><p class="dim pwa-note">'+(ios?'iPhoneでは、ホーム画面から開いたアプリとSafariで記録が別々に保存されるよ。アカウントにログインしておけば、どちらでも同じ記録を使えます。'
                                     :'ホーム画面から開いても、この端末の記録はそのまま使えます。')+'</p>'+
    '<button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';
}
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  if(t.hasAttribute('data-pwa-how')){pwaHowSheet();return;}
  if(t.hasAttribute('data-pwa-install')&&PWA.prompt){
    var p=PWA.prompt;PWA.prompt=null;
    try{p.prompt();p.userChoice.then(function(){if(view==='record')render();},function(){});}catch(x){}
  }
});
