/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import {WarehouseStubs} from '../../../../warehouse/createWarehouse';
import {PFieldChangeId, PFieldChangeService} from '../../../../warehouse/primary-ds/PFieldChangeService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createInfAppellation} from '../../../helpers/atomic/inf-appellation.helper';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {createInfResource} from '../../../helpers/atomic/inf-resource.helper';
import {createInfStatement} from '../../../helpers/atomic/inf-statement.helper';
import {createProInfoProjRel} from '../../../helpers/atomic/pro-info-proj-rel.helper';
import {createProProject} from '../../../helpers/atomic/pro-project.helper';
import {InfAppellationMock} from '../../../helpers/data/gvDB/InfAppellationMock';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
import {InfResourceMock} from '../../../helpers/data/gvDB/InfResourceMock';
import {InfStatementMock} from '../../../helpers/data/gvDB/InfStatementMock';
import {ProInfoProjRelMock} from '../../../helpers/data/gvDB/ProInfoProjRelMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {cleanDb} from '../../../helpers/meta/clean-db.helper';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables} from '../../../helpers/warehouse-helpers';
const stubs: WarehouseStubs = {
  primaryDataServices: [PFieldChangeService],
  aggDataServices: []
}
describe('PFieldChangeService', () => {

  let wh: Warehouse;
  let s: PFieldChangeService;

  before(async function () {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    this.timeout(5000); // A very long environment setup.
    const injector = await setupCleanAndStartWarehouse(stubs)
    wh = injector.get(Warehouse)
    s = injector.get(PFieldChangeService)
  })
  beforeEach(async () => {
    await cleanDb()
    await truncateWarehouseTables(wh)
  })
  after(async function () {
    await stopWarehouse(wh)
  })
  it('should have field in index', async () => {
    await createInfLanguage(InfLanguageMock.GERMAN)
    const project = await createProProject(ProProjectMock.PROJECT_1)
    const date = new Date()
    await createInfResource(InfResourceMock.NAMING_1)
    await createInfAppellation(InfAppellationMock.JACK_THE_FOO)
    await createInfStatement(InfStatementMock.NAME_1_TO_APPE)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE)

    const id: PFieldChangeId = {
      fkProject: project.pk_entity ?? -1,
      fkSourceInfo: InfStatementMock.NAME_1_TO_APPE.fk_subject_info ?? 0,
      fkSourceTablesCell: InfStatementMock.NAME_1_TO_APPE.fk_subject_tables_cell ?? 0,
      fkProperty: InfStatementMock.NAME_1_TO_APPE.fk_property ?? 0,
      fkPropertyOfProperty: 0,
      isOutgoing: true
    }
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx(id),
      compare: (val) => {
        const tmsp = new Date(val?.tmspLastModification as any)
        const bool = tmsp > date
        return bool;
      }
    });
  })

});

