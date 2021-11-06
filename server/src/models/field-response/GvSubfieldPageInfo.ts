import {model, property} from '@loopback/repository';
import {GvFieldPage} from '../field/gv-field-page';
import {StatementWithTarget} from './gv-statement-with-target';


@model()
export class GvSubfieldPageInfo {
  @property({type: GvFieldPage, required: true}) page: GvFieldPage;
  @property({required: true}) count: number;
  @property.array(StatementWithTarget, {required: true}) paginatedStatements: StatementWithTarget[];
  @property() validFor?: Date;
}
