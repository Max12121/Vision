import * as FileSystem from "fs";
import * as Path from "path";
import { IVisionBrowser } from "../browser/IVisionBrowser";
import { IVisionWindow } from "../browser/IVisionWindow";
import { IVisionHTTPResponse } from "../browser/IVisionHTTPResponse";
import { VisionScrapeDescriptor } from "./VisionScrapeDescriptor";

export class VisionScraper {
    private static readonly VISION_HELPER: string = FileSystem.readFileSync(Path.resolve(__dirname, "__Vision__.js")).toString();
    private readonly _browser: IVisionBrowser;

    public constructor (browser: IVisionBrowser) {
        this._browser = browser;
    }

    public async scrape (uri: string): Promise<VisionScrapeDescriptor> {
        const window: IVisionWindow = await this._browser.openWindow();
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