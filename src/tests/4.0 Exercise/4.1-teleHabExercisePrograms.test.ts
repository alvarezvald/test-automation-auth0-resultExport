import { test, expect } from '@playwright/test';
import { VALDConfig } from '@configuration/config'
import { TeleHabClientPWA } from '@pageObjects/TeleHabClientPWA';
import { Login } from '@pageObjects/Login';
import { random } from 'lodash';

const config = VALDConfig();

// Before each test datestamp it and report on test name
test.beforeEach(async ({ page }, testInfo) => {
  console.log(Date());
  console.log(config);
  console.log(`Running ${testInfo.title} ${testInfo.outputDir}`);
  page.setViewportSize({ width: 800, height: 900 });
});

// After each test datestamp it
test.afterEach(async () => {
  console.log(Date());
});

const clientTH = require(config.teleHabProgramPerformDataFile);

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

for (const dataSet of clientTH) {

  const email = dataSet.Username;
  const emailBeforeAtSymbol = email.split('@');

  test(`Generate exercise data for ${emailBeforeAtSymbol[0]}`, async ({ page }) => {

    const login = new Login(page);
    const teleHabClientPage = new TeleHabClientPWA(page);

    test.setTimeout(6 * 60 * 1000);

    // Login
    console.log('ENVIRONMENT: ' + config.urlTeleHabLogin);
    await page.goto(config.urlTeleHabLogin);
//    await teleHabClientPage.acceptCookiesButton.click();

    console.log(dataSet);
    await login.telehabLoginUsernamePassword(dataSet.Username, dataSet.Password);
    
    const programCount = await teleHabClientPage.exerciseProgramTile.count();
    console.log(`There are ${programCount} programs`);

    for (let index = 0; index < programCount; index++) {

      let programName = await teleHabClientPage.programTitle.nth(index).textContent();
      console.log(`START PROGRAM: ${programName}`)
      await teleHabClientPage.exerciseProgramTile.nth(index).click();
      await teleHabClientPage.startSessionButton.click();

      // Loop through exercises
      while (await teleHabClientPage.startRoundButton.count() > 0) {
        await teleHabClientPage.startRoundButton.click();
        await delay(7000);
        while (await teleHabClientPage.finishButton.count() > 0) {
          console.log(`  - ${await teleHabClientPage.exerciseTitle.textContent()}`)      
          await teleHabClientPage.finishButton.click();
          await delay(7000);
          const randomReduce = random(1, 3);
          if (await teleHabClientPage.saveRepsButton.count() > 0) {
            for (let z = 0; z < randomReduce; z++) {
              if (!(await teleHabClientPage.repDisplay.textContent() === "0")) {              
                await teleHabClientPage.reduceButton.click();
              }
            }            
            await teleHabClientPage.saveRepsButton.click();
          }          
          await teleHabClientPage.skipRestButton.click();
        }

        // if pain reporting on
        let randomNumber1 = 0;
        let randomNumber2 = 0;

        while (await teleHabClientPage.saveFeedbackButton.count() > 0) {

          if (await page.locator(teleHabClientPage.sliderPainExperienceLocatorString).count() > 0) {
            randomNumber1 = random(1, 9);
            console.log(`  Pain experience: ${randomNumber1}`)
            const sliderPainExperience = page.locator(`${teleHabClientPage.sliderPainExperienceLocatorString}[${randomNumber1}]`)
            await sliderPainExperience.click();

            if (await page.locator(teleHabClientPage.sliderPerceivedExertionLocatorString).count() > 0) {
              randomNumber2 = random(1, 9);
              console.log(`  Perceived exertion: ${randomNumber2}`)
              const sliderPerceivedExertion = page.locator(`${teleHabClientPage.sliderPerceivedExertionLocatorString}[${randomNumber2}]`)
              await sliderPerceivedExertion.click();
            }
          }

          console.log('  Save Feedback')          
          await teleHabClientPage.saveFeedbackButton.click();
        }

      }  //Loop to start button

      console.log('Finish session')      
      await teleHabClientPage.finishSessionButton.click();
      console.log('Continue')      
      await teleHabClientPage.continueButton.click();

    } //Next program

  });

}


