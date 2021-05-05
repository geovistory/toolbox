import {model, property} from '@loopback/repository';
import {GvSubentitFieldPageReq} from './gv-subentity-field-page-req';
import {GvSubentityTargetType} from './gv-subentity-target-type';

@model({
  jsonSchema: {
    description: "If present, defines a specific list type for the class.",
    maxProperties: 1,
    minProperties: 1,
  }
})
export class GvTargetType extends GvSubentityTargetType {

  @property.array(GvSubentitFieldPageReq)
  nestedResource?: GvSubentitFieldPageReq[];

}
