import { Brand } from "../../../utils/enums"
import { brand } from "../../../utils/envConfigs"
import { AndroidCalendarHC } from "./calendar.page.hc"
import { AndroidCalendar } from "./calendar.page"

export function getCalendar(): new() => AndroidCalendar {

    switch (brand) {
        case Brand.HC:
            return AndroidCalendarHC
        default:
            return AndroidCalendar
    }
}
