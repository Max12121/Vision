export type VisionDescriptor = {
    // Used as hostname of the analyzed website.
    readonly hostname: string;

    // Used as list of analyzed uris.
    readonly uris: string[];

    // Used as cast date.
    readonly date: string;

    // Used as set of matched entries.
    readonly entries: {
        [name: string]: any;
    };

    readonly meta: {
        readonly language: string;
        readonly languages: Set<string>;
    };
};