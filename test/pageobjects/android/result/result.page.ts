import { byID } from "../../../utils/envConfigs"
import { ResultPage } from "../../base/result/result.page"
import { AndroidResultCard } from "./ResultCard.Item"
import { AndroidResultHeader } from "./resultHeader.Item"

export class AndroidResultPage extends ResultPage {
	resultHeaderInit = AndroidResultHeader
	resultCardInit = AndroidResultCard
	resultCardLC: string = byID("cardView")
	resultHeaderLC: string = byID("toolbar")
}
