<p align="center"> 
    <img src="images/vision.svg" alt="" width="210px">
</p>

# Vision
Vision is a software detecting the technologies and services behind websites. You pass a link and this software detects web frameworks, web services, server software, libraries, widgets, content management systems, social platforms, e-commerce platforms and more.

Through Vision you can:
-   **Reliably detect technologies and services used on websites**
through a list of patterns constantly updated and maintained;
-   **Define new technologies and services easily without technical knowledge**: you can detect
a JavaScript library by just adding its file name;
-   **Have maximum flexibility for defining how technologies and
services are detected**: from a wide range of intuitive
predefined patterns to custom JavaScript code;
-   **Have specific information for each technology or service detected**:
for instance if Vision finds `Google Analytics` you can get the tracking ID of
the specific user, if Vision finds `Twitter Follow Button`
you can get the username of the specific user to follow;
-   **Have atomic definitions**, for instance `Facebook Like Button`
and `Facebook Share Button` are clearly distinguished and not superficially
defined as just `Facebook`.

## Installation
Using NPM
```console
npm install @malgol/vision --save
```

## Usage
Using NodeJS
```javascript
const Vision = require("@malgol/vision");

// You can also use async / await.
Vision.cast("https://www.example.com").then((descriptor) => {
    console.log(descriptor);
});
```

Using NodeJS with TypeScript
```typescript
import { Vision, VisionDescriptor } from "@malgol/vision";

// You can also use async / await.
Vision.cast("https://www.example.com").then((descriptor: VisionDescriptor): void => {
    console.log(descriptor);
});
```

Using CLI
```console
npm install -g @malgol/vision
```
```console
vision URI
```
```console
vision URI --json
```

## Flow
A representation of what happens when you cast Vision. You pass the URI of a website and the scraper uses the instance of a
headless browser to visit it as a normal user, it waits for the website to load and then
collects data like links, iframes, scripts sources, global declarations made by scripts,
stylesheets, images...
<p align="center">
    <img src="images/io.png" alt="" width="99%">
</p>
The collected data is passed to a parser which performs an analysis searching for services and applications.
This software tries to be as modular as possible: if you want you can skip the scraping process and directly pass data collected by your own to
the parser. You can also tell Vision to use a different browser for scraping by just implementing few interfaces.

## Entries
**A entry is a technology or service that can be identified by Vision**. This software relies on a
list of entries updated and maintained by the community and the author. You can also define
and detect your custom entries. You can contribute to this project by suggesting missing entries.
All entries passed by default to Vision are defined in [`Entries.ts`](entries/Entries.ts).

## Fingerprint
A fingerprint is a pattern composed by a set of inner patterns used
to detect a technology or service in a website, a fingerprint is usually associated to a entry and
the matching of a fingerprint means the matching of the associated entry.
Below the models you can use to compose a fingerprint.

#### `headers`
A key-value pair set used to match headers in the HTTP response of the website request.
In case at least one key-value pair is matched then the entry is matched.

<details>
    <summary>Usage Example</summary>
    <br>

```javascript
{
    name: "Entry Example",
    description: "This entry is used for fingerprint usage examples.",
    fingerprint: {
        headers: {
            "header-name-regex": "header-value-regex",
            "header-name-regex": "header-value-regex",
            // ...
        },
    },
},
```
</details>

---

#### `initialContent`
List of regular expressions used to match the website source code (the HTTP response body). In case at least one regular expression is matched then the entry is matched.

<details>
    <summary>Usage Example</summary>
    <br>

```javascript
{
    name: "Entry Example",
    description: "This entry is used for fingerprint usage examples.",
    fingerprint: {
        initialContent: [
            "regex",
            "regex",
            // ...
        ],
    },
},
```
</details>

---

#### `loadedContent`
List of regular expressions used to match the website source code after the "load" event. In case at least one regular expression is matched then the entry is matched.

<details>
    <summary>Usage Example</summary>
    <br>

```javascript
{
    name: "Entry Example",
    description: "This entry is used for fingerprint usage examples.",
    fingerprint: {
        loadedContent: [
            "regex",
            "regex",
            // ...
        ],
    },
},
```
</details>

---

#### `selectors`
List of CSS selectors, the selectors are queried after the "load" event. In case at least one queried selector returns at least one element then the entry is matched.

<details>
    <summary>Usage Example</summary>
    <br>

```javascript
{
    name: "Entry Example",
    description: "This entry is used for fingerprint usage examples.",
    fingerprint: {
        selectors: [
            ".selector",
            "#selector",
            "a.complex[selector]",
            // ...
        ],
    },
},
```
</details>

---

#### `scripts::sources`
List of regular expressions used to match the value of the "src" attribute of all script elements. The regular expressions are evaluated after the "load" event. In case at least one regular expression is matched then the entry is matched.

<details>
    <summary>Usage Example</summary>
    <br>

```javascript
{
    name: "Entry Example",
    description: "This entry is used for fingerprint usage examples.",
    fingerprint: {
        scripts: {
            sources: [
                "regex",
                "regex",
                // ...
            ],
        },
    },
},
```
</details>

---

#### `scripts::contents`
List of regular expressions used to match the inner value of all script elements without the "src" attribute. The regular expressions are evaluated after the "load" event. In case at least one regular expression is matched then the entry is matched.

<details>
    <summary>Usage Example</summary>
    <br>

```javascript
{
    name: "Entry Example",
    description: "This entry is used for fingerprint usage examples.",
    fingerprint: {
        scripts: {
            contents: [
                "regex",
                "regex",
                // ...
            ],
        },
    },
},
```
</details>

---

#### `scripts::globalDeclarations`
List of regular expressions used to match the keys created by scripts in the window object (the global declarations). The regular expressions are evaluated after the "load" event. In case at least one regular expression is matched then the entry is matched.
Note that only properties of the window object can be matched, and not, for example, a property of
a property of the window object (if you need to do this please refer to the [`customEvaluation::match`](#customevaluationmatch) pattern).

<details>
    <summary>Usage Example</summary>
    <br>

```javascript
{
    name: "Entry Example",
    description: "This entry is used for fingerprint usage examples.",
    fingerprint: {
        scripts: {
            globalDeclarations: [
                "global-name-regex",
                "global-name-regex",
                // ...
            ],
        },
    },
},
```

How to detect `jQuery`.
```javascript
{
    name: "jQuery",
    description: "",
    fingerprint: {
        scripts: {
            globalDeclarations: [
                "^jQuery$",
            ],
        },
    },
},
```
The `^` and `$` symbols are regular expression operators used to make sure the matched key is exactly "jQuery" and not for instance "aaajQuerybbb".
</details>

---

#### `styles::sources`
List of regular expressions used to match the value of the "href" attribute of all style sheet links. The regular expressions are evaluated after the "load" event. In case at least one regular expression is matched then the entry is matched.

<details>
    <summary>Usage Example</summary>
    <br>

```javascript
{
    name: "Entry Example",
    description: "This entry is used for fingerprint usage examples.",
    fingerprint: {
        styles: {
            sources: [
                "regex",
                "regex",
                // ...
            ],
        },
    },
},
```
</details>

---

#### `styles::contents`
List of regular expressions used to match the inner value of all style elements. The regular expressions are evaluated after the "load" event. In case at least one regular expression is matched then the entry is matched.

<details>
    <summary>Usage Example</summary>
    <br>

```javascript
{
    name: "Entry Example",
    description: "This entry is used for fingerprint usage examples.",
    fingerprint: {
        styles: {
            contents: [
                "regex",
                "regex",
                // ...
            ],
        },
    },
},
```
</details>

---

#### `metas`
List of regular expressions used to match meta elements. The regular expressions are evaluated after the "load" event. In case at least one regular expression is matched then the entry is matched.

<details>
    <summary>Usage Example</summary>
    <br>

```javascript
{
    name: "Entry Example",
    description: "This entry is used for fingerprint usage examples.",
    fingerprint: {
        metas: {
            "meta-name-regex": "meta-value-regex",
            "meta-name-regex": "meta-value-regex",
            // ...
        },
    },
},
```
</details>

---

#### `cookies`
A key-value pair set used to match cookies created in the website.
In case at least one key-value pair is matched then the entry is matched.

<details>
    <summary>Usage Example</summary>
    <br>

```javascript
{
    name: "Entry Example",
    description: "This entry is used for fingerprint usage examples.",
    fingerprint: {
        cookies: {
            "cookie-name-regex": "cookie-value-regex",
            "cookie-name-regex": "cookie-value-regex",
            // ...
        },
    },
},
```
</details>

---

#### `localStorage`
A key-value pair set used to match local storage created in the website.
In case at least one key-value pair is matched then the entry is matched.

<details>
    <summary>Usage Example</summary>
    <br>

```javascript
{
    name: "Entry Example",
    description: "This entry is used for fingerprint usage examples.",
    fingerprint: {
        localStorage: {
            "storage-name-regex": "storage-value-regex",
            "storage-name-regex": "storage-value-regex",
            // ...
        },
    },
},
```
</details>

---

#### `links`
List of regular expressions used to match the value of the "href" attribute of all links (<a>). In case at least one regular expression is matched then the entry is matched.

<details>
    <summary>Usage Example</summary>
    <br>

```javascript
{
    name: "Entry Example",
    description: "This entry is used for fingerprint usage examples.",
    fingerprint: {
        links: [
            "regex",
            "regex",
            // ...
        ],
    },
},
```
</details>

---

#### `images`
List of regular expressions used to match the value of the "src" attribute of all images (<img>). In case at least one regular expression is matched then the entry is matched.

<details>
    <summary>Usage Example</summary>
    <br>

```javascript
{
    name: "Entry Example",
    description: "This entry is used for fingerprint usage examples.",
    fingerprint: {
        images: [
            "regex",
            "regex",
            // ...
        ],
    },
},
```
</details>

---

#### `frames`
List of regular expressions used to match the value of the "src" attribute of all frames (<iframe>). In case at least one regular expression is matched then the entry is matched.

<details>
    <summary>Usage Example</summary>
    <br>

```javascript
{
    name: "Entry Example",
    description: "This entry is used for fingerprint usage examples.",
    fingerprint: {
        frames: [
            "regex",
            "regex",
            // ...
        ],
    },
},
```

How to detect `Twitter Follow Button`.
```javascript
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
},
```
The `^` symbol is a regular expression operator used to make sure the source of the iframe starts with the specified link.
</details>

---

#### `customEvaluation::match`
A custom JavaScript code evaluated on the visited website. In case the function returns `true` then the entry is matched.
Useful in case the predefined patterns are not enough.

<details>
    <summary>Usage Example</summary>
    <br>

```javascript
{
    name: "Entry Example",
    description: "This entry is used for fingerprint usage examples.",
    fingerprint: {
        customEvaluation: {
            match: "JavaScript...",
        },
    },
},
```
You can write a simple JavaScript expression for instance "!!window.jQuery;" which will return `true` if jQuery is installed,
`false` otherwise. In case you need to write more than a simple expression you can use a multiline string and use a
closure which should return a `boolean` value.
</details>

---

#### `customEvaluation::version`
A custom JavaScript code evaluated on the visited website if the entry is matched.
The JavaScript code defined in this field should be used for returning the version of the matched entry.
In case the entry is matched and this field has content, the content of this field will be evaluated on the visited
webpage and it should return the version of the matched entry.

<details>
    <summary>Usage Example</summary>
    <br>

```javascript
{
    name: "Entry Example",
    description: "This entry is used for fingerprint usage examples.",
    fingerprint: {
        customEvaluation: {
            version: "JavaScript...",
        },
    },
},
```
</details>

---

#### `customEvaluation::extra`
A custom JavaScript code evaluated on the visited website if the entry is matched.
The JavaScript code defined in this field should be used for returning extra information related to the matched entry.
In case the entry is matched and this field has content, the content of this field will be evaluated on the visited
webpage and it should return extra information regarding the matched entry. For instance this is used by the `YouTube Embedded Player`
entry to return the links to the embedded videos in the specific website the player has been detected.

<details>
    <summary>Usage Example</summary>
    <br>

```javascript
{
    name: "Entry Example",
    description: "This entry is used for fingerprint usage examples.",
    fingerprint: {
        customEvaluation: {
            extra: "JavaScript...",
        },
    },
},
```
</details>

## Contributions
### Add a new entry
Contributions related to adding new entries to the database are very appreciated, if you want
to add new entries (like your own technology or service) you have two options:
1. Create a issue providing the name and the website of the technology or service you want to
be added.
2. Create a new branch named `entry/entry-name`, add the entry and create a pull request.

## Changelog
#### 0.1.5
`* Vision can be used through command line, read the README.md for usage.`

`* Underscore has more details and version evaluation.`

`* YouTube Embedded Player has the embedded videos as extra information.`

`* iubenda Cookie Solution has the associated cookie policy id as extra information.`

<details>
    <summary>Earlier Versions</summary>

#### 0.1.4
`* Add new entry: Google Fonts.`

#### 0.1.3
`* Fix publish script, rename it to upload.`

#### 0.1.2
`* Add a npm publish script for automatically building and publishing the package.`

#### 0.1.1
`* Package name is now: @malgol/vision.`

`* Remove GitHub Package Registry references and use npmjs.com.`

#### 0.1.0
`* Vision.`
</details>