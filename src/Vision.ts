import { IVisionBrowser } from "./browser/IVisionBrowser";
import { MatchedVisionEntry } from "./entry/MatchedVisionEntry";
import { VisionEntry } from "./entry/VisionEntry";
import { VisionEntrySet } from "./entry/VisionEntrySet";
import { VisionScraper } from "./scraper/VisionScraper";
import { VisionScrapeDescriptor, freeScrapeDescriptor } from "./scraper/VisionScrapeDescriptor";
import { VisionParser } from "./parser/VisionParser";
import { VisionParserMatchSet } from "./parser/VisionParserMatchSet";
import { PuppeteerBrowser } from "./utilities/browsers/puppeteer/PuppeteerBrowser";
import { VisionUtilities } from "./utilities/VisionUtilities";
import { VisionDescriptor } from "./VisionDescriptor";
import { VisionOptions } from "./VisionOptions";
import { Entries } from "../entries/Entries";

export const defaultOptions: VisionOptions = {
    matchedEntryExcludedProperties: [
        "fingerprint",
    ],
    entries: Entries.map((entry: VisionEntry) => {
        return entry;
    }),
    additionalEntries: [],
    parser: {
        evaluateEntryVersion: true,
        evaluateEntryExtra: true,
    },
};

export namespace Vision {
    export async function cast (value: string | VisionScrapeDescriptor, options: VisionOptions = {}): Promise<VisionDescriptor> {
        if (typeof value === "string") {
            return castOnURI(value, options);
        }
        else {
            return castOnDescriptor(value, options);
        }
    }

    export async function castOnURI (uri: string, options: VisionOptions = {}): Promise<VisionDescriptor> {
        const finalOptions: VisionOptions = VisionUtilities.mergeOptions(defaultOptions, options);
        const browser: IVisionBrowser = new PuppeteerBrowser();

        await browser.open();

        const scraper: VisionScraper = new VisionScraper(browser, finalOptions.scraper);
        const scrapeDescriptor: VisionScrapeDescriptor = await scraper.scrape(uri);
        const visionDescriptor: VisionDescriptor = await castOnDescriptor(scrapeDescriptor, options);

        await freeScrapeDescriptor(scrapeDescriptor);
        await browser.close();

        return visionDescriptor;
    }

    export async function castOnDescriptor (descriptor: VisionScrapeDescriptor, options: VisionOptions = {}): Promise<VisionDescriptor> {
        const finalOptions: VisionOptions = VisionUtilities.mergeOptions(defaultOptions, options);
        const parser: VisionParser = new VisionParser(getEntriesFromOptions(finalOptions), finalOptions.parser);
        const matched: VisionParserMatchSet = await parser.match(descriptor);
        const matchedEntries: MatchedVisionEntry[] = matched.matchedEntriesToArray();

        matchedEntries.forEach((matchedEntry: MatchedVisionEntry): void => {
            VisionUtilities.removeObjectProperties(matchedEntry, finalOptions.matchedEntryExcludedProperties || []);
        });

        return {
            hostname: descriptor.hostname,
            entries: matchedEntries,
            uris: [
                descriptor.uri,
            ],
            date: new Date().toISOString(),
            meta: {
                languages: descriptor.languages || [],
            },
        };
    }

    export function getVersion (): string {
        return require("../package.json").version;
    }

    function getEntriesFromOptions (options: VisionOptions): VisionEntrySet {
        const entries: VisionEntrySet = new VisionEntrySet();

        (options.entries || []).concat(options.additionalEntries || []).forEach((entry: VisionEntry): void => {
            entries.add(entry);
        });

        return entries;
    }
}

import cast = Vision.cast;
import castOnURI = Vision.castOnURI;
import castOnDescriptor = Vision.castOnDescriptor;

export { VisionDescriptor } from "./VisionDescriptor";
export { VisionOptions } from "./VisionOptions";
export { MatchedVisionEntry } from "./entry/MatchedVisionEntry";
export { VisionEntry } from "./entry/VisionEntry";
export { VisionEntryAuthor } from "./entry/VisionEntryAuthor";
export { VisionEntryFingerprint } from "./entry/VisionEntryFingerprint";
export { VisionEntrySet } from "./entry/VisionEntrySet";
export {
    cast,
    castOnURI,
    castOnDescriptor
};