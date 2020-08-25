import {Client} from 'pg';
import {BehaviorSubject, race, timer} from 'rxjs';
import {filter, first} from 'rxjs/operators';
import {IndexDBGeneric} from '../base/classes/IndexDBGeneric';
import {Logger} from '../base/classes/Logger';
import {PrimaryDataService} from '../base/classes/PrimaryDataService';
import {entityIdToString, stringToEntityId} from '../base/functions';
import {Warehouse} from '../Warehouse';
import {values} from 'ramda';
class SqlQueue {
    queue: {[uniq: string]: (number | null)[]} = {}
    queueLength = 0

    queueLength$ = new BehaviorSubject<number>(0)
    queueing = false;

    constructor(
        private pgClient: Client,
        private maxQueueLength = 1000,
        private maxQueueTime = 200
    ) {


    }
    activateQueue() {
        this.queueing = true
        race(
            this.queueLength$.pipe(filter(length => length >= this.maxQueueLength)),
            timer(this.maxQueueTime)
        ).pipe(first()).subscribe(() => {
            this.queueing = false
            this.fire()
        })
    }
    /**
     * adds item to queue
     */
    add(item: {key: EntityId; val: Entity;}) {
        if (!this.queueing) this.activateQueue()

        const params = [item.key.pkEntity, item.key.fkProject, item.key.fkProject, item.val.fkClass];
        this.queue[entityIdToString(item.key)] = params;
        this.queueLength++
        // this.items.push(params);
        this.queueLength$.next(this.queueLength)
    }

    /**
     * creates and fires sql
     * resets queue
     */
    fire() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params: any[] = []
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const addParam = (val: any) => {
            params.push(val)
            return '$' + params.length;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const addParams = (vals: any[]) => {
            return vals.map(val => addParam(val)).join(',');
        }

        const length = this.queueLength;
        const q = `
        INSERT INTO war.entity_preview (pk_entity, fk_project, project, fk_class)
        VALUES ${values(this.queue).map(row => `(${addParams(row)})`).join(',')}
        ON CONFLICT (pk_entity, project) DO UPDATE
        SET fk_class = EXCLUDED.fk_class
        WHERE EXCLUDED.fk_class IS DISTINCT FROM war.entity_preview.fk_class;`


        this.pgClient.query(q, params)
            .then(() => {
                Logger.msg(`upserted ${length}`)
            })
            .catch(e => {
                console.log(e)
            })

        this.queue = {}
        this.queueLength = 0
        this.queueLength$.next(this.queueLength)
    }


}

export interface EntityId {fkProject: number | null, pkEntity: number}

export class EntityService extends PrimaryDataService<InitItem, EntityId, Entity>{

    measure = 1000;
    updatesSql = updateSql;
    deletesSql = deleteSql;

    index = new IndexDBGeneric<EntityId, Entity>(entityIdToString, stringToEntityId)

    temp = 0

    constructor(public main: Warehouse) {
        super(main, [
            'modified_projects_info_proj_rel',
            'modified_information_persistent_item',
            'modified_information_temporal_entity'
        ])

        const upsertQueue = new SqlQueue(main.pgClient)

        /**
         * Add update requests on aggregaters based on project entity
         */
        this.afterPut$.subscribe(item => {
            main.agg.entityLabel.updater.addItemToQueue(item.key).catch(e => console.log(e))
            upsertQueue.add(item)
            this.temp++;
        })

        /**
        * Remove entity preview from db
        */
        this.afterDel$.subscribe(item => {
            this.deleteEntityPreview(item)
        })


    }
    dbItemToKeyVal(item: InitItem): {key: EntityId; val: Entity;} {
        const key: EntityId = {
            pkEntity: item.pkEntity,
            fkProject: item.fkProject,
        };
        const val: Entity = {
            pkEntity: item.pkEntity,
            fkClass: item.fkClass,
            fkProject: item.fkProject,
        };
        return {key, val}
    }


    deleteEntityPreview(key: EntityId) {
        const params = [key.pkEntity, key.fkProject];

        const q = `
        DELETE FROM war.entity_preview
        WHERE pk_entity = $1
        AND fk_project = $2;`
        this.main.pgClient.query(q, params)
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
    t1.tmsp_last_modification >= $1
    OR
    t2.tmsp_last_modification >= $1
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
export interface Entity {
    pkEntity: number
    fkClass: number
    fkProject: number
}



