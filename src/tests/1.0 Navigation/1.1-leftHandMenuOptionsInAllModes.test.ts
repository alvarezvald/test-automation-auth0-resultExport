import { test } from '@playwright/test';
import { CommonElements } from '../../pageObjects/CommonElements';
import { ClinicModeLeftHandMenu, GroupModeLeftHandMenu, LeftHandMenu } from '../../pageObjects/LeftHandMenu';
import { OrganisationManagement } from '../../pageObjects/OrganisationManagement';
import { VALDConfig } from '../../configuration/config'
import { Login } from '@pageObjects/Login'

const config = VALDConfig();
const url = config.urlValdHubLogin;

// Disable paralell mode - there is some playwright crossover between
// the tests causing errors (because of caching)
// This test must be run in SERIAL

// Before each test datestamp it and report on test name
test.beforeEach(async ({ page }, testInfo) => {

  const commonElements = new CommonElements(page);
  const login = new Login(page);
  console.log(Date());
  console.log(config);
  //ensure left hand menu is expanded
  await commonElements.resizeWindowToStandardSize();
  await page.goto(url)
  await login.loginToHubWithOrganisationChange(
    process.env.USER_VALDAUTOMATION,
    process.env.PASS_VALDAUTOMATION,
    "QA Automation Performance"
  );

});


test('1.1.1 Test Scan menu from Hub @navigation', async ({ page }) => {

  const commonElements = new CommonElements(page);
  const managementSettings = new OrganisationManagement(page);
  const leftHandMenu = new LeftHandMenu(page);

  let organisationClinicModeLeftHandMenuItems: string[] = [];

  console.log('CLINIC MODE - HUB');
  await managementSettings.setMode('Clinical');
  console.log('\r\nHUB Clinical Management Mode');
  await leftHandMenu.clickHome();
  organisationClinicModeLeftHandMenuItems = await ListItemsInLeftHandMenu(page);
  commonElements.verifyListsMatch(organisationClinicModeLeftHandMenuItems, ClinicModeLeftHandMenu);
  console.log(organisationClinicModeLeftHandMenuItems);

  let organisationGroupModeLeftHandMenuItems: string[] = [];

  console.log('GROUP MODE - HUB')
  await managementSettings.setMode('Group');
  console.log('\r\nHUB Group Management Mode - apply to organisation');
  organisationGroupModeLeftHandMenuItems = await ListItemsInLeftHandMenu(page);
  await leftHandMenu.clickHome();
  commonElements.verifyListsMatch(organisationGroupModeLeftHandMenuItems, GroupModeLeftHandMenu);
  console.log(organisationGroupModeLeftHandMenuItems);

});

test('1.1.2 Test Scan menu from TeleHab @navigation', async ({ page }) => {

  const managementSettings = new OrganisationManagement(page);
  const leftHandMenu = new LeftHandMenu(page);
  const commonElements = new CommonElements(page);

  let organisationClinicModeLeftHandMenuItems: string[] = [];

  let organisationGroupModeLeftHandMenuItems: string[] = [];
  console.log('GROUP MODE - TELEHAB')
  await managementSettings.setMode('Group');
  console.log('\r\nTELEHAB Group Management Mode - apply to organisation');
  // Make sure we are in telehab url
  await leftHandMenu.clickProgramBuilderMenuItem();
  await commonElements.delay(3000);
  organisationGroupModeLeftHandMenuItems = await TeleHabListItemsInLeftHandMenu(page);
  console.log(organisationGroupModeLeftHandMenuItems);
  commonElements.verifyListsMatch(organisationGroupModeLeftHandMenuItems, GroupModeLeftHandMenu);

  console.log('CLINIC MODE - TELEHAB')
  await managementSettings.setMode('Clinical');
  console.log('\r\nTELEHAB Clinical Management Mode - apply to organisation');
  // Make sure we are in telehab url
  await leftHandMenu.clickProgramBuilderMenuItem();
  await commonElements.delay(3000);  
  organisationClinicModeLeftHandMenuItems = await TeleHabListItemsInLeftHandMenu(page);
  console.log(organisationClinicModeLeftHandMenuItems);
  commonElements.verifyListsMatch(organisationClinicModeLeftHandMenuItems, ClinicModeLeftHandMenu);

});

async function ListItemsInLeftHandMenu(page) {
  const leftHandMenuItems = page.locator('ul.flex.flex-col>li');
  let leftHandMenuLocator = 'ul.flex.flex-col>li>a>div>div>p';
  const menuOptions: string[] = [];
  const leftHandMenuCount = await leftHandMenuItems.count();

  for (let i = 0; i < leftHandMenuCount; i++) {
    if (await page.locator(leftHandMenuLocator).nth(i).count() > 0) {
      menuOptions.push(await page.locator(leftHandMenuLocator).nth(i).textContent());
    }
  }
  return menuOptions;
}

async function TeleHabListItemsInLeftHandMenu(page) {
  const leftHandMenuItems = page.locator('div.navigation-item-contents');
  let leftHandMenuLocator = 'div.navigation-item-contents>p';
  const menuOptions: string[] = [];
  const leftHandMenuCount = await leftHandMenuItems.count();

  for (let i = 0; i < leftHandMenuCount; i++) {
    if (await page.locator(leftHandMenuLocator).nth(i).count() > 0) {
      menuOptions.push(await page.locator(leftHandMenuLocator).nth(i).textContent());
    }
  }
  return menuOptions;
}