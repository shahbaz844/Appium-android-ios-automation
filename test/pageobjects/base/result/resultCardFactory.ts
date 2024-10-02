import { OS } from "../../../utils/enums"
import { brand, platform } from "../../../utils/envConfigs"
import { ResultCard } from "./resultCard.Item"
import { AndroidResultCard } from "../../android/result/ResultCard.Item"
import { IOSResultCard } from "../../ios/results/resultCard.Item"

export function getResultCard(element: WebdriverIO.Element): ResultCard {
	switch (platform) {
		case OS.ANDROID:
			switch (brand) {
				default:
					return new AndroidResultCard(element)
			}

		case OS.IOS:
			switch (brand) {
				default:
					return new IOSResultCard(element)
			}
	}
}
