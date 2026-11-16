/* ================= フレンドとランキング (every class, signed in) =================
   /api/social (src/lib/social.server.ts). 記録 → フレンド: my friend code (send it, or change it), add a friend by
   their code (or the link /?friend=CODE, which waits for sign-in), the friends, and the weekly ranking.
   The ranking is OFF at first (some people find it stressful). While off, no miles go to the server; when on, the
   miles of each lesson are sent and friends who also turned it on are ranked for this week (Monday to Sunday). */

var SOC={data:null,busy:false,err:'',msg:'',peek:null,code:'',sentMe:''};
var SOC_PEND='babelflight.friendCode',SOC_ON='babelflight.rankOn';
function socCode(v){var c=String(v||'').toUpperCase().replace(/[^A-Z0-9]/g,'');return /^[A-HJ-NP-Z2-9]{8}$/.test(c)?c:'';}
function socOnLocal(){return !!(ACCT&&ACCT.me&&lsGet(SOC_ON)===ACCT.me.uid);}
function socErr(e){
  return ({signin:'ログインすると使えます。',code:'このフレンドコードは見つかりません(まちがい・変更ずみのどちらか)。',self:'自分のコードです。',already:'もうフレンドです。',
    full:'フレンドは30人までです。',their_full:'相手のフレンドがいっぱいです。',too_many:'今日はたくさん追加しました。また明日ね。'})[e&&e.error]||'うまくいきませんでした。電波を確かめて、もう一度試してね。';
}
function socCall(m,p,b){return acctApi(m,p,b).then(function(j){if(!j||!j.ok)throw j||{};return j;});}
function socMe(){
  if(!ACCT.me)return;
  var nm=save.name&&save.name!=='PASSENGER'?save.name:'',k=nm+'|'+(save.icon||'');
  if(SOC.sentMe===k)return;SOC.sentMe=k;
  socCall('POST','/api/social/me',{name:nm,icon:save.icon||''}).catch(function(){SOC.sentMe='';});
}
function socLoad(){
  if(!ACCT.me||SOC.busy)return;
  SOC.busy=true;socMe();
  socCall('GET','/api/social').then(function(j){SOC.data=j;SOC.err='';if(j.on)lsSet(SOC_ON,ACCT.me.uid);else if(socOnLocal())lsSet(SOC_ON,'');},function(j){SOC.err=socErr(j);})
    .then(function(){SOC.busy=false;socRefresh();});
}
function socRefresh(){
  if(document.querySelector('#sheetHost .soc-sheet'))socAddSheet();
  if(view==='record'){var y=window.scrollY;render();window.scrollTo(0,y);}
}
function socAv(id){return '<span class="fam-av" aria-hidden="true">'+avatarHTML(id||'plane')+'</span>';}
function socCardHTML(){
  if(!ACCT||!ACCT.on)return '';
  var h='<section class="card soc-card"><div class="card-h"><h2 class="jh">フレンド</h2><span class="lbl">FRIENDS</span></div>';
  if(!ACCT.me)return h+'<p class="dim">ログインすると、フレンドを追加して、週のマイルを競えます(ランキングは自分でオンにした時だけ)。</p></section>';
  var d=SOC.data;
  if(!d){if(!SOC.busy&&!SOC.err)setTimeout(socLoad,0);return h+(SOC.err?'<p class="warn">'+esc(SOC.err)+'</p><button class="ghost sm" type="button" data-soc-retry>もう一度</button>':'<p class="dim">読み込み中…</p>')+'</section>';}
  h+='<div class="soc-code"><div><span class="lbl">あなたのフレンドコード</span><b class="mono">'+d.code.slice(0,4)+' '+d.code.slice(4)+'</b></div>'+
    '<div class="soc-code-b"><button class="go sm" type="button" data-soc-send>送る</button><button class="ghost sm" type="button" data-soc-add>コードを入れる</button></div></div>';
  /* the ranking */
  h+='<div class="set-block soc-rank-set"><span class="lbl">週のランキング</span>'+seg('data-soc-on',d.on?'1':'0',[['0','オフ'],['1','オン']])+
    '<small class="dim">'+(d.on?'オンのフレンドどうしで、今週(月〜日)のマイルを比べます。オフにすると、今週の記録は消えます。':'オフの間は、マイルはどこにも送られません。比べたくなったらオンにしてね。')+'</small></div>';
  if(d.on&&d.board){
    var medal=['🥇','🥈','🥉'];
    h+='<ol class="soc-board">'+d.board.map(function(r,i){
      return '<li class="'+(r.me?'me':'')+'"><span class="soc-pos">'+(i<3&&r.miles>0?medal[i]:(i+1))+'</span>'+socAv(r.icon)+'<b translate="no">'+esc(r.name||(r.me?'あなた':'名前なし'))+(r.me?' <small>(あなた)</small>':'')+'</b><span class="soc-mi mono">'+fmt(r.miles)+'<small> mi</small></span></li>';
    }).join('')+'</ol>';
    if(d.board.length<2)h+='<p class="dim hint">ランキングをオンにしているフレンドがまだいません。</p>';
    h+='<p class="dim hint">毎週月曜日にリセット ・ 1日に数えるのは3,000マイルまで</p>';
  }
  /* friends */
  var fr=d.friends||[];
  h+='<span class="lbl soc-fl">フレンド '+fr.length+' / '+d.max+'</span>';
  if(!fr.length)h+='<p class="dim">まだフレンドはいません。コードを送るか、友達のコードを入れてね。</p>';
  else h+='<ul class="soc-list">'+fr.map(function(f){
    return '<li>'+socAv(f.icon)+'<b translate="no">'+esc(f.name||'名前なし')+'</b>'+(typeof f.miles==='number'?'<span class="soc-mi mono">'+fmt(f.miles)+'<small> mi</small></span>':'')+
      '<button class="mini soc-rm" type="button" data-soc-rm="'+f.id+'" aria-label="'+esc(f.name||'この人')+'をフレンドから外す">✕</button></li>';
  }).join('')+'</ul>';
  if(SOC.msg)h+='<p class="fam-ok" role="status">'+esc(SOC.msg)+'</p>';
  if(SOC.err)h+='<p class="warn">'+esc(SOC.err)+'</p>';
  h+='<p class="dim hint">フレンドに見えるのは、名前とアイコン(と、おたがいにオンの時だけ今週のマイル)です。学習記録やメールアドレスは見えません。'+
    '<button class="linkish" type="button" data-soc-newcode>コードを変える</button></p>';
  return h+'</section>';
}
function socAddSheet(){
  var h='<div class="sheet plain soc-sheet" role="dialog" aria-label="フレンドを追加"><div class="sheet-in"><span class="lbl">ADD A FRIEND</span><h3>フレンドを追加</h3>';
  if(!ACCT.me)h+='<p class="dim">ログインすると追加できます。</p><button class="go" type="button" data-acct-open>ログイン / 新規登録</button>';
  else if(SOC.peek){
    h+='<div class="fam-owner">'+socAv(SOC.peek.icon)+'<div><b translate="no">'+esc(SOC.peek.name||'名前なし')+'</b><small>とフレンドになります</small></div></div>'+
      '<p class="dim">おたがいに名前とアイコンが見えるようになります。いつでも外せます。</p><button class="go" type="button" data-soc-confirm'+(SOC.busy?' disabled':'')+'>フレンドになる</button>';
  }else{
    h+='<p class="dim">友達の8文字のフレンドコードを入れてね。</p><input id="socIn" class="fam-in mono" maxlength="9" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="ABCD 2345" aria-label="フレンドコード" value="'+esc(SOC.code)+'">'+
      '<button class="go" type="button" data-soc-peek'+(SOC.busy?' disabled':'')+'>次へ</button>';
  }
  if(SOC.err)h+='<p class="warn">'+esc(SOC.err)+'</p>';
  $('sheetHost').innerHTML=h+'<button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';
}
function socPeek(code){
  code=socCode(code);
  if(!code){SOC.err='8文字のフレンドコードを入れてね。';socAddSheet();return;}
  SOC.code=code;SOC.busy=true;SOC.err='';socAddSheet();
  socCall('POST','/api/social/peek',{code:code}).then(function(j){SOC.peek=j.friend||{};},function(j){SOC.err=socErr(j);SOC.peek=null;}).then(function(){SOC.busy=false;socAddSheet();});
}
function socSend(btn){
  var c=SOC.data&&SOC.data.code;if(!c)return;
  var url=bfSiteUrl('/?friend='+c),txt=uiF('Babel Flight でフレンドになろう！ フレンドコード: {0}',[c]);
  if(navigator.share){navigator.share({title:T('Babel Flight フレンド'),text:txt,url:url}).catch(function(){});return;}
  function done(ok){btn.textContent=ok?'コピーしました ✓':'コピーできませんでした';setTimeout(function(){if(btn.isConnected)btn.textContent='送る';},1800);}
  try{navigator.clipboard.writeText(txt+' '+url).then(function(){done(true);},function(){done(false);});}catch(e){done(false);}
}

(function(){
  var rh=recordHTML;
  recordHTML=function(){
    var h=rh.apply(this,arguments),card=socCardHTML();if(!card)return h;
    var at=h.indexOf('<section class="card" style="--lc');
    return at>=0?h.slice(0,at)+card+h.slice(at):h+card;
  };
  /* miles of each lesson, only while the ranking is on */
  var cl=completeLesson;
  completeLesson=function(){
    var before=save.miles||0,r=cl.apply(this,arguments),n=(save.miles||0)-before;
    if(n>0&&socOnLocal())socCall('POST','/api/social/miles',{n:n}).then(function(){if(SOC.data)SOC.data=null;}).catch(function(){});
    return r;
  };
  var es=entSet;
  entSet=function(){
    var r=es.apply(this,arguments);
    if(ACCT&&ACCT.me){
      var pc=null;try{pc=sessionStorage.getItem(SOC_PEND);}catch(x){}
      if(pc){try{sessionStorage.removeItem(SOC_PEND);}catch(x){}setTimeout(function(){SOC.err='';SOC.peek=null;socPeek(pc);},600);}
    }else{SOC.data=null;SOC.sentMe='';}
    return r;
  };
})();
/* ?friend=CODE */
(function(){
  try{
    var u=new URL(location.href),c=socCode(u.searchParams.get('friend'));if(!c)return;
    u.searchParams.delete('friend');history.replaceState(null,'',u.pathname+(u.search||'')+u.hash);
    sessionStorage.setItem(SOC_PEND,c);
    setTimeout(function(){if(ACCT&&ACCT.me)return;SOC.code=c;socAddSheet();},1800);
  }catch(e){}
})();
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  var a=function(n){return t.hasAttribute(n);},g=function(n){return t.getAttribute(n);};
  if(a('data-soc-retry')){SOC.err='';socLoad();return;}
  if(a('data-soc-send')){socSend(t);return;}
  if(a('data-soc-add')){SOC.err='';SOC.peek=null;SOC.code='';socAddSheet();return;}
  if(a('data-soc-peek')){var i=$('socIn');socPeek(i?i.value:'');return;}
  if(a('data-soc-confirm')){
    SOC.busy=true;socAddSheet();
    socCall('POST','/api/social/add',{code:SOC.code}).then(function(j){SOC.msg=(j.friend&&j.friend.name||'新しい友達')+' とフレンドになりました！';closeSheet();},function(j){SOC.err=socErr(j);socAddSheet();})
      .then(function(){SOC.busy=false;SOC.peek=null;SOC.code='';SOC.data=null;socLoad();});
    return;
  }
  if(a('data-soc-on')){
    var on=g('data-soc-on')==='1';SOC.msg='';
    socCall('POST','/api/social/on',{on:on}).then(function(){if(ACCT.me)lsSet(SOC_ON,on?ACCT.me.uid:'');},function(j){SOC.err=socErr(j);}).then(function(){SOC.data=null;socLoad();});
    return;
  }
  if(a('data-soc-rm')){
    if(!t.classList.contains('confirm')){t.classList.add('confirm');t.textContent='外す？';return;}
    socCall('POST','/api/social/remove',{id:g('data-soc-rm')}).catch(function(j){SOC.err=socErr(j);}).then(function(){SOC.msg='';SOC.data=null;socLoad();});
    return;
  }
  if(a('data-soc-newcode')){
    if(!t.classList.contains('confirm')){t.classList.add('confirm');t.textContent='本当に変える？(前のコードは使えなくなります)';return;}
    socCall('POST','/api/social/code').then(function(){SOC.msg='新しいフレンドコードにしました。';},function(j){SOC.err=socErr(j);}).then(function(){SOC.data=null;socLoad();});
    return;
  }
});
document.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target&&e.target.id==='socIn'){e.preventDefault();socPeek(e.target.value);}});
