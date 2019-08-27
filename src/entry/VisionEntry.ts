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

    // Represents the entry license, must be a common name or a URI to the license.
    readonly license: string;

    // Represents the path to a image related to the entry.
    readonly image: string;

    // Represents the entry creation year.
    readonly creationYear: string;

    // Represents the entry discontinuation year.
    readonly discontinuationYear: string;

    // Represents the fingerprint for matching the entry.
    readonly fingerprint: VisionEntryFingerprint;

    // The presence of this entry implies the presence of the entries defined in this list.
    // Consider using this especially when a entry has no fingerprint.
    readonly implies: Set<string>;

    /*
     * This is not implemented because of the large amount of negative points.
     * 1. Requires to be constantly updated: for instance Apache excludes Nginx and the others web servers,
     * when a new web server is released, the excluded list of Apache needs to be updated with the name of the new one.
     * 2. It's not really necessary to exclude a entry: if a entry is really excluded, it will not be matched.
     * 3. Ambiguity case, if a entry is matched but it's also excluded by another entry, what we should do?
    */
    // The presence of this entry implies the non-presence of the entries defined in this list.
    // readonly excludes: Set<string>;
};