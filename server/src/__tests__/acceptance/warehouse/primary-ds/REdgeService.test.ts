/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@loopback/testlab';
import {REdgeService} from '../../../../warehouse/primary-ds/edge/REdgeService';
import {Warehouse} from '../../../../warehouse/Warehouse';
import {createInfAppellation} from '../../../helpers/atomic/inf-appellation.helper';
import {createInfLanguage} from '../../../helpers/atomic/inf-language.helper';
import {createInfPersistentItem} from '../../../helpers/atomic/inf-persistent-item.helper';
import {createInfStatement} from '../../../helpers/atomic/inf-statement.helper';
import {createInfTemporalEntity} from '../../../helpers/atomic/inf-temporal-entity.helper';
import {createProInfoProjRel, updateProInfoProjRel} from '../../../helpers/atomic/pro-info-proj-rel.helper';
import {createProProject} from '../../../helpers/atomic/pro-project.helper';
import {cleanDb} from '../../../helpers/cleaning/clean-db.helper';
import {InfAppellationMock} from '../../../helpers/data/gvDB/InfAppellationMock';
import {InfLanguageMock} from '../../../helpers/data/gvDB/InfLanguageMock';
import {InfPersistentItemMock} from '../../../helpers/data/gvDB/InfPersistentItemMock';
import {InfStatementMock} from '../../../helpers/data/gvDB/InfStatementMock';
import {InfTemporalEntityMock} from '../../../helpers/data/gvDB/InfTemporalEntityMock';
import {ProInfoProjRelMock} from '../../../helpers/data/gvDB/ProInfoProjRelMock';
import {ProProjectMock} from '../../../helpers/data/gvDB/ProProjectMock';
import {setupCleanAndStartWarehouse, wait, waitUntilSatisfy, waitUntilNext} from '../../../helpers/warehouse-helpers';

describe('REdgeService', () => {

  let wh: Warehouse;
  let s: REdgeService;

  beforeEach(async function () {
    await cleanDb();
    wh = await setupCleanAndStartWarehouse()
    s = wh.prim.rEdge;
  })

  it('should have field edges in index after initIdx()', async () => {
    await createInfLanguage(InfLanguageMock.GERMAN)
    await createProProject(ProProjectMock.PROJECT_1)

    await createInfTemporalEntity(InfTemporalEntityMock.NAMING_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_NAMING_1)
    await createInfAppellation(InfAppellationMock.JACK_THE_FOO)
    await createInfStatement(InfStatementMock.NAME_1_TO_APPE)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE)
    await createInfStatement(InfStatementMock.NAME_1_TO_PERSON)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON)
    await createInfPersistentItem(InfPersistentItemMock.PERSON_1)

    await waitUntilSatisfy(s.afterPut$, (item) => {
      return item.key.pkEntity === (InfTemporalEntityMock.NAMING_1.pk_entity ?? -1)
        && item.val?.outgoing?.[1113]?.[0].targetLabel === InfAppellationMock.JACK_THE_FOO.string
        && item.val?.outgoing?.[1113]?.length === 1
        && item.val?.outgoing?.[1111]?.[0].fkTarget === InfStatementMock.NAME_1_TO_PERSON.fk_object_info
        && item.val?.outgoing?.[1111]?.length === 1
    })


  })

  // it('should update field edges if statement is removed from project', async () => {
  //   await createInfLanguage(InfLanguageMock.GERMAN)
  //   const project = await createProProject(ProProjectMock.PROJECT_1)

  //   await createInfTemporalEntity(InfTemporalEntityMock.NAMING_1)
  //   await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_NAMING_1)
  //   await createInfAppellation(InfAppellationMock.JACK_THE_FOO)
  //   await createInfStatement(InfStatementMock.NAME_1_TO_APPE)
  //   await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE)
  //   await createInfStatement(InfStatementMock.NAME_1_TO_PERSON)
  //   await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON)
  //   await createInfPersistentItem(InfPersistentItemMock.PERSON_1)


  //   // await wait(500)

  //   // const id = {
  //   //   pkEntity: InfTemporalEntityMock.NAMING_1.pk_entity ?? -1,
  //   //   fkProject: project.pk_entity ?? -1
  //   // }
  //   // let result = await s.index.getFromIdx(id)

  //   await waitUntilSatisfy(s.afterPut$, (item) => {
  //     return item.key.pkEntity === InfTemporalEntityMock.NAMING_1.pk_entity
  //       && item.val?.outgoing?.[1113]?.[0].targetLabel === InfAppellationMock.JACK_THE_FOO.string
  //       && item.val?.outgoing?.[1113]?.length === 1
  //       && item.val?.outgoing?.[1111]?.[0].fkTarget === InfStatementMock.NAME_1_TO_PERSON.fk_object_info
  //       && item.val?.outgoing?.[1111]?.length === 1
  //   })
  //   // expect(result?.outgoing?.[1113]?.[0].targetLabel).to.equal(InfAppellationMock.JACK_THE_FOO.string)
  //   // expect(result?.outgoing?.[1113]?.length).to.equal(1)

  //   // expect(result?.outgoing?.[1111]?.[0].fkTarget).to.equal(InfStatementMock.NAME_1_TO_PERSON.fk_object_info)
  //   // expect(result?.outgoing?.[1111]?.length).to.equal(1)



  //   await updateProInfoProjRel(
  //     ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON.pk_entity ?? -1,
  //     {
  //       ...ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON,
  //       is_in_project: false
  //     }
  //   )

  //   await waitUntilSatisfy(s.afterPut$, (item) => {
  //     return item.key.pkEntity === InfTemporalEntityMock.NAMING_1.pk_entity
  //       && item.val?.outgoing?.[1113]?.[0].targetLabel === InfAppellationMock.JACK_THE_FOO.string
  //       && item.val?.outgoing?.[1113]?.length === 1
  //       && item.val?.outgoing?.[1111] === undefined
  //   })

  // })


});

