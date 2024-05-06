import { test, expect } from '@playwright/test';
import { Login } from '@pageObjects/Login';
import { VALDConfig } from '@configuration/config';
import { Category } from '@pageObjects/Category';
import { CategoryGroup } from '@pageObjects/CategoryGroup';
import { CommonElements } from '@pageObjects/CommonElements';
import { LeftHandMenu } from '@pageObjects/LeftHandMenu';
import { ProfileAssignGroup } from '@pageObjects/ProfileAssignGroup';
import { random } from 'lodash';

const config = VALDConfig();
const url = config.urlValdHubLogin;

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
  await login.loginToHubWithOrganisationChange(
    process.env.USER_VALDAUTOMATION,
    process.env.PASS_VALDAUTOMATION,
    "QA Automation Performance"
  );
});

test('3.2.1 Create @regression @category @group', async ({
  page,
}) => {
  const commonElements = new CommonElements(page);
  const leftHandMenu = new LeftHandMenu(page);
  const category = new Category(page);
  const randomNumber = random(10000, 99999);
  const testCategory1 = 'TestCategory-A-' + randomNumber;
  const testGroup1 = 'TestGroup-A-' + randomNumber;
  const testGroup2 = 'TestGroup-B-' + randomNumber;

  // Go to Management page
  await leftHandMenu.clickManagement();
  console.log('Management page');

  //Create a category
  console.log(`Test create category ${testCategory1}`);
  await category.createCategory(testCategory1);
  // Check the Page Header shows the name of the category
  await expect.soft(commonElements.pageHeader).toHaveText(testCategory1);

  // Create a group from the category details page
  console.log(`Test create group ${testGroup1}`);
  await category.createGroupInCategory(testGroup1, testCategory1);

  // Now we are on the Group details page (listing profiles)
  // Check that a group was created - the Page Header shows the name of the group
  await expect.soft(commonElements.pageHeader).toHaveText(testGroup1);
  await page.reload();
  await category.searchAndSelectCategory(testCategory1);

  // Check for duplicate group
  console.log('Test that user cannot create a duplicate group in a category');
  await category.createGroupButton.click();

  await category.groupCreateNameInput.click();
  await category.groupCreateNameInput.type(testGroup1);
  await page.keyboard.press('Tab');
  await expect
    .soft(category.createCategoryPopupErrorText)
    .toHaveText('Group name already present in category.');
  await commonElements.clickCancelButton();
  console.log('Group duplicated checked');

  // Create a second group in the category
  console.log(`Test creating a second group ${testGroup2}`);
  await category.createGroupInCategory(testGroup2, testCategory1);

  // Check that a group was created - the Page Header shows the name of the group
  await expect.soft(commonElements.pageHeader).toHaveText(testGroup2);

  //Clean up lets get out of here
  await category.deleteCategory(testCategory1);
});

test('3.2.2 Rename @regression @category @group', async ({ page }) => {  
  const commonElements = new CommonElements(page);
  const leftHandMenu = new LeftHandMenu(page);
  const category = new Category(page);
  const group = new CategoryGroup(page);
  const randomNumber = random(10000, 99999);
  const testCategory1 = 'TestCategory-A-' + randomNumber;
  const testGroup1 = 'TestGroup-A-' + randomNumber;
  const testGroup2 = 'TestGroup-B-' + randomNumber;

  // Go to Management page
  await leftHandMenu.clickManagement();
  console.log('Management page');

  //Create a category
  console.log(`Test create category ${testCategory1}`);
  await category.createCategory(testCategory1);
  // Check the Page Header shows the name of the category
  await expect.soft(commonElements.pageHeader).toHaveText(testCategory1);

  // Create a group from the category details page
  console.log(`Test create group ${testGroup1}`);
  
  await category.createGroupInCategory(testGroup1, testCategory1);
  await expect.soft(commonElements.pageHeader).toHaveText(testGroup1);

  // Create a second group in the category
  console.log(`Test creating a second group: ${testGroup2}`);
  await page.reload();
  await category.searchAndSelectCategory(testCategory1);
  await category.createGroupInCategory(testGroup2, testCategory1);
  await expect.soft(commonElements.pageHeader).toHaveText(testGroup2);

  // Open second group
  await category.searchAndSelectGroup(testGroup2);

  // Rename group
  const testGroup2Renamed = `Renamed-${testGroup2}`;
  console.log(`Test rename group ${testGroup2} to ${testGroup2Renamed}`);
  await group.changeGroupName(testGroup2Renamed);
  // Check the Page Header shows the name of the group
  await expect.soft(commonElements.pageHeader).toHaveText(testGroup2Renamed);

  // Delete group
  console.log('Delete category: ' + testCategory1);
  await page.reload();
  await category.deleteCategory(testCategory1);  
});

test('3.2.3 Move @regression @category @group', async ({
  page,
}) => {
  const commonElements = new CommonElements(page);
  const leftHandMenu = new LeftHandMenu(page);
  const category = new Category(page);
  const randomNumber = random(10000, 99999);
  const testCategory1 = 'TestCategory-A-' + randomNumber;
  const testCategory2 = 'TestCategory-B-' + randomNumber;
  const testGroup1 = 'TestGroup-A-' + randomNumber;
  const testGroup2 = 'TestGroup-B-' + randomNumber;

  // Go to Management page
  await leftHandMenu.clickManagement();
  console.log('Management page');

  //Create a category
  console.log(`Test create category ${testCategory1}`);
  await category.createCategory(testCategory1);
  // Check the Page Header shows the name of the category
  await expect.soft(commonElements.pageHeader).toHaveText(testCategory1);

  // Create a group from the category details page
  console.log(`Test create group ${testGroup1}`);
  await category.createGroupInCategory(testGroup1, testCategory1);
  await expect.soft(commonElements.pageHeader).toHaveText(testGroup1);

  // Create a second group in the category
  console.log(`Test creating a second group: ${testGroup2}`);
  await page.reload();
  await category.searchAndSelectCategory(testCategory1)
  await category.createGroupInCategory(testGroup2, testCategory1);
  await expect.soft(commonElements.pageHeader).toHaveText(testGroup2);

  console.log('Test move groups between categories');
  // Create another category
  await leftHandMenu.clickManagement();

  //Create a category
  console.log(`Test create category ${testCategory2}`);
  await category.createCategory(testCategory2);
  // Check the Page Header shows the name of the category
  await expect.soft(commonElements.pageHeader).toHaveText(testCategory2);

  // Move group testGroup2 to testCategory 2 (from one category to another)
  await page.reload();
  await category.searchAndSelectCategory(testCategory1)
  await commonElements.delay(1000);
   
  // Select the checkbox of the first group
  await category.groupCheckboxFirstRow.click();
  await category.groupMoveButton.click();

  // Move the group to the second category
  await category.groupMoveCategoryDropdownInput.click();
  await category.groupMoveCategoryDropdownInput.fill(testCategory2);
  await page.keyboard.press('Tab');
  await category.groupMovePopupMoveButton.click();

  // Validate that the group was moved to the other category
  await page.reload();
  await category.searchAndSelectCategory(testCategory1);
  await expect.soft(category.groupRow).toHaveCount(1);

  await category.searchAndSelectCategory(testCategory2);
  await expect.soft(category.groupRow).toHaveCount(1);

  //Clean up lets get out of here
  console.log (`Delete category ${testCategory1}`)
  await category.deleteCategory(testCategory1);
  console.log (`Delete category ${testCategory2}`);  
  await category.deleteCategory(testCategory2);
});

test('3.2.4 Profile @regression @category @group', async ({ page }) => {

  console.log('Test 1.4.4 - Assign and move profiles to a group.')
  const commonElements = new CommonElements(page);
  const leftHandMenu = new LeftHandMenu(page);
  const category = new Category(page);
  const group = new CategoryGroup(page);
  const assignProfile = new ProfileAssignGroup(page);

  const randomNumber = random(10000, 99999);
  const testCategory1 = 'TestCategory-A-' + randomNumber;
  const testGroup1 = 'TestGroup-A-' + randomNumber;

  // Go to Management page
  await leftHandMenu.clickManagement();
  console.log('Management page');

  //Create a category
  console.log(`Test create category ${testCategory1}`);
  await category.createCategory(testCategory1);
  // Check the Page Header shows the name of the category
  await expect.soft(commonElements.pageHeader).toHaveText(testCategory1);

  // Create a group from the category details page
  console.log(`Test create group ${testGroup1}`);
  await category.createGroupInCategory(testGroup1, testCategory1);
  await expect.soft(commonElements.pageHeader).toHaveText(testGroup1);

  // Add some profiles to the group
  console.log('---Test assign profiles to group: ' + testGroup1);
  await group.groupAssignProfileButton.click();

  for (let i = 0; i < 5; i++) {
    await assignProfile.profileRow.nth(i).click();
    await commonElements.delay(1000);  // give assign time to save 
  }
  await assignProfile.doneButton.click();

  await page.reload();
  await category.searchAndSelectCategory(testCategory1)
  await expect(group.groupNumberOfProfiles).toHaveText("5")

  await category.deleteCategory(testCategory1)
})

test('3.2.5 Move, remove profiles @regression @category @group', async ({ page }) => {

  console.log('Test 1.4.4 - Assign and move profiles to a group.')
  const commonElements = new CommonElements(page);
  const leftHandMenu = new LeftHandMenu(page);
  const category = new Category(page);
  const group = new CategoryGroup(page);
  const assignProfile = new ProfileAssignGroup(page);

  const randomNumber = random(10000, 99999);
  const testCategory1 = 'TestCategory-A-' + randomNumber;
  const testCategory2 = 'TestCategory-B-' + randomNumber;
  const testGroup1 = 'TestGroup-A-' + randomNumber;
  const testGroup2 = 'TestGroup-B-' + randomNumber;

  // Go to Management page
  await leftHandMenu.clickManagement();

  //Create a category
  console.log(`Create category ${testCategory1}`);
  await category.createCategory(testCategory1);
  // Check the Page Header shows the name of the category
  await expect.soft(commonElements.pageHeader).toHaveText(testCategory1);

  // Create a group from the category details page
  console.log(`Create group ${testGroup1}`);  
  await category.createGroupInCategory(testGroup1, testCategory1);
  await expect.soft(commonElements.pageHeader).toHaveText(testGroup1);

  //Create a category
  await leftHandMenu.clickManagement();
  console.log(`Create category ${testCategory2}`);
  await category.createCategory(testCategory2);
  // Check the Page Header shows the name of the category
  await expect.soft(commonElements.pageHeader).toHaveText(testCategory2);

  // Create a group from the category details page
  console.log(`Create group ${testGroup2}`);  
  await category.createGroupInCategory(testGroup2, testCategory2);
  await expect.soft(commonElements.pageHeader).toHaveText(testGroup2);

  // Add some profiles to the group
  await group.groupAssignProfileButton.click();

  for (let i = 0; i < 5; i++) {
    await assignProfile.profileRow.nth(i).click();
    await commonElements.delay(1000);  // give assign time to save 
  }
  await assignProfile.doneButton.click();

  // Move multiple profiles from a group
  console.log('---Test move profiles from a group');
  for (let i = 0; i < 3; i++) {
    await group.profileCheckbox.nth(i).click();
  }

  await group.moveSelectedButton.click();
  console.log(`Move profiles from group: ${testGroup2} to group ${testGroup1}`);
  await page.locator('div.react-select__indicators.css-1wy0on6').nth(1).click();
  await page.locator('label.select-label').getByText(testGroup1).click();
  await group.moveButton.click();

  // Verify the profile count is 3
  await page.reload();
  await category.searchAndSelectCategory(testCategory1)
  await expect.soft(group.groupNumberOfProfiles.first()).toHaveText("3")

  // Check that they moved
  // Verify the profile count is 2
  await category.searchAndSelectCategory(testCategory2)
  await expect.soft(group.groupNumberOfProfiles.first()).toHaveText("2")

  // Remove single profile from a group
  //===========================================================================
  console.log(`--Test remove a profile from group: ${testGroup2}`);
  await category.searchAndSelectGroup(testGroup2)
  await group.profileCheckbox.first().click();
  await group.removeSelectedButton.click();
  await group.removeProfilesPopupYesButton.click();

  // Verify the profile count is 1
  await page.reload();
  await category.searchAndSelectCategory(testCategory2)
  await expect(group.groupNumberOfProfiles).toHaveText("1")

  // Cleanup
  await category.deleteCategory(testCategory1)
  await category.deleteCategory(testCategory2)
});
