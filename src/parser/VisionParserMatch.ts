import { MatchedVisionEntry } from "../entry/MatchedVisionEntry";
import { VisionEntry } from "../entry/VisionEntry";
import { VisionScrapeDescriptor } from "../scraper/VisionScrapeDescriptor";
import { VisionParser } from "./VisionParser";
import { VisionParserMatcher } from "./VisionParserMatcher";

// Represents a parser match.
export type VisionParserMatch = {
    // Represents a reference to the parser.
    parser: VisionParser;

    // Represents a reference to the scrape descriptor.
    scrapeDescriptor: VisionScrapeDescriptor;

    // Represents a reference to the matched entry.
    matchedEntry: MatchedVisionEntry;

    // Represents a reference to the matcher that matched the entry.
    // In case the value is "null" then the entry has been implied.
    entryMatcher: VisionParserMatcher | null;

    // Represents a reference to the entry that implied the matched entry.
    // In case the value is "null" then the entry has been matched by a matcher.
    entryImpliedBy: VisionEntry | null;
};