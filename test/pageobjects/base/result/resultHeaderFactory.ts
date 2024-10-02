import { OS } from "../../../utils/enums"
import { brand, platform } from "../../../utils/envConfigs"
import { ResultHeader } from "./resultHeader.Item"
import { AndroidResultHeader } from "../../android/result/resultHeader.Item"
import { IOSResultHeader } from "../../ios/results/resultHeader.Item"

export function getResultHeader(element: WebdriverIO.Element): ResultHeader {
	switch (platform) {
		case OS.ANDROID:
			switch (brand) {
				default:
					return new AndroidResultHeader(element)
			}

		case OS.IOS:
			switch (brand) {
				default:
					return new IOSResultHeader(element)
			}
	}
}
