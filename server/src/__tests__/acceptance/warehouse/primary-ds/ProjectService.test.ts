/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@loopback/testlab';
import {ProjectService} from '../../../../warehouse/primary-ds/ProjectService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createProject, updateProjectLanguage, deleteProject} from '../../../helpers/atomic/pro-project.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {setupWarehouseAndConnect} from '../../../helpers/warehouse-helpers';

describe('ProjectService', () => {

  let wh: Warehouse;
  let s: ProjectService;

  before(async () => {
    wh = await setupWarehouseAndConnect()
    // await wh.pgClient.connect()
  })
  beforeEach(async function () {
    await cleanDb();
    s = new ProjectService(wh);
    await s.clearAll()
  })

  it('should have project in index after initIdx()', async () => {
    const project = await createProject('German')
    await s.initIdx();
    const result = await s.index.getFromIdx({pkProject: project.pk_entity ?? -1})
    expect(result?.fkLanguage).to.equal(project?.fk_language)

  })

  it('should update project', async () => {
    const project = await createProject('German')
    await s.initIdx();
    const result = await s.index.getFromIdx({pkProject: project.pk_entity ?? -1})
    expect(result?.fkLanguage).to.equal(project?.fk_language)

    const projectUpdated = await updateProjectLanguage(project.pk_entity as any, 'English')
    expect(projectUpdated.fk_language).to.not.equal(project.fk_language)


    // TODO: This should happen automatically by listeners
    await s.sync();

    await new Promise(r => setTimeout(r, 10));
    const resultUpdated = await s.index.getFromIdx({pkProject: project.pk_entity ?? -1})
    expect(resultUpdated?.fkLanguage).to.not.equal(project.fk_language)
  })

  it('should delete project', async () => {
    const project = await createProject('German')
    await s.initIdx();
    const result = await s.index.getFromIdx({pkProject: project.pk_entity ?? -1})
    expect(result?.fkLanguage).to.equal(project?.fk_language)

    await deleteProject(project.pk_entity ?? -1)

    // TODO: This should happen automatically by listeners
    await s.sync();

    await new Promise(r => setTimeout(r, 10));
    const resultUpdated = await s.index.getFromIdx({pkProject: project.pk_entity ?? -1})
    expect(resultUpdated).to.be.undefined()
  })

});

