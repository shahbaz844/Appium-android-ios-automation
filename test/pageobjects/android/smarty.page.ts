import { byID } from "../../utils/envConfigs"
import { NotFoundError } from "../../utils/exceptions"
import { Calendar } from "../base/calendar/calendar.page"
import { getCalendar } from "./calendar/CalendarFactory"
import { SmartyPage } from "../base/smarty.page"

export class AndroidSmartyPage extends SmartyPage {
	calendarInit: new () => Calendar = getCalendar()

	calendarIconLC: string = byID("calendarIcon")
	departureDateLC: string = byID("departureDate")
	originDateLC: string = byID("returnDate")
	originLC: string = byID("origin")
	destinationLC: string = byID("destination")
	airportCodeLC: string = byID("smarty_airport_code")
	searchLC: string = byID("transitionTarget")

	findSearchResults(elements: WebdriverIO.Element[], flight_code: string): WebdriverIO.Element {
		const match: WebdriverIO.Element | undefined = elements.find(async (el) => (await el.getText()) == flight_code)

		if (!match) throw new NotFoundError(`Failed to find ${flight_code} Airport Code in Smarty Search Results`)

		return match
	}
}
