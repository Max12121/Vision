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

    export function getAllImagesSources () {
        return [ ...window.document.querySelectorAll("img[src]") ].map((image) => {
            return image.getAttribute("src");
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
                window.addEventListener("load", resolve);
            }
        });
    }

    // Returns a Promise resolved when the "DOMContentLoaded" event is fired.
    // In case the "DOMContentLoaded" event is already fired then the Promise is immediately resolved.
    export function waitDOMContentLoadedEvent () {
        return new Promise((resolve) => {
            if (window.document.readyState === "interactive" || window.document.readyState === "complete") {
                resolve();
            }
            else {
                window.document.addEventListener("DOMContentLoaded", resolve);
            }
        });
    }

    export function getDocumentLanguage () {
        const language = window.document.documentElement.lang;

        return (language && language !== "zxx") ? language : null;
    }

    export function getInternalLinks () {
        const links = new Set();
        const linkNodes = [ ...window.document.getElementsByTagName("a") ].filter((link) => {
            // @ts-ignore
            return window.location.hostname === link.hostname;
        });

        linkNodes.forEach((link) => links.add(link.href.toLowerCase()));

        return [ ...links ];
    }

    export function getDocumentLanguages () {
        const documentLanguage = getDocumentLanguage();
        const languages = new Set();

        if (documentLanguage) {
            languages.add(documentLanguage.toLowerCase());
        }

        [ ...window.document.querySelectorAll("link[rel=alternate][hreflang]") ].forEach((node) => {
            const language = node.getAttribute("hreflang");

            if (language && language !== "x-default") {
                languages.add(language.toLowerCase());
            }
        });

        [ ...window.document.querySelectorAll("a[href][hreflang]") ].forEach((node) => {
            // @ts-ignore
            if (node.hostname !== window.location.hostname) {
                return;
            }

            const language = node.getAttribute("hreflang");

            if (language) {
                languages.add(language.toLowerCase());
            }
        });

        return [ ...languages ];
    }

    function scrollMaxY () {
        window.scrollTo(0, 314159265);
    }

    // Collect the information necessary to represent part of the scrape descriptor.
    export async function getScrapeDescriptor () {
        await waitDOMContentLoadedEvent();

        const linksBeforeLoad = getAllLinks();
        const imagesBeforeLoad = getAllImagesSources();

        await waitLoadEvent();

        const linksAfterLoad = getAllLinks();
        const imagesAfterLoad = getAllImagesSources();

        scrollMaxY();

        await new Promise((resolve) => setTimeout(resolve, 2000));

        return {
            loadedContent: getDocumentOuterHTML(),
            scripts: {
                sources: getAllScriptsSource(),
                contents: getAllScriptsInnerContent(),
                globalDeclarations: getWindowKeys(),
            },
            styles: {
                sources: getAllStylesSource(),
                contents: getAllStylesInnerContent(),
            },
            metas: getMetas(),
            cookies: getCookies(),
            localStorage: getLocalStorage(),
            links: [ ...(new Set([ ...linksBeforeLoad, ...linksAfterLoad ])) ],
            images: [ ...(new Set([ ...imagesBeforeLoad, ...imagesAfterLoad ])) ],
            frames: getAllFramesSources(),
        };
    }
}