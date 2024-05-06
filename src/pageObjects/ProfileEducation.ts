import { Locator, Page, expect } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';

export class ProfileEducation {
  commonElements: CommonElements;
  educationAchillesTendinopathyTile: Locator;
  unassignFirstEducationTileButton: Locator;
  unassignEducationConfirmButton: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.commonElements = new CommonElements(this.page);
    this.educationAchillesTendinopathyTile = page.getByRole('heading', {
      name: 'Achilles Tendinopathy',
    });
    this.unassignFirstEducationTileButton = page
      .locator('.unassign-education-button > .svg-inline--fa > path')
      .first();
    this.unassignEducationConfirmButton = page.getByRole('button', {
      name: 'Confirm',
    });
  }

  async unassignEducation() {
    await this.unassignFirstEducationTileButton.click();
    await this.unassignEducationConfirmButton.click();
  }
}
