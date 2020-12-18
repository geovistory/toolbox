/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import {PPropertyId, PPropertyService} from '../../../../warehouse/primary-ds/property/PPropertyService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../helpers/atomic/dfh-api-class.helper';
import {createDfhApiProperty} from '../../../helpers/atomic/dfh-api-property.helper';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {createProDfhProfileProjRel, updateProDfhProfileProjRel} from '../../../helpers/atomic/pro-dfh-profile-proj-rel.helper';
import {createProProject} from '../../../helpers/atomic/pro-project.helper';
import {DfhApiClassMock} from '../../../helpers/data/gvDB/DfhApiClassMock';
import {DfhApiPropertyMock} from '../../../helpers/data/gvDB/DfhApiPropertyMock';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
import {ProDfhProfileProjRelMock} from '../../../helpers/data/gvDB/ProDfhProfileProjRelMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables, waitUntilNext} from '../../../helpers/warehouse-helpers';
import {WarehouseStubs} from '../../../../warehouse/createWarehouse';
import {cleanDb} from '../../../helpers/meta/clean-db.helper';
const stubs: WarehouseStubs = {
  primaryDataServices:[PPropertyService],
  aggDataServices:[]
}
describe('PPropertyService', function () {

  let wh: Warehouse;
  let s: PPropertyService;

  before(async function () {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    this.timeout(5000); // A very long environment setup.
    const injector = await setupCleanAndStartWarehouse(stubs)
    wh = injector.get(Warehouse)
    s = injector.get(PPropertyService)
  })
  beforeEach(async () => {
    await cleanDb()
    await truncateWarehouseTables(wh)
  })
  after(async function () {
    await stopWarehouse(wh)
  })
  it('should add project-property', async () => {
    const {prel, prop} = await createPPropertyMockData();

    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx({
        fkProject: prel.fk_project ?? -1,
        pkProperty: prop.dfh_pk_property ?? -1,
        fkDomain: prop.dfh_property_domain ?? -1,
        fkRange: prop.dfh_property_range ?? -1
      }),
      compare: (val) => val?.fkProperty === prop.dfh_pk_property
    })
  })



  it('should delete project-property', async () => {
    const {prel, prop} = await createPPropertyMockData();
    await waitUntilNext(s.afterChange$)

    await updateProDfhProfileProjRel(prel.pk_entity ?? -1, {enabled: false})
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdxWithTmsps({
        fkProject: prel.fk_project ?? -1,
        pkProperty: prop.dfh_pk_property ?? -1,
        fkDomain: prop.dfh_property_domain ?? -1,
        fkRange: prop.dfh_property_range ?? -1
      }),
      compare: (val) => !!val?.deleted
    })
  })

  it('should add generic incoming 1111 for class Person', async () => {
    await createInfLanguage(InfLanguageMock.GERMAN);
    const project = await createProProject(ProProjectMock.PROJECT_1);
    await createProDfhProfileProjRel(ProDfhProfileProjRelMock.PROJ_1_PROFILE_4);
    const klass = await createDfhApiClass(DfhApiClassMock.EN_21_PERSON);

    const id: PPropertyId = {
      fkProject: project.pk_entity ?? -1,
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
  await createInfLanguage(InfLanguageMock.GERMAN);
  await createProProject(ProProjectMock.PROJECT_1);
  const prel = await createProDfhProfileProjRel(ProDfhProfileProjRelMock.PROJ_1_PROFILE_4);
  const prop = await createDfhApiProperty(DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE);
  return {prel, prop};
}

