import {forwardRef, Inject, Injectable} from 'injection-js';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';
import {RClassId} from '../../../primary-ds/DfhClassHasTypePropertyService';
import {REntity, REntityId, rEntityKeyDefs, REntityService} from '../../../primary-ds/entity/REntityService';
import {Warehouse} from '../../../Warehouse';
import {RClassLabelService, RClassLabelValue} from '../../class-label/r-class-label/RClassLabelService';
import {REntityClassLabelAggregator} from './REntityClassLabelAggregator';
import {REntityClassLabelProviders} from './REntityClassLabelPoviders';


export interface REntityClassLabelVal {entityClassLabel?: string}
@Injectable()
export class REntityClassLabelService extends AggregatedDataService2<REntityId, REntityClassLabelVal>{
    creatorDS: REntityService
    aggregator = REntityClassLabelAggregator;
    providers = REntityClassLabelProviders;
    depREntity: DependencyIndex<REntityId, REntityClassLabelVal, REntityId, REntity>
    depRClassLabel: DependencyIndex<REntityId, REntityClassLabelVal, RClassId, RClassLabelValue>

    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => REntityService)) rEntity: REntityService,
        @Inject(forwardRef(() => RClassLabelService)) rClassLabel: RClassLabelService
    ) {
        super(
            wh,
            rEntityKeyDefs
        )
        this.registerCreatorDS(rEntity)
        this.depREntity = this.addDepencency(rEntity)
        this.depRClassLabel = this.addDepencency(rClassLabel)
    }
    getDependencies() {
        return this
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

