# CLAUDE.md — 项目规则与说明

> 本文件供 Claude（及协作者）快速理解与修改本项目。修改项目前请先读本文件。

## 一、项目概述

- **性质**：个人博客，站名「似水流年」，主题「代码与诗意的交织」。
- **框架**：[Astro](https://astro.build) v5（静态站点）。
- **主题**：[`astro-charm`](https://github.com/Yuhanawa/astro-charm) v1.2.2，作为 Astro integration 引入；页面/布局/组件大多来自该主题包（在 `node_modules/astro-charm` 内），本仓库只维护内容与少量配置、样式、脚本。
- **包管理器**：pnpm（锁文件为 `pnpm-lock.yaml`；无 pnpm 时可用 npm）。
- **语言**：内容以简体中文为主，`lang` 设为 `zh-CN`。
- **部署**：GitHub + Vercel，线上地址 `https://astro-charm-two.vercel.app`（已写入 `astro.config.mjs` 的 `site`）。推送到 `main` 即自动部署。

## 二、常用命令

| 命令 | 作用 |
| :-- | :-- |
| `pnpm install` | 安装依赖 |
| `pnpm dev` | 启动开发服务器（`http://localhost:4321`） |
| `pnpm build` | 构建生产版本到 `dist/` |
| `pnpm preview` | 本地预览构建产物 |

也可直接双击根目录的 **`启动.bat`**（开发预览，一键脚本）。**`.bat` 为 UTF-8 无 BOM + CRLF 编码，改动时务必保持，否则中文乱码。**

## 三、目录结构

```text
astro-website/
├── 启动.bat                        # 一键启动开发预览
├── astro.config.mjs                # Astro 与主题配置 + 增强脚本注入（读取图片目录）
├── src/
│   ├── content/
│   │   ├── posts/                  # ★ 博客文章（每个 .md 一篇，文件名 = URL slug）
│   │   └── specials/               # 侧边栏导航页
│   ├── content.config.ts           # 内容集合定义（复用主题 schema）
│   ├── enhance/enhance.js          # 站点增强脚本（设置面板 + 关闭按钮 + 背景特效）
│   ├── styles/custom-charm.css     # 自定义样式（背景 + 排版 + 配色 + 面板/关闭/特效样式）
│   └── assets/                     # 02.png / 02.webp（旧背景，现已改用 public/backgrounds，保留作备份）
└── public/
    ├── backgrounds/                # ★ 背景图（设置面板按文件名顺序切换）
    ├── wallpapers/                 # ★ 壁纸（「壁纸」页展示）
    └── favicon.svg
```

## 四、如何新增一篇文章（最常见操作）

1. 在 `src/content/posts/` 新建 `.md`（**文件名即网址**，如 `my-post.md` → `/posts/my-post`）。
2. 顶部写 frontmatter（YAML），至少 `title` 与 `published`：

```yaml
---
title: 文章标题
published: 2026-07-15          # 必填，YYYY-MM-DD
updated: 2026-07-16            # 可选
description: 一句话简介，显示在列表并用于 SEO。
tags: [标签一, 标签二]         # 可选，列表最多显示 3 个
category: 分类名               # 可选，生成 /categories/分类名
---
```

3. 下面写正文（Markdown）。**日期尽量用近两年**：距今超过约两年会自动显示「时效性提醒」横幅，更新 `updated` 即可恢复。

### 文章 frontmatter 字段全表

| 字段 | 类型 | 说明 |
| :-- | :-- | :-- |
| `title` | string | **必填**；注意长度，见下方「标题与描述长度」 |
| `published` | date | **必填** |
| `description` | string | 列表摘要 / SEO；注意长度，见下方「标题与描述长度」 |
| `updated` | date | 可选 |
| `category` | string | 可选，单个分类 |
| `tags` | string[] | 可选 |
| `image` | 图片 | 可选封面；**用本地图片需先 `pnpm add sharp`** |
| `draft` / `hidden` | bool | 草稿 / 不进列表但可直达 |

**标题与描述长度（保证首页 / 列表预览卡片一行显示、不换行）：**
- 真正的限制是**整行的渲染宽度**，不是字数——要把每个字符**和标点**都按其实际宽度算进去：**汉字与全角标点（，。：、「」《》—— 等）各约 1 个宽度单位；英文、数字、半角符号、空格各约 0.5 个单位。**
- **标题**（字号大、留白空间小）：整行 ≤ 约 **22** 个宽度单位（实测约 21 能容纳、约 24 必换行）；建议落在 18–21，既把宽度用足又稳妥。
- **description**（字号小）：整行 ≤ 约 **44** 个宽度单位；建议 38–44。参考上限——「AI 是这个时代最耀眼的故事，但耀眼之下，质疑的声音也在变响。热潮里，最稀缺的从来是常识。」≈ 44，即一行极限。
- **不要为了保守把标题 / 描述砍得过短**：在不超过上限的前提下，尽量把宽度用满、信息写足，读起来才自然。

### 导航页（specials）

在 `src/content/specials/` 新建 `.md` 即成为一个侧边栏导航页（`foo.md` → `/foo`）。字段：`title`（必填）、`icon`（必填）、`index`（**排序，越小越靠前**）、`description`、`published`、`updated`、`disabled`（true 时生产隐藏、开发可见）。

当前导航页与顺序：关于(1) · 项目(2) · 世界杯(3) · 网址导航(4) · 壁纸(5) · 一言(6) · 友链(7) · 示例页面(9, `disabled`)。**图标名必须真实存在**（写错会导致构建失败，可在 `@iconify-json/solar` 的 `icons.json` 里核对）。

**几个功能页的数据在哪改：**
- **一言**（`hitokoto.md`）：句子在文件内 `<script>` 的 `Q` 数组，`{zh, en, from}`，随意增删。
- **壁纸**（`wallpapers.md`）：图片放 `public/wallpapers/`，构建时自动读取，无需改代码。
- **网址导航**（`sites.md`）：站点在文件内 `<script>` 的 `DATA` 数组，`cn:1` 为国内、`cn:0` 为国外。

## 五、可用的 Markdown 扩展（主题提供）

- **提示框**：`:::tip[标题]` … `:::`；类型 `tip note notice question important warning caution danger`。
- **GitHub 卡片**（独占一行）：`::github{repo="owner/repo"}`
- **视频**：把 YouTube / Bilibili 链接**单独放一行**自动转播放器（注意国内可能打不开 YouTube）。
- **公式**（KaTeX）：行内 `$E=mc^2$`，块级 `$$ … $$`。
- **代码块**：Shiki 高亮，TS 支持 twoslash。其余 GFM：脚注、任务列表、表格等。
- **嵌 HTML/CSS/JS**：可直接写 `<div>`/`<style>`/`<script>`（原样输出）。**`<div>` 块内不能有空行**（会被 Markdown 打断）；`<style>`、`<script>` 属 HTML type-1，可含空行。页面内脚本用 `astro:page-load` 事件初始化以兼容视图切换，类名加前缀（`wcb-`/`fl-`/`hk-`/`wp-`/`nav-`）避免冲突。

## 六、外观与交互增强（自定义，重点）

由 `astro.config.mjs` 里的本地 integration **`charm-enhance`** 注入：`head-inline` 预加载（读 localStorage 应用配色与背景，防闪烁）+ `page` 主脚本（源码 `src/enhance/enhance.js`）。

- **配色主题**（`data-palette` + localStorage `charm-palette`）：默认/羊皮纸/松林/海蓝/樱粉五套，与明暗 `.dark` **正交**；变量定义在 `custom-charm.css`（非分层，优先级高于主题 `@layer charm`），每套 light/dark 都保证高对比。
- **背景图**（CSS 变量 `--charm-bg-image` + localStorage `charm-bg`）：取自 `public/backgrounds/`，`astro.config.mjs` 构建时 `fs.readdirSync` 按名排序生成清单，注入 `window.__CHARM.backgrounds`。往该目录增删图片、重新构建即生效。
- **背景特效**（localStorage `charm-effect`）：无 / 代码雨(matrix) / 蛛网(web) / 飞雪(snow)，canvas 全屏、`z-index:-1`。新增特效：在 `enhance.js` 的 `EFFECTS` 数组加一项 `{id,name,fn}` 并实现 `fn`。
- **设置面板**：右下角齿轮按钮，聚合上述三项（配色/背景/特效），用主题变量着色。
- **关闭按钮**：内容页右上角的「×」，点击后内容淡出缩小并返回导航（`isFilePage()` 判断显示；首页无此按钮、只有 search，二者不重合）。
- **背景图片切换器与壁纸清单**都依赖 `window.__CHARM`，由 head-inline 注入。

## 七、其他关键改动

- **切页抖动修复**：`html.charm { scrollbar-gutter: stable; }` 始终预留滚动条空槽，消除横向宽度跳动。
- **中文排版**：正文段落 `text-align: justify`；媒体 `max-width:100%; height:auto`。

## 八、写作规范（中文）

遵循用户全局 `~/.claude/CLAUDE.md`：同段落写在源码同一行；正文用中文全角标点；Markdown 加粗 `**…**` 内侧不紧贴标点/括号；括号内英文注释用 Title Case。

## 九、依赖与注意

- **不要升级到 Astro 7.x**：主题为 Astro 5 编写，跨大版本升级极可能弄坏主题。保持 Astro `^5`。
- **版本管理**：使用 git，提交信息用中文；完成后推送到 `main`，Vercel 自动部署。`.gitattributes` 已锁定 `.bat` 为 CRLF。
