import {genSalt, hash} from 'bcrypt';
import {PubCredentialRepository} from '../../../repositories/pub-credential.repository';
import {createInfAppellation} from '../atomic/inf-appellation.helper';
import {createInfLanguage} from '../atomic/inf-language.helper';
import {createInfResource} from '../atomic/inf-resource.helper';
import {createInfStatement} from '../atomic/inf-statement.helper';
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
import {createWarEntityPreview} from '../atomic/war-entity-preview.helper';
import {setSequencesToMax} from '../atomic/_sequences.helper';
import {InfAppellationMock} from '../data/gvDB/InfAppellationMock';
import {InfLanguageMock} from '../data/gvDB/InfLanguageMock';
import {InfResourceMock} from '../data/gvDB/InfResourceMock';
import {InfStatementMock} from '../data/gvDB/InfStatementMock';
import {ProProjectMock} from '../data/gvDB/ProProjectMock';
import {ProTextPropertyMock} from '../data/gvDB/ProTextPropertyMock';
import {PubAccountMock} from '../data/gvDB/PubAccountMock';
import {PubCredentialMock} from '../data/gvDB/PubCredentialMock';
import {PubRoleMappingMock} from '../data/gvDB/PubRolemappingMock';
import {PubRoleMock} from '../data/gvDB/PubRoleMock';
import {SysConfigValueMock} from '../data/gvDB/SysConfigValueMock';
import {SysSystemRelevantClassMock} from '../data/gvDB/SysSystemRelevantClass';
import {SysSystemTypeMock} from '../data/gvDB/SysSystemTypeMock';
import {WarEntityPreviewMock} from '../data/gvDB/WarEntityPreviewMock';
import {PROFILE_5_GEOVISTORY_BASI_2021_08_24} from '../data/ontome-profiles/profile-5-geovistory-basi-2021-08-24';
import {PROFILE_99_DIGITALS} from '../data/ontome-profiles/profile-99-digitals';
import {createOntomeProfileMock} from '../generic/ontomeprofile.helper';
import {testdb} from '../testdb';

/**
 * This function creates mockdata useful for developing geovistory
 *
 * It (should) contain minimal data for every aspect of the application.
 *
 */
export async function digitalsSeeds() {

  /****************************************************************************
   * System configuration
   ***************************************************************************/

  // SysConfig (special classes / special fields, ect.)
  await createSysSystemConfig(SysConfigValueMock.SYS_CONFIC_DIGITALS)

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

  // PubRole sys-admin
  await createPubRole(PubRoleMock.SYS_ADMIN)

  // await createSysClassFields();


  /****************************************************************************
   * OntoME data
   ***************************************************************************/

  const profileGeovBasics = await createOntomeProfileMock(PROFILE_5_GEOVISTORY_BASI_2021_08_24)
  const profileDigitals = await createOntomeProfileMock(PROFILE_99_DIGITALS)


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


  /****************************************************************************
  * Project Sandbox
  ***************************************************************************/

  // Project Sandbox
  const project1 = await createProProject(ProProjectMock.PROJECT_1);

  // Project Sandbox > Name
  await createProTextProperty(ProTextPropertyMock.PROJECT_1_NAME);

  // Project Sandbox > Profiles
  await addProfileToProject(profileGeovBasics.profile.dfh_pk_profile, project1.pk_entity)
  await addProfileToProject(profileDigitals.profile.dfh_pk_profile, project1.pk_entity)


  /****************************************************************************
  * Account Gaetan (sys admin)
  ***************************************************************************/

  // Account Gaetan
  await createPubAccount(PubAccountMock.GAETAN_VERIFIED);

  // Account Gaetan > Credentials
  const hashed = await hash(PubCredentialMock.GAETAN_PASSWORD.password, await genSalt());
  await new PubCredentialRepository(testdb)
    .create({accountId: PubAccountMock.GAETAN_VERIFIED.id, password: hashed});

  // Account Gaetan > Project 1
  await linkAccountProject(PubAccountMock.GAETAN_VERIFIED, ProProjectMock.PROJECT_1);

  // Account Gaetan > PubRole SysAdmin
  await createPubRoleMapping(PubRoleMappingMock.GAETAN_SYS_ADMIN)


  /****************************************************************************
  * Information
  ***************************************************************************/

  // create the info
  const definition1 = await createInfResource(InfResourceMock.DEFINITION_1)
  await createWarEntityPreview(WarEntityPreviewMock.DEFINITION_1)

  await createInfAppellation(InfAppellationMock.VALUE_VERSION_1)
  await createInfAppellation(InfAppellationMock.VALUE_VERSION_2)

  await createInfStatement(InfStatementMock.DEFINITION_1_HAS_VALUE_VERSION_1)
  const hasValueVersion1 = await createInfStatement(InfStatementMock.DEFINITION_1_HAS_VALUE_VERSION_2)


  // add info to sandbox
  await addInfosToProject(project1.pk_entity, [
    definition1,
    hasValueVersion1,
  ]
    .map(x => x.pk_entity));



  /****************************************************************************
  * Cleanup
  ***************************************************************************/
  await setSequencesToMax()
}

