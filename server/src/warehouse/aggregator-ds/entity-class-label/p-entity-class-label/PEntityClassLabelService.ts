import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {pEntityIdToString, stringToPEntityId} from '../../../base/functions';
import {PEntityId, pEntityKeyDefs, PEntityService} from '../../../primary-ds/entity/PEntityService';
import {Warehouse} from '../../../Warehouse';
import {PEntityClassLabelAggregator} from './PEntityClassLabelAggregator';
import {PEntityClassLabelProviders} from './PEntityClassLabelPoviders';

export interface PEntityClassLabelVal {entityClassLabel: string}
export class PEntityClassLabelService extends AggregatedDataService<PEntityId, PEntityClassLabelVal>{
    creatorDS: PEntityService
    aggregator = PEntityClassLabelAggregator;
    providers = PEntityClassLabelProviders;

    constructor(public wh: Warehouse) {
        super(
            wh,
            pEntityIdToString,
            stringToPEntityId,
            pEntityKeyDefs
        )
        this.registerCreatorDS(this.wh.prim.pEntity)

    }

    getDependencies() {
        return this.wh.dep.pEntityClassLabel
    };
    onUpsertSql(tableAlias: string) {
        return `
        UPDATE war.entity_preview
        SET class_label = ${tableAlias}.val->>'entityClassLabel'
        FROM ${tableAlias}
        WHERE pk_entity = ${tableAlias}."pkEntity"
        AND project = ${tableAlias}."fkProject"
        AND class_label IS DISTINCT FROM ${tableAlias}.val->>'entityClassLabel'`
    }
}

