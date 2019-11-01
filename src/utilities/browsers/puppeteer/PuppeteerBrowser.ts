import * as Puppeteer from "puppeteer";
import { IVisionBrowser } from "../../../browser/IVisionBrowser";
import { VisionError } from "../../../errors/VisionError";
import { PuppeteerWindow } from "./PuppeteerWindow";

export class PuppeteerBrowser implements IVisionBrowser {
    private _puppeteerBrowser: Puppeteer.Browser | null;
    private _PID: number;

    public constructor () {
        this._puppeteerBrowser = null;
        this._PID = -1;
    }

    public get PID (): number {
        return this._PID;
    }

    public async open (): Promise<void> {
        if (!this._puppeteerBrowser) {
            this._puppeteerBrowser = await Puppeteer.launch({
                ignoreHTTPSErrors: true,
            });
            this._PID = this._puppeteerBrowser.process().pid;
        }
    }

    public async openWindow (): Promise<PuppeteerWindow> {
        if (!this._puppeteerBrowser) {
            // TODO: TODO.
            throw new VisionError();
        }

        return new PuppeteerWindow(this, await this._puppeteerBrowser.newPage());
    }

    public async close (): Promise<void> {
        if (this._puppeteerBrowser) {
            await this._puppeteerBrowser.close();
            this._PID = -1;
        }
    }
}