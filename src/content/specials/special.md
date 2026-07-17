---
title: 示例页面
icon:
  {
    default: "solar:star-fall-broken",
    hover: "solar:star-fall-outline",
    active: "solar:star-fall-bold-duotone",
  }
published: 2024-11-30
updated: 2026-07-17
disabled: true
index: 9
---

## 示例页面

这是一个「独立页面」（Special Page）的示例。

你可以在 `src/content/specials` 目录下新增 Markdown 文件来创建独立页面。

例如：在该目录下添加 `about.md`，即可通过访问 `/about` 打开对应页面。

独立页面的 frontmatter 支持 `title`、`icon`、`published`、`updated`、`index`、`disabled` 等字段。

其中 `title` 与 `icon` 为必填，仅用于侧边栏导航项的显示，不会出现在页面正文中。

`published` 与 `updated` 为可选；若未填写，则不显示。

`index` 用于控制导航排序，数值越小越靠前。

`disabled` 为可选，默认 `false`；若设为 `true`，该页面在生产环境不会显示（开发环境仍可见）——本页正是如此。
