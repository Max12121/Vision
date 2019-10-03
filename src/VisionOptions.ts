import { VisionScraperOptions } from "./scraper/VisionScraperOptions";
import { VisionParserOptions } from "./parser/VisionParserOptions";

export type VisionOptions = {
    matchedEntryExcludedProperties?: string[];

    scraper?: VisionScraperOptions;

    parser?: VisionParserOptions;
};