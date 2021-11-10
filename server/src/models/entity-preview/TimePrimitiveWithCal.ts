import {model, property} from '@loopback/repository';
import {CalendarType} from "../enums/CalendarType";
import {Granularity} from "../enums/Granularity";

@model()
export class TimePrimitiveWithCal {
  @property({required: true})
  julianDay: number;

  @property({
    required: true,
    type: 'string',
    jsonSchema: {
      enum: Object.values(Granularity),
    },
  })
  duration: Granularity;

  @property({
    required: true,
    type: 'string',
    jsonSchema: {
      enum: Object.values(CalendarType),
    },
  }) calendar: CalendarType;
}
