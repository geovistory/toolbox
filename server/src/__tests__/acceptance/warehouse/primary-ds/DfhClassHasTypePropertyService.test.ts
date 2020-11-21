/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {DfhClassHasTypePropertyService, RClassId} from '../../../../warehouse/primary-ds/DfhClassHasTypePropertyService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createDfhApiProperty, updateDfhApiProperty} from '../../../helpers/atomic/dfh-api-property.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {DfhApiPropertyMock} from '../../../helpers/data/gvDB/DfhApiPropertyMock';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables} from '../../../helpers/warehouse-helpers';

describe('DfhClassHasTypePropertyService', () => {

  let wh: Warehouse;
  let s: DfhClassHasTypePropertyService;

  before(async function () {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    this.timeout(5000); // A very long environment setup.
    wh = await setupCleanAndStartWarehouse()
    s = wh.prim.dfhClassHasTypeProperty
  })
  beforeEach(async () => {
    await cleanDb()
    await truncateWarehouseTables(wh)
  })
  after(async function () {
    await stopWarehouse(wh)
  })
  it('should have class-has-type-property in index', async () => {
    await createDfhApiProperty(DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE)
    const id: RClassId = {
      pkClass: DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE.dfh_property_domain
    }
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare: (val) => val?.fkProperty === DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE.dfh_pk_property
    })

  })

  it('should delete class-has-type-property in index', async () => {
    const prop = await createDfhApiProperty(DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE)
    const id: RClassId = {
      pkClass: DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE.dfh_property_domain
    }
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare: (val) => val?.fkProperty === DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE.dfh_pk_property
    })
    await updateDfhApiProperty(prop.pk_entity, {dfh_is_has_type_subproperty: false})

    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdxWithTmsps(id),
      compare: (item) => !!item?.deleted
    })
  })


});

