import { VisionHTTPResponse } from "./VisionHTTPResponse";

export interface IVisionWindow {
    setUserAgent (userAgent: string): Promise<void>;
    goto (uri: string): Promise<VisionHTTPResponse>;
    evaluate (text: string): Promise<any>;
    close (): Promise<void>;
}