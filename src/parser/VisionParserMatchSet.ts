import { MatchedVisionEntry } from "../entry/MatchedVisionEntry";
import { VisionSet } from "../utilities/collections/VisionSet";
import { VisionParserMatch } from "./VisionParserMatch";

export class VisionParserMatchSet extends VisionSet<VisionParserMatch> {
    public constructor () {
        super((match: VisionParserMatch): string => {
            return match.matchedEntry.name;
        });
    }

    public matchedEntriesToArray (): MatchedVisionEntry[] {
        return this.valuesToArray().map((match: VisionParserMatch): MatchedVisionEntry => {
            return match.matchedEntry;
        });
    }
}