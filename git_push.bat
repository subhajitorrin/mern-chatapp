@echo off
cd /d "%~dp0"

git add .

git commit -m "Responsive done..."

git push -u origin main