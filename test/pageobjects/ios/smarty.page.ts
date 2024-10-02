
import { byClassChain } from "../../utils/envConfigs"
import { NotFoundError } from "../../utils/exceptions"
import { SmartyPage } from "../base/smarty.page"
import { IOSCalendar } from './calendar.page';

export class IOSSmartyPage extends SmartyPage {
	calendarInit = IOSCalendar
	departureDateLC: string
	originDateLC: string

	airportCodeLC: string = byClassChain('**/XCUIElementTypeCell[`name BEGINSWITH "SmartyResultAirportCode"`]')
	calendarIconLC: string = byClassChain('**/XCUIElementTypeImage[`name == "Utilities/calendar"`]')
	originLC: string = byClassChain('**/XCUIElementTypeButton[`name BEGINSWITH "FDSearchOrigin"`]')
	destinationLC: string = byClassChain('**/XCUIElementTypeButton[`name BEGINSWITH "FDSearchDestination"`]')
	searchLC: string = byClassChain('**/XCUIElementTypeButton[`name == "FDFlightSearchButton"`]')

	public findSearchResults(elements: WebdriverIO.Element[], flight_code: string): WebdriverIO.Element {

		const match: WebdriverIO.Element | undefined = elements.find(async (el) => (await el.getAttribute("name")).endsWith(flight_code))

		if (!match) throw new NotFoundError(`Failed to find ${flight_code} Airport Code in Smarty Search Results`)

		return match

	}
}
