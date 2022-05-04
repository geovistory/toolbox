import {expect} from '@loopback/testlab';
import {AddOrRemoveEntityController} from '../../../../controllers/project-data/add-or-remove-entity.controller';
import {InfResource} from '../../../../models/inf-resource.model';
import {C_868_PERSON_APPELLATION_IN_A_LANGUAGE_ID} from '../../../../ontome-ids';
import {GeovistoryServer} from '../../../../server';
import {createInfAppellation} from '../../../helpers/atomic/inf-appellation.helper';
import {createInfResource} from '../../../helpers/atomic/inf-resource.helper';
import {createInfStatement} from '../../../helpers/atomic/inf-statement.helper';
import {addInfosToProject} from '../../../helpers/atomic/pro-info-proj-rel.helper';
import {createSysSystemConfig} from '../../../helpers/atomic/sys-system-config.helper';
import {InfAppellationMock} from '../../../helpers/data/gvDB/InfAppellationMock';
import {InfResourceMock} from '../../../helpers/data/gvDB/InfResourceMock';
import {InfStatementMock} from '../../../helpers/data/gvDB/InfStatementMock';
import {OmitEntity} from '../../../helpers/data/gvDB/local-model.helpers';
import {SysConfigValueMock} from '../../../helpers/data/gvDB/SysConfigValueMock';
import {PROFILE_5_GEOVISTORY_BASI_2022_01_18} from '../../../helpers/data/ontome-profiles/profile-5-geovistory-basi-2022-01-18';
import {PROFILE_97_GEOVISTORY_DIGI_2022_02_05} from '../../../helpers/data/ontome-profiles/profile-97-geovistory-digi-2022-02-05';
import {createOntomeProfileMock} from '../../../helpers/generic/ontomeprofile.helper';
import {SubfieldHelper} from '../../../helpers/graphs/subfield-page.helper';
import {setupApplication} from '../../../helpers/gv-server-helpers';
import {cleanDb} from '../../../helpers/meta/clean-db.helper';


const PERSON_NAMING_1: OmitEntity<InfResource> = {
  ...InfResourceMock.NAMING_1,
  fk_class: C_868_PERSON_APPELLATION_IN_A_LANGUAGE_ID
}

describe('AddOrRemoveEntityController', () => {
  let server: GeovistoryServer;
  let controller: AddOrRemoveEntityController
  let pkProject: number;

  before(async () => {
    ({server} = await setupApplication());
    controller = await server.lbApp.get<AddOrRemoveEntityController>('controllers.AddOrRemoveEntityController')


  })
  beforeEach(async () => {
    await cleanDb();
    const d = await SubfieldHelper.makeProject1()
    await createSysSystemConfig(SysConfigValueMock.SYS_CONFIC_VALID)
    await createOntomeProfileMock(PROFILE_5_GEOVISTORY_BASI_2022_01_18)
    await createOntomeProfileMock(PROFILE_97_GEOVISTORY_DIGI_2022_02_05)
    pkProject = d.pk_entity;
  });
  after(async () => {
    try {
      await server.stop();
    } catch (e) {
      console.log(e);
    }
  });

  describe('POST /project-data/add-entity', () => {
    it('should return the ids of the entity and the statement', async () => {
      const toAdd: number[] = []
      toAdd.push((await createInfResource(PERSON_NAMING_1)).pk_entity ?? -1)
      toAdd.push((await createInfStatement(InfStatementMock.NAME_1_TO_APPE)).pk_entity ?? -1)
      await createInfAppellation(InfAppellationMock.JACK_THE_FOO)
      await addInfosToProject(pkProject, toAdd)

      const ids = await controller.getIdsToAdd(pkProject, PERSON_NAMING_1.pk_entity ?? -1)

      const expected = [
        InfStatementMock.NAME_1_TO_APPE.pk_entity,
        PERSON_NAMING_1.pk_entity
      ].sort()

      expect(ids.sort()).to.deepEqual(expected)
    });

    it('should return the ids of the path person1 - has definition - definition - has value version 2', async () => {
      const toAdd: number[] = []
      toAdd.push((await createInfResource(InfResourceMock.PERSON_1)).pk_entity ?? -1)
      toAdd.push((await createInfStatement(InfStatementMock.PERSON_1_HAS_DEFINITION)).pk_entity ?? -1)
      toAdd.push((await createInfResource(InfResourceMock.DEFINITION_1)).pk_entity ?? -1)
      toAdd.push((await createInfStatement(InfStatementMock.DEFINITION_1_HAS_VALUE_VERSION_1)).pk_entity ?? -1)
      toAdd.push((await createInfStatement(InfStatementMock.DEFINITION_1_HAS_VALUE_VERSION_2)).pk_entity ?? -1)
      await addInfosToProject(pkProject, toAdd)
      await createInfAppellation(InfAppellationMock.VALUE_VERSION_1)
      await createInfAppellation(InfAppellationMock.VALUE_VERSION_2)

      const ids = await controller.getIdsToAdd(pkProject, InfResourceMock.PERSON_1.pk_entity ?? -1)

      const expected = [
        InfResourceMock.PERSON_1.pk_entity,
        InfStatementMock.PERSON_1_HAS_DEFINITION.pk_entity,
        InfResourceMock.DEFINITION_1.pk_entity,
        InfStatementMock.DEFINITION_1_HAS_VALUE_VERSION_2.pk_entity
      ].sort()

      expect(ids.sort()).to.deepEqual(expected)
    });

    it('should return the ids of the path person1 - has definition - definition - has value version 1', async () => {
      const toAdd: number[] = []
      toAdd.push((await createInfResource(InfResourceMock.PERSON_1)).pk_entity ?? -1)
      toAdd.push((await createInfStatement(InfStatementMock.PERSON_1_HAS_DEFINITION)).pk_entity ?? -1)
      toAdd.push((await createInfResource(InfResourceMock.DEFINITION_1)).pk_entity ?? -1)
      toAdd.push((await createInfStatement(InfStatementMock.DEFINITION_1_HAS_VALUE_VERSION_2)).pk_entity ?? -1)
      toAdd.push((await createInfStatement(InfStatementMock.DEFINITION_1_HAS_VALUE_VERSION_1)).pk_entity ?? -1)
      await addInfosToProject(pkProject, toAdd)
      await createInfAppellation(InfAppellationMock.VALUE_VERSION_1)
      await createInfAppellation(InfAppellationMock.VALUE_VERSION_2)

      const ids = await controller.getIdsToAdd(pkProject, InfResourceMock.PERSON_1.pk_entity ?? -1)

      const expected = [
        InfResourceMock.PERSON_1.pk_entity,
        InfStatementMock.PERSON_1_HAS_DEFINITION.pk_entity,
        InfResourceMock.DEFINITION_1.pk_entity,
        InfStatementMock.DEFINITION_1_HAS_VALUE_VERSION_1.pk_entity
      ].sort()

      expect(ids.sort()).to.deepEqual(expected)
    });



    it('should return the ids of the path definition - has value version 2', async () => {
      const toAdd: number[] = []
      toAdd.push((await createInfResource(InfResourceMock.DEFINITION_1)).pk_entity ?? -1)
      toAdd.push((await createInfStatement(InfStatementMock.DEFINITION_1_HAS_VALUE_VERSION_1)).pk_entity ?? -1)
      toAdd.push((await createInfStatement(InfStatementMock.DEFINITION_1_HAS_VALUE_VERSION_2)).pk_entity ?? -1)
      await addInfosToProject(pkProject, toAdd)
      await createInfAppellation(InfAppellationMock.VALUE_VERSION_1)
      await createInfAppellation(InfAppellationMock.VALUE_VERSION_2)

      const ids = await controller.getIdsToAdd(pkProject, InfResourceMock.DEFINITION_1.pk_entity ?? -1)

      const expected = [
        InfResourceMock.DEFINITION_1.pk_entity,
        InfStatementMock.DEFINITION_1_HAS_VALUE_VERSION_2.pk_entity
      ].sort()

      expect(ids.sort()).to.deepEqual(expected)
    });


    it('should return the ids of the path person - has appe TeEn - has spelling ', async () => {
      const toAdd: number[] = []
      toAdd.push((await createInfResource(InfResourceMock.PERSON_1)).pk_entity ?? -1)
      toAdd.push((await createInfResource(PERSON_NAMING_1)).pk_entity ?? -1)
      toAdd.push((await createInfStatement(InfStatementMock.NAME_1_TO_PERSON)).pk_entity ?? -1)
      toAdd.push((await createInfStatement(InfStatementMock.NAME_1_TO_APPE)).pk_entity ?? -1)
      await addInfosToProject(pkProject, toAdd)
      await createInfAppellation(InfAppellationMock.JACK_THE_FOO)

      const ids = await controller.getIdsToAdd(pkProject, InfResourceMock.PERSON_1.pk_entity ?? -1)

      const expected = [
        InfResourceMock.PERSON_1.pk_entity,
        PERSON_NAMING_1.pk_entity,
        InfStatementMock.NAME_1_TO_PERSON.pk_entity,
        InfStatementMock.NAME_1_TO_APPE.pk_entity,
      ].sort()

      expect(ids.sort()).to.deepEqual(expected)
    });


  })


});

