import { Warehouse } from './Warehouse';

export async function main() {
    const warehouse = new Warehouse()
    await warehouse.start();
}