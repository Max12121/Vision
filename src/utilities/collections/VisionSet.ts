export class VisionSet<T> {
    private readonly _toHash: (element: T) => string;
    private readonly _elements: {
        [hash: string]: T;
    };

    public constructor (toHash: (element: T) => string) {
        this._toHash = toHash;
        this._elements = {};
    }

    public get length (): number {
        return Object.keys(this._elements).length;
    }

    public add (element: T): void {
        this._elements[this._toHash(element)] = element;
    }

    public get (hash: string): T | null {
        return this._elements[hash] || null;
    }

    public has (hash: string): boolean {
        return this.get(hash) !== null;
    }

    public remove (hash: string): void {
        delete this._elements[hash];
    }

    public clear (): void {
        Object.keys(this._elements).forEach((hash: string): void => {
            this.remove(hash);
        });
    }

    public valuesToArray (): T[] {
        return Object.keys(this._elements).map((hash: string): T => {
            return this._elements[hash];
        });
    }
}