:: Automation testing the availabiltity of Hub commands given certain logins
:: Optional argument is environment (staging, release-candidate or production) %1
set formatdate=%date:~-4%%date:~7,2%%date:~4,2%
set PLAYWRIGHT_JUNIT_OUTPUT_NAME=log\%formatdate%-access-view-only.xml

set repository=%USERPROFILE%\repos\test-automation
set vald_environment=%1

:: Automation login
cd %repository%
call .\scripts\VALDHubLogin-minimal-access.bat
call npx playwright test 8.1-accessViewOnly.test.ts --project=chromium --workers=1
