export class EnvironmentalError extends Error {
	constructor(msg: string) {
		super(`EnvironmentalError: ${msg}`)
	}
}

export class TestError extends Error {
	constructor(msg: string) {
		super(`TestError: ${msg}`)
	}
}

export class NotFoundError extends Error {
	constructor(msg: string) {
		super(`NotFoundError: ${msg}`)
	}
}

export class VerificationError extends Error {
	constructor(msg: string) {
		super(`VerificationError: ${msg}`)
	}
}
