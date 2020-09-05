import {IndexDBGeneric} from '../../base/classes/IndexDBGeneric';
import {PrimaryDataService} from '../../base/classes/PrimaryDataService';
import {SqlUpsertQueue} from '../../base/classes/SqlUpsertQueue';
import {rEntityIdToString, stringToREntityId} from '../../base/functions';
import {Warehouse} from '../../Warehouse';
export interface REntityId {pkEntity: number}

export class REntityService extends PrimaryDataService<InitItem, REntityId, REntity>{

    measure = 1000;

    index = new IndexDBGeneric<REntityId, REntity>(rEntityIdToString, stringToREntityId)
    upsertQueue: SqlUpsertQueue<REntityId, REntity>;
    constructor(public wh: Warehouse) {
        super(wh, [
            'modified_projects_info_proj_rel',
            'modified_information_persistent_item',
            'modified_information_temporal_entity'
        ])

        this.upsertQueue = new SqlUpsertQueue(
            wh,
            'war.entity_preview (pk_entity,fk_project,fk_class)',
            (valuesStr: string) => `
                INSERT INTO war.entity_preview (pk_entity, fk_project, project, fk_class, entity_type)
                VALUES ${valuesStr}
                ON CONFLICT (pk_entity, project) DO UPDATE
                SET fk_class = EXCLUDED.fk_class, entity_type = EXCLUDED.entity_type
                WHERE EXCLUDED.fk_class IS DISTINCT FROM war.entity_preview.fk_class OR EXCLUDED.entity_type IS DISTINCT FROM war.entity_preview.entity_type;`,
            (item) => [item.key.pkEntity, null, 0, item.val.fkClass, item.val.entityType],
            rEntityIdToString
        )

        /**
         * Add actions after a new ProjectEntity is put/updated into index
         */
        this.afterPut$.subscribe(item => {
            // exclude dirty data
            if (item.val.fkClass) {

                // Add update requests on aggregaters based on project entity
                wh.agg.rEntityLabel.updater.addItemToQueue(item.key).catch(e => console.log(e))
                wh.agg.rEntityClassLabel.updater.addItemToQueue(item.key).catch(e => console.log(e))
                wh.agg.rEntityType.updater.addItemToQueue(item.key).catch(e => console.log(e))
                if (item.val.entityType === 'teEn') wh.agg.rEntityTimeSpan.updater.addItemToQueue(item.key).catch(e => console.log(e))
                wh.agg.rEntityFullText.updater.addItemToQueue(item.key).catch(e => console.log(e))

                // Add item to queue to upsert it into db
                this.upsertQueue.add(item)
            }
        })

        /**
        * Remove entity preview from db
        */
        this.afterDel$.subscribe(item => {
        })


    }

    dbItemToKeyVal(item: InitItem): {key: REntityId; val: REntity;} {
        const key: REntityId = {
            pkEntity: item.pkEntity
        };
        const val: REntity = {
            pkEntity: item.pkEntity,
            fkClass: item.fkClass,
            entityType: item.entityType,
            isInProjectCount: parseInt(item.isInProjectCount, 10)
        };
        return {key, val}
    }

    getUpdatesSql(tmsp: Date) {
        return updateSql
    }
    getDeletesSql(tmsp: Date) {return ''};




}


interface InitItem {
    pkEntity: number,
    fkClass: number,
    entityType: 'peIt' | 'teEn',
    isInProjectCount: string
}

export const updateSql = `
SELECT
	t1.pk_entity "pkEntity",
	t1.fk_class "fkClass",
    'teEn' as "entityType",
	count(t2.pk_entity) filter (where is_in_project=true) "isInProjectCount"
FROM
information.temporal_entity t1
LEFT JOIN projects.info_proj_rel t2 ON	t2.fk_entity = t1.pk_entity
AND (
    t1.tmsp_last_modification >= $1
    OR
    t2.tmsp_last_modification >=  $1
)
GROUP BY t1.pk_entity, t1.fk_class, "entityType"
UNION ALL
SELECT
	t1.pk_entity "pkEntity",
	t1.fk_class "fkClass",
    'peIt' as "entityType",
	count(t2.pk_entity) filter (where is_in_project=true) "isInProjectCount"
FROM
information.persistent_item t1
LEFT JOIN projects.info_proj_rel t2 ON	t2.fk_entity = t1.pk_entity
AND (
    t1.tmsp_last_modification >= $1
    OR
    t2.tmsp_last_modification >=  $1
)
GROUP BY t1.pk_entity, t1.fk_class, "entityType"
`

export interface REntity {
    pkEntity: number
    fkClass: number
    entityType: 'peIt' | 'teEn'
    isInProjectCount: number
}



