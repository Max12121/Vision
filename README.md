<p align="center"> 
    <img src="vision.svg" alt="" width="210px">
</p>

# Vision
Vision is the most powerful software detecting technologies and
services used on websites like web frameworks, web services,
server software, libraries, widgets, content management systems, social platforms,
e-commerce platforms, analytics software and more.

Through Vision you can:
-   **Reliably detect technologies and services used in websites**
thanks to a list of patterns constantly updated and maintained.
-   **Define new technologies and services easily without
advanced technical knowledge**, for instance you can detect
a JavaScript library by just adding its file name.
-   **Have maximum flexibility for defining how technologies and
services are detected**: from a wide range of intuitive
predefined patterns to custom JavaScript code.
-   **Have specific information for each technology or service detected**:
for instance if Vision finds `Google Analytics` you can get the tracking ID of
that specific user, or for example if Vision finds `Twitter Follow Button`
you can get the username of the specific user to follow.
-   **Have atomic definitions**, for instance `Facebook Like Button`
and `Facebook Share Button` are clearly distinguished and not superficially
defined as just `Facebook`.

## Entries
All technologies and services that can be identified by Vision are defined as
entries. All entries

## Fingerprint
A fingerprint is a pattern composed by a set of inner patterns used as models
to detect a technology or service in a website. Below the models you can use to compose a fingerprint.

#### `headers`
A key-value pair set used to match headers in a HTTP response.
In case at least one key-value pair is matched then the entry is matched.

<details>
    <summary>Usage Example</summary>
  
    ```javascript
        function foo () {
            return null;
        }
    ```
</details>

#### `initialContent`
List of regular expressions used to match the website source code (the HTTP response body). In case at least one regular expression is matched then the entry is matched.

#### `loadedContent`
List of regular expressions used to match the website source code after the "load" event. In case at least one regular expression is matched then the entry is matched.

#### `selectors`
List of CSS selectors, the selectors are queried after the "load" event. In case at least one queried selector returns at least one element then the entry is matched.

#### `scripts/sources`
List of regular expressions used to match the value of the "src" attribute of all script elements. The regular expressions are evaluated after the "load" event. In case at least one regular expression is matched then the entry is matched.

#### `scripts/contents`
List of regular expressions used to match the inner value of all script elements without the "src" attribute. The regular expressions are evaluated after the "load" event. In case at least one regular expression is matched then the entry is matched.

#### `scripts/globalDeclarations`
List of regular expressions used to match the keys created by scripts in the window object. The regular expressions are evaluated after the "load" event. In case at least one regular expression is matched then the entry is matched. Note that only properties of the window object can be matched, and not, for example, a property of a property of the window object (if you need to do this please refer to the `customEvaluation/match` pattern model).

#### `styles/sources`
List of regular expressions used to match the value of the "href" attribute of all style sheet links. The regular expressions are evaluated after the "load" event. In case at least one regular expression is matched then the entry is matched.

#### `styles/contents`
List of regular expressions used to match the inner value of all style elements. The regular expressions are evaluated after the "load" event. In case at least one regular expression is matched then the entry is matched.

#### `metas`
Set of regular expressions used to match meta elements. The regular expressions are evaluated after the "load" event. In case at least one regular expression is matched then the entry is matched.

#### `cookies`
A key-value pair set used to match cookies created in the website.
In case at least one key-value pair is matched then the entry is matched.

#### `localStorage`
A key-value pair set used to match local storage created in the website.
In case at least one key-value pair is matched then the entry is matched.