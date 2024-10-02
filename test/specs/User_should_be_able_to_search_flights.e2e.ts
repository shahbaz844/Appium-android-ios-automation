
import { addToDate } from "../utils/envConfigs"
import { getFrontDoor } from '../pageobjects/base/frontDoorFactory';
import { TabType } from "../pageobjects/base/front.page";


describe("Search a Flight", () => {
	it("Search LON-BOS Today+31 - Today+33", async () => {
		
		const frontDoor = getFrontDoor()
		await frontDoor.waitForFrontDoor()
		await frontDoor.verticalTab(TabType.FLIGHTS).click()
		const smarty = await frontDoor.openSmarty()

		await smarty.setOrigin("LON")
		await smarty.setDestination("BOS")

		const calendar = await smarty.openCalendar()
		await calendar.selectDate(addToDate(31), addToDate(33))
		await smarty.search.click()

	})
})
