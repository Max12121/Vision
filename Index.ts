import { Vision } from "./src/Vision";

// Extra information for analytics include user ID, for twitter follow, users to follow, etc...

export class Index {
    public static async main (): Promise<void> {
        console.log(await Vision.cast("https://malgol.com"));
    }
}

(async function (): Promise<void> {
    await Index.main();
}());