import {model, property} from '@loopback/repository';
import {DimensionValueObjectType} from '.';
import {TrueEnum} from './TrueEnum';



@model({
  jsonSchema: {
    description: "If present, defines a specific form control type for the class.",
    maxProperties: 1,
    minProperties: 1,
  }
})
export class SysConfigFormCtrlType {

  // form element to create or add entity
  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  entity?: TrueEnum;

  // form element to create appellation in a language temporal entity
  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  appellationTeEn?: TrueEnum;

  // form element to create appellation (string)
  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  appellation?: TrueEnum;

  // form element to pick language
  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  language?: TrueEnum;

  // form element to create place (lat/long)
  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  place?: TrueEnum;

  // form element to create time primitive
  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  timePrimitive?: TrueEnum;

  // form element to create string with language
  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  langString?: TrueEnum;

  // form element to create dimension
  @property({type: DimensionValueObjectType, })
  dimension?: DimensionValueObjectType;

  // form element to pick type
  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  typeItem?: TrueEnum;

  // form element to create time span
  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  timeSpan?: TrueEnum;

}