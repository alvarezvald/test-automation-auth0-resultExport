import { Locator, Page } from '@playwright/test';

export class ProgramBuilderScheduler {
  createButton: Locator;
  returnToProgramBuilder: Locator;
  frequencyDropdown: Locator;
  specificDaysMonday: Locator;
  specificDaysTuesday: Locator;
  specificDaysWednesday: Locator;
  specificDaysThursday: Locator;
  specificDaysFriday: Locator;
  specificDaysSaturday: Locator;
  specificDaysSunday: Locator;
  everyXDaysDropdown: Locator;
  daysAWeekDropdown: Locator;
  frequencyDayDropdown: Locator;
  timesPerDayDropdown: Locator;
  timesPerDay: any;
  timePeriodMorning: Locator;
  timePeriodNoon: Locator;
  timePeriodAfternoon: Locator;
  timePeriodEvening: Locator;
  addTimeButton: Locator;
  addTimeFirstDropdown: Locator;
  addTimeFirstMeridianDropdown: Locator;
  numberPickerInput: Locator;
  programDuration1Week: Locator;
  programDuration2Weeks: Locator;
  programDuration4Weeks: Locator;
  programDuration6Weeks: Locator;
  programDurationOngoing: Locator;
  createSupersetButton: Locator;
  formFrequency: Locator;
  sendButton: Locator;
  startDateToday: Locator;
  startDateTomorrow: Locator;
  presetsSelectedButton: Locator;

  constructor(public page: Page) {
    this.page = page;

    this.createButton = page.getByRole('button', {
      name: 'Create',
      exact: true,
    });
    this.sendButton = page.locator('button[aria-label="Send"]');
    this.returnToProgramBuilder = page.getByRole('button', {
      name: 'Return to Program builder',
    });
    this.createSupersetButton = page.getByRole('button', {
      name: 'Create new Superset',
    });
    this.formFrequency = page.locator('div.form-section');
    this.frequencyDropdown = page
      .getByTestId('dayFrequencyMode')
      .getByRole('combobox');
    this.frequencyDayDropdown = page
      .getByTestId('dayFrequencyMode')
      .getByRole('combobox');
    this.specificDaysMonday = page.locator(
      'button.toggle-button[name="specificDaysFlags-mon"]',
    );
    this.specificDaysTuesday = page.locator(
      'button.toggle-button[name="specificDaysFlags-tue"]',
    );
    this.specificDaysWednesday = page.locator(
      'button.toggle-button[name="specificDaysFlags-wed"]',
    );
    this.specificDaysThursday = page.locator(
      'button.toggle-button[name="specificDaysFlags-thu"]',
    );
    this.specificDaysFriday = page.locator(
      'button.toggle-button[name="specificDaysFlags-fri"]',
    );
    this.specificDaysSaturday = page.locator(
      'button.toggle-button[name="specificDaysFlags-sat"]',
    );
    this.specificDaysSunday = page.locator(
      'button.toggle-button[name="specificDaysFlags-sun"]',
    );

    this.everyXDaysDropdown = page.locator(
      'select.form-control.custom-select[name="everyXDays"]',
    );
    this.daysAWeekDropdown = page.locator(
      'select.form-control.custom-select[name="daysAWeek"]',
    );
    this.timesPerDayDropdown = page.getByTestId('timesPerDay');
    this.timePeriodMorning = page.locator(
      'button.toggle-button[name="timeOfDayFlags-morning"]',
    );
    this.timePeriodNoon = page.locator(
      'button.toggle-button[name="timeOfDayFlags-noon"]',
    );
    this.timePeriodAfternoon = page.locator(
      'button.toggle-button[name="timeOfDayFlags-afternoon"]',
    );
    this.timePeriodEvening = page.locator(
      'button.toggle-button[name="timeOfDayFlags-evening"]',
    );
    this.addTimeButton = page.locator(
      'button.btn.large.secondary[aria-label="Add Time"]',
    );
    this.addTimeFirstDropdown = page.locator(
      'div.final-form-field[data-testid="specificTimes[0].time"]',
    );
    this.addTimeFirstMeridianDropdown = page.locator(
      'div.final-form-field[data-testid="specificTimes[0].meridiem"]',
    );
    this.numberPickerInput = page.locator('div.number-picker-display>input');
    this.programDuration1Week = page.getByRole('button', { name: '1 week' });
    this.programDuration2Weeks = page.getByRole('button', { name: '2 weeks' });
    this.programDuration4Weeks = page.getByRole('button', { name: '4 weeks' });
    this.programDuration6Weeks = page.getByRole('button', { name: '6 weeks' });
    this.programDurationOngoing = page.getByRole('button', { name: 'Ongoing' });
    this.startDateToday = page.getByRole('button', { name: 'Today' });
    this.startDateTomorrow = page.getByRole('button', { name: 'Tomorrow' });

    this.presetsSelectedButton = page.locator(
      'div.preset-buttons>button.toggle-button.selected',
    );
  }

  async selectFrequencyMode(frequency: string) {
    // Whenever Daily SpecificDays EveryXDays DaysAWeek
    await this.frequencyDropdown.click();
    await this.frequencyDropdown.selectOption(frequency);
    await this.page.keyboard.press('Escape');
  }

  async selectFrequencyDayMode(frequency: string) {
    // Whenever SessionsPerDay TimesPerDay TimeOfDay SpecificTimes
    await this.frequencyDayDropdown.click();
    await this.frequencyDayDropdown.selectOption(frequency);
    await this.page.keyboard.press('Escape');
  }

  async selectEveryXDays(frequency: string) {
    // 2 3 4 5 6 7
    await this.everyXDaysDropdown.click();
    await this.everyXDaysDropdown.selectOption(frequency);
    await this.page.keyboard.press('Tab');
  }

  async selectDaysAWeek(frequency: string) {
    // 1 2 3 4 5 6
    // 7 is not an option as then it becomes daily
    await this.everyXDaysDropdown.click();
    await this.everyXDaysDropdown.selectOption(frequency);
    await this.page.keyboard.press('Tab');
  }

  async selectTimesPerDay(frequency: string) {
    // 1 - 24
    await this.timesPerDayDropdown.click();
    await this.page.locator('input#timesPerDay').fill(frequency);
    await this.page.keyboard.press('Tab');
  }

  async selectMeridian(frequency: string) {
    // AM PM
    await this.addTimeFirstMeridianDropdown.click();
    await this.addTimeFirstMeridianDropdown.selectOption(frequency);
    await this.page.keyboard.press('Tab');
  }
}
