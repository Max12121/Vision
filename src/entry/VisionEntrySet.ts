import { VisionSet } from "../utilities/collections/VisionSet";
import { VisionEntry } from "./VisionEntry";

export class VisionEntrySet extends VisionSet<VisionEntry> {
    public constructor () {
        super((entry: VisionEntry) => {
            return entry.name;
        });
    }

    public getByCategories (categories: string[]): VisionEntrySet {
        let entries: VisionEntrySet = this;

        for (const category of categories) {
            entries = this.getByCategory(category);

            if (entries.length === 0) {
                break;
            }
        }

        return entries;
    }

    private getByCategory (category: string): VisionEntrySet {
        const entries: VisionEntrySet = new VisionEntrySet();

        for (const entry of this.valuesToArray()) {
            if (entry.categories.includes(category)) {
                entries.add(entry);
            }
        }

        return entries;
    }
}