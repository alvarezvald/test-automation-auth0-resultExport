import { test, expect } from '@playwright/test';
import { Login } from '@pageObjects/Login';
import { CommonElements } from '@pageObjects/CommonElements';
import { VALDConfig } from '@configuration/config';


const config = VALDConfig();
const url = config.urlValdHubLogin;

test.beforeEach(async ({ page }) => {
    const login = new Login(page);
    const commonElements = new CommonElements(page);

    //ensure left hand menu is expanded
    await commonElements.resizeWindowToStandardSize();
    await page.goto(url);
    await commonElements.clickGoToLoginPageButton();
    await login.loginUsernamePassword(
        process.env.USER_EDITTEST,
        process.env.PASS_EDITTEST,
    );
});

test('15.1.1 Create a leaderboard on VALD Hub @trainingprogram @regression', async ({
    page,
}) => {

    await test.step('Navigating to Configuration Tab from the left hand side menu', async () => {
        await page.getByRole('link', { name: 'Dashboard' }).click();

        await page.getByLabel('Close').click();
        await page.locator('header svg').nth(1).click();
        await page.getByRole('button', { name: 'Leaderboard' }).click();
        await page.getByLabel('Create Leaderboard').click();
        await page.getByPlaceholder('Enter Leaderboard Name').click();
        await page.getByPlaceholder('Enter Leaderboard Name').fill('Test Leaderboard');
        await page.getByTestId('testTypeId').locator('svg').click();
        await page.getByTestId('testTypeId').locator('svg').click();
        await page.getByTestId('testTypeId').locator('svg').click();
        await page.getByText('Countermovement Rebound Jump', { exact: true }).click();
        await page.getByTestId('metricId').locator('svg').click();
        await page.getByText('First Flight Time', { exact: true }).click();
        await page.locator('div:nth-child(2) > .react-select > .react-select__control > .react-select__value-container > .react-select__input-container').click();
        await page.locator('#react-select-3-option-6').click();
        await page.getByTestId('leaderboard-configuration-form').getByLabel('Create').click();
        await page.getByLabel('Back to Leaderboard').click();
        await page.getByText('Test Leaderboard').click();
        await page.getByLabel('Edit').click();
        await page.getByPlaceholder('DD/MM/YYYY').click();
        await page.getByText('‹').click();
        await page.getByText('›').click();
        await page.getByText('22').click();
        await page.getByLabel('Save').click();
        await page.getByLabel('Edit').click();
        await page.getByTestId('close-button').click();
        await page.getByLabel('Back to Leaderboard').click();
        await page.getByTestId('actions-dropdown').getByRole('button').first().click();
        await page.getByLabel('Delete').click();
        await page.getByTestId('modal').getByLabel('Delete').click();

    });

    await test.step('Create training program here', async () => {

    });

    await test.step('Validate the training program was created', async () => {

    });

});