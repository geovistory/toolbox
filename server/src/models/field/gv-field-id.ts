import {model, property} from '@loopback/repository';
import {GvFieldPageScope} from './gv-field-page-scope';
/**
 * Identifies a Subfield.
 *
 * This is different from GvSubfieldPage, since it does not
 * contain limit and offset.
 */

@model()
export class GvFieldId {
  @property({required: true}) fkSourceEntity: number;
  @property({required: true}) fkProperty: number;
  @property({required: true}) isOutgoing: boolean;
  @property({required: true}) scope: GvFieldPageScope;
}

