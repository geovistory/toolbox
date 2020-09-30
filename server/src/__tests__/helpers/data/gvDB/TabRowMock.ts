/* eslint-disable @typescript-eslint/camelcase */
import {TabRow} from '../../../../models/tab-row.model';
import {DatDigitalMock} from './DatDigitalMock';

/**
 * pk_entity prefix: 100
 */
export class TabRowMock {
    static readonly ROW_RUDOLF = new TabRow({
        // pk_row: 1000, ==> apparently not allowed
        fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
    })

    static readonly ROW_ALBERT = new TabRow({
        // pk_row: 1001, ==> apparently not allowed
        fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
    })
}
