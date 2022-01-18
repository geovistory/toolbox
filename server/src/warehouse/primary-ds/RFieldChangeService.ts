/* eslint-disable @typescript-eslint/naming-convention */
import {forwardRef, Inject, Injectable} from 'injection-js';
import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {KeyDefinition} from '../base/interfaces/KeyDefinition';
import {Warehouse} from '../Warehouse';
export interface PFieldChangeId {
   fkProject: number;

   fkSourceInfo: number;
   fkSourceTablesCell: number;

   fkProperty: number;
   fkPropertyOfProperty: number;

   isOutgoing: boolean;


}
export interface PFieldChangeVal {
   tmspLastModification: string
}
export const rStatementKeyDefs: KeyDefinition[] = [

   {name: 'fkSourceInfo', type: 'integer'},
   {name: 'fkSourceTablesCell', type: 'integer'},

   {name: 'fkProperty', type: 'integer'},
   {name: 'fkPropertyOfProperty', type: 'integer'},

   {name: 'isOutgoing', type: 'boolean'},
]

@Injectable()
export class RFieldChangeService extends PrimaryDataService<PFieldChangeId, PFieldChangeVal>{

   measure = 10000;


   constructor(@Inject(forwardRef(() => Warehouse)) wh: Warehouse) {
      super(
         wh,
         [
            'modified_projects_info_proj_rel',
         ],
         rStatementKeyDefs
      )
      this.registerUpdateReplication(
         'war.field_change',
         (insertClause: string, fromClause: string) => `
      INSERT INTO war.field_change (
         fk_project,
         fk_source_info,
         fk_source_tables_cell,
         fk_property,
         fk_property_of_property,
         is_outgoing,
         tmsp_last_modification
      )
      SELECT
         0,
         t1."fkSourceInfo",
         t1."fkSourceTablesCell",
         t1."fkProperty",
         t1."fkPropertyOfProperty",
         t1."isOutgoing",
        (t1.val->>'tmspLastModification')::timestamp with time zone
      FROM ${fromClause} t1
      ON CONFLICT (
         fk_project,
         fk_source_info,
         fk_source_tables_cell,
         fk_property,
         fk_property_of_property,
         is_outgoing
      ) DO UPDATE
      SET
         fk_project = EXCLUDED.fk_project,
         fk_source_info = EXCLUDED.fk_source_info,
         fk_source_tables_cell = EXCLUDED.fk_source_tables_cell,
         fk_property = EXCLUDED.fk_property,
         fk_property_of_property = EXCLUDED.fk_property_of_property,
         is_outgoing = EXCLUDED.is_outgoing,
         tmsp_last_modification = EXCLUDED.tmsp_last_modification
      `
      )
   }


   getUpdatesSql(tmsp: Date) {
      return updateSql
   }
   getDeletesSql(tmsp: Date) {return ''};

}


const updateSql = `
 -- select last modification tmsp of incoming fields
 SELECT
    json_build_object('tmspLastModification',max(t1.tmsp_last_modification)) val,
    t2.fk_object_info "fkSourceInfo",
    t2.fk_object_tables_cell "fkSourceTablesCell",
    t2.fk_property "fkProperty",
    t2.fk_property_of_property "fkPropertyOfProperty",
    false "isOutgoing"
 FROM
    projects.info_proj_rel t1,
    information."statement" t2
 WHERE
    t1.fk_entity = t2.pk_entity
 AND
   (t2.fk_object_info != 0 OR t2.fk_object_tables_cell != 0)
 AND
    t1.tmsp_last_modification > $1
 GROUP BY
    t1.fk_project,
    t2.fk_object_info,
    t2.fk_object_tables_cell,
    t2.fk_property,
    t2.fk_property_of_property

 UNION ALL

 -- select last modification tmsp of outgoing fields
 SELECT
    json_build_object('tmspLastModification',max(t1.tmsp_last_modification)) val,
    t2.fk_subject_info "fkSourceInfo",
    t2.fk_subject_tables_cell "fkSourceTablesCell",
    t2.fk_property "fkProperty",
    t2.fk_property_of_property "fkPropertyOfProperty",
    true "isOutgoing"
 FROM
     projects.info_proj_rel t1,
     information."statement" t2
 WHERE
    t1.fk_entity = t2.pk_entity
 AND
   (t2.fk_subject_info != 0 OR t2.fk_subject_tables_cell != 0)
 AND
    t1.tmsp_last_modification > $1
 GROUP BY
    t1.fk_project,
    t2.fk_subject_info,
    t2.fk_subject_tables_cell,
    t2.fk_property,
    t2.fk_property_of_property;
`

