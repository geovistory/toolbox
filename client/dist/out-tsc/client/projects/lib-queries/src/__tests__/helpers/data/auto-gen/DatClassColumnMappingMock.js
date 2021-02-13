import { DfhApiClassMock } from './DfhApiClassMock';
import { DatColumnMock } from './DatColumnMock';
/**
 * pk_entity prefix: 400
 */
export class DatClassColumnMappingMock {
}
DatClassColumnMappingMock.MAPPING_COL_NAME_TO_CLASS_PERSON = ({
    pk_entity: 4000,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
    fk_column: DatColumnMock.COL_NAMES.pk_entity
});
DatClassColumnMappingMock.MAPPING_COL_PEOPLE_TO_CLASS_PERSON = ({
    pk_entity: 4001,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
    fk_column: DatColumnMock.COL_PEOPLE.pk_entity
});
DatClassColumnMappingMock.MAPPING_COL_UNION_TO_CLASS_PERSON = ({
    pk_entity: 4002,
    fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
    fk_column: DatColumnMock.COL_UNION.pk_entity
});
//# sourceMappingURL=DatClassColumnMappingMock.js.map