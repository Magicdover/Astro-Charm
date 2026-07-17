@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
cd /d "%~dp0"
title 似水流年 · 本地预览

echo.
echo   ============================================
echo       似水流年 · 博客本地启动
echo   ============================================
echo.

REM ---- 检查 Node.js ----
where node >nul 2>nul
if errorlevel 1 (
  echo   [错误] 没有检测到 Node.js。
  echo   请先到 https://nodejs.org 安装 Node.js（建议 18 或更高版本），再运行本脚本。
  echo.
  pause
  exit /b 1
)

REM ---- 选择包管理器：优先 pnpm，其次 npm ----
set "PM="
where pnpm >nul 2>nul && set "PM=pnpm"
if not defined PM (
  where npm >nul 2>nul && set "PM=npm"
)
if not defined PM (
  echo   [错误] 没有检测到 pnpm 或 npm。
  echo   请先安装 Node.js（自带 npm），或执行：npm install -g pnpm
  echo.
  pause
  exit /b 1
)
echo   使用包管理器：!PM!
echo.

REM ---- 首次运行时自动安装依赖 ----
if not exist "node_modules" (
  echo   第一次运行，正在安装依赖，请稍候……
  echo.
  call !PM! install
  if errorlevel 1 (
    echo.
    echo   [错误] 依赖安装失败，请检查网络后重试。
    echo.
    pause
    exit /b 1
  )
  echo.
)

echo   正在启动开发服务器，浏览器将自动打开 http://localhost:4321
echo   （在此窗口按 Ctrl+C，或直接关闭窗口，即可停止服务）
echo.

if /i "!PM!"=="pnpm" (
  call pnpm dev --open
) else (
  call npm run dev -- --open
)

echo.
echo   服务器已停止。
pause
