import { test, expect, Page } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';
import { VALDConfig } from '@configuration/config';
import { Login } from '@pageObjects/Login';
import { LeftHandMenu } from '@pageObjects/LeftHandMenu';
import { flakyWaitForAnimationEnd } from 'utils/common';

const config = VALDConfig();
const url = config.urlValdHubLogin;

//
// Delete all tiles on the group dashboard.
// The display of the "Welcome to your Group Monitoring Dashboard" indicates all tiles
// have been deleted
//
async function deleteAllTiles(page: Page) {

  const groupDashboard = page.locator('.group-dashboard');

  await expect(async () => {
    let wizardDialogVisible = true;
    //
    // Delete tiles
    // Will go through until "Welcome to your Group Monitoring Dashboard" dialog is visible
    // NOTE: Playwright says there is 1 group-tile-menu-close button (i.e. button that looks like a gear)
    // left even though there are no tiles
    //
    await groupDashboard.getByTestId('group-tile-menu-close').nth(0).click();
    await flakyWaitForAnimationEnd(page);
    await page.getByTestId('group-tile-menu-delete').click();
    await flakyWaitForAnimationEnd(page);
    await page.getByRole('button', { name: 'Delete' }).click();
    await flakyWaitForAnimationEnd(page);
    // Dialog takes time to appear after last tile is deleted, so give 3 second
    await page.getByRole('heading', { name: 'Welcome to your Group' }).waitFor({ state: 'visible', timeout: 3000 }).catch(() => wizardDialogVisible = false);
    const gearButtonCount = await page.getByTestId('group-tile-menu-close').count();
    // When no more 'group-tile-menu-close' buttons i.e. gear buttons, and dialog is visible, last tile has been deleted
    await expect(gearButtonCount).toBe(0);
    await expect(wizardDialogVisible).toBe(true);
  }).toPass({
    // Probe, wait 1s, probe, wait 2s, probe, wait 10s, probe, wait 10s, probe
    // ... Defaults to [100, 250, 500, 1000].
    intervals: [1_000],
    timeout: 30_000 // for the toPass only, max time to attempt to pass expect block without non-retrying assertions e.g. expect(wizardDialogVisible).toBe(true)
  });
}

test.beforeEach(async ({ page }) => {
  const login = new Login(page);
  const commonElements = new CommonElements(page);

  await commonElements.resizeWindowToStandardSize();

  await page.goto(url);

  await expect(page).toHaveTitle(/VALD/);
  await page.goto(url);
  await login.loginUsernamePassword(
    process.env.USER_QAHUB23P,
    process.env.PASS_QAHUB23P,
  );
});

/*

NOTE:
If you want to run with [--repeat-each], [--workers=1] is required

e.g. 
npx playwright test --grep "@groupdashboard" --project=Chromium --repeat-each=5 --workers=1
*/


test('12.2.1 Create / duplicate / delete tile - Group Dashboard @groupdashboard @regression', async ({ page, }) => {
  const leftHandMenu = new LeftHandMenu(page);
  await leftHandMenu.clickDashboardMenuItem();

  /*
  Creates ForceDecks tile. Checks buttons and search functions in the wizard.
  */
  await test.step('ForceDecks create', async () => {
    //Continues pass the empty group dashboard window
    await page.getByRole('button', { name: 'Continue' }).click();

    //Starts ForceDecks tile creation
    await page.getByRole('button', { name: 'Add chart' }).click();

    //System page 
    await expect(page.getByRole('button', { name: 'ForceFrame' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'NordBord' })).toBeVisible();
    await page.getByRole('button', { name: 'ForceDecks' }).click();

    //Test Type page
    await page.getByRole('button', { name: 'Balance' }).click();
    await page.getByRole('button', { name: 'Functional' }).click();
    await page.getByRole('button', { name: 'Isometric' }).click();
    await page.getByRole('button', { name: 'Jump' }).click();
    await page.getByRole('button', { name: 'Jump', exact: true }).dblclick();
    await page.getByPlaceholder('Search test type').click();
    await page.getByPlaceholder('Search test type').fill('countermovement jump');
    await page.getByRole('button', { name: 'Countermovement Jump', exact: true }).click();

    //Metric Page
    await expect(page.getByRole('button', { name: 'Jump Height (Imp-Mom)', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Peak Landing Force', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Peak Power / BM', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'RSI-modified', exact: true })).toBeVisible();
    await page.getByPlaceholder('Search metric').click();
    await page.getByPlaceholder('Search metric').fill('jump height');
    await expect(page.getByRole('button', { name: 'Jump Height (Imp-Mom) [cm]' })).toBeVisible();
    await page.getByRole('button', { name: 'Jump Height (Imp-Mom)', exact: true }).click();

    //Check selection
    await expect(page.getByRole('button', { name: 'System ForceDecks' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Test type Countermovement Jump' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Metric Jump Height (Imp-Mom)' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Laterality None' })).toBeVisible();
    await page.getByRole('button', { name: 'Add Chart' }).click();
    await flakyWaitForAnimationEnd(page);

    /*
    Test step for Editing ForceFrame tile
    */
    await test.step('ForceDeck edit', async () => {
      await expect(page.getByRole('button', { name: 'Jump Height (Imp-Mom)' })).toBeVisible();
      await expect(page.getByText('Countermovement Jump')).toBeVisible();
      await page.getByTestId('group-tile-menu-close').click();
      await page.getByTestId('group-tile-menu-edit').click();
      await page.getByRole('button', { name: 'Abalakov Jump' }).click();
      await page.getByRole('button', { name: 'Peak Landing Force', exact: true }).click();
      await page.getByRole('button', { name: 'Left & Right' }).click();
      await flakyWaitForAnimationEnd(page);
      await page.getByRole('button', { name: 'Update' }).click();
      await flakyWaitForAnimationEnd(page);
      await expect(page.getByRole('button', { name: 'Peak Landing Force' })).toBeVisible();
      await expect(page.getByText('Abalakov Jump')).toBeVisible();
    });

    /*
    Test step for Duplication and Deletion of ForceDeck Tile
    */
    await test.step('ForceDecks duplicate and delete', async () => {
      //Duplicate tile
      await page.getByTestId('group-tile-menu-close').click();
      await flakyWaitForAnimationEnd(page);
      await page.getByTestId('group-tile-menu-copy').click();
      await flakyWaitForAnimationEnd(page);

      // Check tile was duplicated
      await expect(await page.getByText('Abalakov Jump')).toHaveCount(2, { timeout: 1000 });

      // Reset data
      await deleteAllTiles(page);
    });
  });

  /*
  Creates ForceFrame tile. Checks buttons and search functions in the wizard.
  */
  await test.step('ForceFrame create', async () => {

    //Continues pass the empty group dashboard window
    await page.getByRole('button', { name: 'Continue' }).click();

    //Starts ForceFrame tile creation
    await page.getByRole('button', { name: 'Add chart' }).click();

    //System page 
    await expect(page.getByRole('button', { name: 'ForceDecks' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'NordBord' })).toBeVisible();
    await page.getByRole('button', { name: 'ForceFrame' }).click();

    //Test Type page
    await page.getByPlaceholder('Search test type').click();
    await page.getByPlaceholder('Search test type').fill('elbow');
    await page.getByRole('button', { name: 'Elbow Extension' }).click();
    await flakyWaitForAnimationEnd(page);

    //Metric Page
    await expect(page.getByRole('button', { name: 'Average Force' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Impulse' })).toBeVisible();
    await page.getByRole('button', { name: 'Maximum Force' }).click();
    await flakyWaitForAnimationEnd(page);
    await page.getByRole('button', { name: 'N/A' }).click();
    await flakyWaitForAnimationEnd(page);
    await page.getByRole('button', { name: 'Seated' }).click();
    await flakyWaitForAnimationEnd(page);
    await page.getByRole('button', { name: 'Metric Maximum Force - Seated' }).click();
    await flakyWaitForAnimationEnd(page);
    await page.getByRole('button', { name: 'N/A', exact: true }).click();
    await flakyWaitForAnimationEnd(page);

    //Laterality Page
    await expect(page.getByRole('button', { name: 'Left', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Right', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Left & Right' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Bilateral total' })).toBeVisible();
    await page.getByRole('button', { name: 'Left & Right' }).click();
    await flakyWaitForAnimationEnd(page);

    //Check selection
    await expect(page.getByRole('button', { name: 'System ForceFrame' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Test type Elbow Extension' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Metric Maximum Force - Seated' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Laterality Left & Right' })).toBeVisible();
    await page.getByRole('button', { name: 'Add Chart' }).click();


    /*
    Test step for Editing ForceFrame tile
    */
    await test.step('ForceFrame edit', async () => {
      await page.getByTestId('group-tile-menu-close').first().click();
      await page.getByTestId('group-tile-menu-edit').click();
      await page.getByRole('button', { name: 'Hip AD/AB' }).click();
      await flakyWaitForAnimationEnd(page);
      await page.getByRole('button', { name: 'Impulse' }).click();
      await flakyWaitForAnimationEnd(page);
      await page.getByRole('button', { name: 'Hip Abduction' }).click();
      await flakyWaitForAnimationEnd(page);
      await page.getByRole('button', { name: '45' }).click();
      await flakyWaitForAnimationEnd(page);
      await page.getByRole('button', { name: 'Left', exact: true }).click();
      await flakyWaitForAnimationEnd(page);
      await page.getByRole('button', { name: 'Update' }).click();
      await flakyWaitForAnimationEnd(page);
      await expect(page.getByText('Hip AD/AB -')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Hip Abduction - Impulse' })).toBeVisible();
    });

    /*
    Test step for Duplication and Deletion of ForceFrame Tile
    */
    await test.step('ForceFrame duplicate and delete', async () => {
      //Duplicate tile
      await page.getByTestId('group-tile-menu-close').click();
      await page.getByTestId('group-tile-menu-copy').click();

      // Check tile was duplicated
      await expect(await page.getByText('Hip AD/AB - 45')).toHaveCount(2, { timeout: 1000 });

      // Reset data
      await deleteAllTiles(page);
    });
  });


  /*
  Creates NordBord tile. Checks buttons and search functions in the wizard.
  */
  await test.step('NordBord create', async () => {

    //Continues pass the empty group dashboard window
    await page.getByRole('button', { name: 'Continue' }).click();

    //Starts NordBord tile creation
    await page.getByRole('button', { name: 'Add chart' }).click();

    //System page 
    await expect(page.getByRole('button', { name: 'ForceDecks' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'ForceFrame' })).toBeVisible();
    await page.getByRole('button', { name: 'NordBord' }).click();

    //Test Type page
    await expect(page.getByRole('button', { name: 'Hamstring Isometric' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Nordic' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Razor' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Custom' })).toBeVisible();
    await page.getByRole('button', { name: 'Nordic' }).click();
    await flakyWaitForAnimationEnd(page);

    //Metric Page
    await expect(page.getByRole('button', { name: 'Maximum force' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Average force' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Maximum torque' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Impulse' })).toBeVisible();
    await page.getByRole('button', { name: 'Maximum force' }).click();
    await flakyWaitForAnimationEnd(page);

    //Laterality page
    await expect(page.getByRole('button', { name: 'Left', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Right', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Left & Right' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Bilateral total' })).toBeVisible();
    await page.getByRole('button', { name: 'Left', exact: true }).click();
    await flakyWaitForAnimationEnd(page);

    //Check selection
    await expect(page.getByRole('button', { name: 'System NordBord' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Test type Nordic' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Metric Maximum force' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Laterality Left' })).toBeVisible();
    await page.getByRole('button', { name: 'Add Chart' }).click();

    /*
    Test step for Editing ForceFrame tile
    */
    await test.step('Nordbord edit', async () => {
      await page.getByTestId('group-tile-menu-close').click();
      await page.getByTestId('group-tile-menu-edit').click();
      await page.getByRole('button', { name: 'Razor' }).click();
      await flakyWaitForAnimationEnd(page);
      await page.getByRole('button', { name: 'Maximum torque' }).click();
      await flakyWaitForAnimationEnd(page);
      await page.getByRole('button', { name: 'Left & Right' }).click();
      await flakyWaitForAnimationEnd(page);
      await page.getByRole('button', { name: 'Update' }).click();
      await flakyWaitForAnimationEnd(page);
      await expect(page.getByText('Razor')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Max Torque' })).toBeVisible();
    });

    /*
    Test step for Duplication and Deletion of NordBord Tile
    */
    await test.step('Nordbord duplicate and delete', async () => {
      //Duplicate tile
      await page.getByTestId('group-tile-menu-close').click();
      await page.getByTestId('group-tile-menu-copy').click();

      // Check tile was duplicated
      await expect(await page.getByText('Razor')).toHaveCount(2, { timeout: 1000 });

      // Reset data
      await deleteAllTiles(page);
    });
  });
});
