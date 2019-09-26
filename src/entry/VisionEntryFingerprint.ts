import { VisionEntry } from "./VisionEntry";

// Represents a entry fingerprint: a set of patterns used to match the entry.
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

    // TODO: list of regular expressions used to match the URI of a web request.
    // readonly webRequests?: string[];

    // List of CSS selectors, if at least one matches at least one element then the entry is matched.
    readonly selectors?: string[];

    // Collection of regular expressions used to match scripts in the website.
    readonly scripts?: {
        // List of regular expressions used to match the value of the "src" attribute of all script elements.
        readonly sources?: string[];

        // List of regular expressions used to match the inner value of all script elements without the "src" attribute.
        readonly contents?: string[];

        // List of regular expressions used to match the keys created by scripts in the window object.
        readonly globalDeclarations?: string[];
    };

    // Collection of regular expressions used to match style sheets in the website.
    readonly styles?: {
        // List of regular expressions used to match the value of the "href" attribute of all style sheet links.
        readonly sources?: string[];

        // List of regular expressions used to match the inner value of all style elements.
        readonly contents?: string[];
    };

    // Set of regular expressions used to match meta elements.
    readonly metas?: {
        readonly [name: string]: string;
    };

    // Set of regular expressions used to match cookies.
    readonly cookies?: {
        readonly [name: string]: string;
    };

    // Set of regular expressions used to match local storage.
    readonly localStorage?: {
        readonly [name: string]: string;
    };

    // List of regular expressions used to match the value of the "href" attribute of all links (<a>).
    readonly links?: string[];

    // List of regular expressions used to match the value of the "src" attribute of all images (<img>).
    readonly images?: string[];

    // List of regular expressions used to match the value of the "src" attribute of all frames (<iframe>).
    readonly frames?: string[];

    // Represents custom code evaluated on the document.
    readonly customEvaluation?: {
        // Used as custom code evaluated on the document for matching the entry: if returns "true" then the entry will be matched.
        readonly match?: string;

        // Used as custom code evaluated on the document when the entry is matched for retrieving the version of the entry.
        readonly version?: string;

        // Used as custom code evaluated on the document when the entry is matched for retrieving extra information regarding the entry.
        readonly extra?: string;
    };
};