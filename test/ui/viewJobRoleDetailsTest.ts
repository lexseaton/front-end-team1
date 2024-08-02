import { WebDriver } from 'selenium-webdriver';
import 'chromedriver'; 
import { expect } from 'chai';
import 'mocha';
import { viewJobRolePage } from './viewJobRolePage'; 
import { driverBuilder } from './driverBuilder';
import { viewJobRoleDetailsPage } from './viewJobRoleDetailsPage';
//import { viewJobRoleDetailsPage } from './viewJobRoleDetailsPage';

describe('Job Role Information Test', function () {
    let driver: WebDriver;
    let jobRolePage: viewJobRolePage;
    let jobRoleDetailsPage: viewJobRoleDetailsPage;
    let roleName: string;
    
    before(async function () {
         driver = await driverBuilder.driverBefore();
         jobRolePage = new viewJobRolePage(driver);
         await jobRolePage.navigateTo();
    });

    // after(async function () {
    //     await driverBuilder.driverAfter();
    // });

    it('Opens a new page where job role information for the corresponding role can be seen', async function () {    
        roleName = await jobRolePage.getFirstColumnText();
        
        await jobRolePage.clickFirstColumnText();

        await jobRolePage.switchToNewTab();
        jobRoleDetailsPage = new viewJobRoleDetailsPage(driver, 1);

        const title = await jobRoleDetailsPage.getTitleText();
        expect(title).to.equal(roleName);
        
    });


    
});
