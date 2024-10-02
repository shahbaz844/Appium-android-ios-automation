import { TestError } from "../../../utils/exceptions"
import { Base } from "../base.page"

export abstract class Calendar extends Base {

	abstract applyLC: string

	abstract findDate(date: Date): ReturnType<WebdriverIO.Browser["$"]>

	public get apply(): ReturnType<WebdriverIO.Browser["$"]> {
		return $(this.applyLC)
	}

	public async selectDate(startDate: Date, endDate: Date) {
		const date_now: Date = new Date()
		if (startDate < date_now)
			throw new TestError(`Start Date: ${startDate.toString()} is smaller than Today's Date: ${date_now.toString()}`)
		else if (endDate <= startDate)
			throw new TestError(`End Date: ${endDate.toString()} is not greater than start Date: ${startDate.toString()}`)

		await this.findDate(startDate).click()
		await this.findDate(endDate).click()

		await this.apply.click()
	}
}
