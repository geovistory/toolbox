import {AggregatedDataService} from '../../base/classes/AggregatedDataService';
import {IndexDBGeneric} from '../../base/classes/IndexDBGeneric';
import {SqlUpsertQueue} from '../../base/classes/SqlUpsertQueue';
import {Updater} from '../../base/classes/Updater';
import {entityIdToString, stringToEntityId} from '../../base/functions';
import {PEntityId} from '../../primary-ds/PEntityService';
import {Warehouse} from '../../Warehouse';
import {PEntityLabelAggregator} from './PEntityLabelAggregator';
import {PEntityLabelProviders} from './PEntityLabelPoviders';

type ValueModel = string
export class PEntityLabelService extends AggregatedDataService<PEntityId, ValueModel, PEntityLabelAggregator>{
    updater: Updater<PEntityId, PEntityLabelAggregator>;

    index = new IndexDBGeneric<PEntityId, ValueModel>(entityIdToString, stringToEntityId)

    constructor(private wh: Warehouse) {
        super()
        const aggregatorFactory = async (id: PEntityId) => {
            const providers = new PEntityLabelProviders(this.wh.dep.pEntityLabel, id)
            return new PEntityLabelAggregator(providers, id).create()
        }
        const register = async (result: PEntityLabelAggregator) => {
            await this.put(result.id, result.entityLabel)
            await result.providers.removeProvidersFromIndexes()
        }

        this.updater = new Updater(
            this.wh,
            this.constructor.name,
            aggregatorFactory,
            register,
            entityIdToString,
            stringToEntityId,
        )

        const upsertQueue = new SqlUpsertQueue<PEntityId, ValueModel>(
            wh,
            'war.entity_preview (entity_label)',
            (valuesStr: string) => `
                UPDATE war.entity_preview
                SET entity_label = x.column3
                FROM
                (
                    values ${valuesStr}
                ) as x
                WHERE pk_entity = x.column1::int
                AND project = x.column2::int
                AND entity_label IS DISTINCT FROM x.column3;`,
            (item) => [item.key.pkEntity, item.key.fkProject, item.val],
            entityIdToString
        )

        /**
         * Add actions after a new class label is put/updated into index
         */
        this.afterPut$.subscribe(item => {

            // Add item to queue to upsert it into db
            upsertQueue.add(item)
        })
    }

    // writeToDb(results: PEntityLabelAggregator[]) {
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
    //             const t = Logger.start(`Upserting ${batchSize} entity labels, remaining: ${remaining} of ${results.length}`, 2)
    //             const q = this.getUpsertSql(values.slice(0, -1))
    //             this.wh.pgClient.query(q, params)
    //                 .then(() => {
    //                     Logger.itTook(t, `to batch upsert entity labels`, 2)
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
    // getParamsForUpsert(res: PEntityLabelAggregator): any[] {
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

