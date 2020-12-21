/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@loopback/testlab';
import {RClassService} from '../../../../warehouse/primary-ds/class/RClassService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../helpers/atomic/dfh-api-class.helper';
import {DfhApiClassMock} from '../../../helpers/data/gvDB/DfhApiClassMock';
import {setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables, waitUntilNext} from '../../../helpers/warehouse-helpers';
import {WarehouseStubs} from '../../../../warehouse/createWarehouse';
import {cleanDb} from '../../../helpers/meta/clean-db.helper';
const stubs: WarehouseStubs = {
  primaryDataServices:[RClassService],
  aggDataServices:[]
}
describe('RClassService', () => {

  let wh: Warehouse;
  let s: RClassService;
  before(async function () {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    this.timeout(5000); // A very long environment setup.
    const injector = await setupCleanAndStartWarehouse(stubs)
    wh = injector.get(Warehouse)
    s = injector.get(RClassService)
  })
  beforeEach(async () => {
    await cleanDb()
    await truncateWarehouseTables(wh)
  })
  after(async function () {
    await stopWarehouse(wh)
  })
  it('should add api-class', async () => {
    const {cla} = await createRClassMockData();
    await waitUntilNext(s.afterChange$)
    const result = await s.index.getFromIdx({
      pkClass: cla.dfh_pk_class ?? -1
    })
    expect(result?.fkClass).to.equal(cla.dfh_pk_class)

  })



});

async function createRClassMockData() {
  const cla = await createDfhApiClass(DfhApiClassMock.EN_21_PERSON);
  return { cla };
}

