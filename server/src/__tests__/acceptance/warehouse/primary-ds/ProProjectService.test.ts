/* eslint-disable @typescript-eslint/no-explicit-any */
import '@abraham/reflection';
import {expect} from '@loopback/testlab';
import {ProProjectService} from '../../../../warehouse/primary-ds/ProProjectService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createProject, deleteProject, updateProjectLanguage} from '../../../helpers/atomic/pro-project.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, truncateWarehouseTables} from '../../../helpers/warehouse-helpers';

describe('ProProjectService', function () {

  let wh: Warehouse;
  let s: ProProjectService;

  before(async function () {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    this.timeout(5000); // A very long environment setup.
    const injector = await setupCleanAndStartWarehouse()
    wh = injector.get(Warehouse)
    s = injector.get(ProProjectService)
  })
  beforeEach(async () => {
    await cleanDb()
    await truncateWarehouseTables(wh)
  })
  after(async function () {
    await stopWarehouse(wh)
  })

  it('should have project in index', async () => {
    const project = await createProject('German')
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx({pkProject: project.pk_entity ?? -1}),
      compare: (val) => val?.fkLanguage === project?.fk_language
    })

  })

  it('should update project', async () => {
    const project = await createProject('German')

    const projectUpdated = await updateProjectLanguage(project.pk_entity as any, 'English')
    expect(projectUpdated.fk_language).to.not.equal(project.fk_language)

    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx({pkProject: project.pk_entity ?? -1}),
      compare: (val) => val?.fkLanguage !== project?.fk_language
    })


  })

  it('should delete project', async () => {
    const project = await createProject('German')
    await deleteProject(project.pk_entity ?? -1)
    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdxWithTmsps({pkProject: project.pk_entity ?? -1}),
      compare: (val) => !!val?.deleted
    })
  })

});

