/* eslint-disable @typescript-eslint/naming-convention */
import {CalendarType} from '../../../models/enums/CalendarType';
import {Granularity} from '../../../models/enums/Granularity';
import {createDatClassColumnMapping} from '../atomic/dat-class-mapping.helper';
import {createDatColumn} from '../atomic/dat-column.helper';
import {createDatDigital} from '../atomic/dat-digital.helper';
import {createDatFactoidMapping, createDatFactoidPropertyMapping} from '../atomic/dat-factoid.helper';
import {createDatTextProperty} from '../atomic/dat-text-property.helper';
import {createInfAppellation} from '../atomic/inf-appellation.helper';
import {createInfDimension} from '../atomic/inf-dimension.helper';
import {createInfLangString} from '../atomic/inf-lang-string.helper';
import {createInfPlace} from '../atomic/inf-place.helper';
import {createInfResource} from '../atomic/inf-resource.helper';
import {createInfStatement} from '../atomic/inf-statement.helper';
import {createInfTimePrimitive} from '../atomic/inf-time-primitive.helper';
import {createProClassFieldConfig} from '../atomic/pro-class-field-config.helper';
import {addProfilesToProject} from '../atomic/pro-dfh-profile-proj-rel.helper';
import {addInfosToProject} from '../atomic/pro-info-proj-rel.helper';
import {createProProject} from '../atomic/pro-project.helper';
import {linkAccountProject} from '../atomic/pub-account_project_rel.helper';
import {createSysSystemConfig} from '../atomic/sys-system-config.helper';
import {createCellTable_old, createTabCell} from '../atomic/tab-cell-X.helper';
import {createRowTable, createTabRow} from '../atomic/tab-row.helper';
import {DatClassColumnMappingMock} from '../data/gvDB/DatClassColumnMappingMock';
import {DatColumnMock} from '../data/gvDB/DatColumnMock';
import {DatDigitalMock} from '../data/gvDB/DatDigitalMock';
import {DatFactoidMappingMock} from '../data/gvDB/DatFactoidMappingMock';
import {DatFactoidPropertyMappingMock} from '../data/gvDB/DatFactoidPropertyMappingMock';
import {DatNamespaceMock} from '../data/gvDB/DatNamespaceMock';
import {DatTextPropertyMock} from '../data/gvDB/DatTextPropertyMock';
import {DfhApiClassMock} from '../data/gvDB/DfhApiClassMock';
import {DfhApiPropertyMock} from '../data/gvDB/DfhApiPropertyMock';
import {InfAppellationMock} from '../data/gvDB/InfAppellationMock';
import {InfLanguageMock} from '../data/gvDB/InfLanguageMock';
import {InfResourceMock} from '../data/gvDB/InfResourceMock';
import {InfStatementMock} from '../data/gvDB/InfStatementMock';
import {ProClassFieldConfigMock} from '../data/gvDB/ProClassFieldConfigMock';
import {ProProjectMock} from '../data/gvDB/ProProjectMock';
import {PubAccountMock} from '../data/gvDB/PubAccountMock';
import {SysConfigValueMock} from '../data/gvDB/SysConfigValueMock';
import {TabCellXMock} from '../data/gvDB/TabCellXMock';
import {TabRowMock} from '../data/gvDB/TabRowMock';
import {PROFILE_12_BIOGRAPHICAL_BA_2022_02_09} from '../data/ontome-profiles/profile-12-biographical-ba-2022-02-09';
import {PROFILE_5_GEOVISTORY_BASI_2022_01_18} from '../data/ontome-profiles/profile-5-geovistory-basi-2022-01-18';
import {createDigital} from '../generic/digital.helper';
import {createFactoid, createFactoidMapping} from '../generic/factoid.helper';
import {createCity} from '../generic/geo-place.helper';
import {createOntomeProfileMock} from '../generic/ontomeprofile.helper';
import {createSource} from '../generic/source.helper';
import {createCell, createColumn, createColumnMapping, createRow, createTable, mapCell} from '../generic/table.helper';
import {getIndex} from '../meta/index.helper';
import {createLanguages, createTypes} from '../meta/model.helper';
import {createGaetanMuck} from './account.helper';
import {createBunchOfPersons} from './person.helper';
import {createSandBoxProject} from './project.helper';
import {createBunchOfSources} from './source.helper';


export async function forFeatureX() {

    await createTypes();
    await createLanguages();
    await createSysSystemConfig(SysConfigValueMock.SYS_CONFIC_VALID);

    //create account, namespace and project
    await createSandBoxProject();
    await createGaetanMuck();
    await linkAccountProject(PubAccountMock.GAETAN_VERIFIED, ProProjectMock.SANDBOX_PROJECT);

    /****************************************************************************
     * OntoME data
     ***************************************************************************/

    const profileGeovBasics = await createOntomeProfileMock(PROFILE_5_GEOVISTORY_BASI_2022_01_18)
    const profileBibliograp = await createOntomeProfileMock(PROFILE_12_BIOGRAPHICAL_BA_2022_02_09)
    // add profiles to project
    await addProfilesToProject(ProProjectMock.SANDBOX_PROJECT.pk_entity, [profileGeovBasics.profile.dfh_pk_profile, profileBibliograp.profile.dfh_pk_profile,])

    /****************************************************************************
    * Project Default Configuration Project
    ***************************************************************************/

    // Project Default Configuration Project
    await createProProject(ProProjectMock.DEFAULT_PROJECT);

    // Project Default Configuration Project >  Class Field Config
    await createProClassFieldConfig(ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1111_IS_APPE_OF)
    await createProClassFieldConfig(ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME)

    await linkAccountProject(PubAccountMock.GAETAN_VERIFIED, ProProjectMock.DEFAULT_PROJECT);

    //create out of project digital
    await createDatDigital(DatDigitalMock.DIGITAL_OUT);

    //create the digital and related (mapping)
    await createDatDigital(DatDigitalMock.DIGITAL_BIRTHDATES);
    await createDatColumn(DatColumnMock.COL_NAMES);
    await createDatColumn(DatColumnMock.COL_BIRTHDATES);
    await createDatTextProperty(DatTextPropertyMock.NAME);
    await createDatTextProperty(DatTextPropertyMock.BIRTHDATE);
    await createRowTable(DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity as number);
    const row1 = await createTabRow(TabRowMock.ROW_ALBERT);
    const row2 = await createTabRow(TabRowMock.ROW_RUDOLF);
    await createCellTable_old(DatDigitalMock.DIGITAL_BIRTHDATES);
    await createTabCell(TabCellXMock.FEATURE_X_1_1, row1);
    await createTabCell(TabCellXMock.FEATURE_X_1_2, row1);
    await createTabCell(TabCellXMock.FEATURE_X_2_1, row2);
    await createTabCell(TabCellXMock.FEATURE_X_2_2, row2);
    //create the related mapping
    await createDatClassColumnMapping(DatClassColumnMappingMock.MAPPING_COL_NAME_TO_CLASS_PERSON);
    await createDatClassColumnMapping(DatClassColumnMappingMock.MAPPING_COL_BIRTHDATE_TO_CLASS_TIMEPRIMITIVE);
    const statementMapping = await createInfStatement(InfStatementMock.CELL_RUDOLF_NAME_REFERS8_TO_RUDOLF);

    //create the digital and related (not mapped)
    await createDatDigital(DatDigitalMock.DIGITAL_RANDOM_TABLE);
    await createDatColumn(DatColumnMock.COL_RND1);
    await createDatColumn(DatColumnMock.COL_RND2);
    await createDatTextProperty(DatTextPropertyMock.RND1);
    await createDatTextProperty(DatTextPropertyMock.RND2);
    await createRowTable(DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity as number);
    const row3 = await createTabRow(TabRowMock.ROW_RND_VAL1);
    const row4 = await createTabRow(TabRowMock.ROW_RND_VAL2);
    await createCellTable_old(DatDigitalMock.DIGITAL_RANDOM_TABLE);
    await createTabCell(TabCellXMock.FEATURE_X_RND_1_1, row3);
    await createTabCell(TabCellXMock.FEATURE_X_RND_1_2, row3);
    await createTabCell(TabCellXMock.FEATURE_X_RND_2_1, row4);
    await createTabCell(TabCellXMock.FEATURE_X_RND_2_2, row4);

    //create the digital and related (multiple lines)
    await createDatDigital(DatDigitalMock.DIGITAL_UNIONS);
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
    const statementMapping2 = await createInfStatement(InfStatementMock.CELL_UNION_PEOPLE_RUDOLF_NAME_REFERS8_TO_RUDOLF);
    const statementMapping3 = await createInfStatement(InfStatementMock.CELL_UNION_UNION_RUDOLF_NAME_REFERS8_TO_RUDOLF);
    const statementMapping4 = await createInfStatement(InfStatementMock.CELL_UNION_PEOPLE_ANGELA_NAME_REFERS_TO_ANGELA);
    const statementMapping5 = await createInfStatement(InfStatementMock.CELL_UNION_UNION_ALBERT_NAME_REFERS_TO_RUDOLPH);
    const statementMapping6 = await createInfStatement(InfStatementMock.CELL_UNION_PEOPLE_ALBERT_NAME_REFERS_TO_RUDOLPH);

    //create the info
    const entities = await createBunchOfPersons(); //createAlbertAndRudolf();
    const source = await createBunchOfSources(); //createSourceHabsbourgEmpire();

    //create a text, a chunk and annotate rudolf
    const txtAnnot = await createTextAndAnnotation()

    // add info to project
    await addInfosToProject(ProProjectMock.SANDBOX_PROJECT.pk_entity, [
        ...entities.teens, ...entities.peits, ...entities.stmts,
        ...source.teens, ...source.peits, ...source.stmts,
        ...txtAnnot.stmts,
        ...txtAnnot.resources,
        statementMapping, statementMapping2, statementMapping3, statementMapping4, statementMapping5, statementMapping6] //
        .map(x => x.pk_entity));

    ////// FACTOIDS for habsbourg empire //////
    await createDatFactoidMapping(DatFactoidMappingMock.FactoidMapping_BIRTHDATES_BIRTH);
    await createDatFactoidPropertyMapping(DatFactoidPropertyMappingMock.FactoidPropertyMapping_BIRTH_WHEN);
    await createDatFactoidPropertyMapping(DatFactoidPropertyMappingMock.FactoidPropertyMapping_BIRTH_BROUGHT_INTO_LIFE);

    // ////// FACTOIDS for Unions //////
    await createDatFactoidMapping(DatFactoidMappingMock.FactoidMapping_UNIONS_PERSON);
    await createDatFactoidPropertyMapping(DatFactoidPropertyMappingMock.FactoidPropertyMapping_UNION_1);
    await createDatFactoidPropertyMapping(DatFactoidPropertyMappingMock.FactoidPropertyMapping_UNION_2);
    await createDatFactoidMapping(DatFactoidMappingMock.FactoidMapping_UNIONS_BIRTH);
    await createDatFactoidPropertyMapping(DatFactoidPropertyMappingMock.FactoidPropertyMapping_UNION_BIRTH_WHEN);
    await createDatFactoidPropertyMapping(DatFactoidPropertyMappingMock.FactoidPropertyMapping_UNION_BIRTH_BROUGHT_INTO_LIFE);


    // // ADD table config for DatDigitalMock.DIGITAL_UNIONS
    // const config: TableConfigCol[] = [];
    // config.push({ fkColumn: DatColumnMock.COL_PEOPLE.pk_entity as number, visible: true } as TableConfigCol);
    // config.push({ fkColumn: DatColumnMock.COL_BIRTHDATES2.pk_entity as number, visible: false } as TableConfigCol);
    // config.push({ fkColumn: DatColumnMock.COL_UNION.pk_entity as number, visible: true } as TableConfigCol);
    // await createProTableConfig(ProProjectMock.SANDBOX_PROJECT.pk_entity as number, PubAccountMock.GAETAN_VERIFIED.id, DatDigitalMock.DIGITAL_UNIONS.pk_entity as number, config);


    // VALUE OBJECT TYPE TESTS
    const projectId = ProProjectMock.SANDBOX_PROJECT.pk_entity as number;
    const pkNamespace = DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity as number;
    const VOTsource = await createSource(projectId, "VOT table");
    const digital = await createDigital(projectId, pkNamespace, VOTsource);
    const madrid = await createCity(projectId, 'Madrid');
    await createTable(digital);
    //cols
    const colAppellation = await createColumn(pkNamespace, digital, 'Appellation Col');
    const colPlace = await createColumn(pkNamespace, digital, 'Place Col');
    const colDimension = await createColumn(pkNamespace, digital, 'Dimension Col');
    const colLanguageString = await createColumn(pkNamespace, digital, 'LanguageString col');
    const colTimePrimitive = await createColumn(pkNamespace, digital, 'TimePrimitive Col');
    const colLanguage = await createColumn(pkNamespace, digital, 'Language Col');
    const colPerson = await createColumn(pkNamespace, digital, 'Person');
    const colGeoPlace = await createColumn(pkNamespace, digital, 'Geo place');
    //rows
    const rowVOT_1 = await createRow(digital);
    const rowVOT_2 = await createRow(digital);
    //cells (1st line with matchings)
    const cell_1_0 = await createCell(digital, rowVOT_1, colAppellation, 'Appellation 1');
    const cell_1_1 = await createCell(digital, rowVOT_1, colPlace, 'Place 1');
    const cell_1_2 = await createCell(digital, rowVOT_1, colDimension, 'Dimension 1');
    const cell_1_3 = await createCell(digital, rowVOT_1, colLanguageString, 'LanguageString 1');
    const cell_1_4 = await createCell(digital, rowVOT_1, colTimePrimitive, 'TimePrimitive 1');
    const cell_1_5 = await createCell(digital, rowVOT_1, colLanguage, 'Language 1');
    const cell_1_6 = await createCell(digital, rowVOT_1, colPerson, 'Albert');
    const cell_1_7 = await createCell(digital, rowVOT_1, colGeoPlace, 'Madrid');
    //cells (2nd line)
    await createCell(digital, rowVOT_2, colAppellation, 'Appellation 2');
    await createCell(digital, rowVOT_2, colPlace, 'Place 2');
    await createCell(digital, rowVOT_2, colDimension, 'Dimension 2');
    await createCell(digital, rowVOT_2, colLanguageString, 'LanguageString 2');
    await createCell(digital, rowVOT_2, colTimePrimitive, 'TimePrimitive 2');
    await createCell(digital, rowVOT_2, colLanguage, 'Language 2');
    await createCell(digital, rowVOT_2, colPerson, 'Someone');
    await createCell(digital, rowVOT_2, colGeoPlace, 'Somewhere');
    //colMappings
    await createColumnMapping(colAppellation, 40);
    await createColumnMapping(colPlace, 51);
    await createColumnMapping(colDimension, 689);
    await createColumnMapping(colLanguageString, 657);
    await createColumnMapping(colTimePrimitive, 335);
    await createColumnMapping(colLanguage, 54);
    await createColumnMapping(colPerson, 21) // person
    await createColumnMapping(colGeoPlace, 363) // geo place
    //type
    const timeUnitPEIT = await createInfResource({pk_entity: getIndex(), fk_class: DfhApiClassMock.EN_690_TIME_UNIT.dfh_pk_class});
    const timeUnitAppellation = await createInfAppellation({pk_entity: getIndex(), fk_class: 40, string: 'Time Unit label'});
    const timeUnitTeEn = await createInfResource({pk_entity: getIndex(), fk_class: 365});
    const statement_refersToName = await createInfStatement({pk_entity: getIndex(), fk_object_info: timeUnitAppellation.pk_entity, fk_property: 1113, fk_subject_info: timeUnitTeEn.pk_entity});
    const statement_isAppelForLangOf = await createInfStatement({pk_entity: getIndex(), fk_object_info: timeUnitPEIT.pk_entity, fk_property: 1111, fk_subject_info: timeUnitTeEn.pk_entity});
    const statement_usedInLang = await createInfStatement({pk_entity: getIndex(), fk_object_info: InfLanguageMock.ENGLISH.pk_entity, fk_property: 1112, fk_subject_info: timeUnitTeEn.pk_entity});
    await addInfosToProject(projectId, [timeUnitPEIT.pk_entity, statement_refersToName.pk_entity, statement_isAppelForLangOf.pk_entity, statement_usedInLang.pk_entity]);
    //Mappings
    const appellation = await createInfAppellation({pk_entity: getIndex(), fk_class: 40, string: 'An appellation'});
    const place = await createInfPlace({pk_entity: getIndex(), lat: 51.5074, long: 0.1278, fk_class: 51});
    const dimension = await createInfDimension({pk_entity: getIndex(), fk_class: 689, fk_measurement_unit: timeUnitPEIT.pk_entity, numeric_value: 4});
    const languageString = await createInfLangString({pk_entity: getIndex(), fk_class: 657, fk_language: 18605, string: 'p. 12'})
    const timePrimitive = await createInfTimePrimitive({pk_entity: getIndex(), julian_day: 2431383, duration: Granularity['1 day'], calendar: CalendarType.gregorian, fk_class: 335})
    //Matchings
    await mapCell(projectId, cell_1_0, appellation.pk_entity as number);
    await mapCell(projectId, cell_1_1, place.pk_entity as number);
    await mapCell(projectId, cell_1_2, dimension.pk_entity as number);
    await mapCell(projectId, cell_1_3, languageString.pk_entity as number);
    await mapCell(projectId, cell_1_4, timePrimitive.pk_entity as number);
    await mapCell(projectId, cell_1_5, InfLanguageMock.ENGLISH.pk_entity as number);
    await mapCell(projectId, cell_1_6, InfResourceMock.ALBERT_IV.pk_entity as number);
    await mapCell(projectId, cell_1_7, madrid as number);

    //factoids: person is identified by (1) appellation
    const factMap_birth = await createFactoidMapping(digital, DfhApiClassMock.EN_61_BIRTH.pk_entity);
    await createFactoid(factMap_birth, colPerson, DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_pk_property);
    await createFactoid(factMap_birth, colTimePrimitive, DfhApiPropertyMock.EN_152_BEGIN_OF_THE_BEGIN.dfh_pk_property);
    await createFactoid(factMap_birth, colLanguageString, DfhApiPropertyMock.EN_1761_HAS_SHORT_TITLE.dfh_pk_property);
    //factoids: geoplace was at (148) place
    const factMap_presence = await createFactoidMapping(digital, DfhApiClassMock.EN_84_PRESENCE.pk_entity);
    await createFactoid(factMap_presence, colGeoPlace, DfhApiPropertyMock.EN_147_WAS_A_PRESENCE_OF_BUILT_WORK.dfh_pk_property)
    await createFactoid(factMap_presence, colPlace, DfhApiPropertyMock.EN_148_WAS_AT.dfh_pk_property)
    //factoids: journey has duration (1613) Duration (dimension)
    const factMap_journey = await createFactoidMapping(digital, DfhApiClassMock.EN_691_ACCOUNT_OF_A_JOURNEY_OR_STAY.pk_entity);
    await createFactoid(factMap_journey, colPerson, DfhApiPropertyMock.EN_1617_CONCERNS.dfh_pk_property)
    await createFactoid(factMap_journey, colDimension, DfhApiPropertyMock.EN_1613_HAS_DURATION.dfh_pk_property)
    //factoids: Naming Used in language
    const factMap_naming = await createFactoidMapping(digital, DfhApiClassMock.EN_365_NAMING.pk_entity);
    await createFactoid(factMap_naming, colPerson, DfhApiPropertyMock.EN_1111_IS_APPE_OF.dfh_pk_property);
    await createFactoid(factMap_naming, colLanguage, DfhApiPropertyMock.EN_1112_USED_IN_LANGUAGE.dfh_pk_property);
    await createFactoid(factMap_naming, colAppellation, DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property);
}


export async function createTextAndAnnotation() {

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
