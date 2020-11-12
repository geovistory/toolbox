import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {pEntityIdToString, stringToPEntityId} from '../../../base/functions';
import {PEntityId, pEntityKeyDefs, PEntityService} from '../../../primary-ds/entity/PEntityService';
import {Warehouse} from '../../../Warehouse';
import {EntityLabelVal} from '../entity-label.commons';
import {PEntityLabelAggregator} from './PEntityLabelAggregator';
import {PEntityLabelProviders} from './PEntityLabelPoviders';

export class PEntityLabelService extends AggregatedDataService<PEntityId, EntityLabelVal>{
    creatorDS: PEntityService
    aggregator = PEntityLabelAggregator;
    providers = PEntityLabelProviders;
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
        return this.wh.dep.pEntityLabel
    };
    afterChangeSql(tableAlias: string) {
        return `
        UPDATE war.entity_preview
        SET entity_label = ${tableAlias}.val->>'entityLabel'
        FROM ${tableAlias}
        WHERE pk_entity = ${tableAlias}."pkEntity"
        AND project = ${tableAlias}."fkProject"
        AND entity_label IS DISTINCT FROM ${tableAlias}.val->>'entityLabel'`
    }

}

