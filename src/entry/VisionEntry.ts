import { VisionEntryAuthor } from "./VisionEntryAuthor";
import { VisionEntryFingerprint } from "./VisionEntryFingerprint";

// Represents a technology or service.
export type VisionEntry = {
    // Used as entry name.
    name: string;

    // Used as entry description.
    description?: string;

    // The categories the entry belongs.
    categories?: string[];

    // The entry authors.
    authors?: VisionEntryAuthor[];

    // Used as entry URI.
    uri?: string;

    // Used as entry license, can be a common name or a URI to the license.
    license?: string;

    // Used as entry creation year.
    creationYear?: string;

    // Used as entry discontinuation year.
    discontinuationYear?: string;

    // Used as entry fingerprint.
    fingerprint?: VisionEntryFingerprint;

    // The presence of this entry implies the presence of the entries defined in this list.
    implies?: string[];

    // The presence of this entry implies the non-presence of the entries defined in this list.
    // readonly excludes?: string[];
    /*
     * The previous definition is not implemented because of the large amount of negative points.
     * 1. Requires to be constantly updated: for instance Apache excludes Nginx and the others web servers,
     * when a new web server is released, the excluded list of Apache needs to be updated with the name of the new one.
     * 2. It's not really necessary to exclude a entry: if a entry is really excluded, it will not be matched.
     * 3. Contradiction case, if a entry is matched but it's also excluded by another entry, what we should do?
    */
};

// Returns a copy of a given entry.
export function copyEntry (entry: VisionEntry): VisionEntry {
    return JSON.parse(JSON.stringify(entry));
}