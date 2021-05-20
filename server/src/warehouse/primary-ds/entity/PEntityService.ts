import {PrimaryDataService} from '../../base/classes/PrimaryDataService';
import {KeyDefinition} from '../../base/interfaces/KeyDefinition';
import {Warehouse} from '../../Warehouse';
import {Injectable, Inject, forwardRef} from 'injection-js';

export interface PEntityId {fkProject: number, pkEntity: number}
export const pEntityKeyDefs: KeyDefinition[] = [
    {
        name: 'pkEntity',
        type: 'integer'
    },
    {
        name: 'fkProject',
        type: 'integer'
    }
]
@Injectable()
export class PEntityService extends PrimaryDataService< PEntityId, PEntity>{

    measure = 1000;

    constructor(@Inject(forwardRef(() => Warehouse)) wh: Warehouse) {
        super(wh, [
            'modified_projects_info_proj_rel',
            'modified_information_resource'
        ],
            pEntityKeyDefs
        )


        /**
        * Remove entity preview from db
        */
        // this.afterDel$.subscribe(item => {
            // wh.agg.pEntityLabel.del(item).catch(e => console.log(e))
            // wh.agg.pEntityClassLabel.del(item).catch(e => console.log(e))
            // wh.agg.pEntityType.del(item).catch(e => console.log(e))
            // wh.agg.pEntityTimeSpan.del(item).catch(e => console.log(e))
            // wh.agg.pEntityFullText.del(item).catch(e => console.log(e))

            // this.deleteEntityPreview(item).catch(e => console.log(e))
        // })


    }

    getUpdatesSql(tmsp: Date) {
        return updateSql
    }
    getDeletesSql(tmsp: Date) {
        return deleteSql
    };
    get2ndUpdatesSql(tableAlias: string) {
        return `
        INSERT INTO war.entity_preview (pk_entity, fk_project, project, fk_class, entity_type)
        SELECT "pkEntity", "fkProject", "fkProject", "fkClass", "entityType"
        FROM ${tableAlias}
        ON CONFLICT (pk_entity, project) DO UPDATE
        SET fk_class = EXCLUDED.fk_class, entity_type = EXCLUDED.entity_type
        WHERE EXCLUDED.fk_class IS DISTINCT FROM war.entity_preview.fk_class
        OR EXCLUDED.entity_type IS DISTINCT FROM war.entity_preview.entity_type
        `
    }
    get2ndDeleteSql(tableAlias: string) {
        return `
        DELETE FROM war.entity_preview
        USING ${tableAlias}
        WHERE pk_entity = ${tableAlias}."pkEntity"
        AND fk_project = ${tableAlias}."fkProject"
        `
    }
    dbItemToKeyVal = undefined
}



export const updateSql = `
WITH tw1 AS (

    SELECT
        t1.fk_project,
        t2.pk_entity,
        t2.fk_class,
		CASE WHEN  t3.basic_type IN (8,30) THEN 'peIt'
		ELSE 'teEn' END as "entity_type"
    FROM
    projects.info_proj_rel t1
    JOIN information.resource t2 ON t1.fk_entity = t2.pk_entity
	JOIN data_for_history.v_class t3 ON t2.fk_class = t3.pk_class
    WHERE t1.is_in_project=true
    AND t1.tmsp_last_modification >= $1

	UNION

    SELECT
        t1.fk_project,
        t2.pk_entity,
        t2.fk_class,
		CASE WHEN  t3.basic_type IN (8,30) THEN 'peIt'
		ELSE 'teEn' END as "entity_type"
    FROM
    projects.info_proj_rel t1
    JOIN information.resource t2 ON t1.fk_entity = t2.pk_entity
    JOIN data_for_history.v_class t3 ON t2.fk_class = t3.pk_class
    WHERE t1.is_in_project=true
    AND t2.tmsp_last_modification >= $1

),
tw2 AS (
    INSERT INTO war.entity_preview (pk_entity, fk_project, project, fk_class, entity_type)
    SELECT pk_entity, fk_project, fk_project, fk_class, entity_type
    FROM tw1
    ON CONFLICT (pk_entity, project) DO UPDATE
    SET fk_class = EXCLUDED.fk_class, entity_type = EXCLUDED.entity_type
    WHERE EXCLUDED.fk_class IS DISTINCT FROM war.entity_preview.fk_class
    OR EXCLUDED.entity_type IS DISTINCT FROM war.entity_preview.entity_type
)
SELECT
    tw1.fk_project "fkProject",
    tw1.pk_entity "pkEntity",
    tw1.fk_class "fkClass",
    tw1.entity_type "entityType",
    jsonb_build_object(
        'pkEntity', tw1.pk_entity,
        'fkProject', tw1.fk_project,
        'fkClass', tw1.fk_class,
        'entityType', tw1.entity_type
    ) val
FROM tw1
        `
export const deleteSql = `
WITH tw1 AS (
    SELECT
        t1.fk_project "fkProject",
        t2.pk_entity "pkEntity"
    FROM
    projects.info_proj_rel t1
    JOIN information.resource t2 ON t1.fk_entity = t2.pk_entity
    WHERE t1.is_in_project=false
    AND t1.tmsp_last_modification >= $1
),
tw2 AS (
    DELETE FROM war.entity_preview
    USING tw1
    WHERE pk_entity = tw1."pkEntity"
    AND fk_project = tw1."fkProject"
)
SELECT * FROM tw1
`
export interface PEntity {
    pkEntity: number
    fkClass: number
    fkProject: number
    entityType: 'peIt' | 'teEn'
}



