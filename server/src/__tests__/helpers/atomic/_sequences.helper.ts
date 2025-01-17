import {omit} from 'ramda';
import {TestDbFactory} from '../TestDbFactory';


interface PkEntity {
  pk_entity?: number
  [key: string]: unknown
}

interface PkEntityAndPkText extends PkEntity {
  pk_text?: number
}

interface PkRow {
  pk_row?: number
  [key: string]: unknown
}

export async function dealWithPkEntity<M extends PkEntity>(item: M, schema: 'information' | 'projects' | 'data' | 'data_for_history' | 'system') {
  if (item.pk_entity) {
    await TestDbFactory.datasource.execute(`SELECT setval('${schema}.entity_pk_entity_seq', ${item.pk_entity - 1}, true);`);
  }
  return omit(['pk_entity'], item);
}

export async function dealWithPkRow<M extends PkRow>(item: M) {
  if (item.pk_row) {
    await TestDbFactory.datasource.execute(`SELECT setval('tables.row_pk_row_seq', ${item.pk_row - 1}, true);`);
  }
  return omit(['pk_row'], item);
}

export async function dealWithPkEntityAndPkText<M extends PkEntityAndPkText>(item: M, schema: 'information' | 'projects' | 'data' | 'data_for_history' | 'system') {
  if (item.pk_text) {
    await TestDbFactory.datasource.execute(`SELECT setval('commons.text_pk_text_seq', ${item.pk_text - 1}, true);`);
  }
  return dealWithPkEntity(item, schema)
}

interface Id {
  id?: number
  [key: string]: unknown
}
export async function dealWithId<M extends Id>(item: M, sequence: string) {
  if (item.id) {
    await TestDbFactory.datasource.execute(`SELECT setval('${sequence}', ${item.id}, false);`);
  }
  return omit(['id'], item);
}

export async function setSequencesToMax() {
  for (const schema of ['information', 'projects', 'data', 'data_for_history', 'system']) {
    await TestDbFactory.datasource.execute(`SELECT setval('${schema}.entity_pk_entity_seq', (SELECT MAX(pk_entity) FROM ${schema}.entity));`);
  }
  await TestDbFactory.datasource.execute(`SELECT setval('tables.cell_pk_cell_seq', (SELECT MAX(pk_cell) FROM tables.cell));`);
  await TestDbFactory.datasource.execute(`SELECT setval('tables.row_pk_row_seq', (SELECT MAX(pk_row) FROM tables.row));`);

}

