import * as FileSystem from "fs";
import * as Path from "path";
import { IVisionBrowser } from "../browser/IVisionBrowser";
import { IVisionWindow } from "../browser/IVisionWindow";
import { IVisionHTTPResponse } from "../browser/IVisionHTTPResponse";
import { VisionScrapeDescriptor } from "./VisionScrapeDescriptor";
import { VisionScraperOptions } from "./VisionScraperOptions";

export const defaultOptions: VisionScraperOptions = {
    userAgent: "Mozilla/5.0 (Vision Engine) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.87 Safari/537.36",
};

export class VisionScraper {
    private static readonly VISION_HELPER: string = FileSystem.readFileSync(Path.resolve(__dirname, "__Vision__.js")).toString();

    private readonly _browser: IVisionBrowser;
    private readonly _options: VisionScraperOptions;

    public constructor (browser: IVisionBrowser, options: VisionScraperOptions = {}) {
        this._browser = browser;
        this._options = {
            ...defaultOptions,
            ...options,
        };
    }

    public async scrape (uri: string): Promise<VisionScrapeDescriptor> {
        const window: IVisionWindow = await this._browser.openWindow();

        await window.setUserAgent(this._options.userAgent);

        const httpResponse: IVisionHTTPResponse = await window.goto(uri);

        await window.evaluate(VisionScraper.VISION_HELPER);

        const localDescriptor: any = await window.evaluate("__Vision__.getScrapeDescriptor()");

        return {
            hostname: await window.evaluate("window.location.hostname"),
            uri,
            response: httpResponse,
            ...localDescriptor,
            window,
        };
    }
}