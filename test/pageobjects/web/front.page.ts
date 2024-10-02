import { brand } from "../../utils/envConfigs"
import { FrontPage, TabType } from "../base/front.page"
import { WebSmarty } from "./smarty.page"
import * as fs from "fs"
import { EnvironmentalError } from "../../utils/exceptions"
import { Brand } from "../../utils/enums"

/*
 Page containing specific selectors and methods for a Front Page
 */

export class WebFrontPage extends FrontPage {
	smartyInit = WebSmarty
	protected Tabs: Record<TabType, string> = {
		[TabType.FLIGHTS]: '[aria-label="Flights icon"]',
		[TabType.STAYS]: "",
		[TabType.CARS]: "",
		[TabType.PACKAGES]: "",
	}

	searchBarLC = '.form-container'
	acceptGDPRLC = ''

	public async waitForFrontDoor() {
        try {
            const urls = JSON.parse(fs.readFileSync('strings/urls.json').toString("utf-8")) as Record<Brand, string>
            await browser.url(urls[brand]);
        } catch (err) {
            throw new EnvironmentalError((err as Error).message)
        }
	}

    public async openSmarty(): Promise<WebSmarty> {
        await $(this.searchBarLC).waitForDisplayed()
		return new this.smartyInit()
	}
}
