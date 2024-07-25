// src/pages/LoginTestPage.ts
import { By, WebDriver } from 'selenium-webdriver';

export class LoginTestPage {
    private driver: WebDriver;
    
    // Locators
    private usernameField: By = By.id('Username');
    private passwordField: By = By.id('Password');
    private loginButton: By = By.id('login');
    private successMessage: By = By.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/h3[1]");

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    // Actions
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

    async getSuccessMessageText(): Promise<string> {
        const element = await this.driver.findElement(this.successMessage);
        return await element.getText();
    }
}
