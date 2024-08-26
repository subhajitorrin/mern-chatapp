@echo off
cd /d "%~dp0"

git add .

git commit -m "updates..."

git push -u origin main