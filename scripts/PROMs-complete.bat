:: Complete PROMS on profiles as defined in the json datafile.
:: Optional argument is environment (staging, release-candidate or production) %1
set formatdate=%date:~-4%%date:~7,2%%date:~4,2%
set PLAYWRIGHT_JUNIT_OUTPUT_NAME=log\%formatdate%-PROMs-complete.xml

:: define where the code is
set repository=%USERPROFILE%\repos\test-automation
set vald_environment=%1

:: Copy relevant file to the config file read by code
cd %repository%\src\dataGeneration
copy teleHab-PROM-Complete-All.json teleHab-PROM-Complete.json

cd %repository%

call npx playwright test 2.2-promsComplete.test.ts --project=chromium --workers=3