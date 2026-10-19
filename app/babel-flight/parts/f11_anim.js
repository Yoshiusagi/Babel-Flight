/* ================= VIEW ANIMATIONS ================= */
var PREVVIEW=null,RVO=null;
function countUp(el){
  var walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null),node=null,m=null;
  while(walker.nextNode()){m=/(\d[\d,]*)/.exec(walker.currentNode.nodeValue);if(m){node=walker.currentNode;break;}}
  if(!node)return;
  var raw=m[1],target=parseInt(raw.replace(/,/g,''),10);if(!target)return;
  var comma=raw.indexOf(',')>=0||target>=1000,padTo=raw.charAt(0)==='0'?raw.length:0,pre=node.nodeValue.slice(0,m.index),post=node.nodeValue.slice(m.index+raw.length),t0=performance.now(),dur=Math.min(1100,450+target*6);
  function f(v){var s=comma?v.toLocaleString('en-US'):String(v);while(s.length<padTo)s='0'+s;return s;}
  (function step(now){
    var t=clamp((now-t0)/dur,0,1),e=1-Math.pow(1-t,3);
    node.nodeValue=pre+f(Math.round(target*e))+post;
    if(t<1)requestAnimationFrame(step);
  })(t0);
}
function animateView(){
  var m=$('main');if(!m||reduceMotion)return;
  [].slice.call(m.children).forEach(function(el,i){el.style.setProperty('--i',i);el.classList.add('rv');});
  m.querySelectorAll('.kpi .v,.due-board,.mcount,.pill .v,.goal-pill .v').forEach(countUp);
  m.querySelectorAll('.slot.got').forEach(function(s,i){s.style.setProperty('--j',Math.min(i,14));s.classList.add('pop');});
  m.querySelectorAll('.prof').forEach(function(s,i){s.style.setProperty('--j',Math.min(i,14));s.classList.add('pop2');});
}
function revealRows(){
  if(reduceMotion||!('IntersectionObserver' in window))return;
  if(RVO)RVO.disconnect();
  RVO=new IntersectionObserver(function(es){
    var n=0;
    es.forEach(function(e){if(e.isIntersecting){var el=e.target;el.style.setProperty('--k',Math.min(n++,10));el.classList.add('in');RVO.unobserve(el);}});
  },{rootMargin:'0px 0px -4% 0px'});
  document.querySelectorAll('#main .stop,#main .leg-h,#main .course').forEach(function(el){RVO.observe(el);});
}
