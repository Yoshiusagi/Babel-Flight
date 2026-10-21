/* ================= UTILS ================= */
var $=function(id){return document.getElementById(id);};
var clamp=function(v,a,b){return v<a?a:v>b?b:v;};
var fmt=function(n){return Math.floor(n).toLocaleString('en-US');};
var esc=function(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
var reduceMotion=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function pad2(n){return (n<10?'0':'')+n;}
function dayStr(d){d=d||new Date();return d.getFullYear()+'-'+pad2(d.getMonth()+1)+'-'+pad2(d.getDate());}
function yesterdayStr(){var d=new Date();d.setDate(d.getDate()-1);return dayStr(d);}
var MON=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
function stampDate(s){var p=(s||dayStr()).split('-');return parseInt(p[2],10)+' '+MON[parseInt(p[1],10)-1]+' '+p[0];}
function hash(s){var h=2166136261;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function seeded(seed){var a=seed>>>0;return function(){a=(a+0x6D2B79F5)|0;var t=Math.imul(a^a>>>15,1|a);t=(t+Math.imul(t^t>>>7,61|t))^t;return((t^t>>>14)>>>0)/4294967296;};}

/* ================= ICONS ================= */
var PLANE_D='M14 0C14 -1.5 10 -2.2 4 -2.2L-3 -12.5L-7 -12.5L-4 -2.2L-11 -2.2L-15 -6L-18 -6L-16 -1.6L-18 0L-16 1.6L-18 6L-15 6L-11 2.2L-4 2.2L-7 12.5L-3 12.5L4 2.2C10 2.2 14 1.5 14 0Z';
function planeIcon(){return '<svg viewBox="-20 -14 36 28" aria-hidden="true"><path d="'+PLANE_D+'" fill="currentColor"/></svg>';}
/* profile icons (record screen ID card); '' = the default plane */
var ICONS=[['pilot','🧑‍✈️','パイロット'],['globe','🌏','地球'],['bag','🧳','スーツケース'],['map','🗺️','地図'],['music','🎧','音楽'],
  ['book','📚','本'],['sakura','🌸','さくら'],['bike','🚲','自転車'],['penguin','🐧','ペンギン'],['fox','🦊','キツネ'],['star','⭐','星']];
var ICON_MAP={};ICONS.forEach(function(x){ICON_MAP[x[0]]=x;});
function avatarHTML(id){var ic=ICON_MAP[id===undefined?save.icon:id];return ic?'<span class="pfp" role="img" aria-label="'+ic[2]+'">'+ic[1]+'</span>':planeIcon();}
function starIcon(on){return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" fill="'+(on?'var(--signal)':'none')+'" stroke="'+(on?'#b88a00':'var(--line)')+'" stroke-width="1.6" stroke-linejoin="round"/></svg>';}
function closeIcon(){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>';}
function speakerIcon(){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4zM15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>';}
function barcodeSVG(seed){
  var r=seeded(hash(seed)),x=0,out='';
  while(x<200){var w=1+Math.floor(r()*4);if(r()>0.42)out+='<rect x="'+x+'" y="0" width="'+w+'" height="40" fill="currentColor"/>';x+=w+1+Math.floor(r()*2);}
  return '<svg viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">'+out+'</svg>';
}

/* ================= SAVE ================= */
var KEY='babelflight.save.v1';
var OLD_ORDER=['checkin','inflight','immigration','hotel','restaurant','city','atc1','atc2'];
function blankProg(){var p={};ORDER.forEach(function(k){p[k]={items:{},units:{}};});return p;}
function defaults(){return {v:2,t:0,name:'PASSENGER',icon:'',rz:0,lang:'ko',prof:'',level:'mid',goal:2,onboarded:false,theme:'auto',sound:true,mode:'daily',amb:false,tap:true,pos:{},
  miles:0,flights:0,streak:0,lastDay:'',bestStreak:0,daily:{d:'',n:0},mh:null,st:null,cap:0,tq:0,enVar:'us',acc:{},rem:{},prog:blankProg()};}
function mergeSave(raw){
  var d=defaults();
  if(!raw||typeof raw!=='object')return d;
  Object.keys(d).forEach(function(k){if(raw[k]!==undefined&&k!=='prog'&&k!=='daily')d[k]=raw[k];});
  if(raw.daily&&typeof raw.daily==='object'){
    if(raw.daily.d!==undefined)d.daily={d:raw.daily.d,n:raw.daily.n||0};
    else{var ks=Object.keys(raw.daily);if(ks.length)d.daily={d:ks[0],n:raw.daily[ks[0]]||0};}
  }
  ORDER.forEach(function(k){
    var p=raw.prog&&raw.prog[k];if(!p)return;
    var items={};
    Object.keys(p.items||{}).forEach(function(key){
      var m=/^(\d+)\.(\d+)$/.exec(key);
      if(m&&OLD_ORDER[+m[1]])items[OLD_ORDER[+m[1]]+'.'+m[2]]=p.items[key];
      else items[key]=p.items[key];
    });
    d.prog[k].items=items;d.prog[k].units=p.units||{};
  });
  if(ORDER.indexOf(d.lang)<0)d.lang='ko';
  if(d.prof&&!profById(d.prof))d.prof='';
  if(['beg','mid','adv'].indexOf(d.level)<0)d.level='mid';
  d.goal=clamp(parseInt(d.goal,10)||2,1,5);
  if(d.mode!=='job')d.mode='daily';
  if(typeof d.icon!=='string'||!ICON_MAP[d.icon])d.icon='';
  d.rz=+d.rz||0;
  /* miles per day (for the 6-month status); older saves start with their total as of today */
  var mh={};
  if(raw.mh&&typeof raw.mh==='object'){Object.keys(raw.mh).forEach(function(k){var v=+raw.mh[k];if(/^\d{4}-\d\d-\d\d$/.test(k)&&v>0)mh[k]=Math.round(v);});}
  else if(d.miles>0)mh[dayStr()]=Math.round(+d.miles||0);
  d.mh=mh;
  var st=raw.st;d.st=(st&&typeof st==='object'&&st.lv>=0&&st.lv<RANKS.length&&+st.until>0)?{lv:Math.floor(st.lv),until:+st.until}:null;
  if(d.enVar!=='uk')d.enVar='us';
  var acc={},rem={};
  ORDER.forEach(function(l){
    var a=raw.acc&&raw.acc[l];if(a&&+a.n>0&&+a.a>=0&&+a.a<=1)acc[l]={a:+a.a,n:Math.floor(+a.n)};
    var r=raw.rem&&raw.rem[l];
    if(Array.isArray(r))rem[l]=r.filter(function(x){return x&&typeof x.u==='string'&&UNITS[l][x.u]&&Array.isArray(x.k)&&x.k.length;}).slice(0,6).map(function(x){
      return {u:x.u,k:x.k.filter(function(k){return typeof k==='string'&&/^.+\.\d+$/.test(k);}).slice(0,8),t:+x.t||0};}).filter(function(x){return x.k.length;});
  });
  d.acc=acc;d.rem=rem;
  d.cap=+d.cap>0?+d.cap:0;d.tq=+d.tq>0?Math.floor(+d.tq):0;
  return d;
}
function loadLocal(){try{return mergeSave(JSON.parse(localStorage.getItem(KEY)||'null'));}catch(e){return defaults();}}
var save=loadLocal();
function persistLocal(){try{localStorage.setItem(KEY,JSON.stringify(save));}catch(e){}}
var cloud={doc:null,ready:false,timer:0,busy:false,again:false};
function store(){save.t=Date.now();persistLocal();pushCloud();}
function pushCloud(){
  if(!cloud.doc)return;
  clearTimeout(cloud.timer);
  cloud.timer=setTimeout(function(){
    if(cloud.busy){cloud.again=true;return;}
    cloud.busy=true;
    cloud.doc.set({v:2,t:save.t,s:JSON.stringify(save)}).catch(function(){}).then(function(){
      cloud.busy=false;if(cloud.again){cloud.again=false;pushCloud();}
    });
  },1500);
}
function initCloud(){
  if(!window.claude||typeof claude.use!=='function')return;
  Promise.all([claude.use('db'),claude.use('user')]).then(function(r){
    var db=r[0],user=r[1];
    if(!db||!user)return null;
    return user.id().then(function(id){
      if(!id)return null;
      cloud.doc=db.doc('data/users/'+id+'/app');
      return cloud.doc.get();
    });
  }).then(function(snap){
    if(!cloud.doc)return;
    cloud.ready=true;
    var d=snap&&snap.exists?snap.data():null;
    if(d&&d.s){
      var remote=null;try{remote=mergeSave(JSON.parse(d.s));remote.t=d.t||0;}catch(e){}
      if(remote&&remote.t>(save.t||0)&&view!=='flight'&&view!=='atc'){save=remote;persistLocal();applyTheme();if(save.onboarded&&view==='onboard')view='home';render();return;}
    }
    if(save.flights>0||save.t>0)pushCloud();
  }).catch(function(){});
}

/* ================= PROGRESS HELPERS ================= */
var DAY=86400000;
function ik(uid,i){return uid+'.'+i;}
function unitOf(lang,uid){return UNITS[lang][uid];}
function itemRec(lang,uid,i){return save.prog[lang].items[ik(uid,i)]||{b:0,d:0};}
function unitRec(lang,uid){return save.prog[lang].units[uid]||{n:0,stars:0,last:''};}
function unitMastery(lang,uid){
  var u=unitOf(lang,uid),s=0;
  if(u.kind==='scene')return (unitRec(lang,uid).stars||0)/3;
  for(var i=0;i<u.items.length;i++)s+=Math.min(itemRec(lang,uid,i).b,4)/4;
  return s/u.items.length;
}
function unitDue(lang,uid){
  var n=0,now=Date.now(),u=unitOf(lang,uid);
  for(var i=0;i<u.items.length;i++){var r=itemRec(lang,uid,i);if(r.b>=1&&r.d<=now)n++;}
  return n;
}
function eachItem(lang,fn){ALL_IDS[lang].forEach(function(uid){unitOf(lang,uid).items.forEach(function(it,i){fn(uid,i,itemRec(lang,uid,i));});});}
function dueList(lang){
  var out=[],now=Date.now();
  eachItem(lang,function(uid,i,r){if(r.b>=1&&r.d<=now)out.push({uid:uid,i:i,d:r.d});});
  out.sort(function(a,b){return a.d-b.d;});
  return out;
}
function learnedList(lang){var out=[];eachItem(lang,function(uid,i,r){if(r.b>=1)out.push({uid:uid,i:i});});return out;}
function weakList(lang){
  var out=[];
  eachItem(lang,function(uid,i,r){if((r.m||0)>0&&(r.k||0)<2)out.push({uid:uid,i:i,m:r.m});});
  out.sort(function(a,b){return b.m-a.m;});
  return out;
}
function nextDueIn(lang){var m=Infinity;eachItem(lang,function(uid,i,r){if(r.b>=1&&r.d<m)m=r.d;});return m===Infinity?null:m;}
function pathSections(lang){
  if(save.mode==='job'){
    var p=profById(save.prof);
    if(!p)return [];
    return [{key:p.id,title:p.id==='study'?'留学先の学校で':p.jp+'の専門会話',sub:p.id==='study'?'STUDY ABROAD ・ 学校の会話と教科の用語':p.en+' ・ 仕事で使う会話',ids:p.units[lang].slice(),prof:p}];
  }
  return [
    {key:'basic',title:'基本の日常会話',sub:'あいさつ・自己紹介・数字・気持ち',ids:DAILY_IDS.slice()},
    {key:'travel',title:'旅行フレーズ',sub:'空港・機内・入国・ホテル・街',ids:LANGS[lang].units.map(function(u){return u.id;})},
    {key:'scenes',title:'旅行の場面で話す',sub:'入国審査からトラブルまで、会話で練習',ids:TRAVEL_SC.slice()},
    {key:'study',title:'留学',sub:'学校での会話と、数学・理科・社会の用語',ids:STUDY_IDS.slice()}
  ].concat(lang==='en'&&UNITS.en.usuk?[{key:'usuk',title:'アメリカ英語とイギリス英語',sub:'同じ意味でも、国によって言い方やつづりが変わる',ids:['usuk']}]:[]);
}
function pathIds(lang){var a=[];pathSections(lang).forEach(function(s){a=a.concat(s.ids);});return a;}
function unitsDone(lang,ids){var n=0;(ids||pathIds(lang)).forEach(function(uid){if(unitRec(lang,uid).n>0)n++;});return n;}
function streakNow(){return(save.lastDay===dayStr()||save.lastDay===yesterdayStr())?save.streak:0;}
function todayCount(){return save.daily&&save.daily.d===dayStr()?save.daily.n:0;}
function rankIdx(m){var r=0;for(var i=0;i<RANKS.length;i++)if(m>=RANKS[i][2])r=i;return r;}
/* miles earned in the last 6 months (never more than the lifetime total) */
function milesWindow(now){var from=dayStr(new Date((now||Date.now())-STATUS_DAYS*DAY)),n=0,mh=save.mh||{};Object.keys(mh).forEach(function(k){if(k>from)n+=mh[k]||0;});return Math.min(n,save.miles||0);}
/* the status shown now: the one kept from the last 6 months, or what the recent miles reach */
function statusIdx(now){now=now||Date.now();var w=rankIdx(milesWindow(now)),st=save.st;return st&&st.until>now?Math.max(st.lv,w):w;}
/* after a lesson: record the miles; reaching (or holding) a status keeps it for 6 more months */
function statusEarn(add){
  var now=Date.now(),today=dayStr(),from=dayStr(new Date(now-(STATUS_DAYS+14)*DAY));
  if(!save.mh)save.mh={};
  save.mh[today]=(save.mh[today]||0)+add;
  Object.keys(save.mh).forEach(function(k){if(k<from)delete save.mh[k];});
  var R=rankIdx(milesWindow(now)),cur=save.st&&save.st.until>now?save.st.lv:-1,firstCap=false;
  if(R>=cur)save.st={lv:R,until:now+STATUS_DAYS*DAY};
  if(R===RANKS.length-1&&!save.cap){save.cap=now;firstCap=true;}
  return firstCap;
}
function fmtDate(ms){var d=new Date(ms);return d.getFullYear()+'.'+pad2(d.getMonth()+1)+'.'+pad2(d.getDate());}
function unitIndex(lang,uid){return Math.max(0,ALL_IDS[lang].indexOf(uid));}
function flightNo(lang,uid){return 'BF'+(ORDER.indexOf(lang)+1)+pad2(unitIndex(lang,uid)+1);}
function gateNo(lang,uid){return LANGS[lang].letter+(unitIndex(lang,uid)+1);}
function totalMastered(){var n=0;ORDER.forEach(function(l){eachItem(l,function(uid,i,r){if(r.b>=4)n++;});});return n;}
function totalLearned(){var n=0;ORDER.forEach(function(l){n+=learnedList(l).length;});return n;}
function unitTitle(uid){return UM[uid]?UM[uid].jp:uid;}
function unitLat(uid){return UM[uid]?UM[uid].lat:uid.toUpperCase();}

/* ================= THEME ================= */
var rootEl=document.documentElement,origTheme=rootEl.getAttribute('data-theme');
function applyTheme(){
  var t=save.theme;
  if(t==='light'||t==='dark')rootEl.setAttribute('data-theme',t);
  else if(origTheme)rootEl.setAttribute('data-theme',origTheme);
  else rootEl.removeAttribute('data-theme');
}

/* ================= AUDIO + SPEECH ================= */
var ac=null;
function audio(){
  if(!ac){try{ac=new (window.AudioContext||window.webkitAudioContext)();}catch(e){ac=null;}}
  if(ac&&ac.state==='suspended'){try{ac.resume();}catch(e){}}
  return ac;
}
function tone(f,d,type,vol,delay,slide){
  if(!save.sound)return;var a=audio();if(!a)return;
  try{
    var t=a.currentTime+(delay||0),o=a.createOscillator(),g=a.createGain();
    o.type=type||'sine';o.frequency.setValueAtTime(f,t);
    if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(40,f+slide),t+d);
    g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(vol||0.08,t+0.02);g.gain.exponentialRampToValueAtTime(0.0001,t+d);
    o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+d+0.05);
  }catch(e){}
}
function clack(){
  if(!save.sound)return;var a=audio();if(!a)return;
  try{
    var n=Math.floor(a.sampleRate*0.018),b=a.createBuffer(1,n,a.sampleRate),c=b.getChannelData(0);
    for(var i=0;i<n;i++)c[i]=(Math.random()*2-1)*Math.pow(1-i/n,2);
    var s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();
    s.buffer=b;f.type='bandpass';f.frequency.value=1800+Math.random()*1200;g.gain.value=0.18;
    s.connect(f);f.connect(g);g.connect(a.destination);s.start();
  }catch(e){}
}
function chimeOK(){tone(988,0.5,'sine',0.07,0);tone(1319,0.7,'sine',0.06,0.12);}
function chimeBad(){tone(180,0.35,'triangle',0.1,0,-70);tone(140,0.4,'triangle',0.08,0.12,-50);}
function chimeLand(){tone(784,0.6,'sine',0.08,0);tone(988,0.9,'sine',0.07,0.35);tone(784,0.9,'sine',0.05,0.75);}
function buzz(ms){try{if(navigator.vibrate)navigator.vibrate(ms);}catch(e){}}
var tts={ok:('speechSynthesis' in window)&&('SpeechSynthesisUtterance' in window),voices:[]};
function loadVoices(){try{tts.voices=speechSynthesis.getVoices()||[];}catch(e){}}
if(tts.ok){loadVoices();try{speechSynthesis.onvoiceschanged=loadVoices;}catch(e){}}
function voiceFor(code){
  var c=code.toLowerCase(),p=c.slice(0,2),best=null;
  tts.voices.forEach(function(v){if(!best&&v.lang&&v.lang.replace('_','-').toLowerCase()===c)best=v;});
  if(!best)tts.voices.forEach(function(v){if(!best&&v.lang&&v.lang.slice(0,2).toLowerCase()===p)best=v;});
  return best;
}
function ttsAvail(code){if(!tts.ok)return false;if(!tts.voices.length)return true;return !!voiceFor(code);}
function speak(text,code,slow,force){
  if(!tts.ok)return;if(!force&&!save.sound)return;
  try{
    speechSynthesis.cancel();
    var u=new SpeechSynthesisUtterance(text);u.lang=code;
    var v=voiceFor(code);if(v)u.voice=v;
    u.rate=slow?0.6:0.9;speechSynthesis.speak(u);
  }catch(e){}
}

/* ================= SPLIT-FLAP BOARD ================= */
var CH_LAT='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
var CH_KO='가나다라마바사아자차카타파하한국어서울공항비행기';
var HANGUL=/[가-힣]/;
function randCh(target){
  var pool=HANGUL.test(target)?CH_KO:CH_LAT;
  return pool.charAt(Math.floor(Math.random()*pool.length));
}
function Board(host){this.host=host;this.cols=0;this.rows=0;this.cells=[];this.text=null;}
Board.prototype.layout=function(text,minCols){
  var up=text.toUpperCase(),words=up.split(/\s+/).filter(Boolean),longest=0;
  words.forEach(function(w){if(w.length>longest)longest=w.length;});
  var cols=Math.max(minCols,longest),lines=[],cur='';
  words.forEach(function(w){
    if(!cur)cur=w;else if((cur+' '+w).length<=cols)cur+=' '+w;else{lines.push(cur);cur=w;}
  });
  if(cur)lines.push(cur);
  var rows=Math.max(3,lines.length),off=Math.floor((rows-lines.length)/2),grid=[];
  for(var r=0;r<rows;r++){
    var line=lines[r-off]||'',pad=Math.floor((cols-line.length)/2),arr=[];
    for(var c=0;c<cols;c++){var ch=line.charAt(c-pad);arr.push(c>=pad&&ch?ch:' ');}
    grid.push(arr);
  }
  return {cols:cols,rows:rows,grid:grid};
};
Board.prototype.build=function(cols,rows){
  var h='<div class="bgrid" style="--cols:'+cols+'">',r,c;
  for(r=0;r<rows;r++){h+='<div class="brow">';for(c=0;c<cols;c++)h+='<div class="cell"><div class="h t"><span></span></div><div class="h b"><span></span></div><div class="f ft"><span></span></div><div class="f fb"><span></span></div></div>';h+='</div>';}
  h+='</div>';
  this.host.innerHTML=h;
  var els=this.host.querySelectorAll('.cell');
  this.cells=[];
  for(var i=0;i<els.length;i++){
    var e=els[i];
    this.cells.push({el:e,top:e.querySelector('.t span'),bot:e.querySelector('.b span'),ft:e.querySelector('.ft'),fb:e.querySelector('.fb'),
      ftS:e.querySelector('.ft span'),fbS:e.querySelector('.fb span'),cur:' ',target:' ',steps:0,busy:false});
  }
  this.cols=cols;this.rows=rows;
};
function setTxt(s,ch){s.textContent=ch===' '?'':ch;}
function flipStep(cell,from,to,done){
  var T=48;
  if(reduceMotion||!cell.ft.animate){setTxt(cell.top,to);setTxt(cell.bot,to);done();return;}
  setTxt(cell.top,to);setTxt(cell.bot,from);setTxt(cell.ftS,from);setTxt(cell.fbS,to);
  cell.ft.style.visibility='visible';cell.fb.style.visibility='visible';
  var a=cell.ft.animate([{transform:'rotateX(0deg)'},{transform:'rotateX(-90deg)'}],{duration:T,easing:'ease-in',fill:'forwards'});
  var b=cell.fb.animate([{transform:'rotateX(90deg)'},{transform:'rotateX(0deg)'}],{duration:T,delay:T,easing:'ease-out',fill:'both'});
  b.onfinish=function(){
    setTxt(cell.bot,to);cell.ft.style.visibility='hidden';cell.fb.style.visibility='hidden';
    try{a.cancel();b.cancel();}catch(e){}
    done();
  };
}
function runCell(cell){
  (function loop(){
    if(cell.cur===cell.target&&cell.steps<=0){cell.busy=false;return;}
    var nxt;
    if(cell.steps>0){cell.steps--;nxt=randCh(cell.target===' '?cell.cur:cell.target);}
    else nxt=cell.target;
    flipStep(cell,cell.cur,nxt,function(){cell.cur=nxt;loop();});
  })();
}
Board.prototype.set=function(text){
  var minCols=this.minCols||13;
  var L=this.layout(text||'',minCols);
  if(L.cols!==this.cols||L.rows!==this.rows||!this.cells.length)this.build(L.cols,L.rows);
  this.host.setAttribute('role','img');
  this.host.setAttribute('aria-label',text?text:'表示ボード(空白)');
  var n=0,idx=0;
  for(var r=0;r<L.rows;r++)for(var c=0;c<L.cols;c++){
    var cell=this.cells[idx],ch=L.grid[r][c];idx++;
    if(cell.target===ch&&!(cell.cur!==ch&&!cell.busy))continue;
    cell.target=ch;n++;
    if(reduceMotion){cell.cur=ch;cell.steps=0;setTxt(cell.top,ch);setTxt(cell.bot,ch);continue;}
    cell.steps=ch===' '?1+Math.floor(Math.random()*2):2+Math.floor(Math.random()*5);
    if(!cell.busy){cell.busy=true;(function(cl,d){setTimeout(function(){runCell(cl);},d);})(cell,idx*9+Math.random()*140);}
  }
  var clicks=Math.min(9,Math.ceil(n/3));
  for(var k=0;k<clicks;k++)setTimeout(clack,k*75+Math.random()*40);
  this.text=text;
};
