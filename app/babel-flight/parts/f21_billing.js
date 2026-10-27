/* ================= PLANS (Stripe, test mode; test account only for now) =================
   The test account sees a 「プランの購入」 card under 搭乗クラス in 記録. Buying goes through a
   final confirmation sheet (特定商取引法 12条の6: what you get, price, when and how you pay, when
   it starts, how to cancel) with the terms and a guardian's consent, then Stripe Checkout.
   Changing plan, cancelling, the card and receipts are in Stripe's customer portal.
   Every other account sees nothing new; the server refuses them too (/api/billing/*).
   Website only: in the iPhone app cabinTester() is off (f20_native.js), so none of this shows there. */
var BILL={st:null,t:0,loading:false,err:'',msg:'',msgKind:'',ret:'',tries:0,busy:false,scroll:false};
(function(){
  try{
    var u=new URL(location.href),r=u.searchParams.get('billing');
    if(r==='success'||r==='cancel'||r==='portal'){
      BILL.ret=r;BILL.scroll=true;
      u.searchParams.delete('billing');
      history.replaceState(history.state,'',u.pathname+(u.searchParams.toString()?'?'+u.searchParams.toString():'')+u.hash);
      if(save&&save.onboarded)view='record';
    }
  }catch(e){}
})();
function billYen(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,',');}
function billDay(ms){var d=new Date(ms);return d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日';}
function billPlan(key){var p=null;((BILL.st&&BILL.st.plans)||[]).forEach(function(x){if(x.key===key)p=x;});return p;}
function billFeats(lv){
  return CAB_FEAT.filter(function(f){return f[1][lv]&&f[1][lv]!=='—';}).map(function(f){
    var v=f[1][lv];return v==='◯'?f[0]:f[0]+'('+v.replace(/^\+/,'')+')';});
}
var BILL_ERR={
  signin:'ログインしなおしてね。',
  closed:'テストモードの準備中です。',
  consent:'2つのチェックを入れてね。',
  active:'すでに契約中です。プランの変更は「契約の管理」からできます。',
  no_customer:'まだ契約がありません。',
  stripe:'決済サービスにつながりませんでした。少し待ってからもう一度試してね。'
};
function billErrText(j){return BILL_ERR[j&&j.error]||(j&&j._s===0?'通信できませんでした。電波を確認してね。':'うまくいきませんでした。もう一度試してね。');}
function billApi(method,path,body){return acctApi(method,path,body).catch(function(){return {_s:0};});}

function billFetch(){
  if(BILL.loading||!ACCT.me||!cabinTester())return;
  BILL.loading=true;
  billApi('GET','/api/billing/status').then(function(j){
    BILL.loading=false;BILL.t=Date.now();
    if(j&&j.ok){BILL.st=j;BILL.err='';}else{BILL.err=billErrText(j);}
    billAfterFetch();
    billRefresh();
  });
}
/* coming back from Stripe: wait for the webhook to record the subscription, then switch the class to it */
function billAfterFetch(){
  var r=BILL.ret,st=BILL.st;
  if(!r)return;
  if(r==='cancel'){BILL.ret='';BILL.msg='申し込みをやめました。お金は動いていません。';BILL.msgKind='';return;}
  if(r==='portal'){BILL.ret='';BILL.msg='契約の管理から戻りました。';BILL.msgKind='';return;}
  if(!st||!st.enabled){BILL.ret='';return;}
  var s=st.sub;
  if(s&&s.active){
    BILL.ret='';
    var p=billPlan(s.plan);
    if(p&&p.level>=1&&p.level<=3){lsSet(CAB_KEY,String(p.level));lsSet(CAB_DKEY,String(p.level));applyCabin();}
    BILL.msg='✈️ '+(p?p.name:'プラン')+'の申し込みが完了しました。'+(st.test?'(テストモードなので、本物の請求はありません)':'');
    BILL.msgKind='ok';
    if(view==='record')setTimeout(render,0);
    return;
  }
  if(BILL.tries<15){BILL.tries++;BILL.msg='支払いを確認しています…';BILL.msgKind='wait';setTimeout(function(){BILL.t=0;billFetch();},2000);return;}
  BILL.ret='';BILL.msg='支払いの確認に時間がかかっています。少し待ってから、この画面を開き直してね。';BILL.msgKind='warn';
}
function billRefresh(){
  var el=$('billBody');if(!el)return;
  el.innerHTML=billBodyHTML();
  if(BILL.scroll&&BILL.st){BILL.scroll=false;var c=$('billCard');if(c&&c.scrollIntoView)c.scrollIntoView({block:'start'});}
}

function billSubHTML(s,st){
  var p=billPlan(s.plan),h='<div class="bill-now"><span class="lbl">ご利用中</span><b>'+esc(p?p.name:s.plan)+'</b>'+(p?'<span class="bill-yen">月'+billYen(p.amount)+'円</span>':'')+'</div>';
  if(s.status==='past_due')h+='<p class="bill-note bad">お支払いが確認できていません。「契約の管理」でカードを確認してね。</p>';
  if(s.cancelAt)h+='<p class="bill-note">解約の手続きずみ ・ <b>'+billDay(s.cancelAt)+'</b>まで使えます。それ以降の請求はありません。</p>';
  else if(s.periodEnd)h+='<p class="bill-note">次の更新日 <b>'+billDay(s.periodEnd)+'</b>(自動で更新されます)</p>';
  return h;
}
function billBodyHTML(){
  var st=BILL.st,h='';
  if(!ACCT.me)return '<p class="dim">ログインすると試せます。</p>';
  if(!st){
    if(BILL.err)return '<p class="bill-note bad">'+esc(BILL.err)+'</p><button class="ghost" type="button" data-bill-retry>もう一度読み込む</button>';
    return '<p class="dim">読み込み中…</p>';
  }
  if(!st.enabled)return '<p class="bill-note">まだ準備中です。保護者の方がStripeの<b>テスト用</b>キーを設定すると、ここから購入の流れを試せます(本物のお金は動きません)。</p>';
  if(st.test)h+='<div class="bill-test" role="note"><b>🧪 テストモード</b><span>本物のお金は動きません。カード番号 <code>4242 4242 4242 4242</code> ・ 有効期限は未来の日付 ・ セキュリティコードは好きな3桁で試せます。</span></div>';
  if(BILL.msg)h+='<p class="bill-msg '+BILL.msgKind+'" role="status">'+esc(BILL.msg)+'</p>';
  var s=st.sub;
  if(s&&s.active){
    h+=billSubHTML(s,st);
    h+='<button class="go sm" type="button" data-bill-portal'+(BILL.busy?' disabled':'')+'>契約の管理<small>プランの変更・解約・カード・領収書</small></button>';
  }else{
    if(s)h+='<p class="bill-note">前回の契約は終了しています。</p>';
    h+='<div class="bill-plans">'+(st.plans||[]).map(function(p){
      var f=billFeats(p.level);
      return '<button class="bill-plan" type="button" data-bill-plan="'+esc(p.key)+'"'+(BILL.busy?' disabled':'')+'><span class="bp-top"><b>'+esc(p.name)+'</b><span class="bill-yen">月'+billYen(p.amount)+'円<small>(税込)</small></span></span>'+
        '<small>'+esc(f.slice(1,4).join(' ・ '))+'</small></button>';
    }).join('')+'</div>';
    if(s)h+='<button class="ghost" type="button" data-bill-portal'+(BILL.busy?' disabled':'')+'>これまでの領収書を見る</button>';
  }
  h+='<p class="dim hint">支払いはStripeの画面で行います。カード番号がBabel Flightに届くことはありません。</p>';
  return h;
}
(function(){
  var c0=cabinCardHTML;
  cabinCardHTML=function(){
    var h=c0.apply(this,arguments);
    if(!h||!ACCT.on)return h;
    if(ACCT.me&&!BILL.loading&&(!BILL.st||Date.now()-BILL.t>30000))setTimeout(billFetch,0);
    return h+'<section class="card bill-card" id="billCard"><div class="card-h"><h2 class="jh">プランの購入</h2><span class="lbl">テスト用アカウントだけ</span></div><div id="billBody">'+billBodyHTML()+'</div></section>';
  };
})();

/* ---- the final confirmation screen (最終確認画面) ---- */
function billConfirmSheet(key){
  var p=billPlan(key);if(!p||!BILL.st||!BILL.st.enabled)return;
  var test=BILL.st.test;
  $('sheetHost').innerHTML='<div class="sheet plain bill-sheet" role="dialog" aria-label="申し込み内容の確認"><div class="sheet-in">'+
    '<span class="lbl">最終確認</span><h3>'+esc(p.name)+'に申し込む</h3>'+
    (test?'<p class="bill-test sm"><b>🧪 テストモード</b><span>本物のお金は動きません。</span></p>':'')+
    '<dl class="bill-dl">'+
      '<dt>商品</dt><dd>Babel Flight「'+esc(p.name)+'」クラス(月額プラン)</dd>'+
      '<dt>内容</dt><dd><ul>'+billFeats(p.level).map(function(f){return '<li>'+esc(f)+'</li>';}).join('')+'</ul></dd>'+
      '<dt>価格</dt><dd><b>月額 '+billYen(p.amount)+'円(税込)</b></dd>'+
      '<dt>支払い時期</dt><dd>申し込んだときに1か月分。その後は毎月、申し込んだ日と同じ日に自動で支払い</dd>'+
      '<dt>支払い方法</dt><dd>クレジットカード・デビットカード(Stripe)</dd>'+
      '<dt>使える時期</dt><dd>支払いが終わるとすぐ</dd>'+
      '<dt>契約期間</dt><dd>1か月ごとに自動で更新</dd>'+
      '<dt>解約</dt><dd>「記録」→「契約の管理」からいつでもできます。解約しても次の更新日までは使えて、それ以降の請求はありません。月の途中で解約しても、日割りの返金はありません。</dd>'+
    '</dl>'+
    '<label class="bill-ck"><input type="checkbox" id="billAgree"><span>利用規約と、上の内容を確認して同意します</span></label>'+
    '<label class="bill-ck"><input type="checkbox" id="billGuard"><span>18歳以上です。または、保護者の方が内容を確認して申し込みに同意しています</span></label>'+
    '<p class="dim hint">利用規約と特定商取引法に基づく表記は、本番の前にこのサイトに載せます(いまは準備中)。</p>'+
    '<p class="bill-note bad" id="billErr" hidden></p>'+
    '<button class="go" type="button" data-bill-go="'+esc(p.key)+'" disabled>支払い画面へ進む</button>'+
    '<button class="ghost" type="button" data-close-sheet>やめる</button></div></div>';
}
function billCkSync(){
  var a=$('billAgree'),g=$('billGuard'),b=document.querySelector('[data-bill-go]');
  if(b&&!BILL.busy)b.disabled=!(a&&a.checked&&g&&g.checked);
}
function billCheckout(key,btn){
  var a=$('billAgree'),g=$('billGuard'),er=$('billErr');
  if(BILL.busy||!(a&&a.checked&&g&&g.checked))return;
  BILL.busy=true;btn.disabled=true;btn.textContent='Stripeに移動中…';if(er)er.hidden=true;
  billApi('POST','/api/billing/checkout',{plan:key,agree:true,guardian:true}).then(function(j){
    if(j&&j.ok&&typeof j.url==='string'&&/^https:\/\//.test(j.url)){location.assign(j.url);return;}
    BILL.busy=false;btn.textContent='支払い画面へ進む';billCkSync();
    if(er){er.textContent=billErrText(j);er.hidden=false;}
    if(j&&j.error==='active'){BILL.t=0;billFetch();}
  });
}
function billPortal(btn){
  if(BILL.busy)return;
  BILL.busy=true;btn.disabled=true;var t0=btn.innerHTML;btn.textContent='Stripeに移動中…';
  billApi('POST','/api/billing/portal').then(function(j){
    if(j&&j.ok&&typeof j.url==='string'&&/^https:\/\//.test(j.url)){location.assign(j.url);return;}
    BILL.busy=false;btn.disabled=false;btn.innerHTML=t0;
    BILL.msg=billErrText(j);BILL.msgKind='warn';billRefresh();
  });
}
/* back/forward cache: a page restored after going to Stripe must not stay "moving" */
window.addEventListener('pageshow',function(e){if(e.persisted&&BILL.busy){BILL.busy=false;closeSheet();billRefresh();}});
document.addEventListener('change',function(e){var id=e.target&&e.target.id;if(id==='billAgree'||id==='billGuard')billCkSync();});
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  if(t.hasAttribute('data-bill-plan')){if(cabinTester())billConfirmSheet(t.getAttribute('data-bill-plan'));return;}
  if(t.hasAttribute('data-bill-go')){if(cabinTester())billCheckout(t.getAttribute('data-bill-go'),t);return;}
  if(t.hasAttribute('data-bill-portal')){if(cabinTester())billPortal(t);return;}
  if(t.hasAttribute('data-bill-retry')){BILL.err='';billRefresh();BILL.t=0;billFetch();return;}
});
