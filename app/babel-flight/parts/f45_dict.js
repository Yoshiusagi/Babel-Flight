/* ================= 英和辞典 (単語をさがす: 英語 × 日本語の表示, every class, free) =================
   For English with the Japanese display, 単語をさがす is a real English-Japanese dictionary, not only the app's phrases:
   - ejdict-hand (くじらはんど, Public Domain / CC0): about 47,000 words and phrases;
   - いまの英語 (written for this app): slang, SNS and chat, new words and new meanings, aviation English, K-POP …,
     each with labels (スラング, ⚠ 注意 …), an example with its translation, and a note;
   - the app's own phrases that use the word (what 単語をさがす showed before);
   - not found, or more questions: 「AIにくわしくきく」 (the same AI, sign-in and daily count as AIに質問).
   Data: public/dict/en/ (meta.json; m.json = いまの英語; w/<first 2 letters>.json = ejdict rows [word, meaning, rank];
   j/<n>.json = 日本語 → 英語 {h:[words], g:{gloss in hiragana:[index]}}), built by the generator described in README.
   Loaded on demand; public/sw.js keeps every file looked up (cache bf-off-dict), so a word looked up once also works
   offline, and オフライン完全版 can download the whole dictionary. ☆ saves 'd:<word>' in save.wb.en (synced like the
   rest of the 単語帳). Other languages and display languages: the phrase search as before. */
var DICT={meta:null,metaP:null,m:null,mP:null,w:{},wP:{},j:{},jP:{},ent:{},res:{},resOrder:[]};
var DICT_TAG=[['rude','⚠ 注意'],['slang','スラング'],['sns','SNS・チャット'],['avi','✈ 航空'],['kpop','K-POP'],['game','ゲーム'],['tech','IT・ネット'],
  ['fit','運動・筋トレ'],['beauty','美容'],['sport','スポーツ'],['school','学校'],['travel','旅行'],['food','食べ物'],['money','お金・買い物'],['music','音楽・映像'],
  ['bike','自転車'],['biz','仕事'],['eco','環境'],['feel','気持ち'],['talk','会話'],['idiom','決まった言い方'],['new','新しい言葉'],['mean','新しい意味']];
var DICT_LB={'話':'話し言葉','米':'アメリカ','英':'イギリス','古':'古い言い方','文':'書き言葉','俗':'俗語','詩':'詩の言葉','まれ':'まれ','方':'方言','卑':'下品','廃':'今は使わない'};
function dictOn(L){return L==='en'&&typeof UI!=='undefined'&&UI==='ja';}
function dNorm(s){return String(s||'').toLowerCase().replace(/[^a-z0-9]/g,'');}
function dKey(s){var n=dNorm(s);return !n?'':n.length>1?n.slice(0,2):n+'_';}
function dHira(s){return String(s||'').replace(/[ァ-ヶ]/g,function(c){return String.fromCharCode(c.charCodeAt(0)-0x60);});}
function dGet(p){return fetch(bfSiteUrl('/dict/en/'+p),{cache:'no-cache'}).then(function(r){if(!r.ok)throw new Error('http');return r.json();});}
function dMeta(){
  if(DICT.meta)return Promise.resolve(DICT.meta);
  return DICT.metaP||(DICT.metaP=dGet('meta.json').then(function(x){DICT.meta=x;return x;},function(e){DICT.metaP=null;throw e;}));
}
/* いまの英語: [[word, [[品詞, 意味, tags, 例文, 訳, メモ], …]], …] */
function dMod(){
  if(DICT.m)return Promise.resolve(DICT.m);
  return DICT.mP||(DICT.mP=dGet('m.json').then(function(x){
    var by={},e=Array.isArray(x&&x.e)?x.e:[];
    e.forEach(function(m){m.n=dNorm(m[0]);m.lw=m[0].toLowerCase();m.j=m[1].map(function(s){return dHira(s[1]);});by[m.lw]=m;});
    DICT.mi=by;DICT.m=e;return e;
  },function(err){DICT.mP=null;throw err;}));
}
function dChunk(k){
  if(!k)return Promise.resolve([]);
  if(DICT.w[k])return Promise.resolve(DICT.w[k]);
  return DICT.wP[k]||(DICT.wP[k]=dMeta().then(function(m){
    if((m.w||[]).indexOf(k)<0)return (DICT.w[k]=[]);
    return dGet('w/'+k+'.json').then(function(rows){rows.forEach(function(r){r.n=dNorm(r[0]);});return (DICT.w[k]=rows);});
  }).then(function(x){DICT.wP[k]=null;return x;},function(e){DICT.wP[k]=null;throw e;}));
}
function dJ(n){
  if(DICT.j[n])return Promise.resolve(DICT.j[n]);
  return DICT.jP[n]||(DICT.jP[n]=dGet('j/'+n+'.json').then(function(x){DICT.jP[n]=null;return (DICT.j[n]=x);},function(e){DICT.jP[n]=null;throw e;}));
}
/* one card per spelling (ignoring capitals): いまの英語 + the dictionary's meanings */
function dCard(h){return {h:h,d:[],m:null,r:0,s:-1e9};}
function dAddRow(e,r){if(e.d.indexOf(r[1])<0)e.d.push(r[1]);e.r=Math.max(e.r,r[2]||0);if(e.h!==r[0]&&r[0]===r[0].toLowerCase())e.h=r[0];}
function dKeep(e){DICT.ent[e.h.toLowerCase()]=e;return e;}
function dExact(h){
  var lw=String(h||'').toLowerCase();
  if(DICT.ent[lw]&&DICT.ent[lw].full)return Promise.resolve(DICT.ent[lw]);
  return Promise.all([dMod(),dChunk(dKey(h))]).then(function(a){
    var e=null,m=DICT.mi[lw];
    if(m){e=dCard(m[0]);e.m=m[1];}
    a[1].forEach(function(r){if(r[0].toLowerCase()===lw){if(!e)e=dCard(r[0]);dAddRow(e,r);}});
    if(e){e.full=true;dKeep(e);}
    return e;
  });
}
/* running → run, studied → study, cities → city … (a few rules; went, saw … are words of their own in the dictionary) */
function dStems(w){
  var c=[],C='([b-df-hj-np-tv-z])\\1';
  function add(x){if(x&&x.length>=2&&x!==w&&c.indexOf(x)<0)c.push(x);}
  if(/ies$/.test(w)||/ied$/.test(w))add(w.slice(0,-3)+'y');
  if(/(ier|iest)$/.test(w))add(w.replace(/(ier|iest)$/,'y'));
  if(/ying$/.test(w))add(w.slice(0,-4)+'ie');
  if(new RegExp(C+'(ed|ing|er|est)$').test(w))add(w.replace(new RegExp('([b-df-hj-np-tv-z])\\1(ed|ing|er|est)$'),'$1'));
  if(/ing$/.test(w)){add(w.slice(0,-3));add(w.slice(0,-3)+'e');}
  if(/ed$/.test(w)){add(w.slice(0,-2));add(w.slice(0,-1));}
  if(/(ches|shes|sses|xes|zes|oes)$/.test(w))add(w.slice(0,-2));
  if(/s$/.test(w)&&!/ss$/.test(w))add(w.slice(0,-1));
  if(/est$/.test(w)){add(w.slice(0,-3));add(w.slice(0,-2));}
  if(/er$/.test(w)){add(w.slice(0,-2));add(w.slice(0,-1));}
  if(/ily$/.test(w))add(w.slice(0,-3)+'y');
  if(/ly$/.test(w))add(w.slice(0,-2));
  return c;
}
function dFirst(list){
  var i=0;
  function next(){if(i>=list.length)return Promise.resolve(null);var w=list[i++];return dExact(w).then(function(e){return e||next();});}
  return next();
}
/* spelling suggestions: words of the same first 2 letters (and いまの英語) at most 1-2 letters away */
function dSuggest(nq,rows){
  var max=nq.length<=4?1:2,out=[];
  /* edits, a swap of two neighbours counting as one (recieve → receive) */
  function lev(a,b){
    var d=[],i,j;for(i=0;i<=a.length;i++){d[i]=[i];}for(j=0;j<=b.length;j++)d[0][j]=j;
    for(i=1;i<=a.length;i++)for(j=1;j<=b.length;j++){
      d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
      if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1])d[i][j]=Math.min(d[i][j],d[i-2][j-2]+1);
    }
    return d[a.length][b.length];
  }
  (DICT.m||[]).forEach(function(m){if(Math.abs(m.n.length-nq.length)<=max){var d=lev(m.n,nq);if(d<=max)out.push({h:m[0],d:d,r:3});}});
  rows.forEach(function(r){if(Math.abs(r.n.length-nq.length)<=max&&!/[ -]/.test(r[0])){var d=lev(r.n,nq);if(d<=max)out.push({h:r[0],d:d,r:r[2]||0});}});
  out.sort(function(a,b){return (a.d-b.d)||(b.r-a.r)||(a.h.length-b.h.length);});
  var seen={},res=[];out.forEach(function(x){var k=x.h.toLowerCase();if(!seen[k]&&res.length<5){seen[k]=1;res.push(x.h);}});
  return res;
}
function dSearchEn(q){
  var nq=dNorm(q),ql=String(q).trim().toLowerCase();
  if(!nq)return Promise.resolve({list:[]});
  return Promise.all([dMod(),dChunk(dKey(nq))]).then(function(a){
    var by={},list=[];
    function card(h){var k=h.toLowerCase(),e=by[k];if(!e){e=by[k]=dCard(h);list.push(e);}return e;}
    a[0].forEach(function(m){
      var s=-1;
      if(m.n===nq)s=100;else if(m.n.indexOf(nq)===0)s=62-m.n.length/10;
      else if(ql.length>=3&&(' '+m.lw).indexOf(' '+ql)>=0)s=40;
      if(s>=0){var e=card(m[0]);e.m=m[1];e.s=Math.max(e.s,s+5);}
    });
    a[1].forEach(function(r){
      var s=-1;
      if(r.n===nq)s=100+(r[2]||0);
      else if(r.n.indexOf(nq)===0)s=50+(r[2]||0)*6-r.n.length/4-(/[ -]/.test(r[0])?3:0)-(/^[A-Z]/.test(r[0])?2:0);
      if(s>=0){var e=card(r[0]);dAddRow(e,r);e.s=Math.max(e.s,s);}
    });
    list.sort(function(x,y){return y.s-x.s;});
    var more=list.length>40;list=list.slice(0,40);
    list.forEach(function(e){if(dNorm(e.h)===nq)e.full=true;dKeep(e);});
    var exact=!!(list[0]&&list[0].s>=100),st=/^[a-z]{3,}$/.test(nq)?dStems(nq):[];
    /* studied: the word itself (わざとらしい) and, right after it, study; running → run when running is not a word of its own */
    if(!st.length||(exact&&!/(s|ed|ing|er|est|ly)$/.test(nq)))return {list:list,more:more,sugg:list.length?[]:dSuggest(nq,a[1])};
    return dFirst(st).then(function(b){
      if(b){list=list.filter(function(e){return e.h.toLowerCase()!==b.h.toLowerCase();});list.splice(exact?1:0,0,b);}
      return {list:list,more:more,base:b?b.h:'',sugg:list.length?[]:dSuggest(nq,a[1])};
    });
  });
}
function dSearchJa(q){
  var qq=dHira(String(q).replace(/[\s　]+/g,''));
  if(!qq)return Promise.resolve({list:[]});
  return Promise.all([dMod(),dMeta()]).then(function(a){
    return dJ(qq.charCodeAt(0)%(a[1].nb||64)).then(function(J){
      var mods=[];
      a[0].forEach(function(m){
        var best=-1;
        m.j.forEach(function(mean){
          mean.split(/[、,，・\/()(（）)「」]/).forEach(function(seg){seg=seg.trim();if(!seg)return;var s=seg===qq?3:seg.indexOf(qq)===0?2:seg.indexOf(qq)>=0?1:-1;if(s>best)best=s;});
        });
        if(best>=0)mods.push({m:m,s:best});
      });
      mods.sort(function(x,y){return (y.s-x.s)||(x.m[0].length-y.m[0].length);});
      var heads=[],seen={};
      function push(h){var k=h.toLowerCase();if(seen[k])return;seen[k]=1;heads.push(h);}
      (J.g[qq]||[]).forEach(function(i){push(J.h[i]);});
      Object.keys(J.g).filter(function(k){return k!==qq&&k.indexOf(qq)===0;}).sort(function(x,y){return x.length-y.length;})
        .forEach(function(k){if(heads.length<30)J.g[k].slice(0,4).forEach(function(i){push(J.h[i]);});});
      return Promise.all(heads.slice(0,30).map(function(h){return dExact(h).catch(function(){return null;});})).then(function(es){
        var list=[],got={};
        mods.slice(0,12).forEach(function(x){var e=DICT.ent[x.m.lw];if(!e||!e.full){e=dCard(x.m[0]);e.m=x.m[1];dKeep(e);}got[x.m.lw]=1;list.push(e);});
        es.forEach(function(e){if(e&&!got[e.h.toLowerCase()]){got[e.h.toLowerCase()]=1;list.push(e);}});
        return {list:list,ja:true};
      });
    });
  });
}
function dSearch(q){return JP_RE.test(q)?dSearchJa(q):dSearchEn(q);}

/* ---- how it looks ---- */
function dPlain(d,n){
  var out=[];
  String(d||'').split(' / ').some(function(s){
    if(/^=/.test(s))return false;
    s=s.replace(/〈[CU]〉/g,'').replace(/《[^》]*》/g,'').replace(/[『』]/g,'').trim();
    if(s)out.push(s);
    return out.join(' / ').length>n;
  });
  var t=out.join(' / ');return t.length>n+8?t.slice(0,n)+'…':t;
}
function dShort(e){return e.m?e.m.map(function(s){return s[1];}).join(' / '):e.d.length?dPlain(e.d.join(' / '),56):'';}
function dTagList(tags){
  var have=' '+(tags||'')+' ',out=[];
  DICT_TAG.forEach(function(t){if(have.indexOf(' '+t[0]+' ')>=0)out.push(t);});
  return out;
}
function dTagsHTML(e,max){
  if(!e.m)return '';
  var all=[];e.m.forEach(function(s){dTagList(s[2]).forEach(function(t){if(all.indexOf(t)<0)all.push(t);});});
  var main=all.filter(function(t){return t[0]!=='new'&&t[0]!=='mean';}).slice(0,max||2);
  if(!main.length)main=[['now','いまの英語']];
  return '<span class="dict-tags">'+main.map(function(t){return '<i class="dict-tag t-'+t[0]+'">'+esc(t[1])+'</i>';}).join('')+'</span>';
}
function dStarHTML(h){
  var key='d:'+h,on=wbHas('en',key);
  return '<button class="mini wb-star" type="button" data-wb="'+esc(key)+'" aria-pressed="'+on+'" aria-label="'+(on?'単語帳から外す':'単語帳に保存')+'">'+(on?'★':'☆')+'</button>';
}
function dSayHTML(t,label){return ttsAvail(LANGS.en.tts)?'<button class="mini" type="button" data-dict-say="'+esc(t)+'" aria-label="'+(label||'聞く')+'">'+speakerIcon()+'</button>':'';}
function dRowHTML(e){
  var s=dShort(e);
  return '<li class="wb-row dict-row"><button type="button" class="dict-open" data-dict="'+esc(e.h)+'"><b translate="no" lang="en">'+esc(e.h)+'</b>'+dTagsHTML(e)+
    '<span class="wb-jp'+(s?'':' dim')+'">'+esc(s||'…')+'</span></button><div class="wb-b">'+dSayHTML(e.h)+dStarHTML(e.h)+'</div></li>';
}
function dCreditHTML(){return '<p class="dict-credit">英和辞書データ: ejdict-hand(くじらはんど・パブリックドメイン) ・ いまの英語: Babel Flight オリジナル</p>';}
function dAiHTML(w,mean){
  return '<div class="dict-ai" data-w="'+esc(w)+'" data-m="'+esc(mean||'')+'"><button class="ghost sm" type="button" data-dict-ai>🤖 AIにくわしくきく</button>'+
    '<div class="aiout" aria-live="polite"></div></div>';
}
function dIntroHTML(){
  var n=DICT.m?DICT.m.length:0;
  if(!DICT.m)dMod().then(function(){var x=$('dictN');if(x)x.textContent=DICT.m.length.toLocaleString();}).catch(function(){});
  var ex=[['rizz','スラング'],['airport',''],['no cap',''],['roger','✈'],['空港',''],['すごい','']];
  return '<div class="dict-intro"><p class="dict-what"><b>英和辞典</b>英語でも日本語でも引けます</p><ul>'+
    '<li><span aria-hidden="true">📘</span><span>約47,000語の英和辞書</span></li>'+
    '<li><span aria-hidden="true">🆕</span><span>いまの英語 <b id="dictN">'+(n?n.toLocaleString():'1,000以上')+'</b>語(スラング・SNS・新しい言葉・航空英語・K-POPなど)</span></li>'+
    '<li><span aria-hidden="true">🤖</span><span>見つからない言葉は、AIにきけます</span></li></ul>'+
    '<p class="dict-try"><span>ためしに</span>'+ex.map(function(x){return '<button class="chip" type="button" data-dict-q="'+esc(x[0])+'">'+esc(x[0])+'</button>';}).join('')+'</p></div>';
}
function dAppHTML(q,title){
  var ap=srchRun('en',q).slice(0,5);
  return ap.length?'<h3 class="dict-h">'+title+'</h3><ul class="wb-list">'+ap.map(function(x){return wbRowHTML('en',x);}).join('')+'</ul>':'';
}
function dResHTML(q,r){
  var h='';
  if(r.base)h+='<p class="dict-base">「<span translate="no">'+esc(q.trim())+'</span>」は <b translate="no">'+esc(r.base)+'</b> の形が変わったものかも。</p>';
  if(!r.list.length){
    h+='<p class="dim wb-empty">「'+esc(q.trim())+'」は、辞書にありませんでした。</p>';
    if(r.sugg&&r.sugg.length)h+='<p class="dict-sugg"><span>もしかして</span>'+r.sugg.map(function(s){return '<button class="chip" type="button" data-dict-q="'+esc(s)+'" translate="no">'+esc(s)+'</button>';}).join('')+'</p>';
    return h+dAiHTML(q.trim(),'')+dAppHTML(q,'アプリのレッスンのフレーズ')+dCreditHTML();
  }
  h+='<ul class="wb-list dict-list">'+r.list.map(dRowHTML).join('')+'</ul>';
  if(r.more)h+='<p class="dim hint">ほかにもあります。もう少し入力すると、しぼりこめます。</p>';
  return h+dAppHTML(q,'アプリのレッスンのフレーズ')+dCreditHTML();
}
/* one sense of ejdict: 『』 = the main meaning, 《》 = labels, 〈C〉〈U〉 = countable or not, =word = the same as word */
function dFmt(s){
  s=String(s).trim();
  if(/^=/.test(s)){var t=s.slice(1).trim();return '<button class="linkish dict-go" type="button" data-dict="'+esc(t)+'" translate="no">'+esc(t)+'</button> と同じ';}
  return esc(s).replace(/〈C〉/g,'<small class="dict-lb">数えられる</small>').replace(/〈U〉/g,'<small class="dict-lb">数えられない</small>')
    .replace(/《([^》]*)》/g,function(_,a){return DICT_LB[a]?'<small class="dict-lb">'+DICT_LB[a]+'</small>':'<small class="dict-gr">'+a+'</small>';})
    .replace(/『([^』]*)』/g,'<b>$1</b>');
}
function dSheetHTML(e){
  var h='<div class="sheet plain dict-sheet" role="dialog" aria-label="英和辞典"><div class="sheet-in"><span class="lbl">DICTIONARY ・ 英和辞典</span>'+
    '<div class="dict-hd"><h3 translate="no" lang="en">'+esc(e.h)+'</h3><div class="wb-b">'+dSayHTML(e.h)+dStarHTML(e.h)+'</div></div>';
  if(e.m){
    h+='<section class="dict-now"><span class="lbl">いまの英語</span><ol class="dict-senses">'+e.m.map(function(s){
      return '<li><p class="dict-m"><small class="dict-pos">'+esc(s[0])+'</small><b>'+esc(s[1])+'</b></p>'+
        (dTagList(s[2]).length?'<span class="dict-tags">'+dTagList(s[2]).map(function(t){return '<i class="dict-tag t-'+t[0]+'">'+esc(t[1])+'</i>';}).join('')+'</span>':'')+
        (s[3]?'<div class="dict-ex"><div><p translate="no" lang="en">'+esc(s[3])+'</p><p class="dim">'+esc(s[4])+'</p></div>'+dSayHTML(s[3],'例文を聞く')+'</div>':'')+
        (s[5]?'<p class="dict-note"><span aria-hidden="true">💡</span>'+esc(s[5])+'</p>':'')+'</li>';
    }).join('')+'</ol></section>';
  }
  if(e.d.length){
    var ss=e.d.join(' / ').split(' / ').filter(function(x){return x.trim();}),top=ss.slice(0,8),rest=ss.slice(8);
    var li=function(x){return '<li>'+dFmt(x)+'</li>';};
    h+='<section class="dict-ej">'+(e.m?'<span class="lbl">辞書</span>':'')+'<ol class="dict-senses ej">'+top.map(li).join('')+'</ol>'+
      (rest.length?'<details class="dict-more"><summary>ほかの意味('+rest.length+')</summary><ol class="dict-senses ej" start="9">'+rest.map(li).join('')+'</ol></details>':'')+'</section>';
  }
  return h+dAppHTML(e.h,'アプリのレッスンでは')+dAiHTML(e.h,dShort(e))+dCreditHTML()+'<button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';
}
function dictSheet(h){
  var host=$('sheetHost');if(!host)return;
  var e=DICT.ent[String(h).toLowerCase()];
  if(e&&e.full){host.innerHTML=dSheetHTML(e);return;}
  host.innerHTML='<div class="sheet plain dict-sheet" role="dialog" aria-label="英和辞典"><div class="sheet-in"><span class="lbl">DICTIONARY ・ 英和辞典</span><h3 translate="no">'+esc(h)+'</h3><p class="dim">さがしています…</p></div></div>';
  dExact(h).then(function(x){
    if(!document.querySelector('#sheetHost .dict-sheet'))return;
    host.innerHTML=x?dSheetHTML(x):'<div class="sheet plain dict-sheet" role="dialog" aria-label="英和辞典"><div class="sheet-in"><span class="lbl">DICTIONARY ・ 英和辞典</span><h3 translate="no">'+esc(h)+'</h3>'+
      '<p class="dim">辞書にありませんでした。</p>'+dAiHTML(h,'')+'<button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';
  },function(){host.innerHTML='<div class="sheet plain dict-sheet" role="dialog" aria-label="英和辞典"><div class="sheet-in"><p class="warn">辞書を読みこめませんでした。電波を確かめて、もう一度試してね。</p><button class="ghost" type="button" data-close-sheet>閉じる</button></div></div>';});
}
/* 「AIにくわしくきく」: through the site's AI (signed in, the daily count of AIに質問), or Claude's own when inside Claude */
function dictAsk(box){
  var w=box.getAttribute('data-w')||'',mean=box.getAttribute('data-m')||'',out=box.querySelector('.aiout'),btn=box.querySelector('[data-dict-ai]');
  if(!w||!out)return;
  var q='英語の「'+w.slice(0,60)+'」の意味と使い方を、例文つきで教えてください。スラングやくだけた言い方なら、どのくらいくだけているかと、使わないほうがいい場面も教えてください。';
  var jp=mean?mean.slice(0,280):'(アプリの辞書にない言葉)';
  if(typeof aiStop==='function')aiStop();
  var ctl=new AbortController();if(typeof AI==='object')AI.ctl=ctl;
  out.textContent='考え中…';out.classList.add('wait');if(btn)btn.disabled=true;
  var done=function(){if(btn)btn.disabled=false;if(typeof AI==='object'&&AI.ctl===ctl)AI.ctl=null;};
  if(typeof SAI==='object'&&SAI.enabled){
    if(!ACCT.me){out.classList.remove('wait');out.textContent='AIにきくのは、ログインすると使えるよ(無料・1日20回まで)。ログインは「記録」画面からできます。';done();return;}
    var acc='';
    var show=function(){out.classList.remove('wait');out.setAttribute('translate','no');out.textContent=acc;};
    saiPost('/api/ai/ask',{lang:'en',ui:'ja',phrase:w.slice(0,300),jp:jp,reading:'',note:'',question:q.slice(0,200)},ctl.signal).then(function(r){
      if(!r.ok)return r.json().catch(function(){return {};}).then(function(j){
        if(j&&j.left)SAI.left=j.left;out.classList.remove('wait');out.textContent=saiErr(j,'ask');
        if(j&&(j.error==='signin'||j.error==='disabled'))saiStatus();
      });
      var n=parseInt(r.headers.get('x-ai-left'),10);if(!isNaN(n)){SAI.left=SAI.left||{ask:0,atc:0};SAI.left.ask=n;}
      if(!r.body||!r.body.getReader)return r.text().then(function(t){acc=t;show();});
      var rd=r.body.getReader(),dec=new TextDecoder();
      var pump=function(){return rd.read().then(function(x){if(x.done){acc+=dec.decode();show();return;}acc+=dec.decode(x.value,{stream:true});if(acc)show();return pump();});};
      return pump().then(function(){if(!acc.trim()){out.removeAttribute('translate');out.textContent=saiErr({error:'upstream'},'ask');}});
    }).catch(function(e){
      if(e&&e.name==='AbortError')return;
      out.classList.remove('wait');out.textContent=acc?acc+'\n\n(途中で通信が切れました)':'通信できませんでした。電波を確認して、もう一度試してね。';
    }).then(done);
    return;
  }
  if(typeof AI==='object'&&AI.sample){
    var prompt='あなたは、日本の中学生にもわかるように説明するのが得意な英語の先生です。\n英語: '+w+'\n辞書の意味: '+jp+'\n\n生徒の質問: '+q+
      '\n\n答え方: 日本語で300字程度。見出しやMarkdownの記号(#や*)は使わず、短い段落で。例文を1つ(英文と日本語訳)。下品な言葉や差別的な言葉なら、意味は簡単に伝え、使わないように注意してください。確かでないことは断定しないでください。';
    AI.sample(prompt,{modelTier:'quick',signal:ctl.signal,onText:function(u){out.classList.remove('wait');out.textContent=u.text;}})
      .then(function(){out.classList.remove('wait');},function(e){out.classList.remove('wait');if(e&&e.code==='cancelled')return;out.textContent=aiErr(e&&e.code);}).then(done);
    return;
  }
  out.classList.remove('wait');out.textContent='AIは今使えません。';done();
}

/* ---- in 単語をさがす ---- */
function dRun(q){
  var key=q.trim();
  if(DICT.res[key])return;
  DICT.res[key]={wait:true};
  dSearch(key).then(function(r){
    DICT.res[key]=r;DICT.resOrder.push(key);
    if(DICT.resOrder.length>40)delete DICT.res[DICT.resOrder.shift()];
  },function(){delete DICT.res[key];DICT.err=key;}).then(function(){
    if(view==='words'&&WB.mode==='find'&&WB.q.trim()===key){var el=$('wbRes');if(el)el.innerHTML=wbFindHTML(WB.L||save.lang);}
  });
}
function dSavedFill(){
  var ul=$('dictSaved');if(!ul)return;
  Array.prototype.forEach.call(ul.querySelectorAll('.dict-open'),function(b){
    var h=b.getAttribute('data-dict'),jp=b.querySelector('.wb-jp');
    if(!jp||!jp.classList.contains('dim'))return;
    dExact(h).then(function(e){if(!e)return;jp.textContent=dShort(e)||'—';jp.classList.remove('dim');var t=b.querySelector('.dict-tags'),x=dTagsHTML(e);if(!t&&x)b.querySelector('b').insertAdjacentHTML('afterend',x);}).catch(function(){});
  });
}
(function(){
  var wf=wbFindHTML;
  wbFindHTML=function(L){
    if(!dictOn(L))return wf.apply(this,arguments);
    var q=WB.q.trim();
    if(!q)return dIntroHTML();
    var r=DICT.res[q];
    if(r&&!r.wait)return dResHTML(q,r);
    if(DICT.err===q){DICT.err='';return '<p class="warn">辞書を読みこめませんでした。電波を確かめて、もう一度試してね。</p>'+dAppHTML(q,'アプリのレッスンのフレーズ');}
    dRun(q);
    return '<p class="dim wb-empty">さがしています…</p>';
  };
  var wh=wordsHTML;
  wordsHTML=function(){
    var h=wh.apply(this,arguments),L=WB.L||save.lang;
    if(!dictOn(L))return h;
    if(WB.mode==='find')return h.replace(/placeholder="[^"]*"/,'placeholder="英語でも日本語でもOK(スラングも)"').replace('<b>単語帳・単語をさがす</b>','<b>単語帳・英和辞典</b>');
    if(WB.tab==='miss')return h;
    var ks=wbSaved(L).filter(function(k){return k.indexOf('d:')===0;});
    if(!ks.length)return h;
    var sec='<h3 class="dict-h">📖 辞書で保存した単語 '+ks.length+'</h3><ul class="wb-list" id="dictSaved">'+
      ks.map(function(k){var w=k.slice(2),e=DICT.ent[w.toLowerCase()];return dRowHTML(e&&e.full?e:dCard(w));}).join('')+'</ul>';
    setTimeout(dSavedFill,0);
    var at=h.lastIndexOf('</div>');
    return at<0?h+sec:h.slice(0,at)+sec+h.slice(at);
  };
  var rv=reviewHTML;
  reviewHTML=function(){
    var h=rv.apply(this,arguments);
    return dictOn(save.lang)?h.replace('<b>単語をさがす</b><small>英語でも日本語でも</small>','<b>英和辞典</b><small>英語でも日本語でも ・ スラングや新しい言葉も</small>'):h;
  };
})();
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  var g=function(n){return t.getAttribute(n);};
  if(t.hasAttribute('data-dict')){dictSheet(g('data-dict'));return;}
  if(t.hasAttribute('data-dict-say')){speak(g('data-dict-say'),LANGS.en.tts,false,true);return;}
  if(t.hasAttribute('data-dict-q')){
    WB.q=g('data-dict-q');var q=$('wbQ');if(q)q.value=WB.q;
    if(document.querySelector('#sheetHost .sheet')&&typeof closeSheet==='function')closeSheet();
    var r=$('wbRes');if(r)r.innerHTML=wbFindHTML(WB.L||save.lang);
    return;
  }
  if(t.hasAttribute('data-dict-ai')){var box=t.closest('.dict-ai');if(box)dictAsk(box);return;}
  /* a ☆ of a dictionary word: every ☆ of the same word on the screen follows */
  if(t.hasAttribute('data-wb')&&/^d:/.test(g('data-wb'))){
    var k=g('data-wb'),on=t.getAttribute('aria-pressed')==='true';
    Array.prototype.forEach.call(document.querySelectorAll('[data-wb]'),function(b){
      if(b===t||b.getAttribute('data-wb')!==k)return;
      b.setAttribute('aria-pressed',String(on));b.textContent=on?'★':'☆';b.setAttribute('aria-label',on?'単語帳から外す':'単語帳に保存');
    });
  }
});

/* ---- オフライン完全版: the whole dictionary (日本語の表示だけ) ---- */
function offDictUrls(){
  return dMeta().then(function(m){
    var u=['/dict/en/meta.json','/dict/en/m.json'];
    (m.w||[]).forEach(function(k){u.push('/dict/en/w/'+k+'.json');});
    for(var n=0;n<(m.nb||64);n++)u.push('/dict/en/j/'+n+'.json');
    return u;
  });
}
function offDict(){
  if(OFF.busy)return;
  offDictUrls().then(function(urls){offRun('dict',urls,function(o,r){o.dict=r;});},function(){OFF.err='辞書の一覧を読みこめませんでした。電波を確かめてね。';offRefresh();});
}
(function(){
  if(typeof offCardHTML!=='function')return;
  var oc=offCardHTML;
  offCardHTML=function(){
    var h=oc.apply(this,arguments);
    if(!h||typeof UI==='undefined'||UI!=='ja'||h.indexOf('off-row')<0)return h;
    var st=offState(),d=st.dict;
    var row='<div class="off-row'+(d?' ok':'')+'"><div><b>英和辞典</b><small>'+(d?'✓ 保存済み ・ '+offMB(d.bytes):'約47,000語＋いまの英語 ・ 約8MB')+'</small></div>'+
      (OFF.busy==='dict'?'':'<button class="'+(d?'ghost':'go')+' sm" type="button" data-off-dict'+(OFF.busy?' disabled':'')+'>'+(d?'更新':'保存する')+'</button>')+'</div>';
    var at=-1;['<div class="off-prog"','<p class="warn">','<details class="off-what">'].some(function(m){at=h.indexOf(m);return at>=0;});
    h=at>=0?h.slice(0,at)+row+h.slice(at):h;
    h=h.replace('単語の読み上げ</li>','単語の読み上げ・英和辞典(保存したとき)</li>');
    if(d&&h.indexOf('data-off-del')<0)h=h.replace(/<\/section>$/,'<button class="off-del" type="button" data-off-del>保存したデータを消す</button></section>');
    return h;
  };
})();
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');
  if(t&&t.hasAttribute('data-off-dict'))offDict();
});
