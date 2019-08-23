import { VisionEntryPattern } from "./VisionEntryPattern";

export type VisionEntry = {
    // Represents the entry name.
    readonly name: string;

    // Represents the entry description.
    readonly description: string;

    // Represents the categories the entry belongs.
    readonly categories: string[];

    // Represents a URI related to the entry.
    readonly uri: string;

    // Represents the path to a image related to the entry.
    readonly image: string;

    // Represents the pattern for matching the entry.
    readonly pattern: VisionEntryPattern;
};