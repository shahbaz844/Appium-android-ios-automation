import { OS, Brand, Locale } from "./enums"
import { IRule, OSRule, BrandRule, LocaleRule } from "./rules"

export class Task {
	rules: IRule[] = []

	public addRule(rule: IRule) {
		this.rules.push(rule)
		return this
	}

	public addOSRule(os: OS[]) {
		this.rules.push(new OSRule(os))
		return this
	}

	public addBrandRule(brand: Brand[]) {
		this.rules.push(new BrandRule(brand))
		return this
	}

	public addLocaleRule(locale: Locale[]) {
		this.rules.push(new LocaleRule(locale))
		return this
	}

	public perform(func: () => unknown) {
		if (this.rules.every((rule) => rule.isValid())) {
			return func()
		} else return null
	}

	public forAndroid(func: () => unknown) {
		return this.addRule(new OSRule([OS.ANDROID])).perform(func)

	}
	public forIOS(func: () => unknown) {
		return this.addRule(new OSRule([OS.IOS])).perform(func)
	}

}
