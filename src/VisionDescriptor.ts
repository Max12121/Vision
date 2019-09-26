import { VisionEntry } from "./entry/VisionEntry";

export type VisionDescriptor = {
    // Used as hostname of the visited website.
    readonly hostname: string;

    // Used as matched entries.
    readonly entries: ReadonlyArray<VisionEntry & {
        readonly extra: {
            readonly [name: string]: string;
        };
    }>;

    // Used as list of visited uris.
    readonly uris: string[];

    // Used as descriptor creation date.
    readonly date: string;

    // Used as meta regarding the visited website.
    readonly meta: {
        readonly languages: string[];
    };
};