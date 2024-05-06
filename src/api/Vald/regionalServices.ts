import { RegionalServiceModel } from "./regionalServiceModel";
import { compareByEqualityString } from "../Utils/stringUtils";

export const aueProduction: RegionalServiceModel = {
  Abbreviation: "aue",
  Name: "Australia - East",
  Environment: "production",
  ApiUrlLookup: new Map<string, string>([
    [
      "airbands",
      "https://prd-aue-api-airbands.valdperformance.com",
    ],
    [
      "athletes",
      "https://prd-aue-api-athletes.valdperformance.com",
    ],
    ["audit", "https://prd-aue-api-audit.valdperformance.com"],
    ["cloud", "https://prd-aue-api-cloud.valdperformance.com"],
    ["dashbord", "https://dbapi.valdperformance.com"],
    ["devices", "https://devicesapi.valdperformance.com"],
    ["dynamo", "https://prd-aue-api-dynamo.valdperformance.com"],
    [
      "education",
      "https://prd-aue-api-education.valdperformance.com",
    ],
    [
      "educationLibraryBaseAddress",
      "https://prd-aue-api-educationlibrary.valdperformance.com",
    ],
    [
      "externalDynamo",
      "https://prd-aue-api-extdynamo.valdperformance.com",
    ],
    [
      "externalForceDecks",
      "https://prd-aue-api-extforcedecks.valdperformance.com",
    ],
    [
      "externalNordbord",
      "https://prd-aue-api-externalnordbord.valdperformance.com",
    ],
    [
      "externalProfiles",
      "https://prd-aue-api-externalprofile.valdperformance.com",
    ],
    [
      "externalSmartSpeed",
      "https://prd-aue-api-extsmartspeed.valdperformance.com",
    ],
    [
      "externalTenants",
      "https://prd-aue-api-externaltenants.valdperformance.com",
    ],
    [
      "forceDecksAggregation",
      "https://prd-aue-api-fdaggregation.valdperformance.com",
    ],
    [
      "forceDecksDataServerBaseAddress",
      "https://prd-aue-api-forcedecks.valdperformance.com",
    ],
    [
      "forceDecksPermissions",
      "https://prd-aue-api-fdpermissions.valdperformance.com",
    ],
    [
      "globalTenant",
      "https://prd-aue-api-globaltenant.valdperformance.com",
    ],
    [
      "grandCentral",
      "https://prd-aue-api-grandcentral.valdperformance.com",
    ],
    [
      "groinbar",
      "https://prd-aue-api-groinbar.valdperformance.com",
    ],
    [
      "hubSettings",
      "https://prd-aue-api-hubsettings.valdperformance.com",
    ],
    ["humantrak", "https://humantrak-api.valdhealth.com"],
    [
      "humantrakApiV2BaseAddress",
      "https://prd-aue-api-humantrakv2.valdperformance.com",
    ],
    ["identity", "https://security.valdperformance.com"],
    [
      "nordbord",
      "https://prd-aue-api-nordbord.valdperformance.com",
    ],
    [
      "permissions",
      "https://prd-aue-api-permissions.valdperformance.com",
    ],
    [
      "questionnaire",
      "https://prd-aue-api-questionnaire.valdperformance.com",
    ],
    ["saga", "https://api.saga.fitness"],
    ["sagaIdentity", "https://security.saga.fitness"],
    [
      "smartSpeed",
      "https://prd-aue-api-smartspeed.valdperformance.com",
    ],
    ["teams", "https://prd-aue-api-teams.valdperformance.com"],
    [
      "telehab",
      "https://prd-aue-api-telehab.valdperformance.com",
    ],
    [
      "telehabLibraryBaseAddress",
      "https://prd-aue-api-telehablibrary.valdperformance.com",
    ],
  ]),
};

export const euwProduction: RegionalServiceModel = {
  Abbreviation: "euw",
  Name: "Europe - West",
  Environment: "production",
  ApiUrlLookup: new Map<string, string>([
    [
      "airbands",
      "https://prd-aue-api-airbands.valdperformance.com",
    ],
    [
      "athletes",
      "https://prd-euw-api-athletes.valdperformance.com",
    ],
    ["audit", "https://prd-euw-api-audit.valdperformance.com"],
    ["cloud", "https://prd-euw-api-cloud.valdperformance.com"],
    ["dashbord", "https://dbapi.valdperformance.com"],
    ["devices", "https://devicesapi.valdperformance.com"],
    ["dynamo", "https://prd-euw-api-dynamo.valdperformance.com"],
    [
      "education",
      "https://prd-euw-api-education.valdperformance.com",
    ],
    [
      "educationLibraryBaseAddress",
      "https://prd-aue-api-educationlibrary.valdperformance.com",
    ],
    [
      "externalDynamo",
      "https://prd-euw-api-extdynamo.valdperformance.com",
    ],
    [
      "externalForceDecks",
      "https://prd-euw-api-extforcedecks.valdperformance.com",
    ],
    [
      "externalNordbord",
      "https://prd-euw-api-externalnordbord.valdperformance.com",
    ],
    [
      "externalProfiles",
      "https://prd-euw-api-externalprofile.valdperformance.com",
    ],
    [
      "externalSmartSpeed",
      "https://prd-euw-api-extsmartspeed.valdperformance.com",
    ],
    [
      "externalTenants",
      "https://prd-euw-api-externaltenants.valdperformance.com",
    ],
    [
      "forceDecksAggregation",
      "https://prd-euw-api-fdaggregation.valdperformance.com",
    ],
    [
      "forceDecksDataServerBaseAddress",
      "https://prd-euw-api-forcedecks.valdperformance.com",
    ],
    [
      "forceDecksPermissions",
      "https://prd-euw-api-fdpermissions.valdperformance.com",
    ],
    [
      "globalTenant",
      "https://prd-euw-api-globaltenant.valdperformance.com",
    ],
    [
      "grandCentral",
      "https://prd-euw-api-grandcentral.valdperformance.com",
    ],
    [
      "groinbar",
      "https://prd-euw-api-groinbar.valdperformance.com",
    ],
    [
      "hubSettings",
      "https://prd-euw-api-hubsettings.valdperformance.com",
    ],
    ["humantrak", "https://humantrak-api.valdhealth.com"],
    [
      "humantrakApiV2BaseAddress",
      "https://prd-euw-api-humantrakv2.valdperformance.com",
    ],
    ["identity", "https://security.valdperformance.com"],
    [
      "nordbord",
      "https://prd-euw-api-nordbord.valdperformance.com",
    ],
    [
      "permissions",
      "https://prd-euw-api-permissions.valdperformance.com",
    ],
    [
      "questionnaire",
      "https://prd-aue-api-questionnaire.valdperformance.com",
    ],
    ["saga", "https://api.saga.fitness"],
    ["sagaIdentity", "https://security.saga.fitness"],
    [
      "smartSpeed",
      "https://prd-euw-api-smartspeed.valdperformance.com",
    ],
    ["teams", "https://prd-euw-api-teams.valdperformance.com"],
    [
      "telehab",
      "https://prd-aue-api-telehab.valdperformance.com",
    ],
    [
      "telehabLibraryBaseAddress",
      "https://prd-aue-api-telehablibrary.valdperformance.com",
    ],
  ]),
};

export const useProduction: RegionalServiceModel = {
  Abbreviation: "use",
  Name: "United States - East",
  Environment: "production",
  ApiUrlLookup: new Map<string, string>([
    [
      "airbands",
      "https://prd-aue-api-airbands.valdperformance.com",
    ],
    [
      "athletes",
      "https://prd-use-api-athletes.valdperformance.com",
    ],
    ["audit", "https://prd-use-api-audit.valdperformance.com"],
    ["cloud", "https://prd-use-api-cloud.valdperformance.com"],
    ["dashbord", "https://dbapi.valdperformance.com"],
    ["devices", "https://devicesapi.valdperformance.com"],
    ["dynamo", "https://prd-use-api-dynamo.valdperformance.com"],
    [
      "education",
      "https://prd-use-api-education.valdperformance.com",
    ],
    [
      "educationLibraryBaseAddress",
      "https://prd-aue-api-educationlibrary.valdperformance.com",
    ],
    [
      "externalDynamo",
      "https://prd-use-api-extdynamo.valdperformance.com",
    ],
    [
      "externalForceDecks",
      "https://prd-use-api-extforcedecks.valdperformance.com",
    ],
    [
      "externalNordbord",
      "https://prd-use-api-externalnordbord.valdperformance.com",
    ],
    [
      "externalProfiles",
      "https://prd-use-api-externalprofile.valdperformance.com",
    ],
    [
      "externalSmartSpeed",
      "https://prd-use-api-extsmartspeed.valdperformance.com",
    ],
    [
      "externalTenants",
      "https://prd-use-api-externaltenants.valdperformance.com",
    ],
    [
      "forceDecksAggregation",
      "https://prd-use-api-fdaggregation.valdperformance.com",
    ],
    [
      "forceDecksDataServerBaseAddress",
      "https://prd-use-api-forcedecks.valdperformance.com",
    ],
    [
      "forceDecksPermissions",
      "https://prd-use-api-fdpermissions.valdperformance.com",
    ],
    [
      "globalTenant",
      "https://prd-use-api-globaltenant.valdperformance.com",
    ],
    [
      "grandCentral",
      "https://prd-use-api-grandcentral.valdperformance.com",
    ],
    [
      "groinbar",
      "https://prd-use-api-groinbar.valdperformance.com",
    ],
    [
      "hubSettings",
      "https://prd-use-api-hubsettings.valdperformance.com",
    ],
    ["humantrak", "https://humantrak-api.valdhealth.com"],
    [
      "humantrakApiV2BaseAddress",
      "https://prd-use-api-humantrakv2.valdperformance.com",
    ],
    ["identity", "https://security.valdperformance.com"],
    [
      "nordbord",
      "https://prd-use-api-nordbord.valdperformance.com",
    ],
    [
      "permissions",
      "https://prd-use-api-permissions.valdperformance.com",
    ],
    [
      "questionnaire",
      "https://prd-aue-api-questionnaire.valdperformance.com",
    ],
    ["saga", "https://api.saga.fitness"],
    ["sagaIdentity", "https://security.saga.fitness"],
    [
      "smartSpeed",
      "https://prd-use-api-smartspeed.valdperformance.com",
    ],
    ["teams", "https://prd-use-api-teams.valdperformance.com"],
    [
      "telehab",
      "https://prd-aue-api-telehab.valdperformance.com",
    ],
    [
      "telehabLibraryBaseAddress",
      "https://prd-aue-api-telehablibrary.valdperformance.com",
    ],
  ]),
};

export const aueStaging: RegionalServiceModel = {
  Abbreviation: "aue",
  Name: "Australia - East",
  Environment: "staging",
  ApiUrlLookup: new Map<string, string>([
    ["airbands", "https://stg-aue-api-airbands.valdperformance.com"],
    ["athletes", "https://stg-aue-api-athletes.valdperformance.com"],
    ["audit", "https://stg-aue-api-audit.valdperformance.com"],
    ["cloud", "https://stg-aue-api-cloud.valdperformance.com"],
    ["dashbord", "https://dbapi-staging.valdperformance.com"],
    ["devices", "https://devicesapi-staging.valdperformance.com"],
    ["dynamo", "https://stg-aue-api-dynamo.valdperformance.com"],
    ["education", "https://stg-aue-api-education.valdperformance.com"],
    [
      "educationLibrary",
      "https://stg-aue-api-educationlibrary.valdperformance.com",
    ],
    ["externalDynamo", "https://stg-aue-api-extdynamo.valdperformance.com"],
    [
      "externalForceDecks",
      "https://stg-aue-api-extforcedecks.valdperformance.com",
    ],
    [
      "externalNordbord",
      "https://stg-aue-api-externalnordbord.valdperformance.com",
    ],
    [
      "externalProfiles",
      "https://stg-aue-api-externalprofile.valdperformance.com",
    ],
    [
      "externalSmartSpeed",
      "https://stg-aue-api-extsmartspeed.valdperformance.com",
    ],
    [
      "externalTenants",
      "https://stg-aue-api-externaltenants.valdperformance.com",
    ],
    [
      "forceDecksAggregation",
      "https://stg-aue-api-fdaggregation.valdperformance.com",
    ],
    [
      "forceDecksDataServer",
      "https://stg-aue-api-forcedecks.valdperformance.com",
    ],
    ["globalTenant", "https://stg-aue-api-globaltenant.valdperformance.com"],
    ["grandCentral", "https://stg-aue-api-grandcentral.valdperformance.com"],
    ["groinbar", "https://stg-aue-api-groinbar.valdperformance.com"],
    ["hubSettings", "https://stg-aue-api-hubsettings.valdperformance.com"],
    ["humantrak", "https://humantrak-api-staging.valdhealth.com"],
    ["humantrakApiV2", "https://stg-aue-api-humantrakv2.valdperformance.com"],
    ["identity", "https://security-staging.valdperformance.com"],
    ["nordbord", "https://stg-aue-api-nordbord.valdperformance.com"],
    ["permissions", "https://stg-aue-api-permissions.valdperformance.com"],
    ["questionnaire", "https://stg-aue-api-questionnaire.valdperformance.com"],
    ["saga", "https://api-staging.saga.fitness"],
    ["sagaIdentity", "https://security-staging.saga.fitness"],
    ["smartSpeed", "https://stg-aue-api-smartspeed.valdperformance.com"],
    ["teams", "https://stg-aue-api-teams.valdperformance.com"],
    ["telehab", "https://stg-aue-api-telehab.valdperformance.com"],
    [
      "telehabLibrary",
      "https://stg-aue-api-telehablibrary.valdperformance.com",
    ],
  ]),
};

export const euwStaging: RegionalServiceModel = {
  Abbreviation: "euw",
  Name: "Europe - West",
  Environment: "staging",
  ApiUrlLookup: new Map<string, string>([
    ["airbands", "https://stg-aue-api-airbands.valdperformance.com"],
    ["athletes", "https://stg-euw-api-athletes.valdperformance.com"],
    ["audit", "https://stg-aue-api-audit.valdperformance.com"],
    ["cloud", "https://stg-euw-api-cloud.valdperformance.com"],
    ["dashbord", "https://dbapi-staging.valdperformance.com"],
    ["dynamo", "https://stg-euw-api-dynamo.valdperformance.com"],
    ["education", "https://stg-euw-api-education.valdperformance.com"],
    [
      "educationLibrary",
      "https://stg-aue-api-educationlibrary.valdperformance.com",
    ],
    ["externalDynamo", "https://stg-aue-api-extdynamo.valdperformance.com"],
    [
      "externalForceDecks",
      "https://stg-aue-api-extforcedecks.valdperformance.com",
    ],
    [
      "externalNordbord",
      "https://stg-euw-api-externalnordbord.valdperformance.com",
    ],
    [
      "externalProfiles",
      "https://stg-euw-api-externalprofile.valdperformance.com",
    ],
    [
      "externalSmartSpeed",
      "https://stg-euw-api-extsmartspeed.valdperformance.com",
    ],
    [
      "externalTenants",
      "https://stg-euw-api-externaltenants.valdperformance.com",
    ],
    [
      "forceDecksAggregation",
      "https://stg-euw-api-fdaggregation.valdperformance.com",
    ],
    [
      "forceDecksDataServer",
      "https://stg-euw-api-forcedecks.valdperformance.com",
    ],
    ["globalTenant", "https://stg-euw-api-globaltenant.valdperformance.com"],
    ["grandCentral", "https://stg-euw-api-grandcentral.valdperformance.com"],
    ["groinbar", "https://stg-euw-api-groinbar.valdperformance.com"],
    ["humantrak", "https://humantrak-api-staging.valdhealth.com"],
    ["humantrakApiV2", "https://stg-euw-api-humantrakv2.valdperformance.com"],
    ["identity", "https://security-staging.valdperformance.com"],
    ["nordbord", "https://stg-euw-api-nordbord.valdperformance.com"],
    ["permissions", "https://stg-euw-api-permissions.valdperformance.com"],
    ["questionnaire", "https://stg-aue-api-questionnaire.valdperformance.com"],
    ["smartSpeed", "https://stg-euw-api-smartspeed.valdperformance.com"],
    ["teams", "https://stg-euw-api-teams.valdperformance.com"],
    ["telehab", "https://stg-aue-api-telehab.valdperformance.com"],
    [
      "telehabLibrary",
      "https://stg-aue-api-telehablibrary.valdperformance.com",
    ],
  ]),
};

export const useStaging: RegionalServiceModel = {
  Abbreviation: "use",
  Name: "United States - East",
  Environment: "staging",
  ApiUrlLookup: new Map<string, string>([
    ["airbands", "https://stg-aue-api-airbands.valdperformance.com"],
    ["athletes", "https://stg-use-api-athletes.valdperformance.com"],
    ["audit", "https://stg-aue-api-audit.valdperformance.com"],
    ["cloud", "https://stg-use-api-cloud.valdperformance.com"],
    ["dashbord", "https://dbapi-staging.valdperformance.com"],
    ["devices", "https://devicesapi-staging.valdperformance.com"],
    ["dynamo", "https://stg-use-api-dynamo.valdperformance.com"],
    ["education", "https://stg-use-api-education.valdperformance.com"],
    [
      "educationLibrary",
      "https://stg-aue-api-educationlibrary.valdperformance.com",
    ],
    ["externalDynamo", "https://stg-aue-api-extdynamo.valdperformance.com"],
    [
      "externalForceDecks",
      "https://stg-aue-api-extforcedecks.valdperformance.com",
    ],
    [
      "externalNordbord",
      "https://stg-use-api-externalnordbord.valdperformance.com",
    ],
    [
      "externalProfiles",
      "https://stg-use-api-externalprofile.valdperformance.com",
    ],
    [
      "externalSmartSpeed",
      "https://stg-use-api-extsmartspeed.valdperformance.com",
    ],
    [
      "externalTenants",
      "https://stg-use-api-externaltenants.valdperformance.com",
    ],
    [
      "forceDecksAggregation",
      "https://stg-use-api-fdaggregation.valdperformance.com",
    ],
    [
      "forceDecksDataServer",
      "https://stg-use-api-forcedecks.valdperformance.com",
    ],
    ["globalTenant", "https://stg-use-api-globaltenant.valdperformance.com"],
    ["grandCentral", "https://stg-use-api-grandcentral.valdperformance.com"],
    ["groinbar", "https://stg-use-api-groinbar.valdperformance.com"],
    ["hubSettings", "https://stg-use-api-hubsettings.valdperformance.com"],
    ["humantrak", "https://humantrak-api-staging.valdhealth.com"],
    ["humantrakApiV2", "https://stg-use-api-humantrakv2.valdperformance.com"],
    ["identity", "https://security-staging.valdperformance.com"],
    ["nordbord", "https://stg-use-api-nordbord.valdperformance.com"],
    ["permissions", "https://stg-use-api-permissions.valdperformance.com"],
    ["questionnaire", "https://stg-aue-api-questionnaire.valdperformance.com"],
    ["saga", "https://api-staging.saga.fitness"],
    ["sagaIdentity", "https://security-staging.saga.fitness"],
    ["smartSpeed", "https://stg-use-api-smartspeed.valdperformance.com"],
    ["teams", "https://stg-use-api-teams.valdperformance.com"],
    ["telehab", "https://stg-aue-api-telehab.valdperformance.com"],
    [
      "telehabLibrary",
      "https://stg-aue-api-telehablibrary.valdperformance.com",
    ],
  ]),
};

export type ApiEnvironment = "staging" | "production";
export type ApiRegion = "aue" | "euw" | "use";

const allServices = [aueStaging, euwStaging, useStaging, 
  aueProduction, euwProduction, useProduction];

export const GetRegionalService = (
  abbreviation: ApiRegion,
  environment: ApiEnvironment
) => {
  return allServices.find(
    (s) =>
      compareByEqualityString(s.Abbreviation, abbreviation) &&
      compareByEqualityString(s.Environment, environment)
  )!;
};

export const GetRegionalServiceResolver = (abbreviation: ApiRegion) => {
  return (environment: ApiEnvironment) => {
    return allServices.find(
      (s) =>
        compareByEqualityString(s.Abbreviation, abbreviation) &&
        compareByEqualityString(s.Environment, environment)
    )!;
  };
};
