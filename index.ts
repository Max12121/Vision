import { Vision } from "./src/Vision";

(async function main (): Promise<void> {
    console.log(await Vision.cast("https://www.decathlon.ro/"));
}());