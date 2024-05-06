:: Complete PROMS on profiles as defined in the json datafile.
:: Optional argument passed in is environment (staging, release-candidate or production) %1
set formatdate=%date:~-4%%date:~7,2%%date:~4,2%
set PLAYWRIGHT_JUNIT_OUTPUT_NAME=log\%formatdate%-group.xml

:: define where the code is
set repository=%USERPROFILE%\repos\test-automation
set vald_environment=%1

:: Standard automation login
cd %repository%
call .\scripts\VALDHubLogin-Automation.bat

call npx playwright test 3.2-managementGroup.test.ts --project=chromium --workers=1