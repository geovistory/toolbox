/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from '@loopback/testlab';
import { DfhClassHasTypePropertyService } from '../../../../warehouse/primary-ds/DfhClassHasTypePropertyService';
import { Warehouse } from '../../../../warehouse/Warehouse';
import { createDfhApiProperty, updateDfhApiProperty } from '../../../helpers/atomic/dfh-api-property.helper';
import { cleanDb } from '../../../helpers/meta/clean-db.helper';
import { DfhApiPropertyMock } from '../../../helpers/data/gvDB/DfhApiPropertyMock';
import { setupCleanAndStartWarehouse, waitUntilNext } from '../../../helpers/warehouse-helpers';

describe('DfhClassHasTypePropertyService', () => {

  let wh: Warehouse;
  let s: DfhClassHasTypePropertyService;

  beforeEach(async function () {
    await cleanDb();
    wh = await setupCleanAndStartWarehouse()
    s = wh.prim.dfhClassHasTypeProperty;
  })
  afterEach(async function () { await wh.stop() })

  it('should have class-has-type-property in index', async () => {
    await createDfhApiProperty(DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE)
    await waitUntilNext(s.afterPut$)
    const result = await s.index.getFromIdx({
      pkClass: DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE.dfh_property_domain
    })
    expect(result).to.equal(DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE.dfh_pk_property)

  })

  it('should delete class-has-type-property in index', async () => {
    const item = await createDfhApiProperty(DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE)
    await waitUntilNext(s.afterPut$)
    const id = {
      pkClass: DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE.dfh_property_domain
    }
    let result = await s.index.getFromIdx(id)
    expect(result).to.equal(DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE.dfh_pk_property)

    await updateDfhApiProperty(item.pk_entity, { dfh_is_has_type_subproperty: false })

    await waitUntilNext(s.afterDel$)
    result = await s.index.getFromIdx(id)
    expect(result).to.be.undefined()
  })


});

