/* eslint-disable @typescript-eslint/camelcase */
import { TabRow } from '@kleiolab/lib-sdk-lb4';
import { DatDigitalMock } from './DatDigitalMock';
import { OmitEntity } from './local-model.helpers';

/**
 * pk_entity prefix: 100
 */
export class TabRowMock {
    static readonly ROW_RUDOLF: OmitEntity<TabRow> = ({
        pk_row: 1000,
        fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
    })

    static readonly ROW_ALBERT: OmitEntity<TabRow> = ({
        pk_row: 1001,
        fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
    })

    static readonly ROW_RND_VAL1: OmitEntity<TabRow> = ({
        pk_row: 1002,
        fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
    })

    static readonly ROW_RND_VAL2: OmitEntity<TabRow> = ({
        pk_row: 1003,
        fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
    })

    static readonly ROW_UNIONS_ALBERT: OmitEntity<TabRow> = ({
        pk_row: 1004,
        fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    })

    static readonly ROW_UNIONS_RUDOLPH: OmitEntity<TabRow> = ({
        pk_row: 1005,
        fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    })

    static readonly ROW_UNIONS_JEAN: OmitEntity<TabRow> = ({
        pk_row: 1006,
        fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    })

    static readonly ROW_UNIONS_HANS: OmitEntity<TabRow> = ({
        pk_row: 1007,
        fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    })

    static readonly ROW_UNIONS_PIERRE: OmitEntity<TabRow> = ({
        pk_row: 1008,
        fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    })

    static readonly ROW_UNIONS_ANGELA: OmitEntity<TabRow> = ({
        pk_row: 1009,
        fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    })
}
// export class TabRowMock {
//     static readonly ROW_RUDOLF : OmitEntity<TabRow> = ({
//         pk_row: '1000',
//         fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
//     })

//     static readonly ROW_ALBERT : OmitEntity<TabRow> = ({
//         pk_row: '1001',
//         fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
//     })

//     static readonly ROW_RND_VAL1 : OmitEntity<TabRow> = ({
//         pk_row: '1002',
//         fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
//     })

//     static readonly ROW_RND_VAL2 : OmitEntity<TabRow> = ({
//         pk_row: '1003',
//         fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
//     })
// }
