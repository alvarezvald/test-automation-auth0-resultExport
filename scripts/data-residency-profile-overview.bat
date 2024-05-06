:: Automation testing profile overview page
:: Optional argument is environment (staging, release-candidate or production) %1
set formatdate=%date:~-4%%date:~7,2%%date:~4,2%
set PLAYWRIGHT_JUNIT_OUTPUT_NAME=log\%formatdate%-data-residency-profile-overview.xml

set repository=%USERPROFILE%\repos\test-automation
set vald_environment=%1

:: Automation login
cd %repository%
call .\scripts\VALDHubLogin-Automation.bat

call npx playwright test 9.1-profileOverviewAustraliaEast.test.ts --workers=4
call npx playwright test 9.2-profileOverviewEastUS.test.ts --workers=4
call npx playwright test 9.3-profileOverviewWestEurope.test.ts --workers=4



