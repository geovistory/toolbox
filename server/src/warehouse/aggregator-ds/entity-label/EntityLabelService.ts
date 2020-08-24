import {entityIdToString, stringToEntityId} from '../../base/functions';
import {IndexDBGeneric} from '../../base/classes/IndexDBGeneric';
import {AggregatedDataService} from '../../base/classes/AggregatedDataService';
import {Updater} from '../../base/classes/Updater';
import {EntityId} from '../../primary-ds/EntityService';
import {Warehouse} from '../../Warehouse';
import {EntityLabelAggregator} from './EntityLabelAggregator';
import {EntityLabelProviders} from './EntityLabelPoviders';
import {Logger} from '../../base/classes/Logger';

type ValueModel = string
export class EntityLabelService extends AggregatedDataService<EntityId, ValueModel, EntityLabelAggregator>{
    updater: Updater<EntityId, EntityLabelAggregator>;

    index = new IndexDBGeneric<EntityId, ValueModel>(entityIdToString, stringToEntityId)

    constructor(private main: Warehouse) {
        super()
        const aggregatorFactory = async (id: EntityId) => {
            const providers = new EntityLabelProviders(this.main.dep.entityLabel, id)
            return new EntityLabelAggregator(providers, id).create()
        }
        const register = async (result: EntityLabelAggregator) => {
            await this.put(result.id, result.entityLabel)
            await result.providers.removeProvidersFromIndexes()
        }

        this.updater = new Updater(
            this.constructor.name,
            aggregatorFactory,
            register,
            entityIdToString,
            stringToEntityId,
            (results) => this.writeToDb(results)
        )
    }

    writeToDb(results: EntityLabelAggregator[]) {
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
            const arr = this.getParamsForUpsert(res)
            values = values + `(${addParams(arr)}),`
            i++
            batchSize++
            if (i % maxBatchSize === 0 || i === results.length) {
                remaining = remaining - batchSize;
                const t = Logger.start(`Upserting ${batchSize} entity labels, remaining: ${remaining} of ${results.length}`, 2)
                const q = this.getUpsertSql(values.slice(0, -1))
                this.main.pgClient.query(q, params)
                    .then(() => {
                        Logger.itTook(t, `to batch upsert entity labels`, 2)
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
    getParamsForUpsert(res: EntityLabelAggregator): any[] {
        return [res.id.pkEntity, res.id.fkProject, res.id.fkProject, res.entityLabel]
    }

    getUpsertSql(valuesStr: string) {
        return `
        INSERT INTO war.entity_preview (pk_entity, fk_project, project, entity_label)
        VALUES ${valuesStr}
        ON CONFLICT (pk_entity, project) DO UPDATE
        SET entity_label = EXCLUDED.entity_label
        WHERE EXCLUDED.entity_label IS DISTINCT FROM war.entity_preview.entity_label;`
    }
}

