import { Item } from '../Item';
export abstract class ResultCard extends Item {

    abstract priceLC: string
    abstract familyBadgeLC: string
    abstract saveBadgeLC: string
    abstract airlineLC: string
    abstract flexBoxLC: string


    public async getPrice(): Promise<WebdriverIO.Element> {
        return await this.$(this.priceLC)
    }

    public async getFamily(): Promise<WebdriverIO.Element> {
        return await this.$(this.familyBadgeLC)
    }

    public async getBadge(): Promise<WebdriverIO.Element> {
        return await this.$(this.saveBadgeLC)
    }

    public async getAirline(): Promise<WebdriverIO.Element> {
        return await this.$(this.airlineLC)
    }

    public async getflexBox(): Promise<WebdriverIO.Element> {
        const flexBox = await this.$(this.flexBoxLC)
        return await flexBox.$('android.widget.TextView')
    }

}