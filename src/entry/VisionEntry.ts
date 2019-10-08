import { VisionEntryAuthor } from "./VisionEntryAuthor";
import { VisionEntryFingerprint } from "./VisionEntryFingerprint";

// Represents a technology or service (generically referred as entry).
export type VisionEntry = {
    // Represents the entry name.
    name: string;

    // Represents the entry description.
    description?: string;

    // Represents a list containing the categories the entry belongs.
    categories?: string[];

    // Represents a list containing the entry authors.
    authors?: VisionEntryAuthor[];

    // Represents a URI related to the entry.
    uri?: string;

    // Represents the entry license, can be a common name or a URI to the license.
    license?: string;

    // Represents the entry creation year.
    creationYear?: string;

    // Represents the entry discontinuation year.
    discontinuationYear?: string;

    // Represents a reference to the entry fingerprint.
    fingerprint?: VisionEntryFingerprint;

    // Represents a list containing the entries implied by the presence of this entry.
    // The presence of this entry implies the presence of the entries defined in this list.
    implies?: string[];
};

// Returns a copy of a given entry.
export function copyEntry (entry: VisionEntry): VisionEntry {
    return JSON.parse(JSON.stringify(entry));
}