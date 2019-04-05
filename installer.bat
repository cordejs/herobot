@ECHO off
TITLE HeroBot Installer for Windows
SET root=%~dp0
CD /D %root%
SET "rootdir=%cd%"
SET "installtemp=%root%herobotTemp\"
IF EXIST "%installtemp%" ( RMDIR "%installtemp%" /S /Q >nul 2>&1)
timeout /t 5
node --version >nul 2>&1 || GOTO :node
git --version >nul 2>&1 || GOTO :git
:start
MKDIR "%root%herobotTemp"
CD /D "%installtemp%"
ECHO Downloading herobot...
ECHO.
git clone -b master --recursive --depth 1 --progress https://github.com/lucasgmagalhaes/herobot.git >nul
IF %ERRORLEVEL% EQU 128 (GOTO :errorgit)
TITLE Installing Node modules..
ECHO.
npm install >nul 2>&1
ECHO Modules installed..Cleaning up..
ECHO.
IF EXIST "%root%herobot\" (GOTO :removedirec) ELSE (GOTO :copydirec)
:removedirec
    RMDIR "%root%herobot\" /S /Q >nul 2>&1
    ROBOCOPY "%root%herobotTemp" "%rootdir%" /E /MOVE >nul 2>&1
    IF %ERRORLEVEL% GEQ 8 (GOTO :copyerror)
    GOTO end
:copydirec
    ROBOCOPY "%root%herobotTemp" "%rootdir%" /E /MOVE >nul 2>&1
    IF %ERRORLEVEL% GEQ 8 (GOTO :copyerror)
    GOTO end
:git
	TITLE Error!
	ECHO Git not found, please download here: https://git-scm.com/download/win
	ECHO Press any key to exit.
	PAUSE >nul 2>&1
	CD /D "%root%"
	GOTO :EOF    
:node
	TITLE Error!
	ECHO Node not found, please download Node v8 (the latest) here: https://nodejs.org/en/download/current/
	ECHO Press any key to exit.
	PAUSE >nul 2>&1
	CD /D "%root%"
	GOTO :EOF
:errorgit
	ECHO.
	ECHO Git clone failed, retrying..
	RMDIR "%installtemp%" /S /Q >nul 2>&1
	GOTO :start
:copyerror
	TITLE Copying Error!
	ECHO.
	ECHO An error in copying data has been encountered: %ERRORLEVEL%
	ECHO.
	ECHO Ensure you are running the installer as ADMINISTRATOR.
	PAUSE >nul 2>&1
	CD /D "%root%"
	GOTO :EOF
:end
    TITLE HeroBot Installation complete! Edit config.json and follow the README to finish
    ECHO All files should be in the root directory in a folder called herobot
	CD /D "%root%"
	RMDIR /S /Q "%installtemp%" >nul 2>&1
	ECHO.
	ECHO Installation complete!
	ECHO.
	timeout /t 5
	del installer.bat