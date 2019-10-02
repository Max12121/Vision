import { IVisionBrowser } from "./browser/IVisionBrowser";
import { VisionEntrySet } from "./entry/VisionEntrySet";
import { VisionScraper } from "./scraper/VisionScraper";
import { VisionScrapeDescriptor } from "./scraper/VisionScrapeDescriptor";
import { VisionParser } from "./parser/VisionParser";
import { VisionParserMatchSet } from "./parser/VisionParserMatchSet";
import { PuppeteerBrowser } from "./utilities/browsers/puppeteer/PuppeteerBrowser";
import { VisionDescriptor } from "./VisionDescriptor";

export namespace Vision {
    export async function cast (uri: string): Promise<VisionDescriptor> {
        const browser: IVisionBrowser = new PuppeteerBrowser();
        const entries: VisionEntrySet = new VisionEntrySet();

        await browser.open();

        const scraper: VisionScraper = new VisionScraper(browser);
        const scrapeDescriptor: VisionScrapeDescriptor = await scraper.scrape(uri);

        const parser: VisionParser = new VisionParser(entries);
        const matched: VisionParserMatchSet = await parser.match(scrapeDescriptor);

        await scrapeDescriptor.window.close();
        await browser.close();

        return {
            hostname: scrapeDescriptor.hostname,
            entries: matched.matchedEntriesToArray(),
            uris: [
                uri,
            ],
            date: new Date().toString(),
            meta: {
                languages: scrapeDescriptor.languages,
            },
        };
    }
}