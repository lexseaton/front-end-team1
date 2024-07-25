import webdriver from 'selenium-webdriver';

import { expect } from 'chai';

describe('Login Test', async () => {
    it('Should login successfully', async () => {
        const driver = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.chrome()).
            build();

        const url: string = process.env.UI_TEST_URL || 'http://localhost:3000/loginForm';
        await driver.get(url);

        await driver.findElement(webdriver.By.id('Username')).sendKeys('admin');
        await driver.findElement(webdriver.By.id('Password')).sendKeys('admin');

        await driver.findElement(webdriver.By.id('login')).click();

        const text = await driver.findElement(webdriver.By.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/h3[1]"));

        expect(text).to.equal('Together we write our story...');

        //await driver.quit(); // Always ensure you close the driver
    });
});


