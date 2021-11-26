import {model, property} from '@loopback/repository';
import {InfResource, WarEntityPreview} from '..';


@model()
export class StatementTargetEntity {
  @property({type: InfResource, required: true}) resource: InfResource;
  @property({type: WarEntityPreview, required: true}) entityPreview?: WarEntityPreview;
}
