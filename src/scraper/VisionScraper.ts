import * as FileSystem from "fs";
import * as Path from "path";
import { IVisionBrowser } from "../browser/IVisionBrowser";
import { IVisionWindow } from "../browser/IVisionWindow";
import { IVisionHTTPResponse } from "../browser/IVisionHTTPResponse";
import { VisionUtilities } from "../utilities/VisionUtilities";
import { VisionScrapeDescriptor } from "./VisionScrapeDescriptor";
import { VisionScraperOptions } from "./VisionScraperOptions";

export const defaultOptions: VisionScraperOptions = {
    userAgent: "Mozilla/5.0 (compatible; Googlebot/2.1; Vision/0.1.0; +http://www.google.com/bot.html)",
};

export class VisionScraper {
    private static readonly VISION_HELPER: string = FileSystem.readFileSync(Path.resolve(__dirname, "__Vision__.js")).toString();

    private static readonly EXPRESSION_HOSTNAME: string = "window.location.hostname";
    private static readonly EXPRESSION_LOCAL_SCRAPE_DESCRIPTOR: string = "__Vision__.getScrapeDescriptor()";

    private readonly _browser: IVisionBrowser;
    private readonly _options: VisionScraperOptions;

    public constructor (browser: IVisionBrowser, options: VisionScraperOptions = {}) {
        this._browser = browser;
        this._options = VisionUtilities.mergeOptions(defaultOptions, options);
    }

    public get browser (): IVisionBrowser {
        return this._browser;
    }

    public get options (): VisionScraperOptions {
        return this._options;
    }

    public async scrape (uri: string): Promise<VisionScrapeDescriptor> {
        const window: IVisionWindow = await this._browser.openWindow();

        await window.setUserAgent(this._options.userAgent || "");

        const httpResponse: IVisionHTTPResponse = await window.goto(uri);

        await window.evaluate(VisionScraper.VISION_HELPER);

        const localDescriptor: any = await window.evaluate(VisionScraper.EXPRESSION_LOCAL_SCRAPE_DESCRIPTOR);

        return {
            hostname: await window.evaluate(VisionScraper.EXPRESSION_HOSTNAME),
            uri,
            response: httpResponse,
            ...localDescriptor,
            window,
        };
    }
}