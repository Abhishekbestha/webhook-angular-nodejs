@echo off
REM Frontend API Configuration Script (Windows)
REM This script helps configure the backend API URL for the frontend

echo.
echo 🚀 Webhook Frontend - API Configuration
echo ========================================
echo.

REM Check if dist folder exists
if not exist "dist\webhook-frontend" (
  echo ❌ Error: dist\webhook-frontend folder not found
  echo    Please run 'npm run build' first
  exit /b 1
)

REM Get backend URL from user
echo Enter your backend API URL (without /api suffix):
echo Examples:
echo   - https://your-backend.vercel.app
echo   - https://webhook-api.herokuapp.com
echo   - https://api.yourdomain.com
echo.
set /p BACKEND_URL="Backend URL: "

REM Validate URL is not empty
if "%BACKEND_URL%"=="" (
  echo ❌ Error: Backend URL cannot be empty
  exit /b 1
)

REM Remove trailing slash if present
if "%BACKEND_URL:~-1%"=="/" set BACKEND_URL=%BACKEND_URL:~0,-1%

REM Add /api suffix
set API_URL=%BACKEND_URL%/api

REM Create env.js file
(
echo (function(window^) {
echo   window.__env = window.__env ^|^| {};
echo   window.__env.apiUrl = '%API_URL%';
echo }(this^)^);
) > dist\webhook-frontend\env.js

echo.
echo ✅ Configuration complete!
echo.
echo 📝 Created: dist\webhook-frontend\env.js
echo 🔗 API URL: %API_URL%
echo.
echo Next steps:
echo 1. Deploy the frontend: vercel --prod
echo    OR: netlify deploy --prod --dir=dist/webhook-frontend
echo.
echo 2. Test the deployment by visiting your frontend URL
echo.
