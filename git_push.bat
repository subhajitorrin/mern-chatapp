@echo off
cd /d "%~dp0"

git add .

git commit -m "Working on conversations..."

git push -u origin main

pause
