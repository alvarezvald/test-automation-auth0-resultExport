import { Locator, Page, expect } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';

export class ReportForceDecks {

  commonElements: CommonElements;

  constructor(public page: Page) {
    this.page = page;
    this.commonElements = new CommonElements(this.page);
  }
  
}