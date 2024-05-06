import { VALDConfig } from '@configuration/config';
import { CommonElements } from '@pageObjects/CommonElements';
import { Login } from '@pageObjects/Login';
import { test as baseTest } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Modified from this Playwright documentation example:
// https://playwright.dev/docs/auth#moderate-one-account-per-parallel-worker

export * from '@playwright/test';
export const singleLoginTest = baseTest.extend<{}, { workerStorageState: string }>({
  // Use the same storage state for all tests in this worker.
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  // Authenticate once per worker with a worker-scoped fixture.
  workerStorageState: [async ({ browser }, use) => {
    // Use parallelIndex as a unique identifier for each worker.
    const id = singleLoginTest.info().parallelIndex;
    const fileName = path.resolve(singleLoginTest.info().project.outputDir, `.auth/${id}.json`);

    if (fs.existsSync(fileName)) {
      // Reuse existing authentication state if any.
      await use(fileName);
      return;
    }

    // Important: make sure we authenticate in a clean environment by unsetting storage state.
    const page = await browser.newPage({ storageState: undefined });

    const config = VALDConfig();
    const url = config.urlValdHubLogin;
    const commonElements = new CommonElements(page);
    const login = new Login(page);
    await commonElements.resizeWindowToStandardSize();
    // Large timeout for now due to slow environment issues e.g. staging
    await page.goto(url, {timeout: 120000});

    await login.loginUsernamePassword(
      process.env['SINGLE_LOGIN_USER'],
      process.env['SINGLE_LOGIN_PASSWORD']
    );

    // End of authentication steps. Save the storage state.

    await page.context().storageState({ path: fileName });
    await page.close();
    await use(fileName);
  }, { scope: 'worker' }],
});
