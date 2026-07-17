#!/usr/bin/env bash
# 似水流年 · 本地启动脚本（适用于 macOS / Linux / Git Bash）
# 用法：在项目根目录执行  bash 启动.sh  或  ./启动.sh
set -e
cd "$(dirname "$0")"

echo ""
echo "  ============================================"
echo "      似水流年 · 博客本地启动"
echo "  ============================================"
echo ""

if ! command -v node >/dev/null 2>&1; then
  echo "  [错误] 没有检测到 Node.js，请先安装：https://nodejs.org"
  exit 1
fi

if command -v pnpm >/dev/null 2>&1; then
  PM="pnpm"
elif command -v npm >/dev/null 2>&1; then
  PM="npm"
else
  echo "  [错误] 没有检测到 pnpm 或 npm，请先安装 Node.js。"
  exit 1
fi
echo "  使用包管理器：$PM"
echo ""

if [ ! -d "node_modules" ]; then
  echo "  第一次运行，正在安装依赖，请稍候……"
  "$PM" install
  echo ""
fi

echo "  正在启动开发服务器，浏览器将自动打开 http://localhost:4321"
echo "  （按 Ctrl+C 即可停止服务）"
echo ""

if [ "$PM" = "pnpm" ]; then
  pnpm dev --open
else
  npm run dev -- --open
fi
