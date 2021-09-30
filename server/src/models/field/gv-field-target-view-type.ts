import {model, property} from '@loopback/repository';
import {GvSubentitFieldPageReq} from './gv-subentity-field-page-req';
import {GvSubentityFieldTargetViewType} from './gv-subentity-field-target-view-type';

@model({
  jsonSchema: {
    description: "If present, defines a specific list type for the class.",
    maxProperties: 1,
    minProperties: 1,
  }
})
export class GvFieldTargetViewType extends GvSubentityFieldTargetViewType {

  @property.array(GvSubentitFieldPageReq)
  nestedResource?: GvSubentitFieldPageReq[];


}
