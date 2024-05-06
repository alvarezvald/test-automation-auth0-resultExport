import test, { Locator, Page, expect } from "@playwright/test";


/**
 * Replaces invalid Windows file path characters with an underscore or another safe character.
 * 
 * @param inputString - The input string to be processed.
 * @returns The processed string with invalid file path characters replaced.
 */
export function getFilePathSafeString(inputString: string, replaceString: string = '_'): string {
  // Replace invalid file path characters with an underscore or another safe character
  return inputString.replace(/[\<\>:\"\/\\|\?\*]/g, replaceString);
}

/**
 * Returns a string representation of the current date and time in the format "YYYY-MM-DD-HH-MM-SS".
 * The string should be safe to use in a Windows path i.e. will not contain characters that are unsafe
 * for use in a Windows path e.g. C:\source\windowsSafeString
 * 
 * @returns {string} The formatted date and time string.
 */
export function getPathSafeStringBasedOnDateTime(): string {
  // Get the current date and time
  let date = new Date();

  // Format the date and time as a string
  let dateTimeString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${String(date.getHours()).padStart(2, '0')}-${String(date.getMinutes()).padStart(2, '0')}-${String(date.getSeconds()).padStart(2, '0')}`;

  // Make the string safe for use as a file path
  return getFilePathSafeString(dateTimeString);
}


/**
 * FLAKINESS Library of Last Resort (FLOLR)
 *
 * Functions that are workarounds for situations Playwright, etc. do not seem to handle correctly/elegantly e.g.
 * clicking on item on a page does not work as expected due to page still loading though Playwright indicates
 * page is loaded.
 *
 */

/**
 * Verifies item is visible after click. Waits for a page to become stable after clicking a button by 
 * verifying an element summoned by the click remains visible.
 *
 * This function clicks a button on a page and then waits for a specific element to become hidden.
 * If the element does NOT become hidden within a specified duration, the function assumes that the
 * page has stabilized i.e. the element has not been forced closed by a page refresh of some kind.
 * The function will attempt to click the button and check the item's visibility up to a maximum
 * number of attempts.
 * 
 * NOTE: at some point may re-write using .toPass()
 * 
 * Original problem:
 * 
 * Issue in Program Builder where Playwright indicated page was loaded, and summoned context menu was visible, 
 * however it would almost instantly disappear, hanging the test.
 *
 * @param {Page} page - The Playwright Page object that represents the web page you're interacting with.
 * @param {Locator} buttonClick - The Locator object representing the button you want to click on the page.
 * @param {Locator} locatorWantAlwaysVisible - The Locator object representing an element that you expect to always be visible on the page.
 * @param {number} stableDuration - The duration (in milliseconds) that the function will wait for the page to stabilize. Default is 10000 milliseconds (or 10 seconds).
 * @param {number} maxClickAttempts - The maximum number of times the function will attempt to click the button and check the page's stability. Default is 10 attempts.
 *
 * @throws {Error} Throws an error if the page does not stabilize after the maximum number of attempts.
 *
 * @example
 * await flakyWaitForVisibleAfterClick(page, page.locator('.submit-button'), page.locator('.loading-indicator'), 5000, 3);
 */
export async function flakyWaitForVisibleAfterClick(buttonClick: Locator, locatorWantAlwaysVisible: Locator, stableDuration = 10000, maxClickAttempts = 10) {
  let itemVisible = false;
  let attemptCount = 0;

  do {
    itemVisible = false;
    await buttonClick.click();
    await locatorWantAlwaysVisible.waitFor({ state: 'hidden', timeout: stableDuration }).catch(() => itemVisible = true);
  } while (!itemVisible && ++attemptCount < maxClickAttempts);

  if (attemptCount > 0) {
    console.warn(`Attempts made to find stable context menu: ${attemptCount}`);
  }
  expect(itemVisible, 'Item visible.').toBe(true);
}

/**
 * Waits for an element to become hidden after a button click.
 * 
 * This is the counter function to flakyWaitForVisibleAfterClick.
 * 
 * @param page - The page object representing the browser page.
 * @param buttonClick - The locator for the button to click.
 * @param locatorWantHidden - The locator for the element that should become hidden.
 * @param notHiddenDuration - The duration to wait for the element to become hidden (in milliseconds). Default is 5000ms.
 * @param maxClickAttempts - The maximum number of click attempts. Default is 10.
 * 
 * @returns A promise that resolves when the element becomes hidden.
 */
export async function flakyWaitForHiddenAfterClick(buttonClick: Locator, locatorWantHidden: Locator, notHiddenDuration = 5000, maxClickAttempts = 10) {
  let elementHidden = true;
  let attemptCount = 0;

  do {
    elementHidden = true;
    await buttonClick.click();
    await locatorWantHidden.waitFor({ state: 'hidden', timeout: notHiddenDuration }).catch(() => elementHidden = false);
  } while (!elementHidden && ++attemptCount < maxClickAttempts);

  if (attemptCount > 0) {
    console.warn(`Attempts made to find stable context menu: ${attemptCount}`);
  }

  expect(elementHidden, 'Element is hidden.').toBe(true);
}

/**
 * Waits for the DOM of a page to become stable.
 *
 * This function repeatedly checks the inner HTML of the body of the page. If the inner HTML does not change
 * between checks, the function assumes that the DOM has become stable. The function continues checking until
 * the DOM has been stable for a specified delay.
 * 
 * This can be useful for issues where Playwright indicates page has fully loaded but interactions with the 
 * page are still problematic e.g. attempting to open a context menu results in immediate closure.
 * 
 * Source: https://stackoverflow.com/a/76142169/4612820
 *
 * @param {Page} page - The Playwright Page object that represents the web page you're interacting with.
 * @param {number} pollDelay - The delay (in milliseconds) between each check of the DOM. Default is 50 milliseconds.
 * @param {number} stableDelay - The delay (in milliseconds) that the DOM must be stable for the function to stop checking. Default is 350 milliseconds.
 *
 * @example
 * await debounceDom(page, 100, 500);
 */
export async function debounceDom(page: Page, pollDelay = 50, stableDelay = 350) {
  let markupPrevious = '';
  const timerStart = new Date();
  let isStable = false;
  while (!isStable) {
    let markupCurrent = '';
    while (true) {
      try {
        markupCurrent = await page.evaluate(() => document.body.innerHTML);
        break; // Exit the retry loop on success
      } catch (error) {
        if (error.message.includes('Execution context was destroyed')) {
          console.log('Navigation occurred during DOM evaluation. Retrying after 1 second...');
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
        } else {
          throw error; // Rethrow the error if it's not related to execution context destruction
        }
      }
    }
    if (markupCurrent == markupPrevious) {
      const elapsed = new Date().getTime() - timerStart.getTime();
      isStable = stableDelay <= elapsed;
    } else {
      markupPrevious = markupCurrent;
    }
    if (!isStable) await new Promise(resolve => setTimeout(resolve, pollDelay));
  }
}

/**
 * Waits for the DOM of a page to become stable.
 * 
 * NOTE: This function is the same as debounceDom above, but with logging.
 * 
 * @param page - The page object to perform the evaluation on.
 * @param pollDelay - The delay between each poll in milliseconds. Default is 50ms.
 * @param stableDelay - The delay to consider the log stable in milliseconds. Default is 350ms.
 */
export async function debounceDomLog(page: Page, pollDelay = 50, stableDelay = 350) {
  let markupPrevious = '';
  let markupCurrent = '';
  const timerStart = new Date();
  let isStable = false;
  let counter = 0;
  while (!isStable) {
    ++counter;
    console.log('-----\nattempt: ', counter);
    while (true) {
      try {
        markupCurrent = await page.evaluate(() => document.body.innerHTML);
        break; // Exit the retry loop on success
      } catch (error) {
        if (error.message.includes('Execution context was destroyed')) {
          console.log('Navigation occurred during DOM evaluation. Retrying after 1 second...');
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
        } else {
          throw error; // Rethrow the error if it's not related to execution context destruction
        }
      }
    }
    const elapsed = new Date().getTime() - timerStart.getTime();
    if (markupCurrent == markupPrevious) {
      isStable = stableDelay <= elapsed;
      if (!isStable) {
        console.log('size is stable! Still polling... (Reason: delay not elapsed yet)');
        console.log('this attempt size: ', markupCurrent.length);
      } else {
        console.log('size settled and time elapsed');
        console.log('this attempt size: ', markupCurrent.length);
      }
    } else {
      console.log('HTML does not match. This attempt size: ', markupPrevious.length);
      markupPrevious = markupCurrent;
    }
    if (!isStable) {
      console.log('waiting for poll delay: ', pollDelay);
      await new Promise(resolve => setTimeout(resolve, pollDelay));
    }
    console.log('elapsed: ', elapsed)
  }
}

/**
 * Represents the result of an animation end evaluation. 
 * 
 * @property {string} logMessage - A message describing the animation status.
 * @property {Promise<void>[]} animationsPromises - Promises representing the completion of animations.
 * @property {string} animationStates - A comma-separated string of animation play states.
 */
interface AnimationEndResult {
  logMessage: string;
  animationsPromises: Promise<void>[];
  animationStates: string;
}

interface FlakyWaitForAnimationOptions {
  userLocator?: Locator;
  userSelector?: string;
  maxTimeout?: number;
  assertTimeout?: boolean;
}

/**
 * Options to configure the behavior of the `flakyWaitForAnimationEnd` function.
 *
 * @property {Locator} [userLocator] - Optional locator for a specific element to monitor.
 * @property {string}  [userSelector] - Optional CSS selector for the element to monitor (defaults to 'body').
 * @property {number}  [maxTimeout] - Maximum timeout in milliseconds to wait for animations (default 5000ms).
 * @property {boolean} [assertTimeout] - If true, throws an assertion error if animation timeout occurs (default false).
 */
interface FlakyWaitForAnimationOptions {
  userLocator?: Locator;
  userSelector?: string;
  maxTimeout?: number;
  assertTimeout?: boolean;
}

/**
 * Waits for animations on a page or element to complete, handling potential flakiness. Provides logging and timeout mechanisms.
 *
 * @param {Page} userPage - Puppeteer (or similar framework) Page object representing the browser page.
 * @param {FlakyWaitForAnimationOptions} [options] - Options to customize waiting behavior.
 * @returns {Promise<void>} Resolves when animations finish or timeout occurs.
 */

/**
 * Waits for the animation to end on the specified element or selector.
 * If no element or selector is provided, it waits for the animation to end on the body element.
 * @param {Page} userPage  The page object representing the browser page.
 * @param {FlakyWaitForAnimationOptions} [options] - Options to customize waiting behavior.
 * @returns {Promise<void>} Resolves when animations finish or timeout occurs.
 * 
 * Based on https://github.com/microsoft/playwright/issues/15660#issuecomment-1185339343
 */
export async function flakyWaitForAnimationEnd(
  userPage: Page,
  options: FlakyWaitForAnimationOptions = {}
): Promise<void> {
  const {
    userLocator = undefined,
    userSelector = 'body',
    maxTimeout = 5000,
    assertTimeout = false
  } = options;

  // Test step to reduce log spam of using .count() and .evaluate() below
  await test.step('flakyWaitForAnimationEnd', async () => {

    let totalAnimationsCount = 0;
    const myLocator: Locator = userLocator ? userLocator : userPage.locator(userSelector);

    if (await myLocator.count() < 1) {
      console.warn('myLocator does not exist. Aborting animation checking.');
      return;
    }

    const startTime = Date.now();

    async function collectAndWaitForAnimations(): Promise<number> {
      if (await myLocator.count() < 1) return 0;
    
      const result = await myLocator.evaluate((element): AnimationEndResult => {
        function collectAnimations(element: Element): Animation[] {
          let animations = element.getAnimations();
          element.childNodes.forEach((child) => {
            if (child.nodeType === Node.ELEMENT_NODE) {
              animations = animations.concat(collectAnimations(child as Element));
            }
          });
          return animations;
        }
        
        const allAnimations = collectAnimations(element);
        // Check if all animations are already finished
        const allFinished = allAnimations.every(animation => animation.playState === 'finished');

        const animationStates = allAnimations.map(animation => animation.playState).join(', ');
        let logMessage = `Found ${allAnimations.length} animations. All finished: ${allFinished}.`;

        // Log if animations are returned but are finished i.e. no longer animating. These will 
        // cause the Promise.all to never resolve. Thus we return an empty array to resolve instantly.
        if (allFinished) { logMessage += "\n ### ANIMATIONS PRESENT BUT ALL HAVE 'finished' status!" };

        const animationsPromises = allFinished ? [] : allAnimations.map(animation => animation.finished.then(() => void 0));

        return { logMessage, animationsPromises, animationStates };
      });
    
      if (process.env.enableLoggingAnimationFunction) {
        console.log(result.logMessage);
        console.log(`states: ${result.animationStates}`);
      }

      totalAnimationsCount += result.animationsPromises.length;

      // If all animations are finished, this will be an empty array and instantly resolve
      await Promise.all(result.animationsPromises);
    
      return result.animationsPromises.length;
    }

    let countThruLoop = 0;
    const timeoutFailMessage = `Timeout reached after ${maxTimeout}ms while waiting for animations to end.`
    let animationTimedOut = false;
    let elapsedTime = 0;
    let animationsCount = 0;

    const timeoutPromise = new Promise<void>((_, reject) => {
      setTimeout(() => {
        reject(new Error(timeoutFailMessage));
      }, maxTimeout);
    });

    while (await myLocator.count() > 0) {
      ++countThruLoop;
      if (process.env.enableLoggingAnimationFunction) console.debug(`*** animation loop check: ${countThruLoop}`);

      try {
        // Wait for the animations to end or for timeout to occur
        await Promise.race([
          collectAndWaitForAnimations().then((count) => {
            animationsCount = count;
          }),
          timeoutPromise,
        ]);
      } catch (error) {
        if (error.message === timeoutFailMessage) {
          // Animation timed out
          animationTimedOut = true;
          elapsedTime = Date.now() - startTime;
        } else {
          // Other error occurred
          console.warn(error.message);
        }
        break;
      }

      if (process.env.enableLoggingAnimationFunction) console.debug(`*** animation count this loop check: ${animationsCount}`);

      if (animationsCount <= 0) break;
    }

    if (process.env.enableLoggingAnimationFunction) console.log(`Total animations waited for: ${totalAnimationsCount}`);

    if (animationTimedOut) {
      if (assertTimeout) {
        expect(animationTimedOut, `${timeoutFailMessage} Elapsed time: ${elapsedTime}`).toBe(false);
      } else {
        console.warn(`${timeoutFailMessage} Elapsed time: ${elapsedTime}`);
      }
    }
  }); // end of test.step
}

/**
 * Utility class for handling flaky behavior in test automation.
 */
export class FlakyUtils {
  page: Page;

  /**
   * Constructs a new instance of FlakyUtils.
   * @param page The page object to interact with.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Clicks on the specified locator and waits for the animation to end.
   * @param locator The locator to click on.
   * @param timeoutClick The timeout for the click operation in milliseconds. Default is 5000ms.
   */
  async clickWaitForAnimationEnd(locator: Locator, timeoutClick: number = 5000): Promise<void> {
    await locator.click({ timeout: timeoutClick });
    await flakyWaitForAnimationEnd(this.page);
  }

  /**
   * Waits for the animation to end and then clicks on the specified locator.
   * @param locator The locator to click on.
   */
  async waitForAnimationEndThenClick(locator: Locator): Promise<void> {
    await flakyWaitForAnimationEnd(this.page);
    await locator.click();
  }

  /**
   * Waits for all animations to end.
   */
  async waitForAnimationsEnd(): Promise<void> {
    if (process.env.enableLoggingAnimationFunction)
      console.log('START: waitForAnimationsEnd');

    await flakyWaitForAnimationEnd(this.page);

    if (process.env.enableLoggingAnimationFunction)
      console.log('END: waitForAnimationsEnd');
  }
}

// Below are only used with the singleLogin.ts test() fixture and
// called outside of the singleLogin.ts test() fixture.
// See src/tests/2.0 PROMS/2.1-promsAssign.test.ts for an example of usage.
export function setSingleLoginUser(userName: string, password: string) {
  process.env['SINGLE_LOGIN_USER'] = userName;
  process.env['SINGLE_LOGIN_PASSWORD'] = password;
}

export function getSingleLoginUser(): { user: string, password: string } {
  return {
    user: process.env['SINGLE_LOGIN_USER'],
    password: process.env['SINGLE_LOGIN_PASSWORD']
  }
}

// Wait for hub page to be fully loaded based on hub mode e.g.
//  Clinical management mode - https://hub-staging.valdperformance.com/app/profiles?showWhatsNew=true
//  Group management mode - https://hub-staging.valdperformance.com/app/group-home
export async function waitHubPageLoaded(page: Page): Promise<void> {
  await Promise.race([page.waitForURL('**/profiles*'), page.waitForURL('**/group-home*')]);
}
