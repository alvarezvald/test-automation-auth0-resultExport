import {
  ApiRegionEndpoint,
  ApiRegionEndpointValidation,
} from './ApiEndpointModel';
import { compareByEqualityString } from '@apiUtils/stringUtils';

export const stg_aue_teams_get_endpoints: ApiRegionEndpoint = {
  abbreviation: 'aue',
  environment: 'staging',
  endpointList: [
    {
      endpoint: '/version',
      expectedStatus: 200,
    },
    {
      endpoint: '/liveness',
      expectedStatus: 204,
    },
    {
      endpoint: '/teams',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2019q2/teams',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q3/team/f0e07caf-e60a-4edb-98ab-5cd575c142e6',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/countries',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/sports',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/brands',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/region?country=Spain',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q1/category/all',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q1/subregion/all',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q1/technology/all',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/f0e07caf-e60a-4edb-98ab-5cd575c142e6/files',
      expectedStatus: 200,
    },
    {
      endpoint: '/teams?NameContains=vald',
      expectedStatus: 200,
    },
  ],
};

export const stg_euw_teams_get_endpoints: ApiRegionEndpoint = {
  abbreviation: 'euw',
  environment: 'staging',
  endpointList: [
    {
      endpoint: '/version',
      expectedStatus: 200,
    },
    {
      endpoint: '/liveness',
      expectedStatus: 204,
    },
    {
      endpoint: '/teams',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2019q2/teams',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q3/team/f0e07caf-e60a-4edb-98ab-5cd575c142e6',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/countries',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/sports',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/brands',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/region?country=Spain',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q1/category/all',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q1/subregion/all',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q1/technology/all',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/f0e07caf-e60a-4edb-98ab-5cd575c142e6/files',
      expectedStatus: 200,
    },
    {
      endpoint: '/teams?NameContains=vald',
      expectedStatus: 200,
    },
  ],
};

export const stg_use_teams_get_endpoints: ApiRegionEndpoint = {
  abbreviation: 'use',
  environment: 'staging',
  endpointList: [
    {
      endpoint: '/version',
      expectedStatus: 200,
    },
    {
      endpoint: '/liveness',
      expectedStatus: 204,
    },
    {
      endpoint: '/teams',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2019q2/teams',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q3/team/f0e07caf-e60a-4edb-98ab-5cd575c142e6',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/countries',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/sports',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/brands',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/region?country=Spain',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q1/category/all',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q1/subregion/all',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q1/technology/all',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/f0e07caf-e60a-4edb-98ab-5cd575c142e6/files',
      expectedStatus: 200,
    },
    {
      endpoint: '/teams?NameContains=vald',
      expectedStatus: 200,
    },
  ],
};

export const prd_aue_teams_get_endpoints: ApiRegionEndpoint = {
  abbreviation: 'aue',
  environment: 'production',
  endpointList: [
    {
      endpoint: '/version',
      expectedStatus: 200,
    },
    {
      endpoint: '/liveness',
      expectedStatus: 204,
    },
    {
      endpoint: '/teams',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2019q2/teams',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q3/team/f9a10d08-8d25-49c1-8479-fe47f522ffc9',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/countries',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/sports',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/brands',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/region?country=Spain',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q1/category/all',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q1/subregion/all',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q1/technology/all',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/daea22a1-9e1b-4c73-9c0a-4948695b6431/files',
      expectedStatus: 200,
    },
    {
      endpoint: '/teams?NameContains=vald',
      expectedStatus: 200,
    },
  ],
};

export const prd_euw_teams_get_endpoints: ApiRegionEndpoint = {
  abbreviation: 'euw',
  environment: 'production',
  endpointList: [
    {
      endpoint: '/version',
      expectedStatus: 200,
    },
    {
      endpoint: '/liveness',
      expectedStatus: 204,
    },
    {
      endpoint: '/teams',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2019q2/teams',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q3/team/f9a10d08-8d25-49c1-8479-fe47f522ffc9',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/countries',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/sports',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/brands',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/region?country=Spain',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q1/category/all',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q1/subregion/all',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q1/technology/all',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/daea22a1-9e1b-4c73-9c0a-4948695b6431/files',
      expectedStatus: 200,
    },
    {
      endpoint: '/teams?NameContains=vald',
      expectedStatus: 200,
    },
  ],
};

export const prd_use_teams_get_endpoints: ApiRegionEndpoint = {
  abbreviation: 'use',
  environment: 'production',
  endpointList: [
    {
      endpoint: '/version',
      expectedStatus: 200,
    },
    {
      endpoint: '/liveness',
      expectedStatus: 204,
    },
    {
      endpoint: '/teams',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2019q2/teams',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q3/team/f9a10d08-8d25-49c1-8479-fe47f522ffc9',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/countries',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/sports',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/brands',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/region?country=Spain',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q1/category/all',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q1/subregion/all',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q1/technology/all',
      expectedStatus: 200,
    },
    {
      endpoint: '/v2021q2/team/daea22a1-9e1b-4c73-9c0a-4948695b6431/files',
      expectedStatus: 200,
    },
    {
      endpoint: '/teams?NameContains=vald',
      expectedStatus: 200,
    },
  ],
};

export const stg_aue_teams_validate_endpoints: ApiRegionEndpointValidation = {
  abbreviation: 'aue',
  environment: 'staging',
  teamName: 'Performance Hub 2.0 Prod',
  teamId: 'daea22a1-9e1b-4c73-9c0a-4948695b6431',
  country: 'Spain',
  countryDataRegion: 'WestEurope',
  searchString: 'automation',
  endpointValidateList: [
    {
      endpoint: '/v2021q2/team/countries',
      idValue: 71,
      inputValue: 'Spain',
      expectedValue: 'Spain',
    },
    {
      endpoint: '/v2021q2/team/sports',
      idValue: 12,
      inputValue: 'Cycling',
      expectedValue: 'Cycling',
    },
    {
      endpoint: '/v2021q2/team/brands',
      idValue: 5,
      inputValue: 'Tactical',
      expectedValue: 'Tactical',
    },
    {
      endpoint: '/v2021q1/category/all',
      idValue: 7,
      inputValue: 'Field Based',
      expectedValue: 'FieldBased',
    },
    {
      endpoint: '/v2021q1/subregion/all',
      idValue: 2,
      inputValue: 'Oceania',
      expectedValue: 'Oceania',
    },
    {
      endpoint: '/v2021q1/technology/all',
      idValue: 2,
      inputValue: 'ForceDecks',
      expectedValue: 'ForceDecks',
    },
  ],
};

export const stg_euw_teams_validate_endpoints: ApiRegionEndpointValidation = {
  abbreviation: 'euw',
  environment: 'staging',
  teamName: 'Performance Hub 2.0 Prod',
  teamId: 'daea22a1-9e1b-4c73-9c0a-4948695b6431',
  country: 'Spain',
  countryDataRegion: 'WestEurope',
  searchString: 'automation',
  endpointValidateList: [
    {
      endpoint: '/v2021q2/team/countries',
      idValue: 71,
      inputValue: 'Spain',
      expectedValue: 'Spain',
    },
    {
      endpoint: '/v2021q2/team/sports',
      idValue: 12,
      inputValue: 'Cycling',
      expectedValue: 'Cycling',
    },
    {
      endpoint: '/v2021q2/team/brands',
      idValue: 5,
      inputValue: 'Tactical',
      expectedValue: 'Tactical',
    },
    {
      endpoint: '/v2021q1/category/all',
      idValue: 7,
      inputValue: 'Field Based',
      expectedValue: 'FieldBased',
    },
    {
      endpoint: '/v2021q1/subregion/all',
      idValue: 2,
      inputValue: 'Oceania',
      expectedValue: 'Oceania',
    },
    {
      endpoint: '/v2021q1/technology/all',
      idValue: 2,
      inputValue: 'ForceDecks',
      expectedValue: 'ForceDecks',
    },
  ],
};

export const stg_use_teams_validate_endpoints: ApiRegionEndpointValidation = {
  abbreviation: 'use',
  environment: 'staging',
  teamName: 'Performance Hub 2.0 Prod',
  teamId: 'daea22a1-9e1b-4c73-9c0a-4948695b6431',
  country: 'Spain',
  countryDataRegion: 'WestEurope',
  searchString: 'automation',
  endpointValidateList: [
    {
      endpoint: '/v2021q2/team/countries',
      idValue: 71,
      inputValue: 'Spain',
      expectedValue: 'Spain',
    },
    {
      endpoint: '/v2021q2/team/sports',
      idValue: 12,
      inputValue: 'Cycling',
      expectedValue: 'Cycling',
    },
    {
      endpoint: '/v2021q2/team/brands',
      idValue: 5,
      inputValue: 'Tactical',
      expectedValue: 'Tactical',
    },
    {
      endpoint: '/v2021q1/category/all',
      idValue: 7,
      inputValue: 'Field Based',
      expectedValue: 'FieldBased',
    },
    {
      endpoint: '/v2021q1/subregion/all',
      idValue: 2,
      inputValue: 'Oceania',
      expectedValue: 'Oceania',
    },
    {
      endpoint: '/v2021q1/technology/all',
      idValue: 2,
      inputValue: 'ForceDecks',
      expectedValue: 'ForceDecks',
    },
  ],
};

export const prd_aue_teams_validate_endpoints: ApiRegionEndpointValidation = {
  abbreviation: 'aue',
  environment: 'production',
  teamName: 'QA Hub 23 (P)',
  teamId: 'f9a10d08-8d25-49c1-8479-fe47f522ffc9',
  country: 'Spain',
  countryDataRegion: 'WestEurope',
  searchString: 'performance',
  endpointValidateList: [
    {
      endpoint: '/v2021q2/team/countries',
      idValue: 71,
      inputValue: 'Spain',
      expectedValue: 'Spain',
    },
    {
      endpoint: '/v2021q2/team/sports',
      idValue: 12,
      inputValue: 'Cycling',
      expectedValue: 'Cycling',
    },
    {
      endpoint: '/v2021q2/team/brands',
      idValue: 5,
      inputValue: 'Tactical',
      expectedValue: 'Tactical',
    },
    {
      endpoint: '/v2021q1/category/all',
      idValue: 7,
      inputValue: 'Field Based',
      expectedValue: 'FieldBased',
    },
    {
      endpoint: '/v2021q1/subregion/all',
      idValue: 2,
      inputValue: 'Oceania',
      expectedValue: 'Oceania',
    },
    {
      endpoint: '/v2021q1/technology/all',
      idValue: 2,
      inputValue: 'ForceDecks',
      expectedValue: 'ForceDecks',
    },
  ],
};

export const prd_euw_teams_validate_endpoints: ApiRegionEndpointValidation = {
  abbreviation: 'euw',
  environment: 'production',
  teamName: 'QA Hub 23 (P)',
  teamId: 'f9a10d08-8d25-49c1-8479-fe47f522ffc9',
  country: 'Spain',
  countryDataRegion: 'WestEurope',
  searchString: 'performance',
  endpointValidateList: [
    {
      endpoint: '/v2021q2/team/countries',
      idValue: 71,
      inputValue: 'Spain',
      expectedValue: 'Spain',
    },
    {
      endpoint: '/v2021q2/team/sports',
      idValue: 12,
      inputValue: 'Cycling',
      expectedValue: 'Cycling',
    },
    {
      endpoint: '/v2021q2/team/brands',
      idValue: 5,
      inputValue: 'Tactical',
      expectedValue: 'Tactical',
    },
    {
      endpoint: '/v2021q1/category/all',
      idValue: 7,
      inputValue: 'Field Based',
      expectedValue: 'FieldBased',
    },
    {
      endpoint: '/v2021q1/subregion/all',
      idValue: 2,
      inputValue: 'Oceania',
      expectedValue: 'Oceania',
    },
    {
      endpoint: '/v2021q1/technology/all',
      idValue: 2,
      inputValue: 'ForceDecks',
      expectedValue: 'ForceDecks',
    },
  ],
};

export const prd_use_teams_validate_endpoints: ApiRegionEndpointValidation = {
  abbreviation: 'use',
  environment: 'production',
  teamName: 'QA Hub 23 (P)',
  teamId: 'f9a10d08-8d25-49c1-8479-fe47f522ffc9',
  country: 'Spain',
  countryDataRegion: 'WestEurope',
  searchString: 'performance',
  endpointValidateList: [
    {
      endpoint: '/v2021q2/team/countries',
      idValue: 71,
      inputValue: 'Spain',
      expectedValue: 'Spain',
    },
    {
      endpoint: '/v2021q2/team/sports',
      idValue: 12,
      inputValue: 'Cycling',
      expectedValue: 'Cycling',
    },
    {
      endpoint: '/v2021q2/team/brands',
      idValue: 5,
      inputValue: 'Tactical',
      expectedValue: 'Tactical',
    },
    {
      endpoint: '/v2021q1/category/all',
      idValue: 7,
      inputValue: 'Field Based',
      expectedValue: 'FieldBased',
    },
    {
      endpoint: '/v2021q1/subregion/all',
      idValue: 2,
      inputValue: 'Oceania',
      expectedValue: 'Oceania',
    },
    {
      endpoint: '/v2021q1/technology/all',
      idValue: 2,
      inputValue: 'ForceDecks',
      expectedValue: 'ForceDecks',
    },
  ],
};

const allGetServices = [
  stg_aue_teams_get_endpoints,
  stg_euw_teams_get_endpoints,
  stg_use_teams_get_endpoints,
  prd_aue_teams_get_endpoints,
  prd_euw_teams_get_endpoints,
  prd_use_teams_get_endpoints,
];

export type Apienvironment = 'staging' | 'production';
export type ApiRegion = 'aue' | 'euw' | 'use';

export const GetAPITeamService = (
  abbreviation: ApiRegion,
  environment: Apienvironment,
) => {    
  return allGetServices.find(
    (s) =>
      compareByEqualityString(s.abbreviation, abbreviation) &&
      compareByEqualityString(s.environment, environment),
  )!;
};

const allValidationServices = [
  stg_aue_teams_validate_endpoints,
  stg_euw_teams_validate_endpoints,
  stg_use_teams_validate_endpoints,
  prd_aue_teams_validate_endpoints,
  prd_euw_teams_validate_endpoints,
  prd_use_teams_validate_endpoints,
];

export const GetAPITeamValidationService = (
  abbreviation: ApiRegion,
  environment: Apienvironment,
) => {
  return allValidationServices.find(
    (s) =>
      compareByEqualityString(s.abbreviation, abbreviation) &&
      compareByEqualityString(s.environment, environment),
  )!;
};
