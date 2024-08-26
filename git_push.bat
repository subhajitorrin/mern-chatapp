@echo off
cd /d "%~dp0"

git add .

git commit -m "Working on socket..."

git push -u origin main