:: Optional argument passed in is environment (staging, release-candidate or production) %1
:: Using json file, assign PROM to a profile (if there is no 'In Progress' currently).

:: define where the code is
set repository=%USERPROFILE%\repos\test-automation
set vald_environment=%1

set formatdate=%date:~-4%%date:~7,2%%date:~4,2%
set PLAYWRIGHT_JUNIT_OUTPUT_NAME=log\%formatdate%-PROMs-assign.xml

:: Copy relevant file to the config file read by code
cd %repository%\src\dataGeneration
copy /Y teleHab-PROM-Assign-QA-PROMS-Automation.json teleHab-PROM-Assign.json

:: PROMs login
cd %repository%
call .\scripts\VALDHubLogin-PROMs.bat

call npx playwright test 2.1-promsAssign.test.ts --project=chromium
