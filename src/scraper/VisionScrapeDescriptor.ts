import { IVisionWindow } from "../browser/IVisionWindow";
import { IVisionHTTPResponse } from "../browser/IVisionHTTPResponse";

// Represents the information collected from a webpage by the Vision scraper.
export type VisionScrapeDescriptor = {
    // Represents the hostname of the scraped webpage.
    hostname: string;

    // Represents the URI of the scraped webpage.
    uri: string;

    // Represents a reference to the HTTP response to the webpage request.
    response?: IVisionHTTPResponse;

    // Represents the webpage content after the "load" event.
    loadedContent?: string;

    // Represents information related to the webpage scripts.
    scripts?: {
        // Represents a list containing the "src" values of all the "script" elements,
        // populated after the "load" event.
        sources?: string[];

        // Represents a list containing the inline values of all the "script" elements,
        // populated after the "load" event.
        contents?: string[];

        // Represents a list contaning the keys of the "window" object,
        // populated after the "load" event.
        globalDeclarations?: string[];
    };

    // Represents information related to the webpage styles.
    styles?: {
        // Represents a list contaning the "href" values of all the "link[rel=stylesheet][href]" elements,
        // populated after the "load" event.
        sources?: string[];

        // Represents a list contaning the inline values of all the "style" elements,
        // populated after the "load" event.
        contents?: string[];
    };

    // Represents a set contaning all meta elements keys and values (name and content),
    // populated after the "load" event.
    metas?: {
        [name: string]: string;
    };

    // Represents a set contaning all cookies keys and values,
    // populated after the "load" event.
    cookies?: {
        [name: string]: string;
    };

    // Represents a set contaning all local storage keys and values,
    // populated after the "load" event.
    localStorage?: {
        [name: string]: string;
    };

    // Represents a list contaning the "href" values of all links (<a>),
    // populated before and after the "load" event.
    links?: string[];

    // Represents a list contaning the "src" values of all images (<img>),
    // populated before and after the "load" event.
    images?: string[];

    // Represents a list contaning the "src" values of all the "iframe" elements,
    // populated after the "load" event is fired.
    frames?: string[];

    // Represents a list contaning the languages the scraped webpage is available.
    languages?: string[];

    // Represents a reference to the window that visited the scraped webpage.
    window?: IVisionWindow;
};

// Used to free a scrape descriptor.
export async function freeScrapeDescriptor (scrapeDescriptor: VisionScrapeDescriptor): Promise<void> {
    if (scrapeDescriptor.window) {
        await scrapeDescriptor.window.close();
    }
}