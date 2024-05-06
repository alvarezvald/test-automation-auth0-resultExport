:: QA HUB 23(P) is an test organisation used by QA
:: 
:: 
:: Setup PROMs data (this only runs in PRODUCTION)
:: Assign a PROM to profiles (if there is no 'In Progress' currently) as defined by json file.
:: Login in as a TH profile and complete active PROMs as defined by json file.

set formatdate=%date:~-4%%date:~7,2%%date:~4,2%

:: define where the code is
set repository=%USERPROFILE%\repos\test-automation
set vald_environment=production

:: Copy relevant file to the config file read by code
cd %repository%\src\dataGeneration
copy /Y teleHab-PROM-Complete-QAHub23P.json teleHab-PROM-Complete.json
copy /Y teleHab-PROM-Assign-QAHub23P.json teleHab-PROM-Assign.json

:: Use specific QA Hub 23(P) login
cd %repository%
call .\scripts\VALDHubLogin-QAHub23P.bat
set PLAYWRIGHT_JUNIT_OUTPUT_NAME=log\%formatdate%-PROMs-VALDHubDemo-Assign.xml
call npx playwright test 2.1-promsAssign.test.ts --project=chromium

set PLAYWRIGHT_JUNIT_OUTPUT_NAME=log\%formatdate%-PROMs-VALDHubDemo-Complete.xml
call npx playwright test 2.2-promsComplete.test.ts --project=chromium