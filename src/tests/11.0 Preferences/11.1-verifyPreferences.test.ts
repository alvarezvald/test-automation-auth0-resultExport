import { test, expect } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';
import { VALDConfig } from '@configuration/config';
import { Login } from '@pageObjects/Login';
import { LeftHandMenu } from '@pageObjects/LeftHandMenu';
import { Dashboard } from '@pageObjects/Dashboard';
import { Profiles } from '@pageObjects/Profiles';
import { ProfileIndividual } from '@pageObjects/ProfileIndividual';

const config = VALDConfig();
const url = config.urlValdHubLogin;


test.beforeEach(async ({ page }) => {
  const login = new Login(page);
  const commonElements = new CommonElements(page);

  await commonElements.resizeWindowToStandardSize();
  await page.goto(url);

  await expect(page).toHaveTitle(/VALD/);
  await login.loginUsernamePassword(
    process.env.USER_PREFERENCES,
    process.env.PASS_PREFERENCES,
  );
});

test('11.1.1 Check User Preferences @regression @preferences', async ({ page })=>{
  //Reads Group Home Page, and confirms that the correct test types and metrics show.
  await test.step ('Verify Group Home page', async () => {
    await expect(page.getByText('Push Up', { exact: true })).toBeVisible();
    await expect(page.getByText('Eccentric Mean Force - Bilateral Total', { exact: true })).toBeVisible();
    await expect(page.getByText('CMJ', { exact: true })).toBeVisible();
    await expect(page.getByText('CMJ Stiffness - Left & Right Side', { exact: true })).toBeVisible();
    await expect(page.getByText('Hip Add/Abd - Supine (Knee) Hip Add:Abd Ratio', { exact: true })).toBeVisible();
    await expect(page.getByText('Max Force - Left & Right Side', { exact: true })).toBeVisible();
    await expect(page.getByText('Nordic', { exact: true })).toBeVisible();
    await expect(page.getByText('Max Force - Bilateral Avg', { exact: true })).toBeVisible();
    await expect(page.getByText('Razor', { exact: true })).toBeVisible();
    await expect(page.getByText('Avg Force - Left & Right Side', { exact: true })).toBeVisible();
  });
});

test('11.1.2 Navigate to Monitoring Report Page @regression @preferences', async ({ page }) => {
  const leftHandMenu = new LeftHandMenu(page);
  const dashboard = new Dashboard(page);

  //Navigate to Monitoring Report page
  await leftHandMenu.clickDashboardMenuItem();
  await dashboard.reportsDropDown.click();
  await dashboard.monitoringReportListItem.click();

    //Reads Monitoring Report page tiles and confirms none of them have changed.
    await test.step ('Verify Monitoring Report page', async () => {
      await expect(page.getByText('Squat Assessment', { exact: true })).toBeVisible();
      await expect(page.getByText('Concentric Mean Power / BM', { exact: true })).toBeVisible();
      await expect(page.getByText('Quiet Stand', { exact: true })).toBeVisible();
      await expect(page.getByText('Mean Force - Right Side', { exact: true })).toBeVisible();
      await expect(page.getByText('Hip Add/Abd - Supine (Knee) Hip Add:Abd Ratio', { exact: true })).toBeVisible();
      await expect(page.getByText('Max Force - Left Side').first()).toBeVisible();
      await expect(page.getByText('Ankle Inv/Ev - Supine Ankle Ev', { exact: true })).toBeVisible();
      await expect(page.getByText('Max Force - Right Side', { exact: true })).toBeVisible();
      await expect(page.getByText('Nordic', { exact: true })).toBeVisible();
      await expect(page.getByText('Max Force - Left Side').nth(2)).toBeVisible();
      await expect(page.getByText('Razor', { exact: true })).toBeVisible();
      await expect(page.getByText('Max Force - Bilateral Avg', { exact: true })).toBeVisible();
      await expect(page.getByText('Dynamic Strength Index (DSI)', { exact: true })).toBeVisible();
      await expect(page.getByText('DSI Ratio', { exact: true })).toBeVisible();
      await expect(page.getByText('Push Up', { exact: true })).toBeVisible();
      await expect(page.getByText('Concentric Mean Velocity', { exact: true })).toBeVisible();
    });
});

test('11.1.3 Navigate to ForceDecks Report Page @regression @preferences', async ({ page }) => {
  const dashboard = new Dashboard(page);
  const leftHandMenu = new LeftHandMenu(page);

  //Navigate to ForceDecks Report page
  await leftHandMenu.clickDashboardMenuItem();
  await dashboard.reportsDropDown.click();
  await dashboard.forceDecksReportListItem.click();

    //Reads ForceDecks Report page tiles and confirms none of them have changed.
    await test.step ('Verify ForceDecks Report page', async () => {
      await expect(page.getByText('Quiet Stand', { exact: true })).toBeVisible();
      await expect(page.getByText('CoP Range - Medial-Lateral - Bilateral Avg', { exact: true })).toBeVisible();
      await expect(page.getByText('Abalakov Jump', { exact: true })).toBeVisible();
      await expect(page.getByText('Braking Phase Duration:Contraction Time', { exact: true })).toBeVisible();
      await expect(page.getByText('Hop Test', { exact: true })).toBeVisible();
      await expect(page.getByText('Best Active Stiffness - Bilateral Total', { exact: true })).toBeVisible();
      await expect(page.getByText('Squat Jump', { exact: true })).toBeVisible();
      await expect(page.getByText('Concentric Impulse - Bilateral Total', { exact: true })).toBeVisible();
      await expect(page.getByText('Push Up', { exact: true })).toBeVisible();
      await expect(page.getByText('Concentric Mean Force - Bilateral Total').first()).toBeVisible();
      await expect(page.getByText('Squat Assessment', { exact: true })).toBeVisible();
      await expect(page.getByText('Concentric Mean Force - Bilateral Total').nth(2)).toBeVisible();
      await expect(page.getByText('CMJ', { exact: true })).toBeVisible();
      await expect(page.getByText('Athlete Standing Weight - Bilateral Total', { exact: true })).toBeVisible();
      await expect(page.getByText('Single Leg Jump', { exact: true })).toBeVisible();
      await expect(page.getByText('Braking Phase Duration', { exact: true })).toBeVisible();
    });
});    

test('11.1.4 Navigate to ForceFrame Report Page @regression @preferences', async ({ page }) => {
  const dashboard = new Dashboard(page);
  const leftHandMenu = new LeftHandMenu(page);

  //Navigate to ForceFrame Report page
  await leftHandMenu.clickDashboardMenuItem();
  await dashboard.reportsDropDown.click();
  await dashboard.forceFrameReportListItem.click();

    //Reads ForceFrame Report page tiles and confirms none of them have changed.
    await test.step ('Verify ForceFrame Report page', async () => {
      await expect(page.getByText('Knee Extension - Seated (10)', { exact: true })).toBeVisible();
      await expect(page.getByText('Max Force - Right Side').first()).toBeVisible();
      await expect(page.getByText('Ankle Plantar Flexion - Supine', { exact: true })).toBeVisible();
      await expect(page.getByText('Max Force - Left Side', { exact: true })).toBeVisible();
      await expect(page.getByText('Shoulder Add - Side lying', { exact: true })).toBeVisible();
      await expect(page.getByText('Max Force - Right Side').nth(2)).toBeVisible();
      await expect(page.getByText('Ankle Inv/Ev - Supine Ankle Ev', { exact: true })).toBeVisible();
      await expect(page.getByText('Max Force - Left & Right Side', { exact: true }).first()).toBeVisible();
      await expect(page.getByText('Neck Flexion - Quadruped', { exact: true })).toBeVisible();
      await expect(page.getByText('Max Force - Asym', { exact: true })).toBeVisible();
      await expect(page.getByText('Hip Add/Abd - Supine (Knee) Hip Abd', { exact: true })).toBeVisible();
      await expect(page.getByText('Max Force - Left & Right Side', { exact: true }).nth(1)).toBeVisible();
      await expect(page.getByText('Hip Flexion - Prone', { exact: true })).toBeVisible();
      await expect(page.getByText('Max Force - Left & Right Side', { exact: true }).nth(2)).toBeVisible();
    }); 
}); 

test('11.1.5 Navigate to NordBord Report Page @regression @preferences', async ({ page }) => {
  const dashboard = new Dashboard(page);
  const leftHandMenu = new LeftHandMenu(page);

  //Navigate to NordBord Report page
  await leftHandMenu.clickDashboardMenuItem();
  await dashboard.reportsDropDown.click();
  await dashboard.nordBordReportListItem.click();

    //Reads NordBord Report page tiles and confirms none of them have changed.
    await test.step ('Verify NordBord Report page', async () => {
      await expect(page.getByText('Razor', { exact: true }).first()).toBeVisible();
      await expect(page.getByText('Max Force - Left Side').first()).toBeVisible();
      await expect(page.getByText('Razor', { exact: true }).nth(1)).toBeVisible();
      await expect(page.getByText('Max Force - Right Side').first()).toBeVisible();
      await expect(page.getByText('Razor', { exact: true }).nth(2)).toBeVisible();
      await expect(page.getByText('Impulse - Bilateral Avg', { exact: true })).toBeVisible();
      await expect(page.getByText('Razor', { exact: true }).nth(3)).toBeVisible();
      await expect(page.getByText('Impulse - Asym', { exact: true })).toBeVisible();
      await expect(page.locator('span').filter({ hasText: /^Nordic$/ }).first()).toBeVisible();
      await expect(page.getByText('Max Force - Left Side').nth(2)).toBeVisible();
      await expect(page.locator('span').filter({ hasText: /^Nordic$/ }).nth(1)).toBeVisible();
      await expect(page.getByText('Max Force - Right Side').nth(2)).toBeVisible();
      await expect(page.locator('span').filter({ hasText: /^Nordic$/ }).nth(2)).toBeVisible();
      await expect(page.getByText('Impulse - Left Side', { exact: true })).toBeVisible();
      await expect(page.locator('span').filter({ hasText: /^Nordic$/ }).nth(3)).toBeVisible();
      await expect(page.getByText('Impulse - Right Side', { exact: true })).toBeVisible();
    }); 
}); 

test('11.1.6 Navigate to DSI Report Page @regression @preferences', async ({ page }) => {
  const dashboard = new Dashboard(page);
  const leftHandMenu = new LeftHandMenu(page);
  
  //Navigate to DSI Report page and open the "Edit Calculations" wizard
  await leftHandMenu.clickDashboardMenuItem();
  await dashboard.reportsDropDown.click();
  await dashboard.DSIReportListItem.click();
  await page.getByLabel('Edit Calculations').click();

    //Reads DSI Report page calculations and confirms none of them have changed.
    await test.step ('Verify DSI edit calculations options', async () => {
      await expect(page.getByTestId('labelWrapper-Numerator ').locator('div').filter({ hasText: 'CMJ' }).nth(2)).toBeVisible();
      await expect(page.getByTestId('labelWrapper-Denominator  ').locator('div').filter({ hasText: 'IMTP' }).nth(2)).toBeVisible();
      await expect(page.getByTestId('labelWrapper-Numerator Within X Days of Denominator').locator('div').filter({ hasText: '± 42 days' }).nth(2)).toBeVisible();
      await page.getByTestId('close-button').click();
    });
});
    
test('11.1.7 Navigate to Profile Testing Page @regression @preferences', async ({ page }) => {
  const profiles = new Profiles(page);
  const profileIndividual = new ProfileIndividual(page);

  //Go to Profiles Page and navigate to "Profile Preferences" profile > "Testing" page
  await profiles.goToIndividualProfilePage("Profile Preferences");
  await profileIndividual.profileTestingTab.click();

    //Reads Profile Testing page tiles and confirms none of them have changed.
    await test.step ('Verify Profile Testing page', async () => {
      await expect(page.getByText('Hip Add/Abd - 45° Hip Add', { exact: true })).toBeVisible();
      await expect(page.getByText('Max Force - Asym', { exact: true })).toBeVisible();
      await expect(page.getByText('Quiet Stand').first()).toBeVisible();
      await expect(page.getByText('Mean Velocity - Asym', { exact: true })).toBeVisible();
      await expect(page.getByText('Quiet Stand').nth(2)).toBeVisible();
      await expect(page.getByText('Mean Force - Left & Right Side', { exact: true })).toBeVisible();
    });
});

test('11.1.8 Profile Most Recent tab prefrences @regression @preferences', async ({ page }) => {
  const profiles = new Profiles(page);
  const profileIndividual = new ProfileIndividual(page);
  //Go to Profiles Page and navigate to "Profile Preferences" profile > Most Recent tab
  await profiles.goToIndividualProfilePage("Profile Preferences");
  await profileIndividual.profileMostRecentTab.click();

  //Set up to read Most Recent tab
  await page.getByTestId('labelWrapper-Card Type').locator('div').filter({ hasText: 'By Date' }).nth(2).click();
  await page.getByText('By Test', { exact: true }).click();
  await page.getByTestId('labelWrapper-Time period').locator('div').filter({ hasText: 'Previous Test' }).nth(2).click();
  await page.getByText('Last 12 months', { exact: true }).click();
  
    //Reads Profile Most Recent page tiles and confirms none of them have changed.
    await test.step ('Verify Profile Most Recent page', async () => {
      await expect(page.getByText('Hip AD/AB - 451 testAdd a metric')).toBeVisible();
      await expect(page.locator('span').filter({ hasText: 'Impulse Combined ADD:ABD Ratio' })).toBeVisible();
      await expect(page.locator('span').filter({ hasText: 'Max Force L & R ADD N' })).toBeVisible();
      await expect(page.locator('span').filter({ hasText: 'Max Force L & R ABD N' })).toBeVisible();
      await expect(page.locator('span').filter({ hasText: 'Max Force Asym ADD [%]' })).toBeVisible();
      await expect(page.getByText('Nordic1 testAdd a metric')).toBeVisible();
      await expect(page.locator('span').filter({ hasText: 'Max Force Asym [%]' })).toBeVisible();
      await expect(page.locator('span').filter({ hasText: 'Average Force L & R N' })).toBeVisible();
      await expect(page.locator('span').filter({ hasText: 'Max Force L & R N' })).toBeVisible();
      await expect(page.getByText('QSB1 testAdd a metric')).toBeVisible();
      await expect(page.locator('span').filter({ hasText: 'CoP Range - Medial-Lateral Combined [mm]' })).toBeVisible();
      await expect(page.locator('span').filter({ hasText: 'Total Excursion Combined [mm]' })).toBeVisible();
      await expect(page.locator('span').filter({ hasText: 'Mean Velocity Combined [mm/s]' })).toBeVisible();
      await expect(page.locator('span').filter({ hasText: 'CoP Range - Anterior-Posterior Combined [mm]' })).toBeVisible();
      await expect(page.locator('span').filter({ hasText: 'Mean Force L & R [N]' })).toBeVisible();
      await expect(page.locator('span').filter({ hasText: 'Mean Velocity Asym [%]' })).toBeVisible();
    });
});

test('11.1.9 Profile Overview Preferences @regression @preferences', async ({ page }) => {
  const profiles = new Profiles(page);

  //Go to Profiles Page and navigate to "Profile Preferences" profile
  await profiles.goToIndividualProfilePage("Profile Preferences");

  //Reads Profile Overview page tiles and confirms none of them have changed.
  await test.step ('Verify Profile Overview', async () => {
      await expect(page.getByText('Nordic').nth(2)).toBeVisible();
      await expect(page.getByText('Max Force - Asym').nth(2)).toBeVisible();
      await expect(page.getByText('Squat').nth(2)).toBeVisible();
      await expect(page.getByText('Avg Peak Knee Flexion - Left & Right').nth(2)).toBeVisible();
      await expect(page.getByText('Wrist Flexion 90° Elbow Flexion').nth(1)).toBeVisible();
      await expect(page.getByText('Average ROM Right Side').nth(2)).toBeVisible();
      await expect(page.getByText('Hip Add/Abd - 45°').nth(2)).toBeVisible();
      await expect(page.getByText('Impulse - Bilateral Avg Hip Add:Abd Ratio').nth(1)).toBeVisible();
      await expect(page.getByText('Quiet Stand').nth(2)).toBeVisible();
      await expect(page.getByText('Avg CoP Range - Medial-Lateral - Bilateral Avg').nth(1)).toBeVisible();
      await expect(page.getByText('Abalakov Jump').nth(2)).toBeVisible();
      await expect(page.getByText('Jump Height').nth(1)).toBeVisible();
      await expect(page.getByText('Pro Agility Drill 5-10-5').nth(2)).toBeVisible();
      await expect(page.getByText('Test Time').nth(1)).toBeVisible();
  });
});


  