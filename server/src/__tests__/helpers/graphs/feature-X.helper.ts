import {createDatClassColumnMapping} from '../atomic/dat-class-mapping.helper';
import {createDatColumn} from '../atomic/dat-column.helper';
import {createDatDigital} from '../atomic/dat-digital.helper';
import {createDatTextProperty} from '../atomic/dat-text-property.helper';
import {createDfhApiClass} from '../atomic/dfh-api-class.helper';
import {createDfhApiProfile} from '../atomic/dfh-api-profile.helper';
import {createDfhApiProperty} from '../atomic/dfh-api-property.helper';
import {createInfStatement} from '../atomic/inf-statement.helper';
import {addProfilesToProject} from '../atomic/pro-dfh-profile-proj-rel.helper';
import {linkAccountProject} from '../atomic/pub-account_project_rel.helper';
import {createTypes} from '../atomic/sys-system-type.helper';
import {createCellTable, createTabCell} from '../atomic/tab-cell-X.helper';
import {createTabRow} from '../atomic/tab-row.helper';
import {DatClassColumnMappingMock} from '../data/gvDB/DatClassColumnMappingMock';
import {DatColumnMock} from '../data/gvDB/DatColumnMock';
import {DatDigitalMock} from '../data/gvDB/DatDigitalMock';
import {DatTextPropertyMock} from '../data/gvDB/DatTextPropertyMock';
import {DfhApiClassMock} from '../data/gvDB/DfhApiClassMock';
import {DfhApiProfileMock} from '../data/gvDB/DfhApiProfileMock';
import {DfhApiPropertyMock} from '../data/gvDB/DfhApiPropertyMock';
import {InfStatementMock} from '../data/gvDB/InfStatementMock';
import {ProProjectMock} from '../data/gvDB/ProProjectMock';
import {PubAccountMock} from '../data/gvDB/PubAccountMock';
import {TabCellXMock} from '../data/gvDB/TabCellXMock';
import {TabRowMock} from '../data/gvDB/TabRowMock';
import {createGaetanMuck} from './account.helper';
import {createAlbertAndRudolfInSandBoxProject} from './create-albert-and-rudolf.helper';
import {createSandBoxProject} from './project.helpers';

export async function forFeatureX() {
    await createTypes();

    //create account, namespace and project
    await createSandBoxProject();
    await createGaetanMuck();
    await linkAccountProject(PubAccountMock.GAETAN_VERIFIED, ProProjectMock.SANDBOX_PROJECT);

    //create the model
    const {profiles} = await createModel()

    // add profiles to project
    await addProfilesToProject(ProProjectMock.SANDBOX_PROJECT.pk_entity, profiles.map(p => p.dfh_pk_profile))

    //create the data
    await createAlbertAndRudolfInSandBoxProject()

    //create the digital and related
    await createDatDigital(DatDigitalMock.DIGITAL_BIRTHDATES);
    await createDatColumn(DatColumnMock.COL_NAMES);
    await createDatColumn(DatColumnMock.COL_DATES);
    await createDatTextProperty(DatTextPropertyMock.NAME);
    await createDatTextProperty(DatTextPropertyMock.BIRTHDATE);
    const row1 = await createTabRow(TabRowMock.ROW_ALBERT);
    const row2 = await createTabRow(TabRowMock.ROW_RUDOLF);


    await createCellTable(DatDigitalMock.DIGITAL_BIRTHDATES);
    await createTabCell(TabCellXMock.FEATURE_X_1_1, row1);
    await createTabCell(TabCellXMock.FEATURE_X_1_2, row1);
    await createTabCell(TabCellXMock.FEATURE_X_2_1, row2);
    await createTabCell(TabCellXMock.FEATURE_X_2_2, row2);

    //create the mapping
    await createDatClassColumnMapping(DatClassColumnMappingMock.MAPPING_COL_NAME_TO_CLASS_PERSON);
    await createInfStatement(InfStatementMock.CELL_RUDOLF_NAME_REFERS8_TO_RUDOLF);
}

// TODO X put in right place


async function createModel() {
    const profiles = await createApiProfiles()
    const classes = await createApiClasses()
    const properties = await createApiProperties()
    return {profiles, classes, properties}
}



async function createApiProfiles() {
    return Promise.all(
        [
            await createDfhApiProfile(DfhApiProfileMock.GEOVISTORY_BASIC),
            await createDfhApiProfile(DfhApiProfileMock.MARITIME_HISTORY),
            await createDfhApiProfile(DfhApiProfileMock.BIOGRAPHY_AND_FAMILY),
            await createDfhApiProfile(DfhApiProfileMock.GEOVISTORY_GENERIC_HIST)
        ]);
}


async function createApiClasses() {
    return Promise.all([
        await createDfhApiClass(DfhApiClassMock.EN_365_NAMING),
        await createDfhApiClass(DfhApiClassMock.EN_21_PERSON)
    ])
}
async function createApiProperties() {
    return Promise.all([
        await createDfhApiProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF),
        await createDfhApiProperty(DfhApiPropertyMock.EN_1113_REFERS_TO_NAME)
    ])
}
