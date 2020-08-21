import { entityIdToString, stringToEntityId } from '../base/functions';
import { IndexDBGeneric } from '../base/classes/IndexDBGeneric';
import { PrimaryDataService } from '../base/classes/PrimaryDataService';
import { Warehouse } from '../Warehouse';


export interface EntityId { fkProject: number | null, pkEntity: number }

export class EntityService extends PrimaryDataService<InitItem, EntityId, Entity>{

    measure = 1000;
    updatesSql = updateSql;
    deletesSql = deleteSql;

    index = new IndexDBGeneric<EntityId, Entity>(entityIdToString, stringToEntityId)

    constructor(main: Warehouse) {
        super(main, [
            'modified_projects_info_proj_rel',
            'modified_information_persistent_item',
            'modified_information_temporal_entity'
        ])
    }
    dbItemToKeyVal(item: InitItem): { key: EntityId; val: Entity; } {
        const key: EntityId = {
            pkEntity: item.pkEntity,
            fkProject: item.fkProject,
        };
        const val: Entity = {
            pkEntity: item.pkEntity,
            fkClass: item.fkClass,
            fkProject: item.fkProject,
        };
        return { key, val }
    }

}


interface InitItem {
    fkProject: number,
    pkEntity: number,
    fkClass: number
}

export const updateSql = `
SELECT
    t1.fk_project "fkProject",
	t2.pk_entity "pkEntity",
	t2.fk_class "fkClass"
FROM
projects.info_proj_rel t1
JOIN information.persistent_item t2 ON t1.fk_entity = t2.pk_entity
WHERE t1.is_in_project=true
AND (
    t1.tmsp_last_modification > $1
    OR
    t2.tmsp_last_modification > $1
)
UNION ALL
SELECT
    t1.fk_project "fkProject",
	t2.pk_entity "pkEntity",
	t2.fk_class "fkClass"
FROM
projects.info_proj_rel t1
JOIN information.temporal_entity t2 ON t1.fk_entity = t2.pk_entity
WHERE t1.is_in_project=true
AND (
    t1.tmsp_last_modification > $1
    OR
    t2.tmsp_last_modification > $1
);
`
export const deleteSql = `
SELECT
    t1.fk_project "fkProject",
	t2.pk_entity "pkEntity",
	t2.fk_class "fkClass"
FROM
projects.info_proj_rel t1
JOIN information.persistent_item t2 ON t1.fk_entity = t2.pk_entity
WHERE t1.is_in_project=false
AND t1.tmsp_last_modification > $1
UNION ALL
SELECT
    t1.fk_project "fkProject",
	t2.pk_entity "pkEntity",
	t2.fk_class "fkClass"
FROM
projects.info_proj_rel t1
JOIN information.temporal_entity t2 ON t1.fk_entity = t2.pk_entity
WHERE t1.is_in_project=false
AND t1.tmsp_last_modification > $1
`
export interface Entity {
    pkEntity: number
    fkClass: number
    fkProject: number
}



