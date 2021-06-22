/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import {expect} from '@loopback/testlab';
import {ProClassLabelService, ProClassLabelVal} from '../../../../warehouse/primary-ds/ProClassLabelService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createProject} from '../../../helpers/atomic/pro-project.helper';
import {createProTextPropertyClassLabel, deleteProTextProperty, updateProTextProperty} from '../../../helpers/atomic/pro-text-property.helper';
import {createTypes, createLanguages} from '../../../helpers/meta/model.helper';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, waitUntilNext, stopWarehouse, truncateWarehouseTables} from '../../../helpers/warehouse-helpers';
import {WarehouseStubs} from '../../../../warehouse/createWarehouse';
import {cleanDb} from '../../../helpers/meta/clean-db.helper';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
const stubs: WarehouseStubs = {
  primaryDataServices:[ProClassLabelService],
  aggDataServices:[]
}
describe('ProClassLabelService', () => {

  let wh: Warehouse;
  let s: ProClassLabelService;

  before(async function () {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    this.timeout(5000); // A very long environment setup.
    const injector = await setupCleanAndStartWarehouse(stubs)
    wh = injector.get(Warehouse)
    s = injector.get(ProClassLabelService)
  })
  beforeEach(async () => {
    await cleanDb()
    await truncateWarehouseTables(wh)
  })
  after(async function () {
    await stopWarehouse(wh)
  })
  it('should create pro class label in db', async () => {
    await createLanguages();
    await createTypes();
    const project = await createProject(18605) //German
    const pkProject = project.pk_entity ?? -1;
    const str = 'FooClassLabel'
    const label = await createProTextPropertyClassLabel(pkProject, 12, str, 19008) //French
    expect(label?.string).to.equal(str)
  })
  it('should have pro class label in index', async () => {

    await createLanguages();
    await createTypes();
    const project = await createProject(18605) //German
    const pkProject = project.pk_entity ?? -1;
    const str = 'FooClassLabel'
    const label = await createProTextPropertyClassLabel(pkProject, 12, str, 19008) //French

    await waitUntilNext(s.afterChange$)

    const result = await s.index.getFromIdx({
      fkProject: label.fk_project ?? -1,
      fkLanguage: label.fk_language ?? -1,
      fkClass: label.fk_dfh_class ?? -1
    })
    expect(result?.label).to.equal(str)

  })

  it('should update pro class label in index', async () => {
    await createLanguages();
    await createTypes();
    const project = await createProject(18605) //German
    const pkProject = project.pk_entity ?? -1;
    const str = 'FooClassLabel'
    const label = await createProTextPropertyClassLabel(pkProject, 12, str, InfLanguageMock.FRENCH.pk_entity)
    const id = {
      fkClass: label.fk_dfh_class ?? -1,
      fkLanguage: label.fk_language,
      fkProject: label.fk_project
    }
    let result = await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare: (val?: ProClassLabelVal) => val?.label === str
    });

    expect(result?.label).to.equal(str)

    const str2 = 'BarClassLabel'
    await updateProTextProperty(label.pk_entity ?? -1, { string: str2 })

    result = await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare: (val?: ProClassLabelVal) => val?.label === str2
    });

    expect(result?.label).to.equal(str2)
  })

  it('should delete pro class label in index', async () => {
    await createLanguages();
    await createTypes();
    const project = await createProject(18605) //German
    const pkProject = project.pk_entity ?? -1;
    const str = 'FooClassLabel'
    const label = await createProTextPropertyClassLabel(pkProject, 12, str, InfLanguageMock.FRENCH.pk_entity)
    await waitUntilNext(s.afterChange$)

    const id = {
      fkProject: label.fk_project ?? -1,
      fkLanguage: label.fk_language ?? -1,
      fkClass: label.fk_dfh_class ?? -1
    }
    const result = await s.index.getFromIdx(id)
    expect(result?.label).to.equal(str)

    await deleteProTextProperty(label.pk_entity ?? -1)

    await waitUntilNext(s.afterChange$)
    const resultUpdated = await s.index.getFromIdxWithTmsps(id)
    expect(resultUpdated?.deleted).not.to.be.undefined()
  })

});

