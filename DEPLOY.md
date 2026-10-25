# 部署到 GitHub Pages

这个目录是一份纯静态站点，不需要 Node.js、构建步骤或后端服务。上传后 GitHub Pages 会直接托管 `index.html`。

## 方式一：网页上传（最简单）

1. 在 GitHub 新建一个仓库，例如 `wortkarte`。
2. 解压 `wortkarte-github-pages.zip`。
3. 把解压出来的**文件内容**上传到仓库根目录，确保根目录直接有 `index.html`、`styles.css`、`app.js` 等文件（不要再套一层文件夹）。
4. 仓库 **Settings → Pages**：
   - Source：`Deploy from a branch`
   - Branch：`main`
   - Folder：`/(root)`
5. 保存后等待 1–3 分钟，访问：

```text
https://你的用户名.github.io/wortkarte/
```

如果仓库名是 `你的用户名.github.io`，地址就是 `https://你的用户名.github.io/`。

## 方式二：命令行上传

```bash
cd wortkarte-github-pages
git init
git add .
git commit -m "Deploy Wortkarte"
git branch -M main
git remote add origin https://github.com/你的用户名/wortkarte.git
git push -u origin main
```

然后在仓库 Settings → Pages 中选择 `main` / `/(root)`。

## 重要：`.nojekyll`

压缩包里包含一个空的 `.nojekyll` 文件。它用于关闭 Jekyll 处理，避免 GitHub Pages 忽略某些文件。网页上传时如果系统隐藏了点文件，可以在仓库根目录手动新建一个空文件并命名为 `.nojekyll`。

## 更新版本与缓存

站点使用 Service Worker 做离线缓存。当前缓存版本是 `wortkarte-shell-v113`。更新网页文件后，建议同时修改 `sw.js` 顶部的：

```js
const CACHE_NAME = "wortkarte-shell-v114";
```

把版本号加一，已安装到手机主屏幕的旧版本才会主动换用新缓存。否则可能需要刷新两次或清除站点数据。

缓存更新只会替换页面文件，不会删除 `localStorage` 里的学习记录。

## 学习记录不会被部署覆盖

- 学习记录保存在浏览器的 `localStorage`，仓库里的 `index.html`、`app.js` 等静态文件不包含你的个人进度。
- 重新上传 GitHub Pages 只会替换页面代码，不会读写浏览器的 `localStorage`。
- 同一个网址（同一个 origin）下更新版本，记录会继续沿用；只有换域名或换浏览器才会出现“记录为空”。
- 应用在读取旧版本数据前会先做带时间戳的备份；如果旧数据损坏，会保留原字符串并暂停写入，避免被新页面覆盖。
- 备份键：

```text
wortkarte.v2.backup.<时间戳>-schema-<版本>
wortkarte.v2.backup.<时间戳>-corrupt
wortkarte.v2.last-good
```

- 更新前建议在“设置 → 导出”里另存一份 JSON 备份。

## 说明

- 所有词表、语法和程序都是静态文件，页面完全在浏览器中运行。
- 学习进度保存在当前浏览器的 `localStorage`，不会上传 GitHub，也没有账号系统。
- GitHub Pages 免费版要求仓库为公开仓库（私有仓库的 Pages 需要相应套餐）。
- 如果只想要一个文件，也可以直接上传根目录的 `wortkarte-mobile.html`；但 PWA 的离线缓存和主屏幕图标需要完整目录。
- 词表内容仅用于个人学习，请勿公开再分发教材词表。


