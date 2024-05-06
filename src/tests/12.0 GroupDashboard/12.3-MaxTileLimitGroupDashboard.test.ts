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
    process.env.USER_GROUPDASH,
    process.env.PASS_GROUPDASH,
  );
});

test('12.3.1 Check cannot add more than EIGHT tiles max - Group Dashboard @groupdashboard @regression', async ({ page, }) => {
  const leftHandMenu = new LeftHandMenu(page);
  await leftHandMenu.clickDashboardMenuItem();

  const gearButtonCount = await page.getByTestId('group-tile-menu-close').count();
  // Check already at max tiles - count charts/tiles, max tile count is 8
  // A gear button per tile, so count gear buttons to get number of tiles
  await expect(gearButtonCount, 'Already at maximum number of tiles (8)').toBe(8);

  // Checks that [add new chart] button is not visible i.e. cannot add more than current 8 tiles
  await expect(page.getByRole('button', { name: 'Add new chart' }), 'Check [add new chart] button is not visible').not.toBeVisible();

  // Checks can't duplicate and go over 8 tiles, confirm pop up
  await page.getByTestId('group-tile-menu-close').first().click();
  await page.getByTestId('group-tile-menu-copy').click();
  await expect(page.getByRole('heading', { name: 'Charts limit reached' }), 'Check Charts limit reach popup is visible').toBeVisible();
  await expect(page.getByText('Maximum limit of dashboard')).toBeVisible();
  await page.getByRole('button', { name: 'Ok' }).click()
});
