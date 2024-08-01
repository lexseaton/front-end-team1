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
}
