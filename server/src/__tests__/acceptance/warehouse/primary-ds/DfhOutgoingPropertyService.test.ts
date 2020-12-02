/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import '@abraham/reflection';
import {expect} from '@loopback/testlab';
import {DfhOutgoingPropertyService} from '../../../../warehouse/primary-ds/DfhOutgoingPropertyService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createDfhApiProperty} from '../../../helpers/atomic/dfh-api-property.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {DfhApiPropertyMock} from '../../../helpers/data/gvDB/DfhApiPropertyMock';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables} from '../../../helpers/warehouse-helpers';

describe('DfhOutgoingPropertyService', () => {

  let wh: Warehouse;
  let s: DfhOutgoingPropertyService;

  before(async function () {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    this.timeout(5000); // A very long environment setup.
    const injector = await setupCleanAndStartWarehouse()
    wh = injector.get(Warehouse)
    s = injector.get(DfhOutgoingPropertyService)

  })
  beforeEach(async () => {
    await cleanDb()
    await truncateWarehouseTables(wh)
  })
  after(async function () {
    await stopWarehouse(wh)
  })

  it('should have two outgoing properties in index', async () => {
    await Promise.all([
      createDfhApiProperty(DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE),
      createDfhApiProperty(DfhApiPropertyMock.EN_1435_STEMS_FROM)
    ])

    const [a, b] = await Promise.all([
      await searchUntilSatisfy({
        notifier$: s.afterChange$,
        getFn: () => s.index.getFromIdx({fkDomain: 61, fkProperty: 86}),
        compare: (v) => v?.dfhIdentityDefining === true
      }),
      await searchUntilSatisfy({
        notifier$: s.afterChange$,
        getFn: () => s.index.getFromIdx({fkDomain: 61, fkProperty: 1435}),
        compare: (v) => v?.dfhIdentityDefining === false
      })
    ])

    expect(a?.dfhIdentityDefining).to.equal(true)
    expect(b?.dfhIdentityDefining).to.equal(false)

  })


});

