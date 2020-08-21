import {testdb} from '../../../datasources/testdb.datasource';
import {omit} from 'ramda';


interface PkEntity {
  pk_entity?: number
  [key: string]: unknown
}
export async function dealWithPkEntity<M extends PkEntity>(item: M, schema: 'information' | 'projects') {
  if (item.pk_entity) {
    await testdb.execute(`SELECT setval('${schema}.entity_pk_entity_seq', ${item.pk_entity - 1}, true);`);
  }
  return omit(['pk_entity'], item);
}
interface Id {
  id?: number
  [key: string]: unknown
}
export async function dealWithId<M extends Id>(item: M, sequence:string) {
  if (item.id) {
    await testdb.execute(`SELECT setval('${sequence}', ${item.id - 1}, true);`);
  }
  return omit(['id'], item);
}
