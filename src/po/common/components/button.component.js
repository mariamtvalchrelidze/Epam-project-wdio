class BaseButton {
    constructor(rootSelector){
        this.rootSelector = rootSelector;
    }

    get rootEl() {
        return $(this.rootSelector);
    }

    get text() {
        return this.rootEl.getText();
    }

    click() {
        this.rootEl.click();
    }
}

export default BaseButton;