/* 德国年度节日年历：固定日期、每年浮动日期与地区性节日。 */
window.WORTKARTE_FESTIVALS = {
  months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  items: [
    {
      id: "neujahr", month: 1, dateLabel: "1 月 1 日", titleDe: "Neujahr", titleZh: "新年",
      type: "fixed", noteZh: "新年是法定假日。许多城市在除夕夜举行烟花和街头庆祝，元旦当天则相对安静。",
      cultureId: ""
    },
    {
      id: "heilige-drei-koenige", month: 1, dateLabel: "1 月 6 日", titleDe: "Heilige Drei Könige", titleZh: "三王节",
      type: "regional", noteZh: "三王节在部分联邦州是法定假日。儿童会装扮成三王，挨家挨户唱歌并为慈善募捐。",
      cultureId: ""
    },
    {
      id: "karneval", month: 2, dateLabel: "2/3 月 · 玫瑰星期一", titleDe: "Karneval / Fasching", titleZh: "狂欢节",
      type: "movable", noteZh: "狂欢季从 11 月 11 日开始，高潮在圣灰星期三之前的玫瑰星期一。莱茵地区称 Karneval，巴伐利亚称 Fasching。",
      cultureId: "culture-karneval"
    },
    {
      id: "ostern", month: 4, dateLabel: "3/4 月 · 复活节周日", titleDe: "Ostern", titleZh: "复活节",
      type: "movable", noteZh: "复活节日期每年变动，在春分后第一个满月后的周日。耶稣受难日和复活节星期一是法定假日。",
      cultureId: "culture-ostern"
    },
    {
      id: "tag-der-arbeit", month: 5, dateLabel: "5 月 1 日", titleDe: "Tag der Arbeit", titleZh: "劳动节",
      type: "fixed", noteZh: "5 月 1 日是法定假日。工会和协会通常组织集会、游行与劳动节活动。",
      cultureId: ""
    },
    {
      id: "muttertag", month: 5, dateLabel: "5 月 · 第二个周日", titleDe: "Muttertag", titleZh: "母亲节",
      type: "movable", noteZh: "母亲节在五月第二个周日，不是法定假日。常见的礼物是花、蛋糕和家庭聚餐。",
      cultureId: ""
    },
    {
      id: "pfingsten", month: 5, dateLabel: "5/6 月 · 圣灵降临节", titleDe: "Pfingsten", titleZh: "圣灵降临节",
      type: "movable", noteZh: "圣灵降临节在复活节后第 50 天，星期一为法定假日。许多家庭利用长周末短途旅行。",
      cultureId: ""
    },
    {
      id: "fronleichnam", month: 6, dateLabel: "5/6 月 · 基督圣体节", titleDe: "Fronleichnam", titleZh: "基督圣体节",
      type: "regional", noteZh: "基督圣体节在复活节后第 60 天，主要是天主教地区放假。常见游行、祭坛和乐队。",
      cultureId: ""
    },
    {
      id: "bayreuther-festspiele", month: 7, dateLabel: "7 月下旬–8 月", titleDe: "Bayreuther Festspiele", titleZh: "拜罗伊特音乐节",
      type: "fixed", noteZh: "拜罗伊特音乐节每年夏季举行，主要演出瓦格纳歌剧。门票通常需要提前很久预订。",
      cultureId: ""
    },
    {
      id: "weinfeste", month: 8, dateLabel: "8–10 月", titleDe: "Weinfeste", titleZh: "葡萄酒节",
      type: "regional", noteZh: "德国葡萄酒产区在夏末秋初举办酒节，常见葡萄酒、地方菜、音乐和选酒王后活动。",
      cultureId: ""
    },
    {
      id: "oktoberfest", month: 9, dateLabel: "9 月下旬–10 月初", titleDe: "Oktoberfest", titleZh: "慕尼黑啤酒节",
      type: "movable", noteZh: "慕尼黑啤酒节通常从九月最后一个周六开始，持续约两周。其他城市也有类似的 Volksfest。",
      cultureId: "culture-oktoberfest"
    },
    {
      id: "tag-der-deutschen-einheit", month: 10, dateLabel: "10 月 3 日", titleDe: "Tag der Deutschen Einheit", titleZh: "德国统一日",
      type: "fixed", noteZh: "10 月 3 日是德国国庆日，纪念 1990 年两德统一。每年由不同联邦州主办中央庆祝活动。",
      cultureId: ""
    },
    {
      id: "erntedank", month: 10, dateLabel: "10 月 · 第一个周日", titleDe: "Erntedankfest", titleZh: "丰收感恩节",
      type: "movable", noteZh: "教堂用谷物、水果和蔬菜装饰祭坛；乡村常有游行、音乐和市集。",
      cultureId: "culture-erntedankfest"
    },
    {
      id: "reformationstag", month: 10, dateLabel: "10 月 31 日", titleDe: "Reformationstag", titleZh: "宗教改革日",
      type: "regional", noteZh: "纪念 1517 年马丁·路德发表《九十五条论纲》。在德国北部和东部部分州是法定假日。",
      cultureId: ""
    },
    {
      id: "martinstag", month: 11, dateLabel: "11 月 11 日", titleDe: "Martinstag", titleZh: "圣马丁节",
      type: "regional", noteZh: "儿童提着灯笼游行，纪念圣马丁。部分地区有篝火、马丁鹅和分食甜面包的习俗。",
      cultureId: ""
    },
    {
      id: "nikolaus", month: 12, dateLabel: "12 月 6 日", titleDe: "Nikolaus", titleZh: "圣尼古拉节",
      type: "fixed", noteZh: "孩子把靴子放在门口，第二天早上会找到糖果和小礼物。圣尼古拉与圣诞老人形象有关。",
      cultureId: ""
    },
    {
      id: "weihnachten", month: 12, dateLabel: "12 月 24–26 日", titleDe: "Weihnachten", titleZh: "圣诞节",
      type: "fixed", noteZh: "12 月 24 日晚是平安夜，25/26 日为法定假日。常见圣诞树、礼物、教堂礼拜和家庭聚餐。",
      cultureId: "culture-weihnachtsmarkt"
    },
    {
      id: "silvester", month: 12, dateLabel: "12 月 31 日", titleDe: "Silvester", titleZh: "跨年夜",
      type: "fixed", noteZh: "跨年夜有聚餐、香槟、烟花和“好新年”的祝福；近年不少城市限制私人爆竹。",
      cultureId: "culture-silvester"
    }
  ]
};
