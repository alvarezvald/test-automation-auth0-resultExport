import { Locator, Page, expect } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';

export class ProfileAssignGroup {

  commonElements: CommonElements;
  searchProfiles: any;
  tabAll: any;
  tabAssigned: any;
  doneButton: any;
  profileRow: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.commonElements = new CommonElements(this.page);

    this.searchProfiles = page.locator('div.assign-modal>div>div.search-input');
    this.tabAll = page.locator('div.tab-nav>div').nth(0);
    this.tabAssigned = page.locator('div.tab-nav>div').nth(1);
    this.doneButton = page.locator('button[aria-label="Done"]');
    this.profileRow = page.locator('li.assign-content-row>button');
  }

  // Profile rows
  // async getProfileRows(): page.locator[] {
  //   this.rows = [];
  //   for (let i = 0; i < 5; i++) {
  //     rows.push(page.locator('li').withAttribute('class', 'assign-content-row').nth(i).child('button'));
  //   }
  //   return rows;
  // }

}