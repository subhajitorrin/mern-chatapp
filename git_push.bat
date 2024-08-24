@echo off
cd /d "%~dp0"

git add .

git commit -m "Conversation processing"

git push -u origin main

pause
