import * as Puppeteer from "puppeteer";
import { IVisionBrowser } from "../../../browser/IVisionBrowser";
import { IVisionPage } from "../../../browser/IVisionPage";
import { PuppeteerPage } from "./PuppeteerPage";

export class PuppeteerBrowser implements IVisionBrowser {
    private _puppeteerBrowser: Puppeteer.Browser;

    public constructor () {
        this._puppeteerBrowser = null;
    }

    public async open (): Promise<void> {
        if (!this._puppeteerBrowser) {
            this._puppeteerBrowser = await Puppeteer.launch();
        }
    }

    public async openPage (): Promise<IVisionPage> {
        return new PuppeteerPage(await this._puppeteerBrowser.newPage()) as IVisionPage;
    }

    public async close (): Promise<void> {
        if (this._puppeteerBrowser) {
            await this._puppeteerBrowser.close();
            this._puppeteerBrowser = null;
        }
    }
}