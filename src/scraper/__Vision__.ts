/*
 * !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!!
 * !!! NOTE: THE FOLLOWING CODE IS EVALUATED IN BROWSER CONTEXT.
 * !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!! !!!
 */

// tslint:disable
module __Vision__ {
    // Returns the whole source of the document.
    export function getDocumentOuterHTML () {
        return window.document.documentElement.outerHTML;
    }

    export function getAllScriptsSource () {
        return [ ...window.document.querySelectorAll("script[src]") ].map((script) => {
            return script.getAttribute("src");
        });
    }

    export function getDocumentLanguage () {
        return window.document.documentElement.lang || "unknown";
    }

    export function getDocumentLanguages () {
        const links = window.document.querySelectorAll("link[rel=alternate][hreflang]");
        const languages = new Set();

        return [ ...languages ];
    }

    export function getAllScriptsInnerContent () {
        return [ ...window.document.querySelectorAll("script") ].filter((script) => {
            return !script.hasAttribute("src");
        }).map((script) => {
            return script.innerHTML;
        })
    }

    export function getAllStylesSource () {
        return [ ...window.document.querySelectorAll("link[rel=stylesheet][href]") ].map((link) => {
            return link.getAttribute("href");
        });
    }

    export function getAllStylesInnerContent () {
        return [ ...window.document.querySelectorAll("style") ].map((style) => {
            return style.innerHTML;
        });
    }

    // Returns information representing the cookies: a dictionary
    // containing the name of the cookie as key and the content as value.
    export function getCookies () {
        const cookies = {};
        const pairs: string[] = window.document.cookie.split(";");

        for (let i = 0, ll = pairs.length; i < ll; ++i) {
            const pair: string[] = pairs[i].split("=");

            // @ts-ignore
            cookies[(pair[0] + "").trim()] = unescape(pair[1]);
        }

        return cookies;
    }

    // Returns information representing the cookies: a dictionary
    // containing the name of the entry as key and the content as value.
    export function getLocalStorage () {
        const storage = {};

        for (const key of Object.keys(localStorage)) {
            // @ts-ignore
            storage[key] = localStorage.getItem(key);
        }

        return storage;
    }

    // Returns information representing the meta nodes in the document: a dictionary
    // containing the name of the meta as key and the content as value.
    export function getMetas () {
        const selectorText = "meta[name][content]";
        const metaNodes = [ ...window.document.querySelectorAll(selectorText) ];
        const metas = {};

        for (const meta of metaNodes) {
            // @ts-ignore
            metas[meta.getAttribute("name")] = meta.getAttribute("content");
        }

        return metas;
    }

    // Returns the keys defined in the window object.
    export function getWindowKeys () {
        return Object.keys(window);
    }

    export function getAllLinks () {
        return [ ...window.document.querySelectorAll("a[href]") ].map((link) => {
            return link.getAttribute("href");
        });
    }

    export function getAllFramesSources () {
        return [ ...window.document.querySelectorAll("iframe[src]") ].map((frame) => {
            return frame.getAttribute("src");
        });
    }

    // Returns a Promise resolved when the "load" event is fired.
    // In case the "load" event is already fired then the Promise is immediately resolved.
    export function waitLoadEvent () {
        return new Promise((resolve) => {
            if (window.document.readyState === "complete") {
                resolve();
            }
            else {
                window.addEventListener("load", () => resolve());
            }
        });
    }

    // Collect the information necessary to represent part of the IVisionScrapeDescriptor interface.
    export async function getScrapeDescriptor () {
        // Wait for the page to load before collecting the information.
        await __Vision__.waitLoadEvent();

        return {
            loadedContent: getDocumentOuterHTML(),
            scripts: {
                sources: getAllScriptsSource(),
                contents: getAllScriptsInnerContent(),
                globals: getWindowKeys(),
            },
            styles: {
                sources: getAllStylesSource(),
                contents: getAllStylesInnerContent(),
            },
            metas: getMetas(),
            cookies: getCookies(),
            storage: getLocalStorage(),
            links: getAllLinks(),
            frames: getAllFramesSources(),
        };
    }
}