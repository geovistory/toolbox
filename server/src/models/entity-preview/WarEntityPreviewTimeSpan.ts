import {model, property} from '@loopback/repository';
import {TimePrimitiveWithCal} from "./TimePrimitiveWithCal";


@model()
export class WarEntityPreviewTimeSpan {

  @property({type: TimePrimitiveWithCal})
  p82?: TimePrimitiveWithCal;

  @property({type: TimePrimitiveWithCal})
  p81?: TimePrimitiveWithCal;

  @property({type: TimePrimitiveWithCal})
  p81a?: TimePrimitiveWithCal;

  @property({type: TimePrimitiveWithCal})
  p82a?: TimePrimitiveWithCal;

  @property({type: TimePrimitiveWithCal})
  p81b?: TimePrimitiveWithCal;

  @property({type: TimePrimitiveWithCal})
  p82b?: TimePrimitiveWithCal;
}
