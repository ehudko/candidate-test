import { By } from "selenium-webdriver";
import { ClickableElement } from "../elements/clickable-element";
import { Browser } from "../../infra/driver-wrapper/browser";
import { CreateNewRestaurantPopUp } from "../popups/create-new-restaurant-popup";
import { extend } from "lodash";
import { PageBase } from "../../infra/pages-infra/page-base";

class RestaurantPage extends PageBase {

    private createNewRestaurantButtonLocator = "//button[text()='Create new']"
    private lastRowLocator = "//tbody/tr[last()]"
    private okBtnLocator = "//div/button[text()='OK']";


    constructor(browser: Browser) {
        super(browser);
    }

    async openCreateRestaurantPopup() {
        const button = await this.browser.findElement(ClickableElement, By.xpath(this.createNewRestaurantButtonLocator));
        await button.click();
        return new CreateNewRestaurantPopUp(this.browser);
    }

    async validateResturant(id: string, score: string, address: string, name: string, lastRow: boolean = true): Promise<boolean> {
        const locator = lastRow ? this.lastRowLocator : "//tbody/tr[td[contains(text(),'" + id + "')]]";
        const row = await this.browser.findElement(ClickableElement, By.xpath(locator));
        const text = await row.text();
        console.log("last row text: " + text);
        return text.includes(id) && text.includes(score) && text.includes(address)
            && text.includes(name);
    }
    async deleteResturantById(id: string): Promise<boolean> {
        const deleteButtonlocator = "//tr[td[contains(text(),'" + id + "')]]//button";
        const button = await this.browser.findElement(ClickableElement, By.xpath(deleteButtonlocator));
        await button.click();
        await this.browser.wait(await (await this.browser.getDriver()).findElement(By.xpath(this.okBtnLocator)), 5000)
        const createdButtonElement = await this.browser.findElement(ClickableElement, By.xpath(this.okBtnLocator));
        await createdButtonElement.click();
        return true;
    }
}

export { RestaurantPage }