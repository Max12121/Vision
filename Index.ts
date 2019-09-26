import { Vision } from "./src/Vision";

abstract class Index {
    public static async main (): Promise<void> {
        console.log(await Vision.cast("https://www.iubenda.com"));
    }
}

void (async (): Promise<void> => {
    await Index.main();
})();