import { ResultPage } from "../../base/result/result.page"
import { IOSResultCard } from "./resultCard.Item"
import { IOSResultHeader } from "./resultHeader.Item"

export class IOSResultPage extends ResultPage {
	resultHeaderInit = IOSResultHeader
	resultCardInit = IOSResultCard
	resultCardLC: string
	resultHeaderLC: string
}
