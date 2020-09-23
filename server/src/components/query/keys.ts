import {BindingKey} from '@loopback/core';
import {QueryComponent} from './query.component';
import {QTableColumns} from './q-table-columns';

export namespace QueryBindings {
  export const COMPONENT = BindingKey.create<QueryComponent>('components.QueryComponent');
  export const qTableColumns = BindingKey.create<QTableColumns>('query.qTableColumns');

}
