import {model, property} from '@loopback/repository';
import {Header} from './import-table-header.model';

@model()
export class ImportTable {

  @property({required: true})
  tableName: string;

  @property({required: true})
  fileName: string;

  @property({required: true})
  pk_namespace: number;

  @property({required: true})
  pk_language: number;

  @property.array(Header, {required: true})
  headers: Header[];

  @property.array(Array, {
    required: true,
    jsonSchema: {
      type: 'array',
      items: {type: 'string'},
    },
  })
  rows: Array<Array<string | number>>;
}
