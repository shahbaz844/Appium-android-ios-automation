import { Base } from "./base.page"
import { GDPR_LOCALES } from "../../utils/constants"
import { locale } from "../../utils/envConfigs"
import { SmartyPage } from "./smarty.page"

/*
 Page containing specific selectors and methods for a Front Page
 */

export enum TabType {
	FLIGHTS,
	STAYS,
	CARS,
	PACKAGES,
}

export abstract class FrontPage extends Base {
	protected abstract Tabs: Record<TabType, string>

	abstract searchBarLC: string

	abstract acceptGDPRLC: string

	abstract smartyInit: new () => SmartyPage

	public verticalTab(tab_type: TabType): ReturnType<WebdriverIO.Browser["$"]> {
		return $(this.Tabs[tab_type])
	}

	public async openSmarty(): Promise<SmartyPage> {
		await $(this.searchBarLC).click()
		return new this.smartyInit()
	}

	public async acceptGDPR() {
		if (GDPR_LOCALES.includes(locale))
		{
			const gdprConsentButton = $(this.acceptGDPRLC)
			if (await gdprConsentButton.isExisting())
				await gdprConsentButton.click()
		} 
	}

	abstract waitForFrontDoor(): Promise<void>
}
