import { VisionEntry } from "./VisionEntry";

export type MatchedVisionEntry = VisionEntry & {
    // Used as entry version.
    version?: string;

    // Used as extra information.
    extraInformation?: {
        [name: string]: string;
    };
};