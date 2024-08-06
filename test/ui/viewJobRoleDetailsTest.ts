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
            const title = await jobRoleDetailsPage.getTitleText();
            const loc = await jobRoleDetailsPage.getJobRoleLocation();
            const cap = await jobRoleDetailsPage.getJobRoleCapability();
            const jBand = await jobRoleDetailsPage.getJobRoleBand();
            const cDate = await jobRoleDetailsPage.getJobRoleClosingDate();
            expect(title).to.equal(roleName);
            expect(loc).to.equal("Job Location: "+location);
            expect(cap).to.equal("Job Capability: "+capability);
            expect(jBand).to.equal("Job Band: "+band);
            expect(cDate).to.equal("Job Closing Date: "+jobClosingDate);
            
            await jobRoleDetailsPage.resetPage();
        }

        
        
    });






    
});
