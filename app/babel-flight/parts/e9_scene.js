/* ================= SCENES: call mode & input mode ================= */
var SCX=null;
var GRADE_TXT={2:['◎','ばっちり言えた'],1:['△','おしい'],0:['✕','まだ言えない']};
function normLoose(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^\p{L}\p{N}\s]/gu,'').replace(/\s+/g,' ').trim();}
function simScore(a,b){
  a=normLoose(a).replace(/\s/g,'');b=normLoose(b).replace(/\s/g,'');
  if(!a||!b)return 0;if(a===b)return 1;
  function grams(s){var m={},n=0;for(var i=0;i<s.length-1;i++){var g=s.substr(i,2);m[g]=(m[g]||0)+1;n++;}return {m:m,n:n};}
  var A=grams(a),B=grams(b),inter=0;
  Object.keys(A.m).forEach(function(k){if(B.m[k])inter+=Math.min(A.m[k],B.m[k]);});
  return A.n+B.n?2*inter/(A.n+B.n):0;
}
function startScene(uid,mode){
  var L=save.lang,u=UNITS[L][uid];if(!u)return;
  closeSheet();
  SCX={lang:L,uid:uid,u:u,meta:SCENE_META[uid],mode:mode,idx:0,stage:'ring',grades:[],log:[],t0:0,timer:0,sub:true,tr:save.level==='beg',back:(view==='review'?'review':'home'),hint:false};
  view='scene';render();window.scrollTo(0,0);
  ringTone();
  setTimeout(function(){if(SCX&&SCX.stage==='ring'&&view==='scene')scBegin();},reduceMotion?300:1900);
}
function scClock(){if(!SCX||!SCX.t0)return '00:00';var s=Math.floor((Date.now()-SCX.t0)/1000);return pad2(Math.floor(s/60))+':'+pad2(s%60);}
function sceneHTML(){
  var S=SCX;if(!S)return '';
  var LG=LANGS[S.lang];
  var h='<div class="call"><div class="call-top"><span class="avatar big'+(S.stage==='ring'?' ringing':'')+'" aria-hidden="true">'+esc(S.meta.ini)+'</span>'+
    '<div class="call-who"><b>'+esc(S.meta.role)+'</b><span class="mono" id="scTimer">'+(S.stage==='ring'?'呼び出し中…':scClock())+'</span><small>'+esc(S.meta.jp)+' ・ '+esc(LG.name)+' ・ '+(S.mode==='call'?'通話モード':'入力モード')+'</small></div></div>';
  h+='<div class="sc-sitline">'+esc(S.meta.sit)+'</div>';
  h+='<div id="scLog" class="sclog" aria-live="polite">'+scLogHTML()+'</div>';
  h+='<div id="scPanel" class="scpanel">'+scPanelHTML()+'</div>';
  h+='<div class="call-ctrl"><button type="button" class="cc" data-sc-replay aria-label="相手の声をもう一度">'+speakerIcon()+'<span>もう一度</span></button>'+
     '<button type="button" class="cc" data-sc-slow aria-label="ゆっくり再生">'+speakerIcon()+'<span>ゆっくり</span></button>'+
     '<button type="button" class="cc" data-sc-sub aria-pressed="'+S.sub+'"><span class="cc-t">字</span><span>字幕</span></button>'+
     '<button type="button" class="cc" data-sc-tr aria-pressed="'+S.tr+'"><span class="cc-t">訳</span><span>日本語訳</span></button>'+
     '<button type="button" class="cc end" data-sc-end aria-label="通話を終える"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 14.5c5-4.6 13-4.6 18 0l-2.4 2.6-3.4-1.4v-2.4a12 12 0 0 0-6.4 0v2.4L5.4 17z" fill="currentColor"/></svg><span>終了</span></button></div></div>';
  return h;
}
function scLogHTML(){
  var S=SCX,ko=S.lang==='ko'?' ko':'';
  return S.log.map(function(m){
    if(m.who==='them'){
      if(m.typing)return '<div class="bub them typing"><i></i><i></i><i></i></div>';
      return '<div class="bub them'+ko+'">'+(S.sub?'<p>'+esc(m.text)+'</p>':'<p class="dim">♪ 音声のみ(字幕オフ)</p>')+(S.tr&&m.jp?'<small>'+esc(m.jp)+'</small>':'')+'</div>';
    }
    var g=m.grade!==undefined?GRADE_TXT[m.grade]:null;
    return '<div class="bub me'+ko+(m.grade===0?' miss':'')+'">'+(m.typed?'<p>'+esc(m.typed)+'</p>':'')+
      (m.model?'<div class="model"><span class="lbl">お手本</span><p>'+esc(m.model)+'</p>'+(m.r?'<small>'+esc(m.r)+'</small>':'')+'</div>':'')+
      (g?'<span class="gtag g'+m.grade+'">'+g[0]+' '+g[1]+'</span>':'')+'</div>';
  }).join('');
}
function scPanelHTML(){
  var S=SCX;
  if(S.stage==='ring')return '<p class="ring-note">相手を呼び出しています…</p>';
  if(S.stage==='talk')return '<p class="ring-note">相手が話しています…</p>';
  if(S.stage==='end')return '<p class="ring-note">通話を終了しています…</p>';
  var t=S.u.turns[S.idx],step='<span class="lbl">あなたの番 ・ '+(S.idx+1)+'/'+S.u.turns.length+'</span>';
  var task='<div class="task"><span class="task-k">こう伝えよう</span><b>'+esc(t.aj)+'</b></div>';
  if(S.stage==='you'){
    if(S.mode==='call')return step+task+'<p class="dim hint">声に出して言ってみよう。言えたらボタンでお手本を確認。</p><button class="go" type="button" data-sc-reveal>言った！ お手本を聞く</button>';
    return step+task+(S.hint?'<p class="hintline">ヒント: '+esc(t.a.split(' ').slice(0,2).join(' '))+' …</p>':'')+
      '<div class="row2"><input id="scIn" class="typebox" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" lang="'+LANGS[S.lang].tts.slice(0,2)+'" placeholder="'+esc(LANGS[S.lang].name)+'で入力(マイク入力もOK)" aria-label="返事を入力"><button class="go" type="button" data-sc-send style="width:auto;margin:0;padding:12px 16px">送信</button></div>'+
      (S.hint?'':'<button class="sq" type="button" data-sc-hint>ヒントを見る</button>');
  }
  if(S.stage==='grade')return step+task+(t.n?'<div class="note"><b>ワンポイント</b>'+esc(t.n)+'</div>':'')+
    '<p class="dim hint">お手本と比べて、自分で採点しよう</p><div class="gbtns"><button type="button" class="gb g2" data-sc-grade="2"><b>◎</b>言えた</button><button type="button" class="gb g1" data-sc-grade="1"><b>△</b>おしい</button><button type="button" class="gb g0" data-sc-grade="0"><b>✕</b>まだ</button></div>';
  if(S.stage==='result'){
    var g=S.grades[S.grades.length-1];
    return step+'<div class="result g'+g+'"><b>'+GRADE_TXT[g][0]+' '+(g===2?'ばっちり！':g===1?'おしい！ほぼ通じるよ':'お手本を確認しよう')+'</b></div>'+(t.n?'<div class="note"><b>ワンポイント</b>'+esc(t.n)+'</div>':'')+
      '<button class="go" type="button" data-sc-next>'+(S.idx+1<S.u.turns.length?'次へ':'通話を終える')+'</button>';
  }
  return '';
}
function scRefresh(){
  if(!SCX||view!=='scene')return;
  var l=$('scLog'),p=$('scPanel'),tm=$('scTimer');
  if(l)l.innerHTML=scLogHTML();if(p)p.innerHTML=scPanelHTML();if(tm&&SCX.t0)tm.textContent=scClock();
  var inp=$('scIn');if(inp)setTimeout(function(){try{inp.focus({preventScroll:true});}catch(e){}},50);
  var last=l&&l.lastElementChild;if(last&&last.scrollIntoView)last.scrollIntoView({block:'nearest',behavior:reduceMotion?'auto':'smooth'});
}
function scBegin(){
  var S=SCX;S.t0=Date.now();S.stage='talk';render();
  clearInterval(S.timer);S.timer=setInterval(function(){var tm=$('scTimer');if(!SCX||view!=='scene'){clearInterval(S.timer);return;}if(tm)tm.textContent=scClock();},1000);
  tone(660,0.12,'sine',0.05,0);tone(880,0.16,'sine',0.05,0.12);
  scTurn();
}
function scSay(text,slow){speak(text,LANGS[SCX.lang].tts,slow,true);}
function scTurn(){
  var S=SCX,t=S.u.turns[S.idx];
  if(t.p){
    S.stage='talk';var m={who:'them',text:t.p,jp:t.pj,typing:true};S.log.push(m);scRefresh();
    setTimeout(function(){if(SCX!==S)return;m.typing=false;S.stage='you';S.hint=false;scRefresh();scSay(t.p);},reduceMotion?150:850);
  }else{S.stage='you';S.hint=false;scRefresh();}
}
function scReveal(){
  var S=SCX,t=S.u.turns[S.idx];
  S.log.push({who:'me',model:t.a,r:t.r});S.stage='grade';scRefresh();scSay(t.a);
}
function scGrade(g){
  var S=SCX;S.grades.push(g);S.log[S.log.length-1].grade=g;
  if(g===2)chimeOK();else if(g===0)chimeBad();
  scNext();
}
function scSend(){
  var S=SCX,inp=$('scIn');if(!inp)return;
  var v=inp.value.trim();if(!v)return;
  var t=S.u.turns[S.idx],sc=simScore(v,t.a),g=sc>=0.85?2:sc>=0.6?1:0;
  S.grades.push(g);S.log.push({who:'me',typed:v,model:g===2?'':t.a,r:g===2?'':t.r,grade:g});S.stage='result';scRefresh();
  if(g===2){chimeOK();fxGood();}else{if(g===0)chimeBad();scSay(t.a);}
}
function scNext(){
  var S=SCX;S.idx++;
  if(S.idx<S.u.turns.length){scTurn();return;}
  S.stage='end';var e=S.u.end;S.log.push({who:'them',text:e[0],jp:e[1]});scRefresh();scSay(e[0]);
  setTimeout(function(){if(SCX===S)sceneFinish();},reduceMotion?600:2600);
}
function sceneFinish(){
  var S=SCX;clearInterval(S.timer);
  var pts=S.grades.reduce(function(a,b){return a+b;},0),max=2*S.u.turns.length,ratio=max?pts/max:0;
  var stars=ratio>=0.9?3:ratio>=0.6?2:1;
  var grade=ratio>=0.9?['完璧な通話','PERFECT CALL','最後までスムーズに話せたね']:ratio>=0.6?['いい感じの通話','GOOD CALL','ほぼ通じてるよ。△のところをもう一回']:['また話してみよう','KEEP TALKING','お手本を聞いて、もう一度チャレンジしよう'];
  var wrong=[];S.u.turns.forEach(function(t,i){if(S.grades[i]<2)wrong.push({t:t.a,jp:t.aj});});
  var L=S.lang,uid=S.uid;SCX=null;document.body.classList.remove('dark-ui');
  completeLesson({L:L,uid:uid,mode:'scene',stars:stars,corr:S.grades.filter(function(g){return g===2;}).length,corrLabel:'◎',grade:grade,wrong:wrong.slice(0,4),wrongTitle:'もう一度言いたいフレーズ',wrongNote:'次はここを意識'});
}
function sceneQuit(){
  if(SCX){clearInterval(SCX.timer);var back=SCX.back;SCX=null;try{speechSynthesis.cancel();}catch(e){}document.body.classList.remove('dark-ui');closeSheet();view=back;render();window.scrollTo(0,0);}
}
