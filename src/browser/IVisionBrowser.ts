import { IVisionWindow } from "./IVisionWindow";

// Represents the browser used by Vision to navigate websites.
export interface IVisionBrowser {
    open (): Promise<void>;
    openWindow (): Promise<IVisionWindow>;
    close (): Promise<void>;
}