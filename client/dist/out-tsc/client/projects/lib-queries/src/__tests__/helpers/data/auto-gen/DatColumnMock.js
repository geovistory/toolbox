import { DatDigitalMock } from './DatDigitalMock';
import { DatNamespaceMock } from './DatNamespaceMock';
import { SysSystemTypeMock } from './SysSystemTypeMock';
/**
 * pk_entity prefix: 300
 */
export class DatColumnMock {
}
DatColumnMock.COL_NAMES = ({
    pk_entity: 3000,
    fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
    fk_column_content_type: SysSystemTypeMock.TEXT.pk_entity,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_data_type: 3292,
    is_imported: false,
    fk_column_relationship_type: 3367
});
DatColumnMock.COL_BIRTHDATES = ({
    pk_entity: 3001,
    fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
    fk_column_content_type: SysSystemTypeMock.NUMBER.pk_entity,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_data_type: 3293,
    is_imported: false,
    fk_column_relationship_type: 3367
});
DatColumnMock.COL_RND1 = ({
    pk_entity: 3002,
    fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
    fk_column_content_type: SysSystemTypeMock.NUMBER.pk_entity,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_data_type: 3293,
});
DatColumnMock.COL_RND2 = ({
    pk_entity: 3003,
    fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
    fk_column_content_type: SysSystemTypeMock.NUMBER.pk_entity,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_data_type: 3293,
});
DatColumnMock.COL_PEOPLE = ({
    pk_entity: 3004,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_column_content_type: SysSystemTypeMock.NUMBER.pk_entity,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_data_type: 3293,
});
DatColumnMock.COL_UNION = ({
    pk_entity: 3005,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_column_content_type: SysSystemTypeMock.NUMBER.pk_entity,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_data_type: 3293,
});
DatColumnMock.COL_BIRTHDATES2 = ({
    pk_entity: 3006,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_column_content_type: SysSystemTypeMock.NUMBER.pk_entity,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_data_type: 3293,
    is_imported: false,
    fk_column_relationship_type: 3367
});
//# sourceMappingURL=DatColumnMock.js.map