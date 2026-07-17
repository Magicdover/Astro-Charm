---
title: 把终端调成趁手的样子
published: 2025-07-20
description: 与其忍受默认配置的粗糙，不如花一个安静的下午，把每天都要面对的黑框子，打磨成自己的兵器。
tags: [终端, 效率, 工具]
category: 技术
---

程序员每天盯着终端的时间，往往比盯着任何一款花哨的应用都长。可惜很多人对它的态度始终是「能用就行」：黑底白字、默认提示符、没有补全也没有高亮，像一间从不打扫的工作间。其实只需要一个安静的下午，就能把这块每天都要面对的黑框子，收拾成真正趁手的样子。

## 先换一个像样的 Shell

默认的 Bash 当然能用，但换上 Zsh 或 Fish，体验会立刻不同。它们自带更聪明的补全、更友好的历史搜索，也有繁荣的插件生态。以 Zsh 搭配 Oh My Zsh 为例，几行命令就能拥有主题、语法高亮与自动建议：

```bash
# 安装 Oh My Zsh（需要先装好 zsh 与 git）
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 常用的补全增强插件
git clone https://github.com/zsh-users/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting
```

:::tip[小提示]
配置文件（`.zshrc`、`.bashrc`）本质上就是每次开终端时自动执行的脚本。把你反复敲的长命令起一个短别名，是回报率最高的一笔投资。
:::

## 让提示符替你思考

一个好的提示符不只是好看，它会主动告诉你此刻身处何处：当前分支、有没有未提交的改动、上一条命令是否出错。Starship 是个跨 Shell 的好选择，配置一次，Bash、Zsh、Fish 通用：

```bash
curl -sS https://starship.rs/install.sh | sh
```

## 值得一试的现代工具

老牌命令固然经典，但这些「新一代」替代品往往更快、也更好读：

- `eza` 代替 `ls`：彩色、带图标，还能显示 Git 状态
- `bat` 代替 `cat`：语法高亮加行号
- `ripgrep`（`rg`）代替 `grep`：快到不像话
- `fzf`：模糊查找，一旦用上就再也离不开

::github{repo="withastro/astro"}

工具从来不是目的，趁手才是。别急着一次装满整屏插件，先从一个别名、一个提示符开始，让终端一点点长成你习惯的模样。
