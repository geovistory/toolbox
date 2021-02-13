import { DatDigitalMock } from './DatDigitalMock';
/**
 * pk_entity prefix: 100
 */
export class TabRowMock {
}
TabRowMock.ROW_RUDOLF = ({
    pk_row: 1000,
    fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
});
TabRowMock.ROW_ALBERT = ({
    pk_row: 1001,
    fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
});
TabRowMock.ROW_RND_VAL1 = ({
    pk_row: 1002,
    fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
});
TabRowMock.ROW_RND_VAL2 = ({
    pk_row: 1003,
    fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
});
TabRowMock.ROW_UNIONS_ALBERT = ({
    pk_row: 1004,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
});
TabRowMock.ROW_UNIONS_RUDOLPH = ({
    pk_row: 1005,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
});
TabRowMock.ROW_UNIONS_JEAN = ({
    pk_row: 1006,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
});
TabRowMock.ROW_UNIONS_HANS = ({
    pk_row: 1007,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
});
TabRowMock.ROW_UNIONS_PIERRE = ({
    pk_row: 1008,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
});
TabRowMock.ROW_UNIONS_ANGELA = ({
    pk_row: 1009,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
});
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
//# sourceMappingURL=TabRowMock.js.map