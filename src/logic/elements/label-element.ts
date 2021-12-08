import { By, WebElement } from "selenium-webdriver";
import { Browser } from "../../infra/driver-wrapper/browser";
import { ElementBase } from "../../infra/pages-infra/element-base";

class LabelElement extends ElementBase {

    constructor(seleniumElement: WebElement) {
        super(seleniumElement);
    }

    async text(): Promise<string> {
        return this.element.getText();
    }

    async sendKeys(text: string): Promise<void> {
        await this.element.clear();
        await this.element.sendKeys(text);
    }
}

export { LabelElement }