import { By, WebDriver, until } from 'selenium-webdriver';
import {strict as assert}from 'assert';

export class LoginTestPage {
    private driver: WebDriver;
    
    private usernameField: By = By.id('Username');
    private passwordField: By = By.id('Password');
    private loginButton: By = By.id('login');
    private loggedToHomepageSuccessfully: By = By.id("home-page-title");
    private errorMessage: By = By.id('error-message');

    constructor(driver: WebDriver) {
        this.driver = driver;
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