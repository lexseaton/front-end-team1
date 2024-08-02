import { LoginTestPage } from './LoginTestPage';
import { driverBuilder } from './driverBuilder';

describe('Login Test', function () {
    let loginPage: LoginTestPage;

    before(async function () {
        loginPage = await LoginTestPage.initialize();
    });

    after(async function () {
        await driverBuilder.driverAfter();
    });

    it('Should login and logout successfully via admin', async function () {
        await loginPage.testLoginLogoutFailPass('admin', 'admin', 'Home Page', 'success');
        await loginPage.testLoginLogoutFailPass('admin', 'admin', 'Login Page', 'logout');
    });

    it('Should login and logout successfully via user', async function () {
        await loginPage.testLoginLogoutFailPass('user', 'user', 'Home Page', 'success');
        await loginPage.testLoginLogoutFailPass('user', 'user', 'Login Page', 'logout');
    });

    it('Login should fail successfully with various credentials', async function () {
        await loginPage.testLoginLogoutFailPass('abcdefghijklmnopqurstuvwxyz', 'abcdefghijklmnopqurstuvwxyz', 'Username or Password Incorrect', 'failure');
        console.log("Login with 'characters' should fail");

        await loginPage.testLoginLogoutFailPass('123456789', '123456789', 'Username or Password Incorrect', 'failure');
        console.log("Login with 'numbers' should fail");

        await loginPage.testLoginLogoutFailPass('!@@£$%^&*()', '!@@£$%^&*()', 'Username or Password Incorrect', 'failure');
        console.log("Login with 'special characters' should fail");
    });
});
