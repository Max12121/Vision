import { VisionEntry } from "../entry/VisionEntry";
import { MatchedVisionEntry } from "../entry/MatchedVisionEntry";
import { VisionScrapeDescriptor } from "../scraper/VisionScrapeDescriptor";
import { VisionParser } from "./VisionParser";
import { VisionParserMatcher } from "./VisionParserMatcher";

// Represents a parser match.
export type VisionParserMatch = {
    // Used as reference to the parser.
    readonly parser: VisionParser;

    // Used as reference to the scrape descriptor.
    readonly scrapeDescriptor: VisionScrapeDescriptor;

    // Used as reference to the matched entry.
    readonly matchedEntry: MatchedVisionEntry;

    // Used as reference to the matcher that matched the entry.
    // In case the value is "null" then the entry has been implied.
    readonly entryMatcher: VisionParserMatcher;

    // Used as reference to the entry that implied the matched entry.
    // In case the value is "null" then the entry has been matched by a matcher.
    readonly entryImpliedBy: VisionEntry;
};