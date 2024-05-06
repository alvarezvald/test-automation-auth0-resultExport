:: Automation testing 
:: Optional argument is environment (staging, release-candidate or production) %1
set formatdate=%date:~-4%%date:~7,2%%date:~4,2%

set repository=%USERPROFILE%\repos\test-automation
set vald_environment=%1

cd %repository%

:: aue euw use
:: Call for each region
:: AUSTRALIA EAST
set vald_data_region=aue
set PLAYWRIGHT_JUNIT_OUTPUT_NAME=log\%formatdate%-api-team-status-%vald_data_region%.xml

call npx playwright test 10.1-teams-status-code.test.ts --project=chromium

:: EUROPE WEST
set vald_data_region=euw
set PLAYWRIGHT_JUNIT_OUTPUT_NAME=log\%formatdate%-api-team-status-%vald_data_region%.xml

call npx playwright test 10.1-teams-status-code.test.ts --project=chromium

:: US EAST
set vald_data_region=use
set PLAYWRIGHT_JUNIT_OUTPUT_NAME=log\%formatdate%-api-team-status-%vald_data_region%.xml

call npx playwright test 10.1-teams-status-code.test.ts --project=chromium

