/* Read-only changelog data for the Wortkarte quality remediation. */
window.WORTKARTE_CHANGELOG = [
  {
    version: "1.0.0",
    date: "2026-10-20",
    type: "data",
    summary: "词库修正：错译、拼写、乱码与 8 组串台词条拆分",
    scope: "词库 · A1–C1",
    items: [
      "修正 Plan / Party / können / mitnehmen / Land / richtig / Praxis 等释义",
      "修正 speichern / sich ausdrücken / Kunstturner 等词形",
      "拆分 anmachen-anmelden、Mehl-mehr、Stuhl-setzen 等 8 组串台行",
      "统一去重后计数为 7507 词，并保留修正字段的 _orig 副本"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-20",
    type: "feature",
    summary: "复习流程升级：先考察、再自评，并加入日历与提醒",
    scope: "复习 · PWA",
    items: [
      "到期词随机抽查，作答后才展示完整词卡",
      "四档自评：忘记 / 困难 / 良好 / 简单（1/3/4/5）",
      "复习日历与带 VALARM 的 .ics 导出",
      "页面内固定时间复习提醒",
      "旧 wortkarte.v2 数据自动补齐新字段并备份"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-20",
    type: "add",
    summary: "教材源登记：10 个 PDF 进入待 OCR 队列",
    scope: "教材 · 数据源",
    items: [
      "登记《新求精》A1/A2 学生用书",
      "登记《新编大学德语》1–4 册、阅读训练与词汇练习",
      "扫描件标记 registered-pending-ocr，不以猜测数据填充"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-20",
    type: "feature",
    summary: "每周小测与今日回顾上线",
    scope: "测验 · 复习",
    items: [
      "每周从已学词生成 8 题小测，可跳过，不改变 SM-2 排期",
      "quiz_current / quiz_history 独立保存周测状态",
      "当天复习过的词可额外回顾最多 2 次",
      "回顾只记录错题与 repeat_review_log，不覆盖复习进度"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-20",
    type: "data",
    summary: "补齐 9 个名词冠词并更新质量审计",
    scope: "词库 · 冠词",
    items: [
      "从缓存的 Goethe A1 元数据补全 Achtung / Grad / Satz / Feiertag / Bahnsteig 等 9 个冠词",
      "质量审计：严重错译残留 0，乱码 0，串台残留 0",
      "剩余缺冠词 87 个、缺复数 2164 个，仍待教材 OCR 或人工复核"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-20",
    type: "add",
    summary: "德国文化模块与主题设置",
    scope: "文化 · 设置",
    items: [
      "新增历史、日常文化、16 个联邦州与人物共 33 条文化卡片",
      "每条文化内容保留来源链接与可信度",
      "设置页新增页面主题、小测难度、每周小测开关",
      "主题使用 CSS 变量切换，并写入 settings"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-20",
    type: "data",
    summary: "从 A1/A2 教材 Wortschatz 表补全冠词和复数",
    scope: "词库 · 教材核对",
    items: [
      "A1/A2 学生用书文本层已提取（349 + 314 页）",
      "按教材 Wortschatz 表补全 1 个冠词与 15 个复数",
      "最新审计：缺冠词 85、缺复数 2132；教材扫描件仍需 OCR"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-20",
    type: "data",
    summary: "OCR 新编大学德语 1 学习指南并补全 27 组冠词/复数",
    scope: "词库 · OCR",
    items: [
      "Free OCR 方案：Tesseract 5.4 + deu/chi_sim/eng",
      "OCR 学习指南 170 页，解析 196 条名词",
      "生成 guide-fixes.js，补全 27 个冠词/复数缺口",
      "最新审计：缺冠词 85、缺复数 2132；中文 OCR 仍需人工复核"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-20",
    type: "data",
    summary: "OCR 两册学习指南并补入 429 组德中例句",
    scope: "词库 · OCR",
    items: [
      "完成新编大学德语 1/2 学习指南共 340 页 OCR",
      "提取 429 组德语例句与中文翻译",
      "生成 guide-examples.js，优先补入原本没有例句的词条",
      "最新审计：德语例句 2457、中文例句 233；仍缺约 5000 条"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-20",
    type: "data",
    summary: "从 Verbformen 开放数据补全 60 组冠词/复数",
    scope: "词库 · Verbformen",
    items: [
      "按 CC BY-SA 4.0 使用 Verbformen 变格数据",
      "缓存并解析 60 个成功页面，补全 2 个冠词与 52 个复数",
      "站点触发 429 后停止抓取，未绕过限流",
      "最新审计：缺冠词 82、缺复数 2072"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-20",
    type: "data",
    summary: "完成新编4、词汇练习、阅读训练 OCR",
    scope: "教材 · OCR",
    items: [
      "新编大学德语第4册 258 页 OCR 完成",
      "词汇练习全4册 457 页 OCR 完成，待结构化",
      "阅读训练 305 页 OCR 完成",
      "新编4 Glossar 按列 OCR 提取 23 组冠词/复数，最新缺复数 2054"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-20",
    type: "data",
    summary: "从德语 Wiktionary 补全 997 组冠词/复数",
    scope: "词库 · Wiktionary",
    items: [
      "使用德语 Wiktionary API，批量读取名词变格模板",
      "按 CC BY-SA 保留来源 URL：wiktionary-fixes.js",
      "补全后缺冠词降至 62、缺复数降至 1392",
      "部分批次遇到 429，未绕过限流"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-20",
    type: "data",
    summary: "从 Tatoeba 补入德中例句",
    scope: "词库 · Tatoeba",
    items: [
      "使用 Tatoeba 德中句对，遵循 CC BY 2.0 FR",
      "完整 links 下载完成，解析 78,042 组德中句对",
      "生成 tatoeba-examples.js，收录 3,296 条短例句",
      "最终审计：德语例句 3879、中文例句 2049"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-20",
    type: "data",
    summary: "完成剩余 Wiktionary 名词抓取",
    scope: "词库 · Wiktionary",
    items: [
      "继续抓取未缓存的 850 个名词页",
      "Wiktionary 修正增至 1,596 组",
      "最新缺冠词 48、缺复数 963",
      "遇到连接错误时重试，未绕过站点限制"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-20",
    type: "frontend",
    summary: "设置分组、更新总结、图书馆资源与 PWA 图标",
    scope: "设置 · 关于 · PWA",
    items: [
      "设置页拆为学习/外观/小测/学习提醒/数据/关于六组",
      "新增自定义主色、个性化推荐、回顾间隔、每日 5–100 词上限",
      "新增本次更新总结卡片与 changelog-summary.js",
      "新增同济图书馆德语资源入口，只登记官方渠道不自动抓取",
      "新增 maskable 512、favicon 32/16 图标，SW 缓存升至 v8"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "frontend",
    summary: "搜索词形、阅读分级、四入口导航与题库",
    scope: "全局 · 阅读 · 短语 · 题库",
    items: [
      "搜索加入变格/变位/词根与变音模糊匹配",
      "新增文章阅读详情页、CEFR 自动分级与来源字段",
      "主页面改为德国历史与文化/文章阅读/短语积累/单词积累四入口",
      "单词库功能并入单词积累，移除独立词库导航",
      "文本/JSON 内容导入，失败重试 1 次后终止",
      "新增题库：单词/短语/语法/文章练习与答案解析"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "首批教材 OCR 并填充阅读、短语、词汇栏目",
    scope: "OCR · 阅读 · 短语 · 词汇",
    items: [
      "OCR 德语阅读训练、晨读美文、口语手册、词汇联想与速记样本",
      "新增 Sportschuhe、Die Hoffnung、Meine Familie 等 OCR 文章",
      "新增 23 条口语短语与 121 条 OCR 词汇候选",
      "内容均保留书名、章节/OCR 来源标签"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 2：A2 阅读、口语 100 句与语法",
    scope: "OCR · 阅读 · 短语 · 语法",
    items: [
      "OCR 新编大学德语阅读训练 1-2、欧标德语阅读教程 A2、跟我学德语口语100句、新编德语语法 第2版",
      "新增 Feste und Bräuche 文章与 5 条问候/告别短语",
      "语法新增情态动词语义与猜测、词尾清化、ch 读音 4 张卡",
      "文章 9 篇、短语 58 条、语法 20 张卡、单词 7500 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 3：B2 阅读、口语与第二分词",
    scope: "OCR · 阅读 · 短语 · 语法 · 词汇",
    items: [
      "OCR 新编大学德语阅读训练 3-4、跟我学德语口语100句、新编德语语法 第2版、词汇联想与速记",
      "新增 Mode heute 文章与 6 条告别/问候短语",
      "语法新增第二分词作定语",
      "词汇候选合并至 237 条，去重后单词 7542 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 4：文学阅读、问询口语与被动语态",
    scope: "OCR · 阅读 · 短语 · 语法 · 词汇",
    items: [
      "OCR 德语阅读教程 3、跟我学德语口语100句、新编德语语法 第2版、词汇联想与速记",
      "新增 Ironie und literarische Moderne 文章与 5 条问询短语",
      "语法新增过程被动态",
      "词汇候选 314 条，去重后单词 7558 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 5：流行音乐阅读、约会口语与虚拟式",
    scope: "OCR · 阅读 · 短语 · 语法 · 词汇",
    items: [
      "OCR 德语阅读教程 4、标准德语900句、新编德语语法 第2版、词汇联想与速记",
      "新增 Die Fantastischen Vier 文章与 6 条约会短语",
      "语法新增第二虚拟式：非现实与礼貌",
      "词汇候选 438 条，去重后单词 7606 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 6：老年运动阅读、出租车口语与功能动词",
    scope: "OCR · 阅读 · 短语 · 语法 · 词汇",
    items: [
      "OCR 大学德语阅读教程、标准德语900句、新编德语语法 第2版、词汇联想与速记",
      "新增 Aktive Erholung ist das Schönste 文章与 7 条出行短语",
      "语法新增功能动词结构",
      "词汇候选 547 条，去重后单词 7631 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 7：跨文化阅读、邮政口语与介词搭配",
    scope: "OCR · 阅读 · 短语 · 语法 · 词汇",
    items: [
      "OCR 德语阅读教程 中级、标准德语900句、新编德语语法 第2版、词汇联想与速记",
      "新增 Chinesin, Deutsch 文章与 7 条邮政/出行短语",
      "语法新增动词与介词搭配",
      "词汇候选 673 条，去重后单词 7665 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 8：住房口语、名词变格与词汇扩充",
    scope: "OCR · 短语 · 语法 · 词汇",
    items: [
      "OCR 新大学德语阅读教程 1、标准德语900句、新编德语语法 第2版、词汇联想与速记",
      "新增 7 条住房/租房短语",
      "语法新增名词强变化/弱变化/混合变化",
      "词汇候选 751 条，去重后单词 7687 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 9：天气/媒体口语、反身代词与词汇扩充",
    scope: "OCR · 短语 · 语法 · 词汇",
    items: [
      "OCR 新大学德语阅读教程 2、标准德语900句、新编德语语法 第2版、词汇联想与速记",
      "新增 7 条天气/媒体短语",
      "语法新增反身代词与相互代词",
      "词汇候选 821 条，去重后单词 7724 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 10：街头对话、节日口语与不定代词",
    scope: "OCR · 阅读 · 短语 · 语法",
    items: [
      "OCR 新编大学德语阅读训练、标准德语900句、新编德语语法 第2版、词汇联想与速记",
      "新增 Treffen auf der Straße 对话文章与 8 条节日/学习短语",
      "语法新增不定代词 alles/all/manch",
      "第 10 批完成，已按约定提醒用户"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 11：和平教育阅读、时间口语与代副词",
    scope: "OCR · 阅读 · 短语 · 语法",
    items: [
      "OCR 欧标德语阅读教程 B1、标准德语900句、新编德语语法 第2版",
      "新增 Servicestelle Friedensbildung 文章与 8 条时间/祝愿短语",
      "语法新增代副词 da(r)-/wo(r)-",
      "文章 16 篇、短语 119 条、语法 29 张卡"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 12：跨文化阅读、电话口语与形容词介词",
    scope: "OCR · 阅读 · 短语 · 语法",
    items: [
      "OCR 德语中级阅读教程、跟我学德语口语100句、新编德语语法 第2版、德语8000词",
      "新增 Ein Indonesier in Deutschland 文章与 8 条电话短语",
      "语法新增形容词固定介词",
      "文章 17 篇、短语 127 条、语法 30 张卡"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 13：tandem 阅读、副词与 8000 词扩充",
    scope: "OCR · 阅读 · 语法 · 词汇",
    items: [
      "OCR 德语高级阅读教程、新编德语语法 第2版、能说会写必备德语8000词",
      "新增 Sprachen lernen im Tandem 文章",
      "语法新增副词位置与比较级",
      "OCR 词汇候选扩至 1191 条，去重后单词 7933 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 14：复活节阅读与介词 nach/seit/von",
    scope: "OCR · 阅读 · 语法",
    items: [
      "OCR 德语阅读教程、新编德语语法 第2版、能说会写必备德语8000词",
      "新增 Ostern viermal anders 文章",
      "语法新增介词 nach/seit/von",
      "文章 19 篇、语法 32 张卡、单词 7933 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 15：科技词汇与介词 unter",
    scope: "OCR · 语法 · 词汇",
    items: [
      "OCR 科技德语阅读教程、新编德语语法 第2版、能说会写必备德语8000词",
      "科技德语页以词汇表为主，未新增文章",
      "语法新增介词 unter 的用法",
      "文章 19 篇、语法 33 张卡、单词 7933 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 16：汽车史阅读、担忧口语与连词",
    scope: "OCR · 阅读 · 短语 · 语法",
    items: [
      "OCR 科技德语阅读教程、标准德语900句、新编德语语法 第2版、德语8000词",
      "新增 Geschichte des Automobils 文章与 4 条担忧表达",
      "语法新增 insofern/insoweit/je…desto",
      "文章 20 篇、短语 131 条、语法 34 张卡"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "feature",
    summary: "全部 20 篇文章增加 AI 中文译文",
    scope: "阅读 · 文章详情",
    items: [
      "新增 article-translations.js，覆盖全部内置与 OCR 文章",
      "文章详情页在德语原文下显示 AI 中文译文，并标注仅供学习参考",
      "短语与 OCR 单词均带中文翻译，无空译文"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 17：父亲阅读与情态小品词",
    scope: "OCR · 阅读 · 语法",
    items: [
      "OCR 德语阅读教程 第1册、新编德语语法 第2版、能说会写必备德语8000词",
      "新增 Der Vater 文章及 AI 中文译文",
      "语法新增情态小品词 aber/doch/denn",
      "文章 21 篇、语法 35 张卡、单词 7933 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 18：青少年访谈与否定词",
    scope: "OCR · 阅读 · 语法",
    items: [
      "OCR 德语阅读教程 第1册、新编德语语法 第2版、能说会写必备德语8000词",
      "新增 Kein Kind mehr und noch nicht erwachsen 文章及 AI 译文",
      "语法新增 kein/nicht 否定用法",
      "文章 22 篇、语法 36 张卡、单词 7933 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 19：大众电动化阅读与可分动词",
    scope: "OCR · 阅读 · 语法",
    items: [
      "OCR 欧标德语阅读教程 B1、新编德语语法 第2版、能说会写必备德语8000词",
      "新增 Volkswagen unter Strom 文章及 AI 译文",
      "语法新增可分动词前缀 auf-/aus-/ein-",
      "文章 23 篇、语法 37 张卡、单词 7933 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 20：形容词后缀与第 20 批暂停",
    scope: "OCR · 语法",
    items: [
      "OCR 欧标德语阅读教程 B1、新编德语语法 第2版、能说会写必备德语8000词",
      "语法新增形容词后缀 -al/-ell/-bar",
      "第 20 批完成，按约定暂停并提醒用户",
      "文章 23 篇、短语 131 条、语法 38 张卡、单词 7933 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 21：说唱学习阅读与主谓一致",
    scope: "OCR · 阅读 · 语法 · 词汇",
    items: [
      "OCR 德语阅读教程 第1册、新编德语语法 第2版、能说会写必备德语8000词",
      "新增 Rappen macht das Lernen leicht 文章及 AI 译文",
      "语法新增数量表达的主谓一致",
      "OCR 词汇候选扩至 2470 条，去重后单词 8826 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "feature",
    summary: "单词卡片补充词性、变形与例句状态",
    scope: "单词积累 · 学习卡片",
    items: [
      "单词列表与卡片显示词性、复数/变位/比较级",
      "缺失项明确标注“待补充”，不再隐藏例句区",
      "OCR 小写词条标记“词性待校对”，避免把动词误标为形容词",
      "Tatoeba 等现有语料自动补充例句，当前 942 条 OCR 词有例句"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 22：命令句与感叹句",
    scope: "OCR · 语法",
    items: [
      "OCR 德语阅读教程 第1册、新编德语语法 第2版、能说会写必备德语8000词",
      "语法新增命令句与感叹句",
      "本批样本以练习和语法页为主，未新增文章",
      "文章 24 篇、语法 40 张卡、单词 8826 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 23：真正的爱动物与让步从句",
    scope: "OCR · 阅读 · 语法",
    items: [
      "OCR 德语阅读教程 第1册、新编德语语法 第2版",
      "新增 Von echter Tierliebe 文章及 AI 译文",
      "语法新增 wenn auch / so auch 让步从句",
      "文章 25 篇、语法 41 张卡、单词 8826 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 24：小小骑行阅读与时间从句",
    scope: "OCR · 阅读 · 语法",
    items: [
      "OCR 德语阅读教程 第1册、新编德语语法 第2版",
      "新增 Kleine Radtour 文章及 AI 译文",
      "语法新增时间从句的时态关系",
      "文章 26 篇、语法 42 张卡、单词 8826 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 25：土耳其家庭融入阅读与插入语",
    scope: "OCR · 阅读 · 语法",
    items: [
      "OCR 德语阅读教程 第1册、新编德语语法 第2版",
      "新增 Integration der Türken in Deutschland 文章及 AI 译文",
      "语法新增插入语、紧缩句与引申从句",
      "文章 27 篇、语法 43 张卡、单词 8826 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 26：篇章衔接手段",
    scope: "OCR · 语法",
    items: [
      "OCR 大学德语阅读教程、新编德语语法 第2版",
      "语法新增篇章衔接：省略、替代与照应",
      "本批阅读页以词汇表和练习为主，未新增文章",
      "文章 27 篇、语法 44 张卡、单词 8826 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 27：柏林分区史与词汇衔接",
    scope: "OCR · 阅读 · 语法",
    items: [
      "OCR 大学德语阅读教程、新编德语语法 第2版",
      "新增 Berlin: Vier Viertel – zwei Halbe – ein Ganzes 文章及 AI 译文",
      "语法新增词汇衔接：同义词、上下义词、反义词",
      "文章 28 篇、语法 45 张卡、单词 8826 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 28：s/ss/ß 拼写规则",
    scope: "OCR · 语法",
    items: [
      "OCR 大学德语阅读教程、新编德语语法 第2版",
      "语法新增 s/ss/ß 拼写规则",
      "本批阅读页以对话和练习为主，未新增完整文章",
      "文章 28 篇、语法 46 张卡、单词 8826 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 29：求职阅读与逗号规则",
    scope: "OCR · 阅读 · 语法",
    items: [
      "OCR 大学德语阅读教程、新编德语语法 第2版",
      "新增 Mit Hauptschulabschluss eine Lehrstelle finden 文章及 AI 译文",
      "语法新增同位语、插入语与补充说明的逗号",
      "文章 29 篇、语法 47 张卡、单词 8826 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 30：世界各地的柏林与第 30 批暂停",
    scope: "OCR · 阅读",
    items: [
      "OCR 大学德语阅读教程、新编德语语法 第2版",
      "新增 Berlin liegt nicht nur an der Spree 文章及 AI 译文",
      "第 30 批完成，按约定暂停并提醒用户",
      "文章 30 篇、短语 131 条、语法 47 张卡、单词 8826 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 31：书评阅读与恢复运行",
    scope: "OCR · 阅读",
    items: [
      "OCR 德语阅读教程 3、新编德语语法 第2版",
      "新增 Buchrezension: Der Schwimmer 文章及 AI 译文",
      "文章 31 篇、短语 131 条、语法 47 张卡、单词 8826 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 32：联邦总统贺词与情态动词虚拟式",
    scope: "OCR · 阅读 · 语法",
    items: [
      "OCR 德语阅读教程 3、新编德语语法 第2版",
      "新增 Grußwort des Bundespräsidenten 文章及 AI 译文",
      "语法新增情态动词虚拟式",
      "文章 32 篇、语法 48 张卡、单词 8826 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 33：不定式结构",
    scope: "OCR · 语法",
    items: [
      "OCR 德语阅读教程 3、新编德语语法 第2版",
      "语法新增带 zu / 不带 zu 的不定式结构",
      "本批阅读页以访谈练习为主，未新增完整文章",
      "文章 32 篇、语法 49 张卡、单词 8826 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 34：蒸汽熨斗说明与现在完成时",
    scope: "OCR · 阅读 · 语法",
    items: [
      "OCR 德语阅读教程 3、新编德语语法 第2版",
      "新增 Gebrauchsanweisung: Dampfbügeleisen 文章及 AI 译文",
      "语法新增现在完成时的用法",
      "文章 33 篇、语法 50 张卡、单词 8826 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 35：商品检验基金会与被动态替代形式",
    scope: "OCR · 阅读 · 语法",
    items: [
      "OCR 德语阅读教程 3、新编德语语法 第2版",
      "新增 Wie gut ist die Stiftung Warentest? 文章及 AI 译文",
      "语法新增 sich lassen / sein + zu + 不定式等被动态替代形式",
      "文章 34 篇、语法 51 张卡、单词 8826 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 36：间接引语",
    scope: "OCR · 语法",
    items: [
      "OCR 德语阅读教程 3、新编德语语法 第2版",
      "语法新增间接引语与虚拟式转换",
      "本批阅读页以阅读教学理论为主，未新增文章",
      "文章 34 篇、语法 52 张卡、单词 8826 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 37：品牌名性别与第三格宾语",
    scope: "OCR · 阅读 · 语法",
    items: [
      "OCR 德语阅读教程 3、新编德语语法 第2版",
      "新增 Der, die oder das Nutella? 文章及 AI 译文",
      "语法新增第三格宾语",
      "文章 35 篇、语法 53 张卡、单词 8826 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 38：名词性别的词尾规则",
    scope: "OCR · 语法",
    items: [
      "OCR 德语阅读教程 3、新编德语语法 第2版",
      "语法新增名词性别的词尾规则",
      "本批阅读页以词汇史论文为主，未新增文章",
      "文章 35 篇、语法 54 张卡、单词 8826 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 39–40：哈利·波特影评与 man 的用法",
    scope: "OCR · 阅读 · 语法",
    items: [
      "OCR 德语阅读教程 4、新编德语语法 第2版",
      "新增 In der Geisterbahn 影评及 AI 译文",
      "语法新增不定代词 man 的用法",
      "第 40 批完成，按约定暂停并提醒用户",
      "文章 36 篇、短语 131 条、语法 55 张卡、单词 8826 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 41：搬家阅读、介绍口语与 irgend- 代词",
    scope: "OCR · 阅读 · 短语 · 语法 · 词汇",
    items: [
      "OCR 德语阅读教程 4、最新德语口语手册、新编德语语法 第2版、德语词汇巧学妙记",
      "新增 Umzug nach Berlin 文章及 AI 译文",
      "新增 6 条自我介绍/家庭照片短语",
      "新增 beraten、Umzug、umziehen 等带词性、变形和例句的词条",
      "文章 37 篇、短语 137 条、语法 56 张卡"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 42：宁夏旅行阅读、邀请口语与 aufschließen 词族",
    scope: "OCR · 阅读 · 短语 · 词汇",
    items: [
      "OCR 德语阅读教程 4、最新德语口语手册、新编德语语法 第2版、德语词汇说文解字",
      "新增 Durch Ningxia in die Innere Mongolei 文章及 AI 译文",
      "新增 6 条邀请/聚会短语",
      "新增 aufschließen、Aufschluss、aufschlussreich、aufgeschlossen 词条",
      "文章 38 篇、短语 143 条、单词 8830 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 43：学业咨询口语与 denken 词族",
    scope: "OCR · 短语 · 词汇",
    items: [
      "OCR 德语阅读教程 4、最新德语口语手册、德语词汇说文解字",
      "新增 5 条学业咨询/选课短语",
      "新增 denken、nachdenken、denkbar 等带词性、变形和例句的词条",
      "文章 38 篇、短语 148 条、单词 8831 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 44：答录机阅读、问路口语与 Freund 词族",
    scope: "OCR · 阅读 · 短语 · 词汇",
    items: [
      "OCR 德语阅读教程 4、最新德语口语手册、德语词汇说文解字",
      "新增 Sie haben Nachrichten 文章及 AI 译文",
      "新增 6 条问路短语",
      "新增 Freund、Freundschaft、freundlich 词条",
      "文章 39 篇、短语 154 条、单词 8832 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 45：学生宿舍口语与 heiraten/hart 词族",
    scope: "OCR · 短语 · 词汇",
    items: [
      "OCR 德语阅读教程 4、最新德语口语手册、德语词汇说文解字",
      "新增 5 条学生宿舍/电话短语",
      "新增 heiraten、hart、verhärten 词条",
      "文章 39 篇、短语 160 条、单词 8833 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 46：星星银币童话、保险口语与 landen 词族",
    scope: "OCR · 阅读 · 短语 · 词汇",
    items: [
      "OCR 德语阅读教程 4、最新德语口语手册、德语词汇说文解字",
      "新增 Die Sterntaler 童话及 AI 译文",
      "新增 5 条医疗保险短语",
      "新增 landen、Landsmann、Einheimische 词条",
      "文章 40 篇、短语 166 条、单词 8834 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 47：邮政口语与 nah/Nähe 词族",
    scope: "OCR · 短语 · 词汇",
    items: [
      "OCR 德语阅读教程 4、最新德语口语手册、德语词汇说文解字",
      "新增 5 条邮政/邮票短语",
      "新增 nah、Nähe、sich nähern 词条",
      "文章 40 篇、短语 172 条、单词 8835 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 48：侦探小说阅读、电话口语与 reich 词族",
    scope: "OCR · 阅读 · 短语 · 词汇",
    items: [
      "OCR 德语阅读教程 4、最新德语口语手册、德语词汇说文解字",
      "新增 Die Kriminalgeschichte 文章及 AI 译文",
      "新增 5 条电话短语",
      "新增 reich、Reich、bereichern 词条",
      "文章 41 篇、短语 178 条、单词 8837 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 49：老年大学阅读、餐厅口语与 stellen/legen 词族",
    scope: "OCR · 阅读 · 短语 · 词汇",
    items: [
      "OCR 德语阅读教程 4、最新德语口语手册、德语词汇说文解字",
      "新增 Seniorenstudium in Deutschland 文章及 AI 译文",
      "新增 5 条餐厅/结账短语",
      "补全 stellen、legen、stehen 带词性、变形和例句的词条",
      "文章 42 篇、短语 184 条、单词 8837 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 50：目的从句、餐厅口语与 verlieren 词族",
    scope: "OCR · 语法 · 短语 · 词汇",
    items: [
      "OCR 德语高级阅读教程、最新德语口语手册、德语词汇说文解字、新编德语语法 第2版",
      "语法新增目的从句 damit / um … zu",
      "新增 5 条餐厅用语",
      "新增 verlieren、verloren gehen 词条",
      "第 50 批完成，按约定暂停并提醒用户",
      "文章 42 篇、短语 190 条、语法 57 张卡、单词 8838 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 51：购物口语、für/gegen 与城市词汇",
    scope: "OCR · 短语 · 语法 · 词汇",
    items: [
      "OCR 德语高级阅读教程、最新德语口语手册、新编德语语法 第2版",
      "新增 5 条购物/问候短语",
      "语法新增介词 für / gegen",
      "新增 Stadtplan、Ansichtskarte、Ehepaar 词条",
      "文章 42 篇、短语 181 条、语法 58 张卡、单词 8839 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 52：父母与人格阅读、购物口语与 an 介词",
    scope: "OCR · 阅读 · 短语 · 语法 · 词汇",
    items: [
      "OCR 德语高级阅读教程、最新德语口语手册、新编德语语法 第2版",
      "新增 Eltern – ein unentrinnbares Schicksal? 文章及 AI 译文",
      "新增 5 条购物短语",
      "语法新增介词 an",
      "新增 Erbinformation、Umwelteinfluss、Vorbildfunktion 词条",
      "文章 43 篇、短语 187 条、语法 59 张卡、单词 8841 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 53：校园暴力阅读、天气口语与 Ware 词族",
    scope: "OCR · 阅读 · 短语 · 词汇",
    items: [
      "OCR 德语高级阅读教程、最新德语口语手册、德语词汇巧学妙记",
      "新增 Schule: schlagen, schubsen, abziehen 文章及 AI 译文",
      "新增 5 条天气短语",
      "新增 Ware、Preis、schwarz、dunkel 词条",
      "文章 44 篇、短语 193 条、语法 59 张卡、单词 8841 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 54：干洗口语与 kalt/Kälte 词族",
    scope: "OCR · 短语 · 词汇",
    items: [
      "OCR 德语高级阅读教程、最新德语口语手册、德语词汇巧学妙记",
      "新增 5 条干洗/取衣短语",
      "新增 kalt、Kälte、Erkältung 词条",
      "文章 44 篇、短语 199 条、语法 59 张卡、单词 8842 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 55：交通/娱乐口语与 Vorsicht 词族",
    scope: "OCR · 短语 · 词汇",
    items: [
      "OCR 德语阅读教程 第1册、最新德语口语手册、德语词汇巧学妙记",
      "新增 6 条交通/娱乐短语",
      "新增 Vorsicht、Einfahrt、Ermäßigung 词条",
      "文章 44 篇、短语 205 条、语法 59 张卡、单词 8843 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 56：可口可乐阅读、会议口语与 Vertrag 词族",
    scope: "OCR · 阅读 · 短语 · 词汇",
    items: [
      "OCR 德语阅读教程 中级、最新德语口语手册、德语词汇巧学妙记",
      "新增 Coca-Cola 文章及 AI 译文",
      "新增 5 条会议/邀请短语",
      "新增 Vertrag、Teehaus、Gelände 词条",
      "文章 45 篇、短语 211 条、语法 59 张卡、单词 8844 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 57：蹦极阅读练习、约会口语与 Bungee 词族",
    scope: "OCR · 短语 · 词汇",
    items: [
      "OCR 德语阅读教程 中级、最新德语口语手册、德语词汇巧学妙记",
      "新增 5 条约会/邀请短语",
      "新增 Bungee-Sprung、Todesangst、Ritual 词条",
      "文章 45 篇、短语 213 条、语法 59 张卡、单词 8846 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 58：德国牧羊犬阅读、als ob 与不规则动词",
    scope: "OCR · 阅读 · 语法 · 词汇",
    items: [
      "OCR 德语阅读教程 中级、德语词汇巧学妙记、新编德语语法 第2版",
      "新增 Der deutsche Schäferhund 文章及 AI 译文",
      "语法新增非现实比较 als ob",
      "新增 leiden、reißen、schneiden、streiten 词条",
      "文章 46 篇、短语 213 条、语法 60 张卡、单词 8847 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 59：神秘包裹阅读、wenn 从句与圣诞词汇",
    scope: "OCR · 阅读 · 语法 · 词汇",
    items: [
      "OCR 德语阅读教程 中级、新编德语语法 第2版",
      "新增 Das geheimnisvolle Paket 文章及 AI 译文",
      "语法新增连词 wenn",
      "新增 Paket、Einsamkeit、Karpfen 词条",
      "文章 47 篇、短语 213 条、语法 61 张卡、单词 8849 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 60：车站告别阅读、nun 与旅行词汇",
    scope: "OCR · 阅读 · 语法 · 词汇",
    items: [
      "OCR 德语阅读教程 中级、新编德语语法 第2版",
      "新增 Abschied am Bahnhof 文章及 AI 译文",
      "语法新增小品词 nun",
      "新增 Gepäck、Abteil、Illustrierte 词条",
      "文章 48 篇、短语 213 条、语法 62 张卡、单词 8849 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 61–62：欧元问答、安乐死阅读与 -ei 构词",
    scope: "OCR · 阅读 · 语法 · 词汇",
    items: [
      "OCR 德语阅读教程 中级、新编德语语法 第2版",
      "新增 Euthanasie? 文章及 AI 译文",
      "语法新增感叹词、后缀 -ei 派生名词",
      "新增 Euthanasie、Verzicht、Würde 词条",
      "文章 49 篇、短语 213 条、语法 64 张卡、单词 8852 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 63–64：残疾儿童统计、不定式名词化与 durch",
    scope: "OCR · 阅读 · 语法 · 词汇",
    items: [
      "OCR 德语阅读教程 中级、新编德语语法 第2版",
      "新增 Behinderte Kinder in der Statistik 文章及 AI 译文",
      "语法新增不定式名词化、介词 durch",
      "补全 Behinderung、Statistik、Versorgung 词条",
      "文章 50 篇、短语 213 条、语法 66 张卡、单词 8852 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 65–66：懒惰讽刺文、宾语从句与 soweit",
    scope: "OCR · 阅读 · 语法 · 词汇",
    items: [
      "OCR 德语阅读教程 中级、新编德语语法 第2版",
      "新增 Faulheit 文章及 AI 译文",
      "语法新增宾语从句、限制从句 soweit",
      "补全 Faulheit、Erfindung、Zweck 词条",
      "文章 51 篇、短语 213 条、语法 68 张卡、单词 8852 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 67–68：德国文化观察、关系从句与前场",
    scope: "OCR · 阅读 · 语法 · 词汇",
    items: [
      "OCR 德语中级阅读教程、新编德语语法 第2版",
      "新增 Ein seltsames Land 文章及 AI 译文",
      "语法新增关系从句、前场 Vorfeld",
      "补全 Distanz、Vorschrift、Terminkalender 词条",
      "文章 52 篇、短语 213 条、语法 70 张卡、单词 8852 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 69–70：老少合住、Love Parade 与替代词",
    scope: "OCR · 阅读 · 语法 · 词汇",
    items: [
      "OCR 德语中级阅读教程、新编德语语法 第2版",
      "新增 Studenten wohnen mit Senioren、Die Love Parade 文章及 AI 译文",
      "语法新增替代词与照应",
      "新增 Mietvertrag、Wohngemeinschaft、Initiative、Lautstärke、Stahlkonstruktion 词条",
      "文章 54 篇、短语 213 条、语法 71 张卡、单词 8854 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 71–72：第一次汽车旅行、复活节兔子与分词",
    scope: "OCR · 阅读 · 语法 · 词汇",
    items: [
      "OCR 德语中级阅读教程、新编德语语法 第2版",
      "新增 Die erste Autofahrt、Der Osterhase 文章及 AI 译文",
      "语法新增 sein + 形容词/分词、分词作定语",
      "新增 Steigung、Pferdestärke、Steuer、Fruchtbarkeit、Manufaktur、Verbreitung 词条",
      "文章 56 篇、短语 213 条、语法 73 张卡、单词 8858 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 73–74：知足者衬衫、交通不体谅与情绪词汇",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语中级阅读教程",
      "新增 Das Hemd eines zufriedenen Menschen、Rücksichtslosigkeit im Verkehr 文章及 AI 译文",
      "补全 Zufriedenheit、Hemd、Sorge、Rücksichtslosigkeit、Vernunft 词条",
      "文章 58 篇、短语 213 条、语法 73 张卡、单词 8860 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 75–76：德国大学开学体验与校园词汇",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语中级阅读教程",
      "新增 Studium – eine neue Erfahrung 文章及 AI 译文",
      "补全 Enttäuschung、Veranstaltung、Stundenplan 词条",
      "文章 59 篇、短语 213 条、语法 73 张卡、单词 8861 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 77–78：数字鸿沟与媒体词汇",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语中级阅读教程",
      "新增 Die digitale Spaltung 文章及 AI 译文",
      "补全 spalten、Gebildete、Medium 词条",
      "文章 60 篇、短语 213 条、语法 73 张卡、单词 8863 个"
    ]
  },
  {
    version: "1.1.0",
    date: "2026-10-21",
    type: "feature",
    summary: "功能迭代：词形搜索、文章详情、CEFR 分级、五栏目导航、题库、难度进阶与数据保护",
    scope: "搜索 · 阅读 · 导航 · 题库 · 存储 · 移动端",
    items: [
      "搜索支持名词格变化、复数、形容词词尾、动词变位与模糊拼写，并按匹配度排序",
      "文章阅读支持详情深链与已读记录，文末固定展示来源/出处",
      "文章难度按 CEFR 六级的词汇占比从 C2 向下判断，超过 10% 即采用该等级",
      "主导航调整为历史与文化、文章阅读、短语积累、单词积累、语法学习五栏目",
      "题库覆盖单词、短语、语法、文章；文章与 OCR 语法卡自动生成题目",
      "单词积累支持 A1–C2 筛选与按难度背诵，按等级记录正确率并在超过 90% 时推荐进阶",
      "移动端底部导航改为五个主栏目，文章、单词表与难度面板自适应小屏",
      "localStorage 数据结构升级到 v4，新增旧数据迁移、导入前快照、导出/导入备份"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 79–80：世博会互动皮影戏与节日词汇",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 欧标德语阅读教程 B1、欧标德语阅读教程 A2",
      "新增 Beweg dich für deine Stadt 文章及 AI 译文",
      "补全 Geschenk、Geschwister、Stress 词条",
      "文章 61 篇、短语 213 条、语法 73 张卡、单词 8863 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 81–82：住房危机、学校假期与农业词汇",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 欧标德语阅读教程 B1、欧标德语阅读教程 A2",
      "新增 Unbezahlbare Neubauten、Ferien und Camping 文章及 AI 译文",
      "补全 Molkerei、Landwirt、Ferien、Camping 词条",
      "文章 63 篇、短语 213 条、语法 73 张卡、单词 8866 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 83–84：健康运动质量标志与认证词汇",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 欧标德语阅读教程 B1、欧标德语阅读教程 A2",
      "新增 Sport pro Gesundheit 文章及 AI 译文",
      "补全 Gütesiegel、Transparenz、Zertifikat 词条",
      "文章 64 篇、短语 213 条、语法 73 张卡、单词 8867 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 85–86：德国协会生活与计算机史",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 新编大学德语阅读训练 3-4、科技德语阅读教程",
      "新增 Vereine in Deutschland、Die Geschichte des Computers 文章及 AI 译文",
      "补全 Verein、Mitglied、Transistor、Mikroprozessor、Heimcomputer 词条",
      "文章 66 篇、短语 213 条、语法 73 张卡、单词 8870 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 87–88：人体器官系统与医学术语",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 新编大学德语阅读训练 3-4、科技德语阅读教程",
      "新增 Organsysteme des Menschen 文章及 AI 译文",
      "补全 Geschlechtsorgan、Harnröhre、Verdauungssystem、Nervensystem 词条",
      "文章 67 篇、短语 213 条、语法 73 张卡、单词 8873 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 89–90：双胞胎故事与农场学校",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语阅读训练、大学德语阅读教程",
      "新增 Zwillinge sind nie allein、Schule auf dem Bauernhof 文章及 AI 译文",
      "补全 Zwilling、Frisur、Bauernhof、Erzeugnis 词条",
      "文章 69 篇、短语 213 条、语法 73 张卡、单词 8875 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 93–94：问候、近况与旅行口语",
    scope: "OCR · 短语",
    items: [
      "OCR 标准德语900句、跟我学德语口语100句",
      "新增 5 条问候/交流/旅行短语",
      "文章 71 篇、短语 217 条、语法 73 张卡、单词 8879 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 95–96：饮料与矿泉水词汇",
    scope: "OCR · 词汇",
    items: [
      "OCR 德语词汇联想与速记",
      "补全 Getränk、Mineralwasser、Kohlensäure、Saft、Limonade 词条",
      "文章 71 篇、短语 217 条、语法 73 张卡、单词 8880 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 97–98：决定、建议与成年生活词汇",
    scope: "OCR · 词汇",
    items: [
      "OCR 德语词汇联想与速记",
      "补全 ankommen、entscheiden、sich entschließen、Rat、volljährig、Altenheim 词条",
      "文章 71 篇、短语 217 条、语法 73 张卡、单词 8882 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-21",
    type: "data",
    summary: "OCR 批次 99–100：工作、休假与戏剧词汇；达成 100 批",
    scope: "OCR · 词汇 · 检查",
    items: [
      "OCR 德语词汇联想与速记",
      "补全 erledigen、Feierabend、Überstunde、Urlaub、Drama、Orchester 词条",
      "完成第 100 批内容检查：文章译文、短语译文、单词字段和语法分类",
      "文章 71 篇、短语 217 条、语法 73 张卡、单词 8882 个"
    ]
  },
  {
    version: "1.1.1",
    date: "2026-10-21",
    type: "frontend",
    summary: "阅读列表按最新排序并支持搜索/CEFR 筛选；短语场景标签移入卡片",
    scope: "阅读 · 短语 · 移动端",
    items: [
      "文章阅读按添加时间倒序，最近 OCR 新增文章优先显示",
      "文章新增标题/主题/来源搜索与 CEFR 等级筛选",
      "短语页取消独立场景筛选栏，场景标签直接显示在每条短语卡片内",
      "短语按最新添加排序；未补例句的短语显示“例句待补充”"
    ]
  },
  {
    version: "1.1.2",
    date: "2026-10-21",
    type: "frontend",
    summary: "PWA 独立模式外链跳转、按钮错误兜底与 SW 缓存升级",
    scope: "PWA · 外链 · 稳定性",
    items: [
      "使用 display-mode: standalone 检测 PWA 独立运行状态",
      "独立模式下外链改用 location.href 当前 webview 跳转，避免 target=_blank 被拦截",
      "关键按钮统一 try/catch，失败时显示中文兜底提示",
      "增加全局 error/unhandledrejection 兜底",
      "Service Worker 缓存版本升级到 wortkarte-shell-v11"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 101–104：吕根岛、慕尼黑、柏林与侦探阅读",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语学习侦探故事 剧院之死、最后一吻、密月惊魂、投毒谋财案",
      "新增 Urlaub auf Rügen、Ein Besuch in München、Patrick ermittelt、Berlin am Chamissoplatz 文章及 AI 译文",
      "补全 Kreidefelsen、Wahrzeichen、Spedition、Altbau、Charme、Loft、ermitteln 词条",
      "文章 75 篇、短语 217 条、语法 73 张卡、单词 8887 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 105–108：联邦德国成立、启蒙文学与汉堡废墟",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语故事、德语国家概况 德文版、德语文学导读、德国文学选读 4",
      "新增 Die Bundesrepublik Deutschland 1949、Die Aufklärung in der deutschen Literatur、Hamburg in Trümmern 文章及 AI 译文",
      "补全 Figur、kichern、Skizzenblock、stottern、Trümmer、Luftbrücke 词条",
      "文章 78 篇、短语 217 条、语法 73 张卡、单词 8891 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 109–116：文具店对话、天气短语与旅行词汇",
    scope: "OCR · 阅读 · 短语 · 词汇",
    items: [
      "OCR 德语故事听说、大学德语课本、GRUNDKURS DEUTSCH、实用旅游德语、德语日常会话等",
      "新增 Im Schreibwarengeschäft 文章及 AI 译文",
      "新增 4 条雷雨/冰雹/下雪短语",
      "补全 Abdruck、Konsum、abreißen、Safe、Batterie 词条",
      "文章 79 篇、短语 221 条、语法 73 张卡、单词 8895 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 117–124：汉堡包、玛雅历、切尔诺贝利与睡眠",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语阅读训练、大学德语阅读教程、科技德语阅读教程、新编大学德语阅读训练 3-4",
      "新增 Der Hamburger、Der Kalender der Maya、Der GAU in Tschernobyl、Schlaf auf Vorrat? 文章及 AI 译文",
      "补全 Fachhochschule、praxisorientiert、Kalender、Schutzgottheit、Reaktor、Schlafdefizit 词条",
      "文章 83 篇、短语 221 条、语法 73 张卡、单词 8898 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 125–132：艾滋病、超导、身高与环境、大爆炸",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语阅读训练、大学德语阅读教程、科技德语阅读教程、新编大学德语阅读训练 3-4",
      "新增 Leben mit AIDS、Die Entdeckung der Supraleitung、Die Körpergröße und die Umwelt、Die Urknalltheorie 文章及 AI 译文",
      "补全 Supraleitung、Quecksilber、Sprungtemperatur、Urknall、Singularität、Anbaufläche、Kohlenmonoxid 词条",
      "文章 87 篇、短语 221 条、语法 73 张卡、单词 8905 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 133–140：明日之城、德国学校体系与不来梅",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 欧标德语阅读教程 A2/B1、德语国家概况、科技德语阅读教程、大学德语阅读教程、新编大学德语阅读训练 1-2",
      "新增 Die Morgenstadt、Chinesisch lernen in China、Das deutsche Schulsystem、Die Freie Hansestadt Bremen、Die schöne Prinzessin 文章及 AI 译文",
      "补全 Stau、Energieverbrauch、Stromspeicher、Schulpflicht、Bruttosozialprodukt、Kummer、Millionär、Roggen 词条",
      "文章 92 篇、短语 221 条、语法 73 张卡、单词 8910 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 141–148：大学辍学、房间描述与图林根工业",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语高级阅读教程、德语阅读教程 3、德语阅读教程 中级、新编大学德语阅读训练 1-2、德语国家概况、大学德语阅读教程",
      "新增 Studienabbrecher in Deutschland、Zimmerbeschreibungen、Thüringen und seine Industrie 文章及 AI 译文",
      "补全 Studienabbrecher、Zimmer、Möbel、Thüringen、Automobil、Keramik、Mörder、Aktentasche 词条",
      "文章 95 篇、短语 221 条、语法 73 张卡、单词 8916 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 149–156：奥地利饮食、维也纳古典乐派与瑞士农业",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语国家概况 151–297、大学德语阅读教程 301–389",
      "新增 Die österreichische Küche、Die Wiener Klassik、Landwirtschaft in der Schweiz、Freiburg, Neuenburg, Waadt und Jura 文章及 AI 译文",
      "补全 Jause、Mehlspeise、Komponist、Rohertrag、Tierhaltung、Milchproduktion、Kanton、Katholizismus 词条",
      "文章 99 篇、短语 221 条、语法 73 张卡、单词 8923 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 157–164：方位介词与词汇补充",
    scope: "OCR · 词汇",
    items: [
      "OCR 新编大学德语阅读训练 1-2、德语国家概况、大学德语阅读教程、德语阅读训练、科技德语阅读教程、德语词汇联想与速记、TestDaF 高频词汇",
      "补全 innen、innerhalb、draußen、Lage、betrachten、außerhalb、gegenüber 词条",
      "文章 99 篇、短语 221 条、语法 73 张卡、单词 8924 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 165–172：阅读教材与课堂词汇",
    scope: "OCR · 词汇",
    items: [
      "OCR 德语泛读教程 上/中/下、人人读德语、德语趣味阅读、德语轻松阅读、今日德国、新大学德语阅读教程 1",
      "补全 Vorwort、Inhalt、Kapitel、Übung、Lektion 词条",
      "文章 99 篇、短语 221 条、语法 73 张卡、单词 8926 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 173–180：儿童烹饪课、银发一代与宠物店幽默",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语泛读教程 上/中/下、人人读德语、德语趣味阅读、德语轻松阅读、今日德国、新大学德语阅读教程 1",
      "新增 Kochunterricht für Kinder、Die Silber-Generation、In einer Tierhandlung 文章及 AI 译文",
      "补全 Übergewicht、Fertiggericht、Mikrowelle、Stoffwechselstörung、Kaufkraft、Halsband、Tierhandlung、Pudel 词条",
      "文章 102 篇、短语 221 条、语法 73 张卡、单词 8931 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 181–188：卡斯帕·豪泽与阅读教材词汇",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语泛读教程 上/中/下、人人读德语、德语趣味阅读、德语轻松阅读、今日德国、新大学德语阅读教程 1",
      "新增 Kaspar Hauser: Rätselhafter Tod in Ansbach 文章及 AI 译文",
      "补全 Archiv、Familiengruft、Überreste、Erbprinz、Hofangestellte、Eindringling、Rückzug 词条",
      "文章 103 篇、短语 221 条、语法 73 张卡、单词 8937 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 189–196：银行劫匪、闪电沙管与雪人故事",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语泛读教程 上/中/下、人人读德语、德语趣味阅读、德语轻松阅读、今日德国、新大学德语阅读教程 1",
      "新增 Bankräuberei — von Handwerk zu Hightech、Wenn Blitze im Sand einschlagen、Unbeschädigte Rückgabe、Der Schneemann und der Spatz 文章及 AI 译文",
      "补全 Bankräuber、Hightech、Sandröhre、Blitz、Zoohandlung、Ratte、Schneemann、Spatz 词条",
      "文章 107 篇、短语 221 条、语法 73 张卡、单词 8943 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 197–200：电话市场与 200 批检查",
    scope: "OCR · 阅读 · 检查",
    items: [
      "OCR 人人读德语、德语轻松阅读、今日德国、新大学德语阅读教程 1",
      "新增 Das Telefon als ständiger Begleiter 文章及 AI 译文",
      "补全 Telefonmarkt、Palette、Begleiter、Telefonzelle 词条",
      "第 200 批检查：文章 108/108 有译文，短语 221/221 有中文",
      "文章 108 篇、短语 221 条、语法 73 张卡、单词 8947 个",
      "OCR 已暂停，下次从第 201 批开始"
    ]
  },
  {
    version: "1.1.0",
    date: "2026-10-22",
    type: "data",
    summary: "扩充德国文化与历史页；OCR 批次 201–208",
    scope: "文化 · 历史 · OCR",
    items: [
      "检索《德语国家概况》《德语国家社会与文化》《德语与德国文化》等书名与目录",
      "新增查理曼加冕、威斯特伐利亚和约、1848 革命、柏林墙等历史条目",
      "新增汉萨同盟、协会文化、圣诞市场、垃圾分类、足球文化等条目",
      "新增维利·勃兰特人物条目；文化页共 43 条",
      "新增 Am Bahnhof、Hobbys und Sprachen、Sterntaler 文章及 AI 译文",
      "补全 Schalter、Schlange、Auskunft、Altersunterschied、Hobby、Sekretärin、Taler 词条",
      "文章 111 篇、短语 221 条、语法 73 张卡、单词 8948 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 209–216：朝鲜撤馆新闻与马丁学英语",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语报刊阅读、德语时事阅读、德语时文阅读与理解、德语快速阅读、德语阅读入门、基础德语读本、德语阅读理解",
      "新增 Nordkorea: Deutschland soll Botschaft räumen、Martin lernt Englisch 文章及 AI 译文",
      "补全 Botschaft、Außenministerium、Regime、Eskalation、Sprachlabor、Fortschritt、Vokabel、Fehler 词条",
      "修复重复的 ocr-sterntaler 文章 ID",
      "文章 112 篇、短语 221 条、语法 73 张卡、单词 8952 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 217–224：雪茄工匠与德国博物馆",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语报刊阅读、德语时事阅读、德语时文阅读与理解、德语快速阅读、德语快速阅读与理解、德语阅读入门、基础德语读本、德语阅读理解",
      "新增 Eine Frage der Übung、Museen in der Bundesrepublik 文章及 AI 译文",
      "补全 Museum、Kunstwerk、Sammlung、Besucher、Zigarre、Tabak、Vitrine 词条",
      "文章 114 篇、短语 221 条、语法 73 张卡、单词 8954 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 225–232：教皇选举与老年继续教育",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语报刊阅读、德语时事阅读、德语时文阅读与理解、德语快速阅读、德语快速阅读与理解、德语阅读入门、基础德语读本、德语阅读理解",
      "新增 Das Konklave im Vatikan、Weiterbildung für Ältere 文章及 AI 译文",
      "补全 Konklave、Kardinal、Papst、Stimmzettel、Weiterbildung、Semester、Lebenserfahrung、Modellversuch 词条",
      "文章 116 篇、短语 221 条、语法 73 张卡、单词 8960 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 233–240：革命历法与时间结构",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语报刊阅读、德语时事阅读、德语时文阅读与理解、德语快速阅读、德语快速阅读与理解、德语阅读入门、基础德语读本、德语阅读理解",
      "新增 Revolutionäre Kalender 文章及 AI 译文",
      "补全 Kalender、Revolution、Dekade、Arbeitszeit、Zeitdruck、Freizeit、Statistik、Durchschnitt 词条",
      "文章 117 篇、短语 221 条、语法 73 张卡、单词 8962 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 241–248：泰坦尼克号铆钉、打错电话与海外经历",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语报刊阅读、德语时事阅读、德语时文阅读与理解、德语快速阅读、德语快速阅读与理解、德语阅读入门、基础德语读本、德语阅读理解",
      "新增 Warum sank die Titanic?、Die falsche Nummer、Meine Erlebnisse im Ausland 文章及 AI 译文",
      "补全 Titanic、Wrack、Niete、Schlacke、Koffer、Reparatur、Auslandserfahrung、Gymnasium 词条",
      "文章 120 篇、短语 221 条、语法 73 张卡、单词 8966 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 249–256：木柴供暖、外籍劳工与热气球环游",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语报刊阅读、德语时事阅读、德语时文阅读与理解、德语快速阅读、德语快速阅读与理解、德语阅读入门、基础德语读本、德语阅读理解",
      "新增 Heizen mit Holz und Wärmepumpe、Ein Gastarbeiter erzählt、Mit dem Ballon um die Welt、Osterbräuche 文章及 AI 译文",
      "补全 Wärmepumpe、Heizung、Gastarbeiter、Heimweh、Ballon、Osterei、Marzipan 词条",
      "文章 124 篇、短语 221 条、语法 73 张卡、单词 8971 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 257–264：联邦议院与昂贵的爱好",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语报刊阅读、德语时事阅读、德语时文阅读与理解、德语快速阅读、德语快速阅读与理解、德语阅读入门、基础德语读本、德语阅读理解",
      "新增 Im Bundestag、Teure Hobbys 文章及 AI 译文",
      "补全 Bundestag、Abgeordnete、Opposition、Debatte、Ausrüstung、Trainerstunde、Nachhilfe、Dachboden 词条",
      "文章 126 篇、短语 221 条、语法 73 张卡、单词 8973 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 265–272：做客礼仪与家务分工",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语报刊阅读、德语时文阅读与理解、德语快速阅读、德语快速阅读与理解、基础德语读本、德语阅读理解、新标准德语阅读训练、新编德语报刊阅读",
      "新增 Radio beim Besuch、Wer macht die Hausarbeit? 文章及 AI 译文",
      "补全 Radio、Unterhaltung、Sitte、Hausarbeit、Geschirr、Einkauf、Wäsche、Krimi 词条",
      "文章 128 篇、短语 221 条、语法 73 张卡、单词 8974 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 273–280：青少年奥运与度假恋情",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语报刊阅读、德语时文阅读与理解、德语快速阅读、德语快速阅读与理解、基础德语读本、德语阅读理解、新标准德语阅读训练、新编德语报刊阅读",
      "新增 Jugend trainiert für Olympia、Kein Urlaub ohne Urlaubsflirt 文章及 AI 译文",
      "补全 Olympia、Medaille、Schulmannschaft、Urlaub、Flirt、Freundin、Strand、Entdeckungsreise 词条",
      "文章 130 篇、短语 221 条、语法 73 张卡、单词 8978 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 281–288：意大利地震与救援",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语报刊阅读、德语时文阅读与理解、德语快速阅读、德语快速阅读与理解、基础德语读本、德语阅读理解、新标准德语阅读训练、新编德语报刊阅读",
      "新增 Erdbeben in Italien 文章及 AI 译文",
      "补全 Erdbeben、Trümmer、Sicherheitskräfte、Unglücksgebiet、Zivilschutz、Freiwillige、Solidarität 词条",
      "文章 131 篇、短语 221 条、语法 73 张卡、单词 8983 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 289–296：汽车、休闲服装与音乐治疗",
    scope: "OCR · 阅读 · 词汇",
    items: [
      "OCR 德语报刊阅读、德语时文阅读与理解、德语快速阅读、德语快速阅读与理解、基础德语读本、德语阅读理解、新编德语报刊阅读",
      "新增 Bringt das Auto immer Freude?、Freizeit und Kleidung、Musiktherapie 文章及 AI 译文",
      "补全 Panne、Freizeitkleidung、Sonntagskleidung、Musiktherapie、Patient、Therapie、Steuergeld 词条",
      "文章 134 篇、短语 221 条、语法 73 张卡、单词 8985 个"
    ]
  },
  {
    version: "1.0.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 297–300：女演员访谈与 300 批检查",
    scope: "OCR · 阅读 · 检查",
    items: [
      "OCR 德语报刊阅读、新编德语报刊阅读、德语时文阅读与理解、德语快速阅读",
      "新增 Schauspielerin im Interview 文章及 AI 译文",
      "补全 Schauspielerin、Casting、Rolle、Interview、Aufnahmegerät、Energie、Studium、entspannen 词条",
      "第 300 批检查：文章 135/135 有译文，短语 221/221 有中文",
      "文章 135 篇、短语 221 条、语法 73 张卡、单词 8988 个",
      "OCR 已暂停，下次从第 301 批开始"
    ]
  },
  {
    version: "1.2.0",
    date: "2026-10-22",
    type: "data",
    summary: "历史/文化专题 OCR 301–308：柏林墙倒塌、欧盟与德国地理",
    scope: "历史 · 文化 · OCR",
    items: [
      "优先 OCR 德语国家国情文化、德语时文、德语与德国文化、德国面面观、德语国家国情、德语国家社会与文化、科尔自述、德国海军战略",
      "文化/历史页新增柏林墙倒塌、德国与欧盟、德国地理 3 条，共 46 条",
      "新增 Erinnerungen an den Mauerfall 文章及 AI 译文",
      "补全 Mauerfall、Zeitzeuge、Grenzübergang、Staatsbankett 词条",
      "文章 136 篇、短语 221 条、语法 73 张卡、单词 8991 个"
    ]
  },
  {
    version: "1.2.1",
    date: "2026-10-22",
    type: "data",
    summary: "历史/文化专题 OCR 309–316：降临节、狂欢节与啤酒节",
    scope: "历史 · 文化 · OCR",
    items: [
      "优先 OCR 文化视窗高级德语教程 1/2、德语文学与文化、德语文学中的文化记忆、近代德语文学中的政治和宗教、世界德语报刊阅读、国情1000题、初到德国",
      "文化/历史页新增降临节、狂欢节、慕尼黑啤酒节 3 条，共 49 条",
      "新增 Advent, Adventskalender und Adventskranz 文章及 AI 译文",
      "补全 Advent、Adventskalender、Adventskranz、Karneval、Oktoberfest 词条",
      "文章 137 篇、短语 221 条、语法 73 张卡、单词 8995 个"
    ]
  },
  {
    version: "1.2.2",
    date: "2026-10-22",
    type: "data",
    summary: "历史/文化专题 OCR 317–324：啤酒花园与租赁合同",
    scope: "历史 · 文化 · OCR",
    items: [
      "优先 OCR 文化视窗高级德语教程 1/2、德语文学与文化、德语文学中的文化记忆、近代德语文学中的政治和宗教、世界德语报刊阅读、国情1000题、初到德国",
      "文化/历史页新增巴伐利亚啤酒花园，共 50 条",
      "新增 Der bayerische Biergarten 文章及 AI 译文",
      "补全 Biergarten、Gartenwirtschaft、Mietvertrag、Vermieter 词条",
      "文章 138 篇、短语 221 条、语法 73 张卡、单词 8997 个"
    ]
  },
  {
    version: "1.2.3",
    date: "2026-10-22",
    type: "data",
    summary: "历史/文化专题 OCR 325–332：德国旅游与汽车工业",
    scope: "历史 · 文化 · OCR",
    items: [
      "优先 OCR 文化视窗高级德语教程 1/2、德语文学与文化、德语文学中的文化记忆、近代德语文学中的政治和宗教、世界德语报刊阅读、国情1000题、初到德国",
      "文化/历史页新增德国作为旅游目的地、德国汽车工业，共 52 条",
      "新增 Deutschland als Reiseland 文章及 AI 译文",
      "补全 Reiseland、Marktanteil、Automobilindustrie、Marke 词条",
      "文章 139 篇、短语 221 条、语法 73 张卡、单词 9000 个"
    ]
  },
  {
    version: "1.2.4",
    date: "2026-10-22",
    type: "data",
    summary: "历史/文化专题 OCR 333–340：跳蚤市场、选举与教育",
    scope: "历史 · 文化 · OCR",
    items: [
      "优先 OCR 文化视窗高级德语教程 1/2、德语文学与文化、德语文学中的文化记忆、近代德语文学中的政治和宗教、世界德语报刊阅读、国情1000题、初到德国",
      "文化/历史页新增跳蚤市场、德国选举制度、义务教育与教育体系，共 55 条",
      "新增 Jäger und Sammler auf dem Flohmarkt 文章及 AI 译文",
      "补全 Flohmarkt、Wahlsystem、Erststimme、Zweitstimme 词条",
      "文章 140 篇、短语 221 条、语法 73 张卡、单词 9003 个"
    ]
  },
  {
    version: "1.2.5",
    date: "2026-10-22",
    type: "data",
    summary: "历史/文化专题 OCR 341–348：皮裤、紧身连衣裙与建筑",
    scope: "历史 · 文化 · OCR",
    items: [
      "优先 OCR 文化视窗高级德语教程 1/2、德语文学与文化、德语文学中的文化记忆、近代德语文学中的政治和宗教、世界德语报刊阅读、国情1000题、初到德国",
      "文化/历史页新增皮裤与紧身连衣裙、德国建筑与历史，共 57 条",
      "新增 Lederhose und Dirndl 文章及 AI 译文",
      "补全 Lederhose、Dirndl、Tracht、Architektur 词条",
      "文章 141 篇、短语 221 条、语法 73 张卡、单词 9007 个"
    ]
  },
  {
    version: "1.2.6",
    date: "2026-10-22",
    type: "data",
    summary: "历史/文化专题 OCR 349–356：社会市场经济与中小企业",
    scope: "历史 · 文化 · OCR",
    items: [
      "优先 OCR 文化视窗高级德语教程 1/2、德语文学与文化、德语文学中的文化记忆、近代德语文学中的政治和宗教、世界德语报刊阅读、国情1000题、初到德国",
      "文化/历史页新增社会市场经济、德国中小企业，共 59 条",
      "补全 Mittelstand、Wettbewerb、Sozialstaat、Infrastruktur 词条",
      "文章 141 篇、短语 221 条、语法 73 张卡、单词 9008 个"
    ]
  },
  {
    version: "1.2.7",
    date: "2026-10-22",
    type: "data",
    summary: "历史/文化专题 OCR 357–364：贝多芬书信与自我形象",
    scope: "历史 · 文化 · OCR",
    items: [
      "优先 OCR 文化视窗高级德语教程 1/2、德语文学与文化、德语文学中的文化记忆、近代德语文学中的政治和宗教、世界德语报刊阅读、国情1000题、初到德国",
      "文化/历史页新增贝多芬书信与日记，共 60 条",
      "新增 Beethoven in Briefen und Tagebüchern 文章及 AI 译文",
      "补全 Briefwechsel、Tagebuch、Selbststilisierung、Gönner 词条",
      "文章 142 篇、短语 221 条、语法 73 张卡、单词 9011 个"
    ]
  },
  {
    version: "1.2.8",
    date: "2026-10-22",
    type: "data",
    summary: "历史/文化专题 OCR 365–372：双元制与莱比锡音乐",
    scope: "历史 · 文化 · OCR",
    items: [
      "优先 OCR 文化视窗高级德语教程 1/2、德语文学与文化、德语文学中的文化记忆、近代德语文学中的政治和宗教、世界德语报刊阅读、国情1000题、初到德国",
      "文化/历史页新增双元制职业培训、莱比锡音乐学院，共 62 条",
      "补全 Ausbildung、Berufsakademie、Musikhochschule、Berufsschule 词条",
      "文章 142 篇、短语 221 条、语法 73 张卡、单词 9013 个"
    ]
  },
  {
    version: "1.2.9",
    date: "2026-10-22",
    type: "data",
    summary: "历史/文化专题 OCR 373–380：霍夫斯泰德文化维度与沉默",
    scope: "历史 · 文化 · OCR",
    items: [
      "优先 OCR 文化视窗高级德语教程 1/2、德语文学与文化、德语文学中的文化记忆、近代德语文学中的政治和宗教、世界德语报刊阅读、国情1000题、初到德国",
      "文化/历史页新增霍夫斯泰德文化维度、交流与沉默，共 64 条",
      "新增 Kulturelle Dimensionen nach Hofstede 文章及 AI 译文",
      "补全 Machtdistanz、Individualismus、Kollektivismus、Kulturvergleich 词条",
      "文章 143 篇、短语 221 条、语法 73 张卡、单词 9017 个"
    ]
  },
  {
    version: "1.2.10",
    date: "2026-10-22",
    type: "data",
    summary: "历史/文化专题 OCR 381–388：青年旅舍与德国节日",
    scope: "历史 · 文化 · OCR",
    items: [
      "优先 OCR 文化视窗高级德语教程 1/2、德语文学与文化、德语文学中的文化记忆、近代德语文学中的政治和宗教、世界德语报刊阅读、初到德国",
      "文化/历史页新增青年旅舍、德国节日，共 66 条",
      "补全 Jugendherberge、Feiertag、Heiligabend、Klassenfahrt 词条",
      "文章 143 篇、短语 221 条、语法 73 张卡、单词 9019 个"
    ]
  },
  {
    version: "1.2.11",
    date: "2026-10-22",
    type: "data",
    summary: "历史/文化专题 OCR 389–396：实习经验与法兰克福金融中心",
    scope: "历史 · 文化 · OCR",
    items: [
      "优先 OCR 文化视窗高级德语教程 1/2、德语文学与文化、德语文学中的文化记忆、世界德语报刊阅读、初到德国、德国面面观、国情文化练习册与学生读本",
      "文化/历史页新增实习与工作经验、法兰克福金融中心，共 68 条",
      "新增 Praxis ist alles 文章及 AI 译文",
      "补全 Praktikum、Berufserfahrung、Finanzplatz、Börse 词条",
      "文章 144 篇、短语 221 条、语法 73 张卡、单词 9020 个"
    ]
  },
  {
    version: "1.3.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 397–400 与第 400 批检查：四七社、圣诞树、文化与历史 70 条",
    scope: "历史 · 文化 · OCR · 检查",
    items: [
      "完成 OCR 批次 301–400，优先历史、文化、国情类 PDF",
      "文化/历史页新增四七社、圣诞树，共 70 条",
      "新增 Der Weihnachtsbaum 文章及 AI 译文",
      "补全 Nachkriegsliteratur、Weihnachtsbaum、Weihnachtsmann、Christkind 词条",
      "第 400 批检查：文章 145/145 有译文，短语 221/221 有中文，译文缺失 0",
      "文章 145 篇、短语 221 条、语法 73 张卡、单词 9024 个",
      "OCR 已暂停，下次从第 401 批开始"
    ]
  },
  {
    version: "1.4.0",
    date: "2026-10-22",
    type: "feature",
    summary: "四档掌握度、难度化每日单词与易混词选择题",
    scope: "单词 · 复习算法 · 首页",
    items: [
      "主页新增 A1–C2 难度选择，每日单词只从所选难度抽取",
      "掌握度改为未掌握 / 遗忘 / 较生疏 / 熟练四档",
      "前三档按 10 分钟 / 1 天 / 3 天自动重推，熟练档 14 天起",
      "每次复习改为四选一易混词辨析，只看对错，不再自评",
      "答对升一档、答错降档，词卡页同步显示当前掌握度和下次复习时间",
      "修复 135 条 OCR 性别连写词条，按规则补全 145 条阴性名词复数",
      "运行时去重后单词 8997 个；新增 verify/gap-report.md 记录缺口"
    ]
  },
  {
    version: "1.4.1",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 401–408：德国人口与工业区位",
    scope: "历史 · 文化 · 国情 · OCR",
    items: [
      "优先 OCR 德语国家国情、德语国家社会与文化、德语与德国文化、德语时文、德国面面观、奥地利/瑞士德语文学史、德语国家概况",
      "文化/历史页新增德国人口、工业与区位因素，共 72 条",
      "新增 Bevölkerung Deutschlands 文章及 AI 译文",
      "补全 Bevölkerung、Geburtenrate、Industriegebiet、Standort 词条",
      "文章 146 篇、短语 221 条、语法 73 张卡、单词 8999 个"
    ]
  },
  {
    version: "1.4.2",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 409–416：马克斯·普朗克与奥地利认同",
    scope: "历史 · 文化 · 科学 · OCR",
    items: [
      "优先 OCR 德语国家国情、德语国家社会与文化、德语与德国文化、德语时文、德国面面观、奥地利/瑞士文学史、德语国家概况",
      "文化/历史页新增马克斯·普朗克研究所与诺贝尔奖、1945 年后的奥地利国家认同，共 74 条",
      "新增 Die Wiege der Nobelpreise 文章及 AI 译文",
      "补全 Grundlagenforschung、Wissenschaftsförderung、Wiederaufbau、Selbstverständnis 词条",
      "文章 147 篇、短语 221 条、语法 73 张卡、单词 9003 个"
    ]
  },
  {
    version: "1.4.3",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 417–424：德国高校与学校体系",
    scope: "教育 · 文化 · 国情 · OCR",
    items: [
      "优先 OCR 德语国家国情、德语国家社会与文化、德语与德国文化、德语时文、德国面面观、奥地利/瑞士文学史、德语国家概况",
      "文化/历史页新增德国高校体系、小学与学校体系，共 76 条",
      "新增 Das deutsche Hochschulwesen 文章及 AI 译文",
      "补全 Hochschulwesen、Grundschule、Schulbuch、Hochschule 词条",
      "文章 148 篇、短语 221 条、语法 73 张卡、单词 9005 个"
    ]
  },
  {
    version: "1.4.4",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 425–432：汽车与环境、不来梅城市文化",
    scope: "社会 · 城市 · 文化 · OCR",
    items: [
      "优先 OCR 德语国家国情、德语国家社会与文化、德语与德国文化、德语时文、德国面面观、奥地利/瑞士文学史、德语国家概况",
      "文化/历史页新增汽车与环境、不来梅与不来梅港，共 78 条",
      "新增 Auto und Umwelt in Deutschland 文章及 AI 译文",
      "补全 Verkehrssicherheit、Abgas、Katalysator、Stadtfreiheit 词条",
      "文章 149 篇、短语 221 条、语法 73 张卡、单词 9009 个"
    ]
  },
  {
    version: "1.4.5",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 433–440：服务业社会与瓦尔特堡",
    scope: "经济 · 历史 · 文化 · OCR",
    items: [
      "优先 OCR 德语国家国情、德语国家社会与文化、德语与德国文化、德语时文、德国面面观、奥地利/瑞士文学史、德语国家概况",
      "文化/历史页新增走向服务业社会、艾森纳赫附近的瓦尔特堡，共 80 条",
      "新增 Die Wartburg bei Eisenach 文章及 AI 译文",
      "补全 Dienstleistungsgesellschaft、Wirtschaftsbereich、Wartburg、Bibelübersetzung 词条",
      "文章 150 篇、短语 221 条、语法 73 张卡、单词 9013 个"
    ]
  },
  {
    version: "1.4.6",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 441–448：德国报刊业与奥地利德语",
    scope: "媒体 · 语言 · 文化 · OCR",
    items: [
      "优先 OCR 德语国家国情、德语国家社会与文化、德语与德国文化、德语时文、奥地利/瑞士文学史、德语国家概况、德国文学选读",
      "文化/历史页新增德国报刊业、奥地利德语，共 82 条",
      "新增 Die deutsche Presselandschaft 文章及 AI 译文",
      "补全 Nachrichtenmagazin、Muttersprache、Auflagenzahl、Presselandschaft 词条",
      "文章 151 篇、短语 221 条、语法 73 张卡、单词 9017 个"
    ]
  },
  {
    version: "1.5.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 449–450 与第 450 批检查：维也纳咖啡馆文化",
    scope: "历史 · 文化 · OCR · 检查",
    items: [
      "完成 OCR 批次 401–450，优先历史、文化、国情类 PDF",
      "文化/历史页新增维也纳咖啡馆、奥地利饮食，共 84 条",
      "新增 Das Wiener Kaffeehaus 文章及 AI 译文",
      "补全 Tafelspitz、Schach、Kaffeehauskultur、Korrespondenz 词条",
      "第 450 批检查：文章 152/152 有译文，短语 221/221 有中文，译文缺失 0",
      "文章 152 篇、短语 221 条、语法 73 张卡、单词 9020 个",
      "OCR 已暂停，下次从第 451 批开始"
    ]
  },
  {
    version: "1.5.1",
    date: "2026-10-22",
    type: "feature",
    summary: "首次学习恢复自由选择掌握度；OCR 451–458 完成",
    scope: "复习流程 · 历史 · 文化 · OCR",
    items: [
      "单词第一次出现时显示完整词卡，并用忘记/困难/良好/简单自由选择掌握度",
      "首次选择映射为未掌握 10 分钟、遗忘 1 天、较生疏 3 天、熟练 14 天",
      "第二次及以后出现才进入四选一易混词考察，只看对错",
      "文化/历史页新增德国政党体系、维也纳歌剧与轻歌剧，共 86 条",
      "新增 Das deutsche Parteiensystem 文章及 AI 译文",
      "补全 Fünfprozentklausel、Parteiensystem、Zwölftonmusik、Operette 词条",
      "文章 153 篇、短语 221 条、语法 73 张卡、单词 9024 个"
    ]
  },
  {
    version: "1.5.2",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 459–466：魏玛共和国与德国工会",
    scope: "历史 · 政治 · 文化 · OCR",
    items: [
      "优先 OCR 德语国家国情、德语与德国文化、德语时文、德国文学选读、奥地利/瑞士文学史、德语国家概况、德语学习文化卷",
      "文化/历史页新增魏玛共和国、德国工会，共 88 条",
      "新增 Die Weimarer Republik 文章及 AI 译文",
      "补全 Weimarer Republik、Nationalversammlung、Verfassung、Gewerkschaftsbewegung 词条",
      "文章 154 篇、短语 221 条、语法 73 张卡、单词 9028 个"
    ]
  },
  {
    version: "1.5.3",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 467–474：瑞士城市与 1982 年世界杯",
    scope: "城市 · 体育 · 文化 · OCR",
    items: [
      "优先 OCR 德语国家国情、德语时文、德国文学选读、德语国家概况、德语学习文化卷、德语文学中的文化记忆",
      "文化/历史页新增穆尔滕与纳沙泰尔、德国国家足球队，共 90 条",
      "新增 Die WM 1982 und die deutsche Nationalmannschaft 文章及 AI 译文",
      "补全 Altstadt、Uhrenforschung、Stadtmauer、Ringmauer 词条",
      "文章 155 篇、短语 221 条、语法 73 张卡、单词 9032 个"
    ]
  },
  {
    version: "1.5.4",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 475–482：现实主义与鲁道夫·奥伊肯",
    scope: "文学 · 艺术 · 哲学 · OCR",
    items: [
      "优先 OCR 德语文学中的文化记忆、德国文学选读、德语学习文化卷与文学卷、德语国家国情、德语时文、当代外国文学纪事",
      "文化/历史页新增文学与艺术中的现实主义、鲁道夫·奥伊肯，共 92 条",
      "新增 Realismus in Literatur und Kunst 文章及 AI 译文",
      "补全 Realismus、Wirklichkeit、Idealismus、Darstellung 词条",
      "文章 156 篇、短语 221 条、语法 73 张卡、单词 9035 个"
    ]
  },
  {
    version: "1.5.5",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 483–490：德国日常礼仪与居住文化",
    scope: "文化 · 社会 · 文学 · OCR",
    items: [
      "优先 OCR 德语学习文化卷与文学卷、当代外国文学纪事、瑞士德语文学、卡夫卡研究、后现代主义文学、短篇小说编年",
      "文化/历史页新增德国日常礼仪、住宅与私人空间，共 94 条",
      "新增 Alltagsetikette in Deutschland 文章及 AI 译文",
      "补全 Etikette、Trinkgeld、Gastgeschenk、Umgangsform 词条",
      "文章 157 篇、短语 221 条、语法 73 张卡、单词 9038 个"
    ]
  },
  {
    version: "1.5.6",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 491–498：德国节庆文化与戈特弗里德·凯勒",
    scope: "节庆 · 文学 · 文化 · OCR",
    items: [
      "优先 OCR 德语学习文化卷与文学卷、当代外国文学纪事、后现代主义文学、短篇小说编年、卡夫卡研究、瑞士德语文学",
      "文化/历史页新增德国节庆文化、戈特弗里德·凯勒，共 96 条",
      "新增 Die deutsche Festkultur 文章及 AI 译文",
      "补全 Festkultur、Festtag、Schützenfest、Winzer 词条",
      "文章 158 篇、短语 221 条、语法 73 张卡、单词 9042 个"
    ]
  },
  {
    version: "1.6.0",
    date: "2026-10-22",
    type: "data",
    summary: "OCR 批次 499–500 与第 500 批检查：诗歌作为日用品",
    scope: "文学 · 文化 · OCR · 检查",
    items: [
      "完成 OCR 批次 451–500，优先历史、文化、国情类 PDF",
      "文化/历史页新增作为“日用品”的诗歌，共 97 条",
      "新增 Das Gedicht als Gebrauchsartikel 文章及 AI 译文",
      "补全 Gebrauchsartikel、Assoziation、Lyrikband、Leserschaft 词条",
      "第 500 批检查：文章 159/159 有译文，短语 221/221 有中文，译文缺失 0",
      "文章 159 篇、短语 221 条、语法 73 张卡、单词 9046 个",
      "OCR 已暂停，下次从第 501 批开始"
    ]
  },
  {
    version: "1.6.1",
    date: "2026-10-22",
    type: "data",
    summary: "统一口径与数据清理：修复重复 ID、补齐阴阳性、复核缺口",
    scope: "数据质量 · 统计口径",
    items: [
      "语法统一为 73 张 = 核心 16 + OCR 57，检查报告同步标注",
      "修复 164 个重复 ID，运行时为冲突词条生成唯一 ID",
      "名词阴阳性从缺 48 条降到 0 条",
      "修复 6 个 OCR 合并词条，重新归类 19 个非名词残片",
      "补全 19 个常见名词复数，复数覆盖率提升到 76.2%",
      "删除 1 条真正的重复词条 die Möbel",
      "新增 verify/content-status.md，统一汇总重复、缺口与 OCR 覆盖",
      "口径统一后单词 9037 个、文章 159 篇、短语 221 条、文化 97 条"
    ]
  },
  {
    version: "1.6.2",
    date: "2026-10-22",
    type: "feature",
    summary: "GitHub Pages 更新保护：旧记录自动备份，损坏时停止写入",
    scope: "数据安全 · 部署",
    items: [
      "部署只替换静态文件，不读写 localStorage；同一网址更新不会清空学习记录",
      "读取旧 schema 前先写入带时间戳备份和 wortkarte.v2.last-good",
      "旧数据无法解析时保留原始字符串并暂停写入，避免新页面覆盖损坏记录",
      "备份最多保留 2 份，防止 localStorage 配额被备份占满",
      "README 增补 GitHub Pages 记录保护说明与备份键名",
      "验证：旧 schema 迁移保留 reviews；损坏数据生成 corrupt 备份"
    ]
  },
  {
    version: "1.7.0",
    date: "2026-10-24",
    type: "data",
    summary: "OCR 批次 501–508：月份词源与狮子亨利",
    scope: "历史 · 文化 · 语言 · OCR",
    items: [
      "开始 OCR 批次 501–600，继续优先历史、文化、国情类 PDF",
      "文化/历史页新增德语月份名称来源、狮子亨利，共 99 条",
      "新增 Woher die deutschen Monatsnamen kommen 文章及 AI 译文",
      "补全 Monatsname、Etymologie、römisch、Kalendermonat 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9041 个"
    ]
  },
  {
    version: "1.7.1",
    date: "2026-10-24",
    type: "data",
    summary: "OCR 批次 509–516：战争文学与席勒传统",
    scope: "文学 · 历史 · 文化 · OCR",
    items: [
      "优先 OCR 德语学习文学卷、当代外国文学纪事下卷、20世纪短篇小说编年下卷、德语国家中篇小说选",
      "文化/历史页新增战后战争文学、席勒与代际冲突，共 101 条",
      "补全 Kriegsliteratur、Nachkriegszeit、Traditionspflege、Generationenkonflikt 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9045 个"
    ]
  },
  {
    version: "1.7.2",
    date: "2026-10-24",
    type: "data",
    summary: "OCR 批次 517–524：卡夫卡与工业劳动代价",
    scope: "文学 · 社会史 · 文化 · OCR",
    items: [
      "优先 OCR 联邦共和国的贫困、历史潮流不可抗拒、跨文化管理、文学纪事、短篇小说编年、中篇小说选、卡夫卡研究、瑞士德语文学",
      "文化/历史页新增弗朗茨·卡夫卡、工业劳动及其代价，共 103 条",
      "补全 Vaterkonflikt、Industrialisierung、Arbeitsunfall、Fabrikarbeit 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9049 个"
    ]
  },
  {
    version: "1.7.3",
    date: "2026-10-24",
    type: "data",
    summary: "OCR 批次 525–532：卡夫卡之梦与跨文化合作",
    scope: "文学 · 跨文化 · 文化 · OCR",
    items: [
      "优先 OCR 联邦共和国的贫困、历史潮流不可抗拒、跨文化管理、卡夫卡研究、瑞士德语文学、中篇小说选、短篇小说编年、文学纪事",
      "文化/历史页新增卡夫卡与梦、跨文化合作，共 105 条",
      "补全 Traumdeutung、Selbstverwaltung、Führungsstil、Kulturaustausch 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9053 个"
    ]
  },
  {
    version: "1.7.4",
    date: "2026-10-24",
    type: "data",
    summary: "OCR 批次 533–540：经济危机与赫尔曼·黑塞",
    scope: "经济史 · 文学 · 文化 · OCR",
    items: [
      "优先 OCR 联邦共和国的贫困、跨文化管理、卡夫卡研究、瑞士德语文学、中篇小说选、短篇小说编年上下卷、文学纪事",
      "文化/历史页新增经济危机与短时工作、赫尔曼·黑塞，共 107 条",
      "补全 Kurzarbeit、Entlassung、Kriegsgegner、Weltkrieg 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9057 个"
    ]
  },
  {
    version: "1.7.5",
    date: "2026-10-24",
    type: "data",
    summary: "OCR 批次 541–548：马克斯·弗里施与犹太身份",
    scope: "文学 · 身份 · 社会 · OCR",
    items: [
      "优先 OCR 联邦共和国的贫困、跨文化管理、卡夫卡研究、瑞士德语文学、中篇小说选、短篇小说编年上下卷、文学纪事",
      "文化/历史页新增马克斯·弗里施、卡夫卡与犹太身份，共 109 条",
      "补全 Selbstsuche、Bildungsungleichheit、Judentum、Selbstbild 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9060 个"
    ]
  },
  {
    version: "1.7.6",
    date: "2026-10-24",
    type: "data",
    summary: "OCR 批次 549–556：住房短缺与迪伦马特",
    scope: "社会史 · 文学 · 文化 · OCR",
    items: [
      "优先 OCR 联邦共和国的贫困、跨文化管理、卡夫卡研究、瑞士德语文学、中篇小说选、短篇小说编年上下卷、文学纪事",
      "文化/历史页新增联邦德国住房短缺、弗里德里希·迪伦马特，共 111 条",
      "补全 Wohnungsnot、Sanierung、Utopie、Gerechtigkeit 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9063 个"
    ]
  },
  {
    version: "1.7.7",
    date: "2026-10-24",
    type: "data",
    summary: "OCR 批次 557–564：君特·格拉斯与穆施格",
    scope: "文学 · 文化 · OCR",
    items: [
      "优先 OCR 联邦共和国的贫困、跨文化管理、卡夫卡研究、瑞士德语文学、中篇小说选、短篇小说编年上下卷、文学纪事",
      "文化/历史页新增君特·格拉斯、阿道夫·穆施格，共 113 条",
      "补全 Blechtrommel、Schriftsteller、Literaturpreis、Erzähler 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9066 个"
    ]
  },
  {
    version: "1.7.8",
    date: "2026-10-24",
    type: "data",
    summary: "OCR 批次 565–572：布莱希特与比克塞尔",
    scope: "戏剧 · 文学 · 文化 · OCR",
    items: [
      "优先 OCR 联邦共和国的贫困、跨文化管理、卡夫卡研究、瑞士德语文学、中篇小说选、短篇小说编年上下卷、文学纪事",
      "文化/历史页新增贝托尔特·布莱希特、彼得·比克塞尔，共 115 条",
      "补全 Dramatiker、Sprachlosigkeit、Annäherung、Missverständnis 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9070 个"
    ]
  },
  {
    version: "1.7.9",
    date: "2026-10-24",
    type: "data",
    summary: "OCR 批次 573–580：体育暴力与媒体政治",
    scope: "戏剧 · 媒体 · 文化 · OCR",
    items: [
      "优先 OCR 文学纪事下卷、卡夫卡研究、瑞士德语文学、中篇小说选、短篇小说编年上下卷、跨文化管理",
      "文化/历史页新增体育、身体与暴力、政治作为媒体表演，共 117 条",
      "补全 Inszenierung、Wahlkampf、Körperkultur、Medienpolitik 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9074 个"
    ]
  },
  {
    version: "1.8.0",
    date: "2026-10-24",
    type: "data",
    summary: "OCR 批次 581–588：德语中篇小说与贝尔福斯",
    scope: "文学 · 戏剧 · 文化 · OCR",
    items: [
      "优先 OCR 卡夫卡研究、瑞士德语文学、中篇小说选、短篇小说编年上下卷、文学纪事下卷、跨文化管理",
      "文化/历史页新增德语中篇小说、卢卡斯·贝尔福斯，共 119 条",
      "补全 Novelle、Dramaturgie、Erzählung、Prosa 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9077 个"
    ]
  },
  {
    version: "1.8.1",
    date: "2026-10-24",
    type: "data",
    summary: "OCR 批次 589–596：歌德故居北京厅与席勒",
    scope: "文学 · 建筑 · 文化 · OCR",
    items: [
      "优先 OCR 卡夫卡研究、瑞士德语文学、中篇小说选、短篇小说编年上下卷",
      "文化/历史页新增歌德故居与北京厅、弗里德里希·席勒，共 121 条",
      "补全 Chinoiserie、Barock、Wohnhaus、Innenraum 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9081 个"
    ]
  },
  {
    version: "1.8.2",
    date: "2026-10-24",
    type: "data",
    summary: "OCR 批次 597–600 与第 600 批检查：施蒂夫特与航空文学",
    scope: "文学 · 技术 · 文化 · 检查",
    items: [
      "完成 OCR 批次 501–600，优先历史、文化、国情与文学类 PDF",
      "文化/历史页新增阿达尔贝特·施蒂夫特、航空与科技热情，共 123 条",
      "补全 Aviatik、Technikbegeisterung、Naturerfahrung、Erzählkunst 词条",
      "第 600 批检查：文章 160/160 有译文，短语 221/221 有中文",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9085 个",
      "OCR 已暂停，下次从第 601 批开始；检查点 600，下次检查点 650"
    ]
  },
  {
    version: "1.9.0",
    date: "2026-10-24",
    type: "data",
    summary: "OCR 批次 601–608：法兰克王国与东亚研究",
    scope: "历史 · 文化 · 国情 · OCR",
    items: [
      "开始 OCR 批次 601–700，继续优先历史、文化、国情类 PDF",
      "文化/历史页新增法兰克王国与基督教化、德国东亚研究，共 125 条",
      "补全 Christianisierung、Frankenreich、Missionar、Kaisertum 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9089 个"
    ]
  },
  {
    version: "1.9.1",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 609–616：梅尔塞堡咒语与阴阳",
    scope: "古代文化 · 哲学 · 国情 · OCR",
    items: [
      "优先 OCR 德语与德国文化、德语文学与文化、文化记忆、经典中篇小说、音乐教育、东亚研究、今日德国、外国人看中国文化",
      "文化/历史页新增梅尔塞堡咒语、阴阳作为世界模型，共 127 条",
      "补全 Zauberspruch、germanisch、Harmonie、Polarität 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9093 个"
    ]
  },
  {
    version: "1.9.2",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 617–624：帕尔西法尔与家庭计划",
    scope: "中世纪 · 国情 · 文化 · OCR",
    items: [
      "优先 OCR 德语与德国文化、文学与文化、文化记忆、经典中篇小说、音乐教育、东亚研究、今日德国、外国人看中国文化",
      "文化/历史页新增帕尔西法尔与圣杯、独生子女政策与家庭计划，共 129 条",
      "补全 Gral、Familienplanung、Einkindpolitik、Geburtenkontrolle 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9097 个"
    ]
  },
  {
    version: "1.9.3",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 625–632：路德圣经与文化记忆",
    scope: "宗教史 · 语言史 · 文化 · OCR",
    items: [
      "优先 OCR 德语与德国文化、文学与文化、文化记忆、经典中篇小说、音乐教育、东亚研究、今日德国、外国人看中国文化",
      "文化/历史页新增路德圣经翻译、文化记忆，共 131 条",
      "补全 Kirchengeschichte、Sprachgeschichte、Schriftkultur、Reformation 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9101 个"
    ]
  },
  {
    version: "1.9.4",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 633–640：法国大革命与电话依赖",
    scope: "革命史 · 媒介 · 文化 · OCR",
    items: [
      "优先 OCR 德语与德国文化、文学与文化、文化记忆、经典中篇小说、音乐教育、东亚研究、今日德国、外国人看中国文化",
      "文化/历史页新增法国大革命与德国文学、电话作为脐带，共 133 条",
      "补全 Revolutionsepoche、Nabelschnur、Erreichbarkeit、Geschäftsessen 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9105 个"
    ]
  },
  {
    version: "1.9.5",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 641–648：海涅与多元文化社会",
    scope: "文学 · 社会 · 文化 · OCR",
    items: [
      "优先 OCR 德语与德国文化、文学与文化、文化记忆、经典中篇小说、东亚研究、今日德国、外国人看中国文化",
      "文化/历史页新增海因里希·海涅、多元文化社会，共 135 条",
      "补全 Hymne、Multikultur、Fremdenfeindlichkeit、Anderssein 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9109 个"
    ]
  },
  {
    version: "1.9.6",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 649–656：奥地利德语与物的诗学",
    scope: "语言文化 · 文学 · 文化 · OCR",
    items: [
      "优先 OCR 德语与德国文化、文学与文化、文化记忆、经典中篇小说、东亚研究、今日德国、外国人看中国文化",
      "文化/历史页新增奥地利德语、格拉斯与物的诗学，共 137 条",
      "补全 Standarddeutsch、Sprachpolitik、Mundart、Dingbedeutung 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9113 个"
    ]
  },
  {
    version: "1.9.7",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 657–664：歌德《塔索》与跨文化能力",
    scope: "古典文学 · 跨文化 · 文化 · OCR",
    items: [
      "优先 OCR 文学与文化、文化记忆、经典中篇小说、东亚研究、今日德国、外国人看中国文化",
      "文化/历史页新增歌德《塔索》、跨文化能力，共 139 条",
      "补全 interkulturell、Pünktlichkeit、Effizienz、Terminplanung 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9116 个"
    ]
  },
  {
    version: "1.9.8",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 665–672：茨威格《象棋的故事》与青年旅舍",
    scope: "文学 · 青年文化 · 文化 · OCR",
    items: [
      "优先 OCR 文化记忆、经典中篇小说、东亚研究、今日德国、外国人看中国文化",
      "文化/历史页新增茨威格《象棋的故事》、青年旅舍与班级旅行，共 141 条",
      "补全 Schachnovelle、Schachfigur、Herberge、Klassenreise 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9120 个"
    ]
  },
  {
    version: "1.9.9",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 673–680：巴赫曼与边境交通",
    scope: "女性文学 · 旅行 · 文化 · OCR",
    items: [
      "优先 OCR 文化记忆、经典中篇小说、东亚研究、今日德国、外国人看中国文化、文学与文化",
      "文化/历史页新增英格博格·巴赫曼、边境交通与度假旅行，共 143 条",
      "补全 Geschlechterrolle、Grenzverkehr、Urlaubsreise、Warteschlange 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9124 个"
    ]
  },
  {
    version: "1.9.10",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 681–688：中国与外国人、技术伦理",
    scope: "跨文化 · 技术伦理 · 文化 · OCR",
    items: [
      "优先 OCR 文化记忆、东亚研究、今日德国、外国人看中国文化、文学与文化",
      "文化/历史页新增中国与外国人、技术伦理与未来责任，共 145 条",
      "补全 Fremde、Verantwortungsethik、Technikfolgen、Zukunftsverantwortung 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9128 个"
    ]
  },
  {
    version: "1.9.11",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 689–696：德语语言区与德国地貌",
    scope: "国情 · 地理 · 文化 · OCR",
    items: [
      "优先 OCR 德国面面观、国情1000题、社会与文化、国情文化学生读本与练习册、文化视窗1/2、德语国家概况",
      "文化/历史页新增德语语言区、德国地貌，共 147 条",
      "补全 Sprachraum、Mittelgebirge、Küstenlandschaft、Alpen 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9132 个"
    ]
  },
  {
    version: "2.0.0",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 697–700 与第 700 批检查：马歇尔计划与柏林空运",
    scope: "国情 · 战后史 · 文化 · 检查",
    items: [
      "完成 OCR 批次 601–700，优先历史、文化、国情与文学类 PDF",
      "文化/历史页新增德国饮料消费、马歇尔计划与柏林空运，共 149 条",
      "补全 Getränkekonsum、Marshallplan、Blockade、Währungsreform 词条",
      "第 700 批检查：文章 160/160 有译文，短语 221/221 有中文",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9136 个",
      "OCR 已暂停，下次从第 701 批开始；检查点 700，下次检查点 750"
    ]
  },
  {
    version: "2.0.1",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展开始：OCR 批次 701–708",
    scope: "历史 · 社会 · 国情 · 语言 · OCR",
    items: [
      "开启 701–800 均衡计划：历史、文化、国情、社会、文学、语言、日常与地理交替推进",
      "文化/历史页新增奥地利1938与“德奥合并”、德国常见名字，共 151 条",
      "补全 Vornamensstatistik、Studienwahl、Berufseinstieg、Praktikumsplatz 词条",
      "文章 160 篇、短语 221 条、语法 73 张卡、单词 9140 个"
    ]
  },
  {
    version: "2.0.2",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展：OCR 批次 709–716",
    scope: "抵抗史 · 文学 · 社会 · OCR",
    items: [
      "历史线：新增反抗希特勒与1944年7月20日刺杀",
      "文学线：新增海因里希·伯尔与“四七社”、战后文学",
      "补全 Widerstand、Attentat、Trümmerliteratur、Vergangenheitsbewältigung 词条",
      "文化/历史页共 153 条；文章 160 篇、短语 221 条、语法 73 张卡、单词 9143 个"
    ]
  },
  {
    version: "2.0.3",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展：OCR 批次 717–724",
    scope: "语言哲学 · 古典 · 地理 · OCR",
    items: [
      "语言线：新增维特根斯坦与“语言游戏”",
      "文学/文化线：新增魏玛古典主义，文章 Weimar als Zentrum der Klassik 及译文",
      "地理线：补充冰川木乃伊与阿尔卑斯相关词汇",
      "补全 Sprachspiel、Sprachphilosophie、Klassik、Gletschermumie 词条",
      "文化/历史 155 条；文章 161 篇、短语 221 条、语法 73 张卡、单词 9147 个"
    ]
  },
  {
    version: "2.0.4",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展：OCR 批次 725–732",
    scope: "建筑 · 音乐 · 语言 · OCR",
    items: [
      "历史/建筑线：新增勃兰登堡门与柏林记忆",
      "音乐线：新增维也纳古典乐派（海顿、莫扎特、贝多芬）",
      "语言线：补充奥地利德语语法、句调与指小形式",
      "补全 Brandenburger Tor、Satzmelodie、Musikgeschichte、Verkleinerung 词条",
      "文化/历史 157 条；文章 161 篇、短语 221 条、语法 73 张卡、单词 9151 个"
    ]
  },
  {
    version: "2.0.5",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展：OCR 批次 733–740",
    scope: "文学 · 饮食文化 · OCR",
    items: [
      "文学线：新增海因里希·曼《臣仆》与威廉时代讽刺",
      "日常线：新增奥地利葡萄酒、Heuriger 与啤酒文化",
      "补全 Untertan、Heuriger、Weinstube、Satire 词条",
      "文化/历史 159 条；文章 161 篇、短语 221 条、语法 73 张卡、单词 9155 个"
    ]
  },
  {
    version: "2.0.6",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展：OCR 批次 741–748",
    scope: "教育 · 音乐 · 阅读 · OCR",
    items: [
      "教育/社会线：新增高中毕业后的专业选择、间隔年与职业咨询",
      "音乐线：新增第二维也纳乐派与十二音技法",
      "阅读线：加入德语故事与趣味阅读材料",
      "补全 Zwischenjahr、Berufsberatung、Aushilfe、Zwölftontechnik 词条",
      "文化/历史 161 条；文章 161 篇、短语 221 条、语法 73 张卡、单词 9157 个"
    ]
  },
  {
    version: "2.0.7",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展：OCR 批次 749–756",
    scope: "交通 · 语法 · 国情 · OCR",
    items: [
      "地理/交通线：新增瑞士交通网、圣哥达隧道与 SBB",
      "语言线：新增情态动词的客观与主观用法",
      "补全 Gotthard、Verkehrsnetz、Motorisierung、Strassennetz 词条",
      "文化/历史 163 条；文章 161 篇、短语 221 条、语法 73 张卡、单词 9161 个"
    ]
  },
  {
    version: "2.0.8",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展：OCR 批次 757–764",
    scope: "体育 · 钟表 · 阅读 · OCR",
    items: [
      "社会/体育线：新增潮流运动、刺激与风险",
      "地理/产业线：新增瑞士钟表业、纳沙泰尔与汝拉",
      "阅读线：加入德语故事、趣味阅读与泛读教程",
      "补全 Trendsport、Uhrenindustrie、Uhrwerk、Feinmechanik 词条",
      "文化/历史 165 条；文章 161 篇、短语 221 条、语法 73 张卡、单词 9165 个"
    ]
  },
  {
    version: "2.0.9",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展：OCR 批次 765–772",
    scope: "休闲史 · 东德转型 · 阅读 · OCR",
    items: [
      "社会/文化线：新增休闲与工作的分离、1897年上海《消闲报》",
      "历史线：新增1990年后东德的经济与社会转型",
      "阅读线：加入泛读教程上/中/下与故事、趣味阅读",
      "补全 Transformation、Ostdeutschland、Bahnhofskiosk、Wahlergebnis 词条",
      "文化/历史 167 条；文章 161 篇、短语 221 条、语法 73 张卡、单词 9169 个"
    ]
  },
  {
    version: "2.0.10",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展：OCR 批次 773–780",
    scope: "老龄社会 · 经济 · 阅读 · OCR",
    items: [
      "社会线：新增“银发一代”、购买力与老龄市场",
      "经济线：新增“肘部社会”、市场竞争与公平问题",
      "阅读线：继续泛读教程与故事、趣味阅读",
      "补全 Silbergeneration、Wirtschaftsfaktor、Marktwirtschaft、Ellenbogengesellschaft 词条",
      "文化/历史 169 条；文章 161 篇、短语 221 条、语法 73 张卡、单词 9173 个"
    ]
  },
  {
    version: "2.0.11",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展：OCR 批次 781–788",
    scope: "体育 · 历史谜案 · 阅读 · OCR",
    items: [
      "社会/体育线：新增业余足球、家乡俱乐部与志愿服务",
      "历史线：新增卡斯帕·豪泽之谜",
      "阅读线：加入轻松阅读、快速阅读与阅读理解材料",
      "补全 Heimatverein、Amateurfußball、Vereinsleben、Findling 词条",
      "文化/历史 171 条；文章 161 篇、短语 221 条、语法 73 张卡、单词 9177 个"
    ]
  },
  {
    version: "2.0.12",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展：OCR 批次 789–796",
    scope: "音乐治疗 · 媒介 · 阅读 · OCR",
    items: [
      "社会/健康线：新增德国音乐治疗培训与职业路径",
      "媒介线：新增短消息、Twitter 与公开交流",
      "趣味线：加入香蕉贴纸收藏与轻松阅读材料",
      "补全 Tweet、Kurzmitteilung、Sammelleidenschaft、Bananenaufkleber 词条",
      "文化/历史 173 条；文章 161 篇、短语 221 条、语法 73 张卡、单词 9181 个"
    ]
  },
  {
    version: "2.1.0",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 797–800 与第 800 批检查：步行街与儿童未来愿望",
    scope: "城市 · 社会 · 阅读 · 检查",
    items: [
      "完成均衡计划 OCR 批次 701–800",
      "文化/历史页新增步行街与交通舒缓、儿童的未来愿望，共 175 条",
      "补全 Fußgängerzone、Verkehrsberuhigung、Ozonschicht、Zukunftswunsch 词条",
      "第 800 批检查：文章 161/161 有译文，短语 221/221 有中文",
      "文章 161 篇、短语 221 条、语法 73 张卡、单词 9185 个",
      "OCR 已暂停，下次从第 801 批开始；检查点 800，下次检查点 850"
    ]
  },
  {
    version: "2.2.0",
    date: "2026-10-25",
    type: "feature",
    summary: "文化页检索、文章例句匹配与 OCR 批次 801–808",
    scope: "检索 · 例句 · 阅读 · OCR",
    items: [
      "德国历史与文化页新增检索框，可按中文、德语、年份或标签筛选",
      "单词缺少例句时，从文章中匹配难度相近的完整句子，并标注文章来源与等级",
      "文化/历史页新增柏林魔鬼山、转折后时期，共 177 条",
      "补全 Teufelsberg、Trümmerschutt、Nachwendezeit、Zeitachse 词条",
      "文章 161 篇、短语 221 条、语法 73 张卡、单词 9189 个"
    ]
  },
  {
    version: "2.2.1",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展：OCR 批次 809–816",
    scope: "教育 · 国际组织 · 阅读 · OCR",
    items: [
      "社会/教育线：新增老年人上大学与“老年助手”试点",
      "国情线：新增维也纳联合国城与国际形象",
      "补全 Altenhelfer、UNO-City、Erdstoß、Senior 词条",
      "文化/历史 179 条；文章 161 篇、短语 221 条、语法 73 张卡、单词 9192 个"
    ]
  },
  {
    version: "2.2.2",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展：OCR 批次 817–824",
    scope: "消费 · 马术 · 阅读 · OCR",
    items: [
      "社会/消费线：新增品牌殿堂与购物体验",
      "国情线：新增北威州马匹与霍赫莫尔动物医院",
      "阅读线：新增文章 Markentempel statt Modehaus 及译文",
      "补全 Markentempel、Einkaufserlebnis、Pferdeklinik、Reiten 词条",
      "文化/历史 181 条；文章 162 篇、短语 221 条、语法 73 张卡、单词 9196 个"
    ]
  },
  {
    version: "2.2.3",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展：OCR 批次 825–832",
    scope: "电影 · 医学伦理 · 阅读 · OCR",
    items: [
      "文化线：新增表演界与“正常生活”的张力",
      "科技/伦理线：新增疫苗研发、动物实验与组织培养",
      "补全 Schauspielwelt、Impfstoffentwicklung、Tierversuch、Gewebekultur 词条",
      "文化/历史 183 条；文章 162 篇、短语 221 条、语法 73 张卡、单词 9200 个"
    ]
  },
  {
    version: "2.2.4",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展：OCR 批次 833–840",
    scope: "能源 · 航空 · 阅读 · OCR",
    items: [
      "科技/能源线：新增“能源树”与利用温差供热",
      "探索线：新增皮卡尔环球气球飞行与急流",
      "补全 Energiebaum、Wärmegewinnung、Ballonfahrt、Jetstream 词条",
      "文化/历史 185 条；文章 162 篇、短语 221 条、语法 73 张卡、单词 9204 个"
    ]
  },
  {
    version: "2.2.5",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展：OCR 批次 841–848",
    scope: "数字生活 · 音乐交流 · 阅读 · OCR",
    items: [
      "语言/数字线：新增登录、退出、上传、转发等数字动词",
      "文化线：新增国际音乐节与寄宿家庭交流",
      "补全 einloggen、weiterleiten、Gastfamilie、Musikeraustausch 词条",
      "文化/历史 187 条；文章 162 篇、短语 221 条、语法 73 张卡、单词 9208 个"
    ]
  },
  {
    version: "2.2.6",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展：OCR 批次 849–856",
    scope: "媒介 · 社会参与 · 阅读 · OCR",
    items: [
      "媒介线：新增以事实、人物、观点为中心的三种访谈形式",
      "人物线：新增鲁尔区埃尔温神父与废铁救助",
      "补全 sachzentriert、Schrott、Lepra、Seelsorger 词条",
      "文化/历史 189 条；文章 162 篇、短语 221 条、语法 73 张卡、单词 9212 个"
    ]
  },
  {
    version: "2.2.7",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展：OCR 批次 857–864",
    scope: "欧债危机 · 健康 · 阅读 · OCR",
    items: [
      "历史/经济线：新增从银行危机到国家债务危机、欧元区改革压力",
      "健康线：新增缺铁、造血与铁的饮食来源",
      "补全 Staatsschuldenkrise、Wettbewerbsfähigkeit、Eisenmangel、Blutbildung 词条",
      "文化/历史 191 条；文章 162 篇、短语 221 条、语法 73 张卡、单词 9216 个"
    ]
  },
  {
    version: "2.2.8",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展：OCR 批次 865–872",
    scope: "魏玛史 · 跨文化 · 阅读 · OCR",
    items: [
      "历史线：新增魏玛共和国、1919年国民议会与旧精英",
      "跨文化线：新增西方媒体中的俄罗斯形象与偏见",
      "补全 Russlandbild、Vorurteil、Reichswehr、Nationalversammlung 词条",
      "文化/历史 193 条；文章 162 篇、短语 221 条、语法 73 张卡、单词 9219 个"
    ]
  },
  {
    version: "2.2.9",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展：OCR 批次 873–880",
    scope: "城市环境 · 企业创新 · 阅读 · OCR",
    items: [
      "城市/环境线：新增特内里费口香糖污染与清理成本",
      "经济线：新增大众汽车创意管理与员工奖励",
      "补全 Kaugummi、Ideenmanagement、Verbesserungsvorschlag、Betriebsrat 词条",
      "文化/历史 195 条；文章 162 篇、短语 221 条、语法 73 张卡、单词 9222 个"
    ]
  },
  {
    version: "2.2.10",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展：OCR 批次 881–888",
    scope: "发明 · 艺术史 · 阅读 · OCR",
    items: [
      "科技线：新增1946年硬性隐形眼镜与自我试验",
      "艺术线：新增米勒、杜米埃与法国现实主义",
      "补全 Sehhilfe、Karikatur、Holzschnitt、Lithographie 词条",
      "文化/历史 197 条；文章 162 篇、短语 221 条、语法 73 张卡、单词 9226 个"
    ]
  },
  {
    version: "2.2.11",
    date: "2026-10-25",
    type: "data",
    summary: "均衡扩展：OCR 批次 889–896",
    scope: "文学奖 · 中篇小说 · 阅读 · OCR",
    items: [
      "文学线：新增保罗·海泽、1910年诺贝尔文学奖与“猎鹰理论”",
      "文学史线：新增德语文学诺贝尔奖得主概览",
      "补全 Falkentheorie、Literaturnobelpreis、Novellentheorie、Übersetzer 词条",
      "文化/历史 199 条；文章 162 篇、短语 221 条、语法 73 张卡、单词 9230 个"
    ]
  },
  {
    version: "2.3.0",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 897–900 与第 900 批检查：英格林与翻译批评",
    scope: "文学 · 翻译 · 阅读 · 检查",
    items: [
      "完成 OCR 批次 801–900，共 100 批",
      "文化/历史页新增迈因拉德·英格林、直译与翻译批评，共 201 条",
      "补全 Fasnacht、Wörtlichkeit、Übersetzungskritik、Ausgangstext 词条",
      "第 900 批检查：文章 162/162 有译文，短语 221/221 有中文",
      "文章 162 篇、短语 221 条、语法 73 张卡、单词 9234 个",
      "OCR 已暂停，下次从第 901 批开始；检查点 900，下次检查点 950"
    ]
  },
  {
    version: "2.3.1",
    date: "2026-10-25",
    type: "feature",
    summary: "历史时间轴检索与形容词变位资料整合",
    scope: "检索 · 时间轴 · 语法 · 单词 · 短语 · 文章",
    items: [
      "历史与文化页新增历史时间轴，按古代、中世纪、近代早期、19世纪、战争与危机、分裂与冷战、当代筛选",
      "历史分类固定按年份升序排列，并显示时间轴节点与年份",
      "文化检索可与历史时期筛选组合使用",
      "重写“形容词词尾”语法卡：弱变化、混合变化、强变化、特殊词形与 6 道练习",
      "新增 edel、eitel、kariert、zuverlässig、großzügig、hilfsbereit 词条",
      "新增 6 条形容词搭配短语",
      "新增文章 Warum der rote Pullover rot bleibt 及译文",
      "文化/历史 199 条、文章 163 篇、短语 227 条、语法 73 张卡、单词 9238 个"
    ]
  },
  {
    version: "2.3.2",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 901–908：短篇小说世纪选集与家庭意识形态",
    scope: "文学 · 社会 · 阅读 · OCR",
    items: [
      "开启 OCR 批次 901–1000",
      "文化/历史页新增20世纪短篇小说编年、家庭作为教育机器，共 201 条",
      "补全 Kurzgeschichte、Anthologie、Erziehungsapparat、Produktionsprozess 词条",
      "文化/历史 201 条；文章 163 篇、短语 227 条、语法 73 张卡、单词 9242 个"
    ]
  },
  {
    version: "2.3.3",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 909–916：诗歌、内心独白与功能化",
    scope: "文学 · 叙事技巧 · 阅读 · OCR",
    items: [
      "文学线：新增诗歌作为抵抗功能化的“魔法物件”",
      "叙事线：新增内心独白、恐惧与不确定视角",
      "补全 Funktionalisierung、Erzählstimme、Innerer Monolog、Gegenstand 词条",
      "文化/历史 203 条；文章 163 篇、短语 227 条、语法 73 张卡、单词 9245 个"
    ]
  },
  {
    version: "2.3.4",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 917–924：里尔克与1900年前后的学校",
    scope: "文学 · 教育史 · 阅读 · OCR",
    items: [
      "人物线：新增里尔克与早期短篇《体操课》",
      "社会线：新增1900年前后学校日常、纪律与服从",
      "补全 Turnstunde、Erziehung、Schulbank、Disziplin 词条",
      "文化/历史 205 条；文章 163 篇、短语 227 条、语法 73 张卡、单词 9248 个"
    ]
  },
  {
    version: "2.3.5",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 925–932：鲁迅论外语学习",
    scope: "人物 · 语言学习 · 阅读 · OCR",
    items: [
      "人物线：新增鲁迅学习日语、德语与翻译实践",
      "学习法线：新增不间断学习、每日生词与阅读积累",
      "补全 Beharrlichkeit、Sprachlernen、Fremdsprachenunterricht、Wortschatz 词条",
      "文化/历史 207 条；文章 163 篇、短语 227 条、语法 73 张卡、单词 9251 个"
    ]
  },
  {
    version: "2.3.6",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 933–940：狮子亨利传说与百货商店",
    scope: "传说 · 城市消费 · 阅读 · OCR",
    items: [
      "传说线：新增狮子亨利与忠实狮子、布伦瑞克狮子",
      "社会线：新增百货商店、橱窗与顾客群",
      "补全 Löwe、Warenhaus、Schaufenster、Kundschaft 词条",
      "文化/历史 209 条；文章 163 篇、短语 227 条、语法 73 张卡、单词 9254 个"
    ]
  },
  {
    version: "2.3.7",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 941–948：吕贝克面包传说与日常面包文化",
    scope: "传说 · 饮食文化 · 阅读 · OCR",
    items: [
      "传说线：新增吕贝克面包传说、浪费面包的警告",
      "日常线：新增面包、长面包、酸面团与日常饮食文化",
      "补全 Sage、Brotverschwendung、Brotlaib、Warnung 词条",
      "文化/历史 211 条；文章 163 篇、短语 227 条、语法 73 张卡、单词 9256 个"
    ]
  },
  {
    version: "2.3.8",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 949–956：父子继承与 Ende/Schluss",
    scope: "家庭 · 词义辨析 · 阅读 · OCR",
    items: [
      "文学线：新增父子冲突、生意继承与遗产负担",
      "语言线：新增 Ende 与 Schluss 的语义差别",
      "补全 Erbe、Nachfolge、Vaterfigur、Schluss 词条",
      "文化/历史 213 条；文章 163 篇、短语 227 条、语法 73 张卡、单词 9259 个"
    ]
  },
  {
    version: "2.3.9",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 957–964：家族小说与 schaffen/erreichen",
    scope: "文学类型 · 动词辨析 · 阅读 · OCR",
    items: [
      "文学线：新增家族小说、数代人与社会变迁",
      "语言线：新增 schaffen 与 erreichen 的语义差别",
      "补全 Familienroman、Familiensaga、Niedergang、Erbfolge 词条",
      "文化/历史 215 条；文章 163 篇、短语 227 条、语法 73 张卡、单词 9263 个"
    ]
  },
  {
    version: "2.3.10",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 965–972：大城市贫困与身体惯用语",
    scope: "社会 · 惯用语 · 阅读 · OCR",
    items: [
      "社会线：新增大城市贫困、低工资、房租与食物压力",
      "语言线：新增含身体部位的德语惯用语",
      "补全 Redewendung、Körperteil、Elend、Nahrung 词条",
      "文化/历史 217 条；文章 163 篇、短语 227 条、语法 73 张卡、单词 9267 个"
    ]
  },
  {
    version: "2.3.11",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 973–980：战争夜岗与不定式结构",
    scope: "战争文学 · 语法 · 阅读 · OCR",
    items: [
      "文学线：新增战争夜岗、死亡鸟预兆与持续恐惧",
      "语法线：新增 hören/sehen/lassen/kommen + 不定式结构",
      "新增文章 Wenn ein Verb noch ein Verb mitbringt 及译文",
      "补全 Nachtwache、Todesvogel、Infinitiv、Kriegsnacht 词条",
      "文化/历史 219 条；文章 164 篇、短语 227 条、语法 73 张卡、单词 9271 个"
    ]
  },
  {
    version: "2.3.12",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 981–988：城市轨道与介词表达",
    scope: "城市文学 · 语法 · 阅读 · OCR",
    items: [
      "文学线：新增大城市轨道、工地、暮色与出发意象",
      "语言线：新增时间/地点/原因介词与雪天交通事故表达",
      "补全 Dämmerung、Schneeglätte、Schleudern、Verkehrsunfall 词条",
      "文化/历史 221 条；文章 164 篇、短语 227 条、语法 73 张卡、单词 9275 个"
    ]
  },
  {
    version: "2.4.0",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 989–1000 与第 1000 批检查：高空飞行与《丹东之死》",
    scope: "文学 · 戏剧 · 阅读 · 检查",
    items: [
      "完成 OCR 批次 901–1000，共 100 批",
      "文化/历史页新增高空飞行与缺氧体验、毕希纳与《丹东之死》，共 223 条",
      "补全 Höhenflug、Sauerstoffmangel、Tragödie、Jakobiner 词条",
      "第 1000 批检查：文章 164/164 有译文，短语 227/227 有中文",
      "文章 164 篇、短语 227 条、语法 73 张卡、单词 9279 个",
      "OCR 已暂停，下次从第 1001 批开始；检查点 1000，下次检查点 1050"
    ]
  },
  {
    version: "2.5.0",
    date: "2026-10-25",
    type: "feature",
    summary: "形容词词尾总表、词书变位/复数/例句与学习记录保护",
    scope: "语法 · 词书 · 例句 · 存储 · OCR",
    items: [
      "新增“形容词词尾总表”语法卡：弱/混合/强变化对照与 4 道练习",
      "从词书补充 Jude、Pfarrer、Bibel、Engel、Islam、Kloster 等名词及复数",
      "补充 beten 变位、herbstlich/schmerzlich/einzigartig 等形容词",
      "新增词书例句替换：仅替换文章例句或编号混乱的例句，并标注书名",
      "新增 schema 5 原样保留测试：主存储逐字不变，reviews/favorites/readArticles 保留",
      "开启 OCR 批次 1001–1008，优先词书类 PDF",
      "单词 9295、文化/历史 223、文章 164、短语 227、语法 74"
    ]
  },
  {
    version: "2.5.1",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 1009–1016：犯罪词书复数、变位与例句",
    scope: "词书 · 名词复数 · 动词变位 · OCR",
    items: [
      "继续优先词书类 PDF：超简单德语单词书、7000词、单词串串烧、词汇分类学习手册等",
      "新增 Anschlag、Terrorist、Vorgehen、Zugriff 等名词及复数",
      "新增 verhaften 变位（verhaftet, verhaftete, hat verhaftet）",
      "新增词书例句并标注来源：Anschlag auf den Politiker、Vorgehen der Polizei 等",
      "单词 9299、文化/历史 223、文章 164、短语 227、语法 74"
    ]
  },
  {
    version: "2.5.2",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 1017–1024：职业与活动词书复数/例句",
    scope: "词书 · 名词复数 · OCR",
    items: [
      "新增 Tätigkeit、Besonderheit、Teilnahme、Helfer 及复数",
      "例句标注词书来源：Veranstaltung、freiwillige Helfer、Teilnahme 等",
      "单词 9301、文化/历史 223、文章 164、短语 227、语法 74"
    ]
  },
  {
    version: "2.5.3",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 1025–1032：政治词书复数与例句",
    scope: "词书 · 政治词汇 · OCR",
    items: [
      "新增 Politiker、Präsident、Staat、Abstimmung 及复数",
      "例句标注词书来源：demokratischer Staat、Präsident zu Besuch、Abstimmung 等",
      "单词 9302、文化/历史 223、文章 164、短语 227、语法 74"
    ]
  },
  {
    version: "2.5.4",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 1033–1040：工具词书复数",
    scope: "词书 · 工具词汇 · OCR",
    items: [
      "新增 Bohrer、Feile、Hobel、Klemme 及复数",
      "继续使用词书中 `(m, -)`、`(f, -n)` 的复数标注方式",
      "单词 9305、文化/历史 223、文章 164、短语 227、语法 74"
    ]
  },
  {
    version: "2.5.5",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 1041–1048：饮料词书复数",
    scope: "词书 · 饮食词汇 · OCR",
    items: [
      "新增 Schnaps、Weinbrand 及复数",
      "按词书标注 `der Schnaps, ¨e`、`der Weinbrand, ¨e` 补入复数",
      "单词 9305、文化/历史 223、文章 164、短语 227、语法 74"
    ]
  },
  {
    version: "2.5.6",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 1049–1056：命令与指示词书复数/变位",
    scope: "词书 · 交际词汇 · OCR",
    items: [
      "新增 Anordnung、Anweisung、Aufforderung 及复数",
      "新增 beauftragen 变位（beauftragt, beauftragte, hat beauftragt）",
      "单词 9306、文化/历史 223、文章 164、短语 227、语法 74"
    ]
  },
  {
    version: "2.6.0",
    date: "2026-10-25",
    type: "feature",
    summary: "词性细分：其他拆为介词、连词、代词、副词、短语等",
    scope: "词库 · 词性筛选 · 数据质量",
    items: [
      "“其他”不再是大类：新增介词、连词、代词、数词、语气词、感叹词、短语细分",
      "能确认的形容词、动词、副词从“其他”迁出，按词形、词表与后缀判断",
      "单词库新增按词性筛选，可与等级、掌握度、搜索组合",
      "词条详情与表格显示细分词性",
      "其他/待细分从 1421 条降至 557 条",
      "新增词性筛选自动测试：介词 33 条全部匹配"
    ]
  },
  {
    version: "2.6.1",
    date: "2026-10-25",
    type: "data",
    summary: "新增 100 轮启动与 OCR 1057–1064：丧葬词书复数",
    scope: "词书 · 名词复数 · OCR",
    items: [
      "新增 100 轮：批次 1057–1156，第 1156 批检查后暂停",
      "新增 Sarg、Beerdigung、Testament 及复数",
      "单词 9309、文化/历史 223、文章 164、短语 227、语法 74"
    ]
  },
  {
    version: "2.6.2",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 1065–1072：工作与休闲词书形容词/变位",
    scope: "词书 · 形容词 · 动词 · OCR",
    items: [
      "新增 ehrgeizig、anstrengend 及比较级",
      "新增 pressieren 变位（pressiert, pressierte, hat pressiert）",
      "单词 9310、文化/历史 223、文章 164、短语 227、语法 74"
    ]
  },
  {
    version: "2.6.3",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 1073–1080：时间与评价形容词",
    scope: "词书 · 形容词 · OCR",
    items: [
      "新增 zeitig、frühzeitig、verspätet、beständig、vornehm、schmackhaft",
      "补充比较级并标注词书来源",
      "单词 9316、文化/历史 223、文章 164、短语 227、语法 74"
    ]
  },
  {
    version: "2.6.4",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 1081–1088：距离与长度词书补充",
    scope: "词书 · 名词 · OCR",
    items: [
      "新增 Länge 并核对 Fundbüro、Zeichen、Entfernung、Strecke 等既有词条",
      "继续以词书页面为主，跳过纯目录/前言页",
      "单词 9316、文化/历史 223、文章 164、短语 227、语法 74"
    ]
  },
  {
    version: "2.6.5",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 1089–1096：动词变位与名词复数",
    scope: "词书 · 动词 · 名词 · OCR",
    items: [
      "新增 verbrennen、anstecken 变位",
      "新增 Anstalt、Anstand 及复数/无复数标注",
      "新增 anständig、anstatt",
      "单词 9322、文化/历史 223、文章 164、短语 227、语法 74"
    ]
  },
  {
    version: "2.6.6",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 1097–1104：flüchten/flüstern 变位",
    scope: "词书 · 动词 · OCR",
    items: [
      "新增 flüchten（flüchtet, flüchtete, ist geflüchtet）",
      "新增 flüstern（flüstert, flüsterte, hat geflüstert）",
      "单词 9323、文化/历史 223、文章 164、短语 227、语法 74"
    ]
  },
  {
    version: "2.6.7",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 1105–1112：词典式名词复数",
    scope: "词书 · 名词 · OCR",
    items: [
      "新增 Attest（das; -, -e → die Atteste）",
      "核对 Ehe、Ehepaar、ledig、geschieden、scheiden 等婚姻词汇",
      "单词 9324、文化/历史 223、文章 164、短语 227、语法 74"
    ]
  },
  {
    version: "2.6.8",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 1113–1120：Besen 复数与 besiegen 变位",
    scope: "词书 · 名词 · 动词 · OCR",
    items: [
      "新增 Besen（der; -s, - → die Besen）",
      "新增 besiegen（besiegt, besiegte, hat besiegt）",
      "新增 Besitz（der; -es, o. Pl. → 无复数）",
      "单词 9326、文化/历史 223、文章 164、短语 227、语法 74"
    ]
  },
  {
    version: "2.6.9",
    date: "2026-10-25",
    type: "data",
    summary: "辞书相关内容统计：派生词、反义词与固定搭配",
    scope: "辞书 · 相关词 · 统计",
    items: [
      "为词书词条新增 related 字段：派生词、近反义词、固定搭配、用法",
      "已录入 9 个词条的相关内容，共 12 项",
      "module-gaps 新增辞书相关内容统计：来源词条 1832、词书例句 44",
      "说明：related 覆盖率仍低，后续每批继续补"
    ]
  },
  {
    version: "2.6.10",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 1121–1128：durchschauen/unerreichbar 与相关词",
    scope: "辞书 · 动词 · 形容词 · 相关词",
    items: [
      "新增 durchschauen（durchschaut, durchschaute, hat durchschaut）",
      "新增 unerreichbar 及反义词 erreichbar",
      "辞书相关内容增至 11 个词条、15 项",
      "单词 9328、辞书来源 1834、词书例句 46"
    ]
  },
  {
    version: "2.6.11",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 1129–1136：Ertrag/erwachen 与搭配",
    scope: "辞书 · 名词 · 动词 · 相关词",
    items: [
      "新增 Ertrag（die Erträge）与搭配 hohe Erträge erzielen",
      "新增 erwachen（erwacht, erwachte, ist erwacht）",
      "辞书相关内容增至 13 个词条、18 项",
      "单词 9330、辞书来源 1836、词书例句 48"
    ]
  },
  {
    version: "2.6.12",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 1137–1144：gehorchen/Geige/Geisel",
    scope: "辞书 · 动词 · 名词 · 相关词",
    items: [
      "新增 gehorchen（gehorcht, gehorchte, hat gehorcht）",
      "新增 gehörig、gehorsam 及搭配 sich gehörig entschuldigen",
      "新增 Geige、Geisel 及复数",
      "辞书相关内容增至 14 个词条、19 项",
      "单词 9333、辞书来源 1839、词书例句 51"
    ]
  },
  {
    version: "2.6.13",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 1145–1152：Holzbau/homogen/Honorar/horchen",
    scope: "辞书 · 名词 · 形容词 · 动词",
    items: [
      "新增 Holzbau、Homosexualität、Honorar 及复数",
      "新增 homogen（homogener, am homogensten）",
      "新增 horchen（horcht, horchte, hat gehorcht）与搭配",
      "辞书相关内容增至 16 个词条、22 项",
      "单词 9338、辞书来源 1844、词书例句 56"
    ]
  },
  {
    version: "2.6.14",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 1153–1160：korrupt/Kosmonaut/Kost",
    scope: "辞书 · 形容词 · 名词 · 相关词",
    items: [
      "新增 korrupt 及派生词 Korruption",
      "新增 Kosmonaut（die Kosmonauten）、Kosmos",
      "新增 Kost 及搭配 jmdn. in Kost nehmen",
      "辞书相关内容增至 18 个词条、25 项",
      "单词 9342、辞书来源 1848、词书例句 60"
    ]
  },
  {
    version: "2.6.15",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 1161–1168：plaudern/pleite/plombieren",
    scope: "辞书 · 动词 · 形容词 · 名词",
    items: [
      "新增 plaudern（plaudert, plauderte, hat geplaudert）",
      "新增 pleite 与派生 Pleite（die Pleiten）",
      "新增 plombieren（plombiert, plombierte, hat plombiert）",
      "新增 plus 及例句 Fünf plus drei ist acht",
      "辞书相关内容增至 22 个词条、31 项",
      "单词 9347、辞书来源 1853、词书例句 65"
    ]
  },
  {
    version: "2.6.16",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 1169–1176：大学学习相关名词",
    scope: "辞书 · 名词 · 相关词",
    items: [
      "新增 Studentenheim、Studienjahr、Studienplatz 及复数",
      "新增搭配 sich um einen Studienplatz bewerben",
      "辞书相关内容增至 23 个词条、32 项",
      "单词 9350、辞书来源 1856、词书例句 68"
    ]
  },
  {
    version: "2.6.17",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 1177–1184：Wurm/Wurzel/zäh",
    scope: "辞书 · 名词 · 形容词 · 相关词",
    items: [
      "新增 Wurm（die Würmer）、Wurzel（die Wurzeln）",
      "新增 zäh（zäher, am zähsten）及搭配 zäher Widerstand",
      "辞书相关内容增至 24 个词条、34 项",
      "单词 9352、辞书来源 1858、词书例句 70"
    ]
  },
  {
    version: "2.6.18",
    date: "2026-10-25",
    type: "data",
    summary: "OCR 批次 1185–1192：Vorwand/wachen",
    scope: "辞书 · 名词 · 动词 · 相关词",
    items: [
      "新增 Vorwand（die Vorwände）与搭配 unter einem Vorwand",
      "新增 wachen（wacht, wachte, hat gewacht）",
      "辞书相关内容增至 26 个词条、38 项",
      "单词 9354、辞书来源 1860、词书例句 72"
    ]
  },
  {
    version: "2.7.0",
    date: "2026-10-25",
    type: "data",
    summary: "完成 OCR 1200 批与第 1200 批检查",
    scope: "OCR · 辞书 · 检查 · 暂停",
    items: [
      "完成 OCR 批次 1073–1200，累计 1200 批",
      "词书路线贯穿 1073–1200，补齐复数、变位、例句与相关词",
      "辞书相关内容 26 个词条、38 项；词书例句 72",
      "第 1200 批检查：文章 164/164、短语 227/227、OCR 词条 3283 释义 0 缺失",
      "单词 9354、文化/历史 223、语法 74",
      "已暂停，继续时从第 1201 批开始"
    ]
  }
];


