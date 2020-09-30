import { init } from '../graphs/init.helper';
import { createDatClassColumnMapping } from '../atomic/dat-class-mapping.helper';
import { createDatColumn } from '../atomic/dat-column.helper';
import { createDatDigital } from '../atomic/dat-digital.helper';
import { createDatTextProperty } from '../atomic/dat-text-property.helper';
import { createInfStatement } from '../atomic/inf-statement.helper';
import { linkAccountProject } from '../atomic/pub-account_project_rel.helper';
import { createCellTable, createTabCell } from '../atomic/tab-cell-X.helper';
import { createTabRow } from '../atomic/tab-row.helper';
import { DatClassColumnMappingMock } from '../data/gvDB/DatClassColumnMappingMock';
import { DatColumnMock } from '../data/gvDB/DatColumnMock';
import { DatDigitalMock } from '../data/gvDB/DatDigitalMock';
import { DatTextPropertyMock } from '../data/gvDB/DatTextPropertyMock';
import { InfStatementMock } from '../data/gvDB/InfStatementMock';
import { ProProjectMock } from '../data/gvDB/ProProjectMock';
import { PubAccountMock } from '../data/gvDB/PubAccountMock';
import { TabCellXMock } from '../data/gvDB/TabCellXMock';
import { TabRowMock } from '../data/gvDB/TabRowMock';
import { createGaetanMuck } from './account.helper';
import { createAlbertAndRudolfInSandBoxProject } from './create-albert-and-rudolf.helper';
import { createSandBoxProject } from './project.helpers';

export async function forFeatureX() {
    await init();

    //create account, namespace and project
    await createSandBoxProject();
    await createGaetanMuck();
    await linkAccountProject(PubAccountMock.GAETAN_VERIFIED, ProProjectMock.SANDBOX_PROJECT);

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
