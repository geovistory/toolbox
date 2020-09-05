/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@loopback/testlab';
import {PEntityService, PEntityId} from '../../../../warehouse/primary-ds/entity/PEntityService';
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
import {setupWarehouse, wait, waitUntilNext, waitForEntityPreview} from '../../../helpers/warehouse-helpers';
import {getWarEntityPreview} from '../../../helpers/atomic/war-entity_preview.helper';

describe('PEntityService', () => {

  let wh: Warehouse;
  let s: PEntityService;

  before(async () => {
    // await wh.pgClient.connect()
  })
  beforeEach(async function () {
    await cleanDb();
    wh = await setupWarehouse()
    await wh.init()
    await wh.pgClient.query('LISTEN entity_previews_updated;')
    s = wh.prim.pEntity;
  })

  it('should have entity in index()', async () => {
    const entity = await createInfPersistentItem(InfPersistentItemMock.PERSON_1)
    await createInfLanguage(InfLanguageMock.GERMAN)
    const project = await createProProject(ProProjectMock.PROJECT_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)

    await waitUntilNext(s.afterPut$)

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

    await waitUntilNext(s.afterPut$)

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

    await waitUntilNext(s.afterPut$)

    result = await s.index.getFromIdx(id)
    expect(result?.fkClass).to.equal(987654321)
  })

  it('should delete entity if removed from project', async () => {
    const entity = await createInfPersistentItem(InfPersistentItemMock.PERSON_1)
    await createInfLanguage(InfLanguageMock.GERMAN)
    const project = await createProProject(ProProjectMock.PROJECT_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)

    await waitUntilNext(s.afterPut$)

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

    await waitUntilNext(s.afterDel$)

    result = await s.index.getFromIdx(id)
    expect(result?.fkClass).to.be.undefined()
  })

  it('should add entity preview with fk_class after entity is added', async () => {
    const entities = await getWarEntityPreview(
      InfPersistentItemMock.PERSON_1.pk_entity ?? -1,
      ProProjectMock.PROJECT_1.pk_entity ?? -1
    )
    expect(entities.length).to.equal(0);


    await createInfLanguage(InfLanguageMock.GERMAN)
    await createProProject(ProProjectMock.PROJECT_1)
    await createInfPersistentItem(InfPersistentItemMock.PERSON_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)
    const item = await waitUntilNext(s.afterPut$)
    expect(item.key.pkEntity).to.equal(InfPersistentItemMock.PERSON_1.pk_entity)
    const id: PEntityId = {
      pkEntity: InfPersistentItemMock.PERSON_1.pk_entity ?? -1,
      fkProject: ProProjectMock.PROJECT_1.pk_entity ?? -1
    }
    const e = await waitForEntityPreview(wh, [
      {pk_entity: {eq: id.pkEntity}},
      {fk_project: {eq: id.fkProject}},
      {fk_class: {eq: InfPersistentItemMock.PERSON_1.fk_class}},
    ])
    expect(e).not.to.be.undefined();

  })



});

