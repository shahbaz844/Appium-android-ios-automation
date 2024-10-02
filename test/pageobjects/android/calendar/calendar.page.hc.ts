import { byUiAutomator } from "../../../utils/envConfigs"
import { AndroidCalendar } from './calendar.page';

export class AndroidCalendarHC extends AndroidCalendar {

	public findDate(date: Date) {
		const day: number = date.getDate()
		const month = date.toLocaleString("en-US", { month: "long" }).toUpperCase()
		return $(byUiAutomator(`new UiSelector().descriptionMatches("(?:${month} ${day}|${day} ${month})[^0-9]*")`))
	}
}
