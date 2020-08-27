import {AggregatedDataService} from '../../base/classes/AggregatedDataService';
import {IndexDBGeneric} from '../../base/classes/IndexDBGeneric';
import {SqlUpsertQueue} from '../../base/classes/SqlUpsertQueue';
import {Updater} from '../../base/classes/Updater';
import {pPropertyIdToString, stringToPPropertyId} from '../../base/functions';
import {Warehouse} from '../../Warehouse';
import {PPropertyLabelAggregator} from './PPropertyLabelAggregator';
import {PPropertyLabelProviders} from './PPropertyLabelProviders';
import {PPropertyId} from '../../primary-ds/PPropertyService';

type ValueModel = string
export class PPropertyLabelService extends AggregatedDataService<PPropertyId, ValueModel, PPropertyLabelAggregator>{
    updater: Updater<PPropertyId, PPropertyLabelAggregator>;

    index = new IndexDBGeneric<PPropertyId, ValueModel>(pPropertyIdToString, stringToPPropertyId)

    constructor(private wh: Warehouse) {
        super()
        const aggregatorFactory = async (id: PPropertyId) => {
            const providers = new PPropertyLabelProviders(this.wh.dep.pPropertyLabel, id)
            return new PPropertyLabelAggregator(providers, id).create()
        }
        const register = async (result: PPropertyLabelAggregator) => {
            await this.put(result.id, result.PropertyLabel)
            await result.providers.removeProvidersFromIndexes()
        }
        this.updater = new Updater(
            this.wh,
            this.constructor.name,
            aggregatorFactory,
            register,
            pPropertyIdToString,
            stringToPPropertyId,
            // (results) => this.writeToDb(results)
        )

        const upsertQueue = new SqlUpsertQueue<PPropertyId, ValueModel>(
            this.constructor.name,
            wh.pgClient,
            (valuesStr: string) => `
                INSERT INTO war.class_preview (fk_class, fk_project, label)
                VALUES ${valuesStr}
                ON CONFLICT (fk_class, fk_project) DO UPDATE
                SET label = EXCLUDED.label
                WHERE EXCLUDED.label IS DISTINCT FROM war.class_preview.label;`,
            (item) => [item.key.pkProperty, item.key.fkProject, item.val],
            pPropertyIdToString
        )

        /**
         * Add actions after a new class label is put/updated into index
         */
        this.afterPut$.subscribe(item => {

            // Add item to queue to upsert it into db
            upsertQueue.add(item)
        })

    }


    // writeToDb(results: PPropertyLabelAggregator[]) {
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
    //         const updateEntityPreviewQ = `
    //             UPDATE war.entity_preview
    //             SET class_label = $1
    //             WHERE fk_class = $2
    //             AND project = $3
    //             AND class_label IS DISTINCT FROM $1
    //         `
    //         this.main.pgClient.query(updateEntityPreviewQ, [res.PropertyLabel, res.id.pkProperty, res.id.fkProject])
    //             .then(() => {
    //                 Logger.msg(`Updated class labels of entity previews`, 2)
    //             })
    //             .catch(e => {
    //                 console.log(e)
    //             })


    //         const arr = this.getParamsForUpsert(res)
    //         values = values + `(${addParams(arr)}),`
    //         i++
    //         batchSize++
    //         if (i % maxBatchSize === 0 || i === results.length) {
    //             remaining = remaining - batchSize;
    //             const t = Logger.start(`Upserting ${batchSize} class labels, remaining: ${remaining} of ${results.length}`, 2)
    //             const q = this.getUpsertSql(values.slice(0, -1))
    //             this.main.pgClient.query(q, params)
    //                 .then(() => {
    //                     Logger.itTook(t, `to batch upsert class labels`, 2)
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
    // getParamsForUpsert(res: PPropertyLabelAggregator): any[] {
    //     return [res.id.pkProperty, res.id.fkProject, res.PropertyLabel]
    // }

    // getUpsertSql(valuesStr: string) {
    //     return `
    //         INSERT INTO war.class_preview (fk_class, fk_project, label)
    //         VALUES ${valuesStr}
    //         ON CONFLICT (fk_class, fk_project) DO UPDATE
    //         SET label = EXCLUDED.label
    //         WHERE EXCLUDED.label IS DISTINCT FROM war.class_preview.label;`
    // }
}
