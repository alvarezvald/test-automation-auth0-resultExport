import { Locator, Page, expect } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';
import { LeftHandMenu } from '@pageObjects/LeftHandMenu';
import { debounceDom } from 'utils/common';

export class Profiles {
  commonElements: CommonElements;
  leftHandMenu: LeftHandMenu;
  profileTable: Locator;
  searchProfilesInput: Locator;
  menuButtonOptions: Locator;
  createProfileButton: Locator;
  createProfileButtonSmallPage: Locator;
  bulkUploadButton: Locator;
  displayAsTileButton: Locator;
  displayAsListButton: Locator;
  profileTileFirst: Locator;
  profileTileThreeDotMenu: Locator;
  profileTileThreeDotMenuOptions: Locator;
  profileTileThreeDotMenuButtons: Locator;
  profileTileThreeDotMenuOptionEditDetails: Locator;
  profileTileThreeDotMenuOptionAssignGroups: Locator;
  profileTileThreeDotMenuOptionDelete: Locator;
  profileTiles: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.commonElements = new CommonElements(this.page);
    this.leftHandMenu = new LeftHandMenu(this.page);

    this.profileTable = page.locator('div.query-status-wrapper');

    // Input fields
    this.searchProfilesInput = page.getByPlaceholder('Search');
    this.menuButtonOptions = page.locator('div.profile-page__menu-options');

    this.createProfileButton = page.getByLabel('Create Profile');

    this.createProfileButtonSmallPage = page.locator(
      'div.d-flex>button[aria-label="Create Profile"]'
    );
    this.bulkUploadButton = page.getByRole('button', { name: 'Bulk Upload' });
    this.displayAsTileButton = page.getByRole('button', {
      name: 'Display as Grid',
    });
    this.displayAsListButton = page.getByRole('button', {
      name: 'Display as List',
    });
    this.profileTiles = page.locator('div.profile-grid__tile.cursor-pointer');
    this.profileTileFirst = page
      .locator('div.profile-grid__tile')
      .nth(0);
    this.profileTileThreeDotMenu = page
      .locator('.actions-dropdown > button')
      .nth(0);
    this.profileTileThreeDotMenuOptions = page.locator(
      'div[data-testid="profile-tile"]:nth-of-type(1)>div>div[data-testid="actions-dropdown"]>div.actions-holder>button>span'
    );
    this.profileTileThreeDotMenuButtons = this.profileTileThreeDotMenu;
    this.profileTileThreeDotMenuOptionEditDetails = page
      .locator('div>button[aria-label="Edit Details"]')
      .nth(0);
    this.profileTileThreeDotMenuOptionAssignGroups = page
      .locator('div>button[aria-label="Assign Groups"]')
      .nth(0);
    this.profileTileThreeDotMenuOptionDelete = page
      .locator('div>button[aria-label="Delete"]')
      .nth(0);
  }

  async selectProfileTileThreeDotMenu(optionString: string) {
    await this.profileTileThreeDotMenuButtons.click();

    switch (optionString) {
      case 'Edit Details':
        await this.profileTileThreeDotMenuOptionEditDetails.click();
        break;
      case 'Assign Groups':
        await this.profileTileThreeDotMenuOptionAssignGroups.click();
        break;
      case 'Delete':
        await this.profileTileThreeDotMenuOptionDelete.click();
        break;
      default:
        console.log(
          'ERROR: could not find ${optionString} on the three-dot menu.'
        );
        break;
    }
  }

  async getThreeDotMenuDropdownList(): Promise<string[]> {
    await this.profileTileThreeDotMenu.click();
    const optionListItemCount =
      await this.profileTileThreeDotMenuOptions.count();

    let optionListArray: string[] = [];

    for (let i = 0; i < optionListItemCount; i++) {
      optionListArray.push(
        await this.profileTileThreeDotMenuOptions.nth(i).textContent()
      );
    }
    return optionListArray;
  }

  async enterSearchProfilesField(searchString: string) {
    await this.searchProfilesInput.click();
    await this.searchProfilesInput.fill(searchString);
    await this.commonElements.delay(1000);
  }

  async verifyProfileExists(fullName: string) {
    await this.leftHandMenu.clickHome();
    await this.leftHandMenu.clickProfiles();
    await this.displayAsTileButton.click();
    await this.enterSearchProfilesField(fullName);
    await expect(this.profileTileFirst).toHaveCount(1);
    await this.profileTileFirst.click();
    await expect(this.commonElements.pageHeader).toHaveText(fullName);
    await this.leftHandMenu.clickProfiles();
  }

  async deleteProfile(fullName: string) {
    await this.leftHandMenu.clickHome();
    await this.leftHandMenu.clickProfiles();
    await this.displayAsTileButton.click();
    await this.enterSearchProfilesField(fullName);
    await this.selectProfileTileThreeDotMenu('Delete');
    console.log(`Deleting ${fullName}`);
    // Check that the correct profile is selected
    await expect(this.page.locator('div.react-responsive-modal-modal>h2')).toHaveText(`Delete ${fullName}`);
    console.log(`Id check passed`)
    await this.commonElements.deleteButton.click();
    await this.commonElements.delay(1000);
  }

  async verifyProfileWasDeleted(fullName: string) {
    await this.leftHandMenu.clickHome();
    await this.leftHandMenu.clickProfiles();
    await this.displayAsTileButton.click();
    await this.enterSearchProfilesField(fullName);
    await expect(this.profileTiles).toHaveCount(0);
  }

  // Assumes 'fullName' will result in exactly one profile tile displayed
  // Note, however, searches can be performed by email though the profile "name"
  // would be different i.e. concatenated "Given name" and "Family Name".
  // The name displayed at the top of the profile page is returned.
  async goToIndividualProfilePage(fullName: string): Promise<string> {
    await this.leftHandMenu.clickHome();
    await this.leftHandMenu.clickProfiles();
    await this.displayAsTileButton.click();
    await this.enterSearchProfilesField(fullName);
    // Need to also check for visible as getByText bring back two items for one tile i.e. possibly a tooltip which is not visible/clickable.
    // Also assert exactly one profile tile shown.
    const singleProfileTile = await this.page.getByTestId('profile-tile').getByText(fullName).locator('visible=true');
    await expect(singleProfileTile, "Exactly one profile tile should be displayed").toHaveCount(1);
    await singleProfileTile.click();
    // Wait for profile page to load
    // Wait for DOM to settle, otherwise go to next action with page in flux
    await debounceDom(this.page, 500, 1000);

    // Ensure "Pending...", shown interstitially when page/profile is loading, is not visible
    await expect(this.page.locator('h1').getByText('Pending...')).not.toBeVisible();
    // Return the name of the profile displayed at the top of the page
    return await this.page.locator('h1').textContent();
  }
}
