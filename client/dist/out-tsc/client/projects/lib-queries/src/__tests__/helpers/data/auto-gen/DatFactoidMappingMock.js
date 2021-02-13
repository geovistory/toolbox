import { DatDigitalMock } from './DatDigitalMock';
import { DfhApiClassMock } from './DfhApiClassMock';
/**
 * pk_entity prefix: 700
 */
export class DatFactoidMappingMock {
}
DatFactoidMappingMock.FactoidMapping_BIRTHDATES_BIRTH = {
    pk_entity: 7000,
    fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
    fk_class: DfhApiClassMock.EN_61_BIRTH.dfh_pk_class
};
DatFactoidMappingMock.FactoidMapping_UNIONS_PERSON = {
    pk_entity: 7001,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_class: DfhApiClassMock.EN_633_UNION.dfh_pk_class
};
DatFactoidMappingMock.FactoidMapping_UNIONS_BIRTH = {
    pk_entity: 7002,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_class: DfhApiClassMock.EN_61_BIRTH.dfh_pk_class
};
//# sourceMappingURL=DatFactoidMappingMock.js.map