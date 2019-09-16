import { Vision } from "./src/Vision";

export class Index {
    public static async main (): Promise<void> {
        console.log(await Vision.cast("http://malgol.com"));
    }
}

void (async function (): Promise<void> {
    await Index.main();
}());