import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {IndexDBGeneric} from '../../../base/classes/IndexDBGeneric';
import {SqlUpsertQueue} from '../../../base/classes/SqlUpsertQueue';
import {Updater} from '../../../base/classes/Updater';
import {pEntityIdToString, stringToPEntityId, sqlForTsVector} from '../../../base/functions';
import {PEntityId} from '../../../primary-ds/entity/PEntityService';
import {Warehouse} from '../../../Warehouse';
import {PEntityFullTextAggregator} from './PEntityFullTextAggregator';
import {PEntityFullTextProviders} from './PEntityFullTextPoviders';

export type PEntityFullTextVal = string;

/**
 * This Data Service manages the key-value store containing
 * as a key the PEntityId (pkEntity and fkProject)
 * and as value the PEntityFullTextVal (fkType, typeLabel)
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
 * -> The Val is the result of the PEntityFullTextAggregator
 *
 */
export class PEntityFullTextService extends AggregatedDataService<PEntityId, PEntityFullTextVal, PEntityFullTextAggregator>{
    updater: Updater<PEntityId, PEntityFullTextAggregator>;

    index = new IndexDBGeneric<PEntityId, PEntityFullTextVal>(pEntityIdToString, stringToPEntityId)

    constructor(private wh: Warehouse) {
        super()
        const aggregatorFactory = async (id: PEntityId) => {
            const providers = new PEntityFullTextProviders(this.wh.dep.pEntityFullText, id)
            return new PEntityFullTextAggregator(providers, id).create()
        }
        const register = async (result: PEntityFullTextAggregator) => {
            await this.put(result.id, result.fullText)
            await result.providers.removeProvidersFromIndexes()
        }

        this.updater = new Updater(
            this.wh,
            this.constructor.name,
            aggregatorFactory,
            register,
            pEntityIdToString,
            stringToPEntityId,
        )

        const upsertQueue = new SqlUpsertQueue<PEntityId, PEntityFullTextVal>(
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
            (item) => [item.key.pkEntity, item.key.fkProject, item.val],
            pEntityIdToString
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

