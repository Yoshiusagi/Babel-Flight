/* ================= 雑音の中で聞き取る (every class, free: made on the device) =================
   Real places are never quiet. With 記録 → 学習の設定 → 雑音 on, a background sound plays under every voice in a
   lesson, a conversation, the route and the job day: 機内 (engine rumble), 空港 (a big hall), 無線 (radio hiss and
   crackle), カフェ (chatter-like murmur and cups). Made with Web Audio from noise (no files, no server, no cost).
   「ゆっくり」 replays stay clean on purpose: that is the help button. The choice is kept on this device. */

var NZ_LS='babelflight.noise';
var NZ_KINDS=[['off','オフ'],['cabin','✈️ 機内'],['airport','🧳 空港'],['radio','📻 無線'],['cafe','☕ カフェ']];
var NZ={node:null,gain:null,until:0,timer:0,kind:''};
function nzKind(){var k=lsGet(NZ_LS)||'off';return NZ_KINDS.some(function(x){return x[0]===k;})?k:'off';}
function nzWhere(){return view==='flight'||view==='scene'||view==='route'||view==='atc';}
/* one long noise buffer per kind, shaped by filters */
function nzBuffer(ctx,kind){
  var len=ctx.sampleRate*4,b=ctx.createBuffer(1,len,ctx.sampleRate),d=b.getChannelData(0),last=0,i;
  if(kind==='cabin'||kind==='airport'){for(i=0;i<len;i++){last=(last+0.02*(Math.random()*2-1))/1.02;d[i]=last*3.5;}} /* brown */
  else{for(i=0;i<len;i++)d[i]=Math.random()*2-1;}
  if(kind==='radio'){for(i=0;i<len;i++)if(Math.random()<0.00025){for(var j=0;j<60&&i+j<len;j++)d[i+j]+=(Math.random()*2-1)*1.6;}} /* crackle */
  if(kind==='cafe'){ /* a few cup clinks */
    for(var c=0;c<3;c++){var at=Math.floor(Math.random()*(len-8000)),f=2600+Math.random()*1800;
      for(i=0;i<6000;i++)d[at+i]+=Math.sin(2*Math.PI*f*i/ctx.sampleRate)*Math.exp(-i/900)*0.9;}
  }
  return b;
}
var NZ_BUF={};
function nzStart(sec){
  var kind=nzKind();if(kind==='off'||!nzWhere())return;
  var ctx=audio();if(!ctx)return;
  var now=ctx.currentTime,end=now+sec+0.6;
  NZ.until=Math.max(NZ.until,end);
  if(!NZ.node||NZ.kind!==kind){
    nzStop(true);
    try{
      var src=ctx.createBufferSource();src.buffer=NZ_BUF[kind]||(NZ_BUF[kind]=nzBuffer(ctx,kind));src.loop=true;
      var f=ctx.createBiquadFilter(),g=ctx.createGain();
      if(kind==='cabin'){f.type='lowpass';f.frequency.value=420;}
      else if(kind==='airport'){f.type='lowpass';f.frequency.value=1100;}
      else if(kind==='radio'){f.type='bandpass';f.frequency.value=1800;f.Q.value=0.7;}
      else{f.type='bandpass';f.frequency.value=900;f.Q.value=0.5;}
      src.connect(f);f.connect(g);g.connect(ctx.destination);
      g.gain.setValueAtTime(0.0001,now);
      src.start(now);NZ.node=src;NZ.gain=g;NZ.kind=kind;
    }catch(e){NZ.node=null;return;}
  }
  var lv={cabin:0.4,airport:0.3,radio:0.09,cafe:0.12}[kind]||0.2;
  try{NZ.gain.gain.cancelScheduledValues(now);NZ.gain.gain.setValueAtTime(Math.max(0.0001,NZ.gain.gain.value),now);NZ.gain.gain.linearRampToValueAtTime(lv,now+0.25);}catch(e){}
  clearTimeout(NZ.timer);
  NZ.timer=setTimeout(nzFade,Math.max(0,(NZ.until-now)*1000));
}
function nzFade(){
  var ctx=audio();if(!ctx||!NZ.gain)return;
  if(ctx.currentTime<NZ.until-0.05){clearTimeout(NZ.timer);NZ.timer=setTimeout(nzFade,(NZ.until-ctx.currentTime)*1000);return;}
  var t=ctx.currentTime;try{NZ.gain.gain.cancelScheduledValues(t);NZ.gain.gain.setValueAtTime(NZ.gain.gain.value,t);NZ.gain.gain.linearRampToValueAtTime(0.0001,t+0.5);}catch(e){}
  NZ.timer=setTimeout(function(){nzStop(true);},700);
}
function nzStop(now){
  clearTimeout(NZ.timer);
  if(NZ.node){try{NZ.node.stop();}catch(e){}try{NZ.node.disconnect();}catch(e){}}
  NZ.node=null;NZ.gain=null;NZ.kind='';if(now)NZ.until=0;
}
/* how long a line takes to say (rough: the voice reads about 13 letters a second, slower for CJK) */
function nzLen(text,slow){
  var s=String(text||''),cjk=(s.match(/[぀-ヿ㐀-鿿가-힯]/g)||[]).length;
  return ((s.length-cjk)/13+cjk/6.5)/(slow?0.6:0.9)*0.9+0.5;
}
function nzSetHTML(){
  var k=nzKind();
  return '<div class="set-block nz-set"><span class="lbl">雑音の中で聞き取る</span>'+seg('data-nz',k,NZ_KINDS)+
    '<small class="dim">'+(k==='off'?'レッスンや会話の音声に、本物の場所の音を重ねます。聞き取りに慣れたら試してみてね。':'レッスン・会話の音声に「'+NZ_KINDS.filter(function(x){return x[0]===k;})[0][1]+'」の音が重なります。「ゆっくり」の再生には重ねません。')+'</small>'+
    (k!=='off'?'<button class="ghost sm nz-try" type="button" data-nz-try>試しに聞く</button>':'')+'</div>';
}
(function(){
  var sp=speak;
  speak=function(text,code,slow,force){
    if(!slow&&(force||save.sound)&&tts.ok)nzStart(nzLen(text,slow));
    return sp.apply(this,arguments);
  };
  var rp=recPlay;
  recPlay=function(bufs,alive,done){
    try{nzStart(recLen(bufs));}catch(e){}
    return rp.apply(this,arguments);
  };
  var rh=recordHTML;
  recordHTML=function(){
    var h=rh.apply(this,arguments),at=h.indexOf('<div class="set-row"><span>タップ音</span>');
    return at>=0?h.slice(0,at)+nzSetHTML()+h.slice(at):h;
  };
  /* leaving a lesson stops the sound at once */
  var r0=render;
  render=function(){var r=r0.apply(this,arguments);if(NZ.node&&!nzWhere())nzStop(true);return r;};
})();
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  if(t.hasAttribute('data-nz')){lsSet(NZ_LS,t.getAttribute('data-nz'));nzStop(true);var y=window.scrollY;render();window.scrollTo(0,y);return;}
  if(t.hasAttribute('data-nz-try')){
    var line='Ladies and gentlemen, we will be landing shortly. Please return to your seat.';
    var v0=view;view='flight';nzStart(nzLen(line));view=v0;
    if(typeof recWake==='function')recWake();
    speak(line,'en-US',false,true);
  }
});
