/* eslint-disable @typescript-eslint/camelcase */
import { DatColumn } from '../../../../models';
import { DatDigitalMock } from './DatDigitalMock';
import { DatNamespaceMock } from './DatNamespaceMock';
import { SysSystemTypeMock } from './SysSystemTypeMock';

/**
 * pk_entity prefix: 300
 */
export class DatColumnMock {
    static readonly COL_NAMES = new DatColumn({
        pk_entity: 3000,
        fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
        fk_column_content_type: SysSystemTypeMock.TEXT.pk_entity,
        fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
        fk_data_type: 3292, //string
        is_imported: false,
        fk_column_relationship_type: 3367
    })

    static readonly COL_DATES = new DatColumn({
        pk_entity: 3001,
        fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
        fk_column_content_type: SysSystemTypeMock.NUMBER.pk_entity,
        fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
        fk_data_type: 3293, //string
        is_imported: false,
        fk_column_relationship_type: 3367
    })

    static readonly COL_RND1 = new DatColumn({
        pk_entity: 3002,
        fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
        fk_column_content_type: SysSystemTypeMock.NUMBER.pk_entity,
        fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
        fk_data_type: 3293, //string
    })

    static readonly COL_RND2 = new DatColumn({
        pk_entity: 3003,
        fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
        fk_column_content_type: SysSystemTypeMock.NUMBER.pk_entity,
        fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
        fk_data_type: 3293, //string
    })


}
