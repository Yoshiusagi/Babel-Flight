/* 表示言語: the few phrases written for a learner from Japan ("I'm Japanese", "I live in Tokyo", "a Japanese menu")
   are swapped for one from the display language's country: 한국어 → Korea / Seoul, 简体中文 → China / Beijing
   (English keeps Japan: an English speaker could be from anywhere). The dictionary (i18n/ko, i18n/zh) gives
   these meanings the same country. Per learning language, keyed by the original phrase:
   t = phrase, s = word split (languages without spaces), r = reading where it can't be made by code (pinyin),
   n = the note, written in the display language ('' drops it; no n keeps the original note). */
var UI_SWAP={
 ko:{
  en:{"Do you have any Japanese newspapers?":{t:"Do you have any Korean newspapers?"},
      "I'm from Japan.":{t:"I'm from Korea."},
      "I live in Tokyo.":{t:"I live in Seoul."}},
  es:{"Soy de Japón.":{t:"Soy de Corea."},
      "Soy japonés.":{t:"Soy coreano.",n:"여성은 \"coreana\". 국적도 성별에 따라 형태가 바뀌어요."},
      "Vivo en Tokio.":{t:"Vivo en Seúl."}},
  it:{"Vengo dal Giappone.":{t:"Vengo dalla Corea.",n:"\"dalla\" = ~에서(da+la). 전치사와 관사가 합쳐져요."},
      "Sono giapponese.":{t:"Sono coreano.",n:"여성은 \"coreana\"."},
      "Abito a Tokyo.":{t:"Abito a Seul."}},
  zh:{"我从日本来。":{t:"我从韩国来。",s:"我 从 韩国 来。",r:"wǒ cóng Hánguó lái"},
      "我是日本人。":{t:"我是韩国人。",s:"我 是 韩国人。",r:"wǒ shì Hánguórén"},
      "我住在东京。":{t:"我住在首尔。",s:"我 住在 首尔。",r:"wǒ zhù zài Shǒu'ěr"}},
  fr:{"Je viens du Japon.":{t:"Je viens de Corée."},
      "Je suis japonais.":{t:"Je suis coréen.",n:"여성은 \"coréenne\"라고 써요(읽는 법은 같아요)."},
      "J'habite à Tokyo.":{t:"J'habite à Séoul."}},
  de:{"Ich komme aus Japan.":{t:"Ich komme aus Korea.",n:""},
      "Ich bin Japaner.":{t:"Ich bin Koreaner.",n:"여성은 \"Koreanerin\"."},
      "Ich wohne in Tokio.":{t:"Ich wohne in Seoul.",n:""}},
  pt:{"Eu venho do Japão.":{t:"Eu venho da Coreia."},
      "Sou japonês.":{t:"Sou coreano.",n:"여성은 \"coreana\"."},
      "Moro em Tóquio.":{t:"Moro em Seul.",n:""}},
  ru:{"Я из Японии.":{t:"Я из Кореи."},
      "Я японец.":{t:"Я кореец.",n:"여성은 \"кореянка\"."},
      "Я живу в Токио.":{t:"Я живу в Сеуле."}},
  tr:{"Japonya'dan geldim.":{t:"Kore'den geldim."},
      "Japonum.":{t:"Koreliyim.",n:"\"Koreli\" = 한국인. \"-yim\" = 나는 ~예요."},
      "Tokyo'da yaşıyorum.":{t:"Seul'de yaşıyorum."}},
  id:{"Saya dari Jepang.":{t:"Saya dari Korea."},
      "Saya orang Jepang.":{t:"Saya orang Korea."},
      "Saya tinggal di Tokyo.":{t:"Saya tinggal di Seoul."}},
  ar:{"أنا من اليابان.":{t:"أنا من كوريا."},
      "أنا ياباني.":{t:"أنا كوري.",n:"여성은 \"كورية(쿠리야)\"."},
      "أسكن في طوكيو.":{t:"أسكن في سيول."}}
 },
 zh:{
  ko:{"일본어 메뉴 있어요?":{t:"중국어 메뉴 있어요?"},
      "일본에서 왔어요":{t:"중국에서 왔어요"},
      "저는 일본 사람이에요":{t:"저는 중국 사람이에요"},
      "도쿄에 살아요":{t:"베이징에 살아요"}},
  en:{"Do you have any Japanese newspapers?":{t:"Do you have any Chinese newspapers?"},
      "I'm from Japan.":{t:"I'm from China."},
      "I live in Tokyo.":{t:"I live in Beijing."}},
  es:{"Soy de Japón.":{t:"Soy de China."},
      "Soy japonés.":{t:"Soy chino.",n:"女性说 \"china\"。国籍的说法也会随性别变化。"},
      "Vivo en Tokio.":{t:"Vivo en Pekín."}},
  it:{"Vengo dal Giappone.":{t:"Vengo dalla Cina.",n:"\"dalla\" = 从(da+la)。介词和冠词会合在一起。"},
      "Sono giapponese.":{t:"Sono cinese."},
      "Abito a Tokyo.":{t:"Abito a Pechino."}},
  fr:{"Je viens du Japon.":{t:"Je viens de Chine."},
      "Je suis japonais.":{t:"Je suis chinois.",n:"女性写作 \"chinoise\"。"},
      "J'habite à Tokyo.":{t:"J'habite à Pékin."}},
  de:{"Ich komme aus Japan.":{t:"Ich komme aus China.",n:""},
      "Ich bin Japaner.":{t:"Ich bin Chinese.",n:"女性说 \"Chinesin\"。"},
      "Ich wohne in Tokio.":{t:"Ich wohne in Peking.",n:"德语里北京写作 \"Peking\"。"}},
  pt:{"Eu venho do Japão.":{t:"Eu venho da China."},
      "Sou japonês.":{t:"Sou chinês.",n:"女性说 \"chinesa\"。"},
      "Moro em Tóquio.":{t:"Moro em Pequim.",n:"葡萄牙语里北京写作 \"Pequim\"。"}},
  ru:{"Я из Японии.":{t:"Я из Китая."},
      "Я японец.":{t:"Я китаец.",n:"女性说 \"китаянка\"。"},
      "Я живу в Токио.":{t:"Я живу в Пекине."}},
  tr:{"Japonya'dan geldim.":{t:"Çin'den geldim."},
      "Japonum.":{t:"Çinliyim.",n:"\"Çinli\" = 中国人。\"-yim\" = 我是~。"},
      "Tokyo'da yaşıyorum.":{t:"Pekin'de yaşıyorum."}},
  id:{"Saya dari Jepang.":{t:"Saya dari Tiongkok."},
      "Saya orang Jepang.":{t:"Saya orang Tiongkok."},
      "Saya tinggal di Tokyo.":{t:"Saya tinggal di Beijing."}},
  ar:{"أنا من اليابان.":{t:"أنا من الصين."},
      "أنا ياباني.":{t:"أنا صيني.",n:"女性说 \"صينية\"(ṣīniyya)。"},
      "أسكن في طوكيو.":{t:"أسكن في بكين."}}
 }
};
/* applied once at start (the page reloads when the display language changes) */
/* 日本語 course (learnt from 한국어 / 简体中文): the learner's own country instead of the US (English keeps it) */
(function(){
  if(typeof JA_M!=='string')return;
  function J(o){var out={};Object.keys(o).forEach(function(k){var v=o[k];out[JA_M+k]={t:JA_M+v.t,r:v.r};if(v.s)out[JA_M+k].s=JA_M+v.s;});return out;}
  UI_SWAP.ko.ja=J({'アメリカ人です。':{t:'韓国人です。',r:'kankoku-jin desu'},'ニューヨークに住んでいます。':{t:'ソウルに住んでいます。',s:'ソウルに 住んで います。',r:'sōru ni sunde imasu'},
    'アメリカから来ました。':{t:'韓国から来ました。',s:'韓国から 来ました。',r:'kankoku kara kimashita'}});
  UI_SWAP.zh.ja=J({'アメリカ人です。':{t:'中国人です。',r:'chūgoku-jin desu'},'ニューヨークに住んでいます。':{t:'北京に住んでいます。',s:'北京に 住んで います。',r:'pekin ni sunde imasu'},
    'アメリカから来ました。':{t:'中国から来ました。',s:'中国から 来ました。',r:'chūgoku kara kimashita'}});
})();
function uiSwap(){
  var S=UI_SWAP[UI];if(!S)return;
  ORDER.forEach(function(L){
    var m=S[L],U=UNITS[L];if(!m||!U)return;
    Object.keys(U).forEach(function(u){(U[u].items||[]).forEach(function(it){
      var w=m[it.t];if(!w)return;
      it.t=w.t;if(w.s!==undefined||it.s)it.s=w.s||'';if(w.r!==undefined){it.r=w.r;it._r=w.r;}if(w.n!==undefined)it.n=w.n;
    });});
  });
}
