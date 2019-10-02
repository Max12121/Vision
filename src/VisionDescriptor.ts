import { MatchedVisionEntry } from "./entry/MatchedVisionEntry";

export type VisionDescriptor = {
    // Used as hostname of the visited website.
    hostname: string;

    // The matched entries.
    entries: MatchedVisionEntry[];

    // List of visited uris.
    uris: string[];

    // Descriptor creation date.
    date: string;

    // Used as meta regarding the visited website.
    meta: {
        languages: string[];
    };
};