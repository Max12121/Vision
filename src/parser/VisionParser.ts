import { VisionEntry } from "../entry/VisionEntry";
import { VisionEntryFingerprint } from "../entry/VisionEntryFingerprint";
import { VisionEntrySet } from "../entry/VisionEntrySet";
import { VisionScrapeDescriptor } from "../scraper/VisionScrapeDescriptor";
import { VisionParserDictionary } from "./VisionParserDictionary";
import { VisionParserMatchSet } from "./VisionParserMatchSet";
import { VisionParserMatcher } from "./VisionParserMatcher";
import { VisionParserMatcherSet } from "./VisionParserMatcherSet";
import { VisionParserOptions } from "./VisionParserOptions";

export const defaultOptions: VisionParserOptions = {

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
        const matchedEntries: VisionParserMatchSet = new VisionParserMatchSet();
        const addEntry: Function = async (entry: VisionEntry, matcher: VisionParserMatcher, impliedBy: VisionEntry): Promise<void> => {
            matchedEntries.add({
                parser: this,
                scrapeDescriptor,
                entry,
                entryMatcher: matcher,
                entryImpliedBy: impliedBy,
                entryVersion: await evaluateEntryVersion(entry.fingerprint, scrapeDescriptor),
                entryExtra: await evaluateEntryExtra(entry.fingerprint, scrapeDescriptor),
            });

            if (Array.isArray(entry.implies)) {
                for (const impliedEntryName of entry.implies) {
                    if (!matchedEntries.has(impliedEntryName)) {
                        await addEntry(this._entries.get(impliedEntryName), null, entry);
                    }
                }
            }
        };

        for (const entry of this._entries.valuesToArray()) {
            if (typeof entry.fingerprint !== "object") {
                continue;
            }

            for (const matcher of matchers) {
                const matched: boolean = await matcher.matches(entry.fingerprint, scrapeDescriptor);

                if (matched) {
                    await addEntry(entry, matcher, null);

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

function patternMatchesList (patterns: string[], haystack: string[]): boolean {
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

function patternMatchesDictionary (patterns: VisionParserDictionary, haystack: VisionParserDictionary): boolean {
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

        return patternMatchesDictionary(headersPatterns, descriptorHeaders);
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

        return patternMatchesList(initialContentPatterns, [ descriptorInitialContent ]);
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

        return patternMatchesList(loadedContentPatterns, [ descriptorLoadedContent ]);
    },
});

VisionParser.matchers.add({
    name: "selectors",
    async matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): Promise<boolean> {
        const selectors: string[] = entryFingerprint.selectors;

        if (!Array.isArray(selectors) || selectors.length === 0 || typeof scrapeDescriptor.window !== "object") {
            return false;
        }

        const selector: string = selectors.join(",");
        const selectorMatchesElement: boolean|string = await scrapeDescriptor.window.evaluate(`
            window.document.querySelectorAll("${selector}").length !== 0
        `);

        return selectorMatchesElement === true || selectorMatchesElement === "true";
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

        return patternMatchesList(scriptsSourcesPatterns, descriptorScriptsSources);
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

        return patternMatchesList(scriptsContentsPatterns, descriptorScriptsContents);
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

        return patternMatchesList(scriptsGlobalsPatterns, descriptorScriptsGlobals);
    },
});

VisionParser.matchers.add({
    name: "styles/sources",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        if (typeof entryFingerprint.styles !== "object" || typeof scrapeDescriptor.styles !== "object") {
            return false;
        }

        const stylesSourcesPatterns: string[] = entryFingerprint.styles.sources;
        const descriptorStylesSources: string[] = scrapeDescriptor.styles.sources;

        if (!Array.isArray(stylesSourcesPatterns) || !Array.isArray(descriptorStylesSources)) {
            return false;
        }

        return patternMatchesList(stylesSourcesPatterns, descriptorStylesSources);
    },
});

VisionParser.matchers.add({
    name: "styles/contents",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        if (typeof entryFingerprint.styles !== "object" || typeof scrapeDescriptor.styles !== "object") {
            return false;
        }

        const stylesContentsPatterns: string[] = entryFingerprint.styles.contents;
        const descriptorStylesContents: string[] = scrapeDescriptor.styles.contents;

        if (!Array.isArray(stylesContentsPatterns) || !Array.isArray(descriptorStylesContents)) {
            return false;
        }

        return patternMatchesList(stylesContentsPatterns, descriptorStylesContents);
    },
});

VisionParser.matchers.add({
    name: "metas",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        const metasPatterns: VisionParserDictionary = entryFingerprint.metas;
        const descriptorMetas: VisionParserDictionary = scrapeDescriptor.metas;

        if (typeof metasPatterns !== "object" || typeof descriptorMetas !== "object") {
            return false;
        }

        if (Object.keys(metasPatterns).length === 0 || Object.keys(descriptorMetas).length === 0) {
            return false;
        }

        return patternMatchesDictionary(metasPatterns, descriptorMetas);
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

        return patternMatchesDictionary(cookiesPatterns, descriptorCookies);
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

        return patternMatchesDictionary(localStoragePatterns, descriptorLocalStorage);
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

        return patternMatchesList(linksPatterns, descriptorLinks);
    },
});

VisionParser.matchers.add({
    name: "images",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        const imagesPatterns: string[] = entryFingerprint.images;
        const descriptorImages: string[] = scrapeDescriptor.images;

        if (!Array.isArray(imagesPatterns) || !Array.isArray(descriptorImages)) {
            return false;
        }
        
        return patternMatchesList(imagesPatterns, descriptorImages);
    },
});

VisionParser.matchers.add({
    name: "frames",
    matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): boolean {
        const framesPatterns: string[] = entryFingerprint.frames;
        const descriptorFrames: string[] = scrapeDescriptor.frames;

        if (!Array.isArray(framesPatterns) || !Array.isArray(descriptorFrames)) {
            return false;
        }

        return patternMatchesList(framesPatterns, descriptorFrames);
    },
});

VisionParser.matchers.add({
    name: "customEvaluation/match",
    async matches (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): Promise<boolean> {
        if (typeof entryFingerprint.customEvaluation !== "object" || typeof scrapeDescriptor.window !== "object") {
            return false;
        }

        const matchEvaluation: string = entryFingerprint.customEvaluation.match;

        if (typeof matchEvaluation !== "string") {
            return false;
        }

        return await scrapeDescriptor.window.evaluate(matchEvaluation) == true;
    },
});

async function evaluateEntryVersion (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): Promise<string> {
    if (typeof entryFingerprint !== "object") {
        return "";
    }

    if (typeof entryFingerprint.customEvaluation !== "object" || typeof scrapeDescriptor.window !== "object") {
        return "";
    }

    const versionEvaluation: string = entryFingerprint.customEvaluation.version;

    if (typeof versionEvaluation !== "string") {
        return "";
    }

    return await scrapeDescriptor.window.evaluate(versionEvaluation) as string;
}

async function evaluateEntryExtra (entryFingerprint: VisionEntryFingerprint, scrapeDescriptor: VisionScrapeDescriptor): Promise<{}> {
    if (
        typeof entryFingerprint !== "object" ||
        typeof entryFingerprint.customEvaluation !== "object" ||
        typeof entryFingerprint.customEvaluation.extra !== "string" ||
        typeof scrapeDescriptor.window !== "object"
    ) {
        return {};
    }

    const extraEvaluation: string = entryFingerprint.customEvaluation.extra;

    return {
        ...(await scrapeDescriptor.window.evaluate(extraEvaluation)),
    };
}