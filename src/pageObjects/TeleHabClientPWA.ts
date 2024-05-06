import { expect, Locator, Page } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';
import { random } from 'lodash';
import { debounceDom, flakyWaitForAnimationEnd } from 'utils/common';

interface SurveyDetails {
  missedOrCompleted: number;
  totalInSeries: number;
}

enum SurveyQuestionType {
  Invalid = 0,
  Slider,
  SingleChoice
}

export class TeleHabClientPWA {
  readonly page: Page;
  readonly exerciseProgramTile: Locator;
  readonly startSessionButton: Locator;
  readonly readyToExerciseButton: Locator;
  readonly reduceButton: Locator;
  readonly saveRepsButton: Locator;
  readonly finishButton: Locator;
  readonly saveFeedbackButton: Locator;
  readonly skipRestButton: Locator;
  readonly sliderPainExperienceLocatorString: string;
  readonly sliderPerceivedExertionLocatorString: string;
  readonly acceptCookiesButton: Locator;
  readonly continueButton: Locator;
  readonly finishSessionButton: Locator;
  readonly logOutButton: Locator;
  readonly returnToTeleHabClientWebButton: Locator;
  readonly loginButton: Locator;
  readonly navigationTitleHeader: Locator;
  readonly organisationDropdown: Locator;
  readonly buttonReduceCount: Locator;
  readonly homeWelcomeText: Locator;
  readonly videoRecordingOnSwitch: Locator;
  readonly exerciseTitle: Locator;
  readonly programTitle: Locator;
  readonly repDisplay: Locator;
  surveyTileOnHomeScreen: Locator;
  surveyTileHeader: Locator;
  surveyTileActions: Locator;
  organisationCollapsiblePanel: Locator;
  programDetail: Locator;
  domainChangePopUp: Locator;
  domainChangeOkButton: any;
  finishEndButton: Locator;
  returnToDashboardButton: Locator;
  doneButton: Locator;
  commonElements: any;
  buttonNext: Locator;
  sliderDot0: Locator;
  sliderDot: Locator;
  submitAnswersButton: Locator;
  selectAnswerContainer: Locator;
  selectAnswerButton: Locator;
  navigationBarProgramsButton: Locator;
  startLongButton: Locator;
  startRoundButton: Locator;
  startButton: any;
  navigationBarSurveysButton: Locator;
  viewProgressButton: Locator;
  missedSurveys: Locator;
  completedSurvey: Locator;
  progressText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.commonElements = new CommonElements(this.page)
    this.exerciseProgramTile = page.locator('article.program-card');
    this.startSessionButton = page.getByRole('button', {
      name: 'Start Session',
    });
    this.readyToExerciseButton = page.getByRole('button', {
      name: 'Ready to Exercise',
    });
    this.startLongButton = page.locator('button.btn.large.primary.btn.btn-block');
    this.startRoundButton = page.locator('button.roundbtn.btn-start-session');
    this.finishButton = page.locator('button.btn-finish-session');
    this.saveRepsButton = page.locator('button.btn.btn-block.btn-save-reps');
    this.reduceButton = page.locator("//button[@class='btn btn-updown'][1]");
    this.repDisplay = page.locator("span.inc-dec-value>div");

    this.skipRestButton = page.getByRole('button', { name: 'Skip Rest' });
    this.saveFeedbackButton = page.getByRole('button', {
      name: 'Save Feedback',
    });
    this.sliderPainExperienceLocatorString =
      "(//div[@class='rc-slider-step'])[1]//span";
    this.sliderPerceivedExertionLocatorString =
      "(//div[@class='rc-slider-step'])[2]//span";
    this.acceptCookiesButton = page.getByRole('button', {
      name: 'Accept cookies',
    });
    this.finishSessionButton = page.getByRole('button', {
      name: 'Finish Session',
    });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.logOutButton = page.getByRole('button', { name: 'Log out' });
    this.returnToTeleHabClientWebButton = page.getByRole('link', {
      name: 'Return To TeleHab Client Web',
    });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.navigationTitleHeader = page.locator('div.navigation-page-title');
    this.exerciseTitle = page.locator('div.exercise-name');
    this.programTitle = page.locator('article.program-card>strong');
    this.organisationDropdown = page.locator('div.collapsible-panel').nth(0);
    this.buttonReduceCount = page.locator('button.btn.btn-updown').nth(0);
    this.homeWelcomeText = page.locator('h1');
    this.videoRecordingOnSwitch = page.locator('div.optional-video-switch.on');

    this.surveyTileOnHomeScreen = page.locator('article.content.cursor-pointer');
    this.surveyTileHeader = page.locator('article.content.cursor-pointer>article>div')
    this.surveyTileActions = page.locator('button.action.py1');

    this.organisationCollapsiblePanel = page.locator('div.collapsible-panel').nth(0);
    this.programDetail = page.locator('article.program-card');
    this.startSessionButton = page.getByRole('button', { name: 'Start Session' });
    this.readyToExerciseButton =
      page.getByRole('button', { name: 'Ready to Exercise' });
    this.videoRecordingOnSwitch = page.locator('div.optional-video-switch.on');
    this.domainChangePopUp = page.locator('div.modal-dialog-content');
    this.domainChangeOkButton = page.getByRole('button', { name: 'Ok' });

    this.finishEndButton = page.locator('button[aria-label="Finish"]');
    this.returnToDashboardButton = page.locator('button[aria-label="Return to Dashboard"]');
    this.doneButton = page.getByRole('button', { name: 'Done' });
    this.buttonNext = page.locator('button[aria-label="Next"]');

    this.sliderDot0 = page.locator('span.rc-slider-dot').nth(0);
    this.sliderDot = page.locator('span.rc-slider-dot');

    this.submitAnswersButton = page.locator('button[aria-label="Submit answers"]');
    this.selectAnswerContainer = page.locator('div.survey-radio.stack');
    this.selectAnswerButton = page.locator('div.cursor-pointer');
    this.navigationBarProgramsButton = page.getByRole('link', { name: 'Programs' });
    this.navigationBarSurveysButton = page.getByRole('link', { name: 'Surveys' });
    this.viewProgressButton = page.getByRole('button', { name: 'View Progress' });

    this.missedSurveys = this.page.locator('//span[contains(text(),"Missed")]');
    this.completedSurvey = this.page.locator('//span[contains(text(),"points")]');
    this.progressText = this.page.locator('.mt0');
  }

  async clickSaveRepsIfExists() {
    if (await this.saveRepsButton.count() > 0) {
      await this.saveRepsButton.click();
    }
  }

  async clickSkipRestIfExists() {
    if (await this.skipRestButton.count() > 0) {
      await this.skipRestButton.click();
    }
  }

  async clickDomainChangeOkButtonIfExists() {
    if (await this.domainChangeOkButton.count() > 0) {
      await this.domainChangeOkButton.click();
    }
  }

  async clickDomainChangePopupIfExists() {
    if (await this.domainChangePopUp.count() > 0) {
      console.log(
        '  --Domain change ' +
        (await this.domainChangePopUp.locator('article>strong').textContent())
      );
      await this.clickDomainChangeOkButtonIfExists();
    }
  }

  async clickSubmitAnswersButtonThenDoneButton() {
    let surveySubmitted = false;
    if (await this.submitAnswersButton.count() > 0) {
      await this.submitAnswersButton.click();
      await this.doneButton.click();
      surveySubmitted = true;
    }
    return Promise.resolve(surveySubmitted);
  }

  async clickNextButtonIfExists() {
    if (await this.buttonNext.count() > 0) {
      await this.buttonNext.click();
    }
  }

  async clickFinishEndButtonIfExists() {
    if (await this.finishEndButton.count() > 0) {
      await this.finishEndButton.click();
    }
  }

  async clickReturnToDashboardButtonIfExists() {
    if (await this.returnToDashboardButton.count() > 0) {
      await this.returnToDashboardButton.click();
      console.log('Return to Dashboard');
    }
  }

  async currentQuestionUI(): Promise<number> {
    return parseInt((await this.progressText.textContent()).split('/')[0].split(' ')[1].trim());
  }

  async totalQuestionsUI(): Promise<number> {
    return parseInt((await this.progressText.textContent()).split('/')[1].trim());
  }

  async activeQuestionType(survey: TeleHabClientPWA): Promise<SurveyQuestionType> {
    return new Promise(async (resolve) => {
      if (await survey.sliderDot0.count() > 0) {
        resolve(SurveyQuestionType.Slider);
      } else if (await survey.selectAnswerContainer.count() > 0) {
        resolve(SurveyQuestionType.SingleChoice);
      } else {
        resolve(SurveyQuestionType.Invalid);
      }
    });
  }

  async filloutPROM(answerTrend: string) {

    let numberSurveys = await this.surveyTileOnHomeScreen.count();
    let currentQuestionType: SurveyQuestionType = SurveyQuestionType.Invalid;

    console.log(`Number of surveys :${numberSurveys}`);

    // Add domain page handler
    await this.page.addLocatorHandler(this.domainChangePopUp, async () => {
      // Close popup and make sure it disappears
      await this.domainChangeOkButton.click();
      await this.domainChangePopUp.waitFor({ state: 'hidden', timeout: 5000 });
      await flakyWaitForAnimationEnd(this.page);
    });

    // for each survey
    for (let y = 0; y < numberSurveys; y++) {
      if (
        (await this.surveyTileActions.getByText('Complete Now').nth(0).count() > 0)
        ||
        (await this.surveyTileActions.getByText('Continue').nth(0).count() > 0)
      ) {

        console.log(
          `${y}. Survey : ${await this.surveyTileHeader.nth(0).textContent()}`
        );

        // Get survey series count and progress count
        const surveyArray: SurveyDetails = await this.getSurveyCount();
        console.log(`Survey details - total: ${surveyArray.totalInSeries} progress: ${surveyArray.missedOrCompleted}`)
        // Click Complete Now or Continue depending on whether his is a brand new survey or if there is a previous survey to finish
        const newOrContinueSurvey = await this.clickCompleteNowOrContinueSurveyButton();

        if (newOrContinueSurvey == "Expired") {
          console.log('Survey time expired! Missed timing window - aborting!');
          return;
        }

        await expect(['Continue', 'Complete Now'], 'Valid survey completion state').toContain(newOrContinueSurvey);

        if (newOrContinueSurvey == "Complete Now") {
          // START button
          // Add timeout as occasionaly the PROM time ends near when we were about to start and test hangs
          await this.startLongButton.click({ timeout: 5000 });
        }
        else if (newOrContinueSurvey == "Continue") {
          console.log('Continuing previous survey');
        }

        // After submit button, can potentilaly be some page animation, so wait for it to settle
        // otherwise can click on first question too early and survey resets i.e. removes first question answer and restarts
        // See example of issue here: https://vald-my.sharepoint.com/:v:/p/m_grossman/ERwe0acwNeNEmRWnESZ0o4UBcaPpjg7TMgWb3uDcprVaqA?e=GIDUqy
        await flakyWaitForAnimationEnd(this.page);
        await debounceDom(this.page, 500, 2000);

        const startQuestionNumber = await this.currentQuestionUI();
        const numQuestions = await this.totalQuestionsUI();

        for (let currentQuestion = startQuestionNumber; currentQuestion <= numQuestions; currentQuestion++) {

          console.log(`****************** Question ${currentQuestion} of ${numQuestions}`);

          currentQuestionType = await this.activeQuestionType(this);

          if (currentQuestionType == SurveyQuestionType.Slider) {
            let sliderDotValue = await this.getNumericAnswer(answerTrend,
              surveyArray.totalInSeries,
              surveyArray.missedOrCompleted);

            console.log('  -- Slider Dots: ' + sliderDotValue);

            if (sliderDotValue > 0) {
              await this.sliderDot.nth(sliderDotValue).click();
            }

            await this.clickNextButtonIfExists();
          } else if (currentQuestionType == SurveyQuestionType.SingleChoice) {
            // Multi Choice question buttons
            let answerNbr = await this.getNumericAnswer(answerTrend,
              surveyArray.totalInSeries,
              surveyArray.missedOrCompleted);
            console.log('  -- Button     : ' + answerNbr);
            await this.selectAnswerButton.nth(answerNbr).locator('div').click();
          } else {
            // Fail test as we haven't found a question type we can handle
            await expect(true, 'Question type not found!').toBe(false);
          }

          if (currentQuestion < numQuestions) {
            // We are not on the last question i.e. currentquestion == numQuestions
            // so expect to see a transition to the next question

            // Make sure page and all elements have moved to text for next question
            await expect(this.progressText).toHaveText(`Question ${currentQuestion + 1} / ${numQuestions}`, { timeout: 5000 });
            // Wait for slide-in animation to finish
            await flakyWaitForAnimationEnd(this.page);
          }
        }

        // if SingleChoice question is the final question then
        //    Finish is skipped and we go straight to Submit answers, Done
        // else if slider question is last then
        //    press Finish and then Submit answers, Done
        if (currentQuestionType == SurveyQuestionType.Slider) {
          await this.finishEndButton.click();
        }
        // Verify all questions have been answered - answers are in strong i.e. bolded text
        // Due to Playwright fast clicks, sometimes questions can be skipped (though hopefully those issues have been fixed)
        // Verify number of questions shown in report is correct
        await expect(this.page.locator('.summary-tile.stack')).toHaveCount(numQuestions);
        // Very number of questions with answers is correct
        const reportNumAnswers = await this.page.locator('.stack.mt0 > div > strong').count();

        if (reportNumAnswers != numQuestions) {
          console.error("Not all questions have answers! Checking questions...");
          // Find unanswered question
          for (let i = 0; i < numQuestions; i++) {
            // Questions with answers have two strong i.e. bold, tags in their section for e.g. 
            //  "Question 8" and the answer e.g. "Unable to do"
            const boldCount = await this.page.locator('.summary-tile.stack').nth(i).locator('strong').count();
            if (boldCount != 2) {
              const questionText = await this.page.locator('.summary-tile.stack').nth(i).textContent();
              console.error(`Question ${i + 1} has no answer: \n\n${questionText}`);
            }
          }

          // Force fail test
          expect(true, 'All questions should have answers').toBe(false)
        }

        await this.submitAnswersButton.click();
        await this.page.waitForLoadState('load');

        // Ensures all results have loaded before we output report
        await debounceDom(this.page);

        // Report
        const surveyResultsCount = await this.page.locator('.list-item > .item').count();
        console.log('*** Survey Report: ', await this.page.locator('.header').textContent());
        console.log(await this.page.locator('.historical-results > h3').textContent());
        for (let i = 0; i < surveyResultsCount; i++) {
          const score = await this.page.locator('.list-item > .item').nth(i).locator('span').first().textContent();
          const dateCompleted = await this.page.locator('.list-item > .item').nth(i).locator('.prom-result-item-completed-date').textContent()
          console.log(`Survey: Score - ${score}, Date completed - ${dateCompleted}`);
        }

        await this.doneButton.click();

        console.log('Session Over');
      }
    }
  }

  async clickCompleteNowOrContinueSurveyButton(): Promise<string> {
    if (await this.surveyTileActions.getByText('Complete Now').nth(0).count() > 0) {
      await this.surveyTileActions.getByText('Complete Now').nth(0).click();
      console.log("'Complete Now' clicked - starting new survey")
      return "Complete Now";
    }
    else if (await this.surveyTileActions.getByText('Continue').nth(0).count() > 0) {
      await this.surveyTileActions.getByText('Continue').nth(0).click();
      console.log("'Continue' clicked - continuing previous survey")
      return "Continue";
    }
    else if (await this.page.getByText('Expired').count() > 0) {
      console.log("Survey time expired!")
      return "Expired";
    }
    else {
      console.log("ERROR: No 'Complete Now', 'Continue', or 'Expired' found!")
      return "None";
    }
  }

  async getNumericAnswer(answerTrend: string,
    surveySeries: number, // how many in series
    progress: number)  // how far through the series
    : Promise<number> {
    let answerNumber = 0;
    let maximumNumber = 0;

    if (await this.sliderDot.count() > 0) {
      maximumNumber = await this.sliderDot.count();
    } else if (await this.selectAnswerContainer.count() > 0) {
      maximumNumber = await this.selectAnswerButton.count();
    }
    console.log(`getNumericAnswer() total: ${surveySeries} progress ${progress}`)
    maximumNumber = maximumNumber - 1;

    // determine a scaled answer based on number of surveys in the series and how
    // many are completed.  Apply this scale to the number of answers available for
    // each question.  Add a random + or - 1 to the answer so that it looks kinda 
    // organic.
    await expect(surveySeries, 'Survey series is not 0').not.toBe(0);
    const trendAnswer = Math.ceil((maximumNumber / surveySeries) * progress);
    const organic = random(-1, 1);

    switch (answerTrend) {
      case 'first':
        answerNumber = 0;
        break;
      case 'middle':
        answerNumber = Math.floor(maximumNumber / 2);
        break;
      case 'last':
        answerNumber = maximumNumber;
        break;
      case 'random':
        answerNumber = random(0, maximumNumber);
        break;
      case 'increase':
        answerNumber = trendAnswer + organic;
        break;
      case 'decrease':
        answerNumber = maximumNumber - trendAnswer + 1 + organic;
        break;
      default:
        if (!isNaN(parseInt(answerTrend))) {
          answerNumber = parseInt(answerTrend) - 1;
        } else {
          answerNumber = 0;
        }
    }
    if (answerNumber > maximumNumber) {
      answerNumber = maximumNumber;
    }
    if (answerNumber < 0) {
      answerNumber = 0;
    }
    console.log(`answerNumber is ${answerNumber}`);
    if (isNaN(answerNumber)) {
      console.error(`answerNumber is NaN! Variables:\nanswerTrend: ${answerTrend}\nsurveySeries: ${surveySeries}\nprogress: ${progress}\nmaximumNumber: ${maximumNumber}\ntrendAnswer: ${trendAnswer}\norganic: ${organic}`);
      await expect(true, 'answerNumber is not NaN').toBe(false);
    }
    return answerNumber;
  }




  async getSurveyCount(): Promise<SurveyDetails> {

    // From telehab client count surveys
    // Go to Surveys
    await this.navigationBarSurveysButton.click();

    // Go to View Progress
    await this.viewProgressButton.click();
    // let missedComplete = 0;
    // let series = 0;
    console.log(`**Count Completed or Missed Surveys`);
    await this.page.waitForURL('**/report/*');
    // waitingf or page to load or waitForLoad state does not work
    // Need to debounce DOM
    await debounceDom(this.page, 500, 2000);

    const missed = await this.page.getByText('Missed').count();
    const complete = await this.page.getByText('Complete').count();
    const pending = await this.page.getByText('Pending').count();

    console.log(`missed - ${missed}, complete ${complete}, remaining ${pending}`)

    let total = missed + complete + pending;

    // Click Done
    await this.doneButton.click();
    let survey: SurveyDetails = {
      missedOrCompleted: missed + complete,
      totalInSeries: total
    }
    return survey;
  }
}
