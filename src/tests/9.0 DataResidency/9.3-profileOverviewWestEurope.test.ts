import { Login } from '@pageObjects/Login';
import { VALDConfig } from '@configuration/config';
import { MultiRegionConfiguration } from '@configuration/config.type';
import { CommonElements } from '@pageObjects/CommonElements';
import { Profiles } from '@pageObjects/Profiles';
import { expect, test } from '@playwright/test';
import { exemptedDomains } from 'contants/data-residency';

const config = VALDConfig();
const url = config.urlValdHubLogin;
let regionURLs: string[] = [];

const urlObject = new URL(url);
const domain = urlObject.hostname;
const valdUrl = `${urlObject.protocol}//${domain}`;
const exemptedPageDomains = [...exemptedDomains, valdUrl];

// Before each test datestamp it and report on test name
test.beforeEach(async ({ page, request }, testInfo) => {
  const login = new Login(page);
  await page.goto(url);
    await login.loginToHubWithOrganisationChange(
    process.env.USER_VALDAUTOMATION,
    process.env.PASS_VALDAUTOMATION,
    "QA Automation Performance"
  );

  const response = await request.get(config.dataResidencyCDN);
  const responseBody = await response.text();
  const apiData: MultiRegionConfiguration = JSON.parse(responseBody);
  const regionData = apiData.regions.filter((c) => c.code === 'EUROPEWEST');

  Object.entries(regionData[0]).forEach(([key, value]) =>
    regionURLs.push(value),
  );
});

const dataFileNameEuw = String(config.dataResidencyProfileOverviewEuw);
const profilesToCheckEuw = require(dataFileNameEuw);
const profileTestEuw = profilesToCheckEuw[0];

test('9.3-profileOverviewWestEurope - Test that there is only West Europe region API Calls', async ({
  request,
  page,
}) => {
  const commonElements = new CommonElements(page);
  const profiles = new Profiles(page);

  //Change to the organisation with the profile
  await commonElements.changeOrganisation(profileTestEuw.organisation);

  // Open individual profile edit page
  page.on('request', async (request: { method: () => any; url: () => any }) => {
    const urlObject = new URL(request.url());
    const domain = urlObject.hostname;
    const url = `${urlObject.protocol}//${domain}`;

    if (exemptedPageDomains.includes(url) === false) {
      console.log('>>', request.method(), request.url());
      expect(regionURLs.includes(url)).toBe(true);
    }
  });
  await profiles.goToIndividualProfilePage(profileTestEuw.email);
});
