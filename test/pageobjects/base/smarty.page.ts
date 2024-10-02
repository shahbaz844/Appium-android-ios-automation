import { Base } from "./base.page"
import { Calendar } from "./calendar/calendar.page"

export abstract class SmartyPage extends Base {

	abstract calendarIconLC: string

	abstract departureDateLC: string

	abstract originDateLC: string

	abstract originLC: string

	abstract destinationLC: string

	abstract airportCodeLC: string

	abstract searchLC: string

	abstract calendarInit: new() => Calendar
 
	public async openCalendar(): Promise<Calendar> {
		await $(this.calendarIconLC).click()
		return new this.calendarInit()
	}

	public get departureDate(): ReturnType<WebdriverIO.Browser["$"]> {
		return $(this.departureDateLC)
	}

	public get originDate(): ReturnType<WebdriverIO.Browser["$"]> {
		return $(this.originDateLC)
	}

	public get origin(): ReturnType<WebdriverIO.Browser["$"]> {
		return $(this.originLC)
	}

	public get destination(): ReturnType<WebdriverIO.Browser["$"]> {
		return $(this.destinationLC)
	}

	public search_results(atleast = 5): Promise<WebdriverIO.Element[]> {

		return browser.waitUntil(
			async () => {
				const elems = await $$(this.airportCodeLC)
				return elems.length < atleast ? false : (elems as unknown as true)
			},
			{ timeoutMsg: `Unable to find atleast ${atleast} search results` }
		) as unknown as Promise<WebdriverIO.Element[]>
	}

	abstract findSearchResults(elements: WebdriverIO.Element[], flight_code: string): WebdriverIO.Element

	public async setOrigin(flight_code: string) {
		await this.origin.click()
		await this.origin.setValue(flight_code)
		const searchResults: WebdriverIO.Element[] = await this.search_results(3)
		const elem = this.findSearchResults(searchResults, flight_code)
		await elem.click()
	}

	public async setDestination(flight_code: string) {
		await this.destination.click()
		await this.destination.setValue(flight_code)
		const searchResults: WebdriverIO.Element[] = await this.search_results(3)
		const elem = this.findSearchResults(searchResults, flight_code)
		await elem.click()
	}

	public get search(): ReturnType<WebdriverIO.Browser["$"]> {
		return $(this.searchLC)
	}
}
