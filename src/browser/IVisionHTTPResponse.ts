// Represents a HTTP response (contains only the information necessary to Vision).
export interface IVisionHTTPResponse {
    // Used as response status.
    status: number;

    // Used as response headers.
    headers: {
        [name: string]: string;
    };

    // Used as response body.
    body: string;
}