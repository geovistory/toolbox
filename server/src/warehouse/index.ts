import { Warehouse } from './Warehouse';

export async function start(rootDir:string) {
    const warehouse = new Warehouse(rootDir)
    await warehouse.start();
}

