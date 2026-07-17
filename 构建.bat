@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
cd /d "%~dp0"
title 似水流年 · 构建

echo.
echo   ============================================
echo       似水流年 · 构建生产版本
echo   ============================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo   [错误] 没有检测到 Node.js，请先到 https://nodejs.org 安装。
  echo.
  pause
  exit /b 1
)

set "PM="
where pnpm >nul 2>nul && set "PM=pnpm"
if not defined PM (
  where npm >nul 2>nul && set "PM=npm"
)
if not defined PM (
  echo   [错误] 没有检测到 pnpm 或 npm，请先安装 Node.js。
  echo.
  pause
  exit /b 1
)
echo   使用包管理器：!PM!
echo.

if not exist "node_modules" (
  echo   检测到尚未安装依赖，正在安装……
  echo.
  call !PM! install
  if errorlevel 1 (
    echo   [错误] 依赖安装失败，请检查网络后重试。
    pause
    exit /b 1
  )
  echo.
)

echo   正在构建，产物将输出到 dist\ 目录……
echo.
if /i "!PM!"=="pnpm" (
  call pnpm build
) else (
  call npm run build
)
if errorlevel 1 (
  echo.
  echo   [错误] 构建失败，请查看上方日志排查。
  pause
  exit /b 1
)

echo.
echo   构建完成！产物位于 dist\ 目录。
echo   如需在本地预览成品，可执行：!PM! preview
echo.
pause
