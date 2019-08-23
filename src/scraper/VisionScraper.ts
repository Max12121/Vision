import * as FileSystem from "fs";
import * as Path from "path";
import { IVisionBrowser } from "../browser/IVisionBrowser";
import { IVisionPage } from "../browser/IVisionPage";
import { VisionHTTPResponse } from "../browser/VisionHTTPResponse";
import { VisionScrapeDescriptor } from "./VisionScrapeDescriptor";

export class VisionScraper {
    private static readonly VISION_HELPER: string = FileSystem.readFileSync(Path.resolve(__dirname, "__Vision__.js")).toString();
    private readonly _browser: IVisionBrowser;

    public constructor (browser: IVisionBrowser) {
        this._browser = browser;
    }

    public async scrape (uri: string): Promise<VisionScrapeDescriptor> {
        const page: IVisionPage = await this._browser.openPage();
        const response: VisionHTTPResponse = await page.goto(uri);

        await page.evaluate(VisionScraper.VISION_HELPER);

        const localDescriptor: any = await page.evaluate("__Vision__.getScrapeDescriptor()");

        return {
            uri,
            response,
            ...localDescriptor,
        };
    }

    public async crawl (uri: string, maxDepth: number): Promise<void> {
        return;
    }
}