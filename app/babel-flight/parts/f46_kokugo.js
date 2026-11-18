/* ================= 国語の検定: 漢検 (10級〜1級) と 日本語検定 (7級〜1級) =================
   The 日本語 course with the Japanese display (before, that course was only for the other display languages).
   No スターター lessons there: the course is these two tests only. ビジネスから (本番形式の模試: ファースト);
   only the test account sees the course until paid plans open (kkVisible), and never in the iPhone app.
   The drills are original 4-choice questions with an explanation, written in babel-flight/kk/src/<key>.py and
   checked by kk/gen_kk.py (the kanji of each 漢検 level against its 配当漢字, the readings against the 常用漢字表),
   which writes public/kk/<key>.json (loaded when a level is opened) and KK_IDX (f46_kkidx.js).
   Progress: save.kk = {sel: level, b: {level: [best per step]}, w: {level: ['step.question' answered wrong]},
   m: {level: [mock results {d, s, t}]}}. */
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
  h+=kkMockCardHTML(k);
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
    else if(mode==='weak'){kkWeak(k).slice(0,10).forEach(function(id){
      var mk=id.charAt(0)==='m',p=id.replace('m','').split('.'),a=+p[0]-1,b=+p[1]-1;
      if(mk){var st=d.mk&&d.mk[a],q=st&&st[3][b];if(q)qs.push({id:id,kind:st[1],stem:q[0],ans:q[1][0],opts:kkShuffle(q[1]),ex:q[2],step:st[0]});}
      else if(d.s[a]&&d.s[a][2][b])qs.push(kkQ(d,a,b));});title='苦手の復習';}
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

/* ---- 本番形式の模試 (ファースト) ----
   Every question of the level, in the order of the real test's sections (shuffled inside a section), with the
   real test's time limit, no answers shown until the end, then the score out of the real full mark (漢検: 150 /
   200 点; 日本語検定: %) against the pass line. A level with its own mock questions ("mk" in its file: the sections,
   points and questions of the real test) uses them; the others use the drills' questions. History in save.kk.m[level] (newest first, 10 kept); wrong answers join 苦手の復習. */
function kkMockSpec(k){
  var L=kkLv(k),x=kkIdx(k);if(!L||!x)return null;
  var n=0;x[2].forEach(function(st){n+=st[2];});
  var kj=L[2]==='kj',small=kj&&/^kj(10|9|8)$/.test(k),own=x[3]>0;
  return {n:own?x[3]:n,own:own,min:small?40:60,full:kj?(own?x[4]:small?150:200):100,unit:kj?'点':'%',pass:x[1]};
}
function kkMockOK(){return cabinLv()>=3;}
function kkMockHist(k){var m=kkS().m[k];return Array.isArray(m)?m:[];}
function kkMockCardHTML(k){
  var sp=kkMockSpec(k);if(!sp)return '';
  if(!kkMockOK())return '<p class="dim hint">🔒 本番形式の模試(時間制限つき)は「'+CABINS[3][1]+'」から</p>';
  var last=kkMockHist(k)[0];
  return '<button class="ghost" type="button" data-kk-mock="'+k+'">本番形式の模試に挑戦'+(sp.own?'(専用問題)':'')+'<small>'+sp.n+'問 ・ '+sp.min+'分 ・ 合格ライン '+Math.ceil(sp.full*sp.pass/100)+sp.unit+
    (last?' ・ 前回 '+last.s+sp.unit+(last.s>=Math.ceil(sp.full*sp.pass/100)?' 合格圏':''):'')+'</small></button>';
}
function kkMockStart(k){
  if(!kkMockOK()){$('sheetHost').innerHTML=lockSheetHTML(kkName(k)+' 模試',3);return;}
  closeSheet();
  kkGet(k).then(function(d){
    var sp=kkMockSpec(k),qs=[];
    if(d.mk&&d.mk.length){   /* the dedicated mock: sections and points of the real test, questions in order */
      d.mk.forEach(function(st,si){st[3].forEach(function(q,qi){qs.push({id:'m'+(si+1)+'.'+(qi+1),kind:st[1],stem:q[0],ans:q[1][0],opts:kkShuffle(q[1]),ex:q[2],sec:st[0],si:si,pt:st[2]});});});
    }else d.s.forEach(function(st,si){kkShuffle(st[2].map(function(q,qi){return qi;})).forEach(function(qi){var q=kkQ(d,si,qi);q.sec=st[0];q.si=si;q.pt=1;qs.push(q);});});
    KK.mock={k:k,q:qs,a:qs.map(function(){return -1;}),i:0,end:Date.now()+sp.min*60000,t0:Date.now(),sp:sp,res:null};
    kkMockTick();view='kkm';render();window.scrollTo(0,0);
  },function(){$('sheetHost').innerHTML='<div class="sheet plain" role="alertdialog"><div class="sheet-in"><h3>問題を読みこめませんでした</h3><button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';});
}
function kkMockLeft(){var M=KK.mock;return M?Math.max(0,Math.round((M.end-Date.now())/1000)):0;}
function kkMockClock(){var s=kkMockLeft();return Math.floor(s/60)+':'+('0'+s%60).slice(-2);}
function kkMockTick(){
  clearInterval(KK.tick);
  KK.tick=setInterval(function(){
    var M=KK.mock;if(!M||M.res){clearInterval(KK.tick);return;}
    var el=$('kkClock');if(el){el.textContent=kkMockClock();el.classList.toggle('low',kkMockLeft()<300);}
    if(kkMockLeft()<=0){clearInterval(KK.tick);kkMockSubmit(true);}
  },1000);
}
function kkMockHTML(){
  var M=KK.mock,q=M.q[M.i],n=M.q.length,done=M.a.filter(function(v){return v>=0;}).length;
  var kid=/^(kj10|kj9|nk7)$/.test(M.k);
  return '<div class="kk-run kk-mock"><div class="fl-top"><button class="x" type="button" data-kk-mquit aria-label="やめる">'+closeIcon()+'</button>'+
    '<div class="fl-id"><span class="lbl">本番形式の模試</span><b>'+esc(kkName(M.k))+'</b></div><div class="turb kk-clock" id="kkClock" aria-label="残り時間">'+kkMockClock()+'</div></div>'+
    '<div class="kk-prog"><i style="width:'+Math.round(done/n*100)+'%"></i></div>'+
    '<div class="phase"><span>'+esc(q.sec)+'</span><span>'+(M.i+1)+'/'+n+'問 ・ 解答ずみ '+done+'</span></div>'+
    '<div class="q kk-q"><span class="qh">'+esc(kid?KK_KID:KK_DIR[q.kind]||'最も適切なものを選びなさい。')+'</span>'+kkStem(q.stem,q.kind)+
    '<div class="opts">'+q.opts.map(function(o,i){return '<button class="opt kk-opt'+(M.a[M.i]===i?' pick':'')+'" type="button" data-kk-mpick="'+i+'" aria-pressed="'+(M.a[M.i]===i)+'"><span class="on">'+(i+1)+'</span><span lang="ja">'+esc(o)+'</span></button>';}).join('')+'</div>'+
    '<div class="row2 kk-mnav"><button class="ghost" type="button" data-kk-mgo="-1"'+(M.i?'':' disabled')+'>← 前へ</button><button class="ghost" type="button" data-kk-mlist>問題一覧</button>'+
    (M.i+1<n?'<button class="ghost" type="button" data-kk-mgo="1">次へ →</button>':'<button class="go" type="button" data-kk-msubmit style="margin:0">提出する</button>')+'</div>'+
    '</div><div class="pad-b"></div></div>';
}
function kkMockList(){
  var M=KK.mock;
  $('sheetHost').innerHTML='<div class="sheet plain" role="dialog" aria-label="問題一覧"><div class="sheet-in"><h3>問題一覧</h3><p class="dim" style="font-size:13px">番号を押すと、その問題に移動します。</p><div class="kk-mgrid">'+
    M.q.map(function(q,i){return '<button type="button" class="'+(M.a[i]>=0?'on':'')+(i===M.i?' cur':'')+'" data-kk-mjump="'+i+'">'+(i+1)+'</button>';}).join('')+'</div>'+
    '<button class="go" type="button" data-kk-msubmit>提出する<small>未解答 '+M.a.filter(function(v){return v<0;}).length+'問</small></button><button class="ghost" type="button" data-close-sheet>問題にもどる</button></div></div>';
}
function kkMockSubmit(timeUp){
  var M=KK.mock;if(!M||M.res)return;
  clearInterval(KK.tick);closeSheet();
  var secs={},order=[],corr=0,wrong=[],got=0,all=0;
  M.q.forEach(function(q,i){
    if(!secs[q.sec]){secs[q.sec]={n:0,c:0,pt:q.pt||1};order.push(q.sec);}
    var ok=M.a[i]>=0&&q.opts[M.a[i]]===q.ans;secs[q.sec].n++;all+=q.pt||1;if(ok){secs[q.sec].c++;corr++;got+=q.pt||1;}else wrong.push({q:q,pick:M.a[i]});
  });
  var sp=M.sp,score=Math.round(got/all*sp.full),line=Math.ceil(sp.full*sp.pass/100),used=Math.min(sp.min*60,Math.round((Date.now()-M.t0)/1000));
  M.res={corr:corr,score:score,line:line,secs:secs,order:order,wrong:wrong,used:used,timeUp:!!timeUp};
  var S=kkS(),h=kkMockHist(M.k).slice();h.unshift({d:Date.now(),s:score,t:used,v:1});S.m[M.k]=h.slice(0,10);
  var w=kkWeak(M.k).slice();wrong.forEach(function(x){if(w.indexOf(x.q.id)<0)w.push(x.q.id);});S.w[M.k]=w.slice(-300);
  store();
  view='kkr';render();window.scrollTo(0,0);
  if(score>=line&&typeof confetti==='function')confetti();
}
function kkMockResultHTML(){
  var M=KK.mock,R=M.res,sp=M.sp,pass=R.score>=R.line;
  var h='<div class="land kk-mres"><span class="lbl">本番形式の模試 ・ '+esc(kkName(M.k))+'</span>'+
    '<div class="grade">'+(pass?'合格圏！':'あと少し')+'</div><div class="lbl" style="margin-top:4px">'+(pass?'PASSED':'KEEP GOING')+'</div>'+
    '<div class="kk-score"><b class="mono">'+R.score+'</b><span>'+(sp.unit==='点'?'/ '+sp.full+'点':'%')+'</span></div>'+
    '<p class="dim" style="font-size:13.5px">合格ライン(目安) '+R.line+sp.unit+' ・ 正解 '+R.corr+'/'+M.q.length+'問 ・ '+Math.floor(R.used/60)+'分'+('0'+R.used%60).slice(-2)+'秒'+(R.timeUp?' ・ 時間切れ':'')+'</p>'+
    '<div class="card kk-secs" style="text-align:left"><div class="card-h"><h2 class="jh">大問ごとの結果</h2></div>'+
    R.order.map(function(t){var x=R.secs[t],p=Math.round(x.c/x.n*100);return '<div class="kk-sec"><span>'+esc(t)+(sp.own&&sp.unit==='点'?' <small class="dim">('+x.pt+'点×'+x.n+')</small>':'')+'</span><i><b style="width:'+p+'%"></b></i><span class="mono">'+x.c+'/'+x.n+'</span></div>';}).join('')+'</div>';
  if(R.wrong.length){
    h+='<div class="card" style="text-align:left"><div class="card-h"><h2 class="jh">まちがえた問題</h2><span class="lbl">苦手の復習に入りました</span></div>'+
      R.wrong.slice(0,40).map(function(x){var q=x.q;return '<div class="kk-wq"><p lang="ja">'+esc(kkPlain(q.stem))+'</p><p><b>正解: '+esc(q.ans)+'</b>'+(x.pick>=0?' <span class="dim">(あなた: '+esc(q.opts[x.pick])+')</span>':' <span class="dim">(未解答)</span>')+'</p>'+(q.ex?'<p class="dim">'+esc(q.ex)+'</p>':'')+'</div>';}).join('')+
      (R.wrong.length>40?'<p class="dim">ほか '+(R.wrong.length-40)+'問は「苦手の復習」で練習できます。</p>':'')+'</div>';
  }
  return h+'<p class="dim hint">'+(sp.own?'この模試は専用の問題です(ドリルとは別の問題)。'+(sp.unit==='点'?'本番の出題分野・満点・時間に合わせた構成です。':'領域ごとに同じ数ずつ出ます。'):'いまの模試の問題は、ドリルと共通です。模試専用の問題は級ごとに追加していきます。')+'</p>'+
    '<div class="acts"><button class="go" type="button" data-kk-mock="'+M.k+'">もう一度挑戦する</button><button class="ghost" type="button" data-kk-mdone>ホームに戻る</button></div></div>';
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
    if(view==='kkm'||view==='kkr'){
      if(!KK.mock){view='home';return r0.apply(this,arguments);}
      $('tabs').hidden=true;var mm=$('main');mm.innerHTML=view==='kkm'?kkMockHTML():kkMockResultHTML();
      mm.classList.remove('enter','enter-l','enter-r');void mm.offsetWidth;mm.classList.add('enter');
      document.body.classList.remove('dark-ui');PREVVIEW=view;return;
    }
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
  if(t.hasAttribute('data-kk-mock')){kkMockStart(g('data-kk-mock'));return;}
  if(t.hasAttribute('data-kk-mpick')){var M=KK.mock;if(M&&!M.res){var v=+g('data-kk-mpick');M.a[M.i]=M.a[M.i]===v?-1:v;render();}return;}
  if(t.hasAttribute('data-kk-mgo')){var M2=KK.mock;if(M2){M2.i=Math.max(0,Math.min(M2.q.length-1,M2.i+(+g('data-kk-mgo'))));render();window.scrollTo(0,0);}return;}
  if(t.hasAttribute('data-kk-mjump')){var M3=KK.mock;if(M3){M3.i=+g('data-kk-mjump');closeSheet();render();window.scrollTo(0,0);}return;}
  if(t.hasAttribute('data-kk-mlist')){kkMockList();return;}
  if(t.hasAttribute('data-kk-msubmit')){
    var un=KK.mock?KK.mock.a.filter(function(v){return v<0;}).length:0;
    if(un&&!t.closest('.kk-confirm')){$('sheetHost').innerHTML='<div class="sheet plain kk-confirm" role="alertdialog"><div class="sheet-in"><h3>提出しますか？</h3><p class="dim" style="font-size:14px">未解答の問題が '+un+'問あります。</p><div class="row2"><button class="ghost" type="button" data-close-sheet style="flex:1">続ける</button><button class="go" type="button" data-kk-msubmit style="flex:1;margin:0">提出する</button></div></div></div>';return;}
    kkMockSubmit(false);return;}
  if(t.hasAttribute('data-kk-mquit')){$('sheetHost').innerHTML='<div class="sheet bad" role="alertdialog"><div class="sheet-in"><h3>模試をやめますか？</h3><p class="dim" style="font-size:14px">ここまでの解答は保存されません。</p><div class="row2"><button class="ghost" type="button" data-close-sheet style="flex:1">続ける</button><button class="ghost danger" type="button" data-kk-mdone style="flex:1">やめる</button></div></div></div>';return;}
  if(t.hasAttribute('data-kk-mdone')){clearInterval(KK.tick);KK.mock=null;closeSheet();view='home';render();window.scrollTo(0,0);return;}
  if(t.hasAttribute('data-kk-sel')){kkS().sel=g('data-kk-sel');store();closeSheet();render();return;}
  if(t.hasAttribute('data-kk-abort')){
    $('sheetHost').innerHTML='<div class="sheet bad" role="alertdialog" aria-label="終了の確認"><div class="sheet-in"><h3>このステップをやめますか？</h3><p class="dim" style="font-size:14px">ここまでの記録は保存されません。</p>'+
      '<div class="row2"><button class="ghost" type="button" data-kk-resume style="flex:1">続ける</button><button class="ghost danger" type="button" data-kk-quit style="flex:1">やめる</button></div></div></div>';return;}
  if(t.hasAttribute('data-kk-resume')){closeSheet();var R=KK.run;if(R&&R.ans>=0)kkSheet(R.q[R.i].opts[R.ans]===R.q[R.i].ans);return;}
  if(t.hasAttribute('data-kk-quit')){KK.run=null;closeSheet();view='home';render();window.scrollTo(0,0);return;}
});
document.addEventListener('keydown',function(e){
  if(view==='kkm'&&KK.mock&&!e.metaKey&&!e.ctrlKey&&!e.altKey){
    var M=KK.mock;if(/^[1-4]$/.test(e.key)){M.a[M.i]=+e.key-1;render();e.preventDefault();}
    else if(e.key==='ArrowRight'&&M.i+1<M.q.length){M.i++;render();e.preventDefault();}
    else if(e.key==='ArrowLeft'&&M.i>0){M.i--;render();e.preventDefault();}
    return;
  }
  if(view!=='kk'||!KK.run||e.metaKey||e.ctrlKey||e.altKey)return;
  if(KK.run.ans<0&&/^[1-4]$/.test(e.key)){kkAnswer(+e.key-1);e.preventDefault();}
  else if(KK.run.ans>=0&&(e.key==='Enter'||e.key===' ')){kkNext();e.preventDefault();}
});
