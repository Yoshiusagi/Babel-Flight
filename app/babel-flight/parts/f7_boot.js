/* ================= EVENTS + BOOT ================= */
function go(v){view=v;confirmReset=false;render();window.scrollTo(0,0);}
document.addEventListener('click',function(e){
  var t=e.target.closest('button');
  if(e.target.closest('#cine')&&cineDone){cineSkip();return;}
  if(!t)return;
  audio();
  if(!t.hasAttribute('data-opt')&&!t.hasAttribute('data-tile'))tapTick();
  var a=function(n){return t.hasAttribute(n);},g=function(n){return t.getAttribute(n);};
  if(a('data-cine-skip')){cineSkip();return;}
  /* navigation */
  if(a('data-tab')){if(g('data-tab')==='home'&&view!=='home')HOME_ANIM='tab';go(g('data-tab'));return;}
  if(a('data-lang')){if(save.lang!==g('data-lang')){save.lang=g('data-lang');HOME_ANIM='lang';store();render();}return;}
  if(a('data-mode-set')){if(save.mode!==g('data-mode-set')){save.mode=g('data-mode-set');HOME_ANIM='mode';store();render();}return;}
  if(a('data-node')){openNodeSheet(g('data-node'));return;}
  if(a('data-close-sheet')){closeSheet();return;}
  if(a('data-go')){closeSheet();startUnitFlight(g('data-go'));return;}
  if(a('data-scene')){startScene(g('data-scene'),g('data-scmode'));return;}
  if(a('data-mode')){startMode(g('data-mode'));return;}
  if(a('data-fly-next')){startUnitFlight(g('data-fly-next'));return;}
  if(a('data-next-lesson')){var nu=g('data-next-lesson'),wait=pendingFly&&!reduceMotion?2300:250;go('home');setTimeout(function(){if(view==='home')openNodeSheet(nu);},wait);return;}
  if(a('data-home')){go('home');return;}
  /* profession picker */
  if(a('data-picker')){pickerBack=(view==='record'?'record':'home');go('picker');return;}
  if(a('data-picker-close')){go(pickerBack);return;}
  if(a('data-pick')){save.prof=g('data-pick');if(save.prof&&pickerBack==='home')save.mode='job';store();go(pickerBack);return;}
  /* profile icon */
  if(a('data-icon-open')){openIconSheet();return;}
  if(a('data-icon-set')){save.icon=g('data-icon-set');store();closeSheet();render();return;}
  /* settings */
  if(a('data-level')){save.level=g('data-level');store();render();return;}
  if(a('data-goal')){save.goal=parseInt(g('data-goal'),10)||2;store();render();return;}
  if(a('data-theme-set')){save.theme=g('data-theme-set');store();applyTheme();render();return;}
  if(a('data-toggle-sound')){save.sound=!save.sound;store();render();return;}
  if(a('data-toggle-tap')){save.tap=!save.tap;store();render();return;}
  if(a('data-reset')){confirmReset=true;render();return;}
  if(a('data-reset-no')){confirmReset=false;render();return;}
  if(a('data-reset-yes')){save=defaults();confirmReset=false;store();applyTheme();obStep=0;obDraft={lang:save.lang,prof:'',level:'mid',goal:2};go('onboard');return;}
  /* onboarding */
  if(a('data-ob-lang')){obDraft.lang=g('data-ob-lang');render();return;}
  if(a('data-ob-prof')){obDraft.prof=g('data-ob-prof');render();return;}
  if(a('data-ob-level')){obDraft.level=g('data-ob-level');render();return;}
  if(a('data-ob-goal')){obDraft.goal=parseInt(g('data-ob-goal'),10);render();return;}
  if(a('data-ob-back')){obStep=Math.max(0,obStep-1);render();window.scrollTo(0,0);return;}
  if(a('data-ob-next')){
    if(obStep<3){obStep++;render();window.scrollTo(0,0);return;}
    save.lang=obDraft.lang;save.prof=obDraft.prof;save.level=obDraft.level;save.goal=obDraft.goal;save.onboarded=true;save.mode='daily';store();go('home');return;
  }
  /* scenes */
  if(SCX){
    if(a('data-sc-replay')||a('data-sc-slow')){var last=null;for(var i=SCX.log.length-1;i>=0;i--)if(SCX.log[i].who==='them'&&!SCX.log[i].typing){last=SCX.log[i].text;break;}if(last)scSay(last,a('data-sc-slow'));return;}
    if(a('data-sc-sub')){SCX.sub=!SCX.sub;t.setAttribute('aria-pressed',SCX.sub);scRefresh();return;}
    if(a('data-sc-tr')){SCX.tr=!SCX.tr;t.setAttribute('aria-pressed',SCX.tr);scRefresh();return;}
    if(a('data-sc-reveal')){scReveal();return;}
    if(a('data-sc-grade')){scGrade(parseInt(g('data-sc-grade'),10));return;}
    if(a('data-sc-send')){scSend();return;}
    if(a('data-sc-next')){scNext();return;}
    if(a('data-sc-hint')){SCX.hint=true;scRefresh();return;}
    if(a('data-sc-end')){
      $('sheetHost').innerHTML='<div class="sheet bad" role="alertdialog" aria-label="通話終了の確認"><div class="sheet-in"><h3>通話を終えますか？</h3><p class="dim" style="font-size:14px">ここまでの記録は保存されません。</p>'+
        '<div class="row2"><button class="ghost" type="button" data-abort-no style="flex:1">続ける</button><button class="ghost danger" type="button" data-sc-quit style="flex:1">終える</button></div></div></div>';
      return;
    }
    if(a('data-sc-quit')){sceneQuit();return;}
  }
  /* ATC roleplay */
  if(a('data-atc')){ATC.sc=null;go('atc');return;}
  if(a('data-atc-sc')){atcStart(parseInt(g('data-atc-sc'),10));return;}
  if(a('data-atc-list')){aiStop();ATC.sc=null;render();window.scrollTo(0,0);return;}
  if(a('data-atc-back')){if(ATC.ctl){try{ATC.ctl.abort();}catch(x){}}ATC.busy=false;if(ATC.sc){ATC.sc=null;render();window.scrollTo(0,0);}else go('review');return;}
  if(a('data-atc-send')){atcSend();return;}
  if(a('data-atc-hint')){ATC.hint=true;var hl=$('atcHint');if(hl){hl.textContent='例: '+ATC.sc.hint;hl.classList.remove('hidden-hint');}t.hidden=true;return;}
  if(a('data-atc-say')){var m=ATC.log[parseInt(g('data-atc-say'),10)];if(m)speak(m.text,'en-US',false,true);return;}
  /* AI ask */
  if(a('data-ai-open')){aiOpen();return;}
  if(a('data-ai-q')){aiAsk(AI_Q[parseInt(g('data-ai-q'),10)]);return;}
  if(a('data-ai-send')){var ai=$('aiIn');if(ai)aiAsk(ai.value.trim());return;}
  if(a('data-abort-no')){closeSheet();return;}
  /* flight */
  if(!F)return;
  if(a('data-hear')||a('data-slow')){if(F.cur){var d=dat(F.cur.it);speak(d.t,LANGS[F.lang].tts,a('data-slow'),true);}return;}
  if(a('data-opt')){onOption(parseInt(g('data-opt'),10));return;}
  if(a('data-check')){onCheck();return;}
  if(a('data-next')){nextStep();return;}
  if(a('data-tile')&&F.build&&!F.answered){
    var ti=parseInt(g('data-tile'),10);
    if(F.build.placed.indexOf(ti)<0){F.build.placed.push(ti);drawBuild();tone(520,0.06,'triangle',0.04,0);}
    return;
  }
  if(a('data-untile')&&F.build&&!F.answered){F.build.placed.splice(parseInt(g('data-untile'),10),1);drawBuild();return;}
  if(a('data-clear')&&F.build&&!F.answered){F.build.placed=[];drawBuild();return;}
  if(a('data-peek')){if(F.cur&&!F.peeked){F.peeked=true;board.set(dat(F.cur.it).t);t.hidden=true;}return;}
  if(a('data-abort')){abortAsk();return;}
  if(a('data-abort-yes')){leaveFlight();return;}
});
document.addEventListener('input',function(e){
  if(e.target&&e.target.id==='pname'){save.name=(e.target.value||'').toUpperCase().slice(0,14)||'PASSENGER';store();}
});
document.addEventListener('keydown',function(e){
  var id=e.target&&e.target.id;
  if(e.key==='Escape'&&cineDone){cineSkip();return;}
  if(e.key==='Enter'&&id==='atcIn'){e.preventDefault();atcSend();return;}
  if(e.key==='Enter'&&id==='aiIn'){e.preventDefault();aiAsk(e.target.value.trim());return;}
  if(e.key==='Enter'&&id==='scIn'){e.preventDefault();scSend();return;}
  if(view!=='flight'||!F||!F.cur||cineDone)return;
  if(document.querySelector('[data-abort-yes]'))return;
  if(id==='aiIn')return;
  var inField=id==='ans';
  if(e.key==='Enter'){
    if(F.answered){e.preventDefault();nextStep();}
    else if(F.cur.k==='type'&&inField){e.preventDefault();onCheck();}
    return;
  }
  if(!F.answered&&!inField&&/^[1-4]$/.test(e.key)&&document.querySelector('.opt')){
    var i=parseInt(e.key,10)-1;if(i<F.opts.length)onOption(i);
  }
});
document.addEventListener('visibilitychange',function(){if(document.hidden){try{speechSynthesis.cancel();}catch(e){}}});
var rsT=0;window.addEventListener('resize',function(){clearTimeout(rsT);rsT=setTimeout(function(){if(view==='home')mapMount();},200);});

applyTheme();
initSky();
if(!save.onboarded){view='onboard';obStep=0;obDraft={lang:save.lang,prof:save.prof,level:save.level,goal:save.goal};}
render();
initCloud();
initAI();
})();
</script>
