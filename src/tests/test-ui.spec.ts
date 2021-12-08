import { expect } from 'chai';
import { Browser } from '../infra/driver-wrapper/browser';
import { RestaurantPage } from '../logic/pages/restaurant-page';
import { CreateNewRestaurantPopUp } from '../logic/popups/create-new-restaurant-popup';
import { PageBase } from '../infra/pages-infra/page-base';
import jsonConfig from '../../config.json';
import restaurantsAPI from '../logic/REST/restaurantsAPI';
import { ApiResponse } from '../infra/rest/api-response';
import { Restaurant } from '../logic/REST/API-Response/get-restaurants-response';
import { exitCode } from 'process';

const baseUiUrl = jsonConfig.baseUiUrl + '/';

describe('UI tests', () => {
    let browser: Browser;

    beforeEach('Start browser', async () => {
        await restaurantsAPI.resetServer();
        browser = new Browser();
        await browser.navigateToUrl(baseUiUrl);

    })

    afterEach('Close browser', async () => {
        await browser.close();
    })

    it('Validate "Create new Restaurant Popup" opened', async function () {
        const page = new RestaurantPage(browser);
        const popup = await page.openCreateRestaurantPopup();
        await popup.init();
        const actualTitle = await popup.getTitle();
        const expectedTitle = "Create new restaurant";
        expect(actualTitle).to.equal(expectedTitle, 'Restaurants popup was not opened');
    })

    it('Validate Creating new Restaurant', async function () {
        const page = new RestaurantPage(browser);
        const popup = await page.openCreateRestaurantPopup();
        await popup.init();
        const name = "name", id = "22", score = "4.5", address = "address";
        await popup.createResturant(id, score, address, name);

        const getByIdResponse = await restaurantsAPI.getRestaurantById(Number.parseInt(id));
        console.log("obj: " + getByIdResponse);
        //Assert        
        expect(getByIdResponse.success).to.be.true;
        expect(getByIdResponse.status).to.equal(200);

        const valid = await page.validateResturant(id, score, address, name);
        expect(valid).to.equal(true, 'The new Restaurants were were not created');

        const toEdit = 42;
        const body = { "address": "Hakotel hamaarvi" };
        const edited = await restaurantsAPI.editRestaurantById(toEdit, body);
        expect(edited.status).to.equal(200);
        expect(edited.success).to.be.true;
        await browser.reload();
        const editedValidate = await page.validateResturant(toEdit.toString(), "4.9", "Hakotel hamaarvi", "Sachi's Place", false);
        expect(editedValidate).to.equal(true);

        await page.deleteResturantById(id)
        const deletByIdResponse = await restaurantsAPI.getRestaurantById(Number.parseInt(id));
        console.log("obj: " + deletByIdResponse);
        //Assert        
        expect(deletByIdResponse.error).to.equal("restaurant with given id not found");
        expect(deletByIdResponse.success).to.be.false;
        expect(deletByIdResponse.status).to.equal(404);

        const validDelete = await page.validateResturant(id, score, address, name);
        expect(validDelete).to.equal(false);

    })


})


