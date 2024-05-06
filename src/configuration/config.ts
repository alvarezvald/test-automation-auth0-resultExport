import { ProcessVariables } from "@configuration/config.type";


import configRC1 from "@configuration/configs/config-rc1.json";
import configCi1 from "@configuration/configs/config-ci1.json";
import configStaging from "@configuration/configs/config-staging.json";
import configReleaseCandidate from "@configuration/configs/config-release-candidate.json";
import configProduction from "@configuration/configs/config-production.json";

export const VALDConfig = (): ProcessVariables => {

    // Get the environment from the windows variable
    let valdEnvironment = process.env.vald_environment;

    let environmentSettings: ProcessVariables;
    switch (valdEnvironment) {
        case 'ci1':
            environmentSettings = configCi1;
            break;
        case 'rc1':
            environmentSettings = configRC1;
            break;
        case 'staging':
            environmentSettings = configStaging;
            break;
        case 'release-candidate':
            environmentSettings = configReleaseCandidate;
            break;
        case 'production':
            environmentSettings = configProduction;
            break;
        default:
            environmentSettings = configStaging;
            break;
    }    
    return environmentSettings;
}