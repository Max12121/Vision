import { VisionEntry } from "./VisionEntry";

export type VisionEntryPattern = {
    // Used as entry reference.
    readonly entry: VisionEntry;

    // Used as regular expressions to match header name and value.
    readonly headers?: {
        readonly [name: string]: string;
    };

    // Used as regular expressions to match the response content.
    readonly initialContent?: string[];

    // Used as regular expressions to match the content after the "load" event is fired.
    readonly loadedContent?: string[];

    // Used as regular expressions to match scripts information.
    readonly scripts?: {
        // Used as regular expressions to match content in scripts "src" attribute.
        readonly sources?: string[];

        // Used as regular expressions to match content in scripts tags.
        readonly contents?: string[];

        // Used as regular expressions to match a global name declaration.
        readonly globals?: string[];
    };

    // Used as regular expressions to match cookie name and value.
    readonly cookies?: {
        readonly [name: string]: string;
    };

    // Used as regular expressions to match local storage name and value.
    readonly storage?: {
        readonly [name: string]: string;
    };

    // Used as regular expressions to match the "name" values and "content" values of all the "meta" elements.
    readonly metas?: {
        readonly [name: string]: string;
    };

    // Used as regular expressions to match the "href" values of all the "a" elements.
    readonly links?: string[];

    // Used as regular expressions to match the "src" values of all the "iframe" elements.
    readonly frames?: string[];

    // Used as code evaluated on the visited page, if evaluated to "true" the entry will be matched.
    readonly custom?: string;

    // Used as code evaluated when the entry is matched for detecting its version.
    readonly version?: string;

    // In case the entry is matched the entries in this list will be immediately matched.
    readonly implies?: string[];

    // In case the entry is matched the entries in this list will be discarded from matching.
    readonly excludes?: string[];
};