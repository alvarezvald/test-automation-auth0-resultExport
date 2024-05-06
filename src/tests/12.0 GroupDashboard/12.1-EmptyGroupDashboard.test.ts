import { test, expect } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';
import { VALDConfig } from '@configuration/config';
import { Login } from '@pageObjects/Login';
import { LeftHandMenu } from '@pageObjects/LeftHandMenu';

const config = VALDConfig();
const url = config.urlValdHubLogin;


test.beforeEach(async ({ page }) => {
  const login = new Login(page);
  const commonElements = new CommonElements(page);

  await commonElements.resizeWindowToStandardSize();
  await page.goto(url);

  await expect(page).toHaveTitle(/VALD/);
  await page.goto(url);
  await login.loginUsernamePassword(
    process.env.USER_EMGROUPDASH,
    process.env.PASS_EMGROUPDASH
  );
});

test('12.1.1 Check Empty Group Dashboard Wizard @groupdashboard @regression', async ({ page, }) => {
  const leftHandMenu = new LeftHandMenu(page);

  await leftHandMenu.clickDashboardMenuItem();
  await expect(page.getByText('To use this dashboard, click')).toBeVisible();
  await expect(page.getByText('Once you have created your')).toBeVisible();
  await expect(page.getByText('Any athlete whose recent')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Welcome to your Group' })).toBeVisible();
  await expect(page.getByLabel('Welcome to your Group').locator('iframe')).toBeVisible();
  await expect(page.locator('#hideSplashCheckbox')).toBeVisible();
  await expect(page.getByText("Don't show me this again")).toBeVisible();
  await page.getByRole('button', { name: 'Continue' }).click();
  const gearButtonCount = await page.getByTestId('group-tile-menu-close').count();
  // Gear buttons are normally on the top of each tile, if no gear buttons then no tiles.
  expect(gearButtonCount, 'No tiles found').toBe(0);
  // Reload page to see splash dialog again
  await page.reload();
  await page.getByLabel('Close', { exact: true }).click();
  // Gear buttons are normally on the top of each tile, if no gear buttons then no tiles.
  expect(gearButtonCount, 'No tiles found').toBe(0);
});
