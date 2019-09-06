import { VisionParserMatch } from "./VisionParserMatch";

export class VisionParserMatchSet {
    private readonly _matched: {
        [name: string]: VisionParserMatch;
    };

    public constructor () {
        this._matched = {};
    }

    public get length (): number {
        return Object.keys(this._matched).length;
    }

    public add (match: VisionParserMatch): void {
        this._matched[match.entry.name] = match;
    }

    public get (matchedEntryName: string): VisionParserMatch {
        return this._matched[matchedEntryName] || null;
    }

    public has (matchedEntryName: string): boolean {
        return this.get(matchedEntryName) !== null;
    }

    public remove (matchedEntryName: string): void {
        delete this._matched[matchedEntryName];
    }

    public clear (): void {
        Object.keys(this._matched).forEach((matchedEntryName: string): void => {
            this.remove(matchedEntryName);
        });
    }

    public toArray (): VisionParserMatch[] {
        return Object.keys(this._matched).map((matchedEntryName: string): VisionParserMatch => {
            return this._matched[matchedEntryName];
        });
    }
}