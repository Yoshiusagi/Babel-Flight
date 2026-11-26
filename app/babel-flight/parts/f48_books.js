/* ================= 参考書 (affiliate links; test account only for now) =================
   At the very bottom of the 検定 tab: up to two candidate books for the level chosen in 「目標を選ぶ」.
   Every row is a PR (affiliate) link: the card says so at the top, and tapping a book opens a confirmation
   sheet before leaving the app. A candidate with url:'' has no link yet; it opens a 「準備中」 sheet instead.
   Real links go in CANDS[bank][i].url only after the affiliate account exists (https only).
   Website, 日本語 and the test account only: in the iPhone app cabinTester() is off (f20_native.js).
   Physical books only, so that the iPhone app can show the same list later without digital goods.
   The titles are candidates found on bookstore pages (Nov 2026); check the real book before putting a link on it. */
var CANDS={
  ek5:[{n:'英検5級 過去6回全問題集(旺文社)',s:'過去問を6回ぶん解ける問題集'}],
  ek4:[{n:'英検4級 過去6回全問題集(旺文社)',s:'過去問を6回ぶん解ける問題集'}],
  ek3:[{n:'英検3級 過去問集 2026年度版(旺文社・英検赤本)',s:'解説がくわしい過去問'},{n:'英検3級 過去6回全問題集(旺文社)',s:'過去問を6回ぶん解ける問題集'}],
  ekp2:[{n:'英検準2級 過去問集 2026年度版(旺文社・英検赤本)',s:'解説がくわしい過去問'},{n:'英検準2級 過去6回全問題集(旺文社)',s:'過去問を6回ぶん解ける問題集'}],
  ekp2p:[{n:'英検準2級プラス 全問題集 2026年度版(旺文社)',s:'2026年2月に出た新しい級の問題集'}],
  ek2:[{n:'英検2級 過去問集 2026年度版(旺文社・英検赤本)',s:'解説がくわしい過去問'},{n:'英検2級 過去6回全問題集(旺文社)',s:'過去問を6回ぶん解ける問題集'}],
  ekp1:[{n:'英検準1級 過去問集 2026年度版(旺文社・英検赤本)',s:'解説がくわしい過去問'},{n:'英検準1級 過去6回全問題集(旺文社)',s:'過去問を6回ぶん解ける問題集'}],
  ek1:[{n:'英検1級 過去問集 2026年度版(旺文社・英検赤本)',s:'解説がくわしい過去問'},{n:'英検1級 過去6回全問題集(旺文社)',s:'過去問を6回ぶん解ける問題集'}],
  toeic:[{n:'公式TOEIC Listening & Reading 問題集(IIBC)',s:'本番と同じ作り手の問題。最新の巻から選ぶ'},{n:'公式TOEIC Listening & Reading 英単語',s:'公式の単語帳'}],
  ielts:[{n:'The Official Cambridge Guide to IELTS',s:'公式のガイド。英語の本'}],
  toefl:[{n:'TOEFL iBT 公式問題集(2026年改訂対応)',s:'新しい形式に合わせた公式問題集'}],
  icao:[],
  topik1:[{n:'はじめてのTOPIK I 公式ガイドブック',s:'初めて受ける人向けの公式ガイド'},{n:'TOPIK 1 この一冊で合格する',s:'TOPIK Ⅰの対策本'}],
  topik2:[],
  'dele-a2':[],'dele-b1':[],'cils-a2':[],'cils-b1':[]
};
function bookCands(k){return (CANDS[k]||[]).map(function(x,i){return {id:k+'|'+i,n:x.n,s:x.s,url:x.url||''};});}
function bookByID(id){var p=String(id).split('|'),l=bookCands(p[0]);return l[+p[1]]||null;}
function bookOK(x){return !!(x&&typeof x.url==='string'&&/^https:\/\//.test(x.url));}
function booksOn(){return save.mode==='exam'&&examModeOn()&&ACCT.on&&cabinTester()&&UI==='ja';}
function booksCardHTML(){
  var t=examTarget(save.lang);if(!t)return '';
  var list=bookCands(t.bank.key);
  var h='<section class="card book-card" id="bookCard"><div class="card-h"><h2 class="jh">この目標の参考書</h2><span class="lbl">'+esc(t.name)+'</span></div>'+
    '<p class="book-pr"><b>PR</b><span>このページのリンクは、買うとBabel Flightに紹介料が入る広告リンクです。あなたの支払いは増えません。</span></p>';
  if(!list.length)h+='<p class="dim hint" style="margin-top:10px">この目標の参考書は、いま候補を探しています。</p>';
  list.forEach(function(x){
    h+='<button class="book-row" type="button" data-book="'+esc(x.id)+'"><span class="book-tx"><b>'+esc(x.n)+'</b><small>'+esc(x.s)+'</small></span>'+
      (bookOK(x)?'<span class="chev" aria-hidden="true">›</span>':'<i class="book-soon">準備中</i>')+'</button>';
  });
  return h+'<p class="dim hint">表示の順番は、紹介料ではなく学習内容に合うかどうかで決めています。</p></section>';
}
function bookSheet(id){
  var x=bookByID(id);if(!x)return;
  var ok=bookOK(x);
  $('sheetHost').innerHTML='<div class="sheet plain book-sheet" role="dialog" aria-label="外のサイトへ移動"><div class="sheet-in">'+
    '<span class="lbl">PR</span><h3>'+esc(x.n)+'</h3>'+
    (ok?'<p class="book-note">外のサイトの販売ページを開きます。ここから買うと、Babel Flightに紹介料が入ります。あなたの支払いは増えません。</p>'+
        '<button class="go" type="button" data-book-go="'+esc(x.id)+'">販売ページを見る</button>'
       :'<p class="book-note">この本は候補です。リンクができたら、ここから見られるようになります。</p>')+
    '<button class="ghost" type="button" data-book-close>'+(ok?'やめておく':'とじる')+'</button></div></div>';
}
/* 検定 tab: the very bottom of the home screen (inside the last page in the スイート design) */
(function(){
  var hh=homeHTML;
  homeHTML=function(){
    var h=hh.apply(this,arguments);
    if(!booksOn())return h;
    var card=booksCardHTML();if(!card)return h;
    var mark='</section></div><div class="sp-dots"',i=h.indexOf('id="suitePages"')>=0?h.lastIndexOf(mark):-1;
    return i>=0?h.slice(0,i)+card+h.slice(i):h+card;
  };
})();
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  if(t.hasAttribute('data-book')){if(cabinTester())bookSheet(t.getAttribute('data-book'));return;}
  if(t.hasAttribute('data-book-close')){closeSheet();return;}
  if(t.hasAttribute('data-book-go')){
    var x=bookByID(t.getAttribute('data-book-go'));
    if(cabinTester()&&bookOK(x)){closeSheet();window.open(x.url,'_blank','noopener,noreferrer');}
  }
});
