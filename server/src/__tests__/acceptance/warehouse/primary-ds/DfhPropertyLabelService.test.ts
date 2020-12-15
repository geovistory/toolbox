/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import '@abraham/reflection';
import {expect} from '@loopback/testlab';
import {DfhPropertyLabelId, DfhPropertyLabelService} from '../../../../warehouse/primary-ds/DfhPropertyLabelService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createDfhApiProperty, deleteDfhApiProperty, updateDfhApiProperty} from '../../../helpers/atomic/dfh-api-property.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {DfhApiPropertyMock} from '../../../helpers/data/gvDB/DfhApiPropertyMock';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, wait, stopWarehouse, truncateWarehouseTables} from '../../../helpers/warehouse-helpers';
import {WarehouseStubs} from '../../../../warehouse/createWarehouse';
const stubs: WarehouseStubs = {
  primaryDataServices:[DfhPropertyLabelService],
  aggDataServices:[]
}
describe('DfhPropertyLabelService', () => {

  let wh: Warehouse;
  let s: DfhPropertyLabelService;

  before(async function () {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    this.timeout(5000); // A very long environment setup.
    const injector = await setupCleanAndStartWarehouse(stubs)
    wh = injector.get(Warehouse)
    s = injector.get(DfhPropertyLabelService)
  })
  beforeEach(async () => {
    await cleanDb()
    await truncateWarehouseTables(wh)
  })
  after(async function () {
    await stopWarehouse(wh)
  })
  it('should have api property label in index after initIdx()', async () => {
    const c = await createDfhApiProperty(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE);
    const id: DfhPropertyLabelId = {pkProperty: c.dfh_pk_property, language: 18889}

    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare:(val)=>val?.label===DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_property_label
    })
  })

  it('should update property label', async () => {
    const c = await createDfhApiProperty({dfh_property_label: 'Foo'})

    const id: DfhPropertyLabelId = {pkProperty: c.dfh_pk_property, language: 18889}

    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare:(val)=>val?.label==='Foo'
    })

    const c2 = await updateDfhApiProperty(c.pk_entity as any, {dfh_property_label: 'Bar'})
    expect(c2.dfh_property_label).to.equal('Bar')

    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare:(val)=>val?.label==='Bar'
    })
  })

  it('should NOT! delete property label', async () => {
    const c = await createDfhApiProperty({dfh_property_label: 'Foo'})
    const id: DfhPropertyLabelId = {pkProperty: c.dfh_pk_property, language: 18889}
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare:(val)=>val?.label==='Foo'
    })

    await deleteDfhApiProperty(c.pk_entity as any)

    await wait(100)
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare:(val)=>val?.label==='Foo'
    })

  })

});
