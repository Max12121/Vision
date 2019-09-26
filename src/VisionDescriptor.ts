import { MatchedVisionEntry } from "./entry/MatchedVisionEntry";

export type VisionDescriptor = {
    // Used as hostname of the visited website.
    readonly hostname: string;

    // Used as matched entries.
    readonly entries: MatchedVisionEntry[];

    // Used as list of visited uris.
    readonly uris: string[];

    // Used as descriptor creation date.
    readonly date: string;

    // Used as meta regarding the visited website.
    readonly meta: {
        readonly languages: string[];
    };
};