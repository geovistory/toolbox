/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@loopback/testlab';
import 'reflect-metadata';
import {WarehouseStubs} from '../../../../warehouse/createWarehouse';
import {PEntityId, PEntityService} from '../../../../warehouse/primary-ds/entity/PEntityService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../helpers/atomic/dfh-api-class.helper';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {createInfResource, updateInfResource} from '../../../helpers/atomic/inf-resource.helper';
import {createProInfoProjRel, updateProInfoProjRel} from '../../../helpers/atomic/pro-info-proj-rel.helper';
import {createProProject} from '../../../helpers/atomic/pro-project.helper';
import {getWarEntityPreview} from '../../../helpers/atomic/war-entity-preview.helper';
import {DfhApiClassMock} from '../../../helpers/data/gvDB/DfhApiClassMock';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
import {InfResourceMock} from '../../../helpers/data/gvDB/InfResourceMock';
import {ProInfoProjRelMock} from '../../../helpers/data/gvDB/ProInfoProjRelMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {cleanDb} from '../../../helpers/meta/clean-db.helper';
import {setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables, waitForEntityPreview, waitUntilNext} from '../../../helpers/warehouse-helpers';
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
    await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)
    const entity = await createInfResource(InfResourceMock.PERSON_1)
    await createInfLanguage(InfLanguageMock.GERMAN)
    const project = await createProProject(ProProjectMock.PROJECT_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)

    await waitUntilNext(s.afterChange$)

    const result = await s.index.getFromIdx({
      pkEntity: InfResourceMock.PERSON_1.pk_entity ?? -1,
      fkProject: project.pk_entity ?? -1
    })
    expect(result?.fkClass).to.equal(entity?.fk_class)

  })

  it('should update entity if class changed', async () => {
    await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)
    await createDfhApiClass(DfhApiClassMock.EN_363_GEO_PLACE)
    const entity = await createInfResource(InfResourceMock.PERSON_1)
    await createInfLanguage(InfLanguageMock.GERMAN)
    const project = await createProProject(ProProjectMock.PROJECT_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)

    await waitUntilNext(s.afterChange$)

    const id = {
      pkEntity: InfResourceMock.PERSON_1.pk_entity ?? -1,
      fkProject: project.pk_entity ?? -1
    }
    const result1 = await s.index.getFromIdxWithTmsps(id)
    expect(result1?.val?.fkClass).to.equal(entity?.fk_class)
    await updateInfResource(
      InfResourceMock.PERSON_1.pk_entity ?? -1,
      {
        ...InfResourceMock.PERSON_1,
        fk_class: DfhApiClassMock.EN_363_GEO_PLACE.dfh_pk_class
      }
    )

    await waitUntilNext(s.afterChange$)

    const result2 = await s.index.getFromIdxWithTmsps(id)
    expect(result2?.val?.fkClass).to.equal(DfhApiClassMock.EN_363_GEO_PLACE.dfh_pk_class)

    expect(((result2?.lastModification ?? 0) > (result1?.lastModification ?? 0))).to.be.true()

  })

  it('should delete entity if removed from project', async () => {
    await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)
    const entity = await createInfResource(InfResourceMock.PERSON_1)
    await createInfLanguage(InfLanguageMock.GERMAN)
    const project = await createProProject(ProProjectMock.PROJECT_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)

    await waitUntilNext(s.afterChange$)

    const id = {
      pkEntity: InfResourceMock.PERSON_1.pk_entity ?? -1,
      fkProject: project.pk_entity ?? -1
    }
    const result = await s.index.getFromIdxWithTmsps(id)
    expect(result?.val?.fkClass).to.equal(entity?.fk_class)
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
    await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)

    const entities = await getWarEntityPreview(
      InfResourceMock.PERSON_1.pk_entity ?? -1,
      ProProjectMock.PROJECT_1.pk_entity ?? -1
    )
    expect(entities.length).to.equal(0);


    await createInfLanguage(InfLanguageMock.GERMAN)
    await createProProject(ProProjectMock.PROJECT_1)
    await createInfResource(InfResourceMock.PERSON_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)
    const id: PEntityId = {
      pkEntity: InfResourceMock.PERSON_1.pk_entity ?? -1,
      fkProject: ProProjectMock.PROJECT_1.pk_entity ?? -1
    }
    const e = await waitForEntityPreview(wh, [
      {pk_entity: {eq: id.pkEntity}},
      {fk_project: {eq: id.fkProject}},
      {fk_class: {eq: InfResourceMock.PERSON_1.fk_class}},
    ])
    expect(e).not.to.be.undefined();

  })



});

