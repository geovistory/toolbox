import {model, property} from '@loopback/repository';
import {TrueEnum} from '../enums/TrueEnum';
import {GvSubentitFieldPageReq} from '../field/gv-subentity-field-page-req';
import {DimensionValueObjectType} from './sys-config-dimension-value-object-type';



@model({
  jsonSchema: {
    description: "If present, defines a specific form control type for the class.",
    maxProperties: 1,
    minProperties: 1,
  }
})
export class SysConfigViewType {

  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  appellation?: TrueEnum;


  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  language?: TrueEnum;


  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  place?: TrueEnum;


  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  cell?: TrueEnum;


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

  @property.array(GvSubentitFieldPageReq)
  nestedResource?: GvSubentitFieldPageReq[];

}
