/* eslint-disable @typescript-eslint/camelcase */
import { DatClassColumnMapping } from '../../../../models';
import { DfhApiClassMock } from './DfhApiClassMock';
import {DatColumnMock} from './DatColumnMock';

/**
 * pk_entity prefix: 400
 */
export class DatClassColumnMappingMock {
    static readonly MAPPING_COL_NAME_TO_CLASS_PERSON = new DatClassColumnMapping({
        pk_entity: 4000,
        fk_class: DfhApiClassMock.EN_21_PERSON.dfh_pk_class,
        fk_column: DatColumnMock.COL_NAMES.pk_entity
    })
}