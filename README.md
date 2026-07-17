# 似水流年 · 个人博客

> 代码与诗意的交织，记录技术、阅读、光影与生活的点滴。

一个基于 [Astro](https://astro.build) 与 [`astro-charm`](https://github.com/Yuhanawa/astro-charm) 主题搭建的个人博客，简洁、响应式、支持暗色模式。

## ✨ 特性

- 🎨 优雅的 Charm 主题，桌面与移动端自适应，内置暗色模式
- 🌈 **五套可切换配色**（默认 / 羊皮纸 / 松林 / 海蓝 / 樱粉），右下角一键切换，与明暗自由组合，均保证文字清晰可读
- 📝 Markdown 写作，支持提示框、代码高亮、数学公式（KaTeX）、视频嵌入、GitHub 卡片
- 🧭 丰富的侧边栏导航：关于、项目、世界杯、友链等页面
- 🗂️ 文章分类与标签页、站内搜索、RSS、Sitemap
- 🇨🇳 面向中文优化的排版（正文两端对齐、全角标点），并修复了切换页面时的横向抖动
- ⚡ 静态生成，加载迅捷

## 🚀 快速开始

### 方式一：一键脚本（推荐）

- **Windows**：双击根目录的 **`启动.bat`** 即可启动本地预览；构建生产版本用 **`构建.bat`**。
- **macOS / Linux / Git Bash**：执行 `bash 启动.sh`。

脚本会自动检测 Node.js、选择包管理器（优先 pnpm），并在首次运行时自动安装依赖，随后打开浏览器访问 `http://localhost:4321`。

### 方式二：手动命令

```bash
pnpm install   # 安装依赖（无 pnpm 可用 npm install）
pnpm dev       # 本地开发，访问 http://localhost:4321
pnpm build     # 构建到 dist/
pnpm preview   # 预览构建产物
```

> 需要 Node.js 18 或更高版本。

## ✍️ 写一篇新文章

在 `src/content/posts/` 下新建一个 `.md` 文件（**文件名即网址**，建议英文短横线命名），顶部写好 frontmatter：

```markdown
---
title: 我的第一篇文章
published: 2026-07-15
description: 一句话简介。
tags: [随笔, 生活]
category: 随笔
---

正文从这里开始……
```

保存后即可在首页看到。更多字段与可用的 Markdown 扩展，详见 [`CLAUDE.md`](./CLAUDE.md)。

## 📁 项目结构

```text
astro-website/
├── 启动.bat / 构建.bat / 启动.sh   # 一键脚本
├── astro.config.mjs                # 站点与主题配置 + 配色切换器
├── src/
│   ├── content/
│   │   ├── posts/                  # 博客文章
│   │   └── specials/               # 侧边栏页面（关于 / 项目 / 世界杯 / 友链…）
│   ├── content.config.ts           # 内容集合定义
│   ├── styles/custom-charm.css     # 自定义样式（配色 / 排版 / 切换器）
│   └── assets/                     # 图片等资源
└── public/                         # 静态资源（favicon 等）
```

## ⚙️ 常用配置

站点信息集中在 `astro.config.mjs`：站名 / 简介 / 作者、侧边栏标题与个人简介、页脚社交链接等，均可在其中修改。

> **部署**：本站已通过 GitHub + Vercel 部署于 <https://astro-charm-two.vercel.app>，推送到 `main` 分支即自动更新。`astro.config.mjs` 里的 `site` 已指向该域名（用于生成 RSS 与 Sitemap 的绝对链接）。

## 📄 许可与致谢

- 本项目 Fork 自 [`Yuhanawa/astro-charm`](https://github.com/Yuhanawa/astro-charm)，原作者：[Yuhanawa](https://github.com/Yuhanawa)。
- 主题 [`astro-charm`](https://github.com/Yuhanawa/astro-charm) 以 MIT 协议开源，版权归原作者所有。
- 站点内容：署名 CC BY 4.0（可在配置中调整）。
