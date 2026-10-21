/* ================= LESSON END (shared by phrase lessons and scenes) ================= */
function nextPathUnit(L,cur){
  var ids=pathIds(L),i,best=null,bd=0;
  if(!ids.length)return null;
  /* stay in the same group: the next unit not flown yet (入国審査 → カフェ), then the next group */
  var secs=pathSections(L);
  for(var s=0;cur&&s<secs.length;s++){
    var g=secs[s].ids,k=g.indexOf(cur),j;
    if(k<0)continue;
    for(j=1;j<g.length;j++){var u=g[(k+j)%g.length];if(unitRec(L,u).n===0)return u;}
    if(k+1<g.length)return g[k+1];
    for(j=1;j<secs.length;j++){var g2=secs[(s+j)%secs.length].ids;for(i=0;i<g2.length;i++)if(unitRec(L,g2[i]).n===0)return g2[i];}
    break;
  }
  for(i=0;i<ids.length;i++)if(unitRec(L,ids[i]).n===0)return ids[i];
  for(i=0;i<ids.length;i++){var d=unitDue(L,ids[i]);if(d>bd){bd=d;best=ids[i];}}
  return best||ids[0];
}
function land(){
  var L=F.lang,now=Date.now(),P=save.prog[L];
  var uniq={},keys=[];
  F.items.forEach(function(it){var k=ik(it.uid,it.i);if(!uniq[k]){uniq[k]=it;keys.push(k);}});
  keys.forEach(function(k){
    var rec=P.items[k]||{b:0,d:0},w=F.wrong[k]||0,wasDue=rec.b===0||rec.d<=now;
    if(w===0){
      if(rec.b===0){rec.b=1;rec.d=now+INTERVALS[1]*DAY;}
      else if(wasDue){rec.b=Math.min(6,rec.b+1);rec.d=now+INTERVALS[rec.b]*DAY;}
      if(rec.m)rec.k=(rec.k||0)+1;
    }else{rec.b=Math.max(1,rec.b-1);rec.d=now+0.5*DAY;rec.m=(rec.m||0)+w;rec.k=0;}
    P.items[k]=rec;
  });
  var mist=F.mist,stars=mist===0?3:mist<=2?2:1;
  var grade=mist===0?['完璧な着陸','PERFECT LANDING','ミスなし！バターのようになめらか']:mist<=2?['なめらかな着陸','SMOOTH LANDING','いい調子。この感覚で続けよう']:mist<=5?['しっかり着陸','FIRM LANDING','間違えたフレーズは復習に回るよ']:['ちょっと揺れた着陸','HARD LANDING','大丈夫。間違えた分だけ記憶に残りやすいよ'];
  var wrong=keys.filter(function(k){return F.wrong[k];}).slice(0,5).map(function(k){var it=uniq[k];return UNITS[L][it.uid].items[it.i];});
  completeLesson({L:L,uid:F.uid,mode:F.mode==='unit'?'unit':F.mode,stars:stars,corr:F.corr,answered:F.corr+F.mist,grade:grade,wrong:wrong,wrongTitle:'間違えたフレーズ',wrongNote:'弱点コースに追加'});
}
function completeLesson(o){
  var L=o.L,LG=LANGS[L],today=dayStr(),P=save.prog[L],rankBefore=statusIdx(),unitMode=(o.mode==='unit'||o.mode==='scene');
  if(!save.daily||save.daily.d!==today)save.daily={d:today,n:0};
  save.daily.n++;
  var goalJust=save.daily.n===save.goal;
  var base=unitMode?20:15,c3=o.corr*3,sp=o.stars*(unitMode?15:10),miles=base+c3+sp;
  var lines=[[o.mode==='scene'?'通話完了':'レッスン完了',base],[(o.corrLabel||'正解')+' × '+o.corr,c3],['着陸評価 ★'+o.stars,sp]];
  if(goalJust){miles+=20;lines.push(['今日の目標達成',20]);}
  var rec=null,ix=-1;
  if(unitMode){
    rec=P.units[o.uid]||{n:0,stars:0,last:''};
    if(rec.n===0){miles+=30;lines.push(['はじめての到着',30]);}
    rec.n++;rec.stars=Math.max(rec.stars,o.stars);rec.last=today;P.units[o.uid]=rec;
    ix=pathIds(L).indexOf(o.uid);
    if(ix>=0){
      if(!save.pos)save.pos={};
      var from=curPos(L);
      if(from!==ix){pendingFly={key:posKey(L),from:from,to:ix};save.pos[posKey(L)]=ix;}
    }
  }
  if(save.lastDay!==today){
    save.streak=(save.lastDay===yesterdayStr())?save.streak+1:1;
    save.lastDay=today;save.bestStreak=Math.max(save.bestStreak||0,save.streak);
  }
  save.miles+=miles;save.flights++;
  save.tq=(save.tq||0)+(o.answered||0);
  var firstCap=statusEarn(miles);
  store();
  var rankAfter=statusIdx(),gpct=clamp(save.daily.n/save.goal,0,1)*100;
  var c=ix>=0?cityFor(L,ix):[LG.cityEn,LG.city,0,0];
  var h='<div class="land"><span class="lbl">'+(unitMode?flightNo(L,o.uid)+' ・ '+esc(c[0])+' に到着':'おつかれさま！')+'</span>';
  if(unitMode)h+='<div class="stamp-wrap slam">'+stampSVG(L,o.uid,rec,'-land')+'</div>';
  h+='<div class="grade">'+o.grade[0]+'</div><div class="lbl" style="margin-top:4px">'+o.grade[1]+'</div><div class="dim" style="font-size:14px;margin-top:6px">'+o.grade[2]+'</div>'+
     '<div class="stars">'+[1,2,3].map(function(n){return starIcon(n<=o.stars);}).join('')+'</div>';
  h+='<div class="goalbox"><div class="card-h" style="margin:0"><span>今日の目標</span><b class="mono">'+save.daily.n+' / '+save.goal+' レッスン</b></div><div class="gbar"><i style="width:'+gpct+'%"></i></div>'+
     (save.daily.n>=save.goal?'<div class="gdone">'+(goalJust?'今日の目標を達成しました！':'目標達成ずみ。おかわりフライト中')+'</div>':'')+'</div>';
  h+='<div class="receipt" aria-label="獲得マイルの明細">'+lines.map(function(x){return '<div class="ln"><span>'+esc(x[0])+'</span><span>+'+x[1]+'</span></div>';}).join('')+
     '<div class="ln tot"><span>獲得マイル</span><span>+'+miles+' mi</span></div></div>';
  if(firstCap)h+='<div class="up-note">キャプテンに到達！ 記念のキャプテンスタンプをもらいました(ずっと残ります)</div>';
  else if(rankAfter>rankBefore)h+='<div class="up-note">ステータスアップ！ '+RANKS[rankAfter][0]+'になりました(6ヶ月有効)</div>';
  if(o.wrong&&o.wrong.length){
    h+='<div class="card" style="text-align:left"><div class="card-h"><h2 class="jh">'+esc(o.wrongTitle)+'</h2><span class="lbl">'+esc(o.wrongNote)+'</span></div>'+
       o.wrong.map(function(d){return '<p style="font-size:14px;margin-top:6px"><b class="'+(L==='ko'?'ko':'')+'">'+esc(d.t)+'</b><br><span class="dim" style="font-size:12.5px">'+esc(d.jp)+'</span></p>';}).join('')+'</div>';
  }
  h+='<div class="acts">';
  if(unitMode){var nu=nextPathUnit(L,o.uid);if(nu)h+='<button class="go" type="button" data-next-lesson="'+esc(nu)+'">次のレッスンへ<small>'+esc(unitTitle(nu))+' ・ 地図で飛行機が進みます</small></button>';}
  h+='<button class="ghost" type="button" data-home>ホームに戻る(地図を見る)</button></div></div>';
  view='land';F=null;board=null;closeSheet();$('tabs').hidden=true;
  try{speechSynthesis.cancel();}catch(e){}
  cineLanding({city:c[0],cityJp:c[1],coord:ix>=0?fmtCoord(c):'',grade:o.grade[1]},function(){
    var main=$('main');main.innerHTML=h;main.classList.remove('enter');void main.offsetWidth;main.classList.add('enter');
    window.scrollTo(0,0);chimeLand();
    if(goalJust)confetti();
  });
}
