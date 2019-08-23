import * as FileSystem from "fs";
import { VisionEntry } from "./VisionEntry";

export class VisionEntrySet {
    private readonly _entries: {
        [name: string]: VisionEntry;
    };

    public constructor () {
        // Silence is golden.
    }

    public add (entry: VisionEntry): void {
        this._entries[entry.name] = entry;
    }

    public get (entryName: string): VisionEntry {
        return this._entries[entryName] || null;
    }

    public has (entryName: string): boolean {
        return this.get(entryName) !== null;
    }

    public remove (entryName: string): void {
        delete this._entries[entryName];
    }

    public toArray (): VisionEntry[] {
        return Object.keys(this._entries).map((entryName: string): VisionEntry => this._entries[entryName]);
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