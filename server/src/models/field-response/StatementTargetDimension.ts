import {model, property} from '@loopback/repository';
import {InfDimension, WarEntityPreview} from '..';






@model()
export class StatementTargetDimension {
  @property({type: InfDimension, required: true}) dimension: InfDimension;
  @property({type: WarEntityPreview}) unitPreview?: WarEntityPreview;
}
