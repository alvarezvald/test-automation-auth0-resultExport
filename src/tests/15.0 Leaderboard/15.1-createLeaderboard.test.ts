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
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await page.getByLabel('Close').click();
    await page.locator('header svg').nth(1).click();
    await page.getByRole('button', { name: 'Leaderboard' }).click();
    await page.getByLabel('Create Leaderboard').click();
    await page.getByPlaceholder('Enter Leaderboard Name').click();
    await page.getByPlaceholder('Enter Leaderboard Name').fill('ForceDecks Leaderboard Automation');
    await page.locator('.stack > .select-container > .final-form-field-container > .final-form-field > .form-field-input > .react-select > .react-select__control > .react-select__value-container > .react-select__input-container').click();
    await page.getByText('Countermovement Jump', { exact: true }).click();
    await page.locator('.stack > div:nth-child(2) > .final-form-field-container > .final-form-field > .form-field-input > .react-select > .react-select__control > .react-select__value-container > .react-select__input-container').click();
    await page.getByText('Contraction Time', { exact: true }).click();
    await page.getByTestId('leaderboard-configuration-form').getByLabel('Create').click();

    // Click on back to view all leaderboards
    await page.getByText('Back to Leaderboard').click();
    await page.getByText('ForceDecks Leaderboard', { exact: true }).isVisible();

    await test.step('Create training program here', async () => {

    });

    await test.step('Validate the training program was created', async () => {

    });

});
