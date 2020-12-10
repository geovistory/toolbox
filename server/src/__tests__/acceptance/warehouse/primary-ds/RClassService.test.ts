/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from '@loopback/testlab';
import { RClassService } from '../../../../warehouse/primary-ds/class/RClassService';
import { Warehouse } from '../../../../warehouse/Warehouse';
import { createDfhApiClass } from '../../../helpers/atomic/dfh-api-class.helper';
import { cleanDb } from '../../../helpers/meta/clean-db.helper';
import { DfhApiClassMock } from '../../../helpers/data/gvDB/DfhApiClassMock';
import { setupCleanAndStartWarehouse, waitUntilNext } from '../../../helpers/warehouse-helpers';

describe('RClassService', () => {

  let wh: Warehouse;
  let s: RClassService;

  beforeEach(async function () {
    await cleanDb();
    wh = await setupCleanAndStartWarehouse()
    s = wh.prim.rClass;
  })
  afterEach(async function () { await wh.stop() })

  it('should add api-class', async () => {
    const { cla } = await createRClassMockData();
    await waitUntilNext(s.afterPut$)
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

