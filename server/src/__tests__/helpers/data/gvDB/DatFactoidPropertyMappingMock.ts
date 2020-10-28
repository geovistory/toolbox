/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { DatFactoidPropertyMapping } from '../../atomic/dat-factoid.helper'
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
        fk_column: DatColumnMock.COL_DATES.pk_entity as number,
        fk_factoid_mapping: DatFactoidMappingMock.FactoidMapping_BIRTHDATES_BIRTH.pk_entity
    }

    static readonly FactoidPropertyMapping_BIRTH_BROUGHT_INTO_LIFE: DatFactoidPropertyMapping = {
        pk_entity: 8001,
        fk_property: DfhApiPropertyMock.EN_86_BROUGHT_INTO_LIFE.dfh_pk_property,
        fk_column: DatColumnMock.COL_NAMES.pk_entity as number,
        fk_factoid_mapping: DatFactoidMappingMock.FactoidMapping_BIRTHDATES_BIRTH.pk_entity
    }
}
