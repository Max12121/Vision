import { IVisionBrowser } from "./src/browser/IVisionBrowser";
import { PuppeteerBrowser } from "./src/utilities/browsers/puppeteer/PuppeteerBrowser";
import { VisionScraper} from "./src/scraper/VisionScraper";
import { VisionScrapeDescriptor } from "./src/scraper/VisionScrapeDescriptor";
import { VisionEntrySet } from "./src/entry/VisionEntrySet";
import {VisionParser} from "./src/parser/VisionParser";

(async function main (): Promise<void> {
    const entries: VisionEntrySet = VisionEntrySet.fromJSON("entries/entries.json");


    const browser: IVisionBrowser = new PuppeteerBrowser();

    await browser.open();

    const scraper: VisionScraper = new VisionScraper(browser);
    const scrapeDescriptor: VisionScrapeDescriptor = await scraper.scrape("https://www.malgol.com");

    const parser: VisionParser = new VisionParser(entries);

    console.log(parser.match(scrapeDescriptor).toArray());

    await browser.close();
}());