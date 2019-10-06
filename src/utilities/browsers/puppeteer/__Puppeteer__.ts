// tslint:disable
// Used to prevent puppeteer from being detected.
(function () {
    // Bypass detection through "navigator.languages".
    Object.defineProperty(navigator, "languages", {
        get: function () {
            return [
                "en-US",
                "en",
            ];
        },
    });

    // Bypass detection through "navigator.plugins".
    Object.defineProperty(navigator, "plugins", {
        get: function () {
            return [
                {},
                {},
                {},
            ];
        },
    });

    // Bypass detection through WebGL "getParameter".
    // @ts-ignore
    WebGLRenderingContext.prototype.getParameter = function (parameter) {
        return "undefined";
    };

    // Bypass detection through image size verification.
    [ "width", "height", ].forEach((property) => {
        const imageDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, property);

        Object.defineProperty(HTMLImageElement.prototype, property, {
            ...imageDescriptor,
            get: function () {
                if (this.complete && this.naturalHeight == 0) {
                    return 20;
                }

                return imageDescriptor.get.apply(this);
            },
        });
    });

    // Bypass detection through "modernizr".
    const elementDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetHeight");
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
        ...elementDescriptor,
        get: function () {
            if (this.id === "modernizr") {
                return 1;
            }

            return elementDescriptor.get.apply(this);
        },
    });

    // Bypass detection through "webdriver".
    // @ts-ignore
    const newWebDriverProto = navigator.__proto__;
    delete newWebDriverProto.webdriver;
    // @ts-ignore
    navigator.__proto__ = newWebDriverProto;

    // Bypass detection through the "chrome" property.
    // @ts-ignore
    window.chrome = {
        runtime: {},
    };

    // Bypass detection through iframe "contentWindow" verification.
    Object.defineProperty(HTMLIFrameElement.prototype, "contentWindow", {
        get: function () {
            return window;
        }
    });

    // Bypass detection through "console.debug".
    // @ts-ignore
    window.console.debug = () => undefined;

    // Bypass detection through navigator permissions verification.
    const originalQuery = window.navigator.permissions.query;
    // @ts-ignore
    window.navigator.permissions.__proto__.query = (parameters) => parameters.name === "notifications"
        ? Promise.resolve({
            state: Notification.permission,
        })
        : originalQuery(parameters);

    const oldCall = Function.prototype.call;
    function call () {
        return oldCall.apply(this, arguments);
    }
    Function.prototype.call = call;

    const nativeToStringFunctionString = Error.toString().replace(/Error/g, "toString");
    const oldToString = Function.prototype.toString;

    function functionToString () {
        if (this === window.navigator.permissions.query) {
            return "function query() { [native code] }";
        }

        if (this === functionToString) {
            return nativeToStringFunctionString;
        }

        return oldCall.call(oldToString, this);
    }

    Function.prototype.toString = functionToString;
}());