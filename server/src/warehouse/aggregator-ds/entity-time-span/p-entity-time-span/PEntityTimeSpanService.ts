import {forwardRef, Inject, Injectable} from 'injection-js';
import {AggregatedDataService2} from '../../../base/classes/AggregatedDataService2';
import {EntityTimePrimitive, EntityFields} from "../../../primary-ds/edge/edge.commons";
import {PEntityId, pEntityKeyDefs, PEntityService, PEntity} from '../../../primary-ds/entity/PEntityService';
import {Warehouse} from '../../../Warehouse';
import {PEntityTimeSpanAggregator} from './PEntityTimeSpanAggregator';
import {PEntityTimeSpanProviders} from './PEntityTimeSpanPoviders';
import {PEdgeService} from '../../../primary-ds/edge/PEdgeService';
import {DependencyIndex} from '../../../base/classes/DependencyIndex';

export type TimeSpanKeys =
    'p82'       // At some time within | outer bounds | not before – not after
    | 'p81'     // Ongoing throughout | inner bounds | surely from – surely to
    | 'p81a'    // end of the begin | left inner bound | surely from
    | 'p82a'    // begin of the begin | left outer bound | not before
    | 'p81b'    // begin of the end | right inner bound | surely to
    | 'p82b'    // end of the end | right outer bound | not after
export type PEntityTimeSpanVal = {
    timeSpan?: PEntityTimeSpan;
    firstSecond?: number
    lastSecond?: number
}
export type PEntityTimeSpan = {
    [key in TimeSpanKeys]?: EntityTimePrimitive;
}

/**
 * This Data Service manages the key-value store containing
 * as a key the PEntityId (pkEntity and fkProject)
 * and as value the PEntityTimeSpanVal (fkType, typeLabel)
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
 * -> The Val is the result of the PEntityTimeSpanAggregator
 *
 */
@Injectable()
export class PEntityTimeSpanService extends AggregatedDataService2<PEntityId, PEntityTimeSpanVal>{
    creatorDS: PEntityService
    aggregator = PEntityTimeSpanAggregator;
    providers = PEntityTimeSpanProviders;
    customCreatorDSSql = [
        {
            where: `val->>'entityType' = 'teEn'`,
        }
    ]
    depPEntity: DependencyIndex<PEntityId, PEntityTimeSpanVal, PEntityId, PEntity>
    depPEdge: DependencyIndex<PEntityId, PEntityTimeSpanVal, PEntityId, EntityFields>

    constructor(
        @Inject(forwardRef(() => Warehouse)) wh: Warehouse,
        @Inject(forwardRef(() => PEntityService)) pEntity: PEntityService,
        @Inject(forwardRef(() => PEdgeService)) pEdge: PEdgeService
    ) {
        super(
            wh,
            pEntityKeyDefs
        )

        this.registerCreatorDS(pEntity)
        this.depPEntity=this.addDepencency(pEntity);
        this.depPEdge=this.addDepencency(pEdge);

    }
    getDependencies() {
        return this
    };
    onUpsertSql(tableAlias: string) {
        return `
        UPDATE war.entity_preview
        SET time_span = (${tableAlias}.val->>'timeSpan')::jsonb,
            first_second = (${tableAlias}.val->>'firstSecond')::bigint,
            last_second = (${tableAlias}.val->>'lastSecond')::bigint
        FROM ${tableAlias}
        WHERE pk_entity = ${tableAlias}."pkEntity"
        AND project = ${tableAlias}."fkProject"
        AND (
            time_span,
            first_second,
            last_second
        )
        IS DISTINCT FROM
        (
            (${tableAlias}.val->>'timeSpan')::jsonb,
            (${tableAlias}.val->>'firstSecond')::bigint,
            (${tableAlias}.val->>'lastSecond')::bigint
        )`
    }
}

