import {model, property} from '@loopback/repository';
import {GvFieldId} from '../field/gv-field-id';
import {StatementWithTarget} from './gv-statement-with-target';


@model()
export class SubentitySubfieldPage {
  @property({type: GvFieldId, required: true}) subfield: GvFieldId;
  @property({required: true}) count: number;
  @property.array(StatementWithTarget) statements: Array<StatementWithTarget>;
}
