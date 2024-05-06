import { test, expect } from '@playwright/test';
import { Login } from '@pageObjects/Login';
import { CommonElements } from '@pageObjects/CommonElements';
import { VALDConfig } from '@configuration/config';
import { LeftHandMenu } from '@pageObjects/LeftHandMenu';
import { Profiles } from '@pageObjects/Profiles';
import { ProfileIndividual } from '@pageObjects/ProfileIndividual';
import { Configuration } from '@pageObjects/Configuration';

const config = VALDConfig();
const url = config.urlValdHubLogin;
const configurationNoTeleHabTabList = ['Training', 'Drills'];
const profileTabList = ['Overview','Testing','Most Recent','Result Table'];
const actionsExpectedList = ['Print', 'Edit Details', 'Assign Groups'];

const profilesPageTileThreeDotMenuVCMUser = ['Edit Details', 'Assign Groups'];
const assignTrainingThreeDotMenuVCMUser = ['View', 'Edit', 'Duplicate'];

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
    process.env.USER_MODACCESS,
    process.env.PASS_MODACCESS,
    'QA Automation Performance'
  );
});

// cannot add tags to these tests as they require separate logins
test('Test 8.2.1 VCM and not-TH Profile access', async ({ page, }) => {
  const leftHandMenu = new LeftHandMenu(page);
  const profiles = new Profiles(page);
  const profile = new ProfileIndividual(page);

  console.log('START Test 8.2.1 VCM and not-TH Profile access');
  await leftHandMenu.clickProfiles();

  // three-dot menu on each tile of table
  await profiles.displayAsTileButton.click();
  await expect.soft(profiles.profileTileThreeDotMenu).toHaveCount(1)
  console.log(
    '  Check VCM User does not have access to Delete option in tile 3-dot menu'
  );

  // three-dot menu on tile should be...
  let threeDotMenuOptions: string[] = await
    profiles.getThreeDotMenuDropdownList();
  console.log(`  3-dot menu on profile tile is ${threeDotMenuOptions}`);
  expect.soft(threeDotMenuOptions).toEqual(profilesPageTileThreeDotMenuVCMUser);

  // Check profile individiual
  await leftHandMenu.clickProfiles();
  await profiles.goToIndividualProfilePage("QA Automation");

  // Check the tabs available - should be no TH tabs
  
  const tabList: string[] =
    await profile.getProfileTabOptions();
  console.log(`  Profile tab items are ${tabList}`);
  expect.soft(tabList).toEqual(profileTabList);

  // Actions dropdown should be print, edit and assign groups
  console.log(
    `  Check VCM User actions menu does not have delete`
  );
  let actionsOptions: string[] =
    await profile.getActionsDropdownList();
  console.log(`  Actions list is ${actionsOptions}`);

  expect.soft(actionsOptions).toEqual(actionsExpectedList);

});

test('Test 8.2.2 VCM (ForceFrame) Training access', async ({ page, }) => {
  const leftHandMenu = new LeftHandMenu(page);
  const configuration = new Configuration(page);
  // Management Group page does not have create or delete or rename group

  console.log(
    'START Test 8.2.2 VCM (ForceFrame) Training access'
  );
  await leftHandMenu.clickConfigurationMenuItem();
  await configuration.trainingTab.click();

  let dropdownListContents: string[] =
    await configuration.getTrainingTable3DotDropdownListOptions();
  console.log(`  3-dot menu items are ${dropdownListContents}`);
  
  expect.soft(dropdownListContents).toEqual(assignTrainingThreeDotMenuVCMUser);

});

test('Test 8.2.3 VCM user Configuration available tabs', async ({ page, }) => {
  const leftHandMenu = new LeftHandMenu(page);
  const configuration = new Configuration(page);
  // Management Group page does not have create or delete or rename group

  console.log(
    'START Test 8.2.3 VCM user Configuration available tabs'
  );
  await leftHandMenu.clickConfigurationMenuItem();

  const tabList: string[] =
    await configuration.getConfigurationTabOptions();
  console.log(`  Configuration tab items are ${tabList}`);
  
  expect.soft(tabList).toEqual(configurationNoTeleHabTabList);
});