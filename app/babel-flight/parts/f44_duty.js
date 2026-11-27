/* ================= DUTY FREE 機内販売 (single cosmetic items; test account only for now) =================
   Small things to buy once and keep: リバリー (the plane's colours on the map, the flight bar and the 搭乗券),
   搭乗券デザイン, サウンドパック (the カチカチ of the flight board), アイコン枠 and 称号 (the ID card in 記録).
   Price 80〜160円; some can also be exchanged for miles. Spending miles never lowers the status: the status counts
   save.miles, the shop only counts what is left after save.df.ms (miles already exchanged).
   Brakes for a young audience: every purchase has a final confirmation (what, price, no refund), and a monthly limit
   (default 500円, raising it asks for a guardian's OK).
   Paid items are TEST purchases for now (no money moves): real payments are not open yet. When they open, a purchase
   must be recorded on the server (Stripe on the website, In-App Purchase in the iPhone app) and save.df.own must come
   from there, like the classes do. Website only, test account only: dfOn(). */
var DF_KINDS=[['lv','リバリー','機体のデザイン'],['ps','搭乗券','ホームの搭乗券'],['sd','サウンド','カチカチ音'],['fr','アイコン枠','IDカードの写真'],['tt','称号','IDカードの肩書き']];
/* [kind, id, name, yen, miles (0 = 円だけ), description, look, limited] */
var DF_ITEMS=[
 ['lv','lv-sunset','サンセット',120,0,'夕焼けのオレンジから、ピンクへのグラデーション。',['#ff9a3c','#ff5e8a']],
 ['lv','lv-navy','ミッドナイトネイビー',120,1500,'深い紺に、金色のライン。夜の国際線のイメージです。',['#22346e','#d9b25a']],
 ['lv','lv-sakura','さくら',120,0,'やわらかい桜色。春のフライトに。',['#ffc2d6','#ff7aa8']],
 ['lv','lv-mint','ミントジェット',80,800,'さわやかなミントグリーン。',['#5fe0b0','#1aa37a']],
 ['lv','lv-aurora','オーロラ',160,0,'北極圏の空の色。グリーンからむらさきへ。',['#6cf0c2','#8a7bff'],1],
 ['ps','ps-retro','レトロペーパー',80,0,'昔の紙の航空券のような、あたたかい色。',['#f4e7c9','#4a3423','#b5562b']],
 ['ps','ps-night','ナイトフライト',120,1500,'夜空の紺に、金色の文字。',['#14203f','#eef3ff','#ffd34d']],
 ['ps','ps-holo','ホログラム',160,0,'角度で色が変わる、虹色の搭乗券。',['#e9f6ff','#1b2440','#b58cff'],1],
 ['sd','sd-wood','ウッド',120,0,'木の札がめくれるような、低くてやわらかい音。',[600,900,.034,3,.3,'bp']],
 ['sd','sd-metal','メタル',120,0,'金属のフラップが当たる、高くて澄んだ音。',[3400,4400,.012,2.6,.14,'bp',2600]],
 ['sd','sd-soft','ASMRソフト',120,1500,'小さく、まるい音。ずっと聞いていられる心地よさに。',[900,1300,.026,1.6,.16,'lp']],
 ['fr','fr-gold','ゴールドリング',80,0,'写真のまわりに、金色のふち。',['#d9b25a']],
 ['fr','fr-runway','滑走路ライト',80,800,'夜の滑走路のライトのような点線のふち。',['#ffd34d']],
 ['tt','tt-nav','ナビゲーター',80,0,'IDカードに「ナビゲーター」の肩書き。',['🧭']],
 ['tt','tt-jet','ジェットセッター',80,0,'世界中を飛び回る人の肩書き。',['🌍']],
 ['tt','tt-red','レッドアイの常連',80,800,'夜おそくまで飛ぶ人の肩書き(深夜便のこと)。',['🌙']]
];
var DF_MAP={};DF_ITEMS.forEach(function(x){DF_MAP[x[1]]=x;});
var DF_CAPS=[[0,'購入しない'],[300,'300円'],[500,'500円'],[1000,'1,000円'],[-1,'上限なし']];
var DF_CAP0=500;
var DFU={tab:'lv',msg:''};

function dfOn(){return typeof cabinOn==='function'&&cabinOn()&&typeof cabinTester==='function'&&cabinTester();}
function dfYen(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,',');}
function dfYM(){var d=new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2);}
function dfClean(x){
  var o={own:[],eq:{},ms:0,mon:{},cap:DF_CAP0,log:[]};
  if(!x||typeof x!=='object')return o;
  if(Array.isArray(x.own))x.own.forEach(function(id){if(DF_MAP[id]&&o.own.indexOf(id)<0)o.own.push(id);});
  if(x.eq&&typeof x.eq==='object')DF_KINDS.forEach(function(k){var v=x.eq[k[0]];if(typeof v==='string'&&DF_MAP[v]&&DF_MAP[v][0]===k[0]&&o.own.indexOf(v)>=0)o.eq[k[0]]=v;});
  o.ms=+x.ms>0?Math.floor(+x.ms):0;
  if(x.mon&&typeof x.mon==='object')Object.keys(x.mon).forEach(function(k){var v=+x.mon[k];if(/^\d{4}-\d\d$/.test(k)&&v>0)o.mon[k]=Math.round(v);});
  var c=+x.cap;if(DF_CAPS.some(function(p){return p[0]===c;}))o.cap=c;
  if(Array.isArray(x.log))o.log=x.log.filter(function(l){return l&&DF_MAP[l.id]&&+l.t>0;}).map(function(l){return {id:l.id,t:+l.t,yen:+l.yen>0?Math.round(+l.yen):0,mi:+l.mi>0?Math.round(+l.mi):0};}).slice(-60);
  return o;
}
/* both copies of the save keep everything bought on either one */
function dfUnion(a,b,newer){
  var A=dfClean(a),B=dfClean(b),N=dfClean(newer),o=N;
  o.own=A.own.concat(B.own.filter(function(id){return A.own.indexOf(id)<0;}));
  o.ms=Math.max(A.ms,B.ms);
  var mon={};[A.mon,B.mon].forEach(function(m){Object.keys(m).forEach(function(k){mon[k]=Math.max(mon[k]||0,m[k]);});});o.mon=mon;
  var seen={},log=[];A.log.concat(B.log).forEach(function(l){var k=l.id+'@'+l.t;if(!seen[k]){seen[k]=1;log.push(l);}});
  o.log=log.sort(function(x,y){return x.t-y.t;}).slice(-60);
  return dfClean(o);
}
function dfS(){if(!save.df||typeof save.df!=='object')save.df=dfClean(null);return save.df;}
function dfOwn(id){return dfS().own.indexOf(id)>=0;}
function dfEq(kind){if(!dfOn())return '';var v=dfS().eq[kind];return v&&dfOwn(v)?v:'';}
function dfMiLeft(){return Math.max(0,(save.miles||0)-dfS().ms);}
function dfMonth(){return dfS().mon[dfYM()]||0;}
function dfCapLeft(){var c=dfS().cap;return c<0?Infinity:Math.max(0,c-dfMonth());}

/* ---- the look, on the whole page ---- */
function dfApply(){
  var r=rootEl,lv=DF_MAP[dfEq('lv')],ps=dfEq('ps'),fr=dfEq('fr');
  if(lv){r.setAttribute('data-lv',lv[1]);r.style.setProperty('--lv1',lv[6][0]);r.style.setProperty('--lv2',lv[6][1]);}
  else{r.removeAttribute('data-lv');r.style.removeProperty('--lv1');r.style.removeProperty('--lv2');}
  if(ps)r.setAttribute('data-ps',ps);else r.removeAttribute('data-ps');
  if(fr)r.setAttribute('data-fr',fr);else r.removeAttribute('data-fr');
}
/* the plane on the home route map (canvas, drawn in the plane's own coordinates: tail -18 … nose 14) */
function dfPlaneFill(g){
  var lv=DF_MAP[dfEq('lv')];if(!lv)return '';
  try{var gr=g.createLinearGradient(-18,0,14,0);gr.addColorStop(0,lv[6][0]);gr.addColorStop(1,lv[6][1]);return gr;}catch(e){return lv[6][0];}
}
/* サウンドパック: the flight board's clack in another material */
function dfClack(p){
  if(!save.sound)return;var a=audio();if(!a)return;
  try{
    var n=Math.floor(a.sampleRate*p[2]),b=a.createBuffer(1,n,a.sampleRate),c=b.getChannelData(0);
    for(var i=0;i<n;i++)c[i]=(Math.random()*2-1)*Math.pow(1-i/n,p[3]);
    var s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();
    s.buffer=b;f.type=p[5]==='lp'?'lowpass':'bandpass';f.frequency.value=p[0]+Math.random()*(p[1]-p[0]);if(p[5]==='bp')f.Q.value=p[0]<1000?1.4:0.9;
    g.gain.value=p[4];s.connect(f);f.connect(g);g.connect(a.destination);s.start();
    if(p[6]){var t=a.currentTime,o=a.createOscillator(),og=a.createGain();o.type='sine';o.frequency.setValueAtTime(p[6]+Math.random()*300,t);
      og.gain.setValueAtTime(0.0001,t);og.gain.exponentialRampToValueAtTime(0.012,t+0.003);og.gain.exponentialRampToValueAtTime(0.0001,t+0.09);
      o.connect(og);og.connect(a.destination);o.start(t);o.stop(t+0.1);}
  }catch(e){}
}
(function(){
  var c0=clack;
  clack=function(){var sd=DF_MAP[dfEq('sd')];if(sd)return dfClack(sd[6]);return c0.apply(this,arguments);};
})();
function dfPlayDemo(id){
  var it=DF_MAP[id];if(!it)return;var on=save.sound;save.sound=true;
  for(var k=0;k<6;k++)(function(k){setTimeout(function(){if(it[0]==='sd')dfClack(it[6]);},k*70);})(k);
  setTimeout(function(){save.sound=on;},500);
}
/* 称号 on the ID card */
(function(){
  var r0=recordHTML;
  recordHTML=function(){
    var h=r0.apply(this,arguments),tt=DF_MAP[dfEq('tt')];
    if(tt)h=h.replace('<div class="cls">','<div class="df-tt"><span aria-hidden="true">'+tt[6][0]+'</span>'+esc(tt[2])+'</div><div class="cls">');
    return h;
  };
})();
(function(){var e0=entSet;entSet=function(){var r=e0.apply(this,arguments);dfApply();return r;};})();

/* ---- previews ---- */
function dfPlaneSVG(c1,c2,uid){
  return '<svg class="df-plane" viewBox="-20 -14 36 28" aria-hidden="true"><defs><linearGradient id="dfg-'+uid+'" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="'+c1+'"/><stop offset="1" stop-color="'+c2+'"/></linearGradient></defs><path d="'+PLANE_D+'" fill="url(#dfg-'+uid+')"/></svg>';
}
function dfPreview(it,big){
  var k=it[0],l=it[6],u=it[1]+(big?'-b':'');
  if(k==='lv')return '<div class="df-pv pv-lv">'+dfPlaneSVG(l[0],l[1],u)+'</div>';
  if(k==='ps')return '<div class="df-pv pv-ps '+it[1]+'" style="--pb:'+l[0]+';--pi:'+l[1]+';--pa:'+l[2]+'"><span class="pv-tk"><b>HND</b><i>✈</i><b>ICN</b></span></div>';
  if(k==='sd')return '<div class="df-pv pv-sd"><span aria-hidden="true">🔊</span>'+(big?'':'<small>タップで試聴</small>')+'</div>';
  if(k==='fr')return '<div class="df-pv pv-fr"><span class="df-ph '+it[1]+'" style="--fc:'+l[0]+'">'+avatarHTML()+'</span></div>';
  return '<div class="df-pv pv-tt"><span class="df-tt"><span aria-hidden="true">'+l[0]+'</span>'+esc(it[2])+'</span></div>';
}
function dfPriceHTML(it){
  if(dfOwn(it[1]))return dfEq(it[0])===it[1]?'<span class="df-st on">使用中</span>':'<span class="df-st">持っています</span>';
  return '<span class="df-yen">'+it[3]+'円</span>'+(it[4]?'<span class="df-mi">または '+dfYen(it[4])+'マイル</span>':'');
}

/* ---- 記録: the shop card ---- */
function dfCardHTML(){
  if(!dfOn())return '';
  var n=dfS().own.length,cap=dfS().cap;
  return '<section class="card df-card"><div class="card-h"><h2 class="jh">DUTY FREE ・ 機内販売</h2><span class="lbl">テスト用だけ</span></div>'+
    '<p class="dim hint">機体の色、搭乗券、カチカチ音などを、1つ80〜160円で着せかえられます。マイルで交換できるものもあります。</p>'+
    '<div class="df-sum"><span><b>'+n+'</b>持っているもの</span><span><b>'+dfYen(dfMiLeft())+'</b>交換に使えるマイル</span><span><b>'+(cap<0?'なし':dfYen(cap)+'円')+'</b>1か月の上限</span></div>'+
    '<button class="go sm" type="button" data-df-open>ショップを開く<small>テスト購入なので、お金はかかりません</small></button></section>';
}
(function(){var c0=cabinCardHTML;cabinCardHTML=function(){return c0.apply(this,arguments)+dfCardHTML();};})();

/* ---- the shop (a sheet) ---- */
function dfShop(tab){
  if(!dfOn())return;if(tab)DFU.tab=tab;
  var t=DFU.tab,items=DF_ITEMS.filter(function(x){return x[0]===t;}),kind=DF_KINDS.filter(function(k){return k[0]===t;})[0];
  var eq=dfS().eq[t]||'';
  $('sheetHost').innerHTML='<div class="sheet plain df-sheet" role="dialog" aria-label="DUTY FREE"><div class="sheet-in">'+
    '<div class="df-top"><span class="lbl">DUTY FREE ・ 機内販売</span><button class="x" type="button" data-close-sheet aria-label="閉じる">'+closeIcon()+'</button></div>'+
    '<h3>ショップ</h3>'+
    '<p class="bill-test sm"><b>🧪 テスト購入</b><span>まだ本物の支払いは始まっていないので、お金はかかりません。</span></p>'+
    (DFU.msg?'<p class="df-msg" role="status">'+DFU.msg+'</p>':'')+
    '<div class="df-tabs" role="tablist">'+DF_KINDS.map(function(k){return '<button type="button" role="tab" data-df-tab="'+k[0]+'" aria-selected="'+(k[0]===t)+'">'+k[1]+'</button>';}).join('')+'</div>'+
    '<p class="dim hint">'+esc(kind[2])+'が変わります。</p>'+
    '<div class="df-grid">'+items.map(function(it){
      return '<button type="button" class="df-item'+(dfOwn(it[1])?' own':'')+(eq===it[1]?' eq':'')+'" data-df-item="'+it[1]+'">'+(it[7]?'<i class="df-ltd">限定</i>':'')+dfPreview(it)+
        '<b>'+esc(it[2])+'</b>'+dfPriceHTML(it)+'</button>';}).join('')+'</div>'+
    (eq?'<button class="ghost" type="button" data-df-unequip="'+t+'">標準のデザインにもどす</button>':'')+
    '<div class="df-foot"><span>今月の購入 <b>'+dfYen(dfMonth())+'円</b> / 上限 '+(dfS().cap<0?'なし':dfYen(dfS().cap)+'円')+'</span><button class="ghost" type="button" data-df-settings>上限と履歴</button></div>'+
    '</div></div>';
  DFU.msg='';
}
function dfItemSheet(id){
  var it=DF_MAP[id];if(!it||!dfOn())return;
  var own=dfOwn(id),on=dfEq(it[0])===id,mi=dfMiLeft(),capL=dfCapLeft();
  var h='<div class="sheet plain df-sheet" role="dialog" aria-label="'+esc(it[2])+'"><div class="sheet-in">'+
    '<div class="df-top"><span class="lbl">'+esc(DF_KINDS.filter(function(k){return k[0]===it[0];})[0][1])+(it[7]?' ・ 限定':'')+'</span><button class="x" type="button" data-df-back aria-label="戻る">'+closeIcon()+'</button></div>'+
    '<div class="df-big">'+dfPreview(it,true)+'</div><h3>'+esc(it[2])+'</h3><p class="df-desc">'+esc(it[5])+'</p>';
  if(it[0]==='sd')h+='<button class="ghost" type="button" data-df-demo="'+id+'">🔊 試しに聞く</button>';
  if(own){
    h+=on?'<button class="go sm" type="button" data-df-unequip="'+it[0]+'">はずす</button>':'<button class="go sm" type="button" data-df-equip="'+id+'">使う</button>';
  }else{
    h+='<button class="go sm" type="button" data-df-buy="'+id+'"'+(capL<it[3]?' disabled':'')+'>'+it[3]+'円で購入<small>テスト購入 ・ お金はかかりません</small></button>';
    if(capL<it[3])h+='<p class="df-warn">'+(dfS().cap===0?'「購入しない」に設定されています。':'今月の上限('+dfYen(dfS().cap)+'円)をこえてしまうので、購入できません。')+'<button class="link" type="button" data-df-settings>上限を確認する</button></p>';
    if(it[4])h+='<button class="go sm alt" type="button" data-df-swap="'+id+'"'+(mi<it[4]?' disabled':'')+'>'+dfYen(it[4])+'マイルで交換<small>交換に使えるマイル：'+dfYen(mi)+'(ステータスは下がりません)</small></button>';
  }
  $('sheetHost').innerHTML=h+'</div></div>';
}
/* the final confirmation (what, price, when, no refund) */
function dfConfirm(id,how){
  var it=DF_MAP[id];if(!it||!dfOn()||dfOwn(id))return;
  var yen=how==='yen',h='<div class="sheet plain df-sheet bill-sheet" role="dialog" aria-label="購入の確認"><div class="sheet-in">'+
    '<span class="lbl">最終確認</span><h3>'+(yen?it[3]+'円で購入しますか❓':dfYen(it[4])+'マイルで交換しますか❓')+'</h3>';
  if(yen)h+='<p class="bill-test sm"><b>🧪 テスト購入</b><span>本物のお金は動きません。</span></p>';
  h+='<dl class="bill-dl"><dt>商品</dt><dd>'+uiF('DUTY FREE「{0}」({1})',[esc(T(it[2])),esc(T(DF_KINDS.filter(function(k){return k[0]===it[0];})[0][1]))])+'</dd>'+
    (yen?'<dt>価格</dt><dd><b>'+it[3]+'円(税込)</b> ・ 1回だけの支払い</dd>'+
      '<dt>今月の購入</dt><dd>'+dfYen(dfMonth())+'円 → '+dfYen(dfMonth()+it[3])+'円(上限 '+(dfS().cap<0?'なし':dfYen(dfS().cap)+'円')+')</dd>'
    :'<dt>使うマイル</dt><dd><b>'+dfYen(it[4])+'マイル</b>(残り '+dfYen(dfMiLeft()-it[4])+'マイル)</dd><dt>ステータス</dt><dd>下がりません(ステータスは、ためたマイルで決まります)</dd>')+
    '<dt>使える時期</dt><dd>すぐ。ずっと使えます</dd>'+
    (yen?'<dt>返品</dt><dd>デジタルの商品なので、購入後の返品・返金はできません</dd>':'')+'</dl>'+
    '<button class="go sm" type="button" data-df-do="'+id+'" data-df-how="'+how+'">'+(yen?'購入する':'交換する')+'</button>'+
    '<button class="ghost" type="button" data-df-item="'+id+'">やめる</button></div></div>';
  $('sheetHost').innerHTML=h;
}
function dfDo(id,how){
  var it=DF_MAP[id],d=dfS();if(!it||!dfOn()||dfOwn(id))return;
  if(how==='yen'){if(dfCapLeft()<it[3])return dfItemSheet(id);d.mon[dfYM()]=dfMonth()+it[3];d.log.push({id:id,t:Date.now(),yen:it[3],mi:0});}
  else{if(!it[4]||dfMiLeft()<it[4])return dfItemSheet(id);d.ms+=it[4];d.log.push({id:id,t:Date.now(),yen:0,mi:it[4]});}
  d.log=d.log.slice(-60);d.own.push(id);d.eq[it[0]]=id;
  store();dfApply();
  DFU.msg='✨ '+uiF(how==='yen'?'「{0}」を購入しました。さっそく使っています。':'「{0}」を交換しました。さっそく使っています。',[esc(T(it[2]))]);
  if(typeof buzz==='function')buzz(12);if(typeof chimeOK==='function')chimeOK();
  if(view==='record')render();
  dfShop(it[0]);
}
function dfSettings(step){
  var d=dfS(),h='<div class="sheet plain df-sheet" role="dialog" aria-label="上限と履歴"><div class="sheet-in">'+
    '<div class="df-top"><span class="lbl">DUTY FREE</span><button class="x" type="button" data-df-back aria-label="戻る">'+closeIcon()+'</button></div><h3>1か月の上限</h3>'+
    '<p class="dim hint">1か月に使える金額の上限です。上げるときは、保護者の方と相談してから変えてね。マイルでの交換は上限に入りません。</p>'+
    '<div class="df-caps" role="group" aria-label="1か月の上限">'+DF_CAPS.map(function(c){return '<button type="button" data-df-cap="'+c[0]+'" aria-pressed="'+(d.cap===c[0])+'">'+c[1]+'</button>';}).join('')+'</div>';
  if(step!==undefined){
    h+='<div class="df-guard"><p><b>上限を'+(step<0?'なし':dfYen(step)+'円')+'に上げます。</b>保護者の方と相談しましたか❓</p>'+
      '<label class="df-ck"><input type="checkbox" id="dfGuard"> 保護者の方の同意をもらいました</label>'+
      '<button class="go sm" type="button" data-df-capok="'+step+'" disabled id="dfCapOk">上限を変える</button></div>';
  }
  h+='<p class="df-month">今月の購入：<b>'+dfYen(dfMonth())+'円</b></p><h3 class="df-h">購入の履歴</h3>';
  var log=d.log.slice().reverse();
  h+=log.length?'<ul class="df-log">'+log.map(function(l){var it=DF_MAP[l.id],t=new Date(l.t);
      return '<li><span>'+(t.getMonth()+1)+'/'+t.getDate()+'</span><b>'+esc(it[2])+'</b><span>'+(l.yen?l.yen+'円(テスト)':dfYen(l.mi)+'マイル')+'</span></li>';}).join('')+'</ul>':'<p class="dim hint">まだありません。</p>';
  $('sheetHost').innerHTML=h+'<button class="ghost" type="button" data-df-back>ショップにもどる</button></div></div>';
}
document.addEventListener('change',function(e){if(e.target&&e.target.id==='dfGuard'){var b=$('dfCapOk');if(b)b.disabled=!e.target.checked;}});
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t||!dfOn())return;
  var g=function(n){return t.getAttribute(n);};
  if(t.hasAttribute('data-df-open')){DFU.msg='';dfShop();return;}
  if(t.hasAttribute('data-df-tab')){dfShop(g('data-df-tab'));return;}
  if(t.hasAttribute('data-df-back')){dfShop();return;}
  if(t.hasAttribute('data-df-item')){var it=DF_MAP[g('data-df-item')];if(it&&it[0]==='sd'&&t.classList.contains('df-item'))dfPlayDemo(it[1]);dfItemSheet(g('data-df-item'));return;}
  if(t.hasAttribute('data-df-demo')){dfPlayDemo(g('data-df-demo'));return;}
  if(t.hasAttribute('data-df-buy')){dfConfirm(g('data-df-buy'),'yen');return;}
  if(t.hasAttribute('data-df-swap')){dfConfirm(g('data-df-swap'),'mi');return;}
  if(t.hasAttribute('data-df-do')){dfDo(g('data-df-do'),g('data-df-how'));return;}
  if(t.hasAttribute('data-df-equip')){var id=g('data-df-equip');if(dfOwn(id)){dfS().eq[DF_MAP[id][0]]=id;store();dfApply();if(view==='record')render();dfShop(DF_MAP[id][0]);}return;}
  if(t.hasAttribute('data-df-unequip')){var k=g('data-df-unequip');delete dfS().eq[k];store();dfApply();if(view==='record')render();dfShop(k);return;}
  if(t.hasAttribute('data-df-settings')){dfSettings();return;}
  if(t.hasAttribute('data-df-cap')){
    var c=+g('data-df-cap'),cur=dfS().cap,up=c<0?cur>=0:(cur>=0&&c>cur);
    if(up){dfSettings(c);return;}
    dfS().cap=c;store();if(view==='record')render();dfSettings();return;
  }
  if(t.hasAttribute('data-df-capok')){var ck=$('dfGuard');if(!ck||!ck.checked)return;dfS().cap=+g('data-df-capok');store();if(view==='record')render();dfSettings();return;}
});
if(save.df)save.df=dfClean(save.df);
dfApply();

/* ---- 検定の級の買い切り（テスト購入・ウェブのテストアカウントだけ）----
   1級ずつ買うか、英検の全級をまとめて買う（個別の合計より約22%オフ）。買うと、その級のレッスン・模試・面接練習が開く。
   DUTY FREE と同じく、最後に確認する。今月の上限（DUTY FREE の買い物の上限）には入らない。
   The purchase is kept in save.xb (bank keys, or 'all'). Real payments are not open yet. */
var BANK_PRICE={ek5:1200,ek4:1200,ek3:1200,ekp2:1200,ekp2p:1500,ek2:1500,ekp1:1800,ek1:2000,toeics:1500,opic:1500,cet4:1200,cet6:1500,toeicl:2000,ielts:2000,toefl:2000,icao:1500,aero:1500,ca:1200,bec:1200,oet:1200,oetph:1200,celta:1200,toles:1200,servsafe:1200};
var EIKEN_KEYS=['ek5','ek4','ek3','ekp2','ekp2p','ek2','ekp1','ek1'];
var BANK_ALL=9000;
function bankOwned(){var a=save.xb;return Array.isArray(a)?a.filter(function(x){return x==='all'||BANK_PRICE[x]!=null;}):[];}
function bankBought(k){if(!k||!(BF_APP||dfOn()))return false;var a=bankOwned();return (a.indexOf('all')>=0&&EIKEN_KEYS.indexOf(k)>=0)||a.indexOf(k)>=0;}
/* the App Store product IDs (non-consumable, made in App Store Connect) */
var APP_BANK_PID={ek5:'com.babelflight.app.eiken.ek5',ek4:'com.babelflight.app.eiken.ek4',ek3:'com.babelflight.app.eiken.ek3',ekp2:'com.babelflight.app.eiken.ekp2',ekp2p:'com.babelflight.app.eiken.ekp2p',ek2:'com.babelflight.app.eiken.ek2',ekp1:'com.babelflight.app.eiken.ekp1',ek1:'com.babelflight.app.eiken.ek1',all:'com.babelflight.app.eiken.all',toeics:'com.babelflight.app.exam.toeics',opic:'com.babelflight.app.exam.opic',cet4:'com.babelflight.app.exam.cet4',cet6:'com.babelflight.app.exam.cet6',toeicl:'com.babelflight.app.exam.toeicl',ielts:'com.babelflight.app.exam.ielts',toefl:'com.babelflight.app.exam.toefl',icao:'com.babelflight.app.exam.icao',aero:'com.babelflight.app.exam.aero',ca:'com.babelflight.app.exam.ca',bec:'com.babelflight.app.exam.bec',oet:'com.babelflight.app.exam.oet',oetph:'com.babelflight.app.exam.oetph',celta:'com.babelflight.app.exam.celta',toles:'com.babelflight.app.exam.toles',servsafe:'com.babelflight.app.exam.servsafe'};
var BANK_OF_PID={};Object.keys(APP_BANK_PID).forEach(function(k){BANK_OF_PID[APP_BANK_PID[k]]=k;});
/* in the iPhone app the levels are sold by the App Store (bankpay switch) */
function bankPaidApp(k){return !!(BF_APP&&k&&BANK_PRICE[k]!=null&&gimmickOn('bankpay'));}
function bankYen(k){return k==='all'?BANK_ALL:BANK_PRICE[k];}
function bankLabel(k){return k==='all'?'英検 全級（まとめ買い）':(XBANK[k]?XBANK[k].name:k);}
function bankBuyHTML(k){
  if(!(BF_APP||dfOn())||BANK_PRICE[k]==null||bankBought(k))return '';
  var one=BANK_PRICE[k],h='<div class="bank-buy"><span class="lbl">'+(BF_APP?'買い切り（1回のお支払い）':'買い切り（テスト購入・1回だけ）')+'</span>';
  h+='<button class="go sm" type="button" data-bank-buy="'+k+'">'+esc(bankLabel(k))+' '+dfYen(one)+'円で買う<small>'+(BF_APP?'1回のお支払いで、その級が開きます':'テスト購入 ・ お金はかかりません')+'</small></button>';
  if(!bankBought('all'))h+='<button class="go sm alt" type="button" data-bank-buy="all">英検 全級まとめ '+dfYen(BANK_ALL)+'円<small>個別で買うより約22%オフ（全部で11,600円）</small></button>';
  if(BF_APP)h+='<button class="ghost" type="button" data-bank-restore>購入を復元</button>';
  return h+'</div>';
}
/* the final confirmation (what, price, when, no refund) */
function bankConfirm(k){
  var yen=bankYen(k);if(!dfOn()||yen==null||bankBought(k))return;
  var h='<div class="sheet plain df-sheet bill-sheet" role="dialog" aria-label="購入の確認"><div class="sheet-in">'+
    '<span class="lbl">最終確認</span><h3>'+dfYen(yen)+'円で購入しますか❓</h3>'+
    '<p class="bill-test sm"><b>🧪 テスト購入</b><span>本物のお金は動きません。</span></p>'+
    '<dl class="bill-dl"><dt>商品</dt><dd>'+esc(bankLabel(k))+'</dd>'+
    '<dt>価格</dt><dd><b>'+dfYen(yen)+'円(税込)</b> ・ 1回だけの支払い</dd>'+
    '<dt>使える時期</dt><dd>すぐ。ずっと使えます</dd>'+
    '<dt>返品</dt><dd>デジタルの商品なので、購入後の返品・返金はできません</dd></dl>'+
    '<button class="go sm" type="button" data-bank-do="'+k+'">購入する</button>'+
    '<button class="ghost" type="button" data-close-sheet>やめる</button></div></div>';
  $('sheetHost').innerHTML=h;
}
function bankDo(k){
  var yen=bankYen(k);if(!dfOn()||yen==null||bankBought(k))return;
  save.xb=bankOwned().concat([k]);
  store();closeSheet();
  if(typeof buzz==='function')buzz(12);if(typeof chimeOK==='function')chimeOK();
  render();
}
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('[data-bank-buy],[data-bank-do],[data-bank-restore]');if(!t)return;
  if(t.hasAttribute('data-bank-restore')){storeRestore();return;}
  if(t.hasAttribute('data-bank-buy')){var bk=t.getAttribute('data-bank-buy');if(BF_APP)storeBuy(bk);else bankConfirm(bk);return;}
  bankDo(t.getAttribute('data-bank-do'));
});

/* ---- the App Store purchases (iPhone app; StorePlugin.swift) ---- */
function storeNote(msg){
  $('sheetHost').innerHTML='<div class="sheet plain" role="dialog" aria-label="お知らせ"><div class="sheet-in"><p style="font-size:15px">'+esc(msg)+'</p><button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';
}
/* the levels bought (by the IDs the App Store reports) are opened on this phone */
function storeGrant(keys){
  var cur=bankOwned(),nw=cur.slice();
  keys.forEach(function(k){if(nw.indexOf(k)<0)nw.push(k);});
  if(nw.length!==cur.length){save.xb=nw;store();}
}
function storeBuy(k){
  var id=APP_BANK_PID[k];if(!id||!BF_APP)return;
  ownCall('Store','purchase',{id:id}).then(function(r){
    if(r&&r.ok){storeGrant([k]);closeSheet();if(typeof buzz==='function')buzz(12);render();}
    else if(r&&r.reason==='pending')storeNote('承認待ちです。承認されたら、自動で開きます。');
    else if(r&&r.reason==='notfound')storeNote('この商品は、まだ準備中です。');
  }).catch(function(){storeNote('購入できませんでした。もう一度お試しください。');});
}
/* 「購入を復元」: the purchases of this Apple ID (a new phone, or after a reinstall) */
function storeRestore(){
  ownCall('Store','restore',{}).then(function(r){
    var keys=[];((r&&r.ids)||[]).forEach(function(id){if(BANK_OF_PID[id])keys.push(BANK_OF_PID[id]);});
    if(keys.length){storeGrant(keys);render();storeNote('購入を復元しました。');}
    else storeNote('復元できる購入が見つかりませんでした。');
  }).catch(function(){storeNote('復元できませんでした。もう一度お試しください。');});
}
/* at start: the purchases the App Store already knows about open their levels */
function storeSync(){
  if(!BF_APP)return;
  ownCall('Store','owned',{}).then(function(r){
    var keys=[];((r&&r.ids)||[]).forEach(function(id){if(BANK_OF_PID[id])keys.push(BANK_OF_PID[id]);});
    var before=bankOwned().length;storeGrant(keys);if(bankOwned().length!==before)render();
  }).catch(function(){});
}
if(typeof window!=='undefined')setTimeout(storeSync,1500);
