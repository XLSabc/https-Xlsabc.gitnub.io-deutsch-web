/* Changelog policy: every 100 OCR batches is merged into one entry.
   Entries focus on page, workflow and feature changes rather than per-batch OCR details.
   Detailed per-batch history is kept in changelog-archive.js for reference only. */
window.WORTKARTE_CHANGELOG = [
  {
    version: "1.6.0",
    date: "2026-10-20",
    type: "feature",
    summary: "OCR 1–100：四入口框架与首批内容",
    scope: "页面 · 学习流程 · 内容",
    items: [
      "建立首页、历史与文化、文章阅读、短语积累、单词积累、语法学习的主导航",
      "上线首次学习四档自评与后续四选一复习，四档掌握度写入本地记录",
      "加入全局搜索、阅读分级、题库与 PWA 离线壳",
      "首批教材 OCR 内容进入文章、短语、词汇与语法栏目"
    ]
  },
  {
    version: "1.7.0",
    date: "2026-10-20",
    type: "feature",
    summary: "OCR 101–200：单词卡与图书馆",
    scope: "单词页 · 复习 · 筛选",
    items: [
      "单词卡补充词性、冠词、复数、变位与例句状态",
      "图书馆加入难度、掌握度、搜索与排序筛选",
      "每日复习、每周小测与今日回顾入口整合",
      "补齐一批名词冠词与复数，修正错译和串台词条"
    ]
  },
  {
    version: "1.8.0",
    date: "2026-10-20",
    type: "feature",
    summary: "OCR 201–300：文章译文与短语库",
    scope: "文章页 · 短语页 · 文化页",
    items: [
      "文章阅读加入中文译文开关与分级阅读",
      "短语积累形成独立卡片库，支持分类与搜索",
      "历史与文化模块建立分类卡片与来源链接",
      "语法学习开始按主题拆分，配套基础练习"
    ]
  },
  {
    version: "1.9.0",
    date: "2026-10-20",
    type: "feature",
    summary: "OCR 301–400：语法专题与学习统计",
    scope: "语法页 · 统计 · 错题",
    items: [
      "语法页改为专题卡片，补充章节、例句与练习",
      "学习统计加入连续天数、掌握度分布与活动日历",
      "错题回顾与今日复习联动",
      "单词详情页加入相关词与固定搭配区块"
    ]
  },
  {
    version: "2.0.0",
    date: "2026-10-20",
    type: "feature",
    summary: "OCR 401–500：词形搜索与词汇关系",
    scope: "搜索 · 单词详情 · 词库",
    items: [
      "搜索支持词形还原、中文与德语双向检索",
      "单词详情补充同义词、反义词、派生词与搭配",
      "图书馆加入分页与更细的难度筛选",
      "文化条目补充来源、可信度与标签"
    ]
  },
  {
    version: "2.1.0",
    date: "2026-10-20",
    type: "feature",
    summary: "OCR 501–600：文章分级与语法练习",
    scope: "文章页 · 语法页 · 题库",
    items: [
      "文章按 A1–C2 分级，阅读页支持主题筛选",
      "语法练习扩展到选择、填空与排序",
      "题库支持单词、短语、语法、文章混合出题",
      "移动端底部导航与响应式布局完善"
    ]
  },
  {
    version: "2.2.0",
    date: "2026-10-20",
    type: "feature",
    summary: "OCR 601–700：文化时代与历史线",
    scope: "历史与文化页",
    items: [
      "历史条目按古代、中世纪、近代、19 世纪、战争、分裂、当代分组",
      "加入历史时期筛选与年份标签",
      "历史线按年份排序，支持点击跳到对应卡片",
      "文化卡片改为按类别筛选：历史、文化、联邦州、人物"
    ]
  },
  {
    version: "2.3.0",
    date: "2026-10-20",
    type: "feature",
    summary: "OCR 701–800：可拖拽时间轴",
    scope: "历史线 · 交互",
    items: [
      "历史时间轴改为横向可拖拽历史线",
      "支持鼠标拖动、触屏滑动与 Shift + 滚轮",
      "年份标签上下交错，点击年份跳转并高亮卡片",
      "时间轴与时期筛选、历史搜索保持联动"
    ]
  },
  {
    version: "2.4.0",
    date: "2026-10-20",
    type: "feature",
    summary: "OCR 801–900：细词性筛选",
    scope: "单词页 · 筛选",
    items: [
      "词性细分为名词、动词、形容词、副词、介词、连词、代词、数词、小品词、感叹词、短语等",
      "图书馆新增细词性筛选，详情页显示细词性",
      "词形变化行按细词性调整显示",
      "保留首次学习流程与旧本地记录兼容"
    ]
  },
  {
    version: "2.5.0",
    date: "2026-10-20",
    type: "feature",
    summary: "OCR 901–1000：词书例句与来源",
    scope: "单词页 · 内容来源",
    items: [
      "词书例句优先替换文章截取例句，保留可靠原例句",
      "单词详情标注例句来源与词书名称",
      "文化卡片统一展示 bookSource、来源链接与可信度",
      "新增资料缺口统计页，按模块计算缺失比例"
    ]
  },
  {
    version: "2.6.0",
    date: "2026-10-20",
    type: "feature",
    summary: "OCR 1001–1100：语法章节与练习补齐",
    scope: "语法页 · 数据",
    items: [
      "OCR 语法卡开始批量补章节、例句与练习",
      "语法详情支持分节阅读与练习作答",
      "文章译文缺失清零，短语中文缺失清零",
      "单词详情补充形容词比较级与动词变位"
    ]
  },
  {
    version: "2.7.0",
    date: "2026-10-20",
    type: "feature",
    summary: "OCR 1101–1200：文化来源与内容平衡",
    scope: "历史与文化页 · 内容",
    items: [
      "历史、文化与人物条目按阶段均衡补充",
      "文化来源字段与来源链接逐步补齐",
      "历史时间轴节点扩展到 30 个以上",
      "短语例句开始集中补齐，优先 OCR 口语短语"
    ]
  },
  {
    version: "2.8.0",
    date: "2026-10-20",
    type: "feature",
    summary: "OCR 1201–1300：历史线定稿与检查点",
    scope: "历史线 · 检查点",
    items: [
      "历史时间轴稳定为 38 个节点，保留拖动与检索",
      "完成第 1300 批检查并暂停",
      "文化来源、文章译文、短语中文检查通过",
      "语法练习缺口从 57 张降到 42 张"
    ]
  },
  {
    version: "2.9.0",
    date: "2026-10-25",
    type: "feature",
    summary: "OCR 1301–1400：语法与文化来源清零",
    scope: "语法页 · 文化页 · 数据",
    items: [
      "语法章节与练习补齐到 74/74（100%）",
      "文化来源补齐到 245/245（100%）",
      "短语例句从 191 条缺失降到 100 条以内",
      "单词继续补名词复数、动词变位与形容词形式"
    ]
  },
  {
    version: "3.0.0",
    date: "2026-10-25",
    type: "feature",
    summary: "OCR 1401–1500：历史、文化与地图三栏",
    scope: "历史与文化页 · 地图 · 更新日志",
    items: [
      "文化板块更名为“历史与文化”，内部细分为历史、文化、地图、人物",
      "内容按历史时期、文化主题、联邦州与人物分组展示",
      "新增德国及周边互动地图，标注 12 座城市，点击查看城市简介",
      "完成第 1500 批检查并暂停；语法、文化来源、OCR 批次均达 100%",
      "更新日志改为每 100 批合并一条，重点记录页面与功能变化"
    ]
  },
  {
    version: "3.1.0",
    date: "2026-10-25",
    type: "feature",
    summary: "OCR 1501–1600：短语例句清零与例句补丁",
    scope: "短语页 · 单词页 · 学习数据",
    items: [
      "短语例句补齐到 227/227，短语页例句覆盖率 100%",
      "新增 WORDBOOK_EXAMPLES 例句补丁，优先覆盖 A1/A2 核心词",
      "单词页对空例句自动补入原创例句并标注来源",
      "历史时间轴、文化分组与互动地图保持可拖拽、可检索"
    ]
  },
  {
    version: "3.2.0",
    date: "2026-10-25",
    type: "feature",
    summary: "OCR 1601–1700：内容库扩容与第 1700 批检查",
    scope: "内容库 · 质量检查 · 学习流程",
    items: [
      "完成 1601–1700 共 100 个 OCR 批次，累计 1700/1700",
      "例句补丁扩展到 243 个常用词条，单词例句缺口降至 4517",
      "新增约 90 个教材词条，继续补齐名词复数、动词变位与搭配",
      "历史新增妇女选举权、首个劳工招募协定与新东方政策三条",
      "第 1700 批检查通过并暂停；首次学习、四档掌握度与本地记录保持不变",
      "下一检查点设为 1750，继续时从 1701 开始"
    ]
  },
  {
    version: "3.3.0",
    date: "2026-10-25",
    type: "feature",
    summary: "地图、人物时间轴与语法分组优化",
    scope: "地图 · 人物 · 语法 · 文化 · 单词",
    items: [
      "地图改为更高的纵向比例，重排 12 座城市标签，减少中心区域重叠",
      "城市简介增加面积、河流、经济特色与亮点标签，说明更完整",
      "人物页接入时间轴，按出生年排序并可按时期筛选",
      "语法页按 A1 基础、A2 进阶与 OCR 主题分组展示",
      "文化页新增主题筛选，可快速切换文学、音乐、艺术等类别",
      "单词卡显示复数变化类型：-e、-en、-er、-s、变音与词尾不变"
    ]
  },
  {
    version: "3.4.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充：历史、文化、人物、地图与阅读同步增加",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 1963 年《爱丽舍条约》",
      "文化新增“下班时间与周日安静”，人物新增索菲·绍尔",
      "地图新增波茨坦，城市简介补充无忧宫、荷兰区与波茨坦会议",
      "语法新增“形容词比较级与最高级”练习卡",
      "短语新增“Könnten Sie das bitte wiederholen?”",
      "阅读新增 B1 短文《Feierabend und Sonntagsruhe》及中文译文"
    ]
  },
  {
    version: "3.5.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第二轮：欧洲选举、复活节与弗赖堡",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 1979 年首次欧洲议会直选",
      "文化新增复活节与复活节习俗，人物新增克拉拉·舒曼",
      "地图新增弗赖堡，补充明斯特教堂、老城溪渠与黑森林",
      "语法新增时间介词 seit / vor / nach / in",
      "短语新增“Ich hätte gern einen Kaffee.”",
      "阅读新增 B1 短文《Ostern in Deutschland》及中文译文"
    ]
  },
  {
    version: "3.6.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第三轮：货币改革、爱因斯坦与罗斯托克",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 1948 年货币改革",
      "文化新增守时与预约，人物新增阿尔伯特·爱因斯坦",
      "地图新增罗斯托克，补充港口、汉萨老城与大学",
      "语法新增目的从句 um ... zu / damit",
      "短语新增“Können Sie mir den Weg zeigen?”",
      "阅读新增 B1 短文《Pünktlichkeit und Termine》及中文译文"
    ]
  },
  {
    version: "3.7.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第四轮：北约、小费与托马斯·曼",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 1955 年加入北约",
      "文化新增德国小费习惯，人物新增托马斯·曼",
      "地图新增特里尔，补充尼格拉城门、罗马浴场与摩泽尔葡萄酒",
      "语法新增情态动词的被动态",
      "短语新增“Was kostet das?”",
      "阅读新增 B1 短文《Trinkgeld in Deutschland》及中文译文"
    ]
  },
  {
    version: "3.8.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第五轮：基础条约、自行车文化与乌尔姆",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 1972 年《基础条约》",
      "文化新增自行车文化与自行车道，人物新增凯绥·珂勒惠支",
      "地图新增乌尔姆，补充大教堂、爱因斯坦出生地与多瑙河",
      "语法新增过去完成时 Plusquamperfekt",
      "短语新增“Können Sie langsamer sprechen?”",
      "阅读新增 B1 短文《Fahrradkultur in Deutschland》及中文译文"
    ]
  },
  {
    version: "3.9.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第六轮：1968、城市小菜园与雷根斯堡",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 1968 学生运动与议会外反对派",
      "文化新增施雷贝尔花园与小块菜园，人物新增玛琳·黛德丽",
      "地图新增雷根斯堡，补充世界遗产老城、石桥与大教堂",
      "语法新增第二虚拟式过去时",
      "短语新增“Ich freue mich auf das Wochenende.”",
      "阅读新增 B1 短文《Schrebergärten in der Stadt》及中文译文"
    ]
  },
  {
    version: "3.10.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第七轮：周一示威、咖啡蛋糕与波恩",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 1989 年周一示威",
      "文化新增 Kaffee und Kuchen，人物新增安格拉·默克尔",
      "地图新增波恩，补充前联邦首都、贝多芬故居与莱茵河",
      "语法新增状态被动态 Zustandspassiv",
      "短语新增“Da haben Sie recht.”",
      "阅读新增 B1 短文《Kaffee und Kuchen》及中文译文"
    ]
  },
  {
    version: "3.11.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第八轮：欧元现金、跨年夜与美因茨",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2002 年欧元现金",
      "文化新增德国跨年夜，人物新增约翰内斯·古腾堡",
      "地图新增美因茨，补充古腾堡博物馆、大教堂与狂欢节",
      "语法新增第一分词作定语 Partizip I",
      "短语新增“Ich bin einverstanden.”",
      "阅读新增 B1 短文《Silvester in Deutschland》及中文译文"
    ]
  },
  {
    version: "3.12.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第九轮：欧元记账、丰收感恩与亚琛",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 1999 年欧元作为记账货币",
      "文化新增丰收感恩节，人物新增内莉·萨克斯",
      "地图新增亚琛，补充查理曼宫廷、大教堂与三国交界",
      "语法新增带 zu 的不定式",
      "短语新增“Ich wünsche Ihnen alles Gute.”",
      "阅读新增 B1 短文《Erntedank in Deutschland》及中文译文"
    ]
  },
  {
    version: "3.13.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第十轮：女总理、芦笋季与埃尔福特",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2005 年首位女联邦总理",
      "文化新增芦笋季，人物新增尤尔根·哈贝马斯",
      "地图新增埃尔福特，补充大教堂、商人桥与奥古斯丁修道院",
      "语法新增动词名词化 Nominalisierung",
      "短语新增“Es tut mir leid.”",
      "阅读新增 B1 短文《Spargelzeit in Deutschland》及中文译文"
    ]
  },
  {
    version: "3.14.0",
    date: "2026-10-25",
    type: "feature",
    summary: "文化页新增节日年历时间轴",
    scope: "文化页 · 节日年历 · 交互",
    items: [
      "文化页新增一月到十二月的年度节日时间轴",
      "18 个节点覆盖固定日期、每年浮动日期与地区性节日",
      "每个节点显示德语名、中文名、日期与类型",
      "点击节日显示习俗说明，并可跳转到相关文化卡",
      "年历在文化/全部分类下显示，历史、地图、人物分类下自动隐藏"
    ]
  },
  {
    version: "3.15.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第十一轮：难民危机、年市与基尔",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2015 年难民危机",
      "文化新增年市与教区集市，人物新增赫塔·米勒",
      "地图新增基尔，补充基尔运河、港口与帆船运动",
      "语法新增将来时 Futur I",
      "短语新增“Könnten Sie mir helfen?”",
      "阅读新增 B1 短文《Jahrmarkt und Kirmes》及中文译文"
    ]
  },
  {
    version: "3.16.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第十二轮：退出核电、碱水结与维尔茨堡",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2011 年退出核电",
      "文化新增碱水结与碱水面包，人物新增维尔纳·海森堡",
      "地图新增维尔茨堡，补充主教宫、玛利亚堡与弗兰肯葡萄酒",
      "语法新增第一虚拟式与间接引语",
      "短语新增“Ich drücke dir die Daumen.”",
      "阅读新增 B1 短文《Brezel und Laugengebäck》及中文译文"
    ]
  },
  {
    version: "3.17.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第十三轮：金融危机、圣诞鹅与图宾根",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2008 年金融危机",
      "文化新增圣诞鹅与节日大餐，人物新增赫尔穆特·科尔",
      "地图新增图宾根，补充大学、老城与 Hölderlin 塔",
      "语法新增间接疑问句",
      "短语新增“Das ist ja interessant!”",
      "阅读新增 B1 短文《Weihnachtsgans und Festessen》及中文译文"
    ]
  },
  {
    version: "3.18.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第十四轮：婚姻平权、姜饼与班贝格",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2017 年婚姻平权",
      "文化新增姜饼与热红酒，人物新增弗里德里希·尼采",
      "地图新增班贝格，补充世界遗产老城、大教堂与烟熏啤酒",
      "语法新增支配第二格的介词",
      "短语新增“Guten Rutsch!”",
      "阅读新增 B1 短文《Lebkuchen und Glühwein》及中文译文"
    ]
  },
  {
    version: "3.19.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第十五轮：气候计划、徒步与吕贝克",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2019 年气候一揽子计划",
      "文化新增徒步与周日郊游，人物新增路易莎·诺伊鲍尔",
      "地图新增吕贝克，补充汉萨旧都、Holstentor 与杏仁糖",
      "语法新增名词化风格与动词化风格",
      "短语新增“Ich stimme zu.”",
      "阅读新增 B1 短文《Wandern in Deutschland》及中文译文"
    ]
  },
  {
    version: "3.20.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第十六轮：疫情、邻里互助与卡塞尔",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2020 年新冠疫情",
      "文化新增邻里互助，人物新增克里斯蒂安·德罗斯滕",
      "地图新增卡塞尔，补充 documenta、山地公园与格林兄弟",
      "语法新增将来完成时 Futur II",
      "短语新增“Bleiben Sie gesund!”",
      "阅读新增 B1 短文《Nachbarschaftshilfe in der Krise》及中文译文"
    ]
  },
  {
    version: "3.21.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第十七轮：时代转折、押金与威斯巴登",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2022 年时代转折",
      "文化新增可回收与一次性包装，人物新增罗伯特·哈贝克",
      "地图新增威斯巴登，补充温泉、Kurhaus 与莱茵高葡萄酒",
      "语法新增双连词 Doppelkonjunktionen",
      "短语新增“Das ist nicht mein Ding.”",
      "阅读新增 B1 短文《Mehrweg und Einweg》及中文译文"
    ]
  },
  {
    version: "3.22.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第十八轮：德国通票、晚餐面包与格尔利茨",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2023 年德国通票",
      "文化新增 Abendbrot，人物新增奥拉夫·朔尔茨",
      "地图新增格尔利茨，补充最东端城市、老城与电影取景",
      "语法新增原因与让步连接词",
      "短语新增“Das kann ich mir vorstellen.”",
      "阅读新增 B1 短文《Abendbrot in Deutschland》及中文译文"
    ]
  },
  {
    version: "3.23.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第十九轮：农民抗议、周日烤肉与弗伦斯堡",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2024 年农民抗议",
      "文化新增周日烤肉，人物新增马克斯·韦伯",
      "地图新增弗伦斯堡，补充最北端城市、丹麦少数民族与港口",
      "语法新增动词与固定介词",
      "短语新增“Ich bin satt.”",
      "阅读新增 B1 短文《Sonntagsbraten und Familie》及中文译文"
    ]
  },
  {
    version: "3.24.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第二十轮：欧洲选举、街道节与康斯坦茨",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2024 年欧洲议会选举",
      "文化新增街道节与邻里节，人物新增尼克拉斯·卢曼",
      "地图新增康斯坦茨，补充博登湖、老城与大学",
      "语法新增状语顺序 TeKaMoLo",
      "短语新增“Ich freue mich darauf.”",
      "阅读新增 B1 短文《Straßenfest in der Nachbarschaft》及中文译文"
    ]
  },
  {
    version: "3.25.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第二十一轮：联邦选举、酒文化与维斯马",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2025 年联邦议院选举",
      "文化新增德国葡萄酒文化，人物新增汉娜·赫希",
      "地图新增维斯马，补充汉萨老城、砖哥特与港口",
      "语法新增第二格关系代词 dessen/deren",
      "短语新增“Können Sie das wiederholen?”",
      "阅读新增 B1 短文《Weinkultur in Deutschland》及中文译文"
    ]
  },
  {
    version: "3.26.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第二十二轮：洪灾、小吃摊与帕绍",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2021 年阿尔河谷洪灾",
      "文化新增小吃摊文化，人物新增格哈德·里希特",
      "地图新增帕绍，补充三河交汇、Stephansdom 与老城",
      "语法新增情态小品词 Modalpartikeln",
      "短语新增“Das ist doch klar.”",
      "阅读新增 B1 短文《Imbisskultur in Deutschland》及中文译文"
    ]
  },
  {
    version: "3.27.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第二十三轮：柴油禁行、泳池与奎德林堡",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2018 年柴油车禁行",
      "文化新增露天泳池文化，人物新增约瑟夫·博伊斯",
      "地图新增奎德林堡，补充木桁架老城、城堡与世界遗产",
      "语法新增比较句 als 与 wie",
      "短语新增“Das ist mir zu teuer.”",
      "阅读新增 B1 短文《Freibadkultur in Deutschland》及中文译文"
    ]
  },
  {
    version: "3.28.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第二十四轮：脱欧、消防队与施特拉尔松德",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2016 年英国脱欧公投",
      "文化新增志愿消防队，人物新增维尔纳·赫尔佐格",
      "地图新增施特拉尔松德，补充汉萨老城、Marienkirche 与 Ozeaneum",
      "语法新增结果从句 so ... dass",
      "短语新增“Das ist eine gute Idee.”",
      "阅读新增 B1 短文《Freiwillige Feuerwehr》及中文译文"
    ]
  },
  {
    version: "3.29.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第二十五轮：希腊危机、啤酒文化与迈森",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2015 年希腊债务危机",
      "文化新增德国啤酒文化，人物新增维姆·文德斯",
      "地图新增迈森，补充迈森瓷器、阿尔布雷希特城堡与葡萄酒",
      "语法新增情态动词的完成时",
      "短语新增“Das ist ja Wahnsinn!”",
      "阅读新增 B1 短文《Bierkultur in Deutschland》及中文译文"
    ]
  },
  {
    version: "3.30.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第二十六轮：世界杯、足球文化与科堡",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2014 年世界杯冠军",
      "文化新增德国足球文化，人物新增弗朗茨·贝肯鲍尔",
      "地图新增科堡，补充 Veste Coburg、公爵家族与剧院",
      "语法新增时间连接词 als / wenn / nachdem",
      "短语新增“Das war knapp!”",
      "阅读新增 B1 短文《Fußballkultur in Deutschland》及中文译文"
    ]
  },
  {
    version: "3.31.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第二十七轮：NSA、黑森林与巴登-巴登",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2013 年 NSA 监听丑闻",
      "文化新增黑森林，人物新增宾根的希尔德加德",
      "地图新增巴登-巴登，补充温泉、Kurhaus 与 Festspielhaus",
      "语法新增非现实比较 als ob",
      "短语新增“Das ist nicht zu fassen!”",
      "阅读新增 B1 短文《Schwarzwald zwischen Tourismus und Tradition》及中文译文"
    ]
  },
  {
    version: "3.32.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第二十八轮：斯图加特 21、篝火与戈斯拉尔",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2010 年斯图加特 21 抗议",
      "文化新增复活节篝火，人物新增尤尔根·克洛普",
      "地图新增戈斯拉尔，补充帝国皇宫、老城与 Rammelsberg 矿山",
      "语法新增功能动词结构 Funktionsverbgefüge",
      "短语新增“Das ist egal.”",
      "阅读新增 B1 短文《Osterfeuer in Deutschland》及中文译文"
    ]
  },
  {
    version: "3.33.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第二十九轮：夏日童话、公共观赛与富尔达",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2006 年夏日童话",
      "文化新增 Public Viewing，人物新增梅苏特·厄齐尔",
      "地图新增富尔达，补充大教堂、圣波尼法爵墓与老城",
      "语法新增被动态完成时",
      "短语新增“Ich bin dabei.”",
      "阅读新增 B1 短文《Public Viewing in Deutschland》及中文译文"
    ]
  },
  {
    version: "3.34.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第三十轮：哈茨四、纸牌与魏玛",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2005 年哈茨四改革",
      "文化新增纸牌与斯卡特，人物新增哈佩·克尔克林",
      "地图新增魏玛，补充歌德故居、包豪斯与古典魏玛",
      "语法新增 dass 从句",
      "短语新增“Ich habe es satt.”",
      "阅读新增 B1 短文《Kartenspiel und Skat》及中文译文"
    ]
  },
  {
    version: "3.35.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第三十一轮：目标延长至 2200，新增电影文化",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语 · OCR 目标",
    items: [
      "OCR 目标由 2000 延长至 2200，检查点同步改为 2200",
      "历史新增 2015 年大众尾气丑闻",
      "文化新增电影文化与影院，人物新增法提赫·阿金",
      "地图新增奥格斯堡，补充 Fuggerei、市政厅与运河",
      "语法新增关系代词 wer / was",
      "短语新增“Das ist der Hammer!”",
      "阅读新增 B1 短文《Filmkultur in Deutschland》及中文译文"
    ]
  },
  {
    version: "3.36.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第三十二轮：欧元救助、戏剧与什未林",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2010 年欧元救助基金",
      "文化新增戏剧文化，人物新增莱辛",
      "地图新增什未林，补充什未林宫、湖泊与老城",
      "语法新增条件句 wenn / falls",
      "短语新增“Das ist nicht mein Ernst.”",
      "阅读新增 B1 短文《Theaterkultur in Deutschland》及中文译文"
    ]
  },
  {
    version: "3.37.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第三十三轮：BER、博物馆与吕讷堡",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2012 年柏林机场 BER 延期",
      "文化新增博物馆景观，人物新增安塞尔姆·基弗",
      "地图新增吕讷堡，补充盐业历史、砖哥特与水城区",
      "语法新增第二虚拟式过去时",
      "短语新增“Das ist nicht mein Tag.”",
      "阅读新增 B1 短文《Museumslandschaft in Deutschland》及中文译文"
    ]
  },
  {
    version: "3.38.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第三十四轮：贸易争端、音乐协会与包岑",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2018 年贸易争端",
      "文化新增音乐协会与业余音乐，人物新增保拉·莫德松-贝克尔",
      "地图新增包岑，补充上卢萨蒂亚、索布文化与老城",
      "语法新增方式从句 indem",
      "短语新增“Ich bin sprachlos.”",
      "阅读新增 B1 短文《Musikverein und Laienmusik》及中文译文"
    ]
  },
  {
    version: "3.39.0",
    date: "2026-10-25",
    type: "feature",
    summary: "均衡扩充第三十五轮：G20、公民倡议与哈默尔恩",
    scope: "内容库 · 地图 · 阅读 · 语法 · 短语",
    items: [
      "历史新增 2017 年汉堡 G20 峰会",
      "文化新增公民倡议，人物新增乌尔里希·贝克",
      "地图新增哈默尔恩，补充鼠笛手传说、木桁架老城与威悉河",
      "语法新增形容词与固定介词",
      "短语新增“Das ist eine Frechheit!”",
      "阅读新增 B1 短文《Bürgerinitiativen in Deutschland》及中文译文"
    ]
  },
  {
    version: "3.40.0",
    date: "2026-10-25",
    type: "feature",
    summary: "时间线惯性滑动与地图缩放",
    scope: "历史/人物时间轴 · 地图 · 交互",
    items: [
      "时间线鼠标拖动加入惯性滑动，松手后平滑减速",
      "触摸端改用原生横向滚动，保留页面纵向滚动",
      "地图支持滚轮、双击与按钮放大缩小，最高 450%",
      "放大地图后可拖动平移，支持重置视图",
      "移动端地图自适应宽度，不再强制横向溢出",
      "新增地图缩放快捷键深链：?mapzoom=2.2"
    ]
  },
  {
    version: "3.41.0",
    date: "2026-10-25",
    type: "data",
    summary: "词库全量校准：畸形词条、冠词与复数修正",
    scope: "词库 · 词条质量 · 数据源",
    items: [
      "审计全部 9638 个词条，新增词条级校准层，可逐条回滚",
      "修复 derdie/derdas 前缀、未闭合括号、地区标记等 40 余条畸形词条",
      "拆分 Bewunderer/Einwanderer 两条 der die 男女合并词条",
      "拆分 Vorsicht vorstellen、Ausweis ausziehen 等 6 条 A1 名词+动词合并行",
      "24 条形容词+名词搭配不再按名词考冠词",
      "修正 der Fluch、der Tropfen、der Dritte 等已确认冠词/词性问题",
      "补全 Verwandte、Serviceangestellte、Band、Mitarbeitende 等可确认复数",
      "清理 Anlage、Einsatz、Sortiment 等释义中混入的德语/英文",
      "统一 Abitur、Portemonnaie、Bankomat、Ski 等地区变体写法",
      "修正 Bedürfnis、Herz ausschütten、Statistisches Amt der EU、Vereinte Nationen 等拼写",
      "A1/A2 逐词审计：修正 Unterkunft、Zusammenbruch、Sport 复数",
      "清理 kein-、besonder-、eigen-、dies- 等 5 个 OCR 词干",
      "修正 Vergehen、erste、rasen 的释义与词性",
      "移除 17 条无法还原的截断残片与合并残片"
    ]
  },
  {
    version: "3.42.0",
    date: "2026-10-25",
    type: "feature",
    summary: "短语按难度排序，首页新增 A/B/C 短语背诵",
    scope: "短语 · 首页 · 背诵模式",
    items: [
      "短语库按难度 A → B → C 排序，并显示难度标记",
      "首页新增短语背诵入口，按 A 入门 / B 进阶 / C 挑战选择",
      "背诵模式支持显示中文、上一个、下一个、随机一条",
      "支持空格显示中文、方向键切换、Esc 关闭",
      "新增深链：?phrases=A / ?phrases=B / ?phrases=C"
    ]
  },
  {
    version: "3.67.0",
    date: "2026-10-26",
    type: "feature",
    summary: "复习算法改为自评起点 + 三形式实测",
    scope: "复习算法 · 单词卡 · 数据",
    items: [
      "首次学习改为 0–5 自评，userLevel 作为起始掌握等级",
      "第二次起轮流考察德译中、中译德、单词拼写，优先最久未考的形式",
      "三种形式全部通过时 level +1；任一形式答错 level -1、重置三形式状态并在 10 分钟后重推",
      "拼写题兼容 ä/ö/ü/ß 的 ae/oe/ue/ss 写法，忽略大小写与首尾空格",
      "卡片页新增「降低考察难度」按钮，只能降低 userLevel，不能手动调高",
      "旧 schema 5 记录先备份，缺字段按默认值兼容，不覆盖原 due / mastery / last / 统计"
    ]
  },
  {
    version: "3.67.1",
    date: "2026-10-27",
    type: "feature",
    summary: "德国地图支持触控双指缩放",
    scope: "历史与文化 · 地图",
    items: [
      "地图支持双指捏合缩放，以两指中点为锚点",
      "缩放后可单指拖动，保留鼠标滚轮、双击与 +/− 按钮",
      "地图区域使用 touch-action: none，避免触控时页面误滚动或浏览器缩放",
      "限制最小/最大缩放范围，并提供重置按钮"
    ]
  },
  {
    version: "3.67.2",
    date: "2026-10-27",
    type: "feature",
    summary: "拼写题要求名词带定冠词",
    scope: "复习算法 · 单词拼写",
    items: [
      "名词拼写答案改为 der/die/das + 单词，例如 das Haus",
      "只输入 Haus 会被判错，并在结果中显示带冠词的正确答案",
      "非名词（动词、形容词等）仍只要求单词本身",
      "提示语、输入框占位符和知识点说明同步更新"
    ]
  },
  {
    version: "3.67.3",
    date: "2026-10-27",
    type: "fix",
    summary: "更新页面时保护本地学习记录",
    scope: "本地存储 · 数据迁移",
    items: [
      "加载页面只做内存归一化，不再在加载时重写 wortkarte.v2",
      "旧 schema 首次加载先备份，备份保留数量提高到 20 个",
      "主键缺失时自动从 last-good 或最新有效备份恢复",
      "会话内第一次写回前再次备份原始主键（pre-write）",
      "只有用户主动操作才写回新结构，并保留原 due / mastery / reps / lapses / 收藏 / 阅读记录"
    ]
  },
  {
    version: "3.68.0",
    date: "2026-10-29",
    type: "data",
    summary: "导入本机 Dehelper 全量词典",
    scope: "词典补充 · 本地词库",
    items: [
      "从本机 Dehelper combined.bin 提取 70,854 个词条",
      "词条包含释义、词性、冠词、复数形式",
      "本地词库作为 godic 的离线补充源，不依赖登录或网络",
      "词卡优先使用已有词条，缺失字段由本地词典补入"
    ]
  }
];

