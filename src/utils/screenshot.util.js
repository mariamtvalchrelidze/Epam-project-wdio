import fs from 'fs';
import path from 'path';

export class ScreenshotUtil {
    constructor(browser) {
        this.browser = browser;
    }
    
    async createSessionFolder(name) {
        const sessionName = `${name}-${Date.now()}`;
        const sessionFolder = `src/screenshots/${sessionName}`;
        fs.mkdirSync(sessionFolder);
        this.sessionFolder = sessionFolder;
    }

    async takeScreenShot(name) {
        await this.browser.saveScreenshot(`${this.sessionFolder}/${name}.png`);
    }
}

export default ScreenshotUtil;