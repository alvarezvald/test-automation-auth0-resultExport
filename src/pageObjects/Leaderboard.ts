import { Locator, Page, expect } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';

export class Leaderboard {

  commonElements: CommonElements;
  createLeaderboardButton: Locator;
  editLeaderboardButton: Locator;
  leaderboardTableData: Locator;
  firstRowLeaderboardTable: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.commonElements = new CommonElements(this.page);

    this.createLeaderboardButton = page.getByRole('button', { name: 'Create Leaderboard' });
    this.editLeaderboardButton = page.locator('button[aria-label="Edit"]')
    this.leaderboardTableData = page.locator('tbody[role="rowgroup"]')
    this.firstRowLeaderboardTable = page.locator('tbody[role="rowgroup"]>tr>td[aria-label="table-cell-name"]').nth(0)
    
    
  }
  
}