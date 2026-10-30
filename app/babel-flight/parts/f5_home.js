/* ================= HOME: hero route map + itinerary ================= */
var pendingFly=null,MAP=null,MODEPREV=null,HOME_ANIM='first',DOTC={};
function cityFor(L,i){var c=CITIES[L];return c[((i%c.length)+c.length)%c.length];}
function posKey(L){return L+'-'+save.mode;}
function curPos(L){var p=save.pos&&save.pos[posKey(L)];return typeof p==='number'?p:-1;}
function proj(L,lat,lon){var R=REGIONS[L],b=R.b;return {x:(lon-b[0])/(b[1]-b[0])*340,y:(b[3]-lat)/(b[3]-b[2])*R.H};}
function inPoly(x,y,p){var ins=false,n=p.length/2,j=n-1;for(var i=0;i<n;i++){var xi=p[2*i],yi=p[2*i+1],xj=p[2*j],yj=p[2*j+1];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)ins=!ins;j=i;}return ins;}
function polyBox(p){var a=[1e9,-1e9,1e9,-1e9];for(var i=0;i<p.length;i+=2){a[0]=Math.min(a[0],p[i]);a[1]=Math.max(a[1],p[i]);a[2]=Math.min(a[2],p[i+1]);a[3]=Math.max(a[3],p[i+1]);}return a;}
function haversine(a,b){var R=6371,t=Math.PI/180,dl=(b[2]-a[2])*t,dn=(b[3]-a[3])*t,x=Math.sin(dl/2)*Math.sin(dl/2)+Math.cos(a[2]*t)*Math.cos(b[2]*t)*Math.sin(dn/2)*Math.sin(dn/2);return 2*R*Math.asin(Math.sqrt(x));}
function fmtCoord(c){return Math.abs(c[2]).toFixed(2)+'°'+(c[2]>=0?'N':'S')+'  '+Math.abs(c[3]).toFixed(2)+'°'+(c[3]>=0?'E':'W');}
function cssVar(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim()||'#ffcf26';}
function flapHTML(t,anim){return '<span class="flapw'+(anim?' flip':'')+'">'+String(t).split('').map(function(ch,i){return '<span style="--d:'+i+'">'+(ch===' '?'&nbsp;':esc(ch))+'</span>';}).join('')+'</span>';}
function modeSwitch(){
  var x=typeof examModeOn==='function'&&examModeOn(),m=save.mode==='exam'&&!x?'daily':save.mode;
  return '<div class="modesw float'+(x?' four':'')+'" role="group" aria-label="学ぶモード"><span class="modesw-ind '+(MODEPREV||m)+'" aria-hidden="true"></span>'+
    '<button type="button" data-mode-set="daily" aria-pressed="'+(m==='daily')+'"><b>'+(x?'日常会話':'日常会話モード')+'</b><small>あいさつ・旅行</small></button>'+
    '<button type="button" data-mode-set="job" aria-pressed="'+(m==='job')+'"><b>'+(x?'職業':'職業モード')+'</b><small>13職業の会話</small></button>'+
    '<button type="button" data-mode-set="study" aria-pressed="'+(m==='study')+'"><b>'+(x?'留学':'留学モード')+'</b><small>学校と授業</small></button>'+
    (x?'<button type="button" data-mode-set="exam" aria-pressed="'+(m==='exam')+'"><b>検定</b><small>英検・TOEIC</small></button>':'')+'</div>';
}
function stopStatus(L,uid,nextId){
  var r=unitRec(L,uid);
  if(typeof examLockText==='function'&&r.n===0){var lk=examLockText(L,uid);if(lk)return {c:'locked',t:lk};}
  if(r.n>0){var due=unitDue(L,uid);return {c:'done',t:due?'復習あり':'★★★'.slice(0,r.stars)+'<em>'+'★★★'.slice(r.stars)+'</em>'};}
  if(uid===nextId)return {c:'next',t:'次はここ'};
  return {c:'todo',t:''};
}
/* the language chips show the current language and every language with a lesson flown;
   all the others are one tap away in 言語を選ぶ (langPickSheet) */
function langStarted(k){var p=save.prog&&save.prog[k],u=p&&p.units;if(!u)return false;for(var id in u)if(u[id]&&u[id].n>0)return true;return false;}
function myLangs(){return ORDER.filter(function(k){return k===save.lang||langStarted(k);});}
var LANG_SOON=['ドイツ語','ポルトガル語','ロシア語','トルコ語','インドネシア語','アラビア語'];
function heroLangs(){
  return '<div class="hero-langs" role="group" aria-label="学ぶ言語">'+myLangs().map(function(k){
    return '<button class="hl" type="button" data-lang="'+k+'" style="--dc:var(--c-'+k+')" aria-pressed="'+(k===save.lang)+'"><b class="mono">'+LANGS[k].code+'</b><small>'+esc(LANGS[k].name)+'</small></button>';
  }).join('')+'<button class="hl hl-more" type="button" data-lang-pick aria-label="言語を選ぶ"><b class="mono">＋</b><small>ほかの言語</small></button></div>';
}
function langPickSheet(){
  var mine=myLangs(),rest=ORDER.filter(function(k){return mine.indexOf(k)<0;});
  function row(k){
    var LG=LANGS[k],ids=pathIdsFor(k),on=k===save.lang;
    return '<button class="lp-row" type="button" data-lang="'+k+'" style="--dc:var(--c-'+k+')" aria-pressed="'+on+'"><span class="lp-code mono">'+LG.code+'</span>'+
      '<span class="lp-nm"><b>'+esc(LG.name)+(LG.starter?'<em class="lp-tag">スターター</em>':'')+'</b><small><span class="'+lfc(k)+'">'+esc(LG.native)+'</span> ・ '+esc(LG.city)+'行き</small></span>'+
      '<span class="lp-n mono">'+(on?'学習中':unitsDone(k,ids)+'/'+ids.length)+'</span></button>';
  }
  $('sheetHost').innerHTML='<div class="sheet plain" role="dialog" aria-label="言語を選ぶ"><div class="sheet-in"><h3>どの言語を学ぶ？</h3>'+
    '<p class="dim" style="font-size:13.5px">いつでも切り替えられます。進み具合は言語ごとに残ります。</p>'+
    '<span class="lbl lp-h">学習中</span><div class="lp-list">'+mine.map(row).join('')+'</div>'+
    (rest.length?'<span class="lbl lp-h">ほかの言語</span><div class="lp-list">'+rest.map(row).join('')+'</div>':'')+
    (ORDER.some(function(k){return LANGS[k].starter;})?'<p class="dim hint">「スターター」の言語は、今は日常会話モード(あいさつ・旅行フレーズ・旅行の場面の会話)で学べます。職業・留学・検定のコースは準備中です。</p>':'')+
    '<p class="dim hint">準備中: '+LANG_SOON.join('・')+'</p>'+
    '<button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';
}
/* with many languages the chip rows scroll sideways: keep the current language in view */
function langChipsReveal(){
  document.querySelectorAll('.hero-langs,.dests').forEach(function(row){
    var b=row.querySelector('[aria-pressed="true"]');if(!b||row.scrollWidth<=row.clientWidth)return;
    var rr=row.getBoundingClientRect(),br=b.getBoundingClientRect();
    if(br.right>rr.right)row.scrollLeft+=br.right-rr.right+24;else if(br.left<rr.left)row.scrollLeft-=rr.left-br.left+24;
  });
}
(function(){var r0=render;render=function(){var x=r0.apply(this,arguments);try{langChipsReveal();}catch(e){}return x;};})();
/* a mode the language doesn't have yet (a スターター language in 職業 / 留学 / 検定) */
var MODE_JP={daily:'日常会話モード',job:'職業モード',study:'留学モード',exam:'検定モード'};
function modeSoonHTML(L){
  var LG=LANGS[L],p=profById(save.prof),what=save.mode==='job'&&p?p.jp+'の専門会話':MODE_JP[save.mode]||'このモード';
  return '<section class="card empty-job mode-soon"><span class="lbl">'+esc(MODE_JP[save.mode]||'')+' ・ '+esc(LG.name)+'</span><h2 class="jh">'+esc(LG.name)+'の'+esc(what)+'は準備中です</h2>'+
    '<p class="dim" style="font-size:13.5px;margin-top:4px">今は日常会話モードで、あいさつ・旅行フレーズ・旅行の場面の会話を学べます。ほかのモードも順番に増やしていきます。</p>'+
    '<button class="go" type="button" data-mode-set="daily">日常会話モードで学ぶ</button></section>';
}
function homeHTML(){
  var L=save.lang,LG=LANGS[L],p=profById(save.prof),anim=!!HOME_ANIM&&!reduceMotion,h=topBar('','progress');
  var ids=pathIds(L);
  if(!ids.length){
    var pick=save.mode==='job'&&!p;
    h+='<section class="hero empty"><div class="hero-in"><div class="hud"><div class="hud-l"><span class="lbl">'+esc(LG.cityEn)+' ・ '+esc(LG.name)+'</span><b class="mono">'+(pick?'職業を選ぼう':'準備中')+'</b></div></div>'+heroLangs()+'</div></section>'+modeSwitch();
    if(!pick){h+=modeSoonHTML(L);return h;}
    h+='<section class="card empty-job"><span class="lbl">職業モード</span><h2 class="jh">まずは職業を選ぼう</h2><p class="dim" style="font-size:13.5px;margin-top:4px">パイロット、医療、IT、美容師など13職業から選べます。選んだ職業の専門会話が、地図の上に並びます。</p><button class="go" type="button" data-picker>職業を選ぶ</button></section>';
    return h;
  }
  var secs=pathSections(L),done=unitsDone(L,ids),total=ids.length,nextId=nextPathUnit(L),ni=Math.max(0,ids.indexOf(nextId));
  var nc=cityFor(L,ni),cp=curPos(L),from=cp>=0?cityFor(L,cp):TOKYO,dist=Math.round(haversine(from,nc));
  h+='<section class="hero" id="hero"><div class="hero-in" id="heroIn"><canvas id="map" class="mapcv" role="img" aria-label="'+esc(LG.name)+'のルートマップ。次の目的地は'+esc(nc[1])+'"></canvas>'+
     '<div class="hud"><div class="hud-l"><span class="lbl">NEXT STOP ・ '+esc(LG.name)+'</span><b class="mono">'+flapHTML(nc[0],anim)+'</b><small>'+esc(nc[1])+' ・ '+esc(unitTitle(nextId))+'</small></div>'+
     '<div class="hud-r"><span class="lbl">到着</span><b class="mono">'+done+'<small>/'+total+'</small></b></div></div>'+
     '<div class="hud-foot mono"><span>'+fmtCoord(nc)+'</span><span>'+(cp>=0?esc(from[1]):'東京')+'から '+fmt(dist)+' km</span></div>'+
     heroLangs()+'</div></section>';
  h+=modeSwitch();
  if(typeof examHomeHTML==='function')h+=examHomeHTML(L);
  if(save.mode==='job'){
    h+='<button class="course" type="button" data-picker><span class="ccode">'+p.code+'</span><span class="ctext"><span class="lbl">職業コース</span><b>'+esc(p.jp)+'</b><small>タップして変更 ・ 13職業から選べます</small></span><span class="chev" aria-hidden="true">›</span></button>';
    if(p.id==='pilot')h+='<button class="course atcbtn" type="button" data-atc><span class="ccode">ATC</span><span class="ctext"><span class="lbl">AIロールプレイ ・ 英語</span><b>AI管制官と交信練習</b><small>羽田空港で、管制官役のAIと無線交信</small></span><span class="chev" aria-hidden="true">›</span></button>';
  }
  var idx=0;
  secs.forEach(function(sec,si){
    var sd=unitsDone(L,sec.ids);
    h+='<section class="leg"><div class="leg-h"><div><span class="lbl">LEG '+(si+1)+'</span><h2 class="jh">'+esc(sec.title)+'</h2><p>'+esc(sec.sub)+'</p></div><span class="leg-n mono">'+sd+'/'+sec.ids.length+'</span></div><div class="stops">';
    sec.ids.forEach(function(uid){
      var c=cityFor(L,idx),st=stopStatus(L,uid,nextId);
      h+='<button class="stop '+st.c+'" type="button" data-node="'+esc(uid)+'"><span class="stop-dot" aria-hidden="true"></span>'+
         '<span class="stop-city"><b class="mono">'+esc(c[0])+'</b><small>'+esc(c[1])+'</small></span>'+
         '<span class="stop-les"><b>'+esc(unitTitle(uid))+'</b><small class="kind k-'+(isScene(L,uid)?'scene':'phrase')+'">'+unitKind(L,uid)+'</small></span>'+
         '<span class="stop-st">'+st.t+'</span></button>';
      idx++;
    });
    h+='</div></section>';
  });
  return h;
}
function sceneSheetHTML(L,uid){
  var m=SCENE_META[uid],u=UNITS[L][uid],LG=LANGS[L],rec=unitRec(L,uid);
  return '<section class="scene-card"><div class="sc-top"><span class="avatar" aria-hidden="true">'+esc(m.ini)+'</span><div><span class="lbl">会話の場面 ・ '+esc(LG.name)+'</span><b>'+esc(m.jp)+'</b><small>相手: '+esc(m.role)+(rec.n>0?' ・ '+rec.n+'回クリア':'')+'</small></div></div>'+
    '<p class="sc-sit">'+esc(m.sit)+'</p><div class="sc-meta mono">'+u.turns.length+'往復 ・ 約3分 ・ '+flightNo(L,uid)+'</div>'+
    '<button class="go" type="button" data-scene="'+esc(uid)+'" data-scmode="call">通話モードで話す<small>相手の声に、声に出して答える ・ 自己採点</small></button>'+
    '<button class="go alt" type="button" data-scene="'+esc(uid)+'" data-scmode="type">入力モードで答える<small>文字で返事 ・ 自動採点 ・ キーボードのマイクで話してもOK</small></button></section>';
}
function openNodeSheet(uid){
  var L=save.lang;
  if(typeof examLockSheet==='function'&&examLockSheet(L,uid))return;
  $('sheetHost').innerHTML='<div class="sheet plain print" role="dialog" aria-label="レッスンの詳細"><div class="sheet-in">'+(isScene(L,uid)?sceneSheetHTML(L,uid):passHTML(L,uid))+
    '<button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';
}

/* ---- map engine ---- */
function mapDotsArea(L,step,x0,x1,y0,y1){
  var key=L+'|'+step.toFixed(3)+'|'+Math.round(x0)+'|'+Math.round(x1)+'|'+Math.round(y0)+'|'+Math.round(y1);
  if(DOTC[key])return DOTC[key];
  var R=REGIONS[L],b=R.b,out=[];
  var P=R.polys.map(function(p){return {p:p,bx:polyBox(p)};}),Ho=(R.holes||[]).map(function(p){return {p:p,bx:polyBox(p)};});
  function hit(list,lon,lat){for(var k=0;k<list.length;k++){var q=list[k],bx=q.bx;if(lon<bx[0]||lon>bx[1]||lat<bx[2]||lat>bx[3])continue;if(inPoly(lon,lat,q.p))return true;}return false;}
  for(var y=Math.floor(y0/step)*step;y<=y1;y+=step)for(var x=Math.floor(x0/step)*step;x<=x1;x+=step){
    var lon=b[0]+x/340*(b[1]-b[0]),lat=b[3]-y/R.H*(b[3]-b[2]);
    if(hit(P,lon,lat)&&!hit(Ho,lon,lat))out.push(x,y);
  }
  return (DOTC[key]=out);
}
function segPoint(a,b,t){
  var mx=(a.x+b.x)/2,my=(a.y+b.y)/2,dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy)||1,c={x:mx-dy*0.18,y:my+dx*0.18-len*0.08};
  var u=1-t;return {x:u*u*a.x+2*u*t*c.x+t*t*b.x,y:u*u*a.y+2*u*t*c.y+t*t*b.y,c:c,dx:2*u*(c.x-a.x)+2*t*(b.x-c.x),dy:2*u*(c.y-a.y)+2*t*(b.y-c.y)};
}
function mapMount(){
  var ind=document.querySelector('.modesw-ind');
  if(ind&&MODEPREV&&MODEPREV!==save.mode){requestAnimationFrame(function(){requestAnimationFrame(function(){ind.className='modesw-ind '+save.mode;});});}
  MODEPREV=save.mode;
  var cv=$('map'),hero=$('hero');
  var anim=HOME_ANIM;HOME_ANIM=null;
  if(MAP&&MAP.raf)cancelAnimationFrame(MAP.raf);
  if(!cv||!hero)return;
  var L=save.lang,R=REGIONS[L],ids=pathIds(L),cw=hero.clientWidth||360;
  var pts=ids.map(function(id,i){var c=cityFor(L,i);return proj(L,c[2],c[3]);});
  var bx=[1e9,-1e9,1e9,-1e9];pts.forEach(function(p){bx[0]=Math.min(bx[0],p.x);bx[1]=Math.max(bx[1],p.x);bx[2]=Math.min(bx[2],p.y);bx[3]=Math.max(bx[3],p.y);});
  var pw=Math.max(bx[1]-bx[0],40),ph=Math.max(bx[3]-bx[2],40),padx=pw*0.16+8,pady=ph*0.2+14;
  var bw=pw+2*padx,bh=ph+2*pady+40;
  var chMax=Math.max(320,Math.min(Math.round(window.innerHeight*0.52),450));
  var sFit=Math.min(cw/bw,chMax/bh),heroH=Math.round(Math.min(chMax,Math.max(330,bh*sFit))),s=Math.max(sFit,heroH/bh);
  hero.style.height=heroH+'px';
  var dpr=Math.min(2,window.devicePixelRatio||1);
  cv.width=Math.round(cw*dpr);cv.height=Math.round(heroH*dpr);cv.style.height=heroH+'px';
  var vw=cw/s,vh=heroH/s,follow=vw<bw*0.98;
  var X0=bx[0]-padx,X1=bx[1]+padx,Y0=bx[2]-pady-28,Y1=bx[3]+pady+12;
  function camAt(focus){
    if(!follow)return {x:(X0+X1)/2,y:(Y0+Y1)/2};
    return {x:clamp(focus.x,X0+vw/2,X1-vw/2),y:clamp(focus.y,Math.min(Y0+vh/2,(Y0+Y1)/2),Math.max(Y1-vh/2,(Y0+Y1)/2))};
  }
  var tk=proj(L,TOKYO[2],TOKYO[3]),nextI=ids.indexOf(nextPathUnit(L));
  function focusFor(cur){var a=cur>=0?pts[cur]:tk,b=nextI>=0?pts[nextI]:a;return {x:(a.x+b.x)/2,y:(a.y+b.y)/2};}
  var fly=null;
  if(pendingFly&&pendingFly.key===posKey(L)){fly={from:pendingFly.from,to:pendingFly.to,t0:performance.now()+350};pendingFly=null;}
  var cur=fly?fly.from:curPos(L);
  var cam0=camAt(focusFor(cur)),cam1=camAt(focusFor(fly?fly.to:cur));
  var step=7/s,dots=mapDotsArea(L,step,follow?X0-vw/2:cam0.x-vw/2-step,follow?X1+vw/2:cam0.x+vw/2+step,cam0.y-vh/2-step-(follow?vh/2:0),cam0.y+vh/2+step+(follow?vh/2:0));
  MAP={cv:cv,ctx:cv.getContext('2d'),dpr:dpr,cw:cw,ch:heroH,s:s,L:L,R:R,ids:ids,pts:pts,tk:tk,next:nextI,dots:dots,cam:cam0,cam0:cam0,cam1:cam1,fly:fly,
       acc:cssVar('--c-'+L),plane:new Path2D(PLANE_D),t0:performance.now(),reveal:(anim==='lang'||anim==='first')&&!reduceMotion,route:(anim&&!reduceMotion)?performance.now()+(anim==='mode'?0:250):0,raf:0,cache:null};
  cv.onclick=function(ev){
    var r=cv.getBoundingClientRect(),M=MAP,x=(ev.clientX-r.left-M.cw/2)/M.s+M.cam.x,y=(ev.clientY-r.top-M.ch/2)/M.s+M.cam.y,best=-1,bd=18/M.s;
    M.pts.forEach(function(p,i){var dd=Math.hypot(p.x-x,p.y-y);if(dd<bd){bd=dd;best=i;}});
    if(best>=0)openNodeSheet(M.ids[best]);
  };
  bindParallax();
  mapFrame();
}
function mapFrame(){
  var M=MAP;if(!M||!document.body.contains(M.cv)){if(M)M.raf=0;return;}
  var g=M.ctx,now=performance.now(),L=M.L,pts=M.pts,ids=M.ids,i,s=M.s,cw=M.cw,ch=M.ch;
  /* camera (pans with the plane when the route is wider than the screen) */
  var F2=M.fly,ft=0,fe=0;
  if(F2){ft=reduceMotion?1:clamp((now-F2.t0)/1800,0,1);fe=ft<.5?2*ft*ft:1-Math.pow(-2*ft+2,2)/2;M.cam={x:M.cam0.x+(M.cam1.x-M.cam0.x)*fe,y:M.cam0.y+(M.cam1.y-M.cam0.y)*fe};}
  var cx=M.cam.x,cy=M.cam.y;
  function SX(x){return (x-cx)*s+cw/2;}function SY(y){return (y-cy)*s+ch/2;}
  g.setTransform(M.dpr,0,0,M.dpr,0,0);
  var bg=g.createLinearGradient(0,0,0,ch);bg.addColorStop(0,'#071022');bg.addColorStop(1,'#0f2244');g.fillStyle=bg;g.fillRect(0,0,cw,ch);
  /* land dots, with a ripple reveal after a language switch */
  var d=M.dots,rv=M.reveal?(now-M.t0)/900:2,fx=cw/2,fy=ch*0.55,maxd=Math.hypot(cw,ch);
  g.fillStyle='rgba(124,178,222,.5)';
  for(i=0;i<d.length;i+=2){
    var px=SX(d[i]),py=SY(d[i+1]);if(px<-3||py<-3||px>cw+3||py>ch+3)continue;
    if(rv<1.4){var q=rv*maxd*1.1-Math.hypot(px-fx,py-fy);if(q<=0)continue;g.globalAlpha=Math.min(1,q/60);}
    g.fillRect(px-1.15,py-1.15,2.3,2.3);
  }
  g.globalAlpha=1;if(rv>=1.4)M.reveal=false;
  /* route, drawn in after a mode or language switch */
  var rp=M.route?clamp((now-M.route)/1100,0,1):1;if(rp>=1)M.route=0;
  var shown=rp*pts.length;
  for(i=0;i<pts.length;i++){
    if(i>=shown)break;
    var a=i===0?M.tk:pts[i-1],b=pts[i],part=Math.min(1,shown-i),done=unitRec(L,ids[i]).n>0&&!(M.fly&&i===M.fly.to);
    var A={x:SX(a.x),y:SY(a.y)},Bp={x:SX(b.x),y:SY(b.y)};
    g.beginPath();g.moveTo(A.x,A.y);
    for(var k=1;k<=16;k++){var sp=segPoint(A,Bp,part*k/16);g.lineTo(sp.x,sp.y);}
    if(done){g.setLineDash([]);g.strokeStyle=M.acc;g.lineWidth=2.2;g.globalAlpha=.9;}
    else{g.setLineDash([3,5]);g.strokeStyle='rgba(255,255,255,.32)';g.lineWidth=1.2;g.globalAlpha=1;}
    g.stroke();
  }
  g.setLineDash([]);g.globalAlpha=1;
  /* Tokyo marker or edge arrow */
  var tx=SX(M.tk.x),ty=SY(M.tk.y);g.font='700 10px "B612 Mono",monospace';g.textAlign='center';
  if(tx>8&&tx<cw-8&&ty>96&&ty<ch-104){g.fillStyle='#fff';g.beginPath();g.arc(tx,ty,3.2,0,6.283);g.fill();g.fillStyle='rgba(255,255,255,.85)';g.fillText('TOKYO',tx,ty+15);}
  else{var ex=clamp(tx,18,cw-18),ey=clamp(ty,Math.min(110,ch/2),Math.max(ch-112,ch/2)),an=Math.atan2(ty-ey,tx-ex);g.save();g.translate(ex,ey);g.rotate(an);g.fillStyle='rgba(255,255,255,.7)';g.beginPath();g.moveTo(9,0);g.lineTo(-4,-6);g.lineTo(-4,6);g.closePath();g.fill();g.restore();g.fillStyle='rgba(255,255,255,.75)';g.textAlign=ex>cw/2?'right':'left';g.fillText('TOKYO',ex+(ex>cw/2?-14:14),ey+4);}
  /* cities */
  var pulse=reduceMotion?.5:(Math.sin(now/380)+1)/2;
  for(i=0;i<pts.length;i++){
    if(i>=shown+1)break;
    var P=pts[i],x=SX(P.x),y=SY(P.y),dn=unitRec(L,ids[i]).n>0;if(x<-10||y<-10||x>cw+10||y>ch+10)continue;
    if(i===M.next){g.strokeStyle='rgba(255,207,38,'+(0.85-0.6*pulse)+')';g.lineWidth=1.6;g.beginPath();g.arc(x,y,5+9*pulse,0,6.283);g.stroke();g.fillStyle='#ffcf26';g.beginPath();g.arc(x,y,4.2,0,6.283);g.fill();}
    else if(dn){g.fillStyle=M.acc;g.beginPath();g.arc(x,y,3.6,0,6.283);g.fill();g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=1;g.stroke();}
    else{g.fillStyle='rgba(255,255,255,.55)';g.beginPath();g.arc(x,y,2.2,0,6.283);g.fill();}
  }
  if(M.next>=0&&M.next<shown+1){var np=pts[M.next],nc=cityFor(L,M.next);g.fillStyle='#ffcf26';g.textAlign='center';g.font='700 11px "B612 Mono",monospace';g.fillText(nc[0],SX(np.x),SY(np.y)-14);}
  /* plane */
  var pos,ang=-0.6,curI=curPos(L);
  if(F2){
    var a2=F2.from>=0?pts[F2.from]:M.tk,b2=pts[F2.to],A2={x:SX(a2.x),y:SY(a2.y)},B2={x:SX(b2.x),y:SY(b2.y)};
    if(ft>0){g.strokeStyle='rgba(255,255,255,.6)';g.lineWidth=2;g.beginPath();for(var s2=0;s2<=24;s2++){var q2=segPoint(A2,B2,fe*s2/24);if(s2)g.lineTo(q2.x,q2.y);else g.moveTo(q2.x,q2.y);}g.stroke();}
    var spp=segPoint(A2,B2,fe);pos=spp;ang=Math.atan2(spp.dy,spp.dx);
    if(ft>=1){M.fly=null;M.cam=M.cam1;}
  }else{
    var base=curI>=0&&pts[curI]?pts[curI]:M.tk;pos={x:SX(base.x),y:SY(base.y)};
    var tgt=M.next>=0?pts[M.next]:null;if(tgt)ang=Math.atan2(SY(tgt.y)-pos.y,SX(tgt.x)-pos.x);
  }
  if(rp>0.3){
    var bob=reduceMotion?0:Math.sin(now/600)*1;
    g.save();g.translate(pos.x,pos.y+bob);g.rotate(ang);g.scale(.85,.85);
    g.shadowColor='rgba(255,255,255,.7)';g.shadowBlur=10;g.fillStyle='#fff';g.fill(M.plane);g.restore();
  }
  M.raf=requestAnimationFrame(mapFrame);
}
var PAR={on:false,tick:false};
function bindParallax(){
  if(PAR.on)return;PAR.on=true;
  window.addEventListener('scroll',function(){
    if(PAR.tick||view!=='home'||reduceMotion)return;PAR.tick=true;
    requestAnimationFrame(function(){
      PAR.tick=false;var hi=$('heroIn');if(!hi)return;
      var y=Math.max(0,window.scrollY),k=Math.min(y,600);
      hi.style.transform='translateY('+(k*0.38).toFixed(1)+'px) scale('+(1+k*0.00025).toFixed(4)+')';
      hi.style.setProperty('--hud',Math.max(0,1-k/380).toFixed(3));
    });
  },{passive:true});
}
