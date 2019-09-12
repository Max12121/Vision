import { VisionEntryAuthor } from "./VisionEntryAuthor";
import { VisionEntryFingerprint } from "./VisionEntryFingerprint";

// Represents a technology or service, generically referred as entry.
export type VisionEntry = {
    // Used as entry name.
    readonly name: string;

    // Used as entry description.
    readonly description?: string;

    // The categories the entry belongs.
    readonly categories?: Set<string>;

    // The entry authors.
    readonly authors?: VisionEntryAuthor[];

    // Used as entry URI.
    readonly uri?: string;

    // Used as entry license, can be a common name or a URI to the license.
    readonly license?: string;

    // Used as entry creation year.
    readonly creationYear?: string;

    // Used as entry discontinuation year.
    readonly discontinuationYear?: string;

    // Used as entry fingerprint.
    readonly fingerprint?: VisionEntryFingerprint;

    // The presence of this entry implies the presence of the entries defined in this list.
    readonly implies?: Set<string>;

    // The presence of this entry implies the non-presence of the entries defined in this list.
    // readonly excludes: Set<string>;
    /*
     * This is not implemented because of the large amount of negative points.
     * 1. Requires to be constantly updated: for instance Apache excludes Nginx and the others web servers,
     * when a new web server is released, the excluded list of Apache needs to be updated with the name of the new one.
     * 2. It's not really necessary to exclude a entry: if a entry is really excluded, it will not be matched.
     * 3. Ambiguity case, if a entry is matched but it's also excluded by another entry, what we should do?
    */
};