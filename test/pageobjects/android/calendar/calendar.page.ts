import { byID, byUiAutomator, locale } from "../../../utils/envConfigs"
import { Calendar } from '../../base/calendar/calendar.page';

export class AndroidCalendar extends Calendar {

	applyLC: string = byID("doneTextView")

	public findDate(date: Date) {
		const month_name: string = date.toLocaleString("en-US", { month: "long" }).toUpperCase()
		const day: number = date.getDate()
		return $(byUiAutomator(`new UiSelector().descriptionMatches("${day} ${month_name}.*")`))
	}
}
