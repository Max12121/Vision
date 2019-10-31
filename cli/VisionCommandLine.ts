#!/usr/bin/env node

import {
    Vision,
    VisionDescriptor,
    MatchedVisionEntry
} from "../src/Vision";

const log: any = console.log;

async function request (parameters: string[]): Promise<void> {
    const URI: string = parameters[2];
    const isJSON: boolean = parameters.includes("--json");

    if (!URI || URI.length === 0) {
        log("Vision requires a URI to proceed.");

        return;
    }

    const descriptor: VisionDescriptor = await Vision.cast(URI);

    descriptor.entries.sort((left: MatchedVisionEntry, right: MatchedVisionEntry): number => {
        return left.name < right.name ? -1 : 1;
    });

    if (descriptor.entries.length === 0) {
        log("No matched entries.");

        return;
    }

    log("");
    log(`${URI}`);

    if (isJSON) {
        log(JSON.stringify(descriptor, null, 4));
    }
    else {
        descriptor.entries.forEach((matchedEntry: MatchedVisionEntry): void => {
            log("  |");
            log("  |-- " + matchedEntry.name);

            if (matchedEntry.description) {
                log("  |    |--- " + matchedEntry.description);
            }
            else {
                log("  |    |--- " + "No description.");
            }

            if (matchedEntry.uri) {
                log("  |    |--- " + matchedEntry.uri);
            }

            if (matchedEntry.version) {
                log("  |    |------- " + matchedEntry.version);
            }

            if (matchedEntry.extra) {
                for (const name in matchedEntry.extra) {
                    log("  |    |----------- " + name + " = " + matchedEntry.extra[name]);
                }
            }
        });

        log("  |");
        log(" ---");
    }

    log("");
}

void (async (): Promise<void> => {
    await request(process.argv);
})();