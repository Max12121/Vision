import { IVisionWindow } from "../browser/IVisionWindow";
import { IVisionHTTPResponse } from "../browser/IVisionHTTPResponse";

// Represents the Vision scraper output of a scraped webpage.
export type VisionScrapeDescriptor = {
    // Used as hostname.
    hostname?: string;

    // Used as requested URI.
    uri?: string;
    
    // Used as date.
    date?: string;

    // Used as HTTP response.
    response?: IVisionHTTPResponse;

    // Used as page content after the "load" event is fired.
    loadedContent?: string;

    // Used as scripts information.
    scripts?: {
        // Used as "src" values of all the "script" elements,
        // populated after the "load" event is fired.
        sources?: string[];

        // Used as inline values of all the "script" elements,
        // populated after the "load" event is fired.
        contents?: string[];

        // Used as keys of the "window" object,
        // populated after the "load" event is fired.
        globalDeclarations?: string[];
    };

    // Used as styles information.
    styles?: {
        // Used to hold the "href" values of all the "link[rel=stylesheet][href]" elements,
        // populated after the "load" event is fired.
        sources?: string[];

        // Used to hold the inline values of all the "style" elements,
        // populated after the "load" event is fired.
        contents?: string[];
    };

    // Represents all meta elements keys and values (name and content),
    // populated after the "load" event is fired.
    metas?: {
        [name: string]: string;
    };

    // Represents all cookies keys and values,
    // populated after the "load" event is fired.
    cookies?: {
        [name: string]: string;
    };

    // Represents all local storage keys and values,
    // populated after the "load" event is fired.
    localStorage?: {
        [name: string]: string;
    };

    // Represents the "href" values of all links (<a>),
    // populated after the "load" event.
    links?: string[];

    // Represents the "src" values of all images (<img>),
    // populated after the "load" event.
    images?: string[];

    // Represents the "src" values of all the "iframe" elements,
    // populated after the "load" event is fired.
    frames?: string[];

    // Used as languages the scraped document is available.
    languages?: string[];

    // Used as browser window reference.
    window?: IVisionWindow;
};

// Used to free a scrape descriptor.
export async function freeScrapeDescriptor (scrapeDescriptor: VisionScrapeDescriptor): Promise<void> {
    await scrapeDescriptor.window.close();
}