/* eslint-disable @typescript-eslint/camelcase */
import { DatNamespaceMock } from './DatNamespaceMock';
import { SysSystemTypeMock } from './SysSystemTypeMock';
/**
 * pk_entity prefix: 200
 */
export class DatDigitalMock {
}
DatDigitalMock.DIGITAL_BIRTHDATES = ({
    pk_entity: 2001,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_system_type: SysSystemTypeMock.DIGITAL_TABLE.pk_entity,
    string: '',
});
DatDigitalMock.DIGITAL_RANDOM_TABLE = ({
    pk_entity: 2002,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_system_type: SysSystemTypeMock.DIGITAL_TABLE.pk_entity,
    string: '',
});
DatDigitalMock.DIGITAL_TEXT_RODOLF_FOO = ({
    pk_entity: 2003,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_system_type: SysSystemTypeMock.DIGITAL_TEXT.pk_entity,
    pk_text: 2003,
    quill_doc: { 'ops': [{ 'insert': 'R', 'attributes': { 'charid': '1' } }, { 'insert': 'u', 'attributes': { 'charid': '2' } }, { 'insert': 'd', 'attributes': { 'charid': '3' } }, { 'insert': 'o', 'attributes': { 'charid': '4' } }, { 'insert': 'l', 'attributes': { 'charid': '5' } }, { 'insert': 'f', 'attributes': { 'charid': '6' } }, { 'insert': ' ', 'attributes': { 'charid': '7' } }, { 'insert': 'F', 'attributes': { 'charid': '8' } }, { 'insert': 'o', 'attributes': { 'charid': '9' } }, { 'insert': 'o', 'attributes': { 'charid': '10' } }, { 'insert': '\n', 'attributes': { 'blockid': '11' } }], 'latestId': 11 }
});
DatDigitalMock.DIGITAL_UNIONS = ({
    pk_entity: 2004,
    fk_namespace: DatNamespaceMock.SANDBOX_NAMESPACE.pk_entity,
    fk_system_type: SysSystemTypeMock.DIGITAL_TABLE.pk_entity,
    string: '',
});
//# sourceMappingURL=DatDigitalMock.js.map