import {IndexDBGeneric} from '../base/classes/IndexDBGeneric';
import {Logger} from '../base/classes/Logger';
import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {entityIdToString, stringToEntityId} from '../base/functions';
import {Warehouse} from '../Warehouse';
import {SqlUpsertQueue} from '../base/classes/SqlUpsertQueue';
export interface PEntityId {fkProject: number, pkEntity: number}

export class PEntityService extends PrimaryDataService<InitItem, PEntityId, ProjectEntity>{

    measure = 1000;

    index = new IndexDBGeneric<PEntityId, ProjectEntity>(entityIdToString, stringToEntityId)

    constructor(public wh: Warehouse) {
        super(wh, [
            'modified_projects_info_proj_rel',
            'modified_information_persistent_item',
            'modified_information_temporal_entity'
        ])

        const upsertQueue = new SqlUpsertQueue<PEntityId, ProjectEntity>(
            'war.entity_preview (pk_entity,fk_project,fk_class)',
            wh.pgClient,
            (valuesStr: string) => `
                INSERT INTO war.entity_preview (pk_entity, fk_project, project, fk_class, entity_type)
                VALUES ${valuesStr}
                ON CONFLICT (pk_entity, project) DO UPDATE
                SET fk_class = EXCLUDED.fk_class, entity_type = EXCLUDED.entity_type
                WHERE EXCLUDED.fk_class IS DISTINCT FROM war.entity_preview.fk_class OR EXCLUDED.entity_type IS DISTINCT FROM war.entity_preview.entity_type;`,
            (item) => [item.key.pkEntity, item.key.fkProject, item.key.fkProject, item.val.fkClass, item.val.entityType],
            entityIdToString
        )

        /**
         * Add actions after a new ProjectEntity is put/updated into index
         */
        this.afterPut$.subscribe(item => {
            // Add update requests on aggregaters based on project entity
            wh.agg.pEntityLabel.updater.addItemToQueue(item.key).catch(e => console.log(e))
            wh.agg.pEntityClassLabel.updater.addItemToQueue(item.key).catch(e => console.log(e))
            wh.agg.pEntityType.updater.addItemToQueue(item.key).catch(e => console.log(e))
            if(item.val.entityType === 'teEn') wh.agg.pEntityTimeSpan.updater.addItemToQueue(item.key).catch(e => console.log(e))

            // Add item to queue to upsert it into db
            upsertQueue.add(item)
        })

        /**
        * Remove entity preview from db
        */
        this.afterDel$.subscribe(item => {
            this.deleteEntityPreview(item)
        })


    }

    dbItemToKeyVal(item: InitItem): {key: PEntityId; val: ProjectEntity;} {
        const key: PEntityId = {
            pkEntity: item.pkEntity,
            fkProject: item.fkProject,
        };
        const val: ProjectEntity = {
            pkEntity: item.pkEntity,
            fkClass: item.fkClass,
            fkProject: item.fkProject,
            entityType: item.entityType
        };
        return {key, val}
    }

    getUpdatesSql(tmsp: Date) {
        return updateSql
    }
    getDeletesSql(tmsp: Date) {
        return deleteSql
    };

    deleteEntityPreview(key: PEntityId) {
        const params = [key.pkEntity, key.fkProject];

        const q = `
        DELETE FROM war.entity_preview
        WHERE pk_entity = $1
        AND fk_project = $2;`
        this.wh.pgClient.query(q, params)
            .then(() => {
                Logger.msg(`deleted a entity preview`, 2)
            })
            .catch(e => {
                console.log(e)
            })

    }


}


interface InitItem {
    fkProject: number,
    pkEntity: number,
    fkClass: number,
    entityType: 'peIt' | 'teEn'
}

export const updateSql = `
SELECT
    t1.fk_project "fkProject",
	t2.pk_entity "pkEntity",
    t2.fk_class "fkClass",
    'peIt' as "entityType"
FROM
projects.info_proj_rel t1
JOIN information.persistent_item t2 ON t1.fk_entity = t2.pk_entity
WHERE t1.is_in_project=true
AND (
    t1.tmsp_last_modification >= $1
    OR
    t2.tmsp_last_modification >= $1
)
UNION ALL
SELECT
    t1.fk_project "fkProject",
	t2.pk_entity "pkEntity",
	t2.fk_class "fkClass",
    'teEn' as "entityType"
FROM
projects.info_proj_rel t1
JOIN information.temporal_entity t2 ON t1.fk_entity = t2.pk_entity
WHERE t1.is_in_project=true
AND (
    t1.tmsp_last_modification >= $1
    OR
    t2.tmsp_last_modification >= $1
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
AND t1.tmsp_last_modification >= $1
UNION ALL
SELECT
    t1.fk_project "fkProject",
	t2.pk_entity "pkEntity",
	t2.fk_class "fkClass"
FROM
projects.info_proj_rel t1
JOIN information.temporal_entity t2 ON t1.fk_entity = t2.pk_entity
WHERE t1.is_in_project=false
AND t1.tmsp_last_modification >= $1
`
export interface ProjectEntity {
    pkEntity: number
    fkClass: number
    fkProject: number
    entityType: 'peIt' | 'teEn'
}


