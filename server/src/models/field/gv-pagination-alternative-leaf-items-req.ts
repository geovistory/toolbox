import {model, property} from '@loopback/repository';
import {GvPaginationStatementFilter} from './gv-pagination-statement-filter';

@model()
export class GvPaginationAlternativeLeafItemsReq {
  @property() pkProject: number
  @property() filterObject: GvPaginationStatementFilter
  @property() limit: number
  @property() offset: number
}
