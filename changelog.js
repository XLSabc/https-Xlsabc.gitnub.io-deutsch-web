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
  }
];

