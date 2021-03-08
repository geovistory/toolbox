import {model, property} from '@loopback/repository';
import {GvSubfieldPageScope} from './gv-subfield-page-scope';
/**
 * Identifies a Subfield.
 *
 * This is different from GvSubfieldPage, since it does not
 * contain limit and offset.
 */

@model()
export class GvSubfieldId {
  @property({required: true}) fkSourceEntity: number;
  @property({required: true}) fkProperty: number;
  @property({required: true}) isOutgoing: boolean;
  @property({required: true}) targetClass: number;
  @property({required: true}) scope: GvSubfieldPageScope;
}

