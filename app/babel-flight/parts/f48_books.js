/* ================= 参考書 (affiliate links; test account only for now) =================
   At the very bottom of the 検定 tab: one study book for every level that has lessons (XBANK in f17_exam.js).
   Every row is a PR (affiliate) link: the card says so at the top, and tapping a book opens a confirmation
   sheet before leaving the app. A row with url:'' is a slot that is still being chosen; it opens a 「準備中」
   sheet instead of a link. Real links go in BOOKS[].url only after the affiliate account exists (https only).
   Website, 日本語 and the test account only: in the iPhone app cabinTester() is off (f20_native.js).
   Physical books only, so that the iPhone app can show the same list later without digital goods. */
var BOOKS=[
  {b:'ek5',g:'英検',name:'英検5級 対策本',sub:'過去問題集など',url:''},
  {b:'ek4',g:'英検',name:'英検4級 対策本',sub:'過去問題集など',url:''},
  {b:'ek3',g:'英検',name:'英検3級 対策本',sub:'過去問題集など',url:''},
  {b:'ekp2',g:'英検',name:'英検準2級 対策本',sub:'過去問題集など',url:''},
  {b:'ekp2p',g:'英検',name:'英検準2級プラス 対策本',sub:'全問題集など',url:''},
  {b:'ek2',g:'英検',name:'英検2級 対策本',sub:'過去問題集など',url:''},
  {b:'ekp1',g:'英検',name:'英検準1級 対策本',sub:'過去問題集など',url:''},
  {b:'ek1',g:'英検',name:'英検1級 対策本',sub:'過去問題集など',url:''},
  {b:'toeic',g:'TOEIC・IELTS・TOEFL',name:'TOEIC L&R 対策本',sub:'公式問題集など',url:''},
  {b:'ielts',g:'TOEIC・IELTS・TOEFL',name:'IELTS 対策本',sub:'公式の練習問題など',url:''},
  {b:'toefl',g:'TOEIC・IELTS・TOEFL',name:'TOEFL iBT 対策本',sub:'新形式に合ったもの',url:''},
  {b:'icao',g:'航空英語(ICAO)',name:'航空英語(ICAO) 対策本',sub:'管制用語・航空通信の英語',url:''},
  {b:'topik1',g:'TOPIK',name:'TOPIK Ⅰ 対策本',sub:'過去問題集など',url:''},
  {b:'topik2',g:'TOPIK',name:'TOPIK Ⅱ 対策本',sub:'過去問題集など',url:''},
  {b:'dele-a2',g:'DELE',name:'DELE A2 対策本',sub:'過去問題集など',url:''},
  {b:'dele-b1',g:'DELE',name:'DELE B1 対策本',sub:'過去問題集など',url:''},
  {b:'cils-a2',g:'CILS',name:'CILS A2 対策本',sub:'過去問題集など',url:''},
  {b:'cils-b1',g:'CILS',name:'CILS B1 対策本',sub:'過去問題集など',url:''}
];
function bookByBank(k){var r=null;BOOKS.forEach(function(x){if(x.b===k)r=x;});return r;}
function bookOK(x){return !!(x&&typeof x.url==='string'&&/^https:\/\//.test(x.url));}
/* the books for the language being learned (only levels that exist in XBANK) */
function booksFor(L){return BOOKS.filter(function(x){return XBANK[x.b]&&XBANK[x.b].L===L;});}
function booksShown(){
  return save.mode==='exam'&&examModeOn()&&ACCT.on&&cabinTester()&&UI==='ja'&&booksFor(save.lang).length>0;
}
function booksCardHTML(){
  var list=booksFor(save.lang),groups=[];
  list.forEach(function(x){if(groups.indexOf(x.g)<0)groups.push(x.g);});
  var h='<section class="card book-card" id="bookCard"><div class="card-h"><h2 class="jh">参考書を買う</h2><span class="lbl">テスト用アカウントだけ</span></div>'+
    '<p class="book-pr"><b>PR</b><span>このページのリンクは、買うとBabel Flightに紹介料が入る広告リンクです。あなたの支払いは増えません。</span></p>';
  groups.forEach(function(g){
    h+='<div class="book-g">'+esc(g)+'</div>';
    list.filter(function(x){return x.g===g;}).forEach(function(x){
      h+='<button class="book-row" type="button" data-book="'+esc(x.b)+'"><span class="book-tx"><b>'+esc(x.name)+'</b><small>'+esc(x.sub)+'</small></span>'+
        (bookOK(x)?'<span class="chev" aria-hidden="true">›</span>':'<i class="book-soon">準備中</i>')+'</button>';
    });
  });
  return h+'<p class="dim hint">表示の順番は、紹介料ではなく学習内容に合うかどうかで決めています。</p></section>';
}
function bookSheet(k){
  var x=bookByBank(k);if(!x)return;
  var ok=bookOK(x);
  $('sheetHost').innerHTML='<div class="sheet plain book-sheet" role="dialog" aria-label="外のサイトへ移動"><div class="sheet-in">'+
    '<span class="lbl">PR</span><h3>'+esc(x.name)+'</h3>'+
    (ok?'<p class="book-note">外のサイトの販売ページを開きます。ここから買うと、Babel Flightに紹介料が入ります。あなたの支払いは増えません。</p>'+
        '<button class="go" type="button" data-book-go="'+esc(x.b)+'">販売ページを見る</button>'
       :'<p class="book-note">この本はまだ選んでいる途中です。リンクができたら、ここから見られるようになります。</p>')+
    '<button class="ghost" type="button" data-book-close>'+(ok?'やめておく':'とじる')+'</button></div></div>';
}
/* 検定 tab: the very bottom of the home screen (inside the last page in the スイート design) */
(function(){
  var hh=homeHTML;
  homeHTML=function(){
    var h=hh.apply(this,arguments);
    if(!booksShown())return h;
    var card=booksCardHTML(),mark='</section></div><div class="sp-dots"',i=h.indexOf('id="suitePages"')>=0?h.lastIndexOf(mark):-1;
    return i>=0?h.slice(0,i)+card+h.slice(i):h+card;
  };
})();
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  if(t.hasAttribute('data-book')){if(cabinTester())bookSheet(t.getAttribute('data-book'));return;}
  if(t.hasAttribute('data-book-close')){closeSheet();return;}
  if(t.hasAttribute('data-book-go')){
    var x=bookByBank(t.getAttribute('data-book-go'));
    if(cabinTester()&&bookOK(x)){closeSheet();window.open(x.url,'_blank','noopener,noreferrer');}
  }
});
