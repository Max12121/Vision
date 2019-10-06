// Represents a HTTP response (with the information necessary to Vision).
export interface IVisionHTTPResponse {
    // Represents the response status.
    status: number;

    // Represents the response headers.
    headers: {
        [name: string]: string;
    };

    // Represents the response body.
    body: string;
}