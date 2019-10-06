import { IVisionBrowser } from "./IVisionBrowser";
import { IVisionHTTPResponse } from "./IVisionHTTPResponse";

// Represents a window used by Vision to load and manipulate websites.
export interface IVisionWindow {
    // Represents a reference to the browser that created the window.
    browser: IVisionBrowser;

    // Used to set the user agent of the window.
    setUserAgent (userAgent: string): Promise<void>;

    // Used to request and load a webpage.
    goto (uri: string): Promise<IVisionHTTPResponse>;

    // Used to evaluate JavaScript code in the active webpage.
    evaluate (text: string): Promise<any>;

    // Used to close the window.
    close (): Promise<void>;
}