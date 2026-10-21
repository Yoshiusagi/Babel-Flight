/* ================= AMERICAN / BRITISH ENGLISH =================
   One English course; a setting switches the words, spelling and voice between American (default)
   and British English. Progress is shared. The 「米英の違い」 unit teaches the other variety. */
var EN_UK={
 'checkin.3':["I've got one bag to check in.","「have got」=「持っている」はイギリスでよく使う形。check in a bag=荷物を預ける。"],
 'inflight.5':["Where are the toilets?","お手洗いは、イギリスでは toilet(s)、アメリカでは restroom。"],
 'immigration.5':["I'm staying at a hotel in the city centre.","街の中心はイギリスでは city centre(つづりも -re)、アメリカでは downtown。"],
 'hotel.5':["The air conditioning isn't working.","イギリスでは air conditioning(エアコン設備)と言うことが多いです。"],
 'hotel.6':["Could I have an extra towel?","「Can/Could I get 〜?」はアメリカっぽい言い方。イギリスでは「Could I have 〜?」が自然です。"],
 'restaurant.4':["Could we have the bill, please?","お会計はイギリスでは bill、アメリカでは check。"],
 'city.3':["Where's the nearest chemist?","薬局はイギリスでは chemist、アメリカでは pharmacy。イギリスでも pharmacy は通じます。"],
 'num.1':["It's ten pounds.","イギリスのお金はポンド(pound)。£10 と書きます。"],
 'num.7':["Could I have a receipt?","イギリスでは「Could I have 〜?」が自然。「Can I get 〜?」はアメリカっぽく聞こえます。"],
 'chat.3':["Do you fancy seeing a film?","映画はイギリスでは film、アメリカでは movie。「Do you fancy 〜ing?」は「〜しない？」のイギリスらしい誘い方。"],
 'crew.6':["Please put your bag in the overhead locker.","頭上の棚は、イギリスでは overhead locker、アメリカでは overhead bin。"],
 'med.0':["What can I do for you today?","イギリスのかかりつけ医(GP)が最初によく言うひと言です。"],
 'law.1':["You do not have to say anything.","イギリスの警察が言う「警告(caution)」の最初の一文。アメリカの「黙秘権」の言い方とは違います。"],
 'law.5':["You can take legal action.","イギリスでは take legal action(法的手段をとる)がよく使われます。file a lawsuit はアメリカ的。"],
 'biz.5':["Would next Tuesday suit you?","「suit」=都合に合う。イギリスのていねいな日程調整の定番です。"],
 'beauty.2':["I'll trim your fringe a little.","前髪は、イギリスでは fringe、アメリカでは bangs。"],
 'chef.1':["Stir-fry it on a high heat.","火加減は、イギリスでは on a high heat、アメリカでは over high heat。"],
 'hosp.2':["Your room is on the fourth floor.","要注意！イギリスでは1階が ground floor なので、日本の5階は fourth floor。アメリカは日本と同じ数え方です。"],
 'lab.2':["I'm analysing the data.","つづりの違い: イギリスは -ise(analyse)、アメリカは -ize(analyze)。"],
 'sport.1':["What time is training today?","チームの練習は、イギリスでは training、アメリカでは practice。"],
 'sport.4':["Let's tighten up our defence in the first half.","つづりの違い: イギリスは defence、アメリカは defense。"],
 'sport.7':["Let's win the next match for sure!","試合は、イギリスでは match、アメリカでは game がよく使われます。"],
 's-life.0':["timetable","時間割は、イギリスでは timetable、アメリカでは class schedule。"],
 's-life.1':["marks","成績は、イギリスでは marks、アメリカでは grades。"],
 's-life.3':["break","休み時間は、イギリスでは break、アメリカでは recess。"],
 'crew-safe.3':["Your life jacket is under your seat.","救命胴衣は、イギリスでは life jacket、アメリカでは life vest。"],
 'med-exam.3':["You need to stay in hospital.","イギリスでは in hospital(the なし)、アメリカでは in the hospital。"],
 'med-ward.0':["I'm going to put you on a drip.","点滴は、イギリスでは drip、アメリカでは IV。"],
 'chef-prep.3':["Check the use-by dates.","期限は、イギリスでは use-by date、アメリカでは expiration date。"],
 'teach-talk.5':["She seems to find maths a little difficult.","数学は、イギリスでは maths、アメリカでは math。"],
 'sport-care.2':["We'll get ready for the next match.","試合は、イギリスでは match、アメリカでは game がよく使われます。"]
};
/* conversation scenes: [field, British text] pairs per turn */
var SC_UK={
 'sc-imm.3':{a:"At a hotel in the city centre."},
 'sc-cafe.2':{p:"Eat in or take away?",a:"Take away, please."},
 'sc-cafe.3':{p:"That's twelve pounds, please.",pj:"12ポンドです"},
 'sc-rest.3':{a:"No, thank you. Could we have the bill?"},
 'sc-card.2':{a:"Is there a cash machine nearby?",aj:"近くにATM(cash machine)はありますか"},
 'sc-wc.0':{a:"Excuse me. Where are the toilets?"},
 'sc-wc.2':{p:"Straight on, then left. They're next to the lift.",a:"Next to the lift. Got it."},
 'sc-wallet.3':{p:"Please fill in this form."},
 'sc-booking.2':{p:"We have a twin room for 150 pounds.",pj:"ツインルームが150ポンドで空いています"},
 'sc-class.1':{a:"I like playing football."},
 'sc-teacher.0':{a:"Excuse me, Mr Brown. Do you have a minute?"}
};
/* the other variety: [日本語, American, British, note] */
var USUK=[
 ["エレベーターに乗ろう","Let's take the elevator.","Let's take the lift.","エレベーターは、アメリカでは elevator、イギリスでは lift。"],
 ["アパートに住んでいます","I live in an apartment.","I live in a flat.","集合住宅の部屋は、アメリカでは apartment、イギリスでは flat。"],
 ["地下鉄で行こう","Let's take the subway.","Let's take the Underground.","地下鉄は、アメリカでは subway、イギリスでは Underground(ロンドンでは the Tube)。イギリスで subway は「地下道」の意味なので注意！"],
 ["フライドポテトをください","Can I get some fries?","Could I have some chips?","フライドポテトは、アメリカでは fries、イギリスでは chips。ポテトチップスは、アメリカでは chips、イギリスでは crisps。"],
 ["休暇中です","I'm on vacation.","I'm on holiday.","休暇は、アメリカでは vacation、イギリスでは holiday。"],
 ["列に並んでください","Please wait in line.","Please join the queue.","列は、アメリカでは line、イギリスでは queue(キュー)。"],
 ["携帯の充電が切れた","My cell phone is dead.","My mobile is dead.","携帯電話は、アメリカでは cell phone、イギリスでは mobile。"],
 ["好きな色は何？","What's your favorite color?","What's your favourite colour?","つづりの違い: アメリカは -or(color)、イギリスは -our(colour)。発音は同じです。"]
];
UM.usuk={jp:'米英の違い',lat:'US & UK'};
UNITS.en.usuk={id:'usuk',items:USUK.map(function(x){return {jp:x[0],t:x[1],r:'',n:x[3]};}),track:'daily'};
ALL_IDS.en=Object.keys(UNITS.en);
var EN_VAR='';
function enUK(){return save.enVar==='uk';}
/* rewrite the English data in place for the chosen variety (cheap; runs before every render) */
function applyEnVar(){
  var v=save.enVar==='uk'?'uk':'us';
  if(v===EN_VAR)return;
  EN_VAR=v;var uk=v==='uk';
  LANGS.en.tts=uk?'en-GB':'en-US';
  LANGS.en.name=uk?'英語(イギリス)':'英語';
  Object.keys(EN_UK).forEach(function(k){
    var m=/^(.+)\.(\d+)$/.exec(k),u=UNITS.en[m[1]],it=u&&u.items[+m[2]];if(!it)return;
    if(!it.us)it.us={t:it.t,n:it.n};
    var o=EN_UK[k];
    if(uk){it.t=o[0];it.n=o[1]+' (アメリカ英語では「'+it.us.t+'」)';}
    else{it.t=it.us.t;it.n=it.us.n+(/イギリス/.test(it.us.n)?'':(it.us.n?' ':'')+'(イギリス英語では「'+o[0]+'」)');}
  });
  Object.keys(SC_UK).forEach(function(k){
    var m=/^(.+)\.(\d+)$/.exec(k),s=SCN.en[m[1]],t=s&&s.turns[+m[2]];if(!t)return;
    if(!t.us)t.us={p:t.p,pj:t.pj,a:t.a,aj:t.aj};
    var o=SC_UK[k];
    ['p','pj','a','aj'].forEach(function(f){t[f]=uk&&o[f]!==undefined?o[f]:t.us[f];});
  });
  UM.usuk.jp=uk?'アメリカ英語との違い':'イギリス英語との違い';
  UNITS.en.usuk.items.forEach(function(it,i){var x=USUK[i];it.t=uk?x[1]:x[2];it.jp=x[0]+(uk?'(アメリカ英語で)':'(イギリス英語で)');});
}
function enVoiceNote(){
  if(!enUK()||!tts.ok||!tts.voices.length)return '';
  var has=tts.voices.some(function(v){return v.lang&&v.lang.replace('_','-').toLowerCase()==='en-gb';});
  return has?'':'この端末にはイギリス英語の音声が入っていないので、ほかの英語の音声で読み上げます。';
}
function enVarHTML(){
  var note=enVoiceNote();
  return '<div class="set-block"><span class="lbl">英語の種類</span>'+seg('data-envar',enUK()?'uk':'us',[['us','アメリカ英語'],['uk','イギリス英語']])+
    '<p class="dim hint">'+(enUK()?'単語・つづり・音声がイギリス式になります。':'単語・つづり・音声がアメリカ式です。')+' 記録は共通です。'+(note?'<br>'+note:'')+'</p></div>';
}
document.addEventListener('click',function(e){
  var b=e.target&&e.target.closest&&e.target.closest('[data-envar]');if(!b)return;
  var v=b.getAttribute('data-envar')==='uk'?'uk':'us';if(save.enVar===v)return;
  save.enVar=v;store();render();
});
