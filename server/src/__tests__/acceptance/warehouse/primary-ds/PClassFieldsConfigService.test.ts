/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@loopback/testlab';
import {PClassFieldsConfigService} from '../../../../warehouse/primary-ds/PClassFieldsConfigService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {createProClassFieldConfig} from '../../../helpers/atomic/pro-class-field-config.helper';
import {createProProject} from '../../../helpers/atomic/pro-project.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
import {ProClassFieldConfigMock} from '../../../helpers/data/gvDB/ProClassFieldConfigMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {setupCleanAndStartWarehouse, waitUntilNext} from '../../../helpers/warehouse-helpers';

describe('PClassFieldsConfigService', () => {

  let wh: Warehouse;
  let s: PClassFieldsConfigService;

  beforeEach(async function () {
    await cleanDb();
    wh = await setupCleanAndStartWarehouse()
    s = wh.prim.pClassFieldsConfig;
  })

  it('should add project-class', async () => {
    const {one} = await createPClassMockData();
    await waitUntilNext(s.afterPut$)
    await waitUntilNext(s.afterPut$)
    const result = await s.index.getFromIdx({
      fkProject: one.fk_project ?? -1,
      pkClass: one.fk_domain_class ?? -1
    })
    expect(result?.length).to.equal(2)

  })



  // it('should delete project-class', async () => {
  //   const {prel, cla} = await createPClassMockData();
  //   await waitUntilNext(s.afterPut$)


  //   await updateProDfhProfileProjRel(prel.pk_entity ?? -1, {enabled: false})

  //   await waitUntilNext(s.afterDel$)
  //   const result = await s.index.getFromIdx({
  //     fkProject: prel.fk_project ?? -1,
  //     pkClass: cla.dfh_pk_class ?? -1
  //   })
  //   expect(result).to.be.undefined()
  // })

});

async function createPClassMockData() {
  await createInfLanguage(InfLanguageMock.GERMAN);
  await createProProject(ProProjectMock.DEFAULT_PROJECT)
  const one = await createProClassFieldConfig(ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1111_IS_APPE_OF)
  const two = await createProClassFieldConfig(ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME)

  return {one, two};
}
