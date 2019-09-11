import { VisionParserMatcher } from "./VisionParserMatcher";

export class VisionParserMatcherSet {
    private readonly _matchers: {
        [name: string]: VisionParserMatcher;
    };

    public constructor () {
        this._matchers = {};
    }

    public get length (): number {
        return Object.keys(this._matchers).length;
    }

    public add (matcher: VisionParserMatcher): void {
        this._matchers[matcher.name] = matcher;
    }

    public get (matcherName: string): VisionParserMatcher {
        return this._matchers[matcherName] || null;
    }

    public has (matcherName: string): boolean {
        return this.get(matcherName) !== null;
    }

    public remove (matcherName: string): void {
        delete this._matchers[matcherName];
    }

    public clear (): void {
        Object.keys(this._matchers).forEach((matcherName: string): void => {
            this.remove(matcherName);
        });
    }

    public valuesToArray (): VisionParserMatcher[] {
        return Object.keys(this._matchers).map((matcherName: string): VisionParserMatcher => {
            return this._matchers[matcherName];
        });
    }
}