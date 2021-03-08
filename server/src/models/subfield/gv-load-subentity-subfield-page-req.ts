import {model, property} from '@loopback/repository';
import {GvSubentitySubfieldPage} from './gv-subentity-subfield-page';
import {GvSubentitySubfieldType} from './gv-subentity-subfield-type';
@model()
export class GvLoadSubentitySubfieldPageReq {
  @property({required: true}) page: GvSubentitySubfieldPage
  @property({required: true}) subfieldType: GvSubentitySubfieldType;
}
