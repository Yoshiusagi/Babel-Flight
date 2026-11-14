/* ================= 家族シェア (ファースト, standalone site) =================
   An account flying ファースト by itself (the test account, the family account, the hidden reward, a paid
   ファースト) shares it with up to two family members: /api/family (src/lib/family.server.ts).
   - 記録 → 家族シェア card: the sharer makes invite codes (one use, 7 days), shares the link
     https://babelflight.com/?family=CODE, sees the members and can remove them.
   - The link (or the code typed in) opens the joining sheet after sign-in; members see whose ファースト they share
     and can leave. While shared, ENT.fam is the sharer's name and the page flies ファースト (cabinPlanLv 3).
   Not in the iPhone app (cabinLv -1). */

var FAM={data:null,busy:false,err:'',code:'',peek:null,msg:''};
var FAM_PEND='babelflight.famCode';
function famCode(v){var c=String(v||'').toUpperCase().replace(/[^A-Z0-9]/g,'');return /^[A-HJ-NP-Z2-9]{8}$/.test(c)?c:'';}
function famLink(c){return location.origin+'/?family='+c;}
function famShared(){return !!(ENT&&ENT.fam);}
/* the family account (the owner's brother, plan 'family' on the server): ファースト like the test account, without the switcher */
function famAcct(){return !!(ENT&&ENT.plan==='family');}
function famErr(e){
  return ({signin:'ログインすると使えます。',class:'家族シェアは、自分でファーストクラスに乗っている人だけが使えます。',member:'家族のファーストを共有中なので、さらに分けることはできません。',
    full:'家族はもう2人います。',codes:'使っていない招待コードが3つあります。先にそれを使うか、取り消してね。',code:'このコードは使えません(まちがい・使用済み・期限切れのどれか)。',
    self:'自分のコードには参加できません。',in_family:'もう別の家族に参加しています。先に今の家族から抜けてね。',owner:'あなたは家族とファーストを共有している側なので、参加できません。',
    already_first:'あなたはもうファーストクラスです。参加しなくても全部使えます。',owner_class:'招待した人が、いまファーストクラスではありません。',
    too_many:'この家族には、最近たくさんの人が参加しています。しばらくしてからもう一度試してね。'})[e&&e.error]||'うまくいきませんでした。電波を確かめて、もう一度試してね。';
}
function famCall(m,p,b){return acctApi(m,p,b).then(function(j){if(!j.ok)throw j;return j;});}
function famLoad(){
  if(!ACCT.me||FAM.busy)return;
  FAM.busy=true;
  famCall('GET','/api/family').then(function(j){FAM.data=j;FAM.err='';},function(j){FAM.err=famErr(j);}).then(function(){FAM.busy=false;famRefresh();});
}
function famRefresh(){
  if(document.querySelector('#sheetHost .fam-sheet'))famSheet();
  if(view==='record'){var y=window.scrollY;render();window.scrollTo(0,y);}
}
function famAv(id){return '<span class="fam-av" aria-hidden="true">'+avatarHTML(id)+'</span>';}
function famDate(ms){var d=new Date(ms);return (d.getMonth()+1)+'月'+d.getDate()+'日';}

/* ---- 記録: the card ---- */
function famCardHTML(){
  if(typeof cabinLv!=='function'||cabinLv()<0||!ACCT||!ACCT.on)return '';
  var me=!!ACCT.me,d=FAM.data;
  if(me&&!d&&!FAM.busy&&!FAM.err)setTimeout(famLoad,0);
  var h='<section class="card fam-card"><div class="card-h"><h2 class="jh">家族シェア</h2><span class="lbl">FIRST</span></div>';
  if(famShared()||(d&&d.role==='member')){
    h+='<p class="fam-now"><span aria-hidden="true">👨‍👩‍👧</span> <b translate="no">'+esc(ENT.fam||(d&&d.owner&&d.owner.name)||'家族')+'</b> さんのファーストクラスを'+(famShared()?'共有中です':'共有しています(いまは相手がファーストではありません)')+'</p>'+
      '<button class="ghost sm" type="button" data-fam-open>くわしく・抜ける</button>';
  }else if(me&&d&&d.can){
    var n=(d.members||[]).length;
    h+='<p class="dim">ファーストクラスを、家族2人まで分け合えます。いま <b>'+n+' / '+d.max+'人</b></p>'+
      (n?'<div class="fam-mem">'+d.members.map(function(m){return '<span class="fam-chip">'+famAv(m.icon||'plane')+'<b translate="no">'+esc(m.name||'名前なし')+'</b></span>';}).join('')+'</div>':'')+
      '<button class="go sm" type="button" data-fam-open>'+(n<d.max?'家族を招待する':'家族シェアを管理する')+'</button>';
  }else{
    h+='<p class="dim">家族からファーストクラスの招待コードをもらったら、ここに入れると一緒に使えます。</p>'+
      '<button class="ghost sm" type="button" data-fam-enter>招待コードを入れる</button>';
  }
  return h+'</section>';
}

/* ---- the sheet ---- */
function famSheet(){
  var d=FAM.data,h='<div class="sheet plain fam-sheet" role="dialog" aria-label="家族シェア"><div class="sheet-in"><span class="lbl">FAMILY SHARING ・ FIRST CLASS</span><h3>家族シェア</h3>';
  if(ACCT.me&&!d&&FAM.busy&&!FAM.peek){
    h+='<p class="aiout wait">読み込み中…</p>';
  }else if(!ACCT.me){
    h+='<p class="dim">ログインすると使えます。</p><button class="go" type="button" data-acct-open>ログイン / 新規登録</button>';
  }else if(famShared()||(d&&d.role==='member')){
    var o=d&&d.owner||{name:ENT.fam};
    h+='<div class="fam-owner">'+famAv(o.icon||'plane')+'<div><b translate="no">'+esc(o.name||ENT.fam||'家族')+'</b><small>'+(o.active===false?'いまファーストクラスではありません':'ファーストクラスを共有してくれています')+'</small></div></div>'+
      '<p class="dim">共有してくれている人がファーストクラスの間、あなたもファーストクラスの機能を全部使えます。学習の記録は別々で、相手には見えません(見えるのは名前とアイコンだけ)。</p>'+
      '<button class="ghost danger" type="button" data-fam-leave>この家族から抜ける</button>';
  }else if(d&&d.can){
    var ms=d.members||[],codes=d.codes||[];
    h+='<p class="dim">ファーストクラスを、家族2人まで分け合えます。分けた人も、ファーストの機能を全部使えます。学習の記録は別々で、おたがいに見えるのは名前とアイコンだけです。</p>';
    h+='<div class="fam-seats">'+[0,1].map(function(i){
      var m=ms[i];
      return m?'<div class="fam-seat on">'+famAv(m.icon||'plane')+'<div><b translate="no">'+esc(m.name||'名前なし')+'</b><small>'+famDate(m.joined)+'から</small></div><button class="mini" type="button" data-fam-remove="'+m.id+'" aria-label="'+esc(m.name||'この人')+'を外す">✕</button></div>':
        '<div class="fam-seat"><span class="fam-empty" aria-hidden="true">＋</span><div><b>空いている席</b><small>SEAT '+(i?'1C':'1B')+'</small></div></div>';
    }).join('')+'</div>';
    if(codes.length){
      h+='<span class="lbl">招待コード(1回だけ使える ・ 7日間)</span>'+codes.map(function(c){
        return '<div class="fam-code"><b class="mono">'+c.code.slice(0,4)+' '+c.code.slice(4)+'</b><small>'+famDate(c.expires)+'まで</small>'+
          '<div class="fam-code-b"><button class="ghost sm" type="button" data-fam-send="'+c.code+'">送る</button><button class="ghost sm" type="button" data-fam-revoke="'+c.code+'">取り消す</button></div></div>';
      }).join('');
    }
    if(FAM.msg)h+='<p class="fam-ok" role="status">'+esc(FAM.msg)+'</p>';
    if(ms.length<d.max)h+='<button class="go" type="button" data-fam-invite'+(FAM.busy?' disabled':'')+'>招待コードを作る</button>';
    h+='<p class="dim hint">家族のためのしくみです。外した人の席は、すぐまた使えます(ただし1か月に参加できるのは4人まで)。あなたがファーストクラスでなくなると、家族のファーストも終わります。</p>';
  }else if(FAM.peek){
    var p=FAM.peek;
    h+='<div class="fam-owner">'+famAv(p.icon||'plane')+'<div><b translate="no">'+esc(p.name||'家族')+'</b><small>からの招待</small></div></div>'+
      '<p>この人のファーストクラスを、一緒に使えるようになります。</p><p class="dim">学習の記録は別々で、相手に見えるのはあなたの名前とアイコンだけです。いつでも抜けられます。</p>'+
      '<button class="go" type="button" data-fam-join'+(FAM.busy?' disabled':'')+'>参加する</button>';
  }else{
    h+='<p class="dim">家族からもらった8文字の招待コードを入れてね。</p>'+
      '<input id="famIn" class="fam-in mono" maxlength="9" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="ABCD 2345" aria-label="招待コード" value="'+esc(FAM.code)+'">'+
      '<button class="go" type="button" data-fam-peek'+(FAM.busy?' disabled':'')+'>次へ</button>';
  }
  if(FAM.err)h+='<p class="warn">'+esc(FAM.err)+'</p>';
  $('sheetHost').innerHTML=h+'<button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';
}
function famPeek(code){
  code=famCode(code);
  if(!code){FAM.err='8文字の招待コードを入れてね。';famSheet();return;}
  FAM.code=code;FAM.busy=true;FAM.err='';famSheet();
  famCall('POST','/api/family/peek',{code:code}).then(function(j){FAM.peek=j.owner||{};},function(j){FAM.err=famErr(j);FAM.peek=null;})
    .then(function(){FAM.busy=false;famSheet();});
}
function famJoin(){
  FAM.busy=true;FAM.err='';famSheet();
  famCall('POST','/api/family/join',{code:FAM.code}).then(function(j){
    FAM.peek=null;FAM.code='';
    return acctApi('GET','/api/account/me').then(function(m){if(m&&m.ok)entSet(m.ent);});
  },function(j){FAM.err=famErr(j);}).then(function(){
    FAM.busy=false;FAM.data=null;
    if(!FAM.err){
      $('sheetHost').innerHTML='<div class="sheet plain fam-welcome" role="dialog" aria-label="家族シェア"><div class="sheet-in"><div class="rw-cup" aria-hidden="true">✈️</div><h3>ファーストクラスへようこそ</h3>'+
        '<p><b translate="no">'+esc(ENT.fam||'家族')+'</b> さんのファーストクラスを共有しました。</p><p class="dim">ホームのラウンジから、AIコーチ・AI日記・路線シミュレーションなどが使えます。</p>'+
        '<button class="go" type="button" data-close-sheet>はじめる</button></div></div>';
      if(typeof chimeOK==='function')chimeOK();
    }else famSheet();
    famLoad();
  });
}
function famSend(code,btn){
  var url=famLink(code),txt='Babel Flight のファーストクラスを一緒に使おう！ 招待コード: '+code;
  if(navigator.share){navigator.share({title:'Babel Flight 家族シェア',text:txt,url:url}).catch(function(){});return;}
  var t=txt+' '+url;
  function done(ok){if(btn){btn.textContent=ok?'コピーしました ✓':'コピーできませんでした';setTimeout(function(){if(btn.isConnected)btn.textContent='送る';},1800);}}
  try{navigator.clipboard.writeText(t).then(function(){done(true);},function(){done(false);});}catch(e){done(false);}
}

/* ---- hooks ---- */
(function(){
  var es=entSet;
  entSet=function(e){
    var before=(ENT&&ENT.fam||'')+'|'+(ENT&&ENT.plan||'');
    var r=es.apply(this,arguments);
    ENT.fam=e&&typeof e.fam==='string'?e.fam.slice(0,24):'';
    if(ENT.fam+'|'+ENT.plan!==before){applyCabin();if(view!=='flight'&&view!=='atc'&&view!=='scene'&&view!=='route')render();}
    if(ACCT&&ACCT.me){var pc=null;try{pc=sessionStorage.getItem(FAM_PEND);}catch(x){}
      if(pc){try{sessionStorage.removeItem(FAM_PEND);}catch(x){}setTimeout(function(){if(!famShared())famPeek(pc);},400);}}
    else FAM.data=null;
    return r;
  };
  var pl=cabinPlanLv;
  cabinPlanLv=function(){return famShared()||famAcct()?3:pl.apply(this,arguments);};
  /* 記録: the class card says where ファースト comes from */
  var cc=cabinCardHTML;
  cabinCardHTML=function(){
    if(cabinLv()<0||cabinTester()||(!famAcct()&&(rewardUntil()||!famShared())))return cc.apply(this,arguments);
    var acct=famAcct();
    return '<section class="card cabin-card eco reward"><div class="card-h"><h2 class="jh">搭乗クラス</h2><span class="lbl">'+CABINS[3][2]+'</span></div>'+
      '<div class="cab-now"><b>'+CABINS[3][1]+'</b><small>'+(acct?'<span>👨‍👩‍👧 家族アカウント</span>':'<span>👨‍👩‍👧 家族シェア</span> ・ <span translate="no">'+esc(ENT.fam)+'</span>')+'</small></div>'+cabinFeatHTML(3)+cabDesignHTML(3,cabinDesign())+
      '<p class="dim hint">'+(acct?'家族アカウントなので、ファーストクラスの機能を全部使えます。':'家族がファーストクラスの間、一緒に使えます。')+'</p></section>';
  };
  var rh=recordHTML;
  recordHTML=function(){
    var h=rh.apply(this,arguments),card=famCardHTML();if(!card)return h;
    var at=h.indexOf('<section class="card cabin-card');
    if(at<0)return h+card;
    var end=h.indexOf('</section>',at);return end<0?h+card:h.slice(0,end+10)+card+h.slice(end+10);
  };
  /* the AI coach and the lounge: the sharer's ファースト is enough */
})();
/* ?family=CODE: kept until sign-in, then the joining sheet opens */
(function(){
  try{
    var u=new URL(location.href),c=famCode(u.searchParams.get('family'));
    if(!c)return;
    u.searchParams.delete('family');history.replaceState(null,'',u.pathname+(u.search||'')+u.hash);
    if(typeof cabinOn==='function'&&!cabinOn())return;
    sessionStorage.setItem(FAM_PEND,c);
    setTimeout(function(){
      if(ACCT&&ACCT.me)return; /* entSet opens it */
      FAM.code=c;
      $('sheetHost').innerHTML='<div class="sheet plain fam-sheet" role="dialog" aria-label="家族シェア"><div class="sheet-in"><span class="lbl">FAMILY SHARING</span><h3>家族シェアの招待</h3>'+
        '<p>家族から、ファーストクラスの招待が届いています。</p><p class="dim">参加するには、ログイン(または新規登録)してね。ログインすると、すぐ参加の画面になります。</p>'+
        '<button class="go" type="button" data-acct-open>ログイン / 新規登録</button><button class="ghost" type="button" data-close-sheet>あとで</button></div></div>';
    },1800);
  }catch(e){}
})();
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  var a=function(n){return t.hasAttribute(n);},g=function(n){return t.getAttribute(n);};
  if(a('data-fam-open')){FAM.err='';FAM.msg='';famLoad();famSheet();return;}
  if(a('data-fam-enter')){FAM.err='';FAM.peek=null;famSheet();return;}
  if(a('data-fam-peek')){var i=$('famIn');famPeek(i?i.value:'');return;}
  if(a('data-fam-join')){famJoin();return;}
  if(a('data-fam-invite')){
    FAM.busy=true;FAM.err='';FAM.msg='';famSheet();
    famCall('POST','/api/family/invite').then(function(j){FAM.msg='招待コードを作りました。「送る」から家族に送ってね。';},function(j){FAM.err=famErr(j);})
      .then(function(){FAM.busy=false;FAM.data=null;famLoad();});
    return;
  }
  if(a('data-fam-send')){famSend(g('data-fam-send'),t);return;}
  if(a('data-fam-revoke')){famCall('POST','/api/family/revoke',{code:g('data-fam-revoke')}).catch(function(){}).then(function(){FAM.msg='';FAM.data=null;famLoad();});return;}
  if(a('data-fam-remove')){
    if(!t.classList.contains('confirm')){t.classList.add('confirm');t.textContent='外す？';return;}
    famCall('POST','/api/family/remove',{id:+g('data-fam-remove')}).catch(function(j){FAM.err=famErr(j);}).then(function(){FAM.data=null;famLoad();});
    return;
  }
  if(a('data-fam-leave')){
    if(!t.classList.contains('confirm')){t.classList.add('confirm');t.textContent='本当に抜ける？(ファーストが使えなくなります)';return;}
    famCall('POST','/api/family/leave').then(function(){return acctApi('GET','/api/account/me').then(function(m){if(m&&m.ok)entSet(m.ent);});},function(j){FAM.err=famErr(j);})
      .then(function(){FAM.data=null;closeSheet();famLoad();});
    return;
  }
});
document.addEventListener('keydown',function(e){if(e.key==='Enter'&&e.target&&e.target.id==='famIn'){e.preventDefault();famPeek(e.target.value);}});
