
import { byClassChain } from "../../utils/envConfigs"
import { Calendar } from "../base/calendar/calendar.page"

export class IOSCalendar extends Calendar {
	applyLC: string = byClassChain('**/XCUIElementTypeButton[`name == "CalendarApply"`]')


	public findDate(date: Date) {
		const day: number = date.getDate()
		const month: string = date.toLocaleString("en-US", { month: "long" })
		const year: number = date.getFullYear()
		// return $(byClassChain(`**/XCUIElementTypeStaticText[\`label ENDSWITH "${month} ${day}, ${year}"\`]`))
		return $(byClassChain(`**/XCUIElementTypeStaticText[\`label ENDSWITH "${month} ${day}, ${year}" OR label ENDSWITH " ${day} ${month} ${year}"\`]`))
	}
}
