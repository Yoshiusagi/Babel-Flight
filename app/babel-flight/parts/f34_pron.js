/* ================= 発音の細かい分析 (ファースト, standalone site) =================
   The free 発音チェック (f17_cabin.js) says ◎ / ◯ / △ and what was heard. While flying ファースト it becomes an
   instant coach, with the same speech recognition built into the browser (nothing is sent to this site):
   - while speaking, the words the phone hears appear live;
   - right after, the phrase is shown word by word (✓ 言えた / △ おしい / ✕ 聞こえなかった), each word can be played slowly;
   - up to three fixes: what it sounded like, which sound it is (L と R, th, V と B, 語尾の子音, パッチム, 激音・濃音,
     巻き舌の rr, 二重子音 …) and how to say it, each with a slow model to listen to;
   - 発音のクセ: the sounds and words missed most, per language, on this device (babelflight.pron), shown in 復習 and
     given to the AI coach.
   Speech recognition cannot hear intonation or tones, so the analysis is about which sounds came across. */

var PRON_KEY='babelflight.pron';
var PRON_FN=['a','an','the','to','of','in','on','at','for','is','are','am','it','and','or','i','you','be','do','my','your','me',
  'el','la','los','las','un','una','de','del','al','y','en','es','a','il','lo','le','gli','di','e','che','per'];
/* [title, how to say it] */
var PRON_TIPS={
  lr:['L と R','R は舌をどこにもつけずに、奥へ少し丸める。L は舌先を上の歯の裏にしっかりつけてから離す。'],
  th:['th の音','舌先を上下の歯で軽くはさんで、そのすき間から息を出す。「ス」「ズ」「ド」にならないように。'],
  vb:['V と B','V は上の歯を下くちびるに軽く当てて、ふるわせる。B は両くちびるを閉じてから、ぱっと開く。'],
  fh:['F の音','F は上の歯を下くちびるに当てて息を出す。日本語の「フ」より、こすれる音を強く。'],
  sh:['S と SH','S は口を横に引いて「ス」、SH は唇を少し丸めて前に出して「シュ」。'],
  end:['語尾の子音','最後の子音まで言い切ろう。日本語のように後ろに母音(ウ・オ)をつけないのがコツ。'],
  ed:['過去形の -ed','-ed は小さくても消さない。「ト」「ド」「イド」の音を、ほんの少し残そう。'],
  s:['語尾の s','複数形や三単現の s は、最後に「ス」「ズ」を短く足す。消えると意味が変わることも。'],
  vowel:['母音','子音は合っています。アクセントのある母音を、はっきり長めに言ってみよう。'],
  weak:['小さい単語','a / the / to のような小さい単語も消さないで。弱く短く、でも音は残そう。'],
  miss:['抜けた言葉','そこで止まらずに、前の言葉とつなげて言ってみよう。'],
  extra:['よけいな言葉','聞こえた言葉が多すぎます。言い直しや「えー」が入っていないか確かめよう。'],
  batchim:['パッチム(最後の子音)','その文字の最後の子音まで、口の形を保ってしっかり。ㄱ・ㄷ・ㅂ は息を止めるように。'],
  aspir:['激音・濃音','ㅋ ㅌ ㅍ ㅊ は息を強く出す。ㄲ ㄸ ㅃ ㅉ ㅆ は息を出さずに、のどをしめて強く短く。'],
  eo:['ㅓ と ㅗ','ㅓ は口を縦に大きく開けて「オ」。ㅗ は唇を丸めて、とがらせて「オ」。'],
  eu:['ㅡ と ㅜ','ㅡ は唇を横に引いたまま「ウ」。ㅜ は唇を丸めて前に出して「ウ」。'],
  rr:['巻き舌の rr','rr は舌先を上の歯ぐきで何回かふるわせる。r ひとつは1回だけ軽くはじく。'],
  dbl:['二重子音','同じ子音が2つ続く所は、ほんの一瞬止めてから言う(日本語の「ッ」のように)。'],
  sub:['ちがう言葉','ゆっくり1音ずつ言ってから、ふつうの速さに戻そう。']
};

function pronOn(){return typeof fcOn==='function'&&fcOn();}
function pronAll(){var o=typeof fcJson==='function'?fcJson(PRON_KEY):null;return o||{};}

/* ---- tokens: words (characters for Chinese and Japanese) ---- */
var PRON_CHAR={zh:1,ja:1};
function pronKoNorm(s){
  /* ㅐ/ㅔ and ㅒ/ㅖ sound the same in today's Seoul speech: recognition picks either spelling */
  return s.replace(/[가-힣]/g,function(c){
    var k=c.charCodeAt(0)-0xAC00,cho=Math.floor(k/588),jung=Math.floor(k%588/28),jong=k%28;
    if(jung===1)jung=5;else if(jung===3)jung=7;
    return String.fromCharCode(0xAC00+cho*588+jung*28+jong);
  });
}
function pronNorm(s,L){var n=normSay(s,L);return L==='ko'?pronKoNorm(n):n;}
function pronTargetToks(t,L){
  if(PRON_CHAR[L])return Array.from(String(t)).map(function(c){return {o:c,n:pronNorm(c,L)};}).filter(function(x){return x.n&&x.n!==' ';});
  return String(t).split(/\s+/).map(function(w){return {o:w,c:w.replace(/^[¡¿"'“(「]+|[.,!?;:"'”)」。、！？]+$/g,'')||w,n:pronNorm(w,L).replace(/ /g,'')};}).filter(function(x){return x.n;});
}
function pronHeardToks(h,L){
  var n=pronNorm(h,L);if(!n)return [];
  return PRON_CHAR[L]?Array.from(n.replace(/ /g,'')):n.split(' ');
}
function pronLev(a,b){
  a=Array.from(a);b=Array.from(b);
  var p=[];for(var j=0;j<=b.length;j++)p[j]=j;
  for(var i=1;i<=a.length;i++){var c=[i];for(j=1;j<=b.length;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c;}
  return p[b.length];
}
function pronSim(a,b){
  if(a===b)return 1;
  var A=a,B=b;
  if(/[가-힣]/.test(a+b)){A=a.normalize('NFD');B=b.normalize('NFD');}
  var m=Math.max(Array.from(A).length,Array.from(B).length);return m?1-pronLev(A,B)/m:0;
}
/* align the phrase with what was heard: ops {t:index|-1, h:index|-1} */
function pronAlign(T,H){
  var n=T.length,m=H.length,D=[],B=[],i,j;
  for(i=0;i<=n;i++){D[i]=[];B[i]=[];for(j=0;j<=m;j++){
    if(!i&&!j){D[i][j]=0;continue;}
    var best=1e9,how=0;
    if(i&&j){var s=T[i-1].n===H[j-1]?0:1.25-pronSim(T[i-1].n,H[j-1]);if(D[i-1][j-1]+s<best){best=D[i-1][j-1]+s;how=1;}}
    if(i&&D[i-1][j]+1<best){best=D[i-1][j]+1;how=2;}
    if(j&&D[i][j-1]+1<best){best=D[i][j-1]+1;how=3;}
    D[i][j]=best;B[i][j]=how;
  }}
  var ops=[];i=n;j=m;
  while(i||j){var b=B[i][j];if(b===1){ops.push({t:i-1,h:j-1});i--;j--;}else if(b===2){ops.push({t:i-1,h:-1});i--;}else{ops.push({t:-1,h:j-1});j--;}}
  return ops.reverse();
}

/* ---- which sound went wrong ---- */
function pronKoParts(c){var k=c.charCodeAt(0)-0xAC00;if(k<0||k>11171)return null;return [Math.floor(k/588),Math.floor(k%588/28),k%28];}
var KO_CHO='ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
var KO_GRP=['ㄱㄲㅋ','ㄷㄸㅌ','ㅂㅃㅍ','ㅈㅉㅊ','ㅅㅆ'];
function pronTipKo(t,h){
  var a=Array.from(t),b=Array.from(h);
  if(a.length!==b.length)return a.length>b.length&&t.indexOf(h)===0?'end':'sub';
  for(var i=0;i<a.length;i++){
    if(a[i]===b[i])continue;
    var x=pronKoParts(a[i]),y=pronKoParts(b[i]);if(!x||!y)return 'sub';
    if(x[0]===y[0]&&x[1]===y[1])return 'batchim';
    if(x[1]===y[1]&&x[2]===y[2]){var p=KO_CHO[x[0]],q=KO_CHO[y[0]];if(KO_GRP.some(function(g){return g.indexOf(p)>=0&&g.indexOf(q)>=0;}))return 'aspir';}
    if(x[0]===y[0]&&x[2]===y[2]){var v=[x[1],y[1]].sort(function(m,n){return m-n;}).join(',');if(v==='4,8')return 'eo';if(v==='13,18')return 'eu';return 'vowel';}
    return 'sub';
  }
  return 'sub';
}
function pronTip(t,h,L){
  if(L==='ko')return pronTipKo(t,h);
  var r=function(s,a,b){return s.split(a).join(b);};
  if(L==='en'){
    if(r(t,'r','l')===r(h,'r','l'))return 'lr';
    if(t.indexOf('th')>=0&&['s','z','d','t','f','v'].some(function(x){return r(t,'th',x)===h;}))return 'th';
    if(r(t,'v','b')===r(h,'v','b'))return 'vb';
    if(r(t,'f','h')===r(h,'f','h'))return 'fh';
    if(r(t,'sh','s')===r(h,'sh','s'))return 'sh';
    if(/ed$/.test(t)&&(h===t.slice(0,-2)||h===t.slice(0,-1)))return 'ed';
    if(t.length>=4&&/[^s]s$/.test(t)&&h===t.slice(0,-1))return 's';
  }
  if(L==='es'&&r(t,'rr','r')===r(h,'rr','r'))return 'rr';
  if(L==='it'){var d=function(s){return s.replace(/([bcdfglmnpqrstvz])\1/g,'$1');};if(d(t)===d(h))return 'dbl';}
  if(t.length>h.length&&t.indexOf(h)===0&&t.length-h.length<=2&&/[^aeiou]$/.test(t))return 'end';
  if(!PRON_CHAR[L]){var c=function(s){return s.replace(/[aeiouy]/g,'');};if(c(t)&&c(t)===c(h))return 'vowel';}
  return 'sub';
}

/* ---- the analysis ---- */
function pronAnalyze(target,heard,L){
  var T=pronTargetToks(target,L),H=pronHeardToks(heard,L),ops=pronAlign(T,H);
  var st=T.map(function(){return 'miss';}),said=T.map(function(){return '';}),fixes=[],extra=[];
  ops.forEach(function(o){
    if(o.t>=0&&o.h>=0){
      var a=T[o.t].n,b=H[o.h];said[o.t]=b;
      if(a===b){st[o.t]='ok';return;}
      var s=pronSim(a,b);st[o.t]=s>=0.5?'close':'wrong';
      fixes.push({i:o.t,w:T[o.t].c||T[o.t].o,h:b,tip:pronTip(a,b,L),sev:s>=0.5?1:2});
    }else if(o.t>=0){
      fixes.push({i:o.t,w:T[o.t].c||T[o.t].o,h:'',tip:PRON_FN.indexOf(T[o.t].n)>=0?'weak':'miss',sev:PRON_FN.indexOf(T[o.t].n)>=0?1:3});
    }else extra.push(H[o.h]);
  });
  /* a run of missed characters (Chinese, Japanese) is one fix */
  if(PRON_CHAR[L]){
    var merged=[];fixes.forEach(function(f){var p=merged[merged.length-1];if(p&&p.h===''&&f.h===''&&p.i+p.w.length===f.i)p.w+=f.w;else merged.push(f);});fixes=merged;
  }
  if(extra.length&&!fixes.length)fixes.push({i:-1,w:'',h:extra.join(PRON_CHAR[L]?'':' '),tip:'extra',sev:1});
  var ok=st.filter(function(x){return x==='ok';}).length,cl=st.filter(function(x){return x==='close';}).length;
  var score=T.length?Math.round((ok+cl*0.5)/T.length*100-Math.min(15,extra.length*5)):0;
  return {toks:T,st:st,said:said,fixes:fixes,extra:extra,score:Math.max(0,score),heard:heard};
}
function pronBest(target,alts,L){
  var best=null;
  alts.forEach(function(a){var r=pronAnalyze(target,a,L);if(!best||r.score>best.score)best=r;});
  return best;
}

/* ---- 発音のクセ (this device) ---- */
function pronNote(L,res){
  var o=pronAll(),p=o[L]||(o[L]={n:0,g:0,t:{},w:{}});
  p.n++;if(res.score>=90)p.g++;
  res.fixes.forEach(function(f){
    if(f.tip!=='sub'&&f.tip!=='miss'&&f.tip!=='extra')p.t[f.tip]=(p.t[f.tip]||0)+1;
    if(f.w){var k=f.w.replace(/[.,!?¡¿。、!?]/g,'').slice(0,30);if(k)p.w[k]=(p.w[k]||0)+1;}
  });
  var ks=Object.keys(p.w);if(ks.length>60){ks.sort(function(a,b){return p.w[a]-p.w[b];}).slice(0,ks.length-60).forEach(function(k){delete p.w[k];});}
  fcPut(PRON_KEY,o);
}
function pronHabits(L){
  var p=pronAll()[L];if(!p)return null;
  var tips=Object.keys(p.t).sort(function(a,b){return p.t[b]-p.t[a];}).slice(0,3).map(function(k){return [k,p.t[k]];});
  var words=Object.keys(p.w).sort(function(a,b){return p.w[b]-p.w[a];}).filter(function(k){return p.w[k]>=2;}).slice(0,6).map(function(k){return [k,p.w[k]];});
  return {n:p.n,g:p.g,tips:tips,words:words};
}

/* ---- the screen ---- */
var PRX={res:null,target:'',L:''};
function pronTokHTML(r,L){
  var cls=lfc(L)?' '+lfc(L):'',sep=PRON_CHAR[L]?'':' ';
  return '<p class="pa-line'+cls+'" translate="no">'+r.toks.map(function(t,i){
    var s=r.st[i],lab={ok:'言えた',close:'おしい',wrong:'ちがって聞こえた',miss:'聞こえなかった'}[s];
    return s==='ok'?'<span class="pa-w ok">'+esc(t.o)+'</span>':
      '<button type="button" class="pa-w '+s+'" data-pa-say="'+i+'" aria-label="'+esc(t.o)+' ・ '+lab+'(タップでゆっくり聞く)">'+esc(t.o)+'</button>';
  }).join(sep)+'</p>';
}
function pronResHTML(r,L){
  var lv=r.score>=90?['good','◎ ばっちり！','ちゃんと伝わる発音です']:r.score>=60?['ok','◯ おしい！','色のついた所を直せば、もっと伝わる']:['bad','△ もう一度！','ゆっくり、はっきり言ってみよう'];
  var cls=lfc(L)?' '+lfc(L):'',sp=ttsAvail(LANGS[L].tts);
  var h='<div class="pa '+lv[0]+'"><div class="pa-h"><b>'+lv[1]+'</b><span class="pa-sc mono">'+r.score+'<small>点</small></span></div><span class="pa-sub">'+lv[2]+'</span>'+
    '<div class="pa-bar" aria-hidden="true"><i style="width:'+r.score+'%"></i></div>'+pronTokHTML(r,L)+
    '<p class="pa-heard">聞こえた言葉: <q class="'+lfc(L)+'" translate="no">'+esc(r.heard)+'</q></p>';
  var fx=r.fixes.slice().sort(function(a,b){return b.sev-a.sev;}).slice(0,3);
  if(fx.length){
    h+='<ol class="pa-fix">'+fx.map(function(f){
      var tp=PRON_TIPS[f.tip]||PRON_TIPS.sub;
      var what=f.tip==='extra'?'「<span class="'+lfc(L)+'" translate="no">'+esc(f.h)+'</span>」がよけいに聞こえた':
        !f.h?'「<b class="'+lfc(L)+'" translate="no">'+esc(f.w)+'</b>」が聞こえなかった':
        '「<b class="'+lfc(L)+'" translate="no">'+esc(f.w)+'</b>」が「<span class="'+lfc(L)+'" translate="no">'+esc(f.h)+'</span>」に聞こえた';
      return '<li><p class="pa-what">'+what+'</p><p class="pa-tip"><b>'+esc(tp[0])+'</b><span>'+esc(tp[1])+'</span></p>'+
        (f.w&&sp?'<button class="mini pa-slow" type="button" data-pa-word="'+esc(f.w)+'">'+speakerIcon()+'<span>ゆっくり聞く</span></button>':'')+'</li>';
    }).join('')+'</ol>';
  }
  if(r.score<90){
    h+='<div class="pa-model"><span class="lbl">こう言うといいよ</span><p class="'+cls.trim()+'" translate="no">'+esc(PRX.target)+'</p>'+
      '<div class="pa-row">'+(sp?'<button class="ghost sm" type="button" data-pa-model>'+speakerIcon()+' お手本を聞く</button>':'')+
      '<button class="go sm" type="button" data-pron>'+micIcon()+' もう一度</button></div></div>';
  }else h+='<div class="pa-row"><button class="ghost sm" type="button" data-pron>'+micIcon()+' もう一度言う</button></div>';
  return h+'<p class="dim hint">端末の音声認識で、どの音が伝わったかを見ています(イントネーションや声調はまだ見られません)。</p></div>';
}

/* listening with live words */
function pronListen(lang,onLive,done,state){
  var C=srCtor();if(!C){done(null,'unsupported');return;}
  srStop();
  var r=new C(),fin=false,last=[];SRX.rec=r;
  r.lang=lang;r.interimResults=true;r.maxAlternatives=3;r.continuous=false;
  function end(alts,err){if(fin)return;fin=true;if(SRX.rec===r)SRX.rec=null;if(state)state(false);done(alts,err);}
  r.onresult=function(ev){
    var txt='',isFinal=false,alts=[];
    for(var i=0;i<ev.results.length;i++){var res=ev.results[i];txt+=res[0].transcript;if(res.isFinal){isFinal=true;for(var k=0;k<res.length;k++)alts.push(res[k].transcript);}}
    if(isFinal){end(alts.length?alts:[txt],null);return;}
    last=[txt];onLive(txt);
  };
  r.onerror=function(ev){end(null,(ev&&ev.error)||'error');};
  r.onend=function(){end(last[0]?last:null,'no-speech');};
  try{r.start();if(state)state(true);}catch(e){end(null,'error');}
}

(function(){
  var box=pronBoxHTML,run=pronRun;
  pronBoxHTML=function(){
    var h=box.apply(this,arguments);if(!h||!pronOn())return h;
    return h.replace('<span>発音チェック<small>ボタンを押して、言ってみよう</small></span>','<span>発音チェック<em class="pa-badge">FIRST</em><small>言ったすぐあとに、どこをどう直すか教えます</small></span>');
  };
  pronRun=function(btn){
    if(!pronOn())return run.apply(this,arguments);
    if(!F||!F.cur)return;
    if(SRX.rec){srStop();return;}
    var d=dat(F.cur.it),L=F.lang,main=document.querySelector('#sheetHost .pron-go')||btn,label=main.querySelector('span');
    PRX={res:null,target:d.t,L:L};
    pronListen(LANGS[L].tts,function(txt){
      var o=$('pronOut');if(!o)return;
      o.className='pron-out live';
      o.innerHTML='<span class="pa-live-l">聞こえている言葉</span><q class="'+lfc(L)+'" translate="no">'+esc(txt)+'</q>';
    },function(alts,err){
      var o=$('pronOut');if(!o)return;
      if(!alts){o.className='pron-out bad';o.textContent=srErrText(err);return;}
      var r=pronBest(d.t,alts,L);PRX.res=r;pronNote(L,r);
      o.className='pron-out pa-out';o.innerHTML=pronResHTML(r,L);
      if(r.score>=90&&typeof chimeOK==='function')chimeOK();
      try{if(navigator.vibrate&&typeof save==='object'&&save.vib!==false)navigator.vibrate(r.score>=90?[20]:[12,60,12]);}catch(e){}
    },function(on){
      main.classList.toggle('rec',on);
      if(label)label.innerHTML=on?'聞いています…<small>言い終わったら少し待ってね(もう一度押すと止まる)</small>':'発音チェック<em class="pa-badge">FIRST</em><small>言ったすぐあとに、どこをどう直すか教えます</small>';
      if(on){var o=$('pronOut');if(o){o.className='pron-out live';o.innerHTML='<span class="pa-live-l">どうぞ、話してください</span>';}}
    });
  };
  /* 復習: 発音のクセ */
  var rv=reviewHTML;
  reviewHTML=function(){
    var h=rv.apply(this,arguments);if(!pronOn())return h;
    var L=save.lang,p=pronHabits(L);
    var card='<section class="card pa-hab"><div class="card-h"><h2 class="jh">発音のクセ</h2><span class="lbl">FIRST</span></div>';
    if(!p||p.n<3)card+='<p class="dim">レッスンの答えのあとにある「発音チェック」を使うと、あなたのつまずきやすい音がここにたまります('+(p?p.n:0)+' / 3回)。</p>';
    else{
      card+='<p class="dim">これまで'+p.n+'回チェック ・ ◎ '+p.g+'回('+Math.round(p.g/p.n*100)+'%)</p>';
      if(p.tips.length)card+='<ol class="pa-hab-t">'+p.tips.map(function(x){var tp=PRON_TIPS[x[0]];return '<li><b>'+esc(tp[0])+'</b><small>'+x[1]+'回</small><p>'+esc(tp[1])+'</p></li>';}).join('')+'</ol>';
      if(p.words.length)card+='<span class="lbl">言いにくい言葉(タップで聞く)</span><div class="pa-hab-w">'+p.words.map(function(x){return '<button type="button" class="chip '+lfc(L)+'" data-pa-word="'+esc(x[0])+'" translate="no">'+esc(x[0])+' <small>×'+x[1]+'</small></button>';}).join('')+'</div>';
      if(!p.tips.length&&!p.words.length)card+='<p>今のところ、目立つクセはありません。この調子！</p>';
    }
    card+='</section>';
    var at=h.indexOf('<section class="card report"');
    return at>=0?h.slice(0,at)+card+h.slice(at):h+card;
  };
  /* the AI coach hears about it too */
  if(typeof coachStats==='function'){
    var cs=coachStats;
    coachStats=function(L){
      var s=cs.apply(this,arguments),p=pronHabits(L);
      if(p&&p.n>=3)s+='\n発音チェック: '+p.n+'回(◎ '+Math.round(p.g/p.n*100)+'%)'+(p.tips.length?' ・ つまずきやすい音: '+p.tips.map(function(x){return PRON_TIPS[x[0]][0]+' '+x[1]+'回';}).join('、'):'');
      return s.slice(0,2500);
    };
  }
})();
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('[data-pa-say],[data-pa-word],[data-pa-model]');if(!t)return;
  var L=PRX.L||save.lang,code=LANGS[L]&&LANGS[L].tts;if(!code)return;
  if(t.hasAttribute('data-pa-model')){speak(PRX.target,code,true,true);return;}
  if(t.hasAttribute('data-pa-word')){speak(t.getAttribute('data-pa-word'),t.closest('.pa-hab')?LANGS[save.lang].tts:code,true,true);return;}
  var r=PRX.res,i=+t.getAttribute('data-pa-say');if(r&&r.toks[i])speak(r.toks[i].o,code,true,true);
});
