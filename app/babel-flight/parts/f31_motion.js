/* ================= なめらかな動き: screen changes, sheets, questions, small touches =================
   - A screen change no longer cuts: the old screen floats away (a "ghost" copy) while the new one rises in.
     Moving between tabs or steps slides sideways; the same screen re-drawn (a toggle) does not move at all.
   - Sheets close by sliding down (they used to vanish); dialog sheets dim the screen behind a little.
   - In a lesson the answered question slides out to the left as the next one comes in from the right.
   - Small touches: the chosen option pops, a pressed choice bounces, segmented buttons slide their marker.
   Everything is skipped with reduced motion. */
var MOT={key:'',tap:null,seg:{}};
function motOn(){return !reduceMotion;}
/* which screen is showing (a step of the first questions counts as its own screen) */
function motKey(){
  var m=$('main');
  if(m&&m.querySelector('.land'))return 'land';
  if(view==='onboard')return 'onboard:'+obStep;
  if(view==='tune')return 'tune:'+(typeof TUNE==='object'?TUNE.step:0);
  return view;
}
var MOT_ORDER=['home','review','record'];
function motDir(a,b){
  var ia=MOT_ORDER.indexOf(a),ib=MOT_ORDER.indexOf(b);
  if(ia>=0&&ib>=0)return ib>ia?1:-1;
  var sa=/:(\d+)$/.exec(a),sb=/:(\d+)$/.exec(b);
  if(sa&&sb&&a.split(':')[0]===b.split(':')[0])return +sb[1]>+sa[1]?1:-1;
  return 0;
}
/* Copies on their way out live in a closed shadow layer: nothing in the page (or a test) can find or click them,
   and they keep their look because the page's styles are adopted into that layer once. */
var MOT_L=null;
function motLayer(){
  if(MOT_L)return MOT_L;
  var host=document.createElement('div');host.className='mot-layer';host.setAttribute('aria-hidden','true');
  var root=host.attachShadow?host.attachShadow({mode:'closed'}):host,css='';
  document.querySelectorAll('style').forEach(function(s){css+=s.textContent+'\n';});
  css+='.mot-ghost{position:fixed;pointer-events:none;margin:0}';
  try{if(root!==host&&'adoptedStyleSheets' in root&&typeof CSSStyleSheet==='function'){var sh=new CSSStyleSheet();sh.replaceSync(css);root.adoptedStyleSheets=[sh];}else throw 0;}
  catch(e){var st=document.createElement('style');st.textContent=css;root.appendChild(st);}
  document.body.appendChild(host);
  return (MOT_L={host:host,root:root});
}
/* a copy, not the real nodes: the code that is running may still read the button that was tapped.
   Canvases (the route map) are painted into their copies. */
function motCopy(from,to){
  for(var c=from.firstChild;c;c=c.nextSibling)to.appendChild(c.cloneNode(true));
  var a=from.querySelectorAll('canvas'),b=to.querySelectorAll('canvas');
  for(var i=0;i<a.length&&i<b.length;i++){try{if(a[i].width&&a[i].height)b[i].getContext('2d').drawImage(a[i],0,0);}catch(e){}}
}
/* the old screen: its children move into a same-looking box (same tag, id and classes) that floats away */
function motGhost(el,dir,cls){
  if(!el||!el.firstChild)return;
  var r=el.getBoundingClientRect(),g=document.createElement(el.tagName);
  if(el.id)g.id=el.id;
  g.className=(el.className||'').replace(/\b(enter|enter-l|enter-r|mot-in|qin)\b/g,'')+' mot-ghost '+(cls||'')+(dir>0?' to-l':dir<0?' to-r':' to-up');
  g.style.left=r.left+'px';g.style.top=r.top+'px';g.style.width=r.width+'px';
  motCopy(el,g);
  motLayer().root.appendChild(g);
  requestAnimationFrame(function(){requestAnimationFrame(function(){g.classList.add('go');});});
  setTimeout(function(){if(g.parentNode)g.parentNode.removeChild(g);},440);
}
(function(){
  var r0=render;
  render=function(){
    var main=$('main'),from=MOT.key||motKey0(),to=motKeyNext(),changed=from!==to,dir=motDir(from,to);
    if(changed&&motOn()&&main&&main.firstChild&&from)motGhost(main,dir);
    /* the same screen drawn again (a toggle, a setting): no reveal or count-up all over again */
    MOT.quiet=!changed&&!!from&&!HOME_ANIM;
    var out;try{out=r0.apply(this,arguments);}finally{MOT.quiet=false;}
    MOT.key=motKey();
    if(main){
      if(changed&&motOn()){
        main.classList.remove('enter','enter-l','enter-r','mot-in');void main.offsetWidth;
        main.classList.add(dir>0?'enter-r':dir<0?'enter-l':'mot-in');
      }else if(!changed&&main.classList.contains('enter'))main.classList.remove('enter');  /* a toggle: stay still */
    }
    motAfter();
    return out;
  };
  function motKey0(){return '';}
  function motKeyNext(){
    if(view==='onboard')return 'onboard:'+obStep;
    if(view==='tune')return 'tune:'+(typeof TUNE==='object'?TUNE.step:0);
    return view;
  }
})();
(function(){
  var av=animateView;animateView=function(){if(MOT.quiet)return;return av.apply(this,arguments);};
  var rr=revealRows;revealRows=function(){if(MOT.quiet)return;return rr.apply(this,arguments);};
})();
/* lessons and landings draw #main themselves: remember that the screen changed */
(function(){
  var sf=startFlight;startFlight=function(){var r=sf.apply(this,arguments);MOT.key='flight';return r;};
  if(typeof startScene==='function'){var ss=startScene;startScene=function(){var r=ss.apply(this,arguments);MOT.key='scene';return r;};}
  if(typeof land==='function'){var l0=land;land=function(){var r=l0.apply(this,arguments);MOT.key='land';return r;};}
})();
/* sheets: slide down when closed; dialogs dim what is behind them */
(function(){
  var c0=closeSheet;
  closeSheet=function(){
    var h=$('sheetHost'),s=h&&h.querySelector('.sheet');
    if(s&&motOn()){
      var g=document.createElement('div');g.id='sheetHost';g.className='mot-sheet-out';
      motCopy(h,g);
      motLayer().root.appendChild(g);
      setTimeout(function(){if(g.parentNode)g.parentNode.removeChild(g);},300);
    }
    return c0.apply(this,arguments);
  };
  var host=$('sheetHost');
  if(host&&'MutationObserver' in window)new MutationObserver(function(){
    var s=host.querySelector('.sheet.plain,.sheet.share-sheet');
    var dim=host.querySelector('.sheet-dim');
    if(s&&!dim){dim=document.createElement('div');dim.className='sheet-dim';dim.setAttribute('aria-hidden','true');host.insertBefore(dim,host.firstChild);}
    else if(!s&&dim)dim.parentNode.removeChild(dim);
  }).observe(host,{childList:true});
})();
/* lessons: the answered question slides out to the left */
(function(){
  var n0=nextStep;
  nextStep=function(){
    if(motOn()&&F&&F.cur&&F.answered){var q=$('q');if(q&&q.firstChild)motGhost(q,1,'q-ghost');}
    return n0.apply(this,arguments);
  };
})();
/* small touches after each draw */
document.addEventListener('click',function(e){
  var t=e.target.closest&&e.target.closest('button');if(!t)return;
  for(var i=0;i<t.attributes.length;i++){var a=t.attributes[i];if(/^data-/.test(a.name)&&a.name!=='data-tk'){MOT.tap=[a.name,a.value];return;}}
  MOT.tap=null;
},true);
function motAfter(){
  if(!motOn())return;
  /* the choice just tapped bounces (only that one, not every chosen item on the screen) */
  if(MOT.tap){
    var sel='['+MOT.tap[0]+'="'+String(MOT.tap[1]).replace(/"/g,'\\"')+'"][aria-pressed="true"]',b=null;
    try{b=document.querySelector('#main '+sel);}catch(x){}
    if(b){b.classList.remove('tap-pop');void b.offsetWidth;b.classList.add('tap-pop');}
    MOT.tap=null;
  }
  /* segmented buttons: a marker slides from the old choice to the new one */
  document.querySelectorAll('#main .seg').forEach(function(sg){
    var on=sg.querySelector('button[aria-pressed="true"]'),first=sg.querySelector('button');if(!on||!first)return;
    var key='';for(var i=0;i<first.attributes.length;i++){if(/^data-/.test(first.attributes[i].name)){key=first.attributes[i].name;break;}}
    if(!key)return;
    var now={x:on.offsetLeft,y:on.offsetTop,w:on.offsetWidth,h:on.offsetHeight},was=MOT.seg[key];   /* layout values: not thrown off by the press animation */
    MOT.seg[key]=now;
    if(!was||(was.x===now.x&&was.y===now.y))return;
    var ind=document.createElement('span');ind.className='seg-ind';ind.setAttribute('aria-hidden','true');
    var cs=getComputedStyle(on);ind.style.borderRadius=cs.borderRadius;ind.style.background=cs.backgroundColor;
    ind.style.transform='translate('+was.x+'px,'+was.y+'px)';ind.style.width=was.w+'px';ind.style.height=was.h+'px';
    sg.classList.add('has-ind');sg.appendChild(ind);
    requestAnimationFrame(function(){requestAnimationFrame(function(){ind.style.transform='translate('+now.x+'px,'+now.y+'px)';ind.style.width=now.w+'px';ind.style.height=now.h+'px';});});
    setTimeout(function(){sg.classList.remove('has-ind');if(ind.parentNode)ind.parentNode.removeChild(ind);},380);
  });
}
