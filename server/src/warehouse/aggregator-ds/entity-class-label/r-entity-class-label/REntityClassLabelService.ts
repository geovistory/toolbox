import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {REntityId, rEntityKeyDefs, REntityService} from '../../../primary-ds/entity/REntityService';
import {Warehouse} from '../../../Warehouse';
import {REntityClassLabelAggregator} from './REntityClassLabelAggregator';
import {REntityClassLabelProviders} from './REntityClassLabelPoviders';


export interface REntityClassLabelVal {entityClassLabel?: string}
export class REntityClassLabelService extends AggregatedDataService<REntityId, REntityClassLabelVal>{
    creatorDS: REntityService
    aggregator = REntityClassLabelAggregator;
    providers = REntityClassLabelProviders;
    constructor(public wh: Warehouse) {
        super(
            wh,
            rEntityKeyDefs
        )
        this.registerCreatorDS(this.wh.prim.rEntity)
    }
    getDependencies() {
        return this.wh.dep.rEntityClassLabel
    };
    onUpsertSql(tableAlias: string) {
        return `
        UPDATE war.entity_preview
        SET class_label = ${tableAlias}.val->>'entityClassLabel'
        FROM ${tableAlias}
        WHERE pk_entity = ${tableAlias}."pkEntity"
        AND project = 0
        AND class_label IS DISTINCT FROM ${tableAlias}.val->>'entityClassLabel'`
    }
}

