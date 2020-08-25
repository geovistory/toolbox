/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect} from '@loopback/testlab';
import {EdgeService} from '../../../../warehouse/primary-ds/EdgeService';
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
import {setupWarehouseAndConnect, waitUntilNext} from '../../../helpers/warehouse-helpers';

describe('EdgeService', () => {

  let wh: Warehouse;
  let s: EdgeService;

  beforeEach(async function () {
    wh = await setupWarehouseAndConnect()
    await cleanDb();
    s = wh.prim.edge;
    await s.clearAll()
  })

  it('should have field edges in index after initIdx()', async () => {
    await createInfLanguage(InfLanguageMock.GERMAN)
    const project = await createProProject(ProProjectMock.PROJECT_1)

    await createInfTemporalEntity(InfTemporalEntityMock.NAMING_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_NAMING_1)
    await createInfAppellation(InfAppellationMock.JACK_THE_FOO)
    await createInfStatement(InfStatementMock.NAME_1_TO_APPE)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE)
    await createInfStatement(InfStatementMock.NAME_1_TO_PERSON)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON)
    await createInfPersistentItem(InfPersistentItemMock.PERSON_1)


    await s.initIdx();
    const result = await s.index.getFromIdx({
      pkEntity: InfTemporalEntityMock.NAMING_1.pk_entity ?? -1,
      fkProject: project.pk_entity ?? -1
    })
    expect(result?.outgoing?.[1113]?.[0].targetLabel).to.equal(InfAppellationMock.JACK_THE_FOO.string)
    expect(result?.outgoing?.[1113]?.length).to.equal(1)

    expect(result?.outgoing?.[1111]?.[0].fkTarget).to.equal(InfStatementMock.NAME_1_TO_PERSON.fk_object_info)
    expect(result?.outgoing?.[1111]?.length).to.equal(1)

  })

  it('should update field edges if statement is removed from project', async () => {
    await createInfLanguage(InfLanguageMock.GERMAN)
    const project = await createProProject(ProProjectMock.PROJECT_1)

    await createInfTemporalEntity(InfTemporalEntityMock.NAMING_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_NAMING_1)
    await createInfAppellation(InfAppellationMock.JACK_THE_FOO)
    await createInfStatement(InfStatementMock.NAME_1_TO_APPE)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE)
    await createInfStatement(InfStatementMock.NAME_1_TO_PERSON)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON)
    await createInfPersistentItem(InfPersistentItemMock.PERSON_1)


    await s.initIdx();
    const id = {
      pkEntity: InfTemporalEntityMock.NAMING_1.pk_entity ?? -1,
      fkProject: project.pk_entity ?? -1
    }
    let result = await s.index.getFromIdx(id)
    expect(result?.outgoing?.[1113]?.[0].targetLabel).to.equal(InfAppellationMock.JACK_THE_FOO.string)
    expect(result?.outgoing?.[1113]?.length).to.equal(1)

    expect(result?.outgoing?.[1111]?.[0].fkTarget).to.equal(InfStatementMock.NAME_1_TO_PERSON.fk_object_info)
    expect(result?.outgoing?.[1111]?.length).to.equal(1)



    await updateProInfoProjRel(
      ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON.pk_entity ?? -1,
      {
        ...ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON,
        is_in_project: false
      }
    )

    await waitUntilNext(s.afterPut$)

    result = await s.index.getFromIdx(id)
    expect(result?.outgoing?.[1113]?.[0].targetLabel).to.equal(InfAppellationMock.JACK_THE_FOO.string)
    expect(result?.outgoing?.[1113]?.length).to.equal(1)
    expect(result?.outgoing?.[1111]).be.undefined()
  })

  // it('should delete entity if removed from project', async () => {
  //   const entity = await createInfPersistentItem(InfPersistentItemMock.PERSON_1)
  //   await createInfLanguage(InfLanguageMock.GERMAN)
  //   const project = await createProProject(ProProjectMock.PROJECT_1)
  //   await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_PERSON_1)
  //   await s.initIdx();
  //   const id = {
  //     pkEntity: InfPersistentItemMock.PERSON_1.pk_entity ?? -1,
  //     fkProject: project.pk_entity ?? -1
  //   }
  //   let result = await s.index.getFromIdx(id)
  //   expect(result?.fkClass).to.equal(entity?.fk_class)
  //   await updateProInfoProjRel(
  //     ProInfoProjRelMock.PROJ_1_PERSON_1.pk_entity ?? -1,
  //     {
  //       ...ProInfoProjRelMock.PROJ_1_PERSON_1,
  //       is_in_project: false
  //     }
  //   )
  //   await wait(20)
  //   result = await s.index.getFromIdx(id)
  //   expect(result?.fkClass).to.be.undefined()
  // })

});

