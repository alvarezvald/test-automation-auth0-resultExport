:: Automation testing the login screen
:: Optional argument is environment (staging, release-candidate or production) %1
set formatdate=%date:~-4%%date:~7,2%%date:~4,2%
set PLAYWRIGHT_JUNIT_OUTPUT_NAME=log\%formatdate%-login.xml

set repository=%USERPROFILE%\repos\test-automation
set vald_environment=%1

:: Automation login
cd %repository%
call .\scripts\VALDHubLogin-Automation.bat

call npx playwright test 1.2-login.test.ts --workers=1


