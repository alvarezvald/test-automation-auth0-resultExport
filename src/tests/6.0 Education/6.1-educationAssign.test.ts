import { test, expect } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';
import { VALDConfig } from '@configuration/config';
import { ProfileIndividual } from '@pageObjects/ProfileIndividual';
import { ProfileEducation } from '@pageObjects/ProfileEducation';
import { Profiles } from '@pageObjects/Profiles';
import { ProfileCreate, Profile } from '@pageObjects/ProfileCreate';
import { random } from 'lodash';
import { LeftHandMenu } from '@pageObjects/LeftHandMenu';
import { Login } from '@pageObjects/Login';

const config = VALDConfig();
const url = config.urlValdHubLogin;
const randomNumber = random(100000, 999999);
const newProfile: Profile = {
  givenName: 'QA',
  familyName: `Butterfield${randomNumber}`,
  dateOfBirth: '12/12/1995',
  email: `qa+EDUCATION.AchillesTendinopathy${randomNumber}@vald.com`,
  gender: 'Male',
  externalID: '1234',
  weight: '60',
  height: '175',
  sport: 'Circus',
  position: 'Clown',
  notes: 'Best ever',
  middleName: '',
  allowPhotoAndVideoRecording: true,
  guardianConsent: false,
  informationEnteredby18plus: false,
};

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

  await login.loginUsernamePassword(
    process.env.USER_HEALTH,
    process.env.PASS_HEALTH,
  );

});

//This test assigns an education article and then unassigns it
test('6.1.1 Assign-Education @regression @education @profile', async ({
  page,
}) => {
  const profiles = new Profiles(page);
  const profile = new ProfileIndividual(page);
  const profileCreate = new ProfileCreate(page);
  const profileEducation = new ProfileEducation(page);
  const educationArticle = 'Achilles Tendinopathy';
  const profileEmail = newProfile.email;
  const leftHandMenu = new LeftHandMenu(page);
  const commonElements = new CommonElements(page);

  //Create Profile
  await leftHandMenu.clickHome();
  await leftHandMenu.clickProfiles();
  await profiles.createProfileButton.click();
  await profileCreate.createProfileWithFirstGroupInList(newProfile);
  const fullName = `${newProfile.givenName} ${newProfile.familyName}`;
  await expect(commonElements.pageHeader).toHaveText(fullName);

  //Assign Education to profile modal
  await profile.assignEducationToProfile(profileEmail, educationArticle);

  //Validate that the education was assigned
  await expect(profileEducation.educationAchillesTendinopathyTile).toHaveText(
    'Achilles Tendinopathy'
  );

  //Unassign Education from profile
  await profile.unassignFirstEducationFromProfile(profileEmail);

  //Validate that the education was unassigned
  await expect
    .soft(profileEducation.educationAchillesTendinopathyTile)
    .toHaveCount(0);

  //Delete Profile
  await profiles.deleteProfile(fullName);
  await profiles.verifyProfileWasDeleted(fullName);
});
