import { test, expect } from '@playwright/test';
import { Login } from '@pageObjects/Login';
import { CommonElements } from '@pageObjects/CommonElements';
import { VALDConfig } from '@configuration/config';
import { Profiles } from '@pageObjects/Profiles';
import { ProfileIndividual } from '@pageObjects/ProfileIndividual';

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
  const listOfTiles: string[] = profileTest.tiles;

  test(`7.3-Profile-overview-${emailBeforeAtSymbol[0]}`, async ({ page }, testInfo) => {

    // List known failing tests but allow tests to run and complete
    if(testInfo.title === '7.3-Profile-overview-6tiles'){
      console.warn("7.3-Profile-overview-6tiles currently is known failing test: \n6 completed tiles should NOT create a new row");
    }

    const commonElements = new CommonElements(page);
    const profiles = new Profiles(page);
    const profile = new ProfileIndividual(page);

    //Change to the organisation with the profile
    await commonElements.changeOrganisation(profileTest.organisation);

    console.log(
      `START 7.3-Profile overview tile check view only ${profileTest.email}`,
    );

    // Open individual profile edit page
    await profiles.goToIndividualProfilePage(profileTest.email);
    await expect(commonElements.pageHeader).toHaveText(profileTest.fullname);
    await page.waitForSelector('div.grid.grid-cols-1.gap-2>div');
    // TO DO: Issue: not all the tiles are loaded at the same time.
    // There is a delay between when the first tile is displayed and all
    // the tiles are displayed.
    // Getting a lot of false negatives when running the code.
    // Putting in a hard delay so that the tiles are loaded before the
    // oder is checked.
    await commonElements.delay(2000);

    //const tileCount = await page.locator('div.grid.grid-cols-1.gap-2>div').count();
    const tileCount = await profile.overviewTiles.count();
    const tileProfile: string[] = [];

    console.log(`Profile overview tile count is ${tileCount}`);

    for (let index = 0; index < tileCount; index++) {
      // Get the tile type of each tile on Profile Overview
      if ((await profile.overviewTileType.nth(index).count()) > 0) {
        tileProfile.push(
          await profile.overviewTileType.nth(index).getAttribute('data-testid'),
        );
      }
    }

    // Check for empty tiles
    console.log(`from ${tileProfile.length} to ${tileCount}`);
    for (let index = tileProfile.length; index < tileCount; index++) {
      // Is there a button on an empty tile?
      if (
        (await profile.overviewTiles
          .nth(index)
          .locator('article>div')
          .count()) > 0
      ) {
        // Get the button text
        const buttonText = await profile.overviewTiles
          .nth(index)
          .locator('article>div>div')
          .getAttribute('data-test-id');

        switch (buttonText) {
          case 'empty-exercise-tile':
            tileProfile.push('empty-program');
            break;
          case 'empty-prom-tile':
            tileProfile.push('empty-prom');
            break;
          case 'empty-test-tile':
            tileProfile.push('empty');
          default:
            break;
        }
      } else {
        // It is just an empty tile
        tileProfile.push('empty');
      }
    }

    // Check that what is on Profile Overview matches what is expected.
    commonElements.verifyListsMatch(tileProfile, listOfTiles);
  });
}
