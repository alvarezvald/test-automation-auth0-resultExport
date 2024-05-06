import { Locator, Page, expect } from '@playwright/test';
import { LeftHandMenu } from '@pageObjects/LeftHandMenu';
import { OrganisationManagement } from '@pageObjects/OrganisationManagement';
import { flakyWaitForAnimationEnd } from 'utils/common';

//
// common elements as the save, cancel, close buttons on most popups and modals
//
export class CommonElements {
  leftHandMenu: any;
  organisation: any;
  cancelButton: Locator;
  saveButton: Locator;
  okButton: Locator;
  closeX: Locator;
  deleteButton: Locator;
  yesButton: Locator;
  whatsNewModal: Locator;
  goToLoginPageButton: Locator;
  loadingSpinner: Locator;
  loadingHexagon: Locator;
  pageHeader: Locator;
  header2: Locator;
  header3: Locator;
  confirmButton: Locator;
  saveButtonDisabled: Locator;
  nextButton: Locator;
  finishButton: Locator;
  userDetailDropdownList: Locator;
  contactSupportListItem: Locator;
  supportSiteListItem: Locator;
  downloadAppsListItem: Locator;
  giveFeedbackListItem: Locator;
  changeOrgListItem: Locator;
  logOutListItem: Locator;
  changeOrgModal: Locator;
  changeOrgDropDownList: any;
  organisationChangeName: Locator;
  supportURL: string;
  supportSiteHeader: Locator;
  popup: Locator;
  modalHeader: Locator;
  currentOrganisation: Locator;
  changeOrgDialogCurrentOrg: Locator;
  successPopup: Locator;
  dateTo: Locator;
  dateFrom: Locator;


  constructor(public page: Page) {
    this.leftHandMenu = new LeftHandMenu(this.page);
    this.organisation = new OrganisationManagement(this.page);

    this.page = page;
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.saveButtonDisabled = page.locator(
      'button.btn.large.primary.submit[disabled]',
    );
    this.okButton = page.getByRole('button', { name: 'Ok' });
    this.closeX = page.locator('button.close-button').locator('visible=true');
    this.deleteButton = page
      .getByTestId('modal')
      .getByRole('button', { name: 'Delete' });
    this.whatsNewModal = page
      .locator('div.detail-modal.right-side-detail-modal>button.close-button')
      .nth(0);
    this.yesButton = page.getByRole('button', { name: 'Yes' });
    this.goToLoginPageButton = page.locator('button.btn.btn-login');
    this.loadingSpinner = page.locator('div.loading-spinner.center-imposter');
    this.loadingHexagon = page.locator(
      'div.full-page-message.full-page-loader',
    );
    this.confirmButton = page.getByRole('button', { name: 'Confirm' });
    this.nextButton = page.locator('button[aria-label="Next"]');
    this.finishButton = page.locator('button[aria-label="Finish"]');

    this.popup = page.getByTestId('overlay');

    this.pageHeader = page.locator('h1');
    this.header2 = page.locator('h2');
    this.header3 = page.locator('h3');

    // User Detail Dropdown
    // Dropdown list, top right corner
    this.userDetailDropdownList = page.locator(
      'div.action-menu.imposter-container.user-actions-dropdown',
    );

    // Expanded drop down list
    this.contactSupportListItem = page.getByText('Contact Support', {
      exact: true,
    });
    this.supportSiteListItem = page.getByText('Support Site', { exact: true });
    this.downloadAppsListItem = page.getByText('Download Apps');
    this.giveFeedbackListItem = page.getByText('Give Feedback');
    this.changeOrgListItem = page.getByText('Change Org');
    this.logOutListItem = page.getByText('Log Out');
    this.changeOrgModal = page.getByTestId('modal');
    this.changeOrgDropDownList = this.changeOrgModal.locator(
      'div.react-select__indicators.css-1wy0on6',
    );
    this.organisationChangeName = page.locator('label.select-label');
    this.currentOrganisation = page.locator('span.team-name');
    //div > div.react-select.single-select.css-b62m3t-container > div > div.react-select__value-container.react-select__value-container--has-value.css-hlgwow > div.react-select__single-value.css-1dimb5e-singleValue
    // Expects for text verification
    this.changeOrgDialogCurrentOrg = this.page.locator('div > div.react-select.single-select.css-b62m3t-container > div > div.react-select__value-container.react-select__value-container--has-value.css-hlgwow > div.react-select__single-value.css-1dimb5e-singleValue');
    this.supportURL = 'https://support.vald.com/';
    this.supportSiteHeader = page.getByText('Download Software');

    this.modalHeader = page.locator('div.react-responsive-modal-modal>h2');
    this.successPopup = page.locator('div.alert-popup.success');

    // date picker
    this.dateTo = page.getByTestId('labelWrapper-Date To');
    this.dateFrom = page.getByTestId('labelWrapper-Date From');
  }

  delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async clickSaveButton() {
    await this.saveButton.click();
  }

  async clickOkButton() {
    await this.okButton.click();
  }

  async clickCancelButton() {
    await this.cancelButton.click();
  }

  async clickGoToLoginPageButton() {
    if ((await this.goToLoginPageButton.count()) > 0) {
      await this.goToLoginPageButton.click();
    }
  }

  async clickCloseXButton() {
    if ((await this.closeX.count()) > 0) {
      // Need flakyWaitForAnimationEnd for tablet mode as sometimes coming into this function
      // there can be mulitple closeX buttons, even when filtering by visibility.
      // Need to let the other 
      await flakyWaitForAnimationEnd(this.page);
      await this.closeX.click();
    }
  }

  // Only used if there is only one delete button present on the screen
  async clickDeleteButton() {
    await this.deleteButton.click();
  }

  async clickConfirmButton() {
    await this.confirmButton.click();
  }

  async setDateFrom(dateFormat: string, date: string) {
    await this.dateFrom.getByPlaceholder(dateFormat).click();
    await this.dateFrom.getByPlaceholder(dateFormat).fill(date);
  }

  async setDateTo(dateFormat: string, date: string) {
    await this.dateTo.getByPlaceholder(dateFormat).click();
    await this.dateTo.getByPlaceholder(dateFormat).fill(date);
  }

  async getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

  // Common verification functions
  async verifyHeaderText(headerText: string, failMessage: string) {
    await expect(this.pageHeader, failMessage).toHaveText(headerText);
  }

  async VerifyUrlCanOpenInNewTab(
    siteOpenElement: Page,
    verficationUrl: RegExp,
  ) {
    await expect(
      siteOpenElement,
      'The target URL is not what was expected',
    ).toHaveURL(verficationUrl);
  }

  async clickYesButton() {
    await this.yesButton.click();
  }

  async clickNextButton() {
    await this.nextButton.click();
  }

  async clickFinishButton() {
    await this.finishButton.click();
  }

  async setDateFormatDDMMYYYY() {
    await this.leftHandMenu.clickManagement();
    await this.organisation.tabSettings.click();
    await this.organisation.setDateFormat('DD/MM/YYYY');
    await this.clickSaveButton();
  }

  public verifyListsMatch(itemListActual: any[], itemListExpected: any[]) {
    let itemsMatch = (aList, bList) =>
      JSON.stringify(aList) === JSON.stringify(bList);

    const doTheyMatch = itemsMatch(itemListActual, itemListExpected);

    this.expectToBeTrue(
      doTheyMatch,
      `Mismatch. Expected: ${itemListExpected} Actual: ${itemListActual}`,
    );

    if (!doTheyMatch) {
      console.log(
        '\r\nTEST FAIL: Actual list items do not match expected list items',
      );
      console.log('Actual :');
      console.log(itemListActual);
      console.log('Expected :');
      console.log(itemListExpected);
    }
  }

  async resizeWindow(widthSize: number, heightSize: number) {
    await this.page.setViewportSize({ width: widthSize, height: heightSize });
  }

  async resizeWindowToStandardSize() {
    await this.page.setViewportSize({ width: 1800, height: 900 });
  }

  async expectToBeTrue(status: boolean, errorMessage: string): Promise<void> {
    try {
      expect(status).toBe(true);
    } catch (exception) {
      throw new Error(`${errorMessage}`);
    }
  }

  async expectToBeValue(
    expectedValue: string,
    actualValue: string,
    errorMessage: string,
  ): Promise<void> {
    try {
      expect(expectedValue.trim()).toBe(actualValue);
    } catch (exception) {
      throw new Error(`${errorMessage}`);
    }
  }

  async clickUserDetailDropdown() {
    await this.userDetailDropdownList.click();
  }

  async clickContactSupport() {
    await this.userDetailDropdownList.click();
    await this.contactSupportListItem.click();
  }

  async clickSupportSite() {
    await this.userDetailDropdownList.click();
    await this.supportSiteListItem.click();
  }

  async clickDownloadApps() {
    await this.userDetailDropdownList.click();
    await this.downloadAppsListItem.click();
  }

  async clickGiveFeedback() {
    await this.userDetailDropdownList.click();
    await this.giveFeedbackListItem.click();
  }

  async clickChangeOrganisation() {
    await this.userDetailDropdownList.click();
    if ((await this.changeOrgListItem.count()) > 0) {
      await this.changeOrgListItem.click();
      await this.delay(1000);
    }
  }

  async clickLogOut() {
    await this.userDetailDropdownList.click();
    await this.logOutListItem.click();
    await this.delay(1000);
  }

  async getCurrentOrganisation() {
    let org: string = '';
    if ((await this.currentOrganisation.count()) > 0)
      org = await this.currentOrganisation.textContent();
    else {
      await this.userDetailDropdownList.click();
      if ((await this.changeOrgListItem.count()) > 0) {
        await this.changeOrgListItem.click();
        // await this.changeOrgDropDownList.click();
        org = await this.changeOrgDialogCurrentOrg.textContent()
        await this.clickCloseXButton();
      }
    }

    return org;
  }

  async changeOrganisation(organisation: string) {
    const landingPage = this.page
      .getByTestId('modal')
      .or(this.page.locator('h1.dashboard-title'))
    //Landing page is either 
    // - home page
    // - popup modal "what's new"
    // - profiles page (when the modal has already been closed)

    // are we already there?
    let organisationMatch = this.compareByEqualityString(
      // await this.currentOrganisation.textContent(),
      await this.getCurrentOrganisation(),
      organisation)

    if (!organisationMatch) {
      await this.userDetailDropdownList.click();
      if ((await this.changeOrgListItem.count()) > 0) {
        await this.changeOrgListItem.click();
        await this.changeOrgDropDownList.click();
        await this.organisationChangeName
          .filter({ hasText: organisation })
          .click();
        await this.clickConfirmButton();
        try {
          // sometimes it takes a while for an organisation to load
          await landingPage.waitFor({ state: 'visible', timeout: 30000 });
        } catch {
          // check for profiles landing page. Only occurs when user has already closed
          // the what's new modal on another organisation in the one session.
          await this.page.getByRole('heading', { name: 'Profiles' }).waitFor({ state: 'visible', timeout: 5000 });
        }
        await this.clickModalCloseXButton();
      }
    }
  }

  async clickModalCloseXButton() {
    try {
      // Wait to see if popup is attached which may take a few seconds
      // If not, exception is thrown, as modal did not appear
      await this.popup.waitFor({ state: 'attached', timeout: 2000 });
      // If attached and 'visible' (I THINK) this means the slide out has completed
      await this.popup.waitFor({ state: 'visible', timeout: 10000 });

      if ((await this.whatsNewModal.count()) > 0) {
        // Ensure the button is also visible, might not need this
        await this.whatsNewModal.waitFor({ state: 'visible', timeout: 10000 });
        // Click button
        await this.whatsNewModal.click();
        // Wait for popup to disappear i.e. slide off screen and be 'hidden' otherwise
        // await expect(landingPage).toBeVisible(), fails due to detecting ".getByTestId('modal')"
        await this.popup.waitFor({ state: 'hidden', timeout: 10000 });
        // Dialog SHOULD be offscreen i.e. 'hidden'
        console.log('Popup is now hidden');
      }

    } catch {
      console.info('Modal did not appear. Continue.')
    }
  }

  async logOut() {
    await this.userDetailDropdownList.click();
    await this.logOutListItem.click();
    await this.clickYesButton();
  }

  async waitForPageToLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForPageToLoadThenTakeScreenshot(filename) {
    let fullpath = `./screenshots/${filename}.png`;
    console.log(`${fullpath}`);
    await this.waitForPageToLoad();
    await this.delay(500);
    await this.page.screenshot({ path: fullpath, fullPage: true });
  }

  compareByEqualityString = (comparee: string, comparer: string) =>
    comparee.toLowerCase().trim() === comparer.toLowerCase().trim();

  async waitForSuccessPopup(popuptext: string, visibleTimeout: number = 10000, blockUntilHidden: boolean = false) {
    // 'popuptext' starts the string and anything else can follow
    const regexPattern = new RegExp(`^${popuptext}.*`);

    await expect(this.successPopup).toBeVisible({ timeout: visibleTimeout });
    await expect(this.successPopup).toHaveCount(1);
    await expect(this.successPopup).toHaveText(regexPattern);

    if (blockUntilHidden)
      // Wait until popup has faded out to continue
      await expect(this.successPopup).toBeHidden();
  }
}
