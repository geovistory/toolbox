/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@loopback/testlab';
import {clone, equals} from 'ramda';
import {ProEntityLabelConfigService} from '../../../../warehouse/primary-ds/ProEntityLabelConfigService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {createProEntityLabelConfig, deleteProEntityLabelConfig, updateProEntityLabelConfig} from '../../../helpers/atomic/pro-entity-label-config.helper';
import {createProProject} from '../../../helpers/atomic/pro-project.helper';
import {createTypes} from '../../../helpers/atomic/sys-system-type.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {DfhApiPropertyMock} from '../../../helpers/data/gvDB/DfhApiPropertyMock';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
import {ProEntityLabelConfigMock} from '../../../helpers/data/gvDB/ProEntityLabelConfigMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {searchUntilSatisfy, setupCleanAndStartWarehouse, stopWarehouse, waitUntilNext} from '../../../helpers/warehouse-helpers';

describe('ProEntityLabelConfigService', () => {

  let wh: Warehouse;
  let s: ProEntityLabelConfigService;


  beforeEach(async function () {
    await cleanDb();
    wh = await setupCleanAndStartWarehouse()
    s = wh.prim.proEntityLabelConfig;
  })


  afterEach(async function () {await stopWarehouse(wh)})

  it('should create pro entity label config in db', async () => {
    await createProjectMock();
    const item = await createProEntityLabelConfig(ProEntityLabelConfigMock.C633_UNION_PROJECT_DEFAULT);

    expect(item).not.to.be.undefined()
  })
  it('should have pro entity label config in index', async () => {

    await createProjectMock();
    const dbItem = await createProEntityLabelConfig(ProEntityLabelConfigMock.C633_UNION_PROJECT_DEFAULT);

    const whItem = await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx({pkClass: dbItem.fk_class, fkProject: dbItem.fk_project}),
      compare: (val) => equals(val, ProEntityLabelConfigMock.C633_UNION_PROJECT_DEFAULT.config)
    });

    expect(whItem).to.deepEqual(ProEntityLabelConfigMock.C633_UNION_PROJECT_DEFAULT.config)

  })
  it('should update pro entity label config in index', async () => {

    await createProjectMock();
    const dbItem = await createProEntityLabelConfig(ProEntityLabelConfigMock.C633_UNION_PROJECT_DEFAULT);

    let whItem = await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx({pkClass: dbItem.fk_class, fkProject: dbItem.fk_project}),
      compare: (val) => equals(val, ProEntityLabelConfigMock.C633_UNION_PROJECT_DEFAULT.config)
    });
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

    whItem = await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx({pkClass: dbItem.fk_class, fkProject: dbItem.fk_project}),
      compare: (val) => val?.labelParts?.[0].field?.nrOfStatementsInLabel === 1
    });

    expect(whItem).not.to.be.undefined()

  })

  it('should delete pro Property label in index', async () => {

    await createProjectMock();
    const dbItem = await createProEntityLabelConfig(ProEntityLabelConfigMock.C633_UNION_PROJECT_DEFAULT);

    await searchUntilSatisfy({
      notifier$: s.afterChange$,
      getFn: () => s.index.getFromIdx({pkClass: dbItem.fk_class, fkProject: dbItem.fk_project}),
      compare: (val) => !!val
    });
    await deleteProEntityLabelConfig(dbItem.pk_entity ?? -1)

    await waitUntilNext(s.afterChange$)
    const resultUpdated = await s.index.getFromIdxWithTmsps({
      fkProject: dbItem.fk_project,
      pkClass: dbItem.fk_class
    })
    expect(resultUpdated?.deleted).not.to.be.undefined()
  })

});

async function createProjectMock() {
  await createTypes();
  await createInfLanguage(InfLanguageMock.GERMAN);
  await createProProject(ProProjectMock.PROJECT_1);
}

