import { Locator, Page } from '@playwright/test';
import { ProgramBuilderScheduler } from '@pageObjects/ProgramBuilderScheduler';
import { CommonElements } from '@pageObjects/CommonElements';

export class ProgramBuilder {
  programTiles: Locator;
  builderTiles: Locator;
  removeBuilderTile: Locator;
  programDetailsDrilldown: Locator;
  inputProgramName: any;
  assignToProfileButton: any;
  returnToProgramBuilderButton: any;
  selectProfilesTableList: any;
  yourPatientTableHeader: Locator;
  searchProfileInput: any;
  ongoingButton: any;
  clearProgramButton: Locator;
  confirmClearProgramButton: Locator;
  createSupersetButton: Locator;
  createTemplateButton: Locator;
  searchForAnExercise: Locator;
  builderTilesPlusButton: Locator;
  backToProfileButton: Locator;
  addToSuperSetCheckbox: Locator;
  programTileTitle: Locator;
  profileSelectorTable: Locator;
  programAddToProgram: Locator;
  editSelectedButton: Locator;
  backToTemplatesLink: Locator;
  searchTemplatesTextbox: Locator;

  constructor(public page: Page) {
    this.page = page;

    this.programTiles = page.locator('div.exercise-video-tile');
    this.programTileTitle = page.locator('p.exercise-title');
    this.builderTiles = page.locator('div.program-builder-tile-tick');
    this.builderTilesPlusButton = page.locator(
      'button.btn.large.secondary.plus-btn',
    );
    this.programAddToProgram = page.locator(
      'button.btn.large.secondary.plus-btn',
    );
    this.removeBuilderTile = page.locator('div.remove-button');
    this.programDetailsDrilldown = page.locator('div.video-title.line-clamp');
    this.inputProgramName = page.getByPlaceholder('Enter program name here');
    this.assignToProfileButton = page.getByRole('button', {
      name: 'Assign to profile',
    });
    this.returnToProgramBuilderButton = page.getByRole('button', {
      name: 'Return to Program builder',
    });
    this.searchForAnExercise = page.getByPlaceholder('Search for an exercise');

    this.selectProfilesTableList = page.locator('tbody>tr').nth(0);

    this.yourPatientTableHeader = page.locator('div.patient-table-header');
    this.searchProfileInput = page
      .getByTestId('modal')
      .getByPlaceholder('Search');
    this.ongoingButton = page.getByRole('button', { name: 'Ongoing' });
    this.clearProgramButton = page.getByRole('button', {
      name: 'Clear program',
    });
    this.confirmClearProgramButton = page.getByRole('button', {
      name: 'Confirm?',
    });
    this.createSupersetButton = page.getByRole('button', {
      name: 'Create superset',
    });
    this.editSelectedButton = page.getByRole('button', {
      name: 'Edit selected',
    });
    this.createTemplateButton = page.getByRole('button', {
      name: 'Create template',
    });
    this.backToProfileButton = page.locator('a.back-button');
    this.addToSuperSetCheckbox = page.locator('div.program-builder-tile-tick');
    this.profileSelectorTable = page.locator(
      'td[aria-label="table-cell-fullName"]',
    );

    this.backToTemplatesLink = page.getByRole('link', { name: 'Back to Templates' });
    this.searchTemplatesTextbox = page.getByRole('textbox', {name: 'Search'});
  }

  async enterProfileSearchField(profileName: string) {
    await this.searchProfileInput.click();
    await this.searchProfileInput.fill(profileName);
  }

  async enterProgramName(programName: string) {
    await this.inputProgramName.click();
    await this.inputProgramName.fill(programName);
  }

  async createAndAssignProgram(programName: string, profileProgram: string) {
    const programBuilder = new ProgramBuilder(this.page);
    const scheduler = new ProgramBuilderScheduler(this.page);
    const commonElements = new CommonElements(this.page);

    await programBuilder.enterProgramName(programName);
    // add exercises to template
    await programBuilder.builderTilesPlusButton.first().click();
    await programBuilder.builderTilesPlusButton.nth(1).click();

    await programBuilder.assignToProfileButton.click();
    await programBuilder.enterProfileSearchField(profileProgram);

    await programBuilder.profileSelectorTable.first().click();

    // Program builder modale scheduler appears
    await this.page
      .getByTestId('frequencyMode')
      .getByRole('combobox')
      .selectOption('Daily');
    await scheduler.programDuration2Weeks.click();

    await scheduler.sendButton.click();
    // Can take a significant amount of time to appear
    commonElements.waitForSuccessPopup('Your program has been assigned. An email has been sent to ', 30000);
  }
}
