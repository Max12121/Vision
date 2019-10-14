#!/usr/bin/env node

import {
    Vision,
    VisionDescriptor,
    MatchedVisionEntry
} from "./VisionExport";

const log: any = console.log;

void (async (): Promise<void> => {
    const URI: string = process.argv[2];
    const isJSON: boolean = process.argv.includes("--json");

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

    log(`The matched entries for ${URI}`);
    log("-------------------------");

    if (isJSON) {
        log(JSON.stringify(descriptor, null, 4));
    }
    else {
        descriptor.entries.forEach((matchedEntry: MatchedVisionEntry): void => {
            log("| " + matchedEntry.name);
            log("|-- " + matchedEntry.description);

            if (matchedEntry.version) {
                log("|----- " + matchedEntry.version);
            }

            if (matchedEntry.extra) {
                for (const name in matchedEntry.extra) {
                    log("|---------- " + name + " => " + matchedEntry.extra[name]);
                }
            }

            log("-------------------------");
        });
    }
})();