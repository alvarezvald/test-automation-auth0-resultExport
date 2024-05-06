:: Automation testing
:: Optional argument is environment (staging, release-candidate or production) %1
set formatdate=%date:~-4%%date:~7,2%%date:~4,2%

set repository=%USERPROFILE%\repos\test-automation
set vald_environment=%1

cd %repository%

:: Australia East
set vald_data_region=aue
set PLAYWRIGHT_JUNIT_OUTPUT_NAME=log\%formatdate%-api-team-payload-%vald_data_region%.xml

call npx playwright test 10.2-teams-response-payload.test.ts --project=chromium

:: Europe West
set vald_data_region=euw
set PLAYWRIGHT_JUNIT_OUTPUT_NAME=log\%formatdate%-api-team-payload-%vald_data_region%.xml
call npx playwright test 10.2-teams-response-payload.test.ts --project=chromium

:: United States East
set vald_data_region=use
set PLAYWRIGHT_JUNIT_OUTPUT_NAME=log\%formatdate%-api-team-payload-%vald_data_region%.xml
call npx playwright test 10.2-teams-response-payload.test.ts --project=chromium
