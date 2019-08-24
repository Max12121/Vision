import { VisionEntryFingerprint } from "../entry/VisionEntryFingerprint";
import { VisionScrapeDescriptor } from "../scraper/VisionScrapeDescriptor";

export type VisionParserMatcher = {
    readonly name: string;
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean;
};