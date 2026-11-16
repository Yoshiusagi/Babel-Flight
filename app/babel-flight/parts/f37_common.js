/* ================= 全クラス共通の底上げ (every class, website and app) =================
   1. フライト遅延チケット: the streak survives one missed day a week (logic in e4_core.js / e6_land.js; the notes here).
   2. どうしてちがう？: after a wrong answer, one short reason made from the answer itself (no AI).
   3. 単語帳: phrases missed (automatically) and phrases saved with ☆, per language, synced (save.wb).
   4. 単語をさがす: search the learning language's phrases, by the phrase or by its Japanese meaning.
   5. 復習の間隔の自動調整: srsNext() (called from land in e6_land.js) stretches or shortens each phrase's interval
      with how it was answered (fast / slow / with a hint), a per-phrase ease and the days really passed.
   6. 3分クイック: a short lesson that still does the real work (review, weak, new, harder forms). */

/* ---------- 1. フライト遅延チケット ---------- */
function dlyHomeHTML(){
  if(!dlyPending())return '';
  return '<div class="dly-home" role="status"><span aria-hidden="true">🎫</span><span><b>昨日のお休みは、フライト遅延チケットでカバー中</b><small>今日1レッスン飛べば、連続'+(save.streak+1)+'日につながります</small></span></div>';
}
function dlyRecHTML(){
  var free=dlyFree(dayStr()),used=dlyList().filter(function(x){return weekOfDay(x)===weekOfDay(dayStr());})[0];
  return '<p class="dly-rec"><span aria-hidden="true">🎫</span><span><b>フライト遅延チケット</b> ・ '+(free?'今週は1枚あります':'今週は使用済み('+used.slice(5).replace('-','/')+')')+
    '<small>1週間に1枚。1日休んでも、次に飛んだ時に自動で使われて、連続記録が切れません。</small></span></p>';
}

/* ---------- 2. どうしてちがう？ ---------- */
var ARTICLES={a:1,an:1,the:1};
function mwTok(s,L){var n=normAns(String(s||''));if(L==='ko'||L==='zh'||L==='ja'||L==='ar'||L==='ru')n=normLoose(s);return n?n.split(' '):[];}
function mwLev(a,b){
  var p=[],i,j;for(j=0;j<=b.length;j++)p[j]=j;
  for(i=1;i<=a.length;i++){var c=[i];for(j=1;j<=b.length;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c;}
  return p[b.length];
}
/* the first difference between what was given and the answer: {kind, g, c} */
function mwDiff(given,right){
  var n=given.length,m=right.length,D=[],i,j;
  for(i=0;i<=n;i++){D[i]=[];for(j=0;j<=m;j++)D[i][j]=i&&j?0:i+j;}
  for(i=1;i<=n;i++)for(j=1;j<=m;j++)D[i][j]=Math.min(D[i-1][j]+1,D[i][j-1]+1,D[i-1][j-1]+(given[i-1]===right[j-1]?0:1));
  var ops=[];i=n;j=m;
  while(i||j){
    if(i&&j&&given[i-1]===right[j-1]&&D[i][j]===D[i-1][j-1]){i--;j--;continue;}
    if(i&&j&&D[i][j]===D[i-1][j-1]+1){ops.unshift({kind:'sub',g:given[i-1],c:right[j-1]});i--;j--;continue;}
    if(j&&D[i][j]===D[i][j-1]+1){ops.unshift({kind:'miss',c:right[j-1]});j--;continue;}
    ops.unshift({kind:'extra',g:given[i-1]});i--;
  }
  return ops;
}
function mwWordWhy(op,L){
  var g=op.g,c=op.c,en=L==='en';
  /* uiF: the sentence in the display language, the words of the course left as they are */
  if(op.kind==='miss')return en&&ARTICLES[c]?uiF('「{0}」が抜けています。英語では、数えられる名詞の前に a / an / the が必要なことが多いです。',[c]):uiF('「{0}」が抜けています。',[c]);
  if(op.kind==='extra')return uiF('「{0}」は要りません。',[g]);
  if(en){
    if((g==='a'&&c==='an')||(g==='an'&&c==='a'))return T('次の言葉が母音の「音」で始まるときは an、それ以外は a です。');
    if(ARTICLES[g]&&ARTICLES[c])return uiF('「{0}」ではなく「{1}」。a / an は「どれか1つ」、the は「その(決まった)」ものに使います。',[g,c]);
    if(c===g+'s'||c===g+'es')return uiF('「{0}」の s を忘れずに。複数のものや、he / she / it が主語の現在形には s がつきます。',[c]);
    if(g===c+'s'||g===c+'es')return uiF('「{0}」には s がつきません(1つのもの、または I / you / we / they が主語)。',[c]);
    if(/ed$/.test(c)&&(g===c.replace(/e?d$/,'')||g+'d'===c||g+'ed'===c))return uiF('「{0}」と過去形にします(もう終わったこと)。',[c]);
    if(/ing$/.test(c)&&c.indexOf(g.replace(/e$/,''))===0)return uiF('「{0}」と -ing の形にします。',[c]);
  }
  if(mwLev(g,c)<=Math.max(1,Math.floor(c.length/4)))return uiF('つづりが少しちがいます:「{0}」→「{1}」',[g,c]);
  return uiF('「{0}」ではなく「{1}」です。',[g,c]);
}
function missWhy(q,d,L){
  var k=q.k,pick=F.pick,given=F.given;
  if((k==='t2j'||k==='listenjp'||k==='j2t'||k==='listen')&&pick>=0&&pick!==F.ci){
    var field=(k==='t2j'||k==='listenjp')?'jp':'t',p=F.opts[pick],other=null;
    langPool(L).some(function(x){if(x[field]===p&&x.t!==d.t){other=x;return true;}return false;});
    if(!other)return '';
    var a=mwTok(d.t,L),b=mwTok(other.t,L),key='';
    for(var i=0;i<a.length;i++)if(b.indexOf(a[i])<0&&a[i].length>key.length)key=a[i];
    if(key.length<3&&L!=='ko'&&L!=='zh'&&L!=='ja')key='';
    var w='<b class="'+lfc(L)+'" translate="no">'+esc(other.t)+'</b>';
    var s=field==='jp'?uiF('選んだ意味は、{0} のほうです。',[w]):uiF('選んだ {0} は「{1}」という意味です。',[w,esc(T(other.jp))]);
    return s+(key?uiF(' 見分けるポイントは「{0}」。',['<span class="'+lfc(L)+'" translate="no">'+esc(key)+'</span>']):'');
  }
  if(k==='cloze'&&pick>=0&&q.ck){
    var w=q.ck.w,pw=F.opts[pick]||'';
    var same=L==='en'&&(pw.toLowerCase().indexOf(w.toLowerCase().slice(0,Math.max(3,w.length-3)))===0||w.toLowerCase().indexOf(pw.toLowerCase().slice(0,Math.max(3,pw.length-3)))===0);
    return same?uiF('「{0}」と「{1}」は同じ言葉の形ちがい。主語や「いつのことか」に合う形を選ぼう。',[esc(pw),esc(w)]):
      uiF('この文は「{0}」という意味。「{1}」では意味が通じません。',[esc(T(d.jp)),esc(pw)]);
  }
  if((k==='build'||k==='type')&&typeof given==='string'&&given.trim()){
    var g=mwTok(given,L),c=mwTok(k==='build'?bTok(d).join(' '):d.t,L);
    if(!g.length||!c.length)return '';
    if(g.slice().sort().join(' ')===c.slice().sort().join(' ')){
      for(var j=0;j<c.length;j++)if(g[j]!==c[j])return uiF('言葉はそろっています。語順がちがいます:「{0}」は {1}番目に来ます。',[esc(c[j]),j+1]);
    }
    var ops=mwDiff(g,c).slice(0,2);
    if(!ops.length)return '';
    if(ops.length===2&&ops[0].kind===ops[1].kind&&ops[0].kind!=='sub')return uiF('{0}、ほかにもう1か所ちがいます。',[esc(mwWordWhy(ops[0],L).replace(/[。.]$/,''))]);
    return ops.map(function(o){return esc(mwWordWhy(o,L));}).join(' ');
  }
  return '';
}

/* ---------- 3. 単語帳 ---------- */
var WB_MAX=300;
function wbSaved(L){var w=save.wb&&save.wb[L];return Array.isArray(w)?w:[];}
function wbHas(L,key){return wbSaved(L).indexOf(key)>=0;}
function wbToggle(L,key){
  if(!save.wb||typeof save.wb!=='object')save.wb={};
  var a=wbSaved(L).slice(),i=a.indexOf(key);
  if(i>=0)a.splice(i,1);else{a.unshift(key);if(a.length>WB_MAX)a.length=WB_MAX;}
  save.wb[L]=a;store();return i<0;
}
function wbItem(L,key){var m=/^(.+)\.(\d+)$/.exec(key),u=m&&UNITS[L]&&UNITS[L][m[1]];return u&&u.items[+m[2]]?{uid:m[1],i:+m[2],d:u.items[+m[2]]}:null;}
/* phrases ever missed, most missed first */
function wbMissed(L){
  var out=[];eachItem(L,function(uid,i,r){if((r.m||0)>0)out.push({uid:uid,i:i,m:r.m,done:(r.k||0)>=2});});
  out.sort(function(a,b){return (a.done-b.done)||(b.m-a.m);});
  return out;
}
function wbList(L,tab){
  var seen={},out=[];
  function add(x,src){var k=ik(x.uid,x.i);if(seen[k])return;var w=wbItem(L,k);if(!w)return;seen[k]=1;out.push({key:k,uid:x.uid,i:x.i,d:w.d,src:src,m:x.m||0,done:!!x.done});}
  if(tab!=='miss')wbSaved(L).forEach(function(k){var w=wbItem(L,k);if(w){var r=itemRec(L,w.uid,w.i);add({uid:w.uid,i:w.i,m:r.m||0,done:(r.k||0)>=2},'star');}});
  if(tab!=='star')wbMissed(L).forEach(function(x){add(x,'miss');});
  return out;
}
var WB={tab:'all',mode:'book',q:'',L:'',open:false};
function wbRowHTML(L,x){
  var d=x.d,star=wbHas(L,x.key),sp=ttsAvail(LANGS[L].tts);
  return '<li class="wb-row"><div class="wb-t"><b class="'+lfc(L)+'" translate="no">'+esc(d.t)+'</b>'+(d.r?'<small class="wb-r" translate="no">'+esc(d.r)+'</small>':'')+
    '<span class="wb-jp">'+esc(d.jp)+'</span><small class="wb-src">'+(x.m?'<span class="wb-miss'+(x.done?' done':'')+'">✕'+x.m+(x.done?' ・ 卒業':'')+'</span>':'')+'<span>'+esc(unitTitle(x.uid))+'</span></small></div>'+
    '<div class="wb-b">'+(sp?'<button class="mini" type="button" data-wb-say="'+esc(x.key)+'" aria-label="聞く">'+speakerIcon()+'</button>':'')+
    '<button class="mini wb-star" type="button" data-wb="'+esc(x.key)+'" aria-pressed="'+star+'" aria-label="'+(star?'単語帳から外す':'単語帳に保存')+'">'+(star?'★':'☆')+'</button></div></li>';
}

/* ---------- 4. 単語をさがす ---------- */
var SRCH_IDX={};
var JP_RE=/[぀-ヿ㐀-鿿]/;
function srchIndex(L){
  if(SRCH_IDX[L])return SRCH_IDX[L];
  var out=[],seen={};
  Object.keys(UNITS[L]||{}).forEach(function(uid){
    var u=UNITS[L][uid];if(!u||!Array.isArray(u.items))return;
    u.items.forEach(function(d,i){if(!d||!d.t||seen[d.t])return;seen[d.t]=1;out.push({key:ik(uid,i),uid:uid,i:i,d:d,nt:normLoose(d.t),nr:normLoose(d.r||''),nj:String(d.jp||'')});});
  });
  return (SRCH_IDX[L]=out);
}
function srchRun(L,q){
  q=String(q||'').trim();if(!q)return [];
  var jp=JP_RE.test(q)&&L!=='zh'&&L!=='ja',cjkL=L==='zh'||L==='ja',nq=normLoose(q),res=[];
  srchIndex(L).forEach(function(x){
    var s=0;
    if(jp||cjkL){var j=x.nj.indexOf(q);if(j>=0)s=Math.max(s,x.nj===q?6:j===0?4:2);}
    if(!jp&&nq){
      var t=x.nt,w=t.split(' ');
      if(t===nq)s=Math.max(s,8);else if(w.indexOf(nq)>=0)s=Math.max(s,6);
      else if(t.indexOf(nq)===0)s=Math.max(s,5);else if(w.some(function(y){return y.indexOf(nq)===0;}))s=Math.max(s,4);
      else if(nq.length>=2&&t.indexOf(nq)>=0)s=Math.max(s,2);
      if(!s&&x.nr&&nq.length>=2&&x.nr.indexOf(nq)>=0)s=1;
    }
    if(s)res.push({x:x,s:s-Math.min(1.5,x.d.t.length/80)});
  });
  res.sort(function(a,b){return b.s-a.s;});
  return res.slice(0,40).map(function(r){return {key:r.x.key,uid:r.x.uid,i:r.x.i,d:r.x.d,m:itemRec(L,r.x.uid,r.x.i).m||0};});
}

/* ---------- the 単語帳・さがす screen ---------- */
function wordsHTML(){
  var L=WB.L||save.lang,LG=LANGS[L],langs=typeof myLangs==='function'?myLangs():[L];
  var h='<div class="wb"><div class="fl-top"><button class="x" type="button" data-wb-close aria-label="閉じる">'+closeIcon()+'</button><div class="fl-id"><span class="lbl">WORD BOOK ・ '+esc(LG.name)+'</span><b>単語帳・単語をさがす</b></div></div>';
  if(langs.length>1)h+='<div class="wb-langs" role="group" aria-label="言語">'+langs.map(function(k){return '<button type="button" class="chip" data-wb-lang="'+k+'" aria-pressed="'+(k===L)+'">'+esc(LANGS[k].name)+'</button>';}).join('')+'</div>';
  h+='<div class="seg two wb-mode" role="group"><button type="button" data-wb-mode="book" aria-pressed="'+(WB.mode==='book')+'">📒 単語帳</button><button type="button" data-wb-mode="find" aria-pressed="'+(WB.mode==='find')+'">🔍 さがす</button></div>';
  if(WB.mode==='find'){
    h+='<div class="wb-search"><input id="wbQ" type="search" enterkeyhint="search" autocomplete="off" spellcheck="false" placeholder="'+esc(LG.name)+'でも日本語でもOK" aria-label="さがす言葉" value="'+esc(WB.q)+'"></div>';
    h+='<div id="wbRes">'+wbFindHTML(L)+'</div>';
  }else{
    var all=wbList(L,'all'),star=all.filter(function(x){return wbHas(L,x.key);}).length,miss=all.filter(function(x){return x.m>0;}).length,list=wbList(L,WB.tab);
    h+='<div class="seg wb-tabs" role="group"><button type="button" data-wb-tab="all" aria-pressed="'+(WB.tab==='all')+'">すべて '+all.length+'</button><button type="button" data-wb-tab="miss" aria-pressed="'+(WB.tab==='miss')+'">✕ 間違えた '+miss+'</button><button type="button" data-wb-tab="star" aria-pressed="'+(WB.tab==='star')+'">★ 保存 '+star+'</button></div>';
    if(!list.length)h+='<p class="dim wb-empty">'+(WB.tab==='star'?'答えのあとや「さがす」の ☆ を押すと、ここに保存されます。':'間違えたフレーズは、ここに自動でたまります。')+'</p>';
    else{
      h+='<button class="go" type="button" data-wb-practice'+(list.length<2?' disabled':'')+'>この単語帳で練習する<small>'+Math.min(10,list.length)+'問 ・ 間違えた回数が多いものから</small></button>';
      h+='<ul class="wb-list">'+list.slice(0,150).map(function(x){return wbRowHTML(L,x);}).join('')+'</ul>';
      if(list.length>150)h+='<p class="dim hint">ほかに'+(list.length-150)+'フレーズあります(多い順に150まで表示)</p>';
    }
  }
  return h+'</div>';
}
function wbFindHTML(L){
  if(!WB.q.trim())return '<p class="dim wb-empty">'+esc(LANGS[L].name)+'のフレーズを、'+esc(LANGS[L].name)+'でも日本語でも探せます。<br>例: 「'+(L==='en'?'ticket':L==='ko'?'주세요':L==='es'?'agua':L==='it'?'grazie':'ありがとう')+'」「空港」</p>';
  var r=srchRun(L,WB.q);
  if(!r.length)return '<p class="dim wb-empty">「'+esc(WB.q)+'」は、まだアプリのフレーズにありません。<br>ちがう言い方や、短い言葉でも試してみてね。</p>';
  return '<p class="dim hint">'+r.length+(r.length>=40?'件以上':'件')+'</p><ul class="wb-list">'+r.map(function(x){return wbRowHTML(L,x);}).join('')+'</ul>';
}
function wordsOpen(){WB.L=save.lang;WB.open=true;view='words';render();window.scrollTo(0,0);}
function wbPractice(){
  var L=WB.L||save.lang,list=wbList(L,WB.tab).slice();
  list.sort(function(a,b){return (a.done-b.done)||(b.m-a.m);});
  var items=list.slice(0,10).map(function(x){return {uid:x.uid,i:x.i};});
  if(items.length<2)return;
  if(L!==save.lang){save.lang=L;store();}
  startFlight({mode:'wb',lang:L,items:items});
}

/* ---------- 5. 復習の間隔の自動調整 ---------- */
/* fast / slow from the time to the first answer of a phrase in this flight (kept by the judge hook below) */
function srsSpeed(t){
  if(!t)return 2;
  if(t.hint)return 0;
  var long=t.k==='build'||t.k==='type',fast=long?2500+120*t.len:3500,slow=long?8000+400*t.len:12000;
  return t.ms<=fast?3:t.ms>=slow?1:2;
}
function srsNext(rec,w,now,t){
  var e=typeof rec.e==='number'?rec.e:2.5,iv=typeof rec.iv==='number'?rec.iv:(INTERVALS[rec.b]||0),due=rec.b===0||rec.d<=now,set=false;
  if(w===0){
    if(rec.b===0){rec.b=1;iv=1;set=true;}
    else if(due){
      var q=srsSpeed(t),past=Math.max(0,(now-(rec.d-iv*DAY))/DAY);
      e=Math.max(1.3,Math.min(3,e+(q===3?0.1:q===1?-0.15:q===0?-0.2:0)));
      var base=Math.max(iv,past*0.9);
      iv=rec.b===1?(q>=2?3:2):base*e*(q===1?0.8:q===0?0.6:1);
      rec.b=Math.min(6,rec.b+1);set=true;
    }
    if(rec.m)rec.k=(rec.k||0)+1;
  }else{
    e=Math.max(1.3,e-0.2);rec.b=Math.max(1,rec.b-1);iv=0.5;rec.m=(rec.m||0)+w;rec.k=0;set=true;
  }
  if(set){
    if(iv>=1&&typeof hasWeak==='function'&&hasWeak('vocab'))iv=Math.max(1,iv*0.6);
    iv=Math.min(180,iv);
    if(iv>=3)iv*=0.92+Math.random()*0.16;
    rec.iv=Math.round(iv*100)/100;rec.e=Math.round(e*100)/100;rec.d=now+rec.iv*DAY;
  }
  return rec;
}

/* ---------- 6. 3分クイック ---------- */
var QUICK_N=8;
function quickItems(L){
  var seen={},out=[];
  function add(x,tag){var k=ik(x.uid,x.i);if(seen[k]||out.length>=QUICK_N)return;var u=UNITS[L][x.uid];if(!u||!u.items[x.i])return;seen[k]=1;out.push({uid:x.uid,i:x.i,tag:tag});}
  dueList(L).slice(0,3).forEach(function(x){add(x,'review');});
  weakList(L).slice(0,2).forEach(function(x){add(x,'weak');});
  var nx=nextPathUnit(L),u=nx&&UNITS[L][nx];
  if(u&&Array.isArray(u.items)&&u.kind!=='scene'){var n=0;u.items.forEach(function(d,i){if(n<2&&itemRec(L,nx,i).b===0){add({uid:nx,i:i},'new');n++;}});}
  shuffle(learnedList(L)).forEach(function(x){add(x,'hard');});
  if(out.length<4&&u&&Array.isArray(u.items)&&u.kind!=='scene')u.items.forEach(function(d,i){add({uid:nx,i:i},'new');});
  return out;
}
function quickStart(){
  var L=save.lang,items=quickItems(L);
  if(items.length<3)return;
  QUICK.items=items;
  startFlight({mode:'quick',lang:L,items:items.map(function(x){return {uid:x.uid,i:x.i};})});
}
var QUICK={items:null};

/* ---------- hooks ---------- */
(function(){
  MODE_TITLE.quick='3分クイック';MODE_TITLE.wb='単語帳';
  var sf=startFlight;
  startFlight=function(opts){
    var r=sf.apply(this,arguments);
    if(F&&opts.mode==='quick'&&QUICK.items){
      var kinds=['listen','j2t','build','type','cloze','listenjp'],q=[];
      QUICK.items.forEach(function(x,n){
        var it={uid:x.uid,i:x.i};
        if(x.tag==='new'){q.push({k:'learn',it:it,w:0});q.push({k:firstOK(['j2t','listen'],it),it:it,w:1});return;}
        var list=x.tag==='weak'?['type','build','j2t']:kinds.slice(n%kinds.length).concat(kinds.slice(0,n%kinds.length));
        var k=firstOK(list,it);if(k==='cloze'&&!clozeKey(dat(it)))k=firstOK(['build','j2t'],it);
        q.push({k:k,it:it,w:1});
      });
      F.queue=q;F.wTotal=0;q.forEach(function(x){F.wTotal+=x.w;});
      var ph=$('phr');if(ph)ph.textContent='FL000 ・ 1/'+q.length+'問';
      QUICK.items=null;
    }
    if(F)F.rt={};
    return r;
  };
  /* what was picked or written, for どうしてちがう？ */
  var oo=onOption;onOption=function(i){if(F&&!F.answered)F.pick=i;return oo.apply(this,arguments);};
  var oc=onCheck;onCheck=function(){
    if(F&&!F.answered&&F.cur){
      if(F.cur.k==='build'&&F.build)F.given=F.build.placed.map(function(ti){return F.build.tokens[ti];}).join(' ');
      else if(F.cur.k==='type'){var a=$('ans');F.given=a?a.value:'';}
    }
    return oc.apply(this,arguments);
  };
  var jd=judge;
  judge=function(ok){
    if(!F||F.answered)return jd.apply(this,arguments);
    var q=F.cur,d=dat(q.it),key=ik(q.it.uid,q.it.i),L=F.lang;
    if(F.rt&&!F.rt[key]&&!q.retry)F.rt[key]={ms:performance.now()-(F.shownAt||0),hint:F.hl>0||!!F.peeked||!!q.nh,k:q.k,len:d.t.length};
    var r=jd.apply(this,arguments);
    var sh=document.querySelector('#sheetHost .sheet-in');
    if(sh){
      if(!ok){var why=missWhy(q,d,L),ans=sh.querySelector('.ans');if(why&&ans)ans.insertAdjacentHTML('afterend','<div class="why-miss"><b>どうしてちがう？</b><p>'+why+'</p></div>');}
      var row=sh.querySelector('.row2'),star=wbHas(L,key);
      if(row&&row.querySelector('[data-hear]'))row.querySelector('[data-hear]').insertAdjacentHTML('afterend','<button class="sq wb-star" type="button" data-wb="'+esc(key)+'" aria-pressed="'+star+'" aria-label="'+(star?'単語帳から外す':'単語帳に保存')+'">'+(star?'★':'☆')+'</button>');
    }
    F.pick=-1;F.given=null;
    return r;
  };
  var rd=render;
  render=function(){
    if(view==='words'){
      $('tabs').hidden=true;var main=$('main');main.innerHTML=wordsHTML();
      main.classList.remove('enter','enter-l','enter-r');void main.offsetWidth;main.classList.add('enter');
      document.body.classList.remove('dark-ui');PREVVIEW=view;
      var q=$('wbQ');if(q&&WB.focus){WB.focus=false;q.focus();try{q.setSelectionRange(q.value.length,q.value.length);}catch(e){}}
      return;
    }
    return rd.apply(this,arguments);
  };
  var hh=homeHTML;
  homeHTML=function(){
    var h=hh.apply(this,arguments),add=dlyHomeHTML();
    var L=save.lang,can=pathIds(L).length&&quickItems(L).length>=3;
    if(can)add+='<button class="quick-go" type="button" data-quick><span class="qk-ic" aria-hidden="true">⚡</span><span><b>3分クイック</b><small>復習・苦手・新しいフレーズを少しずつ。短いけど本気の8問</small></span></button>';
    if(!add)return h;
    var ms=typeof modeSwitch==='function'?modeSwitch():'',i=ms?h.indexOf(ms):-1;
    if(i>=0)return h.slice(0,i+ms.length)+add+h.slice(i+ms.length);
    i=h.indexOf('</header>');return i>=0?h.slice(0,i+9)+add+h.slice(i+9):add+h;
  };
  var rv=reviewHTML;
  reviewHTML=function(){
    var h=rv.apply(this,arguments),L=save.lang,n=wbList(L,'all').length;
    var card='<section class="card wb-card"><div class="wb-entry"><button type="button" data-words="book"><span aria-hidden="true">📒</span><b>単語帳</b><small>'+n+'フレーズ ・ 間違えた・保存した</small></button>'+
      '<button type="button" data-words="find"><span aria-hidden="true">🔍</span><b>単語をさがす</b><small>'+esc(LANGS[L].name)+'でも日本語でも</small></button></div></section>';
    var at=h.indexOf('<section class="card mode"');
    h=at>=0?h.slice(0,at)+card+h.slice(at):h+card;
    return h.replace('正解が続くと復習までの間隔が1→2→4→8→16→32日と伸び、間違えると短くなります。',
      '正解が続くと復習までの間隔がだいたい1→3→7→16→35日…と伸び、間違えると短くなります。すぐに正解できたフレーズは間隔を長めに、時間がかかったりヒントを使ったフレーズは短めに、一つずつ自動で調整しています。');
  };
  var rc=recordHTML;
  recordHTML=function(){
    var h=rc.apply(this,arguments),at=h.indexOf('<section class="card" style="--lc');
    return at>=0?h.slice(0,at)+dlyRecHTML()+h.slice(at):h;
  };
})();
function wbRefresh(){if(view==='words'){var y=window.scrollY;render();window.scrollTo(0,y);}}
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  var a=function(n){return t.hasAttribute(n);},g=function(n){return t.getAttribute(n);};
  if(a('data-quick')){quickStart();return;}
  if(a('data-words')){WB.mode=g('data-words')==='find'?'find':'book';WB.focus=WB.mode==='find';wordsOpen();return;}
  if(a('data-wb-close')){go('review');return;}
  if(a('data-wb-mode')){WB.mode=g('data-wb-mode');WB.focus=WB.mode==='find';wbRefresh();return;}
  if(a('data-wb-tab')){WB.tab=g('data-wb-tab');wbRefresh();return;}
  if(a('data-wb-lang')){WB.L=g('data-wb-lang');wbRefresh();return;}
  if(a('data-wb-practice')){wbPractice();return;}
  if(a('data-wb-say')){var w=wbItem(WB.L||save.lang,g('data-wb-say'));if(w)speak(w.d.t,LANGS[WB.L||save.lang].tts,false,true);return;}
  if(a('data-wb')){
    var L=view==='flight'&&F?F.lang:(WB.L||save.lang),on=wbToggle(L,g('data-wb'));
    t.setAttribute('aria-pressed',String(on));t.textContent=on?'★':'☆';t.setAttribute('aria-label',on?'単語帳から外す':'単語帳に保存');
    if(typeof buzz==='function')buzz(10);
    return;
  }
});
document.addEventListener('input',function(e){
  var t=e.target;if(!t||t.id!=='wbQ')return;
  WB.q=t.value;clearTimeout(WB.tm);
  WB.tm=setTimeout(function(){var r=$('wbRes');if(r)r.innerHTML=wbFindHTML(WB.L||save.lang);},120);
});
