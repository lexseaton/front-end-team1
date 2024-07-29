// src/tests/ui/LoginTest.ts
import { Builder, Capabilities, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import { LoginTestPage } from './LoginTestPage';
import * as chrome from 'selenium-webdriver/chrome';

describe('Login Test', function () {
    let driver: WebDriver;
    let loginPage: LoginTestPage;

    // Before running the tests, initialize the WebDriver and LoginTestPage instance
    before(async function () {
        driver = new Builder()
            .forBrowser('chrome')  // Specify the browser to use
            .setChromeOptions(new chrome.Options())  // Set Chrome options if needed
            .build();  // Create the WebDriver instance

        loginPage = new LoginTestPage(driver);  // Initialize the page object
    });

    // After running the tests, quit the WebDriver instance to free resources
    after(async function () {
        try {
            await driver.quit();  // Ensure that WebDriver quits correctly
        } catch (error) {
            console.error('Error quitting the driver:', error);  // Log any errors that occur during quit
        }
    });

    // Test case: Verify that the user can successfully log in with valid credentials
    it('Should login successfully', async function () {
        const url: string = process.env.UI_TEST_URL || 'http://localhost:3000/loginForm';
        await loginPage.open(url);  // Open the login page

        await loginPage.enterUsername('admin');  // Enter valid username
        await loginPage.enterPassword('admin');  // Enter valid password
        await loginPage.clickLogin();  // Click the login button

        const actualText = await loginPage.getSuccessMessageText();  // Get the success message
        expect(actualText).to.equal('Belfast');  // Verify the success message
    });
    // Test case: Verify that the user can successfully log in with valid credentials
    it('Should login successfully with different details', async function () {
        const url: string = process.env.UI_TEST_URL || 'http://localhost:3000/loginForm';
        await loginPage.open(url);  // Open the login page

        await loginPage.enterUsername('user');  // Enter valid username
        await loginPage.enterPassword('user');  // Enter valid password
        await loginPage.clickLogin();  // Click the login button

        const actualText = await loginPage.getSuccessMessageText();  // Get the success message
        expect(actualText).to.equal('Belfast');  // Verify the success message
    });

    // Test case: Verify that login fails with various types of invalid credentials
    it('Login should fail', async function () {
        const url: string = process.env.UI_TEST_URL || 'http://localhost:3000/loginForm';
        await loginPage.open(url);  // Open the login page

        // Test with invalid username and password containing characters
        await loginPage.enterInvalidUsername('abcdefghijklmnopqurstuvwxyz');
        await loginPage.enterInvalidPassword('abcdefghijklmnopqurstuvwxyz');
        await loginPage.clickLogin();
        const errormessage1 = await loginPage.getErrorMessageText();
        expect(errormessage1).to.equal('Username or Password Incorrect');
        console.log("Added characters should fail");

        // Test with invalid username and password containing numbers
        await loginPage.enterInvalidUsername('123456789');
        await loginPage.enterInvalidPassword('123456789');
        await loginPage.clickLogin();
        console.log("Added numbers should fail");
        const errormessage2 = await loginPage.getErrorMessageText();
        expect(errormessage2).to.equal('Username or Password Incorrect');

        // Test with invalid username and password containing symbols
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

    //     const actualText = await loginPage.getSuccessMessageText();  // Get the success message
    //     expect(actualText).to.equal('Together we write our story...');  // Verify the success message

    //     await getHomepage.clicklogout();// Click the login button

        
    // })
});


