import { Locator, Page, expect } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';

export type Profile = {
  // To do: swap this out for the actual type from hub
  givenName?: string;
  familyName?: string;
  middleName?: string;
  dateOfBirth?: string;
  gender?: string;
  email?: string;
  allowPhotoAndVideoRecording?: boolean;
  guardianConsent?: boolean;
  informationEnteredby18plus?: boolean;
  externalID?: string;
  weight?: string;
  height?: string;
  sport?: string;
  position?: string;
  notes?: string;
};

export class ProfileCreate {

  commonElements: CommonElements;
  givenNameInput: Locator;
  familyNameInput: Locator;
  middleNameInput: Locator;
  dateOfBirthInput: Locator;
  genderContainer: Locator;
  genderDropdown: any;
  emailInput: Locator;
  externalIDInput: Locator;
  weightInput: Locator;
  heightInput: Locator;
  positionInput: Locator;
  notesInput: Locator;
  sportContainer: Locator;
  sportDropdown: any;
  allowPhotoVideoRecordingContainer: any;
  guardianConsentGivenContainer: any;
  informationEnteredByPersonOver18Container: any;
  allowPhotoVideoRecordingOn: any;
  allowPhotoVideoRecordingOff: any;
  allowPhotoVideoRecordingSlider: any;
  guardianConsentGivenSlider: any;
  guardianConsentGivenOff: any;
  informationEnteredByPersonOver18Slider: any;
  informationEnteredby18plusOff: any;
  disabledAllowPhotoVideoRecordingSlider: any;
  dropdownList: Locator;
  cancelButton: any;
  nextButton: any;
  finishButton: any;
  saveButton: any;
  profileDetailsTab: any;
  anthropometryTab: any;
  assignGroupsTab: any;
  firstGroupInTableAssignButton: any;
  addNewGroupButton: any;
  givenNameRequiredErrorMessage: any;
  familyNameRequiredErrorMessage: any;
  genderRequiredErrorMessage: any;
  emailInvalidErrorMessage: any;
  informationEnteredby18plusErrorMessage: any;

  constructor(public page: Page) {
    this.page = page;
    this.commonElements = new CommonElements(this.page);

    this.givenNameInput = page.locator('input[name="athleteDto.givenName"]')
    this.familyNameInput = page.locator('input[name="athleteDto.familyName"]')
    this.middleNameInput = page.locator('input[name="athleteDto.additionalNames"]')
    this.dateOfBirthInput = page.locator('div.date-select>div>input');
    this.genderContainer = page.getByTestId('athleteDto.sex');
    this.genderDropdown = this.genderContainer.locator('div>div>div').nth(0)
    this.emailInput = page.locator('input[name="athleteDto.email"]')
    this.externalIDInput = page.locator('input[name="athleteDto.externalId"]')
    this.weightInput = page.locator('input[name="athleteDto.weightInKG"]')
    this.heightInput = page.locator('input[name="athleteDto.heightInCM"]')
    this.positionInput = page.locator('input[name="athleteDto.sportSpecificPosition"]')
    this.notesInput = page.locator('textarea[name="athleteDto.notes"]')
    this.sportContainer = page.getByTestId('athleteDto.sport');
    this.sportDropdown = this.sportContainer.locator('div>div').nth(0);
    this.allowPhotoVideoRecordingContainer = page.getByTestId('athleteDto.photoAndVideoRecordingAllowed').locator('div>div')
    this.guardianConsentGivenContainer = page.getByTestId('athleteDto.isUnderAgeFilmingConsented').locator('div>div')
    this.informationEnteredByPersonOver18Container = page.getByTestId('athleteDto.minorSignedUpByOver18')

    //Slider Buttons
    this.allowPhotoVideoRecordingOn = this.allowPhotoVideoRecordingContainer.locator('input[aria-checked="true"]')
    this.allowPhotoVideoRecordingOff = this.allowPhotoVideoRecordingContainer.locator('input[aria-checked="false"]')
    this.allowPhotoVideoRecordingSlider =
      this.allowPhotoVideoRecordingContainer.locator('div.react-switch-handle');
    this.guardianConsentGivenSlider = this.guardianConsentGivenContainer.locator('div.react-switch-handle');
    this.guardianConsentGivenOff = this.guardianConsentGivenContainer.locator('input[aria-checked="false"]');
    this.informationEnteredByPersonOver18Slider = this.informationEnteredByPersonOver18Container.locator('div.react-switch-handle');
    this.informationEnteredby18plusOff = this.informationEnteredByPersonOver18Container.locator('input[aria-checked="false"]')
    this.disabledAllowPhotoVideoRecordingSlider =
      this.allowPhotoVideoRecordingContainer.locator('input[disabled]')
    this.dropdownList = page.locator('label.select-label');

    //Buttons
    this.cancelButton = page.locator('button[aria-label="Cancel"]');
    this.nextButton = page.locator('button[aria-label="Next"]');
    this.finishButton = page.locator('button[aria-label="Finish"]');
    this.saveButton = page.locator('button[aria-label="Save"]');

    //Tabular navigation
    this.profileDetailsTab = page.locator('div.tab-nav>div>div').filter({ hasText: 'PROFILE DETAILS' });
    this.anthropometryTab = page.locator('div.tab-nav>div>div').filter({ hasText: 'ANTHROPOMETRY' });
    this.assignGroupsTab = page.locator('div.tab-nav>div>div').filter({ hasText: 'ASSIGN GROUPS' });

    //Assign Groups Tab
    this.firstGroupInTableAssignButton = page.locator(
      'button.btn.small.primary-dark[aria-label="Assign"]').nth(0)

    this.addNewGroupButton = page.locator(
      'button.btn.small.secondary.action-button[aria-label="Add new group"]')

    //Error messages on fields
    this.givenNameRequiredErrorMessage = page.locator('span.field-error').filter({
      hasText:
        'Please enter a given name'
    }
    );
    this.familyNameRequiredErrorMessage = page.locator('span.field-error').filter({
      hasText:
        'Please enter a family name'
    }
    );
    this.genderRequiredErrorMessage = page.locator('span.field-error').filter({
      hasText:
        'Please select a gender'
    }
    );

    this.emailInvalidErrorMessage = page.locator('span.field-error').filter({
      hasText:
        'Please enter a valid email address'
    }
    );

    this.informationEnteredby18plusErrorMessage = page.locator('span.field-error');
  }

    async  enterGivenName(givenName: string) {
      await this.givenNameInput.click();
      await this.givenNameInput.fill(givenName);
      await this.givenNameInput.press('Tab');
    }

    async  enterFamilyName(familyName: string) {
      await this.familyNameInput.click();
      await this.familyNameInput.fill(familyName);
      await this.familyNameInput.press('Tab');
    }

    async  enterMiddleName(middleName: string) {
      await this.middleNameInput.click();
      await this.middleNameInput.fill(middleName);
      await this.middleNameInput.press('Tab')
    }

    async  enterDateOfBirth(dateStr: string) {
      await this.dateOfBirthInput.click()
      await this.dateOfBirthInput.fill(dateStr)
      await this.dateOfBirthInput.press('Tab')
    }

    async  enterEmail(email: string) {
      await this.emailInput.click()
      await this.emailInput.fill(email)
      await this.emailInput.press('Tab')
    }

    async  enterWeight(weight: string) {
      await this.weightInput.click()
      await this.weightInput.fill(weight)
      await this.weightInput.press('Tab')
    }

    async  enterHeight(height: string) {
      await this.heightInput.click()
      await this.heightInput.fill(height)
      await this.heightInput.press('Tab')
    }

    async  enterPosition(position: string) {
      await this.positionInput.click()
      await this.positionInput.fill(position)
      await this.positionInput.press('Tab')
    }

    async  enterNotes(notes: string) {
      await this.notesInput.click()
      await this.notesInput.fill(notes)
      await this.notesInput.press('Tab')
    }

    async  enterExternalID(id: string) {
      await this.externalIDInput.click()
      await this.externalIDInput.fill(id)
      await this.externalIDInput.press('Tab')
    }

    async  selectSportFromDropdown(sport: string) {
      await this.sportDropdown.click();
      await this.selectDropDownOption(sport);
    }

    async  selectGenderFromDropdown(gender: string) {
      await this.genderDropdown.click();
      await this.selectDropDownOption(gender);
    }

    async  selectDropDownOption(optionString: string) {
      let regExString = new RegExp(`^${optionString}$`)
      await this.dropdownList.filter({ hasText: regExString }).click();
    }

    async  enterProfileDetails(profile: Profile) {
      if (profile.givenName) {
        await this.enterGivenName(profile.givenName);
      }

      if (profile.familyName) {
        await this.enterFamilyName(profile.familyName);
      }

      if (profile.dateOfBirth) {
        await this.enterDateOfBirth(profile.dateOfBirth);
      }

      if (profile.email) {
        await this.enterEmail(profile.email);
      }

      if (profile.gender) {
        await this.selectGenderFromDropdown(profile.gender);
      }

      if (profile.externalID) {
        await this.enterExternalID(profile.externalID);
      }

      if (profile.weight) {
        await this.enterWeight(profile.weight);
      }

      if (profile.height) {
        await this.enterHeight(profile.height);
      }

      if (profile.sport) {
        await this.selectSportFromDropdown(profile.sport);
      }

      if (profile.position) {
        await this.enterPosition(profile.position);
      }

      if (profile.notes) {
        await this.enterNotes(profile.notes);
      }

      if (profile.informationEnteredby18plus) {
        if (await this.informationEnteredby18plusOff.count() > 0) {
          await this.informationEnteredByPersonOver18Slider.click();
        }
      }

      if (profile.guardianConsent) {
        if (await this.guardianConsentGivenOff.count() > 0) {
          await this.guardianConsentGivenSlider.click();
        }
      }

      if (profile.allowPhotoAndVideoRecording) {
        if (await this.allowPhotoVideoRecordingOff.count() > 0) {
          await this.allowPhotoVideoRecordingSlider.click()
        }
      }
    }

    async  createProfileWithFirstGroupInList(newProfile: Profile) {
      await this.enterProfileDetails(newProfile);
      // go to Assign groups
      await this.nextButton.click();
      await this.firstGroupInTableAssignButton.click();
      await this.finishButton.click();
      await this.commonElements.delay(3000);
    }
  }


