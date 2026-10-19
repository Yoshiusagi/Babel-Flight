/* ================= AI (ask why + ATC roleplay) ================= */
var AI={sample:null,ok:false,checked:false,ctl:null};
function initAI(){
  if(!window.claude||typeof claude.use!=='function'){AI.checked=true;return;}
  claude.use('sample').then(function(s){AI.sample=s;AI.ok=!!s;AI.checked=true;if(view==='review')render();})
    .catch(function(){AI.checked=true;if(view==='review')render();});
}
function aiErr(code){
  if(['not_granted','sampling_disabled','not_declared','capability_disabled','capability_removed'].indexOf(code)>=0){AI.ok=false;return 'AI機能が許可されていないため使えません。';}
  if(code==='rate_limited')return '少し時間をおいてから、もう一度試してね。';
  if(code==='session_expired')return 'もう一度サインインしてから試してね。';
  if(code==='refused')return 'この質問には答えられませんでした。聞き方を変えてみてね。';
  if(code==='invalid_json')return '返答をうまく読み取れませんでした。もう一度送ってみてね。';
  return 'うまく答えを受け取れませんでした。もう一度試してね。';
}
function aiStop(){if(AI.ctl){try{AI.ctl.abort();}catch(e){}AI.ctl=null;}}
function aiBtnHTML(){return AI.ok?'<div id="aiBox" class="aibox"><button class="sq ai" type="button" data-ai-open>AIに「なぜ？」を質問する</button></div>':'';}
var AI_Q=['なぜこの形になるの？','似た言い方を教えて','発音のコツは？','どんな場面で使う？'];
function aiOpen(){
  var box=$('aiBox');if(!box)return;
  box.innerHTML='<span class="lbl">AIに質問</span><div class="chips">'+AI_Q.map(function(q,i){return '<button class="chip" type="button" data-ai-q="'+i+'">'+q+'</button>';}).join('')+'</div>'+
    '<div class="row2"><input id="aiIn" class="typebox sm" type="text" placeholder="自由に質問してもOK" aria-label="AIへの質問" autocomplete="off"><button class="sq" type="button" data-ai-send>送信</button></div>'+
    '<div id="aiOut" class="aiout" aria-live="polite"></div>';
}
function aiAsk(q){
  if(!AI.sample||!F||!F.cur||!q)return;
  var d=dat(F.cur.it),LG=LANGS[F.lang],out=$('aiOut');if(!out)return;
  aiStop();
  var prompt='あなたは、日本の中学生にもわかるように説明するのが得意な語学の先生です。\n'+
    '学習中の言語: '+LG.name+'\nフレーズ: '+d.t+'\n日本語の意味: '+d.jp+(d.r?'\n読み(カタカナ): '+d.r:'')+(d.n?'\nアプリのワンポイント解説: '+d.n:'')+
    '\n\n生徒の質問: '+q+
    '\n\n答え方: 日本語で、理由まで納得できるように説明してください。300字程度。見出しやMarkdownの記号(#や*)は使わず、短い段落で書いてください。最後に「例:」として似た例文を1つ(原文と日本語訳)添えてください。確かでないことは断定しないでください。';
  out.textContent='考え中…';out.classList.add('wait');
  var ctl=new AbortController();AI.ctl=ctl;
  AI.sample(prompt,{modelTier:'quick',signal:ctl.signal,onText:function(u){out.classList.remove('wait');out.textContent=u.text;}})
    .then(function(r){out.classList.remove('wait');if(r.truncated)out.textContent+='\n(途中までの回答です)';})
    .catch(function(e){
      out.classList.remove('wait');
      if(e&&e.code==='cancelled')return;
      out.textContent=(e&&e.text?e.text+'\n\n':'')+aiErr(e&&e.code);
    });
}

/* ---- ATC roleplay ---- */
var ATC_SC=[
 {id:'taxi',fac:'TOKYO GROUND',jp:'地上走行の許可をもらう',sub:'Tokyo Ground ・ 駐機場から滑走路へ',
  sit:'羽田空港の駐機場(スポット12)にいます。出発の準備ができたので、Tokyo Groundに地上走行の許可をもらおう。',
  en:'The aircraft is parked at spot 12 at Tokyo Haneda and ready for departure. The pilot must call you and request taxi. Give a taxi clearance to runway 34R, check the readback, then tell the pilot to contact Tokyo Tower on 124.35 when holding short.',
  first:'',hint:'Tokyo Ground, Babel 201, spot 12, request taxi.'},
 {id:'takeoff',fac:'TOKYO TOWER',jp:'離陸の許可をもらう',sub:'Tokyo Tower ・ 滑走路34R',
  sit:'滑走路34Rの手前で待機中です。管制塔の指示を正しく復唱して、離陸しよう。',
  en:'The aircraft is holding short of runway 34R at Tokyo Haneda. You have already told the pilot to line up and wait. Next, issue the takeoff clearance with the wind, check the readback, and after takeoff tell the pilot to contact Tokyo Departure on 126.0.',
  first:'Babel 201, Tokyo Tower, runway 34R, line up and wait.',hint:'Line up and wait, runway 34R, Babel 201.'},
 {id:'landing',fac:'TOKYO TOWER',jp:'着陸の許可をもらう',sub:'Tokyo Tower ・ 最終進入',
  sit:'羽田空港の滑走路34Lに向けて最終進入中(約8マイル手前)。管制塔に連絡して着陸の許可をもらおう。',
  en:'The aircraft is on final approach to runway 34L at Tokyo Haneda, about 8 miles out, and has just switched to your frequency. The pilot must check in. Give a landing clearance with the wind, check the readback, and after landing tell the pilot to vacate the runway and contact Tokyo Ground on 121.7.',
  first:'',hint:'Tokyo Tower, Babel 201, ILS runway 34L, 8 miles final.'},
 {id:'emergency',fac:'TOKYO DEPARTURE',jp:'緊急事態を宣言する',sub:'Tokyo Departure ・ エンジン故障',
  sit:'離陸して上昇中(高度5000フィート)に、エンジン1基が止まった！管制に緊急事態を宣言して、羽田に戻る許可をもらおう。',
  en:'Shortly after departure from Tokyo Haneda, climbing through 5000 feet, the aircraft has an engine failure. The pilot should declare an emergency (MAYDAY) and request to return. Acknowledge, ask for persons on board and fuel endurance, and give a heading and altitude for an approach to runway 34L.',
  first:'',hint:'Mayday, mayday, mayday, Tokyo Departure, Babel 201, engine failure, request return to Haneda.'}
];
var ATC={sc:null,turns:[],log:[],busy:false,ctl:null,done:false,hint:false};
function atcRules(sc){
  return 'You are role-playing an air traffic controller for a pilot-training app. The learner is a Japanese junior high school student who dreams of becoming an airline pilot. Use standard ICAO radiotelephony phraseology in English. This is a training simulation only.\n'+
    'Airport: Tokyo Haneda (RJTT). Your station: '+sc.fac+'. The pilot\'s callsign is "Babel 201".\nScenario: '+sc.en+'\n'+
    (sc.first?'You have already transmitted: "'+sc.first+'"\n':'')+
    'After each pilot transmission, reply with ONLY one JSON object and no other text, in this shape:\n'+
    '{"atc":"your next radio transmission in English, short and realistic. Use an empty string only when the scenario is finished.","score":3,"feedback_ja":"1-2 short sentences in easy Japanese for the student: what was good and what to fix, such as the callsign, the readback of runway, altitude or frequency, or missing words.","better":"a model version of the pilot\'s last transmission in English","done":false}\n'+
    'score: 3 = correct and complete, 2 = understandable with small mistakes, 1 = important items missing, 0 = not usable.\n'+
    'Keep the scenario to about 4 pilot transmissions, then finish with done true and a short friendly sign-off in "atc". If the pilot writes in Japanese or seems confused, kindly explain in feedback_ja what to say and repeat your previous transmission in "atc".';
}
function atcStart(i){
  var sc=ATC_SC[i];
  aiStop();ATC={sc:sc,turns:[],log:[],busy:false,ctl:null,done:false,hint:false};
  if(sc.first)ATC.log.push({who:'atc',text:sc.first});
  view='atc';render();window.scrollTo(0,0);
  if(sc.first)speak(sc.first,'en-US',false,true);
}
function atcLogHTML(){
  return ATC.log.map(function(m,i){
    if(m.who==='atc')return '<div class="radio"><span class="lbl">'+ATC.sc.fac+'</span><p>'+esc(m.text)+'</p><button class="mini" type="button" data-atc-say="'+i+'" aria-label="もう一度聞く">'+speakerIcon()+'</button></div>';
    var fb='';
    if(m.err)fb='<div class="fb warn">'+esc(m.err)+'</div>';
    else if(m.score!==undefined)fb='<div class="fb"><span class="fstars" aria-label="評価 '+m.score+' / 3">'+'★★★'.slice(0,m.score)+'<em>'+'★★★'.slice(m.score)+'</em></span>'+esc(m.fb||'')+(m.better?'<div class="better"><span class="lbl">お手本</span>'+esc(m.better)+'</div>':'')+'</div>';
    else if(m.wait)fb='<div class="fb dim">管制官が応答中…</div>';
    return '<div class="me"><span class="lbl">BABEL 201(あなた)</span><p>'+esc(m.text)+'</p></div>'+fb;
  }).join('');
}
function atcHTML(){
  var h='<div class="fl-top"><button class="x" type="button" data-atc-back aria-label="戻る">'+closeIcon()+'</button><div class="fl-id"><span class="lbl">AI管制官 ・ 英語</span><b>'+(ATC.sc?esc(ATC.sc.jp):'シナリオを選ぼう')+'</b></div></div>';
  if(!ATC.sc){
    h+='<p class="dim lead">あなたは「Babel 201」便のパイロット。管制官役のAIと英語で交信しよう。返答ごとに採点とお手本が出ます。</p><div class="opt-list">'+
      ATC_SC.map(function(s,i){return '<button class="choice" type="button" data-atc-sc="'+i+'"><b>'+esc(s.jp)+'</b><small>'+esc(s.sub)+'</small></button>';}).join('')+'</div>'+
      '<p class="dim hint">AIが答えるたびに、Claudeの利用枠を少し使います。はじめての時は許可の確認が出ます。</p>';
    return h;
  }
  h+='<div class="card sit"><span class="lbl">状況</span><p>'+esc(ATC.sc.sit)+'</p><p class="mono" style="font-size:12.5px;margin-top:6px">コールサイン: Babel 201</p></div>';
  h+='<div id="atcLog" class="atclog">'+atcLogHTML()+'</div>';
  if(ATC.done){
    h+='<div class="card" style="text-align:center"><b>交信終了。おつかれさま！</b><div class="row2" style="margin-top:10px"><button class="ghost" type="button" data-atc-sc="'+ATC_SC.indexOf(ATC.sc)+'" style="flex:1">もう一度</button><button class="ghost" type="button" data-atc-list style="flex:1">別のシナリオ</button></div></div>';
  }else{
    h+='<div class="atc-in"><div id="atcHint" class="hintline'+(ATC.hint?'':' hidden-hint')+'">'+(ATC.hint?'例: '+esc(ATC.sc.hint):'')+'</div>'+
      '<div class="row2"><input id="atcIn" class="typebox" type="text" placeholder="英語で返答(例: Roger, ...)" aria-label="管制官への返答" autocomplete="off" autocapitalize="none" spellcheck="false" lang="en"><button class="go" type="button" data-atc-send style="width:auto;margin:0;padding:12px 16px">送信</button></div>'+
      (ATC.log.length<=1?'<button class="sq" type="button" data-atc-hint>最初の言い方のヒント</button>':'')+'</div>';
  }
  return h+'<div class="pad-b"></div>';
}
function atcRefresh(){var l=$('atcLog');if(l)l.innerHTML=atcLogHTML();window.scrollTo(0,document.body.scrollHeight);}
function atcSend(){
  var inp=$('atcIn');if(!inp||ATC.busy||ATC.done||!AI.sample)return;
  var text=inp.value.trim();if(!text)return;
  inp.value='';ATC.busy=true;
  var me={who:'me',text:text,wait:true};ATC.log.push(me);atcRefresh();
  var userMsg=(ATC.turns.length?'':atcRules(ATC.sc)+'\n\n')+'Pilot transmission: "'+text+'"';
  var turns=ATC.turns.concat([{role:'user',content:userMsg}]);
  var ctl=new AbortController();ATC.ctl=ctl;
  AI.sample.json(turns,{cache:false,modelTier:'default',effort:'low',signal:ctl.signal}).then(function(r){
    ATC.busy=false;me.wait=false;
    if(!r||typeof r!=='object'){me.err='返答をうまく読み取れませんでした。もう一度送ってみてね。';atcRefresh();return;}
    var sc=parseInt(r.score,10);me.score=isNaN(sc)?0:clamp(sc,0,3);me.fb=String(r.feedback_ja||'');me.better=String(r.better||'');
    ATC.turns=turns.concat([{role:'assistant',content:JSON.stringify(r)}]);
    if(ATC.turns.length>24)ATC.turns=[ATC.turns[0]].concat(ATC.turns.slice(-21));
    var atc=String(r.atc||'').trim();
    if(atc){ATC.log.push({who:'atc',text:atc});speak(atc,'en-US',false,true);}
    if(r.done===true){ATC.done=true;render();window.scrollTo(0,document.body.scrollHeight);}
    else atcRefresh();
    if(me.score>=3)chimeOK();
  }).catch(function(e){
    ATC.busy=false;me.wait=false;
    if(e&&e.code==='cancelled')return;
    me.err=aiErr(e&&e.code);atcRefresh();
    if(!AI.ok){view='review';render();}
  });
}
