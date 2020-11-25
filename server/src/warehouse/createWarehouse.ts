import '@abraham/reflection';
import {ReflectiveInjector} from 'injection-js';
import {APP_CONFIG, Warehouse, WarehouseConfig} from './Warehouse';


export function createWarehouse(config: WarehouseConfig): Warehouse {
  const injector = ReflectiveInjector.resolveAndCreate([
    Warehouse,
    {provide: APP_CONFIG, useValue: config}
  ]);
  return injector.get(Warehouse)
}
