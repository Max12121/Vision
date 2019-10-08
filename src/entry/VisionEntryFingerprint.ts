// Represents a entry fingerprint: a set of patterns used to match a entry.
export type VisionEntryFingerprint = {
    // Represents a set of regular expressions used to match the response headers.
    headers?: {
        [name: string]: string;
    };

    // Represents a list of regular expressions used to match the HTTP response body of a website.
    initialContent?: string[];

    // Represents a list of regular expressions used to match the source of a website after the "load" event.
    loadedContent?: string[];

    // Represents a list of CSS selectors, if at least one matches at least one element then the entry is matched.
    // The selectors are queried after the "load" event.
    selectors?: string[];

    // Represents a collection of regular expressions used to match scripts in a website.
    scripts?: {
        // Represents a list of regular expressions used to match the
        // value of the "src" attribute of all script elements (<script>).
        sources?: string[];

        // Represents a list of regular expressions used to match the
        // inner value of all script elements (without the "src" attribute).
        contents?: string[];

        // Represents a list of regular expressions used to match the
        // keys created by scripts in the window object (the global declarations).
        globalDeclarations?: string[];
    };

    // Represents a collection of regular expressions used to match style sheets in the website.
    styles?: {
        // Represents a list of regular expressions used to match the
        // value of the "href" attribute of all style sheet links (<link>).
        sources?: string[];

        // Represents a list of regular expressions used to match the
        // inner value of all style elements (<style>).
        contents?: string[];
    };

    // Represents a set of regular expressions used to match meta elements.
    metas?: {
        [name: string]: string;
    };

    // Represents a set of regular expressions used to match cookies.
    cookies?: {
        [name: string]: string;
    };

    // Represents a set of regular expressions used to match local storage.
    localStorage?: {
        [name: string]: string;
    };

    // Represents a list of regular expressions used to match the
    // value of the "href" attribute of all links (<a>).
    links?: string[];

    // Represents a list of regular expressions used to match the
    // value of the "src" attribute of all images (<img>).
    images?: string[];

    // Represents a list of regular expressions used to match the
    // value of the "src" attribute of all frames (<iframe>).
    frames?: string[];

    // Represents custom code snippets evaluated on the document.
    customEvaluation?: {
        // Represents a custom code evaluated on the document for matching
        // the entry: if the custom code returns "true" then the entry will be matched.
        match?: string;

        // Represents a custom code evaluated on the document if the entry is matched,
        // for retrieving the version of the entry.
        // The custom code must return a string containing the version.
        version?: string;

        // Represents a custom code evaluated on the document if the entry is matched,
        // for retrieving extra information related to the matched entry.
        // The custom code must return an object containing the extra information.
        extra?: string;
    };
};