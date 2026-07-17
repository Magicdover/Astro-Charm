# CLAUDE.md — 项目规则与说明

> 本文件供 Claude（及协作者）快速理解与修改本项目。修改项目前请先读本文件。

## 一、项目概述

- **性质**：个人博客，站名「似水流年」，主题「代码与诗意的交织」。
- **框架**：[Astro](https://astro.build) v5（静态站点）。
- **主题**：[`astro-charm`](https://github.com/Yuhanawa/astro-charm) v1.2.2，作为 Astro integration 引入，页面/布局/组件大多来自该主题包（在 `node_modules/astro-charm` 内），本仓库只维护内容与少量配置、样式、脚本。
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

也可直接双击根目录的 **`启动.bat`**（开发）或 **`构建.bat`**（构建），类 Unix 环境用 **`启动.sh`**。脚本会自动检测 Node、选包管理器、首次运行时自动装依赖。**`.bat` 为 UTF-8 无 BOM + CRLF 编码，改动时务必保持，否则中文乱码。**

## 三、目录结构

```text
astro-website/
├── 启动.bat / 构建.bat / 启动.sh   # 一键脚本
├── astro.config.mjs                # Astro 与主题配置 + 配色切换器注入脚本
├── src/
│   ├── content/
│   │   ├── posts/                  # ★ 博客文章（每个 .md 一篇，文件名 = URL slug）
│   │   └── specials/               # 侧边栏导航页（关于/项目/世界杯/友链…）
│   ├── content.config.ts           # 内容集合定义（复用主题的 schema）
│   ├── styles/custom-charm.css     # 自定义样式（背景图 + 排版 + 多配色变量 + 切换器样式）
│   └── assets/                     # 02.webp（背景，webp）、02.png（备份）
└── public/favicon.svg
```

## 四、如何新增一篇文章（最常见操作）

1. 在 `src/content/posts/` 新建 `英文短横线命名.md`（**文件名即网址**，如 `my-post.md` → `/posts/my-post`）。
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

3. 下面写正文（Markdown）。
4. **日期尽量用近两年**：文章页依据 `updated`（无则 `published`）计算时效，距今超过约两年会自动显示「时效性提醒」横幅；更新 `updated` 即可恢复「新鲜」。

### 文章 frontmatter 字段全表

| 字段 | 类型 | 说明 |
| :-- | :-- | :-- |
| `title` | string | **必填** |
| `published` | date | **必填** |
| `description` | string | 列表摘要 / SEO |
| `updated` | date | 可选 |
| `category` | string | 可选，单个分类 |
| `tags` | string[] | 可选 |
| `image` | 图片 | 可选封面；**用本地图片需先 `pnpm add sharp`** |
| `draft` | bool | 默认 false；true = 草稿，仅开发环境可见 |
| `hidden` | bool | 默认 false；true = 不进列表，但仍可直达 |

### 导航页（specials）字段与新增方式

在 `src/content/specials/` 新建 `.md` 即成为一个侧边栏导航页（如 `foo.md` → `/foo`）。字段：`title`（必填，仅侧边栏用）、`icon`（必填）、`index`（**排序，越小越靠前**）、`description`、`published`、`updated`、`disabled`（true 时生产环境隐藏、开发可见）、`hidden`。

当前导航页与顺序：关于（index 1）、项目（2）、世界杯（3）、友链（4）、示例页面（9，`disabled`）。图标用 `solar:` 或 `simple-icons:` 前缀，可写 `{default, hover, active}` 三态；**图标名必须真实存在**（写错会导致构建失败，可在 `@iconify-json/solar` 的 `icons.json` 里核对）。

## 五、可用的 Markdown 扩展（主题提供）

- **提示框 / Admonition**：`:::tip[可选标题]` … `:::`；类型：`tip note notice question important warning caution danger`。
- **GitHub 仓库卡片**（独占一行）：`::github{repo="owner/repo"}`
- **视频嵌入**：把 YouTube 或 Bilibili 链接**单独放一行**，自动转为播放器。
- **数学公式**（KaTeX）：行内 `$E=mc^2$`，块级 `$$ … $$`。
- **目录**：单独一行写 `## toc` 会由 `remark-toc` 生成目录——但它会保留一个字面「toc」标题，中文文章里不好看，**本项目正文不使用**，需要时改用手写小标题。
- **代码块**：Shiki 高亮；TypeScript 支持 twoslash。
- 其余 GFM：脚注、任务列表、表格、删除线等。
- **在 Markdown 里嵌入 HTML/CSS**：可直接写 `<div>`、`<style>`（会原样输出）。**注意：HTML 块内不能有空行**，否则会被 Markdown 打断（世界杯晋级图、友链卡片即用此方式，样式类名加了 `wcb-`/`fl-` 前缀避免冲突）。

## 六、多配色主题系统（自定义，重点）

页面右下角有一个配色切换器，提供「默认 / 羊皮纸 / 松林 / 海蓝 / 樱粉」五套配色。实现要点：

- **明暗与配色正交**：主题自带的 light/dark 切换（`astro-theme-toggle`，独占 `.dark` 类、`data-theme` 属性、localStorage 键 `theme-toggle`）负责明暗；本项目的配色切换器用**独立的 `data-palette` 属性**与 localStorage 键 `charm-palette`，两者互不干扰、可自由组合。
- **配色变量**：`src/styles/custom-charm.css` 中，每套配色都为 `html.charm[data-palette="x"]`（light）与 `html.charm[data-palette="x"].dark`（dark）定义整套 `--charm-*` 变量；因这些规则非分层（unlayered），优先级高于主题的 `@layer charm`，可稳定覆盖。**每套都需保证背景色与文字色高对比。**
- **切换器脚本**：由 `astro.config.mjs` 里的本地 integration `charm-palette-switcher` 通过 `injectScript` 注入——`head-inline` 负责刷新前应用配色（防闪烁），`page` 负责构建 UI 并在 `astro:after-swap` 后重建。切换器 UI 自身用主题变量着色，任何配色下都清晰。
- **新增一套配色**：在 `custom-charm.css` 照葫芦画瓢加一组 light/dark 变量，再到 `astro.config.mjs` 的 `PALETTES` 数组里加一项 `{id,name,bg,ac}` 即可。

## 七、其他关键改动

- **切页抖动修复**：`custom-charm.css` 中 `html.charm { scrollbar-gutter: stable; }` 始终为滚动条预留空槽，消除内容多寡导致的横向宽度跳动。
- **中文排版**：正文段落 `text-align: justify`（两端对齐）；媒体 `max-width:100%; height:auto`（按原比例展示）。
- **背景图**：`src/assets/02.webp`（webp，更适配 Chrome）；`02.png` 保留作备份。

## 八、写作规范（中文）

遵循用户全局 `~/.claude/CLAUDE.md` 的排版约定，要点：同段落写在源码同一行；正文用中文全角标点；Markdown 加粗 `**…**` 内侧不紧贴标点/括号（如 `**定义**：内容`、`**术语**（Term Case））；括号内英文注释用 Title Case。

## 九、依赖与注意

- **不要升级到 Astro 7.x**：主题 `astro-charm@1.2.2` 为 Astro 5 编写，跨大版本升级极可能弄坏主题。保持 Astro `^5`。
- `src/assets/02.png` 约 6 MB，已改用 webp；png 仅作备份，如不需要可删。
- **版本管理**：使用 git，提交信息用中文；完成后推送到 `main`，Vercel 自动部署。
