import {createDatClassColumnMapping} from '../atomic/dat-class-mapping.helper';
import {createDatColumn} from '../atomic/dat-column.helper';
import {createDatDigital} from '../atomic/dat-digital.helper';
import {createDatNamespace} from '../atomic/dat-namespace.helper';
import {createDatTextProperty} from '../atomic/dat-text-property.helper';
import {createProProject} from '../atomic/pro-project.helper';
import {createPubAccount} from '../atomic/pub-account.helper';
import {linkAccountProject} from '../atomic/pub-account_project_rel.helper';
import {createCellTable, createTabCell} from '../atomic/tab-cell-X.helper';
import {createTabRow} from '../atomic/tab-row.helper';
import {cleanDb} from '../cleaning/clean-db.helper';
import {DatClassColumnMappingMock} from '../data/gvDB/DatClassColumnMappingMock';
import {DatColumnMock} from '../data/gvDB/DatColumnMock';
import {DatDigitalMock} from '../data/gvDB/DatDigitalMock';
import {DatNamespaceMock} from '../data/gvDB/DatNamespaceMock';
import {DatTextPropertyMock} from '../data/gvDB/DatTextPropertyMock';
import {ProProjectMock} from '../data/gvDB/ProProjectMock';
import {PubAccountMock} from '../data/gvDB/PubAccountMock';
import {TabCellXMock} from '../data/gvDB/TabCellXMock';
import {TabRowMock} from '../data/gvDB/TabRowMock';
import {createAlbertAndRudolf} from './create-albert-and-rudolf.helper';

export async function forFeatureX() {
    await cleanDb();

    //create account, namespace and project
    await createProProject(ProProjectMock.PROJECT_2); //english
    await createDatNamespace(DatNamespaceMock.NAMESPACE_2);
    await createPubAccount(PubAccountMock.GAETAN_VERIFIED);
    await linkAccountProject(PubAccountMock.GAETAN_VERIFIED, ProProjectMock.PROJECT_2);

    //create the data
    await createAlbertAndRudolf()

    //create the digital and related
    await createDatDigital(DatDigitalMock.DIGITAL_BIRTHDATES);
    await createDatColumn(DatColumnMock.COL_NAMES);
    await createDatColumn(DatColumnMock.COL_DATES);
    await createDatTextProperty(DatTextPropertyMock.NAME);
    await createDatTextProperty(DatTextPropertyMock.BIRTHDATE);
    await createTabRow(TabRowMock.ROW_ALBERT);
    await createTabRow(TabRowMock.ROW_RUDOLF);
    await createCellTable(DatDigitalMock.DIGITAL_BIRTHDATES);
    await createTabCell(TabCellXMock.FEATURE_X_1_1);
    await createTabCell(TabCellXMock.FEATURE_X_1_2);
    await createTabCell(TabCellXMock.FEATURE_X_2_1);
    await createTabCell(TabCellXMock.FEATURE_X_2_2);

    //create the mapping of columns
    await createDatClassColumnMapping(DatClassColumnMappingMock.MAPPING_COL_NAME_TO_CLASS_PERSON);

    //create the real mapping
}
