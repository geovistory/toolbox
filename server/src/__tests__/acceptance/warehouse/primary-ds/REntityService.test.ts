/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@loopback/testlab';
import {REntityService} from '../../../../warehouse/primary-ds/entity/REntityService';
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
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, waitForEntityPreviewUntil, truncateWarehouseTables} from '../../../helpers/warehouse-helpers';

describe('REntityService', () => {

  let wh: Warehouse;
  let s: REntityService;

  before(async function () {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    this.timeout(5000); // A very long environment setup.
    wh = await setupCleanAndStartWarehouse()
    s = wh.prim.rEntity
  })
  beforeEach(async () => {
    await cleanDb()
    await truncateWarehouseTables(wh)
  })
  after(async function () {
    await stopWarehouse(wh)
  })



  it('should have entity preview', async () => {
    const entity = await createInfPersistentItem(InfPersistentItemMock.PERSON_1)
    await createInfLanguage(InfLanguageMock.GERMAN)
    await createProProject(ProProjectMock.PROJECT_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)

    const result = await waitForEntityPreviewUntil(wh, item => {
      return item.fk_project === null
        && item.pk_entity === entity.pk_entity
    })
    expect(result?.fk_class).to.equal(entity?.fk_class)

  })

  it('should update entity if class changed', async () => {
    const entity = await createInfPersistentItem(InfPersistentItemMock.PERSON_1)
    await createInfLanguage(InfLanguageMock.GERMAN)
    await createProProject(ProProjectMock.PROJECT_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)

    let result = await waitForEntityPreviewUntil(wh, item => {
      return item.fk_project === null
        && item.pk_entity === entity.pk_entity
    })
    expect(result?.fk_class).to.equal(entity?.fk_class)

    await updateInfPersistentItem(
      InfPersistentItemMock.PERSON_1.pk_entity ?? -1,
      {
        ...InfPersistentItemMock.PERSON_1,
        fk_class: 987654321
      }
    )

    result = await waitForEntityPreviewUntil(wh, item => {
      return item.fk_project === null
        && item.pk_entity === entity.pk_entity
        && item.fk_class === 987654321
    })
    expect(result?.fk_class).to.equal(987654321)

  })

  it('should have correct isInProjectCount before and after removed from project', async () => {
    const entity = await createInfPersistentItem(InfPersistentItemMock.PERSON_1)
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


});

