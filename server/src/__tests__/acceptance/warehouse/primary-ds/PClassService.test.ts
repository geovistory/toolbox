/* eslint-disable @typescript-eslint/no-explicit-any */
import '@abraham/reflection';
import {PClassService} from '../../../../warehouse/primary-ds/class/PClassService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../helpers/atomic/dfh-api-class.helper';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {createProDfhProfileProjRel, updateProDfhProfileProjRel} from '../../../helpers/atomic/pro-dfh-profile-proj-rel.helper';
import {createProProject} from '../../../helpers/atomic/pro-project.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {DfhApiClassMock} from '../../../helpers/data/gvDB/DfhApiClassMock';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
import {ProDfhProfileProjRelMock} from '../../../helpers/data/gvDB/ProDfhProfileProjRelMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables} from '../../../helpers/warehouse-helpers';
import {WarehouseStubs} from '../../../../warehouse/createWarehouse';
const stubs: WarehouseStubs = {
  primaryDataServices:[PClassService],
  aggDataServices:[]
}
describe('PClassService', function () {

  let wh: Warehouse;
  let s: PClassService;

  before(async function () {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    this.timeout(5000); // A very long environment setup.
    const injector = await setupCleanAndStartWarehouse(stubs)
    wh = injector.get(Warehouse)
    s = injector.get(PClassService)
  })
  beforeEach(async () => {
    await cleanDb()
    await truncateWarehouseTables(wh)
  })
  after(async function () {
    await stopWarehouse(wh)
  })

  it('should add project-class', async () => {
    const {prel, cla} = await createPClassMockData();
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx({
        fkProject: prel.fk_project ?? -1,
        pkClass: cla.dfh_pk_class ?? -1
      }),
      compare: (val) => val?.fkClass === cla.dfh_pk_class
    })
  })



  it('should delete project-class', async () => {
    const {prel, cla} = await createPClassMockData();
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx({
        fkProject: prel.fk_project ?? -1,
        pkClass: cla.dfh_pk_class ?? -1
      }),
      compare: (val) => val?.fkClass === cla.dfh_pk_class
    })

    await updateProDfhProfileProjRel(prel.pk_entity ?? -1, {enabled: false})

    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdxWithTmsps({
        fkProject: prel.fk_project ?? -1,
        pkClass: cla.dfh_pk_class ?? -1
      }),
      compare: (val) => !!val?.deleted
    })
  })

});

async function createPClassMockData() {
  await createInfLanguage(InfLanguageMock.GERMAN);
  await createProProject(ProProjectMock.PROJECT_1);
  const prel = await createProDfhProfileProjRel(ProDfhProfileProjRelMock.PROJ_1_PROFILE_4);
  const cla = await createDfhApiClass(DfhApiClassMock.EN_21_PERSON);
  return {prel, cla};
}

