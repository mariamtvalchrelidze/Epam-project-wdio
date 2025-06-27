import LoginPage from './../../po/pages/login.page.js';
import credentialsData from './../../data/credentials.js';
import ScreenshotUtil from './../../utils/screenshot.util.js';
import Messages from '../../data/messages.js';



const { credentials, password } = credentialsData;
const messages = Messages.messages;

let loginPage;
let screenshotUtil


describe("expected Credentials", () => {

    before(async () => {
        loginPage = new LoginPage("");
        await loginPage.open();
        screenshotUtil = new ScreenshotUtil(browser);
        await screenshotUtil.createSessionFolder('credentials');
    });

    it("should test Login form with expected credential", async () => {
        for (const credential of credentials) {
            await loginPage.open();

            await loginPage.setCredentials({
                username: credential.username,
                password
            });

            await loginPage.clickLoginButton();

            await screenshotUtil.takeScreenShot(`${credential.username}-before-login`);
            if (credential.success) {
                await browser.waitUntil(
                    async () => (await browser.getUrl()).includes('/inventory.html')
                );

                await screenshotUtil.takeScreenShot(`${credential.username}-success-login`);
                await expect(browser).toHaveTitle('Swag Labs');

            } else {
                const errorText = await loginPage.errorButton.text
                await screenshotUtil.takeScreenShot(`${credential.username}-error-login`);
                await expect(errorText).toContain(messages.locked_out);
            }
        }
    });
})