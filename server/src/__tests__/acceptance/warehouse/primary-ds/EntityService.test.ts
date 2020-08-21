/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@loopback/testlab';
import {EntityService} from '../../../../warehouse/primary-ds/EntityService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {createInfPersistentItem, updateInfPersistentItem} from '../../../helpers/atomic/inf-persistent-item.helper';
import {createProInfoProjRel, updateProInfoProjRel} from '../../../helpers/atomic/pro-info-proj-rel.helper';
import {createProProject} from '../../../helpers/atomic/pro-project.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
import {InfPersistentItemMock} from '../../../helpers/data/gvDB/InfPersistentItemMock';
import {ProInfoProjRelMock} from '../../../helpers/data/gvDB/ProInfoProjRelMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {setupWarehouse, wait} from '../../../helpers/warehouse-helpers';

describe('EntityService', () => {

  let wh: Warehouse;
  let s: EntityService;

  before(async () => {
    wh = await setupWarehouse()
    // await wh.pgClient.connect()
  })
  beforeEach(async function () {
    await cleanDb();
    s = new EntityService(wh);
    await s.clearAll()
  })

  it('should have entity in index after initIdx()', async () => {
    const entity = await createInfPersistentItem(InfPersistentItemMock.PERSON_1)
    await createInfLanguage(InfLanguageMock.GERMAN)
    const project = await createProProject(ProProjectMock.PROJECT_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)
    await s.initIdx();
    const result = await s.index.getFromIdx({
      pkEntity: InfPersistentItemMock.PERSON_1.pk_entity ?? -1,
      fkProject: project.pk_entity ?? -1
    })
    expect(result?.fkClass).to.equal(entity?.fk_class)

  })

  it('should update entity if class changed', async () => {
    const entity = await createInfPersistentItem(InfPersistentItemMock.PERSON_1)
    await createInfLanguage(InfLanguageMock.GERMAN)
    const project = await createProProject(ProProjectMock.PROJECT_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)
    await s.initIdx();
    const id = {
      pkEntity: InfPersistentItemMock.PERSON_1.pk_entity ?? -1,
      fkProject: project.pk_entity ?? -1
    }
    let result = await s.index.getFromIdx(id)
    expect(result?.fkClass).to.equal(entity?.fk_class)
    await updateInfPersistentItem(
      InfPersistentItemMock.PERSON_1.pk_entity ?? -1,
      {
        ...InfPersistentItemMock.PERSON_1,
        fk_class: 987654321
      }
    )
    await wait(20)
    result = await s.index.getFromIdx(id)
    expect(result?.fkClass).to.equal(987654321)
  })

  it('should delete entity if removed from project', async () => {
    const entity = await createInfPersistentItem(InfPersistentItemMock.PERSON_1)
    await createInfLanguage(InfLanguageMock.GERMAN)
    const project = await createProProject(ProProjectMock.PROJECT_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)
    await s.initIdx();
    const id = {
      pkEntity: InfPersistentItemMock.PERSON_1.pk_entity ?? -1,
      fkProject: project.pk_entity ?? -1
    }
    let result = await s.index.getFromIdx(id)
    expect(result?.fkClass).to.equal(entity?.fk_class)
    await updateProInfoProjRel(
      ProInfoProjRelMock.PROJ_1_PERSON_1.pk_entity ?? -1,
      {
        ...ProInfoProjRelMock.PROJ_1_PERSON_1,
        is_in_project: false
      }
    )
    await wait(20)
    result = await s.index.getFromIdx(id)
    expect(result?.fkClass).to.be.undefined()
  })

});

