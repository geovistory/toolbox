import {model, property} from '@loopback/repository';
import {Header} from './import-table-header.model';

@model()
export class ImportTable {

  @property()
  tableName: string;

  @property()
  pk_namespace: number;

  @property()
  pk_language: number;

  @property.array(Header)
  headers: Header[];

  @property.array(Array, {
    jsonSchema: {
      type: 'array',
      items: {type: 'string'},
    },
  })
  rows: Array<Array<string>>;
}
