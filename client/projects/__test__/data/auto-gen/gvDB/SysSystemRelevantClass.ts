import {SysSystemRelevantClass} from '@kleiolab/lib-sdk-lb4';
import {DfhApiClassMock} from './DfhApiClassMock';

/**
 * pk_entity prefix: ---
 * we take the pk_entities from the production/staging db
 */
export class SysSystemRelevantClassMock {

  static readonly TIME_SPAN: Partial<SysSystemRelevantClass> = ({
    pk_entity: 1001,
    excluded_from_entities: true,
    fk_class: DfhApiClassMock.EN_50_TIME_SPAN.dfh_pk_class
  })

  // this should be replaced by adding a property to SYS_CONFIG
  static readonly MANIFESTATION_SINGLETON: Partial<SysSystemRelevantClass> = ({
    pk_entity: 1002,
    required_by_sources: true,
    fk_class: DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON.dfh_pk_class
  })
  // this should be replaced by adding a property to SYS_CONFIG
  static readonly EN_219_MANIFESTATION_PRODUCT_TYPE: Partial<SysSystemRelevantClass> = ({
    pk_entity: 1003,
    required_by_sources: true,
    fk_class: DfhApiClassMock.EN_219_MANIFESTATION_PRODUCT_TYPE.dfh_pk_class
  })

}


