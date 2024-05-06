import { Locator, Page, expect } from '@playwright/test';
import { CommonElements } from '@pageObjects/CommonElements';

export class Home {

  commonElements: CommonElements;
  carouselDots: Locator;
  carouselTile: Locator;
  longitudinalChart: Locator;
  secondDonutTileEditIcon: any;
  secondDonutTileDrilldown: Locator;
  welcomeHeader: Locator;
  editTileHeader: Locator;
  drillDownModal: Locator;
  selectTimePeriod: Locator;
  popupHeader: Locator;
  homeTileHeader: Locator;
  downloadVALDInfoPack: Locator;
  modalDownloadInfoPackHeader: Locator;
  
  constructor(public page: Page) {
    this.page = page;
    this.commonElements = new CommonElements(this.page);

    // Header
    this.welcomeHeader = page.locator('h1.dashboard-title').nth(0);

    // Carousel
    this.carouselDots = page.locator('ul.control-dots>li');
    this.carouselTile = page.locator('div.relative.tile-parent.dashboard-carousel');

    // Longitudinal
    this.longitudinalChart = page.locator('div.dashboard-graphs');

    //Tiles
    this.secondDonutTileEditIcon = page.locator('div.tile-action-menus>svg').nth(1);
    this.secondDonutTileDrilldown = page.locator('div.d-flex.dashboard-pie').nth(1);

    this.editTileHeader = page.locator('div>div>h2');
    this.drillDownModal = page.getByTestId('overlay');
    this.selectTimePeriod = page.getByTestId('labelWrapper-Time Period');
    this.popupHeader = page.getByTestId('overlay').locator('h2');

    this.homeTileHeader = page.locator('div.graph-tooltip-trigger');
    this.downloadVALDInfoPack = page.getByText('Download a VALD info pack')
    this.modalDownloadInfoPackHeader = page.locator('div.react-responsive-modal-modal>h1');
  }

}