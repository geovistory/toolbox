import {model, property} from '@loopback/repository';
import {GvSchemaObject} from '../gv-schema-object.model';

@model()
export class GvPaginationObject {
  @property({required: true}) count: number
  @property({type: GvSchemaObject, required: true}) schemas: GvSchemaObject
  @property.array(Number, {required: true}) paginatedStatements: number[]
}
