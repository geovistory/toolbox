import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {REntityId, rEntityKeyDefs, REntityService} from '../../../primary-ds/entity/REntityService';
import {Warehouse} from '../../../Warehouse';
import {EntityLabelVal} from '../entity-label.commons';
import {REntityLabelAggregator} from './REntityLabelAggregator';
import {REntityLabelProviders} from './REntityLabelPoviders';

export class REntityLabelService extends AggregatedDataService<REntityId, EntityLabelVal>{
    creatorDS: REntityService
    aggregator = REntityLabelAggregator;
    providers = REntityLabelProviders;
    constructor(public wh: Warehouse) {
        super(
            wh,
            rEntityKeyDefs
        )

        this.registerCreatorDS(this.wh.prim.rEntity)

    }

    getDependencies() {
        return this.wh.dep.rEntityLabel
    };
    onUpsertSql(tableAlias: string) {
        return `
        UPDATE war.entity_preview
        SET entity_label = ${tableAlias}.val->>'entityLabel'
        FROM ${tableAlias}
        WHERE pk_entity = ${tableAlias}."pkEntity"
        AND project = 0
        AND entity_label IS DISTINCT FROM ${tableAlias}.val->>'entityLabel'`
    }
}

