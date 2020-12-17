/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@loopback/testlab';
import {PClassService} from '../../../../warehouse/primary-ds/class/PClassService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createDfhApiClass} from '../../../helpers/atomic/dfh-api-class.helper';
import {createProDfhProfileProjRel, updateProDfhProfileProjRel} from '../../../helpers/atomic/pro-dfh-profile-proj-rel.helper';
import {cleanDb} from '../../../helpers/meta/clean-db.helper';
import {DfhApiClassMock} from '../../../helpers/data/gvDB/DfhApiClassMock';
import {ProDfhProfileProjRelMock} from '../../../helpers/data/gvDB/ProDfhProfileProjRelMock';
import {setupCleanAndStartWarehouse, waitUntilNext} from '../../../helpers/warehouse-helpers';
import {createProProject} from '../../../helpers/atomic/pro-project.helper';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';

describe('PClassService', () => {

  let wh: Warehouse;
  let s: PClassService;

  beforeEach(async function () {
    await cleanDb();
    wh = await setupCleanAndStartWarehouse()
    s = wh.prim.pClass;
  })
  afterEach(async function () {await wh.stop()})

  it('should add project-class', async () => {
    const {prel, cla} = await createPClassMockData();
    await waitUntilNext(s.afterPut$)
    const result = await s.index.getFromIdx({
      fkProject: prel.fk_project ?? -1,
      pkClass: cla.dfh_pk_class ?? -1
    })
    expect(result?.fkClass).to.equal(cla.dfh_pk_class)

  })



  it('should delete project-class', async () => {
    const {prel, cla} = await createPClassMockData();
    await waitUntilNext(s.afterPut$)


    await updateProDfhProfileProjRel(prel.pk_entity ?? -1, {enabled: false})

    await waitUntilNext(s.afterDel$)
    const result = await s.index.getFromIdx({
      fkProject: prel.fk_project ?? -1,
      pkClass: cla.dfh_pk_class ?? -1
    })
    expect(result).to.be.undefined()
  })

});

async function createPClassMockData() {
  await createInfLanguage(InfLanguageMock.GERMAN);
  await createProProject(ProProjectMock.PROJECT_1);
  const prel = await createProDfhProfileProjRel(ProDfhProfileProjRelMock.PROJ_1_PROFILE_4);
  const cla = await createDfhApiClass(DfhApiClassMock.EN_21_PERSON);
  return {prel, cla};
}

