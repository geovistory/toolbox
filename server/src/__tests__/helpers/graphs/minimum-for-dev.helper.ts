import {genSalt, hash} from 'bcryptjs';
import {PubCredentialRepository} from '../../../repositories/pub-credential.repository';
import {TestDbFactory} from '../TestDbFactory';
import {setSequencesToMax} from '../atomic/_sequences.helper';
import {createDatNamespace} from '../atomic/dat-namespace.helper';
import {createInfAppellation} from '../atomic/inf-appellation.helper';
import {createInfLanguage} from '../atomic/inf-language.helper';
import {createInfResource} from '../atomic/inf-resource.helper';
import {createInfStatement} from '../atomic/inf-statement.helper';
import {createProClassFieldConfig} from '../atomic/pro-class-field-config.helper';
import {addProfileToProject} from '../atomic/pro-dfh-profile-proj-rel.helper';
import {addInfosToProject} from '../atomic/pro-info-proj-rel.helper';
import {createProProject} from '../atomic/pro-project.helper';
import {createProTextProperty} from '../atomic/pro-text-property.helper';
import {createPubAccount} from '../atomic/pub-account.helper';
import {linkAccountProject} from '../atomic/pub-account_project_rel.helper';
import {createPubRole} from '../atomic/pub-role.helper';
import {createPubRoleMapping} from '../atomic/pub-rolemapping.helper';
import {createSysSystemRelevantClass} from '../atomic/sys-relevant-class.helper';
import {createSysSystemConfig} from '../atomic/sys-system-config.helper';
import {createSysSystemType} from '../atomic/sys-system-type.helper';
import {DatNamespaceMock} from '../data/gvDB/DatNamespaceMock';
import {InfAppellationMock} from '../data/gvDB/InfAppellationMock';
import {InfLanguageMock} from '../data/gvDB/InfLanguageMock';
import {InfResourceMock} from '../data/gvDB/InfResourceMock';
import {InfStatementMock} from '../data/gvDB/InfStatementMock';
import {ProClassFieldConfigMock} from '../data/gvDB/ProClassFieldConfigMock';
import {ProProjectMock} from '../data/gvDB/ProProjectMock';
import {ProTextPropertyMock} from '../data/gvDB/ProTextPropertyMock';
import {PubAccountMock} from '../data/gvDB/PubAccountMock';
import {PubCredentialMock} from '../data/gvDB/PubCredentialMock';
import {PubRoleMock} from '../data/gvDB/PubRoleMock';
import {PubRoleMappingMock} from '../data/gvDB/PubRolemappingMock';
import {SysConfigValueMock} from '../data/gvDB/SysConfigValueMock';
import {SysSystemRelevantClassMock} from '../data/gvDB/SysSystemRelevantClass';
import {SysSystemTypeMock} from '../data/gvDB/SysSystemTypeMock';
import {PROFILE_12_BIOGRAPHICAL_BA_2022_02_09} from '../data/ontome-profiles/profile-12-biographical-ba-2022-02-09';
import {PROFILE_21_INTELLECTUAL_AN_2022_01_18} from '../data/ontome-profiles/profile-21-intellectual-an-2022-01-18';
import {PROFILE_5_GEOVISTORY_BASI_2022_01_18} from '../data/ontome-profiles/profile-5-geovistory-basi-2022-01-18';
import {createOntomeProfileMock} from '../generic/ontomeprofile.helper';
import {createTextAndAnnotation} from './feature-X.helper';
import {createSourceHabsbourgEmpire} from './source.helper';

/**
 * This function creates mockdata useful for developing geovistory
 *
 * It (should) contain minimal data for every aspect of the application.
 *
 */
export async function minimumForDev() {

  /****************************************************************************
   * System configuration
   ***************************************************************************/

  // SysConfig (special classes / special fields, ect.)
  await createSysSystemConfig(SysConfigValueMock.SYS_CONFIC_VALID)

  // SystemReleventClass (required by sources, etc.) [should be replaced by SysConfig]
  await createSysSystemRelevantClass(SysSystemRelevantClassMock.MANIFESTATION_SINGLETON)
  await createSysSystemRelevantClass(SysSystemRelevantClassMock.EN_219_MANIFESTATION_PRODUCT_TYPE)

  // SysSystemTypes
  await createSysSystemType(SysSystemTypeMock.PRO_TEXT_PROPTERTY_DESCRIPTION)
  await createSysSystemType(SysSystemTypeMock.PRO_TEXT_PROPTERTY_LABEL)
  await createSysSystemType(SysSystemTypeMock.DIGITAL_TEXT)
  await createSysSystemType(SysSystemTypeMock.DIGITAL_TABLE)
  await createSysSystemType(SysSystemTypeMock.NUMBER)
  await createSysSystemType(SysSystemTypeMock.VALUE)
  await createSysSystemType(SysSystemTypeMock.TEXT)
  await createSysSystemType(SysSystemTypeMock.LABEL_OF_DATA_RECORD)
  await createSysSystemType(SysSystemTypeMock.ANALYSIS_TYPE_TABLE)
  await createSysSystemType(SysSystemTypeMock.ANALYSIS_TYPE_MAP)
  await createSysSystemType(SysSystemTypeMock.ANALYSIS_TYPE_TIME_CHART)

  // PubRole sys-admin
  await createPubRole(PubRoleMock.SYS_ADMIN)

  // await createSysClassFields();


  /****************************************************************************
   * OntoME data
   ***************************************************************************/

  const profileGeovBasics = await createOntomeProfileMock(PROFILE_5_GEOVISTORY_BASI_2022_01_18)
  const profileIntellectu = await createOntomeProfileMock(PROFILE_21_INTELLECTUAL_AN_2022_01_18)
  const profileBibliograp = await createOntomeProfileMock(PROFILE_12_BIOGRAPHICAL_BA_2022_02_09)


  /****************************************************************************
   * Languages
   ***************************************************************************/

  // Languages
  await createInfLanguage(InfLanguageMock.GERMAN)
  await createInfLanguage(InfLanguageMock.ENGLISH)
  await createInfLanguage(InfLanguageMock.FRENCH)
  await createInfLanguage(InfLanguageMock.ITALIAN)


  /****************************************************************************
  * Project Default Configuration Project
  ***************************************************************************/

  // Project Default Configuration Project
  await createProProject(ProProjectMock.DEFAULT_PROJECT);

  // Project Default Configuration Project >  Class Field Config
  await createProClassFieldConfig(ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1111_IS_APPE_OF)
  await createProClassFieldConfig(ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME)

  /****************************************************************************
  * Project Sandbox
  ***************************************************************************/

  // Project Sandbox
  const projectSandbox = await createProProject(ProProjectMock.SANDBOX_PROJECT);

  // Project Sandbox > Name
  await createProTextProperty(ProTextPropertyMock.SANDBOX_PROJECT_NAME);

  // Project Sandbox > Namespace
  await createDatNamespace(DatNamespaceMock.SANDBOX_NAMESPACE);

  // Project Sandbox > Profiles
  await addProfileToProject(profileGeovBasics.profile.dfh_pk_profile, projectSandbox.pk_entity)
  await addProfileToProject(profileIntellectu.profile.dfh_pk_profile, projectSandbox.pk_entity)
  await addProfileToProject(profileBibliograp.profile.dfh_pk_profile, projectSandbox.pk_entity)


  /****************************************************************************
  * Account Gaetan (sys admin)
  ***************************************************************************/

  // Account Gaetan
  await createPubAccount(PubAccountMock.GAETAN_VERIFIED);

  // Account Gaetan > Credentials
  const hashed = await hash(PubCredentialMock.GAETAN_PASSWORD.password ?? '', await genSalt());
  await new PubCredentialRepository(TestDbFactory.datasource)
    .create({accountId: PubAccountMock.GAETAN_VERIFIED.id, password: hashed});

  // Account Gaetan > Project Sandbox
  await linkAccountProject(PubAccountMock.GAETAN_VERIFIED, ProProjectMock.SANDBOX_PROJECT);

  // Account Gaetan > PubRole SysAdmin
  await createPubRoleMapping(PubRoleMappingMock.GAETAN_SYS_ADMIN)


  /****************************************************************************
  * Information
  ***************************************************************************/

  // create the info
  const entities = await createAlbertAndRudolf();
  const source = await createSourceHabsbourgEmpire();

  //create a text, a chunk and annotate rudolf
  const txtAnnot = await createTextAndAnnotation()

  // add info to sandbox
  await addInfosToProject(projectSandbox.pk_entity, [
    ...entities.teens, ...entities.peits, ...entities.stmts,
    ...source.teens, ...source.peits, ...source.stmts,
    ...txtAnnot.stmts,]
    .map(x => x.pk_entity));



  /****************************************************************************
  * Cleanup
  ***************************************************************************/
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

