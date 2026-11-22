/* 試作ギミック（テスト用）: 客室マップに足す演出を、試作ルームでオン・オフしながら見比べるためのもの。
   BF_SIM が false（本番 babelflight.com）のときは何も出ず、地図の動きも変わらない。 */
var BF_SIM=(typeof BF_SIM_FORCE!=='undefined'&&!!BF_SIM_FORCE)||/^babel-flight-sim/.test(location.hostname);
var GIMMICK_DEF=[
  {k:'cloud',c:'window',t:'雲が地図の後ろをゆっくり流れる（夕方の空の感じ）'},
  {k:'instr',c:'window',t:'窓の下に高度・速度の表示（飾り）'},
  {k:'flip',c:'lounge',t:'次の都市名がパタパタ切り替わる'},
  {k:'ticket',c:'lounge',t:'地図の下に搭乗券のちぎり線'},
  {k:'compass',c:'suite',t:'方位磁石（コンパスローズ）'},
  {k:'dist',c:'suite',t:'次の都市までの残り距離'},
  {k:'night',c:'suite',t:'昼と夜の境目（ゆっくり動く飾り）'},
  {k:'intro',c:'all',t:'地図が開くとき、飛行機が下から上がってくる'}
];
var GIMMICK=(function(){try{return JSON.parse(localStorage.getItem('bf.gimmick')||'{}')||{};}catch(e){return {};}})();
var GMK={flip:'',flipT:0};
function gimmickOn(k){return !!(BF_SIM&&GIMMICK[k]);}
function gimmickSave(){try{localStorage.setItem('bf.gimmick',JSON.stringify(GIMMICK));}catch(e){}}
function gimmickCab(){return rootEl.getAttribute('data-cabin')||'';}
/* 地図の一番下（描画の土台）: 雲・夜の陰 */
function gimmickSky(g,cw,ch,now){
  var cab=gimmickCab();
  if(gimmickOn('cloud')&&cab==='window'){
    g.save();g.fillStyle='rgba(255,255,255,.14)';
    for(var i=0;i<4;i++){
      var sp=7+i*3,x=((now/1000*sp+i*cw*0.37)%(cw+160))-80,y=ch*(0.22+0.17*((i*37)%5)/4),r=18+i*5;
      g.beginPath();g.ellipse(x,y,r*1.9,r*0.55,0,0,6.283);g.fill();
    }
    g.restore();
  }
  if(gimmickOn('night')&&cab==='suite'){
    var px=((now/60000)%1)*cw*1.6-cw*0.3;
    var gr=g.createLinearGradient(px-cw*0.5,0,px+cw*0.5,0);
    gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(0,0,0,.5)');
    g.fillStyle=gr;g.fillRect(0,0,cw,ch);
  }
}
/* 飛行機の上・地図の前面: 表示・ちぎり線・方位磁石・残り距離・パタパタ */
function gimmickFront(g,cw,ch,now,M){
  var cab=gimmickCab();
  if(gimmickOn('instr')&&cab==='window'){
    var alt=35000+Math.round(Math.sin(now/4000)*120),spd=478+Math.round(Math.sin(now/3100)*4);
    g.save();g.font='700 10px "B612 Mono",monospace';g.textAlign='right';g.fillStyle='rgba(255,255,255,.8)';
    g.fillText('ALT '+alt.toLocaleString('en-US')+' ft',cw-12,ch*0.5);
    g.fillText('GS  '+spd+' kt',cw-12,ch*0.5+14);
    g.restore();
  }
  if(gimmickOn('flip')&&cab==='lounge'&&M.next>=0){
    var nm=cityFor(M.L,M.next)[0];
    if(nm!==GMK.flip){GMK.flip=nm;GMK.flipT=now;}
    var ft=clamp((now-GMK.flipT)/420,0,1),sy=Math.sin(ft*Math.PI/2),bw=Math.min(cw-24,170),bh=30,bx=cw-12-bw,by=ch-62;
    g.save();g.fillStyle='rgba(6,10,20,.85)';g.fillRect(bx,by,bw,bh);
    g.strokeStyle='rgba(212,175,55,.6)';g.lineWidth=1;g.strokeRect(bx+.5,by+.5,bw-1,bh-1);
    g.translate(bx+bw/2,by+bh/2);g.scale(1,Math.max(.06,sy));
    g.fillStyle='#e7c35a';g.font='700 13px "B612 Mono",monospace';g.textAlign='center';g.textBaseline='middle';
    g.fillText(nm,0,0);g.restore();
  }
  if(gimmickOn('ticket')&&cab==='lounge'){
    var ty=ch-12;
    g.save();g.setLineDash([4,4]);g.strokeStyle='rgba(212,175,55,.5)';g.lineWidth=1;
    g.beginPath();g.moveTo(16,ty);g.lineTo(cw-16,ty);g.stroke();
    g.setLineDash([]);g.globalCompositeOperation='destination-out';
    g.beginPath();g.arc(0,ty,9,0,6.283);g.arc(cw,ty,9,0,6.283);g.fill();
    g.restore();
  }
  if(gimmickOn('compass')&&cab==='suite'){
    var cx=cw-34,cy=44,r=22,a=Math.sin(now/2600)*0.12;
    g.save();g.translate(cx,cy);g.rotate(a);g.strokeStyle='rgba(255,255,255,.4)';g.lineWidth=1;
    g.beginPath();g.arc(0,0,r,0,6.283);g.stroke();
    for(var t=0;t<12;t++){var an=t*Math.PI/6,l=t%3===0?7:3.5;
      g.beginPath();g.moveTo(Math.cos(an)*(r-l),Math.sin(an)*(r-l));g.lineTo(Math.cos(an)*r,Math.sin(an)*r);g.stroke();}
    g.fillStyle='#ffcf26';g.font='700 9px "B612 Mono",monospace';g.textAlign='center';g.textBaseline='middle';
    g.fillText('N',0,-r-8);g.restore();
  }
  if(gimmickOn('dist')&&cab==='suite'&&M.next>=0){
    var cp=curPos(M.L),from=cp>=0?cityFor(M.L,cp):TOKYO,km=Math.round(haversine(from,cityFor(M.L,M.next)));
    g.save();g.font='700 11px "B612 Mono",monospace';g.textAlign='right';g.fillStyle='rgba(255,207,38,.9)';
    g.fillText('NEXT '+km.toLocaleString('en-US')+' km',cw-14,92);g.restore();
  }
}
/* 地図が開くとき、飛行機が下から上がってくる（1.4秒） */
function gimmickIntro(now,M,ch){
  if(!gimmickOn('intro')||!M.t0)return 0;
  var t=clamp((now-M.t0)/1400,0,1),e=1-Math.pow(1-t,3);
  return (1-e)*ch*0.45;
}
/* 試作ボタンと一覧（試作ルームだけ） */
function gimmickPanel(){
  if(!BF_SIM||document.getElementById('gmBtn'))return;
  var b=document.createElement('button');b.id='gmBtn';b.type='button';b.textContent='🧪 試作';
  b.style.cssText='position:fixed;bottom:calc(env(safe-area-inset-bottom,0px) + 104px);right:8px;z-index:2147483600;font:700 11px system-ui,sans-serif;padding:5px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.3);background:rgba(10,14,26,.88);color:#fff;cursor:pointer';
  var p=document.createElement('div');p.id='gmPanel';
  p.style.cssText='display:none;position:fixed;bottom:calc(env(safe-area-inset-bottom,0px) + 144px);right:8px;left:8px;max-width:360px;margin-left:auto;z-index:2147483600;padding:12px 14px;border-radius:14px;background:rgba(10,14,26,.96);color:#eef0f6;font:12px/1.5 system-ui,sans-serif;max-height:70vh;overflow:auto;border:1px solid rgba(255,255,255,.15)';
  var groups={window:'プレエコ（窓）',lounge:'ビジネス（ラウンジ）',suite:'ファースト（スイート）',all:'全クラス共通'};
  var h='<b style="font-size:13px">試作ギミック</b><div style="color:#9aa0b4;margin:2px 0 6px">オン・オフで見比べられます（この端末だけに保存）</div>';
  ['window','lounge','suite','all'].forEach(function(c){
    h+='<div style="margin-top:8px;color:#ffcf26;font-weight:700">'+groups[c]+'</div>';
    GIMMICK_DEF.filter(function(d){return d.c===c;}).forEach(function(d){
      h+='<label style="display:flex;gap:8px;align-items:flex-start;padding:4px 0;cursor:pointer"><input type="checkbox" data-gm="'+d.k+'"'+(GIMMICK[d.k]?' checked':'')+' style="margin-top:3px"><span>'+d.t+'</span></label>';});
  });
  p.innerHTML=h;
  p.addEventListener('change',function(e){var k=e.target&&e.target.getAttribute&&e.target.getAttribute('data-gm');if(!k)return;GIMMICK[k]=e.target.checked;gimmickSave();});
  b.addEventListener('click',function(){p.style.display=p.style.display==='none'?'block':'none';});
  document.body.appendChild(b);document.body.appendChild(p);
}
if(BF_SIM){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',gimmickPanel);else gimmickPanel();}
