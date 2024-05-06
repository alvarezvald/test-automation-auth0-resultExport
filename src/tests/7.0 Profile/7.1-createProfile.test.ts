import { test, expect } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';
import { VALDConfig } from '@configuration/config';
import { Profile } from '@pageObjects/ProfileCreate';
import { LeftHandMenu } from '@pageObjects/LeftHandMenu';
import { Profiles } from '@pageObjects/Profiles';
import { ProfileCreate } from '@pageObjects/ProfileCreate';
import { ProfileIndividual } from '@pageObjects/ProfileIndividual';
import { random } from 'lodash';
import { Login } from '@pageObjects/Login';

const config = VALDConfig();
const url = config.urlValdHubLogin;

// Before each test datestamp it and report on test name
test.beforeEach(async ({ page }, testInfo) => {
  const login = new Login(page);
  const commonElements = new CommonElements(page);
  console.log(Date());
  console.log(config);
  console.log(testInfo.title);
  //ensure left hand menu is expanded
  await commonElements.resizeWindowToStandardSize();
  await page.goto(url);
  await login.loginToHubWithOrganisationChange(
    process.env.USER_VALDAUTOMATION,
    process.env.PASS_VALDAUTOMATION,
    "QA Automation Performance"
  );
});

function setNewProfileDetails() {
  const randomNumber = random(100000, 999999);
  const familyName = `Autotest-${randomNumber}`;
  const newProfile: Profile = {
    givenName: 'QA Profile',
    familyName: familyName,
    dateOfBirth: '12/12/1995',
    email: `qa.vald+testProfile.${randomNumber}@vald.com`,
    gender: 'Male',
    externalID: '1234',
    weight: '60',
    height: '110',
    sport: 'Ice Hockey',
    position: 'Goalie',
    notes: 'Best ever',
    middleName: '',
    allowPhotoAndVideoRecording: true,
    guardianConsent: false,
    informationEnteredby18plus: false,
  };
  const fullName = newProfile.givenName + ' ' + newProfile.familyName;
  return { newProfile, fullName };
}

test('7.1.1 Create a profile, verify it exists, delete it @profile', async ({
  page,
}) => {
  const commonElements = new CommonElements(page);
  const leftHandMenu = new LeftHandMenu(page);
  const profiles = new Profiles(page);
  const createProfile = new ProfileCreate(page);

  console.log(
    'START Test 1.8.1 - Create a profile, verify it exists, delete it'
  );
  // Make sure the date format is as expected.
  await commonElements.setDateFormatDDMMYYYY();

  //Set up a profile
  const { newProfile, fullName } = setNewProfileDetails();

  // Go to Profiles page
  await leftHandMenu.clickHome();
  await leftHandMenu.clickProfiles();
  await expect(commonElements.pageHeader).toHaveText('Profiles')

  // Click create profile
  console.log('Create profile with the following settings: ', newProfile);
  await profiles.createProfileButton.click();
  await createProfile.createProfileWithFirstGroupInList(newProfile);


  // Check if profile exists
  await profiles.verifyProfileExists(fullName);
  console.log('Profile created successfully ', newProfile.email);

  // Delete profile
  await leftHandMenu.clickHome();
  await leftHandMenu.clickProfiles();
  await profiles.deleteProfile(fullName);

  // Clean up - delete profile
  console.log('Cleanup - delete profile');
  await profiles.verifyProfileWasDeleted(fullName);
});

test('7.1.2 Edit a profile (create, edit, validate and delete) @regression @profile', async ({
  page,
}) => {
  const commonElements = new CommonElements(page);
  const leftHandMenu = new LeftHandMenu(page);
  const profiles = new Profiles(page);
  const createProfile = new ProfileCreate(page);
  const profile = new ProfileIndividual(page);

  console.log(
    'START Test 1.8.2 - Edit a profile (create, edit, validate and delete)'
  );
  //Set up a profile to create
  const { newProfile, fullName }: { newProfile: Profile; fullName: string } =
    setNewProfileDetails();

  // Make sure the date format is as expected.
  console.log('Set the date format');
  await commonElements.setDateFormatDDMMYYYY();

  // Go to Profiles page
  console.log('Go to profiles page');
  await leftHandMenu.clickHome();
  await leftHandMenu.clickProfiles();
  await expect(commonElements.pageHeader).toHaveText('Profiles')

  // Click create profile
  console.log('Create profile with the following settings ', newProfile);
  await profiles.createProfileButton.click();
  await createProfile.createProfileWithFirstGroupInList(newProfile);

  await profiles.verifyProfileExists(fullName);
  console.log('Profile created successfully ', fullName);

  // Edit profile - open individual profile edit page
  await profiles.goToIndividualProfilePage(fullName);
  await profile.clickActionEditDetails();

  //Change date of birth and email
  const editedDateOfBirth = '31/10/1947';
  const editedEmail = `${newProfile.email}.is`;
  const editedWeight = '67';
  const editedHeight = '190';
  const editedLastName = `Edit-${newProfile.familyName}`;
  console.log('Edit profile details');

  await createProfile.enterDateOfBirth(editedDateOfBirth);
  await createProfile.enterEmail(editedEmail);
  await createProfile.enterWeight(editedWeight);
  await createProfile.enterHeight(editedHeight);
  await createProfile.enterFamilyName(editedLastName);

  await createProfile.saveButton.click();
  console.log('Edit profile saved');
  const newFullName = `${newProfile.givenName} Edit-${newProfile.familyName}`

  // Were the values changed?
  await profiles.goToIndividualProfilePage(newFullName);
  await profile.clickActionEditDetails();
  console.log('Validate edited profile values were saved - start');

  await expect.soft(createProfile.dateOfBirthInput).toHaveValue(editedDateOfBirth);
  await expect.soft(createProfile.emailInput).toHaveValue(editedEmail);
  await expect.soft(createProfile.weightInput).toHaveValue(editedWeight);
  await expect.soft(createProfile.heightInput).toHaveValue(editedHeight);
  await expect.soft(createProfile.familyNameInput).toHaveValue(editedLastName);

  // Take out the slashes
  //dateOfBirth = dateOfBirth.replace(/\//g, '');
  console.log('Validate edited profile values were saved - End');

  // Clean up - delete profile
  console.log(`Cleanup - delete profile ${newFullName}`);
  await leftHandMenu.clickHome();
  await leftHandMenu.clickProfiles();
  await profiles.deleteProfile(newFullName);
  await profiles.verifyProfileWasDeleted(newFullName);
});

test('7.1.3 Create a 10 year old profile @regression @profile', async ({ page, }) => {

  const commonElements = new CommonElements(page);
  const leftHandMenu = new LeftHandMenu(page);
  const profiles = new Profiles(page);
  const createProfile = new ProfileCreate(page);
  const profile = new ProfileIndividual(page);

  console.log('START Test 1.8.3 - Create a 10 year old profile');
  // Make sure the date format is as expected.
  await commonElements.setDateFormatDDMMYYYY();

  //Set up a profile to create
  const { newProfile, fullName }: { newProfile: Profile; fullName: string } =
    setNewProfileDetails();

  // Go to Profiles page
  await leftHandMenu.clickHome();
  await leftHandMenu.clickProfiles();
  await expect(commonElements.pageHeader).toHaveText('Profiles');

  // Set the birthday to 10 years ago
  const tenYearsAgo: Date = new Date();
  tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);

  newProfile.dateOfBirth = `${tenYearsAgo
    .getDate().toString()
    .padStart(2, '0')}\/${(tenYearsAgo.getMonth() + 1)
      .toString()
      .padStart(2, '0')}\/${tenYearsAgo.getFullYear()}`;

  // Create the profile
  newProfile.guardianConsent = true;
  newProfile.informationEnteredby18plus = true;
  console.log('Create profile with the following settings: ', newProfile);
  await profiles.createProfileButton.click();
  await createProfile.createProfileWithFirstGroupInList(newProfile);

  // Check if profile exists
  await profiles.verifyProfileExists(fullName);
  console.log('Profile created successfully ', fullName);

  // Edit profile - open individual profile edit page
  await profiles.goToIndividualProfilePage(fullName);
  await profile.clickActionEditDetails();

  // Check that Information entered by person over 18 cannot be unchecked.
  console.log(
    'Check that information entered by adult is checked and cannot be unchecked.'
  );
  await createProfile.informationEnteredByPersonOver18Slider.click();
  await expect(createProfile.informationEnteredby18plusErrorMessage).toHaveText
    ('Required');

  // Click it back on
  await createProfile.informationEnteredByPersonOver18Slider.click();

  // Check that Allow Photo and video recording is not clickable and is always off.
  console.log('Check that allow photo and video recording is not clickable');
  await expect(createProfile.disabledAllowPhotoVideoRecordingSlider).toHaveCount(1)

  // Check to see if it saves
  await createProfile.saveButton.click();

  // Delete profile
  await leftHandMenu.clickHome();
  await leftHandMenu.clickProfiles();
  await profiles.deleteProfile(fullName);
  await profiles.verifyProfileWasDeleted(fullName);
});

test('7.1.4 Create an adult profile, edit it to a 10 year old profile @regression @profile', async ({ page, }) => {
  console.log(
    'START Test 1.8.4 - Create an adult profile, edit it to a 10 year old profile'
  );

  const commonElements = new CommonElements(page);
  const leftHandMenu = new LeftHandMenu(page);
  const profiles = new Profiles(page);
  const createProfile = new ProfileCreate(page);
  const profile = new ProfileIndividual(page);

  // Make sure the date format is as expected.
  console.log('Set the date format');
  await commonElements.setDateFormatDDMMYYYY();

  //Set up a profile to create
  const { newProfile, fullName }: { newProfile: Profile; fullName: string } =
    setNewProfileDetails();

  // Go to Profiles page
  console.log('Profiles page');
  await leftHandMenu.clickHome();
  await leftHandMenu.clickProfiles();
  await commonElements.verifyHeaderText(
    'Profiles',
    'Did not land on the profiles page'
  );

  // Set the birthday to 10 years ago
  const tenYearsAgo: Date = new Date();
  tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);

  // Create the profile
  console.log('Create profile with the following settings: ', newProfile);
  newProfile.allowPhotoAndVideoRecording = true;
  await profiles.createProfileButton.click();
  await createProfile.createProfileWithFirstGroupInList(newProfile);

  // Check if profile exists
  await profiles.verifyProfileExists(fullName);

  // Edit profile - open individual profile edit page
  await profiles.goToIndividualProfilePage(fullName);
  await profile.clickActionEditDetails();

  // Check that allow video recording is on.
  console.log('Edit the profile');
  await expect(createProfile.allowPhotoVideoRecordingOn).toHaveCount(1);

  // Edit adult profile to be under 13 year old
  await createProfile.enterDateOfBirth(
    `${tenYearsAgo.getDate().toString().padStart(2, '0')}\/${(
      tenYearsAgo.getMonth() + 1)
      .toString()
      .padStart(2, '0')}\/${tenYearsAgo.getFullYear()}`
  );

  // Check that allow photo and video recording is off
  console.log('Check that allow photo has been automatically switched off');
  await expect(createProfile.allowPhotoVideoRecordingOff).toHaveCount(1);

  // Check that Allow Photo and video recording is disabled always off.
  console.log('Check that allow photo and video recording is disabled');
  await expect(createProfile.disabledAllowPhotoVideoRecordingSlider).toHaveCount(1);

  // Save profile
  await createProfile.informationEnteredByPersonOver18Slider.click();
  await createProfile.saveButton.click();
  await commonElements.delay(2000);

  // Delete profile
  await leftHandMenu.clickHome();
  await leftHandMenu.clickProfiles();
  await profiles.deleteProfile(fullName);
  await profiles.verifyProfileWasDeleted(fullName);
});

test('7.1.5 Create over 13 under 18 profile @regression @profile', async ({ page, }) => {
  console.log('START Test 1.8.5 - Create over 13 under 18 profile');

  const commonElements = new CommonElements(page);
  const leftHandMenu = new LeftHandMenu(page);
  const profiles = new Profiles(page);
  const createProfile = new ProfileCreate(page);
  const profile = new ProfileIndividual(page);

  // Make sure the date format is as expected.
  console.log('Set the date format');
  await commonElements.setDateFormatDDMMYYYY();

  //Set up a profile to create
  const { newProfile, fullName }: { newProfile: Profile; fullName: string } =
    setNewProfileDetails();

  // Go to Profiles page
  await leftHandMenu.clickHome();
  await leftHandMenu.clickProfiles();
  await commonElements.verifyHeaderText(
    'Profiles',
    'Did not land on the profiles page'
  );

  // Set the birthday to 15 years ago
  const fifteenYearsAgo = new Date();
  fifteenYearsAgo.setFullYear(fifteenYearsAgo.getFullYear() - 15);

  newProfile.dateOfBirth = `${fifteenYearsAgo
    .getDate().toString()
    .padStart(2, '0')}\/${(fifteenYearsAgo.getMonth() + 1)
      .toString()
      .padStart(2, '0')}\/${fifteenYearsAgo.getFullYear()}`;

  // Create the profile
  console.log('Create profile with the following settings: ', newProfile);
  newProfile.guardianConsent = true;
  await profiles.createProfileButton.click();
  await createProfile.createProfileWithFirstGroupInList(newProfile);

  // Check if profile exists
  await profiles.verifyProfileExists(fullName);
  console.log('Profile created successfully ', fullName);

  // Edit profile - open individual profile edit page
  await profiles.goToIndividualProfilePage(fullName);
  await profile.clickActionEditDetails();

  // Check that Allow Photo and video recording is clickable.
  console.log('Check that allow photo and video recording is clickable');
  await expect(createProfile.disabledAllowPhotoVideoRecordingSlider).toHaveCount(0);

  await createProfile.allowPhotoVideoRecordingSlider.click();
  await createProfile.guardianConsentGivenSlider.click();

  // Check to see if it saves
  await createProfile.saveButton.click();
  await commonElements.delay(2000);

  // Delete profile
  console.log('Clean up - delete profile');
  await leftHandMenu.clickHome();
  await leftHandMenu.clickProfiles();
  await profiles.deleteProfile(fullName);
  await profiles.verifyProfileWasDeleted(fullName);
});
