import { VisionEntry } from "../src/entry/VisionEntry";

/*
 * This file contains all the entries passed by default to Vision.
 * In case you want to contribute: each new entry should be manually added to this list.
*/

export const Entries: ReadonlyArray<Readonly<VisionEntry>> = [
    {
        name: "iubenda Privacy Policy",
        description: "A privacy policy generated through iubenda.",
        categories: [
            "Law", "Privacy", "Freemium", "SaaS", "Widgets", "Services", "iubenda",
        ],
        uri: "https://www.iubenda.com",
        creationYear: "2011",
        fingerprint: {
            links: [
                "^https://www.iubenda.com/privacy-policy/[0-9]+",
            ],
        },
    },
    {
        name: "iubenda Cookie Policy",
        description: "A cookie policy generated through iubenda.",
        categories: [
            "Law", "Privacy", "Freemium", "SaaS", "Widgets", "Services", "iubenda",
        ],
        uri: "https://www.iubenda.com",
        creationYear: "2015",
        fingerprint: {
            links: [
                "^https://www.iubenda.com/privacy-policy/[0-9]+/cookie-policy",
            ],
        },
        implies: [
            "iubenda Privacy Policy",
        ],
    },
    {
        name: "iubenda Cookie Solution",
        description: "A cookie and consent solution that complies with the EU requirements.",
        categories: [
            "Law", "Privacy", "Freemium", "SaaS", "Widgets", "Services", "iubenda",
        ],
        uri: "https://www.iubenda.com",
        creationYear: "2015",
        fingerprint: {
            customEvaluation: {
                match: "!!(window._iub && window._iub.cs);",
                version: "window._iub.cs.VERSION;",
                extra: `(() => {
                    const cookiePolicyID = _iub.cs.options.cookiePolicyId;
                    
                    return {
                        cookiePolicyID,
                    };
                })();`,
            },
        },
    },
    {
        name: "Twitter for Websites",
        description: "A suite of tools bringing Twitter content and functionality to webpages and applications.",
        categories: [
            "Social Networks", "Widgets", "Services", "Twitter",
        ],
        uri: "https://developer.twitter.com/en/docs/twitter-for-websites/overview",
        fingerprint: {
            scripts: {
                sources: [
                    "^https://platform\\.twitter\\.com/widgets\\.js$",
                ],
                globalDeclarations: [
                    "^twttr$",
                ],
            },
        },
    },
    {
        name: "Twitter Embedded Tweets",
        description: "A snippet used to embed content published on Twitter.",
        categories: [
            "Widgets", "Social Networks", "Services", "Twitter",
        ],
        uri: "https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/overview",
        fingerprint: {
            selectors: [
                "blockquote.twitter-tweet",
                "iframe.twitter-tweet",
            ],
        },
        implies: [
            "Twitter for Websites",
        ],
    },
    {
        name: "Twitter Follow Button",
        description: "A button exposed for following a user on Twitter.",
        categories: [
            "Widgets", "Social Networks", "Services", "Twitter",
        ],
        uri: "https://developer.twitter.com/en/docs/twitter-for-websites/follow-button/overview.html",
        fingerprint: {
            frames: [
                "^https://platform\\.twitter\\.com/widgets/follow_button",
            ],
        },
        implies: [
            "Twitter for Websites",
        ],
    },
    {
        name: "Twitter Tweet Button",
        description: "A button exposed for sharing content on Twitter.",
        categories: [
            "Widgets", "Social Networks", "Services", "Twitter",
        ],
        uri: "https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview.html",
        fingerprint: {
            frames: [
                "^https://platform\\.twitter\\.com/widgets/tweet_button",
            ],
        },
        implies: [
            "Twitter for Websites",
        ],
    },
    {
        name: "Freshchat",
        description: "A messaging software built for teams who want to ace customer conversations—marketing, sales, or support.",
        categories: [
            "Widgets", "Customer Care", "Live Chat",
        ],
        uri: "https://www.freshworks.com/live-chat-software/",
        creationYear: "2017",
        fingerprint: {
            scripts: {
                sources: [
                    "^https://wchat\\.freshchat\\.com/js/widget\\.js$",
                ],
                globalDeclarations: [
                    "^fcWidget$",
                ],
            },
        },
    },
    {
        name: "Typekit",
        description: "A collection of web fonts offered by Adobe.",
        categories: [
            "Fonts", "Web Fonts", "Font Library", "CSS", "Adobe",
        ],
        uri: "https://fonts.adobe.com/typekit",
        creationYear: "2009",
        fingerprint: {
            styles: {
                sources: [
                    "^https://use\\.typekit\\.net/",
                ],
            },
        },
    },
    {
        name: "Headway",
        fingerprint: {
            selectors: [
                "#HW_badge",
            ],
            scripts: {
                globalDeclarations: [
                    "^Headway$",
                ],
            },
        },
    },
    {
        name: "Modernizr",
        description: "A library used to know what HTML, CSS and JavaScript features are supported by the user's browser.",
        categories: [
            "JavaScript", "JavaScript Libraries",
        ],
        uri: "https://modernizr.com/",
        license: "MIT",
        creationYear: "2009",
        fingerprint: {
            scripts: {
                globalDeclarations: [
                    "^Modernizr$",
                ],
            },
            customEvaluation: {
                version: "window.Modernizr._version;",
            },
        },
    },
    {
        name: "Sentry",
    },
    {
        name: "Raven",
        fingerprint: {
            scripts: {
                globalDeclarations: [
                    "^Raven$",
                ],
            },
            customEvaluation: {
                version: "window.Raven.VERSION;",
            },
        },
        implies: [
            "Sentry",
        ],
    },
    {
        name: "Facebook Like Button",
        description: "",
        categories: [
            "",
        ],
        fingerprint: {
            frames: [
                "^//www\\.facebook.com/.*/plugins/like\\.php",
            ],
        },
    },
    {
        name: "Capterra Reviews Badge",
        description: "A badge showing the Capterra reviews of a software.",
        categories: [
            "Review Sites", "Widgets", "Badges", "Capterra",
        ],
        fingerprint: {
            images: [
                "^https://assets\\.capterra\\.com/badge/",
            ],
        },
    },
    {
        name: "Pickr",
        description: "A free and open source color picker library.",
        categories: [
            "JavaScript", "JavaScript Libraries", "CSS",
        ],
        uri: "https://github.com/Simonwep/pickr",
        license: "MIT",
        creationYear: "2018",
        fingerprint: {
            scripts: {
                globalDeclarations: [
                    "^Pickr$",
                ],
            },
            customEvaluation: {
                version: "window.Pickr.version;",
            },
        },
    },
    {
        name: "jQuery",
        description: "A JavaScript library designed to simplify HTML DOM tree traversal, manipulation and event handling.",
        categories: [
            "JavaScript", "JavaScript Libraries", "DOM",
        ],
        uri: "https://jquery.com",
        license: "MIT",
        creationYear: "2006",
        fingerprint: {
            scripts: {
                globalDeclarations: [
                    "^\\$$",
                    "^jQuery$",
                ],
            },
            customEvaluation: {
                version: `window.jQuery.fn.jquery.split(" ")[0];`,
            },
        },
    },
    {
        name: "jQuery UI",
        description: "A curated set of user interface interactions, effects, widgets, and themes built on top of the jQuery JavaScript Library.",
        categories: [
            "JavaScript", "JavaScript Libraries", "UI", "CSS",
        ],
        uri: "https://jqueryui.com/",
        license: "https://github.com/jquery/jquery-ui/blob/master/LICENSE.txt",
        creationYear: "2007",
        fingerprint: {
            customEvaluation: {
                match: "!!(window.jQuery && window.jQuery.ui);",
                version: "window.jQuery.ui.version;",
            },
        },
        implies: [
            "jQuery",
        ],
    },
    {
        name: "Underscore",
        description: "A JavaScript library that provides useful functional programming helpers without extending any built-in objects.",
        categories: [
            "JavaScript", "JavaScript Libraries", "Functional Programming",
        ],
        uri: "https://underscorejs.org/",
        license: "MIT",
        creationYear: "2009",
        fingerprint: {
            scripts: {
                globalDeclarations: [
                    "^_$",
                ],
            },
            customEvaluation: {
                version: "window._.VERSION;",
            },
        },
    },
    {
        name: "Google Analytics",
        description: "A web analytics service offered by Google that tracks and reports website traffic.",
        categories: [
            "Analytics", "Behaviour Analysis", "Web Analytics", "Google", "Statistics",
        ],
        uri: "https://marketingplatform.google.com/about/analytics/",
        creationYear: "2005",
        fingerprint: {
            scripts: {
                globalDeclarations: [
                    "^ga$",
                    "^gaData$",
                    "^GoogleAnalyticsObject$",
                ],
            },
            customEvaluation: {
                extra: `(() => {
                    const dataLayer = window.dataLayer;
                    let trackingID = null;
                    
                    if (dataLayer) {
                        const configuration = dataLayer.filter((item) => item[0] === "config")[0];
                        
                        if (configuration) {
                            trackingID = configuration[1];
                        }
                    }
                    
                    if (!trackingID) {
                        trackingID = Object.keys(window.gaData)[0];
                    }
                    
                    return {
                        trackingID,
                    };
                })();`,
            },
        },
    },
    {
        name: "Bootstrap",
        description: "An open source development toolkit for HTML, CSS, and JavaScript.",
        categories: [
            "HTML", "CSS", "JavaScript", "Web Frameworks",
        ],
        uri: "https://getbootstrap.com",
        license: "MIT",
        creationYear: "2011",
        fingerprint: {
            scripts: {
                globalDeclarations: [
                    "^bootstrap$",
                ],
            },
            customEvaluation: {
                version: "bootstrap.Alert.VERSION;",
            },
        },
    },
    {
        name: "Cookiebot",
        description: "A cookie and online tracking consent solution that complies with the EU consent and information requirements.",
        categories: [
            "Law", "Privacy", "SaaS", "Widgets", "Services", "Freemium",
        ],
        uri: "https://www.cookiebot.com/",
        fingerprint: {
            scripts: {
                globalDeclarations: [
                    "^Cookiebot$",
                    "^CookiebotDialog$",
                ],
            },
        },
    },
    {
        name: "Yoast SEO",
        description: "A plugin making websites as search-engine-friendly as possible.",
        categories: [
            "Web Plugins", "SEO", "Freemium",
        ],
        uri: "https://yoast.com",
        creationYear: "2010",
        fingerprint: {
            initialContent: [
                "<!-- This site is optimized with the Yoast SEO plugin v.* - https://yoast\\.com/wordpress/plugins/seo/ -->",
            ],
            selectors: [
                "script.yoast-schema-graph",
            ],
            customEvaluation: {
                version: `(() => {
                    const versionRegExp = "<!-- This site is optimized with the Yoast SEO plugin v(.*) - https://yoast\\.com/wordpress/plugins/seo/ -->";
                    const version = window.document.documentElement.outerHTML.match(new RegExp(versionRegExp));
                    
                    return version ? version[1] : "";
                })();`,
            },
        },
    },
    {
        name: "WP Statistics",
        description: "A WordPress statistics plugin collecting data from website visitors.",
        categories: [
            "Web Plugins", "Statistics", "Analytics", "WordPress", "WordPress Plugins", "Freemium", "Web Analytics",
        ],
        uri: "https://wp-statistics.com/",
        creationYear: "2016",
        fingerprint: {
            initialContent: [
                "<!-- Analytics by WP-Statistics v.* - https://wp-statistics\\.com/ -->",
            ],
            customEvaluation: {
                version: `(() => {
                    const versionRegExp = "<!-- Analytics by WP-Statistics v(.*) - https://wp-statistics\\.com/ -->";
                    const version = window.document.documentElement.outerHTML.match(new RegExp(versionRegExp));
                    
                    return version ? version[1] : "";
                })();`,
            },
        },
    },
    {
        name: "Prism",
        description: "A lightweight, extensible syntax highlighter, built with modern web standards in mind.",
        fingerprint: {
            scripts: {
                globalDeclarations: [
                    "^Prism$",
                ],
            },
        },
    },
    {
        name: "PHP",
        description: "A popular general-purpose scripting language that is especially suited to web servers.",
        creationYear: "1995",
    },
    {
        name: "WordPress",
        fingerprint: {
            selectors: [
                "link#wp-block-library-css",
            ],
            scripts: {
                globalDeclarations: [
                    "^_wpemojiSettings$",
                ],
            },
            metas: {
                "^generator$": "^WordPress",
            },
        },
        implies: [
            "PHP",
            "MySQL",
        ],
    },
    {
        name: "Joomla!",
        fingerprint: {
            metas: {
                "^generator$": "^Joomla!",
            },
        },
        implies: [
            "PHP",
        ],
    },
    {
        name: "Phaser",
        description: "A free 2D game framework for making HTML5 games for desktop and mobile web browsers.",
        categories: [
            "Game Engines", "Web Game Engines", "Game Frameworks", "Web Frameworks", "2D", "WebGL", "Canvas",
        ],
        uri: "http://phaser.io",
        license: "MIT",
        creationYear: "2013",
        fingerprint: {
            scripts: {
                sources: [
                    "^//cdn\\.jsdelivr\\.net/npm/phaser@.*/dist/phaser\\.min\\.js$",
                ],
                globalDeclarations: [
                    "^Phaser$",
                ],
            },
            customEvaluation: {
                version: "window.Phaser.VERSION;",
            },
        },
    },
    {
        name: "YouTube Embedded Player",
        description: "An iframe used to embed a YouTube video player on websites.",
        categories: [
            "Videos", "Web Players", "Video Players", "YouTube",
        ],
        uri: "https://developers.google.com/youtube/player_parameters",
        fingerprint: {
            frames: [
                "^https://www\\.youtube\\.com/embed/",
            ],
            customEvaluation: {
                extra: `(() => {
                    const embeddedRegExp = new RegExp("^https://www\\.youtube\\.com/embed/");
                    const embeddedVideos = [ ...window.document.getElementsByTagName("iframe") ].filter((iframe) => {
                        return embeddedRegExp.test(iframe.src);
                    }).map((iframe) => {
                        return iframe.src.split("?")[0];
                    });
                    
                    return {
                        embeddedVideos,
                    };
                })();`,
            },
        },
    },
    {
        name: "Google Fonts",
        description: "A collection of free licensed fonts offered by Google.",
        categories: [
            "Fonts", "Web Fonts", "Font Library", "CSS",
        ],
        uri: "https://fonts.google.com",
        creationYear: "2010",
        fingerprint: {
            styles: {
                sources: [
                    "^https://fonts\\.googleapis\\.com/css?family",
                ],
            },
        },
    },
    {
        name: "webpack",
        description: "A module bundler for the web.",
        categories: [
            "Module Bundlers", "Development Tools",
        ],
        uri: "https://webpack.js.org",
        license: "MIT",
        creationYear: "2012",
        fingerprint: {
            scripts: {
                globalDeclarations: [
                    "^webpackJsonp$",
                ],
            },
        },
    },
    {
        name: "Ruby on Rails",
        description: "A backend framework that includes everything needed to create web applications.",
        categories: [
            "Web Frameworks", "Backend Frameworks", "Ruby", "MVC",
        ],
        uri: "https://rubyonrails.org",
        license: "MIT",
        creationYear: "2005",
        fingerprint: {
            metas: {
                "^csrf-param$": "^authenticity_token$",
                "^csrf-token$": ".*",
            },
        },
        implies: [
            "Ruby",
        ],
    },
    {
        name: "MySQL",
        description: "An open-source relational database management system offered by Oracle.",
        categories: [
            "Databases", "Relational Databases", "DBMS", "SQL", "Oracle",
        ],
        uri: "https://www.mysql.com/",
        license: "GPL-2.0",
        creationYear: "1995",
    },
];