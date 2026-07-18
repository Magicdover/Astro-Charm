---
title: 手写一个 Promise：从零理解异步
published: 2026-07-09
description: Promise 是 JavaScript 异步的基石。亲手实现一个，你就再也不会被它绕晕。
tags: [前端, JavaScript, 异步]
category: 编程
---

`Promise` 是理解现代 JavaScript 异步的关键。用它很容易，但要真正吃透，最好的办法是——亲手写一个。下面这个实现遵循 Promises/A+ 的核心思想，麻雀虽小，五脏俱全。

## 三种状态

一个 Promise 有且只有三种状态：`pending`（进行中）、`fulfilled`（已成功）、`rejected`（已失败）。状态一旦从 pending 改变，就**永久固定**，不可逆转。

```javascript
class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCbs = []; // 成功回调队列
    this.onRejectedCbs = [];  // 失败回调队列

    const resolve = (value) => {
      if (this.state !== "pending") return;
      this.state = "fulfilled";
      this.value = value;
      this.onFulfilledCbs.forEach((fn) => fn());
    };
    const reject = (reason) => {
      if (this.state !== "pending") return;
      this.state = "rejected";
      this.reason = reason;
      this.onRejectedCbs.forEach((fn) => fn());
    };

    try {
      executor(resolve, reject); // 传入的执行器立即执行
    } catch (err) {
      reject(err);
    }
  }
```

## then：链式调用的秘密

`then` 是 Promise 的灵魂。它必须返回一个**新的 Promise**，才能支持链式调用；异步回调则用 `setTimeout` 来模拟微任务的延迟。

```javascript
  then(onFulfilled, onRejected) {
    // 值穿透：不传回调时原样向下传递
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected = typeof onRejected === "function" ? onRejected : (e) => { throw e; };

    return new MyPromise((resolve, reject) => {
      const handle = (cb, data) => {
        setTimeout(() => {
          try {
            resolve(cb(data)); // 把回调的返回值交给下一个 then
          } catch (err) {
            reject(err);
          }
        });
      };
      if (this.state === "fulfilled") handle(onFulfilled, this.value);
      else if (this.state === "rejected") handle(onRejected, this.reason);
      else {
        // 还在 pending，先把回调存起来，等状态改变时再执行
        this.onFulfilledCbs.push(() => handle(onFulfilled, this.value));
        this.onRejectedCbs.push(() => handle(onRejected, this.reason));
      }
    });
  }
}
```

## 试一试

```javascript
new MyPromise((resolve) => {
  setTimeout(() => resolve("成功"), 500);
})
  .then((res) => { console.log(res); return res + "！"; })
  .then((res) => console.log(res)); // 依次打印：成功  →  成功！
```

:::tip[写完你会明白]
Promise 之所以能「链式」，是因为每个 `then` 都返回一个新的 Promise；之所以能「异步」，是因为回调被放进了任务队列。理解了这两点，`async/await` 也就不再神秘——它不过是 Promise 的语法糖。
:::

完整的规范还包括对 thenable 的递归解析等细节，这里做了简化，但核心机制已经完备。
