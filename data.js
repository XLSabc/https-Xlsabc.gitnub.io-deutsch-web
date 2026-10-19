/* Wortkarte – curated German vocabulary
   ︎ 70 hand-checked words across five everyday topics.
   Fields: article (nouns only), plural (null = no plural), forms (verbs/adjectives),
   level, topic, example, exampleZh, note. */

const TOPICS = [
  {
    id: "alltag",
    name: "日常与习惯",
    de: "Alltag & Routinen",
    desc: "把一天里最常用的词，变成顺口的习惯。",
    icon: "home",
    color: "#C55D3B",
    soft: "#F5DED2",
    letter: "A"
  },
  {
    id: "gefuehle",
    name: "情绪与关系",
    de: "Menschen & Gefühle",
    desc: "说出那些难以言明的感受与连接。",
    icon: "heart",
    color: "#A64F5D",
    soft: "#F3DDE0",
    letter: "G"
  },
  {
    id: "reisen",
    name: "旅行与自然",
    de: "Reisen & Natur",
    desc: "从城市街角，到森林与海岸的风。",
    icon: "compass",
    color: "#3D6C83",
    soft: "#DCE9EE",
    letter: "R"
  },
  {
    id: "lernen",
    name: "学习与工作",
    de: "Lernen & Arbeit",
    desc: "关于专注、进步和一次次小小的突破。",
    icon: "book",
    color: "#406A4D",
    soft: "#DDE8DD",
    letter: "L"
  },
  {
    id: "zeit",
    name: "时间与改变",
    de: "Zeit & Wandel",
    desc: "在当下停留一会儿，然后继续向前。",
    icon: "hourglass",
    color: "#9E7739",
    soft: "#F0E4C9",
    letter: "Z"
  },
  {
    id: "goethe",
    name: "歌德证书词汇",
    de: "Goethe-Zertifikat A1–B1",
    desc: "从歌德学院官方词表导入，按等级逐步扩展。",
    icon: "book",
    color: "#4D6178",
    soft: "#E3E7EE",
    letter: "G",
    isPack: true
  },
  {
    id: "xqj",
    name: "新求精词汇",
    de: "Stichwort Deutsch",
    desc: "来自《新求精德语强化教程》词汇练习册的课文词汇。",
    icon: "grammar",
    color: "#7B5C4E",
    soft: "#EFE2DA",
    letter: "S",
    isTextbook: true
  }
];

const WORDS = [
  /* ── Alltag & Routinen ───────────────────────────────────────── */
  {
    id: "alltag-01", word: "Alltag", article: "der", plural: null, pos: "noun",
    translation: "日常生活；平日", level: "A1", topic: "alltag",
    example: "Mein Alltag beginnt meistens um sieben Uhr.",
    exampleZh: "我的日常生活通常七点开始。",
    note: "All + Tag，字面就是“每一天”。把 routine 过成 Alltag，靠的不是意志力，而是重复。"
  },
  {
    id: "alltag-02", word: "Termin", article: "der", plural: "die Termine", pos: "noun",
    translation: "预约；约见", level: "A1", topic: "alltag",
    example: "Ich habe morgen einen Termin beim Zahnarzt.",
    exampleZh: "我明天有一个牙医预约。",
    note: "日历上那个不能忘的点。德语里和 Arzt、Friseur 搭配时，介词常用 beim。"
  },
  {
    id: "alltag-03", word: "Wohnung", article: "die", plural: "die Wohnungen", pos: "noun",
    translation: "公寓；住处", level: "A1", topic: "alltag",
    example: "Unsere Wohnung liegt im dritten Stock.",
    exampleZh: "我们的公寓在三楼。",
    note: "wohnen（居住）+ -ung。德国找房常说 Wohnungssuche，一个很长的复合词。"
  },
  {
    id: "alltag-04", word: "Schlüssel", article: "der", plural: "die Schlüssel", pos: "noun",
    translation: "钥匙", level: "A1", topic: "alltag",
    example: "Ohne Schlüssel komme ich nicht in die Wohnung.",
    exampleZh: "没有钥匙我进不了公寓。",
    note: "单复数同形：der Schlüssel / die Schlüssel。小细节，考试很爱考。"
  },
  {
    id: "alltag-05", word: "Fenster", article: "das", plural: "die Fenster", pos: "noun",
    translation: "窗户", level: "A1", topic: "alltag",
    example: "Bitte öffne das Fenster, hier ist es warm.",
    exampleZh: "请打开窗户，这里有点热。",
    note: "中性名词，单复数同形。德语里“打开窗户”用 öffnen，不用 aufmachen 也可以。"
  },
  {
    id: "alltag-06", word: "Einkauf", article: "der", plural: "die Einkäufe", pos: "noun",
    translation: "采购；购物", level: "A1", topic: "alltag",
    example: "Der Einkauf hat länger gedauert als geplant.",
    exampleZh: "这次采购比计划花的时间更长。",
    note: "从 einkaufen 来的阳性名词。einkaufen 是动作，der Einkauf 是这件事本身。"
  },
  {
    id: "alltag-07", word: "Gewohnheit", article: "die", plural: "die Gewohnheiten", pos: "noun",
    translation: "习惯", level: "A2", topic: "alltag",
    example: "Eine gute Gewohnheit braucht etwa drei Wochen.",
    exampleZh: "养成一个好习惯大约需要三周。",
    note: "gewohnt（习惯的）+ -heit。和英语 habit 一样，关键是“重复”而不是“完美”。"
  },
  {
    id: "alltag-08", word: "Feierabend", article: "der", plural: null, pos: "noun",
    translation: "下班；收工后的时间", level: "A2", topic: "alltag",
    example: "Endlich Feierabend – ich mache heute früher Schluss.",
    exampleZh: "终于下班了——我今天早点收工。",
    note: "德国生活的关键词：工作结束后的私人时间。nach Feierabend 是固定说法。"
  },
  {
    id: "alltag-09", word: "Mahlzeit", article: "die", plural: "die Mahlzeiten", pos: "noun",
    translation: "一餐；用餐", level: "A2", topic: "alltag",
    example: "Die Mahlzeit war einfach, aber wirklich köstlich.",
    exampleZh: "这顿饭很简单，但真的很好吃。",
    note: "在德国工地上或食堂里，Mahlzeit! 也可以当作“用餐愉快”的招呼。"
  },
  {
    id: "alltag-10", word: "Haushalt", article: "der", plural: "die Haushalte", pos: "noun",
    translation: "家务；家庭", level: "A2", topic: "alltag",
    example: "Wir teilen uns den Haushalt gerecht.",
    exampleZh: "我们公平地分担家务。",
    note: "Haus + halten，原本是“持家”。既可以指家务，也可以指家庭单位。"
  },
  {
    id: "alltag-11", word: "Nachbarschaft", article: "die", plural: "die Nachbarschaften", pos: "noun",
    translation: "邻里；街坊", level: "B1", topic: "alltag",
    example: "In unserer Nachbarschaft kennt man sich noch.",
    exampleZh: "在我们这个街区，大家还互相认识。",
    note: "Nachbar（邻居）+ -schaft，表示一个整体关系。和英语 neighbourhood 类似。"
  },
  {
    id: "alltag-12", word: "Geräusch", article: "das", plural: "die Geräusche", pos: "noun",
    translation: "声响；动静", level: "B1", topic: "alltag",
    example: "Ein leises Geräusch weckte mich mitten in der Nacht.",
    exampleZh: "深夜，一个轻微的声响把我吵醒了。",
    note: "Geräusch 是中性的“声音”，Lärm 是扰人的“噪音”。一个中性，一个带情绪。"
  },
  {
    id: "alltag-13", word: "Gemütlichkeit", article: "die", plural: null, pos: "noun",
    translation: "舒适惬意；温馨氛围", level: "B1", topic: "alltag",
    example: "Das kleine Café verbreitet eine wunderbare Gemütlichkeit.",
    exampleZh: "这家小咖啡馆散发着一种美妙的惬意。",
    note: "很难直译的德语文化词。它不只是“舒服”，还有温暖、放松、被包住的感觉。"
  },
  {
    id: "alltag-14", word: "Rhythmus", article: "der", plural: "die Rhythmen", pos: "noun",
    translation: "节奏；规律", level: "B2", topic: "alltag",
    example: "Jeder Mensch hat seinen eigenen Rhythmus.",
    exampleZh: "每个人都有自己的节奏。",
    note: "来自希腊语，重音在第一音节：RHYTH-mus。学语言也需要找到自己的节奏。"
  },

  /* ── Menschen & Gefühle ─────────────────────────────────────── */
  {
    id: "gefuehle-01", word: "Freund", article: "der", plural: "die Freunde", pos: "noun",
    translation: "朋友；男友", level: "A1", topic: "gefuehle",
    example: "Mein bester Freund wohnt seit Jahren in Hamburg.",
    exampleZh: "我最好的朋友在汉堡住了很多年。",
    note: "der Freund 可以指男性朋友，也可能是男朋友；语境很重要。女性朋友是 die Freundin。"
  },
  {
    id: "gefuehle-02", word: "Gefühl", article: "das", plural: "die Gefühle", pos: "noun",
    translation: "感觉；情感", level: "A1", topic: "gefuehle",
    example: "Ich habe kein gutes Gefühl bei dieser Entscheidung.",
    exampleZh: "我对这个决定感觉不太好。",
    note: "fühlen（感觉）的名词，中性。ein gutes Gefühl haben 是很常用的表达。"
  },
  {
    id: "gefuehle-03", word: "Freude", article: "die", plural: "die Freuden", pos: "noun",
    translation: "喜悦；快乐", level: "A1", topic: "gefuehle",
    example: "Die Freude über das Wiedersehen war groß.",
    exampleZh: "重逢的喜悦非常强烈。",
    note: "sich freuen 是“感到高兴”，die Freude 是那份高兴本身。介词常用 über + Akk.。"
  },
  {
    id: "gefuehle-04", word: "Liebe", article: "die", plural: null, pos: "noun",
    translation: "爱；爱情", level: "A1", topic: "gefuehle",
    example: "Liebe zeigt sich oft in kleinen Gesten.",
    exampleZh: "爱常常体现在小小的举动里。",
    note: "lieben 的名词。Ich liebe dich 是“我爱你”；喜欢某样东西更常用 Ich mag ..."
  },
  {
    id: "gefuehle-05", word: "Mut", article: "der", plural: null, pos: "noun",
    translation: "勇气", level: "A2", topic: "gefuehle",
    example: "Es braucht Mut, um Hilfe zu bitten.",
    exampleZh: "开口求助也需要勇气。",
    note: "形容词是 mutig。德语里 Mut 常和 fassen（鼓起）搭配：Mut fassen。"
  },
  {
    id: "gefuehle-06", word: "Neugier", article: "die", plural: null, pos: "noun",
    translation: "好奇心", level: "A2", topic: "gefuehle",
    example: "Aus Neugier öffnete sie die alte Truhe.",
    exampleZh: "出于好奇，她打开了那只旧箱子。",
    note: "neugierig 是“好奇的”。die Neugier 不可数，介词用 aus：aus Neugier（出于好奇）。"
  },
  {
    id: "gefuehle-07", word: "Vertrauen", article: "das", plural: null, pos: "noun",
    translation: "信任", level: "A2", topic: "gefuehle",
    example: "Vertrauen wächst langsam und zerbricht schnell.",
    exampleZh: "信任建立得很慢，破碎得却很快。",
    note: "动词是 vertrauen + Dat.：Ich vertraue dir。名词 das Vertrauen，不可数。"
  },
  {
    id: "gefuehle-08", word: "Erinnerung", article: "die", plural: "die Erinnerungen", pos: "noun",
    translation: "记忆；回忆", level: "A2", topic: "gefuehle",
    example: "Diese Erinnerung begleitet mich seit Jahren.",
    exampleZh: "这段回忆陪伴了我很多年。",
    note: "erinnern + -ung。sich an + Akk. erinnern 是“想起”。记忆是会被反复改写的。"
  },
  {
    id: "gefuehle-09", word: "Gedanke", article: "der", plural: "die Gedanken", pos: "noun",
    translation: "想法；念头", level: "B1", topic: "gefuehle",
    example: "Ein Gedanke ließ mich die ganze Nacht nicht los.",
    exampleZh: "一个念头让我整夜无法释怀。",
    note: "来自 denken，复数 die Gedanken，词尾是 -n。一个念头，可以比事实活得更久。"
  },
  {
    id: "gefuehle-10", word: "Entscheidung", article: "die", plural: "die Entscheidungen", pos: "noun",
    translation: "决定", level: "B1", topic: "gefuehle",
    example: "Die Entscheidung fiel ihr sichtlich schwer.",
    exampleZh: "这个决定显然让她很为难。",
    note: "entscheiden + -ung。eine Entscheidung treffen 是“做决定”的固定搭配。"
  },
  {
    id: "gefuehle-11", word: "Zweifel", article: "der", plural: "die Zweifel", pos: "noun",
    translation: "怀疑；疑虑", level: "B1", topic: "gefuehle",
    example: "Ohne Zweifel ist das der richtige Weg.",
    exampleZh: "毫无疑问，这是正确的路。",
    note: "单复数同形。ohne Zweifel = 毫无疑问；zweifeln an + Dat. = 怀疑某事。"
  },
  {
    id: "gefuehle-12", word: "Gelassenheit", article: "die", plural: null, pos: "noun",
    translation: "从容；平静", level: "B1", topic: "gefuehle",
    example: "Mit Gelassenheit löste sie das Problem.",
    exampleZh: "她从容地解决了问题。",
    note: "gelassen 原意是“被放下的”，所以 Gelassenheit 有一种“松开手”的平静。"
  },
  {
    id: "gefuehle-13", word: "Sehnsucht", article: "die", plural: "die Sehnsüchte", pos: "noun",
    translation: "渴望；思念", level: "B2", topic: "gefuehle",
    example: "Sie hatte Sehnsucht nach dem Meer.",
    exampleZh: "她思念大海。",
    note: "德语里最诗意的词之一。sich nach + Dat. sehnen = 渴望、思念。"
  },
  {
    id: "gefuehle-14", word: "Mitgefühl", article: "das", plural: null, pos: "noun",
    translation: "共情；同情", level: "B2", topic: "gefuehle",
    example: "Er zeigte echtes Mitgefühl für seine Kollegin.",
    exampleZh: "他对女同事表现出真正的共情。",
    note: "mit + Gefühl。不是居高临下的同情，而是“和你一起感受”。"
  },

  /* ── Reisen & Natur ─────────────────────────────────────────── */
  {
    id: "reisen-01", word: "Reise", article: "die", plural: "die Reisen", pos: "noun",
    translation: "旅行；旅程", level: "A1", topic: "reisen",
    example: "Die Reise nach Wien war viel zu kurz.",
    exampleZh: "这趟维也纳之旅太短了。",
    note: "动词 reisen，名词 die Reise。gute Reise! 是“一路顺风”。"
  },
  {
    id: "reisen-02", word: "Stadt", article: "die", plural: "die Städte", pos: "noun",
    translation: "城市", level: "A1", topic: "reisen",
    example: "Wir haben die Stadt zu Fuß erkundet.",
    exampleZh: "我们步行探索了这座城市。",
    note: "复数变音：die Stadt → die Städte。和英语 city 同源，但德语更常指有历史的城区。"
  },
  {
    id: "reisen-03", word: "Weg", article: "der", plural: "die Wege", pos: "noun",
    translation: "路；方法", level: "A1", topic: "reisen",
    example: "Der Weg zum Bahnhof ist kürzer als gedacht.",
    exampleZh: "去火车站的路比想象中短。",
    note: "既可以是具体的路，也可以是抽象的方法：der beste Weg, Deutsch zu lernen。"
  },
  {
    id: "reisen-04", word: "Meer", article: "das", plural: "die Meere", pos: "noun",
    translation: "海；海洋", level: "A1", topic: "reisen",
    example: "Im Sommer fahren wir jedes Jahr ans Meer.",
    exampleZh: "每年夏天我们都去海边。",
    note: "ans Meer = an das Meer，去海边。在海边是 am Meer。"
  },
  {
    id: "reisen-05", word: "Wald", article: "der", plural: "die Wälder", pos: "noun",
    translation: "森林", level: "A1", topic: "reisen",
    example: "Im Wald riecht es nach Erde und Harz.",
    exampleZh: "森林里闻得到泥土和树脂的气味。",
    note: "复数变音：der Wald → die Wälder。德国人爱说 “im Wald spazieren gehen”。"
  },
  {
    id: "reisen-06", word: "Sonne", article: "die", plural: null, pos: "noun",
    translation: "太阳；阳光", level: "A1", topic: "reisen",
    example: "Die Sonne scheint schon seit dem frühen Morgen.",
    exampleZh: "太阳从清早就照耀着。",
    note: "德语里太阳是阴性 die Sonne。天气句常用 es：Die Sonne scheint. / Es ist sonnig."
  },
  {
    id: "reisen-07", word: "Wetter", article: "das", plural: null, pos: "noun",
    translation: "天气", level: "A1", topic: "reisen",
    example: "Das Wetter spielt heute wirklich verrückt.",
    exampleZh: "今天的天气真是反复无常。",
    note: "不可数中性名词。问天气：Wie ist das Wetter? 说天气好：Das Wetter ist schön."
  },
  {
    id: "reisen-08", word: "Regen", article: "der", plural: null, pos: "noun",
    translation: "雨", level: "A2", topic: "reisen",
    example: "Der Regen trommelt gegen die Fensterscheibe.",
    exampleZh: "雨点敲打着窗玻璃。",
    note: "动词 regnen。天气句用 es：Es regnet. 名词 der Regen 通常不可数。"
  },
  {
    id: "reisen-09", word: "Landschaft", article: "die", plural: "die Landschaften", pos: "noun",
    translation: "风景；地貌", level: "A2", topic: "reisen",
    example: "Die Landschaft verändert sich mit den Jahreszeiten.",
    exampleZh: "风景随季节而变化。",
    note: "Land + -schaft。和英语 landscape 一样，既指自然景色，也指一片区域。"
  },
  {
    id: "reisen-10", word: "Berg", article: "der", plural: "die Berge", pos: "noun",
    translation: "山", level: "A2", topic: "reisen",
    example: "Wir sind bei Sonnenaufgang auf den Berg gestiegen.",
    exampleZh: "我们在日出时爬上了山。",
    note: "auf den Berg（上山）用 Akk.，auf dem Berg（在山上）用 Dat.。方向与位置一目了然。"
  },
  {
    id: "reisen-11", word: "Küste", article: "die", plural: "die Küsten", pos: "noun",
    translation: "海岸", level: "B1", topic: "reisen",
    example: "An der Küste weht ein kräftiger Wind.",
    exampleZh: "海岸上刮着强劲的风。",
    note: "固定搭配 an der Küste（在海岸边）。德语海岸分 Nordsee 和 Ostsee，各有各的风。"
  },
  {
    id: "reisen-12", word: "Jahreszeit", article: "die", plural: "die Jahreszeiten", pos: "noun",
    translation: "季节", level: "B1", topic: "reisen",
    example: "Der Herbst ist meine liebste Jahreszeit.",
    exampleZh: "秋天是我最喜欢的季节。",
    note: "Jahr + Zeit，复合词性别由最后一个词决定，所以是 die Jahreszeit。"
  },
  {
    id: "reisen-13", word: "Weite", article: "die", plural: null, pos: "noun",
    translation: "辽阔；宽广", level: "B2", topic: "reisen",
    example: "Die Weite der Landschaft beeindruckte uns.",
    exampleZh: "景色的辽阔让我们震撼。",
    note: "weit（远、宽）的名词形式。它描述的不只是距离，更是一种让人安静下来的空间感。"
  },
  {
    id: "reisen-14", word: "Aufbruch", article: "der", plural: "die Aufbrüche", pos: "noun",
    translation: "启程；出发", level: "B2", topic: "reisen",
    example: "Der Aufbruch in ein neues Leben war mutig.",
    exampleZh: "启程走向新生活是勇敢的。",
    note: "aufbrechen（出发、拆开）的名词。比 Abfahrt 更有“告别旧处、走向未知”的意味。"
  },

  /* ── Lernen & Arbeit ────────────────────────────────────────── */
  {
    id: "lernen-01", word: "Sprache", article: "die", plural: "die Sprachen", pos: "noun",
    translation: "语言", level: "A1", topic: "lernen",
    example: "Deutsch ist eine lebendige Sprache.",
    exampleZh: "德语是一门有生命的语言。",
    note: "sprechen（说）的同源词。die Muttersprache 是母语，die Fremdsprache 是外语。"
  },
  {
    id: "lernen-02", word: "lernen", article: null, plural: null, pos: "verb",
    translation: "学习", level: "A1", topic: "lernen",
    forms: "lernt · lernte · hat gelernt",
    example: "Ich lerne jeden Tag zehn neue Wörter.",
    exampleZh: "我每天学十个新词。",
    note: "规则动词。lernen 强调“学习过程”，studieren 则指大学里的“攻读”。"
  },
  {
    id: "lernen-03", word: "Arbeit", article: "die", plural: "die Arbeiten", pos: "noun",
    translation: "工作；劳动", level: "A1", topic: "lernen",
    example: "Nach der Arbeit gehe ich meistens joggen.",
    exampleZh: "下班后我通常去跑步。",
    note: "动词 arbeiten。zur Arbeit gehen 是去上班，bei der Arbeit 是正在工作。"
  },
  {
    id: "lernen-04", word: "Ziel", article: "das", plural: "die Ziele", pos: "noun",
    translation: "目标；终点", level: "A1", topic: "lernen",
    example: "Mein Ziel ist es, das Niveau B2 zu erreichen.",
    exampleZh: "我的目标是达到 B2 水平。",
    note: "中性名词。ein Ziel erreichen 是“达到目标”；zielstrebig 是“目标明确的”。"
  },
  {
    id: "lernen-05", word: "Erfahrung", article: "die", plural: "die Erfahrungen", pos: "noun",
    translation: "经验；经历", level: "A2", topic: "lernen",
    example: "Aus dieser Erfahrung habe ich viel gelernt.",
    exampleZh: "我从这段经历中学到了很多。",
    note: "erfahren + -ung。Erfahrung 既可以指一次经历，也可以指积累的经验。"
  },
  {
    id: "lernen-06", word: "Erfolg", article: "der", plural: "die Erfolge", pos: "noun",
    translation: "成功；成果", level: "A2", topic: "lernen",
    example: "Kleine Schritte führen langfristig zum Erfolg.",
    exampleZh: "小小的步伐最终会通向成功。",
    note: "形容词 erfolgreich。Viel Erfolg! 是祝人成功，比“加油”更正式一点。"
  },
  {
    id: "lernen-07", word: "Möglichkeit", article: "die", plural: "die Möglichkeiten", pos: "noun",
    translation: "可能性；机会", level: "A2", topic: "lernen",
    example: "Es gibt viele Möglichkeiten, Deutsch zu üben.",
    exampleZh: "有很多练习德语的方式。",
    note: "möglich + -keit。Die Möglichkeit haben, ... zu ... 是常用的句型。"
  },
  {
    id: "lernen-08", word: "Fortschritt", article: "der", plural: "die Fortschritte", pos: "noun",
    translation: "进步", level: "B1", topic: "lernen",
    example: "Dein Fortschritt ist von Woche zu Woche sichtbar.",
    exampleZh: "你的进步每周都看得见。",
    note: "fort（向前）+ Schritt（步伐）。Fortschritte machen 是“取得进步”。"
  },
  {
    id: "lernen-09", word: "Aufgabe", article: "die", plural: "die Aufgaben", pos: "noun",
    translation: "任务；习题", level: "B1", topic: "lernen",
    example: "Diese Aufgabe verlangt volle Konzentration.",
    exampleZh: "这项任务需要全神贯注。",
    note: "来自 aufgeben（交给、放弃）。eine Aufgabe lösen 是“解一道题/完成一项任务”。"
  },
  {
    id: "lernen-10", word: "Übung", article: "die", plural: "die Übungen", pos: "noun",
    translation: "练习；习题", level: "B1", topic: "lernen",
    example: "Übung macht den Meister.",
    exampleZh: "熟能生巧。",
    note: "德语谚语，字面是“练习造就大师”。üben 是动词，注意 ü 的发音。"
  },
  {
    id: "lernen-11", word: "Austausch", article: "der", plural: null, pos: "noun",
    translation: "交流；交换", level: "B1", topic: "lernen",
    example: "Der Austausch mit Muttersprachlern hilft enorm.",
    exampleZh: "和母语者交流帮助非常大。",
    note: "aus + tauschen（交换）。im Austausch sein 是“保持交流”。"
  },
  {
    id: "lernen-12", word: "Konzentration", article: "die", plural: null, pos: "noun",
    translation: "专注；注意力", level: "B2", topic: "lernen",
    example: "Nach zehn Minuten ließ ihre Konzentration nach.",
    exampleZh: "十分钟后，她的注意力下降了。",
    note: "动词 sich konzentrieren。nachlassen 是“减弱、下降”，和 Konzentration 很搭。"
  },
  {
    id: "lernen-13", word: "Herausforderung", article: "die", plural: "die Herausforderungen", pos: "noun",
    translation: "挑战", level: "B2", topic: "lernen",
    example: "Die Prüfung war eine echte Herausforderung.",
    exampleZh: "这场考试是真正的挑战。",
    note: "herausfordern + -ung。字面是“把人叫出来”，所以自带一点对抗感。"
  },
  {
    id: "lernen-14", word: "Durchbruch", article: "der", plural: "die Durchbrüche", pos: "noun",
    translation: "突破", level: "B2", topic: "lernen",
    example: "Der erste freie Satz war der Durchbruch.",
    exampleZh: "第一句自由表达就是一次突破。",
    note: "durch + brechen，穿过障碍。den Durchbruch schaffen 是“取得突破”。"
  },

  /* ── Zeit & Wandel ──────────────────────────────────────────── */
  {
    id: "zeit-01", word: "Zeit", article: "die", plural: "die Zeiten", pos: "noun",
    translation: "时间；时代", level: "A1", topic: "zeit",
    example: "Die Zeit vergeht schneller, wenn man beschäftigt ist.",
    exampleZh: "忙碌的时候，时间过得更快。",
    note: "德语里时间是阴性。Zeit haben 是有时间；sich Zeit nehmen 是“花时间慢慢来”。"
  },
  {
    id: "zeit-02", word: "heute", article: null, plural: null, pos: "adv",
    translation: "今天", level: "A1", topic: "zeit",
    forms: "heute · gestern · morgen",
    example: "Heute bleibe ich einfach zu Hause.",
    exampleZh: "今天我就待在家里。",
    note: "时间副词放句首时，动词仍然在第二位：Heute bleibe ich ... 这是德语语序的铁律。"
  },
  {
    id: "zeit-03", word: "morgen", article: null, plural: null, pos: "adv",
    translation: "明天", level: "A1", topic: "zeit",
    forms: "morgen · übermorgen",
    example: "Morgen beginnt ein neuer Abschnitt.",
    exampleZh: "明天，新的一章开始。",
    note: "小写 morgen 是“明天”，大写 der Morgen 是“早晨”。一个字母，两个世界。"
  },
  {
    id: "zeit-04", word: "Augenblick", article: "der", plural: "die Augenblicke", pos: "noun",
    translation: "瞬间；片刻", level: "A2", topic: "zeit",
    example: "Im richtigen Augenblick sagte er nichts.",
    exampleZh: "在恰当的那个瞬间，他什么也没说。",
    note: "Auge（眼睛）+ Blick（一瞥）。Einen Augenblick, bitte! 就是“请稍等”。"
  },
  {
    id: "zeit-05", word: "Zukunft", article: "die", plural: null, pos: "noun",
    translation: "未来", level: "A2", topic: "zeit",
    example: "Die Zukunft gehört denen, die heute anfangen.",
    exampleZh: "未来属于那些今天就开始的人。",
    note: "来自 zu + kommen（将要到来）。in Zukunft 是“今后”。"
  },
  {
    id: "zeit-06", word: "Vergangenheit", article: "die", plural: null, pos: "noun",
    translation: "过去", level: "A2", topic: "zeit",
    example: "Manchmal holt uns die Vergangenheit wieder ein.",
    exampleZh: "有时，过去会再次追上我们。",
    note: "vergehen（流逝）+ -heit。和 Zukunft 相对，是时间轴的另一端。"
  },
  {
    id: "zeit-07", word: "Veränderung", article: "die", plural: "die Veränderungen", pos: "noun",
    translation: "改变；变化", level: "B1", topic: "zeit",
    example: "Jede Veränderung beginnt mit einem ersten Schritt.",
    exampleZh: "每一个改变都始于第一步。",
    note: "verändern + -ung。可以指外在变化，也可以指人内心的转变。"
  },
  {
    id: "zeit-08", word: "Wandel", article: "der", plural: null, pos: "noun",
    translation: "变迁；转变", level: "B1", topic: "zeit",
    example: "Der Wandel der Gesellschaft ist deutlich spürbar.",
    exampleZh: "社会的变迁清晰可感。",
    note: "wandeln（转变）的名词。比 Veränderung 更宏大，常与 Gesellschaft、Klima 搭配。"
  },
  {
    id: "zeit-09", word: "Geduld", article: "die", plural: null, pos: "noun",
    translation: "耐心", level: "B1", topic: "zeit",
    example: "Geduld ist eine leise Superkraft.",
    exampleZh: "耐心是一种安静的超能力。",
    note: "形容词 geduldig。Geduld haben 是“有耐心”；Ich habe keine Geduld mehr 是“我没耐心了”。"
  },
  {
    id: "zeit-10", word: "Anfang", article: "der", plural: "die Anfänge", pos: "noun",
    translation: "开始；开端", level: "B1", topic: "zeit",
    example: "Am Anfang war alles fremd und aufregend.",
    exampleZh: "一开始，一切都陌生又令人兴奋。",
    note: "来自 anfangen。am Anfang 是“在开始”；von Anfang an 是“从一开始”。"
  },
  {
    id: "zeit-11", word: "Gegenwart", article: "die", plural: null, pos: "noun",
    translation: "当下；现在", level: "B2", topic: "zeit",
    example: "Die Gegenwart bewusst zu erleben, ist gar nicht leicht.",
    exampleZh: "有意识地体验当下，并不容易。",
    note: "gegen（朝向）+ Wart（等待）。和 Vergangenheit、Zukunft 一起构成三时。"
  },
  {
    id: "zeit-12", word: "vergänglich", article: null, plural: null, pos: "adj",
    translation: "易逝的；短暂的", level: "B2", topic: "zeit",
    forms: "vergänglich · vergänglicher · am vergänglichsten",
    example: "Schöne Momente sind vergänglich – und genau deshalb kostbar.",
    exampleZh: "美好时刻易逝——也正因如此才珍贵。",
    note: "来自 vergehen（流逝）。德语里有一种“Vergänglichkeit”的美学，和樱花很像。"
  },
  {
    id: "zeit-13", word: "Übergang", article: "der", plural: "die Übergänge", pos: "noun",
    translation: "过渡；转换", level: "B2", topic: "zeit",
    example: "Der Übergang vom Sommer zum Herbst ist fließend.",
    exampleZh: "从夏到秋的过渡是流动的。",
    note: "über + Gang，走过去的那一段。常用 der Übergang von ... zu ...。"
  },
  {
    id: "zeit-14", word: "Neubeginn", article: "der", plural: null, pos: "noun",
    translation: "重新开始；新的开端", level: "B2", topic: "zeit",
    example: "Jeder Tag ist ein kleiner Neubeginn.",
    exampleZh: "每一天都是一次小小的重新开始。",
    note: "neu + Beginn，阳性。它不是把过去抹掉，而是带着过去再出发。"
  }
];

/* Optional: expose for a module-style import in tooling, harmless in the browser. */
if (typeof module !== "undefined" && module.exports) {
  module.exports = { TOPICS, WORDS };
}
