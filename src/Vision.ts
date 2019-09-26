import { VisionEntrySet } from "./entry/VisionEntrySet";
import { VisionScraper } from "./scraper/VisionScraper";
import { VisionScrapeDescriptor } from "./scraper/VisionScrapeDescriptor";
import { VisionParser } from "./parser/VisionParser";
import { VisionParserMatchSet } from "./parser/VisionParserMatchSet";
import { VisionDescriptor } from "./VisionDescriptor";
import { PuppeteerBrowser } from "./utilities/browsers/puppeteer/PuppeteerBrowser";

export module Vision {
    export async function cast (uri: string): Promise<VisionDescriptor> {
        const browser: PuppeteerBrowser = new PuppeteerBrowser();
        const entries: VisionEntrySet = VisionEntrySet.fromJSON("entries/entries.json");

        await browser.open();

        const scraper: VisionScraper = new VisionScraper(browser);
        const scrapeDescriptor: VisionScrapeDescriptor = await scraper.scrape(uri);

        const parser: VisionParser = new VisionParser(entries);
        const matchedEntries: VisionParserMatchSet = await parser.match(scrapeDescriptor);

        await scrapeDescriptor.window.close();
        await browser.close();

        return {
            hostname: scrapeDescriptor.hostname,
            // @ts-ignore
            entries: [
                ...matchedEntries.valuesToArray(),
            ],
            uris: [
                uri
            ],
            date: null,
            meta: {
                languages: scrapeDescriptor.languages
            }
        };
    }
}