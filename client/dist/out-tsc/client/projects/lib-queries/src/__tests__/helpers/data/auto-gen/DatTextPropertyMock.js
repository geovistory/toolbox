import { DatColumnMock } from './DatColumnMock';
import { DatNamespaceMock } from './DatNamespaceMock';
import { InfLanguageMock } from './InfLanguageMock';
import { SysSystemTypeMock } from './SysSystemTypeMock';
/**
 * pk_entity prefix: 500
 */
export class DatTextPropertyMock {
}
DatTextPropertyMock.NAME = ({
    pk_entity: 5000,
    string: 'Name',
    fk_language: InfLanguageMock.ENGLISH.pk_entity,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_system_type: SysSystemTypeMock.LABEL_OF_DATA_RECORD.pk_entity,
    fk_entity: DatColumnMock.COL_NAMES.pk_entity
});
DatTextPropertyMock.BIRTHDATE = ({
    pk_entity: 5001,
    string: 'Birthdate',
    fk_language: InfLanguageMock.ENGLISH.pk_entity,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_system_type: SysSystemTypeMock.LABEL_OF_DATA_RECORD.pk_entity,
    fk_entity: DatColumnMock.COL_BIRTHDATES.pk_entity
});
DatTextPropertyMock.RND1 = ({
    pk_entity: 5002,
    string: 'Random col 1 - string',
    fk_language: InfLanguageMock.ENGLISH.pk_entity,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_system_type: SysSystemTypeMock.LABEL_OF_DATA_RECORD.pk_entity,
    fk_entity: DatColumnMock.COL_RND1.pk_entity
});
DatTextPropertyMock.RND2 = ({
    pk_entity: 5003,
    string: 'Random col 1 - number',
    fk_language: InfLanguageMock.ENGLISH.pk_entity,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_system_type: SysSystemTypeMock.LABEL_OF_DATA_RECORD.pk_entity,
    fk_entity: DatColumnMock.COL_RND2.pk_entity
});
DatTextPropertyMock.PEOPLE = ({
    pk_entity: 5004,
    string: 'Peoples',
    fk_language: InfLanguageMock.ENGLISH.pk_entity,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_system_type: SysSystemTypeMock.LABEL_OF_DATA_RECORD.pk_entity,
    fk_entity: DatColumnMock.COL_PEOPLE.pk_entity
});
DatTextPropertyMock.UNION = ({
    pk_entity: 5005,
    string: 'Union',
    fk_language: InfLanguageMock.ENGLISH.pk_entity,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_system_type: SysSystemTypeMock.LABEL_OF_DATA_RECORD.pk_entity,
    fk_entity: DatColumnMock.COL_UNION.pk_entity
});
DatTextPropertyMock.BIRTH2 = ({
    pk_entity: 5006,
    string: 'Birth date',
    fk_language: InfLanguageMock.ENGLISH.pk_entity,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_system_type: SysSystemTypeMock.LABEL_OF_DATA_RECORD.pk_entity,
    fk_entity: DatColumnMock.COL_BIRTHDATES2.pk_entity
});
//# sourceMappingURL=DatTextPropertyMock.js.map