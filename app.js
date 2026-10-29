/* =========================================================
   Wortkarte · application logic
   Vanilla JS, no build step, all progress stored locally.
   ========================================================= */

"use strict";

const DAY_MS = 86_400_000;
const HOUR_MS = 3_600_000;
const MINUTE_MS = 60_000;
const STORAGE_KEY = "wortkarte.v2";
const WEEKLY_QUIZ_KEY = "wortkarte.quiz_current";
const WEEKLY_HISTORY_KEY = "wortkarte.quiz_history";
const REPEAT_LOG_KEY = "wortkarte.repeat_review_log";
const RING_SMALL = 2 * Math.PI * 51;
const RING_LARGE = 2 * Math.PI * 59;

const WEEKDAYS_DE = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const WEEKDAYS_DE_SHORT = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const WEEKDAYS_ZH = ["日", "一", "二", "三", "四", "五", "六"];
const MONTHS_DE = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

const POS_LABELS = {
  noun: "名词",
  verb: "动词",
  adj: "形容词",
  adv: "副词",
  other: "其他",
  unknown: "词性待补充"
};

// “其他”不再是一大桶：能确认的功能词、形容词、动词和短语分到更细的词性。
const FINE_POS_LABELS = {
  noun: "名词",
  verb: "动词",
  adj: "形容词",
  adv: "副词",
  prep: "介词",
  conj: "连词",
  pron: "代词",
  num: "数词",
  particle: "语气词",
  interj: "感叹词",
  phrase: "短语",
  other: "其他/待细分"
};

const FINE_POS_ORDER = ["all", "noun", "verb", "adj", "adv", "prep", "conj", "pron", "num", "particle", "interj", "phrase", "other"];

const FINE_PRONOUNS = new Set("ich du er sie es wir ihr mein dein sein unser euer sich mich dich uns euch mir dir ihm ihn ihnen dieser diese dieses jener jene jenes welcher welche welches wer was wem wen man jemand niemand etwas nichts alle alles beide einige mehrere manche jeder jede jedes jed welch dies ander aller beid einig manch".split(" "));
const FINE_PREPOSITIONS = new Set("an auf aus bei mit nach von zu in über unter vor hinter neben zwischen durch für gegen ohne um bis seit während wegen trotz statt außer ab entlang gegenüber innerhalb außerhalb diesseits jenseits laut gemäß dank mithilfe anhand aufgrund zugunsten pro".split(" "));
const FINE_CONJUNCTIONS = new Set("und oder aber sondern denn weil dass ob wenn als wie damit obwohl bevor nachdem seitdem sobald falls sofern indem sodass sowohl weder noch entweder".split(" "));
const FINE_PARTICLES = new Set("ja nein nicht mal eben halt wohl doch denn eigentlich überhaupt bitte danke".split(" "));
const FINE_NUMERALS = new Set("null eins zwei drei vier fünf sechs sieben acht neun zehn elf zwölf hundert tausend million millionen milliarde erste zweite dritte vierte fünfte sechste siebte achte neunte zehnte".split(" "));
const FINE_INTERJECTIONS = new Set("hallo tschüss tschüs danke bitte oh ah au hurra mist entschuldigung prost gesundheit".split(" "));
const FINE_ADJECTIVES = new Set("alt arm bekannt bequem berühmt bewölkt blond blöd bunt dick direkt dumm dunkel echt egal eigen eng faul fett falsch frei fremd froh früh ganz genau gesund gleich groß günstig gut hart heiß hoch intelligent interessant international jung kalt kaputt klar klug kühl lang laut leer leicht lieb nett neu nass nervös online preiswert privat reich rund sauber sauer schade scharf schlecht schlimm schwach schwanger schwer sicher stark streng süß super teuer tief toll tot total verheiratet wach wahr warm weich weit wichtig wild zufrieden".split(" "));
const FINE_VERBS = new Set("ausmachen bedanken beeilen begrüßen beschweren besuchen bewerben brauchen buchen duschen erreichen erinnern freuen informieren interessieren kochen kümmern lachen rauchen riechen schneiden sprechen streiten suchen treffen tun unterhalten untersuchen verbieten vergleichen verletzen verlieben versuchen waschen wünschen ärgern".split(" "));
const FINE_ADVERBS = new Set("bald besonders damals danach dort draußen drinnen früher gerade geradeaus gern gleich heute hier immer jetzt lange leider manchmal meistens mindestens nirgends oft rechts so sofort später überall vorbei vorher vorn vorwärts wieder zuerst zuletzt zurück zurzeit".split(" "));

function classifyFinePos(word) {
  const base = String(word.pos || "").toLowerCase();
  if (base && base !== "other" && base !== "unknown") return base;
  if (word.article) return "noun";
  const value = String(word.word || "").trim();
  if (!value) return "other";
  if (/\s/.test(value)) return "phrase";
  const lower = value.toLowerCase();
  const forms = String(word.forms || "");
  if (/\b(hat|ist|sind|haben)\b/i.test(forms) || /,\s*\w+te\b/.test(forms)) return "verb";
  if (/^am\s+\S+(sten|esten)$/i.test(forms)) return "adj";
  if (FINE_PRONOUNS.has(lower)) return "pron";
  if (FINE_PREPOSITIONS.has(lower)) return "prep";
  if (FINE_CONJUNCTIONS.has(lower)) return "conj";
  if (FINE_PARTICLES.has(lower)) return "particle";
  if (FINE_NUMERALS.has(lower)) return "num";
  if (FINE_INTERJECTIONS.has(lower)) return "interj";
  if (FINE_ADJECTIVES.has(lower)) return "adj";
  if (FINE_VERBS.has(lower)) return "verb";
  if (FINE_ADVERBS.has(lower)) return "adv";
  if (/-ieren$/.test(lower)) return "verb";
  if (/^[a-zäöüß].*(en|ern|eln)$/.test(lower)) return "verb";
  if (/^[A-ZÄÖÜ]/.test(value)) return "noun";
  if (/(lich|ig|isch|bar|sam|los|voll|haft|al|ell|iv|ant|ent)$/.test(lower)) return "adj";
  return "other";
}

const MASTERY_ORDER = ["unmastered", "forgotten", "shaky", "mastered"];

// 四档掌握度用于旧的统计/筛选展示；新的调度以 0–5 level 为准。
const MASTERY_META = {
  unmastered: { label: "未掌握", short: "未掌握", cls: "status-new", days: 10 / 1440, hint: "10 分钟后重推" },
  forgotten: { label: "遗忘", short: "遗忘", cls: "status-learning", days: 1, hint: "1 天后重推" },
  shaky: { label: "较生疏", short: "较生疏", cls: "status-due", days: 3, hint: "3 天后重推" },
  mastered: { label: "熟练", short: "熟练", cls: "status-mastered", days: 14, hint: "14 天后复习" }
};

const STATUS_META = {
  ...MASTERY_META,
  new: { label: "未学习", cls: "status-new" },
  due: { label: "今天到期", cls: "status-due" }
};

// 0–5 掌握度：0 完全没印象，5 自评掌握；最终 level 由自评上限与三形式实测共同决定。
const LEVEL_META = [
  { label: "0 · 没印象", short: "0", hint: "立即重推" },
  { label: "1 · 见过", short: "1", hint: "5 分钟后" },
  { label: "2 · 有印象", short: "2", hint: "1 小时后" },
  { label: "3 · 认识", short: "3", hint: "1 天后" },
  { label: "4 · 熟悉", short: "4", hint: "3 天后" },
  { label: "5 · 掌握", short: "5", hint: "7 天后" }
];
const LEVEL_REASON_LABEL = {
  self: "自评起点",
  wrong: "因答错降低",
  testing: "等待三种形式全部通过"
};
const REVIEW_ENGINE = window.WortkarteReview || null;

const TOPIC_MAP = Object.fromEntries(TOPICS.map(topic => [topic.id, topic]));
const TEXTBOOK_WORDS = (window.WORTKARTE_TEXTBOOK && Array.isArray(window.WORTKARTE_TEXTBOOK.words))
  ? window.WORTKARTE_TEXTBOOK.words
  : [];
const GRAMMAR_DATA = (typeof GRAMMAR_TOPICS !== "undefined" && Array.isArray(GRAMMAR_TOPICS))
  ? GRAMMAR_TOPICS
  : [];
const GRAMMAR_SUMMARY_DATA = (window.GRAMMAR_SUMMARY && Array.isArray(window.GRAMMAR_SUMMARY.chapters))
  ? window.GRAMMAR_SUMMARY
  : null;
const BASE_CHANGELOG = Array.isArray(window.WORTKARTE_CHANGELOG) ? window.WORTKARTE_CHANGELOG : [];
const OCR_CHANGELOG = Array.isArray(window.WORTKARTE_OCR_CHANGELOG) ? window.WORTKARTE_OCR_CHANGELOG : [];
const CHANGELOG_DATA = [...BASE_CHANGELOG, ...OCR_CHANGELOG];
const CHANGELOG_SUMMARY = Array.isArray(window.WORTKARTE_CHANGELOG_SUMMARY) ? window.WORTKARTE_CHANGELOG_SUMMARY : [];
const CULTURE_BASE = window.WORTKARTE_CULTURE && Array.isArray(window.WORTKARTE_CULTURE.items)
  ? window.WORTKARTE_CULTURE
  : { categories: [], items: [] };
const CULTURE_EXTRA = window.WORTKARTE_CULTURE_4500 && Array.isArray(window.WORTKARTE_CULTURE_4500.items)
  ? window.WORTKARTE_CULTURE_4500
  : { items: [] };
const CULTURE_8250 = window.WORTKARTE_CULTURE_8250 && Array.isArray(window.WORTKARTE_CULTURE_8250.items)
  ? window.WORTKARTE_CULTURE_8250
  : { items: [] };
const CULTURE_9750 = window.WORTKARTE_CULTURE_9750 && Array.isArray(window.WORTKARTE_CULTURE_9750.items)
  ? window.WORTKARTE_CULTURE_9750
  : { items: [] };
const CULTURE_11250 = window.WORTKARTE_CULTURE_11250 && Array.isArray(window.WORTKARTE_CULTURE_11250.items)
  ? window.WORTKARTE_CULTURE_11250
  : { items: [] };
const CULTURE_DATA = {
  ...CULTURE_BASE,
  items: [...(CULTURE_BASE.items || []), ...(CULTURE_EXTRA.items || []), ...(CULTURE_8250.items || []), ...(CULTURE_9750.items || []), ...(CULTURE_11250.items || [])]
};
const MAP_DATA = window.WORTKARTE_MAP && Array.isArray(window.WORTKARTE_MAP.countries)
  ? window.WORTKARTE_MAP
  : null;
const GERMANY_STATES = window.WORTKARTE_GERMANY_STATES && Array.isArray(window.WORTKARTE_GERMANY_STATES.states)
  ? window.WORTKARTE_GERMANY_STATES
  : null;
const GERMANY_STATE_INFO = window.WORTKARTE_GERMANY_STATE_INFO || {};
const FESTIVAL_DATA = window.WORTKARTE_FESTIVALS && Array.isArray(window.WORTKARTE_FESTIVALS.items)
  ? window.WORTKARTE_FESTIVALS
  : { months: [], items: [] };

// 词汇书中的确认例句：仅在原例句来自文章时替换，已有可靠例句保持不动。
const WORDBOOK_EXAMPLES = {
  Flughafen: { example: "Der Flughafen liegt außerhalb der Stadt.", exampleZh: "机场在城市外。", source: "Wortkarte 原创例句" },
  Zoll: { example: "Am Zoll müssen Sie den Koffer öffnen.", exampleZh: "在海关您必须打开箱子。", source: "Wortkarte 原创例句" },
  heißen: { example: "Wie heißen Sie?", exampleZh: "您叫什么名字？", source: "Wortkarte 原创例句" },
  kommen: { example: "Ich komme aus China.", exampleZh: "我来自中国。", source: "Wortkarte 原创例句" },
  Koffer: { example: "Mein Koffer ist zu schwer.", exampleZh: "我的箱子太重了。", source: "Wortkarte 原创例句" },
  gut: { example: "Das Essen ist sehr gut.", exampleZh: "饭菜很好。", source: "Wortkarte 原创例句" },
  Pass: { example: "Bitte zeigen Sie Ihren Pass.", exampleZh: "请出示您的护照。", source: "Wortkarte 原创例句" },
  Vorname: { example: "Mein Vorname ist Li.", exampleZh: "我的名字是李。", source: "Wortkarte 原创例句" },
  Familienname: { example: "Mein Familienname ist Wang.", exampleZh: "我姓王。", source: "Wortkarte 原创例句" },
  Entschuldigung: { example: "Entschuldigung, wo ist der Bahnhof?", exampleZh: "打扰一下，火车站在哪里？", source: "Wortkarte 原创例句" },
  wie: { example: "Wie geht es dir?", exampleZh: "你好吗？", source: "Wortkarte 原创例句" },
  Kleidung: { example: "Diese Kleidung ist bequem.", exampleZh: "这件衣服很舒服。", source: "Wortkarte 原创例句" },
  Buch: { example: "Das Buch ist interessant.", exampleZh: "这本书很有趣。", source: "Wortkarte 原创例句" },
  Anrede: { example: "Die Anrede „Sie“ ist höflich.", exampleZh: "“Sie”这个称呼很礼貌。", source: "Wortkarte 原创例句" },
  Frau: { example: "Die Frau liest ein Buch.", exampleZh: "这位女士在读书。", source: "Wortkarte 原创例句" },
  lernen: { example: "Ich lerne jeden Tag Deutsch.", exampleZh: "我每天学德语。", source: "Wortkarte 原创例句" },
  öffnen: { example: "Bitte öffnen Sie das Fenster.", exampleZh: "请打开窗户。", source: "Wortkarte 原创例句" },
  wissen: { example: "Ich weiß die Antwort nicht.", exampleZh: "我不知道答案。", source: "Wortkarte 原创例句" },
  werden: { example: "Es wird kalt.", exampleZh: "天变冷了。", source: "Wortkarte 原创例句" },
  Land: { example: "Deutschland ist ein Land in Europa.", exampleZh: "德国是欧洲的一个国家。", source: "Wortkarte 原创例句" },
  Mutter: { example: "Meine Mutter kocht heute.", exampleZh: "我妈妈今天做饭。", source: "Wortkarte 原创例句" },
  Opa: { example: "Mein Opa ist achtzig Jahre alt.", exampleZh: "我爷爷八十岁。", source: "Wortkarte 原创例句" },
  Oma: { example: "Meine Oma wohnt in Beijing.", exampleZh: "我奶奶住在北京。", source: "Wortkarte 原创例句" },
  Name: { example: "Mein Name ist Anna.", exampleZh: "我叫安娜。", source: "Wortkarte 原创例句" },
  jetzt: { example: "Ich muss jetzt gehen.", exampleZh: "我现在得走了。", source: "Wortkarte 原创例句" },
  fahren: { example: "Wir fahren morgen nach Berlin.", exampleZh: "我们明天去柏林。", source: "Wortkarte 原创例句" },
  Lehrer: { example: "Der Lehrer erklärt die Grammatik.", exampleZh: "老师在讲语法。", source: "Wortkarte 原创例句" },
  schon: { example: "Ich habe schon gegessen.", exampleZh: "我已经吃过了。", source: "Wortkarte 原创例句" },
  lesen: { example: "Sie liest gern Romane.", exampleZh: "她喜欢读小说。", source: "Wortkarte 原创例句" },
  sehen: { example: "Ich sehe einen Vogel.", exampleZh: "我看见一只鸟。", source: "Wortkarte 原创例句" },
  sprechen: { example: "Sprechen Sie Deutsch?", exampleZh: "您说德语吗？", source: "Wortkarte 原创例句" },
  Zeitung: { example: "Er liest jeden Morgen die Zeitung.", exampleZh: "他每天早上读报。", source: "Wortkarte 原创例句" },
  lange: { example: "Ich warte schon lange.", exampleZh: "我等了很久。", source: "Wortkarte 原创例句" },
  Sofa: { example: "Das Sofa ist sehr bequem.", exampleZh: "沙发很舒服。", source: "Wortkarte 原创例句" },
  Foto: { example: "Das Foto zeigt meine Familie.", exampleZh: "这张照片是我家人。", source: "Wortkarte 原创例句" },
  Flugzeug: { example: "Das Flugzeug landet um acht Uhr.", exampleZh: "飞机八点降落。", source: "Wortkarte 原创例句" },
  richtig: { example: "Die Antwort ist richtig.", exampleZh: "答案正确。", source: "Wortkarte 原创例句" },
  noch: { example: "Ich habe noch Zeit.", exampleZh: "我还有时间。", source: "Wortkarte 原创例句" },
  nicht: { example: "Das ist nicht mein Buch.", exampleZh: "这不是我的书。", source: "Wortkarte 原创例句" },
  Herr: { example: "Herr Müller ist mein Lehrer.", exampleZh: "米勒先生是我的老师。", source: "Wortkarte 原创例句" },
  trinken: { example: "Ich trinke gern Tee.", exampleZh: "我喜欢喝茶。", source: "Wortkarte 原创例句" },
  essen: { example: "Wir essen um sieben Uhr.", exampleZh: "我们七点吃饭。", source: "Wortkarte 原创例句" },
  gehen: { example: "Ich gehe jetzt nach Hause.", exampleZh: "我现在回家。", source: "Wortkarte 原创例句" },
  wohnen: { example: "Sie wohnt in Berlin.", exampleZh: "她住在柏林。", source: "Wortkarte 原创例句" },
  arbeiten: { example: "Er arbeitet bei einer Bank.", exampleZh: "他在银行工作。", source: "Wortkarte 原创例句" },
  spielen: { example: "Die Kinder spielen im Garten.", exampleZh: "孩子们在花园玩。", source: "Wortkarte 原创例句" },
  kaufen: { example: "Ich kaufe Milch und Brot.", exampleZh: "我买牛奶和面包。", source: "Wortkarte 原创例句" },
  bezahlen: { example: "Wir möchten getrennt bezahlen.", exampleZh: "我们想分开付。", source: "Wortkarte 原创例句" },
  verstehen: { example: "Ich verstehe die Frage nicht.", exampleZh: "我不懂这个问题。", source: "Wortkarte 原创例句" },
  gefallen: { example: "Das Buch gefällt mir.", exampleZh: "我喜欢这本书。", source: "Wortkarte 原创例句" },
  brauchen: { example: "Wir brauchen mehr Zeit.", exampleZh: "我们需要更多时间。", source: "Wortkarte 原创例句" },
  finden: { example: "Ich finde den Weg nicht.", exampleZh: "我找不到路。", source: "Wortkarte 原创例句" },
  sagen: { example: "Was hast du gesagt?", exampleZh: "你说了什么？", source: "Wortkarte 原创例句" },
  fragen: { example: "Darf ich dich etwas fragen?", exampleZh: "我可以问你一件事吗？", source: "Wortkarte 原创例句" },
  antworten: { example: "Er antwortet nicht.", exampleZh: "他不回答。", source: "Wortkarte 原创例句" },
  bleiben: { example: "Wir bleiben heute zu Hause.", exampleZh: "我们今天待在家里。", source: "Wortkarte 原创例句" },
  bekommen: { example: "Sie bekommt einen Brief.", exampleZh: "她收到一封信。", source: "Wortkarte 原创例句" },
  bringen: { example: "Bring mir bitte Wasser.", exampleZh: "请给我拿水。", source: "Wortkarte 原创例句" },
  denken: { example: "Ich denke an dich.", exampleZh: "我在想你。", source: "Wortkarte 原创例句" },
  groß: { example: "Berlin ist eine große Stadt.", exampleZh: "柏林是一座大城市。", source: "Wortkarte 原创例句" },
  alt: { example: "Mein Fahrrad ist schon alt.", exampleZh: "我的自行车很旧了。", source: "Wortkarte 原创例句" },
  jung: { example: "Sie ist noch jung.", exampleZh: "她还年轻。", source: "Wortkarte 原创例句" },
  neu: { example: "Ich habe ein neues Handy.", exampleZh: "我有一部新手机。", source: "Wortkarte 原创例句" },
  schön: { example: "Der Garten ist sehr schön.", exampleZh: "花园很美。", source: "Wortkarte 原创例句" },
  langsam: { example: "Bitte sprechen Sie langsam.", exampleZh: "请说慢一点。", source: "Wortkarte 原创例句" },
  kalt: { example: "Im Winter ist es kalt.", exampleZh: "冬天很冷。", source: "Wortkarte 原创例句" },
  teuer: { example: "Das Hotel ist zu teuer.", exampleZh: "这家酒店太贵了。", source: "Wortkarte 原创例句" },
  leise: { example: "Sprich bitte leise.", exampleZh: "请轻声说话。", source: "Wortkarte 原创例句" },
  dunkel: { example: "Im Zimmer ist es dunkel.", exampleZh: "房间里很暗。", source: "Wortkarte 原创例句" },
  Dorf: { example: "Das Dorf liegt am Fluss.", exampleZh: "村庄在河边。", source: "Wortkarte 原创例句" },
  Straße: { example: "Die Straße ist sehr breit.", exampleZh: "这条街很宽。", source: "Wortkarte 原创例句" },
  Zimmer: { example: "Mein Zimmer ist klein.", exampleZh: "我的房间很小。", source: "Wortkarte 原创例句" },
  Küche: { example: "In der Küche riecht es gut.", exampleZh: "厨房里很香。", source: "Wortkarte 原创例句" },
  Garten: { example: "Im Garten wachsen Blumen.", exampleZh: "花园里长着花。", source: "Wortkarte 原创例句" },
  Balkon: { example: "Wir frühstücken auf dem Balkon.", exampleZh: "我们在阳台上吃早饭。", source: "Wortkarte 原创例句" },
  Bett: { example: "Das Bett ist bequem.", exampleZh: "床很舒服。", source: "Wortkarte 原创例句" },
  Tisch: { example: "Das Buch liegt auf dem Tisch.", exampleZh: "书在桌上。", source: "Wortkarte 原创例句" },
  Unterricht: { example: "Der Unterricht beginnt um acht Uhr.", exampleZh: "课程八点开始。", source: "Wortkarte 原创例句" },
  Bruder: { example: "Mein Bruder studiert in Berlin.", exampleZh: "我哥哥在柏林学习。", source: "Wortkarte 原创例句" },
  Schwester: { example: "Meine Schwester ist Ärztin.", exampleZh: "我姐姐是医生。", source: "Wortkarte 原创例句" },
  Beruf: { example: "Was ist Ihr Beruf?", exampleZh: "您的职业是什么？", source: "Wortkarte 原创例句" },
  Mann: { example: "Der Mann wartet vor der Tür.", exampleZh: "那个男人在门口等。", source: "Wortkarte 原创例句" },
  Arzt: { example: "Ich muss zum Arzt gehen.", exampleZh: "我得去看医生。", source: "Wortkarte 原创例句" },
  Verkäufer: { example: "Der Verkäufer berät die Kundin.", exampleZh: "售货员给顾客建议。", source: "Wortkarte 原创例句" },
  Student: { example: "Der Student lernt jeden Tag.", exampleZh: "这个大学生每天学习。", source: "Wortkarte 原创例句" },
  ledig: { example: "Sie ist noch ledig.", exampleZh: "她还没结婚。", source: "Wortkarte 原创例句" },
  Partner: { example: "Mein Partner kocht gern.", exampleZh: "我的伴侣喜欢做饭。", source: "Wortkarte 原创例句" },
  Wasser: { example: "Ich trinke viel Wasser.", exampleZh: "我喝很多水。", source: "Wortkarte 原创例句" },
  Vater: { example: "Mein Vater arbeitet im Büro.", exampleZh: "我爸爸在办公室工作。", source: "Wortkarte 原创例句" },
  suchen: { example: "Ich suche meinen Schlüssel.", exampleZh: "我在找钥匙。", source: "Wortkarte 原创例句" },
  Mädchen: { example: "Das Mädchen spielt im Park.", exampleZh: "小女孩在公园玩。", source: "Wortkarte 原创例句" },
  lieben: { example: "Ich liebe meine Familie.", exampleZh: "我爱我的家人。", source: "Wortkarte 原创例句" },
  Fahrrad: { example: "Mein Fahrrad ist neu.", exampleZh: "我的自行车是新的。", source: "Wortkarte 原创例句" },
  Auto: { example: "Das Auto steht vor dem Haus.", exampleZh: "车停在房子前。", source: "Wortkarte 原创例句" },
  Bleistift: { example: "Ich schreibe mit einem Bleistift.", exampleZh: "我用铅笔写。", source: "Wortkarte 原创例句" },
  Uhr: { example: "Die Uhr zeigt drei Uhr.", exampleZh: "钟显示三点。", source: "Wortkarte 原创例句" },
  holen: { example: "Ich hole schnell Brot.", exampleZh: "我快去拿面包。", source: "Wortkarte 原创例句" },
  Schule: { example: "Die Schule beginnt um acht Uhr.", exampleZh: "学校八点开始上课。", source: "Wortkarte 原创例句" },
  Kugelschreiber: { example: "Kann ich deinen Kugelschreiber benutzen?", exampleZh: "我能用你的圆珠笔吗？", source: "Wortkarte 原创例句" },
  Hausaufgabe: { example: "Ich mache meine Hausaufgaben.", exampleZh: "我在做作业。", source: "Wortkarte 原创例句" },
  schreiben: { example: "Ich schreibe einen Brief.", exampleZh: "我在写信。", source: "Wortkarte 原创例句" },
  Satz: { example: "Der Satz ist zu lang.", exampleZh: "这个句子太长了。", source: "Wortkarte 原创例句" },
  Schüler: { example: "Die Schüler warten auf den Lehrer.", exampleZh: "学生们在等老师。", source: "Wortkarte 原创例句" },
  liegen: { example: "Das Buch liegt auf dem Tisch.", exampleZh: "书在桌上。", source: "Wortkarte 原创例句" },
  Tasche: { example: "Meine Tasche ist schwer.", exampleZh: "我的包很重。", source: "Wortkarte 原创例句" },
  Million: { example: "Die Stadt hat eine Million Einwohner.", exampleZh: "这座城市有一百万居民。", source: "Wortkarte 原创例句" },
  Bier: { example: "Er trinkt ein Bier.", exampleZh: "他喝一杯啤酒。", source: "Wortkarte 原创例句" },
  Milch: { example: "Ich kaufe eine Flasche Milch.", exampleZh: "我买一瓶牛奶。", source: "Wortkarte 原创例句" },
  Flasche: { example: "Die Flasche ist leer.", exampleZh: "瓶子空了。", source: "Wortkarte 原创例句" },
  Geld: { example: "Ich habe kein Geld dabei.", exampleZh: "我没带钱。", source: "Wortkarte 原创例句" },
  Hunger: { example: "Ich habe großen Hunger.", exampleZh: "我很饿。", source: "Wortkarte 原创例句" },
  Durst: { example: "Hast du Durst?", exampleZh: "你渴吗？", source: "Wortkarte 原创例句" },
  gleich: { example: "Ich komme gleich.", exampleZh: "我马上来。", source: "Wortkarte 原创例句" },
  vielleicht: { example: "Vielleicht kommt er später.", exampleZh: "他也许晚点来。", source: "Wortkarte 原创例句" },
  kaputt: { example: "Mein Handy ist kaputt.", exampleZh: "我的手机坏了。", source: "Wortkarte 原创例句" },
  erzählen: { example: "Erzähl mir eine Geschichte.", exampleZh: "给我讲个故事。", source: "Wortkarte 原创例句" },
  tot: { example: "Die Pflanze ist tot.", exampleZh: "这株植物死了。", source: "Wortkarte 原创例句" },
  oft: { example: "Er kommt oft zu spät.", exampleZh: "他经常迟到。", source: "Wortkarte 原创例句" },
  sehr: { example: "Das ist sehr wichtig.", exampleZh: "这很重要。", source: "Wortkarte 原创例句" },
  Großmutter: { example: "Meine Großmutter wohnt auf dem Land.", exampleZh: "我祖母住在乡下。", source: "Wortkarte 原创例句" },
  Großvater: { example: "Mein Großvater erzählt gern.", exampleZh: "我祖父喜欢讲故事。", source: "Wortkarte 原创例句" },
  Ehemann: { example: "Ihr Ehemann arbeitet in Hamburg.", exampleZh: "她丈夫在汉堡工作。", source: "Wortkarte 原创例句" },
  Ehefrau: { example: "Seine Ehefrau ist Lehrerin.", exampleZh: "他妻子是老师。", source: "Wortkarte 原创例句" },
  Hausfrau: { example: "Sie ist Hausfrau und Mutter.", exampleZh: "她是家庭主妇和母亲。", source: "Wortkarte 原创例句" },
  Samstag: { example: "Am Samstag gehen wir einkaufen.", exampleZh: "周六我们去购物。", source: "Wortkarte 原创例句" },
  Obst: { example: "Ich esse jeden Tag Obst.", exampleZh: "我每天吃水果。", source: "Wortkarte 原创例句" },
  wieder: { example: "Er kommt morgen wieder.", exampleZh: "他明天再来。", source: "Wortkarte 原创例句" },
  Gemüse: { example: "Ich kaufe frisches Gemüse.", exampleZh: "我买新鲜蔬菜。", source: "Wortkarte 原创例句" },
  Fleisch: { example: "Er isst kein Fleisch.", exampleZh: "他不吃肉。", source: "Wortkarte 原创例句" },
  Kartoffel: { example: "Die Kartoffeln sind noch heiß.", exampleZh: "土豆还很烫。", source: "Wortkarte 原创例句" },
  Salz: { example: "Gib mir bitte das Salz.", exampleZh: "请把盐给我。", source: "Wortkarte 原创例句" },
  Kuchen: { example: "Der Kuchen schmeckt gut.", exampleZh: "蛋糕很好吃。", source: "Wortkarte 原创例句" },
  Tee: { example: "Möchtest du Tee oder Kaffee?", exampleZh: "你想喝茶还是咖啡？", source: "Wortkarte 原创例句" },
  Reis: { example: "Wir essen Reis mit Gemüse.", exampleZh: "我们吃米饭配蔬菜。", source: "Wortkarte 原创例句" },
  Kaffee: { example: "Ich trinke morgens Kaffee.", exampleZh: "我早上喝咖啡。", source: "Wortkarte 原创例句" },
  Saft: { example: "Der Saft ist frisch gepresst.", exampleZh: "果汁是鲜榨的。", source: "Wortkarte 原创例句" },
  Apfel: { example: "Sie isst einen Apfel.", exampleZh: "她吃一个苹果。", source: "Wortkarte 原创例句" },
  Pfund: { example: "Ich kaufe ein Pfund Tomaten.", exampleZh: "我买一磅西红柿。", source: "Wortkarte 原创例句" },
  klar: { example: "Die Antwort ist klar.", exampleZh: "答案很清楚。", source: "Wortkarte 原创例句" },
  Butter: { example: "Die Butter ist im Kühlschrank.", exampleZh: "黄油在冰箱里。", source: "Wortkarte 原创例句" },
  Tomate: { example: "Die Tomaten sind rot.", exampleZh: "西红柿是红的。", source: "Wortkarte 原创例句" },
  Ei: { example: "Ich esse ein Ei zum Frühstück.", exampleZh: "我早餐吃一个鸡蛋。", source: "Wortkarte 原创例句" },
  Fisch: { example: "Der Fisch ist frisch.", exampleZh: "鱼很新鲜。", source: "Wortkarte 原创例句" },
  Brot: { example: "Ich kaufe Brot beim Bäcker.", exampleZh: "我在面包店买面包。", source: "Wortkarte 原创例句" },
  Getränk: { example: "Welches Getränk möchten Sie?", exampleZh: "您想要什么饮料？", source: "Wortkarte 原创例句" },
  Glas: { example: "Ein Glas Wasser, bitte.", exampleZh: "请来一杯水。", source: "Wortkarte 原创例句" },
  Gramm: { example: "Das Fleisch wiegt 500 Gramm.", exampleZh: "肉重500克。", source: "Wortkarte 原创例句" },
  Papier: { example: "Ich brauche ein Blatt Papier.", exampleZh: "我需要一张纸。", source: "Wortkarte 原创例句" },
  Frage: { example: "Ich habe eine Frage.", exampleZh: "我有一个问题。", source: "Wortkarte 原创例句" },
  leider: { example: "Leider habe ich keine Zeit.", exampleZh: "很遗憾我没时间。", source: "Wortkarte 原创例句" },
  billig: { example: "Das ist zu billig.", exampleZh: "这太便宜了。", source: "Wortkarte 原创例句" },
  zusammen: { example: "Wir lernen zusammen.", exampleZh: "我们一起学习。", source: "Wortkarte 原创例句" },
  gerade: { example: "Ich bin gerade angekommen.", exampleZh: "我刚到。", source: "Wortkarte 原创例句" },
  Kasse: { example: "Bitte zahlen Sie an der Kasse.", exampleZh: "请在收银台付款。", source: "Wortkarte 原创例句" },
  wollen: { example: "Wir wollen ins Kino gehen.", exampleZh: "我们想去看电影。", source: "Wortkarte 原创例句" },
  Plan: { example: "Was ist der Plan für heute?", exampleZh: "今天的计划是什么？", source: "Wortkarte 原创例句" },
  müssen: { example: "Ich muss jetzt gehen.", exampleZh: "我现在得走了。", source: "Wortkarte 原创例句" },
  dürfen: { example: "Darf ich hereinkommen?", exampleZh: "我可以进来吗？", source: "Wortkarte 原创例句" },
  können: { example: "Kannst du schwimmen?", exampleZh: "你会游泳吗？", source: "Wortkarte 原创例句" },
  sollen: { example: "Du sollst mehr schlafen.", exampleZh: "你应该多睡觉。", source: "Wortkarte 原创例句" },
  rauchen: { example: "Hier darf man nicht rauchen.", exampleZh: "这里禁止吸烟。", source: "Wortkarte 原创例句" },
  anrufen: { example: "Ich rufe dich später an.", exampleZh: "我晚点给你打电话。", source: "Wortkarte 原创例句" },
  kochen: { example: "Sie kocht heute Suppe.", exampleZh: "她今天煮汤。", source: "Wortkarte 原创例句" },
  Zigarette: { example: "Er raucht eine Zigarette.", exampleZh: "他抽一支烟。", source: "Wortkarte 原创例句" },
  viel: { example: "Ich habe viel Arbeit.", exampleZh: "我有很多工作。", source: "Wortkarte 原创例句" },
  Klasse: { example: "Die Klasse hat 25 Schüler.", exampleZh: "这个班有25名学生。", source: "Wortkarte 原创例句" },
  Mensch: { example: "Der Mensch braucht Schlaf.", exampleZh: "人需要睡眠。", source: "Wortkarte 原创例句" },
  Nachmittag: { example: "Am Nachmittag habe ich einen Termin.", exampleZh: "下午我有个约会。", source: "Wortkarte 原创例句" },
  Praxis: { example: "Die Praxis öffnet um acht Uhr.", exampleZh: "诊所八点开门。", source: "Wortkarte 原创例句" },
  telefonieren: { example: "Ich telefoniere mit meiner Mutter.", exampleZh: "我在和我妈妈打电话。", source: "Wortkarte 原创例句" },
  Donnerstag: { example: "Am Donnerstag fahre ich nach Berlin.", exampleZh: "周四我去柏林。", source: "Wortkarte 原创例句" },
  Vormittag: { example: "Am Vormittag arbeite ich.", exampleZh: "上午我工作。", source: "Wortkarte 原创例句" },
  Montag: { example: "Der Kurs beginnt am Montag.", exampleZh: "课程周一开始。", source: "Wortkarte 原创例句" },
  Morgen: { example: "Der Morgen ist kühl.", exampleZh: "早晨很凉。", source: "Wortkarte 原创例句" },
  Mittag: { example: "Zu Mittag esse ich in der Kantine.", exampleZh: "中午我在食堂吃饭。", source: "Wortkarte 原创例句" },
  Abend: { example: "Am Abend lese ich.", exampleZh: "晚上我读书。", source: "Wortkarte 原创例句" },
  Kollege: { example: "Mein Kollege hilft mir.", exampleZh: "我的同事帮我。", source: "Wortkarte 原创例句" },
  Kino: { example: "Wir gehen ins Kino.", exampleZh: "我们去看电影。", source: "Wortkarte 原创例句" },
  Banane: { example: "Die Bananen sind reif.", exampleZh: "香蕉熟了。", source: "Wortkarte 原创例句" },
  Salat: { example: "Ich esse einen grünen Salat.", exampleZh: "我吃一份蔬菜沙拉。", source: "Wortkarte 原创例句" },
  Liter: { example: "Wir brauchen zwei Liter Wasser.", exampleZh: "我们需要两升水。", source: "Wortkarte 原创例句" },
  Milliarde: { example: "Die Weltbevölkerung liegt über acht Milliarden.", exampleZh: "世界人口超过八十亿。", source: "Wortkarte 原创例句" },
  Preis: { example: "Der Preis ist zu hoch.", exampleZh: "价格太高了。", source: "Wortkarte 原创例句" },
  Wochenende: { example: "Am Wochenende fahren wir weg.", exampleZh: "周末我们出去。", source: "Wortkarte 原创例句" },
  Angebot: { example: "Das Angebot gilt bis Freitag.", exampleZh: "优惠到周五有效。", source: "Wortkarte 原创例句" },
  Durchsage: { example: "Die Durchsage war nicht klar.", exampleZh: "广播不清楚。", source: "Wortkarte 原创例句" },
  Freitag: { example: "Am Freitag habe ich frei.", exampleZh: "周五我休息。", source: "Wortkarte 原创例句" },
  empfehlen: { example: "Können Sie mir ein Gericht empfehlen?", exampleZh: "您能给我推荐一道菜吗？", source: "Wortkarte 原创例句" },
  Party: { example: "Am Samstag machen wir eine Party.", exampleZh: "周六我们办派对。", source: "Wortkarte 原创例句" },
  Problem: { example: "Das ist kein großes Problem.", exampleZh: "这不是大问题。", source: "Wortkarte 原创例句" },
  halb: { example: "Ich komme um halb acht.", exampleZh: "我七点半来。", source: "Wortkarte 原创例句" },
  Viertel: { example: "Ein Viertel der Klasse fehlt.", exampleZh: "四分之一的学生缺席。", source: "Wortkarte 原创例句" },
  frühstücken: { example: "Wir frühstücken um sieben.", exampleZh: "我们七点吃早饭。", source: "Wortkarte 原创例句" },
  Pause: { example: "Wir machen eine kurze Pause.", exampleZh: "我们休息一下。", source: "Wortkarte 原创例句" },
  Test: { example: "Der Test war schwer.", exampleZh: "考试很难。", source: "Wortkarte 原创例句" },
  ruhig: { example: "Das Zimmer ist ruhig.", exampleZh: "房间很安静。", source: "Wortkarte 原创例句" },
  Fehler: { example: "Ich habe einen Fehler gemacht.", exampleZh: "我犯了一个错误。", source: "Wortkarte 原创例句" },
  Wort: { example: "Das Wort kenne ich nicht.", exampleZh: "我不认识这个词。", source: "Wortkarte 原创例句" },
  schließen: { example: "Bitte schließen Sie die Tür.", exampleZh: "请关门。", source: "Wortkarte 原创例句" },
  immer: { example: "Er ist immer freundlich.", exampleZh: "他总是很友好。", source: "Wortkarte 原创例句" },
  Sport: { example: "Ich mache dreimal pro Woche Sport.", exampleZh: "我每周运动三次。", source: "Wortkarte 原创例句" },
  schlafen: { example: "Das Kind schläft schon.", exampleZh: "孩子已经睡了。", source: "Wortkarte 原创例句" },
  Bitte: { example: "Ich habe eine Bitte.", exampleZh: "我有个请求。", source: "Wortkarte 原创例句" },
  erklären: { example: "Können Sie das erklären?", exampleZh: "您能解释一下吗？", source: "Wortkarte 原创例句" },
  laut: { example: "Die Musik ist zu laut.", exampleZh: "音乐太吵了。", source: "Wortkarte 原创例句" },
  regnen: { example: "Es regnet seit gestern.", exampleZh: "从昨天起一直下雨。", source: "Wortkarte 原创例句" },
  krank: { example: "Ich bin heute krank.", exampleZh: "我今天病了。", source: "Wortkarte 原创例句" },
  Geburtstag: { example: "Mein Geburtstag ist im Mai.", exampleZh: "我的生日在五月。", source: "Wortkarte 原创例句" },
  bestellen: { example: "Ich möchte eine Suppe bestellen.", exampleZh: "我想点一份汤。", source: "Wortkarte 原创例句" },
  Bild: { example: "Das Bild hängt an der Wand.", exampleZh: "画挂在墙上。", source: "Wortkarte 原创例句" },
  Stunde: { example: "Der Kurs dauert zwei Stunden.", exampleZh: "课程持续两小时。", source: "Wortkarte 原创例句" },
  laufen: { example: "Ich laufe jeden Morgen.", exampleZh: "我每天早上跑步。", source: "Wortkarte 原创例句" },
  heiraten: { example: "Sie heiraten im Sommer.", exampleZh: "他们夏天结婚。", source: "Wortkarte 原创例句" },
  spät: { example: "Es ist schon spät.", exampleZh: "已经很晚了。", source: "Wortkarte 原创例句" },
  benutzen: { example: "Darf ich dein Handy benutzen?", exampleZh: "我可以用你的手机吗？", source: "Wortkarte 原创例句" },
  Sonntag: { example: "Am Sonntag ruhen wir uns aus.", exampleZh: "周日我们休息。", source: "Wortkarte 原创例句" },
  Computer: { example: "Der Computer funktioniert nicht.", exampleZh: "电脑坏了。", source: "Wortkarte 原创例句" },
  tanzen: { example: "Wir tanzen gern.", exampleZh: "我们喜欢跳舞。", source: "Wortkarte 原创例句" },
  Wochentag: { example: "Welcher Wochentag ist heute?", exampleZh: "今天星期几？", source: "Wortkarte 原创例句" },
  Mittwoch: { example: "Am Mittwoch habe ich einen Termin.", exampleZh: "周三我有个约会。", source: "Wortkarte 原创例句" },
  Film: { example: "Der Film war spannend.", exampleZh: "电影很精彩。", source: "Wortkarte 原创例句" },
  verkaufen: { example: "Sie verkaufen ihr altes Auto.", exampleZh: "他们卖掉旧车。", source: "Wortkarte 原创例句" },
  Ausflug: { example: "Wir machen einen Ausflug an den See.", exampleZh: "我们去湖边郊游。", source: "Wortkarte 原创例句" },
  Post: { example: "Die Post kommt um zehn Uhr.", exampleZh: "邮件十点到。", source: "Wortkarte 原创例句" },
  schicken: { example: "Ich schicke dir ein Foto.", exampleZh: "我给你发一张照片。", source: "Wortkarte 原创例句" },
  Adresse: { example: "Bitte schreiben Sie Ihre Adresse.", exampleZh: "请写下您的地址。", source: "Wortkarte 原创例句" },
  Absender: { example: "Der Absender fehlt auf dem Brief.", exampleZh: "信上缺少寄件人。", source: "Wortkarte 原创例句" },
  Empfänger: { example: "Der Empfänger wohnt in Bonn.", exampleZh: "收件人住在波恩。", source: "Wortkarte 原创例句" },
  Schluss: { example: "Zum Schluss bedanke ich mich.", exampleZh: "最后我表示感谢。", source: "Wortkarte 原创例句" },
  Handy: { example: "Ich habe ein neues Handy.", exampleZh: "我有一部新手机。", source: "Wortkarte 原创例句" },
  Brief: { example: "Ich schreibe einen Brief.", exampleZh: "我在写信。", source: "Wortkarte 原创例句" },
  "E-Mail": { example: "Ich schicke dir eine E-Mail.", exampleZh: "我给你发一封电子邮件。", source: "Wortkarte 原创例句" },
  Restaurant: { example: "Das Restaurant ist heute voll.", exampleZh: "餐厅今天客满。", source: "Wortkarte 原创例句" },
  Bahnhof: { example: "Der Bahnhof liegt im Zentrum.", exampleZh: "火车站在市中心。", source: "Wortkarte 原创例句" },
  zurück: { example: "Ich komme gleich zurück.", exampleZh: "我马上回来。", source: "Wortkarte 原创例句" },
  morgen: { example: "Morgen fahre ich nach Hamburg.", exampleZh: "明天我去汉堡。", source: "Wortkarte 原创例句" },
  falsch: { example: "Die Antwort ist falsch.", exampleZh: "答案错了。", source: "Wortkarte 原创例句" },
  Internet: { example: "Ich suche die Information im Internet.", exampleZh: "我在网上找信息。", source: "Wortkarte 原创例句" },
  Fax: { example: "Bitte senden Sie das Formular per Fax.", exampleZh: "请通过传真发送表格。", source: "Wortkarte 原创例句" },
  Postleitzahl: { example: "Wie lautet Ihre Postleitzahl?", exampleZh: "您的邮编是多少？", source: "Wortkarte 原创例句" },
  Appartement: { example: "Wir mieten ein kleines Appartement.", exampleZh: "我们租一间小公寓。", source: "Wortkarte 原创例句" },
  Ankunft: { example: "Die Ankunft ist für acht Uhr geplant.", exampleZh: "预计八点到达。", source: "Wortkarte 原创例句" },
  Bank: { example: "Die Bank öffnet um neun Uhr.", exampleZh: "银行九点开门。", source: "Wortkarte 原创例句" },
  automatisch: { example: "Die Tür schließt automatisch.", exampleZh: "门自动关闭。", source: "Wortkarte 原创例句" },
  Telefon: { example: "Das Telefon klingelt.", exampleZh: "电话响了。", source: "Wortkarte 原创例句" },
  abfahren: { example: "Der Zug fährt um zehn Uhr ab.", exampleZh: "火车十点出发。", source: "Wortkarte 原创例句" },
  mitnehmen: { example: "Ich nehme einen Regenschirm mit.", exampleZh: "我带一把伞。", source: "Wortkarte 原创例句" },
  Prüfung: { example: "Die Prüfung war schwer.", exampleZh: "考试很难。", source: "Wortkarte 原创例句" },
  Ende: { example: "Am Ende des Films weinen alle.", exampleZh: "电影结尾大家都哭了。", source: "Wortkarte 原创例句" },
  Hilfe: { example: "Danke für deine Hilfe.", exampleZh: "谢谢你的帮助。", source: "Wortkarte 原创例句" },
  schmecken: { example: "Die Suppe schmeckt gut.", exampleZh: "汤很好喝。", source: "Wortkarte 原创例句" },
  Geschenk: { example: "Das Geschenk ist für dich.", exampleZh: "这是给你的礼物。", source: "Wortkarte 原创例句" },
  herzlich: { example: "Herzlichen Glückwunsch!", exampleZh: "衷心祝贺！", source: "Wortkarte 原创例句" },
  Gast: { example: "Wir haben heute Gäste.", exampleZh: "我们今天有客人。", source: "Wortkarte 原创例句" },
  Chef: { example: "Der Chef ist nicht da.", exampleZh: "老板不在。", source: "Wortkarte 原创例句" },
  möglich: { example: "Ist das morgen möglich?", exampleZh: "明天可以吗？", source: "Wortkarte 原创例句" },
  Hund: { example: "Der Hund bellt.", exampleZh: "狗在叫。", source: "Wortkarte 原创例句" },
  Schuh: { example: "Die Schuhe sind zu klein.", exampleZh: "鞋太小了。", source: "Wortkarte 原创例句" },
  feiern: { example: "Wir feiern heute Geburtstag.", exampleZh: "我们今天庆祝生日。", source: "Wortkarte 原创例句" },
  sitzen: { example: "Wir sitzen im Garten.", exampleZh: "我们坐在花园里。", source: "Wortkarte 原创例句" },
  Junge: { example: "Der Junge spielt Fußball.", exampleZh: "男孩在踢足球。", source: "Wortkarte 原创例句" },
  Verwandte: { example: "Meine Verwandten kommen zu Besuch.", exampleZh: "我的亲戚来拜访。", source: "Wortkarte 原创例句" },
  Café: { example: "Wir treffen uns im Café.", exampleZh: "我们在咖啡馆见面。", source: "Wortkarte 原创例句" },
  Speisekarte: { example: "Die Speisekarte ist auf Deutsch.", exampleZh: "菜单是德语的。", source: "Wortkarte 原创例句" },
  Rechnung: { example: "Die Rechnung, bitte.", exampleZh: "请结账。", source: "Wortkarte 原创例句" },
  Reisebüro: { example: "Ich buche die Reise im Reisebüro.", exampleZh: "我在旅行社订旅行。", source: "Wortkarte 原创例句" },
  anbieten: { example: "Sie bietet uns Kaffee an.", exampleZh: "她给我们提供咖啡。", source: "Wortkarte 原创例句" },
  Lied: { example: "Das Lied ist schön.", exampleZh: "这首歌很美。", source: "Wortkarte 原创例句" },
  Öl: { example: "Ich brauche Öl für den Salat.", exampleZh: "我需要沙拉油。", source: "Wortkarte 原创例句" },
  Geburtsort: { example: "Mein Geburtsort ist Shanghai.", exampleZh: "我的出生地是上海。", source: "Wortkarte 原创例句" },
  Familienstand: { example: "Bitte geben Sie Ihren Familienstand an.", exampleZh: "请注明婚姻状况。", source: "Wortkarte 原创例句" },
  Januar: { example: "Im Januar schneit es oft.", exampleZh: "一月经常下雪。", source: "Wortkarte 原创例句" },
  Februar: { example: "Der Februar ist kurz.", exampleZh: "二月很短。", source: "Wortkarte 原创例句" },
  März: { example: "Im März beginnt der Frühling.", exampleZh: "三月春天开始。", source: "Wortkarte 原创例句" },
  April: { example: "Im April regnet es viel.", exampleZh: "四月雨水多。", source: "Wortkarte 原创例句" },
  Mai: { example: "Im Mai blühen die Blumen.", exampleZh: "五月花开。", source: "Wortkarte 原创例句" },
  Juni: { example: "Im Juni fahren wir ans Meer.", exampleZh: "六月我们去海边。", source: "Wortkarte 原创例句" },
  Juli: { example: "Der Juli ist sehr heiß.", exampleZh: "七月很热。", source: "Wortkarte 原创例句" },
  August: { example: "Im August fahren wir in den Urlaub.", exampleZh: "八月我们去度假。", source: "Wortkarte 原创例句" },
  September: { example: "Im September beginnt die Schule.", exampleZh: "九月开学。", source: "Wortkarte 原创例句" },
  Oktober: { example: "Der Oktober ist oft mild.", exampleZh: "十月通常温和。", source: "Wortkarte 原创例句" },
  November: { example: "Im November wird es früh dunkel.", exampleZh: "十一月天黑得早。", source: "Wortkarte 原创例句" },
  Dezember: { example: "Im Dezember feiern wir Weihnachten.", exampleZh: "十二月我们庆祝圣诞节。", source: "Wortkarte 原创例句" },
  Sommer: { example: "Der Sommer ist heiß.", exampleZh: "夏天很热。", source: "Wortkarte 原创例句" },
  Winter: { example: "Im Winter schneit es.", exampleZh: "冬天会下雪。", source: "Wortkarte 原创例句" },
  Frühling: { example: "Im Frühling blühen die Bäume.", exampleZh: "春天树木开花。", source: "Wortkarte 原创例句" },
  Herbst: { example: "Im Herbst fallen die Blätter.", exampleZh: "秋天树叶落下。", source: "Wortkarte 原创例句" },
  Jahr: { example: "Ich lerne seit einem Jahr Deutsch.", exampleZh: "我学德语一年了。", source: "Wortkarte 原创例句" },
  international: { example: "Der Flughafen ist international.", exampleZh: "这个机场是国际的。", source: "Wortkarte 原创例句" },
  Vorwahl: { example: "Wie lautet die Vorwahl von Berlin?", exampleZh: "柏林的区号是多少？", source: "Wortkarte 原创例句" },
  bitten: { example: "Ich bitte dich um Hilfe.", exampleZh: "我请你帮忙。", source: "Wortkarte 原创例句" },
  halten: { example: "Der Bus hält hier.", exampleZh: "公交车停这里。", source: "Wortkarte 原创例句" },
  Stelle: { example: "Sie sucht eine neue Stelle.", exampleZh: "她在找新工作。", source: "Wortkarte 原创例句" },
  Jacke: { example: "Die Jacke ist zu warm.", exampleZh: "这件夹克太热了。", source: "Wortkarte 原创例句" },
  Farbe: { example: "Welche Farbe magst du?", exampleZh: "你喜欢什么颜色？", source: "Wortkarte 原创例句" },
  rot: { example: "Die Rose ist rot.", exampleZh: "玫瑰是红色的。", source: "Wortkarte 原创例句" },
  gelb: { example: "Die Sonne ist gelb.", exampleZh: "太阳是黄色的。", source: "Wortkarte 原创例句" },
  blau: { example: "Der Himmel ist blau.", exampleZh: "天空是蓝色的。", source: "Wortkarte 原创例句" },
  grün: { example: "Das Gras ist grün.", exampleZh: "草是绿色的。", source: "Wortkarte 原创例句" },
  braun: { example: "Der Hund ist braun.", exampleZh: "狗是棕色的。", source: "Wortkarte 原创例句" },
  schwarz: { example: "Die Katze ist schwarz.", exampleZh: "猫是黑色的。", source: "Wortkarte 原创例句" },
  weiß: { example: "Der Schnee ist weiß.", exampleZh: "雪是白色的。", source: "Wortkarte 原创例句" },
  grau: { example: "Der Himmel ist grau.", exampleZh: "天空是灰色的。", source: "Wortkarte 原创例句" },
  hell: { example: "Das Zimmer ist hell.", exampleZh: "房间很亮。", source: "Wortkarte 原创例句" },
  lang: { example: "Der Film ist zu lang.", exampleZh: "电影太长。", source: "Wortkarte 原创例句" },
  hoch: { example: "Der Turm ist sehr hoch.", exampleZh: "塔很高。", source: "Wortkarte 原创例句" },
  schwer: { example: "Die Tasche ist schwer.", exampleZh: "包很重。", source: "Wortkarte 原创例句" },
  leicht: { example: "Die Aufgabe ist leicht.", exampleZh: "任务很简单。", source: "Wortkarte 原创例句" },
  duschen: { example: "Ich dusche jeden Morgen.", exampleZh: "我每天早上洗澡。", source: "Wortkarte 原创例句" },
  Fieber: { example: "Das Kind hat Fieber.", exampleZh: "孩子发烧了。", source: "Wortkarte 原创例句" },
  anziehen: { example: "Zieh deine Jacke an.", exampleZh: "穿上你的夹克。", source: "Wortkarte 原创例句" },
  Haar: { example: "Sie hat lange Haare.", exampleZh: "她留着长发。", source: "Wortkarte 原创例句" },
  Größe: { example: "Welche Größe brauchen Sie?", exampleZh: "您需要什么尺码？", source: "Wortkarte 原创例句" },
  Auge: { example: "Sie hat blaue Augen.", exampleZh: "她有一双蓝眼睛。", source: "Wortkarte 原创例句" },
  Mund: { example: "Öffne den Mund, bitte.", exampleZh: "请张开嘴。", source: "Wortkarte 原创例句" },
  kulturell: { example: "Das ist ein kulturelles Zentrum.", exampleZh: "这是一个文化中心。", source: "Wortkarte 原创例句" },
  bekannt: { example: "Der Ort ist bekannt für seinen Wein.", exampleZh: "这个地方以葡萄酒闻名。", source: "Wortkarte 原创例句" },
  baden: { example: "Die Kinder baden im See.", exampleZh: "孩子们在湖里游泳。", source: "Wortkarte 原创例句" },
  Miete: { example: "Die Miete ist in der Stadt hoch.", exampleZh: "城里的房租很高。", source: "Wortkarte 原创例句" },
  Möbel: { example: "Die Möbel sind neu.", exampleZh: "家具是新的。", source: "Wortkarte 原创例句" },
  Kühlschrank: { example: "Der Kühlschrank ist leer.", exampleZh: "冰箱空了。", source: "Wortkarte 原创例句" },
  Herd: { example: "Der Herd ist noch warm.", exampleZh: "炉子还热着。", source: "Wortkarte 原创例句" },
  Schrank: { example: "Die Kleidung liegt im Schrank.", exampleZh: "衣服在柜子里。", source: "Wortkarte 原创例句" },
  Teppich: { example: "Der Teppich ist weich.", exampleZh: "地毯很软。", source: "Wortkarte 原创例句" },
  Lampe: { example: "Die Lampe ist kaputt.", exampleZh: "灯坏了。", source: "Wortkarte 原创例句" },
  Vorhang: { example: "Zieh bitte den Vorhang zu.", exampleZh: "请拉上窗帘。", source: "Wortkarte 原创例句" },
  Nachbar: { example: "Mein Nachbar ist freundlich.", exampleZh: "我的邻居很友好。", source: "Wortkarte 原创例句" },
  Umzug: { example: "Der Umzug war anstrengend.", exampleZh: "搬家很累。", source: "Wortkarte 原创例句" },
  Briefmarke: { example: "Ich brauche eine Briefmarke.", exampleZh: "我需要一张邮票。", source: "Wortkarte 原创例句" },
  "E-Mail": { example: "Ich schreibe eine E-Mail.", exampleZh: "我在写电子邮件。", source: "Wortkarte 原创例句" },
  Anzeige: { example: "Die Anzeige steht in der Zeitung.", exampleZh: "广告登在报纸上。", source: "Wortkarte 原创例句" },
  legen: { example: "Leg das Buch auf den Tisch.", exampleZh: "把书放在桌上。", source: "Wortkarte 原创例句" },
  stellen: { example: "Stell die Flasche in den Kühlschrank.", exampleZh: "把瓶子放进冰箱。", source: "Wortkarte 原创例句" },
  Ecke: { example: "Das Café ist an der Ecke.", exampleZh: "咖啡馆在拐角。", source: "Wortkarte 原创例句" },
  günstig: { example: "Das Hotel ist günstig.", exampleZh: "这家酒店便宜。", source: "Wortkarte 原创例句" },
  zufrieden: { example: "Ich bin mit dem Ergebnis zufrieden.", exampleZh: "我对结果满意。", source: "Wortkarte 原创例句" },
  ausziehen: { example: "Wir ziehen nächsten Monat aus.", exampleZh: "我们下个月搬走。", source: "Wortkarte 原创例句" },
  glauben: { example: "Ich glaube dir.", exampleZh: "我相信你。", source: "Wortkarte 原创例句" },
  "E-Mail": { example: "Ich schreibe eine E-Mail.", exampleZh: "我在写电子邮件。", source: "Wortkarte 原创例句" },
  Reparatur: { example: "Die Reparatur kostet 80 Euro.", exampleZh: "维修要80欧。", source: "Wortkarte 原创例句" },
  gewinnen: { example: "Sie gewinnt den Wettbewerb.", exampleZh: "她赢得比赛。", source: "Wortkarte 原创例句" },
  lustig: { example: "Der Film ist lustig.", exampleZh: "电影很有趣。", source: "Wortkarte 原创例句" },
  Sehenswürdigkeit: { example: "Der Dom ist eine Sehenswürdigkeit.", exampleZh: "大教堂是一处景点。", source: "Wortkarte 原创例句" },
  aus: { example: "Der Kurs ist aus.", exampleZh: "课程结束了。", source: "Wortkarte 原创例句" },
  Thema: { example: "Das Thema ist kompliziert.", exampleZh: "这个话题很复杂。", source: "Wortkarte 原创例句" },
  Querstraße: { example: "Die Querstraße ist gesperrt.", exampleZh: "横街被封了。", source: "Wortkarte 原创例句" },
  geradeaus: { example: "Gehen Sie geradeaus.", exampleZh: "一直往前走。", source: "Wortkarte 原创例句" },
  Standort: { example: "Der Standort ist günstig.", exampleZh: "位置很好。", source: "Wortkarte 原创例句" },
  Zebrastreifen: { example: "Über den Zebrastreifen gehen.", exampleZh: "走人行横道。", source: "Wortkarte 原创例句" },
  übernächst: { example: "Wir treffen uns übernächste Woche.", exampleZh: "我们下下周见。", source: "Wortkarte 原创例句" },
  Kreuzung: { example: "An der Kreuzung links abbiegen.", exampleZh: "在路口左转。", source: "Wortkarte 原创例句" },
  Gehweg: { example: "Der Gehweg ist frei.", exampleZh: "人行道畅通。", source: "Wortkarte 原创例句" },
  Fahrradweg: { example: "Der Fahrradweg ist neu.", exampleZh: "自行车道是新的。", source: "Wortkarte 原创例句" },
  "sich freuen": { example: "Ich freue mich auf den Urlaub.", exampleZh: "我期待假期。", source: "Wortkarte 原创例句" },
  "sich langweilen": { example: "Die Kinder langweilen sich.", exampleZh: "孩子们觉得无聊。", source: "Wortkarte 原创例句" },
  "sich kämmen": { example: "Sie kämmt sich vor dem Spiegel.", exampleZh: "她在镜子前梳头。", source: "Wortkarte 原创例句" },
  "sich rasieren": { example: "Er rasiert sich jeden Morgen.", exampleZh: "他每天早上刮胡子。", source: "Wortkarte 原创例句" },
  "sich freuen": { example: "Ich freue mich auf den Urlaub.", exampleZh: "我期待假期。", source: "Wortkarte 原创例句" },
  "sich langweilen": { example: "Die Kinder langweilen sich.", exampleZh: "孩子们觉得无聊。", source: "Wortkarte 原创例句" },
  "sich kämmen": { example: "Sie kämmt sich vor dem Spiegel.", exampleZh: "她在镜子前梳头。", source: "Wortkarte 原创例句" },
  "sich verspäten": { example: "Der Zug verspätet sich.", exampleZh: "火车晚点。", source: "Wortkarte 原创例句" },
  "sich auskennen": { example: "Ich kenne mich hier aus.", exampleZh: "我熟悉这里。", source: "Wortkarte 原创例句" },
  "sich bedanken": { example: "Ich bedanke mich für die Hilfe.", exampleZh: "我感谢帮助。", source: "Wortkarte 原创例句" },
  "sich bewerben": { example: "Sie bewirbt sich um die Stelle.", exampleZh: "她申请这个职位。", source: "Wortkarte 原创例句" },
  "sich erholen": { example: "Wir erholen uns am Meer.", exampleZh: "我们在海边休息。", source: "Wortkarte 原创例句" },
  "sich erkundigen": { example: "Ich erkundige mich nach dem Preis.", exampleZh: "我询问价格。", source: "Wortkarte 原创例句" },
  "sich umsehen": { example: "Sie sieht sich im Museum um.", exampleZh: "她在博物馆参观。", source: "Wortkarte 原创例句" },
  "sich verlaufen": { example: "Wir haben uns verlaufen.", exampleZh: "我们迷路了。", source: "Wortkarte 原创例句" },
  "sich verlieben": { example: "Er verliebt sich in sie.", exampleZh: "他爱上她。", source: "Wortkarte 原创例句" },
  "sich streiten": { example: "Die Kinder streiten sich.", exampleZh: "孩子们在吵架。", source: "Wortkarte 原创例句" },
  Dom: { example: "Der Dom ist sehr alt.", exampleZh: "大教堂很古老。", source: "Wortkarte 原创例句" },
  Stadtplan: { example: "Ich brauche einen Stadtplan.", exampleZh: "我需要一张城市地图。", source: "Wortkarte 原创例句" },
  fremd: { example: "Ich bin hier fremd.", exampleZh: "我在这里是外地人。", source: "Wortkarte 原创例句" },
  Stadtzentrum: { example: "Wir wohnen im Stadtzentrum.", exampleZh: "我们住在市中心。", source: "Wortkarte 原创例句" },
  dorthin: { example: "Wie komme ich dorthin?", exampleZh: "我怎么去那里？", source: "Wortkarte 原创例句" },
  Passantin: { example: "Eine Passantin hilft mir.", exampleZh: "一位女路人帮我。", source: "Wortkarte 原创例句" },
  Rathaus: { example: "Das Rathaus ist am Markt.", exampleZh: "市政厅在市场旁。", source: "Wortkarte 原创例句" },
  Bahnhofsplatz: { example: "Der Bus hält am Bahnhofsplatz.", exampleZh: "公交停在火车站广场。", source: "Wortkarte 原创例句" },
  Linie: { example: "Nehmen Sie die Linie 5.", exampleZh: "请乘5路。", source: "Wortkarte 原创例句" },
  entlanggehen: { example: "Gehen Sie die Straße entlang.", exampleZh: "沿着这条街走。", source: "Wortkarte 原创例句" },
  Spielcasino: { example: "Er spielt im Spielcasino.", exampleZh: "他在赌场玩。", source: "Wortkarte 原创例句" },
  Verzeihung: { example: "Verzeihung, ich habe Sie nicht verstanden.", exampleZh: "对不起，我没听懂。", source: "Wortkarte 原创例句" },
  einfach: { example: "Die Aufgabe ist einfach.", exampleZh: "任务简单。", source: "Wortkarte 原创例句" },
  "S-Bahnstation": { example: "Die S-Bahnstation ist nah.", exampleZh: "城铁站很近。", source: "Wortkarte 原创例句" },
  einsteigen: { example: "Bitte einsteigen.", exampleZh: "请上车。", source: "Wortkarte 原创例句" },
  aussteigen: { example: "Wir steigen am Hauptbahnhof aus.", exampleZh: "我们在中央车站下车。", source: "Wortkarte 原创例句" },
  Weihnachtsgeschenk: { example: "Das Weihnachtsgeschenk ist versteckt.", exampleZh: "圣诞礼物藏起来了。", source: "Wortkarte 原创例句" },
  Tischtennis: { example: "Wir spielen Tischtennis.", exampleZh: "我们打乒乓球。", source: "Wortkarte 原创例句" },
  Turnier: { example: "Das Turnier beginnt um neun.", exampleZh: "比赛九点开始。", source: "Wortkarte 原创例句" },
  Abfahrtszeit: { example: "Die Abfahrtszeit steht auf dem Plan.", exampleZh: "发车时间写在牌上。", source: "Wortkarte 原创例句" },
  hoffentlich: { example: "Hoffentlich kommt er.", exampleZh: "希望他来。", source: "Wortkarte 原创例句" },
  Kiosk: { example: "Am Kiosk kaufe ich Zeitungen.", exampleZh: "我在报刊亭买报纸。", source: "Wortkarte 原创例句" },
  Fahrkartenautomat: { example: "Der Fahrkartenautomat ist kaputt.", exampleZh: "售票机坏了。", source: "Wortkarte 原创例句" },
  Einzelfahrkarte: { example: "Ich brauche eine Einzelfahrkarte.", exampleZh: "我需要一张单程票。", source: "Wortkarte 原创例句" },
  Streifenkarte: { example: "Die Streifenkarte gilt mehrere Fahrten.", exampleZh: "条纹票可用于多次乘车。", source: "Wortkarte 原创例句" },
  wählen: { example: "Wählen Sie eine Nummer.", exampleZh: "请选一个号码。", source: "Wortkarte 原创例句" },
  gültig: { example: "Der Pass ist noch gültig.", exampleZh: "护照还有效。", source: "Wortkarte 原创例句" },
  gelten: { example: "Die Regel gilt ab morgen.", exampleZh: "规则明天起生效。", source: "Wortkarte 原创例句" },
  beliebig: { example: "Wählen Sie einen beliebigen Termin.", exampleZh: "请任选一个时间。", source: "Wortkarte 原创例句" },
  Erwachsene: { example: "Erwachsene zahlen mehr.", exampleZh: "成人付更多。", source: "Wortkarte 原创例句" },
  Zone: { example: "Die Zone ist gebührenpflichtig.", exampleZh: "该区域收费。", source: "Wortkarte 原创例句" },
  egal: { example: "Das ist mir egal.", exampleZh: "我无所谓。", source: "Wortkarte 原创例句" },
  Empfehlung: { example: "Danke für die Empfehlung.", exampleZh: "谢谢推荐。", source: "Wortkarte 原创例句" },
  Sportart: { example: "Welche Sportart magst du?", exampleZh: "你喜欢哪种运动？", source: "Wortkarte 原创例句" },
  treiben: { example: "Ich treibe jeden Tag Sport.", exampleZh: "我每天运动。", source: "Wortkarte 原创例句" },
  Tennisspielerin: { example: "Sie ist Tennisspielerin.", exampleZh: "她是网球运动员。", source: "Wortkarte 原创例句" },
  Turnen: { example: "Turnen ist ihre Lieblingssportart.", exampleZh: "体操是她最喜欢的运动。", source: "Wortkarte 原创例句" },
  turnen: { example: "Die Kinder turnen in der Halle.", exampleZh: "孩子们在体育馆做体操。", source: "Wortkarte 原创例句" },
  Leichtathletik: { example: "Leichtathletik umfasst Laufen, Springen und Werfen.", exampleZh: "田径包括跑、跳、投。", source: "Wortkarte 原创例句" },
  springen: { example: "Er springt über den Zaun.", exampleZh: "他跳过栅栏。", source: "Wortkarte 原创例句" },
  Sporthalle: { example: "Die Sporthalle ist geschlossen.", exampleZh: "体育馆关闭。", source: "Wortkarte 原创例句" },
  nie: { example: "Ich war nie in Berlin.", exampleZh: "我从没去过柏林。", source: "Wortkarte 原创例句" },
  unbegrenzt: { example: "Die Karte ist unbegrenzt gültig.", exampleZh: "这张卡无限期有效。", source: "Wortkarte 原创例句" },
  mehrmals: { example: "Ich habe mehrmals angerufen.", exampleZh: "我打了好几次电话。", source: "Wortkarte 原创例句" },
  entwerten: { example: "Bitte entwerten Sie die Fahrkarte.", exampleZh: "请给车票打孔。", source: "Wortkarte 原创例句" },
  Entfernung: { example: "Die Entfernung beträgt fünf Kilometer.", exampleZh: "距离五公里。", source: "Wortkarte 原创例句" },
  Entwerter: { example: "Der Entwerter ist am Eingang.", exampleZh: "打票机在入口。", source: "Wortkarte 原创例句" },
  beantragen: { example: "Ich möchte ein Visum beantragen.", exampleZh: "我想申请签证。", source: "Wortkarte 原创例句" },
  Passfoto: { example: "Ich brauche ein Passfoto.", exampleZh: "我需要一张护照照片。", source: "Wortkarte 原创例句" },
  Marke: { example: "Die Marke kostet zwei Euro.", exampleZh: "邮票两欧。", source: "Wortkarte 原创例句" },
  verbilligt: { example: "Die Karte ist verbilligt.", exampleZh: "这张票打折。", source: "Wortkarte 原创例句" },
  abgeben: { example: "Ich gebe das Paket ab.", exampleZh: "我交包裹。", source: "Wortkarte 原创例句" },
  Schadenersatz: { example: "Er fordert Schadenersatz.", exampleZh: "他要求赔偿。", source: "Wortkarte 原创例句" },
  umweltfreundlich: { example: "Das ist umweltfreundlich.", exampleZh: "这很环保。", source: "Wortkarte 原创例句" },
  Kontrolleurin: { example: "Die Kontrolleurin prüft die Tickets.", exampleZh: "女查票员查票。", source: "Wortkarte 原创例句" },
  Fahrschein: { example: "Ich habe keinen Fahrschein.", exampleZh: "我没有车票。", source: "Wortkarte 原创例句" },
  sonst: { example: "Sonst noch etwas?", exampleZh: "还要别的吗？", source: "Wortkarte 原创例句" },
  Strafe: { example: "Das kostet eine Strafe.", exampleZh: "这会罚款。", source: "Wortkarte 原创例句" },
  Turnern: { example: "Die Turnern trainieren.", exampleZh: "体操运动员训练。", source: "Wortkarte 原创例句" },
  Leichtathlet: { example: "Er ist Leichtathlet.", exampleZh: "他是田径运动员。", source: "Wortkarte 原创例句" },
  Freizeitbeschäftigung: { example: "Sport ist meine Freizeitbeschäftigung.", exampleZh: "运动是我的休闲活动。", source: "Wortkarte 原创例句" },
  Verein: { example: "Ich bin in einem Verein.", exampleZh: "我参加一个协会。", source: "Wortkarte 原创例句" },
  Mitglied: { example: "Er ist Mitglied im Club.", exampleZh: "他是俱乐部成员。", source: "Wortkarte 原创例句" },
  Deutsche: { example: "Der Deutsche trinkt gern Kaffee.", exampleZh: "这个德国人爱喝咖啡。", source: "Wortkarte 原创例句" },
  Bundesliga: { example: "Die Bundesliga beginnt im August.", exampleZh: "德甲八月开始。", source: "Wortkarte 原创例句" },
  populär: { example: "Der Sport ist populär.", exampleZh: "这项运动很受欢迎。", source: "Wortkarte 原创例句" },
  Windsurfen: { example: "Windsurfen macht Spaß.", exampleZh: "风帆冲浪很有趣。", source: "Wortkarte 原创例句" },
  Gefahr: { example: "Es besteht keine Gefahr.", exampleZh: "没有危险。", source: "Wortkarte 原创例句" },
  Spannung: { example: "Die Spannung steigt.", exampleZh: "紧张感上升。", source: "Wortkarte 原创例句" },
  körperlich: { example: "Die Arbeit ist körperlich.", exampleZh: "这是体力工作。", source: "Wortkarte 原创例句" },
  Stadion: { example: "Das Stadion ist voll.", exampleZh: "体育场满座。", source: "Wortkarte 原创例句" },
  spannend: { example: "Das Spiel ist spannend.", exampleZh: "比赛很紧张。", source: "Wortkarte 原创例句" },
  Jubel: { example: "Der Jubel war groß.", exampleZh: "欢呼声很大。", source: "Wortkarte 原创例句" },
  Atmosphäre: { example: "Die Atmosphäre ist gut.", exampleZh: "气氛很好。", source: "Wortkarte 原创例句" },
  bequem: { example: "Der Stuhl ist bequem.", exampleZh: "椅子很舒服。", source: "Wortkarte 原创例句" },
  Einkommen: { example: "Das Einkommen ist niedrig.", exampleZh: "收入低。", source: "Wortkarte 原创例句" },
  jubeln: { example: "Die Fans jubeln.", exampleZh: "球迷欢呼。", source: "Wortkarte 原创例句" },
  Club: { example: "Der Club hat gewonnen.", exampleZh: "俱乐部赢了。", source: "Wortkarte 原创例句" },
  Sieg: { example: "Der Sieg war knapp.", exampleZh: "胜利很险。", source: "Wortkarte 原创例句" },
  einsam: { example: "Er fühlt sich einsam.", exampleZh: "他感到孤独。", source: "Wortkarte 原创例句" },
  Flur: { example: "Der Flur ist schmal.", exampleZh: "走廊很窄。", source: "Wortkarte 原创例句" },
  Keller: { example: "Der Keller ist feucht.", exampleZh: "地下室潮湿。", source: "Wortkarte 原创例句" },
  Dach: { example: "Das Dach ist alt.", exampleZh: "屋顶旧了。", source: "Wortkarte 原创例句" },
  Treppe: { example: "Die Treppe ist steil.", exampleZh: "楼梯很陡。", source: "Wortkarte 原创例句" },
  Schlüssel: { example: "Ich habe den Schlüssel verloren.", exampleZh: "我丢了钥匙。", source: "Wortkarte 原创例句" },
  Klingel: { example: "Die Klingel ist kaputt.", exampleZh: "门铃坏了。", source: "Wortkarte 原创例句" },
  Briefkasten: { example: "Der Briefkasten ist leer.", exampleZh: "信箱空了。", source: "Wortkarte 原创例句" },
  Mülleimer: { example: "Der Mülleimer ist voll.", exampleZh: "垃圾桶满了。", source: "Wortkarte 原创例句" },
  Steckdose: { example: "Die Steckdose ist kaputt.", exampleZh: "插座坏了。", source: "Wortkarte 原创例句" },
  Gardine: { example: "Die Gardine ist weiß.", exampleZh: "窗帘是白的。", source: "Wortkarte 原创例句" },
  Tafel: { example: "Der Lehrer schreibt an die Tafel.", exampleZh: "老师在黑板上写字。", source: "Wortkarte 原创例句" },
  Note: { example: "Sie hat eine gute Note.", exampleZh: "她成绩很好。", source: "Wortkarte 原创例句" },
  Lehrerin: { example: "Die Lehrerin erklärt die Grammatik.", exampleZh: "女老师讲解语法。", source: "Wortkarte 原创例句" },
  Antwort: { example: "Die Antwort ist richtig.", exampleZh: "答案正确。", source: "Wortkarte 原创例句" },
  Kreide: { example: "Die Kreide ist leer.", exampleZh: "粉笔用完了。", source: "Wortkarte 原创例句" },
  Schulhof: { example: "Die Kinder spielen auf dem Schulhof.", exampleZh: "孩子们在校园玩。", source: "Wortkarte 原创例句" },
  Woche: { example: "Die Woche ist schnell vorbei.", exampleZh: "一周很快过去。", source: "Wortkarte 原创例句" },
  Monat: { example: "Der Monat hat 30 Tage.", exampleZh: "这个月有30天。", source: "Wortkarte 原创例句" },
  Zeugnis: { example: "Das Zeugnis kommt morgen.", exampleZh: "成绩单明天到。", source: "Wortkarte 原创例句" },
  Diktat: { example: "Wir schreiben ein Diktat.", exampleZh: "我们做听写。", source: "Wortkarte 原创例句" },
  Onkel: { example: "Mein Onkel wohnt in Hamburg.", exampleZh: "我叔叔住在汉堡。", source: "Wortkarte 原创例句" },
  Tante: { example: "Meine Tante kommt zu Besuch.", exampleZh: "我姑妈来拜访。", source: "Wortkarte 原创例句" },
  Cousin: { example: "Mein Cousin ist jünger.", exampleZh: "我表弟更年轻。", source: "Wortkarte 原创例句" },
  Cousine: { example: "Meine Cousine studiert Medizin.", exampleZh: "我表姐学医。", source: "Wortkarte 原创例句" },
  Enkel: { example: "Der Enkel spielt mit Opa.", exampleZh: "孙子跟爷爷玩。", source: "Wortkarte 原创例句" },
  Schwiegermutter: { example: "Meine Schwiegermutter kocht gut.", exampleZh: "我岳母做饭好。", source: "Wortkarte 原创例句" },
  Neffe: { example: "Mein Neffe ist fünf.", exampleZh: "我侄子五岁。", source: "Wortkarte 原创例句" },
  Nichte: { example: "Meine Nichte singt gern.", exampleZh: "我侄女爱唱歌。", source: "Wortkarte 原创例句" },
  Eltern: { example: "Meine Eltern wohnen in Berlin.", exampleZh: "我父母住柏林。", source: "Wortkarte 原创例句" },
  Geschwister: { example: "Ich habe zwei Geschwister.", exampleZh: "我有两个兄弟姐妹。", source: "Wortkarte 原创例句" },
  Suppe: { example: "Die Suppe ist heiß.", exampleZh: "汤很热。", source: "Wortkarte 原创例句" },
  Nudeln: { example: "Die Kinder mögen Nudeln.", exampleZh: "孩子们喜欢面条。", source: "Wortkarte 原创例句" },
  Käse: { example: "Der Käse kommt aus der Schweiz.", exampleZh: "奶酪来自瑞士。", source: "Wortkarte 原创例句" },
  schneiden: { example: "Schneide das Brot.", exampleZh: "切面包。", source: "Wortkarte 原创例句" },
  backen: { example: "Ich backe einen Kuchen.", exampleZh: "我烤蛋糕。", source: "Wortkarte 原创例句" },
  braten: { example: "Wir braten das Fleisch.", exampleZh: "我们煎肉。", source: "Wortkarte 原创例句" },
  mischen: { example: "Mische die Zutaten.", exampleZh: "混合原料。", source: "Wortkarte 原创例句" },
  schälen: { example: "Ich schäle die Kartoffeln.", exampleZh: "我削土豆皮。", source: "Wortkarte 原创例句" },
  servieren: { example: "Wir servieren um sieben.", exampleZh: "我们七点上菜。", source: "Wortkarte 原创例句" },
  probieren: { example: "Probieren Sie den Kuchen.", exampleZh: "尝尝蛋糕。", source: "Wortkarte 原创例句" },
  Haltestelle: { example: "Die Haltestelle ist dort.", exampleZh: "车站在那边。", source: "Wortkarte 原创例句" },
  Fahrplan: { example: "Der Fahrplan hängt am Gleis.", exampleZh: "时刻表挂在站台。", source: "Wortkarte 原创例句" },
  Verspätung: { example: "Der Zug hat Verspätung.", exampleZh: "火车晚点。", source: "Wortkarte 原创例句" },
  Gleis: { example: "Der Zug fährt auf Gleis 3.", exampleZh: "火车在3站台。", source: "Wortkarte 原创例句" },
  Ticket: { example: "Ich kaufe ein Ticket.", exampleZh: "我买票。", source: "Wortkarte 原创例句" },
  Reise: { example: "Die Reise dauert zwei Wochen.", exampleZh: "旅行两周。", source: "Wortkarte 原创例句" },
  Urlaub: { example: "Wir fahren in den Urlaub.", exampleZh: "我们去度假。", source: "Wortkarte 原创例句" },
  Abfahrt: { example: "Die Abfahrt ist um acht.", exampleZh: "八点出发。", source: "Wortkarte 原创例句" },
  Ankunft: { example: "Die Ankunft ist um zehn.", exampleZh: "十点到达。", source: "Wortkarte 原创例句" },
  Umstieg: { example: "Der Umstieg ist in Köln.", exampleZh: "在科隆换乘。", source: "Wortkarte 原创例句" },
  Arbeit: { example: "Die Arbeit macht Spaß.", exampleZh: "工作有趣。", source: "Wortkarte 原创例句" },
  Büro: { example: "Das Büro ist im dritten Stock.", exampleZh: "办公室在三楼。", source: "Wortkarte 原创例句" },
  Gehalt: { example: "Das Gehalt ist gut.", exampleZh: "工资不错。", source: "Wortkarte 原创例句" },
  Vertrag: { example: "Ich unterschreibe den Vertrag.", exampleZh: "我签合同。", source: "Wortkarte 原创例句" },
  Bewerbung: { example: "Ich schreibe eine Bewerbung.", exampleZh: "我写求职信。", source: "Wortkarte 原创例句" },
  Lebenslauf: { example: "Der Lebenslauf ist zwei Seiten lang.", exampleZh: "简历两页。", source: "Wortkarte 原创例句" },
  Vorstellungsgespräch: { example: "Das Vorstellungsgespräch ist morgen.", exampleZh: "面试明天。", source: "Wortkarte 原创例句" },
  Feierabend: { example: "Endlich Feierabend!", exampleZh: "终于下班了！", source: "Wortkarte 原创例句" },
  Überstunde: { example: "Ich mache heute Überstunden.", exampleZh: "我今天加班。", source: "Wortkarte 原创例句" },
  Kollegin: { example: "Meine Kollegin ist krank.", exampleZh: "我女同事病了。", source: "Wortkarte 原创例句" },
  Trainer: { example: "Der Trainer erklärt die Taktik.", exampleZh: "教练讲解战术。", source: "Wortkarte 原创例句" },
  Mannschaft: { example: "Die Mannschaft spielt gut.", exampleZh: "球队踢得好。", source: "Wortkarte 原创例句" },
  Spieler: { example: "Der Spieler ist verletzt.", exampleZh: "球员受伤。", source: "Wortkarte 原创例句" },
  Tor: { example: "Er schießt ein Tor.", exampleZh: "他进一球。", source: "Wortkarte 原创例句" },
  Halbzeit: { example: "In der Halbzeit gibt es Tee.", exampleZh: "中场休息有茶。", source: "Wortkarte 原创例句" },
  Schiedsrichter: { example: "Der Schiedsrichter pfeift.", exampleZh: "裁判吹哨。", source: "Wortkarte 原创例句" },
  Foul: { example: "Das war ein Foul.", exampleZh: "那是犯规。", source: "Wortkarte 原创例句" },
  Elfmeter: { example: "Der Elfmeter war erfolgreich.", exampleZh: "点球成功。", source: "Wortkarte 原创例句" },
  Meisterschaft: { example: "Die Meisterschaft ist entschieden.", exampleZh: "冠军已定。", source: "Wortkarte 原创例句" },
  Punkt: { example: "Die Mannschaft holt drei Punkte.", exampleZh: "球队拿三分。", source: "Wortkarte 原创例句" },
  Wald: { example: "Der Wald ist ruhig.", exampleZh: "森林很安静。", source: "Wortkarte 原创例句" },
  Berg: { example: "Der Berg ist hoch.", exampleZh: "山很高。", source: "Wortkarte 原创例句" },
  See: { example: "Der See ist tief.", exampleZh: "湖很深。", source: "Wortkarte 原创例句" },
  Fluss: { example: "Der Fluss fließt durch die Stadt.", exampleZh: "河流穿过城市。", source: "Wortkarte 原创例句" },
  Tal: { example: "Das Tal ist grün.", exampleZh: "山谷是绿的。", source: "Wortkarte 原创例句" },
  Wiese: { example: "Die Wiese ist nass.", exampleZh: "草地湿。", source: "Wortkarte 原创例句" },
  Baum: { example: "Der Baum ist alt.", exampleZh: "树很老。", source: "Wortkarte 原创例句" },
  Blume: { example: "Die Blume riecht gut.", exampleZh: "花很香。", source: "Wortkarte 原创例句" },
  Luft: { example: "Die Luft ist frisch.", exampleZh: "空气清新。", source: "Wortkarte 原创例句" },
  Sonne: { example: "Die Sonne scheint.", exampleZh: "阳光照耀。", source: "Wortkarte 原创例句" },
  Regen: { example: "Der Regen hört nicht auf.", exampleZh: "雨不停。", source: "Wortkarte 原创例句" },
  Schnee: { example: "Der Schnee ist weiß.", exampleZh: "雪是白的。", source: "Wortkarte 原创例句" },
  Wind: { example: "Der Wind ist stark.", exampleZh: "风很大。", source: "Wortkarte 原创例句" },
  Wolke: { example: "Die Wolke ist grau.", exampleZh: "云是灰的。", source: "Wortkarte 原创例句" },
  Gewitter: { example: "Ein Gewitter kommt.", exampleZh: "暴风雨要来。", source: "Wortkarte 原创例句" },
  Nebel: { example: "Der Nebel ist dicht.", exampleZh: "雾很浓。", source: "Wortkarte 原创例句" },
  Sonnenschein: { example: "Wir haben Sonnenschein.", exampleZh: "我们有阳光。", source: "Wortkarte 原创例句" },
  Temperatur: { example: "Die Temperatur sinkt.", exampleZh: "气温下降。", source: "Wortkarte 原创例句" },
  Grad: { example: "Es sind 20 Grad.", exampleZh: "20度。", source: "Wortkarte 原创例句" },
  Prognose: { example: "Die Prognose ist gut.", exampleZh: "预报不错。", source: "Wortkarte 原创例句" },
  Angst: { example: "Ich habe Angst vor Hunden.", exampleZh: "我怕狗。", source: "Wortkarte 原创例句" },
  Freude: { example: "Die Freude ist groß.", exampleZh: "喜悦很大。", source: "Wortkarte 原创例句" },
  Wut: { example: "Seine Wut war deutlich.", exampleZh: "他的愤怒很明显。", source: "Wortkarte 原创例句" },
  Trauer: { example: "Die Trauer bleibt.", exampleZh: "悲伤仍在。", source: "Wortkarte 原创例句" },
  Liebe: { example: "Liebe ist wichtig.", exampleZh: "爱很重要。", source: "Wortkarte 原创例句" },
  Glück: { example: "Ich wünsche dir Glück.", exampleZh: "祝你好运。", source: "Wortkarte 原创例句" },
  Hoffnung: { example: "Die Hoffnung stirbt zuletzt.", exampleZh: "希望最后才死。", source: "Wortkarte 原创例句" },
  Sorge: { example: "Sie hat Sorgen.", exampleZh: "她有忧虑。", source: "Wortkarte 原创例句" },
  Stolz: { example: "Er ist stolz auf seine Arbeit.", exampleZh: "他为工作骄傲。", source: "Wortkarte 原创例句" },
  Überraschung: { example: "Die Überraschung ist gelungen.", exampleZh: "惊喜成功。", source: "Wortkarte 原创例句" },
  Musik: { example: "Musik beruhigt mich.", exampleZh: "音乐让我平静。", source: "Wortkarte 原创例句" },
  Konzert: { example: "Das Konzert beginnt um acht.", exampleZh: "音乐会八点开始。", source: "Wortkarte 原创例句" },
  Gitarre: { example: "Er spielt Gitarre.", exampleZh: "他弹吉他。", source: "Wortkarte 原创例句" },
  Klavier: { example: "Sie lernt Klavier.", exampleZh: "她学钢琴。", source: "Wortkarte 原创例句" },
  Band: { example: "Die Band spielt heute.", exampleZh: "乐队今天演出。", source: "Wortkarte 原创例句" },
  Sänger: { example: "Der Sänger hat eine gute Stimme.", exampleZh: "歌手嗓音好。", source: "Wortkarte 原创例句" },
  Bühne: { example: "Sie steht auf der Bühne.", exampleZh: "她站在舞台上。", source: "Wortkarte 原创例句" },
  Instrument: { example: "Welches Instrument spielst du?", exampleZh: "你演奏什么乐器？", source: "Wortkarte 原创例句" },
  Melodie: { example: "Die Melodie ist schön.", exampleZh: "旋律很美。", source: "Wortkarte 原创例句" },
  Rhythmus: { example: "Der Rhythmus ist schnell.", exampleZh: "节奏很快。", source: "Wortkarte 原创例句" },
  Film: { example: "Der Film ist spannend.", exampleZh: "电影很紧张。", source: "Wortkarte 原创例句" },
  Kino: { example: "Wir gehen ins Kino.", exampleZh: "我们去看电影。", source: "Wortkarte 原创例句" },
  Schauspieler: { example: "Der Schauspieler ist bekannt.", exampleZh: "这位演员很有名。", source: "Wortkarte 原创例句" },
  Regisseur: { example: "Der Regisseur erklärt die Szene.", exampleZh: "导演讲解这场戏。", source: "Wortkarte 原创例句" },
  Kamera: { example: "Die Kamera läuft.", exampleZh: "摄影机在拍。", source: "Wortkarte 原创例句" },
  Szene: { example: "Die Szene ist traurig.", exampleZh: "这场戏很悲伤。", source: "Wortkarte 原创例句" },
  Handlung: { example: "Die Handlung ist kompliziert.", exampleZh: "情节很复杂。", source: "Wortkarte 原创例句" },
  Publikum: { example: "Das Publikum klatscht.", exampleZh: "观众鼓掌。", source: "Wortkarte 原创例句" },
  Vorstellung: { example: "Die Vorstellung beginnt um acht.", exampleZh: "演出八点开始。", source: "Wortkarte 原创例句" },
  Eintritt: { example: "Der Eintritt kostet zehn Euro.", exampleZh: "门票十欧。", source: "Wortkarte 原创例句" },
  Theater: { example: "Das Theater ist heute voll.", exampleZh: "剧院今天满座。", source: "Wortkarte 原创例句" },
  Stück: { example: "Das Stück dauert zwei Stunden.", exampleZh: "这出戏持续两小时。", source: "Wortkarte 原创例句" },
  Rolle: { example: "Sie spielt die Hauptrolle.", exampleZh: "她演主角。", source: "Wortkarte 原创例句" },
  Premiere: { example: "Die Premiere war ein Erfolg.", exampleZh: "首演成功。", source: "Wortkarte 原创例句" },
  Kulisse: { example: "Die Kulisse ist aufwendig.", exampleZh: "布景很复杂。", source: "Wortkarte 原创例句" },
  Regie: { example: "Die Regie führt Anna.", exampleZh: "安娜执导。", source: "Wortkarte 原创例句" },
  Aufführung: { example: "Die Aufführung beginnt um acht.", exampleZh: "演出八点开始。", source: "Wortkarte 原创例句" },
  Applaus: { example: "Der Applaus war lang.", exampleZh: "掌声持续很久。", source: "Wortkarte 原创例句" },
  Bühnenbild: { example: "Das Bühnenbild ist schlicht.", exampleZh: "舞台布景简洁。", source: "Wortkarte 原创例句" },
  Ensemble: { example: "Das Ensemble ist bekannt.", exampleZh: "剧团很有名。", source: "Wortkarte 原创例句" },
  Umwelt: { example: "Wir müssen die Umwelt schützen.", exampleZh: "我们必须保护环境。", source: "Wortkarte 原创例句" },
  Klima: { example: "Das Klima verändert sich.", exampleZh: "气候在变化。", source: "Wortkarte 原创例句" },
  Energie: { example: "Wir sparen Energie.", exampleZh: "我们节约能源。", source: "Wortkarte 原创例句" },
  Müll: { example: "Der Müll wird getrennt.", exampleZh: "垃圾被分类。", source: "Wortkarte 原创例句" },
  Recycling: { example: "Recycling schont Ressourcen.", exampleZh: "回收节约资源。", source: "Wortkarte 原创例句" },
  Wasser: { example: "Das Wasser ist sauber.", exampleZh: "水很干净。", source: "Wortkarte 原创例句" },
  Luft: { example: "Die Luft ist frisch.", exampleZh: "空气清新。", source: "Wortkarte 原创例句" },
  Natur: { example: "Die Natur ist wichtig.", exampleZh: "自然很重要。", source: "Wortkarte 原创例句" },
  Art: { example: "Diese Art ist selten.", exampleZh: "这个物种很稀有。", source: "Wortkarte 原创例句" },
  Schutz: { example: "Der Schutz der Tiere ist nötig.", exampleZh: "保护动物是必要的。", source: "Wortkarte 原创例句" },
  Technik: { example: "Die Technik hilft uns.", exampleZh: "技术帮助我们。", source: "Wortkarte 原创例句" },
  Maschine: { example: "Die Maschine läuft.", exampleZh: "机器在运转。", source: "Wortkarte 原创例句" },
  Forschung: { example: "Die Forschung braucht Zeit.", exampleZh: "研究需要时间。", source: "Wortkarte 原创例句" },
  Labor: { example: "Das Labor ist sauber.", exampleZh: "实验室很干净。", source: "Wortkarte 原创例句" },
  Experiment: { example: "Das Experiment war erfolgreich.", exampleZh: "实验成功了。", source: "Wortkarte 原创例句" },
  Entwicklung: { example: "Die Entwicklung geht schnell.", exampleZh: "发展很快。", source: "Wortkarte 原创例句" },
  Gerät: { example: "Das Gerät ist kaputt.", exampleZh: "设备坏了。", source: "Wortkarte 原创例句" },
  Computer: { example: "Der Computer ist neu.", exampleZh: "电脑是新的。", source: "Wortkarte 原创例句" },
  Erfinder: { example: "Der Erfinder ist berühmt.", exampleZh: "发明家很有名。", source: "Wortkarte 原创例句" },
  Werkzeug: { example: "Das Werkzeug liegt im Kasten.", exampleZh: "工具在箱子里。", source: "Wortkarte 原创例句" },
  Internet: { example: "Das Internet ist langsam.", exampleZh: "网络很慢。", source: "Wortkarte 原创例句" },
  Smartphone: { example: "Das Smartphone ist neu.", exampleZh: "智能手机是新的。", source: "Wortkarte 原创例句" },
  Daten: { example: "Die Daten sind sicher.", exampleZh: "数据安全。", source: "Wortkarte 原创例句" },
  Netz: { example: "Das Netz ist stabil.", exampleZh: "网络稳定。", source: "Wortkarte 原创例句" },
  Medien: { example: "Die Medien berichten darüber.", exampleZh: "媒体报道此事。", source: "Wortkarte 原创例句" },
  digital: { example: "Der Antrag ist digital.", exampleZh: "申请是数字化的。", source: "Wortkarte 原创例句" },
  online: { example: "Ich bin online.", exampleZh: "我在线。", source: "Wortkarte 原创例句" },
  App: { example: "Die App funktioniert gut.", exampleZh: "这个应用很好用。", source: "Wortkarte 原创例句" },
  Sicherheit: { example: "Sicherheit ist wichtig.", exampleZh: "安全很重要。", source: "Wortkarte 原创例句" },
  Zugang: { example: "Der Zugang ist gesperrt.", exampleZh: "入口关闭。", source: "Wortkarte 原创例句" },
  Krieg: { example: "Der Krieg ist vorbei.", exampleZh: "战争结束了。", source: "Wortkarte 原创例句" },
  Frieden: { example: "Wir wollen Frieden.", exampleZh: "我们要和平。", source: "Wortkarte 原创例句" },
  Mauer: { example: "Die Mauer fiel 1989.", exampleZh: "墙在1989年倒塌。", source: "Wortkarte 原创例句" },
  Grenze: { example: "Die Grenze ist offen.", exampleZh: "边境开放。", source: "Wortkarte 原创例句" },
  Freiheit: { example: "Freiheit ist wichtig.", exampleZh: "自由很重要。", source: "Wortkarte 原创例句" },
  Einheit: { example: "Die Einheit kam 1990.", exampleZh: "统一在1990年实现。", source: "Wortkarte 原创例句" },
  Erinnerung: { example: "Die Erinnerung bleibt.", exampleZh: "记忆仍在。", source: "Wortkarte 原创例句" },
  Gedenken: { example: "Wir gedenken der Opfer.", exampleZh: "我们纪念受害者。", source: "Wortkarte 原创例句" },
  Opfer: { example: "Die Opfer werden geehrt.", exampleZh: "受害者受到纪念。", source: "Wortkarte 原创例句" },
  Wiedervereinigung: { example: "Die Wiedervereinigung war 1990.", exampleZh: "两德统一在1990年。", source: "Wortkarte 原创例句" },
  Bibliothek: { example: "Die Bibliothek ist offen.", exampleZh: "图书馆开放。", source: "Wortkarte 原创例句" },
  Buch: { example: "Das Buch ist spannend.", exampleZh: "这本书很精彩。", source: "Wortkarte 原创例句" },
  Regal: { example: "Das Regal ist voll.", exampleZh: "书架满了。", source: "Wortkarte 原创例句" },
  Lesesaal: { example: "Der Lesesaal ist ruhig.", exampleZh: "阅览室很安静。", source: "Wortkarte 原创例句" },
  Ausweis: { example: "Ich brauche einen Ausweis.", exampleZh: "我需要证件。", source: "Wortkarte 原创例句" },
  Gebühr: { example: "Die Gebühr ist niedrig.", exampleZh: "费用很低。", source: "Wortkarte 原创例句" },
  Leihgabe: { example: "Die Leihgabe dauert vier Wochen.", exampleZh: "借阅期四周。", source: "Wortkarte 原创例句" },
  Katalog: { example: "Der Katalog ist online.", exampleZh: "目录在网上。", source: "Wortkarte 原创例句" },
  Lesung: { example: "Die Lesung beginnt um sieben.", exampleZh: "朗读会七点开始。", source: "Wortkarte 原创例句" },
  Stille: { example: "In der Bibliothek herrscht Stille.", exampleZh: "图书馆里很安静。", source: "Wortkarte 原创例句" },
  Kaffee: { example: "Der Kaffee ist heiß.", exampleZh: "咖啡很热。", source: "Wortkarte 原创例句" },
  Tasse: { example: "Die Tasse ist leer.", exampleZh: "杯子空了。", source: "Wortkarte 原创例句" },
  Kanne: { example: "Die Kanne ist voll.", exampleZh: "壶是满的。", source: "Wortkarte 原创例句" },
  Kuchen: { example: "Der Kuchen schmeckt gut.", exampleZh: "蛋糕很好吃。", source: "Wortkarte 原创例句" },
  Café: { example: "Das Café ist gemütlich.", exampleZh: "咖啡馆很舒适。", source: "Wortkarte 原创例句" },
  Kellner: { example: "Der Kellner bringt die Rechnung.", exampleZh: "服务员拿来账单。", source: "Wortkarte 原创例句" },
  Rechnung: { example: "Die Rechnung ist hoch.", exampleZh: "账单很高。", source: "Wortkarte 原创例句" },
  Milch: { example: "Ich trinke Kaffee mit Milch.", exampleZh: "我喝加奶咖啡。", source: "Wortkarte 原创例句" },
  Zucker: { example: "Ohne Zucker, bitte.", exampleZh: "请不加糖。", source: "Wortkarte 原创例句" },
  Gebäck: { example: "Zum Kaffee gibt es Gebäck.", exampleZh: "咖啡配糕点。", source: "Wortkarte 原创例句" },
  Buch: { example: "Das Buch ist spannend.", exampleZh: "这本书很精彩。", source: "Wortkarte 原创例句" },
  Roman: { example: "Der Roman hat 300 Seiten.", exampleZh: "这部小说有300页。", source: "Wortkarte 原创例句" },
  Autor: { example: "Der Autor liest heute.", exampleZh: "作者今天朗读。", source: "Wortkarte 原创例句" },
  Verlag: { example: "Der Verlag ist klein.", exampleZh: "出版社很小。", source: "Wortkarte 原创例句" },
  Leser: { example: "Die Leser mögen das Buch.", exampleZh: "读者喜欢这本书。", source: "Wortkarte 原创例句" },
  Seite: { example: "Die Seite ist leer.", exampleZh: "这页是空的。", source: "Wortkarte 原创例句" },
  Kapitel: { example: "Das Kapitel ist kurz.", exampleZh: "这一章很短。", source: "Wortkarte 原创例句" },
  Titel: { example: "Der Titel klingt gut.", exampleZh: "标题不错。", source: "Wortkarte 原创例句" },
  Buchhandlung: { example: "Die Buchhandlung ist am Markt.", exampleZh: "书店在市场旁。", source: "Wortkarte 原创例句" },
  Manuskript: { example: "Das Manuskript ist fertig.", exampleZh: "手稿完成了。", source: "Wortkarte 原创例句" },
  Buchpreis: { example: "Der Buchpreis ist wichtig.", exampleZh: "图书奖很重要。", source: "Wortkarte 原创例句" },
  Bestseller: { example: "Der Roman ist ein Bestseller.", exampleZh: "这部小说是畅销书。", source: "Wortkarte 原创例句" },
  Neuerscheinung: { example: "Die Neuerscheinung ist gefragt.", exampleZh: "新书很抢手。", source: "Wortkarte 原创例句" },
  Shortlist: { example: "Die Shortlist ist bekannt.", exampleZh: "短名单公布了。", source: "Wortkarte 原创例句" },
  Jury: { example: "Die Jury tagt morgen.", exampleZh: "评委会明天开会。", source: "Wortkarte 原创例句" },
  Literaturpreis: { example: "Sie erhält einen Literaturpreis.", exampleZh: "她获得文学奖。", source: "Wortkarte 原创例句" },
  Verlagsprogramm: { example: "Das Verlagsprogramm ist vielfältig.", exampleZh: "出版计划多样。", source: "Wortkarte 原创例句" },
  Lesereise: { example: "Die Lesereise beginnt im Herbst.", exampleZh: "巡回朗读秋天开始。", source: "Wortkarte 原创例句" },
  Übersetzung: { example: "Die Übersetzung ist gelungen.", exampleZh: "翻译很成功。", source: "Wortkarte 原创例句" },
  Rezension: { example: "Die Rezension ist positiv.", exampleZh: "书评正面。", source: "Wortkarte 原创例句" },
  Chor: { example: "Der Chor singt im Konzert.", exampleZh: "合唱团在音乐会上演唱。", source: "Wortkarte 原创例句" },
  Orchester: { example: "Das Orchester spielt Beethoven.", exampleZh: "乐团演奏贝多芬。", source: "Wortkarte 原创例句" },
  Probe: { example: "Die Probe dauert zwei Stunden.", exampleZh: "排练持续两小时。", source: "Wortkarte 原创例句" },
  Auftritt: { example: "Der Auftritt war erfolgreich.", exampleZh: "演出很成功。", source: "Wortkarte 原创例句" },
  Note: { example: "Die Note ist zu hoch.", exampleZh: "这个音太高了。", source: "Wortkarte 原创例句" },
  Flöte: { example: "Sie spielt Flöte.", exampleZh: "她吹长笛。", source: "Wortkarte 原创例句" },
  Trompete: { example: "Die Trompete ist laut.", exampleZh: "小号很响。", source: "Wortkarte 原创例句" },
  Geige: { example: "Er lernt Geige.", exampleZh: "他学小提琴。", source: "Wortkarte 原创例句" },
  Saxophon: { example: "Das Saxophon klingt warm.", exampleZh: "萨克斯声音温暖。", source: "Wortkarte 原创例句" },
  Publikum: { example: "Das Publikum ist begeistert.", exampleZh: "观众很兴奋。", source: "Wortkarte 原创例句" },
  Museum: { example: "Das Museum ist heute offen.", exampleZh: "博物馆今天开放。", source: "Wortkarte 原创例句" },
  Ausstellung: { example: "Die Ausstellung ist interessant.", exampleZh: "展览很有趣。", source: "Wortkarte 原创例句" },
  Führung: { example: "Die Führung beginnt um elf.", exampleZh: "导览十一点开始。", source: "Wortkarte 原创例句" },
  Exponat: { example: "Das Exponat ist gut erhalten.", exampleZh: "展品保存良好。", source: "Wortkarte 原创例句" },
  Sammlung: { example: "Die Sammlung ist groß.", exampleZh: "收藏很大。", source: "Wortkarte 原创例句" },
  Kunstwerk: { example: "Das Kunstwerk hängt an der Wand.", exampleZh: "艺术品挂在墙上。", source: "Wortkarte 原创例句" },
  Besucher: { example: "Die Besucher warten draußen.", exampleZh: "参观者在外面等。", source: "Wortkarte 原创例句" },
  Katalog: { example: "Der Katalog kostet fünf Euro.", exampleZh: "图录五欧。", source: "Wortkarte 原创例句" },
  Shop: { example: "Der Shop ist am Ausgang.", exampleZh: "商店在出口。", source: "Wortkarte 原创例句" },
  Gott: { example: "Viele Menschen, die an Gott glauben, gehen am Sonntag in die Kirche.", exampleZh: "许多信神的人周日去教堂。", source: "《德语基础词汇分类学习手册》" },
  heilig: { example: "In Indien gilt die Kuh als heiliges Tier.", exampleZh: "在印度，牛被视为神圣的动物。", source: "《德语基础词汇分类学习手册》" },
  katholisch: { example: "Er ist Mitglied der katholischen Kirche.", exampleZh: "他是天主教会的成员。", source: "《德语基础词汇分类学习手册》" },
  Schicksal: { example: "Sie nahm ihr Schicksal an und vertraute auf Gott.", exampleZh: "她接受了自己的命运，并信靠上帝。", source: "《德语基础词汇分类学习手册》" },
  Glaube: { example: "Mein Glaube hilft mir in schwierigen Situationen.", exampleZh: "我的信仰在困难时帮助我。", source: "《德语基础词汇分类学习手册》" }
};

const HISTORY_YEAR_BY_ID = {  "history-800": 800,
  "history-962": 962,
  "history-1517": 1517,
  "history-1648": 1648,
  "history-1848": 1848,
  "history-1871": 1871,
  "history-weimar": 1919,
  "history-weimarer-republik": 1919,
  "history-1933": 1933,
  "history-1949": 1949,
  "history-1961": 1961,
  "history-1989": 1989,
  "history-1990": 1990,
  "history-heinrich-loewe": 1150,
  "history-wirtschaftskrise-1970er": 1973,
  "history-wohnungsnot": 1950,
  "history-frankenreich": 500,
  "history-marshallplan-luftbruecke": 1948,
  "history-oesterreich-1938": 1938,
  "history-widerstand-1944": 1944,
  "history-ostdeutschland-transformation": 1990,
  "history-kaspar-hauser": 1828,
  "culture-industriearbeit": 1850,
  "culture-lutherbibel": 1522,
  "culture-franzoesische-revolution": 1789,
  "culture-brandenburger-tor": 1791,
  "culture-nachwendezeit": 1990,
  "culture-euro-krise": 2010
};

const CULTURE_ERAS = [
  { id: "all", label: "全部", range: "公元前–今天" },
  { id: "ancient", label: "古代", range: "–500" },
  { id: "medieval", label: "中世纪", range: "500–1500" },
  { id: "earlymodern", label: "近代早期", range: "1500–1800" },
  { id: "nineteenth", label: "19世纪", range: "1800–1900" },
  { id: "wars", label: "战争与危机", range: "1900–1945" },
  { id: "divided", label: "分裂与冷战", range: "1945–1990" },
  { id: "contemporary", label: "当代", range: "1990至今" },
  { id: "undated", label: "待定", range: "暂无年份" }
];

function cultureYear(item) {
  if (!item) return null;
  if (Number.isFinite(Number(item.sortYear))) return Number(item.sortYear);
  const parsed = String(item.year || "").match(/\d{3,4}/);
  if (parsed) return Number(parsed[0]);
  if (item.category === "person") {
    const birth = String(item.contentDe || "").match(/\b(1[0-9]{3}|20[0-9]{2})\s*[–-]/);
    if (birth) return Number(birth[1]);
    const firstYear = String(item.contentDe || "").match(/^\s*(\d{4})\s+(?:in|geboren)\b/);
    if (firstYear) return Number(firstYear[1]);
  }
  return HISTORY_YEAR_BY_ID[item.id] ?? null;
}

function cultureEraForYear(year) {
  if (!Number.isFinite(year)) return "undated";
  if (year <= 500) return "ancient";
  if (year <= 1500) return "medieval";
  if (year <= 1800) return "earlymodern";
  if (year <= 1900) return "nineteenth";
  if (year <= 1945) return "wars";
  if (year <= 1990) return "divided";
  return "contemporary";
}
const ARTICLES = Array.isArray(window.WORTKARTE_ARTICLES) ? window.WORTKARTE_ARTICLES : [];
const ARTICLE_QUESTIONS = window.WORTKARTE_ARTICLE_QUESTIONS || {};
const ARTICLE_TRANSLATIONS = window.WORTKARTE_ARTICLE_TRANSLATIONS || {};
const PHRASES = Array.isArray(window.WORTKARTE_PHRASES) ? window.WORTKARTE_PHRASES : [];
const OCR_CONTENT_BASE = window.WORTKARTE_OCR_CONTENT || { articles: [], phrases: [], words: [], grammar: [] };
const OCR_CONTENT_EXTRA = window.WORTKARTE_OCR_CONTENT_4500 || { articles: [], phrases: [], words: [], grammar: [] };
const OCR_CONTENT_8250 = window.WORTKARTE_OCR_CONTENT_8250 || { articles: [], phrases: [], words: [], grammar: [] };
const OCR_CONTENT_9750 = window.WORTKARTE_OCR_CONTENT_9750 || { articles: [], phrases: [], words: [], grammar: [] };
const OCR_CONTENT_11250 = window.WORTKARTE_OCR_CONTENT_11250 || { articles: [], phrases: [], words: [], grammar: [] };
const OCR_CONTENT = {
  ...OCR_CONTENT_BASE,
  words: [...(OCR_CONTENT_BASE.words || []), ...(OCR_CONTENT_EXTRA.words || []), ...(OCR_CONTENT_8250.words || []), ...(OCR_CONTENT_9750.words || []), ...(OCR_CONTENT_11250.words || [])],
  phrases: [...(OCR_CONTENT_BASE.phrases || []), ...(OCR_CONTENT_EXTRA.phrases || []), ...(OCR_CONTENT_8250.phrases || []), ...(OCR_CONTENT_9750.phrases || []), ...(OCR_CONTENT_11250.phrases || [])],
  articles: [...(OCR_CONTENT_BASE.articles || []), ...(OCR_CONTENT_EXTRA.articles || []), ...(OCR_CONTENT_8250.articles || []), ...(OCR_CONTENT_9750.articles || []), ...(OCR_CONTENT_11250.articles || [])],
  grammar: [...(OCR_CONTENT_BASE.grammar || []), ...(OCR_CONTENT_EXTRA.grammar || []), ...(OCR_CONTENT_8250.grammar || []), ...(OCR_CONTENT_9750.grammar || []), ...(OCR_CONTENT_11250.grammar || [])]
};
function dedupeContent(items, keyFn) {
  const seen = new Set();
  return (items || []).filter(item => {
    let key = "";
    try { key = keyFn(item); } catch { key = ""; }
    if (!key) key = String(item && (item.id || item.word || item.de || item.contentDe || item.contentZh) || "");
    key = key.trim().toLocaleLowerCase("de");
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
OCR_CONTENT.words = dedupeContent(OCR_CONTENT.words, item => item.id || item.word);
OCR_CONTENT.phrases = dedupeContent(OCR_CONTENT.phrases, item => `${item.de || ""}|${item.zh || ""}`);
OCR_CONTENT.articles = dedupeContent(OCR_CONTENT.articles, item => item.id || String(item.contentDe || "").slice(0, 180));
OCR_CONTENT.grammar = dedupeContent(OCR_CONTENT.grammar, item => item.id || item.title);
CULTURE_DATA.items = dedupeContent(CULTURE_DATA.items, item => item.id || `${item.titleZh || ""}|${item.contentZh || ""}`);
const OCR_VOCAB = Array.isArray(window.WORTKARTE_OCR_VOCAB) ? window.WORTKARTE_OCR_VOCAB : [];
const GODIC_PACK = window.WORTKARTE_GODIC && window.WORTKARTE_GODIC.entries ? window.WORTKARTE_GODIC : null;
const GODIC_ENTRIES = GODIC_PACK ? GODIC_PACK.entries : {};
let DEHELPER_PACK = window.WORTKARTE_DEHELPER && window.WORTKARTE_DEHELPER.entries ? window.WORTKARTE_DEHELPER : null;
let DEHELPER_ENTRIES = DEHELPER_PACK ? DEHELPER_PACK.entries : {};
const DEHELPER_BY_WORD = new Map();
const DEHELPER_HEADWORD_KEYS = new Set((window.WORTKARTE_HEADWORDS || []).map(value => String(value).toLowerCase()));
const HEADWORD_FALLBACK = Array.isArray(window.WORTKARTE_HEADWORD_FALLBACK) ? window.WORTKARTE_HEADWORD_FALLBACK : [];
let DEHELPER_PHRASES = [];

function rebuildDehelperCaches() {
  DEHELPER_BY_WORD.clear();
  for (const entry of Object.values(DEHELPER_ENTRIES || {})) {
    const key = String(entry.word || "").toLowerCase();
    if (key && !DEHELPER_BY_WORD.has(key)) DEHELPER_BY_WORD.set(key, entry);
  }
  DEHELPER_PHRASES = Object.values(DEHELPER_ENTRIES || {})
    .filter(entry => {
      const text = String(entry.word || "").trim();
      return text.split(/\s+/).length >= 2 && !/[()]/.test(text) && !/[=]/.test(text);
    })
    .map(entry => ({
      id: `dehelper-ph-${String(entry.word).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`,
      de: entry.word,
      zh: entry.definitions || "",
      level: String(entry.word).trim().split(/\s+/).length >= 4 ? "B1" : "A2",
      source: "Dehelper combined.bin",
      sourceUrl: "",
      license: entry.license || ""
    }));
}

function applyDehelperPack(pack) {
  if (!pack || !pack.entries) return;
  DEHELPER_PACK = pack;
  DEHELPER_ENTRIES = pack.entries;
  window.WORTKARTE_DEHELPER = pack;
  rebuildDehelperCaches();
}
window.__applyDehelperPack = applyDehelperPack;
rebuildDehelperCaches();

const GODIC_BY_WORD = new Map();
for (const entry of Object.values(GODIC_ENTRIES)) {
  const key = String(entry.word || "").toLowerCase();
  if (key && !GODIC_BY_WORD.has(key)) GODIC_BY_WORD.set(key, entry);
}

function godicEntryFor(word) {
  if (!word) return null;
  const byArticle = GODIC_ENTRIES[`${word.article || ""}|${String(word.word || "").toLowerCase()}`];
  if (byArticle) return byArticle;
  const byWord = GODIC_BY_WORD.get(String(word.word || "").toLowerCase());
  if (byWord) return byWord;
  const localArticle = DEHELPER_ENTRIES[`${word.article || ""}|${String(word.word || "").toLowerCase()}`];
  if (localArticle) return localArticle;
  return DEHELPER_BY_WORD.get(String(word.word || "").toLowerCase()) || null;
}
const GOETHE_WORDS = (() => {
  const pack = window.WORTKARTE_DICTIONARY;
  if (!pack || !pack.levels) return [];
  return Object.values(pack.levels).flatMap(level => Array.isArray(level.words) ? level.words : []);
})();
const WORD_FIXES = window.WORTKARTE_FIXES || {};
const WORD_ARTICLES = window.WORTKARTE_ARTICLES || {};
const NOUN_FIXES = window.WORTKARTE_NOUN_FIXES || {};
const GUIDE_FIXES = window.WORTKARTE_GUIDE_FIXES || {};
const GUIDE_EXAMPLES = window.WORTKARTE_GUIDE_EXAMPLES || {};
const VERBFORMEN_FIXES = window.WORTKARTE_VERBFORMEN_FIXES || {};
const GLOSSAR_FIXES = window.WORTKARTE_GLOSSAR_FIXES || {};
const WIKTIONARY_FIXES = window.WORTKARTE_WIKTIONARY_FIXES || {};
const WORD_CALIBRATION = (window.WORTKARTE_CALIBRATION && window.WORTKARTE_CALIBRATION.fixes) || {};
const TATOEBA_EXAMPLES = window.WORTKARTE_TATOEBA_EXAMPLES || {};
const WORD_SPLITS = window.WORTKARTE_SPLITS || [];
const WORD_BLACKLIST = new Set(window.WORTKARTE_BLACKLIST || []);
const SKIP_KEYS = new Set(["die|Möbel"]);

const WORD_REPAIRS = {
  "Gehsteig (D": "Gehsteig",
  "Glace Glacé": "Glace",
  "Streichholz; Zündholz": "Streichholz",
  "Kommilitone Kommilitonin": "Kommilitone",
  "Psychologe Psychologin": "Psychologe",
  "Schlafexperte Schlafexpertin": "Schlafexperte"
};

const PLURAL_FIXES = {
  "Land": "die Länder",
  "Mann": "die Männer",
  "Mädchen": "die Mädchen",
  "Test": "die Tests",
  "Praxis": "die Praxen",
  "Balkon": "die Balkone",
  "Thema": "die Themen",
  "Wasser": "die Wässer",
  "Schadenersatz": "无复数",
  "Turnen": "无复数",
  "Leichtathletik": "无复数",
  "Milch": "无复数",
  "Hunger": "无复数",
  "Durst": "无复数",
  "Obst": "无复数",
  "Fleisch": "无复数",
  "Butter": "无复数",
  "Internet": "无复数"
};

// 清理 OCR 合并词条：不是名词的短语/形容词/残片不再计入“名词缺阴阳性”。
const POS_RECLASSIFY = {
  "Lieblings": "other",
  "Rad fahren": "verb",
  "Geburts- (jahr": "other",
  "mittel": "adj",
  "renoviert": "adj",
  "wie wie viel": "other",
  "monee": "other",
  "P paar": "other",
  "Schwieger": "other",
  "Sonder": "other",
  "zuverlässig das der Zvieri Znüni": "other",
  "Bewunderer Bewunderin der die": "other",
  "Einwanderer Einwanderin der die": "other",
  "FaD": "other",
  "Hähnchen Hühnchen; A": "other",
  "Hähnchen Hühnchen; CH": "other",
  "Jura (Sg": "other",
  "Stadtentwicklung und Bauwesen": "other",
  "Kind und Kegel": "other",
  "Kriminal": "adj"
};

// 明确的阴阳性补全；歧义或纯复数条目仍保留待校对。
const NOUN_ARTICLE_FIXES = {
  "Bekannte": "der",
  "Jugendliche": "der",
  "Bub": "der",
  "Ferien": "die",
  "Früchte": "die",
  "Gehsteig": "der",
  "Glace": "das",
  "Hähnchen": "das",
  "Poulet": "das",
  "Spezial": "das",
  "Streichholz": "das",
  "Betracht": "der",
  "Jura": "das",
  "Kommilitone": "der",
  "Psychologe": "der",
  "Road Movie": "der",
  "Schlafexperte": "der",
  "Sprachwissenschaftler": "der",
  "COPD": "die",
  "Großbritannien": "das",
  "Inemuri": "der",
  "Institut für Gesellschaftsforschung": "das",
  "IT-Experte": "der",
  "Mittelamerika": "das",
  "Niedersachsen": "das",
  "Südamerika": "das",
  "Ägypten": "das",
  "Bewunderer": "der",
  "Einwanderer": "der",
  "fossile Brennstoffe": "die",
  "gesundheitliche Folgen": "die",
  "soziologische Studien": "die"
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function icon(name, className = "") {
  return `<svg class="icon ${className}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function startOfDay(ts = Date.now()) {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfDay(ts = Date.now()) {
  const d = new Date(ts);
  d.setHours(23, 59, 59, 999);
  return d;
}

function addDays(ts, amount) {
  const d = new Date(ts);
  d.setDate(d.getDate() + amount);
  return d;
}

function dayKey(ts = Date.now()) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function isSameDay(a, b) {
  return dayKey(a) === dayKey(b);
}

function round(value, digits = 2) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function normalize(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatGermanDate(ts = Date.now()) {
  const d = new Date(ts);
  return `${WEEKDAYS_DE[d.getDay()]} · ${d.getDate()}. ${MONTHS_DE[d.getMonth()]}`;
}

function formatDateZh(ts) {
  const d = new Date(ts);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

function formatClock(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${pad(seconds)}`;
}

function formatDue(ts) {
  if (!ts) return "—";
  const now = Date.now();
  if (ts <= now + MINUTE_MS) return "现在";
  const today = startOfDay(now).getTime();
  const target = startOfDay(ts).getTime();
  if (target === today) {
    const d = new Date(ts);
    return `今天 ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  if (target === today + DAY_MS) return "明天";
  if (target < today + 7 * DAY_MS) return `周${WEEKDAYS_ZH[new Date(ts).getDay()]}`;
  return formatDateZh(ts);
}

function formatInterval(intervalDays) {
  if (!Number.isFinite(intervalDays) || intervalDays <= 0) return "10 分钟";
  const minutes = intervalDays * 24 * 60;
  if (minutes < 60) return `${Math.max(1, Math.round(minutes))} 分钟`;
  const hours = intervalDays * 24;
  if (hours < 24) return `${Math.max(1, Math.round(hours))} 小时`;
  if (intervalDays < 30) return `${Math.max(1, Math.round(intervalDays))} 天`;
  if (intervalDays < 365) return `${round(intervalDays / 30, 1)} 个月`;
  return `${round(intervalDays / 365, 1)} 年`;
}

function formatReviewWait(milliseconds) {
  const ms = Number(milliseconds);
  if (!Number.isFinite(ms) || ms <= 0) return "立即";
  const minutes = ms / MINUTE_MS;
  if (minutes < 60) return `${Math.max(1, Math.round(minutes))} 分钟`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.max(1, Math.round(hours))} 小时`;
  const days = hours / 24;
  if (days < 30) return `${Math.max(1, Math.round(days))} 天`;
  return `${round(days / 30, 1)} 个月`;
}

function levelMeta(level) {
  return LEVEL_META[Math.max(0, Math.min(5, Number(level) || 0))];
}

function levelReasonText(rec) {
  if (!rec) return "";
  if (rec.levelReason === "wrong") return "因答错重置";
  if (rec.levelReason === "self") return "自评起点";
  if (rec.levelReason === "testing") return "三形式未全部通过";
  return "";
}

function wordDisplay(word, withArticle = true) {
  if (!word) return "";
  if (withArticle && word.article) return `${word.article} ${word.word}`;
  return word.word;
}

function spellingAnswer(word) {
  if (!word) return "";
  return word.article ? `${word.article} ${word.word}` : word.word;
}

function pluralLabel(word) {
  if (word.plural) {
    if (word.plural === "无复数") return "无复数";
    const type = word.pluralType || inferPluralType(word, word.plural);
    const pattern = PLURAL_TYPE_LABELS[type] || "";
    return `${word.plural}${pattern ? ` · ${pattern}` : ""}${word.pluralInferred ? " · 推测" : ""}`;
  }
  if (word.book || word.pack) return "复数见词典";
  return "无复数";
}

function formsLine(word) {
  const uncertain = word.posUncertain ? "（待校对）" : "";
  const fine = word.finePos || word.pos || "";
  if (fine === "noun") return `名词 · ${word.plural ? pluralLabel(word) : "复数待补充"}`;
  if (fine === "verb") return `动词${uncertain} · ${word.forms || "变位待补充"}`;
  if (fine === "adj") return `形容词${uncertain} · ${word.forms || "比较级待补充"}`;
  if (fine === "adv") return `副词 · ${word.forms || "无变形"}`;
  if (fine === "phrase") return "短语 · 固定表达";
  if (fine === "other") return "其他/待细分 · 变形待补充";
  if (!word.pos && fine !== "other") return "词性待补充 · 变形待补充";
  return `${FINE_POS_LABELS[fine] || POS_LABELS[word.pos] || "词"}${uncertain} · ${word.forms || "无变形"}`;
}

function morphLine(word) {
  return formsLine(word);
}

function applyTheme() {
  const theme = String(state.settings?.theme || "warm");
  document.documentElement.dataset.theme = ["warm", "forest", "blue", "dark", "contrast"].includes(theme) ? theme : "warm";
  const accent = String(state.settings?.accent || "").trim();
  if (/^#[0-9a-f]{6}$/i.test(accent)) {
    document.documentElement.style.setProperty("--clay", accent);
  } else {
    document.documentElement.style.removeProperty("--clay");
  }
}

function weeklyQuestionCount() {
  return { simple: 4, standard: 8, challenge: 12 }[state.settings?.quizDifficulty] || 8;
}

function defaultSettings() {
  return {
    name: "Lena",
    dailyGoal: 20,
    sound: true,
    reminderEnabled: false,
    reminderTime: "20:00",
    theme: "warm",
    accent: "",
    quizDifficulty: "standard",
    weeklyQuizEnabled: true,
    repeatIntervalMin: 30,
    personalization: true,
    dailyLevel: "all"
  };
}

function freshState() {
  return {
    version: 2,
    schemaVersion: 6,
    settings: defaultSettings(),
    reviews: {},
    customWords: [],
    customPhrases: [],
    customArticles: [],
    customGrammar: [],
    favorites: [],
    activity: {},
    stats: { reviews: 0, correct: 0 },
    mistakes: {},
    mistakeTypes: {},
    quizBest: 0,
    grammar: { seen: [], correct: [] },
    readArticles: [],
    progressByLevel: { A1: { correct: 0, total: 0 }, A2: { correct: 0, total: 0 }, B1: { correct: 0, total: 0 }, B2: { correct: 0, total: 0 }, C1: { correct: 0, total: 0 }, C2: { correct: 0, total: 0 } },
    meta: { demo: false, createdAt: new Date().toISOString() }
  };
}

function makeReview({ reps, interval, ease, lapses, due, last, status, mastery, correctStreak }) {
  const level = mastery || (status === "mastered" ? "mastered" : status === "learning" ? "forgotten" : "unmastered");
  return {
    reps,
    repetition: reps,
    interval,
    ease,
    easiness: ease,
    lapses,
    due,
    nextReviewDate: due,
    last,
    status: level,
    mastery: level,
    correctStreak: Number(correctStreak) || 0
  };
}

function createDemoState() {
  const state = freshState();
  state.meta.demo = true;
  const now = Date.now();

  const dueIds = [
    "alltag-02", "alltag-04", "gefuehle-02", "gefuehle-05", "reisen-01",
    "reisen-04", "lernen-01", "lernen-06", "zeit-01", "zeit-04", "zeit-09"
  ];
  dueIds.forEach((id, index) => {
    const interval = 2 + (index % 6);
    state.reviews[id] = makeReview({
      reps: 2 + (index % 3),
      interval,
      ease: 2.35 + (index % 4) * 0.08,
      lapses: 1 + (index % 3),
      due: now - (1 + index * 0.8) * HOUR_MS,
      last: now - interval * DAY_MS,
      status: "learning"
    });
  });

  const masteredIds = [
    "alltag-01", "alltag-03", "gefuehle-01", "gefuehle-03",
    "reisen-02", "lernen-02", "zeit-02"
  ];
  masteredIds.forEach((id, index) => {
    const interval = 24 + index * 4;
    state.reviews[id] = makeReview({
      reps: 5 + (index % 3),
      interval,
      ease: 2.65 + (index % 3) * 0.1,
      lapses: index % 2,
      due: now + (4 + index * 3) * DAY_MS,
      last: now - Math.round(interval * 0.55) * DAY_MS,
      status: "mastered"
    });
  });

  const learningIds = ["alltag-07", "gefuehle-06", "reisen-08", "lernen-07", "zeit-07", "zeit-10"];
  learningIds.forEach((id, index) => {
    const interval = 2 + (index % 4);
    state.reviews[id] = makeReview({
      reps: 1 + (index % 2),
      interval,
      ease: 2.4,
      lapses: index % 2,
      due: now + (1 + (index % 3)) * DAY_MS + (index + 2) * HOUR_MS,
      last: now - interval * DAY_MS,
      status: "learning"
    });
  });

  state.stats = { reviews: 342, correct: 298 };
  state.quizBest = 80;
  state.favorites = ["gefuehle-08", "reisen-13"];

  const today = startOfDay(now).getTime();
  for (let offset = 39; offset >= 0; offset -= 1) {
    const ts = today - offset * DAY_MS;
    let count;
    if (offset === 0) {
      count = 14;
    } else if (offset <= 13) {
      count = 8 + ((offset * 7) % 17);
    } else if (offset % 5 === 0) {
      count = 0;
    } else {
      count = 6 + ((offset * 5) % 20);
    }
    if (count > 0) state.activity[dayKey(ts)] = count;
  }

  return state;
}

function normalizeState(raw) {
  if (!raw || typeof raw !== "object") return freshState();
  const base = freshState();
  const reviews = {};
  for (const [id, review] of Object.entries(raw.reviews && typeof raw.reviews === "object" ? raw.reviews : {})) {
    if (!review || typeof review !== "object") continue;
    const reps = Number(review.reps ?? review.repetition) || 0;
    const ease = Number(review.ease ?? review.easiness) || 2.5;
    const due = Number(review.due ?? review.nextReviewDate) || 0;
    const interval = Number(review.interval) || 0;
    let mastery = review.mastery || review.status;
    if (!MASTERY_ORDER.includes(mastery)) {
      if (review.status === "mastered" || (interval >= 21 && reps >= 4)) mastery = "mastered";
      else if (review.status === "learning") mastery = interval >= 3 || reps >= 2 ? "shaky" : "forgotten";
      else mastery = "unmastered";
    }
    const defaultLevel = { unmastered: 0, forgotten: 1, shaky: 3, mastered: 5 }[mastery] ?? 0;
    const userLevel = Number.isFinite(Number(review.userLevel))
      ? Math.max(0, Math.min(5, Math.round(Number(review.userLevel))))
      : defaultLevel;
    const level = Number.isFinite(Number(review.level))
      ? Math.max(0, Math.min(5, Math.round(Number(review.level))))
      : defaultLevel;
    const nextReview = Number(review.nextReview ?? due) || 0;
    const hasTestedLevels = review.testedLevels && typeof review.testedLevels === "object";
    const testedLevels = hasTestedLevels
      ? {
          de2zh: review.testedLevels.de2zh ? 1 : 0,
          zh2de: review.testedLevels.zh2de ? 1 : 0,
          spell: review.testedLevels.spell ? 1 : 0
        }
      : {
          // 旧 schema 没有三形式记录：按旧掌握度保守继承，避免升级后已掌握词被误降。
          de2zh: ["mastered", "shaky", "forgotten"].includes(mastery) ? 1 : 0,
          zh2de: ["mastered", "shaky"].includes(mastery) ? 1 : 0,
          spell: mastery === "mastered" ? 1 : 0
        };
    const lastTested = {
      de2zh: Number(review.lastTested?.de2zh) || 0,
      zh2de: Number(review.lastTested?.zh2de) || 0,
      spell: Number(review.lastTested?.spell) || 0
    };
    reviews[id] = {
      ...review,
      reps,
      repetition: reps,
      interval,
      ease,
      easiness: ease,
      lapses: Number(review.lapses) || 0,
      due: nextReview,
      nextReview,
      nextReviewDate: nextReview,
      last: Number(review.last) || 0,
      userLevel,
      testedLevels,
      lastTested,
      attempts: Number.isFinite(Number(review.attempts))
        ? Math.max(0, Number(review.attempts))
        : (reps + (Number(review.lapses) || 0) > 0 ? 1 : 0),
      level,
      streak: Number(review.streak ?? review.correctStreak) || 0,
      wrongStreak: Number(review.wrongStreak) || 0,
      lastPenalty: ["self", "wrong"].includes(review.lastPenalty) ? review.lastPenalty : null,
      forceForm: ["de2zh", "zh2de", "spell"].includes(review.forceForm) ? review.forceForm : null,
      status: mastery,
      mastery,
      correctStreak: Number(review.correctStreak) || 0
    };
  }
  return {
    ...base,
    ...raw,
    schemaVersion: 6,
    settings: { ...base.settings, ...(raw.settings || {}) },
    reviews,
    customWords: Array.isArray(raw.customWords) ? raw.customWords : [],
    customPhrases: Array.isArray(raw.customPhrases) ? raw.customPhrases : [],
    customArticles: Array.isArray(raw.customArticles) ? raw.customArticles : [],
    customGrammar: Array.isArray(raw.customGrammar) ? raw.customGrammar : [],
    favorites: Array.isArray(raw.favorites) ? raw.favorites : [],
    activity: raw.activity && typeof raw.activity === "object" ? raw.activity : {},
    stats: { ...base.stats, ...(raw.stats || {}) },
    mistakes: raw.mistakes && typeof raw.mistakes === "object" ? raw.mistakes : {},
    mistakeTypes: raw.mistakeTypes && typeof raw.mistakeTypes === "object" ? raw.mistakeTypes : {},
    grammar: {
      ...base.grammar,
      ...(raw.grammar && typeof raw.grammar === "object" ? raw.grammar : {})
    },
    readArticles: Array.isArray(raw.readArticles) ? [...new Set(raw.readArticles.filter(Boolean))] : [],
    progressByLevel: {
      ...base.progressByLevel,
      ...Object.fromEntries(Object.entries(raw.progressByLevel && typeof raw.progressByLevel === "object" ? raw.progressByLevel : {}).map(([level, value]) => [
        level,
        { correct: Number(value?.correct) || 0, total: Number(value?.total) || 0 }
      ]))
    },
    meta: { ...base.meta, ...(raw.meta || {}) }
  };
}

const STORAGE_BACKUP_PREFIX = `${STORAGE_KEY}.backup.`;
const STORAGE_LAST_GOOD = `${STORAGE_KEY}.last-good`;
const STORAGE_BACKUP_KEEP = 20;

function backupLocalState(raw, reason = "manual") {
  if (!raw) return false;
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  try {
    localStorage.setItem(`${STORAGE_BACKUP_PREFIX}${stamp}-${reason}`, raw);
    localStorage.setItem(STORAGE_LAST_GOOD, raw);
  } catch {
    return false;
  }
  try {
    const keys = [];
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key && key.startsWith(STORAGE_BACKUP_PREFIX)) keys.push(key);
    }
    keys.sort();
    for (const key of keys.slice(0, Math.max(0, keys.length - STORAGE_BACKUP_KEEP))) {
      localStorage.removeItem(key);
    }
  } catch {
    /* pruning is best effort */
  }
  return true;
}

let storageRecoveryMode = false;
let storageRecoveredFromBackup = false;

function recoverLocalStateFromBackup() {
  const candidates = [];
  try {
    const lastGood = localStorage.getItem(STORAGE_LAST_GOOD);
    if (lastGood) candidates.push(lastGood);
    const keys = [];
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key && key.startsWith(STORAGE_BACKUP_PREFIX)) keys.push(key);
    }
    keys.sort().reverse();
    for (const key of keys) {
      const raw = localStorage.getItem(key);
      if (raw && raw !== lastGood) candidates.push(raw);
    }
  } catch {
    return null;
  }
  for (const raw of candidates) {
    try {
      JSON.parse(raw);
      return raw;
    } catch {
      /* try the next backup */
    }
  }
  return null;
}

function loadState() {
  let saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch {
    return freshState();
  }
  if (!saved) {
    // 主键缺失时先从 last-good / 时间戳备份恢复，避免一次异常清空后直接写入新状态。
    const recovered = recoverLocalStateFromBackup();
    if (recovered) {
      saved = recovered;
      storageRecoveredFromBackup = true;
    } else {
      const fresh = freshState();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      } catch {
        /* storage can be unavailable; app still works in memory */
      }
      return fresh;
    }
  }

  let parsed;
  try {
    parsed = JSON.parse(saved);
  } catch {
    // 页面更新不应该清空学习记录：先保留原始字符串，再以空状态启动，绝不覆盖损坏数据。
    const backedUp = backupLocalState(saved, "corrupt");
    if (backedUp) {
      storageRecoveredFromBackup = true;
      // Keep the corrupt raw value in place. It is backed up first, and the
      // main key is only replaced after an explicit user write.
      storageRecoveryMode = true;
    } else {
      storageRecoveryMode = true;
    }
    return freshState();
  }

  const schema = Number(parsed.schemaVersion) || 0;
  try {
    if (!localStorage.getItem(STORAGE_LAST_GOOD)) {
      backupLocalState(saved, schema < 6 ? `schema-${schema}` : "initial");
    }
  } catch {
    /* backup is best effort */
  }
  const normalized = normalizeState(parsed);
  // 页面更新只做内存归一化，不在加载时重写主存储；任何旧字段都保留到用户主动操作。
  // 这样即使新版本暂时不需要某个字段，也不会因为打开页面而覆盖旧记录。
  return normalized;
}

let state = loadState();
let storageWriteBackupDone = false;
let allWordList = [];
let wordMap = new Map();
let searchIndex = new Map();
let session = null;
let studyTimer = null;
let reminderTimer = null;
let toastTimer = null;
let quiz = {
  mode: "de-zh",
  level: "all",
  questions: [],
  index: 0,
  score: 0,
  answers: [],
  answered: false,
  active: false,
  startTime: 0,
  weekly: false,
  weekId: ""
};

const libraryFilters = {
  query: "",
  level: "all",
  status: "all",
  pos: "all",
  article: "all",
  sort: "default"
};
let libraryVisibleLimit = 80;
let grammarLevel = "all";
let cultureCategory = "all";
let cultureTheme = "all";
let activeFestivalId = "";
let cultureQuery = "";
let cultureEra = "all";
let readingArticleId = null;
let readingQuery = "";
let readingLevel = "all";
let phraseQuery = "";
let calendarCursor = new Date();

function fixWordData(word) {
  if (!word || !word.word) return word;
  const calibration = WORD_CALIBRATION[word.id];
  if (calibration) {
    if (calibration.remove) {
      word.__calibrationRemove = true;
      return word;
    }
    const beforeWord = word.word;
    for (const [key, value] of Object.entries(calibration)) {
      if (key.startsWith("_") || key === "remove" || value === undefined) continue;
      if (word[key] !== undefined && word[`${key}_orig`] === undefined) {
        word[`${key}_orig`] = word[key];
      }
      word[key] = value;
    }
    if (word.word !== beforeWord && word.de === beforeWord) word.de = word.word;
  }
  const originalKey = `${word.article || ""}|${word.word}`;
  const fix = WORD_FIXES[originalKey] || WORD_FIXES[`|${word.word}`];
  if (fix) {
    for (const [key, value] of Object.entries(fix)) {
      if (value === undefined) continue;
      if (word[key] !== undefined && word[`${key}_orig`] === undefined) {
        word[`${key}_orig`] = word[key];
      }
      word[key] = value;
    }
  }
  if (word.pos === "noun" && !word.article && WORD_ARTICLES[word.word]) {
    word.article = WORD_ARTICLES[word.word];
  }
  if (word.pos === "noun" && NOUN_FIXES[word.word]) {
    const nounFix = NOUN_FIXES[word.word];
    if (!word.article && nounFix.article) word.article = nounFix.article;
    if (!word.plural && nounFix.plural) word.plural = nounFix.plural;
  }
  if (word.pos === "noun" && WIKTIONARY_FIXES[word.word]) {
    const wikiFix = WIKTIONARY_FIXES[word.word];
    if (!word.article && wikiFix.article) word.article = wikiFix.article;
    if (!word.plural && wikiFix.plural) word.plural = wikiFix.plural;
  }
  if (word.pos === "noun" && GUIDE_FIXES[word.word]) {
    const guideFix = GUIDE_FIXES[word.word];
    if (!word.article && guideFix.article) word.article = guideFix.article;
    if (!word.plural && guideFix.plural) word.plural = guideFix.plural;
  }
  if (word.pos === "noun" && VERBFORMEN_FIXES[word.word]) {
    const verbformenFix = VERBFORMEN_FIXES[word.word];
    if (!word.article && verbformenFix.article) word.article = verbformenFix.article;
    if (!word.plural && verbformenFix.plural) word.plural = verbformenFix.plural;
  }
  if (word.pos === "noun" && GLOSSAR_FIXES[word.word] && !word.plural) {
    word.plural = GLOSSAR_FIXES[word.word].plural;
  }
  const tatoebaExample = TATOEBA_EXAMPLES[String(word.word || "").toLowerCase()];
  if (tatoebaExample && !word.example) {
    word.example = tatoebaExample.example;
    word.exampleZh = tatoebaExample.exampleZh;
    word.exampleSource = tatoebaExample.source;
  }
  const guideExample = GUIDE_EXAMPLES[String(word.word || "").toLowerCase()];
  if (guideExample && !word.example) {
    word.example = guideExample.example;
    word.exampleZh = guideExample.exampleZh;
    word.exampleSource = guideExample.source;
  }
  if (typeof word.translation === "string") {
    word.translation = word.translation
      .replaceAll("⻆", "角")
      .replaceAll("戶", "户")
      .replace(/\s+([，；、])/g, "$1")
      .replace(/([，；、])\s+/g, "$1")
      .trim();
  }
  return word;
}

const PLURAL_TYPE_LABELS = {
  "umlaut+er": "变音 + -er",
  "umlaut+e": "变音 + -e",
  "umlaut+en": "变音 + -en",
  "umlaut+∅": "变音，词尾不变",
  "-er": "-er",
  "-en": "-en / -n",
  "-e": "-e",
  "-s": "-s",
  "∅": "词尾不变",
  none: "无复数"
};

function inferPluralType(word, pluralForm) {
  if (!pluralForm || pluralForm === "无复数") return "none";
  const value = String(pluralForm).replace(/^die\s+/i, "").trim();
  if (!value) return "none";
  const base = String(word.word || "").trim();
  const strip = text => text.toLocaleLowerCase("de").replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u");
  const valueNorm = strip(value);
  const baseNorm = strip(base);
  const hasUmlaut = /[äöü]/i.test(value) && !/[äöü]/i.test(base);
  if (valueNorm === baseNorm) return hasUmlaut ? "umlaut+∅" : "∅";
  if (valueNorm === `${baseNorm}e`) return hasUmlaut ? "umlaut+e" : "-e";
  if (valueNorm === `${baseNorm}en` || valueNorm === `${baseNorm}n`) return hasUmlaut ? "umlaut+en" : "-en";
  if (valueNorm === `${baseNorm}er`) return hasUmlaut ? "umlaut+er" : "-er";
  if (valueNorm === `${baseNorm}s`) return "-s";
  if (value.endsWith("er")) return hasUmlaut ? "umlaut+er" : "-er";
  if (value.endsWith("en")) return "-en";
  if (value.endsWith("e")) return hasUmlaut ? "umlaut+e" : "-e";
  if (value.endsWith("s")) return "-s";
  return hasUmlaut ? "umlaut+∅" : "∅";
}

function inferFemininePlural(word) {
  const value = String(word.word || "").trim();
  if (!value || word.article !== "die" || word.plural) return "";
  const rules = [
    ["ung", "ungen"], ["heit", "heiten"], ["keit", "keiten"], ["schaft", "schaften"],
    ["tion", "tionen"], ["sion", "sionen"], ["tät", "täten"]
  ];
  for (const [suffix, ending] of rules) {
    if (value.endsWith(suffix) && value.length > suffix.length + 2) {
      return `die ${value.slice(0, -suffix.length)}${ending}`;
    }
  }
  return "";
}

function inferGeneralPlural(word) {
  const value = String(word.word || "").trim();
  if (!value || word.plural) return "";
  const article = word.article || "";
  if (article === "die") {
    if (/in$/i.test(value)) return `die ${value}nen`;
    if (/(ung|heit|keit|schaft|tion|sion|tät)$/i.test(value)) return "";
    if (/e$/i.test(value)) return `die ${value}n`;
    if (/nis$/i.test(value)) return `die ${value}se`;
  }
  if (article === "das") {
    if (/(chen|lein)$/i.test(value)) return `die ${value}`;
    if (/(ment|zeug|spiel)$/i.test(value)) return `die ${value}e`;
    if (/nis$/i.test(value)) return `die ${value}se`;
  }
  if (article === "der") {
    if (/(ist|ent|ant|or)$/i.test(value)) return `die ${value}en`;
  }
  return "";
}

const ARTICLE_EXAMPLE_INDEX = { built: false, byToken: new Map(), sentences: [] };
const ARTICLE_EXAMPLE_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

function articleExampleKey(value) {
  return String(value || "")
    .toLocaleLowerCase("de")
    .replace(/^(der|die|das|sich)\s+/i, "")
    .replace(/[^a-z0-9äöüß\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildArticleExampleIndex() {
  if (ARTICLE_EXAMPLE_INDEX.built) return ARTICLE_EXAMPLE_INDEX;
  ARTICLE_EXAMPLE_INDEX.built = true;
  const articles = [...ARTICLES, ...(OCR_CONTENT.articles || [])];
  for (const article of articles) {
    const content = String(article.contentDe || "").replace(/\s+/g, " ").trim();
    if (!content) continue;
    const level = ARTICLE_EXAMPLE_LEVELS.includes(article.levelHint) ? article.levelHint : "B1";
    for (const raw of content.match(/[^.!?]+[.!?]+/g) || []) {
      const text = raw.trim().replace(/^["'„“»«\s]+|["'“”«»\s]+$/g, "");
      const tokens = text.match(/[A-Za-zÄÖÜäöüß-]+/g) || [];
      if (tokens.length < 7 || tokens.length > 32) continue;
      if (text.length < 38 || text.length > 230) continue;
      if (!/[a-zäöüß]/.test(text)) continue;
      if (tokens.filter(token => /^[A-ZÄÖÜ]/.test(token)).length > tokens.length * 0.62) continue;
      const sentence = {
        text,
        level,
        wordCount: tokens.length,
        articleId: article.id,
        titleZh: article.titleZh || article.titleDe || "文章"
      };
      ARTICLE_EXAMPLE_INDEX.sentences.push(sentence);
      const seen = new Set();
      for (const token of tokens) {
        const key = articleExampleKey(token);
        if (!key || seen.has(key)) continue;
        seen.add(key);
        if (!ARTICLE_EXAMPLE_INDEX.byToken.has(key)) ARTICLE_EXAMPLE_INDEX.byToken.set(key, []);
        const bucket = ARTICLE_EXAMPLE_INDEX.byToken.get(key);
        if (bucket[bucket.length - 1] !== sentence) bucket.push(sentence);
      }
    }
  }
  return ARTICLE_EXAMPLE_INDEX;
}

function articleExampleFor(word) {
  if (!word || !word.word) return null;
  const index = buildArticleExampleIndex();
  const level = ARTICLE_EXAMPLE_LEVELS.includes(word.level) ? word.level : "B1";
  const target = ARTICLE_EXAMPLE_LEVELS.indexOf(level);
  const keys = new Set();
  const STOPWORD_KEYS = new Set(["der", "die", "das", "sich", "und", "ist", "ich", "ein", "eine", "den", "dem", "des"]);
  const addKey = value => {
    const key = articleExampleKey(value);
    if (!key || key.length < 3 || key.length > 42 || key.includes(".") || STOPWORD_KEYS.has(key)) return;
    keys.add(key);
  };
  addKey(word.word);
  addKey(word.de);
  addKey(word.pluralForm || word.plural);
  String(word.forms || "").split(/[,;，；]/).forEach(addKey);
  if (word.conj && typeof word.conj === "object") Object.values(word.conj).forEach(addKey);
  addKey(word.pastTense);
  addKey(word.participleII);
  if (word.pos === "verb") {
    const stem = articleExampleKey(word.word).replace(/(en|ern|eln|e|n)$/, "");
    if (stem.length >= 4) keys.add(stem);
  }
  const candidates = new Set();
  for (const key of keys) {
    for (const sentence of index.byToken.get(key) || []) candidates.add(sentence);
    if (key.includes(" ")) {
      for (const sentence of index.sentences) {
        if (sentence.text.toLocaleLowerCase("de").includes(key)) candidates.add(sentence);
      }
    }
  }
  let best = null;
  let bestScore = Infinity;
  for (const sentence of candidates) {
    const sentenceLevel = ARTICLE_EXAMPLE_LEVELS.indexOf(sentence.level);
    const distance = Math.abs(sentenceLevel - target);
    if (distance > 2) continue;
    const score = distance * 100
      + Math.abs(sentence.wordCount - 15) * 2
      + (distance ? 14 : 0)
      + (sentence.text.length > 185 ? 6 : 0);
    if (score < bestScore) {
      bestScore = score;
      best = sentence;
    }
  }
  return best;
}

function normalizeWordRecord(word) {
  if (!word) return word;
  if (WORD_REPAIRS[word.word]) {
    const originalWord = word.word;
    word.word = WORD_REPAIRS[originalWord];
    if (word.de === originalWord) word.de = word.word;
  }
  if (POS_RECLASSIFY[word.word]) word.pos = POS_RECLASSIFY[word.word];
  word.finePos = classifyFinePos(word);
  if (word.pos === "noun" && !word.article && NOUN_ARTICLE_FIXES[word.word]) {
    word.article = NOUN_ARTICLE_FIXES[word.word];
  }
  // 语料中的性别连写（如 „Unternehmer in“）被 OCR 拆开，统一还原为原形。
  if (word.pos === "noun" && /\s+in$/i.test(String(word.word || ""))) {
    word.word = String(word.word).replace(/\s+in$/i, "").trim();
  }
  word.de = word.de || word.word;
  if (word.pos === "noun" && /\s+in$/i.test(String(word.de || ""))) {
    word.de = String(word.de).replace(/\s+in$/i, "").trim();
  }
  word.zh = word.zh || word.translation;
  word.exampleDe = word.exampleDe || word.example || "";
  word.exampleZh = word.exampleZh || "";
  word.level = normalizeCefrLevel(word.level);
  word.levels = Array.isArray(word.levels) ? word.levels.map(normalizeCefrLevel) : [word.level || "A1"];
  if (word.confidence === undefined) {
    const source = String(word.source || word.book || "");
    word.confidence = source.includes("新求精") || source.includes("教材") ? 0.9 : source.includes("Goethe") || source.includes("歌德") ? 0.8 : 0.6;
  }
  word.confidenceLevel = Number(word.confidence) >= 0.8 ? "high" : "need-review";

  const forms = String(word.forms || "").trim();
  const parts = forms ? forms.split(/[,;，；]/).map(part => part.trim()).filter(Boolean) : [];
  if (word.pos === "noun") {
    if (!word.plural && PLURAL_FIXES[word.word]) {
      word.plural = PLURAL_FIXES[word.word];
      word.pluralNoPlural = word.plural === "无复数";
    }
    if (!word.plural && word.article === "die") {
      const inferred = inferFemininePlural(word);
      if (inferred) {
        word.plural = inferred;
        word.pluralInferred = true;
      }
    }
    if (!word.plural) {
      const inferred = inferGeneralPlural(word);
      if (inferred) {
        word.plural = inferred;
        word.pluralInferred = true;
        word.pluralConfidence = "rule";
      }
    }
    word.pluralForm = word.pluralForm || word.plural || "";
    word.pluralType = word.pluralType || inferPluralType(word, word.pluralForm);
    word.nounEnding = word.nounEnding || (word.word.match(/(ung|heit|keit|schaft|ei|ie|chen|lein|er|en|e|s)$/i)?.[1] || "");
  }
  if (word.pos === "verb") {
    word.conj = word.conj || {
      inf: word.word,
      pr3sg: parts[0] || "",
      pret: parts[1] || "",
      perf: parts[2] || "",
      separable: /^(ab|an|auf|aus|bei|ein|mit|nach|vor|weg|zu|zurück|zusammen)/i.test(word.word),
      reflexive: /^sich\b/i.test(word.word) ? "sich" : false
    };
    word.pastTense = word.pastTense || word.conj.pret;
    word.participleII = word.participleII || (parts[2] || "").replace(/^(hat|ist)\s+/i, "");
    word.auxiliary = word.auxiliary || (parts[2] || "").match(/^(hat|ist)\b/i)?.[1]?.toLowerCase() || "";
    word.separablePrefix = word.separablePrefix || (/^(ab|an|auf|aus|bei|ein|mit|nach|vor|weg|zu|zurück|zusammen)/i.test(word.word) ? word.word.match(/^(ab|an|auf|aus|bei|ein|mit|nach|vor|weg|zu|zurück|zusammen)/i)[1] : false);
  }
  const wordbookExample = WORDBOOK_EXAMPLES[word.word];
  if (wordbookExample && (!word.example || word.exampleSource === "article" || /^\s*\d+\./.test(word.example))) {
    word.example = wordbookExample.example;
    word.exampleDe = wordbookExample.example;
    word.exampleZh = wordbookExample.exampleZh;
    word.exampleSource = "wordbook";
    word.exampleBook = wordbookExample.source;
    delete word.exampleArticleId;
    delete word.exampleArticleTitle;
    delete word.exampleLevel;
  }
  if (!word.example) {
    const articleExample = articleExampleFor(word);
    if (articleExample) {
      word.example = articleExample.text;
      word.exampleDe = articleExample.text;
      word.exampleZh = "";
      word.exampleSource = "article";
      word.exampleArticleId = articleExample.articleId;
      word.exampleArticleTitle = articleExample.titleZh;
      word.exampleLevel = articleExample.level;
    }
  }
  const godic = godicEntryFor(word);
  if (godic) {
    word.godic = godic;
    if (!word.translation && godic.definitions) word.translation = godic.definitions;
    if (word.pos === "noun" && !word.article && godic.article) word.article = godic.article;
    if (!word.plural && godic.pluralHint) word.pluralHint = godic.pluralHint;
    if (!word.example && godic.examples && godic.examples.length) {
      word.example = godic.examples[0].de;
      word.exampleDe = godic.examples[0].de;
      word.exampleZh = godic.examples[0].zh || "";
      word.exampleSource = "godic";
    }
    if (!word.synonyms && Array.isArray(godic.synonyms) && godic.synonyms.length) {
      word.synonyms = godic.synonyms;
    }
    word.godicUrl = godic.sourceUrl || "";
  }
  word.finePos = classifyFinePos(word);
  return word;
}

function splitWordEntries(word, split) {
  const slug = String(word.word).toLowerCase().replace(/[^a-z0-9äöüß]+/g, "-").replace(/^-+|-+$/g, "");
  return split.entries.map((entry, index) => ({
    id: `split-${slug}-${index + 1}`,
    word: entry.word,
    article: entry.article || null,
    plural: entry.plural || null,
    forms: entry.forms || "",
    pos: entry.pos || "other",
    translation: entry.translation,
    level: entry.level || word.level || "A1",
    topic: word.topic || "goethe",
    example: entry.example || "",
    exampleZh: entry.exampleZh || "",
    note: entry.note || "",
    source: `词条拆分（质量整改）${word.source ? ` · 原 ${word.source}` : ""}`,
    sourceRef: word.sourceRef || "",
    translationSource: "词条修正与数据质量整改方案",
    license: "个人学习使用"
  }));
}

function uniqueWordId(word, usedIds) {
  const base = String(word.id || "word");
  if (!usedIds.has(base)) {
    usedIds.add(base);
    return base;
  }
  const slug = String(`${word.article || ""}-${word.word || ""}`)
    .toLowerCase()
    .replace(/[^a-z0-9äöüß]+/g, "-")
    .replace(/^-+|-+$/g, "") || "entry";
  let candidate = `${base}--${slug}`;
  let index = 2;
  while (usedIds.has(candidate)) candidate = `${base}--${slug}-${index++}`;
  usedIds.add(candidate);
  word.id = candidate;
  return candidate;
}

function refreshWordIndex() {
  const seen = new Set();
  const usedIds = new Set();
  const keptByKey = new Map();
  allWordList = [];
  for (const word of [...TEXTBOOK_WORDS, ...WORDS, ...GOETHE_WORDS, ...OCR_VOCAB, ...OCR_CONTENT.words, ...state.customWords]) {
    if (!word || !word.id || !word.word) continue;
    const originalKey = `${word.article || ""}|${word.word}`;
    const split = WORD_SPLITS.find(item => item.from === originalKey);
    if (split) {
      for (const entry of splitWordEntries(word, split)) {
        normalizeWordRecord(entry);
        const key = `${String(entry.word).trim().toLocaleLowerCase("de")}|${entry.article || ""}`;
        if (seen.has(key)) continue;
        seen.add(key);
        uniqueWordId(entry, usedIds);
        keptByKey.set(key, entry);
        allWordList.push(entry);
      }
      continue;
    }
    fixWordData(word);
    if (word.__calibrationRemove) continue;
    normalizeWordRecord(word);
    if (WORD_BLACKLIST.has(`${word.article || ""}|${word.word}`) || SKIP_KEYS.has(`${word.article || ""}|${word.word}`)) continue;
    const key = `${String(word.word).trim().toLocaleLowerCase("de")}|${word.article || ""}`;
    if (seen.has(key)) {
      const kept = keptByKey.get(key);
      if (kept) {
        for (const field of ["article", "example", "exampleZh", "forms", "plural", "note"]) {
          if (!kept[field] && word[field]) kept[field] = word[field];
        }
      }
      continue;
    }
    seen.add(key);
    uniqueWordId(word, usedIds);
    keptByKey.set(key, word);
    allWordList.push(word);
  }
  // The local Dehelper pack is a reference dictionary: it enriches existing
  // vocabulary but must not inflate the learning list with 200k inflected
  // forms. Local-only words stay available for lookup via godicEntryFor().
  // Add only the original 11,951 project headwords that are missing from the
  // base packs. The full 205k dictionary remains a reference source.
  for (const item of HEADWORD_FALLBACK) {
    const wordText = String(item.word || "").trim();
    if (!wordText) continue;
    const article = item.article || "";
    const key = `${wordText.toLocaleLowerCase("de")}|${article}`;
    if (seen.has(key)) continue;
    const word = {
      id: `base-${String(item.key || wordText).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`,
      word: wordText, de: wordText, article, plural: "", pos: item.pos || "other",
      translation: item.translation || "", level: item.level || "A1", topic: "base",
      source: "原有词库", sourceUrl: "", license: "",
      example: "", exampleZh: "", forms: ""
    };
    normalizeWordRecord(word);
    seen.add(key); uniqueWordId(word, usedIds); keptByKey.set(key, word); allWordList.push(word);
  }
  for (const entry of Object.values(DEHELPER_ENTRIES)) {
    const wordText = String(entry.word || "").trim();
    if (!wordText || !DEHELPER_HEADWORD_KEYS.has(wordText.toLowerCase())) continue;
    const article = entry.article || "";
    const key = `${wordText.toLocaleLowerCase("de")}|${article}`;
    if (seen.has(key)) continue;
    const posText = String(entry.pos || "").toLowerCase();
    const pos = /^(n|m|f)\./.test(posText) ? "noun" : /^(vt|vi|v|refl)\./.test(posText) ? "verb" : /^adj\./.test(posText) ? "adj" : /^adv\./.test(posText) ? "adv" : "other";
    const word = {
      id: `dehelper-${wordText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`,
      word: wordText, de: wordText, article, plural: entry.plural || "", pos,
      translation: entry.definitions || "", level: "A1", topic: "dehelper",
      source: entry.source || "Dehelper combined.bin", sourceUrl: "",
      license: entry.license || "", definitions: entry.definitions || "",
      example: "", exampleZh: "", forms: ""
    };
    normalizeWordRecord(word);
    seen.add(key); uniqueWordId(word, usedIds); keptByKey.set(key, word); allWordList.push(word);
  }
  // Count and display each headword once; local/fallback packs can otherwise
  // add the same word under a different article key.
  const seenHeadwords = new Set();
  allWordList = allWordList.filter(word => {
    const key = String(word.word || "").trim().toLocaleLowerCase("de");
    if (!key || seenHeadwords.has(key)) return false;
    seenHeadwords.add(key);
    return true;
  });
  for (const word of allWordList) {
    normalizeWordRecord(word);
    const review = state.reviews[word.id];
    if (review) {
      // 旧记录补上词条快照，算法与导出都不再依赖词库查找。
      if (!review.word) review.word = word.word;
      if (!review.translation) review.translation = word.translation || "";
    }
  }
  wordMap = new Map(allWordList.map(word => [word.id, word]));
  rebuildSearchIndex();
}

function foldSearch(value) {
  return normalize(value)
    .replace(/ue/g, "u")
    .replace(/oe/g, "o")
    .replace(/ae/g, "a")
    .replace(/ss/g, "s");
}

function searchFormsFor(word) {
  const forms = new Set();
  const add = value => {
    if (!value) return;
    const text = String(value).trim();
    if (!text) return;
    forms.add(text);
    const cleaned = text.replace(/^(der|die|das|sich)\s+/i, "");
    forms.add(cleaned);
    if (cleaned.length > 4) {
      for (const suffix of ["ungen", "ung", "heiten", "heit", "keiten", "keit", "schaften", "schaft", "en", "er", "es", "em", "e", "n", "s", "st", "te", "ten", "t"]) {
        if (cleaned.endsWith(suffix) && cleaned.length - suffix.length >= 3) {
          forms.add(cleaned.slice(0, -suffix.length));
          break;
        }
      }
    }
  };
  add(word.word);
  add(word.de);
  add(word.translation);
  add(word.article);
  add(word.pluralForm || word.plural);
  add(word.nounEnding);
  add(word.separablePrefix);
  String(word.forms || "").split(/[,;，；]/).forEach(add);
  if (word.conj && typeof word.conj === "object") {
    Object.values(word.conj).forEach(add);
  }
  add(word.pastTense);
  add(word.participleII);
  add(word.example);
  add(word.exampleZh);

  // 名词：补格变化与复数变体，便于用 dem/des/den 形式搜索。
  const noun = String(word.word || word.de || "").replace(/^(der|die|das)\s+/i, "").trim();
  if (word.pos === "noun" && noun) {
    const plural = String(word.plural || word.pluralForm || "").replace(/^(der|die|das)\s+/i, "").trim();
    const article = String(word.article || "").toLowerCase();
    const genitive = /(s|ß|z|x|ch)$/i.test(noun) ? `${noun}es` : `${noun}s`;
    forms.add(`${noun}es`);
    forms.add(`${noun}s`);
    forms.add(`${noun}e`);
    forms.add(`${noun}en`);
    forms.add(`${noun}n`);
    if (plural) {
      forms.add(plural);
      forms.add(`${plural}n`);
      forms.add(plural.replace(/e$/, "en"));
    }
    if (article === "der" || article === "das") forms.add(`des ${genitive}`);
    if (article === "der") forms.add(`dem ${noun}`);
    if (plural) forms.add(`den ${plural.replace(/n$/, "")}n`);
  }

  // 形容词：补 -er/-e/-es/-en/-em 词尾，支持“形容词 + 名词”片段检索。
  if (word.pos === "adj") {
    const stem = String(word.word || "").trim();
    if (stem) for (const ending of ["e", "er", "es", "en", "em"]) forms.add(`${stem}${ending}`);
  }

  return [...forms].map(foldSearch).filter(Boolean);
}

function rebuildSearchIndex() {
  searchIndex = new Map(allWordList.map(word => [word.id, searchFormsFor(word).join(" ")]));
}

function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length || !b.length) return Math.max(a.length, b.length);
  const previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    let current = [i];
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    for (let j = 0; j < current.length; j += 1) previous[j] = current[j];
  }
  return previous[b.length];
}

/**
 * 返回 0 表示不匹配；分数越高越接近用户意图。
 * 精准词头 > 词头前缀 > 变形/复数 > 释义/例句 > 模糊拼写。
 */
function scoreWordSearch(word, rawQuery) {
  const terms = foldSearch(rawQuery).split(/\s+/).filter(Boolean);
  if (!terms.length) return 1;
  const headwords = [word.word, word.de]
    .map(value => foldSearch(String(value || "").replace(/^(der|die|das|sich)\s+/i, "")))
    .filter(Boolean);
  const haystack = searchIndex.get(word.id) || "";
  const tokens = haystack.split(/\s+/).filter(Boolean);
  if (!haystack) return 0;

  let score = 0;
  for (const term of terms) {
    let termScore = 0;
    if (headwords.includes(term)) termScore = 130;
    else if (tokens.includes(term)) termScore = 112;
    else if (headwords.some(headword => headword.startsWith(term) || term.startsWith(headword))) termScore = 100;
    else if (haystack.includes(term)) termScore = 60;
    else if (term.length >= 4 && tokens.some(token => token.startsWith(term))) termScore = 55;
    else if (term.length >= 5 && tokens.some(token => token.length >= 5 && levenshtein(token, term) <= 1)) termScore = 40;
    else if (term.length >= 3 && tokens.some(token => token.length > term.length + 2 && token.includes(term))) termScore = 25;
    if (!termScore) return 0;
    score += termScore;
  }
  if (word.level) score += { A1: 6, A2: 5, B1: 4, B2: 3, C1: 2, C2: 1 }[word.level] || 0;
  return score;
}

function matchesWordSearch(word, rawQuery) {
  return scoreWordSearch(word, rawQuery) > 0;
}

function allWords() {
  return allWordList;
}

function getWord(id) {
  return wordMap.get(id) || null;
}

function getTopic(id) {
  return TOPIC_MAP[id] || TOPICS[0];
}

function reviewFor(id) {
  return state.reviews[id] || null;
}

function masteryFor(word) {
  const review = reviewFor(word.id);
  if (!review) return "unmastered";
  const value = review.mastery || review.status;
  return MASTERY_ORDER.includes(value) ? value : "unmastered";
}

function statusFor(word) {
  return masteryFor(word);
}

function isDue(word, now = Date.now()) {
  const review = reviewFor(word.id);
  const due = review?.due ?? review?.nextReviewDate;
  return Boolean(review && due && due <= endOfDay(now).getTime());
}

function isDueNow(word, now = Date.now()) {
  const review = reviewFor(word.id);
  const due = review?.due ?? review?.nextReviewDate;
  return Boolean(review && due && due <= now);
}

function getMetrics() {
  const words = allWords();
  const now = Date.now();
  const today = dayKey(now);
  const reviews = Object.values(state.reviews);
  const mastered = words.filter(word => masteryFor(word) === "mastered").length;
  const learning = words.filter(word => ["forgotten", "shaky"].includes(masteryFor(word)) && reviewFor(word.id)).length;
  const fresh = words.filter(word => !reviewFor(word.id)).length;
  const unmastered = words.filter(word => masteryFor(word) === "unmastered").length;
  const forgotten = words.filter(word => masteryFor(word) === "forgotten" && reviewFor(word.id)).length;
  const shaky = words.filter(word => masteryFor(word) === "shaky" && reviewFor(word.id)).length;
  const dueToday = words.filter(word => isDue(word, now));
  const dueNow = words.filter(word => isDueNow(word, now));
  const todayCount = state.activity[today] || 0;
  const totalReviews = Number(state.stats.reviews) || 0;
  const correct = Number(state.stats.correct) || 0;
  const accuracy = totalReviews > 0 ? Math.round((correct / totalReviews) * 100) : 0;
  return {
    words,
    total: words.length,
    mastered,
    learning,
    fresh,
    unmastered,
    forgotten,
    shaky,
    dueToday,
    dueNow,
    todayCount,
    totalReviews,
    correct,
    accuracy,
    streak: calculateStreak(),
    goal: Math.max(1, Number(state.settings.dailyGoal) || 20)
  };
}

function calculateStreak(now = Date.now()) {
  let cursor = startOfDay(now).getTime();
  if (!state.activity[dayKey(cursor)]) {
    cursor -= DAY_MS;
  }
  let streak = 0;
  for (let i = 0; i < 3650; i += 1) {
    if (state.activity[dayKey(cursor)] > 0) {
      streak += 1;
      cursor -= DAY_MS;
    } else {
      break;
    }
  }
  return streak;
}

function todayLearnedWords() {
  const today = dayKey(Date.now());
  return allWords()
    .filter(word => {
      const review = reviewFor(word.id);
      return Boolean(review && review.last && dayKey(review.last) === today);
    })
    .sort((a, b) =>
      MASTERY_ORDER.indexOf(masteryFor(a)) - MASTERY_ORDER.indexOf(masteryFor(b)) ||
      String(a.word || "").localeCompare(String(b.word || ""), "de")
    );
}

function openTodayWordsModal() {
  const words = todayLearnedWords();
  const rows = words.length
    ? words.map(word => {
      const meta = MASTERY_META[masteryFor(word)] || MASTERY_META.unmastered;
      return `
        <button class="today-word-row" data-word-row="${esc(word.id)}" type="button">
          <span class="today-word-main">
            <span class="article" data-art="${esc(word.article || "none")}">${esc(word.article || "·")}</span>
            <strong>${esc(word.word)}</strong>
            <span class="level-chip">${esc(word.level)}</span>
          </span>
          <span class="today-word-zh">${esc(word.translation || "释义待补充")}</span>
          <span class="status-badge ${meta.cls}"><i></i>${meta.label}</span>
        </button>
      `;
    }).join("")
    : `<div class="today-word-empty">今天还没有学习记录。先完成一组新词或复习，再回来查看。</div>`;
  openModal(`
    <div class="modal-head">
      <div>
        <p class="eyebrow">HEUTE GELERNT</p>
        <h2>今日已学</h2>
        <p>${words.length ? `今天学过的 ${words.length} 个词，按掌握度排序。` : "今天还没有学习记录。"}</p>
      </div>
      <button class="modal-close" data-action="close-today-words" aria-label="关闭">${icon("close")}</button>
    </div>
    <div class="today-word-list">${rows}</div>
  `, "today-words-dialog");
}

function persist() {
  if (storageRecoveryMode) {
    showToast("检测到旧学习记录异常，已停止写入以保护原数据。请先导出或清理浏览器存储。");
    return;
  }
  if (!storageWriteBackupDone) {
    // 第一次写回前再备份一次原始主键，覆盖“加载后用户操作”这条时间窗口。
    try {
      const beforeWrite = localStorage.getItem(STORAGE_KEY);
      if (beforeWrite) backupLocalState(beforeWrite, "pre-write");
      storageWriteBackupDone = true;
    } catch {
      /* backup is best effort; do not block the user */
    }
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    localStorage.setItem("settings_v2", JSON.stringify(state.settings || {}));
    localStorage.setItem("favorites_v1", JSON.stringify(state.favorites || []));
    localStorage.setItem("mistakes_v1", JSON.stringify(state.mistakes || {}));
  } catch {
    showToast("浏览器存储空间不足，进度可能无法保存。");
  }
}

/* ─────────────────────────── Spaced repetition ─────────────────────────── */
/* 具体调度由 review-engine.js 负责；这里只保留队列/复习入口。 */

/* ─────────────────────────── Queue building ─────────────────────────── */

function sortByDue(a, b) {
  const ra = reviewFor(a.id);
  const rb = reviewFor(b.id);
  return (ra?.due ?? ra?.nextReviewDate ?? 0) - (rb?.due ?? rb?.nextReviewDate ?? 0);
}

function selectedDailyLevel() {
  const level = String(state.settings?.dailyLevel || "all").toUpperCase();
  return CEFR_LEVELS.includes(level) ? level : "all";
}

function dailyPool(level = selectedDailyLevel()) {
  return level === "all"
    ? allWords()
    : allWords().filter(word => normalizeCefrLevel(word.level) === level);
}

function buildQueue(mode = "daily", topicId = null, limit = 12, wordId = null, level = "all") {
  const now = Date.now();
  const activeLevel = level && level !== "all"
    ? normalizeCefrLevel(level)
    : (["daily", "new", "review", "weak"].includes(mode) ? selectedDailyLevel() : "all");
  let pool = activeLevel === "all" ? allWords() : allWords().filter(word => normalizeCefrLevel(word.level) === activeLevel);
  if (topicId) pool = pool.filter(word => word.topic === topicId);

  if (wordId) {
    const chosen = getWord(wordId);
    return chosen ? [chosen] : [];
  }

  const masteryRank = { unmastered: 0, forgotten: 1, shaky: 2, mastered: 3 };
  const due = shuffle(pool.filter(word => isDue(word, now)).sort((a, b) => {
    const ma = masteryRank[masteryFor(a)] ?? 9;
    const mb = masteryRank[masteryFor(b)] ?? 9;
    return ma - mb || sortByDue(a, b);
  }));
  const fresh = shuffle(pool.filter(word => !reviewFor(word.id)));
  const later = pool
    .filter(word => reviewFor(word.id) && !isDue(word, now))
    .sort(sortByDue);

  let queue = [];

  if (mode === "review") {
    queue = due;
  } else if (mode === "new") {
    queue = fresh;
  } else if (mode === "weak") {
    queue = [...pool]
      .filter(word => reviewFor(word.id) || state.mistakes[word.id])
      .sort((a, b) => {
        const ra = reviewFor(a.id);
        const rb = reviewFor(b.id);
        const ma = (ra?.lapses || 0) * 3 + (state.mistakes[a.id] || 0) * 2;
        const mb = (rb?.lapses || 0) * 3 + (state.mistakes[b.id] || 0) * 2;
        if (mb !== ma) return mb - ma;
        return (ra?.interval || 0) - (rb?.interval || 0);
      });
    if (queue.length < 4) {
      queue = [...queue, ...due, ...fresh, ...later].filter((word, index, arr) => arr.findIndex(w => w.id === word.id) === index);
    }
  } else {
    queue = [...due, ...fresh];
  }

  if (!queue.length && mode !== "new" && mode !== "review") {
    queue = [...due, ...fresh, ...later];
  }

  return queue.slice(0, limit);
}

/* ─────────────────────────── View routing ─────────────────────────── */

const VIEW_LABELS = {
  home: "今日学习",
  culture: "历史与文化",
  reading: "文章阅读",
  phrases: "短语积累",
  words: "单词积累",
  grammar: "语法学习",
  quiz: "题库测验",
  stats: "学习进度",
  study: "学习卡片"
};

function setView(view) {
  $$(".view").forEach(section => {
    section.classList.toggle("is-active", section.dataset.view === view);
  });
  $$(".side-link, .bottom-nav button").forEach(button => {
    button.classList.toggle("is-active", view !== "study" && button.dataset.nav === view);
  });
  const crumb = $("#crumb-current");
  if (crumb) crumb.textContent = VIEW_LABELS[view] || "Wortkarte";
  document.body.classList.toggle("is-studying", view === "study");
  window.scrollTo({ top: 0, behavior: "auto" });
}

function navigate(view) {
  if (view === "library") view = "words";
  if (!VIEW_LABELS[view] || view === "study") return;
  closeModal();
  stopStudyTimer();
  session = null;
  $("#study-summary")?.classList.add("hidden");
  $("#study-stage")?.classList.remove("hidden");
  $("#view-study")?.classList.remove("is-revealed");
  setView(view);

  if (view === "home") renderHome();
  if (view === "words") renderLibrary();
  if (view === "reading") renderReading();
  if (view === "phrases") renderPhrases();
  if (view === "grammar") renderGrammar();
  if (view === "culture") renderCulture();
  if (view === "stats") renderStats();
  if (view === "quiz") resetQuizSetup();
}

/* ─────────────────────────── Toasts / modals ─────────────────────────── */

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.innerHTML = `${icon("check")}<span>${esc(message)}</span>`;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

function isStandaloneMode() {
  try {
    return Boolean(
      window.matchMedia?.("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    );
  } catch {
    return false;
  }
}

function openExternalLink(url) {
  try {
    const parsed = new URL(url);
    if (!/^https?:$/.test(parsed.protocol)) throw new Error("unsupported protocol");
    // 独立 PWA 中 target=_blank 可能被系统拦截，改为当前 webview 跳转。
    location.href = parsed.href;
  } catch (error) {
    console.error("openExternalLink failed", error);
    showToast("链接无法打开，请复制到浏览器重试。");
  }
}

function runWithFallback(label, fn) {
  try {
    return fn();
  } catch (error) {
    console.error(label, error);
    showToast(`${label}失败，请重试。`);
    return null;
  }
}

function openModal(html, className = "") {
  const root = $("#modal-root");
  root.innerHTML = `<div class="modal-dialog ${esc(className)}" role="document">${html}</div>`;
  root.hidden = false;
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    const focusTarget = root.querySelector("input:not([type=hidden]), textarea, select, button");
    focusTarget?.focus({ preventScroll: true });
  }, 40);
}

function closeModal() {
  const root = $("#modal-root");
  if (!root || root.hidden) return;
  root.hidden = true;
  root.innerHTML = "";
  document.body.style.overflow = "";
}

/* ─────────────────────────── Speech ─────────────────────────── */

let germanVoice = null;

function pickGermanVoice() {
  if (!("speechSynthesis" in window)) return;
  const voices = window.speechSynthesis.getVoices();
  germanVoice =
    voices.find(voice => /^de[-_]DE/i.test(voice.lang)) ||
    voices.find(voice => /^de/i.test(voice.lang)) ||
    null;
}

if ("speechSynthesis" in window) {
  pickGermanVoice();
  window.speechSynthesis.addEventListener?.("voiceschanged", pickGermanVoice);
  window.speechSynthesis.onvoiceschanged = pickGermanVoice;
}

function speakText(text, button = null) {
  if (!("speechSynthesis" in window)) {
    showToast("这个浏览器不支持语音朗读。");
    return;
  }
  if (!text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "de-DE";
  utterance.rate = 0.86;
  utterance.pitch = 1;
  if (germanVoice) utterance.voice = germanVoice;
  if (button) {
    button.classList.add("is-speaking");
    utterance.onend = () => button.classList.remove("is-speaking");
    utterance.onerror = () => button.classList.remove("is-speaking");
  }
  window.speechSynthesis.speak(utterance);
}

function currentSessionWord() {
  if (!session) return null;
  return session.queue[session.index] || null;
}

function speakCurrentWord(button) {
  const word = currentSessionWord();
  if (!word) return;
  speakText(wordDisplay(word), button);
}

/* ─────────────────────────── Home render ─────────────────────────── */

function renderChrome() {
  const metrics = getMetrics();
  $("#top-streak").textContent = metrics.streak;
  $("#mobile-streak").textContent = metrics.streak;
  $("#profile-name").textContent = state.settings.name || "Lena";
  $("#profile-avatar").textContent = (state.settings.name || "L").trim().charAt(0).toUpperCase() || "L";
  const profileSubtitle = $("#profile-subtitle");
  if (profileSubtitle) {
    profileSubtitle.textContent = state.meta.demo ? "演示档案 · 本地保存" : "本地学习档案";
  }
  const localNote = $("#local-note-text");
  if (localNote) {
    localNote.textContent = state.meta.demo
      ? "这是一份演示进度，只保存在你的浏览器里。可在设置中重置，或直接开始添加自己的词卡。"
      : "所有学习记录只保存在你的浏览器里。没有账号，也没有云端。";
  }

  const dueBadge = $("#nav-due-badge");
  if (dueBadge) {
    dueBadge.hidden = metrics.dueToday.length === 0;
    dueBadge.textContent = metrics.dueToday.length > 99 ? "99+" : metrics.dueToday.length;
  }
  $("#side-due-count").textContent = metrics.dueToday.length;

  const wordCount = allWords().length;
  $$("[data-word-count]").forEach(el => {
    el.textContent = wordCount;
  });
  const newCount = metrics.words.filter(word => !reviewFor(word.id)).length;
  const newEl = $("#home-new-count");
  const reviewEl = $("#home-review-count");
  if (newEl) newEl.textContent = newCount;
  if (reviewEl) reviewEl.textContent = metrics.dueToday.length;
}

function renderHomeLevelPicker(activeLevel) {
  const picker = $("#home-level-picker");
  if (!picker) return;
  $$("[data-home-level]", picker).forEach(button => {
    const isActive = button.dataset.homeLevel === activeLevel;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  const pool = dailyPool(activeLevel);
  const newCount = pool.filter(word => !reviewFor(word.id)).length;
  const dueCount = pool.filter(word => isDue(word)).length;
  const note = $("#home-level-note");
  if (note) {
    note.textContent = activeLevel === "all"
      ? `全部难度 · 新词 ${newCount} · 到期 ${dueCount}`
      : `${activeLevel} · 新词 ${newCount} · 到期 ${dueCount} · 每日只推送这一档`;
  }
}

function renderHome() {
  const metrics = getMetrics();
  const now = Date.now();
  const date = new Date(now);
  const hour = date.getHours();
  const greeting = hour < 11 ? "Guten Morgen" : hour < 18 ? "Guten Tag" : "Guten Abend";

  $("#home-date").textContent = `${WEEKDAYS_DE[date.getDay()].toUpperCase()} · ${date.getDate()}. ${MONTHS_DE[date.getMonth()].toUpperCase()}`;
  $("#home-greeting").textContent = greeting;

  const activeLevel = selectedDailyLevel();
  const pool = dailyPool(activeLevel);
  const due = pool.filter(word => isDue(word)).length;
  const fresh = pool.filter(word => !reviewFor(word.id)).length;
  const dailyQueue = buildQueue("daily", null, 12);
  const dueInQueue = dailyQueue.filter(word => isDue(word)).length;
  const minutes = Math.max(1, Math.ceil(dailyQueue.length * 0.65));

  let subline = "今天也让德语靠近一点。";
  if (metrics.totalReviews === 0 && due === 0) subline = `词库已初始化：今天从 ${activeLevel === "all" ? "全部难度" : activeLevel} 的新词开始。`;
  else if (due > 0) subline = `${activeLevel === "all" ? "全部难度" : activeLevel} 有 ${due} 张卡片到期，先复习，再认识几个新词。`;
  else if (fresh > 0) subline = `到期卡片都清空了。今天适合认识 ${activeLevel === "all" ? "各难度" : activeLevel} 新词。`;
  else subline = "所有卡片都安排好了。休息也是一种学习。";
  $("#home-subline").textContent = subline;

  let heroTitle;
  let heroLine;
  if (due > 0) {
    heroTitle = `${dueInQueue} Wörter<br><em>warten auf dich.</em>`;
    const newInQueue = Math.max(0, dailyQueue.length - dueInQueue);
    heroLine = `先复习 ${dueInQueue} 张到期卡片${newInQueue > 0 ? `，再认识 ${newInQueue} 个新词` : ""}。大约 ${minutes} 分钟。`;
  } else if (fresh > 0) {
    const newToday = Math.min(fresh, 12);
    heroTitle = `${newToday} neue Wörter<br><em>für heute.</em>`;
    heroLine = `没有到期的卡片。用 ${newToday} 个新词，给今天开个小口子。`;
  } else {    heroTitle = `Alles<br><em>im grünen Bereich.</em>`;
    heroLine = "今天的复习已经完成。可以再复习一组，或者让记忆休息。";
  }
  $("#hero-title").innerHTML = heroTitle;
  $("#hero-line").textContent = heroLine;
  $("#hero-orbit-count").textContent = due || Math.min(fresh, 12);
  $("#hero-orbit-label").textContent = due ? "fällig" : "neu";
  $("#hero-time").textContent = `约 ${Math.max(1, Math.ceil(dailyQueue.length * 0.65))} 分钟`;
  const ctaLabel = $("#hero-cta span");
  if (ctaLabel) ctaLabel.textContent = due > 0 ? "开始考察" : fresh > 0 ? "认识新词" : "再学一组";

  const percent = Math.min(100, Math.round((metrics.todayCount / metrics.goal) * 100));
  $("#daily-count").textContent = metrics.todayCount;
  $("#daily-goal").textContent = metrics.goal;
  $("#daily-ring").style.strokeDashoffset = String(RING_SMALL * (1 - percent / 100));
  $("#daily-streak").textContent = metrics.streak;
  const remaining = Math.max(0, metrics.goal - metrics.todayCount);
  $("#daily-note").textContent =
    metrics.todayCount === 0
      ? "今天的第一张卡片，等你翻开。"
      : remaining > 0
        ? `还差 ${remaining} 个词，今天的目标就完成了。`
        : "今日目标完成。可以再多学一点，或让记忆休息。";

  $("#stat-mastered").textContent = metrics.mastered;
  $("#stat-mastered-note").textContent = `占全部 ${metrics.total ? Math.round((metrics.mastered / metrics.total) * 100) : 0}%`;
  $("#stat-today").textContent = metrics.todayCount;
  $("#stat-today-note").textContent = `目标 ${metrics.goal}`;
  $("#stat-accuracy").textContent = metrics.accuracy;
  $("#stat-accuracy-note").textContent = `共 ${metrics.totalReviews} 次作答`;

  renderWeekStrip(metrics);
  renderDecks(metrics);
  renderPackBanner();
  renderHomeLevelPicker(activeLevel);
  renderWeekChart();
  renderDueList(metrics);
  renderWordOfDay();
  renderWeeklyQuiz();
  renderRepeatReview();
  renderPhraseReciteHome();
  renderChrome();
}

function getDictionaryPack() {
  const pack = window.WORTKARTE_DICTIONARY;
  if (!pack || !pack.levels || typeof pack.levels !== "object") return null;
  const levels = Object.entries(pack.levels).filter(([, data]) => data && Array.isArray(data.words) && data.words.length);
  if (!levels.length) return null;
  return { ...pack, levelEntries: levels };
}

function packKey(word) {
  return `${String(word.word || "").trim().toLocaleLowerCase("de")}|${word.article || ""}`;
}

function importedPackWords() {
  return state.customWords.filter(word => word.pack);
}

function packStatus() {
  const pack = getDictionaryPack();
  if (!pack) return null;
  const existing = new Set(allWords().map(packKey));
  let available = 0;
  let present = 0;
  const levels = pack.levelEntries.map(([level, data]) => {
    let levelPresent = 0;
    for (const word of data.words) {
      available += 1;
      if (existing.has(packKey(word))) {
        present += 1;
        levelPresent += 1;
      }
    }
    return {
      level,
      label: data.label || `Goethe-Zertifikat ${level}`,
      total: data.sourceTotal || data.words.length,
      translated: data.words.length,
      present: levelPresent,
      remaining: data.words.length - levelPresent
    };
  });
  return { pack, levels, available, present, remaining: available - present };
}

function renderPackBanner() {
  const banner = $("#pack-banner");
  if (!banner) return;
  const status = packStatus();
  if (!status) {
    banner.hidden = true;
    return;
  }
  const imported = importedPackWords();
  if (TEXTBOOK_WORDS.length && !imported.length) {
    banner.hidden = true;
    return;
  }
  banner.hidden = false;
  const due = imported.filter(word => isDue(word)).length;
  const levelNames = status.levels.map(item => item.level).join(" / ");
  $("#pack-subtitle").textContent = imported.length
    ? `已导入 ${imported.length} 个官方词条${due ? `，其中 ${due} 个今天到期` : "，可以继续扩展词汇量。"}`
    : `官方词表中已有 ${status.available} 个带中文释义的 ${levelNames} 词，可分批导入。`;
  $("#pack-meta").innerHTML = status.levels.map(item => `
    <span><strong>${esc(item.level)}</strong> ${item.present} / ${item.translated}</span>
  `).join("") + `<span>可用 <strong>${status.available}</strong></span>`;
  const startButton = $('#pack-banner [data-action="start-pack"]');
  if (startButton) startButton.textContent = imported.length ? "学习词表" : "选择词表";
}

function openDictionaryModal() {
  const status = packStatus();
  if (!status) {
    openModal(`
      <div class="modal-head">
        <div>
          <p class="eyebrow">OFFIZIELLER WORTSCHATZ</p>
          <h2>官方词表未生成</h2>
          <p>还没有找到本地词表包。</p>
        </div>
        <button class="modal-close" data-close aria-label="关闭">${icon("close")}</button>
      </div>
      <div class="dict-source-note">
        <strong>生成方式</strong>
        <p>运行 <code>python tools/build_dictionary_pack.py</code> 生成 <code>dictionary-pack.js</code>，刷新页面后即可导入。</p>
      </div>
      <div class="modal-actions"><button class="btn btn-primary" data-close>知道了</button></div>
    `);
    return;
  }

  const content = `
    <div class="modal-head">
      <div>
        <p class="eyebrow">GOETHE-INSTITUT · DWDS</p>
        <h2>官方词表</h2>
        <p>导入歌德证书 A1–C2 分级词汇，中文释义来自本地总表。</p>
      </div>
      <button class="modal-close" data-close aria-label="关闭">${icon("close")}</button>
    </div>
    <div class="dict-intro">
      <span class="dict-intro-icon">${icon("book")}</span>
      <div>
        <strong>歌德证书 A1–C2 词汇</strong>
        <p>德语词头、词性、冠词与中文释义来自本地总表。A1 / A2 / B1 为歌德官方 Wortliste，B2 与 C1 为备考教材词表；原表没有单独列 C2，C1 高阶词覆盖 C2 需求。个别词形由版式自动判定，建议在词卡详情中核对。</p>
      </div>
    </div>
    <div class="dict-levels">
      ${status.levels.map(item => {
        const percent = item.translated ? Math.round((item.present / item.translated) * 100) : 0;
        const done = item.remaining === 0;
        return `
          <div class="dict-level-row">
            <span class="dict-level-badge">${esc(item.level)}</span>
            <span class="dict-level-copy">
              <strong>${esc(item.label)}</strong>
              <small>${item.translated} 个带中文 · 已存在 ${item.present} 个 · 原词表 ${item.total} 个实词</small>
            </span>
            <span class="dict-level-progress"><i style="width:${percent}%"></i></span>
            <button class="btn btn-ghost" data-modal-action="import-pack" data-level="${esc(item.level)}" ${done ? "disabled" : ""}>${done ? "已导入" : item.present ? "继续导入" : "导入"}</button>
          </div>
        `;
      }).join("")}
    </div>
    <div class="dict-source-note">
      <strong>词表来源</strong>
      <p>A1–C1 词条与中文释义来自用户提供的《德语单词总表_歌德分级A1-C2.xlsx》。A1/A2/B1 依据歌德官方 Wortliste；B2 使用 Klett《Aspekte neu B2》备考词表；C1 使用 Praxis《Werkstatt C1》词表，并覆盖 C2 高阶需求。</p>
      <p>歌德词表 © Goethe-Institut；教材级词表版权归原出版社所有。词表包仅用于个人学习，请勿再分发。</p>
      <div class="dict-source-links">
        <a href="https://www.goethe.de/" target="_blank" rel="noopener noreferrer">Goethe-Institut</a>
        <a href="https://www.klett-sprachen.de/" target="_blank" rel="noopener noreferrer">Klett</a>
      </div>
      <p class="dict-license">词表包生成于 ${esc(status.pack.generatedAt || "—")} · 本地保存，不会上传。已存在的词条会自动跳过。</p>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" data-close>关闭</button>
      <button class="btn btn-primary" data-modal-action="import-all-packs" ${status.remaining === 0 ? "disabled" : ""}>${status.remaining ? `导入全部（${status.remaining}）` : "全部已导入"}</button>
    </div>
  `;
  openModal(content);
}

function importDictionaryLevels(levelsToImport) {
  const pack = getDictionaryPack();
  if (!pack) return;
  const wanted = new Set(levelsToImport);
  const existingIds = new Set(allWords().map(word => word.id));
  const existingKeys = new Set(allWords().map(packKey));
  let added = 0;
  let skipped = 0;

  for (const [level, data] of pack.levelEntries) {
    if (!wanted.has(level)) continue;
    for (const word of data.words) {
      if (existingIds.has(word.id) || existingKeys.has(packKey(word))) {
        skipped += 1;
        continue;
      }
      state.customWords.push({
        ...word,
        custom: true,
        pack: true,
        topic: "goethe"
      });
      existingIds.add(word.id);
      existingKeys.add(packKey(word));
      added += 1;
    }
  }

  refreshWordIndex();
  persist();
  renderAll();
  openDictionaryModal();
  if (added) {
    showToast(`已导入 ${added} 个官方词条${skipped ? `，跳过 ${skipped} 个已有词` : ""}。`);
  } else {
    showToast("这些词已经在你的词库里了。");
  }
}

function startPackStudy() {
  const imported = importedPackWords();
  if (!imported.length) {
    openDictionaryModal();
    return;
  }
  startStudy({ mode: "daily", topicId: "goethe", limit: Math.min(100, Math.max(5, Number(state.settings.dailyGoal) || 20)) });
}

function grammarOcrGroup(topic) {
  const text = `${topic.title || ""} ${topic.summary || ""}`;
  if (/发音|拼写|重音|字母|词尾|清化|变音|语调/.test(text)) return "发音与拼写";
  if (/动词|时态|情态|被动|虚拟|分词|变位|完成时|过去|将来|功能动词/.test(text)) return "动词与时态";
  if (/名词|冠词|代词|形容词|介词|格|复数|词性|数词/.test(text)) return "名词、格与词法";
  if (/从句|语序|连词|关系|否定|疑问|状语|句子|主谓|引语/.test(text)) return "句法与语序";
  return "构词与其他";
}

function grammarSection(label, cards) {
  if (!cards.length) return "";
  return `
    <section class="grammar-group">
      <div class="grammar-group-head">
        <h2>${esc(label)}</h2>
        <span>${cards.length} 张</span>
      </div>
      <div class="grammar-group-grid">${cards.join("")}</div>
    </section>`;
}

function renderGrammar() {
  const grid = $("#grammar-grid");
  if (!grid) return;
  if (!GRAMMAR_DATA.length) {
    grid.innerHTML = `<div class="library-empty"><h3>语法卡还没有加载</h3><p>请确认 grammar.js 已正确引入。</p></div>`;
    return;
  }
  const seen = new Set(state.grammar?.seen || []);
  const topics = GRAMMAR_DATA.filter(topic => grammarLevel === "all" || topic.level === grammarLevel);
  const ocrTopics = Array.isArray(OCR_CONTENT.grammar) ? OCR_CONTENT.grammar : [];
  const exerciseCount = topics.reduce((sum, topic) => sum + topic.exercises.length, 0)
    + ocrTopics.reduce((sum, topic) => sum + (topic.exercises?.length || 0), 0);
  $("#grammar-seen").textContent = seen.size;
  $("#grammar-total").textContent = GRAMMAR_DATA.length + ocrTopics.length;
  $("#grammar-count").textContent = `${topics.length} 个主题 · ${exerciseCount} 道小练习${ocrTopics.length ? ` · ${ocrTopics.length} 张 OCR 卡` : ""}`;
  const bookMeta = $("#grammar-book-meta");
  if (bookMeta && GRAMMAR_SUMMARY_DATA) {
    bookMeta.textContent = `${GRAMMAR_SUMMARY_DATA.chapters.length} 章 · ${GRAMMAR_SUMMARY_DATA.tableCount} 张表格 · 从发音、格变到从句的完整参考`;
  }
  $$("#grammar-filter [data-grammar-level]").forEach(chip => {
    chip.classList.toggle("is-active", chip.dataset.grammarLevel === grammarLevel);
  });

  const coreCards = level => topics
    .filter(topic => topic.level === level)
    .map((topic, index) => {
      const isSeen = seen.has(topic.id);
      return `
        <button class="grammar-card ${isSeen ? "is-seen" : ""}" data-grammar-id="${esc(topic.id)}">
          <span class="grammar-card-top">
            <span class="level-chip ${topic.level === "A2" ? "advanced" : ""}">${esc(topic.level)}</span>
            <span class="grammar-index">${String(index + 1).padStart(2, "0")}</span>
          </span>
          <h3>${esc(topic.title)}</h3>
          <p class="grammar-de">${esc(topic.de)}</p>
          <p class="grammar-summary">${esc(topic.summary)}</p>
          <span class="grammar-card-foot">
            <span>${topic.sections.length} 个要点</span>
            <span>·</span>
            <span>${topic.exercises.length} 道练习</span>
            <span class="grammar-seen-mark">${icon("check")} 已读</span>
          </span>
        </button>`;
    });

  const sections = [
    grammarSection("A1 基础语法", coreCards("A1")),
    grammarSection("A2 进阶语法", coreCards("A2"))
  ];

  const ocrOrder = ["发音与拼写", "动词与时态", "名词、格与词法", "句法与语序", "构词与其他"];
  for (const group of ocrOrder) {
    const cards = ocrTopics
      .filter(topic => grammarOcrGroup(topic) === group)
      .map(topic => `
        <article class="grammar-card custom-grammar-card">
          <span class="grammar-card-top"><span class="level-chip">OCR</span></span>
          <h3>${esc(topic.title)}</h3>
          <p class="grammar-summary">${esc(topic.summary || "")}</p>
          <small>${esc(topic.source || "")}</small>
        </article>`);
    sections.push(grammarSection(`OCR 拓展 · ${group}`, cards));
  }

  if (Array.isArray(state.customGrammar) && state.customGrammar.length) {
    const cards = state.customGrammar.map(item => `
      <article class="grammar-card custom-grammar-card">
        <span class="grammar-card-top"><span class="level-chip">导入</span></span>
        <h3>${esc(item.title)}</h3>
        <p class="grammar-summary">${esc(item.summary || "")}</p>
      </article>`);
    sections.push(grammarSection("我的语法卡", cards));
  }

  grid.innerHTML = sections.join("");
}

function openGrammarModal(id) {
  const topic = GRAMMAR_DATA.find(item => item.id === id);
  if (!topic) return;
  if (!state.grammar.seen.includes(id)) {
    state.grammar.seen.push(id);
    persist();
  }
  renderGrammar();

  const sections = topic.sections.map(section => {
    const examples = section.examples?.length
      ? `<div class="grammar-examples">${section.examples.map(example => `
          <div class="grammar-example"><strong>${esc(example.de)}</strong><span>${esc(example.zh)}</span></div>
        `).join("")}</div>`
      : "";
    const table = section.table
      ? `<table class="grammar-table"><thead><tr>${section.table.headers.map(header => `<th>${esc(header)}</th>`).join("")}</tr></thead><tbody>${section.table.rows.map(row => `<tr>${row.map(cell => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table>`
      : "";
    return `
      <section class="grammar-section">
        <h4>${esc(section.heading)}</h4>
        <p>${esc(section.body)}</p>
        ${table}
        ${examples}
      </section>
    `;
  }).join("");

  const exercises = topic.exercises.map((exercise, index) => {
    const key = `${topic.id}-e${index}`;
    const solved = (state.grammar.correct || []).includes(key);
    return `
      <div class="grammar-exercise" data-topic="${esc(topic.id)}" data-exercise="${index}" ${solved ? 'data-answered="1"' : ""}>
        <p class="grammar-question">${index + 1}. ${esc(exercise.q)}</p>
        <div class="grammar-options">
          ${exercise.options.map((option, optionIndex) => {
            const correct = solved && optionIndex === exercise.answer;
            return `<button class="grammar-option ${correct ? "is-correct" : ""}" data-grammar-option="${optionIndex}" ${solved ? "disabled" : ""}>${esc(option)}</button>`;
          }).join("")}
        </div>
        <p class="grammar-explain ${solved ? "is-correct" : "hidden"}">${solved ? esc(exercise.explain) : ""}</p>
      </div>
    `;
  }).join("");

  openModal(`
    <div class="modal-head">
      <div>
        <p class="eyebrow">GRAMMATIK · ${esc(topic.level)}</p>
        <h2>${esc(topic.title)}</h2>
      </div>
      <button class="modal-close" data-close aria-label="关闭">${icon("close")}</button>
    </div>
    <div class="grammar-hero">
      <p class="eyebrow">${esc(topic.level)} · GRAMMATIK</p>
      <h3>${esc(topic.de)}</h3>
      <p class="grammar-de">${esc(topic.title)}</p>
      <p>${esc(topic.summary)}</p>
    </div>
    ${sections}
    <div class="grammar-exercises">
      <div class="grammar-exercises-head"><h4>小练习</h4><span>选出最合适的一项</span></div>
      ${exercises}
    </div>
    <div class="modal-actions">
      <button class="btn btn-primary" data-close>读完了</button>
    </div>
  `);
}

function answerGrammar(button) {
  const exerciseEl = button.closest(".grammar-exercise");
  if (!exerciseEl || exerciseEl.dataset.answered === "1") return;
  const topic = GRAMMAR_DATA.find(item => item.id === exerciseEl.dataset.topic);
  const exercise = topic?.exercises[Number(exerciseEl.dataset.exercise)];
  if (!exercise) return;
  const chosen = Number(button.dataset.grammarOption);
  const correct = chosen === exercise.answer;
  exerciseEl.dataset.answered = "1";
  const buttons = $$(".grammar-option", exerciseEl);
  buttons.forEach((option, index) => {
    option.disabled = true;
    if (index === exercise.answer) option.classList.add("is-correct");
    if (index === chosen && !correct) option.classList.add("is-wrong");
    if (index !== chosen && index !== exercise.answer) option.classList.add("is-dimmed");
  });
  const explain = $(".grammar-explain", exerciseEl);
  explain.textContent = exercise.explain;
  explain.classList.remove("hidden");
  explain.classList.add(correct ? "is-correct" : "is-wrong");
  explain.scrollIntoView({ block: "nearest", behavior: "smooth" });
  if (correct) {
    const key = `${topic.id}-e${exerciseEl.dataset.exercise}`;
    if (!state.grammar.correct.includes(key)) {
      state.grammar.correct.push(key);
      persist();
    }
  }
}

function summaryBlockHtml(block) {
  if (!block || !block.type) return "";
  if (block.type === "p") return `<p>${block.html || ""}</p>`;
  if (block.type === "list") {
    return `<ul>${(block.items || []).map(item => `<li>${item}</li>`).join("")}</ul>`;
  }
  if (block.type === "table") {
    const head = block.headers?.length
      ? `<thead><tr>${block.headers.map(cell => `<th>${cell}</th>`).join("")}</tr></thead>`
      : "";
    const body = (block.rows || []).map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("");
    return `<div class="reader-table-wrap"><table class="reader-table">${head}<tbody>${body}</tbody></table></div>`;
  }
  return "";
}

function openGrammarBook() {
  if (!GRAMMAR_SUMMARY_DATA) {
    showToast("语法总结数据还没有生成。");
    return;
  }
  const toc = GRAMMAR_SUMMARY_DATA.chapters.map(chapter => `
    <button class="reader-toc-chapter" data-grammar-jump="summary-${esc(chapter.id)}">
      <span>${esc(chapter.number || "§")}</span>${esc(chapter.title)}
    </button>
    ${chapter.sections.map(section => section.title && section.title !== "正文"
      ? `<button class="reader-toc-section" data-grammar-jump="summary-${esc(section.id)}">${esc(section.number ? `${section.number} ` : "")}${esc(section.title)}</button>`
      : "").join("")}
  `).join("");

  const intro = (GRAMMAR_SUMMARY_DATA.intro || []).map(summaryBlockHtml).join("");
  const chapters = GRAMMAR_SUMMARY_DATA.chapters.map(chapter => `
    <section class="reader-chapter" id="summary-${esc(chapter.id)}">
      <div class="reader-chapter-head">
        <span class="reader-chapter-number">${esc(chapter.number || "§")}</span>
        <h2>${esc(chapter.title)}</h2>
      </div>
      ${chapter.sections.map(section => `
        <section class="reader-section" id="summary-${esc(section.id)}">
          ${section.title && section.title !== "正文" ? `<h3>${section.number ? `<span class="reader-section-number">${esc(section.number)}</span>` : ""}${esc(section.title)}</h3>` : ""}
          ${(section.blocks || []).map(summaryBlockHtml).join("")}
        </section>
      `).join("")}
    </section>
  `).join("");

  openModal(`
    <div class="grammar-reader">
      <aside class="grammar-reader-toc">
        <div class="reader-toc-brand">
          <p class="eyebrow">GRAMMATIK</p>
          <strong>${esc(GRAMMAR_SUMMARY_DATA.title)}</strong>
          <small>${GRAMMAR_SUMMARY_DATA.chapters.length} 章 · ${GRAMMAR_SUMMARY_DATA.tableCount} 张表格</small>
        </div>
        <nav class="reader-toc-nav" aria-label="语法总结目录">${toc}</nav>
      </aside>
      <div class="grammar-reader-main">
        <header class="grammar-reader-top">
          <div><p class="eyebrow">VOLLSTÄNDIGE GRAMMATIK</p><strong>${esc(GRAMMAR_SUMMARY_DATA.title)}</strong></div>
          <button class="reader-close" data-close aria-label="关闭语法书">${icon("close")}</button>
        </header>
        <div class="grammar-reader-content">
          <article class="reader-article">
            ${intro ? `<div class="reader-intro">${intro}</div>` : ""}
            ${chapters}
            <p class="reader-source">来源：${esc(GRAMMAR_SUMMARY_DATA.source || "用户提供的语法总结")}。内容按原文章节整理，仅用于个人学习。</p>
          </article>
        </div>
      </div>
    </div>
  `, "reader-dialog");
}

function renderCultureTimeline(historyItems) {
  const timeline = $("#culture-timeline");
  const track = $("#culture-timeline-track");
  const line = $("#culture-timeline-line");
  const shell = $("#culture-timeline-shell");
  if (!timeline || !track || !line) return;
  const isPersonTimeline = cultureCategory === "person";
  timeline.hidden = cultureCategory !== "history" && cultureCategory !== "person";
  if (timeline.hidden) return;
  const title = $("#culture-timeline-title");
  if (title) title.textContent = isPersonTimeline ? "人物时间轴" : "历史时间轴";
  const hint = $("#culture-timeline-hint");
  if (hint) hint.textContent = isPersonTimeline
    ? "按出生年排列 · 左右拖动浏览 · 点击年份跳到人物卡片"
    : "左右拖动时间线浏览 · 点击年份可跳到对应条目";
  const counts = new Map(CULTURE_ERAS.map(era => [era.id, 0]));
  for (const item of historyItems) {
    const key = cultureEraForYear(cultureYear(item));
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  counts.set("all", historyItems.length);
  track.innerHTML = CULTURE_ERAS.map(era => {
    const count = counts.get(era.id) || 0;
    if (era.id !== "all" && !count) return "";
    return `
      <button class="culture-era ${cultureEra === era.id ? "is-active" : ""}" data-culture-era="${era.id}" aria-pressed="${cultureEra === era.id}">
        <strong>${esc(era.label)}${count ? ` · ${count}` : ""}</strong>
        <span>${esc(era.range)}</span>
      </button>
    `;
  }).join("");
  const dated = historyItems
    .map(item => ({ item, year: cultureYear(item) }))
    .filter(entry => Number.isFinite(entry.year))
    .sort((a, b) => a.year - b.year || String(a.item.titleZh).localeCompare(String(b.item.titleZh), "zh"));
  const years = dated.map(entry => entry.year);
  if (!dated.length) {
    line.style.width = "100%";
    line.innerHTML = `<p class="culture-line-empty">暂无可排序年份</p>`;
  } else {
    const width = Math.max(920, dated.length * 138);
    line.style.width = `${width}px`;
    line.innerHTML = `
      <div class="culture-line-axis" aria-hidden="true"></div>
      ${dated.map((entry, index) => {
        const yearLabel = entry.item.year || `${entry.year}${entry.item.category === "person" ? " 生" : ""}`;
        const step = dated.length > 1 ? (width - 140) / (dated.length - 1) : 0;
        const left = width / 2 + (index - (dated.length - 1) / 2) * step;
        return `
          <button class="culture-line-marker ${index % 2 ? "is-below" : ""}" style="left:${left}px" data-culture-jump="${esc(entry.item.id)}" title="${esc(yearLabel)} · ${esc(entry.item.titleZh)}" aria-label="${esc(yearLabel)} ${esc(entry.item.titleZh)}">
            <span class="culture-line-dot" aria-hidden="true"></span>
            <span class="culture-line-label"><strong>${esc(yearLabel)}</strong><span>${esc(entry.item.titleZh)}</span></span>
          </button>
        `;
      }).join("")}
    `;
  }
  if (shell) shell.classList.toggle("is-empty", !dated.length);
  $("#culture-timeline-meta").textContent = years.length
    ? `${years[0]}–${years[years.length - 1]} · ${isPersonTimeline ? "按出生年升序" : "按时间升序"} · 可拖动`
    : "暂无可排序年份";
}

function bindCultureTimelineDrag() {
  const shell = $("#culture-timeline-shell");
  const line = $("#culture-timeline-line");
  if (!shell || !line || shell.dataset.dragBound) return;
  shell.dataset.dragBound = "1";
  let dragging = false;
  let moved = false;
  let startX = 0;
  let startScroll = 0;
  let suppressClick = false;
  let lastDragMoved = false;
  let lastX = 0;
  let lastTime = 0;
  let velocity = 0;
  let momentumFrame = 0;
  const stopMomentum = () => {
    if (momentumFrame) cancelAnimationFrame(momentumFrame);
    momentumFrame = 0;
  };
  shell.addEventListener("pointerdown", event => {
    if (event.pointerType === "touch" || event.button !== 0) return;
    stopMomentum();
    dragging = true;
    moved = false;
    startX = event.clientX;
    lastX = event.clientX;
    lastTime = performance.now();
    velocity = 0;
    startScroll = shell.scrollLeft;
    shell.classList.add("is-dragging");
    shell.setPointerCapture?.(event.pointerId);
  });
  shell.addEventListener("pointermove", event => {
    if (!dragging) return;
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 4) moved = true;
    shell.scrollLeft = startScroll - delta;
    const now = performance.now();
    const dt = Math.max(1, now - lastTime);
    velocity = clampNumber(-(event.clientX - lastX) / dt, -2.6, 2.6);
    lastX = event.clientX;
    lastTime = now;
    if (moved) event.preventDefault();
  });
  const finish = event => {
    if (!dragging) return;
    dragging = false;
    shell.classList.remove("is-dragging");
    shell.releasePointerCapture?.(event.pointerId);
    lastDragMoved = moved;
    if (moved) {
      suppressClick = true;
      setTimeout(() => {
        suppressClick = false;
        lastDragMoved = false;
      }, 250);
      let step = velocity * 16;
      if (Math.abs(step) > 1.2) {
        const glide = () => {
          const before = shell.scrollLeft;
          shell.scrollLeft += step;
          step *= 0.94;
          if (shell.scrollLeft === before || Math.abs(step) < 0.4) {
            momentumFrame = 0;
            return;
          }
          momentumFrame = requestAnimationFrame(glide);
        };
        momentumFrame = requestAnimationFrame(glide);
      }
    }
  };
  shell.addEventListener("pointerup", finish);
  shell.addEventListener("pointercancel", finish);
  line.addEventListener("click", event => {
    if (suppressClick || lastDragMoved) {
      suppressClick = false;
      lastDragMoved = false;
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    const marker = event.target.closest("[data-culture-jump]");
    if (!marker) return;
    const card = document.getElementById(`culture-card-${marker.dataset.cultureJump}`);
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.classList.remove("is-flash");
    requestAnimationFrame(() => card.classList.add("is-flash"));
    setTimeout(() => card.classList.remove("is-flash"), 1400);
  });
  shell.addEventListener("wheel", event => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    if (!event.shiftKey) return;
    stopMomentum();
    shell.scrollLeft += event.deltaY;
    event.preventDefault();
  }, { passive: false });
}

const CULTURE_THEME_GROUPS = [
  ["文学", ["文学", "Literatur", "Roman", "Drama", "Lyrik"]],
  ["音乐", ["音乐", "Musik", "Komponist", "Beethoven", "Bach"]],
  ["艺术与建筑", ["艺术", "Kunst", "Architektur", "Gotik", "Malerei", "Dürer"]],
  ["媒体与出版", ["媒体", "Medien", "Presse", "Zeitung", "Literaturbetrieb"]],
  ["教育", ["教育", "Bildung", "Universität", "Studium", "Schule"]],
  ["节日与习俗", ["节日", "Karneval", "Brauch", "Weihnachten", "Mondfest"]],
  ["饮食", ["饮食", "Essen", "Brot", "Bier", "Küche"]],
  ["宗教", ["宗教", "Religion", "Kirche", "Reformation"]],
  ["社会", ["社会", "Gesellschaft", "Migration", "Bevölkerung", "Frauen"]],
  ["语言", ["语言", "Sprache", "Dialekt", "Wortschatz"]]
];

function cultureThemeGroup(item) {
  const haystack = [item.titleDe, item.titleZh, ...(item.tags || [])].join(" ");
  const found = CULTURE_THEME_GROUPS.find(([, keys]) => keys.some(key => haystack.includes(key)));
  return found ? found[0] : "日常生活与习俗";
}

function renderCultureThemeFilter() {
  const wrap = $("#culture-theme-filter");
  if (!wrap) return;
  wrap.hidden = cultureCategory !== "culture";
  if (wrap.hidden) return;
  const themes = ["all", ...CULTURE_THEME_GROUPS.map(group => group[0]), "日常生活与习俗"];
  wrap.innerHTML = themes.map(theme => `
    <button class="chip ${cultureTheme === theme ? "is-active" : ""}" data-culture-theme="${esc(theme)}">${theme === "all" ? "全部主题" : esc(theme)}</button>
  `).join("");
}

function cultureGroupLabel(item, coarse = false) {  if (coarse) {
    if (item.category === "history") return "历史";
    if (item.category === "map") return "地图";
    if (item.category === "person") return "人物";
    return "文化";
  }
  if (item.category === "history") {
    const era = CULTURE_ERAS.find(entry => entry.id === cultureEraForYear(cultureYear(item)));
    return era?.label || "未标年份";
  }
  if (item.category === "map") {
    return String(item.id).startsWith("map-") ? "联邦州" : "德国地理";
  }
  if (item.category === "person") {
    const era = CULTURE_ERAS.find(entry => entry.id === cultureEraForYear(cultureYear(item)));
    return era?.label || "未标年份";
  }
  return cultureThemeGroup(item);
}

function festivalTypeLabel(type) {
  return type === "movable" ? "每年浮动" : type === "regional" ? "地区性" : "固定日期";
}

function renderFestivalDetail(festivalId) {
  const box = $("#festival-detail");
  if (!box) return;
  const festival = FESTIVAL_DATA.items.find(item => item.id === festivalId);
  if (!festival) {
    box.innerHTML = `<p class="festival-detail-empty">选择节日查看日期与习俗说明。</p>`;
    return;
  }
  activeFestivalId = festival.id;
  $$("#festival-timeline [data-festival-id]").forEach(node => {
    node.classList.toggle("is-active", node.dataset.festivalId === festival.id);
  });
  box.innerHTML = `
    <article class="festival-detail-card ${esc(festival.type)}">
      <div class="festival-detail-kicker">
        <span>${esc(festival.dateLabel)}</span>
        <strong>${festivalTypeLabel(festival.type)}</strong>
      </div>
      <h3>${esc(festival.titleZh)} <small>${esc(festival.titleDe)}</small></h3>
      <p>${esc(festival.noteZh)}</p>
      ${festival.cultureId ? `<button class="festival-jump" data-festival-jump="${esc(festival.cultureId)}">查看相关文化卡 →</button>` : ""}
    </article>`;
}

function renderFestivalTimeline() {
  const panel = $("#festival-panel");
  const timeline = $("#festival-timeline");
  if (!panel || !timeline) return;
  panel.hidden = cultureCategory !== "all" && cultureCategory !== "culture";
  if (panel.hidden) return;
  const items = FESTIVAL_DATA.items.slice().sort((a, b) => a.month - b.month);
  $("#festival-count").textContent = items.length;
  timeline.innerHTML = FESTIVAL_DATA.months.map((month, index) => {
    const monthNumber = index + 1;
    const monthItems = items.filter(item => item.month === monthNumber);
    return `
      <section class="festival-month ${monthItems.length ? "" : "is-empty"}">
        <div class="festival-month-label"><strong>${String(monthNumber).padStart(2, "0")}</strong><span>${esc(month)}</span></div>
        <div class="festival-rail"><i class="festival-node"></i></div>
        <div class="festival-events">
          ${monthItems.length
            ? monthItems.map(item => `
              <button class="festival-event ${esc(item.type)}" data-festival-id="${esc(item.id)}">
                <span class="festival-date">${esc(item.dateLabel)}</span>
                <span class="festival-event-copy"><strong>${esc(item.titleDe)}</strong><small>${esc(item.titleZh)}</small></span>
              </button>`).join("")
            : `<p class="festival-month-empty">${monthNumber === 3 ? "狂欢节与复活节可能落在本月" : "本月无全国性节日"}</p>`}
        </div>
      </section>`;
  }).join("");
  renderFestivalDetail(activeFestivalId);
}

function jumpToFestivalCulture(cultureId) {
  cultureCategory = "culture";
  cultureTheme = "all";
  cultureEra = "all";
  cultureQuery = "";
  renderCulture();
  requestAnimationFrame(() => {
    const card = document.getElementById(`culture-card-${cultureId}`);
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.classList.remove("is-flash");
    requestAnimationFrame(() => card.classList.add("is-flash"));
    setTimeout(() => card.classList.remove("is-flash"), 1400);
  });
}

const mapView = { baseW: 0, baseH: 0, x: 0, y: 0, w: 0, h: 0 };

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function mapApplyView() {
  const svg = $("#culture-map-svg");
  if (!svg || !mapView.baseW) return;
  svg.setAttribute("viewBox", `${mapView.x} ${mapView.y} ${mapView.w} ${mapView.h}`);
  svg.classList.toggle("is-zoomed", mapView.w < mapView.baseW - 0.01);
  const level = $("#map-zoom-level");
  if (level) level.textContent = `${Math.round((mapView.baseW / mapView.w) * 100)}%`;
}

function mapPointFromClient(svg, clientX, clientY) {
  const matrix = svg.getScreenCTM();
  if (!matrix) return null;
  const point = svg.createSVGPoint();
  point.x = clientX;
  point.y = clientY;
  return point.matrixTransform(matrix.inverse());
}

function mapZoomAt(factor, clientX, clientY) {
  const svg = $("#culture-map-svg");
  if (!svg || !mapView.baseW) return;
  const point = mapPointFromClient(svg, clientX, clientY);
  if (!point) return;
  const nextW = clampNumber(mapView.w / factor, mapView.baseW / 4.5, mapView.baseW);
  const ratio = nextW / mapView.w;
  const nextH = mapView.baseH * (nextW / mapView.baseW);
  mapView.x = clampNumber(point.x - (point.x - mapView.x) * ratio, 0, mapView.baseW - nextW);
  mapView.y = clampNumber(point.y - (point.y - mapView.y) * ratio, 0, mapView.baseH - nextH);
  mapView.w = nextW;
  mapView.h = nextH;
  mapApplyView();
}

function mapResetView() {
  const svg = $("#culture-map-svg");
  if (!svg || !mapView.baseW) return;
  mapView.x = 0;
  mapView.y = 0;
  mapView.w = mapView.baseW;
  mapView.h = mapView.baseH;
  mapApplyView();
}

function bindCultureMapZoom() {
  const svg = $("#culture-map-svg");
  const canvas = $("#culture-map-canvas");
  if (!svg || !canvas || svg.dataset.zoomBound) return;
  svg.dataset.zoomBound = "1";
  let panning = false;
  let moved = false;
  let suppressClick = false;
  let startPoint = null;
  let startView = null;
  let pinch = null;
  const pointers = new Map();

  const capturePointer = id => {
    try { svg.setPointerCapture?.(id); } catch { /* synthetic pointer / unsupported capture */ }
  };
  const releasePointer = id => {
    try { svg.releasePointerCapture?.(id); } catch { /* pointer already released */ }
  };

  const zoomFromCenter = factor => {
    const rect = svg.getBoundingClientRect();
    mapZoomAt(factor, rect.left + rect.width / 2, rect.top + rect.height / 2);
  };

  const zoomButtons = canvas.querySelectorAll ? Array.from(canvas.querySelectorAll("[data-map-zoom]")) : [];
  zoomButtons.forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      const action = button.dataset.mapZoom;
      if (action === "in") zoomFromCenter(1.45);
      else if (action === "out") zoomFromCenter(1 / 1.45);
      else mapResetView();
    });
  });

  // 触屏双指缩放：以两指中点为锚点，同时允许双指整体拖动。
  const pointerPair = () => {
    const points = Array.from(pointers.values());
    return points.length >= 2 ? [points[0], points[1]] : [];
  };
  const beginPinch = () => {
    const pair = pointerPair();
    if (pair.length !== 2) return;
    const mid = { x: (pair[0].x + pair[1].x) / 2, y: (pair[0].y + pair[1].y) / 2 };
    const anchor = mapPointFromClient(svg, mid.x, mid.y);
    const distance = Math.hypot(pair[0].x - pair[1].x, pair[0].y - pair[1].y);
    if (!anchor || distance < 8) return;
    pinch = { distance, startW: mapView.w, anchor };
    panning = false;
    startPoint = null;
    startView = null;
    svg.classList.remove("is-panning");
  };
  const movePinch = event => {
    if (!pinch) return false;
    const pair = pointerPair();
    if (pair.length !== 2) return false;
    const mid = { x: (pair[0].x + pair[1].x) / 2, y: (pair[0].y + pair[1].y) / 2 };
    const distance = Math.hypot(pair[0].x - pair[1].x, pair[0].y - pair[1].y);
    if (distance < 1) return true;
    const nextW = clampNumber(pinch.startW * (pinch.distance / distance), mapView.baseW / 4.5, mapView.baseW);
    const nextH = mapView.baseH * (nextW / mapView.baseW);
    const rect = svg.getBoundingClientRect();
    if (!rect.width || !rect.height) return true;
    // 保持 pinch 起点下的地图锚点跟随两指中点，实现缩放 + 平移。
    mapView.w = nextW;
    mapView.h = nextH;
    mapView.x = clampNumber(pinch.anchor.x - ((mid.x - rect.left) / rect.width) * nextW, 0, mapView.baseW - nextW);
    mapView.y = clampNumber(pinch.anchor.y - ((mid.y - rect.top) / rect.height) * nextH, 0, mapView.baseH - nextH);
    mapApplyView();
    event.preventDefault();
    return true;
  };

  svg.addEventListener("wheel", event => {
    const zoomingIn = event.deltaY < 0;
    if (zoomingIn && mapView.w <= mapView.baseW / 4.5) return;
    if (!zoomingIn && mapView.w >= mapView.baseW - 0.01) return;
    event.preventDefault();
    mapZoomAt(Math.exp(-event.deltaY * 0.0013), event.clientX, event.clientY);
  }, { passive: false });

  svg.addEventListener("dblclick", event => {
    event.preventDefault();
    mapZoomAt(1.7, event.clientX, event.clientY);
  });

  svg.addEventListener("pointerdown", event => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size === 2) {
      capturePointer(event.pointerId);
      beginPinch();
      return;
    }
    if (pointers.size > 2) return;
    if (mapView.w >= mapView.baseW - 0.01) return;
    const point = mapPointFromClient(svg, event.clientX, event.clientY);
    if (!point) return;
    panning = true;
    moved = false;
    startPoint = point;
    startView = { x: mapView.x, y: mapView.y };
    svg.classList.add("is-panning");
    capturePointer(event.pointerId);
  });

  svg.addEventListener("pointermove", event => {
    if (!pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (movePinch(event)) return;
    if (!panning || !startPoint || !startView) return;
    const point = mapPointFromClient(svg, event.clientX, event.clientY);
    if (!point) return;
    const dx = point.x - startPoint.x;
    const dy = point.y - startPoint.y;
    if (Math.abs(dx) + Math.abs(dy) > 2) moved = true;
    mapView.x = clampNumber(startView.x - dx, 0, mapView.baseW - mapView.w);
    mapView.y = clampNumber(startView.y - dy, 0, mapView.baseH - mapView.h);
    mapApplyView();
    if (moved) event.preventDefault();
  });

  const finishPointer = event => {
    const wasPinching = Boolean(pinch);
    pointers.delete(event.pointerId);
    if (wasPinching) {
      pinch = null;
      panning = false;
      startPoint = null;
      startView = null;
      svg.classList.remove("is-panning");
      releasePointer(event.pointerId);
      suppressClick = true;
      setTimeout(() => { suppressClick = false; }, 220);
      return;
    }
    if (!panning) return;
    panning = false;
    startPoint = null;
    startView = null;
    svg.classList.remove("is-panning");
    releasePointer(event.pointerId);
    if (moved) {
      suppressClick = true;
      setTimeout(() => { suppressClick = false; }, 0);
    }
  };
  svg.addEventListener("pointerup", finishPointer);
  svg.addEventListener("pointercancel", finishPointer);

  svg.addEventListener("click", event => {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault();
    event.stopPropagation();
  }, true);

  svg.addEventListener("click", event => {
    if (suppressClick) return;
    const stateNode = event.target.closest?.(".map-state");
    if (!stateNode) return;
    event.preventDefault();
    renderStateDetail(stateNode.dataset.stateId, stateNode);
    openStateMap(stateNode.dataset.stateId);
  });
}

function mapTextWidth(value, size = 7.6) {
  let units = 0;
  for (const char of String(value || "")) {
    units += /[\u3000-\u9fff\uff00-\uffef]/.test(char) ? 1.08 : 0.62;
  }
  return Math.max(10, units * size + 4);
}

function mapLabelBox(text, x, y, anchor, dx, dy, size = 7.6) {
  const width = mapTextWidth(text, size);
  const left = anchor === "end" ? x + dx - width : anchor === "middle" ? x + dx - width / 2 : x + dx;
  return { left, right: left + width, top: y + dy - size * 0.85, bottom: y + dy + size * 0.35 };
}

function mapBoxesOverlap(a, b, pad = 2.4) {
  return !(a.right + pad < b.left || a.left - pad > b.right || a.bottom + pad < b.top || a.top - pad > b.bottom);
}

function layoutCityLabels(cities) {
  const occupied = (cities || []).map(city => ({
    left: city.x - 3.4, right: city.x + 3.4, top: city.y - 3.4, bottom: city.y + 3.4
  }));
  const marks = [];
  for (const city of cities || []) {
    const preferred = [
      [Number.isFinite(Number(city.labelDx)) ? Number(city.labelDx) : 5, Number.isFinite(Number(city.labelDy)) ? Number(city.labelDy) : 2.5],
      [7, 8], [-7, 8], [7, -6], [-7, -6], [0, 12], [0, -11], [14, 0], [-14, 0]
    ];
    let chosen = null;
    for (const [dx, dy] of preferred) {
      const anchor = dx > 0.5 ? "start" : dx < -0.5 ? "end" : "middle";
      const box = mapLabelBox(city.zh, city.x, city.y, anchor, dx, dy);
      if (!occupied.some(other => mapBoxesOverlap(box, other))) {
        chosen = { dx, dy, anchor, box };
        break;
      }
    }
    if (chosen) occupied.push(chosen.box);
    marks.push(`
      <g class="map-city" data-city-id="${esc(city.id)}" role="button" tabindex="0" aria-label="${esc(city.zh)} ${esc(city.name)}">
        <circle cx="${city.x}" cy="${city.y}" r="3.1"></circle>
        ${chosen ? `<text x="${city.x + chosen.dx}" y="${city.y + chosen.dy}" text-anchor="${chosen.anchor}">${esc(city.zh)}</text>` : ""}
      </g>`);
  }
  return { html: marks.join(""), boxes: occupied };
}

function layoutCountryLabels(labels, occupied) {
  const parts = [];
  for (const label of labels || []) {
    const candidates = [[0, 0], [0, -9], [0, 9], [-20, 0], [20, 0], [0, -17], [0, 17]];
    let chosen = null;
    for (const [dx, dy] of candidates) {
      const box = mapLabelBox(label.name, label.x, label.y, "middle", dx, dy, 8);
      if (!occupied.some(other => mapBoxesOverlap(box, other, 1.5))) {
        chosen = { dx, dy, box };
        break;
      }
    }
    if (!chosen) continue;
    occupied.push(chosen.box);
    parts.push(`<text class="map-label" x="${label.x + chosen.dx}" y="${label.y + chosen.dy}">${esc(label.name)}</text>`);
  }
  return parts.join("");
}

function mapFocusBox(box, padding = 14) {
  if (!mapView.baseW || !box) return;
  const targetW = Math.min(mapView.baseW, Math.max(90, box.width + padding * 2));
  const targetH = mapView.baseH * (targetW / mapView.baseW);
  mapView.w = targetW;
  mapView.h = targetH;
  mapView.x = clampNumber(box.x + box.width / 2 - targetW / 2, 0, mapView.baseW - targetW);
  mapView.y = clampNumber(box.y + box.height / 2 - targetH / 2, 0, mapView.baseH - targetH);
  mapApplyView();
}

function layoutStateCityLabels(cities) {
  const occupied = (cities || []).map(city => ({ left: city.x - 4, right: city.x + 4, top: city.y - 4, bottom: city.y + 4 }));
  const marks = [];
  for (const city of cities || []) {
    const candidates = [[8, 0], [-8, 0], [8, -8], [-8, -8], [8, 10], [-8, 10], [0, -12], [0, 14], [18, -2], [-18, -2]];
    let chosen = null;
    for (const [dx, dy] of candidates) {
      const anchor = dx > 0 ? "start" : "end";
      const box = mapLabelBox(city.zh, city.x, city.y, anchor, dx, dy, 8.5);
      if (!occupied.some(other => mapBoxesOverlap(box, other, 3))) {
        chosen = { dx, dy, anchor, box };
        break;
      }
    }
    if (chosen) occupied.push(chosen.box);
    marks.push(`
      <g class="state-map-city" data-action="state-city" data-city-id="${esc(city.id)}" role="button" tabindex="0" aria-label="${esc(city.zh)} ${esc(city.name)}">
        <circle cx="${city.x}" cy="${city.y}" r="4"></circle>
        ${chosen ? `<text x="${city.x + chosen.dx}" y="${city.y + chosen.dy}" text-anchor="${chosen.anchor}">${esc(city.zh)}</text>` : ""}
      </g>`);
  }
  return marks.join("");
}

function openStateMap(stateId) {
  const state = (GERMANY_STATES?.states || []).find(item => item.id === stateId);
  if (!state) return;
  const info = GERMANY_STATE_INFO[stateId] || {};
  const mainPath = document.querySelector(`.map-state[data-state-id="${stateId}"]`);
  const bbox = mainPath?.getBBox?.();
  const pad = 60;
  const viewBox = bbox ? `${bbox.x - pad} ${bbox.y - pad} ${bbox.width + pad * 2} ${bbox.height + pad * 2}` : "0 0 920 297.7";
  const norm = value => String(value || "").replace(/州$/, "");
  const cities = (MAP_DATA?.cities || []).filter(city => norm(city.state) === info.zh || city.state === info.zh);
  const marks = layoutStateCityLabels(cities);
  openModal(`
    <div class="modal-head">
      <div><p class="eyebrow">BUNDESLAND · ${esc(state.name.toUpperCase())}</p><h2>${esc(info.zh || state.name)}</h2></div>
      <button class="modal-close" data-close aria-label="关闭州地图">${icon("close")}</button>
    </div>
    <div class="state-map-modal">
      <div class="state-map-canvas">
        <svg viewBox="${viewBox}" role="img" aria-label="${esc(state.name)} 州地图">
          <path class="state-map-shape" d="${state.d}"></path>
          <g class="state-map-cities">${marks}</g>
        </svg>
        <button type="button" class="btn btn-ghost state-map-back" data-close>← 返回德国地图</button>
      </div>
      <aside class="state-map-aside">
        <p class="state-detail-meta">${info.capital ? `首府 ${esc(info.capital)}` : ""}${info.population ? ` · ${esc(info.population)}` : ""}${info.area ? ` · ${esc(info.area)}` : ""}</p>
        <p>${esc(info.desc || "德国联邦州。")}</p>
        ${Array.isArray(info.highlights) && info.highlights.length ? `<p class="state-detail-tags">${info.highlights.map(item => `<span>${esc(item)}</span>`).join("")}</p>` : ""}
        <p class="state-map-city-hint">${cities.length ? `本州城市：${cities.map(city => esc(city.zh)).join(" · ")}` : "本州暂无城市卡片。"}</p>
      </aside>
    </div>
  `, "state-map-dialog");
}

function renderStateDetail(stateId, node) {
  const state = (GERMANY_STATES?.states || []).find(item => item.id === stateId);
  const box = $("#state-detail");
  if (!state || !box) return;
  const info = GERMANY_STATE_INFO[stateId] || {};
  const bbox = node?.getBBox?.();
  const pad = 4;
  const viewBox = bbox ? `${bbox.x - pad} ${bbox.y - pad} ${bbox.width + pad * 2} ${bbox.height + pad * 2}` : "0 0 920 297.7";
  box.innerHTML = `
    <article class="state-detail-card">
      <div class="state-detail-head">
        <div><p class="eyebrow">BUNDESLAND</p><h3>${esc(info.zh || state.name)} <small>${esc(state.name)}</small></h3></div>
        <button type="button" class="modal-close" data-action="close-state" aria-label="关闭州简介">×</button>
      </div>
      <div class="state-detail-body">
        <svg class="state-mini-map" viewBox="${viewBox}" role="img" aria-label="${esc(state.name)} 州地图"><path d="${state.d}"></path></svg>
        <div>
          <p class="state-detail-meta">${info.capital ? `首府 ${esc(info.capital)}` : ""}${info.population ? ` · ${esc(info.population)}` : ""}${info.area ? ` · ${esc(info.area)}` : ""}</p>
          <p>${esc(info.desc || "德国联邦州。")}</p>
          ${Array.isArray(info.highlights) && info.highlights.length ? `<p class="state-detail-tags">${info.highlights.map(item => `<span>${esc(item)}</span>`).join("")}</p>` : ""}
        </div>
      </div>
      <button type="button" class="btn btn-ghost state-map-open" data-action="open-state-map" data-state-id="${esc(stateId)}">进入州地图 →</button>
    </article>`;
  box.hidden = false;
  $$(".map-state").forEach(item => item.classList.toggle("is-active", item === node));
  const cityBox = $("#city-detail");
  if (cityBox) cityBox.hidden = true;
}

function renderCultureMap() {
  const panel = $("#culture-map-panel");
  const svg = $("#culture-map-svg");
  if (!panel || !svg) return;
  panel.hidden = cultureCategory !== "map";
  if (panel.hidden) return;
  if (!MAP_DATA) {
    svg.innerHTML = `<text x="20" y="40" font-size="12" fill="#7b877d">鍦板浘鏁版嵁鏈姞杞?/text>`;
    return;
  }
  if (svg.dataset.rendered === "1") return;
  const { width, height, countries, labels, cities } = MAP_DATA;
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  const sorted = countries.slice().sort((a, b) => (a.name === "Deutschland" ? 1 : 0) - (b.name === "Deutschland" ? 1 : 0));
  const countryPaths = sorted.map(country => `
    <path class="map-country ${country.name === "Deutschland" ? "is-germany" : ""}" d="${country.d}" data-country="${esc(country.name)}"></path>`).join("");
  const cityLayout = layoutCityLabels(cities || []);
  const cityMarks = cityLayout.html;
  const countryLabels = layoutCountryLabels(labels || [], cityLayout.boxes);
  const statePaths = (GERMANY_STATES?.states || []).map(state => `
    <path class="map-state" d="${state.d}" data-state-id="${esc(state.id)}" data-state="${esc(state.name)}"><title>${esc(state.name)}</title></path>`).join("");
  svg.innerHTML = `<g class="map-countries">${countryPaths}</g><g class="map-states">${statePaths}</g>${countryLabels}<g class="map-cities">${cityMarks}</g>`;
  svg.dataset.rendered = "1";
  if (!mapView.baseW) {
    mapView.baseW = width;
    mapView.baseH = height;
    mapView.x = 0;
    mapView.y = 0;
    mapView.w = width;
    mapView.h = height;
    mapApplyView();
  }
  bindCultureMapZoom();
}

function renderCityDetail(cityId) {
  const box = $("#city-detail");
  if (!box) return;
  const stateBox = $("#state-detail");
  if (stateBox) stateBox.hidden = true;
  $$(".map-state.is-active").forEach(item => item.classList.remove("is-active"));
  const city = (MAP_DATA?.cities || []).find(item => item.id === cityId);
  if (!city) {
    box.innerHTML = `<p class="city-detail-empty">选择一座城市查看简介。</p>`;
    return;
  }
  $$("#culture-map-svg .map-city").forEach(node => node.classList.toggle("is-active", node.dataset.cityId === cityId));
  box.innerHTML = `
    <article class="city-detail-card">
      <div class="city-detail-kicker"><span>${esc(city.state)}</span><strong>${esc(city.population)}</strong></div>
      <h3>${esc(city.zh)} <small>${esc(city.name)}</small></h3>
      <div class="city-detail-stats">
        <span><small>所属</small>${esc(city.state)}</span>
        <span><small>人口</small>${esc(city.population)}</span>
        ${city.area ? `<span><small>面积</small>${esc(city.area)}</span>` : ""}
        ${city.river ? `<span><small>河流</small>${esc(city.river)}</span>` : ""}
      </div>
      <p>${esc(city.desc)}</p>
      ${city.economy ? `<p class="city-detail-economy"><strong>经济与特色</strong> ${esc(city.economy)}</p>` : ""}
      ${(city.highlights || []).length ? `<div class="city-detail-highlights">${city.highlights.map(item => `<span>${esc(item)}</span>`).join("")}</div>` : ""}
    </article>`;
}

function cultureCardTemplate(item, isHistory) {
  const labels = Object.fromEntries((CULTURE_DATA.categories || []).map(category => [category.id, category.label]));
  const year = cultureYear(item);
  const yearLabel = item.year || (year ? `${year}${item.category === "person" ? " 生" : ""}` : "");
  return `
    <article class="culture-card ${esc(item.category)} ${isHistory ? "is-timeline" : ""}" id="culture-card-${esc(item.id)}">
      <div class="culture-kicker">
        <span>${esc(labels[item.category] || item.category)}</span>
        ${yearLabel ? `<strong>${esc(yearLabel)}</strong>` : ""}
      </div>
      <h2>${esc(item.titleZh)}</h2>
      <p class="culture-title-de">${esc(item.titleDe)}</p>
      <p>${esc(item.contentZh)}</p>
      <details class="culture-de">
        <summary>德语原文</summary>
        <p>${esc(item.contentDe)}</p>
      </details>
      ${item.bookSource ? `<p class="culture-book-source">依据：${esc(item.bookSource)}</p>` : ""}
      <div class="culture-sources">
        ${(item.sources || []).map(source => `<a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.title)}</a>`).join("")}
        <span>${Math.round((Number(item.confidence) || 0.8) * 100)}% 可信度</span>
      </div>
    </article>`;
}

function renderCulture() {
  const grid = $("#culture-grid");
  if (!grid) return;
  const labels = Object.fromEntries((CULTURE_DATA.categories || []).map(item => [item.id, item.label]));
  const query = cultureQuery.trim();
  const foldedQuery = foldSearch(query);
  const baseItems = CULTURE_DATA.items
    .filter(item => cultureCategory === "all" || item.category === cultureCategory)
    .filter(item => {
      if (!foldedQuery) return true;
      const haystack = [
        item.titleDe,
        item.titleZh,
        item.contentDe,
        item.contentZh,
        item.bookSource,
        item.year,
        ...(item.tags || []),
        ...(item.sources || []).map(source => source.title)
      ].join(" ");
      return foldSearch(haystack).includes(foldedQuery);
    });
  const isHistory = cultureCategory === "history";
  const isPerson = cultureCategory === "person";
  const isTimeline = isHistory || isPerson;
  const historyItems = baseItems.filter(item => item.category === (isPerson ? "person" : "history"));
  let items = baseItems.slice();
  if (cultureTheme !== "all" && cultureCategory === "culture") {
    items = items.filter(item => cultureThemeGroup(item) === cultureTheme);
  }
  if (isTimeline) {
    if (cultureEra !== "all") {
      items = items.filter(item => cultureEraForYear(cultureYear(item)) === cultureEra);
    }
    items.sort((a, b) => {
      const yearA = cultureYear(a);
      const yearB = cultureYear(b);
      if (yearA === null && yearB === null) return String(a.titleZh).localeCompare(String(b.titleZh), "zh");
      if (yearA === null) return 1;
      if (yearB === null) return -1;
      return yearA - yearB;
    });
  } else {
    items.reverse();
  }
  renderCultureTimeline(historyItems);
  const searchInput = $("#culture-search");
  if (searchInput && searchInput.value !== cultureQuery) searchInput.value = cultureQuery;
  $("#culture-count").textContent = CULTURE_DATA.items.length;
  const eraLabel = CULTURE_ERAS.find(era => era.id === cultureEra)?.label || "全部";
  const themeLabel = cultureTheme === "all" ? "" : ` · ${cultureTheme}`;
  $("#culture-meta").textContent = query
    ? `${items.length} 条 · 搜索“${query}”${isTimeline ? ` · ${eraLabel}` : themeLabel}`
    : isHistory
      ? `${items.length} 条 · 历史 · ${eraLabel} · 按时间升序`
      : isPerson
        ? `${items.length} 位 · 人物 · ${eraLabel} · 按出生年升序`
        : `${items.length} 条 · ${labels[cultureCategory] || "全部"}${themeLabel} · 最近补充优先`;
  const hint = $("#culture-search-hint");
  if (hint) hint.textContent = query ? `匹配 ${items.length} 条` : "可按中文、德语或标签检索";
  $(".culture-search")?.classList.toggle("is-searching", Boolean(query));
  $$("#culture-filter [data-culture-category]").forEach(chip => {
    chip.classList.toggle("is-active", chip.dataset.cultureCategory === cultureCategory);
  });
  renderCultureThemeFilter();
  renderCultureMap();
  renderFestivalTimeline();
  if (!items.length) {
    grid.innerHTML = query
      ? `<div class="culture-empty"><h3>没有找到“${esc(query)}”</h3><p>试试人物名、地名、年份，或换一个更短的关键词。</p></div>`
      : isHistory && cultureEra !== "all"
        ? `<div class="culture-empty"><h3>这个时期还没有条目</h3><p>切回“全部”查看完整时间轴。</p></div>`
        : `<div class="culture-empty"><h3>这个分类还没有内容</h3><p>换一个分类看看。</p></div>`;
    return;
  }
  const grouped = new Map();
  for (const item of items) {
    const label = cultureGroupLabel(item, cultureCategory === "all");
    if (!grouped.has(label)) grouped.set(label, []);
    grouped.get(label).push(item);
  }
  const groupOrder = cultureCategory === "history"
    ? CULTURE_ERAS.map(era => era.label)
    : cultureCategory === "person"
      ? CULTURE_ERAS.map(era => era.label)
      : cultureCategory === "culture"
        ? [...CULTURE_THEME_GROUPS.map(group => group[0]), "日常生活与习俗"]
        : cultureCategory === "map"
          ? ["联邦州", "德国地理"]
          : ["历史", "文化", "地图", "人物"];
  const groups = [...grouped.entries()].sort((a, b) => {
    const ai = groupOrder.indexOf(a[0]);
    const bi = groupOrder.indexOf(b[0]);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
  grid.innerHTML = groups.map(([label, groupItems]) => `
    <section class="culture-group">
      <div class="culture-group-head">
        <h2>${esc(label)}</h2>
        <span>${groupItems.length} 条</span>
      </div>
      <div class="culture-grid">
        ${groupItems.map(item => cultureCardTemplate(item, isHistory)).join("")}
      </div>
    </section>`).join("");
}

function renderWeekStrip(metrics) {
  const container = $("#week-strip");
  if (!container) return;
  const todayStart = startOfDay().getTime();
  const cells = [];
  for (let offset = 6; offset >= 0; offset -= 1) {
    const ts = todayStart - offset * DAY_MS;
    const d = new Date(ts);
    const has = (state.activity[dayKey(ts)] || 0) > 0;
    const isToday = offset === 0;
    cells.push(`
      <div class="week-day ${has ? "has-activity" : ""} ${isToday ? "is-today" : ""}" title="${dayKey(ts)} · ${state.activity[dayKey(ts)] || 0} 次复习">
        <span>${WEEKDAYS_ZH[d.getDay()]}</span>
        <i>${d.getDate()}</i>
      </div>
    `);
  }
  container.innerHTML = cells.join("");
}

function renderDecks(metrics) {
  const container = $("#deck-grid");
  if (!container) return;
  container.innerHTML = TOPICS.filter(topic => !topic.isPack).map(topic => {
    const words = allWords().filter(word => word.topic === topic.id);
    const mastered = words.filter(word => statusFor(word) === "mastered").length;
    const percent = words.length ? Math.round((mastered / words.length) * 100) : 0;
    return `
      <button class="deck-card" data-action="start-topic" data-topic="${topic.id}" style="--deck-color:${topic.color};--deck-soft:${topic.soft}" aria-label="学习 ${topic.name}">
        <span class="deck-letter">${topic.letter}</span>
        <span class="deck-top">
          <span class="deck-icon">${icon(topic.icon)}</span>
          <span class="deck-count">${words.length} WÖRTER</span>
        </span>
        <span class="deck-arrow">${icon("arrow-right")}</span>
        <h3>${esc(topic.name)}</h3>
        <span class="deck-de">${esc(topic.de)}</span>
        <span class="deck-progress">
          <span class="deck-progress-row"><span>已掌握 ${mastered}</span><span>${percent}%</span></span>
          <span class="deck-track"><i style="width:${percent}%"></i></span>
        </span>
      </button>
    `;
  }).join("");
}

function renderWeekChart() {
  const container = $("#week-chart");
  if (!container) return;
  const todayStart = startOfDay().getTime();
  const entries = [];
  for (let offset = 6; offset >= 0; offset -= 1) {
    const ts = todayStart - offset * DAY_MS;
    entries.push({ ts, count: state.activity[dayKey(ts)] || 0, isToday: offset === 0 });
  }
  const max = Math.max(1, ...entries.map(entry => entry.count));
  container.innerHTML = entries.map(entry => {
    const d = new Date(entry.ts);
    const height = Math.max(4, Math.round((entry.count / max) * 100));
    return `
      <div class="week-bar ${entry.isToday ? "is-today" : ""} ${entry.count === 0 ? "is-empty" : ""}">
        <span class="week-bar-value">${entry.count || ""}</span>
        <span class="week-bar-track"><i class="week-bar-fill" style="height:${height}%"></i></span>
        <span class="week-bar-day">${WEEKDAYS_ZH[d.getDay()]}</span>
      </div>
    `;
  }).join("");

  const thisWeek = entries.reduce((sum, entry) => sum + entry.count, 0);
  const previous = Array.from({ length: 7 }, (_, index) => state.activity[dayKey(todayStart - (7 + index) * DAY_MS)] || 0)
    .reduce((sum, count) => sum + count, 0);
  $("#week-total").textContent = `${thisWeek} 词`;
  const compare = $("#week-compare");
  if (thisWeek === 0) compare.textContent = "这一周还没开始，今天算数。";
  else if (previous === 0) compare.textContent = "一个很好的开始，继续保持。";
  else if (thisWeek > previous) compare.textContent = `比上周多 ${thisWeek - previous} 次复习。`;
  else if (thisWeek < previous) compare.textContent = `比上周少 ${previous - thisWeek} 次，慢慢来。`;
  else compare.textContent = "和上周一样稳定。";
}

function renderDueList(metrics) {
  const container = $("#home-due-list");
  if (!container) return;
  $("#home-due-more").textContent = metrics.dueToday.length;
  let words = metrics.dueToday.slice().sort(sortByDue).slice(0, 4);
  let isNew = false;
  if (!words.length) {
    words = metrics.words.filter(word => !reviewFor(word.id)).slice(0, 4);
    isNew = true;
  }
  if (!words.length) {
    container.innerHTML = `<p class="queue-empty">今天没有需要复习的卡片。真的很不错。</p>`;
    return;
  }
  container.innerHTML = words.map(word => {
    const article = word.article || "";
    const review = reviewFor(word.id);
    const status = isNew
      ? "新词"
      : review?.due <= Date.now()
        ? "现在"
        : "今天";
    return `
      <button class="due-row" data-start-word="${esc(word.id)}" aria-label="复习 ${esc(wordDisplay(word))}">
        <span class="due-article ${article || "none"}" ${article ? `data-art="${article}"` : ""}>${article || "·"}</span>
        <span class="due-word"><strong>${esc(word.word)}</strong><span>${esc(word.translation)}</span></span>
        <span class="due-status">${status} ${icon("chevron")}</span>
      </button>
    `;
  }).join("");
}

function renderWordOfDay() {
  const container = $("#word-of-day");
  if (!container) return;
  const words = allWords();
  if (!words.length) return;
  const index = Math.floor(startOfDay().getTime() / DAY_MS) % words.length;
  const word = words[index];
  const topic = getTopic(word.topic);
  container.dataset.startWord = word.id;
  container.setAttribute("role", "button");
  container.setAttribute("tabindex", "0");
  container.setAttribute("aria-label", `学习今日单词 ${wordDisplay(word)}`);
  container.innerHTML = `
    <div class="wod-label">WORT DES TAGES · ${esc(topic.de.split(" ")[0])}</div>
    <div class="wod-word">${word.article ? `<i>${esc(word.article)}</i>` : ""}${esc(word.word)}</div>
    <div class="wod-translation">${esc(word.translation)}</div>
  `;
}

/* ─────────────────────────── Study session ─────────────────────────── */

function startStudy({ mode = "daily", topicId = null, limit = null, wordId = null, level = "all" } = {}) {
  const dailyCap = Math.max(5, Math.min(100, Number(state.settings.dailyGoal) || 20));
  const requestedLimit = Number(limit) || 12;
  const effectiveLimit = wordId || mode === "repeat" ? requestedLimit : Math.min(requestedLimit, dailyCap);
  const activeLevel = level && level !== "all"
    ? normalizeCefrLevel(level)
    : (["daily", "new", "review", "weak"].includes(mode) ? selectedDailyLevel() : "all");
  const queue = buildQueue(mode, topicId, effectiveLimit, wordId, level);
  if (!queue.length) {
    if (mode === "new") showToast("这一难度下所有词都学过了，去复习一组吧。");
    else if (mode === "review") showToast("这一难度今天没有到期卡片，试试新词。");
    else showToast("这一难度暂时没有可学习的卡片。");
    return;
  }

  closeModal();
  stopStudyTimer();
  $("#study-summary").classList.add("hidden");
  $("#study-stage").classList.remove("hidden");
  $("#view-study").classList.remove("is-revealed");

  session = {
    queue: queue.slice(),
    index: 0,
    done: 0,
    ratings: [],
    start: Date.now(),
    mode,
    topicId,
    level: activeLevel,
    limit: effectiveLimit,
    transitioning: false,
    finished: false,
    phase: "card",
    exam: null,
    examStats: { total: 0, correct: 0 }
  };

  const topicLabel = wordId
    ? "单张复习"
    : topicId
      ? getTopic(topicId).name
      : mode === "new"
        ? (activeLevel && activeLevel !== "all" ? `${activeLevel} 新词` : "认识新词")
        : mode === "weak"
          ? "重点复习"
          : activeLevel && activeLevel !== "all"
            ? `${activeLevel} · 今日复习`
            : "今日复习";
  $("#study-topic-label").textContent = topicLabel;
  $("#study-timer").textContent = "00:00";
  setView("study");
  startStudyTimer();
  renderStudyCard();
}

function startStudyTimer() {
  stopStudyTimer();
  studyTimer = setInterval(() => {
    if (!session || session.finished) return;
    $("#study-timer").textContent = formatClock(Date.now() - session.start);
  }, 1000);
}

function stopStudyTimer() {
  if (studyTimer) {
    clearInterval(studyTimer);
    studyTimer = null;
  }
}

function conjugatePresent(word) {
  const infinitive = String(word.word || "").replace(/^sich\s+/i, "").trim();
  if (!infinitive) return [];
  const modals = {
    sein: ["bin", "bist", "ist", "sind", "seid", "sind"],
    haben: ["habe", "hast", "hat", "haben", "habt", "haben"],
    werden: ["werde", "wirst", "wird", "werden", "werdet", "werden"],
    können: ["kann", "kannst", "kann", "können", "könnt", "können"],
    müssen: ["muss", "musst", "muss", "müssen", "müsst", "müssen"],
    wollen: ["will", "willst", "will", "wollen", "wollt", "wollen"],
    sollen: ["soll", "sollst", "soll", "sollen", "sollt", "sollen"],
    dürfen: ["darf", "darfst", "darf", "dürfen", "dürft", "dürfen"],
    mögen: ["mag", "magst", "mag", "mögen", "mögt", "mögen"]
  };
  const pronouns = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];
  if (modals[infinitive]) return pronouns.map((pronoun, index) => [pronoun, modals[infinitive][index]]);

  const prefixes = ["zurück", "zusammen", "weiter", "entgegen", "gegenüber", "hin", "her", "auf", "aus", "ein", "mit", "nach", "vor", "weg", "los", "an", "ab", "bei", "zu"];
  let prefix = "";
  let core = infinitive;
  for (const candidate of prefixes) {
    if (core.startsWith(candidate) && core.length > candidate.length + 2) {
      prefix = candidate;
      core = core.slice(candidate.length);
      break;
    }
  }
  const stem = core.endsWith("en") ? core.slice(0, -2) : core.endsWith("n") ? core.slice(0, -1) : core;
  if (!stem) return [];
  const change = {
    fahren: "fähr", laufen: "läuf", sehen: "sieh", lesen: "lies", essen: "iss",
    geben: "gib", nehmen: "nimm", sprechen: "sprich", helfen: "hilf", treffen: "triff",
    schlafen: "schläf", tragen: "träg", waschen: "wäsch", fangen: "fäng",
    halten: "hält", lassen: "lässt", stoßen: "stößt"
  }[infinitive] || stem;
  const duSpecial = { lassen: "lässt", stoßen: "stößt", halten: "hältst" }[infinitive];
  const needsE = /[dt]$/.test(stem);
  const add = suffix => `${prefix ? `${stem}${suffix} ${prefix}` : `${stem}${suffix}`}`;
  const addChanged = suffix => `${prefix ? `${change}${suffix} ${prefix}` : `${change}${suffix}`}`;
  const forms = [
    ["ich", add("e")],
    ["du", duSpecial || addChanged(needsE ? "est" : stem.endsWith("s") || stem.endsWith("ß") || stem.endsWith("z") ? "t" : "st")],
    ["er/sie/es", addChanged(needsE ? "et" : "t")],
    ["wir", add("en")],
    ["ihr", add(needsE ? "et" : "t")],
    ["sie/Sie", add("en")]
  ];
  if (String(word.word || "").startsWith("sich ")) {
    const reflexives = ["mich", "dich", "sich", "uns", "euch", "sich"];
    forms.forEach((row, index) => { row[1] += ` ${reflexives[index]}`; });
  }
  return forms;
}

function buildConjugation(word) {
  if (!word) return "";
  if (word.pos !== "verb" && !word.forms) return "";
  const parts = String(word.forms || "")
    .split(/[,;，；]/)
    .map(part => part.trim())
    .filter(Boolean);
  const rows = [["原形", word.word]];
  if (word.pos === "verb") {
    conjugatePresent(word).forEach(([label, value]) => rows.push([label, value]));
    const labels = ["第三人称 / 变位", "过去式", "第二分词 / 助动词"];
    parts.forEach((part, index) => rows.push([labels[index] || "词形", part]));
    if (!parts.length) rows.push(["过去式 / 第二分词", "词表未提供完整形式"]);
  } else if (word.pos === "adj") {
    const labels = ["比较级", "最高级"];
    parts.slice(0, 2).forEach((part, index) => rows.push([labels[index], part]));
  } else {
    parts.forEach(part => rows.push(["词形", part]));
  }
  return `<table class="conjugation-table"><tbody>${rows.map(([label, value]) => `
    <tr><th>${esc(label)}</th><td>${esc(value)}</td></tr>
  `).join("")}</tbody></table>`;
}

function renderStudyCard() {
  if (!session) return;
  if (session.index >= session.queue.length) {
    finishSession();
    return;
  }
  const word = session.queue[session.index];
  const topic = getTopic(word.topic);
  const review = reviewFor(word.id);
  const firstEncounter = !review && session.mode !== "repeat";
  session.firstEncounter = firstEncounter;
  const downgradeButton = $("#downgrade-level");
  if (downgradeButton) downgradeButton.classList.toggle("hidden", firstEncounter || !review || Number(review.userLevel) <= 0);
  const view = $("#view-study");
  const flashcard = $("#flashcard");
  session.transitioning = false;

  view.classList.toggle("is-first-encounter", firstEncounter);
  view.classList.remove("is-revealed");
  flashcard.classList.remove("is-flipped", "is-leaving");
  flashcard.classList.remove("is-entering");
  void flashcard.offsetWidth;
  flashcard.classList.add("is-entering");
  setTimeout(() => flashcard.classList.remove("is-entering"), 380);
  flashcard.setAttribute("aria-label", `点击翻转卡片，查看 ${word.word} 的释义`);

  $("#card-level").textContent = word.level || "A1";
  $("#card-topic").textContent = topic.name;
  $("#back-level").textContent = word.level || "A1";
  $("#back-topic").textContent = topic.name;

  const article = word.article || "";
  const articleRow = $("#card-article-row");
  const cardArticle = $("#card-article");
  const backArticle = $("#back-article");
  if (article) {
    articleRow.style.visibility = "visible";
    cardArticle.style.display = "";
    cardArticle.dataset.art = article;
    cardArticle.textContent = article;
    backArticle.style.display = "";
    backArticle.dataset.art = article;
    backArticle.textContent = article;
  } else {
    articleRow.style.visibility = "hidden";
    cardArticle.style.display = "none";
    backArticle.style.display = "none";
  }

  const wordEl = $("#card-word");
  wordEl.textContent = word.word;
  wordEl.classList.toggle("long", word.word.length >= 12 && word.word.length < 15);
  wordEl.classList.toggle("xlong", word.word.length >= 15);
  $("#card-forms").textContent = formsLine(word);

  $("#back-word").textContent = word.word;
  $("#back-translation").textContent = word.translation;
  $("#back-pos").textContent = FINE_POS_LABELS[word.finePos] || POS_LABELS[word.pos] || "词性待补充";
  $("#back-plural").textContent = word.pos === "noun"
    ? pluralLabel(word)
    : word.forms || (word.pos === "adj" ? "比较级待补充" : word.pos === "verb" ? "变位待补充" : "变形待补充");
  $("#back-level-fact").textContent = word.level || "A1";
  const conjugation = buildConjugation(word);
  const conjugationBlock = $("#conjugation-block");
  if (conjugationBlock) {
    conjugationBlock.classList.toggle("hidden", !conjugation);
    conjugationBlock.open = false;
    $("#conjugation-summary").textContent = word.pos === "verb" ? "现在时 / 过去式 / 完成时" : word.pos === "adj" ? "比较级 / 最高级" : "词形";
    $("#conjugation-content").innerHTML = conjugation;
  }
  $("#back-example").textContent = word.example || "例句待补充";
  $("#back-example-zh").textContent = word.exampleZh || (word.example ? "" : "该词暂未匹配到可靠例句，后续批次会继续补充。");
  const exampleSource = $("#back-example-source");
  if (exampleSource) {
    exampleSource.textContent = word.exampleSource === "article"
      ? `文章例句 · 《${word.exampleArticleTitle || "文章"}》 · ${word.exampleLevel || word.level || "B1"}`
      : word.exampleSource === "wordbook"
        ? `词汇书例句 · ${word.exampleBook || "词表"}`
        : "";
  }
  $("#back-note").textContent = word.note || (word.pack || word.book
    ? "这是教材词表词条。试着用它造一个句子；系统会按你的答题对错自动安排复习。"
    : "把这个词和你的生活连起来，它会更容易留下。");
  $("#example-block").classList.remove("hidden");
  const sourceEl = $("#card-source");
  if (sourceEl) {
    sourceEl.classList.toggle("hidden", !word.source);
    sourceEl.innerHTML = word.source
      ? `<span>QUELLE</span>${esc(word.source)}${word.sourceRef ? ` · ${esc(word.sourceRef)}` : ""}`
      : "";
  }

  const total = session.queue.length;
  const current = session.index + 1;
  $("#study-progress-label").textContent = `${current} / ${total}`;
  $("#study-progress-bar").style.width = `${(session.done / total) * 100}%`;
  $("#session-done").textContent = session.done;
  $("#session-left").textContent = total - session.done;

  const reviewCount = review ? (review.reps + review.lapses) : 0;
  const currentLevel = review ? Number(review.level) || 0 : 0;
  const reasonText = levelReasonText(review);
  $("#session-note").textContent = firstEncounter
    ? "第一次见面。先翻开词卡，再按自己的感觉选择掌握程度（0–5）。"
    : review
      ? `已作答 ${reviewCount} 次 · 当前 ${currentLevel}/5${reasonText ? ` · ${reasonText}` : ""}。系统会按三种考察结果自动安排。`
      : "第一次见面。先凭直觉选，选错也会立刻看到词卡。";
  const backHint = $("#back-hint-label");
  const backKeys = $("#back-hint-keys");
  if (backHint) backHint.textContent = firstEncounter ? "选择你对这个词的掌握程度（0–5）" : "已自动记录，无需自评";
  if (backKeys) backKeys.innerHTML = firstEncounter ? "<kbd>0</kbd>–<kbd>5</kbd>" : "<kbd>Enter</kbd>";
  const nextLabel = $("#mastery-next-label");
  if (nextLabel) nextLabel.textContent = firstEncounter ? "首次学习" : "等待作答";
  const nextNote = $("#mastery-next-note");
  if (nextNote) nextNote.textContent = firstEncounter
    ? "先自评 0–5；第二次出现时进入德译中、中译德、拼写三种考察。"
    : "答对或答错都会自动安排下一次复习，不需要自评。";
  for (let level = 0; level <= 5; level += 1) {
    const preview = $(`#preview-${level}`);
    if (preview) preview.textContent = formatReviewWait(REVIEW_ENGINE.INTERVALS[level]);
  }
  $("#study-timer").textContent = formatClock(Date.now() - session.start);

  $("#study-stage").classList.remove("exam-active");
  $("#exam-panel").classList.add("hidden");
  session.phase = "card";
  session.exam = null;
  if (!firstEncounter) beginExam(word);

  const upcoming = session.queue.slice(session.index + 1, session.index + 4);
  $("#queue-count").textContent = `${Math.max(0, total - session.index - 1)} 张`;
  $("#queue-preview").innerHTML = upcoming.length
    ? upcoming.map(item => `
        <div class="queue-item">
          <i></i>
          <span style="color:var(--ink);font-size:10px">${esc(item.article ? `${item.article} ` : "")}${esc(item.word)}</span>
          <span>${esc(item.level)}</span>
        </div>
      `).join("")
    : `<p class="queue-empty">这是最后一张了。</p>`;
}

function confusionCandidates(word, count = 3) {
  const pool = allWords().filter(candidate =>
    candidate.id !== word.id &&
    candidate.translation &&
    candidate.translation !== word.translation
  );
  const scored = pool.map(candidate => {
    let score = 0;
    if (candidate.pos === word.pos) score += 30;
    if (candidate.article && candidate.article === word.article) score += 12;
    if (candidate.topic === word.topic) score += 10;
    if (candidate.level === word.level) score += 8;
    const distance = levenshtein(String(candidate.word).toLowerCase(), String(word.word).toLowerCase());
    score += Math.max(0, 10 - distance) * 2;
    if (candidate.word.slice(0, 3).toLowerCase() === word.word.slice(0, 3).toLowerCase()) score += 6;
    if (String(candidate.translation).slice(0, 2) === String(word.translation).slice(0, 2)) score += 4;
    return { candidate, score };
  }).sort((a, b) => b.score - a.score);
  return scored.slice(0, Math.max(count * 3, 8)).map(item => item.candidate);
}

function beginExam(word) {
  if (!session || !REVIEW_ENGINE) return;
  const previous = reviewFor(word.id);
  if (!previous) return;
  const rec = REVIEW_ENGINE.normalize(previous);
  const form = REVIEW_ENGINE.pickForm(rec);
  const formMeta = REVIEW_ENGINE.FORM_META[form];
  const isConfusion = rec.level < 5;
  const candidates = confusionCandidates(word, 3);
  let options = [];
  let correct = 0;
  let answer = "";
  if (form === "spell") {
    answer = spellingAnswer(word);
  } else {
    const labels = form === "de2zh"
      ? candidate => candidate.translation
      : candidate => wordDisplay(candidate);
    options = shuffle([word, ...candidates.slice(0, 3)]).map(candidate => ({
      word: candidate,
      label: labels(candidate)
    }));
    correct = options.findIndex(option => option.word.id === word.id);
  }
  session.exam = {
    form,
    formMeta,
    options,
    correct,
    answer,
    answered: false,
    chosen: null,
    level: rec.level,
    userLevel: rec.userLevel,
    reason: rec.levelReason,
    isConfusion,
    next: null
  };
  session.phase = "exam";
  session.examStats.total += 1;
  renderExam(word);
}

function renderExam(word) {
  const exam = session?.exam;
  if (!exam) return;
  const level = Number(exam.level) || 0;
  const formMeta = exam.formMeta || REVIEW_ENGINE.FORM_META[exam.form];
  const reason = LEVEL_REASON_LABEL[exam.reason] || "等待实测";
  $("#study-stage").classList.add("exam-active");
  $("#exam-panel").classList.remove("hidden");
  $("#exam-progress").textContent = `${session.index + 1} / ${session.queue.length} · ${formMeta.label} · 掌握度 ${level}/5`;
  $("#exam-question").textContent = exam.form === "zh2de" || exam.form === "spell"
    ? word.translation
    : wordDisplay(word);
  $("#exam-sub").textContent = exam.form === "de2zh"
    ? "看德语，选出正确的中文释义。"
    : exam.form === "zh2de"
      ? "看中文，选出正确的德语单词。"
      : "看中文，写出完整的德语单词；名词必须带定冠词 der/die/das（ä/ö/ü/ß 可写作 ae/oe/ue/ss）。";
  const status = $("#exam-status");
  if (status) {
    status.textContent = `本次考察：${formMeta.label} · 自评起点 ${exam.userLevel}/5 · ${reason}`;
  }
  const guide = $("#exam-mastery-guide");
  if (guide) {
    guide.innerHTML = LEVEL_META.map((meta, index) => `
      <span class="exam-mastery-step ${index === level ? "is-active" : ""}">
        <i></i>${meta.short}<small>${meta.label.replace(/^\d+ · /, "")}</small>
      </span>
    `).join("");
  }
  const options = $("#exam-options");
  const spell = $("#exam-spell");
  const spellInput = $("#exam-spell-input");
  const isSpell = exam.form === "spell";
  options.classList.toggle("hidden", isSpell);
  spell.classList.toggle("hidden", !isSpell);
  if (isSpell) {
    options.innerHTML = "";
    spellInput.value = "";
    spellInput.disabled = false;
    $("#exam-reveal").disabled = true;
    setTimeout(() => spellInput.focus({ preventScroll: true }), 30);
  } else {
    options.innerHTML = exam.options.map((option, index) => `
      <button class="exam-option" data-exam-option="${index}">
        <span class="exam-index">${index + 1}</span>
        <span>${esc(option.label)}</span>
      </button>
    `).join("");
    $("#exam-reveal").disabled = false;
  }
  $("#exam-result").classList.add("hidden");
  $("#exam-result").classList.remove("is-wrong");
  $("#exam-panel").classList.remove("is-answered");
}

function answerExam(index) {
  const exam = session?.exam;
  if (!exam || exam.answered || exam.form === "spell") return;
  const chosen = Number(index);
  if (!Number.isInteger(chosen) || chosen < 0 || chosen >= exam.options.length) return;
  const correct = chosen === exam.correct;
  resolveExamAnswer(correct, exam.options[exam.correct]?.label || "", chosen);
}

function submitSpell() {
  const exam = session?.exam;
  if (!exam || exam.answered || exam.form !== "spell") return;
  const word = currentSessionWord();
  if (!word) return;
  const input = $("#exam-spell-input");
  const value = String(input?.value || "").trim();
  if (!value) {
    showToast("先写出德语单词再提交。");
    input?.focus();
    return;
  }
  const correct = REVIEW_ENGINE.spellingCorrect(value, exam.answer);
  resolveExamAnswer(correct, exam.answer, null);
}

function resolveExamAnswer(correct, correctLabel, chosen) {
  const exam = session?.exam;
  if (!exam || exam.answered) return;
  exam.answered = true;
  exam.chosen = chosen;
  const word = currentSessionWord();
  if (!word) return;
  if (correct) session.examStats.correct += 1;

  const previous = { ...reviewFor(word.id), word: word.word, translation: word.translation || "" };
  const next = session.mode === "repeat"
    ? null
    : REVIEW_ENGINE.review(previous, exam.form, correct);
  if (next) {
    state.reviews[word.id] = next;
    exam.next = next;
    exam.level = next.level;
    exam.reason = next.levelReason;
    state.activity[dayKey()] = (state.activity[dayKey()] || 0) + 1;
    state.stats.reviews = (Number(state.stats.reviews) || 0) + 1;
    if (correct) {
      state.stats.correct = (Number(state.stats.correct) || 0) + 1;
      delete state.mistakes[word.id];
      delete state.mistakeTypes[word.id];
    } else {
      state.mistakes[word.id] = (state.mistakes[word.id] || 0) + 1;
      state.mistakeTypes[word.id] = "review";
    }
  }
  session.ratings.push({ id: word.id, correct, score: correct ? 1 : 0 });
  session.done += 1;
  persist();

  if (exam.form !== "spell") {
    $$("[data-exam-option]").forEach((button, optionIndex) => {
      button.disabled = true;
      if (optionIndex === exam.correct) button.classList.add("is-correct");
      if (optionIndex === chosen && !correct) button.classList.add("is-wrong");
      if (optionIndex !== chosen && optionIndex !== exam.correct) button.classList.add("is-dimmed");
    });
  } else {
    const input = $("#exam-spell-input");
    if (input) input.disabled = true;
  }

  const result = $("#exam-result");
  result.classList.remove("hidden", "is-wrong");
  result.classList.toggle("is-wrong", !correct);
  $("#exam-result-icon").textContent = correct ? "✓" : "!";
  $("#exam-result-title").textContent = correct ? "Richtig." : "Noch nicht.";
  const wait = next ? formatReviewWait(REVIEW_ENGINE.intervalFor(next)) : "";
  const reason = next ? (LEVEL_REASON_LABEL[next.levelReason] || "") : "";
  const wrongHint = next && next.wrongStreak ? `；连错 ${next.wrongStreak}/2，再错降一级` : "";
  const spellingProtected = exam.form === "spell" && Number(exam.level) <= 3 && !correct;
  $("#exam-result-copy").textContent = next
    ? `${correct ? "答对了" : `正确答案是「${correctLabel}」`} · 掌握度 ${next.level}/5${reason ? `（${reason}）` : ""}，${wait}后重推${wrongHint}${spellingProtected ? "；前三级拼写错误不降级" : ""}。`
    : `${correct ? "答对了" : `正确答案是「${correctLabel}」`} · 今日回顾只记录对错，不改变长期复习安排。`;
  $("#exam-panel").classList.add("is-answered");
  const label = $("#mastery-next-label");
  if (label && next) label.textContent = `当前掌握度：${next.level}/5 · ${LEVEL_META[next.level].label.replace(/^\d+ · /, "")}`;
  const note = $("#mastery-next-note");
  if (note && next) note.textContent = `下次复习：${wait}后 · ${reason || "三形式实测中"}`;
  const downgrade = $("#downgrade-level");
  if (downgrade && next) downgrade.classList.toggle("hidden", next.userLevel <= 0);
  $("#exam-reveal").disabled = false;
  $("#exam-reveal").focus({ preventScroll: true });
}

function revealExamCard() {
  if (!session?.exam?.answered) return;
  session.phase = "card";
  $("#study-stage").classList.remove("exam-active");
  $("#exam-panel").classList.add("hidden");
  const flashcard = $("#flashcard");
  flashcard.classList.remove("is-entering");
  flashcard.classList.add("is-flipped");
  $("#view-study").classList.add("is-revealed");
}

function advanceStudy() {
  if (!session || session.finished || session.transitioning) return;
  if (session.phase === "exam") {
    if (!session.exam?.answered) return;
    revealExamCard();
    return;
  }
  if (!session.exam?.answered) return;
  session.transitioning = true;
  $("#view-study").classList.remove("is-revealed");
  $("#flashcard").classList.add("is-leaving");
  setTimeout(() => {
    if (!session) return;
    session.transitioning = false;
    session.index += 1;
    if (session.index >= session.queue.length) finishSession();
    else renderStudyCard();
  }, 240);
}

function flipCard() {
  if (!session || session.transitioning || session.finished) return;
  if (session.phase === "exam") return;
  const flashcard = $("#flashcard");
  if (flashcard.classList.contains("is-flipped")) return;
  flashcard.classList.remove("is-entering");
  flashcard.classList.add("is-flipped");
  $("#view-study").classList.add("is-revealed");
}

function downgradeCurrentWord() {
  if (!session || !REVIEW_ENGINE) return;
  const word = currentSessionWord();
  if (!word) return;
  const previous = reviewFor(word.id);
  if (!previous) {
    showToast("先完成首次掌握度自评，才能降低考察难度。");
    return;
  }
  const current = { ...REVIEW_ENGINE.normalize(previous), word: word.word, translation: word.translation || "" };
  if (current.userLevel <= 0) {
    showToast("已经是 0 级，不能再降低。");
    return;
  }
  const next = REVIEW_ENGINE.downgrade(current, current.userLevel - 1);
  state.reviews[word.id] = next;
  persist();
  showToast(`已降低到 ${next.userLevel} 级，下一次优先德译中。`);
  if (session.phase === "exam" && !session.exam?.answered) {
    beginExam(word);
  } else {
    const downgrade = $("#downgrade-level");
    if (downgrade) downgrade.classList.toggle("hidden", next.userLevel <= 0);
    const label = $("#mastery-next-label");
    if (label) label.textContent = `当前掌握度：${next.level}/5 · 自评 ${next.userLevel}/5`;
    const note = $("#mastery-next-note");
    if (note) note.textContent = "已降低考察上限；下一次优先安排最简单的德译中。";
  }
}

function rateCard(level) {
  if (!session || session.transitioning || session.finished) return;
  if (!session.firstEncounter || session.phase === "exam") return;
  if (!$("#view-study").classList.contains("is-revealed")) return;
  const value = Number(level);
  if (!Number.isInteger(value) || value < 0 || value > 5 || !REVIEW_ENGINE) return;
  const word = currentSessionWord();
  if (!word) return;

  session.transitioning = true;
  const next = REVIEW_ENGINE.setUserLevel({
    word: word.word,
    translation: word.translation || ""
  }, value);
  state.reviews[word.id] = next;
  state.activity[dayKey()] = (state.activity[dayKey()] || 0) + 1;
  state.stats.reviews = (Number(state.stats.reviews) || 0) + 1;
  if (value >= 3) {
    state.stats.correct = (Number(state.stats.correct) || 0) + 1;
    delete state.mistakes[word.id];
    delete state.mistakeTypes[word.id];
  } else {
    state.mistakes[word.id] = (state.mistakes[word.id] || 0) + 1;
    state.mistakeTypes[word.id] = "first-rating";
  }
  session.ratings.push({ id: word.id, correct: value >= 3, score: value / 5 });
  session.done += 1;
  persist();

  $("#session-done").textContent = session.done;
  $("#session-left").textContent = Math.max(0, session.queue.length - session.done);
  $("#study-progress-bar").style.width = `${(session.done / session.queue.length) * 100}%`;
  $("#view-study").classList.remove("is-revealed");
  $("#flashcard").classList.add("is-leaving");

  setTimeout(() => {
    if (!session) return;
    session.transitioning = false;
    session.index += 1;
    if (session.index >= session.queue.length) finishSession();
    else renderStudyCard();
  }, 240);
}

function finishSession() {
  if (!session || session.finished) return;
  session.finished = true;
  stopStudyTimer();
  if (session.mode === "repeat") logRepeatReview();
  const total = session.queue.length;
  const strong = session.ratings.filter(item => item.correct).length;
  const rate = total ? Math.round((strong / total) * 100) : 0;
  const elapsed = Date.now() - session.start;

  $("#study-stage").classList.add("hidden");
  const summary = $("#study-summary");
  summary.classList.remove("hidden");
  $("#summary-count").textContent = total;
  $("#summary-accuracy").textContent = `${rate}%`;
  $("#summary-time").textContent = formatClock(elapsed);
  $("#summary-title").textContent =
    rate >= 80 ? "Schön gemacht." : rate >= 55 ? "Weiter so." : "Jeder Anfang zählt.";
  $("#summary-copy").textContent =
    rate >= 80
      ? "你完成了这一组卡片，大部分词都稳稳地接住了。"
      : rate >= 55
        ? "这一组已经完成。记忆需要几次重逢，才能变成自己的东西。"
        : "你完成了这一组。觉得难的词会被安排更早再见，这就是进步。";

  launchConfetti();
  renderChrome();
  renderHome();
  renderStats();
  renderLibrary();
}

function launchConfetti() {
  const container = $("#confetti");
  if (!container) return;
  container.innerHTML = "";
  const colors = ["#c45c3b", "#173f32", "#bd9250", "#8ea28a", "#f4ded2"];
  for (let i = 0; i < 34; i += 1) {
    const piece = document.createElement("i");
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty("--duration", `${1.8 + Math.random() * 2.4}s`);
    piece.style.setProperty("--delay", `${Math.random() * 0.6}s`);
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(piece);
  }
  setTimeout(() => {
    if (container) container.innerHTML = "";
  }, 5000);
}

function exitStudy() {
  if (session && !session.finished && session.done > 0) {
    showToast("本轮学习已结束，进度已经保存。");
  }
  stopStudyTimer();
  session = null;
  $("#study-summary")?.classList.add("hidden");
  $("#study-stage")?.classList.remove("hidden");
  $("#view-study")?.classList.remove("is-revealed");
  navigate("home");
}

/* ─────────────────────────── Reading / phrases ─────────────────────────── */

const CEFR_ORDER = ["C2", "C1", "B2", "B1", "A2", "A1"];
const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

function normalizeCefrLevel(level) {
  const value = String(level || "").toUpperCase();
  if (CEFR_LEVELS.includes(value)) return value;
  if (/C1\s*\/\s*C2|C2/.test(value)) return "C2";
  if (/C1/.test(value)) return "C1";
  if (/B2/.test(value)) return "B2";
  if (/B1/.test(value)) return "B1";
  if (/A2/.test(value)) return "A2";
  return "A1";
}

function levelStats(level) {
  const key = normalizeCefrLevel(level);
  const raw = state.progressByLevel?.[key] || {};
  const correct = Math.max(0, Number(raw.correct) || 0);
  const total = Math.max(0, Number(raw.total) || 0);
  return { correct, total, accuracy: total ? Math.round((correct / total) * 100) : 0 };
}

function nextCefrLevel(level) {
  const index = CEFR_LEVELS.indexOf(normalizeCefrLevel(level));
  return index >= 0 && index < CEFR_LEVELS.length - 1 ? CEFR_LEVELS[index + 1] : "";
}

function recordLevelAnswer(level, isCorrect) {
  const key = normalizeCefrLevel(level);
  if (!state.progressByLevel || typeof state.progressByLevel !== "object") state.progressByLevel = {};
  const current = state.progressByLevel[key] || { correct: 0, total: 0 };
  state.progressByLevel[key] = {
    correct: (Number(current.correct) || 0) + (isCorrect ? 1 : 0),
    total: (Number(current.total) || 0) + 1
  };
}

function levelRecommendation(level) {
  const key = normalizeCefrLevel(level);
  const stats = levelStats(key);
  const next = nextCefrLevel(key);
  if (!next || stats.total < 10 || stats.accuracy <= 90) return "";
  return `你在 ${key} 的正确率是 ${stats.accuracy}%（${stats.correct}/${stats.total}），可以进入 ${next} 了。`;
}

function allPhrases() {
  return dedupeContent([...PHRASES, ...DEHELPER_PHRASES, ...(OCR_CONTENT.phrases || []), ...(state.customPhrases || [])], item => `${item.de || ""}|${item.zh || ""}`);
}

const PHRASE_DIFFICULTY_ORDER = ["A", "B", "C"];
const PHRASE_DIFFICULTY_META = {
  A: { label: "入门", hint: "短句 · 问候 / 礼貌 / 出行" },
  B: { label: "进阶", hint: "完整句 · 交流 / 日常 / 学习" },
  C: { label: "挑战", hint: "长句 · 从句 / 抽象表达" }
};
const phraseRecite = { open: false, difficulty: "A", index: 0, revealed: false, list: [] };

function phraseLevelScore(level) {
  const order = { A1: 0, A2: 1, B1: 2, B2: 3, C1: 4, C2: 5 };
  return order[String(level || "A1").toUpperCase()] ?? 1;
}

function phraseDifficultyScore(item) {
  const text = String(item.de || "");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  let score = phraseLevelScore(item.level) * 3 + words;
  if (/,/.test(text)) score += 1;
  if (/\b(weil|dass|wenn|ob|aber|denn|obwohl|damit|während|bevor|nachdem|als)\b/i.test(text)) score += 1;
  if (words >= 10) score += 1;
  return score;
}

function phraseDifficulty(item) {
  const score = phraseDifficultyScore(item);
  if (score <= 6) return "A";
  if (score <= 9) return "B";
  return "C";
}

function sortedPhraseLibrary() {
  return allPhrases()
    .map(item => ({
      ...item,
      difficulty: phraseDifficulty(item),
      difficultyScore: phraseDifficultyScore(item)
    }))
    .sort((a, b) =>
      PHRASE_DIFFICULTY_ORDER.indexOf(a.difficulty) - PHRASE_DIFFICULTY_ORDER.indexOf(b.difficulty) ||
      a.difficultyScore - b.difficultyScore ||
      String(a.de || "").localeCompare(String(b.de || ""), "de")
    );
}

function recitePhraseList(difficulty = "A") {
  const seen = new Set();
  return sortedPhraseLibrary()
    .filter(item => item.difficulty === difficulty)
    .filter(item => {
      const key = foldSearch(String(item.de || "").trim());
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function renderPhraseReciteHome() {
  $$("[data-phrase-count]").forEach(el => {
    const difficulty = el.dataset.phraseCount;
    el.textContent = `${recitePhraseList(difficulty).length} 条`;
  });
}

function openPhraseRecite(difficulty = "A") {
  const layer = $("#phrase-recite-modal");
  if (!layer) return;
  phraseRecite.difficulty = PHRASE_DIFFICULTY_ORDER.includes(difficulty) ? difficulty : "A";
  phraseRecite.list = recitePhraseList(phraseRecite.difficulty);
  phraseRecite.index = 0;
  phraseRecite.revealed = false;
  phraseRecite.open = true;
  layer.hidden = false;
  layer.setAttribute("aria-hidden", "false");
  document.body.classList.add("phrase-recite-open");
  renderPhraseRecite();
}

function closePhraseRecite() {
  const layer = $("#phrase-recite-modal");
  if (!layer) return;
  phraseRecite.open = false;
  layer.hidden = true;
  layer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("phrase-recite-open");
}

function setPhraseReciteDifficulty(difficulty) {
  if (!PHRASE_DIFFICULTY_ORDER.includes(difficulty)) return;
  phraseRecite.difficulty = difficulty;
  phraseRecite.list = recitePhraseList(difficulty);
  phraseRecite.index = 0;
  phraseRecite.revealed = false;
  renderPhraseRecite();
}

function renderPhraseRecite() {
  const item = phraseRecite.list[phraseRecite.index];
  const meta = PHRASE_DIFFICULTY_META[phraseRecite.difficulty];
  const level = $("#phrase-recite-level");
  if (level) level.textContent = `${phraseRecite.difficulty} · ${meta.label}`;
  $$("#phrase-recite-modal [data-phrase-recite]").forEach(button => {
    button.classList.toggle("is-active", button.dataset.phraseRecite === phraseRecite.difficulty);
  });
  const progress = $("#phrase-recite-progress");
  if (progress) progress.textContent = phraseRecite.list.length ? `${phraseRecite.index + 1} / ${phraseRecite.list.length}` : "0 / 0";
  const bar = $("#phrase-recite-bar");
  if (bar) bar.style.width = phraseRecite.list.length ? `${((phraseRecite.index + 1) / phraseRecite.list.length) * 100}%` : "0%";
  if (!item) {
    if ($("#phrase-recite-de")) $("#phrase-recite-de").textContent = "这个难度还没有短语。";
    if ($("#phrase-recite-zh")) $("#phrase-recite-zh").textContent = "";
    if ($("#phrase-recite-answer")) $("#phrase-recite-answer").hidden = true;
    return;
  }
  if ($("#phrase-recite-category")) {
    $("#phrase-recite-category").textContent = [item.level, item.category].filter(Boolean).join(" · ");
  }
  if ($("#phrase-recite-de")) $("#phrase-recite-de").textContent = item.de;
  if ($("#phrase-recite-zh")) $("#phrase-recite-zh").textContent = item.zh;
  if ($("#phrase-recite-example")) {
    $("#phrase-recite-example").textContent = item.example
      ? `${item.example}${item.exampleZh ? ` — ${item.exampleZh}` : ""}`
      : "";
    $("#phrase-recite-example").hidden = !item.example;
  }
  if ($("#phrase-recite-answer")) $("#phrase-recite-answer").hidden = !phraseRecite.revealed;
  if ($("#phrase-recite-reveal")) $("#phrase-recite-reveal").textContent = phraseRecite.revealed ? "隐藏中文" : "显示中文";
}

function movePhraseRecite(delta) {
  if (!phraseRecite.list.length) return;
  phraseRecite.index = (phraseRecite.index + delta + phraseRecite.list.length) % phraseRecite.list.length;
  phraseRecite.revealed = false;
  renderPhraseRecite();
}

function togglePhraseReciteAnswer() {
  phraseRecite.revealed = !phraseRecite.revealed;
  renderPhraseRecite();
}

function shufflePhraseRecite() {
  if (!phraseRecite.list.length) return;
  if (phraseRecite.list.length > 1) {
    let next = phraseRecite.index;
    while (next === phraseRecite.index) next = Math.floor(Math.random() * phraseRecite.list.length);
    phraseRecite.index = next;
  }
  phraseRecite.revealed = false;
  renderPhraseRecite();
}

const wordRecite = {
  open: false,
  mode: "group",
  index: 0,
  revealed: false,
  list: [],
  groupList: [],
  groupTotal: 0,
  total: 0
};

const WORD_RECITE_LIMIT = 200;

function sortReciteWords(words) {
  return words.slice().sort((a, b) =>
    CEFR_ORDER.indexOf(a.level) - CEFR_ORDER.indexOf(b.level) ||
    String(a.word || "").localeCompare(String(b.word || ""), "de")
  );
}

function openWordRecite() {
  const all = sortReciteWords(filteredWords());
  if (!all.length) {
    showToast("当前筛选没有可背诵的单词。");
    return;
  }
  const activeStatus = libraryFilters.status;
  wordRecite.groupTotal = all.length;
  wordRecite.groupList = all.slice(0, WORD_RECITE_LIMIT);
  wordRecite.mode = activeStatus === "all" ? "group" : activeStatus;
  if (wordRecite.mode === "group") {
    wordRecite.list = wordRecite.groupList;
    wordRecite.total = wordRecite.groupTotal;
  } else {
    const pool = sortReciteWords(allWords().filter(word => masteryFor(word) === wordRecite.mode));
    wordRecite.list = pool.slice(0, WORD_RECITE_LIMIT);
    wordRecite.total = pool.length;
  }
  wordRecite.index = 0;
  wordRecite.revealed = false;
  wordRecite.open = true;
  const layer = $("#word-recite-modal");
  if (!layer) return;
  layer.hidden = false;
  layer.setAttribute("aria-hidden", "false");
  document.body.classList.add("phrase-recite-open");
  renderWordRecite();
}

function closeWordRecite() {
  const layer = $("#word-recite-modal");
  if (!layer) return;
  wordRecite.open = false;
  layer.hidden = true;
  layer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("phrase-recite-open");
}

function setWordReciteMode(mode) {
  if (mode === "group") {
    wordRecite.mode = "group";
    wordRecite.list = wordRecite.groupList;
    wordRecite.total = wordRecite.groupTotal;
  } else {
    const pool = sortReciteWords(allWords().filter(word => masteryFor(word) === mode));
    wordRecite.mode = mode;
    wordRecite.list = pool.slice(0, WORD_RECITE_LIMIT);
    wordRecite.total = pool.length;
  }
  wordRecite.index = 0;
  wordRecite.revealed = false;
  renderWordRecite();
}

function renderWordRecite() {
  const item = wordRecite.list[wordRecite.index];
  const meta = item ? MASTERY_META[wordRecite.mode] : null;
  const label = $("#word-recite-label");
  if (label) {
    const shown = wordRecite.total > wordRecite.list.length
      ? `${wordRecite.list.length} / ${wordRecite.total}`
      : `${wordRecite.list.length}`;
    label.textContent = wordRecite.mode === "group"
      ? `本组 · ${shown} 词`
      : `${meta ? meta.label : wordRecite.mode} · ${shown} 词`;
  }
  $$("#word-recite-modal [data-word-recite-status]").forEach(button => {
    button.classList.toggle("is-active", button.dataset.wordReciteStatus === wordRecite.mode);
  });
  const progress = $("#word-recite-progress");
  if (progress) progress.textContent = wordRecite.list.length ? `${wordRecite.index + 1} / ${wordRecite.list.length}` : "0 / 0";
  const bar = $("#word-recite-bar");
  if (bar) bar.style.width = wordRecite.list.length ? `${((wordRecite.index + 1) / wordRecite.list.length) * 100}%` : "0%";
  if (!item) {
    if ($("#word-recite-de")) $("#word-recite-de").textContent = "这一组还没有单词。";
    if ($("#word-recite-answer")) $("#word-recite-answer").hidden = true;
    return;
  }
  if ($("#word-recite-meta")) {
    $("#word-recite-meta").textContent = [item.level, item.finePos || item.pos || "词"].filter(Boolean).join(" · ");
  }
  if ($("#word-recite-article")) {
    $("#word-recite-article").textContent = item.article || "·";
    $("#word-recite-article").dataset.art = item.article || "none";
  }
  if ($("#word-recite-de")) $("#word-recite-de").textContent = item.word;
  if ($("#word-recite-zh")) $("#word-recite-zh").textContent = item.translation || "释义待补充";
  if ($("#word-recite-morph")) $("#word-recite-morph").textContent = morphLine(item);
  if ($("#word-recite-example")) {
    $("#word-recite-example").textContent = item.example
      ? `${item.example}${item.exampleZh ? ` — ${item.exampleZh}` : ""}`
      : "";
    $("#word-recite-example").hidden = !item.example;
  }
  if ($("#word-recite-answer")) $("#word-recite-answer").hidden = !wordRecite.revealed;
  if ($("#word-recite-reveal")) $("#word-recite-reveal").textContent = wordRecite.revealed ? "隐藏释义" : "显示释义";
}

function moveWordRecite(delta) {
  if (!wordRecite.list.length) return;
  wordRecite.index = (wordRecite.index + delta + wordRecite.list.length) % wordRecite.list.length;
  wordRecite.revealed = false;
  renderWordRecite();
}

function toggleWordReciteAnswer() {
  wordRecite.revealed = !wordRecite.revealed;
  renderWordRecite();
}

function shuffleWordRecite() {
  if (!wordRecite.list.length) return;
  if (wordRecite.list.length > 1) {
    let next = wordRecite.index;
    while (next === wordRecite.index) next = Math.floor(Math.random() * wordRecite.list.length);
    wordRecite.index = next;
  }
  wordRecite.revealed = false;
  renderWordRecite();
}

function allArticles() {
  return dedupeContent([...ARTICLES, ...(OCR_CONTENT.articles || []), ...(state.customArticles || [])], item => item.id || String(item.contentDe || "").slice(0, 180));
}

function articleLevelMap() {
  const map = new Map();
  for (const word of allWords()) {
    const levels = Array.isArray(word.levels) ? word.levels : [word.level || "A1"];
    const level = [...levels].sort((a, b) => CEFR_ORDER.indexOf(a) - CEFR_ORDER.indexOf(b))[0] || "A1";
    const keys = new Set([word.word, word.de, ...(word.forms ? String(word.forms).split(/[,;，；]/) : [])]);
    for (const key of keys) {
      const normalized = foldSearch(String(key || "").replace(/^(der|die|das|sich)\s+/i, ""));
      if (normalized && !map.has(normalized)) map.set(normalized, level);
    }
  }
  return map;
}

function gradeArticle(article) {
  const tokens = String(article.contentDe || "").match(/[A-Za-zÄÖÜäöüß-]{2,}/g) || [];
  const map = articleLevelMap();
  const counts = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 };
  let recognized = 0;
  for (const raw of tokens) {
    const token = foldSearch(raw);
    let level = map.get(token);
    if (!level && token.length > 5) {
      for (const suffix of ["ungen", "ung", "en", "er", "e", "n", "s", "t"]) {
        if (token.endsWith(suffix) && map.has(token.slice(0, -suffix.length))) {
          level = map.get(token.slice(0, -suffix.length));
          break;
        }
      }
    }
    if (!level) continue;
    counts[level] = (counts[level] || 0) + 1;
    recognized += 1;
  }
  const shares = {};
  for (const level of Object.keys(counts)) shares[level] = recognized ? counts[level] / recognized : 0;
  const CEFR_THRESHOLD = 0.1;
  let level = "A1";
  let matchedShare = 0;
  for (const candidate of CEFR_ORDER) {
    if ((shares[candidate] || 0) > CEFR_THRESHOLD) {
      level = candidate;
      matchedShare = shares[candidate];
      break;
    }
  }
  if (!recognized && article.levelHint) {
    level = article.levelHint;
    matchedShare = 0;
  }
  return { level, shares, recognized, total: tokens.length, unknown: tokens.length - recognized, matchedShare, threshold: CEFR_THRESHOLD };
}

function renderReading() {
  const list = $("#reading-list");
  const reader = $("#article-reader");
  if (!list) return;
  reader?.classList.add("hidden");
  list.classList.remove("hidden");
  $("#view-reading .page-heading")?.classList.remove("hidden");
  const all = allArticles();
  $("#reading-count").textContent = all.length;
  const readCount = Array.isArray(state.readArticles) ? state.readArticles.length : 0;
  const readLabel = $("#reading-read");
  if (readLabel) readLabel.textContent = `已读 ${readCount} 篇 · CEFR 自动分级`;
  $$("#reading-level-filter [data-reading-level]").forEach(chip => {
    chip.classList.toggle("is-active", chip.dataset.readingLevel === readingLevel);
  });
  const readingSearch = $("#reading-search");
  if (readingSearch && document.activeElement !== readingSearch) readingSearch.value = readingQuery;
  const query = foldSearch(readingQuery.trim());
  const articles = all.slice().reverse().filter(article => {
    if (readingLevel !== "all" && gradeArticle(article).level !== readingLevel) return false;
    if (!query) return true;
    return foldSearch([article.titleDe, article.titleZh, article.summaryZh, article.source, ...(article.tags || [])].join(" ")).includes(query);
  });
  if (!articles.length) {
    list.innerHTML = `<div class="library-empty"><h3>没有匹配的文章</h3><p>试试更短的关键词，或切换 CEFR 等级。</p></div>`;
    return;
  }
  list.innerHTML = articles.map(article => {
    const grade = gradeArticle(article);
    const isRead = Array.isArray(state.readArticles) && state.readArticles.includes(article.id);
    return `
      <button class="reading-card ${isRead ? "is-read" : ""}" data-article-id="${esc(article.id)}">
        <div class="reading-card-top">
          <span class="level-chip">${esc(grade.level)}</span>
          <span>${esc(article.tags?.join(" · ") || "Lesetext")}${isRead ? " · 已读" : ""}</span>
        </div>
        <h2>${esc(article.titleDe)}</h2>
        <p class="reading-title-zh">${esc(article.titleZh)}</p>
        <p>${esc(article.summaryZh || "")}</p>
        <div class="reading-card-foot"><span>${esc(article.source)}</span><span>${article.contentDe.split(/\s+/).length} 词</span></div>
      </button>
    `;
  }).join("");
}

function markArticleRead(id) {
  if (!Array.isArray(state.readArticles)) state.readArticles = [];
  if (state.readArticles.includes(id)) return;
  state.readArticles.push(id);
  persist();
  const readLabel = $("#reading-read");
  if (readLabel) readLabel.textContent = `已读 ${state.readArticles.length} 篇 · CEFR 自动分级`;
}

function openArticle(id) {
  const article = allArticles().find(item => item.id === id);
  if (!article) return;
  readingArticleId = id;
  markArticleRead(id);
  const grade = gradeArticle(article);
  $("#reading-list")?.classList.add("hidden");
  $("#view-reading .page-heading")?.classList.add("hidden");
  const reader = $("#article-reader");
  if (!reader) return;
  reader.classList.remove("hidden");
  $("#article-level").textContent = grade.level;
  const dominant = Math.round((grade.shares[grade.level] || 0) * 100);
  $("#article-kicker").textContent = `LESETEXT · ${grade.level} · ${dominant}% ${grade.level}-Wortanteil`;
  $("#article-title").textContent = article.titleDe;
  $("#article-subtitle").textContent = `${article.titleZh} · ${article.tags?.join(" · ") || ""}`;
  $("#article-meta").innerHTML = `<span>${esc(article.source)}</span><span>${article.contentDe.split(/\s+/).length} 词</span><span>${Math.round(grade.recognized / Math.max(1, grade.total) * 100)}% 词表覆盖</span><span>${grade.total - grade.recognized} 个词未收录</span>`;
  const translationHtml = ARTICLE_TRANSLATIONS[article.id]
    ? `<section class="article-translation">
         <div class="article-translation-head"><strong>AI 中文译文</strong><span>仅供学习参考</span></div>
         ${ARTICLE_TRANSLATIONS[article.id].split(/\n\n+/).map(paragraph => `<p>${esc(paragraph)}</p>`).join("")}
       </section>`
    : "";
  $("#article-body").innerHTML = article.contentDe.split(/\n\n+/).map(paragraph => `<p>${esc(paragraph)}</p>`).join("") + translationHtml;
  $$("#article-reader .article-quiz-row").forEach(row => row.remove());
  $("#article-source").innerHTML = article.sourceUrl
    ? `<strong>来源 / 出处</strong> <a href="${esc(article.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(article.source)}</a>`
    : `<strong>来源 / 出处</strong> ${esc(article.source)}`;
  const questions = ARTICLE_QUESTIONS[article.id] || [];
  const quizButton = questions.length
    ? `<div class="article-quiz-row"><button class="btn btn-primary" data-action="article-quiz" data-article-id="${esc(article.id)}">读后练习 · ${questions.length} 题</button></div>`
    : "";
  $("#article-body").insertAdjacentHTML("afterend", quizButton);
  try {
    history.replaceState(null, "", `#artikel/${encodeURIComponent(article.id)}`);
  } catch {
    /* file:// or embedded webview may reject history changes */
  }
  window.scrollTo({ top: 0, behavior: "auto" });
}

function articleFromHash() {
  const match = String(location.hash || "").match(/^#artikel\/(.+)$/);
  if (!match) return "";
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return "";
  }
}

function renderPhrases() {
  const grid = $("#phrase-grid");
  if (!grid) return;
  $("#phrase-count").textContent = allPhrases().length;
  const query = foldSearch(phraseQuery.trim());
  const items = sortedPhraseLibrary().filter(item => {
    if (!query) return true;
    return foldSearch([item.de, item.zh, item.example, item.exampleZh, item.category].join(" ")).includes(query);
  });
  grid.innerHTML = items.length ? items.map(item => `
    <article class="phrase-card">
      <div class="phrase-head"><span class="level-chip">${esc(item.level)}</span><span class="phrase-difficulty-chip diff-${esc(item.difficulty)}">${esc(item.difficulty)}</span><span class="phrase-scene">${esc(item.category)}</span></div>
      <h2>${esc(item.de)}</h2>
      <p class="phrase-zh">${esc(item.zh)}</p>
      ${item.example
        ? `<blockquote><p>${esc(item.example)}</p><footer>${esc(item.exampleZh)}</footer></blockquote>`
        : `<blockquote class="is-empty"><p>例句待补充</p></blockquote>`}
      <small>${esc(item.source)}</small>
    </article>
  `).join("") : `<div class="library-empty"><h3>没有匹配的短语</h3><p>换一个关键词试试。</p></div>`;
}

function phraseQuestionBank(category = "all", level = "all", type = "mixed") {
  const pool = allPhrases().filter(item => (category === "all" || category === "phrases") && (level === "all" || item.level === level));
  return pool.slice(0, 12).map((item, index) => {
    const mode = type === "zh-de" || (type === "mixed" && index % 2) ? "zh-de" : "de-zh";
    const others = shuffle(allPhrases().filter(other => other.id !== item.id)).slice(0, 3);
    const options = shuffle([item, ...others]).map(other => ({ text: mode === "zh-de" ? other.de : other.zh, correct: other.id === item.id }));
    return {
      mode,
      word: { id: item.id, word: mode === "zh-de" ? item.zh : item.de, translation: mode === "zh-de" ? item.de : item.zh, level: item.level, article: "" },
      options,
      correctIndex: options.findIndex(option => option.correct),
      explanation: `${item.de} — ${item.zh}。例：${item.example}`
    };
  });
}

function articleQuestionBank(level = "all") {
  const articles = allArticles();
  return articles
    .filter(article => level === "all" || gradeArticle(article).level === level)
    .flatMap(article => {
      const specific = ARTICLE_QUESTIONS[article.id] || [];
      if (specific.length) {
        return specific.map((question, index) => {
          const options = shuffle(question.options.map((text, optionIndex) => ({ text, correct: optionIndex === question.answer })));
          return {
            mode: "de-zh",
            word: { id: `${article.id}-q${index}`, word: question.q, translation: question.options[question.answer], level: gradeArticle(article).level, article: "" },
            options,
            correctIndex: options.findIndex(option => option.correct),
            explanation: question.explain
          };
        });
      }
      // 没有手工题的文章自动生成一道主旨题，保证每篇文章都能进入题库。
      const distractors = shuffle(articles.filter(other => other.id !== article.id && other.titleZh))
        .slice(0, 3)
        .map(other => other.titleZh);
      const options = shuffle([article.titleZh, ...distractors].map(text => ({ text, correct: text === article.titleZh })));
      return [{
        mode: "de-zh",
        word: { id: `${article.id}-auto`, word: article.titleDe, translation: article.titleZh, level: gradeArticle(article).level, article: "" },
        options,
        correctIndex: options.findIndex(option => option.correct),
        explanation: `《${article.titleDe}》的主题是「${article.titleZh}」。${article.summaryZh || ""}`
      }];
    });
}

function grammarQuestionBank(level = "all", type = "mixed") {
  const topics = (typeof GRAMMAR_TOPICS !== "undefined" ? GRAMMAR_TOPICS : [])
    .filter(topic => level === "all" || topic.level === level);
  const questions = topics.flatMap(topic => (topic.exercises || []).map((exercise, index) => {
    const options = shuffle(exercise.options.map((text, optionIndex) => ({ text, correct: optionIndex === exercise.answer })));
    return {
      mode: "de-zh",
      word: { id: `${topic.id}-ex${index}`, word: exercise.q, translation: exercise.options[exercise.answer], level: topic.level, article: "" },
      options,
      correctIndex: options.findIndex(option => option.correct),
      explanation: exercise.explain
    };
  }));
  // OCR 语法卡没有手写练习时，自动生成“标题—说明”匹配题。
  const ocrCards = (OCR_CONTENT.grammar || []).filter(card => level === "all" || (card.level || "B1") === level);
  for (const card of ocrCards) {
    const others = shuffle((OCR_CONTENT.grammar || []).filter(other => other.id !== card.id && other.summary)).slice(0, 3);
    if (!card.summary || others.length < 3) continue;
    const options = shuffle([card, ...others].map(item => ({ text: item.summary, correct: item.id === card.id })));
    questions.push({
      mode: "de-zh",
      word: { id: `${card.id}-auto`, word: card.title, translation: card.summary, level: card.level || "B1", article: "" },
      options,
      correctIndex: options.findIndex(option => option.correct),
      explanation: `${card.title}：${card.summary}`
    });
  }
  return questions;
}



function currentStatus(word) {
  return masteryFor(word);
}

function filteredWords() {
  const query = libraryFilters.query.trim();
  let words = allWords()
    .map(word => {
      if (libraryFilters.level !== "all" && word.level !== libraryFilters.level) return null;
      if (libraryFilters.status !== "all" && currentStatus(word) !== libraryFilters.status) return null;
      if (libraryFilters.pos !== "all" && (word.finePos || "other") !== libraryFilters.pos) return null;
      if (libraryFilters.article !== "all" && (word.article || "none") !== libraryFilters.article) return null;
      const score = query ? scoreWordSearch(word, query) : 1;
      if (!score) return null;
      return { word, score };
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (query) return b.score - a.score || a.word.word.localeCompare(b.word.word, "de");
      const levelOrder = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };
      const articleOrder = { der: 1, die: 2, das: 3, none: 4 };
      return (levelOrder[a.word.level] || 9) - (levelOrder[b.word.level] || 9)
        || (articleOrder[a.word.article || "none"] || 9) - (articleOrder[b.word.article || "none"] || 9)
        || a.word.word.localeCompare(b.word.word, "de");
    })
    .map(item => item.word);

  if (libraryFilters.sort === "level") {
    const order = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };
    words = words.slice().sort((a, b) => (order[a.level] || 9) - (order[b.level] || 9) || a.word.localeCompare(b.word, "de"));
  } else if (libraryFilters.sort === "due") {
    words = words.slice().sort((a, b) => {
      const ra = reviewFor(a.id);
      const rb = reviewFor(b.id);
      if (!ra && !rb) return 0;
      if (!ra) return 1;
      if (!rb) return -1;
      return (ra.due || 0) - (rb.due || 0);
    });
  }

  return words;
}

function renderLevelProgress() {
  const container = $("#level-progress");
  if (!container) return;
  const active = libraryFilters.level;
  const rows = CEFR_LEVELS.map(level => {
    const stats = levelStats(level);
    const isActive = active === level;
    return `
      <button class="level-progress-row ${isActive ? "is-active" : ""}" data-progress-level="${level}" aria-label="查看 ${level} 单词">
        <span class="level-progress-name">${level}</span>
        <span class="level-progress-bar"><i style="width:${stats.total ? stats.accuracy : 0}%"></i></span>
        <span class="level-progress-value">${stats.total ? `${stats.accuracy}%` : "—"}</span>
        <small>${stats.total} 题</small>
      </button>
    `;
  }).join("");
  const recommendations = CEFR_LEVELS.map(levelRecommendation).filter(Boolean);
  container.innerHTML = `
    <div class="level-progress-head">
      <div><strong>难度进阶</strong><span>作答正确率按等级独立记录；同一等级超过 90% 自动推荐下一级。</span></div>
      <span class="level-progress-tip">${active === "all" ? "选择等级后可直接背诵" : `当前筛选：${active}`}</span>
    </div>
    <div class="level-progress-grid">${rows}</div>
    ${recommendations.length ? `<p class="level-recommend">${icon("spark")} ${esc(recommendations[0])}</p>` : `<p class="level-recommend is-muted">先完成至少 10 题，系统会在这里给出进阶建议。</p>`}
  `;
}

function renderLibrary() {
  const metrics = getMetrics();
  const totalEl = $("#library-total");
  if (totalEl) totalEl.textContent = metrics.total;
  $("#library-unmastered").textContent = metrics.unmastered;
  $("#library-forgotten").textContent = metrics.forgotten;
  $("#library-shaky").textContent = metrics.shaky;
  $("#library-mastered").textContent = metrics.mastered;
  $$("[data-library-status]").forEach(button => {
    button.classList.toggle("is-active", button.dataset.libraryStatus === libraryFilters.status);
  });
  renderLevelProgress();

  const searchInput = $("#library-search");
  if (searchInput && document.activeElement !== searchInput) searchInput.value = libraryFilters.query;

  $$("#level-filter .chip").forEach(chip => {
    chip.classList.toggle("is-active", chip.dataset.level === libraryFilters.level);
  });
  $$("#article-filter .chip").forEach(chip => {
    chip.classList.toggle("is-active", chip.dataset.article === libraryFilters.article);
  });
  const statusFilter = $("#status-filter");
  if (statusFilter) statusFilter.value = libraryFilters.status;
  const posFilter = $("#pos-filter");
  if (posFilter) posFilter.value = libraryFilters.pos;
  const sortFilter = $("#sort-filter");
  if (sortFilter) sortFilter.value = libraryFilters.sort;

  const allFiltered = filteredWords();
  const articleNames = { all: "全部冠词", der: "der 阳性", die: "die 阴性", das: "das 中性", none: "其他" };
  const articleCounts = { all: allFiltered.length, der: 0, die: 0, das: 0, none: 0 };
  for (const word of allFiltered) articleCounts[word.article || "none"] += 1;
  $$("#article-filter .chip").forEach(chip => {
    const key = chip.dataset.article || "all";
    chip.textContent = `${articleNames[key] || key} ${articleCounts[key] || 0}`;
  });
  const groups = [];
  const groupIndex = new Map();
  for (const word of allFiltered) {
    const key = `${word.level || "?"}|${word.article || "none"}`;
    let group = groupIndex.get(key);
    if (!group) {
      group = { key, level: word.level, article: word.article || "none", words: [] };
      groupIndex.set(key, group); groups.push(group);
    }
    group.words.push(word);
  }
  const groupCap = Math.max(4, Math.floor(libraryVisibleLimit / Math.max(1, groups.length)));
  const words = groups.flatMap(group => group.words.slice(0, groupCap));
  const body = $("#library-body");
  const empty = $("#library-empty");
  $("#library-count").textContent = `显示 ${words.length} / ${allFiltered.length} 个词`;
  const moreButton = $("#library-more");
  if (moreButton) moreButton.hidden = words.length >= allFiltered.length;
  const homeLink = $("#home-library-link");
  if (homeLink) homeLink.innerHTML = `查看全部 ${metrics.total} 词 ${icon("arrow-right")}`;
  const packCount = state.customWords.filter(word => word.pack).length;
  const customCount = state.customWords.length - packCount;
  const textbookCount = TEXTBOOK_WORDS.length;
  const goetheCount = GOETHE_WORDS.length;
  $("#library-subline").textContent = textbookCount
    ? `${metrics.total} 个德语词，包含 ${textbookCount} 个《新求精》教材词条${goetheCount ? `，${goetheCount} 个歌德分级词表词条` : ""}${packCount ? `，${packCount} 个手动导入词条` : ""}${customCount ? `，${customCount} 个自定义收藏` : ""}。`
    : goetheCount
      ? `${metrics.total} 个德语词，其中 ${goetheCount} 个来自歌德分级词表${customCount ? `，${customCount} 个自定义收藏` : ""}。`
      : `${metrics.total} 个精心挑选的德语词，加上你自己添加的收藏。`;
  $("#library-subline").textContent += " 词性、变形或例句缺失的词条会标为“待补充”，后续批次继续补齐。";

  if (!words.length) {
    body.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  let lastGroup = "";
  body.innerHTML = words.map(word => {
    const status = currentStatus(word);
    const statusMeta = STATUS_META[status] || STATUS_META.unmastered;
    const review = reviewFor(word.id);
    const dueText = !review ? "—" : formatDue(review.due);
    const favorite = state.favorites.includes(word.id);
    const groupKey = `${word.level}|${word.article || "none"}`;
    const groupRow = groupKey !== lastGroup
      ? `<tr class="word-group-row"><td colspan="7"><span class="word-group-label"><i></i>${esc(word.level)} · ${esc(word.article || "其他")} <small>${(groups.find(g => g.key === groupKey)?.words.length || 0)} 词</small></span></td></tr>`
      : "";
    lastGroup = groupKey;
    return groupRow + `
      <tr data-word-row="${esc(word.id)}">
        <td data-label="单词">
          <span class="word-cell">
            <span class="article" data-art="${esc(word.article || "none")}">${esc(word.article || "·")}</span>
            <strong>${esc(word.word)}</strong>
            ${favorite ? `<span title="已收藏" style="color:var(--amber)">${icon("star")}</span>` : ""}
          </span>
        </td>
        <td class="translation-cell" data-label="释义">${esc(word.translation)}</td>
        <td class="morph-cell" data-label="词性 / 复数" title="${esc(morphLine(word))}">${esc(morphLine(word))}</td>
        <td data-label="等级"><span class="level-chip">${esc(word.level)}</span></td>
        <td data-label="状态"><span class="status-badge ${statusMeta.cls}"><i></i>${statusMeta.label}</span></td>
        <td class="due-cell ${status === "due" ? "is-due" : ""}" data-label="下次复习">${esc(dueText)}</td>
        <td><button class="row-action" aria-label="查看 ${esc(word.word)}">${icon("arrow-right")}</button></td>
      </tr>
    `;
  }).join("");
}

/* ─────────────────────────── Stats render ─────────────────────────── */

function renderStats() {
  const metrics = getMetrics();
  $("#stats-total").textContent = metrics.total;
  $("#stats-mastered").textContent = metrics.mastered;
  $("#stats-reviews").textContent = metrics.totalReviews;
  $("#stats-accuracy").innerHTML = `${metrics.accuracy}<sup>%</sup>`;
  $("#stats-streak").textContent = metrics.streak;

  const percent = metrics.total ? Math.round((metrics.mastered / metrics.total) * 100) : 0;
  $("#mastery-percent").textContent = `${percent}%`;
  $("#mastery-ring").style.strokeDashoffset = String(RING_LARGE * (1 - percent / 100));
  $("#mastery-total-pill").textContent = `${metrics.total} Wörter`;
  $("#legend-mastered").textContent = metrics.mastered;
  $("#legend-shaky").textContent = metrics.shaky;
  $("#legend-forgotten").textContent = metrics.forgotten;
  $("#legend-unmastered").textContent = metrics.unmastered;
  $("#legend-due").textContent = metrics.dueToday.length;

  const levelOrder = ["A1", "A2", "B1", "B2", "C1"];
  $("#mastery-levels").innerHTML = levelOrder.map(level => {
    const levelWords = metrics.words.filter(word => word.level === level);
    const mastered = levelWords.filter(word => statusFor(word) === "mastered").length;
    const percent = levelWords.length ? Math.round((mastered / levelWords.length) * 100) : 0;
    return `
      <div class="mastery-level-row">
        <span>${level}</span>
        <span class="mastery-level-track"><i style="width:${percent}%"></i></span>
        <span>${mastered} / ${levelWords.length}</span>
      </div>
    `;
  }).join("");

  renderForecast(metrics);
  renderCalendar();
  renderHeatmap();
  renderDifficult(metrics);
  renderChrome();
}

function renderForecast() {
  const container = $("#forecast-chart");
  if (!container) return;
  const words = allWords();
  const todayStart = startOfDay().getTime();
  const entries = [];
  for (let offset = 0; offset < 7; offset += 1) {
    const ts = todayStart + offset * DAY_MS;
    let count;
    if (offset === 0) {
      count = words.filter(word => isDue(word, ts + 12 * HOUR_MS)).length;
    } else {
      count = words.filter(word => {
        const review = reviewFor(word.id);
        return review?.due && dayKey(review.due) === dayKey(ts);
      }).length;
    }
    entries.push({ ts, count });
  }
  const max = Math.max(1, ...entries.map(entry => entry.count));
  const peak = entries.reduce((best, entry) => (entry.count > best.count ? entry : best), entries[0]);
  container.innerHTML = entries.map((entry, index) => {
    const d = new Date(entry.ts);
    const height = Math.max(3, Math.round((entry.count / max) * 100));
    return `
      <div class="forecast-bar ${index === 0 ? "is-today" : ""} ${entry === peak && entry.count > 0 ? "is-peak" : ""}">
        <span class="forecast-value">${entry.count || ""}</span>
        <span class="forecast-track"><i class="forecast-fill" style="height:${height}%"></i></span>
        <span class="forecast-day">${index === 0 ? "今天" : `周${WEEKDAYS_ZH[d.getDay()]}`}</span>
      </div>
    `;
  }).join("");

  $("#forecast-note").textContent = peak.count > 0
    ? `${peak.count === 1 ? "最近" : "峰值"}在${peak === entries[0] ? "今天" : `周${WEEKDAYS_ZH[new Date(peak.ts).getDay()]}`}，共 ${peak.count} 张。提前一点复习，会更轻松。`
    : "未来一周没有到期卡片。可以安心认识新词。";
}

function renderCalendar() {
  const grid = $("#calendar-grid");
  if (!grid) return;
  const year = calendarCursor.getFullYear();
  const month = calendarCursor.getMonth();
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - offset);
  const todayKey = dayKey();
  const dueByDay = new Map();
  for (const word of allWords()) {
    const review = reviewFor(word.id);
    const due = review?.due ?? review?.nextReviewDate;
    if (!due) continue;
    const key = dayKey(due);
    dueByDay.set(key, (dueByDay.get(key) || 0) + 1);
  }

  $("#calendar-month").textContent = `${year} 年 ${month + 1} 月`;
  const cells = [];
  for (let index = 0; index < 42; index += 1) {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index);
    const key = dayKey(date.getTime());
    const count = dueByDay.get(key) || 0;
    cells.push(`
      <div class="calendar-day ${date.getMonth() !== month ? "is-outside" : ""} ${key === todayKey ? "is-today" : ""} ${count ? "has-due" : ""}" title="${key}${count ? ` · ${count} 个词到期` : ""}">
        <span>${date.getDate()}</span>
        ${count ? `<span class="calendar-count">${count}</span>` : ""}
      </div>
    `);
  }
  grid.innerHTML = cells.join("");
}

function icsEscape(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function exportCalendar() {
  const dueByDay = new Map();
  for (const word of allWords()) {
    const review = reviewFor(word.id);
    const due = review?.due ?? review?.nextReviewDate;
    if (!due) continue;
    const key = dayKey(due);
    dueByDay.set(key, (dueByDay.get(key) || 0) + 1);
  }
  if (!dueByDay.size) {
    showToast("还没有安排复习日期。先学几个词吧。");
    return;
  }
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Shanghai";
  const todayKey = dayKey();
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wortkarte//Review Calendar//ZH",
    "CALSCALE:GREGORIAN",
    `X-WR-TIMEZONE:${timeZone}`,
    "X-WR-CALNAME:Wortkarte 复习"
  ];
  for (const [key, count] of [...dueByDay.entries()].sort()) {
    if (key < todayKey) continue;
    const [y, m, d] = key.split("-").map(Number);
    const start = new Date(y, m - 1, d, 9, 0, 0, 0);
    const end = new Date(start.getTime() + HOUR_MS);
    const format = date => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
    lines.push(
      "BEGIN:VEVENT",
      `UID:wortkarte-${key}@local`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${format(start)}`,
      `DTEND:${format(end)}`,
      `SUMMARY:${icsEscape(`Wortkarte 复习 · ${count} 个德语词`)}`,
      `DESCRIPTION:${icsEscape(`今天有 ${count} 个词到期。打开 Wortkarte 完成考察复习。此日历仅反映导出当日的计划。`)}`,
      "BEGIN:VALARM",
      "TRIGGER:-PT15M",
      "ACTION:DISPLAY",
      `DESCRIPTION:${icsEscape("Wortkarte 复习提醒")}`,
      "END:VALARM",
      "END:VEVENT"
    );
  }
  lines.push("END:VCALENDAR");
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "wortkarte-review.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast("日历已导出。导入手机日历后会有提前 15 分钟的提醒。");
}

function openReminderModal(dueCount) {
  openModal(`
    <div class="modal-head">
      <div>
        <p class="eyebrow">ZEIT ZUM WIEDERHOLEN</p>
        <h2>该复习了。</h2>
        <p>今天还有 ${dueCount} 个词到期。先用考察模式过一遍，答完选择题再看完整词卡。</p>
      </div>
      <button class="modal-close" data-close aria-label="关闭">${icon("close")}</button>
    </div>
    <div class="dict-intro">
      <span class="dict-intro-icon">${icon("clock")}</span>
      <div>
        <strong>只看对错，自动安排</strong>
        <p>到期词会随机出现，答完选择题再看完整词卡；系统按四档掌握度自动安排下次复习。</p>
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" data-close>稍后</button>
      <button class="btn btn-primary" data-modal-action="start-reminder">开始考察</button>
    </div>
  `);
}

function checkReminder(now = new Date()) {
  if (!state.settings.reminderEnabled || session) return;
  if (!$("#modal-root")?.hidden && $("#modal-root")?.innerHTML) return;
  const [hour, minute] = String(state.settings.reminderTime || "20:00").split(":").map(Number);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return;
  const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);
  if (now < target) return;
  const today = dayKey(now.getTime());
  if (state.meta.reminderShown === today) return;
  const dueCount = getMetrics().dueToday.length;
  if (!dueCount) return;
  state.meta.reminderShown = today;
  persist();
  openReminderModal(dueCount);
}

function startReminderLoop() {
  if (reminderTimer) clearInterval(reminderTimer);
  reminderTimer = setInterval(() => checkReminder(), 30000);
  setTimeout(() => checkReminder(), 1200);
}

function renderHeatmap() {  const container = $("#heatmap");
  if (!container) return;
  const now = Date.now();
  const today = startOfDay(now).getTime();
  const mondayOffset = (new Date(today).getDay() + 6) % 7;
  const monday = today - mondayOffset * DAY_MS;
  const start = monday - 49 * DAY_MS;
  const cells = [];
  for (let weekday = 0; weekday < 7; weekday += 1) {
    cells.push(`<span class="heat-label">${WEEKDAYS_ZH[(weekday + 1) % 7]}</span>`);
    for (let week = 0; week < 8; week += 1) {
      const ts = start + (week * 7 + weekday) * DAY_MS;
      const count = state.activity[dayKey(ts)] || 0;
      let level = 0;
      if (count > 0) level = 1;
      if (count > 8) level = 2;
      if (count > 16) level = 3;
      if (count > 24) level = 4;
      const future = ts > today;
      cells.push(`
        <span class="heat-cell" data-level="${future ? 0 : level}" title="${dayKey(ts)} · ${count} 次复习" style="${future ? "opacity:.25" : ""}"></span>
      `);
    }
  }
  container.innerHTML = cells.join("");
}

function renderDifficult(metrics) {
  const container = $("#difficult-list");
  if (!container) return;
  const candidates = metrics.words
    .filter(word => reviewFor(word.id) || state.mistakes[word.id])
    .map(word => {
      const review = reviewFor(word.id);
      const mistakes = state.mistakes[word.id] || 0;
      return { word, review, mistakes, score: (review?.lapses || 0) * 3 + mistakes * 2 };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || (a.review?.interval || 0) - (b.review?.interval || 0))
    .slice(0, 5);

  if (!candidates.length) {
    const fresh = metrics.words.filter(word => !reviewFor(word.id)).slice(0, 5);
    container.innerHTML = fresh.map(word => `
      <div class="difficult-row" data-word-row="${esc(word.id)}">
        <span class="due-article ${word.article || "none"}">${esc(word.article || "·")}</span>
        <span class="difficult-word"><strong>${esc(word.word)}</strong><span>${esc(word.translation)}</span></span>
        <span class="difficult-lapses" style="color:var(--blue);background:var(--blue-soft)">新词</span>
      </div>
    `).join("");
    return;
  }

  container.innerHTML = candidates.map(({ word, review, mistakes }) => {
    const typeLabels = { article: "冠词", cloze: "例句", conj: "变位", listening: "听音", review: "复习", de2zh: "义项", zh2de: "拼写" };
    const type = typeLabels[state.mistakeTypes[word.id]] || "";
    const label = mistakes > 0 ? `答错 ${mistakes} 次${type ? ` · ${type}` : ""}` : `遗忘 ${review?.lapses || 0} 次`;
    return `
      <div class="difficult-row" data-word-row="${esc(word.id)}">
        <span class="due-article ${word.article || "none"}">${esc(word.article || "·")}</span>
        <span class="difficult-word"><strong>${esc(word.word)}</strong><span>${esc(word.translation)}</span></span>
        <span class="difficult-lapses">${label}</span>
      </div>
    `;
  }).join("");
}

/* ─────────────────────────── Quiz ─────────────────────────── */

function todayReviewedWords() {
  const today = dayKey();
  return allWords().filter(word => {
    const review = reviewFor(word.id);
    return Boolean(review?.last) && dayKey(review.last) === today;
  });
}

function readRepeatLog() {
  try {
    const value = JSON.parse(localStorage.getItem(REPEAT_LOG_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function writeRepeatLog(log) {
  try {
    localStorage.setItem(REPEAT_LOG_KEY, JSON.stringify(log.slice(-50)));
  } catch {
    /* storage unavailable */
  }
}

function renderRepeatReview() {
  const card = $("#repeat-card");
  if (!card) return;
  const words = todayReviewedWords();
  if (!words.length) {
    card.hidden = true;
    return;
  }
  const today = dayKey();
  const rounds = readRepeatLog().filter(item => item.date === today).length;
  card.hidden = false;
  $("#repeat-copy").textContent = rounds >= 2
    ? `今天已复习 ${words.length} 个词 · 今日回顾已完成`
    : `今天已复习 ${words.length} 个词 · 已完成 ${rounds} / 2 次回顾`;
  const button = $("#repeat-start");
  if (button) {
    button.textContent = rounds >= 2 ? "回顾完成" : rounds ? "再来一次" : "开始回顾";
    button.disabled = rounds >= 2;
  }
}

function startRepeatReview() {
  const queue = shuffle(todayReviewedWords()).slice(0, 40);
  if (!queue.length) {
    showToast("今天还没有复习过的词。先完成一组学习吧。");
    return;
  }
  if (readRepeatLog().filter(item => item.date === dayKey()).length >= 2) {
    showToast("今天的两次回顾已经完成。");
    return;
  }
  const last = readRepeatLog()
    .filter(item => item.date === dayKey() && item.completedAt)
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))[0];
  if (last) {
    const wait = Math.ceil((new Date(last.completedAt).getTime() + (Number(state.settings.repeatIntervalMin) || 30) * 60000 - Date.now()) / 60000);
    if (wait > 0) showToast(`建议再等 ${wait} 分钟再回顾，效果更好。`);
  }
  closeModal();
  stopStudyTimer();
  $("#study-summary").classList.add("hidden");
  $("#study-stage").classList.remove("hidden");
  $("#view-study").classList.remove("is-revealed");
  session = {
    queue,
    index: 0,
    done: 0,
    ratings: [],
    start: Date.now(),
    mode: "repeat",
    topicId: null,
    limit: queue.length,
    transitioning: false,
    finished: false,
    phase: "card",
    exam: null,
    examStats: { total: 0, correct: 0 }
  };
  $("#study-topic-label").textContent = "今日回顾";
  $("#study-timer").textContent = "00:00";
  setView("study");
  startStudyTimer();
  renderStudyCard();
}

function logRepeatReview() {
  if (!session || session.mode !== "repeat") return;
  const log = readRepeatLog();
  const correct = session.ratings.filter(item => item.correct).length;
  log.push({
    date: dayKey(),
    count: session.queue.length,
    correct,
    completedAt: new Date().toISOString()
  });
  writeRepeatLog(log);
  renderRepeatReview();
}

/* ─────────────────────────── Weekly quiz ─────────────────────────── */

function isoWeekKey(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((d - yearStart) / DAY_MS) + 1) / 7);
  return `${d.getUTCFullYear()}-W${pad(week)}`;
}

function readWeeklyQuiz() {
  try {
    const value = JSON.parse(localStorage.getItem(WEEKLY_QUIZ_KEY) || "null");
    return value && typeof value === "object" ? value : null;
  } catch {
    return null;
  }
}

function writeWeeklyQuiz(value) {
  try {
    if (value) localStorage.setItem(WEEKLY_QUIZ_KEY, JSON.stringify(value));
    else localStorage.removeItem(WEEKLY_QUIZ_KEY);
  } catch {
    /* storage unavailable */
  }
}

function readWeeklyHistory() {
  try {
    const value = JSON.parse(localStorage.getItem(WEEKLY_HISTORY_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function writeWeeklyHistory(history) {
  try {
    localStorage.setItem(WEEKLY_HISTORY_KEY, JSON.stringify(history.slice(-20)));
  } catch {
    /* storage unavailable */
  }
}

function learnedWords() {
  return allWords().filter(word => {
    const review = reviewFor(word.id);
    return Boolean(review) && statusFor(word) !== "new";
  });
}

function ensureWeeklyQuiz() {
  const week = isoWeekKey();
  let current = readWeeklyQuiz();
  if (current && current.week !== week) {
    if (current.status === "generated" || current.status === "started") {
      const history = readWeeklyHistory();
      history.push({ ...current, status: "expired", archivedAt: new Date().toISOString() });
      writeWeeklyHistory(history);
    }
    current = null;
  }
  if (!current) {
    current = {
      week,
      status: "generated",
      createdAt: new Date().toISOString(),
      score: null,
      total: 8
    };
    writeWeeklyQuiz(current);
  }
  return current;
}

function archiveWeeklyQuiz(current) {
  if (!current) return;
  const history = readWeeklyHistory();
  if (!history.some(item => item.week === current.week && item.status === current.status && item.score === current.score)) {
    history.push({ ...current, archivedAt: new Date().toISOString() });
    writeWeeklyHistory(history);
  }
}

function renderWeeklyQuiz() {
  const card = $("#weekly-quiz-card");
  if (!card) return;
  if (state.settings.weeklyQuizEnabled === false) {
    card.hidden = true;
    return;
  }
  const current = ensureWeeklyQuiz();
  const poolSize = learnedWords().length;
  const questionCount = weeklyQuestionCount();
  if (poolSize < 4) {
    card.hidden = true;
    return;
  }
  card.hidden = false;
  const title = $("#weekly-quiz-title");
  const copy = $("#weekly-quiz-copy");
  const start = $("#weekly-quiz-start");
  const skip = $("#weekly-quiz-skip");
  if (current.status === "completed") {
    title.textContent = `本周小测 · ${current.score ?? 0}%`;
    copy.textContent = `已完成 ${current.total || questionCount} 题；可再做一次，不会改变复习进度。`;
    start.textContent = "再做一次";
    skip.hidden = true;
  } else if (current.status === "skipped") {
    title.textContent = "本周小测已跳过";
    copy.textContent = "跳过不会扣除学习进度，下周仍会自动生成新卷。";
    start.textContent = "改变主意";
    skip.hidden = true;
  } else {
    title.textContent = "本周小测";
    copy.textContent = `从 ${poolSize} 个已学词中抽 ${questionCount} 题，约 3 分钟。`;
    start.textContent = current.status === "started" ? "继续小测" : "开始小测";
    skip.hidden = false;
  }
}

function startWeeklyQuiz() {
  const current = ensureWeeklyQuiz();
  const pool = learnedWords();
  if (pool.length < 4) {
    showToast("先学几个词，再回来做本周小测。");
    return;
  }
  quiz.mode = "de-zh";
  quiz.level = "all";
  quiz.weekly = true;
  quiz.weekId = current.week;
  const count = Math.min(weeklyQuestionCount(), pool.length);
  const targets = shuffle(pool).slice(0, count);
  const weeklyModes = ["de-zh", "zh-de", "article", "cloze", "conj", "listening"];
  quiz.questions = targets.map((target, index) => {
    const mode = weeklyModes[index % weeklyModes.length];
    return buildQuizQuestion(target, pool, mode);
  });
  quiz.index = 0;
  quiz.score = 0;
  quiz.answers = [];
  quiz.answered = false;
  quiz.active = true;
  quiz.startTime = Date.now();
  current.status = "started";
  current.total = count;
  writeWeeklyQuiz(current);

  setView("quiz");
  $("#quiz-setup").classList.add("hidden");
  $("#quiz-result").classList.add("hidden");
  $("#quiz-play").classList.remove("hidden");
  renderQuizQuestion();
}

function skipWeeklyQuiz() {
  const current = ensureWeeklyQuiz();
  current.status = "skipped";
  current.skippedAt = new Date().toISOString();
  writeWeeklyQuiz(current);
  archiveWeeklyQuiz(current);
  renderWeeklyQuiz();
  showToast("本周小测已跳过，不影响复习进度。");
}

function resetQuizSetup() {
  quiz.active = false;
  quiz.answered = false;
  quiz.weekly = false;
  quiz.weekId = "";
  $("#quiz-setup")?.classList.remove("hidden");
  $("#quiz-play")?.classList.add("hidden");
  $("#quiz-result")?.classList.add("hidden");
  $$(".quiz-mode").forEach(mode => {
    mode.classList.toggle("is-selected", mode.dataset.quizMode === quiz.mode);
  });
  const levelSelect = $("#quiz-level");
  if (levelSelect) levelSelect.value = quiz.level || "all";
  const next = $("#quiz-next");
  if (next) next.hidden = true;
}

function selectQuizMode(mode) {
  if (!["de-zh", "zh-de", "article", "listening"].includes(mode)) return;
  quiz.mode = mode;
  $$(".quiz-mode").forEach(button => {
    button.classList.toggle("is-selected", button.dataset.quizMode === mode);
  });
}

function optionText(word, mode) {
  if (mode === "zh-de") return wordDisplay(word);
  return word.translation;
}

function buildQuizQuestion(target, pool, requestedMode = quiz.mode) {
  const mode = ["de-zh", "zh-de", "article", "listening", "cloze", "conj"].includes(requestedMode)
    ? requestedMode
    : "de-zh";
  if (mode === "article") {
    if (target.pos !== "noun" || !target.article) return buildQuizQuestion(target, pool, "de-zh");
    const options = shuffle(["der", "die", "das"]).map(text => ({
      text,
      correct: text === target.article
    }));
    return {
      mode,
      word: target,
      options,
      correctIndex: options.findIndex(option => option.correct)
    };
  }

  if (mode === "cloze") {
    const example = String(target.exampleDe || target.example || "");
    if (!example || !example.toLocaleLowerCase("de").includes(String(target.word).toLocaleLowerCase("de"))) {
      return buildQuizQuestion(target, pool, "zh-de");
    }
    const prompt = example.replace(new RegExp(target.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), "___");
    const chosenWords = [target];
    const seenCloze = new Set([wordDisplay(target)]);
    for (const candidate of shuffle(pool.filter(word => word.id !== target.id))) {
      if (!candidate.word || seenCloze.has(wordDisplay(candidate))) continue;
      chosenWords.push(candidate);
      seenCloze.add(wordDisplay(candidate));
      if (chosenWords.length === 4) break;
    }
    const options = shuffle(chosenWords).map(word => ({
      text: wordDisplay(word),
      correct: word.id === target.id
    }));
    return { mode, word: target, prompt, options, correctIndex: options.findIndex(option => option.correct) };
  }

  if (mode === "conj") {
    const pr3sg = target.conj?.pr3sg || String(target.forms || "").split(/[,;，；]/)[0]?.trim();
    if (!pr3sg) return buildQuizQuestion(target, pool, "de-zh");
    const chosenWords = [target];
    const seenConj = new Set([pr3sg]);
    for (const candidate of shuffle(pool.filter(word => word.id !== target.id && word.pos === "verb"))) {
      const form = candidate.conj?.pr3sg || String(candidate.forms || "").split(/[,;，；]/)[0]?.trim();
      if (!form || seenConj.has(form)) continue;
      chosenWords.push({ ...candidate, __form: form });
      seenConj.add(form);
      if (chosenWords.length === 4) break;
    }
    if (chosenWords.length < 4) return buildQuizQuestion(target, pool, "de-zh");
    const options = shuffle(chosenWords).map(word => ({
      text: word.id === target.id ? pr3sg : word.__form,
      correct: word.id === target.id
    }));
    return {
      mode,
      word: target,
      prompt: `${target.word} · er/sie/es ___`,
      options,
      correctIndex: options.findIndex(option => option.correct)
    };
  }

  const chosen = [target];
  const seen = new Set([optionText(target, mode)]);
  const candidates = shuffle(pool.filter(word => word.id !== target.id));
  for (const candidate of candidates) {
    const text = optionText(candidate, mode);
    if (!seen.has(text)) {
      chosen.push(candidate);
      seen.add(text);
    }
    if (chosen.length === 4) break;
  }

  if (chosen.length < 4) {
    for (const candidate of shuffle(allWords())) {
      const text = optionText(candidate, mode);
      if (!seen.has(text)) {
        chosen.push(candidate);
        seen.add(text);
      }
      if (chosen.length === 4) break;
    }
  }

  const options = shuffle(chosen).map(word => ({
    text: optionText(word, mode),
    correct: word.id === target.id
  }));

  return {
    mode,
    word: target,
    options,
    correctIndex: options.findIndex(option => option.correct)
  };
}

function startBankQuiz(category = "all", type = "mixed", level = "all") {
  let questions = [];
  const wants = key => category === "all" || category === key;

  if (wants("words")) {
    const pool = allWords().filter(word => level === "all" || word.level === level);
    const targets = shuffle(pool).slice(0, category === "words" ? 12 : 5);
    for (const target of targets) {
      const mode = type === "zh-de" || (type === "mixed" && Math.random() > 0.55) ? "zh-de" : "de-zh";
      questions.push(buildQuizQuestion(target, pool, mode));
    }
  }
  if (wants("phrases")) questions.push(...phraseQuestionBank(category, level, type));
  if (wants("grammar")) questions.push(...grammarQuestionBank(level, type));
  if (wants("articles")) questions.push(...articleQuestionBank(level));

  if (!questions.length) {
    showToast("这个范围暂时没有可用题目，换一个内容或难度。");
    return;
  }
  quiz.weekly = false;
  quiz.weekId = "";
  quiz.mode = "bank";
  quiz.bankConfig = { category, type, level };
  quiz.questions = shuffle(questions).slice(0, 12);
  quiz.index = 0;
  quiz.score = 0;
  quiz.answers = [];
  quiz.answered = false;
  quiz.active = true;
  quiz.startTime = Date.now();
  $("#quiz-setup").classList.add("hidden");
  $("#quiz-result").classList.add("hidden");
  $("#quiz-play").classList.remove("hidden");
  renderQuizQuestion();
}

function startQuiz() {
  quiz.weekly = false;
  quiz.weekId = "";
  quiz.bankConfig = null;
  if (!["de-zh", "zh-de", "article", "listening"].includes(quiz.mode)) {
    quiz.mode = "de-zh";
  }
  const level = $("#quiz-level")?.value || "all";
  quiz.level = level;
  let pool = allWords().filter(word => level === "all" || word.level === level);
  if (quiz.mode === "article") pool = pool.filter(word => word.pos === "noun" && word.article);
  if (pool.length < 3) {
    showToast("这个词库范围里的词太少，换一个范围试试。");
    return;
  }
  if (quiz.mode !== "article" && pool.length < 4) {
    showToast("至少需要 4 个词才能生成选项。");
    return;
  }

  const count = Math.min(10, pool.length);
  const targets = shuffle(pool).slice(0, count);
  quiz.questions = targets.map(target => buildQuizQuestion(target, pool));
  quiz.index = 0;
  quiz.score = 0;
  quiz.answers = [];
  quiz.answered = false;
  quiz.active = true;
  quiz.startTime = Date.now();

  $("#quiz-setup").classList.add("hidden");
  $("#quiz-result").classList.add("hidden");
  $("#quiz-play").classList.remove("hidden");
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const question = quiz.questions[quiz.index];
  if (!question) return finishQuiz();
  const word = question.word;
  const total = quiz.questions.length;
  const isLast = quiz.index === total - 1;
  const mode = question.mode || quiz.mode;

  quiz.answered = false;
  $("#quiz-progress-label").textContent = `${quiz.index + 1} / ${total}`;
  $("#quiz-progress-bar").style.width = `${(quiz.index / total) * 100}%`;
  $("#quiz-score").textContent = quiz.score;
  $("#quiz-level-chip").textContent = word.level || "A1";

  const promptLabels = {
    "de-zh": "WAS BEDEUTET DAS?",
    "zh-de": "WIE HEISST DAS AUF DEUTSCH?",
    article: "WELCHER ARTIKEL?",
    listening: "WAS HÖRST DU?",
    cloze: "WELCHES WORT PASST?",
    conj: "WELCHE FORM IST RICHTIG?"
  };
  $("#quiz-prompt-label").textContent = promptLabels[mode] || "WAS BEDEUTET DAS?";

  const questionEl = $("#quiz-question");
  questionEl.classList.remove("is-long", "is-zh");
  if (mode === "de-zh") {
    questionEl.innerHTML = `${word.article ? `<span class="article" data-art="${esc(word.article)}">${esc(word.article)}</span> ` : ""}${esc(word.word)}`;
    if (word.word.length > 15) questionEl.classList.add("is-long");
  } else if (mode === "zh-de") {
    questionEl.textContent = word.translation;
    questionEl.classList.add("is-zh");
  } else if (mode === "article") {
    questionEl.innerHTML = `<span class="quiz-blank">___</span> ${esc(word.word)}`;
    if (word.word.length > 13) questionEl.classList.add("is-long");
  } else if (mode === "cloze" || mode === "conj") {
    questionEl.textContent = question.prompt || word.word;
  } else {
    questionEl.textContent = "Hör zu.";
  }

  const audioButton = $('[data-action="speak-quiz"]');
  if (audioButton) {
    audioButton.style.display = mode === "de-zh" || mode === "listening" ? "" : "none";
    audioButton.classList.remove("is-speaking");
  }

  $("#quiz-options").innerHTML = question.options.map((option, index) => `
    <button class="quiz-option" data-quiz-option="${index}">
      <span class="option-letter">${String.fromCharCode(65 + index)}</span>
      <span class="option-text">${esc(option.text)}</span>
    </button>
  `).join("");
  $("#quiz-options").classList.toggle("is-three", question.options.length === 3);

  $("#quiz-feedback").classList.add("hidden");
  $("#quiz-feedback").classList.remove("is-wrong");
  $("#quiz-next").hidden = true;
  $("#quiz-hint").textContent = mode === "listening" ? "点击朗读，再选择释义" : "点击选项作答，或按 1–4";

  if (mode === "listening" && state.settings.sound !== false) {
    setTimeout(() => {
      if (quiz.active && quiz.index === quiz.questions.indexOf(question)) {
        speakText(wordDisplay(word), audioButton);
      }
    }, 380);
  }
}

function answerQuiz(index) {
  if (!quiz.active || quiz.answered) return;
  const question = quiz.questions[quiz.index];
  const chosen = question.options[index];
  if (!chosen) return;

  quiz.answered = true;
  const isCorrect = Boolean(chosen.correct);
  recordLevelAnswer(question.word.level, isCorrect);
  if (isCorrect) {
    quiz.score += 1;
  } else {
    if (getWord(question.word.id)) {
      state.mistakes[question.word.id] = (state.mistakes[question.word.id] || 0) + 1;
      state.mistakeTypes[question.word.id] = question.mode || quiz.mode || "quiz";
    }
  }
  persist();
  quiz.answers.push({
    word: question.word,
    chosen: chosen.text,
    correct: isCorrect,
    correctText: question.options[question.correctIndex].text,
    explanation: question.explanation || ""
  });

  $$("#quiz-options .quiz-option").forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === question.correctIndex) button.classList.add("is-correct");
    if (buttonIndex === index && !isCorrect) button.classList.add("is-wrong");
    if (buttonIndex !== index && buttonIndex !== question.correctIndex) button.classList.add("is-dimmed");
  });

  $("#quiz-score").textContent = quiz.score;
  $("#quiz-progress-bar").style.width = `${((quiz.index + 1) / quiz.questions.length) * 100}%`;

  const feedback = $("#quiz-feedback");
  const mark = $("#feedback-mark");
  feedback.classList.remove("hidden");
  feedback.classList.toggle("is-wrong", !isCorrect);
  mark.innerHTML = icon(isCorrect ? "check" : "close");
  $("#feedback-title").textContent = isCorrect ? "Richtig!" : "Fast!";
  $("#feedback-copy").textContent = isCorrect
    ? `${question.explanation || `${wordDisplay(question.word)} — ${question.word.translation}`} ${question.word.exampleZh || ""}`.trim()
    : `${question.explanation || `正确答案是「${question.options[question.correctIndex].text}」。`} ${question.word.example || ""}`.trim();

  const next = $("#quiz-next");
  next.hidden = false;
  next.innerHTML = quiz.index === quiz.questions.length - 1
    ? `查看结果 ${icon("arrow-right")}`
    : `下一题 ${icon("arrow-right")}`;
  $("#quiz-hint").textContent = "按 Enter 继续";
}

function nextQuizQuestion() {
  if (!quiz.active || !quiz.answered) return;
  if (quiz.index >= quiz.questions.length - 1) {
    finishQuiz();
    return;
  }
  quiz.index += 1;
  quiz.answered = false;
  renderQuizQuestion();
}

function finishQuiz() {
  quiz.active = false;
  const total = quiz.questions.length;
  const percent = total ? Math.round((quiz.score / total) * 100) : 0;
  const wrong = quiz.answers.filter(answer => !answer.correct);
  state.quizBest = Math.max(Number(state.quizBest) || 0, percent);
  if (quiz.weekly) {
    const current = readWeeklyQuiz();
    if (current && current.week === quiz.weekId) {
      current.status = "completed";
      current.score = percent;
      current.correct = quiz.score;
      current.total = total;
      current.completedAt = new Date().toISOString();
      writeWeeklyQuiz(current);
      archiveWeeklyQuiz(current);
    }
    renderWeeklyQuiz();
  }
  persist();

  $("#quiz-play").classList.add("hidden");
  $("#quiz-result").classList.remove("hidden");
  $("#result-percent").textContent = percent;
  $("#result-correct").textContent = quiz.score;
  $("#result-wrong").textContent = wrong.length;
  $("#result-best").textContent = `${state.quizBest}%`;
  const ring = $("#result-ring");
  ring.style.strokeDashoffset = String(RING_SMALL * (1 - percent / 100));

  const title = percent >= 90
    ? "Ausgezeichnet."
    : percent >= 70
      ? "Gut gemacht."
      : percent >= 50
        ? "Weiter dran."
        : "Noch eine Runde.";
  const copy = percent >= 90
    ? "这些词已经不只是“见过”，它们开始真正属于你了。"
    : percent >= 70
      ? "大部分词都接住了。再复习一下错题，下次会更稳。"
      : percent >= 50
        ? "已经有一半的词汇站稳了。错题会被安排更早再见。"
        : "第一次测验只是起点。先记住错题里的画面，再来一次。";
  $("#result-title").textContent = title;
  $("#result-copy").textContent = copy;
  const answeredLevels = [...new Set(quiz.answers.map(answer => normalizeCefrLevel(answer.word.level)))];
  const recommendation = answeredLevels.map(levelRecommendation).find(Boolean);
  if (recommendation) $("#result-copy").textContent = `${copy} ${recommendation}`;

  $("#result-review").innerHTML = quiz.answers.length
    ? quiz.answers.map(answer => `
        <div class="result-wrong-row ${answer.correct ? "is-correct" : ""}">
          <span class="article" data-art="${esc(answer.word.article || "none")}">${esc(answer.word.article || "·")}</span>
          <strong>${esc(answer.word.word)}</strong>
          <span>${answer.correct ? "正确" : `正确答案：${esc(answer.correctText)} · 你选了「${esc(answer.chosen)}」`}${answer.explanation ? `<small>${esc(answer.explanation)}</small>` : ""}</span>
        </div>
      `).join("")
    : `<p class="queue-empty" style="text-align:center">本轮没有答题记录。</p>`;
}

function quitQuiz() {
  quiz.active = false;
  resetQuizSetup();
  setView("quiz");
}

/* ─────────────────────────── Modals ─────────────────────────── */

function openWordModal(id) {
  const word = getWord(id);
  if (!word) return;
  const topic = getTopic(word.topic);
  const status = currentStatus(word);
  const statusMeta = STATUS_META[status] || STATUS_META.unmastered;
  const review = reviewFor(word.id);
  const favorite = state.favorites.includes(word.id);
  const article = word.article || "";

  openModal(`
    <div class="modal-head">
      <div>
        <p class="eyebrow">WORTKARTE</p>
        <h2>词卡详情</h2>
      </div>
      <button class="modal-close" data-close aria-label="关闭">${icon("close")}</button>
    </div>
    <div class="word-modal-hero" style="--topic-soft:${topic.soft};--topic-color:${topic.color}" data-letter="${esc(topic.letter)}">
      <p class="eyebrow">${esc(topic.de)}</p>
      <h3 class="modal-word">${article ? `<span class="article" data-art="${esc(article)}">${esc(article)}</span>` : ""}${esc(word.word)}<button type="button" class="word-speak" data-action="speak-word" data-word-id="${esc(word.id)}" aria-label="发音">🔊</button></h3>
      <p class="modal-translation">${esc(word.translation)}</p>
      <div class="modal-meta">
        <span class="level-chip">${esc(word.level)}</span>
        <span class="status-badge ${statusMeta.cls}"><i></i>${statusMeta.label}</span>
        ${review ? `<span style="color:var(--muted);font-size:8.5px">下次复习 · ${esc(formatDue(review.due))}</span>` : `<span style="color:var(--muted);font-size:8.5px">还没开始学习</span>`}
      </div>
    </div>
    <div class="modal-facts">
      <div><span>词性</span><strong>${esc(FINE_POS_LABELS[word.finePos] || POS_LABELS[word.pos] || "词")}</strong></div>
      <div><span>${word.pos === "noun" ? "复数" : "变位"}</span><strong>${esc(word.pos === "noun" ? pluralLabel(word) : (word.forms || "—"))}</strong></div>
      <div><span>等级</span><strong>${esc(word.level)}</strong></div>
    </div>
    ${word.godic ? `
      <div class="modal-godic">
        <p class="godic-kicker">${esc(word.godic.source || "godic.net")}</p>
        <p class="godic-defs">${esc(word.godic.definitions || "")}</p>
        ${Array.isArray(word.godic.synonyms) && word.godic.synonyms.length ? `<p class="godic-line"><strong>Synonyme:</strong> ${word.godic.synonyms.slice(0, 12).map(esc).join(" · ")}</p>` : ""}
        ${Array.isArray(word.godic.relatedWords) && word.godic.relatedWords.length ? `<p class="godic-line"><strong>联想词:</strong> ${word.godic.relatedWords.slice(0, 10).map(item => `${esc(item.word)}${item.zh ? `（${esc(item.zh)}）` : ""}`).join(" · ")}</p>` : ""}
        ${Array.isArray(word.godic.examples) && word.godic.examples.length ? `<p class="godic-line"><strong>Beispiel:</strong> ${esc(word.godic.examples[0].de)}${word.godic.examples[0].zh ? ` — ${esc(word.godic.examples[0].zh)}` : ""}</p>` : ""}
        ${word.godicUrl ? `<a class="godic-source" href="${esc(word.godicUrl)}" target="_blank" rel="noopener noreferrer">godic.net →</a>` : ""}
      </div>
    ` : ""}
    ${word.example ? `
      <div class="modal-example">
        <p>${esc(word.example)}</p>
        ${word.exampleZh ? `<p>${esc(word.exampleZh)}</p>` : ""}
        ${word.exampleSource === "article" ? `<p class="example-source">文章例句 · 《${esc(word.exampleArticleTitle || "文章")}》 · ${esc(word.exampleLevel || word.level || "B1")}</p>` : ""}
        ${word.exampleSource === "wordbook" ? `<p class="example-source">词汇书例句 · ${esc(word.exampleBook || "词表")}</p>` : ""}
      </div>
    ` : ""}
    ${word.note ? `<p class="modal-note"><strong style="color:var(--forest-3)">记忆钩子 · </strong>${esc(word.note)}</p>` : ""}
    ${word.source ? `
      <p class="word-source">
        来源：${word.sourceUrl ? `<a href="${esc(word.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(word.source)}</a>` : esc(word.source)}
        ${word.translationSource ? ` · 中文释义：${esc(word.translationSource)}` : ""}
        ${word.license ? `<br>${esc(word.license)}` : ""}
      </p>
    ` : ""}
    <div class="modal-actions">
      <button class="btn btn-primary" data-modal-action="study" data-word-id="${esc(word.id)}">学习这张卡 ${icon("arrow-right")}</button>
      <button class="btn btn-ghost" data-modal-action="favorite" data-word-id="${esc(word.id)}">${icon("star")} ${favorite ? "已收藏" : "收藏"}</button>
      ${word.custom ? `<button class="btn btn-danger" data-modal-action="delete-word" data-word-id="${esc(word.id)}">删除</button>` : ""}
      <button class="btn btn-ghost" data-close>关闭</button>
    </div>
  `);
}

function openAddWordModal() {
  openModal(`
    <form data-form="add-word">
      <div class="modal-head">
        <div>
          <p class="eyebrow">NEUES WORT</p>
          <h2>添加一张词卡</h2>
          <p>它会加入你的词库，并按照同样的间隔重复节奏复习。</p>
        </div>
        <button class="modal-close" type="button" data-close aria-label="关闭">${icon("close")}</button>
      </div>
      <div class="form-grid">
        <div class="form-field full">
          <label for="new-word">德语单词 *</label>
          <input id="new-word" name="word" required maxlength="48" placeholder="z. B. die Wohnung / lernen">
        </div>
        <div class="form-field">
          <label for="new-pos">词性</label>
          <select id="new-pos" name="pos">
            <option value="noun">名词</option>
            <option value="verb">动词</option>
            <option value="adj">形容词</option>
            <option value="adv">副词</option>
          </select>
        </div>
        <div class="form-field">
          <label for="new-article">冠词（仅名词）</label>
          <select id="new-article" name="article">
            <option value="der">der</option>
            <option value="die">die</option>
            <option value="das">das</option>
            <option value="">无 / 非名词</option>
          </select>
        </div>
        <div class="form-field full">
          <label for="new-translation">中文释义 *</label>
          <input id="new-translation" name="translation" required maxlength="100" placeholder="例如：公寓；住处">
        </div>
        <div class="form-field">
          <label for="new-level">等级</label>
          <select id="new-level" name="level">
            <option>A1</option>
            <option>A2</option>
            <option>B1</option>
            <option>B2</option>
          </select>
        </div>
        <div class="form-field">
          <label for="new-topic">主题</label>
          <select id="new-topic" name="topic">
            ${TOPICS.filter(topic => !topic.isPack).map(topic => `<option value="${topic.id}">${esc(topic.name)}</option>`).join("")}
          </select>
        </div>
        <div class="form-field full">
          <label for="new-morph">复数 / 动词变位（可选）</label>
          <input id="new-morph" name="morph" maxlength="90" placeholder="die Wohnungen 或 lernt · lernte · hat gelernt">
        </div>
        <div class="form-field full">
          <label for="new-example">德语例句（可选）</label>
          <textarea id="new-example" name="example" maxlength="220" placeholder="Unser Alltag beginnt um sieben Uhr."></textarea>
        </div>
        <div class="form-field full">
          <label for="new-example-zh">例句中文（可选）</label>
          <input id="new-example-zh" name="exampleZh" maxlength="180" placeholder="我们的日常生活七点开始。">
        </div>
        <div class="form-field full">
          <label for="new-note">记忆钩子（可选）</label>
          <textarea id="new-note" name="note" maxlength="260" placeholder="一个画面、词根或和中文的联想……"></textarea>
        </div>
      </div>
      <p class="form-hint">所有内容只保存在当前浏览器。名字和进度可以在设置里管理。</p>
      <div class="modal-actions">
        <button class="btn btn-ghost" type="button" data-close>取消</button>
        <button class="btn btn-primary" type="submit">保存词卡 ${icon("plus")}</button>
      </div>
    </form>
  `);
}

function openChangelogModal() {
  if (!CHANGELOG_DATA.length) {
    showToast("还没有更新日志。");
    return;
  }
  openModal(`
    <div class="modal-head">
      <div>
        <p class="eyebrow">CHANGELOG</p>
        <h2>更新日志</h2>
        <p>词库修正、功能变更与教材源登记，按版本倒序展示。</p>
      </div>
      <button class="modal-close" data-close aria-label="关闭">${icon("close")}</button>
    </div>
    ${CHANGELOG_SUMMARY.length ? (() => {
      const summary = CHANGELOG_SUMMARY[0];
      return `<div class="changelog-summary">
        <div><strong>本次更新总结</strong><small>${esc(summary.runId)} · ${esc(summary.version)} · ${summary.totalChanges} 条变更</small></div>
        <div class="changelog-summary-types">${Object.entries(summary.byType || {}).map(([type, count]) => `<span>${esc(type)} ${count}</span>`).join("")}</div>
        <ul>${(summary.highlights || []).map(item => `<li>${esc(item)}</li>`).join("")}</ul>
      </div>`;
    })() : ""}
    <div class="changelog-list">
      ${CHANGELOG_DATA.slice().reverse().map(entry => `
        <details class="changelog-entry" ${entry === CHANGELOG_DATA[CHANGELOG_DATA.length - 1] ? "open" : ""}>
          <summary>
            <span class="changelog-type ${esc(entry.type)}">${esc(entry.type)}</span>
            <span><strong>${esc(entry.summary)}</strong><small>${esc(entry.version)} · ${esc(entry.date)} · ${esc(entry.scope || "")}</small></span>
          </summary>
          <ul>${(entry.items || []).map(item => `<li>${esc(item)}</li>`).join("")}</ul>
        </details>
      `).join("")}
    </div>
    <div class="modal-actions"><button class="btn btn-primary" data-close>知道了</button></div>
  `);
}

function openLibraryResourcesModal() {
  const resources = [
    ["同济大学图书馆", "馆藏目录、数据库导航、电子期刊与文献传递入口", "https://www.lib.tongji.edu.cn/"],
    ["德文图书馆 Deutsch-Bibliothek", "德语教材、Duden/Grammatik、分级读物与德语报刊", "https://www.lib.tongji.edu.cn/index.php?classid=11965"],
    ["读者荐购 / 荐购到馆书目", "申请采购缺失的德语教辅与工具书", "https://www.lib.tongji.edu.cn/index.php?classid=11965"],
    ["数据库导航 / 电子期刊", "德语语料库、在线词典与德语期刊", "https://www.lib.tongji.edu.cn/"],
    ["文献传递", "获取本馆未藏的德语参考与专业搭配", "https://www.lib.tongji.edu.cn/"],
    ["PQDT 国际博硕士论文", "含德语术语的学位论文，补充学术例句", "https://www.lib.tongji.edu.cn/"],
    ["馆长信箱", "gzxx@tongji.edu.cn · 021-65983994 / 021-65987652", "mailto:gzxx@tongji.edu.cn"]
  ];
  openModal(`
    <div class="modal-head">
      <div>
        <p class="eyebrow">BIBLIOTHEK · TONGJI</p>
        <h2>图书馆德语资源</h2>
        <p>官方渠道只用于人工核对与出处登记，运行期不联网、不抓取。</p>
      </div>
      <button class="modal-close" data-close aria-label="关闭">${icon("close")}</button>
    </div>
    <div class="resource-list">
      ${resources.map(([title, copy, url]) => `
        <a class="resource-item" href="${esc(url)}" target="_blank" rel="noopener noreferrer">
          <span>${icon("arrow-right")}</span>
          <div><strong>${esc(title)}</strong><small>${esc(copy)}</small></div>
        </a>
      `).join("")}
    </div>
    <p class="settings-local-note">请遵守图书馆电子资源版权与访问限制；德文图书馆、荐购到馆书目与文献传递为人工核对渠道，不纳入运行期自动流程。</p>
    <div class="modal-actions"><button class="btn btn-primary" data-close>知道了</button></div>
  `);
}

function openSettingsModal() {
  openModal(`
    <div class="modal-head">
      <div>
        <p class="eyebrow">DEIN PROFIL</p>
        <h2>设置</h2>
        <p>让这个小工具更像你自己的学习空间。</p>
      </div>
      <button class="modal-close" data-close aria-label="关闭">${icon("close")}</button>
    </div>
    <div class="settings-list">
      <h3 class="settings-group-title">学习</h3>
      <div class="settings-row">
        <div><strong>你的名字</strong><small>会出现在首页问候里</small></div>
        <input type="text" id="setting-name" maxlength="24" value="${esc(state.settings.name || "Lena")}" aria-label="你的名字">
      </div>
      <div class="settings-row">
        <div><strong>每日单词量</strong><small>5–100，同时限制当日新词与复习队列</small></div>
        <input type="number" id="setting-goal" min="5" max="100" value="${Number(state.settings.dailyGoal) || 20}" aria-label="每日单词量">
      </div>
      <h3 class="settings-group-title">外观</h3>
      <div class="settings-row">
        <div><strong>页面主题</strong><small>切换整套颜色变量，立即生效</small></div>
        <select id="setting-theme" aria-label="页面主题">
          <option value="warm" ${state.settings.theme === "warm" ? "selected" : ""}>暖色</option>
          <option value="forest" ${state.settings.theme === "forest" ? "selected" : ""}>森林绿</option>
          <option value="blue" ${state.settings.theme === "blue" ? "selected" : ""}>雾蓝</option>
          <option value="dark" ${state.settings.theme === "dark" ? "selected" : ""}>深灰暗色</option>
          <option value="contrast" ${state.settings.theme === "contrast" ? "selected" : ""}>高对比度</option>
        </select>
      </div>
      <div class="settings-row">
        <div><strong>自定义主色</strong><small>覆盖当前主题的强调色</small></div>
        <input type="color" id="setting-accent" value="${esc(state.settings.accent || "#b85c38")}" aria-label="自定义主色">
      </div>
      <h3 class="settings-group-title">小测</h3>
      <div class="settings-row">
        <div><strong>小测难度</strong><small>简单 4 题 / 标准 8 题 / 挑战 12 题</small></div>
        <select id="setting-quiz-difficulty" aria-label="小测难度">
          <option value="simple" ${state.settings.quizDifficulty === "simple" ? "selected" : ""}>简单</option>
          <option value="standard" ${state.settings.quizDifficulty === "standard" ? "selected" : ""}>标准</option>
          <option value="challenge" ${state.settings.quizDifficulty === "challenge" ? "selected" : ""}>挑战</option>
        </select>
      </div>
      <div class="settings-row">
        <div><strong>每周小测推送</strong><small>关闭后主页不再显示本周小测卡片</small></div>
        <label class="switch">
          <input type="checkbox" id="setting-weekly-quiz" ${state.settings.weeklyQuizEnabled !== false ? "checked" : ""}>
          <span></span>
        </label>
      </div>
      <h3 class="settings-group-title">学习提醒</h3>
      <div class="settings-row">
        <div><strong>自动朗读</strong><small>听音辨词模式会直接播放发音</small></div>
        <label class="switch">
          <input type="checkbox" id="setting-sound" ${state.settings.sound !== false ? "checked" : ""}>
          <span></span>
        </label>
      </div>
      <div class="settings-row">
        <div><strong>复习提醒</strong><small>停留在页面时，到点提醒今日到期词</small></div>
        <label class="switch">
          <input type="checkbox" id="setting-reminder-enabled" ${state.settings.reminderEnabled ? "checked" : ""}>
          <span></span>
        </label>
      </div>
      <div class="settings-row">
        <div><strong>晚间提醒时间</strong><small>纯静态页面无法后台唤醒，打开应用时检查</small></div>
        <input type="time" id="setting-reminder-time" value="${esc(state.settings.reminderTime || "20:00")}" aria-label="复习提醒时间">
      </div>
      <div class="settings-row">
        <div><strong>回顾最小间隔</strong><small>两次「今日回顾」之间建议等待的分钟数</small></div>
        <input type="number" id="setting-repeat-interval" min="10" max="120" value="${Number(state.settings.repeatIntervalMin) || 30}" aria-label="回顾最小间隔">
      </div>
      <h3 class="settings-group-title">数据</h3>
      <div class="settings-row">
        <div><strong>官方词表</strong><small>歌德证书 A1–C2 词汇 · 本地词表</small></div>
        <button class="btn btn-ghost" data-modal-action="open-dictionary">管理词表</button>
      </div>
      <div class="settings-row">
        <div><strong>导入学习内容</strong><small>文本 / JSON；失败自动重试 1 次后终止</small></div>
        <button class="btn btn-ghost" data-modal-action="import-content">导入内容</button>
      </div>
      <div class="settings-row">
        <div><strong>个性化推荐</strong><small>根据正确率、错题与学习时段给出本地建议</small></div>
        <label class="switch">
          <input type="checkbox" id="setting-personalization" ${state.settings.personalization !== false ? "checked" : ""}>
          <span></span>
        </label>
      </div>
      <h3 class="settings-group-title">关于</h3>
      <div class="settings-row">
        <div><strong>更新日志</strong><small>查看词库修正与功能变更</small></div>
        <button class="btn btn-ghost" data-modal-action="open-changelog">查看</button>
      </div>
      <div class="settings-row">
        <div><strong>图书馆德语资源</strong><small>同济大学图书馆官方德语资源入口</small></div>
        <button class="btn btn-ghost" data-modal-action="open-library-resources">查看</button>
      </div>
      <p class="settings-local-note">学习记录保存在当前浏览器 localStorage（数据结构 v${Number(state.schemaVersion) || 6}，约 ${Math.max(1, Math.round(JSON.stringify(state).length / 1024))} KB）；代码更新不会覆盖它。建议定期导出备份。</p>
    </div>
    <div class="settings-danger">
      <strong>备份与重置</strong>
      <p>导出 JSON 可以换设备继续学；重置只会清空复习进度，保留自定义词卡。</p>
      <div class="settings-actions">
        <button class="btn btn-ghost" data-modal-action="export">${icon("download")} 导出备份</button>
        <button class="btn btn-ghost" data-modal-action="import">导入备份</button>
        <button class="btn btn-danger" data-modal-action="reset-progress">${icon("trash")} 重置进度</button>
      </div>
      <input type="file" id="import-file" accept="application/json,.json" hidden>
      <input type="file" id="content-file" accept=".json,.txt,.md,application/json,text/plain" hidden>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" data-close>取消</button>
      <button class="btn btn-primary" data-modal-action="save-settings">保存设置</button>
    </div>
  `);
}

function addWordFromForm(form) {
  const data = new FormData(form);
  const wordValue = String(data.get("word") || "").trim();
  const translation = String(data.get("translation") || "").trim();
  const pos = String(data.get("pos") || "noun");
  const article = pos === "noun" ? String(data.get("article") || "").trim() : "";
  const morph = String(data.get("morph") || "").trim();

  if (!wordValue || !translation) {
    showToast("单词和中文释义都要填写。");
    return;
  }
  if (pos === "noun" && !article) {
    showToast("名词需要选择一个冠词。");
    return;
  }

  const cleanWord = wordValue.replace(/^(der|die|das)\s+/i, "").trim();
  const custom = {
    id: `custom-${Date.now()}`,
    word: cleanWord,
    article: article || null,
    plural: pos === "noun" ? (morph || null) : null,
    forms: pos === "verb" || pos === "adj" ? morph : "",
    pos,
    translation,
    level: String(data.get("level") || "A1"),
    topic: String(data.get("topic") || "alltag"),
    example: String(data.get("example") || "").trim(),
    exampleZh: String(data.get("exampleZh") || "").trim(),
    note: String(data.get("note") || "").trim(),
    custom: true
  };

  state.customWords.push(custom);
  refreshWordIndex();
  persist();
  closeModal();
  libraryFilters.query = "";
  libraryFilters.level = "all";
  libraryFilters.status = "all";
  libraryFilters.pos = "all";
  renderAll();
  navigate("library");
  showToast(`已添加 ${wordDisplay(custom)}。`);
}

async function extractContent(file) {
  const text = await file.text();
  const trimmed = text.trim();
  if (!trimmed) throw new Error("empty");
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    const parsed = JSON.parse(trimmed);
    return {
      words: Array.isArray(parsed.words) ? parsed.words : [],
      phrases: Array.isArray(parsed.phrases) ? parsed.phrases : [],
      articles: Array.isArray(parsed.articles) ? parsed.articles : [],
      grammar: Array.isArray(parsed.grammar) ? parsed.grammar : []
    };
  }
  const result = { words: [], phrases: [], articles: [], grammar: [] };
  let article = null;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("W|")) {
      const [, word, translation, level = "A1", articleValue = ""] = line.split("|");
      if (word && translation) result.words.push({ word: word.trim(), translation: translation.trim(), level, article: articleValue || null });
    } else if (line.startsWith("P|")) {
      const [, de, zh, example = "", exampleZh = "", level = "A1", category = "导入"] = line.split("|");
      if (de && zh) result.phrases.push({ id: `custom-ph-${Date.now()}-${result.phrases.length}`, de, zh, example, exampleZh, level, category, source: file.name });
    } else if (line.startsWith("A|")) {
      const [, titleDe, titleZh = "", contentDe = "", source = ""] = line.split("|");
      if (titleDe && contentDe) result.articles.push({ id: `custom-art-${Date.now()}-${result.articles.length}`, titleDe, titleZh, contentDe, source: source || file.name, sourceUrl: "", tags: ["导入"], summaryZh: "" });
    } else if (line.startsWith("G|")) {
      const [, title, summary = ""] = line.split("|");
      if (title) result.grammar.push({ id: `custom-grammar-${Date.now()}-${result.grammar.length}`, title, summary });
    }
  }
  if (!result.words.length && !result.phrases.length && !result.articles.length && !result.grammar.length) {
    throw new Error("unsupported");
  }
  return result;
}

async function importContentFile(file) {
  if (!file) return;
  let lastError = null;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const content = await extractContent(file);
      const stamp = Date.now();
      if (content.words.length) {
        state.customWords.push(...content.words.map((item, index) => ({
          id: `custom-import-${stamp}-${index}`,
          word: item.word,
          article: item.article || null,
          plural: item.plural || null,
          forms: item.forms || "",
          pos: item.pos || "noun",
          translation: item.translation || "",
          level: item.level || "A1",
          topic: "imported",
          example: item.example || "",
          exampleZh: item.exampleZh || "",
          source: file.name,
          custom: true
        })));
      }
      if (content.phrases.length) {
        state.customPhrases.push(...content.phrases.map((item, index) => ({
          id: item.id || `custom-ph-${stamp}-${index}`,
          de: item.de || item.word || "",
          zh: item.zh || item.translation || "",
          example: item.example || "",
          exampleZh: item.exampleZh || "",
          level: item.level || "A1",
          category: item.category || "导入",
          source: item.source || file.name
        })).filter(item => item.de && item.zh));
      }
      if (content.articles.length) {
        state.customArticles.push(...content.articles.map((item, index) => ({
          id: item.id || `custom-art-${stamp}-${index}`,
          titleDe: item.titleDe || item.title || "",
          titleZh: item.titleZh || "",
          contentDe: item.contentDe || item.content || "",
          source: item.source || file.name,
          sourceUrl: item.sourceUrl || "",
          tags: item.tags || ["导入"],
          summaryZh: item.summaryZh || ""
        })).filter(item => item.titleDe && item.contentDe));
      }
      if (content.grammar.length) state.customGrammar.push(...content.grammar);
      refreshWordIndex();
      persist();
      renderAll();
      closeModal();
      showToast(`提取成功：单词 ${content.words.length}、短语 ${content.phrases.length}、文章 ${content.articles.length}、语法 ${content.grammar.length}。`);
      return;
    } catch (error) {
      lastError = error;
      if (attempt < 2) await new Promise(resolve => setTimeout(resolve, 250));
    }
  }
  state.meta.extractionFailures = Array.isArray(state.meta.extractionFailures) ? state.meta.extractionFailures : [];
  state.meta.extractionFailures.push({ file: file.name, attempts: 2, failedAt: new Date().toISOString(), reason: String(lastError?.message || "extract-error") });
  persist();
  showToast(`提取失败：${file.name} 已重试 1 次，任务终止。`);
}

function exportState() {
  try {
    const payload = {
      ...state,
      exportedAt: new Date().toISOString(),
      app: "Wortkarte"
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `wortkarte-${dayKey()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
    showToast("备份文件已开始下载。");
  } catch {
    showToast("导出失败：浏览器不允许下载或存储空间不足。");
  }
}

function importStateFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      if (!parsed || typeof parsed !== "object" || !parsed.reviews || !parsed.settings) {
        throw new Error("invalid");
      }
      try {
        localStorage.setItem(`${STORAGE_KEY}.pre-import`, JSON.stringify(state));
      } catch {
        /* 保留导入前快照是尽力而为；即使空间不足也继续导入。 */
      }
      state = normalizeState(parsed);
      refreshWordIndex();
      persist();
      closeModal();
      renderAll();
      navigate("home");
      showToast("备份已导入，继续学习吧。");
    } catch {
      showToast("无法读取这个备份文件，请检查格式。");
    }
  };
  reader.onerror = () => showToast("读取备份文件失败，请重试。");
  reader.readAsText(file);
}

function resetProgress() {
  if (!window.confirm("确定要清空所有复习进度吗？自定义词卡会保留。")) return;
  const settings = { ...state.settings };
  const customWords = [...state.customWords];
  state = freshState();
  state.settings = settings;
  state.customWords = customWords;
  state.meta.demo = false;
  refreshWordIndex();
  persist();
  closeModal();
  renderAll();
  navigate("home");
  showToast("进度已重置。新的节奏，从今天开始。");
}

/* ─────────────────────────── Events ─────────────────────────── */

function renderAll() {
  renderHome();
  renderLibrary();
  renderGrammar();
  renderStats();
  renderChrome();
}

function handleAction(action, element) {
  switch (action) {
    case "close-state": {
      const box = $("#state-detail");
      if (box) box.hidden = true;
      $$(".map-state.is-active").forEach(item => item.classList.remove("is-active"));
      break;
    }
    case "open-state-map":
      openStateMap(element.dataset.stateId);
      break;
    case "state-city":
      closeModal();
      renderCityDetail(element.dataset.cityId);
      break;
    case "start-daily":
      startStudy({ mode: "daily", limit: Math.min(100, Math.max(5, Number(state.settings.dailyGoal) || 20)) });
      break;
    case "quick-review":
      startStudy({ mode: "review", limit: 20 });
      break;
    case "quick-new":
      startStudy({ mode: "new", limit: 10 });
      break;
    case "start-topic":
      startStudy({ mode: "daily", topicId: element.dataset.topic, limit: 10 });
      break;
    case "start-weak":
      startStudy({ mode: "weak", limit: 8 });
      break;
    case "add-word":
      openAddWordModal();
      break;
    case "open-dictionary":
      openDictionaryModal();
      break;
    case "open-changelog":
      openChangelogModal();
      break;
    case "open-grammar-book":
      openGrammarBook();
      break;
    case "close-article":
      renderReading();
      try {
        history.replaceState(null, "", "#lesen");
      } catch {
        /* ignore embedded webview */
      }
      break;
    case "article-quiz": {
      const article = allArticles().find(item => item.id === element.dataset.articleId);
      const level = article ? gradeArticle(article).level : "all";
      startBankQuiz("articles", "de-zh", level);
      break;
    }
    case "start-pack":
      startPackStudy();
      break;
    case "settings":
      openSettingsModal();
      break;
    case "exit-study":
      exitStudy();
      break;
    case "study-again":
      if (session) {
        startStudy({ mode: session.mode, topicId: session.topicId, limit: session.limit });
      } else {
        startStudy({ mode: "daily", limit: Math.min(100, Math.max(5, Number(state.settings.dailyGoal) || 20)) });
      }
      break;
    case "spell-submit":
      submitSpell();
      break;
    case "downgrade-level":
      downgradeCurrentWord();
      break;
    case "exam-reveal":
      revealExamCard();
      break;
    case "study-next":
      advanceStudy();
      break;
    case "calendar-prev":
      calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() - 1, 1);
      renderCalendar();
      break;
    case "calendar-next":
      calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + 1, 1);
      renderCalendar();
      break;
    case "export-ics":
      exportCalendar();
      break;
    case "start-reminder":
      closeModal();
      startStudy({ mode: "daily", limit: Math.min(100, Math.max(5, Number(state.settings.dailyGoal) || 20)) });
      break;
    case "speak-card":
      speakCurrentWord(element);
      break;
    case "speak-word": {
      const spoken = getWord(element.dataset.wordId);
      if (spoken) speakText(wordDisplay(spoken), element);
      break;
    }
    case "speak-quiz":
      if (quiz.questions[quiz.index]) speakText(wordDisplay(quiz.questions[quiz.index].word), element);
      break;
    case "study-level": {
      const level = libraryFilters.level === "all" ? "A1" : libraryFilters.level;
      startStudy({ mode: "new", level, limit: 20 });
      break;
    }
    case "show-today-words":
      openTodayWordsModal();
      break;
    case "close-today-words":
      closeModal();
      break;
    case "recite-words":
      openWordRecite();
      break;
    case "clear-filters":
      libraryFilters.query = "";
      libraryFilters.level = "all";
      libraryFilters.status = "all";
      libraryFilters.pos = "all";
      libraryFilters.article = "all";
      libraryFilters.sort = "default";
      libraryVisibleLimit = 80;
      renderLibrary();
      break;
    case "library-more":
      libraryVisibleLimit += 160;
      renderLibrary();
      break;
    case "quit-quiz":
      quitQuiz();
      break;
    case "quiz-retry":
      if (quiz.mode === "bank" && quiz.bankConfig) {
        startBankQuiz(quiz.bankConfig.category, quiz.bankConfig.type, quiz.bankConfig.level);
      } else {
        startQuiz();
      }
      break;
    case "start-weekly-quiz":
      startWeeklyQuiz();
      break;
    case "skip-weekly-quiz":
      skipWeeklyQuiz();
      break;
    case "start-repeat":
      startRepeatReview();
      break;
    default:
      break;
  }
}

function bindEvents() {
  document.addEventListener("click", event => {
    const externalLink = event.target.closest('a[href^="http"]');
    if (externalLink && isStandaloneMode()) {
      event.preventDefault();
      openExternalLink(externalLink.href);
      return;
    }

    const nav = event.target.closest("[data-nav]");
    if (nav) {
      event.preventDefault();
      navigate(nav.dataset.nav);
      return;
    }

    const actionEl = event.target.closest("[data-action]");
    if (actionEl) {
      event.preventDefault();
      runWithFallback("操作", () => handleAction(actionEl.dataset.action, actionEl));
      return;
    }

    const levelEl = event.target.closest("#rating-bar [data-level]");
    if (levelEl) {
      rateCard(Number(levelEl.dataset.level));
      return;
    }

    const ratingEl = event.target.closest("[data-rating]");
    if (ratingEl) {
      rateCard(ratingEl.dataset.rating);
      return;
    }

    const examOption = event.target.closest("[data-exam-option]");
    if (examOption) {
      answerExam(Number(examOption.dataset.examOption));
      return;
    }

    const quizModeEl = event.target.closest("[data-quiz-mode]");
    if (quizModeEl) {
      selectQuizMode(quizModeEl.dataset.quizMode);
      return;
    }

    const quizOption = event.target.closest("[data-quiz-option]");
    if (quizOption && !quizOption.disabled) {
      answerQuiz(Number(quizOption.dataset.quizOption));
      return;
    }

    const phraseReciteStart = event.target.closest("[data-phrase-recite]");
    if (phraseReciteStart) {
      event.preventDefault();
      openPhraseRecite(phraseReciteStart.dataset.phraseRecite);
      return;
    }

    const phraseAction = event.target.closest("[data-phrase-action]");
    if (phraseAction) {
      event.preventDefault();
      const action = phraseAction.dataset.phraseAction;
      if (action === "close") closePhraseRecite();
      else if (action === "prev") movePhraseRecite(-1);
      else if (action === "next") movePhraseRecite(1);
      else if (action === "reveal") togglePhraseReciteAnswer();
      else if (action === "shuffle") shufflePhraseRecite();
      return;
    }

    const phraseClose = event.target.closest("[data-phrase-close]");
    if (phraseClose) {
      closePhraseRecite();
      return;
    }

    const wordReciteStatus = event.target.closest("[data-word-recite-status]");
    if (wordReciteStatus) {
      event.preventDefault();
      setWordReciteMode(wordReciteStatus.dataset.wordReciteStatus);
      return;
    }

    const wordAction = event.target.closest("[data-word-action]");
    if (wordAction) {
      event.preventDefault();
      const action = wordAction.dataset.wordAction;
      if (action === "close") closeWordRecite();
      else if (action === "prev") moveWordRecite(-1);
      else if (action === "next") moveWordRecite(1);
      else if (action === "reveal") toggleWordReciteAnswer();
      else if (action === "shuffle") shuffleWordRecite();
      return;
    }

    const wordReciteClose = event.target.closest("[data-word-recite-close]");
    if (wordReciteClose) {
      closeWordRecite();
      return;
    }

    const libraryStatus = event.target.closest("[data-library-status]");
    if (libraryStatus) {
      const status = libraryStatus.dataset.libraryStatus;
      libraryFilters.status = libraryFilters.status === status ? "all" : status;
      libraryVisibleLimit = 80;
      renderLibrary();
      $("#library-body")?.closest("table")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const progressLevel = event.target.closest("[data-progress-level]");
    if (progressLevel) {
      const level = progressLevel.dataset.progressLevel;
      libraryFilters.level = libraryFilters.level === level ? "all" : level;
      libraryVisibleLimit = 80;
      renderLibrary();
      return;
    }

    const homeLevel = event.target.closest("[data-home-level]");
    if (homeLevel) {
      state.settings.dailyLevel = homeLevel.dataset.homeLevel;
      persist();
      renderHome();
      showToast(homeLevel.dataset.homeLevel === "all" ? "每日单词：全部难度" : `每日单词已切换到 ${homeLevel.dataset.homeLevel}`);
      return;
    }

    const levelChip = event.target.closest("#level-filter [data-level]");
    if (levelChip) {
      libraryFilters.level = levelChip.dataset.level;
      libraryVisibleLimit = 80;
      renderLibrary();
      return;
    }

    const articleChip = event.target.closest("#article-filter [data-article]");
    if (articleChip) {
      libraryFilters.article = articleChip.dataset.article;
      libraryVisibleLimit = 80;
      renderLibrary();
      return;
    }

    const grammarLevelChip = event.target.closest("#grammar-filter [data-grammar-level]");
    if (grammarLevelChip) {
      grammarLevel = grammarLevelChip.dataset.grammarLevel;
      renderGrammar();
      return;
    }

    const festivalJump = event.target.closest("[data-festival-jump]");
    if (festivalJump) {
      jumpToFestivalCulture(festivalJump.dataset.festivalJump);
      return;
    }

    const festivalEvent = event.target.closest("[data-festival-id]");
    if (festivalEvent) {
      renderFestivalDetail(festivalEvent.dataset.festivalId);
      return;
    }

    const mapCity = event.target.closest("[data-city-id]");
    if (mapCity) {
      renderCityDetail(mapCity.dataset.cityId);
      return;
    }

    const cultureChip = event.target.closest("#culture-filter [data-culture-category]");
    if (cultureChip) {
      cultureCategory = cultureChip.dataset.cultureCategory;
      cultureEra = "all";
      cultureTheme = "all";
      renderCulture();
      return;
    }

    const cultureThemeChip = event.target.closest("#culture-theme-filter [data-culture-theme]");
    if (cultureThemeChip) {
      cultureTheme = cultureThemeChip.dataset.cultureTheme;
      renderCulture();
      return;
    }

    const cultureEraButton = event.target.closest("[data-culture-era]");
    if (cultureEraButton) {
      cultureEra = cultureEraButton.dataset.cultureEra;
      renderCulture();
      return;
    }

    const readingLevelChip = event.target.closest("#reading-level-filter [data-reading-level]");
    if (readingLevelChip) {
      readingLevel = readingLevelChip.dataset.readingLevel;
      renderReading();
      return;
    }

    const readingCard = event.target.closest("[data-article-id]");
    if (readingCard && !event.target.closest("[data-action]")) {
      openArticle(readingCard.dataset.articleId);
      return;
    }

    const grammarOption = event.target.closest("[data-grammar-option]");
    if (grammarOption && !grammarOption.disabled) {
      answerGrammar(grammarOption);
      return;
    }

    const grammarCard = event.target.closest("[data-grammar-id]");
    if (grammarCard) {
      openGrammarModal(grammarCard.dataset.grammarId);
      return;
    }

    const startWord = event.target.closest("[data-start-word]");
    if (startWord) {
      startStudy({ mode: "daily", limit: Math.min(100, Math.max(5, Number(state.settings.dailyGoal) || 20)), wordId: startWord.dataset.startWord });
      return;
    }

    const wordRow = event.target.closest("[data-word-row]");
    if (wordRow) {
      openWordModal(wordRow.dataset.wordRow);
      return;
    }
  });

  $("#flashcard")?.addEventListener("click", event => {
    if (event.target.closest("button")) return;
    flipCard();
  });

  $("#hero-cta")?.addEventListener("click", () => {
    runWithFallback("开始学习", () => startStudy({ mode: "daily", limit: Math.min(100, Math.max(5, Number(state.settings.dailyGoal) || 20)) }));
  });

  $("#library-search")?.addEventListener("input", event => {
    libraryFilters.query = event.target.value;
    libraryVisibleLimit = 80;
    renderLibrary();
  });

  $("#phrase-search")?.addEventListener("input", event => {
    phraseQuery = event.target.value;
    renderPhrases();
  });

  $("#culture-search")?.addEventListener("input", event => {
    cultureQuery = event.target.value;
    renderCulture();
  });

  $("#reading-search")?.addEventListener("input", event => {
    readingQuery = event.target.value;
    renderReading();
  });

  $("#bank-start")?.addEventListener("click", () => {
    runWithFallback("开始练习", () => startBankQuiz(
      $("#bank-category")?.value || "all",
      $("#bank-type")?.value || "mixed",
      $("#bank-level")?.value || "all"
    ));
  });

  $("#global-search")?.addEventListener("input", event => {
    libraryFilters.query = event.target.value;
    libraryVisibleLimit = 80;
    if (!$("#view-library").classList.contains("is-active") && event.target.value.trim()) {
      navigate("library");
    } else {
      renderLibrary();
    }
  });

  $("#global-search")?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      navigate("library");
    }
    if (event.key === "Escape") {
      event.target.value = "";
      libraryFilters.query = "";
      renderLibrary();
      event.target.blur();
    }
  });

  $("#status-filter")?.addEventListener("change", event => {
    libraryFilters.status = event.target.value;
    libraryVisibleLimit = 80;
    renderLibrary();
  });

  $("#pos-filter")?.addEventListener("change", event => {
    libraryFilters.pos = event.target.value;
    libraryVisibleLimit = 80;
    renderLibrary();
  });

  $("#sort-filter")?.addEventListener("change", event => {
    libraryFilters.sort = event.target.value;
    libraryVisibleLimit = 80;
    renderLibrary();
  });

  $("#quiz-start")?.addEventListener("click", () => runWithFallback("开始测验", startQuiz));
  $("#quiz-level")?.addEventListener("change", event => {
    quiz.level = event.target.value;
  });
  $("#quiz-next")?.addEventListener("click", nextQuizQuestion);

  $("#word-of-day")?.addEventListener("keydown", event => {
    if ((event.key === "Enter" || event.key === " ") && event.currentTarget.dataset.startWord) {
      event.preventDefault();
      startStudy({ mode: "daily", limit: Math.min(100, Math.max(5, Number(state.settings.dailyGoal) || 20)), wordId: event.currentTarget.dataset.startWord });
    }
  });

  const modalRoot = $("#modal-root");
  modalRoot?.addEventListener("click", event => {
    if (event.target === modalRoot) {
      closeModal();
      return;
    }
    if (event.target.closest("[data-close]")) {
      closeModal();
      return;
    }

    const jump = event.target.closest("[data-grammar-jump]");
    if (jump) {
      const target = document.getElementById(jump.dataset.grammarJump);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const actionEl = event.target.closest("[data-modal-action]");
    if (!actionEl) return;
    const action = actionEl.dataset.modalAction;
    const wordId = actionEl.dataset.wordId;

    if (action === "study" && wordId) {
      closeModal();
      startStudy({ mode: "daily", limit: Math.min(100, Math.max(5, Number(state.settings.dailyGoal) || 20)), wordId });
    } else if (action === "favorite" && wordId) {
      if (state.favorites.includes(wordId)) {
        state.favorites = state.favorites.filter(id => id !== wordId);
        showToast("已取消收藏。");
      } else {
        state.favorites.push(wordId);
        showToast("已加入收藏。");
      }
      persist();
      openWordModal(wordId);
      renderLibrary();
    } else if (action === "delete-word" && wordId) {
      if (!window.confirm("确定删除这张自定义词卡吗？")) return;
      state.customWords = state.customWords.filter(word => word.id !== wordId);
      delete state.reviews[wordId];
      delete state.mistakes[wordId];
      delete state.mistakeTypes[wordId];
      state.favorites = state.favorites.filter(id => id !== wordId);
      refreshWordIndex();
      persist();
      closeModal();
      renderAll();
      showToast("词卡已删除。");
    } else if (action === "save-settings") {
      const name = String($("#setting-name")?.value || "").trim() || "Lena";
      const goal = Math.max(5, Math.min(100, Number($("#setting-goal")?.value) || 20));
      const sound = Boolean($("#setting-sound")?.checked);
      const reminderEnabled = Boolean($("#setting-reminder-enabled")?.checked);
      const reminderTime = String($("#setting-reminder-time")?.value || "20:00");
      const theme = String($("#setting-theme")?.value || "warm");
      const accent = String($("#setting-accent")?.value || "");
      const quizDifficulty = String($("#setting-quiz-difficulty")?.value || "standard");
      const weeklyQuizEnabled = Boolean($("#setting-weekly-quiz")?.checked);
      const repeatIntervalMin = Math.max(10, Math.min(120, Number($("#setting-repeat-interval")?.value) || 30));
      const personalization = Boolean($("#setting-personalization")?.checked);
      if (!/^\d{2}:\d{2}$/.test(reminderTime)) {
        showToast("提醒时间格式应为 HH:MM。");
        return;
      }
      state.settings = { ...state.settings, name, dailyGoal: goal, sound, reminderEnabled, reminderTime, theme, accent, quizDifficulty, weeklyQuizEnabled, repeatIntervalMin, personalization };
      applyTheme();
      if (reminderEnabled) state.meta.reminderShown = "";
      persist();
      closeModal();
      renderAll();
      showToast(reminderEnabled ? `设置已保存。每天 ${reminderTime} 检查一次到期复习。` : "设置已保存。");
    } else if (action === "export") {
      exportState();
    } else if (action === "import") {
      $("#import-file")?.click();
    } else if (action === "import-content") {
      $("#content-file")?.click();
    } else if (action === "open-changelog") {
      closeModal();
      setTimeout(openChangelogModal, 30);
    } else if (action === "open-library-resources") {
      openLibraryResourcesModal();
    } else if (action === "open-dictionary") {
      closeModal();
      setTimeout(openDictionaryModal, 30);
    } else if (action === "import-pack" && actionEl.dataset.level) {
      importDictionaryLevels([actionEl.dataset.level]);
    } else if (action === "import-all-packs") {
      const status = packStatus();
      if (status) importDictionaryLevels(status.levels.map(item => item.level));
    } else if (action === "reset-progress") {
      resetProgress();
    }
  });

  modalRoot?.addEventListener("submit", event => {
    const form = event.target.closest("[data-form='add-word']");
    if (!form) return;
    event.preventDefault();
    addWordFromForm(form);
  });

  modalRoot?.addEventListener("change", event => {
    if (event.target.id === "import-file") {
      importStateFile(event.target.files?.[0]);
    }
    if (event.target.id === "content-file") {
      importContentFile(event.target.files?.[0]);
    }
  });

  document.addEventListener("keydown", event => {
    const target = event.target;
    const typing = target instanceof HTMLElement &&
      (target.matches("input, textarea, select") || target.isContentEditable);

    if (phraseRecite.open) {
      if (event.key === "Escape") {
        event.preventDefault();
        closePhraseRecite();
        return;
      }
      if (!typing && event.key === "ArrowRight") {
        event.preventDefault();
        movePhraseRecite(1);
        return;
      }
      if (!typing && event.key === "ArrowLeft") {
        event.preventDefault();
        movePhraseRecite(-1);
        return;
      }
      if (!typing && (event.key === " " || event.key === "Enter")) {
        event.preventDefault();
        if (event.key === "Enter" && phraseRecite.revealed) movePhraseRecite(1);
        else togglePhraseReciteAnswer();
        return;
      }
    }

    if (wordRecite.open) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeWordRecite();
        return;
      }
      if (!typing && event.key === "ArrowRight") {
        event.preventDefault();
        moveWordRecite(1);
        return;
      }
      if (!typing && event.key === "ArrowLeft") {
        event.preventDefault();
        moveWordRecite(-1);
        return;
      }
      if (!typing && (event.key === " " || event.key === "Enter")) {
        event.preventDefault();
        if (event.key === "Enter" && wordRecite.revealed) moveWordRecite(1);
        else toggleWordReciteAnswer();
        return;
      }
    }

    if (!typing && (event.key === "Enter" || event.key === " ")) {
      const city = target.closest?.("[data-city-id]");
      if (city) {
        event.preventDefault();
        renderCityDetail(city.dataset.cityId);
        return;
      }
    }

    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      const global = $("#global-search");
      if (global && global.offsetParent !== null) {
        global.focus();
        global.select();
      } else {
        navigate("library");
        $("#library-search")?.focus();
      }
      return;
    }

    if (event.key === "Escape") {
      if (!modalRoot.hidden) {
        closeModal();
        return;
      }
      if ($("#view-study").classList.contains("is-active")) {
        exitStudy();
        return;
      }
      if ($("#view-quiz").classList.contains("is-active") && quiz.active) {
        quitQuiz();
        return;
      }
    }

    if (session?.phase === "exam" && session.exam?.form === "spell" && target?.id === "exam-spell-input" && event.key === "Enter") {
      event.preventDefault();
      submitSpell();
      return;
    }

    if (!modalRoot.hidden || typing) return;

    if ($("#view-study").classList.contains("is-active") && session) {
      if (session.firstEncounter && session.phase === "card") {
        if (event.code === "Space") {
          event.preventDefault();
          flipCard();
          return;
        }
        if (["0", "1", "2", "3", "4", "5"].includes(event.key)) {
          event.preventDefault();
          rateCard(Number(event.key));
          return;
        }
      }
      if (session.phase === "exam") {
        if (!session.exam?.answered && session.exam?.form !== "spell" && ["1", "2", "3", "4"].includes(event.key)) {
          event.preventDefault();
          answerExam(Number(event.key) - 1);
          return;
        }
        if (session.exam?.answered && event.key === "Enter") {
          event.preventDefault();
          revealExamCard();
        }
        return;
      }
      if (event.key === "Enter" && session.exam?.answered) {
        event.preventDefault();
        advanceStudy();
        return;
      }
    }

    if ($("#view-quiz").classList.contains("is-active") && quiz.active) {
      if (!quiz.answered && ["1", "2", "3", "4"].includes(event.key)) {
        const index = Number(event.key) - 1;
        if (index < quiz.questions[quiz.index].options.length) {
          event.preventDefault();
          answerQuiz(index);
        }
      } else if (quiz.answered && event.key === "Enter") {
        event.preventDefault();
        nextQuizQuestion();
      }
    }
  });

  window.addEventListener("beforeunload", () => {
    if (session && !session.finished) persist();
  });
}

/* ─────────────────────────── Init ─────────────────────────── */

function init() {
  applyTheme();
  refreshWordIndex();
  bindEvents();
  bindCultureTimelineDrag();
  renderAll();
  resetQuizSetup();
  const initialPhraseRecite = new URLSearchParams(location.search || "").get("phrases");
  if (initialPhraseRecite && PHRASE_DIFFICULTY_ORDER.includes(initialPhraseRecite.toUpperCase())) {
    openPhraseRecite(initialPhraseRecite.toUpperCase());
  }
  const deepArticle = articleFromHash();
  if (deepArticle) {
    navigate("reading");
    openArticle(deepArticle);
  } else {
    const initialView = new URLSearchParams(location.search || "").get("view");
    if (initialView && VIEW_LABELS[initialView]) navigate(initialView);
    const initialCulture = new URLSearchParams(location.search || "").get("category");
    if (initialCulture && ["all", "history", "culture", "map", "person"].includes(initialCulture)) {
      cultureCategory = initialCulture;
      renderCulture();
    }
    const initialCity = new URLSearchParams(location.search || "").get("city");
    if (initialCity) renderCityDetail(initialCity);
    const initialMapZoom = Number(new URLSearchParams(location.search || "").get("mapzoom"));
    if (Number.isFinite(initialMapZoom) && initialMapZoom > 1 && cultureCategory === "map") {
      const svg = $("#culture-map-svg");
      if (svg) {
        const rect = svg.getBoundingClientRect();
        mapZoomAt(clampNumber(initialMapZoom, 1, 4.5), rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    }
    const initialTheme = new URLSearchParams(location.search || "").get("theme");
    if (initialTheme) {
      cultureTheme = initialTheme;
      renderCulture();
    }
    const initialFestival = new URLSearchParams(location.search || "").get("festival");
    if (initialFestival) renderFestivalDetail(initialFestival);
  }
  const standalone = isStandaloneMode();
  document.documentElement.dataset.displayMode = standalone ? "standalone" : "browser";
  try {
    window.matchMedia?.("(display-mode: standalone)")?.addEventListener?.("change", event => {
      document.documentElement.dataset.displayMode = event.matches ? "standalone" : "browser";
    });
  } catch {
    /* matchMedia is optional in some embedded webviews */
  }
  window.addEventListener("error", event => {
    if (!event?.error) return;
    console.error("Unhandled app error", event.error);
    showToast("操作失败，请重试。");
  });
  window.addEventListener("unhandledrejection", event => {
    console.error("Unhandled promise rejection", event.reason);
    showToast("操作失败，请重试。");
  });
  startReminderLoop();
  const todayWeekday = new Date().getDay();
  if (todayWeekday === 1) {
    // A tiny Monday greeting; harmless if the element is absent.
    document.documentElement.dataset.weekday = "monday";
  }
  if (storageRecoveryMode) {
    setTimeout(() => showToast("旧学习记录未能读取，原始数据已保留；为避免覆盖，已暂停写入。"), 600);
  } else if (storageRecoveredFromBackup) {
    setTimeout(() => showToast("旧学习记录格式异常，已保留备份并以新状态启动。"), 600);
  }
}

if (window.__DEHELPER_READY) {
  window.__DEHELPER_READY.then(pack => {
    if (pack) applyDehelperPack(pack);
    init();
  }).catch(error => {
    console.error("Dehelper pack failed", error);
    init();
  });
} else {
  init();
}

















