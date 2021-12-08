import { WebElement } from 'selenium-webdriver';

abstract class ElementBase {

    protected element: WebElement;

    constructor(seleniumElement: WebElement) {
        this.element = seleniumElement;
    }
}

export { ElementBase }