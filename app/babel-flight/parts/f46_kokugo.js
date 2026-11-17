/* ================= 国語の検定: 漢検 (10級〜1級) と 日本語検定 (7級〜1級) =================
   The 日本語 course with the Japanese display (before, that course was only for the other display languages).
   No スターター lessons there: the course is these two tests only. ビジネスから (本番形式の模試: ファースト);
   only the test account sees the course until paid plans open (kkVisible), and never in the iPhone app.
   The drills are original 4-choice questions with an explanation, written in babel-flight/kk/src/<key>.py and
   checked by kk/gen_kk.py (the kanji of each 漢検 level against its 配当漢字, the readings against the 常用漢字表),
   which writes public/kk/<key>.json (loaded when a level is opened) and KK_IDX (f46_kkidx.js).
   Progress: save.kk = {sel: level, b: {level: [best per step]}, w: {level: ['step.question' answered wrong]}}. */
var KK_LV=[
 ['kj10','10級','kj','小学1年'],['kj9','9級','kj','小学2年'],['kj8','8級','kj','小学3年'],['kj7','7級','kj','小学4年'],
 ['kj6','6級','kj','小学5年'],['kj5','5級','kj','小学6年'],['kj4','4級','kj','中学在学'],['kj3','3級','kj','中学卒業'],
 ['kjp2','準2級','kj','高校在学'],['kj2','2級','kj','高校卒業・一般'],['kjp1','準1級','kj','大学・一般'],['kj1','1級','kj','大学・一般'],
 ['nk7','7級','nk','小学2年'],['nk6','6級','nk','小学4年'],['nk5','5級','nk','小学6年'],['nk4','4級','nk','中学卒業'],
 ['nk3','3級','nk','高校卒業'],['nk2','2級','nk','大学卒業・社会人'],['nk1','1級','nk','社会人上級']];
var KK_FAM={kj:{name:'漢字検定(漢検)',pre:'漢検',sub:'読み・書き取り・部首・四字熟語など'},nk:{name:'日本語検定',pre:'日本語検定',sub:'敬語・文法・語彙・言葉の意味・表記・漢字'}};
var KK_KIND={hitsujun:'筆順',yomi:'読み',hyogai:'表外の読み',kaki:'書き取り',doon:'同音・同訓異字',okuri:'送りがな',bushu:'部首',kousei:'熟語の構成',yoji:'四字熟語',yojii:'四字熟語の意味',
 taigi:'対義語・類義語',ruigi:'類義語',goji:'誤字訂正',shiki:'漢字識別',kakusu:'画数',onkun:'音と訓',kotowaza:'故事・ことわざ',
 keigo:'敬語',bunpo:'文法',goi:'語彙',imi:'言葉の意味',hyoki:'表記',kanji:'漢字',sogo:'総合問題'};
var KK_DIR={
 yomi:'――線の漢字の読みとして正しいものを選びなさい。',
 hyogai:'――線の漢字の読みとして正しいものを選びなさい(常用漢字表にない読みもふくむ)。',
 kaki:'――線のところを漢字で書いたものとして、正しいものを選びなさい。',
 hitsujun:'筆順(書く順番)として正しいものを選びなさい。',
 doon:'――線のカタカナにあてはまる漢字を選びなさい。同じ読みの漢字に注意。',
 okuri:'――線のカタカナを、漢字と送りがなで正しく書いたものを選びなさい。',
 bushu:'漢字の部首として正しいものを選びなさい。',
 kousei:'熟語の構成として正しいものを選びなさい。',
 yoji:'四字熟語の――線のカタカナにあてはまる漢字を選びなさい。',
 yojii:'四字熟語の意味として正しいものを選びなさい。',
 taigi:'対義語・類義語として正しいものを選びなさい。',
 ruigi:'類義語として正しいものを選びなさい。',
 goji:'文中に、まちがって使われている漢字が一字あります。誤字と正しい漢字の組み合わせを選びなさい。',
 shiki:'三つの□に共通して入る漢字を選びなさい。',
 kakusu:'漢字の総画数として正しいものを選びなさい。',
 onkun:'熟語の読み方の組み合わせ(音と訓)として正しいものを選びなさい。',
 kotowaza:'――線のカタカナにあてはまる漢字を選びなさい。',
 keigo:'敬語の使い方として最も適切なものを選びなさい。',bunpo:'最も適切なものを選びなさい。',goi:'最も適切なものを選びなさい。',
 imi:'言葉の意味として最も適切なものを選びなさい。',hyoki:'表記として最も適切なものを選びなさい。',kanji:'最も適切なものを選びなさい。',sogo:'最も適切なものを選びなさい。'};
/* the youngest levels (小学1・2年) get a direction in kana */
var KK_KID='ただしい ものを えらびましょう。';
var KK={data:{},load:{},run:null};
function kkVisible(){return typeof UI!=='undefined'&&UI==='ja'&&cabinOn()&&cabinTester();}
function kkHere(){return typeof UI!=='undefined'&&UI==='ja'&&save.lang==='ja';}
function kkLocked(){return cabinLv()<2;}
function kkLv(k){for(var i=0;i<KK_LV.length;i++)if(KK_LV[i][0]===k)return KK_LV[i];return null;}
function kkName(k){var l=kkLv(k);return l?KK_FAM[l[2]].pre+l[1]:'';}
function kkS(){if(!save.kk||typeof save.kk!=='object')save.kk={sel:'',b:{},w:{},m:{}};['b','w','m'].forEach(function(f){if(!save.kk[f])save.kk[f]={};});return save.kk;}
function kkSel(){var s=kkS().sel;return kkLv(s)?s:'kj3';}
function kkIdx(k){return typeof KK_IDX==='object'&&KK_IDX[k]||null;}
function kkBest(k){var b=kkS().b[k];return Array.isArray(b)?b:[];}
function kkWeak(k){var w=kkS().w[k];return Array.isArray(w)?w:[];}
function kkMeter(k){
  var x=kkIdx(k),b=kkBest(k),n=0,s=0,done=0;if(!x)return {pct:0,n:0,done:0,steps:0};
  x[2].forEach(function(st,i){n+=st[2];s+=Math.min(b[i]||0,st[2]);if(b[i]!=null)done++;});
  return {pct:n?Math.floor(s/n*100):0,n:n,done:done,steps:x[2].length};
}
function kkNextStep(k){
  var x=kkIdx(k),b=kkBest(k);if(!x)return -1;
  for(var i=0;i<x[2].length;i++)if(b[i]==null)return i;
  for(i=0;i<x[2].length;i++)if((b[i]||0)<Math.ceil(x[2][i][2]*x[1]/100))return i;
  return -1;
}
function kkGet(k){
  if(KK.data[k])return Promise.resolve(KK.data[k]);
  return KK.load[k]||(KK.load[k]=fetch(bfSiteUrl('/kk/'+k+'.json'),{cache:'no-cache'}).then(function(r){if(!r.ok)throw new Error('http');return r.json();})
    .then(function(d){KK.data[k]=d;return d;},function(e){KK.load[k]=null;throw e;}));
}
/* the stem: [ ] marks the part the question is about */
function kkStem(s,kind){
  var big=kind==='bushu'||kind==='kousei'||kind==='shiki'||kind==='kakusu'||kind==='hitsujun';
  var h=esc(s).replace(/\[([^\]]+)\]/g,big?'<b class="kk-big">$1</b>':'<u class="kk-u">$1</u>');
  return '<div class="kk-stem'+(big?' kk-c':'')+'" lang="ja">'+h+'</div>';
}
function kkPlain(s){return String(s).replace(/[\[\]]/g,'');}

/* ---- the course home ---- */
function kkTm(){return xTmHTML('ja','漢検(日本漢字能力検定)・日本語検定');}
function kkHomeHTML(){
  var h=topBar('','progress');
  h+='<section class="hero empty kk-hero"><div class="hero-in"><div class="hud"><div class="hud-l"><span class="lbl">日本語 ・ 国語の検定</span><b class="kk-ttl">漢検・日本語検定</b>'+
     '<small>日本語を話す人のための、漢字と日本語の力</small></div></div>'+heroLangs()+'</div></section>';
  if(!kkVisible()){
    return h+'<section class="card"><span class="lbl">準備中</span><h2 class="jh">日本語(漢検・日本語検定)のコースは準備中です</h2>'+
      '<p class="dim" style="font-size:13.5px;margin-top:4px">上のボタンから、ほかの言語のコースを選べます。</p></section>';
  }
  var k=kkSel(),L=kkLv(k),x=kkIdx(k),lock=kkLocked();
  h+='<section class="card kk-card"><span class="lbl">目標の級 ・ '+esc(KK_FAM[L[2]].name)+'</span><div class="xg-head"><h2 class="jh">'+esc(kkName(k))+'</h2><span class="kk-lvl">'+esc(L[3])+'程度</span></div>';
  if(!x){
    h+='<p class="dim" style="font-size:13.5px">この級の問題は準備中です。いま解けるのは: '+esc(KK_LV.filter(function(l){return kkIdx(l[0]);}).map(function(l){return kkName(l[0]);}).join('・')||'—')+'</p>';
  }else{
    var m=kkMeter(k),nx=kkNextStep(k),wk=kkWeak(k).length;
    h+='<div class="xmeter"><div class="xm-top"><span class="lbl">合格圏メーター(目安)</span><b class="mono">'+m.pct+'%</b></div>'+
       '<div class="xm-bar" role="img" aria-label="合格圏メーター '+m.pct+'%。'+x[1]+'%で合格圏"><i style="width:'+m.pct+'%"></i><span class="xm-pass" style="left:'+x[1]+'%"></span></div>'+
       '<div class="xm-row"><span>ステップ '+m.done+'/'+m.steps+' ・ '+m.n+'問</span><span class="xm-pl">'+(m.pct>=x[1]?'合格圏に到達！':'合格ライン '+x[1]+'%まであと'+(x[1]-m.pct)+'%')+'</span></div></div>';
    if(lock)h+='<p class="dim hint">🔒 '+esc(KK_FAM[L[2]].pre)+'の問題は「'+CABINS[2][1]+'」から</p>';
    else h+=(nx>=0?'<button class="go" type="button" data-kk-go="'+k+'|'+nx+'">'+(kkBest(k)[nx]==null?'ステップ'+(nx+1)+'を始める':'ステップ'+(nx+1)+'をもう一度')+'<small>'+esc(x[2][nx][0])+' ・ '+x[2][nx][2]+'問</small></button>'
                  :'<button class="go" type="button" data-kk-mix="'+k+'">ランダム10問<small>全部のステップから</small></button>')+
         (wk?'<button class="ghost" type="button" data-kk-weak="'+k+'">苦手の復習<small>まちがえた問題 '+wk+'問</small></button>':'');
  }
  h+=(cabinLv()>=3?'<p class="dim hint">📝 本番形式の模試(時間制限つき)は準備中です</p>':'<p class="dim hint">🔒 本番形式の模試(時間制限つき)は「'+CABINS[3][1]+'」から(準備中)</p>');
  h+='<button class="xg-chg kk-chg" type="button" data-kk-pick>級を変える</button></section>';
  if(x){
    var b=kkBest(k),nx2=kkNextStep(k);
    h+='<section class="leg"><div class="leg-h"><div><span class="lbl">'+esc(kkName(k))+'</span><h2 class="jh">ステップ</h2><p>本番の大問と同じ分け方 ・ 1ステップ10問</p></div><span class="leg-n mono">'+kkMeter(k).done+'/'+x[2].length+'</span></div><div class="stops">';
    x[2].forEach(function(st,i){
      var v=b[i],c=lock?'locked':v==null?(i===nx2?'next':''):(v>=Math.ceil(st[2]*x[1]/100)?'done':'next');
      h+='<button class="stop '+c+'" type="button" data-kk-go="'+k+'|'+i+'"><span class="stop-dot" aria-hidden="true"></span>'+
         '<span class="stop-city"><b class="mono">STEP '+(i+1)+'</b><small>'+esc(KK_KIND[st[1]]||'')+'</small></span>'+
         '<span class="stop-les"><b>'+esc(st[0])+'</b><small class="kind">'+st[2]+'問</small></span>'+
         '<span class="stop-st">'+(lock?'🔒':v==null?(i===nx2?'次はここ':''):v+'/'+st[2])+'</span></button>';
    });
    h+='</div></section>';
  }
  return h+'<section class="card kk-about"><span class="lbl">このコースについて</span><p class="dim" style="font-size:13px">漢検は級ごとに出る漢字(配当漢字)が決まっています。問題の漢字がその級の範囲に入っているか、読みが常用漢字表どおりかを、公開データで1問ずつ確かめています。書き取りは手書きのかわりに、正しい漢字を選ぶ形です。</p>'+kkTm()+'</section>';
}
function kkPickSheet(){
  var cur=kkSel();
  function grp(f){
    return '<span class="lbl lp-h">'+esc(KK_FAM[f].name)+'</span><p class="dim kk-fsub">'+esc(KK_FAM[f].sub)+'</p><div class="kk-lvs">'+KK_LV.filter(function(l){return l[2]===f;}).map(function(l){
      var x=kkIdx(l[0]),m=x?kkMeter(l[0]):null;
      return '<button class="kk-lvb'+(l[0]===cur?' on':'')+(x?'':' soon')+'" type="button" data-kk-sel="'+l[0]+'" aria-pressed="'+(l[0]===cur)+'"><b>'+esc(l[1])+'</b><small>'+(x?m.pct+'%':'準備中')+'</small></button>';
    }).join('')+'</div>';
  }
  $('sheetHost').innerHTML='<div class="sheet plain" role="dialog" aria-label="級を選ぶ"><div class="sheet-in"><h3>目標の級を選ぶ</h3>'+grp('kj')+grp('nk')+
    '<button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';
}

/* ---- a drill ---- */
function kkShuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function kkQ(d,si,qi){var st=d.s[si],q=st[2][qi];return {id:(si+1)+'.'+(qi+1),kind:st[1],stem:q[0],ans:q[1][0],opts:kkShuffle(q[1]),ex:q[2],step:st[0]};}
function kkStart(k,mode,si){
  if(kkLocked()){$('sheetHost').innerHTML=lockSheetHTML(kkName(k),2);return;}
  closeSheet();
  kkGet(k).then(function(d){
    var qs=[],title='';
    if(mode==='step'){if(!d.s[si])return;d.s[si][2].forEach(function(q,qi){qs.push(kkQ(d,si,qi));});qs=kkShuffle(qs);title=d.s[si][0];}
    else if(mode==='weak'){kkWeak(k).slice(0,10).forEach(function(id){var p=id.split('.'),a=+p[0]-1,b=+p[1]-1;if(d.s[a]&&d.s[a][2][b])qs.push(kkQ(d,a,b));});title='苦手の復習';}
    else{var all=[];d.s.forEach(function(st,a){st[2].forEach(function(q,b){all.push([a,b]);});});kkShuffle(all).slice(0,10).forEach(function(p){qs.push(kkQ(d,p[0],p[1]));});title='ランダム10問';}
    if(!qs.length)return;
    KK.run={k:k,mode:mode,si:si,title:title,q:qs,i:0,corr:0,mist:0,ans:-1,wrong:[],retry:{}};
    view='kk';render();window.scrollTo(0,0);
  },function(){
    $('sheetHost').innerHTML='<div class="sheet plain" role="alertdialog"><div class="sheet-in"><h3>問題を読みこめませんでした</h3><p class="dim" style="font-size:14px">通信を確かめて、もう一度試してください。</p><button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';
  });
}
function kkRunHTML(){
  var R=KK.run,q=R.q[R.i],n=R.q.length,pct=Math.round(R.i/n*100),f=R.mode==='step'?'ステップ'+(R.si+1)+' ・ ':'';
  return '<div class="kk-run"><div class="fl-top"><button class="x" type="button" data-kk-abort aria-label="やめる">'+closeIcon()+'</button>'+
    '<div class="fl-id"><span class="lbl">'+esc(kkName(R.k))+'</span><b>'+esc(f+R.title)+'</b></div><div class="turb">ミス '+R.mist+'</div></div>'+
    '<div class="kk-prog" role="progressbar" aria-valuemin="0" aria-valuemax="'+n+'" aria-valuenow="'+R.i+'"><i style="width:'+pct+'%"></i></div>'+
    '<div class="phase"><span>'+esc(KK_KIND[q.kind]||'')+(q.retry?' ・ もう一度':'')+'</span><span>'+(R.i+1)+'/'+n+'問</span></div>'+
    '<div class="q kk-q"><span class="qh">'+esc(/^(kj10|kj9|nk7)$/.test(R.k)?KK_KID:KK_DIR[q.kind]||'最も適切なものを選びなさい。')+'</span>'+kkStem(q.stem,q.kind)+
    '<div class="opts">'+q.opts.map(function(o,i){
      var c=R.ans<0?'':(o===q.ans?' ok':i===R.ans?' no':' off');
      return '<button class="opt kk-opt'+c+'" type="button" data-kk-opt="'+i+'"'+(R.ans>=0?' disabled':'')+'><span class="on">'+(i+1)+'</span><span lang="ja">'+esc(o)+'</span></button>';
    }).join('')+'</div></div><div class="pad-b"></div></div>';
}
function kkSheet(ok){
  var R=KK.run,q=R.q[R.i];
  $('sheetHost').innerHTML='<div class="sheet'+(ok?'':' bad')+'" role="status"><div class="sheet-in"><h3>'+(ok?PRAISE[Math.floor(Math.random()*PRAISE.length)]:'おしい！ 正解はこちら')+'</h3>'+
    '<div class="ans"><b lang="ja">'+esc(q.ans)+'</b><br><span class="dim" style="font-size:13px">'+esc(kkPlain(q.stem))+'</span></div>'+
    (q.ex?'<div class="note"><b>ワンポイント</b>'+esc(q.ex)+'</div>':'')+
    '<button class="go" type="button" data-kk-next>'+(R.i+1<R.q.length?'次へ':'結果を見る')+'</button></div></div>';
}
function kkAnswer(i){
  var R=KK.run;if(!R||R.ans>=0)return;
  var q=R.q[R.i],ok=q.opts[i]===q.ans;R.ans=i;
  if(!q.retry){if(ok)R.corr++;else{R.mist++;R.wrong.push(q);}}
  if(ok){if(typeof chimeOK==='function')chimeOK();if(typeof fxGood==='function')fxGood();}
  else{if(typeof chimeBad==='function')chimeBad();if(typeof fxBad==='function')fxBad();if(typeof buzz==='function')buzz(40);
    if(!q.retry&&!R.retry[q.id]){R.retry[q.id]=1;var c={};for(var p in q)c[p]=q[p];c.retry=true;c.opts=kkShuffle(q.opts);R.q.push(c);}}
  $('main').innerHTML=kkRunHTML();kkSheet(ok);
}
function kkNext(){
  var R=KK.run;if(!R||R.ans<0)return;
  closeSheet();R.i++;R.ans=-1;
  if(R.i>=R.q.length){kkFinish();return;}
  render();window.scrollTo(0,0);
}
function kkFinish(){
  var R=KK.run,S=kkS(),k=R.k,first=R.q.filter(function(q){return !q.retry;}),n=first.length;
  /* the best of each step, and the questions answered wrong (they leave the list once answered right) */
  if(R.mode==='step'){var b=kkBest(k).slice();b[R.si]=Math.max(b[R.si]==null?0:b[R.si],R.corr);for(var i=0;i<b.length;i++)if(b[i]===undefined)b[i]=null;S.b[k]=b;}
  var w=kkWeak(k).slice(),bad={};R.wrong.forEach(function(q){bad[q.id]=1;});
  w=w.filter(function(id){var asked=first.some(function(q){return q.id===id;});return !asked||bad[id];});
  R.wrong.forEach(function(q){if(w.indexOf(q.id)<0)w.push(q.id);});
  S.w[k]=w.slice(-300);
  var ratio=n?R.corr/n:0,stars=ratio>=0.95?3:ratio>=0.7?2:1;
  var grade=stars===3?['満点に近い！','EXCELLENT','この調子で次のステップへ']:stars===2?['合格ライン！','GOOD','まちがえた問題は「苦手の復習」に入りました']:['もう一度ためそう','KEEP GOING','解説を読んでから、もう一度挑戦しよう'];
  var nx=kkNextStep(k),x=kkIdx(k),acts='';
  if(nx>=0&&x)acts+='<button class="go" type="button" data-kk-go="'+k+'|'+nx+'">'+(nx===R.si&&R.mode==='step'?'このステップをもう一度':'次のステップへ')+'<small>'+esc(x[2][nx][0])+'</small></button>';
  if(S.w[k].length)acts+='<button class="ghost" type="button" data-kk-weak="'+k+'">苦手の復習<small>まちがえた問題 '+S.w[k].length+'問</small></button>';
  KK.run=null;
  completeLesson({L:'ja',uid:'kk-'+k,mode:'kk',landNo:'KK '+kkName(k),city:['TOKYO','東京',0,0],stars:stars,answered:n,corr:R.corr,grade:grade,noAid:true,acts:acts,
    wrong:R.wrong.slice(0,5).map(function(q){return {t:q.ans,jp:kkPlain(q.stem)};}),wrongTitle:'まちがえた問題',wrongNote:'苦手の復習に入りました'});
}

/* ---- hooks ---- */
if(typeof MODE_TITLE==='object')MODE_TITLE.kk='国語の検定';
(function(){
  /* the 日本語 course shows for the Japanese display too (the test account, for now) */
  var lo=learnOrder;
  learnOrder=function(){var o=lo.apply(this,arguments);if(kkVisible()&&o.indexOf('ja')<0&&LANGS.ja){o=ORDER.filter(function(k){return k==='ja'||o.indexOf(k)>=0;});}return o;};
  /* no スターター lessons in the 日本語 course with the Japanese display */
  var ps=pathSections;
  pathSections=function(lang){if(lang==='ja'&&typeof UI!=='undefined'&&UI==='ja')return [];return ps.apply(this,arguments);};
  /* no level sheet (はじめて / 少しわかる …) for it either */
  if(typeof lvSheet==='function'){var lv0=lvSheet;lvSheet=function(L){if(L==='ja'&&typeof UI!=='undefined'&&UI==='ja')return;return lv0.apply(this,arguments);};}
  if(typeof lvNeed==='function'){var ln0=lvNeed;lvNeed=function(L){if(L==='ja'&&typeof UI!=='undefined'&&UI==='ja')return false;return ln0.apply(this,arguments);};}
  var hh=homeHTML;
  homeHTML=function(){if(kkHere())return kkHomeHTML();return hh.apply(this,arguments);};
  var mm=mapMount;
  mapMount=function(){if(kkHere()&&view==='home'){MODEPREV=save.mode;return;}return mm.apply(this,arguments);};
  var r0=render;
  render=function(){
    if(view==='kk'){
      if(!KK.run){view='home';return r0.apply(this,arguments);}
      $('tabs').hidden=true;var main=$('main'),R=KK.run;main.innerHTML=kkRunHTML();
      main.classList.remove('enter','enter-l','enter-r');void main.offsetWidth;main.classList.add('enter');
      document.body.classList.remove('dark-ui');PREVVIEW=view;if(R.ans>=0)kkSheet(R.q[R.i].opts[R.ans]===R.q[R.i].ans);return;
    }
    return r0.apply(this,arguments);
  };
  /* the course list: name the 日本語 course after what it has with the Japanese display */
  var lp=langPickSheet;
  langPickSheet=function(){
    var r=lp.apply(this,arguments);
    if(typeof UI!=='undefined'&&UI==='ja'){var b=document.querySelector('#sheetHost .lp-row[data-lang="ja"]');
      if(b){var tag=b.querySelector('.lp-tag');if(tag)tag.textContent='国語';var sm=b.querySelector('.lp-nm small');if(sm)sm.textContent='漢検・日本語検定';var n=b.querySelector('.lp-n');if(n)n.textContent=save.lang==='ja'?'学習中':kkMeter(kkSel()).pct+'%';}}
    return r;
  };
})();
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  var g=function(n){return t.getAttribute(n);};
  if(t.hasAttribute('data-kk-opt')){kkAnswer(+g('data-kk-opt'));return;}
  if(t.hasAttribute('data-kk-next')){kkNext();return;}
  if(t.hasAttribute('data-kk-go')){var p=g('data-kk-go').split('|');kkStart(p[0],'step',+p[1]);return;}
  if(t.hasAttribute('data-kk-weak')){kkStart(g('data-kk-weak'),'weak',0);return;}
  if(t.hasAttribute('data-kk-mix')){kkStart(g('data-kk-mix'),'mix',0);return;}
  if(t.hasAttribute('data-kk-pick')){kkPickSheet();return;}
  if(t.hasAttribute('data-kk-sel')){kkS().sel=g('data-kk-sel');store();closeSheet();render();return;}
  if(t.hasAttribute('data-kk-abort')){
    $('sheetHost').innerHTML='<div class="sheet bad" role="alertdialog" aria-label="終了の確認"><div class="sheet-in"><h3>このステップをやめますか？</h3><p class="dim" style="font-size:14px">ここまでの記録は保存されません。</p>'+
      '<div class="row2"><button class="ghost" type="button" data-kk-resume style="flex:1">続ける</button><button class="ghost danger" type="button" data-kk-quit style="flex:1">やめる</button></div></div></div>';return;}
  if(t.hasAttribute('data-kk-resume')){closeSheet();var R=KK.run;if(R&&R.ans>=0)kkSheet(R.q[R.i].opts[R.ans]===R.q[R.i].ans);return;}
  if(t.hasAttribute('data-kk-quit')){KK.run=null;closeSheet();view='home';render();window.scrollTo(0,0);return;}
});
document.addEventListener('keydown',function(e){
  if(view!=='kk'||!KK.run||e.metaKey||e.ctrlKey||e.altKey)return;
  if(KK.run.ans<0&&/^[1-4]$/.test(e.key)){kkAnswer(+e.key-1);e.preventDefault();}
  else if(KK.run.ans>=0&&(e.key==='Enter'||e.key===' ')){kkNext();e.preventDefault();}
});
