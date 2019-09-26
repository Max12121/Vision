import { VisionEntry } from "./VisionEntry";

export type MatchedVisionEntry = VisionEntry & {
    // Used as entry version.
    readonly version?: string;

    // Used as extra information.
    readonly extraInformation?: {
        readonly [name: string]: string;
    };
};