import { Builder, Capabilities, WebDriver } from 'selenium-webdriver';
import webdriver from 'selenium-webdriver';
import { expect } from 'chai';
import * as chrome from 'selenium-webdriver/chrome';

describe('Job Roles Test', function () {

    let driver: WebDriver;

    before(async function () {
        driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options())
            .build();

    });

    // after(async function () {
    //     try {
    //         await driver.quit(); // Ensure this is awaited
    //     } catch (error) {
    //         console.error('Error quitting the driver:', error);
    //     }
    // });

    it('Page should load and title text should display', async function () {
        const url: string = process.env.UI_TEST_URL || 'http://localhost:3000/openJobRoles';
        await driver.get(url);
        //await driver.findElement(webdriver.By.id(''))

        expect("asda").to.equal('Together we write our story...');
    });

})

