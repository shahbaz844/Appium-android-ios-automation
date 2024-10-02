
import { NotFoundError } from "../../utils/exceptions"
import { SmartyPage } from "../base/smarty.page"
import { WebCalendar } from './calendar.page';

export class WebSmarty extends SmartyPage {
	calendarInit = WebCalendar
	departureDateLC: string
	originDateLC: string

    originLC = '[placeholder="From?"]'
    destinationLC = '[placeholder="To?"]'

	airportCodeLC = '[role=option] [class*=airportCode]'
	calendarIconLC = 'span[class*=date]'
	
	searchLC = '[class*=submit]'

    originTagClearButton = "[class*=item-close]"

	public findSearchResults(elements: WebdriverIO.Element[], flight_code: string): WebdriverIO.Element {

		const match: WebdriverIO.Element | undefined = elements.find(async (el) => (await el.getText()).endsWith(flight_code))

		if (!match) throw new NotFoundError(`Failed to find ${flight_code} Airport Code in Smarty Search Results`)

		return match

	}

    public async setOrigin(flight_code: string) {
        await $(this.originTagClearButton).click()
        await this.origin.waitForClickable()
		await this.origin.setValue(flight_code)
		const searchResults: WebdriverIO.Element[] = await this.search_results(3)
		const elem = this.findSearchResults(searchResults, flight_code)
		await elem.click()
	}

    public async setDestination(flight_code: string) {
        await $('[class*=destination]').click()
		await this.destination.click()
		await this.destination.setValue(flight_code)
		const searchResults: WebdriverIO.Element[] = await this.search_results(3)
		const elem = this.findSearchResults(searchResults, flight_code)
		await elem.click()
	}
}
