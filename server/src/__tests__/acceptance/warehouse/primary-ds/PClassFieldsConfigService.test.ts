/* eslint-disable @typescript-eslint/no-explicit-any */
import '@abraham/reflection';
import {PClassId, ProClassFieldsConfigService} from '../../../../warehouse/primary-ds/ProClassFieldsConfigService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {createProClassFieldConfig} from '../../../helpers/atomic/pro-class-field-config.helper';
import {createProProject} from '../../../helpers/atomic/pro-project.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
import {ProClassFieldConfigMock} from '../../../helpers/data/gvDB/ProClassFieldConfigMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables} from '../../../helpers/warehouse-helpers';

describe('PClassFieldsConfigService', () => {

  let wh: Warehouse;
  let s: ProClassFieldsConfigService;

  before(async function () {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    this.timeout(5000); // A very long environment setup.
    const injector = await setupCleanAndStartWarehouse({
      primaryDataServices:[ProClassFieldsConfigService],
      aggDataServices:[]
    })
    wh = injector.get(Warehouse)
    s = injector.get(ProClassFieldsConfigService)
  })
  beforeEach(async () => {
    await cleanDb()
    await truncateWarehouseTables(wh)
  })
  after(async function () {
    await stopWarehouse(wh)
  })
  it('should add project-class', async () => {
    const {one} = await createPClassMockData();
    const id: PClassId = {
      fkProject: one.fk_project ?? -1,
      pkClass: one.fk_domain_class ?? -1,
    }
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare: (val) => !!val?.outgoing[1111] && !!val?.outgoing[1113]
    })
  })



  // it('should delete project-class', async () => {
  //   const {prel, cla} = await createPClassMockData();
  //   await waitUntilNext(s.afterPut$)


  //   await updateProDfhProfileProjRel(prel.pk_entity ?? -1, {enabled: false})

  //   await waitUntilNext(s.afterDel$)
  //   const result = await s.index.getFromIdx({
  //     fkProject: prel.fk_project ?? -1,
  //     pkClass: cla.dfh_pk_class ?? -1
  //   })
  //   expect(result).to.be.undefined()
  // })

});

async function createPClassMockData() {
  await createInfLanguage(InfLanguageMock.GERMAN);
  await createProProject(ProProjectMock.DEFAULT_PROJECT)
  const one = await createProClassFieldConfig(ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1111_IS_APPE_OF)
  const two = await createProClassFieldConfig(ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME)

  return {one, two};
}

