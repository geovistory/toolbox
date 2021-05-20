/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import {PEdgeService} from '../../../../warehouse/primary-ds/edge/PEdgeService';
import {PEntityId} from '../../../../warehouse/primary-ds/entity/PEntityService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createInfAppellation} from '../../../helpers/atomic/inf-appellation.helper';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {createInfStatement} from '../../../helpers/atomic/inf-statement.helper';
import {createInfResource} from '../../../helpers/atomic/inf-resource.helper';
import {createProInfoProjRel, updateProInfoProjRel} from '../../../helpers/atomic/pro-info-proj-rel.helper';
import {createProProject} from '../../../helpers/atomic/pro-project.helper';
import {cleanDb} from '../../../helpers/meta/clean-db.helper';
import {InfAppellationMock} from '../../../helpers/data/gvDB/InfAppellationMock';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
import {InfStatementMock} from '../../../helpers/data/gvDB/InfStatementMock';
import {InfResourceMock} from '../../../helpers/data/gvDB/InfResourceMock';
import {ProInfoProjRelMock} from '../../../helpers/data/gvDB/ProInfoProjRelMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables} from '../../../helpers/warehouse-helpers';
import {WarehouseStubs} from '../../../../warehouse/createWarehouse';
const stubs: WarehouseStubs = {
  primaryDataServices:[PEdgeService],
  aggDataServices:[]
}
describe('PEdgeService', () => {

  let wh: Warehouse;
  let s: PEdgeService;

  before(async function () {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    this.timeout(5000); // A very long environment setup.
    const injector = await setupCleanAndStartWarehouse(stubs)
    wh = injector.get(Warehouse)
    s = injector.get(PEdgeService)
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
    const project = await createProProject(ProProjectMock.PROJECT_1)

    await createInfResource(InfResourceMock.NAMING_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_NAMING_1)
    await createInfAppellation(InfAppellationMock.JACK_THE_FOO)
    await createInfStatement(InfStatementMock.NAME_1_TO_APPE)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE)
    await createInfStatement(InfStatementMock.NAME_1_TO_PERSON)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON)
    await createInfResource(InfResourceMock.PERSON_1)
    const id: PEntityId = {
      pkEntity: InfResourceMock.NAMING_1.pk_entity ?? -1,
      fkProject: project.pk_entity ?? -1
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
    });
  })

  it('should update field edges if statement is removed from project', async () => {
    await createInfLanguage(InfLanguageMock.GERMAN)
    const project = await createProProject(ProProjectMock.PROJECT_1)

    await createInfResource(InfResourceMock.NAMING_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_NAMING_1)
    await createInfAppellation(InfAppellationMock.JACK_THE_FOO)
    await createInfStatement(InfStatementMock.NAME_1_TO_APPE)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE)
    await createInfStatement(InfStatementMock.NAME_1_TO_PERSON)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON)
    await createInfResource(InfResourceMock.PERSON_1)

    const id: PEntityId = {
      pkEntity: InfResourceMock.NAMING_1.pk_entity ?? -1,
      fkProject: project.pk_entity ?? -1
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
      getFn: () => s.index.getFromIdx(id),
      compare: (val) => {
        return val?.outgoing?.[1113]?.[0].targetLabel === InfAppellationMock.JACK_THE_FOO.string
          && val?.outgoing?.[1113]?.length === 1
          && val?.outgoing?.[1111] === undefined
      }
    });

  })


});

