import { VisionEntry } from "../entry/VisionEntry";
import { VisionEntryFingerprint } from "../entry/VisionEntryFingerprint";
import { VisionEntrySet } from "../entry/VisionEntrySet";
import { VisionScrapeDescriptor } from "../scraper/VisionScrapeDescriptor";
import { VisionParserDictionary } from "./VisionParserDictionary";
import { VisionParserMatcherSet } from "./VisionParserMatcherSet";

export class VisionParser {
    private static readonly _matchers: VisionParserMatcherSet = new VisionParserMatcherSet();
    private readonly _entries: VisionEntrySet;

    public constructor (entries?: VisionEntrySet) {
        this._entries = entries || new VisionEntrySet();
    }

    public get entries (): VisionEntrySet {
        return this._entries;
    }

    public match (scrapeDescriptor: VisionScrapeDescriptor): VisionEntrySet {
        const matchedEntries: VisionEntrySet = new VisionEntrySet();
        const impliedEntries: Set<string> = new Set();
        const excludedEntries: Set<string> = new Set();
        const addEntry: Function = (entry: VisionEntry): void => {
            matchedEntries.add(entry);

            if (Array.isArray(entry.implies)) {
                entry.implies.forEach((entryName: string): void => {
                    impliedEntries.add(entryName);
                });
            }

            if (Array.isArray(entry.excludes)) {
                entry.excludes.forEach((entryName: string): void => {
                    excludedEntries.add(entryName);
                });
            }
        };

        for (const entry of this._entries.toArray()) {
            if (excludedEntries.has(entry.name)) {
                continue;
            }

            if (impliedEntries.has(entry.name)) {
                addEntry(entry);
                continue;
            }

            for (const matcher of VisionParser.matchers.toArray()) {
                if (matcher.matches(entry.fingerprint, scrapeDescriptor)) {
                    addEntry(entry);
                    break;
                }
            }
        }

        return matchedEntries;
    }

    public static get matchers (): VisionParserMatcherSet {
        return this._matchers;
    }
}

function patternsMatchesList (patterns: string[], haystack: string[]): boolean {
    for (const pattern of patterns) {
        const patternRegExp: RegExp = new RegExp(pattern);

        for (const hay of haystack) {
            if (patternRegExp.test(hay)) {
                return true;
            }
        }
    }

    return false;
}

function patternsMatchesDictionary (patterns: VisionParserDictionary, haystack: VisionParserDictionary): boolean {
    for (const patternKey in patterns) {
        const patternKeyRegExp: RegExp = new RegExp(patternKey);
        const patternValueRegExp: RegExp = new RegExp(patterns[patternKey]);

        for (const hayKey in haystack) {
            const hayValue: string = haystack[hayKey];

            if (patternKeyRegExp.test(hayKey) && patternValueRegExp.test(hayValue)) {
                return true;
            }
        }
    }

    return false;
}

VisionParser.matchers.add({
    name: "headers",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        const headersPatterns: VisionParserDictionary = entryFingerprint.headers;

        if (typeof headersPatterns !== "object" || typeof scrapeDescriptor.response !== "object") {
            return false;
        }

        if (typeof scrapeDescriptor.response.headers !== "object") {
            return false;
        }

        const descriptorHeaders: VisionParserDictionary = scrapeDescriptor.response.headers;

        if (Object.keys(headersPatterns).length === 0 || Object.keys(descriptorHeaders).length === 0) {
            return false;
        }

        return patternsMatchesDictionary(headersPatterns, descriptorHeaders);
    },
});

VisionParser.matchers.add({
    name: "initialContent",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        const initialContentPatterns: string[] = entryFingerprint.initialContent;

        if (!Array.isArray(initialContentPatterns) || typeof scrapeDescriptor.response !== "object") {
            return false;
        }

        const descriptorInitialContent: string = scrapeDescriptor.response.body;

        if (typeof descriptorInitialContent !== "string") {
            return false;
        }

        return patternsMatchesList(initialContentPatterns, [ descriptorInitialContent ]);
    },
});

VisionParser.matchers.add({
    name: "loadedContent",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        const loadedContentPatterns: string[] = entryFingerprint.loadedContent;
        const descriptorLoadedContent: string = scrapeDescriptor.loadedContent;

        if (!Array.isArray(loadedContentPatterns) || typeof descriptorLoadedContent !== "string") {
            return false;
        }

        return patternsMatchesList(loadedContentPatterns, [ descriptorLoadedContent ]);
    },
});

VisionParser.matchers.add({
    name: "scripts/sources",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        if (typeof entryFingerprint.scripts !== "object" || typeof scrapeDescriptor.scripts !== "object") {
            return false;
        }

        const scriptsSourcesPatterns: string[] = entryFingerprint.scripts.sources;
        const descriptorScriptsSources: string[] = scrapeDescriptor.scripts.sources;

        if (!Array.isArray(scriptsSourcesPatterns) || !Array.isArray(descriptorScriptsSources)) {
            return false;
        }

        return patternsMatchesList(scriptsSourcesPatterns, descriptorScriptsSources);
   },
});

VisionParser.matchers.add({
    name: "scripts/contents",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        if (typeof entryFingerprint.scripts !== "object" || typeof scrapeDescriptor.scripts !== "object") {
            return false;
        }

        const scriptsContentsPatterns: string[] = entryFingerprint.scripts.contents;
        const descriptorScriptsContents: string[] = scrapeDescriptor.scripts.contents;

        if (!Array.isArray(scriptsContentsPatterns) || !Array.isArray(descriptorScriptsContents)) {
            return false;
        }

        return patternsMatchesList(scriptsContentsPatterns, descriptorScriptsContents);
    },
});

VisionParser.matchers.add({
    name: "scripts/globalDeclarations",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        if (typeof entryFingerprint.scripts !== "object" || typeof scrapeDescriptor.scripts !== "object") {
            return false;
        }

        const scriptsGlobalsPatterns: string[] = entryFingerprint.scripts.globalDeclarations;
        const descriptorScriptsGlobals: string[] = scrapeDescriptor.scripts.globalDeclarations;

        if (!Array.isArray(scriptsGlobalsPatterns) || !Array.isArray(descriptorScriptsGlobals)) {
            return false;
        }

        return patternsMatchesList(scriptsGlobalsPatterns, descriptorScriptsGlobals);
    },
});

VisionParser.matchers.add({
    name: "cookies",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        const cookiesPatterns: VisionParserDictionary = entryFingerprint.cookies;
        const descriptorCookies: VisionParserDictionary = scrapeDescriptor.cookies;

        if (typeof cookiesPatterns !== "object" || typeof descriptorCookies !== "object") {
            return false;
        }

        if (Object.keys(cookiesPatterns).length === 0 || Object.keys(descriptorCookies).length === 0) {
            return false;
        }

        return patternsMatchesDictionary(cookiesPatterns, descriptorCookies);
    },
});

VisionParser.matchers.add({
    name: "localStorage",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        const localStoragePatterns: VisionParserDictionary = entryFingerprint.localStorage;
        const descriptorLocalStorage: VisionParserDictionary = scrapeDescriptor.localStorage;

        if (typeof localStoragePatterns !== "object" || typeof descriptorLocalStorage !== "object") {
            return false;
        }

        if (Object.keys(localStoragePatterns).length === 0 || Object.keys(descriptorLocalStorage).length === 0) {
            return false;
        }

        return patternsMatchesDictionary(localStoragePatterns, descriptorLocalStorage);
    },
});

VisionParser.matchers.add({
    name: "links",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        const linksPatterns: string[] = entryFingerprint.links;
        const descriptorLinks: string[] = scrapeDescriptor.links;

        if (!Array.isArray(linksPatterns) || !Array.isArray(descriptorLinks)) {
            return false;
        }

        return patternsMatchesList(linksPatterns, descriptorLinks);
    }
});

VisionParser.matchers.add({
    name: "frames",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        const framesPatterns: string[] = entryFingerprint.frames;
        const descriptorFrames: string[] = scrapeDescriptor.frames;

        if (!Array.isArray(framesPatterns) || !Array.isArray(descriptorFrames)) {
            return false;
        }

        return patternsMatchesList(framesPatterns, descriptorFrames);
    }
});