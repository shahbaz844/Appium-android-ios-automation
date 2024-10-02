export class Item {

    item: WebdriverIO.Element
    constructor(elem: WebdriverIO.Element) {
        this.item = elem
    }

    public $(locator: string) {
        return this.item.$(locator)
    }

    public $$(locator: string) {
        return this.item.$$(locator)
    }
}