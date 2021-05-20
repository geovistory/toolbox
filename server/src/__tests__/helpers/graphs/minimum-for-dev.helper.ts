import {createInfAppellation} from '../atomic/inf-appellation.helper';
import {createInfStatement} from '../atomic/inf-statement.helper';
import {createInfResource} from '../atomic/inf-resource.helper';
import {createProClassFieldConfig} from '../atomic/pro-class-field-config.helper';
import {addProfilesToProject} from '../atomic/pro-dfh-profile-proj-rel.helper';
import {addInfosToProject} from '../atomic/pro-info-proj-rel.helper';
import {createProProject} from '../atomic/pro-project.helper';
import {linkAccountProject} from '../atomic/pub-account_project_rel.helper';
import {createPubRole} from '../atomic/pub-role.helper';
import {createPubRoleMapping} from '../atomic/pub-rolemapping.helper';
import {createSysSystemConfig} from '../atomic/sys-system-config.helper';
import {setSequencesToMax} from '../atomic/_sequences.helper';
import {InfAppellationMock} from '../data/gvDB/InfAppellationMock';
import {InfResourceMock} from '../data/gvDB/InfResourceMock';
import {InfStatementMock} from '../data/gvDB/InfStatementMock';
import {ProClassFieldConfigMock} from '../data/gvDB/ProClassFieldConfigMock';
import {ProProjectMock} from '../data/gvDB/ProProjectMock';
import {PubAccountMock} from '../data/gvDB/PubAccountMock';
import {PubRoleMappingMock} from '../data/gvDB/PubRolemappingMock';
import {PubRoleMock} from '../data/gvDB/PubRoleMock';
import {SysConfigValueMock} from '../data/gvDB/SysConfigValueMock';
import {createModel} from '../meta/model.helper';
import {createSysClassFields} from '../meta/sysClassFields.helper';
import {createGaetanMuck} from './account.helper';
import {createTextAndAnnotation} from './feature-X.helper';
import {createSandBoxProject} from './project.helper';
import {createSourceHabsbourgEmpire} from './source.helper';

/**
 * This function creates mockdata useful for developing geovistory
 *
 * It (should) contain minimal data for every aspect of the application.
 *
 */
export async function minimumForDev() {
  const pkProject = ProProjectMock.SANDBOX_PROJECT.pk_entity ?? -1;

  // create the SysConfig
  await createSysSystemConfig(SysConfigValueMock.SYS_CONFIC_VALID)

  //create the model
  const {profiles} = await createModel()

  await createSysClassFields();

  //create account, namespace and project
  await createSandBoxProject();

  await createProProject(ProProjectMock.DEFAULT_PROJECT);
  await createGaetanMuck();
  await linkAccountProject(PubAccountMock.GAETAN_VERIFIED, ProProjectMock.SANDBOX_PROJECT);

  // make Gaetan sys admin
  await createPubRole(PubRoleMock.SYS_ADMIN)
  await createPubRoleMapping(PubRoleMappingMock.GAETAN_SYS_ADMIN)

  // add profiles to project
  await addProfilesToProject(pkProject, profiles.map(p => p.dfh_pk_profile))

  await createProClassFieldConfig(ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1111_IS_APPE_OF)
  await createProClassFieldConfig(ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME)


  //create the info
  const entities = await createAlbertAndRudolf();
  const source = await createSourceHabsbourgEmpire();

  //create a text, a chunk and annotate rudolf
  const txtAnnot = await createTextAndAnnotation()

  // add info to project
  await addInfosToProject(pkProject, [
    ...entities.teens, ...entities.peits, ...entities.stmts,
    ...source.teens, ...source.peits, ...source.stmts,
    ...txtAnnot.stmts,]
    .map(x => x.pk_entity));

  await setSequencesToMax()
}


async function createAlbertAndRudolf() {
  //create appellation
  const appes = await Promise.all([
    await createInfAppellation(InfAppellationMock.ALERT_IV),
    await createInfAppellation(InfAppellationMock.ALBERT),
    await createInfAppellation(InfAppellationMock.RUDOLF)
  ])

  //create entities - teen
  const teens = await Promise.all([
    await createInfResource(InfResourceMock.ALBERT_IV_NAMING),
    await createInfResource(InfResourceMock.ALBERT_IV_NAMING_2),
    await createInfResource(InfResourceMock.RUDOLF_NAMING)
  ])

  //create entities - peit
  const peits = await Promise.all([
    await createInfResource(InfResourceMock.ALBERT_IV),
    await createInfResource(InfResourceMock.RUDOLF)
  ])

  //statements between appellation and naming
  const stmts = await Promise.all([
    await createInfStatement(InfStatementMock.NAMING_ALBERT_TO_PEIT_ALBERT),
    await createInfStatement(InfStatementMock.NAMING_ALBERT_TO_APPE_ALBERT),
    await createInfStatement(InfStatementMock.NAMING_ALBERT_2_TO_PEIT_ALBERT),
    await createInfStatement(InfStatementMock.NAMING_ALBERT_2_TO_APPE_ALBERT),
    await createInfStatement(InfStatementMock.NAMING_RUDOLF_TO_PEIT_RUDOLF),
    await createInfStatement(InfStatementMock.NAMING_RUDOLF_TO_APPE_RUDOLF),
  ])

  return {appes, teens, peits, stmts}
}

