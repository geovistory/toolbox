// import {PrimaryDataService} from '../base/classes/PrimaryDataService';
// import {fieldIdToString, stringToFieldId} from '../base/functions';
// import {IndexDBGeneric} from '../base/classes/IndexDBGeneric';
// import {Warehouse} from '../Warehouse';

// export interface PFieldId {
//   fkProject: number,
//   fkClass: number
//   fkProperty: number
//   isOutgoing: boolean
// }

// export class PFieldLabelService extends PrimaryDataService<InitItem, PFieldId, string> {

//   measure = 1000;
//   updatesSql = initSql;
//   deletesSql = ''
//   index = new IndexDBGeneric<PFieldId, string>(fieldIdToString, stringToFieldId)

//   constructor(wh: Warehouse) {
//     super(wh, [])
//   }

//   dbItemToKeyVal(item: InitItem): {key: PFieldId; val: string;} {

//     const fkClass = item.fkPropertyDomain || item.fkPropertyRange
//     const isOutgoing = !!item.fkPropertyDomain;
//     const key: PFieldId = {
//       fkProject: item.fkProject,
//       fkClass: fkClass,
//       fkProperty: item.fkProperty,
//       isOutgoing
//     }
//     const val = item.label;
//     return {key, val}
//   }


//   async clearAll() {
//     await this.index.clearIdx()
//   }
// }


// interface InitItem {
//   fkProject: number,
//   fkProperty: number,
//   fkPropertyDomain: number,
//   fkPropertyRange: number,
//   label: string
// }


// export const initSql = `
// WITH tw0 AS (
//   SELECT
//     project.pk_entity,
//     project.fk_language,
//     project.tmsp_last_modification
//   FROM
//     projects.project
//   UNION ALL
//   SELECT
//     NULL::integer AS int4,
//     18889,
//     NULL::timestamp
// ),
// tw1 AS (
//   SELECT
//     t2.fk_dfh_property AS fk_property,
//     t2.fk_dfh_property_domain AS fk_property_domain,
//     t2.fk_dfh_property_range AS fk_property_range,
//     t1.pk_entity AS fk_project,
//     t2.string AS label,
//     1 AS rank,
//     'project label'::text AS text,
//     t2.tmsp_last_modification,
//     t1.tmsp_last_modification AS tmsp_last_modification_project
//   FROM
//     tw0 t1,
//     projects.text_property t2
//   WHERE
//     t1.pk_entity = t2.fk_project
//     AND t2.fk_dfh_property IS NOT NULL
//     AND t2.fk_language = t1.fk_language
//   UNION ALL
//   SELECT
//     t2.fk_dfh_property AS fk_property,
//     t2.fk_dfh_property_domain AS fk_property_domain,
//     t2.fk_dfh_property_range AS fk_property_range,
//     t1.pk_entity AS fk_project,
//     t2.string AS label,
//     2 AS rank,
//     'default project label in default lang'::text AS text,
//     t2.tmsp_last_modification,
//     t1.tmsp_last_modification AS tmsp_last_modification_project
//   FROM
//     tw0 t1,
//     projects.text_property t2
//   WHERE
//     375669 = t2.fk_project
//     AND t2.fk_dfh_property IS NOT NULL
//     AND t2.fk_language = t1.fk_language
//   UNION ALL SELECT DISTINCT
//     t3.fk_property,
//     t4.has_domain AS fk_property_domain,
//     NULL::int AS fk_property_range,
//     t1.pk_entity AS fk_project,
//     t3.label,
//     3 AS rank,
//     'ontome label in default lang'::text AS text,
//     t2.tmsp_last_modification,
//     t1.tmsp_last_modification AS tmsp_last_modification_project
//   FROM
//     tw0 t1,
//     information.language t2,
//     data_for_history.v_label t3,
//     data_for_history.v_property t4
//   WHERE
//     t3.fk_property IS NOT NULL
//     AND t3.language::bpchar = t2.iso6391
//     AND t3.type = 'label'::text
//     AND t4.pk_property = t3.fk_property
//     -- FOR REVERSE LABELS OF ONTOME: ADD OTHER 'UNION ALL ...'-BLOCK HERE
//   UNION ALL
//   SELECT
//     t2.fk_dfh_property AS fk_property,
//     t2.fk_dfh_property_domain AS fk_property_domain,
//     t2.fk_dfh_property_range AS fk_property_range,
//     t1.pk_entity AS fk_project,
//     t2.string AS label,
//     4 AS rank,
//     'default project label in en'::text AS text,
//     t2.tmsp_last_modification,
//     t1.tmsp_last_modification AS tmsp_last_modification_project
//   FROM
//     tw0 t1,
//     projects.text_property t2
//   WHERE
//     375669 = t2.fk_project
//     AND t2.fk_dfh_property IS NOT NULL
//     AND t2.fk_language = 18889
//   UNION ALL SELECT DISTINCT
//     t3.fk_property,
//     t4.has_domain AS fk_property_domain,
//     NULL::int AS fk_property_range,
//     t1.pk_entity AS fk_project,
//     t3.label,
//     5 AS rank,
//     'ontome label in en'::text AS text,
//     NULL::timestamp,
//     t1.tmsp_last_modification AS tmsp_last_modification_project
//   FROM
//     tw0 t1,
//     data_for_history.v_label t3,
//     data_for_history.v_property t4
//   WHERE
//     t3.fk_property IS NOT NULL
//     AND t3.language::text = 'en'::text
//     AND t3.type = 'label'::text
//     AND t4.pk_property = t3.fk_property
//     -- FOR REVERSE LABELS OF ONTOME: ADD OTHER 'UNION ALL ...'-BLOCK HERE
// ),
// tw2 AS (
//   SELECT DISTINCT ON (tw1.fk_project, tw1.fk_property)
//     tw1.fk_property "fkProperty",
//     tw1.fk_property_domain "fkPropertyDomain",
//     tw1.fk_property_range "fkPropertyRange",
//     tw1.fk_project "fkProject",
//     tw1.label,
//     tw1.tmsp_last_modification,
//     tw1.tmsp_last_modification_project
//   FROM
//     tw1
//   ORDER BY
//     tw1.fk_project,
//     tw1.fk_property,
//     tw1.rank
// )
// SELECT
//     tw2."fkProperty",
//     tw2."fkPropertyDomain",
//     tw2."fkPropertyRange",
//     tw2."fkProject",
//     tw2.label,
//     tw2.tmsp_last_modification,
//     tw2.tmsp_last_modification_project
// FROM
//   tw2
// WHERE (
//   tw2.tmsp_last_modification >= $1
//   OR
//   tw2.tmsp_last_modification_project >= $1
// )
// `;

// export interface FieldLabelIdx {
//   [fkProject: number]: {
//     [fkClass: number]: {
//       [fkProperty: number]: {
//         outgoing?: string
//         incoming?: string
//       }
//     }
//   }
// }


