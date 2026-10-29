/* ================= ANONYMOUS USAGE COUNT (standalone site only) =================
   Feeds the owner's /stats page. Sends only a random per-browser id plus the language / mode
   in use; no names, answers or progress. Runs only on the Higgsfield site (never inside Claude). */
var TRK=(function(){
  var on=false,vid='',KEY='babelflight.vid',VKEY='babelflight.visit',GAP=30*60*1000;
  try{on=bfOnSite()&&typeof fetch==='function';if(BF_APP)on=true;}catch(e){}
  function uuid(){
    if(window.crypto&&crypto.randomUUID)return crypto.randomUUID();
    var b=new Uint8Array(16);crypto.getRandomValues(b);b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;
    var x=Array.prototype.map.call(b,function(n){return (n+256).toString(16).slice(1);}).join('');
    return x.slice(0,8)+'-'+x.slice(8,12)+'-'+x.slice(12,16)+'-'+x.slice(16,20)+'-'+x.slice(20);
  }
  if(on){
    try{vid=localStorage.getItem(KEY)||'';}catch(e){vid='';}
    if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(vid)){
      try{vid=uuid();}catch(e){on=false;}
      try{if(on)localStorage.setItem(KEY,vid);}catch(e){}
    }
  }
  function send(o){
    if(!on)return;
    o.vid=vid;o.mode=save.mode==='job'||save.mode==='study'||(save.mode==='exam'&&typeof examModeOn==='function'&&examModeOn())?save.mode:'daily';if(!LANGS[o.lang])o.lang=save.lang;
    try{bfFetch('/api/hit',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(o),keepalive:true}).catch(function(){});}catch(e){}
  }
  /* a "visit" = first activity after 30 min of nothing in this tab */
  function fresh(){
    var now=Date.now(),last=0;
    try{last=+sessionStorage.getItem(VKEY)||0;sessionStorage.setItem(VKEY,String(now));}catch(e){}
    return now-last>GAP;
  }
  return {
    visit:function(){if(fresh())send({kind:'visit',lang:save.lang});},
    lesson:function(lang,track){
      if(fresh())send({kind:'visit',lang:save.lang});
      send({kind:'lesson',lang:lang,track:String(track||'').toLowerCase().replace(/[^a-z0-9-]/g,'').slice(0,24)});
    }
  };
})();
(function(){
  var sf=startFlight,ss=startScene;
  startFlight=function(opts){
    try{var u=opts&&opts.mode==='unit'&&UNITS[opts.lang]?UNITS[opts.lang][opts.uid]:null;TRK.lesson(opts.lang,u?u.track:opts.mode);}catch(e){}
    return sf.apply(this,arguments);
  };
  startScene=function(){
    var before=SCX,r=ss.apply(this,arguments);
    try{if(SCX&&SCX!==before)TRK.lesson(SCX.lang,'scene-'+SCX.mode);}catch(e){}
    return r;
  };
})();
setTimeout(function(){TRK.visit();},800);
