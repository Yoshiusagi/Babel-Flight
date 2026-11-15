/* ================= 訛りのある英語 (AI管制官) =================
   The AI管制官 talks from the airport of the course you learn (Jakarta for インドネシア語, Dubai for アラビア語 …),
   in that country's accent. 訛りの強さ:
     0 なし — plain English (en-US)
     1 弱   — the English text read by the device voice of that language (it reads with its own pronunciation)
     2 強   — the AI also writes the transmission in that language's letters ("atc_local", e.g. katakana for
              Japanese), so the voice reads it as one smooth sentence
   English-speaking airports use the device's regional English voices (en-GB, en-AU, en-IN …): there 強 = 弱.
   Must stay in step with ATC_APTS in src/lib/ai.server.ts (ids, stations, runways, frequencies, acc): the harness
   test atcapt_sync compares them. */
var ATC_APTS=[
 {id:'HND',icao:'RJTT',name:'Tokyo Haneda',jp:'羽田空港',gnd:'Tokyo Ground',twr:'Tokyo Tower',dep:'Tokyo Departure',spot:'12',rd:'34R',ra:'34L',ft:'124.35',fd:'126.0',fg:'121.7',v:'ja-JP',acc:'ja'},
 {id:'JFK',icao:'KJFK',name:'New York JFK',jp:'ケネディ空港',gnd:'Kennedy Ground',twr:'Kennedy Tower',dep:'New York Departure',spot:'7',rd:'31L',ra:'31R',ft:'119.1',fd:'135.9',fg:'121.9',v:'en-US',acc:''},
 {id:'LHR',icao:'EGLL',name:'London Heathrow',jp:'ヒースロー空港',gnd:'Heathrow Ground',twr:'Heathrow Tower',dep:'London Control',spot:'512',rd:'27R',ra:'27L',ft:'118.5',fd:'135.125',fg:'121.9',v:'en-GB',acc:''},
 {id:'SYD',icao:'YSSY',name:'Sydney',jp:'シドニー空港',gnd:'Sydney Ground',twr:'Sydney Tower',dep:'Sydney Departures',spot:'50',rd:'34L',ra:'34R',ft:'120.5',fd:'123.0',fg:'121.7',v:'en-AU',acc:''},
 {id:'DEL',icao:'VIDP',name:'Delhi',jp:'デリー空港',gnd:'Delhi Ground',twr:'Delhi Tower',dep:'Delhi Departure',spot:'31',rd:'29R',ra:'28',ft:'118.1',fd:'126.35',fg:'121.75',v:'en-IN',acc:''},
 {id:'DUB',icao:'EIDW',name:'Dublin',jp:'ダブリン空港',gnd:'Dublin Ground',twr:'Dublin Tower',dep:'Dublin Departures',spot:'302',rd:'28L',ra:'28R',ft:'118.6',fd:'129.175',fg:'121.8',v:'en-IE',acc:''},
 {id:'JNB',icao:'FAOR',name:'Johannesburg',jp:'ヨハネスブルグ空港',gnd:'Johannesburg Ground',twr:'Johannesburg Tower',dep:'Johannesburg Departure',spot:'A7',rd:'03L',ra:'03R',ft:'118.1',fd:'124.5',fg:'121.9',v:'en-ZA',acc:''},
 {id:'ICN',icao:'RKSI',name:'Seoul Incheon',jp:'仁川空港',gnd:'Incheon Ground',twr:'Incheon Tower',dep:'Incheon Departure',spot:'25',rd:'33L',ra:'33R',ft:'118.2',fd:'124.2',fg:'121.75',v:'ko-KR',acc:'ko'},
 {id:'MAD',icao:'LEMD',name:'Madrid Barajas',jp:'マドリード空港',gnd:'Madrid Ground',twr:'Madrid Tower',dep:'Madrid Departure',spot:'18',rd:'36L',ra:'32R',ft:'118.15',fd:'127.5',fg:'121.85',v:'es-ES',acc:'es'},
 {id:'FCO',icao:'LIRF',name:'Rome Fiumicino',jp:'ローマ空港',gnd:'Roma Ground',twr:'Roma Tower',dep:'Roma Departure',spot:'40',rd:'25',ra:'16R',ft:'118.7',fd:'119.2',fg:'121.9',v:'it-IT',acc:'it'},
 {id:'CDG',icao:'LFPG',name:'Paris Charles de Gaulle',jp:'パリ空港',gnd:'De Gaulle Ground',twr:'De Gaulle Tower',dep:'Paris Departure',spot:'E22',rd:'27L',ra:'27R',ft:'119.25',fd:'124.35',fg:'121.6',v:'fr-FR',acc:'fr'},
 {id:'FRA',icao:'EDDF',name:'Frankfurt',jp:'フランクフルト空港',gnd:'Frankfurt Ground',twr:'Frankfurt Tower',dep:'Langen Radar',spot:'V105',rd:'18',ra:'25L',ft:'119.9',fd:'120.8',fg:'121.8',v:'de-DE',acc:'de'},
 {id:'PEK',icao:'ZBAA',name:'Beijing Capital',jp:'北京空港',gnd:'Beijing Ground',twr:'Beijing Tower',dep:'Beijing Departure',spot:'215',rd:'36R',ra:'36L',ft:'118.5',fd:'125.4',fg:'121.7',v:'zh-CN',acc:'',noacc:1},
 {id:'GRU',icao:'SBGR',name:'Sao Paulo Guarulhos',jp:'サンパウロ空港',gnd:'Guarulhos Ground',twr:'Guarulhos Tower',dep:'Sao Paulo Departure',spot:'214',rd:'27L',ra:'27R',ft:'118.4',fd:'127.75',fg:'121.7',v:'pt-BR',acc:'pt'},
 {id:'SVO',icao:'UUEE',name:'Moscow Sheremetyevo',jp:'モスクワ空港',gnd:'Sheremetyevo Ground',twr:'Sheremetyevo Tower',dep:'Moscow Departure',spot:'12',rd:'24C',ra:'24L',ft:'118.1',fd:'127.0',fg:'121.7',v:'ru-RU',acc:'ru'},
 {id:'IST',icao:'LTFM',name:'Istanbul',jp:'イスタンブール空港',gnd:'Istanbul Ground',twr:'Istanbul Tower',dep:'Istanbul Departure',spot:'A12',rd:'35L',ra:'34L',ft:'118.1',fd:'120.5',fg:'121.8',v:'tr-TR',acc:'tr'},
 {id:'CGK',icao:'WIII',name:'Jakarta Soekarno-Hatta',jp:'ジャカルタ空港',gnd:'Soekarno Ground',twr:'Soekarno Tower',dep:'Jakarta Departure',spot:'23',rd:'25R',ra:'25L',ft:'118.2',fd:'123.2',fg:'121.6',v:'id-ID',acc:'id'},
 {id:'DXB',icao:'OMDB',name:'Dubai',jp:'ドバイ空港',gnd:'Dubai Ground',twr:'Dubai Tower',dep:'Dubai Departure',spot:'C21',rd:'30R',ra:'30L',ft:'118.75',fd:'124.45',fg:'118.35',v:'ar-SA',acc:'ar'}
];
/* the airports of the English-speaking world, offered in every course after its own airport and 羽田 */
var ATC_EN=['JFK','LHR','SYD','DEL','DUB','JNB'];
/* how the AI writes a transmission in a language's letters for 強 (the example is the first line of the 試聴ラボ) */
var ATC_RESP={
 ja:{s:'Japanese katakana',who:'a Japanese',ex:'ジャパンエア フォー ファイブ ワン、ディセンド アンド メンテイン フライトレベル ワン ツー ゼロ。'},
 ko:{s:'Korean Hangul',who:'a Korean',ex:'재팬 에어 포 파이브 원, 디센드 앤 메인테인 플라이트 레벨 원 투 제로.'},
 es:{s:'Spanish spelling',who:'a Spanish',ex:'Yapan Er, for faif uan, disend an meintein flait level uan tu siro.'},
 it:{s:'Italian spelling',who:'an Italian',ex:'Giapan Er, for faiv uan, disend end mentein flait level uan tu ziro.'},
 fr:{s:'French spelling',who:'a French',ex:'Djapane Èr, for faïve ouane, dissènde ènde mèntéïne flaïte lèvel ouane tou ziro.'},
 de:{s:'German spelling',who:'a German',ex:'Dschäpän Ähr, foa faif wann, dissend änd mentejn flait lewel wann tu siero.'},
 pt:{s:'Brazilian Portuguese spelling',who:'a Brazilian',ex:'Djapan Ér, fór fáivi uan, dissendi end meintêin fláiti lévou uan tu zírou.'},
 ru:{s:'Russian Cyrillic',who:'a Russian',ex:'Джапан Эйр, фо файв уан, дисенд энд мэйнтейн флайт левел уан ту зиро.'},
 tr:{s:'Turkish spelling',who:'a Turkish',ex:'Cepen Er, for fayv van, disend end meynteyn flayt levıl van tu ziro.'},
 id:{s:'Indonesian spelling',who:'an Indonesian',ex:'Jepen Er, for faif wan, disen en menten flait lefel wan tu ziro.'},
 ar:{s:'Arabic script with long vowels (ا و ي)',who:'an Emirati',ex:'جابان إير فور فايف وان، ديسيند آند مينتين فلايت ليفيل وان تو زيرو.'}
};
function atcAptById(id){for(var i=0;i<ATC_APTS.length;i++)if(ATC_APTS[i].id===id)return ATC_APTS[i];return null;}
/* the airports a course offers: its own first, then 羽田, then the English-speaking ones */
function atcAptList(L){
  var own=LANGS[L]&&atcAptById(LANGS[L].code)?LANGS[L].code:'HND',ids=[own,'HND'].concat(ATC_EN),out=[];
  ids.forEach(function(id){if(out.indexOf(id)<0&&atcAptById(id))out.push(id);});
  return out.map(atcAptById);
}
function atcApt(){
  var L=save.lang,list=atcAptList(L),id=save.atcApt&&save.atcApt[L];
  for(var i=0;i<list.length;i++)if(list[i].id===id)return list[i];
  return list[0];
}
function atcAccSet(){var a=save.atcAcc;return a===0||a===2?a:1;}
/* the strength this airport really uses: 中国語 waits for a better voice; an English-speaking airport has no 強 */
function atcAccOf(apt){var a=atcAccSet();if(apt.noacc)return 0;if(a===2&&!apt.acc)return 1;return a;}
function atcVoiceCode(apt){return atcAccOf(apt)===0?'en-US':apt.v;}
/* the device has a voice for the accent (with no voice list yet, assume it does) */
function atcHasVoice(apt){if(!tts.ok)return false;return !tts.voices.length||voicesFor(atcVoiceCode(apt)).length>0;}
/* say a transmission ({text, local}) in the airport's accent */
function atcSay(m){
  if(!m)return;
  var apt=(ATC.sc&&ATC.apt)||atcApt(),acc=atcAccOf(apt),code=atcVoiceCode(apt);
  if(acc>0&&!atcHasVoice(apt)){code='en-US';acc=0;}
  speak(acc===2&&m.local?m.local:m.text,code,false,true);
}
function atcFill(s,args){return String(s).replace(/\{(\d+)\}/g,function(_,i){return args[+i]==null?'':args[+i];});}
/* the scenarios, built for an airport (for Haneda, the stations, runways and frequencies the AI管制官 always had) */
var ATC_BASE=[
 {id:'taxi',jp:'地上走行の許可をもらう',desc:'駐機場から滑走路へ'},
 {id:'takeoff',jp:'離陸の許可をもらう',desc:'滑走路{0}'},
 {id:'landing',jp:'着陸の許可をもらう',desc:'最終進入'},
 {id:'emergency',jp:'緊急事態を宣言する',desc:'エンジン故障'}
];
function atcScen(id,a){
  var up=function(s){return s.toUpperCase();};
  if(id==='taxi')return {id:id,fac:up(a.gnd),
    sit:atcFill('{0}の駐機場(スポット{1})にいます。出発の準備ができたので、地上管制に地上走行の許可をもらおう。',[a.jp,a.spot]),
    en:'The aircraft is parked at spot '+a.spot+' at '+a.name+' and ready for departure. The pilot must call you and request taxi. Give a taxi clearance to runway '+a.rd+', check the readback, then tell the pilot to contact '+a.twr+' on '+a.ft+' when holding short.',
    first:'',hint:a.gnd+', Babel 201, spot '+a.spot+', request taxi.'};
  if(id==='takeoff')return {id:id,fac:up(a.twr),
    sit:atcFill('滑走路{0}の手前で待機中です。管制塔の指示を正しく復唱して、離陸しよう。',[a.rd]),
    en:'The aircraft is holding short of runway '+a.rd+' at '+a.name+'. You have already told the pilot to line up and wait. Next, issue the takeoff clearance with the wind, check the readback, and after takeoff tell the pilot to contact '+a.dep+' on '+a.fd+'.',
    first:'Babel 201, '+a.twr+', runway '+a.rd+', line up and wait.',hint:'Line up and wait, runway '+a.rd+', Babel 201.'};
  if(id==='landing')return {id:id,fac:up(a.twr),
    sit:atcFill('{0}の滑走路{1}に向けて最終進入中(約8マイル手前)。管制塔に連絡して着陸の許可をもらおう。',[a.jp,a.ra]),
    en:'The aircraft is on final approach to runway '+a.ra+' at '+a.name+', about 8 miles out, and has just switched to your frequency. The pilot must check in. Give a landing clearance with the wind, check the readback, and after landing tell the pilot to vacate the runway and contact '+a.gnd+' on '+a.fg+'.',
    first:'',hint:a.twr+', Babel 201, ILS runway '+a.ra+', 8 miles final.'};
  if(id==='emergency')return {id:id,fac:up(a.dep),
    sit:atcFill('離陸して上昇中(高度5000フィート)に、エンジン1基が止まった！管制に緊急事態を宣言して、{0}に戻る許可をもらおう。',[a.jp]),
    en:'Shortly after departure from '+a.name+', climbing through 5000 feet, the aircraft has an engine failure. The pilot should declare an emergency (MAYDAY) and request to return. Acknowledge, ask for persons on board and fuel endurance, and give a heading and altitude for an approach to runway '+a.ra+'.',
    first:'',hint:'Mayday, mayday, mayday, '+a.dep+', Babel 201, engine failure, request return to '+a.name+'.'};
  return null;
}
/* the scenario list item: the station, then what it is about */
function atcBaseSub(b,a){var s=atcScen(b.id,a);return '<span translate="no">'+esc(s.fac)+'</span><span aria-hidden="true"> ・ </span><span>'+esc(atcFill(b.desc,[a.rd]))+'</span>';}
/* the instructions the AI gets for 強 */
function atcLocalRule(apt){
  var r=atcAccOf(apt)===2&&ATC_RESP[apt.acc];if(!r)return '';
  return 'Also write "atc_local": the same transmission respelled in '+r.s+', the way '+r.who+' air traffic controller with a typical accent pronounces English, so that a text-to-speech voice of that language reads it smoothly. Keep the same words and numbers and change only the spelling. Example: "Japan Air four five one, descend and maintain flight level one two zero." -> "'+r.ex+'"\n';
}
/* 空港 and 訛り, above the scenario list */
function atcSetHTML(){
  var L=save.lang,cur=atcApt(),acc=atcAccOf(cur),note;
  if(cur.noacc)note='中国語の声は準備中なので、今は普通の英語で話します。';
  else if(acc===0)note='普通の英語(アメリカ英語)で話します。';
  else if(!atcHasVoice(cur))note='この端末にこの国の言語の声がないので、普通の英語で読みます。声は端末の設定(読み上げコンテンツ)から追加できます。';
  else if(!cur.acc)note='この空港の管制官は、その地域の英語の発音で話します。';
  else if(acc===2)note='強: AIがその国の文字で書き直した英語を読むので、なめらかで本物っぽくなります。聞き取りは難しめ。';
  else note='弱: その国の言語の声が英語を読むので、その国の人のような訛りになります。';
  var segs=cur.acc?[[0,'なし'],[1,'弱'],[2,'強']]:[[0,'なし'],[1,'あり']];
  return '<div class="card atc-set"><span class="lbl">空港</span><div class="chips atc-apts">'+
    atcAptList(L).map(function(a){return '<button class="chip" type="button" data-atc-apt="'+a.id+'" aria-pressed="'+(a.id===cur.id)+'"><b translate="no">'+a.id+'</b> '+esc(a.jp)+'</button>';}).join('')+
    '</div><span class="lbl">訛り</span>'+(cur.noacc?'':seg('data-atc-acc',cur.acc?atcAccSet():Math.min(atcAccSet(),1),segs).replace('class="seg"',cur.acc?'class="seg"':'class="seg two"'))+'<p class="dim hint">'+note+'</p></div>';
}
function atcSetApt(id){
  if(!atcAptById(id))return;
  if(!save.atcApt||typeof save.atcApt!=='object')save.atcApt={};
  save.atcApt[save.lang]=id;store();render();
}
function atcSetAcc(n){
  n=parseInt(n,10);if(n!==0&&n!==1&&n!==2)return;
  save.atcAcc=n;store();render();
  atcSay({text:'Babel 201, radio check, read you five.',local:''});
}

/* ---- 現地の人と英語で話す (sc-local, e3h_local.js): the same accent for the people of each course's city ---- */
function isLocalSc(uid){return uid==='sc-local';}
/* the English-speaking display does not get these scenes: the task would be the answer itself */
function localOn(L){return UI!=='en'&&L!=='en'&&!!(UNITS[L]&&UNITS[L]['sc-local']);}
function scMeta(L,uid){var m=SCENE_META[uid]||{};if(isLocalSc(uid)&&typeof LOCAL_SC==='object'&&LOCAL_SC[L]){var o={},x=LOCAL_SC[L];Object.keys(m).forEach(function(k){o[k]=m[k];});o.jp=x.jp;o.role=x.role;o.ini=x.ini;o.sit=x.sit;return o;}return m;}
function localApt(L){return atcAptById(LANGS[L]&&LANGS[L].code)||atcAptById('HND');}
/* the local's line in that language's letters (for 強), by the line itself */
function localResp(L,text){
  var x=typeof LOCAL_SC==='object'&&LOCAL_SC[L],u=UNITS[L]&&UNITS[L]['sc-local'];if(!x||!x.resp||!x.resp.length||!u)return '';
  for(var i=0;i<u.turns.length;i++)if(u.turns[i].p===text)return x.resp[i]||'';
  return u.end&&u.end[0]===text?x.resp[u.turns.length]||'':'';
}
function localSay(L,text,slow){
  var apt=localApt(L),acc=atcAccOf(apt),code=atcVoiceCode(apt);
  if(acc>0&&!atcHasVoice(apt)){code='en-US';acc=0;}
  var loc=acc===2?localResp(L,text):'';
  speak(loc||text,code,slow,true);
}
/* 訛りの強さ in the scene's sheet */
function localAccHTML(L){
  var apt=localApt(L),segs=apt.acc?[[0,'なし'],[1,'弱'],[2,'強']]:[[0,'なし'],[1,'あり']];
  return '<div class="atc-set"><span class="lbl">訛りの強さ</span>'+(apt.noacc?'<p class="dim hint">中国語の声は準備中なので、今は普通の英語で話します。</p>':seg('data-local-acc',apt.acc?atcAccSet():Math.min(atcAccSet(),1),segs))+
    '<p class="dim hint">相手は英語で話し、あなたも英語で答えます。訛りの強さはAI管制官と同じ設定です。</p></div>';
}
function localSetAcc(n){
  n=parseInt(n,10);if(n!==0&&n!==1&&n!==2)return;
  save.atcAcc=n;store();openNodeSheet('sc-local');
  var u=UNITS[save.lang]&&UNITS[save.lang]['sc-local'];if(u)localSay(save.lang,u.turns[0].p);
}
