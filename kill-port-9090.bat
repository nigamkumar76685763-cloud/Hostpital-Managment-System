@echo off
echo ===================================================
echo Killing any process using Port 9090...
echo ===================================================

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :9090') do (
    echo Found Process ID: %%a on port 9090. Terminating...
    taskkill /F /PID %%a
)

echo.
echo Port 9090 is now completely free!
echo ===================================================
pause
