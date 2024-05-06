import { expect, test } from '@playwright/test';
import { Login } from '@pageObjects/Login';
import { CommonElements } from '@pageObjects/CommonElements';
import { VALDConfig } from '@configuration/config';

const config = VALDConfig();
const url = config.urlValdHubLogin;

// Before each test datestamp it and report on test name
test.beforeEach(async ({ page }, testInfo) => {
  const commonElements = new CommonElements(page);

  console.log(Date());
  console.log(url);
  //ensure left hand menu is expanded
  await commonElements.resizeWindowToStandardSize();
  await page.goto(url);
});

test('1.3.1 Login to group-mode org and change to clinical-mode organisation', async ({ page }) => {
  const login = new Login(page);
  await test.step('Login to group org and change organisation to clinical organisation', async () => {
    await login.loginToHubWithOrganisationChange(
      process.env.USER_VALDAUTOMATION,
      process.env.PASS_VALDAUTOMATION,
      'QA Automation Health',
    );
  });
  await test.step('Check landing page', async () => {
    await expect(page.getByRole('heading', { name: 'Profiles' }), 'Check Profiles page is visible').toBeVisible();
  });
});

test('1.3.2 Login to clinical-mode organisation', async ({ page }) => {
  const login = new Login(page);

  await test.step('Login to health org, landing page profiles', async () => {
    await login.loginUsernamePassword(
      process.env.USER_HEALTH,
      process.env.PASS_HEALTH,
    );
  });

  await test.step('Check landing page', async () => {
    await expect(page.getByRole('heading', { name: 'Profiles' }), 'Check Profiles page is visible').toBeVisible();
  });
});

test('1.3.3 Login to group-mode organisation', async ({ page }) => {
  const login = new Login(page);

  await test.step('Login to performance org', async () => {
    await login.loginUsernamePassword(
      process.env.USER_PERFORMANCE,
      process.env.PASS_PERFORMANCE,
    );
  });
  await test.step('Check landing page is home page', async () => {
    await expect(
      page.getByRole('heading', { name: 'Welcome to Vald Hub' }),
      'Check home page is visible').toBeVisible();
  });
});

test('1.3.4 Login to smartspeed organisation', async ({ page }) => {
  const login = new Login(page);

  await test.step('Login to smartspeed org', async () => {
    await login.loginUsernamePassword(
      process.env.USER_SMARTSPEED,
      process.env.PASS_SMARTSPEED,
    );
  });
  await test.step('Check landing page is home page', async () => {
    await expect(
      page.getByRole('heading', { name: 'Welcome to Vald Hub' }),
    'Check home page is visible').toBeVisible();
  });
});

test('1.3.5 Login to clinical-mode org, change to another clinical-mode org', async ({
  page,
}) => {
  const login = new Login(page);
  const commonElements = new CommonElements(page);

  await test.step('Login to clinical-mode org', async () => {
    await login.loginUsernamePassword(
      process.env.USER_HEALTH_MULTIORG,
      process.env.PASS_HEALTH_MULTIORG,
    );
  });

  await test.step('Check landing page', async () => {
    await expect(page.getByRole('heading', { name: 'Profiles' }),'Check profiles page is displayed').toBeVisible();
  });

  await test.step('Change to clinical-mode organisation', async () => {
    await commonElements.changeOrganisation('QA Automation Health');
  });

  await test.step('Check landing page', async () => {
    await expect(page.getByRole('heading', { name: 'Profiles' }), 'Check profiles page is displayed').toBeVisible();
  });
});
