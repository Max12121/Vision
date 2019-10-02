import { VisionParserMatcher } from "./VisionParserMatcher";
import { VisionSet } from "../utilities/collections/VisionSet";

export class VisionParserMatcherSet extends VisionSet<VisionParserMatcher> {
    public constructor () {
        super((matcher: VisionParserMatcher) => {
            return matcher.name;
        });
    }
}