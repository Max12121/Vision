export namespace VisionUtilities {
    // Used to remove properties from a given object.
    export function removeObjectProperties (subject: any, properties: string[] = []): void {
        properties.forEach((property: string): void => {
            delete subject[property];
        });
    }
}