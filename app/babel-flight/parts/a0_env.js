/* ================= WHERE THE PAGE RUNS =================
   The same page runs on the website (babel-flight.higgsfield.app), inside Claude, and inside the
   iPhone app (Capacitor). In the app the page is loaded from the app bundle, so the server lives at
   another address: API calls go to BF_API and sign in with a bearer token instead of a cookie. */
var BF_SITE='https://babel-flight.higgsfield.app';
var BF_APP=false;
try{BF_APP=!!(window.Capacitor&&typeof window.Capacitor.isNativePlatform==='function'&&window.Capacitor.isNativePlatform());}catch(e){}
var BF_API=BF_APP?BF_SITE:'';
var BF_TOK_KEY='babelflight.tok';
function bfToken(){try{return localStorage.getItem(BF_TOK_KEY)||'';}catch(e){return '';}}
function bfSetToken(t){try{if(t)localStorage.setItem(BF_TOK_KEY,t);else localStorage.removeItem(BF_TOK_KEY);}catch(e){}}
/* fetch for this app's own server: same-origin cookie on the website, bearer token in the app */
function bfFetch(path,o){
  o=o||{};
  if(BF_APP){
    o.credentials='omit';
    var h={},src=o.headers||{};Object.keys(src).forEach(function(k){h[k]=src[k];});
    var tok=bfToken();if(tok)h.authorization='Bearer '+tok;
    o.headers=h;
  }else if(!o.credentials)o.credentials='same-origin';
  return fetch(BF_API+path,o);
}
/* a page on this app's website (privacy policy, support) */
function bfSiteUrl(path){return (BF_APP?BF_SITE:'')+path;}
if(BF_APP){try{document.documentElement.classList.add('app');}catch(e){}}
