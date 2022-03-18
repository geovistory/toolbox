// /* eslint-disable @typescript-eslint/no-explicit-any */
// import 'reflect-metadata';
// import {WarehouseStubs} from '../../../../warehouse/createWarehouse';
// import {EntityPathConfigService} from '../../../../warehouse/primary-ds/EntityPathConfigService';
// import {Warehouse} from '../../../../warehouse/Warehouse';
// import {cleanDb} from '../../../helpers/meta/clean-db.helper';
// import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables} from '../../../helpers/warehouse-helpers';
// const stubs: WarehouseStubs = {
//   primaryDataServices: [EntityPathConfigService],
//   aggDataServices: []
// }
// describe('EntityPathConfigService', () => {

//   let wh: Warehouse;
//   let s: EntityPathConfigService;

//   before(async function () {
//     // eslint-disable-next-line @typescript-eslint/no-invalid-this
//     this.timeout(5000); // A very long environment setup.
//     const injector = await setupCleanAndStartWarehouse(stubs)
//     wh = injector.get(Warehouse)
//     s = injector.get(EntityPathConfigService)
//   })
//   beforeEach(async () => {
//     await cleanDb()
//     await truncateWarehouseTables(wh)
//   })
//   after(async function () {
//     await stopWarehouse(wh)
//   })
//   it('should have the entity path configs', async () => {
//     await wh.gvPgPool.query(`select pg_notify('modified_entity_path_config', now()::text)`)
//     await searchUntilSatisfy({
//       notifier$: s.afterChange$,
//       getFn: () => s.index.getFromIdx({
//         pkClass: 503, // Expression portion
//       }),
//       compare: (val) => val?.pathConfigs?.length === 2
//     })
//   })

// });

