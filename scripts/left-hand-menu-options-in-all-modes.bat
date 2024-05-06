:: Test left-hand menu option in hub is as expected.
:: Optional argument to pass in is environment (staging, release-candidate or production) %1
set formatdate=%date:~-4%%date:~7,2%%date:~4,2%
set PLAYWRIGHT_JUNIT_OUTPUT_NAME=log\%formatdate%-left-hand-menu.xml

:: define where the code is
set repository=%USERPROFILE%\repos\test-automation
set vald_environment=%1

:: standard login
cd %repository%
call .\scripts\VALDHubLogin-Automation.bat

call npx playwright test 1.1-leftHandMenuOptionsInAllModes.test.ts --workers=1 --project=chromium
