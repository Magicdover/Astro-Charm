---
title: 示例
icon:
  {
    default: "solar:star-fall-broken",
    hover: "solar:star-fall-outline",
    active: "solar:star-fall-bold-duotone",
  }
published: 2024-11-30
updated: 2026-07-18
index: 3
---

# 关于这个站点

这是一个基于 [Astro](https://astro.build) 与 [`astro-charm`](https://github.com/Yuhanawa/astro-charm) 主题搭建的个人博客，在主题之上做了不少定制。这一页汇总它的主要功能与用法，也顺便演示本主题支持的各种排版效果。

## 外观：配色 / 背景 / 特效

页面右下角有一个齿轮按钮，点击后会**扇形展开**四个动作。

:::tip[右下角的齿轮]
从上到下分别是：切换**背景特效**、切换**背景图**、选择**配色主题**，以及最下方的**一键复原默认**。八套配色可与明暗自由组合，每一套都保证背景与文字高对比、清晰可读。
:::

左上角还有一个含**农历**、精确到秒的时钟；打开任意文章后，右上角会出现关闭按钮，点击即可消解当前页、返回上一层。

## 侧边栏导航

当前的导航页：关于 · 项目 · 导航 · 壁纸 · 一言 · 公式 · 示例 · 友链。想新增一个导航页，只需在 `src/content/specials/` 下放一个 Markdown 文件即可。

## 写一篇文章

在 `src/content/posts/` 新建一个 `.md`（**文件名即网址**），顶部写好 frontmatter：

```markdown
---
title: 我的第一篇文章
published: 2026-07-18
description: 一句话简介。
tags: [随笔, 生活]
category: 随笔
---

正文从这里开始……
```

## 可用的 Markdown 扩展

**提示框**共有多种类型，语法为 `:::类型[可选标题] … :::`：

:::note[note]
用来补充说明。
:::

:::important[important]
用来强调重点。
:::

:::warning[warning]
用来提醒风险。
:::

:::danger[danger]
用来标注危险操作。
:::

**代码块**支持语法高亮：

```python
def greet(name: str) -> str:
    return f"你好，{name}！"

print(greet("世界"))
```

**数学公式**基于 KaTeX：行内如 $a^2 + b^2 = c^2$，块级如

$$
\int_{0}^{1} x^{2}\,\mathrm{d}x = \frac{1}{3}
$$

其余还支持任务列表、表格、脚注、引用、视频嵌入等常见 GFM 语法。

:::tip[想了解更多]
本站的完整规则与结构，记录在仓库根目录的 `README.md` 与 `CLAUDE.md` 里。
:::
