import { Locator, Page } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';

export class EducationAssign {
  commonElements: CommonElements;
  searchEducationInput: Locator;
  selectAllCheckbox: Locator;
  checkbox: Locator;
  assignSelectedButton: Locator;
  surveySideDropdown: Locator;
  sideOptionLeft: any;
  assignPROMButton: any;
  checkboxEducationFirstRowOnDisplay: Locator;
  numberOfSurveys: any;
  educationTileHeader: Locator;
  previewButton: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.commonElements = new CommonElements(this.page);
    this.previewButton = page.getByLabel('Preview');

    this.searchEducationInput = page.getByPlaceholder('Search');
    this.checkbox = page.locator('input.checkbox');
    this.assignSelectedButton = page.locator(
      'div.modal-buttons>button.btn.large.primary'
    );
    this.checkboxEducationFirstRowOnDisplay = page.locator(
      'tr:not([class^="hidden-row"])[role=row]>td>div>div>input'
    );
  }

  async checkSelectCheckbox(checkboxPosition: number) {
    await this.checkbox.nth(checkboxPosition).click();
  }

  async searchEducation(educationSearchPattern: string) {
    await this.searchEducationInput.click();
    await this.searchEducationInput.fill(educationSearchPattern);
    await this.searchEducationInput.press('Tab');
  }
}
