import { Warehouse } from './Warehouse';

export async function init() {
    const warehouse = new Warehouse()
    await warehouse.init();
}


export async function listen() {
    const warehouse = new Warehouse()
    await warehouse.listen();
}
