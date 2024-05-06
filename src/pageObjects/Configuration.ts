import { Locator, Page, expect } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';

export class Configuration {

  commonElements: CommonElements;
  trainingTab: Locator;
  templatesTab: Locator;
  drillsTab: Locator;
  educationTab: Locator;
  trainingFirstRowofTable3DotMenu: Locator;
  trainingFirstRowofTable3DotMenuOpenList: Locator;
  templatesFirstRowofTable3DotMenu: Locator;
  templatesFirstRowofTable3DotMenuOpenList: Locator;
  firstRowAssignTemplateButton: Locator;
  tableFilterBarActions: Locator;
  createFFProgramButton: any;
  clearProgramButton: any;
  trainingFFTiles: Locator;
  addExerciseToProgram: any;
  assignTemplateCollapsiblePanel: Locator;
  assignTemplateProfilePanel: any;
  assignTemplateTemplatePanel: any;
  assignTemplateProgramPanel: any;
  confirmClearProgramButton: Locator;
  educationPreviewButton: Locator;
  tabs: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.commonElements = new CommonElements(this.page);

    // Tabs
    this.trainingTab = page.getByRole('link', { name: 'Training' })
    this.templatesTab = page.getByRole('link', { name: 'Templates' })
    this.drillsTab = page.getByRole('link', { name: 'Drills' })
    this.educationTab = page.getByRole('link', { name: 'Education' })
  
    this.trainingFirstRowofTable3DotMenu = page.locator('div.actions-dropdown').nth(0);
    this.trainingFirstRowofTable3DotMenuOpenList = 
      page.locator(' tr.is-clickable:nth-of-type(1)>td[aria-label="table-cell-actions"]>div.table-text>div[data-testid="actions-dropdown"]>div.actions-holder>button>span')
    this.templatesFirstRowofTable3DotMenu = page.locator('tr.is-clickable:nth-of-type(1)>td[aria-label="table-cell-actions"]>div.table-text>div.template-actions>div>div.action-menu');
    this.templatesFirstRowofTable3DotMenuOpenList = 
      page.locator('tr.is-clickable:nth-of-type(1)>td>div.table-text>div>div>div.action-menu>div.entry-container>div>div>button>span');
    this.firstRowAssignTemplateButton = page.locator('div.template-actions>div>button').nth(0)
      
    this.tableFilterBarActions = page.locator('div.table-filter-bar-actions')
    this.createFFProgramButton = this.tableFilterBarActions.locator('button');
  
    this.clearProgramButton = page.getByRole('button', { name: 'Clear program' });
    this.confirmClearProgramButton = page.getByRole('button', { name: 'Confirm?' });
  
    this.trainingFFTiles = page.locator('img.pot-image')
    this.tabs = page.locator('div.tabs-container>a');
  
    this.addExerciseToProgram = page.getByRole('button', { name: 'Add exercise to program' })
  
    this.assignTemplateCollapsiblePanel = page.locator ('div.collapsible-panel')
    this.assignTemplateProfilePanel = this.assignTemplateCollapsiblePanel.nth(0)
    this.assignTemplateTemplatePanel = this.assignTemplateCollapsiblePanel.nth(1)
    this.assignTemplateProgramPanel = this.assignTemplateCollapsiblePanel.nth(2)

    this.educationPreviewButton = page.getByRole('button', { name: 'Preview' });
  }
  
  
    async  getTemplateTable3DotDropdownListOptions(): Promise<string[]> {
           
      await this.templatesFirstRowofTable3DotMenu.click()
    
      const optionListItemCount = await 
        this.templatesFirstRowofTable3DotMenuOpenList.count();
      let optionListArray: string[] = [];
       console.log(optionListItemCount);
      
      for (let i = 0; i < optionListItemCount; i++) {
        optionListArray.push(
          await this.templatesFirstRowofTable3DotMenuOpenList.nth(i).textContent()
        );
      }
      return optionListArray;
    }
  
    async  getTrainingTable3DotDropdownListOptions(): Promise<string[]> {

      await this.trainingFirstRowofTable3DotMenu.click();
    
      const optionListItemCount = await this.trainingFirstRowofTable3DotMenuOpenList
        .count();
      let optionListArray: string[] = [];
       console.log(optionListItemCount);
      
      for (let i = 0; i < optionListItemCount; i++) {
        optionListArray.push(
          await this.trainingFirstRowofTable3DotMenuOpenList.nth(i).textContent()
        );
      }
      return optionListArray;
    }

    async  getConfigurationTabOptions(): Promise<string[]> {

      const optionListCount = await this.tabs.count();
      console.log(`Number of configuration tabs is ${optionListCount}`);

      let optionListArray: string[] = [];
             
      for (let i = 0; i < optionListCount; i++) {
        optionListArray.push(
          await this.tabs.nth(i).textContent()
        );
      }
      
      return optionListArray;
    }
}
