import { Browser } from "../driver-wrapper/browser";

abstract class PageBase {

    protected browser: Browser;

    constructor(browser: Browser) {
        this.browser = browser;
    }
}

export { PageBase }
