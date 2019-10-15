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

export { VisionDescriptor } from "./VisionDescriptor";
export { VisionOptions } from "./VisionOptions";
export { MatchedVisionEntry } from "./entry/MatchedVisionEntry";
export { VisionEntry } from "./entry/VisionEntry";
export { VisionEntryAuthor } from "./entry/VisionEntryAuthor";
export { VisionEntryFingerprint } from "./entry/VisionEntryFingerprint";
export { VisionEntrySet } from "./entry/VisionEntrySet";

export const defaultOptions: VisionOptions = {
    matchedEntryExcludedProperties: [
        "fingerprint",
    ],
    entries: Entries.map((entry: VisionEntry) => {
        return entry;
    }),
    additionalEntries: [],
    scraper: {
        // Silence is golden.
    },
    parser: {
        evaluateEntryVersion: true,
        evaluateEntryExtra: true,
    },
};

export namespace Vision {
    export async function cast (uri: string, options: VisionOptions = {}): Promise<VisionDescriptor> {
        const browser: IVisionBrowser = new PuppeteerBrowser();

        await browser.open();

        const scraper: VisionScraper = new VisionScraper(browser, {
            ...defaultOptions.scraper,
            ...options.scraper,
        });
        const scrapeDescriptor: VisionScrapeDescriptor = await scraper.scrape(uri);
        const parser: VisionParser = new VisionParser(getEntriesFromOptions(options), {
            ...defaultOptions.parser,
            ...options.parser,
        });
        const matched: VisionParserMatchSet = await parser.match(scrapeDescriptor);
        const matchedEntries: MatchedVisionEntry[] = matched.matchedEntriesToArray();

        matchedEntries.forEach((matchedEntry: MatchedVisionEntry): void => {
            VisionUtilities.removeObjectProperties(matchedEntry, getMatchedEntryExcludedPropertiesFromOptions(options));
        });

        await freeScrapeDescriptor(scrapeDescriptor);
        await browser.close();

        return {
            hostname: scrapeDescriptor.hostname,
            entries: matchedEntries,
            uris: [
                uri,
            ],
            meta: {
                languages: scrapeDescriptor.languages || [],
            },
        };
    }

    function getEntriesFromOptions (options: VisionOptions): VisionEntrySet {
        const entries: VisionEntrySet = new VisionEntrySet();

        (options.entries || defaultOptions.entries || []).concat(
            options.additionalEntries || defaultOptions.additionalEntries || []
        ).forEach((entry: VisionEntry): void => {
            entries.add(entry);
        });

        return entries;
    }

    function getMatchedEntryExcludedPropertiesFromOptions (options: VisionOptions): string[] {
        return options.matchedEntryExcludedProperties || defaultOptions.matchedEntryExcludedProperties || [];
    }
}

import cast = Vision.cast;

export { cast };