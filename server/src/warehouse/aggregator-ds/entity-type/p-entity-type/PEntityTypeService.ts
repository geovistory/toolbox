import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {SqlUpsertQueue} from '../../../base/classes/SqlUpsertQueue';
import {Updater} from '../../../base/classes/Updater';
import {pEntityIdToString, sqlForTsVector, stringToPEntityId} from '../../../base/functions';
import {PEntityId} from '../../../primary-ds/entity/PEntityService';
import {Warehouse} from '../../../Warehouse';
import {PEntityTypeAggregator} from './PEntityTypeAggregator';
import {PEntityTypeProviders} from './PEntityTypePoviders';

export interface PEntityTypeVal {
    fkType?: number,
    typeLabel?: string
}

/**
 * This Data Service manages the key-value store containing
 * as a key the PEntityId (pkEntity and fkProject)
 * and as value the PEntityTypeVal (fkType, typeLabel)
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
 * -> The Val is the result of the PEntityTypeAggregator
 *
 */
export class PEntityTypeService extends AggregatedDataService<PEntityId, PEntityTypeVal, PEntityTypeAggregator>{
    updater: Updater<PEntityId, PEntityTypeAggregator>;

    constructor(public wh: Warehouse) {
        super(
            wh,
            pEntityIdToString,
            stringToPEntityId
        )

        const aggregatorFactory = async (id: PEntityId) => {
            const providers = new PEntityTypeProviders(this.wh.dep.pEntityType, id)
            return new PEntityTypeAggregator(providers, id).create()
        }
        const register = async (result: PEntityTypeAggregator) => {
            await this.put(result.id, {
                fkType: result.fkEntityType,
                typeLabel: result.entityTypeLabel
            })
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

        const upsertQueue = new SqlUpsertQueue<PEntityId, PEntityTypeVal>(
            wh,
            'war.entity_preview (entity_type)',
            (valuesStr: string) => `
                UPDATE war.entity_preview
                SET
                    type_label = x.column3,
                    fk_type = x.column4::int,
                    ${sqlForTsVector}
                FROM
                (
                    values ${valuesStr}
                ) as x
                WHERE pk_entity = x.column1::int
                AND project = x.column2::int
                AND (
                    type_label IS DISTINCT FROM x.column3
                    OR
                    fk_type IS DISTINCT FROM x.column4::int
                );`,
            (item) => [item.key.pkEntity, item.key.fkProject, item.val.typeLabel, item.val.fkType],
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

