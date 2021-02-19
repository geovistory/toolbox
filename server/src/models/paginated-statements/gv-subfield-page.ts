import {model, property} from '@loopback/repository';
import {GvSubfieldaPageScope} from './gv-subfield-page-scope';
@model()
export class GvSubfieldPage {
  @property({required: true}) fkSourceEntity: number;
  @property({required: true}) fkProperty: number;
  @property({required: true}) isOutgoing: boolean;
  @property({required: true}) targetClass: number;
  @property({required: true}) limit: number;
  @property({required: true}) offset: number;
  @property({required: true}) scope: GvSubfieldaPageScope;
}
