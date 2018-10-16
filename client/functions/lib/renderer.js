"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
class ScreenshotError extends Error {
    constructor(type) {
        super(type);
        this.name = this.constructor.name;
        this.type = type;
    }
}
exports.ScreenshotError = ScreenshotError;
const MOBILE_USERAGENT = 'Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Mobile Safari/537.36';
/**
 * Wraps Puppeteer's interface to Headless Chrome to expose high level rendering
 * APIs that are able to handle web components and PWAs.
 */
class Renderer {
    constructor(browser) {
        this.browser = browser;
    }
    serialize(requestUrl, isMobile) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Executed on the page after the page has loaded. Strips script and
             * import tags to prevent further loading of resources.
             */
            function stripPage() {
                // Strip only script tags that contain JavaScript (either no type attribute or one that contains "javascript")
                const elements = document.querySelectorAll('script:not([type]), script[type*="javascript"], link[rel=import]');
                for (const e of Array.from(elements)) {
                    e.remove();
                }
            }
            /**
             * Injects a <base> tag which allows other resources to load. This
             * has no effect on serialised output, but allows it to verify render
             * quality.
             */
            function injectBaseHref(origin) {
                const base = document.createElement('base');
                base.setAttribute('href', origin);
                const bases = document.head.querySelectorAll('base');
                if (bases.length) {
                    // Patch existing <base> if it is relative.
                    const existingBase = bases[0].getAttribute('href') || '';
                    if (existingBase.startsWith('/')) {
                        bases[0].setAttribute('href', origin + existingBase);
                    }
                }
                else {
                    // Only inject <base> if it doesn't already exist.
                    document.head.insertAdjacentElement('afterbegin', base);
                }
            }
            const page = yield this.browser.newPage();
            page.setViewport({ width: 1000, height: 1000, isMobile });
            if (isMobile) {
                page.setUserAgent(MOBILE_USERAGENT);
            }
            page.evaluateOnNewDocument('customElements.forcePolyfill = true');
            page.evaluateOnNewDocument('ShadyDOM = {force: true}');
            page.evaluateOnNewDocument('ShadyCSS = {shimcssproperties: true}');
            let response = null;
            // Capture main frame response. This is used in the case that rendering
            // times out, which results in puppeteer throwing an error. This allows us
            // to return a partial response for what was able to be rendered in that
            // time frame.
            page.addListener('response', (r) => {
                if (!response) {
                    response = r;
                }
            });
            try {
                // Navigate to page. Wait until there are no oustanding network requests.
                response = yield page.goto(requestUrl, { timeout: 10000, waitUntil: 'networkidle0' });
            }
            catch (e) {
                console.error(e);
            }
            if (!response) {
                console.error('response does not exist');
                // This should only occur when the page is about:blank. See
                // https://github.com/GoogleChrome/puppeteer/blob/v1.5.0/docs/api.md#pagegotourl-options.
                return { status: 400, content: '' };
            }
            // Disable access to compute metadata. See
            // https://cloud.google.com/compute/docs/storing-retrieving-metadata.
            if (response.headers()['metadata-flavor'] === 'Google') {
                return { status: 403, content: '' };
            }
            // Set status to the initial server's response code. Check for a <meta
            // name="render:status_code" content="4xx" /> tag which overrides the status
            // code.
            let statusCode = response.status();
            const newStatusCode = yield page
                .$eval('meta[name="render:status_code"]', (element) => parseInt(element.getAttribute('content') || ''))
                .catch(() => undefined);
            // On a repeat visit to the same origin, browser cache is enabled, so we may
            // encounter a 304 Not Modified. Instead we'll treat this as a 200 OK.
            if (statusCode === 304) {
                statusCode = 200;
            }
            // Original status codes which aren't 200 always return with that status
            // code, regardless of meta tags.
            if (statusCode === 200 && newStatusCode) {
                statusCode = newStatusCode;
            }
            // Remove script & import tags.
            yield page.evaluate(stripPage);
            // Inject <base> tag with the origin of the request (ie. no path).
            const parsedUrl = url.parse(requestUrl);
            yield page.evaluate(injectBaseHref, `${parsedUrl.protocol}//${parsedUrl.host}`);
            // Serialize page.
            const result = yield page.evaluate('document.firstElementChild.outerHTML');
            yield page.close();
            return { status: statusCode, content: result };
        });
    }
    screenshot(
    // tslint:disable-next-line:no-shadowed-variable
    url, isMobile, dimensions, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield this.browser.newPage();
            page.setViewport({ width: dimensions.width, height: dimensions.height, isMobile });
            if (isMobile) {
                page.setUserAgent(MOBILE_USERAGENT);
            }
            let response = null;
            try {
                // Navigate to page. Wait until there are no oustanding network requests.
                response =
                    yield page.goto(url, { timeout: 10000, waitUntil: 'networkidle0' });
            }
            catch (e) {
                console.error(e);
            }
            if (!response) {
                throw new ScreenshotError('NoResponse');
            }
            // Disable access to compute metadata. See
            // https://cloud.google.com/compute/docs/storing-retrieving-metadata.
            if (response.headers()['metadata-flavor'] === 'Google') {
                throw new ScreenshotError('Forbidden');
            }
            // Must be jpeg & binary format.
            const screenshotOptions = Object.assign({}, options, { type: 'jpeg', encoding: 'binary' });
            // Screenshot returns a buffer based on specified encoding above.
            // https://github.com/GoogleChrome/puppeteer/blob/v1.8.0/docs/api.md#pagescreenshotoptions
            const buffer = yield page.screenshot(screenshotOptions);
            return buffer;
        });
    }
}
exports.Renderer = Renderer;
//# sourceMappingURL=renderer.js.map