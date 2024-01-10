/* eslint-disable @typescript-eslint/camelcase */
import {values} from 'lodash';
import {keys} from 'ramda';
import {TestDbFactory} from '../TestDbFactory';

/**
 * These helpers are independent of any loopback 4 repository
 * beacause loopack does not access the table data_for_history.api_property
 * directly (it uses data_for_history.v_class instead).
 */

export async function createDfhApiProperty(item: Partial<NewDfhApiProperty> = {}) {
  const x: NewDfhApiProperty = {...templateNew, ...item}
  const sql = `
    WITH tw1 AS(
      INSERT INTO data_for_history.api_property (${keys(x).join(',')})
      VALUES (${keys(x).map((k, i) => '$' + (i + 1)).join(',')})
      RETURNING *
    )
    SELECT ${keys(templateExisting).join(',')}
    FROM tw1;
  `
  const res: DfhApiProperty[] = await TestDbFactory.datasource.execute(sql, values(x));
  return res[0]
}


export async function updateDfhApiProperty(pkEntity: number, item: Partial<NewDfhApiProperty> = {}) {
  const x = item
  const sql = `
    WITH tw1 AS(
      UPDATE data_for_history.api_property
      SET ${keys(x).map((k, i) => `${k}= $${(i + 2)}`).join(',')}
      WHERE pk_entity = $1
      RETURNING *
    )
    SELECT ${keys(templateExisting).join(',')}
    FROM tw1;
  `
  const res: DfhApiProperty[] = await TestDbFactory.datasource.execute(sql, [pkEntity, ...values(x)]);
  return res[0]
}

export async function deleteDfhApiProperty(pkEntity: number) {
  const sql = `DELETE FROM data_for_history.api_property WHERE pk_entity = $1;`
  return TestDbFactory.datasource.execute(sql, [pkEntity]);
}


const templateNew: NewDfhApiProperty = {
  "dfh_fk_profile": 5,
  "dfh_pk_property": 1113,
  "dfh_fk_namespace": 3,
  "dfh_is_inherited": false,
  "removed_from_api": false,
  "dfh_namespace_uri": null,
  "dfh_profile_label": "Geovistory Basics",
  "dfh_property_label": "refers to name",
  "dfh_property_inverse_label": "is name of",
  "dfh_property_range": 40,
  "requested_language": "en",
  "dfh_namespace_label": "HistDMI generic classes and properties – ongoing",
  "dfh_property_domain": 365,
  "dfh_identity_defining": true,
  "is_enabled_in_profile": null,
  "dfh_property_scope_note": "This property associates the Appelation for language to the E41 Appelation that refers to it.",
  "dfh_profile_label_language": "en",
  "dfh_is_has_type_subproperty": false,
  "dfh_property_label_language": "en",
  "dfh_namespace_label_language": "en",
  "dfh_profile_association_type": null,
  "dfh_property_scope_note_language": "en",
  "dfh_range_instances_max_quantifier": 1,
  "dfh_range_instances_min_quantifier": 1,
  "dfh_domain_instances_max_quantifier": 1,
  "dfh_domain_instances_min_quantifier": 0,
  "dfh_property_identifier_in_namespace": "P11"
}


const templateExisting: DfhApiProperty = {
  pk_entity: 0,
  tmsp_last_modification: '',
  ...templateNew,
}

interface NewDfhApiProperty {
  is_enabled_in_profile: boolean | null,
  removed_from_api: boolean,
  requested_language: string,
  dfh_pk_property: number,
  dfh_property_label_language: string,
  dfh_property_label: string,
  dfh_property_inverse_label: string,
  dfh_property_scope_note_language: string,
  dfh_property_scope_note: string,
  dfh_is_inherited: boolean,
  dfh_property_domain: number,
  dfh_domain_instances_min_quantifier: number | null,
  dfh_domain_instances_max_quantifier: number | null,
  dfh_property_range: number,
  dfh_range_instances_min_quantifier: number | null,
  dfh_range_instances_max_quantifier: number | null,
  dfh_identity_defining: boolean,
  dfh_is_has_type_subproperty: boolean,
  dfh_property_identifier_in_namespace: string,
  dfh_namespace_uri: string | null,
  dfh_fk_namespace: number,
  dfh_namespace_label_language: string,
  dfh_namespace_label: string,
  dfh_profile_association_type: string | null,
  dfh_fk_profile: number,
  dfh_profile_label_language: string,
  dfh_profile_label: string,
}
export interface DfhApiProperty extends NewDfhApiProperty {
  pk_entity: number,
  tmsp_last_modification: string
}
