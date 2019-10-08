import { VisionScraperOptions } from "./scraper/VisionScraperOptions";
import { VisionParserOptions } from "./parser/VisionParserOptions";
import { VisionEntry } from "./entry/VisionEntry";

// Represents the Vision options.
export type VisionOptions = {
    // Represents a list of properties to delete from the matched entries.
    matchedEntryExcludedProperties?: string[];

    // Represents a list of entries added to the parser.
    entries?: VisionEntry[];

    // Represents a list of additional entries added to the parser.
    additionalEntries?: VisionEntry[];

    // Represents a reference to the scraper options.
    scraper?: VisionScraperOptions;

    // Represents a reference to the parser options.
    parser?: VisionParserOptions;
};