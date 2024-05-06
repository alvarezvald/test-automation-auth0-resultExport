import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './src/tests',
  timeout: 4 * 60 * 1000,
  expect : {timeout: 10 * 1000},
  fullyParallel: true,
  reporter: [
    ['html', { open: 'never' }],
    ['junit'],
  ],

  globalSetup: "src/utils/globalSetup.ts",  

  use: {
    headless: true,
    actionTimeout: 0 * 1000, //Would like to get this to a reasonable value such as 10s
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    ignoreHTTPSErrors : true,
    launchOptions:{
      slowMo: process.env.sloMoTest && !isNaN(Number(process.env.sloMoTest)) ? Number(process.env.sloMoTest) : 0,
    }
    // proxy: {
    //   server: 'http://localhost:8888',
    // }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    // VALD custom browser configurations
    {
      name: 'chromium-regular',
      use: {
        ...devices['Desktop Chrome'],
        viewport:{
          width: 1536,
          height: 864
        }
      },
    },
    {
      name: 'chromium-tablet',
      use: {
        ...devices['Desktop Chrome'],
        viewport:{
          width: 810,
          height: 1080
        }
      },
    },
  ],
  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: './test-results/',
};
export default config;