---
title: 排版与 Markdown 示例
published: 2024-12-02
updated: 2026-07-17
description: 一篇用来展示本主题排版能力的示例：强调、列表、代码、引用、提示框、公式与视频。
tags: [Markdown, 示例]
category: 示例
---

这是一篇示例文章，用来展示本主题支持的各种 Markdown 与排版能力，你可以把它当作写作时的速查表。[^gfm]

## 强调

*斜体：用 `*` 或 `_` 包裹*

**加粗：用两个 `*` 或两个 `_` 包裹**

~~删除线：用 `~~` 包裹~~

## 列表

有序列表：

1. 第一项
2. 第二项
3. 第三项

无序列表：

- 一个要点
- 另一个要点

任务列表：

- [x] 立一个 flag
- [x] 努力并坚持
- [ ] 让 flag 成真

## 代码

行内代码写作 `const answer = 42`；代码块则支持语法高亮：

```javascript
function life() {
  try {
    while (true) {
      this.eat();
      this.work();
      this.sleep();
    }
  } catch (e) {
    this.go("hell");
  }
}
```

## 引用

> 一段引用。
>
> > 引用还可以嵌套。

## 提示框

本主题内置多种提示框，语法为 `:::类型[可选标题] … :::`：

:::tip[小提示]
用来补充一些「知道了会更好」的信息。
:::

:::warning[注意]
用来提醒一些容易踩的坑。
:::

## 数学公式

支持 KaTeX：行内公式如 $e^{i\pi} + 1 = 0$，块级公式如

$$
\int_{-\infty}^{+\infty} e^{-x^{2}}\,\mathrm{d}x = \sqrt{\pi}
$$

## 视频

把 YouTube 或 Bilibili 的视频链接**单独放在一行**，即可自动嵌入播放器，例如：

```text
https://www.bilibili.com/video/BV1GJ411x7h7
```

（本页不内嵌实际视频，以免因网络环境导致加载失败。）

[^gfm]: 本主题遵循 [GitHub Flavored Markdown](https://github.github.com/gfm/) 规范。
