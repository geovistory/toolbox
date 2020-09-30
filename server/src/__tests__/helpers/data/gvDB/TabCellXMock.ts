/* eslint-disable @typescript-eslint/camelcase */
import {DatDigitalMock} from './DatDigitalMock';
import {TabCell} from '../../atomic/tab-cell-X.helper';
import {DatColumnMock} from './DatColumnMock';
import {TabRowMock} from './TabRowMock';

/**
 * pk_entity prefix: 200
 */
export class TabCellXMock {
  static readonly FEATURE_X_1_1 = new TabCell(
    2000, //pk_entity
    DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity as number, //fk_digital
    DatColumnMock.COL_NAMES.pk_entity as number, //fk_column
    TabRowMock.ROW_ALBERT.pk_row as number, //fk_row
    'Albert IV' //content
  )

  static readonly FEATURE_X_1_2 = new TabCell(
    2001, //pk_entity
    DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity as number, //fk_digital
    DatColumnMock.COL_DATES.pk_entity as number, //fk_column
    TabRowMock.ROW_ALBERT.pk_row as number, //fk_row
    '1180' //content
  )

  static readonly FEATURE_X_2_1 = new TabCell(
    2002, //pk_entity
    DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity as number, //fk_digital
    DatColumnMock.COL_NAMES.pk_entity as number, //fk_column
    TabRowMock.ROW_RUDOLF.pk_row as number, //fk_row
    'Rudolf of Habsbourg' //content
  )

  static readonly FEATURE_X_2_2 = new TabCell(
    2003, //pk_entity
    DatDigitalMock.DIGITAL_BIRTHDATES.pk_entity as number, //fk_digital
    DatColumnMock.COL_DATES.pk_entity as number, //fk_column
    TabRowMock.ROW_RUDOLF.pk_row as number, //fk_row
    '1218' //content
  )
}
