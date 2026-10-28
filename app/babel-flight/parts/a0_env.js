/* ================= WHERE THE PAGE RUNS =================
   The same page runs on the website (babel-flight.higgsfield.app), inside Claude, and inside the
   iPhone app (Capacitor). In the app the page is loaded from the app bundle, so the server lives at
   another address: API calls go to BF_API and sign in with a bearer token instead of a cookie. */
var BF_SITE='https://babel-flight.higgsfield.app';
/* the website's own addresses: accounts, usage counting, install and share links run only there.
   The Higgsfield address now; the owner's Cloudflare account (*.workers.dev, then the own domain) after the move. */
var BF_HOSTS=/(^|\.)higgsfield\.(app|ai)$|\.workers\.dev$/;
/* set at the move to the new address (e.g. 'https://babel-flight.app'): the old Higgsfield address then only
   shows a note with a link there (f22_move.js) */
var BF_MOVED_TO='';
function bfOnSite(){try{return location.protocol==='https:'&&BF_HOSTS.test(location.hostname)&&!window.claude;}catch(e){return false;}}
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
