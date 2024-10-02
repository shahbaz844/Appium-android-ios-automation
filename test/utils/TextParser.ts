import { TestError } from "./exceptions"
import { regexMap } from './constants';

export class Parser {

    formats: string[]
    regexMap: Record<string, string>

    constructor(customRegexMap?: Record<string, string>) {
        this.formats =[]
        this.regexMap = customRegexMap ? customRegexMap : regexMap
    }
    
    public addFormat(format: string) {
        this.formats.push(format)
        return this
    }

    public generateRegexForKeyword(keywordEnclosed: string) {
        const keyword: string = keywordEnclosed.slice(1, -1)
        const name_alias: string[] = keyword.split('-')

        if(name_alias.length == 1) {
            const value: string | undefined = this.regexMap[keyword]
            if (typeof value === "undefined") throw new TestError(`Could Not Find Regex For '${keyword}'`)
            return String.raw`(?<${keyword}>${value})`
        }
        else if(name_alias.length == 2) {
            const value: string | undefined = this.regexMap[name_alias[0]]
            if (typeof value === "undefined") throw new TestError(`Could Not Find Regex For '${name_alias[0]}'`)
            return String.raw`(?<${name_alias[1]}>${value})`
        }
        else {
            throw new TestError(`Bad Keyword: ${keyword} in Format String`)
        }
            
    }

    public generateRegexForFormat(format: string): string {
        const keywordsFound = format.match(/{.+?}/g)

        if (keywordsFound == null) throw new TestError(`No Keyword Found in: ${format}`)

        keywordsFound.forEach(keywordEnclosed => {
            format = format.replace(keywordEnclosed, this.generateRegexForKeyword(keywordEnclosed))
        })

        return format

    }

    public parse(data: string, fail=true): Record<string, string> | null {

        for (const format of this.formats) {
            const regex = this.generateRegexForFormat(format)
            const results = data.match(regex)?.groups
            if (results) return results
        }
        if (fail) throw new TestError(`Could not match Format String on Data: ${data}`)
        return null
    }
 }