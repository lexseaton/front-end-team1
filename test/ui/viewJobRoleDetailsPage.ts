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

    async getJobRoleLocation(): Promise<string> {
        const jrLoc = await this.driver.findElement(By.id('jr-location'));
        return await jrLoc.getText();
    }

    async getJobRoleCapability(): Promise<string> {
        const jrCap = await this.driver.findElement(By.id('jr-cap'));
        return await jrCap.getText();
    }
    
    async getJobRoleBand(): Promise<string> {
        const jrBand = await this.driver.findElement(By.id('jr-band'));
        return await jrBand.getText();
    }

    async getJobRoleClosingDate(): Promise<string> {
        const jrDt = await this.driver.findElement(By.id('jr-dt'));
        return await jrDt.getText();
    }

    async getAllHandles(): Promise<string[]> {
        return await this.driver.getAllWindowHandles();
    }

    async resetPage(): Promise<void> {

        const handles = await this.driver.getAllWindowHandles();
    
        const currentHandle = await this.driver.getWindowHandle();
        
        const currentIndex = handles.indexOf(currentHandle);
        
        const leftIndex = (currentIndex === 0) ? handles.length - 1 : currentIndex - 1;
        
        await this.driver.switchTo().window(handles[leftIndex]);

        await this.driver.switchTo().window(handles[leftIndex]);
    
        await this.driver.switchTo().window(currentHandle);

        await this.driver.close();
        
        await this.driver.switchTo().window(handles[leftIndex]);

    }


}