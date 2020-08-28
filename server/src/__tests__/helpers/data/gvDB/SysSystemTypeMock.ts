/* eslint-disable @typescript-eslint/camelcase */
import {SysSystemType} from '../../../../models';

/**
 * pk_entity prefix: 500
 */
export class SysSystemTypeMock {

  static readonly PRO_TEXT_PROPTERTY_DESCRIPTION = new SysSystemType({
    pk_entity: 638,
    definition: 'Description of an entity.'
  })
  static readonly PRO_TEXT_PROPTERTY_LABEL = new SysSystemType({
    pk_entity: 639,
    definition: 'Label of an entity.'
  })
  static readonly DIGITAL_TABLE = new SysSystemType({
    pk_entity: 3287,
    definition: 'Table. Type of Digital stored in the table data.digital'
  })
  static readonly COLUMN_DATA_TYPE_VALUE = new SysSystemType({
    pk_entity: 3291,
    definition: 'Value.  Semistructured data of one of the data types specified with fk_data_type'
  })
  static readonly COLUMN_DATA_TYPE_TEXT = new SysSystemType({
    pk_entity: 3292,
    definition: 'Text. Data type'
  })
  static readonly COLUMN_DATA_TYPE_FLOAT = new SysSystemType({
    pk_entity: 3293,
    definition: 'Float. Data type'
  })


}


