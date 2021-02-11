/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { DatFactoidMapping } from './local-model.helpers'
import { DatDigitalMock } from './DatDigitalMock'
import { DfhApiClassMock } from './DfhApiClassMock'

/**
 * pk_entity prefix: 700
 */
export class DatFactoidMappingMock {
    static readonly FactoidMapping_BIRTHDATES_BIRTH: DatFactoidMapping = {
        pk_entity: 7000,
        fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity as number,
        fk_class: DfhApiClassMock.EN_61_BIRTH.dfh_pk_class
    }

    static readonly FactoidMapping_UNIONS_PERSON: DatFactoidMapping = {
        pk_entity: 7001,
        fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity as number,
        fk_class: DfhApiClassMock.EN_633_UNION.dfh_pk_class
    }

    static readonly FactoidMapping_UNIONS_BIRTH: DatFactoidMapping = {
        pk_entity: 7002,
        fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity as number,
        fk_class: DfhApiClassMock.EN_61_BIRTH.dfh_pk_class
    }
}
