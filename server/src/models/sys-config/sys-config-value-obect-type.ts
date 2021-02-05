import {model, property} from '@loopback/repository';
import {DimensionValueObjectType} from './sys-config-dimension-value-object-type';

export enum TrueEnum {true = 'true'}
@model({
  jsonSchema: {
    description: "If present, defines a specific list type for the class.",
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
