import { By, WebDriver, WebElement } from 'selenium-webdriver';

export class viewJobRoleDetailsPage {
    private driver: WebDriver;
    private roleNo: number;
    private url: string;

    constructor(driver: WebDriver, roleNo: number) {
        this.driver = driver;
        this.roleNo = roleNo;
        this.url = process.env.UI_TEST_URL || `https://2qr8mnb3c3.eu-west-1.awsapprunner.com/openJobRoles/${this.roleNo}`;
    }

    async navigateTo() {
        await this.driver.get(this.url);
    }

    async getTitleText(): Promise<string> {
        const titleElement = await this.driver.findElement(By.id('heading1'));
        return await titleElement.getText();
    }

    async getJobRoleName(): Promise<WebElement> {
        const jrName = await this.driver.findElement(By.id('jr-name'));
        return await jrName;
    }

    async getJobRoleDescription(): Promise<WebElement> {
        const jrDesc = await this.driver.findElement(By.id('jr-desc'));
        return await jrDesc;
    }

    async getJobRoleResponsibilities(): Promise<WebElement> {
        const jrResp = await this.driver.findElement(By.id('jr-resp'));
        return await jrResp;
    }

    async getJobRoleLink(): Promise<WebElement> {
        const jrLink = await this.driver.findElement(By.id('jr-url'));
        return await jrLink;
    }

    async getJobRoleLocation(): Promise<WebElement> {
        const jrLoc = await this.driver.findElement(By.id('jr-location'));
        return await jrLoc;
    }

    async getJobRoleCapability(): Promise<WebElement> {
        const jrCap = await this.driver.findElement(By.id('jr-cap'));
        return await jrCap;
    }
    
    async getJobRoleBand(): Promise<WebElement> {
        const jrBand = await this.driver.findElement(By.id('jr-band'));
        return await jrBand;
    }

    async getJobRoleClosingDate(): Promise<WebElement> {
        const jrDt = await this.driver.findElement(By.id('jr-dt'));
        return await jrDt;
    }

}