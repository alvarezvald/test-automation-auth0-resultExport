import { test, expect } from '@playwright/test';
import { Login } from '@pageObjects/Login';
import { VALDConfig } from '@configuration/config';
import { Category } from '@pageObjects/Category';
import { CommonElements } from '@pageObjects/CommonElements';
import { LeftHandMenu } from '@pageObjects/LeftHandMenu';
import { Home } from '@pageObjects/Home';
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

test('3.1.1 Create category blank name validation @regression @category',
  async ({ page, }) => {
    console.log(
      'START Create category including blank category name validation'
    );
    const commonElements = new CommonElements(page);
    const leftHandMenu = new LeftHandMenu(page);
    const category = new Category(page);
    const home = new Home(page);

    await leftHandMenu.clickManagement();

    console.log('Open create Category popup');
    await category.createCategoryButton.click();

    // Did category popup show
    await expect(home.popupHeader).toHaveText('Create Category');

    // Check blank category name is not permitted
    console.log('Test create a category with blank name');
    await page.keyboard.press('Tab');
    await expect(category.createCategoryPopupErrorText).toHaveText(
      'Category name is required.'
    );
    await commonElements.clickCancelButton();

    // Enter category name and save it
    const testCategoryName = 'qa-category-' + random(10000, 99999);
    await category.createCategory(testCategoryName);
    console.log(`Test category saved ${testCategoryName}`);

    // Check the Page Header shows the name of the category
    await expect.soft(commonElements.pageHeader).toHaveText(testCategoryName);

    // Clean up - Delete the category
    await page.reload();
    await category.deleteCategory(testCategoryName);
  });

test('3.1.2 Create duplicate category @regression @category', async ({
  page,
}) => {
  console.log('START - Create duplicate category');

  const testCategoryName = 'qa-Category-' + random(10000, 99999);
  const commonElements = new CommonElements(page);
  const leftHandMenu = new LeftHandMenu(page);
  const category = new Category(page);

  //Go to Managment page, click create category again
  console.log('Test create duplicate category');
  await leftHandMenu.clickHome();
  await leftHandMenu.clickManagement();
  await category.createCategory(testCategoryName);
  console.log('Create category ', testCategoryName);

  // Try to create it again
  await leftHandMenu.clickHome();
  await leftHandMenu.clickManagement();
  await category.createCategoryButton.click();
  await category.categoryCreateNameInput.click();
  // Need to press slower for Chrome to register the input
  // and show the error message
  await category.categoryCreateNameInput.pressSequentially(testCategoryName, {delay: 100});
  await expect
    .soft(category.createCategoryPopupErrorText)
    .toHaveText('Category name already exists');

  //Check is the save button is active after inputting duplicate category
  await expect
    .soft(category.createCategoryPopupSaveButtonUnclickable)
    .toHaveCount(1);
  await commonElements.clickCancelButton();

  // Delete the category we just made
  await page.reload();
  await category.deleteCategory(testCategoryName);
});

test('3.1.3 Rename category @regression @category', async ({ page }) => {
  const testCategoryName = 'qa-cat-' + random(10000, 99999);
  const commonElements = new CommonElements(page);
  const leftHandMenu = new LeftHandMenu(page);
  const category = new Category(page);

  // Create a category
  await leftHandMenu.clickHome();
  await leftHandMenu.clickManagement();
  await category.createCategory(testCategoryName);
  console.log('Category created ', testCategoryName);

  // Check the Page Header shows the name of the category
  await expect.soft(commonElements.pageHeader).toHaveText(testCategoryName);

  //Category Change Name
  const renameCategoryName = `rn-${testCategoryName}`;
  await category.changeNameButton.click();
  await category.categoryNameInput.fill(''); //clears the field first
  await category.categoryNameInput.type(renameCategoryName);
  await commonElements.saveButton.click();

  await expect.soft(commonElements.pageHeader).toHaveText(renameCategoryName);
  console.log(`Category renamed to ${renameCategoryName}`)

  // Delete the category we just made
  await page.reload();
  await category.deleteCategory(renameCategoryName);
});
