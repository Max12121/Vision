import { VisionEntrySet } from "./src/entry/VisionEntrySet";

(async function main (): Promise<void> {
    const entries: VisionEntrySet = VisionEntrySet.fromJSON("entries/entries.json");
    const categories: { [name: string]: number } = {};

    for (const entry of entries.toArray()) {
        entry.categories.forEach((category: string): void => {
            if (!categories[category]) {
                categories[category] = 0;
            }

            ++categories[category];
        });
    }

    console.log(`Entries: ${entries.length}.`);
    console.log(categories);
}());