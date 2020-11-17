import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {SqlUpsertQueue} from '../../../base/classes/SqlUpsertQueue';
import {Updater} from '../../../base/classes/Updater';
import {rEntityIdToString, sqlForTsVector, stringToREntityId} from '../../../base/functions';
import {REntityId} from '../../../primary-ds/entity/REntityService';
import {Warehouse} from '../../../Warehouse';
import {EntityLabelVal} from '../entity-label.commons';
import {REntityLabelAggregator} from './REntityLabelAggregator';
import {REntityLabelProviders} from './REntityLabelPoviders';

export class REntityLabelService extends AggregatedDataService<REntityId, EntityLabelVal, REntityLabelAggregator>{
    updater: Updater<REntityId, REntityLabelAggregator>;

    constructor(public wh: Warehouse) {
        super(
            wh,
            rEntityIdToString,
            stringToREntityId
        )
        const aggregatorFactory = async (id: REntityId) => {
            const providers = new REntityLabelProviders(this.wh.dep.rEntityLabel, id)
            return new REntityLabelAggregator(providers, id).create()
        }
        const register = async (result: REntityLabelAggregator) => {
            await this.put(result.id, {
                entityLabel: result.entityLabel,
                labelMissing: result.labelMissing
            })
            await result.providers.removeProvidersFromIndexes()
        }

        this.updater = new Updater(
            this.wh,
            this.constructor.name,
            aggregatorFactory,
            register,
            rEntityIdToString,
            stringToREntityId,
        )

        const upsertQueue = new SqlUpsertQueue<REntityId, EntityLabelVal>(
            wh,
            'war.entity_preview (entity_label)',
            (valuesStr: string) => `
                UPDATE war.entity_preview
                SET entity_label = x.column3,
                ${sqlForTsVector}
                FROM
                (
                    values ${valuesStr}
                ) as x
                WHERE pk_entity = x.column1::int
                AND project = x.column2::int
                AND entity_label IS DISTINCT FROM x.column3;`,
            (item) => [item.key.pkEntity, 0, item.val.entityLabel],
            rEntityIdToString
        )

        /**
         * Add actions after a new class label is put/updated into index
         */
        this.afterPut$.subscribe(item => {

            // Add item to queue to upsert it into db
            upsertQueue.add(item)
        })
    }

    // writeToDb(results: REntityLabelAggregator[]) {
    //     let i = 0;
    //     let batchSize = 0;
    //     const maxBatchSize = 1000;
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     let params: any[] = []
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     const addParam = (val: any) => {
    //         params.push(val)
    //         return '$' + params.length;
    //     }
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     const addParams = (vals: any[]) => {
    //         return vals.map(val => addParam(val)).join(',');
    //     }
    //     let values = ''
    //     let remaining = results.length;


    //     for (const res of results) {
    //         const arr = this.getParamsForUpsert(res)
    //         values = values + `(${addParams(arr)}),`
    //         i++
    //         batchSize++
    //         if (i % maxBatchSize === 0 || i === results.length) {
    //             remaining = remaining - batchSize;
    //             const t = Logger.start(this.constructor.name, `Upserting ${batchSize} entity labels, remaining: ${remaining} of ${results.length}`, 2)
    //             const q = this.getUpsertSql(values.slice(0, -1))
    //             this.wh.pgClient.query(q, params)
    //                 .then(() => {
    //                     Logger.itTook(this.constructor.name, t, `to batch upsert entity labels`, 2)
    //                 })
    //                 .catch(e => {
    //                     console.log(e)
    //                 })

    //             params = []
    //             values = ''
    //             batchSize = 0;
    //         }
    //     }
    // }

    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // getParamsForUpsert(res: REntityLabelAggregator): any[] {
    //     return [res.id.pkEntity, res.id.fkProject, res.id.fkProject, res.entityLabel]
    // }

    // getUpsertSql(valuesStr: string) {
    //     return `
    //     INSERT INTO war.entity_preview (pk_entity, fk_project, project, entity_label)
    //     VALUES ${valuesStr}
    //     ON CONFLICT (pk_entity, project) DO UPDATE
    //     SET entity_label = EXCLUDED.entity_label
    //     WHERE EXCLUDED.entity_label IS DISTINCT FROM war.entity_preview.entity_label;`
    // }
}

