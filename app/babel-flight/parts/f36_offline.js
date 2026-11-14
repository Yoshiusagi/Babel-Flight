/* ================= オフライン完全版 (ファースト, standalone site) =================
   Everyone can already open the app offline once it has been opened (public/sw.js keeps the page: lessons,
   review, the route simulation's typing mode …). While flying ファースト, 記録 → オフライン完全版 also downloads:
   - 基本データ: the mock tests (/mx), interview cards (/iv), the display-language dictionaries (/i18n), the voice index;
   - 録音した声 of the learning language (/voice/<set>/<key>.mp3: English, Spanish, Italian), optional (English is big).
   They go into caches bf-off-base and bf-off-voice-<L> (the service worker serves them offline) and the browser is
   asked to keep them (navigator.storage.persist). What still needs a connection: AI, sign-in and syncing (it
   catches up later), and on some phones the speech recognition. State: babelflight.offline. */

var OFF_KEY='babelflight.offline';
var OFF={busy:'',done:0,total:0,bytes:0,fail:0,stop:false,err:'',est:{}};
var OFF_VOICE={en:/^[ab][fm]_/,es:/^e[fm]_/,it:/^i[fm]_/};
function offOk(){try{return 'caches' in window&&!!navigator.serviceWorker&&bfOnSite();}catch(e){return false;}}
function offState(){return (typeof fcJson==='function'&&fcJson(OFF_KEY))||{};}
function offSave(o){fcPut(OFF_KEY,o);}
function offMB(b){return b>=1e6?(b/1e6).toFixed(b>=1e8?0:1)+'MB':Math.max(1,Math.round(b/1e3))+'KB';}
function offBaseUrls(){
  var u=['/','/favicon.svg','/manifest.webmanifest','/voice/index.json'];
  MX_GRADES.forEach(function(g){for(var v=1;v<=mxNVers(g[0]);v++)u.push('/mx/'+mxTid(g[0],v)+'.json');});
  IV_TESTS.forEach(function(t){u.push('/iv/'+t.k+'.json');});
  UI_LANGS.forEach(function(l){if(l[0]!=='ja')u.push('/i18n/'+l[0]+'.json');});
  return u;
}
/* the recordings of language L: [urls] from /voice/index.json */
function offVoiceUrls(L){
  var re=OFF_VOICE[L];if(!re)return Promise.resolve([]);
  return recIdx().then(function(idx){
    var u=[];Object.keys(idx||{}).forEach(function(set){if(re.test(set))idx[set].forEach(function(k){u.push('/voice/'+set+'/'+k+'.mp3');});});
    return u;
  });
}
function offRun(name,urls,done){
  OFF.busy=name;OFF.done=0;OFF.total=urls.length;OFF.bytes=0;OFF.fail=0;OFF.stop=false;OFF.err='';offRefresh();
  try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persist().catch(function(){});}catch(e){}
  caches.open('bf-off-'+name).then(function(c){
    var i=0,active=0,last=0;
    return new Promise(function(res){
      function next(){
        if(OFF.stop){if(!active)res();return;}
        if(i>=urls.length){if(!active)res();return;}
        var u=urls[i++];active++;
        function get(left){
          return fetch(u,{cache:'no-cache'}).then(function(r){
            if(!r.ok)throw new Error('http');
            var n=+(r.headers.get('content-length')||0);
            return c.put(u,r.clone()).then(function(){return n||r.blob().then(function(x){return x.size;},function(){return 0;});});
          }).catch(function(err){if(left>0)return get(left-1);throw err;});
        }
        get(1).then(function(n){OFF.bytes+=n||0;},function(){OFF.fail++;}).then(function(){
          OFF.done++;active--;var t=Date.now();if(t-last>250||OFF.done===OFF.total){last=t;offProgress();}next();
        });
      }
      for(var k=0;k<6;k++)next();
    });
  }).then(function(){
    var stopped=OFF.stop,o=offState();
    if(!stopped&&OFF.fail<=Math.max(2,OFF.total*0.02)){done(o,{at:Date.now(),n:OFF.done-OFF.fail,bytes:OFF.bytes});offSave(o);}
    else OFF.err=stopped?'ダウンロードを止めました。続きは、もう一度押すとはじまります(済んだ分はそのまま)。':'電波が弱くて、'+OFF.fail+'個がダウンロードできませんでした。Wi-Fiにつないで、もう一度試してね。';
  },function(){OFF.err='この端末では保存できませんでした(空き容量やブラウザの設定を確かめてね)。';})
  .then(function(){OFF.busy='';offRefresh();});
}
function offProgress(){
  var b=$('offBar'),t=$('offTxt');
  if(b)b.style.width=(OFF.total?Math.round(OFF.done/OFF.total*100):0)+'%';
  if(t)t.textContent=OFF.done+' / '+OFF.total+'('+offMB(OFF.bytes)+')';
}
function offRefresh(){if(view==='record'){var y=window.scrollY;render();window.scrollTo(0,y);}}
function offBase(){if(OFF.busy)return;offRun('base',offBaseUrls(),function(o,r){o.base=r;});}
function offVoice(L){
  if(OFF.busy)return;
  offVoiceUrls(L).then(function(urls){
    if(!urls.length){OFF.err='この言語の録音はまだありません(端末の声で読み上げます)。';offRefresh();return;}
    offRun('voice-'+L,urls,function(o,r){o.voice=o.voice||{};o.voice[L]=r;});
  });
}
function offRemove(){
  caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k.indexOf('bf-off-')===0;}).map(function(k){return caches.delete(k);}));})
    .catch(function(){}).then(function(){offSave({});OFF.err='';offRefresh();});
}
function offEstimate(L){
  if(OFF.est[L]!==undefined)return;
  OFF.est[L]=null;
  offVoiceUrls(L).then(function(u){OFF.est[L]=u.length;offRefresh();}).catch(function(){OFF.est[L]=0;});
}
function offCardHTML(){
  if(!fcOn())return '';
  var h='<section class="card off-card"><div class="card-h"><h2 class="jh">オフライン完全版</h2><span class="lbl">FIRST</span></div>';
  if(!offOk())return h+'<p class="dim">このブラウザでは使えません。SafariやChromeで開いて、ホーム画面に追加すると使えます。</p></section>';
  var st=offState(),L=save.lang,LG=LANGS[L],vre=OFF_VOICE[L],v=st.voice&&st.voice[L];
  if(vre)offEstimate(L);
  h+='<p class="dim">電波がない機内や海外でも、模試・面接練習・路線シミュレーションまで使えるように、この端末に保存します。</p>';
  h+='<div class="off-row'+(st.base?' ok':'')+'"><div><b>基本データ</b><small>'+(st.base?'✓ 保存済み ・ '+offMB(st.base.bytes)+' ・ '+(new Date(st.base.at).getMonth()+1)+'/'+new Date(st.base.at).getDate():'模試・面接練習・表示言語 ・ 約5MB')+'</small></div>'+
    (OFF.busy==='base'?'':'<button class="'+(st.base?'ghost':'go')+' sm" type="button" data-off-base'+(OFF.busy?' disabled':'')+'>'+(st.base?'更新':'保存する')+'</button>')+'</div>';
  if(vre){
    var n=OFF.est[L],mb=n?Math.round(n*0.017):0;
    h+='<div class="off-row'+(v?' ok':'')+'"><div><b>'+esc(LG.name)+'の録音した声</b><small>'+(v?'✓ 保存済み ・ '+offMB(v.bytes):'面接官・模試のリスニングの声'+(n?' ・ 約'+mb+'MB':''))+'</small></div>'+
      (OFF.busy==='voice-'+L?'':'<button class="'+(v?'ghost':'go')+' sm" type="button" data-off-voice'+(OFF.busy||!n?' disabled':'')+'>'+(v?'更新':'保存する')+'</button>')+'</div>';
    if(!v&&mb>=30)h+='<p class="off-warn">⚠️ '+mb+'MBあります。Wi-Fiのときに保存してね。</p>';
  }
  if(OFF.busy)h+='<div class="off-prog" role="progressbar" aria-label="ダウンロード"><i id="offBar" style="width:'+(OFF.total?Math.round(OFF.done/OFF.total*100):0)+'%"></i></div>'+
    '<div class="off-prog-t"><span id="offTxt">'+OFF.done+' / '+OFF.total+'</span><button class="mini off-stop" type="button" data-off-stop>止める</button></div>';
  if(OFF.err)h+='<p class="warn">'+esc(OFF.err)+'</p>';
  h+='<details class="off-what"><summary>オフラインで使えるもの・使えないもの</summary><ul>'+
    '<li>✓ レッスン・復習・弱点コース・路線シミュレーション・模試・面接練習・単語の読み上げ</li>'+
    '<li>✕ AI(AIコーチ・AI日記・AIロールプレイ・AIに質問)、ログイン</li>'+
    '<li>△ 記録の同期は、電波が戻ったら自動で追いつきます。発音チェックは、端末によっては電波が必要です</li></ul>'+
    '<p class="dim hint">iPhoneでは、ホーム画面に追加して使うと、保存したデータが消されにくくなります。</p></details>';
  if(st.base||(st.voice&&Object.keys(st.voice).length))h+='<button class="off-del" type="button" data-off-del>保存したデータを消す</button>';
  return h+'</section>';
}
(function(){
  var rh=recordHTML;
  recordHTML=function(){
    var h=rh.apply(this,arguments),card=offCardHTML();if(!card)return h;
    var at=h.indexOf('<section class="card fam-card"');
    if(at<0)at=h.indexOf('<section class="card cabin-card');
    if(at<0)return h+card;
    var end=h.indexOf('</section>',at);return end<0?h+card:h.slice(0,end+10)+card+h.slice(end+10);
  };
})();
document.addEventListener('click',function(e){
  var t=e.target&&e.target.closest&&e.target.closest('button');if(!t)return;
  if(t.hasAttribute('data-off-base')){offBase();return;}
  if(t.hasAttribute('data-off-voice')){offVoice(save.lang);return;}
  if(t.hasAttribute('data-off-stop')){OFF.stop=true;return;}
  if(t.hasAttribute('data-off-del')){if(!t.classList.contains('confirm')){t.classList.add('confirm');t.textContent='本当に消す？(もう一度押す)';return;}offRemove();return;}
});
