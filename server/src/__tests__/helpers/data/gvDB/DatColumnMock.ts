/* eslint-disable @typescript-eslint/camelcase */
import { DatClassColumnMapping, DatColumn, DatDigital } from '../../../../models';
import { DfhApiClassMock } from './DfhApiClassMock';
import { DatDigitalMock } from './DatDigitalMock';

/**
 * pk_entity prefix: 300
 */
export class DatColumnMock {
    static readonly COL_NAMES = new DatColumn({
        pk_entity: 3000,
        fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
        fk_data_type: 3293, //string
    })
    
    static readonly COL_DATES = new DatColumn({
        pk_entity: 3001,
        fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
        fk_data_type: 3293, //string
    })
}
