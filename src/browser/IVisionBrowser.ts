import { IVisionWindow } from "./IVisionWindow";

// Represents a browser used by Vision to navigate websites.
export interface IVisionBrowser {
    // Used to open the browser.
    open (): Promise<void>;

    // Used to open a browser window.
    openWindow (): Promise<IVisionWindow>;

    // Used to close the browser.
    close (): Promise<void>;
}