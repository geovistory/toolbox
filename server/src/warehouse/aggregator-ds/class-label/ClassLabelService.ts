import {AggregatedDataService} from '../../base/classes/AggregatedDataService';
import {IndexDBGeneric} from '../../base/classes/IndexDBGeneric';
import {Updater} from '../../base/classes/Updater';
import {classIdToString, stringToClassId} from '../../base/functions';
import {ClassId} from '../../primary-ds/FieldsConfigService';
import {Warehouse} from '../../Warehouse';
import {ClassLabelAggregator} from './ClassLabelAggregator';
import {ClassLabelProviders} from './ClassLabelProviders';
import {Logger} from '../../base/classes/Logger';

type ValueModel = string
export class ClassLabelService extends AggregatedDataService<ClassId, ValueModel, ClassLabelAggregator>{
    updater: Updater<ClassId, ClassLabelAggregator>;

    index = new IndexDBGeneric<ClassId, ValueModel>(classIdToString, stringToClassId)

    constructor(private main: Warehouse) {
        super()
        const aggregatorFactory = async (id: ClassId) => {
            const providers = new ClassLabelProviders(this.main.dep.classLabel, id)
            return new ClassLabelAggregator(providers, id).create()
        }
        const register = async (result: ClassLabelAggregator) => {
            await this.put(result.id, result.classLabel)
            await result.providers.removeProvidersFromIndexes()
        }
        this.updater = new Updater(
            this.constructor.name,
            aggregatorFactory,
            register,
            classIdToString,
            stringToClassId,
            (results) => this.writeToDb(results)
        )
    }


    writeToDb(results: ClassLabelAggregator[]) {
        let i = 0;
        let batchSize = 0;
        const maxBatchSize = 1000;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let params: any[] = []
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const addParam = (val: any) => {
            params.push(val)
            return '$' + params.length;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const addParams = (vals: any[]) => {
            return vals.map(val => addParam(val)).join(',');
        }
        let values = ''
        let remaining = results.length;


        for (const res of results) {
            const updateEntityPreviewQ = `
                UPDATE war.entity_preview
                SET class_label = $1
                WHERE fk_class = $2
                AND project = $3
                AND class_label IS DISTINCT FROM $1
            `
            this.main.pgClient.query(updateEntityPreviewQ, [res.classLabel, res.id.pkClass, res.id.fkProject])
                .then(() => {
                    Logger.msg(`Updated class labels of entity previews`, 2)
                })
                .catch(e => {
                    console.log(e)
                })


            const arr = this.getParamsForUpsert(res)
            values = values + `(${addParams(arr)}),`
            i++
            batchSize++
            if (i % maxBatchSize === 0 || i === results.length) {
                remaining = remaining - batchSize;
                const t = Logger.start(`Upserting ${batchSize} class labels, remaining: ${remaining} of ${results.length}`, 2)
                const q = this.getUpsertSql(values.slice(0, -1))
                this.main.pgClient.query(q, params)
                    .then(() => {
                        Logger.itTook(t, `to batch upsert class labels`, 2)
                    })
                    .catch(e => {
                        console.log(e)
                    })

                params = []
                values = ''
                batchSize = 0;
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getParamsForUpsert(res: ClassLabelAggregator): any[] {
        return [res.id.pkClass, res.id.fkProject, res.classLabel]
    }

    getUpsertSql(valuesStr: string) {
        return `
            INSERT INTO war.class_preview (fk_class, fk_project, label)
            VALUES ${valuesStr}
            ON CONFLICT (fk_class, fk_project) DO UPDATE
            SET label = EXCLUDED.label
            WHERE EXCLUDED.label IS DISTINCT FROM war.class_preview.label;`
    }
}
