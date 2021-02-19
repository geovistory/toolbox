import {model, property} from '@loopback/repository';
import {GvSubfieldPage} from './gv-subfield-page';
import {GvSubfieldType} from './gv-subfield-type';
@model()
export class GvLoadSubfieldPageReq {
  @property({required: true}) pkProject: number
  @property({required: true}) page: GvSubfieldPage
  @property({required: true}) subfieldType: GvSubfieldType;
}
