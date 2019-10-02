import { VisionEntryFingerprint } from "../entry/VisionEntryFingerprint";
import { VisionScrapeDescriptor } from "../scraper/VisionScrapeDescriptor";

// Represents a entry matcher.
export type VisionParserMatcher = {
    // Used as matcher name.
    name: string;

    // Used as matcher procedure.
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean | Promise<boolean>;
};