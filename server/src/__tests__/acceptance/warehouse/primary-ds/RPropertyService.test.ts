/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from '@loopback/testlab';
import { RPropertyService } from '../../../../warehouse/primary-ds/property/RPropertyService';
import { Warehouse } from '../../../../warehouse/Warehouse';
import { createDfhApiProperty } from '../../../helpers/atomic/dfh-api-property.helper';
import { cleanDb } from '../../../helpers/meta/clean-db.helper';
import { DfhApiPropertyMock } from '../../../helpers/data/gvDB/DfhApiPropertyMock';
import { setupCleanAndStartWarehouse, waitUntilNext } from '../../../helpers/warehouse-helpers';

describe('RPropertyService', () => {

  let wh: Warehouse;
  let s: RPropertyService;

  beforeEach(async function () {
    await cleanDb();
    wh = await setupCleanAndStartWarehouse()
    s = wh.prim.rProperty;
  })
  afterEach(async function () { await wh.stop() })

  it('should add project-property', async () => {
    const { prop } = await createPPropertyMockData();
    await waitUntilNext(s.afterPut$)
    const result = await s.index.getFromIdx({
      pkProperty: prop.dfh_pk_property ?? -1
    })
    expect(result?.fkProperty).to.equal(prop.dfh_pk_property)

  })

});

async function createPPropertyMockData() {

  const prop = await createDfhApiProperty(DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE);
  return { prop };
}

