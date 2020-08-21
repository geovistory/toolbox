import {Warehouse} from '../../warehouse/Warehouse';

export async function setupWarehouse() {

    const main = new Warehouse()
    await main.pgClient.connect()
    main.startListening()
    return main;
}

/**
 * Returns a Promise that resolves after given miliseconds
 * @param ms
 */
export async function wait(ms: number) {
    return new Promise(res => {setTimeout(() => res(), ms)})
}
