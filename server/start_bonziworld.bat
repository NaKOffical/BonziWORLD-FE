@echo off
cls
color f0
title BonziWORLD: Revived
echo Starting BonziWORLD
:a
node --stack-size=1200 index.js

cls
echo Unexpected crash, rebooting server
goto a