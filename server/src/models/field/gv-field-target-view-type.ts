import {model, property} from '@loopback/repository';
import {TrueEnum} from '../enums/TrueEnum';
import {DimensionValueObjectType} from '../sys-config';
import {GvSubentityFieldPage} from './gv-subentity-field-page';
import {GvSubentitFieldPageReq} from './gv-subentity-field-page-req';

@model({
  jsonSchema: {
    description: "If present, defines a specific list type for the class.",
    maxProperties: 1,
    minProperties: 1,
  }
})
export class GvFieldTargetViewType {
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
  cell?: TrueEnum;

  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  entityPreview?: TrueEnum;

  @property({type: 'string', jsonSchema: {enum: Object.values(TrueEnum)}})
  typeItem?: TrueEnum;

  @property.array(GvSubentitFieldPageReq)
  nestedResource?: GvSubentitFieldPageReq[];

  // sub request without own target definitions.
  // instead, the targets of the parent will be used
  // for recursive queries
  @property.array(GvSubentityFieldPage)
  subReqsRecursiveTargets?: GvSubentityFieldPage[];
}
