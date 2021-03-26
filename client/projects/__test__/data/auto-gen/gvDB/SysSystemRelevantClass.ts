/* eslint-disable @typescript-eslint/camelcase */
import { SysSystemRelevantClass } from '@kleiolab/lib-sdk-lb4';
import { DfhApiClassMock } from './DfhApiClassMock';

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

}


