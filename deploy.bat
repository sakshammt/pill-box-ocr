@echo off
REM MediCare Deployment Script for Windows
REM This script helps you deploy your app quickly

echo ======================================
echo   MediCare Deployment Helper
echo ======================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed.
    echo Please install npm with Node.js
    pause
    exit /b 1
)

echo [OK] Node.js and npm are installed
echo.

:MENU
echo Choose your deployment platform:
echo 1) Vercel (Recommended - Fast and Easy)
echo 2) Netlify CLI
echo 3) Build only (manual deployment)
echo 4) GitHub Pages
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto VERCEL
if "%choice%"=="2" goto NETLIFY
if "%choice%"=="3" goto BUILD
if "%choice%"=="4" goto GITHUB
echo Invalid choice. Please try again.
echo.
goto MENU

:VERCEL
echo.
echo [INFO] Deploying to Vercel...
echo.

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Installing Vercel CLI...
    call npm install -g vercel
)

echo Running deployment...
call vercel --prod

echo.
echo [SUCCESS] Deployment complete!
echo [INFO] Your app should now be live on Vercel
goto END

:NETLIFY
echo.
echo [INFO] Deploying to Netlify...
echo.

REM Check if Netlify CLI is installed
where netlify >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Installing Netlify CLI...
    call npm install -g netlify-cli
)

echo Building project...
call npm run build

echo Deploying...
call netlify deploy --prod --dir=dist

echo.
echo [SUCCESS] Deployment complete!
echo [INFO] Your app should now be live on Netlify
goto END

:BUILD
echo.
echo [INFO] Building project...
echo.

call npm run build

echo.
echo [SUCCESS] Build complete!
echo [INFO] Your built files are in the 'dist' folder
echo.
echo Next steps:
echo 1. Go to https://app.netlify.com/drop
echo 2. Drag the 'dist' folder to deploy
echo 3. Or upload to your hosting provider
goto END

:GITHUB
echo.
echo [INFO] Deploying to GitHub Pages...
echo.

echo Installing gh-pages if needed...
call npm install -g gh-pages

echo Building project...
call npm run build

echo Deploying to GitHub Pages...
call npx gh-pages -d dist

echo.
echo [SUCCESS] Deployment complete!
echo [INFO] Your app should be live at: https://YOUR_USERNAME.github.io/medicare-app/
echo.
echo Make sure to enable GitHub Pages in your repository settings:
echo Settings -^> Pages -^> Source: gh-pages branch
goto END

:END
echo.
echo ======================================
echo   Thank you for using MediCare!
echo ======================================
echo.
pause
