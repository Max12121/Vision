import { VisionEntryPattern } from "../entry/VisionEntryPattern";
import { VisionEntrySet } from "../entry/VisionEntrySet";
import { VisionScrapeDescriptor } from "../scraper/VisionScrapeDescriptor";
import { VisionParserDictionary } from "./VisionParserDictionary";

export class VisionParser {
    private readonly _entries: VisionEntrySet;

    public constructor (entries: VisionEntrySet) {
        this._entries = entries;
    }

    public match (descriptor: VisionScrapeDescriptor): VisionEntrySet {
        const matchedEntries: VisionEntrySet = new VisionEntrySet();
        // const excluded: Set<string> = new Set();

        for (const entry of this._entries.toArray()) {
            if (entryPatternMatchesDescriptor(entry.pattern, descriptor)) {
                matchedEntries.add(entry);
            }
        }

        return matchedEntries;
    }
}

export function entryPatternMatchesDescriptor (pattern: VisionEntryPattern, descriptor: VisionScrapeDescriptor): boolean {
    return (
        entryPatternMatchesHeaders(pattern, descriptor)
        ||
        entryPatternMatchesInitialContent(pattern, descriptor)
        ||
        entryPatternMatchesLoadedContent(pattern, descriptor)
        ||
        entryPatternMatchesScripts(pattern, descriptor)
    );
}

export function entryPatternMatchesHeaders (pattern: VisionEntryPattern, descriptor: VisionScrapeDescriptor): boolean {
    const headersPattern: VisionParserDictionary = pattern.headers;

    if (!headersPattern || !descriptor.response || !descriptor.response.headers) {
        return false;
    }

    const descriptorHeaders: VisionParserDictionary = descriptor.response.headers;

    if (Object.keys(headersPattern).length === 0 || Object.keys(descriptorHeaders).length === 0) {
        return false;
    }

    return patternsMatchesDictionary(headersPattern, descriptorHeaders);
}

export function entryPatternMatchesInitialContent (pattern: VisionEntryPattern, descriptor: VisionScrapeDescriptor): boolean {
    const initialContentPatterns: string[] = pattern.initialContent;

    if (!initialContentPatterns || !descriptor.response || !descriptor.response.body) {
        return false;
    }

    return patternsMatchesList(initialContentPatterns, [ descriptor.response.body ]);
}

export function entryPatternMatchesLoadedContent (pattern: VisionEntryPattern, descriptor: VisionScrapeDescriptor): boolean {
    const loadedContentPatterns: string[] = pattern.loadedContent;
    const descriptorLoadedContent: string = descriptor.loadedContent;

    if (!loadedContentPatterns || !descriptorLoadedContent) {
        return false;
    }

    return patternsMatchesList(loadedContentPatterns, [ descriptorLoadedContent ]);
}

export function entryPatternMatchesScripts (pattern: VisionEntryPattern, descriptor: VisionScrapeDescriptor): boolean {
    return (
        entryPatternMatchesScriptsSources(pattern, descriptor)
        ||
        entryPatternMatchesScriptsContents(pattern, descriptor)
        ||
        entryPatternMatchesScriptsGlobals(pattern, descriptor)
    );
}

export function entryPatternMatchesScriptsSources (pattern: VisionEntryPattern, descriptor: VisionScrapeDescriptor): boolean {
    if (!pattern.scripts || !descriptor.scripts) {
        return false;
    }

    const scriptsSourcesPatterns: string[] = pattern.scripts.sources;
    const descriptorScriptsSources: string[] = descriptor.scripts.sources;

    if (!scriptsSourcesPatterns || !descriptorScriptsSources) {
        return false;
    }

    return patternsMatchesList(scriptsSourcesPatterns, descriptorScriptsSources);
}

export function entryPatternMatchesScriptsContents (pattern: VisionEntryPattern, descriptor: VisionScrapeDescriptor): boolean {
    if (!pattern.scripts || !descriptor.scripts) {
        return false;
    }

    const scriptsContentsPatterns: string[] = pattern.scripts.contents;
    const descriptorScriptsContents: string[] = descriptor.scripts.contents;

    if (!scriptsContentsPatterns || !descriptorScriptsContents) {
        return false;
    }

    return patternsMatchesList(scriptsContentsPatterns, descriptorScriptsContents);
}

export function entryPatternMatchesScriptsGlobals (pattern: VisionEntryPattern, descriptor: VisionScrapeDescriptor): boolean {
    if (!pattern.scripts || !descriptor.scripts) {
        return false;
    }

    const scriptsGlobalsPatterns: string[] = pattern.scripts.globals;
    const descriptorScriptsGlobals: string[] = descriptor.scripts.globals;

    if (!scriptsGlobalsPatterns || !descriptorScriptsGlobals) {
        return false;
    }

    return patternsMatchesList(scriptsGlobalsPatterns, descriptorScriptsGlobals);
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

function patternsMatchesList (patterns: string[], haystack: string[]): boolean {
    for (const pattern of patterns) {
        const patternRegExp: RegExp = new RegExp(pattern);

        for (const item of haystack) {
            if (patternRegExp.test(item)) {
                return true;
            }
        }
    }

    return false;
}