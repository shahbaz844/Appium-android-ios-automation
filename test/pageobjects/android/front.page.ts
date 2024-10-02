import { byAccessibility, byID, localizedStrings } from "../../utils/envConfigs"
import { Activity } from "../../utils/constants"
import { FrontPage, TabType } from "../base/front.page"
import { waitForActivity } from "../../utils/wdioUtils"
import { AndroidSmartyPage } from "./smarty.page"

export class AndroidFrontPage extends FrontPage {
	smartyInit = AndroidSmartyPage
	protected Tabs: Record<TabType, string> = {
		[TabType.FLIGHTS]: byAccessibility(localizedStrings.FlightsTab),
		[TabType.STAYS]: byAccessibility(localizedStrings.StaysTab),
		[TabType.CARS]: byAccessibility(localizedStrings.CarsTab),
		[TabType.PACKAGES]: "",
	}

	searchBarLC: string = byID("searchField")

	acceptGDPRLC: string = byID("okButton")
	skipLoginLC: string = byID("skip")

	public async waitForFrontDoor() {
		await this.acceptGDPR()
		if (await $(this.skipLoginLC).isExisting())
			await $(this.skipLoginLC).click()
		await waitForActivity(Activity.FRONT_DOOR)
	}
}
