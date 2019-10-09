import { MatchedVisionEntry } from "../entry/MatchedVisionEntry";
import { VisionEntry, copyEntry } from "../entry/VisionEntry";
import { VisionEntryFingerprint } from "../entry/VisionEntryFingerprint";
import { VisionEntrySet } from "../entry/VisionEntrySet";
import { VisionScrapeDescriptor } from "../scraper/VisionScrapeDescriptor";
import { VisionParserDictionary } from "./VisionParserDictionary";
import { VisionParserMatchSet } from "./VisionParserMatchSet";
import { VisionParserMatcher } from "./VisionParserMatcher";
import { VisionParserMatcherSet } from "./VisionParserMatcherSet";
import { VisionParserOptions } from "./VisionParserOptions";

export const defaultOptions: VisionParserOptions = {
    evaluateEntryVersion: true,
    evaluateEntryExtra: true,
};

export class VisionParser {
    private static readonly _matchers: VisionParserMatcherSet = new VisionParserMatcherSet();

    private readonly _entries: VisionEntrySet;
    private readonly _options: VisionParserOptions;

    public constructor (entries: VisionEntrySet = new VisionEntrySet(), options: VisionParserOptions = {}) {
        this._entries = entries;
        this._options = {
            ...defaultOptions,
            ...options,
        };
    }

    public get entries (): VisionEntrySet {
        return this._entries;
    }

    public get options (): VisionParserOptions {
        return this._options;
    }

    public async match (scrapeDescriptor: VisionScrapeDescriptor): Promise<VisionParserMatchSet> {
        const matchers: VisionParserMatcher[] = VisionParser.matchers.valuesToArray();
        const matched: VisionParserMatchSet = new VisionParserMatchSet();
        const addMatch: Function = async (entry: VisionEntry, matcher: VisionParserMatcher | null, impliedBy: VisionEntry | null): Promise<void> => {
            const matchedEntry: MatchedVisionEntry = copyEntry(entry);
            let matchedEntryVersion: string | null;
            let matchedEntryExtra: {
                [name: string]: string;
            } | null;

            if (entry.fingerprint) {
                if (this._options.evaluateEntryVersion) {
                    matchedEntryVersion = await evaluateEntryVersion(entry.fingerprint, scrapeDescriptor);

                    if (matchedEntryVersion) {
                        matchedEntry.version = matchedEntryVersion;
                    }
                }

                if (this._options.evaluateEntryExtra) {
                    matchedEntryExtra = await evaluateEntryExtra(entry.fingerprint, scrapeDescriptor);

                    if (matchedEntryExtra) {
                        matchedEntry.extra = matchedEntryExtra;
                    }
                }
            }

            matched.add({
                parser: this,
                scrapeDescriptor,
                matchedEntry,
                entryMatcher: matcher,
                entryImpliedBy: impliedBy,
            });

            if (entry.implies) {
                for (const impliedEntryName of entry.implies) {
                    if (!matched.has(impliedEntryName)) {
                        const impliedEntry: VisionEntry | null = this._entries.get(impliedEntryName);

                        // TODO: log a message in case impliedEntry is null.
                        if (impliedEntry) {
                            await addMatch(this._entries.get(impliedEntryName), null, entry);
                        }
                    }
                }
            }
        };

        for (const entry of this._entries.valuesToArray()) {
            if (!entry.fingerprint || matched.has(entry.name)) {
                continue;
            }

            for (const matcher of matchers) {
                const matched: boolean = await matcher.matches(entry.fingerprint, scrapeDescriptor);

                if (matched) {
                    await addMatch(entry, matcher, null);

                    break;
                }
            }
        }

        return matched;
    }

    public static get matchers (): VisionParserMatcherSet {
        return this._matchers;
    }
}

export async function evaluateEntryVersion (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): Promise<string | null> {
    if (
        !entryFingerprint.customEvaluation ||
        !entryFingerprint.customEvaluation.version ||
        !scrapeDescriptor.window
    ) {
        return null;
    }

    const versionEvaluation: string = entryFingerprint.customEvaluation.version;

    try {
        return "" + await scrapeDescriptor.window.evaluate(versionEvaluation);
    }
    catch (error) {
        return null;
    }
}

export async function evaluateEntryExtra (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): Promise<{
    [name: string]: string;
} | null> {
    if (
        !entryFingerprint.customEvaluation ||
        !entryFingerprint.customEvaluation.extra ||
        !scrapeDescriptor.window
    ) {
        return null;
    }

    const extraEvaluation: string = entryFingerprint.customEvaluation.extra;

    try {
        return {
            ...(await scrapeDescriptor.window.evaluate(extraEvaluation)),
        };
    }
    catch (error) {
        return null;
    }
}

VisionParser.matchers.add({
    name: "headers",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        if (
            !entryFingerprint.headers ||
            !scrapeDescriptor.response ||
            !scrapeDescriptor.response.headers
        ) {
            return false;
        }

        const headersPatterns: VisionParserDictionary = entryFingerprint.headers;
        const descriptorHeaders: VisionParserDictionary = scrapeDescriptor.response.headers;

        return patternsMatchesDictionary(headersPatterns, descriptorHeaders);
    },
});

VisionParser.matchers.add({
    name: "initialContent",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        if (
            !entryFingerprint.initialContent ||
            !scrapeDescriptor.response ||
            !scrapeDescriptor.response.body
        ) {
            return false;
        }

        const initialContentPatterns: string[] = entryFingerprint.initialContent;
        const descriptorInitialContent: string = scrapeDescriptor.response.body;

        return patternsMatchesList(initialContentPatterns, [ descriptorInitialContent ]);
    },
});

VisionParser.matchers.add({
    name: "loadedContent",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        if (
            !entryFingerprint.loadedContent ||
            !scrapeDescriptor.loadedContent
        ) {
            return false;
        }

        const loadedContentPatterns: string[] = entryFingerprint.loadedContent;
        const descriptorLoadedContent: string = scrapeDescriptor.loadedContent;

        return patternsMatchesList(loadedContentPatterns, [ descriptorLoadedContent ]);
    },
});

VisionParser.matchers.add({
    name: "selectors",
    async matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): Promise<boolean> {
        if (
            !entryFingerprint.selectors ||
            !scrapeDescriptor.window
        ) {
            return false;
        }

        const selectors: string[] = entryFingerprint.selectors;
        const selector: string = selectors.join(",");

        try {
            const selectorMatchesElement: boolean | string = await scrapeDescriptor.window.evaluate(`(function () {
                return window.document.querySelectorAll("${selector}").length !== 0;
            })();`);

            return selectorMatchesElement === true || selectorMatchesElement === "true";
        }
        catch (error) {
            return false;
        }
    },
});

VisionParser.matchers.add({
    name: "scripts::sources",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        if (
            !entryFingerprint.scripts ||
            !entryFingerprint.scripts.sources ||
            !scrapeDescriptor.scripts ||
            !scrapeDescriptor.scripts.sources
        ) {
            return false;
        }

        const scriptsSourcesPatterns: string[] = entryFingerprint.scripts.sources;
        const descriptorScriptsSources: string[] = scrapeDescriptor.scripts.sources;

        return patternsMatchesList(scriptsSourcesPatterns, descriptorScriptsSources);
   },
});

VisionParser.matchers.add({
    name: "scripts::contents",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        if (
            !entryFingerprint.scripts ||
            !entryFingerprint.scripts.contents ||
            !scrapeDescriptor.scripts ||
            !scrapeDescriptor.scripts.contents
        ) {
            return false;
        }

        const scriptsContentsPatterns: string[] = entryFingerprint.scripts.contents;
        const descriptorScriptsContents: string[] = scrapeDescriptor.scripts.contents;

        return patternsMatchesList(scriptsContentsPatterns, descriptorScriptsContents);
    },
});

VisionParser.matchers.add({
    name: "scripts::globalDeclarations",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        if (
            !entryFingerprint.scripts ||
            !entryFingerprint.scripts.globalDeclarations ||
            !scrapeDescriptor.scripts ||
            !scrapeDescriptor.scripts.globalDeclarations
        ) {
            return false;
        }

        const scriptsGlobalsPatterns: string[] = entryFingerprint.scripts.globalDeclarations;
        const descriptorScriptsGlobals: string[] = scrapeDescriptor.scripts.globalDeclarations;

        return patternsMatchesList(scriptsGlobalsPatterns, descriptorScriptsGlobals);
    },
});

VisionParser.matchers.add({
    name: "styles::sources",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        if (
            !entryFingerprint.styles ||
            !entryFingerprint.styles.sources ||
            !scrapeDescriptor.styles ||
            !scrapeDescriptor.styles.sources
        ) {
            return false;
        }

        const stylesSourcesPatterns: string[] = entryFingerprint.styles.sources;
        const descriptorStylesSources: string[] = scrapeDescriptor.styles.sources;

        return patternsMatchesList(stylesSourcesPatterns, descriptorStylesSources);
    },
});

VisionParser.matchers.add({
    name: "styles::contents",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        if (
            !entryFingerprint.styles ||
            !entryFingerprint.styles.contents ||
            !scrapeDescriptor.styles ||
            !scrapeDescriptor.styles.contents
        ) {
            return false;
        }

        const stylesContentsPatterns: string[] = entryFingerprint.styles.contents;
        const descriptorStylesContents: string[] = scrapeDescriptor.styles.contents;

        return patternsMatchesList(stylesContentsPatterns, descriptorStylesContents);
    },
});

VisionParser.matchers.add({
    name: "metas",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        if (
            !entryFingerprint.metas ||
            !scrapeDescriptor.metas
        ) {
            return false;
        }

        const metasPatterns: VisionParserDictionary = entryFingerprint.metas;
        const descriptorMetas: VisionParserDictionary = scrapeDescriptor.metas;

        return patternsMatchesDictionary(metasPatterns, descriptorMetas);
    },
});

VisionParser.matchers.add({
    name: "cookies",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        if (
            !entryFingerprint.cookies ||
            !scrapeDescriptor.cookies
        ) {
            return false;
        }

        const cookiesPatterns: VisionParserDictionary = entryFingerprint.cookies;
        const descriptorCookies: VisionParserDictionary = scrapeDescriptor.cookies;

        return patternsMatchesDictionary(cookiesPatterns, descriptorCookies);
    },
});

VisionParser.matchers.add({
    name: "localStorage",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        if (
            !entryFingerprint.localStorage ||
            !scrapeDescriptor.localStorage
        ) {
            return false;
        }

        const localStoragePatterns: VisionParserDictionary = entryFingerprint.localStorage;
        const descriptorLocalStorage: VisionParserDictionary = scrapeDescriptor.localStorage;

        return patternsMatchesDictionary(localStoragePatterns, descriptorLocalStorage);
    },
});

VisionParser.matchers.add({
    name: "links",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        if (
            !entryFingerprint.links ||
            !scrapeDescriptor.links
        ) {
            return false;
        }

        const linksPatterns: string[] = entryFingerprint.links;
        const descriptorLinks: string[] = scrapeDescriptor.links;

        return patternsMatchesList(linksPatterns, descriptorLinks);
    },
});

VisionParser.matchers.add({
    name: "images",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        if (
            !entryFingerprint.images ||
            !scrapeDescriptor.images
        ) {
            return false;
        }

        const imagesPatterns: string[] = entryFingerprint.images;
        const descriptorImages: string[] = scrapeDescriptor.images;
        
        return patternsMatchesList(imagesPatterns, descriptorImages);
    },
});

VisionParser.matchers.add({
    name: "frames",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        if (
            !entryFingerprint.frames ||
            !scrapeDescriptor.frames
        ) {
            return false;
        }

        const framesPatterns: string[] | undefined = entryFingerprint.frames;
        const descriptorFrames: string[] | undefined = scrapeDescriptor.frames;

        return patternsMatchesList(framesPatterns, descriptorFrames);
    },
});

VisionParser.matchers.add({
    name: "customEvaluation::match",
    async matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): Promise<boolean> {
        if (
            !entryFingerprint.customEvaluation ||
            !entryFingerprint.customEvaluation.match ||
            !scrapeDescriptor.window
        ) {
            return false;
        }

        const matchEvaluation: string = entryFingerprint.customEvaluation.match;

        try {
            const matched: boolean | string = await scrapeDescriptor.window.evaluate(matchEvaluation);

            return matched === true || matched === "true";
        }
        catch (error) {
            return false;
        }
    },
});

function patternsMatchesList (patterns: string[], list: string[]): boolean {
    for (const pattern of patterns) {
        const patternRegExp: RegExp = new RegExp(pattern);

        for (const item of list) {
            if (patternRegExp.test(item)) {
                return true;
            }
        }
    }

    return false;
}

function patternsMatchesDictionary (patterns: VisionParserDictionary, dictionary: VisionParserDictionary): boolean {
    for (const patternKey in patterns) {
        const patternKeyRegExp: RegExp = new RegExp(patternKey);
        const patternValueRegExp: RegExp = new RegExp(patterns[patternKey]);

        for (const key in dictionary) {
            const value: string = dictionary[key];

            if (patternKeyRegExp.test(key) && patternValueRegExp.test(value)) {
                return true;
            }
        }
    }

    return false;
}