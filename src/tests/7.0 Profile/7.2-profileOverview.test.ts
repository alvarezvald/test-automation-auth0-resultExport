import { test, expect } from '@playwright/test';
import { Login } from '@pageObjects/Login';
import { CommonElements } from '@pageObjects/CommonElements';
import { VALDConfig } from '@configuration/config';
import { LeftHandMenu } from '@pageObjects/LeftHandMenu';
import { Profiles } from '@pageObjects/Profiles';

const config = VALDConfig();
const url = config.urlValdHubLogin;

// Before each test datestamp it and report on test name
test.beforeEach(async ({ page }, testInfo) => {
  const login = new Login(page);
  console.log(Date());
  console.log(config);
  console.log(testInfo.title);
  //ensure a large screen to include all the tiles
  await page.setViewportSize({ width: 1500, height: 1400 });
  await page.goto(url);
    await login.loginToHubWithOrganisationChange(
    process.env.USER_VALDAUTOMATION,
    process.env.PASS_VALDAUTOMATION,
    "QA Automation Performance"
  );
});

const dataFileName = String(config.profileOverviewFile);
const profilesToCheck = require(dataFileName);

for (const profileTest of profilesToCheck) {
  const email = profileTest.email;
  const emailBeforeAtSymbol = email.split('@');

  test(`Profile-overview-${emailBeforeAtSymbol[0]}`, async ({ page }) => {
    const commonElements = new CommonElements(page);
    const leftHandMenu = new LeftHandMenu(page);
    const profiles = new Profiles(page);

    //Change to the organisation with the profile
    await commonElements.changeOrganisation(profileTest.organisation);

    console.log(
      `START 7.2.1 Profile overview screenshot compare ${profileTest.email}`
    );

    // Go to Profiles page
    await leftHandMenu.clickHome();
    await leftHandMenu.clickProfiles();
    await expect(commonElements.pageHeader).toHaveText('Profiles');

    // Check if profile exists
    await profiles.verifyProfileExists(profileTest.fullname);
    console.log(`Profile exists: ${profileTest.email}`);

    // Open individual profile edit page
    await profiles.goToIndividualProfilePage(profileTest.email);
    await expect(commonElements.pageHeader).toHaveText(profileTest.fullname);
    
    // Compare screenshots - toHaveScreenshot should deal with animations, etc.
      // Clip/compare only section with tiles to avoid issues with image comparison fails due 
      // to pixel changes in the rest of the page
    await expect(page).toHaveScreenshot({ clip: { x: 268, y: 149, width: 1212, height: 1232 } });
  });
}
