import { WebDriver } from 'selenium-webdriver';
import {LoginTestPage} from './LoginTestPage'; // Adjust the path as necessary

describe('Login Test', function () {
    let driver: WebDriver;
    let loginPage: LoginTestPage;
    const URL: string = process.env.URL || 'http://localhost:3000/loginForm';

    before(async function () {
        loginPage = await LoginTestPage.initialize();
        driver = loginPage['driver']; // Access the driver instance
    });

    after(async function () {
        await LoginTestPage.closeDriver(driver);
    });

    it('Should login successfully via admin', async function () {
        await loginPage.testLoginSuccess(URL, 'admin', 'admin', 'Home Page');
    });

    it('Should login successfully via user', async function () {
        await loginPage.testLoginSuccess(URL, 'user', 'user', 'Home Page');
    });

    it('Login should fail successfully', async function () {
        await loginPage.testLoginFailure(URL, 'abcdefghijklmnopqurstuvwxyz', 'abcdefghijklmnopqurstuvwxyz', 'Username or Password Incorrect');
        console.log("Added characters should fail");

        await loginPage.testLoginFailure(URL, '123456789', '123456789', 'Username or Password Incorrect');
        console.log("Added numbers should fail");

        await loginPage.testLoginFailure(URL, '!@@£$%^&*()', '!@£$%^&*()', 'Username or Password Incorrect');
        console.log("Added symbols should fail");
    });
    
    // it('user should log out successfully', async function () {
    //     const url: string = process.env.UI_TEST_URL || 'http://localhost:3000/loginForm';
    //     await loginPage.testLogoutSuccess(url, 'admin', 'admin', 'Together we write our story...');
    // });
});
