import { IVisionBrowser } from "./browser/IVisionBrowser";
import { VisionEntry } from "./entry/VisionEntry";
import { VisionEntrySet } from "./entry/VisionEntrySet";
import { VisionScraper } from "./scraper/VisionScraper";
import { VisionScrapeDescriptor, freeScrapeDescriptor } from "./scraper/VisionScrapeDescriptor";
import { VisionParser } from "./parser/VisionParser";
import { VisionParserMatchSet } from "./parser/VisionParserMatchSet";
import { PuppeteerBrowser } from "./utilities/browsers/puppeteer/PuppeteerBrowser";
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
};

export namespace Vision {
    export async function cast (uri: string, options: VisionOptions = {}): Promise<VisionDescriptor> {
        const browser: IVisionBrowser = new PuppeteerBrowser();
        const entries: VisionEntrySet = new VisionEntrySet(options.entries || defaultOptions.entries || []);

        (options.additionalEntries || defaultOptions.additionalEntries || []).forEach((entry: VisionEntry): void => {
            entries.add(entry);
        });

        await browser.open();

        const scraper: VisionScraper = new VisionScraper(browser);
        const scrapeDescriptor: VisionScrapeDescriptor = await scraper.scrape(uri);
        const parser: VisionParser = new VisionParser(entries);
        const matched: VisionParserMatchSet = await parser.match(scrapeDescriptor);

        await freeScrapeDescriptor(scrapeDescriptor);
        await browser.close();

        return {
            hostname: scrapeDescriptor.hostname,
            entries: matched.matchedEntriesToArray(),
            uris: [
                uri,
            ],
            date: new Date().toString(),
            meta: {
                languages: scrapeDescriptor.languages || [],
            },
        };
    }
}