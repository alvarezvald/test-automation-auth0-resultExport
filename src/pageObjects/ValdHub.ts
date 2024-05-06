import { Locator, Page } from '@playwright/test';

export class ValdHubPage {
    readonly page: Page;
    readonly acceptCookiesButton: Locator;
    readonly homeWelcomeText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.acceptCookiesButton = page.getByRole('button', {
            name: 'Accept cookies',
          });  
        this.homeWelcomeText = page.locator('h1');   
    }
    
    async clickAcceptCookiesButton() {
        await this.acceptCookiesButton.click();
      }
    
    async loginToValdHub(login: string, password: string) {
        await this.page.getByPlaceholder('Enter your email address…').fill(login);
        await this.page.getByPlaceholder('Password').click();
        await this.page.getByPlaceholder('Password').fill(password);
        await this.page.getByRole('button', { name: 'Log In →' }).click();
      }  
}