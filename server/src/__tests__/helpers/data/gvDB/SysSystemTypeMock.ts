/* eslint-disable @typescript-eslint/camelcase */
import {SysSystemType} from '../../../../models';

/**
 * pk_entity prefix: ---
 * we take the pk_entities from the production/staging db
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
  static readonly DIGITAL_TEXT = new SysSystemType({
    pk_entity: 3286,
    definition: 'Text. Type of Digital stored in the table data.digital'
  })
  static readonly DIGITAL_TABLE = new SysSystemType({
    pk_entity: 3287,
    definition: 'Table. Type of Digital stored in the table data.digital'
  })
  static readonly VALUE = new SysSystemType({
    pk_entity: 3291,
    definition: 'Value.  Semistructured data of one of the data types specified with fk_data_type'
  })
  static readonly TEXT = new SysSystemType({
    pk_entity: 3292,
    definition: 'Text. Data type'
  })
  static readonly NUMBER = new SysSystemType({
    pk_entity: 3293,
    definition: 'Float. Data type'
  })
  static readonly LABEL_OF_DATA_RECORD = new SysSystemType({
    pk_entity: 3295,
    definition: 'Label of an entity stored in data.text_property table'
  })


}


