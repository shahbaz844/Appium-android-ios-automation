import { OS } from "../../utils/enums"
import { platform } from "../../utils/envConfigs"
import { AndroidFrontPage } from "../android/front.page"
import { IOSFrontPage } from "../ios/front.page"
import { WebFrontPage } from "../web/front.page"
import { FrontPage } from "./front.page"

export function getFrontDoor(): FrontPage {
	switch (platform) {
		case OS.ANDROID:
			return new AndroidFrontPage()
		case OS.IOS:
			return new IOSFrontPage()
		case OS.WEB:
			return new WebFrontPage()
	}
}
