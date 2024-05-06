import { Login } from '@pageObjects/Login';
import { VALDConfig } from '@configuration/config';
import { Category } from '@pageObjects/Category';
import { CategoryGroup } from '@pageObjects/CategoryGroup';
import { CommonElements } from '@pageObjects/CommonElements';
import { Configuration } from '@pageObjects/Configuration';
import { LeftHandMenu } from '@pageObjects/LeftHandMenu';
import { OrganisationManagement } from '@pageObjects/OrganisationManagement';
import { ProfileIndividual } from '@pageObjects/ProfileIndividual';
import { Profiles } from '@pageObjects/Profiles';
import { expect, test } from '@playwright/test';

const config = VALDConfig();
const url = config.urlValdHubLogin;
const threeDotExpectedList = ['View'];
const actionsExpectedList = ['Print'];

// Before each test datestamp it and report on test name
test.beforeEach(async ({ page }, testInfo) => {
  const commonElements = new CommonElements(page);
  const login = new Login(page);
  console.log(Date());
  console.log(config);
  console.log(testInfo.title);
  //ensure left hand menu is expanded
  await commonElements.resizeWindowToStandardSize();
  await page.goto(url);
  await login.loginUsernamePassword(
    process.env.USER_MINACCESS,
    process.env.PASS_MINACCESS);
});

// cannot add tags to these tests as they require separate logins
test('Test 8.1.1 VIEW ONLY Management access', async ({ page }) => {
  // Should not see the following tabs:
  // Users, Settings, Organisation and Integration from Management

  const leftHandMenu = new LeftHandMenu(page);
  const management = new OrganisationManagement(page);

  console.log('Test 8.1.1 VIEW ONLY Management access');
  await leftHandMenu.clickManagement();

  await expect.soft(management.tabUsers).toHaveCount(0);
  console.log('  VIEW ONLY Management USER tab is hidden');

  await expect.soft(management.tabSettings).toHaveCount(0);
  console.log('  VIEW ONLY Management SETTINGS tab is hidden');

  await expect.soft(management.tabOrganisation).toHaveCount(0);
  console.log('  VIEW ONLY Management ORGANISATION tab is hidden');

  await expect.soft(management.tabIntegration).toHaveCount(0);
  console.log('  VIEW ONLY Management INTEGRATION tab is hidden');
});

test('Test 8.1.2 VIEW ONLY Category access', async ({ page }) => {
  const leftHandMenu = new LeftHandMenu(page);
  const category = new Category(page);
  const group = new CategoryGroup(page);

  // Management Category page does not have Create Category or Delete Category or Change Name
  console.log('START Test 8.1.2 VIEW ONLY Category access');
  await leftHandMenu.clickManagement();
  console.log('  Management Category Page');

  await expect.soft(category.createCategoryButton).toHaveCount(0);
  console.log('  VIEW ONLY Category Create button is hidden');

  const rowThreeDotMenuOptions: string[] = await group.getThreeDotMenuDropdownList();
  expect.soft(rowThreeDotMenuOptions).toEqual(threeDotExpectedList);
  console.log('  VIEW ONLY Category dropdown list is correct');

  console.log('  Category Group Page -------');
  // Go to Category Group page
  await category.categoryFirstRowItem.click();
  await category.searchAndSelectCategory('VALD HQ');

  await expect.soft(group.deleteSelectedButton).toHaveCount(0);
  console.log('  VIEW ONLY Category delete button is hidden');

  await expect.soft(category.changeNameButton).toHaveCount(0);
  console.log('  VIEW ONLY Category change name button is hidden');

  await expect.soft(group.createGroupButton).toHaveCount(0);
  console.log('  VIEW ONLY Category create group button is hidden');
});

test('Test 8.1.3 VIEW ONLY Group access', async ({ page }) => {
  // Management Group page does not have create or delete or rename group

  const commonElements = new CommonElements(page);
  const leftHandMenu = new LeftHandMenu(page);
  const category = new Category(page);
  const group = new CategoryGroup(page);

  console.log('START Test 8.1.3 VIEW ONLY Group access');
  await leftHandMenu.clickManagement();
  await category.searchAndSelectCategory('VALD HQ');
  await group.groupFirstRowItem.click();

  await expect.soft(group.groupAssignProfileButton).toHaveCount(0);
  console.log('  VIEW ONLY Group Assign button is hidden');

  await expect.soft(group.groupDeleteButton).toHaveCount(0);
  console.log('  VIEW ONLY Delete group button is hidden');

  await expect.soft(group.changeNameButton).toHaveCount(0);
  console.log('  VIEW ONLY Rename Group button is hidden');

  await expect.soft(group.profileCheckbox).toHaveCount(0);
  console.log('  VIEW ONLY Check box on rows is hidden');
});

test('Test 8.1.4 VIEW ONLY Profile access', async ({ page }) => {
  const leftHandMenu = new LeftHandMenu(page);
  const commonElements = new CommonElements(page);
  const profiles = new Profiles(page);
  const profile = new ProfileIndividual(page);

  console.log('START Test 8.1.4 VIEW ONLY Profile access');
  await leftHandMenu.clickProfiles();

  await expect.soft(profiles.createProfileButton).toHaveCount(0);
  console.log('  VIEW ONLY Create Profile button is hidden from user');

  await expect.soft(profiles.bulkUploadButton).toHaveCount(0);
  console.log('  VIEW ONLY Bulk Profile Upload button is hidden from user');

  // three-dot menu on each row of table
  await profiles.displayAsTileButton.click();
  await expect.soft(profiles.profileTileThreeDotMenu).toHaveCount(0);
  console.log(
    '  VIEW ONLY Three-dot menu is hidden from user on Profiles (show-all) page'
  );

  // Open Individual Profile page
  await profiles.profileTileFirst.click();
  // wait for the profile to load before interagating it
  await commonElements.delay(3000);
  console.log('  Individual Profile Page -----------------------');

  // Actions dropdown should be print
  const actionsOptions: string[] = await profile.getActionsDropdownList();

  expect.soft(actionsOptions).toEqual(actionsExpectedList);
  console.log('  VIEW ONLY profile actions button is print');

  // Look for Assign Outcome Measures an Assign Education
  await expect.soft(profile.profilePROMSTab).toHaveCount(0);
  console.log('  VIEW ONLY Assign Outcome Measures tab is hidden');

  await expect.soft(profile.profileEductionTab).toHaveCount(0);
  console.log('  VIEW ONLY - Education tab is hidden');

  await expect.soft(profile.profileExerciseTab).toHaveCount(0);
  console.log('  VIEW ONLY - Exercise tab is hidden');
});

test('Test 8.1.5 VIEW ONLY Training access', async ({ page }) => {
  const leftHandMenu = new LeftHandMenu(page);
  const configuration = new Configuration(page);

  console.log('START 8.1.5 VIEW ONLY Training access');

  await leftHandMenu.clickConfigurationMenuItem();
  await expect(configuration.templatesTab).toHaveCount(0);
  console.log('  VIEW ONLY Assign Templates is hidden from user');

  await expect(configuration.educationTab).toHaveCount(0);
  console.log('  VIEW ONLY Education is hidden from user');

  const dropdownListContents: string[] = await configuration.getTrainingTable3DotDropdownListOptions();
  console.log(`3-dot menu items are ${dropdownListContents}`);
  expect(dropdownListContents).toStrictEqual(threeDotExpectedList);
});
