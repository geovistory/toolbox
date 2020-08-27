import {AbstractAggregator} from '../../base/classes/AbstractAggregator';
import {PEntityId} from '../../primary-ds/PEntityService';
import {PEntityTimeSpanProviders} from './PEntityTimeSpanPoviders';
import {Granularity, CalendarType} from '../../primary-ds/PEdgeService';
import {PEntityTimeSpanVal} from './PEntityTimeSpanService';

export class PEntityTimeSpanAggregator extends AbstractAggregator<PEntityId> {

    // the resulting entityTimeSpan
    entityTimeSpan: PEntityTimeSpanVal = {};

    // For testing / debugging
    labelMissing = true;

    constructor(
        public providers: PEntityTimeSpanProviders,
        public id: PEntityId
    ) {
        super()
    }


    /************************************************************************
     * Methods for creating entity time span
     ************************************************************************/

    /**
     *  Create entity time span
     *
     *  Gets values from Indexes and caches dependencies in itself.
     */
    async create() {

        const entity = await this.providers.pEntity.get(this.id);

        if (entity) {

            // load previous providers in a cache
            // in the end (after create), this cahche will contain only deprecated providers
            // that can then be deleted from dependency indexes
            await this.providers.load()

            const fieldsWithEdges = await this.providers.pEdges.get(this.id);

            //ongoing throughout
            if (fieldsWithEdges?.outgoing?.[71]?.length) {
                this.entityTimeSpan["p81"] = fieldsWithEdges.outgoing[71][0].targetValue?.timePrimitive;
            }
            //at some time within
            if (fieldsWithEdges?.outgoing?.[72]?.length) {
                this.entityTimeSpan["p82"] = fieldsWithEdges.outgoing[72][0].targetValue?.timePrimitive;
            }

            //end of the begin
            if (fieldsWithEdges?.outgoing?.[150]?.length) {
                this.entityTimeSpan["p81a"] = fieldsWithEdges.outgoing[150][0].targetValue?.timePrimitive;
            }

            //begin of the end
            if (fieldsWithEdges?.outgoing?.[151]?.length) {
                this.entityTimeSpan["p81b"] = fieldsWithEdges.outgoing[151][0].targetValue?.timePrimitive;
            }

            //begin of the begin
            if (fieldsWithEdges?.outgoing?.[152]?.length) {
                this.entityTimeSpan["p82a"] = fieldsWithEdges.outgoing[152][0].targetValue?.timePrimitive;
            }

            //end of the end
            if (fieldsWithEdges?.outgoing?.[153]?.length) {
                this.entityTimeSpan["p82b"] = fieldsWithEdges.outgoing[153][0].targetValue?.timePrimitive;
            }


        }
        return this
    }

}
