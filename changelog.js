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
  }
];


