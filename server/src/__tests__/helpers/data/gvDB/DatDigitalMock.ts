import {DatDigital} from '../../../../models';
import {DatNamespaceMock} from './DatNamespaceMock';
import {SysSystemTypeMock} from './SysSystemTypeMock';

/**
 * pk_entity prefix: 200
 */
export class DatDigitalMock {
    static readonly DIGITAL_BIRTHDATES: Partial<DatDigital> = {
        pk_entity: 2001,
        fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
        fk_system_type: SysSystemTypeMock.DIGITAL_TABLE.pk_entity,
        string: '',
    }

    static readonly DIGITAL_RANDOM_TABLE: Partial<DatDigital> = {
        pk_entity: 2002,
        fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
        fk_system_type: SysSystemTypeMock.DIGITAL_TABLE.pk_entity,
        string: '',
    }

    // static readonly DIGITAL_TEXT_RODOLF_FOO: Partial<DatDigital> = {
    //     pk_entity: 2003,
    //     fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    //     fk_system_type: SysSystemTypeMock.DIGITAL_TEXT.pk_entity,
    //     pk_text: 2003,
    //     entity_version:1,
    //     quill_doc: {"ops": [{"insert": "R", "attributes": {"charid": "1"}}, {"insert": "u", "attributes": {"charid": "2"}}, {"insert": "d", "attributes": {"charid": "3"}}, {"insert": "o", "attributes": {"charid": "4"}}, {"insert": "l", "attributes": {"charid": "5"}}, {"insert": "f", "attributes": {"charid": "6"}}, {"insert": " ", "attributes": {"charid": "7"}}, {"insert": "F", "attributes": {"charid": "8"}}, {"insert": "o", "attributes": {"charid": "9"}}, {"insert": "o", "attributes": {"charid": "10"}}, {"insert": "\n", "attributes": {"blockid": "11"}}], "latestId": 11}
    // }

    static readonly DIGITAL_UNIONS: Partial<DatDigital> = {
        pk_entity: 2004,
        fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
        fk_system_type: SysSystemTypeMock.DIGITAL_TABLE.pk_entity,
        string: '',
    }

    static readonly DIGITAL_OUT: Partial<DatDigital> = {
        pk_entity: 2005,
        fk_namespace: DatNamespaceMock.NAMESPACE_2.pk_entity,
        fk_system_type: SysSystemTypeMock.DIGITAL_TABLE.pk_entity,
        string: '',
    }
}
