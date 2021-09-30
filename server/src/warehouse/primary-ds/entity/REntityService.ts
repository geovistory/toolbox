import {forwardRef, Inject, Injectable} from 'injection-js';
import {PrimaryDataService} from '../../base/classes/PrimaryDataService';
import {KeyDefinition} from '../../base/interfaces/KeyDefinition';
import {Warehouse} from '../../Warehouse';

export interface REntity {
    pkEntity: number
    fkClass: number
    entityType: 'peIt' | 'teEn'
    isInProjectCount: number
}
export interface REntityId {pkEntity: number}
export const rEntityKeyDefs: KeyDefinition[] = [
    {name: 'pkEntity', type: 'integer'}
]
@Injectable()
export class REntityService extends PrimaryDataService<REntityId, REntity>{

    measure = 1000;

    constructor(@Inject(forwardRef(() => Warehouse)) wh: Warehouse) {
        super(
            wh,
            [
                'modified_projects_info_proj_rel',
                'modified_information_resource'
            ],
            rEntityKeyDefs
        )


        /**
         * Add actions after a new ProjectEntity is put/updated into index
         */
        // this.afterPut$.subscribe(item => {
        //     // exclude dirty data
        //     if (item.val.fkClass) {

        //         // Add update requests on aggregaters based on project entity
        //         // wh.agg.rEntityLabel.updater.addItemToQueue(item.key).catch(e => console.log(e))
        //         // wh.agg.rEntityClassLabel.updater.addItemToQueue(item.key).catch(e => console.log(e))
        //         // wh.agg.rEntityType.updater.addItemToQueue(item.key).catch(e => console.log(e))
        //         // if (item.val.entityType === 'teEn') wh.agg.rEntityTimeSpan.updater.addItemToQueue(item.key).catch(e => console.log(e))
        //         // wh.agg.rEntityFullText.updater.addItemToQueue(item.key).catch(e => console.log(e))

        //         // Add item to queue to upsert it into db
        //         this.upsertQueue.add(item)
        //     }
        // })

    }

    getUpdatesSql(tmsp: Date) {
        return updateSql
    }
    getDeletesSql(tmsp: Date) {return deleteSql};

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
WITH tw1 AS (
    SELECT
        t2.pk_entity,
        t2.fk_class,
		CASE WHEN  t3.basic_type IN (8,30) THEN 'peIt'
		ELSE 'teEn' END as "entity_type"
    FROM
    projects.info_proj_rel t1
    JOIN information.resource t2 ON t1.fk_entity = t2.pk_entity
        AND (t2.community_visibility->>'toolbox')::boolean=true
    JOIN data_for_history.v_class t3 ON t2.fk_class = t3.pk_class
        AND t1.tmsp_last_modification >=  $1

	UNION

	SELECT
	t2.pk_entity,
	t2.fk_class,
    CASE WHEN  t3.basic_type IN (8,30) THEN 'peIt'
    ELSE 'teEn' END as "entity_type"
    FROM information.resource t2
	JOIN data_for_history.v_class t3 ON t2.fk_class = t3.pk_class
    WHERE t2.tmsp_last_modification >=  $1
        AND (t2.community_visibility->>'toolbox')::boolean=true
    ),
    tw2 AS (
        INSERT INTO war.entity_preview (pk_entity, fk_project, project, fk_class, entity_type)
        SELECT pk_entity, null, 0, fk_class, entity_type
        FROM tw1
        ON CONFLICT (pk_entity, project) DO UPDATE
        SET fk_class = EXCLUDED.fk_class, entity_type = EXCLUDED.entity_type
        WHERE EXCLUDED.fk_class IS DISTINCT FROM war.entity_preview.fk_class OR EXCLUDED.entity_type IS DISTINCT FROM war.entity_preview.entity_type

    )
    SELECT
    tw1.pk_entity "pkEntity",
    tw1.fk_class,
    tw1.entity_type,
    jsonb_build_object(
        'pkEntity', tw1.pk_entity,
        'fkClass', tw1.fk_class,
        'entityType', tw1.entity_type,
		'isInProjectCount', count(t2.pk_entity)
    ) val
    FROM tw1
    LEFT JOIN projects.info_proj_rel t2
    ON tw1.pk_entity = t2.fk_entity AND t2.is_in_project= true
    GROUP BY
    tw1.pk_entity,
    tw1.fk_class,
    tw1.entity_type



            `

export const deleteSql = `
            WITH tw1 AS (
                SELECT t2.pk_entity "pkEntity"
                FROM information.resource t2
                WHERE t2.tmsp_last_modification >= $1
                AND (t2.community_visibility->>'toolbox')::boolean IS DISTINCT FROM true
            ),
            tw2 AS (
                DELETE FROM war.entity_preview
                USING tw1
                WHERE pk_entity = tw1."pkEntity"
                AND fk_project IS NULL
            )
            SELECT * FROM tw1
            `
