import {model, property} from '@loopback/repository';
@model()
export class GvSubentitySubfieldPage {
  @property({required: true}) fkProperty: number;
  @property({required: true}) isOutgoing: boolean;
  @property({required: true}) targetClass: number;
  @property({required: true}) limit: number;
  @property({required: true}) offset: number;
  // true if the parent entity subfield is of the same property and the target max quantity == 1
  @property({required: true}) isCircular:boolean;
}
