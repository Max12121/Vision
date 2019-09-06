import { IVisionHTTPResponse } from "./IVisionHTTPResponse";

// Represents a page used by Vision to load and manipulate websites.
export interface IVisionWindow {
    setUserAgent (userAgent: string): Promise<void>;
    goto (uri: string): Promise<IVisionHTTPResponse>;
    evaluate (text: string): Promise<any>;
    close (): Promise<void>;
}