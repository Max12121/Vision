import { VisionHTTPResponse } from "./VisionHTTPResponse";

// Represents a page used by Vision to load websites and interact with them.
export interface IVisionWindow {
    setUserAgent (userAgent: string): Promise<void>;
    goto (uri: string): Promise<VisionHTTPResponse>;
    evaluate (text: string): Promise<any>;
    close (): Promise<void>;
}