import { Builder, Capabilities, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import { LoginTestPage } from './LoginTestPage';
import * as chrome from 'selenium-webdriver/chrome';

describe('Login Test', function () {
    let driver: WebDriver;
    let loginPage: LoginTestPage;

    before(async function () {
        loginPage = await LoginTestPage.initialize();
        driver = loginPage['driver']; // Access the driver instance
    });

    after(async function () {
        await LoginTestPage.closeDriver(driver);
    });

    it('Should login successfully', async function () {
        const url: string = process.env.UI_TEST_URL || 'http://localhost:3000/loginForm';
        await loginPage.open(url);  

        await loginPage.enterUsername('admin'); 
        await loginPage.enterPassword('admin');  
        await loginPage.clickLogin();  

        const actualText = await loginPage.getLoggedToHomepageSuccessfully();  
        expect(actualText).to.equal('Home Page');  
    });
  
    it('Should login successfully with different details', async function () {
        const url: string = process.env.UI_TEST_URL || 'http://localhost:3000/loginForm';
        await loginPage.open(url); 

        await loginPage.enterUsername('user');  
        await loginPage.enterPassword('user');  
        await loginPage.clickLogin(); 

        const actualText = await loginPage.getLoggedToHomepageSuccessfully();  
        expect(actualText).to.equal('Home Page');  
    });

    it('Login should fail', async function () {
        const url: string = process.env.UI_TEST_URL || 'http://localhost:3000/loginForm';
        await loginPage.open(url);  

        await loginPage.enterInvalidUsername('abcdefghijklmnopqurstuvwxyz');
        await loginPage.enterInvalidPassword('abcdefghijklmnopqurstuvwxyz');
        await loginPage.clickLogin();
        const errormessage1 = await loginPage.getErrorMessageText();
        expect(errormessage1).to.equal('Username or Password Incorrect');
        console.log("Added characters should fail");

        await loginPage.enterInvalidUsername('123456789');
        await loginPage.enterInvalidPassword('123456789');
        await loginPage.clickLogin();
        console.log("Added numbers should fail");
        const errormessage2 = await loginPage.getErrorMessageText();
        expect(errormessage2).to.equal('Username or Password Incorrect');

        await loginPage.enterInvalidUsername('!@@£$%^&*()');
        await loginPage.enterInvalidPassword('!@£$%^&*()');
        await loginPage.clickLogin();
        console.log("Added symbols should fail");
        const errormessage3 = await loginPage.getErrorMessageText();
        expect(errormessage3).to.equal('Username or Password Incorrect');
    });
    // it('user should log out successfully', async function () {
    //     const url: string = process.env.UI_TEST_URL || 'http://localhost:3000/loginForm';
    //     await loginPage.open(url);

    //     await loginPage.enterUsername('admin');  // Enter valid username
    //     await loginPage.enterPassword('admin');  // Enter valid password
    //     await loginPage.clickLogin();  // Click the login button

    //     const actualText = await loginPage.getLoggedOutSuccessfully();  // Get the success message
    //     expect(actualText).to.equal('Together we write our story...');  // Verify the success message
        
        
    // });

});


