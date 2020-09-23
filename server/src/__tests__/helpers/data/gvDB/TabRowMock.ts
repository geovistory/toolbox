/* eslint-disable @typescript-eslint/camelcase */
import {DatColumn} from '../../../../models';
import {TabRow} from '../../../../models/tab-row.model';
import {DatDigitalMock} from './DatDigitalMock';

/**
 * pk_entity prefix: 100
 */
export class TabRowMock {
    static readonly ROW_RUDOLF = new TabRow({
        pk_entity: 1000,
        fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
    })

    static readonly ROW_ALBERT = new TabRow({
        pk_entity: 1001,
        fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
    })
}
