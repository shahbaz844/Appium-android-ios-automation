import { byID } from "../../../utils/envConfigs"
import { ResultHeader } from "../../base/result/resultHeader.Item"

export class AndroidResultHeader extends ResultHeader {
	stopsLC: string = byID("customTitle")
	datesLC: string = byID("dateSubtitle")
	travellersLC: string = byID("travelerCount")
}
