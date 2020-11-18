/* eslint-disable @typescript-eslint/no-explicit-any */
import {RPropertyId, RPropertyService} from '../../../../warehouse/primary-ds/property/RPropertyService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createDfhApiProperty} from '../../../helpers/atomic/dfh-api-property.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {DfhApiPropertyMock} from '../../../helpers/data/gvDB/DfhApiPropertyMock';
import {searchUntilSatisfy, setupCleanAndStartWarehouse} from '../../../helpers/warehouse-helpers';

describe('RPropertyService', () => {

  let wh: Warehouse;
  let s: RPropertyService;

  beforeEach(async function () {
    await cleanDb();
    wh = await setupCleanAndStartWarehouse()
    s = wh.prim.rProperty;
  })
  afterEach(async function () {await wh.stop()})

  it('should add project-property', async () => {
    const {prop} = await createPPropertyMockData();
    const id: RPropertyId = {
      pkProperty: prop.dfh_pk_property ?? -1,
      fkDomain: prop.dfh_property_domain?? -1,
      fkRange: prop.dfh_property_range ?? -1
    }
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare: (val) => val?.fkProperty === prop.dfh_pk_property
    })
  })

});

async function createPPropertyMockData() {

  const prop = await createDfhApiProperty(DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE);
  return {prop};
}

