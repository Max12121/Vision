export type VisionHTTPResponse = {
    // Used as response status.
    readonly status: number;

    // Used as response headers.
    readonly headers: {
        readonly [name: string]: string
    };

    // Used as response body.
    readonly body: string;
};