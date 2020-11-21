/* eslint-disable @typescript-eslint/no-explicit-any */
import {RPropertyId, RPropertyService} from '../../../../warehouse/primary-ds/property/RPropertyService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../helpers/atomic/dfh-api-class.helper';
import {createDfhApiProperty} from '../../../helpers/atomic/dfh-api-property.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {DfhApiClassMock} from '../../../helpers/data/gvDB/DfhApiClassMock';
import {DfhApiPropertyMock} from '../../../helpers/data/gvDB/DfhApiPropertyMock';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables} from '../../../helpers/warehouse-helpers';

describe('RPropertyService', () => {

  let wh: Warehouse;
  let s: RPropertyService;

  before(async function () {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    this.timeout(5000); // A very long environment setup.
    wh = await setupCleanAndStartWarehouse()
    s = wh.prim.rProperty
  })
  beforeEach(async () => {
    await cleanDb()
    await truncateWarehouseTables(wh)
  })
  after(async function () {
    await stopWarehouse(wh)
  })
  it('should add project-property', async () => {
    const {prop} = await createPPropertyMockData();
    const id: RPropertyId = {
      pkProperty: prop.dfh_pk_property ?? -1,
      fkDomain: prop.dfh_property_domain ?? -1,
      fkRange: prop.dfh_property_range ?? -1
    }
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare: (val) => val?.fkProperty === prop.dfh_pk_property
    })
  })


  it('should add generic incoming 1111 for class Person', async () => {
    const klass = await createDfhApiClass(DfhApiClassMock.EN_21_PERSON);
    const id: RPropertyId = {
      pkProperty: 1111,
      fkDomain: 365,
      fkRange: klass.dfh_pk_class
    }
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare: (val) => val?.fkProperty === 1111
    })
  })

});

async function createPPropertyMockData() {
  const prop = await createDfhApiProperty(DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE);
  return {prop};
}

