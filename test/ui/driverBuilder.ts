import { Builder, WebDriver } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

export class driverBuilder {

    static driver: WebDriver;

    static async driverBefore(): Promise<WebDriver> {
        this.driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options())
            .build();
        return this.driver;
    }

    static async driverAfter(): Promise<void> {
        try {
            if (this.driver) {
                await this.driver.quit();
            }
        } catch (error) {
            console.error('Error quitting the driver:', error);
        }
    }

}