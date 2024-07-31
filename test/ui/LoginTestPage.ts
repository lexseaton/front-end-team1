import { By, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import { driverBuilder } from './driverBuilder';

export class LoginTestPage {
    private driver: WebDriver;
    static URL: string = 'http://localhost:3000/loginForm';

    private usernameField: By = By.id('Username');
    private passwordField: By = By.id('Password');
    private loginButton: By = By.id('login');
    private logoutButton: By = By.id('logoutButton');
    private loggedToHomepageSuccessfully: By = By.id("home-page-title");
    private loggedOutSuccessfully: By = By.id("loginFrom");
    private errorMessage: By = By.id('error-message');

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    static async initialize(): Promise<LoginTestPage> {
        const driver = await driverBuilder.driverBefore();
        return new LoginTestPage(driver);
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

    async clickLogout(): Promise<void> {
        const element = await this.driver.findElement(this.logoutButton);
        await element.click();
    }

    async getLoggedToHomepageSuccessfully(): Promise<string> {
        const element = await this.driver.findElement(this.loggedToHomepageSuccessfully);
        return await element.getText();
    }

    async getloggedOutSuccessfully(): Promise<string> {
        const element = await this.driver.findElement(this.loggedOutSuccessfully);
        return await element.getText();
    }

    async getErrorMessageText(): Promise<string> {
        const element = await this.driver.findElement(this.errorMessage);
        return await element.getText();
    }

    async testLoginLogoutFailPass(username: string, password: string, expectedText: string, testType: 'success' | 'failure' | 'logout'): Promise<void> {
        await this.open(LoginTestPage.URL);
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();

        if (testType === 'success') {
            const actualText = await this.getLoggedToHomepageSuccessfully();
            expect(actualText).to.equal(expectedText);
        } else if (testType === 'failure') {
            const errorMessage = await this.getErrorMessageText();
            expect(errorMessage).to.equal(expectedText);
        } else if (testType === 'logout') {
            await this.clickLogout();
            const actualText = await this.getloggedOutSuccessfully();
            expect(actualText).to.equal(expectedText);
        }
    }
}
