import { Locator, Page, expect } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';
import { LeftHandMenu } from './LeftHandMenu';

export class Category {
  commonElements: CommonElements;
  leftHandMenu: LeftHandMenu;
  tabCategories: Locator;
  tabGroups: Locator;
  tabUsers: Locator;
  tabSettings: Locator;
  tabOrganisation: Locator;
  tabIntegration: Locator;
  categoryCreateNameInput: Locator;
  categorySearchInput: Locator;
  groupSearchInput: Locator;
  groupCreateNameInput: Locator;
  groupCategoryNameInput: Locator;
  groupRow: Locator;
  createCategoryButton: Locator;
  createUserButton: Locator;
  createGroupButton: Locator;
  deleteCategoryButton: Locator;
  threeDotsFirstRowButton: Locator;
  deleteFromThreeDotMenuButton: Locator;
  tableCategoryRows: Locator;
  nextPageDisabled: Locator;
  nextPage: Locator;
  managementOrganisationTabURL: string;
  managementUsersTabURL: string;
  managementGroupsTabURL: string;
  managementSettingsTabURL: string;
  managementIntegrationTabURL: string;
  managementCategoriesTabURL: string;
  noCategoryOrGroupFoundMessage: Locator;
  categoryFirstRowItem: Locator;
  categoryNameInput: Locator;
  changeNameButton: Locator;
  createCategoryPopupHeaderText: Locator;
  createCategoryPopupErrorText: Locator;
  createCategoryPopupSaveButtonUnclickable: Locator;
  groupCheckboxFirstRow: Locator;
  groupMoveButton: Locator;
  groupMoveCategoryDropdownInput: Locator;
  groupMovePopupMoveButton: Locator;  
  
  constructor(public page: Page) {
    this.page = page;
    this.commonElements = new CommonElements(this.page);
    this.leftHandMenu = new LeftHandMenu(this.page);

    // Tabs
    this.tabCategories = page.getByRole('link', { name: 'Categories' });
    this.tabGroups = page.getByRole('link', { name: 'Groups' });
    this.tabUsers = page.getByRole('link', { name: 'Users' });
    this.tabSettings = page.getByRole('link', { name: 'Settings' });
    this.tabOrganisation = page.getByRole('link', { name: 'Organisation' });
    this.tabIntegration = page.getByRole('link', { name: 'Integration' });

    // Input fields
    this.categoryCreateNameInput = page.getByLabel('Category Name  (required)');
    this.categorySearchInput = page.getByPlaceholder('Search categories...');
    this.groupSearchInput = page.getByPlaceholder('Search groups...');
    this.groupCreateNameInput = page.getByLabel('Group name  (required)');
    this.groupCategoryNameInput = page.locator('input.react-select__input');
    this.groupRow = page.locator('tr.is-clickable');

    //Buttons
    this.createCategoryButton = page.getByRole('button', {
      name: 'Create Category',
    });
    this.createUserButton = page.getByRole('button', { name: 'Create User' });
    this.createGroupButton = page.getByRole('button', {name: 'Create Group'});

    this.deleteCategoryButton = page.locator(
      'button.btn.small.destructive.delete'
    );

    this.threeDotsFirstRowButton = page
      .locator('button.btn.large.tertiary.dropdown-opener')
      .nth(0);
    this.deleteFromThreeDotMenuButton = page.locator(
      'button.btn.large.secondary.delete.delete')

    this.tableCategoryRows = page.locator
      ('table.component-table>tbody>tr>td[aria-label="table-cell-name"]>div.table-text');
    this.nextPageDisabled = page.locator('button[aria-label="next page"][disabled]');
    this.nextPage = page.locator('button[aria-label="next page"]');
    

    // Expect for Text Verification
    this.managementOrganisationTabURL = '/app/management/organisation';
    this.managementUsersTabURL = '/app/management/users';
    this.managementGroupsTabURL = '/app/management/groups';
    this.managementSettingsTabURL = '/app/management/settings';
    this.managementIntegrationTabURL = '/app/management/software-integration';
    this.managementCategoriesTabURL = '/app/management/categories';

    // Expect for Verification
    this.noCategoryOrGroupFoundMessage = page.locator(
      'div.empty-collection-actions.stack>h3'
    );
    this.categoryFirstRowItem = page
      .locator('td[aria-label="table-cell-name"]')
      .nth(0);

    //Create Category popup
    this.categoryNameInput = page.locator('input#categoryName');

    //Category Group page
    this.changeNameButton = page.locator('button[aria-label="Change name"]');

    // expects
    this.createCategoryPopupHeaderText = page.locator(
      'div.react-responsive-modal-modal>h2'
    );
    this.createCategoryPopupErrorText = page.locator('span.field-error');
    this.createCategoryPopupSaveButtonUnclickable = page.locator(
      'button.btn.large.primary.submit>svg[focusable="false"]'
    );
    this.groupCheckboxFirstRow = page
      .locator('input.checkbox[title="Toggle Row Selected"]')
      .nth(0);

    // Move Groups
    this.groupMoveButton = page.locator('button[aria-label="Move selected"]');
    this.groupMoveCategoryDropdownInput = page.locator(
      'input.react-select__input'
    );
    this.groupMovePopupMoveButton = page.locator(
      'div.modal-buttons>button[aria-label="Move"]'
    );
  }

  async createCategory(categoryName: string) {
    await this.createCategoryButton.click();
    await this.categoryCreateNameInput.click();
    await this.categoryCreateNameInput.type(categoryName);
    await this.commonElements.clickSaveButton();
    await this.commonElements.delay(3000);
  }

  async searchAndSelectCategory(categoryName: string) {
    // Open Management Page
    await this.leftHandMenu.clickManagement();    
    await this.commonElements.delay(5000);
    var found = false;

    while (!found) {
      const actionNames = await this.page.evaluate(async () => {
        const actionsNames = document.querySelectorAll(
          'table.component-table>tbody>tr>td[aria-label="table-cell-name"]>div.table-text'
        );
        return Array.from(actionsNames).map((name) => name.textContent);
      });
      
      for (let index = 0; index < actionNames.length; index++) {
        const categoryTableName = actionNames[index];

        if (categoryName == categoryTableName) {
          found = true;
          await this.page
            .locator('td[aria-label="table-cell-name"]')
            .nth(index)
            .click();
          await expect(this.commonElements.pageHeader).toHaveText(categoryName);
          break;
        }
      }

      if (!found) {
        // Go to the Next Page
        if (
          (await this.nextPageDisabled.count()) <= 0
        ) {
          await this.nextPage.click();          
        } else {
          console.log(`COULD NOT FIND CATEGORY ${categoryName}`)
          break; // no more pages to check
        }
      }
    }
  }

  async searchForGroup(groupName: string) {
    await this.groupSearchInput.click();
    await this.groupSearchInput.type(groupName);
  }

  async searchAndSelectGroup(groupName: string) {
    await this.leftHandMenu.clickManagement();
    await this.tabGroups.click();
    await this.searchForGroup(groupName);
    // If the group name exists it will be the first row of the table, click on it
    await this.categoryFirstRowItem.click();
  }

  // create Group with the group Name as argument 1. Argument 2 is optional, only if the category is also to be selected.
  // this function can handle 2 way of creating a group.
  async createGroupInCategory(groupName: string, categoryName: string) {
    await this.leftHandMenu.clickManagement();
    await this.searchAndSelectCategory(categoryName);
    await this.createGroupButton.click();

    await this.groupCreateNameInput.click();
    await this.groupCreateNameInput.type(groupName);
    await this.commonElements.clickSaveButton();
  }

  async openGroup(groupName: string) {
    // Open Management Page
    await this.leftHandMenu.clickManagement();
    await this.tabGroups.click();
    await this.searchAndSelectGroup(groupName);
  }

  async deleteCategory(categoryName: string) {
    // Delete the category
    console.log(`Begin delete`);
    await this.searchAndSelectCategory(categoryName);

    await this.deleteCategoryButton.click();

    if (
      (await this.page
        .locator('div[data-testid="overlay"]>div>h2')
        .textContent()) == `Delete ${categoryName}`
    ) {
      await this.commonElements.clickDeleteButton();
      await this.commonElements.delay(1000);
      console.log(`${categoryName} deleted`);
    } else {
      await this.commonElements.clickCancelButton();
      console.log(`Did not delete category`);
    }
  }

  async deleteFromThreeDots() {
    await this.threeDotsFirstRowButton.click();
    await this.deleteFromThreeDotMenuButton.click();
  }

  async verifyGroupDeleted(groupName: string) {
    // Open Management Page
    await this.leftHandMenu.clickManagement();
    // Open up Groups tab
    await this.tabGroups.click();
    await this.searchForGroup(groupName);
    // If the group name exists it will be the first row of the table

    await expect(
      this.noCategoryOrGroupFoundMessage,
      'Group should have been deleted'
    ).toHaveText('There are no groups');
    console.log('Group: ', groupName, ' deleted successfully');
  }
}
