import {model, property} from '@loopback/repository';
import {GvPaginationStatementFilter} from './gv-pagination-statement-filter';
import {GvSubfieldType} from './gv-subfield-type';

@model()
export class GvLoadSubfieldPageReq {
  @property() pkProject: number
  @property() filterObject: GvPaginationStatementFilter
  @property() subfieldType: GvSubfieldType
  @property() limit: number
  @property() offset: number
}
