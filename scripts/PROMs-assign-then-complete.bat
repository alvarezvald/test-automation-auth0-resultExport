:: Optional argument passed in is environment (staging, release-candidate or production) %1

:: Using json file, assign PROM to a profile (if there is no 'In Progress' currently).
:: Using json file, login in as a TH profile and complete active PROMs
set repository=%USERPROFILE%\repos\test-automation

cd %repository%
call .\scripts\PROMs-Assign.bat %1

cd %repository%
call .\scripts\PROMS-Complete.bat %1




