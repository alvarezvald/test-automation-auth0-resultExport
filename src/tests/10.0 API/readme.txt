The api calls rely on authorization to be already established.

Set windows environment variable vald_access_token to the bearer token
Set windows environment variable vald_environment to 'staging' or 'production'

Note:  do not include the word Bearer
eg.

$env:vald_environment staging
$env:vald_access_token <token>