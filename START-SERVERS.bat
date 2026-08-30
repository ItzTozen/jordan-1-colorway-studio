@echo off
title Jordan 1 — Colorway Studio Servers
echo Starting both sites...
echo   Original : http://localhost:5173   (LAN: http://192.168.1.5:5173)
echo   V2 Minimal: http://localhost:5174   (LAN: http://192.168.1.5:5174)
echo Keep this window OPEN. Close it (or press Ctrl+C) to stop the sites.
cd /d "X:\Jordan 1 site"
start "Jordan1-Original-5173" cmd /k npm run dev
cd /d "X:\Jordan 1 site\new air jordan site"
start "Jordan1-V2-5174" cmd /k npm run dev
echo Both servers launched in separate windows.
pause
