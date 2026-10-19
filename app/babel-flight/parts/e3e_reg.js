/* ---- register daily, study and scene units ---- */
var DAILY_IDS=['greet','intro','num','time','feel','chat'];
var TRAVEL_SC=['sc-imm','sc-cafe','sc-hotel','sc-rest','sc-card','sc-wc','sc-wallet','sc-booking'];
var STUDY_IDS=['sc-class','sc-teacher','sc-home','math','sci','soc'];
ORDER.forEach(function(l){
  DU[l].forEach(function(u){UNITS[l][u.id]={id:u.id,items:u.items,track:'daily'};});
  ['math','sci','soc'].forEach(function(id){var u=PU[l][id];if(u)UNITS[l][id]={id:id,items:u.items,track:'study'};});
  Object.keys(SCN[l]).forEach(function(id){
    var s=SCN[l][id];
    UNITS[l][id]={id:id,items:[],turns:s.turns,end:s.end,track:SCENE_META[id].grp==='study'?'study':'scene',kind:'scene'};
  });
  ALL_IDS[l]=Object.keys(UNITS[l]);
});
function isScene(L,uid){var u=UNITS[L][uid];return !!(u&&u.kind==='scene');}
function unitKind(L,uid){
  var u=UNITS[L][uid];if(!u)return '';
  if(u.kind==='scene')return '会話';
  if(uid==='math'||uid==='sci'||uid==='soc')return '用語';
  if(u.track==='travel'||u.track==='daily')return 'フレーズ';
  return '専門';
}
