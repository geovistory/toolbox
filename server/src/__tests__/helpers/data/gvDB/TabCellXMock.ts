/* eslint-disable @typescript-eslint/camelcase */
import { DatDigitalMock } from './DatDigitalMock';
import { DatColumnMock } from './DatColumnMock';
import { TabRowMock } from './TabRowMock';
import { TabCell } from '../../../../models';

/**
 * pk_entity prefix: 200
 */
export class TabCellXMock {
  static readonly FEATURE_X_1_1: Partial<TabCell> = ({
    pk_cell: 2000, //pk_entity
    fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity as number, //fk_digital
    fk_column: DatColumnMock.COL_NAMES.pk_entity as number, //fk_column
    fk_row: TabRowMock.ROW_ALBERT.pk_row, //fk_row
    string_value: 'Albert IV' //content
  }
  )

  static readonly FEATURE_X_1_2: Partial<TabCell> = ({
    pk_cell: 2001,
    fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity as number,
    fk_column: DatColumnMock.COL_BIRTHDATES.pk_entity as number,
    fk_row: TabRowMock.ROW_ALBERT.pk_row,
    numeric_value: 1180
  })

  static readonly FEATURE_X_2_1: Partial<TabCell> = ({
    pk_cell: 2002,
    fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity as number,
    fk_column: DatColumnMock.COL_NAMES.pk_entity as number,
    fk_row: TabRowMock.ROW_RUDOLF.pk_row,
    string_value: 'Rudolf of Habsbourg'
  })

  static readonly FEATURE_X_2_2: Partial<TabCell> = ({
    pk_cell: 2003,
    fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity as number,
    fk_column: DatColumnMock.COL_BIRTHDATES.pk_entity as number,
    fk_row: TabRowMock.ROW_RUDOLF.pk_row,
    numeric_value: 1218
  })

  static readonly FEATURE_X_RND_1_1: Partial<TabCell> = ({
    pk_cell: 2004,
    fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity as number,
    fk_column: DatColumnMock.COL_RND1.pk_entity as number,
    fk_row: TabRowMock.ROW_RND_VAL1.pk_row,
    numeric_value: Math.random()
  })

  static readonly FEATURE_X_RND_1_2: Partial<TabCell> = ({
    pk_cell: 2005,
    fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity as number,
    fk_column: DatColumnMock.COL_RND2.pk_entity as number,
    fk_row: TabRowMock.ROW_RND_VAL1.pk_row,
    numeric_value: Math.random()
  })

  static readonly FEATURE_X_RND_2_1: Partial<TabCell> = ({
    pk_cell: 2006,
    fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity as number,
    fk_column: DatColumnMock.COL_RND1.pk_entity as number,
    fk_row: TabRowMock.ROW_RND_VAL2.pk_row,
    numeric_value: Math.random()
  })

  static readonly FEATURE_X_RND_2_2: Partial<TabCell> = ({
    pk_cell: 2007,
    fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity as number,
    fk_column: DatColumnMock.COL_RND2.pk_entity as number,
    fk_row: TabRowMock.ROW_RND_VAL2.pk_row,
    numeric_value: Math.random()
  })

  static readonly FEATURE_X_UNIONS_ALBERT: Partial<TabCell> = ({
    pk_cell: 2008,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity as number,
    fk_column: DatColumnMock.COL_PEOPLE.pk_entity as number,
    fk_row: TabRowMock.ROW_UNIONS_ALBERT.pk_row,
    string_value: 'Albert'
  })

  static readonly FEATURE_X_UNIONS_RUDOLPH: Partial<TabCell> = ({
    pk_cell: 2009,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity as number,
    fk_column: DatColumnMock.COL_PEOPLE.pk_entity as number,
    fk_row: TabRowMock.ROW_UNIONS_RUDOLPH.pk_row,
    string_value: 'Rudolph'
  })

  static readonly FEATURE_X_UNIONS_JEAN: Partial<TabCell> = ({
    pk_cell: 2010,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity as number,
    fk_column: DatColumnMock.COL_PEOPLE.pk_entity as number,
    fk_row: TabRowMock.ROW_UNIONS_JEAN.pk_row,
    string_value: 'Jean'
  })

  static readonly FEATURE_X_UNIONS_HANS: Partial<TabCell> = ({
    pk_cell: 2011,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity as number,
    fk_column: DatColumnMock.COL_PEOPLE.pk_entity as number,
    fk_row: TabRowMock.ROW_UNIONS_HANS.pk_row,
    string_value: 'Hans'
  })

  static readonly FEATURE_X_UNIONS_PIERRE: Partial<TabCell> = ({
    pk_cell: 2012,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity as number,
    fk_column: DatColumnMock.COL_PEOPLE.pk_entity as number,
    fk_row: TabRowMock.ROW_UNIONS_PIERRE.pk_row,
    string_value: 'Pierre'
  })

  static readonly FEATURE_X_UNIONS_ANGELA: Partial<TabCell> = ({
    pk_cell: 2013,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity as number,
    fk_column: DatColumnMock.COL_PEOPLE.pk_entity as number,
    fk_row: TabRowMock.ROW_UNIONS_ANGELA.pk_row,
    string_value: 'Angela'
  })

  static readonly FEATURE_X_UNIONS_ALBERT_UNION: Partial<TabCell> = ({
    pk_cell: 2014,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity as number,
    fk_column: DatColumnMock.COL_UNION.pk_entity as number,
    fk_row: TabRowMock.ROW_UNIONS_ALBERT.pk_row,
    string_value: 'Josepha'
  })

  static readonly FEATURE_X_UNIONS_RUDOLPH_UNION: Partial<TabCell> = ({
    pk_cell: 2015,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity as number,
    fk_column: DatColumnMock.COL_UNION.pk_entity as number,
    fk_row: TabRowMock.ROW_UNIONS_RUDOLPH.pk_row,
    string_value: 'Angelina'
  })

  static readonly FEATURE_X_UNIONS_JEAN_UNION: Partial<TabCell> = ({
    pk_cell: 2016,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity as number,
    fk_column: DatColumnMock.COL_UNION.pk_entity as number,
    fk_row: TabRowMock.ROW_UNIONS_JEAN.pk_row,
    string_value: 'Margueritte'
  })

  static readonly FEATURE_X_UNIONS_HANS_UNION: Partial<TabCell> = ({
    pk_cell: 2017,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity as number,
    fk_column: DatColumnMock.COL_UNION.pk_entity as number,
    fk_row: TabRowMock.ROW_UNIONS_HANS.pk_row,
    string_value: 'Micheline'
  })

  static readonly FEATURE_X_UNIONS_PIERRE_UNION: Partial<TabCell> = ({
    pk_cell: 2018,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity as number,
    fk_column: DatColumnMock.COL_UNION.pk_entity as number,
    fk_row: TabRowMock.ROW_UNIONS_PIERRE.pk_row,
    string_value: 'Michelle'
  })

  static readonly FEATURE_X_UNIONS_ANGELA_UNION: Partial<TabCell> = ({
    pk_cell: 2019,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity as number,
    fk_column: DatColumnMock.COL_UNION.pk_entity as number,
    fk_row: TabRowMock.ROW_UNIONS_ANGELA.pk_row,
    string_value: 'Marc'
  })

  static readonly FEATURE_X_UNIONS_JEAN_BIRTH: Partial<TabCell> = ({
    pk_cell: 2020,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity as number,
    fk_column: DatColumnMock.COL_BIRTHDATES2.pk_entity as number,
    fk_row: TabRowMock.ROW_UNIONS_JEAN.pk_row,
    string_value: '1'
  })

  static readonly FEATURE_X_UNIONS_HANS_BIRTH: Partial<TabCell> = ({
    pk_cell: 2021,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity as number,
    fk_column: DatColumnMock.COL_BIRTHDATES2.pk_entity as number,
    fk_row: TabRowMock.ROW_UNIONS_HANS.pk_row,
    string_value: '2'
  })

  static readonly FEATURE_X_UNIONS_PIERRE_BIRTH: Partial<TabCell> = ({
    pk_cell: 2022,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity as number,
    fk_column: DatColumnMock.COL_BIRTHDATES2.pk_entity as number,
    fk_row: TabRowMock.ROW_UNIONS_PIERRE.pk_row,
    string_value: '3'
  })

  static readonly FEATURE_X_UNIONS_ANGELA_BIRTH: Partial<TabCell> = ({
    pk_cell: 2023,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity as number,
    fk_column: DatColumnMock.COL_BIRTHDATES2.pk_entity as number,
    fk_row: TabRowMock.ROW_UNIONS_ANGELA.pk_row,
    string_value: '4'
  })

  static readonly FEATURE_X_UNIONS_ALBERT_BIRTH: Partial<TabCell> = ({
    pk_cell: 2024,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity as number,
    fk_column: DatColumnMock.COL_BIRTHDATES2.pk_entity as number,
    fk_row: TabRowMock.ROW_UNIONS_ALBERT.pk_row,
    string_value: '5'
  })

  static readonly FEATURE_X_UNIONS_RUDOLPH_BIRTH: Partial<TabCell> = ({
    pk_cell: 2025,
    fk_digital: DatDigitalMock.DIGITAL_UNIONS.pk_entity as number,
    fk_column: DatColumnMock.COL_BIRTHDATES2.pk_entity as number,
    fk_row: TabRowMock.ROW_UNIONS_RUDOLPH.pk_row,
    string_value: '6'
  })
}
