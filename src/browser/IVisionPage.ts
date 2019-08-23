import { VisionHTTPResponse } from "./VisionHTTPResponse";

export interface IVisionPage {
    goto (uri: string): Promise<VisionHTTPResponse>;
    evaluate (text: string): Promise<any>;
    close (): Promise<void>;
}