import { VisionEntry } from "../src/entry/VisionEntry";

export type VersionedVisionEntryList = {
    // Used as list version.
    version: string;

    // The list entries.
    entries: VisionEntry[];
};