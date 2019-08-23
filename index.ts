import { IVisionBrowser } from "./src/browser/IVisionBrowser";
import { PuppeteerBrowser } from "./src/utilities/browsers/puppeteer/PuppeteerBrowser";
import { VisionScraper} from "./src/scraper/VisionScraper";
import { VisionScrapeDescriptor } from "./src/scraper/VisionScrapeDescriptor";
import { VisionEntrySet } from "./src/entry/VisionEntrySet";

(async function main (): Promise<void> {
    console.log(VisionEntrySet.fromJSON("entries/entries.json"));

    /*
    const browser: IVisionBrowser = new PuppeteerBrowser();

    await browser.open();

    const scraper: VisionScraper = new VisionScraper(browser);
    const scrapeDescriptor: IVisionScrapeDescriptor = await scraper.scrape("https://www.iubenda.com");

    await browser.close();

    console.log(scrapeDescriptor);*/
}());