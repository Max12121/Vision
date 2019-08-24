import { VisionEntryAuthor } from "./VisionEntryAuthor";
import { VisionEntryFingerprint } from "./VisionEntryFingerprint";

export type VisionEntry = {
    // Represents the entry name.
    readonly name: string;

    // Represents the entry description.
    readonly description: string;

    // Represents the categories the entry belongs.
    readonly categories: Set<string>;

    // Represents the entry authors.
    readonly authors: VisionEntryAuthor[];

    // Represents a URI related to the entry.
    readonly uri: string;

    // Represents the path to a image related to the entry.
    readonly image: string;

    // Represents the entry creation year.
    readonly creationYear: string;

    // Represents the entry discontinuation year.
    readonly discontinuationYear: string;

    // Represents the fingerprint for matching the entry.
    readonly fingerprint: VisionEntryFingerprint;

    // The presence of this entry implies the presence of the entries defined in this list.
    readonly implies: Set<string>;

    // The presence of this entry implies the non-presence of the entries defined in this list.
    readonly excludes: Set<string>;
};