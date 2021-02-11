/* eslint-disable @typescript-eslint/camelcase */
import { DatClassColumnMapping } from 'projects/app-toolbox/src/app/core/sdk-lb4';
import { DfhApiClassMock } from './DfhApiClassMock';
import { DatColumnMock } from './DatColumnMock';

/**
 * pk_entity prefix: 400
 */
export class DatClassColumnMappingMock {
    static readonly MAPPING_COL_NAME_TO_CLASS_PERSON: Partial<DatClassColumnMapping> = ({
        pk_entity: 4000,
        fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
        fk_column: DatColumnMock.COL_NAMES.pk_entity
    })

    static readonly MAPPING_COL_PEOPLE_TO_CLASS_PERSON: Partial<DatClassColumnMapping> = ({
        pk_entity: 4001,
        fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
        fk_column: DatColumnMock.COL_PEOPLE.pk_entity
    })

    static readonly MAPPING_COL_UNION_TO_CLASS_PERSON: Partial<DatClassColumnMapping> = ({
        pk_entity: 4002,
        fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
        fk_column: DatColumnMock.COL_UNION.pk_entity
    })
}
