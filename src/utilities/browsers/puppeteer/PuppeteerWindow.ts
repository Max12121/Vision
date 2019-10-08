import * as Puppeteer from "puppeteer";
import { IVisionBrowser } from "../../../browser/IVisionBrowser";
import { IVisionWindow } from "../../../browser/IVisionWindow";
import { IVisionHTTPResponse } from "../../../browser/IVisionHTTPResponse";
import { VisionError } from "../../../errors/VisionError";
import { PuppeteerBrowser } from "./PuppeteerBrowser";

export class PuppeteerWindow implements IVisionWindow {
    private readonly _puppeteerBrowser: PuppeteerBrowser;
    private readonly _puppeteerPage: Puppeteer.Page;

    public constructor (puppeteerBrowser: PuppeteerBrowser, puppeteerPage: Puppeteer.Page) {
        this._puppeteerBrowser = puppeteerBrowser;
        this._puppeteerPage = puppeteerPage;
    }

    public get browser (): IVisionBrowser {
        return this._puppeteerBrowser;
    }

    public async setUserAgent (userAgent: string): Promise<void> {
        return this._puppeteerPage.setUserAgent(userAgent);
    }

    public async goto (uri: string): Promise<IVisionHTTPResponse> {
        const response: Puppeteer.Response | null = await this._puppeteerPage.goto(uri);

        if (!response) {
            // TODO: TODO.
            throw new VisionError();
        }

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