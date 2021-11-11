import {model, property} from '@loopback/repository';
import {GvFieldPageReq} from '../field/gv-field-page-req';
import {StatementWithTarget} from './gv-statement-with-target';


@model()
export class GvSubfieldPageInfo {
  @property({type: GvFieldPageReq, required: true}) req: GvFieldPageReq;
  @property({required: true}) count: number;
  @property.array(StatementWithTarget, {required: true}) paginatedStatements: StatementWithTarget[];
  @property() validFor?: Date;
}
