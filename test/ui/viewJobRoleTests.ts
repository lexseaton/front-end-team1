import { WebDriver } from 'selenium-webdriver';
import 'chromedriver'; 
import { expect } from 'chai';
import 'mocha';
import { viewJobRolePage } from './viewJobRolePage'; 
import { driverBuilder } from './driverBuilder';
import { LoginTestPage } from './LoginTestPage';

describe('Job Roles Test', function () {
    let driver: WebDriver;
    let jobRolePage: viewJobRolePage;
    let loginPage: LoginTestPage;
    
    before(async function () {
        driver = await driverBuilder.driverBefore();
        loginPage = new LoginTestPage(driver);
        
        await loginPage.open(LoginTestPage.URL);
        await loginPage.enterUsername('admin');
        await loginPage.enterPassword('admin');
        await loginPage.clickLogin();
        
        jobRolePage = new viewJobRolePage(driver);
        await jobRolePage.navigateTo();
    });

    after(async function () {
        await driverBuilder.driverAfter();
    });

    it('Page should load and title text should display', async function () {
        const title = await jobRolePage.getTitleText();
        expect(title).to.equal('Open Job Roles');
    });

    it('Job role table should populate', async function () {
        const data = await jobRolePage.getTableData();
        expect(data).to.not.equal(null);
    });

    it('Location data should only show valid locations', async function () {
        const names: string[] = ["BELFAST", "LONDON", "TORONTO", "BIRMINGHAM", "GDANSK"];
        const rows = await jobRolePage.getRows();

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const text = await jobRolePage.getCellText(row, 1);
            expect(names.indexOf(text)).to.be.greaterThan(-1);
        }
    });

    it('Date fields should only hold data in a correct date format', async function () {
        const rows = await jobRolePage.getRows();
        const dateFormat = /^[A-Z][a-z]{2} [A-Z][a-z]{2} \d{2} \d{4}$/;

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const text = await jobRolePage.getCellText(row, 4);
            expect(dateFormat.test(text)).to.be.true;
        }
    });
});
