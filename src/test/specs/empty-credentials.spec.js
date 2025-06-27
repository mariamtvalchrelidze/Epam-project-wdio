import LoginPage from './../../po/pages/login.page.js';
import ScreenshotUtil from './../../utils/screenshot.util.js';
import Messages from '../../data/messages.js';

const messages = Messages.messages;


let loginPage;
let screenshotUtil

describe("UC-1: Empty Credentials", () => {

    before(async () => {
        loginPage = new LoginPage("");
        await loginPage.open();

        screenshotUtil = new ScreenshotUtil(browser);
        await screenshotUtil.createSessionFolder('empty-credentials');
    });

    it("Should test Login form with empty credential", async () => {
        await loginPage.setCredentials({ username: 'Test', password: 'Test' });
        await loginPage.clearInputs();
        await screenshotUtil.takeScreenShot('empty-credentials-before-login');
        await loginPage.clickLoginButton();
        await screenshotUtil.takeScreenShot('empty-password-after-login');
        const errorText = await loginPage.errorButton.text;
        await expect(errorText).toContain(messages.username_required);
    });
})