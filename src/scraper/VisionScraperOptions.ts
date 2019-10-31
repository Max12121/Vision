import { IVisionBrowser } from "../browser/IVisionBrowser";

export type VisionScraperOptions = {
    // Represents the instance of a implementation of the Vision browser. This will be used to visit webpages.
    browser?: IVisionBrowser;

    // Represents the user agent set to the web browser windows.
    userAgent?: string;
};