import BasePage from "../common/base.page.js";
import ErrorButton from "../components/error-button.component.js";
import LoginButton from "../components/login-button.component.js";
import InputComponent from "../components/input.component.js";
import logger from '@wdio/logger';

const log = logger('LoginPage');


class LoginPage extends BasePage {
    constructor(path){
        super(path);
        this.usernameInput = new InputComponent('//input[@id="user-name"]');
        this.passwordInput = new InputComponent('//input[@id="password"]');
        this.loginButton = new LoginButton('//input[@id="login-button"]');
        this.errorButton = new ErrorButton('//div[contains(@class, "error-message-container")]');
    }

    

    async clearUsernameInput() {
        log.info('Clearing username input');
        await this.usernameInput.clearValue();
    }

    async clearPasswordInput() {
        log.info('Clearing password input');
        await this.passwordInput.clearValue();
    }

    async clearInputs(){
        log.info('Clearing all inputs');
        
        await this.usernameInput.clearValue();
        await this.passwordInput.clearValue();
        
        await browser.pause(300);
    }


    async setCredentials(credentials){
        log.info('Setting credentials: ', credentials.username, credentials.password);
        // set credentials in parallel
        await this.usernameInput.setValue(credentials.username)
        await this.passwordInput.setValue(credentials.password)
    }

    async clickLoginButton() {
        log.info('Clicking login button');
        await this.loginButton.click();
    }

    async getErrorText() {
        log.info('Getting error text');
        return await this.errorButton.text;
    }

    async open() {
        await super.open();
    }



}

export default LoginPage;