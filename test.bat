::@echo off

start /wait cmd /k Call g.bat
::start /b cmd /k Call server.bat
start cmd /k Call server.bat
start "Chrome" chrome --new-window http://localhost:8080/examples/natureofcode/
exit