import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {SqlUpsertQueue} from '../../../base/classes/SqlUpsertQueue';
import {Updater} from '../../../base/classes/Updater';
import {rEntityIdToString, sqlForTsVector, stringToREntityId} from '../../../base/functions';
import {REntityId} from '../../../primary-ds/entity/REntityService';
import {Warehouse} from '../../../Warehouse';
import {REntityFullTextAggregator} from './REntityFullTextAggregator';
import {REntityFullTextProviders} from './REntityFullTextPoviders';
import {Logger} from '../../../base/classes/Logger';

export type REntityFullTextVal = string;

/**
 * This Data Service manages the key-value store containing
 * as a key the REntityId (pkEntity and fkProject)
 * and as value the REntityFullTextVal (fkType, typeLabel)
 *
 * One example key-value pair in the this.index is:
 * Key for the Project Entity Geo. Place 'Madrid' with pkEntity = 2002 in fkProject = 3001
 *  - '2002_3001'
 *
 * Val for the Geo. Place Type 'City' with pkEntity = 2003 in fkProject = 3001
 *  - fkType: 2003
 *  - typeLabel: 'Citiy'
 *
 *
 *
 * -> The Val is the result of the REntityFullTextAggregator
 *
 */
export class REntityFullTextService extends AggregatedDataService<REntityId, REntityFullTextVal, REntityFullTextAggregator>{
    updater: Updater<REntityId, REntityFullTextAggregator>;

    constructor(public wh: Warehouse) {
        super(
            wh,
            rEntityIdToString,
            stringToREntityId
        )
        const aggregatorFactory = async (id: REntityId) => {
            const providers = new REntityFullTextProviders(this.wh.dep.rEntityFullText, id)
            return new REntityFullTextAggregator(providers, id).create()
        }
        const register = async (result: REntityFullTextAggregator) => {
            await this.put(result.id, result.fullText)
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

        const upsertQueue = new SqlUpsertQueue<REntityId, REntityFullTextVal>(
            wh,
            'war.entity_preview (full_text)',
            (valuesStr: string) => `
                UPDATE war.entity_preview
                SET full_text = x.column3,
                ${sqlForTsVector}
                FROM
                (
                    values ${valuesStr}
                ) as x
                WHERE pk_Entity = x.column1::int
                AND project = x.column2::int
                AND full_text IS DISTINCT FROM x.column3
            `,
            (item) => [item.key.pkEntity, 0, item.val],
            rEntityIdToString
        )

        /**
         * Add actions after a new class type is put/updated into index
         */
        this.afterPut$.subscribe(item => {
            // Add item to queue to upsert it into db
            upsertQueue.add(item)
        })
    }

}

