---
title: 项目
description: 我做过、正在做，以及一直想做的一些小东西。
icon:
  {
    default: "solar:code-square-broken",
    hover: "solar:code-square-outline",
    active: "solar:code-square-bold-duotone",
  }
published: 2026-01-05
updated: 2026-07-18
index: 2
---

# 我在做的一些事

这一页记录我做过、正在做，以及一直想做的一些小东西。它会随着时间慢慢长大——就像这个博客本身。

## 似水流年（就是这个博客）

你正在看的这个站点。它基于 Astro 与 Charm 主题搭建，纯静态、加载很快，我在它之上做了中文排版优化、八套配色、多种背景特效、含农历的时钟等一堆小玩意儿。

:::tip[技术栈]
Astro v5（静态生成）+ astro-charm 主题 + 少量原生 JavaScript（配色/特效/时钟/农历，无第三方框架），部署在 Vercel，推送即上线。
:::

## 氛围编程（Vibe Coding）实验

我在持续尝试把 Claude Code、Codex 这类工具嵌进日常开发：让它们承担搭脚手架、写样板、查资料这些体力活，我则把精力留给设计与取舍。目标不是「让 AI 替我写代码」，而是找到一套人机分工顺畅、又始终不失控的节奏。

一个我很喜欢的小习惯，是先把「要做什么」写成一段清晰的注释，再让模型补全：

```python
# 目标：给定一批文章的 frontmatter，按发布日期倒序返回标题列表
def latest_titles(posts: list[dict]) -> list[str]:
    ordered = sorted(posts, key=lambda p: p["published"], reverse=True)
    return [p["title"] for p in ordered]
```

:::note[心得]
把意图写清楚，比反复追问模型更高效。好的提示词，往往就是一段你本来也该写下来的思路。
:::

## RLHF 学习笔记（进行中）

作为对职业方向的一点投资，我在系统地补齐大模型对齐、尤其是 RLHF 相关的知识。从奖励模型、偏好数据，到 PPO、DPO 这些方法，边学边记，陆续整理成 [AI](/categories/AI) 分类下的文章。

:::warning[给自己的提醒]
别只收藏不动手。再漂亮的路线图，不写代码、不做实验，都只是别人的地图。
:::

## 这一页会继续长大

:::important[小声说]
这里大多还是「正在路上」的状态。与其堆一堆华丽的截图，我更想诚实地写下此刻真正在做的事——毕竟，未完成本身，也是一种进行时。
:::
