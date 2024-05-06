:: Optional argument to pass in is environment (staging, release-candidate or production) %1
set formatdate=%date:~-4%%date:~7,2%%date:~4,2%
set PLAYWRIGHT_JUNIT_OUTPUT_NAME=log\%formatdate%-exercise-complete.xml

:: using a json file of TeleHab profile logins, complete their exercise programs
set repository=%USERPROFILE%\repos\test-automation
set vald_environment=%1

cd %repository%
call npx playwright test teleHabExercisePrograms.test.ts --project=chromium --headed --workers=1


