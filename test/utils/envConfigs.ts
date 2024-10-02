import { Brand, By, Locale, OS } from "./enums"
import { Capabilities } from "@wdio/types"
import { EnvironmentalError } from "./exceptions"
import * as pathModule from "path"
import * as fs from "fs"
import { Activity, activities, appPackages } from "./constants"

function getPlatform(): OS {
	const platform: string | undefined = process.env.platform?.toLowerCase()
	if (platform == null) throw new EnvironmentalError(`Platform is not provided. Example 'platform=android | ios'`)
	return platform as OS
}

export const platform: OS = getPlatform()

export function isAndroid(): boolean {
	return platform == OS.ANDROID
}

export function isIOS(): boolean {
	return platform == OS.IOS
}

export function isWeb(): boolean {
	return platform == OS.WEB
}

function getBrandLocale(): [Brand, Locale] {
	const br_lc: string | undefined = process.env.br_lc

	if (br_lc == null) throw new EnvironmentalError(`Brand and locale is not provided. Example 'br_lc=kayak:en_US'`)

	const splits: string[] = br_lc.split(":")

	if (splits.length != 2 || splits[1].split("_").length != 2)
		throw new EnvironmentalError(`'${br_lc}' Brand / Locale is invalid. Example 'br_lc=kayak:en_US'`)
	
	if (Locale[splits[1]] === undefined) {
		const listOfSupportedLocales = Object.values(Locale).filter(value => typeof value === 'string').toString()
		throw new EnvironmentalError(`'Locale is Unsupported. Supported Locales: ${listOfSupportedLocales}'`)
	}

	return [splits[0] as Brand, Locale[splits[1] as keyof typeof Locale] as Locale]
}

export const [brand, locale] = getBrandLocale()

function getOSVersion(): string | never {
	const version: string | undefined = process.env.DEVICE_VERSION

	if (version == null)
		throw new EnvironmentalError("Specify OS version like DEVICE_VERSION='16.0' or '12 in Environmental Variables")

	if (!parseFloat(version))
		throw new EnvironmentalError(`'${version}' OS vesion is invalid. Specify OS version like '16.0' or '12`)

	return version
}

export function getLocalizedStrings(locale: Locale) {
	const fileName = `strings/${Locale[locale].split("_")[0]}.json`
	try {
		return JSON.parse(fs.readFileSync(fileName).toString("utf-8")) as Record<string, string>
	} catch (err) {
		throw new EnvironmentalError((err as Error).message)
	}
}

export const localizedStrings: Record<string, string> = getLocalizedStrings(locale)

function getBuildPath(path: string, type: OS, brand: Brand): string {
	if (fs.existsSync(path)) {
		// Hit REGEX and find Builds in builds_dir folder.
		const buildName = type == OS.IOS && brand == Brand.KK ? "kphone" : brand as string
		const regex: string = type == OS.ANDROID ? `^KAYAK-${buildName}[\\w-]*.[0-9-]*\\.apk$` : `^${buildName}\\.ipa$`
		const matches: string[] = fs.readdirSync(path).filter((allFiles: string) => allFiles.match(regex) !== null)

		if (matches.length) return pathModule.join(path, matches[0])
		else
			throw new EnvironmentalError(`${type} Builds for ${brand} at path:${path} does not exist!. 
            DEBUG_INFO: cwd: '${process.cwd()}', REGEX: '${regex}'`)
	} else throw new EnvironmentalError(`${path} does not exist! cwd: '${process.cwd()}'`)
}

function getEnv(key: string): string {
	const value: string | undefined = process.env[key]

	if (value == null) throw new EnvironmentalError(`Could not Find ${key} in Environment Variables`)
	else return value
}

export function getCapabilities(): Capabilities.RemoteCapabilities {
	return isAndroid() ? androidOptions() : isWeb() ? webOptions() : iosOptions()
}

export function getServices(): string[] {
	return isWeb() ? ['chromedriver','geckodriver'] : []
}

function iosOptions(): Capabilities.AppiumW3CCapabilities[] {
	return [
		{
			"appium:platformName": "iOS",
			"appium:deviceName": "iPhone",
			"appium:automationName": "XCUITest",
			"appium:platformVersion": getOSVersion(),
			"appium:udid": getEnv("DEVICE_UUID"),
			"appium:locale": Locale[locale],
			"appium:app": appPackages[platform][brand],
			"appium:noReset": true,
			//@ts-expect-error Capabilities not currently supported by @wdio/appium-client
			"appium:waitForQuiescence": false,
			"appium:usePrebuiltWDA": true,
		},
	]
}

function androidOptions(): Capabilities.AppiumW3CCapabilities[] {
	const [language, region] = Locale[locale].split("_")

	return [
		{
			"appium:platformName": "Android",
			"appium:platformVersion": getOSVersion(),
			"appium:deviceName": "Pixel",
			"appium:automationName": "Uiautomator2",
			"appium:language": language,
			"appium:locale": region,
			"appium:udid": getEnv("DEVICE_UUID"),
			// "appium:appWaitActivity": "*",
			// "appium:app": getBuildPath("./builds/master/", OS.ANDROID, brand),
			"appium:appPackage": appPackages[platform][brand],
			"appium:noReset": true,
			//@ts-expect-error Capabilities not currently supported by @wdio/appium-client
			"appium:appActivity": activities[Activity.SPLASH][brand],
			"appium:appWaitDuration": 50000,
			"appium:gpsEnabled": true,
			"appium:uiautomator2ServerInstallTimeout": 120000,
			// "appium:dontStopAppOnReset": true,
			// "appium:unicodeKeyboard": true,  // Will be used when integrating BS
		},
	]
}

function webOptions(): Capabilities.DesiredCapabilities[] {

	return [
		{
			maxInstances: 5,
			browserName: 'chrome',
			acceptInsecureCerts: true
		}
	]
}

export function addToDate(day = 0, month = 0, year = 0, date = new Date()): Date {
	date.setFullYear(date.getFullYear() + year, date.getMonth() + month, date.getDate() + day)
	return date
}

export function byPredicate(locator: string): string {
	return By.Predicate + locator
}

export function byID(locator: string): string {
	return By.ID + locator
}

export function byAccessibility(locator: string): string {
	return By.Accessiblity + locator
}

export function byUiAutomator(locator: string): string {
	return By.UiAutomator + locator
}

export function byClassChain(locator: string): string {
	return By.ClassChain + locator
}