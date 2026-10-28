/* ================= SHARE (standalone site only) =================
   Makes a 1080×1920 picture of a finished lesson, your progress or your status. The picture is drawn
   in the browser and never uploaded. It goes to the phone's share menu (Instagram, TikTok, LINE…),
   where X, Threads, Instagram, TikTok, LINE… are all listed. Only the picture is passed: with text
   added, iPhones treat the share as text and show no picture at the top. PCs (no share menu for
   pictures in some browsers) also get X / Threads / Facebook links, save and copy. */
var SHR={on:false,kind:'',data:null,land:null,blob:null,file:null,url:'',seq:0,copyT:0};
try{SHR.on=!window.claude&&!!document.createElement('canvas').getContext;}catch(e){SHR.on=false;}
var SHR_W=1080,SHR_H=1920,SHR_CARD={x:90,y:410,w:900,h:1060};
var SHR_F={disp:'"Barlow Condensed","IBM Plex Sans JP",sans-serif',body:'"IBM Plex Sans JP","Hiragino Sans","Hiragino Kaku Gothic ProN","Yu Gothic",sans-serif',mono:'"B612 Mono",ui-monospace,Menlo,monospace',emoji:'"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'};
var SHR_INK='#101a2b',SHR_SUB='#5b6676',SHR_PAPER='#fffaf0',SHR_TRACK='#ebe3d1';
var SHR_LC={ko:'#e8505b',en:'#2d6bff',es:'#f08a1c',it:'#17a068'};
/* status colours on the picture: [strip colour, text on the strip] */
var SHR_RC=[['#b9773f','#ffffff'],['#a3adbb','#121a26'],['#e3b23c','#1b1500'],['#8cc3d3','#0d1b24'],['#55c4f0','#05202c'],['#16233f','#ffd76a']];
var SHR_MODE={review:'復習フライト',weak:'弱点コース',ann:'機内アナウンス',lounge:'プラチナラウンジ',rem:'補習フライト',ai:'AIの例文練習',skip:'飛び級テスト'};

function shrSite(){try{if(!BF_APP&&bfOnSite()&&!/(^|\.)higgsfield\.ai$/.test(location.hostname))return location.origin;}catch(e){}return BF_SITE;}
function shrLink(){return shrSite()+'/';}
/* phones and tablets: the share menu is enough */
function shrMobile(){
  try{
    var ua=navigator.userAgent||'';
    if(/Android|iPhone|iPad|iPod|Mobile/i.test(ua))return true;
    if(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1)return true;
    return !!(window.matchMedia&&matchMedia('(pointer:coarse)').matches&&!matchMedia('(any-pointer:fine)').matches);
  }catch(e){return false;}
}
function shrName(){var n=String(save.name||'').trim();return n&&n!=='PASSENGER'?n:'';}
function shrNameOn(){try{return localStorage.getItem('babelflight.shareName')!=='0';}catch(e){return true;}}
function shrNameSet(v){try{localStorage.setItem('babelflight.shareName',v?'1':'0');}catch(e){}}
function shrDate(){return dayStr().replace(/-/g,'.');}
function shrIcon(){return '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 14V3"/><path d="M7.5 7.5 12 3l4.5 4.5"/><path d="M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8"/></svg>';}

/* ---- buttons placed by the shared views ---- */
function shareIconHTML(kind){
  if(!SHR.on)return '';
  var lb=kind==='status'?'ステータスをシェア':'進捗をシェア';
  return '<button class="share-ic" type="button" data-share="'+kind+'" aria-label="'+lb+'" title="'+lb+'">'+shrIcon()+'</button>';
}
function shareLandBtnHTML(d){
  if(!SHR.on||!d)return '';
  SHR.land=d;
  return '<button class="ghost share-go" type="button" data-share="lesson">'+shrIcon()+'<span>レッスンをシェア<small>Instagram・TikTok・X・Threads・Facebook</small></span></button>';
}

/* ---- what goes on each picture ---- */
function shrLesson(){
  var d=SHR.land;if(!d)return null;
  var LG=LANGS[d.L];
  return {L:d.L,langName:LG.name,title:d.unit?unitTitle(d.uid):(SHR_MODE[d.mode]||'フライト'),flight:d.flight||'',
    from:'TOKYO',fromJp:'東京',to:d.city||LG.cityEn,toJp:d.cityJp||LG.city,stars:d.stars,miles:d.miles,grade:d.grade?d.grade[1]:'',
    rank:d.rank,rankUp:!!d.rankUp,cap:!!d.cap};
}
function shrProgress(){
  return {streak:streakNow(),miles:save.miles,learned:totalLearned(),flights:save.flights,rank:statusIdx(),
    langs:ORDER.map(function(l){var ids=pathIdsFor(l);return {L:l,name:LANGS[l].name,done:unitsDone(l,ids),total:ids.length};})};
}
function shrStatus(){
  var now=Date.now(),stamps=0,p=profById(save.prof),ic=ICON_MAP[save.icon];
  ORDER.forEach(function(l){ALL_IDS[l].forEach(function(uid){if(unitRec(l,uid).n>0)stamps++;});});
  return {rank:statusIdx(now),win:milesWindow(now),miles:save.miles,stamps:stamps,prof:p?p.jp:'',cap:!!save.cap,icon:ic?ic[1]:''};
}
function shrText(kind,d){
  var t;
  if(kind==='lesson')t='Babel Flightで'+d.langName+'の「'+d.title+'」をクリアしました✈️ '+'★★★'.slice(0,d.stars)+' +'+fmt(d.miles)+'マイル';
  else if(kind==='progress')t='Babel Flightで語学の旅を続けています✈️ '+(d.streak>0?'連続'+d.streak+'日・':'')+fmt(d.miles)+'マイル・覚えたフレーズ'+fmt(d.learned);
  else t='Babel Flightのステータスは「'+RANKS[d.rank][0]+'」✈️ 総'+fmt(d.miles)+'マイル・スタンプ'+d.stamps+'個';
  return t+' #BabelFlight';
}
function shrIntent(where,kind,d){
  var tx=encodeURIComponent(shrText(kind,d)),u=encodeURIComponent(shrLink());
  if(where==='x')return 'https://x.com/intent/tweet?text='+tx+'&url='+u;
  if(where==='threads')return 'https://www.threads.com/intent/post?text='+tx+'&url='+u;
  return 'https://www.facebook.com/sharer/sharer.php?u='+u;
}

/* ---- canvas helpers ---- */
function shrRR(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();}
function shrFont(c,weight,size,fam){c.font=weight+' '+size+'px '+fam;}
/* shrink the font until the text fits */
function shrFit(c,text,weight,size,fam,maxW,minSize){
  var s=size;shrFont(c,weight,s,fam);
  while(s>(minSize||16)&&c.measureText(text).width>maxW){s-=2;shrFont(c,weight,s,fam);}
  return s;
}
/* letter-spaced text (canvas letterSpacing is not everywhere yet) */
function shrSpaced(c,text,x,y,sp,align){
  var ch=Array.from(text),w=0;ch.forEach(function(k,i){w+=c.measureText(k).width+(i?sp:0);});
  var sx=align==='center'?x-w/2:align==='right'?x-w:x,keep=c.textAlign;c.textAlign='left';
  ch.forEach(function(k){c.fillText(k,sx,y);sx+=c.measureText(k).width+sp;});
  c.textAlign=keep;return w;
}
function shrStar(c,cx,cy,r,fill){
  c.beginPath();
  for(var i=0;i<10;i++){var a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*0.45:r;c.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr);}
  c.closePath();c.fillStyle=fill;c.fill();
}
/* a small airliner seen from above, nose to the right */
function shrPlane(c,cx,cy,s,col){
  c.save();c.translate(cx,cy);c.scale(s/100,s/100);c.fillStyle=col;c.beginPath();
  c.moveTo(50,0);c.quadraticCurveTo(46,-6,38,-6);c.lineTo(8,-6);c.lineTo(-14,-44);c.lineTo(-26,-44);c.lineTo(-12,-6);c.lineTo(-34,-6);
  c.lineTo(-44,-20);c.lineTo(-52,-20);c.lineTo(-46,0);c.lineTo(-52,20);c.lineTo(-44,20);c.lineTo(-34,6);c.lineTo(-12,6);
  c.lineTo(-26,44);c.lineTo(-14,44);c.lineTo(8,6);c.lineTo(38,6);c.quadraticCurveTo(46,6,50,0);c.closePath();c.fill();c.restore();
}
function shrBarcode(c,x,y,w,h,seed,col){
  var s=0;for(var i=0;i<seed.length;i++)s=(s*31+seed.charCodeAt(i))>>>0;
  c.fillStyle=col;var px=x;
  while(px<x+w){s=(s*1103515245+12345)>>>0;var bw=1+(s>>>16)%4*2;if(px+bw>x+w)break;c.fillRect(px,y,bw,h);s=(s*1103515245+12345)>>>0;px+=bw+2+(s>>>16)%3*2;}
}
function shrLabel(c,text,x,y,col,align){shrFont(c,'400',24,SHR_F.mono);c.fillStyle=col||'#7a8494';c.textAlign=align||'left';shrSpaced(c,text,x,y,3,align||'left');}
function shrSky(c){
  var g=c.createLinearGradient(0,0,0,SHR_H);
  g.addColorStop(0,'#0a1330');g.addColorStop(0.42,'#25336f');g.addColorStop(0.72,'#7b4f8f');g.addColorStop(0.9,'#e48a72');g.addColorStop(1,'#f5b170');
  c.fillStyle=g;c.fillRect(0,0,SHR_W,SHR_H);
  var s=7;c.fillStyle='#ffffff';
  for(var i=0;i<70;i++){s=(s*1103515245+12345)>>>0;var x=s%SHR_W;s=(s*1103515245+12345)>>>0;var y=s%760;c.globalAlpha=0.25+(i%5)*0.12;c.beginPath();c.arc(x,y,1.5+(i%3),0,Math.PI*2);c.fill();}
  c.globalAlpha=1;
  [[160,1760,260,70],[520,1830,340,80],[930,1745,260,66],[-20,1890,300,70],[760,1900,320,74]].forEach(function(e){
    var cg=c.createRadialGradient(e[0],e[1],0,e[0],e[1],e[2]);cg.addColorStop(0,'rgba(255,255,255,.55)');cg.addColorStop(1,'rgba(255,255,255,0)');
    c.fillStyle=cg;c.beginPath();c.ellipse(e[0],e[1],e[2],e[3],0,0,Math.PI*2);c.fill();
  });
}
function shrSpacedW(c,text,sp){var w=0;Array.from(text).forEach(function(k,i){w+=c.measureText(k).width+(i?sp:0);});return w;}
function shrHeader(c){
  c.fillStyle='#ffffff';c.textAlign='center';c.textBaseline='alphabetic';
  shrFont(c,'700',92,SHR_F.disp);
  var w=shrSpacedW(c,'BABEL FLIGHT',10),x0=(SHR_W-(w+96))/2;
  shrPlane(c,x0+36,286,72,'#ffd76a');
  c.fillStyle='#ffffff';shrSpaced(c,'BABEL FLIGHT',x0+96,318,10,'left');
  shrFont(c,'500',34,SHR_F.body);c.fillStyle='rgba(255,255,255,.82)';c.fillText('飛行機に乗るように、語学を学ぶ',SHR_W/2,372);
}
function shrFooter(c){
  c.textAlign='center';c.fillStyle='#ffffff';
  shrFont(c,'700',66,SHR_F.disp);shrSpaced(c,'#BabelFlight',SHR_W/2,1578,2,'center');
  shrFont(c,'400',34,SHR_F.mono);c.fillStyle='rgba(255,255,255,.9)';c.fillText(shrSite().replace(/^https?:\/\//,''),SHR_W/2,1636);
  shrFont(c,'500',30,SHR_F.body);c.fillStyle='rgba(255,255,255,.75)';c.fillText('韓国語・英語・スペイン語・イタリア語',SHR_W/2,1688);
}
/* the paper card with a coloured strip, a tear line and notches */
function shrCard(stripCol,draw){
  var C=SHR_CARD,cv=document.createElement('canvas');cv.width=C.w;cv.height=C.h;
  var c=cv.getContext('2d');c.textBaseline='alphabetic';
  shrRR(c,0,0,C.w,C.h,36);c.fillStyle=SHR_PAPER;c.fill();
  c.save();shrRR(c,0,0,C.w,C.h,36);c.clip();c.fillStyle=stripCol;c.fillRect(0,0,C.w,130);c.restore();
  draw(c);
  var ty=960;c.strokeStyle='#d8cfbb';c.lineWidth=3;c.setLineDash([14,12]);c.beginPath();c.moveTo(40,ty);c.lineTo(C.w-40,ty);c.stroke();c.setLineDash([]);
  c.globalCompositeOperation='destination-out';c.beginPath();c.arc(0,ty,28,0,Math.PI*2);c.arc(C.w,ty,28,0,Math.PI*2);c.fill();c.globalCompositeOperation='source-over';
  return cv;
}
function shrStub(c,seed,right){
  shrBarcode(c,50,986,430,52,seed,SHR_INK);
  c.textAlign='right';shrFont(c,'700',30,SHR_F.mono);c.fillStyle=SHR_INK;c.fillText(right,850,1022);
}

/* ---- the three pictures ---- */
function shrDrawLesson(c,d,name){
  var col=SHR_LC[d.L]||'#2d6bff';
  return shrCard(col,function(k){
    k.fillStyle='#ffffff';shrFont(k,'700',46,SHR_F.disp);shrSpaced(k,'BOARDING PASS',50,84,6,'left');
    k.textAlign='right';shrFont(k,'700',44,SHR_F.mono);k.fillText(d.flight||'BABEL',850,84);
    /* route */
    k.textAlign='center';k.fillStyle=SHR_INK;
    shrFit(k,d.from,'700',118,SHR_F.disp,320,60);k.fillText(d.from,215,300);
    shrFit(k,d.to,'700',118,SHR_F.disp,320,60);k.fillText(d.to,685,300);
    shrFont(k,'500',32,SHR_F.body);k.fillStyle=SHR_SUB;k.fillText(d.fromJp,215,352);k.fillText(d.toJp,685,352);
    shrPlane(k,450,258,76,col);
    k.strokeStyle='#e2dac8';k.lineWidth=3;k.beginPath();k.moveTo(50,410);k.lineTo(850,410);k.stroke();
    /* fields */
    shrLabel(k,'LESSON',50,470);
    k.fillStyle=SHR_INK;k.textAlign='left';shrFit(k,d.title,'700',56,SHR_F.body,800,30);k.fillText(d.title,50,536);
    shrLabel(k,'LANGUAGE',50,610);shrLabel(k,'DATE',480,610);
    shrFont(k,'700',42,SHR_F.body);k.fillStyle=SHR_INK;k.fillText(d.langName,50,666);
    shrFont(k,'700',40,SHR_F.mono);k.fillText(shrDate(),480,666);
    shrLabel(k,'RESULT',50,746);shrLabel(k,'MILES',480,746);
    k.fillStyle=SHR_INK;shrFit(k,d.grade||'LANDED','700',54,SHR_F.disp,400,30);k.fillText(d.grade||'LANDED',50,808);
    shrFont(k,'700',58,SHR_F.disp);k.fillStyle=col;k.fillText('+'+fmt(d.miles),480,810);
    for(var i=0;i<3;i++)shrStar(k,86+i*86,890,36,i<d.stars?'#f5b301':'#ddd5c3');
    if(name){shrLabel(k,'PASSENGER',480,866);k.fillStyle=SHR_INK;k.textAlign='left';shrFit(k,name,'700',42,SHR_F.body,370,24);k.fillText(name,480,916);}
    shrStub(k,(d.flight||'')+d.title,(d.flight?d.flight+' ・ ':'')+'TYO');
  });
}
function shrDrawProgress(c,d,name){
  return shrCard('#ffcf26',function(k){
    k.fillStyle='#1b1500';shrFont(k,'700',46,SHR_F.disp);shrSpaced(k,'FLIGHT LOG',50,84,6,'left');
    k.textAlign='right';if(name){shrFit(k,name,'700',40,SHR_F.body,420,24);k.fillText(name,850,82);}else{shrFont(k,'700',38,SHR_F.mono);k.fillText(shrDate(),850,82);}
    var kp=[[d.streak,'連続日数'],[fmt(d.miles),'マイル'],[fmt(d.learned),'覚えたフレーズ']];
    kp.forEach(function(x,i){var cx=150+i*300;k.textAlign='center';k.fillStyle=SHR_INK;shrFit(k,String(x[0]),'700',104,SHR_F.disp,250,50);k.fillText(String(x[0]),cx,286);
      shrFont(k,'500',30,SHR_F.body);k.fillStyle=SHR_SUB;k.fillText(x[1],cx,338);});
    k.strokeStyle='#e2dac8';k.lineWidth=3;k.beginPath();k.moveTo(50,396);k.lineTo(850,396);k.stroke();
    d.langs.forEach(function(g,i){
      var y=436+i*126,col=SHR_LC[g.L];
      shrRR(k,50,y,86,54,12);k.fillStyle=col;k.fill();
      k.fillStyle='#ffffff';k.textAlign='center';shrFont(k,'700',36,SHR_F.disp);k.fillText(g.L.toUpperCase(),93,y+40);
      k.fillStyle=SHR_INK;k.textAlign='left';shrFont(k,'700',38,SHR_F.body);k.fillText(g.name,158,y+41);
      k.textAlign='right';shrFont(k,'700',32,SHR_F.mono);k.fillStyle=g.done?SHR_INK:'#9aa3b0';k.fillText(g.done+' / '+g.total,850,y+40);
      shrRR(k,50,y+76,800,18,9);k.fillStyle=SHR_TRACK;k.fill();
      if(g.done>0){shrRR(k,50,y+76,Math.max(18,800*g.done/Math.max(1,g.total)),18,9);k.fillStyle=col;k.fill();}
    });
    shrStub(k,'log'+d.miles,RANKS[d.rank][1]);
  });
}
function shrDrawStatus(c,d,name){
  var rc=SHR_RC[d.rank]||SHR_RC[0];
  return shrCard(rc[0],function(k){
    k.fillStyle=rc[1];shrFont(k,'700',46,SHR_F.disp);shrSpaced(k,'ID CARD',50,84,6,'left');
    k.textAlign='right';shrFont(k,'700',44,SHR_F.disp);shrSpaced(k,RANKS[d.rank][1],850,84,5,'right');
    /* photo */
    k.beginPath();k.arc(450,300,128,0,Math.PI*2);k.fillStyle='#f1ebdd';k.fill();k.lineWidth=10;k.strokeStyle=rc[0];k.stroke();
    if(d.icon){k.textAlign='center';k.textBaseline='middle';shrFont(k,'400',150,SHR_F.emoji);k.fillStyle=SHR_INK;k.fillText(d.icon,450,308);k.textBaseline='alphabetic';}
    else shrPlane(k,450,300,150,SHR_INK);
    if(d.cap){
      k.save();k.translate(745,250);k.rotate(-0.22);k.strokeStyle='rgba(196,48,58,.85)';k.lineWidth=7;k.beginPath();k.arc(0,0,92,0,Math.PI*2);k.stroke();
      k.lineWidth=3;k.beginPath();k.arc(0,0,78,0,Math.PI*2);k.stroke();k.fillStyle='rgba(196,48,58,.9)';k.textAlign='center';
      shrFont(k,'700',40,SHR_F.disp);shrSpaced(k,'CAPTAIN',0,12,3,'center');shrFont(k,'700',20,SHR_F.mono);k.fillText('BABEL FLIGHT',0,46);k.restore();
    }
    var y=500;k.textAlign='center';
    if(name){k.fillStyle=SHR_INK;shrFit(k,name,'700',58,SHR_F.body,780,28);k.fillText(name,450,y);y+=36;}
    k.fillStyle=SHR_INK;shrFont(k,'700',128,SHR_F.disp);shrSpaced(k,RANKS[d.rank][1],450,y+118,8,'center');
    k.fillStyle=rc[0];shrRR(k,390,y+142,120,12,6);k.fill();
    shrFont(k,'500',36,SHR_F.body);k.fillStyle=SHR_SUB;k.fillText(RANKS[d.rank][0]+' ステータス'+(d.prof?' ・ '+d.prof+'志望':''),450,y+204);
    var kp=[[fmt(d.win),'直近6ヶ月のマイル'],[fmt(d.miles),'総マイル'],[String(d.stamps),'スタンプ']];
    kp.forEach(function(x,i){var cx=150+i*300;k.fillStyle=SHR_INK;shrFit(k,x[0],'700',84,SHR_F.disp,250,40);k.fillText(x[0],cx,y+330);
      shrFont(k,'500',28,SHR_F.body);k.fillStyle=SHR_SUB;k.fillText(x[1],cx,y+376);});
    shrStub(k,'id'+d.miles+d.rank,'MEMBER');
  });
}
/* fonts must be loaded (with the characters in use) before drawing */
function shrFonts(text){
  if(!document.fonts||!document.fonts.load)return Promise.resolve();
  var t=text+'BABELFLIGHT#0123456789.+/ ';
  var list=['700 80px "Barlow Condensed"','400 30px "B612 Mono"','700 30px "B612 Mono"','500 30px "IBM Plex Sans JP"','700 30px "IBM Plex Sans JP"'];
  var all=Promise.all(list.map(function(f){return document.fonts.load(f,t).catch(function(){});}));
  return Promise.race([all,new Promise(function(r){setTimeout(r,2500);})]);
}
function shrDraw(kind,d,name){
  var cv=document.createElement('canvas');cv.width=SHR_W;cv.height=SHR_H;
  var c=cv.getContext('2d');c.textBaseline='alphabetic';
  shrSky(c);shrHeader(c);
  var card=kind==='lesson'?shrDrawLesson(c,d,name):kind==='progress'?shrDrawProgress(c,d,name):shrDrawStatus(c,d,name);
  c.save();c.shadowColor='rgba(5,10,30,.45)';c.shadowBlur=60;c.shadowOffsetY=24;c.drawImage(card,SHR_CARD.x,SHR_CARD.y);c.restore();
  shrFooter(c);
  return cv;
}
function shrMake(kind,d,name){
  var words=JSON.stringify(d)+(name||'')+'飛行機に乗るように、語学を学ぶ韓国語・英語・スペイン語・イタリア語連続日数マイル覚えたフレーズ直近6ヶ月のマイル総マイルスタンプステータス志望';
  return shrFonts(words).then(function(){
    var cv=shrDraw(kind,d,name);
    return new Promise(function(res,rej){
      try{cv.toBlob(function(b){b?res(b):rej(new Error('blob'));},'image/jpeg',0.93);}catch(e){rej(e);}
    });
  });
}

/* ---- the share sheet ---- */
function shrCanFiles(f){try{return !!(navigator.canShare&&navigator.share&&navigator.canShare({files:[f]}));}catch(e){return false;}}
function shareOpen(kind){
  if(!SHR.on)return;
  var d=kind==='lesson'?shrLesson():kind==='progress'?shrProgress():kind==='status'?shrStatus():null;
  if(!d)return;
  SHR.kind=kind;SHR.data=d;
  var title={lesson:'レッスンをシェア',progress:'進捗をシェア',status:'ステータスをシェア'}[kind],nm=shrName(),mob=shrMobile();
  $('sheetHost').innerHTML='<div class="sheet share-sheet" role="dialog" aria-label="'+title+'"><div class="sheet-in">'+
    '<h3>'+title+'</h3>'+
    '<div class="shr-prev"><img id="shrImg" alt="シェアする画像"><span class="shr-wait" id="shrWait">画像を作っています…</span></div>'+
    (nm?'<label class="shr-name"><input type="checkbox" id="shrName"'+(shrNameOn()?' checked':'')+'> 画像に名前(<b>'+esc(nm)+'</b>)を入れる</label>':'')+
    '<button class="go shr-img" type="button" data-shr="img" hidden disabled>画像をシェア<small>Instagram・TikTok・LINEなど</small></button>'+
    '<div class="shr-more" id="shrMore"'+(mob?' hidden':'')+'><div class="shr-sns">'+[['x','X'],['threads','Threads'],['fb','Facebook']].map(function(s){
      return '<a class="shr-btn" data-shr="'+s[0]+'" href="'+esc(shrIntent(s[0],kind,d))+'" target="_blank" rel="noopener noreferrer">'+s[1]+'</a>';}).join('')+'</div>'+
    '<div class="shr-row"><a class="shr-btn" data-shr="save" id="shrSave" aria-disabled="true" download="babel-flight-'+kind+'.jpg">画像を保存</a>'+
    '<button class="shr-btn" type="button" data-shr="copy">投稿文をコピー</button></div></div>'+
    '<p class="dim shr-note" id="shrNote" hidden></p>'+
    '<button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';
  shrRender();
}
function shrRender(){
  var my=++SHR.seq,kind=SHR.kind,d=SHR.data,cb=$('shrName'),name=cb&&cb.checked?shrName():'';
  var img=$('shrImg'),wait=$('shrWait');if(wait)wait.hidden=false;
  shrMake(kind,d,name).then(function(b){
    if(my!==SHR.seq||!$('shrImg'))return;
    if(SHR.url){try{URL.revokeObjectURL(SHR.url);}catch(e){}}
    SHR.blob=b;SHR.url=URL.createObjectURL(b);
    try{SHR.file=new File([b],'babel-flight-'+kind+'.jpg',{type:'image/jpeg'});}catch(e){SHR.file=null;}
    $('shrImg').src=SHR.url;$('shrImg').alt=shrText(kind,d);if($('shrWait'))$('shrWait').hidden=true;
    var sv=$('shrSave');if(sv){sv.href=SHR.url;sv.removeAttribute('aria-disabled');}
    var ib=document.querySelector('[data-shr="img"]'),can=!!SHR.file&&shrCanFiles(SHR.file),mob=shrMobile(),more=$('shrMore');
    if(ib){ib.hidden=!can;ib.disabled=!can;}
    /* a phone whose browser can't share pictures (some in-app browsers) falls back to the PC buttons */
    if(more)more.hidden=mob&&can;
    var nt=$('shrNote');
    if(nt){nt.hidden=false;nt.textContent=mob&&can?'Instagram・TikTok・X・LINEなど、出てきたメニューから投稿先を選んでね。'
      :can?'Instagram・TikTokは「画像をシェア」か、保存した画像から投稿してね。X・Threads・Facebookはリンク付きの投稿画面が開きます。'
          :'Instagram・TikTokは、画像を保存してからアプリで投稿してね。X・Threads・Facebookはリンク付きの投稿画面が開きます。';}
  },function(){
    if(my!==SHR.seq||!$('shrWait'))return;
    $('shrWait').textContent='画像を作れませんでした。X・Threads・Facebookのボタンは使えます。';
    if($('shrMore'))$('shrMore').hidden=false;
  });
}
function shrCopy(btn){
  var t=shrText(SHR.kind,SHR.data)+' '+shrLink();
  function done(ok){if(!btn)return;btn.textContent=ok?'コピーしました ✓':'コピーできませんでした';clearTimeout(SHR.copyT);SHR.copyT=setTimeout(function(){if(btn.isConnected)btn.textContent='投稿文をコピー';},1800);}
  try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){done(true);},function(){done(false);});return;}}catch(e){}
  try{var ta=document.createElement('textarea');ta.value=t;ta.setAttribute('readonly','');ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();var ok=document.execCommand('copy');ta.remove();done(ok);}catch(e){done(false);}
}
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('[data-share],[data-shr]');if(!t)return;
  if(t.hasAttribute('data-share')){shareOpen(t.getAttribute('data-share'));return;}
  var w=t.getAttribute('data-shr');
  if(w==='save'&&t.getAttribute('aria-disabled')==='true'){e.preventDefault();return;}
  if(w==='img'){
    if(!SHR.file||!shrCanFiles(SHR.file))return;
    navigator.share({files:[SHR.file]}).catch(function(){});
    return;
  }
  if(w==='copy'){shrCopy(t);return;}
  /* x / threads / fb / save: the link itself does the rest */
});
document.addEventListener('change',function(e){
  if(e.target&&e.target.id==='shrName'){shrNameSet(e.target.checked);shrRender();}
});
