/* eslint-disable @typescript-eslint/camelcase */
import {TabRow} from '../../../../models/tab-row.model';
import {DatDigitalMock} from './DatDigitalMock';

/**
 * pk_entity prefix: 100
 */
export class TabRowMock {
    static readonly ROW_RUDOLF = new TabRow({
        pk_row: 1000,
        fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
    })

    static readonly ROW_ALBERT = new TabRow({
        pk_row: 1001,
        fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
    })

    static readonly ROW_RND_VAL1 = new TabRow({
        pk_row: 1002,
        fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
    })

    static readonly ROW_RND_VAL2 = new TabRow({
        pk_row: 1003,
        fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
    })
}
// export class TabRowMock {
//     static readonly ROW_RUDOLF = new TabRow({
//         pk_row: '1000',
//         fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
//     })

//     static readonly ROW_ALBERT = new TabRow({
//         pk_row: '1001',
//         fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
//     })

//     static readonly ROW_RND_VAL1 = new TabRow({
//         pk_row: '1002',
//         fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
//     })

//     static readonly ROW_RND_VAL2 = new TabRow({
//         pk_row: '1003',
//         fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
//     })
// }