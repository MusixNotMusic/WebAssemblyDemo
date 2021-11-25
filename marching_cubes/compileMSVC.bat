@echo off
if /I "%1"=="x86" (set TARGET_ARCH=x86) else (set TARGET_ARCH=x64)
for /f "delims=" %%i in ('where /R "C:\Program Files (x86)" vcvarsall.bat') do set VCVARSALL="%%i"
call %VCVARSALL% %TARGET_ARCH%
@echo on
nmake TARGETP=%TARGET_ARCH% -f MakefileMSVC.mak
