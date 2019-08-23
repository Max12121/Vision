import * as Puppeteer from "puppeteer";
import { IVisionPage } from "../../../browser/IVisionPage";
import { VisionHTTPResponse } from "../../../browser/VisionHTTPResponse";

export class PuppeteerPage implements IVisionPage {
    private readonly _puppeteerPage: Puppeteer.Page;

    public constructor (puppeteerPage: Puppeteer.Page) {
        this._puppeteerPage = puppeteerPage;
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