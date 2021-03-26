/* eslint-disable @typescript-eslint/camelcase */
import {values} from 'lodash';
import {keys} from 'ramda';
import { DfhApiClass, NewDfhApiClass } from '../data/gvDB/local-model.helpers';
import { testdb } from "../testdb";

/**
 * These helpers are independent of any loopback 4 repository
 * beacause loopack does not access the table data_for_history.api_class
 * directly (it uses data_for_history.v_class instead).
 */

export async function createDfhApiClass(item: Partial<NewDfhApiClass> = {}) {
  const x: NewDfhApiClass = {...templateNew, ...item}
  const sql = `
    WITH tw1 AS(
      INSERT INTO data_for_history.api_class (${keys(x).join(',')})
      VALUES (${keys(x).map((k, i) => '$' + (i + 1)).join(',')})
      RETURNING *
    )
    SELECT ${keys(templateExisting).join(',')}
    FROM tw1;
  `
  const res: DfhApiClass[] = await testdb.execute(sql, values(x));
  return res[0]
}


export async function updateDfhApiClass(pkEntity: number, item: Partial<NewDfhApiClass> = {}) {
  const x = item
  const sql = `
    WITH tw1 AS(
      UPDATE data_for_history.api_class
      SET ${keys(x).map((k, i) => `${k}= $${(i + 2)}`).join(',')}
      WHERE pk_entity = $1
      RETURNING *
    )
    SELECT ${keys(templateExisting).join(',')}
    FROM tw1;
  `
  const res: DfhApiClass[] = await testdb.execute(sql, [pkEntity, ...values(x)]);
  return res[0]
}

export async function deleteDfhApiClass(pkEntity: number) {
  const sql = `DELETE FROM data_for_history.api_class WHERE pk_entity = $1;`
  return testdb.execute(sql, [pkEntity]);
}


const templateNew: NewDfhApiClass = {
  dfh_pk_class: 100,
  dfh_class_identifier_in_namespace: 'C100',
  dfh_class_label_language: 'en',
  dfh_class_label: 'Default class',
  dfh_class_scope_note_language: 'en',
  dfh_class_scope_note: 'Default class scope note',
  dfh_basic_type: 9,
  dfh_basic_type_label: 'temporal_entity',
  dfh_fk_namespace: 1,
  dfh_namespace_label_language: 'en',
  dfh_namespace_label: 'Default namespace label',
  dfh_namespace_uri: 'defaultNamespaceUri',
  dfh_profile_association_type: 'selected',
  dfh_fk_profile: 5,
  dfh_profile_label_language: 'en',
  dfh_profile_label: 'Default Profile label',
}


const templateExisting: DfhApiClass = {
  pk_entity: 0,
  tmsp_last_modification: '',
  ...templateNew,
}