/* eslint-disable @typescript-eslint/camelcase */
import { TabRow } from '../../../../models';
import { DatDigitalMock } from './DatDigitalMock';

/**
 * pk_entity prefix: 100
 */
export class TabRowMock {
    static readonly ROW_RUDOLF: Partial<TabRow> = ({
        pk_row: 1000,
        fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
    })

    static readonly ROW_ALBERT: Partial<TabRow> = ({
        pk_row: 1001,
        fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
    })

    static readonly ROW_RND_VAL1: Partial<TabRow> = ({
        pk_row: 1002,
        fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
    })

    static readonly ROW_RND_VAL2: Partial<TabRow> = ({
        pk_row: 1003,
        fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
    })

    static readonly ROW_UNIONS_ALBERT: Partial<TabRow> = ({
        pk_row: 1004,
        fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    })

    static readonly ROW_UNIONS_RUDOLPH: Partial<TabRow> = ({
        pk_row: 1005,
        fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    })

    static readonly ROW_UNIONS_JEAN: Partial<TabRow> = ({
        pk_row: 1006,
        fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    })

    static readonly ROW_UNIONS_HANS: Partial<TabRow> = ({
        pk_row: 1007,
        fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    })

    static readonly ROW_UNIONS_PIERRE: Partial<TabRow> = ({
        pk_row: 1008,
        fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    })

    static readonly ROW_UNIONS_ANGELA: Partial<TabRow> = ({
        pk_row: 1009,
        fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    })
}
// export class TabRowMock {
//     static readonly ROW_RUDOLF : Partial<TabRow> = ({
//         pk_row: '1000',
//         fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
//     })

//     static readonly ROW_ALBERT : Partial<TabRow> = ({
//         pk_row: '1001',
//         fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
//     })

//     static readonly ROW_RND_VAL1 : Partial<TabRow> = ({
//         pk_row: '1002',
//         fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
//     })

//     static readonly ROW_RND_VAL2 : Partial<TabRow> = ({
//         pk_row: '1003',
//         fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
//     })
// }
