import { Locator, Page, expect } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';

export class Dashboard {

  commonElements: CommonElements;
  topLeftActionSection: Locator;
  reportsDropDown: any;
  monitoringReportListItem: Locator;
  forceDecksReportListItem: Locator;
  nordBordReportListItem: Locator;
  forceFrameReportListItem: Locator;
  DSIReportListItem: Locator;
  normativeDataReportListItem: Locator;
  LeaderboardReportListItem: Locator;
  resultsExportReportListItem: Locator;
  chart1: Locator;
  chart2: Locator;
  chart3: Locator;
  editRelativeTestMetricChartIcon: Locator;
  editLongitudinalChartIcon: Locator;
  editComparisonChartIcon: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.commonElements = new CommonElements(this.page);

    this.topLeftActionSection = page.locator('div.page-header>header');
    this.reportsDropDown = page.locator('div.action-menu.imposter-container.report-icon-dropdown')
    
    this.monitoringReportListItem = page.locator('button[aria-label="Monitoring Report"]')
    this.forceDecksReportListItem = page.locator('button[aria-label="ForceDecks Report"]')
    this.nordBordReportListItem = page.locator('button[aria-label="NordBord Report"]')
    this.forceFrameReportListItem = page.locator('button[aria-label="ForceFrame Report"]')
    this.DSIReportListItem = page.locator('button[aria-label="DSI Report"]').nth(0)
    this.normativeDataReportListItem = page.locator('button[aria-label="Normative Data Reports"]')
    this.LeaderboardReportListItem = page.locator('button[aria-label="Leaderboard"]')
    this.resultsExportReportListItem = page.locator('button[aria-label="Results Export"]')

    this.editRelativeTestMetricChartIcon = page.locator('div[data-for="Relative Test Metrics"]>div>div>svg') 
    this.editLongitudinalChartIcon = page.locator('div[data-for^="Longitudinal:"]>div>div>svg')
    this.editComparisonChartIcon = page.locator('div[data-for^="Comparison:"]>div>div>svg')
    
    this.chart1 = page.locator('div.chart-container').nth(0);
    this.chart2 = page.locator('div.chart-container').nth(1);
    this.chart3 = page.locator('div.chart-container').nth(2);
  }
  
}