import { test, expect } from '@playwright/test';
import { Login } from '@pageObjects/Login';
import { CommonElements } from '@pageObjects/CommonElements';
import { VALDConfig } from '@configuration/config';
import { ReportResultsExport } from '@pageObjects/ReportResultsExport';

const config = VALDConfig();
const url = config.urlValdHubLogin;

test.beforeEach(async ({ page }) => {
    const login = new Login(page);
    const commonElements = new CommonElements(page);

    //ensure the left hand menu is expanded
    await commonElements.resizeWindowToStandardSize();
    await page.goto(url);
    await commonElements.clickGoToLoginPageButton();
    await login.loginUsernamePassword(
        process.env.USER_EDITTEST,
        process.env.PASS_EDITTEST,
    );
});

test('13.1.1 Change a Hip IR/ER test to Hip Add/Abd @resultsExport @regression', async ({
    page,
}) => {

    const commonElements = new CommonElements(page);
    const reportResultsExport = new ReportResultsExport(page);

    await test.step('Navigating to ForceFrame in the VALD Systems tab', async () => {
        await page.getByRole('link', { name: 'VALD Systems' }).click();
        await page.getByRole('link', { name: 'ForceFrame' }).click();
    });

    // Setting the date to where the Hip IR/ER data was recorded
    await test.step('Find Hip IR/ER test', async () => {
        await commonElements.setDateFrom('DD/MM/YYYY', '01/01/2024');
        await commonElements.setDateTo('DD/MM/YYYY', '29/02/2024');

        const programRowItem = await page.getByRole('row').filter({ hasText: '1 Prince' });
        await programRowItem.getByText('Hip IR/ER').first().click();
    });

    await test.step('Change the Hip IR/ER test to Hip Add/Abd test', async () => {
        await page.getByTestId('forceframe-detailed-test-view').getByLabel('Edit test').click();
        await page.getByTestId('labelWrapper-Test Type').locator('svg').click();
        await page.getByTestId('labelWrapper-Test Type').getByText('Hip Add/Abd', { exact: true }).click();
        await page.getByLabel('Save').click();
        await reportResultsExport.validateForceFrameTest('ForceFrame');
    });

    await test.step('Change the Hip Add/Abd test back to Hip IR/ER test', async () => {

        const programRowItem = await page.getByRole('row').filter({ hasText: '1 Prince' });
        programRowItem.getByText('Hip Ad/Ab').first().click();

        await page.getByTestId('forceframe-detailed-test-view').getByLabel('Edit test').click();
        await page.getByTestId('labelWrapper-Test Type').locator('svg').click();
        await page.getByTestId('labelWrapper-Test Type').getByText('Hip IR/ER', { exact: true }).click();
        await page.getByLabel('Save').click();
    });
});


test('13.1.2 Edit ForceFrame test and profile simultaneously - Alvarez Shoulder IR/ER to Derrick Rose Hip IR/ER @resultsExport @regression', async ({
    page,
}) => {

    const commonElements = new CommonElements(page);
    const reportResultsExport = new ReportResultsExport(page);

    await test.step('Navigating to ForceFrame in the VALD Systems tab', async () => {
        await page.getByRole('link', { name: 'VALD Systems' }).click();
        await page.getByRole('link', { name: 'ForceFrame' }).click();
    });

    // Isolating a date range for specific test
    await test.step('Find a Shoulder IR/ER test', async () => {
        // Change date for only when ShoulderIR/ER is displayed, from date, date to to only show this test
        await commonElements.setDateFrom('DD/MM/YYYY', '01/01/2024');
        await commonElements.setDateTo('DD/MM/YYYY', '29/02/2024');

        const programRowItem = await page.getByRole('row').filter({ hasText: 'Alvarez' }).filter({ hasText: 'ShoulderIR/ER' });

        await programRowItem.click();
    });

    await test.step('Change the Shoulder IR/ER test to a Hip IR/ER test and change profile from Alvarez to Derrick Rose', async () => {
        await page.getByTestId('forceframe-detailed-test-view').getByLabel('Edit test').click();
        await page.getByTestId('labelWrapper-Test Type').locator('svg').click();
        await page.getByTestId('labelWrapper-Test Type').getByText('Hip IR/ER', { exact: true }).click();

        // Add profile change here, to Derrick Rose along with the change of Shoulder IR/ER to Hip IR/ER
        await page.getByTestId('labelWrapper-Profile').locator('svg').click();
        await page.getByText('Derrick Rose', { exact: true }).click();


        await page.getByLabel('Save').click();
        await reportResultsExport.validateForceFrameTest('ForceFrame');
    });

    await test.step('Change test and profile back to Shoulder IR/ER and Alvarez', async () => {

        const programRowItem = await page.getByRole('row').filter({ hasText: 'DerrickRose' });
        await programRowItem.getByText('Hip IR/ER').first().click();

        await page.getByTestId('forceframe-detailed-test-view').getByLabel('Edit test').click();
        await page.getByTestId('labelWrapper-Test Type').locator('svg').click();
        await page.getByTestId('labelWrapper-Test Type').getByText('Shoulder IR/ER', { exact: true }).click();
        await page.getByTestId('labelWrapper-Profile').locator('svg').click();
        await page.getByText('Alvarez EXT', { exact: true }).click();
        await page.getByLabel('Save').click();
    });
});

test('13.1.3 Edit NordBord test type, keeping profile the same on Abigail Nash @resultsExport @regression', async ({
    page,
}) => {

    const commonElements = new CommonElements(page);
    const reportResultsExport = new ReportResultsExport(page);

    await test.step('Navigating to NordBord in the VALD Systems tab', async () => {
        await page.getByRole('link', { name: 'VALD Systems' }).click();
        await page.getByRole('link', { name: 'NordBord' }).click();
    });

    await test.step('Find Nordic test', async () => {
        await commonElements.setDateFrom('DD/MM/YYYY', '08/08/2023');
        await commonElements.setDateTo('DD/MM/YYYY', '29/02/2024');
        await reportResultsExport.validateNordBordTest('NordBord');
    });

    await test.step('Change a Nordic test to a Razor test', async () => {

        const programRowItem = await page.getByRole('row').filter({ hasText: 'Nash Edit' });
        await programRowItem.getByText('Nordic').first().click();

        await page.getByTestId('nordbord-detailed-test-view').getByLabel('Edit test').click();
        await page.getByTestId('labelWrapper-Test Type').locator('svg').click();
        await page.getByTestId('labelWrapper-Test Type').getByText('Razor', { exact: true }).click();
        await page.getByLabel('Save').click();
    });

    await test.step('Change the Razor test back to an Nordic test', async () => {
        const programRowItem = await page.getByRole('row').filter({ hasText: 'Nash Edit' });
        programRowItem.getByText('Razor').first().click();

        await page.getByTestId('nordbord-detailed-test-view').getByLabel('Edit test').click();
        await page.getByTestId('labelWrapper-Test Type').locator('svg').click();
        await page.getByTestId('labelWrapper-Test Type').getByText('Nordic', { exact: true }).click();
        await page.getByLabel('Save').click();
    });
});

test('13.1.4 Change the ISO test to a Nordic test and change profile from Alvarez EXT to Derrick Rose, then revert the changes @resultsExport @regression', async ({
    page,
}) => {

    const commonElements = new CommonElements(page);
    const reportResultsExport = new ReportResultsExport(page);

    await test.step('Navigating to NordBord in the VALD Systems tab', async () => {
        await page.getByRole('link', { name: 'VALD Systems' }).click();
        await page.getByRole('link', { name: 'NordBord' }).click();
    });

    await test.step('Find the ISO test that belongs to the profile: Alvarez EXT', async () => {
        await commonElements.setDateFrom('DD/MM/YYYY', '01/01/2024');
        await commonElements.setDateTo('DD/MM/YYYY', '15/03/2024');

        const programRowItem = await page.getByRole('row').filter({ hasText: 'Alvarez' }).filter({ hasText: 'ISO' }).first();
        await expect(programRowItem).toBeVisible();
        await programRowItem.getByText('ISO 30').first().click();
    });

    await test.step('Search for the Nordic test under Derrick Rose', async () => {
        await page.getByTestId('nordbord-detailed-test-view').getByLabel('Edit test').click();
        await page.getByTestId('labelWrapper-Test Type').locator('svg').click();
        await page.getByTestId('labelWrapper-Test Type').getByText('Nordic', { exact: true }).click();
        await page.getByTestId('labelWrapper-Profile').locator('svg').click();
        await page.getByText('Derrick Rose', { exact: true }).click();
        await page.getByLabel('Save').click();
        await reportResultsExport.validateNordBordTest('NordBord');
    });

    await test.step('Change the Nordic test and profile back to ISO 30 and Alvarez EXT', async () => {

        const programRowItem = await page.getByRole('row').filter({ hasText: 'DerrickRose' }).filter({ hasText: "Nordic" }).filter({ hasText: "2024" });
        await programRowItem.first().click();

        await page.getByTestId('nordbord-detailed-test-view').getByLabel('Edit test').click();
        await page.getByTestId('labelWrapper-Test Type').locator('svg').click();
        await page.getByTestId('labelWrapper-Test Type').getByText('ISO 30', { exact: true }).click();
        await page.getByTestId('labelWrapper-Profile').locator('svg').click();
        await page.getByText('Alvarez EXT', { exact: true }).click();
        await page.getByLabel('Save').click();
        await reportResultsExport.validateNordBordTest('NordBord');
    });
});

test('13.1.5 Validate ForceFrame Testing training session page is displayed on VALD Hub with at least one Training session upload @resultsExport @regression', async ({
    page,
}) => {

    await test.step('Navigating to ForceFrame in the VALD Systems tab', async () => {
        await page.getByRole('link', { name: 'VALD Systems' }).click();
        await page.getByRole('link', { name: 'ForceFrame' }).click();
    });

    const commonElements = new CommonElements(page);
    const reportResultsExport = new ReportResultsExport(page);

    await page.getByText('Training').click();
    await reportResultsExport.validateForceFrameTest('ForceFrame');
    await commonElements.setDateFrom('DD/MM/YYYY', '08/08/2023');
    await commonElements.setDateTo('DD/MM/YYYY', '29/02/2024');

    const programRowItem = page.getByRole('row').filter({ hasText: 'ForceFrame Testing' }).first();
    await expect(programRowItem, "Confirming we can see ForceFrame Training Mode session named ForceFrame Testing").toBeVisible();
});

test('13.1.6 Validate ForceFrame trace is displayed on VALD Hub Results Export by checking the trace as at least a 3 second trace @resultsExport @regression', async ({
    page,
}) => {

    const commonElements = new CommonElements(page);

    await test.step('Navigating to ForceFrame in the VALD Systems tab', async () => {
        await page.getByRole('link', { name: 'VALD Systems' }).click();
        await page.getByRole('link', { name: 'ForceFrame' }).click();
    });

    await test.step('Find a Random ForceFrame test and expect trace using the Time locator', async () => {

        const testTypes = ['Neck', 'Hip', 'Ankle'];
        await commonElements.setDateFrom('DD/MM/YYYY', '01/01/2024');
        await commonElements.setDateTo('DD/MM/YYYY', '28/03/2024');

        let randomTestType = commonElements.getRandomInt(0, 2);
        await page.getByText(testTypes[await randomTestType]).first().click();
        expect(page.locator('svg').filter({ hasText: 'Time [s]0123' }), "Confirming the trace is at least 3 seconds long to ensure it's a valid ForceFrame trace");
        const badText = 'Time [s]0.00Force';
        const runtimeText = await page.locator('.chart-container').textContent();
        await expect(runtimeText, 'Checks for the trace to have numbers that have valid seconds on the X axis which will validate a trace').not.toContain(badText);
    });
});

test('13.1.7 Validate NordBord trace is displayed on VALD Hub Results Export by checking the trace as at least a 3 second trace @resultsExport @regression', async ({
    page,
}) => {

    const commonElements = new CommonElements(page);

    await test.step('Navigating to NordBord in the VALD Systems tab', async () => {
        await page.getByRole('link', { name: 'VALD Systems' }).click();
        await page.getByRole('link', { name: 'NordBord' }).click();
    });

    const testTypes = ['Nordic', 'Razor', 'ISO'];
    await commonElements.setDateFrom('DD/MM/YYYY', '01/01/2024');
    await commonElements.setDateTo('DD/MM/YYYY', '23/03/2024');

    await test.step('Find a Random NordBord test and expect trace using the Time locator', async () => {
        let randomTestType = commonElements.getRandomInt(0, 2);
        await page.getByText(testTypes[(await randomTestType).toFixed()]).first().click();
        const badText = 'Time [s]0.00Force';
        const runtimeText = await page.locator('.chart-container').textContent();
        await expect(runtimeText, 'Checks for the trace to have numbers that have valid seconds on the X axis which will validate a trace').not.toContain(badText);
    });
});

