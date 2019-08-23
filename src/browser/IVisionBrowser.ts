import { IVisionPage } from "./IVisionPage";

export interface IVisionBrowser {
    open (): Promise<void>;
    openPage (): Promise<IVisionPage>;
    close (): Promise<void>;
}