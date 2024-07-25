// src/tests/ui/LoginTest.ts
import { Builder, Capabilities, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import { LoginTestPage } from './LoginTestPage';
import * as chrome from 'selenium-webdriver/chrome';
//import * as chromedriver from 'chromedriver';

//chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

describe('Login Test', function () {
    let driver: WebDriver;
    let loginPage: LoginTestPage;

    before(async function () {
        driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options())
            .build();

        loginPage = new LoginTestPage(driver);
    });

    after(async function () {
        try {
            await driver.quit(); // Ensure this is awaited
        } catch (error) {
            console.error('Error quitting the driver:', error);
        }
    });

    it('Should login successfully', async function () {
        const url: string = process.env.UI_TEST_URL || 'http://localhost:3000/loginForm';
        await loginPage.open(url);

        await loginPage.enterUsername('admin');
        await loginPage.enterPassword('admin');
        await loginPage.clickLogin();

        const actualText = await loginPage.getSuccessMessageText();
        expect(actualText).to.equal('Together we write our story...');
    });
});
