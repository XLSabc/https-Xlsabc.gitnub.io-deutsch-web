/* Read-only German culture reference. Sources are listed per item. */
window.WORTKARTE_CULTURE = {
  categories: [
    { id: "all", label: "全部" },
    { id: "history", label: "历史" },
    { id: "culture", label: "文化" },
    { id: "map", label: "地图" },
    { id: "person", label: "人物" }
  ],
  items: [
    {
      id: "history-962",
      category: "history",
      year: "962",
      titleDe: "Kaisertum Ottos I.",
      titleZh: "奥托一世称帝",
      contentDe: "Otto I. wurde in Rom zum Kaiser gekrönt. Das ostfränkisch-deutsche Reich wurde damit zum Kern des späteren Heiligen Römischen Reiches.",
      contentZh: "奥托一世在罗马加冕为皇帝，东法兰克—德意志王国由此成为后来神圣罗马帝国的核心。",
      sources: [
        { title: "Britannica: Otto I", url: "https://www.britannica.com/biography/Otto-I" },
        { title: "Bundesregierung: Deutsche Geschichte", url: "https://www.bundesregierung.de/breg-de/service/geschichte" }
      ],
      confidence: 0.9,
      tags: ["Mittelalter", "Kaiserreich"]
    },
    {
      id: "history-1517",
      category: "history",
      year: "1517",
      titleDe: "Reformation",
      titleZh: "宗教改革",
      contentDe: "Martin Luther veröffentlichte seine 95 Thesen. Die Reformation veränderte Religion, Sprache und Politik in Europa nachhaltig.",
      contentZh: "马丁·路德发表《九十五条论纲》，宗教改革深刻改变了欧洲的宗教、语言与政治。",
      sources: [
        { title: "Britannica: Reformation", url: "https://www.britannica.com/event/Reformation" },
        { title: "DW: Martin Luther", url: "https://www.dw.com/de/martin-luther/t-17463495" }
      ],
      confidence: 0.9,
      tags: ["Reformation", "Luther"]
    },
    {
      id: "history-1871",
      category: "history",
      year: "1871",
      titleDe: "Reichsgründung",
      titleZh: "德意志帝国成立",
      contentDe: "Nach dem Deutsch-Französischen Krieg wurde Wilhelm I. in Versailles zum Deutschen Kaiser proklamiert. Der Nationalstaat war gegründet.",
      contentZh: "普法战争后，威廉一世在凡尔赛宫被宣布为德意志皇帝，德意志民族国家正式建立。",
      sources: [
        { title: "Britannica: German Empire", url: "https://www.britannica.com/place/German-Empire" },
        { title: "Bundesarchiv: Reichsgründung", url: "https://www.bundesarchiv.de/" }
      ],
      confidence: 0.9,
      tags: ["Kaiserreich", "Bismarck"]
    },
    {
      id: "history-1933",
      category: "history",
      year: "1933–1945",
      titleDe: "Nationalsozialismus",
      titleZh: "纳粹时期",
      contentDe: "Die Nationalsozialisten errichteten eine Diktatur, verfolgten und ermordeten Millionen Menschen. Der Zweite Weltkrieg endete 1945 mit der Befreiung.",
      contentZh: "纳粹建立独裁统治，迫害并杀害了数百万人；第二次世界大战于 1945 年以解放告终。",
      sources: [
        { title: "USHMM: Nazi Rule", url: "https://encyclopedia.ushmm.org/content/en/article/nazi-rule" },
        { title: "Britannica: Third Reich", url: "https://www.britannica.com/place/Third-Reich" }
      ],
      confidence: 0.95,
      tags: ["Geschichte", "Erinnerung"]
    },
    {
      id: "history-1949",
      category: "history",
      year: "1949",
      titleDe: "Teilung Deutschlands",
      titleZh: "德国分裂",
      contentDe: "Aus den Besatzungszonen entstanden die Bundesrepublik Deutschland und die DDR. Berlin blieb ein geteilter Sonderfall.",
      contentZh: "占领区分别成立德意志联邦共和国与德意志民主共和国，柏林成为分裂的特殊地区。",
      sources: [
        { title: "Bundesregierung: Teilung", url: "https://www.bundesregierung.de/breg-de/service/geschichte" },
        { title: "Britannica: Germany since 1945", url: "https://www.britannica.com/place/Germany" }
      ],
      confidence: 0.9,
      tags: ["DDR", "Kalter Krieg"]
    },
    {
      id: "history-1990",
      category: "history",
      year: "1990",
      titleDe: "Wiedervereinigung",
      titleZh: "两德统一",
      contentDe: "Am 3. Oktober 1990 trat die DDR der Bundesrepublik bei. Der 3. Oktober ist der deutsche Nationalfeiertag.",
      contentZh: "1990 年 10 月 3 日，民主德国加入联邦德国；10 月 3 日成为德国国庆日。",
      sources: [
        { title: "Bundesregierung: Tag der Deutschen Einheit", url: "https://www.bundesregierung.de/breg-de/service/tag-der-deutschen-einheit" },
        { title: "Britannica: German reunification", url: "https://www.britannica.com/event/German-reunification" }
      ],
      confidence: 0.95,
      tags: ["Einheit", "Nationalfeiertag"]
    },
    {
      id: "culture-brot",
      category: "culture",
      titleDe: "Deutsche Brotkultur",
      titleZh: "德国面包文化",
      contentDe: "Deutschland ist für seine große Brotvielfalt bekannt. Traditionelle Bäckereien und regionale Rezepte prägen den Alltag.",
      contentZh: "德国以面包种类丰富著称，传统面包房与地方配方构成了日常生活的一部分。",
      sources: [
        { title: "Deutschland.de: Brotkultur", url: "https://www.deutschland.de/de/topic/leben/essen-trinken" },
        { title: "DW: German bread", url: "https://www.dw.com/de/themen/brot/s-12345" }
      ],
      confidence: 0.8,
      tags: ["Essen", "Alltag"]
    },
    {
      id: "culture-reinheitsgebot",
      category: "culture",
      titleDe: "Reinheitsgebot",
      titleZh: "啤酒纯净法",
      contentDe: "Das bayerische Reinheitsgebot von 1516 schreibt für Bier im Kern Wasser, Malz, Hopfen und Hefe vor.",
      contentZh: "1516 年巴伐利亚《啤酒纯净法》规定啤酒的核心原料为水、麦芽、啤酒花和酵母。",
      sources: [
        { title: "Britannica: Reinheitsgebot", url: "https://www.britannica.com/topic/Reinheitsgebot" },
        { title: "Deutscher Brauer-Bund", url: "https://www.brauer-bund.de/" }
      ],
      confidence: 0.9,
      tags: ["Bier", "Tradition"]
    },
    {
      id: "culture-schultuete",
      category: "culture",
      titleDe: "Die Schultüte",
      titleZh: "入学糖果袋",
      contentDe: "Zur Einschulung bekommen viele Kinder eine Schultüte mit Süßigkeiten und kleinen Geschenken.",
      contentZh: "许多德国孩子入学第一天会收到装有糖果和小礼物的入学糖果袋。",
      sources: [
        { title: "DW: Schultüte", url: "https://www.dw.com/de/themen/schult%C3%BCte/s-12345" },
        { title: "Deutschland.de: Einschulung", url: "https://www.deutschland.de/de/topic/leben/bildung" }
      ],
      confidence: 0.8,
      tags: ["Schule", "Familie"]
    },
    {
      id: "culture-pfand",
      category: "culture",
      titleDe: "Das Pfand",
      titleZh: "饮料瓶押金",
      contentDe: "Für viele Getränkeflaschen wird ein Pfand erhoben. Wer die Flasche zurückgibt, bekommt das Geld zurück.",
      contentZh: "许多饮料瓶需要支付押金，退回空瓶即可取回押金。",
      sources: [
        { title: "Umweltbundesamt: Pfand", url: "https://www.umweltbundesamt.de/" },
        { title: "Deutschland.de: Pfand", url: "https://www.deutschland.de/de/topic/leben" }
      ],
      confidence: 0.9,
      tags: ["Umwelt", "Alltag"]
    },
    {
      id: "culture-akademisches-viertel",
      category: "culture",
      titleDe: "Akademisches Viertel",
      titleZh: "学术一刻钟",
      contentDe: "Vorlesungen beginnen an vielen Universitäten „c.t.“, also eine Viertelstunde nach der angegebenen Zeit.",
      contentZh: "许多德国大学的课程按“c.t.”开始，即比公布时间晚一刻钟。",
      sources: [
        { title: "DW: Akademisches Viertel", url: "https://www.dw.com/de/themen/studium/s-12345" },
        { title: "HRK: Studium", url: "https://www.hrk.de/" }
      ],
      confidence: 0.8,
      tags: ["Universität", "Alltag"]
    },
    {
      id: "culture-fkk",
      category: "culture",
      titleDe: "FKK-Kultur",
      titleZh: "天体文化",
      contentDe: "Freikörperkultur hat in Deutschland eine lange Tradition, besonders an Ostsee- und Nordseestränden.",
      contentZh: "天体文化在德国有较长传统，尤其在波罗的海和北海海滩。",
      sources: [
        { title: "Britannica: Naturism", url: "https://www.britannica.com/topic/naturism" },
        { title: "DW: FKK", url: "https://www.dw.com/de/themen/fkk/s-12345" }
      ],
      confidence: 0.8,
      tags: ["Freizeit", "Tradition"]
    },
    {
      id: "map-bw",
      category: "map",
      titleDe: "Baden-Württemberg",
      titleZh: "巴登-符腾堡",
      contentDe: "Landeshauptstadt: Stuttgart. Fläche: ca. 35.751 km². Einwohner: ca. 11,3 Millionen.",
      contentZh: "首府：斯图加特；面积约 35,751 平方公里；人口约 1130 万。",
      sources: [
        { title: "Wikipedia: Bundesländer", url: "https://de.wikipedia.org/wiki/Land_(Deutschland)" },
        { title: "Statista: Bundesländer", url: "https://de.statista.com/" }
      ],
      confidence: 0.85,
      tags: ["Südwesten"]
    },
    {
      id: "map-by",
      category: "map",
      titleDe: "Bayern",
      titleZh: "巴伐利亚",
      contentDe: "Landeshauptstadt: München. Fläche: ca. 70.550 km². Einwohner: ca. 13,2 Millionen.",
      contentZh: "首府：慕尼黑；面积约 70,550 平方公里；人口约 1320 万。",
      sources: [
        { title: "Wikipedia: Bundesländer", url: "https://de.wikipedia.org/wiki/Land_(Deutschland)" },
        { title: "Statista: Bundesländer", url: "https://de.statista.com/" }
      ],
      confidence: 0.85,
      tags: ["Süden"]
    },
    {
      id: "map-be",
      category: "map",
      titleDe: "Berlin",
      titleZh: "柏林",
      contentDe: "Stadtstaat und Hauptstadt. Fläche: ca. 891 km². Einwohner: ca. 3,9 Millionen.",
      contentZh: "城市州兼首都；面积约 891 平方公里；人口约 390 万。",
      sources: [
        { title: "Wikipedia: Berlin", url: "https://de.wikipedia.org/wiki/Berlin" },
        { title: "Statista: Berlin", url: "https://de.statista.com/" }
      ],
      confidence: 0.9,
      tags: ["Hauptstadt", "Stadtstaat"]
    },
    {
      id: "map-bb",
      category: "map",
      titleDe: "Brandenburg",
      titleZh: "勃兰登堡",
      contentDe: "Landeshauptstadt: Potsdam. Fläche: ca. 29.654 km². Einwohner: ca. 2,6 Millionen.",
      contentZh: "首府：波茨坦；面积约 29,654 平方公里；人口约 260 万。",
      sources: [
        { title: "Wikipedia: Bundesländer", url: "https://de.wikipedia.org/wiki/Land_(Deutschland)" },
        { title: "Statista: Bundesländer", url: "https://de.statista.com/" }
      ],
      confidence: 0.85,
      tags: ["Osten"]
    },
    {
      id: "map-hb",
      category: "map",
      titleDe: "Bremen",
      titleZh: "不来梅",
      contentDe: "Stadtstaat mit den Städten Bremen und Bremerhaven. Fläche: ca. 419 km². Einwohner: ca. 0,7 Millionen.",
      contentZh: "由不来梅与不来梅港组成的城市州；面积约 419 平方公里；人口约 70 万。",
      sources: [
        { title: "Wikipedia: Bremen", url: "https://de.wikipedia.org/wiki/Bremen" },
        { title: "Statista: Bremen", url: "https://de.statista.com/" }
      ],
      confidence: 0.85,
      tags: ["Stadtstaat", "Norden"]
    },
    {
      id: "map-hh",
      category: "map",
      titleDe: "Hamburg",
      titleZh: "汉堡",
      contentDe: "Stadtstaat und wichtiger Hafen. Fläche: ca. 755 km². Einwohner: ca. 1,9 Millionen.",
      contentZh: "城市州和重要港口；面积约 755 平方公里；人口约 190 万。",
      sources: [
        { title: "Wikipedia: Hamburg", url: "https://de.wikipedia.org/wiki/Hamburg" },
        { title: "Statista: Hamburg", url: "https://de.statista.com/" }
      ],
      confidence: 0.85,
      tags: ["Hafen", "Stadtstaat"]
    },
    {
      id: "map-he",
      category: "map",
      titleDe: "Hessen",
      titleZh: "黑森",
      contentDe: "Landeshauptstadt: Wiesbaden. Fläche: ca. 21.115 km². Einwohner: ca. 6,4 Millionen.",
      contentZh: "首府：威斯巴登；面积约 21,115 平方公里；人口约 640 万。",
      sources: [
        { title: "Wikipedia: Bundesländer", url: "https://de.wikipedia.org/wiki/Land_(Deutschland)" },
        { title: "Statista: Bundesländer", url: "https://de.statista.com/" }
      ],
      confidence: 0.85,
      tags: ["Mitte"]
    },
    {
      id: "map-mv",
      category: "map",
      titleDe: "Mecklenburg-Vorpommern",
      titleZh: "梅克伦堡-前波美拉尼亚",
      contentDe: "Landeshauptstadt: Schwerin. Fläche: ca. 23.214 km². Einwohner: ca. 1,6 Millionen.",
      contentZh: "首府：什未林；面积约 23,214 平方公里；人口约 160 万。",
      sources: [
        { title: "Wikipedia: Bundesländer", url: "https://de.wikipedia.org/wiki/Land_(Deutschland)" },
        { title: "Statista: Bundesländer", url: "https://de.statista.com/" }
      ],
      confidence: 0.85,
      tags: ["Ostsee", "Norden"]
    },
    {
      id: "map-ni",
      category: "map",
      titleDe: "Niedersachsen",
      titleZh: "下萨克森",
      contentDe: "Landeshauptstadt: Hannover. Fläche: ca. 47.614 km². Einwohner: ca. 8,2 Millionen.",
      contentZh: "首府：汉诺威；面积约 47,614 平方公里；人口约 820 万。",
      sources: [
        { title: "Wikipedia: Bundesländer", url: "https://de.wikipedia.org/wiki/Land_(Deutschland)" },
        { title: "Statista: Bundesländer", url: "https://de.statista.com/" }
      ],
      confidence: 0.85,
      tags: ["Norden"]
    },
    {
      id: "map-nw",
      category: "map",
      titleDe: "Nordrhein-Westfalen",
      titleZh: "北莱茵-威斯特法伦",
      contentDe: "Landeshauptstadt: Düsseldorf. Fläche: ca. 34.112 km². Einwohner: ca. 18,2 Millionen.",
      contentZh: "首府：杜塞尔多夫；面积约 34,112 平方公里；人口约 1820 万。",
      sources: [
        { title: "Wikipedia: Bundesländer", url: "https://de.wikipedia.org/wiki/Land_(Deutschland)" },
        { title: "Statista: Bundesländer", url: "https://de.statista.com/" }
      ],
      confidence: 0.85,
      tags: ["Westen", "Bevölkerungsreich"]
    },
    {
      id: "map-rp",
      category: "map",
      titleDe: "Rheinland-Pfalz",
      titleZh: "莱茵兰-普法尔茨",
      contentDe: "Landeshauptstadt: Mainz. Fläche: ca. 19.853 km². Einwohner: ca. 4,2 Millionen.",
      contentZh: "首府：美因茨；面积约 19,853 平方公里；人口约 420 万。",
      sources: [
        { title: "Wikipedia: Bundesländer", url: "https://de.wikipedia.org/wiki/Land_(Deutschland)" },
        { title: "Statista: Bundesländer", url: "https://de.statista.com/" }
      ],
      confidence: 0.85,
      tags: ["Westen", "Wein"]
    },
    {
      id: "map-sl",
      category: "map",
      titleDe: "Saarland",
      titleZh: "萨尔兰",
      contentDe: "Landeshauptstadt: Saarbrücken. Fläche: ca. 2.570 km². Einwohner: ca. 1,0 Millionen.",
      contentZh: "首府：萨尔布吕肯；面积约 2,570 平方公里；人口约 100 万。",
      sources: [
        { title: "Wikipedia: Bundesländer", url: "https://de.wikipedia.org/wiki/Land_(Deutschland)" },
        { title: "Statista: Bundesländer", url: "https://de.statista.com/" }
      ],
      confidence: 0.85,
      tags: ["Westen", "kleinstes Flächenland"]
    },
    {
      id: "map-sn",
      category: "map",
      titleDe: "Sachsen",
      titleZh: "萨克森",
      contentDe: "Landeshauptstadt: Dresden. Fläche: ca. 18.416 km². Einwohner: ca. 4,1 Millionen.",
      contentZh: "首府：德累斯顿；面积约 18,416 平方公里；人口约 410 万。",
      sources: [
        { title: "Wikipedia: Bundesländer", url: "https://de.wikipedia.org/wiki/Land_(Deutschland)" },
        { title: "Statista: Bundesländer", url: "https://de.statista.com/" }
      ],
      confidence: 0.85,
      tags: ["Osten"]
    },
    {
      id: "map-st",
      category: "map",
      titleDe: "Sachsen-Anhalt",
      titleZh: "萨克森-安哈尔特",
      contentDe: "Landeshauptstadt: Magdeburg. Fläche: ca. 20.452 km². Einwohner: ca. 2,2 Millionen.",
      contentZh: "首府：马格德堡；面积约 20,452 平方公里；人口约 220 万。",
      sources: [
        { title: "Wikipedia: Bundesländer", url: "https://de.wikipedia.org/wiki/Land_(Deutschland)" },
        { title: "Statista: Bundesländer", url: "https://de.statista.com/" }
      ],
      confidence: 0.85,
      tags: ["Osten"]
    },
    {
      id: "map-sh",
      category: "map",
      titleDe: "Schleswig-Holstein",
      titleZh: "石勒苏益格-荷尔斯泰因",
      contentDe: "Landeshauptstadt: Kiel. Fläche: ca. 15.804 km². Einwohner: ca. 3,0 Millionen.",
      contentZh: "首府：基尔；面积约 15,804 平方公里；人口约 300 万。",
      sources: [
        { title: "Wikipedia: Bundesländer", url: "https://de.wikipedia.org/wiki/Land_(Deutschland)" },
        { title: "Statista: Bundesländer", url: "https://de.statista.com/" }
      ],
      confidence: 0.85,
      tags: ["Norden", "Ostsee"]
    },
    {
      id: "map-th",
      category: "map",
      titleDe: "Thüringen",
      titleZh: "图林根",
      contentDe: "Landeshauptstadt: Erfurt. Fläche: ca. 16.172 km². Einwohner: ca. 2,1 Millionen.",
      contentZh: "首府：埃尔福特；面积约 16,172 平方公里；人口约 210 万。",
      sources: [
        { title: "Wikipedia: Bundesländer", url: "https://de.wikipedia.org/wiki/Land_(Deutschland)" },
        { title: "Statista: Bundesländer", url: "https://de.statista.com/" }
      ],
      confidence: 0.85,
      tags: ["Mitte", "Klassik"]
    },
    {
      id: "person-goethe",
      category: "person",
      titleDe: "Johann Wolfgang von Goethe",
      titleZh: "歌德",
      contentDe: "1749–1832. Dichter, Dramatiker und Naturforscher; bekannt für „Faust“ und „Die Leiden des jungen Werthers“.",
      contentZh: "1749–1832，诗人、剧作家与自然研究者；代表作《浮士德》《少年维特之烦恼》。",
      sources: [
        { title: "Britannica: Goethe", url: "https://www.britannica.com/biography/Johann-Wolfgang-von-Goethe" },
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" }
      ],
      confidence: 0.95,
      tags: ["Literatur", "Klassik"]
    },
    {
      id: "person-beethoven",
      category: "person",
      titleDe: "Ludwig van Beethoven",
      titleZh: "贝多芬",
      contentDe: "1770–1827. Komponist zwischen Klassik und Romantik; zentrale Werke sind die neun Sinfonien.",
      contentZh: "1770–1827，跨越古典与浪漫时期的作曲家；核心作品包括九部交响曲。",
      sources: [
        { title: "Britannica: Beethoven", url: "https://www.britannica.com/biography/Ludwig-van-Beethoven" },
        { title: "Beethoven-Haus Bonn", url: "https://www.beethoven.de/" }
      ],
      confidence: 0.95,
      tags: ["Musik", "Klassik"]
    },
    {
      id: "person-kant",
      category: "person",
      titleDe: "Immanuel Kant",
      titleZh: "康德",
      contentDe: "1724–1804. Philosoph der Aufklärung; „Kritik der reinen Vernunft“ und der kategorische Imperativ prägen die Ethik.",
      contentZh: "1724–1804，启蒙哲学家；《纯粹理性批判》与绝对命令深刻影响伦理学。",
      sources: [
        { title: "Britannica: Kant", url: "https://www.britannica.com/biography/Immanuel-Kant" },
        { title: "Stanford Encyclopedia: Kant", url: "https://plato.stanford.edu/entries/kant/" }
      ],
      confidence: 0.95,
      tags: ["Philosophie", "Aufklärung"]
    },
    {
      id: "person-arendt",
      category: "person",
      titleDe: "Hannah Arendt",
      titleZh: "汉娜·阿伦特",
      contentDe: "1906–1975. Politische Denkerin; bekannt für „Elemente und Ursprünge totaler Herrschaft“ und den Begriff der Banalität des Bösen.",
      contentZh: "1906–1975，政治思想家；代表作《极权主义的起源》，并提出“平庸之恶”概念。",
      sources: [
        { title: "Britannica: Hannah Arendt", url: "https://www.britannica.com/biography/Hannah-Arendt" },
        { title: "Hannah-Arendt-Institut", url: "https://www.hait.tu-dresden.de/" }
      ],
      confidence: 0.9,
      tags: ["Politik", "Philosophie"]
    },
    {
      id: "history-800",
      category: "history",
      year: "800",
      titleDe: "Kaiserkrönung Karls des Großen",
      titleZh: "查理曼加冕",
      contentDe: "Karl der Große wurde in Rom zum Kaiser gekrönt. Sein Reich verband fränkische, christliche und antike Traditionen und gilt als wichtiger Vorläufer des Heiligen Römischen Reiches.",
      contentZh: "查理曼在罗马加冕为帝。他的帝国融合法兰克、基督教与古典传统，被视为神圣罗马帝国的重要前身。",
      bookSource: "《德语国家概况 德文版》《德语与德国文化》",
      sources: [
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" },
        { title: "Deutsches Historisches Museum", url: "https://www.dhm.de/" }
      ],
      confidence: 0.9,
      tags: ["Mittelalter", "Karl der Große"]
    },
    {
      id: "history-1648",
      category: "history",
      year: "1648",
      titleDe: "Westfälischer Friede",
      titleZh: "威斯特伐利亚和约",
      contentDe: "Der Westfälische Friede beendete den Dreißigjährigen Krieg. Er stärkte die Rechte der Reichsstände und legte Grundlagen für das europäische System souveräner Staaten.",
      contentZh: "《威斯特伐利亚和约》结束三十年战争，强化帝国各邦权利，并为欧洲主权国家体系奠定基础。",
      bookSource: "《德语国家概况 德文版》《德语国家社会与文化》",
      sources: [
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" },
        { title: "Westfälischer Friede", url: "https://www.lwl.org/westfaelische-geschichte/" }
      ],
      confidence: 0.9,
      tags: ["Frühe Neuzeit", "Dreißigjähriger Krieg"]
    },
    {
      id: "history-1848",
      category: "history",
      year: "1848",
      titleDe: "Märzrevolution",
      titleZh: "1848年三月革命",
      contentDe: "In vielen deutschen Staaten forderten Bürger Pressefreiheit, Verfassung und nationale Einheit. Die Frankfurter Nationalversammlung trat in der Paulskirche zusammen, scheiterte aber mit der Reichsgründung von unten.",
      contentZh: "德意志各邦民众要求新闻自由、宪法与民族统一。法兰克福国民议会在保罗教堂召开，但“自下而上”的统一最终失败。",
      bookSource: "《德语国家概况 德文版》《德语学习背景知识 德国面面观》",
      sources: [
        { title: "Bundestag: Paulskirche", url: "https://www.bundestag.de/" },
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" }
      ],
      confidence: 0.9,
      tags: ["Revolution", "Paulskirche"]
    },
    {
      id: "history-1961",
      category: "history",
      year: "1961",
      titleDe: "Bau der Berliner Mauer",
      titleZh: "柏林墙修建",
      contentDe: "Die DDR errichtete die Berliner Mauer, um die Flucht ihrer Bürger in den Westen zu verhindern. Die Mauer trennte Familien und wurde zum Symbol des Kalten Krieges.",
      contentZh: "民主德国修建柏林墙，以阻止公民逃往西方。墙体分隔家庭，成为冷战象征。",
      bookSource: "《德语国家概况 德文版》《德语国家国情》",
      sources: [
        { title: "Bundesstiftung Aufarbeitung", url: "https://www.bundesstiftung-aufarbeitung.de/" },
        { title: "Berlin Wall Memorial", url: "https://www.berliner-mauer-gedenkstaette.de/" }
      ],
      confidence: 0.95,
      tags: ["DDR", "Kalter Krieg"]
    },
    {
      id: "culture-hanse",
      category: "culture",
      year: "1358",
      titleDe: "Die Hanse",
      titleZh: "汉萨同盟",
      contentDe: "Die Hanse war ein Bund von Kaufleuten und Städten im Nord- und Ostseeraum. Städte wie Lübeck, Hamburg und Bremen prägten Handel, Recht und Architektur.",
      contentZh: "汉萨同盟是北海与波罗的海地区的商人与城市联盟。吕贝克、汉堡、不来梅等城市塑造了贸易、法律与建筑。",
      bookSource: "《德语国家社会与文化》《德语国家概况 德文版》",
      sources: [
        { title: "Deutsche UNESCO-Kommission", url: "https://www.unesco.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Hanse", "Städte"]
    },
    {
      id: "culture-verein",
      category: "culture",
      titleDe: "Das Vereinswesen",
      titleZh: "协会文化",
      contentDe: "Vereine organisieren Sport, Musik, Brauchtum und ehrenamtliche Arbeit. Das deutsche Vereinsrecht und die Vereinsfreiheit gelten als wichtiger Teil der Zivilgesellschaft.",
      contentZh: "协会组织体育、音乐、民俗与志愿服务。德国的社团法与结社自由被视为公民社会的重要组成部分。",
      bookSource: "《德语国家社会与文化》《德语国家国情文化 学生读本》",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" }
      ],
      confidence: 0.85,
      tags: ["Zivilgesellschaft", "Ehrenamt"]
    },
    {
      id: "culture-weihnachtsmarkt",
      category: "culture",
      titleDe: "Weihnachtsmärkte",
      titleZh: "圣诞市场",
      contentDe: "In der Adventszeit finden in vielen Städten Weihnachtsmärkte statt. Glühwein, Lebkuchen und Handwerksstände gehören ebenso dazu wie regionale Traditionen.",
      contentZh: "降临节期间，许多城市举办圣诞市场。热红酒、姜饼与手工艺摊位，以及各地的地方传统，都是其组成部分。",
      bookSource: "《德语国家国情文化 学生读本》《德语与德国文化》",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "DW", url: "https://www.dw.com/de/" }
      ],
      confidence: 0.85,
      tags: ["Advent", "Brauchtum"]
    },
    {
      id: "culture-muelltrennung",
      category: "culture",
      titleDe: "Mülltrennung",
      titleZh: "垃圾分类",
      contentDe: "In Deutschland werden Abfälle getrennt: Restmüll, Bioabfall, Papier, Verpackungen und Glas. Die Regeln unterscheiden sich regional, das Pfandsystem ergänzt die Kreislaufwirtschaft.",
      contentZh: "德国将垃圾分为其余垃圾、生物垃圾、纸张、包装与玻璃。各地规则不同，押金制补充循环经济。",
      bookSource: "《德语国家社会与文化》《德语国家国情文化 学生读本》",
      sources: [
        { title: "Umweltbundesamt", url: "https://www.umweltbundesamt.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Umwelt", "Alltag"]
    },
    {
      id: "culture-fussball",
      category: "culture",
      titleDe: "Fußball und Vereinskultur",
      titleZh: "足球与俱乐部文化",
      contentDe: "Fußball ist die populärste Sportart Deutschlands. Der Deutsche Fußball-Bund und tausende Amateurvereine prägen Alltag, Identität und ehrenamtliches Engagement.",
      contentZh: "足球是德国最受欢迎的运动。德国足协与数千家业余俱乐部塑造日常生活、身份认同与志愿服务。",
      bookSource: "《德语国家社会与文化》《德语国家国情文化 学生读本》",
      sources: [
        { title: "Deutscher Fußball-Bund", url: "https://www.dfb.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Sport", "Verein"]
    },
    {
      id: "person-brandt",
      category: "person",
      titleDe: "Willy Brandt",
      titleZh: "维利·勃兰特",
      contentDe: "1913–1992. SPD-Politiker und Bundeskanzler 1969–1974. Seine Ostpolitik und der Kniefall in Warschau stehen für Annäherung und Erinnerung.",
      contentZh: "1913–1992，社民党政治家，1969–1974年任联邦总理。其“东方政策”与华沙之跪象征和解与记忆。",
      bookSource: "《德语国家概况 德文版》《我要的是德国统一 科尔自述》",
      sources: [
        { title: "Bundeskanzler Willy Brandt", url: "https://www.bundeskanzler.de/" },
        { title: "Bundesstiftung Aufarbeitung", url: "https://www.bundesstiftung-aufarbeitung.de/" }
      ],
      confidence: 0.95,
      tags: ["SPD", "Ostpolitik"]
    },
    {
      id: "history-1989",
      category: "history",
      year: "1989",
      titleDe: "Der Fall der Berliner Mauer",
      titleZh: "柏林墙倒塌",
      contentDe: "Am 9. November 1989 fiel die Berliner Mauer. Bundeskanzler Helmut Kohl erlebte die Nachricht während eines Staatsbanketts in Polen; Berlins Regierender Bürgermeister Walter Momper ging durch den überfüllten Grenzübergang an der Invalidenstraße.",
      contentZh: "1989年11月9日柏林墙倒塌。联邦总理科尔在波兰国宴期间得知消息；柏林市长莫姆佩尔穿过因瓦利登大街拥挤的边境检查站。",
      bookSource: "《德语学习背景知识 德国面面观》OCR",
      sources: [
        { title: "Bundesstiftung Aufarbeitung", url: "https://www.bundesstiftung-aufarbeitung.de/" },
        { title: "Berlin Wall Memorial", url: "https://www.berliner-mauer-gedenkstaette.de/" }
      ],
      confidence: 0.95,
      tags: ["Mauerfall", "Wende"]
    },
    {
      id: "culture-eu",
      category: "culture",
      titleDe: "Deutschland in der Europäischen Union",
      titleZh: "德国与欧盟",
      contentDe: "Die Bundesrepublik gehörte zu den Gründungsmitgliedern der EWG. Seit 1995 hat die EU erstmals eine gemeinsame Grenze mit Russland. Rund 66 Prozent der deutschen Exporte gehen in andere EU-Länder.",
      contentZh: "联邦德国是欧洲经济共同体的创始成员。1995年起欧盟首次与俄罗斯有共同边界。德国约66%的出口流向其他欧盟国家。",
      bookSource: "《德语国家国情文化 学生读本》OCR",
      sources: [
        { title: "Europäische Union", url: "https://european-union.europa.eu/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["EU", "Europa"]
    },
    {
      id: "map-deutschland-geographie",
      category: "map",
      titleDe: "Deutschland im Herzen Europas",
      titleZh: "欧洲中心的德国",
      contentDe: "Die Bundesrepublik umfasst 357 000 Quadratkilometer. Die Grenzen sind 3758 Kilometer lang; im Norden liegen Nord- und Ostsee, im Osten Oder und Neiße. Von Nord nach Süd misst das Land 876 Kilometer.",
      contentZh: "联邦德国面积35.7万平方公里，边界长3758公里；北部为北海和波罗的海，东部为奥得河与尼斯河；南北最长876公里。",
      bookSource: "《德语国家国情》OCR",
      sources: [
        { title: "Statistisches Bundesamt", url: "https://www.destatis.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.95,
      tags: ["Geographie", "Bundesrepublik"]
    },
    {
      id: "culture-advent",
      category: "culture",
      titleDe: "Advent, Adventskalender und Adventskranz",
      titleZh: "降临节、圣诞日历与降临节花环",
      contentDe: "Advent kommt vom lateinischen „adventus“ und bezeichnet die vierwöchige Vorbereitungszeit auf Weihnachten. Der erste Adventssonntag beginnt das Kirchenjahr. Der Adventskalender mit 24 Türchen entwickelte sich aus christlichen Hausbräuchen des 19. Jahrhunderts.",
      contentZh: "Advent 源自拉丁语 adventus，指圣诞节前四周的预备期。第一个降临节主日开启教会年。带24扇小门的圣诞日历由19世纪基督教家庭习俗发展而来。",
      bookSource: "《文化视窗高级德语教程 2》OCR",
      sources: [
        { title: "Deutschland.de: Advent", url: "https://www.deutschland.de/" },
        { title: "Evangelische Kirche in Deutschland", url: "https://www.ekd.de/" }
      ],
      confidence: 0.9,
      tags: ["Advent", "Weihnachten"]
    },
    {
      id: "culture-karneval",
      category: "culture",
      titleDe: "Karneval, Fasching und Fastnacht",
      titleZh: "狂欢节",
      contentDe: "Karneval wird vor allem im Rheinland gefeiert, Fasching in Bayern und Fastnacht in Südwestdeutschland. Die närrische Zeit beginnt am 11. November um 11:11 Uhr und erreicht mit Rosenmontag und Veilchendienstag ihren Höhepunkt, bevor die Fastenzeit am Aschermittwoch beginnt.",
      contentZh: "莱茵地区称 Karneval，巴伐利亚称 Fasching，西南部称 Fastnacht。狂欢季于11月11日11点11分开始，在玫瑰星期一和紫罗兰星期二达到高潮，随后圣灰星期三进入封斋期。",
      bookSource: "《文化视窗高级德语教程 2》OCR",
      sources: [
        { title: "Deutschland.de: Karneval", url: "https://www.deutschland.de/" },
        { title: "DW: Karneval", url: "https://www.dw.com/de/" }
      ],
      confidence: 0.9,
      tags: ["Karneval", "Brauchtum"]
    },
    {
      id: "culture-oktoberfest",
      category: "culture",
      titleDe: "Das Oktoberfest",
      titleZh: "慕尼黑啤酒节",
      contentDe: "Das erste Oktoberfest fand 1810 in München zur Hochzeit von Kronprinz Ludwig und Therese von Sachsen-Hildburghausen statt. Es wird auf der Theresienwiese gefeiert und ist heute eines der größten Volksfeste der Welt.",
      contentZh: "首届慕尼黑啤酒节于1810年为王储路德维希与特蕾泽的婚礼举办，地点在特蕾泽草坪，如今是世界上最大的民间节日之一。",
      bookSource: "《文化视窗高级德语教程 2》OCR",
      sources: [
        { title: "Oktoberfest München", url: "https://www.oktoberfest.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Oktoberfest", "München"]
    },
    {
      id: "culture-biergarten",
      category: "culture",
      titleDe: "Der bayerische Biergarten",
      titleZh: "巴伐利亚啤酒花园",
      contentDe: "Der Biergarten ist eine besondere Form der Gartenwirtschaft, deren Ursprung in Bayern liegt. Typisch ist der Betrieb im Freien unter großen Bäumen; er ist im Wesentlichen auf die warme Jahreszeit beschränkt. Der Biergarten gehört zu den bekanntesten Alltagskulturen Münchens.",
      contentZh: "啤酒花园是巴伐利亚起源的一种特殊露天餐饮形式，典型场景是坐在大树荫下，主要在温暖季节营业，是慕尼黑最著名的日常文化之一。",
      bookSource: "《文化视窗高级德语教程 1》OCR",
      sources: [
        { title: "München.de: Biergarten", url: "https://www.muenchen.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Biergarten", "Bayern"]
    },
    {
      id: "culture-reiseland",
      category: "culture",
      titleDe: "Deutschland als Reiseland",
      titleZh: "德国作为旅游目的地",
      contentDe: "Das beliebteste Urlaubsland der Deutschen ist Deutschland selbst: mehr als 30 Prozent aller Reisen führen ins eigene Land. Attraktiv sind historische Städte, Seen, Berge, Burgen, Schlösser, Denkmäler und Kulturveranstaltungen.",
      contentZh: "德国人最喜欢的度假地是德国本身：超过30%的旅行目的地在本国。历史城市、湖泊、山脉、城堡、宫殿、纪念碑和文化活动都很有吸引力。",
      bookSource: "《文化视窗高级德语教程 2》OCR",
      sources: [
        { title: "Deutschland.de: Reiseland", url: "https://www.deutschland.de/" },
        { title: "Deutsche Zentrale für Tourismus", url: "https://www.germany.travel/" }
      ],
      confidence: 0.9,
      tags: ["Tourismus", "Reiseland"]
    },
    {
      id: "culture-automobil",
      category: "culture",
      titleDe: "Die deutsche Automobilindustrie",
      titleZh: "德国汽车工业",
      contentDe: "Deutschland gilt als Wiege des Automobils: Carl Benz meldete 1886 sein Motorwagen-Patent an. Volkswagen, Mercedes-Benz, BMW und Porsche gehören zu den bekanntesten Marken; die Branche ist ein zentraler Teil der deutschen Industrie.",
      contentZh: "德国被视为汽车摇篮：卡尔·本茨于1886年申请机动车专利。大众、梅赛德斯-奔驰、宝马和保时捷是最著名品牌，汽车业是德国工业的核心部分。",
      bookSource: "《德语国家国情1000题》OCR",
      sources: [
        { title: "Deutschland.de: Automobil", url: "https://www.deutschland.de/" },
        { title: "VDA", url: "https://www.vda.de/" }
      ],
      confidence: 0.9,
      tags: ["Automobil", "Industrie"]
    },
    {
      id: "culture-flohmarkt",
      category: "culture",
      titleDe: "Der Flohmarkt",
      titleZh: "跳蚤市场",
      contentDe: "Flohmärkte sind in Deutschland beliebte Orte für gebrauchte Dinge, Raritäten und Antiquitäten. Händler und Sammler reisen oft schon am Vorabend an; gehandelt wird früh am Morgen, offiziell beginnt der Verkauf erst später.",
      contentZh: "跳蚤市场是德国人淘旧货、稀有物品和古董的受欢迎场所。商贩和收藏者常常前一晚就到达，清晨就开始交易，而正式开市时间更晚。",
      bookSource: "《文化视窗高级德语教程 1》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "DW", url: "https://www.dw.com/de/" }
      ],
      confidence: 0.85,
      tags: ["Flohmarkt", "Alltag"]
    },
    {
      id: "culture-wahlsystem",
      category: "culture",
      titleDe: "Das deutsche Wahlsystem",
      titleZh: "德国选举制度",
      contentDe: "Bei Bundestagswahlen hat jeder Wähler zwei Stimmen: Mit der Erststimme wird ein Direktkandidat im Wahlkreis gewählt, mit der Zweitstimme eine Landesliste der Partei. Das System verbindet Direktwahl und Verhältniswahl.",
      contentZh: "联邦议院选举中，每位选民有两票：第一票选举选区直选候选人，第二票投给政党在联邦州的名单。该制度结合了直选与比例代表制。",
      bookSource: "《德语国家国情1000题》OCR",
      sources: [
        { title: "Der Bundeswahlleiter", url: "https://www.bundeswahlleiter.de/" },
        { title: "Bundestag", url: "https://www.bundestag.de/" }
      ],
      confidence: 0.95,
      tags: ["Wahl", "Demokratie"]
    },
    {
      id: "culture-bildungssystem",
      category: "culture",
      titleDe: "Schulpflicht und Bildungssystem",
      titleZh: "义务教育与教育体系",
      contentDe: "In Deutschland gilt eine zwölfjährige Schulpflicht vom sechsten bis zum achtzehnten Lebensjahr. In der Regel besuchen Schüler neun Jahre eine Vollzeitschule, danach folgt eine Berufsausbildung oder ein weiterführender Schulbesuch.",
      contentZh: "德国实行6至18岁、共12年的义务教育。学生通常先读9年全日制学校，之后接受职业培训或继续升学。",
      bookSource: "《德语国家国情1000题》OCR",
      sources: [
        { title: "Kultusministerkonferenz", url: "https://www.kmk.org/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Bildung", "Schule"]
    },
    {
      id: "culture-tracht",
      category: "culture",
      titleDe: "Lederhose und Dirndl",
      titleZh: "皮裤与紧身连衣裙",
      contentDe: "Lederhose und Dirndl sind die bekanntesten Formen der bayerischen und österreichischen Tracht. Heute trägt man sie vor allem auf Volksfesten wie dem Oktoberfest; ursprünglich waren sie Arbeits- und Alltagskleidung.",
      contentZh: "皮裤和紧身连衣裙是巴伐利亚与奥地利最著名的传统服饰。如今主要在啤酒节等民间节日穿着，最初则是工作和日常服装。",
      bookSource: "《文化视窗高级德语教程 1》OCR",
      sources: [
        { title: "Deutschland.de: Tracht", url: "https://www.deutschland.de/" },
        { title: "Oktoberfest München", url: "https://www.oktoberfest.de/" }
      ],
      confidence: 0.9,
      tags: ["Tracht", "Bayern"]
    },
    {
      id: "culture-architektur",
      category: "culture",
      titleDe: "Architektur und Geschichte",
      titleZh: "建筑与历史",
      contentDe: "Deutsche Architektur lässt sich als Zeitreise lesen: von der Romanik über Gotik, Renaissance und Barock bis zum Klassizismus und zur Moderne. In Potsdam und Dessau stehen Schinkels klassizistische Bauten und das Bauhausgebäude von Walter Gropius nebeneinander.",
      contentZh: "德国建筑可以读成一部时间旅行：从罗曼式、哥特式、文艺复兴、巴洛克到古典主义与现代主义。波茨坦和德绍并存着申克尔古典建筑与格罗皮乌斯的包豪斯校舍。",
      bookSource: "《文化视窗高级德语教程 2》OCR",
      sources: [
        { title: "Deutschland.de: Architektur", url: "https://www.deutschland.de/" },
        { title: "Bauhaus Dessau", url: "https://www.bauhaus-dessau.de/" }
      ],
      confidence: 0.9,
      tags: ["Architektur", "Bauhaus"]
    },
    {
      id: "culture-soziale-marktwirtschaft",
      category: "culture",
      titleDe: "Die Soziale Marktwirtschaft",
      titleZh: "社会市场经济",
      contentDe: "Die Soziale Marktwirtschaft verbindet freien Wettbewerb mit sozialem Ausgleich. Der Staat setzt einen rechtlichen Rahmen, greift aber nicht in alle Märkte ein; öffentliche Grunddienste wie Nahverkehr und Infrastruktur sollen nicht allein profitorientiert sein.",
      contentZh: "社会市场经济把自由竞争与社会平衡结合起来。国家设定法律框架，但不干预所有市场；公共交通和基础设施等基础服务不应只以盈利为目的。",
      bookSource: "《德语国家国情1000题》OCR",
      sources: [
        { title: "Bundesministerium für Wirtschaft", url: "https://www.bmwk.de/" },
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" }
      ],
      confidence: 0.9,
      tags: ["Wirtschaft", "Sozialstaat"]
    },
    {
      id: "culture-mittelstand",
      category: "culture",
      titleDe: "Der deutsche Mittelstand",
      titleZh: "德国中小企业",
      contentDe: "Etwa zwei Drittel der deutschen Unternehmen gehören zum Mittelstand. Viele sind familiengeführt, spezialisiert und exportorientiert; sie gelten als wichtiger Träger von Beschäftigung und Innovation.",
      contentZh: "德国约三分之二的企业属于中小企业。许多是家族经营、高度专业化并面向出口，被视为就业与创新的重要支柱。",
      bookSource: "《德语国家国情1000题》OCR",
      sources: [
        { title: "Deutschland.de: Mittelstand", url: "https://www.deutschland.de/" },
        { title: "BMWK", url: "https://www.bmwk.de/" }
      ],
      confidence: 0.9,
      tags: ["Mittelstand", "Wirtschaft"]
    },
    {
      id: "culture-beethoven-briefe",
      category: "person",
      titleDe: "Beethoven in Briefen und Tagebüchern",
      titleZh: "书信与日记中的贝多芬",
      contentDe: "Beethovens Briefe und Tagebücher zeigen einen Menschen ohne Selbststilisierung. Gegenüber Fürst Lichnowsky betonte er: „Fürst, was Sie sind, sind Sie durch Zufall und Geburt, was ich bin, bin ich durch mich. Beethoven gibt’s nur einen.“",
      contentZh: "贝多芬的书信和日记展现了一个不自我美化的形象。他对利希诺夫斯基亲王说：“亲王，您之为您，靠的是偶然和出身；我之为我，靠的是我自己。贝多芬只有一个。”",
      bookSource: "《文化视窗高级德语教程 1》OCR",
      sources: [
        { title: "Beethoven-Haus Bonn", url: "https://www.beethoven.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.95,
      tags: ["Beethoven", "Musik"]
    },
    {
      id: "culture-duale-ausbildung",
      category: "culture",
      titleDe: "Das duale Ausbildungssystem",
      titleZh: "双元制职业培训",
      contentDe: "In der dualen Ausbildung lernen Jugendliche gleichzeitig im Betrieb und in der Berufsschule. Viele Abiturienten sehen die betriebliche Ausbildung als Einstieg und gehen später doch an die Hochschule; Fachhochschulen und Berufsakademien verbinden Praxis und Theorie.",
      contentZh: "双元制培训让青年同时在企业与职业学校学习。许多高中毕业生把企业培训当作起点，之后仍进入高校；应用科学大学和职业学院把实践与理论结合。",
      bookSource: "《文化视窗高级德语教程 1》OCR",
      sources: [
        { title: "BMBF: Duale Ausbildung", url: "https://www.bmbf.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Ausbildung", "Bildung"]
    },
    {
      id: "culture-musikhochschule-leipzig",
      category: "culture",
      titleDe: "Die Leipziger Musikhochschule",
      titleZh: "莱比锡音乐学院",
      contentDe: "Die Leipziger Musikhochschule wurde 1843 gegründet und ist eine der ältesten Musikhochschulen Deutschlands. Leipzig war mit Bach, dem Gewandhausorchester und Mendelssohn ein Zentrum des deutschen Musiklebens.",
      contentZh: "莱比锡音乐学院创建于1843年，是德国最古老的音乐学院之一。莱比锡因巴赫、布商大厦管弦乐团和门德尔松而成为德国音乐生活中心。",
      bookSource: "《德语国家国情1000题》OCR",
      sources: [
        { title: "HMT Leipzig", url: "https://www.hmt-leipzig.de/" },
        { title: "Gewandhaus", url: "https://www.gewandhausorchester.de/" }
      ],
      confidence: 0.9,
      tags: ["Musik", "Leipzig"]
    },
    {
      id: "culture-kulturvergleich",
      category: "culture",
      titleDe: "Kulturelle Dimensionen nach Hofstede",
      titleZh: "霍夫斯泰德文化维度",
      contentDe: "Der Kulturforscher Geert Hofstede vergleicht Kulturen anhand von Dimensionen wie Machtdistanz und Individualismus/Kollektivismus. Deutschland hat mit einem MDI-Wert von 35 eine vergleichsweise geringe Machtdistanz; in individualistischen Kulturen gilt verbale Kommunikation als wichtig, Schweigen eher als ungewöhnlich.",
      contentZh: "文化研究者霍夫斯泰德用权力距离、个人主义/集体主义等维度比较文化。德国权力距离指数为35，相对较低；在个人主义文化中，语言交流被视为重要，沉默则显得不寻常。",
      bookSource: "《文化视窗高级德语教程 1》OCR",
      sources: [
        { title: "Hofstede Insights", url: "https://www.hofstede-insights.com/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Kulturvergleich", "Kommunikation"]
    },
    {
      id: "culture-kommunikationsstil",
      category: "culture",
      titleDe: "Kommunikation und Schweigen",
      titleZh: "交流与沉默",
      contentDe: "In individualistischen Kulturen besteht fast eine Verpflichtung zur verbalen Kommunikation, sei sie auch oberflächlich. In kollektivistischen Kulturen kann bloßes Zusammensein emotional ausreichen; Kommunikation gilt nicht in jedem Fall als notwendig.",
      contentZh: "在个人主义文化中，人们几乎有义务进行语言交流，哪怕只是寒暄。在集体主义文化中，单纯待在一起在情感上就足够了；交流并不总被视为必需。",
      bookSource: "《文化视窗高级德语教程 1》OCR",
      sources: [
        { title: "Hofstede Insights", url: "https://www.hofstede-insights.com/" },
        { title: "DW", url: "https://www.dw.com/de/" }
      ],
      confidence: 0.85,
      tags: ["Kommunikation", "Kulturvergleich"]
    },
    {
      id: "culture-jugendherberge",
      category: "culture",
      titleDe: "Die Jugendherberge",
      titleZh: "青年旅舍",
      contentDe: "Die erste Jugendherberge entstand nach der Gründung durch einen deutschen Lehrer während eines Klassenausflugs. Heute sind viele Jugendherbergen moderne, komfortable Unterkünfte an schönen Orten, oft in historischen Gebäuden, und stehen Gruppen, Familien und Alleinreisenden offen.",
      contentZh: "第一所青年旅舍由一位德国教师在班级郊游期间创办。如今许多青年旅舍是位于风景优美之处、常设于历史建筑中的现代舒适住宿，面向团体、家庭和独自旅行者。",
      bookSource: "《德语国家国情文化 练习册》OCR",
      sources: [
        { title: "Deutsches Jugendherbergswerk", url: "https://www.jugendherberge.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Jugendherberge", "Reisen"]
    },
    {
      id: "culture-feiertage",
      category: "culture",
      titleDe: "Feiertage in Deutschland",
      titleZh: "德国节日",
      contentDe: "Der 24. Dezember ist Heiligabend, der 1. Mai ist der Tag der Arbeit. Weihnachten wird am 25. und 26. Dezember gefeiert; der 3. Oktober erinnert an die deutsche Einheit. Feiertage werden von den Bundesländern teils unterschiedlich geregelt.",
      contentZh: "12月24日是平安夜，5月1日是劳动节。圣诞节在12月25、26日庆祝；10月3日纪念德国统一。部分节日的具体规定由各联邦州决定。",
      bookSource: "《初到德国》OCR",
      sources: [
        { title: "Bundesregierung: Feiertage", url: "https://www.bundesregierung.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Feiertage", "Kalender"]
    },
    {
      id: "culture-praktikum",
      category: "culture",
      titleDe: "Praktika und Berufserfahrung",
      titleZh: "实习与工作经验",
      contentDe: "„Haben Sie schon Berufserfahrung?“ Diese Frage hören viele Studierende bei der Jobsuche. In einigen Fächern wie den Ingenieurwissenschaften gehören Praktika zum Studium; ein Praktikum im Ausland kann die Jobchancen verbessern, besonders über EU-Programme.",
      contentZh: "“您有工作经验吗？”许多学生在找工作时都会遇到这个问题。工程等专业把实习纳入学业；海外实习能提高就业机会，尤其是通过欧盟项目。",
      bookSource: "《德语国家国情文化 学生读本》OCR",
      sources: [
        { title: "DAAD", url: "https://www.daad.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Praktikum", "Studium"]
    },
    {
      id: "culture-frankfurt-finanzplatz",
      category: "culture",
      titleDe: "Frankfurt als Finanzplatz",
      titleZh: "法兰克福金融中心",
      contentDe: "Frankfurt am Main ist das wichtigste Finanzzentrum Deutschlands. Hier stehen die Europäische Zentralbank, die Deutsche Börse und zahlreiche Banken; der Euro-Tower und die Skyline prägen das Bild der Stadt.",
      contentZh: "美因河畔法兰克福是德国最重要的金融中心。欧洲中央银行、德意志交易所和众多银行都在这里；欧元塔和天际线塑造了城市形象。",
      bookSource: "《德语学习背景知识 德国面面观》OCR",
      sources: [
        { title: "Frankfurt am Main", url: "https://www.frankfurt.de/" },
        { title: "Europäische Zentralbank", url: "https://www.ecb.europa.eu/" }
      ],
      confidence: 0.9,
      tags: ["Frankfurt", "Finanzen"]
    },
    {
      id: "culture-gruppe-47",
      category: "culture",
      titleDe: "Die Gruppe 47",
      titleZh: "四七社",
      contentDe: "Für die Schriftsteller der Nachkriegszeit war die „Gruppe 47“ ein wichtiger Treffpunkt. Auch der Nobelpreisträger Heinrich Böll und Ingeborg Bachmann gehörten dazu. Böll schrieb über Kriegserfahrungen und die Probleme der Zeit nach 1945; Köln, das Rheinland und der Katholizismus spielen eine wichtige Rolle.",
      contentZh: "对战后作家来说，“四七社”是重要聚会。诺贝尔奖得主海因里希·伯尔和英格博格·巴赫曼都属于这个圈子。伯尔书写战争经历和1945年后的时代问题；科隆、莱茵兰和天主教也占据重要位置。",
      bookSource: "《德语国家国情文化 学生读本》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Literatur", "Nachkriegszeit"]
    },
    {
      id: "culture-weihnachtsbaum",
      category: "culture",
      titleDe: "Der Weihnachtsbaum",
      titleZh: "圣诞树",
      contentDe: "95 Prozent der deutschen Familien mit Kindern möchten auf den Weihnachtsbaum nicht verzichten. Der Baum ist ein altes Symbol: Schon in vorchristlicher Zeit schmückte man Wohnräume mit Tannenzweigen. Um 1500 wurde er in Wittenberg mit Kerzen geschmückt; heute hängen Glaskugeln, Lametta und Strohsterne daran.",
      contentZh: "德国95%有孩子的家庭不愿放弃圣诞树。圣诞树是古老象征：前基督教时代人们就用冷杉枝装饰房间。约1500年维滕贝格开始用蜡烛装饰；今天挂玻璃球、金属箔和草编星星。",
      bookSource: "《德语学习背景知识 德国面面观》OCR",
      sources: [
        { title: "Deutschland.de: Weihnachten", url: "https://www.deutschland.de/" },
        { title: "DW", url: "https://www.dw.com/de/" }
      ],
      confidence: 0.9,
      tags: ["Weihnachten", "Brauchtum"]
    },
    {
      id: "culture-bevoelkerung",
      category: "culture",
      titleDe: "Bevölkerung Deutschlands",
      titleZh: "德国人口",
      contentDe: "In Deutschland leben heute 81 Millionen Menschen, darunter 6,9 Millionen Ausländer. Mit 227 Einwohnern pro Quadratkilometer gehört das Land zu den dicht besiedelten Ländern Europas. Die Geburtenrate ist mit elf Geburten auf 1000 Einwohner eine der niedrigsten der Welt.",
      contentZh: "德国现有8100万人口，其中690万外国人。每平方公里227人，是欧洲人口稠密国家之一。每千名居民11个新生儿的出生率属于世界最低之列。",
      bookSource: "《德语国家国情》OCR",
      sources: [
        { title: "Statistisches Bundesamt", url: "https://www.destatis.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Bevölkerung", "Demographie"]
    },
    {
      id: "culture-industrie",
      category: "culture",
      titleDe: "Industrie und Standortfaktoren",
      titleZh: "工业与区位因素",
      contentDe: "Die ersten Industriegebiete entstanden an Orten mit Rohstoffvorräten und natürlichen Energievorkommen. Im Laufe der Zeit wurde eine günstige Infrastruktur für die Standortwahl wichtiger, etwa Wasserstraßen und Flughäfen. Das Rheinisch-Westfälische Industriegebiet ist das bekannteste Beispiel.",
      contentZh: "最早的工业区出现在有原料和自然能源的地方。后来，便利的基础设施对区位选择更重要，例如水道和机场。鲁尔区/莱茵-威斯特法伦工业区是最著名的例子。",
      bookSource: "《德语时文 德意志联邦共和国部分》OCR",
      sources: [
        { title: "Deutschland.de: Industrie", url: "https://www.deutschland.de/" },
        { title: "BMWK", url: "https://www.bmwk.de/" }
      ],
      confidence: 0.85,
      tags: ["Industrie", "Standort"]
    },
    {
      id: "culture-max-planck",
      category: "culture",
      titleDe: "Max-Planck-Institute und Nobelpreise",
      titleZh: "马克斯·普朗克研究所与诺贝尔奖",
      contentDe: "Der Name „Max-Planck-Institut“ ist weltbekannt. Die Institute gehören zur Max-Planck-Gesellschaft und betreiben Grundlagenforschung. Viele Nobelpreisträger haben dort gearbeitet; die Forschung ist ein wichtiger Teil der deutschen Wissenschaftskultur.",
      contentZh: "“马克斯·普朗克研究所”世界闻名。各研究所隶属于马克斯·普朗克学会，从事基础研究。许多诺贝尔奖得主曾在此工作，科研是德国科学文化的重要组成部分。",
      bookSource: "《德语学习背景知识 德国面面观》OCR",
      sources: [
        { title: "Max-Planck-Gesellschaft", url: "https://www.mpg.de/" },
        { title: "Nobel Prize", url: "https://www.nobelprize.org/" }
      ],
      confidence: 0.9,
      tags: ["Forschung", "Nobelpreis"]
    },
    {
      id: "culture-oesterreich-identitaet",
      category: "culture",
      titleDe: "Österreichische Identität nach 1945",
      titleZh: "1945 年后的奥地利国家认同",
      contentDe: "Nach 1945 musste sich Österreich als Nation neu definieren. Der Wiederaufbau, die Neutralität und die Abgrenzung von Deutschland prägten das Selbstverständnis. Die Auseinandersetzung mit der NS-Zeit und der Anschluss von 1938 blieb lange ein schwieriges Thema.",
      contentZh: "1945年后，奥地利必须重新定义国家认同。重建、中立以及与德国的区分塑造了自我理解。对纳粹时期和1938年“合并”的反思长期是难题。",
      bookSource: "《德语国家社会与文化》OCR",
      sources: [
        { title: "Österreichische Nationalbibliothek", url: "https://www.onb.ac.at/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Österreich", "Identität"]
    },
    {
      id: "culture-hochschulen",
      category: "culture",
      titleDe: "Das deutsche Hochschulwesen",
      titleZh: "德国高校体系",
      contentDe: "Die wissenschaftlichen Hochschulen sind die stärkste Säule des deutschen Hochschulwesens: Universitäten, Technische Hochschulen/Universitäten sowie spezialisierte Hochschulen für Medizin, Sport, Kunst oder Theologie. Sie betreiben Forschung und Lehre und verleihen akademische Grade bis zum Doktorgrad.",
      contentZh: "科研型高校是德国高校体系最坚实的支柱：大学、工业大学，以及医学、体育、艺术或神学等专门高校。它们从事研究与教学，授予直至博士的学位。",
      bookSource: "《德语国家国情》OCR",
      sources: [
        { title: "Hochschulrektorenkonferenz", url: "https://www.hrk.de/" },
        { title: "Deutschland.de: Studium", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Hochschule", "Bildung"]
    },
    {
      id: "culture-schulsystem",
      category: "culture",
      titleDe: "Grundschule und Schulsystem",
      titleZh: "小学与学校体系",
      contentDe: "Mit sechs Jahren kommen alle Kinder in die Grundschule, die die ersten vier Schuljahre umfasst (in Berlin sechs Jahre). Danach besucht fast die Hälfte die Hauptschule, die vor allem auf einen praktischen Beruf vorbereitet. Der Besuch öffentlicher Schulen ist kostenlos; Religionsunterricht ist kein Pflichtfach.",
      contentZh: "所有儿童六岁进入小学，小学包括前四个学年（柏林为六年）。之后近一半学生进入主体中学，主要为正业职业做准备。公立学校免费，宗教课不是必修。",
      bookSource: "《德语国家概况 德文版》OCR",
      sources: [
        { title: "Kultusministerkonferenz", url: "https://www.kmk.org/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Schule", "Bildung"]
    },
    {
      id: "culture-verkehrswende",
      category: "culture",
      titleDe: "Auto und Umwelt in Deutschland",
      titleZh: "汽车与环境",
      contentDe: "Viele Deutsche lieben ihr Auto, sorgen sich aber auch um den Wald. Abgase und Luftverschmutzung schädigen Bäume; über ein Tempolimit wird bis heute kontrovers diskutiert. Neue Autos dürfen nur mit Katalysator fahren, Tankstellen müssen bleifreies Benzin anbieten.",
      contentZh: "许多德国人热爱汽车，但也关心森林。废气和空气污染损害树木；关于高速公路限速至今仍有争议。新车必须装催化转化器，加油站必须提供无铅汽油。",
      bookSource: "《德语学习背景知识 德国面面观》OCR",
      sources: [
        { title: "Umweltbundesamt", url: "https://www.umweltbundesamt.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Verkehr", "Umwelt"]
    },
    {
      id: "culture-bremen",
      category: "culture",
      titleDe: "Bremen und Bremerhaven",
      titleZh: "不来梅与不来梅港",
      contentDe: "Bremen ist bekannt für den gotischen St.-Petri-Dom, das Renaissance-Rathaus und die Rolandsäule von 1404, ein Symbol der Stadtfreiheit. Die Bremer Stadtmusikanten gehen auf ein Märchen der Brüder Grimm zurück. Bremerhaven wurde 1827 als neuer Hafen gegründet und ist ein Zentrum der Polarforschung.",
      contentZh: "不来梅以哥特式圣彼得大教堂、文艺复兴市政厅和1404年的罗兰柱闻名，后者是城市自由的象征。不来梅的城市乐手源自格林童话。不来梅港建于1827年，是极地研究中心。",
      bookSource: "《德语国家概况 德文版》OCR",
      sources: [
        { title: "Bremen Tourism", url: "https://www.bremen-tourism.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Bremen", "Stadt"]
    },
    {
      id: "culture-dienstleistungsgesellschaft",
      category: "culture",
      titleDe: "Der Weg zur Dienstleistungsgesellschaft",
      titleZh: "走向服务业社会",
      contentDe: "Moderne Volkswirtschaften verändern ständig ihre Strukturen. In Deutschland verschiebt sich die Wirtschaft vom primären Sektor (Land- und Forstwirtschaft) und sekundären Sektor (Industrie) zum tertiären Sektor der Dienstleistungen. In den USA und Japan ist dieser Wandel weiter fortgeschritten.",
      contentZh: "现代国民经济结构不断变化。德国经济从第一产业（农林）和第二产业（工业）转向第三产业的服务业。美国和日本的这一转变更为深入。",
      bookSource: "《德语国家国情》OCR",
      sources: [
        { title: "Statistisches Bundesamt", url: "https://www.destatis.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Wirtschaft", "Dienstleistung"]
    },
    {
      id: "culture-wartburg",
      category: "culture",
      titleDe: "Die Wartburg bei Eisenach",
      titleZh: "艾森纳赫附近的瓦尔特堡",
      contentDe: "Auf der Wartburg soll im 13. Jahrhundert der Sängerkrieg stattgefunden haben; Richard Wagners Oper „Tannhäuser“ spielt hier. 1521–22 übersetzte Martin Luther auf der Wartburg die Bibel ins Deutsche, ein wichtiger Schritt für die neuhochdeutsche Sprache. 1817 trafen sich hier deutsche Studenten.",
      contentZh: "传说13世纪瓦尔特堡举行过歌手比赛，瓦格纳歌剧《唐豪瑟》以此为背景。1521–22年马丁·路德在堡中把《圣经》译成德语，是新高地德语发展的重要一步。1817年德国学生在此集会。",
      bookSource: "《德语国家概况 德文版》OCR",
      sources: [
        { title: "Wartburg", url: "https://www.wartburg.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Wartburg", "Luther"]
    },
    {
      id: "culture-presse",
      category: "culture",
      titleDe: "Die deutsche Presselandschaft",
      titleZh: "德国报刊业",
      contentDe: "Das deutsche Zeitungswesen ist mehr als 300 Jahre alt. In der Bundesrepublik gibt es mehr als 9000 Zeitschriften. International bekannt sind das Nachrichtenmagazin „Der Spiegel“ mit einer Auflage von über einer Million Exemplaren und das 1993 gegründete „Focus“.",
      contentZh: "德国报业已有300多年历史。联邦德国有9000多种杂志。国际知名的是发行量超过百万的《明镜》周刊和1993年创办的《焦点》。",
      bookSource: "《德语国家国情》OCR",
      sources: [
        { title: "Der Spiegel", url: "https://www.spiegel.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Presse", "Medien"]
    },
    {
      id: "culture-oesterreichisches-deutsch",
      category: "culture",
      titleDe: "Österreichisches Deutsch",
      titleZh: "奥地利德语",
      contentDe: "Rund 98 Prozent der Österreicher sprechen Deutsch als Muttersprache. Hochdeutsch klingt in Österreich etwas anders; die Grammatik weist geringe Unterschiede auf. Österreich verwendet häufiger das Perfekt: „Ich bin gelegen“ statt „Ich habe gelegen“.",
      contentZh: "约98%的奥地利人以德语为母语。奥地利的高地德语听起来略有不同，语法差异很小。奥地利更常用完成时，例如说“Ich bin gelegen”而不是“Ich habe gelegen”。",
      bookSource: "《德语国家概况 德文版》OCR",
      sources: [
        { title: "Österreichisches Wörterbuch", url: "https://www.oebv.at/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Österreich", "Sprache"]
    },
    {
      id: "culture-kaffeehaus",
      category: "culture",
      titleDe: "Das Wiener Kaffeehaus",
      titleZh: "维也纳咖啡馆",
      contentDe: "Das Kaffeehaus ist in Österreich eine gesellschaftliche Institution. Man trinkt dort Schwarzen, Braunen, Kapuziner oder Einspänner und kann Zeitungen lesen, Korrespondenz erledigen, sich unterhalten oder Schach spielen. Der Kaffee gehört zum Alltag wie der Wein.",
      contentZh: "咖啡馆在奥地利是一种社会机构。人们在那里喝黑咖啡、加少量奶的咖啡、卡布奇诺或加奶油的咖啡，可以读报、写信、聊天或下棋。咖啡和葡萄酒一样属于日常生活。",
      bookSource: "《德语国家概况 德文版》OCR",
      sources: [
        { title: "Wien Tourismus", url: "https://www.wien.info/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Kaffeehaus", "Österreich"]
    },
    {
      id: "culture-oesterreichische-kueche",
      category: "culture",
      titleDe: "Die österreichische Küche",
      titleZh: "奥地利饮食",
      contentDe: "Zur österreichischen Küche gehören Knödel, Rahmsoße, Leberkäse und Eiernockerln. Eine Wiener Spezialität ist der Tafelspitz, gekochtes Rindfleisch mit Apfelkren und Schnittlauchsauce. Auch Hammelfleisch wird häufiger gegessen als in Deutschland.",
      contentZh: "奥地利菜包括丸子、奶油酱、肉酪和蛋面疙瘩。维也纳特色是煮牛肉 Tafelspitz，配苹果辣根和细香葱酱。羊肉也比德国吃得多。",
      bookSource: "《德语国家概况 德文版》OCR",
      sources: [
        { title: "Wien Tourismus", url: "https://www.wien.info/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Küche", "Österreich"]
    },
    {
      id: "culture-parteien",
      category: "culture",
      titleDe: "Das deutsche Parteiensystem",
      titleZh: "德国政党体系",
      contentDe: "Im Deutschen Bundestag sind sechs Parteien vertreten. Die Fünfprozentklausel verhindert eine Zersplitterung; Bündnis 90/Die Grünen entstanden aus der Bürgerbewegung der Wende, die PDS ist Nachfolgerin der SED. 1994 zog Bündnis 90 erstmals in den Bundestag ein.",
      contentZh: "德国联邦议院有六个政党。5%门槛防止议会碎片化；联盟90/绿党源自转折时期的公民运动，PDS 是 SED 的后继党。1994年联盟90首次进入联邦议院。",
      bookSource: "《德语国家国情》OCR",
      sources: [
        { title: "Bundestag", url: "https://www.bundestag.de/" },
        { title: "Bundeswahlleiter", url: "https://www.bundeswahlleiter.de/" }
      ],
      confidence: 0.9,
      tags: ["Parteien", "Politik"]
    },
    {
      id: "culture-wiener-oper",
      category: "culture",
      titleDe: "Wiener Oper und Operette",
      titleZh: "维也纳歌剧与轻歌剧",
      contentDe: "Nach 1900 erlebte die Wiener Oper mit Gustav Mahler und Richard Strauss eine glanzvolle Ära. Alban Berg, Gottfried von Einem und Arnold Schönberg gingen neue Wege; Schönberg entwickelte die Zwölftonmusik, um ihn bildete sich die Zweite Wiener Schule.",
      contentZh: "1900年后，维也纳歌剧院在马勒和理查·施特劳斯带领下进入辉煌时期。贝尔格、艾内姆和勋伯格开辟新路；勋伯格发展十二音音乐，围绕他形成第二维也纳乐派。",
      bookSource: "《德语国家概况 德文版》OCR",
      sources: [
        { title: "Wiener Staatsoper", url: "https://www.wiener-staatsoper.at/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Oper", "Wien"]
    },
    {
      id: "history-weimar",
      category: "history",
      year: "1919",
      titleDe: "Die Weimarer Republik",
      titleZh: "魏玛共和国",
      contentDe: "Die Weimarer Republik entstand 1919, als die Nationalversammlung in Weimar die Weimarer Verfassung verabschiedete; Hauptstadt war Berlin. Sie war die erste Republik auf gesamtdeutschem Gebiet. Friedrich Ebert wurde Reichspräsident, Philipp Scheidemann Reichskanzler; das Reich bestand aus 18 Ländern. Alte Eliten in Verwaltung, Justiz und Reichswehr blieben jedoch einflussreich.",
      contentZh: "魏玛共和国诞生于1919年：国民议会在魏玛通过魏玛宪法，首都是柏林。它是德国历史上第一个覆盖全德的共和国。艾伯特任总统，谢德曼任总理；帝国由18个邦组成。但行政、司法和国防军中的旧精英仍有影响力。",
      bookSource: "《德语学习》30周年精选 文化卷 OCR",
      sources: [
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" },
        { title: "Deutsches Historisches Museum", url: "https://www.dhm.de/" }
      ],
      confidence: 0.95,
      tags: ["Weimar", "Republik"]
    },
    {
      id: "culture-gewerkschaften",
      category: "culture",
      titleDe: "Die deutschen Gewerkschaften",
      titleZh: "德国工会",
      contentDe: "Der Deutsche Gewerkschaftsbund (DGB) ist parteipolitisch neutral. Die Gewerkschaftsbewegung entstand im 19. Jahrhundert und erkämpfte bessere Arbeitsbedingungen. 1933 wurden die freien Gewerkschaften von den Nationalsozialisten zerschlagen und erst nach 1945 wieder aufgebaut.",
      contentZh: "德国工会联合会（DGB）在党派政治上保持中立。工会运动产生于19世纪，争取更好的劳动条件。1933年自由工会被纳粹摧毁，1945年后才重建。",
      bookSource: "《德语国家国情》OCR",
      sources: [
        { title: "DGB", url: "https://www.dgb.de/" },
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" }
      ],
      confidence: 0.9,
      tags: ["Gewerkschaft", "Arbeit"]
    },
    {
      id: "culture-schweiz-staedte",
      category: "culture",
      titleDe: "Murten und Neuenburg",
      titleZh: "穆尔滕与纳沙泰尔",
      contentDe: "Murten/Morat ist ein kleines historisches Städtchen, dessen mittelalterlicher Charakter erhalten blieb; die malerische Altstadt ist von einer Ringmauer aus dem 12. Jahrhundert umgeben. Neuenburg/Neuchâtel am Neuenburgersee besitzt eine Universität und das Schweizerische Laboratorium für Uhrenforschung.",
      contentZh: "穆尔滕是一座保留中世纪风貌的小城，迷人的老城被12世纪的环形城墙围绕。纳沙泰尔位于纳沙泰尔湖畔，拥有大学和瑞士钟表研究所。",
      bookSource: "《德语国家概况 德文版》OCR",
      sources: [
        { title: "Schweiz Tourismus", url: "https://www.myswitzerland.com/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Schweiz", "Stadt"]
    },
    {
      id: "culture-fussball-nationalteam",
      category: "culture",
      titleDe: "Die deutsche Nationalmannschaft",
      titleZh: "德国国家足球队",
      contentDe: "Die deutsche Fußballnationalmannschaft gehört zu den erfolgreichsten Teams der Welt. Bei der WM 1982 in Spanien erreichte sie nach einem 1:2 gegen Algerien und einem Halbfinalsieg im Elfmeterschießen gegen Frankreich das Finale. Fußball ist Teil der deutschen Alltagskultur.",
      contentZh: "德国国家足球队是世界最成功的球队之一。1982年西班牙世界杯，他们在1:2负于阿尔及利亚后，半决赛点球淘汰法国进入决赛。足球是德国日常文化的一部分。",
      bookSource: "《德语学习》30周年精选 文化卷 OCR",
      sources: [
        { title: "DFB", url: "https://www.dfb.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Fußball", "Sport"]
    },
    {
      id: "culture-realismus",
      category: "culture",
      titleDe: "Realismus in Literatur und Kunst",
      titleZh: "文学与艺术中的现实主义",
      contentDe: "Im 19. Jahrhundert verlor der Idealismus als Kunststil an Kraft; die Wirklichkeit begann, in Literatur und bildende Kunst einzuziehen. Maler wie Courbet, Millet und Daumier nahmen die genaue Beobachtung der Realität zum Ausgangspunkt ihrer Arbeit.",
      contentZh: "19世纪，理想主义作为艺术风格逐渐失去生命力；现实开始进入文学与造型艺术。库尔贝、米勒、杜米埃等画家以对现实的细致观察作为创作起点。",
      bookSource: "《德语学习》30周年精选 文化卷 OCR",
      sources: [
        { title: "Deutsches Historisches Museum", url: "https://www.dhm.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Realismus", "Kunst"]
    },
    {
      id: "person-eucken",
      category: "person",
      titleDe: "Rudolf Eucken",
      titleZh: "鲁道夫·奥伊肯",
      contentDe: "Rudolf Eucken (1846–1926) war Philosoph und Nobelpreisträger für Literatur 1908. Er knüpfte an den deutschen Idealismus an und verstand das geistige Leben als ethisch-creative Tat. Sein Hauptwerk „Die Einheit des Geisteslebens in Bewusstsein und Tat der Menschheit“ erschien 1888.",
      contentZh: "鲁道夫·奥伊肯（1846–1926）是哲学家，1908年获诺贝尔文学奖。他继承德国唯心主义，把精神生活理解为伦理性的创造行动。主要著作《人类意识与行为中精神生活的统一》出版于1888年。",
      bookSource: "《德语学习》30周年精选 文化卷 OCR",
      sources: [
        { title: "Nobel Prize: Eucken", url: "https://www.nobelprize.org/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Philosophie", "Nobelpreis"]
    },
    {
      id: "culture-alltagsetikette",
      category: "culture",
      titleDe: "Alltagsetikette in Deutschland",
      titleZh: "德国日常礼仪",
      contentDe: "Die Anrede „Fräulein“ gilt heute als veraltet; Frauen werden mit „Frau“ angesprochen. Bei Einladungen ist ein Gastgeschenk üblich, aber nicht Pflicht. Trinkgeld gibt man dezent und unauffällig, meist fünf bis zehn Prozent.",
      contentZh: "“Fräulein”这一称呼如今被视为过时，女性应称“Frau”。做客通常带小礼物，但不是义务。小费应低调给，通常为5%到10%。",
      bookSource: "《德语学习》30周年精选 文化卷 OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "DW", url: "https://www.dw.com/de/" }
      ],
      confidence: 0.85,
      tags: ["Etikette", "Alltag"]
    },
    {
      id: "culture-wohnkultur",
      category: "culture",
      titleDe: "Wohnung und Privatsphäre",
      titleZh: "住宅与私人空间",
      contentDe: "„Mein Haus ist meine Burg“ – in Deutschland gilt die eigene Wohnung stark als Privat- und Intimsphäre. Wer jemanden besucht, dringt in diesen Bereich ein; deshalb werden Besuche oft förmlich vereinbart und die eigene Wohnung bleibt eher verschlossen.",
      contentZh: "“我的家是我的城堡”——在德国，自己的住宅被视为强烈的私人乃至亲密空间。拜访别人就是进入这一领域，因此访问通常要正式约定，自己的家也相对封闭。",
      bookSource: "《德语学习》30周年精选 文化卷 OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "DW", url: "https://www.dw.com/de/" }
      ],
      confidence: 0.8,
      tags: ["Wohnen", "Privatsphäre"]
    },
    {
      id: "culture-festkultur",
      category: "culture",
      titleDe: "Die deutsche Festkultur",
      titleZh: "德国节庆文化",
      contentDe: "Deutschland ist reich an Festen: Ein Wörterbuch der Gegenwartssprache zählt 54 Wortverbindungen mit „Fest“ und 37 mit „Feier“. Gefeiert werden Einweihung, Einzug, Ernte, Fasching, Frieden, Frühling, Hochzeit, Neujahr, Ostern und Weihnachten – vom Atelierfest bis zum Winzerfest.",
      contentZh: "德国节庆丰富：一部当代德语词典列出54个带“Fest”的组合和37个带“Feier”的组合。人们庆祝落成、迁入、丰收、狂欢节、和平、春天、婚礼、新年、复活节和圣诞节——从画室节到葡萄酒农节。",
      bookSource: "《德语学习》30周年精选 文化卷 OCR",
      sources: [
        { title: "Deutschland.de: Feste", url: "https://www.deutschland.de/" },
        { title: "DW", url: "https://www.dw.com/de/" }
      ],
      confidence: 0.85,
      tags: ["Feste", "Brauchtum"]
    },
    {
      id: "person-keller",
      category: "person",
      titleDe: "Gottfried Keller",
      titleZh: "戈特弗里德·凯勒",
      contentDe: "Gottfried Keller (1819–1890) war ein Schweizer Schriftsteller und Vertreter des Realismus. Er engagierte sich politisch für den Liberalismus, beteiligte sich 1844/45 an den Freischarenzügen und schrieb Gedichte, Novellen und den Roman „Der grüne Heinrich“.",
      contentZh: "戈特弗里德·凯勒（1819–1890）是瑞士作家、现实主义代表。他积极投身自由主义政治，1844/45年参加自由军团，写有诗歌、中篇小说和长篇小说《绿衣亨利》。",
      bookSource: "《天才的画像 瑞士德语文学十大家》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Literatur", "Schweiz"]
    },
    {
      id: "culture-gebrauchslyrik",
      category: "culture",
      titleDe: "Das Gedicht als Gebrauchsartikel",
      titleZh: "作为“日用品”的诗歌",
      contentDe: "In der modernen Lyrik gilt das Gedicht als Gebrauchsartikel eigener Art: Es wird gebraucht, verbraucht sich aber nicht. Enzensberger legte seinem Lyrikband „Landessprache“ eine „Gebrauchsanweisung für unerschrockene Leser“ bei, Brecht 1927 eine „Anleitung zum Gebrauch der einzelnen Lektionen“.",
      contentZh: "在现代诗歌中，诗被视为一种特殊的“日用品”：它被使用，却不会用旧。恩岑斯贝格给诗集《国语》附上“给无畏读者的使用说明”，布莱希特1927年也附有“各课使用指南”。",
      bookSource: "《德语学习》30周年精选 文化卷 OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Lyrik", "Literatur"]
    },
    {
      id: "culture-monatsnamen",
      category: "culture",
      titleDe: "Woher die deutschen Monatsnamen kommen",
      titleZh: "德语月份名称的来源",
      contentDe: "Viele deutsche Monatsnamen gehen auf römische Götter und Feste zurück: Februar von Februarius, März von Mars, April von Aprilis („Blüte“), Mai von der Göttin Maius. Der Kalender verbindet damit Antike und Alltag.",
      contentZh: "许多德语月份名来自罗马神祇和节日：Februar 来自 Februarius，März 来自战神 Mars，April 来自 Aprilis（“开花”），Mai 来自女神 Maius。日历把古代与日常连接起来。",
      bookSource: "《德语学习》30周年精选 文化卷 OCR",
      sources: [
        { title: "DW: Monatsnamen", url: "https://www.dw.com/de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Kalender", "Sprache"]
    },
    {
      id: "history-heinrich-loewe",
      category: "history",
      titleDe: "Heinrich der Löwe",
      titleZh: "狮子亨利",
      contentDe: "Herzog Heinrich der Löwe (1129/1131–1195) war einer der mächtigsten Fürsten des Reiches. Die Sage erzählt, er habe auf einer Pilgerfahrt ins Heilige Land von einem Pascha einen treuen Löwen geschenkt bekommen, der ihm überallhin folgte. Der Löwe wurde zu seinem Wappentier.",
      contentZh: "狮子亨利公爵（1129/1131–1195）是帝国最强大的诸侯之一。传说他在前往圣地的朝圣途中从一位帕夏那里得到一头忠实的狮子，狮子处处跟随他，后来成为他的纹章动物。",
      bookSource: "《德语学习》30周年精选 文化卷 OCR",
      sources: [
        { title: "Deutsches Historisches Museum", url: "https://www.dhm.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.8,
      tags: ["Heinrich der Löwe", "Sage"]
    },
    {
      id: "culture-kriegsliteratur",
      category: "culture",
      titleDe: "Kriegsliteratur der Nachkriegszeit",
      titleZh: "战后战争文学",
      contentDe: "Hans Bender (1919–2015) gehört zu den Autoren, die nach 1945 über Krieg und Menschlichkeit schrieben. Sein Gedicht „Die Rückkehr“ verbindet knappe, kühle Sprache mit der Frage nach Schuld, Trauer und der Rückkehr in den Alltag.",
      contentZh: "汉斯·本德尔（1919–2015）属于1945年后书写战争与人性的作家。他的诗《归来》以简洁冷静的语言追问罪责、悲痛与回归日常。",
      bookSource: "《德语学习》30周年精选 文学卷 OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Kriegsliteratur", "Nachkriegszeit"]
    },
    {
      id: "culture-schiller-tradition",
      category: "culture",
      titleDe: "Schiller und der Generationenkonflikt",
      titleZh: "席勒与代际冲突",
      contentDe: "Die Pflege des klassischen Erbes kann zur starren Traditionspflege werden. In der Erzählung steht der ältere Germanist Eghard, der sein Leben ganz Schiller widmet, dem jungen Fridolin gegenüber, der Schillers Pathos ablehnt. Der Text fragt, wie Tradition und Gegenwart verbunden werden können.",
      contentZh: "对古典遗产的维护可能变成僵化的传统主义。故事中，把一生献给席勒的老日耳曼学者埃格哈德与拒绝席勒激情的年轻人弗里多林形成对立。文本追问传统如何与当下连接。",
      bookSource: "《德语学习》30周年精选 文学卷 OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Schiller", "Tradition"]
    },
    {
      id: "person-kafka",
      category: "person",
      titleDe: "Franz Kafka",
      titleZh: "弗朗茨·卡夫卡",
      contentDe: "Franz Kafka (1883–1924) schrieb Erzählungen und Romane, in denen Bürokratie, Schuld und familiäre Macht albtraumhaft werden. Sein „Brief an den Vater“ schildert den Konflikt mit einem autoritären Vater; die ungeheure Macht der Vaterfigur prägt auch „Das Urteil“ und „Die Verwandlung“.",
      contentZh: "弗朗茨·卡夫卡（1883–1924）写小说与短篇，把官僚机构、罪责与家庭权力写成噩梦。《致父亲的信》描写与专制父亲的冲突；父亲形象的巨大权力也影响《判决》和《变形记》。",
      bookSource: "《卡夫卡及其他》OCR",
      sources: [
        { title: "Kafka Society", url: "https://www.kafka-gesellschaft.de/" },
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" }
      ],
      confidence: 0.9,
      tags: ["Kafka", "Literatur"]
    },
    {
      id: "culture-industriearbeit",
      category: "history",
      titleDe: "Industriearbeit und ihre Kosten",
      titleZh: "工业劳动的代价",
      contentDe: "Die Industrialisierung brachte nicht nur Fortschritt, sondern auch gesundheitliche und soziale Kosten. In der Bundesrepublik der 1970er Jahre wurde diskutiert, dass Fabrikarbeit die Lebenserwartung senkt, viele Arbeiter den Rentenbeginn nicht erreichen und Arbeitswege sowie Unfälle zusätzlich belasten.",
      contentZh: "工业化不仅带来进步，也带来健康与社会代价。1970年代的联邦德国讨论到：工厂劳动降低寿命，许多工人活不到退休年龄，通勤与事故也加重负担。",
      bookSource: "《联邦共和国的贫困》OCR",
      sources: [
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Industrialisierung", "Arbeit"]
    },
    {
      id: "culture-kafka-traum",
      category: "culture",
      titleDe: "Kafka und der Traum",
      titleZh: "卡夫卡与梦",
      contentDe: "Kafkas Erzählungen sind oft wie Träume gebaut: logische Sprünge, plötzliche Szenenwechsel und eine unheimliche Selbstverständlichkeit des Unmöglichen. Die „Verwandlung“ und der „Landarzt“ arbeiten mit diesen Traumstrukturen, ohne den Traum ausdrücklich zu benennen.",
      contentZh: "卡夫卡的小说常像梦一样结构：逻辑跳跃、场景突变，以及不可能之事的诡异理所当然。《变形记》和《乡村医生》使用这种梦的结构，却不明确点出梦。",
      bookSource: "《卡夫卡及其他》OCR",
      sources: [
        { title: "Kafka Society", url: "https://www.kafka-gesellschaft.de/" },
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" }
      ],
      confidence: 0.85,
      tags: ["Kafka", "Traum"]
    },
    {
      id: "culture-interkulturelle-zusammenarbeit",
      category: "culture",
      titleDe: "Interkulturelle Zusammenarbeit",
      titleZh: "跨文化合作",
      contentDe: "In deutsch-chinesischen Joint Ventures treffen unterschiedliche Vorstellungen von Selbstständigkeit, Verantwortung und Führung aufeinander. Begriffe wie Autonomie, Pflicht und Eigeninitiative sind nicht in beiden Kulturen gleich definiert; daraus entstehen Missverständnisse und Konflikte.",
      contentZh: "在德中合资企业中，关于自主、责任和领导的观念会发生碰撞。自治、义务和主动性等概念在两种文化中的定义并不相同，因而产生误解与冲突。",
      bookSource: "《跨文化管理》OCR",
      sources: [
        { title: "Goethe-Institut", url: "https://www.goethe.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Interkultur", "Arbeit"]
    },
    {
      id: "history-wirtschaftskrise-1970er",
      category: "history",
      titleDe: "Wirtschaftskrise und Kurzarbeit",
      titleZh: "经济危机与短时工作",
      contentDe: "Nach dem Ölschock 1973 gerieten viele Betriebe in der Bundesrepublik unter Druck. Zeitungen berichteten fast täglich über Betriebsschließungen und Entlassungen; in manchen Firmen wurde Kurzarbeit eingeführt, um Entlassungen zu vermeiden. Beschäftigte fürchteten den Verlust des Arbeitsplatzes.",
      contentZh: "1973年石油危机后，联邦德国许多企业承受压力。报纸几乎每天报道停产和解雇；一些企业实行短时工作以避免裁员。员工担心失去工作。",
      bookSource: "《联邦共和国的贫困》OCR",
      sources: [
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Wirtschaft", "Krise"]
    },
    {
      id: "person-hesse",
      category: "person",
      titleDe: "Hermann Hesse",
      titleZh: "赫尔曼·黑塞",
      contentDe: "Hermann Hesse (1877–1962) war ein deutsch-schweizerischer Schriftsteller. Im Ersten Weltkrieg kritisierte er den Nationalismus; sein Essay „O Freunde, nicht diese Töne“ brachte ihm in Deutschland Feindschaft ein. 1946 erhielt er den Nobelpreis für Literatur.",
      contentZh: "赫尔曼·黑塞（1877–1962）是德裔瑞士作家。一战期间他批评民族主义，文章《噢，朋友，别用这种腔调》使他在德国遭到敌视。1946年获诺贝尔文学奖。",
      bookSource: "《天才的画像 瑞士德语文学十大家》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Nobel Prize", url: "https://www.nobelprize.org/" }
      ],
      confidence: 0.9,
      tags: ["Hesse", "Literatur"]
    },
    {
      id: "person-frisch",
      category: "person",
      titleDe: "Max Frisch",
      titleZh: "马克斯·弗里施",
      contentDe: "Max Frisch (1911–1991) war ein Schweizer Schriftsteller und Architekt. Im Zentrum seines Werks steht die Frage „Wer bin ich?“ – die Suche nach Identität, das Verhältnis von Selbst- und Fremdbild sowie die Kritik an festen Rollen. Romane wie „Stiller“ und „Homo faber“ kreisen um diese Themen.",
      contentZh: "马克斯·弗里施（1911–1991）是瑞士作家和建筑师。其作品核心是“我是谁？”——对身份的寻找、自我形象与他人形象的关系，以及对固定角色的批判。《施蒂勒》《能干的法贝尔》等长篇小说都围绕这些主题。",
      bookSource: "《天才的画像 瑞士德语文学十大家》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Frisch", "Identität"]
    },
    {
      id: "culture-kafka-juedische-identitaet",
      category: "culture",
      titleDe: "Kafka und die jüdische Identität",
      titleZh: "卡夫卡与犹太身份",
      contentDe: "Kafka wuchs in Prag in einer deutschsprachigen jüdischen Familie in Böhmen auf, damals Teil Österreich-Ungarns. Fragen von Zugehörigkeit, Ausgrenzung und „Heimatlosigkeit“ prägen seine Texte; seine Figuren sind oft Außenseiter, die keinen festen Platz in der Gesellschaft finden.",
      contentZh: "卡夫卡在波希米亚布拉格一个讲德语的犹太家庭长大，当时属奥匈帝国。归属、排斥与“无家可归”的问题贯穿其文本；他的人物常是找不到社会固定位置的外来者。",
      bookSource: "《卡夫卡及其他》OCR",
      sources: [
        { title: "Kafka Society", url: "https://www.kafka-gesellschaft.de/" },
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" }
      ],
      confidence: 0.85,
      tags: ["Kafka", "Identität"]
    },
    {
      id: "history-wohnungsnot",
      category: "history",
      titleDe: "Wohnungsnot in der Bundesrepublik",
      titleZh: "联邦德国的住房短缺",
      contentDe: "In den 1970er Jahren war die Wohnungsnot in der Bundesrepublik groß: Statistiken nannten 1,7 Millionen Menschen ohne Bad oder Dusche, 5,8 Millionen Wohnungen ohne Warmwasser und über eine Million renovierungsbedürftige Wohnungen. Viele Arbeiter und Rentner lebten auf weniger als 40 Quadratmetern.",
      contentZh: "1970年代联邦德国住房短缺严重：统计称170万人没有浴室或淋浴，580万套住房没有热水，超过100万套住房需要翻修。许多工人和养老金领取者住在不到40平方米的房子里。",
      bookSource: "《联邦共和国的贫困》OCR",
      sources: [
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Wohnen", "Sozialgeschichte"]
    },
    {
      id: "person-duerrenmatt",
      category: "person",
      titleDe: "Friedrich Dürrenmatt",
      titleZh: "弗里德里希·迪伦马特",
      contentDe: "Friedrich Dürrenmatt (1921–1990) war ein Schweizer Dramatiker und Erzähler. Seine Stücke und Prosa entlarven Utopien, Moral und Macht als Selbsttäuschung; zugleich fragen sie, wie ein einzelner in einer korrupten Welt seine Stimme behaupten kann. Bekannt sind „Die Physiker“ und „Der Besuch der alten Dame“.",
      contentZh: "弗里德里希·迪伦马特（1921–1990）是瑞士剧作家和小说家。他的剧作与散文揭穿乌托邦、道德和权力作为自我欺骗的一面，同时追问个人如何在腐败的世界中坚持自己的声音。代表作有《物理学家》和《老妇还乡》。",
      bookSource: "《天才的画像 瑞士德语文学十大家》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Dürrenmatt", "Literatur"]
    },
    {
      id: "person-grass",
      category: "person",
      titleDe: "Günter Grass",
      titleZh: "君特·格拉斯",
      contentDe: "Günter Grass (1927–2015) war ein deutscher Schriftsteller, Grafiker und politischer Intellektueller. Sein Roman „Die Blechtrommel“ (1959) erzählt die deutsche Geschichte des 20. Jahrhunderts aus der Perspektive des kleinwüchsigen Oskar Matzerath. 1999 erhielt Grass den Nobelpreis für Literatur.",
      contentZh: "君特·格拉斯（1927–2015）是德国作家、版画家和公共知识分子。长篇小说《铁皮鼓》（1959）通过侏儒奥斯卡·马策拉特的视角讲述20世纪德国历史。1999年获诺贝尔文学奖。",
      bookSource: "《卡夫卡及其他》OCR",
      sources: [
        { title: "Nobel Prize", url: "https://www.nobelprize.org/" },
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" }
      ],
      confidence: 0.9,
      tags: ["Grass", "Literatur"]
    },
    {
      id: "person-muschg",
      category: "person",
      titleDe: "Adolf Muschg",
      titleZh: "阿道夫·穆施格",
      contentDe: "Adolf Muschg (geb. 1934) ist ein Schweizer Schriftsteller und Literaturwissenschaftler. Er lehrte deutsche Literatur und schrieb Romane und Essays; 1994 erhielt er den Büchner-Preis, 2003 wurde er erster Präsident der Akademie der Künste in Berlin.",
      contentZh: "阿道夫·穆施格（1934年生）是瑞士作家和文学学者。他教授德国文学并写小说与随笔；1994年获毕希纳奖，2003年成为柏林艺术学院首任院长。",
      bookSource: "《天才的画像 瑞士德语文学十大家》OCR",
      sources: [
        { title: "Akademie der Künste", url: "https://www.adk.de/" },
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" }
      ],
      confidence: 0.9,
      tags: ["Muschg", "Literatur"]
    },
    {
      id: "person-brecht",
      category: "person",
      titleDe: "Bertolt Brecht",
      titleZh: "贝托尔特·布莱希特",
      contentDe: "Bertolt Brecht (1898–1956) war Dramatiker, Lyriker und Theatertheoretiker. Er entwickelte das „epische Theater“ mit Verfremdungseffekten, damit das Publikum nicht mitfühlt, sondern kritisch urteil. Zu seinen bekanntesten Stücken gehören „Die Dreigroschenoper“ und „Mutter Courage und ihre Kinder“.",
      contentZh: "贝托尔特·布莱希特（1898–1956）是剧作家、诗人和戏剧理论家。他发展出带有间离效果的“史诗剧”，让观众不是共鸣，而是批判性判断。代表作有《三毛钱歌剧》和《大胆妈妈和她的孩子们》。",
      bookSource: "《卡夫卡及其他》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Brecht", "Theater"]
    },
    {
      id: "person-bichsel",
      category: "person",
      titleDe: "Peter Bichsel",
      titleZh: "彼得·比克塞尔",
      contentDe: "Peter Bichsel (geb. 1935) ist ein Schweizer Erzähler, bekannt für kurze, präzise Geschichten. In „Kindergeschichten“ und anderen Texten zeigt er, wie Sprache an Grenzen stößt und Menschen trotz Nähe nicht zueinander finden; oft ersetzt Imagination die verhinderte Kommunikation.",
      contentZh: "彼得·比克塞尔（1935年生）是瑞士小说家，以短小精确的故事闻名。《儿童故事》等文本展现语言如何触及边界，人们即使亲近也无法彼此抵达；想象常常取代被阻断的交流。",
      bookSource: "《天才的画像 瑞士德语文学十大家》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Bichsel", "Literatur"]
    },
    {
      id: "culture-sport-gewalt",
      category: "culture",
      titleDe: "Sport, Körper und Gewalt auf der Bühne",
      titleZh: "舞台上的体育、身体与暴力",
      contentDe: "Ein Theaterstück der Jahrhundertwende deutet Sport als Ort von Macht und Gewalt: Körperkult, Militärtraining und Medienvermarktung werden zu Formen der Disziplinierung. Die Figuren sind keine Charaktere mehr, sondern Träger von Sprache; das Stück zeigt, wie Sport individuelle Körper in ein Machtspiel zwingt.",
      contentZh: "一部世纪之交的剧作把体育解读为权力与暴力的场所：身体崇拜、军事训练和媒体营销都成为规训形式。人物不再是角色，而是语言的载体；剧作展现体育如何把个体身体卷入权力游戏。",
      bookSource: "《当代外国文学纪事 1980–2000 德语卷 下》OCR",
      sources: [
        { title: "Goethe-Institut", url: "https://www.goethe.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.8,
      tags: ["Sport", "Theater"]
    },
    {
      id: "culture-medienpolitik",
      category: "culture",
      titleDe: "Politik als Medieninszenierung",
      titleZh: "作为媒体表演的政治",
      contentDe: "In der literarischen Darstellung wird Politik zur Inszenierung: Ein Politiker gewinnt Wahlen nicht durch Programme, sondern durch Kameraauftritte, Familienbilder und Wahlkampfinszenierung. Die mediale Wirklichkeit überholt die reale Wirklichkeit – ein Thema, das an heutige Debatten über Politainment erinnert.",
      contentZh: "在文学描写中，政治成为表演：政治家不是靠纲领赢得选举，而是靠镜头表现、家庭照片和竞选表演。媒体现实超过了现实本身——这一主题让人想到今天关于“政治娱乐化”的讨论。",
      bookSource: "《天才的画像 瑞士德语文学十大家》OCR",
      sources: [
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.8,
      tags: ["Medien", "Politik"]
    },
    {
      id: "culture-novelle",
      category: "culture",
      titleDe: "Die deutsche Novelle",
      titleZh: "德语中篇小说",
      contentDe: "Die Novelle ist eine mittlere Erzählform, die seit dem 19. Jahrhundert in der deutschen Literatur eine besondere Rolle spielt. Sie konzentriert sich auf einen Konflikt, oft ein einziges außergewöhnliches Ereignis, und führt Figuren in eine Krise. Bekannte Beispiele sind Goethes „Novelle“, Kleists „Erdbeben in Chili“ und Stifters „Bergkristall“.",
      contentZh: "中篇小说是19世纪以来德语文学中特别重要的中等篇幅叙事形式。它聚焦一个冲突，往往是一个非同寻常的事件，把人物推向危机。著名例子有歌德的《中篇小说》、克莱斯特的《智利地震》和施蒂夫特的《水晶》。",
      bookSource: "《德语国家中篇小说选》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Novelle", "Literatur"]
    },
    {
      id: "person-baerfuss",
      category: "person",
      titleDe: "Lukas Bärfuss",
      titleZh: "卢卡斯·贝尔福斯",
      contentDe: "Lukas Bärfuss (geb. 1971) ist ein Schweizer Schriftsteller und Dramatiker. Seine Stücke und Romane behandeln Gewalt, Schuld und die Frage, wie Menschen in einer Welt ohne Gott und Erlösung miteinander sprechen können. Für sein Werk erhielt er mehrere Literaturpreise.",
      contentZh: "卢卡斯·贝尔福斯（1971年生）是瑞士作家和剧作家。他的剧作与长篇小说处理暴力、罪责，以及人在没有上帝与救赎的世界中如何彼此交谈。其作品获多项文学奖。",
      bookSource: "《天才的画像 瑞士德语文学十大家》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Bärfuss", "Theater"]
    },
    {
      id: "culture-goethe-haus",
      category: "culture",
      titleDe: "Goethes Elternhaus und der „Beijing-Saal“",
      titleZh: "歌德故居与“北京厅”",
      contentDe: "Goethes Geburtshaus in Frankfurt am Main zeigt bürgerliche Wohnkultur des 18. Jahrhunderts. Ein Raum im zweiten Stock heißt „Beijing-Saal“; Wandtapeten und Ofenmalereien erinnern an die damalige China-Mode (Chinoiserie). Der Kontakt mit dieser Mode könnte Goethes späteres Interesse an China beeinflusst haben.",
      contentZh: "歌德在法兰克福的出生故居展现18世纪市民居住文化。二楼有一个房间叫“北京厅”，墙纸和炉壁绘画让人想起当时的中国风（Chinoiserie）。这种时尚可能影响了歌德晚年对中国的兴趣。",
      bookSource: "《卡夫卡及其他》OCR",
      sources: [
        { title: "Goethe-Haus Frankfurt", url: "https://www.goethehaus-frankfurt.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Goethe", "Chinoiserie"]
    },
    {
      id: "person-schiller",
      category: "person",
      titleDe: "Friedrich Schiller",
      titleZh: "弗里德里希·席勒",
      contentDe: "Friedrich Schiller (1759–1805) war Dichter, Dramatiker und Historiker. Seine Dramen „Die Räuber“, „Maria Stuart“ und „Wilhelm Tell“ gehören zum Kanon der deutschen Klassik. Schiller arbeitete auch als Übersetzer und Bearbeiter; geplante Romanprojekte blieben jedoch Fragmente.",
      contentZh: "弗里德里希·席勒（1759–1805）是诗人、剧作家和历史学家。他的剧作《强盗》《玛丽亚·斯图亚特》和《威廉·退尔》属于德国古典文学经典。席勒也从事翻译和改编，但计划中的小说项目只留下片段。",
      bookSource: "《卡夫卡及其他》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Schiller", "Klassik"]
    },
    {
      id: "person-stifter",
      category: "person",
      titleDe: "Adalbert Stifter",
      titleZh: "阿达尔贝特·施蒂夫特",
      contentDe: "Adalbert Stifter (1805–1868) war ein österreichischer Schriftsteller, Maler und Pädagoge. Seine Erzählungen wie „Der Hochwald“ und „Bergkristall“ verbinden genaue Naturbeobachtung mit ruhiger, oft langsam erzählter Handlung; Landschaft und Jahreszeiten werden zu Trägern von Ordnung und Moral.",
      contentZh: "阿达尔贝特·施蒂夫特（1805–1868）是奥地利作家、画家和教育家。《高林》《水晶》等小说把细致的自然观察与平静、缓慢的叙事结合；风景与季节成为秩序和道德的载体。",
      bookSource: "《德语国家中篇小说选》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Stifter", "Literatur"]
    },
    {
      id: "culture-aviatik",
      category: "culture",
      titleDe: "Aviatik und Technikbegeisterung",
      titleZh: "航空与科技热情",
      contentDe: "In der Literatur des frühen 20. Jahrhunderts wird das Fliegen zum Symbol für Fortschritt, Männlichkeit und Gefahr. Erzählungen beschreiben Sauerstoffmangel, Kälte und Materialversagen in großer Höhe; der Pilot erscheint als Grenzgänger zwischen Technik und Tod.",
      contentZh: "在20世纪初的文学中，飞行成为进步、男性气质与危险的象征。小说描写高空的缺氧、寒冷和材料失效；飞行员成为技术与死亡之间的越界者。",
      bookSource: "《20世纪外国短篇小说编年 德语卷 上》OCR",
      sources: [
        { title: "Deutsches Museum", url: "https://www.deutsches-museum.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Aviatik", "Technik"]
    },
    {
      id: "history-frankenreich",
      category: "history",
      titleDe: "Frankenreich und Christianisierung",
      titleZh: "法兰克王国与基督教化",
      contentDe: "Chlodwig I. ließ sich um 500 n. Chr. taufen; die Annahme des Christentums stärkte seine Herrschaft und band das Frankenreich an die römische Kirche. Karl der Große (768–814) verband Eroberung und Mission: Seine Feldzüge wurden von Geistlichen begleitet, die das Christentum verbreiten sollten.",
      contentZh: "克洛维一世约公元500年受洗；接受基督教巩固了他的统治，并把法兰克王国与罗马教会联系起来。查理大帝（768–814）把征服与传教结合：他的远征有神职人员随行，负责传播基督教。",
      bookSource: "《德语与德国文化》OCR",
      sources: [
        { title: "Deutsches Historisches Museum", url: "https://www.dhm.de/" },
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" }
      ],
      confidence: 0.9,
      tags: ["Frankenreich", "Christianisierung"]
    },
    {
      id: "culture-ostasienforschung",
      category: "culture",
      titleDe: "Deutsche Ostasienforschung",
      titleZh: "德国东亚研究",
      contentDe: "Die deutsche Ostasienforschung fragt, wie Wissen über China, Japan und Korea entsteht und wie es in globale Geschichtserzählungen eingeht. Statt nur westliche Perspektiven zu wiederholen, untersucht sie Übersetzung, Kulturkontakt und die Macht der Begriffe.",
      contentZh: "德国东亚研究追问关于中国、日本和韩国的知识如何形成，又如何进入全球历史叙事。它不只重复西方视角，而研究翻译、文化接触和概念权力。",
      bookSource: "《东亚研究与全球史建构》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.8,
      tags: ["Ostasien", "Wissenschaft"]
    },
    {
      id: "culture-merseburger-zaubersprueche",
      category: "culture",
      titleDe: "Die Merseburger Zaubersprüche",
      titleZh: "梅尔塞堡咒语",
      contentDe: "Die Merseburger Zaubersprüche sind die einzigen überlieferten althochdeutschen Texte heidnischen Inhalts. Sie wurden 1841 in der Bibliothek des Merseburger Doms gefunden und zeigen, wie sich germanische Vorstellungen und christliche Schriftkultur berühren.",
      contentZh: "《梅尔塞堡咒语》是唯一流传下来的古高地德语异教内容文本。1841年在梅尔塞堡大教堂图书馆被发现，展现日耳曼观念与基督教书写文化如何接触。",
      bookSource: "《德语与德国文化》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Althochdeutsch", "Mythologie"]
    },
    {
      id: "culture-yin-yang",
      category: "culture",
      titleDe: "Yin und Yang als Weltmodell",
      titleZh: "阴阳作为世界模型",
      contentDe: "In der chinesischen Philosophie beschreiben Yin und Yang eine harmonische Polarität, die als Modell der Weltwahrnehmung dient. Der Text betont jedoch, dass die Harmonie nicht symmetrisch sein muss: In der überlieferten Ordnung ist Yin dem Yang oft untergeordnet.",
      contentZh: "在中国哲学中，阴阳描述一种和谐的极性，作为感知世界的模型。但文本强调，这种和谐未必对称：在传统秩序中，阴往往从属于阳。",
      bookSource: "《外国人看中国文化》OCR",
      sources: [
        { title: "Goethe-Institut", url: "https://www.goethe.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["China", "Philosophie"]
    },
    {
      id: "culture-parzival",
      category: "culture",
      titleDe: "Parzival und der Gral",
      titleZh: "帕尔西法尔与圣杯",
      contentDe: "Wolfram von Eschenbachs Versroman „Parzival“ (um 1200) erzählt von einem jungen Ritter, der zunächst unwissend aufwächst, dann den Gral sucht und schließlich Herrschaft und Mitgefühl lernen muss. Der Gral steht für eine transzendente Ordnung, die der Held nicht durch Kampf allein erreicht.",
      contentZh: "沃尔夫拉姆·冯·埃申巴赫的韵文小说《帕尔西法尔》（约1200年）讲述一位年轻骑士在无知中长大，随后寻找圣杯，最终学会统治与同情。圣杯代表一种超越秩序，英雄不能只靠战斗获得。",
      bookSource: "《德语与德国文化》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Parzival", "Mittelalter"]
    },
    {
      id: "culture-einkindpolitik",
      category: "culture",
      titleZh: "独生子女政策与家庭计划",
      titleDe: "Familienplanung und Einkindpolitik",
      contentDe: "Die chinesische Familienplanung der 1980er Jahre sollte das Bevölkerungswachstum bremsen. In der Praxis gab es jedoch Umgehungen: späte Heirat, nichteheliche Geburten und illegale Adoptionen wurden von lokalen Stellen oft nicht konsequent kontrolliert. Der Text zeigt den Unterschied zwischen Vorschrift und Alltag.",
      contentZh: "1980年代的中国计划生育旨在抑制人口增长。但实践中存在规避：晚婚、非婚生育和非法收养往往未被地方部门严格执行。文本展现了规定与日常之间的差距。",
      bookSource: "《外国人看中国文化》OCR",
      sources: [
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.8,
      tags: ["China", "Bevölkerung"]
    },
    {
      id: "culture-lutherbibel",
      category: "history",
      titleDe: "Luthers Bibelübersetzung",
      titleZh: "路德的圣经翻译",
      contentDe: "Martin Luther übersetzte ab 1522 das Neue Testament ins Deutsche und schuf damit eine wichtige Grundlage der neuhochdeutschen Schriftsprache. Seine Übersetzung verband Reformation, Buchdruck und Alphabetisierung; Bibelworte gingen in den Alltag ein.",
      contentZh: "马丁·路德从1522年起把新约译成德语，为新高地德语书面语奠定重要基础。他的译本把宗教改革、印刷术和识字普及联系起来；圣经语句进入日常语言。",
      bookSource: "《德语与德国文化》OCR",
      sources: [
        { title: "Deutsches Historisches Museum", url: "https://www.dhm.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Luther", "Reformation"]
    },
    {
      id: "culture-kulturelles-gedaechtnis",
      category: "culture",
      titleDe: "Kulturelles Gedächtnis",
      titleZh: "文化记忆",
      contentDe: "Der Begriff des kulturellen Gedächtnisses (Aleida und Jan Assmann) beschreibt, wie Gesellschaften Vergangenheit durch Texte, Rituale und Medien vergegenwärtigen. Erinnerung ist nicht nur individuell; sie wird durch Schrift, Bilder und Institutionen geformt und kann über Generationen weitergegeben werden.",
      contentZh: "“文化记忆”概念（阿莱达·阿斯曼与扬·阿斯曼）描述社会如何通过文本、仪式和媒介再现过去。记忆不仅是个人的，也由文字、图像和制度塑造，并可跨代传递。",
      bookSource: "《德语文学中的文化记忆与民族价值观》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Gedächtnis", "Kultur"]
    },
    {
      id: "culture-franzoesische-revolution",
      category: "history",
      titleDe: "Die Französische Revolution und die deutsche Literatur",
      titleZh: "法国大革命与德国文学",
      contentDe: "Die Französische Revolution von 1789 veränderte die politische Sprache Europas. Deutsche Autoren reagierten unterschiedlich: Schiller und Goethe verarbeiteten Freiheit, Macht und Gewalt in Dramen; viele Intellektuelle schwankten zwischen Begeisterung und Ablehnung der jakobinischen Gewalt.",
      contentZh: "1789年法国大革命改变了欧洲的政治语言。德国作家反应不一：席勒和歌德在戏剧中处理自由、权力与暴力；许多知识分子在热情与对雅各宾暴力的排斥之间摇摆。",
      bookSource: "《德语与德国文化》OCR",
      sources: [
        { title: "Deutsches Historisches Museum", url: "https://www.dhm.de/" },
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" }
      ],
      confidence: 0.9,
      tags: ["Revolution", "Literatur"]
    },
    {
      id: "culture-telefon",
      category: "culture",
      titleDe: "Das Telefon als Nabelschnur",
      titleZh: "作为“脐带”的电话",
      contentDe: "Das Telefon macht Menschen jederzeit erreichbar und verbindet Orte über Kontinente hinweg. Zugleich beschreibt der Essay die Abhängigkeit: Beim Geschäftsessen liegt das Handy zwischen den Tellern, im Kino werden Anrufe angenommen. Die „Nabelschnur“ hält uns nicht nur verbunden, sondern auch gefangen.",
      contentZh: "电话让人随时可被联系，并把各大洲的地方连接起来。但随笔也描写依赖：商务餐时手机放在盘子之间，看电影时也接电话。“脐带”不仅连接我们，也把我们拴住。",
      bookSource: "《今日德国》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.85,
      tags: ["Kommunikation", "Alltag"]
    },
    {
      id: "person-heine",
      category: "person",
      titleDe: "Heinrich Heine",
      titleZh: "海因里希·海涅",
      contentDe: "Heinrich Heine (1797–1856) war Lyriker, Essayist und Journalist. Seine Prosa verbindet scharfe Ironie mit politischer Kritik; Gedichte wie „Die Loreley“ wurden volkstümlich. Im Exil in Paris schrieb er über Deutschland und die Revolution, ohne sich mit einer Partei gleichzusetzen.",
      contentZh: "海因里希·海涅（1797–1856）是诗人、随笔家和记者。他的散文把尖锐讽刺与政治批判结合；《罗蕾莱》等诗广为人知。流亡巴黎期间，他书写德国与革命，却不与任何党派完全认同。",
      bookSource: "《德语与德国文化》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Heine", "Literatur"]
    },
    {
      id: "culture-multikulturelle-gesellschaft",
      category: "culture",
      titleDe: "Multikulturelle Gesellschaft",
      titleZh: "多元文化社会",
      contentDe: "Der Begriff „multikulturelle Gesellschaft“ beschreibt das Zusammenleben unterschiedlicher Herkunftskulturen. In der Debatte wird er teils als Bereicherung, teils als Problem gesehen; Kritiker warnen vor Parallelgesellschaften, Befürworter betonen Gleichberechtigung und kulturellen Austausch.",
      contentZh: "“多元文化社会”描述不同来源文化共处。争论中它有时被视为丰富，有时被视为问题；批评者警告平行社会，支持者强调平等与文化交换。",
      bookSource: "《今日德国》OCR",
      sources: [
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Migration", "Gesellschaft"]
    },
    {
      id: "culture-oesterreichisches-deutsch",
      category: "culture",
      titleDe: "Österreichisches Deutsch",
      titleZh: "奥地利德语",
      contentDe: "Österreichisches Deutsch unterscheidet sich in Aussprache, Wortschatz und einzelnen Grammatikformen vom Standarddeutsch. Nach 1945 betonte Österreich seine kulturelle Eigenständigkeit und sprach vom „donauösterreichischen Schriftdeutsch“; im Alltag bleiben regionale Mundarten wichtig.",
      contentZh: "奥地利德语在发音、词汇和个别语法形式上与标准德语不同。1945年后奥地利强调文化独立，提出“多瑙河奥地利书面德语”；日常生活中方言仍然重要。",
      bookSource: "《德语与德国文化》OCR",
      sources: [
        { title: "Österreichisches Wörterbuch", url: "https://www.oewb.at/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Österreich", "Sprache"]
    },
    {
      id: "culture-grass-poetik",
      category: "culture",
      titleDe: "Grass und die Poetik der Dinge",
      titleZh: "格拉斯与物的诗学",
      contentDe: "Grass versteht Dinge wie Kartoffeln oder Gegenstände nicht nur als Requisiten, sondern als Prüfsteine der Wirklichkeit. Ein Ding bedeutet zunächst nur sich selbst, gewinnt aber durch wiederholte Kontexte eine feste, symbolische Bedeutung. Seine Poetik verbindet genaue Beobachtung mit politischer Erinnerung.",
      contentZh: "格拉斯不把土豆或物品只当道具，而当作现实的试金石。物首先只代表自身，但通过反复出现的语境获得固定的象征意义。他的诗学把细致观察与政治记忆结合。",
      bookSource: "《德语文学与文化 阐释与思辨》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Grass", "Poetik"]
    },
    {
      id: "culture-goethe-tasso",
      category: "culture",
      titleDe: "Goethes „Torquato Tasso“",
      titleZh: "歌德的《塔索》",
      contentDe: "Goethes Drama „Torquato Tasso“ (1790) gilt als formal vollendetes klassisches Drama. Es verwendet den fünffüßigen Jambus und stellt den Dichter Tasso zwischen höfische Anerkennung und persönlicher Freiheit; Kunst, Macht und Gesellschaft geraten in Konflikt.",
      contentZh: "歌德的戏剧《塔索》（1790）被视为形式完美的古典戏剧。它使用五步抑扬格，把诗人塔索置于宫廷认可与个人自由之间；艺术、权力与社会发生冲突。",
      bookSource: "《德语文学中的文化记忆与民族价值观》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Goethe", "Klassik"]
    },
    {
      id: "culture-interkulturelle-kompetenz",
      category: "culture",
      titleDe: "Interkulturelle Kompetenz",
      titleZh: "跨文化能力",
      contentDe: "Interkulturelle Kompetenz meint nicht nur Sprachkenntnisse, sondern die Fähigkeit, unterschiedliche Denk- und Verhaltensweisen zu verstehen. Schon bei Pünktlichkeit, Terminplanung sowie den Begriffen Qualität und Effizienz können Missverständnisse entstehen, weil Werte kulturell verschieden sind.",
      contentZh: "跨文化能力不只是语言知识，而是理解不同思维与行为方式的能力。仅守时、日程安排以及“质量”“效率”等概念就可能产生误解，因为价值观因文化而异。",
      bookSource: "《今日德国》OCR",
      sources: [
        { title: "Goethe-Institut", url: "https://www.goethe.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Interkultur", "Kompetenz"]
    },
    {
      id: "culture-schachnovelle",
      category: "culture",
      titleDe: "Stefan Zweig: „Schachnovelle“",
      titleZh: "茨威格《象棋的故事》",
      contentDe: "Stefan Zweigs „Schachnovelle“ (1942) spielt auf einem Schiff: Ein Schachweltmeister trifft auf einen Mann, der während der NS-Haft Schach im Kopf spielte. Das Brettspiel wird zur Metapher für Isolation, Zwang und die Zerstörung des Bewusstseins.",
      contentZh: "斯蒂芬·茨威格的《象棋的故事》（1942）发生在船上：一位国际象棋世界冠军遇到一个在纳粹囚禁期间靠脑中下棋的人。棋盘游戏成为孤立、强制与意识毁灭的隐喻。",
      bookSource: "《德语经典中篇小说》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Zweig", "Novelle"]
    },
    {
      id: "culture-jugendherberge",
      category: "culture",
      titleDe: "Jugendherberge und Klassenreise",
      titleZh: "青年旅舍与班级旅行",
      contentDe: "Klassenreisen in Deutschland führen oft in Jugendherbergen. Die gemeinsame Unterkunft, feste Nachtruhe und Gruppenaktivitäten sollen Gemeinschaft fördern; für viele Schüler sind diese Fahrten ein prägendes Erlebnis.",
      contentZh: "德国的班级旅行常去青年旅舍。共同住宿、固定就寝时间和集体活动旨在促进集体感；对许多学生来说，这些旅行是难忘经历。",
      bookSource: "《今日德国》OCR",
      sources: [
        { title: "Deutsches Jugendherbergswerk", url: "https://www.jugendherberge.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Jugend", "Reisen"]
    },
    {
      id: "person-bachmann",
      category: "person",
      titleDe: "Ingeborg Bachmann",
      titleZh: "英格博格·巴赫曼",
      contentDe: "Ingeborg Bachmann (1926–1973) war eine österreichische Lyrikerin und Erzählerin. In „Undine geht“ verschiebt sie die traditionellen Geschlechterrollen: Nicht die Frau ist seelenlos und abhängig, sondern der Mann. Ihre Texte verbinden poetische Sprache mit Gesellschaftskritik.",
      contentZh: "英格博格·巴赫曼（1926–1973）是奥地利诗人、小说家。在《温蒂娜走了》中，她颠倒了传统性别角色：没有灵魂、依赖他人的不是女性，而是男性。她的文本把诗意语言与社会批判结合。",
      bookSource: "《德语文学中的文化记忆与民族价值观》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Bachmann", "Literatur"]
    },
    {
      id: "culture-grenzverkehr",
      category: "culture",
      titleDe: "Grenzverkehr und Urlaubsreise",
      titleZh: "边境交通与度假旅行",
      contentDe: "Vor dem Schengen-Abkommen waren Grenzkontrollen und lange Warteschlangen ein fester Teil der Urlaubsreise. Der Text beschreibt die Anreise als Katastrophe: Stau, genervte Kinder und erschöpfte Großeltern. Heute sind viele Binnengrenzen offen, doch Staus bleiben ein Ferienthema.",
      contentZh: "在申根协定之前，边检和长队是度假旅行的固定部分。文本把出行写成灾难：堵车、烦躁的孩子和筋疲力尽的祖父母。如今许多内部边界开放，但堵车仍是假期话题。",
      bookSource: "《今日德国》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" }
      ],
      confidence: 0.85,
      tags: ["Grenze", "Reisen"]
    },
    {
      id: "culture-china-fremde",
      category: "culture",
      titleDe: "China und die Fremden",
      titleZh: "中国与外国人",
      contentDe: "Ein Text von 1926 beschreibt, wie Chinesen Fremde wahrnehmen und wie Höflichkeit, Etikette und das Gesicht-Wahren den Umgang prägen. Der Blick von außen sagt zugleich viel über die Erwartungen der Europäer an China.",
      contentZh: "一篇1926年的文本描写中国人如何感知外国人，以及礼貌、礼节和顾全面子如何影响交往。外部视角同时也反映了欧洲人对中国的期待。",
      bookSource: "《外国人看中国文化》OCR",
      sources: [
        { title: "Goethe-Institut", url: "https://www.goethe.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["China", "Fremdwahrnehmung"]
    },
    {
      id: "culture-technikethik",
      category: "culture",
      titleDe: "Technikethik und Zukunftsverantwortung",
      titleZh: "技术伦理与未来责任",
      contentDe: "Hans Jonas fragt, welche Verantwortung wir für die Folgen technischen Handelns tragen. Weil moderne Technik weit in die Zukunft wirkt, reicht eine Ethik der Nähe nicht aus; nötig ist eine Verantwortungsethik, die auch künftige Generationen einbezieht.",
      contentZh: "汉斯·约纳斯追问我们对技术行为后果负有何种责任。由于现代技术影响深远，仅靠近处的伦理不够；需要一种把未来世代也纳入的责任伦理。",
      bookSource: "《德语文学与文化 阐释与思辨》OCR",
      sources: [
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Technik", "Ethik"]
    },
    {
      id: "culture-deutscher-sprachraum",
      category: "culture",
      titleDe: "Der deutsche Sprachraum",
      titleZh: "德语语言区",
      contentDe: "Deutsch wird nicht nur in Deutschland, sondern auch in Österreich, der Schweiz, Liechtenstein, Luxemburg und Teilen Belgiens und Südtirols gesprochen. Standardsprache und regionale Dialekte bestehen nebeneinander; die Frage „Ist die deutsche Sprache schrecklich?“ verweist auf Vorurteile gegenüber Lauten und Grammatik.",
      contentZh: "德语不仅在德国使用，也在奥地利、瑞士、列支敦士登、卢森堡以及比利时和南蒂罗尔部分地区使用。标准语与地区方言并存；“德语很可怕吗？”这一问题指向对语音和语法的偏见。",
      bookSource: "《德语学习背景知识 德国面面观》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.9,
      tags: ["Sprache", "Sprachraum"]
    },
    {
      id: "geography-deutschland-landschaften",
      category: "map",
      titleDe: "Landschaften Deutschlands",
      titleZh: "德国地貌",
      contentDe: "Deutschland reicht von den Alpen im Süden über Mittelgebirge und Flusstäler bis zur Nord- und Ostseeküste. Rhein, Donau und Elbe prägen die Landschaft; Waldgebiete, Bodensee und Küsten sind wichtige Erholungsräume.",
      contentZh: "德国从南部的阿尔卑斯山，经中部山地和河谷，延伸到北海与波罗的海海岸。莱茵河、多瑙河和易北河塑造了地貌；森林、博登湖和海岸是重要的休闲空间。",
      bookSource: "《德语国家概况》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" }
      ],
      confidence: 0.9,
      tags: ["Geographie", "Landschaft"]
    },
    {
      id: "culture-getraenkekonsum",
      category: "culture",
      titleDe: "Getränkekonsum in Deutschland",
      titleZh: "德国的饮料消费",
      contentDe: "Sind die Deutschen Bier- oder Weintrinker? Eine Studie mit über 12.000 Befragten zeigt: Kaffee, Wasser/Mineralwasser und Tee liegen vorn. Der Konsum ist regional verschieden; Bier und Wein spielen je nach Gegend eine unterschiedlich große Rolle.",
      contentZh: "德国人是喝啤酒还是喝葡萄酒？一项超过1.2万人的调查显示：咖啡、水/矿泉水、茶最受欢迎。消费因地区而异；啤酒和葡萄酒在不同地区的重要性不同。",
      bookSource: "《文化视窗高级德语教程 1》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Statistisches Bundesamt", url: "https://www.destatis.de/" }
      ],
      confidence: 0.9,
      tags: ["Alltag", "Getränke"]
    },
    {
      id: "history-marshallplan-luftbruecke",
      category: "history",
      titleDe: "Marshallplan und Berliner Luftbrücke",
      titleZh: "马歇尔计划与柏林空运",
      contentDe: "Der Marshallplan (1948–1952) unterstützte den Wiederaufbau Westdeutschlands mit 1,4 Milliarden Dollar. Nach der Währungsreform 1948 blockierte die Sowjetunion West-Berlin; bis Mai 1949 versorgte eine alliierte Luftbrücke die Stadt mit täglich etwa 900 Maschinen.",
      contentZh: "马歇尔计划（1948–1952）以14亿美元支持西德重建。1948年货币改革后，苏联封锁西柏林；直到1949年5月，盟军空运每天约900架次供应城市。",
      bookSource: "《德语国家概况》OCR",
      sources: [
        { title: "Deutsches Historisches Museum", url: "https://www.dhm.de/" },
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" }
      ],
      confidence: 0.9,
      tags: ["Nachkriegszeit", "Berlin"]
    },
    {
      id: "history-oesterreich-1938",
      category: "history",
      titleDe: "Österreich 1938 und der „Anschluss“",
      titleZh: "1938年奥地利与“德奥合并”",
      contentDe: "Im März 1938 wurde Österreich an das nationalsozialistische Deutschland angeschlossen. Hitler wurde in Wien und Linz als Sieger empfangen; anschließend war Österreich Teil des „Dritten Reiches“ und seiner Kriegspolitik. Die Frage nach Mitverantwortung und Widerstand bleibt historisch umstritten.",
      contentZh: "1938年3月，奥地利被并入纳粹德国。希特勒在维也纳和林茨以胜利者姿态受到欢迎；随后奥地利成为“第三帝国”及其战争政策的一部分。关于共同责任与抵抗的问题在史学上仍有争议。",
      bookSource: "《德语国家社会与文化》OCR",
      sources: [
        { title: "Deutsches Historisches Museum", url: "https://www.dhm.de/" },
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" }
      ],
      confidence: 0.9,
      tags: ["Österreich", "1938"]
    },
    {
      id: "culture-vornamen",
      category: "culture",
      titleDe: "Beliebte Vornamen in Deutschland",
      titleZh: "德国常见名字",
      contentDe: "Jedes Jahr untersucht die Gesellschaft für deutsche Sprache (GfdS), welche Vornamen für Neugeborene am beliebtesten sind. Sie stützt sich auf Zahlen von rund 225 Standesämtern; eine offizielle staatliche Namensstatistik gibt es nicht. Die Auswertung zeigt regionale und zeitliche Moden.",
      contentZh: "德国语言协会（GfdS）每年调查新生儿最受欢迎的名字。它依据约225个户籍登记处的数据；德国没有官方的国家姓名统计。分析显示地区与时代潮流。",
      bookSource: "《文化视窗高级德语教程 1》OCR",
      sources: [
        { title: " Gesellschaft für deutsche Sprache", url: "https://gfds.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Namen", "Alltag"]
    },
    {
      id: "history-widerstand-1944",
      category: "history",
      titleDe: "Widerstand gegen Hitler",
      titleZh: "反抗希特勒",
      contentDe: "Auch innerhalb der Wehrmacht gab es oppositionelle Gruppen. Am 20. Juli 1944 versuchte Claus Graf Schenk von Stauffenberg, Hitler mit einer Bombe zu töten; das Attentat scheiterte. Der Widerstand wird heute als wichtiger Teil der deutschen Erinnerungskultur gewürdigt.",
      contentZh: "国防军内部也有反对派团体。1944年7月20日，克劳斯·冯·施陶芬贝格伯爵试图用炸弹刺杀希特勒，但行动失败。今天，抵抗运动被视为德国记忆文化的重要部分。",
      bookSource: "《德语国家社会与文化》OCR",
      sources: [
        { title: "Deutsches Historisches Museum", url: "https://www.dhm.de/" },
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" }
      ],
      confidence: 0.9,
      tags: ["Widerstand", "1944"]
    },
    {
      id: "person-boll",
      category: "person",
      titleDe: "Heinrich Böll",
      titleZh: "海因里希·伯尔",
      contentDe: "Heinrich Böll (1917–1985) war ein deutscher Schriftsteller und Nobelpreisträger. Er gehörte zur „Gruppe 47“ und schrieb über Kriegserfahrungen, die Nachkriegszeit und die katholische Rheinland-Prägung. Bekannt sind „Ansichten eines Clowns“ und „Die verlorene Ehre der Katharina Blum“.",
      contentZh: "海因里希·伯尔（1917–1985）是德国作家、诺贝尔文学奖得主。他属于“四七社”，书写战争经历、战后时期和莱茵兰天主教背景。代表作有《小丑之见》和《丧失了名誉的卡塔琳娜·勃罗姆》。",
      bookSource: "《德语国家国情文化 学生读本》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Nobel Prize", url: "https://www.nobelprize.org/" }
      ],
      confidence: 0.9,
      tags: ["Böll", "Literatur"]
    },
    {
      id: "person-wittgenstein",
      category: "person",
      titleDe: "Ludwig Wittgenstein",
      titleZh: "路德维希·维特根斯坦",
      contentDe: "Ludwig Wittgenstein (1889–1951) war ein österreichisch-britischer Philosoph. Sein „Tractatus logico-philosophicus“ endet mit dem Satz „Wovon man nicht sprechen kann, darüber muss man schweigen.“ Später entwickelte er in den „Philosophischen Untersuchungen“ den Begriff des Sprachspiels: Bedeutung entsteht durch Gebrauch.",
      contentZh: "路德维希·维特根斯坦（1889–1951）是奥地利-英国哲学家。《逻辑哲学论》以“对于不可言说之物，必须保持沉默”结束。后来他在《哲学研究》中提出“语言游戏”概念：意义产生于使用。",
      bookSource: "《德语国家社会与文化》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.9,
      tags: ["Wittgenstein", "Sprachphilosophie"]
    },
    {
      id: "culture-weimar-klassik",
      category: "culture",
      titleDe: "Weimar als Zentrum der Klassik",
      titleZh: "魏玛与古典主义",
      contentDe: "Um 1800 wurde Weimar zum geistigen Zentrum der deutschen Kultur. Hier lebten Wieland und Herder, vor allem aber Goethe, der den größten Teil seines Lebens in Weimar verbrachte; auch Schiller arbeitete dort. Die Stadt gilt bis heute als Symbol der Weimarer Klassik.",
      contentZh: "约1800年，魏玛成为德国文化的精神中心。维兰德和赫尔德在此生活，尤其是歌德，他一生大部分时间在魏玛度过；席勒也曾在此工作。这座城市至今被视为魏玛古典主义的象征。",
      bookSource: "《德语国家概况》OCR",
      sources: [
        { title: "Klassik Stiftung Weimar", url: "https://www.klassik-stiftung.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Weimar", "Klassik"]
    },
    {
      id: "culture-brandenburger-tor",
      category: "history",
      titleDe: "Das Brandenburger Tor",
      titleZh: "勃兰登堡门",
      contentDe: "Das Brandenburger Tor wurde 1788–1791 nach Plänen von Carl Gotthard Langhans errichtet und gilt als Hauptwerk des deutschen Klassizismus. Es erlebte Napoleons Einzug, die Teilung Berlins und den Mauerfall 1989; heute steht es für Einheit und Erinnerung.",
      contentZh: "勃兰登堡门建于1788–1791年，由卡尔·戈特哈德·朗汉斯设计，被视为德国古典主义建筑代表作。它经历拿破仑入城、柏林分裂和1989年柏林墙倒塌；今天象征统一与记忆。",
      bookSource: "《德语国家社会与文化》OCR",
      sources: [
        { title: "Deutsches Historisches Museum", url: "https://www.dhm.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Berlin", "Denkmal"]
    },
    {
      id: "culture-wiener-klassik",
      category: "culture",
      titleDe: "Die Wiener Klassik",
      titleZh: "维也纳古典乐派",
      contentDe: "Die Wiener Klassik bezeichnet die Musikepoche um Haydn, Mozart und Beethoven. Wien war im 18. Jahrhundert das Zentrum der europäischen Musik; die Komponisten entwickelten neue Formen wie die Sinfonie und das Streichquartett. Der Begriff stammt aus dem 19. Jahrhundert.",
      contentZh: "维也纳古典乐派指海顿、莫扎特和贝多芬周围的音乐时代。18世纪维也纳是欧洲音乐中心；作曲家发展了交响曲、弦乐四重奏等新形式。这一概念来自19世纪。",
      bookSource: "《德语国家社会与文化》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.9,
      tags: ["Wien", "Musik"]
    },
    {
      id: "person-heinrich-mann",
      category: "person",
      titleDe: "Heinrich Mann",
      titleZh: "海因里希·曼",
      contentDe: "Heinrich Mann (1871–1950) war ein deutscher Schriftsteller und Bruder von Thomas Mann. Sein Roman „Der Untertan“ (1918) ist eine Satire auf den wilhelminischen Untertanengeist: Die Hauptfigur Diederich Heßling passt sich nach oben an und tritt nach unten brutal auf.",
      contentZh: "海因里希·曼（1871–1950）是德国作家，托马斯·曼的哥哥。长篇小说《臣仆》（1918）讽刺威廉时代的臣民精神：主人公赫斯林对上顺从、对下残暴。",
      bookSource: "《德语文学导读》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Heinrich Mann", "Satire"]
    },
    {
      id: "culture-oesterreichische-getraenke",
      category: "culture",
      titleDe: "Wein, Heuriger und Bier in Österreich",
      titleZh: "奥地利的葡萄酒、新酒酒馆与啤酒",
      contentDe: "In Österreich wird Wein besonders geschätzt; viele Sorten sind nach Anbaugebieten benannt (Grinzinger, Gumpoldskirchner). Der „Heurige“ bezeichnet sowohl den jungen Wein als auch die Weinstube, die ihn ausschenkt. Bier steht an zweiter Stelle, bekannt sind Sorten wie Schwechater oder Gösser.",
      contentZh: "奥地利人尤其喜爱葡萄酒；许多酒以产区命名（Grinzinger、Gumpoldskirchner）。“Heuriger”既指新酒，也指供应新酒的酒馆。啤酒居第二位，著名品牌有 Schwechater、Gösser。",
      bookSource: "《德语国家概况》OCR",
      sources: [
        { title: " Österreich Wein", url: "https://www.oesterreichwein.at/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Österreich", "Essen und Trinken"]
    },
    {
      id: "culture-zwischenjahr",
      category: "culture",
      titleDe: "Nach dem Abitur: Studium oder Zwischenjahr?",
      titleZh: "高中毕业后：直接上大学还是间隔年？",
      contentDe: "Nach dem Abitur fällt die Studienwahl oft schwer. Berufsberatung, Interessentests und ein Zwischenjahr mit Praktikum, Freiwilligem Sozialem Jahr oder Auslandsjob können helfen, Ziele zu klären. Personalchefs bewerten solche Zwischenschritte meist positiv.",
      contentZh: "高中毕业后，专业选择往往很难。职业咨询、兴趣测试，以及包含实习、社会志愿年或国外工作的间隔年，有助于明确目标。人事经理通常正面评价这些中间步骤。",
      bookSource: "《文化视窗高级德语教程 1》OCR",
      sources: [
        { title: "Bundesagentur für Arbeit", url: "https://www.arbeitsagentur.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Bildung", "Beruf"]
    },
    {
      id: "culture-zweite-wiener-schule",
      category: "culture",
      titleDe: "Die Zweite Wiener Schule",
      titleZh: "第二维也纳乐派",
      contentDe: "Arnold Schönberg entwickelte die Zwölftontechnik, die auf zwölf chromatischen Halbtönen aufbaut. Um ihn formierte sich die Zweite Wiener Schule. Wien pflegt bis heute eine reiche Musik- und Theaterkultur, etwa mit den Wiener Festwochen und der Viennale.",
      contentZh: "阿诺德·勋伯格发展出以十二个半音为基础的十二音技法。围绕他形成了第二维也纳乐派。维也纳至今保持丰富的音乐与戏剧文化，如维也纳艺术节和 Viennale 电影节。",
      bookSource: "《德语国家概况》OCR",
      sources: [
        { title: "Wien Kultur", url: "https://www.wien.info/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Wien", "Musik"]
    },
    {
      id: "culture-schweizer-verkehr",
      category: "culture",
      titleDe: "Das Schweizer Verkehrsnetz",
      titleZh: "瑞士交通网络",
      contentDe: "Die Schweiz hat ein außerordentlich dichtes Verkehrsnetz. 1960 stimmte das Volk dem Bau eines Nationalstraßennetzes zu; heute ist die Schweiz nach Deutschland das am stärksten motorisierte Land Europas. Die SBB bestehen seit 1898, und der Gotthard-Basistunnel ist mit 57 km der längste Eisenbahntunnel der Welt.",
      contentZh: "瑞士拥有极其密集的交通网络。1960年全民公投同意建设国家公路网；如今瑞士是欧洲仅次于德国的机动车密度最高国家。瑞士联邦铁路成立于1898年，圣哥达基线隧道长57公里，是世界最长铁路隧道。",
      bookSource: "《德语国家概况》OCR",
      sources: [
        { title: "Schweizerische Bundesbahnen", url: "https://www.sbb.ch/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Schweiz", "Verkehr"]
    },
    {
      id: "language-modalverben",
      category: "culture",
      titleDe: "Modalverben: objektiv und subjektiv",
      titleZh: "情态动词：客观与主观用法",
      contentDe: "Bei können, sollen, dürfen, müssen, mögen und wollen unterscheidet man objektiven und subjektiven Gebrauch. Objektiv drücken sie Möglichkeit, Verbot oder Notwendigkeit aus; subjektiv geben sie eine Vermutung oder Distanzierung wieder.",
      contentZh: "情态动词 können、sollen、dürfen、müssen、mögen、wollen 有客观与主观用法。客观用法表达可能、禁止或必要；主观用法表达推测或距离感。",
      bookSource: "《文化视窗高级德语教程 1》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.9,
      tags: ["Grammatik", "Modalverben"]
    },
    {
      id: "culture-trendsport",
      category: "culture",
      titleDe: "Trendsport und Alltag",
      titleZh: "潮流运动与日常",
      contentDe: "Trendsportarten wie Klettern, Snowboarden oder Bungee-Jumping versprechen den „Thrill“, der im Alltag fehlt. Wer sie ausübt, sucht oft persönliche Grenzen und eine „Gegenwelt“ zur Routine. Technische Ausrüstung macht das Risiko jedoch meist kalkulierbar.",
      contentZh: "攀岩、单板滑雪或蹦极等潮流运动承诺日常中缺失的“刺激”。参与者常寻找个人边界与逃离日常的“对立世界”。技术装备通常让风险变得可计算。",
      bookSource: "《文化视窗高级德语教程 1》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.85,
      tags: ["Sport", "Alltag"]
    },
    {
      id: "culture-schweizer-uhrenindustrie",
      category: "culture",
      titleDe: "Die Schweizer Uhrenindustrie",
      titleZh: "瑞士钟表业",
      contentDe: "Die Kantone Neuenburg und Jura gelten als traditionelle Zentren der Schweizer Uhrenindustrie. In Neuenburg entstanden die Universität (1909) und das Schweizerische Laboratorium für Uhrenforschung; die aus gelbem Jurakalkstein erbaute Stiftskirche prägt das Stadtbild.",
      contentZh: "纳沙泰尔和汝拉州被视为瑞士钟表业的传统中心。纳沙泰尔建立了大学（1909年）和瑞士钟表研究实验室；用黄色汝拉石灰岩建造的教堂塑造了城市景观。",
      bookSource: "《德语国家概况》OCR",
      sources: [
        { title: "Schweizer Uhrenindustrie", url: "https://www.swisswatches.ch/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Schweiz", "Uhren"]
    },
    {
      id: "culture-freizeit",
      category: "culture",
      titleDe: "Freizeit als eigene Zeit",
      titleZh: "作为独立时间的休闲",
      contentDe: "Freizeit galt traditionell als Zeit ohne zielgerichtete Arbeit und war Teil eines kultivierten Lebensstils. Das Begriffspaar Arbeit/Freizeit veränderte das Zeitverständnis: Es stellte die agrarische Unterscheidung von „geschäftigen“ und „müßigen“ Perioden infrage. In Shanghai tauchte der Begriff 1897 in der Freizeitzeitung „Xiaoxian Bao“ auf.",
      contentZh: "休闲传统上被视为没有目标性工作的时间，是文明生活方式的一部分。工作/休闲这组概念改变了时间理解：它质疑农业社会按季节划分“忙碌”与“闲暇”的方式。1897年上海《消闲报》已出现这一概念。",
      bookSource: "《文化视窗高级德语教程 1》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.85,
      tags: ["Freizeit", "Alltag"]
    },
    {
      id: "history-ostdeutschland-transformation",
      category: "history",
      titleDe: "Ostdeutschland nach 1990",
      titleZh: "1990年后的东德",
      contentDe: "Nach der Wiedervereinigung 1990 durchlief Ostdeutschland einen tiefen wirtschaftlichen und sozialen Umbau. Viele Betriebe wurden geschlossen, Arbeitsplätze gingen verloren; zugleich entstanden neue Institutionen und Infrastrukturen. Politische Parteien wie die CDU hatten im Osten lange mit Akzeptanzproblemen zu kämpfen.",
      contentZh: "1990年两德统一后，东德经历深刻的经济与社会转型。许多企业关闭、工作岗位流失；同时新制度和基础设施建立。基民盟等政党在东部长期面临接受度问题。",
      bookSource: "《德语报刊阅读》OCR",
      sources: [
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Ostdeutschland", "Transformation"]
    },
    {
      id: "culture-silbergeneration",
      category: "culture",
      titleDe: "Die „Silber-Generation“",
      titleZh: "“银发一代”",
      contentDe: "Die neuen Alten, auch „Silber-Generation“ genannt, bleiben körperlich und geistig fit und sind ein wichtiger Wirtschaftsfaktor. Jeder dritte Euro, der in Deutschland privat ausgegeben wird, stammt von einem Menschen über 60; bis 2050 soll dieser Anteil weiter steigen.",
      contentZh: "被称为“银发一代”的新老年人保持身体和精神活力，是重要的经济因素。德国私人支出中每三欧元就有一欧元来自60岁以上的人；到2050年这一比例还将上升。",
      bookSource: "《德语泛读教程 中》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Statistisches Bundesamt", url: "https://www.destatis.de/" }
      ],
      confidence: 0.9,
      tags: ["Alter", "Gesellschaft"]
    },
    {
      id: "culture-ellenbogengesellschaft",
      category: "culture",
      titleDe: "Ellenbogengesellschaft",
      titleZh: "“肘部社会”",
      contentDe: "Der Begriff „Ellenbogengesellschaft“ kritisiert eine Gesellschaft, in der Konkurrenz und Durchsetzung wichtiger sind als Rücksicht. Im Wirtschaftsleben geht es um Vorteile, Konkurse und berechenbare Risiken; zugleich wird die Frage gestellt, wie fair Wettbewerb sein kann.",
      contentZh: "“肘部社会”批评一种竞争和自我贯彻比顾及他人更重要的社会。经济生活中涉及利益、破产和可计算的风险；同时也追问竞争能有多公平。",
      bookSource: "《德语报刊阅读》OCR",
      sources: [
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Wirtschaft", "Gesellschaft"]
    },
    {
      id: "culture-amateurfussball",
      category: "culture",
      titleDe: "Amateurfußball und Heimatverein",
      titleZh: "业余足球与家乡俱乐部",
      contentDe: "Neben der Bundesliga prägt der Amateurfußball das Vereinsleben. Eltern fahren Kinder zu Spielen, waschen Trikots und spendieren Limonade; solche Aufgaben werden ehrenamtlich übernommen. Der Heimatverein stiftet Identität und Zusammenhalt im Ort.",
      contentZh: "除了德甲，业余足球也塑造俱乐部生活。家长送孩子去比赛、洗球衣、请喝汽水；这些工作由志愿者承担。家乡俱乐部为地方提供认同与凝聚力。",
      bookSource: "《德语报刊阅读》OCR",
      sources: [
        { title: "Deutscher Fußball-Bund", url: "https://www.dfb.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Fußball", "Verein"]
    },
    {
      id: "history-kaspar-hauser",
      category: "history",
      titleDe: "Das Rätsel Kaspar Hauser",
      titleZh: "卡斯帕·豪泽之谜",
      contentDe: "1828 tauchte in Nürnberg ein verwahrlost wirkender junger Mann auf, der kaum sprach und einen Brief bei sich trug. Er wurde als „Kaspar Hauser“ bekannt und in verschiedenen Familien erzogen. Herkunft und Tod blieben ungeklärt; zahlreiche Legenden und Spekulationen entstanden.",
      contentZh: "1828年，纽伦堡出现一个显得营养不良、几乎不会说话的年轻男子，身上带着一封信。他以“卡斯帕·豪泽”闻名，并在不同家庭接受教育。其出身与死亡始终未解，产生大量传说与猜测。",
      bookSource: "《德语泛读教程 下》OCR",
      sources: [
        { title: "Deutsches Historisches Museum", url: "https://www.dhm.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Kaspar Hauser", "Rätsel"]
    },
    {
      id: "culture-musiktherapie",
      category: "culture",
      titleDe: "Musiktherapie in Deutschland",
      titleZh: "德国的音乐治疗",
      contentDe: "Musiktherapie wird in Deutschland als staatlich anerkannte Weiterbildung angeboten. Sie verbindet musikalische Ausbildung mit Psychologie, Psychopathologie und Psychotherapie; Praktika und teilweise auch eine Lehrmusiktherapie gehören dazu. Zielgruppen sind Pädagogen, Sozialpädagogen, Psychologen und Mediziner.",
      contentZh: "音乐治疗在德国作为国家认可的进修项目提供。它把音乐训练与心理学、精神病理学和心理治疗结合；包括实习，部分还包括教学音乐治疗。对象是教育工作者、社会教育者、心理学家和医生。",
      bookSource: "《德语报刊阅读》OCR",
      sources: [
        { title: "Deutsche Musiktherapeutische Gesellschaft", url: "https://www.musiktherapie.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Musik", "Therapie"]
    },
    {
      id: "culture-kurzmitteilung",
      category: "culture",
      titleDe: "Kurzmitteilungen und Twitter",
      titleZh: "短消息与 Twitter",
      contentDe: "Twitter/X begrenzt Beiträge auf kurze Texte und fördert damit eine andere Kommunikation als im Chat: nicht dialogisch, sondern oft öffentlich und gruppenbezogen. Wer nur bestimmten Accounts folgt, sieht vor allem deren Meldungen; Missverständnisse entstehen leicht.",
      contentZh: "Twitter/X 把帖子限制在短文本，因而促成与聊天不同的交流：不是对话式的，而往往公开、面向群体。只关注某些账号的人主要看到他们的消息；误解容易产生。",
      bookSource: "《德语泛读教程 下》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.85,
      tags: ["Medien", "Kommunikation"]
    },
    {
      id: "culture-fussgaengerzone",
      category: "culture",
      titleDe: "Die Fußgängerzone",
      titleZh: "步行街",
      contentDe: "Die Fußgängerzone ist ein Bereich, der weitgehend vom Autoverkehr befreit ist. Sie entstand im 20. Jahrhundert als Antwort auf wachsenden Verkehr und dient der Verkehrsberuhigung, dem Einkauf und dem Aufenthalt. In Deutschland prägt sie viele Innenstädte.",
      contentZh: "步行街是基本禁止汽车通行的区域。它产生于20世纪，是对交通增长的反应，用于交通舒缓、购物和停留。在德国，它塑造了许多内城。",
      bookSource: "《德语报刊阅读》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" }
      ],
      confidence: 0.9,
      tags: ["Stadt", "Verkehr"]
    },
    {
      id: "culture-kinderwuensche",
      category: "culture",
      titleDe: "Zukunftswünsche von Kindern",
      titleZh: "儿童的未来愿望",
      contentDe: "In einer Umfrage von 1994 formulierten Kinder Wünsche für die Zukunft: kein Krieg mehr, eine intakte Ozonschicht, weniger Müll, geschlossene Atomkraftwerke und „Neonazis raus“. Die Aussagen zeigen, wie früh Kinder politische und ökologische Themen wahrnehmen.",
      contentZh: "在1994年的一项调查中，孩子们写下未来愿望：不再有战争、完好的臭氧层、更少垃圾、关闭核电站以及“新纳粹滚出去”。这些话语显示孩子很早就感知政治与生态议题。",
      bookSource: "《德语快速阅读》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" }
      ],
      confidence: 0.85,
      tags: ["Kinder", "Zukunft"]
    },
    {
      id: "culture-teufelsberg",
      category: "culture",
      titleDe: "Der Teufelsberg in Berlin",
      titleZh: "柏林的魔鬼山",
      contentDe: "Der Teufelsberg ist kein natürlicher Berg, sondern entstand aus 26 Millionen Kubikmetern Trümmerschutt des Zweiten Weltkriegs. Die Stadt machte daraus ein Erholungsgebiet mit Rodelbahnen, Skipiste, Langlaufloipen und Wanderwegen. Die Berliner nennen ihn liebevoll „Idiotenhügel“.",
      contentZh: "魔鬼山不是自然山体，而是由2600万立方米二战废墟堆成。城市把它改造成休闲区，设有雪橇道、滑雪坡、越野雪道和步道。柏林人亲切地称它为“傻瓜山丘”。",
      bookSource: "《德语时文阅读与理解》OCR",
      sources: [
        { title: "Berlin.de", url: "https://www.berlin.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Berlin", "Trümmer"]
    },
    {
      id: "culture-nachwendezeit",
      category: "history",
      titleDe: "Die Nachwendezeit",
      titleZh: "转折后时期",
      contentDe: "Mit „Wende“ wird in Deutschland besonders der politische Umbruch von 1989/90 bezeichnet, der zum Fall der Berliner Mauer und zur Wiedervereinigung führte. Die „Nachwendezeit“ umfasst die Jahre danach, in denen Wirtschaft, Verwaltung und Alltag in Ostdeutschland neu geordnet wurden.",
      contentZh: "在德国，“Wende（转折）”尤其指1989/90年导致柏林墙倒塌和两德统一的政治剧变。“转折后时期”指此后的岁月，东德的经济、行政与日常生活被重新安排。",
      bookSource: "《德语阅读入门》OCR",
      sources: [
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Wende", "Ostdeutschland"]
    },
    {
      id: "culture-aeltere-studieren",
      category: "culture",
      titleDe: "Ältere Menschen an der Universität",
      titleZh: "老年人与大学学习",
      contentDe: "In der Bundesrepublik gab es Modellversuche wie die „Ausbildung zum Altenhelfer“, die älteren Menschen ein Studium ermöglichten. Viele Teilnehmer bauten ihre „Schwellenängste“ vor der Universität ab. Solche Programme zeigen, dass Bildung nicht mit dem Berufsleben endet.",
      contentZh: "联邦德国曾有“老年助手培训”等试点项目，让老年人也能上大学。许多参与者消除了对大学的“门槛恐惧”。这些项目表明，教育不会随职业生涯结束。",
      bookSource: "《德语时文阅读与理解》OCR",
      sources: [
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Bildung", "Alter"]
    },
    {
      id: "culture-uno-city-wien",
      category: "culture",
      titleDe: "Wien und die UNO-City",
      titleZh: "维也纳与联合国城",
      contentDe: "Wien ist neben New York und Genf einer der Amtssitze der Vereinten Nationen. Die UNO-City machte die Stadt international bekannter. Zugleich kursieren im Ausland oft klischeehafte Vorstellungen über Österreich, etwa über Politik oder Sprache.",
      contentZh: "维也纳是继纽约和日内瓦之后的联合国驻地之一。联合国城提升了这座城市的国际知名度。同时，国外对奥地利常有刻板印象，例如政治或语言方面。",
      bookSource: "《德语 时文选读》OCR",
      sources: [
        { title: "UNO Wien", url: "https://www.unvienna.org/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Wien", "UNO"]
    },
    {
      id: "culture-markentempel",
      category: "culture",
      titleDe: "Markentempel statt Modehaus",
      titleZh: "从服装店到品牌殿堂",
      contentDe: "In vielen Innenstädten wurden aus „Modehäusern“ Markentempel. Statt Lage, Lage, Lage zählen heute Idee, Preis und Marke. Geschäfte inszenieren Einkauf als Erlebnis: Flagship-Stores gleichen Galerien, Marken stiften Identität und Gemeinschaft.",
      contentZh: "许多内城的“服装店”变成了品牌殿堂。过去讲位置，现在讲创意、价格和品牌。商店把购物设计成体验：旗舰店像画廊，品牌提供身份认同与归属感。",
      bookSource: "《新编德语报刊阅读》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.9,
      tags: ["Konsum", "Stadt"]
    },
    {
      id: "culture-pferdeklinik",
      category: "culture",
      titleDe: "Pferde und die Tierklinik Hochmoor",
      titleZh: "马匹与霍赫莫尔动物医院",
      contentDe: "Seit dem Wiederentdecken des Reitens als Sport- und Freizeitvergnügen in den 1960er Jahren wurde Nordrhein-Westfalen zum pferdereichsten Land der Bundesrepublik. Rund 100.000 Pferde leben dort. 1967 eröffneten junge Tierärzte die private Tierklinik Hochmoor, die erste ihrer Art.",
      contentZh: "自20世纪60年代马术作为运动和休闲活动被重新发现以来，北莱茵-威斯特法伦成为联邦德国马匹最多的州，约有10万匹马。1967年年轻兽医开设了私人霍赫莫尔动物医院，是同类中第一家。",
      bookSource: "《德语时文阅读与理解》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "NRW.de", url: "https://www.land.nrw/" }
      ],
      confidence: 0.9,
      tags: ["Pferde", "NRW"]
    },
    {
      id: "culture-schauspielwelt",
      category: "culture",
      titleDe: "Schauspiel und normales Leben",
      titleZh: "表演与正常生活",
      contentDe: "Eine Schauspielerin beschreibt die Spannung zwischen Filmwelt und Alltag: Premierenpartys und Selbstinszenierung auf der einen Seite, echte Freunde und ein „ganz normales Studentenleben“ auf der anderen. Nach einem halben Jahr ohne Dreh sehnt sie sich wieder nach der Bühne.",
      contentZh: "一位女演员描述电影世界与日常之间的张力：一方面是首映派对和自我展示，另一方面是真正的朋友和“完全正常的学生生活”。半年不拍戏后，她又渴望回到表演中。",
      bookSource: "《新编德语报刊阅读》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.85,
      tags: ["Film", "Alltag"]
    },
    {
      id: "culture-impfstoffentwicklung",
      category: "culture",
      titleDe: "Impfstoffentwicklung und Tierversuche",
      titleZh: "疫苗研发与动物实验",
      contentDe: "Bei der Entwicklung von Impfstoffen werden Zellkulturen und Tierversuche eingesetzt. Neue Verfahren können Gewebekulturen aus Hühnerembryonen mit veränderten Viren impfen; dadurch lassen sich bestimmte Tests mit Mäusen reduzieren oder ersetzen.",
      contentZh: "疫苗研发会使用细胞培养和动物实验。新方法可以用改变过的病毒处理鸡胚组织培养；从而减少或替代某些小鼠实验。",
      bookSource: "《德语时文阅读与理解》OCR",
      sources: [
        { title: "Robert Koch-Institut", url: "https://www.rki.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Medizin", "Forschung"]
    },
    {
      id: "culture-energiebaum",
      category: "culture",
      titleDe: "Heizen mit dem „Energiebaum“",
      titleZh: "用“能源树”供暖",
      contentDe: "Der „Energiebaum“ ist keine Pflanze, sondern eine Anlage, die Wärme aus Regen, Eis und Schnee gewinnt. Entscheidend ist nicht die absolute Temperatur, sondern der Unterschied zwischen zwei Elementen, etwa Schnee und Sole. Solche Technik kann Heizen mit Öl ergänzen oder ersetzen.",
      contentZh: "“能源树”不是植物，而是从雨、冰和雪中获取热量的装置。关键不是绝对温度，而是两种介质（如雪和盐水）之间的温差。这类技术可以补充或替代燃油供暖。",
      bookSource: "《德语时文阅读与理解》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Umweltbundesamt", url: "https://www.umweltbundesamt.de/" }
      ],
      confidence: 0.85,
      tags: ["Energie", "Umwelt"]
    },
    {
      id: "culture-ballonfahrt",
      category: "culture",
      titleDe: "Piccards Ballonfahrt",
      titleZh: "皮卡尔的环球气球飞行",
      contentDe: "Bertrand Piccard umrundete mit einem Ballon die Erde. Über dem Pazifik musste er drei Tage auf einen Jetstream warten; dann erreichte er 180 Kilometer pro Stunde. Am 15. Tag brach er den Non-Stop-Längenrekord, litt aber unter Höhe, Kälte und Atemproblemen.",
      contentZh: "贝特朗·皮卡尔乘气球环游地球。在太平洋上空，他不得不等三天才遇到急流，随后达到每小时180公里。第15天他打破不间断飞行距离纪录，但受到高海拔、寒冷和呼吸问题的困扰。",
      bookSource: "《德语阅读入门》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.9,
      tags: ["Ballon", "Rekord"]
    },
    {
      id: "culture-digitale-alltag",
      category: "culture",
      titleDe: "Digitale Alltagssprache",
      titleZh: "数字日常用语",
      contentDe: "Digitale Geräte haben den Alltag und die Sprache verändert: Man lädt Dateien hoch oder herunter, loggt sich ein und aus, registriert sich, gibt Daten ein und leitet Nachrichten weiter. Viele dieser Verben stammen aus dem Englischen und werden im Deutschen regelmäßig gebeugt.",
      contentZh: "数字设备改变了日常与语言：人们上传或下载文件、登录和退出、注册、输入数据并转发消息。许多动词来自英语，在德语中按规则变位。",
      bookSource: "《新编德语报刊阅读》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.85,
      tags: ["Digital", "Sprache"]
    },
    {
      id: "culture-musikeraustausch",
      category: "culture",
      titleDe: "Internationale Musikbegegnungen",
      titleZh: "国际音乐交流",
      contentDe: "Bei internationalen Musikfestivals werden ausländische Sängerinnen und Sänger eingeladen und oft bei Gastfamilien untergebracht. Solche Begegnungen ermöglichen kulturellen Austausch und persönliches Kennenlernen über Sprachgrenzen hinweg.",
      contentZh: "国际音乐节会邀请外国歌手，并常把他们安排在当地寄宿家庭。这样的相遇促成跨语言的文化交流与个人认识。",
      bookSource: "《德语时文阅读与理解》OCR",
      sources: [
        { title: "Goethe-Institut", url: "https://www.goethe.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Musik", "Austausch"]
    },
    {
      id: "culture-interviewformen",
      category: "culture",
      titleDe: "Formen des Interviews",
      titleZh: "访谈的形式",
      contentDe: "Interviews lassen sich nach ihrem Inhalt unterscheiden: sachzentrierte Interviews stellen Fakten und Expertenwissen in den Mittelpunkt, personenzentrierte Interviews die Person, meinungszentrierte Interviews die Bewertung eines Themas. Die Form bestimmt, welche Fragen sinnvoll sind.",
      contentZh: "访谈可以按内容区分：以事实为中心的访谈聚焦事实与专家知识，以人物为中心的访谈聚焦人物，以观点为中心的访谈聚焦对主题的评价。形式决定哪些问题有意义。",
      bookSource: "《新编德语报刊阅读》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.85,
      tags: ["Medien", "Interview"]
    },
    {
      id: "culture-pater-erwin",
      category: "person",
      titleDe: "Pater Erwin und der Schrott",
      titleZh: "埃尔温神父与废铁",
      contentDe: "Pater Erwin Immekus, katholischer Priester im Ruhrgebiet, betreute russisch-orthodoxe Christen und sammelte Schrott. Mit dem Erlös aus dem Verkauf half er Leprakranken in der Dritten Welt. Sein Engagement verband Seelsorge mit praktischer Nothilfe.",
      contentZh: "鲁尔区天主教神父埃尔温·伊梅库斯照顾俄罗斯东正教徒，并收集废铁。他用变卖所得帮助第三世界的麻风病人。他的行动把牧灵关怀与实际救助结合起来。",
      bookSource: "《德语时文阅读与理解》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" }
      ],
      confidence: 0.85,
      tags: ["Ruhrgebiet", "Engagement"]
    },
    {
      id: "culture-euro-krise",
      category: "history",
      titleDe: "Von der Bankenkrise zur Staatsschuldenkrise",
      titleZh: "从银行危机到国家债务危机",
      contentDe: "Aus der Bankenkrise wurde eine Staatsschuldenkrise. Manche Euroländer hatten auch ohne Immobilienkrise untragbar hohe Schulden und waren global nicht wettbewerbsfähig. Die nötigen Reformen fielen schwer, weil zugleich Geld für Wachstumsimpulse fehlte; daraus entstand eine Vertrauenskrise in Politik und europäische Organe.",
      contentZh: "银行危机演变为国家债务危机。一些欧元国家即使没有房地产危机也积累了难以为继的债务，并在全球缺乏竞争力。必要改革艰难，因为同时缺少刺激增长的资金；由此产生对政治和欧洲机构的信任危机。",
      bookSource: "《新编德语报刊教程》OCR",
      sources: [
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" },
        { title: "Europäische Zentralbank", url: "https://www.ecb.europa.eu/" }
      ],
      confidence: 0.9,
      tags: ["Euro", "Krise"]
    },
    {
      id: "culture-eisenmangel",
      category: "culture",
      titleDe: "Eisenmangel und Blutbildung",
      titleZh: "缺铁与造血",
      contentDe: "Der Körper bildet ständig rote Blutkörperchen neu; die gesamte Menge wird etwa alle drei bis vier Wochen erneuert. Eisen und bestimmte Vitamine sind dafür wichtig. Fleisch gilt als guter Lieferant, aus Gemüse verwertet der Körper nur etwa zehn Prozent des Eisens; Weißbrot und Zucker gelten als „Eisenräuber“.",
      contentZh: "身体不断生成新的红细胞，全部血液约每三到四周更新一次。铁和某些维生素对此很重要。肉类是良好来源，而身体只能利用蔬菜中约10%的铁；白面包和糖被视为“铁盗”。",
      bookSource: "《德语报刊阅读》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Robert Koch-Institut", url: "https://www.rki.de/" }
      ],
      confidence: 0.85,
      tags: ["Gesundheit", "Ernährung"]
    },
    {
      id: "culture-russlandbild",
      category: "culture",
      titleDe: "Das westliche Russlandbild",
      titleZh: "西方的俄罗斯形象",
      contentDe: "Eine österreichische Schauspielerin beschreibt, wie wenig Europa über Russland, die Menschen und die Kultur weiß. In westlichen Medien erscheine Russland oft als dunkler Ort von Armut und Kriminalität, ferner als Amerika oder Afrika. Solche Vorurteile prägen die Wahrnehmung.",
      contentZh: "一位奥地利女演员描述欧洲对俄罗斯、俄罗斯人和文化了解甚少。西方媒体常把俄罗斯描绘成贫穷与犯罪的黑暗之地，比美洲或非洲还遥远。这类偏见塑造了认知。",
      bookSource: "《世界德语报刊阅读》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.85,
      tags: ["Russland", "Vorurteil"]
    },
    {
      id: "culture-kaugummi",
      category: "culture",
      titleDe: "Kaugummi auf Bürgersteigen",
      titleZh: "人行道上的口香糖",
      contentDe: "Auf Santa Cruz de Tenerife kleben durchschnittlich 23 Kaugummis pro Quadratmeter auf den Straßen; in der Nähe von Kinos und Bushaltestellen steigt die Zahl stark. Die Reinigung der 1,14 Millionen Meter Bürgersteige würde 228.000 Arbeitsstunden und rund 22,8 Millionen Euro kosten.",
      contentZh: "在特内里费岛圣克鲁斯，街道每平方米平均粘着23块口香糖；在电影院和公交站附近数量激增。清理114万米人行道需要22.8万工时和约2280万欧元。",
      bookSource: "《世界德语报刊阅读》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Umweltbundesamt", url: "https://www.umweltbundesamt.de/" }
      ],
      confidence: 0.85,
      tags: ["Umwelt", "Stadt"]
    },
    {
      id: "culture-ideenmanagement",
      category: "culture",
      titleDe: "Ideenmanagement bei Volkswagen",
      titleZh: "大众汽车的创意管理",
      contentDe: "Bei Volkswagen werden Verbesserungsvorschläge von Beschäftigten gefördert und mit Prämien belohnt. Das Unternehmen zahlte dafür jährlich Millionen. Zwei Mitarbeiter erhielten je 100.000 Mark für eine Neuerung, die einen Bauteil leichter und günstiger machte.",
      contentZh: "大众汽车鼓励员工的改进建议，并用奖金奖励。公司每年为此支付数百万。两名员工因一项让部件更轻、更便宜的创新各获10万马克。",
      bookSource: "《德语时文阅读与理解》OCR",
      sources: [
        { title: "Volkswagen", url: "https://www.volkswagen-group.com/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Wirtschaft", "Innovation"]
    },
    {
      id: "culture-kontaktlinse",
      category: "culture",
      titleDe: "Die Erfindung der Kontaktlinse",
      titleZh: "隐形眼镜的发明",
      contentDe: "Der Ingenieur Tillman Wölk entwickelte 1946 eine frühe harte Kontaktlinse. Er reduzierte die damalige Linse auf den zentralen optischen Teil und entfernte überflüssigen Kunststoff. Die kleine Linse hielt durch Adhäsionskräfte auf dem Auge; Wölk testete sie an sich selbst.",
      contentZh: "工程师蒂尔曼·韦尔克于1946年开发出早期硬性隐形眼镜。他把当时的镜片缩减到中央光学部分，去掉多余塑料。小镜片依靠附着力固定在眼睛上；韦尔克在自己身上做了测试。",
      bookSource: "《德语时文阅读与理解》OCR",
      sources: [
        { title: "Deutsches Museum", url: "https://www.deutsches-museum.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Erfindung", "Medizin"]
    },
    {
      id: "culture-realismus-millet",
      category: "culture",
      titleDe: "Realismus bei Millet und Daumier",
      titleZh: "米勒与杜米埃的现实主义",
      contentDe: "Millet (1814–1875) und Daumier (1808–1879) gehören zu den französischen Realisten. Millet zeigte das Leben der Bauern mit Sympathie, Daumier nutzte politische Karikatur und Lithographie. Beide verbanden Kunst mit sozialer Beobachtung.",
      contentZh: "米勒（1814–1875）和杜米埃（1808–1879）属于法国现实主义画家。米勒以同情描绘农民生活，杜米埃运用政治讽刺画和石版画。两人都把艺术与社会观察结合。",
      bookSource: "《德语学习》30周年精选 文化卷 OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.85,
      tags: ["Kunst", "Realismus"]
    },
    {
      id: "person-paul-heyse",
      category: "person",
      titleDe: "Paul Heyse",
      titleZh: "保罗·海泽",
      contentDe: "Paul Heyse (1830–1914) erhielt 1910 den Literaturnobelpreis. Er gehörte zum Münchner Dichterkreis und pflegte klassische und romantische Traditionen. Mit seiner „Falkentheorie“ entwickelte er eine Theorie der Novelle; er schrieb außerdem Romane, Dramen und Gedichte und übersetzte.",
      contentZh: "保罗·海泽（1830–1914）于1910年获诺贝尔文学奖。他属于慕尼黑作家圈，继承古典与浪漫传统。他以“猎鹰理论”发展中篇小说理论；还写长篇小说、戏剧、诗歌并从事翻译。",
      bookSource: "《德语学习》30周年精选 文化卷 OCR",
      sources: [
        { title: "Nobel Prize", url: "https://www.nobelprize.org/" },
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" }
      ],
      confidence: 0.9,
      tags: ["Heyse", "Nobelpreis"]
    },
    {
      id: "culture-nobelpreis-literatur",
      category: "culture",
      titleDe: "Deutschsprachige Literaturnobelpreise",
      titleZh: "德语文学诺贝尔奖",
      contentDe: "Mehrere deutschsprachige Autorinnen und Autoren wurden mit dem Literaturnobelpreis ausgezeichnet, darunter Paul Heyse (1910), Hermann Hesse (1946), Heinrich Böll (1972) und Günter Grass (1999). Die Auszeichnung erhöht internationale Sichtbarkeit, sagt aber wenig über Popularität im eigenen Land.",
      contentZh: "多位德语作家获得诺贝尔文学奖，包括保罗·海泽（1910）、赫尔曼·黑塞（1946）、海因里希·伯尔（1972）和君特·格拉斯（1999）。该奖提升国际可见度，却不必然代表在本国的流行度。",
      bookSource: "《德语学习》30周年精选 文化卷 OCR",
      sources: [
        { title: "Nobel Prize", url: "https://www.nobelprize.org/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.9,
      tags: ["Literatur", "Nobelpreis"]
    },
    {
      id: "person-meinrad-inglin",
      category: "person",
      titleDe: "Meinrad Inglin",
      titleZh: "迈因拉德·英格林",
      contentDe: "Meinrad Inglin (1893–1971) war ein Schweizer Schriftsteller. In „Die verkehrte Welt“ lässt er Figuren der Fasnacht lebendig werden: Bajaß und Röllibutz liegen im Schrank und wollen nicht wieder bis zur nächsten Fasnacht warten. Die Erzählung verbindet Mundart, Groteske und Gesellschaftskritik.",
      contentZh: "迈因拉德·英格林（1893–1971）是瑞士作家。在《颠倒的世界》中，他让狂欢节人物活起来：面具人物躺在柜子里，不愿等到下一个狂欢节。小说结合方言、怪诞与社会批判。",
      bookSource: "《德语学习》30周年精选 文学卷 OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.85,
      tags: ["Inglin", "Schweiz"]
    },
    {
      id: "culture-uebersetzungskritik",
      category: "culture",
      titleDe: "Wörtlichkeit und Übersetzungskritik",
      titleZh: "直译与翻译批评",
      contentDe: "Eine wörtliche Übersetzung kann inhaltlich korrekt und sprachlich verständlich sein, wirkt aber oft nicht idiomatisch oder bleibt „chinesisches Deutsch“. Gute Übersetzungskritik fragt deshalb nach Treue zum Ausgangstext, Klarheit und natürlicher Zielsprache.",
      contentZh: "直译在内容上可能正确、语言上也可理解，但常不地道，成为“中式德语”。因此好的翻译批评会追问对原文的忠实、清晰度和目标语的自然度。",
      bookSource: "《德语学习》30周年精选 翻译卷 OCR",
      sources: [
        { title: "Goethe-Institut", url: "https://www.goethe.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Übersetzen", "Sprache"]
    },
    {
      id: "culture-kurzgeschichte-jahrhundert",
      category: "culture",
      titleDe: "Kurzgeschichten aus einem Jahrhundert",
      titleZh: "一个世纪的短篇小说",
      contentDe: "Die Anthologie „20世纪外国短篇小说编年“ versammelt für die Jahre 1900 bis 1999 jeweils eine Kurzgeschichte, insgesamt hundert Texte. Sie verbindet bekannte Autorinnen und Autoren mit neuen Stimmen und zeigt, wie sich Erzählweisen und Themen im 20. Jahrhundert verändert haben.",
      contentZh: "《20世纪外国短篇小说编年》为1900至1999年各选一篇短篇小说，共一百篇。它把知名作家与新声音放在一起，展示20世纪叙事方式与主题的变化。",
      bookSource: "《20世纪外国短篇小说编年 德语卷》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.85,
      tags: ["Literatur", "Kurzgeschichte"]
    },
    {
      id: "culture-familie-ideologie",
      category: "culture",
      titleDe: "Familie als Erziehungsapparat",
      titleZh: "家庭作为教育机器",
      contentDe: "In der kritischen Gesellschaftsanalyse gilt die Familie nicht nur als privater Ort, sondern auch als „Erziehungsapparat“, der Werte und autoritäre Strukturen weitergibt. Ihre Bedeutung hängt mit der Einbeziehung von Frauen in den Produktionsprozess zusammen: Ökonomische Funktion geht verloren, politische Funktion tritt hervor.",
      contentZh: "在批判性的社会分析中，家庭不仅是私人空间，也是传递价值观与权威结构的“教育机器”。其意义与女性进入生产过程相关：经济功能减弱，政治功能凸显。",
      bookSource: "《德语学习》30周年精选 文化卷 OCR",
      sources: [
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Familie", "Gesellschaft"]
    },
    {
      id: "culture-lyrik-funktionalisierung",
      category: "culture",
      titleDe: "Lyrik gegen die Funktionalisierung",
      titleZh: "以诗歌抵抗功能化",
      contentDe: "Im Alltag ist der Mensch selten ganz mit sich selbst identisch; er wird zum „Treffpunkt seiner Funktionen“. Lyrik gilt in dieser Analyse als „Sesam-öffne-dich“, als magischer Gegenstand, der Momente echter Identität ermöglicht.",
      contentZh: "在日常生活中，人很少完全与自己一致；人成为“其功能的交汇点”。在这一分析中，诗歌被视为“芝麻开门”，是开启真正同一性时刻的魔法物件。",
      bookSource: "《德语学习》30周年精选 文学卷 OCR",
      sources: [
        { title: "Goethe-Institut", url: "https://www.goethe.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Lyrik", "Identität"]
    },
    {
      id: "culture-innerer-monolog",
      category: "culture",
      titleDe: "Innerer Monolog und Angst",
      titleZh: "内心独白与恐惧",
      contentDe: "Kurzgeschichten arbeiten oft mit innerem Monolog: Eine Figur spricht in Gedanken, springt zwischen Vermutungen und Erinnerungen, und die Leser sehen die Welt durch ihre Angst. Was tatsächlich passiert ist, bleibt dabei oft unsicher.",
      contentZh: "短篇小说常使用内心独白：人物在思想中说话，在猜测与回忆之间跳跃，读者通过其恐惧看世界。实际发生了什么，往往保持不确定。",
      bookSource: "《20世纪外国短篇小说编年 德语卷》OCR",
      sources: [
        { title: "Goethe-Institut", url: "https://www.goethe.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Erzähltechnik", "Angst"]
    },
    {
      id: "person-rilke",
      category: "person",
      titleDe: "Rainer Maria Rilke",
      titleZh: "莱纳·玛丽亚·里尔克",
      contentDe: "Rainer Maria Rilke (1875–1926) war ein österreichischer Lyriker. Seine frühe Erzählung „Turnstunde“ (1902) beschreibt eine Turnstunde und die Enge der Schule; später wurde er mit dem „Stundenbuch“, den „Duineser Elegien“ und den „Sonetten an Orpheus“ weltberühmt.",
      contentZh: "莱纳·玛丽亚·里尔克（1875–1926）是奥地利诗人。早期短篇《体操课》（1902）描写一节体育课与学校的压抑；后来以《时辰祈祷书》《杜伊诺哀歌》和《致俄耳甫斯的十四行诗》闻名世界。",
      bookSource: "《20世纪外国短篇小说编年 德语卷》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.9,
      tags: ["Rilke", "Lyrik"]
    },
    {
      id: "culture-schulalltag-1900",
      category: "culture",
      titleDe: "Schulalltag um 1900",
      titleZh: "1900年前后的学校日常",
      contentDe: "In Erzählungen um 1900 erscheint die Schule oft als enger, autoritärer Raum: Schulbänke, Disziplin und Turnstunden bestimmen den Tag. Die Perspektive der Kinder macht sichtbar, wie Erziehung nicht nur Wissen, sondern auch Gehorsam formt.",
      contentZh: "在1900年前后的叙事中，学校常显得封闭而权威：课桌、纪律和体育课支配着一天。儿童的视角揭示出，教育不仅传授知识，也塑造服从。",
      bookSource: "《20世纪外国短篇小说编年 德语卷》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" }
      ],
      confidence: 0.85,
      tags: ["Schule", "Erziehung"]
    },
    {
      id: "person-luxun",
      category: "person",
      titleDe: "Lu Xun und das Fremdsprachenlernen",
      titleZh: "鲁迅与外语学习",
      contentDe: "Lu Xun lernte Japanisch und Deutsch und übersetzte zahlreiche Werke. Er verstand Fremdsprachen als Mittel, „Feuer von anderen“ zu holen, und betonte Beharrlichkeit: Man solle täglich einige Wörter lernen, nicht aussetzen und über Jahre dranbleiben. Eine Sprache zu beherrschen, dauere für Fleißige etwa zehn Jahre.",
      contentZh: "鲁迅学习日语和德语，并翻译了大量作品。他把外语视为“从别国窃得火来”的手段，强调坚持：每天记几个生词，不要间断，持续数年。对用功的人来说，掌握一门语言约需十年。",
      bookSource: "《德语学习》30周年精选 文化卷 OCR",
      sources: [
        { title: "Goethe-Institut", url: "https://www.goethe.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Lu Xun", "Fremdsprache"]
    },
    {
      id: "culture-sprachlernen",
      category: "culture",
      titleDe: "Fremdsprachen lernen ohne Unterbrechung",
      titleZh: "不间断地学习外语",
      contentDe: "Beim Sprachenlernen zählt weniger ein einzelner langer Lerntag als die Regelmäßigkeit. Wer täglich einige Wörter lernt, regelmäßig liest und nicht aussetzt, kommt nach einigen Jahren vom Wortschatz zum Lesen ganzer Texte. Übersetzung und Lektüre verstärken sich dabei gegenseitig.",
      contentZh: "学外语重要的不是某一天学很久，而是规律性。每天记几个词、经常阅读、不间断，几年后就能从词汇走向整篇阅读。翻译与阅读会相互促进。",
      bookSource: "《德语学习》30周年精选 文化卷 OCR",
      sources: [
        { title: "Goethe-Institut", url: "https://www.goethe.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Sprachenlernen", "Gewohnheit"]
    },
    {
      id: "culture-braunschweig-loewe",
      category: "culture",
      titleDe: "Heinrich der Löwe und der treue Löwe",
      titleZh: "狮子亨利与忠实的狮子",
      contentDe: "Um Heinrich den Löwen rankt sich eine niedersächsische Sage: Ein Löwe begleitet ihn treu, drängt sich an ihn und lässt nicht von ihm. Das Wappentier und der Braunschweiger Löwe erinnern bis heute an den Herzog und seine Legende.",
      contentZh: "围绕狮子亨利流传着一个下萨克森传说：一头狮子忠诚地陪伴他，紧紧依偎、不肯离开。纹章动物与布伦瑞克的狮子雕像至今让人想起这位公爵及其传说。",
      bookSource: "《德语学习》30周年精选 文化卷 OCR",
      sources: [
        { title: "Braunschweig", url: "https://www.braunschweig.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Braunschweig", "Sage"]
    },
    {
      id: "culture-warenhaus-alltag",
      category: "culture",
      titleDe: "Alltag im Warenhaus",
      titleZh: "百货商店的日常",
      contentDe: "Im Warenhaus begegnen sich verschiedene Käuferschichten: Schülerinnen, junge Frauen, alte Damen und Dienstmädchen. Der Verkäufer öffnet Schubladen, packt ein, schreibt Bestellungen und lernt die Kundschaft kennen. Der Schaufensterblick wird zum Teil des städtischen Alltags.",
      contentZh: "百货商店里聚集不同顾客：女学生、年轻女子、老太太和女仆。售货员打开抽屉、包装、填写订单，并逐渐熟悉顾客。橱窗也成为城市日常的一部分。",
      bookSource: "《20世纪外国短篇小说编年 德语卷》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.85,
      tags: ["Konsum", "Stadt"]
    },
    {
      id: "culture-luebeck-brotlegende",
      category: "culture",
      titleDe: "Die Lübecker Brotlegende",
      titleZh: "吕贝克面包传说",
      contentDe: "In Lübeck erzählt man von einem reichen Patriziersohn, der aus Vergnügen Brot auf das Dach warf und den Warnungen der Vorübergehenden nicht folgte. Als er gerade ausholte, sank er tot nieder und erstarrte zu Stein – bis heute eine warnende Geschichte gegen Brotverschwendung.",
      contentZh: "吕贝克流传着一个故事：一位富家子弟为了取乐把面包扔到屋顶，不听路人警告。就在他再次挥臂时倒地而死，化为石头——至今仍是反对浪费面包的警示故事。",
      bookSource: "《德语学习》30周年精选 文化卷 OCR",
      sources: [
        { title: "Lübeck", url: "https://www.luebeck.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Lübeck", "Sage"]
    },
    {
      id: "culture-brot-alltag",
      category: "culture",
      titleDe: "Brot im Alltag",
      titleZh: "日常生活中的面包",
      contentDe: "Brot gehört zu den Grundnahrungsmitteln und hat in vielen Regionen eine eigene Kultur: Brotlaib, Brötchen, Schwarzbrot und Sauerteig. Ältere Erzählungen und Sprichwörter mahnen, Brot nicht wegzuwerfen; die Lübecker Sage macht daraus eine drastische Warnung.",
      contentZh: "面包属于主食，在许多地区有独特文化：长面包、小面包、黑麦面包和酸面团。较老的叙事与谚语提醒人们不要浪费面包；吕贝克传说把它变成严厉警告。",
      bookSource: "《德语学习》30周年精选 文化卷 OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.85,
      tags: ["Essen", "Alltag"]
    },
    {
      id: "culture-generationenkonflikt",
      category: "culture",
      titleDe: "Vater, Sohn und Geschäft",
      titleZh: "父亲、儿子与生意",
      contentDe: "In vielen Erzählungen um 1900 prallen Vater und Sohn aufeinander: Der Vater hat das Geschäft aufgebaut und erwartet Dankbarkeit und Nachfolge; der Sohn will selbst entscheiden. Das Erbe wird zur Last, und Liebe und Macht sind kaum zu trennen.",
      contentZh: "在1900年前后的许多叙事中，父子发生冲突：父亲创办生意，期待感激与继承；儿子想要自主决定。遗产成为负担，爱与权力难以分开。",
      bookSource: "《20世纪外国短篇小说编年 德语卷》OCR",
      sources: [
        { title: "Goethe-Institut", url: "https://www.goethe.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Familie", "Generationen"]
    },
    {
      id: "culture-ende-schluss",
      category: "culture",
      titleDe: "Ende oder Schluss?",
      titleZh: "Ende 还是 Schluss？",
      contentDe: "„Ende“ bezeichnet meist das räumliche oder zeitliche Ende einer Sache, „Schluss“ stärker das abschließende Handeln oder den Schlusspunkt: am Ende der Straße, aber Schluss machen mit dem Rauchen. Die Wahl hängt davon ab, ob ein Ort, ein Zeitpunkt oder ein Abschluss gemeint ist.",
      contentZh: "“Ende”多指事物在空间或时间上的终点，“Schluss”更强调结束的动作或句点：am Ende der Straße（在街道尽头），但 Schluss machen mit dem Rauchen（戒烟）。选择取决于指地点、时间点还是结束动作。",
      bookSource: "《德语学习》30周年精选 初学卷 OCR",
      sources: [
        { title: "Goethe-Institut", url: "https://www.goethe.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Wortschatz", "Nuance"]
    },
    {
      id: "culture-familienroman",
      category: "culture",
      titleDe: "Der Familienroman",
      titleZh: "家族小说",
      contentDe: "Der Familienroman erzählt mehrere Generationen einer Familie und verbindet privates Schicksal mit gesellschaftlichem Wandel. Oft steht am Anfang Aufstieg und Ordnung, am Ende Verfall; Häuser, Firmen und Namen werden zu Zeichen für Kontinuität und Niedergang.",
      contentZh: "家族小说讲述一个家庭的数代人，把私人命运与社会变迁结合。开头常是上升与秩序，结尾常是衰败；房屋、公司和姓氏成为延续与没落的标志。",
      bookSource: "《20世纪外国短篇小说编年 德语卷》OCR",
      sources: [
        { title: "Goethe-Institut", url: "https://www.goethe.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Roman", "Familie"]
    },
    {
      id: "language-schaffen-erreichen",
      category: "culture",
      titleDe: "schaffen oder erreichen?",
      titleZh: "schaffen 还是 erreichen？",
      contentDe: "„schaffen“ betont das Bewältigen oder Hervorbringen, „erreichen“ das Ankommen an einem Ziel oder Ort. Man schafft eine Arbeit, erreicht aber ein Dorf oder ein Ziel. Bei „es schaffen“ steht oft die Anstrengung im Vordergrund.",
      contentZh: "“schaffen”强调完成或创造，“erreichen”强调抵达目标或地点。可以说 eine Arbeit schaffen，但说 ein Dorf/ein Ziel erreichen。“es schaffen”常强调努力。",
      bookSource: "《德语学习》30周年精选 初学卷 OCR",
      sources: [
        { title: "Goethe-Institut", url: "https://www.goethe.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Verben", "Nuance"]
    },
    {
      id: "culture-armut-grossstadt",
      category: "culture",
      titleDe: "Armut in der Großstadt",
      titleZh: "大城市的贫困",
      contentDe: "Erzählungen über die Großstadt zeigen oft, wie knapp Lohn, Nahrung und Wohnung sind: Wege zur Arbeit dauern Stunden, Miete und Essen verschlingen das Wenige, und ein Diebstahl stürzt eine Familie ins Elend. Die Perspektive der Betroffenen macht strukturelle Armut sichtbar.",
      contentZh: "关于大城市的叙事常展示工资、食物和住所多么紧张：上班路要几小时，房租和吃饭耗尽微薄收入，一次盗窃就让家庭陷入困境。当事人的视角让结构性贫困变得可见。",
      bookSource: "《20世纪外国短篇小说编年 德语卷》OCR",
      sources: [
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Armut", "Großstadt"]
    },
    {
      id: "language-koerper-redewendungen",
      category: "culture",
      titleDe: "Redewendungen mit Körperteilen",
      titleZh: "含身体部位的惯用语",
      contentDe: "Viele deutsche Redewendungen enthalten Körperteile: „Arm in Arm“ bedeutet eng nebeneinander, „die Nase voll haben“ heißt genug zu haben, „jemandem auf die Nerven gehen“ heißt nerven. Solche Wendungen sind oft nicht wörtlich zu übersetzen.",
      contentZh: "许多德语惯用语含身体部位：Arm in Arm 表示紧挨着，die Nase voll haben 表示受够了，jemandem auf die Nerven gehen 表示烦人。这类表达常不能直译。",
      bookSource: "《德语学习》30周年精选 初学卷 OCR",
      sources: [
        { title: "Goethe-Institut", url: "https://www.goethe.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Redewendung", "Wortschatz"]
    },
    {
      id: "culture-kriegsnacht",
      category: "culture",
      titleDe: "Eine Nachtwache im Krieg",
      titleZh: "战争中的一夜岗哨",
      contentDe: "In der Erzählung steht ein Soldat in der Kriegsnacht Wache. Das Rufen der „Todesvögel“, das ferne Singen marschierender Truppen und das unerklärliche Licht verdichten sich zu einer Atmosphäre der Angst. Der Tod erscheint nicht als Ereignis, sondern als ständige Möglichkeit.",
      contentZh: "小说中，一名士兵在战争之夜站岗。“死亡鸟”的叫声、远处行军部队的歌声和无法解释的灯光，凝聚成恐惧的氛围。死亡不是事件，而是持续的可能性。",
      bookSource: "《20世纪外国短篇小说编年 德语卷》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Bundeszentrale für politische Bildung", url: "https://www.bpb.de/" }
      ],
      confidence: 0.85,
      tags: ["Krieg", "Angst"]
    },
    {
      id: "language-infinitiv-konstruktionen",
      category: "culture",
      titleDe: "Verben mit Infinitiv",
      titleZh: "带动词不定式的结构",
      contentDe: "Verben wie hören, sehen, lassen und kommen können einen zweiten Infinitiv bei sich haben: Ich höre ihn kommen. Ich habe ihn kommen hören. Kommst du noch ein Glas Wein trinken? Die Infinitivkonstruktion ersetzt oft einen ganzen Nebensatz.",
      contentZh: "hören、sehen、lassen、kommen 等动词可以再带一个不定式：Ich höre ihn kommen；Ich habe ihn kommen hören；Kommst du noch ein Glas Wein trinken？不定式结构常替代整个从句。",
      bookSource: "《德语学习》30周年精选 初学卷 OCR",
      sources: [
        { title: "Goethe-Institut", url: "https://www.goethe.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Grammatik", "Infinitiv"]
    },
    {
      id: "culture-grossstadt-strassenbahn",
      category: "culture",
      titleDe: "Straßenbahn, Baustelle und Aufbruch",
      titleZh: "有轨电车、工地与出发",
      contentDe: "In der Großstadterzählung führen unfertige Straßen, Schienen und die Dämmerung eine Figur an einen offenen Punkt: Sie schaut den Gleisen nach, als müsse sie fortgehen. Die Stadt wird zum Raum zwischen Stillstand und Aufbruch.",
      contentZh: "在这篇大城市叙事中，未完工的街道、铁轨和暮色把人物带到开放的节点：她望着轨道，仿佛必须离开。城市成为停滞与出发之间的空间。",
      bookSource: "《20世纪外国短篇小说编年 德语卷》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.85,
      tags: ["Großstadt", "Aufbruch"]
    },
    {
      id: "language-praepositionen-uebungen",
      category: "culture",
      titleDe: "Präpositionen: Zeit, Ort und Grund",
      titleZh: "介词：时间、地点与原因",
      contentDe: "Präpositionen tragen oft die Beziehung im Satz: während und wegen stehen häufig mit dem Genitiv, trotz ebenfalls; lokal unterscheidet man in + Dativ (Ort) und in + Akkusativ (Richtung). Bei Verkehrsunfällen heißt es „auf der schneeglatten Straße“ oder „wegen der Schneeglätte“.",
      contentZh: "介词常承载句中的关系：während、wegen、trotz 常接第二格；地点上区分 in + 第三格（位置）与 in + 第四格（方向）。交通事故中可说 auf der schneeglatten Straße 或 wegen der Schneeglätte。",
      bookSource: "《德语学习》30周年精选 初学卷 OCR",
      sources: [
        { title: "Goethe-Institut", url: "https://www.goethe.de/" },
        { title: "Deutschland.de", url: "https://www.deutschland.de/" }
      ],
      confidence: 0.85,
      tags: ["Grammatik", "Präpositionen"]
    },
    {
      id: "culture-pilot-hoechtenflug",
      category: "culture",
      titleDe: "Allein in großer Höhe",
      titleZh: "高空中的孤独",
      contentDe: "Eine Erzählung begleitet einen Piloten in über 10.000 Metern Höhe. Sauerstoffmangel verändert seine Wahrnehmung: Zahlen erscheinen falsch, die Sonne verliert ihre Kontur, er beginnt Selbstgespräche zu führen. Technik und Körper geraten an ihre Grenzen.",
      contentZh: "一篇小说跟随一名飞行员飞到一万米以上。缺氧改变他的感知：数字显得错误，太阳失去轮廓，他开始自言自语。技术与身体都到达极限。",
      bookSource: "《20世纪外国短篇小说编年 德语卷》OCR",
      sources: [
        { title: "Deutschland.de", url: "https://www.deutschland.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.85,
      tags: ["Flug", "Grenzerfahrung"]
    },
    {
      id: "person-buechner",
      category: "person",
      titleDe: "Georg Büchner",
      titleZh: "格奥尔格·毕希纳",
      contentDe: "Georg Büchner (1813–1837) war Arzt und Schriftsteller. Sein Drama „Dantons Tod“ zeigt die Französische Revolution kurz vor dem Ende der Jakobinerherrschaft: Danton und seine Freunde warten auf die Hinrichtung, während Robespierre und die Jakobiner ihre Macht sichern. Das Stück fragt nach Schuld, Angst und politischer Gewalt.",
      contentZh: "格奥尔格·毕希纳（1813–1837）是医生和作家。他的戏剧《丹东之死》展示法国大革命在雅各宾统治结束前夕：丹东和朋友们等待处决，罗伯斯庇尔与雅各宾派巩固权力。剧作追问罪责、恐惧与政治暴力。",
      bookSource: "《世界经典戏剧全集 9 德语国家卷》OCR",
      sources: [
        { title: "Deutsches Literaturarchiv", url: "https://www.dla-marbach.de/" },
        { title: "Goethe-Institut", url: "https://www.goethe.de/" }
      ],
      confidence: 0.9,
      tags: ["Büchner", "Drama"]
    }
  ]
};
