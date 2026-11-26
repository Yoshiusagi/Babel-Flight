/* ================= HOME: hero route map + itinerary ================= */
var pendingFly=null,MAP=null,MODEPREV=null,HOME_ANIM='first',DOTC={},MAPVIEW=null; /* MAPVIEW: the camera and the plane as last drawn (map units): a mode switch glides from there */
/* 駅 i の街。CITY_UID がある言語は駅のidで決め、番号がずれても街はずれない（id がない駅は前の駅の街）。 */
function cityFor(L,i,ids){
  var m=CITY_UID&&CITY_UID[L],c=CITIES[L];
  if(m){ids=ids||pathIds(L);
    for(var k=Math.min(i,ids.length-1);k>=0;k--){if(m[ids[k]])return m[ids[k]];}
    for(k=Math.max(i+1,0);k<ids.length;k++){if(m[ids[k]])return m[ids[k]];}
  }
  return c[((i%c.length)+c.length)%c.length];
}
function posKey(L){return L+'-'+save.mode;}
/* where the plane is on the path (-1: Tokyo). The path can get shorter (another job, an exam goal), so a place past its end is not used */
function curPos(L){var p=save.pos&&save.pos[posKey(L)];return typeof p==='number'&&p<pathIds(L).length?p:-1;}
/* 地図は世界全体の座標（経度-180〜180、1度=MAPK）。左右にスクロールすると、経度がまわって世界をぐるっと回れる */
var MAPK=1000/360,LAND_W=720,LAND_H=280,LAND=null;/* 陸の格子は0.5度ごと */
function proj(L,lat,lon){return {x:(lon+180)*MAPK,y:(80-lat)*MAPK};}
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
    (x?'<button type="button" data-mode-set="exam" aria-pressed="'+(m==='exam')+'"><b>検定</b><small>'+esc(xSwLabel(save.lang))+'</small></button>':'')+'</div>';
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
function myLangs(){return learnOrder().filter(function(k){return k===save.lang||langStarted(k);});}
var LANG_SOON=[];
function heroLangs(){
  return '<div class="hero-langs" role="group" aria-label="学ぶ言語">'+myLangs().map(function(k){
    return '<button class="hl" type="button" data-lang="'+k+'" style="--dc:var(--c-'+k+')" aria-pressed="'+(k===save.lang)+'"><b class="mono">'+LANGS[k].code+'</b><small>'+esc(LANGS[k].name)+'</small></button>';
  }).join('')+'<button class="hl hl-more" type="button" data-lang-pick aria-label="言語を選ぶ"><b class="mono">＋</b><small>ほかの言語</small></button></div>';
}
function langPickSheet(){
  var mine=myLangs(),rest=learnOrder().filter(function(k){return mine.indexOf(k)<0;});
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
    (LANG_SOON.length?'<p class="dim hint">準備中: '+LANG_SOON.join('・')+'</p>':'')+
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
  if(!uiModeOpen(save.mode))return '<section class="card empty-job mode-soon"><span class="lbl">'+esc(MODE_JP[save.mode]||'')+'</span><h2 class="jh">'+esc(MODE_JP[save.mode]||'このモード')+'は準備中です</h2>'+
    '<p class="dim" style="font-size:13.5px;margin-top:4px">この表示言語では、今は日常会話モードで、あいさつ・旅行フレーズ・旅行の場面の会話を学べます。ほかのモードも順番に翻訳していきます。</p>'+
    '<button class="go" type="button" data-mode-set="daily">日常会話モードで学ぶ</button></section>';
  var LG=LANGS[L],p=profById(save.prof),what=save.mode==='job'&&p?p.jp+'の専門会話':MODE_JP[save.mode]||'このモード';
  return '<section class="card empty-job mode-soon"><span class="lbl">'+esc(MODE_JP[save.mode]||'')+' ・ '+esc(LG.name)+'</span><h2 class="jh">'+esc(LG.name)+'の'+esc(what)+'は準備中です</h2>'+
    '<p class="dim" style="font-size:13.5px;margin-top:4px">今は日常会話モードで、あいさつ・旅行フレーズ・旅行の場面の会話を学べます。ほかのモードも順番に増やしていきます。</p>'+
    '<button class="go" type="button" data-mode-set="daily">日常会話モードで学ぶ</button></section>';
}
function homeHTML(){
  var L=save.lang,LG=LANGS[L],p=profById(save.prof),anim=!!HOME_ANIM&&!reduceMotion,h=topBar('','progress');
  var ids=pathIds(L);
  if(!ids.length){
    var pick=save.mode==='job'&&!(p&&jobOpen(p.id))&&uiModeOpen('job');
    h+='<section class="hero empty"><div class="hero-in"><div class="hud"><div class="hud-l"><span class="lbl">'+esc(LG.cityEn)+' ・ '+esc(LG.name)+'</span><b class="mono">'+(pick?'職業を選ぼう':'準備中')+'</b></div></div>'+heroLangs()+'</div></section>'+modeSwitch();
    if(!pick){h+=modeSoonHTML(L);return h;}
    h+='<section class="card empty-job"><span class="lbl">職業モード</span><h2 class="jh">まずは職業を選ぼう</h2><p class="dim" style="font-size:13.5px;margin-top:4px">パイロット、医療、IT、美容師など13職業から選べます。選んだ職業の専門会話が、地図の上に並びます。</p><button class="go" type="button" data-picker>職業を選ぶ</button></section>';
    return h;
  }
  var secs=pathSections(L),done=unitsDone(L,ids),total=ids.length,nextId=nextPathUnit(L),ni=Math.max(0,ids.indexOf(nextId));
  var nc=cityFor(L,ni),cp=curPos(L),from=cp>=0?cityFor(L,cp):TOKYO,dist=Math.round(haversine(from,nc));
  h+='<section class="hero" id="hero"><div class="hero-in" id="heroIn"><canvas id="map" class="mapcv" role="img" aria-label="'+esc(LG.name)+'のルートマップ。次の目的地は'+esc(nc[1])+'"></canvas>'+
     '<div class="hud"><div class="hud-l"><span class="lbl">NEXT STOP ・ '+esc(LG.name)+'</span><b class="mono">'+flapHTML(nc[0],anim)+'</b><small>'+esc(nc[1])+' ・ '+esc(unitTitle(nextId))+'</small></div>'+
     '<div class="hud-r"><span class="lbl">到着</span><b class="mono">'+done+'<small>/'+total+'</small></b><span class="gate mono">GATE '+esc(gateNo(L,nextId))+' ・ '+esc(flightNo(L,nextId))+'</span>'+(hidOn('plate')?'<span class="plate mono">SKYLARK</span>':'')+'</div></div>'+
     '<div class="hud-foot mono"><span>'+fmtCoord(nc)+'</span><span>'+(cp>=0?esc(from[1]):'東京')+'から '+fmt(dist)+' km</span></div>'+
     heroLangs()+'</div></section>';
  h+=modeSwitch();
  if(typeof tuneCardHTML==='function')h+=tuneCardHTML();
  if(typeof examHomeHTML==='function')h+=examHomeHTML(L);
  if(save.mode==='job'){
    h+='<button class="course" type="button" data-picker><span class="ccode">'+p.code+'</span><span class="ctext"><span class="lbl">職業コース</span><b>'+esc(p.jp)+'</b><small>タップして変更 ・ 13職業から選べます</small></span><span class="chev" aria-hidden="true">›</span></button>';
    if(p.id==='pilot'&&!BF_APP)h+='<button class="course atcbtn" type="button" data-atc><span class="ccode">ATC</span><span class="ctext"><span class="lbl">AIロールプレイ ・ 英語</span><b>AI管制官と交信練習</b><small>'+esc(atcFill('{0}で、管制官役のAIと無線交信',[atcApt().jp]))+'</small></span><span class="chev" aria-hidden="true">›</span></button>';
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
  var m=scMeta(L,uid),u=UNITS[L][uid],LG=LANGS[L],rec=unitRec(L,uid),loc=isLocalSc(uid);
  return '<section class="scene-card"><div class="sc-top"><span class="avatar" aria-hidden="true">'+esc(m.ini)+'</span><div><span class="lbl">会話の場面 ・ '+(loc?'英語(現地の人)':esc(LG.name))+'</span><b>'+esc(m.jp)+'</b><small>相手: '+esc(m.role)+(rec.n>0?' ・ '+rec.n+'回クリア':'')+'</small></div></div>'+
    '<p class="sc-sit">'+esc(m.sit)+'</p><div class="sc-meta mono">'+u.turns.length+'往復 ・ 約3分 ・ '+flightNo(L,uid)+'</div>'+(loc?localAccHTML(L):'')+
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
/* 世界一周できる言語は、地図の中身を少し上にずらす（上の空いているところに地図を寄せる） */
function mapCY(M){return (typeof worldLang==='function'&&worldLang(M.L)&&typeof gimmickOn==='function'&&gimmickOn('pan'))?M.ch*0.22/M.s:0;}
function landGrid(){
  if(LAND)return LAND;
  var polys=[];
  (typeof WORLD_LAND!=='undefined'?WORLD_LAND:[]).forEach(function(p){polys.push({p:p,bx:polyBox(p)});});
  Object.keys(REGIONS).forEach(function(k){(REGIONS[k].polys||[]).forEach(function(p){polys.push({p:p,bx:polyBox(p)});});});
  var G=new Uint8Array(LAND_W*LAND_H);
  for(var r=0;r<LAND_H;r++){var lat=80-(r+0.5)/2;for(var c=0;c<LAND_W;c++){var lon=(c+0.5)/2-180;
    for(var k=0;k<polys.length;k++){var q=polys[k],bx=q.bx;if(lon<bx[0]||lon>bx[1]||lat<bx[2]||lat>bx[3])continue;if(inPoly(lon,lat,q.p)){G[r*LAND_W+c]=1;break;}}
  }}
  return (LAND=G);
}
/* 見えている範囲の陸の点（世界は経度がまわるので、どこまで動かしても陸が続く） */
function mapDotsView(cx,cy,cw,ch,s){
  var G=landGrid(),step=7/s,out=[],hw=cw/2/s+step,hh=ch/2/s+step;
  for(var y=Math.floor((cy-hh)/step)*step;y<=cy+hh;y+=step){var r=Math.floor(y/MAPK*2);if(r<0||r>=LAND_H)continue;
    for(var x=Math.floor((cx-hw)/step)*step;x<=cx+hw;x+=step){var c=Math.floor(x/MAPK*2);c=((c%LAND_W)+LAND_W)%LAND_W;if(G[r*LAND_W+c])out.push(x,y);}}
  return out;
}
function segPoint(a,b,t){
  var mx=(a.x+b.x)/2,my=(a.y+b.y)/2,dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy)||1,c={x:mx-dy*0.18,y:my+dx*0.18-len*0.08};
  var u=1-t;return {x:u*u*a.x+2*u*t*c.x+t*t*b.x,y:u*u*a.y+2*u*t*c.y+t*t*b.y,c:c,dx:2*u*(c.x-a.x)+2*t*(b.x-c.x),dy:2*u*(c.y-a.y)+2*t*(b.y-c.y)};
}
/* 地図を指で動かせる範囲: 路線の端から 3cm（CSSの96dpi基準で113px）まで。それ以上は動かない */
var PAN_EXTRA_PX=3*96/2.54;
function panRange(M){var s=M.s;return [(M.cam.x-M.panHi)*s,(M.cam.x-M.panLo)*s];}
function mapMount(){
  var ind=document.querySelector('.modesw-ind');
  if(ind&&MODEPREV&&MODEPREV!==save.mode){requestAnimationFrame(function(){requestAnimationFrame(function(){ind.className='modesw-ind '+save.mode+' mv';clearTimeout(ind._mvT);ind._mvT=setTimeout(function(){ind.classList.remove('mv');},520);});});}
  MODEPREV=save.mode;
  var cv=$('map'),hero=$('hero');
  var anim=HOME_ANIM;HOME_ANIM=null;
  if(MAP&&MAP.raf)cancelAnimationFrame(MAP.raf);
  if(!cv||!hero)return;
  var L=save.lang,R=REGIONS[L],ids=pathIds(L),cw=hero.clientWidth||360;
  var pts=ids.map(function(id,i){var c=cityFor(L,i,ids);return proj(L,c[2],c[3]);});
  var bx=[1e9,-1e9,1e9,-1e9];pts.forEach(function(p){bx[0]=Math.min(bx[0],p.x);bx[1]=Math.max(bx[1],p.x);bx[2]=Math.min(bx[2],p.y);bx[3]=Math.max(bx[3],p.y);});
  var pw=Math.max(bx[1]-bx[0],40),ph=Math.max(bx[3]-bx[2],40),padx=pw*0.16+8,pady=ph*0.2+14;
  var bw=pw+2*padx,bh=ph+2*pady+40;
  var chMax=Math.max(320,Math.min(Math.round(window.innerHeight*0.6),560));
  /* the map's height depends on the screen only, not on the route: a short route (職業) used to zoom in and grow the map.
     The route is fitted to that height, and a wide route pans with the plane instead. */
  var heroH=Math.round(Math.min(chMax,Math.max(330,cw*0.92)));
  if(typeof gimmickOn==='function'&&gimmickOn('bigmap'))heroH=Math.round(Math.max(heroH,Math.min(innerHeight*0.6,cw*1.45)));
  var s=heroH/bh;
  /* スイート: the map covers the whole first screen, so it is fitted to that screen's height */
  if(typeof MAP_FULL!=='undefined'&&MAP_FULL){var spEl=hero.closest('.sp-next');if(spEl&&spEl.clientHeight){heroH=spEl.clientHeight;s=heroH/bh;}}
  /* 試作「ページ全体の地図」: the map keeps its scale, but its box grows to the whole screen, so more of the map shows.
     The cards below still start where they did (a negative margin), and the map stays behind them as they scroll. */
  var fitH=heroH;
  if(typeof gimmickOn==='function'&&gimmickOn('pagemap')&&!MAP_FULL)heroH=Math.round(Math.max(heroH,innerHeight));
  /* a freshly drawn map starts at its CSS height: set the real height at once, not with the 0.5s height transition
     (that transition pushed every card above and below up and down on each change) */
  hero.style.transition='none';hero.style.height=heroH+'px';void hero.offsetHeight;hero.style.transition='';
  hero.style.marginBottom=(heroH>fitH)?(-(heroH-fitH))+'px':'';
  /* 世界一周できる言語は、世界の半分ほどの横幅が見えるくらいに引いて見せる（オーストラリアなどが横に出ないように） */
  if(typeof worldLang==="function"&&worldLang(L)&&typeof gimmickOn==="function"&&gimmickOn("pan")){s=Math.min(s,cw/1000*2);}
  var dpr=Math.min(2,window.devicePixelRatio||1);
  cv.width=Math.round(cw*dpr);cv.height=Math.round(heroH*dpr);cv.style.height=heroH+'px';
  var vw=cw/s,vh=heroH/s,follow=vw<bw*0.98;
  var X0=bx[0]-padx,X1=bx[1]+padx,Y0=bx[2]-pady-28,Y1=bx[3]+pady+12;
  /* keep the next stop (and its name above it) on screen: clear of the HUD at the top, the language chips at
     the bottom and the side edges, whatever the route's shape */
  function keepNext(c){
    var nx=nextI>=0?pts[nextI]:null;if(!nx)return c;
    var sx=(nx.x-c.x)*s+cw/2,sy=(nx.y-c.y)*s+heroH/2,mx=72,top=138,bot=heroH-112;
    if(sx<mx)c.x-=(mx-sx)/s;else if(sx>cw-mx)c.x+=(sx-(cw-mx))/s;
    if(bot>top){if(sy>bot)c.y+=(sy-bot)/s;else if(sy<top)c.y-=(top-sy)/s;}
    return c;
  }
  function camAt(focus){
    if(!follow)return keepNext({x:(X0+X1)/2,y:(Y0+Y1)/2});
    return keepNext({x:clamp(focus.x,X0+vw/2,X1-vw/2),y:clamp(focus.y,Math.min(Y0+vh/2,(Y0+Y1)/2),Math.max(Y1-vh/2,(Y0+Y1)/2))});
  }
  var tk=proj(L,TOKYO[2],TOKYO[3]),nextI=ids.indexOf(nextPathUnit(L));
  function focusFor(cur){var a=cur>=0?pts[cur]:tk,b=nextI>=0?pts[nextI]:a;return {x:(a.x+b.x)/2,y:(a.y+b.y)/2};}
  var fly=null;
  if(pendingFly&&pendingFly.key===posKey(L)){fly={from:pendingFly.from,to:pendingFly.to,t0:performance.now()+350};pendingFly=null;}
  var cur=fly?fly.from:curPos(L);
  var cam0=camAt(focusFor(cur)),cam1=camAt(focusFor(fly?fly.to:cur));
  var dots=null;
  /* a mode switch glides the plane and the camera from where they were, not a jump: the map's units are the same in every mode */
  var glide=null,tgtP=cur>=0?pts[cur]:tk;
  if(MAPVIEW&&MAPVIEW.L===L&&!fly&&!reduceMotion&&anim!=='lang'&&anim!=='first'&&(MAPVIEW.plane.x!==tgtP.x||MAPVIEW.plane.y!==tgtP.y))
    glide={cam0:{x:MAPVIEW.cam.x,y:MAPVIEW.cam.y},plane0:{x:MAPVIEW.plane.x,y:MAPVIEW.plane.y},t0:performance.now()};
  MAP={cv:cv,ctx:cv.getContext('2d'),dpr:dpr,cw:cw,ch:heroH,s:s,L:L,R:R,ids:ids,pts:pts,tk:tk,next:nextI,dots:dots,cam:cam0,cam0:cam0,cam1:cam1,fly:fly,
       acc:cssVar('--c-'+L),plane:new Path2D(PLANE_D),t0:performance.now(),reveal:(anim==='lang'||anim==='first')&&!reduceMotion,route:(anim&&!reduceMotion)?performance.now()+(anim==='mode'?0:250):0,raf:0,cache:null};
  MAP.glide=glide;
  /* 路線の左右の端（見えている幅の中心が動ける範囲）を、3cm ぶんだけ広げて止める */
  (function(){var a=X0+vw/2,b=X1-vw/2,ex=PAN_EXTRA_PX/s;MAP.panLo=Math.min(a,b)-ex;MAP.panHi=Math.max(a,b)+ex;})();
  /* the plane rises up into the map when it opens (not after a language switch) */
  MAP.riseT=(!reduceMotion&&anim!=='lang')?performance.now():0;
  cv.onclick=function(ev){
    var r=cv.getBoundingClientRect(),M=MAP,x=(ev.clientX-r.left-M.cw/2)/M.s+M.cam.x-(M.panX||0)/M.s,y=(ev.clientY-r.top-M.ch/2)/M.s+M.cam.y+mapCY(M),best=-1,bd=(typeof gimmickOn==='function'&&gimmickOn('citytap')?26:18)/M.s;
    if(performance.now()-(M.dragT||0)<300)return;
    M.pts.forEach(function(p,i){var dd=Math.hypot(p.x-x,p.y-y);if(dd<bd){bd=dd;best=i;}});
    if(best>=0){if(typeof gimmickOn==='function'&&gimmickOn('citytap'))gimmickCityCard(cityFor(M.L,best),M.L,function(){openNodeSheet(M.ids[best]);});else openNodeSheet(M.ids[best]);}
  };
  bindParallax();
  mapFrame();
}
/* tapping a city shows its local time and the difference from Tokyo first (a second tap opens the lesson).
   The offset is estimated from the longitude: 15 degrees per hour. */
function tzTipHide(){var t=document.getElementById('tzTip');if(t)t.remove();}
function showTzTip(L,i,p){
  var M=MAP;if(!M||!M.cv)return;var c=cityFor(L,i,M.ids);
  tzTipHide();
  var off=Math.round(c[3]/15),d=off-9,now=new Date(),h=(now.getUTCHours()+off+48)%24,mi=String(now.getUTCMinutes()).padStart(2,'0');
  var diff=d>0?'東京より'+d+'時間進んでいます':d<0?'東京より'+(-d)+'時間遅れています':'東京と同じ時間です';
  var r=M.cv.getBoundingClientRect(),x=r.left+(p.x-M.cam.x)*M.s+M.cw/2,y=r.top+(p.y-M.cam.y)*M.s+M.ch/2;
  var t=document.createElement('div');t.id='tzTip';t.setAttribute('role','status');
  t.textContent=c[0]+'　今 '+h+':'+mi+'（'+diff+'）';
  t.style.cssText='position:fixed;z-index:60;transform:translate(-50%,-100%);padding:8px 12px;border-radius:12px;background:rgba(7,16,34,.92);color:#fff;font:600 12px -apple-system,BlinkMacSystemFont,sans-serif;white-space:nowrap;pointer-events:none;box-shadow:0 4px 14px rgba(0,0,0,.35);left:'+Math.round(clamp(x,120,window.innerWidth-120))+'px;top:'+Math.round(y-14)+'px';
  document.body.appendChild(t);
  clearTimeout(M.tipT2);M.tipT2=setTimeout(tzTipHide,3500);
}
function mapFrame(){
  var M=MAP;if(!M||!document.body.contains(M.cv)){if(M)M.raf=0;return;}
  var g=M.ctx,now=performance.now(),L=M.L,pts=M.pts,ids=M.ids,i,s=M.s,cw=M.cw,ch=M.ch;
  if(typeof gimmickPanSetup==='function')gimmickPanSetup(M);
  if(typeof gimmickHoverSetup==='function')gimmickHoverSetup(M);
  /* camera (pans with the plane when the route is wider than the screen) */
  var F2=M.fly,ft=0,fe=0;
  if(F2){ft=reduceMotion?1:clamp((now-F2.t0)/1800,0,1);fe=ft<.5?2*ft*ft:1-Math.pow(-2*ft+2,2)/2;M.cam={x:M.cam0.x+(M.cam1.x-M.cam0.x)*fe,y:M.cam0.y+(M.cam1.y-M.cam0.y)*fe};}
  /* after a mode switch the camera eases from where it was to the new place (900ms, no lag) */
  var gl=M.glide,ge=1;
  if(gl){var gt=clamp((now-gl.t0)/900,0,1);ge=gt<.5?4*gt*gt*gt:1-Math.pow(-2*gt+2,3)/2;if(!F2)M.cam={x:gl.cam0.x+(M.cam0.x-gl.cam0.x)*ge,y:gl.cam0.y+(M.cam0.y-gl.cam0.y)*ge};if(gt>=1)M.glide=null;}
  if(M.panLo!=null){var pr=panRange(M);M.panX=clamp(M.panX||0,pr[0],pr[1]);}
  var cx=M.cam.x-(M.panX||0)/s,cy=M.cam.y+mapCY(M);
  function SX(x){return (x-cx)*s+cw/2;}function SY(y){return (y-cy)*s+ch/2;}
  g.setTransform(M.dpr,0,0,M.dpr,0,0);
  var bg=g.createLinearGradient(0,0,0,ch),DT=gimmickDay();bg.addColorStop(0,DT[0]);bg.addColorStop(1,DT[1]);g.fillStyle=bg;g.fillRect(0,0,cw,ch);gimmickSky(g,cw,ch,now);
  /* land dots, with a ripple reveal after a language switch */
  var d=mapDotsView(cx,cy,cw,ch,s),rv=M.reveal?(now-M.t0)/900:2,fx=cw/2,fy=ch*0.55,maxd=Math.hypot(cw,ch);
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
    if(done){g.setLineDash([]);gimmickTrail(g,M.acc);}
    else{g.setLineDash([3,5]);g.strokeStyle='rgba(255,255,255,.32)';g.lineWidth=1.2;g.globalAlpha=1;}
    g.stroke();g.shadowBlur=0;
  }
  g.setLineDash([]);g.globalAlpha=1;
  /* Tokyo marker or edge arrow */
  var tx=SX(M.tk.x),ty=SY(M.tk.y);g.font='700 10px "B612 Mono",monospace';g.textAlign='center';
  if(M.L==='ja'){/* the 日本語 route starts in Tokyo itself: no separate home marker */}
  else if(tx>8&&tx<cw-8&&ty>96&&ty<ch-104){g.fillStyle='#fff';g.beginPath();g.arc(tx,ty,3.2,0,6.283);g.fill();g.fillStyle='rgba(255,255,255,.85)';g.fillText('TOKYO',tx,ty+15);}
  else{var ex=clamp(tx,18,cw-18),ey=clamp(ty,Math.min(110,ch/2),Math.max(ch-112,ch/2)),an=Math.atan2(ty-ey,tx-ex);g.save();g.translate(ex,ey);g.rotate(an);g.fillStyle='rgba(255,255,255,.7)';g.beginPath();g.moveTo(9,0);g.lineTo(-4,-6);g.lineTo(-4,6);g.closePath();g.fill();g.restore();g.fillStyle='rgba(255,255,255,.75)';g.textAlign=ex>cw/2?'right':'left';g.fillText('TOKYO',ex+(ex>cw/2?-14:14),ey+4);}
  /* cities */
  var pulse=reduceMotion?.5:(Math.sin(now/380)+1)/2;
  var lbR=[];/* 都市名の場所（重なる名前は出さない） */
  for(i=0;i<pts.length;i++){
    if(i>=shown+1)break;
    var P=pts[i],x=SX(P.x),y=SY(P.y),dn=unitRec(L,ids[i]).n>0;if(x<-10||y<-10||x>cw+10||y>ch+10)continue;
    var dk=(typeof gimmickOn==='function'&&gimmickOn('bigdot'))?1.5:1;
    if(i===M.next){g.strokeStyle='rgba(255,207,38,'+(0.85-0.6*pulse)+')';g.lineWidth=1.6;g.beginPath();g.arc(x,y,(5+9*pulse)*dk,0,6.283);g.stroke();g.fillStyle='#ffcf26';g.beginPath();g.arc(x,y,4.2*dk,0,6.283);g.fill();}
    else if(dn){g.fillStyle=M.acc;g.beginPath();g.arc(x,y,3.6*dk,0,6.283);g.fill();g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=1;g.stroke();}
    else{g.fillStyle='rgba(255,255,255,.55)';g.beginPath();g.arc(x,y,2.2*dk,0,6.283);g.fill();}
    /* 試作「都市名」: 空港の横に、都市名（日本語）を小さく出す（次の目的地は黄色の大きい表示があるので出さない） */
    if(i!==M.next&&typeof gimmickOn==='function'&&gimmickOn('citynames')){var cn=cityFor(L,i,M.ids)[1],lw=cn.length*11+6,lx=x+6,ly=y-6,lr={x:lx,y:ly,w:lw,h:13},clash=lbR.some(function(q){return lr.x<q.x+q.w&&q.x<lr.x+lr.w&&lr.y<q.y+q.h&&q.y<lr.y+lr.h;});if(!clash&&!(M.next>=0&&SX(pts[M.next].x)>lx-16&&SX(pts[M.next].x)<lx+lw&&Math.abs(SY(pts[M.next].y)-y)<22)){lbR.push(lr);g.font='600 10px system-ui,sans-serif';g.textAlign='left';g.lineJoin='round';g.strokeStyle='rgba(10,14,26,.85)';g.lineWidth=3;g.strokeText(cn,lx,y+3);g.fillStyle=dn?'rgba(255,255,255,.95)':'rgba(255,255,255,.7)';g.fillText(cn,lx,y+3);}}
  }
  if(M.next>=0&&M.next<shown+1){var np=pts[M.next],nc=cityFor(L,M.next,M.ids);g.fillStyle='#ffcf26';g.textAlign='center';g.font='700 11px "B612 Mono",monospace';g.fillText(nc[0],SX(np.x),SY(np.y)-14);}
  /* plane */
  var pos,ang=-0.6,curI=curPos(L);
  if(F2){
    var a2=F2.from>=0?pts[F2.from]:M.tk,b2=pts[F2.to],A2={x:SX(a2.x),y:SY(a2.y)},B2={x:SX(b2.x),y:SY(b2.y)};
    if(ft>0){g.strokeStyle='rgba(255,255,255,.6)';g.lineWidth=2;g.beginPath();for(var s2=0;s2<=24;s2++){var q2=segPoint(A2,B2,fe*s2/24);if(s2)g.lineTo(q2.x,q2.y);else g.moveTo(q2.x,q2.y);}g.stroke();}
    var spp=segPoint(A2,B2,fe);pos=spp;ang=Math.atan2(spp.dy,spp.dx);M.planeW={x:a2.x+(b2.x-a2.x)*fe,y:a2.y+(b2.y-a2.y)*fe};
    if(ft>=1){M.fly=null;M.cam=M.cam1;}
  }else{
    var base=curI>=0&&pts[curI]?pts[curI]:M.tk;
    if(gl)base={x:gl.plane0.x+(base.x-gl.plane0.x)*ge,y:gl.plane0.y+(base.y-gl.plane0.y)*ge};
    M.planeW=base;pos={x:SX(base.x),y:SY(base.y)};
    var tgt=M.next>=0?pts[M.next]:null;if(tgt)ang=Math.atan2(SY(tgt.y)-pos.y,SX(tgt.x)-pos.x);
  }
  if(gl&&ge<1){var p0=gl.plane0;g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=1.6;g.setLineDash([3,5]);g.beginPath();g.moveTo(SX(p0.x),SY(p0.y));g.lineTo(pos.x,pos.y);g.stroke();g.setLineDash([]);}
  if(rp>0.3||gl){
    var bob=reduceMotion?0:Math.sin(now/600)*1;
    g.save();g.translate(pos.x,pos.y+bob+gimmickIntro(now,M,ch));g.rotate(ang);g.scale(.85,.85);
    g.shadowColor='rgba(255,255,255,.7)';g.shadowBlur=10;g.fillStyle=(typeof dfPlaneFill==='function'&&dfPlaneFill(g))||'#fff';g.fill(M.plane);g.restore();
  }
  gimmickFront(g,cw,ch,now,M);
  MAPVIEW={L:M.L,cam:{x:M.cam.x,y:M.cam.y},plane:M.planeW||M.cam};
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
      /* the bottom of the map melts away as the page scrolls (the band grows from 0 to 120px) */
      var hr=$('hero');if(hr)hr.style.setProperty('--melt',Math.min(1,Math.max(0,(y-40)/260)).toFixed(3));
    });
  },{passive:true});
}
