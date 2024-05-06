export type ApiStatusCheck = {
    endpoint: string;
    expectedStatus: number;
  };

export type ApiPayloadCheck = {
  endpoint: string;
  idValue: number;
  inputValue: string;
  expectedValue: string;
}

export type ApiRegionEndpoint = {
    abbreviation: string;
    environment: string;
    endpointList: ApiStatusCheck[];
  };

export type ApiRegionEndpointValidation = {
    abbreviation: string;
    environment: string;
    teamName: string;
    teamId: string;
    country: string;
    countryDataRegion: string;
    searchString: string;
    endpointValidateList: ApiPayloadCheck[];
  };
