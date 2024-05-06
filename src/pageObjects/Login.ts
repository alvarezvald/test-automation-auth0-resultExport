import { Locator, Page, expect } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';

export class Login {
  commonElements: CommonElements;
  usernameInput: Locator;
  passwordInput: Locator;
  continueButton: Locator;
  cantRememberPasswordLink: Locator;
  invalidEmailErrorText: Locator;
  blankPasswordErrorText: Locator;
  invalidUsernamePasswordErrorText: Locator;
  resetPasswordEmailInput: Locator;
  resetPasswordButton: Locator;
  resetPasswordButtonDisabled: Locator;
  resetPasswordEmailError: Locator;
  resetPasswordInstructionalText: Locator;
  acceptCookiesButton: Locator;
  showPassword: Locator;
  editEmailLink: Locator;
  
  //Login Page to enter username and password
  constructor(public page: Page) {
    this.page = page;
    this.commonElements = new CommonElements(this.page);

    this.acceptCookiesButton = page.getByLabel('Accept cookies');
    this.usernameInput = page.getByLabel('Email address');
    this.passwordInput = page.getByLabel('Password');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.cantRememberPasswordLink = page.getByRole('link', { name: 'Forgot password?' });

    this.editEmailLink = page.getByLabel('Edit email address');
    this.showPassword = page.getByRole('button', { name: 'Show password' })
       
    // expects for text verification
    this.invalidEmailErrorText = page.getByText('Email is not valid.');
    this.invalidUsernamePasswordErrorText = page.getByText('Wrong email or password');
    
  }

  async setUsername(username: string) {
    await this.usernameInput.click();
    await this.usernameInput.fill(username);
  }

  async setPassword(password: string) {
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
  }

  async clickAcceptCookiesButton() {
    if ((await this.acceptCookiesButton.count()) > 0) {
      await this.acceptCookiesButton.click();
    }
  }

  async loginUsernamePassword(userName: string, userPassword: string) {

    const landingPage = this.page.getByTestId("modal")
      .or(this.page.locator('h1.dashboard-title'))
    await this.acceptCookiesButton.waitFor();
    await this.clickAcceptCookiesButton();
    await this.setUsername(userName);
    await this.continueButton.click();
    await this.setPassword(userPassword);
    await this.continueButton.click();
    await landingPage.waitFor({ state: 'visible', timeout: 120000 })
    await expect(landingPage).toBeVisible();
    await this.commonElements.clickModalCloseXButton()
  }

  async telehabLoginUsernamePassword(userName: string, userPassword: string) {

    await this.acceptCookiesButton.waitFor();
    await this.clickAcceptCookiesButton();    
    await this.setUsername(userName);
    await this.continueButton.click();
    await this.setPassword(userPassword);
    await this.continueButton.click();
    // Can sometimes take a while to load, depending on load on staging, etc.
    await this.page.locator('#Layer_1').waitFor({ state: 'visible', timeout: 120000 })
  }

  async clickCantRememberPassword() {
    await this.cantRememberPasswordLink.click();
  }

  async loginToHubWithOrganisationChange(
    username: string,
    password: string,
    organistion: string
  ) {
    await this.loginUsernamePassword(username, password);
    await this.commonElements.changeOrganisation(organistion);
  }
}
