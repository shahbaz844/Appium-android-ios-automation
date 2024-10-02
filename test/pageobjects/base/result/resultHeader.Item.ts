import { NotFoundError } from '../../../utils/exceptions';
import { Parser } from '../../../utils/TextParser'
import { Item } from '../Item';

export abstract class ResultHeader extends Item {

	abstract stopsLC: string

	abstract datesLC: string

	abstract travellersLC: string

    public async getAirportCodes(): Promise<Record<string, string>> {
		const stopsString: string = await this.$(this.stopsLC).getText()
		const stops: Record<string, string> | null = new Parser()
		.addFormat('{TLW-departureCode} - {TLW-arrivalCode}')
        .parse(stopsString)
		if (!stops) throw new NotFoundError(`Unable to Find departureCode and ArrivalCode in Header: ${stopsString}`)
		return {departureCode: stops.departureCode, arrivalCode: stops.arrivalCode}
	}

	public async getDates(): Promise<Record<string, Date>> {
		const datesString: string = await this.$(this.datesLC).getText()

		const dates: Record<string, string> | null = new Parser()
        .addFormat('{MON-departureMonth} {DAY-departureDay} - {DAY-arrivalDay}')
		.addFormat('{MON-departureMonth} {DAY-departureDay} - {MON-arrivalMonth} {DAY-arrivalDay}')
        .parse(datesString)
		if (!dates) throw new NotFoundError(`Unable to find Departure and arrival Date in Header: ${datesString}`)

		if (typeof dates.arrivalMonth == "undefined") dates.arrivalMonth = dates.departureMonth

		const currentYear: number = new Date().getFullYear()
		const departureDate: Date = new Date(currentYear,parseInt(dates.departureMonth) - 1 , parseInt(dates.departureDay))
		const arrivalDate: Date = new Date(currentYear,parseInt(dates.arrivalMonth) - 1 , parseInt(dates.arrivalDay))

		return {departureDate: departureDate, arrivalDate: arrivalDate}
	}

	public async getTravellers(): Promise<number> {
        const travellerString: string = await this.$(this.travellersLC).getText()
        return parseInt(travellerString)
    }
}