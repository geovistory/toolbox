import {model, property} from '@loopback/repository';
import {GvFieldPageScope} from './gv-field-page-scope';
@model()
export class GvFieldPage {
  @property({required: true}) fkSourceEntity: number;

  @property({required: true}) fkProperty: number;
  @property({required: true}) isOutgoing: boolean;
  @property({required: true}) limit: number;
  @property({required: true}) offset: number;

  @property({required: true}) scope: GvFieldPageScope;
}


