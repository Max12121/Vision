export type VisionDescriptor = {
    // Used as hostname.
    readonly hostname: string;

    // Used as list of uris.
    readonly uris: string[];

    // Used as date.
    readonly date: string;

    // Used as set of matched entries.
    readonly entries: {
        [name: string]: any;
    };

    readonly meta: {
        readonly languages: Set<string>;
    };
};