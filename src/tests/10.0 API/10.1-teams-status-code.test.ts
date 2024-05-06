import { test, expect } from '@playwright/test';
import { teams } from '@apiVald/apiNames';
import { Api } from '@api/api';
import {
  ApiEnvironment,
  ApiRegion,
  GetRegionalServiceResolver,
} from '@apiVald/regionalServices';
import { GetAPITeamService } from '@dto/ApiTeams';

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

// grab all meta-data about the environment we want to hit
const regionServiceResolver = GetRegionalServiceResolver(dataRegion);
// this returns a method which needs to be invoked. A "resolver". Enables
// re-use through composability.
const regionEnvironment = regionServiceResolver(environment);

// get the list of endpoints based on region and environment
const apiTeamTest = GetAPITeamService(dataRegion, environment);

// Build up the Api object/s.
console.log(dataRegion, environment )
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

// Hit all the read end points
apiTeamTest.endpointList.forEach((element) => {
  
  test(`10.1-API-TEAMS${element.endpoint}`, async ({ request }) => {
    console.log(`ENVIRONMENT: ${environment}  DATA REGION: ${dataRegion}`);
    console.log(`${teamClient.BaseUrl}${element.endpoint}`)

    const response = await apiTeams.get(element.endpoint);

    // check that the response was ok 200-299
    expect(response.status()).toBe(element.expectedStatus);
  });
});
