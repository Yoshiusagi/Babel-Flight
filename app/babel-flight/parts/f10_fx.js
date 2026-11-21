/* ================= FX: sky, cinematics, confetti, ambient sound ================= */
function skyPhase(){var h=new Date().getHours();return h<5?'night':h<8?'dawn':h<16?'day':h<19?'dusk':'night';}
function initSky(){
  var s=$('sky');if(!s)return;
  var h='<div class="skystars"></div>';
  var C=[[8,140,72,.85],[22,220,96,.7],[38,110,130,.6],[54,180,84,.8],[70,260,150,.55],[84,150,110,.7],[92,200,170,.5]];
  C.forEach(function(c,i){h+='<span class="cloud" style="top:'+c[0]+'%;--w:'+c[1]+'px;--d:'+c[2]+'s;--o:'+c[3]+';animation-delay:-'+Math.round(c[2]*((i*37)%100)/100)+'s"></span>';});
  s.innerHTML=h;s.className=skyClass();
  setInterval(function(){s.className=skyClass();},300000);
}
var cineTimer=0,cineDone=null;
function cineEnd(){
  clearTimeout(cineTimer);var c=$('cine');if(c){c.hidden=true;c.innerHTML='';c.className='cine';}
  ambBoost(false);
  var d=cineDone;cineDone=null;if(d)d();
}
function cineSkip(){if(cineDone)cineEnd();}
function letters(s){return s.split('').map(function(ch,i){return '<span style="--d:'+i+'">'+(ch===' '?'&nbsp;':esc(ch))+'</span>';}).join('');}
function cineTakeoff(info,done){
  if(reduceMotion){done();return;}
  var c=$('cine');cineDone=done;
  c.innerHTML='<div class="cine-sky '+skyPhase()+'"></div><div class="cine-runway"><i></i><b></b><b class="r"></b></div>'+
    '<div class="cine-clouds"><span></span><span></span><span></span><span></span><span></span></div>'+
    '<svg class="cine-plane" viewBox="-20 -14 36 28" aria-hidden="true"><path d="'+PLANE_D+'"/></svg>'+
    '<div class="cine-txt"><span class="c-no mono">'+esc(info.no)+' ・ NOW DEPARTING</span><h1 class="c-city">'+letters(info.city)+'</h1><span class="c-sub">'+esc(info.cityJp)+'行き ・ '+esc(info.title)+'</span></div>'+
    '<div class="cine-flash"></div>';
  c.className='cine takeoff';c.hidden=false;void c.offsetWidth;c.classList.add('play');
  engineSound();ambBoost(true);
  cineTimer=setTimeout(cineEnd,1150);
}
function cineLanding(info,done){
  if(reduceMotion){done();return;}
  var c=$('cine');cineDone=done;
  c.innerHTML='<div class="cine-sky '+skyPhase()+' land"></div><div class="cine-bank l"></div><div class="cine-bank r"></div>'+
    '<div class="cine-txt land"><span class="c-no mono">'+esc(info.no||'ARRIVED')+'</span><h1 class="c-city">'+letters(info.city)+'</h1><span class="c-sub">'+esc(info.cityJp)+'</span>'+(info.coord?'<span class="c-coord mono">'+esc(info.coord)+'</span>':'')+'<span class="c-grade mono">'+esc(info.grade)+'</span></div>'+
    '';
  c.className='cine landing';c.hidden=false;void c.offsetWidth;c.classList.add('play');
  tone(392,0.9,'sine',0.04,0,-120);
  cineTimer=setTimeout(cineEnd,1300);
}
function fxGood(){
  var bd=$('bd');if(bd){bd.classList.remove('glow');void bd.offsetWidth;bd.classList.add('glow');}
  if(reduceMotion)return;
  var el=document.querySelector('.opt.ok')||$('chk')||$('scPanel');if(!el||!el.animate)return;
  var r=el.getBoundingClientRect(),cx=r.left+r.width*0.85,cy=r.top+r.height/2;
  for(var i=0;i<12;i++){
    var s=document.createElement('i');s.className='spark';s.style.left=cx+'px';s.style.top=cy+'px';document.body.appendChild(s);
    var a=Math.random()*6.283,d=30+Math.random()*40;
    var an=s.animate([{transform:'translate(-50%,-50%) scale(1)',opacity:1},{transform:'translate(calc(-50% + '+(Math.cos(a)*d)+'px),calc(-50% + '+(Math.sin(a)*d)+'px)) scale(.2)',opacity:0}],{duration:600+Math.random()*250,easing:'cubic-bezier(.2,.7,.3,1)'});
    an.onfinish=(function(n){return function(){n.remove();};})(s);
  }
}
function fxBad(){var bd=$('bd');if(bd&&!reduceMotion){bd.classList.remove('shake');void bd.offsetWidth;bd.classList.add('shake');}}
function confetti(){
  if(reduceMotion)return;
  var cv=$('fx');if(!cv)return;
  var W=window.innerWidth,H=window.innerHeight,dpr=Math.min(2,window.devicePixelRatio||1);
  cv.width=W*dpr;cv.height=H*dpr;cv.hidden=false;
  var g=cv.getContext('2d'),cols=['#ffcf26',cssVar('--lc')||'#2d6bff','#ffffff','#45d68c','#ff8a5c'],P=[],t0=performance.now();
  for(var i=0;i<130;i++)P.push({x:W/2+(Math.random()-.5)*W*0.3,y:H*0.35,vx:(Math.random()-.5)*9,vy:-Math.random()*11-4,r:Math.random()*6.28,vr:(Math.random()-.5)*0.3,s:4+Math.random()*5,c:cols[i%cols.length],pl:i%4===0});
  (function step(now){
    var t=(now-t0)/1000;g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
    P.forEach(function(p){p.vy+=0.32;p.vx*=0.99;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;
      g.save();g.translate(p.x,p.y);g.rotate(p.r);g.globalAlpha=Math.max(0,1-Math.max(0,t-1.8));g.fillStyle=p.c;
      if(p.pl){g.beginPath();g.moveTo(p.s*1.4,0);g.lineTo(-p.s,-p.s*0.8);g.lineTo(-p.s*0.4,0);g.lineTo(-p.s,p.s*0.8);g.closePath();g.fill();}
      else g.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);
      g.restore();});
    if(t<2.8)requestAnimationFrame(step);else{g.clearRect(0,0,W,H);cv.hidden=true;}
  })(t0);
}
/* ---- sounds ---- */
var amb={src:null,gain:null,on:false};
function ambStart(){
  if(!save.amb||amb.on)return;var a=audio();if(!a)return;
  try{
    var n=a.sampleRate*4,b=a.createBuffer(1,n,a.sampleRate),c=b.getChannelData(0),last=0;
    for(var i=0;i<n;i++){var w=Math.random()*2-1;last=(last+0.02*w)/1.02;c[i]=last*3.2;}
    var s=a.createBufferSource();s.buffer=b;s.loop=true;
    var f=a.createBiquadFilter();f.type='lowpass';f.frequency.value=520;
    var g=a.createGain();g.gain.value=0.0001;
    s.connect(f);f.connect(g);g.connect(a.destination);s.start();
    g.gain.exponentialRampToValueAtTime(0.09,a.currentTime+2);
    amb={src:s,gain:g,on:true};
  }catch(e){}
}
function ambStop(){
  if(!amb.on)return;var a=audio();
  try{amb.gain.gain.exponentialRampToValueAtTime(0.0001,a.currentTime+0.8);var s=amb.src;setTimeout(function(){try{s.stop();}catch(e){}},900);}catch(e){}
  amb={src:null,gain:null,on:false};
}
function ambBoost(on){if(!amb.on)return;var a=audio();try{amb.gain.gain.cancelScheduledValues(a.currentTime);amb.gain.gain.setTargetAtTime(on?0.2:0.09,a.currentTime,0.6);}catch(e){}}
function engineSound(){
  if(!save.sound)return;var a=audio();if(!a)return;
  try{
    var n=Math.floor(a.sampleRate*1.3),b=a.createBuffer(1,n,a.sampleRate),c=b.getChannelData(0),last=0;
    for(var i=0;i<n;i++){var w=Math.random()*2-1;last=(last+0.05*w)/1.05;c[i]=last*4;}
    var s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain(),t=a.currentTime;
    s.buffer=b;f.type='lowpass';f.frequency.setValueAtTime(180,t);f.frequency.exponentialRampToValueAtTime(1400,t+1.0);
    g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(0.12,t+0.5);g.gain.exponentialRampToValueAtTime(0.0001,t+1.3);
    s.connect(f);f.connect(g);g.connect(a.destination);s.start();
  }catch(e){}
}
function tapTick(){
  if(!save.tap)return;var a=audio();if(!a)return;
  try{
    var t=a.currentTime,o=a.createOscillator(),g=a.createGain();
    o.type='sine';o.frequency.setValueAtTime(900,t);o.frequency.exponentialRampToValueAtTime(420,t+0.05);
    g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(0.045,t+0.004);g.gain.exponentialRampToValueAtTime(0.0001,t+0.07);
    o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+0.08);
  }catch(e){}
}
function ringTone(){for(var k=0;k<2;k++){tone(784,0.28,'sine',0.05,k*0.85);tone(988,0.3,'sine',0.045,k*0.85+0.16);}}

/* 正解の紙飛行機 (見えるディテール 3/3): 画面を弧を描いて横切る。動きを減らす設定では出さない */
function fxPaperPlane(){
  if(reduceMotion||!document.body.animate)return;
  var el=document.createElement('div');
  el.setAttribute('aria-hidden','true');
  el.style.cssText='position:fixed;left:0;top:0;z-index:60;pointer-events:none;color:'+(hidOn('dawn')?'#f5c542':'var(--signal)')+';opacity:0';
  el.innerHTML='<svg viewBox="0 0 24 24" width="28" height="28"><path d="M2 11L22 3L15 21L11 14Z" fill="currentColor"/><path d="M11 14L22 3" stroke="#fff" stroke-opacity=".6" stroke-width=".8" fill="none"/></svg>';
  document.body.appendChild(el);
  var W=innerWidth,H=innerHeight;
  var a=el.animate([
    {transform:'translate(-40px,'+(H*0.62)+'px) rotate(-18deg)',opacity:0},
    {transform:'translate('+(W*0.3)+'px,'+(H*0.36)+'px) rotate(-8deg)',opacity:1,offset:0.35},
    {transform:'translate('+(W*0.62)+'px,'+(H*0.26)+'px) rotate(6deg)',opacity:1,offset:0.7},
    {transform:'translate('+(W+40)+'px,'+(H*0.1)+'px) rotate(12deg)',opacity:0}
  ],{duration:1400,easing:'ease-in-out',fill:'forwards'});
  a.onfinish=function(){el.remove();};
  setTimeout(function(){el.remove();},2000);
}

/* ===== 隠しディテール (見た目だけ・学習には影響しない) =====
   stars: 連続7日で夜空の星 / plate: 連続30日で機体の名前 / cockpit: 全場面を1回ずつクリアで計器の報告 / dawn: 早朝5時台のレッスンで金の紙飛行機 */
function hidOn(k){return !!(save.hid&&save.hid[k]);}
function hidGrant(k){if(!save.hid)save.hid={};if(!save.hid[k])save.hid[k]=dayStr();}
function hidCheck(){
  if(save.streak>=7)hidGrant('stars');
  if(save.streak>=30)hidGrant('plate');
  var all=true,any=false;
  ORDER.forEach(function(L){(ALL_IDS[L]||[]).forEach(function(uid){if(isScene(L,uid)){any=true;if(unitRec(L,uid).n<1)all=false;}});});
  if(any&&all)hidGrant('cockpit');
}
function skyClass(){return 'sky '+skyPhase()+(hidOn('stars')?' hid-stars':'');}
