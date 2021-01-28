/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import {expect} from '@loopback/testlab';
import {PEntityId, PEntityService} from '../../../../warehouse/primary-ds/entity/PEntityService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {createInfPersistentItem, updateInfPersistentItem} from '../../../helpers/atomic/inf-persistent-item.helper';
import {createProInfoProjRel, updateProInfoProjRel} from '../../../helpers/atomic/pro-info-proj-rel.helper';
import {createProProject} from '../../../helpers/atomic/pro-project.helper';
import {getWarEntityPreview} from '../../../helpers/atomic/war-entity-preview.helper';
import {cleanDb} from '../../../helpers/meta/clean-db.helper';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
import {InfPersistentItemMock} from '../../../helpers/data/gvDB/InfPersistentItemMock';
import {ProInfoProjRelMock} from '../../../helpers/data/gvDB/ProInfoProjRelMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {setupCleanAndStartWarehouse, stopWarehouse, waitForEntityPreview, waitUntilNext, truncateWarehouseTables} from '../../../helpers/warehouse-helpers';
import {WarehouseStubs} from '../../../../warehouse/createWarehouse';
const stubs: WarehouseStubs = {
  primaryDataServices:[PEntityService],
  aggDataServices:[]
}
describe('PEntityService', () => {

  let wh: Warehouse;
  let s: PEntityService;
  before(async function () {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    this.timeout(5000); // A very long environment setup.
    const injector = await setupCleanAndStartWarehouse(stubs)
    wh = injector.get(Warehouse)
    s = injector.get(PEntityService)
  })
  beforeEach(async () => {
    await cleanDb()
    await truncateWarehouseTables(wh)
  })
  after(async function () {
    await stopWarehouse(wh)
  })
  it('should have entity in index()', async () => {
    const entity = await createInfPersistentItem(InfPersistentItemMock.PERSON_1)
    await createInfLanguage(InfLanguageMock.GERMAN)
    const project = await createProProject(ProProjectMock.PROJECT_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)

    await waitUntilNext(s.afterChange$)

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

    await waitUntilNext(s.afterChange$)

    const id = {
      pkEntity: InfPersistentItemMock.PERSON_1.pk_entity ?? -1,
      fkProject: project.pk_entity ?? -1
    }
    const result1 = await s.index.getFromIdxWithTmsps(id)
    expect(result1?.val?.fkClass).to.equal(entity?.fk_class)
    await updateInfPersistentItem(
      InfPersistentItemMock.PERSON_1.pk_entity ?? -1,
      {
        ...InfPersistentItemMock.PERSON_1,
        fk_class: 987654321
      }
    )

    await waitUntilNext(s.afterChange$)

    const result2 = await s.index.getFromIdxWithTmsps(id)
    expect(result2?.val?.fkClass).to.equal(987654321)

    expect(((result2?.lastModification ?? 0) > (result1?.lastModification ?? 0))).to.be.true()

  })

  it('should delete entity if removed from project', async () => {
    const entity = await createInfPersistentItem(InfPersistentItemMock.PERSON_1)
    await createInfLanguage(InfLanguageMock.GERMAN)
    const project = await createProProject(ProProjectMock.PROJECT_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)

    await waitUntilNext(s.afterChange$)

    const id = {
      pkEntity: InfPersistentItemMock.PERSON_1.pk_entity ?? -1,
      fkProject: project.pk_entity ?? -1
    }
    const result = await s.index.getFromIdxWithTmsps(id)
    expect(result?.val.fkClass).to.equal(entity?.fk_class)
    expect(result?.deleted).to.be.undefined()

    let entities = await getWarEntityPreview(id.pkEntity, id.fkProject)
    expect(entities.length).to.equal(1);

    await updateProInfoProjRel(
      ProInfoProjRelMock.PROJ_1_PERSON_1.pk_entity ?? -1,
      {
        ...ProInfoProjRelMock.PROJ_1_PERSON_1,
        is_in_project: false
      }
    )

    await waitUntilNext(s.afterChange$)

    const result2 = await s.index.getFromIdxWithTmsps(id)
    expect(result2?.deleted).not.to.be.undefined()

    entities = await getWarEntityPreview(id.pkEntity, id.fkProject)
    expect(entities.length).to.equal(0);
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

