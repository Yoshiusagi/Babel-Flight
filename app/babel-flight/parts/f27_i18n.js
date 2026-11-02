/* ================= 表示言語 (display language: 日本語 / English / 한국어 / 简体中文) =================
   The page is written in Japanese. For another display language the dictionary public/i18n/<ui>.json
   (built from babel-flight/i18n/<ui>/*.tsv by i18n/build.py) is loaded, kept on the device, and every
   Japanese text that reaches the page is swapped as it is inserted (a MutationObserver over the whole
   document), so the render functions stay as they are. Lookup: the exact text, then the text with its numbers
   and Latin words replaced by {0} {1} …, then also with names (languages, cities) replaced; the dictionary
   holds those templates. Learning-language text (.ko .zh .ar, the flight board, [translate=no]) is never touched.
   The display language's own course is hidden (a 한국어 speaker doesn't learn Korean here) and, until the other
   modes are translated, only 日常会話モード is open (職業 / 留学 show 準備中, 検定 is off).
   Readings: katakana for 日本語; otherwise romanization (Korean and Russian made here, Chinese pinyin from the
   data, Arabic from ROM_AR) or none for languages written in Latin letters. */
var UI_LANGS=[['ja','日本語'],['en','English'],['ko','한국어'],['zh','简体中文']];
var UI_KEY='bf.ui',UI_DKEY='bf.i18n.',UI='ja',I18N=null,UI_MISS=null,UI_OBS=null;
var JPX=/[\u3040-\u30ff\u3400-\u9fff\uff01-\uff5e]/;
/* the display languages this build has a dictionary for (I18N_UIS, f27_i18nv.js) */
function uiValid(v){return v==='ja'||(typeof I18N_UIS!=='undefined'&&I18N_UIS.indexOf(v)>=0);}
/* first visit: follow the browser's language */
function uiGuess(){
  var ls=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||'ja']);
  for(var i=0;i<ls.length;i++){var l=String(ls[i]||'').toLowerCase().slice(0,2);if(uiValid(l))return l;}
  /* any other browser language: English if there is one, rather than Japanese */
  var first=String(ls[0]||'ja').toLowerCase().slice(0,2);
  return first!=='ja'&&uiValid('en')?'en':'ja';
}
function uiStored(){var v=lsGet(UI_KEY);return uiValid(v)?v:'';}
/* T(): one string in code (canvas text, document.title); the page itself is handled by the observer */
function T(s){
  if(UI==='ja'||!I18N||s==null)return s;
  s=String(s);if(!JPX.test(s))return s;var r=uiLook(s);return r==null?s:r;
}
var UI_NAMES=null;
function uiNames(){
  if(UI_NAMES!==null)return UI_NAMES;
  var n={};ORDER.forEach(function(k){n[LANGS[k].name]=1;n[LANGS[k].city]=1;});
  if(typeof CITIES==='object')Object.keys(CITIES).forEach(function(k){(CITIES[k]||[]).forEach(function(c){if(c&&c[1])n[c[1]]=1;});});
  if(typeof PROF==='object'&&PROF.forEach)PROF.forEach(function(p){if(p&&p.jp)n[p.jp]=1;});
  if(typeof UM==='object')Object.keys(UM).forEach(function(k){if(UM[k]&&UM[k].jp)n[UM[k].jp]=1;});
  if(typeof SCENE_META==='object')Object.keys(SCENE_META).forEach(function(k){n[SCENE_META[k].role]=1;});
  if(typeof RANKS==='object')RANKS.forEach(function(r){n[r[0]]=1;});
  var list=Object.keys(n).filter(function(x){return x&&JPX.test(x);}).sort(function(a,b){return b.length-a.length;});
  UI_NAMES=list.length?new RegExp(list.map(function(x){return x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}).join('|'),'g'):false;
  return UI_NAMES;
}
var UI_TOK=/「[^「」\u3040-\u30ff\u3400-\u9fff]*」|[A-Za-z0-9\u00a1\u00bf\u00c0-\u024f\u0400-\u04ff\uac00-\ud7af\u0600-\u06ff\u2605\u2606][A-Za-z0-9\u00c0-\u024f\u0400-\u04ff\uac00-\ud7af\u0600-\u06ff.,:'\u2019+%\-\/\u2605\u2606]*/g;
/* the template keys a text is looked up under (for the dictionary tools): [numbers and Latin words as {n}, also names as {n}] */
function uiKeys(s){
  var core=String(s).trim(),k1=core.replace(UI_TOK,(function(){var i=0;return function(){return '{'+(i++)+'}';};})()),re=uiNames(),n=0;
  var k2=core.replace(UI_TOK,function(x){return '\u0001'+x+'\u0002';}).replace(/\u0001([^\u0002]*)\u0002|[^\u0001]+/g,function(seg,lat){
    if(lat!=null)return '{'+(n++)+'}';return re?seg.replace(re,function(){return '{'+(n++)+'}';}):seg;});
  return [k1,k2];
}
function uiLook(s){
  var D=I18N.d,v=D[s];if(v!=null)return v;
  var m=/^(\s*)([\s\S]*?)(\s*)$/.exec(s),core=m[2];
  if(core!==s){v=D[core];if(v!=null)return m[1]+v+m[3];}
  var toks=[],key=core.replace(UI_TOK,function(x){toks.push(x);return '{'+(toks.length-1)+'}';});
  v=toks.length?D[key]:null;
  if(v==null){
    var re=uiNames();if(!re){var pq=uiLookParts(core);return pq==null?null:m[1]+pq+m[3];}
    var toks2=[],key2=core.replace(UI_TOK,function(x){return '\u0001'+x+'\u0002';});
    key2=key2.replace(/\u0001([^\u0002]*)\u0002|[^\u0001]+/g,function(seg,lat){
      if(lat!=null){toks2.push(lat);return '{'+(toks2.length-1)+'}';}
      return seg.replace(re,function(nm){toks2.push(nm);return '{'+(toks2.length-1)+'}';});});
    if(!toks2.length||key2===key||D[key2]==null){var pp=uiLookParts(core);return pp==null?null:m[1]+pp+m[3];}
    v=D[key2];toks=toks2;
  }
  v=v.replace(/\{(\d+)\}/g,function(_,i){var t=toks[+i];if(t==null)return '';if(t.charAt(0)==='\u300c')return '\u201c'+t.slice(1,-1)+'\u201d';var tr=JPX.test(t)?D[t]:null;return tr!=null?tr:t;});
  return m[1]+v+m[3];
}
/* a sentence with a remark in brackets at the end (読み方のヒント, イギリス英語では「…」): each part on its own */
function uiLookParts(core){
  var p=/^([\s\S]*?\S)\s*([(\uff08][^()\uff08\uff09]*[)\uff09])$/.exec(core);if(!p)return null;
  var a=uiLook(p[1]),b=uiLook(p[2]);
  return a!=null&&b!=null?a+' '+b:null;
}
var UI_NO='.ko,.zh,.ar,.ja,.brtl,.cell,[translate="no"],script,style,textarea';
function uiSkip(el){return !!(el&&el.closest&&el.closest(UI_NO));}
var UI_ATTR=['aria-label','title','placeholder','alt'];
function uiText(n){
  var s=n.nodeValue;
  if(!s||n.__uiOut===s||!JPX.test(s))return;
  var p=n.parentNode;if(!p||uiSkip(p))return;
  /* data-tk: the dictionary key when the same Japanese word means different things (やめる = quit / cancel) */
  var tk=p.getAttribute&&p.getAttribute('data-tk'),r=tk?(I18N.d[tk]!=null?I18N.d[tk]:null):uiLook(s);
  if(r!=null&&r!==s){n.__uiOut=r;n.nodeValue=r;}
  else if(UI_MISS&&r==null)UI_MISS[s.trim()]=(UI_MISS[s.trim()]||0)+1;
}
function uiAttrs(el){
  for(var i=0;i<UI_ATTR.length;i++){
    var a=UI_ATTR[i],s=el.getAttribute(a);
    if(!s||el['__ui'+a]===s||!JPX.test(s))continue;
    var r=uiLook(s);
    if(r!=null&&r!==s){el['__ui'+a]=r;el.setAttribute(a,r);}
    else if(UI_MISS&&r==null)UI_MISS[s.trim()]=(UI_MISS[s.trim()]||0)+1;
  }
}
function uiWalk(root){
  if(!root||UI==='ja'||!I18N)return;
  if(root.nodeType===3){uiText(root);return;}
  if(root.nodeType!==1&&root.nodeType!==11)return;
  if(root.nodeType===1){if(uiSkip(root))return;uiAttrs(root);}
  var w=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,{acceptNode:function(n){
    if(n.nodeType===1)return n.matches(UI_NO)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;
    return NodeFilter.FILTER_ACCEPT;}});
  var n,texts=[],els=[];
  while((n=w.nextNode())){if(n.nodeType===3)texts.push(n);else els.push(n);}
  for(var i=0;i<els.length;i++)if(els[i].attributes.length)uiAttrs(els[i]);
  for(i=0;i<texts.length;i++)uiText(texts[i]);
}
function uiObserve(){
  if(UI_OBS||typeof MutationObserver==='undefined')return;
  UI_OBS=new MutationObserver(function(list){
    if(UI==='ja'||!I18N)return;
    for(var i=0;i<list.length;i++){var m=list[i];
      if(m.type==='childList'){for(var j=0;j<m.addedNodes.length;j++)uiWalk(m.addedNodes[j]);}
      else if(m.type==='characterData')uiText(m.target);
      else if(m.type==='attributes'&&m.target.nodeType===1&&!uiSkip(m.target))uiAttrs(m.target);
    }
  });
  UI_OBS.observe(document.documentElement,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:UI_ATTR});
}
/* the dictionary is kept on the device (bf.i18n.<ui>) so the page opens straight in that language;
   it is fetched again when the page's I18N_V (f27_i18nv.js, written by build.py) differs */
function uiCached(l){try{var d=JSON.parse(localStorage.getItem(UI_DKEY+l)||'null');return d&&d.d&&d.v?d:null;}catch(e){return null;}}
function uiFetch(l,done){
  fetch(bfSiteUrl('/i18n/'+l+'.json'),{cache:'no-cache'}).then(function(r){if(!r.ok)throw new Error('http');return r.json();}).then(function(d){
    if(!d||!d.d)throw new Error('bad');
    try{localStorage.setItem(UI_DKEY+l,JSON.stringify(d));}catch(e){}
    done(d);
  }).catch(function(){done(null);});
}
function uiFont(){
  var h=document.documentElement;
  h.setAttribute('lang',UI==='zh'?'zh-Hans':UI);
  h.classList.toggle('ui-ko',UI==='ko');h.classList.toggle('ui-zh',UI==='zh');h.classList.toggle('ui-en',UI==='en');h.classList.toggle('ui-x',UI!=='ja');
}
/* ---- readings ---- */
var KO_I=['g','kk','n','d','tt','r','m','b','pp','s','ss','','j','jj','ch','k','t','p','h'];
var KO_V=['a','ae','ya','yae','eo','e','yeo','ye','o','wa','wae','oe','yo','u','wo','we','wi','yu','eu','ui','i'];
/* final consonants: [sound at the end, part that stays before a vowel, part that moves to the vowel] */
var KO_F=[['','',''],['k','','g'],['k','','kk'],['k','k','s'],['n','','n'],['n','n','j'],['n','','n'],['t','','d'],['l','','r'],['k','l','g'],['m','l','m'],['l','l','b'],['l','l','s'],['l','l','t'],['p','l','p'],['l','','r'],['m','','m'],['p','','b'],['p','p','s'],['t','','s'],['t','','ss'],['ng','ng',''],['t','','j'],['t','','ch'],['k','','k'],['t','','t'],['p','','p'],['t','','']];
/* Korean → Revised Romanization as pronounced (linking, nasal and ㄹ assimilation, ㅎ) */
function romKo(s){
  var syl=[],i,c,out='';
  for(i=0;i<s.length;i++){c=s.charCodeAt(i)-0xAC00;syl.push(c>=0&&c<11172?{i:Math.floor(c/588),v:Math.floor(c%588/28),f:c%28,o:null}:{x:s[i]});}
  for(i=0;i<syl.length;i++){
    var a=syl[i],b=syl[i+1];
    if(a.x!==undefined){out+=a.x;continue;}
    var ini=a.o!==null?a.o:KO_I[a.i],F=KO_F[a.f],fin=F[0],h=a.f===27||a.f===6||a.f===15;
    if(b&&b.x===undefined&&a.f){
      if(b.i===11){fin=F[1];b.o=F[2];}
      else if(h&&(b.i===0||b.i===3||b.i===12)){fin=a.f===6?'n':a.f===15?'l':'';b.o=b.i===0?'k':b.i===3?'t':'ch';}
      else if(h&&b.i===2){fin=a.f===15?'l':'n';if(a.f===15)b.o='l';}
      else if(b.i===18&&/^[ktp]$/.test(fin)){b.o=fin;fin='';}
      else if((b.i===2||b.i===6)&&/^[ktp]$/.test(fin))fin={k:'ng',t:'n',p:'m'}[fin];
      else if(b.i===5&&(fin==='n'||fin==='l')){fin='l';b.o='l';}
      else if(b.i===5){b.o='n';if(fin==='k')fin='ng';else if(fin==='p')fin='m';}
      else if(b.i===2&&fin==='l')b.o='l';
    }
    out+=ini+KO_V[a.v]+fin;
  }
  return out.replace(/\s+/g,' ').trim();
}
var RU_T={'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'};
function romRu(s){
  var out='',prev='';
  for(var i=0;i<s.length;i++){var c=s[i],lo=c.toLowerCase(),t=RU_T[lo];
    if(t===undefined){out+=c;prev=c;continue;}
    if(lo==='е'&&(!/[а-яё]/i.test(prev)||/[аеёиоуыэюяъь]/i.test(prev)))t='ye';
    if(c!==lo&&t)t=t[0].toUpperCase()+t.slice(1);
    out+=t;prev=c;}
  return out;
}
function uiRom(L,o){
  var t=o.t!=null?o.t:o.a;if(!t)return '';
  if(L==='ko')return romKo(t);
  if(L==='ru')return romRu(t);
  if(L==='zh'||L==='ja')return o._r;
  if(L==='ar')return (typeof ROM_AR==='object'&&ROM_AR[t])||'';
  return '';
}
/* swap every phrase reading: katakana (kept in _r) for 日本語, romanization otherwise */
function uiReadings(){
  function fix(L,o){if(o._r===undefined)o._r=o.r||'';o.r=UI==='ja'?o._r:uiRom(L,o);}
  ORDER.forEach(function(L){
    var U=UNITS[L];if(U)Object.keys(U).forEach(function(u){(U[u].items||[]).forEach(function(it){fix(L,it);});});
    var S=typeof SCN==='object'&&SCN[L];if(S)Object.keys(S).forEach(function(id){(S[id].turns||[]).forEach(function(t){fix(L,t);});});
  });
}
/* ---- what the display language offers ---- */
function learnOrder(){return ORDER.filter(function(k){return k!==UI;});}
function uiModeOpen(m){return UI==='ja'||m==='daily'||m==='exam'||m==='study'||m==='job';}
function uiFixSave(){
  if(UI==='ja')return;
  if(save.lang===UI){var alt=learnOrder().filter(function(k){return langStarted(k);})[0]||learnOrder()[0];save.lang=alt;}
  if(obDraft&&obDraft.lang===UI)obDraft.lang=learnOrder()[0];
}
function uiApply(l,d){
  UI=l;I18N=l==='ja'?null:d;uiFont();if(typeof uiSwap==='function')uiSwap();uiReadings();
  if(UI!=='ja'){uiFixSave();uiObserve();uiCanvas();}
}
/* text drawn on a canvas (the share images) goes through T() too */
var UI_CV=false;
function uiCanvas(){
  if(UI_CV||typeof CanvasRenderingContext2D==='undefined')return;UI_CV=true;
  var P=CanvasRenderingContext2D.prototype,ft=P.fillText,mt=P.measureText;
  P.fillText=function(t){var a=Array.prototype.slice.call(arguments);a[0]=T(t);return ft.apply(this,a);};
  P.measureText=function(t){return mt.call(this,T(t));};
}
/* the switch (onboarding or 記録 → 学習の設定): load the dictionary, then reload the page in that language */
var UI_BUSY=false,UI_ERR=false;
function uiSet(l){
  if(!uiValid(l)||UI_BUSY)return;
  if(l===UI)return;
  if(l==='ja'){lsSet(UI_KEY,'ja');location.reload();return;}
  var c=uiCached(l);
  if(c&&c.v===I18N_V){lsSet(UI_KEY,l);location.reload();return;}
  UI_BUSY=true;document.documentElement.classList.add('ui-busy');
  uiFetch(l,function(d){
    UI_BUSY=false;document.documentElement.classList.remove('ui-busy');
    if(!d){UI_ERR=true;render();return;}
    lsSet(UI_KEY,l);location.reload();
  });
}
/* at start (before the first render): the stored choice, or the browser's language on a first visit */
/* the display language for the usage count: the one being opened, even while its dictionary is still loading */
var UI_WANT='ja';
function uiTrackLang(){return UI!=='ja'?UI:UI_WANT;}
function uiBoot(){
  var l=uiStored()||(save.onboarded?'ja':uiGuess());UI_WANT=l;
  if(l==='ja'){uiFont();return;}
  var c=uiCached(l);
  if(c){uiApply(l,c);if(c.v!==I18N_V)uiFetch(l,function(d){if(d){I18N=d;uiWalk(document.body);}});return;}
  /* nothing on the device yet: open in Japanese and switch as soon as the dictionary arrives */
  uiFont();
  uiFetch(l,function(d){if(!d)return;lsSet(UI_KEY,l);uiApply(l,d);render();uiWalk(document.body);});
}
/* the picker row (onboarding top, settings): each name in its own language */
function uiPickHTML(){
  var ls=UI_LANGS.filter(function(t){return uiValid(t[0]);});
  return '<div class="uipick" role="group" aria-label="Language" translate="no" style="--n:'+ls.length+'">'+ls.map(function(t){
    return '<button type="button" data-ui-set="'+t[0]+'" lang="'+(t[0]==='zh'?'zh-Hans':t[0])+'" aria-pressed="'+(UI===t[0])+'">'+t[1]+'</button>';
  }).join('')+'</div>'+(UI_ERR?'<p class="dim hint uierr">Offline: the language could not be switched. / ネットにつながらないため、切り替えられませんでした。</p>':'');
}
