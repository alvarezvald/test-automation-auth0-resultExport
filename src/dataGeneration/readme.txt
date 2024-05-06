The following files are used to generate data in VALD hub.
They are used to either assign surveys, fill out surveys or complete exercise programs.

File location for each environment is set in 
test-automation\src\configuration\configs  files.


=====================================================================================================================
Assign surveys files
=====================================================================================================================
teleHab-PROM-Assign-QA-PROMS-Automation.json  // data file for QA PROMS Automation
teleHab-PROM-Assign-QAHub23P.json             // data file for QA Hub 23P or QA Hub 2023(P)
teleHab-PROM-Assign.json                      // the actual file that is used by the program (this should be empty).

NOTE:  the data file is copied to the teleHab-PROM-Assign.json by a batch script before the code is run.

What it does: 
 1. Login to VALD Hub - the org that is opened is the one that is used.
 2. Read the teleHab-PROM-Assign.json.  
 3. For each Username (profile) check if that profile has an 'In Progress' survey.
 4. If it does not, then assign the PROM to it for the NumberOfSurveys defined.

JSON:
  {
    "Comment": "DESCRIPTOR",
    "Username": "username",
    "PROM": "HAGOS",    
    "NumberOfSurveys": "5"
  }

  where

  Comment : profile name perhaps
  Username : profile email
  PROM : the survey to assign to the profile
  NumberOfSurveys: surveys are assigned in a series, define how many

=====================================================================================================================
Program Perform
=====================================================================================================================
as defined by:
test-automation\src\configuration\configs  files.

teleHab-Program-Perform.json
teleHab-Program-Perform-staging.json

What it does:
1. Reads JSON file, opens a telehab client session and logs in as that client.
     eg. app.telehab.io
2. If there are programs scheduled for today, complete those programs

JSON:

  {
    "Comment": "QA Automation -staging",
    "Username": "email",
    "Password": "password",
  }

  where

  Comment : profile name perhaps or organisation
  Username : profile TH client Login
  Password : profile TH client password

=====================================================================================================================
Fill out surveys
=====================================================================================================================
as defined by:
test-automation\src\configuration\configs  files.

teleHab-PROM-Complete.json
teleHab-PROM-Complete-staging.json

What it does:
1. Reads JSON file, opens a telehab client session and logs in as that client.
     eg. app.telehab.io
2. If there are surveys scheduled for today, complete those surveys

JSON:

  {
    "Comment": "QA Hub 2023 (P)",
    "Username": "valdtestanalyst+diversedata@gmail.com",
    "Password": "",    
    "Answer": "last"
  }

  where

  Comment : profile name perhaps or organisation
  Username : profile TH client Login
  Password : profile TH client password
  Answer:  how to answer each the question. Can be
    "first" - select the first option for each survey question
    "last" - select the last option for each survey question
    "3" - for example, select the 3rd option for each survey question
    "random" - randomly select an answer for each survey question
    "increase" - over one series show an upward trend
    "decrease" - over one series show a downward trend
           