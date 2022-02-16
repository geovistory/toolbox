import {model, property} from '@loopback/repository';
import {GvFieldId} from './gv-field-id';



@model()
export class ChangeOrdNumReq {
  @property({required: true}) pkProject: number;
  @property({type: GvFieldId, required: true}) fieldId: GvFieldId;
  @property({required: true}) movedStatementId: number;
  @property({required: true}) targetOrdNum: number;
}
