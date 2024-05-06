import { test, expect } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';
import { VALDConfig } from '@configuration/config';
import { Login } from '@pageObjects/Login';

const config = VALDConfig();
const url = config.urlValdHubLogin;

// Before each test datestamp it and report on test name
test.beforeEach(async ({ page }, testInfo) => {
  const login = new Login(page);
  console.log(Date());
  console.log(url);
  console.log(testInfo.title);
  await page.goto(url);
  await login.acceptCookiesButton.click();
});

test('Test 1.2.1 Login enter invalid email format @regression', async ({
  page,
}) => {
  const login = new Login(page);

  await test.step('Test enter invalid email format', async () => {
    await login.setUsername('abc');
    await login.continueButton.click();
    await expect
      .soft(
        login.invalidEmailErrorText,
        'Check if email invalid error message appears',
      )
      .toHaveCount(1);
  });
});

test('Test 1.2.2 Login enter invalid login and password @regression', async ({
  page,
}) => {
  const login = new Login(page);

  await test.step('Test invalid login and password', async () => {
    await login.setUsername('abc@abc.net');
    await login.continueButton.click();
    await login.setPassword('abc');
    await login.continueButton.click();
    await expect
      .soft(
        login.invalidUsernamePasswordErrorText,
        'Check for invalid login error',
      )
      .toBeVisible();
  });
});

test('Test 1.2.3 Forgot Password blank email @regression', async ({ page }) => {
  const login = new Login(page);
  const commonElements = new CommonElements(page);

  await test.step('Enter email', async () => {
    await login.setUsername('abc@abc.net');
    await login.continueButton.click();
  });
  await test.step('Click forgot password', async () => {
    await login.cantRememberPasswordLink.click();
    await expect
      .soft(commonElements.pageHeader, 'Check popup')
      .toHaveText('Forgot Your Password?');
  });

  await test.step('Enter email for forgot password', async () => {
    await login.setUsername('abc@fake.net');
    await login.continueButton.click();

    await expect
      .soft(commonElements.pageHeader, 'Check workflow')
      .toHaveText('Check Your Email');
  });
});

test('Test 1.2.4 Forgot Password invalid email @regression', async ({
  page,
}) => {
  const login = new Login(page);
  const commonElements = new CommonElements(page);

  await test.step('Enter email then forgot password', async () => {
    await login.setUsername('abc@abc.net');
    await login.continueButton.click();
    await login.cantRememberPasswordLink.click();
    await expect
      .soft(commonElements.pageHeader, 'Check popup')
      .toHaveText('Forgot Your Password?');
  });

  await test.step('Enter invalid email', async () => {
    await login.setUsername('abc');
    await login.continueButton.click();
    await expect.soft(login.invalidEmailErrorText,'Check error message displayed').toBeVisible();
  });
});
