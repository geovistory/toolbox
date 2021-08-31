/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@loopback/testlab';
import {clone} from 'ramda';
import 'reflect-metadata';
import {WarehouseStubs} from '../../../../warehouse/createWarehouse';
import {REntityService} from '../../../../warehouse/primary-ds/entity/REntityService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../helpers/atomic/dfh-api-class.helper';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {createInfResource, updateInfResource} from '../../../helpers/atomic/inf-resource.helper';
import {createProInfoProjRel, updateProInfoProjRel} from '../../../helpers/atomic/pro-info-proj-rel.helper';
import {createProProject} from '../../../helpers/atomic/pro-project.helper';
import {DfhApiClassMock} from '../../../helpers/data/gvDB/DfhApiClassMock';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
import {InfResourceMock} from '../../../helpers/data/gvDB/InfResourceMock';
import {ProInfoProjRelMock} from '../../../helpers/data/gvDB/ProInfoProjRelMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {cleanDb} from '../../../helpers/meta/clean-db.helper';
import {searchForEntityPreview, searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables, wait, waitForEntityPreviewUntil} from '../../../helpers/warehouse-helpers';
const stubs: WarehouseStubs = {
  primaryDataServices: [REntityService],
  aggDataServices: []
}
describe('REntityService', () => {

  let wh: Warehouse;
  let s: REntityService;

  before(async function () {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    this.timeout(5000); // A very long environment setup.
    const injector = await setupCleanAndStartWarehouse(stubs)
    wh = injector.get(Warehouse)
    s = injector.get(REntityService)
  })
  beforeEach(async () => {
    await cleanDb()
    await truncateWarehouseTables(wh)
  })
  after(async function () {
    await stopWarehouse(wh)
  })



  it('should have entity preview', async () => {
    const entity = await createInfResource(InfResourceMock.PERSON_1)
    await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)
    await createInfLanguage(InfLanguageMock.GERMAN)
    await createProProject(ProProjectMock.PROJECT_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)

    const result = await searchForEntityPreview(wh, [
      {pk_entity: {eq: entity.pk_entity}},
      {fk_project: {eq: null}},
    ])
    expect(result?.fk_class).to.equal(entity?.fk_class)

  })

  it('should update entity if class changed', async () => {
    const entity = await createInfResource(InfResourceMock.PERSON_1)
    await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)
    await createDfhApiClass(DfhApiClassMock.EN_244_EXPRESSION_CREATION)
    await createInfLanguage(InfLanguageMock.GERMAN)
    await createProProject(ProProjectMock.PROJECT_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)

    let result = await searchForEntityPreview(wh, [
      {pk_entity: {eq: entity.pk_entity}},
      {fk_project: {eq: null}},
    ])
    expect(result?.fk_class).to.equal(entity?.fk_class)
    const newFkClass = DfhApiClassMock.EN_244_EXPRESSION_CREATION.dfh_pk_class
    await updateInfResource(
      InfResourceMock.PERSON_1.pk_entity ?? -1,
      {
        ...InfResourceMock.PERSON_1,
        fk_class: newFkClass
      }
    )

    result = await waitForEntityPreviewUntil(wh, item => {
      return item.fk_project === null
        && item.pk_entity === entity.pk_entity
        && item.fk_class === newFkClass
    })
    expect(result?.fk_class).to.equal(newFkClass)

  })

  it('should have correct isInProjectCount before and after removed from project', async () => {
    const entity = await createInfResource(InfResourceMock.PERSON_1)
    await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)
    await createInfLanguage(InfLanguageMock.GERMAN)
    await createProProject(ProProjectMock.PROJECT_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)

    const id = {
      pkEntity: entity.pk_entity ?? -1
    }
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare: (val) => val?.isInProjectCount === 1
    })
    await updateProInfoProjRel(
      entity.pk_entity ?? -1,
      {
        ...ProInfoProjRelMock.PROJ_1_PERSON_1,
        is_in_project: false
      }
    )

    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare: (val) => val?.isInProjectCount === 0
    })
  })


  it('should produce repo entity preview if community_visibiliy.toolbox is true', async () => {
    const entity = await createInfResource(InfResourceMock.PERSON_1)
    await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)
    await createInfLanguage(InfLanguageMock.GERMAN)
    await createProProject(ProProjectMock.PROJECT_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)

    await wait(500)
    const result = await s.index.getFromIdx({pkEntity: entity.pk_entity ?? -1})
    expect(result).not.to.be.undefined()
  })
  it('should not produce repo entity preview if community_visibiliy.toolbox is false', async () => {
    const mock = clone(InfResourceMock.PERSON_1)
    mock.community_visibility.toolbox = false;
    const entity = await createInfResource(mock)
    await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)
    await createInfLanguage(InfLanguageMock.GERMAN)
    await createProProject(ProProjectMock.PROJECT_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)

    await wait(500)
    const result = await s.index.getFromIdx({pkEntity: entity.pk_entity ?? -1})
    expect(result).to.be.undefined()
  })

  it('should remove repo entity preview when community_visibiliy.toolbox is set to false', async () => {
    const mock = clone(InfResourceMock.PERSON_1)
    const entity = await createInfResource(mock)
    await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)
    await createInfLanguage(InfLanguageMock.GERMAN)
    await createProProject(ProProjectMock.PROJECT_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)

    await wait(500)
    const result = await s.index.getFromIdx({pkEntity: entity.pk_entity ?? -1})
    expect(result).not.to.be.undefined()

    mock.community_visibility.toolbox = false;
    await updateInfResource(mock.pk_entity ?? -1, mock)

    await wait(500)
    const result2 = await s.index.getFromIdxWithTmsps({pkEntity: entity.pk_entity ?? -1})
    expect(result2.deleted).not.to.be.undefined()
  })


});

