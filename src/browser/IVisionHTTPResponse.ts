// Represents a HTTP response with the information necessary to Vision.
export interface IVisionHTTPResponse {
    // Represents the response status.
    readonly status: number;

    // Represents the response headers.
    readonly headers: {
        readonly [name: string]: string
    };

    // Represents the response body.
    readonly body: string;
}