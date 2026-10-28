# Wortkarte · 德语词卡

一个可以直接打开的德语单词背诵与复习网页。它把 **间隔重复、主动回忆、听力朗读、选择测验、语法地图和进度统计** 放在同一个安静的编辑式界面里，所有学习记录保存在浏览器本地。

当前版本已把用户提供的两册《新求精德语强化教程》词汇练习册与《德语单词总表_歌德分级A1-C2》合并进同一个词库，并加入 OCR 4500 批次提取内容，去重后 **11951 个德语词**（源表 7507），首次打开即全部可用。

![Wortkarte 首页](preview-home.png)

## 功能

- **12620 个可用德语词**：以教材词表与歌德 A1–C2 分级词条为主，合并 OCR 词包后按「单词 + 冠词」自动去重。
- **词库校准层**：按词条 id 修复畸形导入、冠词 / 复数 / 词性与混入释义，保留原值，可逐条回滚；详见 `verify/vocab-calibration.md`。
- **教材词表**：首页「新求精词汇」主题卡，按 A1 / 初级2 标记；保留词性、冠词、等级、复数 / 变位。
- **歌德 A1–C2 词表**：661 个 A1、718 个 A2、1429 个 B1、2097 个 B2、2111 个 C1 词条；C2 无单独词表，由 C1 高阶词覆盖。
- **语法地图**：17 个原创语法主题，按 A1 基础 / A2 进阶分组；另设 OCR 拓展的发音、动词、词法、句法与构词分组，共 74 张语法卡。
- **自评起点 + 三形式实测**：首次学习用 0–5 自评；之后轮流考察德译中、中译德、单词拼写，三种都通过才提高掌握度；连续答错两次才降一级，前三级拼写错误不作为降级条件。
- **复习日历**：月历标记每个到期日，可导出带 `VALARM` 提醒和时区的 `.ics` 文件，导入手机系统日历。
- **每周小测**：每周从已学词中生成 4 / 8 / 12 题，可跳过且不影响复习进度；使用独立 `quiz_current / quiz_history` 键。
- **今日回顾**：当天复习过的词可额外回顾最多 2 次，只更新错题与回顾日志，不改变 SM-2 排期。
- **页面内提醒**：设置固定提醒时间；页面打开或停留时检查到期数量并弹出考察提醒（纯静态 PWA 无法后台精确唤醒）。
- **更新日志**：设置 → 更新日志；每 100 个 OCR 批次合并为一条，重点记录页面与功能变化，详细旧记录保留在 `changelog-archive.js`。
- **变位折叠**：动词、形容词词卡内的 `<details>` 折叠表格展示现在时人称变位、词形或比较级 / 最高级；名词卡同时显示复数形式与变化类型（-e、-en、-er、-s、变音、词尾不变）。
- **词条修正层**：`data-fixes.js` 对已知错译、词形拼写和截断释义做覆盖修正，并在去重时合并官方词表中的例句。
- **历史与文化**：历史线与人物时间轴、日常文化、人物卡片，以及可点击的德国及周边互动地图；地图支持鼠标滚轮、双击、按钮和触屏双指缩放/单指拖动，并绘制德国 16 个联邦州的州界线；内部按历史、文化、地图、人物分组，文化再按主题筛选，每条保留来源链接和可信度；只读，不进入词库或 localStorage。
- **四入口导航**：主页与侧栏统一为「历史与文化 / 文章阅读 / 短语积累 / 单词积累」，词库功能并入单词积累。
- **文章阅读**：4 篇完整文章，保留来源/出处；按 CEFR 词级占比自动分级，附读后练习。
- **短语积累**：266 条问候、课堂、出行、交流与生活短语，按 A/B/C 难度排序，支持搜索、场景筛选、题库练习，以及首页的 A/B/C 短语背诵模式。
- **今日已学**：首页统计卡可点击，按掌握度列出今天学过的单词，点任意一行打开完整词卡。
- **题库**：单词、短语、语法、文章四类题目，可选内容、题型与难度，完成后显示逐题答案、解析和得分。
- **内容导入**：支持文本/JSON 上传，单词/短语/语法/文章自动分发到对应页面；失败重试 1 次后标记失败并终止。
- **词形搜索**：德语搜索支持变格、变位、词根、变音（ue/ü）与轻量模糊匹配。
- **设置**：学习 / 外观 / 小测 / 学习提醒 / 数据 / 关于六组；5 套主题、自定义主色、每日 5–100 词上限、小测难度、每周小测、提醒时间、回顾间隔、个性化推荐；写入 `wortkarte.v2` 并同步 `settings_v2`，切换实时生效。
- **更新总结**：`changelog-summary.js` 由脚本聚合类型计数与三条要点，设置内更新日志顶部只读展示。
- **图书馆资源**：设置 → 关于 → 图书馆德语资源，列出同济大学图书馆、德文图书馆、荐购、馆藏目录、数据库、文献传递、PQDT 与馆长信箱；只登记官方渠道，不自动抓取。
- **PWA 图标**：192 / 512 / maskable 512 / apple-touch / favicon 32/16；Service Worker 缓存 v148。
- **质量审计**：`verify/quality_check.js` 输出计数一致性、错译残留、乱码、串台拆分和例句成对性报告；最近结果见 `quality-report.json`。
- **翻转卡片**：正面只看德语，点击或按 `Space` 揭晓中文释义、复数 / 变位和来源；没有例句的词会自动隐藏例句区。
- **发音**：使用浏览器 `SpeechSynthesis` 的 `de-DE` 语音朗读单词，无需外部音频文件。
- **四种词汇测验**：德语 → 中文、中文 → 德语、`der / die / das` 冠词、听音辨词；每周小测还会混合例句挖空与动词变位。
- **词库**：搜索德语、中文、例句；按 A1–C2、学习状态、到期时间筛选；词库列表每页 80 条，可继续加载；可添加自己的词卡。
- **四档筛选与单词背诵**：单词页「未掌握 / 遗忘 / 较生疏 / 熟练」可点击筛选；「背诵本组」打开单词背诵模式，支持状态切换、显示释义/词形/例句、空格揭晓、方向键切换。
- **进度面板**：掌握分布、等级进度、未来 7 天复习预测、8 周热力图、复习日历、最容易遗忘的词。
- **本地优先**：`localStorage` 保存进度（键名保持 `wortkarte.v2`）；页面更新只在内存归一化，不在加载时重写主记录。旧 schema 首次加载先备份，备份保留 20 个；主键缺失时从 `last-good` 或最新有效备份恢复。只有用户主动操作才写回新字段，原 `due / mastery / reps / lapses / 收藏 / 阅读记录` 保留。设置里支持 JSON 导出 / 导入、修改每日目标、重置进度。
- **响应式 / PWA**：桌面侧栏、平板、手机底部五项导航；部署到 HTTPS 后可安装到主屏幕并离线使用。
- **键盘操作**：考察中 `1`–`4` 选择答案，`Enter` 查看词卡；翻卡后 `1`–`4` 评价，`Esc` 结束，`Ctrl/⌘ + K` 搜索。

## 手机使用

### 方式一：单文件（最省事）

把根目录的 `wortkarte-mobile.html` 发到手机，用 Chrome / Edge / Safari 打开。所有 HTML、CSS、词表和 JavaScript 已内联，不需要联网加载程序。

### 方式二：PWA / 静态托管（推荐长期使用）

使用 `wortkarte-mobile.zip`，解压后把整个文件夹部署到 GitHub Pages、Netlify、Cloudflare Pages 等静态托管，或在本机运行：

```bash
python -m http.server 8080 --bind 0.0.0.0
```

然后手机访问电脑局域网地址（例如 `http://192.168.1.20:8080`）。在浏览器菜单中选择「安装应用」/「添加到主屏幕」。Service Worker 会缓存页面，之后可离线打开。

详细步骤见 [README-MOBILE.md](README-MOBILE.md)。

### 方式三：GitHub Pages（电脑与手机共用）

使用 [wortkarte-github-pages.zip](wortkarte-github-pages.zip)，解压后把**文件内容**上传到 GitHub 仓库根目录，再在仓库 Settings → Pages 中选择 `main` / `/(root)`。

- 压缩包根目录直接包含 `index.html`、`.nojekyll` 和全部静态资源，不会多套一层文件夹。
- 部署后地址类似 `https://用户名.github.io/wortkarte/`，手机和电脑都可访问。
- 已按 GitHub Pages 子路径测试：相对路径、PWA scope、Service Worker 离线缓存均正常。
- 详细步骤见 [README-GITHUB-PAGES.md](README-GITHUB-PAGES.md)。

## 快速开始（电脑）

```bash
python -m http.server 8080
```

打开 <http://localhost:8080>。也可以直接双击 `index.html`。

## 本地 OCR（免费方案）

已配置 **Tesseract 5.4 + deu / chi_sim / eng** 语言包，使用 PyMuPDF 渲染 PDF 页面，脚本在 `tools/ocr_pdf.py`。

```bash
python tools/ocr_pdf.py "教材.pdf" "source-materials/ocr/教材.txt" --pages 1-20
# 或整本：--all
```

- 每页结果缓存到 `source-materials/ocr-cache/`，可断点续跑
- A1/A2 学生用书已有文本层，不需要 OCR
- 新编 4、学习指南、词汇练习、阅读训练是扫描件，需 OCR
- 中文 OCR 仍会有空格和个别误识，导入前需要人工复核

## 已跑 OCR 批次

批次进度记录在 `source-materials/ocr-books/batch-state.json`，每批 3–4 本、约 80–130 页。

当前进度：

- 已完成：批次 16
- 下一批：批次 17
- 第 20 批后暂停，等待确认后继续
- 每 10 批提醒一次

内容状态：

- 文章 20 篇
- 短语 131 条
- 语法 34 张卡
- 单词 7933 个
- OCR 词汇候选 1191 条

文章详情页新增 **AI 中文译文**，全部 20 篇文章都有译文；短语与单词均带中文翻译。

## 文件结构

```
index.html            页面结构、导航、PWA 注册与内联 SVG 图标
styles.css            视觉系统、卡片翻转、语法视图与响应式布局
data.js               70 个精编词条、六个主题与教材主题
textbook-pack.js      1145 个《新求精》教材词条
dictionary-pack.js    7016 个歌德 A1–C2 分级词条（带中文释义）
grammar.js            16 个原创语法主题与 32 道练习
grammar-summary.js    从参考 DOCX 生成的完整语法总结（18 章 / 36 张表）
data-fixes.js         已知词条错译、拼写与截断修正，以及黑名单
article-fixes.js      从 Goethe A1 元数据补全的名词冠词
noun-fixes.js         从 A1/A2 教材 Wortschatz 表补全的冠词与复数
guide-fixes.js        从新编大学德语1/2学习指南 OCR 提取的冠词与复数
guide-examples.js     从学习指南 OCR 提取的 429 组德中例句
verbformen-fixes.js   从 Verbformen 开放数据补全的冠词/复数（CC BY-SA 4.0）
glossar-fixes.js      从新编大学德语4 Glossar OCR 提取的复数
wiktionary-fixes.js   从德语 Wiktionary 补全的冠词/复数（CC BY-SA）
tatoeba-examples.js   从 Tatoeba 提取的德中例句（CC BY 2.0 FR）
changelog.js          只读更新日志（数据 / 功能 / 教材源）
changelog-summary.js  只读更新总结（类型计数与要点）
culture.js            德国历史、日常文化、联邦州与人物卡片
articles.js           文章阅读库（公版文本 + 原创学习文本）
article-questions.js  文章理解题与解析
phrases.js            30 条常用德语短语
ocr-content.js        首批 OCR 文章、短语、词汇与语法卡
ocr-vocab-words.js    121 条 OCR 词汇候选
verify/quality_check.js 词库质量审计脚本（计数、错译残留、乱码、例句成对性）
quality-report.json   最近一次质量审计结果
verify/acceptance-report.md  R-01～R-22 验收状态与数据缺口
.github/workflows/quality.yml  CI 自动运行质量审计并上传报告
app.js                状态管理、考察/复习界面、测验、词库、语法、统计
review-engine.js      纯函数复习引擎：0–5 自评起点、三形式实测、降难度、间隔
manifest.webmanifest  PWA 清单
sw.js                 Service Worker 离线缓存
icons/                主屏幕图标
wortkarte-mobile.html 单文件手机版
wortkarte-mobile.zip  完整手机包（含 PWA 与单文件版）
wortkarte-github-pages.zip  GitHub Pages 静态站点包（根目录直接上传）
github-pages/         GitHub Pages 站点文件（含 .nojekyll）
README-GITHUB-PAGES.md  GitHub Pages 部署说明
README-MOBILE.md      手机安装与离线使用说明
textbook-registry.json 教材源登记表（含本轮待 OCR 的 10 个 PDF）
source-materials/     教材表格、语法 DOCX、词表 XLSX 与 Spec（不参与页面运行）
tools/                词表构建、OCR、质量审计脚本与缓存（不参与页面运行）
source-materials/     教材表格/文本提取中间文件（不含原始 PDF）
```

## 词汇来源与初始化

### 两册教材

- **《新求精德语强化教程》词汇练习册 初级 A1**：教材文本中的德语词头与现有歌德 A1 中文词表交叉匹配，得到 **324 个**带中文释义的词条。
- **《新求精德语强化教程（第 4 版）》词汇练习册 初级2**：用 Word 打开 PDF 后按两列表格提取「德语 | 中文」，清洗后保留 **821 个**词条。
- 教材合计 1145 个词条；与 70 个精编词去重后，基础词库为 1213 个词。
- 教材词条保留来源信息：`source`、`book`、`sourceRef` 和 `translationSource`，可在词卡详情中查看。
- 教材不提供每词例句，因此这些词条的例句为空；词卡会自动隐藏例句区。

### 歌德 A1–C2 分级词表

- 词条、词性、冠词与中文释义来自用户提供的《德语单词总表_歌德分级A1-C2.xlsx》，共 8270 行原始记录。
- 清洗掉重复、残片和空释义后保留 **7016 个**词条：A1 661、A2 718、B1 1429、B2 2097、C1 2111。
- A1 / A2 / B1 依据歌德官方 Wortliste；B2 使用 Klett《Aspekte neu B2》备考词表；C1 使用 Praxis《Werkstatt C1》词表。原表没有单独列 C2，C1 高阶词覆盖 C2 需求。
- 这些词条作为基础词库直接加载，不写入 `localStorage`；与教材/精编词重复的 722 个按「单词 + 冠词」跳过，最终可用词库为 **7542 个词**。
- 词库右上角的「官方词表」和设置中的「管理词表」可查看各等级覆盖。
- 重新生成：`python tools/build_goethe_pack.py`（读取 `source-materials/goethe-a1-c2.xlsx`）。
- 歌德词表 © Goethe-Institut；B2 / C1 教材词表版权归原出版社所有。仅用于个人学习，请勿再分发。

### 新教材登记

- 用户提供的《新求精德语 A1/A2》学生用书、《新编大学德语》1–4 册、阅读训练与词汇练习共 10 个 PDF 已登记到 `textbook-registry.json`。
- 本轮只完成可确定的数据修正；除已导入的新求精词汇练习册外，其余 PDF 多为扫描件/OCR 版，尚未逐册抽取词表与例句，状态标记为 `registered-pending-ocr`，没有用猜测数据填充。
- 后续按登记表逐册抽取后，再按「教材 > 外部源」优先级补冠词、复数、例句与中译。

### 初始化

- 学习状态使用新的 `localStorage` 键：**`wortkarte.v2`**。旧的演示档案不会带入。
- 首次打开是全新档案：0 次复习、0 天连续学习、0 个已掌握词，7542 个词都处于「新词」状态。
- 首页每日计划优先安排 A1 词，再逐步进入 A2 / 初级2 词汇。
- 设置 → 重置进度会清空学习记录，但保留自定义词卡与已合并的官方词表。

## 语法地图

语法内容为原创整理，和两册教材的语法主题对应，不复制教材原文。页面上方还提供用户提供的《德语语法总结》完整阅读版：**18 章、36 张表格**，包含发音、名词、格、形容词、代词、动词时态、语序、介词、副词与数词、连词、限定词、常见错误、学习路径与附录。

![完整语法总结阅读版](preview-grammar.png)

包含：

| 阶段 | 主题 |
| --- | --- |
| A1 基础 | 动词现在时、名词性别与冠词、四格、复数、语序、情态动词、可分动词、完成时、否定与疑问 |
| 初级2 进阶 | 反身动词、过去时、被动语态、关系从句、虚拟式 II、形容词词尾、介词与格 |

每张语法卡包含 2–3 个要点、德语例句与中文解释、必要的变格/变位表，以及 2 道选择题。打开过的主题会标记「已读」，答对的练习会保存在 `state.grammar.correct` 中。

## 学习算法

复习调度集中在 `review-engine.js`，`app.js` 只负责界面与持久化。每个词记录：

- `userLevel`：首次学习自评 0–5，作为起始掌握等级；不会自动改动
- `testedLevels`：德译中 / 中译德 / 拼写是否已通过
- `lastTested`：三种形式各自最近一次考察时间
- `level`：从 `userLevel` 起步，按三形式结果逐级提高或降低
- `nextReview`、`streak`、`lastPenalty`

首次学习只显示词卡和 0–5 自评，不进入考察。第二次起按“最久没考”优先轮流出现：

1. 德译中：看德语选中文
2. 中译德：看中文选德语
3. 单词拼写：看中文写出德语；名词必须带定冠词 `der/die/das`；`ä/ö/ü/ß` 可写作 `ae/oe/ue/ss`，忽略大小写与首尾空格

三种形式全部通过时，`level + 1`，并开启下一轮三形式考核；答错会重置三种形式状态并在 10 分钟后重推，**连续答错两次才降一级**。前三级（level 0–3）的拼写错误只重置状态，不作为降级条件；四级以上拼写错误仍可累计。`userLevel` 始终保留为最初自评起点，不会因为答对自动抬高；`level` 可以高于最初的 `userLevel`，由后续作答逐级解锁。自评 5 分但拼写一直错，level 不会变高。

间隔：`0 / 5 分钟 / 1 小时 / 1 天 / 3 天 / 7 天`；level 5 且连续两轮三形式全通过后延长到 15 天。

卡片页有「降低考察难度」按钮，只能逐级降低 `userLevel`，不能手动调高；降低后当前考察立即切回德译中。

旧 `schemaVersion: 5` 记录不会在加载时重写：原 `due / mastery / last / interval / 统计` 保留，缺少的新字段在内存中补默认值，下一次用户操作才持久化。旧 `mastered` 记录按三形式“已通过”保守继承，避免升级后已掌握词被直接降档。

## 数据与授权

- 教材词条来自用户提供的两册 PDF，仅用于本机个人学习；`textbook-pack.js` 和 `source-materials/` 中的提取结果**请勿再分发**。
- 歌德 A1–C1 词表 © Goethe-Institut；B2 / C1 教材词表版权归原出版社所有；中文释义来自用户提供的 Excel 总表。
- 70 个精编词条和 16 个语法主题为本项目原创整理。
- 本项目没有使用 Duden 的词典数据；Duden 的官方 API 只提供付费的拼写/语法校对，不提供可批量导入的词条。

## GitHub 调研与设计借鉴

实现前检索了 GitHub 上的德语词汇、间隔重复和词表项目。以下仓库主要影响了功能取舍和视觉结构，**没有直接复制其代码或词表**：

| 仓库 | 借鉴点 |
| --- | --- |
| [mmatas1300/die-Wortschatzkartei](https://github.com/mmatas1300/die-Wortschatzkartei) | 德语词卡 + 间隔重复的网页形态，自定义卡片与学习记录 |
| [blackhebrewisraeli/Sprachschule-app](https://github.com/blackhebrewisraeli/Sprachschule-app) | PWA 学习路径、Leitner 复习、进度仪表盘的组织方式 |
| [hasharmujahid/deutsch-karten](https://github.com/hasharmujahid/deutsch-karten) | A1–C2 词表按等级 / 频率组织，以及音频 + 复习的产品思路 |
| [awesome-german/vocabulary](https://github.com/awesome-german/vocabulary) | 主题词表、搭配、例句和词族的资源分类（CC-BY-4.0） |
| [Jonny-exe/German-Words-Library](https://github.com/Jonny-exe/German-Words-Library) | 大规模德语 JSON 词库的结构参考（GPL-3.0，未复制数据） |
| [bahman-farhadian/tartarus](https://github.com/bahman-farhadian/tartarus) | 自托管词汇训练器的 CEFR 分级与「完整句子练习」思路 |
| [doYouSpeakFish/VocabVocabGerman](https://github.com/doYouSpeakFish/VocabVocabGerman) | 通过例句而不是孤立翻译来记忆德语词 |

## 数据来源与许可

- 歌德分级词表来自用户提供的 `goethe-a1-c2.xlsx`。
- 教材词条来自用户提供的教材；扫描页仅做个人学习用途的 OCR。
- 名词变格/复数中的部分数据来自 [Verbformen](https://zh.verbformen.net/)，遵循 **CC BY-SA 4.0**，来源 URL 保留在 `verbformen-fixes.js`。
- 部分冠词/复数来自 [德语 Wiktionary](https://de.wiktionary.org/)，遵循 **CC BY-SA**，来源 URL 保留在 `wiktionary-fixes.js`。
- 德中例句来自 [Tatoeba](https://tatoeba.org/)，遵循 **CC BY 2.0 FR**，来源保留在 `tatoeba-examples.js`。
- 德语助手（godic.net）页面内容版权归欧路软件；`robots.txt` 明确禁止多个 AI 爬虫，因此**没有做整站批量抓取**，只把它作为人工核对参考。
- Linguee（linguee.de）的 `robots.txt` 对 `User-agent: *` 设置为 `Disallow: /`，且条款禁止复制/训练用途，因此**没有接入自动抓取**。
- 中文 OCR 结果可能存在空格和误字，导入前需要抽查。

## 已知限制

- 教材词表由 PDF 表格/文本自动提取，个别 OCR 词形、复数或中文释义可能仍有偏差；建议在词卡详情中核对来源。
- 歌德 A1–C2 总表来自用户 Excel；词性、变化形式由原表版式自动判定，个别条目可能存在词形或词性偏差。C2 没有单独词表，由 C1 高阶词覆盖。
- 总表只有 3879 条德语例句，且只有 2049 条中文例句翻译；教材词条大多没有例句。词卡会隐藏空例句区，这部分内容仍待人工补充。
- 质量审计仍报告 48 个名词缺冠词、963 个名词缺复数；未用猜测值强行填满。
- 变位表优先使用词表提供的 `forms`；缺失时按规则推出现在时，可能有个别强变化动词不准确，需以词典核对。
- `data-fixes.js` 已修正规格中确认的错误词条，但 7542 条可用词表尚未逐条人工审校；自动抽取仍可能有残留错译。
- 语音质量取决于操作系统与浏览器是否安装了德语语音包。
- 没有账号与云同步；换设备请使用设置中的 JSON 导出 / 导入。
- 测验答错会记入「需要多看几眼」，但不会直接改写间隔重复的到期时间。

---

用 [Fraunces](https://fonts.google.com/specimen/Fraunces) 与 [Manrope](https://fonts.google.com/specimen/Manrope) 做字体气质，其余部分尽量保持原生、轻量。




























