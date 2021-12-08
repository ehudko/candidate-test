import chrome from 'selenium-webdriver/chrome';
import webdriver, { By, ThenableWebDriver, until, WebElement } from 'selenium-webdriver';
import { ClickableElement } from '../../logic/elements/clickable-element';
import { ElementBase } from '../pages-infra/element-base';
import { InputElement } from '../../logic/elements/input-element';
import { LabelElement } from '../../logic/elements/label-element';

import jsonConfig from '../../../config.json';
import { Command } from 'selenium-webdriver/lib/command';


class Browser {

    private driverInstance: any;
    constructor() {
    }

    public async getDriver() {
        if (!this.driverInstance) {
            chrome.setDefaultService(new chrome.ServiceBuilder(jsonConfig.chromedriverPath).build());
            const chromeCapabilities = webdriver.Capabilities.chrome();
            const chromeOptions = { 'args': ['--test-type', '--start-maximized'] };
            chromeCapabilities.set('chromeOptions', chromeOptions);
            this.driverInstance = await new webdriver.Builder().withCapabilities(chromeCapabilities).build();
        }
        return this.driverInstance as ThenableWebDriver;
    }

    async navigateToUrl(url: string) {
        const driver = await this.getDriver();
        driver.navigate().to(url);
    }

    async findElement<T extends ElementBase>(type: new (elem: WebElement) => T, by: By): Promise<T> {
        const res = await (await this.getDriver()).findElement(by);
        return new type(res);
    }

    async close() {
        const driver = await this.getDriver();
        await driver.quit();
        await chrome.getDefaultService().kill();
    }

    async wait(el: WebElement, time: number): Promise<void> {
        const driver = await this.getDriver();
        await driver.wait(until.elementIsVisible(el), time);
    }

    async reload() {
        await (await this.getDriver()).navigate().refresh();
        const driver = await this.getDriver();
        await driver.sleep(5000);
    }

}

export { Browser }


