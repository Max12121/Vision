// Represents the Vision parser options.
export type VisionParserOptions = {
    // Calculate the version of each entry? Setting to false may improve performance.
    evaluateEntryVersion?: boolean;

    // Calculate the extra information of each entry? Setting to false may improve performance.
    evaluateEntryExtra?: boolean;
};