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

test('14.1.1 Create, Delete and Edit training program @trainingprogram @regression', async ({
    page,
}) => {
    const commonElements = new CommonElements(page);
    const randomInt = commonElements.getRandomInt(0, 10);
    const trainingProgram = 'Automation Training Program ' + randomInt;

    await test.step('Navigating to Configuration Tab from the left hand side menu', async () => {
        await page.getByRole('link', { name: 'Configuration' }).click();
        await page.getByRole('link', { name: 'Training' }).click();
    });

    // Click on create a training program
    await test.step('Create training program here', async () => {


        await page.getByLabel('Create Program').click();
        await page.getByRole('button', { name: 'Hip' }).click();
        await page.locator('div').filter({ hasText: /^Hip Abduction45°$/ }).getByRole('button').click();
        await page.getByTestId('close-button').click();
        await page.locator('div').filter({ hasText: /^Hip Abduction45°$/ }).getByRole('img').click();
        await page.getByTestId('labelWrapper-Laterality').locator('svg').click();
        await page.getByText('UnilateralAlternating', { exact: true }).click();
        await page.getByLabel('Add exercise to program').click();
        await page.getByPlaceholder('Enter name for program...').click();
        await page.getByPlaceholder('Enter name for program...').fill(trainingProgram);
        await page.getByLabel('Save Program').click();

    });

    await test.step('Validate the training program was created', async () => {
        await page.getByPlaceholder('Search').click();
        await page.getByPlaceholder('Search').fill(trainingProgram);
        expect(page.getByText(trainingProgram));
        console.log(trainingProgram);
    });


    await test.step('Delete the program that was recently created', async () => {
        await page.locator('tr').filter({ hasText: trainingProgram }).getByRole('button').first().click();
        await page.locator('tr').filter({ hasText: trainingProgram }).getByLabel('Delete').click();
        await page.getByTestId('modal').getByLabel('Delete').click();
    });


    await test.step('Validate that the recently created program was deleted', async () => {
        const locator = page.getByText(trainingProgram);
        await expect(locator).toHaveCount(0);
    })

    await test.step('Validate that a program can be successfully edited, and then deleted', async () => {

        const trainingProgramEdited = 'Edit Me'
        await page.getByLabel('Create Program').click();
        await page.getByRole('button', { name: 'Hip' }).click();
        await page.locator('div').filter({ hasText: /^Hip Adduction45°$/ }).getByRole('button').click();
        await page.getByTestId('close-button').click();
        await page.locator('div').filter({ hasText: /^Hip Adduction45°$/ }).getByRole('img').click();
        await page.getByTestId('labelWrapper-Laterality').locator('svg').click();
        await page.getByText('UnilateralAlternating', { exact: true }).click();
        await page.getByLabel('Add exercise to program').click();
        await page.getByPlaceholder('Enter name for program...').click();
        await page.getByPlaceholder('Enter name for program...').fill(trainingProgramEdited);
        await page.getByLabel('Save Program').click();

        await page.locator('tr').filter({ hasText: trainingProgramEdited }).getByRole('button').first().click();
        await page.locator('tr').filter({ hasText: trainingProgramEdited }).getByLabel('Edit').click();

        await page.getByPlaceholder('Enter name for program...').click();
        await page.getByPlaceholder('Enter name for program...').fill(trainingProgramEdited + ' Done Edited');
        await page.getByLabel('Save Program').click();


    });

    await test.step('Fifth step here / validate that the program was edited and then deletes the training program', async () => {

        const editedProgramToBeDeleted = 'Edit me Done Edited'
        await page.locator('tr').filter({ hasText: editedProgramToBeDeleted }).getByRole('button').first().click();
        await page.locator('tr').filter({ hasText: editedProgramToBeDeleted }).getByLabel('Delete').click();
        await page.getByTestId('modal').getByLabel('Delete').click();

    });
});