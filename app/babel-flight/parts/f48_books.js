/* ================= 教材・グッズ (affiliate links; test account only for now) =================
   A card in 記録 that lists books for the exams and jobs the app teaches. Every row is a PR (affiliate)
   link: the card says so at the top, and tapping a book opens a confirmation sheet before leaving the app.
   A row with url:'' is a slot that is still being chosen; it opens a 「準備中」 sheet instead of a link.
   Real links go in BOOKS[].url only after the affiliate account exists (https only).
   Website, 日本語 and the test account only: in the iPhone app cabinTester() is off (f20_native.js).
   Physical books only, so that the iPhone app can show the same list later without digital goods. */
var BOOKS=[
  {id:'e3',g:'検定対策',cv:'英検\n3級',tone:'',name:'英検3級 過去問題集',sub:'模試のあとに復習しやすい紙の問題集',url:''},
  {id:'e32',g:'検定対策',cv:'英検\n準2級',tone:'b',name:'英検準2級 総合対策',sub:'面接対策つきの1冊',url:''},
  {id:'e2',g:'検定対策',cv:'英検\n2級',tone:'',name:'英検2級 過去問題集',sub:'ライティングの採点基準が分かるもの',url:''},
  {id:'tan',g:'単語帳',cv:'単語\n帳',tone:'c',name:'高校入試の英単語帳',sub:'紙なので通知に邪魔されずに使える',url:''},
  {id:'avi',g:'パイロット向け',cv:'航空\n英語',tone:'b',name:'航空英語の入門書',sub:'管制用語の基本を日本語で整理',url:''}
];
function bookByID(id){var r=null;BOOKS.forEach(function(b){if(b.id===id)r=b;});return r;}
function bookOK(b){return !!(b&&typeof b.url==='string'&&/^https:\/\//.test(b.url));}
function booksCardHTML(){
  var groups=[];BOOKS.forEach(function(b){if(groups.indexOf(b.g)<0)groups.push(b.g);});
  var h='<section class="card book-card" id="bookCard"><div class="card-h"><h2 class="jh">教材・グッズ</h2><span class="lbl">テスト用アカウントだけ</span></div>'+
    '<p class="book-pr"><b>PR</b><span>このページのリンクは、買うとBabel Flightに紹介料が入る広告リンクです。あなたの支払いは増えません。</span></p>';
  groups.forEach(function(g){
    h+='<div class="book-g">'+esc(g)+'</div>';
    BOOKS.filter(function(b){return b.g===g;}).forEach(function(b){
      h+='<button class="book-row" type="button" data-book="'+esc(b.id)+'"><span class="book-cv '+b.tone+'" aria-hidden="true">'+esc(b.cv).replace(/\n/g,'<br>')+'</span>'+
        '<span class="book-tx"><b>'+esc(b.name)+'</b><small>'+esc(b.sub)+'</small>'+(bookOK(b)?'':'<i class="book-soon">準備中</i>')+'</span></button>';
    });
  });
  return h+'<p class="dim hint">表示の順番は、紹介料ではなく学習内容に合うかどうかで決めています。</p></section>';
}
function bookSheet(id){
  var b=bookByID(id);if(!b)return;
  var ok=bookOK(b);
  $('sheetHost').innerHTML='<div class="sheet plain book-sheet" role="dialog" aria-label="外のサイトへ移動"><div class="sheet-in">'+
    '<span class="lbl">PR</span><h3>'+esc(b.name)+'</h3>'+
    (ok?'<p class="book-note">外のサイトの販売ページを開きます。ここから買うと、Babel Flightに紹介料が入ります。あなたの支払いは増えません。</p>'+
        '<button class="go" type="button" data-book-go="'+esc(b.id)+'">販売ページを見る</button>'
       :'<p class="book-note">この本はまだ選んでいる途中です。リンクができたら、ここから見られるようになります。</p>')+
    '<button class="ghost" type="button" data-book-close>'+(ok?'やめておく':'とじる')+'</button></div></div>';
}
(function(){
  var c0=cabinCardHTML;
  cabinCardHTML=function(){
    var h=c0.apply(this,arguments);
    if(!h||!ACCT.on||!cabinTester()||UI!=='ja')return h;   /* 日本語 and the test account only for now */
    return h+booksCardHTML();
  };
})();
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  if(t.hasAttribute('data-book')){if(cabinTester())bookSheet(t.getAttribute('data-book'));return;}
  if(t.hasAttribute('data-book-close')){closeSheet();return;}
  if(t.hasAttribute('data-book-go')){
    var b=bookByID(t.getAttribute('data-book-go'));
    if(cabinTester()&&bookOK(b)){closeSheet();window.open(b.url,'_blank','noopener,noreferrer');}
  }
});
