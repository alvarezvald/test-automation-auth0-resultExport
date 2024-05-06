import { Locator, Page, expect } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';

export class ReportResultsExport {

  commonElements: CommonElements;
  fromDate: Locator;
  nordBordTab: Locator;
  forceFrameTab: Locator;
  forceDecksTab: Locator;
  humanTrakTab: Locator;
  dynamoTab: Locator;
  smartSpeedTab: Locator;
  filterButton: Locator;
  filterCloseX: Locator;
  forceDeckConfigButton: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.commonElements = new CommonElements(this.page);


    this.fromDate = page.locator('div.rdt>input').nth(0);
    this.nordBordTab = page.getByRole('link', { name: 'NordBord' })
    this.forceFrameTab = page.getByRole('link', { name: 'ForceFrame' })
    this.forceDecksTab = page.getByRole('link', { name: 'ForceDecks' })
    this.humanTrakTab = page.getByRole('link', { name: 'HumanTrak' })
    this.dynamoTab = page.getByRole('link', { name: 'DynaMo' })
    this.smartSpeedTab = page.getByRole('link', { name: 'SmartSpeed' })

    this.filterButton = page.locator('button.btn.large.secondary.filter-btn')
    this.filterCloseX = page.locator('button.react-responsive-modal-closeButton');
    this.forceDeckConfigButton = page.locator('button.btn.large.secondary.align-self-flex-end');

  }

  async enterFromDate(fromDate: string) {
    await this.fromDate.fill(fromDate);
  }

  async validateNordBordTest(system: string) {
    await expect(this.nordBordTab).toHaveText(system);
  }

  async validateForceFrameTest(system: string) {
    await expect(this.forceFrameTab).toHaveText(system);
  }
}