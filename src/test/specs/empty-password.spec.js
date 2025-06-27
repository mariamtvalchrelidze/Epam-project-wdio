import LoginPage from './../../po/pages/login.page.js';
import ScreenshotUtil from './../../utils/screenshot.util.js';
import Messages from '../../data/messages.js';


let loginPage;
let screenshotUtil;
const messages = Messages.messages;
describe("UC-2: Empty Password", () => {

    before(async() => {
        loginPage = new LoginPage("");
        await loginPage.open();

        screenshotUtil = new ScreenshotUtil(browser);
        await screenshotUtil.createSessionFolder('empty-password');

    });

    it("Should test Login form with empty password", async () => {
        const loginPage = new LoginPage();
        await loginPage.setCredentials({ username: 'Test', password: 'Test' });
        await loginPage.clearPasswordInput();
        await screenshotUtil.takeScreenShot('empty-password-before-login');
        await loginPage.clickLoginButton();
        const errorText = await loginPage.errorButton.text;
        await screenshotUtil.takeScreenShot('empty-password-after-login');
        await expect(errorText).toContain(messages.password_required);
    });
})