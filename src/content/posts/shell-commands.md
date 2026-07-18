---
title: CMD、PowerShell 与 Linux：经典命令对照
published: 2026-06-14
description: 同样一件事，在 CMD、PowerShell 和 Linux 里怎么敲？一张对照表，看懂三者的经典命令与脾气。
tags: [命令行, Linux, Windows]
category: 技术
---

在三种终端之间来回切换，最容易记混的就是命令。它们做的事往往一样，写法却天差地别。这里把最经典的一批命令列成对照表，也顺带聊聊三者背后不同的哲学。

## 经典命令对照

| 做什么 | CMD | PowerShell | Linux（Bash） |
| :-- | :-- | :-- | :-- |
| 列出目录 | `dir` | `Get-ChildItem`（别名 `ls`） | `ls` |
| 切换目录 | `cd` | `Set-Location`（`cd`） | `cd` |
| 当前路径 | `cd` | `Get-Location`（`pwd`） | `pwd` |
| 新建文件夹 | `mkdir` | `New-Item -Type Directory` | `mkdir` |
| 复制文件 | `copy` | `Copy-Item`（`cp`） | `cp` |
| 移动 / 改名 | `move` | `Move-Item`（`mv`） | `mv` |
| 删除文件 | `del` | `Remove-Item`（`rm`） | `rm` |
| 查看内容 | `type` | `Get-Content`（`cat`） | `cat` |
| 清屏 | `cls` | `Clear-Host`（`cls`） | `clear` |
| 查找文本 | `findstr` | `Select-String` | `grep` |
| 环境变量 | `set` | `$Env:PATH` | `echo $PATH` |
| 网络配置 | `ipconfig` | `Get-NetIPAddress` | `ip addr` |

## 三种脾气

- **CMD**：Windows 的老古董，源自 DOS。命令短、够用，但语法古怪、功能有限，如今多用来跑跑老旧的批处理脚本。
- **PowerShell**：微软的现代武器。它最大的不同是——管道里流动的不是**文本**，而是**对象**，这让它能像写程序一样处理数据。

```powershell
# 找出占用内存最高的 5 个进程
Get-Process | Sort-Object WS -Descending | Select-Object -First 5
```

- **Linux（Bash）**：Unix 哲学的集大成者，信奉「一个程序只做好一件事」，再用管道把它们串起来，简洁而组合性极强。

```bash
# 同样是找内存占用最高的进程
ps aux --sort=-%mem | head -n 6
```

:::tip[一个实用建议]
PowerShell 贴心地为常用命令设了 Unix 风格的别名（`ls`、`cp`、`rm` 等），从 Linux 转过来的人往往能无痛上手。真正的分水岭不在命令名，而在「文本流」还是「对象流」这套思维。
:::
