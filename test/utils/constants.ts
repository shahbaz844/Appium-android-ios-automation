import { Brand, Locale, OS } from "./enums"

export const GDPR_LOCALES = [
	Locale.da_DK,
	Locale.ko_KR,
	Locale.de_DE,
	Locale.fr_FR,
	Locale.de_AT,
	Locale.es_ES,
	Locale.en_GB,
	Locale.zh_CN,
	Locale.it_IT,
	Locale.sv_SE,
]

export enum Activity {
	FRONT_DOOR,
	SPLASH
}

export const appPackages: Record<OS,Record<Brand, string>> = {
	[OS.ANDROID]: {
		[Brand.KK]: "com.kayak.android",
		[Brand.MM]: "com.momondo.flightsearch",
		[Brand.HC]: "com.hotelscombined.mobile",
		[Brand.SW]: "",
		[Brand.CX]: "",
		[Brand.CF]: "",
		[Brand.MU]: ""
	},
	[OS.IOS]: {
		[Brand.KK]: "com.kayak.travel",
		[Brand.MM]: "com.momondo.search",
		[Brand.HC]: "com.hotelscombined.findhotels",
		[Brand.SW]: "",
		[Brand.CX]: "",
		[Brand.CF]: "",
		[Brand.MU]: ""
	},
	[OS.WEB]: {
		[Brand.KK]: "",
		[Brand.MM]: "",
		[Brand.HC]: "",
		[Brand.SW]: "",
		[Brand.CX]: "",
		[Brand.CF]: "",
		[Brand.MU]: ""
	}
}

export const activities: Record<Activity, Record<Brand, string>> = {
	[Activity.FRONT_DOOR]: {
		[Brand.KK]: ".frontdoor.FrontDoorActivity",
		[Brand.MM]: "com.kayak.android.frontdoor.FrontDoorActivity",
		[Brand.HC]: "com.kayak.android.frontdoor.FrontDoorActivity",
		[Brand.CF]: "",
		[Brand.CX]: "",
		[Brand.MU]: "",
		[Brand.SW]: ""
	},

	[Activity.SPLASH]: {
		[Brand.KK]: "com.kayak.android.splash.Splash",
		[Brand.MM]: "com.kayak.android.splash.Splash",
		[Brand.HC]: "com.kayak.android.splash.Splash",
		[Brand.CF]: "",
		[Brand.CX]: "",
		[Brand.MU]: "",
		[Brand.SW]: ""
	}
}

export const regexMap: Record<string, string> = {
	"TLW": "\\w{3}",
	"MON": "\\w{3}",
	"DAY": "\\d{1,2}",
	"YEAR": "\\d{4}"
}
