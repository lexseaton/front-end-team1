import { WebDriver } from 'selenium-webdriver';
import 'chromedriver'; 
import { expect } from 'chai';
import 'mocha';
import { viewJobRolePage } from './viewJobRolePage'; 
import { driverBuilder } from './driverBuilder';
import { viewJobRoleDetailsPage } from './viewJobRoleDetailsPage';

describe('Job Role Information Test', function () {
    let driver: WebDriver;
    let jobRolePage: viewJobRolePage;
    let jobRoleDetailsPage: viewJobRoleDetailsPage;
    let roleName: string;
    let location: string;
    let capability: string;
    let band: string;
    let jobClosingDate: string;
    
    before(async function () {
         driver = await driverBuilder.driverBefore();
        jobRoleDetailsPage = new viewJobRoleDetailsPage(driver, 1);

         jobRolePage = new viewJobRolePage(driver);

         await jobRolePage.navigateTo();
    });

    after(async function () {
        await driverBuilder.driverAfter();
    });

    it('All links in view job roles table lead to a corresponding information page with valid information', async function () {    
        const rows = jobRolePage.getRows();

        for(let i = 1; i < (await rows).length; i++) {

            roleName = await jobRolePage.getRoleNameText(i);
            location = await jobRolePage.getLocationText(i);
            capability = await jobRolePage.getCapabilityText(i);
            band = await jobRolePage.getBandText(i);
            jobClosingDate = await jobRolePage.getClosingDateText(i);
            await jobRolePage.clickFirstColumnText(i);
            await jobRolePage.switchToNewTab();
            
            expect(await jobRoleDetailsPage.getTitleText()).to.equal(roleName);
            expect(await jobRoleDetailsPage.getJobRoleLocation()).to.equal("Job Location: "+location);
            expect(await jobRoleDetailsPage.getJobRoleCapability()).to.equal("Job Capability: "+capability);
            expect(await jobRoleDetailsPage.getJobRoleBand()).to.equal("Job Band: "+band);
            expect(await jobRoleDetailsPage.getJobRoleClosingDate()).to.equal("Job Closing Date: "+jobClosingDate);
            
            await jobRoleDetailsPage.resetPage();
        }

        
        
    });






    
});
