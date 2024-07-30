import { Builder, WebDriver } from 'selenium-webdriver';
import 'chromedriver';
import * as chrome from 'selenium-webdriver/chrome';

export class driverBuilder {

    static driver: WebDriver;

    static async before(): Promise<WebDriver> {
        this.driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options())
            .build();
        return this.driver;
    }

    static async after(): Promise<void> {
        try {
            if (this.driver) {
                await this.driver.quit();
            }
        } catch (error) {
            console.error('Error quitting the driver:', error);
        }
    }

}