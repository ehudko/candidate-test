import { By, WebElement } from "selenium-webdriver";
import { Browser } from "../../infra/driver-wrapper/browser";
import { LabelElement } from "./label-element";


class ClickableElement extends LabelElement {

    constructor(seleniumElement: WebElement) {
        super(seleniumElement);
    }

    async click(): Promise<void> {
        return this.element.click();
    }
}

export { ClickableElement }