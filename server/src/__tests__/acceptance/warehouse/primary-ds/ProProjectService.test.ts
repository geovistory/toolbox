/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@loopback/testlab';
import {ProProjectService} from '../../../../warehouse/primary-ds/ProProjectService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createProject, deleteProject, updateProjectLanguage} from '../../../helpers/atomic/pro-project.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {setupCleanAndStartWarehouse, stopWarehouse, waitUntilNext} from '../../../helpers/warehouse-helpers';

describe('ProProjectService', () => {

  let wh: Warehouse;
  let s: ProProjectService;

  beforeEach(async function () {
    await cleanDb();
    wh = await setupCleanAndStartWarehouse()
    s = wh.prim.proProject;
  })
  afterEach(async function () {await stopWarehouse(wh)})

  it('should have project in index', async () => {
    const project = await createProject('German')
    await waitUntilNext(s.afterPut$)
    const result = await s.index.getFromIdx({pkProject: project.pk_entity ?? -1})
    expect(result?.fkLanguage).to.equal(project?.fk_language)

  })

  it('should update project', async () => {
    const project = await createProject('German')
    await waitUntilNext(s.afterPut$)
    const result = await s.index.getFromIdx({pkProject: project.pk_entity ?? -1})
    expect(result?.fkLanguage).to.equal(project?.fk_language)

    const projectUpdated = await updateProjectLanguage(project.pk_entity as any, 'English')
    expect(projectUpdated.fk_language).to.not.equal(project.fk_language)

    await waitUntilNext(s.afterPut$)
    const resultUpdated = await s.index.getFromIdx({pkProject: project.pk_entity ?? -1})
    expect(resultUpdated?.fkLanguage).to.not.equal(project.fk_language)
  })

  it('should delete project', async () => {
    const project = await createProject('German')
    await waitUntilNext(s.afterPut$)
    const result = await s.index.getFromIdx({pkProject: project.pk_entity ?? -1})
    expect(result?.fkLanguage).to.equal(project?.fk_language)

    await deleteProject(project.pk_entity ?? -1)

    await waitUntilNext(s.afterDel$)
    const resultUpdated = await s.index.getFromIdx({pkProject: project.pk_entity ?? -1})
    expect(resultUpdated).to.be.undefined()
  })

});

