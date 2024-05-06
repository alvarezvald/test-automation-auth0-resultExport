import { Login } from '@pageObjects/Login';
import { VALDConfig } from '@configuration/config';
import { CommonElements } from '@pageObjects/CommonElements';
import { ProfileIndividual } from '@pageObjects/ProfileIndividual';
import { Profiles } from '@pageObjects/Profiles';
import { expect, test } from '@playwright/test';
import { EducationAssign } from '@pageObjects/EducationAssign';
import { FlakyUtils } from 'utils/common';
import { LeftHandMenu } from '@pageObjects/LeftHandMenu';
import { Configuration } from '@pageObjects/Configuration';

//
// Tests based on https://valdperformance.visualstudio.com/VALD/_workitems/edit/23668
//

const config = VALDConfig();
const url = config.urlValdHubLogin;
const profileUser = 'Automated Tests8.3'

// Before each test datestamp it and report on test name
test.beforeEach(async ({ page }, testInfo) => {
  const commonElements = new CommonElements(page);
  console.log(Date());
  console.log(config);
  console.log(testInfo.title);
  await commonElements.resizeWindowToStandardSize();
  await page.goto(url);
});

// Test for user with view, create, modify and delete Telehab permissions
test('8.3.1 User with VCMD Telehab permissions can access Education sections', async ({ page }) => {
  const login = new Login(page);
  const profiles = new Profiles(page);
  const profile = new ProfileIndividual(page);
  const education = new EducationAssign(page);
  const LHM = new LeftHandMenu(page);
  const configuration = new Configuration(page);
  const flakyUtils = new FlakyUtils(page);

  await test.step('Login to QA Automation Health', async () => {
    await login.loginToHubWithOrganisationChange(
      process.env.USER_VALDAUTOMATION,
      process.env.PASS_VALDAUTOMATION,
      'QA Automation Health');
  });

  // Assert education tab exist, button on education page, and can assign education
  await test.step('Can access Profile > Education tab and education elements on profile', async () => {
    await test.step(`Go to profile page for "${profileUser}"`, async () => {
      await profiles.goToIndividualProfilePage(profileUser);
    });
    await expect(profile.profileEductionTab, 'Profile > Education tab is visible').toBeVisible();
    await profile.profileEductionTab.click();
    // Assign Education button available - center screen
    await expect(profile.assignEducationButton, 'Profile > Assign Education button is visible in list area').toBeVisible();
    // Open Actions menu
    await profile.profileActionsButton.click();
    // Assign Education button available - actions menu
    await expect(profile.actionsAssignEducationButton, 'Profile > Action menu > Assign Education button is visible').toBeVisible();
  });

  await test.step('Can access Configuration > Education tab', async () => {
    // Goto Configuration section
    await LHM.clickConfigurationMenuItem();
    // Expect Education tab to be visible
    await expect(configuration.educationTab, 'Configuration > Education tab is visible').toBeVisible();

    // Goto Education tab and validate present
    await configuration.educationTab.click();
    // Validate footer shows multiple items
    await expect(page.locator('div').filter({ hasText: /^1 - 10 of .* items$/ }).first(), 'Education tab page has footer listing items').toBeVisible();

    // Search for 'CT Scan'
    await education.searchEducation('CT Scan');
    // Can see row item
    await expect(page.getByRole('row').filter({ hasText: 'CT Scan' }), 'CT Scan row is listed').toBeVisible();
    // Click on Preview button and wait for slide-out animation to finish
    await flakyUtils.clickWaitForAnimationEnd(education.previewButton);
    // Check for Education item detail page
    await expect(page.getByRole('dialog').filter({ has: page.getByRole('heading', { name: 'CT Scan' }) }), 'On Preview button click, "CT Scan" heading is present i.e. slide-out dialog is shown').toBeVisible();
  });
});

// Test for user with NO Telehab permissions
test('8.3.2 User with NO Telehab permissions CANNOT access Education sections', async ({ page }) => {
  const login = new Login(page);
  const profiles = new Profiles(page);
  const profile = new ProfileIndividual(page);
  const LHM = new LeftHandMenu(page);
  const configuration = new Configuration(page);

  await test.step('Login to QA Automation Health', async () => {
    await login.loginToHubWithOrganisationChange(
      process.env.USER_MINACCESS,
      process.env.PASS_MINACCESS,
      'QA Automation Health');
  });

  await test.step('Can NOT access Profile > Education tab', async () => {
    await test.step(`Go to profile page for "${profileUser}"`, async () => {
      await profiles.goToIndividualProfilePage(profileUser);
    });
    await expect(profile.profileEductionTab, 'Education tab NOT shown on profile').not.toBeVisible();
    // Open Actions menu
    await profile.profileActionsButton.click();
    // Assign Education button NOT available - actions menu
    await expect(profile.actionsAssignEducationButton, 'Assign Education button NOT shown on Actions menu').not.toBeVisible();
  });

  await test.step('Can NOT access Configuration > Education tab', async () => {
    // Goto Configuration section
    await LHM.clickConfigurationMenuItem();
    // Expect Education tab NOT to be visible
    await expect(configuration.educationTab, 'Education tab NOT shown in Configuration area').not.toBeVisible();
  });
});