import { Locator, Page, expect } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';
import { LeftHandMenu } from '@pageObjects/LeftHandMenu';
import { Category } from 'pageObjects/Category';

export class CategoryGroup {
  commonElements: CommonElements;
  leftHandMenu: LeftHandMenu;
  category: Category;
  createGroupButton: Locator;
  deleteSelectedButton: Locator;
  moveSelectedButton: Locator;
  changeNameButton: Locator;
  rowMoveButton: Locator;
  viewFromThreeDotMenuButton: Locator;
  deleteFromThreeDotMenuButton: Locator;
  deleteCategoryConfirmationButton: Locator;
  groupFirstRowItem: Locator;
  threeDotsToListItemButton: Locator;
  groupRowDropdown: Locator;
  groupRowDropdownListOptions: any;
  categoryGroupRowDropdown: any;
  groupRowCheckbox: Locator;
  groupFirstRowItemProfileColumn: Locator;
  categoryBreadcrumbButton: Locator;
  groupDeleteButton: Locator;
  groupTableRow: Locator;
  categoryDeleteButton: any;
  categoryGroupRowDropdownListOptions: any;
  groupNameInput: any;
  groupAssignProfileButton: Locator;
  groupNumberOfProfiles: Locator;
  moveDropdown: Locator;
  moveTo: any;
  movePopup: Locator;
  moveButton: any;
  cancelButton: Locator;
  alreadyExistsinCategory: any;
  removeSelectedButton: Locator;
  profileCheckbox: Locator;
  moveToGroupInput: Locator;
  removeProfilesPopupYesButton: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.commonElements = new CommonElements(this.page);
    this.leftHandMenu = new LeftHandMenu(this.page);
    this.category = new Category(this.page);

    this.createGroupButton = this.page.locator('button[aria-label="Create Group"]');
    this.deleteSelectedButton = this.page.locator('button[aria-label="Delete selected"]');
    this.moveSelectedButton = this.page.locator('button[aria-label="Move selected"]');
    this.changeNameButton = this.page.locator('button[aria-label="Change name"]');
    this.rowMoveButton = this.page.locator('button[aria-label="Move"');
    this.removeProfilesPopupYesButton = this.page.locator('button[aria-label="Yes, remove"]');
    this.viewFromThreeDotMenuButton = this.page.locator(
      'button.btn.large.secondary.view.view'
    );
    this.deleteFromThreeDotMenuButton = this.page.locator(
      'button.btn.large.secondary.delete.delete'
    );
    this.deleteCategoryConfirmationButton = this.page.locator('div.modal-buttons>button.btn.large.destructive.delete');

    //Table
    this.threeDotsToListItemButton = this.page.locator(
      'button.btn.large.tertiary.dropdown-opener'
    ).nth(0);

    this.groupRowDropdown = this.page.locator('div[data-testid="actions-dropdown"]')
    this.groupRowDropdownListOptions = this.groupRowDropdown.locator('div>button').nth(0);
    this.groupRowCheckbox = this.page.locator('input[title="Toggle Row Selected"]');
    this.groupFirstRowItem = this.page.locator('td[aria-label="table-cell-name"]').nth(0);
    this.groupFirstRowItemProfileColumn = this.page.locator('td[aria-label="table-cell-athleteCount"]>div');
    this.categoryBreadcrumbButton = this.page.locator('button.breadcrumb-button');
    this.groupDeleteButton = this.page.locator('button.btn.small.destructive.delete');
    this.groupTableRow = this.page.locator('td[aria-label="table-cell-name"]>div>div');
    this.groupNameInput = this.page.locator('input#name');
    this.groupAssignProfileButton = this.page.locator('button[aria-label="Assign profile(s)"]');
    this.groupNumberOfProfiles = this.page.locator('td[aria-label="table-cell-athleteCount"]>div');
    this.categoryGroupRowDropdownListOptions = this.page.locator("(//div[@class='actions-holder'])[1] /button");

    // Move popup
    this.moveDropdown = page.locator('div.react-select__placeholder.css-1wa3eu0-placeholder');
    this.moveTo = page.locator('.react-select__input-container');
    this.moveToGroupInput = page.locator('#react-select-10-input')
    this.movePopup = page.locator('div.modal-buttons');
    this.moveButton = this.movePopup.locator('button').nth(0);
    this.cancelButton = page.locator('button[aria-label="Cancel"]');

    // expects for text verification
    this.alreadyExistsinCategory = page.locator('span.alert-popup__message')
    this.removeSelectedButton = page.locator('button[aria-label="Remove selected"]');
    this.profileCheckbox = page.locator('input.checkbox[title="Toggle Row Selected"]')
  }

  async moveBackToCategoryFromGroupPage(categoryName: string) {
    await this.categoryBreadcrumbButton.getByText(categoryName).click();
  }

  async deleteCategory() {
    await this.categoryDeleteButton.click();
    // Click delete button on the confirmation pop up
    await this.deleteCategoryConfirmationButton.click();
  }

  async deleteFromThreeDots() {
    await this.threeDotsToListItemButton.click();
    await this.deleteFromThreeDotMenuButton.click();
  }

  async viewFromThreeDots() {
    await this.threeDotsToListItemButton.click();
    await this.viewFromThreeDotMenuButton.click();
  }

  async getThreeDotMenuDropdownList(): Promise<string[]> {

    await this.threeDotsToListItemButton.click();

    const optionListItemCount = await this.categoryGroupRowDropdownListOptions
      .count();

    let optionListArray: string[] = [];

    for (let i = 0; i < optionListItemCount; i++) {
      optionListArray.push(
        await this.categoryGroupRowDropdownListOptions.nth(i).locator('span').textContent()
      );
    }
    return optionListArray;
  }

  async changeGroupName(groupName: string) {
    await this.changeNameButton.click();
    await this.groupNameInput.click();
    await this.groupNameInput.fill('');
    await this.groupNameInput.fill(groupName);
    await this.commonElements.clickSaveButton();
  }

}

