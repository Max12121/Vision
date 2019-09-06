import { VisionEntry } from "../entry/VisionEntry";
import { VisionScrapeDescriptor } from "../scraper/VisionScrapeDescriptor";
import { VisionParser } from "./VisionParser";
import { VisionParserMatcher } from "./VisionParserMatcher";

export type VisionParserMatch = {
    readonly parser: VisionParser;
    readonly scrapeDescriptor: VisionScrapeDescriptor;
    readonly entry: VisionEntry;
    readonly entryMatcher: VisionParserMatcher;
    readonly entryImpliedBy: VisionEntry;
    readonly entryVersion: string;
    readonly entryExtra: {
        [name: string]: string;
    };
};