import { VisionSet } from "../utilities/collections/VisionSet";
import { VisionEntry } from "./VisionEntry";

export class VisionEntrySet extends VisionSet<VisionEntry> {
    public constructor () {
        super((entry: VisionEntry) => {
            return entry.name;
        });
    }

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