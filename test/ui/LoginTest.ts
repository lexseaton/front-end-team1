import {LoginTestPage} from './LoginTestPage'; 
import { driverBuilder } from './driverBuilder';

describe('Login Test', function () {
    let loginPage: LoginTestPage;

    before(async function () {
        loginPage = await LoginTestPage.initialize();
    });

    after(async function () {
        await driverBuilder.driverAfter();
    });

    it('Should login successfully via admin', async function () {
        await loginPage.testLoginSuccess('admin', 'admin', 'Home Page');
    });

    it('Should login successfully via user', async function () {
        await loginPage.testLoginSuccess('user', 'user', 'Home Page');
    });

    it('Login should fail successfully', async function () {
        await loginPage.testLoginFailure('abcdefghijklmnopqurstuvwxyz', 'abcdefghijklmnopqurstuvwxyz', 'Username or Password Incorrect');
        console.log("Added characters should fail");

        await loginPage.testLoginFailure('123456789', '123456789', 'Username or Password Incorrect');
        console.log("Added numbers should fail");

        await loginPage.testLoginFailure('!@@£$%^&*()', '!@£$%^&*()', 'Username or Password Incorrect');
        console.log("Added symbols should fail");
    });
    
    it('Should logout successfully via admin', async function () {
        await loginPage.testLogoutSuccess('admin', 'admin', 'Login Page');
    });

    it('Should logout successfully via user', async function () {
        await loginPage.testLogoutSuccess('user', 'user', 'Login Page');
    });
});
