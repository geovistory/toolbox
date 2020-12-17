/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from '@loopback/testlab';
import { ProClassLabelService } from '../../../../warehouse/primary-ds/ProClassLabelService';
import { Warehouse } from '../../../../warehouse/Warehouse';
import { createProject } from '../../../helpers/atomic/pro-project.helper';
import { createProTextPropertyClassLabel, deleteProTextProperty, updateProTextProperty } from '../../../helpers/atomic/pro-text-property.helper';
import { createTypes, createLanguages } from '../../../helpers/meta/model.helper';
import { cleanDb } from '../../../helpers/meta/clean-db.helper';
import { setupCleanAndStartWarehouse, waitUntilNext, waitUntilSatisfy } from '../../../helpers/warehouse-helpers';

describe('ProClassLabelService', () => {

  let wh: Warehouse;
  let s: ProClassLabelService;


  beforeEach(async function () {
    await cleanDb();
    wh = await setupCleanAndStartWarehouse()
    s = wh.prim.proClassLabel;
  })

  afterEach(async function () { await wh.stop() })

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

    await waitUntilNext(s.afterPut$)

    const result = await s.index.getFromIdx({
      fkProject: label.fk_project ?? -1,
      fkLanguage: label.fk_language ?? -1,
      fkClass: label.fk_dfh_class ?? -1
    })
    expect(result).to.equal(str)

  })

  it('should update pro class label in index', async () => {
    await createLanguages();
    await createTypes();
    const project = await createProject(18605) //German
    const pkProject = project.pk_entity ?? -1;
    const str = 'FooClassLabel'
    const label = await createProTextPropertyClassLabel(pkProject, 12, str, 19008)
    let result = await waitUntilSatisfy(s.afterPut$, (item) => {
      return item.key.fkProject === label.fk_project
        && item.key.fkLanguage === label.fk_language
        && item.key.fkClass === label.fk_dfh_class
        && item.val === str
    })

    expect(result.val).to.equal(str)

    const str2 = 'BarClassLabel'
    await updateProTextProperty(label.pk_entity ?? -1, { string: str2 })

    result = await waitUntilSatisfy(s.afterPut$, (item) => {
      return item.key.fkProject === label.fk_project
        && item.key.fkLanguage === label.fk_language
        && item.key.fkClass === label.fk_dfh_class
        && item.val === str2
    })

    expect(result.val).to.equal(str2)
  })

  it('should delete pro class label in index', async () => {
    await createLanguages();
    await createTypes();
    const project = await createProject(18605) //German
    const pkProject = project.pk_entity ?? -1;
    const str = 'FooClassLabel'
    const label = await createProTextPropertyClassLabel(pkProject, 12, str, 19008)
    await waitUntilNext(s.afterPut$)

    const id = {
      fkProject: label.fk_project ?? -1,
      fkLanguage: label.fk_language ?? -1,
      fkClass: label.fk_dfh_class ?? -1
    }
    const result = await s.index.getFromIdx(id)
    expect(result).to.equal(str)

    await deleteProTextProperty(label.pk_entity ?? -1)

    await waitUntilNext(s.afterDel$)
    const resultUpdated = await s.index.getFromIdx(id)
    expect(resultUpdated).to.be.undefined()
  })

});

