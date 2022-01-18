import {genSalt, hash} from 'bcrypt';
import {InfAppellation, InfResource, InfStatement} from '../../../models';
import {QuillDoc} from '../../../models/quill-doc/quill-doc.model';
import {QuillOperation} from '../../../models/quill-doc/quill-operation.model';
import {PubCredentialRepository} from '../../../repositories/pub-credential.repository';
import {createDatClassColumnMapping} from '../atomic/dat-class-mapping.helper';
import {createDatColumn} from '../atomic/dat-column.helper';
import {createDatDigital} from '../atomic/dat-digital.helper';
import {createDatNamespace} from '../atomic/dat-namespace.helper';
import {createDatTextProperty} from '../atomic/dat-text-property.helper';
import {createInfAppellation} from '../atomic/inf-appellation.helper';
import {createInfLanguage} from '../atomic/inf-language.helper';
import {createInfResource} from '../atomic/inf-resource.helper';
import {createInfStatement} from '../atomic/inf-statement.helper';
import {addProDfhClassToProject} from '../atomic/pro-dfh-class-proj-rel.helper';
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
import {createCellTable_old, createTabCell} from '../atomic/tab-cell-X.helper';
import {createRowTable, createTabRow} from '../atomic/tab-row.helper';
import {createWarEntityPreview} from '../atomic/war-entity-preview.helper';
import {setSequencesToMax} from '../atomic/_sequences.helper';
import {DatClassColumnMappingMock} from '../data/gvDB/DatClassColumnMappingMock';
import {DatColumnMock} from '../data/gvDB/DatColumnMock';
import {DatDigitalMock} from '../data/gvDB/DatDigitalMock';
import {DatNamespaceMock} from '../data/gvDB/DatNamespaceMock';
import {DatTextPropertyMock} from '../data/gvDB/DatTextPropertyMock';
import {DfhApiClassMock} from '../data/gvDB/DfhApiClassMock';
import {DfhApiPropertyMock} from '../data/gvDB/DfhApiPropertyMock';
import {InfAppellationMock} from '../data/gvDB/InfAppellationMock';
import {InfLanguageMock} from '../data/gvDB/InfLanguageMock';
import {InfResourceMock} from '../data/gvDB/InfResourceMock';
import {InfStatementMock} from '../data/gvDB/InfStatementMock';
import {OmitEntity} from '../data/gvDB/local-model.helpers';
import {ProProjectMock} from '../data/gvDB/ProProjectMock';
import {ProTextPropertyMock} from '../data/gvDB/ProTextPropertyMock';
import {PubAccountMock} from '../data/gvDB/PubAccountMock';
import {PubCredentialMock} from '../data/gvDB/PubCredentialMock';
import {PubRoleMappingMock} from '../data/gvDB/PubRolemappingMock';
import {PubRoleMock} from '../data/gvDB/PubRoleMock';
import {SysConfigValueMock} from '../data/gvDB/SysConfigValueMock';
import {SysSystemRelevantClassMock} from '../data/gvDB/SysSystemRelevantClass';
import {SysSystemTypeMock} from '../data/gvDB/SysSystemTypeMock';
import {TabCellXMock} from '../data/gvDB/TabCellXMock';
import {TabRowMock} from '../data/gvDB/TabRowMock';
import {WarEntityPreviewMock} from '../data/gvDB/WarEntityPreviewMock';
import {PROFILE_12_BIOGRAPHICAL_BA_2021_06_30} from '../data/ontome-profiles/profile-12-biographical-ba-2021-06-30';
import {PROFILE_5_GEOVISTORY_BASI_2021_08_24} from '../data/ontome-profiles/profile-5-geovistory-basi-2021-08-24';
import {PROFILE_99_DIGITALS} from '../data/ontome-profiles/profile-99-digitals';
import {createOntomeProfileMock} from '../generic/ontomeprofile.helper';
import {testdb} from '../testdb';
import {createBunchOfPersons} from './person.helper';

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
  const profileBiography = await createOntomeProfileMock(PROFILE_12_BIOGRAPHICAL_BA_2021_06_30)
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
  * Project
  ***************************************************************************/

  // Project
  const project1 = await createProProject(ProProjectMock.PROJECT_1);

  // Project > Name
  await createProTextProperty(ProTextPropertyMock.PROJECT_1_NAME);

  // Project > Profiles
  await addProfileToProject(profileGeovBasics.profile.dfh_pk_profile, project1.pk_entity)
  await addProfileToProject(profileDigitals.profile.dfh_pk_profile, project1.pk_entity)
  await addProfileToProject(profileBiography.profile.dfh_pk_profile, project1.pk_entity)

  // Project > Classes
  await addProDfhClassToProject(DfhApiClassMock.EN_21_PERSON.dfh_pk_class, project1.pk_entity)

  // Project > Namespace
  await createDatNamespace(DatNamespaceMock.NAMESPACE_1);


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
  await createInfStatement(InfStatementMock.DEFINITION_1_HAS_VALUE_VERSION_2)

  const {entities, statements, appellations} = createTextVersionWithAnnotations(definition1.pk_entity ?? -1)


  for (const e of entities) {
    await createInfResource(e)
  }
  for (const s of statements) {
    await createInfStatement(s)
  }
  for (const a of appellations) {
    await createInfAppellation(a)
  }

  const {peits, stmts, teens} = await createBunchOfPersons()

  const t = await createTextAndAnnotation()

  const ta = await createTableAndAnnotation()

  // add info to sandbox
  await addInfosToProject(
    project1.pk_entity,
    [
      definition1,
      ...entities,
      ...statements,
      ...peits,
      ...stmts,
      ...teens,
      ...t.resources,
      ...t.stmts,
      ...ta.resources,
      ...ta.stmts
    ].map(x => x.pk_entity)
  );



  /****************************************************************************
  * Cleanup
  ***************************************************************************/
  await setSequencesToMax()
}

function createTextVersionWithAnnotations(pkText: number) {
  let pkEntity = 90000
  const entities: OmitEntity<InfResource>[] = []
  const statements: OmitEntity<InfStatement>[] = []
  const appellations: OmitEntity<InfAppellation>[] = []


  // the quill-doc
  const quillDoc: QuillDoc = {latestId: 1, ops: []}

  // the text version
  const textVersion: OmitEntity<InfAppellation> = {
    pk_entity: pkEntity++,
    fk_class: DfhApiClassMock.EN_339_STRING.dfh_pk_class,
    quill_doc: quillDoc,
  }
  appellations.push(textVersion)

  // the has value version statement
  const hasValueVersion: OmitEntity<InfStatement> = ({
    pk_entity: pkEntity++,
    fk_subject_info: pkText,
    fk_property: DfhApiPropertyMock.EN_99001_DEFINITION_HAS_VALUE_VERSION.dfh_pk_property,
    fk_object_info: textVersion.pk_entity ?? -1,
  })
  statements.push(hasValueVersion)

  const words = ['Peter', 'Anna', 'Hans', 'Doris', 'Lena', 'Marie', 'Jack', 'Susan']
  for (let i = 0; i < 30; i++) {

    // iterate over words
    for (const word of words) {

      const chunkOps: QuillOperation[] = []
      // iterate over characters of word
      for (const char of word) {
        quillDoc.latestId++;
        const op: QuillOperation = {
          insert: char,
          attributes: {
            charid: quillDoc.latestId.toString()
          }
        }
        // add character to the chunk of that word
        chunkOps.push(op)
        // add characters to the text version (the long text)
        quillDoc.ops.push(op)
      }

      // create InfAppellation Chunk
      const chunk: OmitEntity<InfAppellation> = {
        pk_entity: pkEntity++,
        fk_class: DfhApiClassMock.EN_456_CHUNK.dfh_pk_class,
        quill_doc: {
          latestId: quillDoc.latestId,
          ops: chunkOps
        }
      }
      appellations.push(chunk)

      // create the Annotation
      const annotation: OmitEntity<InfResource> = {
        pk_entity: pkEntity++,
        fk_class: DfhApiClassMock.EN_9902_TEXT_ANNOTATION.dfh_pk_class,
        community_visibility: {dataApi: true, website: true, toolbox: true},
      }
      entities.push(annotation)
      // create the statement of the Annotation to the text
      const isAnnotationOf: OmitEntity<InfStatement> = {
        pk_entity: pkEntity++,
        fk_subject_info: annotation.pk_entity ?? -1,
        fk_property: DfhApiPropertyMock.EN_99004_TEXT_ANNOTATION_IS_ANNOTATION_IN.dfh_pk_property,
        fk_object_info: pkText ?? -1
      }
      statements.push(isAnnotationOf)
      // create the statement of the Annotation to the chunk
      const stmtHasSpot: OmitEntity<InfStatement> = {
        pk_entity: pkEntity++,
        fk_subject_info: annotation.pk_entity ?? -1,
        fk_property: DfhApiPropertyMock.EN_99005_TEXT_ANNOTATION_HAS_SPOT.dfh_pk_property,
        fk_object_info: chunk.pk_entity ?? -1
      }
      statements.push(stmtHasSpot)


      // add a space to the text
      quillDoc.latestId++;
      const op: QuillOperation = {
        insert: ' ',
        attributes: {
          charid: quillDoc.latestId.toString()
        }
      }
      quillDoc.ops.push(op)
    }

  }


  return {entities, statements, appellations}

}



async function createTextAndAnnotation() {

  const s = []
  const r = []
  r.push(await createInfResource(InfResourceMock.TRANSCRIPTION_RODOLF_FOO))
  await createInfAppellation(InfAppellationMock.TEXT_VALUE_RODOLF_FOO_V1)

  s.push(await createInfStatement(InfStatementMock.TRANSCRIPTION_RODOLF_HAS_VALUE_VERSION))
  s.push(await createInfStatement(InfStatementMock.TRANSCRIPTION_IS_REPRO_OF_HABS_EMP))

  // r.push(await createInfResource(InfResourceMock.HABS_EMP_EXPR))
  // r.push(await createInfResource(InfResourceMock.HABS_EMP_MANIF_PROD_TYPE))
  s.push(await createInfStatement(InfStatementMock.HABS_EMP_CARRIERS_PROVIDED_BY))

  r.push(await createInfResource(InfResourceMock.ANNOTATION_RUDOLF))
  s.push(await createInfStatement(InfStatementMock.ANNOTATION_RUDOLF_HAS_SPOT))
  s.push(await createInfStatement(InfStatementMock.ANNOTATION_RUDOLF_IS_ANNOTATED_IN))
  s.push(await createInfStatement(InfStatementMock.ANNOTATION_RUDOLF_REFERS_TO_RUDOLF))
  await createInfAppellation(InfAppellationMock.CHUNK_RUDOLF)
  // r.push(await createInfResource(InfResourceMock.RUDOLF))


  s.push(await createInfStatement(InfStatementMock.HABS_EMP_EXPR_MENTIONS_RUDOLF))

  return {
    stmts: s,
    resources: r
  }
}



async function createTableAndAnnotation() {

  const s = []
  const r = []
  r.push(await createInfResource(InfResourceMock.TABLE_1))
  await createDatDigital(DatDigitalMock.DIGITAL_UNIONS);
  // statement from table entity to table value
  s.push(await createInfStatement(InfStatementMock.TABLE_1_HAS_VALUE_TABLE_UNOIN))

  //create the digital and related (multiple lines)
  await createDatColumn(DatColumnMock.COL_PEOPLE);
  await createDatColumn(DatColumnMock.COL_UNION);
  await createDatColumn(DatColumnMock.COL_BIRTHDATES2);
  await createDatTextProperty(DatTextPropertyMock.PEOPLE);
  await createDatTextProperty(DatTextPropertyMock.UNION);
  await createDatTextProperty(DatTextPropertyMock.BIRTH2);
  await createRowTable(DatDigitalMock.DIGITAL_UNIONS.pk_entity as number);
  const rowUNIONSALBERT = await createTabRow(TabRowMock.ROW_UNIONS_ALBERT);
  const rowUNIONSRUDOLPH = await createTabRow(TabRowMock.ROW_UNIONS_RUDOLPH);
  const rowUNIONSJEAN = await createTabRow(TabRowMock.ROW_UNIONS_JEAN);
  const rowUNIONSHANS = await createTabRow(TabRowMock.ROW_UNIONS_HANS);
  const rowUNIONSPIERRE = await createTabRow(TabRowMock.ROW_UNIONS_PIERRE);
  const rowUNIONSANGELA = await createTabRow(TabRowMock.ROW_UNIONS_ANGELA);
  await createCellTable_old(DatDigitalMock.DIGITAL_UNIONS);
  await createTabCell(TabCellXMock.FEATURE_X_UNIONS_ALBERT, rowUNIONSALBERT);
  await createTabCell(TabCellXMock.FEATURE_X_UNIONS_ALBERT_UNION, rowUNIONSALBERT);
  await createTabCell(TabCellXMock.FEATURE_X_UNIONS_ALBERT_BIRTH, rowUNIONSALBERT);
  await createTabCell(TabCellXMock.FEATURE_X_UNIONS_RUDOLPH, rowUNIONSRUDOLPH);
  await createTabCell(TabCellXMock.FEATURE_X_UNIONS_RUDOLPH_UNION, rowUNIONSRUDOLPH);
  await createTabCell(TabCellXMock.FEATURE_X_UNIONS_RUDOLPH_BIRTH, rowUNIONSALBERT);
  await createTabCell(TabCellXMock.FEATURE_X_UNIONS_JEAN, rowUNIONSJEAN);
  await createTabCell(TabCellXMock.FEATURE_X_UNIONS_JEAN_UNION, rowUNIONSJEAN);
  await createTabCell(TabCellXMock.FEATURE_X_UNIONS_JEAN_BIRTH, rowUNIONSALBERT);
  await createTabCell(TabCellXMock.FEATURE_X_UNIONS_HANS, rowUNIONSHANS);
  await createTabCell(TabCellXMock.FEATURE_X_UNIONS_HANS_UNION, rowUNIONSHANS);
  await createTabCell(TabCellXMock.FEATURE_X_UNIONS_HANS_BIRTH, rowUNIONSHANS);
  // await createTabCell(TabCellXMock.FEATURE_X_UNIONS_PIERRE, rowUNIONSPIERRE);
  await createTabCell(TabCellXMock.FEATURE_X_UNIONS_PIERRE_UNION, rowUNIONSPIERRE);
  await createTabCell(TabCellXMock.FEATURE_X_UNIONS_PIERRE_BIRTH, rowUNIONSPIERRE);
  await createTabCell(TabCellXMock.FEATURE_X_UNIONS_ANGELA, rowUNIONSANGELA);
  await createTabCell(TabCellXMock.FEATURE_X_UNIONS_ANGELA_UNION, rowUNIONSANGELA);
  await createTabCell(TabCellXMock.FEATURE_X_UNIONS_ANGELA_BIRTH, rowUNIONSANGELA);
  // //create the related mapping
  await createDatClassColumnMapping(DatClassColumnMappingMock.MAPPING_COL_PEOPLE_TO_CLASS_PERSON);
  await createDatClassColumnMapping(DatClassColumnMappingMock.MAPPING_COL_UNION_TO_CLASS_PERSON);

  // Annotation of a cell
  r.push(await createInfResource(InfResourceMock.ANNOTATION_ANGELA))
  s.push(await createInfStatement(InfStatementMock.ANNOTATION_ANGELA_HAS_SPOT))
  s.push(await createInfStatement(InfStatementMock.ANNOTATION_ANGELA_IS_ANNOTATED_IN))
  s.push(await createInfStatement(InfStatementMock.ANNOTATION_ANGELA_REFERS_TO_ANGELA))



  return {
    stmts: s,
    resources: r
  }
}
