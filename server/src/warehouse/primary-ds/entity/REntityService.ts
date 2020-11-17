import {PrimaryDataService} from '../../base/classes/PrimaryDataService';
import {SqlUpsertQueue} from '../../base/classes/SqlUpsertQueue';
import {rEntityIdToString, stringToREntityId} from '../../base/functions';
import {Warehouse} from '../../Warehouse';
import {KeyDefinition} from '../../base/interfaces/KeyDefinition';

export interface REntity {
    pkEntity: number
    fkClass: number
    entityType: 'peIt' | 'teEn'
    isInProjectCount: number
}
export interface REntityId {pkEntity: number}
export const rEntityKeyConfig: KeyDefinition[] = [
    {name: 'pkEntity', type: 'integer'}
]
export class REntityService extends PrimaryDataService<REntityId, REntity>{

    measure = 1000;

    upsertQueue: SqlUpsertQueue<REntityId, REntity>;
    constructor(public wh: Warehouse) {
        super(
            wh,
            [
                'modified_projects_info_proj_rel',
                'modified_information_persistent_item',
                'modified_information_temporal_entity'
            ],
            rEntityIdToString,
            stringToREntityId,
            rEntityKeyConfig
        )

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
                // wh.agg.rEntityLabel.updater.addItemToQueue(item.key).catch(e => console.log(e))
                // wh.agg.rEntityClassLabel.updater.addItemToQueue(item.key).catch(e => console.log(e))
                // wh.agg.rEntityType.updater.addItemToQueue(item.key).catch(e => console.log(e))
                // if (item.val.entityType === 'teEn') wh.agg.rEntityTimeSpan.updater.addItemToQueue(item.key).catch(e => console.log(e))
                // wh.agg.rEntityFullText.updater.addItemToQueue(item.key).catch(e => console.log(e))

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

    getUpdatesSql(tmsp: Date) {
        return updateSql
    }
    getDeletesSql(tmsp: Date) {return ''};

    get2ndUpdatesSql(tableAlias: string) {
        return `
        INSERT INTO war.entity_preview (pk_entity, fk_project, project, fk_class, entity_type)
        SELECT "pkEntity", null, 0, fk_class, entity_type
        FROM ${tableAlias}
        ON CONFLICT (pk_entity, project) DO UPDATE
        SET fk_class = EXCLUDED.fk_class, entity_type = EXCLUDED.entity_type
        WHERE EXCLUDED.fk_class IS DISTINCT FROM war.entity_preview.fk_class OR EXCLUDED.entity_type IS DISTINCT FROM war.entity_preview.entity_type`
    }


}



export const updateSql = `
        WITH tw1 AS(
            SELECT
            t1.pk_entity,
            t1.fk_class,
            'teEn' as entity_type,
            count(t2.pk_entity) filter(where is_in_project = true) is_in_project_count
    FROM
    information.temporal_entity t1
    JOIN projects.info_proj_rel t2 ON	t2.fk_entity = t1.pk_entity
    AND(
                t1.tmsp_last_modification >= $1
        OR
        t2.tmsp_last_modification >= $1
            )
    GROUP BY t1.pk_entity, t1.fk_class, entity_type
    UNION ALL
    SELECT
            t1.pk_entity,
            t1.fk_class,
            'peIt' as entity_type,
            count(t2.pk_entity) filter(where is_in_project = true) is_in_project_count
    FROM
    information.persistent_item t1
    JOIN projects.info_proj_rel t2 ON	t2.fk_entity = t1.pk_entity
    AND(
                t1.tmsp_last_modification >= $1
        OR
        t2.tmsp_last_modification >= $1
            )
    GROUP BY t1.pk_entity, t1.fk_class, entity_type
        )
        SELECT
            t1.pk_entity "pkEntity",
            t1.fk_class,
            t1.entity_type,
            jsonb_build_object(
                'pkEntity', t1.pk_entity,
                'fkClass', t1.fk_class,
                'entityType', t1.entity_type,
                'isInProjectCount', t1.is_in_project_count
            ) val
        FROM tw1 AS t1
            `
