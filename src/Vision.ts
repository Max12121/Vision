import { PuppeteerBrowser } from "./utilities/browsers/puppeteer/PuppeteerBrowser";
import { VisionEntrySet } from "./entry/VisionEntrySet";
import {VisionScraper} from "./scraper/VisionScraper";
import {VisionScrapeDescriptor} from "./scraper/VisionScrapeDescriptor";
import {VisionParser} from "./parser/VisionParser";
import {VisionParserMatchSet} from "./parser/VisionParserMatchSet";
import {VisionParserMatch} from "./parser/VisionParserMatch";

export module Vision {
    export async function cast (uri: string): Promise<any> {
        const browser: PuppeteerBrowser = new PuppeteerBrowser();
        const entries: VisionEntrySet = VisionEntrySet.fromJSON("entries/entries.json");

        await browser.open();

        const scraper: VisionScraper = new VisionScraper(browser);
        const scrape: VisionScrapeDescriptor = await scraper.scrape(uri);
        const parser: VisionParser = new VisionParser(entries);
        const matchedEntries: VisionParserMatchSet = await parser.match(scrape);

        await browser.close();

        return matchedEntries.valuesToArray().map((item: VisionParserMatch): any => [ item.entry.name, item.entryVersion ]);
    }
}