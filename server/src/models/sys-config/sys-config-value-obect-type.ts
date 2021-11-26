import {model, property} from '@loopback/repository';
import {TrueEnum} from '../enums/TrueEnum';
import {DimensionValueObjectType} from './sys-config-dimension-value-object-type';

@model({
  jsonSchema: {
    description: "If present, maps a class to a value object type.",
    maxProperties: 1,
    minProperties: 1,
  }
})
export class SysConfigValueObjectType {
  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  appellation?: TrueEnum;


  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  language?: TrueEnum;


  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  place?: TrueEnum;


  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  timePrimitive?: TrueEnum;


  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  langString?: TrueEnum;


  @property({type: DimensionValueObjectType, })
  dimension?: DimensionValueObjectType;
}
