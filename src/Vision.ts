import { IVisionBrowser } from "./browser/IVisionBrowser";
import { PuppeteerBrowser } from "./utilities/browsers/puppeteer/PuppeteerBrowser";
import { VisionEntry } from "./entry/VisionEntry";
import { VisionEntrySet } from "./entry/VisionEntrySet";
import { VisionScraper } from "./scraper/VisionScraper";
import { VisionScrapeDescriptor } from "./scraper/VisionScrapeDescriptor";
import { VisionParser } from "./parser/VisionParser";
import { VisionDescriptor } from "./VisionDescriptor";
import { VisionOptions } from "./VisionOptions";

export module Vision {
    export const DEFAULT_OPTIONS: VisionOptions = {
        excludedEntryProperties: [
            "fingerprint", "implies"
        ],
    };

    export async function cast (uri: string, options: VisionOptions = {}): Promise<any> {
        const browser: IVisionBrowser = new PuppeteerBrowser();
        const finalOptions: VisionOptions = {
            ...DEFAULT_OPTIONS,
            ...options,
        };

        await browser.open();

        const scraper: VisionScraper = new VisionScraper(browser);
        const scrapeDescriptor: VisionScrapeDescriptor = await scraper.scrape(uri);

        const entries: VisionEntrySet = VisionEntrySet.fromJSON("entries/entries.json");
        const parser: VisionParser = new VisionParser(entries);
        const matchedEntries: any = await parser.match(scrapeDescriptor);
        const visionDescriptor: VisionDescriptor = {
            hostname: scrapeDescriptor.hostname,
            uris: [
                scrapeDescriptor.uri,
            ],
            entries: matchedEntries.toArray().map((item: any): any => item.entry) as any,
            meta: {
                language: scrapeDescriptor.language,
                languages: scrapeDescriptor.languages,
            }
        };

        await scrapeDescriptor.window.close();
        await browser.close();

        return visionDescriptor;
    }

    function removeEntriesProperties (entries: VisionEntry[], excludedProperties: string[]): VisionEntry[] {
        const cleanedEntries: VisionEntry[] = [];

        for (const entry of entries) {
            const cleanedEntry: VisionEntry = {
                ...entry,
            };

            for (const propertyName of excludedProperties) {
                // @ts-ignore
                delete cleanedEntry[propertyName];
            }

            cleanedEntries.push(cleanedEntry);
        }

        return cleanedEntries;
    }
}