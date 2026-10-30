/* ================= 筆記体なぞり (cursive tracing) =================
   復習 → 「筆記体なぞり」. 4 steps: 小文字 a〜z and 大文字 A〜Z (free), つなげ書き and 自分の名前
   (プレミアムエコノミーから; not shown in the iPhone app, which has no classes). The letters come from
   f24_cdata.js (CUR_G / CUR_M, in font units). The learner traces the current stroke from its green
   start dot in the arrow's direction: the pen only moves the progress forward along the stroke when it
   stays near it, so a wrong direction or a jump doesn't count. Lifting the pen keeps the progress.
   A pen (Apple Pencil, stylus) switches on pen-only mode: touches (a resting palm) are ignored.
   Results (◎◯△ per letter) are kept on this device. */
var CUR_KEY='babelflight.cursive';
var CUR_STEPS=[
  {k:'lo',t:'小文字',sub:'a〜z',tier:0},
  {k:'up',t:'大文字',sub:'A〜Z',tier:0},
  {k:'wd',t:'つなげ書き',sub:'短い単語を続けて',tier:1},
  {k:'nm',t:'自分の名前',sub:'ローマ字で',tier:1}
];
if(typeof CAB_FEAT==='object')CAB_FEAT.splice(1,0,['筆記体なぞり',['小文字・大文字','+つなげ書き・名前','+つなげ書き・名前','+つなげ書き・名前']]);
var CUR_WORDS={
  en:[['hello','こんにちは'],['sky','空'],['fly','飛ぶ'],['plane','飛行機'],['pilot','パイロット'],['cloud','雲'],['Tokyo','東京'],['London','ロンドン']],
  es:[['hola','こんにちは'],['cielo','空'],['vuelo','フライト'],['playa','ビーチ'],['amigo','友だち'],['Madrid','マドリード']],
  fr:[['bonjour','こんにちは'],['ciel','空'],['avion','飛行機'],['merci','ありがとう'],['ami','友だち'],['Paris','パリ']],
  it:[['ciao','こんにちは'],['cielo','空'],['volo','フライト'],['grazie','ありがとう'],['amico','友だち'],['Roma','ローマ']]
};
var CUR_GR=['','△','◯','◎'];
var CUR={stage:'menu',step:'lo',items:[],i:0,st:null,pen:false,demo:0,raf:0,res:null};

function curLoad(){try{var o=JSON.parse(localStorage.getItem(CUR_KEY)||'{}');return o&&typeof o==='object'?o:{};}catch(e){return {};}}
function curStore(o){try{localStorage.setItem(CUR_KEY,JSON.stringify(o));}catch(e){}}
function curGrade(id){var g=(curLoad().g||{})[id];return g>=1&&g<=3?g:0;}
function curKeepGrade(id,gr){var o=curLoad();o.g=o.g||{};if(!(o.g[id]>=gr))o.g[id]=gr;curStore(o);}
/* 'hide' (the iPhone app) / 'lock' (エコノミー) / 'open' */
function curStepState(s){
  if(!s.tier)return 'open';
  var lv=typeof cabinLv==='function'?cabinLv():-1;
  return lv<0?'hide':lv>=s.tier?'open':'lock';
}
function curStep(k){return CUR_STEPS.filter(function(s){return s.k===k;})[0]||null;}
function curNameFix(s){
  s=String(s||'').replace(/[^A-Za-z ]+/g,' ').replace(/\s+/g,' ').trim().slice(0,24);
  if(s&&s===s.toUpperCase())s=s.toLowerCase().replace(/(^|\s)[a-z]/g,function(c){return c.toUpperCase();});
  return s;
}
function curName(){var o=curLoad();return curNameFix(o.nm!==undefined?o.nm:save.name);}
function curItems(k){
  if(k==='lo')return 'abcdefghijklmnopqrstuvwxyz'.split('').map(function(c){return {id:'lo:'+c,txt:c};});
  if(k==='up')return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(function(c){return {id:'up:'+c,txt:c};});
  if(k==='wd')return (CUR_WORDS[save.lang]||CUR_WORDS.en).map(function(w){return {id:'wd:'+w[0],txt:w[0],jp:w[1]};});
  if(k==='nm')return curName().split(' ').filter(Boolean).slice(0,3).map(function(w){return {id:'nm:'+w,txt:w.slice(0,12)};});
  return [];
}

/* ---- letters → strokes (font units). Letters join at y=CUR_M.join; a letter that starts inside its bowl
   (a c d g o q …) gets the over-the-top connector cursive uses. Lowercase dots / crosses come last. ---- */
function curPts(f,dx){var o=[];for(var i=0;i<f.length;i+=2)o.push([f[i]+dx,f[i+1]]);return o;}
function curConnector(e,p,bowl){
  if(!bowl){var d=Math.abs(e[0]-p[0][0])+Math.abs(e[1]-p[0][1]);return d<0.5?p.slice(1):p;}
  var n=Math.max(1,Math.floor(p.length*0.4)),ti=0,i;
  for(i=1;i<n;i++)if(p[i][1]<p[ti][1])ti=i;
  var T=p[ti],C=[T[0]-0.45*(T[0]-e[0]),T[1]],arc=[];
  for(i=1;i<=8;i++){var t=i/8,a=(1-t)*(1-t),b=2*(1-t)*t,c=t*t;arc.push([a*e[0]+b*C[0]+c*T[0],a*e[1]+b*C[1]+c*T[1]]);}
  return arc.concat(p.slice(0,ti).reverse()).concat(p.slice(1));
}
function curLayout(text){
  var x=0,out=[],extra=[],chain=null,right=0;
  for(var c=0;c<text.length;c++){
    var ch=text.charAt(c),g=CUR_G[ch];
    if(ch===' '){x+=CUR_M.space;chain=null;continue;}
    if(!g)continue;
    var lower=ch>='a'&&ch<='z',bowl=g.s[0][0]>3,e=chain&&chain.p[chain.p.length-1];
    var join=!!e&&e[0]>=right-3&&Math.abs(e[1]-CUR_M.join)<=2;
    if(join&&bowl)x+=3;
    g.s.forEach(function(f,k){
      var p=curPts(f,x),dot=g.d.indexOf(k)>=0;
      if(k===0){
        if(join)chain.p=chain.p.concat(curConnector(e,p,bowl));
        else{chain={p:p,dot:dot};out.push(chain);}
      }else if(lower)extra.push({p:p,dot:dot});
      else{chain={p:p,dot:dot};out.push(chain);}
    });
    x+=g.w;right=x;
  }
  return {w:x,strokes:out.concat(extra)};
}
/* rounder curves than the font's straight segments (Chaikin, ends kept) */
function curSmooth(p,n){
  for(var r=0;r<n;r++){
    if(p.length<3)return p;
    var q=[p[0]];
    for(var i=0;i<p.length-1;i++){var a=p[i],b=p[i+1];q.push([0.75*a[0]+0.25*b[0],0.75*a[1]+0.25*b[1]],[0.25*a[0]+0.75*b[0],0.25*a[1]+0.75*b[1]]);}
    q.push(p[p.length-1]);p=q;
  }
  return p;
}
function curResample(p,sp){
  var out=[p[0]],carry=0;
  for(var i=0;i<p.length-1;i++){
    var a=p[i],b=p[i+1],dx=b[0]-a[0],dy=b[1]-a[1],L=Math.sqrt(dx*dx+dy*dy),t=sp-carry;
    while(t<=L){out.push([a[0]+dx*t/L,a[1]+dy*t/L]);t+=sp;}
    carry=L-(t-sp);
  }
  var last=p[p.length-1],z=out[out.length-1];
  if(Math.abs(z[0]-last[0])+Math.abs(z[1]-last[1])>sp*0.3)out.push(last);
  return out;
}
function curDist(a,b){var dx=a[0]-b[0],dy=a[1]-b[1];return Math.sqrt(dx*dx+dy*dy);}

/* ---- screen size → scale (px per font unit). The 4 lines span -12..21; a little room around them. ---- */
var CUR_TOP=-16,CUR_BOT=25;
function curFit(W,lay,word){
  var uh=CUR_BOT-CUR_TOP,H0=word?Math.min(300,W*0.62):Math.min(430,W*1.04);
  var sc=Math.min(H0/uh,(W-20)/(lay.w+8));
  var H=Math.round(uh*sc);
  return {W:W,H:H,sc:sc,ox:(W-lay.w*sc)/2,oy:-CUR_TOP*sc};
}
function curItemStart(){
  var it=CUR.items[CUR.i];if(!it)return;
  var lay=curLayout(it.txt);
  CUR.st={it:it,lay:lay,k:0,prog:0,ink:[],on:0,off:0,dsum:0,miss:0,act:null,track:false,lift:false,stray:0,back:0,last:null,done:false,msg:'',word:CUR.step==='wd'||CUR.step==='nm'};
  CUR.res=null;
}
/* built when the canvas knows its width (curMount) */
function curPrepare(W){
  var st=CUR.st;if(!st)return;
  var fit=curFit(W,st.lay,st.word);
  if(st.fit&&Math.abs(st.fit.sc-fit.sc)<0.01){st.fit=fit;return;}
  st.fit=fit;st.tol=Math.max(10,Math.min(20,fit.sc*1.7))/fit.sc;
  if(!st.strokes){
    var sp=st.sp=3/fit.sc;
    st.strokes=st.lay.strokes.map(function(s){
      if(s.dot){var cx=0,cy=0;s.p.forEach(function(q){cx+=q[0];cy+=q[1];});return {dot:true,c:[cx/s.p.length,cy/s.p.length],pts:s.p};}
      var sm=curSmooth(s.p,2);return {dot:false,pts:curResample(sm,sp),raw:sm};
    });
  }
}

/* ---- drawing ---- */
function curColors(){
  var cs=getComputedStyle(document.documentElement),g=function(n,d){return (cs.getPropertyValue(n)||'').trim()||d;};
  return {ink:g('--ink','#0b1626'),ink2:g('--ink2','#46586d'),line:g('--line','#cbd5e0'),bad:g('--bad','#cf3342'),good:g('--good','#0f8a52'),lc:g('--c-'+save.lang,'#2a78d6')};
}
function curPath(x,p,f,from,to){
  from=from||0;to=to===undefined?p.length-1:to;if(to-from<1)return;
  x.beginPath();x.moveTo(f.ox+p[from][0]*f.sc,f.oy+p[from][1]*f.sc);
  for(var i=from+1;i<=to;i++)x.lineTo(f.ox+p[i][0]*f.sc,f.oy+p[i][1]*f.sc);
  x.stroke();
}
function curArrow(x,f,a,b,col){
  var ax=f.ox+a[0]*f.sc,ay=f.oy+a[1]*f.sc,bx=f.ox+b[0]*f.sc,by=f.oy+b[1]*f.sc,an=Math.atan2(by-ay,bx-ax),l=7;
  x.strokeStyle=col;x.lineWidth=2.4;x.beginPath();
  x.moveTo(bx-l*Math.cos(an-0.55),by-l*Math.sin(an-0.55));x.lineTo(bx,by);x.lineTo(bx-l*Math.cos(an+0.55),by-l*Math.sin(an+0.55));x.stroke();
}
function curDraw(demoLen){
  var cv=$('curCv'),st=CUR.st;if(!cv||!st||!st.fit)return;
  var f=st.fit,x=cv.getContext('2d'),C=curColors(),dpr=window.devicePixelRatio||1;
  x.setTransform(dpr,0,0,dpr,0,0);x.clearRect(0,0,f.W,f.H);x.lineCap='round';x.lineJoin='round';
  /* the 4 lines of an English notebook; the 3rd (baseline) in red */
  [CUR_M.top,CUR_M.xh,CUR_M.base,CUR_M.desc].forEach(function(u,i){
    var y=Math.round(f.oy+u*f.sc)+0.5;x.strokeStyle=i===2?C.bad:C.line;x.globalAlpha=i===2?0.55:1;x.lineWidth=i===2?1.5:1;
    if(i===1){x.setLineDash([6,5]);}x.beginPath();x.moveTo(6,y);x.lineTo(f.W-6,y);x.stroke();x.setLineDash([]);
  });
  x.globalAlpha=1;
  var gw=Math.max(7,st.tol*f.sc*0.9),iw=Math.max(3.5,f.sc*0.85);
  /* the model letters, faint */
  st.strokes.forEach(function(s,i){
    x.strokeStyle=C.ink2;x.globalAlpha=(demoLen===undefined&&i===st.k&&!st.done)?0.3:0.16;x.lineWidth=gw;
    if(s.dot){x.fillStyle=C.ink2;x.beginPath();x.arc(f.ox+s.c[0]*f.sc,f.oy+s.c[1]*f.sc,gw*0.55,0,7);x.fill();}
    else curPath(x,s.pts,f);
  });
  x.globalAlpha=1;
  if(demoLen!==undefined){curDrawDemo(x,f,C,iw,demoLen);return;}
  /* traced so far */
  x.strokeStyle=C.lc;x.fillStyle=C.lc;x.lineWidth=iw;
  st.strokes.forEach(function(s,i){
    if(i>st.k&&!st.done)return;
    var end=i<st.k||st.done?s.pts.length-1:st.prog;
    if(s.dot){if(i<st.k||st.done){x.beginPath();x.arc(f.ox+s.c[0]*f.sc,f.oy+s.c[1]*f.sc,iw*0.9,0,7);x.fill();}}
    else curPath(x,s.pts,f,0,end);
  });
  /* the learner's own ink */
  x.strokeStyle=C.ink;x.globalAlpha=0.5;x.lineWidth=2;
  st.ink.forEach(function(p){if(p.length>1)curPath(x,p,f);});
  x.globalAlpha=1;
  if(st.done)return;
  /* where to go next: arrows ahead on the current stroke, and the start dot */
  var s=st.strokes[st.k];
  if(s.dot){
    var cx=f.ox+s.c[0]*f.sc,cy=f.oy+s.c[1]*f.sc;
    x.strokeStyle=C.good;x.lineWidth=2.5;x.setLineDash([4,4]);x.beginPath();x.arc(cx,cy,Math.max(12,gw),0,7);x.stroke();x.setLineDash([]);
    return;
  }
  var gap=Math.max(10,Math.round(46/(st.sp*f.sc))),col=C.ink2;
  for(var j=st.prog+gap,na=0;j<s.pts.length-2&&na<3;j+=gap,na++)curArrow(x,f,s.pts[j-2],s.pts[j],col);
  var P=s.pts[st.prog],px=f.ox+P[0]*f.sc,py=f.oy+P[1]*f.sc,r=Math.max(10,gw*0.75);
  x.fillStyle=C.good;x.beginPath();x.arc(px,py,r,0,7);x.fill();
  if(st.prog===0){x.fillStyle='#fff';x.font='700 '+Math.round(r*1.1)+'px system-ui,sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(String(st.k+1),px,py+0.5);}
}
/* お手本: a pen draws every stroke in order */
function curDrawDemo(x,f,C,iw,len){
  var st=CUR.st,left=len;x.strokeStyle=C.lc;x.fillStyle=C.lc;x.lineWidth=iw;
  for(var i=0;i<st.strokes.length&&left>0;i++){
    var s=st.strokes[i];
    if(s.dot){x.beginPath();x.arc(f.ox+s.c[0]*f.sc,f.oy+s.c[1]*f.sc,iw*0.9,0,7);x.fill();left-=12;continue;}
    var n=Math.min(s.pts.length-1,Math.floor(left/st.sp));
    curPath(x,s.pts,f,0,n);left-=s.pts.length*st.sp+10;
    if(left<=0||i===st.strokes.length-1){var P=s.pts[Math.max(0,n)];x.fillStyle=C.ink;x.beginPath();x.arc(f.ox+P[0]*f.sc,f.oy+P[1]*f.sc,Math.max(5,iw*0.8),0,7);x.fill();x.fillStyle=C.lc;}
  }
}
function curDemoStop(){if(CUR.demo){cancelAnimationFrame(CUR.demo);CUR.demo=0;}}
function curDemo(){
  curDemoStop();var st=CUR.st;if(!st||!st.fit)return;
  if(reduceMotion){curDraw();return;}
  var total=0;st.strokes.forEach(function(s){total+=s.dot?12:s.pts.length*st.sp+10;});
  var speed=(st.word?95:60)/1000,t0=0;
  function step(ts){
    if(!t0)t0=ts;var len=(ts-t0)*speed;
    if(len>=total+8){CUR.demo=0;curDraw();return;}
    curDraw(len);CUR.demo=requestAnimationFrame(step);
  }
  CUR.demo=requestAnimationFrame(step);
}

/* ---- the pen ---- */
function curMsg(t,bad){var st=CUR.st;if(st)st.msg=t;var m=$('curMsg');if(m){m.textContent=t;m.classList.toggle('bad',!!bad);}}
function curPenAt(e){var cv=$('curCv'),f=CUR.st.fit,r=cv.getBoundingClientRect();return [((e.clientX-r.left)-f.ox)/f.sc,((e.clientY-r.top)-f.oy)/f.sc];}
function curRedraw(){if(CUR.raf)return;CUR.raf=requestAnimationFrame(function(){CUR.raf=0;curDraw();});}
function curDown(e){
  var st=CUR.st;if(!st||st.done||!st.fit)return;
  if(e.pointerType==='pen'&&!CUR.pen){CUR.pen=true;curPenChip();}
  if(CUR.pen&&e.pointerType==='touch')return;
  if(st.act!==null)return;
  e.preventDefault();curDemoStop();
  st.act=e.pointerId;try{e.target.setPointerCapture(e.pointerId);}catch(x){}
  var P=curPenAt(e),s=st.strokes[st.k];st.ink.push([P]);st.last=P;st.lift=false;st.stray=0;st.back=0;
  if(s.dot){
    if(curDist(P,s.c)<=st.tol*1.7)curStrokeDone();
    else{st.miss++;curMsg('点はここ。緑の○の中をタッチしよう',true);}
    curRedraw();return;
  }
  st.track=curDist(P,s.pts[st.prog])<=st.tol*1.5;
  if(!st.track){st.miss++;curMsg(st.prog?'続きは緑の●から書こう':'緑の●から書きはじめよう',true);}
  curRedraw();
}
function curMove(e){
  var st=CUR.st;if(!st||st.act!==e.pointerId||st.done)return;
  e.preventDefault();
  var evs=e.getCoalescedEvents?e.getCoalescedEvents():[];if(!evs.length)evs=[e];
  var ink=st.ink[st.ink.length-1];
  for(var q=0;q<evs.length;q++){
    var P=curPenAt(evs[q]);ink.push(P);
    var mv=st.last?curDist(P,st.last):0;st.last=P;
    if(st.lift)continue;
    var s=st.strokes[st.k];if(s.dot)continue;
    if(!st.track){if(curDist(P,s.pts[st.prog])<=st.tol){st.track=true;curMsg('');}else st.off++;continue;}
    var n=s.pts.length,allow=Math.ceil(mv/st.sp)*2+6,best=st.prog,bd=1e9;
    for(var j=st.prog;j<=Math.min(n-1,st.prog+allow);j++){var d=curDist(P,s.pts[j]);if(d<bd){bd=d;best=j;}}
    if(bd<=st.tol){
      st.on++;st.dsum+=bd;st.stray=0;
      if(best>st.prog){st.prog=best;st.back=0;}else if(mv>st.sp*0.5&&++st.back>28){st.back=0;curMsg('矢印の向きに書こう',true);}
      if(st.prog>=n-1-Math.ceil(st.tol/st.sp*0.5)){st.prog=n-1;curStrokeDone();if(st.done)break;st.lift=true;}
    }else{
      st.off++;
      if(++st.stray>10){st.track=false;st.miss++;curMsg('線からはみ出したよ。緑の●からもう一度',true);}
    }
  }
  curRedraw();
}
function curUp(e){
  var st=CUR.st;if(!st||st.act!==e.pointerId)return;
  st.act=null;st.track=false;st.lift=false;
  if(!st.done&&st.prog>0&&!st.strokes[st.k].dot&&!/はみ出し|向き/.test(st.msg))curMsg('続きは緑の●から');
  curRedraw();
}
function curStrokeDone(){
  var st=CUR.st;st.k++;st.prog=0;st.track=false;
  if(typeof clack==='function')clack();
  if(st.k>=st.strokes.length){curFinish();return;}
  var s=st.strokes[st.k];
  curMsg(s.dot?'さいごに点を打とう':(st.k+1)+'画目: 緑の●から書こう');
}
function curFinish(){
  var st=CUR.st;st.done=true;
  var tot=st.on+st.off,r=tot?st.off/tot:0,md=st.on?st.dsum/st.on/st.tol:1;
  var gr=r<=0.07&&md<=0.42&&st.miss<=1?3:r<=0.22&&md<=0.75?2:1;
  CUR.res={gr:gr};curKeepGrade(st.it.id,gr);
  if(gr===3&&typeof chimeOK==='function')chimeOK();
  if(typeof buzz==='function')buzz(gr===3?14:8);
  var box=$('curRes');if(box)box.innerHTML=curResHTML();
  curMsg('');curDraw();
  var nb=document.querySelector('[data-cur-next]');if(nb)try{nb.focus({preventScroll:true});}catch(x){}
}
function curPenChip(){var c=$('curPen');if(c){c.hidden=!CUR.pen;}}

/* ---- screens ---- */
function curGlyphSVG(ch){
  var g=CUR_G[ch];if(!g)return '';
  var d=g.s.map(function(f){var p=curPts(f,0);return 'M'+p.map(function(q){return q[0]+' '+q[1];}).join('L');}).join('');
  return '<svg viewBox="-3 -14 '+(g.w+6)+' 37" aria-hidden="true"><path d="'+d+'"/></svg>';
}
function cursiveCardHTML(L){
  var o=curLoad().g||{},n=0;Object.keys(o).forEach(function(k){if(/^(lo|up):/.test(k))n++;});
  return '<section class="card mode cur-card"><span class="lbl">CURSIVE ・ アルファベット</span><h2 class="jh">筆記体なぞり</h2>'+
    '<p class="dim">お手本の線をなぞって、筆記体を練習しよう。✍️ タッチペン推奨(指でもできます)</p>'+
    '<div class="mcount mono">'+n+'<small> / 52 文字</small></div><button class="go sm" type="button" data-cur-open>はじめる</button></section>';
}
function curMenuHTML(){
  var g=curLoad().g||{},h='<div class="fl-top"><button class="x" type="button" data-cur-close aria-label="閉じる">'+closeIcon()+'</button><div class="fl-id"><span class="lbl">CURSIVE</span><b>筆記体なぞり</b></div></div>'+
    '<p class="cur-note">✍️ <b>タッチペン推奨</b>(指でもできます)。お手本の線を、<b class="cur-g">緑の●</b>から矢印の向きになぞろう。</p>';
  CUR_STEPS.forEach(function(s,si){
    var state=curStepState(s);if(state==='hide')return;
    var items=state==='open'?curItems(s.k):[],done=items.filter(function(it){return g[it.id];}).length,next=items.filter(function(it){return !g[it.id];})[0];
    h+='<section class="card cur-step'+(state==='lock'?' locked':'')+'"><div class="card-h"><h2 class="jh">'+(si+1)+'. '+s.t+' <small>'+s.sub+'</small></h2>'+(state==='open'&&items.length?'<span class="lbl">'+done+'/'+items.length+'</span>':'')+'</div>';
    if(state==='lock'){
      h+='<p class="dim hint">🔒 「'+CABINS[s.tier][1]+'」から使えます</p><button class="ghost" type="button" data-cur-step="'+s.k+'">どんな練習か見る</button></section>';return;
    }
    if(s.k==='lo'||s.k==='up'){
      h+='<div class="cur-grid">'+items.map(function(it,i){var gr=g[it.id]||0;
        return '<button type="button" class="cur-cell g'+gr+'" data-cur-item="'+s.k+':'+i+'" aria-label="'+it.txt+(gr?' '+CUR_GR[gr]:'')+'">'+curGlyphSVG(it.txt)+'<small>'+it.txt+(gr?' '+CUR_GR[gr]:'')+'</small></button>';}).join('')+'</div>';
    }else if(s.k==='wd'){
      h+='<div class="cur-words">'+items.map(function(it,i){var gr=g[it.id]||0;
        return '<button type="button" class="cur-w g'+gr+'" data-cur-item="wd:'+i+'"><b>'+esc(it.txt)+'</b><small>'+esc(it.jp)+(gr?' ・ '+CUR_GR[gr]:'')+'</small></button>';}).join('')+'</div>';
    }else{
      h+='<div class="cur-name"><label class="lbl" for="curName">書く名前(ローマ字)</label><div class="row2"><input id="curName" class="typebox" maxlength="24" value="'+esc(curName())+'" autocomplete="off" autocapitalize="words" spellcheck="false" placeholder="Yossi"><button class="go" type="button" data-cur-name style="width:auto;margin:0;padding:12px 16px">練習する</button></div>'+
        '<p class="dim hint">ローマ字(A〜Z)だけ使えます。全部大文字の名前は、最初の文字だけ大文字にしています。</p></div>';
      h+='</section>';return;
    }
    h+='<button class="go sm" type="button" data-cur-step="'+s.k+'">'+(done&&next?'つづきから<small>次は '+esc(next.txt)+'</small>':done?'もう一度はじめから':'はじめる')+'</button></section>';
  });
  h+='<p class="dim hint">練習の記録はこの端末に保存されます。お手本の文字は Hershey の筆記体フォント(A. V. Hershey)をもとにしています。</p>';
  return h+'<div class="pad-b"></div>';
}
function curTraceHTML(){
  var st=CUR.st,s=curStep(CUR.step),it=st.it;
  return '<div class="fl-top"><button class="x" type="button" data-cur-back aria-label="戻る">'+closeIcon()+'</button><div class="fl-id"><span class="lbl">'+s.t+' ・ '+(CUR.i+1)+' / '+CUR.items.length+'</span><b>'+esc(it.txt)+(it.jp?' <small class="dim">'+esc(it.jp)+'</small>':'')+'</b></div>'+
    '<button class="cur-pen" id="curPen" type="button" data-cur-pen'+(CUR.pen?'':' hidden')+' aria-label="ペンだけモード。タップで解除">🖊 ペンだけ</button></div>'+
    '<div class="cur-pad" id="curPad"><canvas id="curCv" role="img" aria-label="なぞり書きの練習エリア: '+esc(it.txt)+'"></canvas></div>'+
    '<p class="cur-msg" id="curMsg" aria-live="polite">'+esc(st.msg||'緑の●から、矢印の向きになぞろう')+'</p>'+
    '<div class="cur-acts"><button class="sq" type="button" data-cur-demo>お手本を見る</button><button class="sq" type="button" data-cur-redo>書き直す</button></div>'+
    '<div id="curRes">'+(st.done?curResHTML():'')+'</div><div class="pad-b"></div>';
}
function curResHTML(){
  var r=CUR.res;if(!r)return '';
  var msg=r.gr===3?['◎ きれい！','お手本どおりに書けたね。']:r.gr===2?['◯ いい感じ！','線からはみ出したところに気をつけると、もっときれいになるよ。']:['△ 書けたね！','もう一回なぞると、手が形を覚えていくよ。'];
  var last=CUR.i>=CUR.items.length-1,nx=last?'':CUR.items[CUR.i+1].txt;
  return '<div class="cur-res g'+r.gr+'" role="status"><b>'+msg[0]+'</b><span>'+msg[1]+'</span></div>'+
    '<div class="row2"><button class="ghost" type="button" data-cur-redo style="flex:1">もう一回</button><button class="go" type="button" data-cur-next style="flex:1;margin-top:0">'+(last?'おわり':'次へ<small>'+esc(nx)+'</small>')+'</button></div>';
}
function curDoneHTML(){
  var g=curLoad().g||{},c=[0,0,0,0];CUR.items.forEach(function(it){c[g[it.id]||0]++;});
  var weak=CUR.items.filter(function(it){return (g[it.id]||0)<3;}).length,s=curStep(CUR.step);
  return '<div class="fl-top"><button class="x" type="button" data-cur-back aria-label="戻る">'+closeIcon()+'</button><div class="fl-id"><span class="lbl">'+s.t+'</span><b>おつかれさま！</b></div></div>'+
    '<section class="card cur-sum"><h2 class="jh">'+s.t+'を1周したよ</h2><div class="cur-sum-row"><span class="g3">◎ '+c[3]+'</span><span class="g2">◯ '+c[2]+'</span><span class="g1">△ '+c[1]+'</span></div>'+
    (weak?'<button class="go" type="button" data-cur-weak>◎じゃない文字だけ、もう一度<small>'+weak+'個</small></button>':'<p class="dim">全部◎！ すごい！</p>')+
    '<button class="ghost" type="button" data-cur-back>メニューに戻る</button></section><div class="pad-b"></div>';
}
function curHTML(){
  if(CUR.stage==='trace'&&CUR.st)return curTraceHTML();
  if(CUR.stage==='done')return curDoneHTML();
  return curMenuHTML();
}
function curMount(){
  var pad=$('curPad'),cv=$('curCv'),st=CUR.st;if(!pad||!cv||!st)return;
  var W=Math.floor(pad.clientWidth);curPrepare(W);
  var dpr=window.devicePixelRatio||1;cv.width=Math.round(W*dpr);cv.height=Math.round(st.fit.H*dpr);cv.style.width=W+'px';cv.style.height=st.fit.H+'px';
  cv.addEventListener('pointerdown',curDown);cv.addEventListener('pointermove',curMove);
  cv.addEventListener('pointerup',curUp);cv.addEventListener('pointercancel',curUp);
  cv.addEventListener('contextmenu',function(e){e.preventDefault();});
  curDraw();
}
function curOpen(){curDemoStop();CUR.stage='menu';CUR.st=null;go('cursive');}
function curStart(k,i,list){
  var s=curStep(k);if(!s)return;
  var state=curStepState(s);
  if(state==='hide')return;
  if(state==='lock'){$('sheetHost').innerHTML=lockSheetHTML(s.t+'の筆記体',s.tier);return;}
  var items=list||curItems(k);if(!items.length){var m=$('curName');if(m){m.focus();}return;}
  CUR.step=k;CUR.items=items;CUR.i=Math.max(0,Math.min(items.length-1,i||0));CUR.stage='trace';
  curItemStart();go('cursive');curDemo();
  if(typeof TRK==='object'&&TRK.lesson)try{TRK.lesson(save.lang,'cursive');}catch(e){}
}
(function(){
  var r0=render;
  render=function(){
    if(view!=='cursive'){curDemoStop();return r0.apply(this,arguments);}
    $('tabs').hidden=true;
    var main=$('main');main.innerHTML='<div class="cur">'+curHTML()+'</div>';
    main.classList.remove('enter','enter-l','enter-r');void main.offsetWidth;main.classList.add('enter');PREVVIEW=view;
    if(CUR.stage==='trace')curMount();
  };
})();
window.addEventListener('resize',function(){
  if(view!=='cursive'||CUR.stage!=='trace'||!CUR.st)return;
  clearTimeout(CUR.rt);CUR.rt=setTimeout(function(){var pad=$('curPad');if(!pad||!CUR.st)return;if(Math.abs(pad.clientWidth-CUR.st.fit.W)>4){curDemoStop();render();}},200);
});
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  var a=function(n){return t.hasAttribute(n);},g=function(n){return t.getAttribute(n);};
  if(a('data-cur-open')){curOpen();return;}
  if(view!=='cursive')return;
  if(a('data-cur-close')){curDemoStop();CUR.st=null;go('review');return;}
  if(a('data-cur-back')){curDemoStop();CUR.stage='menu';CUR.st=null;render();window.scrollTo(0,0);return;}
  if(a('data-cur-step')){var k=g('data-cur-step'),gg=curLoad().g||{},its=curItems(k),i=0;its.some(function(it,j){if(!gg[it.id]){i=j;return true;}return false;});curStart(k,i);return;}
  if(a('data-cur-item')){var sp=g('data-cur-item').split(':');curStart(sp[0],parseInt(sp[1],10)||0);return;}
  if(a('data-cur-name')){
    var inp=$('curName'),v=curNameFix(inp&&inp.value);
    if(!v){curMsgMenu('ローマ字で名前を入れてね');return;}
    var o=curLoad();o.nm=v;curStore(o);curStart('nm',0);return;
  }
  if(a('data-cur-demo')){if(CUR.st&&!CUR.st.done)curDemo();else if(CUR.st){curItemStart();render();curDemo();}return;}
  if(a('data-cur-redo')){curDemoStop();curItemStart();render();return;}
  if(a('data-cur-next')){
    curDemoStop();
    if(CUR.i>=CUR.items.length-1){CUR.stage='done';CUR.st=null;render();window.scrollTo(0,0);return;}
    CUR.i++;curItemStart();render();curDemo();return;
  }
  if(a('data-cur-weak')){var g2=curLoad().g||{},w=CUR.items.filter(function(it){return (g2[it.id]||0)<3;});if(w.length)curStart(CUR.step,0,w);return;}
  if(a('data-cur-pen')){CUR.pen=false;curPenChip();return;}
});
function curMsgMenu(t){var inp=$('curName');if(inp){inp.setAttribute('aria-invalid','true');inp.placeholder=t;inp.value='';inp.focus();}}
document.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target&&e.target.id==='curName'&&!e.isComposing){e.preventDefault();var b=document.querySelector('[data-cur-name]');if(b)b.click();}});
/* the Hershey Fonts acknowledgement the font data asks for, in このアプリについて */
(function(){
  var c0=creditsHTML;
  creditsHTML=function(){
    return c0.apply(this,arguments).replace('<p class="cr-copy"','<p class="cr-note">筆記体のお手本: Hershey Fonts — originally created by Dr. A. V. Hershey while working at the U. S. National Bureau of Standards; data format originally created by James Hurt, Cognition, Inc.</p><p class="cr-copy"');
  };
})();
