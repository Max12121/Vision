import * as Puppeteer from "puppeteer";
import { IVisionBrowser } from "../../../browser/IVisionBrowser";
import { PuppeteerWindow } from "./PuppeteerWindow";

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

    public async openWindow (): Promise<PuppeteerWindow> {
        return new PuppeteerWindow(await this._puppeteerBrowser.newPage());
    }

    public async close (): Promise<void> {
        if (this._puppeteerBrowser) {
            await this._puppeteerBrowser.close();
            this._puppeteerBrowser = null;
        }
    }
}