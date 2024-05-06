import { CommonElements } from '@pageObjects/CommonElements';
import { EducationAssign } from '@pageObjects/EducationAssign';
import { LeftHandMenu } from '@pageObjects/LeftHandMenu';
import { PROMAssign } from '@pageObjects/PROMAssign';
import { ProfileEducation } from '@pageObjects/ProfileEducation';
import { Profiles } from '@pageObjects/Profiles';
import { Locator, Page } from '@playwright/test';

export class ProfileIndividual {
  profiles: Profiles;
  leftHandMenu: LeftHandMenu;
  commonElements: CommonElements;
  threeDotMenu: Locator;
  threeDotMenuOptions: Locator;
  threeDotMenuEdit: Locator;
  threeDotMenuAssign: Locator;
  threeDotMenuDelete: Locator;
  profileOverviewTab: Locator;
  profileTestingTab: Locator;
  profileMostRecentTab: Locator;
  profileResultsTableTab: Locator;
  profileExerciseTab: Locator;
  profileEductionTab: Locator;
  profilePROMSTab: Locator;
  profileActionsButton: Locator;
  overviewTiles: Locator;
  overviewTileType: Locator;
  overviewTileIcon: Locator;
  overviewTileHeader: Locator;
  overviewTileButton: string;
  assignPROMsButton: Locator;
  assignEducationButton: Locator;
  actionsCreateProgramButton: Locator;
  actionsAssignEducationButton: Locator;
  actionsAssignPROMButton: Locator;
  actionsOnlineConsultationButton: Locator;
  actionsViewNotesButton: Locator;
  actionsPrintButton: Locator;
  actionsEditDetails: Locator;
  actionButtonAssignPROM: Locator;
  actionsAssignGroups: Locator;
  actionsDelete: Locator;
  inProgressPROMs: Locator;
  profileMoreDetails: Locator;
  assignTemplateButton: Locator;
  exerciseTable: Locator;
  exerciseTableFirstRow: any;
  firstRowExerciseChartIcon: any;
  showAllExerciseCheckbox: Locator;
  showIndividualExerciseDetails: Locator;
  actionsButtonOptions: Locator;
  programImagesButton: Locator;
  programVideoButton: Locator;
  firstRowPROMLastScore: Locator;
  moreDropdown: Locator;
  tabs: Locator;
  exerciseCopyProgramNotes: Locator;
  exerciseDelete: Locator;
  exerciseKebabMenu: Locator;

  constructor(public page: Page) {
    this.page = page;

    // this.assignPROMModal = new AssignPROMModal();
    this.profiles = new Profiles(this.page);
    this.leftHandMenu = new LeftHandMenu(this.page);
    this.commonElements = new CommonElements(this.page);

    // Three-dot menu
    this.threeDotMenu = page.locator('header').getByRole('button');

    this.threeDotMenuOptions = page.locator('button.btn.large.secondary');
    this.threeDotMenuEdit = page.getByRole('button', { name: 'Edit Details' });
    this.threeDotMenuAssign = page.getByRole('button', {
      name: 'Assign Groups'
    });
    this.threeDotMenuDelete = page.getByRole('button', { name: 'Delete' });

    // Tabs
    this.profileOverviewTab = page.getByRole('link', { name: 'OVERVIEW' });
    this.profileTestingTab = page.getByRole('link', { name: 'TESTING' });
    this.profileMostRecentTab = page.getByRole('link', { name: 'MOST RECENT' });
    this.profileResultsTableTab = page.getByRole('link', {
      name: 'RESULT TABLE'
    });
    this.profileExerciseTab = page.getByRole('link', { name: 'EXERCISE' });
    this.profileEductionTab = page.getByRole('link', { name: 'EDUCATION' });
    this.profilePROMSTab = page.getByRole('link', { name: 'Outcome Measures' });

    this.profileActionsButton = page.getByRole('button', { name: 'Actions' });

    // Overview Tiles
    this.overviewTiles = page.locator('div.grid.grid-cols-1.gap-2>div');
    this.overviewTileType = this.overviewTiles.locator('article>div[data-testid]');
    this.overviewTileIcon = this.overviewTileType.locator('div>div>svg');
    this.overviewTileHeader = this.overviewTiles.locator(
      'div.overflow-hidden.overflow-ellipsis.whitespace-nowrap'
    );
    this.overviewTileButton = 'article>div>button';

    // Buttons
    this.assignPROMsButton = page.getByRole('button', {
      name: 'Assign Outcome Measure'
    });
    this.assignEducationButton = page.getByRole('button', {
      name: 'Assign education'
    });

    this.actionsButtonOptions = this.page.locator(
      'div.entry-container.right-imposter.stack.opened>div>button>span'
    );

    this.actionsCreateProgramButton = page.getByRole('button', {
      name: 'Create Program'
    });

    this.actionsAssignEducationButton = this.actionsButtonOptions.filter({ hasText: 'Assign Education' });

    this.actionsAssignPROMButton = page.getByRole('button', {
      name: 'Assign Outcome Measure'
    });
    this.actionsOnlineConsultationButton = page.getByRole('button', {
      name: 'Online Consultation'
    });
    this.actionsViewNotesButton = page.getByRole('button', {
      name: 'View Notes'
    });
    this.actionsPrintButton = page.getByRole('button', { name: 'Print' });
    this.actionsEditDetails = page.getByRole('button', {
      name: 'Edit Details'
    });
    this.actionButtonAssignPROM = page.getByRole('button', {
      name: 'Assign Outcome Measure'
    });
    this.actionsAssignGroups = page.getByRole('button', {
      name: 'Assign Groups'
    });
    this.actionsDelete = page.getByRole('button', { name: 'Delete' });

    //PROMs
    this.inProgressPROMs = page.getByText('In Progress');

    this.profileMoreDetails = page.getByText('More details ...').first();

    // Exercise Tab
    this.assignTemplateButton = page.getByRole('button', {
      name: 'Assign template'
    });
    this.exerciseTable = page.locator('table.component-table');
    this.exerciseTableFirstRow = this.exerciseTable.locator('tbody>tr').nth(0);
    this.firstRowExerciseChartIcon = this.exerciseTableFirstRow.locator(
      'td[aria-label="table-cell-actions"]>div.table-text>div>button'
    );
    this.showAllExerciseCheckbox = page.locator('svg.close-icon').nth(0);
    this.showIndividualExerciseDetails = page.locator('div.click-hint');

    // Program drill down
    this.programImagesButton = page
      .getByRole('button', { name: 'Images' })
      .first();
    this.programVideoButton = page
      .getByRole('button', { name: 'Video' })
      .first();

    this.firstRowPROMLastScore = page
      .locator('td[aria-label="table-cell-lastScore"]>div')
      .nth(0);

    this.moreDropdown = page.locator(
      'button.btn.large.secondary[aria-label="More"]'
    );

    this.tabs = page.locator('a.option.tab-menu');

    this.exerciseCopyProgramNotes = page.locator('button[aria-label="Copy program notes"]');
    this.exerciseDelete = page.getByRole('button', { name: 'Delete' });
    this.exerciseKebabMenu = page.locator('button.btn.large.tertiary');
  }

  async promLastScore(): Promise<string> {
    let lastScore = 'none';
    if (await this.firstRowPROMLastScore.count() > 0) {
      let lastScore = await this.firstRowPROMLastScore.textContent;
    }
    return lastScore;
  }

  async clickActionsButton() {
    await this.profileActionsButton.click();
  }

  async clickActionAssignPROM() {
    await this.clickActionsButton();
    await this.actionButtonAssignPROM.click();
  }

  async clickActionViewNotes() {
    await this.clickActionsButton();
    await this.actionsViewNotesButton.click();
  }

  async clickProfileExerciseTab() {
    if ((await this.profileExerciseTab.count()) > 0) {
      await this.profileExerciseTab.click();
    }
  }

  async clickActionEditDetails() {
    await this.clickActionsButton();
    await this.actionsEditDetails.click();
  }

  async clickActionAssignGroup() {
    await this.clickActionsButton();
    await this.actionsAssignGroups.click();
  }

  async clickActionDelete() {
    await this.clickActionsButton();
    await this.actionsDelete.click();
  }

  async clickProfilePROMSTab() {
    await this.profilePROMSTab.click();
  }

  async assignPROMtoCurrentProfile(
    profileEmail: string,
    PROMName: string,
    nbrOfSurveys: string
  ) {
    const assignPROMModal = new PROMAssign(this.page);
    // Open profile

    const profileName = await this.profiles.goToIndividualProfilePage(profileEmail);
    
    await this.clickProfilePROMSTab();

    // Wait for page to load, this might be enough
    await this.page.getByText('This profile currently has no Outcome Measures assigned.') // Present when no outcomes are assigned
      .or(await this.page.getByText('Assigned Outcome Measures'))                         // Present when outcomes are assigned
      .waitFor({ state: 'visible' });

    console.log(`Profile individual page open ${profileEmail}`);
    console.log(
      `PROMs in progress count: ${await this.inProgressPROMs.count()}`
    );

    //If it currently does not have an active PROM then assign one
    if ((await this.inProgressPROMs.count()) <= 0) {
      await this.assignPROMsButton.click();
      await assignPROMModal.searchPROM(PROMName);
      await assignPROMModal.checkboxPROMFirstRowOnDisplay.click();
      await assignPROMModal.doneButton.click();

      console.log(`Survey assigned to profile ${PROMName}`);
      console.log(`Survey series count ${nbrOfSurveys}`);

      // update side to left
      await assignPROMModal.clickSelectSides();
      await assignPROMModal.enterNumberofSurveys(nbrOfSurveys);

      // set the recurring rate to the first option.
      if ((await assignPROMModal.recurringRateDropdown.count()) > 0) {
        await assignPROMModal.recurringRateDropdown.click();
        await assignPROMModal.recurringRateFirstOption.click();
      }
      await assignPROMModal.assignPROMButton.click();
      await this.commonElements.waitForSuccessPopup(`Successfully assigned ${PROMName} to ${profileName}`);
    }
    else {
      console.log(`Profile, ${profileName}, already has an active PROM`);
    }
  }

  async getThreeDotMenuListOptions(): Promise<string[]> {
    await this.threeDotMenu.click();
    const optionListItemCount = await this.threeDotMenuOptions.count();
    const optionListArray: string[] = [];
    for (let i = 0; i < optionListItemCount; i++) {
      optionListArray.push(
        await this.threeDotMenuOptions
          .locator('button>span')
          .nth(i)
          .textContent()
      );
    }
    return optionListArray;
  }

  async selectThreeDotMenuOption(optionString: string) {
    await this.threeDotMenu.click();
    if ((await this.threeDotMenuOptions.count()) > 0) {
      switch (optionString) {
        case 'Edit Details':
          await this.threeDotMenuEdit.click();
          break;
        case 'Assign Groups':
          await this.threeDotMenuAssign.click();
          break;
        case 'Delete':
          await this.threeDotMenuDelete.click();
        default:
          break;
      }
    } else {
      console.log('ERROR: ${option} was not available from the three-dot menu');
    }
  }

  async assignEducationToProfile(profileEmail: string, educationName: string) {
    const assignEducationModal = new EducationAssign(this.page);

    // Open profile to Education tab
    await this.leftHandMenu.clickHome();
    await this.leftHandMenu.clickProfiles();
    await this.profiles.goToIndividualProfilePage(profileEmail);
    await this.profileEductionTab.click();
    await this.commonElements.delay(5000);
    console.log(`Profile individual page open ${profileEmail}`);

    // Assign first education to profile
    await this.assignEducationButton.click();
    await assignEducationModal.searchEducation(educationName);
    await assignEducationModal.checkboxEducationFirstRowOnDisplay.click();
    await assignEducationModal.assignSelectedButton.click();
    console.log(`Education assigned to profile ${educationName}`);
  }
  // Unassign first education from profile
  async unassignFirstEducationFromProfile(profileEmail: string) {
    const profileEducation = new ProfileEducation(this.page);

    // Open profile
    await this.leftHandMenu.clickHome();
    await this.leftHandMenu.clickProfiles();

    await this.profiles.goToIndividualProfilePage(profileEmail);
    await this.profileEductionTab.click();
    await this.commonElements.delay(5000);
    console.log(`Profile individual page open ${profileEmail}`);

    await profileEducation.unassignEducation();
  }

  async getActionsDropdownList(): Promise<string[]> {
    await this.profileActionsButton.click();
    const optionListItemCount = await this.actionsButtonOptions.count();
    const optionListArray: string[] = [];
    for (let i = 0; i < optionListItemCount; i++) {
      optionListArray.push(
        await this.actionsButtonOptions.nth(i).textContent()
      );
    }
    return optionListArray;
  }

  async getProfileTabOptions(): Promise<string[]> {
    const optionListCount = +(await this.tabs.count());
    console.log(`Number of configuration tabs is ${optionListCount}`);

    const optionListArray: string[] = [];

    for (let i = 0; i < optionListCount; i++) {
      optionListArray.push(await this.tabs.nth(i).textContent());
    }
    return optionListArray;
  }

  async getProfileOverviewTileList(): Promise<string[]> {
    const overviewTileList: string[] = [];
    const overviewTileCount = await this.overviewTiles.count();
    for (let i = 0; i < overviewTileCount; i++) {
      overviewTileList.push(
        await this.overviewTileType.nth(i).getAttribute('data-testid')
      );
    }
    return overviewTileList;
  }
}
