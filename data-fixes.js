/* Targeted corrections for the bundled vocabulary packs.
 * Keys are "article|word" (article is empty for non-nouns).
 * Only listed entries are touched; the rest of the packs stay as generated.
 */
window.WORTKARTE_FIXES = {
  "der|Pass": { translation: "护照；通行证" },
  "|Deutsche": { translation: "德国人" },
  "der|Deutsche": { translation: "德国人" },
  "|folgend": { translation: "以下的；下述的" },
  "|verantwortlich": { translation: "负责的" },
  "der|Plan": { translation: "计划；方案", example: "Wir haben einen Plan für das Wochenende gemacht.", exampleZh: "我们为周末制定了一个计划。" },
  "der|Satz": { translation: "句子；（音乐）乐章；（体育）局" },
  "|Satz": { translation: "句子；（音乐）乐章；（体育）局" },
  "die|Party": { translation: "聚会；派对", example: "Am Samstag gehe ich zu einer Party.", exampleZh: "周六我要去参加一个聚会。" },
  "|können": { translation: "能；会；可以", example: "Ich kann sehr gut Deutsch sprechen.", exampleZh: "我的德语说得很好。" },
  "|mitnehmen": { translation: "随身携带；带走", example: "Kannst du mich zum Bahnhof mitnehmen?", exampleZh: "你能顺路载我去火车站吗？" },
  "das|Land": { translation: "国家；土地；乡下" },
  "|richtig": { translation: "正确的；对的" },
  "die|Praxis": { translation: "实践；（医生）诊所" },
  "|anziehen": { translation: "穿上；吸引" },
  "|ausziehen": { translation: "脱下；搬出；拔出" },
  "das|Viertel": { translation: "四分之一；一刻钟；街区" },
  "die|Möbel": { translation: "家具" },
  "das|Möbel": { translation: "家具" },
  "|lange": { translation: "长久；长时间" },
  "|lang": { translation: "长的" },
  "die|Arbeitslosigkeit": { translation: "失业" },
  "|schwanger": { translation: "怀孕的" },
  "die|Kasse": { translation: "收银台；现金出纳" },
  "die|Klasse": { translation: "班级；等级" },
  "|klar": { translation: "清楚的；透明的" },
  "der|Hammer": { translation: "锤子" },
  "die|Sendung": { translation: "节目；发送" },
  "|hauptsächlich": { translation: "主要地" },
  "|individuell": { translation: "个人的；个性化的" },
  "der|Akademiker": { translation: "大学毕业生；学者" },
  "|sich spezialisieren": { translation: "专门研究；专攻" },
  "der|Schulleiter": { translation: "（中小学）校长" },
  "die|Kindergärtnerin": { translation: "（女）幼儿园教师" },
  "der|Baustil": { translation: "建筑风格" },
  "|alltäglich": { translation: "日常的；司空见惯的" },
  "der|Schut": { word: "Schutt", translation: "瓦砾；碎片" },
  "der|Einflug": { word: "Einfall", translation: "入侵；突然想到" },
  "der|Sportplafz": { word: "Sportplatz", translation: "操场；运动场" },
  "|schaff": { word: "scharf", translation: "辣的；锋利的" },
  "das|Stoftier": { word: "Stofftier", translation: "毛绒玩具" },
  "das|Hühnlein": { word: "Hühnchen", translation: "小鸡" },
  "|übernächst": { word: "übernächste", translation: "下下个" },
  "der|Radier": { word: "Radfahrer", translation: "骑自行车者" },
  "das|Mountain": { word: "Mountainbike", translation: "山地自行车" },
  "die|Tonarmee": { word: "Terrakotta-Armee", translation: "兵马俑" },
  "der|Reis": { plural: "" },
  "der|Sport": { plural: "die Sportarten" },
  "die|Büchse": { translation: "（金属）罐；猎枪" },
  "|Büchse": { translation: "（金属）罐；猎枪" },
  "|speichertn": { word: "speichern", translation: "储存；保存" },
  "|sich aus drücken": { word: "sich ausdrücken", translation: "表达；措辞" },
  "der|Kunstturner in": { word: "Kunstturner", translation: "竞技体操运动员" },
  "die|Rolle": { translation: "角色；卷；轮子" },
  "|Clown": { translation: "小丑；丑角" },
  "|Konto": { translation: "账户；账号" },
  "|Sparkonto": { translation: "储蓄账户" },
  "|Girokonto": { translation: "汇划账户；转账账户" },
  "|Startkapital": { translation: "启动资金" },
  "|Weltraumfahrzeug": { translation: "宇宙飞船" }
};

/* The source Excel merged adjacent words into one row. Split these into
 * independent entries. The original malformed row is removed. */
window.WORTKARTE_SPLITS = [
  {
    from: "|anmachen anmelden",
    entries: [
      { word: "anmachen", translation: "打开；开启", pos: "verb", level: "A2" },
      { word: "anmelden", translation: "登记；注册", pos: "verb", level: "A2" }
    ]
  },
  {
    from: "|ihrihm ihn",
    entries: [
      { word: "ihr", translation: "她的；她（第三格）", pos: "other", level: "A1" },
      { word: "ihm", translation: "他（第三格）", pos: "other", level: "A1" },
      { word: "ihn", translation: "他（第四格）", pos: "other", level: "A1" }
    ]
  },
  {
    from: "das|Mehl mehr",
    entries: [
      { word: "Mehl", article: "das", translation: "面粉", pos: "noun", plural: "die Mehle", level: "A1" },
      { word: "mehr", translation: "更多", pos: "other", level: "A1" }
    ]
  },
  {
    from: "die|Jeans jeder",
    entries: [
      { word: "Jeans", article: "die", translation: "牛仔裤", pos: "noun", plural: "die Jeans", level: "A1" },
      { word: "jeder", translation: "每个；任何人", pos: "other", level: "A1" }
    ]
  },
  {
    from: "|günstig gut",
    entries: [
      { word: "günstig", translation: "便宜的；有利的", pos: "adj", level: "A1" },
      { word: "gut", translation: "好的", pos: "adj", level: "A1" }
    ]
  },
  {
    from: "|denn derselbe",
    entries: [
      { word: "denn", translation: "因为；到底", pos: "other", level: "A1" },
      { word: "derselbe", translation: "同一个；相同的", pos: "other", level: "A2" }
    ]
  },
  {
    from: "|furchtbar fürchten",
    entries: [
      { word: "furchtbar", translation: "可怕的；非常", pos: "adj", level: "B1" },
      { word: "fürchten", translation: "害怕；担心", pos: "verb", level: "B1" }
    ]
  },
  {
    from: "der|Stuhl setzen",
    entries: [
      { word: "Stuhl", article: "der", translation: "椅子", pos: "noun", plural: "die Stühle", level: "A1" },
      { word: "setzen", translation: "放置；坐下", pos: "verb", level: "A1" }
    ]
  }
];

window.WORTKARTE_BLACKLIST = [
  "|tot treffen",
  "|lang lange",
  "|Stuhl setzen",
  "der|Ausweis ausziehen"
];
