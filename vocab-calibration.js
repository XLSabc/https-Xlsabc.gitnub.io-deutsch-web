/* Word-level calibration layer (generated). PDF word lists + structured packs audit. */
window.WORTKARTE_CALIBRATION = {
 "version": "1.0.0",
 "generatedAt": "2026-10-25",
 "description": "词条校准层：修复 PDF/词表导入产生的畸形词条、已确认的冠词/复数/词性问题与混入释义。",
 "stats": {
  "audited": 9638,
  "fixed": 123
 },
 "fixes": {
  "goethe-a1-0159": {
   "remove": true,
   "_reason": "定冠词 der 被误当作单词卡"
  },
  "goethe-a2-0690": {
   "remove": true,
   "_reason": "wer/wen 代词合并残片，无法还原为单一词条"
  },
  "goethe-b1-0996": {
   "remove": true,
   "_reason": "Hähnchen/Hühnchen 地区变体残片，与既有词条重复"
  },
  "goethe-b1-0997": {
   "remove": true,
   "_reason": "Hähnchen/Hühnchen 地区变体残片，与既有词条重复"
  },
  "goethe-b1-1211": {
   "remove": true,
   "_reason": "Familienstand 截断残片，与既有词条重复"
  },
  "goethe-a2-0170": {
   "remove": true,
   "_reason": "只有 derdie 前缀、没有词干的空条目"
  },
  "goethe-a1-0160": {
   "word": "Bekannte",
   "article": "der",
   "pos": "noun",
   "_reason": "去掉 derdie 前缀",
   "plural": "die Bekannten"
  },
  "goethe-a2-0167": {
   "word": "Blog",
   "article": "der",
   "_reason": "去掉 derdas 前缀",
   "plural": "die Blogs"
  },
  "goethe-a2-0168": {
   "word": "Comic",
   "article": "der",
   "_reason": "去掉 derdas 前缀",
   "plural": "die Comics"
  },
  "goethe-a2-0169": {
   "word": "Laptop",
   "article": "der",
   "_reason": "去掉 derdas 前缀",
   "plural": "die Laptops"
  },
  "goethe-a2-0085": {
   "word": "darauf",
   "pos": "adv",
   "translation": "在那上面；对此",
   "_reason": "括号示例残片"
  },
  "goethe-a2-0441": {
   "word": "Geburtsjahr",
   "article": "das",
   "pos": "noun",
   "_reason": "连字符+括号残片"
  },
  "goethe-a2-0708": {
   "word": "zurückfahren",
   "pos": "verb",
   "_reason": "连字符+括号残片"
  },
  "goethe-b1-0131": {
   "word": "Brieftasche",
   "article": "die",
   "pos": "noun",
   "_reason": "去掉地区标记 ; D，并纠正词性"
  },
  "goethe-b1-0164": {
   "word": "Eis",
   "note": "D",
   "_reason": "去掉未闭合括号与地区标记"
  },
  "goethe-b1-0187": {
   "word": "Hackfleisch",
   "note": "D",
   "_reason": "去掉未闭合括号与地区标记"
  },
  "goethe-b1-0230": {
   "word": "Obst",
   "note": "D",
   "_reason": "去掉未闭合括号与地区标记"
  },
  "goethe-b1-0336": {
   "word": "Familienstand",
   "note": "D",
   "_reason": "去掉未闭合括号与地区标记"
  },
  "goethe-b1-0647": {
   "word": "Matura",
   "note": "A",
   "_reason": "去掉未闭合括号与地区标记"
  },
  "goethe-b1-0543": {
   "word": "EC-Karte",
   "article": "die",
   "_reason": "统一缩写拼写"
  },
  "goethe-b1-0950": {
   "word": "gesamt",
   "pos": "adj",
   "_reason": "去重与词性纠正"
  },
  "goethe-b1-1077": {
   "word": "meist",
   "pos": "adv",
   "article": null,
   "_reason": "词性应为副词"
  },
  "goethe-b2-0268": {
   "word": "besagen",
   "pos": "verb",
   "_reason": "括号例句残片"
  },
  "goethe-b2-0395": {
   "word": "dermaßen",
   "pos": "adv",
   "_reason": "括号例句残片"
  },
  "goethe-b2-0873": {
   "word": "Jura",
   "pos": "other",
   "article": null,
   "note": "Sg",
   "_reason": "括号残片"
  },
  "goethe-b2-1800": {
   "word": "verbunden",
   "pos": "adj",
   "_reason": "括号例句残片"
  },
  "goethe-b1-1046": {
   "word": "kriminal",
   "pos": "adj",
   "_reason": "德语形容词小写"
  },
  "goethe-c1-0286": {
   "word": "Huckepack-Verfahren",
   "article": "das",
   "_reason": "去掉并列的英文释义部分"
  },
  "goethe-c1-0465": {
   "word": "Zentrum für Kognitive Neurowissenschaften",
   "article": "das",
   "_reason": "希腊字母 Ζ 改为 Z"
  },
  "goethe-c1-0490": {
   "word": "Forschende",
   "article": "die",
   "_reason": "去掉冠词前缀并纠正性别",
   "plural": "die Forschenden"
  },
  "goethe-c1-0497": {
   "word": "Intellektuelle",
   "article": "der",
   "_reason": "希腊字母 Ι 改为 I，去掉 derdie 前缀",
   "plural": "die Intellektuellen"
  },
  "goethe-c1-0880": {
   "word": "Passt-schon-Methode",
   "article": "die",
   "_reason": "去掉引号并连写"
  },
  "goethe-c1-1036": {
   "article": "der",
   "_reason": "der Fluch（诅咒）不是 die Fluch"
  },
  "xqj-22-0915": {
   "article": "der",
   "plural": "die Tropfen",
   "translation": "滴剂；滴",
   "_reason": "der Tropfen 单数，复数 die Tropfen"
  },
  "goethe-a1-0579": {
   "plural": "die Verwandten",
   "_reason": "补全可确认复数"
  },
  "goethe-b1-0003": {
   "plural": "die Serviceangestellten",
   "_reason": "补全可确认复数"
  },
  "goethe-c1-0569": {
   "article": "der",
   "plural": "die Forschenden",
   "_reason": "补全可确认复数"
  },
  "goethe-b1-0226": {
   "word": "Müsli",
   "translation": "什锦麦片（瑞士德语：Müesli）",
   "note": "CH: Müesli",
   "_reason": "合并地区变体，清理英文释义"
  },
  "goethe-b1-0495": {
   "translation": "设施；附件；安装",
   "_reason": "清理混入的德语原词"
  },
  "goethe-b2-0475": {
   "translation": "使用；投入；部署",
   "_reason": "清理混入的德语原词"
  },
  "goethe-c1-0388": {
   "translation": "商品种类；品类",
   "_reason": "清理混入的英文释义"
  },
  "ocr-word-158": {
   "translation": "阁楼式公寓；顶层大开间",
   "_reason": "清理重复的德语原词"
  },
  "goethe-a1-0382--die-s-bahn": {
   "translation": "城市快铁（S-Bahn）",
   "_reason": "清理重复的德语缩写"
  },
  "goethe-b2-0966": {
   "pos": "verb",
   "translation": "使面对；使遭遇",
   "_reason": "清理英文释义并纠正词性"
  },
  "goethe-c1-0478": {
   "word": "Biotop",
   "_reason": "去掉 derdie/derdas 前缀",
   "plural": "die Biotope"
  },
  "goethe-c1-0479": {
   "word": "Startup",
   "_reason": "去掉 derdie/derdas 前缀",
   "plural": "die Startups"
  },
  "goethe-c1-0480": {
   "word": "Angesprochene",
   "_reason": "去掉 derdie/derdas 前缀",
   "plural": "die Angesprochenen"
  },
  "goethe-c1-0481": {
   "word": "Befragte",
   "_reason": "去掉 derdie/derdas 前缀",
   "plural": "die Befragten"
  },
  "goethe-c1-0482": {
   "word": "Beschäftigte",
   "_reason": "去掉 derdie/derdas 前缀",
   "plural": "die Beschäftigten"
  },
  "goethe-c1-0483": {
   "word": "Betroffene",
   "_reason": "去掉 derdie/derdas 前缀",
   "plural": "die Betroffenen"
  },
  "goethe-c1-0484": {
   "word": "Dritte",
   "article": "der",
   "pos": "noun",
   "plural": "die Dritten",
   "_reason": "去掉 derdie 前缀并补全名词信息"
  },
  "goethe-c1-0486": {
   "word": "Einzelne",
   "_reason": "去掉 derdie/derdas 前缀",
   "plural": "die Einzelnen"
  },
  "goethe-c1-0488": {
   "word": "Erwerbslose",
   "_reason": "去掉 derdie/derdas 前缀",
   "plural": "die Erwerbslosen"
  },
  "goethe-c1-0489": {
   "word": "Erwerbstätige",
   "_reason": "去掉 derdie/derdas 前缀",
   "plural": "die Erwerbstätigen"
  },
  "goethe-c1-0491": {
   "word": "Glückselige",
   "_reason": "去掉 derdie/derdas 前缀",
   "plural": "die Glückseligen"
  },
  "goethe-c1-0493": {
   "word": "Mitarbeitende",
   "_reason": "去掉 derdie/derdas 前缀",
   "plural": "die Mitarbeitenden"
  },
  "goethe-c1-0494": {
   "word": "Teilnehmende",
   "_reason": "去掉 derdie/derdas 前缀",
   "plural": "die Teilnehmenden"
  },
  "goethe-c1-0495": {
   "word": "Vorgesetzte",
   "_reason": "去掉 derdie/derdas 前缀",
   "plural": "die Vorgesetzten"
  },
  "goethe-c1-0496": {
   "word": "Weiße",
   "_reason": "去掉 derdie/derdas 前缀",
   "plural": "die Weißen"
  },
  "goethe-c1-0165": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-0343": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-0355": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-0362": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-0600": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-0700": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-0749": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-0788": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-0789": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-0878": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-0882": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-0883": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-1002": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-1110": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-1155": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-1208": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-1221": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-1252": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-1271": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-1296": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-1457": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-1564": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-1604": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-c1-1921": {
   "pos": "other",
   "article": null,
   "note": "形容词+名词搭配",
   "_reason": "多词搭配，不应按名词考冠词"
  },
  "goethe-b1-0755": {
   "article": "der",
   "plural": "die Tropfen",
   "translation": "滴；水滴",
   "_reason": "der Tropfen 单数，复数 die Tropfen"
  },
  "ocr-vocab-2023": {
   "plural": "die Bänder",
   "_reason": "das Band（带子）复数 die Bänder"
  },
  "goethe-c1-0534": {
   "plural": "die Bände",
   "translation": "卷；册；装订",
   "_reason": "der Band（卷/册）复数 die Bände，不是 die Bande"
  },
  "goethe-b1-1407": {
   "remove": true,
   "_reason": "zuverlässig / Zvieri / Znüni 多词合并残片，无法可靠还原为单词卡"
  },
  "goethe-b1-1130": {
   "remove": true,
   "_reason": "“P paar”是 OCR 残片，正确写法为 ein paar"
  },
  "goethe-b1-0193": {
   "remove": true,
   "_reason": "Hähnchen / Hühnchen 合并行；Hähnchen 已有独立词条"
  },
  "goethe-b1-0147": {
   "word": "Abitur",
   "article": "das",
   "plural": "die Abiture",
   "note": "CH",
   "_reason": "审计：清理地区/变体标记或修正拼写与词形"
  },
  "goethe-b1-0166": {
   "word": "Faschierte",
   "article": "das",
   "plural": "die Faschierten",
   "note": "D / A",
   "_reason": "审计：清理地区/变体标记或修正拼写与词形"
  },
  "goethe-b1-0239": {
   "word": "Portemonnaie",
   "article": "das",
   "plural": "die Portemonnaies",
   "note": "auch: Portmonee",
   "_reason": "审计：清理地区/变体标记或修正拼写与词形"
  },
  "goethe-b1-0302": {
   "word": "Bankomat",
   "article": "der",
   "plural": "die Bankomaten",
   "note": "CH: Bancomat",
   "_reason": "审计：清理地区/变体标记或修正拼写与词形"
  },
  "goethe-b1-0350": {
   "word": "Gehsteig",
   "article": "der",
   "plural": "die Gehsteige",
   "note": "CH: Trottoir",
   "_reason": "审计：清理地区/变体标记或修正拼写与词形"
  },
  "goethe-b1-0413": {
   "word": "Personenstand",
   "article": "der",
   "plural": "die Personenstände",
   "note": "D",
   "_reason": "审计：清理地区/变体标记或修正拼写与词形"
  },
  "goethe-b1-0443": {
   "word": "Ski",
   "article": "der",
   "plural": "die Ski",
   "note": "auch: Schi",
   "_reason": "审计：清理地区/变体标记或修正拼写与词形"
  },
  "goethe-b1-0476": {
   "word": "Zivilstand",
   "article": "der",
   "plural": "die Zivilstände",
   "note": "CH",
   "_reason": "审计：清理地区/变体标记或修正拼写与词形"
  },
  "goethe-b1-0556": {
   "word": "Fantasie",
   "article": "die",
   "plural": "die Fantasien",
   "note": "auch: Phantasie",
   "_reason": "审计：清理地区/变体标记或修正拼写与词形"
  },
  "goethe-b1-0557": {
   "word": "Fasnacht",
   "article": "die",
   "plural": "die Fasnachten",
   "note": "D / A / CH",
   "_reason": "审计：清理地区/变体标记或修正拼写与词形"
  },
  "goethe-b1-0699": {
   "word": "Rezeption",
   "article": "die",
   "plural": "die Rezeptionen",
   "note": "auch: Reception",
   "_reason": "审计：清理地区/变体标记或修正拼写与词形"
  },
  "goethe-b1-0725": {
   "word": "Soße",
   "article": "die",
   "plural": "die Soßen",
   "note": "auch: Sauce",
   "_reason": "审计：清理地区/变体标记或修正拼写与词形"
  },
  "goethe-b1-0962": {
   "word": "Glace",
   "article": "das",
   "plural": "die Glaces",
   "note": "CH; auch: Glacé",
   "_reason": "审计：清理地区/变体标记或修正拼写与词形"
  },
  "goethe-b1-1242": {
   "word": "Streichholz",
   "article": "das",
   "plural": "die Streichhölzer",
   "note": "auch: Zündholz",
   "_reason": "审计：清理地区/变体标记或修正拼写与词形"
  },
  "goethe-a2-0693": {
   "word": "wie viel",
   "pos": "other",
   "article": null,
   "plural": null,
   "translation": "多少",
   "_reason": "审计：清理地区/变体标记或修正拼写与词形"
  },
  "goethe-c1-0195": {
   "word": "Bedürfnis",
   "article": "das",
   "plural": "die Bedürfnisse",
   "note": "+ nach",
   "translation": "需求；渴望",
   "_reason": "审计：清理地区/变体标记或修正拼写与词形"
  },
  "goethe-c1-0283": {
   "word": "Herz ausschütten",
   "pos": "other",
   "article": null,
   "plural": null,
   "note": "etw. ausschütten",
   "translation": "倾诉衷肠",
   "_reason": "审计：清理地区/变体标记或修正拼写与词形"
  },
  "goethe-c1-0393": {
   "word": "Statistisches Amt der EU",
   "article": "das",
   "_reason": "审计：清理地区/变体标记或修正拼写与词形"
  },
  "goethe-c1-1023": {
   "word": "Europäische Union",
   "article": "die",
   "note": "EU",
   "_reason": "审计：清理地区/变体标记或修正拼写与词形"
  },
  "goethe-c1-1373": {
   "word": "Vereinte Nationen",
   "article": "die",
   "note": "UNO",
   "_reason": "审计：清理地区/变体标记或修正拼写与词形"
  },
  "goethe-b1-0682": {
   "remove": true,
   "_reason": "与已保留的标准词条重复的变体行"
  },
  "goethe-b1-0928": {
   "remove": true,
   "_reason": "与已保留的标准词条重复的变体行"
  },
  "goethe-a1-0587": {
   "remove": true,
   "_reason": "功能词合并残片"
  },
  "xqj-22-0647": {
   "remove": true,
   "_reason": "Unterhaltungs- 是截断词干，不是完整单词"
  },
  "ocr-vocab-242": {
   "remove": true,
   "_reason": "kein- 是形容词词干，不是完整词条"
  },
  "ocr-vocab-258": {
   "remove": true,
   "_reason": "besonder- 是形容词词干，不是完整词条"
  },
  "ocr-vocab-535": {
   "remove": true,
   "_reason": "eigen- 是形容词词干，不是完整词条"
  },
  "ocr-vocab-767": {
   "remove": true,
   "_reason": "dies- 是形容词词干，不是完整词条"
  },
  "ocr-vocab-412": {
   "translation": "违法行为；过错",
   "_reason": "清理释义开头多余的“和”"
  },
  "ocr-vocab-806": {
   "translation": "第一",
   "_reason": "释义被截断为“第”"
  },
  "ocr-vocab-993": {
   "pos": "verb",
   "translation": "飞奔；疾驰",
   "_reason": "rasen 是动词，不是形容词"
  },
  "xqj-22-0454": {
   "plural": "无复数",
   "_reason": "Wiktionary 解析出的“die –”占位符，按无复数处理"
  },
  "goethe-c1-0641": {
   "plural": "无复数",
   "_reason": "Wiktionary 解析出的“die –”占位符，按无复数处理"
  },
  "xqj-22-0426": {
   "plural": "无复数",
   "_reason": "Wiktionary 解析出的“die –”占位符，按无复数处理"
  }
 }
};
