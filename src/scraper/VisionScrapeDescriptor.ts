import { IVisionWindow } from "../browser/IVisionWindow";
import { IVisionHTTPResponse } from "../browser/IVisionHTTPResponse";

export type VisionScrapeDescriptor = {
    // Used as hostname.
    readonly hostname: string;

    // Used as requested URI.
    readonly uri: string;

    // Used as HTTP response.
    readonly response: IVisionHTTPResponse;

    // Used as page content after the "load" event is fired.
    readonly loadedContent: string;

    // Used as scripts information.
    readonly scripts: {
        // Used as "src" values of all the "script" elements,
        // populated after the "load" event is fired.
        readonly sources: string[];

        // Used as inline values of all the "script" elements,
        // populated after the "load" event is fired.
        readonly contents: string[];

        // Used as keys of the "window" object,
        // populated after the "load" event is fired.
        readonly globalDeclarations: string[];
    };

    // Used as styles information.
    readonly styles: {
        // Used to hold the "href" values of all the "link[rel=stylesheet][href]" elements,
        // populated after the "load" event is fired.
        readonly sources?: string[];

        // Used to hold the inline values of all the "style" elements,
        // populated after the "load" event is fired.
        readonly contents?: string[];
    };

    // Represents all meta elements keys and values (name and content),
    // populated after the "load" event is fired.
    readonly metas: {
        readonly [name: string]: string;
    };

    // Represents all cookies keys and values,
    // populated after the "load" event is fired.
    readonly cookies: {
        readonly [name: string]: string;
    };

    // Represents all local storage keys and values,
    // populated after the "load" event is fired.
    readonly localStorage: {
        readonly [name: string]: string;
    };

    // Represents the "href" values of all links (<a>),
    // populated after the "load" event.
    readonly links: string[];

    // Represents the "src" values of all images (<img>),
    // populated after the "load" event.
    readonly images: string[];

    // Represents the "src" values of all the "iframe" elements,
    // populated after the "load" event is fired.
    readonly frames: string[];

    // Used as page language.
    readonly language: string;

    // Used as languages the scraped website is available.
    readonly languages: string[];

    // Used as browser window reference.
    readonly window?: IVisionWindow;
};