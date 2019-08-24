import * as Puppeteer from "puppeteer";
import { IVisionWindow } from "../../../browser/IVisionWindow";
import { VisionHTTPResponse } from "../../../browser/VisionHTTPResponse";

export class PuppeteerWindow implements IVisionWindow {
    private readonly _puppeteerPage: Puppeteer.Page;

    public constructor (puppeteerPage: Puppeteer.Page) {
        this._puppeteerPage = puppeteerPage;
    }

    public async setUserAgent (userAgent: string): Promise<void> {
        return this._puppeteerPage.setUserAgent(userAgent);
    }

    public async goto (uri: string): Promise<VisionHTTPResponse> {
        const response: Puppeteer.Response = await this._puppeteerPage.goto(uri);

        return {
            status: response.status(),
            headers: response.headers(),
            body: await response.text(),
        };
    }

    public async evaluate (text: string): Promise<any> {
        return this._puppeteerPage.evaluate(text);
    }

    public async close (): Promise<void> {
        if (this._puppeteerPage) {
            await this._puppeteerPage.close();
        }
    }
}