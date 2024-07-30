import { By, WebDriver, until, Builder } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import {strict as assert}from 'assert';

export class LoginTestPage {
    private driver: WebDriver;
    
    private usernameField: By = By.id('Username');
    private passwordField: By = By.id('Password');
    private loginButton: By = By.id('login');
    private loggedToHomepageSuccessfully: By = By.id("home-page-title");
    private loggedOutSuccessfully: By = By.id("")
    private errorMessage: By = By.id('error-message');
    
    constructor(driver: WebDriver) {
        this.driver = driver;
        
    }
    static async initialize(): Promise<LoginTestPage> {
        const driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options())
            .build();
        return new LoginTestPage(driver);
    }

    static async closeDriver(driver: WebDriver): Promise<void> {
        try {
            await driver.quit();
        } catch (error) {
            console.error('Error quitting the driver:', error);
        }
    }

    async open(url: string): Promise<void> {
        await this.driver.get(url);
    }

    async enterUsername(username: string): Promise<void> {
        const element = await this.driver.findElement(this.usernameField);
        await element.sendKeys(username);
    }

    async enterPassword(password: string): Promise<void> {
        const element = await this.driver.findElement(this.passwordField);
        await element.sendKeys(password);
    }

    async clickLogin(): Promise<void> {
        const element = await this.driver.findElement(this.loginButton);
        await element.click();
    }

    async getLoggedToHomepageSuccessfully(): Promise<string> {
        const element = await this.driver.findElement(this.loggedToHomepageSuccessfully);
        return await element.getText();
    }
    // async getLoggedOutSuccessfully(): Promise<string> {
    //     const element = await this.driver.findElement(this.loggedOutSuccessfully);
    //     return await element.getText();
    // }
    async getErrorMessageText(): Promise<string> {
        const element = await this.driver.findElement(this.errorMessage);
        return await element.getText();
    }
    async enterInvalidUsername(username: string): Promise<void> {
    const element = await this.driver.findElement(this.usernameField);
    await element.sendKeys(username);
}

    async enterInvalidPassword(password: string): Promise<void> {
    const element = await this.driver.findElement(this.passwordField);
    await element.sendKeys(password);
}
}