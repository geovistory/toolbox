import {model, property} from '@loopback/repository';
import {GvFieldPageScope} from './gv-field-page-scope';
import {GvFieldSourceEntity} from './gv-field-source-entity';
import {GvFieldProperty} from './gv-field-property';
/**
 * Identifies a Subfield.
 *
 * This is different from GvSubfieldPage, since it does not
 * contain limit and offset.
 */

@model()
export class GvFieldId {
  @property({type: GvFieldSourceEntity, required: true}) source: GvFieldSourceEntity;
  @property({type: GvFieldProperty, required: true}) property: GvFieldProperty;
  @property({required: true}) isOutgoing: boolean;
  @property({required: true}) scope: GvFieldPageScope;
}

