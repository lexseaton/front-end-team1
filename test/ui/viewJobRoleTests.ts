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
        const title = await driver.findElement(webdriver.By.xpath('/html[1]/body[1]/a[1]/h1[1]')).getText();

        expect(title).to.equal('Open Job Roles');
    });

    it('Job role table should populate', async function () {
        const url: string = process.env.UI_TEST_URL || 'https://2qr8mnb3c3.eu-west-1.awsapprunner.com/openJobRoles';
        await driver.get(url);
        const data = await driver.findElement(webdriver.By.xpath('/html[1]/body[1]/a[1]/table[1]/tbody[1]/tr[2]/td[1]')).getText();

        expect(data).to.not.equal(null);
    });

    it('Location data should only show valid locations', async function () {
        const url: string = process.env.UI_TEST_URL || 'https://2qr8mnb3c3.eu-west-1.awsapprunner.com/openJobRoles';
        await driver.get(url);

        const names: string[] = ["BELFAST", "LONDON", "TORONTO", "BIRMINGHAM", "GDANSK"];

        const loc1 = await driver.findElement(webdriver.By.xpath('/html[1]/body[1]/a[1]/table[1]/tbody[1]/tr[2]/td[2]')).getText();
        const loc2 = await driver.findElement(webdriver.By.xpath('/html[1]/body[1]/a[1]/table[1]/tbody[1]/tr[3]/td[2]')).getText();
        const loc3 = await driver.findElement(webdriver.By.xpath('/html[1]/body[1]/a[1]/table[1]/tbody[1]/tr[4]/td[2]')).getText();
        
        console.log(loc1);
        console.log(names.indexOf("BELFAST"));
        expect(names.indexOf(loc1)).to.be.greaterThan(-1);
        expect(names.indexOf(loc2)).to.be.greaterThan(-1);
        expect(names.indexOf(loc3)).to.be.greaterThan(-1);
    });

    it('Date fields should only hold data in a correct date format', async function () {
        const url: string = process.env.UI_TEST_URL || 'https://2qr8mnb3c3.eu-west-1.awsapprunner.com/openJobRoles';
        await driver.get(url);
        const date1 = await driver.findElement(webdriver.By.xpath('/html[1]/body[1]/a[1]/table[1]/tbody[1]/tr[2]/td[5]')).getText();
        const date2 = await driver.findElement(webdriver.By.xpath('/html[1]/body[1]/a[1]/table[1]/tbody[1]/tr[3]/td[5]')).getText();
        const date3 = await driver.findElement(webdriver.By.xpath('/html[1]/body[1]/a[1]/table[1]/tbody[1]/tr[4]/td[5]')).getText();

        console.log(date1);
        console.log(date2);
        console.log(date3);

        //Regular expression to validate the format of the dates in the closing date field
        const dateFormat = /^[A-Z][a-z]{2} [A-Z][a-z]{2} \d{2} \d{4}$/;

        expect(dateFormat.test(date1)).to.be.true;
        expect(dateFormat.test(date2)).to.be.true;
        expect(dateFormat.test(date3)).to.be.true;

    });

})

