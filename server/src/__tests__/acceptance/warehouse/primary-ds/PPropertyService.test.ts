/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@loopback/testlab';
import {PPropertyService} from '../../../../warehouse/primary-ds/PPropertyService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createDfhApiProperty} from '../../../helpers/atomic/dfh-api-property.helper';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {createProDfhProfileProjRel, updateProDfhProfileProjRel} from '../../../helpers/atomic/pro-dfh-profile-proj-rel.helper';
import {createProProject} from '../../../helpers/atomic/pro-project.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {DfhApiPropertyMock} from '../../../helpers/data/gvDB/DfhApiPropertyMock';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
import {ProDfhProfileProjRelMock} from '../../../helpers/data/gvDB/ProDfhProfileProjRelMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {setupCleanAndStartWarehouse, waitUntilNext} from '../../../helpers/warehouse-helpers';

describe('PPropertyService', () => {

  let wh: Warehouse;
  let s: PPropertyService;

  beforeEach(async function () {
    await cleanDb();
    wh = await setupCleanAndStartWarehouse()
    s = wh.prim.pProperty;
  })
  afterEach(async function () {await wh.stop()})

  it('should add project-property', async () => {
    const {prel, prop} = await createPPropertyMockData();
    await waitUntilNext(s.afterPut$)
    const result = await s.index.getFromIdx({
      fkProject: prel.fk_project ?? -1,
      pkProperty: prop.dfh_pk_property ?? -1
    })
    expect(result?.fkProperty).to.equal(prop.dfh_pk_property)

  })



  it('should delete project-property', async () => {
    const {prel, prop} = await createPPropertyMockData();
    await waitUntilNext(s.afterPut$)


    await updateProDfhProfileProjRel(prel.pk_entity ?? -1, {enabled: false})

    await waitUntilNext(s.afterDel$)
    const result = await s.index.getFromIdx({
      fkProject: prel.fk_project ?? -1,
      pkProperty: prop.dfh_pk_property ?? -1
    })
    expect(result).to.be.undefined()
  })

});

async function createPPropertyMockData() {
  await createInfLanguage(InfLanguageMock.GERMAN);
  await createProProject(ProProjectMock.PROJECT_1);
  const prel = await createProDfhProfileProjRel(ProDfhProfileProjRelMock.PROJ_1_PROFILE_4);
  const prop = await createDfhApiProperty(DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE);
  return {prel, prop};
}

