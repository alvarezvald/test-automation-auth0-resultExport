#Can create a file with: op inject -i ./env/.env.prdAUE.tpl -o ./env/.env.prdAUE
#Can then set it as the selected environment with $env:test_env='prdAUE' (only sets the environment in that terminal instance)

USER_PREFERENCES = "op://QA Automation/User Preferences/username"
PASS_PREFERENCES = "op://QA Automation/User Preferences/password"

vald_environment = "production"