export namespace VisionUtilities {
    // Used to remove properties from a given object.
    export function removeObjectProperties (subject: any, properties: string[] = []): void {
        properties.forEach((property: string): void => {
            delete subject[property];
        });
    }

    // Used to merge two options objects.
    export function mergeOptions (defaultOptions: any, userOptions: any): any {
        const options: any = {
            ...defaultOptions,
            ...userOptions,
        };

        for (const hash in defaultOptions) {
            const defaultValue: any = defaultOptions[hash];
            const userValue: any = userOptions[hash];

            if (defaultValue.constructor === Object && userValue.constructor === Object) {
                options[hash] = mergeOptions(defaultValue, userValue);
            }
        }

        return options;
    }
}