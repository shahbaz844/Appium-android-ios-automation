
import { TestError } from "../../utils/exceptions";
import { Calendar } from "../base/calendar/calendar.page"

export class WebCalendar extends Calendar {
	applyLC = '[class*=calendarWrapper]'

	public findDate(date: Date) {
		const day: number = date.getDate()
		const month: string = date.toLocaleString('default', { month: 'long' });
		const year: number = date.getFullYear()
		return $(`[aria-label*='${month} ${day}, ${year}']`)
	}

    public async selectDate(startDate: Date, endDate: Date) {
		const date_now: Date = new Date()
		if (startDate < date_now)
			throw new TestError(`Start Date: ${startDate.toString()} is smaller than Today's Date: ${date_now.toString()}`)
		else if (endDate <= startDate)
			throw new TestError(`End Date: ${endDate.toString()} is not greater than start Date: ${startDate.toString()}`)

		await this.findDate(startDate).click()
		await this.findDate(endDate).click()
	}
}
