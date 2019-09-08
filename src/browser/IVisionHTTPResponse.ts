// Represents a HTTP response with the information necessary to Vision.
export interface IVisionHTTPResponse {
    // Used as response status.
    readonly status: number;

    // Used as response headers.
    readonly headers: {
        readonly [name: string]: string
    };

    // Used as response body.
    readonly body: string;
}