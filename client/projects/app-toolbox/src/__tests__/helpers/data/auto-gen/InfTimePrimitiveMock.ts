/* eslint-disable @typescript-eslint/camelcase */
import { InfTimePrimitive } from "@kleiolab/lib-sdk-lb4";
import { DfhApiClassMock } from './DfhApiClassMock';

/**
 * pk_entity prefix: 600
 */

export class InfTimePrimitiveMock {
  static readonly TP_1: Partial<InfTimePrimitive> = ({
    pk_entity: 6001,
    fk_class: DfhApiClassMock.EN_335_TIME_PRIMITIVE.dfh_pk_class,
    julian_day: 2362729,
    duration: '1 day'
  })
  static readonly TP_2: Partial<InfTimePrimitive> = ({
    pk_entity: 6002,
    fk_class: DfhApiClassMock.EN_335_TIME_PRIMITIVE.dfh_pk_class,
    julian_day: 2362730,
    duration: '1 day'
  })
  static readonly TP_3: Partial<InfTimePrimitive> = ({
    pk_entity: 6003,
    fk_class: DfhApiClassMock.EN_335_TIME_PRIMITIVE.dfh_pk_class,
    julian_day: 2362731,
    duration: '1 day'
  })
  static readonly TP_4: Partial<InfTimePrimitive> = ({
    pk_entity: 6004,
    fk_class: DfhApiClassMock.EN_335_TIME_PRIMITIVE.dfh_pk_class,
    julian_day: 2362732,
    duration: '1 day'
  })
  static readonly TP_5: Partial<InfTimePrimitive> = ({
    pk_entity: 6005,
    fk_class: DfhApiClassMock.EN_335_TIME_PRIMITIVE.dfh_pk_class,
    julian_day: 2362733,
    duration: '1 day'
  })
  static readonly TP_6: Partial<InfTimePrimitive> = ({
    pk_entity: 6006,
    fk_class: DfhApiClassMock.EN_335_TIME_PRIMITIVE.dfh_pk_class,
    julian_day: 2362734,
    duration: '1 day'
  })
}
