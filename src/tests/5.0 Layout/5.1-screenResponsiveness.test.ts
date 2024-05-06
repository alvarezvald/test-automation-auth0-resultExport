import { test } from '@playwright/test';
import { Login } from '@pageObjects/Login';
import { CommonElements } from '@pageObjects/CommonElements';
import { VALDConfig } from '@configuration/config'
import { ScreenResponsiveness } from '@pageObjects/ScreenResponsiveness';
import { OrganisationManagement } from '@pageObjects/OrganisationManagement';

const config = VALDConfig();
const url = config.urlValdHubLogin;

let browserConfiguration = '';

test.beforeAll('Setup', async ({ }, testInfo) => {
  // Set browser configuration used for test
  browserConfiguration = testInfo.project.name;
  console.log('***** Responsiveness tests for configuration: ', browserConfiguration);
});

// Before each test datestamp it and report on test name
test.beforeEach(async ({ page }, testInfo) => {
  const commonElements = new CommonElements(page);
  const login = new Login(page);

  console.log(Date());
  console.log(config);
  console.log(testInfo.title);
  await commonElements.resizeWindow(testInfo.project.use.viewport.width, testInfo.project.use.viewport.height);
  await page.goto(url)
  await login.loginToHubWithOrganisationChange(
    process.env.USER_VALDAUTOMATION,
    process.env.PASS_VALDAUTOMATION,
    "QA Automation Performance"
  );
});

test(`Screenshots: Home for target browser @responsiveness @regression`, async ({ page }) => {
  const snapshot = new ScreenResponsiveness(page);
  const management = new OrganisationManagement(page);
  const section = 'Home';
  const screenshotBase = `${browserConfiguration}-${section}`;

  // Home page
  await management.changeToGroupModeApplyAll();
  await snapshot.homeGroupPageScreenshots(page, screenshotBase);
});

test(`Screenshots: Home-Clinical for target browser @responsiveness @regression`, async ({ page }) => {
  const snapshot = new ScreenResponsiveness(page);
  const section = 'HomeClinical';
  const screenshotBase = `${browserConfiguration}-${section}`;

  // Home page
  await snapshot.homeClinicalPageScreenshots(screenshotBase);
});

test(`Screenshots: Dashboard for target browser @responsiveness @regression`, async ({ page }) => {
  const snapshot = new ScreenResponsiveness(page);
  const section = 'Dashboard';
  const screenshotBase = `${browserConfiguration}-${section}`;

  // Dashboard - Monitoring Report
  await snapshot.dashboardPageScreenshots(page, screenshotBase);
});

test(`Screenshots: Leaderboard for target browser @responsiveness @regression`, async ({ page }) => {
  const snapshot = new ScreenResponsiveness(page);
  const section = 'Leaderboard';
  const screenshotBase = `${browserConfiguration}-${section}`;

  // Leaderboard
  await snapshot.leaderboardScreenshots(page, screenshotBase);
});

test(`Screenshots: ResultsExport for target browser @responsiveness @regression`, async ({ page }) => {
  const snapshot = new ScreenResponsiveness(page);
  const section = 'ResultsExport';
  const screenshotBase = `${browserConfiguration}-${section}`;

  // Vald systems
  await snapshot.resultsExportScreenshots(page, screenshotBase);
});

test(`Screenshots: Management for target browser @responsiveness @regression`, async ({ page }) => {
  const snapshot = new ScreenResponsiveness(page);
  const section = 'Management';
  const screenshotBase = `${browserConfiguration}-${section}`;

  // Management
  await snapshot.managementPageScreenshots(screenshotBase);
});

test(`Screenshots: Profile for target browser @responsiveness @regression`, async ({ page }) => {
  const snapshot = new ScreenResponsiveness(page);
  const section = 'Profile';
  const screenshotBase = `${browserConfiguration}-${section}`;

  // Profiles and tabs
  await snapshot.profilePageScreenshots(screenshotBase);
  await snapshot.createProfileScreenshots(screenshotBase);
  await snapshot.createEditScreenshots(screenshotBase);
});

test(`Screenshots: ProfileExerciseHistory for target browser @responsiveness @regression`, async ({ page }) => {
  const snapshot = new ScreenResponsiveness(page);
  const section = 'ProfileExerciseHistory';
  const screenshotBase = `${browserConfiguration}-${section}`;

  // Profile exercise screens
  await snapshot.exerciseProfileScreenshots(page, screenshotBase);
});

test(`Screenshots: ProfileExercise for target browser @responsiveness @regression`, async ({ page }) => {
  const snapshot = new ScreenResponsiveness(page);
  const section = 'ProfileExercise';
  const screenshotBase = `${browserConfiguration}-${section}`;

  // More profile exercises
  await snapshot.profileExerciseProgram(page, screenshotBase);
});

test(`Screenshots: ProfileNotes for target browser @responsiveness @regression`, async ({ page }) => {
  const snapshot = new ScreenResponsiveness(page);
  const section = 'ProfileNotes';
  const screenshotBase = `${browserConfiguration}-${section}`;

  // Profiles view notes
  await snapshot.profileViewNotes(screenshotBase);
});

test(`Screenshots: ProgramBuilder for target browser @responsiveness @regression`, async ({ page }) => {
  const snapshot = new ScreenResponsiveness(page);
  const section = 'ProgramBuilder';
  const screenshotBase = `${browserConfiguration}-${section}`;

  // Program Builder
  await snapshot.programBuilderScreenshots(screenshotBase);
});

test(`Screenshots: Configuration for target browser @responsiveness @regression`, async ({ page }) => {
  const snapshot = new ScreenResponsiveness(page);
  const section = 'Configuration';
  const screenshotBase = `${browserConfiguration}-${section}`;

  // Assign
  await snapshot.configurationScreenshots(screenshotBase);
});

test(`Screenshots: ClinicalMode for target browser @responsiveness @regression`, async ({ page }) => {
  const snapshot = new ScreenResponsiveness(page);
  const section = 'ClinicalMode';
  const screenshotBase = `${browserConfiguration}-${section}`;

  // Clinical mode - must be run last
  await snapshot.clinicalManagementModeScreenshots(page, screenshotBase);
});
