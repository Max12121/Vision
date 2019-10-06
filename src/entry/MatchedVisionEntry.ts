import { VisionEntry } from "./VisionEntry";

// Represents a matched entry.
export type MatchedVisionEntry = VisionEntry & {
    // Represents the version of the matched entry.
    version?: string;

    // Represents extra information related to the matched entry.
    extra?: {
        [name: string]: string;
    };
};