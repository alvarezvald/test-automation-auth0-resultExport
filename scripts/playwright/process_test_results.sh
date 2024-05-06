# Process test results and fail job as required.
# Generate test summary report on main job page

# Assuming TEST_RESULTS is populated with entries separated by <result>

# Replace '<result>' with actual newlines to simplify parsing.
# This is safe to do since we're temporarily changing it for parsing purposes.
TEST_RESULTS=$(echo "$TEST_RESULTS" | sed 's/<result>/\n/g')

# Save the old IFS value to restore later
OLD_IFS="$IFS"

# Change IFS to newline to correctly iterate over lines
IFS=$'\n'
exit_code=0

# Create a summary table for job summary test results through
# the $GITHUB_STEP_SUMMARY env variable. Additionaly, output basic
# text results to the job console
echo "| Test | Result |" >> $GITHUB_STEP_SUMMARY
echo "| --- | --- |" >> $GITHUB_STEP_SUMMARY

# Loop through each line in TEST_RESULTS
for result in $TEST_RESULTS; do
    # Extract the promIdString part and the test result (pass/fail) using the colon as delimiter
    promIdString=$(echo "$result" | cut -d ':' -f 1 | xargs)
    testResult=$(echo "$result" | cut -d ':' -f 2 | xargs)

    # Check the test result and output accordingly
    if [[ "$testResult" == "pass" ]]; then
        # Output to job summary table
        echo "| $promIdString | :white_check_mark: pass |" >> $GITHUB_STEP_SUMMARY
        # Output to job console
        echo "$promIdString - pass" 
    elif [[ "$testResult" == "fail" ]]; then
        # Output to job summary table
        echo "| $promIdString | :x: fail |" >> $GITHUB_STEP_SUMMARY
        # Output to job console
        echo "$promIdString - fail" 
        exit_code=1 # at least one test has failed
    fi
done

# Restore the original IFS
IFS="$OLD_IFS"

if [[ $exit_code -ne 0 ]]; then
    # At least one test failed in the job
    echo "::error::One or more Playwright tests have failed. Check the job logs for more details. Exit code: $exit_code"
else
    echo "Playwright tests have passed."
fi

# Exit code of non-zero here fails entire job
exit $exit_code