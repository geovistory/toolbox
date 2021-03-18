/* eslint-disable @typescript-eslint/camelcase */
import { SysSystemType } from '@kleiolab/lib-sdk-lb4';

/**
 * pk_entity prefix: ---
 * we take the pk_entities from the production/staging db
 */
export class SysSystemTypeMock {

  static readonly PRO_TEXT_PROPTERTY_DESCRIPTION: Partial<SysSystemType> = ({
    pk_entity: 638,
    definition: 'Description of an entity.'
  })
  static readonly PRO_TEXT_PROPTERTY_LABEL: Partial<SysSystemType> = ({
    pk_entity: 639,
    definition: 'Label of an entity.'
  })
  static readonly DIGITAL_TEXT: Partial<SysSystemType> = ({
    pk_entity: 3286,
    definition: 'Text. Type of Digital stored in the table data.digital'
  })
  static readonly DIGITAL_TABLE: Partial<SysSystemType> = ({
    pk_entity: 3287,
    definition: 'Table. Type of Digital stored in the table data.digital'
  })
  static readonly VALUE: Partial<SysSystemType> = ({
    pk_entity: 3291,
    definition: 'Value.  Semistructured data of one of the data types specified with fk_data_type'
  })
  static readonly TEXT: Partial<SysSystemType> = ({
    pk_entity: 3292,
    definition: 'Text. Data type'
  })
  static readonly NUMBER: Partial<SysSystemType> = ({
    pk_entity: 3293,
    definition: 'Float. Data type'
  })
  static readonly LABEL_OF_DATA_RECORD: Partial<SysSystemType> = ({
    pk_entity: 3295,
    definition: 'Label of an entity stored in data.text_property table'
  })


  static readonly ANALYSIS_TYPE_TIME_CHART: Partial<SysSystemType> = ({
    pk_entity: 3331,
    definition: 'Analysis of type time chart'
  })
  static readonly ANALYSIS_TYPE_TABLE: Partial<SysSystemType> = ({
    pk_entity: 3332,
    definition: 'Analysis of type table'
  })
  static readonly ANALYSIS_TYPE_MAP: Partial<SysSystemType> = ({
    pk_entity: 3333,
    definition: 'Analysis of type map'
  })

}


