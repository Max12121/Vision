import * as FileSystem from "fs";
import { VisionEntry } from "./VisionEntry";

export class VisionEntrySet {
    private readonly _entries: {
        [name: string]: VisionEntry;
    };

    public constructor () {
        this._entries = {};
    }

    public get length (): number {
        return Object.keys(this._entries).length;
    }

    public add (entry: VisionEntry): void {
        this._entries[entry.name] = entry;
    }

    public get (entryName: string): VisionEntry {
        return this._entries[entryName] || null;
    }

    public getByCategory (category: string): VisionEntrySet {
        const entries: VisionEntrySet = new VisionEntrySet();

        for (const entry of this.valuesToArray()) {
            if (entry.categories.has(category)) {
                entries.add(entry);
            }
        }

        return entries;
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

    public has (entryName: string): boolean {
        return this.get(entryName) !== null;
    }

    public remove (entryName: string): void {
        delete this._entries[entryName];
    }

    public clear (): void {
        Object.keys(this._entries).forEach((entryName: string): void => {
            this.remove(entryName);
        });
    }

    public valuesToArray (): VisionEntry[] {
        return Object.keys(this._entries).map((entryName: string): VisionEntry => {
            return this._entries[entryName];
        });
    }

    public toJSON (): string {
        return JSON.stringify({
            entries: {
                ...this._entries,
            },
        });
    }

    public static fromJSON (filePath: string): VisionEntrySet {
        const staticEntries: string = FileSystem.readFileSync(filePath).toString();
        const jsonEntries: any = JSON.parse(staticEntries);
        const entries: VisionEntrySet = new VisionEntrySet();

        for (const entryName in jsonEntries.entries) {
             const entry: VisionEntry = {
                 name: entryName,
                 ...jsonEntries.entries[entryName],
             };

             entries.add(entry);
        }

        return entries;
    }
}