import { DatColumnMock } from './DatColumnMock';
import { DatDigitalMock } from './DatDigitalMock';
import { TabRowMock } from './TabRowMock';
/**
 * pk_entity prefix: 200
 */
export class TabCellXMock {
}
TabCellXMock.FEATURE_X_1_1 = ({
    pk_cell: 2000,
    fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
    fk_column: DatColumnMock.COL_NAMES.pk_entity,
    fk_row: TabRowMock.ROW_ALBERT.pk_row,
    string_value: 'Albert IV' // content
});
TabCellXMock.FEATURE_X_1_2 = ({
    pk_cell: 2001,
    fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
    fk_column: DatColumnMock.COL_BIRTHDATES.pk_entity,
    fk_row: TabRowMock.ROW_ALBERT.pk_row,
    numeric_value: 1180
});
TabCellXMock.FEATURE_X_2_1 = ({
    pk_cell: 2002,
    fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
    fk_column: DatColumnMock.COL_NAMES.pk_entity,
    fk_row: TabRowMock.ROW_RUDOLF.pk_row,
    string_value: 'Rudolf of Habsbourg'
});
TabCellXMock.FEATURE_X_2_2 = ({
    pk_cell: 2003,
    fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity,
    fk_column: DatColumnMock.COL_BIRTHDATES.pk_entity,
    fk_row: TabRowMock.ROW_RUDOLF.pk_row,
    numeric_value: 1218
});
TabCellXMock.FEATURE_X_RND_1_1 = ({
    pk_cell: 2004,
    fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
    fk_column: DatColumnMock.COL_RND1.pk_entity,
    fk_row: TabRowMock.ROW_RND_VAL1.pk_row,
    numeric_value: Math.random()
});
TabCellXMock.FEATURE_X_RND_1_2 = ({
    pk_cell: 2005,
    fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
    fk_column: DatColumnMock.COL_RND2.pk_entity,
    fk_row: TabRowMock.ROW_RND_VAL1.pk_row,
    numeric_value: Math.random()
});
TabCellXMock.FEATURE_X_RND_2_1 = ({
    pk_cell: 2006,
    fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
    fk_column: DatColumnMock.COL_RND1.pk_entity,
    fk_row: TabRowMock.ROW_RND_VAL2.pk_row,
    numeric_value: Math.random()
});
TabCellXMock.FEATURE_X_RND_2_2 = ({
    pk_cell: 2007,
    fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity,
    fk_column: DatColumnMock.COL_RND2.pk_entity,
    fk_row: TabRowMock.ROW_RND_VAL2.pk_row,
    numeric_value: Math.random()
});
TabCellXMock.FEATURE_X_UNIONS_ALBERT = ({
    pk_cell: 2008,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_column: DatColumnMock.COL_PEOPLE.pk_entity,
    fk_row: TabRowMock.ROW_UNIONS_ALBERT.pk_row,
    string_value: 'Albert'
});
TabCellXMock.FEATURE_X_UNIONS_RUDOLPH = ({
    pk_cell: 2009,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_column: DatColumnMock.COL_PEOPLE.pk_entity,
    fk_row: TabRowMock.ROW_UNIONS_RUDOLPH.pk_row,
    string_value: 'Rudolph'
});
TabCellXMock.FEATURE_X_UNIONS_JEAN = ({
    pk_cell: 2010,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_column: DatColumnMock.COL_PEOPLE.pk_entity,
    fk_row: TabRowMock.ROW_UNIONS_JEAN.pk_row,
    string_value: 'Jean'
});
TabCellXMock.FEATURE_X_UNIONS_HANS = ({
    pk_cell: 2011,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_column: DatColumnMock.COL_PEOPLE.pk_entity,
    fk_row: TabRowMock.ROW_UNIONS_HANS.pk_row,
    string_value: 'Hans'
});
TabCellXMock.FEATURE_X_UNIONS_PIERRE = ({
    pk_cell: 2012,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_column: DatColumnMock.COL_PEOPLE.pk_entity,
    fk_row: TabRowMock.ROW_UNIONS_PIERRE.pk_row,
    string_value: 'Pierre'
});
TabCellXMock.FEATURE_X_UNIONS_ANGELA = ({
    pk_cell: 2013,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_column: DatColumnMock.COL_PEOPLE.pk_entity,
    fk_row: TabRowMock.ROW_UNIONS_ANGELA.pk_row,
    string_value: 'Angela'
});
TabCellXMock.FEATURE_X_UNIONS_ALBERT_UNION = ({
    pk_cell: 2014,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_column: DatColumnMock.COL_UNION.pk_entity,
    fk_row: TabRowMock.ROW_UNIONS_ALBERT.pk_row,
    string_value: 'Josepha'
});
TabCellXMock.FEATURE_X_UNIONS_RUDOLPH_UNION = ({
    pk_cell: 2015,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_column: DatColumnMock.COL_UNION.pk_entity,
    fk_row: TabRowMock.ROW_UNIONS_RUDOLPH.pk_row,
    string_value: 'Angelina'
});
TabCellXMock.FEATURE_X_UNIONS_JEAN_UNION = ({
    pk_cell: 2016,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_column: DatColumnMock.COL_UNION.pk_entity,
    fk_row: TabRowMock.ROW_UNIONS_JEAN.pk_row,
    string_value: 'Margueritte'
});
TabCellXMock.FEATURE_X_UNIONS_HANS_UNION = ({
    pk_cell: 2017,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_column: DatColumnMock.COL_UNION.pk_entity,
    fk_row: TabRowMock.ROW_UNIONS_HANS.pk_row,
    string_value: 'Micheline'
});
TabCellXMock.FEATURE_X_UNIONS_PIERRE_UNION = ({
    pk_cell: 2018,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_column: DatColumnMock.COL_UNION.pk_entity,
    fk_row: TabRowMock.ROW_UNIONS_PIERRE.pk_row,
    string_value: 'Michelle'
});
TabCellXMock.FEATURE_X_UNIONS_ANGELA_UNION = ({
    pk_cell: 2019,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_column: DatColumnMock.COL_UNION.pk_entity,
    fk_row: TabRowMock.ROW_UNIONS_ANGELA.pk_row,
    string_value: 'Marc'
});
TabCellXMock.FEATURE_X_UNIONS_JEAN_BIRTH = ({
    pk_cell: 2020,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_column: DatColumnMock.COL_BIRTHDATES2.pk_entity,
    fk_row: TabRowMock.ROW_UNIONS_JEAN.pk_row,
    string_value: '1'
});
TabCellXMock.FEATURE_X_UNIONS_HANS_BIRTH = ({
    pk_cell: 2021,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_column: DatColumnMock.COL_BIRTHDATES2.pk_entity,
    fk_row: TabRowMock.ROW_UNIONS_HANS.pk_row,
    string_value: '2'
});
TabCellXMock.FEATURE_X_UNIONS_PIERRE_BIRTH = ({
    pk_cell: 2022,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_column: DatColumnMock.COL_BIRTHDATES2.pk_entity,
    fk_row: TabRowMock.ROW_UNIONS_PIERRE.pk_row,
    string_value: '3'
});
TabCellXMock.FEATURE_X_UNIONS_ANGELA_BIRTH = ({
    pk_cell: 2023,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_column: DatColumnMock.COL_BIRTHDATES2.pk_entity,
    fk_row: TabRowMock.ROW_UNIONS_ANGELA.pk_row,
    string_value: '4'
});
TabCellXMock.FEATURE_X_UNIONS_ALBERT_BIRTH = ({
    pk_cell: 2024,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_column: DatColumnMock.COL_BIRTHDATES2.pk_entity,
    fk_row: TabRowMock.ROW_UNIONS_ALBERT.pk_row,
    string_value: '5'
});
TabCellXMock.FEATURE_X_UNIONS_RUDOLPH_BIRTH = ({
    pk_cell: 2025,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity,
    fk_column: DatColumnMock.COL_BIRTHDATES2.pk_entity,
    fk_row: TabRowMock.ROW_UNIONS_RUDOLPH.pk_row,
    string_value: '6'
});
//# sourceMappingURL=TabCellXMock.js.map