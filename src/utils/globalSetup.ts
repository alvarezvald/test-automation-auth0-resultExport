import { FullConfig } from "@playwright/test";

import * as dotenv from "dotenv"

async function globalSetup(config: FullConfig) {

    process.env.test_env = 'stgAUE'

    if (process.env.test_env) {
        dotenv.config({
            path: `env/.env.${process.env.test_env}`,
            override: true
        })

    }
}
export default globalSetup;