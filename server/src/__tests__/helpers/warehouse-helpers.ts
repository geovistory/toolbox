import {Warehouse} from '../../warehouse/Warehouse';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';

export async function setupWarehouseAndConnect() {

    const main = new Warehouse()
    await main.pgClient.connect()
    main.startListening()
    return main;
}

export async function setupWarehouse() {

    const main = new Warehouse()
    return main;
}

/**
 * Returns a Promise that resolves after given miliseconds
 * @param ms
 */
export async function wait(ms: number) {
    return new Promise(res => {setTimeout(() => res(), ms)})
}

/**
 * Takes an observable and returns a Promis that resolves as soon as
 * the observable nexts the first time.
 * @param observable$
 */
export async function waitUntilNext<M>(observable$: Observable<M>) {
    return new Promise<M>((res) => {observable$.pipe(first()).subscribe((i) => {res(i)})})
}
