import { By, WebDriver, WebElement } from 'selenium-webdriver';

export class viewJobRolePage {
    private driver: WebDriver;
    private url: string = process.env.UI_TEST_URL || 'https://2qr8mnb3c3.eu-west-1.awsapprunner.com/openJobRoles';
    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    async navigateTo() {
        await this.driver.get(this.url);
    }

    async getTitleText(): Promise<string> {
        const titleElement = await this.driver.findElement(By.id('open-job-roles-header'));
        return await titleElement.getText();
    }

    async getTableData(): Promise<string> {
        const dataElement = await this.driver.findElement(By.css('td'));
        return await dataElement.getText();
    }

    async getRows(): Promise<WebElement[]> {
        const tableElement = await this.driver.findElement(By.id('role-table'));
        return await tableElement.findElements(By.css('tr'));
    }

    async getCellText(row: WebElement, cellIndex: number): Promise<string> {
        const cells = await row.findElements(By.css('td'));
        if (cells.length > cellIndex) {
            return await cells[cellIndex].getText();
        }
        return '';
    }

    async getCell(row: WebElement, cellIndex: number): Promise<WebElement> {
        const cells = await row.findElements(By.css('td'));
        if (cells.length > cellIndex) {
            return await cells[cellIndex];
        }

        return null;
    }

    async getRoleNameText(num: number): Promise<string> {
        const rows = await this.getRows();
        const firstCell = await this.getCell(rows[num], 0);
        const roleName = firstCell.getText(); 
        return roleName;                                                                                 
    }
    async getLocationText(num: number): Promise<string> {
        const rows = await this.getRows();
        const firstCell = await this.getCell(rows[num], 1);
        const location = firstCell.getText(); 
        return location;                                                                                 
    }
    async getCapabilityText(num: number): Promise<string> {
        const rows = await this.getRows();
        const firstCell = await this.getCell(rows[num], 2);
        const location = firstCell.getText(); 
        return location;                                                                                 
    }
    async getBandText(num: number): Promise<string> {
        const rows = await this.getRows();
        const firstCell = await this.getCell(rows[num], 3);
        const location = firstCell.getText(); 
        return location;                                                                                 
    }
    async getClosingDateText(num: number): Promise<string> {
        const rows = await this.getRows();
        const firstCell = await this.getCell(rows[num], 4);
        const location = firstCell.getText(); 
        return location;                                                                                 
    }

    async clickFirstColumnText(num: number): Promise<void> {
        const table = await this.driver.findElement(By.id("role-table"));
        const link = await table.findElement(By.id("a-role-name-"+num));
        await link.click();                                                                        
    }

    async switchToNewTab(): Promise<void> {
        const handles = await this.driver.getAllWindowHandles();
        await this.driver.switchTo().window(handles[handles.length - 1]);
    }

    async getAllHandles(): Promise<string[]> {
        return await this.driver.getAllWindowHandles();
    }
    
}
