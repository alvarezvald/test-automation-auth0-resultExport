import { singleLoginTest } from '../../fixtures/singleLogin'; // 'single login' occurs in this fixture for user login
import { test as testStandard } from '@playwright/test';
import { VALDConfig } from '@configuration/config'
import { ProfileIndividual } from '@pageObjects/ProfileIndividual';
import { setSingleLoginUser, waitHubPageLoaded } from 'utils/common';
import { Login } from '@pageObjects/Login'
import { TeleHabClientPWA } from '@pageObjects/TeleHabClientPWA';
import { CommonElements } from '@pageObjects/CommonElements';

const config = VALDConfig();

// Practitioner user login url
const urlHub = config.urlValdHubLogin;
// Client user telehab login url
const urlTelehab = config.urlTeleHabLogin;
// PROM data file for all tests
const dataFileName = String(config.teleHabPROM_ResultTestingDataFile);
const clientTH = require(dataFileName);
const userOrg = 'qa.vald+PROMS@vald.com';

//
// Generate PROM assign tests which will use a single-login practitioner user per worker i.e.
// Practitioner logs in once, and those credentials are used for rest of assign tests.
// NOTE: a browser will spawn per test as required by Playwright but the practitioner user will
// already be logged in i.e. will not go through login process again.
//
clientTH.forEach(PROM_DATA => {
  singleLoginTest.describe(`${PROM_DATA.PROM_TYPE}-Assign`, () => {

    setSingleLoginUser(process.env.USER_PROMS, process.env.PASS_PROMS);

    singleLoginTest.beforeEach(async ({ page }, testInfo) => {
      const commonElements = new CommonElements(page);

      await commonElements.resizeWindow(testInfo.project.use.viewport.width, testInfo.project.use.viewport.height);
      await page.goto(urlHub);
      // Playwright doesnt seem to catch all the re-directs before letting the logic continue causing problems later
      // when the hub page is not fully loaded
      await waitHubPageLoaded(page);

      await commonElements.changeOrganisation(userOrg);
    });

    PROM_DATA.tests.forEach(telehabClientData => {
      singleLoginTest(`${telehabClientData.Username.split('@')[0]}`, {
        tag: ['@data_generation', '@proms_assign', `@${PROM_DATA.PROM_TYPE}`, '@proms_result_test'],
      }, async ({ page }) => {

        const profile = new ProfileIndividual(page);

        // Assign PROM to profile modal
        await profile.assignPROMtoCurrentProfile(
          telehabClientData.Username,
          PROM_DATA.PROM_TYPE,
          telehabClientData.NumberOfSurveys
        );
      });
    });
  });
});


//
// Generate PROM complete tests which use telehab user logins
//

clientTH.forEach(PROM_DATA => {
  testStandard.describe(`${PROM_DATA.PROM_TYPE}-Complete`, () => {

    testStandard.beforeEach(async ({ page }, testInfo) => {
      const commonElements = new CommonElements(page);
      console.log(Date());
      console.log(urlTelehab);
      console.log(testInfo.title);
      await commonElements.resizeWindow(testInfo.project.use.viewport.width, testInfo.project.use.viewport.height);
      await page.goto(urlTelehab)
    });

    PROM_DATA.tests.forEach(telehabClientData => {
      testStandard(`${telehabClientData.Username.split('@')[0]}`, {
        tag: ['@data_generation', '@proms_complete', `@${PROM_DATA.PROM_TYPE}`, '@proms_result_test'],
      }, async ({ page }) => {
        const teleHabClient = new TeleHabClientPWA(page);
        const login = new Login(page);

        await login.telehabLoginUsernamePassword(telehabClientData.Username, process.env.PASS_PROMS);

        let promVisible = true;
        // Need to wait as can load showing no PROMs, refresh, and then PROM is visible
        await teleHabClient.surveyTileOnHomeScreen.waitFor({ state: 'visible', timeout: 5000 }).catch(() => promVisible = false);

        if (!promVisible) {
          console.log("PROM is not visible")
          return;
        }
        //Fill out PROM for telehab profile
        await teleHabClient.filloutPROM(telehabClientData.Answer);
      });
    });
  });
});
