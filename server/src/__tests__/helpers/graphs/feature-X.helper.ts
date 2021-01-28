/* eslint-disable @typescript-eslint/camelcase */
import { createDatChunk } from '../atomic/dat-chunk.helper';
import { createDatClassColumnMapping } from '../atomic/dat-class-mapping.helper';
import { createDatColumn } from '../atomic/dat-column.helper';
import { createDatDigital } from '../atomic/dat-digital.helper';
import { createDatFactoidMapping, createDatFactoidPropertyMapping } from '../atomic/dat-factoid.helper';
import { createDatTextProperty } from '../atomic/dat-text-property.helper';
import { createInfStatement } from '../atomic/inf-statement.helper';
import { addProfilesToProject } from '../atomic/pro-dfh-profile-proj-rel.helper';
import { addInfosToProject } from '../atomic/pro-info-proj-rel.helper';
import { linkAccountProject } from '../atomic/pub-account_project_rel.helper';
import { createCellTable_old, createTabCell } from '../atomic/tab-cell-X.helper';
import { createTabRow } from '../atomic/tab-row.helper';
import { DatChunkMock } from '../data/gvDB/DatChunkMock';
import { DatClassColumnMappingMock } from '../data/gvDB/DatClassColumnMappingMock';
import { DatColumnMock } from '../data/gvDB/DatColumnMock';
import { DatDigitalMock } from '../data/gvDB/DatDigitalMock';
import { DatFactoidMappingMock } from '../data/gvDB/DatFactoidMappingMock';
import { DatFactoidPropertyMappingMock } from '../data/gvDB/DatFactoidPropertyMappingMock';
import { DatTextPropertyMock } from '../data/gvDB/DatTextPropertyMock';
import { InfStatementMock } from '../data/gvDB/InfStatementMock';
import { ProProjectMock } from '../data/gvDB/ProProjectMock';
import { PubAccountMock } from '../data/gvDB/PubAccountMock';
import { TabCellXMock } from '../data/gvDB/TabCellXMock';
import { TabRowMock } from '../data/gvDB/TabRowMock';
import { createModel } from '../meta/model.helper';
import { createGaetanMuck } from './account.helper';
import { createBunchOfPersons } from './person.helper';
import { createSandBoxProject } from './project.helper';
import { createBunchOfSources } from './source.helper';


export async function forFeatureX() {

    const { profiles } = await createModel()

    //create account, namespace and project
    await createSandBoxProject();
    await createGaetanMuck();
    await linkAccountProject(PubAccountMock.GAETAN_VERIFIED, ProProjectMock.SANDBOX_PROJECT);

    // add profiles to project
    await addProfilesToProject(ProProjectMock.SANDBOX_PROJECT.pk_entity, profiles.map(p => p.dfh_pk_profile))

    //create the digital and related (mapping)
    await createDatDigital(DatDigitalMock.DIGITAL_BIRTHDATES);
    await createDatColumn(DatColumnMock.COL_NAMES);
    await createDatColumn(DatColumnMock.COL_BIRTHDATES);
    await createDatTextProperty(DatTextPropertyMock.NAME);
    await createDatTextProperty(DatTextPropertyMock.BIRTHDATE);
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
    await createTabCell(TabCellXMock.FEATURE_X_UNIONS_PIERRE, rowUNIONSPIERRE);
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

}


export async function createTextAndAnnotation() {
    await createDatDigital(DatDigitalMock.DIGITAL_TEXT_RODOLF_FOO)
    await createDatChunk(DatChunkMock.RUDOLF)

    const infStmtIsRepro = await createInfStatement(InfStatementMock.DIGITAL_TEXT_IS_REPRO_OF_HABS_EMP)
    const infStmtRefersTo = await createInfStatement(InfStatementMock.CHUNK_RUDOLF_REFERS_TO_RUDOLF)
    const infStmtMentions = await createInfStatement(InfStatementMock.HABS_EMP_EXPR_MENTIONS_RUDOLF)


    return {
        stmts: [infStmtIsRepro, infStmtRefersTo, infStmtMentions]
    }
}
