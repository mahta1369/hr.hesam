@echo off
chcp 65001 >nul
title سیستم جامع منابع انسانی - HR Management System
color 0B

echo.
echo  ╔══════════════════════════════════════════════╗
echo  ║     سیستم جامع مدیریت منابع انسانی          ║
echo  ║     HR Management System                     ║
echo  ╚══════════════════════════════════════════════╝
echo.
echo  در حال راه‌اندازی سرور...
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo  [خطا] Node.js نصب نیست!
    echo  لطفاً Node.js را از https://nodejs.org نصب کنید.
    echo.
    echo  یا می‌توانید فایل index.html را مستقیماً در مرورگر باز کنید.
    echo.
    
    :: Try to open the HTML file directly
    if exist "dist\index.html" (
        echo  در حال باز کردن فایل در مرورگر...
        start "" "dist\index.html"
    ) else if exist "index.html" (
        echo  در حال باز کردن فایل در مرورگر...
        start "" "index.html"
    ) else (
        echo  فایل index.html یافت نشد!
    )
    echo.
    pause
    exit /b
)

:: Check if Python is available as alternative
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo  [اطلاعات] Python یافت شد. استفاده از سرور Python...
    echo.
    echo  ═══════════════════════════════════════════
    echo   سرور در آدرس زیر فعال است:
    echo   http://localhost:8080
    echo  ═══════════════════════════════════════════
    echo.
    echo  برای توقف سرور، Ctrl+C را فشار دهید.
    echo.
    
    :: Open browser after 2 seconds
    start /b cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:8080"
    
    cd dist
    python -m http.server 8080
    exit /b
)

:: Use Node.js npx serve
echo  [اطلاعات] استفاده از سرور Node.js...
echo.
echo  ═══════════════════════════════════════════
echo   سرور در آدرس زیر فعال است:
echo   http://localhost:3000
echo  ═══════════════════════════════════════════
echo.
echo  برای توقف سرور، Ctrl+C را فشار دهید.
echo.

:: Open browser after 2 seconds
start /b cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:3000"

npx serve dist -l 3000

pause
