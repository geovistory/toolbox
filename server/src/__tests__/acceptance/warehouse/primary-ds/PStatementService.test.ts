/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import {WarehouseStubs} from '../../../../warehouse/createWarehouse';
import {PStatementId, PStatementService} from '../../../../warehouse/primary-ds/statement/PStatementService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createInfAppellation} from '../../../helpers/atomic/inf-appellation.helper';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {createInfPersistentItem} from '../../../helpers/atomic/inf-persistent-item.helper';
import {createInfStatement} from '../../../helpers/atomic/inf-statement.helper';
import {createInfTemporalEntity} from '../../../helpers/atomic/inf-temporal-entity.helper';
import {createProInfoProjRel, updateProInfoProjRel} from '../../../helpers/atomic/pro-info-proj-rel.helper';
import {createProProject} from '../../../helpers/atomic/pro-project.helper';
import {InfAppellationMock} from '../../../helpers/data/gvDB/InfAppellationMock';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
import {InfPersistentItemMock} from '../../../helpers/data/gvDB/InfPersistentItemMock';
import {InfStatementMock} from '../../../helpers/data/gvDB/InfStatementMock';
import {InfTemporalEntityMock} from '../../../helpers/data/gvDB/InfTemporalEntityMock';
import {ProInfoProjRelMock} from '../../../helpers/data/gvDB/ProInfoProjRelMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {cleanDb} from '../../../helpers/meta/clean-db.helper';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables} from '../../../helpers/warehouse-helpers';
const stubs: WarehouseStubs = {
  primaryDataServices: [PStatementService],
  aggDataServices: []
}
describe('PStatementService', () => {

  let wh: Warehouse;
  let s: PStatementService;

  before(async function () {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    this.timeout(5000); // A very long environment setup.
    const injector = await setupCleanAndStartWarehouse(stubs)
    wh = injector.get(Warehouse)
    s = injector.get(PStatementService)
  })
  beforeEach(async () => {
    await cleanDb()
    await truncateWarehouseTables(wh)
  })
  after(async function () {
    await stopWarehouse(wh)
  })
  it('should have statement in index after initIdx()', async () => {
    await createInfLanguage(InfLanguageMock.GERMAN)
    const project = await createProProject(ProProjectMock.PROJECT_1)

    await createInfTemporalEntity(InfTemporalEntityMock.NAMING_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_NAMING_1)
    await createInfAppellation(InfAppellationMock.JACK_THE_FOO)
    await createInfStatement(InfStatementMock.NAME_1_TO_APPE)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE)
    await createInfStatement(InfStatementMock.NAME_1_TO_PERSON)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON)
    await createInfPersistentItem(InfPersistentItemMock.PERSON_1)
    const id: PStatementId = {
      pkEntity: InfStatementMock.NAME_1_TO_PERSON.pk_entity ?? -1,
      fkProject: project.pk_entity ?? -1
    }
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare: (val) => {
        return val?.fkProperty === InfStatementMock.NAME_1_TO_PERSON.fk_property
      }
    });
  })

  it('should delete statement if statement is removed from project', async () => {
    await createInfLanguage(InfLanguageMock.GERMAN)
    const project = await createProProject(ProProjectMock.PROJECT_1)

    await createInfTemporalEntity(InfTemporalEntityMock.NAMING_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_NAMING_1)
    await createInfAppellation(InfAppellationMock.JACK_THE_FOO)
    await createInfStatement(InfStatementMock.NAME_1_TO_APPE)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE)
    await createInfStatement(InfStatementMock.NAME_1_TO_PERSON)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON)
    await createInfPersistentItem(InfPersistentItemMock.PERSON_1)

    const id: PStatementId = {
      pkEntity: InfStatementMock.NAME_1_TO_PERSON.pk_entity ?? -1,
      fkProject: project.pk_entity ?? -1
    }

    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare: (val) => {
        return val?.fkProperty === InfStatementMock.NAME_1_TO_PERSON.fk_property
      }
    });

    await updateProInfoProjRel(
      ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON.pk_entity ?? -1,
      {
        ...ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON,
        is_in_project: false
      }
    )
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdxWithTmsps(id),
      compare: (item) => {
        return item?.deleted !== undefined
      }
    });

  })


});
