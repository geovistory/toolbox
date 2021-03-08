import {model, property} from '@loopback/repository';
import {GvLoadSubentitySubfieldPageReq} from './gv-load-subentity-subfield-page-req';
import {GvSubentitySubfieldType} from './gv-subentity-subfield-type';

@model({
  jsonSchema: {
    description: "If present, defines a specific list type for the class.",
    maxProperties: 1,
    minProperties: 1,
  }
})
export class GvSubfieldType extends GvSubentitySubfieldType {

  @property.array(GvLoadSubentitySubfieldPageReq)
  temporalEntity?: GvLoadSubentitySubfieldPageReq[];

}
