/* ================= 共同フライト (every class, signed in, friends) =================
   Two friends share one weekly goal: COOP goal (14) lessons together, Monday to Sunday. Server: /api/social coop-*
   (src/lib/social.server.ts) — it only counts once BOTH said yes, at most 6 lessons a person a day.
   Each finished trip moves the pair on to the next city (COOP_DEST, by the number of trips done).
   Where: 記録 → フレンド (ask / accept / leave) and a card on the home screen while flying together. */

var COOP_LS='babelflight.coopOn';
var COOP_DEST=[['ソウル','SEL','🇰🇷'],['台北','TPE','🇹🇼'],['シンガポール','SIN','🇸🇬'],['シドニー','SYD','🇦🇺'],['ホノルル','HNL','🇺🇸'],['ロサンゼルス','LAX','🇺🇸'],
  ['ニューヨーク','JFK','🇺🇸'],['ロンドン','LHR','🇬🇧'],['パリ','CDG','🇫🇷'],['ローマ','FCO','🇮🇹'],['マドリード','MAD','🇪🇸'],['ドバイ','DXB','🇦🇪']];
function coopOnLocal(){return !!(ACCT&&ACCT.me&&lsGet(COOP_LS)===ACCT.me.uid);}
function coopData(){return SOC.data&&SOC.data.coop||null;}
function coopDest(c){return COOP_DEST[(c&&c.trips||0)%COOP_DEST.length];}
function coopErr(e){return ({busy:'その友達は、もう別の人と共同フライト中です。',not_friend:'フレンドではなくなったようです。'})[e&&e.error]||socErr(e);}

/* the route bar: 東京 ✈ ─── city, filled by the lessons of both */
function coopBarHTML(c){
  var d=coopDest(c),tot=Math.min(c.goal,c.me+c.them),pct=Math.round(tot/c.goal*100),mp=Math.round(Math.min(c.me,c.goal)/c.goal*100);
  return '<div class="coop-route"><span class="mono">HND</span><div class="coop-bar" role="img" aria-label="あと'+Math.max(0,c.goal-tot)+'レッスンで到着">'+
    '<i class="coop-me" style="width:'+mp+'%"></i><i class="coop-them" style="left:'+mp+'%;width:'+Math.max(0,pct-mp)+'%"></i>'+
    '<span class="coop-plane" style="left:'+pct+'%" aria-hidden="true">✈</span></div><span class="mono">'+d[1]+'</span></div>';
}
function coopBlockHTML(){
  var c=coopData();if(!c)return '';
  var h='<div class="coop-block"><div class="coop-h"><span class="lbl">共同フライト</span>'+(c.trips?'<span class="lbl">到着 '+c.trips+'回</span>':'')+'</div>';
  (c.invites||[]).forEach(function(f){
    h+='<div class="coop-inv">'+socAv(f.icon)+'<p><b translate="no">'+esc(f.name||'名前なし')+'</b> から、一緒に飛ぼうとお誘いが来ています</p>'+
      '<button class="go sm" type="button" data-coop-start="'+f.id+'">一緒に飛ぶ</button></div>';
  });
  if(c.state==='together'){
    var d=coopDest(c),tot=c.me+c.them,w=c['with']||{};
    h+='<p class="coop-t">'+uiF('{0} と {1} {2} へ飛行中',['<b translate="no">'+esc(w.name||T('友達'))+'</b>',d[2],esc(T(d[0]))])+'</p>'+coopBarHTML(c)+
      '<p class="coop-n"><span class="coop-dot coop-dme"></span>あなた '+c.me+' ・ <span class="coop-dot coop-dthem"></span><span translate="no">'+esc(w.name||'友達')+'</span> '+c.them+
      ' ・ <b>'+(tot>=c.goal?'今週は到着しました ✓':'あと '+(c.goal-tot)+' レッスン')+'</b></p>'+
      '<p class="dim hint">'+uiF('2人のレッスンを合わせて、週に{0}回で到着(1人1日6回まで数えます)。毎週月曜日に次の便が出ます。',[c.goal])+'<button class="linkish" type="button" data-coop-leave>やめる</button></p>';
  }else if(c.state==='asked'){
    h+='<p class="dim"><b translate="no">'+esc((c['with']||{}).name||'友達')+'</b> の返事を待っています。相手が「一緒に飛ぶ」を押すと出発します。<button class="linkish" type="button" data-coop-leave>取り消す</button></p>';
  }else if(!(c.invites||[]).length){
    h+='<p class="dim">'+uiF('フレンドと2人で、1週間に{0}レッスンを目指します。競争ではなく協力。下のフレンドの「一緒に飛ぶ」から誘えます。',[c.goal])+'</p>';
  }
  return h+'</div>';
}
/* home: only while flying together */
function coopHomeHTML(){
  if(!coopOnLocal())return '';
  var c=coopData();
  if(!c){if(!SOC.busy&&!SOC.err)setTimeout(socLoad,0);return '';}
  if(c.state!=='together')return '';
  var d=coopDest(c),tot=c.me+c.them,w=c['with']||{};
  return '<section class="card coop-home"><div class="card-h"><span class="lbl">CO-OP FLIGHT ・ '+d[1]+'</span><span class="lbl">'+Math.min(tot,c.goal)+' / '+c.goal+'</span></div>'+
    '<h2 class="jh">'+socAv(w.icon)+uiF('{0} と {1} へ',['<span translate="no">'+esc(w.name||T('友達'))+'</span>',esc(T(d[0]))])+'</h2>'+coopBarHTML(c)+
    '<p class="dim">'+(tot>=c.goal?'今週は到着！ 来週は次の街へ。':'あなた '+c.me+' ・ 相手 '+c.them+' ・ あと '+(c.goal-tot)+' レッスン')+'</p></section>';
}

function coopToast(m){
  var d=document.createElement('div');d.className='coop-toast';d.setAttribute('role','status');d.textContent=m;document.body.appendChild(d);
  setTimeout(function(){d.classList.add('out');},3200);setTimeout(function(){d.remove();},3800);
}
(function(){
  /* 記録 → フレンド: the block under the code, and 「一緒に飛ぶ」 on each friend */
  var sc=socCardHTML;
  socCardHTML=function(){
    var h=sc.apply(this,arguments),c=coopData();
    if(!c)return h;
    var at=h.indexOf('<div class="set-block soc-rank-set">');
    if(at>=0)h=h.slice(0,at)+coopBlockHTML()+h.slice(at);
    if(c.state==='none')h=h.replace(/(<button class="mini soc-rm" type="button" data-soc-rm="([0-9a-f]{16})")/g,'<button class="ghost sm coop-ask" type="button" data-coop-start="$2">一緒に飛ぶ</button>$1');
    return h;
  };
  /* remember locally whether we fly together (so the home card and the lesson tick need no extra call) */
  var sr=socRefresh;
  socRefresh=function(){
    var c=coopData();
    if(ACCT&&ACCT.me&&SOC.data)lsSet(COOP_LS,c&&c.state==='together'?ACCT.me.uid:'');
    sr.apply(this,arguments);
    if(view==='home'&&c){var y=window.scrollY;render();window.scrollTo(0,y);}
  };
  var hh=homeHTML;
  homeHTML=function(){
    var h=hh.apply(this,arguments),add=coopHomeHTML();if(!add)return h;
    var i=h.indexOf('</header>');return i>=0?h.slice(0,i+9)+add+h.slice(i+9):add+h;
  };
  var cl=completeLesson;
  completeLesson=function(){
    var r=cl.apply(this,arguments);
    if(coopOnLocal())socCall('POST','/api/social/coop-tick',{}).then(function(j){
      var c=coopData();if(c&&j.counted){c.me=j.me;c.them=j.them;if(j.reached)c.trips=(c.trips||0)+1;}
      if(j.reached)setTimeout(function(){coopToast(uiF('共同フライト到着！ {0} に着きました ✈',[T(coopDest({trips:(c&&c.trips||1)-1})[0])]));},1200);
    }).catch(function(){});
    return r;
  };
})();
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  if(t.hasAttribute('data-coop-start')){
    t.disabled=true;SOC.msg='';
    socCall('POST','/api/social/coop-start',{id:t.getAttribute('data-coop-start')})
      .then(function(j){SOC.msg=j.together?'共同フライト出発！ 2人で今週の目的地を目指そう。':'お誘いを送りました。相手が「一緒に飛ぶ」を押すと出発します。';},function(j){SOC.err=coopErr(j);})
      .then(function(){SOC.data=null;socLoad();});
    return;
  }
  if(t.hasAttribute('data-coop-leave')){
    if(!t.classList.contains('confirm')){t.classList.add('confirm');t.textContent='本当にやめる？';return;}
    socCall('POST','/api/social/coop-leave',{}).catch(function(j){SOC.err=coopErr(j);}).then(function(){SOC.msg='';SOC.data=null;if(ACCT.me)lsSet(COOP_LS,'');socLoad();});
    return;
  }
});
