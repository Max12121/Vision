import { IVisionBrowser } from "./IVisionBrowser";
import { IVisionHTTPResponse } from "./IVisionHTTPResponse";

// Represents a page used by Vision to load and manipulate websites.
export interface IVisionWindow {
    // Used as reference to the browser that created the window.
    readonly browser: IVisionBrowser;

    // Used to set the user agent of the window.
    setUserAgent (userAgent: string): Promise<void>;

    // Used to request and load a webpage.
    goto (uri: string): Promise<IVisionHTTPResponse>;

    // Used to evaluate JavaScript code in the webpage.
    evaluate (text: string): Promise<any>;

    // Used to close the window.
    close (): Promise<void>;
}