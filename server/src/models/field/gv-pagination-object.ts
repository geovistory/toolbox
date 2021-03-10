import {model, property} from '@loopback/repository';
import {GvSchemaObject} from '../gv-schema-object.model';
import {GvFieldPage} from './gv-field-page';

@model()
export class GvSubfieldPageInfo {
  @property({required: true}) page: GvFieldPage
  @property({required: true}) count: number
  @property.array(Number, {required: true}) paginatedStatements: number[]
}

@model()
export class GvPaginationObject {
  @property({type: GvSchemaObject, required: true}) schemas: GvSchemaObject
  @property.array(GvSubfieldPageInfo, {required: true}) subfieldPages: GvSubfieldPageInfo[]
}
