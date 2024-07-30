import { Builder, WebDriver, WebElement } from 'selenium-webdriver';
import webdriver from 'selenium-webdriver';
import { expect } from 'chai';
import * as chrome from 'selenium-webdriver/chrome';

export class viewJobRolePage {

    private driver: WebDriver;
    private url: string = process.env.UI_TEST_URL || 'https://2qr8mnb3c3.eu-west-1.awsapprunner.com/openJobRoles';

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    async navigateTo() {
        await this.driver.get(this.url);
    }

    async getTitleText(): Promise<string> {
        const titleElement = await this.driver.findElement(webdriver.By.css('h1'));
        return await titleElement.getText();
    }

    async getTableData(): Promise<string> {
        const dataElement = await this.driver.findElement(webdriver.By.css('td'));
        return await dataElement.getText();
    }

    async getRows(): Promise<WebElement[]> {
        const tableElement = await this.driver.findElement(webdriver.By.css('table'));
        return await tableElement.findElements(webdriver.By.css('tr'));
    }

    async getCellText(row: WebElement, cellIndex: number): Promise<string> {
        const cells = await row.findElements(webdriver.By.css('td'));
        if (cells.length > cellIndex) {
            return await cells[cellIndex].getText();
        }
        return '';
    }

}