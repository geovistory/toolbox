/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { DatFactoidPropertyMapping } from './local-model.helpers'
import { DatColumnMock } from './DatColumnMock'
import { DatFactoidMappingMock } from './DatFactoidMappingMock'
import { DfhApiPropertyMock } from './DfhApiPropertyMock'

/**
 * pk_entity prefix: 800
 */
export class DatFactoidPropertyMappingMock {
    static readonly FactoidPropertyMapping_BIRTH_WHEN: DatFactoidPropertyMapping = {
        pk_entity: 8000,
        fk_property: DfhApiPropertyMock.EN_152_BEGIN_OF_THE_BEGIN.dfh_pk_property,
        fk_column: DatColumnMock.COL_BIRTHDATES.pk_entity as number,
        fk_factoid_mapping: DatFactoidMappingMock.FactoidMapping_BIRTHDATES_BIRTH.pk_entity
    }

    static readonly FactoidPropertyMapping_BIRTH_BROUGHT_INTO_LIFE: DatFactoidPropertyMapping = {
        pk_entity: 8001,
        fk_property: DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_pk_property,
        fk_column: DatColumnMock.COL_NAMES.pk_entity as number,
        fk_factoid_mapping: DatFactoidMappingMock.FactoidMapping_BIRTHDATES_BIRTH.pk_entity
    }

    static readonly FactoidPropertyMapping_UNION_1: DatFactoidPropertyMapping = {
        pk_entity: 8002,
        fk_property: DfhApiPropertyMock.EN_1436_HAS_PARTNER.dfh_pk_property,
        fk_column: DatColumnMock.COL_PEOPLE.pk_entity as number,
        fk_factoid_mapping: DatFactoidMappingMock.FactoidMapping_UNIONS_PERSON.pk_entity
    }

    static readonly FactoidPropertyMapping_UNION_2: DatFactoidPropertyMapping = {
        pk_entity: 8003,
        fk_property: DfhApiPropertyMock.EN_1436_HAS_PARTNER.dfh_pk_property,
        fk_column: DatColumnMock.COL_UNION.pk_entity as number,
        fk_factoid_mapping: DatFactoidMappingMock.FactoidMapping_UNIONS_PERSON.pk_entity
    }

    static readonly FactoidPropertyMapping_UNION_BIRTH_WHEN: DatFactoidPropertyMapping = {
        pk_entity: 8004,
        fk_property: DfhApiPropertyMock.EN_152_BEGIN_OF_THE_BEGIN.dfh_pk_property,
        fk_column: DatColumnMock.COL_BIRTHDATES2.pk_entity as number,
        fk_factoid_mapping: DatFactoidMappingMock.FactoidMapping_UNIONS_BIRTH.pk_entity
    }

    static readonly FactoidPropertyMapping_UNION_BIRTH_BROUGHT_INTO_LIFE: DatFactoidPropertyMapping = {
        pk_entity: 8005,
        fk_property: DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_pk_property,
        fk_column: DatColumnMock.COL_PEOPLE.pk_entity as number,
        fk_factoid_mapping: DatFactoidMappingMock.FactoidMapping_UNIONS_BIRTH.pk_entity
    }
}
