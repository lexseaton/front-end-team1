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
        console.log(cells.length);
        if (cells.length > cellIndex) {
            return await cells[cellIndex];
        }

    
        return null;
    }

    async getFirstColumnText(): Promise<string> {
        const rows = await this.getRows();
            const firstColumn = await rows[0].findElement(By.xpath('/html[1]/body[1]/table[1]/tbody[1]/tr[2]/td[1]/a[1]')); // i tried every single identifier and only xpath works for this

        const roleName = firstColumn.getText();                                                                     // i think it should work fine because the path just refers to the position of the cell in the table
            return roleName;                                                                                 
    }

    async clickFirstColumnText(): Promise<void> {
        const rows = await this.getRows();
        //for (const row of rows) {
        const firstColumn = await rows[0].findElement(By.xpath('/html[1]/body[1]/table[1]/tbody[1]/tr[2]/td[1]/a[1]')); // i tried every single identifier and only xpath works for this
       // }
        await firstColumn.click();                                                                                  
    }

    async switchToNewTab(): Promise<void> {
        const handles = await this.driver.getAllWindowHandles();
        await this.driver.switchTo().window(handles[handles.length - 1]);
    }

    
}
