/* eslint-disable @typescript-eslint/camelcase */
import { DatDigitalMock } from './DatDigitalMock';
import { DatColumnMock } from './DatColumnMock';
import { TabRowMock } from './TabRowMock';
import { TabCell } from '../../../../models/tab-cell.model';

/**
 * pk_entity prefix: 200
 */
export class TabCellXMock {
  static readonly FEATURE_X_1_1 = new TabCell({
    pk_cell: 2000, //pk_entity
    fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity as number, //fk_digital
    fk_column: DatColumnMock.COL_NAMES.pk_entity as number, //fk_column
    fk_row: TabRowMock.ROW_ALBERT.pk_row ?? -1, //fk_row
    string_value: 'Albert IV' //content
  }
  )

  static readonly FEATURE_X_1_2 = new TabCell({
    pk_cell: 2001,
    fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity as number,
    fk_column: DatColumnMock.COL_DATES.pk_entity as number,
    fk_row: TabRowMock.ROW_ALBERT.pk_row ?? -1,
    numeric_value: 1180
  })

  static readonly FEATURE_X_2_1 = new TabCell({
    pk_cell: 2002,
    fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity as number,
    fk_column: DatColumnMock.COL_NAMES.pk_entity as number,
    fk_row: TabRowMock.ROW_RUDOLF.pk_row ?? -1,
    string_value: 'Rudolf of Habsbourg'
  })

  static readonly FEATURE_X_2_2 = new TabCell({
    pk_cell: 2003,
    fk_digital: DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity as number,
    fk_column: DatColumnMock.COL_DATES.pk_entity as number,
    fk_row: TabRowMock.ROW_RUDOLF.pk_row ?? -1,
    numeric_value: 1218
  })

  static readonly FEATURE_X_RND_1_1 = new TabCell({
    pk_cell: 2004,
    fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity as number,
    fk_column: DatColumnMock.COL_RND1.pk_entity as number,
    fk_row: TabRowMock.ROW_RND_VAL1.pk_row ?? -1,
    numeric_value: Math.random()
  })

  static readonly FEATURE_X_RND_1_2 = new TabCell({
    pk_cell: 2005,
    fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity as number,
    fk_column: DatColumnMock.COL_RND2.pk_entity as number,
    fk_row: TabRowMock.ROW_RND_VAL1.pk_row ?? -1,
    numeric_value: Math.random()
  })

  static readonly FEATURE_X_RND_2_1 = new TabCell({
    pk_cell: 2006,
    fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity as number,
    fk_column: DatColumnMock.COL_RND1.pk_entity as number,
    fk_row: TabRowMock.ROW_RND_VAL2.pk_row ?? -1,
    numeric_value: Math.random()
  })

  static readonly FEATURE_X_RND_2_2 = new TabCell({
    pk_cell: 2007,
    fk_digital: DatDigitalMock.DIGITAL_RANDOM_TABLE.pk_entity as number,
    fk_column: DatColumnMock.COL_RND2.pk_entity as number,
    fk_row: TabRowMock.ROW_RND_VAL2.pk_row ?? -1,
    numeric_value: Math.random()
  })
}
