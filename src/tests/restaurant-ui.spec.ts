import { expect } from 'chai';
import { Browser } from '../infra/driver-wrapper/browser';
import { By } from 'selenium-webdriver';
import { RestaurantPage } from '../logic/pages/restaurant-page';
import { CreateNewRestaurantPopUp } from '../logic/popups/create-new-restaurant-popup';
import { PageBase } from '../infra/pages-infra/page-base';
import jsonConfig from '../../config.json';

const baseUiUrl = jsonConfig.baseUiUrl + '/';

describe('UI tests', () => {
    let browser: Browser;

    beforeEach('Start browser', async () => {
        browser = new Browser();
        await browser.navigateToUrl(baseUiUrl);

    })

    afterEach('Close browser', async () => {
        await browser.close();
    })

    it.skip('Validate "Create new Restaurant Popup" opened', async function () {
        const page = new RestaurantPage(browser);
        const popup = await page.openCreateRestaurantPopup();
        await popup.init();
        const actualTitle = await popup.getTitle();
        const expectedTitle = "Create new restaurant";
        expect(actualTitle).to.equal(expectedTitle, 'Restaurants popup was not opened');
    })
})


