import {model, property} from '@loopback/repository';
import {GvSubfieldPageInfo} from './GvSubfieldPageInfo';

@model()
export class GvPaginationObject {
  @property.array(GvSubfieldPageInfo, {required: true}) subfieldPages: GvSubfieldPageInfo[]
}
