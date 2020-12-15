/* eslint-disable @typescript-eslint/no-invalid-this */
/* eslint-disable @typescript-eslint/no-explicit-any */
import '@abraham/reflection';
import {expect} from '@loopback/testlab';
import {ProPropertyLabelId, ProPropertyLabelService} from '../../../../warehouse/primary-ds/ProPropertyLabelService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {createProProject} from '../../../helpers/atomic/pro-project.helper';
import {createProTextProperty, deleteProTextProperty} from '../../../helpers/atomic/pro-text-property.helper';
import {createTypes} from '../../../helpers/atomic/sys-system-type.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {ProTextPropertyMock} from '../../../helpers/data/gvDB/ProTextPropertyMock';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, waitUntilNext, truncateWarehouseTables} from '../../../helpers/warehouse-helpers';
import {WarehouseStubs} from '../../../../warehouse/createWarehouse';
const stubs: WarehouseStubs = {
  primaryDataServices:[ProPropertyLabelService],
  aggDataServices:[]
}
describe('ProPropertyLabelService', () => {

  let wh: Warehouse;
  let s: ProPropertyLabelService;


  before(async function () {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    this.timeout(5000); // A very long environment setup.
    const injector = await setupCleanAndStartWarehouse(stubs)
    wh = injector.get(Warehouse)
    s = injector.get(ProPropertyLabelService)
  })
  beforeEach(async () => {
    await cleanDb()
    await truncateWarehouseTables(wh)
  })
  after(async function () {
    await stopWarehouse(wh)
  })

  it('should create pro Property label in db', async () => {
    const txtProp = await createMock();
    expect(txtProp?.string).to.equal(ProTextPropertyMock.PROJ_1_PROPERTY_BROUGHT_INTO_LIFE.string)
  })
  it('should have pro Property label in index', async () => {

    const txtProp = await createMock();
    const id: ProPropertyLabelId = {
      fkProject: txtProp.fk_project ?? -1,
      fkClass: txtProp.fk_dfh_property_domain ?? -1,
      fkProperty: txtProp.fk_dfh_property ?? -1,
      isOutgoing: true,
      fkLanguage: txtProp.fk_language ?? -1,
    }
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare: (val) => val?.label === txtProp.string
    })
  })

  it('should have pro Property label <person - has appellations> in index', async () => {
    await createTypes();
    await createInfLanguage(InfLanguageMock.GERMAN);
    const txtProp = await createProTextProperty(ProTextPropertyMock.PROJ_1_PROPERTY_PERSON_HAS_APPELLATION)
    const id: ProPropertyLabelId = {
      fkProject: txtProp.fk_project ?? -1,
      fkClass: txtProp.fk_dfh_property_range ?? -1,
      fkProperty: txtProp.fk_dfh_property ?? -1,
      isOutgoing: false,
      fkLanguage: txtProp.fk_language ?? -1,
    }
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare: (val) => val?.label === txtProp.string
    })

  })
  it('should have pro Property label <person - has appellations> of default project in index', async () => {
    await createTypes();
    await createInfLanguage(InfLanguageMock.ENGLISH);
    const txtProp = await createProTextProperty(ProTextPropertyMock.PROJ_DEF_EN_PROPERTY_PERSON_HAS_APPELLATION)
    const id: ProPropertyLabelId = {
      fkProject: txtProp.fk_project ?? -1,
      fkClass: txtProp.fk_dfh_property_range ?? -1,
      fkProperty: txtProp.fk_dfh_property ?? -1,
      isOutgoing: false,
      fkLanguage: txtProp.fk_language ?? -1,
    }
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare: (val) => val?.label === txtProp.string
    })

  })




  // it('should update pro Property label in index', async () => {
  //   await createLanguages();
  //   await createTypes();
  //   const project = await createProject('German')
  //   const pkProject = project.pk_entity ?? -1;
  //   const str = 'FooPropertyLabel'
  //   const label = await createProTextPropertyPropertyLabel(pkProject, 12, str, AtmLanguages.FRENCH.id)
  //   await waitUntilNext(s.afterPut$)
  //   const id = {
  //     fkProject: label.fk_project ?? -1,
  //     fkLanguage: label.fk_language ?? -1,
  //     fkProperty: label.fk_dfh_property ?? -1
  //   }
  //   const result = await s.index.getFromIdx(id)
  //   expect(result).to.equal(str)

  //   const str2 = 'BarPropertyLabel'
  //   await updateProTextProperty(label.pk_entity ?? -1, {string: str2})

  //   await waitUntilNext(s.afterPut$)

  //   const resultUpdated = await s.index.getFromIdx(id)
  //   expect(resultUpdated).to.equal(str2)
  // })

  it('should delete pro Property label in index', async () => {

    const txtProp = await createMock();

    const id: ProPropertyLabelId = {
      fkProject: txtProp.fk_project ?? -1,
      fkClass: txtProp.fk_dfh_property_domain ?? -1,
      fkProperty: txtProp.fk_dfh_property ?? -1,
      isOutgoing: true,
      fkLanguage: txtProp.fk_language ?? -1,
    }
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare: (val) => val?.label === txtProp.string
    })

    await deleteProTextProperty(txtProp.pk_entity ?? -1)

    await waitUntilNext(s.afterChange$)
    const resultUpdated = await s.index.getFromIdxWithTmsps(id)
    expect(resultUpdated?.deleted).not.to.be.undefined()
  })

});

async function createMock() {
  await createTypes();
  await createInfLanguage(InfLanguageMock.GERMAN);
  await createProProject(ProProjectMock.PROJECT_1);
  const label = await createProTextProperty(ProTextPropertyMock.PROJ_1_PROPERTY_BROUGHT_INTO_LIFE);
  return label;
}

