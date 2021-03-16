import {model, property} from '@loopback/repository';
import {GvFieldProperty} from './gv-field-property';
@model()
export class GvSubentityFieldPage {

  @property({type: GvFieldProperty, required: true})
  property: GvFieldProperty;

  @property({required: true})
  isOutgoing: boolean;

  @property({required: true})
  limit: number;

  @property({required: true})
  offset: number;

  // true if the parent entity subfield is of the same property and the target max quantity == 1
  @property({required: true})
  isCircular:boolean;
}
