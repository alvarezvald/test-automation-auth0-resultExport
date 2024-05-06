:: Assigns education for profile
:: Optional argument is environment (staging, release-candidate or production) %1
set formatdate=%date:~-4%%date:~7,2%%date:~4,2%
set PLAYWRIGHT_JUNIT_OUTPUT_NAME=log\%formatdate%-education-assign.xml

:: define where the code is
set repository=%USERPROFILE%\repos\test-automation
set vald_environment=%1

cd %repository%
call .\scripts\VALDHubLogin-Automation.bat

call npx playwright test 6.1-educationAssign.test.ts --project=chromium