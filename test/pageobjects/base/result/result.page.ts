import { Base } from "../base.page"
import { ResultCard } from "./resultCard.Item"
import { ResultHeader } from './resultHeader.Item';

export abstract class ResultPage extends Base {
	abstract resultCardLC: string
	abstract resultHeaderLC: string
	abstract resultCardInit: new (element: WebdriverIO.Element) => ResultCard
	abstract resultHeaderInit: new(element: WebdriverIO.Element) => ResultHeader

	public async getResultCards(): Promise<ResultCard[]> {
		return (await $$(this.resultCardLC)).map((element) => new this.resultCardInit(element))
	}

	public async getFirstResultCard() {
		return new this.resultCardInit(await $(this.resultCardLC))
	}

	public async getHeader() {
		return new this.resultHeaderInit(await $(this.resultHeaderLC))
	}
}
