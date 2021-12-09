/* eslint-disable @typescript-eslint/camelcase */
import {InfTimePrimitive} from '@kleiolab/lib-sdk-lb4';
import {TimePrimitiveWithCal} from '../../../../models/enums/CalendarType';
import {} from '../../../../models/enums/Granularity';
import {DfhApiClassMock} from './DfhApiClassMock';
import {OmitEntity} from './local-model.helpers';

/**
 * pk_entity prefix: 600
 */

export class InfTimePrimitiveMock {
  static readonly TP_1: OmitEntity<InfTimePrimitive> = ({
    pk_entity: 6001,
    fk_class: DfhApiClassMock.EN_335_TIME_PRIMITIVE.dfh_pk_class,
    julian_day: 2362729,
    calendar: 'gregorian' as TimePrimitiveWithCal.CalendarEnum,
    duration: '1 day' as TimePrimitiveWithCal.DurationEnum
  })
  static readonly TP_2: OmitEntity<InfTimePrimitive> = ({
    pk_entity: 6002,
    fk_class: DfhApiClassMock.EN_335_TIME_PRIMITIVE.dfh_pk_class,
    julian_day: 2362730,
    calendar: 'gregorian' as TimePrimitiveWithCal.CalendarEnum,
    duration: '1 day' as TimePrimitiveWithCal.DurationEnum
  })
  static readonly TP_3: OmitEntity<InfTimePrimitive> = ({
    pk_entity: 6003,
    fk_class: DfhApiClassMock.EN_335_TIME_PRIMITIVE.dfh_pk_class,
    julian_day: 2362731,
    calendar: 'gregorian' as TimePrimitiveWithCal.CalendarEnum,
    duration: '1 day' as TimePrimitiveWithCal.DurationEnum
  })
  static readonly TP_4: OmitEntity<InfTimePrimitive> = ({
    pk_entity: 6004,
    fk_class: DfhApiClassMock.EN_335_TIME_PRIMITIVE.dfh_pk_class,
    julian_day: 2362732,
    calendar: 'gregorian' as TimePrimitiveWithCal.CalendarEnum,
    duration: '1 day' as TimePrimitiveWithCal.DurationEnum
  })
  static readonly TP_5: OmitEntity<InfTimePrimitive> = ({
    pk_entity: 6005,
    fk_class: DfhApiClassMock.EN_335_TIME_PRIMITIVE.dfh_pk_class,
    julian_day: 2362733,
    calendar: 'gregorian' as TimePrimitiveWithCal.CalendarEnum,
    duration: '1 day' as TimePrimitiveWithCal.DurationEnum
  })
  static readonly TP_6: OmitEntity<InfTimePrimitive> = ({
    pk_entity: 6006,
    fk_class: DfhApiClassMock.EN_335_TIME_PRIMITIVE.dfh_pk_class,
    julian_day: 2362734,
    calendar: 'gregorian' as TimePrimitiveWithCal.CalendarEnum,
    duration: '1 day' as TimePrimitiveWithCal.DurationEnum
  })
}
