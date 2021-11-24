import {model, property} from '@loopback/repository';
import {InfTimePrimitive} from '..';
import {TimePrimitiveWithCal} from '../entity-preview/TimePrimitiveWithCal';


@model()
export class StatementTargeTimePrimitive {
  @property({type: InfTimePrimitive, required: true}) infTimePrimitive: InfTimePrimitive;
  @property({type: TimePrimitiveWithCal, required: true}) timePrimitive?: TimePrimitiveWithCal;
}
