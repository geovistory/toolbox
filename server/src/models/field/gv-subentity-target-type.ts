import {model, property} from '@loopback/repository';
import {DimensionValueObjectType} from '../sys-config';
import {TrueEnum} from '../sys-config/TrueEnum';

@model({
  jsonSchema: {
    description: "If present, defines a specific list type for the class.",
    maxProperties: 1,
    minProperties: 1,
  }
})
export class GvSubentityTargetType {
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

  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  entityPreview?: TrueEnum;

  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  typeItem?: TrueEnum;

  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  timeSpan?: TrueEnum;

  // TODO remove
  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  textProperty?: TrueEnum;
}