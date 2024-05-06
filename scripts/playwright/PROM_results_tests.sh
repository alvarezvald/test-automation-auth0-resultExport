# $1 - PROM_TEST
# $2 - PROM_TYPE
# $3 - PROM_ACTION

set -e  # Stop script execution on error

# Validate parameters
if [ -z "$1" ]; then
  echo "PROM_TEST is not set. Exiting."
  exit 1
fi

if [ -z "$2" ]; then
  echo "PROM_TYPE is not set. Exiting."
  exit 1
fi

if [ -z "$3" ]; then
  echo "PROM_ACTION is not set. Exiting."
  exit 1
fi

# Set parameters to relevant variable names
promTest="$1"
promType="$2"
promAction="$3"

promIdString="$promTest-$promType-$promAction"

numberOfWorkers=2  # Initial number of workers

if [ "$promAction" = "Complete" ]; then  # Use a single = for comparison
    numberOfWorkers=4  # Increase workers if  action is "Complete"
fi

set -x  # Enable command echoing

# Assign report path using command-line arguments
export PLAYWRIGHT_HTML_REPORT="./playwright-report/$promTest/$promType-$promAction"

set +e  # Disable exit on error, since we want to handle the error ourselves
(
# Run Playwright tests, assuming Playwright is installed
npx playwright test \
    --grep "(?=.*@data_generation)(?=.*@$promTest)(?=.*@$promType)(?=.*@proms_$promAction)" \
    --project=chromium \
    --workers $numberOfWorkers \
)
test_exit_code=$? # Store the exit code of the tests for more granular error handling

set -e  # Re-enable exit on error
set +x  # Disable command echoing to reduce spam from below

# Handle success/failure
if [[ $test_exit_code -eq 0 ]]; then # Test success
  echo "TEST_RESULTS=$TEST_RESULTS<result>$promIdString:pass" >> $GITHUB_ENV
else  # Test failure
  echo "Playwright test failed for PROMs $promIdString"

  # Provide a more informative error message
  echo "TEST_RESULTS=$TEST_RESULTS<result>$promIdString:fail" >> $GITHUB_ENV
  # Output to step console
  echo "Test failed $promIdString! Exit code: $test_exit_code"
fi

# Test results job will process failed tests
exit 0
