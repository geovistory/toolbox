import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {SqlUpsertQueue} from '../../../base/classes/SqlUpsertQueue';
import {rClassIdToString, stringToRClassId} from '../../../base/functions';
import {RClassService} from '../../../primary-ds/class/RClassService';
import {RClassId, rClassIdKeyDefs} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {Warehouse} from '../../../Warehouse';
import {RClassLabelAggregator} from './RClassLabelAggregator';
import {RClassLabelProviders} from './RClassLabelProviders';

export type RClassLabelValue = {label?: string}
export class RClassLabelService extends AggregatedDataService<RClassId, RClassLabelValue>{
    creatorDS: RClassService
    aggregator = RClassLabelAggregator;
    providers = RClassLabelProviders;
    constructor(public wh: Warehouse) {
        super(
            wh,
            rClassIdToString,
            stringToRClassId,
            rClassIdKeyDefs
        )
        this.registerCreatorDS(wh.prim.rClass);

        const upsertQueue = new SqlUpsertQueue<RClassId, RClassLabelValue>(
            wh,
            this.constructor.name,
            (valuesStr: string) => `
            INSERT INTO war.class_preview (fk_class, fk_project, label)
            VALUES ${valuesStr}
            ON CONFLICT (fk_class, fk_project) DO UPDATE
            SET label = EXCLUDED.label
            WHERE EXCLUDED.label IS DISTINCT FROM war.class_preview.label;`,
            (item) => [item.key.pkClass, 0, item.val],
            rClassIdToString
        )

        /**
         * Add actions after a new class label is put/updated into index
         */
        this.afterPut$.subscribe(item => {

            // Add item to queue to upsert it into db
            upsertQueue.add(item)
        })

    }
    getDependencies() {
        return this.wh.dep.rClassLabel
    };
    onUpsertSql(tableAlias: string) {
        return `
        INSERT INTO war.class_preview (fk_class, fk_project, label)
        SELECT "pkClass", 0, val->>'label'
        FROM ${tableAlias}
        ON CONFLICT (fk_class, fk_project) DO UPDATE
        SET label = EXCLUDED.label
        WHERE EXCLUDED.label IS DISTINCT FROM war.class_preview.label`
    }
}
