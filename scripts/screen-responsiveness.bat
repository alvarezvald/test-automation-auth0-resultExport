:: Screen shot each page in VALD hub so that it can be manually checked
:: Optional argument is environment (staging, release-candidate or production) %1
set formatdate=%date:~-4%%date:~7,2%%date:~4,2%
set PLAYWRIGHT_JUNIT_OUTPUT_NAME=log\%formatdate%-screen-responsiveness.xml

set repository=%USERPROFILE%\repos\test-automation
set vald_environment=%1

set formatdate=%date:~-4%%date:~7,2%%date:~4,2%

:: clear out screenshots first
cd %repository%\screenshots
del *.png

:: Automation login
cd %repository%
call .\scripts\VALDHubLogin-Automation.bat

call npx playwright test 5.1-screenResponsiveness.test.ts --project=chromium


