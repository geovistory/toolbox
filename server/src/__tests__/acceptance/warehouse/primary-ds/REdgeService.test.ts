/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { WarehouseStubs } from '../../../../warehouse/createWarehouse';
import { REdgeService } from '../../../../warehouse/primary-ds/edge/REdgeService';
import { REntityId } from '../../../../warehouse/primary-ds/entity/REntityService';
import { Warehouse } from '../../../../warehouse/Warehouse';
import { createInfAppellation } from '../../../helpers/atomic/inf-appellation.helper';
import { createInfLangString } from '../../../helpers/atomic/inf-lang-string.helper';
import { createInfLanguage } from '../../../helpers/atomic/inf-language.helper';
import { createInfPersistentItem } from '../../../helpers/atomic/inf-persistent-item.helper';
import { createInfStatement } from '../../../helpers/atomic/inf-statement.helper';
import { createInfTemporalEntity } from '../../../helpers/atomic/inf-temporal-entity.helper';
import { createProInfoProjRel, updateProInfoProjRel } from '../../../helpers/atomic/pro-info-proj-rel.helper';
import { createProProject } from '../../../helpers/atomic/pro-project.helper';
import { InfAppellationMock } from '../../../helpers/data/gvDB/InfAppellationMock';
import { InfLangStringMock } from '../../../helpers/data/gvDB/InfLangStringMock';
import { InfLanguageMock } from '../../../helpers/data/gvDB/InfLanguageMock';
import { InfPersistentItemMock } from '../../../helpers/data/gvDB/InfPersistentItemMock';
import { InfStatementMock } from '../../../helpers/data/gvDB/InfStatementMock';
import { InfTemporalEntityMock } from '../../../helpers/data/gvDB/InfTemporalEntityMock';
import { ProInfoProjRelMock } from '../../../helpers/data/gvDB/ProInfoProjRelMock';
import { ProProjectMock } from '../../../helpers/data/gvDB/ProProjectMock';
import { cleanDb } from '../../../helpers/meta/clean-db.helper';
import { searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables } from '../../../helpers/warehouse-helpers';
const stubs: WarehouseStubs = {
  primaryDataServices: [REdgeService],
  aggDataServices: []
}
describe('REdgeService', () => {

  let wh: Warehouse;
  let s: REdgeService;
  before(async function () {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    this.timeout(5000); // A very long environment setup.
    const injector = await setupCleanAndStartWarehouse(stubs)
    wh = injector.get(Warehouse)
    s = injector.get(REdgeService)
  })
  beforeEach(async () => {
    await cleanDb()
    await truncateWarehouseTables(wh)
  })
  after(async function () {
    await stopWarehouse(wh)
  })
  it('should have field edges in index after initIdx()', async () => {
    await createInfLanguage(InfLanguageMock.GERMAN)
    await createProProject(ProProjectMock.PROJECT_1)

    await createInfTemporalEntity(InfTemporalEntityMock.NAMING_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_NAMING_1)
    await createInfAppellation(InfAppellationMock.JACK_THE_FOO)
    await createInfStatement(InfStatementMock.NAME_1_TO_APPE)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE)
    await createInfStatement(InfStatementMock.NAME_1_TO_PERSON)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON)
    await createInfPersistentItem(InfPersistentItemMock.PERSON_1)
    const id: REntityId = {
      pkEntity: InfTemporalEntityMock.NAMING_1.pk_entity ?? -1,
    }
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare: (val) => {
        return val?.outgoing?.[1113]?.[0].targetLabel === InfAppellationMock.JACK_THE_FOO.string
          && val?.outgoing?.[1113]?.length === 1
          && val?.outgoing?.[1111]?.[0].fkTarget === InfStatementMock.NAME_1_TO_PERSON.fk_object_info
          && val?.outgoing?.[1111]?.length === 1
      }
    })

  })

  it('should have short label', async () => {
    await createInfLanguage(InfLanguageMock.GERMAN)
    await createInfLanguage(InfLanguageMock.ENGLISH)
    await createProProject(ProProjectMock.PROJECT_1)

    await createInfPersistentItem(InfPersistentItemMock.MANIF_SINGLETON_THE_MURDERER)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_MANIF_SINGLETON_THE_MURDERER)
    await createInfLangString(InfLangStringMock.EN_SHORT_TITLE_THE_MURDERER)
    await createInfStatement(InfStatementMock.MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER)
    const fkProperty: number = InfStatementMock.MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER.fk_property ?? -1
    const id: REntityId = {
      pkEntity: InfPersistentItemMock.MANIF_SINGLETON_THE_MURDERER.pk_entity ?? -1,
    }
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare: (val) => {
        return val?.outgoing?.[fkProperty]?.[0].targetLabel === InfLangStringMock.EN_SHORT_TITLE_THE_MURDERER.string
          && val?.outgoing?.[fkProperty]?.length === 1
      }
    })

  })
  it('should update field edges if statement is removed from project', async () => {
    await createInfLanguage(InfLanguageMock.GERMAN)
    await createProProject(ProProjectMock.PROJECT_1)

    await createInfTemporalEntity(InfTemporalEntityMock.NAMING_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_NAMING_1)
    await createInfAppellation(InfAppellationMock.JACK_THE_FOO)
    await createInfStatement(InfStatementMock.NAME_1_TO_APPE)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE)
    await createInfStatement(InfStatementMock.NAME_1_TO_PERSON)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON)
    await createInfPersistentItem(InfPersistentItemMock.PERSON_1)


    const id: REntityId = {
      pkEntity: InfTemporalEntityMock.NAMING_1.pk_entity ?? -1,
    }

    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare: (val) => {
        return val?.outgoing?.[1113]?.[0].targetLabel === InfAppellationMock.JACK_THE_FOO.string
          && val?.outgoing?.[1113]?.length === 1
          && val?.outgoing?.[1111]?.[0].fkTarget === InfStatementMock.NAME_1_TO_PERSON.fk_object_info
          && val?.outgoing?.[1111]?.length === 1
      }
    })

    await updateProInfoProjRel(
      ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON.pk_entity ?? -1,
      {
        ...ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON,
        is_in_project: false
      }
    )
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare: (val) => {
        return val?.outgoing?.[1113]?.[0].targetLabel === InfAppellationMock.JACK_THE_FOO.string
          && val?.outgoing?.[1113]?.length === 1
          && val?.outgoing?.[1111] === undefined
      }
    })

  })


});

