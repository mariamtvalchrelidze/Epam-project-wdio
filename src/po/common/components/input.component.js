class BaseInput {
    constructor(rootSelector){
        this.rootSelector = rootSelector;
    }

    get rootEl() {
        return $(this.rootSelector);
    }

    get value() {
        return this.rootEl.getValue();
    }

    set value(value) {
        this.rootEl.setValue(value);
    }

    async setValue(value) {
        await this.rootEl.setValue(value);
    }

    async clearValue() {
        const element = await this.rootEl;
        await element.click();
        await browser.keys(['Control', 'a', 'Backspace']);
    }
}

export default BaseInput;