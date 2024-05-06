import { Locator, Page, expect } from '@playwright/test';
import { debounceDom, flakyWaitForAnimationEnd } from 'utils/common';

export const GroupModeLeftHandMenu = [
  'Home',
  'Dashboard',
  'Profiles',
  'VALD Systems',
  'Leaderboard',
  'Program Builder',
  'Configuration',
  'Management',
];

export const ClinicModeLeftHandMenu = [
  'Home',
  'Dashboard',
  'Profiles',
  'Program Builder',
  'Configuration',
  'Management',
];

export class LeftHandMenu {
  leftHandMenuNavigation: Locator;
  sidebarParent: Locator;
  tabletModeOpenButton: Locator; // For tablet mode or Program Builder/Configuration pages
  tabletModeCloseButton: Locator; // For tablet mode or Program Builder/Configuration pages
  tabletMenuOpen: boolean;
  homeGroupMenuItem: Locator;
  dashboardMenuItem: Locator;
  profilesMenuItem: Locator;
  leaderboardMenuItem: Locator;
  configurationMenuItem: Locator;
  valdSystemsMenuItem: Locator;
  managementMenuItem: Locator;
  programBuilderMenuItem: Locator;
  normativeDataMenuItem: Locator;
  groupHomeUrl: string;
  reportsUrl: string;
  dashboardExerciseUrl: string;
  normativeDataUrl: string;
  hubProfilesUrl: string;
  valdSystemsUrl: string;
  programBuilderExerciseUrl: string;
  forceFrameTrainingUrl: string;
  assignExerciseUrl: string;
  administrationUrl: string;
  resultsExportUrl: string;
  managementSettingsUrl: string;
  longitudinalChartTitleText: Locator;
  welcomeHeaderText: Locator;
  dashboardTitle: Locator;
  expandedLeftHandMenu: Locator;

  constructor(public page: Page) {
    this.page = page;


    this.leftHandMenuNavigation = page.locator('nav.navigation-items>ul>li');
    // possibly have funciton that checks if sidebar is visible and clicks on hamburger?

    // Standard sidebar parent for desktop mode that is present in DOM but hidden in tablet/side-bar mode
    this.sidebarParent = page.locator('.sidebar-container > aside');
    // open-close-button visible in tablet mode or when on Program Builder or Configuration pages with the compact side-bar
    this.tabletModeOpenButton = page.locator('.burger-menu').locator('visible=true').or(page.locator('.open-close-button'));
    this.tabletModeCloseButton = page.getByRole('dialog').getByTestId('close-button'); // Present when slide-out is open

    // The page.locators have to be reg exp because they have to work from valdperformance AND telehab url.

    // NOTE: sometimes need an extra visible filter ('visible=true') as two duplicate elements (e.g. two home menu items) are present in DOM
    // at the same time depending on normal or tablet mode i.e. only one is visible at at time
    this.homeGroupMenuItem = page.getByLabel("Home").locator('visible=true');//page.locator("a[href*='/app/group-home']").locator('visible=true'); 
    this.dashboardMenuItem = page.getByRole('link', { name: 'Dashboard' });
    this.profilesMenuItem = page.locator("a[href*='/app/profiles']").filter({ hasText: 'Profiles' }).locator('visible=true');
    this.leaderboardMenuItem = page.locator("a[href*='/app/leaderboard']").locator('visible=true');
    this.configurationMenuItem = page.locator("a[href*='/app/configuration']").locator('visible=true');
    this.valdSystemsMenuItem = page.locator("a[href*='/app/systems']").locator('visible=true');
    this.managementMenuItem = page.locator("a[href*='/app/management']").locator('visible=true')
    this.programBuilderMenuItem = page.locator("a[href*='/app/library']").locator('visible=true')
    this.normativeDataMenuItem = page.locator("a[href*='/app/reports/dataReports']")

    this.groupHomeUrl = 'valdperformance.com/app/group-home';
    this.reportsUrl = 'valdperformance.com/app/reports';
    this.dashboardExerciseUrl = 'telehab.io/app/exercise-dashboard';
    this.normativeDataUrl = 'valdperformance.com/app/reports/dataReports';
    this.hubProfilesUrl = 'valdperformance.com/app/profiles';
    this.valdSystemsUrl = 'valdperformance.com/app/systems';
    this.programBuilderExerciseUrl = 'telehab.io/app/library';
    this.forceFrameTrainingUrl = 'valdperformance.com/app/configuration/training-programs';
    this.assignExerciseUrl = 'telehab.io/app/configuration/program-templates';
    this.administrationUrl = 'valdperformance.com/app/management/categories';
    this.resultsExportUrl = 'valdperformance.com/app/systems';
    this.managementSettingsUrl = 'valdperformance.com/app/management/settings';

    // Expects for text verification
    this.longitudinalChartTitleText = page.locator('span.card__title').nth(6);
    this.welcomeHeaderText = page.locator('h1.page-header-title');
    this.dashboardTitle = page.locator('h1.dashboard-title');

    this.expandedLeftHandMenu = page.locator('nav.navigation-items')

    // Tablet menu
    this.tabletMenuOpen = false;
  }

  //check page url
  async verifyUrl(pageUrl: string, matchUrl: string) {

    if (!pageUrl.includes(matchUrl)) {
      console.log('ERROR page url does not match expected url');
    } else {
      console.log('Url matches expected url');
    }
  }

  /**
   * Returns true, if we are in tablet/side-bar mode and false if we are in standard mode i.e. desktop
   
  * isTabletModeOrCompactSidebarMode = true
   * - tablet mode - horizontal resolution is reduced simulating mobile device or tablet
   * - compact sidebar - used when on Program Builder or Configuration pages which go out to Telehab
   * Returns 'dialog' element as a dialog is used as the parent in this case.
   *
   * isTabletModeOrCompactSidebarMode = false
   * Typical desktop browser mode - returns selector '.sidebar-container > aside' as the parent. This
   * usually contains the child list of menu items in this mode.
   * 
   * @returns A Promise that resolves to the Locator of the parent element.
   */
  async isTabletModeOrCompactSidebarMode(): Promise<boolean> {
    return await this.tabletModeOpenButton.isVisible();
  }
  async getMenuParent(isTabletOrSidebarMode: boolean): Promise<Locator> {
    // In tablet/side-bar mode the parent of the menu items is a dialog, otherwise
    // its the normal sidebar parent
    return isTabletOrSidebarMode ? this.page.getByRole('dialog') : this.sidebarParent;
  }

  async handleMenuClick(menuItemBase: Locator): Promise<void> {
    // Need to be sure page is loaded and stable before we check for tablet mode, etc.
    await debounceDom(this.page, 500, 1000);

    const tabletorSidebarMode: boolean = await this.isTabletModeOrCompactSidebarMode();

    if (tabletorSidebarMode)
      // Handle slideout of side menu as required
      await this.handleMenuModeSlideout();

    const parent: Locator = await this.getMenuParent(tabletorSidebarMode);
    const menuItemResolved = parent.locator(menuItemBase);
    // Click on menu item after selctor resolved based on tablet/side-bar or desktop mode
    await menuItemResolved.click();
    await this.page.waitForLoadState('networkidle');
    // Normally menu will collapse by itself after click,
    // but always call to wait for any animation stragglers to finish
    // before continuing
    await this.handleMenuModeSlideout(true);
  }

  async handleMenuModeSlideout(closeMenu: boolean = false): Promise<boolean> {

    if (closeMenu) {
      // Wait for menu to slide out, usually after a click
      await flakyWaitForAnimationEnd(this.page);
      this.tabletMenuOpen = false;
    }
    else {
      expect(await this.tabletModeOpenButton.count(), 'A hamburger or side-bar menu button is required.').toBe(1);

      await this.tabletModeOpenButton.click();
      // Wait for slide out menu panel to finish animating
      await flakyWaitForAnimationEnd(this.page);

      this.tabletMenuOpen = true;
    }

    return this.tabletMenuOpen;
  }


  async clickHome() {
    await this.handleMenuClick(this.homeGroupMenuItem);
  }

  async clickDashboardMenuItem() {
    await this.handleMenuClick(this.dashboardMenuItem);
  }

  async clickProfiles() {
    await this.handleMenuClick(this.profilesMenuItem);
  }

  async clickLeaderboard() {
    await this.handleMenuClick(this.leaderboardMenuItem);
  }

  async clickVALDSystems() {
    await this.handleMenuClick(this.valdSystemsMenuItem);
  }

  async clickProgramBuilderMenuItem() {
    await this.handleMenuClick(this.programBuilderMenuItem);
  }

  async clickConfigurationMenuItem() {
    await this.handleMenuClick(this.configurationMenuItem);
  }

  async clickManagement() {
    await this.handleMenuClick(this.managementMenuItem);
  }
}
