import { OS, Brand, Locale } from "./enums"
import { brand, locale, platform } from './envConfigs';

export interface IRule {
	isValid: () => boolean
}

export class OSRule implements IRule {
	allowedOS: OS[]

	constructor(os: OS[]) {
		this.allowedOS = os
	}
	isValid(): boolean {
		return this.allowedOS.includes(platform)
	}
}

export class BrandRule implements IRule {
	allowedBrands: Brand[]

	constructor(brands: Brand[]) {
		this.allowedBrands = brands
	}

	isValid(): boolean {
		return this.allowedBrands.includes(brand)
	}
}

export class LocaleRule implements IRule {
	allowedLocales: Locale[]

	constructor(locales: Locale[]) {
		this.allowedLocales = locales
	}

	isValid(): boolean {
		return this.allowedLocales.includes(locale)
	}
}
