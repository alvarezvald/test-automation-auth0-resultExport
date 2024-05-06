:: Automation testing profile overview page
:: Optional argument is environment (staging, release-candidate or production) %1
set formatdate=%date:~-4%%date:~7,2%%date:~4,2%
set PLAYWRIGHT_JUNIT_OUTPUT_NAME=log\%formatdate%-profile-overview-tile-view-only.xml

set repository=%USERPROFILE%\repos\test-automation
set vald_environment=%1

:: Automation login - VIEW ONLY
cd %repository%
call .\scripts\VALDHubLogin-minimal-access-telehab.bat

call npx playwright test 7.3-profileOverviewTileOrdering.test.ts --project=chromium





