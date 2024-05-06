import { Locator, Page, expect } from '@playwright/test';
import { CommonElements } from './CommonElements';
import { LeftHandMenu } from './LeftHandMenu';

export class OrganisationManagement {
  dateFormatDropdown: Locator;
  unitMeasurementDropdown: Locator;
  interfaceModeDropdown: Locator;
  groupManagementMode: Locator;
  clinicalManagementMode: Locator;
  managementSaveButton: Locator;
  applyToEntireOrganisationCheckbox: Locator;
  managementPage: any;
  tabSettings: Locator;
  tabOrganisation: Locator;
  tabCategories: Locator;
  tabGroups: Locator;
  tabUsers: Locator;
  tabIntegration: Locator;
  organisationSuccessfullyLoaded: Locator;

  constructor(public page: Page) {

    this.page = page;
    
    // Fields
    this.dateFormatDropdown = page.locator('input[aria-labelledby="dateFormat-label"]');
    this.unitMeasurementDropdown = page.getByTestId('measurementSystem')

    // Menu display mode dropdown list - can be Group Management Mode or Clinical Management Mode 
    this.interfaceModeDropdown = page.getByTestId('interfaceMode');
    this.tabCategories = page.getByRole('link', { name: 'Categories' })
    this.tabGroups = page.getByRole('link', { name: 'Groups' })
    this.tabUsers = page.getByRole('link', { name: 'Users' })
    this.tabSettings = page.getByRole('link', { name: 'Settings' });
    this.tabOrganisation = page.getByRole('link', { name: 'Organisation' });
    this.tabIntegration = page.getByRole('link', { name: 'Integration' });

    this.groupManagementMode = page.locator('label.select-label').nth(0);
    this.clinicalManagementMode = page.locator('label.select-label').nth(1);
    this.managementSaveButton = page.getByRole('button', { name: 'Save' });
    this.applyToEntireOrganisationCheckbox = page.locator('input#allUsers');

    this.organisationSuccessfullyLoaded = page.locator('span.alert-popup__message');
  }

  // formatType can be 'YYYY/MM/DD', 'MM/DD/YYYY' or 'DD/MM/YYYY'
  async setDateFormat(formatType: string) {
    await this.dateFormatDropdown.click()
    await this.dateFormatDropdown.fill(formatType)
    await this.page.keyboard.press('Tab')
  }

  // unit Type can be Metric or Imperial
  async setUnit(unitType: string) {
    await this.unitMeasurementDropdown.fill(unitType);
    await this.page.keyboard.press('Tab')
  }

  async setInterfaceMode(clinicalOrGroup: string) {
    await this.interfaceModeDropdown.click();
    switch (clinicalOrGroup) {
      case 'Group':
        await this.groupManagementMode.click();
        break;
      case 'Clinical':
        await this.clinicalManagementMode.click();
        break;
      default:
        console.log('ERROR: Incorrect value for organisation mode');
        break;
    }
  }

  async clickApplyToEntireOrganisationCheckbox() {
    await this.applyToEntireOrganisationCheckbox.click();
  }

  async setMode(interfaceMode: string) {

    const leftHandMenu = new LeftHandMenu(this.page);
    const commonElements = new CommonElements(this.page);

    await leftHandMenu.clickManagement();
    //Wait for the page to load - especially if it is coming from telehab
    await this.page.waitForLoadState();
    await this.tabSettings.click();
    await this.setInterfaceMode(interfaceMode);
    await commonElements.clickSaveButton();
    // wait for the left hand `menu to refresh by waiting for the status menu popup to show then hide.
    await this.organisationSuccessfullyLoaded.waitFor({ state: 'visible' })
    await this.organisationSuccessfullyLoaded.waitFor({ state: 'hidden' })

  }

  async changeToGroupModeApplyAll() {
    await this.setMode('Group');
  }

  async changeToClinicalModeApplyAll() {
    await this.setMode('Clinical');
  }

  async setOrganisationDateFormat(dateFormat: string) {

    const leftHandMenu = new LeftHandMenu(this.page);
    const commonElements = new CommonElements(this.page);

    await leftHandMenu.clickManagement();
    await this.tabOrganisation.click();
    await this.setDateFormat(dateFormat);
    await commonElements.clickSaveButton();

  }

};
