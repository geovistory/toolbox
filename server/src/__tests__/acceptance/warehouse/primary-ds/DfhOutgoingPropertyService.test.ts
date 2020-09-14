/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@loopback/testlab';
import {DfhOutgoingPropertyService} from '../../../../warehouse/primary-ds/DfhOutgoingPropertyService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createDfhApiProperty} from '../../../helpers/atomic/dfh-api-property.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {DfhApiPropertyMock} from '../../../helpers/data/gvDB/DfhApiPropertyMock';
import {setupCleanAndStartWarehouse, waitUntilSatisfy} from '../../../helpers/warehouse-helpers';

describe('DfhOutgoingPropertyService', () => {

  let wh: Warehouse;
  let s: DfhOutgoingPropertyService;

  beforeEach(async function () {
    await cleanDb();
    wh = await setupCleanAndStartWarehouse()
    s = wh.prim.dfhOutgoingProperty;
  })
  afterEach(async function () {await wh.stop()})


  it('should have two outgoing properties in index', async () => {
    await Promise.all([
      createDfhApiProperty(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE),
      createDfhApiProperty(DfhApiPropertyMock.EN_1435_STEMS_FROM)
    ])

    const a = await waitUntilSatisfy(s.afterPut$, (item) => {
      return item.key.fkDomain === 61
        && item.key.fkProperty === 86
    })
    const b = await waitUntilSatisfy(s.afterPut$, (item) => {
      return item.key.fkDomain === 61
        && item.key.fkProperty === 1435
    })

    expect(a.val.dfhIdentityDefining).to.equal(true)
    expect(b.val.dfhIdentityDefining).to.equal(false)

  })


});

