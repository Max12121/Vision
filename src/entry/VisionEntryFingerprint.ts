// Represents a entry fingerprint: a set of patterns used to match a entry.
export type VisionEntryFingerprint = {
    // Set of regular expressions used to match the response headers.
    headers?: {
        [name: string]: string;
    };

    // List of regular expressions used to match the website HTTP response body.
    initialContent?: string[];

    // List of regular expressions used to match the source of the website after the "load" event.
    loadedContent?: string[];

    // TODO: list of regular expressions used to match the URI of a web request.
    // readonly webRequests?: string[];

    // List of CSS selectors, if at least one matches at least one element then the entry is matched.
    // The selectors are queried after the "load" event.
    selectors?: string[];

    // Collection of regular expressions used to match scripts in the website.
    scripts?: {
        // List of regular expressions used to match the value of the "src" attribute of all script elements.
        sources?: string[];

        // List of regular expressions used to match the inner value of all script elements (without the "src" attribute).
        contents?: string[];

        // List of regular expressions used to match the keys created by scripts in the window object.
        globalDeclarations?: string[];
    };

    // Collection of regular expressions used to match style sheets in the website.
    styles?: {
        // List of regular expressions used to match the value of the "href" attribute of all style sheet links.
        sources?: string[];

        // List of regular expressions used to match the inner value of all style elements.
        contents?: string[];
    };

    // Set of regular expressions used to match meta elements.
    metas?: {
        [name: string]: string;
    };

    // Set of regular expressions used to match cookies.
    cookies?: {
        [name: string]: string;
    };

    // Set of regular expressions used to match local storage.
    localStorage?: {
        [name: string]: string;
    };

    // List of regular expressions used to match the value of the "href" attribute of all links (<a>).
    links?: string[];

    // List of regular expressions used to match the value of the "src" attribute of all images (<img>).
    images?: string[];

    // List of regular expressions used to match the value of the "src" attribute of all frames (<iframe>).
    frames?: string[];

    // Represents custom code evaluated on the document.
    customEvaluation?: {
        // Used as custom code evaluated on the document for matching the entry: if returns "true" then the entry will be matched.
        match?: MatchAction | string;

        // Used as custom code evaluated on the document when the entry is matched for retrieving the version of the entry.
        version?: VersionAction | string;

        // Used as custom code evaluated on the document when the entry is matched for retrieving extra information
        // related to the matched entry.
        extra?: ExtraAction | string;
    };
};

export type MatchAction = () => boolean;

export type VersionAction = () => string;

export type ExtraAction = () => {
    [hash: string]: string;
};