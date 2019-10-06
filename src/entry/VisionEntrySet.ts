import { VisionSet } from "../utilities/collections/VisionSet";
import { VisionEntry } from "./VisionEntry";

// Represents a set of entries based on their name.
export class VisionEntrySet extends VisionSet<VisionEntry> {
    public constructor () {
        super((entry: VisionEntry): string => {
            return entry.name;
        });
    }

    // Used to get a subset of entries by category.
    public getByCategory (category: string): VisionEntrySet {
        const entries: VisionEntrySet = new VisionEntrySet();

        for (const entry of this.valuesToArray()) {
            if (entry.categories.includes(category)) {
                entries.add(entry);
            }
        }

        return entries;
    }
}