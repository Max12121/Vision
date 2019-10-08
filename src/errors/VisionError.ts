// Represents a generic Vision error.
export class VisionError extends Error {
    public constructor (text?: string) {
        super(text);
        // Used to set the class name in the error log: "${this.name}: ${message}".
        this.name = this.constructor.name;
    }
}