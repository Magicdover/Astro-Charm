---
title: 手写防抖与节流：两个高频面试题
published: 2026-07-05
description: 防抖和节流是前端性能优化的两块基石，也是面试常客。用最完整的代码，把它们讲清楚。
tags: [前端, JavaScript, 性能]
category: 编程
---

滚动、输入、窗口缩放……这些事件触发得极其频繁，若每次都执行回调，页面很容易卡顿。**防抖**（Debounce）与**节流**（Throttle）就是驯服它们的两把利器。它们思路相似，却常被搞混。

## 防抖：等你说完我再动

防抖的思想是：**事件触发后等待一段时间，若期间又被触发，就重新计时**。只有当你「彻底停下」超过设定时长，回调才真正执行。就像电梯——只要还有人进来，就一直等，直到没人了才关门。典型场景是搜索框的输入联想：用户还在打字时不发请求，停下来才发。

```javascript
function debounce(fn, delay = 300, immediate = false) {
  let timer = null;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    if (immediate && !timer) {
      fn.apply(context, args); // 首次立即执行
    }
    timer = setTimeout(() => {
      timer = null;
      if (!immediate) fn.apply(context, args);
    }, delay);
  };
}

// 用法：停止输入 500ms 后才触发搜索
searchInput.addEventListener(
  "input",
  debounce((e) => fetchSuggest(e.target.value), 500)
);
```

## 节流：每隔一段时间来一次

节流的思想是：**在一段时间内，无论触发多少次，只执行一次**。它像拧到最小的水龙头——不管水压多大，滴答的频率是固定的。典型场景是滚动加载、拖拽、射击游戏里的开火。

```javascript
function throttle(fn, interval = 300) {
  let last = 0;
  let timer = null;
  return function (...args) {
    const context = this;
    const now = Date.now();
    const remaining = interval - (now - last);
    if (remaining <= 0) {
      // 距上次已够久，立即执行
      if (timer) { clearTimeout(timer); timer = null; }
      last = now;
      fn.apply(context, args);
    } else if (!timer) {
      // 用一个定时器，保证最后一次也能触发
      timer = setTimeout(() => {
        last = Date.now();
        timer = null;
        fn.apply(context, args);
      }, remaining);
    }
  };
}

// 用法：滚动时最多每 200ms 检查一次
window.addEventListener("scroll", throttle(checkLazyLoad, 200));
```

:::note[一句话记住区别]
**防抖**关心「最后一次」——频繁触发只认最后那下；**节流**关心「频率」——再频繁也按固定节奏来。搜索联想用防抖，滚动监听用节流。
:::

## 现代替代

如今在很多场景下，你其实可以用浏览器原生能力来替代它们：`IntersectionObserver` 处理懒加载、`ResizeObserver` 处理尺寸变化，往往比手写节流更高效。但理解防抖与节流的思想，依然是每个前端的基本功。
