import {CoreController} from "./CoreController";

const controller = new CoreController

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

async function main() {
    while (!controller.spin()) {
        await delay(1000);
    }
}

main()