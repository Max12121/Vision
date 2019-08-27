import { VisionScrapeDescriptor } from "./scraper/VisionScrapeDescriptor";

export type VisionOptions = {
    readonly excludedEntryProperties?: string[];
    readonly scraper?: VisionScrapeDescriptor;
};