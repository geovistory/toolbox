/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@loopback/testlab';
import {DfhClassHasTypePropertyService} from '../../../../warehouse/primary-ds/DfhClassHasTypePropertyService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createDfhApiProperty} from '../../../helpers/atomic/dfh-api-property.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {DfhApiPropertyMock} from '../../../helpers/data/gvDB/DfhApiPropertyMock';
import {setupCleanAndStartWarehouse, waitUntilNext} from '../../../helpers/warehouse-helpers';

describe('DfhClassHasTypePropertyService', () => {

  let wh: Warehouse;
  let s: DfhClassHasTypePropertyService;

  beforeEach(async function () {
    await cleanDb();
    wh = await setupCleanAndStartWarehouse()
    s = wh.prim.dfhClassHasTypeProperty;
  })

  it('should have project in index', async () => {
    await createDfhApiProperty(DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE)
    await waitUntilNext(s.afterPut$)
    // await createDfhApiProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF)
    // await waitUntilNext(s.afterPut$)
    const result = await s.index.getFromIdx({
      pkClass: DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE.dfh_property_domain
    })
    expect(result).not.equal(DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE.dfh_pk_property)

  })


});

