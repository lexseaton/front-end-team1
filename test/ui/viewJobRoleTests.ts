import { Builder, WebDriver } from 'selenium-webdriver';
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

    after(async function () {
        try {
            await driver.quit();
        } catch (error) {
            console.error('Error quitting the driver:', error);
        }
    });

    it('Page should load and title text should display', async function () {
        const url: string = process.env.UI_TEST_URL || 'https://2qr8mnb3c3.eu-west-1.awsapprunner.com/openJobRoles';
        await driver.get(url);
        const title = await driver.findElement(webdriver.By.css('h1')).getText();

        expect(title).to.equal('Open Job Roles');
    });

    it('Job role table should populate', async function () {
        const url: string = process.env.UI_TEST_URL || 'https://2qr8mnb3c3.eu-west-1.awsapprunner.com/openJobRoles';
        await driver.get(url);
        const data = await driver.findElement(webdriver.By.css('td')).getText();

        expect(data).to.not.equal(null);
    });

    it('Location data should only show valid locations', async function () {
        const url: string = process.env.UI_TEST_URL || 'https://2qr8mnb3c3.eu-west-1.awsapprunner.com/openJobRoles';
        await driver.get(url);

        const names: string[] = ["BELFAST", "LONDON", "TORONTO", "BIRMINGHAM", "GDANSK"];

        const table = await driver.findElement(webdriver.By.css('table'));

        const rows = await table.findElements(webdriver.By.css('tr'));

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const cells = await row.findElements(webdriver.By.css('td'));
            
            // Ensure the row has enough cells
            if (cells.length > 1) {
                const cell = cells[1];
                const text = await cell.getText();
                console.log(text);
                expect(names.indexOf(text)).to.be.greaterThan(-1);
            } else {
                console.warn(`Row ${i} does not have enough cells:`, await row.getText());
            }
        }
      
    });

    it('Date fields should only hold data in a correct date format', async function () {
        const url: string = process.env.UI_TEST_URL || 'https://2qr8mnb3c3.eu-west-1.awsapprunner.com/openJobRoles';
        await driver.get(url);

        const table = await driver.findElement(webdriver.By.css('table'));

        const rows = await table.findElements(webdriver.By.css('tr'));

        //Regular expression to validate the format of the dates in the closing date field
        const dateFormat = /^[A-Z][a-z]{2} [A-Z][a-z]{2} \d{2} \d{4}$/;

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const cells = await row.findElements(webdriver.By.css('td'));
            
            // Ensure the row has enough cells
            if (cells.length > 4) {
                const cell = cells[4];
                const text = await cell.getText();
                console.log(text);
                expect(dateFormat.test(text)).to.be.true;
            } else {
                console.warn(`Row ${i} does not have enough cells:`, await row.getText());
            }
        }

    });

})

