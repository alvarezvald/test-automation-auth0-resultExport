import { Page, expect } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';
import { LeftHandMenu } from '@pageObjects/LeftHandMenu';
import { Leaderboard } from '@pageObjects/Leaderboard';
import { Category } from '@pageObjects/Category';
import { Home } from '@pageObjects/Home';
import { Dashboard } from '@pageObjects/Dashboard';
import { ReportResultsExport } from '@pageObjects/ReportResultsExport';
import { Profiles } from '@pageObjects/Profiles';
import { ProfileIndividual } from '@pageObjects/ProfileIndividual';
import { Profile, ProfileCreate } from '@pageObjects/ProfileCreate';
import { ProgramBuilder } from '@pageObjects/ProgramBuilder';
import { Configuration } from '@pageObjects/Configuration';
import { random } from 'lodash';
import { VALDConfig } from '@configuration/config';
import { OrganisationManagement } from '@pageObjects/OrganisationManagement';
import { flakyWaitForAnimationEnd } from 'utils/common';

const config = VALDConfig();
const healthHub = config.organisationHealth;
const performanceHub = config.organisationPerformance;

export class ScreenResponsiveness {
  commonElements: CommonElements;
  home: Home;
  leftHandMenu: LeftHandMenu;
  dashboard: Dashboard;
  leaderboard: Leaderboard;
  resultsExport: ReportResultsExport;
  category: Category;
  profiles: Profiles;
  profileIndividual: ProfileIndividual;
  createProfile: ProfileCreate;
  randomNumber: number;
  programBuilder: ProgramBuilder;
  configuration: Configuration;
  management: OrganisationManagement;
  modalDrawer: string;
  gridFilter: string;

  //Login Page to enter username and password
  constructor(public page: Page) {
    this.page = page;
    this.commonElements = new CommonElements(this.page);
    this.home = new Home(this.page);
    this.leftHandMenu = new LeftHandMenu(this.page);
    this.dashboard = new Dashboard(this.page);
    this.leaderboard = new Leaderboard(this.page);
    this.resultsExport = new ReportResultsExport(page);
    this.category = new Category(page);
    this.profiles = new Profiles(page);
    this.profileIndividual = new ProfileIndividual(page);
    this.createProfile = new ProfileCreate(page);
    this.programBuilder = new ProgramBuilder(page);
    this.configuration = new Configuration(page);
    this.management = new OrganisationManagement(page);
    this.randomNumber = random(100000, 999999);
    this.modalDrawer = 'div[data-testid="modal"]';
    this.gridFilter = 'div[data-testid="grid-filter"]';
  }

  async homeGroupPageScreenshots(page, testName: string) {
    await this.leftHandMenu.clickHome();
    await expect.soft(this.home.welcomeHeader).toHaveText('Welcome to');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-01HomeGroup`,
    );

    await this.commonElements.userDetailDropdownList.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-01HomeGroup-UserDetailDropdown`,
    );

    await this.carouselScreenshots(page, `${testName}-01HomeGroup-Carousel`);

    // Check modals for edit donut tile
    await expect.soft(this.home.secondDonutTileDrilldown).toHaveCount(1);
    if ((await this.home.secondDonutTileDrilldown.count()) > 0) {
      await this.home.secondDonutTileEditIcon.click();
      await this.page.waitForSelector(this.modalDrawer);
      await expect.soft(this.home.editTileHeader).toHaveText('Edit Tile');
      await this.commonElements.waitForPageToLoadThenTakeScreenshot(
        `${testName}-01HomeGroup-DonutEditTile`,
      );
      await this.commonElements.clickCloseXButton();
      await this.home.secondDonutTileDrilldown.click();

      await flakyWaitForAnimationEnd(this.page); // Need this so works with same selector for chrome and webkit, 
      // solves issue where sometimes drillDownmodal resolves to two elements
      await expect.soft(this.home.drillDownModal).toBeVisible();

      await this.commonElements.waitForPageToLoadThenTakeScreenshot(
        `${testName}-01HomeGroup-DonutTileDrilldown`,
      );
      await this.commonElements.clickCloseXButton();
    }

    //Scroll to longitudinal chart
    if ((await this.home.longitudinalChart.count()) > 0) {
      await this.home.longitudinalChart.hover();
      await this.commonElements.waitForPageToLoadThenTakeScreenshot(
        `${testName}-01HomeGroup-LongitudinalChart`,
      );
    }

    // Change Org
    await this.commonElements.clickChangeOrganisation();
    await expect.soft(this.home.popupHeader).toHaveText('Change Organisation');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-01HomeGroup-ChangeOrg`,
    );
    await this.commonElements.clickCancelButton();

    await this.commonElements.clickLogOut();
    await expect.soft(this.home.popupHeader).toHaveText('Log Out');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-01HomeGroup-Logout`,
    );
    await this.commonElements.clickCancelButton();
  }

  async homeClinicalPageScreenshots(testName: string) {
    await this.leftHandMenu.clickHome();
    await this.commonElements.changeOrganisation(healthHub);
    await this.management.changeToClinicalModeApplyAll();

    await this.leftHandMenu.clickHome();
    await expect.soft(this.home.welcomeHeader).toHaveText('Welcome to');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-01HomeClinical`,
    );

    // Check modals for edit donut tile
    await expect
      .soft(this.home.homeTileHeader.first())
      .toHaveText('Quick links');
    await expect.soft(this.home.homeTileHeader.nth(1)).toHaveText("What's New");
    await expect
      .soft(this.home.homeTileHeader.nth(2))
      .toHaveText('VALD Technology');

    await this.home.downloadVALDInfoPack.click();
    await this.page.waitForSelector(this.modalDrawer);

    await expect
      .soft(this.home.modalDownloadInfoPackHeader)
      .toHaveText('VALD Hub');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-01HomeClinical-DownloadInfoPack`,
    );
    await this.commonElements.clickCloseXButton();

    await this.commonElements.changeOrganisation(performanceHub);
  }

  async carouselScreenshots(page, testName: string) {
    const home = new Home(page);
    const commonElements = new CommonElements(page);

    let carouselDotCount = async () => {
      let dotCount = await home.carouselDots.count();
      if (dotCount) {
        return dotCount;
      }
      {
        return 0;
      }
    };
    let x = await carouselDotCount();

    for (let i = 0; i < x; i++) {
      await home.carouselDots.nth(i).click();
      await commonElements.delay(500);
      await commonElements.waitForPageToLoadThenTakeScreenshot(
        `${testName}-Carousel-${i}.png`,
      );
    }
  }

  async dashboardPageScreenshots(page, testName: string) {
    await this.leftHandMenu.clickDashboardMenuItem();
    await this.dashboard.reportsDropDown.click();
    await this.dashboard.monitoringReportListItem.click();
    await expect
      .soft(page.locator('div.Header__main>h1'))
      .toHaveText('Monitoring');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-02Dashboard-Monitoring`,
    );

    // DSI report
    await this.leftHandMenu.clickDashboardMenuItem();
    await this.dashboard.reportsDropDown.click();
    await this.dashboard.DSIReportListItem.click();
    await this.page.waitForSelector('div.dsi-loader');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-02Dashboard-DSI`,
    );

    // Screen shot of the charts on this page

    await this.dashboard.reportsDropDown.click();
    await this.dashboard.monitoringReportListItem.click();

    // Set to 12 months so bottom three tiles show data
    await this.home.selectTimePeriod.click();
    await page.getByText('Last 12 Months', { exact: true }).click();

    await this.dashboard.chart1.hover();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-02Dashboard-Chart1`,
    );
    await this.dashboard.chart2.hover();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-02Dashboard-Chart2`,
    );
    await this.dashboard.chart3.hover();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-02Dashboard-Chart3`,
    );

    // Screenshot edit chart
    await expect
      .soft(this.dashboard.editRelativeTestMetricChartIcon)
      .toHaveCount(1);
    if ((await this.dashboard.editRelativeTestMetricChartIcon.count()) > 0) {
      await this.dashboard.editRelativeTestMetricChartIcon.click();
      await this.page.waitForSelector(this.modalDrawer);
      await expect
        .soft(this.commonElements.modalHeader.nth(0))
        .toHaveText('Edit Relative Chart');
      await this.commonElements.waitForPageToLoadThenTakeScreenshot(
        `${testName}-02Dashboard-EditRelativeTest`,
      );
      await this.commonElements.clickCloseXButton();
    }

    await expect.soft(this.dashboard.editLongitudinalChartIcon).toHaveCount(1);
    if ((await this.dashboard.editLongitudinalChartIcon.count()) > 0) {
      await this.dashboard.editLongitudinalChartIcon.click();
      await this.page.waitForSelector(this.modalDrawer);
      await expect
        .soft(this.commonElements.modalHeader.nth(1))
        .toHaveText('Edit Longitudinal Chart');
      await this.commonElements.waitForPageToLoadThenTakeScreenshot(
        `${testName}-02Dashboard-EditLongitudinal`,
      );
      await this.commonElements.closeX.nth(1).click();
    }

    await expect.soft(this.dashboard.editComparisonChartIcon).toHaveCount(1);
    if ((await this.dashboard.editComparisonChartIcon.count()) > 0) {
      await this.dashboard.editComparisonChartIcon.click();
      await this.page.waitForSelector(this.modalDrawer);
      await expect
        .soft(this.commonElements.modalHeader.nth(1))
        .toHaveText('Edit Comparison Chart');
      await this.commonElements.waitForPageToLoadThenTakeScreenshot(
        `${testName}-02Dashboard-EditComparison`,
      );
      await this.commonElements.closeX.nth(1).click();
    }

  }

  async leaderboardScreenshots(page, testName: string) {
    // Leaderboard
    await this.leftHandMenu.clickHome();
    await this.leftHandMenu.clickLeaderboard();
    await expect.soft(page.locator('header>div>h1')).toHaveText('Leaderboard');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-03Leaderboard`,
    );

    await this.leaderboard.createLeaderboardButton.click();
    await expect
      .soft(page.locator('form.leaderboard-configuration>div>h2'))
      .toHaveText('Create Leaderboard');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-03Leaderboard-Create`,
    );
    await this.commonElements.clickModalCloseXButton();

    await this.leaderboard.firstRowLeaderboardTable.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-03Leaderboard-Detail`,
    );
    await this.commonElements.clickModalCloseXButton();

    await this.leaderboard.editLeaderboardButton.click();
    await expect
      .soft(page.locator('form.leaderboard-configuration>div>h2'))
      .toHaveText('Edit Leaderboard');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-03Leaderboard-Edit`,
    );
    await this.commonElements.clickCancelButton();
  }

  async resultsExportScreenshots(page, testName: string) {
    await this.leftHandMenu.clickVALDSystems();
    await this.resultsExport.nordBordTab.click();
    await this.resultsExport.enterFromDate('01/01/2021');
    await page.keyboard.press('Enter');

    await this.page.waitForSelector('div.nordbord-table');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-04ResultsExport-NordBord`,
    );
    await this.resultsExport.filterButton.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-04ResultsExport-NordBord-Filter`,
    );
    await this.resultsExport.filterCloseX.click();

    await this.resultsExport.forceFrameTab.click();
    await this.page.waitForSelector('div.forceframe-table');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-04ResultsExport-ForceFrame`,
    );
    await this.resultsExport.filterButton.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-04ResultsExport-ForceFrame-Filter`,
    );
    await this.resultsExport.filterCloseX.click();

    await this.resultsExport.forceDecksTab.click();
    await this.page.waitForSelector('div.forcedecks-table');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-04ResultsExport-ForceDecks`,
    );
    await this.resultsExport.forceDeckConfigButton.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-04ResultsExport-ForceDecks-Settings`,
    );
    await this.resultsExport.filterCloseX.click();

    await this.resultsExport.dynamoTab.click();
    await this.page.waitForSelector('div.dynamo-table');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-04ResultsExport-DynaMo`,
    );
    await this.resultsExport.filterButton.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-04ResultsExport-DynaMo-Filter`,
    );
    await this.resultsExport.filterCloseX.click();

    await this.resultsExport.smartSpeedTab.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-04ResultsExport-SmartSpeed`,
    );
    await this.page.waitForSelector(this.gridFilter);
    await this.resultsExport.filterButton.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-04ResultsExport-SmartSpeed-Filter`,
    );
    await this.resultsExport.filterCloseX.click();

    await this.resultsExport.humanTrakTab.click();
    await this.page.waitForSelector(this.gridFilter);
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-04ResultsExport-HumanTrak`,
    );
  }

  async managementPageScreenshots(testName: string) {
    await this.leftHandMenu.clickHome();
    await this.leftHandMenu.clickManagement();
    await expect.soft(this.commonElements.pageHeader).toHaveText('Management');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-05Management`,
    );
    await this.category.createCategoryButton.click();
    await expect.soft(this.home.popupHeader).toHaveText('Create Category');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-05Management-CreateCategory`,
    );
    await this.commonElements.clickCancelButton();

    await this.category.tabGroups.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-05Management-Groups`,
    );
    await this.category.createGroupButton.click();
    await expect.soft(this.home.popupHeader).toHaveText('Create Group');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-05Management-GroupCreate`,
    );
    await this.commonElements.clickCancelButton();

    await this.category.tabUsers.click();
    await this.page.waitForSelector('table.component-table');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-05Management-Users`,
    );
    await this.category.createUserButton.click();
    await expect.soft(this.commonElements.pageHeader).toHaveText('Create user');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-05Management-UsersCreate`,
    );
    await this.leftHandMenu.clickManagement();

    await this.category.tabSettings.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-05Management-Settings`,
    );
    await this.category.tabOrganisation.click();
    await this.page.waitForSelector('form.organisation-form');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-05Management-Organisation`,
    );
    await this.category.tabIntegration.click();
    await flakyWaitForAnimationEnd(this.page);
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-05Management-Integration`,
    );
  }

  setNewProfileDetails(): Profile {
    const familyName = 'Autotest-ScreenShot-' + this.randomNumber;
    const newProfile: Profile = {
      givenName: 'QA',
      familyName: familyName,
      dateOfBirth: '12/12/1995',
      email: 'qa.vald+testProfile.' + this.randomNumber + '@vald.com',
      gender: 'Male',
      externalID: '1234',
      weight: '60',
      height: '175',
      sport: 'Circus',
      position: 'Clown',
      notes: 'Best ever',
      middleName: '',
      allowPhotoAndVideoRecording: true,
      guardianConsent: false,
      informationEnteredby18plus: false,
    };
    return newProfile;
  }

  async createProfileScreenshots(testName: string) {
    //await this.commonElements.setDateFormatDDMMYYYY();

    console.log('create Profile Screenshots');
    //Set up a profile
    const newProfile = this.setNewProfileDetails();

    console.log('create profile object');

    await this.leftHandMenu.clickProfiles();
    await this.profiles.createProfileButton.click();
    await expect
      .soft(this.commonElements.pageHeader)
      .toHaveText('Create Profile');

    console.log(newProfile);
    await this.createProfile.enterProfileDetails(newProfile);
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-06CreateProfile-EditProfile`,
    );
    // go to Assign groups
    await this.createProfile.nextButton.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-06CreateProfile-AssignGroupsProfile`,
    );
    await this.createProfile.cancelButton.click();
  }

  async createEditScreenshots(testName: string) {
    await this.leftHandMenu.clickHome();
    await this.leftHandMenu.clickProfiles();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-06-CreateProfile`,
    );
    await this.leftHandMenu.clickProfiles();
    await this.profiles.displayAsTileButton.click();
    await this.profiles.selectProfileTileThreeDotMenu('Edit Details');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-06-CreateProfile-EditProfile`,
    );
    await this.createProfile.anthropometryTab.click();
    await this.page.waitForSelector('div.step-two-contents');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-06-CreateProfile-Anthropometry`,
    );
    await this.commonElements.clickCancelButton();
  }

  async profilePageScreenshots(testName: string) {
    await this.leftHandMenu.clickProfiles();
    await expect.soft(this.commonElements.pageHeader).toHaveText('Profiles');
    await this.profiles.displayAsListButton.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-06-Profiles-List`,
    );
    await this.profiles.displayAsTileButton.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-06-Profiles-Tile`,
    );
    await this.profiles.profileTileFirst.click();
    await this.profileIndividual.profileOverviewTab.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-06-ProfileIndividual-01Overview`,
    );
    await this.profileIndividual.clickActionsButton();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-06-ProfileIndividual-01Overview-Actions`,
    );

    await this.profileIndividual.profileTestingTab.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-06-ProfileIndividual-02Testing`,
    );
    await this.profileIndividual.clickActionsButton();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-06-ProfileIndividual-02Testing-Actions`,
    );

    await this.profileIndividual.profileMostRecentTab.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-06-ProfileIndividual-03MostRecent`,
    );
    await this.profileIndividual.clickActionsButton();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-06-ProfileIndividual-03MostRecent-Actions`,
    );

    await this.profileIndividual.profileResultsTableTab.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-06-ProfileIndividual-04ResultsTable`,
    );
    await this.profileIndividual.clickActionsButton();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-06-ProfileIndividual-04ResultsTable-Actions`,
    );

    await this.profileIndividual.profileExerciseTab.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-06-ProfileIndividual-05Exercise`,
    );
    await this.profileIndividual.clickActionsButton();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-06-ProfileIndividual-05Exercise-Actions`,
    );

    await this.profileIndividual.profileEductionTab.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-06-ProfileIndividual-06Education`,
    );
    await this.profileIndividual.clickActionsButton();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-06-ProfileIndividual-06Eduction-Actions`,
    );

    await this.profileIndividual.profilePROMSTab.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-06-ProfileIndividual-07PROMS`,
    );
    await this.profileIndividual.clickActionsButton();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-06-ProfileIndividual-07PROMS-Actions`,
    );
  }

  async exerciseProfileScreenshots(page, testName: string) {
    const profiles = new Profiles(page);
    const profileIndividual = new ProfileIndividual(page);
    const commonElements = new CommonElements(page);
    const leftHandMenu = new LeftHandMenu(page);

    await leftHandMenu.clickHome();
    await leftHandMenu.clickProfiles();
    await profiles.goToIndividualProfilePage('QA Automation');

    await profileIndividual.profileExerciseTab.click();
    await commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-08-Profile-ExerciseHistory`,
    );

    // drilldown to exercise chart
    await profileIndividual.firstRowExerciseChartIcon.click();
    await this.page.waitForSelector('div.sessions-summary-container');
    await commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-08-Profile-ExerciseHistoryDrilldown`,
    );

    await profileIndividual.showAllExerciseCheckbox.click();
    await commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-08-Profile-ExerciseHistoryShowAllExercies`,
    );

    await profileIndividual.showIndividualExerciseDetails.click();
    await commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-08-Profile-ExerciseHistoryDetails`,
    );
  }

  async profileExerciseProgram(page, testName: string) {
    const profiles = new Profiles(page);
    const profileIndividual = new ProfileIndividual(page);
    const commonElements = new CommonElements(page);
    const leftHandMenu = new LeftHandMenu(page);

    // Program details page
    await leftHandMenu.clickHome();
    await leftHandMenu.clickProfiles();
    await profiles.goToIndividualProfilePage('QA Automation');
    await profileIndividual.profileExerciseTab.click();
    await profileIndividual.exerciseTableFirstRow.click();
    await profileIndividual.programVideoButton.click();
    await commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-09-Profile-ExerciseDetails-videos`,
    );

    await profileIndividual.programImagesButton.click();
    await flakyWaitForAnimationEnd(this.page);
    await commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-09-Profile-ExerciseDetails-Images`,
    );

    await profileIndividual.moreDropdown.click();
    await commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-09-Profile-ExerciseDetails-MoreDropdown`,
    );
  }

  async profileViewNotes(testName: string) {
    // Program details page
    await this.profiles.goToIndividualProfilePage('QA Automation');

    await this.profileIndividual.clickActionViewNotes();
    await this.page.waitForSelector('div.patient-notes-container');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-10-Profile-ViewNotes`,
    );
  }

  async programBuilderScreenshots(testName: string) {
    await this.leftHandMenu.clickProgramBuilderMenuItem();
    await expect
      .soft(this.commonElements.pageHeader)
      .toHaveText('Program Builder');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-11-ProgramBuilder-01`,
    );

    await this.programBuilder.programTileTitle.nth(3).click();
    await this.page.waitForSelector(this.modalDrawer);
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-11-ProgramBuilder-02`,
    );
    await this.profileIndividual.programImagesButton.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-11-ProgramBuilder-03`,
    );
    await this.profileIndividual.programVideoButton.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-11-ProgramBuilder-04`,
    );
    await this.commonElements.clickCancelButton();

    await this.programBuilder.enterProgramName('AutoP1');
    await this.programBuilder.programAddToProgram.nth(1).click();
    await this.programBuilder.programAddToProgram.nth(2).click();
    await this.programBuilder.programAddToProgram.nth(3).click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-11-ProgramBuilder-05`,
    );

    await this.programBuilder.builderTiles.nth(0).click();
    await this.programBuilder.builderTiles.nth(1).click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-11-ProgramBuilder-06`,
    );

    await this.programBuilder.editSelectedButton.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-11-ProgramBuilder-07`,
    );
    await this.commonElements.clickCancelButton();

    await this.programBuilder.builderTiles.nth(0).click();
    await this.programBuilder.builderTiles.nth(1).click();
    await this.programBuilder.createSupersetButton.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-11-ProgramBuilder-08`,
    );

    await this.programBuilder.assignToProfileButton.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-11-ProgramBuilder-09`,
    );

    //Search for profile
    await this.programBuilder.enterProfileSearchField('QA Automation');
    await this.programBuilder.selectProfilesTableList.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-11-ProgramBuilder-10`,
    );
    await this.programBuilder.ongoingButton.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-11-ProgramBuilder-11`,
    );

    await this.programBuilder.returnToProgramBuilderButton.click();

    await this.programBuilder.clearProgramButton.click();
    await this.programBuilder.confirmClearProgramButton.click();
  }

  async configurationScreenshots(testName: string) {
    await this.leftHandMenu.clickConfigurationMenuItem();
    await this.configuration.trainingTab.click();
    await this.page.waitForSelector('div.programs-view')
    await expect
      .soft(this.commonElements.pageHeader)
      .toHaveText('Configuration');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-12-Configruation-01Training`,
    );

    // Forceframe
    await this.configuration.createFFProgramButton.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-12-Configruation-02CreateTraining`,
    );

    await this.configuration.trainingFFTiles.nth(0).click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-12-Configruation-03CreateTraining`,
    );
    await this.configuration.addExerciseToProgram.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-12-Configruation-04CreateTraining`,
    );
    await this.configuration.clearProgramButton.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-12-Configruation-05CreateTraining`,
    );
    await this.commonElements.okButton.click();

    // Wait for above dialog to disappear - have seen page change underneath it due to Playwright click speed
    await this.page.getByTestId('modal').waitFor({ state: 'hidden', timeout: 5000 });

    await this.configuration.templatesTab.click();
    await this.page.waitForSelector('div.table-container');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-12-Configruation-06Templates`,
    );

    await this.configuration.firstRowAssignTemplateButton.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-12-Configruation-07Templates`,
    );
    await this.configuration.assignTemplateTemplatePanel.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-12-Configruation-08Templates`,
    );
    await this.configuration.assignTemplateProgramPanel.click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-12-Configruation-09Templates`,
    );
    await this.commonElements.clickCloseXButton();

    // Drills
    await this.leftHandMenu.clickConfigurationMenuItem();
    await this.configuration.drillsTab.click();
    await this.page.waitForSelector('div.drill-list');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-12-Configruation-10Drills`,
    );

    // Education
    await this.leftHandMenu.clickConfigurationMenuItem();
    await this.configuration.educationTab.click();
    await this.page.waitForSelector('div.assign-education-page');
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-12-Configruation-11Education`,
    );

    await this.configuration.educationPreviewButton.nth(1).click();
    await this.commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-12-Configruation-11EducationPreview`,
    );
    await this.commonElements.clickCloseXButton();
  }

  async clinicalManagementModeScreenshots(page, testName: string) {
    const commonElements = new CommonElements(page);
    const leftHandMenu = new LeftHandMenu(page);

    //const healthOrg = string(config.organisationHealth);
    const healthOrg = 'QA Automation Health';
    await commonElements.changeOrganisation(healthOrg);
    await commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-13-HealthOrg`,
    );

    await this.carouselScreenshots(page, `${testName}-13-HealthOrg-Carousel`);

    if ((await commonElements.whatsNewModal.count()) > 0) {
      await commonElements.clickCloseXButton();
    }
    await leftHandMenu.clickHome();
    await commonElements.waitForPageToLoadThenTakeScreenshot(
      `${testName}-13-HealthOrg-HomePage`,
    );
  }
}
