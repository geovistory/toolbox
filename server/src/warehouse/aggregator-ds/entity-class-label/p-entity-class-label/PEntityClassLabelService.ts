import {AggregatedDataService} from '../../../base/classes/AggregatedDataService';
import {PEntityId, pEntityKeyDefs, PEntityService} from '../../../primary-ds/entity/PEntityService';
import {Warehouse} from '../../../Warehouse';
import {PEntityClassLabelAggregator} from './PEntityClassLabelAggregator';
import {PEntityClassLabelProviders} from './PEntityClassLabelPoviders';
import {Injectable, Inject, forwardRef} from 'injection-js';

export interface PEntityClassLabelVal {entityClassLabel: string}
@Injectable()
export class PEntityClassLabelService extends AggregatedDataService<PEntityId, PEntityClassLabelVal>{
    creatorDS: PEntityService
    aggregator = PEntityClassLabelAggregator;
    providers = PEntityClassLabelProviders;

    constructor(@Inject(forwardRef(() => Warehouse)) wh: Warehouse) {
        super(
            wh,
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

