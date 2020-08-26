import {IndexDBGeneric} from '../base/classes/IndexDBGeneric';
import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {pClassIdToString, stringToPClassId} from '../base/functions';
import {Warehouse} from '../Warehouse';
export interface PClassId {fkProject: number, pkClass: number}

export class PClassService extends PrimaryDataService<InitItem, PClassId, ProjectClass>{

    measure = 1000;
    get updatesSql() {
        return updateSql
    };
    get deletesSql() {
        return deleteSql
    };

    index = new IndexDBGeneric<PClassId, ProjectClass>(pClassIdToString, stringToPClassId)

    constructor(public wh: Warehouse) {
        super(wh, [
            'modified_projects_dfh_profile_proj_rel',
            'modified_data_for_history_api_class'
        ])

        /**
         * Add actions after a new ProjectClass is put/updated into index
         */
        this.afterPut$.subscribe(item => {
            // Add update requests on aggregaters based on project class
            wh.agg.pClassLabel.updater.addItemToQueue(item.key).catch(e => console.log(e))
        })

        /**
        * Remove class preview from db
        */
        this.afterDel$.subscribe(item => {
        })


    }

    dbItemToKeyVal(item: InitItem): {key: PClassId; val: ProjectClass;} {
        const key: PClassId = {
            pkClass: item.fkClass,
            fkProject: item.fkProject,
        };
        const val: ProjectClass = {
            fkClass: item.fkClass,
            fkProject: item.fkProject,
        };
        return {key, val}
    }


}


interface InitItem {
    fkProject: number,
    fkClass: number,
}

const updateSql = `
  WITH tw1 AS (
    SELECT fk_profile, fk_project, enabled, tmsp_last_modification
    FROM projects.dfh_profile_proj_rel
    WHERE enabled = true
    UNION
    SELECT 5, pk_entity as fk_project, true, null -- GEOVISTORY BASICS
    FROM projects.project
  )
  SELECT DISTINCT
    dfh_pk_class "fkClass",
    fk_project "fkProject"
  FROM
    tw1 t1,
    data_for_history.api_class t2
  WHERE t1.fk_profile = t2.dfh_fk_profile
  AND (
        t1.tmsp_last_modification >= $1
        OR
        t2.tmsp_last_modification >= $1
  );
`
export const deleteSql = `
  WITH tw1 AS (
    SELECT fk_profile, fk_project, enabled, tmsp_last_modification
    FROM projects.dfh_profile_proj_rel
    WHERE enabled = false
    AND tmsp_last_modification >= $1
  )
  SELECT DISTINCT
    dfh_pk_class "pkClass",
    fk_project "fkProject"
  FROM
    tw1 t1,
    data_for_history.api_class t2
  WHERE t1.fk_profile = t2.dfh_fk_profile;
`
export interface ProjectClass {
    fkClass: number
    fkProject: number
}



