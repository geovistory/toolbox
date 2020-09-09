import { Warehouse } from './Warehouse';

export async function init(rootDir:string) {
    const warehouse = new Warehouse(rootDir)
    await warehouse.init();
}


export async function listen(rootDir:string) {
    const warehouse = new Warehouse(rootDir)
    await warehouse.listen();
}
