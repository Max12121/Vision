import { VisionEntry } from "../src/entry/VisionEntry";

export namespace VisionEntries {
    export const version: string = "2019.1.0";
    
    export const entries: VisionEntry[] = [
        {
            name: "iubenda",
            description: "A SaaS accomplishing law requirements through software.",
            categories: [
                "Law", "Privacy", "Services", "Freemium", "SaaS",
            ],
            uri: "https://www.iubenda.com",
            creationYear: "2011",
            fingerprint: {
                scripts: {
                    globalDeclarations: [
                        "^_iub$",
                    ],
                },
            },
        },
        {
            name: "iubenda Privacy Policy",
            description: "A privacy policy generated through iubenda.",
            categories: [
                "Law", "Privacy", "Freemium", "SaaS",
            ],
            uri: "https://www.iubenda.com",
            creationYear: "2011",
            fingerprint: {
                links: [
                    "^https://www.iubenda.com/privacy-policy/[0-9]+",
                ],
            },
            implies: [
                "iubenda",
            ],
        },
        {
            name: "iubenda Cookie Policy",
            description: "A cookie policy generated through iubenda.",
            categories: [
                "Law", "Privacy", "Freemium", "SaaS",
            ],
            uri: "https://www.iubenda.com",
            creationYear: "2015",
            fingerprint: {
                links: [
                    "^https://www.iubenda.com/privacy-policy/[0-9]+/cookie-policy",
                ],
            },
            implies: [
                "iubenda",
                "iubenda Privacy Policy",
            ],
        },
        {
            name: "iubenda Cookie Solution",
            description: "A cookie and consent solution that complies with the EU requirements.",
            categories: [
                "Law", "Privacy", "Freemium", "SaaS",
            ],
            uri: "https://www.iubenda.com",
            creationYear: "2015",
            fingerprint: {
                customEvaluation: {
                    match: "!!(window._iub && window._iub.cs)",
                    version: "window._iub.cs.VERSION",
                }
            },
            implies: [
                "iubenda",
            ],
        },
        {
            name: "Twitter for Websites",
            description: "",
            categories: [
                "Widgets", "Social Networks",
            ],
            uri: "https://developer.twitter.com/en/docs/twitter-for-websites/overview",
            fingerprint: {
                scripts: {
                    sources: [
                        "^https://platform.twitter.com/widgets.js$",
                    ],
                },
            },
        },
        {
            name: "Twitter Follow Button",
            description: "A button exposed for following a user on Twitter.",
            categories: [
                "Widgets", "Social Networks",
            ],
            uri: "https://developer.twitter.com/en/docs/twitter-for-websites/follow-button/overview.html",
            fingerprint: {
                frames: [
                    "^https://platform.twitter.com/widgets/follow_button",
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
                "Widgets", "Social Networks",
            ],
            uri: "https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview.html",
            fingerprint: {
                frames: [
                    "^https://platform.twitter.com/widgets/tweet_button",
                ],
            },
            implies: [
                "Twitter for Websites",
            ],
        },
        {
            name: "Freshchat",
            fingerprint: {
                scripts: {
                    sources: [
                        "^https://wchat\\.freshchat\\.com/js/widget\\.js$"
                    ],
                    globalDeclarations: [
                        "^fcWidget$"
                    ]
                }
            }
        },
        {
            name: "Typekit",
            fingerprint: {
                styles: {
                    sources: [
                        "^https://use\\.typekit\\.net/"
                    ]
                }
            }
        },
        {
            name: "Headway",
            fingerprint: {
                selectors: [
                    "#HW_badge"
                ],
                scripts: {
                    globalDeclarations: [
                        "^Headway$"
                    ]
                }
            }
        },
        {
            name: "Modernizr",
            fingerprint: {
                scripts: {
                    globalDeclarations: [
                        "^Modernizr$"
                    ]
                }
            }
        },
        {
            name: "Sentry",
        },
        {
            name: "Raven",
            fingerprint: {
                scripts: {
                    globalDeclarations: [
                        "^Raven$"
                    ]
                },
                customEvaluation: {
                    version: "window.Raven.VERSION"
                }
            },
            implies: [
                "Sentry"
            ]
        },
        {
            name: "Facebook Like Button",
            description: "",
            categories: [
                ""
            ],
            fingerprint: {
                frames: [
                    "^//www\\.facebook.com/.*/plugins/like\\.php"
                ]
            }
        },
        {
            name: "Capterra",
            description: "A service for software peer review.",
            categories: [
                "Review Sites"
            ],
            uri: "https://www.capterra.com"
        },
        {
            name: "Capterra Reviews Badge",
            description: "A badge showing the Capterra reviews of a software.",
            categories: [
                "Review Sites", "Widgets", "Badges"
            ],
            fingerprint: {
                images: [
                    "^https://assets.capterra.com/badge/"
                ]
            },
            implies: [
                "Capterra"
            ]
        },
        {
            name: "Pickr",
            description: "A color picker library.",
            categories: [
                "JavaScript", "JavaScript Libraries", "CSS"
            ],
            uri: "https://github.com/Simonwep/pickr",
            license: "MIT",
            creationYear: "2018",
            fingerprint: {
                scripts: {
                    globalDeclarations: [
                        "^Pickr$"
                    ]
                }
            }
        },
        {
            name: "jQuery",
            description: "A JavaScript library designed to simplify HTML DOM tree traversal, manipulation and event handling.",
            categories: [
                "JavaScript", "JavaScript Libraries"
            ],
            uri: "https://jquery.com",
            license: "MIT",
            creationYear: "2006",
            fingerprint: {
                scripts: {
                    globalDeclarations: [
                        "^jQuery$"
                    ]
                },
                customEvaluation: {
                    version: "window.jQuery.fn.jquery"
                }
            }
        },
        {
            name: "jQuery UI",
            description: "A curated set of user interface interactions, effects, widgets, and themes built on top of the jQuery JavaScript Library.",
            categories: [
                "JavaScript", "JavaScript Libraries", "UI", "CSS"
            ],
            uri: "https://jqueryui.com/",
            license: "https://github.com/jquery/jquery-ui/blob/master/LICENSE.txt",
            creationYear: "2007",
            fingerprint: {
                customEvaluation: {
                    match: "!!(window.jQuery && window.jQuery.ui)",
                    version: "window.jQuery.ui.version"
                }
            },
            implies: [
                "jQuery"
            ]
        },
        {
            name: "Underscore",
            fingerprint: {
                scripts: {
                    globalDeclarations: [
                        "^_$"
                    ]
                }
            }
        },
        {
            name: "Google Analytics",
            categories: [
                "Analytics"
            ],
            fingerprint: {
                scripts: {
                    globalDeclarations: [
                        "^GoogleAnalyticsObject$"
                    ]
                }
            }
        },
        {
            name: "Bootstrap",
            description: "An open source development toolkit for HTML, CSS, and JavaScript.",
            categories: [
                "HTML", "CSS", "JavaScript", "Web Frameworks"
            ],
            uri: "https://getbootstrap.com",
            license: "MIT",
            creationYear: "2011"
        },
        {
            name: "Cookiebot",
            description: "A cookie and online tracking consent solution that complies with the EU consent and information requirements.",
            categories: [
                "Law", "Privacy", "Services", "SaaS"
            ]
        },
        {
            name: "Cookiebot Banner",
            categories: [
                "Law", "Privacy", "SaaS"
            ],
            fingerprint: {
                scripts: {
                    globalDeclarations: [
                        "^Cookiebot$",
                        "^CookiebotDialog$"
                    ]
                }
            },
            implies: [
                "Cookiebot"
            ]
        },
        {
            name: "Yoast SEO",
            description: "A plugin making websites as search-engine-friendly as possible.",
            categories: [
                "Web Plugins", "SEO", "Freemium"
            ],
            uri: "https://yoast.com",
            creationYear: "2010",
            fingerprint: {
                selectors: [
                    "script.yoast-schema-graph"
                ]
            }
        },
        {
            name: "Prism",
            description: "A lightweight, extensible syntax highlighter, built with modern web standards in mind.",
            fingerprint: {
                scripts: {
                    globalDeclarations: [
                        "^Prism$"
                    ]
                }
            }
        },
        {
            name: "PHP",
            description: "A popular general-purpose scripting language that is especially suited to web servers.",
            creationYear: "1995"
        },
        {
            name: "WordPress",
            fingerprint: {
                selectors: [
                    "link#wp-block-library-css"
                ],
                scripts: {
                    globalDeclarations: [
                        "^_wpemojiSettings$"
                    ]
                },
                metas: {
                    "^generator$": "^WordPress"
                }
            },
            implies: [
                "PHP",
                "MySQL"
            ]
        },
        {
            name: "Joomla!",
            fingerprint: {
                metas: {
                    "^generator$": "^Joomla!"
                }
            },
            implies: [
                "PHP"
            ]
        },
        {
            name: "Phaser",
            description: "A free and fast 2D game framework for making HTML5 games for desktop and mobile web browsers, supporting Canvas and WebGL rendering.",
            categories: [
                "Game Engines", "Web Game Engines", "Game Frameworks", "Web Frameworks", "2D", "WebGL", "Canvas"
            ],
            uri: "http://phaser.io",
            license: "MIT",
            creationYear: "2013",
            fingerprint: {
                scripts: {
                    sources: [
                        "^//cdn.jsdelivr.net/npm/phaser@.*/dist/phaser\\.min\\.js$"
                    ],
                    globalDeclarations: [
                        "^Phaser$"
                    ]
                },
                customEvaluation: {/*
                    version: () => {
                        return window.Phaser.VERSION;
                    },*/
                }
            }
        },
        {
            name: "YouTube Embedded Player",
            fingerprint: {
                frames: [
                    "^https://www\\.youtube\\.com/embed/",
                ],
            },
        },
    ];
}