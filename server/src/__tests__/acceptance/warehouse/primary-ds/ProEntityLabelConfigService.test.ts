/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@loopback/testlab';
import {ProEntityLabelConfigService} from '../../../../warehouse/primary-ds/ProEntityLabelConfigService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {createProEntityLabelConfig, updateProEntityLabelConfig, deleteProEntityLabelConfig} from '../../../helpers/atomic/pro-entity-label-config.helper';
import {createProProject} from '../../../helpers/atomic/pro-project.helper';
import {createTypes} from '../../../helpers/atomic/sys-system-type.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
import {ProEntityLabelConfigMock} from '../../../helpers/data/gvDB/ProEntityLabelConfigMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {setupCleanAndStartWarehouse, waitUntilNext, waitUntilSatisfy} from '../../../helpers/warehouse-helpers';
import {clone} from 'ramda';
import {DfhApiPropertyMock} from '../../../helpers/data/gvDB/DfhApiPropertyMock';

describe('ProEntityLabelConfigService', () => {

  let wh: Warehouse;
  let s: ProEntityLabelConfigService;


  beforeEach(async function () {
    await cleanDb();
    wh = await setupCleanAndStartWarehouse()
    s = wh.prim.proEntityLabelConfig;
  })


  afterEach(async function () {await wh.stop()})

  it('should create pro entity label config in db', async () => {
    await createProjectMock();
    const item = await createProEntityLabelConfig(ProEntityLabelConfigMock.C633_UNION_PROJECT_DEFAULT);

    expect(item).not.to.be.undefined()
  })
  it('should have pro entity label config in index', async () => {

    await createProjectMock();
    const dbItem = await createProEntityLabelConfig(ProEntityLabelConfigMock.C633_UNION_PROJECT_DEFAULT);

    const whItem = await waitUntilSatisfy(s.afterPut$, (item) => {
      return item.key.pkClass === dbItem.fk_class
        && item.key.fkProject === dbItem.fk_project
    })

    expect(whItem.val).to.deepEqual(ProEntityLabelConfigMock.C633_UNION_PROJECT_DEFAULT.config)

  })
  it('should update pro entity label config in index', async () => {

    await createProjectMock();
    const dbItem = await createProEntityLabelConfig(ProEntityLabelConfigMock.C633_UNION_PROJECT_DEFAULT);

    let whItem = await waitUntilSatisfy(s.afterPut$, (item) => {
      return item.key.pkClass === dbItem.fk_class
        && item.key.fkProject === dbItem.fk_project
    })
    const modified = clone(ProEntityLabelConfigMock.C633_UNION_PROJECT_DEFAULT)
    modified.config.labelParts = [{
      ordNum: 0,
      field: {
        fkProperty: DfhApiPropertyMock.EN_1436_HAS_PARTNER.dfh_pk_property,
        isOutgoing: true,
        nrOfStatementsInLabel: 1
      }
    }]
    await updateProEntityLabelConfig(dbItem.pk_entity, modified);

    whItem = await waitUntilSatisfy(s.afterPut$, (item) => {
      return item.key.pkClass === dbItem.fk_class
        && item.key.fkProject === dbItem.fk_project
        && item.val.labelParts?.[0].field?.nrOfStatementsInLabel === 1
    })


    expect(whItem).not.to.be.undefined()

  })

  it('should delete pro Property label in index', async () => {

    await createProjectMock();
    const dbItem = await createProEntityLabelConfig(ProEntityLabelConfigMock.C633_UNION_PROJECT_DEFAULT);

    await waitUntilSatisfy(s.afterPut$, (item) => {
      return item.key.pkClass === dbItem.fk_class
        && item.key.fkProject === dbItem.fk_project
    })

    await deleteProEntityLabelConfig(dbItem.pk_entity ?? -1)

    await waitUntilNext(s.afterDel$)
    const resultUpdated = await s.index.getFromIdx({
      fkProject: dbItem.fk_project,
      pkClass: dbItem.fk_class
    })
    expect(resultUpdated).to.be.undefined()
  })

});

async function createProjectMock() {
  await createTypes();
  await createInfLanguage(InfLanguageMock.GERMAN);
  await createProProject(ProProjectMock.PROJECT_1);
}

