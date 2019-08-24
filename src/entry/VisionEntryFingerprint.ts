import { VisionEntry } from "./VisionEntry";

export type VisionEntryFingerprint = {
    // Used as reference to the entry.
    readonly entry: VisionEntry;

    // Set of regular expressions used to match the response headers.
    readonly headers?: {
        readonly [name: string]: string;
    };

    // List of regular expressions used to match the response body.
    readonly initialContent?: string[];

    // List of regular expressions used to match the body of the document after the "load" event is fired.
    readonly loadedContent?: string[];

    // Collection of regular expressions used to match scripts in the document.
    readonly scripts?: {
        // List of regular expressions used to match the value of the "src" attribute of all scripts.
        readonly sources?: string[];

        // List of regular expressions used to match the inner value of all scripts.
        readonly contents?: string[];

        // List of regular expressions used to match the keys created by scripts in the window object.
        readonly globalDeclarations?: string[];
    };

    // Set of regular expressions used to match cookies.
    readonly cookies?: {
        readonly [name: string]: string;
    };

    // Set of regular expressions used to match local storage.
    readonly localStorage?: {
        readonly [name: string]: string;
    };

    // Set of regular expressions used to match meta elements.
    readonly metas?: {
        readonly [name: string]: string;
    };

    // List of regular expressions used to match the value of the "href" attribute of all links (<a>).
    readonly links?: string[];

    // List of regular expressions used to match the value of the "src" attribute of all iframes.
    readonly frames?: string[];

    // Used as code evaluated on the document.
    readonly evaluation?: {
        // Used as code evaluated on the document for matching the entry: if returns "true" then the entry will be matched.
        readonly match?: string;
        
        // Used as code evaluated on the document when the entry is matched for detecting its version.
        readonly version?: string;

        // Used as code evaluated on the document when the entry is matched for retrieving additional information.
        readonly additional?: string;
    };
};