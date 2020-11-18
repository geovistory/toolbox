import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
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
