export interface ProcessVariables {
  urlValdHubLogin: string;
  urlTeleHabLogin: string;
  organisationPerformance: string;
  organisationHealth: string;
  organisationEmpty: string;
  teleHabProgramPerformDataFile: string;
  teleHabPROM_ResultTestingDataFile: string;
  teleHabPROM_ProfileTileTestingDataFile: string;
  profileOverviewFile: string;
  dataResidencyProfileOverviewAue: string;
  dataResidencyProfileOverviewUse: string;
  dataResidencyProfileOverviewEuw: string;
  dataResidencyCDN: string;
}

export interface RegionConfiguration {
  code: string;
  name: string;
  airbandsApiBaseAddress: string;
  athletesApiBaseAddress: string;
  auditApiBaseAddress: string;
  cloudApiBaseAddress: string;
  dashbordApiBaseAddress: string;
  devicesApiBaseAddress: string;
  dynamoApiBaseAddress: string;
  educationApiBaseAddress: string;
  educationLibraryBaseAddress: string;
  externalDynamoApiBaseAddress: string;
  externalForceDecksApiBaseAddress: string;
  externalNordbordApiBaseAddress: string;
  externalProfilesApiBaseAddress: string;
  externalSmartSpeedApiBaseAddress: string;
  externalTenantsApiBaseAddress: string;
  forceDecksAggregationApiBaseAddress: string;
  forceDecksDataServerBaseAddress: string;
  globalTenantApiBaseAddress: string;
  grandCentralApiBaseAddress: string;
  groinbarApiBaseAddress: string;
  hubSettingsApiBaseAddress: string;
  humantrakApiBaseAddress: string;
  humantrakApiV2BaseAddress: string;
  identityApiBaseAddress: string;
  nordbordApiBaseAddress: string;
  permissionsApiBaseAddress: string;
  questionnaireApiBaseAddress: string;
  sagaApiBaseAddress: string;
  sagaIdentityApiBaseAddress: string;
  smartSpeedApiBaseAddress: string;
  teamsApiBaseAddress: string;
  telehabApiBaseAddress: string;
  telehabLibraryBaseAddress: string;
}

export interface MultiRegionConfiguration {
  regions: RegionConfiguration[];
}
