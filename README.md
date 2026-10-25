# Wortkarte · 德语词卡

一个纯静态的德语单词与短语学习网页，包含间隔重复、主动回忆、听力朗读、选择测验、语法地图、历史文化和短语背诵。

- **9,595 个德语词**：教材词表、歌德 A1–C2 分级词条与 OCR 词包合并去重
- **272 条短语**：按 A / B / C 难度排序，首页可直接进入短语背诵
- **7,000+ 词条发音**：使用浏览器 `SpeechSynthesis` 的 `de-DE` 语音
- **离线可用**：Service Worker 缓存页面，可添加到手机主屏幕
- **学习记录本地保存**：数据只写入浏览器 `localStorage`，没有账号和后端

## 直接部署

这是 GitHub Pages 的根目录站点，`index.html` 已经位于压缩包顶层。

1. 新建仓库并把压缩包内的文件上传到仓库根目录
2. Settings → Pages → Deploy from a branch → `main` / `/(root)`
3. 等待 1–3 分钟，访问 `https://你的用户名.github.io/仓库名/`

详细步骤见 [DEPLOY.md](DEPLOY.md)。命令行部署：

```bash
git init
git add .
git commit -m "Deploy Wortkarte"
git branch -M main
git remote add origin https://github.com/你的用户名/wortkarte.git
git push -u origin main
```

## 本地打开

直接双击 `index.html` 即可；也可以在目录内启动任意静态服务器：

```bash
python -m http.server 8080
```

然后打开 <http://localhost:8080>。

## 数据与隐私

- 学习进度、复习排期、收藏和设置都保存在当前浏览器的 `localStorage`。
- 仓库里的静态文件不包含个人学习记录。
- 更新页面不会清空同一域名下的旧记录；应用在读取旧数据前会先做备份。
- 词表内容仅用于个人学习，请勿公开再分发教材词表。

## 目录

| 文件 | 作用 |
|---|---|
| `index.html` | 页面骨架 |
| `styles.css` | 界面样式 |
| `app.js` | 状态、复习、测验、词库、短语背诵 |
| `*-pack.js` / `*-fixes.js` | 词表、语法、文化与修正数据 |
| `vocab-calibration.js` | 词条校准层，可按 id 回滚 |
| `sw.js` | Service Worker 离线缓存 |
| `manifest.webmanifest` | PWA 主屏幕配置 |
| `DEPLOY.md` | GitHub Pages 部署说明 |
| `DATA-SOURCES.md` | 数据来源与许可说明 |
