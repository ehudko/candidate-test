import { By } from "selenium-webdriver";
import { Browser } from "../../infra/driver-wrapper/browser";
import { PageBase } from "../../infra/pages-infra/page-base";
import { ClickableElement } from "../elements/clickable-element";
import { InputElement } from "../elements/input-element";
import { LabelElement } from "../elements/label-element";

let idInputElement: InputElement;
let nameInputElement: InputElement;
let addressInputElement: InputElement;
let submitButtonElement: ClickableElement;
let scoreInputElement: InputElement;
const okBtnLocator = "//div/button[text()='OK']";

class CreateNewRestaurantPopUp extends PageBase {
   

    constructor(browser: Browser) {
        super(browser);
    }

    async init() {
        submitButtonElement = await this.browser.findElement(ClickableElement, By.xpath("//button[text()='Submit']"));
        nameInputElement = await this.browser.findElement(InputElement, By.xpath("//label[text()='Name']/../input"));
        addressInputElement = await this.browser.findElement(InputElement, By.xpath("//label[text()='Address']/../input"));
        scoreInputElement = await this.browser.findElement(InputElement, By.xpath("//label[text()='Score']/../input"));
        idInputElement = await this.browser.findElement(InputElement, By.xpath("//label[text()='Id']/../input"));
    }

    async getTitle() {
        const titleElement = await this.browser.findElement(LabelElement, By.xpath("//h2[text()='Create new restaurant']"));
        return titleElement.text();
    }

    
async createResturant(id: string, score: string, address: string, name: string) {
    await nameInputElement.sendKeys(name);
    await idInputElement.sendKeys(id);
    await addressInputElement.sendKeys(address);
    await scoreInputElement.sendKeys(score);
    await submitButtonElement.click();
    await this.browser.wait(await (await this.browser.getDriver()).findElement(By.xpath(okBtnLocator)), 5000)
    const createdButtonElement = await this.browser.findElement(ClickableElement, By.xpath(okBtnLocator));
    await createdButtonElement.click();
}
}

export { CreateNewRestaurantPopUp }