import { MatchedVisionEntry } from "./entry/MatchedVisionEntry";

// Represents the Vision cast output.
export type VisionDescriptor = {
    // Represents the hostname of the visited website.
    hostname: string;

    // Represents a list containing the matched entries.
    entries: MatchedVisionEntry[];

    // Represents a list containing the visited uris.
    uris: string[];

    // Represents the descriptor creation date.
    date: string;

    // Represents meta related to the visited website.
    meta: {
        // Represents a list containing the languages the visited website is available.
        languages: string[];
    };
};