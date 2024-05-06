import { Locator, Page, expect } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';

export class PROMAssign {

  commonElements: CommonElements;
  searchPROMs: Locator;
  selectAllCheckbox: Locator;
  checkbox: Locator;
  doneButton: Locator;
  surveySideDropdown: Locator;
  sideOptionLeft: any;
  assignPROMButton: any;
  checkboxPROMFirstRowOnDisplay: Locator;
  numberOfSurveys: any;
  recurringRateDropdown: Locator;
  recurringRateFirstOption: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.commonElements = new CommonElements(this.page);
  

  this.searchPROMs = page.getByPlaceholder('Search available surveys');
  this.checkbox = page.locator('input.checkbox');
  this.doneButton = page.locator('div.modal-buttons>button.btn.large.primary');
  this.surveySideDropdown = page.locator('div.final-form-field-container.select-side');
  this.sideOptionLeft = page.locator('label.select-label').nth(0);
  this.assignPROMButton = page.locator('button.btn.large.primary.submit[data-testid="assign-proms-submit"]');
  this.checkboxPROMFirstRowOnDisplay = page.locator('tr:not([class^="hidden-row"])[role=row]>td>div>div>input');
  this.numberOfSurveys = page.getByTestId('number-input-id');
  this.recurringRateDropdown = page.locator('input[aria-labelledby="selectedProms[0].repeatInterval-label"]')
  this.recurringRateFirstOption = page.locator('label.select-label').first()

  }

  async checkSelectCheckbox(checkboxPosition:number) {
    await this.checkbox.nth(checkboxPosition).click();    
  }

  async clickSelectSides() {
    let surveySideCount = 0;
    surveySideCount = await this.surveySideDropdown.count();
    for (let i = 0; i < surveySideCount; i++) {
      await this.surveySideDropdown.nth(i).click();  
      await this.sideOptionLeft.click()
    }
  }

  async enterNumberofSurveys(nbr : string) {
    await this.numberOfSurveys.click();
    await this.numberOfSurveys.fill(nbr);
    await this.numberOfSurveys.press('Tab');    
  }

  async searchPROM(PROMSearchPattern: string) {    
    await this.searchPROMs.click();
    await this.searchPROMs.fill(PROMSearchPattern);
    await this.searchPROMs.press('Tab');
  }
  
}