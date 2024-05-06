import { test, expect } from '@playwright/test';
import { teams } from '@apiVald/apiNames';
import { Api } from '@api/api';
import {
  ApiEnvironment,
  ApiRegion,
  GetRegionalServiceResolver,
} from '@apiVald/regionalServices';
import { dataInfo } from '@dto/dataInfo';
import { GetAPITeamValidationService } from '@dto/ApiTeams';

// set default value, reset if env var is set
let dataRegion: ApiRegion = 'aue';
if (process.env.vald_data_region) {
  dataRegion = process.env.vald_data_region as ApiRegion;
}

// set default value, reset if env var is set
let environment: ApiEnvironment = 'staging';
if (process.env.vald_environment) {
  environment = process.env.vald_environment as ApiEnvironment;
}

// Get the input data
const apiTeamTest = GetAPITeamValidationService(dataRegion, environment);

// Used in the calls
const teamId = apiTeamTest.teamId;
const country = apiTeamTest.country;
const countryDataRegion = apiTeamTest.countryDataRegion;
const searchString = apiTeamTest.searchString;

// grab all meta-data about the api environment we want to hit
const regionServiceResolver = GetRegionalServiceResolver(dataRegion);
// this returns a method which needs to be invoked. A "resolver". Enables
// re-use through composability.
const regionEnvironment = regionServiceResolver(environment);

// Build up the Api object/s.
const teamClient = new Api(regionEnvironment, teams);

let apiTeams;
test.beforeAll(async ({ playwright }) => {
  apiTeams = await playwright.request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: `${teamClient.BaseUrl}`,
    extraHTTPHeaders: {
      // Add authorization token to all requests.
      // Assuming personal access token available in the environment.
      Authorization: `Bearer ${process.env.vald_access_token}`,
    },
  });
});

test.afterAll(async ({}) => {
  // Dispose all responses.
  await apiTeams.dispose();
});

// Teams
test(`10.2.1-API-TEAMS-/teams`, async ({ request }) => {
  console.log(`DATA REGION: ${dataRegion}`);
  console.log(`ENVIRONMENT: ${environment}`);

  const response = await apiTeams.get(`/teams`);
  expect(response).toBeOK(); //200-299
  const dataOut = await response.json();
  expect(dataOut.teams.length).toBeGreaterThan(0);
});

// Get the data region of a country
test(`10.2.4-API-TEAMS-/v2021q2/team/region?country=${country}`, async ({
  request,
}) => {
  console.log(`DATA REGION: ${dataRegion}`);
  console.log(`ENVIRONMENT: ${environment}`);
  console.log(
    `URL CALL IS ${teamClient.BaseUrl}/v2021q2/team/region?country=${country}`,
  );

  const response = await apiTeams.get(
    `/v2021q2/team/region?country=${country}`,
  );
  expect(response).toBeOK(); //200-299
  const dataOut = await response.json();
  console.log(dataOut);
  expect(dataOut).toBe(countryDataRegion);
});

interface normReportData {
  fileName: string;
  lastModifiedDateUtc: string;
  filesize: number;
}

// Get normative data files
test.skip(`10.2.5-API-TEAMS-/v2021q2/team/${teamId}/files`, async ({ request }) => {
  console.log(`DATA REGION: ${dataRegion}`);
  console.log(`ENVIRONMENT: ${environment}`);
  let apiEndpoint = `/v2021q2/team/${teamId}/files`;

  const response = await test.step(`Normative data files list`, async () => {
    console.log(`URL CALL IS ${teamClient.BaseUrl}${apiEndpoint}`);
    const response = await apiTeams.get(`${apiEndpoint}`);
    expect(response).toBeOK(); //200-299
    return response;
  });

  const fileData: normReportData[] = await response.json();

  if (fileData.length > 0) {
    await test.step(`Normative data file returned - call for file details`, async () => {
      // We found files (normative reports)
      const fileName = encodeURI(fileData[0].fileName);
      console.log(fileName);

      apiEndpoint = `/v2021q2/team/${teamId}/files/${fileName}`;
      console.log(`URL CALL IS ${teamClient.BaseUrl}${apiEndpoint}`);
      const response = await apiTeams.get(apiEndpoint);
      expect(response.ok()).toBeTruthy();
    });
  }
});

// search for a team using filter
test(`10.2.6-API-TEAMS-/teams?NameContains=${searchString}`, async ({
  request,
}) => {
  console.log(`DATA REGION: ${dataRegion}`);
  console.log(`ENVIRONMENT: ${environment}`);
  let apiEndpoint = `/teams?NameContains=${searchString}`;

  console.log(`URL CALL IS ${teamClient.BaseUrl}${apiEndpoint}`);
  const response = await apiTeams.get(`${apiEndpoint}`);
  expect(response).toBeOK(); //200-299
  const dataOut = await response.json();
  expect(dataOut.teams.length).toBeGreaterThan(0);
});

// Loop thru api calls
// these calls all return id, value and description
apiTeamTest.endpointValidateList.forEach((element) => {
  test(`10.2-API-TEAMS${element.endpoint}`, async ({ request }) => {
    console.log(`ENVIRONMENT: ${environment}  DATA REGION: ${dataRegion}`);
    console.log(`URL CALL IS ${teamClient.BaseUrl}${element.endpoint}`);

    const response = await apiTeams.get(`${element.endpoint}`);
    expect(response).toBeOK(); //200-299

    const countryData: dataInfo[] = await response.json();
    let valueFound: boolean = false;
    for (let index = 0; index < countryData.length; index++) {
      const item = countryData[index];
      if (item.id == element.idValue) {
        expect(item.description).toBe(element.inputValue);
        expect(item.value).toBe(element.expectedValue);
        valueFound = true;
        break;
      }
    }
    expect(valueFound).toBeTruthy();
  });
});
