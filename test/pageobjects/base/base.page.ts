/*
base page object containing all methods, selectors and functionality that is shared across all page objects
 */

export class ElementLocator {
	public android: string
	public ios: string

	constructor(android = "", ios = "") {
		this.android = android
		this.ios = ios
	}
}

export class Base {
	nothing:string
}
