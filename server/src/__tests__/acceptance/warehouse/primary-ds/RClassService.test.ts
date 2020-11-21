/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@loopback/testlab';
import {RClassService} from '../../../../warehouse/primary-ds/class/RClassService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../helpers/atomic/dfh-api-class.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {DfhApiClassMock} from '../../../helpers/data/gvDB/DfhApiClassMock';
import {setupCleanAndStartWarehouse, stopWarehouse, wait, waitUntilNext, truncateWarehouseTables} from '../../../helpers/warehouse-helpers';

describe('RClassService', () => {

  let wh: Warehouse;
  let s: RClassService;
  before(async function () {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    this.timeout(5000); // A very long environment setup.
    wh = await setupCleanAndStartWarehouse()
    s = wh.prim.rClass
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
  return {cla};
}

