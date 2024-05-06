import { test, expect, Page } from '@playwright/test';
import { Login } from '@pageObjects/Login';
import { CommonElements } from '@pageObjects/CommonElements';
import { VALDConfig } from '@configuration/config';
import { LeftHandMenu } from '@pageObjects/LeftHandMenu';
import { ProgramBuilder } from '@pageObjects/ProgramBuilder';
import { ProgramBuilderScheduler } from '@pageObjects/ProgramBuilderScheduler';
import { FlakyUtils, getPathSafeStringBasedOnDateTime } from 'utils/common';
import { ProfileIndividual } from '@pageObjects/ProfileIndividual';

const config = VALDConfig();
const url = config.urlValdHubLogin;

async function cleanupRowItem(page: Page, programName: string) {
  const profile = new ProfileIndividual(page);

  // WORKAROUND - FLAKINESS:
  // Context kebab menu and Delete dialog randomly either does not appear after click, OR are collapsed after made visible. This ensures we
  // reach the delete dialog and press Delete on the dialog

  //
  // Summon Delete dialog from kebab context menu
  //
  let retryCountKebab = 0; // Number of attempts to open dialog

  await expect(async () => {

    retryCountKebab++;

    let dialogVisible = false;
    const programRowItem = await page.getByRole('row').filter({ hasText: programName });
    const contextMenu = programRowItem.locator('button.btn.large.tertiary');
    // Click kebab menu
    await contextMenu.click({ timeout: 1000 });
    // Click delete button on kebab menu
    await page.getByRole('button', { name: 'Delete' }).click({ timeout: 1000 });
    // Ensure Delete dialog exists and is present for at least 5 seconds by verifying it is NOT hidden
    expect(await page.getByTestId('modal').count()).toBe(1);
    await profile.page.getByTestId('modal').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => dialogVisible = true);
    expect(dialogVisible).toBe(true);
  }).toPass({
    // Probe, wait 1s, probe, wait 2s, probe, wait 10s, probe, wait 10s, probe
    // ... Defaults to [100, 250, 500, 1000].
    intervals: [1_000, 3_000],
    timeout: 20_000 // for the toPass only, max time to attempt to pass expect block without non-retrying assertions e.g. expect(dialogVisible).toBe(true)
  });

  let retryCountDeleteDialog = 0;

  //
  // Press Delete on Delete dialog
  //
  await expect(async () => {
    retryCountDeleteDialog++;
    const modalDeleteButton = page.getByTestId('modal').getByRole('button', { name: 'Delete' });
    let dialogVisibleAfterClick = false;
    // Click delete on dialog
    await modalDeleteButton.click({ timeout: 1000 });
    // Ensure Delete dialog is dismissed
    await profile.page.getByTestId('modal').waitFor({ state: 'hidden', timeout: 2000 }).catch(() => dialogVisibleAfterClick = true);
    expect(dialogVisibleAfterClick).toBe(false);
  }).toPass({
    // Probe, wait 1s, probe, wait 2s, probe, wait 10s, probe, wait 10s, probe
    // ... Defaults to [100, 250, 500, 1000].
    intervals: [1_000],
    timeout: 20_000 // for the toPass only, max time to attempt to pass expect block without non-retrying assertions e.g. expect(dialogVisibleAfterClick).toBe(false)
  });

  console.debug(`Retry count - Kebab menu: ${retryCountKebab}, Delete dialog: ${retryCountDeleteDialog}`);
}

// Before each test datestamp it and report on test name
test.beforeEach(async ({ page }, testInfo) => {
  const login = new Login(page);
  console.log(Date());
  console.log(config);
  console.log(testInfo.title);
  //ensure a large screen to include all the tiles
  await page.setViewportSize({ width: 1500, height: 900 });
  await page.goto(url);
  await login.loginToHubWithOrganisationChange(
    process.env.USER_VALDAUTOMATION,
    process.env.PASS_VALDAUTOMATION,
    "QA Automation Performance"
  );
});

test(`4.2.1 Program builder create template @exercise @regression`, async ({ page }) => {
  const commonElements = new CommonElements(page);
  const leftHandMenu = new LeftHandMenu(page);
  const programBuilder = new ProgramBuilder(page);
  const scheduler = new ProgramBuilderScheduler(page);
  const templateName = `Autotest program - ${getPathSafeStringBasedOnDateTime()}`;
  const flakyUtils = new FlakyUtils(page);

  await test.step('Filter exercises', async () => {
    console.log('START 4.2.1 Program builder create template');
    // Go to program builder
    await leftHandMenu.clickProgramBuilderMenuItem();

    // Give Program Builder extra time to load the thumbnail images
    await expect(commonElements.pageHeader).toHaveText('Program Builder');

    // enter name of template to create
    await programBuilder.enterProgramName(templateName);
    await programBuilder.builderTilesPlusButton.first().click();

    // search for wall sit
    await programBuilder.searchForAnExercise.click();
    await programBuilder.searchForAnExercise.fill('wall sit');

    // check that the first 4 tiles have wall sit in the title
    for (let index = 0; index < 4; index++) {
      await expect(programBuilder.programTileTitle.nth(index)).toHaveText(
        /wall sit/gi,
      );
    }
  });

  await test.step('Create exercise program and validate', async () => {
    // add exercise to template
    await programBuilder.builderTilesPlusButton.first().click();
    await programBuilder.createTemplateButton.click();

    // Program builder modal scheduler appears
    await test.step('VALIDATION: on specific days, check that Monday to Friday is shown', async () => {
      // ON SPECIFIC DAYS, check that mon to fri is shown
      await page.getByTestId('frequencyMode').getByRole('combobox').selectOption('SpecificDays');
      await expect(scheduler.specificDaysMonday).toBeVisible();
      await expect(scheduler.specificDaysFriday).toBeVisible();
      // Select Tues and Thurs
      await scheduler.specificDaysTuesday.click();
      await scheduler.specificDaysThursday.click();
    });

    await test.step('VALIDATION: Every X days, check that sessions per day shows numbered dropdown', async () => {
      // EVERY X DAYS
      // check that sessions per day shows numbered dropdown
      await scheduler.selectFrequencyDayMode('Sessions per day');
      await expect(page.getByTestId('timesPerDay')).toBeVisible();
      await scheduler.selectTimesPerDay('24');
      await expect(
        page.locator('input[name="timesPerDay"][value="24"]'),
      ).toHaveCount(1);
    });

    await test.step('VALIDATION: if user types in 7 or 28 it highlights the 1 week button', async () => {
      // check that if you type in 7 or 28 it highlights 1 week button
      // or the 4 weeks button
      await scheduler.numberPickerInput.click();
      await scheduler.numberPickerInput.fill('7');
      await expect(scheduler.presetsSelectedButton).toHaveText('1 week');

      await scheduler.numberPickerInput.click();
      await scheduler.numberPickerInput.fill('28');
      await expect(scheduler.presetsSelectedButton).toHaveText('4 weeks');
    });

    await test.step('Create program', async () => {
      await scheduler.createButton.click();
      // Wait for page to save
      await commonElements.waitForSuccessPopup('Template successfully created');
      await expect(commonElements.pageHeader).toHaveText(templateName);
    });
  });

  await test.step('Cleanup', async () => {
    // await programBuilder.backToTemplatesLink.click();
    await flakyUtils.clickWaitForAnimationEnd(programBuilder.backToTemplatesLink);
    await programBuilder.searchTemplatesTextbox.fill(templateName);
    // Cleanup - delete program created by test
    const programRowItem = await page.getByRole('row').filter({ hasText: templateName });
    const contextMenu = programRowItem.locator('button.btn.large.tertiary');

    // Click kebab menu
    await flakyUtils.clickWaitForAnimationEnd(contextMenu);
    // Click delete button on kebab menu
    await page.getByRole('button', { name: 'Delete' }).click({ timeout: 1000 });
    // Click 'Confirm deletion?' button
    await page.getByRole('button', { name: 'Confirm deletion?' }).click({ timeout: 1000 });

    // Check row has been removed
    await expect(programRowItem).not.toBeVisible();
  });
});

test(`4.2.2 Program assign to profile @exercise @regression`, async ({ page }) => {
  const commonElements = new CommonElements(page);
  const leftHandMenu = new LeftHandMenu(page);
  const programBuilder = new ProgramBuilder(page);
  // Get unique program name so won't clash with previous test data from failed tests
  const programName = `Autotest program 2 - ${getPathSafeStringBasedOnDateTime()}`;
  const profileProgram = 'QA Automation';

  await test.step('Create program, assign and validate', async () => {

    console.log('START 4.2.2 Program assign to profile');

    await test.step('Create program and assign', async () => {

      // Go to program builder
      await leftHandMenu.clickProgramBuilderMenuItem();

      // Give Program Builder extra time to load the thumbnail images
      await expect(commonElements.pageHeader).toHaveText('Program Builder');

      // enter name of template
      await programBuilder.createAndAssignProgram(programName, profileProgram);
    });

    await test.step('Validate', async () => {
      // check that the profile program details page is displayed
      await expect(commonElements.pageHeader).toHaveText(programName);

      // return to profile overview page
      await programBuilder.backToProfileButton.click();

      // Can take extra time to load 
      await expect(commonElements.pageHeader).toHaveText(profileProgram);
    });
  });

  await test.step('Cleanup', async () => {
    // Cleanup - delete program created by test
    const programRowItem = await page.getByRole('row').filter({ hasText: programName });

    // FLAKY START
    await cleanupRowItem(page, programName);
    // FLAKY END

    // Check row has been removed
    await expect(programRowItem).not.toBeVisible();
  });
});

test(`4.2.3 Program builder create superset @exercise @regression`, async ({ page }) => {
  const commonElements = new CommonElements(page);
  const leftHandMenu = new LeftHandMenu(page);
  const programBuilder = new ProgramBuilder(page);
  const scheduler = new ProgramBuilderScheduler(page);
  const programName = `Autotest program SuperSet - ${getPathSafeStringBasedOnDateTime()}`;
  const profileProgram = 'QA Automation';

  await test.step('Create superset program, assign to profile with schedule and validate', async () => {
    console.log('START Program builder assign');

    await test.step('Create superset', async () => {
      // Go to program builder
      await leftHandMenu.clickProgramBuilderMenuItem();
      await expect(commonElements.pageHeader).toHaveText('Program Builder');
      // enter name of program
      await programBuilder.enterProgramName(programName);
      await programBuilder.searchForAnExercise.click();
      await programBuilder.searchForAnExercise.fill('dead bugs');
      await programBuilder.builderTilesPlusButton.first().click();
      await programBuilder.builderTilesPlusButton.nth(1).click();

      await programBuilder.addToSuperSetCheckbox.first().click();
      await programBuilder.addToSuperSetCheckbox.nth(1).click();
      await programBuilder.createSupersetButton.click();
    });

    await test.step('Assign superset to profile with schedule', async () => {

      await test.step('Select profile', async () => {
        await programBuilder.assignToProfileButton.click();
        await programBuilder.enterProfileSearchField(profileProgram);

        await programBuilder.profileSelectorTable.first().click();
      });

      await test.step('Create schedule', async () => {
        // Start Date
        await scheduler.startDateTomorrow.click();

        // DAILY
        // Program builder modale scheduler appears
        await page.getByTestId('frequencyMode').getByRole('combobox').selectOption('Daily');
        // check that when during the day is 'at no specific time'
        await expect(
          page.getByTestId('dayFrequencyMode').getByRole('combobox')
        ).toBeVisible();

        await scheduler.programDuration2Weeks.click();

        // Create and send program
        await scheduler.sendButton.click();
        // Wait for success popup to appear with text
        await commonElements.waitForSuccessPopup('Your program has been assigned. An email has been sent to ', 120000);
      });

      await test.step('Validate', async () => {
        await expect(commonElements.pageHeader).toHaveText(programName);
        await programBuilder.backToProfileButton.click();
        await expect(commonElements.pageHeader).toHaveText(profileProgram, { timeout: 60000 });
      });
    });

    await test.step('Cleanup', async () => {
      // Cleanup - delete superset created by test
      const programRowItem = await page.getByRole('row').filter({ hasText: programName });

      // FLAKY START
      await cleanupRowItem(page, programName);
      // FLAKY END

      // Check row has been removed
      await expect(programRowItem).not.toBeVisible();
    });
  });
});
