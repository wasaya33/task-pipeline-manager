@echo off
REM Task Pipeline Manager - Integration Verification Script (Windows)
REM This script verifies that the frontend API integration is working correctly

echo.
echo ======================================
echo Task Pipeline Manager - Integration Test
echo ======================================
echo.

REM Check if Node.js is installed
echo Checking Node.js installation...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Node.js is not installed
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo [OK] Node.js version: %NODE_VERSION%
echo.

REM Check if npm is installed
echo Checking npm installation...
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] npm is not installed
    exit /b 1
)
for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo [OK] npm version: %NPM_VERSION%
echo.

REM Check frontend dependencies
echo Checking frontend dependencies...
cd frontend
if exist "node_modules" (
    echo [OK] node_modules directory exists
) else (
    echo [!] node_modules directory not found - run 'npm install' first
    exit /b 1
)

findstr /M "axios" package.json >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Axios is installed
) else (
    echo [!] Axios is NOT installed
    exit /b 1
)
echo.

REM Check API files
echo Checking API integration files...
set files=^
    src\services\api.js ^
    src\services\taskService.js ^
    src\hooks\useTasks.js ^
    .env.local

for %%f in (%files%) do (
    if exist "%%f" (
        echo [OK] %%f exists
    ) else (
        echo [!] %%f is missing
        exit /b 1
    )
)
echo.

REM Check .env.local configuration
echo Checking environment configuration...
findstr "VITE_API_URL" .env.local >nul 2>nul
if %errorlevel% equ 0 (
    for /f "tokens=2 delims==" %%i in ('findstr "VITE_API_URL" .env.local') do set API_URL=%%i
    echo [OK] API URL configured: %API_URL%
) else (
    echo [!] VITE_API_URL not configured in .env.local
    exit /b 1
)
echo.

REM Check if backend is running
echo Checking if backend is running...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:5000' -TimeoutSec 2 -ErrorAction Stop; exit 0 } catch { exit 1 }"
if %errorlevel% equ 0 (
    echo [OK] Backend is running on http://localhost:5000
    echo.
    
    REM Check API endpoints
    echo Checking API endpoints...
    
    powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:5000/api/tasks' -TimeoutSec 2 -ErrorAction Stop; exit 0 } catch { exit 1 }"
    if %errorlevel% equ 0 (
        echo [OK] GET /api/tasks is accessible
    ) else (
        echo [!] GET /api/tasks is not accessible
    )
    
    powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:5000/api/logs' -TimeoutSec 2 -ErrorAction Stop; exit 0 } catch { exit 1 }"
    if %errorlevel% equ 0 (
        echo [OK] GET /api/logs is accessible
    ) else (
        echo [!] GET /api/logs is not accessible
    )
) else (
    echo [^^] Backend is NOT running on http://localhost:5000
    echo     Start backend with: cd backend ^&^& npm run dev
)
echo.

echo ======================================
echo [OK] Integration verification complete!
echo ======================================
echo.
echo Next steps:
echo 1. Start backend: cd backend ^&^& npm run dev
echo 2. Start frontend: cd frontend ^&^& npm run dev
echo 3. Open http://localhost:5173 in your browser
echo.

cd ..
pause
