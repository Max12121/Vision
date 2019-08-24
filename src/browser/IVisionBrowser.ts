import { IVisionWindow } from "./IVisionWindow";

export interface IVisionBrowser {
    open (): Promise<void>;
    openWindow (): Promise<IVisionWindow>;
    close (): Promise<void>;
}