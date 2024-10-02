import { Activity, activities } from "./constants"
import { brand } from "./envConfigs"

export async function waitForActivity(activity: Activity, duration = 10000) {
	await browser.waitUntil(async () => (await browser.getCurrentActivity()) == activities[activity][brand], {
		timeout: duration,
		timeoutMsg: `Timed Out after waiting ${duration} ms for '${activities[activity][brand]}'`,
	})
}
