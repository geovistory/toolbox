/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@loopback/testlab';
import {ProPropertyLabelService} from '../../../../warehouse/primary-ds/ProPropertyLabelService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {AtmLanguages, createLanguages} from '../../../helpers/atomic/inf-language.helper';
import {createProject} from '../../../helpers/atomic/pro-project.helper';
import {createProTextPropertyPropertyLabel, deleteProTextProperty, updateProTextProperty} from '../../../helpers/atomic/pro-text-property.helper';
import {createTypes} from '../../../helpers/atomic/sys-system-type.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {setupCleanAndStartWarehouse, waitUntilNext} from '../../../helpers/warehouse-helpers';

describe('ProPropertyLabelService', () => {

  let wh: Warehouse;
  let s: ProPropertyLabelService;


  beforeEach(async function () {
    await cleanDb();
    wh = await setupCleanAndStartWarehouse()
    s = wh.prim.proPropertyLabel;
  })

  afterEach(async function () {
    await wh.stop()
  })

  it('should create pro Property label in db', async () => {
    await createLanguages();
    await createTypes();
    const project = await createProject('German')
    const pkProject = project.pk_entity ?? -1;
    const str = 'FooPropertyLabel'
    const label = await createProTextPropertyPropertyLabel(pkProject, 12, str, AtmLanguages.FRENCH.id)
    expect(label?.string).to.equal(str)
  })
  it('should have pro Property label in index', async () => {

    await createLanguages();
    await createTypes();
    const project = await createProject('German')
    const pkProject = project.pk_entity ?? -1;
    const str = 'FooPropertyLabel'
    const label = await createProTextPropertyPropertyLabel(pkProject, 12, str, AtmLanguages.FRENCH.id)

    await waitUntilNext(s.afterPut$)

    const result = await s.index.getFromIdx({
      fkProject: label.fk_project ?? -1,
      fkLanguage: label.fk_language ?? -1,
      fkProperty: label.fk_dfh_property ?? -1
    })
    expect(result).to.equal(str)

  })

  it('should update pro Property label in index', async () => {
    await createLanguages();
    await createTypes();
    const project = await createProject('German')
    const pkProject = project.pk_entity ?? -1;
    const str = 'FooPropertyLabel'
    const label = await createProTextPropertyPropertyLabel(pkProject, 12, str, AtmLanguages.FRENCH.id)
    await waitUntilNext(s.afterPut$)
    const id = {
      fkProject: label.fk_project ?? -1,
      fkLanguage: label.fk_language ?? -1,
      fkProperty: label.fk_dfh_property ?? -1
    }
    const result = await s.index.getFromIdx(id)
    expect(result).to.equal(str)

    const str2 = 'BarPropertyLabel'
    await updateProTextProperty(label.pk_entity ?? -1, {string: str2})

    await waitUntilNext(s.afterPut$)

    const resultUpdated = await s.index.getFromIdx(id)
    expect(resultUpdated).to.equal(str2)
  })

  it('should delete pro Property label in index', async () => {
    await createLanguages();
    await createTypes();
    const project = await createProject('German')
    const pkProject = project.pk_entity ?? -1;
    const str = 'FooPropertyLabel'
    const label = await createProTextPropertyPropertyLabel(pkProject, 12, str, AtmLanguages.FRENCH.id)
    await waitUntilNext(s.afterPut$)

    const id = {
      fkProject: label.fk_project ?? -1,
      fkLanguage: label.fk_language ?? -1,
      fkProperty: label.fk_dfh_property ?? -1
    }
    const result = await s.index.getFromIdx(id)
    expect(result).to.equal(str)

    await deleteProTextProperty(label.pk_entity ?? -1)

    await waitUntilNext(s.afterDel$)
    const resultUpdated = await s.index.getFromIdx(id)
    expect(resultUpdated).to.be.undefined()
  })

});

