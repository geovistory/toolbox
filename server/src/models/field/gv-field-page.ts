import {model, property} from '@loopback/repository';
import {GvFieldPageScope} from './gv-field-page-scope';
import {GvFieldSourceEntity} from './gv-field-source-entity';
import {GvFieldProperty} from './gv-field-property';
@model()
export class GvFieldPage {

  @property({type: GvFieldSourceEntity, required: true})
  source: GvFieldSourceEntity;

  @property({type: GvFieldProperty, required: true})
  property: GvFieldProperty;

  @property({required: true})
  isOutgoing: boolean;

  @property({required: true})
  limit: number;

  @property({required: true})
  offset: number;

  @property({required: true})
  scope: GvFieldPageScope;
}


