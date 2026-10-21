/* ================= STATUS PERKS =================
   Things you get to keep once unlocked: Silver = more profile icons, Gold = theme colours.
   Things that last only while you hold the status: Platinum = the lounge (harder bonus lesson),
   Diamond = a special boarding pass, Captain = a gold ID card. */
var ACCENTS=[['','#ffcf26','サンシャイン'],['sky','#6cc3ff','スカイ'],['mint','#4fd6a5','ミント'],['coral','#ff9478','サンセット'],['lavender','#b9a4ff','トワイライト']];
var PERKS=[
 {lv:1,jp:'アイコンが6つ増える',keep:true},
 {lv:2,jp:'テーマカラーを選べる',keep:true},
 {lv:3,jp:'ラウンジ(上級のボーナスレッスン)',keep:false},
 {lv:4,jp:'特別デザインの搭乗券',keep:false},
 {lv:5,jp:'金色のIDカード',keep:false}
];
var LOUNGE_N=10,LOUNGE_BONUS=30;
/* ---- full access: the test account (later also paid plans) gets every feature ----
   Set from the server after sign-in (f13_account.js). Any future paid feature should check entitled(). */
var ENT={all:false,plan:''};
function entitled(){return !!(ENT&&ENT.all);}
function entSet(e){
  var all=!!(e&&e.all),changed=all!==ENT.all;
  ENT={all:all,plan:(e&&typeof e.plan==='string')?e.plan:''};
  if(changed){if(typeof applyAccent==='function')applyAccent();if(typeof render==='function'&&view!=='flight'&&view!=='atc'&&view!=='scene')render();}
}
/* the highest status ever reached (perks you keep) and the status held now (perks while it lasts) */
function perkEver(){return Math.max(save.stMax||0,statusIdx());}
function perkHas(lv){if(entitled())return true;var p=null;PERKS.forEach(function(x){if(x.lv===lv)p=x;});return p?(p.keep?perkEver():statusIdx())>=lv:false;}
function perkNote(lv){var p=null;PERKS.forEach(function(x){if(x.lv===lv)p=x;});return p?' ・ 特典: '+p.jp:'';}
function perksCardHTML(){
  var now=statusIdx(),ever=perkEver();
  return '<section class="card perks"><div class="card-h"><h2 class="jh">ステータス特典</h2><span class="lbl">いまは '+RANKS[now][0]+'</span></div><ul class="perk-list">'+
    PERKS.map(function(p){
      var on=entitled()||(p.keep?ever>=p.lv:now>=p.lv),st;
      if(entitled())st='テスト用で解放';
      else if(on)st=p.keep?'使える':'利用中';
      else if(!p.keep&&ever>=p.lv)st='もう一度'+RANKS[p.lv][0]+'で復活';
      else st=RANKS[p.lv][0]+'で解放';
      return '<li class="'+(on?'on':'off')+'"><span class="perk-lv">'+RANKS[p.lv][0]+'</span><span class="perk-jp">'+esc(p.jp)+'<small>'+(p.keep?'一度もらえばずっと使える':'そのステータスの間だけ')+'</small></span><span class="perk-st">'+(on?'':'<i aria-hidden="true">🔒</i>')+esc(st)+'</span></li>';
    }).join('')+'</ul></section>';
}
/* ---- Gold: theme colour ---- */
function accentOK(id){for(var i=0;i<ACCENTS.length;i++)if(ACCENTS[i][0]===id)return true;return false;}
function applyAccent(){var a=accentOK(save.accent)&&perkHas(2)?save.accent:'';if(a)rootEl.setAttribute('data-accent',a);else rootEl.removeAttribute('data-accent');}
function accentHTML(){
  var cur=accentOK(save.accent)?save.accent:'';
  if(!perkHas(2))return '<div class="set-block"><span class="lbl">テーマカラー</span><p class="dim hint perk-lock"><i aria-hidden="true">🔒</i> ゴールドになると選べるようになります(一度なればずっと使えます)。</p></div>';
  return '<div class="set-block"><span class="lbl">テーマカラー ・ ゴールド特典</span><div class="accents" role="group" aria-label="テーマカラー">'+
    ACCENTS.map(function(a){return '<button type="button" data-accent="'+a[0]+'" aria-pressed="'+(cur===a[0])+'" aria-label="'+a[2]+'"><i style="background:'+a[1]+'"></i><small>'+a[2]+'</small></button>';}).join('')+'</div></div>';
}
/* ---- Platinum: the lounge ---- */
function loungeCardHTML(L){
  var learned=learnedList(L).length;
  if(!perkHas(3))return '<section class="card mode lounge off"><span class="lbl">PLATINUM LOUNGE</span><h2 class="jh">プラチナラウンジ</h2><p class="dim"><i aria-hidden="true">🔒</i> プラチナ以上のステータスの間だけ入れる、上級のボーナスレッスン。入力・並べ替え・聞き取りの問題だけで'+LOUNGE_N+'問、ボーナス+'+LOUNGE_BONUS+'マイル。</p></section>';
  return '<section class="card mode lounge"><span class="lbl">PLATINUM LOUNGE ・ '+RANKS[statusIdx()][0]+'特典</span><h2 class="jh">プラチナラウンジ</h2><p class="dim">学習ずみのフレーズから、入力・並べ替え・聞き取りなど難しい形だけで'+LOUNGE_N+'問。クリアでボーナス+'+LOUNGE_BONUS+'マイル。</p>'+
    '<button class="go sm" type="button" data-lounge'+(learned?'':' disabled')+'>ラウンジに入る<small>'+(learned?LOUNGE_N+'問':'まず1レッスンやってみよう')+'</small></button></section>';
}
function startLounge(){
  if(!perkHas(3))return;
  var L=save.lang,items=shuffle(learnedList(L)).slice(0,LOUNGE_N);
  if(!items.length)return;
  startFlight({mode:'lounge',lang:L,items:items});
}
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  if(t.hasAttribute('data-accent')){var a=t.getAttribute('data-accent');if(!perkHas(2)||!accentOK(a))return;save.accent=a;store();applyAccent();render();return;}
  if(t.hasAttribute('data-lounge')){startLounge();return;}
});
